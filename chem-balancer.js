/*! GR2 Study © 2026 Drackson — Tous droits réservés. */
/* Pondérateur d'équations INTERACTIF (chimie).
   L'élève règle les coefficients (− / +) ; le compteur d'atomes se met à jour
   en direct et indique quand l'équation est équilibrée (conservation de la matière).
   ⚠️ Toutes les équations viennent du CONTENU VALIDÉ du cours (synthèse, méthodes,
   exercices de subject-chimie.js). Le nombre d'atomes par molécule est fourni
   (simple comptage, pas de contenu inventé). Auto-montage sur .chem-bal. */
(function () {
  'use strict';

  // [formule affichée, atomes par molécule] ; sol = coefficients équilibrés (du cours)
  var EQS = [
    { r: [['H₂SO₄', { H: 2, S: 1, O: 4 }], ['NaOH', { Na: 1, O: 1, H: 1 }]],
      p: [['Na₂SO₄', { Na: 2, S: 1, O: 4 }], ['H₂O', { H: 2, O: 1 }]], sol: [1, 2, 1, 2] },
    { r: [['H₃PO₄', { H: 3, P: 1, O: 4 }], ['Mg', { Mg: 1 }]],
      p: [['Mg₃(PO₄)₂', { Mg: 3, P: 2, O: 8 }], ['H₂', { H: 2 }]], sol: [2, 3, 1, 3] },
    { r: [['H₂SO₄', { H: 2, S: 1, O: 4 }], ['Al(OH)₃', { Al: 1, O: 3, H: 3 }]],
      p: [['Al₂(SO₄)₃', { Al: 2, S: 3, O: 12 }], ['H₂O', { H: 2, O: 1 }]], sol: [3, 2, 1, 6] },
    { r: [['C₄H₁₀', { C: 4, H: 10 }], ['O₂', { O: 2 }]],
      p: [['CO₂', { C: 1, O: 2 }], ['H₂O', { H: 2, O: 1 }]], sol: [2, 13, 8, 10] },
    { r: [['C₈H₁₈', { C: 8, H: 18 }], ['O₂', { O: 2 }]],
      p: [['CO₂', { C: 1, O: 2 }], ['H₂O', { H: 2, O: 1 }]], sol: [2, 25, 16, 18] },
    { r: [['HNO₂', { H: 1, N: 1, O: 2 }], ['Fe₂O₃', { Fe: 2, O: 3 }]],
      p: [['Fe(NO₂)₃', { Fe: 1, N: 3, O: 6 }], ['H₂O', { H: 2, O: 1 }]], sol: [6, 1, 2, 3] },
    { r: [['HgO', { Hg: 1, O: 1 }]],
      p: [['Hg', { Hg: 1 }], ['O₂', { O: 2 }]], sol: [2, 2, 1] }
  ];
  var MAX = 20;

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]; }); }
  function each(list, fn) { Array.prototype.forEach.call(list, fn); }
  function gcd2(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = b; b = a % b; a = t; } return a || 1; }
  function gcdArr(arr) { return arr.reduce(function (g, v) { return gcd2(g, v); }, 0); }

  function elements(eq) {
    var seen = {}, out = [];
    eq.r.concat(eq.p).forEach(function (t) {
      Object.keys(t[1]).forEach(function (e) { if (!seen[e]) { seen[e] = 1; out.push(e); } });
    });
    return out;
  }
  function sideCount(terms, coefs, off, el) {
    var s = 0;
    for (var i = 0; i < terms.length; i++) s += (coefs[off + i] || 0) * (terms[i][1][el] || 0);
    return s;
  }

  function termHTML(term, idx) {
    return '<span class="cb-term">' +
      '<span class="cb-step">' +
        '<button type="button" class="cb-dec" data-i="' + idx + '" aria-label="Diminuer le coefficient">−</button>' +
        '<span class="cb-coef" data-i="' + idx + '">1</span>' +
        '<button type="button" class="cb-inc" data-i="' + idx + '" aria-label="Augmenter le coefficient">+</button>' +
      '</span>' +
      '<span class="cb-f">' + esc(term[0]) + '</span></span>';
  }

  function curIdx(host) { return parseInt(host.getAttribute('data-eq') || '0', 10) % EQS.length; }

  function render(host) {
    var eq = EQS[curIdx(host)];
    var n = eq.r.length + eq.p.length;
    host._coefs = []; for (var i = 0; i < n; i++) host._coefs.push(1);

    var rHTML = eq.r.map(function (t, i) { return termHTML(t, i); }).join('<span class="cb-op">+</span>');
    var pHTML = eq.p.map(function (t, j) { return termHTML(t, eq.r.length + j); }).join('<span class="cb-op">+</span>');
    var rows = elements(eq).map(function (e) {
      return '<tr data-el="' + e + '"><td class="cb-el">' + e + '</td><td class="cb-l">0</td><td class="cb-r">0</td><td class="cb-ok"></td></tr>';
    }).join('');

    host.innerHTML =
      '<div class="cb-head">⚖️ Pondère l\'équation <span class="cb-counter">' + (curIdx(host) + 1) + ' / ' + EQS.length + '</span></div>' +
      '<div class="cb-eq">' + rHTML + '<span class="cb-op">→</span>' + pHTML + '</div>' +
      '<div class="cb-hint">↔ glisse pour voir toute l\'équation</div>' +
      '<table class="cb-tally"><thead><tr><th>Atome</th><th>Réactifs</th><th>Produits</th><th aria-label="équilibré"></th></tr></thead><tbody>' + rows + '</tbody></table>' +
      '<div class="cb-status" role="status">Ajuste les coefficients avec − / + : le compteur d\'atomes se met à jour en direct.</div>' +
      '<div class="cb-controls">' +
        '<button type="button" class="cb-btn cb-reset">↻ Réinitialiser</button>' +
        '<button type="button" class="cb-btn cb-sol">👁️ Solution</button>' +
        '<button type="button" class="cb-btn cb-next">Équation suivante ▶</button>' +
      '</div>';
    update(host);
    // affiche l'indice de défilement uniquement si l'équation dépasse (ex. sur téléphone)
    var eqEl = host.querySelector('.cb-eq');
    if (eqEl) host.classList.toggle('cb-scrollable', eqEl.scrollWidth > eqEl.clientWidth + 2);
  }

  function update(host) {
    var eq = EQS[curIdx(host)], coefs = host._coefs;
    each(host.querySelectorAll('.cb-coef'), function (c) { c.textContent = coefs[parseInt(c.getAttribute('data-i'), 10)]; });
    var allOk = true;
    each(host.querySelectorAll('.cb-tally tbody tr'), function (tr) {
      var e = tr.getAttribute('data-el');
      var l = sideCount(eq.r, coefs, 0, e), r = sideCount(eq.p, coefs, eq.r.length, e);
      tr.querySelector('.cb-l').textContent = l;
      tr.querySelector('.cb-r').textContent = r;
      var ok = (l === r);
      tr.classList.toggle('ok', ok); tr.classList.toggle('bad', !ok);
      tr.querySelector('.cb-ok').textContent = ok ? '✓' : '✗';
      if (!ok) allOk = false;
    });
    host.classList.toggle('cb-solved', allOk);
    var st = host.querySelector('.cb-status');
    if (st) {
      if (!allOk) {
        st.textContent = 'Ajuste les coefficients avec − / + : chaque atome doit être égal des deux côtés.';
      } else {
        var g = gcdArr(coefs);
        st.textContent = (g > 1)
          ? '✅ Équilibré ! Astuce : tu peux encore simplifier — divise tous les coefficients par ' + g + ' pour la forme la plus simple.'
          : '✅ Parfait — équilibré et sous la forme la plus simple ! 🏆';
      }
    }
  }

  document.addEventListener('click', function (e) {
    var t = e.target;
    if (!t || !t.closest) return;
    var host = t.closest('.chem-bal'); if (!host) return;
    var step = t.closest('.cb-dec, .cb-inc');
    if (step) {
      var i = parseInt(step.getAttribute('data-i'), 10);
      var v = (host._coefs[i] || 1) + (step.classList.contains('cb-inc') ? 1 : -1);
      host._coefs[i] = Math.max(1, Math.min(MAX, v));
      update(host); return;
    }
    if (t.closest('.cb-reset')) { for (var k = 0; k < host._coefs.length; k++) host._coefs[k] = 1; update(host); return; }
    if (t.closest('.cb-sol')) {
      host._coefs = EQS[curIdx(host)].sol.slice(); update(host);
      var s = host.querySelector('.cb-status'); if (s) s.textContent = '👁️ Solution affichée — observe comment chaque atome s\'équilibre.';
      return;
    }
    if (t.closest('.cb-next')) { host.setAttribute('data-eq', (curIdx(host) + 1) % EQS.length); render(host); return; }
  });

  function tryInit() {
    each(document.querySelectorAll('.chem-bal:not([data-built])'), function (host) {
      host.setAttribute('data-built', '1');
      if (!host.hasAttribute('data-eq')) host.setAttribute('data-eq', '0');
      render(host);
    });
  }
  if (document.readyState !== 'loading') tryInit();
  document.addEventListener('DOMContentLoaded', tryInit);
  try { new MutationObserver(tryInit).observe(document.body, { childList: true, subtree: true }); } catch (e) {}
})();
