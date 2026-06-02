/* ============================================================
   chat.js — Chat Mondial Maths GR2 (Supabase Realtime)
   Salon public : discuter maths, partager formules (rendu auto + aperçu),
   et GIF (bibliothèque Giphy avec recherche, tendances et favoris).
   Suppression auteur + créateur. Pseudo uniquement.
   100% défensif : pas de réseau / pas de compte -> message clair, le reste du site reste local.
   ============================================================ */
(function () {
  'use strict';

  var TABLE = 'messages';
  var ROOM = 'monde';
  var ADMIN_EMAIL = 'drackson227@mathsgr2.app'; // le créateur peut tout modérer (aussi appliqué côté serveur via RLS)
  var MAX_LEN = 2000; // même limite que Discord
  var LOAD_LIMIT = 120;

  // Bibliothèque de GIF (Giphy — comme TikTok). Clé API publique du créateur (drackson227),
  // sans danger dans le navigateur. Peut être remplacée localement via localStorage 'mathsgr2_giphy_key'.
  var GIPHY_KEY_DEFAULT = '5u3uiG23AA0hv5MOe97groAtfHwSkLZe';
  function giphyKey() { try { return localStorage.getItem('mathsgr2_giphy_key') || GIPHY_KEY_DEFAULT; } catch (e) { return GIPHY_KEY_DEFAULT; } }
  var FAV_KEY = 'mathsgr2_gif_favs';

  var REPORT_HIDE = 3;   // un message masqué après 3 signalements de personnes différentes
  var _reportCounts = {}; // message_id -> nb de signalements
  var _myReports = {};    // message_id -> déjà signalé par moi
  var _seenReports = {};  // "message_id:reporter_id" -> déjà compté

  var _channel = null;
  var _initDone = false;
  var _seenIds = {};   // évite les doublons (realtime + insert local)
  var _emojiOpen = false;
  var _mediaOpen = false;
  var _gifTab = 'trending'; // 'trending' | 'search' | 'favs'
  var _gifSearchTimer = null;

  /* ---- accès auth (exposé par auth.js) ---- */
  function sb()     { return window.MGR2Auth ? window.MGR2Auth.sb() : null; }
  function curUser(){ return window.MGR2Auth ? window.MGR2Auth.user() : null; }
  function myPseudo(){ return window.MGR2Auth ? window.MGR2Auth.pseudo() : null; }
  function isAdmin(){ var u = curUser(); return !!(u && u.email === ADMIN_EMAIL); }

  /* ---- utils ---- */
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function el(id) { return document.getElementById(id); }

  function isImgUrl(u) {
    return /^https?:\/\/[^\s]+\.(png|jpe?g|gif|webp|svg)(\?[^\s]*)?$/i.test((u || '').trim());
  }
  // Tenor/Giphy partagent souvent des pages ; on accepte aussi les liens média connus
  function looksLikeGif(u) {
    u = (u || '').trim();
    return isImgUrl(u) || /^https?:\/\/(media\d*\.tenor\.com|media\d*\.giphy\.com|i\.giphy\.com|c\.tenor\.com)\//i.test(u);
  }

  /* ---- rendu maths AUTOMATIQUE ----
     Pour que \frac{3}{4}, \sqrt{2}, x^{2}, \pi… s'affichent jolis MÊME sans \( \).
     On entoure chaque "morceau maths" de \( \) ; le texte normal reste tel quel. */
  function autoWrapMath(text) {
    if (/\\\(|\\\)|\\\[|\$/.test(text)) return text; // déjà des délimiteurs : on respecte
    // accolade qui tolère UN niveau d'imbrication : {  ...  { ... }  ... }  -> gère \sqrt{M^{2}}, \frac{x^{2}}{y}
    var BR = '\\{(?:[^{}]|\\{[^{}]*\\})*\\}';
    var re = new RegExp(
      '(\\\\[a-zA-Z]+(?:\\s*' + BR + ')*' +            // commande + ses accolades (\frac{}{}, \sqrt{})
      '|[A-Za-z0-9)\\]]+\\s*[\\^_]\\s*(?:' + BR + '|[A-Za-z0-9]+))', // base^exposant / base_indice
      'g');
    if (!re.test(text)) return text;
    re.lastIndex = 0;
    return text.replace(re, function (m) { return '\\(' + m + '\\)'; });
  }

  /* ---- état / gate ---- */
  function showGate(html) {
    var g = el('chat-gate'), m = el('chat-main');
    if (g) { g.innerHTML = html; g.style.display = 'block'; }
    if (m) m.style.display = 'none';
  }
  function showMain() {
    var g = el('chat-gate'), m = el('chat-main');
    if (g) g.style.display = 'none';
    if (m) m.style.display = 'flex';
  }

  /* ---- rendu d'un message ---- */
  function bubbleHtml(msg) {
    var mine = curUser() && msg.user_id === curUser().id;
    var canDelete = mine || isAdmin();
    var time = '';
    try {
      time = new Date(msg.created_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    } catch (e) {}

    var masked = (_reportCounts[msg.id] || 0) >= REPORT_HIDE;
    var inner;
    if (masked) {
      inner = '<span class="chat-masked">⚠️ Message masqué (signalé par la communauté)</span>';
    } else if (msg.kind === 'image' && /^https?:\/\//i.test(msg.body)) {
      inner = '<a href="' + esc(msg.body) + '" target="_blank" rel="noopener">' +
              '<img class="chat-img" src="' + esc(msg.body) + '" alt="image" loading="lazy" ' +
              'onerror="this.replaceWith(document.createTextNode(\'🖼️ (image indisponible)\'))"></a>';
    } else {
      // texte : on échappe le HTML puis on rend les maths automatiquement
      inner = '<span class="chat-text">' + autoWrapMath(esc(msg.body)) + '</span>';
    }

    var del = canDelete
      ? '<button class="chat-del" title="Supprimer" onclick="chatDelete(' + Number(msg.id) + ')">🗑</button>'
      : '';
    var report = (!mine && !masked)
      ? '<button class="chat-report" title="Signaler ce message" onclick="chatReport(' + Number(msg.id) + ')">⚐</button>'
      : '';
    var admin = (msg.pseudo && msg.pseudo.toLowerCase() === 'drackson227')
      ? '<span class="chat-badge" title="Créateur">👑</span>' : '';

    return '<div class="chat-msg' + (mine ? ' mine' : '') + (masked ? ' chat-msg-masked' : '') + '" data-id="' + Number(msg.id) + '">' +
             '<div class="chat-meta"><span class="chat-author">' + esc(msg.pseudo || '?') + '</span>' +
             admin + '<span class="chat-time">' + time + '</span>' + report + del + '</div>' +
             '<div class="chat-bubble">' + inner + '</div>' +
           '</div>';
  }

  // Séparateur de jour (Aujourd'hui / Hier / date) entre les messages
  var _lastDay = null;
  function dayLabel(d) {
    var now = new Date(), y = new Date(now); y.setDate(now.getDate() - 1);
    var sameDay = function (a, b) { return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate(); };
    if (sameDay(d, now)) return "Aujourd'hui";
    if (sameDay(d, y)) return 'Hier';
    return d.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
  }
  function maybeAddDaySep(box, msg) {
    var d; try { d = new Date(msg.created_at); } catch (e) { return; }
    if (isNaN(d)) return;
    var key = d.toDateString();
    if (key === _lastDay) return;
    _lastDay = key;
    var sep = document.createElement('div');
    sep.className = 'chat-daysep';
    sep.innerHTML = '<span>' + dayLabel(d) + '</span>';
    box.appendChild(sep);
  }

  function appendMessage(msg, scroll) {
    if (!msg || _seenIds[msg.id]) return;
    _seenIds[msg.id] = true;
    var box = el('chat-messages');
    if (!box) return;
    var empty = el('chat-empty'); if (empty) empty.remove();
    maybeAddDaySep(box, msg);
    var wrap = document.createElement('div');
    wrap.innerHTML = bubbleHtml(msg);
    var node = wrap.firstChild;
    box.appendChild(node);
    if (window.MathJax && msg.kind !== 'image') {
      if (typeof safeMathJax === 'function') safeMathJax([node]);
    }
    if (scroll) box.scrollTop = box.scrollHeight;
  }

  function removeMessage(id) {
    var box = el('chat-messages');
    if (!box) return;
    var node = box.querySelector('.chat-msg[data-id="' + Number(id) + '"]');
    if (node) node.remove();
  }

  /* ---- chargement initial + temps réel ---- */
  function loadMessages() {
    var client = sb();
    if (!client) return;
    var box = el('chat-messages');
    if (box) box.innerHTML = '<p id="chat-empty" style="text-align:center;color:var(--text-secondary);padding:2rem;">Chargement…</p>';
    loadReports().then(function () {
    client.from(TABLE).select('*').order('created_at', { ascending: true }).limit(LOAD_LIMIT)
      .then(function (res) {
        if (res.error) { console.warn('chat load:', res.error.message); if (box) box.innerHTML = '<p id="chat-empty" style="text-align:center;color:#f87171;padding:2rem;">Impossible de charger le salon.</p>'; return; }
        _seenIds = {}; _lastDay = null;
        if (box) box.innerHTML = '';
        var rows = res.data || [];
        if (!rows.length && box) {
          box.innerHTML = '<p id="chat-empty" style="text-align:center;color:var(--text-secondary);padding:2rem;">Personne n\'a encore parlé. Lance la discussion ! 👋</p>';
        }
        rows.forEach(function (m) { appendMessage(m, false); });
        if (box) box.scrollTop = box.scrollHeight;
      });
    });
  }

  function subscribe() {
    var client = sb();
    if (!client || _channel) return;
    try {
      _channel = client.channel('room-' + ROOM)
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: TABLE }, function (payload) {
          appendMessage(payload.new, true);
        })
        .on('postgres_changes', { event: 'DELETE', schema: 'public', table: TABLE }, function (payload) {
          if (payload.old && payload.old.id != null) removeMessage(payload.old.id);
        })
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'message_reports' }, function (payload) {
          if (payload.new && payload.new.message_id != null) applyReport(payload.new.message_id, payload.new.reporter_id);
        })
        .subscribe();
    } catch (e) { console.warn('chat subscribe:', e); }
  }

  /* ---- envoi ---- */
  window.chatSend = function () {
    var client = sb(), u = curUser();
    if (!client || !u) { if (window.MGR2Auth) window.MGR2Auth.openLogin(); return; }
    var input = el('chat-input');
    if (!input) return;
    var raw = editorText();
    if (!raw) return;
    if (raw.length > MAX_LEN) { toast('Message trop long (max ' + MAX_LEN + ' caractères).', '#f87171'); return; }

    var kind = looksLikeGif(raw) ? 'image' : 'text';
    var row = { user_id: u.id, pseudo: myPseudo() || 'élève', body: raw, kind: kind };
    var btn = el('chat-send-btn'); if (btn) btn.disabled = true;
    editorClear();
    updatePreview();

    client.from(TABLE).insert(row).select().single()
      .then(function (res) {
        if (btn) btn.disabled = false;
        if (res.error) { console.warn('chat send:', res.error.message); toast('Échec de l\'envoi.', '#f87171'); return; }
        appendMessage(res.data, true); // affichage immédiat (le realtime ignorera le doublon)
      });
  };

  window.chatDelete = function (id) {
    var client = sb();
    if (!client) return;
    if (!confirm('Supprimer ce message ?')) return;
    client.from(TABLE).delete().eq('id', id).then(function (res) {
      if (res.error) { toast('Suppression impossible.', '#f87171'); return; }
      removeMessage(id);
    });
  };

  /* ---- signalement + auto-masquage ---- */
  function maskMessageNode(id) {
    var box = el('chat-messages'); if (!box) return;
    var node = box.querySelector('.chat-msg[data-id="' + Number(id) + '"]');
    if (!node) return;
    node.classList.add('chat-msg-masked');
    var b = node.querySelector('.chat-bubble');
    if (b) b.innerHTML = '<span class="chat-masked">⚠️ Message masqué (signalé par la communauté)</span>';
    var rep = node.querySelector('.chat-report'); if (rep) rep.remove();
  }
  function applyReport(msgId, reporterId) {
    var key = msgId + ':' + reporterId;
    if (_seenReports[key]) return; // évite le double comptage (optimiste + écho realtime)
    _seenReports[key] = true;
    _reportCounts[msgId] = (_reportCounts[msgId] || 0) + 1;
    var me = curUser() && curUser().id;
    if (reporterId === me) _myReports[msgId] = true;
    if (_reportCounts[msgId] >= REPORT_HIDE) maskMessageNode(msgId);
  }
  window.chatReport = function (id) {
    var client = sb(), u = curUser();
    if (!client || !u) { if (window.MGR2Auth) window.MGR2Auth.openLogin(); return; }
    if (_myReports[id]) { toast('Tu as déjà signalé ce message', '#fbbf24'); return; }
    applyReport(id, u.id); // optimiste
    client.from('message_reports').insert({ message_id: id, reporter_id: u.id }).then(function (r) {
      if (r.error && !/duplicate|unique/i.test(r.error.message)) console.warn('report:', r.error.message);
    });
    toast('Merci, message signalé 🙏', 'var(--color-nav)');
  };
  function loadReports() {
    var client = sb(); if (!client) return Promise.resolve();
    _reportCounts = {}; _myReports = {}; _seenReports = {};
    return client.from('message_reports').select('message_id,reporter_id').then(function (r) {
      if (r.error || !r.data) return;
      r.data.forEach(function (row) { applyReport(row.message_id, row.reporter_id); });
    }).catch(function () {});
  }

  /* ====== ÉDITEUR VISUEL (contenteditable) : on écrit DIRECTEMENT dans les cases ======
     Cliquer "fraction" crée une case en haut + une case en bas ; "racine" une case sous le √ ;
     "exposant" une petite case en haut. On tape dedans, jamais de \frac{} visible. */
  var _savedRange = null;
  function saveRange() {
    var sel = window.getSelection();
    if (sel && sel.rangeCount) {
      var r = sel.getRangeAt(0);
      var inp = el('chat-input');
      if (inp && inp.contains(r.commonAncestorContainer)) _savedRange = r.cloneRange();
    }
  }
  function focusEditor() {
    var inp = el('chat-input'); if (!inp) return null;
    inp.focus();
    var sel = window.getSelection();
    if (_savedRange && inp.contains(_savedRange.commonAncestorContainer)) {
      try { sel.removeAllRanges(); sel.addRange(_savedRange); } catch (e) {}
    }
    return sel;
  }
  function insertNodeAtCaret(node) {
    var inp = el('chat-input'); if (!inp) return;
    var sel = focusEditor();
    var range;
    if (sel && sel.rangeCount && inp.contains(sel.getRangeAt(0).commonAncestorContainer)) {
      range = sel.getRangeAt(0); range.deleteContents();
    } else {
      range = document.createRange(); range.selectNodeContents(inp); range.collapse(false);
    }
    range.insertNode(node);
    var after = document.createTextNode(' '); // espace après le widget pour continuer à écrire
    node.parentNode.insertBefore(after, node.nextSibling);
    var target = node.querySelector('[contenteditable="true"]');
    var nr = document.createRange();
    if (target) { nr.selectNodeContents(target); nr.collapse(true); }
    else { nr.setStartAfter(after); nr.collapse(true); }
    if (sel) { sel.removeAllRanges(); sel.addRange(nr); }
    saveRange();
    updatePreview();
  }
  window.chatInsertText = function (txt) {
    var inp = el('chat-input'); if (!inp) return;
    focusEditor();
    document.execCommand('insertText', false, txt);
    saveRange();
    updatePreview();
  };
  window.chatInsert = function (txt) { window.chatInsertText(txt); }; // compat emoji

  function mkWidget(kind) {
    var w = document.createElement('span');
    w.className = 'mw mw-' + kind;
    w.setAttribute('contenteditable', 'false');
    if (kind === 'frac') {
      w.innerHTML = '<span class="mw-box mw-num" contenteditable="true"></span>' +
                    '<span class="mw-line"></span>' +
                    '<span class="mw-box mw-den" contenteditable="true"></span>';
    } else if (kind === 'sqrt') {
      w.innerHTML = '<span class="mw-radsym">√</span><span class="mw-box mw-rad" contenteditable="true"></span>';
    } else if (kind === 'sup') {
      w.innerHTML = '<span class="mw-box mw-supbox" contenteditable="true"></span>';
    }
    return w;
  }
  window.chatInsertFrac = function () { insertNodeAtCaret(mkWidget('frac')); };
  window.chatInsertSqrt = function () { insertNodeAtCaret(mkWidget('sqrt')); };
  window.chatInsertSup  = function () { insertNodeAtCaret(mkWidget('sup')); };

  /* sérialise l'éditeur visuel -> chaîne LaTeX (pour l'envoi et l'aperçu) */
  function serialize(node) {
    var out = '';
    node.childNodes.forEach(function (n) {
      if (n.nodeType === 3) { out += n.nodeValue; return; }
      if (n.nodeType !== 1) return;
      var cl = n.classList;
      if (cl && cl.contains('mw-frac')) {
        out += '\\frac{' + serialize(n.querySelector('.mw-num')) + '}{' + serialize(n.querySelector('.mw-den')) + '}';
      } else if (cl && cl.contains('mw-sqrt')) {
        out += '\\sqrt{' + serialize(n.querySelector('.mw-rad')) + '}';
      } else if (cl && cl.contains('mw-sup')) {
        out += '^{' + serialize(n.querySelector('.mw-supbox')) + '}';
      } else if (n.tagName === 'BR') {
        out += '\n';
      } else {
        out += serialize(n);
      }
    });
    return out;
  }
  function editorText() { var inp = el('chat-input'); return inp ? serialize(inp).replace(/ /g, ' ').trim() : ''; }
  function editorClear() { var inp = el('chat-input'); if (inp) inp.innerHTML = ''; }

  // Supprimer proprement un widget (fraction/racine/exposant) avec Backspace
  function removeWidgetWithCaret(w) {
    var inp = el('chat-input');
    var range = document.createRange();
    var prev = w.previousSibling;
    if (prev) range.setStartAfter(prev); else range.setStart(inp, 0);
    range.collapse(true);
    w.remove();
    var sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(range);
    saveRange(); updatePreview();
  }
  function closestWidget(node) {
    while (node && node.nodeType === 1) {
      if (node.classList && node.classList.contains('mw')) return node;
      node = node.parentNode;
    }
    return null;
  }
  function editorBackspace(e) {
    var inp = el('chat-input');
    var sel = window.getSelection();
    if (!sel.rangeCount) return;
    var range = sel.getRangeAt(0);
    if (!range.collapsed) return; // sélection : suppression normale
    var c = range.startContainer, off = range.startOffset;
    // 1) curseur dans une case de widget, au tout début et case vide -> on enlève tout le widget
    var hostEl = c.nodeType === 1 ? c : c.parentNode;
    var box = hostEl && hostEl.closest ? hostEl.closest('.mw-box') : null;
    if (box) {
      if (off === 0 && !box.textContent.trim()) {
        var w = closestWidget(box);
        if (w) { e.preventDefault(); removeWidgetWithCaret(w); }
      }
      return; // sinon : suppression normale d'un caractère dans la case
    }
    // 2) curseur juste APRÈS un widget (au niveau de l'éditeur) -> on l'enlève
    if (c === inp && off > 0) {
      var prev = inp.childNodes[off - 1];
      if (prev && prev.nodeType === 1 && prev.classList && prev.classList.contains('mw')) { e.preventDefault(); removeWidgetWithCaret(prev); return; }
    }
    if (c.nodeType === 3 && off === 0) {
      var ps = c.previousSibling;
      if (ps && ps.nodeType === 1 && ps.classList && ps.classList.contains('mw')) { e.preventDefault(); removeWidgetWithCaret(ps); }
    }
  }

  window.chatToggleEmoji = function () {
    _emojiOpen = !_emojiOpen; _mediaOpen = false;
    renderPanels();
  };
  window.chatToggleMedia = function () {
    _mediaOpen = !_mediaOpen; _emojiOpen = false;
    renderPanels();
    if (_mediaOpen) { _gifTab = 'trending'; gifLoad(); }
  };
  // envoi direct d'un GIF (depuis la bibliothèque ou le lien collé)
  function sendGif(url) {
    var client = sb(), u = curUser();
    if (!client || !u) { if (window.MGR2Auth) window.MGR2Auth.openLogin(); return; }
    var row = { user_id: u.id, pseudo: myPseudo() || 'élève', body: url, kind: 'image' };
    client.from(TABLE).insert(row).select().single().then(function (res) {
      if (res.error) { console.warn('gif send:', res.error.message); toast('Échec de l\'envoi.', '#f87171'); return; }
      appendMessage(res.data, true);
    });
    _mediaOpen = false; renderPanels();
  }
  window.chatGifSend = function (url) { sendGif(url); };

  /* ---- envoyer une image / GIF depuis la galerie (upload Supabase Storage) ---- */
  var STORAGE_BUCKET = 'chat-media';
  window.chatPickFile = function () {
    var inp = el('chat-file-input');
    if (inp) inp.click();
  };
  window.chatHandleFile = function (file) {
    if (!file) return;
    var client = sb(), u = curUser();
    if (!client || !u) { if (window.MGR2Auth) window.MGR2Auth.openLogin(); return; }
    if (!/^image\//.test(file.type)) { toast('Choisis une image ou un GIF.', '#f87171'); return; }
    if (file.size > 6 * 1024 * 1024) { toast('Fichier trop lourd (max 6 Mo).', '#f87171'); return; }
    if (!client.storage) { toast('Stockage indisponible.', '#f87171'); return; }
    toast('Envoi du fichier…', 'var(--color-nav)');
    var ext = (file.name.split('.').pop() || 'img').toLowerCase().replace(/[^a-z0-9]/g, '') || 'img';
    var path = u.id + '/' + Date.now() + '.' + ext;
    client.storage.from(STORAGE_BUCKET).upload(path, file, { upsert: false, contentType: file.type })
      .then(function (res) {
        if (res.error) throw res.error;
        var pub = client.storage.from(STORAGE_BUCKET).getPublicUrl(path);
        var url = pub && pub.data && pub.data.publicUrl;
        if (!url) throw new Error('pas d\'URL publique');
        sendGif(url);
      })
      .catch(function (e) {
        console.warn('upload:', e.message || e);
        toast('Échec de l\'envoi. (Espace de stockage Supabase bien créé ?)', '#f87171');
      });
  };
  window.chatSendMedia = function () {
    var inp = el('chat-media-url');
    if (!inp) return;
    var url = (inp.value || '').trim();
    if (!looksLikeGif(url)) { toast('Colle un lien d\'image ou de GIF (png, jpg, gif, webp…).', '#f87171'); return; }
    inp.value = '';
    sendGif(url);
  };

  /* ---- favoris GIF (comme TikTok) ---- */
  function getFavs() { try { return JSON.parse(localStorage.getItem(FAV_KEY) || '[]'); } catch (e) { return []; } }
  function setFavs(a) { try { localStorage.setItem(FAV_KEY, JSON.stringify(a.slice(0, 60))); } catch (e) {} }
  function isFav(url) { return getFavs().some(function (g) { return g.url === url; }); }
  window.chatGifFav = function (ev, url, preview) {
    if (ev) { ev.stopPropagation(); }
    var favs = getFavs();
    if (isFav(url)) { favs = favs.filter(function (g) { return g.url !== url; }); }
    else { favs.unshift({ url: url, preview: preview || url }); }
    setFavs(favs);
    if (_gifTab === 'favs') gifRenderFavs();
    else { // mettre à jour l'étoile en place
      var btn = ev && ev.currentTarget;
      if (btn) btn.textContent = isFav(url) ? '⭐' : '☆';
    }
  };

  /* ---- bibliothèque GIF (Giphy) ---- */
  window.chatGifTab = function (tab) {
    _gifTab = tab;
    var s = el('chat-gif-search');
    document.querySelectorAll('.chat-gif-tab').forEach(function (b) { b.classList.toggle('active', b.dataset.tab === tab); });
    if (tab === 'favs') { gifRenderFavs(); }
    else if (tab === 'trending') { if (s) s.value = ''; gifLoad(); }
  };
  window.chatGifSearchInput = function (val) {
    clearTimeout(_gifSearchTimer);
    var q = (val || '').trim();
    _gifSearchTimer = setTimeout(function () {
      if (!q) { _gifTab = 'trending'; document.querySelectorAll('.chat-gif-tab').forEach(function (b) { b.classList.toggle('active', b.dataset.tab === 'trending'); }); gifLoad(); }
      else { _gifTab = 'search'; gifLoad(q); }
    }, 350);
  };

  function gifGrid() { return el('chat-gif-grid'); }
  function gifLoading() { var g = gifGrid(); if (g) g.innerHTML = '<p class="chat-gif-msg">Chargement des GIF…</p>'; }

  function gifLoad(query) {
    var g = gifGrid();
    if (!g) return;
    gifLoading();
    var base = 'https://api.giphy.com/v1/gifs/';
    var url = query
      ? base + 'search?api_key=' + giphyKey() + '&q=' + encodeURIComponent(query) + '&limit=24&rating=pg&bundle=fixed_width'
      : base + 'trending?api_key=' + giphyKey() + '&limit=24&rating=pg&bundle=fixed_width';
    fetch(url).then(function (r) { return r.json(); }).then(function (j) {
      if (!j || !j.data) throw new Error('no data');
      gifRenderList(j.data.map(function (it) {
        var im = it.images || {};
        var full = (im.fixed_width && im.fixed_width.url) || (im.original && im.original.url) || '';
        var prev = (im.fixed_width_downsampled && im.fixed_width_downsampled.url) || (im.preview_gif && im.preview_gif.url) || full;
        return { url: full, preview: prev };
      }).filter(function (x) { return x.url; }));
    }).catch(function (e) {
      console.warn('giphy:', e.message);
      if (g) g.innerHTML = '<p class="chat-gif-msg">😕 Bibliothèque GIF indisponible.<br>' +
        '<span style="font-size:12px;opacity:.8;">Tu peux quand même coller un lien de GIF ci-dessous.</span></p>' +
        '<div style="display:flex;gap:8px;margin-top:.6rem;">' +
        '<input id="chat-media-url" type="text" placeholder="https://…/animation.gif" class="chat-gif-urlinp" onkeydown="if(event.key===\'Enter\'){event.preventDefault();chatSendMedia();}">' +
        '<button type="button" class="chat-gif-urlbtn" onclick="chatSendMedia()">Envoyer</button></div>';
    });
  }

  function gifRenderFavs() {
    var favs = getFavs();
    if (!favs.length) { var g = gifGrid(); if (g) g.innerHTML = '<p class="chat-gif-msg">⭐ Pas encore de favoris.<br><span style="font-size:12px;opacity:.8;">Touche l\'étoile sur un GIF pour le garder ici.</span></p>'; return; }
    gifRenderList(favs);
  }

  function gifRenderList(items) {
    var g = gifGrid();
    if (!g) return;
    if (!items.length) { g.innerHTML = '<p class="chat-gif-msg">Aucun GIF trouvé.</p>'; return; }
    g.innerHTML = items.map(function (it) {
      var u = esc(it.url), p = esc(it.preview || it.url);
      var star = isFav(it.url) ? '⭐' : '☆';
      return '<div class="chat-gif-item" onclick="chatGifSend(\'' + u + '\')">' +
               '<img src="' + p + '" loading="lazy" alt="gif">' +
               '<button type="button" class="chat-gif-star" onclick="chatGifFav(event,\'' + u + '\',\'' + p + '\')">' + star + '</button>' +
             '</div>';
    }).join('');
  }

  var EMOJIS = ['😀','😂','😅','😎','🤔','😭','🥳','👍','👎','🙏','🔥','💯','✅','❌','❓','💡',
                '🧠','📐','📏','✏️','📚','🤯','😴','💪','👀','🎉','➕','➖','✖️','➗','π','√','∞','≤','≥','≠','²','³','°'];
  function renderPanels() {
    var p = el('chat-panel');
    if (!p) return;
    if (_emojiOpen) {
      p.style.display = 'block';
      p.innerHTML = '<div class="chat-emoji-grid">' + EMOJIS.map(function (em) {
        return '<button type="button" class="chat-emoji" onclick="chatInsert(\'' + em + '\')">' + em + '</button>';
      }).join('') + '</div>';
    } else if (_mediaOpen) {
      p.style.display = 'block';
      p.innerHTML =
        '<div class="chat-gif">' +
          '<div class="chat-gif-head">' +
            '<input id="chat-gif-search" type="text" class="chat-gif-search" placeholder="🔍 Rechercher un GIF…" oninput="chatGifSearchInput(this.value)">' +
            '<button type="button" class="chat-gif-tab active" data-tab="trending" onclick="chatGifTab(\'trending\')">🔥 Tendances</button>' +
            '<button type="button" class="chat-gif-tab" data-tab="favs" onclick="chatGifTab(\'favs\')">⭐ Favoris</button>' +
            '<button type="button" class="chat-gif-tab chat-gif-upload" onclick="chatPickFile()">📁 Galerie</button>' +
          '</div>' +
          '<div id="chat-gif-grid" class="chat-gif-grid"><p class="chat-gif-msg">Chargement…</p></div>' +
          '<div class="chat-gif-credit">GIF via GIPHY</div>' +
        '</div>';
    } else {
      p.style.display = 'none';
      p.innerHTML = '';
    }
  }

  /* ---- aperçu en direct INSTANTANÉ (on voit la formule rendue pendant qu'on écrit) ---- */
  var _previewBusy = false, _previewDirty = false;
  function typesetPreviewNow() {
    var prev = el('chat-preview');
    if (!prev || !window.MathJax || !MathJax.typesetPromise) return;
    if (_previewBusy) { _previewDirty = true; return; } // une seule passe à la fois, on re-rendra si besoin
    _previewBusy = true;
    if (MathJax.typesetClear) { try { MathJax.typesetClear([prev]); } catch (e) {} }
    MathJax.typesetPromise([prev]).catch(function () {}).then(function () {
      _previewBusy = false;
      if (_previewDirty) { _previewDirty = false; typesetPreviewNow(); }
    });
  }
  function updatePreview() {
    var input = el('chat-input'), prev = el('chat-preview');
    if (!input || !prev) return;
    var v = editorText();
    if (!v.trim() || looksLikeGif(v.trim())) { prev.style.display = 'none'; prev.innerHTML = ''; return; }
    var rendered = autoWrapMath(esc(v));
    var hasMath = rendered !== esc(v);
    prev.style.display = 'block';
    prev.className = 'chat-preview' + (hasMath ? ' has-math' : '');
    prev.innerHTML = '<span class="chat-preview-label">aperçu</span><span class="chat-preview-body">' + rendered + '</span>';
    if (hasMath) typesetPreviewNow(); // rendu maths immédiat
  }

  function autoGrow(t) {
    if (!t) return;
    t.style.height = 'auto';
    t.style.height = Math.min(t.scrollHeight, 140) + 'px';
  }

  function toast(msg, color) {
    if (typeof showToast === 'function') showToast(msg, color || 'var(--color-nav)');
  }

  /* ---- init (appelé quand on ouvre l'onglet, et à chaque changement d'auth) ---- */
  function refreshGate() {
    if (!sb()) {
      showGate('<div class="chat-gate-card">🔌<h3>Chat hors-ligne</h3>' +
        '<p>Le Chat Mondial a besoin d\'une connexion internet. Le reste du site fonctionne normalement.</p></div>');
      return false;
    }
    if (!curUser()) {
      showGate('<div class="chat-gate-card">👤<h3>Connecte-toi pour discuter</h3>' +
        '<p>Choisis un pseudo (gratuit) pour rejoindre le salon, poser tes questions et aider les autres.</p>' +
        '<button class="chat-gate-btn" onclick="MGR2Auth.openLogin()">Se connecter / Créer un pseudo</button></div>');
      return false;
    }
    showMain();
    return true;
  }

  // Attache les écouteurs de la zone de saisie UNE SEULE FOIS (dès que le chat est ouvert,
  // même pas encore connecté) -> Entrée envoie toujours, peu importe l'ordre connexion/ouverture.
  function wireInput() {
    var input = el('chat-input');
    if (!input || input._wired) return;
    input._wired = true;
    input.addEventListener('input', function () {
      if (!input.textContent.trim() && !input.querySelector('.mw')) input.innerHTML = ''; // garde le placeholder
      updatePreview();
    });
    input.addEventListener('keyup', saveRange);
    input.addEventListener('mouseup', saveRange);
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); window.chatSend(); return; }
      if (e.key === 'Backspace') { editorBackspace(e); }
    });
    input.addEventListener('paste', function (e) {
      e.preventDefault();
      var t = ((e.clipboardData || window.clipboardData).getData('text') || '');
      document.execCommand('insertText', false, t);
    });
  }

  window.initChat = function () {
    wireInput();              // toujours, avant même le contrôle de connexion
    var ok = refreshGate();
    if (!ok) return;
    wireInput();              // au cas où #chat-input vient d'apparaître
    if (!_initDone) {
      _initDone = true;
      loadMessages();
      subscribe();
    }
  };

  // Quand l'utilisateur se connecte / se déconnecte pendant qu'il est sur l'onglet chat
  var _prevAuthHook = window.onAuthChanged;
  window.onAuthChanged = function () {
    if (typeof _prevAuthHook === 'function') { try { _prevAuthHook(); } catch (e) {} }
    var chatSection = el('chat');
    var onChat = chatSection && chatSection.classList.contains('active');
    if (onChat) { window.initChat(); }       // ré-initialise (et re-câble la saisie) après connexion
    else { refreshGate(); }
  };
})();
