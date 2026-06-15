/*! GR2 Study © 2026 Drackson — Tous droits réservés. Copie/réutilisation interdites sans autorisation (Instagram @drackson227). */
/* Mini-jeu « Mitose ou Méiose ? » (biologie).
   On montre une caractéristique, l'élève choisit la bonne division → correction + score.
   Se greffe sur la section « Exercices » de la bio via les id #bmm-start / #bio-mm.
   Affirmations 100% tirées du contenu déjà validé (tableau comparatif, méthodes, fiches). */
(function () {
  'use strict';

  var ITEMS = [
    { t: 'Donne 2 cellules filles', a: 'mitose' },
    { t: 'Les cellules filles sont identiques à la cellule mère', a: 'mitose' },
    { t: 'Le nombre de chromosomes ne change pas (2n → 2n)', a: 'mitose' },
    { t: 'Sert à la croissance et à la réparation des tissus', a: 'mitose' },
    { t: 'Une seule division', a: 'mitose' },
    { t: 'À l\'anaphase, on sépare les chromatides-sœurs', a: 'mitose' },
    { t: 'Produit une copie conforme de la cellule', a: 'mitose' },
    { t: 'Donne 4 cellules filles', a: 'meiose' },
    { t: 'Fabrique les gamètes (spermatozoïdes, ovules)', a: 'meiose' },
    { t: 'Réduit le nombre de chromosomes de moitié (2n → n)', a: 'meiose' },
    { t: 'Les cellules filles sont toutes différentes (uniques)', a: 'meiose' },
    { t: 'Deux divisions successives', a: 'meiose' },
    { t: 'À la 1ʳᵉ division, on sépare les chromosomes homologues', a: 'meiose' },
    { t: 'Grande source de variabilité (brassage)', a: 'meiose' },
    { t: 'C\'est une division réductionnelle', a: 'meiose' }
  ];
  var ROUND = 10;

  var st = { queue: [], idx: 0, score: 0, total: 0, streak: 0, best: 0, answered: false };
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
  function shuffle(a) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function mount() { return document.getElementById('bio-mm'); }
  function scoreEl() { var m = mount(); return m ? m.querySelector('.bmm-score') : null; }

  function start() {
    var m = mount(); if (!m) return;
    var b = document.getElementById('bmm-start'); if (b) b.style.display = 'none';
    st.queue = shuffle(ITEMS.slice()).slice(0, ROUND); st.idx = 0; st.score = 0; st.total = 0; st.streak = 0; render();
  }

  function render() {
    var m = mount(); if (!m) return;
    if (st.idx >= st.queue.length) return done();
    var v = st.queue[st.idx]; st.answered = false;
    m.innerHTML =
      '<div class="bmm-prog">Affirmation ' + (st.idx + 1) + ' / ' + st.queue.length + '</div>' +
      '<div class="bmm-q">' + esc(v.t) + '</div>' +
      '<div class="bmm-choices">' +
        '<button type="button" class="bmm-choice" data-c="mitose">🔵 Mitose</button>' +
        '<button type="button" class="bmm-choice" data-c="meiose">🟣 Méiose</button>' +
      '</div>' +
      '<div id="bmm-fb" class="bmm-fb"></div>' +
      '<div class="bmm-score">Score : <b>' + st.score + ' / ' + st.total + '</b> · série ' + st.streak + ' 🔥</div>';
  }

  function answer(choice) {
    if (st.answered) return;
    var v = st.queue[st.idx]; if (!v) return;
    st.answered = true; st.total++;
    var label = v.a === 'mitose' ? 'Mitose' : 'Méiose';
    var fb = document.getElementById('bmm-fb');
    if (choice === v.a) {
      st.score++; st.streak++; if (st.streak > st.best) st.best = st.streak;
      fb.className = 'bmm-fb ok'; fb.innerHTML = '✅ Oui, c\'est la <b>' + label + '</b>.';
    } else {
      st.streak = 0; fb.className = 'bmm-fb no'; fb.innerHTML = '❌ Non — c\'est la <b>' + label + '</b>.';
    }
    [].forEach.call(document.querySelectorAll('.bmm-choice'), function (b) {
      b.disabled = true;
      if (b.getAttribute('data-c') === v.a) b.classList.add('right');
      else if (b.getAttribute('data-c') === choice) b.classList.add('wrong');
    });
    fb.innerHTML += ' <button type="button" class="bmm-next" id="bmm-next">Suivant →</button>';
    var sc = scoreEl(); if (sc) sc.innerHTML = 'Score : <b>' + st.score + ' / ' + st.total + '</b> · série ' + st.streak + ' 🔥';
    var nx = document.getElementById('bmm-next'); if (nx) nx.focus();
  }

  function next() { st.idx++; render(); }

  function done() {
    var m = mount(); if (!m) return;
    var pct = st.total ? Math.round(st.score / st.total * 100) : 0;
    var msg = pct >= 80 ? '🏆 Excellent !' : (pct >= 50 ? '👍 Pas mal, continue !' : '💪 Encore un peu d\'entraînement !');
    m.innerHTML = '<div class="bmm-done">🎉 Terminé — <b>' + st.score + ' / ' + st.total + '</b> (' + pct + '%)<br>' + msg +
      ' · meilleure série : ' + st.best + ' 🔥</div>' +
      '<button type="button" class="bmm-restart" id="bmm-restart">↻ Recommencer</button>';
  }

  document.addEventListener('click', function (e) {
    if (e.target.closest('#bmm-start, #bmm-restart')) { e.preventDefault(); start(); }
    else if (e.target.closest('.bmm-choice')) { var b = e.target.closest('.bmm-choice'); if (b.disabled) return; e.preventDefault(); answer(b.getAttribute('data-c')); }
    else if (e.target.closest('#bmm-next')) { e.preventDefault(); next(); }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && document.getElementById('bmm-next')) { e.preventDefault(); next(); }
  });
})();
