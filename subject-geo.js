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
      exam: "<ul><li><strong>Flandre :</strong> Anvers, Limbourg, Flandre-Orientale, Flandre-Occidentale, Brabant flamand.</li><li><strong>Wallonie :</strong> Brabant wallon, Hainaut, Liège, Namur, Luxembourg (belge).</li><li>Sache repérer ta province et la situer (nord/sud).</li></ul>"
    }
  });

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
      <figure class="hfig" style="max-width:440px; display:block; margin:1rem auto;"><img src="belgique_carte.jpg" alt="Carte des provinces de Belgique" loading="lazy"><figcaption>Les 10 provinces de Belgique (Flandre au nord, Wallonie au sud).</figcaption></figure>
      <div class="key-rule"><div class="formula-main">10 provinces = 5 (Flandre) + 5 (Wallonie) · Bruxelles = à part</div></div>
    </div>

    <div class="synth-section">
      <h2>3. Le relief : 3 grands ensembles</h2>
      <p>Le relief belge monte doucement du nord-ouest (mer) vers le sud-est (Ardenne).</p>
      <ul style="line-height:1.9;">
        <li><strong>La Basse Belgique</strong> (&lt; 100 m) : la côte, les <strong>polders</strong> et la plaine flamande.</li>
        <li><strong>La Moyenne Belgique</strong> (100–200 m) : plateaux fertiles (limons), région agricole.</li>
        <li><strong>La Haute Belgique</strong> (&gt; 200 m) : les plateaux de l'<strong>Ardenne</strong>. Point culminant : le <strong>Signal de Botrange</strong> (<strong>694 m</strong>, Hautes Fagnes).</li>
      </ul>
    </div>

    <div class="synth-section">
      <h2>4. L'hydrographie (les cours d'eau)</h2>
      <p>Deux grands fleuves drainent la Belgique vers la mer du Nord :</p>
      <ul style="line-height:1.9;">
        <li>La <strong>Meuse</strong> : traverse Namur et Liège (la Sambre la rejoint à Namur).</li>
        <li>L'<strong>Escaut</strong> : passe à Tournai, Gand et Anvers (la Lys le rejoint à Gand).</li>
        <li>Autres : la <strong>Sambre</strong>, la <strong>Lys</strong>, la <strong>Dendre</strong>, l'<strong>Ourthe</strong>, la <strong>Semois</strong> (Ardenne).</li>
      </ul>
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
        <div class="formula-box"><h3>Les fleuves</h3><div class="formula-main" style="font-size:18px;">la Meuse &nbsp;·&nbsp; l'Escaut</div><p class="note">Sambre → Meuse (à Namur) · Lys → Escaut (à Gand). Tout va vers la <strong>mer du Nord</strong>.</p></div>
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

  /* ---------------------- QUIZ ---------------------- */
  var questions = [
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
    { q: "Les biocarburants de 2ᵉ génération utilisent :", opts: ["des résidus et du bois (non alimentaires)", "uniquement du maïs", "de l'eau de mer", "du pétrole"], ans: 0, chapter: "biocarburants", difficulty: "difficile", exp: "2ᵉ génération = résidus/lignocellulose (paille, déchets, bois) → pas de concurrence alimentaire." }
  ];

  /* ---------------------- FLASHCARDS ---------------------- */
  var flashcards = [
    { front: "Les 3 Régions de Belgique ?", back: "Région flamande (Flandre), Région wallonne (Wallonie), Région de Bruxelles-Capitale.", chapter: "belgique" },
    { front: "Les 3 Communautés ?", back: "Française, flamande (néerlandophone), germanophone.", chapter: "belgique" },
    { front: "Région vs Communauté ?", back: "Région = le <strong>territoire</strong> (économie, environnement) · Communauté = les <strong>personnes</strong> (langue, école, culture).", chapter: "belgique" },
    { front: "Combien de provinces ? Réparties comment ?", back: "10 provinces : 5 en Flandre + 5 en Wallonie. Bruxelles = aucune province.", chapter: "belgique" },
    { front: "Les 5 provinces wallonnes (+ chefs-lieux) ?", back: "Brabant wallon (Wavre), Hainaut (Mons), Liège (Liège), Namur (Namur), Luxembourg (Arlon).", chapter: "belgique" },
    { front: "Les 5 provinces flamandes (+ chefs-lieux) ?", back: "Anvers (Anvers), Limbourg (Hasselt), Flandre-Orientale (Gand), Flandre-Occidentale (Bruges), Brabant flamand (Louvain).", chapter: "belgique" },
    { front: "Les 4 pays voisins ?", back: "France, Luxembourg, Allemagne, Pays-Bas (+ mer du Nord à l'ouest).", chapter: "belgique" },
    { front: "Les 3 ensembles de relief ?", back: "Basse Belgique (<100 m), Moyenne Belgique (100-200 m), Haute Belgique / Ardenne (>200 m).", chapter: "relief" },
    { front: "Point culminant de la Belgique ?", back: "Le Signal de Botrange, 694 m (Hautes Fagnes, Ardenne).", chapter: "relief" },
    { front: "Les 2 grands fleuves ?", back: "La Meuse (Namur, Liège) et l'Escaut (Tournai, Gand, Anvers). Tout va vers la mer du Nord.", chapter: "hydro" },
    { front: "Sambre et Lys : où rejoignent-elles ?", back: "La Sambre rejoint la Meuse à Namur ; la Lys rejoint l'Escaut à Gand.", chapter: "hydro" },
    { front: "Qu'est-ce qu'un biocarburant ?", back: "Un carburant produit à partir de biomasse (matière organique végétale/animale) : ressource renouvelable.", chapter: "biocarburants" },
    { front: "Bioéthanol vs biodiesel ?", back: "Bioéthanol = fermentation de plantes sucrées/amidon → essence. Biodiesel = transestérification d'huiles végétales → diesel.", chapter: "biocarburants" },
    { front: "1ʳᵉ vs 2ᵉ génération de biocarburants ?", back: "1ʳᵉ = cultures alimentaires (concurrence nourriture). 2ᵉ = résidus/bois non alimentaires. 3ᵉ = microalgues.", chapter: "biocarburants" },
    { front: "2 avantages + 2 inconvénients des biocarburants ?", back: "✅ renouvelable, réduit la dépendance au pétrole. ❌ concurrence alimentaire, déforestation (huile de palme).", chapter: "biocarburants" }
  ];

  window.registerSubject('geo', {
    subtitle: 'Géo — la Belgique (régions, provinces, relief, fleuves) + biocarburants',
    content: {
      sections: sections,
      questions: questions,
      flashcards: flashcards,
      demos: {},
      navLabels: { formules: '📌 Repères', exercices: '🎯 Exercices' },
      chapOrder: ['belgique', 'relief', 'hydro', 'biocarburants'],
      chapLabels: { belgique: 'La Belgique', relief: 'Relief', hydro: 'Hydrographie', biocarburants: 'Biocarburants' }
    }
  });
})();
