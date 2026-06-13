/* GR2 Study — gestion multi-matières
   Le moteur (quiz, flashcards, stats, XP…) est partagé. Chaque matière fournit son
   propre contenu (sections HTML + questions + flashcards + chapitres). On bascule en
   « repointant » les données globales et en réinjectant les 5 sections de contenu.
   Une matière sans contenu affiche un écran « en préparation ». */
(function () {
  'use strict';

  window.SUBJECTS = {
    maths:    { label: 'Maths',        icon: '📐', subtitle: 'Maths — Géométrie analytique plane · Vecteurs · Cercle · Droites', ready: true,  mathTools: true },
    francais: { label: 'Français',     icon: '✍️', subtitle: 'Français — grammaire, conjugaison, littérature', ready: false, mathTools: false },
    anglais:  { label: 'Anglais',      icon: '🇬🇧', subtitle: 'Anglais — vocabulaire, grammaire, temps', ready: false, mathTools: false },
    histoire: { label: 'Histoire',     icon: '🏛️', subtitle: 'Histoire — repères, événements, sources', ready: false, mathTools: false },
    geo:      { label: 'Géo',          icon: '🗺️', subtitle: 'Géographie — la Belgique, biocarburants', ready: false, mathTools: false },
    chimie:   { label: 'Chimie',       icon: '🧪', subtitle: 'Chimie — réactions, pondération, mole & gaz', ready: false, mathTools: false },
    bio:      { label: 'Bio',          icon: '🧬', subtitle: 'Biologie — le vivant, cellules, systèmes', ready: false, mathTools: false },
    eco:      { label: 'Sciences éco', icon: '💶', subtitle: 'Sciences éco (4ᵉ) — mondialisation & responsabilité civile', ready: false, mathTools: false },
    neerlandais: { label: 'Néerlandais', icon: '🇳🇱', subtitle: 'Néerlandais (4N2) — grammaire, De woning & Aan tafel!', ready: false, mathTools: false }
  };

  window.currentSubject = 'maths';
  var loaded = 'maths';            // matière dont le contenu est actuellement dans le DOM
  var mathsSnapshot = null;        // sauvegarde du contenu maths (capturée au 1er init)
  var SECTION_IDS = ['synthese', 'formules', 'methodes', 'exercices', 'erreurs'];

  // Permet à un fichier de contenu (ex. subject-chimie.js) de s'enregistrer.
  window.registerSubject = function (key, def) {
    if (!window.SUBJECTS[key]) window.SUBJECTS[key] = { label: key, icon: '📘', mathTools: false };
    Object.assign(window.SUBJECTS[key], def);
    window.SUBJECTS[key].ready = true;
  };

  function snapshotMaths() {
    if (mathsSnapshot) return;
    mathsSnapshot = {
      questions:  (typeof allQuestions !== 'undefined') ? allQuestions : [],
      flashcards: (typeof flashcards !== 'undefined') ? flashcards : [],
      demos:      (typeof DEMOS !== 'undefined') ? DEMOS : {},
      sections:   (typeof SECTIONS_CONTENT !== 'undefined') ? SECTIONS_CONTENT : {},
      chapOrder:  (typeof CHAP_ORDER !== 'undefined') ? CHAP_ORDER : [],
      chapLabels: (typeof CHAP_LABELS !== 'undefined') ? CHAP_LABELS : {}
    };
    window.SUBJECTS.maths.content = mathsSnapshot;
  }

  function injectSections(sections) {
    SECTION_IDS.forEach(function (id) {
      if (sections[id] == null) return;
      var el = document.getElementById(id);
      if (el) el.outerHTML = sections[id];
    });
  }

  // Met à jour le titre + l'intro de l'écran Quiz selon la matière active
  function updateQuizHeader(key) {
    var t = document.getElementById('quiz-title');
    var p = document.getElementById('quiz-subtitle');
    var s = window.SUBJECTS[key] || {};
    if (t) t.textContent = 'Quiz — ' + (key === 'maths' ? 'Maths GR2' : (s.label || ''));
    if (p) {
      var order = (typeof CHAP_ORDER !== 'undefined') ? CHAP_ORDER : [];
      var labels = (typeof CHAP_LABELS !== 'undefined') ? CHAP_LABELS : {};
      var names = order.map(function (c) { return (labels[c] || c); });
      p.textContent = names.length ? ('Teste tes connaissances : ' + names.join(' · ') + '.') : 'Teste tes connaissances.';
    }
  }

  function rebuildChapterFilter() {
    var sel = document.getElementById('chapter-filter');
    if (!sel) return;
    var order = (typeof CHAP_ORDER !== 'undefined') ? CHAP_ORDER : [];
    var labels = (typeof CHAP_LABELS !== 'undefined') ? CHAP_LABELS : {};
    var html = '<option value="all">Tous les chapitres</option>';
    order.forEach(function (c) { html += '<option value="' + c + '">' + (labels[c] || c) + '</option>'; });
    sel.innerHTML = html;
  }

  // Personnalisation des onglets par matière : renommer + ajouter des onglets bonus.
  var NAV_DEFAULTS = null;
  function applyNav(content) {
    if (!NAV_DEFAULTS) {
      NAV_DEFAULTS = {};
      Array.prototype.forEach.call(document.querySelectorAll('.nav-btn[data-sec]'), function (b) {
        NAV_DEFAULTS[b.getAttribute('data-sec')] = b.innerHTML;
      });
    }
    var labels = (content && content.navLabels) || {};
    Array.prototype.forEach.call(document.querySelectorAll('.nav-btn[data-sec]'), function (b) {
      var id = b.getAttribute('data-sec');
      b.innerHTML = labels[id] || NAV_DEFAULTS[id];
    });
    // onglets bonus (max 2) : #nav-extra1/#extra1 et #nav-extra2/#extra2
    var extras = (content && content.extraTabs) || [];
    for (var i = 1; i <= 2; i++) {
      var btn = document.getElementById('nav-extra' + i);
      var sec = document.getElementById('extra' + i);
      var def = extras[i - 1];
      if (btn && sec && def) {
        btn.innerHTML = def.label;
        btn.style.display = '';
        sec.innerHTML = def.html;
      } else {
        if (btn) btn.style.display = 'none';
        if (sec) sec.innerHTML = '';
      }
    }
  }

  function applyContent(c) {
    if (!c) return;
    if (c.questions)  allQuestions = c.questions;
    if (c.flashcards) {
      flashcards = c.flashcards;
      // + les flashcards créées par l'élève dans 🎨 Mes créations (creations.js)
      try {
        if (typeof window.customCardsFor === 'function') flashcards = flashcards.concat(window.customCardsFor(window.currentSubject));
      } catch (_) {}
    }
    if (c.demos)      DEMOS = c.demos;
    if (c.chapOrder)  CHAP_ORDER = c.chapOrder;
    if (c.chapLabels) CHAP_LABELS = c.chapLabels;
    if (c.sections)   injectSections(c.sections);
  }

  function resetEngine() {
    try { if (typeof filterQuiz === 'function') filterQuiz(); } catch (_) {}
    try { if (typeof rebuildFlashcardFilters === 'function') { filteredFlashcards = null; rebuildFlashcardFilters(); } } catch (_) {}
    try { if (typeof buildFlashcardQueue === 'function') buildFlashcardQueue(); } catch (_) {}
    try { if (typeof loadFlashcard === 'function') loadFlashcard(); } catch (_) {}
    try { if (typeof genInit === 'function') genInit(); } catch (_) {}
    try { if (typeof window.mountAnswerSheets === 'function') window.mountAnswerSheets(); } catch (_) {}
    try { if (typeof renderChapterStats === 'function') renderChapterStats(); } catch (_) {}
    try { if (typeof updateBestScoreDisplay === 'function') updateBestScoreDisplay(); } catch (_) {}
  }

  function showPrep(key) {
    var s = window.SUBJECTS[key];
    var prep = document.getElementById('subject-prep');
    if (!prep || !s) return;
    var em = document.getElementById('prep-emoji'); if (em) em.textContent = s.icon;
    var ti = document.getElementById('prep-title'); if (ti) ti.textContent = s.label + ' — en préparation';
    var sub = document.getElementById('app-subtitle'); if (sub) sub.textContent = s.subtitle;
    var val = document.getElementById('app-validated'); if (val) val.style.display = 'none';
    document.body.classList.add('subject-locked');
    prep.style.display = 'flex';
  }
  function hidePrep() {
    var prep = document.getElementById('subject-prep');
    if (prep) prep.style.display = 'none';
    document.body.classList.remove('subject-locked');
  }

  window.setSubject = function (key) {
    var s = window.SUBJECTS[key];
    if (!s) return;
    Array.prototype.forEach.call(document.querySelectorAll('.subj-btn'), function (b) {
      var on = b.dataset.subj === key;
      b.classList.toggle('on', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });

    // matière sans contenu → écran « en préparation »
    if (!s.ready) { showPrep(key); return; }

    window.currentSubject = key;
    try { localStorage.setItem('gr2_subject', key); } catch (_) {}
    hidePrep();

    // en-tête (sous-titre + badge « validé par le prof » réservé aux maths)
    var sub = document.getElementById('app-subtitle'); if (sub) sub.textContent = s.subtitle;
    var val = document.getElementById('app-validated'); if (val) val.style.display = (key === 'maths') ? '' : 'none';
    // outils 100% maths (graphiques) masqués hors maths
    Array.prototype.forEach.call(document.querySelectorAll('[data-math-only]'), function (el) {
      el.style.display = s.mathTools ? '' : 'none';
    });

    // recharger le contenu seulement si la matière change (le DOM contient déjà le contenu chargé)
    var content = (key === 'maths') ? mathsSnapshot : s.content;
    if (key !== loaded) {
      applyContent(content);
      applyNav(content);
      loaded = key;
      rebuildChapterFilter();
      try { if (typeof showSection === 'function') showSection('synthese'); } catch (_) {}
      resetEngine();
      try { if (window.MathJax && MathJax.typesetPromise) MathJax.typesetPromise([document.body]); } catch (_) {}
      try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch (_) {}
    } else {
      applyNav(content);
    }
    updateQuizHeader(key);
    try { if (typeof applySubjectAccent === 'function') applySubjectAccent(); } catch (_) {}
    // Reconstruit les éléments dépendant de la matière même au tout premier chargement
    // (resetEngine n'est appelé que lors d'un changement de matière).
    try { if (typeof rebuildFlashcardFilters === 'function') rebuildFlashcardFilters(); } catch (_) {}
    try { if (typeof rebuildExoThemes === 'function') rebuildExoThemes(); } catch (_) {}
    try { if (typeof renderCustomExoList === 'function') renderCustomExoList(); } catch (_) {}
    try { if (typeof window.creRefreshLists === 'function') window.creRefreshLists(); } catch (_) {}
  };

  function init() {
    snapshotMaths();
    var saved = 'maths';
    try { saved = localStorage.getItem('gr2_subject') || 'maths'; } catch (_) {}
    if (!window.SUBJECTS[saved] || !window.SUBJECTS[saved].ready) saved = 'maths';
    window.setSubject(saved);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { setTimeout(init, 400); });
  } else {
    setTimeout(init, 400);
  }
})();
