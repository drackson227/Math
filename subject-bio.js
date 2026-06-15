/* GR2 Study — Contenu BIOLOGIE (programme pages 12 à 24)
   La division cellulaire (cycle cellulaire & réplication de l'ADN, mitose),
   le caryotype & la ploïdie, la méiose, la fécondation, et le monohybridisme (Mendel).
   S'enregistre via window.registerSubject. */
(function () {
  'use strict';
  if (typeof window.registerSubject !== 'function') return;

  /* Infos affichées quand on clique sur une image (cours + examen) */
  window.IMG_INFO = window.IMG_INFO || {};
  Object.assign(window.IMG_INFO, {
    "mendel.jpg": {
      title: "Gregor Mendel", sub: "1822–1884 · le père de la génétique",
      cours: "<p>Moine et botaniste, <strong>Gregor Johann Mendel</strong> a découvert les <strong>lois de l'hérédité</strong> en croisant des <strong>petits pois</strong> (<em>Pisum sativum</em>). Il a montré que les caractères se transmettent par des « facteurs » (aujourd'hui les <strong>gènes</strong>) qui peuvent être <strong>dominants</strong> ou <strong>récessifs</strong>.</p>",
      exam: "<ul><li><strong>Vocabulaire :</strong> gène, allèle, <strong>dominant</strong> (A) / <strong>récessif</strong> (a), génotype (les allèles) / phénotype (ce qu'on voit).</li><li><strong>Règle :</strong> Aa × Aa → <strong>3 dominants : 1 récessif</strong> (échiquier de Punnett).</li><li>Lignées pures : AA × aa → en <strong>F1</strong> tous Aa (dominants) ; F1 × F1 → en <strong>F2</strong> le récessif réapparaît.</li></ul>",
      anecdote: "Mendel a cultivé et observé près de <strong>28 000 plants de pois</strong> ! Ses découvertes (1865) sont restées <strong>ignorées de son vivant</strong> et n'ont été comprises que ~35 ans plus tard."
    }
  });

  /* Thème visuel des fiches de bio */
  window.INFO_THEME = window.INFO_THEME || {};
  Object.assign(window.INFO_THEME, {
    "mendel.jpg": "science", "gene-allele": "science", "dominance": "science", "genotype-phenotype": "science",
    "replication": "science", "mitose": "science", "meiose": "science", "caryotype": "science", "fecondation": "science"
  });

  /* Notions cliquables (cours + examen) */
  window.INFO_TOPICS = window.INFO_TOPICS || {};
  Object.assign(window.INFO_TOPICS, {
    "replication": {
      title: "La réplication de l'ADN", sub: "phase S du cycle",
      cours: "<p>Pendant la <strong>phase S</strong>, l'ADN est <strong>copié</strong>. L'<strong>ADN polymérase</strong> ouvre la double hélice : chaque brin sert de <strong>modèle</strong>. Des <strong>nucléotides libres</strong> viennent se placer en face par <strong>complémentarité des bases</strong> (A–T, C–G). On obtient <strong>2 molécules d'ADN filles identiques</strong> à la molécule de départ.</p>",
      exam: "<ul><li>A s'apparie avec <strong>T</strong>, C avec <strong>G</strong> (toujours).</li><li>Quantité d'ADN : elle <strong>double</strong> (passe de 1 à 2) pendant la phase S.</li><li>But : que les 2 cellules filles aient le <strong>même</strong> ADN après la mitose.</li></ul>"
    },
    "mitose": {
      title: "La mitose", sub: "division en 2 cellules identiques",
      cours: "<p>La <strong>mitose</strong> divise une cellule en <strong>2 cellules filles identiques</strong> à la cellule mère (même ADN). Ses 4 étapes : <strong>Prophase → Métaphase → Anaphase → Télophase</strong> (PMAT), puis le partage du cytoplasme (<strong>cytodiérèse</strong>).</p>",
      exam: "<ul><li>Sert à la <strong>croissance</strong> et à la <strong>réparation</strong> des tissus.</li><li>2n → 2n (le nombre de chromosomes ne change pas).</li><li>À l'anaphase, ce sont les <strong>chromatides-sœurs</strong> qui se séparent.</li></ul>"
    },
    "meiose": {
      title: "La méiose", sub: "fabrication des gamètes",
      cours: "<p>La <strong>méiose</strong> fabrique les <strong>gamètes</strong> (spermatozoïdes, ovules). À partir d'<strong>1</strong> cellule (2n), elle fait <strong>2 divisions</strong> successives → <strong>4 cellules</strong> à <strong>n</strong> chromosomes (moitié moins).</p>",
      exam: "<ul><li>2n → <strong>n</strong> : c'est une division <strong>réductionnelle</strong>.</li><li>À l'anaphase 1, on sépare les <strong>chromosomes homologues</strong> (≠ mitose).</li><li>C'est une grande source de <strong>variabilité</strong> (brassage).</li></ul>"
    },
    "caryotype": {
      title: "Caryotype & ploïdie", sub: "les chromosomes classés",
      cours: "<p>Le <strong>caryotype</strong> est la photo des chromosomes d'une cellule, <strong>classés par paires</strong>. On distingue les <strong>autosomes</strong> (paires 1 à 22) et les <strong>gonosomes</strong> (chromosomes sexuels : XX ou XY).</p>",
      exam: "<ul><li>Humain : <strong>23 paires</strong> = 46 chromosomes (2n = 46).</li><li><strong>2n</strong> = diploïde (par paires) · <strong>n</strong> = haploïde (gamètes).</li><li>Femme = <strong>XX</strong>, homme = <strong>XY</strong>.</li></ul>"
    },
    "fecondation": {
      title: "La fécondation", sub: "n + n → 2n",
      cours: "<p>La <strong>fécondation</strong> est la <strong>fusion</strong> d'un gamète mâle (n) et d'un gamète femelle (n). Elle forme la <strong>cellule-œuf</strong> (zygote) à <strong>2n</strong> chromosomes, qui redonne un nouvel individu par mitoses.</p>",
      exam: "<ul><li>n + n → <strong>2n</strong> : la fécondation <strong>rétablit</strong> le nombre de chromosomes de l'espèce.</li><li>Fécondation <strong>au hasard</strong> → grande variété d'individus possibles.</li></ul>"
    },
    "gene-allele": {
      title: "Gène & allèle", sub: "les bases de l'hérédité", img: "mendel.jpg",
      cours: "<p>Un <strong>gène</strong> est une portion d'ADN qui détermine un caractère (ex. la forme du pois). Chaque gène existe en plusieurs versions appelées <strong>allèles</strong>. On a <strong>2 allèles</strong> par gène : un du père, un de la mère.</p>",
      exam: "<ul><li>Gène = le caractère · allèle = une version du gène.</li><li>Voir <strong>dominant</strong> / <strong>récessif</strong> et <strong>génotype</strong> / <strong>phénotype</strong>.</li></ul>"
    },
    "dominance": {
      title: "Dominant & récessif", sub: "qui l'emporte ?", img: "mendel.jpg",
      cours: "<p>Un allèle <strong>dominant</strong> (MAJUSCULE, ex. <strong>A</strong>) s'exprime toujours, même seul. Un allèle <strong>récessif</strong> (minuscule, <strong>a</strong>) ne s'exprime que s'il est <strong>en double</strong> (aa).</p>",
      exam: "<ul><li>AA et Aa → caractère <strong>dominant</strong> · seul <strong>aa</strong> → caractère récessif.</li></ul>"
    },
    "genotype-phenotype": {
      title: "Génotype & phénotype", sub: "les allèles vs ce qu'on voit", img: "mendel.jpg",
      cours: "<p>Le <strong>génotype</strong> = les <strong>2 allèles</strong> que possède l'individu (ex. Aa). Le <strong>phénotype</strong> = le caractère <strong>visible</strong> (l'apparence).</p>",
      exam: "<ul><li><strong>Aa</strong> et <strong>AA</strong> = même phénotype mais génotype différent.</li><li>Homozygote = AA ou aa · Hétérozygote = Aa.</li></ul>"
    }
  });

  window.TERM_MAP = window.TERM_MAP || {};
  Object.assign(window.TERM_MAP, {
    "Mendel": "mendel.jpg", "génotype": "genotype-phenotype", "phénotype": "genotype-phenotype",
    "dominant": "dominance", "récessif": "dominance", "allèle": "gene-allele", "gène": "gene-allele",
    "réplication": "replication", "mitose": "mitose", "méiose": "meiose", "caryotype": "caryotype",
    "fécondation": "fecondation", "gamètes": "fecondation", "autosomes": "caryotype", "gonosomes": "caryotype"
  });

  function wrap(svg, leg) { return '<div style="text-align:center;">' + svg + leg + '</div>'; }

  // ===== ADN — schéma (bases appariées + double hélice) =====
  var SVG_DNA = (function () {
    var FIG = 'max-width:720px;width:100%;height:auto;background:#fff;border-radius:12px;border:2px solid var(--border-subtle);padding:8px;box-shadow:0 2px 12px rgba(0,0,0,0.15);';
    var OR = '#f59e0b', PH = '#7c3aed', INK = '#1f2937', LEAD = '#9aa4b8';
    var COL = { A: '#ef4444', T: '#22c55e', G: '#3b82f6', C: '#eab308' };
    function txt(x, y, t, s, w, f, a) { return '<text x="' + x + '" y="' + y + '" text-anchor="' + (a || 'middle') + '" font-family="inherit" font-size="' + (s || 12) + '" font-weight="' + (w || 500) + '" fill="' + (f || INK) + '">' + t + '</text>'; }
    var s = '<svg viewBox="0 0 760 360" width="760" height="360" style="' + FIG + '" role="img" aria-label="La structure de l\'ADN : deux brins reliés par les bases azotées appariées A-T et C-G, formant une double hélice.">';
    s += txt(380, 26, "La structure de l'ADN", 16, 800, '#7c3aed');
    var x0 = 80, x1 = 400, yt = 138, yb = 246;
    s += '<line x1="' + x0 + '" y1="' + yt + '" x2="' + x1 + '" y2="' + yt + '" stroke="' + OR + '" stroke-width="9" stroke-linecap="round"/>';
    s += '<line x1="' + x0 + '" y1="' + yb + '" x2="' + x1 + '" y2="' + yb + '" stroke="' + OR + '" stroke-width="9" stroke-linecap="round"/>';
    [100, 160, 220, 280, 340, 400].forEach(function (nx) { s += '<circle cx="' + nx + '" cy="' + yt + '" r="5.5" fill="' + PH + '"/><circle cx="' + nx + '" cy="' + yb + '" r="5.5" fill="' + PH + '"/>'; });
    var rungs = [[120, 'T', 'A', 'Thymine', 'Adénine'], [200, 'G', 'C', 'Guanine', 'Cytosine'], [280, 'C', 'G', 'Cytosine', 'Guanine'], [360, 'A', 'T', 'Adénine', 'Thymine']];
    rungs.forEach(function (r) {
      var rx = r[0];
      s += '<rect x="' + (rx - 11) + '" y="' + (yt + 4) + '" width="22" height="46" rx="3" fill="' + COL[r[1]] + '"/>' + txt(rx, yt + 33, r[1], 14, 800, '#fff');
      s += '<rect x="' + (rx - 11) + '" y="' + (yb - 50) + '" width="22" height="46" rx="3" fill="' + COL[r[2]] + '"/>' + txt(rx, yb - 18, r[2], 14, 800, '#fff');
      s += '<line x1="' + rx + '" y1="' + (yt - 5) + '" x2="' + rx + '" y2="104" stroke="' + LEAD + '" stroke-width="1"/>' + txt(rx, 96, r[3], 10.5, 600, INK);
      s += '<line x1="' + rx + '" y1="' + (yb + 5) + '" x2="' + rx + '" y2="286" stroke="' + LEAD + '" stroke-width="1"/>' + txt(rx, 297, r[4], 10.5, 600, INK);
    });
    s += '<line x1="400" y1="' + yb + '" x2="436" y2="' + (yb + 14) + '" stroke="' + LEAD + '" stroke-width="1"/>' + txt(440, yb + 18, 'Désoxyribose', 11, 600, INK, 'start');
    s += '<line x1="400" y1="' + yt + '" x2="436" y2="' + (yt - 14) + '" stroke="' + LEAD + '" stroke-width="1"/>' + txt(440, yt - 14, 'Phosphate', 11, 600, INK, 'start');
    var hx0 = 470, hx1 = 720, cyH = 192, amp = 46, n = 60, turns = 1.8, i, ph, a;
    var top = [], bot = [];
    for (i = 0; i <= n; i++) { a = i / n; ph = a * Math.PI * 2 * turns; var x = hx0 + a * (hx1 - hx0); top.push([x.toFixed(1), (cyH + amp * Math.sin(ph)).toFixed(1)]); bot.push([x.toFixed(1), (cyH - amp * Math.sin(ph)).toFixed(1)]); }
    function poly(p) { return p.map(function (q, k) { return (k ? 'L' : 'M') + q[0] + ' ' + q[1]; }).join(' '); }
    var bcol = [COL.T, COL.G, COL.C, COL.A, COL.T, COL.G, COL.C, COL.A];
    for (i = 4; i < n; i += 6) { s += '<line x1="' + top[i][0] + '" y1="' + top[i][1] + '" x2="' + bot[i][0] + '" y2="' + bot[i][1] + '" stroke="' + bcol[(i / 6) % bcol.length | 0] + '" stroke-width="4" stroke-linecap="round" opacity="0.9"/>'; }
    s += '<path d="' + poly(top) + '" fill="none" stroke="' + OR + '" stroke-width="6" stroke-linecap="round"/>';
    s += '<path d="' + poly(bot) + '" fill="none" stroke="#fbbf24" stroke-width="6" stroke-linecap="round"/>';
    s += txt(595, 300, 'Double hélice', 11.5, 700, '#7c3aed');
    return wrap(s + '</svg>', '<div style="display:flex;flex-wrap:wrap;gap:6px 16px;justify-content:center;margin-top:8px;font-size:12.5px;color:var(--text-secondary);">' +
      [['A', COL.A], ['T', COL.T], ['G', COL.G], ['C', COL.C]].map(function (b) { return '<span style="display:inline-flex;align-items:center;gap:5px;"><span style="width:12px;height:12px;border-radius:3px;background:' + b[1] + ';display:inline-block;"></span>' + ({ A: 'Adénine', T: 'Thymine', G: 'Guanine', C: 'Cytosine' })[b[0]] + '</span>'; }).join('') +
      '<span>· Appariement : <strong>A–T</strong> et <strong>C–G</strong></span></div>');
  })();

  // ===== CYCLE CELLULAIRE & MITOSE — séquence + graphe quantité d'ADN =====
  var SVG_MITOSE = (function () {
    var FIG = 'max-width:700px;width:100%;height:auto;background:#f8fafc;border-radius:12px;border:2px solid var(--border-subtle);padding:8px;box-shadow:0 2px 12px rgba(0,0,0,0.18);';
    var INKG = '#1f2937', AX = '#475569', GRID = '#dbe2ec', CURVE = '#7c3aed', B = '#2563eb', R = '#dc2626', CEN = '#f59e0b';
    function txt(x, y, t, s, w, f, a) { return '<text x="' + x + '" y="' + y + '" text-anchor="' + (a || 'middle') + '" font-family="inherit" font-size="' + (s || 13) + '" font-weight="' + (w || 500) + '" fill="' + (f || INKG) + '">' + t + '</text>'; }
    function chromX(x, y, sc, c) { c = c || B; return '<g transform="translate(' + x + ',' + y + ') scale(' + sc + ')">' +
      '<path d="M-8 -13 Q4 0 -8 13" fill="none" stroke="' + c + '" stroke-width="4.2" stroke-linecap="round"/>' +
      '<path d="M8 -13 Q-4 0 8 13" fill="none" stroke="' + c + '" stroke-width="4.2" stroke-linecap="round"/>' +
      '<circle r="2.6" fill="' + CEN + '"/></g>'; }
    function chromI(x, y, sc, c) { c = c || B; return '<g transform="translate(' + x + ',' + y + ') scale(' + sc + ')">' +
      '<path d="M0 -13 Q5 0 0 13" fill="none" stroke="' + c + '" stroke-width="4.2" stroke-linecap="round"/></g>'; }
    function cell(cx, cy, r) { return '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="#eef3f9" stroke="' + INKG + '" stroke-width="2"/>'; }
    function arrow(x1, x2, y) { return '<line x1="' + x1 + '" y1="' + y + '" x2="' + (x2 - 8) + '" y2="' + y + '" stroke="' + AX + '" stroke-width="2.2"/>' +
      '<path d="M' + (x2 - 9) + ' ' + (y - 5) + ' L' + x2 + ' ' + y + ' L' + (x2 - 9) + ' ' + (y + 5) + ' Z" fill="' + AX + '"/>'; }
    var s = '<svg viewBox="0 0 820 580" width="820" height="580" style="' + FIG + '" role="img" aria-label="Le cycle cellulaire et la mitose : séquence de division et graphe de la quantité d\'ADN au cours du temps.">';
    s += txt(410, 26, 'Le cycle cellulaire et la mitose', 17, 800, CURVE);
    var cy = 100;
    s += cell(72, cy, 32) + chromI(64, cy - 2, 1, B) + chromI(84, cy + 4, 0.7, R);
    s += arrow(108, 168, cy) + txt(138, cy + 30, 'Réplication', 10.5, 600, AX) + txt(138, cy + 42, "de l'ADN", 10.5, 600, AX);
    s += cell(200, cy, 32) + chromX(192, cy - 2, 1, B) + chromX(212, cy + 4, 0.72, R);
    s += arrow(236, 300, cy);
    s += txt(432, 48, 'Mitose', 13, 800, CURVE);
    s += cell(352, cy, 48);
    s += '<g stroke="' + AX + '" stroke-width="1" opacity="0.6" fill="none">' +
      '<path d="M308 100 Q352 58 396 100"/><path d="M308 100 Q352 142 396 100"/>' +
      '<line x1="310" y1="100" x2="352" y2="84"/><line x1="310" y1="100" x2="352" y2="116"/>' +
      '<line x1="394" y1="100" x2="352" y2="84"/><line x1="394" y1="100" x2="352" y2="116"/></g>';
    s += '<circle cx="308" cy="100" r="3" fill="' + AX + '"/><circle cx="396" cy="100" r="3" fill="' + AX + '"/>';
    s += chromX(352, 82, 0.9, B) + chromX(352, 118, 0.75, R);
    s += txt(352, 162, 'Métaphase', 10.5, 600, AX);
    s += arrow(404, 462, cy);
    s += '<path d="M512 53 a47 47 0 0 1 0 94 q-16 -10 -16 -47 q0 -37 16 -47 Z" fill="#eef3f9" stroke="' + INKG + '" stroke-width="2"/>';
    s += '<path d="M512 53 a47 47 0 0 0 0 94 q16 -10 16 -47 q0 -37 -16 -47 Z" fill="#eef3f9" stroke="' + INKG + '" stroke-width="2"/>';
    s += chromI(490, 86, 0.8, B) + chromI(498, 116, 0.62, R) + chromI(534, 86, 0.8, B) + chromI(526, 116, 0.62, R);
    s += txt(512, 162, 'Anaphase', 10.5, 600, AX);
    s += arrow(566, 636, cy);
    s += txt(752, 94, 'Deux cellules', 11, 700, INKG) + txt(752, 108, 'identiques', 11, 700, INKG);
    s += cell(665, 74, 26) + chromI(659, 72, 0.78, B) + chromI(673, 78, 0.55, R);
    s += cell(665, 132, 26) + chromI(659, 130, 0.78, B) + chromI(673, 136, 0.55, R);
    s += '<line x1="40" y1="196" x2="780" y2="196" stroke="' + GRID + '" stroke-width="1.5"/>';
    var ox = 92, base = 462, u = 86;
    function tx(h) { return ox + h * (680 / 24); }
    function vy(v) { return base - v * u; }
    s += '<line x1="' + ox + '" y1="' + vy(1) + '" x2="' + tx(24) + '" y2="' + vy(1) + '" stroke="' + GRID + '" stroke-width="1" stroke-dasharray="4 4"/>';
    s += '<line x1="' + ox + '" y1="' + vy(2) + '" x2="' + tx(24) + '" y2="' + vy(2) + '" stroke="' + GRID + '" stroke-width="1" stroke-dasharray="4 4"/>';
    s += '<line x1="' + ox + '" y1="248" x2="' + ox + '" y2="' + base + '" stroke="' + AX + '" stroke-width="2"/>';
    s += '<line x1="' + ox + '" y1="' + base + '" x2="' + (tx(24) + 14) + '" y2="' + base + '" stroke="' + AX + '" stroke-width="2"/>';
    s += '<path d="M' + (tx(24) + 14) + ' ' + (base - 4) + ' L' + (tx(24) + 22) + ' ' + base + ' L' + (tx(24) + 14) + ' ' + (base + 4) + ' Z" fill="' + AX + '"/>';
    s += '<path d="M' + (ox - 4) + ' 252 L' + ox + ' 244 L' + (ox + 4) + ' 252 Z" fill="' + AX + '"/>';
    s += txt(ox - 12, base + 4, '0', 12, 500, AX, 'end') + txt(ox - 12, vy(1) + 4, '1', 12, 600, AX, 'end') + txt(ox - 12, vy(2) + 4, '2', 12, 600, AX, 'end');
    s += '<text transform="translate(34 ' + (vy(1)) + ') rotate(-90)" text-anchor="middle" font-family="inherit" font-size="12.5" font-weight="700" fill="' + INKG + '">Quantité d\'ADN (UA)</text>';
    var h, gx;
    for (h = 0; h <= 24; h += 2) { gx = tx(h); s += '<line x1="' + gx + '" y1="' + base + '" x2="' + gx + '" y2="' + (base + 4) + '" stroke="' + AX + '" stroke-width="1.5"/>' + txt(gx, base + 17, h, 10.5, 500, AX); }
    s += txt(tx(24) + 6, base + 34, 'Temps (heures)', 12, 700, INKG, 'end');
    var pts = [[0, 2], [1.5, 2], [2.5, 1], [9, 1], [15, 2], [20, 2], [21, 2], [22, 1], [24, 1]];
    var dpath = pts.map(function (p, i) { return (i ? 'L' : 'M') + tx(p[0]).toFixed(1) + ' ' + vy(p[1]).toFixed(1); }).join(' ');
    s += '<path d="' + dpath + '" fill="none" stroke="' + CURVE + '" stroke-width="3.4" stroke-linejoin="round" stroke-linecap="round"/>';
    s += chromX(tx(1), vy(2) - 26, 0.82, B);
    s += chromI(tx(5.6), vy(1) - 24, 0.82, B);
    s += chromI(tx(11), vy(1.45) - 20, 0.82, B) + chromI(tx(12.4), vy(1.45) - 20, 0.5, R);
    s += chromX(tx(17.5), vy(2) - 26, 0.82, B);
    s += chromX(tx(21), vy(2) - 26, 0.82, B);
    s += txt(tx(1), base - 8, 'M', 13, 800, INKG) + txt(tx(5.6), base - 8, 'G₁', 13, 800, INKG) + txt(tx(12), base - 8, 'S', 13, 800, INKG) + txt(tx(17.5), base - 8, 'G₂', 13, 800, INKG) + txt(tx(21), base - 8, 'M', 13, 800, INKG);
    function span(x1, x2, y, label, col) { return '<line x1="' + x1 + '" y1="' + y + '" x2="' + x2 + '" y2="' + y + '" stroke="' + col + '" stroke-width="1.6"/>' +
      '<line x1="' + x1 + '" y1="' + (y - 4) + '" x2="' + x1 + '" y2="' + (y + 4) + '" stroke="' + col + '" stroke-width="1.6"/>' +
      '<line x1="' + x2 + '" y1="' + (y - 4) + '" x2="' + x2 + '" y2="' + (y + 4) + '" stroke="' + col + '" stroke-width="1.6"/>' +
      '<rect x="' + ((x1 + x2) / 2 - 52) + '" y="' + (y - 9) + '" width="104" height="18" fill="#f8fafc"/>' +
      txt((x1 + x2) / 2, y + 4, label, 12, 700, col); }
    s += span(tx(2.5), tx(22), base + 50, 'Cycle cellulaire', CURVE);
    s += span(tx(2.5), tx(20), base + 78, 'Interphase', AX);
    return wrap(s, '<p style="text-align:center;font-size:12.5px;color:var(--text-secondary);margin-top:8px;">Pendant la phase <strong>S</strong>, l\'ADN est répliqué (quantité 1 → 2) ; la <strong>mitose (M)</strong> sépare les chromatides-sœurs → 2 cellules filles identiques (retour à 1).</p>');
  })();

  // ===== MÉIOSE — 1 cellule (2n) → 2 divisions → 4 gamètes (n) =====
  var SVG_MEIOSE = (function () {
    var FIG = 'max-width:680px;width:100%;height:auto;background:#f8fafc;border-radius:12px;border:2px solid var(--border-subtle);padding:8px;box-shadow:0 2px 12px rgba(0,0,0,0.18);';
    var INKG = '#1f2937', AX = '#475569', CURVE = '#7c3aed', B = '#2563eb', R = '#dc2626', CEN = '#f59e0b';
    function txt(x, y, t, s, w, f, a) { return '<text x="' + x + '" y="' + y + '" text-anchor="' + (a || 'middle') + '" font-family="inherit" font-size="' + (s || 12) + '" font-weight="' + (w || 500) + '" fill="' + (f || INKG) + '">' + t + '</text>'; }
    function chromX(x, y, sc, c) { c = c || B; return '<g transform="translate(' + x + ',' + y + ') scale(' + sc + ')"><path d="M-7 -12 Q4 0 -7 12" fill="none" stroke="' + c + '" stroke-width="4" stroke-linecap="round"/><path d="M7 -12 Q-4 0 7 12" fill="none" stroke="' + c + '" stroke-width="4" stroke-linecap="round"/><circle r="2.3" fill="' + CEN + '"/></g>'; }
    function chromI(x, y, sc, c) { c = c || B; return '<g transform="translate(' + x + ',' + y + ') scale(' + sc + ')"><path d="M0 -12 Q5 0 0 12" fill="none" stroke="' + c + '" stroke-width="4" stroke-linecap="round"/></g>'; }
    function cell(cx, cy, r) { return '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="#eef3f9" stroke="' + INKG + '" stroke-width="1.8"/>'; }
    function arr(x1, y1, x2, y2) { var ang = Math.atan2(y2 - y1, x2 - x1); var hx = x2 - 7 * Math.cos(ang), hy = y2 - 7 * Math.sin(ang); return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + hx + '" y2="' + hy + '" stroke="' + AX + '" stroke-width="2"/><circle cx="' + x2 + '" cy="' + y2 + '" r="2.2" fill="' + AX + '"/>'; }
    var s = '<svg viewBox="0 0 660 470" width="660" height="470" style="' + FIG + '" role="img" aria-label="La méiose : une cellule diploïde 2n subit deux divisions et donne quatre gamètes haploïdes n.">';
    s += txt(330, 24, 'La méiose : 2n → 4 gamètes (n)', 16, 800, CURVE);
    // cellule mère 2n (2 paires d'homologues dédoublés)
    s += cell(330, 80, 34) + chromX(316, 76, 0.9, B) + chromX(344, 76, 0.9, B) + chromX(322, 92, 0.7, R) + chromX(338, 92, 0.7, R);
    s += txt(398, 84, '2n', 13, 800, INKG, 'start');
    s += txt(330, 122, '1ʳᵉ division (réductionnelle)', 11, 700, CURVE);
    // → 2 cellules n (homologues séparés)
    s += arr(312, 110, 215, 150) + arr(348, 110, 445, 150);
    s += cell(190, 185, 28) + chromX(182, 182, 0.85, B) + chromX(196, 192, 0.62, R);
    s += cell(470, 185, 28) + chromX(462, 182, 0.85, B) + chromX(476, 192, 0.62, R);
    s += txt(190, 226, 'n', 12, 800, INKG) + txt(470, 226, 'n', 12, 800, INKG);
    s += txt(330, 250, '2ᵉ division (comme une mitose)', 11, 700, CURVE);
    // → 4 gamètes n (chromatides séparées)
    s += arr(176, 213, 110, 300) + arr(206, 213, 270, 300) + arr(456, 213, 392, 300) + arr(486, 213, 552, 300);
    [110, 270, 392, 552].forEach(function (gx, i) {
      s += cell(gx, 335, 24) + chromI(gx - 6, 332, 0.8, B) + chromI(gx + 6, 340, 0.58, R);
      s += txt(gx, 372, 'n', 12, 800, INKG);
    });
    s += txt(330, 410, '4 cellules filles = gamètes (spermatozoïdes ou ovules)', 12, 700, INKG);
    s += txt(330, 432, 'Chaque gamète a moitié moins de chromosomes (n)', 11, 500, AX);
    return wrap(s + '</svg>', '');
  })();

  var sections = {};

  sections.synthese = `<div id="synthese" class="section active">
    <div style="text-align:center; margin-bottom:1.5rem;">
      <h2 style="font-size:30px; font-weight:800; color:var(--color-nav); margin:0;">🧬 Biologie</h2>
      <p style="color:var(--text-secondary); margin-top:6px;">La structure du vivant, les biomolécules, la division cellulaire & la génétique</p>
    </div>

    <div style="background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:14px; padding:1rem 1.1rem; margin-bottom:1.6rem;">
      <div style="font-weight:800; color:var(--color-nav); font-size:16px; margin-bottom:.7rem;">🧭 Le fil rouge — d'une cellule à un nouvel individu</div>
      <div style="display:flex; flex-direction:column; gap:.55rem; font-size:14px; color:var(--text-primary); line-height:1.5;">
        <div><strong>1.</strong> 🧬 L'<strong>ADN est copié</strong> (phase S) — appariement <strong>A–T</strong> et <strong>C–G</strong>.</div>
        <div><strong>2.</strong> ➗ La cellule se <strong>divise</strong>, de deux façons :</div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:.5rem;">
          <div style="background:rgba(96,165,250,0.12); border-radius:8px; padding:.55rem .65rem;"><strong style="color:#60a5fa;">🔵 MITOSE</strong><br>2 cellules <strong>identiques</strong> (2n → 2n)<br><span style="color:var(--text-secondary);">le corps : croissance & réparation</span></div>
          <div style="background:rgba(196,181,253,0.12); border-radius:8px; padding:.55rem .65rem;"><strong style="color:#c4b5fd;">🟣 MÉIOSE</strong><br>4 <strong>gamètes</strong> (2n → n)<br><span style="color:var(--text-secondary);">la reproduction : ovules, spermatozoïdes</span></div>
        </div>
        <div><strong>3.</strong> 💞 <strong>Fécondation</strong> : n + n → <strong>2n</strong> (la cellule-œuf).</div>
        <div><strong>4.</strong> 🧪 <strong>Génétique</strong> (Mendel) : gènes & allèles, <strong>dominant / récessif</strong>, Aa × Aa → <strong>3 : 1</strong>.</div>
      </div>
    </div>

    <div class="synth-section">
      <h2>1. La structure du vivant</h2>
      <p>Le vivant est organisé en <strong>niveaux emboîtés</strong>, du plus petit au plus grand. Chaque niveau est constitué de plusieurs éléments du niveau précédent :</p>
      <div style="display:flex; flex-wrap:wrap; gap:5px; align-items:center; margin:0.8rem 0; font-size:12.5px;">
        ${['Atome', 'Molécule', 'Organite', 'Cellule', 'Tissu', 'Organe', 'Système', 'Organisme', 'Population', 'Communauté', 'Écosystème'].map(function (n, i, a) {
          return '<span style="background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:8px; padding:5px 9px; font-weight:600; color:var(--text-primary);">' + n + '</span>' + (i < a.length - 1 ? '<span style="color:var(--color-nav); font-weight:800;">→</span>' : '');
        }).join('')}
      </div>
      <p>La <strong>cellule</strong> est l'<strong>unité de base</strong> de tout être vivant. On distingue deux grands types :</p>
      <ul style="line-height:2;">
        <li><strong>Cellule procaryote</strong> (ex. une <strong>bactérie</strong>, ~2 µm) : <strong>pas de noyau</strong> ; l'ADN (information génétique) flotte <strong>librement</strong> dans le cytoplasme. Peu d'organites.</li>
        <li><strong>Cellule eucaryote</strong> (cellule <strong>animale</strong>, <strong>végétale</strong>, de <strong>champignon</strong>) : possède un <strong>noyau</strong> et d'autres <strong>organites limités par une membrane</strong>.</li>
      </ul>
      <p style="margin-top:1rem;"><strong>Les organites de la cellule animale et leur fonction :</strong></p>
      <ul style="line-height:2;">
        <li><strong>Noyau</strong> : contient l'<strong>ADN</strong> ; entouré d'une membrane nucléaire percée de <strong>pores</strong>.</li>
        <li><strong>Membrane plasmique</strong> : limite la cellule et contrôle les <strong>échanges</strong>.</li>
        <li><strong>Cytoplasme</strong> : milieu où baignent les organites.</li>
        <li><strong>Ribosomes</strong> : fabriquent les <strong>protéines</strong>.</li>
        <li><strong>Réticulum endoplasmique</strong> : <strong>rugueux</strong> (couvert de ribosomes → protéines) ou <strong>lisse</strong> (lipides).</li>
        <li><strong>Appareil de Golgi</strong> : <strong>modifie</strong> et <strong>expédie</strong> les protéines.</li>
        <li><strong>Lysosomes</strong> : contiennent des <strong>enzymes</strong> qui <strong>digèrent</strong> (décomposent) les déchets.</li>
        <li><strong>Mitochondries</strong> : produisent l'<strong>énergie</strong> (respiration cellulaire).</li>
      </ul>
      <p>La cellule <strong>végétale</strong> possède en plus : une <strong>paroi</strong>, des <strong>chloroplastes</strong> (photosynthèse) et une grande <strong>vacuole</strong>.</p>
      <div class="simple-exp-box">
        <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Comprendre simplement</button>
        <div class="simple-exp-content">Imagine des poupées russes : un <strong>atome</strong> est minuscule, on les assemble en <strong>molécules</strong>, puis en <strong>organites</strong>, qui forment une <strong>cellule</strong>, et ainsi de suite jusqu'à l'<strong>écosystème</strong>. La cellule est la plus petite « brique » vivante. Une bactérie n'a pas de noyau (procaryote) ; nos cellules en ont un (eucaryote).</div>
      </div>
    </div>

    <div class="synth-section">
      <h2>2. Les molécules du vivant (biomolécules)</h2>
      <p>Le corps est fait de molécules <strong>inorganiques</strong> et <strong>organiques</strong> (à base de <strong>carbone</strong>).</p>
      <ul style="line-height:2;">
        <li><strong>L'eau</strong> (inorganique) : c'est la molécule la plus abondante du vivant. Elle est le <strong>solvant</strong> de la vie et sert au <strong>transport</strong> des substances. Sa proportion varie selon l'âge et le sexe.</li>
        <li><strong>Les glucides</strong> (sucres, ex. le <strong>glucose</strong>) : principale source d'<strong>énergie rapide</strong>.</li>
        <li><strong>Les lipides</strong> : <strong>réserve d'énergie</strong> et isolant. Un <strong>triglycéride</strong> = <strong>glycérol + 3 acides gras</strong>. Les <strong>phospholipides</strong> (tête <strong>hydrophile</strong> / queue <strong>hydrophobe</strong>) forment les <strong>membranes</strong>.</li>
        <li><strong>Les protéines</strong> : les molécules organiques les plus complexes. Elles sont faites d'<strong>acides aminés</strong> (<strong>20 différents</strong>) reliés en une <strong>chaîne polypeptidique</strong>. Chaque acide aminé porte une fonction <strong>amine (–NH₂)</strong> et une fonction <strong>acide carboxylique (–COOH)</strong>. Rôles : structure, <strong>enzymes</strong>, transport.</li>
        <li><strong>Les acides nucléiques</strong> (<strong>ADN</strong>, ARN) : portent l'<strong>information génétique</strong> (voir chapitre suivant).</li>
      </ul>
      <div class="simple-exp-box">
        <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Comprendre simplement</button>
        <div class="simple-exp-content">Les biomolécules sont les « ingrédients » du corps. L'<strong>eau</strong> mouille tout, les <strong>glucides</strong> donnent l'énergie tout de suite, les <strong>lipides</strong> stockent l'énergie, et les <strong>protéines</strong> (des colliers d'<strong>acides aminés</strong>) construisent et font travailler la cellule.</div>
      </div>
    </div>

    <div class="synth-section">
      <h2>3. Le cycle cellulaire & la réplication de l'ADN</h2>
      <p>Une cellule passe par un <strong>cycle</strong> : elle grandit, <strong>copie son ADN</strong>, puis se divise. Les phases se suivent toujours dans le même ordre : <strong>G1, S, G2</strong> (l'<strong>interphase</strong>) puis <strong>M</strong> (la <strong>mitose</strong>).</p>
      <div style="display:flex; flex-wrap:wrap; gap:6px; align-items:center; margin:1rem 0; font-size:13px;">
        ${['G1 (croissance)', 'S (copie de l\'ADN)', 'G2 (préparation)', 'Mitose (M)'].map(function (n, i, a) {
          return '<span style="background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:8px; padding:6px 10px; font-weight:600; color:var(--text-primary);">' + n + '</span>' + (i < a.length - 1 ? '<span style="color:var(--color-nav); font-weight:800;">→</span>' : '');
        }).join('')}
      </div>
      <ul style="line-height:2;">
        <li><strong>Interphase</strong> (G1 + S + G2) : la phase la plus longue ; la cellule grandit et <strong>réplique son ADN</strong> (pendant la phase S, la quantité d'ADN passe de 1 à 2).</li>
        <li><strong>G0</strong> : une cellule peut sortir du cycle et se mettre « au repos » (pas de division).</li>
      </ul>
      <div style="text-align:center; margin:0.8rem 0;">${SVG_MITOSE}</div>
      <p style="margin-top:1rem;"><strong>La réplication de l'ADN</strong> (phase S) : l'<strong>ADN polymérase</strong> ouvre la double hélice. Chaque brin sert de <strong>modèle</strong> ; des <strong>nucléotides libres</strong> se placent en face par <strong>complémentarité</strong> des bases (A–T, C–G). On obtient <strong>2 molécules d'ADN identiques</strong>.</p>
      <div style="text-align:center; margin:0.5rem 0;">${SVG_DNA}</div>
      <div class="simple-exp-box">
        <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Comprendre simplement</button>
        <div class="simple-exp-content">Avant de se couper en deux, la cellule <strong>photocopie</strong> tout son ADN (phase S) pour que les 2 futures cellules aient chacune la copie complète. La machine qui photocopie, c'est l'<strong>ADN polymérase</strong>, et elle respecte toujours les paires A–T et C–G.</div>
      </div>
    </div>

    <div class="synth-section">
      <h2>4. La mitose</h2>
      <p>La <strong>mitose</strong> divise une cellule en <strong>2 cellules filles identiques</strong> à la cellule mère (même ADN). Elle sert à la <strong>croissance</strong> et à la <strong>réparation</strong> des tissus. Quand l'ADN se condense, chaque chromosome dédoublé a une forme en <strong>X</strong> : 2 <strong>chromatides-sœurs</strong> reliées par le <strong>centromère</strong>.</p>
      <div style="display:flex; flex-wrap:wrap; gap:6px; align-items:center; margin:0.6rem 0 1rem; font-size:13px;">
        ${['Prophase', 'Métaphase', 'Anaphase', 'Télophase'].map(function (n, i, a) {
          return '<span style="background:rgba(167,139,250,0.12); border:1px solid var(--color-nav); border-radius:8px; padding:6px 10px; font-weight:600; color:var(--color-nav);">' + n + '</span>' + (i < a.length - 1 ? '<span style="color:var(--color-nav); font-weight:800;">→</span>' : '');
        }).join('')}
      </div>
      <ul style="line-height:2;">
        <li><strong>Prophase</strong> : les chromosomes se condensent (deviennent visibles), l'enveloppe du noyau disparaît, le fuseau se forme.</li>
        <li><strong>Métaphase</strong> : les chromosomes s'<strong>alignent au milieu</strong> de la cellule (plaque équatoriale).</li>
        <li><strong>Anaphase</strong> : les <strong>chromatides-sœurs se séparent</strong> et partent vers les deux pôles opposés.</li>
        <li><strong>Télophase</strong> : deux nouveaux noyaux se forment ; la cellule se prépare à se couper.</li>
        <li>Puis le <strong>partage du cytoplasme</strong> (<strong>cytodiérèse</strong>) → 2 cellules filles.</li>
      </ul>
      <div class="simple-exp-box">
        <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Moyen mnémo</button>
        <div class="simple-exp-content"><strong>P-M-A-T</strong> : la cellule <strong>P</strong>répare, <strong>M</strong> met au milieu, <strong>A</strong> sépare, <strong>T</strong> termine. Résultat : 2 cellules <strong>identiques</strong> (2n → 2n, le nombre de chromosomes ne change pas).</div>
      </div>
      <div class="bio-anim-host">
        <div class="bio-anim-title">🎬 La mitose étape par étape — clique « Suivant ▶ » (ou « Auto »)</div>
        <div id="bio-mito-anim"></div>
      </div>
      <div class="bio-explain">
        <strong>💡 La mitose en clair.</strong> Avant de se diviser, la cellule a <strong>copié tout son ADN</strong> : chaque chromosome est dédoublé (forme en <strong>X</strong> = 2 chromatides-sœurs identiques, reliées par le centromère). En <strong>une seule division</strong> (P → M → A → T), elle sépare les 2 chromatides de chaque chromosome et les répartit dans deux cellules. Résultat : <strong>2 cellules filles strictement identiques</strong> à la cellule mère (2n → 2n).
        <span class="exam-tip">🎯 Pour l'exam : <strong>1</strong> division · <strong>2</strong> cellules · <strong>identiques</strong> · sert à <strong>grandir &amp; réparer</strong>.</span>
      </div>
    </div>

    <div class="synth-section">
      <h2>5. Le caryotype & la ploïdie</h2>
      <p>Le <strong>caryotype</strong> est la « photo » des chromosomes d'une cellule, <strong>classés par paires</strong> (du plus grand au plus petit). Chez l'humain : <strong>23 paires</strong> = <strong>46 chromosomes</strong>.</p>
      <ul style="line-height:2;">
        <li><strong>Autosomes</strong> : les 22 premières paires (chromosomes « ordinaires »).</li>
        <li><strong>Gonosomes</strong> : la paire sexuelle → <strong>XX</strong> (femme) ou <strong>XY</strong> (homme).</li>
        <li><strong>2n (diploïde)</strong> : les chromosomes vont par <strong>paires</strong> (cellules du corps). <strong>n (haploïde)</strong> : un seul de chaque paire (les <strong>gamètes</strong>).</li>
      </ul>
      <div class="key-rule"><p class="note">Humain : <strong>2n = 46</strong> · gamètes <strong>n = 23</strong>. Le chimpanzé a 2n = 48 : des espèces proches ont des caryotypes ressemblants.</p></div>
      <div class="simple-exp-box">
        <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Comprendre simplement</button>
        <div class="simple-exp-content">« 2n » veut dire que tu as <strong>2 exemplaires</strong> de chaque chromosome (un du père, un de la mère). Les gamètes (spermatozoïde, ovule) n'en ont qu'<strong>un seul</strong> exemplaire : ils sont « n ». Comme ça, à la fécondation, n + n redonne 2n.</div>
      </div>
    </div>

    <div class="synth-section">
      <h2>6. La méiose</h2>
      <p>La <strong>méiose</strong> fabrique les <strong>gamètes</strong> (spermatozoïdes, ovules). À partir d'<strong>une</strong> cellule (2n), elle réalise <strong>2 divisions successives</strong> et donne <strong>4 cellules</strong> à <strong>n</strong> chromosomes (deux fois moins).</p>
      <div style="text-align:center; margin:0.8rem 0;">${SVG_MEIOSE}</div>
      <div class="bio-anim-host">
        <div class="bio-anim-title">🎬 La méiose étape par étape — 2 divisions → 4 gamètes (n)</div>
        <div id="bio-meio-anim"></div>
      </div>
      <div class="bio-explain">
        <strong>💡 La méiose en clair.</strong> Elle sert à fabriquer les <strong>gamètes</strong> (spermatozoïdes, ovules). À partir d'une cellule <strong>2n</strong>, il y a <strong>2 divisions à la suite</strong> → <strong>4 cellules à n</strong> (deux fois moins de chromosomes).
        <br><strong>⚠️ LA différence avec la mitose</strong> : à la <strong>1ʳᵉ division</strong>, on sépare les <strong>chromosomes homologues</strong> (les 2 d'une même paire : un du père, un de la mère) — c'est ça qui fait passer de <strong>2n à n</strong>. À la <strong>2ᵉ division</strong> (comme une mitose), on sépare enfin les <strong>chromatides-sœurs</strong>.
        <span class="exam-tip">🎯 Pour l'exam : <strong>2</strong> divisions · <strong>4</strong> gamètes · <strong>2n → n</strong> · <strong>homologues</strong> séparés en 1ʳᵉ division · chaque gamète <strong>unique</strong> (brassage).</span>
      </div>
      <ul style="line-height:2;">
        <li><strong>1ʳᵉ division (réductionnelle)</strong> : on sépare les <strong>chromosomes homologues</strong> → on passe de <strong>2n à n</strong>.</li>
        <li><strong>2ᵉ division</strong> : comme une mitose, on sépare les <strong>chromatides</strong> → 4 cellules à n.</li>
        <li>La méiose est une grande source de <strong>variabilité</strong> (brassage) : chaque gamète est unique.</li>
      </ul>
      <div class="bio-compare-wrap">
        <table class="bio-compare">
          <thead><tr><th>Critère</th><th class="c-mito">🔵 Mitose</th><th class="c-meio">🟣 Méiose</th></tr></thead>
          <tbody>
            <tr><td>Nombre de divisions</td><td>1 division</td><td><strong>2</strong> divisions successives</td></tr>
            <tr><td>Cellules filles</td><td><strong>2</strong> cellules</td><td><strong>4</strong> cellules</td></tr>
            <tr><td>Chromosomes</td><td>2n → <strong>2n</strong> (inchangé)</td><td>2n → <strong>n</strong> (divisé par 2)</td></tr>
            <tr><td>Cellules obtenues</td><td><strong>identiques</strong> à la mère</td><td><strong>différentes</strong> (chacune unique)</td></tr>
            <tr><td>À l'anaphase, on sépare…</td><td>les chromatides-sœurs</td><td>division 1 : les chromosomes homologues</td></tr>
            <tr><td>À quoi ça sert</td><td>croissance & réparation</td><td>fabriquer les gamètes (reproduction)</td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="synth-section">
      <h2>7. La fécondation</h2>
      <p>La <strong>fécondation</strong> est la <strong>fusion</strong> d'un gamète mâle (spermatozoïde, n) et d'un gamète femelle (ovule, n). Elle forme la <strong>cellule-œuf</strong> (zygote) à <strong>2n</strong> chromosomes.</p>
      <div class="key-rule"><div class="formula-main" style="font-size:18px;">gamète (n) + gamète (n) → cellule-œuf (2n)</div></div>
      <ul style="line-height:2;">
        <li>La fécondation <strong>rétablit</strong> le nombre de chromosomes de l'espèce (2n).</li>
        <li>Comme la rencontre des gamètes se fait <strong>au hasard</strong>, chaque enfant est <strong>unique</strong>.</li>
      </ul>
      <div class="simple-exp-box">
        <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Comprendre simplement</button>
        <div class="simple-exp-content">La méiose <strong>divise par 2</strong> (2n → n) pour faire les gamètes, et la fécondation <strong>remet ×2</strong> (n + n → 2n). C'est l'équilibre : sinon le nombre de chromosomes doublerait à chaque génération !</div>
      </div>
    </div>

    <div class="synth-section">
      <h2>8. Le monohybridisme (Mendel)</h2>
      <figure class="hfig hfig-float" style="max-width:140px"><img src="mendel.jpg" alt="Gregor Mendel" loading="lazy"><figcaption>Gregor Mendel (1822-1884), le père de la génétique</figcaption></figure>
      <p>Le <strong>monohybridisme</strong> = l'étude de la transmission d'<strong>un seul</strong> caractère. <strong>Mendel</strong> l'a étudié en croisant des <strong>petits pois</strong>.</p>
      <p><strong>Vocabulaire essentiel :</strong></p>
      <ul style="line-height:1.9;">
        <li><strong>Gène</strong> : portion d'ADN qui détermine un caractère. <strong>Allèle</strong> : une version d'un gène (on en a 2, un par parent).</li>
        <li><strong>Dominant</strong> (MAJUSCULE, A) : s'exprime même seul. <strong>Récessif</strong> (minuscule, a) : seulement si <strong>aa</strong>.</li>
        <li><strong>Homozygote</strong> : 2 allèles identiques (AA ou aa) = <strong>lignée pure</strong>. <strong>Hétérozygote</strong> : 2 différents (Aa).</li>
        <li><strong>Génotype</strong> : les allèles (AA, Aa, aa). <strong>Phénotype</strong> : ce qu'on voit.</li>
      </ul>
      <p>Expérience de Mendel : pois lisse pur (AA) × pois ridé pur (aa) → en <strong>F1</strong> tous lisses (<strong>Aa</strong>). On croise F1 × F1 → en <strong>F2</strong> le ridé réapparaît !</p>
      <div class="key-rule"><div class="formula-main" style="font-size:16px;">Aa × Aa → 1 AA : 2 Aa : 1 aa (génotype) → 3 dominants : 1 récessif (phénotype)</div></div>
      <div class="bio-explain">
        <strong>💡 Comment lire un croisement (exemple Aa × Aa).</strong>
        <br><strong>1.</strong> Chaque parent <strong>Aa</strong> fabrique 2 sortes de gamètes : <strong>A</strong> et <strong>a</strong> (à la méiose, les 2 allèles se séparent).
        <br><strong>2.</strong> On croise dans l'échiquier : A+A = <strong>AA</strong>, A+a = <strong>Aa</strong>, a+A = <strong>Aa</strong>, a+a = <strong>aa</strong> → on obtient <strong>1 AA · 2 Aa · 1 aa</strong> (rapport génotypique <strong>1 : 2 : 1</strong>).
        <br><strong>3.</strong> Le <strong>phénotype</strong> (ce qu'on voit) : AA et Aa montrent le caractère <strong>dominant</strong> (A masque a) ; seul <strong>aa</strong> montre le récessif → <strong>3 dominants : 1 récessif</strong>.
        <span class="exam-tip">🎯 Entraîne-toi avec le <strong>Simulateur de croisement</strong> (onglet Exercices) : change les parents, la grille se remplit toute seule.</span>
      </div>
      <div class="simple-exp-box">
        <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 L'échiquier de Punnett</button>
        <div class="simple-exp-content">Pour trouver les enfants possibles, on croise les allèles dans un tableau (échiquier de Punnett). Aa × Aa donne 1 AA, 2 Aa et 1 aa → on voit <strong>3</strong> individus au caractère dominant pour <strong>1</strong> au caractère récessif. Essaie-le dans l'onglet <strong>Exercices</strong> !</div>
      </div>
    </div>
  </div>`;

  sections.formules = `<div id="formules" class="section">
    <h2 style="font-size:30px; font-weight:800; color:var(--color-nav); margin-bottom:1.2rem;">📌 À retenir — l'essentiel</h2>
    <div class="grid2">
      <div>
        <div class="formula-box"><h3>Cycle cellulaire</h3><p class="note">Interphase (<strong>G1 → S → G2</strong>) puis <strong>mitose (M)</strong>. L'ADN est copié en <strong>phase S</strong> (quantité 1 → 2).</p></div>
        <div class="formula-box"><h3>Réplication de l'ADN</h3><p class="note"><strong>ADN polymérase</strong> · chaque brin sert de modèle · complémentarité <strong>A–T</strong> et <strong>C–G</strong> · 2 molécules identiques.</p></div>
        <div class="formula-box"><h3>Mitose</h3><p class="note"><strong>P-M-A-T</strong> → <strong>2 cellules identiques</strong> (2n → 2n). Croissance & réparation. Cytodiérèse = partage du cytoplasme.</p></div>
      </div>
      <div>
        <div class="formula-box"><h3>Caryotype & ploïdie</h3><p class="note">Humain : <strong>23 paires = 46</strong> (2n). Autosomes (22 paires) + gonosomes (<strong>XX</strong>/<strong>XY</strong>). Gamètes = <strong>n = 23</strong>.</p></div>
        <div class="formula-box"><h3>Méiose</h3><p class="note">1 cellule (2n) → <strong>2 divisions</strong> → <strong>4 gamètes (n)</strong>. Réduit de moitié (2n → n) + brassage.</p></div>
        <div class="formula-box"><h3>Fécondation & Mendel</h3><p class="note">n + n → <strong>2n</strong> (cellule-œuf). Aa × Aa → <strong>3 dominants : 1 récessif</strong>.</p></div>
      </div>
    </div>
  </div>`;

  sections.methodes = `<div id="methodes" class="section">
    <h2 style="font-size:30px; font-weight:800; color:var(--color-nav); margin-bottom:1rem;">📝 Méthodes</h2>
    <div class="methods-tabs">
      <button class="mtab on" onclick="showMethod('bm1', this)">Mitose ou méiose ?</button>
      <button class="mtab" onclick="showMethod('bm2', this)">Faire un échiquier de Punnett</button>
    </div>
    <div id="bm1" class="method-content on">
      <div class="formula-box"><h3>Méthode — Reconnaître mitose ou méiose</h3></div>
      <div class="step-list">
        <div class="step-item"><div class="step-num">1</div><div class="step-text">Combien de cellules filles à la fin ? <strong>2</strong> → mitose · <strong>4</strong> → méiose.
          <button class="why-btn" onclick="toggleWhyMethod(this)">💡 Pourquoi cette étape ?</button>
          <div class="why-content">La méiose enchaîne 2 divisions, donc elle donne 4 cellules ; la mitose n'en fait qu'une, donc 2 cellules.</div>
        </div></div>
        <div class="step-item"><div class="step-num">2</div><div class="step-text">Le nombre de chromosomes change-t-il ? <strong>Non</strong> (2n → 2n) → mitose · <strong>Oui</strong>, divisé par 2 (2n → n) → méiose.
          <button class="why-btn" onclick="toggleWhyMethod(this)">💡 Pourquoi cette étape ?</button>
          <div class="why-content">Seule la méiose est « réductionnelle » : elle sépare les chromosomes homologues pour faire des gamètes à n.</div>
        </div></div>
        <div class="step-item"><div class="step-num">3</div><div class="step-text">Cellules identiques (croissance) → mitose · gamètes différents (reproduction) → méiose.
          <button class="why-btn" onclick="toggleWhyMethod(this)">💡 Pourquoi cette étape ?</button>
          <div class="why-content">La mitose copie à l'identique ; la méiose brasse les chromosomes → chaque gamète est unique.</div>
        </div></div>
      </div>
    </div>
    <div id="bm2" class="method-content">
      <div class="formula-box"><h3>Méthode — L'échiquier de Punnett (Aa × Aa)</h3></div>
      <div class="step-list">
        <div class="step-item"><div class="step-num">1</div><div class="step-text">Écris les <strong>gamètes</strong> de chaque parent : Aa donne deux gamètes possibles, <strong>A</strong> et <strong>a</strong>.
          <button class="why-btn" onclick="toggleWhyMethod(this)">💡 Pourquoi cette étape ?</button>
          <div class="why-content">À la méiose, les 2 allèles se séparent : chaque gamète n'en reçoit qu'un seul.</div>
        </div></div>
        <div class="step-item"><div class="step-num">2</div><div class="step-text">Croise les gamètes dans le tableau : tu obtiens <strong>AA, Aa, Aa, aa</strong>.
          <button class="why-btn" onclick="toggleWhyMethod(this)">💡 Pourquoi cette étape ?</button>
          <div class="why-content">Chaque case = un allèle du père + un de la mère → le génotype de l'enfant possible.</div>
        </div></div>
        <div class="step-item"><div class="step-num">3</div><div class="step-text">Compte les phénotypes : <strong>3 dominants</strong> (AA + 2 Aa) pour <strong>1 récessif</strong> (aa).
          <button class="why-btn" onclick="toggleWhyMethod(this)">💡 Pourquoi cette étape ?</button>
          <div class="why-content">AA et Aa montrent le caractère dominant ; seul aa montre le caractère récessif → rapport 3 : 1.</div>
        </div></div>
      </div>
    </div>
  </div>`;

  sections.exercices = `<div id="exercices" class="section">
    <h2 style="font-size:30px; font-weight:800; color:var(--color-nav); margin-bottom:0.5rem;">✏️ Exercices guidés</h2>
    <p style="color:var(--text-secondary); margin-bottom:1.5rem;">Révèle les étapes une par une.</p>
    <div class="exercise-card">
      <h3 style="font-size:20px; font-weight:600; color:var(--color-nav); margin-bottom:0.5rem;">🎮 Mitose ou Méiose ?</h3>
      <p style="color:var(--text-secondary); margin:0 0 .8rem;">On te donne une caractéristique, tu choisis la bonne division. Correction immédiate + score &amp; série.</p>
      <button type="button" class="nav-btn" id="bmm-start">▶ Commencer le jeu</button>
      <div id="bio-mm" class="bmm-mount"></div>
    </div>
    <div class="exercise-card">
      <h3 style="font-size:20px; font-weight:600; color:var(--color-nav); margin-bottom:0.5rem;">🧬 L'échiquier de Punnett — pois lisse (A) × ridé (a)</h3>
      <p style="color:var(--text-secondary); margin-bottom:0.8rem;">On croise deux pois hétérozygotes (génotype <strong>Aa</strong>). Écris le génotype de chaque case (ex. « Aa »), puis clique sur <strong>Corriger</strong>.</p>
      <table class="punnett">
        <tr><th class="corner">Aa × Aa</th><th>A</th><th>a</th></tr>
        <tr><th>A</th><td><input data-pa="AA" aria-label="case 1" autocomplete="off" spellcheck="false"></td><td><input data-pa="Aa" aria-label="case 2" autocomplete="off" spellcheck="false"></td></tr>
        <tr><th>a</th><td><input data-pa="Aa" aria-label="case 3" autocomplete="off" spellcheck="false"></td><td><input data-pa="aa" aria-label="case 4" autocomplete="off" spellcheck="false"></td></tr>
      </table>
      <div class="lblexo-foot"><button class="step-btn" onclick="checkPunnett(this)">✓ Corriger</button>
      <button class="step-btn" onclick="resetPunnett(this)" style="background:transparent; color:var(--color-nav); border:1px solid var(--color-nav);">↻ Recommencer</button></div>
      <div class="punnett-res"></div>
    </div>
    <div class="exercise-card">
      <h3 style="font-size:20px; font-weight:600; color:var(--color-nav); margin-bottom:0.5rem;">🧬 Simulateur de croisement (monohybridisme)</h3>
      <p style="color:var(--text-secondary); margin:0 0 .8rem;">Choisis le génotype de chaque parent (<strong>A</strong> = dominant, <strong>a</strong> = récessif) et croise : la grille de Punnett se remplit et te donne les rapports génotype &amp; phénotype.</p>
      <div id="bio-cross">
        <div class="bio-cross-pick">
          <span>Parent 1 :</span>
          <select class="bio-cross-p" data-p="1" aria-label="Génotype du parent 1"><option>AA</option><option selected>Aa</option><option>aa</option></select>
          <span style="font-weight:800; color:var(--color-nav);">×</span>
          <span>Parent 2 :</span>
          <select class="bio-cross-p" data-p="2" aria-label="Génotype du parent 2"><option>AA</option><option selected>Aa</option><option>aa</option></select>
          <button type="button" class="nav-btn bio-cross-go">Croiser ▶</button>
        </div>
        <div class="bio-cross-out"></div>
      </div>
    </div>
    <div class="exercise-card">
      <h3 style="font-size:20px; font-weight:600; color:var(--color-nav); margin-bottom:0.5rem;">🔬 Mitose : remettre les phases dans l'ordre</h3>
      <div style="background:rgba(167,139,250,0.06); border-radius:8px; padding:1rem; margin-bottom:1rem;"><p><strong>Énoncé :</strong> dans quel ordre se déroulent ces phases : Anaphase, Prophase, Télophase, Métaphase ?</p></div>
      <button class="step-btn" onclick="showExerciseStep(this, 321)">▶ Indice</button>
      <div class="exercise-step" data-step="321"><span class="step-badge">Indice</span><p>Moyen mnémo : <strong>P-M-A-T</strong>. La cellule prépare (P), aligne (M), sépare (A), puis termine (T).</p><button class="step-btn" onclick="showExerciseStep(this, 322)">▶ Réponse</button></div>
      <div class="exercise-step" data-step="322"><span class="step-badge">Réponse</span><p><strong>Prophase → Métaphase → Anaphase → Télophase</strong> → 2 cellules filles identiques. ✅</p></div>
    </div>
    <div class="exercise-card">
      <h3 style="font-size:20px; font-weight:600; color:var(--color-nav); margin-bottom:0.5rem;">🧪 Mitose ou méiose ?</h3>
      <div style="background:rgba(167,139,250,0.06); border-radius:8px; padding:1rem; margin-bottom:1rem;"><p><strong>Énoncé :</strong> une cellule (2n = 46) donne 4 cellules à 23 chromosomes. Mitose ou méiose ?</p></div>
      <button class="step-btn" onclick="showExerciseStep(this, 331)">▶ Étape 1</button>
      <div class="exercise-step" data-step="331"><span class="step-badge">Étape 1 sur 2</span><p>4 cellules filles + le nombre de chromosomes a été <strong>divisé par 2</strong> (46 → 23).</p><button class="step-btn" onclick="showExerciseStep(this, 332)">▶ Conclusion</button></div>
      <div class="exercise-step" data-step="332"><span class="step-badge">Conclusion</span><p>C'est la <strong>méiose</strong> (elle fabrique les gamètes : 2n → n). ✅</p></div>
    </div>
    <div class="exercise-card">
      <h3 style="font-size:20px; font-weight:600; color:var(--color-nav); margin-bottom:0.5rem;">🧬 Quelle base s'apparie avec A ?</h3>
      <button class="step-btn" onclick="showExerciseStep(this, 311)">▶ Voir la réponse</button>
      <div class="exercise-step" data-step="311"><span class="step-badge">Réponse</span><p>Lors de la réplication, l'adénine (<strong>A</strong>) s'apparie toujours avec la <strong>thymine (T)</strong>. (Et C avec G.) ✅</p></div>
    </div>
  </div>`;

  sections.erreurs = `<div id="erreurs" class="section">
    <h2 style="font-size:30px; font-weight:800; color:var(--color-nav); margin-bottom:1.5rem;">⚠️ Erreurs fréquentes</h2>
    <div class="synth-section">
      <div class="formula-box"><h3>❌ Confondre mitose et méiose</h3><p><strong>Correction :</strong> la <strong>mitose</strong> donne 2 cellules identiques (2n → 2n) ; la <strong>méiose</strong> donne 4 gamètes (2n → n).</p></div>
      <div class="formula-box"><h3>❌ Croire que la méiose sépare les chromatides dès le début</h3><p><strong>Correction :</strong> à la <strong>1ʳᵉ division</strong> de méiose, on sépare les <strong>chromosomes homologues</strong> (réduction 2n → n) ; les chromatides ne se séparent qu'à la 2ᵉ division.</p></div>
      <div class="formula-box"><h3>❌ Se tromper d'appariement des bases</h3><p><strong>Correction :</strong> c'est toujours <strong>A–T</strong> et <strong>C–G</strong> (jamais A–C ou A–G).</p></div>
      <div class="formula-box"><h3>❌ Confondre génotype et phénotype</h3><p><strong>Correction :</strong> le <strong>génotype</strong> = les allèles (Aa) ; le <strong>phénotype</strong> = l'apparence visible. AA et Aa ont le même phénotype.</p></div>
      <div class="formula-box"><h3>❌ Oublier que la quantité d'ADN double en phase S</h3><p><strong>Correction :</strong> pendant la <strong>phase S</strong>, l'ADN est répliqué : la quantité passe de <strong>1 à 2</strong> avant la division.</p></div>
    </div>
  </div>`;

  var questions = [
    // ── Structure du vivant ──
    { q: "Quel est le plus petit niveau d'organisation du vivant ?", opts: ["l'atome", "la cellule", "l'organe", "le tissu"], ans: 0, chapter: "structure", difficulty: "facile", exp: "Ordre : atome → molécule → organite → cellule → tissu → organe → système → organisme → … → écosystème." },
    { q: "L'unité de base de tout être vivant est :", opts: ["la cellule", "l'atome", "la molécule", "l'organe"], ans: 0, chapter: "structure", difficulty: "facile", exp: "La cellule est la plus petite unité vivante." },
    { q: "Une cellule SANS noyau est dite :", opts: ["procaryote", "eucaryote", "végétale", "animale"], ans: 0, chapter: "structure", difficulty: "facile", exp: "Procaryote (ex. bactérie) = pas de noyau, ADN libre. Eucaryote = noyau + organites." },
    { q: "Quel organite contient l'ADN ?", opts: ["le noyau", "la mitochondrie", "le ribosome", "le lysosome"], ans: 0, chapter: "structure", difficulty: "facile", exp: "Le noyau renferme l'ADN (information génétique)." },
    { q: "Quel organite produit l'énergie de la cellule ?", opts: ["la mitochondrie", "le noyau", "l'appareil de Golgi", "le ribosome"], ans: 0, chapter: "structure", difficulty: "facile", exp: "La mitochondrie produit l'énergie (respiration cellulaire)." },
    { q: "Quel organite fabrique les protéines ?", opts: ["le ribosome", "le lysosome", "la vacuole", "la paroi"], ans: 0, chapter: "structure", difficulty: "intermediaire", exp: "Les ribosomes assemblent les protéines." },
    { q: "Rôle de l'appareil de Golgi :", opts: ["modifier et expédier les protéines", "produire l'énergie", "stocker l'ADN", "digérer les déchets"], ans: 0, chapter: "structure", difficulty: "intermediaire", exp: "Le Golgi modifie puis expédie les protéines ; les lysosomes digèrent." },
    { q: "Présent dans la cellule végétale mais PAS animale :", opts: ["le chloroplaste", "le noyau", "la mitochondrie", "le ribosome"], ans: 0, chapter: "structure", difficulty: "intermediaire", exp: "La cellule végétale a en plus : paroi, chloroplastes, grande vacuole." },
    // ── Biomolécules ──
    { q: "La molécule la plus abondante du vivant (solvant) est :", opts: ["l'eau", "le glucose", "une protéine", "un lipide"], ans: 0, chapter: "biomolecules", difficulty: "facile", exp: "L'eau est le solvant de la vie et sert au transport." },
    { q: "Un triglycéride est formé de glycérol et de :", opts: ["3 acides gras", "2 acides aminés", "1 sucre", "4 bases azotées"], ans: 0, chapter: "biomolecules", difficulty: "intermediaire", exp: "Triglycéride = glycérol + 3 acides gras." },
    { q: "Les protéines sont faites de :", opts: ["acides aminés", "acides gras", "nucléotides", "glucose"], ans: 0, chapter: "biomolecules", difficulty: "facile", exp: "Les protéines = chaîne d'acides aminés (chaîne polypeptidique)." },
    { q: "Combien d'acides aminés différents composent les protéines ?", opts: ["20", "4", "8", "100"], ans: 0, chapter: "biomolecules", difficulty: "intermediaire", exp: "20 acides aminés différents." },
    { q: "Dans un phospholipide, la tête est :", opts: ["hydrophile", "hydrophobe", "neutre", "acide"], ans: 0, chapter: "biomolecules", difficulty: "difficile", exp: "Tête hydrophile (aime l'eau) + queue hydrophobe → forme les membranes." },
    { q: "La principale source d'énergie rapide est :", opts: ["les glucides", "les protéines", "l'eau", "les sels minéraux"], ans: 0, chapter: "biomolecules", difficulty: "facile", exp: "Les glucides (sucres, ex. glucose) = énergie rapide ; les lipides = réserve." },
    { q: "Le cycle cellulaire comprend l'interphase et :", opts: ["la mitose", "la respiration", "la photosynthèse", "la digestion"], ans: 0, chapter: "cycle", difficulty: "facile", exp: "Cycle = interphase (G1, S, G2) + mitose (M)." },
    { q: "Dans quel ordre se déroule l'interphase ?", opts: ["G1 → S → G2", "S → G1 → G2", "G2 → S → G1", "M → S → G1"], ans: 0, chapter: "cycle", difficulty: "facile", exp: "Interphase : G1 (croissance), S (copie ADN), G2 (préparation)." },
    { q: "L'ADN est copié (répliqué) pendant la phase :", opts: ["S", "G1", "G2", "M"], ans: 0, chapter: "cycle", difficulty: "facile", exp: "La réplication de l'ADN a lieu en phase S." },
    { q: "Pendant la phase S, la quantité d'ADN :", opts: ["double (passe de 1 à 2)", "diminue de moitié", "ne change pas", "devient nulle"], ans: 0, chapter: "cycle", difficulty: "intermediaire", exp: "L'ADN est répliqué : la quantité passe de 1 à 2." },
    { q: "Quelle enzyme réalise la réplication de l'ADN ?", opts: ["l'ADN polymérase", "la mitochondrie", "le ribosome", "la lipase"], ans: 0, chapter: "cycle", difficulty: "intermediaire", exp: "L'ADN polymérase copie chaque brin de l'ADN." },
    { q: "Lors de la réplication, l'adénine (A) s'apparie avec :", opts: ["la thymine (T)", "la cytosine (C)", "la guanine (G)", "l'adénine (A)"], ans: 0, chapter: "cycle", difficulty: "facile", exp: "Complémentarité des bases : A–T et C–G." },
    { q: "Une cellule « au repos », sortie du cycle, est en phase :", opts: ["G0", "S", "M", "G2"], ans: 0, chapter: "cycle", difficulty: "intermediaire", exp: "G0 = phase de repos, hors cycle (pas de division)." },

    { q: "La mitose produit :", opts: ["2 cellules filles identiques", "4 cellules différentes", "une seule grande cellule", "des gamètes"], ans: 0, chapter: "mitose", difficulty: "facile", exp: "La mitose donne 2 cellules filles identiques à la cellule mère." },
    { q: "Ordre correct des phases de la mitose :", opts: ["Prophase → Métaphase → Anaphase → Télophase", "Anaphase → Prophase → Télophase → Métaphase", "Télophase → Anaphase → Métaphase → Prophase", "Métaphase → Prophase → Télophase → Anaphase"], ans: 0, chapter: "mitose", difficulty: "intermediaire", exp: "P-M-A-T : Prophase, Métaphase, Anaphase, Télophase." },
    { q: "À la métaphase, les chromosomes :", opts: ["s'alignent au milieu de la cellule", "se séparent vers les pôles", "disparaissent", "se collent à la membrane"], ans: 0, chapter: "mitose", difficulty: "intermediaire", exp: "Métaphase = alignement sur la plaque équatoriale (au milieu)." },
    { q: "À l'anaphase de la mitose, on sépare :", opts: ["les chromatides-sœurs", "les chromosomes homologues", "les noyaux", "les ribosomes"], ans: 0, chapter: "mitose", difficulty: "difficile", exp: "Anaphase de mitose : les chromatides-sœurs partent vers les pôles.", simple: "Retiens la différence clé : en MITOSE on sépare les deux moitiés d'un même chromosome (les chromatides-sœurs, le « X » s'ouvre). En MÉIOSE (1ʳᵉ division) on sépare les chromosomes en paire (les homologues)." },
    { q: "Le partage du cytoplasme en fin de division s'appelle :", opts: ["la cytodiérèse", "la réplication", "la photosynthèse", "la méiose"], ans: 0, chapter: "mitose", difficulty: "intermediaire", exp: "Cytodiérèse = séparation du cytoplasme → 2 cellules." },
    { q: "Les 2 moitiés identiques d'un chromosome dédoublé s'appellent :", opts: ["chromatides-sœurs", "nucléotides", "ribosomes", "gamètes"], ans: 0, chapter: "mitose", difficulty: "intermediaire", exp: "Un chromosome en X = 2 chromatides-sœurs reliées par le centromère." },
    { q: "Qu'est-ce qui relie les deux chromatides-sœurs ?", opts: ["le centromère", "le noyau", "la membrane", "un ribosome"], ans: 0, chapter: "mitose", difficulty: "intermediaire", exp: "Le centromère relie les 2 chromatides-sœurs (point de jonction de l'X)." },

    { q: "Combien de paires de chromosomes chez l'humain ?", opts: ["23", "46", "12", "2"], ans: 0, chapter: "caryotype", difficulty: "facile", exp: "23 paires = 46 chromosomes (2n = 46)." },
    { q: "Le caryotype, c'est :", opts: ["les chromosomes classés par paires", "la liste des organites", "une molécule d'ADN", "un type de cellule"], ans: 0, chapter: "caryotype", difficulty: "facile", exp: "Caryotype = photo des chromosomes classés par paires." },
    { q: "Les chromosomes non sexuels s'appellent :", opts: ["les autosomes", "les gonosomes", "les gamètes", "les centromères"], ans: 0, chapter: "caryotype", difficulty: "intermediaire", exp: "Autosomes = paires 1 à 22 ; gonosomes = paire sexuelle." },
    { q: "Le caryotype d'un homme contient la paire sexuelle :", opts: ["XY", "XX", "YY", "XO"], ans: 0, chapter: "caryotype", difficulty: "facile", exp: "Homme = XY, femme = XX." },
    { q: "« 2n » signifie qu'une cellule est :", opts: ["diploïde (chromosomes par paires)", "haploïde", "sans noyau", "morte"], ans: 0, chapter: "caryotype", difficulty: "intermediaire", exp: "2n = diploïde (2 exemplaires de chaque chromosome).", simple: "« n » = une collection de chromosomes. Diploïde (2n) = on a tout en DOUBLE (une copie de chaque parent), comme nos cellules normales. Haploïde (n) = en simple, comme les gamètes." },
    { q: "Les gamètes (spermatozoïde, ovule) sont :", opts: ["haploïdes (n)", "diploïdes (2n)", "sans ADN", "des bactéries"], ans: 0, chapter: "caryotype", difficulty: "intermediaire", exp: "Un gamète n'a qu'un exemplaire de chaque chromosome : il est n." },

    { q: "La méiose produit :", opts: ["4 cellules (gamètes) à n chromosomes", "2 cellules identiques", "une seule cellule", "des bactéries"], ans: 0, chapter: "meiose", difficulty: "facile", exp: "Méiose = 2 divisions → 4 gamètes haploïdes (n)." },
    { q: "La méiose comporte :", opts: ["2 divisions successives", "1 seule division", "3 divisions", "aucune division"], ans: 0, chapter: "meiose", difficulty: "intermediaire", exp: "2 divisions : la 1ʳᵉ réductionnelle, la 2ᵉ comme une mitose." },
    { q: "La méiose fait passer la cellule de :", opts: ["2n à n (réduction de moitié)", "n à 2n", "2n à 2n", "n à 4n"], ans: 0, chapter: "meiose", difficulty: "intermediaire", exp: "C'est une division réductionnelle : 2n → n.", simple: "Le but de la méiose : fabriquer des gamètes avec moitié moins de chromosomes (n). Ainsi, à la fécondation (n + n), l'enfant retrouve le bon nombre (2n) sans le doubler à chaque génération." },
    { q: "À l'anaphase de la 1ʳᵉ division de méiose, on sépare :", opts: ["les chromosomes homologues", "les chromatides-sœurs", "les noyaux", "les gamètes"], ans: 0, chapter: "meiose", difficulty: "difficile", exp: "1ʳᵉ division : séparation des homologues (≠ mitose qui sépare les chromatides).", simple: "Les « homologues » = les deux chromosomes d'une même paire (un venu de maman, un de papa). En méiose 1, on les sépare → c'est ça qui réduit le nombre de moitié (2n → n)." },
    { q: "La méiose est surtout une source de :", opts: ["variabilité (brassage)", "énergie", "déchets", "protéines"], ans: 0, chapter: "meiose", difficulty: "intermediaire", exp: "Le brassage des chromosomes rend chaque gamète unique." },

    { q: "La fécondation, c'est :", opts: ["la fusion d'un gamète mâle et d'un gamète femelle", "la division d'une cellule", "la copie de l'ADN", "la mort cellulaire"], ans: 0, chapter: "fecondation", difficulty: "facile", exp: "Fécondation = fusion de 2 gamètes (n + n)." },
    { q: "La cellule-œuf (zygote) est :", opts: ["diploïde (2n)", "haploïde (n)", "sans ADN", "une bactérie"], ans: 0, chapter: "fecondation", difficulty: "intermediaire", exp: "n + n → 2n : la cellule-œuf est diploïde." },
    { q: "La fécondation permet de :", opts: ["rétablir le nombre 2n de chromosomes", "diviser par 2 les chromosomes", "supprimer l'ADN", "créer des bactéries"], ans: 0, chapter: "fecondation", difficulty: "intermediaire", exp: "La méiose divise (2n→n), la fécondation rétablit (n+n→2n)." },

    { q: "Qui est considéré comme le père de la génétique ?", opts: ["Gregor Mendel", "Charles Darwin", "Louis Pasteur", "Isaac Newton"], ans: 0, chapter: "monohybridisme", difficulty: "facile", exp: "Mendel a découvert les lois de l'hérédité avec ses petits pois." },
    { q: "Une version d'un gène s'appelle :", opts: ["un allèle", "un organite", "un gamète", "un autosome"], ans: 0, chapter: "monohybridisme", difficulty: "facile", exp: "On a 2 allèles par gène (un de chaque parent)." },
    { q: "Le génotype « Aa » est dit :", opts: ["hétérozygote", "homozygote", "récessif pur", "dominant pur"], ans: 0, chapter: "monohybridisme", difficulty: "intermediaire", exp: "Deux allèles différents → hétérozygote (AA ou aa = homozygote)." },
    { q: "Un allèle récessif s'exprime seulement si :", opts: ["les 2 allèles sont récessifs (aa)", "il y a au moins un dominant", "on est hétérozygote", "jamais"], ans: 0, chapter: "monohybridisme", difficulty: "intermediaire", exp: "Récessif visible uniquement en aa ; le dominant masque le récessif." },
    { q: "Une lignée pure correspond à un individu :", opts: ["homozygote (AA ou aa)", "hétérozygote (Aa)", "sans gène", "stérile"], ans: 0, chapter: "monohybridisme", difficulty: "intermediaire", exp: "Lignée pure = 2 allèles identiques (homozygote)." },
    { q: "Croisement de lignées pures AA × aa : la F1 est :", opts: ["100 % Aa (tous dominants)", "3 dominants : 1 récessif", "100 % aa", "50 % AA : 50 % aa"], ans: 0, chapter: "monohybridisme", difficulty: "difficile", exp: "AA × aa → tous les enfants reçoivent A et a → Aa (dominants)." },
    { q: "Croisement Aa × Aa : quel rapport de phénotypes ?", opts: ["3 dominants : 1 récessif", "1 : 1", "tous identiques", "2 : 2"], ans: 0, chapter: "monohybridisme", difficulty: "difficile", exp: "Aa × Aa → 1 AA : 2 Aa : 1 aa → 3 dominants : 1 récessif." },
    { q: "Génotype vs phénotype ?", opts: ["génotype = les allèles ; phénotype = l'apparence", "l'inverse", "ce sont des synonymes", "génotype = la taille"], ans: 0, chapter: "monohybridisme", difficulty: "intermediaire", exp: "Génotype = les gènes (AA, Aa, aa) ; phénotype = ce qu'on voit." }
  ];

  var flashcards = [
    { front: "Les niveaux d'organisation du vivant (ordre) ?", back: "<strong>Atome → Molécule → Organite → Cellule → Tissu → Organe → Système → Organisme → Population → Communauté → Écosystème.</strong>", chapter: "structure" },
    { front: "Cellule procaryote vs eucaryote ?", back: "<strong>Procaryote</strong> (bactérie) : <strong>pas de noyau</strong>, ADN libre. <strong>Eucaryote</strong> (animale, végétale, champignon) : <strong>noyau + organites</strong> à membrane.", chapter: "structure" },
    { front: "Rôle de la mitochondrie ? Du ribosome ?", back: "<strong>Mitochondrie</strong> = produit l'<strong>énergie</strong> (respiration). <strong>Ribosome</strong> = fabrique les <strong>protéines</strong>.", chapter: "structure" },
    { front: "La cellule végétale a quoi en plus ?", back: "Une <strong>paroi</strong>, des <strong>chloroplastes</strong> (photosynthèse) et une grande <strong>vacuole</strong>.", chapter: "structure" },
    { front: "Qu'est-ce qu'un triglycéride ?", back: "Un lipide = <strong>glycérol + 3 acides gras</strong>. Réserve d'énergie. (Phospholipide = tête hydrophile + queue hydrophobe → membranes.)", chapter: "biomolecules" },
    { front: "De quoi sont faites les protéines ?", back: "D'<strong>acides aminés</strong> (<strong>20 différents</strong>) reliés en <strong>chaîne polypeptidique</strong>. Chacun a une fonction <strong>amine (–NH₂)</strong> et <strong>acide carboxylique (–COOH)</strong>.", chapter: "biomolecules" },
    { front: "Les 4 grandes familles de molécules organiques ?", back: "<strong>Glucides</strong> (énergie rapide), <strong>lipides</strong> (réserve/membranes), <strong>protéines</strong> (structure/enzymes), <strong>acides nucléiques</strong> (ADN/ARN). + l'<strong>eau</strong> (inorganique, solvant).", chapter: "biomolecules" },
    { front: "Les deux grandes parties du cycle cellulaire ?", back: "L'<strong>interphase</strong> (G1 → S → G2) puis la <strong>mitose</strong> (M).<br><svg viewBox='0 0 200 178' width='168' style='max-width:100%;height:auto;margin-top:8px'><path d='M100,22 A58,58 0 0 1 158,80' fill='none' stroke='#f87171' stroke-width='8'/><path d='M158,80 A58,58 0 1 1 100,22' fill='none' stroke='#60a5fa' stroke-width='8'/><text x='124' y='44' fill='#f87171' font-size='12' font-weight='bold'>M</text><text x='120' y='116' fill='#bfdbfe' font-size='11'>G1</text><text x='62' y='118' fill='#bfdbfe' font-size='11'>S</text><text x='60' y='54' fill='#bfdbfe' font-size='11'>G2</text><text x='100' y='84' fill='#e5e7eb' font-size='9' text-anchor='middle'>cycle</text></svg><br><em>Interphase G1→S→G2 (bleu) puis mitose M (rouge), dans le sens horaire.</em>", chapter: "cycle" },
    { front: "Quand l'ADN est-il répliqué ?", back: "Pendant la <strong>phase S</strong> : la quantité d'ADN passe de 1 à 2.", chapter: "cycle" },
    { front: "Comment se passe la réplication de l'ADN ?", back: "L'<strong>ADN polymérase</strong> ouvre la double hélice ; chaque brin sert de modèle ; les nucléotides s'apparient (<strong>A–T, C–G</strong>) → 2 molécules identiques.", chapter: "cycle" },
    { front: "Qu'est-ce que la phase G0 ?", back: "Une phase de <strong>repos</strong>, hors du cycle : la cellule ne se divise pas.", chapter: "cycle" },
    { front: "Résultat de la mitose ?", back: "<strong>2 cellules filles identiques</strong> à la cellule mère (2n → 2n). Sert à la croissance et à la réparation.", chapter: "mitose" },
    { front: "Phases de la mitose ?", back: "Prophase → Métaphase → Anaphase → Télophase (<strong>P-M-A-T</strong>), puis cytodiérèse.", chapter: "mitose" },
    { front: "Que se passe-t-il à la métaphase ?", back: "Les chromosomes s'<strong>alignent au milieu</strong> de la cellule (plaque équatoriale).", chapter: "mitose" },
    { front: "Que se passe-t-il à l'anaphase (mitose) ?", back: "Les <strong>chromatides-sœurs se séparent</strong> et partent vers les deux pôles.", chapter: "mitose" },
    { front: "Qu'est-ce que la cytodiérèse ?", back: "Le <strong>partage du cytoplasme</strong> en fin de division → 2 cellules séparées.", chapter: "mitose" },
    { front: "Chromatides-sœurs & centromère ?", back: "Un chromosome dédoublé (forme X) = 2 chromatides-sœurs identiques reliées par le <strong>centromère</strong>.", chapter: "mitose" },
    { front: "Qu'est-ce qu'un caryotype ?", back: "La <strong>photo des chromosomes</strong> d'une cellule, classés par paires (taille décroissante).", chapter: "caryotype" },
    { front: "Combien de chromosomes chez l'humain ?", back: "<strong>23 paires = 46</strong> chromosomes (2n = 46). Gamètes : n = 23.", chapter: "caryotype" },
    { front: "Autosomes vs gonosomes ?", back: "<strong>Autosomes</strong> = paires 1 à 22. <strong>Gonosomes</strong> = paire sexuelle (XX femme, XY homme).", chapter: "caryotype" },
    { front: "Diploïde (2n) vs haploïde (n) ?", back: "<strong>2n</strong> = chromosomes par paires (cellules du corps). <strong>n</strong> = un seul de chaque paire (gamètes).", chapter: "caryotype" },
    { front: "Que produit la méiose ?", back: "<strong>4 gamètes</strong> (spermatozoïdes ou ovules), chacun à <strong>n</strong> chromosomes.", chapter: "meiose" },
    { front: "Combien de divisions dans la méiose ?", back: "<strong>2 divisions</strong> successives : la 1ʳᵉ réductionnelle (2n → n), la 2ᵉ comme une mitose.", chapter: "meiose" },
    { front: "Que sépare-t-on à la 1ʳᵉ division de méiose ?", back: "Les <strong>chromosomes homologues</strong> (≠ mitose, qui sépare les chromatides). C'est ce qui réduit 2n → n.", chapter: "meiose" },
    { front: "Mitose vs méiose ?", back: "Mitose : 2 cellules <strong>identiques</strong> (2n → 2n). Méiose : 4 gamètes <strong>différents</strong> (2n → n).", chapter: "meiose" },
    { front: "Qu'est-ce que la fécondation ?", back: "La <strong>fusion</strong> d'un gamète mâle (n) et d'un gamète femelle (n) → cellule-œuf (zygote) à <strong>2n</strong>.", chapter: "fecondation" },
    { front: "Pourquoi méiose + fécondation s'équilibrent ?", back: "La méiose divise par 2 (2n → n), la fécondation remet ×2 (n + n → 2n). Le nombre de chromosomes reste stable.", chapter: "fecondation" },
    { front: "Gène vs allèle ?", back: "Gène = portion d'ADN codant un caractère. Allèle = une version du gène (on en a 2, un par parent).", chapter: "monohybridisme" },
    { front: "Dominant vs récessif ?", back: "Dominant (A) s'exprime même seul. Récessif (a) seulement si les 2 allèles sont récessifs (aa).", chapter: "monohybridisme" },
    { front: "Homozygote vs hétérozygote ?", back: "Homozygote = 2 allèles identiques (AA ou aa) = lignée pure. Hétérozygote = 2 différents (Aa).", chapter: "monohybridisme" },
    { front: "Génotype vs phénotype ?", back: "Génotype = les allèles (AA/Aa/aa). Phénotype = l'apparence visible.", chapter: "monohybridisme" },
    { front: "Croisement Aa × Aa ?", back: "Génotypes 1 AA : 2 Aa : 1 aa → Phénotypes <strong>3 dominants : 1 récessif</strong> (échiquier de Punnett).<br><svg viewBox='0 0 158 158' width='150' style='max-width:100%;height:auto;margin-top:8px'><text x='62' y='18' fill='#e5e7eb' font-size='13' font-weight='bold' text-anchor='middle'>A</text><text x='118' y='18' fill='#e5e7eb' font-size='13' font-weight='bold' text-anchor='middle'>a</text><text x='14' y='67' fill='#e5e7eb' font-size='13' font-weight='bold' text-anchor='middle'>A</text><text x='14' y='123' fill='#e5e7eb' font-size='13' font-weight='bold' text-anchor='middle'>a</text><rect x='34' y='34' width='56' height='56' fill='rgba(52,211,153,0.20)' stroke='#34d399' stroke-width='1.5'/><rect x='90' y='34' width='56' height='56' fill='rgba(52,211,153,0.20)' stroke='#34d399' stroke-width='1.5'/><rect x='34' y='90' width='56' height='56' fill='rgba(52,211,153,0.20)' stroke='#34d399' stroke-width='1.5'/><rect x='90' y='90' width='56' height='56' fill='rgba(248,113,113,0.20)' stroke='#f87171' stroke-width='1.5'/><text x='62' y='67' fill='#fff' font-size='13' text-anchor='middle'>AA</text><text x='118' y='67' fill='#fff' font-size='13' text-anchor='middle'>Aa</text><text x='62' y='123' fill='#fff' font-size='13' text-anchor='middle'>Aa</text><text x='118' y='123' fill='#fff' font-size='13' text-anchor='middle'>aa</text></svg><br><em>3 cases dominantes (vert) : 1 récessive (rouge) → rapport 3:1.</em>", chapter: "monohybridisme" },
    { front: "Croisement de lignées pures AA × aa ?", back: "En <strong>F1</strong>, tous les enfants sont <strong>Aa</strong> (caractère dominant).", chapter: "monohybridisme" }
  ];

  window.registerSubject('bio', {
    subtitle: 'Biologie — division cellulaire (mitose, méiose), caryotype & génétique (Mendel)',
    content: {
      sections: sections,
      questions: questions,
      flashcards: flashcards,
      demos: {},
      navLabels: { formules: '🧬 Notions clés', exercices: '🔬 Exercices' },
      chapOrder: ['structure', 'biomolecules', 'cycle', 'mitose', 'caryotype', 'meiose', 'fecondation', 'monohybridisme'],
      chapLabels: { structure: 'Structure du vivant', biomolecules: 'Les biomolécules', cycle: 'Cycle cellulaire & ADN', mitose: 'La mitose', caryotype: 'Caryotype & ploïdie', meiose: 'La méiose', fecondation: 'La fécondation', monohybridisme: 'Monohybridisme (Mendel)' }
    }
  });
})();
