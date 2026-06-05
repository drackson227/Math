/* GR2 Study — Contenu HISTOIRE (4ème)
   Les Temps modernes : grandes périodes · le livre (imprimerie) ·
   Humanisme & Renaissance · Réforme protestante · Absolutisme (Louis XIV)
   + compétence « critique de document » + onglet Personnages.
   S'enregistre auprès de subjects.js via window.registerSubject. */
(function () {
  'use strict';
  if (typeof window.registerSubject !== 'function') return;

  /* helper image */
  function fig(src, cap, w) {
    return '<figure class="hfig" style="max-width:' + (w || 170) + 'px">' +
      '<img src="' + src + '" alt="' + cap.replace(/"/g, '') + '" loading="lazy">' +
      '<figcaption>' + cap + '</figcaption></figure>';
  }

  /* frise chronologique (SVG) */
  var TIMELINE =
    '<div style="overflow-x:auto; margin:1rem 0;"><svg viewBox="0 0 920 180" style="width:100%; min-width:560px; height:auto; font-family:inherit;">' +
    '<text x="460" y="22" text-anchor="middle" font-size="17" font-weight="800" fill="#9b8cff">🕰️ La frise du temps</text>' +
    // segments
    '<rect x="10"  y="60" width="232" height="48" rx="6" fill="#8d6e63"/>' +
    '<rect x="248" y="60" width="156" height="48" rx="6" fill="#c79a3b"/>' +
    '<rect x="410" y="60" width="164" height="48" rx="6" fill="#6d8c4a"/>' +
    '<rect x="580" y="56" width="186" height="56" rx="6" fill="#7c5cff" stroke="#fff" stroke-width="2"/>' +
    '<rect x="772" y="60" width="138" height="48" rx="6" fill="#4a8cc7"/>' +
    // segment names
    '<text x="126" y="89" text-anchor="middle" font-size="13" font-weight="700" fill="#fff">Préhistoire</text>' +
    '<text x="326" y="89" text-anchor="middle" font-size="13" font-weight="700" fill="#fff">Antiquité</text>' +
    '<text x="492" y="89" text-anchor="middle" font-size="13" font-weight="700" fill="#fff">Moyen Âge</text>' +
    '<text x="673" y="80" text-anchor="middle" font-size="13" font-weight="800" fill="#fff">Temps</text>' +
    '<text x="673" y="96" text-anchor="middle" font-size="13" font-weight="800" fill="#fff">modernes</text>' +
    '<text x="841" y="89" text-anchor="middle" font-size="12" font-weight="700" fill="#fff">Contemp.</text>' +
    // boundary dates
    '<text x="245" y="130" text-anchor="middle" font-size="12" fill="#cfc6ff">≈ −3300</text>' +
    '<text x="407" y="130" text-anchor="middle" font-size="12" fill="#cfc6ff">476</text>' +
    '<text x="577" y="130" text-anchor="middle" font-size="12" fill="#cfc6ff">1492</text>' +
    '<text x="769" y="130" text-anchor="middle" font-size="12" fill="#cfc6ff">1789</text>' +
    '<text x="245" y="146" text-anchor="middle" font-size="10" fill="#8a86a8">écriture</text>' +
    '<text x="407" y="146" text-anchor="middle" font-size="10" fill="#8a86a8">chute Rome</text>' +
    '<text x="577" y="146" text-anchor="middle" font-size="10" fill="#8a86a8">Amérique</text>' +
    '<text x="769" y="146" text-anchor="middle" font-size="10" fill="#8a86a8">Révolution</text>' +
    '<text x="673" y="170" text-anchor="middle" font-size="12" font-weight="700" fill="#9b8cff">⭐ notre programme</text>' +
    '</svg></div>';

  var sections = {};

  /* ---------------------- SYNTHÈSE (cours) ---------------------- */
  sections.synthese = `<div id="synthese" class="section active">
    <div style="text-align:center; margin-bottom:1.5rem;">
      <h2 style="font-size:30px; font-weight:800; color:var(--color-nav); margin:0;">🏛️ Histoire — 4ᵉ</h2>
      <p style="color:var(--text-secondary); margin-top:6px;">Les Temps modernes : livre, Renaissance, Réforme, Absolutisme</p>
    </div>

    <div class="synth-section">
      <h2>1. Les grandes périodes de l'histoire</h2>
      ${TIMELINE}
      <p>On découpe l'histoire en grandes périodes, séparées par des <strong>événements-clés</strong> :</p>
      <ul style="line-height:1.9;">
        <li><strong>Préhistoire</strong> → jusqu'à l'invention de l'écriture (≈ −3300).</li>
        <li><strong>Antiquité</strong> : de l'écriture à la <strong>chute de Rome (476)</strong>.</li>
        <li><strong>Moyen Âge</strong> : de 476 à <strong>1492</strong> (découverte de l'Amérique).</li>
        <li><strong>Temps modernes</strong> : de 1492 à la <strong>Révolution française (1789)</strong>. ← <em>notre programme.</em></li>
        <li><strong>Époque contemporaine</strong> : de 1789 à aujourd'hui.</li>
      </ul>
    </div>

    <div class="synth-section">
      <h2>2. Le livre, objet d'histoire (l'imprimerie)</h2>
      ${fig('gutenberg.jpg', 'Un atelier d’imprimerie (presse de Gutenberg)', 230)}
      <p>Avant le XVᵉ siècle, les livres étaient des <strong>manuscrits</strong> copiés à la main (surtout par des moines) : c'était <strong>long, rare et très cher</strong>.</p>
      <p>Vers <strong>1450</strong>, <strong>Gutenberg</strong> (à Mayence) met au point l'<strong>imprimerie à caractères mobiles</strong>. Conséquences énormes :</p>
      <ul style="line-height:1.9;">
        <li>Les livres deviennent <strong>plus nombreux, plus rapides à produire et moins chers</strong>.</li>
        <li>Les <strong>idées circulent vite</strong> dans toute l'Europe → l'imprimerie diffuse l'<strong>Humanisme</strong> puis la <strong>Réforme</strong>.</li>
        <li>Plus de gens apprennent à lire (alphabétisation).</li>
      </ul>
      <div class="simple-exp-box">
        <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Comprendre simplement</button>
        <div class="simple-exp-content">L'imprimerie est l'« internet » de l'époque : avant, copier un livre prenait des mois ; après, on en imprime des centaines. Une idée nouvelle (comme celle de Luther) peut alors se répandre partout en quelques semaines.</div>
      </div>
    </div>

    <div class="synth-section">
      <h2>3. Humanisme et Renaissance (XVᵉ–XVIᵉ s.)</h2>
      <p>La <strong>Renaissance</strong> est un grand mouvement artistique et culturel né en <strong>Italie</strong> (Florence) au XVᵉ siècle, qui <strong>redécouvre l'Antiquité</strong> gréco-romaine.</p>
      <p>L'<strong>Humanisme</strong> est le courant de pensée associé : il place l'<strong>être humain</strong> et sa raison au centre, valorise le <strong>savoir</strong>, l'<strong>esprit critique</strong> et l'éducation.</p>
      <div class="hfig-row">
        ${fig('vinci.jpg', 'Léonard de Vinci', 140)}
        ${fig('joconde.jpg', 'La Joconde (L. de Vinci)', 130)}
        ${fig('erasme.jpg', 'Érasme, humaniste', 130)}
        ${fig('michelange.jpg', 'Michel-Ange', 135)}
      </div>
      <ul style="line-height:1.9;">
        <li><strong>Humanistes</strong> : <strong>Érasme</strong> (« Éloge de la folie »), <strong>Thomas More</strong> (« Utopia »), Rabelais, Montaigne.</li>
        <li><strong>Artistes</strong> : <strong>Léonard de Vinci</strong>, <strong>Michel-Ange</strong>, Raphaël — perspective, réalisme, corps humain.</li>
        <li>Les <strong>mécènes</strong> (riches protecteurs, ex. les Médicis) financent les artistes.</li>
      </ul>
    </div>

    <div class="synth-section">
      <h2>4. La séparation des Églises chrétiennes : la Réforme (1517)</h2>
      ${fig('luther.jpg', 'Martin Luther (1483–1546)', 150)}
      <p>Au début du XVIᵉ s., beaucoup reprochent à l'Église catholique ses abus (richesse, vente des <strong>indulgences</strong> = « payer pour le pardon des péchés »).</p>
      <p>En <strong>1517</strong>, le moine allemand <strong>Martin Luther</strong> (1483–1546) affiche ses <strong>95 thèses</strong> (à Wittenberg) contre ces abus. Ses principes :</p>
      <ul style="line-height:1.9;">
        <li>Le <strong>salut par la foi</strong> seule (pas par l'argent ni les œuvres).</li>
        <li>La <strong>Bible</strong> comme seule autorité (chacun peut la lire, d'où l'importance de l'imprimerie).</li>
      </ul>
      <p><strong>Jean Calvin</strong> développe ensuite le protestantisme à Genève (idée de la <strong>prédestination</strong>). En Angleterre, <strong>Henri VIII</strong> fonde l'<strong>anglicanisme</strong>. La chrétienté se <strong>divise</strong> : catholiques, <strong>protestants</strong> (luthériens, calvinistes), anglicans, orthodoxes.</p>
      <div class="hfig-row">
        ${fig('europe_religions.jpg', 'Les 95 thèses de Luther (1517)', 150)}
        ${fig('calvin.jpg', 'Jean Calvin (Genève)', 125)}
        ${fig('trente.jpg', 'Le Concile de Trente (1545–1563)', 170)}
        ${fig('henri4.jpg', 'Henri IV (Édit de Nantes, 1598)', 125)}
      </div>
      <p>L'Église catholique réagit : c'est la <strong>Contre-Réforme</strong> (Concile de <strong>Trente</strong>, 1545–1563 ; les Jésuites). En France, des <strong>guerres de religion</strong> éclatent (massacre de la <strong>Saint-Barthélemy, 1572</strong>) ; elles s'apaisent avec l'<strong>Édit de Nantes (1598)</strong> d'Henri IV (tolérance pour les protestants).</p>
    </div>

    <div class="synth-section">
      <h2>5. L'Absolutisme : la monarchie absolue (Louis XIV)</h2>
      ${fig('louis14.jpg', 'Louis XIV, le Roi-Soleil (1638–1715)', 165)}
      <p>L'<strong>absolutisme</strong> = un système où le roi détient <strong>tous les pouvoirs</strong> (législatif, exécutif, judiciaire). Il les tient de Dieu : c'est la <strong>monarchie de droit divin</strong>.</p>
      <p>Le modèle est <strong>Louis XIV</strong> (1638–1715), le <strong>Roi-Soleil</strong> : « <em>L'État, c'est moi</em> ». Il :</p>
      <ul style="line-height:1.9;">
        <li>concentre le pouvoir et <strong>contrôle la noblesse</strong> en l'attirant au château de <strong>Versailles</strong> ;</li>
        <li>s'appuie sur son ministre <strong>Colbert</strong> et le <strong>mercantilisme</strong> (enrichir l'État : exporter plus qu'importer, développer manufactures et commerce) ;</li>
        <li><strong>révoque l'Édit de Nantes (1685)</strong> → persécution des protestants.</li>
      </ul>
      ${fig('versailles.jpg', 'Le château de Versailles', 280)}
      <p>La société d'<strong>Ancien Régime</strong> est divisée en <strong>3 ordres</strong> : le <strong>clergé</strong>, la <strong>noblesse</strong> (privilégiés) et le <strong>tiers état</strong> (le reste, qui paie les impôts).</p>
    </div>
  </div>`;

  /* ---------------------- DATES & REPÈRES ---------------------- */
  sections.formules = `<div id="formules" class="section">
    <h2 style="font-size:30px; font-weight:800; color:var(--color-nav); margin-bottom:1rem;">📅 Dates & repères clés</h2>
    ${TIMELINE}
    <div class="formula-grid">
      <div>
        <div class="formula-box"><h3>Les bornes des périodes</h3><p style="line-height:2; margin:0;">≈ −3300 écriture · <strong>476</strong> chute de Rome · <strong>1492</strong> Amérique · <strong>1789</strong> Révolution</p></div>
        <div class="formula-box"><h3>Le livre</h3><p style="line-height:2; margin:0;"><strong>≈ 1450</strong> : <strong>Gutenberg</strong> invente l'imprimerie (caractères mobiles).</p></div>
        <div class="formula-box"><h3>Humanisme & Renaissance</h3><p style="line-height:1.9; margin:0;">Née en <strong>Italie</strong> · Érasme · Thomas More · Léonard de Vinci · Michel-Ange · mécènes (Médicis).</p></div>
      </div>
      <div>
        <div class="formula-box"><h3>La Réforme</h3><p style="line-height:1.9; margin:0;"><strong>1517</strong> Luther, 95 thèses · Calvin (Genève) · Concile de <strong>Trente (1545-1563)</strong> · <strong>1572</strong> Saint-Barthélemy · <strong>1598</strong> Édit de Nantes.</p></div>
        <div class="formula-box"><h3>L'Absolutisme</h3><p style="line-height:1.9; margin:0;"><strong>Louis XIV (1638-1715)</strong>, Roi-Soleil, Versailles · Colbert + mercantilisme · <strong>1685</strong> révocation de l'Édit de Nantes.</p></div>
        <div class="formula-box"><h3>3 ordres (Ancien Régime)</h3><p style="line-height:1.9; margin:0;"><strong>Clergé</strong> · <strong>Noblesse</strong> (privilégiés) · <strong>Tiers état</strong> (paie les impôts).</p></div>
      </div>
    </div>
  </div>`;

  /* ---------------------- MÉTHODE ---------------------- */
  sections.methodes = `<div id="methodes" class="section">
    <h2 style="font-size:30px; font-weight:800; color:var(--color-nav); margin-bottom:1rem;">📝 Méthode — critiquer un document</h2>

    <div class="synth-section">
      <h2>La « carte d'identité » d'un document</h2>
      <p>Pour analyser un document, on répond <strong>dans l'ordre</strong> :</p>
      <div class="step-item"><div class="step-num">1</div><div class="step-text"><strong>Nature</strong> : texte, image, carte, tableau, objet… ?</div></div>
      <div class="step-item"><div class="step-num">2</div><div class="step-text"><strong>Auteur</strong> : qui l'a produit ? (et son point de vue)</div></div>
      <div class="step-item"><div class="step-num">3</div><div class="step-text"><strong>Date & lieu</strong> : quand et où ?</div></div>
      <div class="step-item"><div class="step-num">4</div><div class="step-text"><strong>Source / destinataire</strong> : d'où vient le document, à qui s'adresse-t-il ?</div></div>
      <div class="step-item"><div class="step-num">5</div><div class="step-text"><strong>Sujet</strong> : de quoi parle-t-il ? (idée principale)</div></div>
    </div>

    <div class="synth-section">
      <h2>Fiabilité, contexte, problématique</h2>
      <div class="step-item"><div class="step-num">A</div><div class="step-text"><strong>Pertinence</strong> : le document répond-il à la question posée ?</div></div>
      <div class="step-item"><div class="step-num">B</div><div class="step-text"><strong>Fiabilité</strong> : source <strong>primaire</strong> (d'époque, témoin direct) ou <strong>secondaire</strong> (postérieure) ? L'auteur a-t-il un <strong>parti pris</strong> ? → arguments <em>pour</em> et <em>contre</em>.</div></div>
      <div class="step-item"><div class="step-num">C</div><div class="step-text"><strong>Contexte</strong> : replacer le document dans son époque (que se passait-il alors ?).</div></div>
      <div class="step-item"><div class="step-num">D</div><div class="step-text"><strong>Problématique</strong> : transformer le sujet en une <strong>question</strong> claire à laquelle on va répondre.</div></div>
    </div>
  </div>`;

  /* ---------------------- EXERCICES (S'entraîner) ---------------------- */
  sections.exercices = `<div id="exercices" class="section">
    <h2 style="font-size:30px; font-weight:800; color:var(--color-nav); margin-bottom:1rem;">🎯 S'entraîner</h2>
    <p style="color:var(--text-secondary); margin-bottom:1.2rem;">Réponds de tête, puis vérifie. Le <strong>Quiz</strong> et les <strong>Flashcards</strong> testent tout automatiquement.</p>

    <div class="exercise-card">
      <h3 style="font-size:20px; font-weight:600; color:var(--color-nav);">📋 À connaître par cœur</h3>
      <ul style="line-height:2;">
        <li>Les <strong>5 grandes périodes</strong> et leurs bornes (476, 1492, 1789).</li>
        <li>Qui invente l'<strong>imprimerie</strong>, quand, et 2 conséquences.</li>
        <li>Définir <strong>Humanisme</strong> et <strong>Renaissance</strong> + 2 humanistes.</li>
        <li>Luther : <strong>date, 95 thèses, 2 principes</strong>.</li>
        <li>Définir l'<strong>absolutisme</strong> + 3 actions de Louis XIV.</li>
        <li>Les <strong>3 ordres</strong> de l'Ancien Régime.</li>
        <li>La <strong>carte d'identité</strong> d'un document (5 étapes).</li>
      </ul>
    </div>

    <div class="exercise-card">
      <h3 style="font-size:20px; font-weight:600; color:var(--color-nav);">🔗 Relie cause → conséquence</h3>
      <ul style="line-height:2;">
        <li>Imprimerie (1450) → <strong>diffusion rapide des idées</strong> (Humanisme, Réforme).</li>
        <li>Vente des indulgences → <strong>colère de Luther → Réforme (1517)</strong>.</li>
        <li>Réforme → <strong>division de la chrétienté</strong> → guerres de religion.</li>
        <li>Peur de la noblesse rebelle → <strong>Louis XIV l'enferme à Versailles</strong>.</li>
      </ul>
    </div>
  </div>`;

  /* ---------------------- ERREURS ---------------------- */
  sections.erreurs = `<div id="erreurs" class="section">
    <h2 style="font-size:30px; font-weight:800; color:var(--color-nav); margin-bottom:1rem;">⚠️ Pièges fréquents</h2>
    <div class="formula-grid">
      <div class="formula-box"><h3>❌ Confondre Humanisme et Renaissance</h3><p><strong>Renaissance</strong> = mouvement <em>artistique/culturel</em> · <strong>Humanisme</strong> = <em>courant de pensée</em> (l'homme et la raison au centre). Liés mais différents.</p></div>
      <div class="formula-box"><h3>❌ Se tromper de date pour la Réforme</h3><p>La Réforme protestante commence en <strong>1517</strong> (95 thèses de Luther), pas au Moyen Âge.</p></div>
      <div class="formula-box"><h3>❌ « Protestant = orthodoxe »</h3><p>Non : la Réforme crée les <strong>protestants</strong> (luthériens, calvinistes) et les anglicans. Les <strong>orthodoxes</strong> s'étaient séparés bien avant (1054).</p></div>
      <div class="formula-box"><h3>❌ Absolutisme = démocratie</h3><p>Au contraire : le roi a <strong>tous les pouvoirs</strong> (droit divin). Le peuple n'a aucun pouvoir politique.</p></div>
      <div class="formula-box"><h3>❌ Confondre source primaire et secondaire</h3><p><strong>Primaire</strong> = document <em>d'époque</em> (témoin direct). <strong>Secondaire</strong> = analyse écrite <em>plus tard</em> par un historien.</p></div>
      <div class="formula-box"><h3>❌ Édit de Nantes : signé / révoqué</h3><p><strong>1598</strong> : Henri IV <em>signe</em> l'Édit (tolérance). <strong>1685</strong> : Louis XIV le <em>révoque</em> (fin de la tolérance).</p></div>
    </div>
  </div>`;

  /* ---------------------- ONGLET BONUS : PERSONNAGES ---------------------- */
  function perso(img, name, dates, role) {
    return '<div class="perso-card"><img src="' + img + '" alt="' + name + '" loading="lazy">' +
      '<h4>' + name + '</h4><div class="dates">' + dates + '</div><p>' + role + '</p></div>';
  }
  var PERSONNAGES = `
    <h2 style="font-size:30px; font-weight:800; color:var(--color-nav); margin-bottom:0.4rem;">👑 Personnages importants</h2>
    <p style="color:var(--text-secondary); margin-bottom:0.6rem;">Les visages à reconnaître pour l'examen.</p>
    <div class="perso-grid">
      ${perso('gutenberg.jpg', 'Gutenberg', '≈ 1400–1468', 'Invente l’imprimerie à caractères mobiles (≈ 1450).')}
      ${perso('erasme.jpg', 'Érasme', '1466–1536', 'Grand humaniste, auteur de « L’Éloge de la folie ».')}
      ${perso('vinci.jpg', 'Léonard de Vinci', '1452–1519', 'Artiste et savant de la Renaissance (La Joconde).')}
      ${perso('michelange.jpg', 'Michel-Ange', '1475–1564', 'Sculpteur/peintre (David, plafond de la Sixtine).')}
      ${perso('luther.jpg', 'Martin Luther', '1483–1546', '95 thèses (1517) : il lance la Réforme protestante.')}
      ${perso('calvin.jpg', 'Jean Calvin', '1509–1564', 'Réformateur à Genève (prédestination).')}
      ${perso('charlesquint.jpg', 'Charles Quint', '1500–1558', 'Empereur catholique ; les Pays-Bas espagnols.')}
      ${perso('henri4.jpg', 'Henri IV', '1553–1610', 'Signe l’Édit de Nantes (1598) : tolérance.')}
      ${perso('louis14.jpg', 'Louis XIV', '1638–1715', 'Le Roi-Soleil : modèle de la monarchie absolue.')}
    </div>`;

  /* ---------------------- QUIZ ---------------------- */
  var questions = [
    { q: "Quel événement marque la fin de l'Antiquité ?", opts: ["La chute de Rome (476)", "La découverte de l'Amérique (1492)", "La Révolution française (1789)", "L'invention de l'écriture"], ans: 0, chapter: "periodes", difficulty: "facile", exp: "L'Antiquité se termine à la chute de l'Empire romain d'Occident, en 476." },
    { q: "Les Temps modernes vont de…", opts: ["1492 à 1789", "476 à 1492", "1789 à aujourd'hui", "−3300 à 476"], ans: 0, chapter: "periodes", difficulty: "intermediaire", exp: "Des Grandes Découvertes (1492) à la Révolution française (1789)." },
    { q: "Dans l'ordre, les 5 périodes sont :", opts: ["Préhistoire, Antiquité, Moyen Âge, Temps modernes, Époque contemporaine", "Antiquité, Préhistoire, Moyen Âge, moderne, contemporaine", "Moyen Âge, Antiquité, Préhistoire, moderne, contemporaine", "Préhistoire, Moyen Âge, Antiquité, moderne, contemporaine"], ans: 0, chapter: "periodes", difficulty: "intermediaire", exp: "Préhistoire → Antiquité → Moyen Âge → Temps modernes → Époque contemporaine." },
    { q: "Qui invente l'imprimerie à caractères mobiles, vers 1450 ?", opts: ["Gutenberg", "Luther", "Léonard de Vinci", "Louis XIV"], ans: 0, chapter: "livre", difficulty: "facile", exp: "Johannes Gutenberg, à Mayence, vers 1450." },
    { q: "Avant l'imprimerie, les livres étaient…", opts: ["copiés à la main (manuscrits), rares et chers", "imprimés en série", "interdits", "gratuits"], ans: 0, chapter: "livre", difficulty: "facile", exp: "Des manuscrits copiés à la main (souvent par des moines) : longs, rares, coûteux." },
    { q: "Principale conséquence de l'imprimerie ?", opts: ["La diffusion rapide des idées", "La fin des guerres", "L'invention de l'électricité", "La chute de Rome"], ans: 0, chapter: "livre", difficulty: "intermediaire", exp: "Les idées (Humanisme, Réforme) se répandent vite et à bas prix." },
    { q: "La Renaissance est née en…", opts: ["Italie", "Allemagne", "Angleterre", "Belgique"], ans: 0, chapter: "humanisme", difficulty: "facile", exp: "En Italie (Florence) au XVᵉ siècle, par la redécouverte de l'Antiquité." },
    { q: "L'Humanisme place au centre…", opts: ["l'être humain et sa raison", "le roi", "l'argent", "l'Église seule"], ans: 0, chapter: "humanisme", difficulty: "intermediaire", exp: "L'humanisme valorise l'homme, le savoir et l'esprit critique." },
    { q: "Lequel est un humaniste célèbre ?", opts: ["Érasme", "Colbert", "Gutenberg", "Mazarin"], ans: 0, chapter: "humanisme", difficulty: "intermediaire", exp: "Érasme (« Éloge de la folie »). Aussi Thomas More, Rabelais, Montaigne." },
    { q: "Qui a peint La Joconde ?", opts: ["Léonard de Vinci", "Michel-Ange", "Raphaël", "Luther"], ans: 0, chapter: "humanisme", difficulty: "facile", exp: "Léonard de Vinci, figure majeure de la Renaissance." },
    { q: "Qui finançait les artistes de la Renaissance ?", opts: ["les mécènes (ex. les Médicis)", "l'État seul", "les paysans", "les protestants"], ans: 0, chapter: "humanisme", difficulty: "difficile", exp: "Les mécènes, riches protecteurs comme la famille Médicis à Florence." },
    { q: "En quelle année Luther affiche-t-il ses 95 thèses ?", opts: ["1517", "1492", "1598", "1685"], ans: 0, chapter: "reforme", difficulty: "facile", exp: "1517 : début de la Réforme protestante." },
    { q: "Que dénonce Luther en priorité ?", opts: ["la vente des indulgences", "l'imprimerie", "les rois", "les humanistes"], ans: 0, chapter: "reforme", difficulty: "intermediaire", exp: "Les indulgences (« payer pour le pardon des péchés ») et les abus de l'Église." },
    { q: "Un principe protestant de Luther :", opts: ["le salut par la foi seule", "payer pour être sauvé", "obéir au pape", "interdire la Bible"], ans: 0, chapter: "reforme", difficulty: "intermediaire", exp: "Salut par la foi seule + la Bible comme seule autorité." },
    { q: "Qui développe le protestantisme à Genève ?", opts: ["Jean Calvin", "Henri IV", "Charles Quint", "Gutenberg"], ans: 0, chapter: "reforme", difficulty: "intermediaire", exp: "Jean Calvin (idée de la prédestination)." },
    { q: "Le massacre de la Saint-Barthélemy a lieu en :", opts: ["1572", "1517", "1685", "1789"], ans: 0, chapter: "reforme", difficulty: "difficile", exp: "1572 : massacre de protestants en France pendant les guerres de religion." },
    { q: "L'Édit de Nantes (1598) est signé par…", opts: ["Henri IV (tolérance pour les protestants)", "Louis XIV", "Luther", "le pape"], ans: 0, chapter: "reforme", difficulty: "difficile", exp: "Henri IV en 1598 ; Louis XIV le révoquera en 1685." },
    { q: "La réaction catholique à la Réforme s'appelle…", opts: ["la Contre-Réforme (Concile de Trente)", "la Renaissance", "l'absolutisme", "l'Humanisme"], ans: 0, chapter: "reforme", difficulty: "difficile", exp: "Contre-Réforme : Concile de Trente (1545-1563), les Jésuites." },
    { q: "L'absolutisme, c'est…", opts: ["le roi détient tous les pouvoirs (droit divin)", "le peuple vote les lois", "le partage des pouvoirs", "une république"], ans: 0, chapter: "absolutisme", difficulty: "facile", exp: "Monarchie absolue de droit divin : le roi tient son pouvoir de Dieu." },
    { q: "Quel roi est le modèle de l'absolutisme ?", opts: ["Louis XIV (le Roi-Soleil)", "Henri IV", "Charles Quint", "Louis XIII"], ans: 0, chapter: "absolutisme", difficulty: "facile", exp: "Louis XIV (1638-1715), « L'État c'est moi », château de Versailles." },
    { q: "Comment Louis XIV contrôle-t-il la noblesse ?", opts: ["en l'attirant à Versailles", "en la chassant du pays", "en la laissant gouverner", "en supprimant les impôts"], ans: 0, chapter: "absolutisme", difficulty: "intermediaire", exp: "À Versailles, la noblesse est surveillée et occupée → elle ne peut plus se révolter." },
    { q: "Colbert développe quelle politique économique ?", opts: ["le mercantilisme", "le communisme", "le libéralisme total", "la décroissance"], ans: 0, chapter: "absolutisme", difficulty: "difficile", exp: "Le mercantilisme : enrichir l'État (exporter plus qu'importer, manufactures)." },
    { q: "Les 3 ordres de l'Ancien Régime sont :", opts: ["clergé, noblesse, tiers état", "rois, reines, princes", "riches, classe moyenne, pauvres", "nord, centre, sud"], ans: 0, chapter: "absolutisme", difficulty: "intermediaire", exp: "Clergé et noblesse (privilégiés) + tiers état (qui paie les impôts)." },
    { q: "Une source PRIMAIRE est :", opts: ["un document d'époque (témoin direct)", "un livre d'historien récent", "un résumé scolaire", "une opinion personnelle"], ans: 0, chapter: "methode", difficulty: "intermediaire", exp: "Primaire = produit à l'époque étudiée ; secondaire = analyse postérieure." },
    { q: "Première étape de la carte d'identité d'un document ?", opts: ["la nature (texte, image, carte…)", "la problématique", "la conclusion", "l'avis personnel"], ans: 0, chapter: "methode", difficulty: "facile", exp: "On commence par : nature, auteur, date/lieu, source, sujet." }
  ];

  /* ---------------------- FLASHCARDS ---------------------- */
  var flashcards = [
    { front: "Les 5 grandes périodes ?", back: "Préhistoire · Antiquité (→476) · Moyen Âge (476-1492) · Temps modernes (1492-1789) · Époque contemporaine (1789→).", chapter: "periodes" },
    { front: "3 dates-bornes à retenir ?", back: "476 (chute de Rome) · 1492 (Amérique) · 1789 (Révolution française).", chapter: "periodes" },
    { front: "Qui invente l'imprimerie ? Quand ?", back: "Gutenberg, vers 1450 (caractères mobiles, à Mayence).", chapter: "livre" },
    { front: "2 conséquences de l'imprimerie ?", back: "Livres moins chers et plus nombreux + diffusion rapide des idées (Humanisme, Réforme) + alphabétisation.", chapter: "livre" },
    { front: "Renaissance vs Humanisme ?", back: "Renaissance = mouvement artistique/culturel (né en Italie). Humanisme = courant de pensée centré sur l'homme et la raison.", chapter: "humanisme" },
    { front: "2 humanistes + 2 artistes ?", back: "Humanistes : Érasme, Thomas More (Rabelais, Montaigne). Artistes : Léonard de Vinci, Michel-Ange.", chapter: "humanisme" },
    { front: "Qu'est-ce qu'un mécène ?", back: "Un riche protecteur qui finance les artistes (ex. les Médicis à Florence).", chapter: "humanisme" },
    { front: "Réforme : qui, quand, quoi ?", back: "Martin Luther, 1517, 95 thèses contre les abus de l'Église (indulgences).", chapter: "reforme" },
    { front: "2 principes de Luther ?", back: "Le salut par la foi seule + la Bible comme seule autorité.", chapter: "reforme" },
    { front: "Conséquence de la Réforme ?", back: "Division de la chrétienté : catholiques / protestants (luthériens, calvinistes) / anglicans. Contre-Réforme (Concile de Trente).", chapter: "reforme" },
    { front: "1572 et 1598 ?", back: "1572 = massacre de la Saint-Barthélemy. 1598 = Édit de Nantes (Henri IV, tolérance des protestants).", chapter: "reforme" },
    { front: "Qu'est-ce que l'absolutisme ?", back: "Une monarchie où le roi détient tous les pouvoirs, qu'il tient de Dieu (droit divin).", chapter: "absolutisme" },
    { front: "Louis XIV : 3 choses à retenir ?", back: "Roi-Soleil (1638-1715), Versailles (contrôle la noblesse), Colbert + mercantilisme. Révoque l'Édit de Nantes (1685).", chapter: "absolutisme" },
    { front: "Les 3 ordres de l'Ancien Régime ?", back: "Clergé · Noblesse (privilégiés) · Tiers état (paie les impôts).", chapter: "absolutisme" },
    { front: "Carte d'identité d'un document ?", back: "Nature · Auteur · Date/lieu · Source/destinataire · Sujet.", chapter: "methode" },
    { front: "Source primaire vs secondaire ?", back: "Primaire = document d'époque (témoin direct). Secondaire = analyse écrite plus tard par un historien.", chapter: "methode" }
  ];

  window.registerSubject('histoire', {
    subtitle: 'Histoire 4ᵉ — Temps modernes : livre, Renaissance, Réforme, Absolutisme',
    content: {
      sections: sections,
      questions: questions,
      flashcards: flashcards,
      demos: {},
      navLabels: { formules: '📅 Dates & repères', exercices: "🎯 S'entraîner" },
      extraTabs: [{ label: '👑 Personnages', html: PERSONNAGES }],
      chapOrder: ['periodes', 'livre', 'humanisme', 'reforme', 'absolutisme', 'methode'],
      chapLabels: { periodes: 'Grandes périodes', livre: 'Le livre', humanisme: 'Humanisme & Renaissance', reforme: 'Réforme protestante', absolutisme: 'Absolutisme', methode: 'Critique de document' }
    }
  });
})();
