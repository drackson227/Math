/* GR2 Study — Contenu ANGLAIS (4ème)
   Unit 7 "Kia Ora" (Nouvelle-Zélande) + Irlande : superstitions, school rules.
   Grammaire : present perfect simple vs continuous · modal auxiliaries.
   S'enregistre auprès de subjects.js via window.registerSubject. */
(function () {
  'use strict';
  if (typeof window.registerSubject !== 'function') return;

  /* Fiches cliquables (drapeaux des pays anglophones) */
  window.IMG_INFO = window.IMG_INFO || {};
  Object.assign(window.IMG_INFO, {
    "flag_uk.png": {
      title: "Royaume-Uni (UK)", sub: "United Kingdom · capitale Londres",
      cours: "<p>Le <strong>Royaume-Uni</strong> regroupe l'<strong>Angleterre</strong>, l'<strong>Écosse</strong>, le <strong>Pays de Galles</strong> et l'<strong>Irlande du Nord</strong>. Capitale : <strong>Londres</strong>. C'est le berceau de la langue anglaise.</p>",
      exam: "<ul><li>Drapeau = l'<strong>Union Jack</strong>.</li><li>4 nations · capitale <strong>Londres</strong>.</li></ul>",
      anecdote: "Le drapeau s'appelle l'<strong>Union Jack</strong> : il superpose la croix de Saint-Georges (Angleterre), de Saint-André (Écosse) et de Saint-Patrick (Irlande)."
    },
    "flag_nz.png": {
      title: "New Zealand (Nouvelle-Zélande)", sub: "Aotearoa · Unit 7 « Kia Ora »",
      cours: "<p>La <strong>Nouvelle-Zélande</strong> est un pays anglophone du <strong>Pacifique</strong>, formé de deux grandes îles. Le peuple autochtone est le peuple <strong>maori</strong> ; « <strong>Kia Ora</strong> » = bonjour en maori.</p>",
      exam: "<ul><li>« <strong>Kia Ora</strong> » = hello (maori).</li><li>Pays de l'<strong>Unit 7</strong> · capitale Wellington.</li></ul>",
      anecdote: "Son nom maori est <strong>Aotearoa</strong> (« le pays du long nuage blanc »). Les All Blacks y exécutent le <strong>haka</strong>, une danse maori, avant chaque match de rugby !"
    },
    "flag_ireland.png": {
      title: "Ireland (Irlande)", sub: "Éire · capitale Dublin",
      cours: "<p>L'<strong>Irlande</strong> est une île à l'ouest du Royaume-Uni. Pays anglophone (on y parle aussi l'<strong>irlandais</strong>). Capitale : <strong>Dublin</strong>. Étudiée dans « Ireland and TIC ».</p>",
      exam: "<ul><li>Drapeau <strong>vert-blanc-orange</strong> (vert = catholiques, orange = protestants, blanc = la paix).</li><li>Capitale : <strong>Dublin</strong>.</li></ul>",
      anecdote: "Son symbole est le <strong>trèfle</strong> (shamrock) à 3 feuilles. Sa fête, la <strong>Saint-Patrick</strong> (17 mars), est célèbre dans le monde entier — tout en vert !"
    }
  });
  window.INFO_THEME = window.INFO_THEME || {};
  Object.assign(window.INFO_THEME, { "flag_uk.png": "eng", "flag_nz.png": "eng", "flag_ireland.png": "eng" });
  window.TERM_MAP = window.TERM_MAP || {};
  Object.assign(window.TERM_MAP, {
    "Royaume-Uni": "flag_uk.png", "Union Jack": "flag_uk.png",
    "New Zealand": "flag_nz.png", "Nouvelle-Zélande": "flag_nz.png", "Kia Ora": "flag_nz.png", "maori": "flag_nz.png",
    "Ireland": "flag_ireland.png", "Irlande": "flag_ireland.png"
  });

  var sections = {};

  /* ---------------------- SYNTHÈSE (cours) ---------------------- */
  sections.synthese = `<div id="synthese" class="section active">
    <div style="text-align:center; margin-bottom:1.5rem;">
      <h2 style="font-size:30px; font-weight:800; color:var(--color-nav); margin:0;">🇬🇧 Anglais — 4ᵉ</h2>
      <p style="color:var(--text-secondary); margin-top:6px;">Unit 7 « Kia Ora » · present perfect · past simple &amp; perfect · future · modals · superstitions &amp; school rules</p>
    </div>

    <div class="synth-section">
      <h2>Grammar 1 — Present perfect : simple vs continuous</h2>
      <p>Les deux parlent d'une action liée au <strong>présent</strong>, mais l'idée diffère :</p>
      <div class="key-rule"><div class="formula-main" style="font-size:17px;">Simple : have/has + participe passé<br>Continuous : have/has + been + V-ing</div></div>
      <ul style="line-height:1.9;">
        <li><strong>Present perfect simple</strong> → un <strong>résultat</strong>, une action <strong>terminée</strong>, une <strong>quantité</strong> (how many). <br><em>I <strong>have written</strong> three emails.</em> (résultat : 3 mails finis)</li>
        <li><strong>Present perfect continuous</strong> → la <strong>durée</strong>, une action qui <strong>continue</strong> ou vient de s'arrêter (how long). <br><em>I <strong>have been writing</strong> emails all morning.</em> (insiste sur la durée)</li>
      </ul>
      <p><strong>Mots-clés :</strong> <strong>for</strong> (durée) · <strong>since</strong> (point de départ) · already, yet, just, ever, never · <strong>how long</strong> (→ continuous) · <strong>how many</strong> (→ simple).</p>
    </div>

    <div class="synth-section">
      <h2>Grammar 2 — Modal auxiliaries (auxiliaires de mode)</h2>
      <p>Un <strong>modal</strong> se met devant un verbe à la <strong>base verbale</strong> (pas de « to », pas de « -s » à la 3ᵉ pers.) : <em>She <strong>can swim</strong></em>, <em>He <strong>must go</strong></em>.</p>
      <ul style="line-height:1.9;">
        <li><strong>can / could</strong> : capacité, permission, possibilité. <em>I can swim.</em></li>
        <li><strong>may / might</strong> : permission, possibilité (might = moins sûr). <em>It might rain.</em></li>
        <li><strong>must</strong> : obligation forte / certitude. <strong>mustn't</strong> = interdiction. <em>You must stop. / You mustn't smoke.</em></li>
        <li><strong>have to</strong> : obligation (extérieure). <strong>don't have to</strong> = pas obligé. <em>I have to wear a uniform.</em></li>
        <li><strong>should / ought to</strong> : conseil. <em>You should sleep more.</em></li>
      </ul>
    </div>

    <div class="synth-section">
      <h2>Grammar 3 — Past simple (le prétérit)</h2>
      <p>On l'utilise pour une action <strong>terminée</strong> à un <strong>moment précis du passé</strong> (yesterday, last week, in 2020, two days ago).</p>
      <div class="key-rule"><div class="formula-main" style="font-size:16px;">+ : V-ed (réguliers) / V2 (irréguliers)<br>− : didn't + base verbale<br>? : Did + sujet + base verbale</div></div>
      <ul style="line-height:1.9;">
        <li><strong>Réguliers</strong> : verbe + <strong>-ed</strong>. <em>work → worked, play → played, watch → watched.</em></li>
        <li><strong>Irréguliers</strong> (à apprendre par cœur) : go → <strong>went</strong>, see → <strong>saw</strong>, eat → <strong>ate</strong>, take → <strong>took</strong>, have → <strong>had</strong>, give → <strong>gave</strong>, find → <strong>found</strong>, write → <strong>wrote</strong>, drink → <strong>drank</strong>.</li>
        <li><strong>Négatif</strong> : <em>I <strong>didn't go</strong></em> (jamais <s>didn't went</s> : la base verbale après did).</li>
        <li><strong>Question</strong> : <em><strong>Did</strong> you <strong>see</strong> it?</em> (base verbale, pas de -ed).</li>
      </ul>
      <p><strong>Mots-clés :</strong> yesterday · last (night/week/year) · … ago · in 1990 · when.</p>
    </div>

    <div class="synth-section">
      <h2>Grammar 4 — Past perfect (le plus-que-parfait)</h2>
      <p>Il décrit une action <strong>encore plus ancienne</strong> qu'une autre action passée : le passé <strong>du</strong> passé.</p>
      <div class="key-rule"><div class="formula-main" style="font-size:17px;">had + participe passé (V-ed / V3)</div></div>
      <ul style="line-height:1.9;">
        <li>Même forme à <strong>toutes les personnes</strong> : <em>I/you/he <strong>had</strong> finished</em>.</li>
        <li>Action <strong>1</strong> (la plus ancienne) → <strong>past perfect</strong> · action <strong>2</strong> (plus récente) → <strong>past simple</strong>.<br><em>When I <strong>arrived</strong> (2), the train <strong>had</strong> already <strong>left</strong> (1).</em> → le train est parti AVANT mon arrivée.</li>
        <li><strong>Négatif</strong> : <em>hadn't + V3</em> (<em>I hadn't seen it before</em>).</li>
      </ul>
      <p><strong>Mots-clés :</strong> already, just, never, before, after, by the time, when.</p>
    </div>

    <div class="synth-section">
      <h2>Grammar 5 — Talking about the future (parler du futur)</h2>
      <p>Trois façons d'exprimer le futur, selon l'intention :</p>
      <ul style="line-height:1.9;">
        <li><strong>be going to</strong> + base verbale → une <strong>intention</strong>, un <strong>projet décidé</strong>, ou une prédiction avec <strong>preuve</strong>. <em>I'<strong>m going to</strong> study tonight. / Look at those clouds — it'<strong>s going to</strong> rain.</em></li>
        <li><strong>will / won't</strong> + base verbale → une <strong>prédiction sans preuve</strong>, une décision <strong>spontanée</strong>, une promesse. <em>I think it <strong>will</strong> rain. / OK, I'<strong>ll</strong> help you.</em></li>
        <li><strong>present continuous</strong> (be + V-ing) → un <strong>rendez-vous fixé</strong>, noté dans l'agenda. <em>I'<strong>m meeting</strong> Anna at 5 p.m.</em></li>
      </ul>
    </div>

    <div class="synth-section">
      <h2>Vocabulary 1 — Superstitions</h2>
      <ul style="line-height:1.9;">
        <li><strong>Bad luck</strong> (malchance) : a black cat, a broken mirror (7 years bad luck), walking under a ladder, <strong>Friday the 13th</strong>, opening an umbrella indoors.</li>
        <li><strong>Good luck</strong> (chance) : a four-leaf clover, a horseshoe, <strong>touch wood</strong>, crossing your fingers.</li>
        <li><em>lucky</em> / <em>unlucky</em> · <em>a superstition</em> · <em>to be superstitious</em>.</li>
      </ul>
    </div>

    <div class="synth-section">
      <h2>Vocabulary 2 — School rules</h2>
      <p>On exprime les règles avec des <strong>modals</strong> :</p>
      <ul style="line-height:1.9;">
        <li>We <strong>must</strong> wear a uniform. (obligation)</li>
        <li>We <strong>mustn't</strong> use our phones in class. (interdiction)</li>
        <li>We <strong>have to</strong> be on time. / We <strong>don't have to</strong> bring lunch. (pas obligé)</li>
        <li>We <strong>are (not) allowed to</strong> eat in the classroom. (être (in)autorisé)</li>
      </ul>
    </div>

    <div class="synth-section">
      <h2>Culture — English-speaking countries 🌍</h2>
      <p style="color:var(--text-secondary); margin-bottom:0.6rem;">Clique sur un drapeau pour sa fiche (cours + examen + anecdote).</p>
      <div class="hfig-row">
        <figure class="hfig" style="max-width:130px"><img src="flag_uk.png" alt="Royaume-Uni" loading="lazy"><figcaption>Royaume-Uni (UK)</figcaption></figure>
        <figure class="hfig" style="max-width:130px"><img src="flag_nz.png" alt="New Zealand" loading="lazy"><figcaption>New Zealand</figcaption></figure>
        <figure class="hfig" style="max-width:130px"><img src="flag_ireland.png" alt="Ireland" loading="lazy"><figcaption>Ireland</figcaption></figure>
      </div>
      <p><strong>New Zealand</strong> (Nouvelle-Zélande) : pays anglophone du Pacifique. « <strong>Kia Ora</strong> » = « bonjour » en <strong>maori</strong> (langue du peuple maori). <strong>Ireland</strong> (Irlande) : autre pays anglophone étudié (« Ireland and TIC »).</p>
    </div>
  </div>`;

  /* ---------------------- NOTIONS (grammar boxes) ---------------------- */
  sections.formules = `<div id="formules" class="section">
    <h2 style="font-size:30px; font-weight:800; color:var(--color-nav); margin-bottom:1rem;">📌 Grammar &amp; vocab</h2>
    <div class="formula-grid">
      <div>
        <div class="formula-box"><h3>Present perfect SIMPLE</h3><div class="formula-main" style="font-size:17px;">have / has + V-ed (ou V3)</div><p class="note">Résultat / action terminée / quantité (how many). <em>I have seen it.</em></p></div>
        <div class="formula-box"><h3>Present perfect CONTINUOUS</h3><div class="formula-main" style="font-size:17px;">have / has + been + V-ing</div><p class="note">Durée / action qui continue (how long). <em>I have been waiting.</em></p></div>
        <div class="formula-box"><h3>for vs since</h3><p style="line-height:1.9; margin:0;"><strong>for</strong> + durée (for 2 hours) · <strong>since</strong> + point de départ (since 2020 / since Monday).</p></div>
      </div>
      <div>
        <div class="formula-box"><h3>Modals — la règle</h3><div class="formula-main" style="font-size:16px;">modal + base verbale</div><p class="note">Pas de « to », pas de « -s ». <em>She can go</em> (≠ <s>cans / to go</s>).</p></div>
        <div class="formula-box"><h3>Modals — les sens</h3><p style="line-height:1.9; margin:0;">can/could (capacité) · may/might (possibilité) · <strong>must</strong> (obligation/certitude) · <strong>have to</strong> (obligation) · should (conseil).</p></div>
        <div class="formula-box"><h3>mustn't vs don't have to</h3><p style="line-height:1.9; margin:0;"><strong>mustn't</strong> = interdit (ne pas faire) · <strong>don't have to</strong> = pas obligé (mais tu peux).</p></div>
      </div>
    </div>

    <h2 style="font-size:24px; font-weight:700; color:var(--color-nav); margin:1.6rem 0 1rem;">⏳ Past &amp; future</h2>
    <div class="formula-grid">
      <div>
        <div class="formula-box"><h3>Past simple (prétérit)</h3><div class="formula-main" style="font-size:16px;">V-ed / V2 · didn't + base · Did…?</div><p class="note">Action finie, moment précis. <em>I went, I didn't go, Did you go?</em></p></div>
        <div class="formula-box"><h3>Irréguliers fréquents</h3><p style="line-height:1.9; margin:0;">go→went · see→saw · eat→ate · take→took · have→had · give→gave · find→found · write→wrote.</p></div>
      </div>
      <div>
        <div class="formula-box"><h3>Past perfect (plus-que-parfait)</h3><div class="formula-main" style="font-size:17px;">had + V-ed (ou V3)</div><p class="note">Le passé DU passé. <em>The train had left when I arrived.</em></p></div>
        <div class="formula-box"><h3>Future (3 façons)</h3><p style="line-height:1.9; margin:0;"><strong>be going to</strong> (intention/projet) · <strong>will</strong> (prédiction, décision spontanée) · <strong>present continuous</strong> (rendez-vous fixé).</p></div>
      </div>
    </div>
  </div>`;

  /* ---------------------- MÉTHODE ---------------------- */
  sections.methodes = `<div id="methodes" class="section">
    <h2 style="font-size:30px; font-weight:800; color:var(--color-nav); margin-bottom:1rem;">📝 Méthode</h2>

    <div class="synth-section">
      <h2>Choisir simple ou continuous ?</h2>
      <div class="step-item"><div class="step-num">1</div><div class="step-text">La phrase insiste sur la <strong>durée</strong> / « depuis combien de temps » ? → <strong>continuous</strong> (have been + -ing).</div></div>
      <div class="step-item"><div class="step-num">2</div><div class="step-text">La phrase insiste sur le <strong>résultat</strong> / une <strong>quantité</strong> (how many) ? → <strong>simple</strong> (have + V3).</div></div>
      <div class="step-item"><div class="step-num">3</div><div class="step-text">Verbes d'état (know, be, have…) → toujours <strong>simple</strong>.</div></div>
    </div>

    <div class="synth-section">
      <h2>Past simple ou past perfect ?</h2>
      <div class="step-item"><div class="step-num">1</div><div class="step-text">Il y a <strong>deux actions passées</strong> ? Repère laquelle s'est passée <strong>en premier</strong>.</div></div>
      <div class="step-item"><div class="step-num">2</div><div class="step-text">L'action la <strong>plus ancienne</strong> → <strong>past perfect</strong> (had + V3).</div></div>
      <div class="step-item"><div class="step-num">3</div><div class="step-text">L'action la <strong>plus récente</strong> → <strong>past simple</strong>. <em>When she <strong>called</strong> (2), I <strong>had</strong> already <strong>left</strong> (1).</em></div></div>
    </div>

    <div class="synth-section">
      <h2>Quel futur choisir ?</h2>
      <div class="step-item"><div class="step-num">1</div><div class="step-text">Décision <strong>déjà prise</strong> / projet ? → <strong>be going to</strong>. <em>I'm going to travel.</em></div></div>
      <div class="step-item"><div class="step-num">2</div><div class="step-text">Décision prise <strong>maintenant</strong> / prédiction sans preuve / promesse ? → <strong>will</strong>. <em>I'll get it!</em></div></div>
      <div class="step-item"><div class="step-num">3</div><div class="step-text">Rendez-vous <strong>fixé</strong> (heure + lieu) ? → <strong>present continuous</strong>. <em>I'm seeing the doctor at 3.</em></div></div>
    </div>

    <div class="synth-section">
      <h2>Speaking — donner son avis</h2>
      <div class="step-item"><div class="step-num">1</div><div class="step-text">Donner l'avis : <em>I think… / In my opinion… / I believe…</em></div></div>
      <div class="step-item"><div class="step-num">2</div><div class="step-text">Être d'accord / pas d'accord : <em>I agree / I don't agree / That's true, but…</em></div></div>
      <div class="step-item"><div class="step-num">3</div><div class="step-text">Justifier : <em>because… / for example…</em></div></div>
    </div>
  </div>`;

  /* ---------------------- EXERCICES ---------------------- */
  sections.exercices = `<div id="exercices" class="section">
    <h2 style="font-size:30px; font-weight:800; color:var(--color-nav); margin-bottom:1rem;">🎯 Exercises</h2>
    <p style="color:var(--text-secondary); margin-bottom:1.2rem;">Le <strong>Quiz</strong> et les <strong>Flashcards</strong> testent tout ça automatiquement.</p>

    <div class="exercise-card">
      <h3 style="font-size:20px; font-weight:600; color:var(--color-nav);">✅ Simple or continuous?</h3>
      <ul style="line-height:2;">
        <li>I <strong>have been waiting</strong> for two hours. (durée → continuous)</li>
        <li>She <strong>has read</strong> five books this month. (quantité → simple)</li>
        <li>They <strong>have known</strong> each other since 2019. (verbe d'état → simple)</li>
        <li>It <strong>has been raining</strong> all day. (durée → continuous)</li>
      </ul>
    </div>

    <div class="exercise-card">
      <h3 style="font-size:20px; font-weight:600; color:var(--color-nav);">🏫 School rules — choisis le modal</h3>
      <ul style="line-height:2;">
        <li>You <strong>must</strong> wear a uniform. (obligation)</li>
        <li>You <strong>mustn't</strong> use your phone. (interdiction)</li>
        <li>You <strong>don't have to</strong> come on Saturday. (pas obligé)</li>
        <li>You <strong>should</strong> revise before the test. (conseil)</li>
      </ul>
    </div>
  </div>`;

  /* ---------------------- ERREURS ---------------------- */
  sections.erreurs = `<div id="erreurs" class="section">
    <h2 style="font-size:30px; font-weight:800; color:var(--color-nav); margin-bottom:1rem;">⚠️ Common mistakes</h2>
    <div class="formula-grid">
      <div class="formula-box"><h3>❌ « to » après un modal</h3><p>On dit <em>She can <strong>swim</strong></em>, pas <s>She can to swim</s>. Le modal est suivi de la base verbale.</p></div>
      <div class="formula-box"><h3>❌ « -s » au modal / au verbe</h3><p><em>He <strong>can</strong> go</em> (pas <s>He cans</s>, pas <s>He can goes</s>).</p></div>
      <div class="formula-box"><h3>❌ mustn't = don't have to</h3><p>Faux : <strong>mustn't</strong> = interdit · <strong>don't have to</strong> = pas obligé (libre).</p></div>
      <div class="formula-box"><h3>❌ for / since inversés</h3><p><strong>for</strong> + durée (for 3 years) · <strong>since</strong> + date/point de départ (since 2020).</p></div>
      <div class="formula-box"><h3>❌ continuous avec un verbe d'état</h3><p>On ne dit pas <s>I have been knowing</s>. Verbes d'état (know, be, like…) → present perfect <strong>simple</strong>.</p></div>
      <div class="formula-box"><h3>❌ participe passé irrégulier</h3><p>Attention aux V3 irréguliers : see→<strong>seen</strong>, write→<strong>written</strong>, do→<strong>done</strong>, go→<strong>gone</strong>.</p></div>
      <div class="formula-box"><h3>❌ didn't + verbe au passé</h3><p>On dit <em>I <strong>didn't go</strong></em>, pas <s>I didn't went</s>. Après <strong>did/didn't</strong> → base verbale.</p></div>
      <div class="formula-box"><h3>❌ Did you + verbe au passé</h3><p><em><strong>Did</strong> you <strong>see</strong> it?</em> (pas <s>Did you saw</s>). La marque du passé est déjà sur « did ».</p></div>
      <div class="formula-box"><h3>❌ past perfect = was/were</h3><p>Le past perfect, c'est <strong>had + V3</strong> (<em>had left</em>), pas <s>was left</s>. « had » à toutes les personnes.</p></div>
      <div class="formula-box"><h3>❌ will + to</h3><p>On dit <em>I <strong>will go</strong></em> / <em>I'<strong>m going to</strong> go</em>, jamais <s>I will to go</s> ni <s>I'm going to to go</s>.</p></div>
    </div>
  </div>`;

  /* ---------------------- QUIZ ---------------------- */
  var questions = [
    { q: "Present perfect SIMPLE form?", opts: ["have/has + past participle", "have/has + been + -ing", "will + verb", "be + -ing"], ans: 0, chapter: "perfect", difficulty: "facile", exp: "have/has + participe passé. Ex: I have finished." },
    { q: "Present perfect CONTINUOUS form?", opts: ["have/has + been + V-ing", "have/has + V-ed", "do/does + verb", "was/were + -ing"], ans: 0, chapter: "perfect", difficulty: "facile", exp: "have/has + been + -ing. Ex: I have been working." },
    { q: "« I ___ for the bus for 20 minutes. » (durée)", opts: ["have been waiting", "have waited", "wait", "am waiting"], ans: 0, chapter: "perfect", difficulty: "intermediaire", exp: "Durée → present perfect continuous." },
    { q: "« She ___ three cups of coffee today. » (quantité)", opts: ["has drunk", "has been drinking", "drink", "is drinking"], ans: 0, chapter: "perfect", difficulty: "intermediaire", exp: "Quantité (how many) → simple." },
    { q: "Which goes with a DURATION?", opts: ["for / since / how long", "how many", "yesterday", "tomorrow"], ans: 0, chapter: "perfect", difficulty: "intermediaire", exp: "for/since/how long → idée de durée (souvent continuous)." },
    { q: "« We ___ each other since 2018. » (verbe d'état: know)", opts: ["have known", "have been knowing", "know", "are knowing"], ans: 0, chapter: "perfect", difficulty: "difficile", exp: "Les verbes d'état (know, be…) → simple, jamais continuous." },
    { q: "for vs since: « ___ three years »", opts: ["for", "since", "ago", "during"], ans: 0, chapter: "perfect", difficulty: "facile", exp: "for + durée (for three years) ; since + point de départ (since 2021)." },
    { q: "A modal is followed by…", opts: ["the base verb (no « to »)", "to + verb", "verb + -ing", "verb + -s"], ans: 0, chapter: "modals", difficulty: "facile", exp: "Modal + base verbale : « She can go »." },
    { q: "« He ___ swim very well. » (capacité)", opts: ["can", "cans", "to can", "is can"], ans: 0, chapter: "modals", difficulty: "facile", exp: "can + base verbale, pas de -s, pas de to." },
    { q: "Strong obligation is expressed by…", opts: ["must / have to", "might", "should", "could"], ans: 0, chapter: "modals", difficulty: "intermediaire", exp: "must / have to = obligation forte." },
    { q: "Advice is expressed by…", opts: ["should / ought to", "must", "can", "may"], ans: 0, chapter: "modals", difficulty: "intermediaire", exp: "should / ought to = conseil." },
    { q: "« You ___ smoke here. » (c'est interdit)", opts: ["mustn't", "don't have to", "should", "can"], ans: 0, chapter: "modals", difficulty: "intermediaire", exp: "mustn't = interdiction." },
    { q: "« don't have to » means…", opts: ["pas obligé (mais possible)", "interdit", "obligatoire", "conseillé"], ans: 0, chapter: "modals", difficulty: "difficile", exp: "don't have to = absence d'obligation (≠ mustn't = interdit)." },
    { q: "« It ___ rain later. » (possibilité)", opts: ["might", "must", "should", "has to"], ans: 0, chapter: "modals", difficulty: "intermediaire", exp: "might / may = possibilité incertaine." },
    { q: "Which is a BAD-luck superstition?", opts: ["a broken mirror", "a four-leaf clover", "a horseshoe", "touch wood"], ans: 0, chapter: "vocab", difficulty: "facile", exp: "Broken mirror = 7 years bad luck. Four-leaf clover/horseshoe = good luck." },
    { q: "« Kia Ora » means « hello » in…", opts: ["Maori (New Zealand)", "Irish", "Spanish", "Latin"], ans: 0, chapter: "vocab", difficulty: "intermediaire", exp: "Kia Ora = bonjour en maori (Nouvelle-Zélande)." },
    { q: "School rule: « We ___ wear a uniform. » (obligation)", opts: ["must / have to", "mustn't", "don't have to", "might"], ans: 0, chapter: "vocab", difficulty: "facile", exp: "Obligation → must / have to." },
    { q: "To give your opinion, you say…", opts: ["In my opinion… / I think…", "How much?", "Once upon a time", "The end"], ans: 0, chapter: "skills", difficulty: "facile", exp: "I think… / In my opinion… / I believe… puis justifier avec because." },
    { q: "The UK flag is called…", opts: ["the Union Jack", "the Stars and Stripes", "the Tricolore", "the Maple Leaf"], ans: 0, chapter: "vocab", difficulty: "facile", exp: "Union Jack = drapeau du Royaume-Uni." },
    { q: "Which nations make up the UK?", opts: ["England, Scotland, Wales, N. Ireland", "England and France", "Ireland and Scotland only", "England only"], ans: 0, chapter: "vocab", difficulty: "intermediaire", exp: "Angleterre, Écosse, Pays de Galles, Irlande du Nord. Capitale : Londres." },
    { q: "The capital of Ireland is…", opts: ["Dublin", "London", "Wellington", "Edinburgh"], ans: 0, chapter: "vocab", difficulty: "facile", exp: "Dublin (Irlande). Londres = UK, Wellington = NZ." },
    { q: "The Irish national symbol is…", opts: ["the shamrock (clover)", "the rose", "the thistle", "the kiwi"], ans: 0, chapter: "vocab", difficulty: "intermediaire", exp: "Le trèfle (shamrock) ; fête de la Saint-Patrick le 17 mars." },
    { q: "The « haka » is…", opts: ["a Maori dance (rugby)", "an Irish dish", "a British holiday", "a card game"], ans: 0, chapter: "vocab", difficulty: "intermediaire", exp: "Danse maori des All Blacks (Nouvelle-Zélande)." },
    { q: "« I have lived here ___ 2015. »", opts: ["since", "for", "during", "ago"], ans: 0, chapter: "perfect", difficulty: "intermediaire", exp: "since + point de départ (2015)." },
    { q: "« She has studied English ___ six years. »", opts: ["for", "since", "from", "during"], ans: 0, chapter: "perfect", difficulty: "intermediaire", exp: "for + durée (six years)." },
    { q: "« Aotearoa » is the Maori name for…", opts: ["New Zealand", "Ireland", "Australia", "Scotland"], ans: 0, chapter: "vocab", difficulty: "difficile", exp: "Aotearoa = « le pays du long nuage blanc » = Nouvelle-Zélande." },
    { q: "« Have you ___ been to London? » (un jour dans ta vie)", opts: ["ever", "never", "yet", "since"], ans: 0, chapter: "perfect", difficulty: "intermediaire", exp: "ever = « déjà, à un moment » dans les questions." },
    { q: "« I haven't finished my homework ___. »", opts: ["yet", "already", "ever", "since"], ans: 0, chapter: "perfect", difficulty: "intermediaire", exp: "yet = « pas encore » dans les phrases négatives (en fin de phrase)." },
    { q: "« I've ___ seen this film, let's watch another. »", opts: ["already", "yet", "never", "for"], ans: 0, chapter: "perfect", difficulty: "intermediaire", exp: "already = « déjà » (action faite plus tôt que prévu)." },
    { q: "The capital of Scotland is…", opts: ["Edinburgh", "Cardiff", "Dublin", "London"], ans: 0, chapter: "vocab", difficulty: "intermediaire", exp: "Édimbourg (Scotland). Cardiff = Wales, Dublin = Ireland." },
    { q: "The capital of Wales is…", opts: ["Cardiff", "Edinburgh", "Belfast", "Dublin"], ans: 0, chapter: "vocab", difficulty: "difficile", exp: "Cardiff (pays de Galles)." },
    { q: "« We ___ to wear a uniform at home. » (aucune obligation)", opts: ["don't have", "mustn't", "must", "have"], ans: 0, chapter: "modals", difficulty: "intermediaire", exp: "don't have to = pas obligé (≠ mustn't = interdit)." },
    { q: "The All Blacks (rugby + haka) are from…", opts: ["New Zealand", "Ireland", "Wales", "England"], ans: 0, chapter: "vocab", difficulty: "facile", exp: "L'équipe de Nouvelle-Zélande ; le haka est une danse maori." },
    { q: "To DISAGREE politely, you say…", opts: ["I don't agree / That's true, but…", "I think so too", "Exactly!", "You're right"], ans: 0, chapter: "skills", difficulty: "intermediaire", exp: "I don't agree / I'm not sure / That's true, but… pour nuancer." },
    { q: "Past simple of « go »?", opts: ["went", "goed", "gone", "going"], ans: 0, chapter: "past", difficulty: "facile", exp: "go est irrégulier : go → went (prétérit). gone = participe passé (V3)." },
    { q: "« I ___ to the cinema yesterday. »", opts: ["went", "have gone", "go", "had went"], ans: 0, chapter: "past", difficulty: "facile", exp: "yesterday = moment précis du passé → past simple : went." },
    { q: "Negative past simple: « She ___ come. »", opts: ["didn't", "doesn't", "hadn't", "wasn't"], ans: 0, chapter: "past", difficulty: "facile", exp: "didn't + base verbale : She didn't come (pas « didn't came »)." },
    { q: "« ___ you see the match last night? »", opts: ["Did", "Do", "Have", "Was"], ans: 0, chapter: "past", difficulty: "facile", exp: "Question au passé : Did + sujet + base verbale → Did you see…?" },
    { q: "After « didn't », the verb is…", opts: ["the base form", "the -ed form", "the V3", "the -ing form"], ans: 0, chapter: "past", difficulty: "intermediaire", exp: "didn't go (pas « didn't went ») : base verbale après did/didn't." },
    { q: "Past simple of « see »?", opts: ["saw", "seen", "seed", "sawed"], ans: 0, chapter: "past", difficulty: "intermediaire", exp: "Irrégulier : see → saw (prétérit) ; seen = participe passé." },
    { q: "Past perfect form?", opts: ["had + past participle", "have + -ing", "did + verb", "was + -ed"], ans: 0, chapter: "past", difficulty: "intermediaire", exp: "had + V3 (participe passé), à toutes les personnes. Ex: I had finished." },
    { q: "« When I arrived, the train ___ already left. »", opts: ["had", "has", "did", "was"], ans: 0, chapter: "past", difficulty: "difficile", exp: "L'action la plus ancienne (le train part) → past perfect : had left." },
    { q: "Past perfect = …", opts: ["le passé du passé (action 1)", "le futur", "le présent", "une habitude"], ans: 0, chapter: "past", difficulty: "intermediaire", exp: "Action encore plus ancienne qu'une autre action passée." },
    { q: "Past simple of « have »?", opts: ["had", "haved", "has", "having"], ans: 0, chapter: "past", difficulty: "facile", exp: "Irrégulier : have → had." },
    { q: "« Look at those clouds! It ___ rain. » (preuve)", opts: ["is going to", "will", "would", "goes to"], ans: 0, chapter: "future", difficulty: "intermediaire", exp: "Prédiction avec PREUVE visible → be going to." },
    { q: "Spontaneous decision: « The phone's ringing. I ___ get it. »", opts: ["'ll", "'m going to", "will to", "am get"], ans: 0, chapter: "future", difficulty: "intermediaire", exp: "Décision prise à l'instant → will ('ll)." },
    { q: "Fixed arrangement: « I ___ Anna at 5 p.m. »", opts: ["'m meeting", "meet", "will meet", "meeted"], ans: 0, chapter: "future", difficulty: "difficile", exp: "Rendez-vous fixé (heure) → present continuous : I'm meeting…" },
    { q: "« be going to » expresses…", opts: ["une intention / un projet", "une obligation", "une interdiction", "le passé"], ans: 0, chapter: "future", difficulty: "facile", exp: "be going to = intention, projet déjà décidé (ou prédiction avec preuve)." },
    { q: "Which is correct?", opts: ["I will help you.", "I will to help you.", "I will helping you.", "I will helps you."], ans: 0, chapter: "future", difficulty: "facile", exp: "will + base verbale, jamais « will to »." }
  ];

  /* ---------------------- FLASHCARDS ---------------------- */
  var flashcards = [
    { front: "Present perfect simple: form & use?", back: "have/has + participe passé. Résultat, action terminée, quantité (how many). Ex: I have finished.", chapter: "perfect" },
    { front: "Present perfect continuous: form & use?", back: "have/has + been + V-ing. Durée, action qui continue (how long). Ex: I have been working.", chapter: "perfect" },
    { front: "for vs since?", back: "for + durée (for 2 hours). since + point de départ (since Monday / since 2020).", chapter: "perfect" },
    { front: "Continuous interdit avec quels verbes ?", back: "Les verbes d'état (know, be, like, have…) → toujours present perfect SIMPLE.", chapter: "perfect" },
    { front: "Règle d'un modal ?", back: "Modal + base verbale (no « to », no « -s »). Ex: She can swim / He must go.", chapter: "modals" },
    { front: "can / could ?", back: "Capacité, permission, possibilité. Ex: I can swim. Could you help me?", chapter: "modals" },
    { front: "must vs have to ?", back: "Tous deux = obligation forte. must = ressenti perso ; have to = obligation extérieure.", chapter: "modals" },
    { front: "mustn't vs don't have to ?", back: "mustn't = interdit (ne pas faire). don't have to = pas obligé (libre de faire ou non).", chapter: "modals" },
    { front: "should / ought to ?", back: "Donner un conseil. Ex: You should sleep more.", chapter: "modals" },
    { front: "may / might ?", back: "Possibilité (might = moins sûr) / permission. Ex: It might rain.", chapter: "modals" },
    { front: "3 superstitions (bad luck) ?", back: "Black cat, broken mirror (7 years), walking under a ladder, Friday the 13th.", chapter: "vocab" },
    { front: "2 superstitions (good luck) ?", back: "Four-leaf clover, horseshoe, touch wood, crossing your fingers.", chapter: "vocab" },
    { front: "School rules — utile vocab ?", back: "must / mustn't / have to / don't have to / be (not) allowed to + base verb.", chapter: "vocab" },
    { front: "Kia Ora ? New Zealand ?", back: "« Kia Ora » = hello en maori. New Zealand = pays anglophone du Pacifique (Unit 7).", chapter: "vocab" },
    { front: "Donner / défendre son avis ?", back: "I think… / In my opinion… + because / for example. Agree: I agree. Disagree: I don't agree.", chapter: "skills" },
    { front: "Le Royaume-Uni : les 4 nations ?", back: "Angleterre, Écosse, Pays de Galles, Irlande du Nord. Capitale : Londres. Drapeau : l'Union Jack.", chapter: "vocab" },
    { front: "New Zealand : 3 faits ?", back: "Pays anglophone du Pacifique ; « Kia Ora » = hello en maori ; le haka (danse maori). Nom maori : Aotearoa.", chapter: "vocab" },
    { front: "Ireland : drapeau & symboles ?", back: "Drapeau vert-blanc-orange ; capitale Dublin ; trèfle (shamrock) ; Saint-Patrick le 17 mars.", chapter: "vocab" },
    { front: "L'Union Jack ?", back: "Le drapeau du Royaume-Uni : croix d'Angleterre + Écosse + Irlande superposées.", chapter: "vocab" },
    { front: "Que veut dire « Saint Patrick's Day » ?", back: "La fête nationale irlandaise, le 17 mars — on s'habille en vert partout dans le monde.", chapter: "vocab" },
    { front: "for vs since (rappel) ?", back: "for + durée (for 6 years) ; since + point de départ (since 2015).", chapter: "perfect" },
    { front: "already / yet / just ?", back: "already = déjà (affirmatif) · yet = pas encore / déjà ? (négatif & questions, en fin) · just = à l'instant.", chapter: "perfect" },
    { front: "ever / never ?", back: "ever = « déjà » dans les questions (Have you ever…?) · never = ne… jamais.", chapter: "perfect" },
    { front: "be (not) allowed to ?", back: "être (in)autorisé à. Ex: We are not allowed to eat in class.", chapter: "modals" },
    { front: "Capitales des 4 nations du UK ?", back: "England → London · Scotland → Edinburgh · Wales → Cardiff · Northern Ireland → Belfast.", chapter: "vocab" },
    { front: "Le haka ?", back: "Une danse maori (Nouvelle-Zélande), célèbre avant les matchs des All Blacks.", chapter: "vocab" },
    { front: "Phrases pour un débat (oral) ?", back: "Avis : I think… / In my opinion… · D'accord : I agree · Pas d'accord : I don't agree, that's true but… · Justifier : because.", chapter: "skills" },
    { front: "Past simple : forme (+, −, ?) ?", back: "+ : V-ed (réguliers) ou V2 (irréguliers) · − : didn't + base verbale · ? : Did + sujet + base verbale.", chapter: "past" },
    { front: "Past simple : quand l'utiliser ?", back: "Action terminée à un moment précis du passé : yesterday, last week, in 2020, … ago.", chapter: "past" },
    { front: "8 verbes irréguliers (prétérit) ?", back: "go→went · see→saw · eat→ate · take→took · have→had · give→gave · find→found · write→wrote.", chapter: "past" },
    { front: "Erreur classique au passé négatif/interrogatif ?", back: "Base verbale après did : « I didn't go », « Did you see? » (jamais didn't went / Did you saw).", chapter: "past" },
    { front: "Past perfect : forme & emploi ?", back: "had + participe passé (V3), à toutes les personnes. Le passé DU passé : action 1 (la plus ancienne).", chapter: "past" },
    { front: "Past simple vs past perfect dans une phrase ?", back: "Action la plus ancienne → past perfect (had + V3) ; action la plus récente → past simple. « The train had left when I arrived. »", chapter: "past" },
    { front: "Les 3 façons de parler du futur ?", back: "be going to (intention/projet) · will (prédiction sans preuve, décision spontanée, promesse) · present continuous (rendez-vous fixé).", chapter: "future" },
    { front: "be going to vs will ?", back: "be going to = décidé d'avance / preuve visible. will = décision sur le moment, prédiction sans preuve, promesse.", chapter: "future" },
    { front: "Futur avec le present continuous ?", back: "be + V-ing pour un rendez-vous fixé : « I'm meeting Anna at 5 p.m. » (heure + lieu prévus).", chapter: "future" }
  ];

  window.registerSubject('anglais', {
    subtitle: 'Anglais 4ᵉ — present perfect, past simple & perfect, future, modals, superstitions (Unit 7)',
    content: {
      sections: sections,
      questions: questions,
      flashcards: flashcards,
      demos: {},
      navLabels: { formules: '📌 Grammar', exercices: '🎯 Exercises' },
      chapOrder: ['perfect', 'past', 'future', 'modals', 'vocab', 'skills'],
      chapLabels: { perfect: 'Present perfect', past: 'Past simple & perfect', future: 'Future', modals: 'Modals', vocab: 'Vocabulary', skills: 'Skills & oral' }
    }
  });
})();
