/* GR2 Study — Contenu FRANÇAIS (4ème)
   Séquences : le résumé · le mythe · l'argumentation · la comédie · la poésie
   + examen oral (présenter une œuvre).
   S'enregistre auprès de subjects.js via window.registerSubject. */
(function () {
  'use strict';
  if (typeof window.registerSubject !== 'function') return;

  /* Infos affichées quand on clique sur une image (cours + examen) */
  window.IMG_INFO = window.IMG_INFO || {};
  Object.assign(window.IMG_INFO, {
    "prometheus.jpg": {
      title: "Prométhée", sub: "mythe grec",
      cours: "<p><strong>Prométhée</strong> est un Titan qui <strong>vole le feu</strong> aux dieux pour le donner aux humains. Zeus le punit (enchaîné, un aigle lui dévore le foie). C'est un <strong>mythe</strong> : un récit ancien qui explique le monde et transmet des valeurs.</p>",
      exam: "<ul><li><strong>Définition du mythe :</strong> récit ancien, souvent anonyme, transmis à l'oral, avec dieux et héros.</li><li><strong>Fonctions :</strong> <em>expliquer</em> le monde (origine du feu) + transmettre des <em>valeurs</em> (courage, ruse).</li></ul>",
      anecdote: "Son nom signifie « le prévoyant ». Pour le punir d'avoir aidé les hommes, Zeus l'enchaîne à un rocher où un <strong>aigle lui dévore le foie chaque jour</strong>… qui repousse la nuit. Un supplice éternel !"
    },
    "moliere.jpg": {
      title: "Molière", sub: "1622–1673 · maître de la comédie",
      cours: "<p><strong>Molière</strong> est le plus grand auteur de <strong>comédies</strong> françaises. Le théâtre est un texte <strong>joué</strong> sur scène ; la comédie fait <strong>rire</strong> et finit bien (à l'inverse de la tragédie).</p>",
      exam: "<ul><li><strong>Vocabulaire théâtre :</strong> acte, scène, réplique, tirade, monologue, aparté, <strong>didascalies</strong>, quiproquo.</li><li>Comédie = fait rire / finit bien · Tragédie = finit mal (personnages nobles, fatalité).</li></ul>",
      anecdote: "Son vrai nom est <strong>Jean-Baptiste Poquelin</strong>. Il est mort presque sur scène, en jouant… « Le Malade imaginaire » ! Le théâtre français est d'ailleurs surnommé « la maison de Molière »."
    },
    "apollinaire.jpg": {
      title: "Guillaume Apollinaire", sub: "1880–1918 · poète",
      cours: "<p><strong>Apollinaire</strong> est un grand poète du début du XXᵉ siècle. Il a inventé les <strong>calligrammes</strong> : des poèmes dont la <strong>disposition des mots dessine une forme</strong> (un cœur, la pluie, la Tour Eiffel…).</p>",
      exam: "<ul><li><strong>Calligramme</strong> = poème-dessin (mot à retenir).</li><li>Vocab poésie : vers, strophe, rime, <strong>alexandrin</strong> (12 syllabes).</li></ul>",
      anecdote: "Il a <strong>supprimé toute la ponctuation</strong> dans son recueil « Alcools » (1913), pour laisser le rythme guider la lecture. C'est aussi lui qui a popularisé le mot « surréalisme »."
    },
    "lafontaine.jpg": {
      title: "Jean de La Fontaine", sub: "1621–1695 · fabuliste",
      cours: "<p><strong>La Fontaine</strong> est célèbre pour ses <strong>Fables</strong> : de courts récits, souvent avec des <strong>animaux</strong>, qui se terminent par une <strong>morale</strong>. C'est une façon d'<strong>argumenter</strong> de manière indirecte et plaisante.</p>",
      exam: "<ul><li>La <strong>fable</strong> = récit + <strong>morale</strong> (argumentation indirecte).</li><li>Ex. « Le Corbeau et le Renard », « La Cigale et la Fourmi ».</li></ul>",
      anecdote: "Beaucoup de ses morales sont devenues des expressions courantes : « <strong>Rien ne sert de courir, il faut partir à point</strong> » vient de « Le Lièvre et la Tortue » !"
    }
  });

  /* Thème visuel des fiches de français */
  window.INFO_THEME = window.INFO_THEME || {};
  Object.assign(window.INFO_THEME, {
    "prometheus.jpg": "myth", "mythe": "myth",
    "moliere.jpg": "theatre", "comedie": "theatre", "tragedie": "theatre",
    "apollinaire.jpg": "lettres", "lafontaine.jpg": "lettres"
  });

  /* Notions de français cliquables */
  window.INFO_TOPICS = window.INFO_TOPICS || {};
  Object.assign(window.INFO_TOPICS, {
    "mythe": {
      title: "Le mythe", sub: "genre littéraire", img: "prometheus.jpg",
      cours: "<p>Un <strong>mythe</strong> est un <strong>récit ancien</strong>, souvent anonyme, transmis d'abord à l'<strong>oral</strong>, mettant en scène des <strong>dieux</strong> et des <strong>héros</strong> (ex. <strong>Prométhée</strong>).</p>",
      exam: "<ul><li><strong>Fonctions :</strong> expliquer le monde + transmettre des valeurs.</li><li>Ne pas confondre mythe (dieux/héros) et conte (merveilleux, « il était une fois »).</li></ul>"
    },
    "comedie": {
      title: "La comédie", sub: "genre théâtral", img: "moliere.jpg",
      cours: "<p>La <strong>comédie</strong> est une pièce de <strong>théâtre</strong> qui fait <strong>rire</strong> et <strong>finit bien</strong>. Maître du genre : <strong>Molière</strong>.</p>",
      exam: "<ul><li>Comédie = rire / fin heureuse · <strong>tragédie</strong> = fin malheureuse.</li><li>Vocabulaire : acte, scène, tirade, <strong>didascalies</strong>, quiproquo.</li></ul>"
    },
    "tragedie": {
      title: "La tragédie", sub: "genre théâtral",
      cours: "<p>La <strong>tragédie</strong> met en scène des personnages <strong>nobles</strong> confrontés à la <strong>fatalité</strong> ; elle <strong>finit mal</strong> (souvent par la mort).</p>",
      exam: "<ul><li>Opposée à la <strong>comédie</strong> (qui fait rire et finit bien).</li></ul>"
    }
  });

  window.TERM_MAP = window.TERM_MAP || {};
  Object.assign(window.TERM_MAP, {
    "Prométhée": "prometheus.jpg", "Molière": "moliere.jpg",
    "comédie": "comedie", "tragédie": "tragedie", "mythe": "mythe",
    "Apollinaire": "apollinaire.jpg", "La Fontaine": "lafontaine.jpg"
  });

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
      <div class="key-rule"><div class="formula-main" style="font-size:17px;">Hyperonyme = mot général &nbsp;|&nbsp; Hyponyme = mot précis</div></div>
      <ul style="line-height:1.9;">
        <li>Un <strong>hyperonyme</strong> est un mot <strong>générique</strong> qui en englobe d'autres. Un <strong>hyponyme</strong> est un mot <strong>précis</strong> compris dans l'hyperonyme.</li>
        <li>Ex : <strong>fleur</strong> (hyperonyme) → <em>rose, tulipe, marguerite</em> (hyponymes). <strong>félin</strong> → <em>chat, lion, tigre</em>.</li>
        <li>💡 Très utile pour <strong>résumer</strong> : on remplace une <strong>liste</strong> d'hyponymes par un seul <strong>hyperonyme</strong>. <em>« des roses, des tulipes et des lys »</em> → <em>« des fleurs »</em>.</li>
      </ul>
    </div>

    <div class="synth-section">
      <h2>Séquence 5 — Le mythe</h2>
      <figure class="hfig hfig-float" style="max-width:160px"><img src="prometheus.jpg" alt="Prométhée" loading="lazy"><figcaption>Prométhée, qui vole le feu aux dieux</figcaption></figure>
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
      <figure class="hfig hfig-float" style="max-width:140px"><img src="lafontaine.jpg" alt="Jean de La Fontaine" loading="lazy"><figcaption>La Fontaine : argumenter par la fable (une morale)</figcaption></figure>
      <p>💡 La <strong>fable</strong> (ex. <strong>La Fontaine</strong>) est une argumentation <em>indirecte</em> : un petit récit d'animaux qui débouche sur une <strong>morale</strong>.</p>
    </div>

    <div class="synth-section">
      <h2>Séquence 7 — La comédie (théâtre)</h2>
      <figure class="hfig hfig-float" style="max-width:150px"><img src="moliere.jpg" alt="Molière" loading="lazy"><figcaption>Molière, maître de la comédie</figcaption></figure>
      <p>Le <strong>théâtre</strong> est un texte <strong>joué</strong> sur scène. La <strong>comédie</strong> fait <strong>rire</strong> et finit bien ; la <strong>tragédie</strong> finit mal (personnages nobles, fatalité).</p>
      <p><strong>Vocabulaire :</strong> <strong>acte</strong> (grande partie), <strong>scène</strong> (sous-partie), <strong>réplique</strong> (ce que dit un personnage), <strong>tirade</strong> (longue réplique), <strong>monologue</strong> (seul en scène), <strong>aparté</strong> (au public, les autres « n'entendent pas »), <strong>didascalies</strong> (indications de mise en scène, en italique), <strong>quiproquo</strong> (malentendu, un pour un autre).</p>
      <p><strong>Les ressorts du comique :</strong> comique de <strong>mots</strong>, de <strong>gestes</strong>, de <strong>situation</strong>, de <strong>caractère</strong>, de <strong>répétition</strong>. Grand auteur : <strong>Molière</strong>.</p>
    </div>

    <div class="synth-section">
      <h2>Séquence 8 — La poésie</h2>
      <figure class="hfig hfig-float" style="max-width:150px"><img src="apollinaire.jpg" alt="Guillaume Apollinaire" loading="lazy"><figcaption>Apollinaire, le poète des calligrammes</figcaption></figure>
      <p>Vocabulaire : un <strong>vers</strong> (une ligne), une <strong>strophe</strong> (un groupe de vers), une <strong>rime</strong> (sons identiques à la fin des vers).</p>
      <ul style="line-height:1.9;">
        <li><strong>Compter les syllabes</strong> : <strong>alexandrin = 12</strong>, décasyllabe = 10, octosyllabe = 8.</li>
        <li><strong>Strophes</strong> : distique (2 vers), tercet (3), quatrain (4).</li>
        <li><strong>Disposition des rimes</strong> : plates/suivies <em>AABB</em>, croisées <em>ABAB</em>, embrassées <em>ABBA</em>.</li>
        <li><strong>Calligramme</strong> (Apollinaire) : poème dont la disposition dessine une forme.</li>
      </ul>
      <h3 style="font-size:20px; font-weight:700; color:var(--color-nav); margin:1.2rem 0 0.4rem;">✨ Figures de style à connaître</h3>
      <table class="compare-table">
        <thead><tr><th>Figure</th><th>Définition (et exemple)</th></tr></thead>
        <tbody>
          <tr><th>Comparaison</th><td>rapproche 2 éléments avec un <strong>outil</strong> (comme, tel, pareil à)</td></tr>
          <tr><th>Métaphore</th><td>même idée mais <strong>sans</strong> outil (« cet homme est un lion »)</td></tr>
          <tr><th>Personnification</th><td>donner des <strong>traits humains</strong> à une chose</td></tr>
          <tr><th>Hyperbole</th><td><strong>exagération</strong></td></tr>
          <tr><th>Anaphore</th><td>répétition d'un mot en <strong>début de vers</strong></td></tr>
          <tr><th>Allitération</th><td>répétition de <strong>consonnes</strong></td></tr>
          <tr><th>Assonance</th><td>répétition de <strong>voyelles</strong></td></tr>
        </tbody>
      </table>
      <h3 style="font-size:20px; font-weight:700; color:var(--color-nav); margin:1.2rem 0 0.4rem;">🎤 Le slam (poésie contemporaine)</h3>
      <p>Le <strong>slam</strong> est une <strong>poésie orale</strong>, <strong>déclamée</strong> en public, à l'origine <strong>sans musique</strong> ni décor. Il joue sur le <strong>rythme</strong>, les <strong>jeux de mots</strong>, les <strong>rimes</strong> et les <strong>figures de style</strong>, dans une langue souvent <strong>quotidienne</strong>.</p>
      <ul style="line-height:1.9;">
        <li><strong>Grand Corps Malade</strong> (de son vrai nom <strong>Fabien Marsaud</strong>) est un <strong>artiste contemporain</strong> français, pionnier du slam (album « <em>Midi 20</em> »). Son nom de scène vient d'un grave accident qui a failli le laisser paralysé.</li>
        <li>On <strong>analyse un slam</strong> comme un poème : thème, procédés (rimes, anaphores, métaphores), rythme, et message.</li>
      </ul>
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
    { q: "Pour présenter une œuvre à l'oral, on termine par…", opts: ["un avis personnel argumenté", "le prix du livre", "rien", "une question au prof"], ans: 0, chapter: "oral", difficulty: "facile", exp: "Présenter → résumer → analyser → avis argumenté." },
    { q: "Un calligramme, inventé par Apollinaire, est…", opts: ["un poème dont les mots dessinent une forme", "une longue tirade", "une fable", "un résumé"], ans: 0, chapter: "poesie", difficulty: "intermediaire", exp: "Calligramme = poème-dessin (Guillaume Apollinaire)." },
    { q: "Une fable de La Fontaine se termine toujours par…", opts: ["une morale", "une rime", "un quiproquo", "un acte"], ans: 0, chapter: "argumentation", difficulty: "intermediaire", exp: "La fable = court récit (souvent d'animaux) + une morale : une argumentation indirecte." },
    { q: "« Convaincre » s'adresse surtout à…", opts: ["la raison", "les émotions", "la peur", "l'imagination"], ans: 0, chapter: "argumentation", difficulty: "facile", exp: "Convaincre = la raison (arguments logiques) ; persuader = les émotions." },
    { q: "« Paris a gagné le match » (= l'équipe) est…", opts: ["une métonymie", "une métaphore", "une comparaison", "une hyperbole"], ans: 0, chapter: "poesie", difficulty: "difficile", exp: "Métonymie : on désigne une chose par une autre liée (la ville pour l'équipe)." },
    { q: "« Le vent hurlait dans la nuit » est…", opts: ["une personnification", "une comparaison", "une métonymie", "un quiproquo"], ans: 0, chapter: "poesie", difficulty: "intermediaire", exp: "Personnification : donner un comportement humain à une chose." },
    { q: "« Je te l'ai dit mille fois ! » est…", opts: ["une hyperbole", "une litote", "une comparaison", "une anaphore"], ans: 0, chapter: "poesie", difficulty: "intermediaire", exp: "Hyperbole : exagération volontaire." },
    { q: "Répéter un même mot en début de plusieurs vers, c'est…", opts: ["une anaphore", "une allitération", "une métaphore", "une rime"], ans: 0, chapter: "poesie", difficulty: "difficile", exp: "Anaphore = répétition en tête de vers/phrase." },
    { q: "Une strophe de 3 vers s'appelle…", opts: ["un tercet", "un distique", "un quatrain", "un sonnet"], ans: 0, chapter: "poesie", difficulty: "intermediaire", exp: "Distique 2 · tercet 3 · quatrain 4." },
    { q: "Quand le même mot/geste revient pour faire rire, c'est le comique de…", opts: ["répétition", "caractère", "situation", "mots"], ans: 0, chapter: "comedie", difficulty: "difficile", exp: "Les 5 comiques : mots, gestes, situation, caractère, répétition." },
    { q: "Un hyperonyme est un mot…", opts: ["général qui en englobe d'autres", "précis et particulier", "inventé", "interdit en résumé"], ans: 0, chapter: "resume", difficulty: "intermediaire", exp: "Hyperonyme = mot générique (fleur). Hyponyme = mot précis (rose, tulipe)." },
    { q: "« rose, tulipe, marguerite » sont des hyponymes de…", opts: ["fleur", "jardin", "couleur", "parfum"], ans: 0, chapter: "resume", difficulty: "intermediaire", exp: "« fleur » est l'hyperonyme ; rose/tulipe/marguerite en sont les hyponymes." },
    { q: "Pourquoi l'hyperonyme est utile dans un résumé ?", opts: ["il remplace une liste par un seul mot", "il rallonge le texte", "il donne un avis", "il ajoute des exemples"], ans: 0, chapter: "resume", difficulty: "difficile", exp: "On condense : « des roses, des lys, des tulipes » → « des fleurs »." },
    { q: "Le « chat » est un hyponyme de…", opts: ["félin", "chien", "meuble", "légume"], ans: 0, chapter: "resume", difficulty: "facile", exp: "félin (hyperonyme) englobe chat, lion, tigre (hyponymes)." },
    { q: "Le slam est avant tout une poésie…", opts: ["orale, déclamée en public", "uniquement écrite et chantée", "sans rimes", "en latin"], ans: 0, chapter: "poesie", difficulty: "intermediaire", exp: "Le slam = poésie orale, scandée en public, à l'origine sans musique." },
    { q: "Artiste contemporain pionnier du slam en France :", opts: ["Grand Corps Malade", "Molière", "La Fontaine", "Apollinaire"], ans: 0, chapter: "poesie", difficulty: "facile", exp: "Grand Corps Malade (Fabien Marsaud), album « Midi 20 »." },
    { q: "On analyse un slam…", opts: ["comme un poème (thème, procédés, rythme)", "comme un résumé neutre", "sans figures de style", "comme une pièce de théâtre"], ans: 0, chapter: "poesie", difficulty: "intermediaire", exp: "Mêmes outils que la poésie : rimes, anaphores, métaphores, rythme, message." }
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
    { front: "Plan pour présenter une œuvre à l'oral ?", back: "Présenter (auteur, titre) → résumer le thème → analyser (procédés) → avis personnel argumenté.", chapter: "oral" },
    { front: "Qu'est-ce qu'un calligramme ? (qui ?)", back: "Un poème dont la disposition dessine une forme. Inventé par Guillaume Apollinaire.", chapter: "poesie" },
    { front: "La fable (La Fontaine) ?", back: "Un court récit (souvent d'animaux) qui se termine par une morale : une argumentation indirecte.", chapter: "argumentation" },
    { front: "Qu'est-ce qu'une métonymie ?", back: "Désigner une chose par une autre qui lui est liée (« boire un verre » = le contenu ; « Paris a gagné » = l'équipe).", chapter: "poesie" },
    { front: "Allitération vs assonance ?", back: "Allitération = répétition de consonnes · Assonance = répétition de voyelles.", chapter: "poesie" },
    { front: "Distique / tercet / quatrain ?", back: "Strophes de 2 / 3 / 4 vers.", chapter: "poesie" },
    { front: "La règle du « e » muet (syllabes) ?", back: "Le « e » muet en fin de vers ne se compte pas ; à l'intérieur, il compte souvent. Un alexandrin = 12 syllabes.", chapter: "poesie" },
    { front: "Tragédie : 3 traits ?", back: "Fin malheureuse, personnages nobles, poids de la fatalité/destin.", chapter: "comedie" },
    { front: "Hyperonyme vs hyponyme ?", back: "Hyperonyme = mot général qui en englobe d'autres (fleur). Hyponyme = mot précis compris dedans (rose, tulipe).", chapter: "resume" },
    { front: "À quoi servent les hyperonymes dans un résumé ?", back: "À condenser : on remplace une liste d'hyponymes par un seul mot générique. « roses, lys, tulipes » → « fleurs ».", chapter: "resume" },
    { front: "Qu'est-ce que le slam ?", back: "Une poésie orale, déclamée en public, à l'origine sans musique. Joue sur le rythme, les jeux de mots, les rimes et les figures de style.", chapter: "poesie" },
    { front: "Grand Corps Malade ?", back: "Fabien Marsaud, artiste contemporain français, pionnier du slam (album « Midi 20 »). Son nom de scène vient d'un accident grave.", chapter: "poesie" }
  ];

  window.registerSubject('francais', {
    subtitle: 'Français 4ᵉ — résumé, mythe, argumentation, comédie, poésie',
    content: {
      sections: sections,
      questions: questions,
      flashcards: flashcards,
      demos: {},
      navLabels: { formules: '📌 Notions', exercices: '🎯 Exercices' },
      chapOrder: ['resume', 'mythe', 'argumentation', 'comedie', 'poesie', 'oral'],
      chapLabels: { resume: 'Le résumé', mythe: 'Le mythe', argumentation: "L'argumentation", comedie: 'La comédie', poesie: 'La poésie', oral: 'Examen oral' }
    }
  });
})();
