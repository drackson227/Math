/* GR2 Study — Contenu SCIENCES ÉCONOMIQUES (4ᵉ)
   Chapitre 1 : La mondialisation (flux mondiaux, la triade, acteurs, risques).
   Chapitre 2 : La responsabilité civile (conditions, types, dommages, réparation).
   S'enregistre auprès de subjects.js via window.registerSubject. */
(function () {
  'use strict';
  if (typeof window.registerSubject !== 'function') return;

  var sections = {};

  /* ---------------------- SYNTHÈSE (cours) ---------------------- */
  sections.synthese = `<div id="synthese" class="section active">
    <div style="text-align:center; margin-bottom:1.5rem;">
      <h2 style="font-size:30px; font-weight:800; color:var(--color-nav); margin:0;">💶 Sciences éco</h2>
      <p style="color:var(--text-secondary); margin-top:6px;">La mondialisation &amp; la responsabilité civile</p>
    </div>

    <div class="synth-section">
      <h2>1. Qu'est-ce que la mondialisation ?</h2>
      <p>La <strong>mondialisation</strong> est la mise en relation des différentes parties du monde par l'<strong>intensification des échanges</strong>. Le monde devient un seul grand marché où circulent en permanence des <strong>marchandises</strong>, des <strong>services</strong>, des <strong>capitaux</strong> (l'argent), des <strong>informations</strong> et des <strong>personnes</strong>. Résultat : les pays sont de plus en plus <strong>interdépendants</strong> (ils dépendent les uns des autres).</p>
      <p>Des marques présentes partout l'illustrent : Apple, Samsung, Instagram, CNN, le « Made in China »… Où que tu sois, tu consommes des produits venus du monde entier.</p>
      <div class="simple-exp-box">
        <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Comprendre simplement</button>
        <div class="simple-exp-content">Ton smartphone a été <em>pensé</em> dans un pays, ses <em>pièces</em> fabriquées dans plusieurs autres, et <em>assemblé</em> dans un dernier. Tu utilises donc un objet « mondial » sans bouger de chez toi : ça, c'est la mondialisation.</div>
      </div>
    </div>

    <div class="synth-section">
      <h2>2. Les flux mondiaux</h2>
      <p>Un <strong>flux</strong> = un déplacement, une circulation. On distingue :</p>
      <ul style="line-height:1.9;">
        <li><strong>Flux de marchandises</strong> : les biens matériels (voitures, vêtements, électronique…), transportés surtout par <strong>porte-conteneurs</strong>.</li>
        <li><strong>Flux de services</strong> : tourisme, banque, assurances, informatique…</li>
        <li><strong>Flux de capitaux</strong> : l'argent qui s'investit d'un pays à l'autre.</li>
        <li><strong>Flux d'informations</strong> : Internet, médias, données.</li>
        <li><strong>Flux humains</strong> : touristes, travailleurs, migrants.</li>
      </ul>
      <p>Les plus <strong>grands exportateurs de marchandises</strong> sont la <strong>Chine</strong> (1ᵉ⁰), les <strong>États-Unis</strong> et l'<strong>Allemagne</strong>.</p>
      <div class="key-rule"><div class="formula-main">Mondialisation = intensification des échanges (marchandises · services · capitaux · informations · personnes)</div></div>
    </div>

    <div class="synth-section">
      <h2>3. La Triade : les 3 grands pôles</h2>
      <p>Les échanges ne sont pas répartis de façon égale sur la planète. Ils se concentrent autour de <strong>trois grands pôles</strong> appelés la <strong>Triade</strong> :</p>
      <ul style="line-height:1.9;">
        <li>l'<strong>Amérique du Nord</strong> (États-Unis, Canada) ;</li>
        <li>l'<strong>Europe</strong> (de l'Ouest) ;</li>
        <li>l'<strong>Asie de l'Est</strong> (Japon, et de plus en plus la Chine).</li>
      </ul>
      <p>À eux seuls, ces trois pôles réalisent environ les <strong>¾ du commerce mondial</strong>. Une grande partie des échanges se fait même <strong>à l'intérieur</strong> de chaque pôle (commerce <strong>intra-régional</strong>).</p>
      <div class="eco-poles">
        <div class="eco-pole"><span class="eco-ico">🌎</span><strong>Amérique du Nord</strong></div>
        <div class="eco-pole"><span class="eco-ico">🌍</span><strong>Europe (de l'Ouest)</strong></div>
        <div class="eco-pole"><span class="eco-ico">🌏</span><strong>Asie de l'Est</strong></div>
      </div>
      <p style="text-align:center; font-size:13px; color:var(--text-secondary); margin:0;">≈ <strong>¾ du commerce mondial</strong> à eux trois</p>
      <div class="simple-exp-box">
        <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Pourquoi « triade » ?</button>
        <div class="simple-exp-content">« Triade » veut dire « groupe de trois ». Ce sont les trois régions les plus riches et les plus connectées : elles dominent les échanges mondiaux. Le reste du monde échange beaucoup moins (même si la Chine et d'autres pays montent très vite).</div>
      </div>
    </div>

    <div class="synth-section">
      <h2>4. Les acteurs et un exemple : l'iPhone</h2>
      <p>Les grands acteurs de la mondialisation sont les <strong>firmes multinationales</strong> (FMN, aussi appelées firmes transnationales / FTN) : des entreprises présentes dans plusieurs pays (Apple, Samsung, Nike…).</p>
      <p>Pour produire moins cher, elles répartissent les étapes de fabrication entre plusieurs pays : c'est la <strong>chaîne de valeur mondiale</strong>. Exemple de l'<strong>iPhone</strong> : <strong>conçu</strong> en Californie, ses <strong>composants</strong> viennent de nombreux pays, et il est <strong>assemblé</strong> en Chine.</p>
      <div class="eco-flow">
        <div class="eco-step"><span class="eco-ico">🎨</span><strong>Conçu</strong><span>Californie 🇺🇸</span></div>
        <div class="eco-arrow">→</div>
        <div class="eco-step"><span class="eco-ico">🔧</span><strong>Composants</strong><span>plusieurs pays 🌍</span></div>
        <div class="eco-arrow">→</div>
        <div class="eco-step"><span class="eco-ico">🏭</span><strong>Assemblé</strong><span>Chine 🇨🇳</span></div>
      </div>
      <p>La mondialisation est aussi <strong>à notre porte</strong> : le <strong>port d'Anvers</strong> (Belgique), l'un des plus grands ports d'Europe, a vu transiter environ <strong>278 millions de tonnes</strong> de marchandises en 2024.</p>
    </div>

    <div class="synth-section">
      <h2>5. ⚠️ Les 3 risques de la mondialisation</h2>
      <p>La mondialisation a des avantages (prix plus bas, choix, croissance), mais aussi <strong>trois grands risques</strong> à connaître par cœur :</p>
      <ul style="line-height:1.9;">
        <li><strong>Risque économique</strong> : la <strong>perte d'emplois</strong> dans les pays riches, à cause des <strong>délocalisations</strong> (les usines partent là où la main-d'œuvre coûte moins cher).</li>
        <li><strong>Risque social</strong> : l'<strong>augmentation des inégalités</strong>, de mauvaises <strong>conditions de travail</strong> (bas salaires, peu de droits) et une baisse de la solidarité.</li>
        <li><strong>Risque environnemental</strong> : l'impact de l'activité des entreprises sur l'environnement — <strong>pollution</strong> (transports, usines) et <strong>épuisement des ressources</strong> naturelles.</li>
      </ul>
      <div class="key-rule"><div class="formula-main">3 risques = Économique (emplois/délocalisation) · Social (inégalités) · Environnemental (pollution, ressources)</div></div>
    </div>

    <div class="synth-section">
      <h2>6. La responsabilité civile</h2>
      <p>La <strong>responsabilité civile</strong> est l'obligation de <strong>réparer le dommage</strong> que l'on cause à autrui (à quelqu'un d'autre). C'est le principe de l'article <strong>1382</strong> de l'ancien Code civil : « tout fait de l'homme qui cause à autrui un dommage oblige celui par la faute duquel il est arrivé à le réparer ».</p>
      <p>Pour qu'il y ait responsabilité civile, il faut réunir <strong>3 conditions</strong> en même temps :</p>
      <ul style="line-height:1.9;">
        <li>une <strong>faute</strong> (ou un fait : une imprudence, une négligence, un acte) ;</li>
        <li>un <strong>dommage</strong> (un préjudice subi par la victime) ;</li>
        <li>un <strong>lien de causalité</strong> entre les deux (la faute a bien <em>causé</em> le dommage).</li>
      </ul>
      <div class="eco-flow">
        <div class="eco-step"><span class="eco-ico">⚠️</span><strong>Faute</strong><span>(ou un fait)</span></div>
        <div class="eco-arrow">+</div>
        <div class="eco-step"><span class="eco-ico">💥</span><strong>Dommage</strong><span>(préjudice subi)</span></div>
        <div class="eco-arrow">+</div>
        <div class="eco-step"><span class="eco-ico">🔗</span><strong>Lien de causalité</strong><span>la faute cause le dommage</span></div>
        <div class="eco-arrow">→</div>
        <div class="eco-step" style="border-left-color:var(--color-parabole);"><span class="eco-ico">⚖️</span><strong style="color:var(--color-parabole);">Réparation</strong><span>dommages-intérêts</span></div>
      </div>
      <p>On distingue plusieurs cas :</p>
      <ul style="line-height:1.9;">
        <li><strong>Du fait personnel</strong> : on répond de ses propres actes.</li>
        <li><strong>Du fait d'autrui</strong> : les <strong>parents</strong> répondent de leurs enfants mineurs, les <strong>instituteurs</strong> de leurs élèves, l'<strong>employeur</strong> (commettant) de ses employés (préposés).</li>
        <li><strong>Du fait des choses</strong> : le <strong>gardien</strong> d'une chose répond des dommages qu'elle cause (ex. une tuile qui tombe du toit).</li>
      </ul>
      <p><strong>Les 3 types de dommages réparables</strong> : <strong>matériel</strong> (dégâts aux biens), <strong>corporel</strong> (atteinte au corps, blessures) et <strong>moral</strong> (souffrance, peine). Le dommage doit être <strong>certain</strong> : un dommage seulement <strong>hypothétique</strong> (incertain) ne peut pas être réparé. La réparation se fait en général par des <strong>dommages-intérêts</strong> (une somme d'argent).</p>
      <div class="simple-exp-box">
        <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Civil ≠ pénal · et l'âge ?</button>
        <div class="simple-exp-content">La responsabilité <strong>civile</strong> sert à <em>réparer</em> le dommage de la victime (payer). La responsabilité <strong>pénale</strong> sert à <em>punir</em> une infraction au nom de la société (amende, prison). — En Belgique, il n'y a <strong>pas d'âge fixe</strong> pour être responsable civilement : ce qui compte est le <strong>discernement</strong> (être capable de comprendre la portée de ses actes), apprécié par le juge. Une <strong>assurance RC</strong> (ex. la RC familiale) sert justement à couvrir ces dommages.</div>
      </div>
    </div>
  </div>`;

  /* ---------------------- REPÈRES ---------------------- */
  sections.formules = `<div id="formules" class="section">
    <h2 style="font-size:30px; font-weight:800; color:var(--color-nav); margin-bottom:1rem;">📌 Repères à connaître</h2>
    <div class="formula-grid">
      <div>
        <div class="formula-box"><h3>Mondialisation</h3><div class="formula-main" style="font-size:16px;">Intensification des échanges mondiaux</div><p class="note">Marchandises · services · capitaux · informations · personnes → <strong>interdépendance</strong>.</p></div>
        <div class="formula-box"><h3>Les 5 types de flux</h3><p style="line-height:1.9; margin:0;">Marchandises · Services · Capitaux · Informations · Humains (migrations)</p></div>
        <div class="formula-box"><h3>La Triade</h3><div class="formula-main" style="font-size:17px;">Amérique du Nord · Europe · Asie de l'Est</div><p class="note">≈ <strong>¾ du commerce mondial</strong>. Beaucoup d'échanges <strong>intra-régionaux</strong>.</p></div>
        <div class="formula-box"><h3>Grands exportateurs</h3><div class="formula-main" style="font-size:18px;">Chine · États-Unis · Allemagne</div><p class="note">La <strong>Chine</strong> = 1ᵉ⁰ exportateur de marchandises.</p></div>
        <div class="formula-box"><h3>Acteurs &amp; exemple</h3><p style="line-height:1.9; margin:0;"><strong>FMN</strong> (firmes multinationales). <strong>iPhone</strong> : conçu en Californie, composants du monde, assemblé en Chine. <strong>Port d'Anvers</strong> ≈ 278 Mt (2024).</p></div>
      </div>
      <div>
        <div class="formula-box"><h3>⚠️ Les 3 risques</h3><p style="line-height:1.9; margin:0;"><strong>Économique</strong> : perte d'emplois (délocalisations).<br><strong>Social</strong> : inégalités, conditions de travail.<br><strong>Environnemental</strong> : pollution, épuisement des ressources.</p></div>
        <div class="formula-box"><h3>Responsabilité civile</h3><div class="formula-main" style="font-size:15px;">Obligation de réparer le dommage causé à autrui</div><p class="note">Principe : article 1382 de l'ancien Code civil.</p></div>
        <div class="formula-box"><h3>Les 3 conditions</h3><div class="formula-main" style="font-size:17px;">Faute + Dommage + Lien de causalité</div><p class="note">Les trois doivent être réunis en même temps.</p></div>
        <div class="formula-box"><h3>Types de responsabilité</h3><p style="line-height:1.9; margin:0;">Du <strong>fait personnel</strong> · du <strong>fait d'autrui</strong> (parents, instituteurs, employeur) · du <strong>fait des choses</strong> (gardien).</p></div>
        <div class="formula-box"><h3>Les 3 dommages</h3><div class="formula-main" style="font-size:17px;">Matériel · Corporel · Moral</div><p class="note">Le dommage doit être <strong>certain</strong> (≠ hypothétique). Réparation = <strong>dommages-intérêts</strong>.</p></div>
      </div>
    </div>
  </div>`;

  /* ---------------------- MÉTHODE ---------------------- */
  sections.methodes = `<div id="methodes" class="section">
    <h2 style="font-size:30px; font-weight:800; color:var(--color-nav); margin-bottom:1rem;">📝 Méthode</h2>

    <div class="synth-section">
      <h2>Analyser un document économique (carte, graphique)</h2>
      <div class="step-item"><div class="step-num">1</div><div class="step-text"><strong>Lire le titre et la source</strong> : de quoi parle le document ? d'où vient-il, de quand date-t-il ?</div></div>
      <div class="step-item"><div class="step-num">2</div><div class="step-text"><strong>Lire la légende</strong> : que représentent les couleurs, les flèches, la taille des symboles ?</div></div>
      <div class="step-item"><div class="step-num">3</div><div class="step-text"><strong>Décrire</strong> ce qu'on voit (qui exporte le plus ? vers où vont les flux ?).</div></div>
      <div class="step-item"><div class="step-num">4</div><div class="step-text"><strong>Interpréter</strong> : relier à la mondialisation (triade, interdépendance, risques).</div></div>
    </div>

    <div class="synth-section">
      <h2>Résoudre un cas de responsabilité civile</h2>
      <div class="step-item"><div class="step-num">1</div><div class="step-text"><strong>Y a-t-il une faute</strong> (ou un fait) ? Qui l'a commise ?</div></div>
      <div class="step-item"><div class="step-num">2</div><div class="step-text"><strong>Y a-t-il un dommage</strong> ? De quel type (matériel, corporel, moral) ? Est-il <strong>certain</strong> ?</div></div>
      <div class="step-item"><div class="step-num">3</div><div class="step-text"><strong>Y a-t-il un lien de causalité</strong> entre la faute et le dommage ?</div></div>
      <div class="step-item"><div class="step-num">4</div><div class="step-text"><strong>Qui est responsable</strong> ? (fait personnel, parents, employeur, gardien de la chose) → la victime obtient des <strong>dommages-intérêts</strong>.</div></div>
    </div>
  </div>`;

  /* ---------------------- EXERCICES ---------------------- */
  sections.exercices = `<div id="exercices" class="section">
    <h2 style="font-size:30px; font-weight:800; color:var(--color-nav); margin-bottom:1rem;">🎯 Exercices</h2>
    <p style="color:var(--text-secondary); margin-bottom:1.2rem;">Essaie de répondre de tête, puis vérifie.</p>

    <div class="exercise-card">
      <h3 style="font-size:20px; font-weight:600; color:var(--color-nav);">📋 À retenir par cœur</h3>
      <ul style="line-height:2;">
        <li>Définis la <strong>mondialisation</strong> en une phrase.</li>
        <li>Cite les <strong>5 types de flux</strong>.</li>
        <li>Nomme les <strong>3 pôles de la Triade</strong> et le 1ᵉ⁰ exportateur mondial.</li>
        <li>Explique la <strong>chaîne de valeur</strong> avec l'exemple de l'iPhone.</li>
        <li>Donne les <strong>3 risques</strong> de la mondialisation.</li>
        <li>Cite les <strong>3 conditions</strong> de la responsabilité civile et les <strong>3 types de dommages</strong>.</li>
      </ul>
      <p style="color:var(--text-secondary);">👉 Le <strong>Quiz</strong> et les <strong>Flashcards</strong> (en haut) testent tout ça automatiquement.</p>
    </div>

    <div class="exercise-card">
      <h3 style="font-size:20px; font-weight:600; color:var(--color-nav);">⚖️ Cas pratiques — qui est responsable ?</h3>
      <ul style="line-height:2;">
        <li>Un enfant de 6 ans casse la vitre du voisin en jouant au ballon. → ses <strong>parents</strong> (responsabilité du fait d'autrui).</li>
        <li>Une tuile se détache d'un toit et abîme une voiture. → le <strong>gardien</strong> de la chose (le propriétaire).</li>
        <li>Un livreur, pendant son travail, renverse un piéton. → son <strong>employeur</strong> (commettant), en plus du livreur.</li>
        <li>« J'aurais peut-être gagné au loto si… » → dommage <strong>hypothétique</strong> : <strong>non réparable</strong> (pas certain).</li>
      </ul>
    </div>

    <div class="exercise-card">
      <h3 style="font-size:20px; font-weight:600; color:var(--color-nav);">🌍 Mondialisation : avantage ou risque ?</h3>
      <ul style="line-height:2;">
        <li>Produits moins chers et plus de choix → <strong>✅ avantage</strong></li>
        <li>Délocalisations et pertes d'emplois → <strong>❌ risque (économique)</strong></li>
        <li>Croissance et développement de certains pays → <strong>✅ avantage</strong></li>
        <li>Pollution due aux transports → <strong>❌ risque (environnemental)</strong></li>
        <li>Mauvaises conditions de travail, inégalités → <strong>❌ risque (social)</strong></li>
      </ul>
    </div>
  </div>`;

  /* ---------------------- ERREURS ---------------------- */
  sections.erreurs = `<div id="erreurs" class="section">
    <h2 style="font-size:30px; font-weight:800; color:var(--color-nav); margin-bottom:1rem;">⚠️ Pièges fréquents</h2>
    <div class="formula-grid">
      <div class="formula-box"><h3>❌ Confondre les 3 risques</h3><p><strong>Économique</strong> = emplois/délocalisation · <strong>Social</strong> = inégalités/conditions de travail · <strong>Environnemental</strong> = pollution/ressources. Ne les mélange pas.</p></div>
      <div class="formula-box"><h3>❌ « La Triade = 3 pays »</h3><p>Non : ce sont <strong>3 pôles (régions)</strong> — Amérique du Nord, Europe, Asie de l'Est — pas 3 pays.</p></div>
      <div class="formula-box"><h3>❌ Oublier le lien de causalité</h3><p>Une faute + un dommage ne suffisent pas : il faut prouver que la faute a bien <strong>causé</strong> le dommage (les <strong>3</strong> conditions ensemble).</p></div>
      <div class="formula-box"><h3>❌ Réparer un dommage hypothétique</h3><p>Un dommage seulement possible/incertain n'est <strong>pas réparable</strong> : il doit être <strong>certain</strong>.</p></div>
      <div class="formula-box"><h3>❌ Confondre civil et pénal</h3><p><strong>Civil</strong> = réparer (payer la victime). <strong>Pénal</strong> = punir une infraction (amende, prison) au nom de la société.</p></div>
    </div>
  </div>`;

  /* ---------------------- QUIZ ---------------------- */
  var questions = [
    { q: "La mondialisation, c'est avant tout :", opts: ["l'intensification des échanges entre les parties du monde", "la fin du commerce international", "un pays qui se ferme aux autres", "une monnaie unique mondiale"], ans: 0, chapter: "mondialisation", difficulty: "facile", exp: "Mondialisation = mise en relation du monde par l'intensification des échanges (marchandises, services, capitaux, informations, personnes).", simple: "C'est l'idée que tout circule de plus en plus entre les pays : produits, argent, infos, gens. Le monde devient un seul grand marché connecté." },
    { q: "Lequel n'est PAS un type de flux mondial ?", opts: ["les flux de montagnes", "les flux de marchandises", "les flux de capitaux", "les flux d'informations"], ans: 0, chapter: "mondialisation", difficulty: "facile", exp: "Les flux = marchandises, services, capitaux, informations et personnes. « Montagnes » n'a aucun sens ici." },
    { q: "Le 1ᵉ⁰ exportateur mondial de marchandises est :", opts: ["la Chine", "la Belgique", "le Brésil", "la Russie"], ans: 0, chapter: "mondialisation", difficulty: "facile", exp: "La Chine est le 1ᵉ⁰ exportateur de marchandises, devant les États-Unis et l'Allemagne." },
    { q: "La « Triade » désigne :", opts: ["Amérique du Nord, Europe, Asie de l'Est", "France, Chine, Brésil", "les 3 océans", "3 entreprises"], ans: 0, chapter: "mondialisation", difficulty: "intermediaire", exp: "La Triade = les 3 grands pôles économiques : Amérique du Nord, Europe (de l'Ouest) et Asie de l'Est.", simple: "« Triade » = groupe de trois. Ce sont les 3 régions les plus riches et connectées du monde, qui dominent les échanges." },
    { q: "Les pôles de la Triade réalisent environ :", opts: ["les ¾ du commerce mondial", "10 % du commerce mondial", "la moitié de la population", "rien du tout"], ans: 0, chapter: "mondialisation", difficulty: "intermediaire", exp: "À eux seuls, ils concentrent environ les ¾ des échanges mondiaux, avec beaucoup de commerce intra-régional." },
    { q: "Une firme multinationale (FMN) est :", opts: ["une entreprise présente dans plusieurs pays", "une banque belge", "un syndicat", "un port"], ans: 0, chapter: "mondialisation", difficulty: "facile", exp: "Les FMN (ou FTN) sont les grands acteurs de la mondialisation : Apple, Samsung, Nike… présentes dans de nombreux pays." },
    { q: "L'iPhone illustre la chaîne de valeur mondiale car il est :", opts: ["conçu en Californie, assemblé en Chine, avec des composants de partout", "fabriqué entièrement en Belgique", "vendu seulement aux États-Unis", "produit sans aucune usine"], ans: 0, chapter: "mondialisation", difficulty: "intermediaire", exp: "Chaîne de valeur mondiale : chaque étape se fait là où c'est le plus avantageux (conception, composants, assemblage).", simple: "Au lieu de tout faire au même endroit, on découpe la fabrication entre plein de pays pour produire moins cher. L'iPhone en est l'exemple type." },
    { q: "Le port d'Anvers montre que la mondialisation :", opts: ["est aussi présente près de chez nous (Belgique)", "n'existe qu'en Asie", "est interdite en Europe", "concerne seulement Internet"], ans: 0, chapter: "mondialisation", difficulty: "facile", exp: "Anvers, l'un des plus grands ports d'Europe (≈ 278 Mt en 2024), est la « mondialisation à notre porte »." },
    { q: "Le risque ÉCONOMIQUE de la mondialisation, c'est surtout :", opts: ["la perte d'emplois due aux délocalisations", "la pollution des océans", "la disparition des langues", "le réchauffement climatique"], ans: 0, chapter: "mondialisation", difficulty: "intermediaire", exp: "Risque économique = perte d'emplois quand les usines se délocalisent là où la main-d'œuvre est moins chère.", simple: "Les entreprises déménagent leurs usines là où ça coûte moins cher → des gens perdent leur travail dans les pays riches. C'est le risque économique." },
    { q: "Le risque ENVIRONNEMENTAL de la mondialisation, c'est :", opts: ["la pollution et l'épuisement des ressources", "la hausse des salaires", "trop de vacances", "moins de transport"], ans: 0, chapter: "mondialisation", difficulty: "intermediaire", exp: "Risque environnemental = pollution (transports, usines) et surexploitation/épuisement des ressources naturelles." },
    { q: "Le risque SOCIAL de la mondialisation, c'est :", opts: ["les inégalités et les mauvaises conditions de travail", "la baisse des prix", "plus de choix de produits", "l'invention d'Internet"], ans: 0, chapter: "mondialisation", difficulty: "intermediaire", exp: "Risque social = creusement des inégalités, bas salaires et mauvaises conditions de travail dans certains pays." },
    { q: "Un porte-conteneurs sert surtout à transporter :", opts: ["des marchandises", "des informations", "des capitaux", "des touristes"], ans: 0, chapter: "mondialisation", difficulty: "facile", exp: "Les marchandises voyagent surtout par bateau, dans des conteneurs (flux de marchandises)." },
    { q: "« Interdépendance » des pays signifie :", opts: ["ils dépendent les uns des autres", "ils sont totalement isolés", "ils ont la même langue", "ils ont la même monnaie"], ans: 0, chapter: "mondialisation", difficulty: "facile", exp: "Avec la mondialisation, chaque pays dépend des autres (pour produire, vendre, s'approvisionner)." },
    { q: "La responsabilité civile, c'est l'obligation de :", opts: ["réparer le dommage causé à autrui", "aller en prison", "payer une amende à l'État", "passer un examen"], ans: 0, chapter: "responsabilite", difficulty: "facile", exp: "Responsabilité civile = réparer le dommage causé à quelqu'un d'autre (principe de l'article 1382 de l'ancien Code civil).", simple: "Si tu causes un dommage à quelqu'un, tu dois le « réparer » — en général en payant. C'est ça la responsabilité civile." },
    { q: "Quelles sont les 3 conditions de la responsabilité civile ?", opts: ["une faute, un dommage, un lien de causalité", "un contrat, un juge, un avocat", "un témoin, une preuve, un aveu", "une assurance, un constat, une plainte"], ans: 0, chapter: "responsabilite", difficulty: "intermediaire", exp: "Il faut les 3 ensemble : une faute (ou un fait), un dommage, et un lien de causalité entre les deux.", simple: "Pour être responsable il faut : (1) avoir fait quelque chose de fautif, (2) que ça crée un dommage, (3) que ton acte soit bien la cause du dommage. Les trois en même temps." },
    { q: "Si une faute et un dommage existent mais SANS lien entre eux :", opts: ["il n'y a pas de responsabilité civile", "la responsabilité est automatique", "on va forcément en prison", "le dommage double"], ans: 0, chapter: "responsabilite", difficulty: "intermediaire", exp: "Sans lien de causalité (la faute n'a pas causé le dommage), une des 3 conditions manque → pas de responsabilité." },
    { q: "Les parents qui répondent des actes de leur enfant, c'est la responsabilité :", opts: ["du fait d'autrui", "du fait personnel", "du fait des choses", "pénale"], ans: 0, chapter: "responsabilite", difficulty: "intermediaire", exp: "Responsabilité du fait d'autrui : parents (enfants), instituteurs (élèves), employeur/commettant (employés/préposés)." },
    { q: "Une tuile tombe d'un toit et abîme une voiture. C'est la responsabilité :", opts: ["du fait des choses (le gardien)", "du fait personnel", "du fait d'autrui", "de la victime"], ans: 0, chapter: "responsabilite", difficulty: "intermediaire", exp: "Responsabilité du fait des choses : le gardien de la chose répond des dommages qu'elle cause." },
    { q: "Lequel n'est PAS un type de dommage réparable ?", opts: ["le dommage imaginaire", "le dommage matériel", "le dommage corporel", "le dommage moral"], ans: 0, chapter: "responsabilite", difficulty: "facile", exp: "Les 3 types réparables : matériel (biens), corporel (corps), moral (souffrance). Un dommage imaginaire n'est pas réparable." },
    { q: "Un dommage seulement HYPOTHÉTIQUE (incertain) :", opts: ["ne peut pas être réparé", "est toujours réparé", "double la sanction", "devient pénal"], ans: 0, chapter: "responsabilite", difficulty: "intermediaire", exp: "Le dommage doit être CERTAIN. Un dommage hypothétique (qui n'est peut-être jamais arrivé) n'est pas réparable.", simple: "On ne répare que des dommages réels et sûrs. Un « peut-être que j'aurais perdu de l'argent » ne compte pas : c'est trop incertain." },
    { q: "La réparation d'un dommage se fait souvent par :", opts: ["des dommages-intérêts (une somme d'argent)", "une peine de prison", "un avertissement scolaire", "rien du tout"], ans: 0, chapter: "responsabilite", difficulty: "facile", exp: "La victime est indemnisée, en général par des dommages-intérêts (réparation par équivalent)." },
    { q: "Différence entre responsabilité civile et pénale ?", opts: ["civile = réparer la victime ; pénale = punir l'infraction", "elles sont identiques", "civile = prison ; pénale = argent", "la civile n'existe qu'au travail"], ans: 0, chapter: "responsabilite", difficulty: "intermediaire", exp: "Civile = réparer le dommage (dommages-intérêts) ; pénale = sanctionner une infraction (amende, prison) au nom de la société.", simple: "Le civil, c'est pour dédommager la victime (payer). Le pénal, c'est pour punir celui qui a enfreint la loi (amende ou prison)." },
    { q: "En Belgique, à partir de quel âge est-on responsable civilement ?", opts: ["il n'y a pas d'âge fixe : c'est le discernement qui compte", "exactement 18 ans", "exactement 12 ans", "dès la naissance"], ans: 0, chapter: "responsabilite", difficulty: "difficile", exp: "Pas d'âge légal précis : on regarde si l'enfant avait le discernement (capacité de comprendre la portée de ses actes), apprécié par le juge." },
    { q: "Une assurance « RC familiale » sert à :", opts: ["couvrir les dommages causés à autrui par les membres de la famille", "rembourser tes propres vacances", "payer tes amendes pénales", "garantir un salaire"], ans: 0, chapter: "responsabilite", difficulty: "intermediaire", exp: "L'assurance responsabilité civile (RC) prend en charge la réparation des dommages que tu (ou ta famille) causes à autrui." }
  ];

  /* ---------------------- FLASHCARDS ---------------------- */
  var flashcards = [
    { front: "Qu'est-ce que la mondialisation ?", back: "La mise en relation des parties du monde par l'<strong>intensification des échanges</strong> (marchandises, services, capitaux, informations, personnes) → <strong>interdépendance</strong> des pays.", chapter: "mondialisation" },
    { front: "Les 5 types de flux mondiaux ?", back: "<strong>Marchandises</strong>, <strong>services</strong>, <strong>capitaux</strong> (argent), <strong>informations</strong>, <strong>personnes</strong> (migrations).", chapter: "mondialisation" },
    { front: "Les 3 plus grands exportateurs de marchandises ?", back: "La <strong>Chine</strong> (1ᵉ⁰), les <strong>États-Unis</strong>, l'<strong>Allemagne</strong>.", chapter: "mondialisation" },
    { front: "Qu'est-ce que la Triade ?", back: "Les <strong>3 grands pôles</strong> économiques : <strong>Amérique du Nord</strong>, <strong>Europe</strong>, <strong>Asie de l'Est</strong>. Ils font ≈ <strong>¾ du commerce mondial</strong> (beaucoup d'échanges intra-régionaux).", chapter: "mondialisation" },
    { front: "Qu'est-ce qu'une firme multinationale (FMN) ?", back: "Une entreprise présente dans <strong>plusieurs pays</strong> (Apple, Samsung, Nike…). Ce sont les grands <strong>acteurs</strong> de la mondialisation.", chapter: "mondialisation" },
    { front: "La chaîne de valeur mondiale (ex. iPhone) ?", back: "Répartir les <strong>étapes de fabrication</strong> entre plusieurs pays pour produire moins cher. iPhone : <strong>conçu</strong> en Californie, <strong>composants</strong> du monde entier, <strong>assemblé</strong> en Chine.", chapter: "mondialisation" },
    { front: "Pourquoi parle-t-on du port d'Anvers ?", back: "C'est l'un des plus grands ports d'Europe (≈ <strong>278 millions de tonnes</strong> en 2024) : la « <strong>mondialisation à notre porte</strong> » (Belgique).", chapter: "mondialisation" },
    { front: "Les 3 risques de la mondialisation ?", back: "<strong>Économique</strong> : perte d'emplois (délocalisations).<br><strong>Social</strong> : inégalités, mauvaises conditions de travail.<br><strong>Environnemental</strong> : pollution, épuisement des ressources.", chapter: "mondialisation" },
    { front: "Risque économique de la mondialisation ?", back: "La <strong>perte d'emplois</strong> dans les pays riches à cause des <strong>délocalisations</strong> (usines déplacées où la main-d'œuvre coûte moins cher).", chapter: "mondialisation" },
    { front: "Risque environnemental de la mondialisation ?", back: "L'impact des entreprises sur l'environnement : <strong>pollution</strong> (transports, usines) et <strong>épuisement des ressources</strong> naturelles.", chapter: "mondialisation" },
    { front: "2 avantages de la mondialisation ?", back: "Des produits <strong>moins chers</strong> et un plus grand <strong>choix</strong> ; de la <strong>croissance</strong> et du développement pour certains pays.", chapter: "mondialisation" },
    { front: "Qu'est-ce que la responsabilité civile ?", back: "L'obligation de <strong>réparer le dommage</strong> causé à autrui (principe de l'<strong>article 1382</strong> de l'ancien Code civil).", chapter: "responsabilite" },
    { front: "Les 3 conditions de la responsabilité civile ?", back: "Une <strong>faute</strong> (ou un fait), un <strong>dommage</strong>, et un <strong>lien de causalité</strong> entre les deux. Les trois en même temps.", chapter: "responsabilite" },
    { front: "Responsabilité du fait personnel / d'autrui / des choses ?", back: "<strong>Fait personnel</strong> : ses propres actes. <strong>Fait d'autrui</strong> : parents (enfants), instituteurs (élèves), employeur (employés). <strong>Fait des choses</strong> : le <strong>gardien</strong> de la chose.", chapter: "responsabilite" },
    { front: "Les 3 types de dommages réparables ?", back: "<strong>Matériel</strong> (dégâts aux biens), <strong>corporel</strong> (atteinte au corps), <strong>moral</strong> (souffrance, peine).", chapter: "responsabilite" },
    { front: "Un dommage hypothétique est-il réparable ?", back: "<strong>Non.</strong> Le dommage doit être <strong>certain</strong> (réel). Un dommage seulement incertain/possible n'est pas réparable.", chapter: "responsabilite" },
    { front: "Comment répare-t-on un dommage ?", back: "En général par des <strong>dommages-intérêts</strong> (une somme d'argent versée à la victime).", chapter: "responsabilite" },
    { front: "Responsabilité civile vs pénale ?", back: "<strong>Civile</strong> = réparer le dommage de la victime (dommages-intérêts). <strong>Pénale</strong> = punir une infraction au nom de la société (amende, prison).", chapter: "responsabilite" },
    { front: "À quel âge est-on responsable civilement (Belgique) ?", back: "Pas d'<strong>âge fixe</strong> : ce qui compte est le <strong>discernement</strong> (comprendre la portée de ses actes), apprécié par le juge.", chapter: "responsabilite" },
    { front: "À quoi sert une assurance RC ?", back: "L'assurance <strong>responsabilité civile</strong> (ex. RC familiale) <strong>couvre les dommages</strong> que tu causes à autrui.", chapter: "responsabilite" }
  ];

  window.registerSubject('eco', {
    subtitle: 'Sciences éco (4ᵉ) — la mondialisation & la responsabilité civile',
    content: {
      sections: sections,
      questions: questions,
      flashcards: flashcards,
      demos: {},
      navLabels: { formules: '📌 Repères', exercices: '🎯 Exercices' },
      chapOrder: ['mondialisation', 'responsabilite'],
      chapLabels: { mondialisation: 'La mondialisation', responsabilite: 'Responsabilité civile' }
    }
  });
})();
