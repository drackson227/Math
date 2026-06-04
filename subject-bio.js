/* GR2 Study — Contenu BIOLOGIE
   L'organisation du vivant · la cellule (procaryote / eucaryote) · les organites ·
   cellule animale / végétale · ADN & chromosomes. Avec illustrations (SVG du thème).
   S'enregistre via window.registerSubject. */
(function () {
  'use strict';
  if (typeof window.registerSubject !== 'function') return;

  // ---- Illustrations SVG « façon manuel scolaire » (fond sombre) ----
  var SVGSTYLE = 'max-width:100%;height:auto;background:var(--bg-main);border-radius:12px;border:2px solid var(--border-subtle);';

  // ---- Style « planche de manuel » : papier crème + dessin à l'encre (cellules) ----
  var PAPER = 'max-width:100%;height:auto;background:#f4f1e6;border-radius:12px;border:2px solid var(--border-subtle);box-shadow:inset 0 0 40px rgba(60,50,20,0.06);';
  var INK = '#2b2b2b';   // trait principal (encre)
  var INK2 = '#7a756a';  // lignes de rappel (plus claire)
  // Étiquette « manuel » : texte encre (multi-lignes via \n) + ligne de rappel + point sur l'organite.
  function tlbl(tx, ty, text, anchor, px, py) {
    var lines = String(text).split('\n');
    var tsp = lines.map(function (l, i) { return '<tspan x="' + tx + '" dy="' + (i === 0 ? 0 : 13) + '">' + l + '</tspan>'; }).join('');
    var lx = anchor === 'end' ? tx + 3 : tx - 3;
    return '<line x1="' + lx + '" y1="' + (ty - 3) + '" x2="' + px + '" y2="' + py + '" stroke="' + INK2 + '" stroke-width="1"/>' +
      '<circle cx="' + px + '" cy="' + py + '" r="2.2" fill="' + INK + '"/>' +
      '<text x="' + tx + '" y="' + ty + '" text-anchor="' + anchor + '" font-family="Georgia,\'Times New Roman\',serif" font-size="12.5" fill="' + INK + '">' + tsp + '</text>';
  }
  // points (ribosomes libres) à l'encre
  function ink_dots(coords) {
    return '<g fill="' + INK + '">' + coords.map(function (c) { return '<circle cx="' + c[0] + '" cy="' + c[1] + '" r="' + (c[2] || 1.8) + '"/>'; }).join('') + '</g>';
  }

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
  // image scannée du cours (schéma exact, nettoyé fond blanc)
  function cellImg(src, alt) {
    return '<img src="' + src + '" alt="' + alt + '" loading="lazy" style="max-width:100%;height:auto;display:block;margin:0 auto;background:#fff;border-radius:12px;border:2px solid var(--border-subtle);padding:8px;box-shadow:0 2px 10px rgba(0,0,0,0.18);"/>';
  }

  // mitochondrie « manuel » : haricot à double membrane, crêtes en doigts vers l'intérieur
  function mito(x, y, rot, sc) {
    sc = sc || 1;
    var cr = '';
    // crêtes : petits replis depuis le bord supérieur et inférieur
    for (var k = -20; k <= 20; k += 8) {
      cr += '<path d="M' + k + ' -13 q' + (k < 0 ? 5 : -5) + ' 10 0 20" fill="none" stroke="' + INK + '" stroke-width="1.1"/>';
    }
    return '<g transform="translate(' + x + ',' + y + ') rotate(' + rot + ') scale(' + sc + ')">' +
      '<ellipse rx="30" ry="15" fill="#f3d2cf" stroke="' + INK + '" stroke-width="1.8"/>' +
      '<ellipse rx="26" ry="11.5" fill="none" stroke="' + INK + '" stroke-width="0.9"/>' +
      cr +
      '</g>';
  }
  // chloroplaste « manuel » : ovale vert clair + grana (piles de thylakoïdes) reliés par lamelles
  function chloro(x, y, rot) {
    var grana = '';
    [-15, -2, 11].forEach(function (gx) {
      for (var k = 0; k < 3; k++) {
        grana += '<line x1="' + (gx - 4) + '" y1="' + (-4 + k * 4) + '" x2="' + (gx + 4) + '" y2="' + (-4 + k * 4) + '" stroke="#166534" stroke-width="2.6"/>';
      }
    });
    return '<g transform="translate(' + x + ',' + y + ') rotate(' + rot + ')">' +
      '<ellipse rx="29" ry="15" fill="#cdeac0" stroke="' + INK + '" stroke-width="1.8"/>' +
      '<path d="M-17 0 H13" stroke="#166534" stroke-width="1.1"/>' +
      grana +
      '</g>';
  }
  // appareil de Golgi « manuel » : pile de citernes incurvées (sacs aplatis) + vésicules
  function golgi(x, y, sc) {
    sc = sc || 1;
    var s = '<g transform="translate(' + x + ',' + y + ') scale(' + sc + ')"><g fill="#f6e2bd" stroke="' + INK + '" stroke-width="1.5">';
    for (var i = 0; i < 4; i++) { var w = 26 - i * 4; s += '<path d="M' + (-w) + ' ' + (i * 8) + ' q' + w + ' -13 ' + (2 * w) + ' 0 q-' + w + ' 6 -' + (2 * w) + ' 0 Z"/>'; }
    s += '</g><g fill="#f6e2bd" stroke="' + INK + '" stroke-width="1.1"><circle cx="-8" cy="40" r="4"/><circle cx="36" cy="37" r="3.4"/><circle cx="16" cy="44" r="3"/></g></g>';
    return s;
  }
  // centriole « manuel » : deux barillets perpendiculaires (paire)
  function centriole(x, y) {
    return '<g stroke="' + INK + '" stroke-width="1.2" fill="#e7e2d4">' +
      '<rect x="' + (x - 10) + '" y="' + (y - 4.5) + '" width="20" height="9" rx="2"/>' +
      '<line x1="' + (x - 5) + '" y1="' + (y - 4.5) + '" x2="' + (x - 5) + '" y2="' + (y + 4.5) + '"/><line x1="' + x + '" y1="' + (y - 4.5) + '" x2="' + x + '" y2="' + (y + 4.5) + '"/><line x1="' + (x + 5) + '" y1="' + (y - 4.5) + '" x2="' + (x + 5) + '" y2="' + (y + 4.5) + '"/>' +
      '<rect x="' + (x + 9) + '" y="' + (y - 10) + '" width="9" height="20" rx="2"/>' +
      '<line x1="' + (x + 9) + '" y1="' + (y - 5) + '" x2="' + (x + 18) + '" y2="' + (y - 5) + '"/><line x1="' + (x + 9) + '" y1="' + y + '" x2="' + (x + 18) + '" y2="' + y + '"/><line x1="' + (x + 9) + '" y1="' + (y + 5) + '" x2="' + (x + 18) + '" y2="' + (y + 5) + '"/>' +
      '</g>';
  }
  // réticulum endoplasmique « manuel » : sacs aplatis empilés. rough=true → ribosomes (points) sur les bords.
  function reticulum(x, y, rot, rough) {
    var s = '<g transform="translate(' + x + ',' + y + ') rotate(' + rot + ')">';
    var fill = rough ? '#e9d9c0' : '#dfe6d4';
    s += '<g fill="' + fill + '" stroke="' + INK + '" stroke-width="1.4">';
    for (var i = 0; i < 3; i++) { s += '<path d="M0 ' + (i * 9) + ' q26 -11 52 0 q-26 5 -52 0 Z"/>'; }
    s += '</g>';
    if (rough) {
      var rib = '';
      for (var i = 0; i < 3; i++) { for (var j = 2; j <= 50; j += 7) { rib += '<circle cx="' + j + '" cy="' + (i * 9 + (j % 14 < 7 ? -2.5 : 2.5)) + '" r="1.5"/>'; } }
      s += '<g fill="' + INK + '">' + rib + '</g>';
    }
    return s + '</g>';
  }
  function dots(coords) { return ink_dots(coords); }
  // Étiquette posée directement sur le schéma : texte + ligne de rappel + point sur l'organite.
  // anchor 'end' = étiquette à gauche (le texte finit en tx) ; 'start' = à droite.
  function lbl(tx, ty, text, anchor, px, py) {
    var lx = anchor === 'end' ? tx + 4 : tx - 4;
    return '<line x1="' + lx + '" y1="' + (ty - 3.5) + '" x2="' + px + '" y2="' + py + '" stroke="#9aa4b8" stroke-width="1" opacity="0.7"/>' +
      '<circle cx="' + px + '" cy="' + py + '" r="2.7" fill="#f1f5f9"/>' +
      '<text x="' + tx + '" y="' + ty + '" text-anchor="' + anchor + '" font-family="inherit" font-size="12.5" font-weight="600" fill="#f1f5f9">' + text + '</text>';
  }

  // ===== CELLULE ANIMALE — IMAGE EXACTE DU COURS (photo scannée + nettoyée) =====
  var SVG_ANIMAL = wrap(cellImg('cellule-animale.png',
    'Schéma du cours — cellule animale (eucaryote) : réticulum endoplasmique rugueux, ribosome, pore nucléaire, nucléole, membrane nucléaire, noyau, appareil de Golgi, centriole, lysosome, membrane plasmique, cytoplasme, mitochondries.'), '');

  // ===== CELLULE VÉGÉTALE — IMAGE EXACTE DU COURS (photo scannée + nettoyée) =====
  var SVG_PLANT = wrap(cellImg('cellule-vegetale.png',
    'Schéma du cours — cellule végétale : paroi cellulaire, peroxysome, membrane cellulaire, chloroplaste, cytosol, ponctuation avec plasmodesme, réticulum endoplasmique rugueux et lisse, noyau, nucléole, mitochondrie, vacuole centrale, appareil de Golgi.'), '');

  // ===== BACTÉRIE / procaryote — planche façon manuel =====
  var _bactSvg =
    '<svg viewBox="0 0 480 220" width="480" height="220" style="' + PAPER + '">' +
      // flagelle (ondulé)
      '<path d="M340 110 q18 -16 34 0 t34 0 t30 0" fill="none" stroke="' + INK + '" stroke-width="2.2"/>' +
      // paroi cellulaire (épaisse) + membrane
      '<rect x="150" y="64" width="190" height="92" rx="46" fill="#e9d9c0" stroke="' + INK + '" stroke-width="2.4"/>' +
      '<rect x="160" y="74" width="170" height="72" rx="36" fill="#fdf6e3" stroke="' + INK + '" stroke-width="1.3"/>' +
      // nucléoïde (ADN circulaire libre, pelote)
      '<path d="M205 110 q16 -22 36 -8 q22 14 42 -3 q-8 26 -36 16 q-28 -8 -42 -5 Z" fill="#dfe6d4" stroke="' + INK + '" stroke-width="1.8"/>' +
      // plasmides (petits anneaux d\'ADN)
      '<circle cx="202" cy="92" r="8" fill="none" stroke="' + INK + '" stroke-width="2"/>' +
      '<circle cx="302" cy="128" r="6.5" fill="none" stroke="' + INK + '" stroke-width="2"/>' +
      // ribosomes (points)
      ink_dots([[232, 88], [266, 132], [292, 98], [248, 126], [214, 126]]) +
      // étiquettes (gauche)
      tlbl(140, 60, 'Paroi + membrane', 'end', 170, 78) +
      tlbl(140, 116, 'Nucléoïde (ADN)', 'end', 225, 110) +
      tlbl(140, 158, 'Plasmide', 'end', 200, 94) +
      // étiquettes (droite)
      tlbl(352, 74, 'Ribosomes', 'start', 292, 98) +
      tlbl(352, 140, 'Flagelle', 'start', 420, 110) +
    '</svg>';
  // Procaryote — IMAGE EXACTE DU COURS (bactérie : Pili, Capsule, Ribosomes, Paroi, Membrane, Région nucléoïde/ADN, Mésosome, Flagelles)
  var SVG_BACT = wrap(cellImg('procaryote.png',
    'Schéma du cours — structure d\'une bactérie (procaryote) : pili, capsule, ribosomes, paroi cellulaire, membrane plasmique, région nucléoïde contenant l\'ADN, mésosome, flagelles.'), '');

  // ===== ADN — schéma redessiné (échelle de bases nette + double hélice) =====
  var SVG_DNA = (function () {
    var FIG = 'max-width:720px;width:100%;height:auto;background:#fff;border-radius:12px;border:2px solid var(--border-subtle);padding:8px;box-shadow:0 2px 12px rgba(0,0,0,0.15);';
    var OR = '#f59e0b', PH = '#7c3aed', INK = '#1f2937', LEAD = '#9aa4b8';
    var COL = { A: '#ef4444', T: '#22c55e', G: '#3b82f6', C: '#eab308' };
    function txt(x, y, t, s, w, f, a) { return '<text x="' + x + '" y="' + y + '" text-anchor="' + (a || 'middle') + '" font-family="inherit" font-size="' + (s || 12) + '" font-weight="' + (w || 500) + '" fill="' + (f || INK) + '">' + t + '</text>'; }
    var s = '<svg viewBox="0 0 760 360" width="760" height="360" style="' + FIG + '" role="img" aria-label="La structure de l\'ADN : deux brins (désoxyribose + phosphate) reliés par les bases azotées appariées A-T et C-G, formant une double hélice.">';
    s += txt(380, 26, "La structure de l'ADN", 16, 800, '#7c3aed');
    var x0 = 80, x1 = 400, yt = 138, yb = 246;
    // brins (rails sucre-phosphate)
    s += '<line x1="' + x0 + '" y1="' + yt + '" x2="' + x1 + '" y2="' + yt + '" stroke="' + OR + '" stroke-width="9" stroke-linecap="round"/>';
    s += '<line x1="' + x0 + '" y1="' + yb + '" x2="' + x1 + '" y2="' + yb + '" stroke="' + OR + '" stroke-width="9" stroke-linecap="round"/>';
    // phosphates (cercles violets) sur les brins
    [100, 160, 220, 280, 340, 400].forEach(function (nx) { s += '<circle cx="' + nx + '" cy="' + yt + '" r="5.5" fill="' + PH + '"/><circle cx="' + nx + '" cy="' + yb + '" r="5.5" fill="' + PH + '"/>'; });
    // rungs = paires de bases (couleur + lettre) + étiquettes
    var rungs = [[120, 'T', 'A', 'Thymine', 'Adénine'], [200, 'G', 'C', 'Guanine', 'Cytosine'], [280, 'C', 'G', 'Cytosine', 'Guanine'], [360, 'A', 'T', 'Adénine', 'Thymine']];
    rungs.forEach(function (r) {
      var rx = r[0];
      s += '<rect x="' + (rx - 11) + '" y="' + (yt + 4) + '" width="22" height="46" rx="3" fill="' + COL[r[1]] + '"/>' + txt(rx, yt + 33, r[1], 14, 800, '#fff');
      s += '<rect x="' + (rx - 11) + '" y="' + (yb - 50) + '" width="22" height="46" rx="3" fill="' + COL[r[2]] + '"/>' + txt(rx, yb - 18, r[2], 14, 800, '#fff');
      s += '<line x1="' + rx + '" y1="' + (yt - 5) + '" x2="' + rx + '" y2="104" stroke="' + LEAD + '" stroke-width="1"/>' + txt(rx, 96, r[3], 10.5, 600, INK);
      s += '<line x1="' + rx + '" y1="' + (yb + 5) + '" x2="' + rx + '" y2="286" stroke="' + LEAD + '" stroke-width="1"/>' + txt(rx, 297, r[4], 10.5, 600, INK);
    });
    // étiquettes Désoxyribose (brin orange) & Phosphate (cercle violet)
    s += '<line x1="400" y1="' + yb + '" x2="436" y2="' + (yb + 14) + '" stroke="' + LEAD + '" stroke-width="1"/>' + txt(440, yb + 18, 'Désoxyribose', 11, 600, INK, 'start');
    s += '<line x1="400" y1="' + yt + '" x2="436" y2="' + (yt - 14) + '" stroke="' + LEAD + '" stroke-width="1"/>' + txt(440, yt - 14, 'Phosphate', 11, 600, INK, 'start');
    // ---- double hélice (à droite) ----
    var hx0 = 470, hx1 = 720, cyH = 192, amp = 46, n = 60, turns = 1.8, i, ph, a;
    var top = [], bot = [];
    for (i = 0; i <= n; i++) { a = i / n; ph = a * Math.PI * 2 * turns; var x = hx0 + a * (hx1 - hx0); top.push([x.toFixed(1), (cyH + amp * Math.sin(ph)).toFixed(1)]); bot.push([x.toFixed(1), (cyH - amp * Math.sin(ph)).toFixed(1)]); }
    function poly(p) { return p.map(function (q, k) { return (k ? 'L' : 'M') + q[0] + ' ' + q[1]; }).join(' '); }
    // barreaux de l'hélice (colorés)
    var bcol = [COL.T, COL.G, COL.C, COL.A, COL.T, COL.G, COL.C, COL.A];
    for (i = 4; i < n; i += 6) { s += '<line x1="' + top[i][0] + '" y1="' + top[i][1] + '" x2="' + bot[i][0] + '" y2="' + bot[i][1] + '" stroke="' + bcol[(i / 6) % bcol.length | 0] + '" stroke-width="4" stroke-linecap="round" opacity="0.9"/>'; }
    s += '<path d="' + poly(top) + '" fill="none" stroke="' + OR + '" stroke-width="6" stroke-linecap="round"/>';
    s += '<path d="' + poly(bot) + '" fill="none" stroke="#fbbf24" stroke-width="6" stroke-linecap="round"/>';
    s += txt(595, 300, 'Double hélice', 11.5, 700, '#7c3aed');
    return wrap(s + '</svg>', '<div style="display:flex;flex-wrap:wrap;gap:6px 16px;justify-content:center;margin-top:8px;font-size:12.5px;color:var(--text-secondary);">' +
      [['A', COL.A], ['T', COL.T], ['G', COL.G], ['C', COL.C]].map(function (b) { return '<span style="display:inline-flex;align-items:center;gap:5px;"><span style="width:12px;height:12px;border-radius:3px;background:' + b[1] + ';display:inline-block;"></span>' + ({ A: 'Adénine', T: 'Thymine', G: 'Guanine', C: 'Cytosine' })[b[0]] + '</span>'; }).join('') +
      '<span>· Appariement : <strong>A–T</strong> et <strong>C–G</strong></span></div>');
  })();

  // ===== CYCLE CELLULAIRE & MITOSE — schéma redessiné (séquence + graphe quantité d'ADN) =====
  var SVG_MITOSE = (function () {
    var FIG = 'max-width:700px;width:100%;height:auto;background:#f8fafc;border-radius:12px;border:2px solid var(--border-subtle);padding:8px;box-shadow:0 2px 12px rgba(0,0,0,0.18);';
    var INKG = '#1f2937', AX = '#475569', GRID = '#dbe2ec', CURVE = '#7c3aed', B = '#2563eb', R = '#dc2626', CEN = '#f59e0b';
    function txt(x, y, t, s, w, f, a) { return '<text x="' + x + '" y="' + y + '" text-anchor="' + (a || 'middle') + '" font-family="inherit" font-size="' + (s || 13) + '" font-weight="' + (w || 500) + '" fill="' + (f || INKG) + '">' + t + '</text>'; }
    // chromosome dédoublé (en X) : 2 chromatides + centromère
    function chromX(x, y, sc, c) { c = c || B; return '<g transform="translate(' + x + ',' + y + ') scale(' + sc + ')">' +
      '<path d="M-8 -13 Q4 0 -8 13" fill="none" stroke="' + c + '" stroke-width="4.2" stroke-linecap="round"/>' +
      '<path d="M8 -13 Q-4 0 8 13" fill="none" stroke="' + c + '" stroke-width="4.2" stroke-linecap="round"/>' +
      '<circle r="2.6" fill="' + CEN + '"/></g>'; }
    // chromosome simple (1 chromatide)
    function chromI(x, y, sc, c) { c = c || B; return '<g transform="translate(' + x + ',' + y + ') scale(' + sc + ')">' +
      '<path d="M0 -13 Q5 0 0 13" fill="none" stroke="' + c + '" stroke-width="4.2" stroke-linecap="round"/></g>'; }
    function cell(cx, cy, r) { return '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="#eef3f9" stroke="' + INKG + '" stroke-width="2"/>'; }
    function arrow(x1, x2, y) { return '<line x1="' + x1 + '" y1="' + y + '" x2="' + (x2 - 8) + '" y2="' + y + '" stroke="' + AX + '" stroke-width="2.2"/>' +
      '<path d="M' + (x2 - 9) + ' ' + (y - 5) + ' L' + x2 + ' ' + y + ' L' + (x2 - 9) + ' ' + (y + 5) + ' Z" fill="' + AX + '"/>'; }

    var s = '<svg viewBox="0 0 820 580" width="820" height="580" style="' + FIG + '" role="img" aria-label="Le cycle cellulaire et la mitose : séquence de division et graphe de la quantité d\'ADN au cours du temps.">';
    s += txt(410, 26, 'Le cycle cellulaire et la mitose', 17, 800, CURVE);

    // ---------- SÉQUENCE DE MITOSE (haut) ----------
    var cy = 100;
    // A — cellule de départ (2 chromosomes simples : 1 long bleu, 1 court rouge)
    s += cell(72, cy, 32) + chromI(64, cy - 2, 1, B) + chromI(84, cy + 4, 0.7, R);
    s += arrow(108, 168, cy) + txt(138, cy + 30, 'Réplication', 10.5, 600, AX) + txt(138, cy + 42, "de l'ADN", 10.5, 600, AX);
    // B — après réplication (2 chromosomes dédoublés en X)
    s += cell(200, cy, 32) + chromX(192, cy - 2, 1, B) + chromX(212, cy + 4, 0.72, R);
    s += arrow(236, 300, cy);
    s += txt(432, 48, 'Mitose', 13, 800, CURVE);
    // C — métaphase (fuseau + chromosomes alignés à l'équateur)
    s += cell(352, cy, 48);
    s += '<g stroke="' + AX + '" stroke-width="1" opacity="0.6" fill="none">' +
      '<path d="M308 100 Q352 58 396 100"/><path d="M308 100 Q352 142 396 100"/>' +
      '<line x1="310" y1="100" x2="352" y2="84"/><line x1="310" y1="100" x2="352" y2="116"/>' +
      '<line x1="394" y1="100" x2="352" y2="84"/><line x1="394" y1="100" x2="352" y2="116"/></g>';
    s += '<circle cx="308" cy="100" r="3" fill="' + AX + '"/><circle cx="396" cy="100" r="3" fill="' + AX + '"/>';
    s += chromX(352, 82, 0.9, B) + chromX(352, 118, 0.75, R);
    s += txt(352, 162, 'Métaphase', 10.5, 600, AX);
    s += arrow(404, 462, cy);
    // D — anaphase/télophase (cellule qui se pince, chromatides vers les pôles)
    s += '<path d="M512 53 a47 47 0 0 1 0 94 q-16 -10 -16 -47 q0 -37 16 -47 Z" fill="#eef3f9" stroke="' + INKG + '" stroke-width="2"/>';
    s += '<path d="M512 53 a47 47 0 0 0 0 94 q16 -10 16 -47 q0 -37 -16 -47 Z" fill="#eef3f9" stroke="' + INKG + '" stroke-width="2"/>';
    s += chromI(490, 86, 0.8, B) + chromI(498, 116, 0.62, R) + chromI(534, 86, 0.8, B) + chromI(526, 116, 0.62, R);
    s += txt(512, 162, 'Anaphase', 10.5, 600, AX);
    s += arrow(566, 636, cy);
    s += txt(752, 94, 'Deux cellules', 11, 700, INKG) + txt(752, 108, 'diploïdes', 11, 700, INKG);
    // E & F — 2 cellules-filles
    s += cell(665, 74, 26) + chromI(659, 72, 0.78, B) + chromI(673, 78, 0.55, R);
    s += cell(665, 132, 26) + chromI(659, 130, 0.78, B) + chromI(673, 136, 0.55, R);

    // séparateur
    s += '<line x1="40" y1="196" x2="780" y2="196" stroke="' + GRID + '" stroke-width="1.5"/>';

    // ---------- GRAPHE QUANTITÉ D'ADN = f(temps) (bas) ----------
    var ox = 92, base = 462, u = 86; // base = ADN 0 ; u = px par unité d'ADN
    function tx(h) { return ox + h * (680 / 24); }
    function vy(v) { return base - v * u; }
    // grille horizontale (1 et 2)
    s += '<line x1="' + ox + '" y1="' + vy(1) + '" x2="' + tx(24) + '" y2="' + vy(1) + '" stroke="' + GRID + '" stroke-width="1" stroke-dasharray="4 4"/>';
    s += '<line x1="' + ox + '" y1="' + vy(2) + '" x2="' + tx(24) + '" y2="' + vy(2) + '" stroke="' + GRID + '" stroke-width="1" stroke-dasharray="4 4"/>';
    // axes
    s += '<line x1="' + ox + '" y1="248" x2="' + ox + '" y2="' + base + '" stroke="' + AX + '" stroke-width="2"/>';
    s += '<line x1="' + ox + '" y1="' + base + '" x2="' + (tx(24) + 14) + '" y2="' + base + '" stroke="' + AX + '" stroke-width="2"/>';
    s += '<path d="M' + (tx(24) + 14) + ' ' + (base - 4) + ' L' + (tx(24) + 22) + ' ' + base + ' L' + (tx(24) + 14) + ' ' + (base + 4) + ' Z" fill="' + AX + '"/>';
    s += '<path d="M' + (ox - 4) + ' 252 L' + ox + ' 244 L' + (ox + 4) + ' 252 Z" fill="' + AX + '"/>';
    // graduations Y
    s += txt(ox - 12, base + 4, '0', 12, 500, AX, 'end') + txt(ox - 12, vy(1) + 4, '1', 12, 600, AX, 'end') + txt(ox - 12, vy(2) + 4, '2', 12, 600, AX, 'end');
    // titre Y (vertical)
    s += '<text transform="translate(34 ' + (vy(1)) + ') rotate(-90)" text-anchor="middle" font-family="inherit" font-size="12.5" font-weight="700" fill="' + INKG + '">Quantité d\'ADN (UA)</text>';
    // graduations X (toutes les 2 h)
    var h, gx;
    for (h = 0; h <= 24; h += 2) { gx = tx(h); s += '<line x1="' + gx + '" y1="' + base + '" x2="' + gx + '" y2="' + (base + 4) + '" stroke="' + AX + '" stroke-width="1.5"/>' + txt(gx, base + 17, h, 10.5, 500, AX); }
    s += txt(tx(24) + 6, base + 34, 'Temps (heures)', 12, 700, INKG, 'end');
    // courbe d'ADN
    var pts = [[0, 2], [1.5, 2], [2.5, 1], [9, 1], [15, 2], [20, 2], [21, 2], [22, 1], [24, 1]];
    var dpath = pts.map(function (p, i) { return (i ? 'L' : 'M') + tx(p[0]).toFixed(1) + ' ' + vy(p[1]).toFixed(1); }).join(' ');
    s += '<path d="' + dpath + '" fill="none" stroke="' + CURVE + '" stroke-width="3.4" stroke-linejoin="round" stroke-linecap="round"/>';
    // chromosomes au-dessus de la courbe (états successifs)
    s += chromX(tx(1), vy(2) - 26, 0.82, B);        // M : dédoublé
    s += chromI(tx(5.6), vy(1) - 24, 0.82, B);       // G1 : simple
    s += chromI(tx(11), vy(1.45) - 20, 0.82, B) + chromI(tx(12.4), vy(1.45) - 20, 0.5, R); // S : réplication en cours
    s += chromX(tx(17.5), vy(2) - 26, 0.82, B);      // G2 : dédoublé
    s += chromX(tx(21), vy(2) - 26, 0.82, B);        // M : dédoublé
    // étiquettes des phases (sous la courbe, près de l'axe)
    s += txt(tx(1), base - 8, 'M', 13, 800, INKG) + txt(tx(5.6), base - 8, 'G₁', 13, 800, INKG) + txt(tx(12), base - 8, 'S', 13, 800, INKG) + txt(tx(17.5), base - 8, 'G₂', 13, 800, INKG) + txt(tx(21), base - 8, 'M', 13, 800, INKG);
    // accolades Cycle cellulaire & Interphase
    function span(x1, x2, y, label, col) { return '<line x1="' + x1 + '" y1="' + y + '" x2="' + x2 + '" y2="' + y + '" stroke="' + col + '" stroke-width="1.6"/>' +
      '<line x1="' + x1 + '" y1="' + (y - 4) + '" x2="' + x1 + '" y2="' + (y + 4) + '" stroke="' + col + '" stroke-width="1.6"/>' +
      '<line x1="' + x2 + '" y1="' + (y - 4) + '" x2="' + x2 + '" y2="' + (y + 4) + '" stroke="' + col + '" stroke-width="1.6"/>' +
      '<rect x="' + ((x1 + x2) / 2 - 52) + '" y="' + (y - 9) + '" width="104" height="18" fill="#f8fafc"/>' +
      txt((x1 + x2) / 2, y + 4, label, 12, 700, col); }
    s += span(tx(2.5), tx(22), base + 50, 'Cycle cellulaire', CURVE);
    s += span(tx(2.5), tx(20), base + 78, 'Interphase', AX);

    return wrap(s, '<p style="text-align:center;font-size:12.5px;color:var(--text-secondary);margin-top:8px;">Pendant la phase <strong>S</strong>, l\'ADN est répliqué (quantité 1 → 2) ; la <strong>mitose (M)</strong> sépare les chromatides-sœurs → 2 cellules filles identiques (retour à 1).</p>');
  })();

  // ===== Exercice interactif « légende le schéma » (réutilisable) =====
  function labelExo(emoji, title, img, pts) {
    var boxes = pts.map(function (p, i) {
      return '<span class="lx" style="left:' + p.l + '%; top:' + p.t + '%; width:' + p.w + '%;">' +
        '<input type="text" data-answer="' + p.a.replace(/"/g, '&quot;') + '" aria-label="structure ' + (i + 1) + '" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="' + (i + 1) + '"/></span>';
    }).join('');
    return '<div class="exercise-card">' +
      '<h3 style="font-size:20px; font-weight:600; color:var(--color-nav); margin-bottom:0.5rem;">' + emoji + ' Légende le schéma — ' + title + '</h3>' +
      '<p style="color:var(--text-secondary); margin-bottom:1rem;">Écris le nom de chaque structure dans sa case (numérotée), puis clique sur <strong>Corriger</strong>.</p>' +
      '<div class="lblexo"><img src="' + img + '" alt="Schéma à légender : ' + title + '" loading="lazy"/>' + boxes + '</div>' +
      '<div class="lblexo-foot"><button class="step-btn" onclick="checkLabelExo(this)">✓ Corriger</button>' +
      '<button class="step-btn" onclick="resetLabelExo(this)" style="background:transparent; color:var(--color-nav); border:1px solid var(--color-nav);">↻ Recommencer</button>' +
      '<span class="lblexo-score"></span></div><div class="lblexo-corr"></div></div>';
  }
  var PROCA_PTS = [
    { l: 30.7, t: 5.5, w: 14, a: 'Pili' }, { l: 45, t: 26, w: 17, a: 'Ribosomes' }, { l: 47, t: 33, w: 15, a: 'Capsule' },
    { l: 48.5, t: 38.5, w: 24, a: 'Paroi cellulaire' }, { l: 56.5, t: 46, w: 23, a: 'Membrane plasmique' },
    { l: 56.5, t: 56, w: 32, a: 'Région nucléoïde' }, { l: 67, t: 66, w: 17, a: 'Mésosome' }, { l: 70, t: 73, w: 18, a: 'Flagelles' }
  ];
  var ANIM_PTS = [
    { l: 11.5, t: 6.5, w: 18, a: 'Réticulum endoplasmique rugueux' }, { l: 11.5, t: 15.8, w: 12, a: 'Ribosome' },
    { l: 63.5, t: 1.2, w: 17, a: 'Pore nucléaire' }, { l: 63.5, t: 7.3, w: 11, a: 'Nucléole' }, { l: 63.5, t: 14.3, w: 22.5, a: 'Membrane nucléaire' },
    { l: 87.5, t: 10.8, w: 9.5, a: 'Noyau' }, { l: 64.5, t: 24.3, w: 19, a: 'Appareil de Golgi' }, { l: 80, t: 31.3, w: 11, a: 'Centriole' },
    { l: 79.5, t: 37.3, w: 11.5, a: 'Lysosome' }, { l: 80, t: 71, w: 13.5, a: 'Cytoplasme' },
    { l: 11, t: 76.5, w: 17.5, a: 'Réticulum endoplasmique lisse' }, { l: 80, t: 88.5, w: 13, a: 'Membrane plasmique' }, { l: 12.3, t: 92.8, w: 15.5, a: 'Mitochondrie' }
  ];
  var VEG_PTS = [
    { l: 24, t: 2.3, w: 17, a: 'Paroi cellulaire' }, { l: 42, t: 1, w: 20, a: 'Peroxysome' }, { l: 0.5, t: 14.4, w: 22, a: 'Membrane cellulaire' },
    { l: 6, t: 21.7, w: 16, a: 'Chloroplaste' }, { l: 5, t: 28.8, w: 18, a: 'Ponctuation avec plasmodesme' },
    { l: 5, t: 55, w: 22, a: 'Mitochondrie' }, { l: 1, t: 65, w: 20, a: 'Vacuole centrale' }, { l: 74, t: 21, w: 14, a: 'Cytosol' },
    { l: 71, t: 28.5, w: 22, a: 'Réticulum endoplasmique rugueux' }, { l: 75, t: 47, w: 13, a: 'Noyau' }, { l: 75, t: 55, w: 15, a: 'Nucléole' },
    { l: 70, t: 60, w: 23, a: 'Réticulum endoplasmique lisse' }, { l: 60, t: 75, w: 30, a: 'Appareil de Golgi' }
  ];

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
        ${SVG_MITOSE}
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
    <p style="color:var(--text-secondary); margin:-0.6rem 0 1rem; font-size:14px;">🧩 <strong>Légende les schémas</strong> : remplis chaque case numérotée, puis « Corriger » (la correction s'affiche dessous).</p>
    ${labelExo('🦠', 'la bactérie (procaryote)', 'procaryote-blank.png', PROCA_PTS)}
    ${labelExo('🐾', 'la cellule animale', 'cellule-animale-blank.png', ANIM_PTS)}
    ${labelExo('🌿', 'la cellule végétale', 'cellule-vegetale-blank.png', VEG_PTS)}
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
