/* Générateur d'exercices aléatoires — Maths GR2
   7 types (distance, milieu, composantes+norme, cercle canonique/développé, pente,
   sommet parabole). Valeurs aléatoires à résultats « propres » (entiers / triplets
   de Pythagore). Correction pas-à-pas révélée à la demande. */
(function () {
  'use strict';

  function ri(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
  function rinz(min, max) { var v; do { v = ri(min, max); } while (v === 0); return v; }
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
  function sign() { return Math.random() < 0.5 ? -1 : 1; }
  // "(x - h)" en gérant les signes ; h=0 → "x"
  function fac(v, h) { if (h === 0) return v; return '(' + v + (h > 0 ? ' - ' + h : ' + ' + (-h)) + ')'; }
  // "+ ax" / "- |a|x" pour une somme ; coef 0 omis géré par l'appelant
  function term(coef, sym) {
    if (coef === 0) return '';
    var c = Math.abs(coef) === 1 && sym ? '' : Math.abs(coef);
    return (coef > 0 ? ' + ' : ' - ') + c + sym;
  }
  var TRIPLES = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17], [9, 12, 15], [7, 24, 25], [20, 21, 29], [12, 16, 20]];

  var GEN = {
    distance: function () {
      var t = pick(TRIPLES), dx = t[0] * sign(), dy = t[1] * sign(), h = t[2];
      var ax = ri(-6, 6), ay = ri(-6, 6), bx = ax + dx, by = ay + dy;
      return {
        chapter: 'cercle',
        title: 'Distance entre deux points',
        statement: 'Calcule la distance \\(AB\\) avec \\(A(' + ax + '\\,;\\,' + ay + ')\\) et \\(B(' + bx + '\\,;\\,' + by + ')\\).',
        answer: '\\(AB = ' + h + '\\)',
        steps: [
          'Formule : \\(AB=\\sqrt{(x_B-x_A)^2+(y_B-y_A)^2}\\)',
          'On remplace : \\(AB=\\sqrt{(' + bx + '-(' + ax + '))^2+(' + by + '-(' + ay + '))^2}\\)',
          'Différences : \\(AB=\\sqrt{(' + dx + ')^2+(' + dy + ')^2}=\\sqrt{' + (dx * dx) + '+' + (dy * dy) + '}\\)',
          'Somme : \\(AB=\\sqrt{' + (dx * dx + dy * dy) + '}=' + h + '\\)'
        ]
      };
    },
    milieu: function () {
      var mx = ri(-6, 6), my = ri(-6, 6), hx = rinz(-5, 5), hy = rinz(-5, 5);
      var ax = mx - hx, ay = my - hy, bx = mx + hx, by = my + hy;
      return {
        chapter: 'vecteur',
        title: 'Milieu d’un segment',
        statement: 'Trouve le milieu \\(M\\) de \\([AB]\\) avec \\(A(' + ax + '\\,;\\,' + ay + ')\\) et \\(B(' + bx + '\\,;\\,' + by + ')\\).',
        answer: '\\(M(' + mx + '\\,;\\,' + my + ')\\)',
        steps: [
          'Formule : \\(M\\left(\\dfrac{x_A+x_B}{2}\\,;\\,\\dfrac{y_A+y_B}{2}\\right)\\)',
          'Abscisse : \\(\\dfrac{' + ax + '+' + bx + '}{2}=\\dfrac{' + (ax + bx) + '}{2}=' + mx + '\\)',
          'Ordonnée : \\(\\dfrac{' + ay + '+' + by + '}{2}=\\dfrac{' + (ay + by) + '}{2}=' + my + '\\)'
        ]
      };
    },
    composantes: function () {
      var t = pick(TRIPLES), dx = t[0] * sign(), dy = t[1] * sign(), h = t[2];
      var ax = ri(-6, 6), ay = ri(-6, 6), bx = ax + dx, by = ay + dy;
      return {
        chapter: 'vecteur',
        title: 'Composantes et norme',
        statement: 'Donne les composantes de \\(\\vec{AB}\\) et sa norme, avec \\(A(' + ax + '\\,;\\,' + ay + ')\\) et \\(B(' + bx + '\\,;\\,' + by + ')\\).',
        answer: '\\(\\vec{AB}=(' + dx + '\\,;\\,' + dy + ')\\) , \\(\\|\\vec{AB}\\|=' + h + '\\)',
        steps: [
          'Composantes : \\(\\vec{AB}=(x_B-x_A\\,;\\,y_B-y_A)=(' + dx + '\\,;\\,' + dy + ')\\)',
          'Norme : \\(\\|\\vec{AB}\\|=\\sqrt{(' + dx + ')^2+(' + dy + ')^2}=\\sqrt{' + (dx * dx + dy * dy) + '}=' + h + '\\)'
        ]
      };
    },
    cercle_canonique: function () {
      var h = ri(-6, 6), k = ri(-6, 6), R = ri(2, 9);
      var eq = fac('x', h) + '^2 + ' + fac('y', k) + '^2 = ' + (R * R);
      return {
        chapter: 'cercle',
        title: 'Centre et rayon (forme canonique)',
        statement: 'Donne le centre et le rayon du cercle \\(' + eq + '\\).',
        answer: '\\(C(' + h + '\\,;\\,' + k + ')\\) , \\(R=' + R + '\\)',
        steps: [
          'Forme canonique : \\((x-x_0)^2+(y-y_0)^2=R^2\\)',
          'Centre : on lit l’opposé des nombres dans les parenthèses → \\(C(' + h + '\\,;\\,' + k + ')\\)',
          'Rayon : \\(R^2=' + (R * R) + '\\) donc \\(R=\\sqrt{' + (R * R) + '}=' + R + '\\)'
        ]
      };
    },
    cercle_developpe: function () {
      var h = ri(-5, 5), k = ri(-5, 5), R = ri(2, 7);
      var a = -2 * h, b = -2 * k, c = h * h + k * k - R * R;
      var eq = 'x^2 + y^2' + term(a, 'x') + term(b, 'y') + term(c, '') + ' = 0';
      return {
        chapter: 'cercle',
        title: 'Centre et rayon (forme développée)',
        statement: 'Trouve le centre et le rayon du cercle \\(' + eq + '\\).',
        answer: '\\(C(' + h + '\\,;\\,' + k + ')\\) , \\(R=' + R + '\\)',
        steps: [
          'On identifie \\(a=' + a + '\\), \\(b=' + b + '\\), \\(c=' + c + '\\).',
          'Centre : \\(C\\left(-\\dfrac{a}{2}\\,;\\,-\\dfrac{b}{2}\\right)=C(' + h + '\\,;\\,' + k + ')\\)',
          'Rayon : \\(R=\\dfrac{\\sqrt{a^2+b^2-4c}}{2}=\\dfrac{\\sqrt{' + (a * a + b * b - 4 * c) + '}}{2}=' + R + '\\)'
        ]
      };
    },
    pente: function () {
      var m = rinz(-4, 4), ax = ri(-6, 4), ay = ri(-6, 6), dx = ri(1, 4);
      var bx = ax + dx, by = ay + m * dx;
      return {
        chapter: 'droite',
        title: 'Pente d’une droite',
        statement: 'Calcule la pente de la droite passant par \\(A(' + ax + '\\,;\\,' + ay + ')\\) et \\(B(' + bx + '\\,;\\,' + by + ')\\).',
        answer: '\\(m = ' + m + '\\)',
        steps: [
          'Formule : \\(m=\\dfrac{y_B-y_A}{x_B-x_A}\\)',
          'On remplace : \\(m=\\dfrac{' + by + '-(' + ay + ')}{' + bx + '-(' + ax + ')}=\\dfrac{' + (by - ay) + '}{' + (bx - ax) + '}\\)',
          'Simplification : \\(m=' + m + '\\)'
        ]
      };
    },
    sommet_parabole: function () {
      var A = rinz(-3, 3), al = ri(-6, 6), be = ri(-6, 6);
      var Astr = A === 1 ? '' : (A === -1 ? '-' : A);
      var eq = 'y = ' + Astr + fac('x', al) + '^2' + term(be, '');
      return {
        chapter: 'parabole',
        title: 'Sommet d’une parabole',
        statement: 'Donne le sommet et le sens d’ouverture de \\(' + eq + '\\).',
        answer: '\\(S(' + al + '\\,;\\,' + be + ')\\) , ouverture vers le ' + (A > 0 ? 'haut' : 'bas'),
        steps: [
          'Forme canonique : \\(y=A(x-\\alpha)^2+\\beta\\) → sommet \\(S(\\alpha\\,;\\,\\beta)\\).',
          'On lit : \\(\\alpha=' + al + '\\), \\(\\beta=' + be + '\\) donc \\(S(' + al + '\\,;\\,' + be + ')\\).',
          'Signe de \\(A=' + A + '\\) : ' + (A > 0 ? '\\(A>0\\) → ouverture vers le haut.' : '\\(A<0\\) → ouverture vers le bas.')
        ]
      };
    }
  };

  var TYPES = [
    { id: 'distance', label: '📏 Distance' },
    { id: 'milieu', label: '📍 Milieu' },
    { id: 'composantes', label: '➡️ Composantes' },
    { id: 'cercle_canonique', label: '🔵 Cercle (canonique)' },
    { id: 'cercle_developpe', label: '🔵 Cercle (développé)' },
    { id: 'pente', label: '📈 Pente' },
    { id: 'sommet_parabole', label: '🟢 Sommet parabole' }
  ];

  var currentType = 'random';
  var current = null;

  window.genSetType = function (id) {
    currentType = id;
    Array.prototype.forEach.call(document.querySelectorAll('.gen-chip'), function (c) {
      c.classList.toggle('on', c.dataset.t === id);
    });
    window.genNew();
  };

  window.genNew = function () {
    var out = document.getElementById('gen-output');
    if (!out) return;
    var typeId = currentType === 'random' ? pick(TYPES).id : currentType;
    current = GEN[typeId]();
    out.innerHTML =
      '<div class="gen-card">' +
        '<div class="gen-tag">' + (current.title) + '</div>' +
        '<div class="gen-statement">' + current.statement + '</div>' +
        '<button type="button" class="gen-solve" onclick="genSolution()">👁️ Afficher la solution</button>' +
        '<div id="gen-solution" class="gen-solution" hidden></div>' +
      '</div>';
    if (typeof safeMathJax === 'function') safeMathJax([out]);
  };

  window.genSolution = function () {
    if (!current) return;
    var box = document.getElementById('gen-solution');
    if (!box) return;
    box.hidden = false;
    box.innerHTML =
      current.steps.map(function (s, i) {
        return '<div class="gen-step"><span class="gen-stepn">' + (i + 1) + '</span><span>' + s + '</span></div>';
      }).join('') +
      '<div class="gen-answer">✅ ' + current.answer + '</div>';
    var btn = document.querySelector('.gen-solve');
    if (btn) btn.style.display = 'none';
    if (typeof safeMathJax === 'function') safeMathJax([box]);
  };

  function mountChips() {
    var bar = document.getElementById('gen-chips');
    if (!bar || bar.dataset.ready) return;
    bar.dataset.ready = '1';
    bar.innerHTML =
      '<button type="button" class="gen-chip on" data-t="random" onclick="genSetType(\'random\')">🎲 Aléatoire</button>' +
      TYPES.map(function (t) {
        return '<button type="button" class="gen-chip" data-t="' + t.id + '" onclick="genSetType(\'' + t.id + '\')">' + t.label + '</button>';
      }).join('');
  }

  function init() {
    if (!document.getElementById('gen-output')) return;
    mountChips();
    if (!current) window.genNew();
  }
  // Les sections sont injectées au DOMContentLoaded (content.js) ; on s'enregistre après.
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { setTimeout(init, 300); });
  else setTimeout(init, 300);
})();
