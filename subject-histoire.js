/* GR2 Study — Contenu HISTOIRE (4ème)
   Les Temps modernes : grandes périodes · le livre (imprimerie) ·
   Humanisme & Renaissance · Réforme protestante · Absolutisme (Louis XIV)
   + compétence « critique de document » + onglet Personnages.
   S'enregistre auprès de subjects.js via window.registerSubject. */
(function () {
  'use strict';
  if (typeof window.registerSubject !== 'function') return;

  /* Infos affichées quand on clique sur une image (cours + examen) */
  window.IMG_INFO = window.IMG_INFO || {};
  Object.assign(window.IMG_INFO, {
    "gutenberg.jpg": {
      title: "Gutenberg & l'imprimerie", sub: "≈ 1400–1468 · invention vers 1450",
      cours: "<p>Avant, les livres étaient <strong>copiés à la main</strong> (manuscrits) : rares, longs à produire et très chers. Vers <strong>1450</strong>, <strong>Johannes Gutenberg</strong> invente l'imprimerie à <strong>caractères mobiles</strong> (à Mayence, en Allemagne).</p>",
      exam: "<ul><li><strong>Date :</strong> ≈ 1450 · <strong>Lieu :</strong> Mayence.</li><li><strong>2 conséquences à citer :</strong> livres moins chers et plus nombreux + <strong>diffusion rapide des idées</strong> (Humanisme, Réforme).</li><li>Piège : ce n'est <em>pas</em> Luther — Luther s'en servira pour diffuser ses idées.</li></ul>",
      anecdote: "Sa célèbre <strong>Bible à 42 lignes</strong> (≈ 1455) est l'un des tout premiers livres imprimés d'Europe. Pourtant Gutenberg a fini <strong>ruiné</strong> : son associé Fust lui a fait un procès et a récupéré son atelier !"
    },
    "erasme.jpg": {
      title: "Érasme", sub: "1466–1536 · humaniste",
      cours: "<p><strong>Érasme</strong> de Rotterdam est le plus célèbre <strong>humaniste</strong>. Auteur de « <strong>L'Éloge de la folie</strong> », il défend le savoir, la raison et l'esprit critique.</p>",
      exam: "<ul><li><strong>Mouvement :</strong> l'Humanisme (l'homme et la raison au centre).</li><li><strong>Œuvre :</strong> L'Éloge de la folie.</li><li>Autres humanistes : <strong>Thomas More</strong> (Utopia), Rabelais, Montaigne.</li></ul>",
      anecdote: "Surnommé « le prince des humanistes », il écrivait en latin et parcourait toute l'Europe. Il critiquait les abus de l'Église… mais n'est <strong>jamais devenu protestant</strong>, contrairement à Luther."
    },
    "vinci.jpg": {
      title: "Léonard de Vinci", sub: "1452–1519 · artiste & savant",
      cours: "<p>Génie de la <strong>Renaissance</strong> : peintre (La Joconde, La Cène), mais aussi ingénieur, anatomiste, inventeur. Il incarne l'« homme universel » qui touche à tout.</p>",
      exam: "<ul><li><strong>Période :</strong> Renaissance (née en <strong>Italie</strong>).</li><li><strong>Œuvre phare :</strong> La Joconde.</li><li>Avec <strong>Michel-Ange</strong> et Raphaël : perspective, réalisme, corps humain.</li></ul>",
      gallery: [{ src: "joconde.jpg", cap: "La Joconde" }, { src: "cene.jpg", cap: "La Cène" }, { src: "vitruve.jpg", cap: "Homme de Vitruve" }],
      anecdote: "Il écrivait à l'envers, en <strong>écriture miroir</strong> (lisible seulement dans un miroir). Il a aussi dessiné des <strong>machines volantes</strong> et un char d'assaut, des siècles avant leur invention !"
    },
    "joconde.jpg": {
      title: "La Joconde", sub: "≈ 1503–1519 · Léonard de Vinci",
      cours: "<p>Le tableau le plus célèbre du monde, peint par <strong>Léonard de Vinci</strong>. Il illustre les progrès de la Renaissance : <strong>réalisme</strong>, jeu d'ombre et de lumière (sfumato), perspective.</p>",
      exam: "<ul><li>Savoir dire <strong>qui</strong> l'a peinte (Vinci) et de <strong>quelle période</strong> (Renaissance).</li><li>Exemple parfait pour illustrer « l'art de la Renaissance ».</li></ul>"
    },
    "michelange.jpg": {
      title: "Michel-Ange", sub: "1475–1564 · artiste",
      cours: "<p>Grand artiste de la <strong>Renaissance</strong> italienne : sculpteur (le <strong>David</strong>) et peintre (le plafond de la <strong>chapelle Sixtine</strong>, au Vatican).</p>",
      exam: "<ul><li><strong>2 œuvres :</strong> le David (sculpture) · le plafond de la chapelle Sixtine (peinture).</li><li>À ne pas confondre avec Léonard de Vinci.</li></ul>",
      gallery: [{ src: "david.jpg", cap: "Le David" }, { src: "sixtine.jpg", cap: "Chapelle Sixtine" }],
      anecdote: "Il a peint le <strong>plafond de la chapelle Sixtine</strong> allongé sur un échafaudage pendant ≈ 4 ans, la peinture lui tombant sur le visage. Il se voyait avant tout <strong>sculpteur</strong>, pas peintre."
    },
    "luther.jpg": {
      title: "Martin Luther", sub: "1483–1546 · la Réforme",
      cours: "<p>Moine allemand qui, en <strong>1517</strong>, affiche ses <strong>95 thèses</strong> (à Wittenberg) contre les abus de l'Église, surtout la vente des <strong>indulgences</strong>. Il lance le <strong>protestantisme</strong>.</p>",
      exam: "<ul><li><strong>Date clé : 1517</strong> (début de la Réforme).</li><li><strong>2 principes :</strong> le <strong>salut par la foi seule</strong> + la <strong>Bible</strong> comme seule autorité.</li><li>Conséquence : <strong>division de la chrétienté</strong> (catholiques / protestants).</li></ul>",
      anecdote: "Pour échapper à ses ennemis, il s'est caché au château de la <strong>Wartburg</strong> sous le faux nom de « chevalier Georges » — et en a profité pour <strong>traduire la Bible en allemand</strong>, lue par le peuple grâce à l'imprimerie."
    },
    "europe_religions.jpg": {
      title: "Les 95 thèses (1517)", sub: "document imprimé · Luther",
      cours: "<p>Les <strong>95 thèses</strong> de Luther, diffusées grâce à l'<strong>imprimerie</strong>, dénoncent les abus de l'Église. Elles se répandent très vite dans toute l'Europe et déclenchent la Réforme.</p>",
      exam: "<ul><li>Montre bien le lien <strong>imprimerie → diffusion des idées → Réforme</strong>.</li><li><strong>1517</strong>, Wittenberg, contre les indulgences.</li></ul>"
    },
    "calvin.jpg": {
      title: "Jean Calvin", sub: "1509–1564 · réformateur",
      cours: "<p>Réformateur français installé à <strong>Genève</strong>. Il développe une branche du protestantisme, le <strong>calvinisme</strong>, avec l'idée de la <strong>prédestination</strong> (Dieu a déjà choisi qui sera sauvé).</p>",
      exam: "<ul><li><strong>Ville :</strong> Genève · <strong>idée :</strong> prédestination.</li><li>Après Luther, c'est le 2ᵉ grand réformateur à retenir.</li></ul>",
      anecdote: "Sous son influence, <strong>Genève</strong> est devenue une cité très stricte (surnommée la « Rome protestante ») où les jeux, la danse et le luxe étaient sévèrement encadrés."
    },
    "trente.jpg": {
      title: "Le Concile de Trente", sub: "1545–1563 · Contre-Réforme",
      cours: "<p>Face à la Réforme protestante, l'Église catholique réagit : c'est la <strong>Contre-Réforme</strong>. Le <strong>Concile de Trente</strong> (1545-1563) réaffirme les dogmes catholiques et corrige certains abus. Les <strong>Jésuites</strong> en sont le fer de lance.</p>",
      exam: "<ul><li><strong>Mot-clé :</strong> Contre-Réforme (= réaction catholique).</li><li><strong>Dates : 1545-1563</strong> · + les <strong>Jésuites</strong>.</li></ul>"
    },
    "henri4.jpg": {
      title: "Henri IV", sub: "1553–1610 · Édit de Nantes",
      cours: "<p>Roi de France qui met fin aux <strong>guerres de religion</strong>. En <strong>1598</strong>, il signe l'<strong>Édit de Nantes</strong> : il accorde la <strong>tolérance</strong> religieuse aux protestants.</p>",
      exam: "<ul><li><strong>1598 = Édit de Nantes</strong> (tolérance, signé par Henri IV).</li><li>Piège : <strong>Louis XIV le révoque en 1685</strong>. Ne pas confondre <em>signer</em> (1598) / <em>révoquer</em> (1685).</li></ul>",
      anecdote: "Protestant devenu catholique pour pouvoir régner, on lui prête la phrase « <strong>Paris vaut bien une messe</strong> ». Très populaire, il souhaitait « <strong>une poule au pot</strong> » le dimanche pour chaque paysan."
    },
    "charlesquint.jpg": {
      title: "Charles Quint", sub: "1500–1558 · empereur",
      cours: "<p>Puissant empereur <strong>catholique</strong> (Saint-Empire + Espagne). Il règne aussi sur les <strong>Pays-Bas espagnols</strong> (dont nos régions actuelles) et combat les idées protestantes de Luther.</p>",
      exam: "<ul><li>Souverain <strong>catholique</strong> opposé à la Réforme.</li><li>Lien avec nos régions : les <strong>Pays-Bas espagnols</strong>.</li></ul>",
      anecdote: "On disait de son empire que « <strong>le soleil ne s'y couchait jamais</strong> ». Fatigué du pouvoir, il a fait une chose rarissime pour un empereur : il a <strong>abdiqué</strong> (1556) pour se retirer dans un monastère."
    },
    "louis14.jpg": {
      title: "Louis XIV, le Roi-Soleil", sub: "1638–1715 · absolutisme",
      cours: "<p>Le modèle de la <strong>monarchie absolue de droit divin</strong> : « <em>L'État, c'est moi</em> ». Il détient <strong>tous les pouvoirs</strong>, contrôle la noblesse à <strong>Versailles</strong> et s'appuie sur <strong>Colbert</strong> (mercantilisme).</p>",
      exam: "<ul><li><strong>Absolutisme :</strong> le roi a tous les pouvoirs (qu'il tient de Dieu).</li><li><strong>3 actions :</strong> Versailles (contrôle la noblesse) · Colbert + mercantilisme · <strong>révoque l'Édit de Nantes (1685)</strong>.</li></ul>",
      anecdote: "Sa journée était un véritable spectacle réglé minute par minute (le lever, les repas…) que la noblesse se disputait l'honneur d'observer. Il a régné <strong>72 ans</strong>, un record en Europe."
    },
    "versailles.jpg": {
      title: "Le château de Versailles", sub: "résidence de Louis XIV",
      cours: "<p>Immense château construit par <strong>Louis XIV</strong>. Il y attire la <strong>noblesse</strong> pour la <strong>surveiller</strong> et l'occuper (fêtes, étiquette) : ainsi elle ne peut plus se révolter. C'est un véritable outil de l'<strong>absolutisme</strong>.</p>",
      exam: "<ul><li>Versailles = <strong>instrument de pouvoir</strong> (contrôler la noblesse), pas qu'un beau château.</li><li>Symbole de la grandeur du Roi-Soleil.</li></ul>"
    }
  });

  /* Notions cliquables (fiches sans portrait dédié — image réutilisée) + mots → fiche */
  window.INFO_TOPICS = window.INFO_TOPICS || {};
  Object.assign(window.INFO_TOPICS, {
    "periode-prehistoire": {
      title: "La Préhistoire", sub: "des origines à ≈ −3300", theme: "print",
      cours: "<p>La <strong>Préhistoire</strong> va de l'apparition de l'être humain jusqu'à l'<strong>invention de l'écriture</strong> (≈ −3300). On ne dispose d'aucun texte : on l'étudie grâce aux <strong>objets, outils et peintures</strong>.</p>",
      exam: "<ul><li>Borne de fin : l'<strong>écriture</strong> (≈ −3300).</li><li>Suivie de l'<strong>Antiquité</strong>.</li></ul>"
    },
    "periode-antiquite": {
      title: "L'Antiquité", sub: "≈ −3300 → 476", theme: "print",
      cours: "<p>L'<strong>Antiquité</strong> s'étend de l'invention de l'<strong>écriture</strong> à la <strong>chute de l'Empire romain d'Occident</strong> en <strong>476</strong>. C'est l'époque des grandes civilisations (Égypte, Grèce, Rome).</p>",
      exam: "<ul><li>Début : écriture (≈ −3300). Fin : <strong>476</strong> (chute de Rome).</li></ul>"
    },
    "periode-moyenage": {
      title: "Le Moyen Âge", sub: "476 → 1492", theme: "royal",
      cours: "<p>Le <strong>Moyen Âge</strong> va de la chute de Rome (<strong>476</strong>) à la <strong>découverte de l'Amérique</strong> (<strong>1492</strong>). Société féodale, châteaux, importance de l'Église.</p>",
      exam: "<ul><li>Bornes : <strong>476</strong> → <strong>1492</strong>.</li><li>Vient juste avant <strong>notre programme</strong> (Temps modernes).</li></ul>"
    },
    "periode-modernes": {
      title: "Les Temps modernes", sub: "1492 → 1789 · ⭐ notre programme", theme: "royal",
      cours: "<p>Les <strong>Temps modernes</strong> vont de <strong>1492</strong> (Amérique) à la <strong>Révolution française</strong> (<strong>1789</strong>). C'est <strong>notre programme</strong> : imprimerie, Renaissance, Réforme, Absolutisme.</p>",
      exam: "<ul><li>Bornes : <strong>1492</strong> → <strong>1789</strong>.</li><li>Mots-clés : imprimerie · Humanisme/Renaissance · Réforme · Louis XIV.</li></ul>"
    },
    "periode-contemporaine": {
      title: "L'Époque contemporaine", sub: "1789 → aujourd'hui", theme: "print",
      cours: "<p>L'<strong>Époque contemporaine</strong> commence à la <strong>Révolution française</strong> (<strong>1789</strong>) et va jusqu'à <strong>aujourd'hui</strong>.</p>",
      exam: "<ul><li>Début : <strong>1789</strong> (Révolution française).</li></ul>"
    },
    "edit-de-nantes": {
      title: "L'Édit de Nantes (1598)", sub: "tolérance religieuse", img: "henri4.jpg",
      cours: "<p>Signé en <strong>1598</strong> par le roi <strong>Henri IV</strong>, l'Édit de Nantes met fin aux <strong>guerres de religion</strong> en France. Il accorde aux <strong>protestants</strong> la liberté de culte (la <strong>tolérance</strong>).</p>",
      exam: "<ul><li><strong>1598</strong> : signé par <strong>Henri IV</strong> (tolérance).</li><li><strong>1685</strong> : <strong>Louis XIV</strong> le révoque → fin de la tolérance.</li></ul>"
    },
    "indulgences": {
      title: "Les indulgences", sub: "l'abus dénoncé par Luther", img: "europe_religions.jpg",
      cours: "<p>Une <strong>indulgence</strong>, c'est <strong>payer l'Église pour obtenir le pardon de ses péchés</strong>. Cette pratique enrichit l'Église mais choque beaucoup de croyants.</p>",
      exam: "<ul><li>C'est l'abus que <strong>Luther</strong> dénonce en <strong>1517</strong> (95 thèses).</li><li>Idée protestante opposée : le salut par la <strong>foi seule</strong>.</li></ul>"
    },
    "humanisme": {
      title: "L'Humanisme", sub: "courant de pensée (XVᵉ-XVIᵉ s.)", img: "erasme.jpg",
      cours: "<p>L'<strong>Humanisme</strong> place l'<strong>être humain</strong>, le <strong>savoir</strong> et la <strong>raison</strong> au centre. Les humanistes redécouvrent les textes de l'Antiquité.</p>",
      exam: "<ul><li>À distinguer de la <strong>Renaissance</strong> (mouvement artistique).</li><li>Humanistes : <strong>Érasme</strong>, Thomas More, Rabelais, Montaigne.</li></ul>"
    },
    "renaissance": {
      title: "La Renaissance", sub: "mouvement artistique & culturel", img: "joconde.jpg",
      cours: "<p>La <strong>Renaissance</strong> naît en <strong>Italie</strong> au XVᵉ siècle : un renouveau des <strong>arts</strong> et des sciences inspiré de l'Antiquité (perspective, réalisme, corps humain).</p>",
      exam: "<ul><li>Née en <strong>Italie</strong> · financée par les <strong>mécènes</strong>.</li><li>Artistes : <strong>Léonard de Vinci</strong>, <strong>Michel-Ange</strong>, Raphaël.</li></ul>"
    },
    "reforme": {
      title: "La Réforme (1517)", sub: "naissance du protestantisme", img: "luther.jpg",
      cours: "<p>La <strong>Réforme</strong> est le mouvement lancé par <strong>Luther</strong> en <strong>1517</strong> qui crée le <strong>protestantisme</strong>, en réaction aux abus de l'Église (<strong>indulgences</strong>).</p>",
      exam: "<ul><li>Principes : <strong>foi seule</strong> + <strong>Bible</strong> seule autorité.</li><li>Réaction catholique = <strong>Contre-Réforme</strong>.</li></ul>"
    },
    "contre-reforme": {
      title: "La Contre-Réforme", sub: "la réaction catholique", img: "trente.jpg",
      cours: "<p>La <strong>Contre-Réforme</strong> est la réponse de l'Église <strong>catholique</strong> à la Réforme. Elle réaffirme la foi catholique, surtout au <strong>Concile de Trente</strong> (1545-1563).</p>",
      exam: "<ul><li>Outils : <strong>Concile de Trente</strong> + les <strong>Jésuites</strong>.</li><li>Ne pas confondre Réforme (protestante) / Contre-Réforme (catholique).</li></ul>"
    },
    "absolutisme": {
      title: "L'absolutisme", sub: "la monarchie absolue", img: "louis14.jpg",
      cours: "<p>L'<strong>absolutisme</strong> : le <strong>roi détient tous les pouvoirs</strong> (faire les lois, gouverner, juger), qu'il tient de Dieu (<strong>droit divin</strong>).</p>",
      exam: "<ul><li>Modèle : <strong>Louis XIV</strong> (« L'État, c'est moi »), <strong>Versailles</strong>.</li><li>Contraire de la démocratie.</li></ul>"
    },
    "droit-divin": {
      title: "La monarchie de droit divin", sub: "le pouvoir vient de Dieu", img: "louis14.jpg",
      cours: "<p>Le roi affirme tenir son pouvoir <strong>directement de Dieu</strong> : personne ne peut donc contester son autorité.</p>",
      exam: "<ul><li>Base de l'<strong>absolutisme</strong> de <strong>Louis XIV</strong>.</li></ul>"
    },
    "mercantilisme": {
      title: "Le mercantilisme", sub: "la politique de Colbert", img: "versailles.jpg",
      cours: "<p>Le <strong>mercantilisme</strong> est la politique économique de <strong>Colbert</strong> : <strong>enrichir l'État</strong> en exportant plus qu'on importe et en développant manufactures et commerce.</p>",
      exam: "<ul><li>Lié à <strong>Colbert</strong> et à <strong>Louis XIV</strong>.</li></ul>"
    },
    "predestination": {
      title: "La prédestination", sub: "l'idée de Calvin", img: "calvin.jpg",
      cours: "<p>La <strong>prédestination</strong> : l'idée, défendue par <strong>Calvin</strong>, que <strong>Dieu a déjà décidé</strong> qui sera sauvé, avant la naissance.</p>",
      exam: "<ul><li>Concept clé du calvinisme (Genève).</li></ul>"
    },
    "ancien-regime": {
      title: "L'Ancien Régime", sub: "la société en 3 ordres", img: "versailles.jpg",
      cours: "<p>L'<strong>Ancien Régime</strong> = la société avant 1789, divisée en <strong>3 ordres</strong> : <strong>clergé</strong>, <strong>noblesse</strong> (privilégiés) et <strong>tiers état</strong> (le reste, qui paie l'impôt).</p>",
      exam: "<ul><li>3 ordres : clergé · noblesse · tiers état.</li><li>Seuls les privilégiés échappent à l'impôt.</li></ul>"
    },
    "saint-barthelemy": {
      title: "Le massacre de la Saint-Barthélemy", sub: "1572 · guerres de religion", img: "saint_barthelemy.jpg",
      cours: "<p>Le <strong>24 août 1572</strong>, des milliers de <strong>protestants</strong> sont massacrés à Paris et en France pendant les <strong>guerres de religion</strong>.</p>",
      exam: "<ul><li><strong>1572</strong> · symbole de la violence catholiques / protestants.</li><li>Apaisé plus tard par l'<strong>Édit de Nantes</strong> (1598).</li></ul>"
    },
    "mecenes": {
      title: "Les mécènes", sub: "protecteurs des artistes (les Médicis)", img: "medicis.jpg",
      cours: "<p>Un <strong>mécène</strong> est un riche protecteur qui <strong>finance les artistes</strong>. À la <strong>Renaissance</strong>, la famille <strong>Médicis</strong> (Florence) en est l'exemple le plus célèbre.</p>",
      exam: "<ul><li>Permettent l'essor de l'art de la <strong>Renaissance</strong>.</li></ul>"
    },
    "jesuites": {
      title: "Les Jésuites", sub: "ordre de la Contre-Réforme", img: "trente.jpg",
      cours: "<p>Les <strong>Jésuites</strong> sont un ordre religieux catholique du XVIᵉ s., très actif dans l'enseignement et les missions. Fer de lance de la <strong>Contre-Réforme</strong>.</p>",
      exam: "<ul><li>Liés à la <strong>Contre-Réforme</strong> et au <strong>Concile de Trente</strong>.</li></ul>"
    },
    "imprimerie": {
      title: "L'imprimerie", sub: "≈ 1450 · Gutenberg", img: "gutenberg.jpg",
      cours: "<p>L'<strong>imprimerie</strong> à caractères mobiles, inventée par <strong>Gutenberg</strong> vers 1450, permet de produire des livres <strong>en série</strong>, plus vite et moins cher.</p>",
      exam: "<ul><li>Conséquence majeure : <strong>diffusion rapide des idées</strong> (Humanisme, Réforme).</li></ul>"
    },
    "guerres-religion": {
      title: "Les guerres de religion", sub: "XVIᵉ s. en France", img: "saint_barthelemy.jpg",
      cours: "<p>Elles opposent <strong>catholiques</strong> et <strong>protestants</strong> en France au XVIᵉ siècle (ex. <strong>Saint-Barthélemy</strong>, 1572).</p>",
      exam: "<ul><li>Fin avec l'<strong>Édit de Nantes</strong> (1598, <strong>Henri IV</strong>).</li></ul>"
    },
    "colbert": {
      title: "Colbert", sub: "ministre de Louis XIV", img: "colbert.jpg",
      cours: "<p><strong>Colbert</strong> est le grand ministre de <strong>Louis XIV</strong>. Il met en place le <strong>mercantilisme</strong> (manufactures, commerce, exportations).</p>",
      exam: "<ul><li>Colbert ↔ <strong>mercantilisme</strong> ↔ <strong>Louis XIV</strong>.</li></ul>"
    }
  });

  /* Mots cliquables → fiche (les plus longs sont traités en premier) */
  window.TERM_MAP = window.TERM_MAP || {};
  Object.assign(window.TERM_MAP, {
    "Léonard de Vinci": "vinci.jpg", "Michel-Ange": "michelange.jpg", "Martin Luther": "luther.jpg",
    "Jean Calvin": "calvin.jpg", "Charles Quint": "charlesquint.jpg", "Henri IV": "henri4.jpg",
    "Louis XIV": "louis14.jpg", "La Joconde": "joconde.jpg", "Gutenberg": "gutenberg.jpg",
    "Érasme": "erasme.jpg", "Versailles": "versailles.jpg", "Luther": "luther.jpg", "Calvin": "calvin.jpg",
    "Concile de Trente": "trente.jpg", "Colbert": "colbert", "mécènes": "mecenes", "Médicis": "mecenes",
    "Édit de Nantes": "edit-de-nantes", "indulgences": "indulgences", "Humanisme": "humanisme",
    "Renaissance": "renaissance", "Contre-Réforme": "contre-reforme", "Réforme": "reforme",
    "absolutisme": "absolutisme", "droit divin": "droit-divin", "mercantilisme": "mercantilisme",
    "prédestination": "predestination", "Ancien Régime": "ancien-regime", "Saint-Barthélemy": "saint-barthelemy",
    "Jésuites": "jesuites", "imprimerie": "imprimerie", "guerres de religion": "guerres-religion",
    "95 thèses": "europe_religions.jpg"
  });

  /* Thème visuel de chaque fiche */
  window.INFO_THEME = window.INFO_THEME || {};
  Object.assign(window.INFO_THEME, {
    "gutenberg.jpg": "print", "imprimerie": "print", "erasme.jpg": "print", "humanisme": "print",
    "vinci.jpg": "art", "joconde.jpg": "art", "michelange.jpg": "art", "renaissance": "art", "mecenes": "art",
    "luther.jpg": "reforme", "calvin.jpg": "reforme", "trente.jpg": "reforme", "europe_religions.jpg": "reforme",
    "reforme": "reforme", "contre-reforme": "reforme", "indulgences": "reforme", "predestination": "reforme",
    "jesuites": "reforme", "saint-barthelemy": "reforme", "guerres-religion": "reforme", "edit-de-nantes": "reforme",
    "louis14.jpg": "royal", "henri4.jpg": "royal", "charlesquint.jpg": "royal", "versailles.jpg": "royal",
    "absolutisme": "royal", "droit-divin": "royal", "mercantilisme": "royal", "ancien-regime": "royal", "colbert": "royal"
  });

  /* helper image */
  function fig(src, cap, w) {
    return '<figure class="hfig" style="max-width:' + (w || 170) + 'px">' +
      '<img src="' + src + '" alt="' + cap.replace(/"/g, '') + '" loading="lazy">' +
      '<figcaption>' + cap + '</figcaption></figure>';
  }

  /* frise chronologique (SVG) */
  // Segment cliquable de la frise (HTML responsive : s'adapte au mobile, jamais coupé)
  function tlSeg(key, name, dates, color, star) {
    return '<button type="button" class="htl-seg' + (star ? ' htl-star' : '') + '" style="--c:' + color + ';" onclick="openInfoCard(\'' + key + '\')">' +
      '<span class="htl-name">' + name + (star ? ' ⭐' : '') + '</span>' +
      '<span class="htl-date">' + dates + '</span></button>';
  }
  var TIMELINE =
    '<div class="htl">' +
    '<div class="htl-head"><span class="htl-title">🕰️ La frise du temps</span>' +
    '<span class="htl-sub">👆 Clique une période pour ses dates &amp; explications</span></div>' +
    '<div class="htl-track">' +
    tlSeg('periode-prehistoire', 'Préhistoire', 'jusqu\'à ≈ −3300', '#8d6e63', false) +
    tlSeg('periode-antiquite', 'Antiquité', '−3300 → 476', '#c79a3b', false) +
    tlSeg('periode-moyenage', 'Moyen Âge', '476 → 1492', '#6d8c4a', false) +
    tlSeg('periode-modernes', 'Temps modernes', '1492 → 1789', '#7c5cff', true) +
    tlSeg('periode-contemporaine', 'Époque contemp.', '1789 → ...', '#4a8cc7', false) +
    '</div></div>';

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

      <h3 style="color:var(--color-nav); margin-top:1.2rem;">⚔️ Catholiques vs Protestants — le tableau à connaître</h3>
      <table class="compare-table">
        <thead>
          <tr><th>Critère</th><th class="cat">⛪ Catholiques</th><th class="pro">📖 Protestants</th></tr>
        </thead>
        <tbody>
          <tr><th>Chef / autorité</th><td class="cat">Le <strong>pape</strong> (à Rome)</td><td class="pro">Pas de pape ; la <strong>Bible</strong> est la seule autorité</td></tr>
          <tr><th>Comment être sauvé ?</th><td class="cat">Par la <strong>foi + les œuvres</strong> (bonnes actions, sacrements)</td><td class="pro">Par la <strong>foi seule</strong> (pas par l'argent ni les œuvres)</td></tr>
          <tr><th>La Bible</th><td class="cat">Lue et interprétée par le <strong>clergé</strong>, en latin</td><td class="pro">Lue par <strong>tous</strong>, traduite en langue courante (≈ imprimerie)</td></tr>
          <tr><th>Les indulgences</th><td class="cat">Acceptées (« payer pour le pardon »)</td><td class="pro"><strong>Rejetées</strong> (c'est ce que Luther dénonce)</td></tr>
          <tr><th>Le clergé</th><td class="cat">Prêtres, moines ; <strong>célibat</strong> obligatoire</td><td class="pro">Pasteurs ; peuvent <strong>se marier</strong></td></tr>
          <tr><th>Sacrements</th><td class="cat"><strong>7</strong> sacrements</td><td class="pro">Surtout <strong>2</strong> (baptême, communion)</td></tr>
          <tr><th>Figures clés</th><td class="cat">Le pape · Concile de <strong>Trente</strong> · Charles Quint</td><td class="pro"><strong>Luther</strong> (1517) · <strong>Calvin</strong> (Genève)</td></tr>
        </tbody>
      </table>
      <div class="key-rule"><div class="formula-main" style="font-size:16px;">À retenir : Protestants = <strong>foi seule + Bible pour tous + pas de pape</strong> · Catholiques = <strong>pape + foi & œuvres + 7 sacrements</strong></div></div>

      <h3 style="color:var(--color-nav); margin-top:1.2rem;">🗺️ La carte des religions en Europe (vers 1600)</h3>
      <p>Après la Réforme, l'Europe est <strong>divisée religieusement</strong> — en gros : le <strong>Nord</strong> devient protestant, le <strong>Sud</strong> reste catholique, l'<strong>Est</strong> est orthodoxe.</p>
      <ul style="line-height:2;">
        <li>⛪ <strong>Catholiques</strong> (Sud) : <strong>Espagne, Portugal, Italie, France</strong> (majorité), <strong>Pologne</strong>, sud de l'Allemagne, Pays-Bas du Sud (Belgique actuelle), Irlande.</li>
        <li>📖 <strong>Luthériens</strong> (Nord) : <strong>nord de l'Allemagne</strong> et la <strong>Scandinavie</strong> (Danemark, Suède, Norvège, Finlande).</li>
        <li>📖 <strong>Calvinistes</strong> : <strong>Suisse</strong> (Genève), <strong>Provinces-Unies</strong> (Pays-Bas du Nord), <strong>Écosse</strong> ; minorités en France (les <strong>huguenots</strong>) et en Hongrie.</li>
        <li>📖 <strong>Anglicans</strong> : l'<strong>Angleterre</strong>.</li>
        <li>☦️ <strong>Orthodoxes</strong> (Est) : <strong>Russie</strong>, Grèce, Balkans.</li>
      </ul>
      <div class="simple-exp-box">
        <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Comprendre simplement</button>
        <div class="simple-exp-content">Retiens la règle : <strong>Nord = protestant</strong> (luthérien en Allemagne/Scandinavie, calviniste en Suisse/Pays-Bas du Nord/Écosse, anglican en Angleterre) ; <strong>Sud = catholique</strong> (Espagne, Italie, France, Pologne) ; <strong>Est = orthodoxe</strong> (Russie, Grèce).</div>
      </div>
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
      <h3 style="font-size:20px; font-weight:600; color:var(--color-nav); margin-bottom:0.5rem;">🎮 Catholique ou Protestant ?</h3>
      <p style="color:var(--text-secondary); margin:0 0 .8rem;">On te donne un trait ; tu choisis le bon camp. Correction immédiate + score &amp; série. (Clavier : 1-2, puis Entrée.)</p>
      <button type="button" class="nav-btn" data-mg="hist-mm">▶ Commencer le jeu</button>
      <div id="hist-mm" class="mg-mount"></div>
    </div>

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
      '<h4>' + name + '</h4><div class="dates">' + dates + '</div><p>' + role + '</p>' +
      '<span class="perso-more">👆 Clique pour la fiche + anecdote</span></div>';
  }
  var PERSONNAGES = `
    <h2 style="font-size:30px; font-weight:800; color:var(--color-nav); margin-bottom:0.4rem;">👑 Personnages importants</h2>
    <p style="color:var(--text-secondary); margin-bottom:0.6rem;">Les visages à reconnaître pour l'examen.</p>
    <div class="perso-grid">
      ${perso('gutenberg.jpg', 'Gutenberg', '≈ 1400–1468', 'Invente l’imprimerie à caractères mobiles (≈ 1450) → diffusion des idées dans toute l’Europe.')}
      ${perso('erasme.jpg', 'Érasme', '1466–1536', 'Le « prince des humanistes », auteur de « L’Éloge de la folie ». Savoir, raison et esprit critique.')}
      ${perso('vinci.jpg', 'Léonard de Vinci', '1452–1519', 'Génie de la Renaissance : peintre (La Joconde, La Cène), ingénieur et inventeur.')}
      ${perso('michelange.jpg', 'Michel-Ange', '1475–1564', 'Sculpteur et peintre de génie : le David et le plafond de la chapelle Sixtine.')}
      ${perso('luther.jpg', 'Martin Luther', '1483–1546', 'Moine allemand : ses 95 thèses (1517) lancent la Réforme protestante (foi seule, Bible seule).')}
      ${perso('calvin.jpg', 'Jean Calvin', '1509–1564', 'Réformateur à Genève, théoricien de la prédestination ; 2ᵉ grand nom du protestantisme.')}
      ${perso('charlesquint.jpg', 'Charles Quint', '1500–1558', 'Empereur catholique d’un immense empire (dont les Pays-Bas espagnols) ; adversaire de la Réforme.')}
      ${perso('henri4.jpg', 'Henri IV', '1553–1610', 'Roi de France ; signe l’Édit de Nantes (1598) pour mettre fin aux guerres de religion.')}
      ${perso('louis14.jpg', 'Louis XIV', '1638–1715', 'Le Roi-Soleil, modèle de la monarchie absolue ; Versailles, Colbert, « L’État c’est moi ».')}
    </div>`;

  /* ---------------------- QUIZ ---------------------- */
  var questions = [
    // ── Carte des religions (fin chapitre Réforme) ──
    { q: "Vers 1600, quelle religion domine dans le SUD de l'Europe (Espagne, Italie, France) ?", opts: ["le catholicisme", "le luthéranisme", "le calvinisme", "l'orthodoxie"], ans: 0, chapter: "reforme", difficulty: "facile", exp: "Le Sud reste catholique ; le Nord devient protestant ; l'Est est orthodoxe." },
    { q: "Le luthéranisme s'implante surtout en :", opts: ["Allemagne du Nord et Scandinavie", "Espagne et Italie", "Russie et Grèce", "Angleterre seulement"], ans: 0, chapter: "reforme", difficulty: "intermediaire", exp: "Luthériens = nord de l'Allemagne + Scandinavie (Danemark, Suède, Norvège, Finlande)." },
    { q: "L'anglicanisme est la religion de :", opts: ["l'Angleterre", "la Suisse", "la Pologne", "la Russie"], ans: 0, chapter: "reforme", difficulty: "facile", exp: "Henri VIII fonde l'anglicanisme → religion de l'Angleterre." },
    { q: "À l'Est de l'Europe (Russie, Grèce, Balkans), la religion dominante est :", opts: ["l'orthodoxie", "le catholicisme", "le calvinisme", "l'anglicanisme"], ans: 0, chapter: "reforme", difficulty: "intermediaire", exp: "L'Est de l'Europe est majoritairement orthodoxe." },
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
    { q: "Première étape de la carte d'identité d'un document ?", opts: ["la nature (texte, image, carte…)", "la problématique", "la conclusion", "l'avis personnel"], ans: 0, chapter: "methode", difficulty: "facile", exp: "On commence par : nature, auteur, date/lieu, source, sujet." },
    { q: "Le premier grand livre imprimé par Gutenberg est…", opts: ["la Bible à 42 lignes", "L'Éloge de la folie", "Utopia", "le journal"], ans: 0, chapter: "livre", difficulty: "difficile", exp: "La Bible à 42 lignes (≈ 1455), un des premiers livres imprimés d'Europe." },
    { q: "Qui a peint le plafond de la chapelle Sixtine ?", opts: ["Michel-Ange", "Léonard de Vinci", "Raphaël", "Érasme"], ans: 0, chapter: "humanisme", difficulty: "intermediaire", exp: "Michel-Ange ; il a aussi sculpté le David." },
    { q: "Quelle famille de mécènes finançait les artistes à Florence ?", opts: ["les Médicis", "les Bourbons", "les Habsbourg", "les Tudor"], ans: 0, chapter: "humanisme", difficulty: "difficile", exp: "Les Médicis, riches protecteurs de la Renaissance à Florence." },
    { q: "« L'Éloge de la folie » est une œuvre de…", opts: ["Érasme", "Molière", "Calvin", "Colbert"], ans: 0, chapter: "humanisme", difficulty: "intermediaire", exp: "Érasme, le « prince des humanistes »." },
    { q: "Qui a traduit la Bible en allemand pour qu'elle soit lue par tous ?", opts: ["Luther", "Gutenberg", "Charles Quint", "Henri IV"], ans: 0, chapter: "reforme", difficulty: "intermediaire", exp: "Luther, réfugié à la Wartburg, grâce à l'imprimerie." },
    { q: "Le Concile de Trente (1545-1563) fait partie de…", opts: ["la Contre-Réforme", "la Renaissance", "l'Humanisme", "l'absolutisme"], ans: 0, chapter: "reforme", difficulty: "difficile", exp: "La Contre-Réforme : réaction catholique, avec les Jésuites." },
    { q: "Qui révoque l'Édit de Nantes en 1685 ?", opts: ["Louis XIV", "Henri IV", "Charles Quint", "Calvin"], ans: 0, chapter: "absolutisme", difficulty: "difficile", exp: "Louis XIV en 1685 → persécution des protestants (Henri IV l'avait signé en 1598)." },
    { q: "Charles Quint était un empereur…", opts: ["catholique, opposé à la Réforme", "protestant", "athée", "orthodoxe"], ans: 0, chapter: "reforme", difficulty: "intermediaire", exp: "Empereur catholique ; il régnait sur les Pays-Bas espagnols." },
    { q: "« L'État, c'est moi » est attribué à…", opts: ["Louis XIV", "Colbert", "Henri IV", "Louis XIII"], ans: 0, chapter: "absolutisme", difficulty: "facile", exp: "Louis XIV, symbole de l'absolutisme." },
    { q: "Sous l'Ancien Régime, qui paie les impôts ?", opts: ["le tiers état", "le clergé", "la noblesse", "le roi"], ans: 0, chapter: "absolutisme", difficulty: "intermediaire", exp: "Le tiers état ; clergé et noblesse sont des privilégiés exemptés." },
    { q: "L'Homme de Vitruve et La Cène sont des œuvres de…", opts: ["Léonard de Vinci", "Michel-Ange", "Raphaël", "Botticelli"], ans: 0, chapter: "humanisme", difficulty: "difficile", exp: "Léonard de Vinci, génie complet de la Renaissance." },
    { q: "Comment le pape réagit-il face à Luther ?", opts: ["il l'excommunie (1521)", "il le nomme évêque", "il accepte ses idées", "il l'ignore"], ans: 0, chapter: "reforme", difficulty: "intermediaire", exp: "Luther refuse de se rétracter → il est excommunié en 1521." },
    { q: "Quel roi a fait venir Léonard de Vinci en France ?", opts: ["François Iᵉʳ", "Louis XIV", "Henri IV", "Charles Quint"], ans: 0, chapter: "humanisme", difficulty: "difficile", exp: "François Iᵉʳ ; Vinci s'installe au Clos Lucé, près d'Amboise." },
    { q: "Quelle était la résidence de Louis XIV avant Versailles ?", opts: ["le Louvre", "la Bastille", "le Clos Lucé", "Notre-Dame"], ans: 0, chapter: "absolutisme", difficulty: "intermediaire", exp: "Le palais du Louvre, à Paris, avant l'installation à Versailles." },
    { q: "Les dates de règne de Louis XIV sont…", opts: ["1643-1715", "1638-1715", "1515-1547", "1589-1610"], ans: 0, chapter: "absolutisme", difficulty: "difficile", exp: "Règne : 1643-1715 (né en 1638) — le plus long de l'histoire de France." },
    { q: "La « dîme » était…", opts: ["un impôt versé à l'Église", "une fête religieuse", "une arme", "un livre"], ans: 0, chapter: "absolutisme", difficulty: "intermediaire", exp: "Un impôt (≈ un dixième des récoltes) prélevé par l'Église sur le peuple." },
    { q: "« Mens sana in corpore sano » signifie…", opts: ["un esprit sain dans un corps sain", "l'État c'est moi", "je pense donc je suis", "vivre caché"], ans: 0, chapter: "humanisme", difficulty: "difficile", exp: "Idéal humaniste : développer le corps ET l'esprit." },
    { q: "La typographie, c'est…", opts: ["imprimer avec des caractères mobiles", "peindre des fresques", "copier à la main", "sculpter le marbre"], ans: 0, chapter: "livre", difficulty: "intermediaire", exp: "La technique d'impression de Gutenberg : assembler des caractères mobiles." },
    { q: "Combien de sacrements chez les protestants ?", opts: ["2 (baptême, Cène)", "7", "0", "12"], ans: 0, chapter: "reforme", difficulty: "difficile", exp: "Protestants : 2 sacrements ; catholiques : 7." }
  ];

  /* ---------------------- FLASHCARDS ---------------------- */
  var flashcards = [
    { front: "Carte des religions en Europe (vers 1600) ?", back: "<strong>Nord = protestant</strong> : luthérien (Allemagne du Nord, Scandinavie), calviniste (Suisse, Provinces-Unies, Écosse), anglican (Angleterre). <strong>Sud = catholique</strong> (Espagne, Italie, France, Pologne). <strong>Est = orthodoxe</strong> (Russie, Grèce, Balkans).", chapter: "reforme" },
    { front: "Les 5 grandes périodes ?", back: "Préhistoire · Antiquité (→476) · Moyen Âge (476-1492) · Temps modernes (1492-1789) · Époque contemporaine (1789→).<br><svg viewBox='0 0 340 92' width='320' style='max-width:100%;height:auto;margin-top:8px'><rect x='6' y='34' width='40' height='20' fill='#94a3b8'/><rect x='46' y='34' width='70' height='20' fill='#fbbf24'/><rect x='116' y='34' width='84' height='20' fill='#34d399'/><rect x='200' y='34' width='70' height='20' fill='#60a5fa'/><rect x='270' y='34' width='64' height='20' fill='#a78bfa'/><text x='26' y='28' fill='#cbd5e1' font-size='8' text-anchor='middle'>Préhist.</text><text x='81' y='28' fill='#cbd5e1' font-size='8' text-anchor='middle'>Antiquité</text><text x='158' y='28' fill='#cbd5e1' font-size='8' text-anchor='middle'>Moyen Âge</text><text x='235' y='28' fill='#cbd5e1' font-size='8' text-anchor='middle'>T. modernes</text><text x='302' y='28' fill='#cbd5e1' font-size='8' text-anchor='middle'>Contemp.</text><line x1='116' y1='31' x2='116' y2='58' stroke='#e5e7eb' stroke-width='1'/><line x1='200' y1='31' x2='200' y2='58' stroke='#e5e7eb' stroke-width='1'/><line x1='270' y1='31' x2='270' y2='58' stroke='#e5e7eb' stroke-width='1'/><text x='116' y='70' fill='#e5e7eb' font-size='10' text-anchor='middle' font-weight='bold'>476</text><text x='200' y='70' fill='#e5e7eb' font-size='10' text-anchor='middle' font-weight='bold'>1492</text><text x='270' y='70' fill='#e5e7eb' font-size='10' text-anchor='middle' font-weight='bold'>1789</text></svg>", chapter: "periodes" },
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
    { front: "La « Bible à 42 lignes » ?", back: "Le premier grand livre imprimé par Gutenberg (≈ 1455).", chapter: "livre" },
    { front: "Œuvres de Léonard de Vinci ?", back: "La Joconde, La Cène, l'Homme de Vitruve. (Il écrivait en écriture miroir !)", chapter: "humanisme" },
    { front: "Œuvres de Michel-Ange ?", back: "Le David (sculpture) et le plafond de la chapelle Sixtine (peinture).", chapter: "humanisme" },
    { front: "Qui sont les Médicis ?", back: "Une famille de mécènes de Florence qui finançait les artistes de la Renaissance.", chapter: "humanisme" },
    { front: "Qui révoque l'Édit de Nantes et quand ?", back: "Louis XIV, en 1685 (Henri IV l'avait signé en 1598).", chapter: "absolutisme" },
    { front: "Charles Quint, un fait marquant ?", back: "Empereur catholique d'un immense empire ; il abdique (1556) pour finir dans un monastère.", chapter: "reforme" },
    { front: "Qui est Colbert ?", back: "Le ministre de Louis XIV, créateur du mercantilisme.", chapter: "absolutisme" },
    { front: "Henri IV : phrase et acte célèbres ?", back: "« Paris vaut bien une messe » ; il signe l'Édit de Nantes (1598).", chapter: "reforme" },
    { front: "Les Jésuites ?", back: "Un ordre catholique, fer de lance de la Contre-Réforme (enseignement, missions).", chapter: "reforme" },
    { front: "Source primaire vs secondaire ?", back: "Primaire = document d'époque (témoin direct). Secondaire = analyse écrite plus tard par un historien.", chapter: "methode" },
    { front: "Réaction du pape face à Martin Luther ?", back: "Il l'excommunie (1521) : Luther, qui refuse de se rétracter, est exclu de l'Église catholique.", chapter: "reforme" },
    { front: "Quel artiste François Iᵉʳ a-t-il fait venir en France ?", back: "Léonard de Vinci, installé au Clos Lucé (près d'Amboise) ; le roi était son protecteur (mécène).", chapter: "humanisme" },
    { front: "Résidence de Louis XIV avant Versailles ?", back: "Le palais du Louvre, à Paris (la cour s'installe ensuite à Versailles).", chapter: "absolutisme" },
    { front: "Un auteur de théâtre joué à Versailles ?", back: "Molière (ses comédies), sous la protection de Louis XIV.", chapter: "absolutisme" },
    { front: "Dates de règne de Louis XIV ?", back: "1643-1715 (le plus long règne de l'histoire de France ; il est né en 1638).", chapter: "absolutisme" },
    { front: "Qu'est-ce que la dîme ?", back: "Un impôt prélevé par l'Église (environ un dixième des récoltes) sur le peuple sous l'Ancien Régime.", chapter: "absolutisme" },
    { front: "Que signifie « Mens sana in corpore sano » ?", back: "« Un esprit sain dans un corps sain » : l'idéal humaniste de développer à la fois le corps et l'esprit.", chapter: "humanisme" },
    { front: "Qu'est-ce que la typographie ?", back: "La technique d'impression avec des caractères mobiles (assembler les lettres pour imprimer un texte).", chapter: "livre" },
    { front: "Doctrines : catholiques vs protestants ?", back: "Catholiques : le pape et l'Église comme intermédiaires, 7 sacrements, tradition + Bible. Protestants : pas d'intermédiaire (foi directe), 2 sacrements (baptême, Cène), la Bible seule.", chapter: "reforme" },
    { front: "Qui a peint « La Naissance de Vénus » ?", back: "Botticelli (Renaissance italienne, à Florence, sous le mécénat des Médicis).", chapter: "humanisme" }
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
