/* ============================================================
   notes.js — Bloc-notes (comme Discord en appel) 📒
   - 🔒 PRIVÉ : visible par toi seul. Sauvé dans ta progression
     (localStorage + cloud par compte) → retrouvé sur tous tes appareils.
   - 🌍 COLLECTIF : un bloc-notes partagé par TOUT LE MONDE, en temps réel
     (Supabase). Nécessite d'être connecté + la table shared_note (_SQL_notes.sql).
   Fonctions : écrire, dessiner (le dessin devient une image dans la note),
   insérer des images (compressées), palette de caractères spéciaux de tous les cours.
   100% défensif : hors-ligne → le privé marche, le collectif explique quoi faire.
   ============================================================ */
(function () {
  'use strict';

  var MAX_NOTE_BYTES = 400000;   // ~400 Ko par note privée (images comprises)
  var IMG_MAX_SIDE = 800;        // côté max d'une image insérée (compression)
  var _tab = 'prive';            // 'prive' | 'collectif'
  var _saveTimer = null;
  var _collabChannel = null;
  var _collabPushTimer = null;
  var _lastLocalEdit = 0;
  var _collabLoaded = false;

  function sb()      { return window.MGR2Auth ? window.MGR2Auth.sb() : null; }
  function curUser() { return window.MGR2Auth ? window.MGR2Auth.user() : null; }
  function myPseudo(){ return (window.MGR2Auth && window.MGR2Auth.pseudo()) || 'élève'; }
  function el(id)    { return document.getElementById(id); }
  function toast(m, c) { if (typeof showToast === 'function') showToast(m, c || 'var(--color-nav)'); }

  /* ---------- nettoyage HTML (anti-XSS) : on ne garde que le strict utile ---------- */
  var OK_TAGS = { DIV: 1, P: 1, BR: 1, B: 1, STRONG: 1, I: 1, EM: 1, U: 1, SPAN: 1, IMG: 1 };
  function sanitize(html) {
    var root = document.createElement('div');
    root.innerHTML = String(html || '');
    (function walk(node) {
      var children = [].slice.call(node.childNodes);
      children.forEach(function (c) {
        if (c.nodeType === 3) return;                       // texte : ok
        if (c.nodeType !== 1 || !OK_TAGS[c.tagName]) {      // balise interdite → on garde le texte
          var txt = document.createTextNode(c.textContent || '');
          node.replaceChild(txt, c); return;
        }
        // attributs : on enlève tout sauf src sûr sur <img>
        [].slice.call(c.attributes).forEach(function (a) {
          if (c.tagName === 'IMG' && a.name === 'src' && /^(data:image\/|https:\/\/)/i.test(a.value)) return;
          c.removeAttribute(a.name);
        });
        if (c.tagName === 'IMG') c.className = 'note-img';
        walk(c);
      });
    })(root);
    return root.innerHTML;
  }

  /* ---------- caret : insertion au curseur dans l'éditeur actif ---------- */
  function activeEditor() { return el(_tab === 'prive' ? 'note-priv' : 'note-collab'); }
  function insertAtCaret(nodeOrText) {
    var ed = activeEditor(); if (!ed) return;
    ed.focus();
    var sel = window.getSelection();
    var range = (sel && sel.rangeCount && ed.contains(sel.getRangeAt(0).commonAncestorContainer))
      ? sel.getRangeAt(0)
      : (function () { var r = document.createRange(); r.selectNodeContents(ed); r.collapse(false); return r; })();
    range.deleteContents();
    var node = (typeof nodeOrText === 'string') ? document.createTextNode(nodeOrText) : nodeOrText;
    range.insertNode(node);
    range.setStartAfter(node); range.collapse(true);
    if (sel) { sel.removeAllRanges(); sel.addRange(range); }
    onEdited();
  }
  window.notesInsertChar = function (ch) { insertAtCaret(ch); };

  /* ---------- sauvegarde ---------- */
  function onEdited() {
    _lastLocalEdit = Date.now();
    if (_tab === 'prive') {
      clearTimeout(_saveTimer);
      _saveTimer = setTimeout(savePrivate, 800);
    } else {
      clearTimeout(_collabPushTimer);
      _collabPushTimer = setTimeout(pushCollab, 900);
    }
    var st = el('note-status'); if (st) st.textContent = '✍️ …';
  }
  function savePrivate() {
    var ed = el('note-priv'); if (!ed) return;
    var html = sanitize(ed.innerHTML);
    if (html.length > MAX_NOTE_BYTES) { toast('Note trop lourde — supprime une image 🖼️', '#f87171'); return; }
    var d = loadSavedData(); d.notesPrivate = html; saveData(d);
    var st = el('note-status'); if (st) st.textContent = '💾 Enregistré';
  }

  /* ---------- images : compression puis insertion ---------- */
  function compressImage(file, cb) {
    var img = new Image();
    img.onload = function () {
      var w = img.width, h = img.height;
      var k = Math.min(1, IMG_MAX_SIDE / Math.max(w, h));
      var cv = document.createElement('canvas');
      cv.width = Math.round(w * k); cv.height = Math.round(h * k);
      cv.getContext('2d').drawImage(img, 0, 0, cv.width, cv.height);
      cb(cv.toDataURL('image/jpeg', 0.82));
      URL.revokeObjectURL(img.src);
    };
    img.onerror = function () { toast('Image illisible', '#f87171'); };
    img.src = URL.createObjectURL(file);
  }
  window.notesPickImage = function () { var i = el('note-file'); if (i) i.click(); };
  window.notesHandleFile = function (file) {
    if (!file || !/^image\//.test(file.type)) return;
    compressImage(file, function (dataUrl) {
      var img = document.createElement('img');
      img.src = dataUrl; img.className = 'note-img';
      insertAtCaret(img);
    });
  };
  // coller : image → insérée compressée ; texte → TEXTE PUR (jamais de HTML brut,
  // pour éviter le style moche ET tout code caché collé depuis un site).
  function onPaste(e) {
    var cd = e.clipboardData || window.clipboardData || {};
    var items = cd.items || [];
    for (var i = 0; i < items.length; i++) {
      if (items[i].type && items[i].type.indexOf('image/') === 0) {
        e.preventDefault();
        window.notesHandleFile(items[i].getAsFile());
        return;
      }
    }
    e.preventDefault();
    var txt = cd.getData ? (cd.getData('text') || '') : '';
    if (txt) document.execCommand('insertText', false, txt);
  }

  /* ---------- DESSIN : petit atelier, le résultat devient une image de la note ----------
     Réutilisable ailleurs (Mes créations) : notesOpenDraw(callback) → le dessin
     est passé au callback au lieu d'être inséré dans le bloc-notes. */
  var _draw = { canvas: null, ctx: null, drawing: false, color: '#a78bfa', size: 4, erase: false };
  window.notesOpenDraw = function (onImg) {
    window._ndOnImg = (typeof onImg === 'function') ? onImg : null;
    var ov = el('note-draw-ov');
    if (!ov) {
      ov = document.createElement('div');
      ov.id = 'note-draw-ov';
      ov.innerHTML =
        '<div class="nd-box">' +
          '<div class="nd-tools">' +
            ['#a78bfa', '#60a5fa', '#34d399', '#fbbf24', '#f87171', '#ffffff', '#000000'].map(function (c) {
              return '<button type="button" class="nd-col" data-c="' + c + '" style="background:' + c + '" aria-label="couleur"></button>';
            }).join('') +
            '<button type="button" class="nd-tool" id="nd-erase" title="Gomme">🧹</button>' +
            '<input type="range" id="nd-size" min="2" max="18" value="4" title="Épaisseur" aria-label="Épaisseur du trait">' +
            '<button type="button" class="nd-tool" id="nd-clear" title="Tout effacer">🗑️</button>' +
          '</div>' +
          '<canvas id="nd-canvas" width="760" height="420"></canvas>' +
          '<div class="nd-actions">' +
            '<button type="button" id="nd-cancel" class="nd-btn">✕ Annuler</button>' +
            '<button type="button" id="nd-add" class="nd-btn nd-btn-ok">✅ Ajouter au bloc-notes</button>' +
          '</div>' +
        '</div>';
      document.body.appendChild(ov);
      var cv = el('nd-canvas');
      _draw.canvas = cv; _draw.ctx = cv.getContext('2d');
      resetCanvas();
      // souris + tactile via Pointer Events
      cv.addEventListener('pointerdown', function (e) { _draw.drawing = true; cv.setPointerCapture(e.pointerId); stroke(e, true); });
      cv.addEventListener('pointermove', function (e) { if (_draw.drawing) stroke(e, false); });
      cv.addEventListener('pointerup', function () { _draw.drawing = false; });
      ov.querySelectorAll('.nd-col').forEach(function (b) {
        b.addEventListener('click', function () { _draw.color = b.dataset.c; _draw.erase = false; el('nd-erase').classList.remove('on'); });
      });
      el('nd-erase').addEventListener('click', function () { _draw.erase = !_draw.erase; this.classList.toggle('on', _draw.erase); });
      el('nd-size').addEventListener('input', function () { _draw.size = +this.value; });
      el('nd-clear').addEventListener('click', resetCanvas);
      el('nd-cancel').addEventListener('click', function () { ov.style.display = 'none'; window._ndOnImg = null; });
      el('nd-add').addEventListener('click', function () {
        var img = document.createElement('img');
        img.src = _draw.canvas.toDataURL('image/png'); img.className = 'note-img';
        ov.style.display = 'none';
        var cb = window._ndOnImg; window._ndOnImg = null;
        if (cb) cb(img); else insertAtCaret(img);
        toast('🎨 Dessin ajouté');
      });
    }
    ov.style.display = 'flex';
  };
  function resetCanvas() {
    var c = _draw.ctx, cv = _draw.canvas;
    c.fillStyle = '#11131f'; c.fillRect(0, 0, cv.width, cv.height);
  }
  function stroke(e, start) {
    var r = _draw.canvas.getBoundingClientRect();
    var x = (e.clientX - r.left) * (_draw.canvas.width / r.width);
    var y = (e.clientY - r.top) * (_draw.canvas.height / r.height);
    var c = _draw.ctx;
    c.strokeStyle = _draw.erase ? '#11131f' : _draw.color;
    c.lineWidth = _draw.erase ? _draw.size * 4 : _draw.size;
    c.lineCap = 'round'; c.lineJoin = 'round';
    if (start) { c.beginPath(); c.moveTo(x, y); c.lineTo(x + 0.01, y + 0.01); }
    else c.lineTo(x, y);
    c.stroke();
  }

  /* ---------- palette de caractères spéciaux (tous les cours) ---------- */
  var CHAR_GROUPS = [
    ['📐 Maths', ['√','²','³','ⁿ','π','±','×','÷','≈','≤','≥','≠','∞','→','∈','∉','∥','⊥','°','Δ','∑','∫','½','⅓','¼','¾','ƒ','|','‖','·']],
    ['🧪 Chimie', ['→','⇌','↑','↓','₀','₁','₂','₃','₄','₅','₆','⁰','¹','²','³','⁺','⁻','Δ','°C','mol','⇄','≡']],
    ['🇫🇷 Accents', ['é','è','ê','ë','à','â','ä','ù','û','ü','î','ï','ô','ö','ç','œ','æ','É','È','À','Ç','«','»','…','’']],
    ['🇳🇱 / 🇬🇧', ['ij','’t','ë','ï','ö','ü','€','£','&','#']],
    ['🔣 Grec', ['α','β','γ','δ','ε','θ','λ','μ','ρ','σ','φ','ω','Ω','Φ','Σ','Π']],
    ['✏️ Divers', ['✔','✘','★','☆','♥','⚠','❗','❓','•','◦','→','⇒','⇔','↦','—','№','§']]
  ];
  window.NOTE_CHAR_GROUPS = CHAR_GROUPS; // réutilisée par 🎨 Mes créations (creations.js)
  window.notesToggleChars = function () {
    var p = el('note-chars');
    if (!p) return;
    var open = p.style.display !== 'none';
    p.style.display = open ? 'none' : 'block';
    if (!open && !p.innerHTML) {
      p.innerHTML = CHAR_GROUPS.map(function (g) {
        return '<div class="note-chgrp"><span class="note-chlab">' + g[0] + '</span>' +
          g[1].map(function (ch) {
            return '<button type="button" class="note-ch" onmousedown="event.preventDefault()" onclick="notesInsertChar(\'' + ch.replace(/'/g, "\\'") + '\')">' + ch + '</button>';
          }).join('') + '</div>';
      }).join('');
    }
  };

  /* ---------- COLLECTIF (Supabase temps réel, 1 note partagée) ---------- */
  function collabGate(msg) {
    var g = el('note-collab-gate'), ed = el('note-collab');
    if (g) { g.innerHTML = msg; g.style.display = 'block'; }
    if (ed) ed.style.display = 'none';
  }
  function collabShow() {
    var g = el('note-collab-gate'), ed = el('note-collab');
    if (g) g.style.display = 'none';
    if (ed) ed.style.display = 'block';
  }
  function loadCollab() {
    var client = sb();
    if (!client) { collabGate('🔌 Le bloc-notes collectif a besoin d\'internet.'); return; }
    if (!curUser()) { collabGate('👤 <b>Connecte-toi</b> pour écrire avec les autres dans le bloc-notes collectif.<br><button class="nav-btn" style="margin-top:10px; display:inline-block; width:auto; padding:8px 18px;" onclick="MGR2Auth.openLogin()">Se connecter</button>'); return; }
    collabShow();
    client.from('shared_note').select('content,updated_by,updated_at').eq('id', 1).maybeSingle().then(function (res) {
      if (res.error) {
        collabGate('🛠️ Table pas encore créée. Le créateur doit exécuter <code>_SQL_notes.sql</code> dans Supabase → SQL Editor. (Le bloc-notes privé marche déjà !)');
        return;
      }
      var ed = el('note-collab');
      if (ed && res.data) {
        ed.innerHTML = sanitize(res.data.content || '');
        var by = el('note-collab-by');
        if (by && res.data.updated_by) by.textContent = '✍️ Dernière modif : ' + res.data.updated_by;
      }
      _collabLoaded = true;
      subscribeCollab();
    });
  }
  function pushCollab() {
    var client = sb(); if (!client || !curUser() || !_collabLoaded) return;
    var ed = el('note-collab'); if (!ed) return;
    var html = sanitize(ed.innerHTML);
    if (html.length > MAX_NOTE_BYTES) { toast('Note collective trop lourde 🖼️', '#f87171'); return; }
    client.from('shared_note').update({ content: html, updated_by: myPseudo(), updated_at: new Date().toISOString() }).eq('id', 1)
      .then(function (r) {
        var st = el('note-status');
        if (r.error) { if (st) st.textContent = '⚠️ envoi raté'; }
        else if (st) st.textContent = '🌍 Partagé';
      });
  }
  function subscribeCollab() {
    var client = sb(); if (!client || _collabChannel) return;
    try {
      _collabChannel = client.channel('shared-note')
        .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'shared_note' }, function (payload) {
          var row = payload.new || {};
          if (row.updated_by === myPseudo() && Date.now() - _lastLocalEdit < 5000) return; // ma propre modif
          if (Date.now() - _lastLocalEdit < 2000) return; // je suis en train d'écrire : on ne m'écrase pas
          var ed = el('note-collab');
          if (ed) {
            ed.innerHTML = sanitize(row.content || '');
            var by = el('note-collab-by');
            if (by && row.updated_by) by.textContent = '✍️ Dernière modif : ' + row.updated_by;
          }
        })
        .subscribe();
    } catch (e) {}
  }

  /* ---------- UI : onglets + init ---------- */
  window.notesSwitch = function (tab) {
    _tab = tab;
    var bp = el('note-tab-prive'), bc = el('note-tab-collab');
    if (bp) bp.classList.toggle('on', tab === 'prive');
    if (bc) bc.classList.toggle('on', tab === 'collectif');
    var wp = el('note-wrap-prive'), wc = el('note-wrap-collab');
    if (wp) wp.style.display = tab === 'prive' ? 'block' : 'none';
    if (wc) wc.style.display = tab === 'collectif' ? 'block' : 'none';
    var st = el('note-status'); if (st) st.textContent = '';
    if (tab === 'collectif') loadCollab();
  };

  function wire(edId) {
    var ed = el(edId);
    if (!ed || ed._wired) return;
    ed._wired = true;
    ed.addEventListener('input', onEdited);
    ed.addEventListener('paste', onPaste);
  }

  window.initNotes = function () {
    // charge la note privée
    var ed = el('note-priv');
    if (ed && !ed._loaded) {
      ed._loaded = true;
      var d = loadSavedData();
      ed.innerHTML = sanitize(d.notesPrivate || '');
    }
    wire('note-priv'); wire('note-collab');
    if (_tab === 'collectif') loadCollab();
  };

  // si l'utilisateur se connecte pendant qu'il est sur l'onglet collectif
  var _prevHook = window.onAuthChanged;
  window.onAuthChanged = function () {
    if (typeof _prevHook === 'function') { try { _prevHook(); } catch (e) {} }
    var sec = el('notes');
    if (sec && sec.classList.contains('active') && _tab === 'collectif') loadCollab();
  };
})();
