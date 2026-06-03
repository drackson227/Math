/* GR2 Study — Contenu CHIMIE
   UAA 3 · Chapitre 4 : Résolution de problèmes — Pondération des équations chimiques.
   S'enregistre auprès de subjects.js via window.registerSubject. */
(function () {
  'use strict';
  if (typeof window.registerSubject !== 'function') return;

  /* ---------- Sections (cours / formules / méthodes / exercices / erreurs) ---------- */
  var sections = {};

  sections.synthese = `<div id="synthese" class="section active">
    <div style="text-align:center; margin-bottom:1.5rem;">
      <h2 style="font-size:30px; font-weight:800; color:var(--color-nav); margin:0;">🧪 Chimie — UAA 3 · Chapitre 4</h2>
      <p style="color:var(--text-secondary); margin-top:6px;">Résolution de problèmes — Pondération des équations chimiques</p>
    </div>

    <div class="synth-section">
      <h2>Introduction</h2>
      <p>La <strong>transformation chimique</strong> est le passage obligé pour produire des substances et des matériaux utiles dans la vie courante. Pour en obtenir les quantités voulues, les chimistes calculent les quantités de réactifs à mettre en œuvre : ils résolvent des <strong>problèmes stœchiométriques</strong>.</p>
    </div>

    <div class="synth-section">
      <h2>Pondérer une équation chimique</h2>
      <p>Pondérer (= équilibrer), c'est faire en sorte que le nombre des différents atomes qui constituent les molécules de <strong>réactifs</strong> soit égal au nombre des différents atomes qui constituent les molécules de <strong>produits</strong> (conservation de la matière).</p>
      <p>👉 On ajuste uniquement les <strong>coefficients stœchiométriques</strong> (les nombres placés <em>devant</em> les formules). On ne change <strong>jamais</strong> les indices à l'intérieur des formules.</p>
      <div class="key-rule"><div class="formula-main">H₂SO₄ + 2 NaOH → Na₂SO₄ + 2 H₂O</div></div>
      <div class="simple-exp-box">
        <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Comprendre simplement</button>
        <div class="simple-exp-content">Une réaction chimique ne <strong>crée</strong> ni ne <strong>détruit</strong> d'atomes : elle les <strong>réarrange</strong>. Donc s'il y a 4 atomes d'oxygène à gauche, il doit y en avoir 4 à droite. Pondérer, c'est juste rajouter des « paquets » (les coefficients) devant les molécules pour que le compte tombe juste des deux côtés. Le petit chiffre <em>dans</em> la formule (comme le 2 de H₂O) dit combien d'atomes il y a dans UNE molécule : si tu le changes, ce n'est plus la même substance !</div>
      </div>
    </div>

    <div class="synth-section">
      <h2>Les combustions</h2>
      <p>Une combustion = réaction d'un composé avec le dioxygène O₂ (+ dégagement d'énergie).</p>
      <ul style="line-height:2;">
        <li><strong>Combustion complète</strong> d'un hydrocarbure : C<sub>x</sub>H<sub>y</sub> + O₂ → <strong>CO₂</strong> + <strong>H₂O</strong> + énergie</li>
        <li><strong>Combustion incomplète</strong> (manque d'O₂) : C<sub>x</sub>H<sub>y</sub> + O₂ → <strong>CO</strong> + H₂O + énergie &nbsp; <em>(CO = monoxyde de carbone, « le tueur silencieux » : inodore et mortel ⚠️)</em></li>
      </ul>
      <p>Astuce d'ordre de pondération : on équilibre dans l'ordre <strong>C, puis H, puis O</strong> (« CHO »).</p>
      <div class="key-rule"><div class="formula-main">C₄H₁₀ + 13/2 O₂ → 4 CO₂ + 5 H₂O</div></div>
      <div class="simple-exp-box">
        <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Comprendre simplement</button>
        <div class="simple-exp-content">Brûler = faire réagir avec l'oxygène de l'air. Si l'oxygène est <strong>suffisant</strong>, le carbone devient du CO₂ (gaz « normal ») : c'est la combustion <strong>complète</strong>. Si l'oxygène <strong>manque</strong>, le carbone n'est pas « fini de brûler » et donne du <strong>CO</strong> (monoxyde) : combustion <strong>incomplète</strong>. On finit toujours par l'oxygène (le « O » de CHO) parce qu'il est dans plusieurs molécules à la fois (CO₂ et H₂O) : plus facile de l'ajuster en dernier, quand tout le reste est fixé.</div>
      </div>
    </div>

    <div class="synth-section">
      <h2>Les autres types de réactions</h2>
      <ul style="line-height:2.1;">
        <li><strong>Acide + hydroxyde</strong> → <strong>sel + eau</strong> &nbsp;(ex. H₂SO₄ + 2 NaOH → Na₂SO₄ + 2 H₂O)</li>
        <li><strong>Acide + oxyde</strong> → <strong>sel + eau</strong> &nbsp;(ex. 6 HNO₂ + Fe₂O₃ → 2 Fe(NO₂)₃ + 3 H₂O)</li>
        <li><strong>Acide + métal</strong> → <strong>sel + hydrogène (H₂)</strong> &nbsp;(ex. 2 H₃PO₄ + 3 Mg → Mg₃(PO₄)₂ + 3 H₂)</li>
      </ul>
      <p>Ordre de pondération conseillé : <strong>M, X, H, O</strong> (métal, puis le reste, puis H, puis O).</p>
      <div class="simple-exp-box">
        <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Comprendre simplement</button>
        <div class="simple-exp-content">Retiens 3 « recettes » : un <strong>acide</strong> + une base (hydroxyde ou oxyde) donne un <strong>sel + de l'eau</strong> ; un <strong>acide + un métal</strong> donne un <strong>sel + du gaz hydrogène (H₂)</strong> qui fait des bulles. Le « sel » ici ne veut pas dire le sel de cuisine, c'est juste le composé formé par le métal et le reste de l'acide. L'ordre M-X-H-O est une astuce : on commence par ce qui apparaît le moins souvent (le métal) et on garde l'oxygène pour la fin.</div>
      </div>
    </div>

    <div class="synth-section">
      <h2>Outils de calcul (mole & gaz)</h2>
      <ul style="line-height:2.1;">
        <li><strong>Masse ↔ quantité de matière :</strong> m = n · M &nbsp;(m en g, n en mol, M = masse molaire en g/mol)</li>
        <li><strong>Nombre de particules :</strong> N = n · N<sub>A</sub> &nbsp;(N<sub>A</sub> ≈ 6,02 · 10²³ /mol)</li>
        <li><strong>Gaz parfaits :</strong> P · V = n · R · T &nbsp;(R ≈ 0,082 L·atm/(mol·K), T en K)</li>
        <li><strong>CNTP :</strong> conditions normales de température et de pression (références pour les gaz).</li>
      </ul>
      <div class="simple-exp-box">
        <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Comprendre simplement</button>
        <div class="simple-exp-content">La <strong>mole</strong> est juste une « grande quantité » d'atomes/molécules (un peu comme « une douzaine » = 12, sauf qu'une mole = 6,02·10²³). <strong>m = n·M</strong> : si tu connais le nombre de moles (n) et la masse d'une mole (M, lue dans le tableau périodique), tu trouves la masse totale. <strong>PV = nRT</strong> relie pression, volume et quantité d'un gaz : c'est utile dès qu'un exercice parle de litres de gaz. ⚠️ La température va toujours en <strong>kelvins</strong> (ajoute 273 aux °C).</div>
      </div>
    </div>
  </div>`;

  sections.formules = `<div id="formules" class="section">
    <h2 style="font-size:30px; font-weight:800; color:var(--color-nav); margin-bottom:1.2rem;">🧮 Formules & règles clés</h2>
    <div class="grid2">
      <div>
        <div class="formula-box"><h3>Pondération</h3><div class="formula-main">atomes (réactifs) = atomes (produits)</div><p class="note">On ajuste les coefficients, jamais les indices. Les nombres devant les formules = <strong>coefficients stœchiométriques</strong>.</p></div>
        <div class="formula-box"><h3>Combustion complète</h3><div class="formula-main">C<sub>x</sub>H<sub>y</sub> + O₂ → CO₂ + H₂O + énergie</div><p class="note">Ordre : C → H → O.</p></div>
        <div class="formula-box"><h3>Combustion incomplète</h3><div class="formula-main">C<sub>x</sub>H<sub>y</sub> + O₂ → CO + H₂O + énergie</div><p class="note">CO = tueur silencieux (manque d'O₂).</p></div>
      </div>
      <div>
        <div class="formula-box"><h3>Réactions acide-base / métal</h3><div class="formula-main">acide + hydroxyde → sel + eau<br>acide + oxyde → sel + eau<br>acide + métal → sel + H₂</div></div>
        <div class="formula-box"><h3>Mole, masse & gaz</h3><div class="formula-main">m = n · M<br>N = n · N<sub>A</sub><br>P · V = n · R · T</div><p class="note">N<sub>A</sub> ≈ 6,02·10²³ /mol · R ≈ 0,082 L·atm/(mol·K) · T en kelvins.</p></div>
      </div>
    </div>
  </div>`;

  sections.methodes = `<div id="methodes" class="section">
    <h2 style="font-size:30px; font-weight:800; color:var(--color-nav); margin-bottom:1rem;">📝 Méthodes</h2>
    <div class="methods-tabs">
      <button class="mtab on" onclick="showMethod('cm1', this)">Pondérer une équation</button>
      <button class="mtab" onclick="showMethod('cm2', this)">Combustion d'un hydrocarbure</button>
    </div>
    <div id="cm1" class="method-content on">
      <div class="formula-box"><h3>Méthode — Pondérer pas à pas</h3><p class="note"><strong>Exemple :</strong> H₃PO₄ + Mg → Mg₃(PO₄)₂ + H₂</p></div>
      <div class="step-list">
        <div class="step-item"><div class="step-num">1</div><div class="step-text">Compter les atomes de chaque élément des deux côtés.
          <button class="why-btn" onclick="toggleWhyMethod(this)">💡 Pourquoi cette étape ?</button>
          <div class="why-content">On fait un « inventaire » : combien de Mg, de P, de O, de H de chaque côté ? C'est ce qui montre ce qui est déséquilibré et par quoi commencer.</div>
        </div></div>
        <div class="step-item"><div class="step-num">2</div><div class="step-text">Équilibrer d'abord le métal / le groupement complexe : il faut 3 Mg et 2 (PO₄) → <strong>2 H₃PO₄</strong> et <strong>3 Mg</strong>, produit <strong>Mg₃(PO₄)₂</strong>.
          <button class="why-btn" onclick="toggleWhyMethod(this)">💡 Pourquoi cette étape ?</button>
          <div class="why-content">On commence par le métal et les gros groupes (comme PO₄ qui reste « en bloc ») : ils n'apparaissent qu'à un endroit, donc plus simples à fixer. Le produit Mg₃(PO₄)₂ impose 3 Mg et 2 PO₄ → on en déduit les coefficients des réactifs.</div>
        </div></div>
        <div class="step-item"><div class="step-num">3</div><div class="step-text">Équilibrer l'hydrogène : 2 H₃PO₄ donnent 6 H → <strong>3 H₂</strong>.
          <button class="why-btn" onclick="toggleWhyMethod(this)">💡 Pourquoi cette étape ?</button>
          <div class="why-content">Une fois les gros morceaux placés, l'hydrogène se déduit : 2 × H₃PO₄ = 6 H, et comme H₂ contient 2 H, il faut 6 ÷ 2 = 3 molécules de H₂.</div>
        </div></div>
        <div class="step-item"><div class="step-num">4</div><div class="step-text">Vérifier tous les atomes : 2 H₃PO₄ + 3 Mg → Mg₃(PO₄)₂ + 3 H₂ ✓
          <button class="why-btn" onclick="toggleWhyMethod(this)">💡 Pourquoi cette étape ?</button>
          <div class="why-content">Toujours recompter à la fin chaque élément des deux côtés : si tout colle (ici 3 Mg, 2 P, 8 O, 6 H de chaque côté), l'équation est pondérée. Sinon, on a oublié un élément.</div>
        </div></div>
      </div>
    </div>
    <div id="cm2" class="method-content">
      <div class="formula-box"><h3>Méthode — Combustion complète</h3><p class="note"><strong>Exemple :</strong> C₄H₁₀ + O₂ → CO₂ + H₂O</p></div>
      <div class="step-list">
        <div class="step-item"><div class="step-num">1</div><div class="step-text"><strong>C</strong> d'abord : 4 carbones → <strong>4 CO₂</strong>.
          <button class="why-btn" onclick="toggleWhyMethod(this)">💡 Pourquoi cette étape ?</button>
          <div class="why-content">Tout le carbone du C₄H₁₀ doit se retrouver dans le CO₂. 4 C à gauche → il faut 4 CO₂ à droite (chaque CO₂ contient 1 carbone).</div>
        </div></div>
        <div class="step-item"><div class="step-num">2</div><div class="step-text"><strong>H</strong> ensuite : 10 hydrogènes → <strong>5 H₂O</strong>.
          <button class="why-btn" onclick="toggleWhyMethod(this)">💡 Pourquoi cette étape ?</button>
          <div class="why-content">Tout l'hydrogène finit dans l'eau. 10 H à gauche, et H₂O contient 2 H → il faut 10 ÷ 2 = 5 H₂O.</div>
        </div></div>
        <div class="step-item"><div class="step-num">3</div><div class="step-text"><strong>O</strong> en dernier : à droite 4·2 + 5 = 13 oxygènes → <strong>13/2 O₂</strong>.
          <button class="why-btn" onclick="toggleWhyMethod(this)">💡 Pourquoi cette étape ?</button>
          <div class="why-content">On compte l'oxygène une fois CO₂ et H₂O fixés : 4 CO₂ = 8 O, plus 5 H₂O = 5 O, total 13 O. Comme O₂ contient 2 O, il faut 13 ÷ 2 = 13/2 molécules de O₂.</div>
        </div></div>
        <div class="step-item"><div class="step-num">4</div><div class="step-text">Résultat : C₄H₁₀ + 13/2 O₂ → 4 CO₂ + 5 H₂O ✓ (×2 si on veut des coefficients entiers).
          <button class="why-btn" onclick="toggleWhyMethod(this)">💡 Pourquoi cette étape ?</button>
          <div class="why-content">Les coefficients fractionnaires (13/2) sont acceptés, mais pour avoir des nombres entiers on multiplie toute l'équation par 2 : 2 C₄H₁₀ + 13 O₂ → 8 CO₂ + 10 H₂O.</div>
        </div></div>
      </div>
    </div>
  </div>`;

  sections.exercices = `<div id="exercices" class="section">
    <h2 style="font-size:30px; font-weight:800; color:var(--color-nav); margin-bottom:0.5rem;">✏️ Exercices guidés</h2>
    <p style="color:var(--text-secondary); margin-bottom:1.5rem;">Révèle les étapes une par une.</p>

    <div class="exercise-card">
      <h3 style="font-size:20px; font-weight:600; color:var(--color-nav); margin-bottom:0.5rem;">🧪 Pondérer : H₂SO₄ + Al(OH)₃ → Al₂(SO₄)₃ + H₂O</h3>
      <button class="step-btn" onclick="showExerciseStep(this, 201)">▶ Commencer</button>
      <div class="exercise-step" data-step="201">
        <span class="step-badge">Étape 1 sur 3</span>
        <p>Équilibrer Al et le groupe SO₄ : il faut 2 Al et 3 SO₄ à droite → <strong>2 Al(OH)₃</strong> et <strong>3 H₂SO₄</strong>.</p>
        <button class="step-btn" onclick="showExerciseStep(this, 202)">▶ Étape 2</button>
      </div>
      <div class="exercise-step" data-step="202">
        <span class="step-badge">Étape 2 sur 3</span>
        <p>Compter H et O pour l'eau : on obtient <strong>6 H₂O</strong>.</p>
        <button class="step-btn" onclick="showExerciseStep(this, 203)">▶ Solution</button>
      </div>
      <div class="exercise-step" data-step="203">
        <span class="step-badge">Solution</span>
        <div class="formula-main">3 H₂SO₄ + 2 Al(OH)₃ → Al₂(SO₄)₃ + 6 H₂O</div>
      </div>
    </div>

    <div class="exercise-card">
      <h3 style="font-size:20px; font-weight:600; color:var(--color-nav); margin-bottom:0.5rem;">🔥 Combustion complète de C₈H₁₈</h3>
      <button class="step-btn" onclick="showExerciseStep(this, 211)">▶ Commencer</button>
      <div class="exercise-step" data-step="211">
        <span class="step-badge">Étape 1 sur 3</span>
        <p><strong>C</strong> : 8 carbones → <strong>8 CO₂</strong>.</p>
        <button class="step-btn" onclick="showExerciseStep(this, 212)">▶ Étape 2</button>
      </div>
      <div class="exercise-step" data-step="212">
        <span class="step-badge">Étape 2 sur 3</span>
        <p><strong>H</strong> : 18 hydrogènes → <strong>9 H₂O</strong>. Puis <strong>O</strong> : 8·2 + 9 = 25 → <strong>25/2 O₂</strong>.</p>
        <button class="step-btn" onclick="showExerciseStep(this, 213)">▶ Solution</button>
      </div>
      <div class="exercise-step" data-step="213">
        <span class="step-badge">Solution</span>
        <div class="formula-main">C₈H₁₈ + 25/2 O₂ → 8 CO₂ + 9 H₂O</div>
      </div>
    </div>
  </div>`;

  sections.erreurs = `<div id="erreurs" class="section">
    <h2 style="font-size:30px; font-weight:800; color:var(--color-nav); margin-bottom:1.5rem;">⚠️ Erreurs fréquentes</h2>
    <div class="synth-section">
      <div class="formula-box"><h3>❌ Modifier les indices pour équilibrer</h3><p><strong>Erreur :</strong> écrire H₂O₂ au lieu d'ajouter un coefficient.</p><p><strong>Correction :</strong> on change seulement les <strong>coefficients</strong> (devant), jamais les indices (dans la formule).</p></div>
      <div class="formula-box"><h3>❌ Oublier un élément en équilibrant</h3><p><strong>Erreur :</strong> équilibrer C et H mais pas O.</p><p><strong>Correction :</strong> suivre l'ordre <strong>C → H → O</strong> et toujours recompter tous les atomes à la fin.</p></div>
      <div class="formula-box"><h3>❌ Confondre combustion complète et incomplète</h3><p><strong>Erreur :</strong> produire CO₂ alors que l'O₂ manque.</p><p><strong>Correction :</strong> manque d'O₂ → <strong>CO</strong> (incomplète) ; assez d'O₂ → <strong>CO₂</strong> (complète).</p></div>
      <div class="formula-box"><h3>❌ Oublier d'utiliser des kelvins dans PV=nRT</h3><p><strong>Erreur :</strong> mettre T en °C.</p><p><strong>Correction :</strong> T doit être en <strong>kelvins</strong> (T(K) = θ(°C) + 273).</p></div>
    </div>
  </div>`;

  /* ---------- Quiz ---------- */
  var questions = [
    { q: "Que signifie « pondérer » une équation chimique ?", opts: ["Équilibrer le nombre d'atomes de chaque élément des deux côtés", "Mesurer la masse des réactifs", "Compter le nombre de molécules", "Calculer la température"], ans: 0, chapter: "ponderation", difficulty: "facile", exp: "Pondérer = équilibrer : autant d'atomes de chaque élément chez les réactifs que chez les produits (conservation de la matière)." },
    { q: "Pour équilibrer, on modifie…", opts: ["les coefficients (devant les formules)", "les indices (dans les formules)", "les deux", "ni l'un ni l'autre"], ans: 0, chapter: "ponderation", difficulty: "facile", exp: "On ajuste uniquement les coefficients stœchiométriques. Changer les indices changerait les substances elles-mêmes." },
    { q: "Comment appelle-t-on les nombres placés devant les formules ?", opts: ["Coefficients stœchiométriques", "Indices", "Exposants", "Masses molaires"], ans: 0, chapter: "ponderation", difficulty: "facile", exp: "Ce sont les coefficients stœchiométriques." },
    { q: "H₂SO₄ + … NaOH → Na₂SO₄ + 2 H₂O. Coefficient de NaOH ?", opts: ["2", "1", "3", "4"], ans: 0, chapter: "ponderation", difficulty: "intermediaire", exp: "Il faut 2 Na et équilibrer H et O : 2 NaOH." },
    { q: "3 H₂SO₄ + 2 Al(OH)₃ → Al₂(SO₄)₃ + … H₂O. Coefficient de H₂O ?", opts: ["6", "3", "2", "4"], ans: 0, chapter: "ponderation", difficulty: "difficile", exp: "On obtient 6 H₂O en équilibrant H et O." },
    { q: "La combustion complète d'un hydrocarbure produit :", opts: ["CO₂ + H₂O", "CO + H₂O", "C + H₂O", "CO₂ + H₂"], ans: 0, chapter: "combustion", difficulty: "facile", exp: "Avec assez d'O₂ : C_xH_y + O₂ → CO₂ + H₂O + énergie." },
    { q: "La combustion incomplète produit notamment :", opts: ["CO (monoxyde de carbone)", "CO₂", "O₂", "C₂H₆"], ans: 0, chapter: "combustion", difficulty: "facile", exp: "Par manque d'O₂, on forme du CO au lieu du CO₂." },
    { q: "Pourquoi le CO est-il dangereux ?", opts: ["Inodore et mortel (« tueur silencieux »)", "Il sent très fort", "Il est explosif au contact de l'eau", "Il est radioactif"], ans: 0, chapter: "combustion", difficulty: "facile", exp: "Le monoxyde de carbone est inodore et toxique : on ne le détecte pas, d'où « tueur silencieux »." },
    { q: "C₄H₁₀ + 13/2 O₂ → 4 CO₂ + … H₂O. Coefficient de H₂O ?", opts: ["5", "4", "10", "2"], ans: 0, chapter: "combustion", difficulty: "intermediaire", exp: "10 H à gauche → 5 H₂O." },
    { q: "Dans quel ordre équilibre-t-on une combustion ?", opts: ["C puis H puis O", "O puis H puis C", "H puis O puis C", "Peu importe"], ans: 0, chapter: "combustion", difficulty: "intermediaire", exp: "On garde l'oxygène pour la fin : C → H → O (« CHO »)." },
    { q: "Acide + métal donne :", opts: ["sel + hydrogène (H₂)", "sel + eau", "sel + oxygène", "sel + CO₂"], ans: 0, chapter: "types", difficulty: "facile", exp: "ex. 2 H₃PO₄ + 3 Mg → Mg₃(PO₄)₂ + 3 H₂." },
    { q: "Acide + hydroxyde donne :", opts: ["sel + eau", "sel + hydrogène", "sel + CO₂", "deux acides"], ans: 0, chapter: "types", difficulty: "facile", exp: "ex. H₂SO₄ + 2 NaOH → Na₂SO₄ + 2 H₂O." },
    { q: "Quelle formule relie masse, quantité de matière et masse molaire ?", opts: ["m = n · M", "m = n / M", "m = M / n", "m = n + M"], ans: 0, chapter: "mole", difficulty: "facile", exp: "m = n · M (m en g, n en mol, M en g/mol)." },
    { q: "Le nombre de particules se calcule par :", opts: ["N = n · Nₐ", "N = n / Nₐ", "N = M · Nₐ", "N = n · M"], ans: 0, chapter: "mole", difficulty: "intermediaire", exp: "N = n · Nₐ avec Nₐ ≈ 6,02·10²³ /mol." },
    { q: "La loi des gaz parfaits s'écrit :", opts: ["P·V = n·R·T", "P·V = n/R·T", "P/V = n·R·T", "P·V = R·T/n"], ans: 0, chapter: "mole", difficulty: "intermediaire", exp: "PV = nRT, avec T en kelvins." },
    { q: "Dans PV = nRT, la température doit être exprimée en :", opts: ["kelvins (K)", "degrés Celsius", "degrés Fahrenheit", "joules"], ans: 0, chapter: "mole", difficulty: "intermediaire", exp: "T en kelvins : T(K) = θ(°C) + 273." }
  ];

  /* ---------- Flashcards ---------- */
  var flashcards = [
    { front: "Que veut dire pondérer une équation ?", back: "Équilibrer : autant d'atomes de chaque élément chez les réactifs que chez les produits.", chapter: "ponderation" },
    { front: "On équilibre en changeant quoi ?", back: "Les <strong>coefficients</strong> (devant les formules), jamais les indices.", chapter: "ponderation" },
    { front: "Coefficients stœchiométriques ?", back: "Les nombres placés devant les formules chimiques.", chapter: "ponderation" },
    { front: "Combustion complète d'un hydrocarbure ?", back: "C<sub>x</sub>H<sub>y</sub> + O₂ → CO₂ + H₂O + énergie", chapter: "combustion" },
    { front: "Combustion incomplète ?", back: "C<sub>x</sub>H<sub>y</sub> + O₂ → CO + H₂O (manque d'O₂). CO = tueur silencieux.", chapter: "combustion" },
    { front: "Ordre pour équilibrer une combustion ?", back: "C → H → O (« CHO »).", chapter: "combustion" },
    { front: "Acide + hydroxyde → ?", back: "sel + eau", chapter: "types" },
    { front: "Acide + oxyde → ?", back: "sel + eau", chapter: "types" },
    { front: "Acide + métal → ?", back: "sel + hydrogène (H₂)", chapter: "types" },
    { front: "m = ? (masse)", back: "m = n · M (n = quantité de matière en mol, M = masse molaire g/mol)", chapter: "mole" },
    { front: "Nombre de particules N = ?", back: "N = n · Nₐ (Nₐ ≈ 6,02·10²³ /mol)", chapter: "mole" },
    { front: "Loi des gaz parfaits ?", back: "P·V = n·R·T (R ≈ 0,082 L·atm/mol·K, T en kelvins)", chapter: "mole" }
  ];

  window.registerSubject('chimie', {
    subtitle: 'Chimie — UAA 3 · Ch.4 : pondération, combustions, mole & gaz',
    content: {
      sections: sections,
      questions: questions,
      flashcards: flashcards,
      demos: {},
      chapOrder: ['ponderation', 'combustion', 'types', 'mole'],
      chapLabels: { ponderation: 'Pondération', combustion: 'Combustions', types: 'Types de réactions', mole: 'Mole & gaz' }
    }
  });
})();
