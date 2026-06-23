/* GR2 Study — Contenu SCIENCES ÉCONOMIQUES (4ᵉ)
   Chapitre 1 : La mondialisation (flux mondiaux, la triade, acteurs, risques).
   Chapitre 2 : La responsabilité civile (conditions, types, dommages, réparation).
   S'enregistre auprès de subjects.js via window.registerSubject. */
(function () {
  'use strict';
  if (typeof window.registerSubject !== 'function') return;

  /* Fiches cliquables (notions d'éco) — apparaissent dans l'Index des fiches. */
  window.INFO_TOPICS = window.INFO_TOPICS || {};
  Object.assign(window.INFO_TOPICS, {
    "mondialisation": {
      title: "La mondialisation", sub: "échanges mondiaux · la Triade",
      cours: "<p>Mise en relation des parties du monde par l'<strong>intensification des échanges</strong> : marchandises, services, capitaux, informations, personnes. Les pays deviennent <strong>interdépendants</strong>.</p>",
      exam: "<ul><li>5 types de <strong>flux</strong> : marchandises, services, capitaux, informations, personnes.</li><li><strong>Triade</strong> = les 3 pôles dominants (Amérique du Nord, Europe, Asie de l'Est).</li></ul>"
    },
    "responsabilite-civile": {
      title: "La responsabilité civile", sub: "réparer le dommage causé à autrui",
      cours: "<p>Obligation de <strong>réparer le dommage</strong> causé à autrui. Trois <strong>conditions</strong> : une <strong>faute</strong>, un <strong>dommage</strong>, et un <strong>lien de causalité</strong> entre les deux.</p>",
      exam: "<ul><li>3 conditions : faute + dommage + lien de causalité.</li><li>3 types de dommages : <strong>matériel</strong>, <strong>corporel</strong>, <strong>moral</strong>.</li><li>Civil (réparer, indemniser) ≠ pénal (punir).</li></ul>"
    },
    "modes-de-preuve": {
      title: "Les modes de preuve", sub: "droit civil belge · art. 8.4",
      cours: "<p>Comment prouver un droit devant un juge : <strong>écrit</strong> (acte authentique / sous signature privée), <strong>témoignage</strong>, <strong>présomptions</strong>, <strong>aveu</strong>, <strong>serment</strong>. La charge de la preuve pèse sur <strong>celui qui réclame</strong> l'exécution d'une obligation (art. 8.4).</p>",
      exam: "<ul><li>5 modes : écrit · témoignage · présomptions · aveu · serment.</li><li>Au-dessus de <strong>3 500 €</strong> : un écrit est exigé en principe.</li><li>Acte <strong>authentique</strong> (notaire) vs <strong>sous signature privée</strong>.</li></ul>"
    },
    "obligations-modalites": {
      title: "Les modalités des obligations", sub: "terme · condition · solidarité",
      cours: "<p>Une obligation peut être aménagée : <strong>terme</strong> (suspensif / extinctif — événement <em>certain</em>), <strong>condition</strong> (suspensive / résolutoire — événement <em>incertain</em>), <strong>solidarité</strong> (active / passive), <strong>indivisibilité</strong>.</p>",
      exam: "<ul><li>Terme = certain · condition = incertain.</li><li>Solidarité <strong>passive</strong> : chaque débiteur peut être tenu du tout.</li></ul>"
    },
    "contrats": {
      title: "Le droit des contrats", sub: "validité · vices du consentement",
      cours: "<p>« Le contrat, ou convention, est un <strong>accord de volontés entre deux ou plusieurs personnes</strong> avec l'intention de <strong>faire naître des effets de droit</strong> » (art. 5.4). Il repose sur l'<strong>autonomie de la volonté</strong> (liberté contractuelle). Vices du consentement : <strong>erreur</strong>, <strong>dol</strong>, <strong>violence</strong>.</p>",
      exam: "<ul><li>3 vices : erreur · dol · violence.</li><li>Lois <strong>impératives</strong> (on ne peut pas y déroger) vs <strong>supplétives</strong>.</li></ul>"
    }
  });
  window.INFO_THEME = window.INFO_THEME || {};
  Object.assign(window.INFO_THEME, {
    "mondialisation": "eco", "responsabilite-civile": "eco", "modes-de-preuve": "eco",
    "obligations-modalites": "eco", "contrats": "eco"
  });

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
      <h2>2. Les flux mondiaux &amp; la balance commerciale</h2>
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

      <h3 style="font-size:18px; color:var(--color-nav); margin:1.1rem 0 .3rem;">📊 La balance commerciale</h3>
      <p>La <strong>balance commerciale</strong> d'un pays est la <strong>différence</strong> entre la valeur de ses <strong>exportations (X)</strong> et de ses <strong>importations (M)</strong> de marchandises, sur une période donnée.</p>
      <svg viewBox="0 0 300 165" width="280" style="max-width:100%;height:auto;margin:8px 0 4px" role="img" aria-label="Balance commerciale : exportations X contre importations M">
        <text x="150" y="16" fill="#e5e7eb" font-size="13" text-anchor="middle" font-weight="bold">Solde = X − M</text>
        <line x1="150" y1="28" x2="150" y2="120" stroke="#9ca3af" stroke-width="3"/>
        <line x1="118" y1="122" x2="182" y2="122" stroke="#9ca3af" stroke-width="3"/>
        <circle cx="150" cy="32" r="4" fill="#9ca3af"/>
        <line x1="78" y1="44" x2="222" y2="52" stroke="#60a5fa" stroke-width="3"/>
        <line x1="78" y1="44" x2="78" y2="74" stroke="#6b7280" stroke-width="1.5"/>
        <path d="M58,74 a20,11 0 0 0 40,0 z" fill="rgba(52,211,153,.18)" stroke="#34d399" stroke-width="1.5"/>
        <text x="78" y="98" fill="#6ee7b7" font-size="13" text-anchor="middle" font-weight="bold">X</text>
        <text x="78" y="113" fill="#9ca3af" font-size="10" text-anchor="middle">exportations</text>
        <line x1="222" y1="52" x2="222" y2="78" stroke="#6b7280" stroke-width="1.5"/>
        <path d="M202,78 a20,11 0 0 0 40,0 z" fill="rgba(248,113,113,.16)" stroke="#f87171" stroke-width="1.5"/>
        <text x="222" y="102" fill="#fca5a5" font-size="13" text-anchor="middle" font-weight="bold">M</text>
        <text x="222" y="117" fill="#9ca3af" font-size="10" text-anchor="middle">importations</text>
      </svg>
      <ul style="line-height:1.9;">
        <li><strong>X &gt; M</strong> → <strong>excédent</strong> commercial (le pays vend plus qu'il n'achète) ;</li>
        <li><strong>X &lt; M</strong> → <strong>déficit</strong> commercial (il achète plus qu'il ne vend) ;</li>
        <li><strong>X = M</strong> → balance <strong>équilibrée</strong>.</li>
      </ul>
      <div class="key-rule"><div class="formula-main">Balance commerciale = Exportations (X) − Importations (M)</div></div>
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
      <p>Pour produire moins cher, les FMN pratiquent souvent la <strong>délocalisation</strong> :</p>
      <div class="key-rule"><div class="formula-main">Délocalisation = transférer une activité (production, service) vers un autre pays où les coûts (main-d'œuvre) sont plus faibles</div></div>
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
      <p>La <strong>responsabilité civile</strong> est l'obligation de <strong>réparer le dommage</strong> que l'on cause à autrui (à quelqu'un d'autre). Son <strong>but</strong> est d'<strong>indemniser la victime</strong> pour le préjudice subi (alors que la responsabilité <strong>pénale</strong> vise à <strong>punir</strong> l'auteur d'une infraction — les deux peuvent d'ailleurs <strong>coexister</strong> pour un même fait).</p>
      <p>Pour qu'il y ait responsabilité civile, il faut réunir <strong>3 conditions</strong> en même temps :</p>
      <ul style="line-height:1.9;">
        <li>une <strong>faute</strong> (le <strong>fait générateur</strong>) : <strong>un comportement qui ne respecte pas les règles de prudence qu'une personne normalement prudente aurait adoptées dans les mêmes circonstances</strong> (critère du « bon père de famille » remplacé par « <strong>personne prudente et raisonnable</strong> ») ;</li>
        <li>un <strong>dommage</strong> (le préjudice subi par la victime) ;</li>
        <li>un <strong>lien de causalité</strong> entre les deux (<strong>théorie de la condition nécessaire</strong>) : il faut prouver que <strong>sans la faute commise, le dommage ne se serait pas produit tel qu'il s'est produit</strong>. La faute doit être la <strong>cause directe</strong> du dommage.</li>
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
      <ul style="line-height:1.95;">
        <li><strong>Du fait personnel</strong> : on répond de ses propres actes.</li>
        <li><strong>Du fait d'autrui</strong> : les <strong>parents</strong> répondent de leurs enfants mineurs (l'enfant doit être <strong>mineur</strong>, <strong>habiter avec eux</strong> et avoir <strong>commis une faute</strong>), les <strong>instituteurs</strong> de leurs élèves, l'<strong>employeur</strong> (commettant) de ses employés (préposés) dans l'exercice de leurs fonctions.</li>
        <li><strong>Du fait des choses</strong> (art. 6.13) : le <strong>gardien</strong> d'une chose est responsable <strong>objectivement</strong> si la chose a un <strong>vice</strong> ou a joué un <strong>rôle actif</strong> dans le dommage (ex. une tuile qui tombe du toit).</li>
        <li><strong>Du fait des animaux</strong> (art. 6.15) : le <strong>propriétaire d'un animal ou celui qui s'en sert (le gardien)</strong> est responsable des dommages causés par l'animal, <strong>que l'animal soit sous sa garde ou qu'il se soit échappé ou égaré</strong>.</li>
      </ul>
      <div style="border-left:4px solid #f59e0b; background:rgba(245,158,11,.08); border-radius:8px; padding:.6rem .9rem; margin:.7rem 0;">
        <strong style="color:#fbbf24;">🐕 Exemple : le chien échappé.</strong> Monsieur Dubois possède un chien qu'il garde dans son jardin clôturé. Un jour, le chien réussit à creuser sous la clôture, s'échappe et mord un cycliste. <strong>Dommage</strong> : morsure du cycliste. <strong>Responsabilité</strong> : Monsieur Dubois est <strong>automatiquement responsable</strong>, même s'il a pris des précautions (clôture) — le fait que le chien se soit échappé ne change rien. Son <strong>assurance responsabilité civile familiale</strong> interviendra pour indemniser la victime.
      </div>
      <div class="key-rule"><div class="formula-main">Fait des animaux (art. 6.15) = responsabilité OBJECTIVE : pas besoin de prouver une faute du propriétaire, le simple fait que l'animal a causé un dommage suffit (le gardien peut ne pas être le propriétaire)</div></div>
      <p><strong>Les 3 types de dommages réparables</strong> : <strong>matériel</strong> (dégâts patrimoniaux), <strong>corporel</strong> (blessures, handicap) et <strong>moral</strong> (souffrance psychologique). Le dommage doit être <strong>certain</strong> : un dommage seulement <strong>hypothétique</strong> (incertain) ne peut pas être réparé. La réparation se fait en général par des <strong>dommages-intérêts</strong> (une somme d'argent).</p>
      <div class="simple-exp-box">
        <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Civil ≠ pénal · et l'âge ?</button>
        <div class="simple-exp-content">La responsabilité <strong>civile</strong> sert à <em>réparer</em> le dommage de la victime (payer). La responsabilité <strong>pénale</strong> sert à <em>punir</em> une infraction au nom de la société (amende, prison). — En Belgique, il n'y a <strong>pas d'âge fixe</strong> pour être responsable civilement : ce qui compte est le <strong>discernement</strong> (être capable de comprendre la portée de ses actes), apprécié par le juge. Une <strong>assurance RC</strong> (ex. la RC familiale) sert justement à couvrir ces dommages.</div>
      </div>
    </div>

    <div class="synth-section">
      <h2>7. Les modes de preuve en droit civil belge</h2>
      <p>Pour faire valoir un droit en justice, il faut le <strong>prouver</strong>. La preuve d'un droit soulève trois questions :</p>
      <ul style="line-height:1.95;">
        <li><strong>Qui doit prouver ?</strong> <strong>Celui qui réclame l'exécution d'une obligation</strong> doit le prouver (<strong>art. 8.4</strong>).</li>
        <li><strong>Que doit-on prouver ?</strong> L'<strong>existence du fait</strong> (ou de l'obligation) que l'on invoque.</li>
        <li><strong>Comment prouver ?</strong> Par les <strong>modes de preuve</strong> : la loi n'admet que certains modes déterminés, qui n'ont pas la même <strong>force probante</strong> (degré de fiabilité).</li>
      </ul>
      <p>Le <strong>débat contradictoire</strong> : tous les éléments de preuve invoqués par une partie au litige doivent être <strong>examinés et discutés par l'autre partie</strong>.</p>
      <div class="key-rule"><div class="formula-main">Charge de la preuve (art. 8.4) : celui qui réclame l'exécution d'une obligation doit la prouver</div></div>

      <h3 style="font-size:19px; color:var(--color-nav); margin:1rem 0 .4rem;">Les 5 modes de preuve</h3>
      <p>Le droit civil belge connaît <strong>cinq modes de preuve</strong> distincts :</p>

      <p style="margin:.6rem 0 .2rem;"><strong>1. La preuve par écrit signé</strong> — le mode le plus courant et souvent le plus solide. Il existe <strong>deux catégories d'écrit</strong> :</p>
      <ul style="line-height:1.95;">
        <li><strong>L'acte authentique</strong> (<strong>art. 8.15</strong>) : un <strong>écrit reçu, avec les solennités requises, par un officier public ou ministériel ayant compétence et qualité pour instrumenter</strong>. Il est rédigé par un <strong>officier public</strong> (notaire, huissier de justice, greffier), une personne <strong>sous serment</strong> : sa fonction officielle donne une valeur à l'écrit. Il <strong>fait pleine foi</strong> — le juge doit le croire, <strong>sauf si on prouve que c'est un faux</strong>. <em>Ex. : tes parents achètent une maison et signent chez le notaire → l'acte notarié prouve l'achat.</em></li>
        <li><strong>L'acte sous signature privée</strong> (<strong>art. 8.15</strong>) : un <strong>écrit établi en vue de créer des conséquences juridiques, signé par la ou les parties avec l'intention de s'en approprier le contenu, et qui n'est pas un acte authentique</strong>. Rédigé et signé <strong>entre particuliers</strong>, sans officier public. Il a une <strong>force probante forte entre les parties</strong> qui l'ont signé. <em>Ex. : tu vends ton vélo à un ami pour 200 € et vous signez tous les deux un petit contrat.</em></li>
      </ul>

      <p style="margin:.6rem 0 .2rem;"><strong>2. La preuve par témoin (le témoignage)</strong> (<strong>art. 8.28 et suivants du Code judiciaire</strong>) : une <strong>personne raconte devant un juge ce qu'elle a vu, entendu ou vécu</strong>, en relation avec le conflit. Le témoignage n'est admis que <strong>lorsque la loi autorise la preuve libre</strong> ; le <strong>juge décide librement</strong> s'il croit le témoin ou non.</p>
      <ul style="line-height:1.9;">
        <li><em>Ex. simple : un piéton est témoin d'un accident entre deux conducteurs qu'il ne connaît pas.</em></li>
        <li><em>Ex. : Sophie prête 1 500 € en cash à Lucas sans rien écrire ; 3 amis étaient présents. Si Lucas nie, leur <strong>témoignage concordant</strong> constitue une preuve.</em></li>
      </ul>

      <p style="margin:.6rem 0 .2rem;"><strong>3. La présomption de fait</strong> (<strong>art. 8.1, 9°</strong>) — <strong>particulièrement importante</strong>. C'est un <strong>raisonnement logique par lequel le juge déduit un fait inconnu à partir d'un ou plusieurs faits connus</strong> (comme résoudre une énigme à partir d'indices). Pour être valable, les indices doivent être :</p>
      <ul style="line-height:1.9;">
        <li><strong>sérieux</strong> (crédibles et rationnels) ;</li>
        <li><strong>précis</strong> (pas de vagues suppositions, mais des éléments concrets) ;</li>
        <li><strong>concordants</strong> (plusieurs indices qui pointent tous dans la même direction).</li>
      </ul>
      <p><em>Ex. : Paul envoie un SMS à Marie « ok je te livre 50 canettes de coca demain à 15 h au prix de 30 € ». Le juge en déduit qu'il existe un <strong>contrat de vente</strong> (accord sur la chose, le prix et la livraison — indices sérieux, précis et concordants).</em></p>
      <div class="key-rule"><div class="formula-main">Présomption légale = imposée par la loi (le juge doit l'appliquer) · Présomption de fait = laissée à l'appréciation du juge</div></div>
      <p><em>Ex. de présomption légale (art. 315 de l'ancien Code civil) : l'enfant né pendant le mariage (ou dans les 300 jours suivant sa dissolution) a pour père le mari de la mère.</em></p>
      <p><strong>Pièges à éviter :</strong> confondre présomption et simple <strong>supposition</strong> (non prouvée par des faits) ; se contenter d'un <strong>seul indice isolé</strong> (il en faut plusieurs, concordants) ; oublier que le juge garde son <strong>pouvoir d'appréciation</strong> (il peut rejeter une présomption qu'il juge insuffisante).</p>

      <p style="margin:.6rem 0 .2rem;"><strong>4. L'aveu</strong> (<strong>art. 8.1, 10° et art. 8.30 à 8.32</strong>) : c'est quand une <strong>personne reconnaît elle-même un fait qui lui est défavorable</strong>. Deux types :</p>
      <ul style="line-height:1.9;">
        <li><strong>L'aveu judiciaire</strong> (fait <strong>devant le juge</strong>) : <strong>force probante maximale</strong>, il est <strong>irrévocable</strong> (on ne peut plus revenir en arrière). <em>Ex. : devant le juge, Sophie dit « oui, je dois 2 500 € à Thomas pour l'ordinateur » → elle ne peut plus le nier, le juge doit la condamner à payer.</em></li>
        <li><strong>L'aveu extrajudiciaire</strong> (fait <strong>hors du tribunal</strong> : e-mail, SMS, lettre) : accepté comme preuve mais avec <strong>moins de force</strong>.</li>
      </ul>

      <p style="margin:.6rem 0 .2rem;"><strong>5. Le serment</strong> (<strong>art. 8.1, 12° et art. 8.32 et suivants</strong>) : une <strong>déclaration solennelle</strong> d'une partie devant le juge, où elle affirme que ce qu'elle dit est vrai. Le <strong>serment décisoire</strong> fait dépendre le procès de ce serment. <em>Ex. : Pierre prétend avoir remboursé 5 000 € à Jean en cash, sans preuve. Jean peut demander à Pierre de jurer devant le juge : s'il jure, il gagne ; s'il refuse de jurer, il perd automatiquement.</em></p>

      <p style="margin-top:1rem;"><strong>La règle des 3.500 € :</strong> pour un acte juridique d'une valeur <strong>≥ 3.500 €</strong>, un <strong>écrit signé est obligatoire</strong>. En dessous de 3.500 €, la <strong>preuve est libre</strong> (tous les modes sont admis).</p>
      <p><strong>Aujourd'hui :</strong> la <strong>signature électronique qualifiée</strong> (itsme, eID) a la <strong>même valeur juridique</strong> que la signature manuscrite. Un <strong>huissier</strong> peut établir un <strong>constat électronique</strong> ayant valeur d'acte authentique.</p>
      <div class="simple-exp-box">
        <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Comprendre simplement</button>
        <div class="simple-exp-content">Pour gagner un procès, tu dois <strong>prouver</strong> ce que tu affirmes. Le plus solide = l'<strong>écrit</strong> chez le notaire (acte authentique, pleine foi). Un <strong>SMS</strong> ou un aveu hors tribunal = plus faible. La <strong>présomption de fait</strong> = le juge déduit la vérité d'indices <strong>sérieux, précis et concordants</strong>. L'<strong>aveu judiciaire</strong> est irrévocable. Et tout ce qui vaut <strong>3.500 € ou plus</strong> exige un écrit signé.</div>
      </div>
    </div>

    <div class="synth-section">
      <h2>8. Les modalités des obligations (droit civil)</h2>
      <p>Une <strong>obligation</strong> est le <strong>lien de droit existant entre au moins deux personnes</strong> : un <strong>créancier</strong> (à qui on doit) et un <strong>débiteur</strong> (qui doit). Elle peut prendre plusieurs formes :</p>
      <ul style="line-height:2;">
        <li><strong>Obligation pure et simple</strong> : exigible immédiatement.</li>
        <li><strong>Obligation à terme</strong> (un <strong>terme</strong> = événement <strong>futur et certain</strong>) :
          <ul style="line-height:1.9;">
            <li><strong>Terme suspensif</strong> : il <strong>suspend l'exigibilité</strong> (l'obligation existe, mais on ne peut l'exiger qu'à l'échéance). Ex. : achat d'une TV payable au 15 novembre.</li>
            <li><strong>Terme extinctif</strong> : il <strong>éteint</strong> l'obligation à une date. Ex. : la fin d'un bail.</li>
          </ul>
        </li>
        <li><strong>Obligation sous condition</strong> (une <strong>condition</strong> = événement <strong>futur et incertain</strong>) :
          <ul style="line-height:1.9;">
            <li><strong>Condition suspensive</strong> : elle <strong>suspend la naissance</strong> de l'obligation (elle ne naît que si l'événement se réalise). Ex. : « j'achète la maison <em>si</em> la banque m'accorde le prêt ».</li>
            <li><strong>Condition résolutoire</strong> : sa réalisation <strong>annule</strong> l'obligation. Elle doit dépendre au moins en partie du <strong>hasard</strong> (sinon elle est nulle).</li>
          </ul>
        </li>
      </ul>
      <p style="margin-top:1rem;"><strong>Obligations à sujets multiples</strong> (plusieurs créanciers et/ou débiteurs) :</p>
      <ul style="line-height:2;">
        <li><strong>La divisibilité (principe)</strong> : la <strong>dette</strong> se divise en autant de parts qu'il y a de <strong>débiteurs</strong> ; la <strong>créance</strong> en autant de parts qu'il y a de <strong>créanciers</strong>. Ex. : X et Y prêtent 10.000 € à Z → chaque créancier ne peut réclamer que <strong>5.000 €</strong>.</li>
        <li><strong>La solidarité</strong> (exception) :
          <ul style="line-height:1.9;">
            <li><strong>Solidarité active</strong> (plusieurs créanciers) : le débiteur peut payer la <strong>totalité</strong> à <strong>un seul</strong> des créanciers.</li>
            <li><strong>Solidarité passive</strong> (plusieurs débiteurs) : le créancier peut réclamer <strong>toute la dette à un seul</strong> débiteur. Celui qui a tout payé peut ensuite réclamer leur part aux autres codébiteurs.</li>
          </ul>
        </li>
        <li><strong>L'indivisibilité</strong> : l'obligation est indivisible si son <strong>objet</strong> est indivisible — <strong>par nature</strong> (ex. : livrer un bateau ne peut pas se faire « en deux moitiés ») ou <strong>en matière de prêt</strong> (les emprunteurs sont solidairement responsables).</li>
      </ul>
      <div class="simple-exp-box">
        <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Comprendre simplement</button>
        <div class="simple-exp-content"><strong>Terme</strong> = c'est sûr, mais plus tard (une date). <strong>Condition</strong> = ça arrivera peut-être (un « si »). Quand on est <strong>plusieurs</strong> à devoir : normalement chacun paie sa part (divisibilité) ; mais avec la <strong>solidarité</strong>, on peut réclamer <strong>tout à une seule personne</strong>. Et certaines choses (un bateau) ne se coupent pas en parts : c'est l'<strong>indivisibilité</strong>.</div>
      </div>
    </div>

    <div class="synth-section">
      <h2>9. Le droit des contrats</h2>
      <p>Selon le <strong>nouvel article 5.4</strong> du Code civil : « le <strong>contrat</strong>, ou convention, est un <strong>accord de volontés entre deux ou plusieurs personnes</strong> avec l'<strong>intention de faire naître des effets de droit</strong> ». <span style="color:var(--text-secondary);">(Ancien Code civil : « un accord de deux ou plusieurs volontés conclu dans le but de produire mutuellement des droits et des obligations ».)</span></p>
      <p>Le contrat repose sur le <strong>principe de l'autonomie de la volonté</strong> (aussi appelé <strong>liberté contractuelle</strong>) : chacun est <strong>libre de contracter ou de ne pas contracter</strong>, de <strong>choisir son cocontractant</strong> et de <strong>déterminer librement le contenu</strong> de l'accord.</p>

      <h3 style="font-size:18px; color:var(--color-nav); margin:1rem 0 .3rem;">Les limites à la liberté contractuelle</h3>
      <ul style="line-height:1.95;">
        <li><strong>Les lois supplétives</strong> : elles viennent <strong>compléter le silence d'un contrat</strong>. On peut <strong>y échapper</strong> en précisant la volonté des contractants par écrit dans le contrat. <em>Ex. : selon le Code civil, les frais de transport sont à la charge du vendeur ; comme cette règle est supplétive, on peut préciser dans le contrat qu'ils sont à la charge de l'acheteur.</em></li>
        <li><strong>Les restrictions incontournables</strong> :
          <ul style="line-height:1.9;">
            <li>le respect de l'<strong>ordre public</strong> — <em>ex. : un contrat visant l'engagement d'un tueur à gages est interdit ;</em></li>
            <li>le respect des <strong>lois impératives</strong>, qui s'imposent sans qu'on puisse y échapper par le contrat. Pourquoi ? Pour <strong>protéger le cocontractant supposé faible</strong> (dans une négociation, une partie peut se trouver en position d'infériorité). <em>Ex. : interdiction de fixer un salaire inférieur au salaire minimum légal.</em></li>
          </ul>
        </li>
      </ul>

      <h3 style="font-size:18px; color:var(--color-nav); margin:1rem 0 .3rem;">Les 2 conditions de validité du contrat</h3>
      <p><strong>① La capacité de contracter.</strong> Une <strong>incapacité</strong> peut exister du fait :</p>
      <ul style="line-height:1.9;">
        <li>de l'<strong>âge</strong> : le <strong>mineur d'âge</strong> ne peut généralement pas signer un contrat (s'il a des biens, ils sont gérés par les parents ou un tuteur) ;</li>
        <li>de l'<strong>état mental</strong> : la <strong>déficience mentale</strong> touchant un adulte peut l'empêcher de gérer ses biens ;</li>
        <li>d'un <strong>autre fait</strong> : ex. une personne condamnée pour fraude peut se voir interdire toute activité indépendante par le tribunal de l'entreprise.</li>
      </ul>
      <p><strong>② Le consentement de chaque partie</strong>, donné <strong>librement et en connaissance de cause</strong>. Le contrat n'existe que s'il y a un <strong>accord de volontés</strong> ; il peut être <strong>annulé</strong> s'il est affecté par un <strong>vice du consentement</strong>. Les trois vices :</p>
      <ul style="line-height:1.95;">
        <li><strong>L'erreur</strong> : une <strong>fausse information ou une absence d'information involontaire</strong>. Elle n'entraîne l'annulation que si elle porte sur un <strong>élément substantiel (fondamental)</strong> du contrat (il faut prouver que sans l'erreur, on n'aurait pas conclu). <em>Ex. : la vente d'un terrain cru « à bâtir » ; la vente d'une maison située sur le futur trajet d'une autoroute, ignoré des deux parties.</em></li>
        <li><strong>Le dol</strong> : une <strong>machination</strong> (donc <strong>volontaire</strong>) — des manœuvres d'une partie pour amener l'autre à conclure un contrat qu'elle n'aurait pas conclu. Il peut entraîner l'<strong>annulation</strong> ou des <strong>dommages et intérêts</strong>. <em>Ex. : M. X vend une voiture d'occasion après avoir trafiqué le compteur (30 000 km affichés au lieu de 60 000 réels).</em></li>
        <li><strong>La violence</strong> : le consentement est obtenu sous la <strong>menace, physique ou morale</strong>. <em>Ex. : Guillaume signe une reconnaissance de dette de 10 000 € sous la menace d'un chantage.</em></li>
      </ul>
      <div class="key-rule"><div class="formula-main">Contrat valable = respect de l'ordre public + des lois impératives · capacité de contracter · consentement libre (sans erreur, dol ni violence)</div></div>
      <div class="simple-exp-box">
        <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Comprendre simplement</button>
        <div class="simple-exp-content">Un contrat = un accord pour créer des droits/obligations. En principe tu fais ce que tu veux (<strong>autonomie de la volonté</strong>), sauf l'<strong>ordre public</strong> et les <strong>lois impératives</strong> (ex. salaire minimum). Il faut être <strong>capable</strong> (un mineur ne signe pas n'importe quoi) et donner un « oui » libre : si ton consentement est faussé par une <strong>erreur</strong>, une <strong>tromperie (dol)</strong> ou une <strong>menace (violence)</strong>, le contrat peut être <strong>annulé</strong>.</div>
      </div>
    </div>

    <div class="synth-section">
      <h2>10. Les sources des obligations</h2>
      <p>Selon l'<strong>article 5.1 du nouveau Code civil</strong>, une <strong>obligation</strong> est « un <strong>lien de droit</strong> en vertu duquel un <strong>créancier</strong> peut exiger, si nécessaire en justice, d'un <strong>débiteur</strong> l'exécution d'une <strong>prestation</strong> ».</p>
      <ul style="line-height:1.9;">
        <li><strong>Créancier</strong> = celui à qui on doit ; <strong>débiteur</strong> = celui qui doit ; <strong>prestation</strong> = donner, faire ou ne pas faire quelque chose.</li>
      </ul>
      <p>D'où <strong>naissent</strong> les obligations ? Il existe <strong>trois sources</strong> :</p>
      <ul style="line-height:1.9;">
        <li><strong>1. La loi</strong> : l'obligation est imposée <strong>directement par la loi</strong>, sans aucun accord. Ex. (<strong>art. 205</strong>, toujours d'application) : les <strong>enfants doivent des aliments</strong> à leurs père et mère (et ascendants) qui sont dans le besoin.</li>
        <li><strong>2. Le contrat</strong> : l'obligation naît d'un <strong>accord de volontés</strong> (obligations contractuelles).</li>
        <li><strong>3. Les faits juridiques</strong> : un fait produit des effets de droit <strong>sans accord</strong>. On distingue :
          <ul style="line-height:1.9;">
            <li><strong>La responsabilité extracontractuelle</strong> : le <strong>délit</strong> (faute <em>intentionnelle</em>) et le <strong>quasi-délit</strong> (faute <em>non intentionnelle</em> : négligence, imprudence). <strong>Art. 5.137</strong> : « Toute personne est responsable du dommage qu'elle cause à autrui par sa faute. »</li>
            <li><strong>Les quasi-contrats</strong> : on est engagé <strong>sans avoir rien signé</strong> (ex. gérer l'affaire d'un absent, ou devoir rembourser une somme reçue par erreur).</li>
          </ul>
        </li>
      </ul>
      <svg viewBox="0 0 360 158" width="330" style="max-width:100%;height:auto;margin:10px 0 4px" role="img" aria-label="Schéma : les trois sources des obligations">
        <rect x="128" y="8" width="104" height="32" rx="8" fill="rgba(168,85,247,.20)" stroke="#a855f7" stroke-width="1.5"/>
        <text x="180" y="29" fill="#e9d5ff" font-size="13" text-anchor="middle" font-weight="bold">OBLIGATION</text>
        <line x1="180" y1="40" x2="58" y2="74" stroke="#9ca3af" stroke-width="1.4"/>
        <line x1="180" y1="40" x2="180" y2="74" stroke="#9ca3af" stroke-width="1.4"/>
        <line x1="180" y1="40" x2="302" y2="74" stroke="#9ca3af" stroke-width="1.4"/>
        <rect x="14" y="74" width="88" height="30" rx="6" fill="rgba(52,211,153,.15)" stroke="#34d399"/>
        <text x="58" y="93" fill="#6ee7b7" font-size="12" text-anchor="middle" font-weight="bold">La loi</text>
        <text x="58" y="120" fill="#9ca3af" font-size="10" text-anchor="middle">art. 205 (aliments)</text>
        <rect x="136" y="74" width="88" height="30" rx="6" fill="rgba(96,165,250,.15)" stroke="#60a5fa"/>
        <text x="180" y="93" fill="#93c5fd" font-size="12" text-anchor="middle" font-weight="bold">Le contrat</text>
        <text x="180" y="120" fill="#9ca3af" font-size="10" text-anchor="middle">accord de volontés</text>
        <rect x="258" y="74" width="88" height="30" rx="6" fill="rgba(251,191,36,.15)" stroke="#fbbf24"/>
        <text x="302" y="86" fill="#fcd34d" font-size="11" text-anchor="middle" font-weight="bold">Les faits</text>
        <text x="302" y="98" fill="#fcd34d" font-size="11" text-anchor="middle" font-weight="bold">juridiques</text>
        <text x="302" y="120" fill="#9ca3af" font-size="9.5" text-anchor="middle">resp. extracontr.</text>
        <text x="302" y="132" fill="#9ca3af" font-size="9.5" text-anchor="middle">+ quasi-contrats</text>
      </svg>
      <div class="simple-exp-box">
        <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Comprendre simplement</button>
        <div class="simple-exp-content">Une <strong>obligation</strong>, c'est « devoir quelque chose à quelqu'un ». Il y a 3 façons de se retrouver obligé : parce que la <strong>loi</strong> l'impose (nourrir ses parents âgés), parce qu'on a <strong>signé un contrat</strong>, ou à cause d'un <strong>fait</strong> (j'ai causé un dommage → je dois réparer, même sans contrat).</div>
      </div>
      <div class="key-rule"><div class="formula-main">3 sources d'obligations : la loi · le contrat · les faits juridiques (responsabilité extracontractuelle + quasi-contrats)</div></div>
    </div>

    <div class="synth-section">
      <h2>11. Les voisins : les servitudes</h2>
      <p>Quand deux <strong>terrains (fonds)</strong> voisins appartiennent à des propriétaires différents, le droit organise leurs rapports. Une <strong>servitude</strong> est une <strong>charge</strong> imposée à un terrain — le <strong>fonds servant</strong> — au profit d'un autre terrain — le <strong>fonds dominant</strong> — appartenant à un autre propriétaire.</p>
      <ul style="line-height:1.9;">
        <li><strong>Fonds dominant</strong> = le terrain qui <strong>profite</strong> de la servitude (il a le droit).</li>
        <li><strong>Fonds servant</strong> = le terrain qui <strong>supporte</strong> la charge.</li>
      </ul>
      <p>L'exemple le plus ancien est la <strong>servitude de passage</strong>. Imagine un terrain <strong>A</strong> qui n'a <strong>pas d'accès direct à la voie publique</strong>, parce qu'il en est séparé par le terrain <strong>B</strong> : on dit que A est <strong>enclavé</strong>. Sans passage, le terrain A est <strong>inexploitable</strong> — c'est un véritable <strong>besoin économique</strong>.</p>
      <p>Deux solutions sont possibles :</p>
      <ul style="line-height:1.9;">
        <li><strong>1.</strong> A <strong>achète une bande de terrain</strong> à B et en devient propriétaire.</li>
        <li><strong>2. La servitude de passage</strong> : A obtient le <strong>droit de passer</strong> sur le fonds de B <strong>sans en devenir propriétaire</strong>. B reste propriétaire mais doit <strong>supporter</strong> le passage.</li>
      </ul>
      <svg viewBox="0 0 340 210" width="312" style="max-width:100%;height:auto;margin:10px 0 4px" role="img" aria-label="Schéma : terrain A enclavé et servitude de passage vers la voie publique à travers le terrain B">
        <rect x="12" y="10" width="316" height="30" rx="4" fill="#374151" stroke="#9ca3af"/>
        <text x="170" y="30" fill="#e5e7eb" font-size="13" text-anchor="middle" font-weight="bold">Voie publique</text>
        <rect x="12" y="50" width="316" height="60" rx="4" fill="rgba(96,165,250,.14)" stroke="#60a5fa"/>
        <text x="170" y="85" fill="#93c5fd" font-size="13" text-anchor="middle">Terrain B — fonds servant</text>
        <rect x="12" y="120" width="316" height="76" rx="4" fill="rgba(248,113,113,.12)" stroke="#f87171"/>
        <text x="170" y="150" fill="#fca5a5" font-size="13" text-anchor="middle" font-weight="bold">Terrain A — ENCLAVÉ</text>
        <text x="170" y="170" fill="#fca5a5" font-size="11" text-anchor="middle">(fonds dominant)</text>
        <defs><marker id="svArr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0L7,4L0,8z" fill="#34d399"/></marker></defs>
        <line x1="278" y1="158" x2="278" y2="42" stroke="#34d399" stroke-width="3" stroke-dasharray="7 4" marker-end="url(#svArr)"/>
        <text x="240" y="108" fill="#6ee7b7" font-size="11" font-weight="bold">passage</text>
      </svg>
      <div class="simple-exp-box">
        <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Comprendre simplement</button>
        <div class="simple-exp-content">Ton terrain est « coincé » derrière celui du voisin, sans accès à la route ? La <strong>servitude de passage</strong> te donne le <strong>droit de traverser</strong> chez lui pour rejoindre la rue — sans racheter son terrain. Le terrain qui profite = <strong>dominant</strong> ; celui qui subit = <strong>servant</strong>.</div>
      </div>
      <div class="key-rule"><div class="formula-main">Servitude = charge sur le fonds servant au profit du fonds dominant · terrain enclavé → servitude de passage</div></div>
    </div>

    <div class="synth-section">
      <h2>12. L'extinction des obligations</h2>
      <p>Une obligation peut <strong>disparaître</strong> (s'éteindre) de plusieurs façons (livre 5 du nouveau Code civil). Il y en a <strong>5</strong> à connaître :</p>
      <ul style="line-height:1.95;">
        <li><strong>① La confusion</strong> : les qualités de <strong>créancier</strong> et de <strong>débiteur</strong> se réunissent sur la <strong>même personne</strong>. <em>Ex. : M. Dubois emprunte 5 000 € à son père ; son père décède et Dubois est son seul héritier → il deviendrait son propre créancier : la dette s'éteint.</em></li>
        <li><strong>② La compensation</strong> : <strong>deux dettes réciproques</strong> entre deux personnes s'effacent <strong>jusqu'à concurrence de la plus petite</strong> (il faut que les deux dettes soient <strong>exigibles</strong>). <em>Ex. : Dubois doit 5 000 € à Durand ; Durand lui doit 2 500 € (réparation) → Dubois ne devra plus que 2 500 €.</em></li>
        <li><strong>③ La novation</strong> : on <strong>remplace</strong> une obligation existante par une <strong>obligation nouvelle</strong> — par changement de <strong>débiteur</strong>, d'<strong>objet</strong> ou de <strong>créancier</strong>.</li>
        <li><strong>④ La remise de dette</strong> : le <strong>créancier abandonne volontairement</strong> tout ou partie de sa créance.</li>
        <li><strong>⑤ La prescription</strong> : l'obligation s'éteint <strong>après un certain temps</strong> (délai ordinaire <strong>30 ans</strong> ; parfois plus court, ex. <strong>1 an</strong> pour les sommes dues aux commerçants).</li>
      </ul>
      <div class="key-rule"><div class="formula-main">5 modes d'extinction = confusion · compensation · novation · remise de dette · prescription</div></div>
      <div class="simple-exp-box">
        <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Comprendre simplement</button>
        <div class="simple-exp-content">Une dette ne dure pas toujours : elle peut s'éteindre si tu <strong>hérites</strong> de ton créancier (confusion), si vous vous devez <strong>mutuellement</strong> de l'argent (compensation), si on la <strong>remplace</strong> par une autre (novation), si le créancier <strong>renonce</strong> (remise), ou avec le <strong>temps</strong> (prescription).</div>
      </div>
    </div>

    <div class="synth-section">
      <h2>13. L'usufruit</h2>
      <p>La <strong>pleine propriété</strong> réunit <strong>3 prérogatives</strong> héritées du droit romain :</p>
      <ul style="line-height:1.95;">
        <li><strong>l'usus</strong> : le droit d'<strong>utiliser</strong> le bien ;</li>
        <li><strong>le fructus</strong> : le droit d'en <strong>percevoir les fruits</strong> (récoltes, loyers…) ;</li>
        <li><strong>l'abusus</strong> : le droit d'en <strong>disposer</strong> (vendre, donner, détruire).</li>
      </ul>
      <p>L'<strong>usufruit</strong> (art. <strong>3.138</strong> du nouveau Code civil) est un <strong>démembrement</strong> de la propriété : il donne à son titulaire, l'<strong>usufruitier</strong>, le droit d'<strong>utiliser</strong> un bien appartenant au <strong>nu-propriétaire</strong> et d'en <strong>percevoir les fruits</strong>, selon la destination du bien, avec l'<strong>obligation de le restituer</strong> à la fin de son droit.</p>
      <ul style="line-height:1.95;">
        <li>L'<strong>usufruitier</strong> a l'<strong>usus + le fructus</strong> ;</li>
        <li>le <strong>nu-propriétaire</strong> garde l'<strong>abusus</strong> (le droit de disposer du bien).</li>
      </ul>
      <svg viewBox="0 0 320 160" width="300" style="max-width:100%;height:auto;margin:8px 0 4px" role="img" aria-label="Usufruit : usufruitier (usus et fructus) et nu-propriétaire (abusus)">
        <text x="160" y="16" fill="#e5e7eb" font-size="12.5" text-anchor="middle" font-weight="bold">Pleine propriété = usus + fructus + abusus</text>
        <rect x="14" y="32" width="184" height="112" rx="6" fill="rgba(52,211,153,.12)" stroke="#34d399"/>
        <text x="106" y="56" fill="#6ee7b7" font-size="13" text-anchor="middle" font-weight="bold">USUFRUITIER</text>
        <text x="106" y="82" fill="#a7f3d0" font-size="12" text-anchor="middle">usus → utiliser</text>
        <text x="106" y="102" fill="#a7f3d0" font-size="12" text-anchor="middle">fructus → les fruits</text>
        <text x="106" y="128" fill="#9ca3af" font-size="10.5" text-anchor="middle">(droit temporaire)</text>
        <rect x="210" y="32" width="96" height="112" rx="6" fill="rgba(96,165,250,.12)" stroke="#60a5fa"/>
        <text x="258" y="56" fill="#93c5fd" font-size="12" text-anchor="middle" font-weight="bold">NU-</text>
        <text x="258" y="72" fill="#93c5fd" font-size="12" text-anchor="middle" font-weight="bold">PROPRIÉTAIRE</text>
        <text x="258" y="100" fill="#bfdbfe" font-size="12" text-anchor="middle">abusus</text>
        <text x="258" y="118" fill="#bfdbfe" font-size="11" text-anchor="middle">(disposer)</text>
      </svg>
      <p>L'usufruit est <strong>temporaire</strong> : à la fin (souvent au <strong>décès</strong> de l'usufruitier), le nu-propriétaire récupère la <strong>pleine propriété</strong>. <strong>Cas classique</strong> (succession) : l'<strong>usufruit</strong> revient au <strong>conjoint survivant</strong>, la <strong>nue-propriété</strong> aux <strong>enfants</strong> (origine romaine : protéger la veuve).</p>
      <div class="key-rule"><div class="formula-main">Usufruit = usus + fructus (usufruitier) · l'abusus reste au nu-propriétaire · droit temporaire</div></div>
      <div class="simple-exp-box">
        <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Comprendre simplement</button>
        <div class="simple-exp-content">Imagine une maison : l'<strong>usufruitier</strong> peut y <strong>vivre</strong> et la <strong>louer</strong> (toucher les loyers), mais il ne peut pas la <strong>vendre</strong>. Vendre, c'est le droit du <strong>nu-propriétaire</strong>. Quand l'usufruit se termine, ce dernier récupère tout.</div>
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
        <div class="formula-box"><h3>Responsabilité civile</h3><div class="formula-main" style="font-size:15px;">Obligation de réparer le dommage causé à autrui</div><p class="note">Base : Livre 6 du Code civil (depuis le 1ᵉʳ janvier 2025) ; avant : art. 1382 et suivants.</p></div>
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
      <h3 style="font-size:20px; font-weight:600; color:var(--color-nav);">🔗 Réviser en ligne</h3>
      <p style="color:var(--text-secondary); margin:0 0 .6rem;">Des sites gratuits pour comprendre l'économie autrement :</p>
      <ul style="line-height:2;">
        <li><a href="https://www.citeco.fr/" target="_blank" rel="noopener" style="color:var(--text-primary);font-weight:700;text-decoration:underline;">Citéco</a> — la Cité de l'économie (articles &amp; vidéos).</li>
        <li><a href="https://www.lafinancepourtous.com/" target="_blank" rel="noopener" style="color:var(--text-primary);font-weight:700;text-decoration:underline;">La finance pour tous</a> — notions d'argent &amp; d'économie expliquées simplement.</li>
        <li><a href="https://www.lumni.fr/" target="_blank" rel="noopener" style="color:var(--text-primary);font-weight:700;text-decoration:underline;">Lumni</a> — vidéos d'économie.</li>
      </ul>
    </div>

    <div class="exercise-card">
      <h3 style="font-size:20px; font-weight:600; color:var(--color-nav); margin-bottom:0.5rem;">🎮 Quel risque de la mondialisation ?</h3>
      <p style="color:var(--text-secondary); margin:0 0 .8rem;">On te donne un effet ; tu choisis le bon risque (économique · social · environnemental). Correction immédiate + score. (Clavier : 1-3, puis Entrée.)</p>
      <button type="button" class="nav-btn" data-mg="eco-mm">▶ Commencer le jeu</button>
      <div id="eco-mm" class="mg-mount"></div>
    </div>

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
    // ── Le droit des contrats (QCM tirées de ton contrôle « Les Contrats ») ──
    { q: "Un contrat est :", opts: ["un accord entre 2 ou plusieurs personnes ayant l'intention de produire des effets de droit", "une loi votée par le parlement", "une décision du juge", "une facture"], ans: 0, chapter: "contrats", difficulty: "facile", exp: "Contrat = accord de volontés destiné à produire des effets de droit." },
    { q: "Le principe de l'autonomie de la volonté signifie que chaque partie est libre de :", opts: ["contracter, choisir son cocontractant et déterminer le contenu de l'accord", "signer n'importe quel contrat, même contraire à l'ordre public", "refuser les lois impératives", "contracter avec un mineur sans restriction"], ans: 0, chapter: "contrats", difficulty: "intermediaire", exp: "Autonomie de la volonté = liberté contractuelle (dans les limites des lois impératives et de l'ordre public)." },
    { q: "Une loi supplétive est une loi qui :", opts: ["complète le contrat là où il est muet, mais peut être écartée par les parties", "s'impose obligatoirement, sans exception", "protège exclusivement les consommateurs", "s'applique seulement aux contrats de travail"], ans: 0, chapter: "contrats", difficulty: "intermediaire", exp: "Supplétive = écartable par les parties. Impérative = protège la partie faible, non écartable." },
    { q: "Quelle est une restriction INCONTOURNABLE à la liberté contractuelle ?", opts: ["l'interdiction de prévoir un salaire inférieur au salaire minimum légal", "l'absence de mention du lieu de livraison", "des frais de transport non précisés", "l'omission de la date de signature"], ans: 0, chapter: "contrats", difficulty: "difficile", exp: "Les lois impératives (ex. salaire minimum) limitent la liberté contractuelle." },
    { q: "Quand une personne est-elle incapable de contracter ?", opts: ["lorsqu'elle est mineure ou atteinte de déficience mentale", "lorsqu'elle n'a pas signé le contrat de sa propre main", "lorsqu'elle ne parle pas la langue du contrat", "lorsqu'elle est en déplacement"], ans: 0, chapter: "contrats", difficulty: "facile", exp: "Incapables : mineurs et personnes atteintes de déficience mentale." },
    { q: "Différence entre l'erreur et le dol ?", opts: ["l'erreur est involontaire, le dol est une machination volontaire", "l'erreur est volontaire, le dol involontaire", "l'erreur porte sur le prix, le dol sur la qualité", "aucune différence"], ans: 0, chapter: "contrats", difficulty: "intermediaire", exp: "Erreur = involontaire ; dol = tromperie volontaire/intentionnelle." },
    { q: "Pour que l'erreur entraîne l'annulation d'un contrat, elle doit :", opts: ["porter sur un élément fondamental du contrat", "avoir été commise par les deux parties", "avoir été signalée avant la signature", "concerner uniquement le prix"], ans: 0, chapter: "contrats", difficulty: "difficile", exp: "Seule une erreur sur un élément fondamental (substantiel) annule le contrat." },
    { q: "La violence, comme vice de consentement, consiste à :", opts: ["obtenir le consentement sous la menace, physique ou morale", "constater qu'une partie a été blessée", "prouver que le contrat a été signé sans avocat", "établir que la partie était sous l'emprise de l'alcool"], ans: 0, chapter: "contrats", difficulty: "intermediaire", exp: "Violence = consentement extorqué sous menace physique OU morale." },
    // ── Modalités des obligations (droit civil) ──
    { q: "Un « terme » est un événement :", opts: ["futur et certain", "futur et incertain", "passé et certain", "présent"], ans: 0, chapter: "obligations", difficulty: "facile", exp: "Le terme = futur et CERTAIN (ex. une date). La condition = futur et INCERTAIN (un « si »)." },
    { q: "Une « condition » est un événement :", opts: ["futur et incertain", "futur et certain", "toujours réalisé", "passé"], ans: 0, chapter: "obligations", difficulty: "facile", exp: "La condition = futur et incertain. Suspensive (suspend la naissance) ou résolutoire (annule)." },
    { q: "Le terme suspensif :", opts: ["suspend l'exigibilité de l'obligation", "éteint l'obligation", "annule le contrat", "double la dette"], ans: 0, chapter: "obligations", difficulty: "intermediaire", exp: "Terme suspensif : l'obligation existe mais n'est exigible qu'à l'échéance (ex. payer au 15 novembre)." },
    { q: "La condition suspensive :", opts: ["suspend la naissance de l'obligation", "éteint une obligation existante", "rend la dette solidaire", "divise la créance"], ans: 0, chapter: "obligations", difficulty: "intermediaire", exp: "L'obligation ne naît que si l'événement se réalise (ex. « j'achète si la banque prête »)." },
    { q: "Principe de divisibilité : X et Y prêtent 10.000 € à Z. Chaque créancier peut réclamer :", opts: ["5.000 € (sa moitié)", "10.000 €", "0 €", "20.000 €"], ans: 0, chapter: "obligations", difficulty: "intermediaire", exp: "La créance se divise par le nombre de créanciers → chacun ne réclame que sa part (5.000 €)." },
    { q: "La solidarité passive permet au créancier de :", opts: ["réclamer toute la dette à un seul des débiteurs", "ne rien réclamer", "réclamer uniquement la moitié", "diviser entre tous les débiteurs"], ans: 0, chapter: "obligations", difficulty: "difficile", exp: "Solidarité passive : le créancier réclame le tout à un seul débiteur ; celui-ci se retourne ensuite vers les autres." },
    { q: "Une obligation est indivisible quand :", opts: ["son objet est indivisible (ex. livrer un bateau)", "il y a un seul débiteur", "la dette est inférieure à 3.500 €", "le terme est échu"], ans: 0, chapter: "obligations", difficulty: "intermediaire", exp: "Indivisibilité : l'objet ne peut pas être fractionné (par nature, ou en matière de prêt)." },
    // ── Modes de preuve en droit civil belge (QCM tirées de ton contrôle) ──
    { q: "La présomption, c'est :", opts: ["la déduction d'un fait inconnu à partir d'un ou plusieurs faits connus", "un procédé de preuve utilisé de manière légale", "la déduction d'un fait connu à partir de faits inconnus", "un procédé de preuve illégal"], ans: 0, chapter: "preuve", difficulty: "intermediaire", exp: "Présomption = on déduit un fait INCONNU à partir de faits CONNUS.", simple: "On ne voit pas le fait directement, mais des indices permettent de le deviner. Ex. : sol mouillé → il a plu." },
    { q: "Charge de la preuve (art. 8.4 du Code civil) : qui doit prouver ?", opts: ["celui qui réclame (qui allègue le fait)", "celui qui nie les faits", "le juge décide seul qui prouve", "la charge est toujours partagée"], ans: 0, chapter: "preuve", difficulty: "facile", exp: "Celui qui réclame un droit doit le prouver — pas celui qui nie." },
    { q: "Qu'est-ce qu'un acte authentique ?", opts: ["un écrit reçu par un officier public compétent (notaire, huissier)", "un document signé par deux particuliers seulement", "un SMS confirmé par les deux parties", "un témoignage fait devant notaire"], ans: 0, chapter: "preuve", difficulty: "intermediaire", exp: "Acte authentique = reçu par un officier public (notaire, huissier) → force probante très forte." },
    { q: "À partir de quel montant un écrit signé est-il obligatoire pour prouver un acte juridique ?", opts: ["3.500 €", "1.000 €", "2.500 €", "5.000 €"], ans: 0, chapter: "preuve", difficulty: "intermediaire", exp: "≥ 3.500 € : écrit signé obligatoire. En dessous : la preuve est libre." },
    { q: "Pour qu'une présomption de fait soit valable, les indices doivent être :", opts: ["sérieux, précis et concordants", "nombreux, certains et anciens", "écrits, signés et notariés", "judiciaires, extrajudiciaires et légaux"], ans: 0, chapter: "preuve", difficulty: "intermediaire", exp: "Les indices doivent être sérieux, précis et concordants." },
    { q: "L'aveu judiciaire est-il révocable ?", opts: ["non, il est irrévocable", "oui, à tout moment du procès", "oui, mais seulement dans les 30 jours", "cela dépend du juge"], ans: 0, chapter: "preuve", difficulty: "intermediaire", exp: "L'aveu judiciaire (fait devant le juge) est irrévocable et a une force probante très forte." },
    { q: "Combien de modes de preuve le droit civil belge reconnaît-il officiellement ?", opts: ["5", "3", "4", "6"], ans: 0, chapter: "preuve", difficulty: "facile", exp: "5 modes : l'écrit, le témoignage, les présomptions, l'aveu, le serment." },
    { q: "Un SMS peut constituer :", opts: ["un aveu extrajudiciaire ou une présomption de fait", "un acte authentique", "une preuve sans aucune valeur juridique", "exclusivement une présomption légale"], ans: 0, chapter: "preuve", difficulty: "difficile", exp: "Un SMS = aveu extrajudiciaire ou présomption de fait (force probante moindre qu'un aveu judiciaire)." },
    { q: "La signature électronique qualifiée (itsme, eID) a :", opts: ["la même valeur juridique que la signature manuscrite", "aucune valeur juridique", "une valeur seulement entre commerçants", "valeur d'acte authentique automatiquement"], ans: 0, chapter: "preuve", difficulty: "intermediaire", exp: "La signature électronique qualifiée (itsme, eID) = même valeur que la signature manuscrite." },
    { q: "Le serment, comme mode de preuve, est :", opts: ["très rarement utilisé dans les tribunaux belges", "le mode de preuve le plus fréquent", "réservé aux actes notariés", "interdit en droit belge"], ans: 0, chapter: "preuve", difficulty: "facile", exp: "Le serment est un mode de preuve qui existe mais est très rarement utilisé." },
    { q: "Lequel de ces modes de preuve possède la force probante la plus forte ?", opts: ["l'aveu", "le témoignage", "la présomption de fait", "l'acte sous signature privée"], ans: 0, chapter: "preuve", difficulty: "intermediaire", exp: "L'aveu (surtout l'aveu judiciaire, irrévocable) a la force probante la plus forte." },
    { q: "Pourquoi une capture d'écran seule a-t-elle une faible valeur probante ?", opts: ["car elle peut facilement être manipulée et son intégrité n'est pas garantie", "car elle doit obligatoirement être signée par un notaire", "car un juge ne peut jamais l'accepter", "car elle est trop coûteuse à produire"], ans: 0, chapter: "preuve", difficulty: "intermediaire", exp: "Une capture d'écran est facilement manipulable : son intégrité n'est pas garantie." },
    { q: "Serment décisoire : si la partie refuse de jurer devant le juge ?", opts: ["elle perd automatiquement son procès", "elle gagne automatiquement", "le procès est annulé", "elle doit payer une amende"], ans: 0, chapter: "preuve", difficulty: "difficile", exp: "Le serment décisoire fait dépendre le procès du serment : jurer = gagner ; refuser de jurer = perdre automatiquement." },
    { q: "La mondialisation, c'est avant tout :", opts: ["l'intensification des échanges entre les parties du monde", "la fin du commerce international", "un pays qui se ferme aux autres", "une monnaie unique mondiale"], ans: 0, chapter: "mondialisation", difficulty: "facile", exp: "Mondialisation = mise en relation du monde par l'intensification des échanges (marchandises, services, capitaux, informations, personnes).", simple: "C'est l'idée que tout circule de plus en plus entre les pays : produits, argent, infos, gens. Le monde devient un seul grand marché connecté." },
    { q: "Lequel n'est PAS un type de flux mondial ?", opts: ["les flux de montagnes", "les flux de marchandises", "les flux de capitaux", "les flux d'informations"], ans: 0, chapter: "mondialisation", difficulty: "facile", exp: "Les flux = marchandises, services, capitaux, informations et personnes. « Montagnes » n'a aucun sens ici." },
    { q: "Le 1ᵉ⁰ exportateur mondial de marchandises est :", opts: ["la Chine", "la Belgique", "le Brésil", "la Russie"], ans: 0, chapter: "mondialisation", difficulty: "facile", exp: "La Chine est le 1ᵉ⁰ exportateur de marchandises, devant les États-Unis et l'Allemagne." },
    { q: "La « Triade » désigne :", opts: ["Amérique du Nord, Europe, Asie de l'Est", "France, Chine, Brésil", "les 3 océans", "3 entreprises"], ans: 0, chapter: "mondialisation", difficulty: "intermediaire", exp: "La Triade = les 3 grands pôles économiques : Amérique du Nord, Europe (de l'Ouest) et Asie de l'Est.", simple: "« Triade » = groupe de trois. Ce sont les 3 régions les plus riches et connectées du monde, qui dominent les échanges." },
    { q: "Les pôles de la Triade réalisent environ :", opts: ["les ¾ du commerce mondial", "10 % du commerce mondial", "la moitié de la population", "rien du tout"], ans: 0, chapter: "mondialisation", difficulty: "intermediaire", exp: "À eux seuls, ils concentrent environ les ¾ des échanges mondiaux, avec beaucoup de commerce intra-régional.", simple: "Imagine tout le commerce du monde comme un gâteau : 3 régions seulement (Amérique du Nord, Europe, Asie de l'Est) en mangent les ¾. Le reste du monde se partage le dernier quart." },
    { q: "Une firme multinationale (FMN) est :", opts: ["une entreprise présente dans plusieurs pays", "une banque belge", "un syndicat", "un port"], ans: 0, chapter: "mondialisation", difficulty: "facile", exp: "Les FMN (ou FTN) sont les grands acteurs de la mondialisation : Apple, Samsung, Nike… présentes dans de nombreux pays." },
    { q: "L'iPhone illustre la chaîne de valeur mondiale car il est :", opts: ["conçu en Californie, assemblé en Chine, avec des composants de partout", "fabriqué entièrement en Belgique", "vendu seulement aux États-Unis", "produit sans aucune usine"], ans: 0, chapter: "mondialisation", difficulty: "intermediaire", exp: "Chaîne de valeur mondiale : chaque étape se fait là où c'est le plus avantageux (conception, composants, assemblage).", simple: "Au lieu de tout faire au même endroit, on découpe la fabrication entre plein de pays pour produire moins cher. L'iPhone en est l'exemple type." },
    { q: "Le port d'Anvers montre que la mondialisation :", opts: ["est aussi présente près de chez nous (Belgique)", "n'existe qu'en Asie", "est interdite en Europe", "concerne seulement Internet"], ans: 0, chapter: "mondialisation", difficulty: "facile", exp: "Anvers, l'un des plus grands ports d'Europe (≈ 278 Mt en 2024), est la « mondialisation à notre porte »." },
    { q: "Le risque ÉCONOMIQUE de la mondialisation, c'est surtout :", opts: ["la perte d'emplois due aux délocalisations", "la pollution des océans", "la disparition des langues", "le réchauffement climatique"], ans: 0, chapter: "mondialisation", difficulty: "intermediaire", exp: "Risque économique = perte d'emplois quand les usines se délocalisent là où la main-d'œuvre est moins chère.", simple: "Les entreprises déménagent leurs usines là où ça coûte moins cher → des gens perdent leur travail dans les pays riches. C'est le risque économique." },
    { q: "Le risque ENVIRONNEMENTAL de la mondialisation, c'est :", opts: ["la pollution et l'épuisement des ressources", "la hausse des salaires", "trop de vacances", "moins de transport"], ans: 0, chapter: "mondialisation", difficulty: "intermediaire", exp: "Risque environnemental = pollution (transports, usines) et surexploitation/épuisement des ressources naturelles." },
    { q: "Le risque SOCIAL de la mondialisation, c'est :", opts: ["les inégalités et les mauvaises conditions de travail", "la baisse des prix", "plus de choix de produits", "l'invention d'Internet"], ans: 0, chapter: "mondialisation", difficulty: "intermediaire", exp: "Risque social = creusement des inégalités, bas salaires et mauvaises conditions de travail dans certains pays." },
    { q: "Un porte-conteneurs sert surtout à transporter :", opts: ["des marchandises", "des informations", "des capitaux", "des touristes"], ans: 0, chapter: "mondialisation", difficulty: "facile", exp: "Les marchandises voyagent surtout par bateau, dans des conteneurs (flux de marchandises)." },
    { q: "« Interdépendance » des pays signifie :", opts: ["ils dépendent les uns des autres", "ils sont totalement isolés", "ils ont la même langue", "ils ont la même monnaie"], ans: 0, chapter: "mondialisation", difficulty: "facile", exp: "Avec la mondialisation, chaque pays dépend des autres (pour produire, vendre, s'approvisionner).", simple: "« Inter » = entre, « dépendance » = avoir besoin. Aucun pays ne vit en autarcie : chacun a besoin des autres (pour acheter, vendre, fabriquer). Si l'un a un problème, ça touche les autres." },
    { q: "La balance commerciale d'un pays, c'est :", opts: ["la différence entre ses exportations (X) et ses importations (M)", "le nombre de ses habitants", "le total de ses impôts", "la somme de ses dettes"], ans: 0, chapter: "mondialisation", difficulty: "intermediaire", exp: "Balance commerciale = exportations (X) − importations (M) de marchandises, sur une période." },
    { q: "Si un pays exporte PLUS qu'il n'importe (X > M), sa balance commerciale est :", opts: ["excédentaire", "déficitaire", "nulle", "négative"], ans: 0, chapter: "mondialisation", difficulty: "intermediaire", exp: "X > M -> excedent commercial. X < M -> deficit. X = M -> equilibre.", simple: "Il vend plus à l'étranger qu'il n'achète : il « gagne » au commerce → excédent." },
    { q: "La délocalisation, c'est :", opts: ["transférer une activité vers un pays où les coûts sont plus faibles", "fermer définitivement une entreprise", "faire venir des touristes", "augmenter les salaires locaux"], ans: 0, chapter: "mondialisation", difficulty: "facile", exp: "Delocaliser = deplacer la production (ou un service) vers un pays ou la main-d'oeuvre coute moins cher. C'est une cause du risque economique (perte d'emplois)." },
    { q: "La responsabilité civile, c'est l'obligation de :", opts: ["réparer le dommage causé à autrui", "aller en prison", "payer une amende à l'État", "passer un examen"], ans: 0, chapter: "responsabilite", difficulty: "facile", exp: "Responsabilité civile = réparer le dommage causé à quelqu'un d'autre (principe de l'article 1382 de l'ancien Code civil).", simple: "Si tu causes un dommage à quelqu'un, tu dois le « réparer » — en général en payant. C'est ça la responsabilité civile." },
    { q: "Quelles sont les 3 conditions de la responsabilité civile ?", opts: ["une faute, un dommage, un lien de causalité", "un contrat, un juge, un avocat", "un témoin, une preuve, un aveu", "une assurance, un constat, une plainte"], ans: 0, chapter: "responsabilite", difficulty: "intermediaire", exp: "Il faut les 3 ensemble : une faute (ou un fait), un dommage, et un lien de causalité entre les deux.", simple: "Pour être responsable il faut : (1) avoir fait quelque chose de fautif, (2) que ça crée un dommage, (3) que ton acte soit bien la cause du dommage. Les trois en même temps." },
    { q: "Si une faute et un dommage existent mais SANS lien entre eux :", opts: ["il n'y a pas de responsabilité civile", "la responsabilité est automatique", "on va forcément en prison", "le dommage double"], ans: 0, chapter: "responsabilite", difficulty: "intermediaire", exp: "Sans lien de causalité (la faute n'a pas causé le dommage), une des 3 conditions manque → pas de responsabilité.", simple: "Il faut que ta faute soit VRAIMENT la cause du dommage. Si tu as fait une bêtise mais que le dommage serait arrivé de toute façon (autre cause), tu n'es pas responsable : le lien manque." },
    { q: "Les parents qui répondent des actes de leur enfant, c'est la responsabilité :", opts: ["du fait d'autrui", "du fait personnel", "du fait des choses", "pénale"], ans: 0, chapter: "responsabilite", difficulty: "intermediaire", exp: "Responsabilité du fait d'autrui : parents (enfants), instituteurs (élèves), employeur/commettant (employés/préposés).", simple: "« Autrui » = quelqu'un d'autre. Tu peux être responsable du dommage causé par une personne dont tu as la charge : les parents pour leurs enfants, le prof pour ses élèves, le patron pour ses employés." },
    { q: "Une tuile tombe d'un toit et abîme une voiture. C'est la responsabilité :", opts: ["du fait des choses (le gardien)", "du fait personnel", "du fait d'autrui", "de la victime"], ans: 0, chapter: "responsabilite", difficulty: "intermediaire", exp: "Responsabilité du fait des choses : le gardien de la chose répond des dommages qu'elle cause.", simple: "Une « chose » que tu as sous ta garde (toit, chien, voiture…) cause un dommage ? C'est toi, le gardien, qui répares — même si tu n'as rien fait toi-même. Ici : le propriétaire du toit." },
    { q: "Lequel n'est PAS un type de dommage réparable ?", opts: ["le dommage imaginaire", "le dommage matériel", "le dommage corporel", "le dommage moral"], ans: 0, chapter: "responsabilite", difficulty: "facile", exp: "Les 3 types réparables : matériel (biens), corporel (corps), moral (souffrance). Un dommage imaginaire n'est pas réparable." },
    { q: "Un dommage seulement HYPOTHÉTIQUE (incertain) :", opts: ["ne peut pas être réparé", "est toujours réparé", "double la sanction", "devient pénal"], ans: 0, chapter: "responsabilite", difficulty: "intermediaire", exp: "Le dommage doit être CERTAIN. Un dommage hypothétique (qui n'est peut-être jamais arrivé) n'est pas réparable.", simple: "On ne répare que des dommages réels et sûrs. Un « peut-être que j'aurais perdu de l'argent » ne compte pas : c'est trop incertain." },
    { q: "La réparation d'un dommage se fait souvent par :", opts: ["des dommages-intérêts (une somme d'argent)", "une peine de prison", "un avertissement scolaire", "rien du tout"], ans: 0, chapter: "responsabilite", difficulty: "facile", exp: "La victime est indemnisée, en général par des dommages-intérêts (réparation par équivalent)." },
    { q: "Différence entre responsabilité civile et pénale ?", opts: ["civile = réparer la victime ; pénale = punir l'infraction", "elles sont identiques", "civile = prison ; pénale = argent", "la civile n'existe qu'au travail"], ans: 0, chapter: "responsabilite", difficulty: "intermediaire", exp: "Civile = réparer le dommage (dommages-intérêts) ; pénale = sanctionner une infraction (amende, prison) au nom de la société.", simple: "Le civil, c'est pour dédommager la victime (payer). Le pénal, c'est pour punir celui qui a enfreint la loi (amende ou prison)." },
    { q: "En Belgique, à partir de quel âge est-on responsable civilement ?", opts: ["il n'y a pas d'âge fixe : c'est le discernement qui compte", "exactement 18 ans", "exactement 12 ans", "dès la naissance"], ans: 0, chapter: "responsabilite", difficulty: "difficile", exp: "Pas d'âge légal précis : on regarde si l'enfant avait le discernement (capacité de comprendre la portée de ses actes), apprécié par le juge.", simple: "Pas de chiffre magique (genre 18 ans). Le juge se demande : « l'enfant comprenait-il que son acte pouvait causer un dommage ? » C'est ça, le discernement. Un tout-petit ne l'a pas." },
    { q: "Une assurance « RC familiale » sert à :", opts: ["couvrir les dommages causés à autrui par les membres de la famille", "rembourser tes propres vacances", "payer tes amendes pénales", "garantir un salaire"], ans: 0, chapter: "responsabilite", difficulty: "intermediaire", exp: "L'assurance responsabilité civile (RC) prend en charge la réparation des dommages que tu (ou ta famille) causes à autrui.", simple: "C'est l'assurance qui paie à ta place quand toi ou ta famille cassez/blessez quelque chose ou quelqu'un par accident. Elle couvre la « réparation » à donner à la victime, pas tes propres dégâts." },
    { q: "Le but principal de la responsabilité civile est de :", opts: ["indemniser la victime pour le préjudice subi", "punir l'auteur d'une infraction", "emprisonner le responsable", "prévenir les infractions futures"], ans: 0, chapter: "responsabilite", difficulty: "facile", exp: "Le but de la RC est d'indemniser/réparer pour la victime. Punir ou emprisonner relève de la responsabilité pénale." },
    { q: "Le critère de la « personne prudente et raisonnable » a remplacé quel ancien critère ?", opts: ["le « bon père de famille »", "le « bon citoyen »", "le « bon voisin »", "le « bon samaritain »"], ans: 0, chapter: "responsabilite", difficulty: "intermediaire", exp: "Pour apprécier la faute, on compare le comportement à celui d'une personne prudente et raisonnable. Ce critère a remplacé celui du « bon père de famille »." },
    { q: "La théorie de la « condition nécessaire » (lien de causalité) signifie que :", opts: ["sans la faute, le dommage ne se serait pas produit tel qu'il s'est produit", "la faute doit être intentionnelle", "le dommage doit être prévisible", "la victime ne doit avoir commis aucune faute"], ans: 0, chapter: "responsabilite", difficulty: "difficile", exp: "La faute est la cause du dommage si, sans elle, le dommage ne se serait pas produit tel qu'il s'est produit (condition nécessaire / sine qua non)." },
    { q: "Le gardien d'un animal peut-il toujours s'exonérer s'il prouve qu'il a bien clôturé son terrain ?", opts: ["non, il reste responsable", "oui, toujours", "oui, mais seulement la nuit", "seulement s'il a une assurance"], ans: 0, chapter: "responsabilite", difficulty: "difficile", exp: "Faux : même si le terrain est bien clôturé, le gardien reste responsable. (En revanche, la force majeure peut exonérer le propriétaire d'un bâtiment.)" },
    // ── Les sources des obligations (art. 5.1, 205, 5.137) ──
    { q: "Selon l'art. 5.1 du Code civil, une obligation est :", opts: ["un lien de droit : le créancier peut exiger du débiteur l'exécution d'une prestation", "une simple promesse sans valeur", "une loi votée au parlement", "une décision de la police"], ans: 0, chapter: "obligations", difficulty: "intermediaire", exp: "Obligation = lien de droit. Le créancier (à qui on doit) peut exiger du débiteur (qui doit) une prestation : donner, faire ou ne pas faire." },
    { q: "Quelles sont les 3 sources des obligations ?", opts: ["la loi, le contrat, les faits juridiques", "le juge, l'avocat, le notaire", "l'écrit, le témoignage, l'aveu", "la faute, le dommage, le lien"], ans: 0, chapter: "obligations", difficulty: "facile", exp: "Une obligation naît soit de la loi, soit d'un contrat, soit d'un fait juridique." },
    { q: "L'obligation des enfants de verser des aliments à leurs parents dans le besoin (art. 205) naît :", opts: ["de la loi", "d'un contrat", "d'un quasi-contrat", "d'un serment"], ans: 0, chapter: "obligations", difficulty: "intermediaire", exp: "Personne n'a rien signé : c'est la loi (art. 205) qui impose directement cette obligation." },
    { q: "La responsabilité extracontractuelle (délit, quasi-délit) est une obligation née :", opts: ["d'un fait juridique", "d'un contrat", "de la loi seule", "d'un serment"], ans: 0, chapter: "obligations", difficulty: "intermediaire", exp: "Le délit/quasi-délit est un fait juridique : il oblige à réparer le dommage causé, même sans contrat (art. 5.137)." },
    { q: "Différence entre délit et quasi-délit ?", opts: ["délit = faute intentionnelle ; quasi-délit = faute non intentionnelle (négligence)", "aucune différence", "le délit est civil, le quasi-délit pénal", "le délit ne concerne que les contrats"], ans: 0, chapter: "obligations", difficulty: "difficile", exp: "Délit = faute volontaire/intentionnelle ; quasi-délit = faute involontaire (imprudence, négligence). Les deux obligent à réparer." },
    // ── Les voisins : les servitudes (droit de propriété) ──
    { q: "Une servitude est :", opts: ["une charge imposée à un fonds (servant) au profit d'un autre fonds (dominant)", "un impôt sur les terrains", "un contrat de location", "une amende infligée au voisin"], ans: 0, chapter: "servitudes", difficulty: "intermediaire", exp: "Servitude = charge sur le fonds servant au profit du fonds dominant, appartenant à un autre propriétaire." },
    { q: "Le fonds DOMINANT est :", opts: ["le terrain qui profite de la servitude", "le terrain qui supporte la charge", "le terrain de l'État", "le plus grand terrain"], ans: 0, chapter: "servitudes", difficulty: "facile", exp: "Dominant = celui qui a le droit (qui profite). Servant = celui qui supporte la charge." },
    { q: "Un terrain sans accès direct à la voie publique est dit :", opts: ["enclavé", "dominant", "indivis", "servant"], ans: 0, chapter: "servitudes", difficulty: "facile", exp: "Un terrain enclavé est séparé de la voie publique par d'autres fonds → il a besoin d'une servitude de passage." },
    { q: "La servitude de passage permet au fonds dominant de :", opts: ["passer sur le fonds servant sans en devenir propriétaire", "devenir propriétaire du terrain voisin", "interdire l'accès au voisin", "ne plus payer d'impôts"], ans: 0, chapter: "servitudes", difficulty: "intermediaire", exp: "La servitude donne un droit de passage ; le fonds servant reste la propriété de son propriétaire, qui doit supporter le passage." },
    { q: "Pourquoi la servitude de passage répond-elle à un « besoin économique » ?", opts: ["sans accès à la route, le terrain enclavé est inexploitable", "parce qu'elle rapporte de l'argent à l'État", "parce qu'elle fait monter les impôts", "parce qu'elle crée des emplois"], ans: 0, chapter: "servitudes", difficulty: "difficile", exp: "Un terrain enclavé qu'on ne peut ni atteindre ni exploiter perd toute valeur : le passage est une nécessité économique." },
    // ── L'extinction des obligations (5 modes) ──
    { q: "Combien de modes d'extinction des obligations vois-tu au cours ?", opts: ["5", "3", "7", "2"], ans: 0, chapter: "extinction", difficulty: "facile", exp: "5 : la confusion, la compensation, la novation, la remise de dette et la prescription." },
    { q: "La confusion éteint une obligation quand :", opts: ["les qualités de créancier et de débiteur se réunissent sur la même personne", "le créancier oublie sa créance", "le débiteur déménage", "deux contrats se ressemblent"], ans: 0, chapter: "extinction", difficulty: "intermediaire", exp: "Confusion : on devient à la fois créancier et débiteur (ex. on hérite de son créancier) → la dette s'éteint." },
    { q: "La compensation, c'est :", opts: ["l'extinction de deux dettes réciproques jusqu'à concurrence de la plus petite", "payer en plusieurs fois", "annuler un contrat", "transférer une dette à un tiers"], ans: 0, chapter: "extinction", difficulty: "intermediaire", exp: "Deux personnes se doivent mutuellement de l'argent : les dettes s'effacent jusqu'au montant le plus petit (dettes exigibles)." },
    { q: "La novation consiste à :", opts: ["remplacer une obligation existante par une obligation nouvelle", "diviser une dette en deux", "supprimer toute dette", "prouver une dette"], ans: 0, chapter: "extinction", difficulty: "intermediaire", exp: "Novation = substituer une nouvelle obligation (changement de débiteur, d'objet ou de créancier)." },
    { q: "La remise de dette, c'est quand :", opts: ["le créancier abandonne volontairement tout ou partie de sa créance", "le débiteur refuse de payer", "le juge annule la dette", "la dette est payée en retard"], ans: 0, chapter: "extinction", difficulty: "facile", exp: "Remise de dette : le créancier renonce, de son plein gré, à tout ou partie de ce qu'on lui doit." },
    { q: "La prescription éteint une obligation :", opts: ["après un certain temps (délai ordinaire de 30 ans)", "immédiatement", "seulement par écrit", "uniquement chez le notaire"], ans: 0, chapter: "extinction", difficulty: "intermediaire", exp: "Avec le temps, l'obligation s'éteint. Délai ordinaire : 30 ans ; parfois plus court (ex. 1 an pour les sommes dues aux commerçants)." },
    // ── L'usufruit (démembrement de la propriété) ──
    { q: "Les 3 prérogatives de la propriété (droit romain) sont :", opts: ["l'usus, le fructus et l'abusus", "la loi, le contrat et le fait", "le terme, la condition et la solidarité", "l'erreur, le dol et la violence"], ans: 0, chapter: "usufruit", difficulty: "intermediaire", exp: "Usus (utiliser), fructus (percevoir les fruits), abusus (disposer : vendre, détruire)." },
    { q: "L'usufruitier possède :", opts: ["l'usus et le fructus (utiliser + percevoir les fruits)", "l'abusus seul", "les 3 prérogatives", "aucun droit sur le bien"], ans: 0, chapter: "usufruit", difficulty: "intermediaire", exp: "L'usufruitier peut utiliser le bien et en percevoir les fruits, mais pas en disposer." },
    { q: "Le droit de disposer du bien (vendre, détruire) s'appelle :", opts: ["l'abusus", "l'usus", "le fructus", "la prescription"], ans: 0, chapter: "usufruit", difficulty: "facile", exp: "L'abusus = le droit de disposer ; il reste au nu-propriétaire." },
    { q: "Dans un usufruit, qui conserve l'abusus ?", opts: ["le nu-propriétaire", "l'usufruitier", "l'État", "le juge"], ans: 0, chapter: "usufruit", difficulty: "facile", exp: "Le nu-propriétaire garde le droit de disposer (abusus) ; l'usufruitier n'a que l'usus et le fructus." },
    { q: "L'usufruit est défini par l'article :", opts: ["3.138 du nouveau Code civil", "1382 de l'ancien Code civil", "8.4 du Code civil", "205 du Code civil"], ans: 0, chapter: "usufruit", difficulty: "difficile", exp: "L'usufruit est défini à l'article 3.138 du nouveau Code civil." },
    { q: "À un décès, l'attribution classique est :", opts: ["usufruit au conjoint survivant, nue-propriété aux enfants", "tout à l'État", "pleine propriété au conjoint", "nue-propriété au conjoint, usufruit aux enfants"], ans: 0, chapter: "usufruit", difficulty: "intermediaire", exp: "Cas typique d'une succession : le conjoint survivant reçoit l'usufruit, les enfants la nue-propriété (origine romaine : protéger la veuve)." }
  ];

  /* ---------------------- FLASHCARDS ---------------------- */
  var flashcards = [
    { front: "Définition d'un contrat (art. 5.4) ?", back: "« Le contrat, ou convention, est un <strong>accord de volontés entre deux ou plusieurs personnes</strong> avec l'<strong>intention de faire naître des effets de droit</strong>. » (nouvel art. 5.4 du Code civil).", chapter: "contrats" },
    { front: "L'autonomie de la volonté ?", back: "Chaque partie est <strong>libre</strong> de contracter, de <strong>choisir son cocontractant</strong> et de <strong>fixer le contenu</strong> du contrat — dans les limites des <strong>lois impératives</strong> et de l'ordre public.", chapter: "contrats" },
    { front: "Loi supplétive vs loi impérative ?", back: "<strong>Supplétive</strong> : complète le contrat muet, <strong>écartable</strong> par les parties. <strong>Impérative</strong> : protège la <strong>partie faible</strong>, <strong>non écartable</strong>.", chapter: "contrats" },
    { front: "Les 3 vices du consentement ?", back: "<strong>Erreur</strong> (involontaire, sur un élément fondamental) · <strong>Dol</strong> (machination volontaire/tromperie) · <strong>Violence</strong> (menace physique ou morale). Ils rendent le contrat <strong>annulable</strong>.", chapter: "contrats" },
    { front: "Qui est incapable de contracter ?", back: "Les <strong>mineurs</strong> et les personnes atteintes de <strong>déficience mentale</strong>.", chapter: "contrats" },
    { front: "Les causes d'incapacité de contracter ?", back: "L'<strong>âge</strong> (le mineur d'âge), l'<strong>état mental</strong> (déficience mentale d'un adulte), ou un <strong>autre fait</strong> (ex. personne condamnée pour fraude, interdite d'activité indépendante).", chapter: "contrats" },
    { front: "Le vice du consentement : l'erreur ?", back: "Une <strong>fausse information ou une absence d'information involontaire</strong>. Elle annule le contrat seulement si elle porte sur un <strong>élément substantiel (fondamental)</strong>.", chapter: "contrats" },
    { front: "Le vice du consentement : le dol ?", back: "Une <strong>machination</strong> (donc <strong>volontaire</strong>) : des manœuvres d'une partie pour amener l'autre à conclure. → annulation ou <strong>dommages et intérêts</strong>. Ex. : trafiquer le compteur d'une voiture.", chapter: "contrats" },
    { front: "Le vice du consentement : la violence ?", back: "Le consentement est obtenu sous la <strong>menace, physique ou morale</strong> (ex. un chantage). Le contrat est annulable.", chapter: "contrats" },
    { front: "Les 2 restrictions incontournables à la liberté contractuelle ?", back: "Le respect de l'<strong>ordre public</strong> (ex. interdit : engager un tueur à gages) et des <strong>lois impératives</strong> (qui protègent le cocontractant faible, ex. salaire minimum).", chapter: "contrats" },
    { front: "Loi supplétive : un exemple ?", back: "Les <strong>frais de transport</strong> : le Code civil les met à charge du <strong>vendeur</strong>, mais comme la règle est supplétive, on peut préciser dans le contrat qu'ils sont à charge de l'<strong>acheteur</strong>.", chapter: "contrats" },
    { front: "Terme vs condition (obligations) ?", back: "<strong>Terme</strong> = événement futur et <strong>certain</strong> (suspensif / extinctif). <strong>Condition</strong> = futur et <strong>incertain</strong> (suspensive : suspend la naissance / résolutoire : annule).", chapter: "obligations" },
    { front: "Divisibilité (principe des obligations) ?", back: "La <strong>dette</strong> se divise par le nombre de <strong>débiteurs</strong>, la <strong>créance</strong> par le nombre de <strong>créanciers</strong>. Ex. : X et Y prêtent 10.000 € à Z → chacun réclame <strong>5.000 €</strong>.", chapter: "obligations" },
    { front: "Solidarité active vs passive ?", back: "<strong>Active</strong> (plusieurs créanciers) : le débiteur peut tout payer à un seul. <strong>Passive</strong> (plusieurs débiteurs) : le créancier peut réclamer <strong>tout à un seul</strong> débiteur (qui se retourne ensuite vers les autres).", chapter: "obligations" },
    { front: "L'indivisibilité d'une obligation ?", back: "L'obligation est indivisible si son <strong>objet</strong> l'est : <strong>par nature</strong> (ex. livrer un bateau) ou <strong>en matière de prêt</strong> (emprunteurs solidairement responsables).", chapter: "obligations" },
    { front: "Les 5 modes de preuve en droit civil belge ?", back: "<strong>1. L'écrit</strong> (acte authentique / sous signature privée) · <strong>2. Le témoignage</strong> · <strong>3. Les présomptions</strong> · <strong>4. L'aveu</strong> · <strong>5. Le serment</strong>.", chapter: "preuve" },
    { front: "Charge de la preuve (art. 8.4 Code civil) ?", back: "<strong>Celui qui réclame</strong> (qui allègue un fait) doit le <strong>prouver</strong> — pas celui qui nie.", chapter: "preuve" },
    { front: "Acte authentique vs acte sous signature privée ?", back: "<strong>Authentique</strong> : reçu par un <strong>officier public</strong> (notaire, huissier) → force forte. <strong>Sous signature privée</strong> : signé par les parties seules → force <strong>moindre</strong>, contestable.", chapter: "preuve" },
    { front: "Qu'est-ce qu'une présomption (définition) ?", back: "La <strong>déduction d'un fait inconnu</strong> à partir d'un ou plusieurs <strong>faits connus</strong>.", chapter: "preuve" },
    { front: "Présomption légale vs présomption de fait ?", back: "<strong>Légale</strong> : prévue par la loi → <strong>s'impose au juge</strong>. <strong>De fait</strong> : <strong>appréciée par le juge</strong> ; indices <strong>sérieux, précis et concordants</strong>.", chapter: "preuve" },
    { front: "Aveu judiciaire vs extrajudiciaire ?", back: "<strong>Judiciaire</strong> (devant le juge) : <strong>irrévocable</strong>, force très forte. <strong>Extrajudiciaire</strong> (SMS, e-mail) : force <strong>moindre</strong>.", chapter: "preuve" },
    { front: "La règle des 3.500 € (preuve) ?", back: "Acte juridique <strong>≥ 3.500 €</strong> → <strong>écrit signé obligatoire</strong>. En dessous → <strong>preuve libre</strong> (tous modes admis). La signature électronique qualifiée (itsme, eID) = même valeur que la manuscrite.", chapter: "preuve" },
    { front: "Le serment est-il un mode de preuve courant ?", back: "<strong>Non</strong> : le serment est <strong>devenu rare</strong> dans la pratique judiciaire moderne. Il reste néanmoins l'un des <strong>5 modes</strong> de preuve.", chapter: "preuve" },
    { front: "Un huissier peut-il dresser un constat électronique ?", back: "<strong>Oui</strong> : un huissier peut établir un <strong>constat électronique</strong> qui a <strong>valeur d'acte authentique</strong>.", chapter: "preuve" },
    { front: "Qu'est-ce que le débat contradictoire ?", back: "Tous les éléments de preuve invoqués par une partie doivent être <strong>examinés et discutés par l'autre partie</strong>.", chapter: "preuve" },
    { front: "Définition de l'acte authentique (art. 8.15) ?", back: "Un <strong>écrit reçu, avec les solennités requises, par un officier public ou ministériel ayant compétence et qualité pour instrumenter</strong> (notaire, huissier, greffier). Il <strong>fait pleine foi</strong> (sauf si on prouve un faux).", chapter: "preuve" },
    { front: "Définition de l'acte sous signature privée (art. 8.15) ?", back: "Un <strong>écrit établi en vue de créer des conséquences juridiques, signé par la ou les parties avec l'intention de s'en approprier le contenu</strong>, et qui n'est pas authentique. Force probante forte <strong>entre les parties</strong>.", chapter: "preuve" },
    { front: "La preuve par témoin (art. 8.28) ?", back: "Une personne <strong>raconte devant le juge ce qu'elle a vu, entendu ou vécu</strong>. Admise seulement si la loi autorise la <strong>preuve libre</strong> ; le juge croit (ou non) librement le témoin.", chapter: "preuve" },
    { front: "Qu'est-ce que le serment décisoire ?", back: "Une <strong>déclaration solennelle</strong> devant le juge dont dépend le procès : si la partie <strong>jure</strong>, elle gagne ; si elle <strong>refuse de jurer</strong>, elle perd automatiquement.", chapter: "preuve" },
    { front: "Quelles sont les conditions d'une présomption de fait valable ?", back: "Les indices doivent être <strong>sérieux</strong> (crédibles), <strong>précis</strong> (concrets) et <strong>concordants</strong> (qui pointent dans la même direction).", chapter: "preuve" },
    { front: "Qu'est-ce que la mondialisation ?", back: "La mise en relation des parties du monde par l'<strong>intensification des échanges</strong> (marchandises, services, capitaux, informations, personnes) → <strong>interdépendance</strong> des pays.", chapter: "mondialisation" },
    { front: "Les 5 types de flux mondiaux ?", back: "<strong>Marchandises</strong>, <strong>services</strong>, <strong>capitaux</strong> (argent), <strong>informations</strong>, <strong>personnes</strong> (migrations).", chapter: "mondialisation" },
    { front: "Les 3 plus grands exportateurs de marchandises ?", back: "La <strong>Chine</strong> (1ᵉ⁰), les <strong>États-Unis</strong>, l'<strong>Allemagne</strong>.", chapter: "mondialisation" },
    { front: "Qu'est-ce que la Triade ?", back: "Les <strong>3 grands pôles</strong> économiques : <strong>Amérique du Nord</strong>, <strong>Europe</strong>, <strong>Asie de l'Est</strong>. Ils font ≈ <strong>¾ du commerce mondial</strong> (beaucoup d'échanges intra-régionaux).", chapter: "mondialisation" },
    { front: "Qu'est-ce qu'une firme multinationale (FMN) ?", back: "Une entreprise présente dans <strong>plusieurs pays</strong> (Apple, Samsung, Nike…). Ce sont les grands <strong>acteurs</strong> de la mondialisation.", chapter: "mondialisation" },
    { front: "La chaîne de valeur mondiale (ex. iPhone) ?", back: "Répartir les <strong>étapes de fabrication</strong> entre plusieurs pays pour produire moins cher. iPhone : <strong>conçu</strong> en Californie, <strong>composants</strong> du monde entier, <strong>assemblé</strong> en Chine.", chapter: "mondialisation" },
    { front: "Qu'est-ce que la balance commerciale ?", back: "La <strong>différence</strong> entre les <strong>exportations (X)</strong> et les <strong>importations (M)</strong> de marchandises. <strong>X &gt; M</strong> → excédent · <strong>X &lt; M</strong> → déficit · <strong>X = M</strong> → équilibre.", chapter: "mondialisation" },
    { front: "Qu'est-ce que la délocalisation ?", back: "<strong>Transférer une activité</strong> (production, service) vers un <strong>autre pays</strong> où les <strong>coûts</strong> (main-d'œuvre) sont plus faibles → cause de pertes d'emplois (risque économique).", chapter: "mondialisation" },
    { front: "Pourquoi parle-t-on du port d'Anvers ?", back: "C'est l'un des plus grands ports d'Europe (≈ <strong>278 millions de tonnes</strong> en 2024) : la « <strong>mondialisation à notre porte</strong> » (Belgique).", chapter: "mondialisation" },
    { front: "Les 3 risques de la mondialisation ?", back: "<strong>Économique</strong> : perte d'emplois (délocalisations).<br><strong>Social</strong> : inégalités, mauvaises conditions de travail.<br><strong>Environnemental</strong> : pollution, épuisement des ressources.", chapter: "mondialisation" },
    { front: "Risque économique de la mondialisation ?", back: "La <strong>perte d'emplois</strong> dans les pays riches à cause des <strong>délocalisations</strong> (usines déplacées où la main-d'œuvre coûte moins cher).", chapter: "mondialisation" },
    { front: "Risque environnemental de la mondialisation ?", back: "L'impact des entreprises sur l'environnement : <strong>pollution</strong> (transports, usines) et <strong>épuisement des ressources</strong> naturelles.", chapter: "mondialisation" },
    { front: "2 avantages de la mondialisation ?", back: "Des produits <strong>moins chers</strong> et un plus grand <strong>choix</strong> ; de la <strong>croissance</strong> et du développement pour certains pays.", chapter: "mondialisation" },
    { front: "Qu'est-ce que la responsabilité civile ? (but)", back: "L'obligation de <strong>réparer le dommage</strong> causé à autrui. Son <strong>but</strong> est d'<strong>indemniser la victime</strong> pour le préjudice subi (la responsabilité <em>pénale</em>, elle, vise à <em>punir</em> l'auteur).", chapter: "responsabilite" },
    { front: "Les 3 conditions de la responsabilité civile ?", back: "Une <strong>faute</strong> (ou un fait), un <strong>dommage</strong>, et un <strong>lien de causalité</strong> entre les deux. Les trois en même temps.", chapter: "responsabilite" },
    { front: "Responsabilité du fait personnel / d'autrui / des choses ?", back: "<strong>Fait personnel</strong> : ses propres actes. <strong>Fait d'autrui</strong> : parents (enfants), instituteurs (élèves), employeur (employés). <strong>Fait des choses</strong> : le <strong>gardien</strong> de la chose.", chapter: "responsabilite" },
    { front: "Les 3 types de dommages réparables ?", back: "<strong>Matériel</strong> (dégâts patrimoniaux), <strong>corporel</strong> (blessures, handicap), <strong>moral</strong> (souffrance psychologique). Le dommage doit être <strong>certain</strong>.", chapter: "responsabilite" },
    { front: "Définition de la faute (le fait générateur, RC) ?", back: "Un <strong>comportement qui ne respecte pas les règles de prudence qu'une personne normalement prudente aurait adoptées dans les mêmes circonstances</strong>.", chapter: "responsabilite" },
    { front: "Responsabilité du fait des animaux (art. 6.15) ?", back: "Le <strong>propriétaire</strong> d'un animal ou <strong>celui qui s'en sert (le gardien)</strong> est responsable des dommages causés par l'animal, <strong>même si l'animal s'est échappé ou égaré</strong>. Responsabilité <strong>objective</strong> (pas besoin de prouver une faute).", chapter: "responsabilite" },
    { front: "Responsabilité du fait des choses (art. 6.13) ?", back: "Le <strong>gardien</strong> de la chose est responsable <strong>objectivement</strong> si la chose a un <strong>vice</strong> ou a joué un <strong>rôle actif</strong> dans le dommage.", chapter: "responsabilite" },
    { front: "Un dommage hypothétique est-il réparable ?", back: "<strong>Non.</strong> Le dommage doit être <strong>certain</strong> (réel). Un dommage seulement incertain/possible n'est pas réparable.", chapter: "responsabilite" },
    { front: "Comment répare-t-on un dommage ?", back: "En général par des <strong>dommages-intérêts</strong> (une somme d'argent versée à la victime).", chapter: "responsabilite" },
    { front: "Responsabilité civile vs pénale ?", back: "<strong>Civile</strong> = <strong>indemniser la victime</strong> (dommages-intérêts). <strong>Pénale</strong> = <strong>punir</strong> une infraction au nom de la société (amende, prison). ⚠️ Pour un <strong>même fait</strong>, les deux peuvent <strong>coexister</strong>.", chapter: "responsabilite" },
    { front: "À quel âge est-on responsable civilement (Belgique) ?", back: "Pas d'<strong>âge fixe</strong> : ce qui compte est le <strong>discernement</strong> (comprendre la portée de ses actes), apprécié par le juge.", chapter: "responsabilite" },
    { front: "À quoi sert une assurance RC ?", back: "L'assurance <strong>responsabilité civile</strong> (ex. RC familiale) <strong>couvre les dommages</strong> que tu causes à autrui.", chapter: "responsabilite" },
    { front: "Critère pour apprécier la faute (RC) ?", back: "Celui de la <strong>personne prudente et raisonnable</strong> (placée dans les mêmes circonstances). Ce critère a <strong>remplacé</strong> celui du « <strong>bon père de famille</strong> ».", chapter: "responsabilite" },
    { front: "Lien de causalité : la théorie de la condition nécessaire ?", back: "La faute est la cause du dommage si, <strong>sans elle, le dommage ne se serait pas produit</strong> tel qu'il s'est produit.", chapter: "responsabilite" },
    { front: "Le gardien d'un animal peut-il toujours s'exonérer ?", back: "<strong>Non</strong> : même si le terrain est bien clôturé, il <strong>reste responsable</strong>. En revanche, la <strong>force majeure</strong> (ex. tempête exceptionnelle) peut exonérer le propriétaire d'un <strong>bâtiment</strong>.", chapter: "responsabilite" },
    { front: "Définition d'une obligation (art. 5.1) ?", back: "Un <strong>lien de droit</strong> : le <strong>créancier</strong> peut exiger d'un <strong>débiteur</strong> l'exécution d'une <strong>prestation</strong> (donner, faire, ne pas faire).", chapter: "obligations" },
    { front: "Les 3 sources des obligations ?", back: "<strong>1. La loi</strong> (ex. art. 205 : aliments) · <strong>2. Le contrat</strong> (accord de volontés) · <strong>3. Les faits juridiques</strong> (responsabilité extracontractuelle + quasi-contrats).", chapter: "obligations" },
    { front: "Délit vs quasi-délit ?", back: "<strong>Délit</strong> = faute <strong>intentionnelle</strong>. <strong>Quasi-délit</strong> = faute <strong>non intentionnelle</strong> (négligence, imprudence). Les deux obligent à <strong>réparer</strong> (art. 5.137).", chapter: "obligations" },
    { front: "Qu'est-ce qu'un quasi-contrat ?", back: "Un engagement <strong>sans rien avoir signé</strong> : ex. gérer l'affaire d'un absent, ou devoir <strong>rembourser</strong> une somme reçue <strong>par erreur</strong>.", chapter: "obligations" },
    { front: "Qu'est-ce qu'une servitude ?", back: "Une <strong>charge</strong> imposée à un terrain (le <strong>fonds servant</strong>) au profit d'un autre terrain (le <strong>fonds dominant</strong>), appartenant à un autre propriétaire.", chapter: "servitudes" },
    { front: "Fonds dominant vs fonds servant ?", back: "<strong>Dominant</strong> = le terrain qui <strong>profite</strong> de la servitude (il a le droit). <strong>Servant</strong> = le terrain qui <strong>supporte</strong> la charge.", chapter: "servitudes" },
    { front: "Qu'est-ce qu'un terrain enclavé ?", back: "Un terrain <strong>sans accès direct à la voie publique</strong> (séparé d'elle par d'autres fonds) → il a besoin d'une <strong>servitude de passage</strong>.", chapter: "servitudes" },
    { front: "La servitude de passage ?", back: "Elle donne au fonds dominant le <strong>droit de passer</strong> sur le fonds servant <strong>sans en devenir propriétaire</strong>. Elle répond au <strong>besoin économique</strong> d'exploiter un terrain enclavé.", chapter: "servitudes" },
    { front: "Responsabilité du fait des animaux / des choses : que prouver ?", back: "C'est une responsabilité <strong>objective</strong> : pour l'<strong>animal</strong>, prouver seulement qu'il a <strong>causé le dommage</strong> ; pour la <strong>chose</strong>, que le <strong>gardien</strong> en répond si elle a un <strong>vice</strong> ou a joué un <strong>rôle actif</strong>.", chapter: "responsabilite" },
    { front: "Quel mode de preuve a la force probante la plus forte ?", back: "L'<strong>aveu</strong> (surtout l'aveu <strong>judiciaire</strong>, irrévocable).", chapter: "preuve" },
    { front: "Les 5 modes d'extinction des obligations ?", back: "<strong>1. La confusion</strong> · <strong>2. La compensation</strong> · <strong>3. La novation</strong> · <strong>4. La remise de dette</strong> · <strong>5. La prescription</strong>.", chapter: "extinction" },
    { front: "L'extinction par confusion ?", back: "Les qualités de <strong>créancier</strong> et de <strong>débiteur</strong> se réunissent sur la <strong>même personne</strong> (ex. on <strong>hérite</strong> de son créancier) → la dette s'éteint.", chapter: "extinction" },
    { front: "L'extinction par compensation ?", back: "<strong>Deux dettes réciproques</strong> s'effacent <strong>jusqu'à concurrence de la plus petite</strong> (les deux dettes doivent être <strong>exigibles</strong>).", chapter: "extinction" },
    { front: "L'extinction par novation ?", back: "On <strong>remplace</strong> une obligation existante par une <strong>obligation nouvelle</strong> : changement de <strong>débiteur</strong>, d'<strong>objet</strong> ou de <strong>créancier</strong>.", chapter: "extinction" },
    { front: "L'extinction par remise de dette ?", back: "Le <strong>créancier abandonne volontairement</strong> tout ou partie de sa <strong>créance</strong>.", chapter: "extinction" },
    { front: "L'extinction par prescription ?", back: "L'obligation s'éteint <strong>après un certain temps</strong> : délai ordinaire <strong>30 ans</strong> (parfois plus court, ex. <strong>1 an</strong> pour les sommes dues aux commerçants).", chapter: "extinction" },
    { front: "Les 3 prérogatives de la propriété ?", back: "<strong>L'usus</strong> (utiliser) · <strong>le fructus</strong> (percevoir les fruits) · <strong>l'abusus</strong> (disposer : vendre, donner, détruire).", chapter: "usufruit" },
    { front: "Qu'est-ce que l'usufruit (art. 3.138) ?", back: "Un <strong>démembrement</strong> de la propriété : le droit d'<strong>utiliser</strong> un bien d'autrui et d'en <strong>percevoir les fruits</strong>, avec l'<strong>obligation de le restituer</strong> à la fin.", chapter: "usufruit" },
    { front: "Usufruitier vs nu-propriétaire ?", back: "L'<strong>usufruitier</strong> a l'<strong>usus + le fructus</strong> (il jouit du bien). Le <strong>nu-propriétaire</strong> garde l'<strong>abusus</strong> (le droit de disposer).", chapter: "usufruit" },
    { front: "L'usufruit est-il définitif ?", back: "<strong>Non, il est temporaire</strong> : à la fin (souvent au décès de l'usufruitier), le nu-propriétaire récupère la <strong>pleine propriété</strong>.", chapter: "usufruit" },
    { front: "Attribution classique de l'usufruit (succession) ?", back: "L'<strong>usufruit</strong> revient au <strong>conjoint survivant</strong> et la <strong>nue-propriété</strong> aux <strong>enfants</strong> (origine romaine : protéger la veuve).", chapter: "usufruit" }
  ];

  window.registerSubject('eco', {
    subtitle: 'Sciences éco (4ᵉ) — mondialisation & droit civil (responsabilité, obligations, extinction, preuve, contrats, servitudes, usufruit)',
    content: {
      sections: sections,
      coursAuto: true,
      questions: questions,
      flashcards: flashcards,
      demos: {},
      navLabels: { formules: '📌 Repères', exercices: '🎯 Exercices' },
      chapOrder: ['mondialisation', 'responsabilite', 'preuve', 'obligations', 'extinction', 'contrats', 'servitudes', 'usufruit'],
      chapLabels: { mondialisation: 'La mondialisation', responsabilite: 'Responsabilité civile', preuve: 'Modes de preuve (droit civil)', obligations: 'Les obligations (modalités & sources)', extinction: 'L\'extinction des obligations', contrats: 'Le droit des contrats', servitudes: 'Les voisins & servitudes', usufruit: 'L\'usufruit' }
    }
  });
})();
