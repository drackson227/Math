/*! GR2 Study © 2026 Drackson — Tous droits réservés. Copie/réutilisation interdites sans autorisation (Instagram @drackson227). */
/* Bio — visuels ANIMÉS + interactif (mitose, méiose, monohybridisme).
   Contenu 100% basé sur le cours déjà validé (étapes PMAT, méiose 2n→n, Punnett Aa×Aa → 3:1).
   - Lecteurs animés mitose & méiose (chromosomes qui bougent, étape par étape, lecture auto).
   - Simulateur de croisement de Punnett (choisis les parents → grille animée + rapport).
   Se monte tout seul là où il trouve les conteneurs (#bio-mito-anim, #bio-meio-anim, #bio-cross). */
(function () {
  'use strict';

  /* ---------- helpers SVG ---------- */
  function cell(cx, cy, r) { return '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="#eef3f9" stroke="#1f2937" stroke-width="2"/>'; }
  function nuc(cx, cy, r) { return '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="none" stroke="#94a3b8" stroke-width="1.4" stroke-dasharray="4 4"/>'; }
  function lbl(x, y, t, s) { return '<text x="' + x + '" y="' + y + '" text-anchor="middle" font-family="inherit" font-size="' + (s || 13) + '" font-weight="800" fill="#1f2937">' + t + '</text>'; }
  function spindle(topY, botY, midY) {
    topY = topY || 48; botY = botY || 252; midY = midY || 150;
    var s = '<circle cx="170" cy="' + topY + '" r="3" fill="#475569"/><circle cx="170" cy="' + botY + '" r="3" fill="#475569"/>';
    [midY - 34, midY - 10, midY + 14, midY + 38].forEach(function (y) {
      s += '<line x1="170" y1="' + topY + '" x2="148" y2="' + y + '" stroke="#cbd5e1" stroke-width="1"/>';
      s += '<line x1="170" y1="' + botY + '" x2="192" y2="' + y + '" stroke="#cbd5e1" stroke-width="1"/>';
    });
    return s;
  }
  function chromPath(side) { return side === 'R' ? 'M8 -13 Q-4 0 8 13' : 'M-8 -13 Q4 0 -8 13'; }

  /* ---------- lecteur animé générique (mitose / méiose) ---------- */
  function buildPlayer(o) {
    var mount = document.getElementById(o.mount); if (!mount) return;
    var st = { i: 0, playing: false, timer: null };
    var scale = {}; o.chroms.forEach(function (c) { scale[c.id] = c.scale || 1; });
    var chromMarkup = o.chroms.map(function (c) {
      return '<g class="bio-chromatid" data-c="' + c.id + '"><path d="' + chromPath(c.side) + '" fill="none" stroke="' + c.color + '" stroke-width="5.5" stroke-linecap="round"/></g>';
    }).join('');
    mount.innerHTML =
      '<div class="bio-anim">' +
        '<svg class="bio-stage" viewBox="0 0 340 320" role="img" aria-label="' + (o.aria || '') + '">' +
          '<g class="bio-extras"></g><g class="bio-chroms">' + chromMarkup + '</g>' +
        '</svg>' +
        '<div class="bio-anim-cap" aria-live="polite"></div>' +
        '<div class="bio-anim-ctrl">' +
          '<button type="button" class="bio-anim-btn" data-act="prev" aria-label="Étape précédente">◀</button>' +
          '<span class="bio-anim-step"></span>' +
          '<button type="button" class="bio-anim-btn" data-act="next">Suivant ▶</button>' +
          '<button type="button" class="bio-anim-btn bio-anim-play" data-act="play">▶ Auto</button>' +
          '<button type="button" class="bio-anim-btn" data-act="restart" aria-label="Recommencer">↻</button>' +
        '</div>' +
      '</div>';
    var extras = mount.querySelector('.bio-extras');
    var capEl = mount.querySelector('.bio-anim-cap');
    var stepEl = mount.querySelector('.bio-anim-step');
    var playBtn = mount.querySelector('.bio-anim-play');

    function place(id, x, y) { var el = mount.querySelector('.bio-chromatid[data-c="' + id + '"]'); if (el) el.style.transform = 'translate(' + x + 'px,' + y + 'px) scale(' + scale[id] + ')'; }
    function show(i) {
      st.i = Math.max(0, Math.min(o.phases.length - 1, i));
      var ph = o.phases[st.i];
      extras.innerHTML = ph.extras || '';
      Object.keys(ph.pos).forEach(function (id) { place(id, ph.pos[id][0], ph.pos[id][1]); });
      capEl.innerHTML = '<b>' + (st.i + 1) + '.</b> ' + (ph.cap || '');
      stepEl.textContent = (st.i + 1) + ' / ' + o.phases.length;
    }
    function next() { if (st.i < o.phases.length - 1) show(st.i + 1); else stopPlay(); }
    function stopPlay() { st.playing = false; if (st.timer) { clearTimeout(st.timer); st.timer = null; } playBtn.classList.remove('on'); playBtn.innerHTML = '▶ Auto'; }
    function play() {
      if (st.playing) { stopPlay(); return; }
      st.playing = true; playBtn.classList.add('on'); playBtn.innerHTML = '⏸ Pause';
      if (st.i >= o.phases.length - 1) show(0);
      var tick = function () { if (!st.playing) return; if (st.i < o.phases.length - 1) { show(st.i + 1); st.timer = setTimeout(tick, 2100); } else { stopPlay(); } };
      st.timer = setTimeout(tick, 2100);
    }
    mount.querySelector('.bio-anim-ctrl').addEventListener('click', function (e) {
      var b = e.target.closest('.bio-anim-btn'); if (!b) return;
      var act = b.getAttribute('data-act');
      if (act !== 'play') stopPlay();
      if (act === 'next') next(); else if (act === 'prev') show(st.i - 1); else if (act === 'restart') show(0); else if (act === 'play') play();
    });
    show(0);
  }

  /* ---------- configs mitose & méiose ---------- */
  var BLUE = '#2563eb', RED = '#dc2626';
  function poles() { return spindle(); }

  var MITO = {
    mount: 'bio-mito-anim', aria: 'Animation de la mitose : prophase, métaphase, anaphase, télophase, deux cellules filles identiques.',
    chroms: [{ id: 'b1', color: BLUE, side: 'L', scale: 1 }, { id: 'b2', color: BLUE, side: 'R', scale: 1 },
             { id: 'r1', color: RED, side: 'L', scale: 0.72 }, { id: 'r2', color: RED, side: 'R', scale: 0.72 }],
    phases: [
      { cap: '<b style="color:var(--color-nav)">Prophase</b> — les chromosomes se condensent (forme en X = 2 chromatides-sœurs). L\'enveloppe du noyau disparaît.',
        extras: cell(170, 150, 102) + nuc(170, 150, 64), pos: { b1: [142, 150], b2: [142, 150], r1: [206, 150], r2: [206, 150] } },
      { cap: '<b style="color:var(--color-nav)">Métaphase</b> — les chromosomes s\'alignent au milieu (plaque équatoriale).',
        extras: cell(170, 150, 102) + poles() + '<line x1="92" y1="150" x2="248" y2="150" stroke="#cbd5e1" stroke-width="1.5" stroke-dasharray="5 5"/>', pos: { b1: [170, 122], b2: [170, 122], r1: [170, 182], r2: [170, 182] } },
      { cap: '<b style="color:var(--color-nav)">Anaphase</b> — les <b>chromatides-sœurs se séparent</b> et partent vers les 2 pôles opposés.',
        extras: cell(170, 150, 102) + poles(), pos: { b1: [170, 74], r1: [170, 100], b2: [170, 226], r2: [170, 200] } },
      { cap: '<b style="color:var(--color-nav)">Télophase</b> — 2 noyaux se reforment, puis la cellule se coupe (<b>cytodiérèse</b>).',
        extras: cell(170, 92, 70) + cell(170, 208, 70) + nuc(170, 92, 40) + nuc(170, 208, 40), pos: { b1: [162, 84], r1: [182, 100], b2: [162, 216], r2: [182, 200] } },
      { cap: '<b style="color:#16a34a">Résultat : 2 cellules filles identiques</b> (2n → 2n). Sert à la <b>croissance</b> et à la <b>réparation</b>.',
        extras: cell(170, 86, 60) + cell(170, 214, 60) + lbl(170, 90, '2n', 12) + lbl(170, 218, '2n', 12), pos: { b1: [150, 86], r1: [190, 92], b2: [150, 214], r2: [190, 208] } }
    ]
  };

  var MEIO = {
    mount: 'bio-meio-anim', aria: 'Animation de la méiose : deux divisions successives, une cellule 2n donne quatre gamètes n.',
    chroms: [{ id: 'm1', color: BLUE, side: 'L', scale: 1 }, { id: 'm2', color: BLUE, side: 'R', scale: 1 },
             { id: 'p1', color: RED, side: 'L', scale: 1 }, { id: 'p2', color: RED, side: 'R', scale: 1 }],
    phases: [
      { cap: 'Départ — une cellule <b>2n</b>. Chaque chromosome est dédoublé (en X) ; les <b>homologues</b> (🔵 mère, 🔴 père) forment une paire.',
        extras: cell(170, 150, 102) + nuc(170, 150, 66) + lbl(250, 150, '2n', 13), pos: { m1: [134, 150], m2: [134, 150], p1: [208, 150], p2: [208, 150] } },
      { cap: '<b style="color:var(--color-nav)">Métaphase I</b> — les paires d\'homologues s\'alignent ensemble au centre.',
        extras: cell(170, 150, 102) + poles(), pos: { m1: [154, 150], m2: [154, 150], p1: [188, 150], p2: [188, 150] } },
      { cap: '<b style="color:var(--color-nav)">Anaphase I (réductionnelle)</b> — les chromosomes <b>HOMOLOGUES se séparent</b>. ⚠️ C\'est LA différence avec la mitose (2n → n).',
        extras: cell(170, 150, 102) + poles(), pos: { m1: [170, 80], m2: [170, 80], p1: [170, 220], p2: [170, 220] } },
      { cap: 'Fin de la <b>1ʳᵉ division</b> — 2 cellules à <b>n</b> (les chromosomes sont encore dédoublés).',
        extras: cell(170, 88, 66) + cell(170, 212, 66) + lbl(170, 92, 'n', 12) + lbl(170, 216, 'n', 12), pos: { m1: [170, 88], m2: [170, 88], p1: [170, 212], p2: [170, 212] } },
      { cap: '<b style="color:var(--color-nav)">2ᵉ division</b> (comme une mitose) — dans chaque cellule, les <b>chromatides-sœurs se séparent</b>.',
        extras: cell(110, 88, 50) + cell(230, 88, 50) + cell(110, 212, 50) + cell(230, 212, 50), pos: { m1: [110, 88], m2: [230, 88], p1: [110, 212], p2: [230, 212] } },
      { cap: '<b style="color:#16a34a">Résultat : 4 gamètes (n)</b>, tous différents (brassage). À la fécondation, n + n redonnera 2n.',
        extras: cell(110, 88, 48) + cell(230, 88, 48) + cell(110, 212, 48) + cell(230, 212, 48) + lbl(110, 92, 'n', 11) + lbl(230, 92, 'n', 11) + lbl(110, 216, 'n', 11) + lbl(230, 216, 'n', 11), pos: { m1: [110, 88], m2: [230, 88], p1: [110, 212], p2: [230, 212] } }
    ]
  };

  /* ---------- simulateur de croisement (Punnett) ---------- */
  function gametes(g) { return g[0] === g[1] ? [g[0], g[0]] : ['A', 'a']; }
  function geno(a, b) { return [a, b].sort().join(''); } // 'A'(65)<'a'(97) → AA, Aa, aa
  function renderCross(host) {
    var sels = host.querySelectorAll('.bio-cross-p');
    var p1 = sels[0] ? sels[0].value : 'Aa', p2 = sels[1] ? sels[1].value : 'Aa';
    var g1 = gametes(p1), g2 = gametes(p2);
    var out = host.querySelector('.bio-cross-out');
    var cells = [], counts = { AA: 0, Aa: 0, aa: 0 };
    for (var r = 0; r < 2; r++) for (var c = 0; c < 2; c++) { var gt = geno(g1[r], g2[c]); cells.push(gt); counts[gt]++; }
    var dom = counts.AA + counts.Aa, rec = counts.aa;
    function gcd(a, b) { return b ? gcd(b, a % b) : a; }
    function ratio(a, b) { if (!a || !b) return (a ? a + ' : 0' : '0 : ' + b); var d = gcd(a, b); return (a / d) + ' : ' + (b / d); }
    var grid = '<table class="punnett-sim"><tr><th class="corner"></th><th>' + g2[0] + '</th><th>' + g2[1] + '</th></tr>';
    var k = 0;
    for (var rr = 0; rr < 2; rr++) {
      grid += '<tr><th>' + g1[rr] + '</th>';
      for (var cc = 0; cc < 2; cc++) {
        var gt2 = cells[rr * 2 + cc], dominant = gt2.indexOf('A') >= 0;
        grid += '<td class="bio-cross-cell ' + (dominant ? 'dom' : 'rec') + '" style="transition-delay:' + (k * 140) + 'ms">' + gt2 + '</td>';
        k++;
      }
      grid += '</tr>';
    }
    grid += '</table>';
    var summary = '<div class="bio-cross-sum">' +
      '<div><b>Génotypes</b> : ' + counts.AA + ' AA · ' + counts.Aa + ' Aa · ' + counts.aa + ' aa &nbsp;→&nbsp; <b>' + counts.AA + ' : ' + counts.Aa + ' : ' + counts.aa + '</b></div>' +
      '<div><b>Phénotypes</b> : <span class="bio-cross-tag dom">' + dom + ' dominant' + (dom > 1 ? 's' : '') + '</span> <span class="bio-cross-tag rec">' + rec + ' récessif' + (rec > 1 ? 's' : '') + '</span> &nbsp;→&nbsp; <b>' + ratio(dom, rec) + '</b></div>' +
      ((p1 === 'Aa' && p2 === 'Aa') ? '<div class="bio-cross-note">C\'est le croisement de Mendel : <b>Aa × Aa → 3 dominants : 1 récessif</b>. ✅</div>' : '') +
      '</div>';
    out.innerHTML = grid + summary;
    // déclenche l'animation d'apparition des cases
    var cs = out.querySelectorAll('.bio-cross-cell');
    requestAnimationFrame(function () { cs.forEach(function (el) { el.classList.add('in'); }); });
  }

  /* ---------- montage automatique ---------- */
  function tryInit() {
    [MITO, MEIO].forEach(function (cfg) {
      var m = document.getElementById(cfg.mount);
      if (m && m.getAttribute('data-built') !== '1') { m.setAttribute('data-built', '1'); buildPlayer(cfg); }
    });
    var cross = document.getElementById('bio-cross');
    if (cross && cross.getAttribute('data-built') !== '1') { cross.setAttribute('data-built', '1'); renderCross(cross); }
  }
  // délégation pour le simulateur (boutons + selects)
  document.addEventListener('click', function (e) {
    var go = e.target.closest('.bio-cross-go'); if (go) { var h = go.closest('#bio-cross'); if (h) { e.preventDefault(); renderCross(h); } }
  });
  document.addEventListener('change', function (e) {
    var s = e.target.closest('.bio-cross-p'); if (s) { var h = s.closest('#bio-cross'); if (h) renderCross(h); }
  });

  if (document.readyState !== 'loading') tryInit();
  document.addEventListener('DOMContentLoaded', tryInit);
  try { new MutationObserver(tryInit).observe(document.body, { childList: true, subtree: true }); } catch (e) {}
})();
