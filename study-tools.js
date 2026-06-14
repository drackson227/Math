/* ============================================================
   study-tools.js — Aides à la lecture & à l'étude
   --------------------------------------------------------------
   Se greffe sur le contenu DÉJÀ rendu de l'onglet « Synthèse »
   (#synthese). Aucune dépendance aux fichiers de contenu :
   on lit la structure commune (.synth-section > h2, .card) →
   fonctionne pour les 9 matières sans rien inventer.

   Fonctions :
     1. 📑 Sommaire (chapitres cliquables) + barre de progression de lecture
     2. ✅ Marquer chaque chapitre « compris » / « à revoir » (+ % d'avancement)
     3. 🖍️ Surligneur (4 couleurs, mémorisé) + 📖 Mode lecture sans distraction
     4. 🎬 Mode cours animé  (défini dans la 2ᵉ partie du fichier)
   100 % vanilla. Données dans localStorage (clé gr2_study_v1).
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Stockage ---------- */
  var STORE_KEY = 'gr2_study_v1';
  function load() { try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch (e) { return {}; } }
  function save(d) { try { localStorage.setItem(STORE_KEY, JSON.stringify(d)); } catch (e) {} }
  function subj() { return window.currentSubject || 'maths'; }
  function norm(s) { return (s || '').replace(/\s+/g, ' ').trim(); }
  function chapKey(title) { return subj() + '::' + norm(title).slice(0, 90); }

  /* ---------- Utilitaires DOM ---------- */
  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }
  function synthRoot() { return document.getElementById('synthese'); }
  function chapters() {
    var root = synthRoot();
    if (!root) return [];
    return Array.prototype.slice.call(root.querySelectorAll('.synth-section'));
  }
  function chapTitle(sec) {
    var h = sec.querySelector('h2');
    return h ? norm(h.textContent) : '';
  }

  /* ============================================================
     1. SOMMAIRE + BARRE DE PROGRESSION DE LECTURE
     ============================================================ */
  var progressBar = null;
  function ensureProgressBar() {
    if (progressBar) return progressBar;
    progressBar = el('div', 'gr2-readprog');
    progressBar.innerHTML = '<span></span>';
    document.body.appendChild(progressBar);
    return progressBar;
  }
  function updateProgressBar() {
    if (!progressBar) return;
    var onSynth = synthRoot() && synthRoot().classList.contains('active');
    progressBar.style.display = onSynth ? 'block' : 'none';
    if (!onSynth) return;
    var h = document.documentElement;
    var max = (h.scrollHeight - h.clientHeight);
    var pct = max > 0 ? Math.min(100, Math.max(0, (h.scrollTop || window.scrollY) / max * 100)) : 0;
    progressBar.firstChild.style.width = pct.toFixed(1) + '%';
  }

  /* Panneau Sommaire (slide-in à droite) */
  var tocPanel = null;
  function ensureTocPanel() {
    if (tocPanel) return tocPanel;
    tocPanel = el('div', 'gr2-toc');
    tocPanel.innerHTML =
      '<div class="gr2-toc-head"><strong>📑 Sommaire</strong>' +
      '<button class="gr2-toc-close" aria-label="Fermer le sommaire">✕</button></div>' +
      '<div class="gr2-toc-prog"><span id="gr2-toc-prog-txt"></span>' +
      '<div class="gr2-toc-bar"><i></i></div></div>' +
      '<div class="gr2-toc-list"></div>';
    document.body.appendChild(tocPanel);
    tocPanel.querySelector('.gr2-toc-close').addEventListener('click', closeToc);
    return tocPanel;
  }
  function openToc() {
    ensureTocPanel();
    buildTocList();
    tocPanel.classList.add('open');
  }
  function closeToc() { if (tocPanel) tocPanel.classList.remove('open'); }
  function buildTocList() {
    var list = tocPanel.querySelector('.gr2-toc-list');
    list.innerHTML = '';
    var d = load(); var chaps = chapters();
    chaps.forEach(function (sec, i) {
      var title = chapTitle(sec) || ('Section ' + (i + 1));
      var status = (d.chap && d.chap[chapKey(title)]) || '';
      var badge = status === 'ok' ? '<span class="gr2-b ok">✅</span>'
        : status === 'review' ? '<span class="gr2-b rev">🔁</span>' : '';
      var item = el('button', 'gr2-toc-item', badge + '<span>' + escapeHtml(title) + '</span>');
      item.addEventListener('click', function () {
        sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
        closeToc();
      });
      list.appendChild(item);
    });
    refreshTocProgress();
  }
  function escapeHtml(s) { return (s || '').replace(/[&<>"]/g, function (c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]; }); }

  /* ============================================================
     2. AVANCEMENT : compris / à revoir par chapitre
     ============================================================ */
  function setChapStatus(title, status) {
    var d = load(); d.chap = d.chap || {};
    var k = chapKey(title);
    if (d.chap[k] === status) delete d.chap[k]; else d.chap[k] = status;
    save(d);
    refreshChapControls();
    refreshOverall();
    if (tocPanel && tocPanel.classList.contains('open')) buildTocList();
  }
  function injectChapControls() {
    chapters().forEach(function (sec) {
      if (sec.querySelector('.gr2-chap-ctrl')) return;
      var h2 = sec.querySelector('h2');
      if (!h2) return;
      var title = chapTitle(sec);
      var box = el('div', 'gr2-chap-ctrl');
      box.innerHTML =
        '<button class="gr2-cc ok" data-s="ok">✅ Compris</button>' +
        '<button class="gr2-cc rev" data-s="review">🔁 À revoir</button>';
      box.querySelectorAll('.gr2-cc').forEach(function (b) {
        b.addEventListener('click', function () { setChapStatus(title, b.dataset.s); });
      });
      h2.insertAdjacentElement('afterend', box);
    });
    refreshChapControls();
  }
  function refreshChapControls() {
    var d = load();
    chapters().forEach(function (sec) {
      var box = sec.querySelector('.gr2-chap-ctrl');
      if (!box) return;
      var status = (d.chap && d.chap[chapKey(chapTitle(sec))]) || '';
      sec.classList.toggle('gr2-done', status === 'ok');
      sec.classList.toggle('gr2-review', status === 'review');
      box.querySelectorAll('.gr2-cc').forEach(function (b) {
        b.classList.toggle('on', b.dataset.s === status);
      });
    });
  }
  function overallPct() {
    var chaps = chapters(); if (!chaps.length) return { ok: 0, total: 0, pct: 0 };
    var d = load(); var ok = 0;
    chaps.forEach(function (sec) {
      if (d.chap && d.chap[chapKey(chapTitle(sec))] === 'ok') ok++;
    });
    return { ok: ok, total: chaps.length, pct: Math.round(ok / chaps.length * 100) };
  }
  function refreshOverall() {
    var p = overallPct();
    var pill = document.getElementById('gr2-progress-pill');
    if (pill) pill.innerHTML = '🎯 ' + p.ok + '/' + p.total + ' chap. compris (' + p.pct + '%)';
    refreshTocProgress();
  }
  function refreshTocProgress() {
    if (!tocPanel) return;
    var p = overallPct();
    var t = tocPanel.querySelector('#gr2-toc-prog-txt');
    var bar = tocPanel.querySelector('.gr2-toc-bar > i');
    if (t) t.textContent = p.ok + '/' + p.total + ' chapitres compris (' + p.pct + '%)';
    if (bar) bar.style.width = p.pct + '%';
  }

  /* ============================================================
     3. SURLIGNEUR + MODE LECTURE
     ============================================================ */
  var hlOn = false, hlColor = 'yellow';
  var HL_COLORS = ['yellow', 'green', 'pink', 'blue'];

  function setHlActive(on) {
    hlOn = on;
    document.body.classList.toggle('gr2-hl-active', on);
    var btn = document.getElementById('gr2-hl-btn');
    if (btn) btn.classList.toggle('on', on);
    var pal = document.getElementById('gr2-hl-palette');
    if (pal) pal.style.display = on ? 'flex' : 'none';
  }
  function onMouseUpHighlight() {
    if (!hlOn) return;
    var sel = window.getSelection();
    if (!sel || sel.isCollapsed) return;
    var range = sel.getRangeAt(0);
    var root = synthRoot();
    if (!root || !root.contains(range.commonAncestorContainer)) return;
    var text = norm(sel.toString());
    if (text.length < 2) { sel.removeAllRanges(); return; }
    var mark = wrapRange(range, hlColor);
    sel.removeAllRanges();
    if (!mark) return;
    // mémoriser pour ce chapitre
    var sec = mark.closest('.synth-section');
    if (sec) {
      var d = load(); d.hl = d.hl || {};
      var k = chapKey(chapTitle(sec));
      d.hl[k] = d.hl[k] || [];
      d.hl[k].push({ t: text, c: hlColor });
      save(d);
    }
  }
  function wrapRange(range, color) {
    var m = el('mark', 'gr2-hl gr2-hl-' + color);
    m.setAttribute('data-c', color);
    try { range.surroundContents(m); return m; }
    catch (e) {
      try {
        var frag = range.extractContents();
        m.appendChild(frag);
        range.insertNode(m);
        return m;
      } catch (e2) { return null; }
    }
  }
  /* clic sur un surlignage → le retirer */
  function onClickRemoveHl(ev) {
    var m = ev.target.closest && ev.target.closest('mark.gr2-hl');
    if (!m) return;
    if (hlOn) return; // en mode surlignage, on laisse sélectionner
    ev.preventDefault();
    var sec = m.closest('.synth-section');
    var txt = norm(m.textContent);
    // déballer
    var parent = m.parentNode;
    while (m.firstChild) parent.insertBefore(m.firstChild, m);
    parent.removeChild(m);
    parent.normalize();
    if (sec) {
      var d = load();
      var k = chapKey(chapTitle(sec));
      if (d.hl && d.hl[k]) {
        var i = d.hl[k].findIndex(function (h) { return h.t === txt; });
        if (i >= 0) d.hl[k].splice(i, 1);
        if (!d.hl[k].length) delete d.hl[k];
        save(d);
      }
    }
  }
  /* ré-applique les surlignages mémorisés (au chargement d'un chapitre) */
  function reapplyHighlights() {
    var d = load(); if (!d.hl) return;
    chapters().forEach(function (sec) {
      var k = chapKey(chapTitle(sec));
      var list = d.hl[k]; if (!list || !list.length) return;
      list.forEach(function (h) { wrapTextOnce(sec, h.t, h.c); });
    });
  }
  function wrapTextOnce(root, text, color) {
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        if (!n.nodeValue || n.nodeValue.indexOf(text) < 0) return NodeFilter.FILTER_REJECT;
        if (n.parentNode && n.parentNode.closest && n.parentNode.closest('mark.gr2-hl')) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var node = walker.nextNode();
    if (!node) return false;
    var idx = node.nodeValue.indexOf(text);
    var range = document.createRange();
    range.setStart(node, idx);
    range.setEnd(node, idx + text.length);
    return !!wrapRange(range, color);
  }

  /* Mode lecture sans distraction */
  function toggleReadingFocus() {
    var on = !document.body.classList.contains('gr2-reading-focus');
    document.body.classList.toggle('gr2-reading-focus', on);
    var btn = document.getElementById('gr2-focus-btn');
    if (btn) btn.classList.toggle('on', on);
    var exit = document.getElementById('gr2-focus-exit');
    if (!exit && on) {
      exit = el('button', '', '✕ Quitter le mode lecture');
      exit.id = 'gr2-focus-exit';
      exit.addEventListener('click', toggleReadingFocus);
      document.body.appendChild(exit);
    }
    if (exit) exit.style.display = on ? 'block' : 'none';
    if (on) window.scrollTo({ top: synthRoot().offsetTop - 20, behavior: 'smooth' });
  }

  /* ============================================================
     BARRE D'OUTILS « ÉTUDE » (en haut de la synthèse)
     ============================================================ */
  function buildStudyBar() {
    var root = synthRoot(); if (!root) return;
    if (root.querySelector('.gr2-study-bar')) return;
    var bar = el('div', 'gr2-study-bar');
    var palette = HL_COLORS.map(function (c) {
      return '<button class="gr2-sw gr2-hl-' + c + '" data-c="' + c + '" title="Surligner en ' +
        ({ yellow: 'jaune', green: 'vert', pink: 'rose', blue: 'bleu' })[c] + '"></button>';
    }).join('');
    bar.innerHTML =
      '<button class="gr2-tool" id="gr2-toc-btn">📑 Sommaire</button>' +
      '<span class="gr2-pill" id="gr2-progress-pill"></span>' +
      '<span class="gr2-spacer"></span>' +
      '<button class="gr2-tool" id="gr2-course-btn">🎬 Mode cours</button>' +
      '<button class="gr2-tool" id="gr2-focus-btn">📖 Lecture</button>' +
      '<button class="gr2-tool" id="gr2-hl-btn">🖍️ Surligner</button>' +
      '<span class="gr2-hl-palette" id="gr2-hl-palette" style="display:none;">' + palette + '</span>';
    // insérer tout en haut de la synthèse
    root.insertBefore(bar, root.firstChild);

    bar.querySelector('#gr2-toc-btn').addEventListener('click', openToc);
    bar.querySelector('#gr2-focus-btn').addEventListener('click', toggleReadingFocus);
    bar.querySelector('#gr2-course-btn').addEventListener('click', function () { window.GR2Course && window.GR2Course.open(); });
    bar.querySelector('#gr2-hl-btn').addEventListener('click', function () { setHlActive(!hlOn); });
    bar.querySelectorAll('.gr2-sw').forEach(function (sw) {
      sw.addEventListener('click', function () {
        hlColor = sw.dataset.c;
        bar.querySelectorAll('.gr2-sw').forEach(function (s) { s.classList.toggle('on', s === sw); });
        if (!hlOn) setHlActive(true);
      });
    });
    bar.querySelector('.gr2-sw').classList.add('on');
  }

  /* ============================================================
     POINT D'ENTRÉE : appelé par showSection() à chaque affichage
     ============================================================ */
  var lastBuiltFor = null;
  function onShowStudySection(sectionId) {
    ensureProgressBar();
    updateProgressBar();
    if (sectionId !== 'synthese') return;
    var root = synthRoot(); if (!root) return;
    var key = subj();
    // contenu pas encore injecté (course/chapitres absents) → on réessaiera au prochain passage
    if (!chapters().length) return;
    // #synthese est remplacé (outerHTML) à chaque changement de matière → rebâtir
    if (root.dataset.gr2Ready !== key) {
      root.dataset.gr2Ready = key;
      buildStudyBar();
      injectChapControls();
      reapplyHighlights();
      lastBuiltFor = key;
    }
    refreshOverall();
    setTimeout(updateProgressBar, 60);
  }
  window.onShowStudySection = onShowStudySection;

  /* écouteurs globaux */
  window.addEventListener('scroll', updateProgressBar, { passive: true });
  document.addEventListener('mouseup', onMouseUpHighlight);
  document.addEventListener('touchend', onMouseUpHighlight);
  document.addEventListener('click', onClickRemoveHl, true);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeToc();
      if (document.body.classList.contains('gr2-reading-focus')) toggleReadingFocus();
    }
  });

  // Au tout premier chargement, la synthèse est déjà visible par défaut.
  document.addEventListener('DOMContentLoaded', function () {
    setTimeout(function () { onShowStudySection('synthese'); }, 400);
  });

  /* exposer quelques utilitaires pour le mode cours (2ᵉ partie du fichier) */
  window.GR2Study = {
    chapters: chapters,
    chapTitle: chapTitle,
    norm: norm,
    el: el,
    setChapStatus: setChapStatus,
    subj: subj
  };
})();

/* ============================================================
   4. MODE COURS ANIMÉ  (window.GR2Course)
   --------------------------------------------------------------
   Transforme la synthèse en un « cours animé » plein écran :
   scènes successives, contenu révélé étape par étape (GSAP),
   narration vocale optionnelle. Réutilise UNIQUEMENT le contenu
   déjà rendu de #synthese → aucun contenu inventé.
   ============================================================ */
(function () {
  'use strict';
  var S = window.GR2Study;
  if (!S) return;

  var overlay = null, stage = null;
  var scenes = [], si = 0, steps = [], ki = -1;
  var playing = false, narration = true;
  var autoTimer = null;

  function gsapReveal(node) {
    node.style.visibility = 'visible';
    if (window.gsap) {
      window.gsap.fromTo(node, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });
    } else {
      node.classList.add('gr2-step-in');
    }
  }

  /* ---- découpage de la synthèse en scènes ---- */
  function buildScenes() {
    scenes = [];
    S.chapters().forEach(function (sec) {
      var title = S.chapTitle(sec);
      var hasCards = !!sec.querySelector('.card');
      // scène d'intro = tout ce qui n'est ni titre, ni contrôle, ni grille de cartes
      var intro = document.createElement('div');
      Array.prototype.forEach.call(sec.children, function (ch) {
        if (ch.tagName === 'H2') return;
        if (ch.classList && ch.classList.contains('gr2-chap-ctrl')) return;
        if (ch.classList && ch.classList.contains('card')) return;
        if (ch.querySelector && ch.querySelector('.card')) return;
        intro.appendChild(ch.cloneNode(true));
      });
      if (S.norm(intro.textContent) || intro.querySelector('svg, img')) {
        // matières sans cartes : le titre du chapitre suffit (affiché dans la barre du haut)
        scenes.push({ title: title, sub: hasCards ? 'Introduction' : '', html: intro.innerHTML, sec: sec });
      }
      Array.prototype.forEach.call(sec.querySelectorAll('.card'), function (card) {
        var h3 = card.querySelector('h3');
        scenes.push({ title: title, sub: h3 ? S.norm(h3.textContent) : '', html: card.innerHTML, sec: sec });
      });
      // chapitre sans carte ni intro : on prend tout le bloc
      if (!sec.querySelector('.card') && !S.norm(intro.textContent)) {
        scenes.push({ title: title, sub: '', html: sec.innerHTML, sec: sec });
      }
    });
    return scenes;
  }

  /* ---- construction de l'overlay (une seule fois) ---- */
  function ensureOverlay() {
    if (overlay) return;
    overlay = S.el('div', 'gr2-course');
    overlay.innerHTML =
      '<div class="gr2-course-top">' +
        '<div class="gr2-course-chap" id="gr2c-chap"></div>' +
        '<button class="gr2-course-x" id="gr2c-close" aria-label="Fermer le mode cours">✕</button>' +
      '</div>' +
      '<div class="gr2-course-progress"><i id="gr2c-bar"></i></div>' +
      '<div class="gr2-course-body"><div class="gr2-course-stage" id="gr2c-stage"></div></div>' +
      '<div class="gr2-course-foot">' +
        '<button class="gr2c-btn" id="gr2c-prev" aria-label="Scène précédente">◀</button>' +
        '<button class="gr2c-btn gr2c-play" id="gr2c-play" aria-label="Lecture automatique">▶ Lecture</button>' +
        '<button class="gr2c-btn" id="gr2c-next" aria-label="Étape suivante">Suivant ▶</button>' +
        '<span class="gr2c-count" id="gr2c-count"></span>' +
        '<span class="gr2c-spacer"></span>' +
        '<button class="gr2c-btn" id="gr2c-voice" aria-pressed="true">🔊 Voix</button>' +
        '<button class="gr2c-btn gr2c-ok" id="gr2c-ok">✅ Chapitre compris</button>' +
      '</div>';
    document.body.appendChild(overlay);
    stage = overlay.querySelector('#gr2c-stage');

    overlay.querySelector('#gr2c-close').addEventListener('click', close);
    overlay.querySelector('#gr2c-prev').addEventListener('click', function () { stopAuto(); prevScene(); });
    overlay.querySelector('#gr2c-next').addEventListener('click', function () { stopAuto(); advanceStep(); });
    overlay.querySelector('#gr2c-play').addEventListener('click', togglePlay);
    overlay.querySelector('#gr2c-voice').addEventListener('click', toggleVoice);
    overlay.querySelector('#gr2c-ok').addEventListener('click', function () {
      var sc = scenes[si]; if (sc) S.setChapStatus(sc.title, 'ok');
      var b = overlay.querySelector('#gr2c-ok'); b.textContent = '✅ Marqué !';
      setTimeout(function () { b.textContent = '✅ Chapitre compris'; }, 1500);
    });
  }

  function open() {
    ensureOverlay();
    buildScenes();
    if (!scenes.length) { alert('Aucun contenu à présenter ici.'); return; }
    si = 0;
    document.body.classList.add('gr2-course-on');
    overlay.classList.add('open');
    showScene(0);
  }
  function close() {
    stopAuto();
    stopSpeak();
    if (overlay) overlay.classList.remove('open');
    document.body.classList.remove('gr2-course-on');
  }

  /* ---- affichage d'une scène ---- */
  function showScene(i) {
    si = Math.max(0, Math.min(scenes.length - 1, i));
    var sc = scenes[si];
    overlay.querySelector('#gr2c-chap').textContent = sc.title;
    overlay.querySelector('#gr2c-count').textContent = 'Scène ' + (si + 1) + ' / ' + scenes.length;
    overlay.querySelector('#gr2c-bar').style.width = ((si + 1) / scenes.length * 100) + '%';

    stage.innerHTML = '';
    var head = S.el('div', 'gr2c-scene-head', (sc.sub ? '<h3>' + escape2(sc.sub) + '</h3>' : ''));
    var content = S.el('div', 'gr2c-scene-content');
    content.innerHTML = sc.html;
    stage.appendChild(head);
    stage.appendChild(content);

    // étapes = enfants directs du contenu (titre, formule, points, explication…)
    steps = Array.prototype.filter.call(content.children, function (n) {
      return S.norm(n.textContent) || n.querySelector('svg, img');
    });
    steps.forEach(function (n) { n.style.visibility = 'hidden'; });
    ki = -1;

    if (typeof safeMathJax === 'function') { try { safeMathJax([stage]); } catch (e) {} }
    // révéler la 1re étape
    advanceStep();
  }

  function advanceStep() {
    if (ki < steps.length - 1) {
      ki++;
      var node = steps[ki];
      gsapReveal(node);
      node.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      speak(node, onStepSpoken);
    } else {
      // scène terminée → suivante (ou fin si auto)
      if (si < scenes.length - 1) {
        nextScene();
      } else if (playing) {
        stopAuto();
      }
    }
  }
  function onStepSpoken() {
    if (!playing) return;
    autoTimer = setTimeout(advanceStep, 350);
  }
  function nextScene() { if (si < scenes.length - 1) showScene(si + 1); }
  function prevScene() { if (si > 0) showScene(si - 1); }

  /* ---- lecture automatique ---- */
  function togglePlay() {
    if (playing) { stopAuto(); }
    else {
      playing = true;
      overlay.querySelector('#gr2c-play').classList.add('on');
      overlay.querySelector('#gr2c-play').innerHTML = '⏸ Pause';
      // relance la lecture de l'étape courante puis enchaîne
      if (ki >= 0 && steps[ki]) speak(steps[ki], onStepSpoken);
      else advanceStep();
    }
  }
  function stopAuto() {
    playing = false;
    if (autoTimer) { clearTimeout(autoTimer); autoTimer = null; }
    stopSpeak();
    if (overlay) {
      var b = overlay.querySelector('#gr2c-play');
      b.classList.remove('on'); b.innerHTML = '▶ Lecture';
    }
  }

  /* ---- narration vocale ---- */
  function toggleVoice() {
    narration = !narration;
    var b = overlay.querySelector('#gr2c-voice');
    b.setAttribute('aria-pressed', narration ? 'true' : 'false');
    b.style.opacity = narration ? '1' : '0.5';
    if (!narration) stopSpeak();
  }
  function stopSpeak() { try { if (window.speechSynthesis) window.speechSynthesis.cancel(); } catch (e) {} }
  function speak(node, onEnd) {
    stopSpeak();
    var clone = node.cloneNode(true);
    // ne pas lire les formules / SVG / boutons
    Array.prototype.forEach.call(clone.querySelectorAll('.formula-main, mjx-container, svg, button, .simple-exp-toggle'), function (n) { n.remove(); });
    var txt = S.norm(clone.textContent);
    // délai de lecture estimé quand la voix est coupée (≈ vitesse de lecture humaine)
    function readDelay() {
      var words = txt ? txt.split(/\s+/).length : 0;
      return Math.min(9000, Math.max(1600, words * 320));
    }
    if (!narration || !window.speechSynthesis) {
      if (onEnd && playing) { autoTimer = setTimeout(onEnd, txt ? readDelay() : 600); }
      return;
    }
    if (!txt) { if (onEnd && playing) autoTimer = setTimeout(onEnd, 500); return; }
    var u = new SpeechSynthesisUtterance(txt);
    u.lang = 'fr-FR'; u.rate = 1.0; u.pitch = 1.0;
    u.onend = function () { if (onEnd) onEnd(); };
    try { window.speechSynthesis.speak(u); } catch (e) { if (onEnd && playing) onEnd(); }
  }

  function escape2(s) { return (s || '').replace(/[&<>"]/g, function (c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]; }); }

  /* clavier */
  document.addEventListener('keydown', function (e) {
    if (!overlay || !overlay.classList.contains('open')) return;
    if (e.key === 'Escape') { close(); }
    else if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); stopAuto(); advanceStep(); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); stopAuto(); prevScene(); }
  });

  window.GR2Course = { open: open, close: close };
})();
