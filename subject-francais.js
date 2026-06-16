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
      exam: "<ul><li><strong>4 types de comique</strong> : mots · gestes · situation · caractère.</li><li><strong>5 procédés</strong> : écart · renversement · absurde · répétition · exagération. Auteur phare : <strong>Molière</strong>.</li></ul>"
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
      <h3 style="font-size:20px; font-weight:700; color:var(--color-nav); margin:1.3rem 0 0.5rem;">🔎 Trouver une information fiable (UAA 1)</h3>
      <p>Avant de résumer, il faut <strong>trouver</strong> et <strong>sélectionner</strong> une information. Deux questions essentielles :</p>
      <ul style="line-height:1.9;">
        <li><strong>La pertinence</strong> : le document <strong>concerne-t-il bien mon thème</strong> ? (le bon <strong>thème</strong>, la bonne <strong>époque</strong>, le bon <strong>lieu</strong>) — et puis-je le <strong>comprendre et l'utiliser</strong> dans mon travail ?</li>
        <li><strong>La fiabilité</strong> : puis-je <strong>faire confiance</strong> à l'auteur ? (Il peut vouloir <strong>vendre</strong> quelque chose ou être <strong>partial</strong>.)</li>
      </ul>
      <p style="margin:.5rem 0 .2rem;"><strong>Évaluer un site internet</strong> (la grille du cours) :</p>
      <ul style="line-height:1.9;">
        <li>L'<strong>intention</strong> du site est-elle claire ?</li>
        <li>Le <strong>responsable</strong> est-il identifiable ? (un organisme <strong>officiel / reconnu</strong>, un <strong>expert</strong> ?)</li>
        <li>Le site est-il <strong>à jour</strong> et <strong>bien organisé</strong> ?</li>
        <li>Le <strong>langage</strong> (orthographe, syntaxe) est-il <strong>correct</strong> ?</li>
        <li>Les <strong>publicités</strong> sont-elles <strong>séparées</strong> du contenu ?</li>
      </ul>

      <div class="gr2-explain">
        <strong>💡 En clair.</strong> Résumer = redire le texte <strong>beaucoup plus court</strong> (≈ ¼), avec <strong>tes</strong> mots, sans rien ajouter. Tu gardes les <strong>idées importantes</strong> et tu enlèves les exemples et les détails. Astuce : une liste (roses, tulipes, lys) → un mot général (des fleurs) = un <strong>hyperonyme</strong>.
        <span class="exam-tip">🎯 Pièges : pas de « je », pas d'avis personnel, on respecte l'<strong>ordre des idées</strong> de l'auteur.</span>
      </div>
    </div>

    <div class="synth-section">
      <h2>Séquence 5 — Le mythe</h2>
      <figure class="hfig hfig-float" style="max-width:160px"><img src="prometheus.jpg" alt="Prométhée" loading="lazy"><figcaption>Prométhée, qui vole le feu aux dieux</figcaption></figure>
      <div class="key-rule" style="text-align:left;"><strong>Définition.</strong> Un <strong>mythe</strong> est un <strong>récit sacré</strong> (souvent une portée <strong>religieuse</strong> pour le peuple qui l'a créé) qui met en scène des <strong>êtres surnaturels ou légendaires</strong> et des <strong>héros</strong> accomplissant un <strong>exploit</strong> ou vivant une <strong>aventure extraordinaire</strong>.</div>
      <p>Le mythe a souvent pour <strong>but d'expliquer</strong> des réalités <strong>mystérieuses</strong>, difficiles voire impossibles à expliquer scientifiquement à l'époque. Par exemple :</p>
      <ul style="line-height:1.9;">
        <li>la <strong>création du monde</strong> ;</li>
        <li>la <strong>condition mortelle</strong> de l'homme ;</li>
        <li>certains <strong>phénomènes cosmiques</strong> (la foudre, les éclipses, les constellations…).</li>
      </ul>
      <p>👉 Il transmet aussi des <strong>valeurs</strong> à une communauté (le courage, la ruse…).</p>
      <div class="key-rule"><div class="formula-main" style="font-size:16px;">Étymologie : du grec <em>muthos</em> = « la parole »</div></div>
      <p>Le mythe s'est d'abord transmis par <strong>tradition orale</strong> (« la parole »). Certains auteurs de l'Antiquité en ont ensuite fixé une <strong>version écrite</strong> (les tragédies, la Bible…).</p>
      <p><strong>Exemples étudiés :</strong> la <strong>Genèse</strong> (Adam et Ève, dans la Bible), <strong>Prométhée</strong> (il vole le feu aux dieux pour le donner aux hommes ; Zeus le punit), le <strong>Popol Vuh</strong> (mythe maya de la création), la mort d'<strong>Orion</strong> (mythe grec).</p>
      <div class="gr2-explain">
        <strong>💡 En clair.</strong> Un mythe = une <strong>vieille histoire sacrée</strong> (dieux, héros, créatures) qu'on se transmettait à l'<strong>oral</strong> pour <strong>expliquer</strong> ce qu'on ne comprenait pas (la création du monde, la mort, la foudre…) et transmettre des <strong>valeurs</strong>. Le mot vient du grec <em>muthos</em> = « la parole ».
        <span class="exam-tip">🎯 Ne pas confondre avec le <strong>conte</strong> (« il était une fois », but : divertir). Sache <strong>définir</strong> le mythe + donner ses <strong>fonctions</strong> et un <strong>exemple</strong>.</span>
      </div>
    </div>

    <div class="synth-section">
      <h2>Séquence 6 — L'argumentation</h2>
      <p>Un <strong>texte argumenté</strong> défend une <strong>thèse</strong> (une opinion) pour <strong>agir sur le lecteur</strong>. À distinguer du texte <strong>informatif</strong> (neutre).</p>

      <h3 style="font-size:20px; font-weight:700; color:var(--color-nav); margin:1.3rem 0 0.5rem;">Convaincre ou persuader ?</h3>
      <div class="key-rule"><div class="formula-main" style="font-size:17px;">Convaincre = la raison (preuves) &nbsp;|&nbsp; Persuader = les émotions</div></div>
      <ul style="line-height:1.9;">
        <li><strong>Convaincre</strong> : obtenir l'accord sur la base de <strong>preuves</strong> ou de témoignages → <strong>adhésion rationnelle</strong>.</li>
        <li><strong>Persuader</strong> : <strong>faire croire</strong> en touchant les <strong>émotions</strong> → <strong>adhésion émotionnelle</strong>.</li>
      </ul>

      <h3 style="font-size:20px; font-weight:700; color:var(--color-nav); margin:1.3rem 0 0.5rem;">Les notions de base</h3>
      <ul style="line-height:1.9;">
        <li><strong>Le thème</strong> : le <strong>sujet</strong> dont on parle (de quoi ça parle).</li>
        <li><strong>La thèse</strong> : l'<strong>opinion</strong> défendue sur ce thème.</li>
        <li><strong>L'argument</strong> : une <strong>bonne raison</strong> avancée pour faire admettre la thèse.</li>
        <li><strong>Le développement / l'exemple</strong> : ce qui <strong>illustre</strong> ou explique l'argument.</li>
      </ul>

      <h3 style="font-size:20px; font-weight:700; color:var(--color-nav); margin:1.3rem 0 0.5rem;">Le schéma argumentatif</h3>
      <div style="border:1px solid var(--border-subtle); border-radius:12px; padding:14px; background:var(--bg-main); margin:0.6rem 0;">
        <div style="display:flex; flex-direction:column; gap:8px; align-items:center; font-size:13px;">
          <span style="background:color-mix(in srgb, var(--color-nav) 55%, #000); color:#fff; border-radius:8px; padding:8px 16px; font-weight:800;">THÈSE (l'opinion défendue)</span>
          <span style="color:var(--color-nav); font-weight:800;">↓</span>
          <div style="display:flex; flex-wrap:wrap; gap:8px; justify-content:center;">
            <span style="background:var(--bg-card); border:1px solid var(--color-nav); color:var(--text-primary); border-radius:8px; padding:8px 12px; font-weight:700; text-align:center;">Argument 1<span style="display:block; font-weight:500; font-size:11px; color:var(--text-secondary);">+ développement</span></span>
            <span style="background:var(--bg-card); border:1px solid var(--color-nav); color:var(--text-primary); border-radius:8px; padding:8px 12px; font-weight:700; text-align:center;">Argument 2<span style="display:block; font-weight:500; font-size:11px; color:var(--text-secondary);">+ développement</span></span>
            <span style="background:var(--bg-card); border:1px solid var(--color-nav); color:var(--text-primary); border-radius:8px; padding:8px 12px; font-weight:700; text-align:center;">Argument 3<span style="display:block; font-weight:500; font-size:11px; color:var(--text-secondary);">+ développement</span></span>
          </div>
        </div>
      </div>
      <p>⚠️ Tous les textes ne suivent pas cet ordre : la thèse peut <strong>précéder</strong>, <strong>suivre</strong> ou se trouver <strong>au milieu</strong> des arguments. Parfois la thèse (ou un argument) <strong>n'est pas écrite</strong> : il faut alors l'<strong>inférer</strong> (la déduire).</p>

      <h3 style="font-size:20px; font-weight:700; color:var(--color-nav); margin:1.3rem 0 0.5rem;">Les connecteurs logiques</h3>
      <table class="compare-table">
        <thead><tr><th>Pour exprimer…</th><th>Connecteurs</th></tr></thead>
        <tbody>
          <tr><th>la cause</th><td>car · parce que · puisque</td></tr>
          <tr><th>la conséquence / conclusion</th><td>donc · ainsi · c'est pourquoi · si bien que</td></tr>
          <tr><th>l'addition / l'alternative</th><td>et · ni · ou · en outre · puis · premièrement · enfin</td></tr>
          <tr><th>l'opposition / la concession</th><td>mais · or · pourtant · cependant · certes · alors que</td></tr>
          <tr><th>l'explication</th><td>en effet · c'est-à-dire · par exemple</td></tr>
        </tbody>
      </table>

      <h3 style="font-size:20px; font-weight:700; color:var(--color-nav); margin:1.3rem 0 0.5rem;">Réussir son argumentation</h3>
      <ul style="line-height:1.9;">
        <li><strong>Avancer des arguments recevables</strong> : ne pas heurter les valeurs / convictions du destinataire (sinon on « perd » celui qu'on veut convaincre).</li>
        <li><strong>Nuancer son opinion</strong> : les choses ne sont pas <strong>toutes blanches ou toutes noires</strong> → on a plus de chances de convaincre.</li>
        <li><strong>Concession → réfutation</strong> : on <strong>concède</strong> d'abord un point (« <strong>certes</strong>… ») puis on le <strong>réfute</strong> (« <strong>mais</strong>… ») en avançant ses propres arguments.</li>
      </ul>

      <figure class="hfig hfig-float" style="max-width:140px"><img src="lafontaine.jpg" alt="Jean de La Fontaine" loading="lazy"><figcaption>La Fontaine : argumenter par la fable (une morale)</figcaption></figure>
      <p>💡 La <strong>fable</strong> (ex. <strong>La Fontaine</strong>) est une argumentation <em>indirecte</em> : un petit récit d'animaux qui débouche sur une <strong>morale</strong>.</p>
      <div class="gr2-explain">
        <strong>💡 En clair.</strong> Argumenter = <strong>défendre une opinion</strong> (la <strong>thèse</strong>) sur un <strong>thème</strong>, avec des <strong>arguments</strong> (+ développements/exemples) reliés par des <strong>connecteurs</strong>. <strong>Convaincre</strong> = la raison (preuves) · <strong>persuader</strong> = les émotions. Pour réussir : des arguments <strong>recevables</strong>, un avis <strong>nuancé</strong>, et la technique « <strong>certes… mais…</strong> » (concession → réfutation).
        <span class="exam-tip">🎯 Schéma : thèse → arguments. Connais les 5 familles de connecteurs. La <strong>fable</strong> argumente indirectement (récit + morale).</span>
      </div>
    </div>

    <div class="synth-section">
      <h2>Séquence 7 — La comédie (le théâtre)</h2>
      <figure class="hfig hfig-float" style="max-width:150px"><img src="moliere.jpg" alt="Molière" loading="lazy"><figcaption>Molière, l'auteur phare de la comédie</figcaption></figure>
      <div class="key-rule" style="text-align:left;">
        <strong>🎯 Objectifs de l'examen — séquence « La comédie »</strong>
        <ol style="margin:.45rem 0 0; padding-left:1.2rem; line-height:1.8;">
          <li>Comprendre et <strong>analyser des scènes de comédie</strong>.</li>
          <li>Relater les <strong>grands événements de la vie de Molière</strong> (FO19).</li>
          <li>Connaître le <strong>vocabulaire et les notions du monde théâtral</strong> (FO18).</li>
          <li>Connaître les <strong>notions théoriques de la comédie</strong> (FO20) pour analyser un texte théâtral.</li>
        </ol>
      </div>
      <p>Le <strong>théâtre</strong> est un genre <strong>littéraire</strong> (un texte) <em>et</em> <strong>artistique</strong> (un spectacle). Il est né dans l'<strong>Antiquité</strong>, en <strong>Grèce</strong>. Le mot vient du grec <em>theaomai</em> = « <strong>regarder, contempler</strong> ».</p>
      <p>Une pièce <strong>ne se réduit pas au texte</strong> : elle est faite pour être <strong>jouée</strong> sur scène, devant un public. C'est un <strong>spectacle vivant</strong> (chaque représentation est <strong>unique</strong>) et un <strong>travail collectif</strong> : le metteur en scène, les comédiens et de nombreux <strong>travailleurs de l'ombre</strong>.</p>

      <h3 style="font-size:20px; font-weight:700; color:var(--color-nav); margin:1.4rem 0 0.5rem;">🏛️ A. Le monde du théâtre <span style="font-size:13px; font-weight:600; color:var(--text-secondary);">(FO18)</span></h3>

      <h4 style="font-size:16.5px; font-weight:700; color:var(--text-primary); margin:1rem 0 0.4rem;">1) L'espace théâtral</h4>
      <p>Dans un <strong>théâtre à l'italienne</strong>, les comédiens jouent sur la <strong>scène</strong> et les spectateurs prennent place dans la <strong>salle</strong>.</p>
      <div style="border:1px solid var(--border-subtle); border-radius:12px; padding:14px; background:var(--bg-main); margin:0.6rem 0;">
        <p style="text-align:center; font-weight:700; color:var(--color-nav); margin:0 0 10px; font-size:14px;">La scène vue depuis la salle</p>
        <div style="display:flex; align-items:stretch; gap:6px; max-width:470px; margin:0 auto;">
          <div style="flex:0 0 44px; display:flex; align-items:center; justify-content:center; text-align:center; font-size:9.5px; font-weight:700; color:var(--text-secondary); border:1px dashed var(--border-subtle); border-radius:8px;">coulisses</div>
          <div style="flex:0 0 62px; display:flex; align-items:center; justify-content:center; text-align:center; font-size:11px; font-weight:700; color:var(--text-primary); background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:8px; padding:6px 4px;">côté JARDIN</div>
          <div style="flex:1; text-align:center; font-weight:800; color:#fff; background:color-mix(in srgb, var(--color-nav) 55%, #000); border-radius:8px; padding:14px 8px;">SCÈNE <span style="font-weight:600; font-size:11.5px; opacity:.92;">(le plateau)</span></div>
          <div style="flex:0 0 62px; display:flex; align-items:center; justify-content:center; text-align:center; font-size:11px; font-weight:700; color:var(--text-primary); background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:8px; padding:6px 4px;">côté COUR</div>
          <div style="flex:0 0 44px; display:flex; align-items:center; justify-content:center; text-align:center; font-size:9.5px; font-weight:700; color:var(--text-secondary); border:1px dashed var(--border-subtle); border-radius:8px;">coulisses</div>
        </div>
        <div style="text-align:center; font-size:11.5px; color:var(--text-secondary); margin-top:8px;">↓ la salle (le public) ↓</div>
        <p style="font-size:11px; color:var(--text-secondary); margin:8px 0 0;">💡 Mémo : <strong>Jardin–Cour</strong>, de gauche à droite (initiales « JC »). Vu du <strong>comédien</strong> qui regarde la salle, c'est l'inverse : cour à sa <strong>gauche</strong>, jardin à sa <strong>droite</strong>.</p>
      </div>
      <ul style="line-height:1.9;">
        <li><strong>Le plateau</strong> : l'espace précis où sont plantés les décors et où évoluent les comédiens.</li>
        <li><strong>Côté cour</strong> : pour le comédien qui regarde la salle, la partie de la scène à sa <strong>gauche</strong> (donc à <strong>droite</strong> pour le spectateur).</li>
        <li><strong>Côté jardin</strong> : la partie à sa <strong>droite</strong> (à <strong>gauche</strong> pour le spectateur).</li>
        <li><strong>Les coulisses</strong> : la partie <strong>cachée</strong>, derrière le décor (les comédiens s'y préparent et attendent).</li>
        <li><strong>La loge</strong> a <strong>deux sens</strong> : dans la salle = un compartiment de sièges ; dans les coulisses = la petite pièce où le comédien se prépare.</li>
      </ul>
      <div style="border:1px solid var(--border-subtle); border-radius:12px; padding:14px; background:var(--bg-main); margin:0.8rem 0;">
        <p style="text-align:center; font-weight:700; color:var(--color-nav); margin:0 0 10px; font-size:14px;">La salle vue de côté (les places)</p>
        <div style="display:flex; flex-direction:column; gap:6px; max-width:440px; margin:0 auto;">
          <div style="text-align:center; font-weight:800; color:#fff; background:color-mix(in srgb, var(--color-nav) 55%, #000); border-radius:8px; padding:12px 8px;">SCÈNE</div>
          <div style="text-align:center; font-size:11px; color:var(--text-secondary);">↑ rideau ↑</div>
          <div style="text-align:center; font-weight:700; color:var(--text-primary); background:var(--bg-card); border:2px solid var(--color-nav); border-radius:8px; padding:9px;">ORCHESTRE <span style="display:block; font-weight:500; font-size:11px; color:var(--text-secondary);">les sièges du centre, en contrebas, devant la scène</span></div>
          <div style="text-align:center; font-weight:700; color:var(--text-primary); background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:8px; padding:9px;">PARTERRE <span style="display:block; font-weight:500; font-size:11px; color:var(--text-secondary);">les places situées derrière l'orchestre</span></div>
          <div style="text-align:center; font-weight:700; color:var(--text-primary); background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:8px; padding:9px;">CORBEILLES <span style="display:block; font-weight:500; font-size:11px; color:var(--text-secondary);">le 1ᵉʳ balcon, au-dessus de l'orchestre</span></div>
          <div style="text-align:center; font-weight:700; color:var(--text-primary); background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:8px; padding:9px;">POULAILLER / « PARADIS » <span style="display:block; font-weight:500; font-size:11px; color:var(--text-secondary);">le dernier balcon, tout en haut (places les moins chères)</span></div>
          <div style="display:flex; gap:6px;">
            <div style="flex:1; text-align:center; font-size:10px; color:var(--text-secondary); border:1px dashed var(--border-subtle); border-radius:8px; padding:6px;">baignoire (loge au rez-de-chaussée)</div>
            <div style="flex:1; text-align:center; font-size:10px; color:var(--text-secondary); border:1px dashed var(--border-subtle); border-radius:8px; padding:6px;">loges (compartiments sur les côtés)</div>
          </div>
        </div>
      </div>
      <ul style="line-height:1.9;">
        <li><strong>L'orchestre</strong> : les sièges du centre, en <strong>contrebas</strong>, juste devant la scène.</li>
        <li><strong>Le parterre</strong> : les places situées <strong>derrière</strong> les fauteuils d'orchestre.</li>
        <li><strong>La baignoire</strong> : une <strong>loge</strong> située au <strong>rez-de-chaussée</strong>.</li>
        <li><strong>Les corbeilles</strong> : le <strong>premier balcon</strong>, au-dessus de l'orchestre.</li>
        <li><strong>Le poulailler</strong> (ou le « <strong>paradis</strong> ») : le <strong>dernier balcon</strong>, tout en haut ; visibilité limitée, places les <strong>moins chères</strong>.</li>
        <li><strong>La loge</strong> : un compartiment cloisonné où des spectateurs prennent place.</li>
      </ul>

      <h4 style="font-size:16.5px; font-weight:700; color:var(--text-primary); margin:1.1rem 0 0.4rem;">2) Les métiers du théâtre</h4>
      <table class="compare-table">
        <thead><tr><th>Métier</th><th>Rôle</th></tr></thead>
        <tbody>
          <tr><th>Le dramaturge</th><td>l'<strong>auteur</strong> qui écrit la pièce (comique ou tragique).</td></tr>
          <tr><th>Le comédien</th><td>l'acteur qui interprète surtout des <strong>comédies</strong>.</td></tr>
          <tr><th>Le tragédien</th><td>l'acteur qui joue surtout des <strong>tragédies</strong>.</td></tr>
          <tr><th>Le figurant</th><td>l'acteur qui joue un <strong>rôle muet</strong>.</td></tr>
          <tr><th>Le metteur en scène</th><td>celui qui <strong>organise la représentation</strong> à partir du texte.</td></tr>
          <tr><th>Les régisseurs</th><td>les <strong>techniciens</strong> du son et de la lumière.</td></tr>
        </tbody>
      </table>
      <p style="margin-top:.6rem;">Sans oublier les <strong>travailleurs de l'ombre</strong> : décorateurs, costumiers, accessoiristes… qu'on ne voit pas, mais sans qui le spectacle n'existerait pas.</p>

      <h4 style="font-size:16.5px; font-weight:700; color:var(--text-primary); margin:1.1rem 0 0.4rem;">3) La structure d'une pièce</h4>
      <ul style="line-height:1.9;">
        <li><strong>L'acte</strong> : une grande partie de la pièce. On <strong>baisse le rideau</strong> entre deux actes (pour changer le décor). La pause entre deux actes est l'<strong>entracte</strong>.</li>
        <li><strong>Les tableaux</strong> / les <strong>journées</strong> : dans les pièces plus récentes, le découpage en actes est parfois remplacé par des tableaux (certaines pièces modernes n'ont plus de découpage).</li>
        <li><strong>La scène</strong> : une <strong>subdivision</strong> de l'acte. On change de scène quand un personnage <strong>entre ou sort</strong>.</li>
      </ul>

      <h4 style="font-size:16.5px; font-weight:700; color:var(--text-primary); margin:1.1rem 0 0.4rem;">4) La progression de l'intrigue</h4>
      <div style="border:1px solid var(--border-subtle); border-radius:12px; padding:14px; background:var(--bg-main); margin:0.6rem 0; display:flex; flex-wrap:wrap; gap:8px; align-items:center; justify-content:center; font-size:13px;">
        <span style="background:var(--bg-card); border:1px solid var(--color-nav); color:var(--text-primary); border-radius:999px; padding:6px 12px; font-weight:700;">Exposition</span><span style="color:var(--color-nav); font-weight:800;">→</span>
        <span style="background:var(--bg-card); border:1px solid var(--border-subtle); color:var(--text-secondary); border-radius:999px; padding:6px 12px; font-weight:700;">(coup de théâtre)</span><span style="color:var(--color-nav); font-weight:800;">→</span>
        <span style="background:var(--bg-card); border:1px solid var(--color-nav); color:var(--text-primary); border-radius:999px; padding:6px 12px; font-weight:700;">Nœud (point culminant)</span><span style="color:var(--color-nav); font-weight:800;">→</span>
        <span style="background:var(--bg-card); border:1px solid var(--color-nav); color:var(--text-primary); border-radius:999px; padding:6px 12px; font-weight:700;">Dénouement</span>
      </div>
      <ul style="line-height:1.9;">
        <li><strong>L'exposition</strong> (la 1ʳᵉ scène = <strong>scène d'exposition</strong>) : présente les personnages, le lieu et la situation.</li>
        <li><strong>Le coup de théâtre</strong> : un <strong>événement inattendu</strong> qui modifie le cours de l'action.</li>
        <li><strong>Le nœud</strong> : le <strong>point culminant</strong> de l'action.</li>
        <li><strong>Le dénouement</strong> : la <strong>fin</strong> et la <strong>solution</strong> ; ce qui met un terme à l'intrigue.</li>
      </ul>

      <h4 style="font-size:16.5px; font-weight:700; color:var(--text-primary); margin:1.1rem 0 0.4rem;">5) Le langage théâtral</h4>
      <div class="key-rule" style="text-align:left;"><strong>⭐ La double énonciation.</strong> Au théâtre, une parole s'adresse <strong>en même temps</strong> à deux destinataires : les autres <strong>personnages</strong> (sur scène) <em>et</em> le <strong>public</strong> (dans la salle). C'est ce qui rend possibles le <strong>quiproquo</strong>, l'<strong>ironie</strong> et le <strong>comique</strong> : le spectateur comprend ce que les personnages ignorent.</div>
      <p style="margin:.6rem 0 .2rem;"><strong>Les formes de la parole :</strong></p>
      <ul style="line-height:1.9;">
        <li><strong>Réplique</strong> : chaque prise de parole d'un personnage.</li>
        <li><strong>Tirade</strong> : une <strong>longue</strong> suite de phrases dite sans interruption.</li>
        <li><strong>Monologue</strong> : un personnage <strong>seul</strong> qui parle (il réfléchit, hésite, analyse ses sentiments).</li>
        <li><strong>Aparté</strong> : une parole dite <strong>au public</strong>, que les autres personnages « n'entendent pas ».</li>
        <li><strong>Stichomythies</strong> : des répliques <strong>très courtes</strong> qui s'enchaînent rapidement.</li>
      </ul>
      <p style="margin:.4rem 0 .2rem;"><strong>Le langage non verbal :</strong> les <strong>didascalies</strong> (les indications du texte : gestes, décor, ton… souvent en italique), complétées par les choix du <strong>metteur en scène</strong> (lumière, son, décor).</p>
      <div class="key-rule"><div class="formula-main" style="font-size:15px;">Tirade = longue · Monologue = seul · Aparté = au public · Stichomythies = répliques très courtes</div></div>

      <h4 style="font-size:16.5px; font-weight:700; color:var(--text-primary); margin:1.1rem 0 0.4rem;">6) Les expressions du théâtre <span style="font-size:12.5px; font-weight:600; color:var(--text-secondary);">(à savoir par cœur)</span></h4>
      <table class="compare-table">
        <thead><tr><th>Expression</th><th>Sens</th></tr></thead>
        <tbody>
          <tr><th>Faire une entrée théâtrale</th><td>une entrée <strong>remarquée</strong>, spectaculaire.</td></tr>
          <tr><th>Être le théâtre de…</th><td>être le <strong>lieu</strong> où se passe un événement.</td></tr>
          <tr><th>Jouer la comédie</th><td><strong>faire semblant</strong>.</td></tr>
          <tr><th>Un coup de théâtre</th><td>un <strong>retournement</strong> soudain et inattendu.</td></tr>
          <tr><th>L'art dramatique</th><td>le <strong>théâtre</strong> (comme discipline).</td></tr>
          <tr><th>Brûler les planches</th><td>jouer avec <strong>talent et énergie</strong>.</td></tr>
          <tr><th>Tenir l'affiche</th><td>être joué <strong>longtemps</strong> (un succès).</td></tr>
          <tr><th>Jouer les divas</th><td>faire des <strong>caprices</strong>.</td></tr>
          <tr><th>Jouer au pied levé</th><td><strong>remplacer</strong> au dernier moment, sans préparation.</td></tr>
          <tr><th>Rester en carafe</th><td>rester <strong>bloqué</strong>, en plan (ex. oublier son texte).</td></tr>
        </tbody>
      </table>

      <h3 style="font-size:20px; font-weight:700; color:var(--color-nav); margin:1.5rem 0 0.5rem;">🎭 B. Molière, l'auteur phare <span style="font-size:13px; font-weight:600; color:var(--text-secondary);">(FO19)</span></h3>
      <ul style="line-height:1.9;">
        <li>De son vrai nom <strong>Jean-Baptiste Poquelin</strong> (Paris, <strong>15 janvier 1622</strong> – <strong>17 février 1673</strong>).</li>
        <li>Famille de la <strong>bourgeoisie</strong> (père tapissier du roi) ; il perd sa <strong>mère à 10 ans</strong>.</li>
        <li>Études chez les <strong>jésuites</strong> (auteurs comiques latins), puis des études de <strong>droit</strong> — mais à <strong>20 ans</strong> il choisit le théâtre.</li>
        <li>Il fonde l'<strong>Illustre Théâtre</strong> (1643) avec la comédienne <strong>Madeleine Béjart</strong> ; <strong>faillite</strong> en 1645, puis une <strong>tournée en province</strong> d'une douzaine d'années.</li>
        <li>Retour à Paris (1658) : succès des <em>Précieuses ridicules</em>, puis de <em>L'École des femmes</em> (1662). Il s'attire la jalousie des rivaux et des <strong>dévots</strong> ; <em>Tartuffe</em> et <em>Dom Juan</em> sont <strong>interdits</strong>, mais <strong>Louis XIV</strong> le soutient.</li>
        <li><strong>Mort presque en scène</strong> : pris d'un malaise en jouant <em>Le Malade imaginaire</em>, il meurt le soir même ; il est <strong>enterré de nuit</strong>.</li>
        <li>👉 La <strong>Comédie-Française</strong> est surnommée « <strong>la maison de Molière</strong> ».</li>
      </ul>

      <h3 style="font-size:20px; font-weight:700; color:var(--color-nav); margin:1.5rem 0 0.5rem;">😂 C. La comédie <span style="font-size:13px; font-weight:600; color:var(--text-secondary);">(FO20)</span></h3>
      <div class="key-rule" style="text-align:left;"><strong>Définition.</strong> La <strong>comédie</strong> est une pièce de théâtre destinée à <strong>faire rire</strong>, par la <strong>peinture des mœurs</strong>, des <strong>caractères</strong> ou la <strong>succession de situations inattendues</strong>.</div>
      <h4 style="font-size:16.5px; font-weight:700; color:var(--text-primary); margin:1rem 0 0.4rem;">Un peu d'histoire</h4>
      <table class="compare-table">
        <thead><tr><th>Époque</th><th>La comédie</th></tr></thead>
        <tbody>
          <tr><th>Antiquité</th><td>en Grèce, <strong>Aristophane</strong> en fait une satire des mœurs ; à Rome, <strong>Plaute</strong>.</td></tr>
          <tr><th>Moyen-Âge</th><td>la <strong>farce</strong> : un mari cocu, un avare, un mauvais tour joué à un sot ; coups de bâton, déguisements. Le rire <strong>libère</strong> (on se moque des puissants).</td></tr>
          <tr><th>XVIIᵉ s.</th><td>la <strong>commedia dell'arte</strong> italienne (théâtre improvisé sur canevas) ; en France, <strong>Molière</strong>.</td></tr>
          <tr><th>XVIIIᵉ s.</th><td>le <strong>vaudeville</strong> : une comédie d'<strong>intrigue</strong> (péripéties, quiproquos).</td></tr>
          <tr><th>Après 1945</th><td>le <strong>théâtre de l'absurde</strong> (Ionesco, Tardieu, Vian) : comique mais grinçant.</td></tr>
        </tbody>
      </table>
      <p style="margin-top:.6rem;"><strong>Personnages et intrigue :</strong> l'univers de la comédie est celui du <strong>tiers état</strong> (bourgeois, paysans). Les <strong>valets et servantes</strong> y jouent un grand rôle (dévoués, mais rusés et gourmands). Au centre des conflits : l'<strong>argent</strong> et l'<strong>amour</strong>, souvent des <strong>conflits familiaux</strong>.</p>
      <p style="margin:.5rem 0 .2rem;"><strong>Les règles de la comédie classique :</strong></p>
      <ul style="line-height:1.9;">
        <li>La <strong>règle des trois unités</strong> : un seul <strong>lieu</strong>, un seul <strong>temps</strong>, une seule <strong>action</strong>.</li>
        <li>On met en scène des <strong>bourgeois</strong> et des gens du <strong>peuple</strong>.</li>
        <li>On multiplie <strong>rebondissements</strong>, <strong>quiproquos</strong> et <strong>péripéties</strong> jusqu'au <strong>dénouement heureux</strong>.</li>
        <li>Le <strong>déguisement</strong>, ressort propice à la surprise.</li>
      </ul>
      <h4 style="font-size:16.5px; font-weight:700; color:var(--text-primary); margin:1.1rem 0 0.4rem;">Les 4 types de comique</h4>
      <table class="compare-table">
        <thead><tr><th>Type</th><th>En quoi ça consiste</th></tr></thead>
        <tbody>
          <tr><th>de mots</th><td>jeu sur les <strong>mots</strong> ou les sons : double sens, mélange des niveaux de langue (calembour, contrepèterie, jeu de mots).</td></tr>
          <tr><th>de gestes</th><td><strong>grimaces</strong>, mimes, chutes, <strong>coups</strong> (farce, commedia dell'arte, cinéma muet).</td></tr>
          <tr><th>de situation</th><td>effet de <strong>surprise</strong>, stratagème (personnage caché, déguisement), <strong>quiproquo</strong>, malentendu.</td></tr>
          <tr><th>de caractère</th><td>on <strong>exagère les défauts</strong> d'un personnage type : l'avare, l'hypocrite, le naïf.</td></tr>
        </tbody>
      </table>
      <h4 style="font-size:16.5px; font-weight:700; color:var(--text-primary); margin:1.1rem 0 0.4rem;">Les 5 procédés d'écriture comique</h4>
      <ul style="line-height:1.9;">
        <li><strong>L'écart</strong> : un décalage entre l'attitude / le statut / le caractère d'une personne et la situation où elle se trouve.</li>
        <li><strong>Le renversement</strong> : un retournement <strong>brutal</strong> de la situation.</li>
        <li><strong>Le glissement vers l'absurde</strong> : on passe de l'ordre <strong>logique</strong> à l'<strong>absurde</strong>.</li>
        <li><strong>La répétition</strong> : un même mot, geste ou situation qui revient → effet <strong>mécanique</strong>, accélération.</li>
        <li><strong>L'exagération</strong> : une situation <strong>amplifiée</strong> ; le comique repose sur la <strong>démesure</strong>.</li>
      </ul>

      <div class="gr2-explain">
        <strong>💡 En clair.</strong> Le théâtre, c'est du texte <strong>joué</strong> (un spectacle vivant). La <strong>comédie</strong> cherche à faire <strong>rire</strong>. À retenir : les <strong>4 types de comique</strong> (mots · gestes · situation · caractère) + les <strong>5 procédés</strong> (écart · renversement · absurde · répétition · exagération) ; <strong>Molière</strong>, l'auteur phare ; la <strong>double énonciation</strong> (on parle aux personnages <em>et</em> au public) ; le vocabulaire de la <strong>salle</strong> (orchestre, parterre, corbeilles, poulailler) et de la <strong>scène</strong> (côté cour/jardin, coulisses, plateau).
        <span class="exam-tip">🎯 Sache relater la vie de Molière, connaître le vocabulaire du théâtre et analyser une scène de comédie.</span>
      </div>
    </div>

    <div class="synth-section">
      <h2>Séquence 8 — La poésie</h2>
      <figure class="hfig hfig-float" style="max-width:150px"><img src="apollinaire.jpg" alt="Guillaume Apollinaire" loading="lazy"><figcaption>Apollinaire, le poète des calligrammes</figcaption></figure>
      <p>Vocabulaire : un <strong>vers</strong> (une ligne), une <strong>strophe</strong> (un groupe de vers), une <strong>rime</strong> (sons identiques à la fin des vers).</p>
      <h3 style="font-size:20px; font-weight:700; color:var(--color-nav); margin:1.2rem 0 0.4rem;">Le vers &amp; les syllabes</h3>
      <ul style="line-height:1.9;">
        <li>On <strong>compte les syllabes</strong> : le « e » muet <strong>en fin de vers ne compte pas</strong> (à l'intérieur, il compte souvent).</li>
        <li>Les <strong>mètres</strong> : <strong>12 = alexandrin</strong>, 10 = décasyllabe, 9 = ennéasyllabe, 8 = octosyllabe, 7 = heptasyllabe.</li>
        <li><strong>La césure</strong> : dans l'<strong>alexandrin</strong>, une coupure au <strong>milieu</strong> partage le vers en <strong>2 hémistiches</strong> de 6 syllabes.</li>
        <li><strong>Vers libres</strong> : ils ne respectent ni la longueur fixe, ni les rimes.</li>
      </ul>
      <h3 style="font-size:20px; font-weight:700; color:var(--color-nav); margin:1.2rem 0 0.4rem;">Les strophes</h3>
      <p>Selon le <strong>nombre de vers</strong> : <strong>distique</strong> (2), <strong>tercet</strong> (3), <strong>quatrain</strong> (4), quintil (5), sizain (6)… dizain (10), douzain (12).</p>
      <h3 style="font-size:20px; font-weight:700; color:var(--color-nav); margin:1.2rem 0 0.4rem;">Les rimes</h3>
      <ul style="line-height:1.9;">
        <li><strong>Disposition</strong> : <strong>plates</strong> (suivies) <em>AABB</em> · <strong>croisées</strong> <em>ABAB</em> · <strong>embrassées</strong> <em>ABBA</em>.</li>
        <li><strong>Nature</strong> : rime <strong>féminine</strong> (se termine par un « e » muet) / rime <strong>masculine</strong> (pas de « e » muet).</li>
        <li><strong>Qualité</strong> (nombre de sons en commun) : <strong>pauvre</strong> (1 son), <strong>suffisante</strong> (2 sons), <strong>riche</strong> (3 sons ou +).</li>
      </ul>
      <p><strong>Calligramme</strong> (Apollinaire) : poème dont la disposition des mots <strong>dessine une forme</strong>.</p>
      <h3 style="font-size:20px; font-weight:700; color:var(--color-nav); margin:1.2rem 0 0.4rem;">✨ Figures de style à connaître</h3>
      <table class="compare-table">
        <thead><tr><th>Figure</th><th>Définition (et exemple)</th></tr></thead>
        <tbody>
          <tr><th>Comparaison</th><td>rapproche 2 éléments avec un <strong>outil</strong> (comme, tel, pareil à)</td></tr>
          <tr><th>Métaphore</th><td>même idée mais <strong>sans</strong> outil (« cet homme est un lion »)</td></tr>
          <tr><th>Personnification</th><td>donner des <strong>traits humains</strong> à une chose</td></tr>
          <tr><th>Hyperbole</th><td><strong>exagération</strong> (« je te l'ai dit <strong>mille fois</strong> »)</td></tr>
          <tr><th>Métonymie</th><td>désigner une chose par une autre <strong>liée</strong> (« <strong>Paris</strong> a gagné » = l'équipe)</td></tr>
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
      <div class="gr2-explain">
        <strong>💡 En clair.</strong> En poésie on <strong>compte les syllabes</strong> d'un vers : <strong>12 = alexandrin</strong>, 10 = décasyllabe, 8 = octosyllabe. Les <strong>rimes</strong> : plates <em>AABB</em>, croisées <em>ABAB</em>, embrassées <em>ABBA</em>. Une <strong>figure de style</strong> = une image (comparaison avec « comme », métaphore sans « comme », personnification, hyperbole = exagération…).
        <span class="exam-tip">🎯 Entraîne-toi avec le jeu « <strong>Quelle figure de style ?</strong> » dans l'onglet Exercices.</span>
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
        <div class="formula-box"><h3>Texte argumenté</h3><p style="line-height:1.9; margin:0;"><strong>Thème</strong> (le sujet) · <strong>thèse</strong> (l'opinion) → <strong>arguments</strong> (+ développement) → <strong>exemples</strong>, reliés par des <strong>connecteurs</strong>.</p></div>
        <div class="formula-box"><h3>Connecteurs logiques</h3><p style="line-height:1.9; margin:0;"><strong>Cause</strong> (car, parce que) · <strong>conséquence</strong> (donc, ainsi) · <strong>addition</strong> (et, puis, enfin) · <strong>opposition/concession</strong> (mais, or, cependant, certes) · <strong>explication</strong> (en effet, par exemple)</p></div>
        <div class="formula-box"><h3>Réussir à convaincre</h3><p style="line-height:1.9; margin:0;">Arguments <strong>recevables</strong> + opinion <strong>nuancée</strong> + technique <strong>concession→réfutation</strong> (« certes… mais… »).</p></div>
        <div class="formula-box"><h3>Vocabulaire du théâtre</h3><p style="line-height:1.9; margin:0;"><strong>réplique</strong> · <strong>tirade</strong> (longue) · <strong>monologue</strong> (seul) · <strong>aparté</strong> (au public) · <strong>stichomythies</strong> (courtes) · <strong>didascalies</strong> · <strong>quiproquo</strong> · <strong>double énonciation</strong> (personnages + public)</p></div>
        <div class="formula-box"><h3>Les 4 types de comique</h3><p style="line-height:1.9; margin:0;">de <strong>mots</strong> · de <strong>gestes</strong> · de <strong>situation</strong> · de <strong>caractère</strong></p></div>
        <div class="formula-box"><h3>Les 5 procédés comiques</h3><p style="line-height:1.9; margin:0;"><strong>écart</strong> · <strong>renversement</strong> · <strong>glissement vers l'absurde</strong> · <strong>répétition</strong> · <strong>exagération</strong></p></div>
        <div class="formula-box"><h3>Le lieu théâtral</h3><p style="line-height:1.9; margin:0;"><strong>Scène</strong> : plateau · côté cour/jardin · coulisses. <strong>Salle</strong> : orchestre · parterre · baignoire · corbeilles · poulailler/« paradis » · loges.</p></div>
        <div class="formula-box"><h3>Structure d'une pièce</h3><p style="line-height:1.9; margin:0;"><strong>actes</strong> (entracte) · tableaux/journées · scènes — progression : <strong>exposition</strong> → (coup de théâtre) → <strong>nœud</strong> → <strong>dénouement</strong></p></div>
        <div class="formula-box"><h3>Les métiers du théâtre</h3><p style="line-height:1.9; margin:0;"><strong>dramaturge</strong> (auteur) · <strong>comédien</strong> · <strong>tragédien</strong> · <strong>figurant</strong> (muet) · <strong>metteur en scène</strong> · <strong>régisseurs</strong></p></div>
      </div>
      <div>
        <div class="formula-box"><h3>Compter les syllabes</h3><div class="formula-main" style="font-size:15px;">12 alexandrin · 10 décasyllabe · 8 octosyllabe</div><p style="line-height:1.8; margin:.5rem 0 0;">Césure de l'alexandrin = 2 <strong>hémistiches</strong> de 6 syllabes. Le « e » muet en fin de vers ne compte pas.</p></div>
        <div class="formula-box"><h3>Disposition des rimes</h3><p style="line-height:1.9; margin:0;">plates <em>AABB</em> · croisées <em>ABAB</em> · embrassées <em>ABBA</em></p></div>
        <div class="formula-box"><h3>Rimes : nature &amp; qualité</h3><p style="line-height:1.9; margin:0;"><strong>Nature</strong> : féminine (« e » muet final) / masculine (sans). <strong>Qualité</strong> : pauvre (1 son) · suffisante (2) · riche (3+).</p></div>
        <div class="formula-box"><h3>Figures de style</h3><p style="line-height:1.9; margin:0;"><strong>Comparaison</strong> (avec « comme ») · <strong>Métaphore</strong> (sans outil) · <strong>Personnification</strong> · <strong>Hyperbole</strong> · <strong>Anaphore</strong> · <strong>Allitération</strong>/<strong>assonance</strong></p></div>
        <div class="formula-box"><h3>Le mythe</h3><p style="line-height:1.9; margin:0;">Récit <strong>sacré</strong> (oral à l'origine ; <em>muthos</em> = « la parole ») avec des <strong>êtres surnaturels/héros</strong> ; <strong>explique</strong> le monde (création, mort, foudre…) et transmet des <strong>valeurs</strong>. Ex : Genèse, Prométhée, Popol Vuh.</p></div>
        <div class="formula-box"><h3>Le résumé</h3><p style="line-height:1.9; margin:0;"><strong>Réduire</strong> (≈ ¼), <strong>reformuler</strong> avec ses mots, rester <strong>neutre</strong> (pas de « je »), garder l'<strong>essentiel</strong> et l'<strong>ordre</strong>. Une liste → un <strong>hyperonyme</strong>.</p></div>
        <div class="formula-box"><h3>Source fiable &amp; pertinente</h3><p style="line-height:1.9; margin:0;"><strong>Pertinence</strong> : bon thème/époque/lieu, utilisable. <strong>Fiabilité</strong> : auteur de confiance ? (site : intention claire, responsable identifiable, à jour, pubs séparées).</p></div>
        <div class="formula-box"><h3>Molière (FO19)</h3><p style="line-height:1.9; margin:0;"><strong>Jean-Baptiste Poquelin</strong> (1622-1673). Illustre Théâtre · <em>Tartuffe</em>, <em>Dom Juan</em> (interdits) · mort en jouant <em>Le Malade imaginaire</em>. « La maison de Molière ».</p></div>
        <div class="formula-box"><h3>La comédie (FO20)</h3><p style="line-height:1.9; margin:0;">Pièce qui fait <strong>rire</strong> (mœurs, caractères, situations). Règle des <strong>3 unités</strong> (lieu, temps, action) · <strong>dénouement heureux</strong>. ≠ tragédie (nobles, fatalité, finit mal).</p></div>
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
      <h3 style="font-size:20px; font-weight:600; color:var(--color-nav); margin-bottom:0.5rem;">🎮 Quelle figure de style ?</h3>
      <p style="color:var(--text-secondary); margin:0 0 .8rem;">On te donne un exemple (ou une définition) ; tu choisis la figure. Correction immédiate + score &amp; série. (Clavier : 1-4, puis Entrée.)</p>
      <button type="button" class="nav-btn" data-mg="fr-mm">▶ Commencer le jeu</button>
      <div id="fr-mm" class="mg-mount"></div>
    </div>

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
    { q: "L'étymologie du mot « mythe » (grec muthos) signifie…", opts: ["la parole", "le dieu", "le héros", "le mensonge"], ans: 0, chapter: "mythe", difficulty: "difficile", exp: "Muthos = « la parole » : le mythe s'est transmis d'abord à l'oral." },
    { q: "Un mythe est avant tout un récit…", opts: ["sacré (souvent religieux)", "scientifique", "publicitaire", "d'actualité"], ans: 0, chapter: "mythe", difficulty: "intermediaire", exp: "Récit sacré, à portée souvent religieuse, avec des êtres surnaturels/héros." },
    { q: "Lequel est un mythe étudié en classe ?", opts: ["Le Popol Vuh (maya)", "Le Petit Chaperon rouge", "Harry Potter", "Le Corbeau et le Renard"], ans: 0, chapter: "mythe", difficulty: "intermediaire", exp: "Mythes vus : la Genèse, Prométhée, le Popol Vuh, la mort d'Orion." },
    { q: "Le mythe explique souvent…", opts: ["la création du monde, la mort, les phénomènes cosmiques", "le prix des choses", "les règles de grammaire", "la météo de demain"], ans: 0, chapter: "mythe", difficulty: "facile", exp: "Il explique des réalités mystérieuses : création du monde, condition mortelle, foudre/éclipses/constellations." },
    { q: "Convaincre, c'est faire adhérer par…", opts: ["la raison (arguments logiques)", "les émotions", "la peur uniquement", "le hasard"], ans: 0, chapter: "argumentation", difficulty: "facile", exp: "Convaincre = la raison ; persuader = les émotions." },
    { q: "Persuader, c'est faire adhérer par…", opts: ["les émotions / sentiments", "des preuves chiffrées", "la logique pure", "des définitions"], ans: 0, chapter: "argumentation", difficulty: "intermediaire", exp: "Persuader joue sur l'affectif (sentiments)." },
    { q: "L'opinion défendue dans un texte argumenté s'appelle…", opts: ["la thèse", "l'exemple", "le connecteur", "la rime"], ans: 0, chapter: "argumentation", difficulty: "intermediaire", exp: "La thèse, soutenue par des arguments illustrés d'exemples." },
    { q: "Lequel est un connecteur logique ?", opts: ["donc", "table", "rouge", "vite"], ans: 0, chapter: "argumentation", difficulty: "facile", exp: "Car, donc, mais, en effet, cependant… relient les arguments." },
    { q: "Le « thème » d'un texte argumenté, c'est…", opts: ["le sujet dont on parle", "l'opinion défendue", "un connecteur", "un exemple"], ans: 0, chapter: "argumentation", difficulty: "intermediaire", exp: "Thème = le sujet. Thèse = l'opinion sur ce sujet." },
    { q: "Un « argument », c'est…", opts: ["une bonne raison pour faire admettre la thèse", "le sujet du texte", "une rime", "une didascalie"], ans: 0, chapter: "argumentation", difficulty: "intermediaire", exp: "L'argument soutient la thèse ; il est souvent illustré par un développement/exemple." },
    { q: "« Donc, ainsi, c'est pourquoi » sont des connecteurs de…", opts: ["conséquence", "cause", "opposition", "explication"], ans: 0, chapter: "argumentation", difficulty: "difficile", exp: "Conséquence : donc, ainsi, c'est pourquoi. Cause : car, parce que, puisque." },
    { q: "« Mais, or, pourtant, cependant » expriment…", opts: ["l'opposition / la concession", "la cause", "l'addition", "la conséquence"], ans: 0, chapter: "argumentation", difficulty: "intermediaire", exp: "Opposition/concession : mais, or, pourtant, cependant, certes, alors que." },
    { q: "La stratégie « certes… mais… » s'appelle…", opts: ["concession puis réfutation", "thèse puis thème", "rime embrassée", "quiproquo"], ans: 0, chapter: "argumentation", difficulty: "difficile", exp: "On concède un point (« certes ») puis on le réfute (« mais ») avec ses arguments." },
    { q: "Pour mieux convaincre, il vaut mieux…", opts: ["nuancer son opinion", "insulter l'adversaire", "n'avoir aucun exemple", "cacher sa thèse"], ans: 0, chapter: "argumentation", difficulty: "intermediaire", exp: "Un avis nuancé (pas tout blanc/tout noir) + des arguments recevables = plus convaincant." },
    { q: "La comédie est une pièce de théâtre destinée surtout à…", opts: ["faire rire", "faire pleurer", "informer", "vendre un produit"], ans: 0, chapter: "comedie", difficulty: "facile", exp: "La comédie fait rire (peinture des mœurs, des caractères, situations inattendues)." },
    { q: "Une longue suite de phrases dite sans interruption est…", opts: ["une tirade", "un aparté", "une stichomythie", "une didascalie"], ans: 0, chapter: "comedie", difficulty: "intermediaire", exp: "Tirade = longue. Monologue = seul. Aparté = au public." },
    { q: "Un personnage SEUL en scène qui parle (il réfléchit) fait…", opts: ["un monologue", "une tirade", "un aparté", "un dialogue"], ans: 0, chapter: "comedie", difficulty: "facile", exp: "Le monologue : un personnage seul se parle à lui-même." },
    { q: "Une parole dite AU PUBLIC, que les autres « n'entendent pas » :", opts: ["un aparté", "une tirade", "une réplique", "une corbeille"], ans: 0, chapter: "comedie", difficulty: "intermediaire", exp: "L'aparté s'adresse au public ; il repose sur la double énonciation." },
    { q: "Des répliques très courtes qui s'enchaînent vite, ce sont des…", opts: ["stichomythies", "didascalies", "tirades", "monologues"], ans: 0, chapter: "comedie", difficulty: "difficile", exp: "Les stichomythies : répliques brèves qui se répondent rapidement." },
    { q: "Une parole qui vise à la fois les personnages ET le public, c'est…", opts: ["la double énonciation", "le quiproquo", "la didascalie", "l'entracte"], ans: 0, chapter: "comedie", difficulty: "difficile", exp: "La double énonciation rend possibles l'ironie, le quiproquo, le comique." },
    { q: "Les indications de mise en scène (gestes, décor, ton) sont…", opts: ["les didascalies", "les répliques", "les apartés", "les tirades"], ans: 0, chapter: "comedie", difficulty: "facile", exp: "Les didascalies : le langage non verbal noté dans le texte." },
    { q: "Un malentendu (on prend une personne/chose pour une autre) :", opts: ["un quiproquo", "une métaphore", "une tirade", "un alexandrin"], ans: 0, chapter: "comedie", difficulty: "intermediaire", exp: "Le quiproquo : grand ressort du comique de situation." },
    { q: "« Côté cour » désigne, pour le comédien qui regarde la salle…", opts: ["sa gauche", "sa droite", "derrière lui", "le balcon"], ans: 0, chapter: "comedie", difficulty: "difficile", exp: "Côté cour = gauche du comédien (= droite du spectateur). Côté jardin = l'inverse." },
    { q: "La partie cachée, derrière le décor, où les comédiens se préparent :", opts: ["les coulisses", "l'orchestre", "le parterre", "la corbeille"], ans: 0, chapter: "comedie", difficulty: "facile", exp: "Les coulisses : invisibles du public." },
    { q: "Dans la salle, les sièges du centre, en contrebas, devant la scène :", opts: ["l'orchestre", "le poulailler", "les coulisses", "le plateau"], ans: 0, chapter: "comedie", difficulty: "intermediaire", exp: "L'orchestre : places centrales en contrebas. Le parterre est derrière." },
    { q: "Le dernier balcon, tout en haut, aux places les moins chères :", opts: ["le poulailler (« paradis »)", "l'orchestre", "le parterre", "la baignoire"], ans: 0, chapter: "comedie", difficulty: "intermediaire", exp: "Le poulailler ou « paradis » : visibilité limitée, places les moins chères." },
    { q: "Le premier balcon, juste au-dessus de l'orchestre, ce sont…", opts: ["les corbeilles", "la baignoire", "les coulisses", "le plateau"], ans: 0, chapter: "comedie", difficulty: "difficile", exp: "Les corbeilles = le 1er balcon. La baignoire = une loge au rez-de-chaussée." },
    { q: "L'auteur qui écrit une pièce de théâtre est…", opts: ["le dramaturge", "le figurant", "le régisseur", "le tragédien"], ans: 0, chapter: "comedie", difficulty: "facile", exp: "Le dramaturge écrit la pièce (comique ou tragique)." },
    { q: "Un acteur qui joue un rôle MUET est…", opts: ["un figurant", "un dramaturge", "un metteur en scène", "un régisseur"], ans: 0, chapter: "comedie", difficulty: "intermediaire", exp: "Le figurant : rôle muet. Le comédien joue des comédies, le tragédien des tragédies." },
    { q: "Celui qui organise la représentation à partir du texte est…", opts: ["le metteur en scène", "le figurant", "le dramaturge", "le tragédien"], ans: 0, chapter: "comedie", difficulty: "facile", exp: "Le metteur en scène dirige la représentation." },
    { q: "La pause entre deux actes s'appelle…", opts: ["l'entracte", "l'exposition", "le dénouement", "l'aparté"], ans: 0, chapter: "comedie", difficulty: "facile", exp: "On baisse le rideau entre les actes : c'est l'entracte." },
    { q: "La première scène, qui présente personnages, lieu et situation :", opts: ["l'exposition", "le dénouement", "le nœud", "l'entracte"], ans: 0, chapter: "comedie", difficulty: "facile", exp: "La scène d'exposition installe l'histoire." },
    { q: "La fin qui apporte la solution et met un terme à l'intrigue :", opts: ["le dénouement", "l'exposition", "le nœud", "la tirade"], ans: 0, chapter: "comedie", difficulty: "intermediaire", exp: "Le dénouement : fin + solution (heureux en comédie)." },
    { q: "Un événement inattendu qui modifie le cours de l'action :", opts: ["un coup de théâtre", "une didascalie", "un entracte", "une corbeille"], ans: 0, chapter: "comedie", difficulty: "intermediaire", exp: "Le coup de théâtre : retournement brutal et inattendu." },
    { q: "La règle des trois unités, c'est un seul…", opts: ["lieu, temps et action", "personnage", "acte", "décor"], ans: 0, chapter: "comedie", difficulty: "difficile", exp: "Comédie/tragédie classiques : unité de lieu, de temps et d'action." },
    { q: "Jouer sur les mots (double sens, calembour), c'est le comique de…", opts: ["mots", "gestes", "situation", "caractère"], ans: 0, chapter: "comedie", difficulty: "intermediaire", exp: "Les 4 types de comique : mots, gestes, situation, caractère." },
    { q: "Exagérer les défauts d'un personnage (l'avare, le naïf), c'est le comique de…", opts: ["caractère", "mots", "gestes", "situation"], ans: 0, chapter: "comedie", difficulty: "intermediaire", exp: "Comique de caractère : on grossit un défaut type." },
    { q: "Grimaces, chutes et coups de bâton relèvent du comique de…", opts: ["gestes", "mots", "caractère", "situation"], ans: 0, chapter: "comedie", difficulty: "facile", exp: "Comique de gestes : farce, commedia dell'arte, cinéma muet." },
    { q: "Répéter un même mot/geste pour faire rire est un procédé comique :", opts: ["la répétition", "l'exposition", "la stichomythie", "la métaphore"], ans: 0, chapter: "comedie", difficulty: "difficile", exp: "Les 5 procédés d'écriture comique : écart, renversement, glissement vers l'absurde, répétition, exagération." },
    { q: "Le vrai nom de Molière est…", opts: ["Jean-Baptiste Poquelin", "Jean de La Fontaine", "Jules Romains", "Fabien Marsaud"], ans: 0, chapter: "comedie", difficulty: "facile", exp: "Molière = Jean-Baptiste Poquelin (1622-1673)." },
    { q: "Molière est mort presque sur scène en jouant…", opts: ["Le Malade imaginaire", "Tartuffe", "Dom Juan", "Knock"], ans: 0, chapter: "comedie", difficulty: "intermediaire", exp: "Pris d'un malaise en jouant Le Malade imaginaire ; enterré de nuit." },
    { q: "La troupe fondée par Molière en 1643 s'appelait…", opts: ["l'Illustre Théâtre", "la Comédie humaine", "le Globe", "le Vaudeville"], ans: 0, chapter: "comedie", difficulty: "difficile", exp: "L'Illustre Théâtre (avec Madeleine Béjart), en faillite dès 1645." },
    { q: "« Brûler les planches » signifie…", opts: ["jouer avec talent et énergie", "rater son entrée", "oublier son texte", "incendier le décor"], ans: 0, chapter: "comedie", difficulty: "intermediaire", exp: "Expression du théâtre : jouer avec brio (les « planches » = la scène)." },
    { q: "« Jouer au pied levé » veut dire…", opts: ["remplacer au dernier moment sans préparation", "danser sur scène", "jouer très lentement", "faire des caprices"], ans: 0, chapter: "comedie", difficulty: "difficile", exp: "Remplacer quelqu'un à l'improviste. (« Jouer les divas » = faire des caprices.)" },
    { q: "Par contraste avec la comédie, la tragédie…", opts: ["met en scène des nobles et finit mal (fatalité)", "fait toujours rire", "n'a pas de personnages", "se passe de nos jours"], ans: 0, chapter: "comedie", difficulty: "intermediaire", exp: "Tragédie : personnages nobles, fatalité, fin malheureuse." },
    { q: "Un vers de 12 syllabes s'appelle…", opts: ["un alexandrin", "un octosyllabe", "un quatrain", "une strophe"], ans: 0, chapter: "poesie", difficulty: "facile", exp: "Alexandrin = 12 syllabes ; octosyllabe = 8 ; décasyllabe = 10." },
    { q: "Une strophe de 4 vers est…", opts: ["un quatrain", "un tercet", "un distique", "un sonnet"], ans: 0, chapter: "poesie", difficulty: "intermediaire", exp: "Distique 2, tercet 3, quatrain 4." },
    { q: "« Il est rusé comme un renard » est…", opts: ["une comparaison", "une métaphore", "une hyperbole", "une anaphore"], ans: 0, chapter: "poesie", difficulty: "facile", exp: "Comparaison : présence de l'outil « comme »." },
    { q: "« Cet homme est un lion » est…", opts: ["une métaphore", "une comparaison", "une personnification", "une assonance"], ans: 0, chapter: "poesie", difficulty: "intermediaire", exp: "Métaphore : rapprochement sans outil de comparaison." },
    { q: "Des rimes disposées ABAB sont…", opts: ["croisées", "plates", "embrassées", "absentes"], ans: 0, chapter: "poesie", difficulty: "difficile", exp: "Plates AABB · croisées ABAB · embrassées ABBA." },
    { q: "La césure de l'alexandrin le coupe en deux…", opts: ["hémistiches (6 + 6 syllabes)", "strophes", "rimes", "quatrains"], ans: 0, chapter: "poesie", difficulty: "difficile", exp: "L'alexandrin (12) se coupe au milieu en 2 hémistiches de 6 syllabes." },
    { q: "Une rime « féminine » se termine par…", opts: ["un « e » muet", "une consonne forte", "une majuscule", "un point"], ans: 0, chapter: "poesie", difficulty: "difficile", exp: "Féminine = avec « e » muet final ; masculine = sans « e » muet." },
    { q: "Une rime « riche », c'est…", opts: ["3 sons en commun (ou plus)", "1 seul son", "aucune rime", "2 strophes"], ans: 0, chapter: "poesie", difficulty: "difficile", exp: "Qualité : pauvre (1 son), suffisante (2), riche (3 ou +)." },
    { q: "Un vers de 8 syllabes s'appelle…", opts: ["un octosyllabe", "un alexandrin", "un décasyllabe", "un hémistiche"], ans: 0, chapter: "poesie", difficulty: "intermediaire", exp: "8 = octosyllabe ; 10 = décasyllabe ; 12 = alexandrin." },
    { q: "Pour présenter une œuvre à l'oral, on termine par…", opts: ["un avis personnel argumenté", "le prix du livre", "rien", "une question au prof"], ans: 0, chapter: "oral", difficulty: "facile", exp: "Présenter → résumer → analyser → avis argumenté." },
    { q: "Un calligramme, inventé par Apollinaire, est…", opts: ["un poème dont les mots dessinent une forme", "une longue tirade", "une fable", "un résumé"], ans: 0, chapter: "poesie", difficulty: "intermediaire", exp: "Calligramme = poème-dessin (Guillaume Apollinaire)." },
    { q: "Une fable de La Fontaine se termine toujours par…", opts: ["une morale", "une rime", "un quiproquo", "un acte"], ans: 0, chapter: "argumentation", difficulty: "intermediaire", exp: "La fable = court récit (souvent d'animaux) + une morale : une argumentation indirecte." },
    { q: "« Convaincre » s'adresse surtout à…", opts: ["la raison", "les émotions", "la peur", "l'imagination"], ans: 0, chapter: "argumentation", difficulty: "facile", exp: "Convaincre = la raison (arguments logiques) ; persuader = les émotions." },
    { q: "« Paris a gagné le match » (= l'équipe) est…", opts: ["une métonymie", "une métaphore", "une comparaison", "une hyperbole"], ans: 0, chapter: "poesie", difficulty: "difficile", exp: "Métonymie : on désigne une chose par une autre liée (la ville pour l'équipe)." },
    { q: "« Le vent hurlait dans la nuit » est…", opts: ["une personnification", "une comparaison", "une métonymie", "un quiproquo"], ans: 0, chapter: "poesie", difficulty: "intermediaire", exp: "Personnification : donner un comportement humain à une chose." },
    { q: "« Je te l'ai dit mille fois ! » est…", opts: ["une hyperbole", "une litote", "une comparaison", "une anaphore"], ans: 0, chapter: "poesie", difficulty: "intermediaire", exp: "Hyperbole : exagération volontaire." },
    { q: "Répéter un même mot en début de plusieurs vers, c'est…", opts: ["une anaphore", "une allitération", "une métaphore", "une rime"], ans: 0, chapter: "poesie", difficulty: "difficile", exp: "Anaphore = répétition en tête de vers/phrase." },
    { q: "Une strophe de 3 vers s'appelle…", opts: ["un tercet", "un distique", "un quatrain", "un sonnet"], ans: 0, chapter: "poesie", difficulty: "intermediaire", exp: "Distique 2 · tercet 3 · quatrain 4." },    { q: "Un hyperonyme est un mot…", opts: ["général qui en englobe d'autres", "précis et particulier", "inventé", "interdit en résumé"], ans: 0, chapter: "resume", difficulty: "intermediaire", exp: "Hyperonyme = mot générique (fleur). Hyponyme = mot précis (rose, tulipe)." },
    { q: "« rose, tulipe, marguerite » sont des hyponymes de…", opts: ["fleur", "jardin", "couleur", "parfum"], ans: 0, chapter: "resume", difficulty: "intermediaire", exp: "« fleur » est l'hyperonyme ; rose/tulipe/marguerite en sont les hyponymes." },
    { q: "Pourquoi l'hyperonyme est utile dans un résumé ?", opts: ["il remplace une liste par un seul mot", "il rallonge le texte", "il donne un avis", "il ajoute des exemples"], ans: 0, chapter: "resume", difficulty: "difficile", exp: "On condense : « des roses, des lys, des tulipes » → « des fleurs »." },
    { q: "Le « chat » est un hyponyme de…", opts: ["félin", "chien", "meuble", "légume"], ans: 0, chapter: "resume", difficulty: "facile", exp: "félin (hyperonyme) englobe chat, lion, tigre (hyponymes)." },
    { q: "La « pertinence » d'une source, c'est…", opts: ["qu'elle concerne bien ton thème (et est utilisable)", "qu'elle est jolie", "qu'elle est récente uniquement", "qu'elle est longue"], ans: 0, chapter: "resume", difficulty: "intermediaire", exp: "Pertinence = bon thème/époque/lieu + tu peux la comprendre et l'utiliser." },
    { q: "La « fiabilité » d'une source, ça vérifie…", opts: ["si on peut faire confiance à l'auteur", "si le texte est long", "le nombre d'images", "la couleur du site"], ans: 0, chapter: "resume", difficulty: "intermediaire", exp: "L'auteur peut vouloir vendre ou être partial : on vérifie sa fiabilité." },
    { q: "Pour juger un site internet fiable, on regarde…", opts: ["l'intention, le responsable, la mise à jour, les pubs", "uniquement les couleurs", "le nombre de visiteurs", "la taille de la police"], ans: 0, chapter: "resume", difficulty: "difficile", exp: "Grille : intention claire, responsable identifiable (officiel/expert), site à jour, pubs séparées du contenu." },
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
    { front: "Le mythe : définition complète ?", back: "Un récit sacré (souvent religieux) avec des êtres surnaturels/légendaires et des héros, qui explique des réalités mystérieuses et transmet des valeurs.", chapter: "mythe" },
    { front: "Étymologie de « mythe » ?", back: "Du grec muthos = « la parole » : transmis d'abord oralement, puis fixé par écrit (tragédies, Bible).", chapter: "mythe" },
    { front: "Que peut expliquer un mythe ?", back: "La création du monde, la condition mortelle de l'homme, des phénomènes cosmiques (foudre, éclipses, constellations…).", chapter: "mythe" },
    { front: "Mythes étudiés en classe ?", back: "La Genèse (Adam et Ève), Prométhée, le Popol Vuh (maya), la mort d'Orion.", chapter: "mythe" },
    { front: "Convaincre vs Persuader ?", back: "Convaincre = par la raison (arguments logiques). Persuader = par les émotions (sentiments).", chapter: "argumentation" },
    { front: "Structure d'un texte argumenté ?", back: "Thèse (opinion) → arguments → exemples, reliés par des connecteurs logiques (car, donc, mais, en effet…).", chapter: "argumentation" },
    { front: "Thème / thèse / argument ?", back: "Thème = le sujet (de quoi on parle). Thèse = l'opinion défendue. Argument = une bonne raison qui soutient la thèse (souvent + un développement/exemple).", chapter: "argumentation" },
    { front: "Convaincre vs persuader (précis) ?", back: "Convaincre = obtenir l'accord par des preuves/témoignages (adhésion rationnelle). Persuader = faire croire en touchant les émotions (adhésion émotionnelle).", chapter: "argumentation" },
    { front: "Le schéma argumentatif ?", back: "Thèse → Argument 1 (+ développement) → Argument 2 → Argument 3. L'ordre peut varier ; parfois il faut inférer la thèse ou un argument.", chapter: "argumentation" },
    { front: "Les connecteurs logiques (familles) ?", back: "Cause (car, parce que) · Conséquence (donc, ainsi) · Addition (et, puis, enfin) · Opposition/concession (mais, or, cependant, certes) · Explication (en effet, par exemple).", chapter: "argumentation" },
    { front: "La stratégie concession-réfutation ?", back: "On concède d'abord un point (« certes… »), puis on le réfute (« mais… ») en avançant ses propres arguments.", chapter: "argumentation" },
    { front: "Comment réussir son argumentation ?", back: "Avancer des arguments recevables (ne pas heurter le destinataire) et nuancer son opinion (pas tout blanc/tout noir).", chapter: "argumentation" },
    { front: "Informatif vs argumenté ?", back: "Informatif = informer (neutre). Argumenté = défendre une thèse / faire réagir.", chapter: "argumentation" },
    { front: "La comédie : définition ?", back: "Une pièce de théâtre destinée à faire RIRE, par la peinture des mœurs, des caractères ou la succession de situations inattendues.", chapter: "comedie" },
    { front: "Tirade / monologue / aparté ?", back: "Tirade = longue suite de phrases (à un autre). Monologue = un personnage parle seul. Aparté = dit au public (les autres « n'entendent pas »).", chapter: "comedie" },
    { front: "Les stichomythies ?", back: "Des répliques très courtes qui s'enchaînent rapidement (montent la tension).", chapter: "comedie" },
    { front: "La double énonciation ?", back: "Au théâtre, une parole vise en même temps les personnages (sur scène) ET le public (dans la salle). Permet quiproquo, ironie, comique.", chapter: "comedie" },
    { front: "Les didascalies ?", back: "Les indications du texte (gestes, décor, ton), souvent en italique = le langage non verbal.", chapter: "comedie" },
    { front: "Les 4 types de comique ?", back: "Comique de mots, de gestes, de situation, de caractère.", chapter: "comedie" },
    { front: "Les 5 procédés d'écriture comique ?", back: "L'écart, le renversement, le glissement vers l'absurde, la répétition, l'exagération.", chapter: "comedie" },
    { front: "Côté cour / côté jardin ?", back: "Pour le comédien face à la salle : cour = sa gauche, jardin = sa droite. (Pour le spectateur, c'est l'inverse ; mémo « Jardin-Cour » de gauche à droite.)", chapter: "comedie" },
    { front: "Le plateau / les coulisses ?", back: "Le plateau = l'espace où sont les décors et où jouent les comédiens. Les coulisses = la partie cachée, derrière le décor.", chapter: "comedie" },
    { front: "L'orchestre / le parterre ?", back: "L'orchestre = les sièges du centre, en contrebas, devant la scène. Le parterre = les places situées derrière l'orchestre.", chapter: "comedie" },
    { front: "Les corbeilles / la baignoire ?", back: "Les corbeilles = le 1er balcon, au-dessus de l'orchestre. La baignoire = une loge au rez-de-chaussée.", chapter: "comedie" },
    { front: "Le poulailler (« paradis ») ?", back: "Le dernier balcon, tout en haut : visibilité limitée, places les moins chères.", chapter: "comedie" },
    { front: "Les métiers du théâtre ?", back: "Dramaturge (auteur), comédien (comédies), tragédien (tragédies), figurant (rôle muet), metteur en scène, régisseurs (son/lumière).", chapter: "comedie" },
    { front: "Acte / scène / entracte ?", back: "Acte = grande partie (on baisse le rideau entre les actes). Scène = subdivision (change quand un perso entre/sort). Entracte = la pause entre deux actes.", chapter: "comedie" },
    { front: "La structure d'une pièce (progression) ?", back: "Exposition → (coup de théâtre) → nœud (point culminant) → dénouement (fin + solution).", chapter: "comedie" },
    { front: "Un coup de théâtre ?", back: "Un événement inattendu qui modifie brutalement le cours de l'action.", chapter: "comedie" },
    { front: "La règle des trois unités ?", back: "Un seul lieu, un seul temps, une seule action (théâtre classique).", chapter: "comedie" },
    { front: "Molière, qui est-ce ?", back: "Jean-Baptiste Poquelin (1622-1673), auteur phare de la comédie. Illustre Théâtre ; Tartuffe, Dom Juan (interdits) ; mort en jouant Le Malade imaginaire.", chapter: "comedie" },
    { front: "Expressions : brûler les planches / tenir l'affiche / rester en carafe ?", back: "Brûler les planches = jouer avec talent. Tenir l'affiche = être joué longtemps. Rester en carafe = rester bloqué (ex. oublier son texte).", chapter: "comedie" },
    { front: "Comédie vs tragédie ?", back: "Comédie = fait rire, dénouement heureux, personnages ordinaires. Tragédie = personnages nobles, fatalité, fin malheureuse.", chapter: "comedie" },
    { front: "Alexandrin / décasyllabe / octosyllabe ?", back: "12 / 10 / 8 syllabes.", chapter: "poesie" },
    { front: "Rimes plates / croisées / embrassées ?", back: "Plates AABB · croisées ABAB · embrassées ABBA.", chapter: "poesie" },
    { front: "La césure et l'hémistiche ?", back: "La césure coupe le vers ; dans l'alexandrin, elle le partage en 2 hémistiches de 6 syllabes (6 + 6).", chapter: "poesie" },
    { front: "Rime féminine vs masculine ?", back: "Féminine = se termine par un « e » muet. Masculine = sans « e » muet final.", chapter: "poesie" },
    { front: "Qualité d'une rime (pauvre/suffisante/riche) ?", back: "Selon le nombre de sons en commun : pauvre = 1 son, suffisante = 2 sons, riche = 3 sons ou plus.", chapter: "poesie" },
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
    { front: "Pertinence vs fiabilité d'une source ?", back: "Pertinence = la source concerne bien ton thème (époque, lieu) et tu peux l'utiliser. Fiabilité = peux-tu faire confiance à l'auteur (pas de but caché : vendre, manipuler) ?", chapter: "resume" },
    { front: "Évaluer un site internet (fiabilité) ?", back: "Intention claire ? Responsable identifiable (organisme officiel / expert) ? Site à jour et bien organisé ? Langage correct ? Publicités séparées du contenu ?", chapter: "resume" },
    { front: "Qu'est-ce que le slam ?", back: "Une poésie orale, déclamée en public, à l'origine sans musique. Joue sur le rythme, les jeux de mots, les rimes et les figures de style.", chapter: "poesie" },
    { front: "Grand Corps Malade ?", back: "Fabien Marsaud, artiste contemporain français, pionnier du slam (album « Midi 20 »). Son nom de scène vient d'un accident grave.", chapter: "poesie" }
  ];

  /* ---------------------- LEXIQUE (onglet bonus) ----------------------
     Regroupe TOUTES les définitions (à partir des flashcards), par chapitre,
     en mode « cache-révèle » (clic sur un mot = sa définition). Parfait pour
     les questions de définition. Se remplit tout seul quand on ajoute des cartes. */
  window.gr2LexAll = function (btn, open) {
    var w = btn.closest('.lex-wrap'); if (!w) return;
    [].forEach.call(w.querySelectorAll('details'), function (d) { d.open = open; });
  };
  function buildLexiqueHTML() {
    var order = ['resume', 'mythe', 'argumentation', 'comedie', 'poesie', 'oral'];
    var labels = { resume: 'Le résumé', mythe: 'Le mythe', argumentation: "L'argumentation", comedie: 'La comédie / le théâtre', poesie: 'La poésie', oral: 'Examen oral' };
    var esc = function (s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); };
    var by = {}; flashcards.forEach(function (c) { (by[c.chapter] = by[c.chapter] || []).push(c); });
    var h = '<h2 style="font-size:30px; font-weight:800; color:var(--color-nav); margin-bottom:.4rem;">📖 Lexique — les définitions</h2>';
    h += '<p style="color:var(--text-secondary); margin:0 0 1rem;">Tous les mots importants pour les <strong>questions de définition</strong>. Clique sur un mot pour révéler sa définition (mode « je me teste »). <strong>' + flashcards.length + '</strong> termes.</p>';
    h += '<div class="lex-wrap">';
    h += '<div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:1rem;">';
    h += '<button type="button" style="padding:8px 14px; border-radius:999px; border:1px solid var(--border-subtle); background:var(--bg-card); color:var(--text-primary); font-weight:700; cursor:pointer; font-size:14px;" onclick="gr2LexAll(this,true)">👁️ Tout afficher</button>';
    h += '<button type="button" style="padding:8px 14px; border-radius:999px; border:1px solid var(--border-subtle); background:var(--bg-card); color:var(--text-primary); font-weight:700; cursor:pointer; font-size:14px;" onclick="gr2LexAll(this,false)">🙈 Tout cacher</button>';
    h += '</div>';
    order.forEach(function (ch) {
      var items = by[ch]; if (!items || !items.length) return;
      h += '<h3 style="font-size:20px; font-weight:700; color:var(--color-nav); margin:1.3rem 0 .5rem;">' + esc(labels[ch] || ch) + ' <span style="font-size:13px; font-weight:600; color:var(--text-secondary);">(' + items.length + ')</span></h3>';
      items.forEach(function (c) {
        h += '<details style="border:1px solid var(--border-subtle); border-radius:10px; margin:.4rem 0; background:var(--bg-card);">'
          + '<summary style="padding:11px 14px; font-weight:700; color:var(--text-primary); cursor:pointer;">' + esc(c.front) + '</summary>'
          + '<div style="padding:2px 14px 12px; color:var(--text-secondary); line-height:1.7;">' + esc(c.back) + '</div>'
          + '</details>';
      });
    });
    h += '</div>';
    return h;
  }

  window.registerSubject('francais', {
    subtitle: 'Français 4ᵉ — résumé, mythe, argumentation, comédie, poésie',
    content: {
      sections: sections,
      questions: questions,
      flashcards: flashcards,
      extraTabs: [{ label: '📖 Lexique', html: buildLexiqueHTML() }],
      demos: {},
      navLabels: { formules: '📌 Notions', exercices: '🎯 Exercices' },
      chapOrder: ['resume', 'mythe', 'argumentation', 'comedie', 'poesie', 'oral'],
      chapLabels: { resume: 'Le résumé', mythe: 'Le mythe', argumentation: "L'argumentation", comedie: 'La comédie', poesie: 'La poésie', oral: 'Examen oral' }
    }
  });
})();
