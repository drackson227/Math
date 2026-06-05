/* GR2 Study — Contenu FRANÇAIS (4ème)
   Séquences : le résumé · le mythe · l'argumentation · la comédie · la poésie
   + examen oral (présenter une œuvre).
   S'enregistre auprès de subjects.js via window.registerSubject. */
(function () {
  'use strict';
  if (typeof window.registerSubject !== 'function') return;

  var sections = {};

  /* ---------------------- SYNTHÈSE (cours) ---------------------- */
  sections.synthese = `<div id="synthese" class="section active">
    <div style="text-align:center; margin-bottom:1.5rem;">
      <h2 style="font-size:30px; font-weight:800; color:var(--color-nav); margin:0;">✍️ Français — 4ᵉ</h2>
      <p style="color:var(--text-secondary); margin-top:6px;">Résumé · Mythe · Argumentation · Comédie · Poésie</p>
    </div>

    <div class="synth-section">
      <h2>Séquence 4 — Le résumé de texte informatif</h2>
      <p>Un <strong>texte informatif</strong> donne des informations <strong>objectives</strong> (il informe, sans donner d'avis).</p>
      <p><strong>Résumer</strong>, c'est <strong>réduire</strong> un texte (souvent au <strong>quart</strong>) en gardant seulement l'<strong>essentiel</strong>. Règles d'or :</p>
      <ul style="line-height:1.9;">
        <li><strong>Reformuler</strong> avec ses propres mots (ne pas recopier).</li>
        <li>Rester <strong>fidèle</strong> au texte et <strong>neutre</strong> (pas d'avis personnel, pas de « je »).</li>
        <li>Respecter l'<strong>ordre des idées</strong> et le <strong>système d'énonciation</strong> de l'auteur.</li>
        <li>Supprimer les exemples, répétitions et détails ; garder les <strong>idées principales</strong>.</li>
      </ul>
    </div>

    <div class="synth-section">
      <h2>Séquence 5 — Le mythe</h2>
      <p>Un <strong>mythe</strong> est un <strong>récit</strong> ancien, souvent <strong>anonyme</strong>, transmis d'abord <strong>oralement</strong>, qui met en scène des <strong>dieux</strong> et des <strong>héros</strong>.</p>
      <p>Ses <strong>fonctions</strong> :</p>
      <ul style="line-height:1.9;">
        <li><strong>Expliquer</strong> le monde, ses origines, les phénomènes naturels (fonction <em>étiologique</em>).</li>
        <li>Transmettre des <strong>valeurs</strong> et des leçons à une communauté.</li>
      </ul>
      <p>Exemple grec : <strong>Prométhée</strong> vole le <strong>feu</strong> aux dieux pour le donner aux hommes ; <strong>Zeus</strong> le punit. (Explique l'origine du feu + le courage et la ruse.)</p>
    </div>

    <div class="synth-section">
      <h2>Séquence 6 — L'argumentation</h2>
      <p>Un <strong>texte argumenté</strong> défend une <strong>thèse</strong> (une opinion) pour agir sur le lecteur. À distinguer du texte informatif (neutre).</p>
      <div class="key-rule"><div class="formula-main" style="font-size:18px;">Convaincre = la raison &nbsp;|&nbsp; Persuader = les émotions</div></div>
      <ul style="line-height:1.9;">
        <li><strong>Convaincre</strong> : faire adhérer par la <strong>raison</strong> (arguments logiques, preuves, exemples).</li>
        <li><strong>Persuader</strong> : faire adhérer par les <strong>émotions / sentiments</strong> (registre affectif).</li>
      </ul>
      <p>Structure : <strong>thèse</strong> (l'opinion défendue) → <strong>arguments</strong> (les idées qui la soutiennent) → <strong>exemples</strong> (qui illustrent) → reliés par des <strong>connecteurs logiques</strong> (car, donc, mais, en effet, cependant…).</p>
    </div>

    <div class="synth-section">
      <h2>Séquence 7 — La comédie (théâtre)</h2>
      <p>Le <strong>théâtre</strong> est un texte <strong>joué</strong> sur scène. La <strong>comédie</strong> fait <strong>rire</strong> et finit bien ; la <strong>tragédie</strong> finit mal (personnages nobles, fatalité).</p>
      <p><strong>Vocabulaire :</strong> <strong>acte</strong> (grande partie), <strong>scène</strong> (sous-partie), <strong>réplique</strong> (ce que dit un personnage), <strong>tirade</strong> (longue réplique), <strong>monologue</strong> (seul en scène), <strong>aparté</strong> (au public, les autres « n'entendent pas »), <strong>didascalies</strong> (indications de mise en scène, en italique), <strong>quiproquo</strong> (malentendu, un pour un autre).</p>
      <p><strong>Les ressorts du comique :</strong> comique de <strong>mots</strong>, de <strong>gestes</strong>, de <strong>situation</strong>, de <strong>caractère</strong>, de <strong>répétition</strong>. Grand auteur : <strong>Molière</strong>.</p>
    </div>

    <div class="synth-section">
      <h2>Séquence 8 — La poésie</h2>
      <p>Vocabulaire : un <strong>vers</strong> (une ligne), une <strong>strophe</strong> (un groupe de vers), une <strong>rime</strong> (sons identiques à la fin des vers).</p>
      <ul style="line-height:1.9;">
        <li><strong>Compter les syllabes</strong> : <strong>alexandrin = 12</strong>, décasyllabe = 10, octosyllabe = 8.</li>
        <li><strong>Strophes</strong> : distique (2 vers), tercet (3), quatrain (4).</li>
        <li><strong>Disposition des rimes</strong> : plates/suivies <em>AABB</em>, croisées <em>ABAB</em>, embrassées <em>ABBA</em>.</li>
        <li><strong>Calligramme</strong> (Apollinaire) : poème dont la disposition dessine une forme.</li>
      </ul>
      <div class="simple-exp-box">
        <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Figures de style à connaître</button>
        <div class="simple-exp-content"><strong>Comparaison</strong> : rapproche 2 éléments avec un outil (<em>comme, tel, pareil à</em>). <strong>Métaphore</strong> : même idée mais <em>sans</em> outil (« cet homme est un lion »). <strong>Personnification</strong> : donner des traits humains à une chose. <strong>Hyperbole</strong> : exagération. <strong>Anaphore</strong> : répétition d'un mot en début de vers. <strong>Allitération</strong> (consonnes) / <strong>assonance</strong> (voyelles) : répétition de sons.</div>
      </div>
    </div>

    <div class="synth-section">
      <h2>Examen oral — présenter une œuvre (une chanson)</h2>
      <p>Présente l'œuvre choisie de façon structurée : <strong>biographie</strong> de l'auteur → <strong>contexte</strong> → <strong>thème</strong> et résumé → <strong>analyse</strong> (procédés, figures de style) → <strong>avis personnel argumenté</strong> (justifier ton choix).</p>
    </div>
  </div>`;

  /* ---------------------- NOTIONS & VOCABULAIRE ---------------------- */
  sections.formules = `<div id="formules" class="section">
    <h2 style="font-size:30px; font-weight:800; color:var(--color-nav); margin-bottom:1rem;">📌 Notions & vocabulaire</h2>
    <div class="formula-grid">
      <div>
        <div class="formula-box"><h3>Convaincre vs Persuader</h3><p style="line-height:1.9; margin:0;"><strong>Convaincre</strong> = la <strong>raison</strong> (logique, preuves). <strong>Persuader</strong> = les <strong>émotions</strong> (sentiments).</p></div>
        <div class="formula-box"><h3>Texte argumenté</h3><p style="line-height:1.9; margin:0;"><strong>Thèse</strong> → <strong>arguments</strong> → <strong>exemples</strong> + <strong>connecteurs logiques</strong> (car, donc, mais, en effet…).</p></div>
        <div class="formula-box"><h3>Vocabulaire du théâtre</h3><p style="line-height:1.9; margin:0;">acte · scène · réplique · <strong>tirade</strong> (longue) · <strong>monologue</strong> (seul) · <strong>aparté</strong> (au public) · <strong>didascalies</strong> · <strong>quiproquo</strong></p></div>
        <div class="formula-box"><h3>Les comiques</h3><p style="line-height:1.9; margin:0;">de <strong>mots</strong> · de <strong>gestes</strong> · de <strong>situation</strong> · de <strong>caractère</strong> · de <strong>répétition</strong></p></div>
      </div>
      <div>
        <div class="formula-box"><h3>Compter les syllabes</h3><div class="formula-main" style="font-size:17px;">alexandrin = 12 · décasyllabe = 10 · octosyllabe = 8</div></div>
        <div class="formula-box"><h3>Disposition des rimes</h3><p style="line-height:1.9; margin:0;">plates <em>AABB</em> · croisées <em>ABAB</em> · embrassées <em>ABBA</em></p></div>
        <div class="formula-box"><h3>Figures de style</h3><p style="line-height:1.9; margin:0;"><strong>Comparaison</strong> (avec « comme ») · <strong>Métaphore</strong> (sans outil) · <strong>Personnification</strong> · <strong>Hyperbole</strong> · <strong>Anaphore</strong> · <strong>Allitération</strong>/<strong>assonance</strong></p></div>
        <div class="formula-box"><h3>Le mythe</h3><p style="line-height:1.9; margin:0;">Récit ancien (dieux/héros) qui <strong>explique</strong> le monde et transmet des <strong>valeurs</strong>. Ex : Prométhée &amp; le feu.</p></div>
      </div>
    </div>
  </div>`;

  /* ---------------------- MÉTHODE ---------------------- */
  sections.methodes = `<div id="methodes" class="section">
    <h2 style="font-size:30px; font-weight:800; color:var(--color-nav); margin-bottom:1rem;">📝 Méthodes</h2>

    <div class="synth-section">
      <h2>Faire un résumé</h2>
      <div class="step-item"><div class="step-num">1</div><div class="step-text"><strong>Lire</strong> le texte en entier, repérer le <strong>thème</strong> et le <strong>plan</strong>.</div></div>
      <div class="step-item"><div class="step-num">2</div><div class="step-text">Dégager l'<strong>idée principale</strong> de chaque paragraphe.</div></div>
      <div class="step-item"><div class="step-num">3</div><div class="step-text"><strong>Supprimer</strong> exemples, répétitions, détails. <strong>Reformuler</strong> avec tes mots.</div></div>
      <div class="step-item"><div class="step-num">4</div><div class="step-text">Respecter la <strong>longueur</strong> demandée (≈ le quart), l'<strong>ordre</strong> et la <strong>neutralité</strong>.</div></div>
    </div>

    <div class="synth-section">
      <h2>Présenter une œuvre à l'oral</h2>
      <div class="step-item"><div class="step-num">1</div><div class="step-text"><strong>Présenter</strong> : titre, auteur (courte biographie), date, genre.</div></div>
      <div class="step-item"><div class="step-num">2</div><div class="step-text"><strong>Résumer</strong> le thème / le contenu.</div></div>
      <div class="step-item"><div class="step-num">3</div><div class="step-text"><strong>Analyser</strong> : procédés, figures de style, message.</div></div>
      <div class="step-item"><div class="step-num">4</div><div class="step-text"><strong>Donner un avis</strong> personnel <strong>argumenté</strong> (pourquoi ce choix ?).</div></div>
    </div>
  </div>`;

  /* ---------------------- EXERCICES ---------------------- */
  sections.exercices = `<div id="exercices" class="section">
    <h2 style="font-size:30px; font-weight:800; color:var(--color-nav); margin-bottom:1rem;">🎯 Exercices</h2>
    <p style="color:var(--text-secondary); margin-bottom:1.2rem;">Le <strong>Quiz</strong> et les <strong>Flashcards</strong> testent tout ça automatiquement.</p>

    <div class="exercise-card">
      <h3 style="font-size:20px; font-weight:600; color:var(--color-nav);">🔎 Reconnaître la figure de style</h3>
      <ul style="line-height:2;">
        <li>« Cet homme est <strong>un lion</strong>. » → <strong>métaphore</strong> (pas d'outil).</li>
        <li>« Il est fort <strong>comme</strong> un lion. » → <strong>comparaison</strong> (outil « comme »).</li>
        <li>« Le vent <strong>hurlait</strong> dans la nuit. » → <strong>personnification</strong>.</li>
        <li>« Je te l'ai dit <strong>mille fois</strong>. » → <strong>hyperbole</strong> (exagération).</li>
        <li>« <strong>Paris</strong> a gagné le match. » (= l'équipe) → <strong>métonymie</strong>.</li>
      </ul>
    </div>

    <div class="exercise-card">
      <h3 style="font-size:20px; font-weight:600; color:var(--color-nav);">📋 À maîtriser</h3>
      <ul style="line-height:2;">
        <li>Différencier <strong>convaincre</strong> et <strong>persuader</strong>.</li>
        <li>Différencier texte <strong>informatif</strong> et <strong>argumenté</strong>.</li>
        <li>Le <strong>vocabulaire du théâtre</strong> + les 5 <strong>comiques</strong>.</li>
        <li>Compter les syllabes d'un vers (alexandrin = 12).</li>
        <li>Les fonctions du <strong>mythe</strong>.</li>
      </ul>
    </div>
  </div>`;

  /* ---------------------- ERREURS ---------------------- */
  sections.erreurs = `<div id="erreurs" class="section">
    <h2 style="font-size:30px; font-weight:800; color:var(--color-nav); margin-bottom:1rem;">⚠️ Pièges fréquents</h2>
    <div class="formula-grid">
      <div class="formula-box"><h3>❌ Comparaison vs métaphore</h3><p>La <strong>comparaison</strong> a un outil (<em>comme, tel, ressembler à</em>). La <strong>métaphore</strong> n'en a <strong>pas</strong> (« cet homme est un lion »).</p></div>
      <div class="formula-box"><h3>❌ Convaincre = persuader</h3><p>Non : <strong>convaincre</strong> = par la <em>raison</em> (arguments) ; <strong>persuader</strong> = par les <em>émotions</em>.</p></div>
      <div class="formula-box"><h3>❌ Donner son avis dans un résumé</h3><p>Interdit ! Un résumé reste <strong>neutre</strong> et fidèle : pas de « je », pas de jugement.</p></div>
      <div class="formula-box"><h3>❌ Confondre tirade et monologue</h3><p><strong>Tirade</strong> = longue réplique <em>adressée à un autre</em>. <strong>Monologue</strong> = le personnage parle <em>seul</em>.</p></div>
      <div class="formula-box"><h3>❌ Texte informatif = argumenté</h3><p><strong>Informatif</strong> = informer, neutre. <strong>Argumenté</strong> = défendre une <em>thèse</em>, faire réagir.</p></div>
      <div class="formula-box"><h3>❌ Mal compter les syllabes</h3><p>Le « e » muet en fin de vers ne compte pas, mais à l'intérieur il peut compter. Un alexandrin = <strong>12</strong> syllabes.</p></div>
    </div>
  </div>`;

  /* ---------------------- QUIZ ---------------------- */
  var questions = [
    { q: "Dans un résumé, on doit…", opts: ["rester neutre et reformuler", "donner son avis", "tout recopier", "ajouter des exemples"], ans: 0, chapter: "resume", difficulty: "facile", exp: "Le résumé est fidèle, neutre et reformulé (pas de « je », pas d'avis)." },
    { q: "Un texte informatif sert à…", opts: ["informer objectivement", "défendre une opinion", "faire rire", "raconter un mythe"], ans: 0, chapter: "resume", difficulty: "facile", exp: "Il donne des informations objectives, sans prendre parti." },
    { q: "On résume souvent un texte au…", opts: ["quart", "double", "tiers exact obligatoire", "centième"], ans: 0, chapter: "resume", difficulty: "intermediaire", exp: "En général au quart de sa longueur (selon la consigne)." },
    { q: "Un mythe est un récit qui…", opts: ["explique le monde et transmet des valeurs", "donne la météo", "vend un produit", "résume l'actualité"], ans: 0, chapter: "mythe", difficulty: "facile", exp: "Récit ancien (dieux/héros) à fonction explicative et porteuse de valeurs." },
    { q: "Dans la mythologie grecque, Prométhée…", opts: ["vole le feu pour les hommes", "crée la mer", "est un roi de France", "invente l'écriture"], ans: 0, chapter: "mythe", difficulty: "intermediaire", exp: "Prométhée vole le feu aux dieux pour les hommes ; Zeus le punit." },
    { q: "Convaincre, c'est faire adhérer par…", opts: ["la raison (arguments logiques)", "les émotions", "la peur uniquement", "le hasard"], ans: 0, chapter: "argumentation", difficulty: "facile", exp: "Convaincre = la raison ; persuader = les émotions." },
    { q: "Persuader, c'est faire adhérer par…", opts: ["les émotions / sentiments", "des preuves chiffrées", "la logique pure", "des définitions"], ans: 0, chapter: "argumentation", difficulty: "intermediaire", exp: "Persuader joue sur l'affectif (sentiments)." },
    { q: "L'opinion défendue dans un texte argumenté s'appelle…", opts: ["la thèse", "l'exemple", "le connecteur", "la rime"], ans: 0, chapter: "argumentation", difficulty: "intermediaire", exp: "La thèse, soutenue par des arguments illustrés d'exemples." },
    { q: "Lequel est un connecteur logique ?", opts: ["donc", "table", "rouge", "vite"], ans: 0, chapter: "argumentation", difficulty: "facile", exp: "Car, donc, mais, en effet, cependant… relient les arguments." },
    { q: "La comédie, au théâtre…", opts: ["fait rire et finit bien", "finit toujours mal", "n'a pas de personnages", "ne se joue pas"], ans: 0, chapter: "comedie", difficulty: "facile", exp: "Comédie = registre comique, fin heureuse (≠ tragédie)." },
    { q: "Une longue réplique adressée à un autre personnage est…", opts: ["une tirade", "un aparté", "une didascalie", "un quiproquo"], ans: 0, chapter: "comedie", difficulty: "intermediaire", exp: "Tirade = longue réplique. Monologue = seul. Aparté = au public." },
    { q: "Les indications de mise en scène (en italique) sont…", opts: ["les didascalies", "les répliques", "les strophes", "les thèses"], ans: 0, chapter: "comedie", difficulty: "intermediaire", exp: "Les didascalies indiquent gestes, décors, tons." },
    { q: "Un malentendu (on prend une personne/chose pour une autre) :", opts: ["un quiproquo", "une métaphore", "une tirade", "un alexandrin"], ans: 0, chapter: "comedie", difficulty: "difficile", exp: "Le quiproquo est un ressort comique classique." },
    { q: "Grand auteur de comédies françaises :", opts: ["Molière", "Newton", "Zeus", "Colbert"], ans: 0, chapter: "comedie", difficulty: "facile", exp: "Molière (XVIIᵉ s.)." },
    { q: "Un vers de 12 syllabes s'appelle…", opts: ["un alexandrin", "un octosyllabe", "un quatrain", "une strophe"], ans: 0, chapter: "poesie", difficulty: "facile", exp: "Alexandrin = 12 syllabes ; octosyllabe = 8 ; décasyllabe = 10." },
    { q: "Une strophe de 4 vers est…", opts: ["un quatrain", "un tercet", "un distique", "un sonnet"], ans: 0, chapter: "poesie", difficulty: "intermediaire", exp: "Distique 2, tercet 3, quatrain 4." },
    { q: "« Il est rusé comme un renard » est…", opts: ["une comparaison", "une métaphore", "une hyperbole", "une anaphore"], ans: 0, chapter: "poesie", difficulty: "facile", exp: "Comparaison : présence de l'outil « comme »." },
    { q: "« Cet homme est un lion » est…", opts: ["une métaphore", "une comparaison", "une personnification", "une assonance"], ans: 0, chapter: "poesie", difficulty: "intermediaire", exp: "Métaphore : rapprochement sans outil de comparaison." },
    { q: "Des rimes disposées ABAB sont…", opts: ["croisées", "plates", "embrassées", "absentes"], ans: 0, chapter: "poesie", difficulty: "difficile", exp: "Plates AABB · croisées ABAB · embrassées ABBA." },
    { q: "Pour présenter une œuvre à l'oral, on termine par…", opts: ["un avis personnel argumenté", "le prix du livre", "rien", "une question au prof"], ans: 0, chapter: "oral", difficulty: "facile", exp: "Présenter → résumer → analyser → avis argumenté." }
  ];

  /* ---------------------- FLASHCARDS ---------------------- */
  var flashcards = [
    { front: "Règles d'un bon résumé ?", back: "Reformuler avec ses mots, rester fidèle et neutre (pas de « je »), garder l'essentiel, respecter l'ordre et la longueur (≈ ¼).", chapter: "resume" },
    { front: "Texte informatif ?", back: "Un texte qui informe objectivement, sans donner d'avis.", chapter: "resume" },
    { front: "Qu'est-ce qu'un mythe ?", back: "Récit ancien (souvent anonyme, oral) avec dieux/héros, qui explique le monde et transmet des valeurs.", chapter: "mythe" },
    { front: "Le mythe de Prométhée ?", back: "Prométhée vole le feu aux dieux pour le donner aux hommes ; Zeus le punit. (Origine du feu + ruse/courage.)", chapter: "mythe" },
    { front: "Convaincre vs Persuader ?", back: "Convaincre = par la raison (arguments logiques). Persuader = par les émotions (sentiments).", chapter: "argumentation" },
    { front: "Structure d'un texte argumenté ?", back: "Thèse (opinion) → arguments → exemples, reliés par des connecteurs logiques (car, donc, mais, en effet…).", chapter: "argumentation" },
    { front: "Informatif vs argumenté ?", back: "Informatif = informer (neutre). Argumenté = défendre une thèse / faire réagir.", chapter: "argumentation" },
    { front: "Comédie vs tragédie ?", back: "Comédie = fait rire, fin heureuse. Tragédie = fin malheureuse, personnages nobles, fatalité.", chapter: "comedie" },
    { front: "Tirade / monologue / aparté ?", back: "Tirade = longue réplique (à un autre). Monologue = parler seul. Aparté = au public (les autres « n'entendent pas »).", chapter: "comedie" },
    { front: "Les didascalies ?", back: "Les indications de mise en scène (gestes, décor, ton), souvent en italique.", chapter: "comedie" },
    { front: "Les 5 ressorts du comique ?", back: "Comique de mots, de gestes, de situation, de caractère, de répétition.", chapter: "comedie" },
    { front: "Alexandrin / décasyllabe / octosyllabe ?", back: "12 / 10 / 8 syllabes.", chapter: "poesie" },
    { front: "Rimes plates / croisées / embrassées ?", back: "Plates AABB · croisées ABAB · embrassées ABBA.", chapter: "poesie" },
    { front: "Comparaison vs métaphore ?", back: "Comparaison = avec outil (comme, tel). Métaphore = sans outil (« cet homme est un lion »).", chapter: "poesie" },
    { front: "Personnification / hyperbole / anaphore ?", back: "Personnification = traits humains à une chose. Hyperbole = exagération. Anaphore = répétition en début de vers.", chapter: "poesie" },
    { front: "Plan pour présenter une œuvre à l'oral ?", back: "Présenter (auteur, titre) → résumer le thème → analyser (procédés) → avis personnel argumenté.", chapter: "oral" }
  ];

  window.registerSubject('francais', {
    subtitle: 'Français 4ᵉ — résumé, mythe, argumentation, comédie, poésie',
    content: {
      sections: sections,
      questions: questions,
      flashcards: flashcards,
      demos: {},
      chapOrder: ['resume', 'mythe', 'argumentation', 'comedie', 'poesie', 'oral'],
      chapLabels: { resume: 'Le résumé', mythe: 'Le mythe', argumentation: "L'argumentation", comedie: 'La comédie', poesie: 'La poésie', oral: 'Examen oral' }
    }
  });
})();
