/* GR2 Study — Contenu BIOLOGIE
   L'organisation du vivant · la cellule (procaryote / eucaryote) · les organites ·
   cellule animale / végétale · ADN & chromosomes. Avec illustrations (SVG du thème).
   S'enregistre via window.registerSubject. */
(function () {
  'use strict';
  if (typeof window.registerSubject !== 'function') return;

  // ---- Illustrations SVG « façon manuel scolaire » (fond sombre) ----
  var SVGSTYLE = 'max-width:100%;height:auto;background:var(--bg-main);border-radius:12px;border:2px solid var(--border-subtle);';

  // pastille numérotée posée sur un organite
  function badge(n, x, y) {
    return '<g><circle cx="' + x + '" cy="' + y + '" r="10.5" fill="#0f172a" stroke="#e2e8f0" stroke-width="1.6"/>' +
      '<text x="' + x + '" y="' + (y + 3.8) + '" text-anchor="middle" font-size="12" font-weight="700" fill="#e2e8f0" font-family="inherit">' + n + '</text></g>';
  }
  // légende numérotée (1,2,3…) sous le schéma
  function numLegend(items) {
    return '<div style="display:flex;flex-wrap:wrap;gap:8px 16px;justify-content:center;margin-top:12px;font-size:13px;color:var(--text-secondary);">' +
      items.map(function (t, i) {
        return '<span style="display:inline-flex;align-items:center;gap:6px;">' +
          '<span style="display:inline-flex;width:19px;height:19px;border-radius:50%;background:#0f172a;border:1.6px solid #e2e8f0;color:#e2e8f0;font-size:11px;font-weight:700;align-items:center;justify-content:center;flex:0 0 auto;">' + (i + 1) + '</span>' + t + '</span>';
      }).join('') + '</div>';
  }
  // légende à pastilles de couleur
  function colorLegend(items) {
    return '<div style="display:flex;flex-wrap:wrap;gap:8px 16px;justify-content:center;margin-top:12px;font-size:13px;color:var(--text-secondary);">' +
      items.map(function (it) {
        return '<span style="display:inline-flex;align-items:center;gap:6px;"><span style="width:13px;height:13px;border-radius:4px;background:' + it[0] + ';display:inline-block;flex:0 0 auto;"></span>' + it[1] + '</span>';
      }).join('') + '</div>';
  }
  function wrap(svg, leg) { return '<div style="text-align:center;">' + svg + leg + '</div>'; }

  // mitochondrie (haricot + crêtes)
  function mito(x, y, rot, sc) {
    sc = sc || 1;
    return '<g transform="translate(' + x + ',' + y + ') rotate(' + rot + ') scale(' + sc + ')">' +
      '<ellipse rx="28" ry="14" fill="url(#bMito)" stroke="#fecaca" stroke-width="1.5"/>' +
      '<path d="M-22 -1 q7 -10 13 0 q6 10 13 0 q5 -8 11 0" fill="none" stroke="#fee2e2" stroke-width="1.6" opacity="0.85"/>' +
      '</g>';
  }
  // chloroplaste (ovale vert + grana = piles de thylakoïdes, façon manuel)
  function chloro(x, y, rot) {
    var grana = '';
    [-14, -1, 12].forEach(function (gx, i) {
      grana += '<g transform="translate(' + gx + ',' + (i === 1 ? 1 : 0) + ')" fill="#14532d" opacity="0.95">' +
        '<ellipse cy="-5" rx="4" ry="1.8"/><ellipse cy="-1.5" rx="4" ry="1.8"/><ellipse cy="2" rx="4" ry="1.8"/></g>';
    });
    return '<g transform="translate(' + x + ',' + y + ') rotate(' + rot + ')">' +
      '<ellipse rx="27" ry="14" fill="url(#bChloro)" stroke="#bbf7d0" stroke-width="1.5"/>' +
      '<path d="M-14 0 H12" stroke="#14532d" stroke-width="1" opacity="0.45"/>' +
      grana +
      '</g>';
  }
  // appareil de Golgi : pile de citernes incurvées + vésicules
  function golgi(x, y) {
    var s = '<g fill="none" stroke="#2dd4bf" stroke-width="2.4">';
    for (var i = 0; i < 4; i++) { var w = 22 - i * 3; s += '<path d="M' + (x - w) + ' ' + (y + i * 7) + ' q' + w + ' -10 ' + (2 * w) + ' 0"/>'; }
    s += '</g><g fill="#5eead4"><circle cx="' + (x - 4) + '" cy="' + (y + 32) + '" r="3"/><circle cx="' + (x + 30) + '" cy="' + (y + 30) + '" r="2.6"/><circle cx="' + (x + 14) + '" cy="' + (y + 36) + '" r="2.4"/></g>';
    return s;
  }
  // centriole : deux barillets perpendiculaires (paire)
  function centriole(x, y) {
    return '<g stroke="#cbd5e1" stroke-width="1.3" fill="rgba(203,213,225,0.22)">' +
      '<rect x="' + (x - 9) + '" y="' + (y - 4) + '" width="18" height="8" rx="2"/>' +
      '<line x1="' + (x - 4) + '" y1="' + (y - 4) + '" x2="' + (x - 4) + '" y2="' + (y + 4) + '"/><line x1="' + x + '" y1="' + (y - 4) + '" x2="' + x + '" y2="' + (y + 4) + '"/><line x1="' + (x + 4) + '" y1="' + (y - 4) + '" x2="' + (x + 4) + '" y2="' + (y + 4) + '"/>' +
      '<rect x="' + (x + 8) + '" y="' + (y - 9) + '" width="8" height="18" rx="2"/>' +
      '<line x1="' + (x + 8) + '" y1="' + (y - 4) + '" x2="' + (x + 16) + '" y2="' + (y - 4) + '"/><line x1="' + (x + 8) + '" y1="' + y + '" x2="' + (x + 16) + '" y2="' + y + '"/><line x1="' + (x + 8) + '" y1="' + (y + 4) + '" x2="' + (x + 16) + '" y2="' + (y + 4) + '"/>' +
      '</g>';
  }
  function dots(coords) {
    return '<g fill="#cbd5e1">' + coords.map(function (c) { return '<circle cx="' + c[0] + '" cy="' + c[1] + '" r="2.3"/>'; }).join('') + '</g>';
  }
  // Étiquette posée directement sur le schéma : texte + ligne de rappel + point sur l'organite.
  // anchor 'end' = étiquette à gauche (le texte finit en tx) ; 'start' = à droite.
  function lbl(tx, ty, text, anchor, px, py) {
    var lx = anchor === 'end' ? tx + 4 : tx - 4;
    return '<line x1="' + lx + '" y1="' + (ty - 3.5) + '" x2="' + px + '" y2="' + py + '" stroke="#9aa4b8" stroke-width="1" opacity="0.7"/>' +
      '<circle cx="' + px + '" cy="' + py + '" r="2.7" fill="#f1f5f9"/>' +
      '<text x="' + tx + '" y="' + ty + '" text-anchor="' + anchor + '" font-family="inherit" font-size="12.5" font-weight="600" fill="#f1f5f9">' + text + '</text>';
  }

  // ===== CELLULE ANIMALE (étiquetée directement) =====
  var _animalSvg =
    '<svg viewBox="0 0 480 280" width="480" height="280" style="' + SVGSTYLE + '">' +
      '<defs>' +
        '<radialGradient id="bCytoA" cx="42%" cy="35%"><stop offset="0%" stop-color="#2e2a55"/><stop offset="100%" stop-color="#1a1733"/></radialGradient>' +
        '<radialGradient id="bNuc" cx="40%" cy="35%"><stop offset="0%" stop-color="#3b82f6"/><stop offset="100%" stop-color="#1e3a8a"/></radialGradient>' +
        '<radialGradient id="bMito" cx="40%" cy="32%"><stop offset="0%" stop-color="#fb7185"/><stop offset="100%" stop-color="#9f1239"/></radialGradient>' +
      '</defs>' +
      // membrane plasmique (double trait)
      '<ellipse cx="240" cy="152" rx="116" ry="100" fill="url(#bCytoA)" stroke="#a78bfa" stroke-width="4"/>' +
      '<ellipse cx="240" cy="152" rx="110" ry="94" fill="none" stroke="#8b7fd6" stroke-width="1.2" opacity="0.5"/>' +
      // noyau : double membrane nucléaire + pores (tirets) + nucléole + chromatine
      '<circle cx="200" cy="150" r="46" fill="url(#bNuc)" stroke="#93c5fd" stroke-width="2"/>' +
      '<circle cx="200" cy="150" r="46" fill="none" stroke="#1e3a8a" stroke-width="3" stroke-dasharray="3 6" opacity="0.8"/>' +
      '<circle cx="200" cy="150" r="41" fill="none" stroke="#bfdbfe" stroke-width="1.4" opacity="0.6"/>' +
      '<circle cx="214" cy="160" r="15" fill="#1e3a8a" stroke="#60a5fa" stroke-width="1.5"/>' +
      '<g fill="none" stroke="#bfdbfe" stroke-width="1.2" opacity="0.4"><path d="M180 134 q12 8 22 -2"/><path d="M186 168 q14 -6 26 4"/></g>' +
      // centriole (paire de barillets)
      centriole(196, 86) +
      // réticulum endoplasmique RUGUEUX (avec ribosomes) près du noyau
      '<g fill="none" stroke="#fbbf24" stroke-width="2"><path d="M258 104 q20 -9 40 0 q-3 12 -20 12 q-20 0 -20 -12"/><path d="M264 118 q16 -6 30 0"/></g>' +
      '<g fill="#fde68a"><circle cx="258" cy="104" r="2"/><circle cx="278" cy="96" r="2"/><circle cx="298" cy="104" r="2"/><circle cx="266" cy="116" r="2"/><circle cx="292" cy="116" r="2"/></g>' +
      // réticulum endoplasmique LISSE (tubes lisses, sans ribosomes)
      '<g fill="none" stroke="#fdba74" stroke-width="2"><path d="M238 206 q14 -11 28 0 q14 11 28 0"/><path d="M242 216 q13 -8 25 0 q12 8 24 0"/></g>' +
      // appareil de Golgi (citernes empilées + vésicules)
      golgi(168, 206) +
      // mitochondries (à crêtes)
      mito(322, 122, -15) + mito(298, 206, 18) +
      // lysosome
      '<circle cx="324" cy="160" r="11" fill="rgba(244,114,182,0.28)" stroke="#f472b6" stroke-width="2"/>' +
      dots([[320,156],[328,162],[323,165]]) +
      // étiquettes (gauche)
      lbl(120, 52, 'Membrane', 'end', 158, 90) +
      lbl(120, 94, 'Centriole', 'end', 190, 86) +
      lbl(120, 140, 'Noyau', 'end', 156, 148) +
      lbl(120, 182, 'Nucléole', 'end', 210, 162) +
      lbl(120, 224, 'Golgi', 'end', 168, 208) +
      // étiquettes (droite)
      lbl(360, 70, 'RE rugueux', 'start', 296, 104) +
      lbl(360, 120, 'Mitochondrie', 'start', 322, 122) +
      lbl(360, 164, 'Lysosome', 'start', 324, 160) +
      lbl(360, 210, 'RE lisse', 'start', 262, 206) +
    '</svg>';
  var SVG_ANIMAL = wrap(_animalSvg, '');

  // ===== CELLULE VÉGÉTALE (étiquetée directement) =====
  var _plantSvg =
    '<svg viewBox="0 0 480 280" width="480" height="280" style="' + SVGSTYLE + '">' +
      '<defs>' +
        '<linearGradient id="bWall" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#a3e635"/><stop offset="100%" stop-color="#4d7c0f"/></linearGradient>' +
        '<radialGradient id="bCytoP" cx="40%" cy="35%"><stop offset="0%" stop-color="#243056"/><stop offset="100%" stop-color="#141a30"/></radialGradient>' +
        '<radialGradient id="bChloro" cx="40%" cy="32%"><stop offset="0%" stop-color="#4ade80"/><stop offset="100%" stop-color="#166534"/></radialGradient>' +
      '</defs>' +
      // paroi (verte, rigide) + plasmodesmes (canaux) + membrane
      '<rect x="100" y="26" width="280" height="232" rx="24" fill="url(#bWall)"/>' +
      '<g fill="#243056"><rect x="176" y="26" width="9" height="13" rx="2"/><rect x="232" y="26" width="9" height="13" rx="2"/><rect x="176" y="245" width="9" height="13" rx="2"/></g>' +
      '<rect x="112" y="38" width="256" height="208" rx="15" fill="url(#bCytoP)" stroke="#a78bfa" stroke-width="2.4"/>' +
      // grande vacuole centrale (dominante)
      '<rect x="132" y="76" width="156" height="138" rx="20" fill="rgba(56,189,248,0.16)" stroke="#38bdf8" stroke-width="2"/>' +
      '<path d="M150 102 q10 -14 26 -8" fill="none" stroke="#7dd3fc" stroke-width="1.4" opacity="0.6"/>' +
      // noyau + nucléole (repoussé en coin)
      '<circle cx="330" cy="84" r="27" fill="url(#bNuc)" stroke="#93c5fd" stroke-width="2.5"/>' +
      '<circle cx="330" cy="84" r="27" fill="none" stroke="#1e3a8a" stroke-width="2" stroke-dasharray="3 6" opacity="0.7"/>' +
      '<circle cx="338" cy="91" r="8" fill="#1e3a8a" stroke="#60a5fa" stroke-width="1.2"/>' +
      // chloroplastes (à grana)
      chloro(168, 56, 8) + chloro(240, 54, -7) + chloro(330, 156, 16) + chloro(326, 214, -14) + chloro(166, 226, 6) + chloro(236, 228, -8) +
      // appareil de Golgi + mitochondrie
      golgi(300, 120) +
      mito(306, 178, 12, 0.85) +
      // étiquettes (gauche)
      lbl(96, 50, 'Paroi', 'end', 104, 60) +
      lbl(96, 100, 'Membrane', 'end', 114, 110) +
      lbl(96, 150, 'Vacuole', 'end', 160, 145) +
      lbl(96, 215, 'Chloroplaste', 'end', 166, 226) +
      // étiquettes (droite)
      lbl(392, 70, 'Noyau', 'start', 332, 84) +
      lbl(392, 124, 'Golgi', 'start', 312, 122) +
      lbl(392, 180, 'Mitochondrie', 'start', 322, 178) +
    '</svg>';
  var SVG_PLANT = wrap(_plantSvg, '');

  // ===== BACTÉRIE / procaryote (étiquetée directement) =====
  var _bactSvg =
    '<svg viewBox="0 0 480 210" width="480" height="210" style="' + SVGSTYLE + '">' +
      '<defs><radialGradient id="bCytoB" cx="40%" cy="35%"><stop offset="0%" stop-color="#2a2440"/><stop offset="100%" stop-color="#181228"/></radialGradient></defs>' +
      // flagelle
      '<path d="M340 100 q18 -14 34 0 t34 0 t24 0" fill="none" stroke="#94a3b8" stroke-width="2.6"/>' +
      // paroi + membrane
      '<rect x="150" y="60" width="190" height="80" rx="40" fill="url(#bCytoB)" stroke="#fbbf24" stroke-width="7"/>' +
      '<rect x="158" y="68" width="174" height="64" rx="32" fill="none" stroke="#fcd34d" stroke-width="2" opacity="0.8"/>' +
      // nucléoïde (ADN libre)
      '<path d="M205 100 q16 -22 36 -8 q22 14 42 -3 q-8 26 -36 16 q-28 -8 -42 -5 Z" fill="rgba(167,139,250,0.16)" stroke="#a78bfa" stroke-width="2.6"/>' +
      // plasmides
      '<circle cx="200" cy="84" r="8" fill="none" stroke="#34d399" stroke-width="3"/>' +
      '<circle cx="300" cy="118" r="6.5" fill="none" stroke="#34d399" stroke-width="3"/>' +
      // ribosomes
      dots([[230,80],[265,122],[290,90],[245,118],[210,118]]) +
      // étiquettes (gauche)
      lbl(140, 56, 'Paroi + membrane', 'end', 168, 72) +
      lbl(140, 108, 'Nucléoïde (ADN)', 'end', 225, 100) +
      lbl(140, 150, 'Plasmide', 'end', 198, 86) +
      // étiquettes (droite)
      lbl(352, 70, 'Ribosomes', 'start', 290, 90) +
      lbl(352, 132, 'Flagelle', 'start', 418, 100) +
    '</svg>';
  var SVG_BACT = wrap(_bactSvg, '');

  // ===== ADN — vraie double hélice =====
  var SVG_DNA = (function () {
    var w = 280, h = 320, cx = 140, amp = 80, turns = 2.5, n = 48;
    var L = [], R = [], i, t, y, ph, s;
    for (i = 0; i <= n; i++) {
      t = i / n; y = +(24 + t * (h - 48)).toFixed(1); ph = t * Math.PI * 2 * turns; s = Math.sin(ph);
      L.push([+(cx + amp * s).toFixed(1), y]);
      R.push([+(cx - amp * s).toFixed(1), y]);
    }
    function poly(p) { return p.map(function (q, k) { return (k ? 'L' : 'M') + q[0] + ' ' + q[1]; }).join(' '); }
    var COL = { A: '#60a5fa', T: '#f87171', C: '#34d399', G: '#fbbf24' };
    var pairs = [['A', 'T'], ['C', 'G'], ['G', 'C'], ['T', 'A']];
    var rungs = '', labels = '';
    var k = 0;
    for (i = 3; i < n - 2; i += 3) {
      var lx = L[i][0], rx = R[i][0], yy = L[i][1];
      s = Math.sin(i / n * Math.PI * 2 * turns);
      var op = (0.4 + 0.55 * Math.abs(s)).toFixed(2);
      var pr = pairs[k % pairs.length];
      rungs += '<line x1="' + lx + '" y1="' + yy + '" x2="' + cx + '" y2="' + yy + '" stroke="' + COL[pr[0]] + '" stroke-width="6" stroke-linecap="round" opacity="' + op + '"/>';
      rungs += '<line x1="' + cx + '" y1="' + yy + '" x2="' + rx + '" y2="' + yy + '" stroke="' + COL[pr[1]] + '" stroke-width="6" stroke-linecap="round" opacity="' + op + '"/>';
      k++;
    }
    var svg = '<svg viewBox="0 0 ' + w + ' ' + h + '" width="' + w + '" height="' + h + '" style="' + SVGSTYLE + '">' +
      rungs +
      '<path d="' + poly(L) + '" fill="none" stroke="#3b82f6" stroke-width="6.5" stroke-linecap="round"/>' +
      '<path d="' + poly(R) + '" fill="none" stroke="#ef4444" stroke-width="6.5" stroke-linecap="round"/>' +
      labels +
    '</svg>';
    return wrap(svg, colorLegend([['#3b82f6', 'Brin 1'], ['#ef4444', 'Brin 2'], ['#60a5fa', 'A'], ['#f87171', 'T'], ['#34d399', 'C'], ['#fbbf24', 'G']]) +
      '<p style="text-align:center;font-size:12.5px;color:var(--text-secondary);margin-top:6px;">Appariement constant : <strong>A–T</strong> et <strong>C–G</strong></p>');
  })();

  var sections = {};

  sections.synthese = `<div id="synthese" class="section active">
    <div style="text-align:center; margin-bottom:1.5rem;">
      <h2 style="font-size:30px; font-weight:800; color:var(--color-nav); margin:0;">🧬 Biologie</h2>
      <p style="color:var(--text-secondary); margin-top:6px;">L'organisation du vivant & la cellule</p>
    </div>

    <div class="synth-section">
      <h2>1. Les niveaux d'organisation du vivant</h2>
      <p>Le vivant s'organise en une <strong>hiérarchie</strong> de niveaux, du plus petit au plus grand. Chaque niveau est construit à partir du précédent : « la vie repose sur l'intégrité de ces niveaux ».</p>
      <div style="display:flex; flex-wrap:wrap; gap:6px; align-items:center; margin:1rem 0; font-size:13px;">
        ${['Atome','Molécule','Organite','Cellule','Tissu','Organe','Système','Organisme','Population','Communauté','Écosystème'].map(function (n, i, a) {
          return '<span style="background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:8px; padding:6px 10px; font-weight:600; color:var(--text-primary);">' + n + '</span>' + (i < a.length - 1 ? '<span style="color:var(--color-nav); font-weight:800;">→</span>' : '');
        }).join('')}
      </div>
      <div class="simple-exp-box">
        <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Comprendre simplement</button>
        <div class="simple-exp-content">Imagine des « poupées russes » : des <strong>atomes</strong> s'assemblent en <strong>molécules</strong>, qui forment des <strong>organites</strong>, qui composent une <strong>cellule</strong>. Plein de cellules identiques = un <strong>tissu</strong>, plusieurs tissus = un <strong>organe</strong> (ex. le cœur), des organes qui travaillent ensemble = un <strong>système</strong>, et tous les systèmes = un <strong>organisme</strong> (toi !). Au-delà : les organismes forment des populations, des communautés, et l'écosystème.</div>
      </div>
    </div>

    <div class="synth-section">
      <h2>2. La cellule : l'unité du vivant</h2>
      <p>La <strong>cellule</strong> est la plus petite unité capable de vivre. On distingue deux grands types selon la présence (ou non) d'un noyau :</p>
      <div class="grid2" style="margin-top:1rem;">
        <div class="card">
          <h3>🦠 Cellule procaryote</h3>
          <div style="text-align:center;">${SVG_BACT}</div>
          <ul style="font-size:14px; color:var(--text-secondary); line-height:1.9;">
            <li><strong>Pas de noyau</strong> : l'ADN est <em>libre</em> dans le cytoplasme (région nucléoïde).</li>
            <li>Pas d'organites entourés d'une membrane.</li>
            <li>Petite et simple. Ex. : <strong>bactérie</strong> (≈ 2 µm).</li>
          </ul>
        </div>
        <div class="card">
          <h3>🔬 Cellule eucaryote</h3>
          <div style="text-align:center;">${SVG_ANIMAL}</div>
          <ul style="font-size:14px; color:var(--text-secondary); line-height:1.9;">
            <li><strong>Un vrai noyau</strong> qui enferme l'ADN.</li>
            <li>De nombreux <strong>organites</strong> entourés d'une membrane.</li>
            <li>Plus grande et complexe. Ex. : cellule animale, végétale, levure.</li>
          </ul>
        </div>
      </div>
      <div class="simple-exp-box">
        <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Comprendre simplement</button>
        <div class="simple-exp-content">La différence n°1 = <strong>le noyau</strong>. « Pro-caryote » veut dire « avant le noyau » (pas de noyau, ADN qui flotte), « eu-caryote » = « vrai noyau » (ADN bien rangé dans un coffre, le noyau). Les bactéries sont procaryotes ; les animaux, plantes et champignons sont eucaryotes.</div>
      </div>
    </div>

    <div class="synth-section">
      <h2>3. Les organites et leurs rôles</h2>
      <p>Chaque organite a une fonction précise (comme les organes d'un corps, mais à l'échelle de la cellule) :</p>
      <ul style="line-height:2.1;">
        <li><strong>Noyau</strong> : contient l'<strong>ADN</strong> (l'information génétique) ; chef d'orchestre de la cellule.</li>
        <li><strong>Membrane plasmique</strong> : enveloppe la cellule, contrôle les entrées/sorties.</li>
        <li><strong>Cytoplasme</strong> : le « gel » qui remplit la cellule, où baignent les organites.</li>
        <li><strong>Mitochondrie</strong> : produit l'<strong>énergie</strong> (respiration cellulaire) ⚡.</li>
        <li><strong>Ribosomes</strong> : fabriquent les <strong>protéines</strong>.</li>
        <li><strong>Réticulum endoplasmique</strong> : transporte/fabrique (rugueux = avec ribosomes ; lisse = sans).</li>
        <li><strong>Appareil de Golgi</strong> : emballe et expédie les molécules.</li>
        <li><strong>Lysosome</strong> : « poubelle/recyclage », digère les déchets.</li>
      </ul>
      <div class="simple-exp-box">
        <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Comprendre simplement</button>
        <div class="simple-exp-content">Pense à la cellule comme une <strong>usine</strong> : le <strong>noyau</strong> = le bureau du patron (les plans/ADN), les <strong>ribosomes</strong> = les ouvriers qui fabriquent (protéines), les <strong>mitochondries</strong> = la centrale électrique (énergie), le <strong>Golgi</strong> = le service d'emballage/expédition, les <strong>lysosomes</strong> = le recyclage, et la <strong>membrane</strong> = la clôture avec ses portes.</div>
      </div>
    </div>

    <div class="synth-section">
      <h2>4. Cellule animale vs cellule végétale</h2>
      <div class="grid2" style="margin-top:0.5rem;">
        <div class="card"><h3>🐾 Cellule animale</h3><div style="text-align:center;">${SVG_ANIMAL}</div></div>
        <div class="card"><h3>🌿 Cellule végétale</h3><div style="text-align:center;">${SVG_PLANT}</div></div>
      </div>
      <p style="margin-top:1rem;">La cellule <strong>végétale</strong> possède 3 choses en plus :</p>
      <ul style="line-height:2;">
        <li><strong>Paroi</strong> (rigide, autour de la membrane) → soutient la plante.</li>
        <li><strong>Chloroplastes</strong> (verts) → font la <strong>photosynthèse</strong> (fabriquent du sucre avec la lumière).</li>
        <li><strong>Grande vacuole</strong> centrale → réserve d'eau, maintient la cellule « gonflée ».</li>
      </ul>
      <div class="simple-exp-box">
        <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Comprendre simplement</button>
        <div class="simple-exp-content">Pour différencier : si la cellule a une <strong>paroi rigide</strong>, des parties <strong>vertes</strong> (chloroplastes) et une <strong>grosse bulle d'eau</strong> (vacuole) → c'est une cellule <strong>végétale</strong>. Sinon, c'est une cellule <strong>animale</strong> (forme plus souple et arrondie).</div>
      </div>
    </div>

    <div class="synth-section">
      <h2>5. L'ADN & les chromosomes</h2>
      <div style="text-align:center; margin:0.5rem 0;">${SVG_DNA}</div>
      <ul style="line-height:2.1;">
        <li>L'<strong>ADN</strong> est une molécule en forme de <strong>double hélice</strong> (2 brins enroulés).</li>
        <li>Il est fait de <strong>nucléotides</strong> = sucre (désoxyribose) + phosphate + une <strong>base azotée</strong>.</li>
        <li>4 bases : <strong>A</strong>, <strong>T</strong>, <strong>C</strong>, <strong>G</strong>. Elles s'apparient toujours : <strong>A–T</strong> et <strong>C–G</strong>.</li>
        <li>L'ADN est le <strong>support de l'hérédité</strong> : il porte l'information transmise des parents aux enfants.</li>
        <li>Chez l'humain : <strong>23 paires</strong> de chromosomes (dont 1 paire sexuelle : XX = femme, XY = homme).</li>
      </ul>
      <div class="simple-exp-box">
        <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Comprendre simplement</button>
        <div class="simple-exp-content">L'ADN, c'est le <strong>mode d'emploi</strong> qui fabrique et fait fonctionner ton corps. Il ressemble à une <strong>échelle torsadée</strong> : les deux montants sont les brins, et les barreaux sont les paires de bases (A avec T, C avec G — toujours ces couples). Quand l'ADN est très condensé, il forme les <strong>chromosomes</strong> : on en a 46 (23 paires).</div>
      </div>
    </div>

    <div class="synth-section">
      <h2>6. Le cycle cellulaire & la mitose</h2>
      <p>Une cellule passe par un <strong>cycle</strong> : elle grandit, copie son ADN, puis se divise. Les phases se succèdent toujours dans le même ordre : <strong>G1, S, G2</strong> (l'<strong>interphase</strong>) puis <strong>M</strong> (la <strong>mitose</strong>).</p>
      <div style="display:flex; flex-wrap:wrap; gap:6px; align-items:center; margin:1rem 0; font-size:13px;">
        ${['G1','S — copie de l\'ADN','G2','Mitose (M)'].map(function (n, i, a) {
          return '<span style="background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:8px; padding:6px 10px; font-weight:600; color:var(--text-primary);">' + n + '</span>' + (i < a.length - 1 ? '<span style="color:var(--color-nav); font-weight:800;">→</span>' : '');
        }).join('')}
      </div>
      <ul style="line-height:2;">
        <li><strong>Interphase</strong> (G1 + S + G2) : la phase la plus longue ; la cellule grandit et <strong>réplique son ADN</strong> (pendant la phase S).</li>
        <li><strong>Mitose (M)</strong> : division du <strong>noyau</strong> → <strong>2 cellules-filles identiques</strong> (même information génétique que la cellule-mère).</li>
        <li>Après la mitose : la cellule repart en G1, ou entre en <strong>G0</strong> (repos, sans division).</li>
      </ul>
      <p style="margin-top:1rem;"><strong>Les étapes visibles de la mitose :</strong></p>
      <div style="display:flex; flex-wrap:wrap; gap:6px; align-items:center; margin:0.6rem 0 1rem; font-size:13px;">
        ${['Interphase','Prophase','Métaphase','Anaphase','Télophase'].map(function (n, i, a) {
          return '<span style="background:rgba(167,139,250,0.12); border:1px solid var(--color-nav); border-radius:8px; padding:6px 10px; font-weight:600; color:var(--color-nav);">' + n + '</span>' + (i < a.length - 1 ? '<span style="color:var(--color-nav); font-weight:800;">→</span>' : '');
        }).join('')}
      </div>
      <p>Quand l'ADN se condense au maximum, il prend une forme en <strong>X</strong> : c'est un chromosome <strong>dédoublé</strong>, fait de 2 <strong>chromatides-sœurs</strong> identiques reliées par le <strong>centromère</strong>.</p>
      <div style="text-align:center; margin:0.8rem 0;">
        <svg viewBox="0 0 380 200" width="380" height="200" style="${SVGSTYLE}">
          <path d="M150 30 Q188 100 150 170" fill="none" stroke="#a78bfa" stroke-width="15" stroke-linecap="round"/>
          <path d="M214 30 Q176 100 214 170" fill="none" stroke="#7c3aed" stroke-width="15" stroke-linecap="round"/>
          <ellipse cx="182" cy="100" rx="13" ry="9" fill="#fbbf24" stroke="#92400e" stroke-width="1"/>
          ${lbl(120, 56, 'Chromatide', 'end', 156, 66)}
          ${lbl(250, 56, 'Chromatide-sœur', 'start', 208, 66)}
          ${lbl(250, 114, 'Centromère', 'start', 193, 100)}
        </svg>
      </div>
      <div class="simple-exp-box">
        <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Comprendre simplement</button>
        <div class="simple-exp-content">Pense au cycle comme à la « vie » d'une cellule : elle <strong>grandit</strong>, elle <strong>photocopie</strong> son ADN (phase S), puis elle se <strong>coupe en deux</strong> (mitose). Avant de se diviser, chaque chromosome a été copié → il a 2 moitiés identiques (les <strong>chromatides-sœurs</strong>) collées au milieu (le <strong>centromère</strong>), d'où la forme en X. La mitose donne 2 cellules <strong>identiques</strong> à la cellule de départ : c'est comme ça que ton corps grandit et répare ses tissus.</div>
      </div>
    </div>
  </div>`;

  sections.formules = `<div id="formules" class="section">
    <h2 style="font-size:30px; font-weight:800; color:var(--color-nav); margin-bottom:1.2rem;">📌 À retenir — l'essentiel</h2>
    <div class="grid2">
      <div>
        <div class="formula-box"><h3>Niveaux du vivant</h3><p class="note">Atome → Molécule → Organite → Cellule → Tissu → Organe → Système → Organisme → Population → Communauté → Écosystème.</p></div>
        <div class="formula-box"><h3>Procaryote vs Eucaryote</h3><p class="note"><strong>Procaryote</strong> : pas de noyau, ADN libre (bactérie). <strong>Eucaryote</strong> : vrai noyau + organites (animal, végétal, champignon).</p></div>
        <div class="formula-box"><h3>Animale vs Végétale</h3><p class="note">La <strong>végétale</strong> a en plus : paroi, chloroplastes, grande vacuole.</p></div>
      </div>
      <div>
        <div class="formula-box"><h3>Rôle des organites</h3><p class="note">Noyau = ADN · Mitochondrie = énergie · Ribosome = protéines · Golgi = emballage · Lysosome = recyclage · Membrane = échanges.</p></div>
        <div class="formula-box"><h3>ADN</h3><p class="note">Double hélice · nucléotides (sucre + phosphate + base) · bases A–T et C–G · support de l'hérédité.</p></div>
        <div class="formula-box"><h3>Chromosomes (humain)</h3><p class="note">23 paires (46 au total) · paire sexuelle : XX (femme), XY (homme).</p></div>
      </div>
    </div>
  </div>`;

  sections.methodes = `<div id="methodes" class="section">
    <h2 style="font-size:30px; font-weight:800; color:var(--color-nav); margin-bottom:1rem;">📝 Méthodes</h2>
    <div class="methods-tabs">
      <button class="mtab on" onclick="showMethod('bm1', this)">Reconnaître une cellule</button>
      <button class="mtab" onclick="showMethod('bm2', this)">Associer organite & rôle</button>
    </div>
    <div id="bm1" class="method-content on">
      <div class="formula-box"><h3>Méthode — Identifier le type de cellule</h3></div>
      <div class="step-list">
        <div class="step-item"><div class="step-num">1</div><div class="step-text">Y a-t-il un <strong>noyau</strong> ? Non → <strong>procaryote</strong> (bactérie). Oui → eucaryote, passe à l'étape 2.
          <button class="why-btn" onclick="toggleWhyMethod(this)">💡 Pourquoi cette étape ?</button>
          <div class="why-content">Le noyau est le critère n°1 : il sépare les deux grands mondes du vivant. Sans noyau = procaryote ; avec noyau = eucaryote.</div>
        </div></div>
        <div class="step-item"><div class="step-num">2</div><div class="step-text">Y a-t-il une <strong>paroi</strong>, des <strong>chloroplastes</strong> (verts) et une <strong>grande vacuole</strong> ? Oui → <strong>végétale</strong>.
          <button class="why-btn" onclick="toggleWhyMethod(this)">💡 Pourquoi cette étape ?</button>
          <div class="why-content">Ces 3 éléments n'existent que chez les végétaux : ce sont les indices décisifs pour une cellule végétale.</div>
        </div></div>
        <div class="step-item"><div class="step-num">3</div><div class="step-text">Sinon (pas de paroi ni chloroplaste, forme souple) → <strong>animale</strong>.
          <button class="why-btn" onclick="toggleWhyMethod(this)">💡 Pourquoi cette étape ?</button>
          <div class="why-content">Par élimination : une cellule eucaryote sans paroi ni chloroplaste est une cellule animale.</div>
        </div></div>
      </div>
    </div>
    <div id="bm2" class="method-content">
      <div class="formula-box"><h3>Méthode — Retenir le rôle des organites</h3></div>
      <div class="step-list">
        <div class="step-item"><div class="step-num">1</div><div class="step-text">Associe chaque organite à une image d'<strong>usine</strong> : noyau = bureau (plans), ribosome = ouvrier, mitochondrie = centrale électrique.
          <button class="why-btn" onclick="toggleWhyMethod(this)">💡 Pourquoi cette étape ?</button>
          <div class="why-content">Une analogie concrète aide à mémoriser durablement : chaque organite « fait un métier » dans l'usine-cellule.</div>
        </div></div>
        <div class="step-item"><div class="step-num">2</div><div class="step-text">Golgi = emballage/expédition · Lysosome = recyclage · Membrane = clôture avec portes.
          <button class="why-btn" onclick="toggleWhyMethod(this)">💡 Pourquoi cette étape ?</button>
          <div class="why-content">Regrouper les organites « logistiques » ensemble facilite la révision : ils gèrent le tri, l'envoi et le nettoyage.</div>
        </div></div>
      </div>
    </div>
  </div>`;

  sections.exercices = `<div id="exercices" class="section">
    <h2 style="font-size:30px; font-weight:800; color:var(--color-nav); margin-bottom:0.5rem;">✏️ Exercices guidés</h2>
    <p style="color:var(--text-secondary); margin-bottom:1.5rem;">Révèle les étapes une par une.</p>
    <div class="exercise-card">
      <h3 style="font-size:20px; font-weight:600; color:var(--color-nav); margin-bottom:0.5rem;">🔬 Quel type de cellule ?</h3>
      <div style="background:rgba(167,139,250,0.06); border-radius:8px; padding:1rem; margin-bottom:1rem;"><p><strong>Énoncé :</strong> une cellule possède un noyau, une paroi rigide, des chloroplastes et une grande vacuole. Quel type ?</p></div>
      <button class="step-btn" onclick="showExerciseStep(this, 301)">▶ Commencer</button>
      <div class="exercise-step" data-step="301"><span class="step-badge">Étape 1 sur 2</span><p>Elle a un <strong>noyau</strong> → c'est une cellule <strong>eucaryote</strong> (pas une bactérie).</p><button class="step-btn" onclick="showExerciseStep(this, 302)">▶ Conclusion</button></div>
      <div class="exercise-step" data-step="302"><span class="step-badge">Conclusion</span><p>Paroi + chloroplastes + grande vacuole → <strong>cellule végétale</strong>. ✅</p></div>
    </div>
    <div class="exercise-card">
      <h3 style="font-size:20px; font-weight:600; color:var(--color-nav); margin-bottom:0.5rem;">🧬 Quelle base s'apparie avec A ?</h3>
      <button class="step-btn" onclick="showExerciseStep(this, 311)">▶ Voir la réponse</button>
      <div class="exercise-step" data-step="311"><span class="step-badge">Réponse</span><p>Dans l'ADN, l'adénine (<strong>A</strong>) s'apparie toujours avec la <strong>thymine (T)</strong>. (Et C avec G.) ✅</p></div>
    </div>
    <div class="exercise-card">
      <h3 style="font-size:20px; font-weight:600; color:var(--color-nav); margin-bottom:0.5rem;">🔬 Cycle cellulaire : remettre dans l'ordre</h3>
      <div style="background:rgba(167,139,250,0.06); border-radius:8px; padding:1rem; margin-bottom:1rem;"><p><strong>Énoncé :</strong> dans quel ordre se déroulent ces phases de la mitose : Anaphase, Prophase, Télophase, Métaphase ?</p></div>
      <button class="step-btn" onclick="showExerciseStep(this, 321)">▶ Indice</button>
      <div class="exercise-step" data-step="321"><span class="step-badge">Indice</span><p>Moyen mnémo : <strong>P-M-A-T</strong>. La cellule prépare (P), aligne (M), sépare (A), puis termine (T).</p><button class="step-btn" onclick="showExerciseStep(this, 322)">▶ Réponse</button></div>
      <div class="exercise-step" data-step="322"><span class="step-badge">Réponse</span><p><strong>Prophase → Métaphase → Anaphase → Télophase</strong> → 2 cellules-filles identiques. ✅</p></div>
    </div>
  </div>`;

  sections.erreurs = `<div id="erreurs" class="section">
    <h2 style="font-size:30px; font-weight:800; color:var(--color-nav); margin-bottom:1.5rem;">⚠️ Erreurs fréquentes</h2>
    <div class="synth-section">
      <div class="formula-box"><h3>❌ Croire que la bactérie a un noyau</h3><p><strong>Correction :</strong> la bactérie est <strong>procaryote</strong> : son ADN est libre dans le cytoplasme, il n'y a <strong>pas de noyau</strong>.</p></div>
      <div class="formula-box"><h3>❌ Confondre paroi et membrane</h3><p><strong>Correction :</strong> toutes les cellules ont une <strong>membrane plasmique</strong> ; seule la cellule végétale (et la bactérie) a en plus une <strong>paroi</strong> rigide par-dessus.</p></div>
      <div class="formula-box"><h3>❌ Donner le mauvais appariement des bases</h3><p><strong>Correction :</strong> c'est toujours <strong>A–T</strong> et <strong>C–G</strong> (jamais A–C ou A–G).</p></div>
      <div class="formula-box"><h3>❌ Confondre rôle des organites</h3><p><strong>Correction :</strong> l'énergie = <strong>mitochondrie</strong> (pas le noyau) ; les protéines = <strong>ribosomes</strong> ; l'ADN = <strong>noyau</strong>.</p></div>
    </div>
  </div>`;

  var questions = [
    { q: "Range du plus petit au plus grand :", opts: ["Atome → Cellule → Tissu → Organe", "Cellule → Atome → Organe → Tissu", "Organe → Tissu → Cellule → Atome", "Tissu → Cellule → Organe → Atome"], ans: 0, chapter: "organisation", difficulty: "facile", exp: "Du plus petit au plus grand : atome, (molécule, organite,) cellule, tissu, organe…" },
    { q: "Un ensemble de cellules identiques forme :", opts: ["un tissu", "un organe", "un système", "un organisme"], ans: 0, chapter: "organisation", difficulty: "facile", exp: "Des cellules semblables qui travaillent ensemble = un tissu." },
    { q: "Plusieurs organes qui coopèrent forment :", opts: ["un système", "un tissu", "une cellule", "une population"], ans: 0, chapter: "organisation", difficulty: "intermediaire", exp: "Ex. : le système digestif = estomac + intestin + foie…" },
    { q: "La différence principale entre procaryote et eucaryote est :", opts: ["la présence d'un noyau", "la taille uniquement", "la couleur", "le nombre de mitochondries"], ans: 0, chapter: "cellule", difficulty: "facile", exp: "Eucaryote = vrai noyau ; procaryote = pas de noyau (ADN libre)." },
    { q: "Une bactérie est une cellule :", opts: ["procaryote", "eucaryote", "végétale", "animale"], ans: 0, chapter: "cellule", difficulty: "facile", exp: "La bactérie n'a pas de noyau : c'est une procaryote." },
    { q: "Chez une cellule procaryote, l'ADN est :", opts: ["libre dans le cytoplasme", "dans le noyau", "dans une mitochondrie", "dans la paroi"], ans: 0, chapter: "cellule", difficulty: "intermediaire", exp: "Pas de noyau → l'ADN flotte dans le cytoplasme (région nucléoïde)." },
    { q: "Les animaux, plantes et champignons sont faits de cellules :", opts: ["eucaryotes", "procaryotes", "sans ADN", "sans membrane"], ans: 0, chapter: "cellule", difficulty: "facile", exp: "Tous ont un vrai noyau : ce sont des eucaryotes." },
    { q: "Quel organite produit l'énergie de la cellule ?", opts: ["la mitochondrie", "le noyau", "le ribosome", "le lysosome"], ans: 0, chapter: "organites", difficulty: "facile", exp: "La mitochondrie réalise la respiration cellulaire → énergie." },
    { q: "Quel organite contient l'ADN ?", opts: ["le noyau", "la mitochondrie", "le Golgi", "la membrane"], ans: 0, chapter: "organites", difficulty: "facile", exp: "Le noyau enferme l'ADN (information génétique)." },
    { q: "Les ribosomes servent à :", opts: ["fabriquer les protéines", "produire l'énergie", "digérer les déchets", "stocker l'eau"], ans: 0, chapter: "organites", difficulty: "intermediaire", exp: "Les ribosomes assemblent les protéines." },
    { q: "Quel organite digère/recycle les déchets ?", opts: ["le lysosome", "le ribosome", "le noyau", "le chloroplaste"], ans: 0, chapter: "organites", difficulty: "intermediaire", exp: "Le lysosome est la « poubelle/recyclage » de la cellule." },
    { q: "Quelle structure contrôle les entrées et sorties de la cellule ?", opts: ["la membrane plasmique", "le cytoplasme", "le noyau", "le ribosome"], ans: 0, chapter: "organites", difficulty: "facile", exp: "La membrane plasmique enveloppe la cellule et filtre les échanges." },
    { q: "Quelles structures n'existent QUE chez la cellule végétale ?", opts: ["paroi, chloroplastes, grande vacuole", "noyau, mitochondrie, ribosome", "membrane, cytoplasme, ADN", "Golgi, lysosome, noyau"], ans: 0, chapter: "organites", difficulty: "intermediaire", exp: "La cellule végétale a en plus : paroi, chloroplastes et grande vacuole." },
    { q: "Les chloroplastes servent à :", opts: ["la photosynthèse", "la digestion", "la respiration", "la division"], ans: 0, chapter: "organites", difficulty: "intermediaire", exp: "Les chloroplastes (verts) captent la lumière pour fabriquer du sucre : photosynthèse." },
    { q: "La forme de l'ADN est :", opts: ["une double hélice", "une sphère", "un cube", "une ligne droite"], ans: 0, chapter: "adn", difficulty: "facile", exp: "L'ADN est une double hélice (2 brins enroulés)." },
    { q: "Dans l'ADN, l'adénine (A) s'apparie avec :", opts: ["la thymine (T)", "la cytosine (C)", "la guanine (G)", "l'adénine (A)"], ans: 0, chapter: "adn", difficulty: "intermediaire", exp: "Appariement : A–T et C–G." },
    { q: "Combien de paires de chromosomes chez l'humain ?", opts: ["23", "46", "12", "2"], ans: 0, chapter: "adn", difficulty: "intermediaire", exp: "23 paires (46 chromosomes au total)." },
    { q: "Le caryotype d'une femme contient la paire sexuelle :", opts: ["XX", "XY", "YY", "XO"], ans: 0, chapter: "adn", difficulty: "facile", exp: "Femme = XX, homme = XY." },
    { q: "Le cycle cellulaire comprend l'interphase et :", opts: ["la mitose", "la respiration", "la photosynthèse", "la digestion"], ans: 0, chapter: "cycle", difficulty: "facile", exp: "Cycle = interphase (G1, S, G2) + mitose (M)." },
    { q: "L'ADN est copié (répliqué) pendant la phase :", opts: ["S", "G1", "G2", "M"], ans: 0, chapter: "cycle", difficulty: "intermediaire", exp: "La réplication de l'ADN a lieu en phase S de l'interphase." },
    { q: "La mitose produit :", opts: ["2 cellules-filles identiques", "4 cellules différentes", "une seule grande cellule", "des gamètes"], ans: 0, chapter: "cycle", difficulty: "facile", exp: "La mitose donne 2 cellules-filles identiques à la cellule-mère." },
    { q: "Les 2 moitiés identiques d'un chromosome dédoublé s'appellent :", opts: ["chromatides-sœurs", "nucléotides", "ribosomes", "centrioles"], ans: 0, chapter: "cycle", difficulty: "intermediaire", exp: "Un chromosome en X = 2 chromatides-sœurs reliées par le centromère." },
    { q: "Qu'est-ce qui relie les deux chromatides-sœurs ?", opts: ["le centromère", "le noyau", "la membrane", "un ribosome"], ans: 0, chapter: "cycle", difficulty: "intermediaire", exp: "Le centromère relie les 2 chromatides-sœurs (point de jonction de l'X)." },
    { q: "Ordre correct des phases visibles de la mitose :", opts: ["Prophase → Métaphase → Anaphase → Télophase", "Anaphase → Prophase → Télophase → Métaphase", "Télophase → Anaphase → Métaphase → Prophase", "Métaphase → Prophase → Télophase → Anaphase"], ans: 0, chapter: "cycle", difficulty: "difficile", exp: "PMAT : Prophase, Métaphase, Anaphase, Télophase." }
  ];

  var flashcards = [
    { front: "Les niveaux d'organisation du vivant ?", back: "Atome → Molécule → Organite → Cellule → Tissu → Organe → Système → Organisme → Population → Communauté → Écosystème.", chapter: "organisation" },
    { front: "Qu'est-ce qu'un tissu ?", back: "Un ensemble de cellules semblables assurant une même fonction.", chapter: "organisation" },
    { front: "Procaryote vs eucaryote ?", back: "Procaryote = <strong>pas de noyau</strong> (ADN libre, ex. bactérie). Eucaryote = <strong>noyau</strong> + organites (animal, végétal, champignon).", chapter: "cellule" },
    { front: "Où est l'ADN dans une bactérie ?", back: "Libre dans le cytoplasme (région nucléoïde) — pas de noyau.", chapter: "cellule" },
    { front: "Rôle du noyau ?", back: "Contenir l'ADN (information génétique) ; il dirige la cellule.", chapter: "organites" },
    { front: "Rôle de la mitochondrie ?", back: "Produire l'énergie (respiration cellulaire) ⚡.", chapter: "organites" },
    { front: "Rôle des ribosomes ?", back: "Fabriquer les protéines.", chapter: "organites" },
    { front: "Rôle du lysosome ?", back: "Digérer/recycler les déchets de la cellule.", chapter: "organites" },
    { front: "Ce que la cellule végétale a en plus ?", back: "Paroi rigide, chloroplastes (photosynthèse), grande vacuole.", chapter: "organites" },
    { front: "Forme et composition de l'ADN ?", back: "Double hélice de nucléotides (sucre + phosphate + base azotée).", chapter: "adn" },
    { front: "Appariement des bases de l'ADN ?", back: "A–T et C–G (toujours).", chapter: "adn" },
    { front: "Chromosomes chez l'humain ?", back: "23 paires (46 au total) ; paire sexuelle XX (femme) ou XY (homme).", chapter: "adn" },
    { front: "Les deux grandes parties du cycle cellulaire ?", back: "L'<strong>interphase</strong> (G1, S, G2) puis la <strong>mitose</strong> (M).", chapter: "cycle" },
    { front: "Quand l'ADN est-il répliqué ?", back: "Pendant la <strong>phase S</strong> de l'interphase.", chapter: "cycle" },
    { front: "Résultat de la mitose ?", back: "<strong>2 cellules-filles identiques</strong> à la cellule-mère (même ADN).", chapter: "cycle" },
    { front: "Phases visibles de la mitose ?", back: "Prophase → Métaphase → Anaphase → Télophase (PMAT).", chapter: "cycle" },
    { front: "Chromatides-sœurs & centromère ?", back: "Un chromosome dédoublé (forme X) = 2 chromatides-sœurs identiques reliées par le <strong>centromère</strong>.", chapter: "cycle" }
  ];

  window.registerSubject('bio', {
    subtitle: 'Biologie — le vivant, cellule, organites, ADN, cycle cellulaire',
    content: {
      sections: sections,
      questions: questions,
      flashcards: flashcards,
      demos: {},
      chapOrder: ['organisation', 'cellule', 'organites', 'adn', 'cycle'],
      chapLabels: { organisation: 'Organisation du vivant', cellule: 'Type de cellule', organites: 'Organites & rôles', adn: 'ADN & chromosomes', cycle: 'Cycle cellulaire & mitose' }
    }
  });
})();
