/* GR2 Study — Contenu CHIMIE
   UAA 3 · Chapitre 4 : Résolution de problèmes — Pondération des équations chimiques.
   S'enregistre auprès de subjects.js via window.registerSubject. */
(function () {
  'use strict';
  if (typeof window.registerSubject !== 'function') return;

  /* Fiches cliquables (tableau périodique, atome, Avogadro) */
  window.IMG_INFO = window.IMG_INFO || {};
  Object.assign(window.IMG_INFO, {
    "tableau_periodique.png": {
      title: "Le tableau périodique", sub: "les éléments chimiques",
      cours: "<p>Le <strong>tableau périodique</strong> classe tous les <strong>éléments chimiques</strong> par numéro atomique. Pour chaque élément, on y lit son <strong>symbole</strong> et sa <strong>masse molaire M</strong> (en g/mol), indispensable pour les calculs.</p>",
      exam: "<ul><li>On y lit la <strong>masse molaire M</strong> utilisée dans <strong>n = m/M</strong>.</li><li>Colonnes = familles · lignes = périodes.</li></ul>",
      anecdote: "Il a été imaginé par le Russe <strong>Mendeleïev</strong> en 1869. Il avait même <strong>laissé des cases vides</strong> pour des éléments pas encore découverts… et il avait vu juste !"
    },
    "atome.png": {
      title: "L'atome", sub: "la brique de la matière",
      cours: "<p>L'<strong>atome</strong> est la plus petite particule d'un élément. Il a un <strong>noyau</strong> (protons + neutrons) entouré d'<strong>électrons</strong>. Les atomes se lient pour former des <strong>molécules</strong>.</p>",
      exam: "<ul><li>Noyau (protons +, neutrons) + électrons (−).</li><li>Une <strong>molécule</strong> = plusieurs atomes liés (ex. H₂O).</li></ul>",
      anecdote: "Le mot « atome » vient du grec <em>atomos</em> = « qu'on ne peut pas couper ». On a longtemps cru l'atome insécable… avant de découvrir qu'il contient lui-même des particules !"
    },
    "avogadro.jpg": {
      title: "Amedeo Avogadro", sub: "1776–1856 · la mole",
      cours: "<p><strong>Avogadro</strong> a donné son nom au <strong>nombre d'Avogadro</strong> N<sub>A</sub> ≈ <strong>6,02·10²³</strong> : c'est le nombre de particules dans <strong>une mole</strong>. La mole est « le paquet » du chimiste.</p>",
      exam: "<ul><li><strong>N = n · N<sub>A</sub></strong> · N<sub>A</sub> ≈ 6,02·10²³ /mol.</li><li>1 mole = 6,02·10²³ particules (atomes, molécules…).</li></ul>",
      anecdote: "Une mole, c'est gigantesque : 6,02·10²³. Avec une mole de grains de sable, on recouvrirait toute la surface de la Terre sur plusieurs mètres d'épaisseur !"
    }
  });
  window.INFO_THEME = window.INFO_THEME || {};
  Object.assign(window.INFO_THEME, { "tableau_periodique.png": "chem", "atome.png": "chem", "avogadro.jpg": "chem" });
  window.TERM_MAP = window.TERM_MAP || {};
  Object.assign(window.TERM_MAP, {
    "tableau périodique": "tableau_periodique.png", "masse molaire": "tableau_periodique.png",
    "Avogadro": "avogadro.jpg", "mole": "avogadro.jpg", "atome": "atome.png", "molécule": "atome.png"
  });

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
      <figure class="hfig" style="max-width:420px; display:block; margin:1rem auto;"><img src="tableau_periodique.png" alt="Tableau périodique des éléments" loading="lazy"><figcaption>Le tableau périodique : on y lit la masse molaire M de chaque élément (clique pour la fiche).</figcaption></figure>
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
      <div class="bio-compare-wrap">
        <table class="bio-compare">
          <thead><tr><th>Combustion</th><th>Quand</th><th>Produits</th></tr></thead>
          <tbody>
            <tr><td>Complète</td><td>assez d'O₂</td><td><strong>CO₂</strong> + H₂O + énergie</td></tr>
            <tr><td>Incomplète</td><td>manque d'O₂</td><td><strong>CO</strong> (monoxyde, inodore & mortel ⚠️) + H₂O</td></tr>
          </tbody>
        </table>
      </div>
      <p>Astuce d'ordre de pondération : on équilibre dans l'ordre <strong>C, puis H, puis O</strong> (« CHO »).</p>
      <div class="key-rule"><div class="formula-main">C₄H₁₀ + 13/2 O₂ → 4 CO₂ + 5 H₂O</div></div>
      <div class="simple-exp-box">
        <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Comprendre simplement</button>
        <div class="simple-exp-content">Brûler = faire réagir avec l'oxygène de l'air. Si l'oxygène est <strong>suffisant</strong>, le carbone devient du CO₂ (gaz « normal ») : c'est la combustion <strong>complète</strong>. Si l'oxygène <strong>manque</strong>, le carbone n'est pas « fini de brûler » et donne du <strong>CO</strong> (monoxyde) : combustion <strong>incomplète</strong>. On finit toujours par l'oxygène (le « O » de CHO) parce qu'il est dans plusieurs molécules à la fois (CO₂ et H₂O) : plus facile de l'ajuster en dernier, quand tout le reste est fixé.</div>
      </div>
    </div>

    <div class="synth-section">
      <h2>Les autres types de réactions</h2>
      <div class="bio-compare-wrap">
        <table class="bio-compare">
          <thead><tr><th>Réactifs</th><th>Produits</th><th>Exemple</th></tr></thead>
          <tbody>
            <tr><td>Acide + hydroxyde</td><td>sel + eau</td><td>H₂SO₄ + 2 NaOH → Na₂SO₄ + 2 H₂O</td></tr>
            <tr><td>Acide + oxyde</td><td>sel + eau</td><td>6 HNO₂ + Fe₂O₃ → 2 Fe(NO₂)₃ + 3 H₂O</td></tr>
            <tr><td>Acide + métal</td><td>sel + <strong>H₂</strong></td><td>2 H₃PO₄ + 3 Mg → Mg₃(PO₄)₂ + 3 H₂</td></tr>
          </tbody>
        </table>
      </div>
      <p>Ordre de pondération conseillé : <strong>M, X, H, O</strong> (métal, puis le reste, puis H, puis O).</p>
      <div class="simple-exp-box">
        <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Comprendre simplement</button>
        <div class="simple-exp-content">Retiens 3 « recettes » : un <strong>acide</strong> + une base (hydroxyde ou oxyde) donne un <strong>sel + de l'eau</strong> ; un <strong>acide + un métal</strong> donne un <strong>sel + du gaz hydrogène (H₂)</strong> qui fait des bulles. Le « sel » ici ne veut pas dire le sel de cuisine, c'est juste le composé formé par le métal et le reste de l'acide. L'ordre M-X-H-O est une astuce : on commence par ce qui apparaît le moins souvent (le métal) et on garde l'oxygène pour la fin.</div>
      </div>
    </div>

    <div class="synth-section">
      <h2>Outils de calcul (mole & gaz)</h2>
      <div class="hfig-row">
        <figure class="hfig" style="max-width:150px"><img src="avogadro.jpg" alt="Amedeo Avogadro" loading="lazy"><figcaption>Avogadro & la mole (Nₐ ≈ 6,02·10²³)</figcaption></figure>
        <figure class="hfig" style="max-width:150px"><img src="atome.png" alt="Atome" loading="lazy"><figcaption>L'atome (noyau + électrons)</figcaption></figure>
      </div>
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

    <div class="synth-section">
      <h2>Résoudre un problème stœchiométrique (méthode du tableau)</h2>
      <p>Le cœur du chapitre : « quelle masse de B faut-il / se forme-t-il ? ». On s'appuie sur la relation <strong>n = m / M</strong> (quantité de matière = masse ÷ masse molaire) et une <strong>méthode en tableau</strong>.</p>
      <ol style="line-height:2;">
        <li><strong>Écrire</strong> l'équation chimique <strong>pondérée</strong>.</li>
        <li><strong>Lecture molaire</strong> : noter les coefficients, et placer les données (m, M) dans un tableau (une colonne par composé).</li>
        <li><strong>n initial</strong> de chaque composé : n = m / M.</li>
        <li><strong>n final</strong> : on fait réagir en respectant les proportions de l'équation (le réactif s'épuise, le produit apparaît).</li>
        <li><strong>Résolution</strong> : m = n · M pour la grandeur cherchée.</li>
      </ol>
      <div class="key-rule"><div class="formula-main">\\(n = \\dfrac{m}{M}\\) &nbsp;&nbsp;↔&nbsp;&nbsp; \\(m = n \\cdot M\\)</div></div>
      <p><strong>Exemple — Fe + S → FeS (1 : 1 : 1).</strong> Pour <strong>100 g de fer</strong> (M = 55,86) : n = 100 / 55,86 = <strong>1,79 mol</strong>. Proportions 1:1 → 1,79 mol de soufre nécessaire → m = 1,79 · 32,06 = <strong>57,4 g de S</strong> ; et 1,79 mol de FeS se forment → m = 1,79 · 87,91 = <strong>157 g de FeS</strong>.</p>
      <div class="simple-exp-box">
        <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Comprendre simplement</button>
        <div class="simple-exp-content">L'astuce : on ne peut pas comparer directement des <strong>grammes</strong> (un gramme de fer et un gramme de soufre n'ont pas le même nombre d'atomes). On passe donc tout en <strong>moles</strong> avec n = m/M, parce que l'équation pondérée parle en <strong>moles</strong> (les coefficients). Une fois en moles, on applique les proportions, puis on revient aux grammes avec m = n·M. Le tableau sert juste à ranger proprement : une ligne « n initial », une ligne « n final ».</div>
      </div>
    </div>

    <div class="synth-section">
      <h2>Réactif limitant & réactif en excès</h2>
      <p>Si les réactifs ne sont <strong>pas</strong> en proportions exactes, l'un s'épuise en premier : c'est le <strong>réactif limitant</strong> (il décide de la quantité de produit formé). Celui qui reste est le <strong>réactif en excès</strong>.</p>
      <ul style="line-height:2;">
        <li>Calcule le <strong>n initial</strong> de chaque réactif (n = m/M).</li>
        <li>Compare avec les coefficients : le réactif dont il y a le <strong>moins</strong> (proportionnellement) est le <strong>limitant</strong>.</li>
        <li>La quantité de produit se calcule <strong>à partir du limitant</strong>.</li>
      </ul>
      <p><strong>Exemple :</strong> 50 g Fe (n = 50/55,85 = 0,895 mol) + 50 g S (n = 50/32,06 = 1,56 mol), réaction 1 : 1. Le fer s'épuise le premier → <strong>le fer est le réactif limitant</strong>. Il reste 1,56 − 0,895 = <strong>0,665 mol de soufre en excès</strong>, et il se forme 0,895 mol de FeS.</p>
      <div class="simple-exp-box">
        <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Comprendre simplement</button>
        <div class="simple-exp-content">Imagine une recette : pour 1 burger il faut 1 pain + 1 steak. Si tu as 5 pains mais seulement 3 steaks, tu ne peux faire que <strong>3 burgers</strong> : le <strong>steak est le limitant</strong>, et il te reste 2 pains <strong>en excès</strong>. En chimie c'est pareil, sauf qu'on compte en <strong>moles</strong> (pas en pièces), donc on convertit d'abord les grammes en moles.</div>
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
        <div class="formula-box"><h3>Mole, masse & gaz</h3><div class="formula-main">\\(n = \\dfrac{m}{M}\\) &nbsp;↔&nbsp; \\(m = n \\cdot M\\)<br>\\(N = n \\cdot N_A\\)<br>\\(P \\cdot V = n \\cdot R \\cdot T\\)</div><p class="note">n en mol · m en g · M = masse molaire en g/mol · N<sub>A</sub> ≈ 6,02·10²³ /mol · R ≈ 0,082 L·atm/(mol·K) · T en kelvins.</p></div>
        <div class="formula-box"><h3>Volume molaire des gaz (V<sub>m</sub>)</h3><div class="formula-main">\\(n = \\dfrac{V}{V_m}\\) &nbsp;↔&nbsp; \\(V = n \\cdot V_m\\)</div><p class="note">Pour un <strong>gaz</strong> : V en L, n en mol. <strong>V<sub>m</sub> = 22,4 L/mol</strong> aux <strong>CNTP</strong> (0 °C, 1 atm) · <strong>V<sub>m</sub> = 24,5 L/mol</strong> aux <strong>CSTP</strong> (25 °C, 1 atm).</p></div>
        <div class="formula-box"><h3>Concentration molaire</h3><div class="formula-main">\\(C = \\dfrac{n}{V}\\)</div><p class="note">C en <strong>mol/L</strong> (mol·L⁻¹) · n en mol · V en <strong>litres</strong>. On note aussi [X] = concentration de l'espèce X.</p></div>
        <div class="formula-box"><h3>Concentration massique</h3><div class="formula-main">\\(C_m = \\dfrac{m}{V}\\) &nbsp;&nbsp;↔&nbsp;&nbsp; \\(C_m = C \\cdot M\\)</div><p class="note">C<sub>m</sub> en <strong>g/L</strong> · m en g · V en L. Lien avec la molaire : on multiplie par la masse molaire M.</p></div>
        <div class="formula-box"><h3>Dilution</h3><div class="formula-main">\\(C_1 \\cdot V_1 = C_2 \\cdot V_2\\)</div><p class="note">La quantité de soluté ne change pas quand on dilue. (n = C·V conservé.) Facteur de dilution \\(F = \\dfrac{V_2}{V_1} = \\dfrac{C_1}{C_2}\\).</p></div>
      </div>
    </div>
  </div>`;

  sections.methodes = `<div id="methodes" class="section">
    <h2 style="font-size:30px; font-weight:800; color:var(--color-nav); margin-bottom:1rem;">📝 Méthodes</h2>
    <div class="methods-tabs">
      <button class="mtab on" onclick="showMethod('cm1', this)">Pondérer une équation</button>
      <button class="mtab" onclick="showMethod('cm2', this)">Combustion d'un hydrocarbure</button>
      <button class="mtab" onclick="showMethod('cm3', this)">Problème stœchiométrique</button>
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
    <div id="cm3" class="method-content">
      <div class="formula-box"><h3>Méthode — Problème stœchiométrique (tableau)</h3><p class="note"><strong>Exemple :</strong> quelle masse de soufre faut-il pour 100 g de fer ? Fe + S → FeS</p></div>
      <div class="step-list">
        <div class="step-item"><div class="step-num">1</div><div class="step-text">Écrire l'équation <strong>pondérée</strong> : Fe + S → FeS (1 : 1 : 1).
          <button class="why-btn" onclick="toggleWhyMethod(this)">💡 Pourquoi cette étape ?</button>
          <div class="why-content">Sans équation pondérée, on ne connaît pas les proportions. Ici tout est 1:1:1.</div>
        </div></div>
        <div class="step-item"><div class="step-num">2</div><div class="step-text">Lecture molaire + données : M(Fe)=55,86 ; M(S)=32,06 ; M(FeS)=87,91 ; m(Fe)=100 g.
          <button class="why-btn" onclick="toggleWhyMethod(this)">💡 Pourquoi cette étape ?</button>
          <div class="why-content">On range les masses molaires et la donnée connue dans un tableau (une colonne par composé) pour s'y retrouver.</div>
        </div></div>
        <div class="step-item"><div class="step-num">3</div><div class="step-text">n initial du fer : n = m / M = 100 / 55,86 = <strong>1,79 mol</strong>.
          <button class="why-btn" onclick="toggleWhyMethod(this)">💡 Pourquoi cette étape ?</button>
          <div class="why-content">On convertit les grammes en moles, car l'équation raisonne en moles.</div>
        </div></div>
        <div class="step-item"><div class="step-num">4</div><div class="step-text">Proportions 1:1 → 1,79 mol de S et 1,79 mol de FeS. Résolution : m(S)=1,79·32,06=<strong>57,4 g</strong> ; m(FeS)=1,79·87,91=<strong>157 g</strong>.
          <button class="why-btn" onclick="toggleWhyMethod(this)">💡 Pourquoi cette étape ?</button>
          <div class="why-content">On revient aux grammes avec m = n·M. Vérifie : 57,4 g de S + 100 g de Fe = 157 g de FeS (conservation de la masse ✓).</div>
        </div></div>
      </div>
    </div>
  </div>`;

  sections.exercices = `<div id="exercices" class="section">
    <h2 style="font-size:30px; font-weight:800; color:var(--color-nav); margin-bottom:0.5rem;">✏️ Exercices guidés</h2>
    <p style="color:var(--text-secondary); margin-bottom:1.5rem;">Révèle les étapes une par une.</p>

    <div class="exercise-card">
      <h3 style="font-size:20px; font-weight:600; color:var(--color-nav); margin-bottom:0.5rem;">⚖️ Pondère toi-même (interactif)</h3>
      <p style="color:var(--text-secondary); margin:0 0 .9rem;">La compétence clé du chapitre. Choisis les coefficients avec <strong>− / +</strong> : le <strong>compteur d'atomes</strong> se met à jour en direct et te dit quand c'est équilibré. 7 équations du cours.</p>
      <div class="chem-bal"></div>
    </div>

    <div class="exercise-card">
      <h3 style="font-size:20px; font-weight:600; color:var(--color-nav); margin-bottom:0.5rem;">🎮 Quels produits se forment ?</h3>
      <p style="color:var(--text-secondary); margin:0 0 .8rem;">On te donne une réaction ; tu choisis les produits (sel + eau · sel + H₂ · CO₂ + H₂O · CO + H₂O). Correction immédiate + score. (Clavier : 1-4, puis Entrée.)</p>
      <button type="button" class="nav-btn" data-mg="chi-mm">▶ Commencer le jeu</button>
      <div id="chi-mm" class="mg-mount"></div>
    </div>

    <div class="exercise-card">
      <h3 style="font-size:20px; font-weight:600; color:var(--color-nav); margin-bottom:0.5rem;">⚛️ Légende l'atome</h3>
      <p style="color:var(--text-secondary); margin-bottom:1rem;">Écris ce que désigne chaque numéro, puis clique sur <strong>Corriger</strong>. Astuce : <strong>🙈 Cacher les n°</strong> pour t'entraîner comme à l'examen.</p>
      <div class="lblexo lblexo-svg">
        <svg viewBox="0 0 220 220" role="img" aria-label="Schéma d'un atome à légender">
          <circle cx="110" cy="110" r="92" fill="none" stroke="#7c5cff" stroke-width="2" opacity="0.7"/>
          <circle cx="110" cy="110" r="58" fill="none" stroke="#7c5cff" stroke-width="2" opacity="0.7"/>
          <circle cx="96" cy="104" r="11" fill="#e0524d"/>
          <circle cx="120" cy="104" r="11" fill="#e0524d"/>
          <circle cx="110" cy="123" r="11" fill="#e0524d"/>
          <circle cx="110" cy="99" r="11" fill="#9aa3b2"/>
          <circle cx="98" cy="119" r="11" fill="#9aa3b2"/>
          <circle cx="123" cy="120" r="11" fill="#9aa3b2"/>
          <circle cx="110" cy="52" r="7" fill="#4f7cf0"/>
          <circle cx="110" cy="168" r="7" fill="#4f7cf0"/>
          <circle cx="18" cy="110" r="7" fill="#4f7cf0"/>
          <circle cx="202" cy="110" r="7" fill="#4f7cf0"/>
          <circle cx="110" cy="18" r="7" fill="#4f7cf0"/>
        </svg>
        <span class="lx-mark" style="left:50%; top:31%;">1</span>
        <span class="lx-mark" style="left:43.6%; top:47.3%;">2</span>
        <span class="lx-mark" style="left:55.9%; top:54.5%;">3</span>
        <span class="lx-mark" style="left:50%; top:8.2%;">4</span>
        <span class="lx-mark" style="left:76.4%; top:50%;">5</span>
      </div>
      <ol class="lblexo-list">
        <li><span class="lx-num">1</span><input type="text" data-answer="Noyau" aria-label="structure 1" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Structure 1…"/></li>
        <li><span class="lx-num">2</span><input type="text" data-answer="Proton" aria-label="structure 2" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Structure 2…"/></li>
        <li><span class="lx-num">3</span><input type="text" data-answer="Neutron" aria-label="structure 3" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Structure 3…"/></li>
        <li><span class="lx-num">4</span><input type="text" data-answer="Électron" aria-label="structure 4" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Structure 4…"/></li>
        <li><span class="lx-num">5</span><input type="text" data-answer="Couche électronique" aria-label="structure 5" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Structure 5…"/></li>
      </ol>
      <div class="lblexo-foot"><button class="step-btn" onclick="checkLabelExo(this)">✓ Corriger</button>
      <button class="step-btn" onclick="resetLabelExo(this)" style="background:transparent; color:var(--color-nav); border:1px solid var(--color-nav);">↻ Recommencer</button>
      <button class="step-btn" onclick="toggleMarks(this)" style="background:transparent; color:var(--color-nav); border:1px solid var(--color-nav);">🙈 Cacher les n°</button>
      <span class="lblexo-score"></span></div><div class="lblexo-corr"></div>
    </div>

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

    <h3 style="font-size:22px; font-weight:700; color:var(--color-nav); margin:2.2rem 0 0.4rem;">🧮 Problèmes à résoudre — feuille de réponse corrigée</h3>
    <p style="color:var(--text-secondary); margin-bottom:1.2rem;">Écris ton calcul <strong>ligne par ligne</strong> dans la feuille : chaque ligne avec « = » est vérifiée (✓/✗), et ta réponse finale est comparée à la solution. Le clavier 🔢 t'aide pour ÷ × √ … (masses molaires M en g/mol).</p>

    <div class="exercise-card">
      <h3 style="font-size:19px; font-weight:600; color:var(--color-nav); margin-bottom:0.4rem;">⚖️ Fe + S → FeS — masse de soufre</h3>
      <div style="background:rgba(167,139,250,0.06); border-radius:8px; padding:0.9rem; margin-bottom:0.9rem;"><p>Quelle masse de <strong>soufre</strong> faut-il pour faire réagir complètement <strong>100 g de fer</strong> ? &nbsp;<em>M(Fe) = 55,86 · M(S) = 32,06</em></p></div>
      <div class="ansheet-wrap"><div class="ansheet-title">📝 Ta feuille de réponse (corrigée en direct)</div><div class="chem-sheet" data-answer="57,4 g" data-keypad></div></div>
      <button class="step-btn" onclick="showExerciseStep(this, 221)">👁️ Voir la solution</button>
      <div class="exercise-step" data-step="221"><span class="step-badge">Solution</span><p>n(Fe) = m/M = 100 / 55,86 = 1,79 mol. Proportions 1:1 → 1,79 mol de S → m = 1,79 · 32,06 = <strong>57,4 g de soufre</strong>.</p></div>
    </div>

    <div class="exercise-card">
      <h3 style="font-size:19px; font-weight:600; color:var(--color-nav); margin-bottom:0.4rem;">⚖️ Fe + S → FeS — masse de sulfure formé</h3>
      <div style="background:rgba(167,139,250,0.06); border-radius:8px; padding:0.9rem; margin-bottom:0.9rem;"><p>Quelle masse de <strong>sulfure de fer (FeS)</strong> se forme à partir de 100 g de fer ? &nbsp;<em>M(FeS) = 87,91</em></p></div>
      <div class="ansheet-wrap"><div class="ansheet-title">📝 Ta feuille de réponse (corrigée en direct)</div><div class="chem-sheet" data-answer="157 g" data-keypad></div></div>
      <button class="step-btn" onclick="showExerciseStep(this, 222)">👁️ Voir la solution</button>
      <div class="exercise-step" data-step="222"><span class="step-badge">Solution</span><p>1,79 mol de FeS se forment → m = 1,79 · 87,91 = <strong>157 g de FeS</strong>. (Vérif : 100 g Fe + 57,4 g S = 157 g ✓)</p></div>
    </div>

    <div class="exercise-card">
      <h3 style="font-size:19px; font-weight:600; color:var(--color-nav); margin-bottom:0.4rem;">🧪 2 HgO → 2 Hg + O₂ — masse de mercure</h3>
      <div style="background:rgba(167,139,250,0.06); border-radius:8px; padding:0.9rem; margin-bottom:0.9rem;"><p>Quelle masse de <strong>mercure</strong> obtient-on en décomposant <strong>2 g d'oxyde de mercure (II)</strong> ? &nbsp;<em>M(HgO) = 216,6 · M(Hg) = 200,6</em></p></div>
      <div class="ansheet-wrap"><div class="ansheet-title">📝 Ta feuille de réponse (corrigée en direct)</div><div class="chem-sheet" data-answer="1,85 g" data-keypad></div></div>
      <button class="step-btn" onclick="showExerciseStep(this, 223)">👁️ Voir la solution</button>
      <div class="exercise-step" data-step="223"><span class="step-badge">Solution</span><p>n(HgO) = 2 / 216,6 = 0,00923 mol. Rapport 2 HgO → 2 Hg (1:1) → 0,00923 mol de Hg → m = 0,00923 · 200,6 = <strong>1,85 g de mercure</strong>.</p></div>
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
    // ── Exercices réels des feuilles de cours (résolution de problèmes) ──
    { q: "Fe + S → FeS : on chauffe 5 g de fer (~0,09 mol) avec 50 g de soufre. Le réactif limitant est :", opts: ["le fer", "le soufre", "les deux à la fois", "aucun"], ans: 0, chapter: "stoechio", difficulty: "intermediaire", exp: "Le fer est en bien plus petite quantité (le soufre est en large excès) → le fer s'épuise d'abord : c'est le réactif limitant.", simple: "Le réactif limitant, c'est celui qu'il y a en plus petite quantité : il s'arrête en premier et fixe combien de produit on obtient." },
    { q: "Décomposition de l'eau oxygénée : 2 H₂O₂ → 2 H₂O + O₂. Avec 500 mL de solution à 0,750 mol/L, quelle masse de dioxygène O₂ obtient-on ?", opts: ["6,02 g", "12,0 g", "3,01 g", "24,0 g"], ans: 0, chapter: "stoechio", difficulty: "difficile", exp: "n(H₂O₂)=0,500 L × 0,750 = 0,375 mol → n(O₂)=0,375/2=0,1875 mol → m=0,1875×32 ≈ 6,02 g." },
    { q: "Procédé Solvay : quelle masse de chlorure de sodium (NaCl) faut-il pour produire 1 tonne de soude ?", opts: ["1104 kg", "1000 kg", "552 kg", "2208 kg"], ans: 0, chapter: "stoechio", difficulty: "difficile", exp: "D'après le calcul stœchiométrique du cours : R = 1104 kg de NaCl." },
    { q: "Fe₂O₃ + 6 HCl → 2 FeCl₃ + 3 H₂O. Avec 1 L d'acide chlorhydrique à 1,00 mol/L, quelle masse de rouille Fe₂O₃ peut-on enlever ?", opts: ["26,7 g", "160 g", "53,4 g", "13,4 g"], ans: 0, chapter: "stoechio", difficulty: "difficile", exp: "n(HCl)=1,00 mol → n(Fe₂O₃)=1,00/6=0,167 mol → m=0,167×160 ≈ 26,7 g." },
    { q: "Que signifie « pondérer » une équation chimique ?", opts: ["Équilibrer le nombre d'atomes de chaque élément des deux côtés", "Mesurer la masse des réactifs", "Compter le nombre de molécules", "Calculer la température"], ans: 0, chapter: "ponderation", difficulty: "facile", exp: "Pondérer = équilibrer : autant d'atomes de chaque élément chez les réactifs que chez les produits (conservation de la matière).", simple: "Rien ne se perd : tous les atomes du départ doivent se retrouver à l'arrivée. Pondérer = ajuster les nombres devant les formules pour avoir pile le même nombre de chaque atome des deux côtés." },
    { q: "Pour équilibrer, on modifie…", opts: ["les coefficients (devant les formules)", "les indices (dans les formules)", "les deux", "ni l'un ni l'autre"], ans: 0, chapter: "ponderation", difficulty: "facile", exp: "On ajuste uniquement les coefficients stœchiométriques. Changer les indices changerait les substances elles-mêmes.", simple: "Le coefficient est le GROS nombre DEVANT (2 H₂O = deux molécules d'eau). L'indice est le petit nombre DEDANS (H₂O = 2 H par molécule). On a le droit de changer le gros (combien de molécules), jamais le petit (ça créerait une autre substance)." },
    { q: "Comment appelle-t-on les nombres placés devant les formules ?", opts: ["Coefficients stœchiométriques", "Indices", "Exposants", "Masses molaires"], ans: 0, chapter: "ponderation", difficulty: "facile", exp: "Ce sont les coefficients stœchiométriques." },
    { q: "H₂SO₄ + … NaOH → Na₂SO₄ + 2 H₂O. Coefficient de NaOH ?", opts: ["2", "1", "3", "4"], ans: 0, chapter: "ponderation", difficulty: "intermediaire", exp: "Il faut 2 Na et équilibrer H et O : 2 NaOH." },
    { q: "3 H₂SO₄ + 2 Al(OH)₃ → Al₂(SO₄)₃ + … H₂O. Coefficient de H₂O ?", opts: ["6", "3", "2", "4"], ans: 0, chapter: "ponderation", difficulty: "difficile", exp: "On obtient 6 H₂O en équilibrant H et O." },
    { q: "La combustion complète d'un hydrocarbure produit :", opts: ["CO₂ + H₂O", "CO + H₂O", "C + H₂O", "CO₂ + H₂"], ans: 0, chapter: "combustion", difficulty: "facile", exp: "Avec assez d'O₂ : C_xH_y + O₂ → CO₂ + H₂O + énergie.", simple: "« Complète » = il y a assez d'oxygène pour tout brûler à fond. Le carbone finit en CO₂ et l'hydrogène en H₂O (eau). C'est la combustion propre, sans le CO dangereux." },
    { q: "La combustion incomplète produit notamment :", opts: ["CO (monoxyde de carbone)", "CO₂", "O₂", "C₂H₆"], ans: 0, chapter: "combustion", difficulty: "facile", exp: "Par manque d'O₂, on forme du CO au lieu du CO₂." },
    { q: "Pourquoi le CO est-il dangereux ?", opts: ["Inodore et mortel (« tueur silencieux »)", "Il sent très fort", "Il est explosif au contact de l'eau", "Il est radioactif"], ans: 0, chapter: "combustion", difficulty: "facile", exp: "Le monoxyde de carbone est inodore et toxique : on ne le détecte pas, d'où « tueur silencieux »." },
    { q: "C₄H₁₀ + 13/2 O₂ → 4 CO₂ + … H₂O. Coefficient de H₂O ?", opts: ["5", "4", "10", "2"], ans: 0, chapter: "combustion", difficulty: "intermediaire", exp: "10 H à gauche → 5 H₂O." },
    { q: "Dans quel ordre équilibre-t-on une combustion ?", opts: ["C puis H puis O", "O puis H puis C", "H puis O puis C", "Peu importe"], ans: 0, chapter: "combustion", difficulty: "intermediaire", exp: "On garde l'oxygène pour la fin : C → H → O (« CHO »).", simple: "Astuce « CHO » : équilibre d'abord le Carbone, puis l'Hydrogène, et garde l'Oxygène pour la fin (il est dans le CO₂ ET dans l'eau, donc plus facile à ajuster en dernier)." },
    { q: "Acide + métal donne :", opts: ["sel + hydrogène (H₂)", "sel + eau", "sel + oxygène", "sel + CO₂"], ans: 0, chapter: "types", difficulty: "facile", exp: "ex. 2 H₃PO₄ + 3 Mg → Mg₃(PO₄)₂ + 3 H₂." },
    { q: "Acide + hydroxyde donne :", opts: ["sel + eau", "sel + hydrogène", "sel + CO₂", "deux acides"], ans: 0, chapter: "types", difficulty: "facile", exp: "ex. H₂SO₄ + 2 NaOH → Na₂SO₄ + 2 H₂O." },
    { q: "Quelle formule relie masse, quantité de matière et masse molaire ?", opts: ["m = n · M", "m = n / M", "m = M / n", "m = n + M"], ans: 0, chapter: "mole", difficulty: "facile", exp: "m = n · M (m en g, n en mol, M en g/mol).", simple: "La masse molaire M, c'est le poids d'UNE mole. Donc pour n moles : masse = n × M. Comme acheter n paquets à M grammes chacun → total = n × M grammes." },
    { q: "Le nombre de particules se calcule par :", opts: ["N = n · Nₐ", "N = n / Nₐ", "N = M · Nₐ", "N = n · M"], ans: 0, chapter: "mole", difficulty: "intermediaire", exp: "N = n · Nₐ avec Nₐ ≈ 6,02·10²³ /mol." },
    { q: "La loi des gaz parfaits s'écrit :", opts: ["P·V = n·R·T", "P·V = n/R·T", "P/V = n·R·T", "P·V = R·T/n"], ans: 0, chapter: "mole", difficulty: "intermediaire", exp: "PV = nRT, avec T en kelvins." },
    { q: "Dans PV = nRT, la température doit être exprimée en :", opts: ["kelvins (K)", "degrés Celsius", "degrés Fahrenheit", "joules"], ans: 0, chapter: "mole", difficulty: "intermediaire", exp: "T en kelvins : T(K) = θ(°C) + 273." },
    { q: "Le volume molaire d'un gaz aux CNTP (0 °C, 1 atm) vaut :", opts: ["22,4 L/mol", "24,5 L/mol", "1 L/mol", "6,02·10²³ L/mol"], ans: 0, chapter: "mole", difficulty: "intermediaire", exp: "Vm = 22,4 L/mol aux CNTP ; 24,5 L/mol aux CSTP (25 °C). V = n · Vm.", simple: "Surprenant mais vrai : à 0 °C et 1 atm, 1 mole de N'IMPORTE quel gaz occupe toujours 22,4 litres. Donc pour trouver le volume d'un gaz : V = n × 22,4." },
    { q: "Pour un gaz, on relie volume et quantité de matière par :", opts: ["V = n · Vm", "V = n / Vm", "V = m · Vm", "V = Vm / n"], ans: 0, chapter: "mole", difficulty: "intermediaire", exp: "V = n · Vm (et n = V / Vm), avec Vm = 22,4 L/mol aux CNTP." },
    { q: "Quelle est la 1ʳᵉ étape d'un problème stœchiométrique ?", opts: ["Écrire l'équation pondérée", "Calculer la masse molaire", "Convertir en litres", "Mesurer la température"], ans: 0, chapter: "stoechio", difficulty: "facile", exp: "Sans équation pondérée, on ne connaît pas les proportions entre composés." },
    { q: "Pour comparer des réactifs, on convertit leurs masses en :", opts: ["moles (n = m/M)", "litres", "grammes par mole", "degrés"], ans: 0, chapter: "stoechio", difficulty: "facile", exp: "L'équation raisonne en moles : on passe des grammes aux moles avec n = m/M." },
    { q: "n = m/M : si m = 100 g et M = 55,86 g/mol, alors n ≈", opts: ["1,79 mol", "5,59 mol", "0,56 mol", "155,9 mol"], ans: 0, chapter: "stoechio", difficulty: "intermediaire", exp: "n = 100 / 55,86 ≈ 1,79 mol." },
    { q: "Le réactif qui s'épuise en premier s'appelle :", opts: ["le réactif limitant", "le réactif en excès", "le catalyseur", "le produit"], ans: 0, chapter: "stoechio", difficulty: "facile", exp: "Le réactif limitant fixe la quantité maximale de produit ; l'autre est en excès.", simple: "Comme une recette : avec 10 pains mais seulement 2 tranches de fromage, tu fais 2 sandwichs — le fromage (limitant) bloque tout, et il te reste des pains (en excès). Le réactif limitant décide combien de produit on obtient." },
    { q: "La quantité de produit formé se calcule à partir :", opts: ["du réactif limitant", "du réactif en excès", "du produit le plus lourd", "de la température"], ans: 0, chapter: "stoechio", difficulty: "intermediaire", exp: "C'est le limitant qui détermine combien de produit on peut former." },
    { q: "50 g Fe (0,895 mol) + 50 g S (1,56 mol), réaction 1:1. Le limitant est :", opts: ["le fer", "le soufre", "aucun", "les deux"], ans: 0, chapter: "stoechio", difficulty: "difficile", exp: "0,895 mol < 1,56 mol → le fer s'épuise le premier : il est limitant (0,665 mol de S en excès)." },
    { q: "Où lit-on la masse molaire M d'un élément ?", opts: ["dans le tableau périodique", "dans l'énoncé seulement", "on l'invente", "sur la calculatrice"], ans: 0, chapter: "mole", difficulty: "facile", exp: "La masse molaire M (g/mol) se lit dans le tableau périodique." },
    { q: "Le nombre d'Avogadro Nₐ vaut environ :", opts: ["6,02·10²³ /mol", "3,14", "9,81", "1000"], ans: 0, chapter: "mole", difficulty: "intermediaire", exp: "Nₐ ≈ 6,02·10²³ : le nombre de particules dans une mole." },
    { q: "Une molécule, c'est…", opts: ["plusieurs atomes liés", "un seul électron", "un noyau seul", "une mole"], ans: 0, chapter: "mole", difficulty: "facile", exp: "Une molécule = plusieurs atomes liés (ex. H₂O = 2 H + 1 O)." },
    { q: "Qui a imaginé le tableau périodique ?", opts: ["Mendeleïev", "Avogadro", "Newton", "Lavoisier"], ans: 0, chapter: "mole", difficulty: "difficile", exp: "Dmitri Mendeleïev, en 1869 (avec des cases laissées vides)." }
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
    { front: "Loi des gaz parfaits ?", back: "P·V = n·R·T (R ≈ 0,082 L·atm/mol·K, T en kelvins)", chapter: "mole" },
    { front: "Volume molaire Vm d'un gaz ?", back: "V = n · Vm (et n = V / Vm). Vm = 22,4 L/mol aux CNTP (0 °C) · 24,5 L/mol aux CSTP (25 °C).", chapter: "mole" },
    { front: "Concentration molaire C = ?", back: "C = n / V (mol/L). Donc n = C · V et V = n / C.", chapter: "mole" },
    { front: "n = ? (quantité de matière)", back: "n = m / M (m en g, M masse molaire en g/mol). Et m = n · M.", chapter: "stoechio" },
    { front: "Étapes d'un problème stœchiométrique ?", back: "1) équation pondérée · 2) lecture molaire + données · 3) n = m/M · 4) proportions (n final) · 5) m = n·M.", chapter: "stoechio" },
    { front: "Réactif limitant ?", back: "Le réactif qui s'épuise en premier ; il fixe la quantité de produit formé.", chapter: "stoechio" },
    { front: "Réactif en excès ?", back: "Le réactif présent en trop : il en reste après la réaction.", chapter: "stoechio" },
    { front: "Pourquoi passer en moles ?", back: "Parce que l'équation pondérée raisonne en moles (coefficients) : on ne peut pas comparer directement des grammes.", chapter: "stoechio" },
    { front: "Où trouver la masse molaire M ?", back: "Dans le tableau périodique (sous chaque élément).", chapter: "mole" },
    { front: "Le nombre d'Avogadro ?", back: "Nₐ ≈ 6,02·10²³ : le nombre de particules contenues dans une mole.", chapter: "mole" },
    { front: "Qu'est-ce qu'un atome ?", back: "La plus petite particule d'un élément : un <strong>noyau</strong> (protons + neutrons) entouré d'<strong>électrons</strong>.<br><svg viewBox='0 0 210 162' width='180' style='max-width:100%;height:auto;margin-top:8px'><ellipse cx='105' cy='82' rx='95' ry='34' fill='none' stroke='#60a5fa' stroke-width='1.5'/><ellipse cx='105' cy='82' rx='34' ry='72' fill='none' stroke='#a78bfa' stroke-width='1.5'/><circle cx='99' cy='76' r='8' fill='#f87171'/><circle cx='112' cy='79' r='8' fill='#f87171'/><circle cx='100' cy='90' r='8' fill='#94a3b8'/><circle cx='113' cy='68' r='8' fill='#94a3b8'/><circle cx='11' cy='82' r='5' fill='#fbbf24'/><circle cx='199' cy='82' r='5' fill='#fbbf24'/><circle cx='105' cy='11' r='5' fill='#fbbf24'/><circle cx='105' cy='153' r='5' fill='#fbbf24'/><text x='150' y='44' fill='#f87171' font-size='10'>noyau</text><text x='150' y='140' fill='#fbbf24' font-size='10'>électrons</text></svg><br><em>Protons (rouges) + neutrons (gris) au centre ; électrons (jaunes) en orbite.</em>", chapter: "mole" }
  ];

  window.registerSubject('chimie', {
    subtitle: 'Chimie — UAA 3 · Ch.4 : pondération, combustions, mole & gaz',
    content: {
      sections: sections,
      questions: questions,
      flashcards: flashcards,
      demos: {},
      navLabels: { exercices: '🎯 Exercices' },
      chapOrder: ['ponderation', 'combustion', 'types', 'mole', 'stoechio'],
      chapLabels: { ponderation: 'Pondération', combustion: 'Combustions', types: 'Types de réactions', mole: 'Mole & gaz', stoechio: 'Stœchiométrie & réactif limitant' }
    }
  });
})();
