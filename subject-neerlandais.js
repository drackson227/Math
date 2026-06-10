/* GR2 Study — Contenu NÉERLANDAIS (4N2) — examen juin 2026
   Chapitres : Grammaire (VTT/OVT, modaux, négation, omdat/want, verbes de position,
   prépositions) · De woning (la maison) · Aan tafel! (à table, nourriture, restaurant).
   D'après la synthèse du cours (5 chapitres : Terug naar school → Aan tafel!).
   S'enregistre auprès de subjects.js via window.registerSubject. */
(function () {
  'use strict';
  if (typeof window.registerSubject !== 'function') return;

  var sections = {};

  /* ---------------------- SYNTHÈSE (cours) ---------------------- */
  sections.synthese = `<div id="synthese" class="section active">
    <div style="text-align:center; margin-bottom:1.5rem;">
      <h2 style="font-size:30px; font-weight:800; color:var(--color-nav); margin:0;">🇳🇱 Nederlands — 4N2</h2>
      <p style="color:var(--text-secondary); margin-top:6px;">Grammaire · De woning · Aan tafel! — examen juin 2026</p>
    </div>

    <div class="synth-section">
      <h2>1. Le passé composé — VTT (Voltooid Tegenwoordige Tijd)</h2>
      <p>On l'utilise pour parler du <strong>passé</strong> (les vacances, le week-end…). Structure :</p>
      <div class="key-rule"><div class="formula-main" style="font-size:17px;">hebben / zijn (conjugué) + … + participe passé (à la FIN)</div></div>
      <p><strong>Quand prend-on « zijn » ?</strong> Avec les verbes de <strong>déplacement</strong> (gaan, komen, reizen, vertrekken, aankomen, terugkomen, rijden, lopen…) et de <strong>changement d'état</strong> (blijven, worden, zijn). Sinon → <strong>hebben</strong>.</p>
      <p><strong>Le participe passé régulier</strong> : <strong>ge + radical + d/t</strong>. La lettre finale suit la règle « <strong>'t kofschip</strong> » : si le radical finit par une lettre de <strong>t–k–f–s–ch–p</strong> → <strong>t</strong>, sinon → <strong>d</strong>.</p>
      <ul style="line-height:1.9;">
        <li>werken → ge<strong>werk</strong>t · boeken → geboekt · maken → gemaakt (finale dans 't kofschip → <strong>t</strong>)</li>
        <li>reizen → ge<strong>reis</strong>d · voetballen → gevoetbald (autre finale → <strong>d</strong>)</li>
        <li><strong>Irréguliers</strong> (par cœur) : eten → gegeten · zwemmen → gezwommen · bezoeken → bezocht · vertrekken → vertrokken.</li>
      </ul>
      <div class="simple-exp-box">
        <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Exemple type</button>
        <div class="simple-exp-content"><strong>Tijdens de zomervakantie ben ik naar Spanje gereisd.</strong> (Pendant les vacances d'été, je suis allé en Espagne.) → verbe de déplacement « reizen » → on prend <strong>ben</strong> (zijn), et le participe <strong>gereisd</strong> va à la fin.</div>
      </div>
    </div>

    <div class="synth-section">
      <h2>2. Les verbes de position — liggen · zitten · staan · hangen</h2>
      <p>Le néerlandais précise <strong>comment</strong> une chose se trouve quelque part (couchée, debout, accrochée…). Ils traduisent aussi « <strong>il y a</strong> ».</p>
      <ul style="line-height:1.9;">
        <li><strong>liggen</strong> = être couché / à plat → <em>De bril <strong>ligt</strong> naast het kopje.</em></li>
        <li><strong>zitten</strong> = être assis → <em>De man <strong>zit</strong> op de bank.</em></li>
        <li><strong>staan</strong> = être debout / posé → <em>Het kopje <strong>staat</strong> op de tafel.</em></li>
        <li><strong>hangen</strong> = être accroché / pendu → <em>De foto's <strong>hangen</strong> aan de muur.</em></li>
      </ul>
      <div class="key-rule"><div class="formula-main">« Il y a » → Er <strong>ligt/staat/hangt</strong> een… (singulier) · Er <strong>liggen/staan/hangen</strong> … (pluriel)</div></div>
      <p>⚠️ Attention à l'<strong>accord singulier / pluriel</strong> du verbe : Er <strong>hangt</strong> een schilderij. / Er <strong>hangen</strong> twee schilderijen.</p>
    </div>

    <div class="synth-section">
      <h2>3. Les prépositions de lieu</h2>
      <ul style="line-height:1.9;">
        <li><strong>in</strong> (dans) · <strong>op</strong> (sur) · <strong>boven</strong> (au-dessus) · <strong>onder</strong> (en dessous) · <strong>aan</strong> (à / contre)</li>
        <li><strong>voor</strong> (devant) · <strong>achter</strong> (derrière) · <strong>naast</strong> (à côté de) · <strong>tussen</strong> (entre) · <strong>tegenover</strong> (en face de)</li>
      </ul>
      <p>Très utile pour <strong>décrire une pièce ou une maison</strong> à l'oral et à l'écrit (avec les verbes de position).</p>
    </div>

    <div class="synth-section">
      <h2>4. Les verbes modaux & la négation</h2>
      <p>Un <strong>modal</strong> (moeten = devoir · willen = vouloir · kunnen = pouvoir · mogen = avoir le droit) se conjugue, et le <strong>second verbe part à l'infinitif en fin de phrase</strong> :</p>
      <ul style="line-height:1.9;">
        <li><em>Ik <strong>moet</strong> thuis <strong>helpen</strong>.</em> (Je dois aider à la maison.)</li>
        <li><em>Ik <strong>kan</strong> goed <strong>zwemmen</strong>.</em> (Je sais bien nager.)</li>
        <li><em><strong>Mag</strong> ik de rekening?</em> (Puis-je avoir l'addition ?)</li>
      </ul>
      <p><strong>La négation :</strong> <strong>niet</strong> pour nier un verbe ou un adjectif (<em>Het vlees was <strong>niet</strong> warm</em>) · <strong>geen</strong> pour nier un nom (<em>Er zijn <strong>geen</strong> erwten</em>) · <strong>te</strong> + adjectif = « <strong>trop</strong> » (<em>Het is <strong>te</strong> zout / te zoet / te koud</em>).</p>
    </div>

    <div class="synth-section">
      <h2>5. Omdat vs Want (parce que / car)</h2>
      <p>Les deux veulent dire « parce que / car », mais l'<strong>ordre des mots</strong> change :</p>
      <ul style="line-height:1.9;">
        <li><strong>omdat</strong> → le verbe part à la <strong>FIN</strong> : <em>Ik ga vroeg slapen <strong>omdat ik moe ben</strong>.</em></li>
        <li><strong>want</strong> → ordre <strong>normal</strong> : <em>Ik ga vroeg slapen <strong>want ik ben moe</strong>.</em></li>
      </ul>
    </div>
  </div>`;

  /* ---------------------- REPÈRES (grammaire + verbes irréguliers) ---------------------- */
  sections.formules = `<div id="formules" class="section">
    <h2 style="font-size:30px; font-weight:800; color:var(--color-nav); margin-bottom:1rem;">📌 Repères à connaître</h2>
    <div class="formula-grid">
      <div>
        <div class="formula-box"><h3>Passé composé (VTT)</h3><div class="formula-main" style="font-size:16px;">hebben / zijn + … + participe (fin)</div><p class="note"><strong>zijn</strong> = déplacement (gaan, komen, reizen, vertrekken…) & état (blijven, worden).</p></div>
        <div class="formula-box"><h3>Participe régulier</h3><div class="formula-main" style="font-size:16px;">ge + radical + d / t</div><p class="note">« <strong>'t kofschip</strong> » : finale dans t-k-f-s-ch-p → <strong>t</strong>, sinon → <strong>d</strong>.</p></div>
        <div class="formula-box"><h3>Verbes de position</h3><p style="line-height:1.9; margin:0;"><strong>liggen</strong> (couché) · <strong>zitten</strong> (assis) · <strong>staan</strong> (debout) · <strong>hangen</strong> (accroché). Servent aussi à dire « il y a ».</p></div>
        <div class="formula-box"><h3>Prépositions de lieu</h3><p style="line-height:1.9; margin:0;">in · op · boven · onder · aan · voor · achter · naast · tussen · tegenover</p></div>
      </div>
      <div>
        <div class="formula-box"><h3>Modaux</h3><div class="formula-main" style="font-size:16px;">modal conjugué + infinitif (fin)</div><p class="note">moeten (devoir) · willen (vouloir) · kunnen (pouvoir) · mogen (avoir le droit).</p></div>
        <div class="formula-box"><h3>Négation</h3><p style="line-height:1.9; margin:0;"><strong>niet</strong> (verbe/adjectif) · <strong>geen</strong> (nom) · <strong>te</strong> + adj = « trop ».</p></div>
        <div class="formula-box"><h3>Omdat vs Want</h3><p style="line-height:1.9; margin:0;"><strong>omdat</strong> → verbe à la fin · <strong>want</strong> → ordre normal. (= parce que / car)</p></div>
        <div class="formula-box"><h3>⚠️ Verbes irréguliers (par cœur)</h3><p style="line-height:1.9; margin:0;">eten → gegeten · zwemmen → gezwommen · bezoeken → bezocht · vertrekken → vertrokken · gaan → gegaan (zijn) · komen → gekomen (zijn) · zijn → geweest (zijn) · doen → gedaan.</p></div>
      </div>
    </div>
  </div>`;

  /* ---------------------- MÉTHODE ---------------------- */
  sections.methodes = `<div id="methodes" class="section">
    <h2 style="font-size:30px; font-weight:800; color:var(--color-nav); margin-bottom:1rem;">📝 Méthode</h2>

    <div class="synth-section">
      <h2>Former un passé composé (VTT) sans se tromper</h2>
      <div class="step-item"><div class="step-num">1</div><div class="step-text"><strong>Choisir l'auxiliaire</strong> : déplacement / changement d'état → <strong>zijn</strong> ; sinon → <strong>hebben</strong>.</div></div>
      <div class="step-item"><div class="step-num">2</div><div class="step-text"><strong>Former le participe</strong> : irrégulier connu ? Sinon <strong>ge + radical + d/t</strong> (règle 't kofschip).</div></div>
      <div class="step-item"><div class="step-num">3</div><div class="step-text"><strong>Placer le participe à la FIN</strong> de la phrase.</div></div>
      <div class="step-item"><div class="step-num">4</div><div class="step-text">Exemple : <em>We <strong>zijn</strong> zondag naar België <strong>teruggekomen</strong>.</em></div></div>
    </div>

    <div class="synth-section">
      <h2>Décrire une maison / une pièce (De woning)</h2>
      <div class="step-item"><div class="step-num">1</div><div class="step-text">Choisir le <strong>verbe de position</strong> : posé/debout → staan · accroché → hangen · à plat → liggen · assis → zitten.</div></div>
      <div class="step-item"><div class="step-num">2</div><div class="step-text">Ajouter la <strong>préposition de lieu</strong> (op de tafel, aan de muur, naast het bed…).</div></div>
      <div class="step-item"><div class="step-num">3</div><div class="step-text">Accorder le verbe au <strong>singulier / pluriel</strong> : Er <strong>staat</strong> een stoel / Er <strong>staan</strong> twee stoelen.</div></div>
      <div class="step-item"><div class="step-num">4</div><div class="step-text">Exemple : <em>Er <strong>hangt</strong> een schilderij <strong>aan de muur</strong> en er <strong>ligt</strong> een tapijt <strong>op de grond</strong>.</em></div></div>
    </div>

    <div class="synth-section">
      <h2>Répondre à l'oral (Mondeling examen)</h2>
      <div class="step-item"><div class="step-num">1</div><div class="step-text">Question sur le passé (<em>Wat heb je dit weekend gedaan?</em>) → réponds au <strong>VTT</strong> (Ik heb… / Ik ben…).</div></div>
      <div class="step-item"><div class="step-num">2</div><div class="step-text">Question sur les goûts / hobbies → <em>Ik hou van… / Ik doe graag… / Ik heb een hekel aan…</em></div></div>
      <div class="step-item"><div class="step-num">3</div><div class="step-text">Question sur la maison → utilise le <strong>vocabulaire « De woning »</strong> + verbes de position.</div></div>
      <div class="step-item"><div class="step-num">4</div><div class="step-text">Parle <strong>fort</strong>, en <strong>phrases complètes</strong> : pas juste un mot.</div></div>
    </div>
  </div>`;

  /* ---------------------- EXERCICES ---------------------- */
  sections.exercices = `<div id="exercices" class="section">
    <h2 style="font-size:30px; font-weight:800; color:var(--color-nav); margin-bottom:1rem;">🎯 Exercices</h2>
    <p style="color:var(--text-secondary); margin-bottom:1.2rem;">Traduis de tête, puis vérifie. (Cache la colonne de droite avec ta main.)</p>

    <div class="exercise-card">
      <h3 style="font-size:20px; font-weight:600; color:var(--color-nav);">✍️ Traductions FR → NL (passé composé)</h3>
      <ul style="line-height:2;">
        <li>Pendant les vacances, j'ai voyagé en Italie. → <strong>Tijdens de vakantie heb ik in Italië gereisd.</strong></li>
        <li>Nous avons réservé un hôtel à la mer. → <strong>We hebben een hotel aan zee geboekt.</strong></li>
        <li>J'ai pris beaucoup de photos. → <strong>Ik heb veel foto's gemaakt.</strong></li>
        <li>Nous sommes partis tôt le matin. → <strong>We zijn 's morgens vroeg vertrokken.</strong></li>
        <li>Mon frère a nagé dans la mer. → <strong>Mijn broer heeft in de zee gezwommen.</strong></li>
        <li>Nous avons mangé dans un restaurant espagnol. → <strong>We hebben in een Spaans restaurant gegeten.</strong></li>
        <li>Nous sommes revenus en Belgique dimanche. → <strong>We zijn zondag naar België teruggekomen.</strong></li>
      </ul>
    </div>

    <div class="exercise-card">
      <h3 style="font-size:20px; font-weight:600; color:var(--color-nav);">🏠 Décrire (verbes de position)</h3>
      <ul style="line-height:2;">
        <li>Il y a un tableau au mur. → <strong>Er hangt een schilderij aan de muur.</strong></li>
        <li>Il y a deux armoires dans la chambre. → <strong>Er staan twee kasten in de slaapkamer.</strong></li>
        <li>Il y a un tapis sur le sol. → <strong>Er ligt een tapijt op de grond.</strong></li>
        <li>La tasse est posée sur la table. → <strong>Het kopje staat op de tafel.</strong></li>
      </ul>
    </div>

    <div class="exercise-card">
      <h3 style="font-size:20px; font-weight:600; color:var(--color-nav);">🗣️ Oral — les 13 questions à préparer</h3>
      <ul style="line-height:2;">
        <li>Wat heb je dit weekend gedaan? (VTT !)</li>
        <li>Wat moet je thuis doen om te helpen? (modaux)</li>
        <li>Wat is je lievelingsvak en waarom?</li>
        <li>Wat zijn je hobby's? / Wat doe je graag?</li>
        <li>Wat zijn de symptomen van de griep?</li>
        <li>Hoe ziet je vader / moeder eruit? (description)</li>
        <li>Hoe is het weer vandaag? (météo)</li>
        <li>Wat eet je bij het ontbijt? / Wat eet je graag?</li>
        <li>Doe je aan sport? Hoe vaak train je?</li>
        <li>Hoe ziet je huis eruit? (vocabulaire « De woning » !)</li>
      </ul>
      <p style="color:var(--text-secondary);">👉 Le <strong>Quiz</strong> et les <strong>Flashcards</strong> (en haut) testent le vocabulaire et la grammaire.</p>
    </div>
  </div>`;

  /* ---------------------- ERREURS ---------------------- */
  sections.erreurs = `<div id="erreurs" class="section">
    <h2 style="font-size:30px; font-weight:800; color:var(--color-nav); margin-bottom:1rem;">⚠️ Pièges fréquents</h2>
    <div class="formula-grid">
      <div class="formula-box"><h3>❌ hebben au lieu de zijn</h3><p>Les verbes de <strong>déplacement</strong> (gaan, reizen, vertrekken…) prennent <strong>zijn</strong> au passé composé : <em>Ik <strong>ben</strong> gegaan</em>, pas <s>ik heb gegaan</s>.</p></div>
      <div class="formula-box"><h3>❌ Participe au mauvais endroit</h3><p>Le participe passé va <strong>à la fin</strong> de la phrase : <em>Ik heb een hotel <strong>geboekt</strong></em> — pas au milieu.</p></div>
      <div class="formula-box"><h3>❌ d ou t ? (kofschip)</h3><p>Regarde la <strong>dernière lettre du radical</strong> : dans <strong>t-k-f-s-ch-p</strong> → <strong>t</strong> (gewerkt), sinon → <strong>d</strong> (gereisd).</p></div>
      <div class="formula-box"><h3>❌ niet / geen</h3><p><strong>geen</strong> devant un <strong>nom</strong> (geen erwten), <strong>niet</strong> pour un <strong>verbe/adjectif</strong> (niet warm). Ne les confonds pas.</p></div>
      <div class="formula-box"><h3>❌ Singulier/pluriel des verbes de position</h3><p>Er <strong>hangt</strong> een schilderij (1) ≠ Er <strong>hangen</strong> schilderijen (plusieurs). Accorde le verbe.</p></div>
      <div class="formula-box"><h3>❌ omdat : oubli de la fin</h3><p>Après <strong>omdat</strong>, le verbe part <strong>à la fin</strong> : <em>…omdat ik moe <strong>ben</strong></em>, pas <s>omdat ik ben moe</s>.</p></div>
    </div>
  </div>`;

  /* ---------------------- QUIZ ---------------------- */
  var questions = [
    { q: "Au passé composé (VTT), où se place le participe passé ?", opts: ["à la fin de la phrase", "juste après le sujet", "au début", "avant le sujet"], ans: 0, chapter: "grammatica", difficulty: "facile", exp: "Structure : hebben/zijn + … + participe à la FIN. Ex. : Ik heb een hotel geboekt.", simple: "Le néerlandais aime « repousser » le verbe principal tout à la fin. Le petit auxiliaire (heb/ben) reste près du sujet, le gros participe attend la fin." },
    { q: "Quel auxiliaire avec un verbe de déplacement (reizen, gaan…) ?", opts: ["zijn", "hebben", "worden", "kunnen"], ans: 0, chapter: "grammatica", difficulty: "facile", exp: "Les verbes de déplacement et de changement d'état prennent ZIJN : Ik ben naar Spanje gereisd.", simple: "Si tu BOUGES d'un endroit à un autre (aller, venir, voyager, partir), tu prends « zijn ». Pour presque tout le reste : « hebben »." },
    { q: "Règle « 't kofschip » : si le radical finit par une lettre de t-k-f-s-ch-p, le participe finit par…", opts: ["t", "d", "de", "en"], ans: 0, chapter: "grammatica", difficulty: "intermediaire", exp: "Finale dans 't kofschip → t (gewerkt, geboekt). Sinon → d (gereisd).", simple: "Astuce : retiens le mot magique « 't kofschip ». Si la dernière lettre du radical est dedans (t,k,f,s,ch,p) → participe en T. Sinon → en D." },
    { q: "Participe passé de « reizen » (voyager) ?", opts: ["gereisd", "gereizt", "gereizen", "reisde"], ans: 0, chapter: "grammatica", difficulty: "intermediaire", exp: "reizen : le son d'origine est « z » (hors 't kofschip) → participe en d : ge + reis + d = gereisd." },
    { q: "Dans « Ik moet thuis helpen », où est l'infinitif « helpen » ?", opts: ["à la fin (après le modal conjugué)", "juste après ik", "avant moet", "il n'y en a pas"], ans: 0, chapter: "grammatica", difficulty: "facile", exp: "Modal conjugué (moet) + … + infinitif à la fin (helpen).", simple: "Avec un verbe modal (devoir, pouvoir, vouloir…), le 2ᵉ verbe ne se conjugue pas et file à la fin, à l'infinitif." },
    { q: "Comment dire « il n'y a pas de petits pois » ?", opts: ["Er zijn geen erwten", "Er zijn niet erwten", "Er zijn te erwten", "Er zijn erwten niet"], ans: 0, chapter: "grammatica", difficulty: "intermediaire", exp: "« geen » nie un NOM (geen erwten). « niet » servirait pour un verbe ou un adjectif.", simple: "Devant un nom (du pain, des pois…), la négation est « geen ». Devant un verbe ou un adjectif (pas chaud), c'est « niet »." },
    { q: "« Het is te zout » signifie :", opts: ["c'est trop salé", "ce n'est pas salé", "c'est un peu salé", "c'est sucré"], ans: 0, chapter: "grammatica", difficulty: "facile", exp: "« te » + adjectif = « trop ». te zout (trop salé), te zoet (trop sucré), te koud (trop froid)." },
    { q: "Après « omdat », le verbe se place :", opts: ["à la fin de la subordonnée", "juste après omdat", "avant le sujet", "n'importe où"], ans: 0, chapter: "grammatica", difficulty: "intermediaire", exp: "omdat → verbe à la fin : …omdat ik moe ben. (Avec « want », ordre normal : …want ik ben moe.)", simple: "« omdat » envoie le verbe à la fin. Son cousin « want » (= car) garde l'ordre normal. Même sens, ordre différent." },
    { q: "« Il y a un tableau au mur » se dit :", opts: ["Er hangt een schilderij aan de muur", "Er staat een schilderij aan de muur", "Er ligt een schilderij aan de muur", "Er zit een schilderij aan de muur"], ans: 0, chapter: "grammatica", difficulty: "intermediaire", exp: "Un tableau est ACCROCHÉ → hangen. Au singulier : Er hangt…", simple: "Pour « il y a », on choisit le verbe selon la position : accroché = hangen, posé/debout = staan, à plat = liggen, assis = zitten." },
    { q: "Que veut dire la préposition « naast » ?", opts: ["à côté de", "en face de", "entre", "derrière"], ans: 0, chapter: "grammatica", difficulty: "facile", exp: "naast = à côté de. (tegenover = en face de, tussen = entre, achter = derrière)." },
    { q: "Au présent, « hij » (il) avec werken donne :", opts: ["hij werkt", "hij werk", "hij werken", "hij werkte"], ans: 0, chapter: "grammatica", difficulty: "facile", exp: "Présent : ik werk (radical), hij/zij/jij werk+t, wij/jullie/zij werken (infinitif)." },
    { q: "Participe passé irrégulier de « eten » (manger) ?", opts: ["gegeten", "geëet", "geet", "etende"], ans: 0, chapter: "grammatica", difficulty: "intermediaire", exp: "eten est irrégulier : gegeten (à apprendre par cœur)." },
    { q: "« de zolder », c'est :", opts: ["le grenier", "la cave", "la cuisine", "le toit"], ans: 0, chapter: "woning", difficulty: "facile", exp: "de zolder = le grenier. (de kelder = la cave)." },
    { q: "« de kelder », c'est :", opts: ["la cave", "le grenier", "la chambre", "l'escalier"], ans: 0, chapter: "woning", difficulty: "facile", exp: "de kelder = la cave." },
    { q: "« het dak », c'est :", opts: ["le toit", "la façade", "la porte", "la fenêtre"], ans: 0, chapter: "woning", difficulty: "facile", exp: "het dak = le toit. (de gevel = la façade, de voordeur = la porte d'entrée, het raam = la fenêtre)." },
    { q: "« de keuken », c'est :", opts: ["la cuisine", "la chambre", "la salle de bain", "le salon"], ans: 0, chapter: "woning", difficulty: "facile", exp: "de keuken = la cuisine. (de slaapkamer = la chambre, de badkamer = la salle de bain, de woonkamer = le salon)." },
    { q: "« de koelkast », c'est :", opts: ["le frigo", "le four", "l'évier", "la cuisinière"], ans: 0, chapter: "woning", difficulty: "intermediaire", exp: "de koelkast = le réfrigérateur. (de oven = le four, de gootsteen = l'évier, het fornuis = la cuisinière)." },
    { q: "« de trap », c'est :", opts: ["l'escalier", "le tapis", "le rideau", "le lit"], ans: 0, chapter: "woning", difficulty: "facile", exp: "de trap = l'escalier. (het tapijt = le tapis, het gordijn = le rideau, het bed = le lit)." },
    { q: "« het ontbijt », c'est :", opts: ["le petit-déjeuner", "le dîner", "le dessert", "le goûter"], ans: 0, chapter: "tafel", difficulty: "facile", exp: "het ontbijt = le petit-déjeuner. (het avondmaal = le repas du soir, het nagerecht = le dessert)." },
    { q: "Au restaurant, « de kelner » est :", opts: ["le serveur", "le client", "le cuisinier", "le menu"], ans: 0, chapter: "tafel", difficulty: "facile", exp: "de kelner (ou de ober) = le serveur. de spijskaart / het menu = la carte." },
    { q: "« L'addition, s'il vous plaît » se dit :", opts: ["Mag ik de rekening, alstublieft?", "Mag ik het menu?", "Hebt u gereserveerd?", "Gaat u zitten!"], ans: 0, chapter: "tafel", difficulty: "intermediaire", exp: "Mag ik de rekening, a.u.b.? (modal mogen). de rekening = l'addition." },
    { q: "« het voorgerecht », c'est :", opts: ["l'entrée", "le plat principal", "le dessert", "la boisson"], ans: 0, chapter: "tafel", difficulty: "intermediaire", exp: "het voorgerecht = l'entrée · het hoofdgerecht = le plat principal · het nagerecht = le dessert." },
    { q: "« de wortel », c'est :", opts: ["la carotte", "la tomate", "l'oignon", "le poireau"], ans: 0, chapter: "tafel", difficulty: "facile", exp: "de wortel = la carotte. (de tomaat = la tomate, de ui/ajuin = l'oignon, de prei = le poireau)." },
    { q: "Quel adjectif signifie « salé » ?", opts: ["zout", "zoet", "koud", "vers"], ans: 0, chapter: "tafel", difficulty: "facile", exp: "zout = salé · zoet = sucré · koud = froid · vers = frais." }
  ];

  /* ---------------------- FLASHCARDS ---------------------- */
  var flashcards = [
    { front: "Passé composé (VTT) : structure ?", back: "<strong>hebben / zijn</strong> (conjugué) + … + <strong>participe passé à la FIN</strong>. Ex. : Ik heb een hotel geboekt.", chapter: "grammatica" },
    { front: "Quand utilise-t-on « zijn » au passé composé ?", back: "Avec les verbes de <strong>déplacement</strong> (gaan, komen, reizen, vertrekken, terugkomen…) et de <strong>changement d'état</strong> (worden, blijven, zijn). Sinon → <strong>hebben</strong>.", chapter: "grammatica" },
    { front: "La règle « 't kofschip » ?", back: "Pour le participe régulier <strong>ge + radical + d/t</strong> : si le radical finit par une lettre de <strong>t-k-f-s-ch-p</strong> → <strong>t</strong> (gewerkt), sinon → <strong>d</strong> (gereisd).", chapter: "grammatica" },
    { front: "Les 4 verbes de position ?", back: "<strong>liggen</strong> (couché) · <strong>zitten</strong> (assis) · <strong>staan</strong> (debout/posé) · <strong>hangen</strong> (accroché). Ils traduisent aussi « il y a » (Er ligt/staat/hangt…).", chapter: "grammatica" },
    { front: "Les verbes modaux (et leur sens) ?", back: "<strong>moeten</strong> (devoir) · <strong>willen</strong> (vouloir) · <strong>kunnen</strong> (pouvoir) · <strong>mogen</strong> (avoir le droit). Le 2ᵉ verbe part à l'<strong>infinitif en fin de phrase</strong>.", chapter: "grammatica" },
    { front: "niet ou geen ?", back: "<strong>geen</strong> devant un <strong>nom</strong> (geen erwten = pas de pois) · <strong>niet</strong> pour un <strong>verbe/adjectif</strong> (niet warm = pas chaud). « <strong>te</strong> » + adj = « trop ».", chapter: "grammatica" },
    { front: "Omdat vs Want ?", back: "Tous deux = « parce que / car ». <strong>omdat</strong> → verbe à la <strong>fin</strong> (…omdat ik moe ben). <strong>want</strong> → ordre <strong>normal</strong> (…want ik ben moe).", chapter: "grammatica" },
    { front: "Prépositions de lieu (les 10) ?", back: "in (dans) · op (sur) · boven (au-dessus) · onder (en dessous) · aan (à/contre) · voor (devant) · achter (derrière) · naast (à côté de) · tussen (entre) · tegenover (en face de).", chapter: "grammatica" },
    { front: "« il y a un tableau au mur »", back: "<strong>Er hangt een schilderij aan de muur.</strong> (accroché → hangen ; singulier → hangt).", chapter: "grammatica" },
    { front: "3 participes irréguliers fréquents ?", back: "eten → <strong>gegeten</strong> · zwemmen → <strong>gezwommen</strong> · bezoeken → <strong>bezocht</strong> · vertrekken → <strong>vertrokken</strong> · gaan → <strong>gegaan</strong> (zijn).", chapter: "grammatica" },
    { front: "de zolder / de kelder ?", back: "de <strong>zolder</strong> = le grenier · de <strong>kelder</strong> = la cave.", chapter: "woning" },
    { front: "Les pièces principales ?", back: "de <strong>keuken</strong> (cuisine) · de <strong>slaapkamer</strong> (chambre) · de <strong>badkamer</strong> (salle de bain) · de <strong>woonkamer</strong> (salon) · de <strong>eetkamer</strong> (salle à manger) · het <strong>toilet</strong>.", chapter: "woning" },
    { front: "Extérieur : het dak / de gevel / de voordeur ?", back: "het <strong>dak</strong> = le toit · de <strong>gevel</strong> = la façade · de <strong>voordeur</strong> = la porte d'entrée · de <strong>schoorsteen</strong> = la cheminée · het <strong>raam</strong> = la fenêtre.", chapter: "woning" },
    { front: "Dans la cuisine : koelkast / oven / fornuis ?", back: "de <strong>koelkast</strong> = le frigo · de <strong>oven</strong> = le four · het <strong>fornuis</strong> = la cuisinière · de <strong>gootsteen</strong> = l'évier · de <strong>vork</strong> = la fourchette · het <strong>mes</strong> = le couteau.", chapter: "woning" },
    { front: "het bed / het tapijt / het gordijn / de trap ?", back: "het <strong>bed</strong> = le lit · het <strong>tapijt</strong> = le tapis · het <strong>gordijn</strong> = le rideau · de <strong>trap</strong> = l'escalier.", chapter: "woning" },
    { front: "Les repas en néerlandais ?", back: "het <strong>ontbijt</strong> (petit-déj) · het <strong>middagmaal</strong> (repas de midi) · het <strong>vieruurtje</strong> (goûter) · het <strong>avondmaal</strong> (repas du soir).", chapter: "tafel" },
    { front: "Voorgerecht / hoofdgerecht / nagerecht ?", back: "het <strong>voorgerecht</strong> = l'entrée · het <strong>hoofdgerecht</strong> = le plat principal · het <strong>nagerecht</strong> = le dessert.", chapter: "tafel" },
    { front: "Au restaurant : phrases clés ?", back: "Hebt u <strong>gereserveerd</strong>? (réservé ?) · Wat <strong>wenst</strong> u? (que désirez-vous ?) · Mag ik de <strong>rekening</strong>, a.u.b.? (l'addition svp).", chapter: "tafel" },
    { front: "Adjectifs de goût (chaud/froid/sucré/salé/frais) ?", back: "<strong>warm</strong> (chaud) · <strong>koud</strong> (froid) · <strong>zoet</strong> (sucré) · <strong>zout</strong> (salé) · <strong>vers</strong> (frais) · <strong>vet</strong> (gras). « te » + adj = trop.", chapter: "tafel" },
    { front: "Quelques légumes (groenten) ?", back: "de <strong>wortel</strong> (carotte) · de <strong>tomaat</strong> (tomate) · de <strong>ui/ajuin</strong> (oignon) · de <strong>prei</strong> (poireau) · de <strong>bloemkool</strong> (chou-fleur) · de <strong>erwt</strong> (petit pois).", chapter: "tafel" },
    { front: "Quelques fruits (fruit) ?", back: "de <strong>appel</strong> (pomme) · de <strong>peer</strong> (poire) · de <strong>banaan</strong> (banane) · de <strong>aardbei</strong> (fraise) · de <strong>kers</strong> (cerise) · de <strong>sinaasappel</strong> (orange).", chapter: "tafel" }
  ];

  /* =================== MON TEXTE D'EXAMEN (±150 mots) ===================
     Texte modèle à apprendre par cœur : vacances (VTT) + ménage (moeten) +
     maladies (de griep). Vocabulaire simple. Mots en gras = points notés. */
  var TEXT_HTML = `<div style="max-width:760px; margin:0 auto;">
    <div style="text-align:center; margin-bottom:1rem;">
      <h2 style="font-size:28px; font-weight:800; color:var(--color-nav); margin:0;">📝 Mon texte d'examen (±150 mots)</h2>
      <p style="color:var(--text-secondary); margin-top:6px;">À apprendre par cœur. Thèmes : les vacances (VTT) · le ménage · les maladies.</p>
    </div>

    <div class="synth-section">
      <h2>① De vakantie (les vacances — VTT)</h2>
      <div class="key-rule"><div class="formula-main" style="font-size:16px; line-height:1.95; text-align:left; font-weight:500;">
        Tijdens de zomervakantie <strong>ben</strong> ik naar Spanje <strong>gereisd</strong>. Mijn ouders <strong>hebben</strong> een hotel aan zee <strong>geboekt</strong>. We <strong>zijn</strong> 's morgens vroeg <strong>vertrokken</strong>. Het weer was mooi en warm. Ik <strong>heb</strong> veel foto's <strong>gemaakt</strong> en ik <strong>heb</strong> in de zee <strong>gezwommen</strong>. We <strong>hebben</strong> in een leuk restaurant <strong>gegeten</strong>. Ik <strong>heb</strong> ook nieuwe vrienden <strong>ontmoet</strong>. Het was een fantastische vakantie.
      </div></div>
    </div>

    <div class="synth-section">
      <h2>② Het huishouden (le ménage — moeten)</h2>
      <div class="key-rule"><div class="formula-main" style="font-size:16px; line-height:1.95; text-align:left; font-weight:500;">
        Thuis <strong>moet</strong> ik ook <strong>helpen</strong>. Ik <strong>moet</strong> mijn kamer <strong>opruimen</strong> en de tafel <strong>afruimen</strong>. Soms <strong>moet</strong> ik <strong>afwassen</strong> of <strong>stofzuigen</strong>. Mijn broer <strong>moet</strong> de hond <strong>uitlaten</strong>. Ik vind het niet altijd leuk, maar het is belangrijk.
      </div></div>
    </div>

    <div class="synth-section">
      <h2>③ Ziek zijn (les maladies — de griep)</h2>
      <div class="key-rule"><div class="formula-main" style="font-size:16px; line-height:1.95; text-align:left; font-weight:500;">
        Na de vakantie <strong>ben</strong> ik ziek <strong>geworden</strong>. Ik had <strong>de griep</strong>. Ik had <strong>koorts</strong> en ik moest veel <strong>hoesten</strong>. Ik had ook <strong>keelpijn</strong> en ik was heel <strong>moe</strong>. Ik <strong>ben</strong> in bed <strong>gebleven</strong> en ik <strong>heb</strong> medicijnen <strong>genomen</strong>. Gelukkig ben ik nu weer gezond en blij.
      </div></div>
    </div>

    <details class="fc-ex" style="margin-top:1rem;"><summary>🇫🇷 Voir la traduction française</summary>
    <div class="fc-ex-body" style="line-height:1.8;">
      <strong>① Les vacances :</strong> Pendant les vacances d'été, je suis allé en Espagne. Mes parents ont réservé un hôtel à la mer. Nous sommes partis tôt le matin. Le temps était beau et chaud. J'ai pris beaucoup de photos et j'ai nagé dans la mer. Nous avons mangé dans un restaurant sympa. J'ai aussi rencontré de nouveaux amis. C'étaient des vacances fantastiques.<br><br>
      <strong>② Le ménage :</strong> À la maison, je dois aussi aider. Je dois ranger ma chambre et débarrasser la table. Parfois je dois faire la vaisselle ou passer l'aspirateur. Mon frère doit sortir le chien. Je n'aime pas toujours ça, mais c'est important.<br><br>
      <strong>③ Être malade :</strong> Après les vacances, je suis tombé malade. J'avais la grippe. J'avais de la fièvre et je devais beaucoup tousser. J'avais aussi mal à la gorge et j'étais très fatigué. Je suis resté au lit et j'ai pris des médicaments. Heureusement, je vais de nouveau bien.
    </div></details>

    <div style="margin-top:1rem; background:var(--color-parabole-light); border:1px solid var(--color-parabole); border-radius:12px; padding:.9rem 1.1rem; font-size:14px; color:var(--text-primary);">
      💡 <strong>Ce qui est noté :</strong> le bon auxiliaire (<strong>ben</strong> = bouger / tomber malade · <strong>heb</strong> = le reste) + le participe <strong>à la fin</strong> (VTT) ; <strong>moeten + infinitif à la fin</strong> (ménage) ; le vocabulaire de la grippe (<strong>koorts, hoesten, keelpijn, moe</strong>).
    </div>
  </div>`;

  /* =================== MES 150 MOTS (vocabulaire du cours) ===================
     Les 150 mots viennent des feuilles de cours (De woning · Aan tafel! ·
     fruits & légumes), transcrites depuis le dossier « néerlendais ».
     Affichés en référence : recherche + export. */
  function nlEsc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  var NL_VOC = [
    {c:'🏘️ Logement & quartiers', nl:'de villa', fr:'la villa'}, {c:'🏘️ Logement & quartiers', nl:'het rijhuis', fr:'la maison mitoyenne'}, {c:'🏘️ Logement & quartiers', nl:'het flat', fr:'l\'appartement'}, {c:'🏘️ Logement & quartiers', nl:'de boerderij', fr:'la ferme'}, {c:'🏘️ Logement & quartiers', nl:'alleenstaand huis', fr:'la maison individuelle'}, {c:'🏘️ Logement & quartiers', nl:'het studio', fr:'le studio'}, {c:'🏘️ Logement & quartiers', nl:'het platteland', fr:'la campagne'}, {c:'🏘️ Logement & quartiers', nl:'de stad', fr:'la ville'}, {c:'🏘️ Logement & quartiers', nl:'de residentiële wijk', fr:'le quartier résidentiel'}, {c:'🏘️ Logement & quartiers', nl:'de bebouwde kom', fr:'l\'agglomération'}, {c:'🏘️ Logement & quartiers', nl:'de industriewijk', fr:'le quartier industriel'}, {c:'🏘️ Logement & quartiers', nl:'rustig', fr:'calme / tranquille'},
    {c:'🏠 Extérieur de la maison', nl:'het dak', fr:'le toit'}, {c:'🏠 Extérieur de la maison', nl:'de schoorsteen', fr:'la cheminée'}, {c:'🏠 Extérieur de la maison', nl:'de dakgoot', fr:'la gouttière'}, {c:'🏠 Extérieur de la maison', nl:'het raam', fr:'la fenêtre'}, {c:'🏠 Extérieur de la maison', nl:'het hek', fr:'la clôture / grille'}, {c:'🏠 Extérieur de la maison', nl:'de gevel', fr:'la façade'}, {c:'🏠 Extérieur de la maison', nl:'de haag', fr:'la haie'}, {c:'🏠 Extérieur de la maison', nl:'de garage', fr:'le garage'}, {c:'🏠 Extérieur de la maison', nl:'de voordeur', fr:'la porte d\'entrée'}, {c:'🏠 Extérieur de la maison', nl:'het pad', fr:'l\'allée / le chemin'}, {c:'🏠 Extérieur de la maison', nl:'het luik', fr:'le volet'}, {c:'🏠 Extérieur de la maison', nl:'het gras', fr:'la pelouse'},
    {c:'🚪 Pièces & étages', nl:'de zolder', fr:'le grenier'}, {c:'🚪 Pièces & étages', nl:'de slaapkamer', fr:'la chambre'}, {c:'🚪 Pièces & étages', nl:'de badkamer', fr:'la salle de bain'}, {c:'🚪 Pièces & étages', nl:'het toilet', fr:'les toilettes'}, {c:'🚪 Pièces & étages', nl:'de trap', fr:'l\'escalier'}, {c:'🚪 Pièces & étages', nl:'de woonkamer', fr:'le salon'}, {c:'🚪 Pièces & étages', nl:'de keuken', fr:'la cuisine'}, {c:'🚪 Pièces & étages', nl:'de eetkamer', fr:'la salle à manger'}, {c:'🚪 Pièces & étages', nl:'de kelder', fr:'la cave'}, {c:'🚪 Pièces & étages', nl:'de ingang', fr:'l\'entrée'}, {c:'🚪 Pièces & étages', nl:'de verdieping', fr:'l\'étage'},
    {c:'🍳 La cuisine', nl:'het bord', fr:'l\'assiette'}, {c:'🍳 La cuisine', nl:'het fornuis', fr:'la cuisinière'}, {c:'🍳 La cuisine', nl:'de koelkast', fr:'le frigo'}, {c:'🍳 La cuisine', nl:'het koffiezetapparaat', fr:'la machine à café'}, {c:'🍳 La cuisine', nl:'de kookpan', fr:'la casserole'}, {c:'🍳 La cuisine', nl:'de kookplaat', fr:'la plaque de cuisson'}, {c:'🍳 La cuisine', nl:'het kopje', fr:'la tasse'}, {c:'🍳 La cuisine', nl:'de lade', fr:'le tiroir'}, {c:'🍳 La cuisine', nl:'de lepel', fr:'la cuillère'}, {c:'🍳 La cuisine', nl:'het mes', fr:'le couteau'}, {c:'🍳 La cuisine', nl:'de oven', fr:'le four'}, {c:'🍳 La cuisine', nl:'de gootsteen', fr:'l\'évier'}, {c:'🍳 La cuisine', nl:'de braadpan', fr:'la poêle'}, {c:'🍳 La cuisine', nl:'de vork', fr:'la fourchette'}, {c:'🍳 La cuisine', nl:'het glas', fr:'le verre'}, {c:'🍳 La cuisine', nl:'de vuilnisbak', fr:'la poubelle'}, {c:'🍳 La cuisine', nl:'de waterkraan', fr:'le robinet'},
    {c:'🛁 La salle de bain', nl:'de douche', fr:'la douche'}, {c:'🛁 La salle de bain', nl:'de badkuip', fr:'la baignoire'}, {c:'🛁 La salle de bain', nl:'de wastafel', fr:'le lavabo'}, {c:'🛁 La salle de bain', nl:'de spiegel', fr:'le miroir'}, {c:'🛁 La salle de bain', nl:'de handdoek', fr:'la serviette'}, {c:'🛁 La salle de bain', nl:'de tandenborstel', fr:'la brosse à dents'}, {c:'🛁 La salle de bain', nl:'de tandpasta', fr:'le dentifrice'}, {c:'🛁 La salle de bain', nl:'de kam', fr:'le peigne'}, {c:'🛁 La salle de bain', nl:'de haardroger', fr:'le sèche-cheveux'}, {c:'🛁 La salle de bain', nl:'de zeep', fr:'le savon'},
    {c:'🛋️ Le salon', nl:'de sofa', fr:'le canapé'}, {c:'🛋️ Le salon', nl:'het tapijt', fr:'le tapis'}, {c:'🛋️ Le salon', nl:'het televisietoestel', fr:'la télévision'}, {c:'🛋️ Le salon', nl:'het schilderij', fr:'le tableau'}, {c:'🛋️ Le salon', nl:'de lamp', fr:'la lampe'}, {c:'🛋️ Le salon', nl:'het kussen', fr:'le coussin'}, {c:'🛋️ Le salon', nl:'de salontafel', fr:'la table basse'}, {c:'🛋️ Le salon', nl:'het buffet', fr:'le buffet'}, {c:'🛋️ Le salon', nl:'de plant', fr:'la plante'}, {c:'🛋️ Le salon', nl:'de vaas', fr:'le vase'}, {c:'🛋️ Le salon', nl:'de afstandbediening', fr:'la télécommande'}, {c:'🛋️ Le salon', nl:'het tijdschrift', fr:'le magazine'}, {c:'🛋️ Le salon', nl:'het terras', fr:'la terrasse'}, {c:'🛋️ Le salon', nl:'het gordijn', fr:'le rideau'},
    {c:'🛏️ La chambre', nl:'het bed', fr:'le lit'}, {c:'🛏️ La chambre', nl:'de nachttafel', fr:'la table de nuit'}, {c:'🛏️ La chambre', nl:'de kleerkast', fr:'l\'armoire'}, {c:'🛏️ La chambre', nl:'het bureau', fr:'le bureau'}, {c:'🛏️ La chambre', nl:'het hoofdkussen', fr:'l\'oreiller'},
    {c:'📦 Quantités & contenants', nl:'een kopje koffie', fr:'une tasse de café'}, {c:'📦 Quantités & contenants', nl:'een glas wijn', fr:'un verre de vin'}, {c:'📦 Quantités & contenants', nl:'een fles wijn', fr:'une bouteille de vin'}, {c:'📦 Quantités & contenants', nl:'een reep chocolade', fr:'une tablette de chocolat'}, {c:'📦 Quantités & contenants', nl:'een stuk gebak', fr:'un morceau de gâteau'}, {c:'📦 Quantités & contenants', nl:'een pot jam', fr:'un pot de confiture'}, {c:'📦 Quantités & contenants', nl:'een snede kaas', fr:'une tranche de fromage'}, {c:'📦 Quantités & contenants', nl:'een blik soep', fr:'une boîte de soupe'}, {c:'📦 Quantités & contenants', nl:'een pak suiker', fr:'un paquet de sucre'},
    {c:'🍽️ Repas & restaurant', nl:'het ontbijt', fr:'le petit-déjeuner'}, {c:'🍽️ Repas & restaurant', nl:'het middagmaal', fr:'le repas de midi'}, {c:'🍽️ Repas & restaurant', nl:'het avondmaal', fr:'le repas du soir'}, {c:'🍽️ Repas & restaurant', nl:'het voorgerecht', fr:'l\'entrée'}, {c:'🍽️ Repas & restaurant', nl:'het hoofdgerecht', fr:'le plat principal'}, {c:'🍽️ Repas & restaurant', nl:'het nagerecht', fr:'le dessert'}, {c:'🍽️ Repas & restaurant', nl:'de kelner', fr:'le serveur'}, {c:'🍽️ Repas & restaurant', nl:'de rekening', fr:'l\'addition'}, {c:'🍽️ Repas & restaurant', nl:'de spijskaart', fr:'la carte (menu)'},
    {c:'🥐 Petit-déjeuner & nourriture', nl:'de jam', fr:'la confiture'}, {c:'🥐 Petit-déjeuner & nourriture', nl:'de ham', fr:'le jambon'}, {c:'🥐 Petit-déjeuner & nourriture', nl:'de kaas', fr:'le fromage'}, {c:'🥐 Petit-déjeuner & nourriture', nl:'de melk', fr:'le lait'}, {c:'🥐 Petit-déjeuner & nourriture', nl:'de chocopasta', fr:'la pâte choco'}, {c:'🥐 Petit-déjeuner & nourriture', nl:'de pindakaas', fr:'le beurre de cacahuète'}, {c:'🥐 Petit-déjeuner & nourriture', nl:'de chocolademelk', fr:'le lait chocolaté'}, {c:'🥐 Petit-déjeuner & nourriture', nl:'het fruitsap', fr:'le jus de fruit'}, {c:'🥐 Petit-déjeuner & nourriture', nl:'het sinaasappelsap', fr:'le jus d\'orange'}, {c:'🥐 Petit-déjeuner & nourriture', nl:'de suiker', fr:'le sucre'}, {c:'🥐 Petit-déjeuner & nourriture', nl:'de boterham', fr:'la tartine'}, {c:'🥐 Petit-déjeuner & nourriture', nl:'de broodjes', fr:'les petits pains'}, {c:'🥐 Petit-déjeuner & nourriture', nl:'de cornflakes', fr:'les céréales'}, {c:'🥐 Petit-déjeuner & nourriture', nl:'de koffie', fr:'le café'}, {c:'🥐 Petit-déjeuner & nourriture', nl:'de thee', fr:'le thé'},
    {c:'🍎 Fruits', nl:'de appel', fr:'la pomme'}, {c:'🍎 Fruits', nl:'de peer', fr:'la poire'}, {c:'🍎 Fruits', nl:'de citroen', fr:'le citron'}, {c:'🍎 Fruits', nl:'de banaan', fr:'la banane'}, {c:'🍎 Fruits', nl:'de kers', fr:'la cerise'}, {c:'🍎 Fruits', nl:'de abrikoos', fr:'l\'abricot'}, {c:'🍎 Fruits', nl:'de aardbei', fr:'la fraise'}, {c:'🍎 Fruits', nl:'de druiven', fr:'les raisins'}, {c:'🍎 Fruits', nl:'de meloen', fr:'le melon'}, {c:'🍎 Fruits', nl:'de ananas', fr:'l\'ananas'}, {c:'🍎 Fruits', nl:'de perzik', fr:'la pêche'}, {c:'🍎 Fruits', nl:'de pruim', fr:'la prune'}, {c:'🍎 Fruits', nl:'de framboos', fr:'la framboise'}, {c:'🍎 Fruits', nl:'de watermeloen', fr:'la pastèque'}, {c:'🍎 Fruits', nl:'de sinaasappel', fr:'l\'orange'}, {c:'🍎 Fruits', nl:'de bosbessen', fr:'les myrtilles'},
    {c:'🥕 Légumes', nl:'de wortel', fr:'la carotte'}, {c:'🥕 Légumes', nl:'de tomaat', fr:'la tomate'}, {c:'🥕 Légumes', nl:'de ui', fr:'l\'oignon'}, {c:'🥕 Légumes', nl:'de prei', fr:'le poireau'}, {c:'🥕 Légumes', nl:'de bloemkool', fr:'le chou-fleur'}, {c:'🥕 Légumes', nl:'de selder', fr:'le céleri'}, {c:'🥕 Légumes', nl:'de spinazie', fr:'les épinards'}, {c:'🥕 Légumes', nl:'de komkommer', fr:'le concombre'}, {c:'🥕 Légumes', nl:'de champignon', fr:'le champignon'}, {c:'🥕 Légumes', nl:'de mais', fr:'le maïs'}, {c:'🥕 Légumes', nl:'de asperge', fr:'l\'asperge'}, {c:'🥕 Légumes', nl:'het witloof', fr:'le chicon / endive'}, {c:'🥕 Légumes', nl:'de aubergine', fr:'l\'aubergine'}, {c:'🥕 Légumes', nl:'de pompoen', fr:'la citrouille'}, {c:'🥕 Légumes', nl:'de peterselie', fr:'le persil'}, {c:'🥕 Légumes', nl:'de look', fr:'l\'ail'}, {c:'🥕 Légumes', nl:'de erwten', fr:'les petits pois'}, {c:'🥕 Légumes', nl:'de artisjok', fr:'l\'artichaut'}, {c:'🥕 Légumes', nl:'de radijs', fr:'le radis'}, {c:'🥕 Légumes', nl:'de sla', fr:'la salade'}
  ];
  function nlVocRender() {
    var host = document.getElementById('nl-voc-list'); if (!host) return;
    var s = document.getElementById('nl-voc-search'); var q = s ? (s.value || '').trim().toLowerCase() : '';
    var order = [], groups = {}, shown = 0;
    NL_VOC.forEach(function (w) {
      if (q && w.nl.toLowerCase().indexOf(q) < 0 && w.fr.toLowerCase().indexOf(q) < 0) return;
      if (!groups[w.c]) { groups[w.c] = []; order.push(w.c); }
      groups[w.c].push(w); shown++;
    });
    host.innerHTML = order.length ? order.map(function (c) {
      return '<h3 class="nl-voc-cat">' + nlEsc(c) + '</h3><div class="nl-voc-grid">' + groups[c].map(function (w) {
        return '<div class="nl-voc-item"><span class="nl-voc-nl">' + nlEsc(w.nl) + '</span><span class="nl-voc-fr">' + nlEsc(w.fr) + '</span></div>';
      }).join('') + '</div>';
    }).join('') : '<p style="color:var(--text-secondary); text-align:center; padding:1rem;">Aucun mot trouvé.</p>';
    var cnt = document.getElementById('nl-voc-count'); if (cnt) cnt.textContent = q ? (shown + ' résultat' + (shown > 1 ? 's' : '')) : (NL_VOC.length + ' mots du cours');
  }
  window.nlVocFilter = nlVocRender;
  window.nlVocExport = function () {
    var txt = NL_VOC.map(function (w, i) { return (i + 1) + '. ' + w.nl + ' = ' + w.fr; }).join('\n');
    try { var blob = new Blob([txt], { type: 'text/plain' }); var url = URL.createObjectURL(blob); var a = document.createElement('a'); a.href = url; a.download = 'mes-150-mots-nederlands.txt'; document.body.appendChild(a); a.click(); a.remove(); setTimeout(function () { URL.revokeObjectURL(url); }, 1000); } catch (_) {}
    try { if (navigator.clipboard) navigator.clipboard.writeText(txt); } catch (_) {}
    if (typeof showToast === 'function') showToast('📄 150 mots exportés (fichier + copiés)', 'var(--color-parabole)');
  };
  // « Mes 150 mots » est le 2ᵉ onglet bonus → extra2.
  window.onShowExtraTab = function (id) { if (window.currentSubject === 'neerlandais' && id === 'extra2') nlVocRender(); };

  var VOC_HTML = `<div style="max-width:840px; margin:0 auto;">
    <style>
      .nl-voc-cat{font-size:16px;color:var(--color-nav);margin:1.3rem 0 .5rem;border-bottom:1px solid var(--border-subtle);padding-bottom:5px;}
      .nl-voc-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:6px;}
      .nl-voc-item{display:flex;justify-content:space-between;gap:8px;align-items:baseline;background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:8px;padding:7px 11px;font-size:14px;}
      .nl-voc-nl{font-weight:700;color:var(--color-nav);}
      .nl-voc-fr{color:var(--text-secondary);text-align:right;}
    </style>
    <div style="text-align:center; margin-bottom:1rem;">
      <h2 style="font-size:28px; font-weight:800; color:var(--color-nav); margin:0;">📚 Mes 150 mots</h2>
      <p style="color:var(--text-secondary); margin-top:6px;">Le vocabulaire de tes feuilles de cours (De woning · Aan tafel! · fruits &amp; légumes) — <span id="nl-voc-count">150 mots du cours</span>.</p>
    </div>
    <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:.6rem;">
      <input id="nl-voc-search" type="text" placeholder="🔍 Chercher un mot (NL ou FR)…" oninput="nlVocFilter()" style="flex:1 1 220px; padding:10px 14px; border-radius:10px; border:1px solid var(--border-subtle); background:var(--bg-main); color:var(--text-primary); font-size:15px;">
      <button type="button" onclick="nlVocExport()" style="padding:10px 16px; border-radius:10px; border:1px solid var(--color-parabole); background:transparent; color:var(--color-parabole); font-weight:600; cursor:pointer;">📄 Exporter</button>
    </div>
    <div id="nl-voc-list"></div>
  </div>`;

  window.registerSubject('neerlandais', {
    subtitle: 'Néerlandais (4N2) — grammaire, De woning & Aan tafel! · examen juin 2026',
    content: {
      sections: sections,
      questions: questions,
      flashcards: flashcards,
      demos: {},
      navLabels: { formules: '📌 Repères', exercices: '🎯 Exercices' },
      extraTabs: [{ label: '📝 Mon texte', html: TEXT_HTML }, { label: '📚 Mes 150 mots', html: VOC_HTML }],
      chapOrder: ['grammatica', 'woning', 'tafel'],
      chapLabels: { grammatica: 'Grammaire', woning: 'De woning (maison)', tafel: 'Aan tafel! (à table)' }
    }
  });
})();
