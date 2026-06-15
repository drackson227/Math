/*! GR2 Study © 2026 Drackson — Tous droits réservés. Copie/réutilisation interdites sans autorisation (Instagram @drackson227). */
/* Moteur de mini-jeux de reconnaissance — RÉUTILISABLE (2 à 4 choix).
   Chaque matière pose, dans sa section « Exercices » :
     <button type="button" class="nav-btn" data-mg="ID">▶ Commencer le jeu</button>
     <div id="ID" class="mg-mount"></div>
   et le jeu correspondant est défini ci-dessous dans GAMES["ID"].
   UX : correction immédiate, score, série 🔥, clavier (1-4 = choix, Entrée = suivant).
   ⚠️ Contenu 100% tiré du contenu DÉJÀ VALIDÉ de chaque matière (jamais inventé) —
   chaque jeu cite sa source (tableau/section du cours). Style : classes .mg-* (CSS dédié,
   isolé du mini-jeu bio .bmm-*). */
(function () {
  'use strict';

  var GAMES = {
    /* HISTOIRE — d'après le tableau validé « Catholiques vs Protestants » (subject-histoire, synthèse §4). */
    'hist-mm': {
      title: 'Catholique ou Protestant ?',
      cats: [{ c: 'cath', label: '⛪ Catholique' }, { c: 'prot', label: '📖 Protestant' }],
      round: 10,
      items: [
        { t: "Le chef est le pape, à Rome.", a: 'cath' },
        { t: "On est sauvé par la foi ET les bonnes œuvres (sacrements).", a: 'cath' },
        { t: "La Bible est lue et interprétée par le clergé, en latin.", a: 'cath' },
        { t: "Les indulgences (payer pour le pardon) sont acceptées.", a: 'cath' },
        { t: "Les prêtres et les moines doivent rester célibataires.", a: 'cath' },
        { t: "Il y a 7 sacrements.", a: 'cath' },
        { t: "Le Concile de Trente et Charles Quint en sont des figures.", a: 'cath' },
        { t: "Pas de pape : la Bible est la seule autorité.", a: 'prot', why: "C'est l'idée centrale de Luther." },
        { t: "On est sauvé par la foi seule (ni argent, ni œuvres).", a: 'prot' },
        { t: "La Bible est traduite en langue courante et lue par tous.", a: 'prot', why: "Diffusée grâce à l'imprimerie." },
        { t: "Les indulgences sont rejetées.", a: 'prot', why: "C'est précisément ce que Luther dénonce (1517)." },
        { t: "Les pasteurs peuvent se marier.", a: 'prot' },
        { t: "Il y a surtout 2 sacrements (baptême, communion).", a: 'prot' },
        { t: "Luther (1517) et Calvin (Genève) en sont les figures.", a: 'prot' }
      ]
    },

    /* CHIMIE — d'après les tableaux validés « combustions » et « autres réactions » (subject-chimie, synthèse). */
    'chi-mm': {
      title: 'Quels produits se forment ?',
      cats: [
        { c: 'se', label: 'sel + eau' },
        { c: 'sh', label: 'sel + H₂' },
        { c: 'cc', label: 'CO₂ + H₂O' },
        { c: 'ci', label: 'CO + H₂O' }
      ],
      round: 10,
      items: [
        { t: "Un acide + un hydroxyde (ex. H₂SO₄ + NaOH).", a: 'se', why: "acide + hydroxyde → sel + eau." },
        { t: "Un acide + un oxyde (ex. HNO₂ + Fe₂O₃).", a: 'se', why: "acide + oxyde → sel + eau." },
        { t: "Un acide + un métal (ex. H₃PO₄ + Mg).", a: 'sh', why: "acide + métal → sel + dihydrogène (des bulles de H₂)." },
        { t: "Un hydrocarbure brûlé avec assez d'O₂ (combustion complète).", a: 'cc' },
        { t: "Un hydrocarbure brûlé quand l'O₂ manque (combustion incomplète).", a: 'ci', why: "manque d'O₂ → CO, le « tueur silencieux »." },
        { t: "H₂SO₄ + 2 NaOH → Na₂SO₄ + … ?", a: 'se' },
        { t: "2 H₃PO₄ + 3 Mg → Mg₃(PO₄)₂ + … ?", a: 'sh' },
        { t: "C₄H₁₀ qui brûle complètement.", a: 'cc' },
        { t: "La combustion qui forme du CO (monoxyde, mortel).", a: 'ci' },
        { t: "Une réaction qui dégage des bulles de dihydrogène.", a: 'sh' },
        { t: "Une combustion complète.", a: 'cc' },
        { t: "Une combustion incomplète.", a: 'ci' }
      ]
    }
  };

  /* ---------- moteur générique ---------- */
  var states = {};

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
  function shuffle(a) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function mountOf(id) { return document.getElementById(id); }
  function labelOf(g, c) { for (var i = 0; i < g.cats.length; i++) { if (g.cats[i].c === c) return g.cats[i].label; } return c; }
  function typing() { var a = document.activeElement; return !!(a && (a.tagName === 'INPUT' || a.tagName === 'TEXTAREA' || a.isContentEditable)); }

  function start(id) {
    var g = GAMES[id], m = mountOf(id); if (!g || !m) return;
    var btn = document.querySelector('[data-mg="' + id + '"]'); if (btn) btn.style.display = 'none';
    var n = Math.min(g.round || 10, g.items.length);
    states[id] = { queue: shuffle(g.items.slice()).slice(0, n), idx: 0, score: 0, total: 0, streak: 0, best: 0, answered: false };
    render(id);
  }

  function render(id) {
    var g = GAMES[id], m = mountOf(id), st = states[id]; if (!g || !m || !st) return;
    if (st.idx >= st.queue.length) return done(id);
    var v = st.queue[st.idx]; st.answered = false;
    var choices = g.cats.map(function (c) { return '<button type="button" class="mg-choice" data-c="' + c.c + '">' + c.label + '</button>'; }).join('');
    m.innerHTML =
      '<div class="mg-prog">Question ' + (st.idx + 1) + ' / ' + st.queue.length + '</div>' +
      '<div class="mg-q">' + esc(v.t) + '</div>' +
      '<div class="mg-choices">' + choices + '</div>' +
      '<div class="mg-fb" data-fb></div>' +
      '<div class="mg-score">Score : <b>' + st.score + ' / ' + st.total + '</b> · série ' + st.streak + ' 🔥</div>';
  }

  function answer(id, choice) {
    var g = GAMES[id], m = mountOf(id), st = states[id]; if (!g || !m || !st || st.answered) return;
    var v = st.queue[st.idx]; if (!v) return;
    st.answered = true; st.total++;
    var fb = m.querySelector('[data-fb]'); if (!fb) return;
    if (choice === v.a) {
      st.score++; st.streak++; if (st.streak > st.best) st.best = st.streak;
      fb.className = 'mg-fb ok'; fb.innerHTML = '✅ Oui — ' + labelOf(g, v.a) + '.';
    } else {
      st.streak = 0;
      fb.className = 'mg-fb no'; fb.innerHTML = '❌ Non — c\'était ' + labelOf(g, v.a) + '.';
    }
    [].forEach.call(m.querySelectorAll('.mg-choice'), function (b) {
      b.disabled = true; var bc = b.getAttribute('data-c');
      if (bc === v.a) b.classList.add('right'); else if (bc === choice) b.classList.add('wrong');
    });
    if (v.why) fb.innerHTML += ' <span class="mg-why">' + esc(v.why) + '</span>';
    fb.innerHTML += ' <button type="button" class="mg-next" data-next="' + id + '">Suivant →</button>';
    var sc = m.querySelector('.mg-score'); if (sc) sc.innerHTML = 'Score : <b>' + st.score + ' / ' + st.total + '</b> · série ' + st.streak + ' 🔥';
    var nx = fb.querySelector('.mg-next'); if (nx) nx.focus();
  }

  function next(id) { var st = states[id]; if (!st) return; st.idx++; render(id); }

  function done(id) {
    var m = mountOf(id), st = states[id]; if (!m || !st) return;
    var pct = st.total ? Math.round(st.score / st.total * 100) : 0;
    var msg = pct >= 80 ? '🏆 Excellent !' : (pct >= 50 ? '👍 Pas mal, continue !' : '💪 Encore un peu d\'entraînement !');
    m.innerHTML = '<div class="mg-done">🎉 Terminé — <b>' + st.score + ' / ' + st.total + '</b> (' + pct + '%)<br>' + msg +
      ' · meilleure série : ' + st.best + ' 🔥</div>' +
      '<button type="button" class="mg-restart" data-mg="' + id + '">↻ Recommencer</button>';
  }

  /* ---------- délégation (souris + clavier) ---------- */
  document.addEventListener('click', function (e) {
    var s = e.target.closest('[data-mg]');
    if (s && GAMES[s.getAttribute('data-mg')]) { e.preventDefault(); start(s.getAttribute('data-mg')); return; }
    var c = e.target.closest('.mg-choice');
    if (c) { if (c.disabled) return; var mc = c.closest('.mg-mount'); if (!mc) return; e.preventDefault(); answer(mc.id, c.getAttribute('data-c')); return; }
    var nx = e.target.closest('.mg-next');
    if (nx) { e.preventDefault(); next(nx.getAttribute('data-next')); return; }
  });

  document.addEventListener('keydown', function (e) {
    if (typing()) return;
    if (e.key === 'Enter') {
      var nx = document.querySelector('.mg-next');
      if (nx) { e.preventDefault(); next(nx.getAttribute('data-next')); }
      return;
    }
    if (/^[1-4]$/.test(e.key)) {
      var btns = document.querySelectorAll('.mg-choice:not([disabled])');
      if (!btns.length) return;
      var i = parseInt(e.key, 10) - 1, b = btns[i];
      if (b) { var mc = b.closest('.mg-mount'); if (mc) { e.preventDefault(); answer(mc.id, b.getAttribute('data-c')); } }
    }
  });
})();
