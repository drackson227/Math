/*! GR2 Study © 2026 Drackson — Tous droits réservés. Copie, reproduction ou réutilisation du code interdites sans autorisation écrite (Instagram @drackson227). */
/* ============================================================
   creations.js — 🎨 Mes créations
   L'élève crée SES propres contenus, rangés par matière :
   - ❓ Questions de quiz   (formulaire historique, logique dans script.js)
   - 🎴 Flashcards persos   (recto/verso, texte + image) → fusionnées dans
     le paquet de l'onglet Flashcards de la matière (répétition espacée incluse)
   - 📜 Synthèses persos    (éditeur riche : gras/italique, images compressées,
     dessin via l'atelier du bloc-notes, caractères spéciaux, formules)
   - ƒ𝑥 Éditeur de formules VISUEL réutilisable partout : on assemble des blocs
     (fraction avec la vraie barre au-dessus/au-dessous, racine, puissance,
     indice, vecteur…), aperçu MathJax en direct, insertion en \( … \).
   Stockage : data.customCards / data.customNotes via saveData()
   (localStorage + cloud par compte). 100% défensif : tout est optionnel.
   ============================================================ */
(function () {
  'use strict';

  var MAX_NOTE_BYTES = 400000;  // ~400 Ko par synthèse (images comprises)
  var IMG_MAX_SIDE = 800;       // images de synthèse
  var CARD_IMG_SIDE = 520;      // images de flashcard (plus petites : la carte reste légère)

  function el(id) { return document.getElementById(id); }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function subj() { return window.currentSubject || 'maths'; }
  function toast(m, c) { if (typeof showToast === 'function') showToast(m, c || 'var(--color-nav)'); }
  function chapName(ch) {
    return (typeof CHAP_LABELS !== 'undefined' && CHAP_LABELS && CHAP_LABELS[ch]) ? CHAP_LABELS[ch] : (ch || '');
  }

  /* ---------- même nettoyage anti-XSS que le bloc-notes ---------- */
  var OK_TAGS = { DIV: 1, P: 1, BR: 1, B: 1, STRONG: 1, I: 1, EM: 1, U: 1, SPAN: 1, IMG: 1, UL: 1, OL: 1, LI: 1, H1: 1, H2: 1, H3: 1, BLOCKQUOTE: 1 };
  // ne garde QUE les styles utiles & sûrs : taille (A−/A+), couleur 🎨, surlignage 🖍️, alignement ↔
  function safeStyle(v) {
    var out = [];
    String(v || '').split(';').forEach(function (d) {
      var i = d.indexOf(':'); if (i < 0) return;
      var prop = d.slice(0, i).trim().toLowerCase(), val = d.slice(i + 1).trim();
      var colorRe = /^(#[0-9a-f]{3,8}|rgba?\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*(,\s*[\d.]+\s*)?\))$/i;
      if (prop === 'font-size' && /^\d{1,2}px$/.test(val)) out.push('font-size:' + val);
      else if (prop === 'color' && colorRe.test(val)) out.push('color:' + val);
      else if ((prop === 'background-color' || prop === 'background') && colorRe.test(val)) out.push('background-color:' + val);
      else if (prop === 'text-align' && /^(left|center|right|justify)$/.test(val)) out.push('text-align:' + val);
    });
    return out.join(';');
  }
  function sanitize(html) {
    var root = document.createElement('div');
    root.innerHTML = String(html || '');
    (function walk(node) {
      var children = [].slice.call(node.childNodes);
      children.forEach(function (c) {
        if (c.nodeType === 3) return;
        if (c.nodeType !== 1 || !OK_TAGS[c.tagName]) {
          var txt = document.createTextNode(c.textContent || '');
          node.replaceChild(txt, c); return;
        }
        [].slice.call(c.attributes).forEach(function (a) {
          if (c.tagName === 'IMG' && a.name === 'src' && /^(data:image\/|https:\/\/)/i.test(a.value)) return;
          if (c.tagName === 'IMG' && a.name === 'alt') return; // garde la formule LaTeX d'origine
          if (c.tagName === 'IMG' && a.name === 'class' && a.value === 'cre-fx-img') return; // image-formule ƒ𝑥
          if ((c.tagName === 'SPAN' || c.tagName === 'DIV' || c.tagName === 'P' || c.tagName === 'LI' || c.tagName === 'H1' || c.tagName === 'H2' || c.tagName === 'H3' || c.tagName === 'BLOCKQUOTE') && a.name === 'style') {
            var s = safeStyle(a.value);
            if (s) { c.setAttribute('style', s); return; } // taille / couleur / surlignage / alignement
          }
          // ☑ cases à cocher : on garde la classe (cre-todo / cre-todo-box) + contenteditable=false
          if ((c.tagName === 'DIV' || c.tagName === 'SPAN') && a.name === 'class' && /^(cre-todo( done)?|cre-todo-box)$/.test(a.value)) return;
          if (c.tagName === 'SPAN' && a.name === 'contenteditable' && a.value === 'false') return;
          c.removeAttribute(a.name);
        });
        if (c.tagName === 'IMG' && c.className !== 'cre-fx-img') c.className = 'note-img';
        walk(c);
      });
    })(root);
    return root.innerHTML;
  }

  /* ---------- compression d'image (même recette que le bloc-notes) ---------- */
  function compressImage(file, maxSide, cb) {
    var img = new Image();
    img.onload = function () {
      var w = img.width, h = img.height;
      var k = Math.min(1, maxSide / Math.max(w, h));
      var cv = document.createElement('canvas');
      cv.width = Math.round(w * k); cv.height = Math.round(h * k);
      cv.getContext('2d').drawImage(img, 0, 0, cv.width, cv.height);
      cb(cv.toDataURL('image/jpeg', 0.82));
      URL.revokeObjectURL(img.src);
    };
    img.onerror = function () { toast('Image illisible', '#f87171'); };
    img.src = URL.createObjectURL(file);
  }

  /* ---------- onglets de la section ---------- */
  window.creSwitch = function (tab) {
    ['quiz', 'cards', 'notes'].forEach(function (t) {
      var p = el('cre-pane-' + t); if (p) p.style.display = (t === tab) ? '' : 'none';
      var b = el('cre-tab-' + t); if (b) b.classList.toggle('on', t === tab);
    });
    if (tab === 'cards') renderCustomCards();
    if (tab === 'notes') { closeEditor(); renderCustomNotes(); }
    try { localStorage.setItem('mathsgr2_cretab', tab); } catch (e) {} // mémorise le dernier onglet
  };

  /* ════════════════ 🎴 FLASHCARDS PERSOS ════════════════ */
  var _cardImg = { front: null, back: null };
  var _imgSide = 'front';
  var _cardEditId = null; // id de la carte en cours de modification (sinon création)

  window.crePickCardImg = function (side) {
    _imgSide = side;
    var i = el('cre-card-file'); if (i) { i.value = ''; i.click(); }
  };
  window.creCardFile = function (input) {
    var f = input.files && input.files[0];
    if (!f || !/^image\//.test(f.type)) return;
    compressImage(f, CARD_IMG_SIDE, function (dataUrl) {
      _cardImg[_imgSide] = dataUrl;
      updateImgChips();
    });
  };
  window.creCardImgClear = function (side) { _cardImg[side] = null; updateImgChips(); };
  function updateImgChips() {
    ['front', 'back'].forEach(function (s) {
      var chip = el('cre-img-' + s);
      if (!chip) return;
      var im = chip.querySelector('img');
      if (_cardImg[s]) { chip.style.display = 'inline-flex'; if (im) im.src = _cardImg[s]; }
      else chip.style.display = 'none';
    });
  }

  // texte (échappé) + image éventuelle → HTML d'une face de carte
  function sideHtml(text, img) {
    var h = esc(text).replace(/\n/g, '<br>');
    if (img) h += (h ? '<br>' : '') + '<img class="note-img" src="' + img + '" alt="">';
    return h;
  }

  window.saveCustomCard = function () {
    var sel = el('cre-card-theme');
    var fEl = el('cre-card-front'), bEl = el('cre-card-back');
    var front = fEl ? fEl.value.trim() : '';
    var back = bEl ? bEl.value.trim() : '';
    if ((!front && !_cardImg.front) || (!back && !_cardImg.back)) {
      toast('⚠️ Remplis le recto ET le verso (texte ou image)', '#f87171'); return;
    }
    var d = loadSavedData();
    d.customCards = d.customCards || [];
    if (_cardEditId) { // ✏️ mise à jour d'une carte existante
      var ce = d.customCards.find(function (x) { return x.id === _cardEditId; });
      if (ce) { ce.chapter = sel ? sel.value : ''; ce.front = sideHtml(front, _cardImg.front); ce.back = sideHtml(back, _cardImg.back); ce.updated = new Date().toISOString(); }
      _cardEditId = null;
      var btnU = el('cre-card-save-btn'); if (btnU) btnU.textContent = '💾 Créer la flashcard';
      toast('✅ Flashcard mise à jour');
    } else {
      d.customCards.unshift({
        id: Date.now(), subject: subj(), chapter: sel ? sel.value : '',
        front: sideHtml(front, _cardImg.front), back: sideHtml(back, _cardImg.back),
        created: new Date().toISOString()
      });
      toast('✅ Flashcard créée — retrouve-la dans l\'onglet 🎴 Flashcards');
    }
    saveData(d);
    if (fEl) fEl.value = '';
    if (bEl) bEl.value = '';
    _cardImg = { front: null, back: null }; updateImgChips();
    creFxPreview('cre-card-front', 'cre-card-front-prev'); creFxPreview('cre-card-back', 'cre-card-back-prev');
    renderCustomCards();
    refreshDeck();
  };

  // texte affichable (HTML stocké → texte brut éditable) + récup de l'image éventuelle
  function htmlToPlain(html) {
    var dv = document.createElement('div');
    dv.innerHTML = String(html || '').replace(/<img[^>]*>/gi, '');
    dv.querySelectorAll('br').forEach(function (b) { b.replaceWith('\n'); });
    return (dv.textContent || '').replace(/ /g, ' ').trim();
  }
  function extractImg(html) {
    var m = String(html || '').match(/<img[^>]*src="([^"]+)"/i);
    return m ? m[1] : null;
  }
  window.editCustomCard = function (id) {
    var c = (loadSavedData().customCards || []).find(function (x) { return x.id === id; });
    if (!c) return;
    _cardEditId = id;
    var fEl = el('cre-card-front'), bEl = el('cre-card-back'), th = el('cre-card-theme');
    if (fEl) fEl.value = htmlToPlain(c.front);
    if (bEl) bEl.value = htmlToPlain(c.back);
    if (th && c.chapter) { try { th.value = c.chapter; } catch (e) {} }
    _cardImg.front = extractImg(c.front); _cardImg.back = extractImg(c.back); updateImgChips();
    creFxPreview('cre-card-front', 'cre-card-front-prev'); creFxPreview('cre-card-back', 'cre-card-back-prev');
    var btn = el('cre-card-save-btn'); if (btn) btn.textContent = '✏️ Mettre à jour la flashcard';
    if (fEl) { try { fEl.scrollIntoView({ behavior: 'smooth', block: 'center' }); } catch (e) {} fEl.focus(); }
    toast('✏️ Modifie le recto/verso puis « Mettre à jour »');
  };

  window.deleteCustomCard = function (id) {
    if (!confirm('Supprimer cette flashcard ? (irréversible)')) return;
    var d = loadSavedData();
    d.customCards = (d.customCards || []).filter(function (c) { return c.id !== id; });
    saveData(d);
    if (_cardEditId === id) { _cardEditId = null; var b = el('cre-card-save-btn'); if (b) b.textContent = '💾 Créer la flashcard'; }
    renderCustomCards(); refreshDeck();
    toast('🗑️ Flashcard supprimée', '#f87171');
  };

  function myCards() {
    var cur = subj();
    return (loadSavedData().customCards || []).filter(function (c) { return (c.subject || 'maths') === cur; });
  }

  function renderCustomCards() {
    var list = el('cre-card-list'); if (!list) return;
    var cards = myCards();
    var goBtn = el('cre-cards-go'); if (goBtn) goBtn.style.display = cards.length ? '' : 'none';
    if (!cards.length) {
      list.innerHTML = '<div class="cre-empty">Aucune flashcard perso pour l\'instant.<br>Crée ta première carte avec le formulaire ! 👈</div>';
      return;
    }
    list.innerHTML = cards.map(function (c) {
      return '<div class="cre-item">' +
        '<div class="cre-item-top"><span class="cre-chip">' + esc(chapName(c.chapter)) + '</span>' +
        '<span class="cre-item-acts"><button class="cre-del" onclick="editCustomCard(' + c.id + ')" aria-label="Modifier la carte">✏️</button>' +
        '<button class="cre-del" onclick="deleteCustomCard(' + c.id + ')" aria-label="Supprimer la carte">🗑️</button></span></div>' +
        '<div class="cre-card-face"><span class="cre-facelab">Recto</span>' + sanitize(c.front) + '</div>' +
        '<div class="cre-card-face cre-face-back"><span class="cre-facelab">Verso</span>' + sanitize(c.back) + '</div>' +
      '</div>';
    }).join('');
    if (typeof safeMathJax === 'function') safeMathJax([list]);
  }

  /* Cartes persos de la matière, au format du paquet (appelé par subjects.js) */
  window.customCardsFor = function (key) {
    try {
      return (loadSavedData().customCards || [])
        .filter(function (c) { return (c.subject || 'maths') === (key || subj()); })
        .map(function (c) { return { front: c.front, back: c.back, chapter: c.chapter, _custom: c.id }; });
    } catch (e) { return []; }
  };

  // Reconstruit le paquet global de la matière active (contenu officiel + cartes persos)
  function refreshDeck() {
    try {
      if (typeof flashcards === 'undefined') return;
      var s = window.SUBJECTS && window.SUBJECTS[subj()];
      var base = (s && s.content && s.content.flashcards)
        ? s.content.flashcards
        : flashcards.filter(function (c) { return !c._custom; });
      flashcards = base.concat(window.customCardsFor(subj()));
      if (typeof buildFlashcardQueue === 'function') buildFlashcardQueue();
    } catch (e) {}
  }

  window.creGoFlashcards = function () { if (typeof showSection === 'function') showSection('flashcards'); };

  /* ════════════════ 📜 SYNTHÈSES PERSOS ════════════════ */
  var _editId = null;

  function myNotes() {
    var cur = subj();
    return (loadSavedData().customNotes || []).filter(function (n) { return (n.subject || 'maths') === cur; });
  }

  function renderCustomNotes() {
    var list = el('cre-note-list'); if (!list) return;
    var notes = myNotes();
    if (!notes.length) {
      list.innerHTML = '<div class="cre-empty">Aucune synthèse perso.<br>Clique sur « ➕ Nouvelle synthèse » : texte, images, dessins, formules ƒ𝑥… tout est possible !</div>';
      return;
    }
    list.innerHTML = notes.map(function (n) {
      var dt = new Date(n.updated || n.created);
      return '<div class="cre-item">' +
        '<div class="cre-item-top">' +
          '<strong class="cre-note-title">📜 ' + esc(n.title) + '</strong>' +
          '<span class="cre-date">' + dt.toLocaleDateString('fr-BE') + '</span>' +
        '</div>' +
        '<div class="cre-actions">' +
          '<button class="cre-btn" onclick="creOpenNote(' + n.id + ')">👁 Lire</button>' +
          '<button class="cre-btn" onclick="creEditNote(' + n.id + ')">✏️ Modifier</button>' +
          '<button class="cre-btn cre-btn-danger" onclick="creDeleteNote(' + n.id + ')">🗑️ Supprimer</button>' +
        '</div>' +
      '</div>';
    }).join('');
  }

  window.creNewNote = function () { _editId = null; openEditor('', '', [], []); };
  window.creEditNote = function (id) {
    var n = (loadSavedData().customNotes || []).find(function (x) { return x.id === id; });
    if (!n) return;
    _editId = id; openEditor(n.title, n.html, n.strokes, n.boxes);
  };
  function openEditor(title, html, strokes, boxes) {
    var t = el('cre-note-title');
    if (t) t.value = title || '';
    var box = el('cre-note-edit'); if (box) box.style.display = '';
    var lw = el('cre-note-listwrap'); if (lw) lw.style.display = 'none';
    // le studio (tableau Discord partagé) se monte ici, chargé avec cette synthèse
    window.creBoardMount(el('cre-board-home'), { html: html, strokes: strokes, boxes: boxes }, {});
    var ed = el('cre-note-editor');
    if (t && !title) t.focus(); else if (ed) ed.focus();
  }

  /* ════════════════ 🧩 STUDIO PARTAGÉ (tableau Discord montable) ════════════════
     Le même tableau (outils + zoom + stylo + blocs) sert à DEUX endroits :
     l'éditeur de synthèses ET le Bloc-notes privé. creBoardMount() déplace le
     studio dans son hôte et charge l'état ; onChange (si fourni) reçoit l'état
     complet à chaque modification (avec un petit délai) → sauvegarde auto. */
  var _boardOnChange = null, _boardChTimer = null;
  function boardChanged() {
    if (!_boardOnChange) return;
    clearTimeout(_boardChTimer);
    _boardChTimer = setTimeout(function () {
      if (_boardOnChange) { try { _boardOnChange(window.creBoardState()); } catch (e) {} }
    }, 600);
  }
  // largeur de référence SANS l'espace vide à droite (sinon la lecture rétrécit tout)
  function trimInkW(strokes, boxes) {
    var used = 0;
    (strokes || []).forEach(function (st) {
      if (st.a && st.b) { used = Math.max(used, st.a[0], st.b[0]); }
      (st.pts || []).forEach(function (p) { used = Math.max(used, p[0]); });
    });
    (boxes || []).forEach(function (b) { used = Math.max(used, b.x + 240); });
    var wrap = el('cre-note-wrap');
    var baseW = (wrap && wrap.clientWidth) || 600;
    return Math.max(320, Math.min(_ink.inkW || baseW, Math.max(baseW, used + 60)));
  }
  window.creBoardState = function () {
    if (_ink.cur) inkUp(); // un trait encore « en cours » compte aussi
    var ed = el('cre-note-editor');
    var strokes = _ink.strokes || [], boxes = serializeBoxes();
    return { html: sanitize(ed ? ed.innerHTML : ''), strokes: strokes, boxes: boxes, inkW: trimInkW(strokes, boxes) };
  };
  window.creBoardMount = function (host, state, opts) {
    var studio = el('cre-studio');
    if (!studio || !host) return false;
    // l'hôte précédent sauve ses dernières modifs avant qu'on recharge le tableau
    clearTimeout(_boardChTimer);
    if (_boardOnChange) { try { _boardOnChange(window.creBoardState()); } catch (e) {} }
    _boardOnChange = null;
    window.creToggleFull(false);
    if (studio.parentNode !== host) host.appendChild(studio);
    var ed = el('cre-note-editor');
    if (ed) ed.innerHTML = sanitize((state && state.html) || '');
    wireEditor();
    _ink.strokes = validStrokes(state && state.strokes);
    _ink.redo = []; _ink.cur = null; _ink.on = false; _ink.pan = null;
    _ink.ext = { w: 0, h: 0 };
    _ink.tool = 'pen'; // nouveau tableau → on repart au stylo (pas la main ni la gomme)
    clearBoxes();
    _strokeSel = []; var _ssb = el('cre-stroke-sel'); if (_ssb) _ssb.style.display = 'none';
    validBoxes(state && state.boxes).forEach(function (b) { window.creAddTextBox(b.x, b.y, b.html, true, b); });
    window._creLastEd = ed;
    window.creZoom(0);  // on repart à 100%
    ensureInk();
    applyInkMode();
    _boardOnChange = (opts && opts.onChange) || null;
    return true;
  };
  function closeEditor() {
    window.creToggleFull(false);
    var box = el('cre-note-edit'); if (box) box.style.display = 'none';
    var lw = el('cre-note-listwrap'); if (lw) lw.style.display = '';
    var p = el('cre-chars'); if (p) p.style.display = 'none';
    _ink.on = false; _ink.cur = null;
    applyInkMode();
  }
  window.creCloseEditor = closeEditor;

  window.creSaveNote = function () {
    var t = el('cre-note-title'), ed = el('cre-note-editor');
    var title = t ? t.value.trim() : '';
    if (!title) { toast('⚠️ Donne un titre à ta synthèse', '#f87171'); if (t) t.focus(); return; }
    if (_ink.cur) inkUp(); // un trait encore « en cours » est gardé aussi
    var html = sanitize(ed ? ed.innerHTML : '');
    var strokes = _ink.strokes || [];
    var boxes = serializeBoxes();
    var hasContent = (ed && (ed.textContent.trim() || ed.querySelector('img'))) || strokes.length || boxes.length;
    if (!hasContent) { toast('⚠️ La synthèse est vide (ni texte, ni dessin)', '#f87171'); return; }
    var inkLen = 0;
    try { inkLen = JSON.stringify(strokes).length + JSON.stringify(boxes).length; } catch (e) {}
    if (html.length + inkLen > MAX_NOTE_BYTES) { toast('Synthèse trop lourde — enlève une image ou simplifie le dessin 🖼️', '#f87171'); return; }
    var d = loadSavedData();
    d.customNotes = d.customNotes || [];
    var now = new Date().toISOString();
    var inkW = trimInkW(strokes, boxes);
    if (_editId) {
      var n = d.customNotes.find(function (x) { return x.id === _editId; });
      if (n) { n.title = title; n.html = html; n.strokes = strokes; n.boxes = boxes; n.inkW = inkW; n.updated = now; }
    } else {
      d.customNotes.unshift({ id: Date.now(), subject: subj(), title: title, html: html, strokes: strokes, boxes: boxes, inkW: inkW, created: now, updated: now });
    }
    saveData(d);
    closeEditor(); renderCustomNotes();
    toast('✅ Synthèse enregistrée (texte + dessin)');
  };

  window.creDeleteNote = function (id) {
    if (!confirm('Supprimer cette synthèse ? (irréversible)')) return;
    var d = loadSavedData();
    d.customNotes = (d.customNotes || []).filter(function (n) { return n.id !== id; });
    saveData(d);
    renderCustomNotes();
    toast('🗑️ Synthèse supprimée', '#f87171');
  };

  window.creOpenNote = function (id) {
    var n = (loadSavedData().customNotes || []).find(function (x) { return x.id === id; });
    if (!n) return;
    var ov = el('cre-view-ov');
    if (!ov) {
      ov = document.createElement('div'); ov.id = 'cre-view-ov';
      ov.innerHTML = '<div class="cre-view-box"><button type="button" class="cre-view-x" onclick="creCloseView()" aria-label="Fermer">✕</button>' +
        '<button type="button" class="cre-view-print" onclick="crePrintNote()" title="Imprimer ou enregistrer en PDF">🖨️ PDF</button>' +
        '<h3 id="cre-view-title"></h3><div id="cre-view-body" class="cre-view-body"></div></div>';
      document.body.appendChild(ov);
      ov.addEventListener('click', function (e) { if (e.target === ov) window.creCloseView(); });
    }
    el('cre-view-title').textContent = n.title;
    var body = el('cre-view-body');
    ov.style.display = 'flex';
    // ── La lecture reproduit EXACTEMENT l'éditeur : on compose le tableau à sa
    //    taille NATIVE (inkW) puis on applique UN SEUL transform: scale(s).
    //    Comme tout (texte, blocs, dessin) est mis à l'échelle ensemble, les
    //    positions relatives sont identiques à l'édition (fini le décalage). ──
    var strokes = validStrokes(n.strokes), boxes = validBoxes(n.boxes);
    var inkW = (n.inkW > 0) ? n.inkW : (body.clientWidth || 600);
    body.innerHTML = '<div class="cre-view-scaler"><div class="cre-view-stage" style="width:' + inkW + 'px;">' +
      '<div class="note-editor cre-view-text">' + sanitize(n.html) + '</div></div></div>';
    var scaler = body.querySelector('.cre-view-scaler');
    var stage = body.querySelector('.cre-view-stage');
    // blocs (texte + images) à coordonnées NATIVES, avec taille/rotation
    boxes.forEach(function (b) {
      var d = document.createElement('div');
      d.className = 'cre-tbox cre-tbox-view' + (b.kind === 'img' ? ' cre-tbox-img' : '');
      d.style.left = b.x + 'px'; d.style.top = b.y + 'px';
      if (b.w) d.style.width = b.w + 'px';
      if (b.h) d.style.height = b.h + 'px';
      if (b.rot) d.style.transform = 'rotate(' + b.rot + 'deg)';
      if (b.bg && /^(#[0-9a-f]{3,8}|rgba?\([\d.,\s]+\))$/i.test(b.bg)) d.style.backgroundColor = b.bg;
      var alStyle = (b.align && /^(left|center|right|justify)$/.test(b.align)) ? ' style="text-align:' + b.align + '"' : '';
      d.innerHTML = '<div class="cre-tbox-body"' + alStyle + '>' + b.html + '</div>';
      stage.appendChild(d);
    });
    var finish = function () {
      if (ov.style.display === 'none') return;
      // hauteur native utile = texte + bas des blocs + bas des traits
      var maxY = stage.querySelector('.cre-view-text').scrollHeight;
      boxes.forEach(function (b) { maxY = Math.max(maxY, (b.y || 0) + (b.h || 80) + 20); });
      strokes.forEach(function (st) {
        (st.pts || []).forEach(function (p) { maxY = Math.max(maxY, p[1] + 30); });
        if (st.a) maxY = Math.max(maxY, st.a[1] + 30); if (st.b) maxY = Math.max(maxY, st.b[1] + 30);
      });
      stage.style.height = Math.ceil(maxY) + 'px';
      if (strokes.length) {
        var cv = document.createElement('canvas');
        cv.className = 'cre-view-ink';
        cv.width = inkW; cv.height = Math.ceil(maxY);
        cv.style.width = inkW + 'px'; cv.style.height = Math.ceil(maxY) + 'px';
        stage.appendChild(cv);
        var c = cv.getContext('2d');
        strokes.forEach(function (st) { replayStroke(c, st, 1); }); // natif → pas de déformation
      }
      // une seule échelle : on rentre la largeur native dans la fenêtre (jamais > 100%)
      var avail = body.clientWidth || inkW;
      var s = Math.min(1, avail / inkW);
      scaler.style.transform = 'scale(' + s + ')';
      scaler.style.width = inkW + 'px';
      body.style.height = Math.ceil(maxY * s) + 'px';
      if (typeof safeMathJax === 'function') safeMathJax([stage]);
    };
    if (typeof safeMathJax === 'function') safeMathJax([stage]);
    setTimeout(finish, 60);
  };
  window.creCloseView = function () { var ov = el('cre-view-ov'); if (ov) ov.style.display = 'none'; };

  /* ---------- 🖨️ IMPRIMER / EXPORTER EN PDF la synthèse ouverte ----------
     On met la lecture 👁 à l'échelle de la page A4, on isole l'overlay via une
     classe sur <body> (CSS @media print), on imprime, puis on restaure. */
  window.crePrintNote = function () {
    var ov = el('cre-view-ov'); if (!ov || ov.style.display === 'none') { return; }
    var scaler = ov.querySelector('.cre-view-scaler'), stage = ov.querySelector('.cre-view-stage');
    var prev = null;
    if (scaler && stage) {
      var w = stage.offsetWidth || 600, h = stage.offsetHeight || 400;
      var s = Math.min(1, 720 / w); // ~largeur utile d'une page A4 à 96 dpi
      prev = { t: scaler.style.transform, w: scaler.style.width, h: scaler.style.height, o: scaler.style.transformOrigin };
      scaler.style.transformOrigin = 'top left';
      scaler.style.transform = 'scale(' + s + ')';
      scaler.style.width = (w * s) + 'px';
      scaler.style.height = (h * s) + 'px';
    }
    document.body.classList.add('cre-printing');
    function restore() {
      document.body.classList.remove('cre-printing');
      if (scaler && prev) { scaler.style.transform = prev.t; scaler.style.width = prev.w; scaler.style.height = prev.h; scaler.style.transformOrigin = prev.o; }
      window.removeEventListener('afterprint', restore);
    }
    window.addEventListener('afterprint', restore);
    setTimeout(function () { try { window.print(); } catch (e) { restore(); } }, 80);
  };

  /* ---------- éditeur de synthèse : caret, mise en forme, Ω, image, dessin, collage ---------- */
  // dernière zone d'écriture utilisée : l'éditeur principal OU un bloc de texte libre
  function activeEd() {
    var last = window._creLastEd;
    if (last && document.body.contains(last)) return last;
    return el('cre-note-editor');
  }
  document.addEventListener('focusin', function (e) {
    if (e.target && e.target.closest) {
      var z = e.target.closest('#cre-note-editor, .cre-tbox-body');
      if (z) window._creLastEd = z;
    }
  });
  function edInsert(nodeOrText) {
    var ed = activeEd(); if (!ed) return;
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
    boardChanged();
  }

  /* ---------- 🔲 TEXTE LIBRE : des blocs qu'on attrape et qu'on déplace ----------
     Comme sur le tableau Discord : un bloc de texte posé N'IMPORTE OÙ sur la page,
     qu'on saisit par la poignée ⠿ pour le déplacer (même par-dessus le dessin). */
  function validBoxes(arr) {
    if (!Array.isArray(arr)) return [];
    var out = [];
    arr.forEach(function (b) {
      if (!b) return;
      var o = { x: Math.max(0, Number(b.x) || 0), y: Math.max(0, Number(b.y) || 0), html: sanitize(b.html || '') };
      if (b.w) o.w = Math.max(40, Math.min(2400, Number(b.w) || 0));
      if (b.h) o.h = Math.max(24, Math.min(2400, Number(b.h) || 0));
      if (b.rot) o.rot = ((Number(b.rot) || 0) % 360);
      if (b.kind === 'img') o.kind = 'img';
      if (b.align && /^(left|center|right|justify)$/.test(b.align)) o.align = b.align;
      if (b.bg && /^(#[0-9a-f]{3,8}|rgba?\([\d.,\s]+\))$/i.test(b.bg)) o.bg = b.bg;
      out.push(o);
    });
    return out;
  }
  function clearBoxes() {
    var bd = board(); if (!bd) return;
    bd.querySelectorAll('.cre-tbox').forEach(function (b) { b.remove(); });
    _sel = [];
    if (typeof updateSelBar === 'function') updateSelBar();
  }

  /* ---------- sélection de blocs (un ou plusieurs, comme Discord) ---------- */
  var _sel = [];
  function clearSel() {
    var bd = board(); if (bd) bd.querySelectorAll('.cre-tbox.sel').forEach(function (b) { b.classList.remove('sel'); });
    _sel = [];
    updateSelBar();
  }
  function selectOnly(box) {
    clearSel();
    if (box) { box.classList.add('sel'); _sel = [box]; }
    updateSelBar();
  }
  function toggleSel(box) {
    if (!box) return;
    var i = _sel.indexOf(box);
    if (i >= 0) { _sel.splice(i, 1); box.classList.remove('sel'); }
    else { _sel.push(box); box.classList.add('sel'); }
    updateSelBar();
  }
  // petite barre flottante quand ≥1 bloc est sélectionné (supprimer la sélection)
  function updateSelBar() {
    var bar = el('cre-sel-bar');
    if (!bar) {
      var frame = el('cre-board-frame'); if (!frame) return;
      bar = document.createElement('div'); bar.id = 'cre-sel-bar'; bar.style.display = 'none';
      bar.innerHTML = '<span id="cre-sel-n"></span>' +
        '<button type="button" id="cre-sel-bg" title="Couleur de fond du bloc (post-it)">🎨 Fond</button>' +
        '<button type="button" id="cre-sel-dup" title="Dupliquer (Ctrl+D)">📑 Dupliquer</button>' +
        '<button type="button" id="cre-sel-del" title="Supprimer la sélection (touche Suppr)">🗑️ Supprimer</button>' +
        '<button type="button" id="cre-sel-clr" title="Tout désélectionner">✕</button>';
      frame.appendChild(bar);
      bar.querySelector('#cre-sel-bg').addEventListener('click', cycleSelBg);
      bar.querySelector('#cre-sel-dup').addEventListener('click', duplicateSelection);
      bar.querySelector('#cre-sel-del').addEventListener('click', deleteSelection);
      bar.querySelector('#cre-sel-clr').addEventListener('click', clearSel);
    }
    _sel = _sel.filter(function (b) { return document.body.contains(b); });
    if (_sel.length) {
      bar.style.display = 'flex';
      el('cre-sel-n').textContent = _sel.length + (_sel.length > 1 ? ' éléments' : ' élément');
    } else bar.style.display = 'none';
  }
  function deleteSelection() {
    if (!_sel.length) return;
    _sel.forEach(function (b) { b.remove(); });
    _sel = [];
    updateSelBar();
    boardChanged();
  }
  // 📑 dupliquer le(s) bloc(s) sélectionné(s), décalés de 16px (et sélectionne les copies)
  function duplicateSelection() {
    if (!_sel.length) return;
    var clones = [];
    _sel.slice().forEach(function (b) {
      var body = b.querySelector('.cre-tbox-body');
      var html = sanitize(body ? body.innerHTML : '');
      var opts = {};
      if (b.style.width) opts.w = parseInt(b.style.width, 10) || 0;
      if (b.style.height) opts.h = parseInt(b.style.height, 10) || 0;
      var rot = Number(b.dataset.rot) || 0; if (rot) opts.rot = rot;
      if (b.classList.contains('cre-tbox-img')) opts.kind = 'img';
      if (body && body.style.textAlign) opts.align = body.style.textAlign;
      var x = (parseInt(b.style.left, 10) || 0) + 16, y = (parseInt(b.style.top, 10) || 0) + 16;
      var nb = window.creAddTextBox(x, y, html, true, opts);
      if (nb) clones.push(nb);
    });
    clearSel();
    clones.forEach(function (c) { c.classList.add('sel'); _sel.push(c); });
    updateSelBar();
    boardChanged();
    if (clones.length) toast('📑 ' + clones.length + ' bloc(s) dupliqué(s)');
  }
  // 🎨 fond « post-it » : cycle les blocs sélectionnés à travers quelques teintes (+ aucun)
  var POSTIT = ['', 'rgba(251,191,36,0.22)', 'rgba(96,165,250,0.22)', 'rgba(52,211,153,0.22)', 'rgba(248,113,113,0.22)', 'rgba(167,139,250,0.22)'];
  function cycleSelBg() {
    if (!_sel.length) return;
    var idx = (parseInt(_sel[0].dataset.bgi, 10) || 0);
    idx = (idx + 1) % POSTIT.length;
    var next = POSTIT[idx];
    _sel.forEach(function (b) {
      b.dataset.bgi = idx;
      if (next) b.style.backgroundColor = next; else b.style.removeProperty('background-color');
    });
    boardChanged();
  }
  window._creDeleteSelection = deleteSelection;
  window._creDuplicateSelection = duplicateSelection;
  window._creCycleSelBg = cycleSelBg;
  window._creHasSelection = function () { return _sel.length > 0; };

  // poignée de déplacement (souris + tactile) ; déplace TOUT le groupe si plusieurs sélectionnés
  function wireDrag(box, handle) {
    handle.addEventListener('pointerdown', function (e) {
      e.preventDefault(); e.stopPropagation();
      try { handle.setPointerCapture(e.pointerId); } catch (err) {}
      // si le bloc n'est pas dans la sélection courante → il devient la sélection
      if (_sel.indexOf(box) < 0 && !e.shiftKey) selectOnly(box);
      else if (e.shiftKey) toggleSel(box);
      var group = _sel.length ? _sel.slice() : [box];
      var startX = e.clientX, startY = e.clientY;
      var bases = group.map(function (b) { return { b: b, l: parseInt(b.style.left, 10) || 0, t: parseInt(b.style.top, 10) || 0 }; });
      var k = zScale();
      function mv(ev) {
        var dx = (ev.clientX - startX) / k, dy = (ev.clientY - startY) / k;
        bases.forEach(function (o) { o.b.style.left = Math.max(0, o.l + dx) + 'px'; o.b.style.top = Math.max(0, o.t + dy) + 'px'; });
      }
      function up() {
        handle.removeEventListener('pointermove', mv);
        handle.removeEventListener('pointerup', up);
        handle.removeEventListener('pointercancel', up);
        boardChanged();
      }
      handle.addEventListener('pointermove', mv);
      handle.addEventListener('pointerup', up);
      handle.addEventListener('pointercancel', up);
    });
  }

  /* Bloc générique : texte OU image. opts = { w, h, rot, kind:'img'|'text' } */
  window.creAddTextBox = function (x, y, html, quiet, opts) {
    opts = opts || {};
    var isImg = opts.kind === 'img';
    var bd = board(); if (!bd) return null;
    if (!quiet) exitInk(); // le stylo se désactive : on passe en mode texte/blocs
    var n = bd.querySelectorAll('.cre-tbox').length;
    if (x == null) {
      var wrap = el('cre-note-wrap'), k0 = zScale();
      if (wrap) {
        x = Math.max(10, (wrap.scrollLeft + wrap.clientWidth / 2) / k0 - 80 + (n % 4) * 20);
        y = Math.max(10, (wrap.scrollTop + wrap.clientHeight / 2) / k0 - 50 + (n % 4) * 20);
      } else { x = 30; y = 30; }
    }
    var box = document.createElement('div');
    box.className = 'cre-tbox' + (isImg ? ' cre-tbox-img' : '');
    box.style.left = x + 'px';
    box.style.top = y + 'px';
    if (opts.w) box.style.width = opts.w + 'px';
    if (opts.h) box.style.height = opts.h + 'px';
    var rot = Number(opts.rot) || 0;
    box.dataset.rot = rot;
    if (rot) box.style.transform = 'rotate(' + rot + 'deg)';
    box.innerHTML =
      '<span class="cre-tbox-grip" title="Attraper pour déplacer">⠿</span>' +
      '<span class="cre-tbox-rot" title="Tourner le bloc"></span>' +
      '<button type="button" class="cre-tbox-x" title="Supprimer ce bloc">✕</button>' +
      '<div class="cre-tbox-body" contenteditable="' + (isImg ? 'false' : 'true') + '" data-ph="Écris ici…"></div>' +
      '<span class="cre-tbox-rsz" title="Redimensionner (coin)"></span>';
    bd.appendChild(box);
    var body = box.querySelector('.cre-tbox-body');
    if (html) body.innerHTML = sanitize(html);
    if (opts.align && /^(left|center|right|justify)$/.test(opts.align)) body.style.textAlign = opts.align;
    if (opts.bg) box.style.backgroundColor = opts.bg; // fond « post-it » du bloc
    if (!isImg) body.addEventListener('input', boardChanged);

    // clic sur le bloc → le sélectionner (Maj = ajouter/retirer de la sélection)
    box.addEventListener('pointerdown', function (e) {
      if (e.target.closest('.cre-tbox-grip, .cre-tbox-rot, .cre-tbox-rsz, .cre-tbox-x')) return;
      if (e.shiftKey) { e.preventDefault(); toggleSel(box); return; }
      if (_sel.length > 1) return; // on laisse le groupe tranquille
      selectOnly(box);
      if (!isImg) body.focus();
    });
    // un bloc TEXTE resté vide disparaît quand on clique ailleurs (comme Discord)
    if (!isImg) body.addEventListener('blur', function () {
      setTimeout(function () {
        if (!document.body.contains(box)) return;
        var has = body.textContent.trim() || body.querySelector('img');
        if (!has && !box.contains(document.activeElement)) { var i = _sel.indexOf(box); if (i >= 0) _sel.splice(i, 1); box.remove(); updateSelBar(); }
      }, 150);
    });
    box.querySelector('.cre-tbox-x').addEventListener('click', function () { var i = _sel.indexOf(box); if (i >= 0) _sel.splice(i, 1); box.remove(); updateSelBar(); boardChanged(); });

    // déplacement (poignée ⠿)
    wireDrag(box, box.querySelector('.cre-tbox-grip'));

    // redimensionnement (coin bas-droit) — comme une fenêtre ; image = ratio gardé
    var rsz = box.querySelector('.cre-tbox-rsz');
    rsz.addEventListener('pointerdown', function (e) {
      e.preventDefault(); e.stopPropagation();
      try { rsz.setPointerCapture(e.pointerId); } catch (err) {}
      var r = box.getBoundingClientRect();
      var k = zScale();
      var baseW = box.offsetWidth, baseH = box.offsetHeight;
      var ratio = baseH ? baseW / baseH : 1;
      var ang = (Number(box.dataset.rot) || 0) * Math.PI / 180;
      var sx = e.clientX, sy = e.clientY;
      function mv(ev) {
        var dx = (ev.clientX - sx) / k, dy = (ev.clientY - sy) / k;
        // projette le déplacement sur les axes LOCAUX du bloc (gère la rotation)
        var lx = dx * Math.cos(-ang) - dy * Math.sin(-ang);
        var ly = dx * Math.sin(-ang) + dy * Math.cos(-ang);
        var w = Math.max(46, baseW + lx);
        if (isImg) { box.style.width = w + 'px'; box.style.height = (w / ratio) + 'px'; }
        else { box.style.width = w + 'px'; box.style.height = Math.max(28, baseH + ly) + 'px'; }
      }
      function up() {
        rsz.removeEventListener('pointermove', mv); rsz.removeEventListener('pointerup', up); rsz.removeEventListener('pointercancel', up);
        boardChanged();
      }
      rsz.addEventListener('pointermove', mv); rsz.addEventListener('pointerup', up); rsz.addEventListener('pointercancel', up);
    });

    // rotation (poignée ronde en haut)
    var rotH = box.querySelector('.cre-tbox-rot');
    rotH.addEventListener('pointerdown', function (e) {
      e.preventDefault(); e.stopPropagation();
      try { rotH.setPointerCapture(e.pointerId); } catch (err) {}
      var rc = box.getBoundingClientRect();
      var cx = rc.left + rc.width / 2, cy = rc.top + rc.height / 2;
      function mv(ev) {
        var deg = Math.atan2(ev.clientY - cy, ev.clientX - cx) * 180 / Math.PI + 90;
        deg = ((deg % 360) + 360) % 360;
        // 🧲 AIMANT : se clipse sur 0/45/90/135/180/225/270/315° quand on s'en approche
        //    (Maj enfoncé = rotation LIBRE, fine, sans aimant)
        if (!ev.shiftKey) {
          var near = Math.round(deg / 45) * 45;
          if (Math.abs(deg - near) <= 8) deg = near % 360;
        }
        deg = Math.round(deg);
        box.dataset.rot = deg;
        box.style.transform = 'rotate(' + deg + 'deg)';
        box.classList.toggle('cre-rot-snap', deg % 45 === 0); // petit retour visuel quand c'est pile
      }
      function up() {
        rotH.removeEventListener('pointermove', mv); rotH.removeEventListener('pointerup', up); rotH.removeEventListener('pointercancel', up);
        box.classList.remove('cre-rot-snap');
        boardChanged();
      }
      rotH.addEventListener('pointermove', mv); rotH.addEventListener('pointerup', up); rotH.addEventListener('pointercancel', up);
    });

    if (!quiet) { if (!isImg) body.focus(); selectOnly(box); window._creLastEd = isImg ? window._creLastEd : body; }
    return box;
  };

  /* Bloc IMAGE déplaçable/redimensionnable (au lieu d'une image collée dans le texte) */
  window.creAddImageBox = function (dataUrl, quiet) {
    var html = '<img class="note-img" src="' + dataUrl + '" alt="" draggable="false">';
    // taille de départ raisonnable selon l'image
    var box = window.creAddTextBox(null, null, html, quiet, { kind: 'img', w: 220 });
    if (box) {
      var img = box.querySelector('img');
      img.onload = function () {
        var w = Math.min(360, img.naturalWidth || 220);
        box.style.width = w + 'px';
        box.style.height = (w / ((img.naturalWidth || 1) / (img.naturalHeight || 1))) + 'px';
        boardChanged();
      };
    }
    return box;
  };

  function serializeBoxes() {
    var wrap = board(); if (!wrap) return [];
    var out = [];
    wrap.querySelectorAll('.cre-tbox').forEach(function (b) {
      var body = b.querySelector('.cre-tbox-body');
      var html = sanitize(body ? body.innerHTML : '');
      var hasContent = body && (body.textContent.trim() || body.querySelector('img'));
      if (!hasContent) return; // les blocs vides ne sont pas gardés
      var o = { x: parseInt(b.style.left, 10) || 0, y: parseInt(b.style.top, 10) || 0, html: html };
      if (b.style.width) o.w = parseInt(b.style.width, 10) || 0;
      if (b.style.height) o.h = parseInt(b.style.height, 10) || 0;
      var rot = Number(b.dataset.rot) || 0; if (rot) o.rot = rot;
      if (b.classList.contains('cre-tbox-img')) o.kind = 'img';
      if (body && body.style.textAlign) o.align = body.style.textAlign;
      if (b.style.backgroundColor) o.bg = b.style.backgroundColor;
      out.push(o);
    });
    return out;
  }

  window.creFormat = function (cmd) {
    exitInk();
    var ed = activeEd();
    if (!ed) return;
    ed.focus();
    // comme A−/A+ : si rien n'est sélectionné, on applique à TOUT le bloc actif
    if (!ensureSelectionIn(ed)) return;
    try { document.execCommand(cmd); } catch (e) {}
    boardChanged(); // la mise en forme déclenche aussi la sauvegarde auto
  };

  /* ---------- 🔠 TAILLE DU TEXTE : A− / A+ ----------
     Marche dans le texte principal ET dans les blocs déplaçables.
     Si rien n'est sélectionné → s'applique à TOUT le bloc actif (plus simple). */
  var FONT_STEPS = [10, 12, 14, 16, 18, 21, 24, 28, 32, 40, 48, 60];
  // s'assure qu'il y a une sélection ; sinon sélectionne tout le contenu du bloc actif
  function ensureSelectionIn(ed) {
    var sel = window.getSelection();
    var has = sel && sel.rangeCount && !sel.getRangeAt(0).collapsed && ed.contains(sel.getRangeAt(0).commonAncestorContainer);
    if (has) return true;
    if (!ed.textContent.trim()) { toast('✍️ Écris d\'abord du texte, puis re-clique', '#fbbf24'); return false; }
    var r = document.createRange(); r.selectNodeContents(ed);
    sel.removeAllRanges(); sel.addRange(r);
    return true;
  }
  // taille RÉELLEMENT affichée au début de la sélection (on descend dans l'élément
  // qui rend le texte — sinon on lit la taille du body et A+ reste coincé à 16px)
  function selFontPx(ed) {
    var sel = window.getSelection();
    if (!sel || !sel.rangeCount) return parseFloat(getComputedStyle(ed).fontSize) || 16;
    var r = sel.getRangeAt(0), node = r.startContainer;
    if (node.nodeType === 1) {
      var c = node.childNodes[r.startOffset] || node.lastChild || node;
      node = (c && c.nodeType === 3) ? c.parentElement : c;
    } else node = node.parentElement;
    // tombé sur un conteneur sans taille propre → on cherche un span de taille à l'intérieur
    if (node && node.nodeType === 1 && !(node.style && node.style.fontSize) && node.querySelector) {
      var inner = node.querySelector('span[style*="font-size"]');
      if (inner) node = inner;
    }
    return parseFloat(getComputedStyle(node || ed).fontSize) || 16;
  }
  // applique une taille EXACTE (px) à la sélection courante (partagé par A−/A+ et le menu)
  function applyFontPx(target) {
    try { document.execCommand('fontSize', false, '7'); } catch (e) { return; }
    // le <font size=7> du navigateur → <span style="font-size:CIBLEpx"> propre
    var scope = el('cre-note-wrap') || document;
    scope.querySelectorAll('font[size="7"]').forEach(function (f) {
      var span = document.createElement('span');
      span.style.fontSize = target + 'px';
      while (f.firstChild) span.appendChild(f.firstChild);
      // ⚠️ une taille imbriquée PLUS PROFONDE l'emporterait (CSS) → on retire les
      //    font-size internes pour que la nouvelle taille gagne vraiment
      span.querySelectorAll('span[style]').forEach(function (s2) {
        if (!s2.style.fontSize) return;
        s2.style.fontSize = '';
        if (!s2.getAttribute('style')) { // span devenu vide de style → on le déballe
          while (s2.firstChild) s2.parentNode.insertBefore(s2.firstChild, s2);
          s2.remove();
        }
      });
      f.parentNode.replaceChild(span, f);
    });
  }
  window.creFontSize = function (dir) {
    exitInk();
    var ed = activeEd(); if (!ed) return;
    ed.focus();
    if (!ensureSelectionIn(ed)) return;
    // on calcule la taille CIBLE une seule fois, à partir de la taille réelle du texte
    var cur = selFontPx(ed);
    var idx = 0, best = 1e9;
    FONT_STEPS.forEach(function (s, i) { var d = Math.abs(s - cur); if (d < best) { best = d; idx = i; } });
    idx = Math.min(FONT_STEPS.length - 1, Math.max(0, idx + (dir > 0 ? 1 : -1)));
    applyFontPx(FONT_STEPS[idx]);
    boardChanged();
  };
  // 🔠 mémorise la sélection AVANT que le menu déroulant ne vole le focus
  var _savedSelRange = null;
  window.creSaveSel = function () {
    var sel = window.getSelection();
    if (sel && sel.rangeCount) _savedSelRange = sel.getRangeAt(0).cloneRange();
  };
  // 🔠 taille EXACTE choisie dans le menu déroulant « Taille »
  window.creSetFontSize = function (px) {
    px = parseInt(px, 10);
    var selEl = el('cre-font-select');
    if (!px) { if (selEl) selEl.value = ''; return; }
    exitInk();
    var ed = activeEd(); if (!ed) { if (selEl) selEl.value = ''; return; }
    ed.focus();
    // restaure la sélection capturée à l'ouverture du menu (sinon = tout le bloc actif)
    if (_savedSelRange && ed.contains(_savedSelRange.commonAncestorContainer)) {
      try { var s = window.getSelection(); s.removeAllRanges(); s.addRange(_savedSelRange); } catch (e) {}
    }
    if (ensureSelectionIn(ed)) { applyFontPx(px); boardChanged(); }
    if (selEl) selEl.value = ''; // le menu revient sur « Taille »
  };
  // 🔠 transforme le paragraphe en Titre / Sous-titre / Citation (ou re-paragraphe)
  window.creBlockFormat = function (tag) {
    exitInk();
    var ed = activeEd(); if (!ed) return;
    ed.focus();
    if (!ensureSelectionIn(ed)) return;
    // 2e clic sur le même style → revient au paragraphe normal
    var cur = '';
    try { cur = (document.queryCommandValue('formatBlock') || '').toLowerCase(); } catch (e) {}
    var want = tag.toLowerCase();
    var target = (cur === want || cur === '<' + want + '>') ? 'div' : tag;
    try { document.execCommand('formatBlock', false, target); } catch (e) {}
    boardChanged();
  };
  // ↔ alignement du texte (gauche / centre / droite)
  window.creAlign = function (how) {
    exitInk();
    var ed = activeEd(); if (!ed) return;
    ed.focus();
    var dir = (how === 'center') ? 'center' : (how === 'right') ? 'right' : 'left';
    if (ed.classList && ed.classList.contains('cre-tbox-body')) {
      // bloc de texte libre → on aligne TOUT le bloc (fiable, sauvegardé via o.align)
      ed.style.textAlign = (dir === 'left') ? '' : dir;
    } else {
      if (!ensureSelectionIn(ed)) return; // éditeur principal → alignement par paragraphe
      try { document.execCommand('styleWithCSS', false, true); } catch (e) {}
      try { document.execCommand('justify' + dir.charAt(0).toUpperCase() + dir.slice(1)); } catch (e) {}
    }
    boardChanged();
  };

  /* ---------- 🖍️ SURLIGNER le texte sélectionné (avec choix de couleur) ---------- */
  function applyHilite(val) {
    exitInk();
    var ed = activeEd(); if (!ed) return;
    ed.focus();
    if (!ensureSelectionIn(ed)) return;
    try { document.execCommand('styleWithCSS', false, true); } catch (e) {}
    try { document.execCommand('hiliteColor', false, val); }
    catch (e) { try { document.execCommand('backColor', false, val); } catch (e2) { return; } }
    boardChanged();
  }
  window.creHighlight = function () { applyHilite('rgba(251,191,36,0.45)'); }; // jaune par défaut (compat)
  // palette de surlignage : [couleur appliquée, pastille] ; 'none' = retirer
  var HILITE_COLORS = [
    ['rgba(251,191,36,0.45)', '#fbbf24'], ['rgba(96,165,250,0.40)', '#60a5fa'],
    ['rgba(52,211,153,0.40)', '#34d399'], ['rgba(248,113,113,0.40)', '#f87171'],
    ['rgba(167,139,250,0.40)', '#a78bfa'], ['none', 'transparent']
  ];
  window.creToggleHilite = function () {
    exitInk();
    var p = el('cre-hilites'); if (!p) return;
    var open = p.style.display !== 'none';
    p.style.display = open ? 'none' : 'flex';
    if (!open && !p.innerHTML) {
      p.innerHTML = '<span class="cre-colors-lab">Surligner avec :</span>' +
        HILITE_COLORS.map(function (c) {
          var none = c[0] === 'none';
          return '<button type="button" class="nd-col' + (none ? ' nd-col-none' : '') + '" style="background:' +
            (none ? 'transparent' : c[0]) + '" onmousedown="event.preventDefault()" onclick="creHiliteColor(\'' + c[0] +
            '\')" aria-label="' + (none ? 'Retirer le surlignage' : 'Surligner ' + c[1]) + '">' + (none ? '⌀' : '') + '</button>';
        }).join('');
    }
    if (!open) { ['cre-chars', 'cre-colors'].forEach(function (id) { var x = el(id); if (x) x.style.display = 'none'; }); }
  };
  window.creHiliteColor = function (col) { applyHilite(col === 'none' ? 'transparent' : col); };

  /* ---------- 🎨 COULEUR DU TEXTE (comme Discord) ----------
     Petit panneau de pastilles ; la couleur s'applique à la sélection,
     dans l'éditeur principal OU dans un bloc déplaçable. */
  var TEXT_COLORS = ['#e9e6ff', '#ffffff', '#a78bfa', '#60a5fa', '#22d3ee', '#34d399', '#a3e635', '#fbbf24', '#fb923c', '#f87171', '#f472b6', '#94a3b8'];
  window.creToggleColors = function () {
    exitInk();
    var p = el('cre-colors'); if (!p) return;
    var open = p.style.display !== 'none';
    p.style.display = open ? 'none' : 'flex';
    if (!open && !p.innerHTML) {
      p.innerHTML = '<span class="cre-colors-lab">Sélectionne du texte puis choisis :</span>' +
        TEXT_COLORS.map(function (c) {
          return '<button type="button" class="nd-col" style="background:' + c + '" onmousedown="event.preventDefault()" onclick="creTextColor(\'' + c + '\')" aria-label="Couleur du texte ' + c + '"></button>';
        }).join('');
    }
    if (!open) { var ch = el('cre-chars'); if (ch) ch.style.display = 'none'; }
  };
  window.creTextColor = function (col) {
    exitInk();
    var ed = activeEd(); if (!ed) return;
    ed.focus();
    try { document.execCommand('styleWithCSS', false, false); } catch (e) {}
    try { document.execCommand('foreColor', false, col); } catch (e) { return; }
    // le <font color> posé par le navigateur → <span style="color:…"> propre
    var scope = el('cre-note-wrap') || document;
    scope.querySelectorAll('font[color]').forEach(function (f) {
      var span = document.createElement('span');
      span.style.color = f.getAttribute('color');
      while (f.firstChild) span.appendChild(f.firstChild);
      f.parentNode.replaceChild(span, f);
    });
    boardChanged();
  };
  // ☑ CASES À COCHER (to-do) : ligne avec une case cliquable
  window.creInsertTodo = function () {
    exitInk();
    var ed = activeEd(); if (!ed) return;
    ed.focus();
    var sel = window.getSelection();
    var range = (sel && sel.rangeCount && ed.contains(sel.getRangeAt(0).commonAncestorContainer))
      ? sel.getRangeAt(0)
      : (function () { var r = document.createRange(); r.selectNodeContents(ed); r.collapse(false); return r; })();
    range.deleteContents();
    var line = document.createElement('div');
    line.className = 'cre-todo';
    var box = document.createElement('span');
    box.className = 'cre-todo-box'; box.setAttribute('contenteditable', 'false'); box.textContent = '☐';
    line.appendChild(box); line.appendChild(document.createTextNode(' '));
    range.insertNode(line);
    var r2 = document.createRange(); r2.setStart(line, line.childNodes.length); r2.collapse(true);
    if (sel) { sel.removeAllRanges(); sel.addRange(r2); }
    boardChanged();
  };
  function toggleTodo(box) {
    if (!box) return;
    var done = (box.textContent || '').trim() === '☑';
    box.textContent = done ? '☐' : '☑';
    var line = box.closest && box.closest('.cre-todo'); if (line) line.classList.toggle('done', !done);
    if (box.closest && box.closest('#cre-note-board')) boardChanged(); // ne sauve que dans l'éditeur (pas la lecture)
  }
  // clic sur une case (éditeur OU lecture 👁) → coche/décoche
  document.addEventListener('click', function (e) {
    var box = e.target && e.target.closest && e.target.closest('.cre-todo-box');
    if (box) { e.preventDefault(); toggleTodo(box); }
  });
  window.creInsertChar = function (ch) { edInsert(ch); };
  window.creToggleChars = function () {
    exitInk();
    var p = el('cre-chars'); if (!p) return;
    var open = p.style.display !== 'none';
    p.style.display = open ? 'none' : 'block';
    if (!open && !p.innerHTML) {
      var groups = window.NOTE_CHAR_GROUPS || [['📐 Maths', ['√', '²', '³', 'π', '±', '×', '÷', '≤', '≥', '≠', '→', '°', 'Δ']]];
      p.innerHTML = groups.map(function (g) {
        return '<div class="note-chgrp"><span class="note-chlab">' + g[0] + '</span>' +
          g[1].map(function (ch) {
            return '<button type="button" class="note-ch" onmousedown="event.preventDefault()" onclick="creInsertChar(\'' + ch.replace(/'/g, "\\'") + '\')">' + ch + '</button>';
          }).join('') + '</div>';
      }).join('');
    }
  };
  window.crePickNoteImg = function () { exitInk(); var i = el('cre-file'); if (i) { i.value = ''; i.click(); } };
  window.creNoteFile = function (input) {
    var f = input.files && input.files[0];
    if (!f || !/^image\//.test(f.type)) return;
    compressImage(f, IMG_MAX_SIDE, function (dataUrl) {
      // l'image arrive comme un BLOC déplaçable/redimensionnable (comme Discord),
      // pas collée dans le texte → on peut la bouger, l'agrandir, la tourner.
      window.creAddImageBox(dataUrl);
      toast('🖼️ Image ajoutée — attrape ⠿ pour la bouger, le coin ◢ pour la taille');
    });
  };
  /* ---------- 🎨 DESSIN « façon Discord » : texte ET dessin SUPERPOSÉS ----------
     Un calque transparent recouvre la zone d'écriture. Mode ✏️ texte : le calque
     laisse passer les clics, on écrit normalement (et on voit le dessin dessus).
     Mode 🖊️ stylo : on dessine PAR-DESSUS le texte, où on veut. La gomme
     n'efface QUE le dessin, jamais le texte. Les traits sont des vecteurs,
     sauvegardés avec la synthèse et redessinés à l'identique. */
  var _ink = { on: false, tool: 'pen', color: '#a78bfa', size: 4, fill: false, strokes: [], redo: [], cur: null, canvas: null, ctx: null, inkW: 0, pan: null, ext: { w: 0, h: 0 } };
  var _strokeSel = []; // indices des traits dessinés sélectionnés (pour les déplacer/supprimer)
  var INK_TOOLS = ['pen', 'hl', 'line', 'arrow', 'rect', 'ellipse', 'erase', 'hand'];

  // données de traits sûres (rechargées depuis la sauvegarde) — compatible anciens formats
  function validStrokes(arr) {
    if (!Array.isArray(arr)) return [];
    var out = [];
    arr.forEach(function (st) {
      if (!st) return;
      var t = st.t || (st.e ? 'erase' : 'pen');
      if (INK_TOOLS.indexOf(t) < 0 || t === 'hand') return;
      var base = { t: t, c: String(st.c || '#a78bfa').slice(0, 20), s: Math.min(40, Number(st.s) || 4) };
      if (t === 'line' || t === 'arrow' || t === 'rect' || t === 'ellipse') {
        if (!Array.isArray(st.a) || !Array.isArray(st.b)) return;
        base.a = [Number(st.a[0]) || 0, Number(st.a[1]) || 0];
        base.b = [Number(st.b[0]) || 0, Number(st.b[1]) || 0];
        if (st.fill && (t === 'rect' || t === 'ellipse')) base.fill = true;
        out.push(base);
      } else {
        if (!Array.isArray(st.pts)) return;
        base.pts = st.pts.map(function (p) { return [Number(p[0]) || 0, Number(p[1]) || 0]; });
        if (base.pts.length) out.push(base);
      }
    });
    return out;
  }

  function board() { return el('cre-note-board') || el('cre-note-wrap'); }
  // facteur d'affichage réel (zoom) : auto-calibré → coordonnées toujours justes
  function zScale() {
    var cv = _ink.canvas;
    if (!cv || !cv.width) return 1;
    var r = cv.getBoundingClientRect();
    return r.width ? r.width / cv.width : 1;
  }
  function ensureInk() {
    var wrap = el('cre-note-wrap'), bd = board(), ed = el('cre-note-editor');
    if (!wrap || !bd || !ed) return null;
    var cv = el('cre-ink');
    if (!cv) {
      cv = document.createElement('canvas');
      cv.id = 'cre-ink';
      bd.appendChild(cv);
      _ink.canvas = cv; _ink.ctx = cv.getContext('2d');
      cv.addEventListener('pointerdown', inkDown);
      cv.addEventListener('pointermove', inkMove);
      cv.addEventListener('pointerup', inkUp);
      cv.addEventListener('pointercancel', inkUp);
      ed.addEventListener('input', inkResizeSoon);
      ed.addEventListener('input', boardChanged);
      window.addEventListener('resize', inkResizeSoon);
      // Ctrl + molette = zoom du tableau (comme un vrai tableau interactif)
      wrap.addEventListener('wheel', function (e) {
        if (!e.ctrlKey) return;
        e.preventDefault();
        window.creZoom(e.deltaY < 0 ? 1 : -1);
      }, { passive: false });
      // 🤏 pincer à deux doigts = zoomer / dézoomer (mobile et tablette)
      var pinch = null;
      function pdist(t) { var dx = t[0].clientX - t[1].clientX, dy = t[0].clientY - t[1].clientY; return Math.sqrt(dx * dx + dy * dy); }
      wrap.addEventListener('touchstart', function (e) {
        if (e.touches.length === 2) pinch = pdist(e.touches);
      }, { passive: true });
      wrap.addEventListener('touchmove', function (e) {
        if (pinch == null || e.touches.length !== 2) return;
        e.preventDefault();
        var d = pdist(e.touches);
        if (d / pinch > 1.12) { window.creZoom(1); pinch = d; }
        else if (d / pinch < 0.89) { window.creZoom(-1); pinch = d; }
      }, { passive: false });
      wrap.addEventListener('touchend', function () { pinch = null; });
      // double-clic sur le FOND du tableau → nouveau bloc de texte à cet endroit (comme Discord)
      bd.addEventListener('dblclick', function (e) {
        if (e.target.closest('.cre-tbox') || _ink.on) return;
        var r = bd.getBoundingClientRect();
        var k = zScale();
        window.creAddTextBox(Math.max(0, (e.clientX - r.left) / k - 20), Math.max(0, (e.clientY - r.top) / k - 14));
      });
      // ⬚ SÉLECTION TOUJOURS ACTIVE (comme Discord) : clic-glissé sur le FOND =
      // rectangle de sélection. Pas de bouton. Le glissé SUR du texte sélectionne
      // le texte (on laisse le navigateur faire) ; sur le vide → on encadre les blocs.
      // démarre-t-on SUR du vrai texte de l'éditeur ? (≠ le vide sous/à côté du texte)
      function startsOnText(e) {
        try {
          var r = document.caretRangeFromPoint && document.caretRangeFromPoint(e.clientX, e.clientY);
          if (!r) return false;
          var n = r.startContainer;
          if (!n || n.nodeType !== 3 || !n.textContent.trim()) return false;
          // le point tombe-t-il VRAIMENT dans un rectangle de ligne du texte ?
          // (sinon = vide en dessous / à côté → on veut le marquee, pas la sélection de texte)
          var rng = document.createRange(); rng.selectNodeContents(n);
          var rects = rng.getClientRects();
          for (var i = 0; i < rects.length; i++) {
            var b = rects[i];
            if (e.clientX >= b.left - 2 && e.clientX <= b.right + 2 &&
                e.clientY >= b.top - 2 && e.clientY <= b.bottom + 2) return true;
          }
          return false;
        } catch (_) { return false; }
      }
      bd.addEventListener('pointerdown', function (e) {
        if (_ink.on || e.button !== 0) return;            // dessin/déplacer : géré ailleurs
        if (e.target.closest('.cre-tbox')) return;         // sur un bloc : le bloc gère
        if (startsOnText(e)) return;                       // sur du texte : sélection de texte normale
        var start = inkPos(e), sx = e.clientX, sy = e.clientY;
        var marqEl = null, active = false;
        function mv(ev) {
          if (!active) {
            if (Math.abs(ev.clientX - sx) + Math.abs(ev.clientY - sy) < 6) return;
            active = true;
            bd.classList.add('cre-marqueeing'); // user-select:none → plus de texte parasite
            marqEl = document.createElement('div'); marqEl.className = 'cre-marquee'; bd.appendChild(marqEl);
            if (!ev.shiftKey) clearSel();
          }
          var p = inkPos(ev);
          var x = Math.min(start[0], p[0]), y = Math.min(start[1], p[1]), w = Math.abs(p[0] - start[0]), h = Math.abs(p[1] - start[1]);
          marqEl.style.left = x + 'px'; marqEl.style.top = y + 'px'; marqEl.style.width = w + 'px'; marqEl.style.height = h + 'px';
          try { window.getSelection().removeAllRanges(); } catch (_) {}
          bd.querySelectorAll('.cre-tbox').forEach(function (b) {
            var bx = parseInt(b.style.left, 10) || 0, by = parseInt(b.style.top, 10) || 0, bw = b.offsetWidth, bh = b.offsetHeight;
            var hit = x < bx + bw && x + w > bx && y < by + bh && y + h > by;
            if (hit) { if (_sel.indexOf(b) < 0) { b.classList.add('sel'); _sel.push(b); } }
            else if (!ev.shiftKey) { var i = _sel.indexOf(b); if (i >= 0) { b.classList.remove('sel'); _sel.splice(i, 1); } }
          });
          // + TRAITS DESSINÉS qui touchent le rectangle (sélection multiple de dessin)
          _strokeSel = [];
          (_ink.strokes || []).forEach(function (st, si) {
            var bb = strokeBBox(st); if (!bb) return;
            if (x < bb.X && x + w > bb.x && y < bb.Y && y + h > bb.y) _strokeSel.push(si);
          });
          inkRedraw();
          updateSelBar();
        }
        function up() {
          document.removeEventListener('pointermove', mv);
          document.removeEventListener('pointerup', up);
          if (active) {
            bd.classList.remove('cre-marqueeing');
            if (marqEl) marqEl.remove();
            try { window.getSelection().removeAllRanges(); } catch (_) {}
            updateStrokeSelBox();
            var _tot = _sel.length + _strokeSel.length;
            if (_tot) toast('✅ ' + _tot + ' élément(s) — glisse pour déplacer · ✕ ou Suppr pour effacer');
          } else if (_sel.length || _strokeSel.length) {
            clearSel(); clearStrokeSel(); // simple clic sur le fond = tout désélectionner
          }
        }
        document.addEventListener('pointermove', mv);
        document.addEventListener('pointerup', up);
      });
    }
    _ink.canvas = cv; _ink.ctx = cv.getContext('2d');
    inkResize();
    return cv;
  }

  /* ---------- ✋ SÉLECTIONNER / DÉPLACER DES TRAITS DESSINÉS ----------
     Le marquee (clic-glissé sur le fond) sélectionne aussi les traits. Une boîte
     en pointillés apparaît autour : on la glisse pour DÉPLACER les traits, ✕ pour
     les supprimer. (Hors mode stylo : le calque laisse passer les clics.) */
  function strokeBBox(st) {
    var minX = 1e9, minY = 1e9, maxX = -1e9, maxY = -1e9;
    function add(px, py) { if (px < minX) minX = px; if (py < minY) minY = py; if (px > maxX) maxX = px; if (py > maxY) maxY = py; }
    if (st.a && st.b) { add(st.a[0], st.a[1]); add(st.b[0], st.b[1]); }
    else (st.pts || []).forEach(function (p) { add(p[0], p[1]); });
    if (minX > maxX) return null;
    return { x: minX, y: minY, X: maxX, Y: maxY };
  }
  function drawStrokeHalo(c, st) {
    c.save();
    c.globalAlpha = 0.35; c.globalCompositeOperation = 'source-over';
    c.strokeStyle = '#a78bfa'; c.lineWidth = (st.s || 4) + 10; c.lineCap = 'round'; c.lineJoin = 'round';
    c.beginPath();
    if (st.a && st.b) {
      var t = st.t;
      if (t === 'rect') c.rect(Math.min(st.a[0], st.b[0]), Math.min(st.a[1], st.b[1]), Math.abs(st.b[0] - st.a[0]), Math.abs(st.b[1] - st.a[1]));
      else if (t === 'ellipse') c.ellipse((st.a[0] + st.b[0]) / 2, (st.a[1] + st.b[1]) / 2, Math.abs(st.b[0] - st.a[0]) / 2 || 0.5, Math.abs(st.b[1] - st.a[1]) / 2 || 0.5, 0, 0, Math.PI * 2);
      else { c.moveTo(st.a[0], st.a[1]); c.lineTo(st.b[0], st.b[1]); }
    } else { var pts = st.pts || []; if (pts.length) { c.moveTo(pts[0][0], pts[0][1]); pts.forEach(function (p) { c.lineTo(p[0], p[1]); }); } }
    c.stroke(); c.restore();
  }
  function clearStrokeSel() {
    _strokeSel = [];
    var bx = el('cre-stroke-sel'); if (bx) bx.style.display = 'none';
    if (_ink.ctx) inkRedraw();
  }
  function deleteStrokeSel() {
    if (!_strokeSel.length) return;
    _strokeSel.slice().sort(function (a, b) { return b - a; }).forEach(function (i) { _ink.strokes.splice(i, 1); });
    _strokeSel = [];
    var bx = el('cre-stroke-sel'); if (bx) bx.style.display = 'none';
    inkRedraw(); boardChanged();
  }
  window._creHasStrokeSel = function () { return _strokeSel.length > 0; };
  window._creDeleteStrokeSel = deleteStrokeSel;
  function updateStrokeSelBox() {
    var bd = board(); if (!bd) return;
    _strokeSel = _strokeSel.filter(function (i) { return _ink.strokes[i]; });
    if (!_strokeSel.length) { var ex = el('cre-stroke-sel'); if (ex) ex.style.display = 'none'; return; }
    var minX = 1e9, minY = 1e9, maxX = -1e9, maxY = -1e9;
    _strokeSel.forEach(function (i) { var b = strokeBBox(_ink.strokes[i]); if (!b) return; if (b.x < minX) minX = b.x; if (b.y < minY) minY = b.y; if (b.X > maxX) maxX = b.X; if (b.Y > maxY) maxY = b.Y; });
    if (minX > maxX) return;
    var pad = 10;
    var box = el('cre-stroke-sel');
    if (!box) {
      box = document.createElement('div'); box.id = 'cre-stroke-sel';
      box.innerHTML = '<button type="button" class="cre-ssel-x" title="Supprimer ces traits (Suppr)">✕</button>';
      bd.appendChild(box);
      box.addEventListener('pointerdown', function (e) {
        if (e.target.closest('.cre-ssel-x')) return;
        e.preventDefault(); e.stopPropagation();
        try { box.setPointerCapture(e.pointerId); } catch (_) {}
        var k = zScale(), sx = e.clientX, sy = e.clientY;
        var bases = _strokeSel.map(function (i) { return { i: i, st: JSON.parse(JSON.stringify(_ink.strokes[i])) }; });
        function mv(ev) {
          var dx = (ev.clientX - sx) / k, dy = (ev.clientY - sy) / k;
          bases.forEach(function (o) {
            var src = o.st, dst = _ink.strokes[o.i]; if (!dst) return;
            if (src.a) { dst.a = [src.a[0] + dx, src.a[1] + dy]; dst.b = [src.b[0] + dx, src.b[1] + dy]; }
            else dst.pts = src.pts.map(function (p) { return [p[0] + dx, p[1] + dy]; });
          });
          inkRedraw(); updateStrokeSelBox();
        }
        function up() { box.removeEventListener('pointermove', mv); box.removeEventListener('pointerup', up); box.removeEventListener('pointercancel', up); boardChanged(); }
        box.addEventListener('pointermove', mv); box.addEventListener('pointerup', up); box.addEventListener('pointercancel', up);
      });
      box.querySelector('.cre-ssel-x').addEventListener('click', function (e) { e.stopPropagation(); deleteStrokeSel(); });
    }
    box.style.display = 'block';
    box.style.left = (minX - pad) + 'px'; box.style.top = (minY - pad) + 'px';
    box.style.width = (maxX - minX + pad * 2) + 'px'; box.style.height = (maxY - minY + pad * 2) + 'px';
  }

  var _inkRz = null;
  function inkResizeSoon() { clearTimeout(_inkRz); _inkRz = setTimeout(inkResize, 120); }
  function inkResize() {
    var bd = board(), wrap = el('cre-note-wrap'), cv = _ink.canvas, ed = el('cre-note-editor');
    if (!bd || !wrap || !cv || !ed) return;
    // Le tableau remplit TOUJOURS la zone visible, dans les deux sens :
    // dézoomé → il s'agrandit logiquement (plus de place), sans bande vide ni
    // barre horizontale parasite. Zoomé → on navigue dedans (molette / 🖐️).
    var z = _zoom || 1;
    var wrapW = wrap.clientWidth || 600, wrapH = wrap.clientHeight || 420;
    var ext = _ink.ext || { w: 0, h: 0 };
    bd.style.minHeight = Math.round(Math.max(360, wrapH / z) + ext.h) + 'px';
    // dézoom → planche élargie (plus de place) ; zoom → largeur logique figée
    // pour pouvoir NAVIGUER dedans. + l'agrandissement gagné avec la main 🖐️
    var baseW = (z < 1) ? Math.round(wrapW / z) : wrapW;
    bd.style.width = (ext.w || z !== 1) ? (baseW + ext.w) + 'px' : '';
    var w = bd.clientWidth || wrapW;
    var h = Math.max(ed.scrollHeight, bd.clientHeight, 340);
    if (cv.width !== w || cv.height !== h) { cv.width = w; cv.height = h; }
    cv.style.height = h + 'px';
    _ink.inkW = w;
    inkRedraw();
  }
  function inkPos(e) {
    var r = _ink.canvas.getBoundingClientRect();
    var k = zScale();
    return [Math.round((e.clientX - r.left) / k), Math.round((e.clientY - r.top) / k)];
  }
  function inkDown(e) {
    if (!_ink.on) return;
    e.preventDefault();
    try { _ink.canvas.setPointerCapture(e.pointerId); } catch (err) {}
    if (_ink.tool === 'hand') { // 🖐 main : on déplace la vue du tableau
      var wrap = el('cre-note-wrap');
      _ink.pan = { x: e.clientX, y: e.clientY, sl: wrap.scrollLeft, st: wrap.scrollTop };
      _ink.canvas.style.cursor = 'grabbing';
      return;
    }
    var p = inkPos(e);
    var shape = (['line', 'arrow', 'rect', 'ellipse'].indexOf(_ink.tool) >= 0);
    _ink.cur = shape
      ? { t: _ink.tool, c: _ink.color, s: _ink.size, a: p, b: p }
      : { t: _ink.tool, c: _ink.color, s: _ink.size, pts: [p] };
    if (_ink.fill && (_ink.tool === 'rect' || _ink.tool === 'ellipse')) _ink.cur.fill = true;
    inkRedraw();
  }
  function inkMove(e) {
    if (_ink.pan) {
      var wrap = el('cre-note-wrap');
      var wantL = _ink.pan.sl - (e.clientX - _ink.pan.x);
      var wantT = _ink.pan.st - (e.clientY - _ink.pan.y);
      // tableau « sans fin » : tirer au-delà du bord droit/bas → la planche S'AGRANDIT
      // (la main marche donc à TOUS les zooms, même quand tout est déjà visible)
      var z = _zoom || 1, grew = false;
      var overX = wantL + wrap.clientWidth - wrap.scrollWidth;
      var overY = wantT + wrap.clientHeight - wrap.scrollHeight;
      if (overX > 0 && _ink.ext.w < 4000) { _ink.ext.w = Math.min(4000, _ink.ext.w + Math.ceil(overX / z) + 260); grew = true; }
      if (overY > 0 && _ink.ext.h < 4000) { _ink.ext.h = Math.min(4000, _ink.ext.h + Math.ceil(overY / z) + 260); grew = true; }
      if (grew) inkResize();
      wrap.scrollLeft = wantL;
      wrap.scrollTop = wantT;
      return;
    }
    if (!_ink.cur) return;
    var p = inkPos(e);
    if (_ink.cur.a) { // forme : le 2e coin suit la souris (aperçu en direct)
      if (e.shiftKey) { // Maj = forme PARFAITE : carré, cercle, ligne aimantée à 45°
        var dx = p[0] - _ink.cur.a[0], dy = p[1] - _ink.cur.a[1];
        if (_ink.cur.t === 'rect' || _ink.cur.t === 'ellipse') {
          var m = Math.max(Math.abs(dx), Math.abs(dy));
          p = [_ink.cur.a[0] + (dx < 0 ? -m : m), _ink.cur.a[1] + (dy < 0 ? -m : m)];
        } else {
          var ang = Math.round(Math.atan2(dy, dx) / (Math.PI / 4)) * (Math.PI / 4);
          var len = Math.sqrt(dx * dx + dy * dy);
          p = [Math.round(_ink.cur.a[0] + len * Math.cos(ang)), Math.round(_ink.cur.a[1] + len * Math.sin(ang))];
        }
      }
      _ink.cur.b = p;
    } else {
      var last = _ink.cur.pts[_ink.cur.pts.length - 1];
      if (Math.abs(p[0] - last[0]) + Math.abs(p[1] - last[1]) < 3) return;
      _ink.cur.pts.push(p);
    }
    inkRedraw();
  }
  function inkUp() {
    if (_ink.pan) { _ink.pan = null; if (_ink.canvas) _ink.canvas.style.cursor = 'grab'; return; }
    if (!_ink.cur) return;
    // forme quasi nulle (simple clic) → ignorée
    var keep = _ink.cur.a
      ? (Math.abs(_ink.cur.b[0] - _ink.cur.a[0]) + Math.abs(_ink.cur.b[1] - _ink.cur.a[1]) > 3)
      : true;
    if (keep) { _ink.strokes.push(_ink.cur); _ink.redo = []; }
    _ink.cur = null;
    inkRedraw();
    if (keep) boardChanged();
  }
  function replayStroke(c, st, k) {
    var t = st.t || (st.e ? 'erase' : 'pen');
    c.globalAlpha = (t === 'hl') ? 0.35 : 1;
    c.globalCompositeOperation = (t === 'erase') ? 'destination-out' : 'source-over';
    c.strokeStyle = st.c || '#a78bfa';
    c.lineWidth = (t === 'erase' ? (st.s || 4) * 4 : t === 'hl' ? (st.s || 4) * 2.4 : (st.s || 4)) * k;
    c.lineCap = 'round'; c.lineJoin = 'round';
    if (st.a && st.b) { // formes
      var ax = st.a[0] * k, ay = st.a[1] * k, bx = st.b[0] * k, by = st.b[1] * k;
      c.beginPath();
      if (t === 'rect') c.rect(Math.min(ax, bx), Math.min(ay, by), Math.abs(bx - ax), Math.abs(by - ay));
      else if (t === 'ellipse') c.ellipse((ax + bx) / 2, (ay + by) / 2, Math.abs(bx - ax) / 2 || 0.5, Math.abs(by - ay) / 2 || 0.5, 0, 0, Math.PI * 2);
      else { // line / arrow
        c.moveTo(ax, ay); c.lineTo(bx, by);
        if (t === 'arrow') {
          var ang = Math.atan2(by - ay, bx - ax), L = Math.max(10, (st.s || 4) * 3.5) * k;
          c.moveTo(bx, by); c.lineTo(bx - L * Math.cos(ang - 0.45), by - L * Math.sin(ang - 0.45));
          c.moveTo(bx, by); c.lineTo(bx - L * Math.cos(ang + 0.45), by - L * Math.sin(ang + 0.45));
        }
      }
      // 🪣 formes pleines : remplissage semi-transparent SOUS le contour
      if (st.fill && (t === 'rect' || t === 'ellipse')) {
        var prevA = c.globalAlpha;
        c.globalAlpha = prevA * 0.28;
        c.fillStyle = st.c || '#a78bfa';
        c.fill();
        c.globalAlpha = prevA;
      }
      c.stroke(); c.globalAlpha = 1;
      return;
    }
    var pts = st.pts || []; if (!pts.length) { c.globalAlpha = 1; return; }
    c.beginPath();
    c.moveTo(pts[0][0] * k, pts[0][1] * k);
    if (pts.length < 3) {
      c.lineTo(pts[pts.length - 1][0] * k + 0.01, pts[pts.length - 1][1] * k + 0.01);
    } else {
      // courbes douces : chaque segment vise le MILIEU du suivant (lissage quadratique)
      for (var i = 1; i < pts.length - 1; i++) {
        var mx = (pts[i][0] + pts[i + 1][0]) / 2 * k, my = (pts[i][1] + pts[i + 1][1]) / 2 * k;
        c.quadraticCurveTo(pts[i][0] * k, pts[i][1] * k, mx, my);
      }
      c.lineTo(pts[pts.length - 1][0] * k, pts[pts.length - 1][1] * k);
    }
    c.stroke();
    c.globalAlpha = 1;
  }
  function inkRedraw() {
    var c = _ink.ctx; if (!c || !_ink.canvas) return;
    c.clearRect(0, 0, _ink.canvas.width, _ink.canvas.height);
    // halo SOUS les traits sélectionnés (pour bien les voir)
    if (_strokeSel.length) _strokeSel.forEach(function (i) { if (_ink.strokes[i]) drawStrokeHalo(c, _ink.strokes[i]); });
    _ink.strokes.forEach(function (st) { replayStroke(c, st, 1); });
    if (_ink.cur) replayStroke(c, _ink.cur, 1); // aperçu du trait/de la forme en cours
  }

  /* bouton 🎨 de la barre d'outils : bascule texte ↔ stylo (même zone !) */
  window.creOpenDraw = function () {
    var cv = ensureInk(); if (!cv) return;
    _ink.on = !_ink.on;
    applyInkMode();
    if (_ink.on) toast('🖊️ Stylo : dessine par-dessus le texte');
  };
  // quitter le mode stylo (appelé par tous les outils « texte » : le stylo se désactive)
  function exitInk() {
    if (_ink.on) { _ink.on = false; applyInkMode(); }
  }
  /* Mode tableau depuis la barre du HAUT : 🖐️ déplacer (la sélection, elle, est
     TOUJOURS active au clic-glissé sur le fond — pas besoin de bouton). */
  window.creBoardMode = function (tool) {
    var cv = ensureInk(); if (!cv) return;
    if (_ink.on && _ink.tool === tool) { _ink.on = false; applyInkMode(); return; }
    _ink.on = true; _ink.tool = tool;
    applyInkMode();
    if (tool === 'hand') toast('🖐️ Déplacer : glisse pour bouger la vue du tableau');
  };
  function applyInkMode() {
    var wrap = el('cre-note-wrap'), cv = el('cre-ink'), tools = el('cre-ink-tools');
    if (!wrap || !cv) return;
    wrap.classList.toggle('inking', _ink.on);
    cv.style.pointerEvents = _ink.on ? 'auto' : 'none';
    if (tools) tools.style.display = _ink.on ? 'flex' : 'none';
    // surligne le bon bouton du HAUT selon le mode
    var draw = el('cre-draw-btn'); if (draw) draw.classList.toggle('active', _ink.on && _ink.tool !== 'hand');
    var hand = el('cre-hand-btn'); if (hand) hand.classList.toggle('active', _ink.on && _ink.tool === 'hand');
    if (_ink.on) {
      buildInkTools(); syncInkTools();
      var p = el('cre-chars'); if (p) p.style.display = 'none';
      if (_strokeSel.length) clearStrokeSel(); // on dessine → on lâche la sélection de traits
    }
  }
  var INK_TOOL_BTNS = [
    ['pen', '🖊️', 'Stylo'],
    ['hl', '🖍️', 'Surligneur (semi-transparent)'],
    ['line', '📏', 'Ligne droite'],
    ['arrow', '↗️', 'Flèche'],
    ['rect', '⬜', 'Rectangle'],
    ['ellipse', '⭕', 'Ellipse / cercle'],
    ['erase', '🧽', 'Gomme — n\'efface que le dessin, jamais le texte'],
    ['hand', '🖐️', 'Main : déplacer la vue du tableau']
  ];
  function buildInkTools() {
    var t = el('cre-ink-tools');
    if (!t) return;
    if (t._built) { syncInkTools(); return; }
    t._built = true;
    t.innerHTML =
      INK_TOOL_BTNS.map(function (b) {
        return '<button type="button" class="nd-tool cre-tool" data-tool="' + b[0] + '" title="' + b[2] + '">' + b[1] + '</button>';
      }).join('') +
      '<span class="cre-ink-sep"></span>' +
      ['#a78bfa', '#60a5fa', '#34d399', '#fbbf24', '#f87171', '#ffffff'].map(function (c) {
        return '<button type="button" class="nd-col" data-c="' + c + '" style="background:' + c + '" aria-label="couleur"></button>';
      }).join('') +
      '<input type="range" id="cre-ink-size" min="2" max="18" value="4" aria-label="Épaisseur du trait">' +
      '<button type="button" class="nd-tool" id="cre-ink-fill" title="Remplir les formes (rectangle / ellipse)">🪣</button>' +
      '<span class="cre-ink-sep"></span>' +
      '<button type="button" class="nd-tool" id="cre-ink-undo" title="Annuler (dernier trait)">↩️</button>' +
      '<button type="button" class="nd-tool" id="cre-ink-redo" title="Refaire">↪️</button>' +
      '<button type="button" class="nd-tool" id="cre-ink-clear" title="Effacer tout le dessin">🗑️</button>' +
      '<button type="button" class="nd-btn nd-btn-ok" id="cre-ink-done" title="Revenir au texte">✏️ Texte</button>';
    t.querySelectorAll('.cre-tool').forEach(function (b) {
      b.addEventListener('click', function () { _ink.tool = b.dataset.tool; syncInkTools(); });
    });
    t.querySelectorAll('.nd-col').forEach(function (b) {
      b.addEventListener('click', function () {
        _ink.color = b.dataset.c;
        if (_ink.tool === 'erase' || _ink.tool === 'hand') _ink.tool = 'pen';
        syncInkTools();
      });
    });
    el('cre-ink-size').addEventListener('input', function () { _ink.size = +this.value; });
    el('cre-ink-fill').addEventListener('click', function () {
      _ink.fill = !_ink.fill;
      if (_ink.fill && _ink.tool !== 'rect' && _ink.tool !== 'ellipse') _ink.tool = 'rect'; // remplir → passe à une forme
      syncInkTools();
    });
    el('cre-ink-undo').addEventListener('click', function () {
      var st = _ink.strokes.pop(); if (st) _ink.redo.push(st); inkRedraw(); boardChanged();
    });
    el('cre-ink-redo').addEventListener('click', function () {
      var st = _ink.redo.pop(); if (st) _ink.strokes.push(st); inkRedraw(); boardChanged();
    });
    el('cre-ink-clear').addEventListener('click', function () {
      _ink.redo = _ink.strokes.reverse(); _ink.strokes = []; inkRedraw(); boardChanged();
    });
    el('cre-ink-done').addEventListener('click', function () { _ink.on = false; applyInkMode(); var ed = el('cre-note-editor'); if (ed) ed.focus(); });
    syncInkTools();
  }
  function syncInkTools() {
    var t = el('cre-ink-tools');
    if (!t) return;
    t.querySelectorAll('.cre-tool').forEach(function (b) {
      b.classList.toggle('on', b.dataset.tool === _ink.tool);
    });
    t.querySelectorAll('.nd-col').forEach(function (b) {
      b.classList.toggle('on', _ink.tool !== 'erase' && _ink.tool !== 'hand' && b.dataset.c === _ink.color);
    });
    var fillBtn = el('cre-ink-fill'); if (fillBtn) fillBtn.classList.toggle('on', !!_ink.fill);
    var cv = el('cre-ink');
    if (cv) cv.style.cursor = _ink.tool === 'hand' ? 'grab' : 'crosshair';
    // reflète aussi l'état sur les boutons du HAUT
    var draw = el('cre-draw-btn'); if (draw) draw.classList.toggle('active', _ink.on && _ink.tool !== 'hand');
    var hand = el('cre-hand-btn'); if (hand) hand.classList.toggle('active', _ink.on && _ink.tool === 'hand');
  }

  /* ---------- 🔍 ZOOM du tableau (boutons ➖ 100% ➕ et Ctrl+molette) ---------- */
  var _zoom = 1;
  window.creZoom = function (dir) {
    if (dir === 0) _zoom = 1;
    else _zoom = Math.min(2.5, Math.max(0.4, _zoom * (dir > 0 ? 1.15 : 1 / 1.15)));
    var bd = board(); if (!bd) return;
    bd.style.zoom = _zoom;
    var v = el('cre-zoom-val'); if (v) v.textContent = Math.round(_zoom * 100) + '%';
    inkResize(); // dimensionne la planche immédiatement (remplissage des deux axes)
  };

  /* ---------- ⛶ GRAND ÉCRAN : le tableau prend toute la fenêtre ---------- */
  window.creToggleFull = function (force) {
    var studio = el('cre-studio'); if (!studio) return;
    // le panneau à agrandir dépend de l'hôte : synthèse OU bloc-notes privé
    var panel = studio.closest('#cre-note-edit, #note-wrap-prive') || studio;
    var on = (force !== undefined) ? !!force : !panel.classList.contains('cre-full');
    // si un AUTRE panneau était resté en grand écran, on le libère d'abord
    document.querySelectorAll('.cre-full').forEach(function (p) { if (p !== panel) p.classList.remove('cre-full'); });
    document.querySelectorAll('.cre-full-host').forEach(function (s) { s.classList.remove('cre-full-host'); });
    panel.classList.toggle('cre-full', on);
    // le transform d'animation de la section piégerait le position:fixed → neutralisé
    var sec = studio.closest('.section');
    if (sec && on) sec.classList.add('cre-full-host');
    var b = el('cre-full-btn'); if (b) b.classList.toggle('active', on);
    try { document.body.style.overflow = on ? 'hidden' : ''; } catch (e) {}
    inkResizeSoon();
  };
  function isTyping() {
    var a = document.activeElement;
    return a && (a.tagName === 'INPUT' || a.tagName === 'TEXTAREA' || a.isContentEditable);
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (_strokeSel.length) { clearStrokeSel(); return; }
      if (_sel.length) { clearSel(); return; }
      if (document.querySelector('.cre-full')) window.creToggleFull(false);
    }
    // 🗑️ Suppr / Retour : efface les blocs ET les traits SÉLECTIONNÉS (jamais en saisie)
    if ((e.key === 'Delete' || e.key === 'Backspace') && !isTyping() && (_sel.length || _strokeSel.length)) {
      e.preventDefault();
      if (_sel.length) deleteSelection();
      if (_strokeSel.length) deleteStrokeSel();
      return;
    }
    // Ctrl/Cmd+A dans le tableau (hors saisie) = tout sélectionner les blocs
    if ((e.ctrlKey || e.metaKey) && (e.key === 'a' || e.key === 'A') && !isTyping()) {
      var bdAll = board();
      if (bdAll && el('cre-note-edit') && el('cre-note-edit').offsetParent !== null) {
        var any = bdAll.querySelectorAll('.cre-tbox');
        if (any.length) { e.preventDefault(); clearSel(); any.forEach(function (b) { b.classList.add('sel'); _sel.push(b); }); updateSelBar(); }
      }
    }
    // 📑 Ctrl/Cmd+D = dupliquer la sélection (quand l'éditeur de synthèse est ouvert)
    if ((e.ctrlKey || e.metaKey) && (e.key === 'd' || e.key === 'D') && _sel.length &&
        el('cre-note-edit') && el('cre-note-edit').offsetParent !== null) {
      e.preventDefault(); duplicateSelection();
    }
    // ↩️ Ctrl+Z / ↪️ Ctrl+Y (ou Ctrl+Shift+Z) sur le DESSIN quand le stylo est actif
    if (_ink.on && (e.ctrlKey || e.metaKey)) {
      var cv = el('cre-ink');
      if (!cv || !cv.offsetParent) return; // tableau pas affiché
      var k = (e.key || '').toLowerCase();
      if (k === 'z' && !e.shiftKey) {
        e.preventDefault();
        var s = _ink.strokes.pop(); if (s) _ink.redo.push(s);
        inkRedraw(); boardChanged();
      } else if (k === 'y' || (k === 'z' && e.shiftKey)) {
        e.preventDefault();
        var r = _ink.redo.pop(); if (r) _ink.strokes.push(r);
        inkRedraw(); boardChanged();
      }
    }
  });

  function wireEditor() {
    var ed = el('cre-note-editor');
    if (!ed || ed._wired) return;
    ed._wired = true;
    // coller : image → compressée puis insérée ; texte → TEXTE PUR (anti-XSS, anti-style moche)
    ed.addEventListener('paste', function (e) {
      var cd = e.clipboardData || window.clipboardData || {};
      var items = cd.items || [];
      for (var i = 0; i < items.length; i++) {
        if (items[i].type && items[i].type.indexOf('image/') === 0) {
          e.preventDefault();
          var f = items[i].getAsFile();
          if (f) compressImage(f, IMG_MAX_SIDE, function (dataUrl) {
            // image collée = BLOC déplaçable/redimensionnable (comme Discord), pas collée dans le texte
            window.creAddImageBox(dataUrl);
            toast('🖼️ Image collée — attrape ⠿ pour la bouger, le coin ◢ pour la taille');
          });
          return;
        }
      }
      e.preventDefault();
      var txt = cd.getData ? (cd.getData('text') || '') : '';
      if (txt) document.execCommand('insertText', false, txt);
    });
  }

  /* ════════════════ ƒ𝑥 ÉDITEUR DE FORMULES VISUEL ════════════════
     L'idée de Drackson (« j'écris 1 plus 1 et je glisse une barre au-dessus »)
     en mieux : on clique « fraction » → la barre est déjà là, avec une case
     au-dessus et une case en dessous. Aperçu MathJax en direct. */
  var _fx = { target: null, savedRange: null, items: [], lastInput: null, prevTimer: null };

  var FX_SYMBOLS = ['+', '−', '=', '(', ')', '×', '÷', '±', '·', ',', 'π', '°', '%', '≈', '≤', '≥', '≠', '→', '∞', 'Δ', 'α', 'β', 'γ', 'θ', 'λ', 'μ', 'ω', 'Ω', '∈', '⊥'];

  // caractères « jolis » → commandes LaTeX (le reste passe tel quel)
  var FX_MAP = {
    '×': '\\times ', '÷': '\\div ', '±': '\\pm ', '·': '\\cdot ',
    'π': '\\pi ', '°': '^{\\circ}', '≈': '\\approx ', '≤': '\\le ', '≥': '\\ge ',
    '≠': '\\neq ', '→': '\\to ', '∞': '\\infty ', 'Δ': '\\Delta ',
    'α': '\\alpha ', 'β': '\\beta ', 'γ': '\\gamma ', 'θ': '\\theta ',
    'λ': '\\lambda ', 'μ': '\\mu ', 'ρ': '\\rho ', 'ω': '\\omega ', 'Ω': '\\Omega ',
    '∈': '\\in ', '∉': '\\notin ', '⊥': '\\perp ', '∥': '\\parallel ',
    '−': '-', '%': '\\%', '√': '\\surd ', '²': '^{2}', '³': '^{3}',
    '½': '\\frac{1}{2}', '⅓': '\\frac{1}{3}', '¼': '\\frac{1}{4}', '¾': '\\frac{3}{4}',
    '∑': '\\sum ', '∫': '\\int ', '≡': '\\equiv ', '⇌': '\\rightleftharpoons ',
    // caractères spéciaux LaTeX qu'un élève pourrait taper : on les neutralise
    '{': '\\{', '}': '\\}', '#': '\\#', '$': '\\$', '&': '\\&', '_': '\\_',
    '^': '\\wedge ', '~': '\\sim ', '\\': '\\backslash '
  };
  function txt2tex(s) {
    var out = '';
    for (var i = 0; i < s.length; i++) out += (FX_MAP[s[i]] !== undefined) ? FX_MAP[s[i]] : s[i];
    return out;
  }

  function slotInput(ph, extraClass) {
    var i = document.createElement('input');
    i.type = 'text'; i.className = 'fx-in' + (extraClass ? ' ' + extraClass : '');
    i.placeholder = ph || '';
    i.setAttribute('dir', 'ltr');
    // Position du curseur SUIVIE à la main (même correctif que le brouillon 🧮 :
    // selectionStart est remis à 0 au clic souris dans certains navigateurs → texte inversé).
    i._caret = 0;
    var sync = function () { try { if (i.selectionStart != null) i._caret = i.selectionStart; } catch (e) {} };
    i.addEventListener('input', function () {
      sync();
      i.style.width = Math.max(38, 14 + i.value.length * 10) + 'px';
      schedPrev();
    });
    i.addEventListener('keyup', sync);
    i.addEventListener('mouseup', sync);
    i.addEventListener('focus', function () { _fx.lastInput = i; sync(); });
    // Entrée n'importe où = la formule est insérée directement
    i.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { e.preventDefault(); window.fxInsert(); }
    });
    return i;
  }

  window.fxAdd = function (type, opts) {
    var row = el('fx-row'); if (!row) return;
    opts = opts || {};
    var item = { type: type, slots: [], pad: !!opts.pad };
    var wrap = document.createElement('span');
    wrap.className = 'fx-item fx-' + type;
    if (type === 'text') {
      var ti = slotInput(opts.pad ? '…' : '1+1');
      item.slots = [ti]; wrap.appendChild(ti);
      // ⌫ dans une case texte VIDE → la case s'enlève, le curseur recule sur le bloc d'avant
      ti.addEventListener('keydown', function (e) {
        if (e.key !== 'Backspace' || ti.value) return;
        var idx = _fx.items.indexOf(item);
        if (idx <= 0) return;
        e.preventDefault();
        _fx.items.splice(idx, 1);
        wrap.remove();
        var prev = _fx.items[idx - 1];
        var s = prev && prev.slots[prev.slots.length - 1];
        if (s) {
          s.focus();
          try { s.setSelectionRange(s.value.length, s.value.length); s._caret = s.value.length; } catch (err) {}
        }
        schedPrev();
      });
    } else if (type === 'frac') {
      var num = slotInput('haut'), den = slotInput('bas');
      var top = document.createElement('span'); top.className = 'fx-num'; top.appendChild(num);
      var bot = document.createElement('span'); bot.className = 'fx-den'; bot.appendChild(den);
      var col = document.createElement('span'); col.className = 'fx-col'; col.appendChild(top); col.appendChild(bot);
      item.slots = [num, den]; wrap.appendChild(col);
    } else if (type === 'sqrt') {
      var sq = slotInput('x');
      var sign = document.createElement('span'); sign.className = 'fx-sqsign'; sign.textContent = '√';
      var box = document.createElement('span'); box.className = 'fx-sqbox'; box.appendChild(sq);
      item.slots = [sq]; wrap.appendChild(sign); wrap.appendChild(box);
    } else if (type === 'pow' || type === 'sub') {
      var base = slotInput('x');
      var mini = slotInput(type === 'pow' ? '2' : '1', type === 'pow' ? 'fx-sup' : 'fx-subs');
      item.slots = [base, mini]; wrap.appendChild(base); wrap.appendChild(mini);
    } else if (type === 'vec' || type === 'bar') {
      var v = slotInput(type === 'vec' ? 'AB' : 'x');
      var over = document.createElement('span'); over.className = 'fx-over'; over.textContent = type === 'vec' ? '⟶' : '▔▔';
      var colv = document.createElement('span'); colv.className = 'fx-col';
      colv.appendChild(over); colv.appendChild(v);
      item.slots = [v]; wrap.appendChild(colv);
    } else return;
    var x = document.createElement('button');
    x.type = 'button'; x.className = 'fx-x'; x.textContent = '✕'; x.title = 'Retirer ce bloc';
    x.addEventListener('click', function () {
      var idx = _fx.items.indexOf(item);
      if (idx >= 0) _fx.items.splice(idx, 1);
      wrap.remove(); schedPrev();
    });
    wrap.appendChild(x);
    item.el = wrap;
    // si une petite case « … » traîne en fin de ligne, le nouveau bloc se glisse AVANT elle
    var last = _fx.items[_fx.items.length - 1];
    if (!opts.pad && last && last.pad && last.type === 'text' && !last.slots[0].value) {
      row.insertBefore(wrap, last.el);
      _fx.items.splice(_fx.items.length - 1, 0, item);
    } else {
      row.appendChild(wrap);
      _fx.items.push(item);
    }
    if (type !== 'text') ensurePad(); // toujours une case texte prête À DROITE des blocs
    if (!opts.noFocus) item.slots[0].focus();
    schedPrev();
  };
  // garantit qu'on peut toujours écrire à droite du dernier bloc (case « … »)
  function ensurePad() {
    var last = _fx.items[_fx.items.length - 1];
    if (last && last.type === 'text' && !last.slots[0].value) { last.pad = true; return; }
    window.fxAdd('text', { pad: true, noFocus: true });
  }

  function slotTex(input, emptyAs) {
    var v = input.value.trim();
    return v ? txt2tex(v) : (emptyAs !== undefined ? emptyAs : '\\square');
  }
  function fxToTex() {
    return _fx.items.map(function (it) {
      switch (it.type) {
        case 'text': return slotTex(it.slots[0], '');
        case 'frac': return '\\frac{' + slotTex(it.slots[0]) + '}{' + slotTex(it.slots[1]) + '}';
        case 'sqrt': return '\\sqrt{' + slotTex(it.slots[0]) + '}';
        case 'pow':  return '{' + slotTex(it.slots[0]) + '}^{' + slotTex(it.slots[1]) + '}';
        case 'sub':  return '{' + slotTex(it.slots[0]) + '}_{' + slotTex(it.slots[1]) + '}';
        case 'vec':  return (it.slots[0].value.trim().length > 1 ? '\\overrightarrow{' : '\\vec{') + slotTex(it.slots[0]) + '}';
        case 'bar':  return '\\overline{' + slotTex(it.slots[0]) + '}';
      }
      return '';
    }).join(' ').replace(/\s+/g, ' ').trim();
  }

  function schedPrev() {
    clearTimeout(_fx.prevTimer);
    _fx.prevTimer = setTimeout(renderPrev, 250);
  }
  function renderPrev() {
    var prev = el('fx-prev'); if (!prev) return;
    var tex = fxToTex();
    if (!tex) { prev.innerHTML = '<span class="fx-prev-empty">Ajoute des blocs ci-dessus 👆 — l\'aperçu s\'affiche ici.</span>'; return; }
    prev.innerHTML = esc('\\(\\displaystyle ' + tex + '\\)');
    if (typeof safeMathJax === 'function') safeMathJax([prev]);
  }

  window.fxSym = function (ch) {
    var i = _fx.lastInput;
    if (!i || !document.body.contains(i)) {
      window.fxAdd('text');
      var last = _fx.items[_fx.items.length - 1];
      i = last ? last.slots[0] : null;
      if (!i) return;
    }
    // on utilise la position suivie à la main, jamais selectionStart au moment du clic
    var st = i._caret;
    if (st == null || st < 0 || st > i.value.length) st = i.value.length;
    i.value = i.value.slice(0, st) + ch + i.value.slice(st);
    i._caret = st + ch.length;
    i.focus();
    try { i.setSelectionRange(i._caret, i._caret); } catch (e) {}
    i.style.width = Math.max(38, 14 + i.value.length * 10) + 'px';
    schedPrev();
  };

  function buildFx() {
    var ov = el('fx-ov');
    if (ov) return;
    ov = document.createElement('div'); ov.id = 'fx-ov';
    ov.innerHTML =
      '<div class="fx-box">' +
        '<div class="fx-head"><b>ƒ𝑥 Créer une formule</b>' +
          '<button type="button" class="cre-view-x" onclick="fxClose()" aria-label="Fermer" style="position:static;">✕</button></div>' +
        '<p class="fx-help">Ajoute des blocs et remplis les cases — pour une fraction, la barre se place toute seule entre le haut et le bas 😉 Tu peux <b>cliquer à côté des blocs</b> pour continuer à écrire, et <b>Entrée</b> insère la formule.</p>' +
        '<div class="fx-add">' +
          '<button type="button" class="fx-addbtn" onclick="fxAdd(\'text\')">✏️ texte</button>' +
          '<button type="button" class="fx-addbtn" onclick="fxAdd(\'frac\')"><span class="fx-minifrac"><span>a</span><span>b</span></span> fraction</button>' +
          '<button type="button" class="fx-addbtn" onclick="fxAdd(\'sqrt\')">√x racine</button>' +
          '<button type="button" class="fx-addbtn" onclick="fxAdd(\'pow\')">x² puissance</button>' +
          '<button type="button" class="fx-addbtn" onclick="fxAdd(\'sub\')">x₁ indice</button>' +
          '<button type="button" class="fx-addbtn" onclick="fxAdd(\'vec\')"><span class="fx-minivec"><span>→</span><span>AB</span></span> vecteur</button>' +
          '<button type="button" class="fx-addbtn" onclick="fxAdd(\'bar\')">x̄ barre dessus</button>' +
        '</div>' +
        '<div class="fx-row" id="fx-row"></div>' +
        '<div class="fx-syms">' +
          FX_SYMBOLS.map(function (s) {
            return '<button type="button" class="note-ch" onmousedown="event.preventDefault()" onclick="fxSym(\'' + s + '\')">' + s + '</button>';
          }).join('') +
        '</div>' +
        '<div class="fx-prevwrap"><span class="fx-prevlab">Aperçu en direct</span><div id="fx-prev"></div></div>' +
        '<div class="fx-actions">' +
          '<button type="button" class="nd-btn" onclick="fxClear()">🗑️ Tout effacer</button>' +
          '<button type="button" class="nd-btn nd-btn-ok" onclick="fxInsert()">✅ Insérer la formule</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(ov);
    ov.addEventListener('click', function (e) { if (e.target === ov) window.fxClose(); });
    // clic sur le FOND de la ligne (à droite des blocs) → on écrit là, tout simplement
    el('fx-row').addEventListener('mousedown', function (e) {
      if (e.target !== this) return;
      e.preventDefault();
      var last = _fx.items[_fx.items.length - 1];
      if (last && last.type === 'text' && !last.slots[0].value) last.slots[0].focus();
      else window.fxAdd('text');
    });
  }

  /* La formule devient une VRAIE image (SVG MathJax) directement dans le tableau —
     fini le \( … \) en texte brut dans l'éditeur. L'image garde la formule LaTeX
     dans son attribut alt, et survit au nettoyage anti-XSS (classe cre-fx-img). */
  function texToImg(tex) {
    try {
      if (!window.MathJax || typeof MathJax.tex2svg !== 'function') return null;
      var holder = MathJax.tex2svg(tex, { display: false });
      var svg = holder.querySelector('svg');
      if (!svg) return null;
      var ref = activeEd() || document.body, cs = getComputedStyle(ref);
      // couleur FIXE claire : lisible sur les thèmes sombres ; le thème Clair
      // l'inverse en CSS (body.theme-light img.cre-fx-img → filter invert)
      svg.setAttribute('color', '#e9e6ff');
      var exPx = (parseFloat(cs.fontSize) || 16) * 0.52;  // 1ex ≈ moitié de la taille du texte
      var w = Math.max(8, Math.ceil((parseFloat(svg.getAttribute('width')) || 4) * exPx));
      var h = Math.max(8, Math.ceil((parseFloat(svg.getAttribute('height')) || 2) * exPx));
      svg.setAttribute('width', w + 'px');
      svg.setAttribute('height', h + 'px');
      var xml = new XMLSerializer().serializeToString(svg);
      var img = document.createElement('img');
      img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(xml);
      img.alt = tex;
      img.className = 'cre-fx-img';
      return img;
    } catch (e) { return null; }
  }

  window.fxClear = function () {
    _fx.items = []; _fx.lastInput = null;
    var row = el('fx-row'); if (row) row.innerHTML = '';
    renderPrev();
  };
  window.fxClose = function () { var ov = el('fx-ov'); if (ov) ov.style.display = 'none'; };

  /* Ouvre l'éditeur visuel. target = id d'un <input>/<textarea>, ou 'cre-note'
     pour insérer dans l'éditeur de synthèse au niveau du curseur. */
  window.openFormulaComposer = function (target) {
    _fx.target = target || null;
    _fx.savedRange = null;
    _fx.targetCaret = null;
    if (target === 'cre-note') {
      exitInk(); // ouvrir l'éditeur de formule désactive le stylo
      // curseur mémorisé dans l'éditeur principal OU dans un bloc déplaçable
      var sel = window.getSelection(), zone = activeEd();
      if (sel && sel.rangeCount && zone && zone.contains(sel.getRangeAt(0).commonAncestorContainer)) {
        _fx.savedRange = sel.getRangeAt(0).cloneRange();
      }
    } else if (target) {
      // position mémorisée À L'OUVERTURE (après, le clic des boutons la perdrait)
      var f0 = el(target);
      if (f0 && typeof f0.value === 'string' && f0.selectionStart != null) {
        _fx.targetCaret = f0.selectionStart;
        // caret perdu par le clic sur le bouton ƒ𝑥 → on insère en fin de champ
        if (_fx.targetCaret === 0 && f0.value.length) _fx.targetCaret = f0.value.length;
      }
    }
    buildFx();
    window.fxClear();
    el('fx-ov').style.display = 'flex';
    window.fxAdd('text'); // un bloc texte prêt à l'emploi
  };

  /* ---------- 👁 APERÇU LIVE des champs qui acceptent une formule (quiz, flashcards) ----------
     Le champ garde le code \( … \) (nécessaire pour la sauvegarde / le rendu au quiz),
     mais un petit aperçu sous le champ montre le BEAU rendu — fini le « LaTeX brut » à l'écran. */
  var _fxPrevTimers = {};
  window.creFxPreview = function (srcId, prevId) {
    var src = el(srcId), prev = el(prevId);
    if (!src || !prev) return;
    clearTimeout(_fxPrevTimers[prevId]);
    _fxPrevTimers[prevId] = setTimeout(function () {
      var v = (src.value || '').trim();
      if (!v || v.indexOf('\\(') < 0) { prev.style.display = 'none'; prev.innerHTML = ''; return; }
      prev.style.display = 'block';
      prev.textContent = v;                 // MathJax rend les \( … \) (texte sûr)
      if (typeof safeMathJax === 'function') safeMathJax([prev]);
    }, 260);
  };

  window.fxInsert = function () {
    var tex = fxToTex();
    if (!tex) { toast('⚠️ La formule est vide', '#f87171'); return; }
    var str = '\\(' + tex + '\\)';
    if (_fx.target === 'cre-note') {
      var ed = activeEd();
      if (ed) {
        ed.focus();
        if (_fx.savedRange) {
          var sel = window.getSelection();
          if (sel) { sel.removeAllRanges(); sel.addRange(_fx.savedRange); }
        }
        var img = texToImg(tex);
        if (img) { edInsert(img); edInsert(' '); } // belle formule rendue + espace pour continuer
        else edInsert(' ' + str + ' ');            // repli si MathJax pas encore chargé
      }
    } else {
      var f = el(_fx.target);
      if (f && typeof f.value === 'string') {
        var st = (_fx.targetCaret != null) ? Math.min(_fx.targetCaret, f.value.length) : f.value.length;
        f.value = f.value.slice(0, st) + str + f.value.slice(st);
        f.focus();
        try { f.setSelectionRange(st + str.length, st + str.length); } catch (e) {}
        f.dispatchEvent(new Event('input', { bubbles: true })); // déclenche l'aperçu live
      }
    }
    window.fxClose();
    toast('✅ Formule insérée — elle s\'affichera en beau rendu 🤩');
  };

  /* ════════════════ 💾 EXPORT / IMPORT de MES CRÉATIONS (fusion, non destructif) ════════════════
     Différent de l'export « Progrès » (global, qui REMPLACE) : ici on ne sauvegarde QUE
     les créations (cartes + synthèses + questions) et l'import les AJOUTE (fusion par id). */
  window.creExport = function () {
    var d = loadSavedData();
    var pack = {
      _type: 'gr2-creations', _date: new Date().toISOString(),
      customCards: d.customCards || [], customNotes: d.customNotes || [], customExercises: d.customExercises || [],
      formulaBank: d.formulaBank || []
    };
    var total = pack.customCards.length + pack.customNotes.length + pack.customExercises.length + pack.formulaBank.length;
    if (!total) { toast('Rien à exporter pour l\'instant', '#fbbf24'); return; }
    try {
      var blob = new Blob([JSON.stringify(pack, null, 2)], { type: 'application/json' });
      var url = URL.createObjectURL(blob);
      var n = new Date(), stamp = n.getFullYear() + '-' + ('0' + (n.getMonth() + 1)).slice(-2) + '-' + ('0' + n.getDate()).slice(-2);
      var a = document.createElement('a'); a.href = url; a.download = 'mes-creations-gr2-' + stamp + '.json';
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
      toast('✅ ' + total + ' création(s) exportée(s)');
    } catch (e) { toast('❌ Export impossible', '#f87171'); }
  };
  window.crePickImport = function () { var i = el('cre-import-file'); if (i) { i.value = ''; i.click(); } };
  window.creImport = function (input) {
    var f = input && input.files && input.files[0]; if (!f) return;
    var reader = new FileReader();
    reader.onload = function (e) {
      var obj; try { obj = JSON.parse(e.target.result); } catch (err) { toast('❌ Fichier illisible (JSON invalide)', '#f87171'); return; }
      if (!obj || typeof obj !== 'object' || Array.isArray(obj)) { toast('❌ Fichier invalide', '#f87171'); return; }
      var d = loadSavedData(), added = 0;
      ['customCards', 'customNotes', 'customExercises', 'formulaBank'].forEach(function (key) {
        var incoming = Array.isArray(obj[key]) ? obj[key] : [];
        d[key] = d[key] || [];
        var seen = {}; d[key].forEach(function (it) { if (it && it.id != null) seen[it.id] = 1; });
        incoming.forEach(function (it) {
          if (!it || typeof it !== 'object') return;
          if (it.id == null || seen[it.id]) it.id = Date.now() + Math.floor(Math.random() * 1e5); // évite les collisions d'id
          seen[it.id] = 1; d[key].unshift(it); added++;
        });
      });
      if (!added) { toast('Aucune création trouvée dans ce fichier', '#fbbf24'); return; }
      saveData(d);
      renderCustomCards(); renderCustomNotes();
      if (typeof renderCustomExoList === 'function') renderCustomExoList();
      refreshDeck();
      toast('✅ ' + added + ' création(s) importée(s) (ajoutées aux tiennes)');
    };
    reader.readAsText(f);
  };

  /* ════════════════ init ════════════════ */
  window.initCreations = function () {
    var sel = el('cre-card-theme');
    if (sel && !sel.options.length && typeof rebuildExoThemes === 'function') {
      try { rebuildExoThemes(); } catch (e) {}
    }
    renderCustomCards();
    renderCustomNotes();
    // restaure le dernier onglet utilisé (quiz / cartes / synthèses)
    try {
      var lt = localStorage.getItem('mathsgr2_cretab');
      if (lt && ['quiz', 'cards', 'notes'].indexOf(lt) >= 0 && lt !== 'quiz') window.creSwitch(lt);
    } catch (e) {}
  };

  // rafraîchit les listes (cartes + synthèses) quand on change de matière —
  // sinon elles affichent encore les créations de la matière précédente
  window.creRefreshLists = function () {
    try { renderCustomCards(); } catch (e) {}
    try { if (!el('cre-note-edit') || el('cre-note-edit').style.display === 'none') renderCustomNotes(); } catch (e) {}
  };

  // Au chargement : les cartes persos rejoignent le paquet de la matière restaurée
  document.addEventListener('DOMContentLoaded', function () {
    setTimeout(function () { try { refreshDeck(); } catch (e) {} }, 0);
  });
})();
