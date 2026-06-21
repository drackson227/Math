/* GR2 Study — Contenu GÉOGRAPHIE
   La Belgique (régions, communautés, provinces, relief, hydrographie) +
   Situation d'apprentissage : les biocarburants.
   S'enregistre auprès de subjects.js via window.registerSubject. */
(function () {
  'use strict';
  if (typeof window.registerSubject !== 'function') return;

  /* Infos affichées quand on clique sur une image (cours + examen) */
  window.IMG_INFO = window.IMG_INFO || {};
  Object.assign(window.IMG_INFO, {
    "belgique_carte.jpg": {
      title: "Les provinces de Belgique", sub: "10 provinces + Bruxelles",
      cours: "<p>La Belgique compte <strong>10 provinces</strong> : <strong>5 en Flandre</strong> (nord, néerlandophone) et <strong>5 en Wallonie</strong> (sud, francophone). <strong>Bruxelles</strong> est une région à part (bilingue), elle n'est dans aucune province.</p>",
      exam: "<ul><li><strong>Flandre :</strong> Anvers, Limbourg, Flandre-Orientale, Flandre-Occidentale, Brabant flamand.</li><li><strong>Wallonie :</strong> Brabant wallon, Hainaut, Liège, Namur, Luxembourg (belge).</li><li>Sache repérer ta province et la situer (nord/sud).</li></ul>",
      anecdote: "La flèche de la carte pointe vers la petite zone bleue = <strong>Bruxelles-Capitale</strong>. C'est la 3ᵉ région du pays (avec la Flandre et la Wallonie), mais elle n'est <strong>dans aucune province</strong> et elle est <strong>bilingue</strong>."
    },
    "belgique_relief.jpg": {
      title: "Le relief de la Belgique", sub: "3 grands ensembles",
      cours: "<p>Le relief belge <strong>monte du nord-ouest vers le sud-est</strong> : <strong>Basse Belgique</strong> (&lt; 100 m, près de la mer), <strong>Moyenne Belgique</strong> (100–200 m) et <strong>Haute Belgique</strong> (&gt; 200 m, l'<strong>Ardenne</strong>).</p>",
      exam: "<ul><li>Basse → Moyenne → Haute (du NO vers le SE).</li><li>Point culminant : <strong>Signal de Botrange, 694 m</strong> (Hautes Fagnes).</li></ul>",
      anecdote: "Le point le plus haut, le <strong>Signal de Botrange</strong> (694 m), est si « bas » qu'on y a construit en 1923 une butte de 6 m (la « baraque Michel ») pour atteindre symboliquement les 700 m !"
    },
    "meuse.jpg": {
      title: "La Meuse", sub: "fleuve de Wallonie",
      cours: "<p>La <strong>Meuse</strong> est l'un des deux grands fleuves belges. Elle traverse <strong>Namur</strong> puis <strong>Liège</strong> ; la <strong>Sambre</strong> la rejoint à Namur. Elle se jette dans la <strong>mer du Nord</strong>.</p>",
      exam: "<ul><li>Meuse → Namur, Liège · la <strong>Sambre</strong> la rejoint à Namur.</li><li>L'autre fleuve : l'<strong>Escaut</strong> (Tournai, Gand, Anvers).</li></ul>",
      anecdote: "La Meuse prend sa source en <strong>France</strong> et traverse 3 pays (France, Belgique, Pays-Bas) avant la mer. À Namur, sa rencontre avec la Sambre est dominée par la célèbre <strong>Citadelle</strong>."
    }
  });

  /* Thème visuel des fiches de géo */
  window.INFO_THEME = window.INFO_THEME || {};
  Object.assign(window.INFO_THEME, { "belgique_carte.jpg": "geo", "belgique_relief.jpg": "geo", "meuse.jpg": "geo" });
  window.TERM_MAP = window.TERM_MAP || {};
  Object.assign(window.TERM_MAP, { "Meuse": "meuse.jpg", "Escaut": "meuse.jpg", "relief": "belgique_relief.jpg", "Signal de Botrange": "belgique_relief.jpg" });

  /* Carte interactive : provinces cliquables (positions en % sur belgique_carte.jpg) */
  window.BE_PROVINCES = [
    { n: 'Flandre-Occidentale', r: 'Flandre', c: 'Bruges', l: 11, t: 31 },
    { n: 'Flandre-Orientale', r: 'Flandre', c: 'Gand', l: 29, t: 27 },
    { n: 'Anvers', r: 'Flandre', c: 'Anvers', l: 50, t: 13 },
    { n: 'Limbourg', r: 'Flandre', c: 'Hasselt', l: 72, t: 27 },
    { n: 'Brabant flamand', r: 'Flandre', c: 'Louvain', l: 52, t: 36 },
    { n: 'Bruxelles-Capitale', r: 'Région à part (bilingue)', c: '19 communes', l: 43, t: 30 },
    { n: 'Brabant wallon', r: 'Wallonie', c: 'Wavre', l: 47, t: 47 },
    { n: 'Hainaut', r: 'Wallonie', c: 'Mons', l: 27, t: 56 },
    { n: 'Liège', r: 'Wallonie', c: 'Liège', l: 73, t: 48 },
    { n: 'Namur', r: 'Wallonie', c: 'Namur', l: 51, t: 62 },
    { n: 'Luxembourg', r: 'Wallonie', c: 'Arlon', l: 67, t: 78 }
  ];
  var MAP_HTML = '<div class="bemap-wrap">' +
    '<div class="bemap" id="bemap"><img src="belgique_carte.jpg" alt="Carte cliquable des provinces de Belgique" loading="lazy">' +
    window.BE_PROVINCES.map(function (p, i) {
      return '<button type="button" class="bemap-dot" style="left:' + p.l + '%; top:' + p.t + '%;" onclick="geoPick(' + i + '); event.stopPropagation();">' + (i + 1) + '</button>';
    }).join('') + '</div>' +
    '<div class="bemap-panel" id="bemap-panel">👆 Clique une pastille : sa <strong>province</strong>, sa <strong>région</strong> et son <strong>chef-lieu</strong> s\'affichent ici.</div>' +
    '<div class="bemap-foot"><button type="button" class="step-btn" onclick="geoMapQuiz()">🎯 Quiz carte</button><span class="bemap-quiz" id="bemap-quiz"></span></div>' +
    '</div>';

  /* ---------------------- COUPE VISUELLE DU RELIEF (NO → SE) ---------------------- */
  // Le terrain monte de la mer du Nord (gauche) vers l'Ardenne (droite). Étages cliquables.
  var GEO_RELIEF = {
    basse:   ['Basse Belgique', '< 100 m', 'La côte, les polders et la plaine flamande.', 'basse'],
    moyenne: ['Moyenne Belgique', '100–200 m', 'Plateaux fertiles (limons) — grande région agricole.', 'moy'],
    haute:   ['Haute Belgique', '> 200 m', 'Les plateaux de l’Ardenne. Sommet : Signal de Botrange (694 m).', 'haute']
  };
  window.geoReliefShow = function (el, key) {
    var d = GEO_RELIEF[key]; if (!d) return;
    var wrap = el.closest('.geo-relief-wrap'); if (!wrap) return;
    var cap = wrap.querySelector('.geo-relief-cap');
    if (cap) cap.innerHTML = '<strong>' + d[0] + '</strong> — <b class="geo-tag geo-' + d[3] + '">' + d[1] + '</b><br>' + d[2];
    wrap.querySelectorAll('.geo-z').forEach(function (z) { z.classList.toggle('sel', z.getAttribute('data-k') === key); });
  };
  function reliefZone(k, x, y, w, h, name, alt, fsN, fsA) {
    return '<g class="geo-z geo-' + GEO_RELIEF[k][3] + '" data-k="' + k + '" role="button" tabindex="0" aria-label="' + name + ', ' + alt + '"' +
      ' onclick="geoReliefShow(this,\'' + k + '\')" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();geoReliefShow(this,\'' + k + '\');}">' +
      '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="4"></rect>' +
      '<text x="' + (x + w / 2) + '" y="' + (y + h / 2 - 2) + '" text-anchor="middle" class="geo-lbl" style="font-size:' + fsN + 'px">' + name + '</text>' +
      '<text x="' + (x + w / 2) + '" y="' + (y + h / 2 + 12) + '" text-anchor="middle" class="geo-lbl geo-sub" style="font-size:' + fsA + 'px">' + alt + '</text>' +
      '</g>';
  }
  var RELIEF_PROFILE =
    '<div class="geo-relief-wrap">' +
      '<svg viewBox="0 0 420 244" class="geo-relief-svg" role="img" aria-label="Coupe du relief de la Belgique, du nord-ouest au sud-est">' +
        '<rect class="geo-sea" x="10" y="196" width="48" height="16" rx="3"></rect>' +
        '<text x="34" y="207" text-anchor="middle" class="geo-lbl" style="font-size:9px">mer</text>' +
        reliefZone('basse', 62, 176, 108, 36, 'Basse Belgique', '&lt; 100 m', 10, 9) +
        reliefZone('moyenne', 172, 146, 108, 66, 'Moyenne', '100–200 m', 10.5, 9.5) +
        reliefZone('haute', 282, 92, 120, 120, 'Haute Belgique', '&gt; 200 m (Ardenne)', 11, 9.5) +
        '<polygon class="geo-peak" points="345,70 326,92 364,92"></polygon>' +
        '<text x="345" y="62" text-anchor="middle" class="geo-peak-lbl" style="font-size:10px;font-weight:800">▲ Botrange 694 m</text>' +
        '<line x1="58" y1="218" x2="406" y2="218" class="geo-axis"></line>' +
        '<text x="60" y="232" class="geo-peak-lbl" style="font-size:10px">NO · mer du Nord</text>' +
        '<text x="404" y="232" text-anchor="end" class="geo-peak-lbl" style="font-size:10px">Ardenne · SE</text>' +
      '</svg>' +
      '<div class="geo-relief-cap" aria-live="polite">👆 Clique un étage du relief pour le détail.</div>' +
    '</div>';

  /* ---------------------- CARTE DES 3 FLEUVES (schéma cliquable) ---------------------- */
  // Meuse, Escaut, Yser — tous vers la mer du Nord. Confluences : Sambre→Meuse (Namur), Lys→Escaut (Gand).
  var FLEUVE_DATA = {
    meuse:  ['La Meuse', 'grand fleuve', 'Entre par le sud (France), traverse <b>Namur</b> puis <b>Liège</b>, et rejoint la mer du Nord (via les Pays-Bas). La <b>Sambre</b> la rejoint à Namur.', 'meuse'],
    escaut: ['L’Escaut', 'grand fleuve', 'Passe à <b>Tournai</b>, <b>Gand</b> (la <b>Lys</b> le rejoint) puis <b>Anvers</b> ; il rejoint la mer du Nord (via les Pays-Bas).', 'escaut'],
    yser:   ['L’Yser', 'petit fleuve côtier', 'Petit fleuve de Flandre-Occidentale ; il se jette dans la mer du Nord à <b>Nieuport</b>.', 'yser']
  };
  window.geoFleuveShow = function (el, key) {
    var d = FLEUVE_DATA[key]; if (!d) return;
    var wrap = el.closest('.geo-fleuve-wrap'); if (!wrap) return;
    var cap = wrap.querySelector('.geo-fl-cap');
    if (cap) cap.innerHTML = '<strong>' + d[0] + '</strong> — <b class="fl-tag ' + d[3] + '">' + d[1] + '</b><br>' + d[2];
    wrap.querySelectorAll('.geo-fl').forEach(function (z) { z.classList.toggle('sel', z.getAttribute('data-k') === key); });
  };
  function fleuveLine(k, pts) {
    return '<g class="geo-fl geo-fl-' + FLEUVE_DATA[k][3] + '" data-k="' + k + '" role="button" tabindex="0" aria-label="' + FLEUVE_DATA[k][0] + '"' +
      ' onclick="geoFleuveShow(this,\'' + k + '\')" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();geoFleuveShow(this,\'' + k + '\');}">' +
      '<polyline class="geo-fl-hit" points="' + pts + '"></polyline>' +
      '<polyline class="geo-fl-line" points="' + pts + '"></polyline>' +
      '</g>';
  }
  function flCity(cx, cy, name, lx, ly, anchor) {
    return '<circle class="geo-city" cx="' + cx + '" cy="' + cy + '" r="4"></circle>' +
      '<text x="' + lx + '" y="' + ly + '" text-anchor="' + anchor + '" class="geo-city-lbl" style="font-size:10px">' + name + '</text>';
  }
  var FLEUVES_MAP =
    '<div class="geo-fleuve-wrap">' +
      '<svg viewBox="0 0 420 300" class="geo-fleuve-svg" role="img" aria-label="Schéma des trois fleuves de Belgique : Meuse, Escaut et Yser, tous vers la mer du Nord">' +
        '<polygon class="geo-fl-land" points="40,34 300,34 392,120 340,252 160,276 70,180"></polygon>' +
        '<rect class="geo-fl-sea" x="0" y="0" width="420" height="30"></rect>' +
        '<text x="210" y="20" text-anchor="middle" class="geo-fl-sea-lbl" style="font-size:13px">⬆ Mer du Nord</text>' +
        '<polyline class="geo-aff" points="58,120 110,100 150,92"></polyline>' +
        '<text x="52" y="116" text-anchor="end" class="geo-aff-lbl" style="font-size:9px">Lys</text>' +
        '<polyline class="geo-aff" points="120,250 170,222 215,200"></polyline>' +
        '<text x="116" y="258" text-anchor="end" class="geo-aff-lbl" style="font-size:9px">Sambre</text>' +
        fleuveLine('yser', '105,150 80,100 60,52 55,30') +
        fleuveLine('escaut', '110,205 150,92 250,70 262,30') +
        fleuveLine('meuse', '210,276 215,200 320,150 365,30') +
        '<circle class="geo-conf" cx="215" cy="200" r="6"></circle>' +
        '<circle class="geo-conf" cx="150" cy="92" r="6"></circle>' +
        flCity(60, 52, 'Nieuport', 60, 67, 'middle') +
        flCity(150, 92, 'Gand', 150, 108, 'middle') +
        flCity(250, 70, 'Anvers', 250, 61, 'middle') +
        flCity(110, 205, 'Tournai', 110, 221, 'middle') +
        flCity(215, 200, 'Namur', 227, 196, 'start') +
        flCity(320, 150, 'Liège', 329, 148, 'start') +
      '</svg>' +
      '<div class="geo-fl-legend">' +
        '<span class="lg"><i class="sw meuse"></i>Meuse</span>' +
        '<span class="lg"><i class="sw escaut"></i>Escaut</span>' +
        '<span class="lg"><i class="sw yser"></i>Yser</span>' +
        '<span class="lg"><i class="sw aff"></i>affluents (Sambre, Lys)</span>' +
        '<span class="lg"><i class="dot-conf"></i>confluence</span>' +
      '</div>' +
      '<div class="geo-fl-cap" aria-live="polite">👆 Clique un fleuve (Meuse, Escaut, Yser) pour voir son trajet et les villes traversées.</div>' +
    '</div>';

  var sections = {};

  /* ---------------------- SYNTHÈSE (cours) ---------------------- */
  sections.synthese = `<div id="synthese" class="section active">
    <div style="text-align:center; margin-bottom:1.5rem;">
      <h2 style="font-size:30px; font-weight:800; color:var(--color-nav); margin:0;">🗺️ Géographie</h2>
      <p style="color:var(--text-secondary); margin-top:6px;">La Belgique &amp; les biocarburants</p>
    </div>

    <div class="synth-section">
      <h2>1. La Belgique : un État fédéral</h2>
      <p>La Belgique est un petit pays d'Europe de l'Ouest (≈ 30 700 km², ≈ 11,7 millions d'habitants). Sa capitale est <strong>Bruxelles</strong>. Elle est bordée à l'ouest par la <strong>mer du Nord</strong> et entourée de <strong>4 pays voisins</strong> : la France, le Luxembourg, l'Allemagne et les Pays-Bas.</p>
      <p>Depuis les réformes de l'État, la Belgique est un <strong>État fédéral</strong> organisé en <strong>3 Régions</strong> et <strong>3 Communautés</strong>.</p>
      <ul style="line-height:1.9;">
        <li><strong>3 Régions</strong> (compétences liées au territoire : économie, environnement…) : la <strong>Région flamande</strong> (Flandre, au nord), la <strong>Région wallonne</strong> (Wallonie, au sud) et la <strong>Région de Bruxelles-Capitale</strong> (19 communes).</li>
        <li><strong>3 Communautés</strong> (compétences liées aux personnes : langue, enseignement, culture) : la Communauté <strong>flamande</strong> (néerlandais), la Communauté <strong>française</strong> et la Communauté <strong>germanophone</strong> (cantons de l'Est, région d'Eupen).</li>
      </ul>
      <div class="simple-exp-box">
        <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Comprendre simplement</button>
        <div class="simple-exp-content">Une <strong>Région</strong> s'occupe du <em>territoire</em> (routes, économie, environnement) ; une <strong>Communauté</strong> s'occupe des <em>gens</em> selon leur langue (école, culture). Bruxelles est bilingue (français + néerlandais).</div>
      </div>
    </div>

    <div class="synth-section">
      <h2>2. Les 10 provinces</h2>
      <p>La Belgique compte <strong>10 provinces</strong> : 5 en Flandre, 5 en Wallonie. <strong>Bruxelles-Capitale</strong> n'appartient à aucune province.</p>
      <p><strong>Flandre (nord) :</strong> Anvers, Limbourg, Flandre-Orientale, Flandre-Occidentale, Brabant flamand.<br>
         <strong>Wallonie (sud) :</strong> Brabant wallon, Hainaut, Liège, Namur, Luxembourg (belge).</p>
      ${MAP_HTML}
      <p style="text-align:center; color:var(--text-secondary); font-size:13px; margin-top:.4rem;">🗺️ Carte interactive : clique une pastille (région + chef-lieu), ou lance le <strong>Quiz carte</strong>.</p>
      <div class="key-rule"><div class="formula-main">10 provinces = 5 (Flandre) + 5 (Wallonie) · Bruxelles = à part</div></div>
    </div>

    <div class="synth-section">
      <h2>3. Le relief : 3 grands ensembles</h2>
      <p>Le relief belge monte doucement du nord-ouest (mer) vers le sud-est (Ardenne).</p>
      <div class="gr2-guess">
        <p class="gg-q">🤔 Devine d'abord : quel est le point culminant de la Belgique ?</p>
        <div class="gg-opts">
          <button class="gg-opt" data-ok="0" onclick="gr2Guess(this)">350 m</button>
          <button class="gg-opt" data-ok="1" onclick="gr2Guess(this)">694 m</button>
          <button class="gg-opt" data-ok="0" onclick="gr2Guess(this)">1 340 m</button>
        </div>
        <div class="gg-reveal">Le point culminant est le <strong>Signal de Botrange</strong> : <strong>694 m</strong> (Hautes Fagnes, en Ardenne).</div>
      </div>
      ${RELIEF_PROFILE}
      <table class="compare-table">
        <thead><tr><th>Ensemble</th><th>Altitude</th><th>Où / caractéristiques</th></tr></thead>
        <tbody>
          <tr><th>Basse Belgique</th><td>&lt; 100 m</td><td>la côte, les <strong>polders</strong>, la plaine flamande</td></tr>
          <tr><th>Moyenne Belgique</th><td>100–200 m</td><td>plateaux fertiles (limons), région <strong>agricole</strong></td></tr>
          <tr><th>Haute Belgique</th><td>&gt; 200 m</td><td>plateaux de l'<strong>Ardenne</strong> · point culminant : <strong>Signal de Botrange</strong> (694 m, Hautes Fagnes)</td></tr>
        </tbody>
      </table>
      <p style="margin-top:.7rem;">Le <strong>sillon Sambre-et-Meuse</strong> (la vallée de la Sambre puis de la Meuse : Mons → Charleroi → Namur → Liège) sépare la <strong>Moyenne</strong> de la <strong>Haute Belgique</strong>. C'est l'ancien <strong>axe industriel</strong> wallon (charbon, sidérurgie).</p>
      <figure class="hfig hfig-float" style="max-width:200px"><img src="belgique_relief.jpg" alt="Relief de la Belgique" loading="lazy"><figcaption>Le relief monte vers le sud-est (Ardenne). Clique pour la fiche.</figcaption></figure>
    </div>

    <div class="synth-section">
      <h2>4. L'hydrographie (les cours d'eau)</h2>
      <p>La Belgique compte <strong>3 fleuves</strong>, tous tournés vers la <strong>mer du Nord</strong> : deux grands — la <strong>Meuse</strong> et l'<strong>Escaut</strong> — et un petit fleuve côtier, l'<strong>Yser</strong>.</p>
      <figure class="hfig hfig-float" style="max-width:180px"><img src="meuse.jpg" alt="La Meuse" loading="lazy"><figcaption>La Meuse (à Namur, Liège). Clique pour la fiche.</figcaption></figure>
      <ul style="line-height:1.9;">
        <li>La <strong>Meuse</strong> : traverse Namur et Liège (la Sambre la rejoint à Namur).</li>
        <li>L'<strong>Escaut</strong> : passe à Tournai, Gand et Anvers (la Lys le rejoint à Gand).</li>
        <li>L'<strong>Yser</strong> : petit fleuve <strong>côtier</strong> de Flandre-Occidentale ; il se jette dans la mer du Nord à <strong>Nieuport</strong>.</li>
        <li>Autres (rivières/affluents) : la <strong>Sambre</strong>, la <strong>Lys</strong>, la <strong>Dendre</strong>, l'<strong>Ourthe</strong>, la <strong>Semois</strong> (Ardenne).</li>
      </ul>
      ${FLEUVES_MAP}
      <p style="text-align:center; color:var(--text-secondary); font-size:13px; margin-top:.4rem;">🗺️ Schéma : clique un fleuve pour suivre son trajet vers la <strong>mer du Nord</strong> et voir les villes traversées.</p>

      <h3 style="color:var(--color-nav); margin-top:1.2rem;">💧 Eaux de surface vs eaux souterraines</h3>
      <p>L'eau douce qu'on utilise vient de deux sources :</p>
      <table class="compare-table">
        <thead><tr><th>Critère</th><th>🌊 Eaux de surface</th><th>🕳️ Eaux souterraines (nappes)</th></tr></thead>
        <tbody>
          <tr><th>Où ?</th><td>rivières, fleuves, lacs, barrages</td><td>sous terre, dans les <strong>nappes phréatiques</strong></td></tr>
          <tr><th>Avantage</th><td>faciles d'<strong>accès</strong> et abondantes</td><td>mieux <strong>protégées</strong>, plus <strong>pures</strong></td></tr>
          <tr><th>Inconvénient</th><td>plus exposées à la <strong>pollution</strong></td><td>plus difficiles à exploiter, <strong>lentes</strong> à se renouveler</td></tr>
        </tbody>
      </table>
      <p style="margin-top:.8rem;"><strong>Économiser l'eau (lutter contre le gaspillage)</strong> : fermer le robinet, <strong>réparer les fuites</strong>, préférer la <strong>douche au bain</strong>, <strong>récupérer l'eau de pluie</strong>, utiliser des appareils économes.</p>
      <div class="simple-exp-box">
        <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Comprendre simplement</button>
        <div class="simple-exp-content">L'eau qu'on boit vient soit du <strong>dessus</strong> (rivières, lacs = eaux de surface, faciles à prendre mais plus sales), soit du <strong>dessous</strong> (nappes souterraines = plus propres mais lentes à se remplir). Comme elle est précieuse, on évite de la <strong>gaspiller</strong>.</div>
      </div>
    </div>

    <div class="synth-section">
      <h2>5. Situation d'apprentissage : les biocarburants 🌱⛽</h2>
      <p>Un <strong>biocarburant</strong> est un carburant produit à partir de <strong>biomasse</strong> (matière organique végétale ou animale) : c'est une ressource <strong>renouvelable</strong>, contrairement au pétrole.</p>
      <p><strong>Les principaux types :</strong></p>
      <ul style="line-height:1.9;">
        <li><strong>Bioéthanol</strong> : alcool obtenu par <strong>fermentation</strong> de plantes sucrées ou riches en amidon (betterave, canne à sucre, maïs, blé). On le mélange à l'<strong>essence</strong>.</li>
        <li><strong>Biodiesel</strong> : obtenu par <strong>transestérification</strong> d'huiles végétales (colza, tournesol, palme). On le mélange au <strong>diesel</strong>.</li>
        <li><strong>Biogaz</strong> : méthane produit par <strong>méthanisation</strong> de déchets organiques.</li>
      </ul>
      <p><strong>Les générations :</strong> 1ʳᵉ = cultures <em>alimentaires</em> (controversé) · 2ᵉ = <em>résidus</em> et bois (paille, déchets) · 3ᵉ = <strong>microalgues</strong>.</p>
      <div class="simple-exp-box">
        <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Pourquoi « Biocarburant ? » (avec un point d'interrogation)</button>
        <div class="simple-exp-content">Parce que ce n'est pas une solution parfaite : produire du carburant avec des plantes peut entrer en <strong>concurrence avec l'alimentation</strong> (champs utilisés pour les voitures plutôt que pour nourrir), provoquer de la <strong>déforestation</strong> (huile de palme) et consommer beaucoup d'eau et d'engrais. D'où le débat : avantage écologique réel ou fausse bonne idée ?</div>
      </div>
    </div>

    <div class="synth-section">
      <h2>6. Mondialisation de l'alimentation : le cacao 🍫</h2>
      <p>Le <strong>chocolat</strong> illustre les <strong>inégalités Nord–Sud</strong> : la matière première est cultivée au <strong>Sud</strong>, mais transformée et vendue (chère) au <strong>Nord</strong>.</p>
      <ul style="line-height:1.9;">
        <li><strong>Production</strong> : la <strong>Côte d'Ivoire</strong> est le <strong>1ᵉʳ producteur mondial</strong> de fèves de cacao (devant le Ghana) ; les fèves partent par le <strong>port de San Pedro</strong>. À l'échelle mondiale, ≈ <strong>75 % vient d'Afrique</strong>, <strong>18 % d'Amérique</strong> et <strong>7 % d'Asie &amp; Océanie</strong>.</li>
        <li><strong>Transformation</strong> : l'entreprise belge <strong>Barry Callebaut</strong> est le <strong>n°1 mondial</strong> de la transformation du chocolat.</li>
        <li><strong>Les géants de l'agroalimentaire</strong> : une <strong>dizaine de multinationales</strong> (Nestlé, Mondelez, Mars, Unilever, Danone, Coca-Cola, PepsiCo, Kellogg's…) possèdent la plupart des marques et <strong>fixent les prix</strong>.</li>
      </ul>
      <p><strong>Conséquences</strong> :</p>
      <ul style="line-height:1.9;">
        <li>💰 <strong>Économiques</strong> : les <strong>producteurs du Sud</strong> sont <strong>mal payés</strong> ; les profits vont aux multinationales du Nord. Dans la <strong>chaîne de valeur</strong> du chocolat, le <strong>planteur ne touche qu'une toute petite part du prix</strong> ; l'essentiel revient à la <strong>transformation</strong> et à la <strong>distribution</strong>.</li>
        <li>👥 <strong>Sociales</strong> : pauvreté des planteurs, <strong>travail des enfants</strong> dans les plantations.</li>
        <li>🌳 <strong>Environnementales</strong> : <strong>déforestation</strong> et monoculture pour étendre les plantations ; cultures <strong>très gourmandes en eau</strong> (≈ <strong>12 650 L d'eau pour 1 kg de fèves</strong> de cacao).</li>
      </ul>
      <p><strong>Solutions</strong> : le <strong>commerce équitable</strong> (mieux payer les producteurs), une <strong>consommation responsable</strong> et des <strong>labels</strong>.</p>
      <div class="simple-exp-box">
        <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Comprendre simplement</button>
        <div class="simple-exp-content">Le pays qui <strong>cultive</strong> le cacao (Côte d'Ivoire) gagne <strong>peu</strong>, alors que les entreprises qui le <strong>transforment et le vendent</strong> (au Nord) gagnent <strong>beaucoup</strong>. Le <strong>commerce équitable</strong> sert à payer plus justement les producteurs.</div>
      </div>
    </div>
  </div>`;

  /* ---------------------- REPÈRES (cartes / chiffres clés) ---------------------- */
  sections.formules = `<div id="formules" class="section">
    <h2 style="font-size:30px; font-weight:800; color:var(--color-nav); margin-bottom:1rem;">📌 Repères à connaître</h2>
    <div class="formula-grid">
      <div>
        <div class="formula-box"><h3>Les 3 Régions</h3><div class="formula-main" style="font-size:18px;">Flandre · Wallonie · Bruxelles-Capitale</div><p class="note">Compétences = le <strong>territoire</strong>.</p></div>
        <div class="formula-box"><h3>Les 3 Communautés</h3><div class="formula-main" style="font-size:18px;">française · flamande · germanophone</div><p class="note">Compétences = les <strong>personnes</strong> (langue, école, culture).</p></div>
        <div class="formula-box"><h3>Provinces flamandes (5)</h3><p style="line-height:1.9; margin:0;">Anvers <em>(Anvers)</em> · Limbourg <em>(Hasselt)</em> · Flandre-Orientale <em>(Gand)</em> · Flandre-Occidentale <em>(Bruges)</em> · Brabant flamand <em>(Louvain)</em></p><p class="note">Entre parenthèses : le chef-lieu.</p></div>
        <div class="formula-box"><h3>Provinces wallonnes (5)</h3><p style="line-height:1.9; margin:0;">Brabant wallon <em>(Wavre)</em> · Hainaut <em>(Mons)</em> · Liège <em>(Liège)</em> · Namur <em>(Namur)</em> · Luxembourg <em>(Arlon)</em></p></div>
      </div>
      <div>
        <div class="formula-box"><h3>Relief (du bas vers le haut)</h3><div class="formula-main" style="font-size:17px;">Basse (&lt;100 m) → Moyenne (100–200 m) → Haute (&gt;200 m)</div><p class="note">Point culminant : <strong>Signal de Botrange, 694 m</strong>.</p></div>
        <div class="formula-box"><h3>Les fleuves</h3><div class="formula-main" style="font-size:17px;">la Meuse · l'Escaut · l'Yser</div><p class="note">2 grands (Meuse, Escaut) + l'<strong>Yser</strong> (petit, côtier, à Nieuport). Sambre → Meuse (Namur) · Lys → Escaut (Gand). Tout va vers la <strong>mer du Nord</strong>.</p></div>
        <div class="formula-box"><h3>4 pays voisins</h3><div class="formula-main" style="font-size:18px;">France · Luxembourg · Allemagne · Pays-Bas</div><p class="note">+ la <strong>mer du Nord</strong> à l'ouest.</p></div>
        <div class="formula-box"><h3>Biocarburants — types</h3><p style="line-height:1.9; margin:0;"><strong>Bioéthanol</strong> (→ essence) · <strong>Biodiesel</strong> (→ diesel) · <strong>Biogaz</strong> (méthane)</p><p class="note">Source = biomasse (renouvelable).</p></div>
      </div>
    </div>
  </div>`;

  /* ---------------------- MÉTHODE ---------------------- */
  sections.methodes = `<div id="methodes" class="section">
    <h2 style="font-size:30px; font-weight:800; color:var(--color-nav); margin-bottom:1rem;">📝 Méthode</h2>

    <div class="synth-section">
      <h2>Analyser une carte</h2>
      <div class="step-item"><div class="step-num">1</div><div class="step-text"><strong>Lire le titre et la légende</strong> : de quoi parle la carte ? que représentent les couleurs / symboles ?</div></div>
      <div class="step-item"><div class="step-num">2</div><div class="step-text"><strong>Repérer l'orientation et l'échelle</strong> (le nord, les distances).</div></div>
      <div class="step-item"><div class="step-num">3</div><div class="step-text"><strong>Décrire</strong> ce qu'on voit (localiser : nord/sud, le long d'un fleuve, près d'une frontière…).</div></div>
      <div class="step-item"><div class="step-num">4</div><div class="step-text"><strong>Expliquer / interpréter</strong> : pourquoi ? (relief, climat, activités humaines).</div></div>
    </div>

    <div class="synth-section">
      <h2>Analyser un document (situation d'apprentissage)</h2>
      <div class="step-item"><div class="step-num">1</div><div class="step-text"><strong>Identifier</strong> la source (auteur, date, nature : article, graphique, image).</div></div>
      <div class="step-item"><div class="step-num">2</div><div class="step-text"><strong>Dégager l'idée principale</strong> et les arguments.</div></div>
      <div class="step-item"><div class="step-num">3</div><div class="step-text"><strong>Confronter</strong> les documents (avantages ↔ inconvénients) avant de donner un <strong>avis argumenté</strong>.</div></div>
    </div>
  </div>`;

  /* ---------------------- EXERCICES ---------------------- */
  sections.exercices = `<div id="exercices" class="section">
    <h2 style="font-size:30px; font-weight:800; color:var(--color-nav); margin-bottom:1rem;">🎯 Exercices</h2>
    <p style="color:var(--text-secondary); margin-bottom:1.2rem;">Entraîne-toi : essaie de répondre de tête, puis vérifie.</p>

    <div class="exercise-card">
      <h3 style="font-size:20px; font-weight:600; color:var(--color-nav); margin-bottom:0.5rem;">🎮 Flandre ou Wallonie ?</h3>
      <p style="color:var(--text-secondary); margin:0 0 .8rem;">On te donne une province ; tu choisis sa région (+ son chef-lieu en correction). Score &amp; série. (Clavier : 1-2, puis Entrée.)</p>
      <button type="button" class="nav-btn" data-mg="geo-mm">▶ Commencer le jeu</button>
      <div id="geo-mm" class="mg-mount"></div>
    </div>

    <div class="exercise-card">
      <h3 style="font-size:20px; font-weight:600; color:var(--color-nav);">📋 À retenir par cœur</h3>
      <ul style="line-height:2;">
        <li>Cite les <strong>3 Régions</strong> et les <strong>3 Communautés</strong>.</li>
        <li>Place les <strong>10 provinces</strong> sur une carte muette (+ leur chef-lieu).</li>
        <li>Nomme les <strong>2 fleuves</strong> et dis quelle ville chacun traverse.</li>
        <li>Donne les <strong>3 ensembles de relief</strong> et le point culminant.</li>
        <li>Cite les <strong>4 pays voisins</strong>.</li>
        <li>Explique la différence entre biocarburant de <strong>1ʳᵉ</strong> et de <strong>2ᵉ génération</strong>.</li>
      </ul>
      <p style="color:var(--text-secondary);">👉 Le <strong>Quiz</strong> et les <strong>Flashcards</strong> (en haut) testent tout ça automatiquement.</p>
    </div>

    <div class="exercise-card">
      <h3 style="font-size:20px; font-weight:600; color:var(--color-nav);">🌱 Débat : pour ou contre les biocarburants ?</h3>
      <p>Classe ces arguments en <strong>✅ avantages</strong> ou <strong>❌ inconvénients</strong> :</p>
      <ul style="line-height:2;">
        <li>Ressource renouvelable → <strong>✅</strong></li>
        <li>Concurrence avec l'alimentation → <strong>❌</strong></li>
        <li>Réduit la dépendance au pétrole → <strong>✅</strong></li>
        <li>Déforestation (huile de palme) → <strong>❌</strong></li>
        <li>Valorise les déchets agricoles (2ᵉ gén.) → <strong>✅</strong></li>
        <li>Consomme beaucoup d'eau et d'engrais → <strong>❌</strong></li>
      </ul>
    </div>

    <div class="exercise-card">
      <h3 style="font-size:20px; font-weight:600; color:var(--color-nav);">🔗 Réviser en ligne</h3>
      <p style="color:var(--text-secondary); margin:0 0 .6rem;">Des sites gratuits pour revoir la géo autrement (vidéos, fiches, animations) :</p>
      <ul style="line-height:2;">
        <li><a href="https://www.lumni.fr/" target="_blank" rel="noopener" style="color:var(--text-primary);font-weight:700;text-decoration:underline;">Lumni</a> — vidéos &amp; quiz de géographie.</li>
        <li><a href="https://www.lelivrescolaire.fr/" target="_blank" rel="noopener" style="color:var(--text-primary);font-weight:700;text-decoration:underline;">Le Livre Scolaire</a> — manuels d'histoire-géo gratuits.</li>
        <li><a href="https://www.edumedia.com/fr/" target="_blank" rel="noopener" style="color:var(--text-primary);font-weight:700;text-decoration:underline;">éduMédia</a> — animations (relief, environnement, agriculture).</li>
      </ul>
    </div>
  </div>`;

  /* ---------------------- ERREURS ---------------------- */
  sections.erreurs = `<div id="erreurs" class="section">
    <h2 style="font-size:30px; font-weight:800; color:var(--color-nav); margin-bottom:1rem;">⚠️ Pièges fréquents</h2>
    <div class="formula-grid">
      <div class="formula-box"><h3>❌ Confondre Région et Communauté</h3><p><strong>Région</strong> = territoire · <strong>Communauté</strong> = personnes/langue. Il y en a 3 de chaque, mais ce n'est pas la même chose.</p></div>
      <div class="formula-box"><h3>❌ Mettre Bruxelles dans une province</h3><p>Bruxelles-Capitale n'est <strong>dans aucune province</strong> (c'est une Région à part, 19 communes).</p></div>
      <div class="formula-box"><h3>❌ Oublier le « Luxembourg » province</h3><p>Le <strong>Luxembourg belge</strong> (province, chef-lieu Arlon) ≠ le <strong>Grand-Duché de Luxembourg</strong> (pays voisin).</p></div>
      <div class="formula-box"><h3>❌ « Biocarburant = 100 % écolo »</h3><p>Faux : la 1ʳᵉ génération entre en <strong>concurrence avec l'alimentation</strong> et peut causer de la déforestation. D'où le débat.</p></div>
      <div class="formula-box"><h3>❌ Inverser les fleuves</h3><p>La <strong>Sambre</strong> rejoint la <strong>Meuse</strong> à Namur ; la <strong>Lys</strong> rejoint l'<strong>Escaut</strong> à Gand.</p></div>
    </div>
  </div>`;

  /* ---------------------- COURS COMPLET (tout le cours détaillé, pour réviser à 100 %) ---------------------- */
  sections.cours = `<div id="cours" class="section">
    <div style="text-align:center; margin-bottom:1.2rem;">
      <h2 style="font-size:30px; font-weight:800; color:var(--color-nav); margin:0;">📖 Cours complet — Géographie</h2>
      <p style="color:var(--text-secondary); margin-top:6px;">Tout le cours en détail pour réviser à 100 %. La Synthèse sert à réviser vite ; ici, c'est le cours entier.</p>
    </div>
    <div style="text-align:center; margin:-0.4rem 0 1.2rem;"><button class="gr2-tool" type="button" onclick="gr2ToggleCloze(this)">🙈 Mode test (cacher les mots-clés)</button></div>

    <div class="key-rule"><div class="formula-main">🎯 Au programme</div><p class="note" style="margin-top:.3rem;">La <strong>Belgique</strong> (État fédéral · 10 provinces · relief · eau) + 2 situations de <strong>mondialisation</strong> : les <strong>biocarburants</strong> et le <strong>cacao</strong>.</p></div>

    <div class="synth-section">
      <h2>1. La Belgique, un État fédéral</h2>
      <p>La Belgique est un <strong>petit pays d'Europe de l'Ouest</strong> (≈ 30 700 km², ≈ 11,7 millions d'habitants). Sa capitale est <strong>Bruxelles</strong>. Elle est bordée à l'ouest par la <strong>mer du Nord</strong> et entourée de <strong>4 pays voisins</strong> : la <strong>France</strong>, le <strong>Luxembourg</strong> (le Grand-Duché), l'<strong>Allemagne</strong> et les <strong>Pays-Bas</strong>.</p>
      <p>C'est un <strong>État fédéral</strong> : le pouvoir est partagé entre l'État central et des entités. On distingue <strong>3 Régions</strong> et <strong>3 Communautés</strong> (attention, ce n'est pas la même chose !).</p>
      <ul style="line-height:1.9;">
        <li><strong>Les 3 Régions</strong> s'occupent du <strong>territoire</strong> (économie, environnement, routes, aménagement) : la <strong>Région flamande</strong> (la Flandre, au nord), la <strong>Région wallonne</strong> (la Wallonie, au sud) et la <strong>Région de Bruxelles-Capitale</strong> (19 communes).</li>
        <li><strong>Les 3 Communautés</strong> s'occupent des <strong>personnes</strong> selon leur langue (enseignement, culture) : la Communauté <strong>française</strong>, la Communauté <strong>flamande</strong> (néerlandais) et la Communauté <strong>germanophone</strong> (les cantons de l'Est, région d'Eupen).</li>
      </ul>
      <div class="simple-exp-box">
        <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Région ou Communauté ?</button>
        <div class="simple-exp-content">Une <strong>Région</strong> = le <em>territoire</em> (le sol : économie, environnement). Une <strong>Communauté</strong> = les <em>gens</em> selon leur langue (école, culture). Bruxelles est <strong>bilingue</strong> (français + néerlandais).</div>
      </div>
    </div>

    <div class="synth-section">
      <h2>2. Les 10 provinces</h2>
      <p>La Belgique compte <strong>10 provinces</strong> : <strong>5 en Flandre</strong> et <strong>5 en Wallonie</strong>. <strong>Bruxelles-Capitale n'appartient à aucune province</strong> (c'est une Région à part).</p>
      <table class="compare-table">
        <thead><tr><th>Flandre (nord)</th><th>Chef-lieu</th><th>Wallonie (sud)</th><th>Chef-lieu</th></tr></thead>
        <tbody>
          <tr><td>Anvers</td><td>Anvers</td><td>Brabant wallon</td><td>Wavre</td></tr>
          <tr><td>Limbourg</td><td>Hasselt</td><td>Hainaut</td><td>Mons</td></tr>
          <tr><td>Flandre-Orientale</td><td>Gand</td><td>Liège</td><td>Liège</td></tr>
          <tr><td>Flandre-Occidentale</td><td>Bruges</td><td>Namur</td><td>Namur</td></tr>
          <tr><td>Brabant flamand</td><td>Louvain</td><td>Luxembourg (belge)</td><td>Arlon</td></tr>
        </tbody>
      </table>
      <p style="margin-top:.5rem;">⚠️ Le <strong>Luxembourg belge</strong> (province, chef-lieu Arlon) ne doit pas être confondu avec le <strong>Grand-Duché de Luxembourg</strong> (le pays voisin).</p>
      <div class="key-rule"><div class="formula-main">10 provinces = 5 (Flandre) + 5 (Wallonie) · Bruxelles = à part</div></div>
    </div>

    <div class="synth-section">
      <h2>3. Le relief : 3 grands ensembles</h2>
      <p>Le relief belge <strong>monte doucement</strong> du nord-ouest (la mer) vers le sud-est (l'Ardenne).</p>
      ${RELIEF_PROFILE}
      <table class="compare-table">
        <thead><tr><th>Ensemble</th><th>Altitude</th><th>Où / caractéristiques</th></tr></thead>
        <tbody>
          <tr><th>Basse Belgique</th><td>&lt; 100 m</td><td>la côte, les <strong>polders</strong>, la plaine flamande</td></tr>
          <tr><th>Moyenne Belgique</th><td>100–200 m</td><td>plateaux fertiles (limons), grande région <strong>agricole</strong></td></tr>
          <tr><th>Haute Belgique</th><td>&gt; 200 m</td><td>plateaux de l'<strong>Ardenne</strong> · point culminant : <strong>Signal de Botrange</strong> (694 m, Hautes Fagnes)</td></tr>
        </tbody>
      </table>
      <p style="margin-top:.6rem;">Le <strong>sillon Sambre-et-Meuse</strong> (la vallée de la Sambre puis de la Meuse : Mons → Charleroi → Namur → Liège) sépare la <strong>Moyenne</strong> de la <strong>Haute Belgique</strong>. C'est l'ancien <strong>axe industriel</strong> wallon (charbon, sidérurgie).</p>
      <div class="key-rule"><div class="formula-main">Basse (&lt;100 m) → Moyenne (100–200 m) → Haute (&gt;200 m) · sommet : Botrange 694 m</div></div>
    </div>

    <div class="synth-section">
      <h2>4. L'hydrographie : les cours d'eau et l'eau</h2>
      <h3 style="color:var(--color-nav); margin-top:1rem;">a) Les fleuves</h3>
      <p>La Belgique compte <strong>3 fleuves</strong>, tous tournés vers la <strong>mer du Nord</strong> : deux grands — la <strong>Meuse</strong> et l'<strong>Escaut</strong> — et un petit fleuve côtier, l'<strong>Yser</strong>.</p>
      <ul style="line-height:1.9;">
        <li>La <strong>Meuse</strong> : traverse <strong>Namur</strong> et <strong>Liège</strong> (la <strong>Sambre</strong> la rejoint à Namur).</li>
        <li>L'<strong>Escaut</strong> : passe à Tournai, <strong>Gand</strong> et <strong>Anvers</strong> (la <strong>Lys</strong> le rejoint à Gand).</li>
        <li>L'<strong>Yser</strong> : petit fleuve <strong>côtier</strong> de Flandre-Occidentale ; il se jette dans la mer du Nord à <strong>Nieuport</strong>.</li>
        <li>Autres rivières/affluents : la <strong>Sambre</strong>, la <strong>Lys</strong>, la <strong>Dendre</strong>, l'<strong>Ourthe</strong>, la <strong>Semois</strong> (Ardenne).</li>
      </ul>
      ${FLEUVES_MAP}
      <p style="text-align:center; color:var(--text-secondary); font-size:13px; margin-top:.4rem;">🗺️ Schéma : clique un fleuve pour suivre son trajet vers la <strong>mer du Nord</strong> et voir les villes traversées.</p>

      <h3 style="color:var(--color-nav); margin-top:1rem;">b) Eaux de surface vs eaux souterraines</h3>
      <p>L'eau douce qu'on utilise vient de deux sources :</p>
      <table class="compare-table">
        <thead><tr><th>Critère</th><th>🌊 Eaux de surface</th><th>🕳️ Eaux souterraines (nappes)</th></tr></thead>
        <tbody>
          <tr><th>Où ?</th><td>rivières, fleuves, lacs, barrages</td><td>sous terre, dans les <strong>nappes phréatiques</strong></td></tr>
          <tr><th>Avantage</th><td>faciles d'<strong>accès</strong> et abondantes</td><td>mieux <strong>protégées</strong>, plus <strong>pures</strong></td></tr>
          <tr><th>Inconvénient</th><td>plus exposées à la <strong>pollution</strong></td><td>plus difficiles à exploiter, <strong>lentes</strong> à se renouveler</td></tr>
        </tbody>
      </table>

      <h3 style="color:var(--color-nav); margin-top:1rem;">c) Économiser l'eau</h3>
      <p>L'eau potable est précieuse : il faut <strong>lutter contre le gaspillage</strong> → fermer le robinet, <strong>réparer les fuites</strong>, préférer la <strong>douche au bain</strong>, <strong>récupérer l'eau de pluie</strong>, utiliser des appareils économes.</p>
      <div class="simple-exp-box">
        <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Le sais-tu ? (le Manneken-Pis)</button>
        <div class="simple-exp-content">Le manuel utilise le <strong>Manneken-Pis</strong> (la célèbre fontaine de Bruxelles) comme accroche pour parler de notre <strong>consommation d'eau</strong> : une fontaine qui coule en continu, c'est énormément d'eau potable « utilisée » chaque jour — un bon rappel pour faire attention à l'eau au quotidien.</div>
      </div>
    </div>

    <div class="synth-section">
      <h2>5. Situation d'apprentissage : les biocarburants 🌱⛽</h2>
      <h3 style="color:var(--color-nav); margin-top:1rem;">a) Définition</h3>
      <p>Un <strong>biocarburant</strong> (ou agrocarburant) est un carburant produit à partir de <strong>biomasse</strong> (matière organique végétale ou animale). C'est une ressource <strong>renouvelable</strong>, contrairement au <strong>pétrole</strong> (énergie fossile, épuisable).</p>

      <h3 style="color:var(--color-nav); margin-top:1rem;">b) Les principaux types</h3>
      <ul style="line-height:1.9;">
        <li><strong>Bioéthanol</strong> : alcool obtenu par <strong>fermentation</strong> de plantes sucrées ou riches en amidon (betterave, canne à sucre, maïs, blé). On le mélange à l'<strong>essence</strong>.</li>
        <li><strong>Biodiesel</strong> : obtenu par <strong>transestérification</strong> d'huiles végétales (colza, tournesol, palme). On le mélange au <strong>diesel</strong>.</li>
        <li><strong>Biogaz</strong> : <strong>méthane</strong> produit par <strong>méthanisation</strong> de déchets organiques.</li>
      </ul>
      <p><strong>Les générations :</strong> 1ʳᵉ = cultures <em>alimentaires</em> (controversé) · 2ᵉ = <em>résidus</em> et bois (paille, déchets) · 3ᵉ = <strong>microalgues</strong>.</p>

      <h3 style="color:var(--color-nav); margin-top:1rem;">c) Deux notions du manuel : OGM et bilan carbone</h3>
      <ul style="line-height:1.9;">
        <li><strong>OGM</strong> = <strong>organisme génétiquement modifié</strong> : un être vivant dont on a modifié les gènes en laboratoire. Certaines plantes cultivées pour les biocarburants peuvent être des OGM.</li>
        <li><strong>Le bilan carbone</strong> : pour juger si un biocarburant est vraiment écologique, on compare le CO₂ qu'il <strong>rejette</strong> (en le produisant puis en le brûlant) au CO₂ que les plantes <strong>absorbent</strong> en poussant. L'intérêt des biocarburants : les plantes <strong>réabsorbent</strong> une partie du CO₂ pendant leur croissance, ce que le pétrole ne fait pas. Mais ce bilan n'est <strong>favorable</strong> que si on dépense <strong>peu d'énergie fossile</strong> pour les cultiver et les fabriquer.</li>
      </ul>

      <h3 style="color:var(--color-nav); margin-top:1rem;">d) Le débat : « Biocarburant ? » (avec un point d'interrogation)</h3>
      <p>Ce n'est <strong>pas</strong> une solution parfaite. Les principaux problèmes :</p>
      <ul style="line-height:1.9;">
        <li>⚠️ <strong>concurrence avec l'alimentation</strong> : des champs servent à faire rouler des voitures plutôt qu'à nourrir les gens (surtout 1ʳᵉ génération) ;</li>
        <li>🌳 <strong>déforestation</strong> (ex. huile de palme) pour créer de nouvelles cultures ;</li>
        <li>💧 grande consommation d'<strong>eau</strong> et d'<strong>engrais</strong>.</li>
      </ul>
      <p>D'où le débat <strong>POUR / CONTRE</strong> : avantage écologique réel (renouvelable, moins de gaz à effet de serre que l'essence/le diesel) <em>ou</em> fausse bonne idée (concurrence alimentaire, déforestation) ?</p>
      <div class="key-rule"><div class="formula-main">Biomasse (renouvelable) · bioéthanol / biodiesel / biogaz · débat : alimentation &amp; déforestation</div></div>
    </div>

    <div class="synth-section">
      <h2>6. Mondialisation de l'alimentation : le cacao 🍫</h2>
      <p>Le <strong>chocolat</strong> illustre parfaitement les <strong>inégalités Nord–Sud</strong> : la matière première (les fèves de cacao) est cultivée au <strong>Sud</strong>, mais elle est <strong>transformée et vendue</strong> (cher) au <strong>Nord</strong>.</p>

      <h3 style="color:var(--color-nav); margin-top:1rem;">a) La production</h3>
      <ul style="line-height:1.9;">
        <li>La <strong>Côte d'Ivoire</strong> est le <strong>1ᵉʳ producteur mondial</strong> de fèves de cacao (devant le Ghana) ; les fèves partent par le <strong>port de San Pedro</strong>.</li>
        <li>À l'échelle mondiale : ≈ <strong>75 % vient d'Afrique</strong>, <strong>18 % d'Amérique</strong> et <strong>7 % d'Asie &amp; Océanie</strong>.</li>
      </ul>

      <h3 style="color:var(--color-nav); margin-top:1rem;">b) La transformation et les géants</h3>
      <ul style="line-height:1.9;">
        <li>L'entreprise <strong>belge</strong> <strong>Barry Callebaut</strong> est le <strong>n°1 mondial</strong> de la transformation du chocolat.</li>
        <li>Une <strong>dizaine de multinationales</strong> de l'agroalimentaire (Nestlé, Mondelez, Mars, Unilever, Danone, Coca-Cola, PepsiCo, Kellogg's…) possèdent la plupart des marques et <strong>fixent les prix</strong>.</li>
      </ul>

      <h3 style="color:var(--color-nav); margin-top:1rem;">c) Les conséquences</h3>
      <ul style="line-height:1.9;">
        <li>💰 <strong>Économiques</strong> : les producteurs du Sud sont <strong>mal payés</strong>. Dans la <strong>chaîne de valeur</strong> du chocolat, le <strong>planteur ne touche qu'une toute petite part du prix</strong> ; l'essentiel revient à la <strong>transformation</strong> et à la <strong>distribution</strong> (au Nord).</li>
        <li>👥 <strong>Sociales</strong> : pauvreté des planteurs, <strong>travail des enfants</strong> dans les plantations.</li>
        <li>🌳 <strong>Environnementales</strong> : <strong>déforestation</strong> et monoculture pour étendre les plantations ; cultures <strong>très gourmandes en eau</strong> (≈ <strong>12 650 L d'eau pour 1 kg de fèves</strong> de cacao).</li>
      </ul>

      <h3 style="color:var(--color-nav); margin-top:1rem;">d) Les solutions</h3>
      <p>Le <strong>commerce équitable</strong> (mieux payer les producteurs), une <strong>consommation responsable</strong> et des <strong>labels</strong>.</p>
      <div class="key-rule"><div class="formula-main">Sud cultive (peu payé) → Nord transforme &amp; vend (cher) · solution : commerce équitable</div></div>
    </div>

    <div class="synth-section">
      <h2>🧠 Astuces pour retenir</h2>
      <ul style="line-height:2;">
        <li><strong>3 provinces faciles</strong> : pour <strong>Anvers</strong>, <strong>Liège</strong> et <strong>Namur</strong>, la province porte le <em>même nom</em> que son chef-lieu (3 gagnées d'office !).</li>
        <li>Les autres chefs-lieux : Limbourg→<strong>Hasselt</strong> · Flandre-Orientale→<strong>Gand</strong> · Flandre-Occidentale→<strong>Bruges</strong> · Brabant flamand→<strong>Louvain</strong> · Brabant wallon→<strong>Wavre</strong> · Hainaut→<strong>Mons</strong> · Luxembourg→<strong>Arlon</strong>.</li>
        <li><strong>Relief</strong> : plus on va vers le <em>Sud-Est</em> (l'Ardenne), plus ça <em>monte</em> (Basse → Moyenne → Haute). Sommet : <strong>Botrange, 694 m</strong>.</li>
        <li><strong>Affluents</strong> : la <strong>Sambre</strong> rejoint la <strong>Meuse</strong> à <strong>Namur</strong> ; la <strong>Lys</strong> rejoint l'<strong>Escaut</strong> à <strong>Gand</strong>.</li>
        <li><strong>Région ou Communauté ?</strong> <strong>Région = teRRitoire</strong> (le sol) ; <strong>Communauté = les gens</strong> (langue, école, culture).</li>
        <li><strong>Cacao</strong> : environ <strong>¾ (75 %)</strong> vient d'<strong>Afrique</strong> → « le chocolat est surtout africain ».</li>
      </ul>
      <p style="color:var(--text-secondary); font-size:13px;">💡 Active le <strong>Mode test</strong> en haut : les réponses en gras se cachent, à toi de les retrouver !</p>
    </div>

    <div class="key-rule" style="margin-top:1rem;"><div class="formula-main">✅ Tu as lu tout le cours ! File aux <strong>Flashcards</strong> et au <strong>Quiz</strong> pour t'entraîner.</div></div>
  </div>`;

  /* ---------------------- QUIZ ---------------------- */
  var questions = [
    // ── Eaux de surface / souterraines ──
    { q: "Les eaux souterraines se trouvent :", opts: ["sous terre, dans les nappes phréatiques", "dans les fleuves et les lacs", "dans la mer du Nord", "dans les nuages"], ans: 0, chapter: "hydro", difficulty: "facile", exp: "Eaux souterraines = nappes phréatiques (sous terre). Eaux de surface = rivières, lacs, fleuves." },
    { q: "Quel est un avantage des eaux souterraines par rapport aux eaux de surface ?", opts: ["elles sont mieux protégées et plus pures", "elles sont plus faciles à pomper", "elles ne servent à rien", "elles sont toujours salées"], ans: 0, chapter: "hydro", difficulty: "intermediaire", exp: "Souterraines = plus pures/protégées mais lentes à se renouveler. Surface = faciles d'accès mais plus polluées." },
    { q: "Quel geste permet d'économiser l'eau ?", opts: ["réparer les fuites et préférer la douche au bain", "laisser couler le robinet", "arroser en plein soleil", "remplir la baignoire à ras bord"], ans: 0, chapter: "hydro", difficulty: "facile", exp: "Économiser l'eau : réparer les fuites, douche plutôt que bain, récupérer l'eau de pluie." },
    { q: "Combien la Belgique compte-t-elle de provinces ?", opts: ["10", "9", "12", "5"], ans: 0, chapter: "belgique", difficulty: "facile", exp: "10 provinces : 5 en Flandre, 5 en Wallonie." },
    { q: "Bruxelles-Capitale est…", opts: ["une Région à part (aucune province)", "une province wallonne", "une province flamande", "une Communauté"], ans: 0, chapter: "belgique", difficulty: "facile", exp: "Bruxelles est une des 3 Régions ; elle n'est dans aucune province." },
    { q: "Quelles sont les 3 Communautés ?", opts: ["française, flamande, germanophone", "flamande, wallonne, bruxelloise", "française, anglaise, allemande", "nord, centre, sud"], ans: 0, chapter: "belgique", difficulty: "intermediaire", exp: "Les Communautés sont définies par la langue : française, flamande (néerlandais), germanophone." },
    { q: "Une Région s'occupe surtout…", opts: ["du territoire (économie, environnement)", "de la langue et de l'école", "de la religion", "de l'armée"], ans: 0, chapter: "belgique", difficulty: "intermediaire", exp: "Région = territoire ; Communauté = personnes (langue, enseignement, culture)." },
    { q: "Le chef-lieu de la province de Hainaut est :", opts: ["Mons", "Namur", "Liège", "Charleroi"], ans: 0, chapter: "belgique", difficulty: "intermediaire", exp: "Hainaut → Mons. (Namur est le chef-lieu de la province de Namur.)" },
    { q: "Le chef-lieu de la province de Limbourg est :", opts: ["Hasselt", "Gand", "Anvers", "Bruges"], ans: 0, chapter: "belgique", difficulty: "difficile", exp: "Limbourg → Hasselt." },
    { q: "Quel est le point culminant de la Belgique ?", opts: ["Le Signal de Botrange (694 m)", "Le Mont Blanc", "La Citadelle de Namur", "Le Kemmelberg"], ans: 0, chapter: "relief", difficulty: "intermediaire", exp: "Le Signal de Botrange (694 m), dans les Hautes Fagnes (Ardenne)." },
    { q: "On va de la mer vers l'Ardenne. Le relief…", opts: ["monte (Basse → Moyenne → Haute)", "descend", "reste plat", "monte puis redevient plat"], ans: 0, chapter: "relief", difficulty: "facile", exp: "Basse Belgique (<100 m) → Moyenne (100-200 m) → Haute (>200 m, Ardenne)." },
    { q: "Quel fleuve traverse Namur et Liège ?", opts: ["La Meuse", "L'Escaut", "La Lys", "Le Rhin"], ans: 0, chapter: "hydro", difficulty: "facile", exp: "La Meuse traverse Namur puis Liège. La Sambre la rejoint à Namur." },
    { q: "La Lys rejoint quel fleuve, et où ?", opts: ["L'Escaut, à Gand", "La Meuse, à Liège", "La Sambre, à Namur", "Le Rhin, à Anvers"], ans: 0, chapter: "hydro", difficulty: "difficile", exp: "La Lys rejoint l'Escaut à Gand ; la Sambre rejoint la Meuse à Namur." },
    { q: "Combien la Belgique a-t-elle de pays voisins ?", opts: ["4", "3", "5", "2"], ans: 0, chapter: "belgique", difficulty: "facile", exp: "4 : France, Luxembourg, Allemagne, Pays-Bas (+ la mer du Nord)." },
    { q: "Un biocarburant est produit à partir de :", opts: ["biomasse (plantes, déchets organiques)", "pétrole brut", "charbon", "uranium"], ans: 0, chapter: "biocarburants", difficulty: "facile", exp: "Biomasse = matière organique renouvelable." },
    { q: "Le bioéthanol s'obtient par… et se mélange à…", opts: ["fermentation ; l'essence", "transestérification ; le diesel", "méthanisation ; le gaz", "distillation ; le kérosène"], ans: 0, chapter: "biocarburants", difficulty: "intermediaire", exp: "Bioéthanol = fermentation de plantes sucrées/amidon → mélangé à l'essence. Biodiesel = transestérification d'huiles → diesel." },
    { q: "Le principal reproche fait aux biocarburants de 1ʳᵉ génération :", opts: ["concurrence avec l'alimentation", "ils ne brûlent pas", "ils coûtent 0 €", "ils ne sont pas renouvelables"], ans: 0, chapter: "biocarburants", difficulty: "intermediaire", exp: "La 1ʳᵉ génération utilise des cultures alimentaires (champs détournés de la nourriture) + risque de déforestation." },
    { q: "Les biocarburants de 2ᵉ génération utilisent :", opts: ["des résidus et du bois (non alimentaires)", "uniquement du maïs", "de l'eau de mer", "du pétrole"], ans: 0, chapter: "biocarburants", difficulty: "difficile", exp: "2ᵉ génération = résidus/lignocellulose (paille, déchets, bois) → pas de concurrence alimentaire." },
    { q: "Bruxelles-Capitale appartient à quelle province ?", opts: ["aucune province", "le Brabant flamand", "le Brabant wallon", "Anvers"], ans: 0, chapter: "belgique", difficulty: "intermediaire", exp: "Bruxelles est une Région à part, dans aucune province, et bilingue." },
    { q: "La Meuse se jette finalement dans…", opts: ["la mer du Nord", "la Méditerranée", "l'océan Atlantique", "un lac"], ans: 0, chapter: "hydro", difficulty: "facile", exp: "Comme l'Escaut, la Meuse rejoint la mer du Nord." },
    { q: "La Sambre rejoint la Meuse dans quelle ville ?", opts: ["Namur", "Liège", "Gand", "Anvers"], ans: 0, chapter: "hydro", difficulty: "intermediaire", exp: "À Namur (la Citadelle domine le confluent)." },
    { q: "En allant vers l'Ardenne, dans quelle Belgique es-tu ?", opts: ["la Haute Belgique (>200 m)", "la Basse Belgique", "la Moyenne Belgique", "les polders"], ans: 0, chapter: "relief", difficulty: "facile", exp: "L'Ardenne = Haute Belgique (>200 m), au sud-est." },
    { q: "Les polders se trouvent dans…", opts: ["la Basse Belgique (côte)", "l'Ardenne", "la Moyenne Belgique", "le Luxembourg"], ans: 0, chapter: "relief", difficulty: "difficile", exp: "Les polders (terres gagnées sur la mer) sont en Basse Belgique, près de la côte." },
    { q: "Le chef-lieu de la Flandre-Occidentale est :", opts: ["Bruges", "Gand", "Anvers", "Hasselt"], ans: 0, chapter: "belgique", difficulty: "difficile", exp: "Flandre-Occidentale → Bruges ; Flandre-Orientale → Gand." },
    { q: "Le chef-lieu du Brabant wallon est :", opts: ["Wavre", "Mons", "Namur", "Arlon"], ans: 0, chapter: "belgique", difficulty: "difficile", exp: "Brabant wallon → Wavre." },
    { q: "La Communauté germanophone se situe surtout…", opts: ["dans les cantons de l'Est (région d'Eupen)", "à la côte", "autour de Bruxelles", "en Flandre-Occidentale"], ans: 0, chapter: "belgique", difficulty: "difficile", exp: "À l'est de la Wallonie (cantons de l'Est, Eupen), frontière allemande." },
    { q: "La Région de Bruxelles-Capitale compte…", opts: ["19 communes", "10 communes", "1 commune", "100 communes"], ans: 0, chapter: "belgique", difficulty: "intermediaire", exp: "19 communes ; Région bilingue (français + néerlandais)." },
    { q: "Le biogaz est produit par…", opts: ["méthanisation de déchets organiques", "fermentation de betteraves", "transestérification d'huiles", "raffinage du pétrole"], ans: 0, chapter: "biocarburants", difficulty: "intermediaire", exp: "Biogaz = méthane issu de la méthanisation (déchets organiques)." },
    { q: "L'Escaut passe par quelles villes ?", opts: ["Tournai, Gand, Anvers", "Namur, Liège", "Arlon, Bastogne", "Bruges, Ostende"], ans: 0, chapter: "hydro", difficulty: "intermediaire", exp: "L'Escaut : Tournai → Gand (la Lys le rejoint) → Anvers → mer du Nord." },
    { q: "Combien de fleuves traversent la Belgique ?", opts: ["3 (Meuse, Escaut, Yser)", "1", "2", "5"], ans: 0, chapter: "hydro", difficulty: "intermediaire", exp: "Les 2 grands (Meuse, Escaut) + l'Yser, petit fleuve côtier qui se jette à Nieuport." },
    { q: "Le 1ᵉʳ producteur mondial de fèves de cacao est…", opts: ["la Côte d'Ivoire", "la Belgique", "la Suisse", "la France"], ans: 0, chapter: "agro", difficulty: "facile", exp: "La Côte d'Ivoire (devant le Ghana) ; les fèves partent par le port de San Pedro." },
    { q: "Le n°1 mondial de la transformation du chocolat est…", opts: ["Barry Callebaut (belge)", "Coca-Cola", "Apple", "Toyota"], ans: 0, chapter: "agro", difficulty: "intermediaire", exp: "Barry Callebaut, entreprise belge, leader mondial de la transformation du cacao." },
    { q: "Le marché agroalimentaire mondial est dominé par…", opts: ["une dizaine de multinationales", "des milliers de petites fermes", "un seul pays", "l'État belge"], ans: 0, chapter: "agro", difficulty: "intermediaire", exp: "≈ 10 multinationales (Nestlé, Mondelez, Mars, Unilever, Danone…) possèdent la plupart des marques." },
    { q: "Une solution aux inégalités du commerce du cacao :", opts: ["le commerce équitable", "plus de déforestation", "baisser les salaires des producteurs", "le travail des enfants"], ans: 0, chapter: "agro", difficulty: "facile", exp: "Le commerce équitable paie plus justement les producteurs du Sud." },
    { q: "La majorité du cacao mondial est produite en…", opts: ["Afrique (≈ 75 %)", "Europe", "Asie", "Océanie"], ans: 0, chapter: "agro", difficulty: "intermediaire", exp: "≈ 75 % en Afrique, 18 % en Amérique, 7 % en Asie & Océanie." },
    { q: "Dans le prix d'une tablette de chocolat, le planteur de cacao touche…", opts: ["une toute petite part", "la moitié", "presque tout", "les trois quarts"], ans: 0, chapter: "agro", difficulty: "intermediaire", exp: "L'essentiel du prix va à la transformation et à la distribution (au Nord) ; d'où le commerce équitable." },
    { q: "Pourquoi dit-on que le cacao est « gourmand en eau » ?", opts: ["≈ 12 650 L d'eau pour 1 kg de fèves", "il ne pousse que dans l'eau", "il faut 10 L par tonne", "il ne consomme pas d'eau"], ans: 0, chapter: "agro", difficulty: "difficile", exp: "Produire 1 kg de fèves de cacao demande énormément d'eau (≈ 12 650 litres)." }
  ];

  /* ---------------------- FLASHCARDS ---------------------- */
  var flashcards = [
    { front: "Eaux de surface vs eaux souterraines ?", back: "<strong>Surface</strong> (rivières, lacs) : faciles d'accès mais plus <strong>polluées</strong>. <strong>Souterraines</strong> (nappes phréatiques) : plus <strong>pures/protégées</strong> mais <strong>lentes</strong> à se renouveler. → Il faut <strong>économiser l'eau</strong>.", chapter: "hydro" },
    { front: "Les 3 Régions de Belgique ?", back: "Région flamande (Flandre), Région wallonne (Wallonie), Région de Bruxelles-Capitale.", chapter: "belgique" },
    { front: "Les 3 Communautés ?", back: "Française, flamande (néerlandophone), germanophone.", chapter: "belgique" },
    { front: "Région vs Communauté ?", back: "Région = le <strong>territoire</strong> (économie, environnement) · Communauté = les <strong>personnes</strong> (langue, école, culture).", chapter: "belgique" },
    { front: "Combien de provinces ? Réparties comment ?", back: "10 provinces : 5 en Flandre + 5 en Wallonie. Bruxelles = aucune province.", chapter: "belgique" },
    { front: "Les 5 provinces wallonnes (+ chefs-lieux) ?", back: "Brabant wallon (Wavre), Hainaut (Mons), Liège (Liège), Namur (Namur), Luxembourg (Arlon).", chapter: "belgique" },
    { front: "Les 5 provinces flamandes (+ chefs-lieux) ?", back: "Anvers (Anvers), Limbourg (Hasselt), Flandre-Orientale (Gand), Flandre-Occidentale (Bruges), Brabant flamand (Louvain).", chapter: "belgique" },
    { front: "Les 4 pays voisins ?", back: "France, Luxembourg, Allemagne, Pays-Bas (+ mer du Nord à l'ouest).", chapter: "belgique" },
    { front: "Les 3 ensembles de relief ?", back: "Basse Belgique (<100 m), Moyenne Belgique (100-200 m), Haute Belgique / Ardenne (>200 m).", chapter: "relief" },
    { front: "Point culminant de la Belgique ?", back: "Le Signal de Botrange, 694 m (Hautes Fagnes, Ardenne).", chapter: "relief" },
    { front: "Les fleuves de Belgique ?", back: "3 fleuves vers la mer du Nord : la Meuse (Namur, Liège) et l'Escaut (Tournai, Gand, Anvers) = les 2 grands, + l'Yser (petit fleuve côtier, à Nieuport).", chapter: "hydro" },
    { front: "Sambre et Lys : où rejoignent-elles ?", back: "La Sambre rejoint la Meuse à Namur ; la Lys rejoint l'Escaut à Gand.", chapter: "hydro" },
    { front: "Qu'est-ce qu'un biocarburant ?", back: "Un carburant produit à partir de biomasse (matière organique végétale/animale) : ressource renouvelable.", chapter: "biocarburants" },
    { front: "Bioéthanol vs biodiesel ?", back: "Bioéthanol = fermentation de plantes sucrées/amidon → essence. Biodiesel = transestérification d'huiles végétales → diesel.", chapter: "biocarburants" },
    { front: "1ʳᵉ vs 2ᵉ génération de biocarburants ?", back: "1ʳᵉ = cultures alimentaires (concurrence nourriture). 2ᵉ = résidus/bois non alimentaires. 3ᵉ = microalgues.", chapter: "biocarburants" },
    { front: "2 avantages + 2 inconvénients des biocarburants ?", back: "✅ renouvelable, réduit la dépendance au pétrole. ❌ concurrence alimentaire, déforestation (huile de palme).", chapter: "biocarburants" },
    { front: "Bruxelles : quelle particularité ?", back: "3ᵉ Région du pays, bilingue, qui n'appartient à aucune province.", chapter: "belgique" },
    { front: "Où la Meuse se jette-t-elle ?", back: "Dans la mer du Nord (comme l'Escaut). Elle traverse France, Belgique, Pays-Bas.", chapter: "hydro" },
    { front: "Que sont les polders ?", back: "Des terres gagnées sur la mer, en Basse Belgique (côte/plaine flamande).", chapter: "relief" },
    { front: "Le sillon Sambre-et-Meuse ?", back: "La vallée de la Sambre puis de la Meuse (Mons → Charleroi → Namur → Liège) ; elle sépare la Moyenne de la Haute Belgique et fut l'ancien axe industriel wallon (charbon, sidérurgie).", chapter: "relief" },
    { front: "Belgique : capitale, superficie, population ?", back: "Capitale : Bruxelles · ≈ 30 700 km² · ≈ 11,7 millions d'habitants.", chapter: "belgique" },
    { front: "Où est la Communauté germanophone ?", back: "À l'est de la Wallonie : les cantons de l'Est (région d'Eupen), à la frontière allemande.", chapter: "belgique" },
    { front: "Combien de communes à Bruxelles ?", back: "19 communes ; Région bilingue (français + néerlandais).", chapter: "belgique" },
    { front: "Le biogaz ?", back: "Du méthane produit par méthanisation de déchets organiques (3ᵉ type de biocarburant avec bioéthanol et biodiesel).", chapter: "biocarburants" },
    { front: "1ᵉʳ producteur mondial de cacao ?", back: "La Côte d'Ivoire (devant le Ghana). Les fèves sont exportées par le port de San Pedro.", chapter: "agro" },
    { front: "Qui est Barry Callebaut ?", back: "Une entreprise belge, n°1 mondial de la transformation du chocolat (le cacao cultivé au Sud est transformé au Nord).", chapter: "agro" },
    { front: "Qui domine l'agroalimentaire mondial ?", back: "Une dizaine de multinationales (Nestlé, Mondelez, Mars, Unilever, Danone, Coca-Cola, PepsiCo, Kellogg's…) qui possèdent la plupart des marques et fixent les prix.", chapter: "agro" },
    { front: "Cacao : conséquences + solution ?", back: "Producteurs du Sud mal payés, travail des enfants, déforestation. Solution : le commerce équitable + une consommation responsable.", chapter: "agro" },
    { front: "Cacao : d'où vient la production mondiale ?", back: "≈ 75 % d'Afrique, 18 % d'Amérique, 7 % d'Asie &amp; Océanie. La Côte d'Ivoire est le 1ᵉʳ producteur (devant le Ghana).", chapter: "agro" },
    { front: "Cacao : qui gagne quoi (chaîne de valeur) ?", back: "Le planteur du Sud ne touche qu'une petite part du prix du chocolat ; l'essentiel va à la transformation et à la distribution (au Nord). D'où le commerce équitable.", chapter: "agro" },
    { front: "Cacao et eau ?", back: "Les plantations sont très gourmandes en eau : ≈ 12 650 litres d'eau pour produire 1 kg de fèves de cacao.", chapter: "agro" }
  ];

  window.registerSubject('geo', {
    subtitle: 'Géo — la Belgique (régions, provinces, relief, fleuves) + biocarburants & agroalimentaire',
    content: {
      sections: sections,
      questions: questions,
      flashcards: flashcards,
      demos: {},
      navLabels: { formules: '📌 Repères', exercices: '🎯 Exercices' },
      chapOrder: ['belgique', 'relief', 'hydro', 'biocarburants', 'agro'],
      chapLabels: { belgique: 'La Belgique', relief: 'Relief', hydro: 'Hydrographie', biocarburants: 'Biocarburants', agro: 'Cacao & agroalimentaire' }
    }
  });
})();
