/*! GR2 Study © 2026 Drackson — Tous droits réservés. Copie, reproduction ou réutilisation du code interdites sans autorisation écrite (Instagram @drackson227). */
/* ============================================================
   Application principale — Maths GR2
   Géométrie analytique plane : Vecteurs · Cercle · Droites
   ============================================================ */

// Nettoyage unique : retire d'anciennes clés API (projet « Notiq ») qui pouvaient
// traîner dans le localStorage PARTAGÉ de drackson227.github.io (tous les sites du
// compte partagent le même stockage). Exécuté UNE seule fois (drapeau) → si Notiq
// est réutilisé un jour, ses nouvelles clés ne seront pas touchées.
try {
  if (!localStorage.getItem('gr2_notiq_cleaned')) {
    ['notiq_gemini_key', 'notiq_gemini_key2', 'notiq_openrouter_key', 'notiq_groq_key'].forEach(function (k) { localStorage.removeItem(k); });
    localStorage.setItem('gr2_notiq_cleaned', '1');
  }
} catch (e) {}

// Helper sécurisé : attend que MathJax soit prêt avant de typeset
// Un élément contient-il du LaTeX PAS ENCORE rendu ? (délimiteurs bruts dans le texte).
// Après rendu, MathJax remplace les délimiteurs par des <mjx-container> : plus rien à faire.
function _hasUnrenderedMath(el) {
  if (!el) return false;
  var t = el.textContent || '';
  return t.indexOf('\\(') >= 0 || t.indexOf('\\[') >= 0 || t.indexOf('$') >= 0;
}
function safeMathJax(elements, _tries) {
  if (!window.MathJax) return;
  // Économie CPU : on ne typesette que les éléments qui ont du LaTeX brut.
  // (changer d'onglet en histoire/géo/langues ne relance plus MathJax pour rien)
  if (elements && elements.length) {
    elements = elements.filter(_hasUnrenderedMath);
    if (!elements.length) return;
  }
  const doTypeset = () => {
    try {
      if (typeof MathJax.typesetPromise === 'function') {
        elements ? MathJax.typesetPromise(elements) : MathJax.typesetPromise();
      } else if (typeof MathJax.typeset === 'function') {
        elements ? MathJax.typeset(elements) : MathJax.typeset();
      }
    } catch(e) { console.warn('MathJax typeset error:', e); }
  };
  if (typeof MathJax.typesetPromise === 'function' || typeof MathJax.typeset === 'function') {
    doTypeset();
  } else {
    // MathJax pas encore prêt : on réessaie ~10 s max. Sans plafond, un CDN bloqué
    // (réseau d'école) ferait tourner cette boucle pour toujours, à chaque appel.
    var n = (_tries || 0) + 1;
    if (n <= 50) setTimeout(() => safeMathJax(elements, n), 200);
  }
}

// allQuestions défini dans data.js


let currentQuestions = [];
let score = 0;
let answered = 0;
let skipped = 0;
let correctStreak = 0;
let questionAnswered = [];
let timerIds = [];
let currentActiveQuestion = 0;
let quizResults = []; // par question : true (juste), false (faux), 'skip' (passée)

// Barre de progression visuelle du quiz (Q x/N + pastilles vert/rouge/courant)
function updateQuizProgress() {
  const el = document.getElementById('quiz-progress');
  if (!el) return;
  const n = currentQuestions.length;
  if (!n) { el.innerHTML = ''; return; }
  const done = quizResults.filter(function (r) { return r !== undefined && r !== null; }).length;
  const okN = quizResults.filter(function (r) { return r === true; }).length;
  const noN = quizResults.filter(function (r) { return r === false; }).length;
  const skN = quizResults.filter(function (r) { return r === 'skip'; }).length;
  const cur = Math.min(currentActiveQuestion + 1, n);
  let dots = '';
  for (let i = 0; i < n; i++) {
    let cls = 'qd';
    if (quizResults[i] === true) cls += ' qd-ok';
    else if (quizResults[i] === false) cls += ' qd-no';
    else if (quizResults[i] === 'skip') cls += ' qd-skip';
    else if (i === currentActiveQuestion) cls += ' qd-cur';
    dots += '<span class="' + cls + '"></span>';
  }
  const pct = Math.round(done / n * 100);
  const tally = done > 0
    ? '<span class="qp-count"><span style="color:#34d399;">✅ ' + okN + '</span> · <span style="color:#f87171;">❌ ' + noN + '</span>' + (skN ? ' · <span style="color:#fbbf24;">⏭ ' + skN + '</span>' : '') + '</span>'
    : '<span class="qp-count">' + n + ' questions</span>';
  el.innerHTML = '<div class="qp-row"><span class="qp-label">Question ' + cur + ' / ' + n + '</span>' + tally + '</div>' +
    '<div class="qp-dots">' + dots + '</div>' +
    '<div class="qp-bar"><div style="width:' + pct + '%;"></div></div>';
}

// Valeurs par défaut d'une sauvegarde. Toute clé manquante DOIT figurer ici :
// loadSavedData fusionne les données stockées par-dessus ces défauts, afin qu'une
// vieille sauvegarde (version antérieure) ou un import partiel n'arrive jamais avec
// une clé absente — sinon des accès comme data.calendar[...] / data.badges.includes(...)
// planteraient (« Cannot read properties of undefined »).
function _defaultData() {
  return {
    totalQuizzes: 0,
    totalScore: 0,
    bestScore: 0,
    scoreHistory: [],
    masteredQuestions: {},
    lastSession: null,
    streak: 0,
    lastDate: null,
    xp: 0,
    level: 'Apprenti',
    badges: [],
    calendar: {},
    wrongQuestions: [],
    confidenceData: {},
    missedQuestions: [],
    flashcardData: {},
    journalEntries: [],
    pomodorosCompleted: 0,
    customExercises: [],
    formulaBank: [],
    ficheNotes: {},
    badgeEarned: [],
    examDates: {}
    // NB : on n'ajoute PAS ici study / examHistory / chapterStats / favoriteCards.
    // Leurs consommateurs les initialisent eux-mêmes avec la BONNE forme via « x || {…} ».
    // Les mettre à {} ici (objet vide mais truthy) casserait ce fallback (ex. study.dayActions → NaN).
  };
}
function loadSavedData() {
  try {
    const saved = localStorage.getItem('mathsgr2_data');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Fusion défensive : les défauts garantissent la présence de toutes les clés,
      // les données stockées (parsed) ont la priorité sur celles-ci.
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        return Object.assign(_defaultData(), parsed);
      }
    }
  } catch(e) { console.warn('localStorage non disponible:', e); }
  return _defaultData();
}

function saveData(data) {
  try {
    localStorage.setItem('mathsgr2_data', JSON.stringify(data));
  } catch(e) {
    console.warn('Impossible de sauvegarder:', e);
    // 🛑 stockage plein : prévenir l'élève (sinon la sauvegarde échoue en SILENCE → perte)
    var full = e && (e.name === 'QuotaExceededError' || e.code === 22 || e.code === 1014 || /quota|exceeded/i.test(e.message || ''));
    if (full && typeof showToast === 'function') {
      showToast('⚠️ Stockage plein — allège une synthèse/image, ou exporte puis supprime des créations', '#f87171');
    }
    return false;
  }
  // Si connecté à un compte, pousse aussi vers le cloud (en différé, défensif).
  if (typeof cloudPushDebounced === 'function') { try { cloudPushDebounced(); } catch(e){} }
  if (typeof leaderboardPush === 'function') { try { leaderboardPush(); } catch(e){} }
  return true;
}

// ── CLASSEMENT (leaderboard XP via Supabase) ──
let _lbTimer = null;
function leaderboardPush() {
  if (!window.MGR2Auth) return;
  const sb = window.MGR2Auth.sb(), u = window.MGR2Auth.user();
  if (!sb || !u) return;
  clearTimeout(_lbTimer);
  _lbTimer = setTimeout(() => {
    const data = loadSavedData();
    try {
      sb.from('leaderboard').upsert({ user_id: u.id, pseudo: window.MGR2Auth.pseudo() || 'élève', xp: data.xp || 0, updated_at: new Date().toISOString() })
        .then(r => { if (r && r.error) console.warn('leaderboard push:', r.error.message); });
    } catch (e) { console.warn('leaderboard push:', e); }
  }, 2000);
}
function renderLeaderboard() {
  const box = document.getElementById('leaderboard-list');
  if (!box) return;
  const sb = window.MGR2Auth && window.MGR2Auth.sb();
  const u = window.MGR2Auth && window.MGR2Auth.user();
  if (!sb || !u) { box.innerHTML = '<p style="color:var(--text-secondary); font-size:13px; text-align:center; margin:0;">Connecte-toi pour voir le classement et y figurer.</p>'; return; }
  box.innerHTML = '<p style="color:var(--text-secondary); font-size:13px; text-align:center; margin:0;">Chargement…</p>';
  try {
    sb.from('leaderboard').select('pseudo,xp,user_id').order('xp', { ascending: false }).limit(10)
      .then(r => {
        if (r.error) { box.innerHTML = '<p style="color:var(--text-secondary); font-size:13px; text-align:center; margin:0;">Classement indisponible (table créée ?).</p>'; return; }
        const rows = r.data || [];
        if (!rows.length) { box.innerHTML = '<p style="color:var(--text-secondary); font-size:13px; text-align:center; margin:0;">Personne encore… sois le premier ! 🏆</p>'; return; }
        const medals = ['🥇', '🥈', '🥉'];
        box.innerHTML = rows.map((row, i) => {
          const me = u && row.user_id === u.id;
          const rank = medals[i] || ('<span style="opacity:.6;">' + (i + 1) + '</span>');
          return '<div class="lb-row' + (me ? ' lb-me' : '') + '"><span class="lb-rank">' + rank + '</span>' +
                 '<span class="lb-name">' + escapeHtmlExo(row.pseudo || '?') + (me ? ' (toi)' : '') + '</span>' +
                 '<span class="lb-xp">' + (row.xp || 0) + ' XP</span></div>';
        }).join('');
      });
  } catch (e) { box.innerHTML = '<p style="color:var(--text-secondary); font-size:13px; text-align:center; margin:0;">Classement indisponible.</p>'; }
}

// ── EXPORT / IMPORT DES PROGRÈS ──
function exportProgress() {
  const data = loadSavedData();
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const now = new Date();
  const stamp = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
  const a = document.createElement('a');
  a.href = url;
  a.download = `maths-gr2-progres-${stamp}.json`;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  if (typeof showToast === 'function') showToast('✅ Progrès exportés', 'var(--color-parabole)');
}

function importProgress(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    let obj;
    try { obj = JSON.parse(e.target.result); }
    catch (err) { showToast('❌ Fichier illisible (JSON invalide)', '#f87171'); return; }
    if (!obj || typeof obj !== 'object' || Array.isArray(obj)) { showToast('❌ Fichier invalide', '#f87171'); return; }
    if (!confirm('Remplacer tes progrès actuels par ceux du fichier ? Cette action est irréversible.')) return;
    saveData(obj);
    showToast('✅ Progrès importés', 'var(--color-parabole)');
    if (typeof updateProfile === 'function') updateProfile();
    if (typeof updateMissedBtn === 'function') updateMissedBtn();
  };
  reader.readAsText(file);
  const inp = document.getElementById('import-file');
  if (inp) inp.value = ''; // permet de re-sélectionner le même fichier
}

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function shuffleOptions(question) {
  const indices = [0, 1, 2, 3];
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  const newOpts = indices.map(i => question.opts[i]);
  const newAns = indices.indexOf(question.ans);
  return { opts: newOpts, ans: newAns };
}

function filterQuiz(force) {
  // ⚠️ GARDE ANTI-DÉSYNCHRONISATION : ne JAMAIS re-mélanger currentQuestions pendant
  // qu'un quiz est affiché. Sinon l'écran montre un mélange (A) et la correction en
  // vérifie un autre (B) → la vraie bonne réponse est comptée fausse. Seuls
  // startQuiz/resetQuiz (qui re-rendent le DOM juste après) passent force=true.
  if (force !== true) {
    const _as = document.getElementById('quiz-active-screen');
    if (_as && _as.style.display !== 'none') return;
  }
  const chapterFilter = document.getElementById('chapter-filter').value;
  const difficultyFilter = document.getElementById('difficulty-filter').value;
  const data = loadSavedData();
  
  // Get missed questions for adaptive quiz
  const missedQuestions = data.missedQuestions || [];
  
  let questions = allQuestions.filter(q => {
    const chapterMatch = chapterFilter === 'all' || q.chapter === chapterFilter;
    const difficultyMatch = difficultyFilter === 'all' || q.difficulty === difficultyFilter;
    return chapterMatch && difficultyMatch;
  });

  // ➕ Questions QCM PERSO de l'élève → jouables dans le VRAI Quiz (mêmes filtres).
  //    Textes échappés (anti-XSS, notamment si import) ; les formules \( \) survivent.
  try {
    const _cust = (data.customExercises || [])
      .filter(e => (e.subject || 'maths') === curSubject() && e.qcm && Array.isArray(e.opts) && e.opts.length === 4)
      .map(e => ({
        q: escapeHtmlExo(e.q || ''), opts: e.opts.map(o => escapeHtmlExo(o || '')),
        ans: (e.ans || 0), chapter: e.theme || '', difficulty: e.difficulty || 'intermediaire',
        exp: escapeHtmlExo(e.exp || ''), _custom: e.id
      }))
      .filter(q => (chapterFilter === 'all' || q.chapter === chapterFilter) &&
                   (difficultyFilter === 'all' || q.difficulty === difficultyFilter));
    if (_cust.length) questions = questions.concat(_cust);
  } catch (e) {}

  // Prioritize missed questions (adaptive quiz)
  if (missedQuestions.length > 0) {
    const missed = questions.filter(q => missedQuestions.includes(q.q));
    const others = questions.filter(q => !missedQuestions.includes(q.q));
    // I2 — Mélanger CHAQUE groupe séparément pour garder les ratées en tête
    questions = [...shuffleArray(missed), ...shuffleArray(others)];
  }
  
  // I2 — When no missed questions, shuffle the full filtered list
  if (missedQuestions.length === 0) {
    questions = shuffleArray(questions);
  }

  currentQuestions = questions.map(q => {
    const shuffled = shuffleOptions(q);
    return {...q, opts: shuffled.opts, ans: shuffled.ans};
  });
  // Quiz plus court & varié : on ne garde qu'un nombre limité de questions par
  // session (10 par défaut). Comme les ratées sont déjà placées en tête, ce
  // découpage garde la priorité aux questions à revoir.
  const _fullCount = currentQuestions.length;
  const _limEl = document.getElementById('quiz-length');
  const _lim = _limEl ? _limEl.value : '10';
  if (_lim !== 'all' && _fullCount > +_lim) currentQuestions = currentQuestions.slice(0, +_lim);
  window._quizFullCount = _fullCount; // mémorisé pour l'affichage « X sur Y »
  // resetQuiz() sera appelé via startQuiz()
  score = 0; answered = 0; skipped = 0; correctStreak = 0;
  currentActiveQuestion = 0; questionAnswered = [];
  timerIds.forEach(id => clearInterval(id)); timerIds = [];
  updateScore();
  updateMissedBtn();
  updateDailyBtn();

  const countEl = document.getElementById('quiz-count-display');
  if (countEl) {
    const _n = currentQuestions.length;
    const _extra = (_fullCount > _n) ? ' (sur ' + _fullCount + ')' : '';
    countEl.textContent = _n + ' question' + (_n !== 1 ? 's' : '') + _extra;
  }
  // Mémorise les PRÉFÉRENCES (difficulté + longueur) pour les retrouver la prochaine
  // fois. Le chapitre n'est pas mémorisé : il dépend de la matière en cours.
  try { localStorage.setItem('mathsgr2_quizprefs', JSON.stringify({ df: difficultyFilter, len: _lim })); } catch (e) {}
}

// Restaure les préférences de quiz (difficulté + longueur) dans les menus déroulants.
// Appelé à l'entrée de la section quiz, AVANT filterQuiz (qui lit ces menus).
function restoreQuizPrefs() {
  let prefs; try { prefs = JSON.parse(localStorage.getItem('mathsgr2_quizprefs') || '{}'); } catch (e) { return; }
  if (!prefs) return;
  const df = document.getElementById('difficulty-filter');
  if (df && prefs.df && [...df.options].some(o => o.value === prefs.df)) df.value = prefs.df;
  const len = document.getElementById('quiz-length');
  if (len && prefs.len && [...len.options].some(o => o.value === prefs.len)) len.value = prefs.len;
}

let missedOnlyMode = false;

function filterMissedOnly() {
  const data = loadSavedData();
  const missed = data.missedQuestions || [];
  if (missed.length === 0) return;
  missedOnlyMode = true; // Flag so startQuiz skips filterQuiz (F1)
  currentQuestions = allQuestions
    .filter(q => missed.includes(q.q))
    .map(q => { const s = shuffleOptions(q); return {...q, opts: s.opts, ans: s.ans}; });
  score = 0; answered = 0; skipped = 0; correctStreak = 0;
  currentActiveQuestion = 0; questionAnswered = [];
  timerIds.forEach(id => clearInterval(id)); timerIds = [];
  updateScore();
  updateMissedBtn(); // M4 — mettre à jour l'état du bouton après filtrage
} 

function updateMissedBtn() {
  const data = loadSavedData();
  const btn = document.getElementById('missed-filter-btn');
  if (!btn) return;
  const count = (data.missedQuestions || []).length;
  btn.disabled = count === 0;
  btn.style.opacity = count === 0 ? '0.4' : '1';
  btn.style.cursor = count === 0 ? 'not-allowed' : 'pointer';
  btn.textContent = `⚠️ Réviser mes erreurs${count > 0 ? ` (${count})` : ''}`;
}

// ── DÉFI DU JOUR : 5 questions déterministes selon la date (mêmes pour tout le monde ce jour-là) ──
function _todayKey() { const d = new Date(); return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); }
function _seedFromStr(s) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
function _mulberry32(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function dailyQuestions(n) {
  const rng = _mulberry32(_seedFromStr(_todayKey()));
  const idx = allQuestions.map((_, i) => i);
  for (let i = idx.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); const t = idx[i]; idx[i] = idx[j]; idx[j] = t; }
  return idx.slice(0, n).map(i => allQuestions[i]);
}
function dailyDoneToday() { try { return localStorage.getItem('mathsgr2_daily_done') === _todayKey(); } catch (e) { return false; } }
function updateDailyBtn() {
  const btn = document.getElementById('daily-btn'); if (!btn) return;
  btn.innerHTML = dailyDoneToday() ? '✅ Défi du jour fait — rejouer' : '🔥 Défi du jour — 5 questions';
  btn.style.opacity = dailyDoneToday() ? '0.85' : '1';
}
function startDailyChallenge() {
  const qs = dailyQuestions(5);
  if (!qs.length) return;
  currentQuestions = qs.map(q => { const s = shuffleOptions(q); return { ...q, opts: s.opts, ans: s.ans }; });
  score = 0; answered = 0; skipped = 0; correctStreak = 0; currentActiveQuestion = 0; questionAnswered = [];
  timerIds.forEach(id => clearInterval(id)); timerIds = [];
  updateScore();
  try { localStorage.setItem('mathsgr2_daily_done', _todayKey()); } catch (e) {}
  missedOnlyMode = true; // réutilise le flag : startQuiz ne refiltre pas
  startQuiz();
  updateDailyBtn();
  if (typeof showToast === 'function') showToast('🔥 Défi du jour : 5 questions !', 'var(--color-droite)');
}

function buildQuiz() {
  const container = document.getElementById('quiz-container');
  container.innerHTML = '';
  quizResults = [];
  // Repart d'une liste d'erreurs vide à CHAQUE quiz : évite que les erreurs d'un quiz
  // abandonné (ex. chimie) ne « fuient » dans le récap d'un autre quiz (ex. histoire).
  try { const _d = loadSavedData(); _d.wrongQuestions = []; saveData(_d); } catch (e) {}
  if (currentQuestions.length === 0) {
    container.innerHTML = '<p style="text-align:center; padding:2rem; color:var(--text-secondary);">Aucune question ne correspond aux filtres.</p>';
    return;
  }

  const progEl = document.createElement('div');
  progEl.id = 'quiz-progress';
  progEl.className = 'quiz-progress';
  container.appendChild(progEl);

  // Instantané des questions RENDUES : answer()/skipQuestion() liront cette liste.
  // Même si un code re-mélange currentQuestions entre-temps, la correction reste
  // alignée sur ce qui est affiché à l'écran.
  window._renderedQuestions = currentQuestions;

  currentQuestions.forEach((q, i) => {
    const div = document.createElement('div');
    div.className = 'quiz-q';
    div.id = `quiz-q-${i}`;
    if (i > currentActiveQuestion) div.classList.add('quiz-locked');
    const difficultyClass = q.difficulty || 'intermediaire';
    div.innerHTML = `
      <div style="margin-bottom:1rem;">
        <div class="question" style="margin-bottom:0;">Q${i+1}. ${q.q} <span class="difficulty ${difficultyClass}">${q.difficulty}</span></div>
      </div>
      <div class="options" id="opts-${i}">${q.opts.map((o,j) => {
        const hasMath = o.includes('$') || o.includes('\\');
        const letter = ['A','B','C','D'][j];
        return `<button class="opt${hasMath ? ' math-opt' : ''}" onclick="answer(${i},${j})" id="opt-${i}-${j}"><span style="font-weight:700;color:var(--color-nav);margin-right:8px;font-size:12px;opacity:0.8;">${letter}.</span>${o}</button>`;
      }).join('')}</div>
      <div class="explanation" id="exp-${i}">${buildExplanation(q, i)}</div>
    `;
    container.appendChild(div);
  });

  updateQuizProgress();
  safeMathJax([container]);
}

// Construit le bloc d'explication enrichi d'une question de quiz.
// Champs optionnels par question (data.js) :
//   q.formula → encadré « Formule utilisée »  ·  q.demo → bouton « Voir l'animation »
//   q.simple  → panneau « explique simplement »  ·  q.deep → panneau « de A à Z »
// Rend cliquables les termes connus (fiches) dans une explication de quiz.
// Évité en maths (formules MathJax) ; sûr si TERM_MAP vide.
function _autolinkExp(html) {
  try {
    if (!html || window.currentSubject === 'maths') return html;
    if (typeof autolinkInfo !== 'function' || !window.TERM_MAP || !Object.keys(window.TERM_MAP).length) return html;
    return autolinkInfo(html, null);
  } catch (_) { return html; }
}

function buildExplanation(q, i) {
  let html = '<div class="exp-main">' + _autolinkExp(q.exp || '') + '</div>';
  if (q.formula) {
    html += '<div class="exp-formula"><span class="exp-formula-label">📐 Formule utilisée</span>' + q.formula + '</div>';
  }
  const btns = [];
  if (q.simple) btns.push('<button type="button" class="exp-btn" onclick="toggleExpExtra(\'simple-' + i + '\', this)">💬 Explique simplement</button>');
  if (q.deep)   btns.push('<button type="button" class="exp-btn" onclick="toggleExpExtra(\'deep-' + i + '\', this)">🧩 Je n\'avais jamais vu ça</button>');
  if (q.demo)   btns.push('<button type="button" class="exp-btn exp-btn-demo" onclick="openDemo(\'' + q.demo + '\')">▶ Voir l\'animation</button>');
  if (btns.length) html += '<div class="exp-btn-row">' + btns.join('') + '</div>';
  if (q.simple) html += '<div class="exp-extra" id="simple-' + i + '" style="display:none;"><span class="exp-extra-label">En clair</span>' + q.simple + '</div>';
  if (q.deep)   html += '<div class="exp-extra exp-extra-deep" id="deep-' + i + '" style="display:none;"><span class="exp-extra-label">De A à Z</span>' + q.deep + '</div>';
  return html;
}

// Affiche/masque un panneau d'explication (simple ou A-Z) et (re)rend MathJax.
function toggleExpExtra(id, btn) {
  const el = document.getElementById(id);
  if (!el) return;
  const open = el.style.display !== 'none';
  el.style.display = open ? 'none' : 'block';
  if (btn) btn.classList.toggle('on', !open);
  if (!open) safeMathJax([el]);
}

function startTimerForQuestion(index) {
  // Clear any existing timer for this question
  if (timerIds[index]) clearInterval(timerIds[index]);
  
  const q = currentQuestions[index];
  // AMÉLIORATION 3 — reset bar color when starting new question
  const barInit = document.getElementById(`timer-bar-${index}`);
  if (barInit) { barInit.style.background = 'var(--color-nav)'; barInit.style.width = '100%'; }
  const elInit = document.getElementById(`timer-${index}`);
  if (elInit) { elInit.style.color = 'var(--color-nav)'; }
  let t = 30;
  timerIds[index] = setInterval(() => {
    t--;
    const el = document.getElementById(`timer-${index}`);
    const bar = document.getElementById(`timer-bar-${index}`);
    if (!el) { clearInterval(timerIds[index]); return; }
    el.textContent = `${t}s`;
    if (bar) bar.style.width = `${(t / 30) * 100}%`;
    if (t <= 5) { el.style.color = '#f87171'; if (bar) bar.style.background = '#f87171'; }
    if (t <= 0) {
      clearInterval(timerIds[index]);
      el.textContent = '⏰';
      // Auto-skip si pas encore répondu — délègue à skipQuestion() pour un
      // comportement cohérent (XP, ajout aux erreurs, sauvegarde, calendrier).
      const opts = document.querySelectorAll(`#opts-${index} .opt`);
      const alreadyAnswered = Array.from(opts).some(o => o.classList.contains('disabled'));
      if (!alreadyAnswered) skipQuestion(index);
    }
  }, 1000);
}

function unlockNextQuestion() {
  if (currentActiveQuestion < currentQuestions.length - 1) {
    currentActiveQuestion++;
    const nextQ = document.getElementById(`quiz-q-${currentActiveQuestion}`);
    if (nextQ) {
      nextQ.classList.remove('quiz-locked');
      setTimeout(() => {
        nextQ.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    }
  }
  updateQuizProgress();
}


function answer(qi, chosen) {
  // Check if question is the active question
  if (qi !== currentActiveQuestion) return;
  // Check if question already answered to avoid race condition
  if (questionAnswered[qi]) return;
  questionAnswered[qi] = true;

  clearInterval(timerIds[qi]);
  const q = (window._renderedQuestions || currentQuestions)[qi];
  quizResults[qi] = (chosen === q.ans);
  const opts = document.querySelectorAll(`#opts-${qi} .opt`);
  opts.forEach((o,j) => {
    o.classList.add('disabled');
    if (j === q.ans) o.classList.add('correct');
    else if (j === chosen && chosen !== q.ans) o.classList.add('wrong');
  });
  document.getElementById(`exp-${qi}`).classList.add('show');

  // Amélioration — réponse fausse : bandeau « pourquoi » + ouverture auto de
  // l'explication « en clair » pour comprendre l'erreur tout de suite.
  if (chosen !== q.ans) {
    const _expEl = document.getElementById(`exp-${qi}`);
    if (_expEl && !_expEl.querySelector('.exp-wrong-banner')) {
      const _bn = document.createElement('div');
      _bn.className = 'exp-wrong-banner';
      _bn.style.cssText = 'background:rgba(248,113,113,0.12);border-left:3px solid #f87171;border-radius:0 8px 8px 0;padding:8px 12px;margin-bottom:10px;font-size:14px;color:var(--text-primary);';
      _bn.innerHTML = "❌ <strong>Ta réponse n'était pas la bonne.</strong> La bonne réponse est <strong style=\"color:#34d399;\">" + ['A','B','C','D'][q.ans] + "</strong>. Voici pourquoi 👇";
      _expEl.insertBefore(_bn, _expEl.firstChild);
    }
    const _simple = document.getElementById(`simple-${qi}`);
    if (_simple && _simple.style.display === 'none') {
      _simple.style.display = 'block';
      if (typeof safeMathJax === 'function') safeMathJax([_simple]);
    }
  }

  const correctBtn = document.getElementById(`opt-${qi}-${q.ans}`);
  if (correctBtn) correctBtn.style.transform = 'scale(1.02)';
  setTimeout(() => { if (correctBtn) correctBtn.style.transform = ''; }, 500);

  const data = loadSavedData();
  // Suivi de la réussite par chapitre (pour les Stats par chapitre)
  if (q.chapter) {
    data.chapterStats = data.chapterStats || {};
    var _cs = data.chapterStats[q.chapter] || { correct: 0, total: 0 };
    _cs.total++;
    if (chosen === q.ans) _cs.correct++;
    data.chapterStats[q.chapter] = _cs;
  }
  if (chosen === q.ans) {
    score++;
    correctStreak++;
    data.xp += (XP_BY_DIFF[q.difficulty] || 10);
    data.masteredQuestions[q.q] = (data.masteredQuestions[q.q] || 0) + 1;
    // Remove from missed questions if correct
    data.missedQuestions = (data.missedQuestions || []).filter(mq => mq !== q.q);
    showRewardAnimation('correct');
    if (correctStreak >= 10 && !data.badges.includes('10 bonnes d\'affilée')) {
      data.badges.push('10 bonnes d\'affilée');
    }
  } else {
    correctStreak = 0;
    data.wrongQuestions.push({q: q.q, chosen: q.opts[chosen], correct: q.opts[q.ans], exp: q.exp});
    // Add to missed questions for adaptive quiz
    data.missedQuestions = data.missedQuestions || [];
    if (!data.missedQuestions.includes(q.q)) {
      data.missedQuestions.push(q.q);
    }
  }
  updateLevel(data);
  updateCalendar(data);
  saveData(data);
  recordStudyAction();
  updateMissedBtn();

  answered++;
  updateScore();
  showConfidenceRating(qi);
  unlockNextQuestion();

  // Vérifier si toutes les questions ont reçu une réponse
  if (answered >= currentQuestions.length) {
    setTimeout(() => showQuizSummary(), 1500);
  }
}

function skipQuestion(qi) {
  // Check if question is the active question
  if (qi !== currentActiveQuestion) return;
  // Check if question already answered to avoid race condition
  if (questionAnswered[qi]) return;
  questionAnswered[qi] = true;

  skipped++;
  correctStreak = 0;
  const q = (window._renderedQuestions || currentQuestions)[qi];
  quizResults[qi] = 'skip';
  const opts = document.querySelectorAll(`#opts-${qi} .opt`);
  opts.forEach(o => o.classList.add('disabled'));
  // Show correct answer on skip, consistent with timer auto-skip (F19)
  const correctOpt = document.getElementById(`opt-${qi}-${q.ans}`);
  if (correctOpt) correctOpt.classList.add('correct');
  document.getElementById(`exp-${qi}`).classList.add('show');

  const data = loadSavedData();
  data.xp += 5;
  // I13 — Une question passée = non maîtrisée → l'ajouter aux ratées pour le quiz adaptatif
  data.missedQuestions = data.missedQuestions || [];
  if (!data.missedQuestions.includes(q.q)) {
    data.missedQuestions.push(q.q);
  }
  updateLevel(data);
  updateCalendar(data);
  saveData(data);
  updateMissedBtn();

  answered++;
  updateScore();
  unlockNextQuestion();

  if (answered >= currentQuestions.length) setTimeout(() => showQuizSummary(), 1000);
}

function showQuizSummary() {
  const container = document.getElementById('quiz-container');
  const data = loadSavedData();
  
  // Remove exam timer if present and reset exam state (E8)
  examActive = false;
  const examTimerEl = document.getElementById('exam-timer');
  if (examTimerEl) examTimerEl.remove();
  if (typeof examTimer !== 'undefined' && examTimer) { clearInterval(examTimer); examTimer = null; }
  const examBtn = document.getElementById('exam-toggle-btn');
  if (examBtn) examBtn.textContent = '5 questions, 5 min →';

  // Save quiz score to profile history BEFORE erasing container
  const finalScore = currentQuestions.length > 0 ? Math.round(score / currentQuestions.length * 100) : 0;
  const xpGained = score * 10 + skipped * 5;
  data.totalQuizzes = (data.totalQuizzes || 0) + 1;
  data.scoreHistory = data.scoreHistory || [];
  data.scoreHistory.push(finalScore);
  // I19 — Limiter l'historique à 100 entrées pour éviter de saturer localStorage
  if (data.scoreHistory.length > 100) data.scoreHistory = data.scoreHistory.slice(-100);
  data.totalScore = (data.totalScore || 0) + finalScore;
  if (finalScore > (data.bestScore || 0)) data.bestScore = finalScore;
  // Snapshot wrong questions for THIS session only, then clear (F8)
  const sessionWrongQuestions = [...(data.wrongQuestions || [])];
  data.wrongQuestions = [];
  saveData(data);

  // ── Examen blanc : note /20 + historique par matière ──
  var examBanner = '';
  var _wasExam = false;
  if (window._examRun) {
    window._examRun = false;
    _wasExam = true;
    var note = currentQuestions.length > 0 ? Math.round(score / currentQuestions.length * 20) : 0;
    var subj = window.currentSubject || 'maths';
    var d2 = loadSavedData();
    d2.examHistory = d2.examHistory || {};
    d2.examHistory[subj] = d2.examHistory[subj] || [];
    d2.examHistory[subj].push({ date: new Date().toISOString().slice(0, 10), note: note, total: currentQuestions.length });
    if (d2.examHistory[subj].length > 20) d2.examHistory[subj] = d2.examHistory[subj].slice(-20);
    saveData(d2);
    var hist = d2.examHistory[subj];
    var best = hist.reduce(function (m, h) { return Math.max(m, h.note); }, 0);
    var mention = note >= 16 ? '🏆 Excellent !' : (note >= 12 ? '👍 Bien' : (note >= 10 ? '🙂 Passable' : '💪 À retravailler'));
    var last = hist.slice(-5).reverse().map(function (h) { return '<span style="display:inline-block; background:rgba(255,255,255,0.06); border-radius:8px; padding:2px 8px; margin:2px; font-size:12px;">' + h.date + ' : <strong>' + h.note + '/20</strong></span>'; }).join('');
    examBanner = '<div class="formula-box" style="text-align:center; border:2px solid var(--color-nav);">' +
      '<h3 style="font-size:22px; font-weight:800; margin-bottom:0.3rem; color:var(--color-nav);">📝 Examen blanc terminé</h3>' +
      '<div class="score-num" style="font-size:52px;">' + note + '<span style="font-size:24px; color:var(--text-secondary);">/20</span></div>' +
      '<p style="font-size:16px; margin:0.3rem 0;">' + mention + ' &nbsp;·&nbsp; Record : <strong>' + best + '/20</strong></p>' +
      '<p style="font-size:13px; color:var(--text-secondary); margin-top:0.6rem;">Tes derniers examens :<br>' + last + '</p>' +
      '</div>';
    if (note >= 16 && typeof celebrate === 'function') setTimeout(function () { celebrate(note >= 20 ? '🏆 20/20 — Parfait !' : '🎓 ' + note + '/20 — Excellent !'); }, 250);
  }

  // Check for perfect quiz badge — exiger au moins 1 question pour éviter le badge sur quiz vide
  const isPerfect = currentQuestions.length > 0 && score === currentQuestions.length;
  if (isPerfect && !data.badges.includes('Quiz parfait')) {
    data.badges.push('Quiz parfait');
    saveData(data);
  }
  if (isPerfect) { showRewardAnimation('perfect'); if (typeof celebrate === 'function' && !_wasExam) setTimeout(function () { celebrate('💯 Quiz parfait !'); }, 200); }

  var _pct = currentQuestions.length > 0 ? Math.round(score / currentQuestions.length * 100) : 0;
  var _vc = _pct >= 80 ? '#34d399' : (_pct >= 50 ? 'var(--color-nav)' : '#f87171');
  var _vTxt = _pct >= 90 ? '🏆 Excellent !' : (_pct >= 70 ? '💪 Bien joué !' : (_pct >= 50 ? '🙂 Pas mal, continue !' : '📚 À retravailler — courage !'));
  var _ring = 'background:conic-gradient(' + _vc + ' ' + (_pct * 3.6) + 'deg, var(--border-subtle) 0deg);';
  let summaryHTML = examBanner + `
    <div class="formula-box" style="text-align:center;">
      <h3 style="font-size:24px; font-weight:700; margin-bottom:1rem;">📊 Quiz terminé !</h3>
      <div class="quiz-result-ring" style="${_ring}">
        <div class="quiz-result-inner">
          <div style="font-size:30px; font-weight:800; color:${_vc};">${_pct}%</div>
          <div style="font-size:13px; color:var(--text-secondary);">${score}/${currentQuestions.length}</div>
        </div>
      </div>
      <p style="font-size:18px; font-weight:700; margin:0.8rem 0 0.3rem; color:${_vc};">${_vTxt}</p>
      <p style="font-size:15px; color:var(--text-secondary);">⚡ XP gagné : +${xpGained}</p>
      <div style="display:flex; flex-wrap:wrap; gap:0.5rem; justify-content:center; margin-top:1rem;">
        <button class="nav-btn" onclick="shareScore()" style="background:linear-gradient(135deg,#a78bfa,#60a5fa); color:#fff; border:none;">📲 Partager</button>
        ${sessionWrongQuestions && sessionWrongQuestions.length ? '<button class="nav-btn" onclick="filterMissedOnly(); startQuiz();" style="background:rgba(248,113,113,0.14); border:1px solid #f87171; color:#f87171;">🔁 Rejouer mes erreurs</button>' : ''}
        <button class="nav-btn" onclick="resetQuiz()">🔄 Rejouer</button>
        <button class="nav-btn" onclick="backToQuizStart()">🏠 Accueil quiz</button>
      </div>
    </div>
  `;
  
  if (sessionWrongQuestions && sessionWrongQuestions.length > 0) {
    summaryHTML += `
      <h3 style="font-size:20px; font-weight:600; margin:2rem 0 1rem; color:var(--color-nav);">❌ Questions ratées</h3>
    `;
    sessionWrongQuestions.forEach((wq, i) => {
      summaryHTML += `
        <div class="quiz-q">
          <div class="question" style="font-size:16px;">${i+1}. ${wq.q}</div>
          <p style="color:#dc3545; font-size:14px; margin:0.5rem 0;">❌ Ta réponse : ${wq.chosen}</p>
          <p style="color:#28a745; font-size:14px; margin:0.5rem 0;">✅ Bonne réponse : ${wq.correct}</p>
          <p style="color:var(--text-secondary); font-size:14px; margin:0.5rem 0;">${_autolinkExp(wq.exp || '')}</p>
        </div>
      `;
    });
  }
  
  container.innerHTML = summaryHTML;
  safeMathJax([container]); // rendre les formules (fractions, racines) du récap
}

// ── PARTAGE DE SCORE : génère une carte-image (story Insta/TikTok) ──
const SHARE_URL = 'https://drackson227.github.io/Math/';
function _scoreVerdict(pct) {
  if (pct >= 100) return { txt: 'PARFAIT !', emoji: '🏆' };
  if (pct >= 80)  return { txt: 'EXCELLENT !', emoji: '🔥' };
  if (pct >= 60)  return { txt: 'BIEN JOUÉ', emoji: '💪' };
  if (pct >= 40)  return { txt: 'CONTINUE !', emoji: '📈' };
  return { txt: 'À RETRAVAILLER', emoji: '📚' };
}
function _roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
// Libellé de la matière active (pour partages, cartes de score, etc.)
function _subjLabel() {
  try {
    if (window.SUBJECTS && window.currentSubject && window.SUBJECTS[window.currentSubject]) {
      return window.SUBJECTS[window.currentSubject].label || 'Révisions';
    }
  } catch (_) {}
  return 'Révisions';
}
async function buildScoreCard(score, total, pct) {
  try { if (document.fonts && document.fonts.ready) await document.fonts.ready; } catch (_) {}
  const W = 1080, H = 1080;
  const c = document.createElement('canvas'); c.width = W; c.height = H;
  const ctx = c.getContext('2d');
  // Fond dégradé sombre
  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, '#1b1635'); bg.addColorStop(1, '#0d0f16');
  ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
  // Halo violet/bleu décoratif
  const halo = ctx.createRadialGradient(W / 2, 470, 60, W / 2, 470, 520);
  halo.addColorStop(0, 'rgba(139,109,250,0.30)'); halo.addColorStop(1, 'rgba(13,15,22,0)');
  ctx.fillStyle = halo; ctx.fillRect(0, 0, W, H);
  ctx.textAlign = 'center';
  // Titre
  const tg = ctx.createLinearGradient(W / 2 - 230, 0, W / 2 + 230, 0);
  tg.addColorStop(0, '#a78bfa'); tg.addColorStop(1, '#60a5fa');
  ctx.fillStyle = tg; ctx.font = '800 76px Inter, Arial, sans-serif';
  ctx.fillText('GR2 Study', W / 2, 200);
  ctx.fillStyle = 'rgba(255,255,255,0.55)'; ctx.font = '500 30px Inter, Arial, sans-serif';
  ctx.fillText(_subjLabel(), W / 2, 250);
  // Verdict emoji
  const v = _scoreVerdict(pct);
  ctx.font = '120px Arial'; ctx.fillText(v.emoji, W / 2, 430);
  // Score géant
  ctx.fillStyle = tg; ctx.font = '800 230px Inter, Arial, sans-serif';
  ctx.fillText(score + '/' + total, W / 2, 660);
  // Pourcentage
  ctx.fillStyle = '#ffffff'; ctx.font = '700 64px Inter, Arial, sans-serif';
  ctx.fillText(pct + '%', W / 2, 750);
  // Verdict texte
  ctx.fillStyle = '#22c55e'; ctx.font = '700 44px Inter, Arial, sans-serif';
  ctx.fillText(v.txt, W / 2, 830);
  // Pastille d'appel à l'action
  ctx.fillStyle = 'rgba(255,255,255,0.07)';
  _roundRect(ctx, W / 2 - 360, 910, 720, 96, 48); ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,0.92)'; ctx.font = '600 36px Inter, Arial, sans-serif';
  ctx.fillText('🎯 À toi de battre mon score !', W / 2, 970);
  // URL
  ctx.fillStyle = 'rgba(255,255,255,0.45)'; ctx.font = '500 30px Inter, Arial, sans-serif';
  ctx.fillText('drackson227.github.io/Math', W / 2, 1040);
  return c;
}
async function shareScore() {
  const total = (typeof currentQuestions !== 'undefined' && currentQuestions) ? currentQuestions.length : 0;
  const sc = (typeof score !== 'undefined') ? score : 0;
  const pct = total > 0 ? Math.round(sc / total * 100) : 0;
  let canvas;
  try { canvas = await buildScoreCard(sc, total, pct); }
  catch (e) { if (typeof showToast === 'function') showToast('Impossible de générer l’image 😕', '#dc3545'); return; }
  const text = `J'ai eu ${sc}/${total} (${pct}%) en ${_subjLabel()} sur GR2 Study ! 🔥 Essaie : ${SHARE_URL}`;
  canvas.toBlob(async (blob) => {
    if (!blob) return;
    const file = new File([blob], 'mathsgr2-score.png', { type: 'image/png' });
    // Partage natif (mobile) avec l'image si possible
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try { await navigator.share({ files: [file], title: 'Mon score GR2 Study', text }); return; }
      catch (e) { if (e && e.name === 'AbortError') return; }
    }
    // Repli : téléchargement de l'image + copie du texte
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'mathsgr2-score.png';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 3000);
    try { if (navigator.clipboard) await navigator.clipboard.writeText(text); } catch (_) {}
    if (typeof showToast === 'function') showToast('🖼️ Image téléchargée — poste-la en story !', 'var(--color-nav)');
  }, 'image/png');
}

// ── FICHE DE RÉVISION IMPRIMABLE / PDF ──
function printRevisionSheet() {
  var sheet = document.getElementById('revision-sheet');
  if (!sheet) return;
  // Matières non-maths : fiche générée à partir des flashcards (Q → R), groupées par chapitre.
  if (window.currentSubject && window.currentSubject !== 'maths') {
    printRevisionSheetGeneric(sheet);
    return;
  }
  var section = function (title, color, items) {
    return '<div class="rs-block"><h2 style="color:' + color + '">' + title + '</h2>' +
      items.map(function (it) {
        return '<div class="rs-item"><span class="rs-label">' + it[0] + '</span><span class="rs-formula">\\(' + it[1] + '\\)</span></div>';
      }).join('') + '</div>';
  };
  sheet.innerHTML =
    '<div class="rs-head"><h1>📐 Fiche de révision — Maths GR2</h1>' +
    '<p>Géométrie analytique plane · drackson227.github.io/Math</p></div>' +
    '<div class="rs-grid">' +
    section('Vecteurs', '#7c3aed', [
      ['Composantes', '\\vec{AB}=(x_B-x_A\\,;\\,y_B-y_A)'],
      ['Norme', '\\|\\vec{AB}\\|=\\sqrt{x^2+y^2}'],
      ['Distance A→B', 'AB=\\sqrt{(x_B-x_A)^2+(y_B-y_A)^2}'],
      ['Milieu', 'M\\left(\\tfrac{x_A+x_B}{2}\\,;\\,\\tfrac{y_A+y_B}{2}\\right)'],
      ['Relation de Chasles', '\\vec{AB}+\\vec{BC}=\\vec{AC}'],
      ['Colinéarité', 'x\\,y\'-y\\,x\'=0']
    ]) +
    section('Cercle', '#2563eb', [
      ['Forme canonique', '(x-x_0)^2+(y-y_0)^2=R^2'],
      ['Forme développée', 'x^2+y^2+ax+by+c=0'],
      ['Centre', 'C\\left(-\\tfrac{a}{2}\\,;\\,-\\tfrac{b}{2}\\right)'],
      ['Rayon', 'R=\\tfrac{\\sqrt{a^2+b^2-4c}}{2}'],
      ['Existence', 'a^2+b^2-4c>0'],
      ['Distance point-centre', 'd=\\sqrt{(x_P-x_0)^2+(y_P-y_0)^2}']
    ]) +
    section('Droites', '#d97706', [
      ['Forme explicite', 'y=mx+p'],
      ['Pente (2 points)', 'm=\\tfrac{y_B-y_A}{x_B-x_A}'],
      ['Vecteur directeur', '\\vec{u}=(-b\\,;\\,a)'],
      ['Vecteur normal', '\\vec{n}=(a\\,;\\,b)'],
      ['Parallèles / perp.', 'm_1=m_2\\quad|\\quad m\\cdot m\'=-1'],
      ['Distance point-droite', 'd=\\tfrac{|ax_P+by_P+c|}{\\sqrt{a^2+b^2}}']
    ]) +
    '</div>';
  var doPrint = function () { setTimeout(function () { window.print(); }, 60); };
  if (window.MathJax && MathJax.typesetPromise) {
    MathJax.typesetPromise([sheet]).then(doPrint).catch(doPrint);
  } else { doPrint(); }
}

// Fiche de révision générique (toute matière) : bâtie depuis les flashcards, groupées par chapitre.
function _stripTags(s) { return String(s).replace(/<[^>]+>/g, ''); }
function printRevisionSheetGeneric(sheet) {
  var cards = (typeof flashcards !== 'undefined' ? flashcards : []) || [];
  var order = (typeof CHAP_ORDER !== 'undefined' && CHAP_ORDER && CHAP_ORDER.length) ? CHAP_ORDER : [];
  var labels = (typeof CHAP_LABELS !== 'undefined' && CHAP_LABELS) ? CHAP_LABELS : {};
  var byChap = {};
  cards.forEach(function (c) { var ch = c.chapter || 'autres'; (byChap[ch] = byChap[ch] || []).push(c); });
  var chaps = order.filter(function (ch) { return byChap[ch]; });
  Object.keys(byChap).forEach(function (ch) { if (chaps.indexOf(ch) < 0) chaps.push(ch); });
  var palette = ['#a78bfa', '#60a5fa', '#34d399', '#fbbf24', '#f472b6', '#22d3ee', '#fb7185', '#c084fc'];
  var subEl = document.getElementById('app-subtitle');
  var subtitle = subEl ? (subEl.textContent || '') : '';
  var titleMain = subtitle.split('—')[0].trim() || 'Révision';
  var blocks = chaps.map(function (ch, i) {
    var color = palette[i % palette.length];
    var items = byChap[ch].map(function (c) {
      return '<div class="rs-item rs-qa"><span class="rs-label">' + _stripTags(c.front) + '</span><span class="rs-answer">' + c.back + '</span></div>';
    }).join('');
    return '<div class="rs-block"><h2 style="color:' + color + '">' + (labels[ch] || ch) + '</h2>' + items + '</div>';
  }).join('');
  sheet.innerHTML =
    '<div class="rs-head"><h1>📄 Fiche de révision — ' + titleMain + '</h1>' +
    '<p>' + subtitle + ' · drackson227.github.io/Math</p></div>' +
    '<div class="rs-grid">' + (blocks || '<p>Pas encore de fiches pour cette matière.</p>') + '</div>';
  var doPrint = function () { setTimeout(function () { window.print(); }, 60); };
  if (window.MathJax && MathJax.typesetPromise) {
    MathJax.typesetPromise([sheet]).then(doPrint).catch(doPrint);
  } else { doPrint(); }
}

// ── STATS PAR CHAPITRE (écran d'accueil quiz) ──
var CHAP_LABELS = { vecteur: 'Vecteurs', cercle: 'Cercle', droite: 'Droites' };
var CHAP_ORDER = ['vecteur', 'cercle', 'droite'];
// XP gagné par bonne réponse selon la difficulté (le classement récompense les questions dures)
var XP_BY_DIFF = { facile: 5, intermediaire: 10, difficile: 15, avance: 20 };
// Niveaux de difficulté : poids pour la maîtrise pondérée (une difficile « vaut » plus qu'une facile)
var DIFFS = [
  { key: 'facile',        label: 'Facile',   w: 1 },
  { key: 'intermediaire', label: 'Inter.',   w: 2 },
  { key: 'difficile',     label: 'Difficile',w: 3 },
  { key: 'avance',        label: 'Avancé',   w: 4 }
];
function _statColor(p) { return p >= 75 ? '#22c55e' : (p >= 50 ? '#f59e0b' : '#ef4444'); }
// Maîtrise d'un chapitre : on regarde TOUTES les questions du chapitre (pas seulement celles tentées).
// Une question est « maîtrisée » si réussie AU MOINS 2 FOIS et pas en cours d'erreur. Les difficiles pèsent plus.
function _chapterMastery(ch, mastered, missedSet) {
  var per = {}; DIFFS.forEach(function (d) { per[d.key] = { tot: 0, mas: 0 }; });
  (typeof allQuestions !== 'undefined' ? allQuestions : []).forEach(function (q) {
    if (q.chapter !== ch) return;
    var dk = per[q.difficulty] ? q.difficulty : 'facile';
    per[dk].tot++;
    if ((mastered[q.q] || 0) >= 2 && !(missedSet && missedSet[q.q])) per[dk].mas++;
  });
  var totW = 0, masW = 0;
  DIFFS.forEach(function (d) { totW += per[d.key].tot * d.w; masW += per[d.key].mas * d.w; });
  return { per: per, pct: totW > 0 ? Math.round(masW / totW * 100) : 0 };
}
function renderChapterStats() {
  var box = document.getElementById('chapter-stats');
  if (!box) return;
  var data = loadSavedData();
  var cs = data.chapterStats || {};
  var mastered = data.masteredQuestions || {};
  var missedSet = {}; (data.missedQuestions || []).forEach(function (m) { missedSet[m] = true; });
  var done = CHAP_ORDER.filter(function (c) { return cs[c] && cs[c].total > 0; });
  if (!done.length) {
    box.innerHTML = '<div class="chap-card"><div class="chap-title">📊 Tes stats par chapitre</div>' +
      '<p class="chap-empty">Réponds à quelques questions du quiz pour découvrir tes points forts et tes points faibles ici. 💪</p></div>';
    return;
  }
  var weakest = null, weakPct = 101;
  var rows = CHAP_ORDER.map(function (ch) {
    if (!cs[ch] || !cs[ch].total) return '';
    var st = _chapterMastery(ch, mastered, missedSet);
    if (st.pct < weakPct) { weakPct = st.pct; weakest = ch; }
    var subs = DIFFS.map(function (d) {
      var p = st.per[d.key];
      if (p.tot === 0) return '';
      var pc = Math.round(p.mas / p.tot * 100);
      return '<div class="chap-sub"><span class="chap-subname">' + d.label + '</span>' +
        '<span class="chap-bar mini"><span class="chap-fill" style="width:' + pc + '%; background:' + _statColor(pc) + ';"></span></span>' +
        '<span class="chap-subpct">' + p.mas + '/' + p.tot + '</span></div>';
    }).join('');
    return '<div class="chap-block">' +
      '<div class="chap-row"><span class="chap-name">' + CHAP_LABELS[ch] + '</span>' +
      '<span class="chap-bar"><span class="chap-fill" style="width:' + st.pct + '%; background:' + _statColor(st.pct) + ';"></span></span>' +
      '<span class="chap-pct" style="color:' + _statColor(st.pct) + ';">' + st.pct + '%</span></div>' +
      '<div class="chap-subs">' + subs + '</div></div>';
  }).join('');
  var reco;
  if (weakest && weakPct < 75) {
    reco = '<div class="chap-reco">🎯 À réviser en priorité : <strong>' + CHAP_LABELS[weakest] + '</strong> (' + weakPct + '%)' +
      '<button class="chap-revise" onclick="reviseChapter(\'' + weakest + '\')">Réviser ce chapitre →</button></div>';
  } else {
    reco = '<div class="chap-reco">🌟 Maîtrise complète, bravo ! Tu as réussi des questions de chaque niveau.</div>';
  }
  box.innerHTML = '<div class="chap-card"><div class="chap-title">📊 Tes stats par chapitre</div>' +
    '<p class="chap-help">Barre du haut = maîtrise globale (les questions difficiles comptent plus). En dessous, ta réussite niveau par niveau.</p>' +
    rows + reco + '</div>';
}
function updateLevel(data) {
  if (data.xp >= 300) {
    data.level = 'Expert GR2';
    if (!data.badges.includes('Analyste')) data.badges.push('Analyste');
    if (!data.badges.includes('Expert GR2')) data.badges.push('Expert GR2');
  } else if (data.xp >= 100) {
    data.level = 'Analyste';
    if (!data.badges.includes('Analyste')) data.badges.push('Analyste');
  } else {
    data.level = 'Apprenti';
  }
}

function updateCalendar(data) {
  // I17 — Utiliser la date locale (pas UTC) pour éviter le décalage belge (UTC+2)
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
  data.calendar[today] = (data.calendar[today] || 0) + 1;
  
  const yesterdayDate = new Date(now);
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const yesterday = `${yesterdayDate.getFullYear()}-${String(yesterdayDate.getMonth()+1).padStart(2,'0')}-${String(yesterdayDate.getDate()).padStart(2,'0')}`;
  if (data.lastDate === yesterday) {
    data.streak++;
  } else if (data.lastDate !== today) {
    data.streak = 1;
  }
  data.lastDate = today;
  
  if (data.streak >= 5 && !data.badges.includes('Persévérance')) {
    data.badges.push('Persévérance');
  }
}

function updateScore() {
  const answeredNotSkipped = answered - skipped;
  const wrong = answeredNotSkipped - score;
  const scoreEl = document.getElementById('score-display');
  const progEl = document.getElementById('prog-fill');
  if (scoreEl) {
    if (answeredNotSkipped === 0) {
      scoreEl.textContent = '—/—';
    } else {
      scoreEl.textContent = `✅ ${score} bonnes · ❌ ${wrong} ratées${skipped > 0 ? ` · ⏭ ${skipped} passée${skipped > 1 ? 's' : ''}` : ''}`;
    }
  }
  const total = currentQuestions.length;
  const percent = total > 0 ? Math.round(answeredNotSkipped / total * 100) : 0;
  if (progEl) progEl.style.width = `${percent}%`;
  const data = loadSavedData();
  const bsEl = document.getElementById('best-score-display');
  if (bsEl) bsEl.textContent = `Meilleur score : ${data.bestScore || 0}%`;
}

function startQuiz() {
  if (!missedOnlyMode) filterQuiz(true);
  missedOnlyMode = false; // Reset flag
  if (currentQuestions.length === 0) {
    // Filtre (chapitre + difficulté) sans aucune question : on prévient au lieu de ne rien faire.
    if (typeof showToast === 'function') showToast('Aucune question pour ce filtre — change de chapitre ou de difficulté.', '#fbbf24');
    return;
  }
  buildQuiz();
  document.getElementById('quiz-start-screen').style.display = 'none';
  document.getElementById('quiz-active-screen').style.display = 'block';
  // On amène l'écran sur la 1re question (sinon elle reste cachée sous la nav)
  setTimeout(function () {
    var s = document.getElementById('quiz-active-screen');
    if (s && s.style.display !== 'none') { try { s.scrollIntoView({ behavior: 'smooth', block: 'start' }); } catch (_) {} }
  }, 80);
}

function backToQuizStart() {
  // Stopper les timers quiz
  timerIds.forEach(id => clearInterval(id));
  timerIds = [];
  // I14 — Stopper aussi l'examen s'il est en cours
  if (examActive) {
    examActive = false;
    if (examTimer) { clearInterval(examTimer); examTimer = null; }
    const banner = document.getElementById('exam-timer');
    if (banner) banner.remove();
    const examBtn = document.getElementById('exam-toggle-btn');
    if (examBtn) examBtn.textContent = '5 questions, 5 min →';
  }
  document.getElementById('quiz-active-screen').style.display = 'none';
  document.getElementById('quiz-start-screen').style.display = 'block';
  const data = loadSavedData();
  const bsDisplayEl = document.getElementById('best-score-display'); if(bsDisplayEl) bsDisplayEl.textContent = `Meilleur score : ${data.bestScore || 0}%`;
  if (typeof renderChapterStats === 'function') renderChapterStats();
}

function resetQuiz() {
  // Clear all individual timers
  timerIds.forEach(id => clearInterval(id));
  timerIds = [];
  score = 0; answered = 0; skipped = 0; correctStreak = 0;
  currentActiveQuestion = 0;
  questionAnswered = [];
  updateScore();
  document.getElementById('score-display').textContent = '—/—';
  // Si on est sur l'écran actif, rebuilder; sinon revenir à l'accueil
  const activeScreen = document.getElementById('quiz-active-screen');
  if (activeScreen && activeScreen.style.display !== 'none') {
    filterQuiz(true);
    buildQuiz();
  } else {
    startQuiz();
  }
}

function toggleSettings() { document.getElementById('settings-panel').classList.toggle('show'); }

function setTheme(theme) {
  const root = document.documentElement;
  const themes = {
    default: {
      '--bg-main':'#0f1117','--bg-container':'#1a1d2e','--bg-card':'#1e2235',
      '--bg-card-hover':'#252840','--bg-formula':'#0d1117',
      '--text-primary':'#e2e8f0','--text-secondary':'#94a3b8',
      '--color-cercle':'#60a5fa','--color-cercle-light':'rgba(96,165,250,0.12)','--shadow-glow-cercle':'0 0 20px rgba(96,165,250,0.2)','--shadow-glow-parabole':'0 0 20px rgba(52,211,153,0.2)','--shadow-glow-droite':'0 0 20px rgba(251,191,36,0.2)','--shadow-glow-nav':'0 0 20px rgba(167,139,250,0.2)','--color-parabole-light':'rgba(52,211,153,0.12)','--color-droite-light':'rgba(251,191,36,0.12)','--color-parabole':'#34d399',
      '--color-droite':'#fbbf24','--color-nav':'#a78bfa',
      '--border-subtle':'rgba(255,255,255,0.08)',
      '--aurora-f1':'#2d1b69','--aurora-f2':'#4a1fa8','--aurora-f3':'#1a4fd6','--aurora-f4':'#0e9fbd',
      '--aurora-b1':'#0d4f3c','--aurora-b2':'#1a8a6b','--aurora-b3':'#2c7a6e','--aurora-b4':'#0f4d6e'
    },
    forest: {
      '--bg-main':'#0a1a0f','--bg-container':'#0f2318','--bg-card':'#132b1c',
      '--bg-card-hover':'#1a3a25','--bg-formula':'#071209',
      '--text-primary':'#d4edda','--text-secondary':'#7fba94',
      '--color-cercle':'#4ade80','--color-cercle-light':'rgba(74,222,128,0.12)','--color-parabole-light':'rgba(134,239,172,0.12)','--color-droite-light':'rgba(253,230,138,0.12)','--shadow-glow-cercle':'0 0 20px rgba(74,222,128,0.2)','--shadow-glow-parabole':'0 0 20px rgba(134,239,172,0.2)','--shadow-glow-droite':'0 0 20px rgba(253,230,138,0.2)','--shadow-glow-nav':'0 0 20px rgba(110,231,183,0.2)','--color-parabole':'#86efac',
      '--color-droite':'#fde68a','--color-nav':'#6ee7b7',
      '--border-subtle':'rgba(74,222,128,0.12)',
      '--aurora-f1':'#052e16','--aurora-f2':'#064e3b','--aurora-f3':'#0a3d1f','--aurora-f4':'#1a5c2a',
      '--aurora-b1':'#0f4a2d','--aurora-b2':'#1a7a4a','--aurora-b3':'#2d6b3c','--aurora-b4':'#0a3020'
    },
    ocean: {
      '--bg-main':'#050d1a','--bg-container':'#0a1628','--bg-card':'#0d1f35',
      '--bg-card-hover':'#122844','--bg-formula':'#030a12',
      '--text-primary':'#cce7ff','--text-secondary':'#7eb8e8',
      '--color-cercle':'#38bdf8','--color-cercle-light':'rgba(56,189,248,0.12)','--color-parabole-light':'rgba(34,211,238,0.12)','--color-droite-light':'rgba(251,146,60,0.12)','--shadow-glow-cercle':'0 0 20px rgba(56,189,248,0.2)','--shadow-glow-parabole':'0 0 20px rgba(34,211,238,0.2)','--shadow-glow-droite':'0 0 20px rgba(251,146,60,0.2)','--shadow-glow-nav':'0 0 20px rgba(129,140,248,0.2)','--color-parabole':'#22d3ee',
      '--color-droite':'#fb923c','--color-nav':'#818cf8',
      '--border-subtle':'rgba(56,189,248,0.12)',
      '--aurora-f1':'#0c2a5e','--aurora-f2':'#0a3d7a','--aurora-f3':'#0e4f9e','--aurora-f4':'#0b3560',
      '--aurora-b1':'#0a2540','--aurora-b2':'#0d3a6e','--aurora-b3':'#102d55','--aurora-b4':'#081a35'
    },
    sunset: {
      '--bg-main':'#1a0a05','--bg-container':'#2a1208','--bg-card':'#341608',
      '--bg-card-hover':'#431c0a','--bg-formula':'#110602',
      '--text-primary':'#fde8d8','--text-secondary':'#d4956a',
      '--color-cercle':'#fb923c','--color-cercle-light':'rgba(251,146,60,0.12)','--color-parabole-light':'rgba(248,113,113,0.12)','--color-droite-light':'rgba(251,191,36,0.12)','--shadow-glow-cercle':'0 0 20px rgba(251,146,60,0.2)','--shadow-glow-parabole':'0 0 20px rgba(248,113,113,0.2)','--shadow-glow-droite':'0 0 20px rgba(251,191,36,0.2)','--shadow-glow-nav':'0 0 20px rgba(244,114,182,0.2)','--color-parabole':'#f87171',
      '--color-droite':'#fbbf24','--color-nav':'#f472b6',
      '--border-subtle':'rgba(251,146,60,0.12)',
      '--aurora-f1':'#450a0a','--aurora-f2':'#7f1d1d','--aurora-f3':'#92400e','--aurora-f4':'#78350f',
      '--aurora-b1':'#4a0e0e','--aurora-b2':'#6b1a1a','--aurora-b3':'#5c1a05','--aurora-b4':'#3d0f05'
    },
    minimal: {
      '--bg-main':'#eef1f5','--bg-container':'#f8f9fb','--bg-card':'#e8ecf1',
      '--bg-card-hover':'#dde3ea','--bg-formula':'#e2e6eb',
      '--text-primary':'#1a202c','--text-secondary':'#4a5568',
      '--color-cercle':'#1d4ed8','--color-cercle-light':'rgba(29,78,216,0.12)','--color-parabole-light':'rgba(4,120,87,0.12)','--color-droite-light':'rgba(180,83,9,0.12)','--shadow-glow-cercle':'0 0 20px rgba(29,78,216,0.2)','--shadow-glow-parabole':'0 0 20px rgba(4,120,87,0.2)','--shadow-glow-droite':'0 0 20px rgba(180,83,9,0.2)','--shadow-glow-nav':'0 0 20px rgba(109,40,217,0.2)','--color-parabole':'#047857',
      '--color-droite':'#b45309','--color-nav':'#6d28d9',
      '--border-subtle':'rgba(0,0,0,0.1)',
      '--aurora-f1':'#0a0028','--aurora-f2':'#1a0070','--aurora-f3':'#0e4fbd','--aurora-f4':'#0099cc',
      '--aurora-b1':'#001a4a','--aurora-b2':'#003080','--aurora-b3':'#0050a0','--aurora-b4':'#006080'
    },
    midnight: {
      '--bg-main':'#000010','--bg-container':'#05051a','--bg-card':'#0a0a25',
      '--bg-card-hover':'#0f0f35','--bg-formula':'#03030f',
      '--text-primary':'#e8e8ff','--text-secondary':'#8888cc',
      '--color-cercle':'#7c9bff','--color-cercle-light':'rgba(124,155,255,0.12)','--color-parabole-light':'rgba(94,234,176,0.12)','--color-droite-light':'rgba(255,204,68,0.12)','--shadow-glow-cercle':'0 0 20px rgba(124,155,255,0.2)','--shadow-glow-parabole':'0 0 20px rgba(94,234,176,0.2)','--shadow-glow-droite':'0 0 20px rgba(255,204,68,0.2)','--shadow-glow-nav':'0 0 20px rgba(204,136,255,0.2)','--color-parabole':'#5eeab0',
      '--color-droite':'#ffcc44','--color-nav':'#cc88ff',
      '--border-subtle':'rgba(150,150,255,0.1)',
      '--aurora-f1':'#0a0028','--aurora-f2':'#1a0070','--aurora-f3':'#0e4fbd','--aurora-f4':'#0099cc',
      '--aurora-b1':'#001a4a','--aurora-b2':'#003080','--aurora-b3':'#0050a0','--aurora-b4':'#006080'
    }
  };
  const t = themes[theme] || themes.default;
  Object.entries(t).forEach(([k,v]) => root.style.setProperty(k, v));
  // F1 — activer/désactiver la classe theme-light pour le thème clair
  document.body.classList.toggle('theme-light', theme === 'minimal');
  localStorage.setItem('mathsgr2_theme', theme);
  document.querySelectorAll('.theme-btn[onclick^="setTheme"]').forEach(b => b.classList.remove('active'));
  const activeBtn = document.querySelector(`.theme-btn[onclick="setTheme('${theme}')"]`);
  if (activeBtn) activeBtn.classList.add('active');
  // Si le mode « couleur par matière » est actif, l'accent de la matière reprend le dessus
  if (typeof applySubjectAccent === 'function') applySubjectAccent();
}


function setTextSize(size) {
  document.body.classList.remove('text-small','text-large','text-xlarge');
  if (size && size !== 'normal') document.body.classList.add(`text-${size}`);
  localStorage.setItem('mathsgr2_textsize', size);
  // Update the select to reflect saved value
  const sel = document.querySelector('.settings-row select[onchange*="setTextSize"]');
  if (sel) sel.value = size;
}

let focusCards = [];
let focusIndex = 0;

// focusContent défini dans data.js

function toggleFocusMode() {
  const overlay = document.getElementById('focus-overlay');
  overlay.classList.toggle('show');
  // H2 — Réinitialiser vers la sélection SEULEMENT à l'ouverture, pas à la fermeture
  if (overlay.classList.contains('show')) {
    rebuildFocusChapters();   // chapitres de la matière active
    document.getElementById('focus-selection').style.display = 'block';
    document.getElementById('focus-cards').style.display = 'none';
  }
}

// Nombre de fiches focus pour un chapitre : cartes "focus" dédiées (maths) ou flashcards du chapitre.
function focusCountFor(ch) {
  if (typeof focusContent !== 'undefined' && focusContent[ch]) return focusContent[ch].length;
  if (typeof flashcards !== 'undefined' && flashcards) return flashcards.filter(c => c.chapter === ch).length;
  return 0;
}

// Construit la sélection de chapitres du Mode Focus selon la matière active.
function rebuildFocusChapters() {
  const grid = document.getElementById('focus-chapter-grid');
  if (!grid) return;
  const order = (typeof CHAP_ORDER !== 'undefined' && CHAP_ORDER) ? CHAP_ORDER : [];
  const labels = (typeof CHAP_LABELS !== 'undefined' && CHAP_LABELS) ? CHAP_LABELS : {};
  const usable = order.filter(ch => focusCountFor(ch) > 0);
  if (!usable.length) { grid.innerHTML = '<p style="color:var(--text-secondary); grid-column:1/-1;">Aucune fiche disponible pour cette matière.</p>'; return; }
  grid.innerHTML = usable.map(ch => {
    const n = focusCountFor(ch);
    return '<button class="focus-chap-btn" onclick="startFocus(\'' + ch + '\')">' +
      '<span style="font-size:15px; font-weight:700;">' + (labels[ch] || ch) + '</span>' +
      '<span style="font-size:11px; font-weight:400; color:var(--text-secondary); display:block; margin-top:4px;">' + n + ' fiche' + (n > 1 ? 's' : '') + '</span>' +
      '</button>';
  }).join('');
}

function startFocus(chapter) {
  let cards = (typeof focusContent !== 'undefined' && focusContent[chapter]) ? focusContent[chapter] : null;
  if (!cards && typeof flashcards !== 'undefined' && flashcards) {
    // Repli pour les matières sans "focusContent" dédié : on réutilise les flashcards du chapitre.
    cards = flashcards.filter(c => c.chapter === chapter).map(c => ({ title: c.front, content: c.back, note: '' }));
  }
  focusCards = cards || [];
  focusIndex = 0;
  document.getElementById('focus-selection').style.display = 'none';
  document.getElementById('focus-cards').style.display = 'block';
  showFocusCard();
}

function showFocusCard() {
  if (focusCards.length === 0) return;
  const card = focusCards[focusIndex];
  // Disable prev/next buttons at boundaries
  const prevBtn = document.querySelector('#focus-cards .focus-nav .focus-btn:nth-child(2)');
  const nextBtn = document.querySelector('#focus-cards .focus-nav .focus-btn:nth-child(3)');
  if (prevBtn) { prevBtn.disabled = focusIndex === 0; prevBtn.style.opacity = focusIndex === 0 ? '0.4' : '1'; prevBtn.style.cursor = focusIndex === 0 ? 'not-allowed' : 'pointer'; }
  if (nextBtn) { nextBtn.disabled = focusIndex >= focusCards.length - 1; nextBtn.style.opacity = focusIndex >= focusCards.length - 1 ? '0.4' : '1'; nextBtn.style.cursor = focusIndex >= focusCards.length - 1 ? 'not-allowed' : 'pointer'; }
  document.getElementById('focus-card-content').innerHTML = `
    <h3 style="font-size:24px; font-weight:600; color:var(--color-nav); margin-bottom:1rem;">${card.title}</h3>
    <div style="font-size:28px; margin:1.5rem 0;">${card.content}</div>
    <p style="font-size:16px; color:var(--text-secondary);">${card.note}</p>
  `;
  document.getElementById('focus-counter').textContent = `${focusIndex + 1} / ${focusCards.length}`;
  document.getElementById('focus-progress').style.width = `${((focusIndex + 1) / focusCards.length) * 100}%`;
  safeMathJax([document.getElementById('focus-card-content')]);
}

function nextFocusCard() {
  if (focusIndex < focusCards.length - 1) {
    focusIndex++;
    showFocusCard();
  }
}

function prevFocusCard() {
  if (focusIndex > 0) {
    focusIndex--;
    showFocusCard();
  }
}

function backToFocusSelection() {
  document.getElementById('focus-selection').style.display = 'block';
  document.getElementById('focus-cards').style.display = 'none';
}

function showExerciseStep(btn, stepNum) {
  const card = btn.closest('.exercise-card');
  const step = card.querySelector(`.exercise-step[data-step="${stepNum}"]`);
  if (step) {
    step.classList.add('show');
    btn.textContent = '✅ Étape révélée';
    btn.disabled = true;
    btn.style.opacity = '0.55';
    btn.style.cursor = 'default';
    safeMathJax([step]);
  }
}

// ===== Exercice interactif « légende le schéma » =====
function normLabel(s) {
  return (s || '').toString().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/['’()]/g, ' ').replace(/\b(le|la|les|l|un|une|des|de|du|d)\b/g, ' ')
    .replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
}
function _escHtml(s) { return (s || '').replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c])); }
function checkLabelExo(btn) {
  const card = btn.closest('.exercise-card') || btn.closest('.lblexo-wrap');
  if (!card) return;
  const inputs = card.querySelectorAll('input[data-answer]');
  if (!inputs.length) return;
  const marks = card.querySelectorAll('.lblexo .lx-mark');
  let ok = 0;
  const items = [];
  inputs.forEach((inp, idx) => {
    const answer = inp.getAttribute('data-answer');
    const ans = normLabel(answer);
    const val = normLabel(inp.value);
    const good = val.length >= 3 && (val === ans || ans.indexOf(val) === 0 || val.indexOf(ans) === 0 || (' ' + ans + ' ').indexOf(' ' + val + ' ') >= 0 || (' ' + val + ' ').indexOf(' ' + ans + ' ') >= 0);
    inp.classList.remove('ok', 'no');
    inp.classList.add(good ? 'ok' : 'no');
    if (marks[idx]) { marks[idx].classList.remove('ok', 'no'); marks[idx].classList.add(good ? 'ok' : 'no'); }
    if (good) ok++;
    const mine = good ? '' : '<span class="mine">' + (_escHtml(inp.value.trim()) || '(vide)') + '</span> → ';
    items.push('<li class="' + (good ? 'okk' : 'bad') + '"><span class="ico">' + (good ? '✅' : '❌') + '</span><span><strong>' + (idx + 1) + '.</strong> ' + mine + '<span class="good">' + _escHtml(answer) + '</span></span></li>');
  });
  const n = inputs.length;
  if (!card.dataset.firstScore) card.dataset.firstScore = ok + '/' + n;
  const sc = card.querySelector('.lblexo-score');
  if (sc) sc.innerHTML = ok + ' / ' + n + (ok === n ? '  🎉' : '') +
    ' <span style="color:var(--text-secondary); font-weight:600; font-size:13px;">· 1ᵉʳ essai : ' + card.dataset.firstScore + '</span>';
  const corr = card.querySelector('.lblexo-corr');
  if (corr) {
    corr.innerHTML = '<h4>Correction ' + (ok === n ? '— parfait ! 🎉' : '— ' + ok + '/' + n) + '</h4><ul>' + items.join('') + '</ul>';
    corr.classList.add('show');
  }
}
function resetLabelExo(btn) {
  const card = btn.closest('.exercise-card');
  if (!card) return;
  card.querySelectorAll('input[data-answer]').forEach((inp) => { inp.value = ''; inp.classList.remove('ok', 'no'); });
  card.querySelectorAll('.lblexo .lx-mark').forEach((m) => m.classList.remove('ok', 'no'));
  const sc = card.querySelector('.lblexo-score');
  if (sc) sc.textContent = '';
  const corr = card.querySelector('.lblexo-corr');
  if (corr) { corr.classList.remove('show'); corr.innerHTML = ''; }
}

// Masque / affiche les numéros sur un schéma à légender (entraînement examen)
function toggleMarks(btn) {
  const card = btn.closest('.exercise-card'); if (!card) return;
  const box = card.querySelector('.lblexo'); if (!box) return;
  const hidden = box.classList.toggle('marks-hidden');
  btn.textContent = hidden ? '👁️ Afficher les n°' : '🙈 Cacher les n°';
}

function checkPunnett(btn) {
  const card = btn.closest('.exercise-card');
  if (!card) return;
  const cells = card.querySelectorAll('.punnett input[data-pa]');
  if (!cells.length) return;
  let ok = 0;
  cells.forEach((c) => {
    const exp = c.getAttribute('data-pa').split('').sort().join('');
    const val = (c.value || '').replace(/\s/g, '').split('').sort().join('');
    const good = val === exp;
    c.classList.remove('ok', 'no');
    c.classList.add(good ? 'ok' : 'no');
    if (good) ok++;
  });
  const res = card.querySelector('.punnett-res');
  if (res) {
    res.innerHTML = '<strong>' + ok + '/4</strong> — Génotypes : <strong>1 BB · 2 Bb · 1 bb</strong> → Phénotypes : <strong>3 bruns : 1 bleu</strong> (yeux bleus = bb, récessif → 1 chance sur 4). ' + (ok === 4 ? '🎉' : '');
    res.classList.add('show');
  }
}
function resetPunnett(btn) {
  const card = btn.closest('.exercise-card');
  if (!card) return;
  card.querySelectorAll('.punnett input').forEach((c) => { c.value = ''; c.classList.remove('ok', 'no'); });
  const res = card.querySelector('.punnett-res');
  if (res) { res.classList.remove('show'); res.innerHTML = ''; }
}

function toggleWhyMethod(btn) {
  const content = btn.nextElementSibling;
  content.style.display = content.style.display === 'block' ? 'none' : 'block';
  btn.textContent = content.style.display === 'block' ? '🔽 Masquer' : '💡 Pourquoi cette étape ?';
}

function toggleWhyStep(btn) {
  const step = btn.closest('.exercise-step');
  const whyContent = step.querySelector('.why-content');
  if (whyContent) {
    whyContent.classList.toggle('show');
    btn.textContent = whyContent.classList.contains('show') ? '🔽 Masquer l\'explication' : '💡 Pourquoi cette étape ?';
  }
}

function showSection(evtOrId, id) {
  // Accept both showSection('quiz') and showSection(event, 'quiz')
  let sectionId, btn;
  if (typeof evtOrId === 'string') {
    sectionId = evtOrId;
    btn = document.querySelector(`.nav-btn[onclick*="${sectionId}"]`);
  } else {
    sectionId = id || evtOrId.currentTarget?.dataset?.section;
    btn = evtOrId.target || evtOrId.currentTarget;
  }
  // Verrou Premium : section payante et non débloquée → modale, on n'entre pas.
  if (typeof PREMIUM_SECTIONS !== 'undefined' && PREMIUM_SECTIONS.includes(sectionId) && !isPremium()) {
    const labels = { mesexos: 'Mes créations', progression: 'Progression', journal: 'Journal' };
    openPremiumModal(labels[sectionId] || sectionId);
    return;
  }
  document.querySelectorAll('.section').forEach(s=>s.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b=>{ b.classList.remove('active'); b.removeAttribute('aria-current'); });
  // I30 — Stopper l'examen si on quitte la section quiz
  if (sectionId !== 'quiz' && examActive) {
    examActive = false;
    if (examTimer) { clearInterval(examTimer); examTimer = null; }
    const banner = document.getElementById('exam-timer');
    if (banner) banner.remove();
    const examBtn = document.getElementById('exam-toggle-btn');
    if (examBtn) examBtn.textContent = '5 questions, 5 min →';
  }
  document.getElementById(sectionId).classList.add('active');
  if (btn) { btn.classList.add('active'); btn.setAttribute('aria-current', 'page'); }
  // « Reprendre où j'étais » : on mémorise le dernier onglet de contenu consulté
  // (on évite les sections premium / spéciales pour ne pas rouvrir une modale au lancement).
  try {
    if (['synthese', 'formules', 'methodes', 'exercices', 'erreurs', 'quiz', 'flashcards', 'extra1', 'extra2'].indexOf(sectionId) >= 0) {
      localStorage.setItem('gr2_last_section', sectionId);
    }
  } catch (e) {}
  // Revenir en haut de la page quand on change d'onglet
  try { window.scrollTo(0, 0); } catch (e) {}
  // Re-render formulas in newly visible section
  safeMathJax([document.getElementById(sectionId)]);
  if (typeof updateScratchVisibility === 'function') updateScratchVisibility();
  if (sectionId === 'quiz') {
    if (typeof restoreQuizPrefs === 'function') restoreQuizPrefs();
    const startScreen = document.getElementById('quiz-start-screen');
    const activeScreen = document.getElementById('quiz-active-screen');
    // G7 — Si le résumé est affiché (formula-box présente), revenir à l'accueil quiz
    const summaryShown = activeScreen && activeScreen.style.display !== 'none' &&
      document.getElementById('quiz-container')?.querySelector('.formula-box');
    if (summaryShown) {
      timerIds.forEach(id => clearInterval(id)); timerIds = [];
      activeScreen.style.display = 'none';
      if (startScreen) startScreen.style.display = 'block';
    }
    if (startScreen && activeScreen && activeScreen.style.display === 'none') {
      const data = loadSavedData();
      const bsEl = document.getElementById('best-score-display');
      if (bsEl) bsEl.textContent = 'Meilleur score : ' + (data.bestScore || 0) + '%';
    }
    // Ne pas appeler filterQuiz si un examen est actif (E3) ou si un quiz est en cours (E15)
    const quizRunning = activeScreen && activeScreen.style.display !== 'none' && !summaryShown;
    if (!examActive && !quizRunning) setTimeout(filterQuiz, 50);
    if (typeof renderLeaderboard === 'function') renderLeaderboard();
    if (typeof leaderboardPush === 'function') leaderboardPush();
    if (typeof renderChapterStats === 'function') renderChapterStats();
  }
  if (sectionId === 'profil') requestAnimationFrame(() => updateProfile()); // throttle handled inside
  if (sectionId === 'glossaire' && typeof renderGlossaire === 'function') renderGlossaire();
  if (sectionId === 'flashcards') initFlashcards();
  if (sectionId === 'memoformules' && typeof ftInit === 'function') ftInit();
  if (sectionId === 'formules') initFormulaBookmarks();
  if (sectionId === 'journal') loadJournalHistory();
  if (sectionId === 'graphiques') requestAnimationFrame(() => requestAnimationFrame(() => initGraphs()));
  if (sectionId === 'mesexos') { renderCustomExoList(); if (typeof initCreations === 'function') initCreations(); }
  if (sectionId === 'progression') renderProgression();
  if (sectionId === 'chat' && typeof initChat === 'function') initChat();
  if (sectionId === 'stats' && typeof initStats === 'function') initStats();
  if (sectionId === 'notes' && typeof initNotes === 'function') initNotes();
  // Onglets bonus (extraTabs) propres à une matière : on prévient le module concerné.
  if ((sectionId === 'extra1' || sectionId === 'extra2') && typeof window.onShowExtraTab === 'function') {
    try { window.onShowExtraTab(sectionId); } catch (e) {}
  }
  if (window.innerWidth <= 768 && document.querySelector('.nav').classList.contains('open')) {
    toggleSidebar();
  }
  // Aides à la lecture & à l'étude (study-tools.js) : sommaire, progression,
  // marquage compris/à revoir, surligneur, mode lecture, mode cours animé.
  if (typeof onShowStudySection === 'function') { try { onShowStudySection(sectionId); } catch (e) {} }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showMethod(id, btn) {
  document.querySelectorAll('.method-content').forEach(m=>m.classList.remove('on'));
  document.querySelectorAll('.mtab').forEach(t=>t.classList.remove('on'));
  document.getElementById(id).classList.add('on');
  if (btn) btn.classList.add('on');
}

function toggleSimpleExp(btn) {
  const content = btn.nextElementSibling;
  content.classList.toggle('show');
  btn.textContent = content.classList.contains('show') ? "💡 Masquer l'explication" : "💡 Comprendre simplement";
}

function toggleLegendItem(item) {
  item.classList.toggle('open');
  const accordion = item.querySelector('.accordion-content');
  if (accordion) {
    accordion.style.display = item.classList.contains('open') ? 'block' : 'none';
  }
}

// Recherche dans la section Formules : filtre les cartes par texte (accents ignorés)
const DIACRITICS_RE = new RegExp('[\\u0300-\\u036f]', 'g');
function normalizeSearch(s) {
  return (s || '').toLowerCase().normalize('NFD').replace(DIACRITICS_RE, '');
}
// Clé stable d'une formule = texte de son titre (sans l'étoile)
function formulaKey(box) {
  const h = box.querySelector('h3');
  const raw = h ? h.textContent : box.textContent;
  return raw.replace(/[★☆]/g, '').trim().slice(0, 60);
}
function getBookmarks() { const d = loadSavedData(); return d.bookmarks || []; }
function toggleBookmark(key, btn) {
  const d = loadSavedData();
  d.bookmarks = d.bookmarks || [];
  const i = d.bookmarks.indexOf(key);
  if (i >= 0) d.bookmarks.splice(i, 1); else d.bookmarks.push(key);
  saveData(d);
  const on = d.bookmarks.includes(key);
  if (btn) { btn.textContent = on ? '★' : '☆'; btn.style.color = on ? 'var(--color-droite)' : 'var(--text-secondary)'; btn.setAttribute('aria-pressed', on); }
  applyFormulaFilters();
}
let formulaBookmarksReady = false;
// Associe certaines formules à une démo animée (par mot-clé du titre)
const DEMO_FOR_FORMULA = [
  { match: 'développée', id: 'cercle_carre' },
  { match: 'pente', id: 'pente' },
  { match: 'distance point à droite', id: 'distance' },
  { match: 'milieu', id: 'milieu' },
  { match: 'distance entre deux points', id: 'distance_pts' }
];
function initFormulaBookmarks() {
  const boxes = document.querySelectorAll('#formules .formula-box');
  const marks = getBookmarks();
  boxes.forEach(box => {
    if (box.querySelector('.bookmark-btn')) return; // déjà injecté
    const key = formulaKey(box);
    // Bouton « animer » si une démo correspond au titre
    const h3 = box.querySelector('h3');
    if (h3 && typeof DEMOS !== 'undefined') {
      const k = normalizeSearch(key);
      const hit = DEMO_FOR_FORMULA.find(m => k.includes(normalizeSearch(m.match)) && DEMOS[m.id]);
      if (hit) {
        const ab = document.createElement('button');
        ab.type = 'button'; ab.className = 'formula-anim-btn';
        ab.textContent = '▶ animer';
        ab.title = 'Voir la résolution animée';
        ab.onclick = (e) => { e.stopPropagation(); openDemo(hit.id); };
        h3.appendChild(ab);
      }
    }
    const on = marks.includes(key);
    const btn = document.createElement('button');
    btn.className = 'bookmark-btn';
    btn.type = 'button';
    btn.textContent = on ? '★' : '☆';
    btn.title = 'Marquer cette formule à revoir';
    btn.setAttribute('aria-label', 'Marquer cette formule à revoir');
    btn.setAttribute('aria-pressed', on);
    btn.style.cssText = `float:right; background:none; border:none; cursor:pointer; font-size:20px; line-height:1; padding:0 0 0 8px; color:${on ? 'var(--color-droite)' : 'var(--text-secondary)'};`;
    btn.onclick = (e) => { e.stopPropagation(); toggleBookmark(key, btn); };
    const h = box.querySelector('h3');
    if (h) h.insertBefore(btn, h.firstChild); else box.prepend(btn);
  });
  formulaBookmarksReady = true;
  applyFormulaFilters();
}
let showBookmarkedOnly = false;
function toggleBookmarkFilter(btn) {
  showBookmarkedOnly = !showBookmarkedOnly;
  if (btn) {
    btn.style.background = showBookmarkedOnly ? 'var(--color-droite)' : 'transparent';
    btn.style.color = showBookmarkedOnly ? '#0f1117' : 'var(--color-droite)';
    btn.setAttribute('aria-pressed', showBookmarkedOnly);
  }
  applyFormulaFilters();
}
// Filtrage combiné : recherche texte + favoris
function applyFormulaFilters() {
  const input = document.getElementById('formula-search');
  const q = normalizeSearch((input ? input.value : '').trim());
  const marks = getBookmarks();
  const boxes = document.querySelectorAll('#formules .formula-box');
  let visible = 0;
  boxes.forEach(box => {
    const matchText = !q || normalizeSearch(box.textContent).includes(q);
    const matchMark = !showBookmarkedOnly || marks.includes(formulaKey(box));
    const show = matchText && matchMark;
    box.style.display = show ? '' : 'none';
    if (show) visible++;
  });
  const empty = document.getElementById('formula-search-empty');
  if (empty) {
    empty.style.display = visible === 0 ? 'block' : 'none';
    empty.textContent = showBookmarkedOnly && !q
      ? "Aucune formule marquée pour l'instant — clique sur ☆ pour en ajouter."
      : 'Aucune formule ne correspond à ta recherche.';
  }
}
// Conserve la signature appelée par l'attribut oninput
function filterFormulas() { applyFormulaFilters(); }

// ── RÉSOLUTION ANIMÉE (vrai mouvement des termes, technique FLIP) ──
let currentDemoId = null;
let demoIndex = 0;
let demoAuto = false;
let demoAutoTimer = null;
let demoGeoAnim = null;
function clearDemoAuto() { if (demoAutoTimer) { clearTimeout(demoAutoTimer); demoAutoTimer = null; } }
function stopGeoAnim() { if (demoGeoAnim) { cancelAnimationFrame(demoGeoAnim); demoGeoAnim = null; } }
function toggleDemoAuto() {
  demoAuto = !demoAuto;
  if (demoAuto && demoIndex < DEMOS[currentDemoId].scenes.length - 1) demoNext();
  else renderDemoFrame(false);
}
function openDemo(id) {
  if (typeof DEMOS === 'undefined' || !DEMOS[id]) return;
  currentDemoId = id; demoIndex = 0; demoAuto = false; clearDemoAuto();
  const d = DEMOS[id];
  document.getElementById('demo-title').textContent = d.title || 'Résolution animée';
  document.getElementById('demo-subtitle').textContent = d.subtitle || '';
  document.getElementById('demo-overlay').classList.add('show');
  renderDemoFrame(false);
}
function closeDemo() {
  clearDemoAuto(); demoAuto = false; stopGeoAnim();
  const stage = document.getElementById('demo-stage');
  if (stage) stage.style.display = '';
  const demoBox = document.querySelector('.demo-box');
  if (demoBox) demoBox.classList.remove('is-combo');
  const ov = document.getElementById('demo-overlay');
  if (ov) ov.classList.remove('show');
}
function demoBtn(label, handler, kind) {
  const b = document.createElement('button');
  b.type = 'button';
  b.className = 'demo-btn' + (kind ? ' demo-btn-' + kind : '');
  b.textContent = label;
  b.onclick = handler;
  return b;
}

// Cœur de l'animation : transition FLIP entre deux états de l'équation.
// Les tokens (data-tid) présents avant ET après GLISSENT de leur ancienne
// position vers la nouvelle ; ceux qui disparaissent fondent ; ceux qui
// apparaissent surgissent → vrai mouvement, pas un simple remplacement.
function setStageScene(stage, html, animate, opts) {
  opts = opts || {};
  let eq = stage.querySelector('.aeq');
  if (!eq) { eq = document.createElement('div'); eq.className = 'aeq'; stage.appendChild(eq); }
  let fxLayer = stage.querySelector('.demo-exit-layer');
  if (!fxLayer) { fxLayer = document.createElement('div'); fxLayer.className = 'demo-exit-layer'; stage.appendChild(fxLayer); }

  // Repli : pas d'animation possible → on pose juste le contenu
  if (!animate || typeof gsap === 'undefined') { fxLayer.innerHTML = ''; eq.innerHTML = html; return; }

  const center = (r) => ({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
  // merge : plusieurs anciens tokens → un résultat ; split : un ancien → plusieurs
  const mergeFrom = {}, mergeTo = new Set();
  (opts.merge || []).forEach(m => { mergeTo.add(m.to); (m.from || []).forEach(f => mergeFrom[f] = m.to); });
  const splitFrom = {};
  (opts.split || []).forEach(s => { (s.to || []).forEach(to => splitFrom[to] = s.from); });
  // annihilate : paires de termes opposés qui se percutent et s'effacent (ex. −12 + 12)
  const annihilatePartner = {};
  (opts.annihilate || []).forEach(pair => { if (pair.length === 2) { annihilatePartner[pair[0]] = pair[1]; annihilatePartner[pair[1]] = pair[0]; } });

  const stageRect = stage.getBoundingClientRect();
  // 1) positions + contenu AVANT
  const oldRects = {}, oldText = {}, oldEls = {};
  eq.querySelectorAll('[data-tid]').forEach(t => { oldRects[t.dataset.tid] = t.getBoundingClientRect(); oldText[t.dataset.tid] = t.textContent; oldEls[t.dataset.tid] = t; });
  // 2) tids futurs
  const tmp = document.createElement('div'); tmp.innerHTML = html;
  const newTids = new Set(Array.from(tmp.querySelectorAll('[data-tid]')).map(t => t.dataset.tid));
  // 3) nouveau contenu (pour mesurer les positions d'arrivée)
  fxLayer.innerHTML = '';
  eq.innerHTML = html;
  const newRects = {};
  eq.querySelectorAll('[data-tid]').forEach(t => { newRects[t.dataset.tid] = t.getBoundingClientRect(); });

  // 4) SORTIES : fusion (fonce vers le résultat, GSAP) ou simple fondu
  Object.keys(oldRects).forEach(tid => {
    if (newTids.has(tid)) return;
    const r = oldRects[tid];
    const c = oldEls[tid].cloneNode(true);
    c.style.position = 'absolute'; c.style.margin = '0';
    c.style.left = (r.left - stageRect.left) + 'px';
    c.style.top = (r.top - stageRect.top) + 'px';
    fxLayer.appendChild(c);
    const toTid = mergeFrom[tid];
    const partner = annihilatePartner[tid];
    if (partner && oldRects[partner]) {
      // ANNULATION : le terme AJOUTÉ (rouge, .tadd) tombe SUR le terme original ;
      // ils se superposent → un « 0 » surgit à la place pour montrer que ça s'efface.
      const a = center(r);
      // point de rencontre = MILIEU des deux termes opposés (ils sont adjacents) :
      // chacun fait un petit pas vers l'autre, sans traverser les termes voisins.
      const pc = center(oldRects[partner]);
      // Point de rencontre légèrement REMONTÉ (−14px) mais CLAMPÉ pour rester dans le cadre.
      let meetY = (a.y + pc.y) / 2 - 14;
      const minY = stageRect.top + 26; // ne pas dépasser le bord haut du stage
      if (meetY < minY) meetY = minY;
      const meet = { x: (a.x + pc.x) / 2, y: meetY };
      // 0) SURLIGNAGE : le terme clignote une fois pour dire « attention, ça bouge ici ».
      c.classList.add('atok-flash');
      setTimeout(() => c.classList.remove('atok-flash'), 600);
      // 1) petit glissement vers le milieu de la paire (court → ne chevauche pas les voisins)
      gsap.to(c, { x: meet.x - a.x, y: meet.y - a.y, duration: 0.45, delay: 0.25, ease: 'power2.inOut' });
      // 2) à la rencontre (≈0.7 s) : ils se percutent, rétrécissent et disparaissent
      gsap.to(c, { scale: 0.1, opacity: 0, duration: 0.3, delay: 0.7, ease: 'power2.in', onComplete: () => c.remove() });
      // le « 0 » + l'onde de choc ne sont déclenchés qu'une fois par paire, à la collision.
      // IMPORTANT : le « 0 » FLOTTE AU-DESSUS de la ligne d'équation (pas dans le flux des
      // termes) pour ne JAMAIS chevaucher les autres tokens qui glissent en se recentrant.
      if (tid < partner) {
        const ghost = { getBoundingClientRect: () => ({ left: meet.x - 6, top: meet.y - 6, width: 12, height: 12 }) };
        burstAt(ghost, stage, fxLayer, 700);
        const zero = document.createElement('span');
        zero.className = 'atok atok-result anni-zero';
        zero.textContent = '0';
        // Le « 0 » s'affiche au-dessus du CENTRE de l'équation (et non au point exact
        // d'annulation) : toujours bien visible, jamais coincé dans un coin du cadre.
        const eqRect = eq.getBoundingClientRect();
        let zx = (eqRect.left + eqRect.width / 2) - stageRect.left;
        const pad = 30;
        if (zx < pad) zx = pad;
        if (zx > stageRect.width - pad) zx = stageRect.width - pad;
        let zyTop = 22; // près du haut du cadre (qui a maintenant un padding-top large)
        zero.style.cssText = 'position:absolute; left:' + zx + 'px; top:' + zyTop + 'px; transform:translate(-50%,-50%); pointer-events:none; white-space:nowrap;';
        fxLayer.appendChild(zero);
        // apparaît (petit rebond vers le haut), tient un instant, puis pulse et s'efface sur place
        gsap.fromTo(zero, { opacity: 0, scale: 0.2, y: 12 },
          { opacity: 1, scale: 1.3, y: 0, duration: 0.4, delay: 0.7, ease: 'back.out(2.2)',
            onComplete: () => gsap.to(zero, { opacity: 0, scale: 0.6, duration: 0.45, delay: 0.55, ease: 'power1.in', onComplete: () => zero.remove() }) });
      }
    } else if (toTid && newRects[toTid]) {
      const a = center(r), b = center(newRects[toTid]);
      gsap.to(c, { x: b.x - a.x, y: b.y - a.y, scale: 0.3, opacity: 0.12, duration: 0.62, ease: 'power2.in', onComplete: () => c.remove() });
    } else {
      gsap.to(c, { y: 12, scale: 0.4, opacity: 0, duration: 0.42, ease: 'power1.in', onComplete: () => c.remove() });
    }
  });

  // 5) GLISSEMENT (FLIP) + apparitions + projecteur — tout en GSAP
  eq.querySelectorAll('[data-tid]').forEach(t => {
    const tid = t.dataset.tid;
    const nr = newRects[tid];
    if (oldRects[tid]) {
      const dx = oldRects[tid].left - nr.left, dy = oldRects[tid].top - nr.top;
      const sx = nr.width ? oldRects[tid].width / nr.width : 1;
      const moved = Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5 || Math.abs(sx - 1) > 0.05;
      const changed = oldText[tid] !== t.textContent;
      if (moved) gsap.fromTo(t, { x: dx, y: dy, scale: sx || 1 }, { x: 0, y: 0, scale: 1, duration: 0.72, ease: 'power3.inOut' });
      if (changed) { flashToken(t); gsap.fromTo(t, { rotationX: 85 }, { rotationX: 0, duration: 0.5, ease: 'power2.out' }); }
      // Projecteur : les termes inactifs s'estompent un instant puis reviennent
      if (!moved && !changed) gsap.fromTo(t, { opacity: 0.35 }, { opacity: 1, duration: 0.8, ease: 'power1.inOut' });
    } else {
      const src = splitFrom[tid];
      if (src && oldRects[src]) {
        // DÉPLIAGE : le token jaillit depuis la position de la source (2² → 2·2)
        const a = center(oldRects[src]), b = center(nr);
        gsap.fromTo(t, { opacity: 0, x: a.x - b.x, y: a.y - b.y, scale: 0.5 },
                       { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.62, delay: 0.06, ease: 'back.out(1.4)' });
        flashToken(t, 80);
      } else {
        const isMergeTo = mergeTo.has(tid);
        const isAdd = t.classList.contains('tadd'); // terme ajouté → tombe du haut en rouge
        const delay = isMergeTo ? 0.5 : (isAdd ? 0.05 : 0.14);
        if (isAdd) {
          gsap.fromTo(t, { opacity: 0, y: -52, scale: 1.12 },
                         { opacity: 1, y: 0, scale: 1, duration: 0.7, delay, ease: 'bounce.out' });
          dropTrail(t, nr, stageRect, fxLayer, delay); // traînée rouge pendant la chute
        } else {
          gsap.fromTo(t, { opacity: 0, y: 14, scale: 0.86 },
                         { opacity: 1, y: 0, scale: 1, duration: 0.52, delay, ease: 'back.out(1.5)' });
        }
        flashToken(t, delay * 1000);
        // Onde de choc seulement pour une fusion de PLUSIEURS termes (vrai « calcul »),
        // pas pour un simple 0+12=12 (évite un cercle parasite en doublon).
        if (isMergeTo) {
          const fromCount = (opts.merge || []).find(m => m.to === tid)?.from?.length || 0;
          if (fromCount >= 3) burstAt(t, stage, fxLayer, delay * 1000);
        }
      }
    }
  });
}
// Traînée : quelques copies fantômes rouges échelonnées le long de la chute
// d'un terme ajouté → donne une vraie sensation de mouvement (motion trail).
function dropTrail(token, nr, stageRect, fxLayer, delay) {
  if (typeof gsap === 'undefined') return;
  const left = nr.left - stageRect.left, top = nr.top - stageRect.top;
  const txt = token.textContent;
  for (let i = 1; i <= 3; i++) {
    const ghost = document.createElement('span');
    ghost.className = 'atok tadd';
    ghost.textContent = txt;
    ghost.style.cssText = 'position:absolute; left:' + left + 'px; top:' + top + 'px; pointer-events:none; will-change:transform,opacity;';
    fxLayer.appendChild(ghost);
    const startY = -52 + i * 13;  // échelonné sous le point de départ de la chute
    gsap.fromTo(ghost,
      { opacity: 0.45 - i * 0.1, y: startY, scale: 1.05 },
      { opacity: 0, y: 0, scale: 1, duration: 0.55, delay: delay + i * 0.04, ease: 'power2.out',
        onComplete: () => ghost.remove() });
  }
}

// Surlignage bref d'un token (effet « ça se passe ici »)
function flashToken(t, delay) {
  setTimeout(() => {
    t.classList.add('atok-flash');
    setTimeout(() => t.classList.remove('atok-flash'), 700);
  }, delay || 0);
}
// Onde de choc circulaire centrée sur un token (quand un calcul se résout)
function burstAt(t, stage, layer, delay) {
  setTimeout(() => {
    const sr = stage.getBoundingClientRect(), r = t.getBoundingClientRect();
    const ring = document.createElement('div');
    ring.className = 'demo-burst';
    ring.style.left = (r.left - sr.left + r.width / 2) + 'px';
    ring.style.top = (r.top - sr.top + r.height / 2) + 'px';
    layer.appendChild(ring);
    ring.animate([
      { opacity: 0.9, transform: 'translate(-50%,-50%) scale(0.2)' },
      { opacity: 0, transform: 'translate(-50%,-50%) scale(2.8)' }
    ], { duration: 580, easing: 'ease-out', fill: 'forwards' });
    setTimeout(() => ring.remove(), 620);
  }, delay || 0);
}

function renderDemoFrame(animate) {
  const d = DEMOS[currentDemoId];
  if (!d || !d.scenes) return;
  const scenes = d.scenes;
  const stage = document.getElementById('demo-stage');
  const brief = document.getElementById('demo-brief');
  const more = document.getElementById('demo-more');
  const controls = document.getElementById('demo-controls');
  const canvas = document.getElementById('demo-canvas');
  const frame = scenes[demoIndex];
  if (!frame) return;

  document.getElementById('demo-progress-fill').style.width =
    Math.round((demoIndex / Math.max(1, scenes.length - 1)) * 100) + '%';

  stopGeoAnim();
  const demoBox = document.querySelector('.demo-box');
  if (demoBox) demoBox.classList.toggle('is-combo', d.type === 'combo');
  if (d.type === 'geo') {
    // Démo géométrique : on masque les tokens et on anime le canvas
    stage.style.display = 'none';
    canvas.style.display = 'block';
    if (d.geo === 'square') drawCompleteSquareGeo(frame.phase);
  } else if (d.type === 'combo') {
    // Calcul animé à GAUCHE + dessin (carré ou cercle) à DROITE, ensemble.
    stage.style.display = '';
    setStageScene(stage, frame.eq, animate, { merge: frame.merge, split: frame.split, annihilate: frame.annihilate });
    canvas.style.display = 'block';
    drawComboSquare(frame.sq);
  } else {
    stage.style.display = '';
    setStageScene(stage, frame.eq, animate, { merge: frame.merge, split: frame.split, annihilate: frame.annihilate });
    if (frame.draw) { canvas.style.display = 'block'; drawDemoFigure(frame.draw); }
    else canvas.style.display = 'none';
  }

  brief.textContent = frame.brief || '';
  more.style.display = 'none';
  more.textContent = frame.more ? '💡 ' + frame.more : '';

  // Annotation « dans l'animation » : formule/rappel affiché pendant l'étape
  const annot = document.getElementById('demo-annot');
  if (annot) {
    if (frame.annot) {
      annot.style.display = 'inline-block';
      annot.innerHTML = '<span class="ann-label">Pourquoi</span>' + frame.annot;
      if (window.MathJax && MathJax.typesetPromise && frame.annot.indexOf('\\(') >= 0) {
        if (MathJax.typesetClear) { try { MathJax.typesetClear([annot]); } catch (e) {} }
        MathJax.typesetPromise([annot]).catch(() => {});
      }
      if (typeof gsap !== 'undefined') gsap.fromTo(annot, { opacity: 0, y: 10, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, delay: 0.25, ease: 'back.out(1.4)' });
    } else {
      annot.style.display = 'none';
      annot.innerHTML = '';
    }
  }

  controls.innerHTML = '';
  const isFirst = demoIndex === 0;
  const isLast = demoIndex === scenes.length - 1;
  if (!isFirst) controls.appendChild(demoBtn('← Précédent', demoPrev, 'ghost'));
  if (frame.more) controls.appendChild(demoBtn('🤔 Plus d’explication', () => { more.style.display = 'block'; }));
  if (isFirst) controls.appendChild(demoBtn('▶ Commencer', demoNext, 'primary'));
  else if (!isLast) controls.appendChild(demoBtn('✅ Compris, continuer', demoNext, 'primary'));
  else {
    controls.appendChild(demoBtn('↻ Rejouer', demoReplay, ''));
    controls.appendChild(demoBtn('✕ Fermer', closeDemo, 'primary'));
  }
  if (!isLast) controls.appendChild(demoBtn(demoAuto ? '⏸ Pause' : '▶ Lecture auto', toggleDemoAuto, 'ghost'));

  // Lecture auto : enchaîne après l'animation + un court temps de lecture
  clearDemoAuto();
  if (isLast) demoAuto = false;
  else if (demoAuto) demoAutoTimer = setTimeout(demoNext, 3400);
}
function demoNext() { clearDemoAuto(); const d = DEMOS[currentDemoId]; if (!d) return; if (demoIndex < d.scenes.length - 1) { demoIndex++; renderDemoFrame(true); } }
function demoPrev() { clearDemoAuto(); if (demoIndex > 0) { demoIndex--; renderDemoFrame(true); } }
function demoReplay() { clearDemoAuto(); demoIndex = 0; renderDemoFrame(false); }

// Petit tracé de figure (cercle) si une scène fournit { draw:{h,k,r} }
function drawDemoFigure(p) {
  const canvas = document.getElementById('demo-canvas');
  if (!canvas || typeof drawGrid !== 'function') return;
  canvas.width = 440; canvas.height = 320;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  const r = Math.max(0.5, Math.abs(p.r || 1));
  // Vue CENTRÉE sur le centre du cercle → le cercle remplit le cadre, graduations fines
  const half = r * 1.35 + 1;
  const scale = Math.min((W - 40) / (2 * half), (H - 40) / (2 * half));
  const ox = W / 2 - p.h * scale;
  const oy = H / 2 + p.k * scale;
  drawGrid(ctx, W, H, ox, oy, scale, '#fff', 26); // grille fine (pas réduit)
  const px = ox + p.h * scale, py = oy - p.k * scale, pr = r * scale;
  // Cercle
  ctx.beginPath(); ctx.arc(px, py, pr, 0, Math.PI * 2);
  ctx.strokeStyle = getThemeColor('--color-cercle', '#60a5fa'); ctx.lineWidth = 2.5;
  ctx.shadowColor = getThemeColor('--color-cercle', '#60a5fa'); ctx.shadowBlur = 10; ctx.stroke(); ctx.shadowBlur = 0;
  // Rayon (avec étiquette)
  ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + pr, py);
  ctx.strokeStyle = getThemeColor('--color-droite', '#fbbf24'); ctx.lineWidth = 2; ctx.setLineDash([5, 4]); ctx.stroke(); ctx.setLineDash([]);
  ctx.fillStyle = getThemeColor('--color-droite', '#fbbf24'); ctx.font = 'bold 12px Inter'; ctx.textAlign = 'center';
  ctx.fillText('R = ' + r, px + pr / 2, py - 7);
  // Centre : gros point rouge + étiquette lisible (fond sombre pour ne pas se perdre dans la grille)
  ctx.beginPath(); ctx.arc(px, py, 5, 0, Math.PI * 2); ctx.fillStyle = '#ef4444'; ctx.fill();
  const lbl = 'C(' + p.h + ' ; ' + p.k + ')';
  ctx.font = 'bold 13px Inter'; ctx.textAlign = 'left';
  const tw = ctx.measureText(lbl).width;
  ctx.fillStyle = 'rgba(0,0,0,0.7)'; ctx.fillRect(px + 9, py + 6, tw + 8, 19);
  ctx.fillStyle = '#fca5a5'; ctx.fillText(lbl, px + 13, py + 19);
}

// ── DÉMO GÉOMÉTRIQUE « compléter le carré » (modèle des aires) ──
// Montre POURQUOI on ajoute (b/2)² : la bande bx se plie en L autour du carré x²,
// il manque un petit carré (b/2)² dans le coin → on le comble → grand carré (x+b/2)².
// Exemple visuel : x² + 6x → (x+3)² (on ajoute 9). Aucune explication écrite : on MONTRE.
function drawCompleteSquareGeo(phase) {
  const canvas = document.getElementById('demo-canvas');
  if (!canvas) return;
  canvas.width = 460; canvas.height = 340;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  const u = 24, X = 5 * u, K = 3 * u, total = X + K;     // x = 5 u (illustratif), b/2 = 3 u
  const ax = Math.round((W - total) / 2), ay = Math.round((H - total) / 2) + 4;
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ease = t => t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  const lerp = (a, b, t) => a + (b - a) * t;
  const BG = getThemeColor('--bg-formula', '#0d1117');
  const C_SQ = '#60a5fa', C_SQf = 'rgba(96,165,250,0.28)';
  const C_BAR = '#34d399', C_BARf = 'rgba(52,211,153,0.28)';
  const C_ADD = '#fbbf24', C_ADDf = 'rgba(251,191,36,0.32)';
  ctx.lineJoin = 'round';

  const rect = (x, y, w, h, fill, stroke) => {
    ctx.fillStyle = fill; ctx.fillRect(x, y, w, h);
    if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = 2; ctx.strokeRect(x, y, w, h); }
  };
  const label = (t, x, y, c, size) => {
    ctx.fillStyle = c; ctx.font = 'bold ' + (size || 15) + 'px Inter';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(t, x, y);
  };
  const square = () => { rect(ax, ay, X, X, C_SQf, C_SQ); label('x²', ax + X / 2, ay + X / 2, '#bfdbfe', 17); };
  const strips = () => {
    rect(ax + X, ay, K, X, C_BARf, C_BAR);
    rect(ax, ay + X, X, K, C_BARf, C_BAR);
    label('3x', ax + X + K / 2, ay + X / 2, '#a7f3d0', 13);
    label('3x', ax + X / 2, ay + X + K / 2, '#a7f3d0', 13);
  };

  function frame(p) {
    ctx.fillStyle = BG; ctx.fillRect(0, 0, W, H);
    square();
    if (phase === 'square') {
      label('x', ax + X / 2, ay - 12, '#93c5fd', 13);
      ctx.save(); ctx.translate(ax - 14, ay + X / 2); ctx.rotate(-Math.PI / 2); label('x', 0, 0, '#93c5fd', 13); ctx.restore();
      return;
    }
    if (phase === 'addbar') {
      rect(ax + X, ay, 6 * u * p, X, C_BARf, C_BAR);
      if (p > 0.6) label('6x', ax + X + 3 * u, ay + X / 2, '#a7f3d0', 15);
      return;
    }
    if (phase === 'split') {
      rect(ax + X, ay, K, X, C_BARf, C_BAR);                    // moitié qui reste à droite
      const x = lerp(ax + X + K, ax, p), y = lerp(ay, ay + X, p); // moitié qui glisse en bas
      const w = lerp(K, X, p), h = lerp(X, K, p);
      rect(x, y, w, h, C_BARf, C_BAR);
      if (p > 0.9) { label('3x', ax + X + K / 2, ay + X / 2, '#a7f3d0', 13); label('3x', ax + X / 2, ay + X + K / 2, '#a7f3d0', 13); }
      return;
    }
    strips(); // hole / fill / done montrent le L complet
    if (phase === 'hole') {
      const a = 0.35 + 0.45 * Math.abs(Math.sin(p * Math.PI * 3));
      ctx.setLineDash([6, 4]); ctx.strokeStyle = 'rgba(251,191,36,' + a + ')'; ctx.lineWidth = 2.5;
      ctx.strokeRect(ax + X, ay + X, K, K); ctx.setLineDash([]);
      label('?', ax + X + K / 2, ay + X + K / 2, '#fbbf24', 20);
      return;
    }
    if (phase === 'fill') {
      ctx.setLineDash([6, 4]); ctx.strokeStyle = 'rgba(251,191,36,0.4)'; ctx.lineWidth = 2;
      ctx.strokeRect(ax + X, ay + X, K, K); ctx.setLineDash([]);
      const y = lerp(ay - K - 24, ay + X, ease(p));
      rect(ax + X, y, K, K, C_ADDf, C_ADD);
      label('9', ax + X + K / 2, y + K / 2, '#fde68a', 16);
      return;
    }
    // done : grand carré complet (x+3)²
    rect(ax + X, ay + X, K, K, C_ADDf, C_ADD); label('9', ax + X + K / 2, ay + X + K / 2, '#fde68a', 15);
    ctx.strokeStyle = '#e5e7eb'; ctx.lineWidth = 3; ctx.strokeRect(ax, ay, total, total);
    label('x+3', ax + total / 2, ay - 12, '#e5e7eb', 13);
    ctx.save(); ctx.translate(ax - 14, ay + total / 2); ctx.rotate(-Math.PI / 2); label('x+3', 0, 0, '#e5e7eb', 13); ctx.restore();
    label('(x+3)²', ax + total / 2, ay + total + 22, '#ffffff', 16);
  }

  const animated = (phase === 'addbar' || phase === 'split' || phase === 'fill') && !reduce;
  const blink = phase === 'hole' && !reduce;
  if (animated) {
    const dur = 850, t0 = performance.now();
    const loop = () => { const p = Math.min(1, (performance.now() - t0) / dur); frame(p); if (p < 1) demoGeoAnim = requestAnimationFrame(loop); };
    loop();
  } else if (blink) {
    const t0 = performance.now();
    const loop = () => { frame(((performance.now() - t0) / 1000) % 1); demoGeoAnim = requestAnimationFrame(loop); };
    loop();
  } else {
    frame(1);
  }
}

// ── DESSIN à droite de la démo « calcul + dessin » (combo) ──
// sq = { pic:'x' } carré pour x²−4x → (x−2)²  ·  { pic:'y' } pour y²+6y → (y+3)²
//      { pic:'circle' } le cercle résultat C(2;−3), R=5  ·  rien → cadre vide
function drawComboSquare(sq) {
  const canvas = document.getElementById('demo-canvas');
  if (!canvas) return;
  canvas.width = 300; canvas.height = 300;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  ctx.fillStyle = getThemeColor('--bg-formula', '#0d1117'); ctx.fillRect(0, 0, W, H);
  ctx.lineJoin = 'round';
  const lab = (t, x, y, c, sz) => { ctx.fillStyle = c; ctx.font = 'bold ' + (sz || 14) + 'px Inter'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(t, x, y); };
  if (!sq || !sq.pic) { lab('…', W / 2, H / 2, getThemeColor('--text-secondary', '#94a3b8'), 22); return; }

  if (sq.pic === 'circle') {
    const cx = W / 2, cy = H / 2 + 6, scale = 20, r = 5;
    // grille légère
    ctx.strokeStyle = 'rgba(148,163,184,0.15)'; ctx.lineWidth = 1;
    for (let g = -6; g <= 6; g++) { ctx.beginPath(); ctx.moveTo(cx + g * scale * 0.5, 20); ctx.lineTo(cx + g * scale * 0.5, H - 20); ctx.stroke(); ctx.beginPath(); ctx.moveTo(20, cy + g * scale * 0.5); ctx.lineTo(W - 20, cy + g * scale * 0.5); ctx.stroke(); }
    // axes
    ctx.strokeStyle = 'rgba(148,163,184,0.45)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(20, cy); ctx.lineTo(W - 20, cy); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx, 20); ctx.lineTo(cx, H - 20); ctx.stroke();
    // centre C(2;−3) en pixels (y vers le bas)
    const pcx = cx + 2 * scale, pcy = cy + 3 * scale, pr = r * scale * 0.5;
    ctx.beginPath(); ctx.arc(pcx, pcy, pr, 0, Math.PI * 2);
    ctx.strokeStyle = '#60a5fa'; ctx.lineWidth = 3; ctx.shadowColor = '#60a5fa'; ctx.shadowBlur = 10; ctx.stroke(); ctx.shadowBlur = 0;
    // rayon
    ctx.beginPath(); ctx.moveTo(pcx, pcy); ctx.lineTo(pcx + pr, pcy);
    ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 2; ctx.setLineDash([5, 4]); ctx.stroke(); ctx.setLineDash([]);
    lab('R=5', pcx + pr / 2, pcy - 9, '#fbbf24', 12);
    ctx.beginPath(); ctx.arc(pcx, pcy, 4, 0, Math.PI * 2); ctx.fillStyle = '#ef4444'; ctx.fill();
    lab('C(2 ; −3)', pcx, pcy + 16, '#fca5a5', 12);
    lab('Le cercle !', W / 2, 16, '#60a5fa', 13);
    return;
  }

  // Modèle des aires (carré). pic 'x' : x²−4x (côté x−2, coin +4) ; 'y' : y²+6y (côté y+3, coin +9)
  const isX = sq.pic === 'x';
  const main = isX ? '#60a5fa' : '#34d399';
  const mainF = isX ? 'rgba(96,165,250,0.26)' : 'rgba(52,211,153,0.26)';
  const v = isX ? 'x' : 'y';
  const side = isX ? 'x−2' : 'y+3';
  const bar = isX ? '−2' + v : '3' + v;
  const add = isX ? '4' : '9';
  const u = 30, X = 4 * u, K = 2 * u, total = X + K;
  const ax = Math.round((W - total) / 2), ay = Math.round((H - total) / 2) + 4;
  const rect = (x, y, w, h, f, s) => { ctx.fillStyle = f; ctx.fillRect(x, y, w, h); if (s) { ctx.strokeStyle = s; ctx.lineWidth = 2; ctx.strokeRect(x, y, w, h); } };
  lab((isX ? 'Carré pour x' : 'Carré pour y'), W / 2, 14, main, 13);
  rect(ax, ay, X, X, mainF, main); lab(v + '²', ax + X / 2, ay + X / 2, '#e5e7eb', 17);
  rect(ax + X, ay, K, X, mainF, main); lab(bar, ax + X + K / 2, ay + X / 2, '#cbd5e1', 12);
  rect(ax, ay + X, X, K, mainF, main); lab(bar, ax + X / 2, ay + X + K / 2, '#cbd5e1', 12);
  // coin ajouté (jaune) = (b/2)²
  rect(ax + X, ay + X, K, K, 'rgba(251,191,36,0.34)', '#fbbf24'); lab(add, ax + X + K / 2, ay + X + K / 2, '#fde68a', 15);
  // contour + côté
  ctx.strokeStyle = '#e5e7eb'; ctx.lineWidth = 2.5; ctx.strokeRect(ax, ay, total, total);
  lab(side, ax + total / 2, ay - 12, '#e5e7eb', 12);
  ctx.save(); ctx.translate(ax - 12, ay + total / 2); ctx.rotate(-Math.PI / 2); lab(side, 0, 0, '#e5e7eb', 12); ctx.restore();
  lab('(' + side + ')²', ax + total / 2, ay + total + 20, '#ffffff', 15);
}

// Raccourcis clavier pendant une démo
document.addEventListener('keydown', (e) => {
  const ov = document.getElementById('demo-overlay');
  if (!ov || !ov.classList.contains('show')) return;
  if (e.key === 'Escape') { e.preventDefault(); closeDemo(); }
  else if (e.key === 'Enter' || e.key === 'ArrowRight') { e.preventDefault(); demoNext(); }
  else if (e.key === 'ArrowLeft') { e.preventDefault(); demoPrev(); }
});

// ── ÉCRAN DE BIENVENUE (1re visite) ──
(function welcomeScreen() {
  var KEY = 'mathsgr2_welcome_seen';
  var slides = [
    { emoji: '👋', title: 'Bienvenue sur GR2 Study !', text: 'Ton appli pour réviser toutes tes matières : Maths, Chimie, Bio… Choisis une matière en haut. 100% gratuit.' },
    { emoji: '📚', title: 'Apprends à ton rythme', text: 'Cours animés, formules clés, méthodes pas-à-pas, flashcards à répétition espacée et un générateur d’exercices à l’infini.' },
    { emoji: '🎮', title: 'Teste-toi et amuse-toi', text: 'Quiz, défi du jour, parties à plusieurs et chat mondial. Tu peux même installer l’appli et l’utiliser hors-ligne !' }
  ];
  var i = 0;
  function render(ov) {
    var s = slides[i];
    ov.querySelector('.wel-emoji').textContent = s.emoji;
    ov.querySelector('.wel-title').textContent = s.title;
    ov.querySelector('.wel-text').textContent = s.text;
    Array.prototype.forEach.call(ov.querySelectorAll('.wel-dot'), function (d, k) { d.classList.toggle('on', k === i); });
    ov.querySelector('.wel-next').textContent = (i === slides.length - 1) ? 'Commencer 🚀' : 'Suivant →';
  }
  function close(ov) { ov.classList.remove('show'); try { localStorage.setItem(KEY, '1'); } catch (e) {} setTimeout(function () { if (ov.parentNode) ov.remove(); }, 250); }
  window.showWelcome = function (force) {
    try { if (!force && localStorage.getItem(KEY) === '1') return; } catch (e) {}
    if (document.getElementById('welcome-overlay')) return;
    var ov = document.createElement('div');
    ov.id = 'welcome-overlay'; ov.className = 'wel-overlay'; ov.setAttribute('role', 'dialog');
    ov.innerHTML = '<div class="wel-card">' +
      '<button class="wel-skip" type="button">Passer</button>' +
      '<div class="wel-emoji"></div><h2 class="wel-title"></h2><p class="wel-text"></p>' +
      '<div class="wel-dots"><span class="wel-dot"></span><span class="wel-dot"></span><span class="wel-dot"></span></div>' +
      '<button class="wel-next" type="button"></button></div>';
    document.body.appendChild(ov);
    i = 0; render(ov);
    requestAnimationFrame(function () { ov.classList.add('show'); });
    ov.querySelector('.wel-skip').addEventListener('click', function () { close(ov); });
    ov.querySelector('.wel-next').addEventListener('click', function () { if (i < slides.length - 1) { i++; render(ov); } else { close(ov); } });
    ov.addEventListener('mousedown', function (e) { if (e.target === ov) close(ov); });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { setTimeout(function () { showWelcome(); }, 900); });
  else setTimeout(function () { showWelcome(); }, 900);
})();

// ── BLOC-NOTES / CALCULATRICE (brouillon pendant le quiz) ──
// Bouton flottant + panneau : une zone de brouillon libre + un mini-calcul SÛR
// (on n'évalue que chiffres et opérateurs, jamais de code). Utile pour les
// questions de calcul (distances, rayons, racines…).
(function initScratchpad() {
  function safeCalc(raw) {
    if (!raw) return '';
    // n'autorise QUE chiffres, espaces, opérateurs, parenthèses, point, √, ^, π
    let e = raw.replace(/√/g, 'Math.sqrt').replace(/π/g, 'Math.PI').replace(/\^/g, '**').replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-').replace(/,/g, '.');
    if (!/^[\d\s+\-*/.()]*(Math\.(sqrt|PI)[\d\s+\-*/.()]*)*$/.test(e.replace(/Math\.(sqrt|PI)/g, ''))) {
      // validation simple : après retrait des Math.*, il ne doit rester que des caractères sûrs
    }
    const cleaned = e.replace(/Math\.sqrt/g, '').replace(/Math\.PI/g, '');
    if (/[^\d\s+\-*/.()]/.test(cleaned)) return '⚠ caractère non autorisé';
    try {
      // eslint-disable-next-line no-new-func
      const v = Function('"use strict"; return (' + e + ')')();
      if (typeof v !== 'number' || !isFinite(v)) return '⚠';
      return '= ' + (Math.round(v * 1e6) / 1e6);
    } catch (_) { return '…'; }
  }

  function build() {
    if (document.getElementById('scratch-btn')) return;
    const btn = document.createElement('button');
    btn.id = 'scratch-btn';
    btn.type = 'button';
    btn.textContent = '🧮 Brouillon';
    btn.setAttribute('aria-label', 'Ouvrir le brouillon / calculatrice');
    btn.style.cssText = 'position:fixed; left:16px; bottom:16px; z-index:2400; padding:10px 14px; border-radius:12px; border:1px solid var(--color-nav); background:var(--bg-card); color:var(--color-nav); font-size:13px; font-weight:700; cursor:pointer; box-shadow:0 6px 20px rgba(0,0,0,0.35); display:none;';

    const panel = document.createElement('div');
    panel.id = 'scratch-panel';
    panel.style.cssText = 'position:fixed; left:16px; bottom:64px; z-index:2400; width:300px; max-width:88vw; background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:14px; padding:12px; box-shadow:0 12px 36px rgba(0,0,0,0.5); display:none;';
    panel.innerHTML =
      '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">' +
        '<strong style="font-size:13px; color:var(--text-primary);">🧮 Brouillon</strong>' +
        '<button type="button" id="scratch-close" style="background:transparent; border:none; color:var(--text-secondary); cursor:pointer; font-size:16px;">✕</button>' +
      '</div>' +
      '<div style="display:flex; gap:6px; margin-bottom:8px;">' +
        '<input id="scratch-calc" type="text" inputmode="text" dir="ltr" placeholder="ex : √(9+16)" style="flex:1; min-width:0; padding:8px 10px; border-radius:9px; border:1px solid var(--border-subtle); background:var(--bg-main); color:var(--text-primary); font-size:14px; direction:ltr; text-align:left;">' +
        '<span id="scratch-res" style="min-width:64px; text-align:right; font-weight:700; color:var(--color-parabole); font-size:14px; align-self:center;"></span>' +
      '</div>' +
      '<div style="display:grid; grid-template-columns:repeat(4,1fr); gap:5px; margin-bottom:8px;">' +
        ['C','←','(',')','7','8','9','÷','4','5','6','×','1','2','3','−','0','.','√(','^','π','+','='].map(function(k){
          var special = (k === 'C' || k === '←') ? 'color:#f87171; border-color:rgba(248,113,113,0.4);' :
                        (k === '=') ? 'grid-column:span 2; background:var(--color-nav); color:#fff; border-color:var(--color-nav); font-weight:700;' :
                        (/[0-9.]/.test(k) ? 'font-weight:600;' : 'color:var(--color-nav);');
          return '<button type="button" class="scratch-key" data-k="'+k+'" style="padding:9px 0; border-radius:8px; border:1px solid var(--border-subtle); background:var(--bg-main); color:var(--text-primary); cursor:pointer; font-size:15px; '+special+'">'+k+'</button>';
        }).join('') +
      '</div>' +
      '<textarea id="scratch-pad" dir="ltr" placeholder="Écris tes calculs ici…" style="width:100%; height:120px; resize:vertical; padding:8px; border-radius:9px; border:1px solid var(--border-subtle); background:var(--bg-main); color:var(--text-primary); font-size:14px; font-family:monospace; direction:ltr; text-align:left;"></textarea>';

    document.body.appendChild(btn);
    document.body.appendChild(panel);

    const calc = panel.querySelector('#scratch-calc');
    const res = panel.querySelector('#scratch-res');
    // Position du curseur SUIVIE à la main : fiable même quand on clique sur le pavé
    // (selectionStart est remis à 0 au clic souris dans certains navigateurs → texte inversé).
    let caret = 0;
    const clampCaret = () => { if (caret == null || caret < 0 || caret > calc.value.length) caret = calc.value.length; };
    const syncCaret = () => { try { if (calc.selectionStart != null) caret = calc.selectionStart; } catch (_) {} };
    const recalc = () => { res.textContent = safeCalc(calc.value); };
    const insertAtCalc = (v) => {
      clampCaret();
      calc.value = calc.value.slice(0, caret) + v + calc.value.slice(caret);
      caret += v.length;
      calc.focus();
      try { calc.setSelectionRange(caret, caret); } catch (_) {}
      recalc();
    };
    const backspaceCalc = () => {
      clampCaret();
      if (caret > 0) {
        calc.value = calc.value.slice(0, caret - 1) + calc.value.slice(caret);
        caret -= 1;
        calc.focus();
        try { calc.setSelectionRange(caret, caret); } catch (_) {}
      }
      recalc();
    };
    // Clavier physique / clic DANS le champ → on met à jour la position suivie
    calc.addEventListener('input', () => { syncCaret(); recalc(); });
    calc.addEventListener('keyup', syncCaret);
    calc.addEventListener('mouseup', syncCaret);
    calc.addEventListener('focus', syncCaret);
    btn.addEventListener('click', () => { const open = panel.style.display === 'block'; panel.style.display = open ? 'none' : 'block'; if (!open) { calc.focus(); syncCaret(); } });
    panel.querySelector('#scratch-close').addEventListener('click', () => { panel.style.display = 'none'; });
    panel.querySelectorAll('.scratch-key').forEach(k => {
      k.addEventListener('mousedown', e => e.preventDefault()); // garde le curseur dans le champ
      k.addEventListener('click', () => {
        const v = k.dataset.k;
        if (v === 'C') { calc.value = ''; caret = 0; recalc(); calc.focus(); return; }
        if (v === '←') { backspaceCalc(); return; }
        if (v === '=') { recalc(); return; }
        insertAtCalc(v);
      });
    });
    // restaure le brouillon entre sessions
    const pad = panel.querySelector('#scratch-pad');
    try { pad.value = localStorage.getItem('mathsgr2_scratch') || ''; } catch (_) {}
    pad.addEventListener('input', () => { try { localStorage.setItem('mathsgr2_scratch', pad.value); } catch (_) {} });
  }

  // n'afficher le bouton que dans la section Quiz
  window.updateScratchVisibility = function () {
    const btn = document.getElementById('scratch-btn');
    const panel = document.getElementById('scratch-panel');
    if (!btn) return;
    const quiz = document.getElementById('quiz');
    const onQuiz = quiz && quiz.classList.contains('active');
    btn.style.display = onQuiz ? 'block' : 'none';
    if (!onQuiz && panel) panel.style.display = 'none';
  };

  // Ancien brouillon FUSIONNÉ avec la feuille intelligente → outil unique « 🧮 Brouillon »
  // dans answersheet.js. On ne construit plus #scratch-btn ici (updateScratchVisibility
  // reste défini et inoffensif : il sort si le bouton n'existe pas).
})();



// Tableau de bord « À réviser aujourd'hui » — agrège TOUTES les matières.
var DASH_ICONS = { maths: '📐', francais: '✍️', anglais: '🇬🇧', neerlandais: '🇳🇱', histoire: '🏛️', geo: '🗺️', chimie: '🧪', bio: '🧬', eco: '💶' };
var DASH_LABELS = { maths: 'Maths', francais: 'Français', anglais: 'Anglais', neerlandais: 'Néerlandais', histoire: 'Histoire', geo: 'Géo', chimie: 'Chimie', bio: 'Bio', eco: 'Sciences éco' };
/* ════════════ Carte de Belgique interactive (Géo) ════════════ */
window._geoQuiz = null;
function geoPick(i) {
  if (window._geoQuiz != null) { geoMapCheck(i); return; }
  var p = (window.BE_PROVINCES || [])[i]; if (!p) return;
  document.querySelectorAll('#bemap .bemap-dot').forEach(function (d, k) { d.classList.remove('ok', 'no'); d.classList.toggle('sel', k === i); });
  var panel = document.getElementById('bemap-panel');
  if (panel) panel.innerHTML = '<strong style="font-size:16px;">' + (i + 1) + '. ' + p.n + '</strong><br>Région : <strong>' + p.r + '</strong> · Chef-lieu : <strong>' + p.c + '</strong>';
}
function geoMapQuiz() {
  var ps = window.BE_PROVINCES; if (!ps || !ps.length) return;
  var i = Math.floor(Math.random() * ps.length);
  window._geoQuiz = i;
  var p = ps[i];
  var hasChef = p.c && /^[A-ZÉ]/.test(p.c) && p.c.indexOf('commune') < 0;
  var byChef = hasChef && Math.random() < 0.5;
  var q = byChef ? 'Clique sur la province dont le chef-lieu est <strong>' + p.c + '</strong>' : 'Clique sur : <strong>' + p.n + '</strong>';
  var el = document.getElementById('bemap-quiz'); if (el) el.innerHTML = '🎯 ' + q;
  document.querySelectorAll('#bemap .bemap-dot').forEach(function (d) { d.classList.remove('sel', 'ok', 'no'); });
  var panel = document.getElementById('bemap-panel'); if (panel) panel.innerHTML = '🎯 <strong>Quiz carte</strong> en cours — clique la bonne pastille !';
}
function geoMapCheck(i) {
  var t = window._geoQuiz; var ps = window.BE_PROVINCES;
  var dots = document.querySelectorAll('#bemap .bemap-dot');
  var good = (i === t);
  if (dots[i]) dots[i].classList.add(good ? 'ok' : 'no');
  if (!good && dots[t]) dots[t].classList.add('ok');
  var el = document.getElementById('bemap-quiz');
  if (el) el.innerHTML = good
    ? '✅ Bravo ! <strong>' + ps[t].n + '</strong> (chef-lieu : ' + ps[t].c + ')'
    : '❌ C\'était <strong>' + ps[t].n + '</strong>. <button type="button" class="step-btn" onclick="geoMapQuiz()">↻ Rejouer</button>';
  window._geoQuiz = null;
  if (good) { if (typeof showToast === 'function') showToast('✅ Bien joué !', 'var(--color-parabole)'); setTimeout(geoMapQuiz, 1200); }
}

// Planning d'examen : enregistre/efface une date d'examen par matière
function setExamDate(key, val) {
  var d = loadSavedData(); d.examDates = d.examDates || {};
  if (val) d.examDates[key] = val; else delete d.examDates[key];
  saveData(d);
  if (typeof renderStudyDashboard === 'function') renderStudyDashboard();
  renderExamChip();
}

// Badge « prochain examen » dans l'en-tête (⏳ J-X · Matière). Lit les dates du
// planning (Mon profil) ; caché tant qu'aucune date n'est saisie. Clic → profil.
function renderExamChip() {
  var chip = document.getElementById('exam-chip');
  if (!chip) return;
  var dates = loadSavedData().examDates || {};
  var best = null;
  var today0 = new Date(); today0.setHours(0, 0, 0, 0);
  Object.keys(dates).forEach(function (key) {
    if (!dates[key]) return;
    // Comparaison de DATES à minuit : aujourd'hui = 0, demain = 1 (pas de décalage d'un jour).
    var dleft = Math.round((new Date(dates[key] + 'T00:00:00').getTime() - today0.getTime()) / 86400000);
    if (dleft < 0) return; // examen passé
    if (!best || dleft < best.dleft) best = { key: key, dleft: dleft };
  });
  if (!best) { chip.style.display = 'none'; return; }
  var label = (DASH_ICONS[best.key] || '📘') + ' ' + (DASH_LABELS[best.key] || best.key);
  chip.textContent = best.dleft === 0 ? ('🔥 Examen aujourd\'hui · ' + label)
                                      : ('⏳ J-' + best.dleft + ' · ' + label);
  chip.style.display = 'inline-flex';
  if (best.dleft <= 3) { chip.style.color = '#f87171'; chip.style.borderColor = 'rgba(248,113,113,0.45)'; chip.style.background = 'rgba(248,113,113,0.12)'; }
}
document.addEventListener('DOMContentLoaded', function () { setTimeout(renderExamChip, 600); });

// Lance un quiz CIBLÉ sur le chapitre faible d'une matière (depuis le dashboard).
function reviseWeakChapter(key, chapter) {
  try { setSubject(key); } catch (e) {}
  showSection('quiz');
  // setSubject reconstruit #chapter-filter ; on attend que l'écran quiz soit prêt.
  setTimeout(function () {
    var sel = document.getElementById('chapter-filter');
    if (sel && chapter && [].some.call(sel.options, function (o) { return o.value === chapter; })) {
      sel.value = chapter;
    }
    var df = document.getElementById('difficulty-filter'); if (df) df.value = 'all';
    if (typeof startQuiz === 'function') startQuiz();
  }, 90);
}

function renderStudyDashboard() {
  var el = document.getElementById('study-dashboard');
  if (!el || !window.SUBJECTS) return;
  var data = loadSavedData();
  var fcData = data.flashcardData || {};
  var mastered = data.masteredQuestions || {};
  var examHist = data.examHistory || {};
  var now = Date.now();
  var order = ['maths', 'francais', 'anglais', 'neerlandais', 'histoire', 'geo', 'chimie', 'bio', 'eco'];
  var rows = '', totalDue = 0;
  order.forEach(function (key) {
    var s = window.SUBJECTS[key];
    if (!s || !s.ready || !s.content) return;
    var c = s.content;
    var cards = c.flashcards || [];
    var due = cards.filter(function (card) { var r = fcData[card.front]; return !r || !r.due || new Date(r.due).getTime() <= now; }).length;
    totalDue += due;
    var qs = c.questions || [], chOrder = c.chapOrder || [], chLabels = c.chapLabels || {};
    var weak = null, weakPct = 101;
    chOrder.forEach(function (ch) {
      var chq = qs.filter(function (q) { return q.chapter === ch; });
      if (!chq.length) return;
      var mas = chq.filter(function (q) { return (mastered[q.q] || 0) >= 2; }).length;
      var pct = Math.round(mas / chq.length * 100);
      if (pct < weakPct) { weakPct = pct; weak = ch; }
    });
    var examBest = (examHist[key] && examHist[key].length) ? examHist[key].reduce(function (m, h) { return Math.max(m, h.note); }, 0) : null;
    var accent = (window.SUBJECT_ACCENTS && window.SUBJECT_ACCENTS[key]) || 'var(--color-nav)';
    var dueBadge = due > 0 ? '<span style="color:#fbbf24; font-weight:700;">🔔 ' + due + ' carte' + (due > 1 ? 's' : '') + '</span>' : '<span style="color:#34d399;">✓ à jour</span>';
    var hasWeak = (weak && weakPct < 100);
    var weakTxt = hasWeak ? 'point faible : <strong>' + (chLabels[weak] || weak) + '</strong> (' + weakPct + '%)' : '<span style="color:#34d399;">tout maîtrisé 🎉</span>';
    var examTxt = examBest != null ? ' · 📝 record ' + examBest + '/20' : '';
    var actBtn = 'font-size:12.5px; font-weight:700; border:none; border-radius:9px; padding:9px 13px; min-height:40px; cursor:pointer;';
    // couleur de matière assombrie (color-mix) → texte blanc lisible même sur les teintes claires (géo, histoire…)
    var quizBtn = hasWeak ? '<button type="button" onclick="reviseWeakChapter(\'' + key + '\',\'' + weak + '\')" style="' + actBtn + ' background:color-mix(in srgb, ' + accent + ' 70%, #000); color:#fff;">🎯 Quiz : ' + (chLabels[weak] || weak) + '</button>' : '';
    rows += '<div style="background:var(--bg-card); border:1px solid var(--border-subtle); border-left:5px solid ' + accent + '; border-radius:14px; padding:0.75rem 1rem; margin-bottom:0.55rem; color:var(--text-primary);">' +
      '<div style="display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap;"><span style="font-weight:700; font-size:15px;">' + (DASH_ICONS[key] || '📘') + ' ' + (DASH_LABELS[key] || key) + '</span>' + dueBadge + '</div>' +
      '<div style="font-size:12.5px; margin-top:3px; color:var(--text-secondary);">' + weakTxt + examTxt + '</div>' +
      '<div style="display:flex; gap:7px; flex-wrap:wrap; margin-top:8px;">' +
        '<button type="button" onclick="setSubject(\'' + key + '\'); showSection(\'flashcards\');" style="' + actBtn + ' background:var(--bg-main); color:var(--text-primary); border:1px solid var(--border-subtle);">🎴 Flashcards' + (due > 0 ? ' (' + due + ')' : '') + '</button>' +
        quizBtn +
      '</div></div>';
  });
  // Carte « objectif du jour + temps d'étude »
  var d0 = loadSavedData(); var st = _getStudy(d0); saveData(d0);
  var goalPct = Math.min(100, Math.round(st.dayActions / DAILY_GOAL * 100));
  var goalDone = st.dayActions >= DAILY_GOAL;
  var goalCard = '<div style="background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:16px; padding:1rem 1.2rem; margin-bottom:1rem;">' +
    '<div style="display:flex; justify-content:space-between; align-items:center; gap:10px; flex-wrap:wrap;">' +
    '<span style="font-weight:700;">🎯 Objectif du jour</span>' +
    '<span style="color:var(--text-secondary); font-size:13px;">' + st.dayActions + ' / ' + DAILY_GOAL + ' ' + (goalDone ? '✅' : '') + '</span></div>' +
    '<div style="height:12px; background:var(--border-subtle); border-radius:8px; overflow:hidden; margin-top:.5rem;"><div style="height:100%; width:' + goalPct + '%; background:' + (goalDone ? '#34d399' : 'var(--color-nav)') + '; border-radius:8px; transition:width .5s;"></div></div>' +
    '<p style="font-size:12.5px; color:var(--text-secondary); margin-top:.6rem;">⏱️ Aujourd\'hui : <strong>' + fmtDur(st.daySec) + '</strong> &nbsp;·&nbsp; Total : <strong>' + fmtDur(st.totalSec) + '</strong></p>' +
    '</div>';
  // Carte « planning d'examen » (compte à rebours + cartes/jour conseillées)
  var examDates = d0.examDates || {};
  var anyDate = Object.keys(examDates).length;
  var planRows = order.map(function (key) {
    var s = window.SUBJECTS[key]; if (!s || !s.ready || !s.content) return '';
    var total = (s.content.flashcards || []).length;
    var dateVal = examDates[key] || '';
    var info = '<span style="color:var(--text-secondary); font-size:12px;">pas de date</span>';
    if (dateVal) {
      // Comparaison de DATES à minuit : aujourd'hui = 0, demain = 1 (sinon tout est décalé d'un jour).
      var _t0 = new Date(); _t0.setHours(0, 0, 0, 0);
      var dleft = Math.round((new Date(dateVal + 'T00:00:00').getTime() - _t0.getTime()) / 86400000);
      if (dleft < 0) info = '<span style="color:var(--text-secondary);">examen passé</span>';
      else if (dleft === 0) info = '<span style="color:#f87171; font-weight:700;">C\'est aujourd\'hui ! 💪</span>';
      else {
        var perDay = total > 0 ? Math.max(1, Math.ceil(total / dleft)) : 0;
        info = '<span style="color:' + (dleft <= 3 ? '#f87171' : 'var(--color-nav)') + '; font-weight:700;">J-' + dleft + '</span>' + (perDay ? ' <span style="color:var(--text-secondary); font-size:12px;">· ~' + perDay + ' carte' + (perDay > 1 ? 's' : '') + '/jour</span>' : '');
      }
    }
    return '<div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap; padding:.45rem 0; border-bottom:1px solid var(--border-subtle);">' +
      '<span style="font-weight:600; min-width:96px;">' + (DASH_ICONS[key] || '📘') + ' ' + (DASH_LABELS[key] || key) + '</span>' +
      '<input type="date" value="' + dateVal + '" onchange="setExamDate(\'' + key + '\', this.value)" style="background:var(--bg-main); color:var(--text-primary); border:1px solid var(--border-subtle); border-radius:8px; min-height:40px; padding:8px 10px; font-size:13px;">' +
      '<span style="font-size:13px;">' + info + '</span></div>';
  }).join('');
  var planningCard = '<details class="dash-plan" ' + (anyDate ? 'open' : '') + ' style="background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:16px; padding:.8rem 1.1rem; margin-bottom:1rem;">' +
    '<summary style="cursor:pointer; font-weight:700;">⏳ Planning d\'examen</summary>' +
    '<p style="font-size:12px; color:var(--text-secondary); margin:.5rem 0 .3rem;">Mets la date de chaque examen → jours restants + cartes/jour conseillées pour tout réviser à temps.</p>' +
    planRows + '</details>';
  var mixedBtn = totalDue > 0 ? '<button type="button" onclick="startMixedRevision()" class="nav-btn" style="display:block; width:100%; margin-bottom:0.9rem; background:linear-gradient(135deg, var(--color-nav), var(--color-parabole)); color:#fff; border:none;">🔀 Tout réviser (' + totalDue + ' carte' + (totalDue > 1 ? 's' : '') + ' mélangées)</button>' : '';
  el.innerHTML = '<h3 style="font-size:22px; font-weight:700; margin-bottom:0.7rem;">📅 À réviser aujourd\'hui</h3>' + goalCard + planningCard +
    '<p style="color:var(--text-secondary); font-size:13px; margin-bottom:0.9rem;">' +
    (totalDue > 0 ? '🔔 <strong>' + totalDue + '</strong> carte' + (totalDue > 1 ? 's' : '') + ' à réviser au total.' : 'Tout est à jour, bravo ! Clique une matière pour t\'entraîner quand même.') +
    '</p>' + mixedBtn + rows;
}

function updateProfile() {
  const data = loadSavedData();
  if (typeof renderStudyDashboard === 'function') renderStudyDashboard();

  // Clear dynamically added elements first
  document.querySelector('.stats-grid').innerHTML = '';
  const oldBadges = document.getElementById('badges-container');
  if (oldBadges) {
    const badgesParent = oldBadges.parentElement;
    if (badgesParent && badgesParent.id !== 'profil') badgesParent.remove();
  }
  const oldCalendar = document.getElementById('calendar-heatmap');
  if (oldCalendar) {
    const calendarParent = oldCalendar.parentElement;
    if (calendarParent && calendarParent.id !== 'profil') calendarParent.remove();
  }
  const oldChart = document.getElementById('score-chart-section'); // M5 — cet ID n'existe pas dans le DOM, le querySelector ne trouvera rien (nettoyage défensif conservé)
  if (oldChart) oldChart.remove();
  const oldXpSection = document.getElementById('xp-section');
  if (oldXpSection) oldXpSection.remove();
  const oldBreakdown = document.getElementById('subject-breakdown');
  if (oldBreakdown) oldBreakdown.remove();
  
  const statsData = [
    { id: 'total-quizzes', value: data.totalQuizzes || 0, label: 'Quiz complétés' },
    { id: 'avg-score', value: (data.totalQuizzes > 0 ? Math.round(data.totalScore / data.totalQuizzes) : 0) + '%', label: 'Score moyen' },
    { id: 'mastered-questions', value: (function () { var m = data.masteredQuestions || {}; var mi = data.missedQuestions || []; return Object.keys(m).filter(function (k) { return m[k] >= 2 && mi.indexOf(k) === -1; }).length; })(), label: 'Questions maîtrisées' },
    { id: 'mastered-cards', value: (function () { var fc = data.flashcardData || {}; return Object.keys(fc).filter(function (k) { return (fc[k].interval || 0) >= 7; }).length; })(), label: 'Cartes maîtrisées' },
    { id: 'current-streak', value: data.streak || 0, label: 'Jours consécutifs' },
    { id: 'xp-total', value: data.xp || 0, label: 'XP Total' },
    { id: 'level-display', value: data.level || 'Apprenti', label: 'Niveau' },
    { id: 'pomodoros-completed', value: (data.pomodorosCompleted || 0) + ' 🍅', label: 'Pomodoros' }
  ];
  statsData.forEach(s => {
    const el = document.createElement('div');
    el.className = 'stat-card';
    el.innerHTML = `<div class="stat-value">${s.value}</div><div class="stat-label">${s.label}</div>`;
    document.querySelector('.stats-grid').appendChild(el);
  });

  // Barre XP niveau
  const xpSection = document.createElement('div');
  xpSection.id = 'xp-section';
  xpSection.style.cssText = 'margin-bottom:2rem;';
  const xp = data.xp || 0;
  let xpPercent;
  if (xp >= 300) { xpPercent = 100; }
  else if (xp >= 100) { xpPercent = Math.round((xp - 100) / 200 * 100); }
  else { xpPercent = Math.min(100, Math.round(xp / 100 * 100)); }
  const nextLevel = data.xp >= 300 ? 'Max' : data.xp >= 100 ? '300 XP' : '100 XP';
  xpSection.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
      <span style="font-size:14px; color:var(--text-secondary);">⚡ Progression — ${data.level || 'Apprenti'}</span>
      <span style="font-size:13px; color:var(--color-nav);">${data.xp || 0} XP → ${nextLevel}</span>
    </div>
    <div style="height:8px; background:var(--border-subtle); border-radius:4px; overflow:hidden;">
      <div style="width:${xpPercent}%; height:100%; background:linear-gradient(90deg, var(--color-nav), var(--color-parabole)); border-radius:4px; transition:width 1s ease;"></div>
    </div>
  `;
  document.querySelector('.stats-grid').after(xpSection);

  // Progression par matière : une question compte comme « maîtrisée » seulement si elle a été
  // réussie AU MOINS 2 FOIS et qu'elle n'est pas en cours d'erreur (sinon le % grimpe à 100 %
  // après quelques questions faciles — ça ne reflète pas la vraie maîtrise).
  const mastered = data.masteredQuestions || {};
  const missedArr = data.missedQuestions || [];
  const subjRows = [];
  if (window.SUBJECTS) {
    Object.keys(window.SUBJECTS).forEach(key => {
      const s = window.SUBJECTS[key];
      const qs = s && s.content && s.content.questions;
      if (!s.ready || !qs || !qs.length) return;
      let done = 0;
      qs.forEach(q => { if ((mastered[q.q] || 0) >= 2 && missedArr.indexOf(q.q) === -1) done++; });
      subjRows.push({ key: key, icon: s.icon || '📘', label: s.label || key, done, total: qs.length });
    });
  }
  if (subjRows.length) {
    const bd = document.createElement('div');
    bd.id = 'subject-breakdown';
    bd.style.cssText = 'margin-bottom:2rem;';
    bd.innerHTML = '<h3 style="font-size:20px; font-weight:700; margin-bottom:1rem;">📚 Progression par matière</h3>' +
      subjRows.map(r => {
        const pct = r.total ? Math.round(r.done / r.total * 100) : 0;
        const accent = (window.SUBJECT_ACCENTS && window.SUBJECT_ACCENTS[r.key]) || 'var(--color-nav)';
        const done = pct >= 100;
        return '<div style="margin-bottom:0.85rem;">' +
          '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px; font-size:14px;">' +
            '<span style="font-weight:600; color:var(--text-primary);">' + r.icon + ' ' + r.label + (done ? ' ✅' : '') + '</span>' +
            '<span style="font-size:13px;"><span style="font-weight:800; color:' + accent + ';">' + pct + '%</span> <span style="color:var(--text-secondary);">· ' + r.done + '/' + r.total + '</span></span>' +
          '</div>' +
          '<div style="height:10px; background:var(--border-subtle); border-radius:6px; overflow:hidden;">' +
            '<div style="width:' + pct + '%; height:100%; background:linear-gradient(90deg, ' + accent + ', color-mix(in srgb, ' + accent + ' 55%, #ffffff)); border-radius:6px; transition:width 0.6s ease;"></div>' +
          '</div></div>';
      }).join('');
    xpSection.after(bd);
  }

  // Badges display
  const badgesSectionNew = document.createElement('div');
  badgesSectionNew.style.marginTop = '2rem';
  badgesSectionNew.innerHTML = `<h3 style="font-size:24px; font-weight:600; margin-bottom:1rem;">🏆 Badges</h3><div id="badges-container" style="display:flex; gap:10px; flex-wrap:wrap;"></div>`;
  document.getElementById('profil').appendChild(badgesSectionNew);
  
  if (typeof renderBadgeShowcase === 'function') renderBadgeShowcase();

  // Calendar heatmap
  const calendarSectionNew = document.createElement('div');
  calendarSectionNew.style.marginTop = '2rem';
  calendarSectionNew.innerHTML = `<h3 style="font-size:24px; font-weight:600; margin-bottom:1rem;">📅 Calendrier d'activité</h3><div id="calendar-heatmap" style="display:grid; grid-template-columns:repeat(7,1fr); gap:4px;"></div>`;
  document.getElementById('profil').appendChild(calendarSectionNew);
  
  const calendarContainer = document.getElementById('calendar-heatmap');
  const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
  days.forEach(day => {
    const dayLabel = document.createElement('div');
    dayLabel.style.cssText = 'font-size:12px; color:var(--text-secondary); text-align:center;';
    dayLabel.textContent = day;
    calendarContainer.appendChild(dayLabel);
  });

  // Aligner sur le lundi de la semaine courante pour un vrai calendrier Lun–Dim
  const todayRef = new Date();
  const todayNorm = new Date(todayRef.getFullYear(), todayRef.getMonth(), todayRef.getDate());
  const dowToday = (todayNorm.getDay() + 6) % 7; // 0=Lun, 6=Dim
  const monday = new Date(todayNorm);
  monday.setDate(todayNorm.getDate() - dowToday); // lundi de cette semaine
  const startDay = new Date(monday);
  startDay.setDate(monday.getDate() - 28); // 4 semaines avant = début des 5 semaines

  for (let i = 0; i < 35; i++) {
    const d = new Date(startDay);
    d.setDate(startDay.getDate() + i);
    const date = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    const activity = data.calendar[date] || 0;
    const cell = document.createElement('div');
    let bgColor = 'var(--bg-card)';
    if (activity >= 1) bgColor = 'rgba(52,211,153,0.3)';
    if (activity >= 3) bgColor = 'rgba(52,211,153,0.5)';
    if (activity >= 5) bgColor = 'rgba(52,211,153,0.7)';
    if (activity >= 7) bgColor = 'rgba(52,211,153,0.9)';
    cell.style.cssText = `width:30px; height:30px; background:${bgColor}; border-radius:4px;`;
    cell.title = `${date}: ${activity} question${activity !== 1 ? 's' : ''} répondue${activity !== 1 ? 's' : ''}`;
    calendarContainer.appendChild(cell);
  }

  // Barres de progression par chapitre
  const oldChapter = document.getElementById('chapter-mastery-section');
  if (oldChapter) oldChapter.remove();
  const chapterSection = document.createElement('div');
  chapterSection.id = 'chapter-mastery-section';
  chapterSection.style.marginTop = '2rem';
  const chapterCounts = { vecteur: 0, cercle: 0, droite: 0 };
  const chapterTotals = {
    vecteur: allQuestions.filter(q => q.chapter === 'vecteur').length,
    cercle: allQuestions.filter(q => q.chapter === 'cercle').length,
    droite: allQuestions.filter(q => q.chapter === 'droite').length
  };
  Object.keys(data.masteredQuestions || {}).forEach(questionText => {
    const q = allQuestions.find(q => q.q === questionText);
    if (q && chapterCounts[q.chapter] !== undefined) chapterCounts[q.chapter]++;
  });
  const chapterColors = { vecteur: 'var(--color-nav)', cercle: 'var(--color-cercle)', droite: 'var(--color-droite)' };
  const chapterLabels = { vecteur: '🧭 Vecteurs', cercle: '🔵 Cercle', droite: '📐 Droites' };
  chapterSection.innerHTML = '<h3 style="font-size:24px; font-weight:600; margin-bottom:1rem;">📊 Maîtrise par chapitre</h3>';
  ['vecteur','cercle','droite'].forEach(ch => {
    const pct = chapterTotals[ch] > 0 ? Math.round(chapterCounts[ch] / chapterTotals[ch] * 100) : 0;
    const row = document.createElement('div');
    row.style.marginBottom = '1rem';
    row.innerHTML = `
      <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
        <span style="font-size:14px; color:var(--text-secondary);">${chapterLabels[ch]}</span>
        <span style="font-size:14px; font-weight:600; color:${chapterColors[ch]};">${chapterCounts[ch]} / ${chapterTotals[ch]} (${pct}%)</span>
      </div>
      <div style="height:10px; background:var(--border-subtle); border-radius:5px; overflow:hidden;">
        <div style="width:${pct}%; height:100%; background:${chapterColors[ch]}; border-radius:5px; transition:width 1s ease;"></div>
      </div>`;
    chapterSection.appendChild(row);
  });
  document.getElementById('profil').appendChild(chapterSection);

  // ── Insights de confiance ── (exploite confidenceData jusque-là collecté sans usage)
  const oldConf = document.getElementById('confidence-insights-section');
  if (oldConf) oldConf.remove();
  const confSection = document.createElement('div');
  confSection.id = 'confidence-insights-section';
  confSection.style.marginTop = '2rem';
  const conf = data.confidenceData || {};
  const counts = { sure: 0, guessed: 0, didntknow: 0 };
  Object.values(conf).forEach(v => { if (counts[v] !== undefined) counts[v]++; });
  const totalConf = counts.sure + counts.guessed + counts.didntknow;
  let confInner = '<h3 style="font-size:24px; font-weight:600; margin-bottom:1rem;">🧭 Confiance sur tes réponses</h3>';
  if (totalConf === 0) {
    confInner += '<p style="color:var(--text-secondary);">Réponds à un quiz et indique ton niveau de confiance après chaque question pour voir tes tendances ici.</p>';
  } else {
    const toReview = counts.guessed + counts.didntknow;
    const items = [
      { emoji: '😊', label: "J'étais sûr", n: counts.sure, color: 'var(--color-parabole)' },
      { emoji: '🤔', label: "J'ai deviné", n: counts.guessed, color: 'var(--color-droite)' },
      { emoji: '😕', label: 'Je ne savais pas', n: counts.didntknow, color: '#f87171' }
    ];
    confInner += '<div style="display:flex; gap:12px; flex-wrap:wrap; margin-bottom:1rem;">';
    items.forEach(it => {
      const pct = Math.round(it.n / totalConf * 100);
      confInner += `<div style="flex:1; min-width:120px; background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:12px; padding:1rem; text-align:center;">
        <div style="font-size:26px;">${it.emoji}</div>
        <div style="font-size:22px; font-weight:700; color:${it.color};">${it.n}</div>
        <div style="font-size:12px; color:var(--text-secondary);">${it.label} · ${pct}%</div>
      </div>`;
    });
    confInner += '</div>';
    confInner += toReview > 0
      ? `<p style="color:var(--text-secondary); font-size:14px;">💡 ${toReview} réponse${toReview > 1 ? 's' : ''} « devinée${toReview > 1 ? 's' : ''} » ou « pas sûre${toReview > 1 ? 's' : ''} » : ce sont tes prochaines à consolider via <strong>⚠️ Réviser mes erreurs</strong>.</p>`
      : '<p style="color:var(--color-parabole); font-size:14px;">💪 Tu étais sûr de toi à chaque fois — excellent !</p>';
  }
  confSection.innerHTML = confInner;
  document.getElementById('profil').appendChild(confSection);

  if (typeof renderProgressCharts === 'function') renderProgressCharts();

  const canvas = document.getElementById('score-chart-canvas');
  if (canvas) {
    // F2 — redimensionner le canvas à sa taille d'affichage réelle pour éviter les labels minuscules sur mobile
    const displayW = canvas.offsetWidth || 600;
    canvas.width = displayW;
    canvas.height = Math.round(displayW * (200 / 600));
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    const history = (data.scoreHistory || []).slice(-7);
    ctx.clearRect(0, 0, W, H);
    if (history.length === 0) {
      ctx.fillStyle = getThemeColor('--text-secondary', '#94a3b8');
      ctx.font = '14px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Complète un quiz pour voir tes scores ici', W/2, H/2);
    } else {
      const pad = 30, barGap = 12;
      const barW = (W - pad*2 - barGap * (history.length-1)) / history.length;
      history.forEach((score, i) => {
        const barH = ((score / 100) * (H - pad - 20));
        const x = pad + i * (barW + barGap);
        const y = H - pad - barH;
        const grad = ctx.createLinearGradient(x, y, x, H-pad);
        // F6 — couleurs adaptées au thème actif
        const navColor = getThemeColor('--color-nav', '#a78bfa');
        const droiteColor = getThemeColor('--color-droite', '#fbbf24');
        grad.addColorStop(0, score >= 70 ? navColor : (score >= 50 ? droiteColor : '#f87171'));
        grad.addColorStop(1, score >= 70 ? navColor : (score >= 50 ? droiteColor : '#dc2626'));
        ctx.fillStyle = grad;
        ctx.beginPath();
        const r = Math.min(6, barW/2);
        // B11 — polyfill roundRect for Safari/Firefox < 112
        if (ctx.roundRect) {
          ctx.roundRect(x, y, barW, barH, [r, r, 0, 0]);
        } else {
          ctx.rect(x, y, barW, barH);
        }
        ctx.fill();
        ctx.fillStyle = getThemeColor('--text-primary', '#e2e8f0');
        ctx.font = 'bold 11px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(score + '%', x + barW/2, y - 5);
        ctx.fillStyle = getThemeColor('--text-secondary', '#94a3b8');
        ctx.font = '10px Inter';
        ctx.fillText('S' + (i+1), x + barW/2, H - 10);
      });
    }
  }
}

function showConfidenceRating(qi) {
  const qDiv = document.querySelectorAll('.quiz-q')[qi];
  if (!qDiv) return; // Guard against out-of-bounds (E17)
  const ratingDiv = document.createElement('div');
  ratingDiv.className = 'confidence-rating';
  ratingDiv.style.cssText = 'margin-top:1rem; padding:1rem; background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:8px;';
  ratingDiv.innerHTML = `
    <p style="font-size:14px; color:var(--text-secondary); margin-bottom:0.5rem;">Niveau de confiance :</p>
    <div style="display:flex; gap:10px;">
      <button onclick="recordConfidence(${qi}, 'sure')" style="flex:1; padding:8px; border:1px solid var(--border-subtle); border-radius:6px; cursor:pointer; background:var(--bg-main); border:1px solid var(--border-subtle); color:var(--text-secondary);">😊 J'étais sûr</button>
      <button onclick="recordConfidence(${qi}, 'guessed')" style="flex:1; padding:8px; border:1px solid var(--border-subtle); border-radius:6px; cursor:pointer; background:var(--bg-main); border:1px solid var(--border-subtle); color:var(--text-secondary);">🤔 J'ai deviné</button>
      <button onclick="recordConfidence(${qi}, 'didntknow')" style="flex:1; padding:8px; border:1px solid var(--border-subtle); border-radius:6px; cursor:pointer; background:var(--bg-main); border:1px solid var(--border-subtle); color:var(--text-secondary);">😕 Je ne savais pas</button>
    </div>
  `;
  qDiv.appendChild(ratingDiv);
}

function recordConfidence(qi, confidence) {
  const data = loadSavedData();
  const q = currentQuestions[qi];
  const qKey = q ? q.q : `q_${qi}`;
  data.confidenceData[qKey] = confidence;
  // Keep only last 100 entries to avoid unbounded growth
  const keys = Object.keys(data.confidenceData);
  if (keys.length > 100) {
    keys.slice(0, keys.length - 100).forEach(k => delete data.confidenceData[k]);
  }
  saveData(data);

  // H4 — Cibler le bon widget de confiance via l'index qi, pas le premier trouvé
  const qDiv = document.querySelectorAll('.quiz-q')[qi];
  const ratingDiv = qDiv ? qDiv.querySelector('.confidence-rating') : null;
  if (ratingDiv) ratingDiv.style.display = 'none';
}

let activeFlashcardEffects = [];

function toggleFlashcardEffect(effect) {
  const wrapper = document.getElementById('flashcard');
  const container = document.getElementById('flashcard-container');
  if (effect === 'none') {
    activeFlashcardEffects = [];
    wrapper.className = wrapper.className.replace(/flashcard-fx-\w+/g, '');
    container.className = container.className.replace(/flashcard-fx-\w+/g, '');
    document.querySelectorAll('[id^="fx-"]').forEach(b => b.classList.remove('active'));
    document.getElementById('fx-off-btn').classList.add('active');
  } else {
    document.getElementById('fx-off-btn').classList.remove('active');
    const idx = activeFlashcardEffects.indexOf(effect);
    if (idx === -1) {
      if (activeFlashcardEffects.length >= 2) {
        const removed = activeFlashcardEffects.shift();
        const removedTarget = removed === 'glow' ? container : wrapper;
        removedTarget.classList.remove(`flashcard-fx-${removed}`);
        const removedBtn = document.getElementById(`fx-${removed}-btn`);
        if (removedBtn) removedBtn.classList.remove('active');
      }
      activeFlashcardEffects.push(effect);
      const target = effect === 'glow' ? container : wrapper;
      target.classList.add(`flashcard-fx-${effect}`);
      const addBtn = document.getElementById(`fx-${effect}-btn`); if (addBtn) addBtn.classList.add('active');
    } else {
      activeFlashcardEffects.splice(idx, 1);
      const target = effect === 'glow' ? container : wrapper;
      target.classList.remove(`flashcard-fx-${effect}`);
      const removeBtn = document.getElementById(`fx-${effect}-btn`); if (removeBtn) removeBtn.classList.remove('active');
      if (activeFlashcardEffects.length === 0) {
        document.getElementById('fx-off-btn').classList.add('active');
      }
    }
  }
  localStorage.setItem('mathsgr2_flashcard_fx', activeFlashcardEffects.join(','));
}

// Flashcards functionality
// flashcards défini dans data.js


let currentFlashcardIndex = 0;
let isFlipped = false;
let flashcardData = {};

let filteredFlashcards = null;

// Reconstruit les puces de filtre des flashcards selon la matière active
// (chapitres tirés de CHAP_ORDER / CHAP_LABELS) — fonctionne pour Maths, Chimie, Bio…
function rebuildFlashcardFilters() {
  const wrap = document.getElementById('fc-filters');
  if (!wrap) return;
  const order = (typeof CHAP_ORDER !== 'undefined' && CHAP_ORDER) ? CHAP_ORDER : [];
  const labels = (typeof CHAP_LABELS !== 'undefined' && CHAP_LABELS) ? CHAP_LABELS : {};
  let html = '<button type="button" class="fc-chip on" data-ch="all" onclick="filterFlashcards(\'all\')">Toutes</button>';
  html += '<button type="button" class="fc-chip fc-chip-due" data-ch="due" onclick="filterFlashcards(\'due\')">🔔 À réviser</button>';
  html += '<button type="button" class="fc-chip fc-chip-fav" data-ch="fav" onclick="filterFlashcards(\'fav\')">⭐ Favoris</button>';
  html += '<button type="button" class="fc-chip fc-chip-hard" data-ch="hard" onclick="filterFlashcards(\'hard\')">😓 Difficiles</button>';
  // 🎨 « Mes cartes » : accès direct aux flashcards que l'élève a lui-même créées
  if (typeof flashcards !== 'undefined' && flashcards.some(function (c) { return c._custom; })) {
    html += '<button type="button" class="fc-chip fc-chip-mine" data-ch="mine" onclick="filterFlashcards(\'mine\')">🎨 Mes cartes</button>';
  }
  order.forEach(function (ch) {
    html += '<button type="button" class="fc-chip" data-ch="' + ch + '" onclick="filterFlashcards(\'' + ch + '\')">' + (labels[ch] || ch) + '</button>';
  });
  wrap.innerHTML = html;
}

function _dueCards() {
  const now = Date.now();
  return flashcards.filter(c => { const r = flashcardData[c.front]; return !r || !r.due || new Date(r.due).getTime() <= now; });
}

function filterFlashcards(chapter) {
  if (chapter === 'due') {
    filteredFlashcards = _dueCards();
  } else if (chapter === 'fav') {
    const favs = _favCards();
    filteredFlashcards = flashcards.filter(c => favs.indexOf(c.front) >= 0);
  } else if (chapter === 'hard') {
    filteredFlashcards = flashcards.filter(c => { const r = flashcardData[c.front]; return r && r.rating === 'hard'; });
  } else if (chapter === 'mine') {
    filteredFlashcards = flashcards.filter(c => c._custom);
  } else {
    filteredFlashcards = chapter === 'all' ? null : flashcards.filter(c => c.chapter === chapter);
  }
  buildFlashcardQueue();           // re-trie la file par échéance pour le nouveau filtre
  currentFlashcardIndex = 0;
  document.querySelectorAll('#fc-filters .fc-chip').forEach(b => {
    b.classList.toggle('on', b.dataset.ch === chapter);
  });
  // Filtre vide (dues, favoris, difficiles, mes cartes) → message sympa au lieu d'une carte vide
  if ((chapter === 'due' || chapter === 'fav' || chapter === 'hard' || chapter === 'mine') && filteredFlashcards.length === 0) {
    const c = document.getElementById('flashcard-content');
    const bc = document.getElementById('flashcard-back-content');
    if (c) c.innerHTML = chapter === 'fav' ? '⭐ Aucun favori' : (chapter === 'hard' ? '💪 Aucune carte difficile' : (chapter === 'mine' ? '🎨 Aucune carte perso' : '🎉 Tout est à jour !'));
    if (bc) bc.innerHTML = chapter === 'fav' ? 'Touche « ☆ Favori » sur une carte pour la garder ici.' : (chapter === 'hard' ? 'Une carte arrive ici quand tu réponds « 😓 Je ne savais pas ». Rien pour l\'instant, bravo !' : (chapter === 'mine' ? 'Crée tes propres cartes dans 🎨 Mes créations → 🎴 Flashcards.' : 'Aucune carte à réviser aujourd\'hui. Reviens demain ou choisis « Toutes ».'));
    const prog = document.getElementById('flashcard-progress'); if (prog) prog.textContent = '0 / 0';
    const ctrl = document.getElementById('flashcard-controls'); if (ctrl) ctrl.style.display = 'none';
    updateDueCount();
    return;
  }
  loadFlashcard();
}
// ── RÉPÉTITION ESPACÉE ──
// Échéance d'une carte : date à laquelle elle doit être revue. Une carte jamais
// révisée (ou sans échéance) a une priorité maximale (timestamp 0).
let flashcardQueue = [];
function dueTimestamp(front) {
  const rec = flashcardData[front];
  if (!rec || !rec.due) return 0;
  return new Date(rec.due).getTime();
}
// File de session triée « intelligemment ». Construite à l'ouverture / au changement
// de filtre, PAS re-triée en pleine session. Priorité (révision espacée renforcée) :
//   1) les cartes À RÉVISER aujourd'hui passent avant celles déjà à jour ;
//   2) parmi les cartes dues, celles marquées « 😓 difficile » d'abord ;
//   3) puis de la plus en retard à la plus récente (échéance croissante).
function buildFlashcardQueue() {
  const base = filteredFlashcards || flashcards;
  const now = Date.now();
  flashcardQueue = [...base].sort((a, b) => {
    const ra = flashcardData[a.front], rb = flashcardData[b.front];
    const da = (!ra || !ra.due) ? 0 : new Date(ra.due).getTime();
    const db = (!rb || !rb.due) ? 0 : new Date(rb.due).getTime();
    const dueA = da <= now ? 0 : 1, dueB = db <= now ? 0 : 1;
    if (dueA !== dueB) return dueA - dueB;                 // 1) dues avant non-dues
    if (dueA === 0) {                                       // 2) parmi les dues : difficiles d'abord
      const ha = ra && ra.rating === 'hard' ? 0 : 1, hb = rb && rb.rating === 'hard' ? 0 : 1;
      if (ha !== hb) return ha - hb;
    }
    return da - db;                                         // 3) échéance croissante
  });
  return flashcardQueue;
}
function getActiveFlashcards() {
  return flashcardQueue.length ? flashcardQueue : (filteredFlashcards || flashcards);
}
// Nombre de cartes à réviser aujourd'hui dans le filtre courant.
function countDueFlashcards() {
  const base = filteredFlashcards || flashcards;
  const now = Date.now();
  return base.filter(c => {
    const r = flashcardData[c.front];
    return !r || !r.due || new Date(r.due).getTime() <= now;
  }).length;
}
function updateDueCount() {
  const el = document.getElementById('flashcard-due-count');
  if (!el) return;
  const n = countDueFlashcards();
  el.textContent = n > 0
    ? `🔔 ${n} carte${n > 1 ? 's' : ''} à réviser aujourd'hui`
    : '✓ Tout est à jour — révision en avance';
  el.style.color = n > 0 ? 'var(--color-droite)' : 'var(--color-parabole)';
  updateFcStats();
}

// Mini-bilan de progression sur TOUTE la matière : cartes sues / en cours / nouvelles
// (« sue » = intervalle ≥ 7 jours = bien ancrée en mémoire). Barre + texte sous le compteur.
function updateFcStats() {
  const el = document.getElementById('flashcard-stats');
  if (!el) return;
  const all = (typeof flashcards !== 'undefined' && flashcards) ? flashcards : [];
  const total = all.length;
  if (!total) { el.innerHTML = ''; return; }
  let known = 0, learning = 0, fresh = 0, hard = 0;
  all.forEach(c => {
    const r = flashcardData[c.front];
    if (!r) { fresh++; return; }
    if (r.rating === 'hard') hard++;
    if ((r.interval || 0) >= 7) known++; else learning++;
  });
  const pct = x => Math.round(x / total * 100);
  el.innerHTML =
    '<div style="height:8px; border-radius:5px; overflow:hidden; display:flex; background:var(--border-subtle);">' +
      '<div style="width:' + pct(known) + '%; background:var(--color-parabole);"></div>' +
      '<div style="width:' + pct(learning) + '%; background:var(--color-nav);"></div>' +
    '</div>' +
    '<p style="font-size:12px; color:var(--text-secondary); margin:5px 0 0;">' +
      '✅ ' + known + ' sue' + (known > 1 ? 's' : '') + ' · 📘 ' + learning + ' en cours · 🆕 ' + fresh + ' nouvelle' + (fresh > 1 ? 's' : '') +
      (hard ? ' · <span style="color:#f87171;">😓 ' + hard + ' difficile' + (hard > 1 ? 's' : '') + '</span>' : '') +
    '</p>';
}

function initFlashcards() {
  const data = loadSavedData();
  flashcardData = data.flashcardData || {};
  // reconstruit les filtres (fait apparaître/disparaître « 🎨 Mes cartes » selon les créations)
  try { rebuildFlashcardFilters(); } catch (e) {}
  fcSessionCount = 0;
  const _se = document.getElementById('fc-session'); if (_se) { _se.style.display = 'none'; _se.textContent = ''; }
  fcWriteMode = localStorage.getItem('mathsgr2_fc_write') === '1';
  const wb = document.getElementById('fc-write-btn'); if (wb) wb.classList.toggle('speaking', fcWriteMode);
  // B11 — reset filter to 'all' on every section entry so stale chapter filter clears
  if (filteredFlashcards !== null) { filterFlashcards('all'); }
  else { buildFlashcardQueue(); currentFlashcardIndex = 0; loadFlashcard(); }
}

function loadFlashcard() {
  hasFlippedOnce = false;
  try { if (window.speechSynthesis) { window.speechSynthesis.cancel(); var sb = document.getElementById('fc-speak-btn'); if (sb) sb.classList.remove('speaking'); } } catch (_) {}
  document.getElementById('flashcard').classList.remove('instant');
  const cards = getActiveFlashcards();
  if (!cards.length) return;
  // Clamp index to valid range (prevents out-of-bounds after filter change)
  if (currentFlashcardIndex >= cards.length) currentFlashcardIndex = 0;
  const card = cards[currentFlashcardIndex];
  const content = document.getElementById('flashcard-content');
  const backContent = document.getElementById('flashcard-back-content');
  content.innerHTML = card.front;
  backContent.innerHTML = card.back;
  isFlipped = false;
  document.getElementById('flashcard').classList.remove('flipped');
  document.getElementById('flashcard-controls').style.display = 'none';
  document.getElementById('flashcard-progress').textContent = `Carte ${currentFlashcardIndex + 1} / ${getActiveFlashcards().length}`;
  
  const progBar = document.getElementById('flashcard-prog-bar');
  if (progBar) progBar.style.width = `${((currentFlashcardIndex + 1) / getActiveFlashcards().length) * 100}%`;
  
  const rec = flashcardData[card.front];
  const intervalEl = document.getElementById('flashcard-interval');
  if (!rec) {
    intervalEl.textContent = '🆕 Nouvelle carte';
  } else {
    const dueMs = rec.due ? new Date(rec.due).getTime() : 0;
    const days = Math.ceil((dueMs - Date.now()) / 86400000);
    intervalEl.textContent = days <= 0
      ? `🔁 À réviser maintenant (intervalle ${rec.interval} j)`
      : `📅 Prochain rappel dans ${days} jour${days > 1 ? 's' : ''}`;
  }
  updateDueCount();

  // Mode « écrire » + favori : reset à chaque carte
  const _wi = document.getElementById('fc-write-input'); if (_wi) _wi.value = '';
  const _wr = document.getElementById('fc-write-result'); if (_wr) _wr.innerHTML = '';
  updateWriteUI();
  updateFavStar(card.front);

  // Forcer MathJax à re-rendre après changement de innerHTML
  const fcFront = document.getElementById('flashcard-content');
  const fcBack = document.getElementById('flashcard-back-content');
  if (window.MathJax && MathJax.typesetClear) {
    MathJax.typesetClear([fcFront, fcBack]);
  }
  safeMathJax([fcFront, fcBack]);
}

// Lecture audio (synthèse vocale) du côté visible de la flashcard.
function speakFlashcard() {
  if (!('speechSynthesis' in window)) { if (typeof showToast === 'function') showToast('Lecture audio non disponible sur ce navigateur', '#f87171'); return; }
  const cards = getActiveFlashcards();
  const card = cards[currentFlashcardIndex];
  if (!card) return;
  const raw = isFlipped ? card.back : card.front;
  const txt = _stripTags(raw).replace(/\s+/g, ' ').trim();
  if (!txt) return;
  const btn = document.getElementById('fc-speak-btn');
  // Re-clic pendant la lecture → on coupe
  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
    if (btn) btn.classList.remove('speaking');
    return;
  }
  const u = new SpeechSynthesisUtterance(txt);
  u.lang = (window.currentSubject === 'anglais') ? 'en-US' : 'fr-FR';
  u.rate = 0.95;
  if (btn) btn.classList.add('speaking');
  u.onend = u.onerror = function () { if (btn) btn.classList.remove('speaking'); };
  window.speechSynthesis.speak(u);
}

// ── Mode « écrire la réponse » + favoris ──
let fcWriteMode = false;
function _favCards() { const d = loadSavedData(); return d.favoriteCards || []; }
function toggleWriteMode() {
  fcWriteMode = !fcWriteMode;
  try { localStorage.setItem('mathsgr2_fc_write', fcWriteMode ? '1' : '0'); } catch (_) {}
  const b = document.getElementById('fc-write-btn'); if (b) b.classList.toggle('speaking', fcWriteMode);
  const wi = document.getElementById('fc-write-input'); if (wi && fcWriteMode) setTimeout(() => wi.focus(), 30);
  updateWriteUI();
}
function updateWriteUI() {
  const w = document.getElementById('fc-write');
  if (w) w.style.display = (fcWriteMode && !isFlipped) ? 'block' : 'none';
}
function fcCheckWrite() {
  const inp = document.getElementById('fc-write-input');
  const res = document.getElementById('fc-write-result');
  const val = inp ? inp.value.trim() : '';
  if (res) res.innerHTML = val
    ? '✍️ Ta réponse : <strong>' + val.replace(/</g, '&lt;') + '</strong> — compare avec la correction ci-dessous 👇'
    : 'Voici la réponse 👇';
  if (!isFlipped) flipCard();
  updateWriteUI();
}
function toggleFavCard() {
  const cards = getActiveFlashcards();
  const card = cards[currentFlashcardIndex];
  if (!card) return;
  const d = loadSavedData();
  d.favoriteCards = d.favoriteCards || [];
  const idx = d.favoriteCards.indexOf(card.front);
  if (idx >= 0) d.favoriteCards.splice(idx, 1); else d.favoriteCards.push(card.front);
  saveData(d);
  updateFavStar(card.front);
}
function updateFavStar(front) {
  const b = document.getElementById('fc-fav-btn');
  if (!b) return;
  const fav = _favCards().indexOf(front) >= 0;
  b.textContent = fav ? '⭐ Favori' : '☆ Favori';
  b.classList.toggle('speaking', fav);
}

let hasFlippedOnce = false;
function flipCard() {
  isFlipped = !isFlipped;
  const inner = document.getElementById('flashcard');
  // After first flip, all subsequent flips are instant
  if (hasFlippedOnce) {
    inner.classList.add('instant');
  } else {
    inner.classList.remove('instant');
    hasFlippedOnce = true;
  }
  if (isFlipped) {
    inner.classList.add('flipped');
    document.getElementById('flashcard-controls').style.display = 'flex';
    // Le verso est déjà rendu dans loadFlashcard() — ne re-typeset QUE le verso, pas tout le document
    safeMathJax([document.getElementById('flashcard-back-content')]);
  } else {
    inner.classList.remove('flipped');
    document.getElementById('flashcard-controls').style.display = 'none';
  }
  updateWriteUI();
}

function rateCard(rating) {
  const cards = getActiveFlashcards();
  const card = cards[currentFlashcardIndex];
  if (!card) return;
  const data = loadSavedData();
  data.flashcardData = data.flashcardData || {};

  const prev = data.flashcardData[card.front]?.interval || 1;
  let interval = 1;
  if (rating === 'easy') interval = prev * 2;
  else if (rating === 'medium') interval = prev + 1; // H5 — avance d'1 jour au lieu de stagner
  else interval = 1;                                  // 'hard' → revoir demain

  // Échéance = aujourd'hui + intervalle (cœur de la répétition espacée)
  const due = new Date();
  due.setDate(due.getDate() + interval);
  data.flashcardData[card.front] = {
    interval: interval,
    lastReviewed: new Date().toISOString(),
    due: due.toISOString(),
    rating: rating            // mémorise la dernière auto-évaluation (pour le filtre « Difficiles »)
  };
  saveData(data);
  flashcardData = data.flashcardData;
  recordStudyAction();

  // Compteur de session + retour visuel « prochain rappel »
  fcSessionCount++;
  const sEl = document.getElementById('fc-session');
  if (sEl) { sEl.style.display = ''; sEl.textContent = '✅ ' + fcSessionCount + ' carte' + (fcSessionCount > 1 ? 's' : '') + ' révisée' + (fcSessionCount > 1 ? 's' : '') + ' cette session'; }
  if (typeof showToast === 'function') {
    const emo = rating === 'easy' ? '😊' : (rating === 'medium' ? '🤔' : '😓');
    showToast(emo + ' Revu — prochain rappel dans ' + interval + ' jour' + (interval > 1 ? 's' : ''), rating === 'hard' ? '#f87171' : 'var(--color-parabole)');
  }

  if (cards.length === 0) return;
  // A-t-on rendu la DERNIÈRE carte de la file ? Si oui, on a bouclé un tour complet.
  const _wasLast = currentFlashcardIndex >= cards.length - 1;
  // Avance dans la file de session (déjà triée par échéance), sans la re-trier
  currentFlashcardIndex = (currentFlashcardIndex + 1) % cards.length;
  // Tour terminé : petite récompense motivante (cartes multiples seulement).
  if (_wasLast && cards.length > 1) {
    if (typeof celebrate === 'function') celebrate('🎉 Tour terminé — ' + fcSessionCount + ' carte' + (fcSessionCount > 1 ? 's' : '') + ' revue' + (fcSessionCount > 1 ? 's' : '') + ' !');
    else if (typeof showToast === 'function') showToast('🎉 Tour terminé — ' + fcSessionCount + ' cartes revues !', 'var(--color-parabole)');
  }
  loadFlashcard();
}

// Revenir à la carte précédente de la session (navigation seule, ne touche pas à la répétition espacée)
function prevFlashcard() {
  const cards = getActiveFlashcards();
  if (!cards || cards.length < 2) { if (typeof showToast === 'function') showToast('Pas de carte précédente', '#f87171'); return; }
  currentFlashcardIndex = (currentFlashcardIndex - 1 + cards.length) % cards.length;
  loadFlashcard();
}

// Compteur de cartes révisées dans la session courante
let fcSessionCount = 0;

// Mélange la file de cartes en cours et repart du début
function shuffleFlashcards() {
  const cards = getActiveFlashcards();
  if (!cards || cards.length < 2) { if (typeof showToast === 'function') showToast('Pas assez de cartes à mélanger', '#f87171'); return; }
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const t = cards[i]; cards[i] = cards[j]; cards[j] = t;
  }
  currentFlashcardIndex = 0;
  loadFlashcard();
  if (typeof showToast === 'function') showToast('🔀 Cartes mélangées', 'var(--color-nav)');
}

// Révision « tout en un » : mélange les cartes DUES de toutes les matières en une seule session
function startMixedRevision() {
  const data = loadSavedData(); const fc = data.flashcardData || {}; const now = Date.now();
  const pool = [];
  ['maths', 'francais', 'anglais', 'neerlandais', 'histoire', 'geo', 'chimie', 'bio', 'eco'].forEach(function (k) {
    const s = window.SUBJECTS && window.SUBJECTS[k];
    if (!s || !s.ready || !s.content || !s.content.flashcards) return;
    s.content.flashcards.forEach(function (c) {
      const r = fc[c.front];
      if (!r || !r.due || new Date(r.due).getTime() <= now) pool.push({ front: c.front, back: c.back, chapter: c.chapter, _subj: k });
    });
  });
  if (!pool.length) { if (typeof showToast === 'function') showToast('Tout est à jour — aucune carte à réviser ! 🎉', 'var(--color-parabole)'); return; }
  for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); const t = pool[i]; pool[i] = pool[j]; pool[j] = t; }
  showSection('flashcards');
  setTimeout(function () {
    filteredFlashcards = pool;
    flashcardQueue = pool;
    currentFlashcardIndex = 0;
    fcSessionCount = 0;
    const se = document.getElementById('fc-session'); if (se) { se.style.display = 'none'; se.textContent = ''; }
    loadFlashcard();
    if (typeof showToast === 'function') showToast('🔀 Révision mixte : ' + pool.length + ' carte' + (pool.length > 1 ? 's' : '') + ' de toutes les matières', 'var(--color-nav)');
  }, 60);
}

// Saut direct vers une carte précise (utilisé par la recherche globale)
function jumpToFlashcard(front) {
  try {
    const cards = getActiveFlashcards();
    let idx = -1;
    for (let i = 0; i < cards.length; i++) { if (cards[i].front === front) { idx = i; break; } }
    if (idx >= 0) {
      currentFlashcardIndex = idx;
      loadFlashcard();
      const el = document.getElementById('flashcards');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  } catch (_) {}
}

// Journal functionality
function saveJournalEntry() {
  const rawEntry = document.getElementById('journal-entry').value.trim();
  if (!rawEntry) return;
  const entry = rawEntry.slice(0, 5000); // Limite 5000 chars pour éviter de saturer localStorage
  
  const data = loadSavedData();
  data.journalEntries = data.journalEntries || [];

  // F4 — limite portée à 50 entrées avec avertissement visible
  const MAX_ENTRIES = 50;
  if (data.journalEntries.length >= MAX_ENTRIES) {
    if (!confirm(`⚠️ Tu as atteint la limite de ${MAX_ENTRIES} entrées. La plus ancienne sera supprimée. Continuer ?`)) return;
    data.journalEntries = data.journalEntries.slice(0, MAX_ENTRIES - 1);
  }

  data.journalEntries.unshift({
    text: entry,
    date: new Date().toISOString()
  });
  
  saveData(data);
  document.getElementById('journal-entry').value = '';
  loadJournalHistory();
  showToast('✅ Entrée sauvegardée !', '#34d399');
}

function showToast(message, color = 'var(--color-nav)') {
  const existing = document.getElementById('toast-notification');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.id = 'toast-notification';
  toast.setAttribute('role', 'status');       // annoncé par les lecteurs d'écran
  toast.setAttribute('aria-live', 'polite');
  toast.textContent = message;
  toast.style.cssText = `position:fixed; bottom:80px; left:50%; transform:translateX(-50%);
    background:${color}; color:#fff; padding:12px 24px; border-radius:12px;
    font-size:15px; font-weight:600; z-index:9999;
    box-shadow:0 4px 20px rgba(0,0,0,0.3);
    animation:slideUpToast 0.3s ease, fadeOutToast 0.4s ease 1.6s forwards;`;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2000);
}

function loadJournalHistory() {
  const data = loadSavedData();
  const historyContainer = document.getElementById('journal-history');
  historyContainer.innerHTML = '';
  
  if (!data.journalEntries || data.journalEntries.length === 0) {
    historyContainer.innerHTML = '<p style="color:var(--text-secondary);">Aucune entrée pour le moment.</p>';
    return;
  }
  
  data.journalEntries.forEach((entry, i) => {
    const date = new Date(entry.date);
    const dateStr = date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    
    const entryDiv = document.createElement('div');
    entryDiv.style.cssText = 'background:var(--bg-card); border:1px solid var(--border-subtle); border-left:3px solid var(--color-nav); border-radius:12px; padding:1.5rem; position:relative; margin-bottom:1rem;';
    entryDiv.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.5rem;">
        <p style="font-size:12px; color:var(--color-nav); margin:0; font-weight:600;">📅 ${dateStr}</p>
        <button onclick="deleteJournalEntry('${entry.date}')" style="background:rgba(248,113,113,0.1); border:1px solid rgba(248,113,113,0.3); color:#f87171; border-radius:6px; padding:4px 10px; font-size:12px; cursor:pointer;" title="Supprimer">🗑️</button>
      </div>
    `;
    const textP = document.createElement('p');
    textP.style.cssText = 'font-size:15px; color:var(--text-primary); line-height:1.7; margin:0; white-space:pre-wrap;';
    textP.textContent = entry.text;
    entryDiv.appendChild(textP);
    historyContainer.appendChild(entryDiv);
  });
}

function deleteJournalEntry(dateKey) {
  if (!confirm('Supprimer cette entrée ?')) return;
  const data = loadSavedData();
  data.journalEntries = data.journalEntries || [];
  // F3 — utiliser la date comme clé stable plutôt que l'index fragile
  const idx = data.journalEntries.findIndex(e => e.date === dateKey);
  if (idx === -1) return;
  data.journalEntries.splice(idx, 1);
  saveData(data);
  loadJournalHistory();
}

// Pomodoro timer functionality
let pomodoroTimer = null;
let pomodoroTimeLeft = 1500;
let pomodoroIsWork = true;
let pomodoroPaused = false;
let pomodoroCount = 0;
const POMO_WORK = 1500;
const POMO_BREAK = 300;

function togglePomodoro() {
  const overlay = document.getElementById('pomodoro-overlay');
  if (overlay.style.display === 'flex') {
    overlay.style.display = 'none';
  } else {
    overlay.style.display = 'flex';
    // M1 — Ne démarrer que si pas déjà en cours ; sinon juste rafraîchir l'affichage
    if (!pomodoroTimer) {
      pomodoroTimeLeft = POMO_WORK;
      pomodoroIsWork = true;
      pomodoroPaused = false;
      pomodoroCount = 0;
      updatePomodoroDisplay();
      // M1 — Ne pas auto-démarrer : l'utilisateur clique ⏸ Pause / ↩ Reset pour lancer
    } else {
      updatePomodoroDisplay();
    }
  }
}

function hidePomodoroOverlay() {
  const overlay = document.getElementById('pomodoro-overlay');
  overlay.style.display = 'none';
  // Store that pomodoro is running in background
  localStorage.setItem('mathsgr2_pomodoro_running', 'true');
}

function pausePomodoro() {
  // M1 — Si le timer n'a jamais démarré, démarrer maintenant
  if (!pomodoroTimer) {
    startPomodoroTimer();
    const btn = document.getElementById('pomodoro-pause-btn');
    if (btn) btn.textContent = '⏸ Pause';
    return;
  }
  pomodoroPaused = !pomodoroPaused;
  const btn = document.getElementById('pomodoro-pause-btn');
  if (pomodoroPaused) {
    if (btn) btn.textContent = '▶ Reprendre';
  } else {
    startPomodoroTimer();
    if (btn) btn.textContent = '⏸ Pause';
  }
}

function resetPomodoro() {
  if (pomodoroTimer) clearInterval(pomodoroTimer);
  pomodoroTimer = null;
  pomodoroTimeLeft = POMO_WORK;
  pomodoroIsWork = true;
  pomodoroPaused = false;
  pomodoroCount = 0; // G1 — reset du compteur visuel
  // Réinitialiser les points visuels
  for (let d = 1; d <= 4; d++) {
    const dot = document.getElementById(`pomo-${d}`);
    if (dot) dot.style.background = 'var(--border-subtle)';
  }
  const countEl = document.getElementById('pomo-count');
  if (countEl) countEl.textContent = '0';
  const btn = document.getElementById('pomodoro-pause-btn');
  if (btn) btn.textContent = '▶ Démarrer';
  updatePomodoroDisplay();
  updatePomodoroDisplayMode(); // masque le widget flottant/barre (plus de session active)
  // M1 — Ne pas auto-démarrer après reset
}

function startPomodoroTimer() {
  if (pomodoroTimer) clearInterval(pomodoroTimer);
  pomodoroTimer = setInterval(() => {
    if (pomodoroPaused) return;
    pomodoroTimeLeft--;
    updatePomodoroDisplay();
    if (pomodoroTimeLeft <= 0) {
      clearInterval(pomodoroTimer);
      if (pomodoroIsWork) {
        pomodoroCount++;
        const pomData = loadSavedData();
        pomData.pomodorosCompleted = (pomData.pomodorosCompleted || 0) + 1;
        saveData(pomData);
        // Cap visual dots at 4, loop after (F11)
        const dotIndex = ((pomodoroCount - 1) % 4) + 1;
        if (pomodoroCount % 4 === 1 && pomodoroCount > 1) {
          // New cycle: reset all dots
          for (let d = 1; d <= 4; d++) {
            const dot = document.getElementById(`pomo-${d}`);
            if (dot) dot.style.background = 'var(--border-subtle)';
          }
        }
        const dot = document.getElementById(`pomo-${dotIndex}`);
        if (dot) dot.style.background = 'var(--color-parabole)';
        document.getElementById('pomo-count').textContent = dotIndex;
        pomodoroTimeLeft = POMO_BREAK;
        pomodoroIsWork = false;
        document.getElementById('pomodoro-status').textContent = '🎉 Pause 5 minutes — Bien mérité !';
        // AMÉLIORATION 4 — toast notification even if overlay is hidden
        showToast('🍅 Pomodoro terminé ! Prends ta pause.', 'var(--color-parabole)');
      } else {
        pomodoroTimeLeft = POMO_WORK;
        pomodoroIsWork = true;
        document.getElementById('pomodoro-status').textContent = 'Session de travail — Concentre-toi !';
        showToast('⚡ Pause terminée ! C\u2019est reparti.', 'var(--color-nav)');
      }
      startPomodoroTimer();
    }
  }, 1000);
  updatePomodoroDisplayMode(); // révèle le widget flottant/barre (un Pomodoro tourne)
}

function updatePomodoroDisplay() {
  const minutes = Math.floor(pomodoroTimeLeft / 60);
  const seconds = pomodoroTimeLeft % 60;
  document.getElementById('pomodoro-timer').textContent =
    `${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
  // Ring animation
  const total = pomodoroIsWork ? POMO_WORK : POMO_BREAK;
  const circumference = 439.8;
  const offset = circumference * (1 - pomodoroTimeLeft / total);
  const ring = document.getElementById('pomodoro-ring');
  if (ring) {
    ring.style.strokeDashoffset = offset;
    ring.style.stroke = pomodoroIsWork ? 'var(--color-nav)' : 'var(--color-parabole)';
  }
  // Update floating icon time
  updateFloatingPomodoroTime();
}

// Exam mode functionality
let examActive = false;
let examTimer = null;

function toggleExamMode() {
  if (examActive) {
    stopExamMode();
  } else {
    startExamMode();
  }
}

function startExamMode() {
  examActive = true;
  window._examRun = true; // marque la session comme « examen blanc » (pour la note /20)
  const btn = document.getElementById('exam-toggle-btn');
  if (btn) btn.textContent = '⏹ Arrêter l\'examen';

  // Reset ALL quiz state to avoid stale timers/answers from a previous quiz (E1)
  timerIds.forEach(id => clearInterval(id)); timerIds = [];
  score = 0; answered = 0; skipped = 0; correctStreak = 0;
  currentActiveQuestion = 0; questionAnswered = [];

  currentQuestions = shuffleArray([...allQuestions]).slice(0, 5).map(q => {
    const shuffled = shuffleOptions(q);
    return {...q, opts: shuffled.opts, ans: shuffled.ans};
  });
  showSection('quiz');
  // H3 — Afficher l'écran actif (buildQuiz injecte dans quiz-container, mais startQuiz n'est pas appelé)
  document.getElementById('quiz-start-screen').style.display = 'none';
  document.getElementById('quiz-active-screen').style.display = 'block';
  buildQuiz();

  // Exam countdown bar
  let examTimeLeft = 300;
  const timerBanner = document.createElement('div');
  timerBanner.id = 'exam-timer';
  timerBanner.style.cssText = 'position:fixed; bottom:0; left:0; right:0; z-index:2500; background:var(--bg-card); border-top:2px solid var(--color-nav); padding:8px 20px; display:flex; align-items:center; gap:16px;';
  timerBanner.innerHTML = `
    <span style="color:var(--color-nav); font-weight:700;">⏱️ Examen : <span id="exam-countdown">5:00</span></span>
    <div style="flex:1; height:6px; background:var(--border-subtle); border-radius:3px;">
      <div id="exam-bar" style="height:100%; width:100%; background:var(--color-nav); border-radius:3px; transition:width 1s linear;"></div>
    </div>
    <button onclick="stopExamMode()" style="background:var(--color-droite); color:white; border:none; border-radius:8px; padding:6px 14px; cursor:pointer; font-size:13px;">⏹ Arrêter</button>
  `;
  document.body.appendChild(timerBanner);

  examTimer = setInterval(() => {
    examTimeLeft--;
    const m = Math.floor(examTimeLeft / 60);
    const s = examTimeLeft % 60;
    const cd = document.getElementById('exam-countdown');
    const bar = document.getElementById('exam-bar');
    if (cd) cd.textContent = `${m}:${s.toString().padStart(2,'0')}`;
    if (bar) bar.style.width = `${(examTimeLeft/300)*100}%`;
    if (examTimeLeft <= 30 && bar) bar.style.background = 'var(--color-droite)';
    if (examTimeLeft <= 0) stopExamMode();
  }, 1000);
}

function stopExamMode() {
  examActive = false;
  if (examTimer) { clearInterval(examTimer); examTimer = null; }
  const banner = document.getElementById('exam-timer');
  if (banner) banner.remove();
  const btn = document.getElementById('exam-toggle-btn');
  if (btn) btn.textContent = '5 questions, 5 min →';
  // Only show summary if quiz is still in progress (not already shown by answer()) (E2)
  const container = document.getElementById('quiz-container');
  if (container && !container.querySelector('.formula-box')) showQuizSummary();
}

// Quiz mixte : pioche des questions au hasard dans TOUTES les matières.
function startMixedQuiz() {
  var pool = [];
  ['maths', 'francais', 'anglais', 'neerlandais', 'histoire', 'geo', 'chimie', 'bio', 'eco'].forEach(function (key) {
    var s = window.SUBJECTS && window.SUBJECTS[key];
    if (s && s.ready && s.content && s.content.questions) {
      s.content.questions.forEach(function (q) { pool.push(q); });
    }
  });
  if (!pool.length) return;
  examActive = false;
  window._examRun = false;
  timerIds.forEach(function (id) { clearInterval(id); }); timerIds = [];
  var ex = document.getElementById('exam-timer'); if (ex) ex.remove();
  score = 0; answered = 0; skipped = 0; correctStreak = 0; currentActiveQuestion = 0; questionAnswered = [];
  currentQuestions = shuffleArray([...pool]).slice(0, 10).map(function (q) {
    var sh = shuffleOptions(q);
    return Object.assign({}, q, { opts: sh.opts, ans: sh.ans });
  });
  showSection('quiz');
  document.getElementById('quiz-start-screen').style.display = 'none';
  document.getElementById('quiz-active-screen').style.display = 'block';
  buildQuiz();
}

// ── SIDEBAR MOBILE ──
function toggleSidebar() {
  // Le bouton ☰ ouvre le tiroir « Matières & onglets » (gestures.js), bien rangé.
  // (L'ancienne sidebar .nav cassait la mise en page sur mobile : panneau quasi vide.)
  if (typeof window.toggleNavDrawer === 'function') { window.toggleNavDrawer(); return; }
  document.querySelector('.nav').classList.toggle('open'); // repli si le tiroir n'est pas chargé
  document.getElementById('sidebar-overlay').classList.toggle('show');
}

// Police unique : Inter (chargée statiquement dans le <head> et appliquée via style.css).

// ── ANIMATION LEVEL ──
function setAnimLevel(level) {
  document.body.className = document.body.className.replace(/anim-\w+/g, '');
  if (level !== 'normal') document.body.classList.add(`anim-${level}`);
  localStorage.setItem('mathsgr2_anim', level);
  document.querySelectorAll('[id^="anim-btn-"]').forEach(b => b.classList.remove('active'));
  const btn = document.getElementById(`anim-btn-${level}`);
  if (btn) btn.classList.add('active');
}

// ── BACKGROUND EFFECTS ──
let particleAnimId = null;


// ── POMODORO DISPLAY ──
let pomodoroDisplayMode = 'float';
function setPomodoroDisplay(mode) {
  pomodoroDisplayMode = mode;
  localStorage.setItem('mathsgr2_pomo_display', mode);
  document.querySelectorAll('[id^="pomo-display-"]').forEach(b => b.classList.remove('active'));
  const btn = document.getElementById(`pomo-display-${mode}`);
  if (btn) btn.classList.add('active');
  updatePomodoroDisplayMode();
}

function updatePomodoroDisplayMode() {
  const floatIcon = document.getElementById('pomo-float-icon');
  const floatPanel = document.getElementById('pomo-float-panel');
  const barEl = document.getElementById('pomo-sticky-bar');

  // Le widget flottant / la barre n'apparaissent QUE si un Pomodoro est en cours
  // (sinon ils chevauchaient le contenu en permanence, surtout sur mobile).
  const active = pomodoroTimer !== null;
  if (!active) {
    if (floatIcon) floatIcon.style.display = 'none';
    if (floatPanel) floatPanel.style.display = 'none';
    if (barEl) barEl.style.display = 'none';
    return;
  }

  if (pomodoroDisplayMode === 'float') {
    if (!floatIcon) createFloatingPomodoro();
    else floatIcon.style.display = 'flex';
    if (barEl) barEl.style.display = 'none';
  } else {
    // 'bar' mode — sticky mini bar at bottom
    if (floatIcon) floatIcon.style.display = 'none';
    if (floatPanel) floatPanel.style.display = 'none';
    if (!barEl) createPomodoroBar();
    else document.getElementById('pomo-sticky-bar').style.display = 'flex';
  }
}

function createPomodoroBar() {
  const bar = document.createElement('div');
  bar.id = 'pomo-sticky-bar';
  bar.style.cssText = 'position:fixed; bottom:0; left:0; right:0; background:var(--bg-card); border-top:1px solid var(--border-subtle); z-index:1200; display:flex; align-items:center; gap:14px; padding:8px 20px; box-shadow:0 -2px 12px rgba(0,0,0,0.2);';
  bar.innerHTML = `
    <span style="font-size:18px;">⏱️</span>
    <span id="pomo-bar-time" style="font-weight:700; font-size:16px; color:var(--color-nav); min-width:55px;">25:00</span>
    <span id="pomo-bar-status" style="font-size:12px; color:var(--text-secondary); flex:1;">Session de travail</span>
    <button onclick="pausePomodoro()" style="padding:5px 12px; background:var(--color-nav); color:white; border:none; border-radius:6px; cursor:pointer; font-size:12px; font-weight:600;">▶ Démarrer</button>
    <button onclick="togglePomodoro()" style="padding:5px 12px; background:transparent; color:var(--text-secondary); border:1px solid var(--border-subtle); border-radius:6px; cursor:pointer; font-size:12px;">Ouvrir</button>
  `;
  document.body.appendChild(bar);
}

function createFloatingPomodoro() {
  const floatIcon = document.createElement('div');
  floatIcon.id = 'pomo-float-icon';
  floatIcon.style.cssText = 'position:fixed; bottom:20px; right:20px; width:60px; height:60px; background:var(--color-nav); border-radius:50%; display:flex; align-items:center; justify-content:center; cursor:pointer; z-index:2500; box-shadow:0 4px 12px rgba(0,0,0,0.3); transition:transform 0.2s;';
  floatIcon.innerHTML = '<span id="pomo-float-time" style="color:white; font-size:14px; font-weight:700;">25:00</span>';
  floatIcon.onclick = toggleFloatingPomodoroPanel;
  document.body.appendChild(floatIcon);

  const floatPanel = document.createElement('div');
  floatPanel.id = 'pomo-float-panel';
  floatPanel.style.cssText = 'position:fixed; bottom:90px; right:20px; background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:12px; padding:1rem; display:none; z-index:2500; box-shadow:0 4px 12px rgba(0,0,0,0.3); min-width:200px;';
  floatPanel.innerHTML = `
    <h4 style="margin:0 0 0.5rem 0; font-size:14px; color:var(--color-nav);">⏱️ Pomodoro</h4>
    <p id="pomo-float-status" style="margin:0 0 1rem 0; font-size:12px; color:var(--text-secondary);">Session de travail</p>
    <div style="display:flex; gap:8px; flex-wrap:wrap;">
      <button onclick="togglePomodoro()" style="flex:1; padding:8px; background:var(--color-nav); color:white; border:none; border-radius:6px; cursor:pointer; font-size:12px;">Ouvrir</button>
      <button onclick="pausePomodoro()" style="flex:1; padding:8px; background:var(--bg-main); color:var(--text-primary); border:1px solid var(--border-subtle); border-radius:6px; cursor:pointer; font-size:12px;">Pause</button>
      <button onclick="resetPomodoro()" style="flex:1; padding:8px; background:var(--bg-main); color:var(--text-primary); border:1px solid var(--border-subtle); border-radius:6px; cursor:pointer; font-size:12px;">Reset</button>
    </div>
  `;
  document.body.appendChild(floatPanel);
}

function toggleFloatingPomodoroPanel() {
  const panel = document.getElementById('pomo-float-panel');
  if (panel) panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
}

function updateFloatingPomodoroTime() {
  const mins = Math.floor(pomodoroTimeLeft / 60);
  const secs = pomodoroTimeLeft % 60;
  const timeStr = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  if (pomodoroDisplayMode === 'float') {
    const floatTime = document.getElementById('pomo-float-time');
    if (floatTime) floatTime.textContent = timeStr;
  } else {
    const barTime = document.getElementById('pomo-bar-time');
    if (barTime) barTime.textContent = timeStr;
    const barStatus = document.getElementById('pomo-bar-status');
    if (barStatus) barStatus.textContent = pomodoroIsWork ? 'Session de travail' : 'Pause 5 min';
    // Sync bar play/pause label
    const barBtn = document.querySelector('#pomo-sticky-bar button:first-of-type');
    if (barBtn) barBtn.textContent = pomodoroTimer ? (pomodoroPaused ? '▶ Reprendre' : '⏸ Pause') : '▶ Démarrer';
  }
}

function setBgEffect(effect) {
  document.body.classList.remove('bg-gradient-animated');
  const canvas = document.getElementById('particle-canvas');
  if (particleAnimId) { cancelAnimationFrame(particleAnimId); particleAnimId = null; }
  if (canvas) canvas.style.display = 'none';

  if (effect === 'gradient') {
    document.body.classList.add('bg-gradient-animated');
  } else if (effect === 'particles') {
    canvas.style.display = 'block';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const particles = Array.from({length: 60}, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.8 + 0.4,
      dx: (Math.random() - 0.5) * 0.25,
      dy: (Math.random() - 0.5) * 0.25,
      op: Math.random() * 0.4 + 0.1
    }));
    function animParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // M7 — couleur des particules adaptée au thème actif. Lue UNE fois par frame :
      // getComputedStyle dans la boucle = 3 600 appels/s pour la même valeur.
      const navHex = getThemeColor('--color-nav', '#a78bfa');
      const hexOk = navHex.startsWith('#');
      particles.forEach(p => {
        p.x += p.dx; p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width)  p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = hexOk
          ? navHex + Math.round(p.op * 255).toString(16).padStart(2,'0')
          : `rgba(167,139,250,${p.op})`;
        ctx.fill();
      });
      // Respecte « réduire les animations » : une seule frame statique, pas de boucle
      if (!reduceMotion) particleAnimId = requestAnimationFrame(animParticles);
    }
    animParticles();
    // Remove old resize listener if any, then add fresh one
    if (window._particleResizeHandler) window.removeEventListener('resize', window._particleResizeHandler);
    window._particleResizeHandler = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Clamp existing particle positions to new bounds (E10)
      particles.forEach(p => {
        p.x = Math.min(p.x, canvas.width);
        p.y = Math.min(p.y, canvas.height);
      });
    };
    window.addEventListener('resize', window._particleResizeHandler);
  }

  localStorage.setItem('mathsgr2_bg', effect);
  document.querySelectorAll('[id^="bg-btn-"]').forEach(b => b.classList.remove('active'));
  const btn = document.getElementById(`bg-btn-${effect}`);
  if (btn) btn.classList.add('active');
}

// ── AMBIENT MUSIC ──
let ambientNodes = null;
let ambientCtx = null;
let ambientStopped = false; // C2 — flag pour stopper les setTimeout récursifs
let ambientMasterGain = null; // référence au gain maître pour le curseur de volume
const AMBIENT_MAX_GAIN = 0.15; // gain réel quand le curseur est à 100 %
let ambientVolumePct = (() => {
  const v = parseInt(localStorage.getItem('mathsgr2_volume'), 10);
  return Number.isFinite(v) ? Math.min(100, Math.max(0, v)) : 40; // 40 % par défaut ≈ ancien 0.06
})();

// Curseur de volume : ajuste le gain maître en direct (et le mémorise)
function setAmbientVolume(pct) {
  ambientVolumePct = Math.min(100, Math.max(0, parseInt(pct, 10) || 0));
  localStorage.setItem('mathsgr2_volume', ambientVolumePct);
  const label = document.getElementById('volume-value');
  if (label) label.textContent = ambientVolumePct + ' %';
  if (ambientMasterGain && ambientCtx) {
    ambientMasterGain.gain.setTargetAtTime(ambientVolumePct / 100 * AMBIENT_MAX_GAIN, ambientCtx.currentTime, 0.05);
  }
}

function setAmbientMusic(type) {
  ambientStopped = true; // C2 — stoppe les setTimeout récursifs en cours
  if (ambientNodes) { ambientNodes.forEach(n => { try { n.stop ? n.stop() : n.disconnect(); } catch(e){} }); ambientNodes = null; }
  if (ambientCtx)   { try { ambientCtx.close(); } catch(e){} ambientCtx = null; }
  ambientStopped = false; // C2 — réactive pour la nouvelle session

  document.querySelectorAll('[id^="music-btn-"]').forEach(b => b.classList.remove('active'));
  const btn = document.getElementById(`music-btn-${type}`);
  if (btn) btn.classList.add('active');
  localStorage.setItem('mathsgr2_music', type);
  if (type === 'off') return;

  ambientCtx = new (window.AudioContext || window.webkitAudioContext)();
  const masterGain = ambientCtx.createGain();
  masterGain.gain.value = ambientVolumePct / 100 * AMBIENT_MAX_GAIN;
  masterGain.connect(ambientCtx.destination);
  ambientMasterGain = masterGain;
  ambientNodes = [masterGain];

  if (type === 'lofi') {
    // Bass oscillator at 55Hz
    const bassOsc = ambientCtx.createOscillator();
    bassOsc.frequency.value = 55;
    bassOsc.type = 'sine';
    const bassGain = ambientCtx.createGain();
    bassGain.gain.value = 0.15;
    bassOsc.connect(bassGain); bassGain.connect(masterGain);
    bassOsc.start();
    ambientNodes.push(bassOsc);

    // Melody oscillator playing pentatonic notes
    const pentatonic = [261, 294, 329, 392, 440, 523];
    const melodyOsc = ambientCtx.createOscillator();
    melodyOsc.type = 'sine';
    const melodyGain = ambientCtx.createGain();
    melodyGain.gain.value = 0;
    melodyOsc.connect(melodyGain); melodyGain.connect(masterGain);
    melodyOsc.start();
    ambientNodes.push(melodyOsc);

    const playMelodyNote = () => {
      if (!ambientCtx || ambientStopped) return;
      const note = pentatonic[Math.floor(Math.random() * pentatonic.length)];
      melodyOsc.frequency.setValueAtTime(note, ambientCtx.currentTime);
      melodyGain.gain.setValueAtTime(0, ambientCtx.currentTime);
      melodyGain.gain.linearRampToValueAtTime(0.08, ambientCtx.currentTime + 0.1);
      melodyGain.gain.linearRampToValueAtTime(0, ambientCtx.currentTime + 0.4);
      setTimeout(playMelodyNote, 800 + Math.random() * 1200);
    };
    playMelodyNote();

    // Light background noise
    const noiseBuf = ambientCtx.createBuffer(1, ambientCtx.sampleRate * 2, ambientCtx.sampleRate);
    const noiseData = noiseBuf.getChannelData(0);
    for (let i = 0; i < noiseData.length; i++) noiseData[i] = Math.random() * 2 - 1;
    const noiseSrc = ambientCtx.createBufferSource();
    noiseSrc.buffer = noiseBuf; noiseSrc.loop = true;
    const noiseFilter = ambientCtx.createBiquadFilter();
    noiseFilter.type = 'lowpass';
    noiseFilter.frequency.value = 400;
    const noiseGain = ambientCtx.createGain();
    noiseGain.gain.value = 0.02;
    noiseSrc.connect(noiseFilter); noiseFilter.connect(noiseGain); noiseGain.connect(masterGain);
    noiseSrc.start();
    ambientNodes.push(noiseSrc);
  } else if (type === 'rain') {
    // Pluie réaliste : un lit de bruit large bande (le "shhhh" continu) +
    // un grondement grave + des gouttes individuelles faites de courtes
    // rafales de bruit filtré (PAS d'oscillateurs tonals, qui sonnaient électroniques).
    const makeNoiseSource = (loopSec = 3) => {
      const bufSz = Math.floor(ambientCtx.sampleRate * loopSec);
      const buf = ambientCtx.createBuffer(1, bufSz, ambientCtx.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < bufSz; i++) d[i] = Math.random() * 2 - 1;
      const src = ambientCtx.createBufferSource();
      src.buffer = buf; src.loop = true;
      return src;
    };

    // Lit principal : chuintement DOUX (≈ 1–6 kHz), volontairement discret
    // pour ne plus noyer les gouttes → "pluie modérée régulière".
    const bed = makeNoiseSource();
    const bedHP = ambientCtx.createBiquadFilter(); bedHP.type = 'highpass'; bedHP.frequency.value = 1000;
    const bedLP = ambientCtx.createBiquadFilter(); bedLP.type = 'lowpass';  bedLP.frequency.value = 6000;
    const bedGain = ambientCtx.createGain(); bedGain.gain.value = 0.20;
    bed.connect(bedHP); bedHP.connect(bedLP); bedLP.connect(bedGain); bedGain.connect(masterGain);
    bed.start(); ambientNodes.push(bed);

    // Grondement grave très léger (juste pour "remplir" le bas), discret
    const low = makeNoiseSource();
    const lowLP = ambientCtx.createBiquadFilter(); lowLP.type = 'lowpass'; lowLP.frequency.value = 350;
    const lowGain = ambientCtx.createGain(); lowGain.gain.value = 0.10;
    low.connect(lowLP); lowLP.connect(lowGain); lowGain.connect(masterGain);
    low.start(); ambientNodes.push(low);

    // Respiration lente du lit (rafales naturelles), amplitude faible
    const lfo = ambientCtx.createOscillator(); lfo.type = 'sine'; lfo.frequency.value = 0.10;
    const lfoGain = ambientCtx.createGain(); lfoGain.gain.value = 0.05;
    lfo.connect(lfoGain); lfoGain.connect(bedGain.gain);
    lfo.start(); ambientNodes.push(lfo);

    // Gouttes : courtes rafales de bruit filtré, MAINTENANT bien audibles.
    // Attaque brève + décroissance → vrai "ploc". Centre de bande plus bas
    // (1–3,2 kHz) = gouttes plus "rondes" et naturelles. Espacées mais régulières.
    const dropSchedule = () => {
      if (!ambientCtx || ambientStopped) return;
      const big = Math.random() < 0.18;                       // ~1 goutte sur 6 = grosse goutte proche
      const dur = big ? 0.07 : 0.045;
      const len = Math.floor(ambientCtx.sampleRate * dur);
      const b = ambientCtx.createBuffer(1, len, ambientCtx.sampleRate);
      const dd = b.getChannelData(0);
      const atk = Math.floor(len * 0.04);                     // attaque très courte
      for (let i = 0; i < len; i++) {
        const env = i < atk ? i / atk : Math.pow(1 - (i - atk) / (len - atk), 2);
        dd[i] = (Math.random() * 2 - 1) * env;
      }
      const src = ambientCtx.createBufferSource(); src.buffer = b;
      const bp = ambientCtx.createBiquadFilter();
      bp.type = 'bandpass';
      bp.frequency.value = (big ? 900 : 1200) + Math.random() * 2000;
      bp.Q.value = 0.9;
      const g = ambientCtx.createGain(); g.gain.value = (big ? 0.5 : 0.30) + Math.random() * 0.18;
      src.connect(bp); bp.connect(g); g.connect(masterGain);
      src.start();
      setTimeout(dropSchedule, 70 + Math.random() * 180);     // cadence régulière, gouttes espacées
    };
    dropSchedule();
  } else if (type === 'white') {
    // Pink noise instead of white noise
    const bufferSize = ambientCtx.sampleRate * 3;
    const buffer = ambientCtx.createBuffer(1, bufferSize, ambientCtx.sampleRate);
    const data = buffer.getChannelData(0);
    // Pink noise using simplified Voss-McCartney method
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
      b6 = white * 0.115926;
    }
    const source = ambientCtx.createBufferSource();
    source.buffer = buffer; source.loop = true;
    const filter = ambientCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 1200;
    source.connect(filter); filter.connect(masterGain);
    source.start();
    ambientNodes.push(source);
  }
}

// ── REWARD ANIMATIONS ──
function showRewardAnimation(type) {
  if (type === 'correct') {
    const el = document.createElement('div');
    el.textContent = '✨';
    el.style.cssText = 'position:fixed;font-size:36px;left:50%;top:45%;transform:translateX(-50%);z-index:9999;pointer-events:none;animation:rewardPop 0.8s ease forwards;';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 800);
  } else if (type === 'perfect') {
    const colors = ['#a78bfa','#60a5fa','#34d399','#fbbf24','#f87171'];
    for (let i = 0; i < 24; i++) {
      const el = document.createElement('div');
      el.style.cssText = `position:fixed;width:8px;height:8px;background:${colors[i%5]};left:${35+Math.random()*30}%;top:45%;border-radius:3px;z-index:9999;pointer-events:none;animation:confettiFall ${0.7+Math.random()*0.9}s ease ${Math.random()*0.3}s forwards;`;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 1800);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Initialiser les légendes de formules
  document.querySelectorAll('.formula-legend-item').forEach(item => {
    item.addEventListener('click', () => toggleLegendItem(item));
  });

  // Vitesse : chargement paresseux des images. Le navigateur ne télécharge/décode
  // une image que lorsqu'elle approche de l'écran → page prête plus vite, surtout
  // sur téléphone. Une seule passe ici plutôt que d'éditer chaque fichier matière.
  try {
    document.querySelectorAll('img:not([loading])').forEach(img => {
      img.loading = 'lazy';
      img.decoding = 'async';
    });
  } catch (_) {}

  const savedTheme   = localStorage.getItem('mathsgr2_theme')   || 'default';
  const savedAnim    = localStorage.getItem('mathsgr2_anim')    || 'normal';
  const savedBg      = localStorage.getItem('mathsgr2_bg')      || 'particles';
  const savedFx      = localStorage.getItem('mathsgr2_flashcard_fx') || '';
  const savedSize    = localStorage.getItem('mathsgr2_textsize') || 'normal';
  const savedPomoDisplay = localStorage.getItem('mathsgr2_pomo_display') || 'float';

  setTheme(savedTheme);
  setAnimLevel(savedAnim);
  setBgEffect(savedBg);
  setPomodoroDisplay(savedPomoDisplay);
  if (savedFx) {
    savedFx.split(',').filter(Boolean).forEach(fx => toggleFlashcardEffect(fx));
  } else {
    document.getElementById('fx-off-btn').classList.add('active');
  }
  document.body.classList.remove('text-small','text-large','text-xlarge');
  if (savedSize && savedSize !== 'normal') document.body.classList.add(`text-${savedSize}`);
  const sel = document.querySelector('select[onchange*="setTextSize"]');
  if (sel) sel.value = savedSize || 'normal';

  // Synchronise le curseur de volume avec la valeur mémorisée
  const volSlider = document.getElementById('volume-slider');
  if (volSlider) volSlider.value = ambientVolumePct;
  const volLabel = document.getElementById('volume-value');
  if (volLabel) volLabel.textContent = ambientVolumePct + ' %';

  // Quiz : répondre au clavier — chiffres 1-4 OU lettres A-D (les options sont
  // libellées A. B. C. D., donc les deux sont naturels). Ignoré si on tape dans un champ.
  document.addEventListener('keydown', (e) => {
    const quizActive = document.getElementById('quiz').classList.contains('active');
    const activeScreen = document.getElementById('quiz-active-screen');
    if (!quizActive || !activeScreen || activeScreen.style.display === 'none') return;
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const t = e.target;
    if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
    const map = { '1':0, '2':1, '3':2, '4':3, 'a':0, 'b':1, 'c':2, 'd':3 };
    const idx = map[e.key.toLowerCase()];
    if (idx === undefined) return;
    const opts = document.querySelectorAll(`#opts-${currentActiveQuestion} .opt`);
    if (opts[idx] && !opts[idx].classList.contains('disabled')) opts[idx].click();
  });

  // Keyboard shortcuts for flashcards
  document.addEventListener('keydown', (e) => {
    const flashcardsActive = document.getElementById('flashcards').classList.contains('active');
    if (!flashcardsActive) return;
    // G5 — Ne pas déclencher les raccourcis flashcard si le mode focus est ouvert
    const focusOpen = document.getElementById('focus-overlay').classList.contains('show');
    if (focusOpen) return;
    if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); flipCard(); }
    // preventDefault pour éviter que les flèches fassent défiler la page pendant la notation
    if (e.key === 'ArrowRight' && isFlipped) { e.preventDefault(); rateCard('easy'); }
    if (e.key === 'ArrowLeft'  && isFlipped) { e.preventDefault(); rateCard('hard'); }
    if (e.key === 'ArrowDown'  && isFlipped) { e.preventDefault(); rateCard('medium'); }
  });

  // Focus mode keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const focusOverlay = document.getElementById('focus-overlay');
      if (focusOverlay.classList.contains('show')) { toggleFocusMode(); return; }
      // Échap ferme aussi le Pomodoro puis le panneau Paramètres (un overlay à la fois)
      const pomoOverlay = document.getElementById('pomodoro-overlay');
      if (pomoOverlay && pomoOverlay.style.display === 'flex') { pomoOverlay.style.display = 'none'; return; }
      const settingsPanel = document.getElementById('settings-panel');
      if (settingsPanel && settingsPanel.classList.contains('show')) { settingsPanel.classList.remove('show'); return; }
    }
    if (e.key === 'ArrowRight' && document.getElementById('focus-cards').style.display !== 'none') nextFocusCard();
    if (e.key === 'ArrowLeft'  && document.getElementById('focus-cards').style.display !== 'none') prevFocusCard();
  });

  restoreQuizPrefs(); // restaurer les préférences AVANT filterQuiz (sinon il sauverait les valeurs par défaut)
  filterQuiz(); // Initialiser le compteur de questions dès le chargement
  updateMissedBtn();
  // Quiz se charge uniquement quand on clique 'Commencer'
  const data = loadSavedData();
  const bsDisplayEl = document.getElementById('best-score-display'); if(bsDisplayEl) bsDisplayEl.textContent = `Meilleur score : ${data.bestScore || 0}%`;

  // Initialize graphs only via showSection to avoid double draw (F30)
  // MutationObserver removed — showSection('graphiques') calls initGraphs via setTimeout
});

// ── CANVAS GRAPHS ENGINE ──

// C3 — helper pour lire les couleurs CSS du thème actif
function getThemeColor(varName, fallback) {
  return getComputedStyle(document.documentElement).getPropertyValue(varName).trim() || fallback;
}

function canvasCtx(id) {
  const canvas = document.getElementById(id);
  if (!canvas) return null;
  const W = canvas.width, H = canvas.height;
  const ctx = canvas.getContext('2d');
  return { ctx, W, H };
}

function drawGrid(ctx, W, H, ox, oy, scale, color, minPxArg) {
  // C3 — couleurs adaptées au thème actif
  const textColor = getThemeColor('--text-secondary', '#94a3b8');
  const axisColor = getThemeColor('--text-primary', '#e2e8f0');
  const gridColor = getThemeColor('--border-subtle', 'rgba(255,255,255,0.08)');
  // AMÉLIORATION 1 — remplir le fond du canvas avec la couleur du thème
  ctx.fillStyle = getThemeColor('--bg-formula', '#0d1117');
  ctx.fillRect(0, 0, W, H);

  // Pas de graduation ADAPTATIF (suite 1-2-5-10-20…). minPxArg permet d'affiner
  // la grille (espacement minimal réduit) pour les petits graphiques précis.
  const minPx = minPxArg || 42;
  let unit = 1, pow = 1, guard = 0;
  const mant = [1, 2, 5];
  while (unit * scale < minPx && guard++ < 40) {
    const idx = mant.indexOf(unit / pow);
    if (idx >= 0 && idx < mant.length - 1) unit = mant[idx + 1] * pow;
    else { pow *= 10; unit = pow; }
  }
  const stepPx = unit * scale;
  const fmt = (v) => Number.isInteger(v) ? v : Math.round(v * 100) / 100;
  const kMaxX = Math.ceil(Math.max(ox, W - ox) / stepPx) + 1;
  const kMaxY = Math.ceil(Math.max(oy, H - oy) / stepPx) + 1;

  // Lignes de grille
  ctx.strokeStyle = gridColor;
  ctx.lineWidth = 1;
  for (let k = -kMaxX; k <= kMaxX; k++) {
    const x = ox + k * stepPx;
    if (x >= 0 && x <= W) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
  }
  for (let k = -kMaxY; k <= kMaxY; k++) {
    const y = oy + k * stepPx;
    if (y >= 0 && y <= H) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
  }
  // Axes
  ctx.strokeStyle = axisColor;
  ctx.globalAlpha = 0.7;
  ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(0, oy); ctx.lineTo(W, oy); ctx.stroke(); // X
  ctx.beginPath(); ctx.moveTo(ox, 0); ctx.lineTo(ox, H); ctx.stroke(); // Y
  // Arrow heads
  ctx.fillStyle = axisColor;
  ctx.beginPath(); ctx.moveTo(W-2, oy); ctx.lineTo(W-10, oy-5); ctx.lineTo(W-10, oy+5); ctx.fill();
  ctx.beginPath(); ctx.moveTo(ox, 2); ctx.lineTo(ox-5, 10); ctx.lineTo(ox+5, 10); ctx.fill();
  // Graduations + labels (au pas 'unit')
  ctx.fillStyle = textColor;
  ctx.globalAlpha = 0.9;
  ctx.font = '10px monospace';
  ctx.textAlign = 'center';
  for (let k = -kMaxX; k <= kMaxX; k++) {
    if (k === 0) continue;
    const px = ox + k * stepPx;
    if (px > 12 && px < W - 6) {
      ctx.strokeStyle = textColor;
      ctx.beginPath(); ctx.moveTo(px, oy-3); ctx.lineTo(px, oy+3); ctx.stroke();
      ctx.fillText(fmt(k * unit), px, oy + 14);
    }
  }
  for (let k = -kMaxY; k <= kMaxY; k++) {
    if (k === 0) continue;
    const py = oy + k * stepPx;
    if (py > 6 && py < H - 6) {
      ctx.strokeStyle = textColor;
      ctx.beginPath(); ctx.moveTo(ox-3, py); ctx.lineTo(ox+3, py); ctx.stroke();
      ctx.textAlign = 'right'; ctx.fillText(fmt(-k * unit), ox - 6, py + 4); ctx.textAlign = 'center';
    }
  }
  // Axis labels
  ctx.fillStyle = axisColor;
  ctx.globalAlpha = 1;
  ctx.font = 'italic 13px serif';
  ctx.fillText('x', W - 8, oy - 10);
  ctx.fillText('y', ox + 12, 12);
  ctx.globalAlpha = 1;
}

function drawDot(ctx, px, py, r, color, label) {
  // C3 — couleur de texte adaptée au thème
  const labelColor = getThemeColor('--text-primary', '#e2e8f0');
  const strokeColor = getThemeColor('--bg-main', '#0f1117');
  ctx.beginPath();
  ctx.arc(px, py, r, 0, Math.PI*2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = 1.5;
  ctx.stroke();
  if (label) {
    ctx.font = 'bold 11px monospace';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
    const tx = px + r + 3, ty = py - r - 3;
    const tw = ctx.measureText(label).width;
    // Fond sombre semi-opaque DERRIÈRE l'étiquette → reste lisible même quand
    // la courbe/le cercle passe par-dessus (lisibilité demandée par l'utilisateur).
    ctx.fillStyle = 'rgba(15,17,23,0.80)';
    ctx.fillRect(tx - 3, ty - 11, tw + 6, 15);
    ctx.fillStyle = color;            // étiquette à la couleur du point → mieux repérable
    ctx.fillText(label, tx, ty);
  }
}

// Affiche une équation de graphique en vraie forme MathJax, avec un léger
// debounce pour ne pas re-typeset à chaque frappe dans les champs numériques.
const _graphEqTimers = {};
function renderGraphEq(elId, latex) {
  const el = document.getElementById(elId);
  if (!el) return;
  el.style.fontFamily = '';            // laisse MathJax gérer la typo
  el.innerHTML = `\\(${latex}\\)`;
  clearTimeout(_graphEqTimers[elId]);
  _graphEqTimers[elId] = setTimeout(() => {
    if (window.MathJax && MathJax.typesetPromise) {
      if (MathJax.typesetClear) { try { MathJax.typesetClear([el]); } catch(e){} }
      MathJax.typesetPromise([el]).catch(() => {});
    }
  }, 130);
}

// Borne une valeur d'entrée numérique : évite les nombres gigantesques (ex.
// exposant 3 milliards) qui faisaient planter le rendu canvas (NaN/Infinity,
// échelle nulle). On clampe dans une plage raisonnable pour un graphe scolaire.
function clampInput(v, fallback, lo, hi) {
  let n = parseFloat(v);
  if (!isFinite(n)) n = fallback;
  if (n < lo) n = lo;
  if (n > hi) n = hi;
  return n;
}

// ─── CERCLE ───
function drawCercle() {
  const h = clampInput(document.getElementById('cercle-h').value, 0, -1000, 1000);
  const k = clampInput(document.getElementById('cercle-k').value, 0, -1000, 1000);
  const r = Math.max(0.5, Math.min(1000, Math.abs(clampInput(document.getElementById('cercle-r').value, 3, -1000, 1000))));
  // B4 — resize canvas to real display width before drawing
  const cElC = document.getElementById('graph-cercle');
  if (cElC && cElC.offsetWidth > 0) { cElC.width = cElC.offsetWidth; cElC.height = Math.round(cElC.offsetWidth * 0.72); }
  const _cercle = canvasCtx('graph-cercle');
  if (!_cercle) return;
  const { ctx, W, H } = _cercle;
  ctx.clearRect(0, 0, W, H);

  const margin = 50;
  const range = Math.max(Math.abs(h) + r, Math.abs(k) + r) * 1.5;
  const scale = Math.min((W - margin*2) / (range*2), (H - margin*2) / (range*2));
  const ox = W/2 - h * scale;
  const oy = H/2 + k * scale;

  drawGrid(ctx, W, H, ox, oy, scale, '#fff');

  // Draw circle
  const px = ox + h * scale;
  const py = oy - k * scale;
  const pr = r * scale;

  // Glow effect
  const grad = ctx.createRadialGradient(px, py, pr*0.8, px, py, pr*1.2);
  grad.addColorStop(0, 'transparent');
  grad.addColorStop(1, getThemeColor('--color-cercle-light', 'rgba(96,165,250,0.12)'));
  ctx.beginPath();
  ctx.arc(px, py, pr, 0, Math.PI * 2);
  ctx.fillStyle = grad;
  ctx.fill();

  ctx.beginPath();
  ctx.arc(px, py, pr, 0, Math.PI * 2);
  ctx.strokeStyle = getThemeColor('--color-cercle', '#60a5fa');
  ctx.lineWidth = 2.5;
  ctx.shadowColor = getThemeColor('--color-cercle', '#60a5fa');
  ctx.shadowBlur = 8;
  ctx.stroke();
  ctx.shadowBlur = 0;

  // Radius line
  ctx.beginPath();
  ctx.moveTo(px, py);
  ctx.lineTo(px + pr, py);
  ctx.strokeStyle = getThemeColor('--color-cercle', '#60a5fa') + '88';
  ctx.lineWidth = 1.5;
  ctx.setLineDash([4, 4]);
  ctx.stroke();
  ctx.setLineDash([]);

  // R label
  ctx.fillStyle = getThemeColor('--color-cercle', '#60a5fa');
  ctx.font = 'bold 11px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('R=' + r, px + pr/2, py - 6);

  drawDot(ctx, px, py, 5, '#ef4444', `C(${h} ; ${k})`);

  // Equation
  const hTex = h === 0 ? 'x^2' : (h > 0 ? `(x-${h})^2` : `(x+${Math.abs(h)})^2`);
  const kTex = k === 0 ? 'y^2' : (k > 0 ? `(y-${k})^2` : `(y+${Math.abs(k)})^2`);
  const rSquared = Math.round(r * r * 10000) / 10000;
  renderGraphEq('cercle-eq', `${hTex} + ${kTex} = ${r}^2 = ${rSquared}`);
}

// ─── DROITE ───
function drawDroite() {
  const m = clampInput(document.getElementById('droite-m').value, 0, -1000, 1000);
  const p = clampInput(document.getElementById('droite-p').value, 0, -1000, 1000);
  const cElD = document.getElementById('graph-droite');
  if (cElD && cElD.offsetWidth > 0) { cElD.width = cElD.offsetWidth; cElD.height = Math.round(cElD.offsetWidth * 0.72); }
  const _droite = canvasCtx('graph-droite');
  if (!_droite) return;
  const { ctx, W, H } = _droite;
  ctx.clearRect(0, 0, W, H);

  const range = Math.max(Math.abs(p) + 6, 8);
  const scale = Math.min((W - 60) / (range * 2), (H - 60) / (range * 2));
  const ox = W / 2;
  const oy = H / 2 + p * scale;

  drawGrid(ctx, W, H, ox, oy, scale, '#fff');

  // Draw line across full canvas
  const x1 = (0 - ox) / scale;
  const x2 = (W - ox) / scale;
  const y1 = m * x1 + p;
  const y2 = m * x2 + p;

  ctx.beginPath();
  ctx.moveTo(0, oy - y1 * scale);
  ctx.lineTo(W, oy - y2 * scale);
  ctx.strokeStyle = getThemeColor('--color-droite', '#fbbf24');
  ctx.lineWidth = 2.5;
  ctx.shadowColor = getThemeColor('--color-droite', '#fbbf24');
  ctx.shadowBlur = 8;
  ctx.stroke();
  ctx.shadowBlur = 0;

  // Y-intercept dot
  const intPx = ox;
  const intPy = oy - p * scale;
  if (intPy > 0 && intPy < H) {
    drawDot(ctx, intPx, intPy, 5, '#ef4444', `(0 ; ${p})`);
  }

  // X-intercept (if m != 0)
  if (Math.abs(m) > 0.001) {
    const xInt = -p / m;
    const xIntPx = ox + xInt * scale;
    const xIntPy = oy;
    if (xIntPx > 0 && xIntPx < W) {
      drawDot(ctx, xIntPx, xIntPy, 5, getThemeColor('--color-nav','#a78bfa'), `(${Math.round(xInt*100)/100} ; 0)`);
    }
  }

  // Slope indicator
  const midX = W * 0.6;
  const midXval = (midX - ox) / scale;
  const midY = oy - (m * midXval + p) * scale;
  if (midY > 20 && midY < H - 20) {
    ctx.fillStyle = getThemeColor('--color-droite', '#fbbf24');
    ctx.font = 'bold 11px monospace';
    ctx.textAlign = 'left';
    ctx.fillText(`m = ${m}`, midX + 8, midY - 8);
  }

  const pStr = p === 0 ? '' : (p > 0 ? ` + ${p}` : ` - ${Math.abs(p)}`);
  const mStr = m === 0 ? '0' : (m === 1 ? 'x' : (m === -1 ? '-x' : `${m}x`));
  renderGraphEq('droite-eq', `y = ${mStr}${pStr}`);
}

// ════════════════════════════════════════════════════════════
//  MES EXERCICES — l'utilisateur crée ses propres questions
//  (3 thèmes), stockées dans data.customExercises (localStorage).
// ════════════════════════════════════════════════════════════
const EXO_THEMES = {
  vecteur:  { label: '🧭 Vecteurs',  color: 'var(--color-nav)' },
  cercle:   { label: '🔵 Cercle',    color: 'var(--color-cercle)' },
  droite:   { label: '🟡 Droites',   color: 'var(--color-droite)' }
};

// Matière courante (pour ranger les exercices perso par matière)
function curSubject() { return (window.currentSubject) || 'maths'; }

// Libellé + couleur d'un thème d'exercice perso (compatibilité avec les anciens enregistrements)
function exoThemeInfo(e) {
  if (e.themeLabel) return { label: e.themeLabel, color: 'var(--color-nav)' };
  if (EXO_THEMES[e.theme]) return EXO_THEMES[e.theme];
  if (typeof CHAP_LABELS !== 'undefined' && CHAP_LABELS && CHAP_LABELS[e.theme]) return { label: CHAP_LABELS[e.theme], color: 'var(--color-nav)' };
  return { label: e.theme, color: 'var(--text-secondary)' };
}

// Remplit les menus « Thème / Chapitre » de Mes créations avec les chapitres de la matière active
function rebuildExoThemes() {
  const order = (typeof CHAP_ORDER !== 'undefined' && CHAP_ORDER) ? CHAP_ORDER : [];
  const labels = (typeof CHAP_LABELS !== 'undefined' && CHAP_LABELS) ? CHAP_LABELS : {};
  if (!order.length) return;
  const html = order.map(ch => '<option value="' + ch + '">' + (labels[ch] || ch) + '</option>').join('');
  const sel = document.getElementById('exo-theme');
  if (sel) sel.innerHTML = html;
  const sel2 = document.getElementById('cre-card-theme'); // flashcards persos (creations.js)
  if (sel2) sel2.innerHTML = html;
}

function escapeHtmlExo(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

let _exoEditId = null; // id de la question en cours de modification (sinon création)
// 🎯 affiche/masque les 3 champs « mauvaises réponses » du mode QCM
function creToggleQcm() {
  const t = document.getElementById('exo-qcm-toggle'), f = document.getElementById('exo-qcm-fields');
  if (f) f.style.display = (t && t.checked) ? 'block' : 'none';
}
function saveCustomExo() {
  const theme = document.getElementById('exo-theme').value;
  const q = document.getElementById('exo-question').value.trim();
  const a = document.getElementById('exo-answer').value.trim();
  const exp = document.getElementById('exo-exp').value.trim();
  if (!q || !a) {
    showToast('⚠️ Remplis au moins la question et la réponse', '#f87171');
    return;
  }
  // mode QCM (optionnel) : 3 mauvaises réponses → question jouable dans le VRAI Quiz
  const qcmOn = !!(document.getElementById('exo-qcm-toggle') && document.getElementById('exo-qcm-toggle').checked);
  let qcmData = { qcm: false };
  if (qcmOn) {
    const w1 = (document.getElementById('exo-wrong1').value || '').trim();
    const w2 = (document.getElementById('exo-wrong2').value || '').trim();
    const w3 = (document.getElementById('exo-wrong3').value || '').trim();
    if (!w1 || !w2 || !w3) { showToast('⚠️ Pour un QCM, remplis les 3 mauvaises réponses', '#f87171'); return; }
    qcmData = { qcm: true, opts: [a, w1, w2, w3], ans: 0, difficulty: 'intermediaire' };
  }
  const themeLabel = (typeof CHAP_LABELS !== 'undefined' && CHAP_LABELS && CHAP_LABELS[theme])
    ? CHAP_LABELS[theme]
    : (EXO_THEMES[theme] ? EXO_THEMES[theme].label : theme);
  const data = loadSavedData();
  data.customExercises = data.customExercises || [];
  if (_exoEditId) { // ✏️ mise à jour
    const ex = data.customExercises.find(e => e.id === _exoEditId);
    if (ex) {
      ex.theme = theme; ex.themeLabel = themeLabel; ex.q = q; ex.a = a; ex.exp = exp; ex.updated = new Date().toISOString();
      if (qcmData.qcm) { ex.qcm = true; ex.opts = qcmData.opts; ex.ans = 0; ex.difficulty = 'intermediaire'; }
      else { ex.qcm = false; delete ex.opts; delete ex.ans; }
    }
    _exoEditId = null;
    const b = document.getElementById('exo-save-btn'); if (b) b.textContent = '💾 Enregistrer la question';
    showToast('✅ Question mise à jour', 'var(--color-parabole)');
  } else {
    data.customExercises.unshift(Object.assign({ id: Date.now(), theme, themeLabel, subject: curSubject(), q, a, exp, created: new Date().toISOString() }, qcmData));
    showToast(qcmData.qcm ? '✅ QCM enregistré — il apparaîtra dans le Quiz' : '✅ Question enregistrée', 'var(--color-parabole)');
  }
  saveData(data);
  document.getElementById('exo-question').value = '';
  document.getElementById('exo-answer').value = '';
  document.getElementById('exo-exp').value = '';
  ['exo-wrong1', 'exo-wrong2', 'exo-wrong3'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
  const tg = document.getElementById('exo-qcm-toggle'); if (tg) tg.checked = false; creToggleQcm();
  ['exo-question', 'exo-answer', 'exo-exp'].forEach(id => { const pv = document.getElementById(id + '-prev'); if (pv) { pv.style.display = 'none'; pv.innerHTML = ''; } });
  renderCustomExoList();
}

function editCustomExo(id) {
  const e = (loadSavedData().customExercises || []).find(x => x.id === id);
  if (!e) return;
  _exoEditId = id;
  const th = document.getElementById('exo-theme'); if (th && e.theme) { try { th.value = e.theme; } catch (_) {} }
  document.getElementById('exo-question').value = e.q || '';
  document.getElementById('exo-answer').value = e.a || '';
  document.getElementById('exo-exp').value = e.exp || '';
  // restaure le mode QCM + les 3 mauvaises réponses
  const tg = document.getElementById('exo-qcm-toggle'); if (tg) tg.checked = !!e.qcm;
  if (e.qcm && Array.isArray(e.opts)) {
    document.getElementById('exo-wrong1').value = e.opts[1] || '';
    document.getElementById('exo-wrong2').value = e.opts[2] || '';
    document.getElementById('exo-wrong3').value = e.opts[3] || '';
  } else { ['exo-wrong1', 'exo-wrong2', 'exo-wrong3'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; }); }
  creToggleQcm();
  ['exo-question', 'exo-answer', 'exo-exp'].forEach(id2 => { if (typeof creFxPreview === 'function') creFxPreview(id2, id2 + '-prev'); });
  const b = document.getElementById('exo-save-btn'); if (b) b.textContent = '✏️ Mettre à jour la question';
  const qf = document.getElementById('exo-question'); if (qf) { try { qf.scrollIntoView({ behavior: 'smooth', block: 'center' }); } catch (_) {} qf.focus(); }
  showToast('✏️ Modifie puis « Mettre à jour »', 'var(--color-nav)');
}

function deleteCustomExo(id) {
  if (!confirm('Supprimer cette question ? (irréversible)')) return;
  const data = loadSavedData();
  data.customExercises = (data.customExercises || []).filter(e => e.id !== id);
  saveData(data);
  if (_exoEditId === id) { _exoEditId = null; const b = document.getElementById('exo-save-btn'); if (b) b.textContent = '💾 Enregistrer la question'; }
  renderCustomExoList();
  showToast('🗑️ Question supprimée', '#f87171');
}

function renderCustomExoList() {
  const list = document.getElementById('exo-list');
  if (!list) return;
  const data = loadSavedData();
  const cur = curSubject();
  const exos = (data.customExercises || []).filter(e => (e.subject || 'maths') === cur);
  const reviewBtn = document.getElementById('exo-review-btn');
  if (reviewBtn) reviewBtn.style.display = exos.length ? '' : 'none';
  if (!exos.length) {
    list.innerHTML = '<div style="background:var(--bg-card); border:1px dashed var(--border-subtle); border-radius:14px; padding:2rem; text-align:center; color:var(--text-secondary);">Aucune question pour l\'instant.<br>Crée-en une avec le formulaire ! 👈</div>';
    return;
  }
  list.innerHTML = exos.map(e => {
    const t = exoThemeInfo(e);
    return '<div style="background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:14px; padding:1rem 1.1rem; margin-bottom:0.85rem;">' +
      '<div style="display:flex; justify-content:space-between; align-items:start; gap:10px;">' +
        '<span><span style="font-size:11px; font-weight:700; padding:3px 10px; border-radius:20px; color:' + t.color + '; border:1px solid ' + t.color + ';">' + t.label + '</span>' +
        (e.qcm ? '<span style="font-size:10px; font-weight:700; padding:2px 8px; border-radius:20px; background:var(--color-nav); color:#fff; margin-left:6px;">🎯 QCM</span>' : '') + '</span>' +
        '<span style="display:flex; gap:4px;"><button onclick="editCustomExo(' + e.id + ')" style="background:transparent; border:none; color:var(--text-secondary); cursor:pointer; font-size:15px;" aria-label="Modifier">✏️</button>' +
        '<button onclick="deleteCustomExo(' + e.id + ')" style="background:transparent; border:none; color:var(--text-secondary); cursor:pointer; font-size:15px;" aria-label="Supprimer">🗑️</button></span>' +
      '</div>' +
      '<div style="font-size:15px; color:var(--text-primary); margin:0.6rem 0 0.4rem; line-height:1.5;">' + escapeHtmlExo(e.q) + '</div>' +
      '<div style="font-size:13px; color:var(--text-secondary);"><strong style="color:var(--color-parabole);">Réponse :</strong> ' + escapeHtmlExo(e.a) + '</div>' +
    '</div>';
  }).join('');
  safeMathJax([list]);
}

// ── Révision façon flashcards ──
let exoReviewQueue = [];
let exoReviewIndex = 0;

function reviewCustomExos() {
  const data = loadSavedData();
  const cur = curSubject();
  exoReviewQueue = shuffleArray((data.customExercises || []).filter(e => (e.subject || 'maths') === cur));
  if (!exoReviewQueue.length) { showToast('Crée d\'abord une question', '#f87171'); return; }
  exoReviewIndex = 0;
  var ov = document.getElementById('exo-review-overlay');
  // le transform d'animation de la section piège le position:fixed → on sort l'overlay
  // sur <body> pour qu'il soit VRAIMENT centré plein écran (et que le clic-dehors marche)
  if (ov && ov.parentNode !== document.body) document.body.appendChild(ov);
  ov.style.display = 'flex';
  showExoReviewCard();
}

function showExoReviewCard() {
  const e = exoReviewQueue[exoReviewIndex];
  if (!e) return;
  const t = exoThemeInfo(e);
  document.getElementById('exo-review-counter').textContent = 'Question ' + (exoReviewIndex + 1) + ' / ' + exoReviewQueue.length;
  const themeEl = document.getElementById('exo-review-theme');
  themeEl.textContent = t.label;
  themeEl.style.color = t.color;
  themeEl.style.border = '1px solid ' + t.color;
  document.getElementById('exo-review-q').innerHTML = escapeHtmlExo(e.q);
  document.getElementById('exo-review-a').innerHTML = escapeHtmlExo(e.a);
  const expBox = document.getElementById('exo-review-expbox');
  if (e.exp) { document.getElementById('exo-review-exp').innerHTML = escapeHtmlExo(e.exp); expBox.style.display = ''; }
  else expBox.style.display = 'none';
  document.getElementById('exo-review-reveal').style.display = 'none';
  document.getElementById('exo-reveal-btn').style.display = '';
  safeMathJax([document.getElementById('exo-review-q')]);
}

function revealExoAnswer() {
  document.getElementById('exo-review-reveal').style.display = 'block';
  document.getElementById('exo-reveal-btn').style.display = 'none';
  safeMathJax([document.getElementById('exo-review-reveal')]);
}

function nextExoReview() {
  exoReviewIndex++;
  if (exoReviewIndex >= exoReviewQueue.length) { closeExoReview(); showToast('✅ Révision terminée !', 'var(--color-parabole)'); return; }
  showExoReviewCard();
}

function closeExoReview() {
  document.getElementById('exo-review-overlay').style.display = 'none';
}

// ════════════════════════════════════════════════════════════
//  PROGRESSION — suivi des notions maîtrisées par chapitre
//  + révision ciblée (mini-quiz de 3 questions non maîtrisées).
// ════════════════════════════════════════════════════════════
const PROG_CHAP = {
  vecteur:  { label: '🧭 Vecteurs',  color: 'var(--color-nav)' },
  cercle:   { label: '🔵 Cercle',    color: 'var(--color-cercle)' },
  droite:   { label: '🟡 Droites',   color: 'var(--color-droite)' }
};

// Les questions reliées à un concept (match par mots-clés sur q.q).
function questionsForConcept(chapter, concept) {
  return allQuestions.filter(q =>
    q.chapter === chapter &&
    concept.keywords.some(kw => q.q.toLowerCase().includes(kw.toLowerCase()))
  );
}

// Un concept est maîtrisé si ≥1 question reliée a été réussie ≥2 fois.
function isConceptMastered(chapter, concept, mastered) {
  const qs = questionsForConcept(chapter, concept);
  return qs.some(q => (mastered[q.q] || 0) >= 2);
}

// Progression générique (toute matière sauf maths) : par chapitre, basée sur le Quiz.
function renderProgressionGeneric(container) {
  const data = loadSavedData();
  const mastered = data.masteredQuestions || {};
  const order = (typeof CHAP_ORDER !== 'undefined') ? CHAP_ORDER : [];
  const labels = (typeof CHAP_LABELS !== 'undefined') ? CHAP_LABELS : {};
  let totalQ = 0, totalMas = 0, html = '';
  order.forEach((ch) => {
    const qs = (typeof allQuestions !== 'undefined' ? allQuestions : []).filter((q) => q.chapter === ch);
    if (!qs.length) return;
    const mas = qs.filter((q) => (mastered[q.q] || 0) >= 2).length;
    totalQ += qs.length; totalMas += mas;
    const pct = Math.round(mas / qs.length * 100);
    html += '<div style="background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:16px; padding:1.1rem 1.3rem; margin-bottom:1rem;">' +
      '<div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:0.6rem;">' +
      '<span style="font-size:17px; font-weight:700; color:var(--color-nav);">' + (labels[ch] || ch) + '</span>' +
      '<span style="font-size:14px; color:var(--text-secondary);">' + mas + ' / ' + qs.length + ' questions maîtrisées</span></div>' +
      '<div style="height:12px; background:var(--border-subtle); border-radius:8px; overflow:hidden;"><div style="height:100%; width:' + pct + '%; background:' + _statColor(pct) + '; border-radius:8px; transition:width .5s;"></div></div>' +
      (mas < qs.length ? '<button class="nav-btn" style="margin-top:0.9rem; width:100%;" onclick="reviseChapter(\'' + ch + '\')">🎯 Réviser ce chapitre</button>' : '<p style="margin-top:0.8rem; text-align:center; color:var(--color-parabole); font-weight:600; font-size:14px;">🎉 Chapitre maîtrisé !</p>') +
      '</div>';
  });
  container.innerHTML = (html || '<p style="color:var(--text-secondary);">Réponds à quelques questions du <strong>Quiz</strong> pour suivre ta progression ici. 💪</p>') +
    '<button type="button" onclick="printRevisionSheet()" style="display:block; width:100%; margin-top:0.6rem; padding:11px 16px; border-radius:14px; border:none; background:linear-gradient(135deg, var(--color-nav), #7c3aed); color:#fff; font-size:14px; font-weight:700; cursor:pointer;">📄 Fiche de révision (PDF) — tout l\'essentiel de la matière</button>';
  const pct = totalQ ? Math.round(totalMas / totalQ * 100) : 0;
  const pctEl = document.getElementById('prog-global-pct');
  const barEl = document.getElementById('prog-global-bar');
  const cntEl = document.getElementById('prog-global-count');
  if (pctEl) pctEl.textContent = pct + ' %';
  if (barEl) barEl.style.width = pct + '%';
  if (cntEl) cntEl.textContent = totalMas + ' / ' + totalQ + ' questions maîtrisées';
}

function renderProgression() {
  const container = document.getElementById('prog-chapters');
  if (!container) return;
  // Hors maths : progression générique par chapitre (le détail « notions » est propre aux maths).
  if (window.currentSubject && window.currentSubject !== 'maths') { renderProgressionGeneric(container); return; }
  if (typeof learningConcepts === 'undefined') return;
  const data = loadSavedData();
  const mastered = data.masteredQuestions || {};

  let totalConcepts = 0, totalMastered = 0;
  let html = '';

  Object.keys(learningConcepts).forEach(chapter => {
    const meta = PROG_CHAP[chapter] || { label: chapter, color: 'var(--text-secondary)' };
    const concepts = learningConcepts[chapter];
    const states = concepts.map(c => isConceptMastered(chapter, c, mastered));
    const nbOk = states.filter(Boolean).length;
    totalConcepts += concepts.length;
    totalMastered += nbOk;
    const notMastered = nbOk < concepts.length;

    html += '<div style="background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:16px; padding:1.25rem 1.4rem; margin-bottom:1.25rem;">';
    html += '<div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:1rem;">';
    html += '<span style="font-size:18px; font-weight:700; color:' + meta.color + ';">' + meta.label + '</span>';
    html += '<span style="font-size:14px; font-weight:600; color:var(--text-secondary);">' + nbOk + ' / ' + concepts.length + ' notions</span>';
    html += '</div>';

    html += '<div style="display:flex; flex-direction:column; gap:7px;">';
    concepts.forEach((c, i) => {
      const ok = states[i];
      const icon = ok ? '✅' : '❌';
      const col = ok ? 'var(--text-primary)' : 'var(--text-secondary)';
      const deco = ok ? '' : '';
      html += '<div style="display:flex; align-items:center; gap:10px; font-size:14px; color:' + col + ';">' +
              '<span>' + icon + '</span><span' + deco + '>' + c.concept + '</span></div>';
    });
    html += '</div>';

    if (notMastered) {
      html += '<button class="nav-btn" style="margin-top:1rem; width:100%; border-color:' + meta.color + '; color:' + meta.color + ';" onclick="reviseChapter(\'' + chapter + '\')">🎯 Réviser les notions non maîtrisées</button>';
    } else {
      html += '<p style="margin-top:1rem; text-align:center; color:var(--color-parabole); font-weight:600; font-size:14px;">🎉 Chapitre maîtrisé !</p>';
    }
    html += '</div>';
  });

  container.innerHTML = html;

  const pct = totalConcepts ? Math.round(totalMastered / totalConcepts * 100) : 0;
  const pctEl = document.getElementById('prog-global-pct');
  const barEl = document.getElementById('prog-global-bar');
  const cntEl = document.getElementById('prog-global-count');
  if (pctEl) pctEl.textContent = pct + ' %';
  if (barEl) barEl.style.width = pct + '%';
  if (cntEl) cntEl.textContent = totalMastered + ' / ' + totalConcepts + ' notions maîtrisées';
}

// Lance un mini-quiz de 3 questions du chapitre, en priorisant les non maîtrisées.
function reviseChapter(chapter) {
  const data = loadSavedData();
  const mastered = data.masteredQuestions || {};
  const pool = allQuestions.filter(q => q.chapter === chapter);
  if (!pool.length) return;
  const notYet = pool.filter(q => (mastered[q.q] || 0) < 2);
  const rest = pool.filter(q => (mastered[q.q] || 0) >= 2);
  const chosen = [...shuffleArray(notYet), ...shuffleArray(rest)].slice(0, 3);

  currentQuestions = chosen.map(q => { const s = shuffleOptions(q); return {...q, opts: s.opts, ans: s.ans}; });
  score = 0; answered = 0; skipped = 0; correctStreak = 0;
  currentActiveQuestion = 0; questionAnswered = [];
  timerIds.forEach(id => clearInterval(id)); timerIds = [];
  missedOnlyMode = true; // évite que startQuiz rappelle filterQuiz et écrase notre sélection

  showSection('quiz');
  document.getElementById('quiz-start-screen').style.display = 'none';
  document.getElementById('quiz-active-screen').style.display = 'block';
  buildQuiz();
  updateScore();
  if (typeof showToast === 'function') showToast('🎯 Révision ' + (PROG_CHAP[chapter] ? PROG_CHAP[chapter].label : chapter), 'var(--color-nav)');
}

// ─── INIT (called when graphiques section shown) ───
let graphsInitialized = false;
function initGraphs() {
  drawCercle();
  drawDroite();
  if (graphsInitialized) return; // Prevent listener accumulation on repeat visits
  graphsInitialized = true;
  // B5 — redraw on window resize so canvases stay crisp
  window.addEventListener('resize', () => {
    if (document.getElementById('graphiques').classList.contains('active')) {
      drawCercle(); drawDroite();
    }
  });
  ['cercle-h','cercle-k','cercle-r'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('keydown', e => { if (e.key === 'Enter') drawCercle(); });
  });
  ['droite-m','droite-p'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('keydown', e => { if (e.key === 'Enter') drawDroite(); });
  });
}


// ════════════════════════════════════════════════════════════
//  PREMIUM — version gratuite limitée + déblocage via PayPal/code
//  - Sections premium verrouillées tant que non débloqué.
//  - Déblocage : code acheté (PayPal) OU code créateur (gratuit pour le créateur).
//  - État stocké en local (mathsgr2_premium). Sans serveur : un code peut être
//    partagé — suffisant pour une vente entre élèves, pas un paywall inviolable.
// ════════════════════════════════════════════════════════════
const PREMIUM_SECTIONS = []; // site 100% gratuit : toutes les sections sont accessibles à tous
const PAYPAL_LINK  = 'https://paypal.me/Drackson227';
// Les codes ne sont PAS écrits en clair (sinon lisibles dans le code source du site).
// On ne stocke que leur empreinte (hash) : impossible de retrouver un code depuis son hash.
// Les vrais codes sont notés à part (hors du site), pas ici.
function _hashCode(s){let H=5381;for(let i=0;i<s.length;i++){H=((H<<5)+H+s.charCodeAt(i))>>>0;}return H.toString(36);}
const BUYER_HASHES   = ['rtuezg','1jw8jqt','1jw8jqu','1jw8jqv'];
const CREATOR_HASHES = ['k5w3bk'];

function isPremium() {
  try { return localStorage.getItem('mathsgr2_premium') === '1'; } catch(e) { return false; }
}
function isCreator() {
  try { return localStorage.getItem('mathsgr2_creator') === '1'; } catch(e) { return false; }
}
function setPremium(creator) {
  try {
    localStorage.setItem('mathsgr2_premium', '1');
    if (creator) localStorage.setItem('mathsgr2_creator', '1');
  } catch(e) {}
  document.querySelectorAll('.nav-lock').forEach(el => el.remove());
  closePremiumModal();
  if (typeof showToast === 'function') showToast(creator ? '👑 Mode créateur activé' : '⭐ Premium débloqué, merci !', 'var(--color-parabole)');
}

function tryUnlock() {
  const inp = document.getElementById('premium-code-input');
  const code = (inp ? inp.value : '').trim().toUpperCase();
  const hash = _hashCode(code);
  if (CREATOR_HASHES.includes(hash)) { setPremium(true); return; }
  if (BUYER_HASHES.includes(hash))   { setPremium(false); return; }
  const err = document.getElementById('premium-code-err');
  if (err) err.style.display = 'block';
}

function openPremiumModal(sectionLabel) {
  let ov = document.getElementById('premium-overlay');
  if (!ov) {
    ov = document.createElement('div');
    ov.id = 'premium-overlay';
    ov.style.cssText = 'position:fixed; inset:0; background:rgba(0,0,0,0.88); z-index:3500; display:flex; align-items:center; justify-content:center; padding:1rem;';
    ov.innerHTML =
      '<div style="background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:20px; padding:2rem 1.75rem; max-width:420px; width:100%; text-align:center; box-shadow:0 20px 60px rgba(0,0,0,0.5);">' +
        '<div style="font-size:46px; margin-bottom:0.5rem;">⭐</div>' +
        '<h3 style="font-size:22px; font-weight:800; color:var(--color-nav); margin:0 0 0.5rem;">Contenu Premium</h3>' +
        '<p id="premium-msg" style="color:var(--text-secondary); font-size:14px; margin-bottom:1.25rem;">Cette partie fait partie de la version Premium.</p>' +
        '<a href="' + PAYPAL_LINK + '" target="_blank" rel="noopener" style="display:block; background:#0070ba; color:#fff; text-decoration:none; padding:13px; border-radius:12px; font-weight:700; font-size:15px; margin-bottom:0.85rem;">💳 Débloquer via PayPal</a>' +
        '<p style="font-size:12px; color:var(--text-secondary); margin:0 0 0.5rem;">Après le paiement, tu reçois un <strong>code</strong>. Entre-le ici :</p>' +
        '<div style="display:flex; gap:8px;">' +
          '<input id="premium-code-input" type="text" placeholder="Ton code" style="flex:1; min-width:0; padding:11px; border-radius:10px; border:1px solid var(--border-subtle); background:var(--bg-main); color:var(--text-primary); font-size:15px; text-transform:uppercase;">' +
          '<button onclick="tryUnlock()" style="padding:11px 18px; border-radius:10px; border:none; background:var(--color-nav); color:#fff; font-weight:700; cursor:pointer;">OK</button>' +
        '</div>' +
        '<p id="premium-code-err" style="display:none; color:#f87171; font-size:12px; margin-top:0.5rem;">Code incorrect.</p>' +
        '<button onclick="closePremiumModal()" style="margin-top:1.25rem; background:transparent; border:none; color:var(--text-secondary); cursor:pointer; font-size:13px;">✕ Plus tard</button>' +
      '</div>';
    document.body.appendChild(ov);
    ov.addEventListener('click', e => { if (e.target === ov) closePremiumModal(); });
  }
  const msg = document.getElementById('premium-msg');
  if (msg) msg.textContent = sectionLabel ? ('« ' + sectionLabel + ' » fait partie de la version Premium.') : 'Cette partie fait partie de la version Premium.';
  const err = document.getElementById('premium-code-err'); if (err) err.style.display = 'none';
  ov.style.display = 'flex';
  const inp = document.getElementById('premium-code-input'); if (inp) { inp.value=''; inp.focus(); }
}
function closePremiumModal() {
  const ov = document.getElementById('premium-overlay');
  if (ov) ov.style.display = 'none';
}

// Ajoute un petit cadenas 🔒 sur les boutons de nav premium (si pas débloqué).
function markPremiumNav() {
  if (isPremium()) return;
  PREMIUM_SECTIONS.forEach(sec => {
    const btn = document.querySelector('.nav-btn[onclick*="' + sec + '"]');
    if (btn && !btn.querySelector('.nav-lock')) {
      const lock = document.createElement('span');
      lock.className = 'nav-lock';
      lock.textContent = ' 🔒';
      lock.style.fontSize = '11px';
      btn.appendChild(lock);
    }
  });
}
document.addEventListener('DOMContentLoaded', markPremiumNav);

/* ════════════ Fiches d'info cliquables (cours + examen) + liens croisés ════════════ */
window.IMG_INFO = window.IMG_INFO || {};   // images (clé = nom de fichier .jpg)
window.INFO_TOPICS = window.INFO_TOPICS || {}; // notions/personnes sans image dédiée (clé = slug)
window.TERM_MAP = window.TERM_MAP || {};   // mot affiché → clé de fiche (pour rendre cliquable)
window._infoStack = [];
window._infoCurrent = null;

function infoLookup(key) { return window.IMG_INFO[key] || window.INFO_TOPICS[key] || null; }

function escapeRegExp(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

/* Rend cliquables, dans un texte HTML, les mots connus de TERM_MAP (sauf la fiche courante).
   Une seule occurrence par terme ; on évite de relier à l'intérieur d'un lien déjà posé. */
function autolinkInfo(html, excludeKey) {
  if (!html) return html;
  var map = window.TERM_MAP;
  var terms = Object.keys(map).sort(function (a, b) { return b.length - a.length; });
  var store = [];
  terms.forEach(function (term) {
    var key = map[term];
    if (key === excludeKey) return;
    if (!infoLookup(key)) return;
    var re = new RegExp('(?<![\\p{L}\\u00C0-\\u017F])(' + escapeRegExp(term) + ')(?![\\p{L}\\u00C0-\\u017F])', 'u');
    var m = re.exec(html);
    if (!m) return;
    var token = '' + store.length + '';
    store.push('<a class="info-link" data-info="' + key + '">' + m[1] + '</a>');
    html = html.slice(0, m.index) + token + html.slice(m.index + m[1].length);
  });
  store.forEach(function (rep, i) { html = html.replace('' + i + '', rep); });
  return html;
}

function openInfoCard(key, fromBack) {
  var info = infoLookup(key);
  if (!info) return;
  var modal = document.getElementById('imgModal');
  var img = document.getElementById('imgModalImg');
  var body = document.getElementById('imgModalBody');
  if (!modal || !img || !body) return;
  if (!fromBack && window._infoCurrent && window._infoCurrent !== key) window._infoStack.push(window._infoCurrent);
  window._infoCurrent = key;

  // Thème visuel de la fiche
  var theme = info.theme || (window.INFO_THEME && window.INFO_THEME[key]) || '';
  var box = modal.querySelector('.img-modal-box');
  if (box) box.className = 'img-modal-box' + (theme ? ' t-' + theme : '');

  var imgSrc = info.img || (window.IMG_INFO[key] ? key : '');
  if (imgSrc) { img.src = imgSrc; img.alt = info.title || ''; img.style.display = ''; }
  else { img.removeAttribute('src'); img.style.display = 'none'; }

  var html = '';
  if (window._infoStack.length) html += '<button class="imd-back" type="button" onclick="infoBack()">↩ retour</button>';
  html += '<h3>' + (info.title || '') + '</h3>';
  if (info.sub) html += '<p class="imd-sub">' + info.sub + '</p>';
  // Galerie d'œuvres (cliquable → agrandit dans l'image principale)
  if (info.gallery && info.gallery.length) {
    html += '<div class="imd-gallery">' + info.gallery.map(function (g) {
      return '<figure onclick="infoSwapImg(\'' + g.src + '\')"><img src="' + g.src + '" alt="' + (g.cap || '').replace(/"/g, '') + '" loading="lazy"><figcaption>' + (g.cap || '') + '</figcaption></figure>';
    }).join('') + '</div>';
  }
  if (info.cours) html += '<div class="imd-block imd-cours"><h4>📚 Le cours</h4>' + autolinkInfo(info.cours, key) + '</div>';
  if (info.exam) html += '<div class="imd-block imd-exam"><h4>🎯 Pour l\'examen / révision</h4>' + autolinkInfo(info.exam, key) + '</div>';
  if (info.anecdote) html += '<div class="imd-anecdote"><h4>💡 Le sais-tu ?</h4>' + autolinkInfo(info.anecdote, key) + '</div>';
  // Mes notes perso (sauvegardées en local, par fiche)
  var _note = '';
  try { _note = ((loadSavedData().ficheNotes) || {})[key] || ''; } catch (_) {}
  html += '<div class="imd-block imd-notes"><h4>📝 Mes notes <span class="imd-notes-saved" id="fiche-note-saved"></span></h4>' +
    '<textarea id="fiche-note-input" class="fiche-note-area" maxlength="600" placeholder="Écris ici tes astuces, moyens mnémotechniques, points à retenir pour l\'examen…" oninput="saveFicheNote(\'' + key + '\', this.value)">' +
    _note.replace(/&/g, '&amp;').replace(/</g, '&lt;') + '</textarea>' +
    '<div class="fiche-note-count" id="fiche-note-count">' + _note.length + ' / 600</div></div>';
  body.innerHTML = html;
  body.scrollTop = 0;
  modal.classList.add('open');
  modal.scrollTop = 0;
  document.body.style.overflow = 'hidden';
}

/* Clic sur une miniature de la galerie → l'affiche en grand dans la fiche */
function infoSwapImg(src) {
  var img = document.getElementById('imgModalImg');
  if (img) { img.src = src; img.style.display = ''; }
}

/* compat : ancien nom */
function openImgModal(key) { window._infoStack = []; window._infoCurrent = null; openInfoCard(key); }

function infoBack() {
  var k = window._infoStack.pop();
  if (k) openInfoCard(k, true);
}

function closeImgModal() {
  var modal = document.getElementById('imgModal');
  if (modal) modal.classList.remove('open');
  document.body.style.overflow = '';
  window._infoStack = [];
  window._infoCurrent = null;
}

/* Délégation des clics */
document.addEventListener('click', function (e) {
  if (!e.target.closest) return;
  // 1) lien interne dans une fiche → ouvre la fiche liée
  var lk = e.target.closest('[data-info]');
  if (lk) { e.preventDefault(); openInfoCard(lk.getAttribute('data-info')); return; }
  // 2) carte de personnage → ouvre la personne (via son image)
  var card = e.target.closest('.perso-card');
  if (card && !card.closest('#imgModal')) {
    var ci = card.querySelector('img');
    var ck = ci && (ci.getAttribute('src') || '').split('/').pop();
    if (ck && window.IMG_INFO[ck]) { openImgModal(ck); return; }
  }
  // 3) image connue n'importe où
  var img = e.target.closest('img');
  if (!img || img.closest('#imgModal')) return;
  var key = (img.getAttribute('src') || '').split('/').pop();
  if (window.IMG_INFO[key]) { openImgModal(key); }
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    var exoOv = document.getElementById('exo-review-overlay');
    if (exoOv && exoOv.style.display === 'flex') { closeExoReview(); return; } // Échap ferme la révision
    if (window._infoStack.length) { infoBack(); }
    else { closeImgModal(); }
  }
});

/* ════════════ Couleur d'accent par matière (défaut, modifiable dans les paramètres) ════════════ */
window.SUBJECT_ACCENTS = {
  maths: '#a78bfa', histoire: '#fbbf24', bio: '#34d399', geo: '#2dd4bf',
  francais: '#f472b6', anglais: '#818cf8', chimie: '#c084fc', eco: '#fbbf24', neerlandais: '#fb923c'
};
function hexToRgb(h) {
  h = String(h).replace('#', '');
  if (h.length === 3) h = h.split('').map(function (c) { return c + c; }).join('');
  var n = parseInt(h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function getAccentMode() { return localStorage.getItem('mathsgr2_accentmode') || 'auto'; }
function applySubjectAccent() {
  if (getAccentMode() !== 'auto') return;
  var subj = window.currentSubject || 'maths';
  var c = window.SUBJECT_ACCENTS[subj];
  if (!c) return;
  var root = document.documentElement;
  var rgb = hexToRgb(c);
  root.style.setProperty('--color-nav', c);
  root.style.setProperty('--color-nav-rgb', rgb.join(','));
  root.style.setProperty('--shadow-glow-nav', '0 0 20px rgba(' + rgb.join(',') + ',0.25)');
}
function setAccentMode(mode) {
  localStorage.setItem('mathsgr2_accentmode', mode);
  if (mode === 'auto') applySubjectAccent();
  else setTheme(localStorage.getItem('mathsgr2_theme') || 'default'); // l'accent suit le thème global choisi
  document.querySelectorAll('.theme-btn[onclick^="setAccentMode"]').forEach(function (b) { b.classList.remove('active'); });
  var ab = document.querySelector('.theme-btn[onclick="setAccentMode(\'' + mode + '\')"]');
  if (ab) ab.classList.add('active');
}
document.addEventListener('DOMContentLoaded', function () {
  setTimeout(function () {
    applySubjectAccent();
    var mode = getAccentMode();
    var ab = document.querySelector('.theme-btn[onclick="setAccentMode(\'' + mode + '\')"]');
    if (ab) { document.querySelectorAll('.theme-btn[onclick^="setAccentMode"]').forEach(function (b) { b.classList.remove('active'); }); ab.classList.add('active'); }
  }, 300);
});

/* ════════════ Glossaire / Index de toutes les fiches ════════════ */
function _glossaireEntries() {
  var seen = {}, out = [];
  function add(map) {
    if (!map) return;
    Object.keys(map).forEach(function (k) {
      if (seen[k]) return;
      var info = map[k];
      if (!info || !info.title) return;
      seen[k] = 1;
      out.push({ key: k, title: info.title, sub: info.sub || '', theme: (window.INFO_THEME && window.INFO_THEME[k]) || '' });
    });
  }
  add(window.IMG_INFO); add(window.INFO_TOPICS);
  out.sort(function (a, b) { return a.title.localeCompare(b.title, 'fr'); });
  return out;
}
var GLOSS_META = {
  royal: ['Histoire', '#f5c542'], art: ['Histoire', '#e0a458'], reforme: ['Histoire', '#8aa0e0'], print: ['Histoire', '#c9a063'],
  science: ['Bio', '#34d399'], eng: ['Anglais', '#818cf8'], chem: ['Chimie', '#c084fc'],
  myth: ['Français', '#d4a017'], theatre: ['Français', '#fb5b78'], lettres: ['Français', '#f472b6'], geo: ['Géo', '#2dd4bf'],
  eco: ['Sciences éco', '#fbbf24'], nl: ['Néerlandais', '#fb923c']
};
window._glossSubj = '';
function renderGlossaire() {
  var box = document.getElementById('glossaire-list');
  if (!box) return;
  var entries = _glossaireEntries();
  var subjCount = {};
  var cards = entries.map(function (e) {
    var m = GLOSS_META[e.theme] || ['', 'var(--color-nav)'];
    if (m[0]) subjCount[m[0]] = (subjCount[m[0]] || 0) + 1;
    var search = (e.title + ' ' + e.sub + ' ' + m[0]).toLowerCase().replace(/"/g, '');
    return '<button type="button" class="gloss-card" data-search="' + search + '" data-subj="' + m[0] + '" onclick="openInfoCard(\'' + e.key + '\')" style="border-left:4px solid ' + m[1] + ';">' +
      '<span class="gloss-title">' + e.title + '</span>' +
      (e.sub ? '<span class="gloss-sub">' + e.sub + '</span>' : '') +
      (m[0] ? '<span class="gloss-tag" style="color:' + m[1] + ';">' + m[0] + '</span>' : '') +
      '</button>';
  }).join('');
  // Puces de filtre par matière (couleur = celle de la matière)
  var subjColor = {};
  Object.keys(GLOSS_META).forEach(function (th) { subjColor[GLOSS_META[th][0]] = GLOSS_META[th][1]; });
  var order = ['Histoire', 'Géo', 'Bio', 'Chimie', 'Français', 'Anglais', 'Néerlandais', 'Sciences éco'];
  var chips = '<button type="button" class="gloss-chip on" data-subj="" onclick="glossFilterSubject(\'\', this)">Tout (' + entries.length + ')</button>';
  order.forEach(function (sj) {
    if (!subjCount[sj]) return;
    chips += '<button type="button" class="gloss-chip" data-subj="' + sj + '" onclick="glossFilterSubject(\'' + sj + '\', this)" style="--chip:' + (subjColor[sj] || 'var(--color-nav)') + ';">' + sj + ' (' + subjCount[sj] + ')</button>';
  });
  window._glossSubj = '';
  box.innerHTML = '<div class="gloss-chips">' + chips + '</div>' +
    '<p id="gloss-count" style="color:var(--text-secondary); font-size:13px; margin-bottom:0.6rem;">' + entries.length + ' fiches</p>' +
    '<div class="gloss-grid">' + cards + '</div>' +
    '<p id="gloss-empty" style="display:none; color:var(--text-secondary); margin-top:1rem;">Aucune fiche trouvée.</p>';
}
function glossFilterSubject(subj, btn) {
  window._glossSubj = subj;
  document.querySelectorAll('#glossaire-list .gloss-chip').forEach(function (c) { c.classList.toggle('on', c === btn); });
  filterGlossaire();
}
function filterGlossaire() {
  var inp = document.getElementById('glossaire-search');
  var q = (inp ? inp.value : '').toLowerCase().trim();
  var subj = window._glossSubj || '';
  var cards = document.querySelectorAll('#glossaire-list .gloss-card');
  var shown = 0;
  cards.forEach(function (c) {
    var match = (!q || c.dataset.search.indexOf(q) >= 0) && (!subj || c.dataset.subj === subj);
    c.style.display = match ? '' : 'none';
    if (match) shown++;
  });
  var empty = document.getElementById('gloss-empty');
  if (empty) empty.style.display = shown ? 'none' : 'block';
  var cnt = document.getElementById('gloss-count');
  if (cnt) cnt.textContent = shown + ' fiche' + (shown > 1 ? 's' : '') + (subj ? ' · ' + subj : '');
}

/* ════════════ Objectif quotidien + temps d'étude ════════════ */
var DAILY_GOAL = parseInt(localStorage.getItem('mathsgr2_goal'), 10) || 20;
function setDailyGoal(n) {
  DAILY_GOAL = n;
  try { localStorage.setItem('mathsgr2_goal', n); } catch (_) {}
  document.querySelectorAll('.theme-btn[onclick^="setDailyGoal"]').forEach(function (b) { b.classList.remove('active'); });
  var ab = document.querySelector('.theme-btn[onclick="setDailyGoal(' + n + ')"]');
  if (ab) ab.classList.add('active');
  if (typeof renderStudyDashboard === 'function') renderStudyDashboard();
  if (typeof showToast === 'function') showToast('🎯 Objectif du jour : ' + n + ' actions', 'var(--color-nav)');
}
document.addEventListener('DOMContentLoaded', function () {
  setTimeout(function () {
    var ab = document.querySelector('.theme-btn[onclick="setDailyGoal(' + DAILY_GOAL + ')"]');
    if (ab) ab.classList.add('active');
  }, 300);
});
function _today() { return new Date().toISOString().slice(0, 10); }
function _getStudy(data) {
  // Robuste contre un objet study vide / partiel (ex. import) : on garantit chaque
  // champ numérique, sinon les calculs du tableau de bord donneraient NaN.
  var s = (data.study && typeof data.study === 'object') ? data.study : {};
  if (typeof s.totalSec !== 'number') s.totalSec = 0;
  if (typeof s.daySec !== 'number') s.daySec = 0;
  if (typeof s.dayActions !== 'number') s.dayActions = 0;
  if (!s.day) s.day = _today();
  s.history = s.history || {};
  if (s.day !== _today()) { s.day = _today(); s.daySec = 0; s.dayActions = 0; }
  data.study = s;
  return s;
}
function recordStudyAction() {
  var d = loadSavedData(); var s = _getStudy(d);
  var before = s.dayActions;
  s.dayActions++;
  // Petite célébration (une seule fois par jour) quand on atteint l'objectif quotidien.
  var crossed = before < DAILY_GOAL && s.dayActions >= DAILY_GOAL && s.goalCelebratedDay !== _today();
  if (crossed) s.goalCelebratedDay = _today();
  saveData(d);
  if (crossed) {
    try {
      if (typeof celebrate === 'function') celebrate('🎯 Objectif du jour atteint ! Bravo 👏');
      else if (typeof showToast === 'function') showToast('🎯 Objectif du jour atteint ! 👏', 'var(--color-parabole)');
      if (navigator.vibrate) navigator.vibrate([40, 30, 40]);
    } catch (e) {}
    var prof = document.getElementById('profil');
    if (prof && prof.classList.contains('active') && typeof renderStudyDashboard === 'function') renderStudyDashboard();
  }
}
function fmtDur(sec) {
  var h = Math.floor(sec / 3600), m = Math.round((sec % 3600) / 60);
  return h > 0 ? (h + ' h ' + (m < 10 ? '0' : '') + m) : (m + ' min');
}
var _studyTick = null;
var _studyCloudPushAt = 0;
function startStudyTimer() {
  if (_studyTick) return;
  _studyTick = setInterval(function () {
    if (document.visibilityState && document.visibilityState !== 'visible') return;
    var d = loadSavedData(); var s = _getStudy(d); s.totalSec += 30; s.daySec += 30;
    var t = _today(); s.history[t] = (s.history[t] || 0) + 30;
    // garde au plus ~90 jours d'historique
    var hk = Object.keys(s.history); if (hk.length > 90) { hk.sort().slice(0, hk.length - 90).forEach(function (k) { delete s.history[k]; }); }
    // Sauvegarde LOCALE seulement : passer par saveData() pousserait vers Supabase
    // (progress + leaderboard) toutes les 30 s pour de simples secondes de chrono
    // → ~240 écritures/heure inutiles par utilisateur connecté. Les vraies actions
    // (quiz, flashcards…) synchronisent déjà ; ici on limite le cloud à 1×/10 min.
    try { localStorage.setItem('mathsgr2_data', JSON.stringify(d)); } catch (e) {}
    if (Date.now() - _studyCloudPushAt > 600000) {
      _studyCloudPushAt = Date.now();
      if (typeof cloudPushDebounced === 'function') { try { cloudPushDebounced(); } catch (e) {} }
    }
  }, 30000);
}
document.addEventListener('DOMContentLoaded', function () { setTimeout(startStudyTimer, 1500); });

/* ════════════ Lien direct vers un onglet (?go=quiz ou #quiz) ════════════
   Permet les raccourcis PWA (appui long sur l'icône) et le partage de liens
   directs vers une section. S'exécute après l'init des matières (400 ms). */
document.addEventListener('DOMContentLoaded', function () {
  // On lit le dernier onglet MAINTENANT (avant que l'init des matières, à 400 ms,
  // n'affiche 'synthese' et n'écrase la valeur mémorisée).
  var savedLast = '';
  try { savedLast = localStorage.getItem('gr2_last_section') || ''; } catch (_) {}
  setTimeout(function () {
    try {
      var go = '';
      try { go = new URLSearchParams(location.search).get('go') || ''; } catch (_) {}
      if (!go && location.hash) go = location.hash.replace(/^#/, '');
      go = (go || '').replace(/[^a-z0-9]/gi, '');
      var fromLink = !!go;
      // Pas de lien direct → « Reprendre où j'étais » : on rouvre le dernier onglet.
      if (!go) go = (savedLast || '').replace(/[^a-z0-9]/gi, '');
      if (!go || go === 'synthese') return; // synthese = déjà l'écran par défaut
      var sec = document.getElementById(go);
      if (sec && sec.classList.contains('section') && typeof showSection === 'function') {
        showSection(go);
        if (fromLink) { try { sec.scrollIntoView({ behavior: 'smooth', block: 'start' }); } catch (_) {} }
      }
    } catch (_) {}
  }, 650);
});

/* ════════════ Minuteur d'examen (chrono « conditions réelles ») ════════════ */
(function () {
  var timer = null, remaining = 0, paused = false;
  function fmt(s) { s = Math.max(0, s); var m = Math.floor(s / 60), x = s % 60; return m + ':' + (x < 10 ? '0' : '') + x; }
  function render() { var d = document.getElementById('exam-clock'); if (d) d.textContent = fmt(remaining); }
  function tick() { if (paused) return; remaining--; render(); if (remaining <= 0) finish(); }
  function finish() {
    if (timer) { clearInterval(timer); timer = null; }
    var w = document.getElementById('exam-timer-widget'); if (w) w.classList.add('done');
    if (typeof showToast === 'function') showToast('⏱️ Temps écoulé — pose ton stylo !', '#f87171');
    try { if (navigator.vibrate) navigator.vibrate([250, 120, 250]); } catch (e) {}
  }
  window.startExamTimer = function (mins) {
    mins = parseInt(mins, 10); if (!mins || mins < 1 || mins > 600) return;
    remaining = mins * 60; paused = false;
    var w = document.getElementById('exam-timer-widget');
    if (!w) { w = document.createElement('div'); w.id = 'exam-timer-widget'; document.body.appendChild(w); }
    w.className = '';
    w.innerHTML = '<span class="etw-label">⏱️</span><span id="exam-clock">' + fmt(remaining) + '</span>' +
      '<button type="button" id="etw-pause" aria-label="Pause ou reprendre">⏸️</button>' +
      '<button type="button" id="etw-close" aria-label="Arrêter le minuteur">✕</button>';
    w.querySelector('#etw-pause').onclick = function () { paused = !paused; this.textContent = paused ? '▶️' : '⏸️'; };
    w.querySelector('#etw-close').onclick = function () { if (timer) { clearInterval(timer); timer = null; } w.remove(); };
    if (timer) clearInterval(timer); timer = setInterval(tick, 1000); render();
    var ov = document.getElementById('exam-timer-overlay'); if (ov) ov.remove();
  };
  window.openExamTimer = function () {
    var ov = document.getElementById('exam-timer-overlay');
    if (ov) { ov.style.display = 'flex'; return; }
    ov = document.createElement('div'); ov.id = 'exam-timer-overlay';
    ov.style.cssText = 'position:fixed; inset:0; background:rgba(0,0,0,0.88); z-index:3600; display:flex; align-items:center; justify-content:center; padding:1rem;';
    var presets = [20, 30, 50, 90];
    ov.innerHTML = '<div style="background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:20px; padding:1.8rem 1.5rem; max-width:360px; width:100%; text-align:center; box-shadow:0 20px 60px rgba(0,0,0,.5);">' +
      '<div style="font-size:38px;">⏱️</div>' +
      '<h3 style="font-size:20px; font-weight:800; color:var(--color-nav); margin:.2rem 0 .3rem;">Minuteur d\'examen</h3>' +
      '<p style="color:var(--text-secondary); font-size:13px; margin:0 0 1.1rem;">Entraîne-toi en conditions réelles.</p>' +
      '<div style="display:grid; grid-template-columns:repeat(2,1fr); gap:8px; margin-bottom:.9rem;">' +
        presets.map(function (m) { return '<button type="button" onclick="startExamTimer(' + m + ')" style="padding:12px; border-radius:10px; border:1px solid var(--color-nav); background:transparent; color:var(--color-nav); font-weight:700; cursor:pointer;">' + m + ' min</button>'; }).join('') +
      '</div>' +
      '<div style="display:flex; gap:8px;">' +
        '<input id="exam-custom-min" type="number" min="1" max="600" placeholder="autre (min)" aria-label="Durée personnalisée en minutes" style="flex:1; padding:10px; border-radius:10px; border:1px solid var(--border-subtle); background:var(--bg-main); color:var(--text-primary); font-size:15px;">' +
        '<button type="button" onclick="startExamTimer(document.getElementById(\'exam-custom-min\').value)" style="padding:10px 16px; border-radius:10px; border:none; background:var(--color-nav); color:#fff; font-weight:700; cursor:pointer;">Go</button>' +
      '</div>' +
      '<button type="button" onclick="var o=document.getElementById(\'exam-timer-overlay\'); if(o)o.remove();" style="margin-top:.9rem; background:transparent; border:none; color:var(--text-secondary); cursor:pointer; font-size:13px;">✕ Annuler</button>' +
    '</div>';
    ov.addEventListener('click', function (e) { if (e.target === ov) ov.remove(); });
    document.body.appendChild(ov);
    var f = document.getElementById('exam-custom-min'); if (f) try { f.focus(); } catch (e) {}
  };
})();

/* ════════════ Export du cours en PDF (impression) ════════════ */
function exportCoursePDF() {
  if (typeof showToast === 'function') showToast('🖨️ Préparation du cours…', 'var(--color-nav)');
  setTimeout(function () { try { window.print(); } catch (e) {} }, 300);
}

/* ════════════ Anti-sèche imprimable (1 page, condensée) ════════════
   Génère une fiche dense pour la matière courante : formules/repères (section
   « formules ») + définitions clés (recto → verso des flashcards), optimisée
   pour l'impression. N'utilise QUE le contenu déjà présent (jamais inventé). */
function openCheatSheet(mode) {
  // mode : 'full' (formules + définitions, défaut) ou 'formules' (formules seules, ~1 page)
  var withDefs = (mode !== 'formules');
  var host = document.getElementById('revision-sheet');
  if (!host) return;
  var key = window.currentSubject || 'maths';
  var subj = (window.SUBJECTS && window.SUBJECTS[key]) || {};
  var content = subj.content || {};
  var label = (key === 'maths') ? 'Maths GR2' : (subj.label || 'Révisions');
  var icon = subj.icon || '📘';

  // 1) Formules & repères : intérieur de la section « formules », sans le gros titre.
  var formulesHtml = '';
  try {
    var src = content.sections && content.sections.formules;
    if (src) {
      var tmp = document.createElement('div');
      tmp.innerHTML = src;
      var h2 = tmp.querySelector('h2'); if (h2) h2.remove();
      tmp.querySelectorAll('.simple-exp-toggle').forEach(function (b) { b.remove(); });
      formulesHtml = (tmp.querySelector('.section') ? tmp.querySelector('.section').innerHTML : tmp.innerHTML);
    }
  } catch (e) {}

  // 2) Définitions clés : flashcards (recto → verso nettoyé, schémas SVG retirés).
  var defs = '';
  try {
    var cards = withDefs ? (content.flashcards || []).slice(0) : [];
    var rows = [];
    cards.forEach(function (c) {
      if (!c || !c.front || !c.back) return;
      var back = String(c.back);
      var hadSvg = /<svg/i.test(back);
      back = back.replace(/<svg[\s\S]*?<\/svg>/gi, '').replace(/<details[\s\S]*?<\/details>/gi, '');
      back = back.replace(/<br\s*\/?>(\s*)/gi, ' ').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
      var front = String(c.front).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
      if (!back && hadSvg) return;     // carte purement visuelle → on saute
      if (!back) return;
      // On coupe les définitions très longues : une anti-sèche reste télégraphique.
      back = back.replace(/\s*[—–-]\s*$/, '');
      if (back.length > 150) back = back.slice(0, 148).replace(/\s+\S*$/, '') + '…';
      rows.push('<li><b>' + front + '</b> — ' + back + '</li>');
    });
    if (rows.length) defs = '<ul class="cs-defs">' + rows.join('') + '</ul>';
  } catch (e) {}

  if (!formulesHtml && !defs) {
    if (typeof showToast === 'function') showToast('Pas encore d\'anti-sèche pour cette matière', '#f87171');
    return;
  }

  var today = new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  // .cs-sheet déclenche la mise en page DENSE (CSS @media print). #revision-sheet
  // est déjà isolé à l'impression (il masque tout le reste de la page).
  host.innerHTML =
    '<div class="cs-sheet">' +
      '<div class="cs-head"><h1>' + icon + ' Anti-sèche — ' + label + '</h1>' +
      '<span class="cs-date">Révisions · ' + today + '</span></div>' +
      (formulesHtml ? '<h2 class="cs-h">Formules &amp; repères</h2><div class="cs-formules">' + formulesHtml + '</div>' : '') +
      (defs ? '<h2 class="cs-h">Définitions clés</h2>' + defs : '') +
    '</div>';

  if (typeof showToast === 'function') showToast('📄 Anti-sèche prête à imprimer', 'var(--color-parabole)');
  var doPrint = function () { setTimeout(function () { try { window.print(); } catch (e) {} }, 60); };
  if (window.MathJax && MathJax.typesetPromise) {
    MathJax.typesetPromise([host]).then(doPrint).catch(doPrint);
  } else { doPrint(); }
}

/* ════════════ Confort de lecture (dyslexie) ════════════ */
function setReadingMode(mode) {
  document.body.classList.toggle('reading-comfort', mode === 'comfort');
  try { localStorage.setItem('mathsgr2_reading', mode); } catch (_) {}
  var n = document.getElementById('read-btn-normal'), c = document.getElementById('read-btn-comfort');
  if (n) n.classList.toggle('active', mode !== 'comfort');
  if (c) c.classList.toggle('active', mode === 'comfort');
}
document.addEventListener('DOMContentLoaded', function () {
  try { setReadingMode(localStorage.getItem('mathsgr2_reading') || 'normal'); } catch (_) {}
});

/* ════════════ Rappel de révision à l'ouverture ════════════
   - attend la fin de l'écran de bienvenue (jamais par-dessus l'onboarding)
   - bandeau complet 6 s, puis se replie en petite pastille 🔔 N en haut à droite
     (il ne recouvre plus jamais le contenu ni les boutons du quiz). */
function showRevisionReminder() {
  try {
    if (sessionStorage.getItem('mathsgr2_reminded')) return;
    if (!window.SUBJECTS) return;
    // L'écran de bienvenue est encore là → on repasse plus tard.
    var wel = document.getElementById('welcome-overlay');
    if (wel && wel.offsetParent !== null) { setTimeout(showRevisionReminder, 2500); return; }
    var data = loadSavedData(); var fc = data.flashcardData || {}; var now = Date.now(); var total = 0;
    ['maths', 'francais', 'anglais', 'neerlandais', 'histoire', 'geo', 'chimie', 'bio', 'eco'].forEach(function (key) {
      var s = window.SUBJECTS[key]; if (!s || !s.ready || !s.content) return;
      (s.content.flashcards || []).forEach(function (c) { var r = fc[c.front]; if (!r || !r.due || new Date(r.due).getTime() <= now) total++; });
    });
    if (total <= 0) return;
    sessionStorage.setItem('mathsgr2_reminded', '1');
    var bar = document.createElement('div');
    bar.id = 'revision-reminder';
    bar.style.cssText = 'position:fixed; left:50%; transform:translateX(-50%); top:14px; z-index:2500; background:var(--bg-card); border:1px solid var(--color-nav); border-radius:14px; padding:10px 14px; box-shadow:0 10px 30px rgba(0,0,0,.45); display:flex; align-items:center; justify-content:center; gap:12px; flex-wrap:wrap; max-width:min(92vw,560px); animation:imgModalIn .25s ease;';
    bar.innerHTML = '<span style="font-size:14px;">🔔 Tu as <strong>' + total + '</strong> carte' + (total > 1 ? 's' : '') + ' à réviser aujourd\'hui</span>' +
      '<button onclick="showSection(\'profil\'); var b=document.getElementById(\'revision-reminder\'); if(b)b.remove();" style="background:#7c3aed; color:#fff; border:none; border-radius:9px; padding:8px 14px; font-size:13px; font-weight:700; cursor:pointer; min-height:36px;">📚 Réviser</button>' +
      '<button onclick="var b=document.getElementById(\'revision-reminder\'); if(b)b.remove();" aria-label="Fermer le rappel" style="background:transparent; border:none; color:var(--text-secondary); font-size:16px; cursor:pointer; min-width:32px; min-height:32px; border-radius:8px;">✕</button>';
    document.body.appendChild(bar);
    // Après 6 s : repli en pastille discrète (clic = aller réviser)
    setTimeout(function () {
      var b = document.getElementById('revision-reminder'); if (!b) return;
      b.style.cssText = 'position:fixed; top:72px; right:14px; left:auto; transform:none; z-index:2500; background:var(--bg-card); border:1px solid var(--color-nav); border-radius:999px; padding:7px 14px; box-shadow:0 6px 18px rgba(0,0,0,.4); cursor:pointer; font-size:13px; font-weight:700; color:var(--text-primary);';
      b.innerHTML = '🔔 ' + total;
      b.title = total + ' carte' + (total > 1 ? 's' : '') + ' à réviser — clique pour y aller';
      b.onclick = function () { showSection('profil'); b.remove(); };
    }, 6000);
    // Et on range tout après 90 s si pas utilisé
    setTimeout(function () { var b = document.getElementById('revision-reminder'); if (b) b.remove(); }, 90000);
  } catch (_) {}
}
document.addEventListener('DOMContentLoaded', function () { setTimeout(showRevisionReminder, 1800); });

/* ════════════ Calculatrice maths : milieu, distance, pente ════════════ */
function _gcNum(id) {
  var el = document.getElementById(id);
  if (!el) return NaN;
  var v = (el.value || '').trim().replace(',', '.');
  return v === '' ? NaN : parseFloat(v);
}
function _gcFmt(n) {
  if (!isFinite(n)) return '?';
  var r = Math.round(n * 1000) / 1000;
  return ('' + r).replace('.', ',');
}
function calcGeoExample() {
  var ex = [[-2, 1, 4, 5], [1, 3, 7, -1], [0, 0, 6, 8], [-3, -2, 2, 4]][Math.floor(Math.random() * 4)];
  ['gc-xa', 'gc-ya', 'gc-xb', 'gc-yb'].forEach(function (id, i) { var el = document.getElementById(id); if (el) el.value = ex[i]; });
  calcGeo();
}
function calcGeo() {
  var res = document.getElementById('gc-result'); if (!res) return;
  var xa = _gcNum('gc-xa'), ya = _gcNum('gc-ya'), xb = _gcNum('gc-xb'), yb = _gcNum('gc-yb');
  if ([xa, ya, xb, yb].some(function (n) { return isNaN(n); })) {
    res.innerHTML = '<p class="gc-warn">✏️ Remplis les <strong>4 coordonnées</strong> (A et B).</p>';
    res.classList.add('show'); return;
  }
  var mx = (xa + xb) / 2, my = (ya + yb) / 2;
  var dx = xb - xa, dy = yb - ya;
  var d2 = dx * dx + dy * dy, dist = Math.sqrt(d2);
  var html = '';
  // Milieu
  html += '<div class="gc-block"><h4>📍 Milieu de [AB]</h4>' +
    '\\( M\\left(\\dfrac{x_A+x_B}{2}\\,;\\,\\dfrac{y_A+y_B}{2}\\right)=M\\left(\\dfrac{' + _t(xa) + '+' + _t(xb) + '}{2}\\,;\\,\\dfrac{' + _t(ya) + '+' + _t(yb) + '}{2}\\right) \\)' +
    '<div class="gc-final">M( ' + _gcFmt(mx) + ' ; ' + _gcFmt(my) + ' )</div></div>';
  // Distance
  html += '<div class="gc-block"><h4>📏 Distance AB</h4>' +
    '\\( AB=\\sqrt{(x_B-x_A)^2+(y_B-y_A)^2}=\\sqrt{(' + _t(dx) + ')^2+(' + _t(dy) + ')^2}=\\sqrt{' + _t(d2) + '} \\)' +
    '<div class="gc-final">AB = ' + _gcFmt(dist) + (Math.abs(dist - Math.round(dist)) > 1e-9 ? ' (≈)' : '') + '</div></div>';
  // Pente
  html += '<div class="gc-block"><h4>📈 Pente de (AB)</h4>';
  if (dx === 0) {
    html += '<p>Comme \\(x_A=x_B\\), la droite est <strong>verticale</strong> : la pente n\'existe pas (division par 0).</p>';
  } else {
    var m = dy / dx;
    html += '\\( m=\\dfrac{y_B-y_A}{x_B-x_A}=\\dfrac{' + _t(dy) + '}{' + _t(dx) + '} \\)' +
      '<div class="gc-final">m = ' + _gcFmt(m) + (m > 0 ? ' (monte ↗)' : (m < 0 ? ' (descend ↘)' : ' (horizontale →)')) + '</div>';
  }
  html += '</div>';
  res.innerHTML = html;
  res.classList.add('show');
  if (typeof safeMathJax === 'function') safeMathJax([res]);
}
// petit util : nombre → texte mathjax (parenthèses pour négatifs gérées à l'appel)
function _t(n) { var r = Math.round(n * 1000) / 1000; return '' + r; }

/* ════════════ Célébrations (confettis + bannière) ════════════ */
function celebrate(message) {
  try {
    var colors = ['#a78bfa', '#60a5fa', '#34d399', '#fbbf24', '#f87171', '#f472b6'];
    for (var i = 0; i < 70; i++) {
      var el = document.createElement('div');
      var left = Math.random() * 100;
      var size = 6 + Math.random() * 8;
      el.style.cssText = 'position:fixed; top:-20px; left:' + left + 'vw; width:' + size + 'px; height:' + (size * 0.5) + 'px; background:' + colors[i % colors.length] + '; z-index:9998; pointer-events:none; border-radius:2px; opacity:0.95; transform:rotate(' + (Math.random() * 360) + 'deg); animation:confettiDrop ' + (1.4 + Math.random() * 1.4) + 's cubic-bezier(.3,.7,.5,1) ' + (Math.random() * 0.4) + 's forwards;';
      document.body.appendChild(el);
      (function (node) { setTimeout(function () { node.remove(); }, 3400); })(el);
    }
    if (message) {
      var banner = document.createElement('div');
      banner.className = 'celebrate-banner';
      banner.textContent = message;
      document.body.appendChild(banner);
      setTimeout(function () { banner.classList.add('out'); }, 1700);
      setTimeout(function () { banner.remove(); }, 2300);
    }
  } catch (_) {}
}

/* ════════════ Guide des fonctionnalités ════════════ */
function openHelp() {
  var ov = document.getElementById('helpModal');
  if (!ov) {
    ov = document.createElement('div');
    ov.id = 'helpModal';
    ov.className = 'help-modal';
    var groups = [
      ['📚 Réviser', [
        ['🎴 Flashcards', 'Clique la carte pour la retourner, note « Je savais / hésité / je ne savais pas ». La répétition espacée te re-montre les cartes au bon moment. Boutons : 🔊 écouter, ✏️ écrire, ⭐ favori, 🔀 mélanger.'],
        ['❓ Quiz', 'Réponds aux questions ; une explication apparaît (avec lien vers la fiche). Barre de progression en haut. « Quiz mixte » = toutes matières.'],
        ['📝 Examen blanc', 'Dans le quiz : 5 questions chronométrées, note sur /20 enregistrée dans ton historique.'],
        ['🔀 Tout réviser', 'Sur le profil : une session mélangée des cartes dues de toutes les matières.']
      ]],
      ['🗂️ Trouver & comprendre', [
        ['🔍 Recherche', 'Bouton « Rechercher » (ou touche /) : cherche dans les fiches, flashcards et formules.'],
        ['📖 Index des fiches', 'Toutes les fiches cliquables, filtrables par matière.'],
        ['🖼️ Fiches détaillées', 'Clique une image/un nom souligné : cours, examen, anecdote, galerie + « Mes notes » perso.'],
        ['🗺️ Carte & 🕰️ frise', 'En Géo : carte cliquable + quiz. En Histoire : frise cliquable des périodes.']
      ]],
      ['📈 Suivre mes progrès', [
        ['👤 Profil', '« À réviser aujourd\'hui », objectif du jour, progression par matière, régularité (séries), graphiques.'],
        ['🏆 Badges', 'Débloque des badges en pratiquant (séries, examens, cartes…).'],
        ['⏳ Planning d\'examen', 'Mets tes dates d\'examen → jours restants + cartes/jour conseillées.']
      ]],
      ['⚙️ Personnaliser', [
        ['🎨 Paramètres', 'Thème, couleur par matière, confort de lecture (dyslexie), objectif quotidien, taille du texte, musique, Pomodoro.']
      ]]
    ];
    var inner = '<div class="help-box"><button class="help-close" onclick="closeHelp()" aria-label="Fermer">✕</button>' +
      '<h3>❓ Guide du site</h3><p class="help-intro">Toutes les fonctions, et comment les utiliser :</p>';
    groups.forEach(function (g) {
      inner += '<div class="help-group"><h4>' + g[0] + '</h4>';
      g[1].forEach(function (it) { inner += '<div class="help-item"><strong>' + it[0] + '</strong><span>' + it[1] + '</span></div>'; });
      inner += '</div>';
    });
    inner += '</div>';
    ov.innerHTML = inner;
    ov.addEventListener('mousedown', function (e) { if (e.target === ov) closeHelp(); });
    document.body.appendChild(ov);
  }
  ov.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeHelp() {
  var ov = document.getElementById('helpModal');
  if (ov) ov.classList.remove('open');
  document.body.style.overflow = '';
}

/* ════════════ Mes notes perso (par fiche) ════════════ */
function saveFicheNote(key, val) {
  try {
    var d = loadSavedData(); d.ficheNotes = d.ficheNotes || {};
    if (val && val.trim()) d.ficheNotes[key] = val; else delete d.ficheNotes[key];
    saveData(d);
  } catch (_) {}
  var cnt = document.getElementById('fiche-note-count');
  if (cnt) cnt.textContent = (val ? val.length : 0) + ' / 600';
  var s = document.getElementById('fiche-note-saved');
  if (s) { s.textContent = '✓ enregistré'; clearTimeout(window._fnT); window._fnT = setTimeout(function () { var e = document.getElementById('fiche-note-saved'); if (e) e.textContent = ''; }, 1500); }
}

/* ════════════ Badges & récompenses ════════════ */
function _badgeCtx(data) {
  var mastered = data.masteredQuestions || {};
  var exam = data.examHistory || {};
  var bestExam = 0, examCount = 0;
  Object.keys(exam).forEach(function (k) { (exam[k] || []).forEach(function (h) { bestExam = Math.max(bestExam, h.note || 0); examCount++; }); });
  var st = data.study || {};
  var subjMastered = 0;
  if (window.SUBJECTS) {
    Object.keys(window.SUBJECTS).forEach(function (key) {
      var s = window.SUBJECTS[key]; var qs = s && s.content && s.content.questions;
      if (!s || !s.ready || !qs || !qs.length) return;
      var done = qs.filter(function (q) { return (mastered[q.q] || 0) >= 1; }).length;
      if (done === qs.length) subjMastered++;
    });
  }
  return {
    quizzes: data.totalQuizzes || 0,
    mastered: Object.keys(mastered).length,
    streak: data.streak || 0,
    perfect: (data.scoreHistory || []).some(function (s) { return s >= 100; }) ? 1 : 0,
    bestExam: bestExam,
    examCount: examCount,
    studySec: (st.totalSec || 0),
    notes: Object.keys(data.ficheNotes || {}).length,
    pomodoros: data.pomodorosCompleted || 0,
    subjMastered: subjMastered
  };
}
var BADGE_DEFS = [
  { id: 'firststep', icon: '🐣', name: 'Premiers pas', desc: 'Termine ton 1er quiz', goal: 1, cur: function (c) { return c.quizzes; } },
  { id: 'quiz10', icon: '🎮', name: 'Quiz addict', desc: 'Termine 10 quiz', goal: 10, cur: function (c) { return c.quizzes; } },
  { id: 'mastered25', icon: '📈', name: 'Sur la bonne voie', desc: 'Maîtrise 25 questions', goal: 25, cur: function (c) { return c.mastered; } },
  { id: 'mastered100', icon: '🧠', name: 'Cerveau en feu', desc: 'Maîtrise 100 questions', goal: 100, cur: function (c) { return c.mastered; } },
  { id: 'streak3', icon: '📆', name: 'Régulier', desc: '3 jours d\'affilée', goal: 3, cur: function (c) { return c.streak; } },
  { id: 'streak7', icon: '🔥', name: 'Une semaine !', desc: '7 jours d\'affilée', goal: 7, cur: function (c) { return c.streak; } },
  { id: 'perfect', icon: '💯', name: 'Sans faute', desc: 'Un quiz à 100 %', goal: 1, cur: function (c) { return c.perfect; } },
  { id: 'exam16', icon: '🎓', name: 'Prêt pour l\'exam', desc: 'Un examen blanc ≥ 16/20', goal: 16, cur: function (c) { return c.bestExam; } },
  { id: 'exam20', icon: '🏆', name: 'Note parfaite', desc: 'Un examen blanc à 20/20', goal: 20, cur: function (c) { return c.bestExam; } },
  { id: 'study1h', icon: '⏳', name: 'Studieux', desc: '1 h d\'étude au total', goal: 3600, cur: function (c) { return c.studySec; }, fmt: function (v) { return Math.round(v / 60) + ' min'; } },
  { id: 'study5h', icon: '🏃', name: 'Marathonien', desc: '5 h d\'étude au total', goal: 18000, cur: function (c) { return c.studySec; }, fmt: function (v) { return Math.round(v / 60) + ' min'; } },
  { id: 'notes5', icon: '✍️', name: 'Annotateur', desc: 'Écris des notes sur 5 fiches', goal: 5, cur: function (c) { return c.notes; } },
  { id: 'pomodoro', icon: '🍅', name: 'Concentré', desc: 'Termine 4 pomodoros', goal: 4, cur: function (c) { return c.pomodoros; } },
  { id: 'specialist', icon: '🌟', name: 'Spécialiste', desc: 'Maîtrise 100 % d\'une matière', goal: 1, cur: function (c) { return c.subjMastered; } }
];
function evaluateBadges(data, silent) {
  data.badgeEarned = data.badgeEarned || [];
  var c = _badgeCtx(data); var fresh = [];
  BADGE_DEFS.forEach(function (b) {
    if (b.cur(c) >= b.goal && data.badgeEarned.indexOf(b.id) < 0) { data.badgeEarned.push(b.id); fresh.push(b); }
  });
  if (fresh.length) {
    saveData(data);
    if (!silent && typeof showToast === 'function') {
      fresh.forEach(function (b, i) { setTimeout(function () { showToast('🏆 Badge débloqué : ' + b.icon + ' ' + b.name, 'var(--color-parabole)'); }, i * 1400); });
    }
  }
  return fresh;
}
function renderBadgeShowcase() {
  var box = document.getElementById('badges-container');
  if (!box) return;
  var data = loadSavedData();
  evaluateBadges(data, false);
  var c = _badgeCtx(data);
  var earned = data.badgeEarned || [];
  var nb = earned.length;
  box.innerHTML = '<p style="width:100%; color:var(--text-secondary); font-size:13px; margin:0 0 .4rem;">' + nb + ' / ' + BADGE_DEFS.length + ' badge' + (nb > 1 ? 's' : '') + ' débloqué' + (nb > 1 ? 's' : '') + '</p>' +
    '<div class="badge-grid">' + BADGE_DEFS.map(function (b) {
      var cur = b.cur(c), unlocked = cur >= b.goal;
      var pct = Math.min(100, Math.round(cur / b.goal * 100));
      var prog = b.goal > 1 ? (b.fmt ? b.fmt(Math.min(cur, b.goal)) + ' / ' + b.fmt(b.goal) : Math.min(cur, b.goal) + ' / ' + b.goal) : '';
      return '<div class="badge-tile' + (unlocked ? ' on' : '') + '" title="' + b.desc + '">' +
        '<div class="badge-ic">' + (unlocked ? b.icon : '🔒') + '</div>' +
        '<div class="badge-nm">' + b.name + '</div>' +
        '<div class="badge-ds">' + b.desc + '</div>' +
        (!unlocked && b.goal > 1 ? '<div class="badge-bar"><div style="width:' + pct + '%;"></div></div><div class="badge-pr">' + prog + '</div>' : (unlocked ? '<div class="badge-pr badge-pr-ok">✓ obtenu</div>' : '')) +
        '</div>';
    }).join('') + '</div>';
}

/* ════════════ Graphiques de progression ════════════ */
function renderProgressCharts() {
  var host = document.getElementById('profil');
  if (!host) return;
  var old = document.getElementById('progress-charts'); if (old) old.remove();
  var data = loadSavedData();
  var sec = document.createElement('div');
  sec.id = 'progress-charts';
  sec.style.marginTop = '2rem';
  var html = '<h3 style="font-size:24px; font-weight:600; margin-bottom:1rem;">📈 Mes progrès</h3>';

  // — Régularité (jours actifs, meilleure série, moyenne/semaine) —
  var cal = data.calendar || {};
  var days = Object.keys(cal).filter(function (k) { return (cal[k] || 0) > 0; }).sort();
  var activeDays = days.length;
  var bestStreak = 0, run = 0, prev = null;
  days.forEach(function (k) {
    if (prev) {
      var diff = Math.round((new Date(k) - new Date(prev)) / 86400000);
      run = (diff === 1) ? run + 1 : 1;
    } else run = 1;
    if (run > bestStreak) bestStreak = run;
    prev = k;
  });
  // moyenne par semaine = jours actifs ÷ nb de semaines depuis le 1er jour actif
  var weeks = 1;
  if (days.length) { weeks = Math.max(1, Math.ceil((Date.now() - new Date(days[0]).getTime()) / (7 * 86400000))); }
  var perWeek = Math.round(activeDays / weeks * 10) / 10;
  var nowStreak = data.streak || 0;
  function regCell(val, lbl, emo) {
    return '<div style="flex:1; min-width:84px; background:var(--bg-main); border:1px solid var(--border-subtle); border-radius:12px; padding:.7rem .4rem; text-align:center;">' +
      '<div style="font-size:22px; font-weight:800; color:var(--color-nav);">' + emo + ' ' + val + '</div>' +
      '<div style="font-size:12.5px; color:var(--text-secondary); margin-top:2px;">' + lbl + '</div></div>';
  }
  html += '<div class="pc-card" style="margin-bottom:1rem;"><div class="pc-head"><span>🔥 Ma régularité</span></div>' +
    '<div style="display:flex; gap:8px; flex-wrap:wrap;">' +
    regCell(nowStreak + ' j', 'Série en cours', '🔥') +
    regCell(bestStreak + ' j', 'Meilleure série', '🏅') +
    regCell(activeDays, 'Jours actifs', '📆') +
    regCell(perWeek, 'Jours / semaine', '📊') +
    '</div>' +
    (activeDays === 0 ? '<p class="pc-empty" style="margin-top:.7rem;">Réponds à des questions ou révise des cartes : ta régularité s\'affichera ici.</p>' : '') +
    '</div>';

  // — Temps d'étude, 7 derniers jours —
  var hist = (data.study && data.study.history) || {};
  var days = [], maxSec = 1;
  for (var i = 6; i >= 0; i--) {
    var d = new Date(); d.setDate(d.getDate() - i);
    var key = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
    var s = hist[key] || 0; if (s > maxSec) maxSec = s;
    days.push({ lbl: ['D', 'L', 'M', 'M', 'J', 'V', 'S'][d.getDay()], sec: s });
  }
  var totalWeek = days.reduce(function (a, b) { return a + b.sec; }, 0);
  html += '<div class="pc-card"><div class="pc-head"><span>⏱️ Temps d\'étude (7 jours)</span><span class="pc-sub">' + fmtDur(totalWeek) + ' au total</span></div>';
  if (totalWeek === 0) {
    html += '<p class="pc-empty">Étudie un peu et tes minutes s\'afficheront ici jour par jour.</p>';
  } else {
    html += '<div class="pc-bars">' + days.map(function (x) {
      var h = Math.round(x.sec / maxSec * 100);
      var lab = x.sec >= 60 ? Math.round(x.sec / 60) + 'm' : (x.sec > 0 ? '<1m' : '');
      return '<div class="pc-col"><div class="pc-val">' + lab + '</div><div class="pc-bar-wrap"><div class="pc-bar" style="height:' + (x.sec ? Math.max(4, h) : 0) + '%;"></div></div><div class="pc-lbl">' + x.lbl + '</div></div>';
    }).join('') + '</div>';
  }
  html += '</div>';

  // — Évolution des notes d'examen blanc —
  var exam = data.examHistory || {};
  var subjKeys = Object.keys(exam).filter(function (k) { return (exam[k] || []).length; });
  if (subjKeys.length) {
    var order = ['maths', 'francais', 'anglais', 'neerlandais', 'histoire', 'geo', 'chimie', 'bio', 'eco'];
    subjKeys.sort(function (a, b) { return order.indexOf(a) - order.indexOf(b); });
    html += '<div class="pc-card" style="margin-top:1rem;"><div class="pc-head"><span>📝 Notes d\'examen blanc (/20)</span></div>';
    subjKeys.forEach(function (k) {
      var arr = (exam[k] || []).slice(-8);
      var label = (window.SUBJECTS && window.SUBJECTS[k] && window.SUBJECTS[k].label) || k;
      var accent = (window.SUBJECT_ACCENTS && window.SUBJECT_ACCENTS[k]) || 'var(--color-nav)';
      var best = arr.reduce(function (m, h) { return Math.max(m, h.note || 0); }, 0);
      html += '<div class="pc-exam"><div class="pc-exam-h"><span style="font-weight:600;">' + label + '</span><span class="pc-sub">record ' + best + '/20</span></div>' +
        '<div class="pc-bars pc-bars-sm">' + arr.map(function (h) {
          var pct = Math.round((h.note || 0) / 20 * 100);
          var col = (h.note >= 16) ? '#34d399' : (h.note >= 10 ? accent : '#f87171');
          var dlbl = '';
          if (h.date) { var dp = ('' + h.date).split('-'); if (dp.length === 3) dlbl = dp[2] + '/' + dp[1]; }
          return '<div class="pc-col"><div class="pc-val">' + (h.note || 0) + '</div><div class="pc-bar-wrap"><div class="pc-bar" style="height:' + Math.max(4, pct) + '%; background:' + col + ';"></div></div><div class="pc-lbl">' + dlbl + '</div></div>';
        }).join('') + '</div></div>';
    });
    html += '</div>';
  }

  sec.innerHTML = html;
  // place juste après la répartition par matière si elle existe, sinon à la fin
  var bd = document.getElementById('subject-breakdown');
  if (bd && bd.parentNode) bd.parentNode.insertBefore(sec, bd.nextSibling);
  else host.appendChild(sec);
}

// ── INDICATEUR HORS-LIGNE (PWA) ──
// Prévient l'élève quand la connexion tombe : les révisions (cours, quiz, flashcards)
// marchent hors-ligne, mais le Chat et le Classement, eux, ont besoin d'Internet.
// 100% autonome, n'interfère avec rien d'autre.
(function () {
  'use strict';
  function ensureBanner() {
    var el = document.getElementById('offline-banner');
    if (el) return el;
    el = document.createElement('div');
    el.id = 'offline-banner';
    el.setAttribute('role', 'status');
    el.setAttribute('aria-live', 'polite');
    el.style.cssText = 'position:fixed; left:50%; bottom:14px; transform:translateX(-50%) translateY(140%);' +
      'max-width:92vw; z-index:9998; padding:10px 18px; border-radius:12px; font-size:14px; font-weight:600;' +
      'box-shadow:0 6px 24px rgba(0,0,0,0.35); transition:transform 0.35s ease, background 0.3s ease;' +
      'display:flex; align-items:center; gap:8px; color:#fff;';
    document.body.appendChild(el);
    return el;
  }
  var hideTimer = null;
  function setState(online) {
    var el = ensureBanner();
    if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; }
    if (online) {
      el.style.background = 'var(--color-parabole, #34d399)';
      el.textContent = '✅ De retour en ligne — Chat et Classement réactivés.';
      el.style.transform = 'translateX(-50%) translateY(0)';
      hideTimer = setTimeout(function () { el.style.transform = 'translateX(-50%) translateY(140%)'; }, 2600);
    } else {
      el.style.background = '#ef4444';
      el.textContent = '📴 Hors-ligne — tes révisions marchent toujours (le Chat reviendra avec Internet).';
      el.style.transform = 'translateX(-50%) translateY(0)';
    }
  }
  window.addEventListener('offline', function () { setState(false); });
  window.addEventListener('online', function () { setState(true); });
  // À l'ouverture : si déjà hors-ligne, le signaler discrètement
  document.addEventListener('DOMContentLoaded', function () {
    if (navigator.onLine === false) setTimeout(function () { setState(false); }, 1200);
  });
})();

// ── BOUTON « INSTALLER L'APP » (PWA) ──
// Quand le navigateur juge l'app installable, il émet « beforeinstallprompt ».
// On capture l'événement et on propose un bouton discret pour ajouter l'app à
// l'écran d'accueil (révisions hors-ligne, plein écran). Caché si déjà installée.
// 100% autonome, n'interfère avec rien.
(function () {
  'use strict';
  var deferred = null;
  function alreadyInstalled() {
    try { return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true; } catch (_) { return false; }
  }
  function makeBtn() {
    var b = document.getElementById('install-btn');
    if (b) return b;
    b = document.createElement('button');
    b.id = 'install-btn'; b.type = 'button';
    b.setAttribute('aria-label', "Installer l'application");
    b.textContent = '📲 Installer l\'app';
    b.style.cssText = 'position:fixed; left:14px; bottom:14px; z-index:2400; padding:10px 16px;' +
      'border:none; border-radius:12px; cursor:pointer; font-size:14px; font-weight:700; color:#fff;' +
      'background:linear-gradient(135deg,var(--color-nav),#7c3aed); box-shadow:0 6px 20px rgba(0,0,0,0.4);' +
      'transition:transform 0.2s ease, opacity 0.25s ease;';
    b.addEventListener('mouseenter', function () { b.style.transform = 'translateY(-2px)'; });
    b.addEventListener('mouseleave', function () { b.style.transform = ''; });
    b.addEventListener('click', function () {
      if (!deferred) return;
      deferred.prompt();
      deferred.userChoice.then(function (c) {
        if (c && c.outcome === 'accepted' && typeof showToast === 'function') showToast('✅ App installée — retrouve-la sur ton écran d\'accueil !', 'var(--color-parabole)');
        deferred = null; b.remove();
      });
    });
    document.body.appendChild(b);
    return b;
  }
  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();          // on gère nous-mêmes le moment d'afficher
    if (alreadyInstalled()) return;
    deferred = e;
    makeBtn();
  });
  window.addEventListener('appinstalled', function () {
    deferred = null;
    var b = document.getElementById('install-btn'); if (b) b.remove();
  });
})();

// ── Anti « fond blanc » ──────────────────────────────────────
// Cliquer plusieurs fois très vite sur un bouton déclenchait la sélection
// double/triple-clic du navigateur : tout le texte autour devenait surligné
// (la page paraissait blanche). On bloque la sélection à partir du 2e clic.
document.addEventListener('mousedown', function (e) {
  // À partir du 2e clic rapide, on bloque la sélection PARTOUT sauf dans une vraie
  // zone de saisie (champ, liste déroulante, texte éditable). Couvre aussi les
  // <select> (ex. choix du thème dans Mes créations) où le bug réapparaissait.
  if (e.detail > 1 && e.target && e.target.closest) {
    var editable = e.target.closest('input, textarea, select, option, [contenteditable="true"], .cre-tbox-body, #cre-note-editor, .note-editor');
    if (!editable) e.preventDefault();
  }
}, true);

// ── Matières repliables (mobile) ─────────────────────────────
// Sur petit écran, la rangée des 9 matières se replie en un seul bouton
// « 📚 Maths ▾ » : fini les 4 rangées à scroller avant le contenu.
function toggleSubjectBar(force) {
  var bar = document.getElementById('subject-bar'), btn = document.getElementById('subj-fold');
  if (!bar || !btn) return;
  var open = (force !== undefined) ? !!force : !bar.classList.contains('open');
  bar.classList.toggle('open', open);
  btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  updateSubjFoldLabel();
}
function updateSubjFoldLabel() {
  var btn = document.getElementById('subj-fold'), bar = document.getElementById('subject-bar');
  if (!btn || !bar) return;
  var on = document.querySelector('.subj-btn.on');
  var caret = bar.classList.contains('open') ? '▴' : '▾';
  btn.textContent = (on ? on.textContent.trim() : '📚 Matière') + ' ' + caret;
}
document.addEventListener('DOMContentLoaded', function () {
  var bar = document.getElementById('subject-bar');
  if (bar) bar.addEventListener('click', function (e) {
    // choisir une matière replie la rangée (après que setSubject ait posé la classe .on)
    if (e.target.closest && e.target.closest('.subj-btn')) setTimeout(function () { toggleSubjectBar(false); }, 150);
  });
  setTimeout(updateSubjFoldLabel, 500);
});
