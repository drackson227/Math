/*! GR2 Study © 2026 Drackson — Tous droits réservés. Copie/réutilisation interdites sans autorisation (Instagram @drackson227). */
/* Entraîneur de verbes irréguliers (anglais).
   On montre la base, l'élève écrit prétérit + participe → correction tolérante + score.
   Se greffe sur la section « Exercises » de l'anglais via les id #irr-start / #irr-mount. */
(function () {
  'use strict';

  // Liste de référence (mêmes verbes que la fiche de la Synthèse).
  var VERBS = [
    { b: 'cut', pr: 'cut', pp: 'cut' }, { b: 'put', pr: 'put', pp: 'put' }, { b: 'let', pr: 'let', pp: 'let' },
    { b: 'hit', pr: 'hit', pp: 'hit' }, { b: 'cost', pr: 'cost', pp: 'cost' }, { b: 'set', pr: 'set', pp: 'set' },
    { b: 'shut', pr: 'shut', pp: 'shut' }, { b: 'read', pr: 'read', pp: 'read' },
    { b: 'become', pr: 'became', pp: 'become' }, { b: 'come', pr: 'came', pp: 'come' }, { b: 'run', pr: 'ran', pp: 'run' },
    { b: 'have', pr: 'had', pp: 'had' }, { b: 'make', pr: 'made', pp: 'made' }, { b: 'say', pr: 'said', pp: 'said' },
    { b: 'pay', pr: 'paid', pp: 'paid' }, { b: 'find', pr: 'found', pp: 'found' }, { b: 'buy', pr: 'bought', pp: 'bought' },
    { b: 'bring', pr: 'brought', pp: 'brought' }, { b: 'think', pr: 'thought', pp: 'thought' }, { b: 'teach', pr: 'taught', pp: 'taught' },
    { b: 'catch', pr: 'caught', pp: 'caught' }, { b: 'tell', pr: 'told', pp: 'told' }, { b: 'sell', pr: 'sold', pp: 'sold' },
    { b: 'hear', pr: 'heard', pp: 'heard' }, { b: 'hold', pr: 'held', pp: 'held' }, { b: 'keep', pr: 'kept', pp: 'kept' },
    { b: 'sleep', pr: 'slept', pp: 'slept' }, { b: 'feel', pr: 'felt', pp: 'felt' }, { b: 'leave', pr: 'left', pp: 'left' },
    { b: 'lose', pr: 'lost', pp: 'lost' }, { b: 'meet', pr: 'met', pp: 'met' }, { b: 'sit', pr: 'sat', pp: 'sat' },
    { b: 'stand', pr: 'stood', pp: 'stood' }, { b: 'understand', pr: 'understood', pp: 'understood' }, { b: 'win', pr: 'won', pp: 'won' },
    { b: 'send', pr: 'sent', pp: 'sent' }, { b: 'spend', pr: 'spent', pp: 'spent' }, { b: 'build', pr: 'built', pp: 'built' },
    { b: 'get', pr: 'got', pp: 'got', altPp: ['gotten'] },
    { b: 'be', pr: 'was', pp: 'been', altPr: ['were', 'was/were', 'was / were'] }, { b: 'begin', pr: 'began', pp: 'begun' },
    { b: 'break', pr: 'broke', pp: 'broken' }, { b: 'choose', pr: 'chose', pp: 'chosen' }, { b: 'do', pr: 'did', pp: 'done' },
    { b: 'draw', pr: 'drew', pp: 'drawn' }, { b: 'drink', pr: 'drank', pp: 'drunk' }, { b: 'drive', pr: 'drove', pp: 'driven' },
    { b: 'eat', pr: 'ate', pp: 'eaten' }, { b: 'fall', pr: 'fell', pp: 'fallen' }, { b: 'fly', pr: 'flew', pp: 'flown' },
    { b: 'forget', pr: 'forgot', pp: 'forgotten' }, { b: 'give', pr: 'gave', pp: 'given' }, { b: 'go', pr: 'went', pp: 'gone' },
    { b: 'grow', pr: 'grew', pp: 'grown' }, { b: 'know', pr: 'knew', pp: 'known' }, { b: 'ride', pr: 'rode', pp: 'ridden' },
    { b: 'ring', pr: 'rang', pp: 'rung' }, { b: 'see', pr: 'saw', pp: 'seen' }, { b: 'sing', pr: 'sang', pp: 'sung' },
    { b: 'speak', pr: 'spoke', pp: 'spoken' }, { b: 'swim', pr: 'swam', pp: 'swum' }, { b: 'take', pr: 'took', pp: 'taken' },
    { b: 'throw', pr: 'threw', pp: 'thrown' }, { b: 'wake', pr: 'woke', pp: 'woken' }, { b: 'wear', pr: 'wore', pp: 'worn' },
    { b: 'write', pr: 'wrote', pp: 'written' }
  ];
  var ROUND = 12; // verbes par session

  var st = { queue: [], idx: 0, score: 0, total: 0, streak: 0, best: 0 };
  function norm(s) { return (s || '').toLowerCase().trim().replace(/\s+/g, ' '); }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
  function shuffle(a) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function mount() { return document.getElementById('irr-mount'); }

  function start() {
    var m = mount(); if (!m) return;
    var sb = document.getElementById('irr-start'); if (sb) sb.style.display = 'none'; // cache le bouton « Commencer » pendant la partie
    st.queue = shuffle(VERBS.slice()).slice(0, ROUND); st.idx = 0; st.score = 0; st.total = 0; st.streak = 0; render();
  }

  function render() {
    var m = mount(); if (!m) return;
    if (st.idx >= st.queue.length) { return done(); }
    var v = st.queue[st.idx];
    m.innerHTML =
      '<div class="irr-prog">Verbe ' + (st.idx + 1) + ' / ' + st.queue.length + '</div>' +
      '<div class="irr-q"><b>' + esc(v.b) + '</b> <button type="button" class="irr-say" data-say="' + esc(v.b) + '" title="Écouter">🔊</button></div>' +
      '<div class="irr-row"><label for="irr-pr">Prétérit</label><input id="irr-pr" type="text" autocomplete="off" autocapitalize="none" autocorrect="off" spellcheck="false"></div>' +
      '<div class="irr-row"><label for="irr-pp">Participe</label><input id="irr-pp" type="text" autocomplete="off" autocapitalize="none" autocorrect="off" spellcheck="false"></div>' +
      '<button type="button" class="irr-check" id="irr-check">Vérifier</button>' +
      '<div id="irr-fb" class="irr-fb"></div>' +
      '<div class="irr-score">Score : <b>' + st.score + ' / ' + st.total + '</b> · série ' + st.streak + ' 🔥</div>';
    var pr = document.getElementById('irr-pr'); if (pr) pr.focus();
  }

  function check() {
    var v = st.queue[st.idx]; if (!v) return;
    var ipr = document.getElementById('irr-pr'), ipp = document.getElementById('irr-pp');
    if (!ipr || !ipp) return;
    var pr = norm(ipr.value), pp = norm(ipp.value);
    var okPr = pr === norm(v.pr) || (v.altPr && v.altPr.map(norm).indexOf(pr) >= 0);
    var okPp = pp === norm(v.pp) || (v.altPp && v.altPp.map(norm).indexOf(pp) >= 0);
    st.total++;
    var fb = document.getElementById('irr-fb');
    if (okPr && okPp) {
      st.score++; st.streak++; if (st.streak > st.best) st.best = st.streak;
      fb.className = 'irr-fb ok'; fb.innerHTML = '✅ Bravo ! <b>' + esc(v.b) + ' → ' + esc(v.pr) + ' → ' + esc(v.pp) + '</b>';
    } else {
      st.streak = 0; fb.className = 'irr-fb no';
      fb.innerHTML = '❌ La bonne réponse : <b>' + esc(v.b) + ' → ' + esc(v.pr) + ' → ' + esc(v.pp) + '</b>';
    }
    ipr.disabled = ipp.disabled = true;
    var ck = document.getElementById('irr-check'); if (ck) ck.style.display = 'none';
    fb.innerHTML += ' <button type="button" class="irr-next" id="irr-next">Suivant →</button>';
    var sc = m_scoreEl(); if (sc) sc.innerHTML = 'Score : <b>' + st.score + ' / ' + st.total + '</b> · série ' + st.streak + ' 🔥';
    var nx = document.getElementById('irr-next'); if (nx) nx.focus();
  }
  function m_scoreEl() { var m = mount(); return m ? m.querySelector('.irr-score') : null; }

  function next() { st.idx++; render(); }

  function done() {
    var m = mount(); if (!m) return;
    var pct = st.total ? Math.round(st.score / st.total * 100) : 0;
    var msg = pct >= 80 ? '🏆 Excellent !' : (pct >= 50 ? '👍 Pas mal, continue !' : '💪 Encore un peu d\'entraînement !');
    m.innerHTML = '<div class="irr-done">🎉 Terminé — <b>' + st.score + ' / ' + st.total + '</b> (' + pct + '%)<br>' + msg +
      ' · meilleure série : ' + st.best + ' 🔥</div>' +
      '<button type="button" class="irr-check" id="irr-restart">↻ Recommencer</button>';
  }

  // Délégation (un seul écouteur, robuste au re-render)
  document.addEventListener('click', function (e) {
    if (e.target.closest('#irr-start, #irr-restart')) { e.preventDefault(); start(); }
    else if (e.target.closest('#irr-check')) { e.preventDefault(); check(); }
    else if (e.target.closest('#irr-next')) { e.preventDefault(); next(); }
  });
  document.addEventListener('keydown', function (e) {
    var pr = document.getElementById('irr-pr'), pp = document.getElementById('irr-pp');
    // Correction affichée → Entrée = verbe suivant
    if (e.key === 'Enter' && document.getElementById('irr-next')) { e.preventDefault(); next(); return; }
    // Champ Prétérit : Entrée ou ↓ descend vers Participe
    if (e.target === pr && (e.key === 'Enter' || e.key === 'ArrowDown')) { e.preventDefault(); if (pp) pp.focus(); return; }
    // Champ Participe : ↑ remonte au Prétérit, Entrée valide
    if (e.target === pp) {
      if (e.key === 'ArrowUp') { e.preventDefault(); if (pr) pr.focus(); return; }
      if (e.key === 'Enter') { e.preventDefault(); check(); return; }
    }
  });
})();
