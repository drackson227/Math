/*! GR2 Study © 2026 Drackson — Tous droits réservés. Copie, reproduction ou réutilisation du code interdites sans autorisation écrite (Instagram @drackson227). */
/* ══════════════════════════════════════════════════════════════════════════
   🔧 DIAGNOSTIC — outil intégré qui mesure l'état RÉEL du site (sur l'appareil
   de l'élève) pour permettre une bien meilleure analyse.
   Produit un rapport copiable : erreurs JS captées, stockage, intégrité des
   données, vérifs DOM, environnement. Ouvre : Ctrl+Shift+D, lien 🔧 du footer,
   ou window.gr2Diag().  Ne contient AUCUN contenu perso (que des compteurs/tailles).
   ══════════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  var QUOTA_KCHARS = 5000; // ~5 Mo de caractères = quota localStorage typique

  function ko(n) { return (n / 1024).toFixed(1) + ' Ko'; }
  function safeParse(s) { try { return JSON.parse(s); } catch (e) { return null; } }
  function pad2(n) { return ('0' + n).slice(-2); }
  function stamp() { var d = new Date(); return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate()) + ' ' + pad2(d.getHours()) + ':' + pad2(d.getMinutes()); }

  // ---- analyse du stockage ----
  function storageInfo() {
    var keys = [], totalChars = 0;
    try {
      for (var i = 0; i < localStorage.length; i++) {
        var k = localStorage.key(i), v = localStorage.getItem(k) || '';
        var c = k.length + v.length;
        totalChars += c;
        keys.push({ k: k, c: c });
      }
    } catch (e) { return { err: String(e) }; }
    keys.sort(function (a, b) { return b.c - a.c; });
    return { keys: keys, totalChars: totalChars };
  }

  // ---- intégrité d'un tableau d'objets {id,...} ----
  function checkArray(arr, name, reqFields) {
    var out = [];
    if (arr == null) { return [name + ' : 0 (aucune créée pour l\'instant)']; }
    if (!Array.isArray(arr)) { return [name + ' : ⚠️ format inattendu (pas un tableau)']; }
    var ids = {}, dup = 0, noId = 0, missing = 0, big = 0, bigMax = 0;
    arr.forEach(function (it) {
      if (!it || typeof it !== 'object') { missing++; return; }
      if (it.id == null) noId++; else { if (ids[it.id]) dup++; ids[it.id] = 1; }
      (reqFields || []).forEach(function (f) { if (it[f] == null || it[f] === '') missing++; });
      var sz = 0; try { sz = JSON.stringify(it).length; } catch (e) {}
      if (sz > 50000) { big++; if (sz > bigMax) bigMax = sz; } // grosse entrée (image base64 ?)
    });
    out.push(name + ' : ' + arr.length + ' élément(s)' +
      (dup ? ' · ⚠️ ' + dup + ' id en double' : '') +
      (noId ? ' · ⚠️ ' + noId + ' sans id' : '') +
      (missing ? ' · ⚠️ ' + missing + ' champ(s) manquant(s)' : '') +
      (big ? ' · ⚠️ ' + big + ' grosse(s) entrée(s) (max ' + ko(bigMax) + ', image lourde ?)' : '') +
      (!dup && !noId && !missing && !big && arr.length ? ' ✅' : ''));
    return out;
  }

  function brokenImages() {
    var imgs = document.querySelectorAll('img'), bad = [];
    Array.prototype.forEach.call(imgs, function (im) {
      if (im.complete && im.naturalWidth === 0 && im.src) bad.push((im.src || '').split('/').pop().slice(0, 40));
    });
    return bad;
  }

  // ---- 🎨 analyse QUALITÉ (imperfections, pas des bugs) ----
  function parseColor(s) {
    if (!s) return null;
    if (s === 'transparent') return { r: 0, g: 0, b: 0, a: 0 };
    var m = s.match(/rgba?\(([^)]+)\)/); if (!m) return null;
    var p = m[1].split(/[,\/\s]+/).map(parseFloat).filter(function (x) { return !isNaN(x); });
    return { r: p[0] || 0, g: p[1] || 0, b: p[2] || 0, a: (p[3] == null ? 1 : p[3]) };
  }
  function relLum(c) {
    function ch(v) { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }
    return 0.2126 * ch(c.r) + 0.7152 * ch(c.g) + 0.0722 * ch(c.b);
  }
  function contrast(a, b) { var hi = Math.max(relLum(a), relLum(b)), lo = Math.min(relLum(a), relLum(b)); return (hi + 0.05) / (lo + 0.05); }
  function effBg(el) {
    // empile les fonds (semi-)transparents puis les compose sur le fond sombre de la page
    var layers = [], node = el;
    while (node && node.nodeType === 1) {
      var c = parseColor(getComputedStyle(node).backgroundColor);
      if (c && c.a > 0) { layers.push(c); if (c.a >= 0.99) break; }
      node = node.parentElement;
    }
    var base = { r: 15, g: 17, b: 23 }; // page sombre par défaut
    for (var i = layers.length - 1; i >= 0; i--) {
      var L = layers[i], a = L.a;
      base = { r: L.r * a + base.r * (1 - a), g: L.g * a + base.g * (1 - a), b: L.b * a + base.b * (1 - a) };
    }
    return base;
  }
  // fond dégradé / image en arrière-plan → contraste non fiable (comme Lighthouse, on ignore)
  function bgIsComplex(el) {
    var node = el;
    while (node && node.nodeType === 1) {
      var cs = getComputedStyle(node);
      if (cs.backgroundImage && cs.backgroundImage !== 'none') return true;
      var c = parseColor(cs.backgroundColor);
      if (c && c.a > 0.1) return false; // fond plein atteint
      node = node.parentElement;
    }
    return false;
  }
  function qualityInfo() {
    var L = [], active = document.querySelector('.section.active');
    L.push('Zone analysée : ' + (active ? '« ' + active.id + ' »' : 'page') + ' — ⚠️ seul ce qui est AFFICHÉ est vu (ouvre le diagnostic sur chaque onglet pour tout couvrir).');
    var sw = document.documentElement.scrollWidth, iw = window.innerWidth;
    L.push(sw > iw + 2 ? '⚠️ Débordement horizontal : la page dépasse de ' + (sw - iw) + 'px (un élément est trop large).' : 'Pas de débordement horizontal ✅');
    var els = [].slice.call(document.querySelectorAll('p,h1,h2,h3,h4,li,a,button,.nav-btn,span,div,label,td,th'));
    var scanned = 0, lowC = [], tiny = 0, skipped = 0;
    for (var i = 0; i < els.length && scanned < 600; i++) {
      var e = els[i];
      if (!e.offsetParent && getComputedStyle(e).position !== 'fixed') continue;
      var hasDirect = false, txt = '';
      for (var j = 0; j < e.childNodes.length; j++) { var n = e.childNodes[j]; if (n.nodeType === 3 && n.textContent.trim()) { hasDirect = true; txt += n.textContent; } }
      if (!hasDirect) continue;
      txt = txt.trim(); if (txt.length < 2) continue;
      if (!/[A-Za-zÀ-ÿ0-9]/.test(txt)) continue; // emoji/symbole seul (⚙️…) → contraste non pertinent
      scanned++;
      var cs = getComputedStyle(e), fs = parseFloat(cs.fontSize) || 16;
      if (fs < 12) tiny++;
      var col = parseColor(cs.color) || { r: 230, g: 230, b: 230, a: 1 };
      var clip = cs.webkitBackgroundClip || cs.backgroundClip;
      if (bgIsComplex(e) || col.a < 0.1 || clip === 'text') { skipped++; continue; } // fond dégradé OU texte en dégradé → non fiable
      var ratio = contrast(col, effBg(e));
      var big = fs >= 24 || (fs >= 18.66 && (parseInt(cs.fontWeight, 10) >= 700 || cs.fontWeight === 'bold'));
      if (ratio < (big ? 3 : 4.5)) lowC.push({ t: txt.slice(0, 30), r: ratio.toFixed(2), fs: Math.round(fs) });
    }
    L.push('Textes analysés : ' + scanned + (skipped ? ' (' + skipped + ' sur fond dégradé non vérifiés)' : ''));
    L.push('Contraste trop faible (lisibilité) : ' + (lowC.length ? lowC.length + ' ⚠️' : 'aucun ✅'));
    lowC.slice(0, 6).forEach(function (x) { L.push('  • "' + x.t + '" — contraste ' + x.r + ' (cible ≥ 4.5) · ' + x.fs + 'px'); });
    L.push('Textes < 12px (trop petits) : ' + (tiny ? tiny + ' ⚠️' : 'aucun ✅'));
    var ins = [].slice.call(document.querySelectorAll('input,select,textarea')).filter(function (e) { return e.offsetParent; });
    var smallIn = ins.filter(function (e) { return (parseFloat(getComputedStyle(e).fontSize) || 16) < 16; }).length;
    L.push('Champs < 16px (font zoomer l\'iPhone) : ' + (smallIn ? smallIn + ' ⚠️' : 'aucun ✅'));
    var tap = [].slice.call(document.querySelectorAll('button,a,.nav-btn,input,select')).filter(function (e) { return e.offsetParent; });
    var small = 0; tap.forEach(function (e) { var r = e.getBoundingClientRect(); if (r.width > 0 && (r.width < 40 || r.height < 40)) small++; });
    L.push('Boutons/liens petits au doigt (<40px) : ' + (small ? small + ' ⚠️' : 'aucun ✅'));
    var imgs = [].slice.call(document.querySelectorAll('img'));
    var noAlt = imgs.filter(function (e) { return !e.hasAttribute('alt'); }).length; // alt="" = décoratif (valide), on ne signale que l'absence totale
    L.push('Images sans description (alt) : ' + (noAlt ? noAlt + ' / ' + imgs.length + ' ⚠️' : (imgs.length ? 'toutes décrites ✅' : 'aucune image')));
    var noName = tap.filter(function (e) { return !((e.textContent || '').trim()) && !e.getAttribute('aria-label') && !e.title && e.type !== 'text' && e.type !== 'search'; }).length;
    L.push('Boutons sans nom (lecteur d\'écran) : ' + (noName ? noName + ' ⚠️' : 'aucun ✅'));
    return L;
  }

  // ---- construit le rapport texte ----
  function buildReport() {
    var L = [];
    L.push('═══ RAPPORT DIAGNOSTIC — GR2 STUDY ═══');
    L.push('Date : ' + stamp());
    L.push('Page : ' + location.href);
    L.push('');

    // Environnement
    L.push('── ENVIRONNEMENT ──');
    L.push('Navigateur : ' + (navigator.userAgent || '?'));
    L.push('Langue : ' + (navigator.language || '?') + ' · En ligne : ' + (navigator.onLine ? 'oui' : 'NON ⚠️'));
    L.push('Écran : ' + window.innerWidth + '×' + window.innerHeight + ' (zoom pixel ×' + (window.devicePixelRatio || 1) + ')');
    L.push('Thème : ' + (document.body ? (document.body.className || '(défaut)') : '?'));
    L.push('Matière active : ' + (window.currentSubject || '?'));
    L.push('MathJax : ' + (window.MathJax ? ('chargé' + (window.MathJax.version ? ' v' + window.MathJax.version : '')) : 'NON chargé ⚠️'));
    L.push('Service Worker : ' + (('serviceWorker' in navigator) ? (navigator.serviceWorker.controller ? 'actif' : 'pas encore actif') : 'non supporté'));
    L.push('');

    // Stockage
    L.push('── STOCKAGE (localStorage) ──');
    var s = storageInfo();
    if (s.err) { L.push('Erreur de lecture : ' + s.err); }
    else {
      var kchars = s.totalChars / 1024;
      var pct = Math.round((kchars / QUOTA_KCHARS) * 100);
      L.push('Utilisé : ' + ko(s.totalChars) + ' / ~' + QUOTA_KCHARS + ' Ko (' + pct + '%)' + (pct >= 80 ? ' ⚠️ BIENTÔT PLEIN' : ''));
      L.push('Plus gros postes :');
      s.keys.slice(0, 8).forEach(function (it) { L.push('  • ' + it.k + ' : ' + ko(it.c)); });
    }
    L.push('');

    // Données
    L.push('── DONNÉES (mathsgr2_data) ──');
    var raw = '';
    try { raw = localStorage.getItem('mathsgr2_data') || ''; } catch (e) {}
    var d = safeParse(raw);
    var inMem = false;
    if (!d && typeof loadSavedData === 'function') { try { d = loadSavedData(); inMem = true; } catch (e) {} } // pas encore écrit sur le disque → lire la mémoire
    if (!d) { L.push('⚠️ Données illisibles ou absentes.'); }
    else {
      L.push('Taille : ' + ko((raw || JSON.stringify(d)).length) + (inMem ? ' (en mémoire, pas encore enregistré)' : ''));
      L.push('XP : ' + (d.xp != null ? d.xp : '?') + ' · Meilleur score : ' + (d.bestScore != null ? d.bestScore : '?') + '%');
      [].push.apply(L, checkArray(d.customCards, 'Flashcards perso', ['front']));
      [].push.apply(L, checkArray(d.customNotes, 'Synthèses perso', []));
      [].push.apply(L, checkArray(d.customExercises, 'Questions perso', ['q']));
      [].push.apply(L, checkArray(d.formulaBank, 'Formules perso', ['name', 'latex']));
      var acc = d.fbAccept ? Object.keys(d.fbAccept).length : 0;
      var accN = 0; if (d.fbAccept) Object.keys(d.fbAccept).forEach(function (k) { accN += (d.fbAccept[k] || []).length; });
      L.push('Formules : variantes apprises = ' + accN + ' (sur ' + acc + ' formule(s)) · masquées = ' + ((d.fbHidden || []).length) + ' · stats site = ' + (d.fbStats ? Object.keys(d.fbStats).length : 0));
      L.push('Journal : ' + ((d.journalEntries || []).length) + ' · Examens : ' + (d.examDates ? Object.keys(d.examDates).length : 0));
    }
    L.push('');

    // Erreurs JS captées
    L.push('── ERREURS JS CAPTÉES ──');
    var errs = window.__GR2_ERRORS || [];
    if (!errs.length) { L.push('Aucune ✅'); }
    else {
      L.push(errs.length + ' erreur(s) (les plus récentes en bas) :');
      errs.slice(-15).forEach(function (e) {
        var hh = new Date(e.t); var ts = pad2(hh.getHours()) + ':' + pad2(hh.getMinutes()) + ':' + pad2(hh.getSeconds());
        L.push('  [' + ts + '] ' + e.kind + ' : ' + e.msg + (e.src ? ' (' + e.src + (e.line ? ':' + e.line : '') + ')' : ''));
      });
    }
    L.push('');

    // Vérifs DOM
    L.push('── VÉRIFS PAGE ──');
    L.push('Sections : ' + document.querySelectorAll('.section').length + ' · Boutons nav : ' + document.querySelectorAll('.nav-btn').length);
    L.push('Formules rendues (MathJax) : ' + document.querySelectorAll('mjx-container').length);
    try { L.push('Onglet « Formules par cœur » : ' + (typeof window.ftInit === 'function' ? 'présent ✅' : 'ABSENT ⚠️') + ' · formules du site (matière active) : ' + (typeof window.SUBJECTS !== 'undefined' && window.SUBJECTS[window.currentSubject] && window.SUBJECTS[window.currentSubject].content ? 'dispo' : '?')); } catch (e) {}
    var bad = brokenImages();
    L.push('Images cassées : ' + (bad.length ? bad.length + ' ⚠️ → ' + bad.slice(0, 5).join(', ') : 'aucune ✅'));
    L.push('');

    // Qualité / imperfections (pas des bugs)
    L.push('── QUALITÉ / À PEAUFINER (perfection, pas des bugs) ──');
    try { [].push.apply(L, qualityInfo()); } catch (e) { L.push('Analyse qualité indisponible : ' + e); }
    L.push('');

    L.push('═══ FIN DU RAPPORT (copie tout et colle-le à Claude) ═══');
    return L.join('\n');
  }
  window.gr2BuildReport = buildReport;

  // ---- interface ----
  function ov() { return document.getElementById('gr2-diag-ov'); }
  window.gr2Diag = function () {
    var o = ov();
    if (!o) {
      o = document.createElement('div');
      o.id = 'gr2-diag-ov';
      o.innerHTML =
        '<div class="gr2-diag-box">' +
          '<div class="gr2-diag-head"><b>🔧 Diagnostic du site</b>' +
            '<button type="button" class="gr2-diag-x" aria-label="Fermer">✕</button></div>' +
          '<p class="gr2-diag-help">Photographie de l\'état réel du site sur ton appareil. Clique <b>📋 Copier</b> puis colle-le à Claude pour une analyse précise.</p>' +
          '<pre id="gr2-diag-pre" class="gr2-diag-pre"></pre>' +
          '<div class="gr2-diag-acts">' +
            '<button type="button" class="nav-btn nd-btn-ok" id="gr2-diag-copy">📋 Copier le rapport</button>' +
            '<button type="button" class="nav-btn" id="gr2-diag-refresh">🔄 Rafraîchir</button>' +
            '<button type="button" class="nav-btn" id="gr2-diag-close">Fermer</button>' +
          '</div>' +
        '</div>';
      document.body.appendChild(o);
      o.addEventListener('click', function (e) { if (e.target === o) close(); });
      o.querySelector('.gr2-diag-x').addEventListener('click', close);
      o.querySelector('#gr2-diag-close').addEventListener('click', close);
      o.querySelector('#gr2-diag-refresh').addEventListener('click', fill);
      o.querySelector('#gr2-diag-copy').addEventListener('click', copy);
    }
    o.style.display = 'flex';
    fill();
  };
  function close() { var o = ov(); if (o) o.style.display = 'none'; }
  function fill() { var pre = document.getElementById('gr2-diag-pre'); if (pre) pre.textContent = buildReport(); }
  function copy() {
    var txt = (document.getElementById('gr2-diag-pre') || {}).textContent || buildReport();
    var done = function () { var b = document.getElementById('gr2-diag-copy'); if (b) { b.textContent = '✅ Copié !'; setTimeout(function () { b.textContent = '📋 Copier le rapport'; }, 1800); } };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(txt).then(done, function () { legacyCopy(txt, done); });
    } else { legacyCopy(txt, done); }
  }
  function legacyCopy(txt, done) {
    try {
      var ta = document.createElement('textarea'); ta.value = txt;
      ta.style.position = 'fixed'; ta.style.top = '-9999px'; document.body.appendChild(ta);
      ta.select(); document.execCommand('copy'); ta.remove(); done();
    } catch (e) { if (typeof showToast === 'function') showToast('Copie impossible — sélectionne le texte à la main', '#f87171'); }
  }

  // raccourci clavier Ctrl+Shift+D
  document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'D' || e.key === 'd')) { e.preventDefault(); window.gr2Diag(); }
  });
})();
