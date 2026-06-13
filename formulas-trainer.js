/* ══════════════════════════════════════════════════════════════════════════
   ✍️ FORMULES PAR CŒUR — entraîneur de mémorisation des formules par écrit
   ──────────────────────────────────────────────────────────────────────────
   L'élève encode SES propres formules (nom → formule, via l'éditeur ƒ𝑥),
   puis s'entraîne à les réécrire de mémoire. L'app corrige avec une
   comparaison tolérante (espaces / \dfrac vs \frac / \left\right…) ; quand
   elle n'est pas certaine, elle révèle la bonne formule et demande une
   auto-évaluation (façon Anki). 100 % le contenu de l'élève — rien d'inventé.

   Dépendances (toutes globales, déjà présentes) :
     loadSavedData / saveData / showToast / safeMathJax / escapeHtmlExo
     curSubject / window.SUBJECTS / CHAP_ORDER / CHAP_LABELS
     openFormulaComposer / creFxPreview   (creations.js)
   Données : data.formulaBank = [ {id, subject, name, latex, chapter, created,
                                   stats:{seen,correct,streak,best}} ]
   ══════════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var SCREENS = ['home', 'bank', 'setup', 'pick', 'train', 'done'];
  var RANDOM_COUNT = 10;          // nb de formules tirées en mode « piocher »
  var MASTERED_STREAK = 2;        // série de bonnes réponses pour « maîtrisée »

  // état de la session d'entraînement en cours
  var _queue = [];                // formules de la session (objets {id,name,latex,chapter})
  var _idx = 0;
  var _results = [];              // {id, name, result:'good'|'bad'|'dunno'}
  var _graded = false;            // la carte courante a-t-elle été notée ?
  var _editId = null;            // id de la formule en cours de modification (banque)

  function el(id) { return document.getElementById(id); }
  function data() { return (typeof loadSavedData === 'function') ? loadSavedData() : {}; }
  function toast(m, c) { if (typeof showToast === 'function') showToast(m, c); }
  function esc(s) { return (typeof escapeHtmlExo === 'function') ? escapeHtmlExo(String(s)) : String(s); }
  function render(node) { if (node && typeof safeMathJax === 'function') safeMathJax([node]); }

  function subjInfo() {
    var k = (typeof curSubject === 'function') ? curSubject() : 'maths';
    var s = (window.SUBJECTS && window.SUBJECTS[k]) || {};
    return { key: k, label: s.label || k, icon: s.icon || '📘' };
  }

  /* ---- banque (filtrée sur la matière active) ---- */
  function allBank() { var d = data(); return Array.isArray(d.formulaBank) ? d.formulaBank : []; }
  function bank() {
    var k = subjInfo().key;
    return allBank().filter(function (f) { return (f.subject || 'maths') === k; });
  }
  function byId(id) {
    id = Number(id);
    var list = allBank();
    for (var i = 0; i < list.length; i++) if (Number(list[i].id) === id) return list[i];
    return null;
  }

  /* ---- LaTeX : nettoyage + normalisation tolérante ---- */
  // Retire les délimiteurs \( \) \[ \] $ et garde le TeX brut.
  function rawTex(v) {
    if (!v) return '';
    return String(v)
      .replace(/\\\(|\\\)|\\\[|\\\]/g, '')
      .replace(/\$/g, '')
      .trim();
  }
  // Normalise pour comparer : on ignore ce qui ne change pas le sens mathématique.
  function norm(t) {
    if (!t) return '';
    t = rawTex(t);
    t = t.replace(/\\dfrac|\\tfrac/g, '\\frac');           // fractions équivalentes
    t = t.replace(/\\left|\\right/g, '');                  // tailles auto de parenthèses
    t = t.replace(/\\,|\\;|\\:|\\!|\\ |~|\\quad|\\qquad/g, ''); // espacements
    t = t.replace(/\\cdot|\\times|\\ast/g, '*');           // multiplications
    t = t.replace(/\s+/g, '');                             // tous les espaces
    // accolades inutiles autour d'un seul caractère : {a} -> a  (plusieurs passes)
    for (var i = 0; i < 4; i++) t = t.replace(/\{([A-Za-z0-9])\}/g, '$1');
    return t;
  }
  function sameFormula(a, b) {
    var na = norm(a), nb = norm(b);
    return na.length > 0 && na === nb;
  }

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  /* ---- chapitres de la matière (pour le menu déroulant) ---- */
  function fillChapters() {
    var sel = el('ft-chapter'); if (!sel) return;
    var order = (typeof CHAP_ORDER !== 'undefined' && CHAP_ORDER) ? CHAP_ORDER : [];
    var labels = (typeof CHAP_LABELS !== 'undefined' && CHAP_LABELS) ? CHAP_LABELS : {};
    var html = '<option value="">— Aucun —</option>';
    order.forEach(function (ch) { html += '<option value="' + esc(ch) + '">' + esc(labels[ch] || ch) + '</option>'; });
    sel.innerHTML = html;
  }
  function chapLabel(ch) {
    if (!ch) return '';
    var labels = (typeof CHAP_LABELS !== 'undefined' && CHAP_LABELS) ? CHAP_LABELS : {};
    return labels[ch] || ch;
  }

  /* ════════════════ NAVIGATION ENTRE ÉCRANS ════════════════ */
  function show(name) {
    SCREENS.forEach(function (s) { var n = el('ft-' + s); if (n) n.style.display = (s === name) ? '' : 'none'; });
    if (name === 'pick') renderPickList();
    try { window.scrollTo(0, 0); } catch (e) {}
  }
  window.ftShow = show;

  /* ════════════════ INITIALISATION (appelée par showSection) ════════════════ */
  window.ftInit = function () {
    fillChapters();
    _editId = null;
    cancelEditUI();
    renderStats();
    renderList();
    show('home');
  };

  function renderStats() {
    var box = el('ft-stats'); if (!box) return;
    var info = subjInfo(), list = bank();
    var mastered = list.filter(function (f) { return f.stats && f.stats.streak >= MASTERED_STREAK; }).length;
    box.innerHTML =
      '<span class="ft-chip">' + info.icon + ' ' + esc(info.label) + '</span>' +
      '<span class="ft-chip">📚 ' + list.length + ' formule' + (list.length > 1 ? 's' : '') + '</span>' +
      '<span class="ft-chip ft-chip-ok">🏆 ' + mastered + ' maîtrisée' + (mastered > 1 ? 's' : '') + '</span>';
  }

  /* ════════════════ BANQUE : LISTE + CRUD ════════════════ */
  function renderList() {
    var box = el('ft-list'); if (!box) return;
    var list = bank(), cnt = el('ft-count');
    if (cnt) cnt.textContent = list.length ? String(list.length) : '';
    if (!list.length) {
      box.innerHTML = '<div class="ft-empty">📭 Aucune formule pour <b>' + esc(subjInfo().label) +
        '</b> pour l\'instant.<br>Ajoute ta première formule ci-dessus avec le bouton <b>ƒ𝑥</b> 👆</div>';
      return;
    }
    box.innerHTML = list.map(function (f) {
      var st = f.stats || {};
      var badge = st.streak >= MASTERED_STREAK ? '<span class="ft-mini-ok" title="Maîtrisée">🏆</span>'
        : (st.seen ? '<span class="ft-mini" title="Vue ' + st.seen + ' fois">' + (st.correct || 0) + '/' + st.seen + '</span>' : '');
      var chap = f.chapter ? '<span class="ft-chaptag-mini">' + esc(chapLabel(f.chapter)) + '</span>' : '';
      return '<div class="ft-item" data-id="' + Number(f.id) + '">' +
               '<div class="ft-item-main">' +
                 '<div class="ft-item-name">' + esc(f.name) + ' ' + badge + '</div>' +
                 '<div class="ft-item-fx">\\(' + esc(rawTex(f.latex)) + '\\)</div>' +
                 chap +
               '</div>' +
               '<div class="ft-item-acts">' +
                 '<button type="button" class="ft-ic" onclick="ftEditFormula(' + Number(f.id) + ')" title="Modifier">✏️</button>' +
                 '<button type="button" class="ft-ic" onclick="ftDeleteFormula(' + Number(f.id) + ')" title="Supprimer">🗑️</button>' +
               '</div>' +
             '</div>';
    }).join('');
    render(box);
  }

  function cancelEditUI() {
    var t = el('ft-form-title'), c = el('ft-cancel-btn'), s = el('ft-save-btn');
    if (t) t.textContent = '➕ Nouvelle formule';
    if (c) c.style.display = 'none';
    if (s) s.textContent = '💾 Enregistrer';
  }

  window.ftSaveFormula = function () {
    var nameEl = el('ft-name'), fxEl = el('ft-formula'), chEl = el('ft-chapter');
    var name = (nameEl && nameEl.value || '').trim();
    var latex = rawTex(fxEl && fxEl.value || '');
    var chapter = (chEl && chEl.value) || '';
    if (!name) { toast('⚠️ Donne un nom à ta formule', '#f87171'); if (nameEl) nameEl.focus(); return; }
    if (!latex) { toast('⚠️ Construis la formule avec le bouton ƒ𝑥', '#f87171'); return; }

    var d = data();
    d.formulaBank = Array.isArray(d.formulaBank) ? d.formulaBank : [];
    if (_editId != null) {
      var f = null;
      for (var i = 0; i < d.formulaBank.length; i++) if (Number(d.formulaBank[i].id) === Number(_editId)) { f = d.formulaBank[i]; break; }
      if (f) { f.name = name; f.latex = latex; f.chapter = chapter; }
      _editId = null;
      toast('✅ Formule modifiée');
    } else {
      d.formulaBank.unshift({
        id: Date.now() + Math.floor(Math.random() * 1000),
        subject: subjInfo().key,
        name: name, latex: latex, chapter: chapter,
        created: new Date().toISOString(),
        stats: { seen: 0, correct: 0, streak: 0, best: 0 }
      });
      toast('✅ Formule ajoutée à ta banque');
    }
    if (typeof saveData === 'function') saveData(d);
    // reset formulaire
    if (nameEl) nameEl.value = '';
    if (fxEl) fxEl.value = '';
    var prev = el('ft-formula-prev'); if (prev) { prev.style.display = 'none'; prev.innerHTML = ''; }
    cancelEditUI();
    renderStats(); renderList();
    if (nameEl) nameEl.focus();
  };

  window.ftEditFormula = function (id) {
    var f = byId(id); if (!f) return;
    _editId = Number(id);
    var nameEl = el('ft-name'), fxEl = el('ft-formula'), chEl = el('ft-chapter');
    if (nameEl) nameEl.value = f.name || '';
    if (fxEl) fxEl.value = f.latex ? ('\\(' + rawTex(f.latex) + '\\)') : '';
    if (chEl) chEl.value = f.chapter || '';
    if (typeof creFxPreview === 'function') creFxPreview('ft-formula', 'ft-formula-prev');
    var t = el('ft-form-title'), c = el('ft-cancel-btn'), s = el('ft-save-btn');
    if (t) t.textContent = '✏️ Modifier la formule';
    if (c) c.style.display = '';
    if (s) s.textContent = '💾 Enregistrer les modifs';
    show('bank');
    try { el('ft-bank').scrollIntoView({ behavior: 'smooth', block: 'start' }); } catch (e) {}
    if (nameEl) nameEl.focus();
  };

  window.ftCancelEdit = function () {
    _editId = null;
    var nameEl = el('ft-name'), fxEl = el('ft-formula'), chEl = el('ft-chapter');
    if (nameEl) nameEl.value = '';
    if (fxEl) fxEl.value = '';
    if (chEl) chEl.value = '';
    var prev = el('ft-formula-prev'); if (prev) { prev.style.display = 'none'; prev.innerHTML = ''; }
    cancelEditUI();
  };

  window.ftDeleteFormula = function (id) {
    var f = byId(id); if (!f) return;
    if (!confirm('Supprimer la formule « ' + (f.name || '') + ' » ?')) return;
    var d = data();
    d.formulaBank = (d.formulaBank || []).filter(function (x) { return Number(x.id) !== Number(id); });
    if (typeof saveData === 'function') saveData(d);
    if (Number(_editId) === Number(id)) window.ftCancelEdit();
    toast('🗑️ Formule supprimée');
    renderStats(); renderList();
  };

  /* ════════════════ ENTRAÎNEMENT : CHOIX DU MODE ════════════════ */
  window.ftStartSetup = function () {
    if (!bank().length) { toast('Ajoute d\'abord des formules 🙂', '#fbbf24'); show('bank'); return; }
    show('setup');
  };

  window.ftStartAll = function () { beginSession(bank()); };

  window.ftStartRandom = function () {
    var list = bank();
    beginSession(shuffle(list).slice(0, Math.min(RANDOM_COUNT, list.length)));
  };

  // écran « choisir » : liste à cocher
  function renderPickList() {
    var box = el('ft-picklist'); if (!box) return;
    var list = bank();
    if (!list.length) { box.innerHTML = '<div class="ft-empty">Aucune formule à choisir.</div>'; return; }
    box.innerHTML = list.map(function (f) {
      return '<label class="ft-pick-item">' +
               '<input type="checkbox" class="ft-pick-cb" value="' + Number(f.id) + '" checked>' +
               '<span class="ft-pick-name">' + esc(f.name) + '</span>' +
               '<span class="ft-item-fx">\\(' + esc(rawTex(f.latex)) + '\\)</span>' +
             '</label>';
    }).join('');
    render(box);
  }

  window.ftPickAll = function (on) {
    var cbs = document.querySelectorAll('#ft-picklist .ft-pick-cb');
    for (var i = 0; i < cbs.length; i++) cbs[i].checked = !!on;
  };

  window.ftStartSelected = function () {
    var cbs = document.querySelectorAll('#ft-picklist .ft-pick-cb');
    var ids = {};
    for (var i = 0; i < cbs.length; i++) if (cbs[i].checked) ids[Number(cbs[i].value)] = 1;
    var chosen = bank().filter(function (f) { return ids[Number(f.id)]; });
    if (!chosen.length) { toast('Coche au moins une formule 🙂', '#fbbf24'); return; }
    beginSession(chosen);
  };

  /* ════════════════ ENTRAÎNEMENT : DÉROULÉ ════════════════ */
  function beginSession(list) {
    if (!list || !list.length) { toast('Rien à réviser', '#fbbf24'); return; }
    // copie figée (id + nom + formule) pour la session
    _queue = list.map(function (f) { return { id: f.id, name: f.name, latex: f.latex, chapter: f.chapter }; });
    _idx = 0; _results = [];
    show('train');
    renderCard();
  }

  function renderCard() {
    _graded = false;
    var f = _queue[_idx]; if (!f) { finish(); return; }
    // progression
    var bar = el('ft-progress-bar'); if (bar) bar.style.width = Math.round((_idx / _queue.length) * 100) + '%';
    var cnt = el('ft-counter'); if (cnt) cnt.textContent = 'Formule ' + (_idx + 1) + ' / ' + _queue.length;
    // énoncé (nom) — peut contenir des maths
    var ask = el('ft-ask'); if (ask) { ask.textContent = f.name || ''; render(ask); }
    var ct = el('ft-chap-tag');
    if (ct) { if (f.chapter) { ct.textContent = '📂 ' + chapLabel(f.chapter); ct.style.display = ''; } else { ct.style.display = 'none'; } }
    // réinit champ réponse
    var ans = el('ft-answer'); if (ans) ans.value = '';
    var prev = el('ft-answer-prev'); if (prev) { prev.style.display = 'none'; prev.innerHTML = ''; }
    // réinit zone résultat
    var rb = el('ft-result-box'); if (rb) rb.style.display = 'none';
    var sg = el('ft-selfgrade'); if (sg) sg.style.display = 'none';
    var nx = el('ft-next-btn'); if (nx) nx.style.display = 'none';
    var cr = el('ft-check-row'); if (cr) cr.style.display = '';
    if (ans) try { ans.focus(); } catch (e) {}
  }

  function showCompare(userTex) {
    var f = _queue[_idx];
    var yours = el('ft-yours'), correct = el('ft-correct');
    if (yours) { yours.textContent = userTex ? ('\\(' + rawTex(userTex) + '\\)') : '∅'; render(yours); }
    if (correct) { correct.textContent = '\\(' + rawTex(f.latex) + '\\)'; render(correct); }
    var rb = el('ft-result-box'); if (rb) rb.style.display = '';
    var cr = el('ft-check-row'); if (cr) cr.style.display = 'none';
  }

  window.ftCheck = function () {
    if (_graded) return;
    var ans = el('ft-answer'); var userTex = ans ? ans.value : '';
    if (!rawTex(userTex)) { toast('✍️ Écris ta réponse (ou « Je ne sais pas »)', '#fbbf24'); return; }
    var f = _queue[_idx];
    var verdict = el('ft-verdict'), sg = el('ft-selfgrade'), nx = el('ft-next-btn');
    showCompare(userTex);
    if (sameFormula(userTex, f.latex)) {
      // correspondance certaine → bonne réponse automatique
      if (verdict) { verdict.className = 'ft-verdict ft-verdict-ok'; verdict.textContent = '🎉 Parfait, c\'est exactement ça !'; }
      record('good');
      _graded = true;
      if (sg) sg.style.display = 'none';
      if (nx) nx.style.display = '';
    } else {
      // pas sûr (l\'égalité LaTeX stricte ne capte pas tout) → auto-évaluation
      if (verdict) { verdict.className = 'ft-verdict ft-verdict-warn'; verdict.textContent = '🤔 Compare avec la bonne formule :'; }
      if (sg) sg.style.display = '';
      if (nx) nx.style.display = 'none';
    }
  };

  window.ftDunno = function () {
    if (_graded) return;
    var verdict = el('ft-verdict'), sg = el('ft-selfgrade'), nx = el('ft-next-btn');
    showCompare('');
    if (verdict) { verdict.className = 'ft-verdict ft-verdict-no'; verdict.textContent = '👀 Pas grave — mémorise-la bien :'; }
    record('dunno');
    _graded = true;
    if (sg) sg.style.display = 'none';
    if (nx) nx.style.display = '';
  };

  window.ftSelfGrade = function (ok) {
    if (_graded) return;
    record(ok ? 'good' : 'bad');
    _graded = true;
    var verdict = el('ft-verdict');
    if (verdict) {
      if (ok) { verdict.className = 'ft-verdict ft-verdict-ok'; verdict.textContent = '✅ Super, tu la connais !'; }
      else { verdict.className = 'ft-verdict ft-verdict-no'; verdict.textContent = '❌ Note-la — tu l\'auras la prochaine fois.'; }
    }
    var sg = el('ft-selfgrade'); if (sg) sg.style.display = 'none';
    var nx = el('ft-next-btn'); if (nx) nx.style.display = '';
  };

  // enregistre le résultat de la carte (stats persistées par formule)
  function record(result) {
    var f = _queue[_idx];
    _results.push({ id: f.id, name: f.name, result: result });
    var d = data(); var stored = null;
    (d.formulaBank || []).forEach(function (x) { if (Number(x.id) === Number(f.id)) stored = x; });
    if (stored) {
      stored.stats = stored.stats || { seen: 0, correct: 0, streak: 0, best: 0 };
      stored.stats.seen++;
      if (result === 'good') {
        stored.stats.correct++;
        stored.stats.streak++;
        if (stored.stats.streak > (stored.stats.best || 0)) stored.stats.best = stored.stats.streak;
      } else {
        stored.stats.streak = 0;
      }
      if (typeof saveData === 'function') saveData(d);
    }
  }

  window.ftNext = function () {
    _idx++;
    if (_idx >= _queue.length) { finish(); return; }
    renderCard();
  };

  window.ftQuit = function () {
    if (_results.length && !confirm('Quitter l\'entraînement ? Ta progression sur les formules déjà vues est gardée.')) return;
    renderStats();
    show('home');
  };

  function finish() {
    var good = _results.filter(function (r) { return r.result === 'good'; }).length;
    var total = _results.length || 1;
    var pct = Math.round((good / total) * 100);
    var emoji = pct >= 90 ? '🏆' : pct >= 70 ? '🎉' : pct >= 50 ? '👍' : '💪';
    var missed = _results.filter(function (r) { return r.result !== 'good'; });
    var body = el('ft-done-body');
    if (body) {
      var html = '<div class="ft-done-score">' + emoji + '<div class="ft-done-pct">' + pct + '%</div>' +
                 '<div class="ft-done-sub">' + good + ' / ' + total + ' formule' + (total > 1 ? 's' : '') + ' réussie' + (good > 1 ? 's' : '') + '</div></div>';
      if (missed.length) {
        html += '<div class="ft-done-list"><h4>À retravailler :</h4>' +
          missed.map(function (r) { return '<div class="ft-done-miss">• ' + esc(r.name) + '</div>'; }).join('') + '</div>';
      } else {
        html += '<div class="ft-done-perfect">✨ Sans-faute ! Tu connais toutes ces formules par cœur.</div>';
      }
      body.innerHTML = html;
    }
    renderStats();
    show('done');
  }
})();
