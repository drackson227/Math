/*! GR2 Study © 2026 Drackson — Tous droits réservés. Copie, reproduction ou réutilisation du code interdites sans autorisation écrite (Instagram @drackson227). */
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

  /* ---- vocabulaire adapté à la matière (« formule » n'a pas de sens en anglais…) ---- */
  var TERMS = {
    maths:       { one: 'formule', many: 'formules', art: 'la' },
    chimie:      { one: 'formule', many: 'formules', art: 'la' },
    bio:         { one: 'notion',  many: 'notions',  art: 'la' },
    geo:         { one: 'notion',  many: 'notions',  art: 'la' },
    eco:         { one: 'notion',  many: 'notions',  art: 'la' },
    histoire:    { one: 'repère',  many: 'repères',  art: 'le' },
    francais:    { one: 'règle',   many: 'règles',   art: 'la' },
    anglais:     { one: 'mot/règle', many: 'mots & règles', art: 'le' },
    neerlandais: { one: 'mot/règle', many: 'mots & règles', art: 'le' }
  };
  function T() { return TERMS[subjInfo().key] || { one: 'notion', many: 'notions', art: 'la' }; }
  function isMasc() { return T().art === 'le'; }
  function pron() { return isMasc() ? 'le' : 'la'; }            // pronom « écris-LA / mémorise-LE »
  function cap(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }

  // Adapte tous les libellés de l'onglet selon la matière (appelé à chaque ouverture).
  function applyTerms() {
    var t = T(), one = t.one, many = t.many, masc = isMasc();
    var setTxt = function (id, txt) { var n = el(id); if (n) n.textContent = txt; };
    try { var nb = document.querySelector('.nav-btn[onclick*="memoformules"]'); if (nb) nb.textContent = '✍️ ' + cap(many) + ' par cœur'; } catch (e) {}
    setTxt('ft-h2', '✍️ ' + cap(many) + ' par cœur');
    var intro = el('ft-intro');
    if (intro) {
      intro.innerHTML = 'Apprends tes ' + many + ' en les <strong>réécrivant</strong> à la main. ' +
        'Utilise ' + (masc ? 'ceux' : 'celles') + ' <strong>déjà ' + (masc ? 'prêts' : 'prêtes') + ' du site</strong> ou ajoute ' + (masc ? 'les tiens' : 'les tiennes') + ' avec le bouton <strong>ƒ𝑥</strong>, ' +
        'puis entraîne-toi : l\'app t\'en demande ' + (masc ? 'un' : 'une') + ', tu l\'écris, et elle te corrige. <em>Rien n\'est inventé.</em>';
    }
    setTxt('ft-card-train-d', 'Écris les ' + many + ' de mémoire — l\'app corrige');
    setTxt('ft-card-bank-d', 'Ajoute, modifie ou supprime tes ' + many);
    setTxt('ft-lab-formula', cap(t.art) + ' ' + one);
    setTxt('ft-ask-label', 'Écris ' + t.art + ' ' + one + ' :');
    var myh = el('ft-myh'); if (myh) myh.innerHTML = '📝 Mes ' + many + ' <span id="ft-count" class="ft-badge"></span>';
    var ff = el('ft-formula'); if (ff) ff.placeholder = 'Clique sur ƒ𝑥 pour ' + pron() + ' construire…';
    // écran « choix du mode » + « choisir »
    setTxt('ft-mode-all-d', (masc ? 'Tous tes ' : 'Toutes tes ') + many + ', un' + (masc ? '' : 'e') + ' par un' + (masc ? '' : 'e'));
    setTxt('ft-mode-pick-d', 'Tu sélectionnes les ' + many);
    setTxt('ft-mode-rand-d', 'L\'app tire les ' + many + ' au sort');
    setTxt('ft-pick-h', 'Coche les ' + many + ' à réviser');
    if (_editId == null) cancelEditUI();
  }

  /* ---- banque PERSO (formules ajoutées par l'élève, filtrées sur la matière) ---- */
  function allBank() { var d = data(); return Array.isArray(d.formulaBank) ? d.formulaBank : []; }
  function userBank() {
    var k = subjInfo().key;
    return allBank().filter(function (f) { return (f.subject || 'maths') === k; });
  }
  function byId(id) {
    id = Number(id);
    var list = allBank();
    for (var i = 0; i < list.length; i++) if (Number(list[i].id) === id) return list[i];
    return null;
  }

  /* ════════════════ 📚 BANQUE PAR DÉFAUT (formules DÉJÀ dans le site) ════════════════
     On NE crée AUCUNE formule : on extrait celles, déjà validées, de l'onglet
     « Formules clés » de chaque matière (les .formula-box → h3 = nom, formula-main
     = formule). Source : window.SUBJECTS[matière].content.sections.formules. */
  var _defCache = {};
  // Vrai si la chaîne ressemble à du LaTeX (à rendre en maths), faux = texte brut (ex. équation chimique).
  function isTex(s) { return /\\|[\^_{}]/.test(String(s || '')); }
  // Transforme un fragment HTML de formule en chaîne propre (texte ou LaTeX brut).
  function cleanFormula(frag) {
    var d = document.createElement('div');
    d.innerHTML = String(frag || '');
    var t = (d.textContent || '');
    t = t.replace(/ /g, ' ').replace(/\s+/g, ' ');
    t = t.replace(/\$\$/g, '').replace(/\\\(|\\\)|\\\[|\\\]/g, ''); // retire délimiteurs maths
    return t.trim();
  }
  function defaultsFor(subj) {
    if (_defCache[subj]) return _defCache[subj];
    var html = '';
    try {
      var c = window.SUBJECTS && window.SUBJECTS[subj] && window.SUBJECTS[subj].content;
      if (c && c.sections && c.sections.formules) html = c.sections.formules;
    } catch (e) {}
    if (!html && subj === 'maths' && typeof SECTIONS_CONTENT !== 'undefined' && SECTIONS_CONTENT.formules) html = SECTIONS_CONTENT.formules;
    var out = [];
    if (html) {
      var tmp = document.createElement('div');
      tmp.innerHTML = html;
      var boxes = tmp.querySelectorAll('.formula-box');
      Array.prototype.forEach.call(boxes, function (box, bi) {
        var h = box.querySelector('h3'); if (!h) return;
        var tagEl = h.querySelector('.tag');
        var chapter = tagEl ? tagEl.textContent.trim() : '';
        var hc = h.cloneNode(true); var tg = hc.querySelector('.tag'); if (tg) tg.remove();
        var name = (hc.textContent || '').replace(/\s+/g, ' ').trim();
        if (!name) return;
        var mains = box.querySelectorAll('.formula-main');
        var pieces = [], seen = {};
        Array.prototype.forEach.call(mains, function (m) {
          m.innerHTML.split(/<br\s*\/?>/i).forEach(function (seg) {
            cleanFormula(seg).split(/↔|⟺|⇔/).forEach(function (p) {
              var t = p.replace(/^[·,;\s]+|[·,;\s]+$/g, '').trim();
              if (t && t.length <= 200 && !seen[t]) { seen[t] = 1; pieces.push(t); }
            });
          });
        });
        pieces.forEach(function (tex, pi) {
          var label = name + (pieces.length > 1 ? ' (' + (pi + 1) + '/' + pieces.length + ')' : '');
          out.push({ id: 'def:' + subj + ':' + bi + ':' + pi, subject: subj, name: label, latex: tex, chapter: chapter, _default: true });
        });
      });
    }
    _defCache[subj] = out;
    return out;
  }
  function defStats(id) { var m = data().fbStats || {}; return m[id] || { seen: 0, correct: 0, streak: 0, best: 0 }; }
  function isHidden(id) { return (data().fbHidden || []).indexOf(id) >= 0; }
  function visibleDefaults() {
    return defaultsFor(subjInfo().key).filter(function (f) { return !isHidden(f.id); })
      .map(function (f) { f.stats = defStats(f.id); return f; });
  }
  // banque COMPLÈTE pour l'entraînement = perso + formules du site visibles
  function bank() { return userBank().concat(visibleDefaults()); }

  window.ftHideDefault = function (id) {
    var d = data(); d.fbHidden = d.fbHidden || [];
    if (d.fbHidden.indexOf(id) < 0) d.fbHidden.push(id);
    if (typeof saveData === 'function') saveData(d);
    toast('🙈 Formule du site masquée'); renderStats(); renderList();
  };
  window.ftRestoreDefaults = function () {
    var d = data(), subj = subjInfo().key;
    d.fbHidden = (d.fbHidden || []).filter(function (id) { return String(id).indexOf('def:' + subj + ':') !== 0; });
    if (typeof saveData === 'function') saveData(d);
    toast('↩️ Formules du site réaffichées'); renderStats(); renderList();
  };

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
    applyTerms();
    cancelEditUI();
    renderStats();
    renderList();
    show('home');
  };

  function renderStats() {
    var box = el('ft-stats'); if (!box) return;
    var info = subjInfo(), list = bank(), t = T(), masc = isMasc();
    var mastered = list.filter(function (f) { return f.stats && f.stats.streak >= MASTERED_STREAK; }).length;
    var mz = (masc ? 'maîtrisé' : 'maîtrisée') + (mastered > 1 ? 's' : '');
    box.innerHTML =
      '<span class="ft-chip">' + info.icon + ' ' + esc(info.label) + '</span>' +
      '<span class="ft-chip">📚 ' + list.length + ' ' + (list.length > 1 ? t.many : t.one) + '</span>' +
      '<span class="ft-chip ft-chip-ok">🏆 ' + mastered + ' ' + mz + '</span>';
  }

  /* ════════════════ BANQUE : LISTE + CRUD ════════════════ */
  // affiche une formule (LaTeX → joli rendu MathJax ; texte brut → tel quel)
  function fxHtml(tex) {
    tex = rawTex(tex);
    return isTex(tex) ? ('\\(' + esc(tex) + '\\)') : ('<span class="ft-plainfx">' + esc(tex) + '</span>');
  }
  function itemHtml(f, isDef) {
    var st = f.stats || {};
    var badge = st.streak >= MASTERED_STREAK ? '<span class="ft-mini-ok" title="Maîtrisée">🏆</span>'
      : (st.seen ? '<span class="ft-mini" title="Vue ' + st.seen + ' fois">' + (st.correct || 0) + '/' + st.seen + '</span>' : '');
    var chap = f.chapter ? '<span class="ft-chaptag-mini">' + esc(chapLabel(f.chapter)) + '</span>' : '';
    var acts = isDef
      ? '<button type="button" class="ft-ic" onclick="ftHideDefault(\'' + f.id + '\')" title="Masquer cette formule du site">🙈</button>'
      : '<button type="button" class="ft-ic" onclick="ftEditFormula(' + Number(f.id) + ')" title="Modifier">✏️</button>' +
        '<button type="button" class="ft-ic" onclick="ftDeleteFormula(' + Number(f.id) + ')" title="Supprimer">🗑️</button>';
    return '<div class="ft-item' + (isDef ? ' ft-item-def' : '') + '">' +
             '<div class="ft-item-main">' +
               '<div class="ft-item-name">' + esc(f.name) + ' ' + badge + '</div>' +
               '<div class="ft-item-fx">' + fxHtml(f.latex) + '</div>' + chap +
             '</div>' +
             '<div class="ft-item-acts">' + acts + '</div>' +
           '</div>';
  }
  function renderList() {
    var box = el('ft-list'); if (!box) return;
    var users = userBank(), defs = visibleDefaults();
    var allDef = defaultsFor(subjInfo().key), hiddenCount = allDef.length - defs.length;
    var cnt = el('ft-count'); if (cnt) cnt.textContent = users.length ? String(users.length) : '';
    var t = T(), html = '';
    // 1) éléments perso
    if (!users.length) {
      html += '<div class="ft-empty">📭 Pas encore de ' + t.one + ' perso pour <b>' + esc(subjInfo().label) +
        '</b>.<br>Ajoute ' + (isMasc() ? 'le tien' : 'la tienne') + ' ci-dessus avec <b>ƒ𝑥</b> 👆' +
        (allDef.length ? '<br><span style="opacity:.8">(tu peux déjà t\'entraîner sur ' + (isMasc() ? 'ceux' : 'celles') + ' du site ci-dessous 👇)</span>' : '') + '</div>';
    } else {
      html += users.map(function (f) { return itemHtml(f, false); }).join('');
    }
    // 2) éléments par défaut du site
    if (allDef.length) {
      html += '<div class="ft-group-h">📚 ' + cap(t.many) + ' du site — ' + esc(subjInfo().label) +
        ' <span class="ft-badge">' + defs.length + '</span>' +
        (hiddenCount ? ' <button type="button" class="ft-restore" onclick="ftRestoreDefaults()">↩️ Réafficher ' + hiddenCount + '</button>' : '') +
        '</div>' +
        '<p class="ft-group-sub">Déjà ' + (isMasc() ? 'prêts' : 'prêtes') + ' (dans le site). Entraîne-toi dessus tout de suite — 🙈 pour en masquer un' + (isMasc() ? '' : 'e') + '.</p>';
      html += defs.length ? defs.map(function (f) { return itemHtml(f, true); }).join('')
        : '<div class="ft-empty">' + cap(t.many) + ' du site ' + (isMasc() ? 'tous masqués' : 'toutes masquées') + '.</div>';
    }
    box.innerHTML = html;
    render(box);
  }

  function cancelEditUI() {
    var t = el('ft-form-title'), c = el('ft-cancel-btn'), s = el('ft-save-btn');
    if (t) t.textContent = '➕ ' + (isMasc() ? 'Nouveau ' : 'Nouvelle ') + T().one;
    if (c) c.style.display = 'none';
    if (s) s.textContent = '💾 Enregistrer';
  }

  window.ftSaveFormula = function () {
    var nameEl = el('ft-name'), fxEl = el('ft-formula'), chEl = el('ft-chapter');
    var name = (nameEl && nameEl.value || '').trim();
    var latex = rawTex(fxEl && fxEl.value || '');
    var chapter = (chEl && chEl.value) || '';
    if (!name) { toast('⚠️ Donne un nom à ' + (isMasc() ? 'ton ' : 'ta ') + T().one, '#f87171'); if (nameEl) nameEl.focus(); return; }
    if (!latex) { toast('⚠️ Construis ' + T().art + ' ' + T().one + ' avec le bouton ƒ𝑥', '#f87171'); return; }

    var d = data();
    d.formulaBank = Array.isArray(d.formulaBank) ? d.formulaBank : [];
    if (_editId != null) {
      var f = null;
      for (var i = 0; i < d.formulaBank.length; i++) if (Number(d.formulaBank[i].id) === Number(_editId)) { f = d.formulaBank[i]; break; }
      if (f) { f.name = name; f.latex = latex; f.chapter = chapter; }
      _editId = null;
      toast('✅ ' + cap(T().one) + (isMasc() ? ' modifié' : ' modifiée'));
    } else {
      d.formulaBank.unshift({
        id: Date.now() + Math.floor(Math.random() * 1000),
        subject: subjInfo().key,
        name: name, latex: latex, chapter: chapter,
        created: new Date().toISOString(),
        stats: { seen: 0, correct: 0, streak: 0, best: 0 }
      });
      toast('✅ ' + cap(T().one) + (isMasc() ? ' ajouté' : ' ajoutée') + ' à ta banque');
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
    if (t) t.textContent = '✏️ Modifier ' + T().art + ' ' + T().one;
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
    if (!confirm('Supprimer ' + T().art + ' ' + T().one + ' « ' + (f.name || '') + ' » ?')) return;
    var d = data();
    d.formulaBank = (d.formulaBank || []).filter(function (x) { return Number(x.id) !== Number(id); });
    if (typeof saveData === 'function') saveData(d);
    if (Number(_editId) === Number(id)) window.ftCancelEdit();
    toast('🗑️ ' + cap(T().one) + (isMasc() ? ' supprimé' : ' supprimée'));
    renderStats(); renderList();
  };

  /* ════════════════ ENTRAÎNEMENT : CHOIX DU MODE ════════════════ */
  window.ftStartSetup = function () {
    if (!bank().length) { toast('Ajoute d\'abord des ' + T().many + ' 🙂', '#fbbf24'); show('bank'); return; }
    show('setup');
  };

  window.ftStartAll = function () { beginSession(bank()); };

  window.ftStartRandom = function () {
    var list = bank();
    beginSession(shuffle(list).slice(0, Math.min(RANDOM_COUNT, list.length)));
  };

  // écran « choisir » : liste à cocher (perso + site ; ids peuvent être texte)
  function renderPickList() {
    var box = el('ft-picklist'); if (!box) return;
    var list = bank();
    if (!list.length) { box.innerHTML = '<div class="ft-empty">Aucune formule à choisir.</div>'; return; }
    box.innerHTML = list.map(function (f) {
      return '<label class="ft-pick-item">' +
               '<input type="checkbox" class="ft-pick-cb" value="' + esc(String(f.id)) + '" checked>' +
               '<span class="ft-pick-name">' + esc(f.name) + '</span>' +
               '<span class="ft-item-fx">' + fxHtml(f.latex) + '</span>' +
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
    for (var i = 0; i < cbs.length; i++) if (cbs[i].checked) ids[String(cbs[i].value)] = 1;
    var chosen = bank().filter(function (f) { return ids[String(f.id)]; });
    if (!chosen.length) { toast('Coche au moins une formule 🙂', '#fbbf24'); return; }
    beginSession(chosen);
  };

  /* ════════════════ ENTRAÎNEMENT : DÉROULÉ ════════════════ */
  function beginSession(list) {
    if (!list || !list.length) { toast('Rien à réviser', '#fbbf24'); return; }
    // copie figée (id + nom + formule + origine) pour la session
    _queue = list.map(function (f) { return { id: f.id, name: f.name, latex: f.latex, chapter: f.chapter, _default: !!f._default }; });
    _idx = 0; _results = [];
    show('train');
    renderCard();
  }

  function renderCard() {
    _graded = false;
    var f = _queue[_idx]; if (!f) { finish(); return; }
    // progression
    var bar = el('ft-progress-bar'); if (bar) bar.style.width = Math.round((_idx / _queue.length) * 100) + '%';
    var cnt = el('ft-counter'); if (cnt) cnt.textContent = cap(T().one) + ' ' + (_idx + 1) + ' / ' + _queue.length;
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

  // affiche une formule dans un nœud (LaTeX → MathJax ; texte brut → tel quel)
  function setFormula(node, tex) {
    if (!node) return;
    tex = rawTex(tex);
    if (!tex) { node.textContent = '∅'; return; }
    if (isTex(tex)) { node.textContent = '\\(' + tex + '\\)'; render(node); }
    else { node.textContent = tex; }
  }
  function showCompare(userTex) {
    var f = _queue[_idx];
    setFormula(el('ft-yours'), userTex);
    setFormula(el('ft-correct'), f.latex);
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
      if (verdict) { verdict.className = 'ft-verdict ft-verdict-warn'; verdict.textContent = '🤔 Compare avec la bonne réponse :'; }
      if (sg) sg.style.display = '';
      if (nx) nx.style.display = 'none';
    }
  };

  window.ftDunno = function () {
    if (_graded) return;
    var verdict = el('ft-verdict'), sg = el('ft-selfgrade'), nx = el('ft-next-btn');
    showCompare('');
    if (verdict) { verdict.className = 'ft-verdict ft-verdict-no'; verdict.textContent = '👀 Pas grave — mémorise-' + pron() + ' bien :'; }
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
      if (ok) { verdict.className = 'ft-verdict ft-verdict-ok'; verdict.textContent = '✅ Super, tu ' + pron() + ' connais !'; }
      else { verdict.className = 'ft-verdict ft-verdict-no'; verdict.textContent = '❌ Note-' + pron() + ' — tu l\'auras la prochaine fois.'; }
    }
    var sg = el('ft-selfgrade'); if (sg) sg.style.display = 'none';
    var nx = el('ft-next-btn'); if (nx) nx.style.display = '';
  };

  // enregistre le résultat de la carte (stats persistées par formule)
  // perso → dans l'objet formulaBank ; formule du site → dans data.fbStats[id]
  function record(result) {
    var f = _queue[_idx];
    _results.push({ id: f.id, name: f.name, result: result });
    var d = data(), st = null;
    if (f._default) {
      d.fbStats = d.fbStats || {};
      st = d.fbStats[f.id] = d.fbStats[f.id] || { seen: 0, correct: 0, streak: 0, best: 0 };
    } else {
      (d.formulaBank || []).forEach(function (x) { if (Number(x.id) === Number(f.id)) st = (x.stats = x.stats || { seen: 0, correct: 0, streak: 0, best: 0 }); });
    }
    if (!st) return;
    st.seen++;
    if (result === 'good') {
      st.correct++; st.streak++;
      if (st.streak > (st.best || 0)) st.best = st.streak;
    } else {
      st.streak = 0;
    }
    if (typeof saveData === 'function') saveData(d);
  }

  window.ftNext = function () {
    _idx++;
    if (_idx >= _queue.length) { finish(); return; }
    renderCard();
  };

  window.ftQuit = function () {
    if (_results.length && !confirm('Quitter l\'entraînement ? Ta progression est gardée.')) return;
    renderStats();
    show('home');
  };

  function finish() {
    var good = _results.filter(function (r) { return r.result === 'good'; }).length;
    var total = _results.length || 1;
    var pct = Math.round((good / total) * 100);
    var emoji = pct >= 90 ? '🏆' : pct >= 70 ? '🎉' : pct >= 50 ? '👍' : '💪';
    var missed = _results.filter(function (r) { return r.result !== 'good'; });
    var t = T(), body = el('ft-done-body');
    if (body) {
      var html = '<div class="ft-done-score">' + emoji + '<div class="ft-done-pct">' + pct + '%</div>' +
                 '<div class="ft-done-sub">' + good + ' / ' + total + ' ' + (total > 1 ? t.many : t.one) + ' — bonne' + (good > 1 ? 's' : '') + ' réponse' + (good > 1 ? 's' : '') + '</div></div>';
      if (missed.length) {
        html += '<div class="ft-done-list"><h4>À retravailler :</h4>' +
          missed.map(function (r) { return '<div class="ft-done-miss">• ' + esc(r.name) + '</div>'; }).join('') + '</div>';
      } else {
        html += '<div class="ft-done-perfect">✨ Sans-faute ! Tu connais ' + (isMasc() ? 'tous ces ' : 'toutes ces ') + t.many + ' par cœur.</div>';
      }
      body.innerHTML = html;
    }
    renderStats();
    show('done');
  }
})();
