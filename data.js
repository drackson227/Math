/* ============================================================
   data.js — Données statiques de l'application Maths GR2
   Ce fichier NE CHANGE JAMAIS → ne pas envoyer à Claude
   ============================================================ */

let allQuestions = [
  {q: "Que représente le vecteur \\(\\vec{AB}\\) ?", opts: ["La translation qui amène A sur B", "Le segment [AB]", "La droite (AB)", "Le milieu de [AB]"], ans: 0, chapter: "vecteur", difficulty: "facile", exp: "Un vecteur \\(\\vec{AB}\\) représente la translation de A vers B (segment orienté).",
    simple: "Imagine une flèche qui part de A et pointe vers B : elle dit dans quel <strong>sens</strong> et de <strong>combien</strong> on se déplace. Le vecteur, c'est ce déplacement — pas le trait, pas le point."},
  {q: "Relation de Chasles : \\(\\vec{AB}+\\vec{BC}\\) = ?", opts: ["\\(\\vec{AC}\\)", "\\(\\vec{CA}\\)", "\\(\\vec{BA}\\)", "\\(\\vec{AB}\\)"], ans: 0, chapter: "vecteur", difficulty: "facile",
    exp: "\\(\\vec{AB}+\\vec{BC}=\\vec{AC}\\) : l'extrémité du 1er (B) est l'origine du 2e (B), elles s'« annulent », il reste le tout premier départ (A) et la toute dernière arrivée (C).",
    formula: "\\(\\vec{AB}+\\vec{BC}=\\vec{AC}\\)  (relation de Chasles)",
    simple: "Imagine que tu marches de A à B, puis de B à C. Au total, tu es allé de A à C, peu importe le détour par B. C'est tout ce que dit Chasles : on garde le premier point et le dernier."},
  {q: "\\(\\vec{AB}+\\vec{BC}+\\vec{CD}\\) = ?", opts: ["\\(\\vec{AD}\\)", "\\(\\vec{DA}\\)", "\\(\\vec{AC}\\)", "\\(\\vec{BD}\\)"], ans: 0, chapter: "vecteur", difficulty: "intermediaire", exp: "Chasles bout à bout : on garde la 1re origine et la dernière extrémité → \\(\\vec{AD}\\)."},
  {q: "Le vecteur opposé de \\(\\vec{AB}\\) est :", opts: ["\\(\\vec{BA}\\)", "\\(\\vec{AB}\\)", "\\(\\vec{0}\\)", "\\(\\vec{AC}\\)"], ans: 0, chapter: "vecteur", difficulty: "facile", exp: "\\(-\\vec{AB}=\\vec{BA}\\) : même direction et norme, sens opposé.",
    simple: "L'opposé, c'est la même flèche mais <strong>retournée</strong> : elle part de B et revient vers A. Même longueur, même droite, sens inverse."},
  {q: "Que vaut \\(\\vec{AA}\\) ?", opts: ["\\(\\vec{0}\\) (vecteur nul)", "1", "Le point A", "\\(\\vec{AB}\\)"], ans: 0, chapter: "vecteur", difficulty: "facile", exp: "Origine = extrémité, donc \\(\\vec{AA}=\\vec{0}\\).",
    simple: "Tu pars de A et tu arrives… en A : tu n'as pas bougé. Un déplacement nul, c'est le <strong>vecteur nul</strong> \\(\\vec{0}\\)."},
  {q: "La différence \\(\\vec{u}-\\vec{v}\\) est égale à :", opts: ["\\(\\vec{u}+(-\\vec{v})\\)", "\\(\\vec{u}+\\vec{v}\\)", "\\(\\vec{v}-\\vec{u}\\)", "\\(\\vec{0}\\)"], ans: 0, chapter: "vecteur", difficulty: "facile", exp: "Soustraire = ajouter l'opposé : \\(\\vec{u}-\\vec{v}=\\vec{u}+(-\\vec{v})\\).",
    simple: "Enlever un vecteur revient à <strong>ajouter son contraire</strong>. Comme « −3 » qu'on réécrit « + (−3) »."},
  {q: "La norme du vecteur \\(k\\,\\vec{v}\\) (k réel) vaut :", opts: ["\\(|k|\\cdot\\|\\vec{v}\\|\\)", "\\(k\\cdot\\|\\vec{v}\\|\\)", "\\(\\|\\vec{v}\\|\\)", "\\(k^2\\,\\|\\vec{v}\\|\\)"], ans: 0, chapter: "vecteur", difficulty: "intermediaire",
    exp: "\\(\\|k\\,\\vec{v}\\|=|k|\\cdot\\|\\vec{v}\\|\\) : on multiplie la longueur par la <strong>valeur absolue</strong> de k.",
    formula: "\\(\\|k\\,\\vec{v}\\|=|k|\\cdot\\|\\vec{v}\\|\\)",
    simple: "La norme, c'est la longueur du vecteur. Si tu multiplies un vecteur par 3, il devient 3 fois plus long. Si tu le multiplies par −3, il fait demi-tour mais reste aussi 3 fois plus long — une longueur est toujours positive, d'où la valeur absolue \\(|k|\\)."},
  {q: "Si \\(k<0\\), le vecteur \\(k\\,\\vec{v}\\) a :", opts: ["la même direction que \\(\\vec{v}\\), mais le sens opposé", "le même sens que \\(\\vec{v}\\)", "une direction perpendiculaire à \\(\\vec{v}\\)", "une norme nulle"], ans: 0, chapter: "vecteur", difficulty: "intermediaire", exp: "Multiplier par un réel négatif inverse le sens, mais garde la direction."},
  {q: "Deux vecteurs non nuls \\(\\vec{u}\\) et \\(\\vec{v}\\) sont colinéaires si :", opts: ["il existe un réel non nul k tel que \\(\\vec{u}=k\\,\\vec{v}\\)", "\\(\\vec{u}+\\vec{v}=\\vec{0}\\)", "\\(\\|\\vec{u}\\|=\\|\\vec{v}\\|\\)", "ils ont la même origine"], ans: 0, chapter: "vecteur", difficulty: "facile", exp: "Colinéaires ⟺ \\(\\vec{u}=k\\,\\vec{v}\\) : ils ont la même direction.",
    simple: "Colinéaires = ils pointent dans la <strong>même direction</strong> (parallèles). Du coup l'un est juste l'autre agrandi ou réduit (multiplié par un nombre k)."},
  {q: "Les points A, B, C sont alignés si :", opts: ["\\(\\vec{AB}\\) et \\(\\vec{AC}\\) sont colinéaires", "\\(\\vec{AB}=\\vec{AC}\\)", "\\(\\|\\vec{AB}\\|=\\|\\vec{AC}\\|\\)", "\\(\\vec{AB}+\\vec{AC}=\\vec{0}\\)"], ans: 0, chapter: "vecteur", difficulty: "intermediaire", exp: "Alignés ⟺ \\(\\vec{AB}=k\\,\\vec{AC}\\) (colinéaires).",
    simple: "Trois points sont alignés s'ils sont sur une <strong>même droite</strong>. On le prouve en montrant que deux vecteurs partant de A (\\(\\vec{AB}\\) et \\(\\vec{AC}\\)) vont dans la même direction."},
  {q: "M est le milieu de [AB] si et seulement si :", opts: ["\\(\\vec{AM}=\\tfrac{1}{2}\\,\\vec{AB}\\)", "\\(\\vec{AM}=\\vec{AB}\\)", "\\(\\vec{AM}=2\\,\\vec{AB}\\)", "\\(\\vec{AM}=-\\vec{AB}\\)"], ans: 0, chapter: "vecteur", difficulty: "intermediaire",
    exp: "Le milieu est à mi-chemin : \\(\\vec{AM}=\\tfrac{1}{2}\\vec{AB}\\). En coordonnées : \\(M\\!\\begin{pmatrix}\\frac{x_A+x_B}{2}\\\\\\frac{y_A+y_B}{2}\\end{pmatrix}\\).",
    formula: "\\(\\vec{AM}=\\tfrac{1}{2}\\vec{AB}\\)  ·  \\(M\\!\\begin{pmatrix}\\frac{x_A+x_B}{2}\\\\\\frac{y_A+y_B}{2}\\end{pmatrix}\\)",
    simple: "Le milieu, c'est le point pile au centre de A et B. Pour le trouver, tu fais la moyenne des x (tu additionnes et divises par 2) et pareil pour les y. En vecteur : aller de A au milieu, c'est faire la moitié du chemin vers B."},
  {q: "L'égalité \\(\\vec{OA}+\\vec{OB}=\\vec{OC}\\) signifie que :", opts: ["OACB est un parallélogramme", "O est le milieu de [AB]", "A = B", "\\(\\vec{OC}=\\vec{0}\\)"], ans: 0, chapter: "vecteur", difficulty: "intermediaire",
    exp: "Règle du parallélogramme : quand on additionne deux vecteurs partant du même point O, la somme \\(\\vec{OC}\\) est la <strong>diagonale</strong>. C est le 4e coin, donc <strong>OACB</strong> est un parallélogramme (C opposé à O).",
    formula: "\\(\\vec{OA}+\\vec{OB}=\\vec{OC}\\) ⟺ OACB parallélogramme",
    simple: "Tu poses deux vecteurs côte à côte depuis O. Pour les additionner, tu complètes le parallélogramme : le point C au bout de la diagonale est le résultat. Attention au nom : en tournant O→A→C→B, c'est bien OACB, donc C est en face de O (pas à côté)."},
  {q: "Les composantes de \\(\\vec{AB}\\) avec A(1;2) et B(4;6) sont :", opts: ["\\(\\begin{pmatrix}3\\\\4\\end{pmatrix}\\)", "\\(\\begin{pmatrix}5\\\\8\\end{pmatrix}\\)", "\\(\\begin{pmatrix}4\\\\6\\end{pmatrix}\\)", "\\(\\begin{pmatrix}-3\\\\-4\\end{pmatrix}\\)"], ans: 0, chapter: "vecteur", difficulty: "intermediaire",
    exp: "Composantes = arrivée − départ :<br>\\(\\vec{AB}=\\begin{pmatrix}x_B-x_A\\\\y_B-y_A\\end{pmatrix}=\\begin{pmatrix}4-1\\\\6-2\\end{pmatrix}=\\begin{pmatrix}3\\\\4\\end{pmatrix}\\)",
    formula: "\\(\\vec{AB}=\\begin{pmatrix}x_B-x_A\\\\y_B-y_A\\end{pmatrix}\\)",
    simple: "Tu fais « point d'arrivée moins point de départ », coordonnée par coordonnée. Le x : \\(4-1=3\\). Le y : \\(6-2=4\\). Ça donne de combien on se déplace pour aller de A à B."},
  {q: "Les droites (AB) et (CD) sont parallèles si :", opts: ["\\(\\vec{AB}\\) et \\(\\vec{CD}\\) sont colinéaires", "\\(\\vec{AB}=\\vec{CD}\\) obligatoirement", "\\(\\vec{AB}+\\vec{CD}=\\vec{0}\\)", "A, B, C, D sont alignés"], ans: 0, chapter: "vecteur", difficulty: "facile", exp: "(AB)∥(CD) ⟺ \\(\\vec{AB}=k\\,\\vec{CD}\\) (vecteurs colinéaires)."},
  {q: "Quelle est l'équation canonique d'un cercle de centre C(3;−2) et de rayon R=5 ?", opts: ["(x−3)² + (y+2)² = 25", "(x+3)² + (y−2)² = 25", "(x−3)² + (y−2)² = 5", "(x+3)² + (y+2)² = 25"], ans: 0, chapter: "cercle", difficulty: "facile",
    exp: "On remplace dans la forme canonique :<br>\\((x-x_0)^2+(y-y_0)^2=R^2\\)<br>Centre (3 ; −2) → \\((x-3)^2+(y-(-2))^2=(x-3)^2+(y+2)^2\\)<br>Rayon 5 → \\(R^2=25\\)",
    formula: "\\((x-x_0)^2+(y-y_0)^2=R^2\\)  ·  centre \\((x_0;y_0)\\), rayon R",
    simple: "Dans la formule, on met l'<strong>opposé</strong> des coordonnées du centre. Centre x=3 → on écrit \\((x-3)\\). Centre y=−2 → \\((y-(-2))=(y+2)\\). Et on met le rayon au carré : \\(5^2=25\\)."},
  {q: "Pour x²+y²+6x−4y−3=0, que vaut a²+b²−4c ?", opts: ["36+16+12 = 64", "36+16−12 = 40", "−6+4+3 = 1", "0"], ans: 0, chapter: "cercle", difficulty: "intermediaire", exp: "a=6, b=−4, c=−3. −4c = −4×(−3) = +12. Donc 36+16+12 = 64.",
    simple: "Tu repères a (devant x), b (devant y) et c (le nombre seul), puis tu calcules \\(a^2+b^2-4c\\). Attention au piège : \\(-4\\times(-3)=+12\\) (moins par moins = plus)."},
  {q: "Dans x²+y²+ax+by+c=0, le centre est :", opts: ["\\(\\left(-\\dfrac{a}{2}\\,;-\\dfrac{b}{2}\\right)\\)", "\\(\\left(\\dfrac{a}{2}\\,;\\dfrac{b}{2}\\right)\\)", "\\((a\\,;b)\\)", "\\((-a\\,;-b)\\)"], ans: 0, chapter: "cercle", difficulty: "facile",
    exp: "En complétant le carré, le centre est \\(\\left(-\\dfrac{a}{2}\\,;-\\dfrac{b}{2}\\right)\\). <strong>Attention aux signes</strong> : on prend l'opposé de la moitié de a et de b.",
    formula: "Centre \\(\\left(-\\dfrac{a}{2}\\,;-\\dfrac{b}{2}\\right)\\)  (forme développée \\(x^2+y^2+ax+by+c=0\\))",
    demo: "cercle_carre_combo",
    simple: "Tu prends le nombre devant x (c'est a) et celui devant y (c'est b), tu les divises par 2, et tu changes le signe. Ex : si a=6, la 1re coordonnée du centre est −3."},
  {q: "Le rayon d'un cercle x²+y²+ax+by+c=0 est :", opts: ["\\(\\dfrac{\\sqrt{a^2+b^2-4c}}{2}\\)", "\\(\\sqrt{a^2+b^2-4c}\\)", "\\(\\dfrac{a^2+b^2-4c}{2}\\)", "\\(\\dfrac{\\sqrt{a^2+b^2}}{2}\\)"], ans: 0, chapter: "cercle", difficulty: "intermediaire",
    exp: "Le rayon se calcule directement à partir de a, b, c :<br>\\(R = \\dfrac{\\sqrt{a^2+b^2-4c}}{2}\\)<br>(valable si \\(a^2+b^2-4c>0\\)).",
    formula: "\\(R = \\dfrac{\\sqrt{a^2+b^2-4c}}{2}\\)",
    demo: "cercle_carre_combo",
    simple: "Tu prends a, b, c dans l'équation, tu calcules \\(a^2+b^2-4c\\), tu en prends la racine, et tu divises par 2. La racine carrée et le « divisé par 2 » sont importants — c'est l'erreur la plus fréquente de les oublier. (🧮 Brouillon dispo.)"},
  {q: "Si a²+b²−4c = 0, le lieu géométrique est :", opts: ["Un point unique", "Un cercle", "Impossible", "Une droite"], ans: 0, chapter: "cercle", difficulty: "facile",
    exp: "Si \\(a^2+b^2-4c=0\\), alors \\(R=\\dfrac{\\sqrt{0}}{2}=0\\). Un cercle de rayon 0 se réduit à <strong>un seul point</strong> (son centre).",
    formula: "\\(a^2+b^2-4c=0 \\Rightarrow R=0 \\Rightarrow\\) un point",
    simple: "Le rayon vaut 0. Un cercle sans rayon, c'est juste son centre tout seul : un point."},
  {q: "Si a²+b²−4c &lt; 0, le lieu géométrique est :", opts: ["Impossible", "Un cercle", "Un point", "Une droite"], ans: 0, chapter: "cercle", difficulty: "facile",
    exp: "Si \\(a^2+b^2-4c<0\\), il faudrait prendre la racine carrée d'un nombre <strong>négatif</strong> pour le rayon — impossible. Donc aucun point ne convient : pas de cercle.",
    formula: "\\(a^2+b^2-4c<0 \\Rightarrow\\) racine impossible \\(\\Rightarrow\\) rien",
    simple: "Le rayon serait la racine d'un nombre négatif, ce qui n'existe pas. Donc il n'y a aucune figure : ni cercle, ni point."},
  {q: "Un cercle centré à l'origine a pour équation :", opts: ["x² + y² = R²", "(x−0)² + (y−0)² = R", "x² + y² = R", "x + y = R"], ans: 0, chapter: "cercle", difficulty: "facile",
    exp: "Le centre est l'origine \\(O(0;0)\\), donc \\(x_0=0\\) et \\(y_0=0\\) :<br>\\((x-0)^2+(y-0)^2=R^2\\)<br>\\(x^2+y^2=R^2\\)",
    formula: "Centre O(0;0) : \\(x^2+y^2=R^2\\)",
    simple: "C'est le cas le plus simple : quand le cercle est centré pile au milieu du repère (l'origine), les \\(x_0\\) et \\(y_0\\) sont nuls, et il reste juste \\(x^2+y^2=R^2\\). N'oublie pas le carré sur le R."},
  {q: "Pour déterminer si un point est sur un cercle, on calcule :", opts: ["La distance du point au centre", "L'aire du cercle", "Le périmètre", "Le diamètre"], ans: 0, chapter: "cercle", difficulty: "facile", exp: "On calcule \\(d(P,C) = \\sqrt{(x_P-x_0)^2 + (y_P-y_0)^2}\\) : la distance entre le point P et le centre C.",
    simple: "On mesure la distance du point au <strong>centre</strong>, puis on la compare au <strong>rayon</strong> : égale → sur le cercle, plus petite → dedans, plus grande → dehors."},
  {q: "Si d(P,C) < R, le point P est :", opts: ["À l'intérieur du cercle", "Sur le cercle", "À l'extérieur du cercle", "Au centre"], ans: 0, chapter: "cercle", difficulty: "facile",
    exp: "\\(d(P,C)\\) est la distance entre le point P et le centre C. Si elle est <strong>plus petite que le rayon</strong>, P est plus proche du centre que le bord : il est à l'<strong>intérieur</strong>.",
    formula: "\\(d(P,C)&lt;R\\) : intérieur · \\(=R\\) : sur le cercle · \\(&gt;R\\) : extérieur",
    simple: "Compare la distance du point au centre avec le rayon. Plus petite → dedans. Pile égale → sur le bord. Plus grande → dehors. C'est comme se demander si tu es plus près du centre que la clôture du jardin."},
  {q: "Le cercle de diamètre [AB] a pour centre :", opts: ["Le milieu de [AB]", "Le point A", "Le point B", "L'origine"], ans: 0, chapter: "cercle", difficulty: "facile",
    exp: "Le diamètre traverse le cercle en passant par le centre. Donc le <strong>centre est le milieu</strong> du diamètre [AB] : \\(C\\!\\begin{pmatrix}\\frac{x_A+x_B}{2}\\\\\\frac{y_A+y_B}{2}\\end{pmatrix}\\).",
    formula: "Centre = milieu de [AB] = \\(\\begin{pmatrix}\\frac{x_A+x_B}{2}\\\\\\frac{y_A+y_B}{2}\\end{pmatrix}\\)",
    simple: "Le diamètre va d'un bord à l'autre en passant par le centre. Le centre est donc pile au milieu de [AB] : tu fais la moyenne des coordonnées de A et B."},
  {q: "Le cercle de diamètre [AB] a pour rayon :", opts: ["\\(\\dfrac{|AB|}{2}\\)", "\\(|AB|\\)", "\\(2|AB|\\)", "\\(|AB|^2\\)"], ans: 0, chapter: "cercle", difficulty: "facile",
    exp: "Le diamètre est la plus grande corde, qui traverse le centre. Le rayon en est la <strong>moitié</strong> : \\(R=\\dfrac{|AB|}{2}\\).",
    formula: "\\(R=\\dfrac{|AB|}{2}\\)  (le centre = milieu de [AB])",
    simple: "Le diamètre traverse tout le cercle, le rayon va du centre au bord. Le rayon fait donc la moitié du diamètre. Et le centre du cercle est pile au milieu de [AB]."},
  {q: "Pour trouver l'équation d'un cercle par 3 points, on utilise :", opts: ["La forme développée", "La forme canonique", "La forme explicite", "La forme paramétrique"], ans: 0, chapter: "cercle", difficulty: "intermediaire",
    exp: "On utilise la <strong>forme développée</strong> \\(x^2+y^2+ax+by+c=0\\) car elle a exactement <strong>3 inconnues</strong> (a, b, c). Avec 3 points, on obtient 3 équations → système résoluble.",
    formula: "Forme développée : \\(x^2+y^2+ax+by+c=0\\)  (3 inconnues a, b, c)",
    simple: "La forme canonique demande de connaître le centre et le rayon — qu'on n'a pas. La forme développée, elle, a juste 3 nombres inconnus (a, b, c) : avec 3 points on a 3 équations, et 3 équations pour 3 inconnues, ça se résout."},
  {q: "Combien d'équations obtient-on avec 3 points pour un cercle ?", opts: ["3 équations à 3 inconnues", "1 équation", "2 équations", "4 équations"], ans: 0, chapter: "cercle", difficulty: "facile",
    exp: "Chaque point que l'on remplace dans l'équation donne <strong>une</strong> équation. 3 points → <strong>3 équations</strong>, pour les 3 inconnues a, b, c.",
    formula: "3 points → 3 équations → 3 inconnues (a, b, c)",
    simple: "On remplace x et y par les coordonnées de chaque point dans l'équation du cercle. Un point = une équation. Donc 3 points donnent 3 équations, juste ce qu'il faut pour trouver a, b et c."},
  {q: "La condition d'existence d'un cercle est :", opts: ["a² + b² − 4c > 0", "a² + b² − 4c = 0", "a² + b² − 4c &lt; 0", "a + b + c > 0"], ans: 0, chapter: "cercle", difficulty: "intermediaire",
    exp: "Le rayon est \\(R=\\dfrac{\\sqrt{a^2+b^2-4c}}{2}\\). Pour que la racine existe et donne un vrai cercle, il faut que ce qui est <strong>sous la racine soit positif</strong> : \\(a^2+b^2-4c>0\\).",
    formula: "\\(a^2+b^2-4c>0\\)  (sinon : =0 → un point, <0 → rien)",
    simple: "On ne peut pas prendre la racine carrée d'un nombre négatif. Comme le rayon contient \\(\\sqrt{a^2+b^2-4c}\\), il faut que ce nombre soit positif, sinon le cercle n'existe pas."},
  {q: "Pour d ≡ 3x − 4y + 5 = 0, le vecteur directeur est :", opts: ["\\(\\vec{u}=\\begin{pmatrix}4\\\\3\\end{pmatrix}\\)", "\\(\\vec{u}=\\begin{pmatrix}3\\\\-4\\end{pmatrix}\\)", "\\(\\vec{u}=\\begin{pmatrix}-4\\\\3\\end{pmatrix}\\)", "\\(\\vec{u}=\\begin{pmatrix}3\\\\4\\end{pmatrix}\\)"], ans: 0, chapter: "droite", difficulty: "intermediaire",
    exp: "On lit \\(a=3\\) et \\(b=-4\\), puis on applique :<br>\\(\\vec{u}=\\begin{pmatrix}-b\\\\a\\end{pmatrix}=\\begin{pmatrix}-(-4)\\\\3\\end{pmatrix}=\\begin{pmatrix}4\\\\3\\end{pmatrix}\\)",
    formula: "\\(\\vec{u}=\\begin{pmatrix}-b\\\\a\\end{pmatrix}\\)  (droite \\(ax+by+c=0\\))",
    simple: "Tu prends a (devant x) et b (devant y), ici 3 et −4. Le directeur, c'est \\(\\begin{pmatrix}-b\\\\a\\end{pmatrix}\\) : en haut −b = −(−4) = 4, en bas a = 3. Attention au double signe sur le b !"},
  {q: "Deux droites \\(y=3x+1\\) et \\(y=-\\dfrac{1}{3}x+5\\) sont :", opts: ["Perpendiculaires", "Parallèles", "Confondues", "Sécantes non perpendiculaires"], ans: 0, chapter: "droite", difficulty: "facile",
    exp: "On lit les pentes : \\(m_1=3\\) et \\(m_2=-\\dfrac{1}{3}\\). On teste le produit :<br>\\(m_1\\cdot m_2 = 3\\times\\left(-\\dfrac{1}{3}\\right) = -1\\)<br>Produit = −1 → <strong>perpendiculaires</strong>.",
    formula: "\\(m_1\\cdot m_2=-1\\) → perpendiculaires",
    simple: "Tu repères les deux pentes (les nombres devant x) : 3 et \\(-\\frac13\\). Tu les multiplies : ça fait −1. Quand le produit des pentes vaut −1, les droites forment un angle droit."},
  {q: "L'équation d'une droite par A(1;2) et B(3;8) est :", opts: ["y = 3x − 1", "y = 2x + 1", "y = 3x + 1", "y = 2x − 1"], ans: 0, chapter: "droite", difficulty: "intermediaire",
    exp: "<strong>Étape 1 — la pente</strong> :<br>\\(m=\\dfrac{y_B-y_A}{x_B-x_A}=\\dfrac{8-2}{3-1}=\\dfrac{6}{2}=3\\)<br><br><strong>Étape 2 — trouver p</strong> en mettant un point connu, A(1;2), dans \\(y=3x+p\\) :<br>\\(2=3(1)+p\\)<br>\\(p=2-3=-1\\)<br><br><strong>Résultat</strong> :<br>\\(y=3x-1\\)",
    formula: "Pente : \\(m=\\dfrac{y_B-y_A}{x_B-x_A}\\)  ·  puis \\(y=mx+p\\), on trouve p avec un point.",
    simple: "Deux étapes. 1) <strong>La pente</strong> : de combien ça monte (différence des y) divisé par de combien ça avance (différence des x). Ici 6 divisé par 2 = 3. 2) <strong>Le p</strong> (là où ça croise l'axe vertical) : tu prends un des deux points, tu remplaces x et y dans \\(y=3x+p\\), et tu isoles p. Avec A(1;2) : \\(2=3+p\\), donc \\(p=-1\\)."},
  {q: "Pour d ≡ 2x + y − 4 = 0, la perpendiculaire par M(0;3) est :", opts: ["\\(y = \\dfrac{1}{2}x + 3\\)", "\\(y = -2x + 3\\)", "\\(y = 2x + 3\\)", "\\(y = \\dfrac{1}{2}x - 3\\)"], ans: 0, chapter: "droite", difficulty: "intermediaire",
    exp: "<strong>Étape 1 — pente de d</strong> : \\(m=-\\dfrac{a}{b}=-\\dfrac{2}{1}=-2\\)<br><strong>Étape 2 — pente perpendiculaire</strong> : \\(m'=-\\dfrac{1}{m}=-\\dfrac{1}{-2}=\\dfrac{1}{2}\\)<br><strong>Étape 3 — par M(0;3)</strong> : l'ordonnée à l'origine est directement 3 (car x=0)<br>\\(y=\\dfrac{1}{2}x+3\\)",
    formula: "\\(m'=-\\dfrac{1}{m}\\)  puis  \\(y-y_M=m'(x-x_M)\\)",
    simple: "D'abord la pente de la droite donnée (\\(-a/b=-2\\)). Pour être perpendiculaire, on retourne et on change le signe : \\(\\frac{1}{2}\\). Comme le point M a x=0, le « +p » est juste son y, donc 3. Résultat : \\(y=\\frac12 x+3\\)."},
  {q: "La condition pour que deux droites soient parallèles est :", opts: ["m = m'", "m·m' = −1", "m + m' = 0", "m − m' = 1"], ans: 0, chapter: "droite", difficulty: "facile",
    exp: "Deux droites sont <strong>parallèles</strong> quand elles ont la <strong>même pente</strong> : \\(m=m'\\). Elles montent pareil, donc ne se croisent jamais.",
    formula: "Parallèles : \\(m=m'\\)  ·  Perpendiculaires : \\(m\\cdot m'=-1\\)",
    simple: "Parallèles = même inclinaison = même pente. Logique : si deux routes montent exactement de la même façon, elles restent côte à côte sans jamais se rencontrer."},
  {q: "La condition pour que deux droites soient perpendiculaires est :", opts: ["m·m' = −1", "m = m'", "m + m' = 0", "m − m' = 1"], ans: 0, chapter: "droite", difficulty: "facile",
    exp: "Deux droites sont <strong>perpendiculaires</strong> (angle droit) quand le <strong>produit de leurs pentes vaut −1</strong> : \\(m\\cdot m'=-1\\). Donc \\(m'=-\\dfrac{1}{m}\\) (on retourne la pente et on change le signe).",
    formula: "\\(m\\cdot m'=-1\\)  ⟺  \\(m'=-\\dfrac{1}{m}\\)",
    simple: "Pour faire un angle droit (90°) avec une droite de pente m, l'autre droite doit avoir une pente « retournée et de signe opposé ». Ex : pente 2 → la perpendiculaire a une pente \\(-\\dfrac{1}{2}\\). Vérif : \\(2\\times(-\\tfrac12)=-1\\) ✓."},
  {q: "Le vecteur normal de d ≡ ax+by+c=0 est :", opts: ["\\(\\vec{n}=\\begin{pmatrix}a\\\\b\\end{pmatrix}\\)", "\\(\\vec{n}=\\begin{pmatrix}-b\\\\a\\end{pmatrix}\\)", "\\(\\vec{n}=\\begin{pmatrix}b\\\\a\\end{pmatrix}\\)", "\\(\\vec{n}=\\begin{pmatrix}-a\\\\-b\\end{pmatrix}\\)"], ans: 0, chapter: "droite", difficulty: "facile",
    exp: "Le vecteur <strong>normal</strong> (perpendiculaire à la droite) se lit directement avec les coefficients : \\(\\vec{n}=\\begin{pmatrix}a\\\\b\\end{pmatrix}\\).",
    formula: "Normal \\(\\vec{n}=\\begin{pmatrix}a\\\\b\\end{pmatrix}\\)  ·  Directeur \\(\\vec{u}=\\begin{pmatrix}-b\\\\a\\end{pmatrix}\\)",
    simple: "Le vecteur normal, c'est juste les deux nombres a et b (devant x et y) mis en colonne. Il pointe perpendiculairement à la droite. Pour le directeur (parallèle), on échange et on change un signe."},
  {q: "Le vecteur directeur de d ≡ ax+by+c=0 est :", opts: ["\\(\\vec{u}=\\begin{pmatrix}-b\\\\a\\end{pmatrix}\\)", "\\(\\vec{u}=\\begin{pmatrix}a\\\\b\\end{pmatrix}\\)", "\\(\\vec{u}=\\begin{pmatrix}b\\\\a\\end{pmatrix}\\)", "\\(\\vec{u}=\\begin{pmatrix}-a\\\\-b\\end{pmatrix}\\)"], ans: 0, chapter: "droite", difficulty: "facile",
    exp: "Le vecteur <strong>directeur</strong> (parallèle à la droite, il donne sa direction) est \\(\\vec{u}=\\begin{pmatrix}-b\\\\a\\end{pmatrix}\\).",
    formula: "Directeur \\(\\vec{u}=\\begin{pmatrix}-b\\\\a\\end{pmatrix}\\)  (à partir de \\(ax+by+c=0\\))",
    simple: "Astuce : pour passer du normal \\(\\begin{pmatrix}a\\\\b\\end{pmatrix}\\) au directeur, tu échanges les deux nombres et tu changes un signe → \\(\\begin{pmatrix}-b\\\\a\\end{pmatrix}\\). Le directeur suit la droite, le normal lui est perpendiculaire."},
  {q: "La pente de d ≡ ax+by+c=0 est :", opts: ["\\(m = -\\dfrac{a}{b}\\)", "\\(m = \\dfrac{a}{b}\\)", "\\(m = -\\dfrac{b}{a}\\)", "\\(m = \\dfrac{b}{a}\\)"], ans: 0, chapter: "droite", difficulty: "facile",
    exp: "On isole y dans \\(ax+by+c=0\\) :<br>\\(by=-ax-c\\)<br>\\(y=-\\dfrac{a}{b}x-\\dfrac{c}{b}\\)<br>Le coefficient devant x est la pente : \\(m=-\\dfrac{a}{b}\\).",
    formula: "\\(m=-\\dfrac{a}{b}\\)  (droite \\(ax+by+c=0\\))",
    simple: "Pour trouver la pente d'une droite écrite \\(ax+by+c=0\\), tu fais juste \\(-\\dfrac{a}{b}\\) : le nombre devant x divisé par celui devant y, avec un moins devant. N'oublie pas le signe moins !"},
  {q: "La forme explicite d'une droite est :", opts: ["\\(y = mx + p\\)", "\\(ax + by + c = 0\\)", "\\(x = x_A + k\\,u_x\\)", "\\(\\vec{AP}=k\\cdot\\vec{AB}\\)"], ans: 0, chapter: "droite", difficulty: "facile", exp: "La forme <strong>explicite</strong> donne y tout seul d'un côté : \\(y = mx + p\\). On lit directement la pente m et l'ordonnée à l'origine p. (Les autres réponses sont d'autres façons d'écrire une droite : forme implicite, paramétrique, vectorielle.)"},
  {q: "L'équation cartésienne (forme implicite) d'une droite est :", opts: ["\\(ax + by + c = 0\\)", "\\(y = mx + p\\)", "\\(\\vec{AP}=k\\cdot\\vec{u}\\)", "\\(x^2 + y^2 = r^2\\)"], ans: 0, chapter: "droite", difficulty: "facile", exp: "L'<strong>équation cartésienne</strong> (= forme implicite) d'une droite est \\(ax + by + c = 0\\). On y lit directement le vecteur normal \\(\\vec{n}=(a;b)\\) et le vecteur directeur \\(\\vec{u}=(-b;a)\\). (\\(y=mx+p\\) = forme explicite ; \\(x^2+y^2=r^2\\) = un cercle.)"},
  {q: "Dans y = mx + p, p représente :", opts: ["L'ordonnée à l'origine", "L'abscisse à l'origine", "La pente", "Le vecteur directeur"], ans: 0, chapter: "droite", difficulty: "facile",
    exp: "Dans \\(y=mx+p\\) : m est la pente, et <strong>p est l'ordonnée à l'origine</strong> = la hauteur où la droite croise l'axe vertical (quand x = 0, y = p).",
    formula: "\\(y=mx+p\\) : m = pente, p = ordonnée à l'origine (croise l'axe y)",
    simple: "Le p, c'est l'endroit où la droite coupe l'axe vertical (l'axe des y). Si tu mets x=0, il reste \\(y=p\\) : c'est sa hauteur de départ."},
  {q: "Si m > 0, la droite :", opts: ["Monte vers la droite", "Descend vers la droite", "Est horizontale", "Est verticale"], ans: 0, chapter: "droite", difficulty: "facile",
    exp: "La pente m donne le sens. \\(m>0\\) → la droite <strong>monte</strong> quand on va vers la droite.",
    formula: "\\(m>0\\) monte · \\(m<0\\) descend · \\(m=0\\) horizontale",
    simple: "La pente positive = ça grimpe en allant vers la droite (comme une côte qui monte). Négative = ça descend. Zéro = tout plat."},
  {q: "La distance de \\(P(x_P\\,;\\,y_P)\\) à la droite \\(ax+by+c=0\\) est :", opts: ["\\(\\dfrac{|ax_P+by_P+c|}{\\sqrt{a^2+b^2}}\\)", "\\(ax_P+by_P+c\\)", "\\(\\sqrt{a^2+b^2}\\)", "\\(|ax_P+by_P+c|\\)"], ans: 0, chapter: "droite", difficulty: "intermediaire",
    exp: "On met les coordonnées du point dans \\(ax+by+c\\) (en haut, en valeur absolue), divisé par \\(\\sqrt{a^2+b^2}\\) :<br>\\(d = \\dfrac{|ax_P+by_P+c|}{\\sqrt{a^2+b^2}}\\)",
    formula: "\\(d = \\dfrac{|ax_P+by_P+c|}{\\sqrt{a^2+b^2}}\\)",
    simple: "En haut : tu remplaces x et y par les coordonnées du point, et tu prends la valeur absolue (pas de distance négative). En bas : la racine de \\(a^2+b^2\\). Les deux barres \\(|\\,|\\) sont indispensables."}
,
  {q: "La distance entre A(1;2) et B(4;6) est :", opts: ["5","3","4","7"], ans: 0, chapter: "cercle", difficulty: "intermediaire",
    exp: "On applique la formule de la distance (c'est Pythagore) :<br>\\(d=\\sqrt{(x_B-x_A)^2+(y_B-y_A)^2}\\)<br>\\(d=\\sqrt{(4-1)^2+(6-2)^2}\\)<br>\\(d=\\sqrt{3^2+4^2}=\\sqrt{9+16}\\)<br>\\(d=\\sqrt{25}=5\\)",
    formula: "\\(d=\\sqrt{(x_B-x_A)^2+(y_B-y_A)^2}\\)",
    demo: "distance",
    deep: "Cette formule, c'est juste le <strong>théorème de Pythagore</strong> déguisé. Entre A et B, tu fais un triangle rectangle : un côté horizontal (la différence des x = \\(4-1=3\\)) et un côté vertical (la différence des y = \\(6-2=4\\)). La distance AB est l'<strong>hypoténuse</strong> (le côté en biais). Pythagore dit : hypoténuse² = côté² + côté², donc \\(d^2=3^2+4^2=25\\), et \\(d=\\sqrt{25}=5\\). Le \\(^2\\) veut dire « au carré » = le nombre multiplié par lui-même (\\(3^2=3\\times3=9\\)). La racine \\(\\sqrt{\\ }\\) fait l'inverse du carré."},
  {q: "Le vecteur directeur de 3x − 4y + 1 = 0 est :", opts: ["\\(\\vec{u}=\\begin{pmatrix}4\\\\3\\end{pmatrix}\\)","\\(\\vec{u}=\\begin{pmatrix}3\\\\-4\\end{pmatrix}\\)","\\(\\vec{u}=\\begin{pmatrix}-4\\\\3\\end{pmatrix}\\)","\\(\\vec{u}=\\begin{pmatrix}3\\\\4\\end{pmatrix}\\)"], ans: 0, chapter: "droite", difficulty: "intermediaire", exp: "Formule : \\(\\vec{u}=\\begin{pmatrix}-b\\\\a\\end{pmatrix}\\). Ici a=3, b=−4, donc \\(\\vec{u}=\\begin{pmatrix}4\\\\3\\end{pmatrix}\\).",
    simple: "Tu lis a et b dans l'équation (3 et −4). Le directeur, c'est \\(\\begin{pmatrix}-b\\\\a\\end{pmatrix}\\) en colonne : en haut −(−4)=4, en bas 3. Attention au double signe sur le b !"},
  {q: "Rayon du cercle x²+y²−6x+2y+6=0 ?", opts: ["R=2","R=4","R=3","R=1"], ans: 0, chapter: "cercle", difficulty: "intermediaire",
    exp: "On lit les coefficients :<br>\\(a=-6\\)<br>\\(b=2\\)<br>\\(c=6\\)<br>Puis on applique la formule du rayon :<br>\\(R = \\dfrac{\\sqrt{(-6)^2+2^2-4(6)}}{2} = \\dfrac{\\sqrt{36+4-24}}{2} = \\dfrac{\\sqrt{16}}{2} = 2\\)",
    formula: "\\(R = \\dfrac{\\sqrt{a^2+b^2-4c}}{2}\\)  (à partir de \\(x^2+y^2+ax+by+c=0\\))",
    demo: "cercle_carre_combo",
    simple: "Dans l'équation, tu repères les 3 nombres devant x, devant y, et tout seul : ce sont a, b, c. Tu les mets dans la formule du rayon, tu calcules la racine, tu divises par 2. Astuce : utilise le 🧮 Brouillon en bas pour taper \\(√(36+4-24)/2\\)."},
  {q: "La droite 4x−3y+6=0 a pour pente m =", opts: ["\\(\\dfrac{4}{3}\\)","\\(-\\dfrac{4}{3}\\)","\\(\\dfrac{3}{4}\\)","\\(-\\dfrac{3}{4}\\)"], ans: 0, chapter: "droite", difficulty: "facile",
    exp: "On lit les coefficients de \\(ax+by+c=0\\) :<br>\\(a=4\\)<br>\\(b=-3\\)<br>Puis :<br>\\(m=-\\dfrac{a}{b}=-\\dfrac{4}{-3}=\\dfrac{4}{3}\\)",
    formula: "\\(m=-\\dfrac{a}{b}\\)  (pour une droite écrite \\(ax+by+c=0\\))",
    simple: "💡 <strong>Astuce</strong> : la pente, c'est presque le vecteur directeur \\(\\vec{u}=\\begin{pmatrix}-b\\\\a\\end{pmatrix}\\), mais écrit en <strong>fraction</strong> (le bas divise le haut) au lieu d'une colonne : \\(m=\\dfrac{a}{-b}=-\\dfrac{a}{b}\\). Donc si tu connais le vecteur directeur, tu connais la pente : tu mets juste le bas du vecteur sous le haut. Attention au signe — il y a bien un moins."},
  {q: "Un point P est à l'extérieur d'un cercle si :", opts: ["d(P,C) > R","d(P,C) < R","d(P,C) = R","d(P,C) = 0"], ans: 0, chapter: "cercle", difficulty: "facile",
    exp: "On compare la distance \\(d(P,C)\\) (point → centre) au rayon. P est <strong>à l'extérieur</strong> quand il est plus loin que le bord : \\(d(P,C)&gt;R\\).",
    formula: "\\(d(P,C)&gt;R\\) : extérieur · \\(=R\\) : dessus · \\(&lt;R\\) : intérieur",
    simple: "Si le point est plus loin du centre que la clôture (le rayon), il est dehors. Plus loin = distance plus grande que R."},
  {q: "La distance de M(2;1) à la droite 3x+4y−5=0 est :", opts: ["1","\\(\\dfrac{1}{5}\\)","3","2"], ans: 0, chapter: "droite", difficulty: "avance",
    exp: "On met les coordonnées de M(2;1) dans la formule :<br>\\(d=\\dfrac{|a x_M+b y_M+c|}{\\sqrt{a^2+b^2}}\\)<br>\\(d=\\dfrac{|3(2)+4(1)-5|}{\\sqrt{3^2+4^2}}\\)<br>\\(d=\\dfrac{|6+4-5|}{\\sqrt{25}}=\\dfrac{5}{5}=1\\)",
    formula: "\\(d=\\dfrac{|a x_P+b y_P+c|}{\\sqrt{a^2+b^2}}\\)  (point P, droite \\(ax+by+c=0\\))",
    simple: "Tu prends a, b, c dans l'équation de la droite (ici 3, 4, −5), et les coordonnées du point (2 et 1). Tu remplaces dans la formule. Le \\(|\\ldots|\\) (valeur absolue) veut dire qu'on enlève le signe — une distance est toujours positive. En bas, \\(\\sqrt{3^2+4^2}=\\sqrt{25}=5\\). 🧮 Brouillon dispo."},
  {q: "Forme canonique de x²+y²+2x−4y−4=0 :", opts: ["(x+1)²+(y−2)²=9","(x−1)²+(y+2)²=9","(x+1)²+(y−2)²=3","(x+2)²+(y−1)²=9"], ans: 0, chapter: "cercle", difficulty: "avance",
    exp: "On complète le carré pour x, puis pour y :<br>\\(x^2+2x = (x+1)^2 - 1\\)<br>\\(y^2-4y = (y-2)^2 - 4\\)<br>On remplace :<br>\\((x+1)^2 - 1 + (y-2)^2 - 4 - 4 = 0\\)<br>On range les nombres à droite :<br>\\((x+1)^2 + (y-2)^2 = 9\\)",
    formula: "\\(x^2+bx = \\left(x+\\tfrac{b}{2}\\right)^2 - \\left(\\tfrac{b}{2}\\right)^2\\)",
    demo: "cercle_carre_combo",
    deep: "D'où vient le \\(-1\\) ? Quand tu transformes \\(x^2+2x\\) en carré, tu écris \\((x+1)^2\\). Mais \\((x+1)^2 = x^2+2x+1\\) : il y a un \\(+1\\) en trop ! Donc pour ne rien changer, tu le retires : \\((x+1)^2 - 1\\). Pareil pour y : \\((y-2)^2 = y^2-4y+4\\), il y a un \\(+4\\) en trop, donc \\((y-2)^2 - 4\\). Ensuite tu as \\(-1\\), \\(-4\\) et le \\(-4\\) du départ : tu les fais passer à droite (ils deviennent \\(+1\\), \\(+4\\), \\(+4\\)), ce qui donne \\(1+4+4=9\\). Regarde l'animation pour le voir bouger."},
  {q: "Le cercle x²+y²−4x+6y−12=0 a pour rayon :", opts: ["R = 5","R = 10","R = 25","\\(R=\\sqrt{13}\\)"], ans: 0, chapter: "cercle", difficulty: "difficile",
    exp: "On repère :<br>\\(a=-4\\)<br>\\(b=6\\)<br>\\(c=-12\\)<br>Puis :<br>\\(R=\\dfrac{\\sqrt{a^2+b^2-4c}}{2}=\\dfrac{\\sqrt{16+36+48}}{2}=\\dfrac{\\sqrt{100}}{2}=5\\)",
    formula: "\\(R = \\dfrac{\\sqrt{a^2+b^2-4c}}{2}\\)",
    demo: "cercle_carre_combo",
    simple: "Même méthode que pour tout cercle écrit en \\(x^2+y^2+ax+by+c=0\\) : tu prends a, b, c, tu les mets dans la formule. Ici la racine tombe juste sur \\(\\sqrt{100}=10\\), divisé par 2 → 5. (🧮 Brouillon dispo si besoin.)"},
  {q: "Le cercle de centre C(1;−2) tangent à la droite 3x−4y+1=0 a pour équation :", opts: ["\\((x-1)^2+(y+2)^2=\\dfrac{144}{25}\\)","\\((x-1)^2+(y+2)^2=\\dfrac{12}{5}\\)","\\((x-1)^2+(y+2)^2=25\\)","\\((x+1)^2+(y-2)^2=\\dfrac{144}{25}\\)"], ans: 0, chapter: "cercle", difficulty: "avance",
    exp: "<strong>Idée clé</strong> : « tangent » = le cercle touche la droite en un seul point, donc le rayon = la distance du centre à la droite.<br><br><strong>Étape 1 — le rayon</strong> (distance de C(1;−2) à la droite) :<br>\\(R=\\dfrac{|3(1)-4(-2)+1|}{\\sqrt{3^2+4^2}}=\\dfrac{|3+8+1|}{\\sqrt{25}}=\\dfrac{12}{5}\\)<br><br><strong>Étape 2 — l'équation</strong> avec C(1;−2) et \\(R^2\\) :<br>\\((x-1)^2+(y+2)^2=\\left(\\dfrac{12}{5}\\right)^2=\\dfrac{144}{25}\\)",
    formula: "Tangente : \\(R = d(C, \\text{droite}) = \\dfrac{|ax_C+by_C+c|}{\\sqrt{a^2+b^2}}\\)  ·  Cercle : \\((x-x_C)^2+(y-y_C)^2=R^2\\)",
    simple: "« Tangent » veut dire que la droite <strong>frôle</strong> le cercle : elle le touche juste en un point. À ce moment-là, le rayon est exactement la distance la plus courte entre le centre et la droite. Donc : 1) tu calcules cette distance (= le rayon), 2) tu écris l'équation du cercle. Attention : dans l'équation on met \\(R^2\\), pas R — d'où le \\(\\dfrac{144}{25}\\) (c'est \\(\\dfrac{12}{5}\\) au carré). 🧮 Brouillon utile ici."},
  {q: "Deux cercles de rayon 2, centrés en O(0;0) et en (5;0), sont :", opts: ["Extérieurs l'un à l'autre","Tangents extérieurement","Sécants","Tangents intérieurement"], ans: 0, chapter: "cercle", difficulty: "difficile",
    exp: "On compare la <strong>distance entre les centres</strong> à la <strong>somme des rayons</strong>.<br>Distance des centres : \\(d=5\\)<br>Somme des rayons : \\(R_1+R_2=2+2=4\\)<br>Comme \\(d>R_1+R_2\\) (\\(5>4\\)), les deux cercles ne se touchent pas : ils sont <strong>extérieurs</strong> l'un à l'autre.",
    formula: "\\(d&gt;R_1+R_2\\) : extérieurs  ·  \\(d=R_1+R_2\\) : tangents (1 point)  ·  \\(d&lt;R_1+R_2\\) : sécants (2 points)",
    deep: "Imagine deux ronds. Pour savoir comment ils se placent, tu compares 2 nombres :<br>• <strong>d</strong> = la distance entre leurs centres (ici les centres sont en (0;0) et (5;0), donc \\(d=5\\)).<br>• <strong>la somme des rayons</strong> = \\(2+2=4\\) : c'est la portée maximale pour qu'ils se touchent.<br>Si d est <strong>plus grand</strong> que cette somme, les ronds sont trop loin → ils ne se touchent pas du tout = <strong>extérieurs</strong>. S'ils sont à égalité, ils se touchent juste (tangents). Si d est plus petit, ils se chevauchent (sécants, 2 points communs). Ici \\(5>4\\) → extérieurs."},
  {q: "La distance du point P(3;4) à la droite 2x−y+1=0 vaut :", opts: ["\\(\\dfrac{3}{\\sqrt5}=\\dfrac{3\\sqrt5}{5}\\)","\\(\\dfrac{3}{5}\\)","\\(\\sqrt5\\)","3"], ans: 0, chapter: "droite", difficulty: "difficile",
    exp: "On remplace P(3;4) dans la formule (a=2, b=−1, c=1) :<br>\\(d=\\dfrac{|2(3)-4+1|}{\\sqrt{2^2+(-1)^2}}\\)<br>\\(d=\\dfrac{|6-4+1|}{\\sqrt{5}}=\\dfrac{3}{\\sqrt5}=\\dfrac{3\\sqrt5}{5}\\)",
    formula: "\\(d=\\dfrac{|ax_P+by_P+c|}{\\sqrt{a^2+b^2}}\\)",
    simple: "Tu mets les coordonnées du point dans \\(ax+by+c\\) (avec valeur absolue), divisé par \\(\\sqrt{a^2+b^2}\\). À la fin on « rationalise » \\(\\dfrac{3}{\\sqrt5}\\) en multipliant haut et bas par \\(\\sqrt5\\) → \\(\\dfrac{3\\sqrt5}{5}\\) (même valeur, écriture plus propre). 🧮 Brouillon dispo."},
  {q: "La médiatrice du segment [AB] avec A(1;2) et B(5;6) est :", opts: ["x + y − 7 = 0","x − y + 1 = 0","y = x + 1","x + y + 7 = 0"], ans: 0, chapter: "droite", difficulty: "avance",
    exp: "<strong>Étape 1 — le milieu M de [AB]</strong> (moyenne des coordonnées) :<br>\\(x_M=\\dfrac{1+5}{2}=3\\)<br>\\(y_M=\\dfrac{2+6}{2}=4\\)<br>donc \\(M(3\\,;\\,4)\\)<br><br><strong>Étape 2 — la pente de [AB]</strong> :<br>\\(m_{AB}=\\dfrac{6-2}{5-1}=\\dfrac{4}{4}=1\\)<br><br><strong>Étape 3 — la pente de la médiatrice</strong> (perpendiculaire, donc \\(-\\dfrac{1}{m}\\)) :<br>\\(m'=-\\dfrac{1}{1}=-1\\)<br><br><strong>Étape 4 — l'équation</strong> par M avec la pente m' :<br>\\(y-4=-1(x-3)\\)<br>\\(y-4=-x+3\\)<br>\\(x+y-7=0\\)",
    formula: "Milieu : \\(M\\!\\left(\\dfrac{x_A+x_B}{2}\\,;\\,\\dfrac{y_A+y_B}{2}\\right)\\)  ·  Perpendiculaire : \\(m'=-\\dfrac{1}{m}\\)  ·  Droite par un point : \\(y-y_M=m'(x-x_M)\\)",
    simple: "Une <strong>médiatrice</strong>, c'est la droite qui coupe le segment [AB] en plein milieu, à angle droit (90°). Donc il te faut 2 choses : <strong>par où elle passe</strong> (le milieu M de AB) et <strong>son inclinaison</strong> (perpendiculaire à AB). « Perpendiculaire » = on retourne la pente et on change le signe : si AB monte avec une pente de 1, la médiatrice descend avec une pente de −1.",
    deep: "On part de zéro.<br>• <strong>Le milieu</strong> : pour trouver le point au centre de A et B, tu fais la moyenne — tu additionnes les deux x et tu divises par 2, pareil pour les y. Ici \\((1+5)/2=3\\) et \\((2+6)/2=4\\), donc M est en (3;4).<br>• <strong>La pente</strong> d'une droite = « de combien ça monte quand on avance ». On la calcule \\(\\dfrac{\\text{montée}}{\\text{avancée}}=\\dfrac{y_B-y_A}{x_B-x_A}\\). Ici \\(\\dfrac{4}{4}=1\\).<br>• <strong>Perpendiculaire</strong> : deux droites à angle droit ont des pentes dont le produit fait −1. Donc si AB a une pente 1, la médiatrice a pour pente −1 (car \\(1\\times(-1)=-1\\)).<br>• <strong>Écrire la droite</strong> : on connaît un point (M) et la pente (−1), on utilise \\(y-y_M=m'(x-x_M)\\), puis on range tout d'un côté pour obtenir \\(x+y-7=0\\)."},
  {q: "Les droites d₁ : 2x+3y−1=0 et d₂ : 3x−2y+4=0 sont :", opts: ["Perpendiculaires","Parallèles","Confondues","Sécantes non perpendiculaires"], ans: 0, chapter: "droite", difficulty: "avance",
    exp: "On calcule les deux pentes avec \\(m=-\\dfrac{a}{b}\\) :<br>\\(m_1=-\\dfrac{2}{3}\\)<br>\\(m_2=-\\dfrac{3}{-2}=\\dfrac{3}{2}\\)<br>Produit :<br>\\(m_1\\cdot m_2=-\\dfrac{2}{3}\\times\\dfrac{3}{2}=-1\\)<br>→ <strong>perpendiculaires</strong>.",
    formula: "\\(m=-\\dfrac{a}{b}\\) pour chaque droite, puis test \\(m_1\\cdot m_2=-1\\)",
    simple: "Chaque droite est en \\(ax+by+c=0\\), donc tu trouves sa pente avec \\(-\\dfrac{a}{b}\\). Tu obtiens \\(-\\frac23\\) et \\(\\frac32\\). Tu les multiplies : ça fait −1 → angle droit, perpendiculaires."},

  // ── Questions supplémentaires (juin 2026) ──,
  {q: "La distance entre A(1 ; 2) et B(4 ; 6) vaut :", opts: ["5", "7", "\\(\\sqrt{7}\\)", "25"], ans: 0, chapter: "cercle", difficulty: "facile",
    exp: "On applique la formule de Pythagore :<br>\\(AB=\\sqrt{(4-1)^2+(6-2)^2}=\\sqrt{9+16}=\\sqrt{25}=5\\)",
    formula: "\\(AB=\\sqrt{(x_B-x_A)^2+(y_B-y_A)^2}\\)",
    simple: "Tu calcules le déplacement en x (4−1=3) et en y (6−2=4), tu les mets au carré, tu additionnes, et tu prends la racine : \\(\\sqrt{9+16}=\\sqrt{25}=5\\). 🧮 Brouillon dispo."},
  {q: "La norme du vecteur \\(\\vec{u}=(6\\,;\\,8)\\) est :", opts: ["10", "14", "\\(\\sqrt{14}\\)", "48"], ans: 0, chapter: "vecteur", difficulty: "facile",
    exp: "\\(\\|\\vec{u}\\|=\\sqrt{6^2+8^2}=\\sqrt{36+64}=\\sqrt{100}=10\\)",
    formula: "\\(\\|\\vec{u}\\|=\\sqrt{x^2+y^2}\\)",
    simple: "La norme = la longueur de la flèche. C'est Pythagore avec les composantes : \\(\\sqrt{6^2+8^2}=\\sqrt{100}=10\\)."},
  {q: "Les composantes de \\(\\vec{AB}\\) avec A(2 ; −1) et B(5 ; 3) sont :", opts: ["(3 ; 4)", "(7 ; 2)", "(−3 ; −4)", "(3 ; −4)"], ans: 0, chapter: "vecteur", difficulty: "facile",
    exp: "\\(\\vec{AB}=(x_B-x_A\\,;\\,y_B-y_A)=(5-2\\,;\\,3-(-1))=(3\\,;\\,4)\\)",
    formula: "\\(\\vec{AB}=(x_B-x_A\\,;\\,y_B-y_A)\\)",
    simple: "« Arrivée moins départ » : pour x, 5−2=3 ; pour y, 3−(−1)=4. Attention au moins-moins qui fait plus !"},
  {q: "Le milieu de [AB] avec A(−2 ; 4) et B(6 ; −2) est :", opts: ["(2 ; 1)", "(4 ; 2)", "(2 ; 2)", "(8 ; 6)"], ans: 0, chapter: "vecteur", difficulty: "facile",
    exp: "\\(M=\\left(\\dfrac{x_A+x_B}{2}\\,;\\,\\dfrac{y_A+y_B}{2}\\right)=\\left(\\dfrac{-2+6}{2}\\,;\\,\\dfrac{4-2}{2}\\right)=(2\\,;\\,1)\\)",
    formula: "\\(M=\\left(\\dfrac{x_A+x_B}{2}\\,;\\,\\dfrac{y_A+y_B}{2}\\right)\\)",
    simple: "Le milieu = la moyenne des coordonnées. Tu additionnes les x et tu divises par 2, pareil pour les y."},
  {q: "Les vecteurs \\(\\vec{u}=(2\\,;\\,3)\\) et \\(\\vec{v}=(4\\,;\\,6)\\) sont :", opts: ["Colinéaires", "Orthogonaux", "Égaux", "De sens opposés"], ans: 0, chapter: "vecteur", difficulty: "intermediaire",
    exp: "On a \\(\\vec{v}=2\\,\\vec{u}\\). Le déterminant \\(2\\times6-3\\times4=0\\) → ils sont <strong>colinéaires</strong> (même direction).",
    formula: "Colinéaires si \\(x_u\\,y_v-y_u\\,x_v=0\\)",
    simple: "v est exactement 2 fois u, donc ils pointent dans la même direction : colinéaires. Le test : le déterminant vaut 0."},
  {q: "Le centre du cercle \\((x-3)^2+(y+5)^2=16\\) est :", opts: ["(3 ; −5)", "(−3 ; 5)", "(3 ; 5)", "(−3 ; −5)"], ans: 0, chapter: "cercle", difficulty: "facile",
    exp: "Forme canonique \\((x-x_0)^2+(y-y_0)^2=R^2\\). Ici \\(x_0=3\\) et \\((y+5)=(y-(-5))\\) donc \\(y_0=-5\\).",
    formula: "Centre \\(C(x_0\\,;\\,y_0)\\) dans \\((x-x_0)^2+(y-y_0)^2=R^2\\)",
    simple: "On lit l'opposé de ce qui est dans les parenthèses : \\(x-3\\) → 3 ; \\(y+5=y-(-5)\\) → −5. Attention au signe du +5 !"},
  {q: "Le rayon du cercle \\((x-1)^2+(y-2)^2=49\\) est :", opts: ["7", "49", "\\(\\sqrt{7}\\)", "14"], ans: 0, chapter: "cercle", difficulty: "facile",
    exp: "Le membre de droite vaut \\(R^2=49\\), donc \\(R=\\sqrt{49}=7\\).",
    formula: "\\(R=\\sqrt{R^2}\\)",
    simple: "À droite c'est R² (pas R !). Comme 49=7², le rayon est 7. Erreur classique : répondre 49."},
  {q: "Le point P(5 ; 0) par rapport au cercle de centre O(0 ; 0) et de rayon 4 est :", opts: ["À l'extérieur", "Sur le cercle", "À l'intérieur", "Au centre"], ans: 0, chapter: "cercle", difficulty: "intermediaire",
    exp: "On compare la distance au centre et le rayon : \\(d(O,P)=\\sqrt{5^2+0^2}=5\\). Comme \\(5>4\\), P est <strong>à l'extérieur</strong>.",
    formula: "\\(d(O,P)\\) vs \\(R\\) : > extérieur, = dessus, < intérieur",
    simple: "Tu mesures la distance du point au centre (ici 5) et tu la compares au rayon (4). Plus loin que le rayon = dehors."},
  {q: "La pente de la droite passant par A(1 ; 2) et B(3 ; 8) est :", opts: ["3", "2", "4", "\\(\\tfrac{1}{2}\\)"], ans: 0, chapter: "droite", difficulty: "facile",
    exp: "\\(m=\\dfrac{y_B-y_A}{x_B-x_A}=\\dfrac{8-2}{3-1}=\\dfrac{6}{2}=3\\)",
    formula: "\\(m=\\dfrac{y_B-y_A}{x_B-x_A}\\)",
    simple: "La pente = (différence des y) ÷ (différence des x) = 6 ÷ 2 = 3. Une animation existe dans les Graphiques !"},
  {q: "Un vecteur normal à la droite \\(3x-4y+1=0\\) est :", opts: ["(3 ; −4)", "(4 ; 3)", "(−4 ; 3)", "(3 ; 4)"], ans: 0, chapter: "droite", difficulty: "intermediaire",
    exp: "Pour une droite \\(ax+by+c=0\\), le vecteur normal est \\(\\vec{n}=(a\\,;\\,b)=(3\\,;\\,-4)\\).",
    formula: "\\(\\vec{n}=(a\\,;\\,b)\\)  pour  \\(ax+by+c=0\\)",
    simple: "Le vecteur normal se lit directement : ce sont les coefficients devant x et y, soit (3 ; −4)."},
  {q: "La droite perpendiculaire à \\(y=2x+1\\) a pour pente :", opts: ["\\(-\\tfrac{1}{2}\\)", "2", "\\(\\tfrac{1}{2}\\)", "−2"], ans: 0, chapter: "droite", difficulty: "intermediaire",
    exp: "Deux droites perpendiculaires vérifient \\(m\\cdot m'=-1\\). Ici \\(m=2\\) donc \\(m'=-\\dfrac{1}{2}\\).",
    formula: "\\(m\\cdot m'=-1\\)",
    simple: "Perpendiculaire = on inverse et on change le signe : 2 devient \\(-\\tfrac{1}{2}\\). Vérifie : \\(2\\times(-\\tfrac12)=-1\\). ✓"}];

// ════════════════════════════════════════════════════════════
//  NOTIONS CLÉS par chapitre (onglet « Progression »)
//  Chaque concept est relié aux questions du quiz par des mots-clés
//  (match insensible à la casse sur le texte de la question q.q).
//  Une notion est « maîtrisée » si l'élève a réussi ≥2 fois au moins
//  une question reliée (via data.masteredQuestions).
// ════════════════════════════════════════════════════════════
const learningConcepts = {
  vecteur: [
    { concept: "Définition d'un vecteur", keywords: ["représente le vecteur"] },
    { concept: "Relation de Chasles", keywords: ["Chasles", "+\\vec{BC}", "+\\vec{CD}"] },
    { concept: "Vecteur opposé & vecteur nul", keywords: ["opposé de", "vaut \\(\\vec{AA}"] },
    { concept: "Différence de vecteurs", keywords: ["différence \\(\\vec{u}-\\vec{v}"] },
    { concept: "Multiplication par un réel & norme", keywords: ["norme du vecteur", "Si \\(k<0\\)"] },
    { concept: "Colinéarité & alignement", keywords: ["colinéaires", "alignés", "parallèles si"] },
    { concept: "Milieu d'un segment", keywords: ["milieu de [AB]"] },
    { concept: "Règle du parallélogramme", keywords: ["\\vec{OA}+\\vec{OB}"] },
    { concept: "Composantes d'un vecteur", keywords: ["composantes de"] }
  ],
  cercle: [
    { concept: "Équation canonique (centre, rayon)", keywords: ["équation canonique d'un cercle", "centré à l'origine"] },
    { concept: "Centre depuis forme développée", keywords: ["le centre est"] },
    { concept: "Rayon depuis forme développée", keywords: ["rayon d'un cercle", "a pour rayon", "Rayon du cercle"] },
    { concept: "Condition d'existence", keywords: ["condition d'existence", "lieu géométrique"] },
    { concept: "Position d'un point / cercle", keywords: ["point est sur un cercle", "d(P,C)", "à l'extérieur d'un cercle"] },
    { concept: "Cercle de diamètre [AB]", keywords: ["diamètre [AB]"] },
    { concept: "Cercle par 3 points", keywords: ["par 3 points", "3 points pour un cercle"] },
    { concept: "Distance entre deux points", keywords: ["distance entre A"] },
    { concept: "Compléter le carré (forme canonique)", keywords: ["Forme canonique de x"] },
    { concept: "Cercle tangent à une droite", keywords: ["tangent à la droite"] },
    { concept: "Position de deux cercles", keywords: ["Deux cercles"] }
  ],
  droite: [
    { concept: "Forme explicite y = mx + p", keywords: ["forme explicite", "p représente"] },
    { concept: "Pente d'une droite", keywords: ["pour pente", "a pour pente", "pente de d", "Si m >"] },
    { concept: "Vecteur directeur", keywords: ["vecteur directeur"] },
    { concept: "Vecteur normal", keywords: ["vecteur normal"] },
    { concept: "Droites parallèles", keywords: ["soient parallèles", "sont :"] },
    { concept: "Droites perpendiculaires", keywords: ["perpendiculaires", "perpendiculaire par"] },
    { concept: "Équation d'une droite par 2 points", keywords: ["droite par A", "d'une droite par"] },
    { concept: "Distance point-droite", keywords: ["distance de", "distance du point"] },
    { concept: "Médiatrice d'un segment", keywords: ["médiatrice"] }
  ]
};

let flashcards = [
  {front: "Qu'est-ce qu'un vecteur \\(\\vec{AB}\\) ?", back: "La <strong>translation</strong> qui amène A sur B. C'est un segment <em>orienté</em> : il a une <strong>direction</strong>, un <strong>sens</strong> et une <strong>norme</strong> (sa longueur).", chapter: "vecteur"},
  {front: "Les 3 caractéristiques d'un vecteur ?", back: "<strong>Direction</strong> (droite AB), <strong>sens</strong> (de A vers B), <strong>norme</strong> \\(\\|\\vec{AB}\\|\\) (longueur du segment [AB]).", chapter: "vecteur"},
  {front: "Quand deux vecteurs sont-ils égaux ?", back: "Quand ils ont la <strong>même direction</strong>, le <strong>même sens</strong> et la <strong>même norme</strong> (ils définissent la même translation).", chapter: "vecteur"},
  {front: "Qu'est-ce que le vecteur nul \\(\\vec{0}\\) ?", back: "Un vecteur dont l'origine = l'extrémité : \\(\\vec{AA}=\\vec{0}\\). Il n'a ni direction ni sens.", chapter: "vecteur"},
  {front: "Qu'est-ce que le vecteur opposé \\(-\\vec{u}\\) ?", back: "Même direction, même norme, <strong>sens opposé</strong>. On a \\(-\\vec{AB}=\\vec{BA}\\).<br><svg viewBox='0 0 200 78' width='185' style='max-width:100%;height:auto;margin-top:8px'><defs><marker id='opA' markerWidth='7' markerHeight='7' refX='5' refY='3' orient='auto'><path d='M0,0L6,3L0,6z' fill='#34d399'/></marker><marker id='opB' markerWidth='7' markerHeight='7' refX='5' refY='3' orient='auto'><path d='M0,0L6,3L0,6z' fill='#f87171'/></marker></defs><circle cx='25' cy='30' r='3' fill='#e5e7eb'/><circle cx='175' cy='30' r='3' fill='#e5e7eb'/><text x='15' y='24' fill='#e5e7eb' font-size='12' font-weight='bold'>A</text><text x='178' y='24' fill='#e5e7eb' font-size='12' font-weight='bold'>B</text><line x1='28' y1='30' x2='166' y2='30' stroke='#34d399' stroke-width='2.5' marker-end='url(#opA)'/><text x='92' y='22' fill='#34d399' font-size='11'>AB</text><line x1='172' y1='54' x2='34' y2='54' stroke='#f87171' stroke-width='2.5' marker-end='url(#opB)'/><text x='82' y='70' fill='#f87171' font-size='11'>BA = −AB</text></svg>", chapter: "vecteur"},
  {front: "Relation de Chasles ?", back: "$$\\vec{AB}+\\vec{BC}=\\vec{AC}$$ On met les vecteurs <strong>bout à bout</strong> : l'extrémité du 1er est l'origine du 2e. On garde la 1re origine et la dernière extrémité (s'étend : \\(\\vec{AB}+\\vec{BC}+\\vec{CD}=\\vec{AD}\\)).<br><svg viewBox='0 0 210 115' width='200' style='max-width:100%;height:auto;margin-top:6px'><defs><marker id='chA' markerWidth='7' markerHeight='7' refX='5' refY='3' orient='auto'><path d='M0,0L6,3L0,6z' fill='#e2e8f0'/></marker><marker id='chB' markerWidth='7' markerHeight='7' refX='5' refY='3' orient='auto'><path d='M0,0L6,3L0,6z' fill='#a78bfa'/></marker></defs><line x1='18' y1='98' x2='108' y2='66' stroke='#34d399' stroke-width='2.5' marker-end='url(#chA)'/><line x1='108' y1='66' x2='192' y2='30' stroke='#fbbf24' stroke-width='2.5' marker-end='url(#chA)'/><line x1='18' y1='98' x2='192' y2='30' stroke='#a78bfa' stroke-width='2.5' stroke-dasharray='6 4' marker-end='url(#chB)'/><text x='6' y='106' fill='#fff' font-size='13' font-weight='bold'>A</text><text x='104' y='60' fill='#fff' font-size='13' font-weight='bold'>B</text><text x='190' y='24' fill='#fff' font-size='13' font-weight='bold'>C</text></svg><br><em>Chasles = un chemin (B est une étape entre A et C).</em>", chapter: "vecteur"},
  {front: "Règle du parallélogramme ?", back: "$$\\vec{OA}+\\vec{OB}=\\vec{OC}$$ Ici les deux vecteurs partent du <strong>même point O</strong>. On complète le <strong>parallélogramme</strong> OACB : la somme \\(\\vec{OC}\\) est la <strong>diagonale</strong> (C est le coin opposé à O).<br><svg viewBox='0 0 200 115' width='200' style='max-width:100%;height:auto;margin-top:6px'><defs><marker id='paA' markerWidth='7' markerHeight='7' refX='5' refY='3' orient='auto'><path d='M0,0L6,3L0,6z' fill='#e2e8f0'/></marker><marker id='paB' markerWidth='7' markerHeight='7' refX='5' refY='3' orient='auto'><path d='M0,0L6,3L0,6z' fill='#a78bfa'/></marker></defs><line x1='120' y1='92' x2='162' y2='24' stroke='#94a3b8' stroke-width='1.2' stroke-dasharray='3 3'/><line x1='60' y1='30' x2='162' y2='24' stroke='#94a3b8' stroke-width='1.2' stroke-dasharray='3 3'/><line x1='18' y1='98' x2='120' y2='92' stroke='#34d399' stroke-width='2.5' marker-end='url(#paA)'/><line x1='18' y1='98' x2='60' y2='30' stroke='#fbbf24' stroke-width='2.5' marker-end='url(#paA)'/><line x1='18' y1='98' x2='162' y2='24' stroke='#a78bfa' stroke-width='2.5' stroke-dasharray='6 4' marker-end='url(#paB)'/><text x='4' y='106' fill='#fff' font-size='13' font-weight='bold'>O</text><text x='124' y='98' fill='#fff' font-size='13' font-weight='bold'>A</text><text x='44' y='28' fill='#fff' font-size='13' font-weight='bold'>B</text><text x='166' y='20' fill='#fff' font-size='13' font-weight='bold'>C</text></svg><br><em>Différence avec Chasles : ici les 2 vecteurs ont la <strong>même origine</strong> O (pas bout à bout).</em>", chapter: "vecteur"},
  {front: "Comment calcule-t-on une différence de vecteurs ?", back: "$$\\vec{u}-\\vec{v}=\\vec{u}+(-\\vec{v})$$ On ajoute l'<strong>opposé</strong> de \\(\\vec{v}\\). En coordonnées : \\(\\vec{u}-\\vec{v}=\\begin{pmatrix}x_u-x_v\\\\y_u-y_v\\end{pmatrix}\\).<br><strong>À quoi ça sert :</strong> si \\(\\vec{u}=\\vec{OA}\\) et \\(\\vec{v}=\\vec{OB}\\) (même origine O), alors \\(\\vec{u}-\\vec{v}=\\vec{BA}\\) — le vecteur qui va de l'extrémité de \\(\\vec{v}\\) vers celle de \\(\\vec{u}\\). C'est ce qui donne les composantes : \\(\\vec{AB}=\\vec{OB}-\\vec{OA}\\) = arrivée − départ.<br><svg viewBox='0 0 200 115' width='190' style='max-width:100%;height:auto;margin-top:6px'><defs><marker id='diA' markerWidth='7' markerHeight='7' refX='5' refY='3' orient='auto'><path d='M0,0L6,3L0,6z' fill='#e2e8f0'/></marker><marker id='diB' markerWidth='7' markerHeight='7' refX='5' refY='3' orient='auto'><path d='M0,0L6,3L0,6z' fill='#a78bfa'/></marker></defs><line x1='18' y1='98' x2='150' y2='48' stroke='#34d399' stroke-width='2.5' marker-end='url(#diA)'/><line x1='18' y1='98' x2='58' y2='30' stroke='#fbbf24' stroke-width='2.5' marker-end='url(#diA)'/><line x1='58' y1='30' x2='150' y2='48' stroke='#a78bfa' stroke-width='2.5' stroke-dasharray='6 4' marker-end='url(#diB)'/><text x='4' y='106' fill='#fff' font-size='13' font-weight='bold'>O</text><text x='154' y='48' fill='#fff' font-size='13' font-weight='bold'>A</text><text x='44' y='28' fill='#fff' font-size='13' font-weight='bold'>B</text><text x='86' y='84' fill='#34d399' font-size='11'>u</text><text x='24' y='58' fill='#fbbf24' font-size='11'>v</text><text x='96' y='30' fill='#a78bfa' font-size='11'>u−v</text></svg>", chapter: "vecteur"},
  {front: "Norme et sens de \\(k\\,\\vec{v}\\) (k réel) ?", back: "\\(k\\,\\vec{v}\\) est un <strong>vecteur</strong> : on multiplie le vecteur \\(\\vec{v}\\) par le nombre réel \\(k\\).<br>• <strong>Longueur (norme)</strong> : $$\\|k\\,\\vec{v}\\|=|k|\\times\\|\\vec{v}\\|$$ elle est multipliée par \\(|k|\\) (\\(k=2\\) → 2× plus long ; \\(k=\\tfrac12\\) → 2× plus court).<br>• <strong>Direction</strong> : la même que \\(\\vec{v}\\).<br>• <strong>Sens</strong> : le même si \\(k>0\\), <strong>opposé</strong> si \\(k<0\\).<br><em>Rappel des notations : \\(\\|\\vec{v}\\|\\) = la norme = la longueur du vecteur ; \\(|k|\\) = la valeur absolue de \\(k\\).</em><br><svg viewBox='0 0 210 100' width='195' style='max-width:100%;height:auto;margin-top:8px'><defs><marker id='kvg' markerWidth='7' markerHeight='7' refX='5' refY='3' orient='auto'><path d='M0,0L6,3L0,6z' fill='#34d399'/></marker><marker id='kvb' markerWidth='7' markerHeight='7' refX='5' refY='3' orient='auto'><path d='M0,0L6,3L0,6z' fill='#60a5fa'/></marker><marker id='kvr' markerWidth='7' markerHeight='7' refX='5' refY='3' orient='auto'><path d='M0,0L6,3L0,6z' fill='#f87171'/></marker></defs><circle cx='80' cy='22' r='2.5' fill='#e5e7eb'/><circle cx='80' cy='52' r='2.5' fill='#e5e7eb'/><circle cx='80' cy='82' r='2.5' fill='#e5e7eb'/><line x1='80' y1='22' x2='130' y2='22' stroke='#34d399' stroke-width='2.5' marker-end='url(#kvg)'/><text x='136' y='26' fill='#34d399' font-size='11'>v</text><line x1='80' y1='52' x2='190' y2='52' stroke='#60a5fa' stroke-width='2.5' marker-end='url(#kvb)'/><text x='150' y='47' fill='#60a5fa' font-size='11'>2v</text><line x1='80' y1='82' x2='22' y2='82' stroke='#f87171' stroke-width='2.5' marker-end='url(#kvr)'/><text x='30' y='77' fill='#f87171' font-size='11'>−v</text></svg>", chapter: "vecteur"},
  {front: "Quand deux vecteurs sont-ils colinéaires ?", back: "S'il existe un réel non nul \\(k\\) tel que $$\\vec{u}=k\\,\\vec{v}$$ (ils ont alors la même direction).<br><svg viewBox='0 0 220 90' width='200' style='max-width:100%;height:auto;margin-top:6px'><defs><marker id='colg' markerWidth='7' markerHeight='7' refX='5' refY='3' orient='auto'><path d='M0,0L6,3L0,6z' fill='#34d399'/></marker><marker id='colp' markerWidth='7' markerHeight='7' refX='5' refY='3' orient='auto'><path d='M0,0L6,3L0,6z' fill='#a78bfa'/></marker></defs><line x1='15' y1='78' x2='75' y2='48' stroke='#34d399' stroke-width='2.5' marker-end='url(#colg)'/><text x='32' y='56' fill='#34d399' font-size='11'>v</text><line x1='120' y1='80' x2='210' y2='35' stroke='#a78bfa' stroke-width='2.5' marker-end='url(#colp)'/><text x='150' y='52' fill='#a78bfa' font-size='11'>u = k·v</text></svg>", chapter: "vecteur"},
  {front: "Comment montrer que A, B, C sont alignés ?", back: "Montrer que \\(\\vec{AB}\\) et \\(\\vec{AC}\\) sont colinéaires : \\(\\vec{AB}=k\\,\\vec{AC}\\).", chapter: "vecteur"},
  {front: "Quand les droites (AB) et (CD) sont-elles parallèles ?", back: "Quand \\(\\vec{AB}\\) et \\(\\vec{CD}\\) sont colinéaires : \\(\\vec{AB}=k\\,\\vec{CD}\\).", chapter: "vecteur"},
  {front: "Comment caractériser le milieu M de [AB] ?", back: "Avec les <strong>vecteurs</strong> : $$\\vec{AM}=\\tfrac{1}{2}\\,\\vec{AB}$$ (le chemin de A à M = la moitié du chemin de A à B).<br>Avec les <strong>coordonnées</strong> (la moyenne) : $$M\\left(\\dfrac{x_A+x_B}{2}\\,;\\,\\dfrac{y_A+y_B}{2}\\right)$$", chapter: "vecteur"},
  {front: "Qu'est-ce qu'une combinaison linéaire de \\(\\vec{u}\\) et \\(\\vec{v}\\) ?", back: "C'est un vecteur \\(\\vec{w}\\) qu'on <strong>fabrique en mélangeant</strong> \\(\\vec{u}\\) et \\(\\vec{v}\\) : un peu de l'un, un peu de l'autre. $$\\vec{w}=a\\,\\vec{u}+b\\,\\vec{v}$$ où a et b sont des nombres réels (pas tous les deux nuls).<br><strong>Exemple :</strong> \\(\\vec{w}=2\\,\\vec{u}-3\\,\\vec{v}\\). Si \\(\\vec{u}\\) et \\(\\vec{v}\\) ne sont pas colinéaires, on peut écrire <em>n'importe quel</em> vecteur du plan de cette façon.", chapter: "vecteur"},
  {front: "Composantes du vecteur \\(\\vec{AB}\\) dans un repère ?", back: "$$\\vec{AB}=\\begin{pmatrix}x_B-x_A\\\\y_B-y_A\\end{pmatrix}$$ Composantes = <strong>arrivée − départ</strong> : la différence des x en haut, la différence des y en bas.", chapter: "vecteur"},
  {front: "Quelle est la forme canonique d'un cercle ?", back: "$$(x - x_0)^2 + (y - y_0)^2 = R^2$$<details class='fc-ex'><summary onclick='event.stopPropagation()'>📝 Exemple chiffré</summary><div class='fc-ex-body'>Centre \\(C(2\\,;-3)\\), rayon \\(R=4\\) → \\((x-2)^2+(y+3)^2=16\\). <em>(On met l'opposé des coordonnées du centre, et \\(R^2\\) à droite.)</em></div></details>", chapter: "cercle"},
  {front: "Quelle est la forme développée d'un cercle ?", back: "$$x^2 + y^2 + ax + by + c = 0$$", chapter: "cercle"},
  {front: "Comment trouver le centre d'un cercle en forme développée ?", back: "$$C\\left(\\frac{-a}{2} ; \\frac{-b}{2}\\right)$$<details class='fc-ex'><summary onclick='event.stopPropagation()'>📝 Exemple chiffré</summary><div class='fc-ex-body'>Pour \\(x^2+y^2-6x+4y-3=0\\) : \\(a=-6,\\ b=4\\) → \\(C\\left(\\tfrac{-(-6)}{2}\\,;\\tfrac{-4}{2}\\right)=C(3\\,;-2)\\).</div></details>", chapter: "cercle"},
  {front: "Condition d'existence d'un cercle ?", back: "$$a^2 + b^2 - 4c > 0$$", chapter: "cercle"},
  {front: "Équation explicite d'une droite ?", back: "$$y = mx + p$$", chapter: "droite"},
  {front: "Équation cartésienne (forme implicite) d'une droite ?", back: "$$ax + by + c = 0$$ On y lit directement le vecteur normal \\(\\vec{n}=(a;b)\\) et le vecteur directeur \\(\\vec{u}=(-b;a)\\).", chapter: "droite"},
  {front: "Condition pour que deux droites soient parallèles ?", back: "$$m_1 = m_2$$ (et $p_1 \\neq p_2$ sinon elles sont confondues)<details class='fc-ex'><summary onclick='event.stopPropagation()'>📝 Exemple chiffré</summary><div class='fc-ex-body'>\\(y=2x+1\\) et \\(y=2x-3\\) : même pente \\(m=2\\) → <strong>parallèles</strong>.</div></details>", chapter: "droite"},
  {front: "Condition pour que deux droites soient perpendiculaires ?", back: "$$m \\cdot m' = -1$$<details class='fc-ex'><summary onclick='event.stopPropagation()'>📝 Exemple chiffré</summary><div class='fc-ex-body'>\\(m=2\\) et \\(m'=-\\tfrac12\\) : \\(2\\times(-\\tfrac12)=-1\\) → <strong>perpendiculaires</strong>.</div></details>", chapter: "droite"},
  {front: "Comment calculer le rayon depuis la forme développée x²+y²+ax+by+c=0 ?", back: "$$R = \\frac{\\sqrt{a^2 + b^2 - 4c}}{2}$$<details class='fc-ex'><summary onclick='event.stopPropagation()'>📝 Exemple chiffré</summary><div class='fc-ex-body'>Pour \\(x^2+y^2-6x+4y-3=0\\) : \\(R=\\tfrac{\\sqrt{(-6)^2+4^2-4(-3)}}{2}=\\tfrac{\\sqrt{36+16+12}}{2}=\\tfrac{\\sqrt{64}}{2}=4\\).</div></details>", chapter: "cercle"},
  {front: "Que se passe-t-il si a²+b²−4c = 0 ?", back: "Un seul point : $C\\left(-\\dfrac{a}{2} ; -\\dfrac{b}{2}\\right)$. Pas de cercle.", chapter: "cercle"},
  {front: "Que se passe-t-il si a²+b²−4c &lt; 0 ?", back: "Impossible — aucun point ne satisfait l'équation.", chapter: "cercle"},
  {front: "Comment passer de la forme développée à la forme canonique ?", back: "On regroupe les x ensemble et les y ensemble, puis on <strong>complète le carré</strong> pour x et pour y séparément.<br><strong>Ex :</strong> \\(x^2+8x \\to (x+4)^2-16\\) (on ajoute \\((\\tfrac{8}{2})^2=16\\) puis on le retire). Pareil pour y.<br>On obtient \\((x-x_0)^2+(y-y_0)^2=R^2\\), qui donne directement le centre et le rayon.", chapter: "cercle"},
  {front: "Un cercle de diamètre [AB] : comment trouver centre et rayon ?", back: "Centre = milieu de [AB] ; $R = \\dfrac{|AB|}{2}$", chapter: "cercle"},
  {front: "Qu'est-ce que le discriminant \\(\\Delta\\) d'une équation du 2nd degré \\(ax^2+bx+c=0\\) ?", back: "$$\\Delta = b^2 - 4ac$$ Il donne le nombre de solutions :<br>• \\(\\Delta>0\\) → <strong>2 solutions</strong><br>• \\(\\Delta=0\\) → <strong>1 solution</strong> (double)<br>• \\(\\Delta<0\\) → <strong>aucune solution réelle</strong>.<br><em>Utile pour l'intersection droite–cercle : 2 → sécante, 1 → tangente, 0 → pas de point commun.</em>", chapter: "cercle"},
  {front: "Formule des solutions de \\(ax^2+bx+c=0\\) (quand \\(\\Delta>0\\)) ?", back: "$$x=\\dfrac{-b\\pm\\sqrt{\\Delta}}{2a}\\qquad(\\Delta=b^2-4ac)$$", chapter: "cercle"},
  {front: "Vecteur directeur de d ≡ ax+by+c=0 ?", back: "$$\\vec{u} = \\begin{pmatrix} -b \\\\ a \\end{pmatrix}$$<details class='fc-ex'><summary onclick='event.stopPropagation()'>📝 Exemple chiffré</summary><div class='fc-ex-body'>Pour \\(3x-4y+1=0\\) : \\(a=3,\\ b=-4\\) → \\(\\vec{u}=\\begin{pmatrix}-b\\\\a\\end{pmatrix}=\\begin{pmatrix}4\\\\3\\end{pmatrix}\\).</div></details>", chapter: "droite"},
  {front: "Vecteur normal de d ≡ ax+by+c=0 ?", back: "$$\\vec{n} = \\begin{pmatrix} a \\\\ b \\end{pmatrix}$$<details class='fc-ex'><summary onclick='event.stopPropagation()'>📝 Exemple chiffré</summary><div class='fc-ex-body'>Pour \\(3x-4y+1=0\\) : \\(\\vec{n}=\\begin{pmatrix}a\\\\b\\end{pmatrix}=\\begin{pmatrix}3\\\\-4\\end{pmatrix}\\).</div></details>", chapter: "droite"},
  {front: "Pente d'une droite ax+by+c=0 ?", back: "$$m = -\\dfrac{a}{b}$$<details class='fc-ex'><summary onclick='event.stopPropagation()'>📝 Exemple chiffré</summary><div class='fc-ex-body'>Pour \\(3x-4y+1=0\\) : \\(m=-\\dfrac{a}{b}=-\\dfrac{3}{-4}=\\dfrac{3}{4}\\).</div></details>", chapter: "droite"},
  {front: "Équation d'une droite passant par un point \\(A(x_A\\,;y_A)\\) avec une pente m ?", back: "On part de \\(y=mx+p\\). On connaît déjà <strong>m</strong> ; on trouve <strong>p</strong> en remplaçant x et y par les coordonnées de A.<br><strong>Ex :</strong> A(1 ; 2), m = 3 → \\(2=3\\times1+p\\) → \\(p=-1\\) → \\(y=3x-1\\).<br><em>(Raccourci pour les plus à l'aise : \\(y-y_A=m(x-x_A)\\).)</em>", chapter: "droite"},
  {front: "Distance du point P(xₚ;yₚ) à la droite ax+by+c=0 ?", back: "$$d = \\frac{|ax_P + by_P + c|}{\\sqrt{a^2 + b^2}}$$<details class='fc-ex'><summary onclick='event.stopPropagation()'>📝 Exemple chiffré</summary><div class='fc-ex-body'>Distance de \\(P(2\\,;1)\\) à \\(3x+4y-5=0\\) : \\(\\dfrac{|3(2)+4(1)-5|}{\\sqrt{3^2+4^2}}=\\dfrac{5}{5}=1\\).</div></details>", chapter: "droite"},
  {front: "Comment trouver l'intersection de deux droites ?", back: "Résoudre le système $y = m_1 x + p_1$ et $y = m_2 x + p_2$.", chapter: "droite"},
  {front: "Comment vérifier qu'un point appartient à un cercle ?", back: "On remplace x et y par les coordonnées du point dans \\((x-x_0)^2+(y-y_0)^2\\) et on regarde le résultat :<br>• <strong>= R²</strong> → le point est <strong>sur</strong> le cercle ✅<br>• <strong>&lt; R²</strong> → à l'intérieur<br>• <strong>&gt; R²</strong> → à l'extérieur", chapter: "cercle"},
  {front: "Distance entre A(x₁,y₁) et B(x₂,y₂) ?", back: "$$d = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}$$<details class='fc-ex'><summary onclick='event.stopPropagation()'>📝 Exemple chiffré</summary><div class='fc-ex-body'>\\(A(1\\,;2)\\), \\(B(4\\,;6)\\) : \\(d=\\sqrt{(4-1)^2+(6-2)^2}=\\sqrt{9+16}=\\sqrt{25}=5\\).</div></details>", chapter: "cercle"},
  {front: "Équation d'un cercle passant par 3 points ?", back: "Substituer les 3 points dans $x^2+y^2+ax+by+c=0$ → système 3×3.", chapter: "cercle"},
  {front: "Norme d'un vecteur \\(\\vec{u}=\\begin{pmatrix}x\\\\y\\end{pmatrix}\\) ?", back: "$$\\|\\vec{u}\\|=\\sqrt{x^2+y^2}$$ Les composantes \\(x\\) et \\(y\\) = de combien le vecteur avance horizontalement et verticalement. Elles forment un <strong>triangle rectangle</strong> dont le vecteur est l'<strong>hypoténuse</strong> → Pythagore : longueur² = \\(x^2+y^2\\).<br><svg viewBox='0 0 190 110' width='185' style='max-width:100%;height:auto;margin-top:6px'><defs><marker id='nmA' markerWidth='7' markerHeight='7' refX='5' refY='3' orient='auto'><path d='M0,0L6,3L0,6z' fill='#a78bfa'/></marker></defs><line x1='22' y1='90' x2='150' y2='90' stroke='#34d399' stroke-width='2.5'/><line x1='150' y1='90' x2='150' y2='28' stroke='#fbbf24' stroke-width='2.5'/><line x1='22' y1='90' x2='150' y2='28' stroke='#a78bfa' stroke-width='2.5' marker-end='url(#nmA)'/><rect x='138' y='78' width='12' height='12' fill='none' stroke='#94a3b8' stroke-width='1'/><text x='80' y='104' fill='#34d399' font-size='12'>x</text><text x='156' y='62' fill='#fbbf24' font-size='12'>y</text><text x='70' y='52' fill='#a78bfa' font-size='12'>‖u‖</text></svg>", chapter: "vecteur"},
  {front: "Distance entre deux points A et B (point à point) ?", back: "$$AB=\\|\\vec{AB}\\|=\\sqrt{(x_B-x_A)^2+(y_B-y_A)^2}$$", chapter: "vecteur"},
  {front: "Test de colinéarité de \\(\\vec{u}=\\begin{pmatrix}x\\\\y\\end{pmatrix}\\) et \\(\\vec{v}=\\begin{pmatrix}x'\\\\y'\\end{pmatrix}\\) ?", back: "Le <strong>déterminant</strong> (ou « produit en croix ») est nul : $$x\\,y' - y\\,x' = 0$$ S'il est nul, les vecteurs sont colinéaires (même direction).", chapter: "vecteur"},
  {front: "Produit scalaire de \\(\\vec{u}=\\begin{pmatrix}x\\\\y\\end{pmatrix}\\) et \\(\\vec{v}=\\begin{pmatrix}x'\\\\y'\\end{pmatrix}\\) ?", back: "$$\\vec{u}\\cdot\\vec{v}=x\\,x'+y\\,y'$$ On multiplie les x entre eux, les y entre eux, puis on additionne (le résultat est un <strong>nombre</strong>, pas un vecteur).", chapter: "vecteur"},
  {front: "Quand deux vecteurs sont-ils orthogonaux (perpendiculaires) ?", back: "Quand leur <strong>produit scalaire est nul</strong> : $$\\vec{u}\\cdot\\vec{v}=x\\,x'+y\\,y'=0$$<br><svg viewBox='0 0 170 100' width='165' style='max-width:100%;height:auto;margin-top:6px'><defs><marker id='orthg' markerWidth='7' markerHeight='7' refX='5' refY='3' orient='auto'><path d='M0,0L6,3L0,6z' fill='#34d399'/></marker><marker id='orthb' markerWidth='7' markerHeight='7' refX='5' refY='3' orient='auto'><path d='M0,0L6,3L0,6z' fill='#60a5fa'/></marker></defs><line x1='30' y1='82' x2='140' y2='82' stroke='#34d399' stroke-width='2.5' marker-end='url(#orthg)'/><text x='96' y='97' fill='#34d399' font-size='11'>u</text><line x1='30' y1='82' x2='30' y2='18' stroke='#60a5fa' stroke-width='2.5' marker-end='url(#orthb)'/><text x='10' y='48' fill='#60a5fa' font-size='11'>v</text><rect x='30' y='70' width='12' height='12' fill='none' stroke='#94a3b8' stroke-width='1'/><text x='66' y='44' fill='#e5e7eb' font-size='11'>u·v = 0</text></svg>", chapter: "vecteur"},  {front: "Comment savoir si un point est dans / sur / hors d'un cercle ?", back: "On calcule \\(d(P,C)\\) = la <strong>distance entre le point P et le centre C</strong> (avec la formule de distance), puis on la compare au rayon R :<br>• \\(d(P,C) &lt; R\\) → <strong>à l'intérieur</strong> (plus près du centre que le bord)<br>• \\(d(P,C) = R\\) → <strong>sur le cercle</strong><br>• \\(d(P,C) &gt; R\\) → <strong>à l'extérieur</strong><br><svg viewBox='0 0 200 150' width='180' style='max-width:100%;height:auto;margin-top:8px'><circle cx='100' cy='80' r='46' fill='none' stroke='#60a5fa' stroke-width='2.5'/><circle cx='100' cy='80' r='3' fill='#e5e7eb'/><text x='104' y='76' fill='#e5e7eb' font-size='11'>C</text><circle cx='86' cy='72' r='3.5' fill='#34d399'/><text x='40' y='66' fill='#34d399' font-size='10'>intérieur</text><circle cx='146' cy='80' r='3.5' fill='#fbbf24'/><text x='150' y='84' fill='#fbbf24' font-size='10'>sur</text><circle cx='176' cy='34' r='3.5' fill='#f87171'/><text x='140' y='26' fill='#f87171' font-size='10'>extérieur</text></svg>", chapter: "cercle"},
  {front: "Pente d'une droite à partir de deux points ?", back: "$$m=\\dfrac{y_B-y_A}{x_B-x_A}$$ (variation des y sur variation des x).", chapter: "droite"}
];

const focusContent = {
  cercle: [
    {title: "Forme canonique", content: "$$(x - x_0)^2 + (y - y_0)^2 = R^2$$", note: "Centre C(x₀ ; y₀), rayon R"},
    {title: "Forme développée", content: "$$x^2 + y^2 + ax + by + c = 0$$", note: "Centre = $\\left(\\frac{-a}{2} ; \\frac{-b}{2}\\right)$, R = $\\frac{\\sqrt{a^2+b^2-4c}}{2}$"},
    {title: "Condition d'existence", content: "$$a^2 + b^2 - 4c > 0$$", note: "Pour un vrai cercle"},
    {title: "Distance point-cercle", content: "$$d(P,C) = \\sqrt{(x_P-x_0)^2 + (y_P-y_0)^2}$$", note: "Si d(P,C) < R : P est à l'intérieur du cercle. Si d(P,C) = R : P est sur le cercle. Si d(P,C) > R : P est à l'extérieur. Cette comparaison détermine la position relative du point."},
    {title: "Cercle par 3 points", content: "Utiliser forme développée", note: "On substitue chaque point dans x²+y²+ax+by+c=0. Cela donne 3 équations à 3 inconnues (a,b,c). On résout le système pour trouver l'équation complète."},
    {title: "Cercle centré à l'origine", content: "$$x^2 + y^2 = R^2$$", note: "Si C(0;0)"},
    {title: "Cercle par diamètre", content: "Centre = milieu de [AB]", note: "R = $\\frac{|AB|}{2}$"},
    {title: "Position point", content: "d &lt; R : intérieur", note: "d &lt; R : le point est à l'intérieur (plus proche du centre que le bord). d = R : le point est exactement sur le cercle. d > R : le point est à l'extérieur du cercle."},
    {title: "Exemple", content: "C(3;-2), R=5", note: "(x-3)² + (y+2)² = 25"},
    {title: "Rappel", content: "Compléter le carré", note: "Pour $x^2+8x$ : ajouter et soustraire $\\left(\\dfrac{8}{2}\\right)^2=16$, ce qui donne $(x+4)^2-16$. Même principe pour $y$. On peut alors lire le centre et le rayon directement."},
    {title: "Rayon — forme développée", content: "$$R = \\frac{\\sqrt{a^2+b^2-4c}}{2}$$", note: "a²+b²−4c doit être > 0"},
    {title: "a²+b²−4c = 0", content: "Un point unique", note: "$C\\left(\\frac{-a}{2} ; \\frac{-b}{2}\\right)$, pas de cercle"},
    {title: "a²+b²−4c &lt; 0", content: "Impossible", note: "Aucun point ne satisfait l'équation"},
    {title: "Forme dév. → canonique", content: "Compléter le carré", note: "En x et en y séparément"},
    {title: "Cercle par diamètre", content: "Centre = milieu [AB]", note: "R = $\\frac{|AB|}{2}$"}
  ],
  droite: [
    {title: "Équation vectorielle", content: "$$\\vec{AP} = k\\vec{u}$$", note: "Paramètre k"},
    {title: "Équations paramétriques", content: "$$\\begin{cases} x = x_A + ku_x \\\\ y = y_A + ku_y \\end{cases}$$", note: "Coordonnées en fonction de k"},
    {title: "Forme implicite", content: "$$ax + by + c = 0$$", note: "$\\vec{n}=(a;b)$, $\\vec{u}=(-b;a)$"},
    {title: "Forme explicite", content: "$$y = mx + p$$", note: "m = pente, p = ordonnée à l'origine"},
    {title: "Pente", content: "$$m = \\frac{y_B-y_A}{x_B-x_A} = \\frac{u_y}{u_x}$$", note: "Variation verticale divisée par variation horizontale"},
    {title: "Parallèles", content: "m = m'", note: "Même pente"},
    {title: "Perpendiculaires", content: "$$m \\cdot m' = -1$$", note: "Pentes inverses et opposées"},
    {title: "Distance point-droite", content: "$$d(P,d) = \\frac{|ax_P+by_P+c|}{\\sqrt{a^2+b^2}}$$", note: "Distance la plus courte"},
    {title: "Exemple", content: "A(1;2), B(3;8)", note: "Pente $m=\\dfrac{8-2}{3-1}=3$. On trouve $p$ en substituant A(1;2) : $2=3\\cdot1+p$ → $p=-1$. Équation finale : $y=3x-1$."},
    {title: "Rappel", content: "$$\\vec{u} = \\begin{pmatrix} -b \\\\ a \\end{pmatrix}$$", note: "Pour la droite 2x+3y-5=0 : a=2, b=3. Vecteur directeur $\\vec{u}=\\begin{pmatrix}-3\\\\2\\end{pmatrix}$. Vecteur normal $\\vec{n}=\\begin{pmatrix}2\\\\3\\end{pmatrix}$. Perpendiculaires : (-3)·2 + 2·3 = 0 ✓"},
    {title: "Vecteur directeur", content: "$$\\vec{u} = \\begin{pmatrix} -b \\\\ a \\end{pmatrix}$$", note: "Pour ax+by+c=0"},
    {title: "Vecteur normal", content: "$$\\vec{n} = \\begin{pmatrix} a \\\\ b \\end{pmatrix}$$", note: "Pour ax+by+c=0"},
    {title: "Pente depuis implicite", content: "$$m = -\\frac{a}{b}$$", note: "Pour ax+by+c=0"},
    {title: "Droite par un point", content: "$$y = mx + p$$", note: "On connaît m ; on trouve p en remplaçant x et y par les coordonnées du point. Ex : A(1;2), m=3 → 2=3·1+p → p=−1 → $y=3x-1$. (Raccourci : $y-y_A=m(x-x_A)$.)"},
    {title: "Distance point-droite", content: "$$d = \\frac{|ax_P+by_P+c|}{\\sqrt{a^2+b^2}}$$", note: "Valeur absolue indispensable !"}
  ]
};

/* ============================================================
   DEMOS — Résolutions animées pas-à-pas (l'expression se transforme
   « sur place »). Chaque frame : latex (la partie qui change est
   colorée), brief (explication courte), more (explication détaillée).
   ============================================================ */
const T = (id, html, cls) => `<span class="atok ${cls || ''}" data-tid="${id}" data-flip-id="${id}">${html}</span>`;
const FRAC = (num, den) => `<span class="afrac"><span class="anum">${num}</span><span class="abar atok" data-tid="bar" data-flip-id="bar"></span><span class="aden">${den}</span></span>`;
// Vraie racine carrée : symbole √ + contenu surmonté d'une barre (vinculum).
// Les tokens passés dans `content` restent animables (chacun garde son data-tid).
const ROOT = (id, content) => `<span class="aroot" data-tid="${id}rt" data-flip-id="${id}rt"><span class="arad"><svg viewBox="0 0 14 24" preserveAspectRatio="none" aria-hidden="true"><path d="M0.8 14 L4 22.5 L7 1.2 L13.5 1.2" fill="none" stroke="currentColor" stroke-width="2" vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round"/></svg></span><span class="arootc">${content}</span></span>`;
// Vecteur colonne (vertical) : deux composantes empilées entre parenthèses. Les tokens passés restent animables.
const VEC = (top, bot) => `<span class="avec"><span class="avecp">(</span><span class="aveccol"><span class="avecrow">${top}</span><span class="avecrow">${bot}</span></span><span class="avecp">)</span></span>`;

let DEMOS = {
  pente: {
    title: "Pente d'une droite par deux points",
    subtitle: "Exemple avec A(1 ; 2) et B(3 ; 8)",
    scenes: [
      {
        brief: "La pente = (différence des y) divisée par (différence des x). On part de la formule générale.",
        eq: T('m', 'm') + T('eq', '=') + FRAC(
          T('yb', 'y<sub>B</sub>') + T('op1', '−') + T('ya', 'y<sub>A</sub>'),
          T('xb', 'x<sub>B</sub>') + T('op2', '−') + T('xa', 'x<sub>A</sub>')
        )
      },
      {
        brief: "On remplace chaque lettre par la valeur du point. Pour B : y = 8 et x = 3. Pour A : y = 2 et x = 1.",
        more: "A(1 ; 2) : son x vaut 1, son y vaut 2. B(3 ; 8) : son x vaut 3, son y vaut 8. Regarde les lettres se transformer en nombres, à la même place.",
        eq: T('m', 'm') + T('eq', '=') + FRAC(
          T('v8', '8') + T('op1', '−') + T('v2', '2'),
          T('v3', '3') + T('op2', '−') + T('v1', '1')
        )
      },
      {
        brief: "On calcule chaque parenthèse : en haut 8 − 2 = 6, en bas 3 − 1 = 2.",
        more: "Les deux soustractions se résorbent en leur résultat : le haut devient 6, le bas devient 2.",
        eq: T('m', 'm') + T('eq', '=') + FRAC(T('n6', '6'), T('d2', '2')),
        merge: [{ from: ['v8', 'op1', 'v2'], to: 'n6' }, { from: ['v3', 'op2', 'v1'], to: 'd2' }]
      },
      {
        brief: "On simplifie la fraction : 6 ÷ 2 = 3. La pente vaut 3 !",
        more: "Une pente de 3 signifie : quand on avance de 1 vers la droite, la droite monte de 3.",
        eq: T('m', 'm') + T('eq', '=') + T('res', '3', 'atok-result'),
        merge: [{ from: ['n6', 'bar', 'd2'], to: 'res' }]
      }
    ]
  },

  milieu: {
    title: "Coordonnées du milieu d'un segment",
    subtitle: "Exemple avec A(2 ; 6) et B(4 ; 2)",
    scenes: [
      {
        brief: "Le milieu M = la moyenne des coordonnées : (xA + xB)/2 pour le x, (yA + yB)/2 pour le y.",
        eq: T('M', 'M') + T('eq', '=') + T('lp', '(') +
          T('lp1', '(') + T('xa', 'x<sub>A</sub>') + T('p1', '+') + T('xb', 'x<sub>B</sub>') + T('rp1', ')') + T('sl1', '/') + T('da', '2') +
          T('sc', ' ; ') +
          T('lp2', '(') + T('ya', 'y<sub>A</sub>') + T('p2', '+') + T('yb', 'y<sub>B</sub>') + T('rp2', ')') + T('sl2', '/') + T('db', '2') +
          T('rp', ')')
      },
      {
        brief: "On remplace par les valeurs : A(2 ; 6) et B(4 ; 2).",
        more: "xA = 2, xB = 4 ; yA = 6, yB = 2. Chaque lettre devient son nombre, à la même place.",
        eq: T('M', 'M') + T('eq', '=') + T('lp', '(') +
          T('lp1', '(') + T('xa', '2') + T('p1', '+') + T('xb', '4') + T('rp1', ')') + T('sl1', '/') + T('da', '2') +
          T('sc', ' ; ') +
          T('lp2', '(') + T('ya', '6') + T('p2', '+') + T('yb', '2') + T('rp2', ')') + T('sl2', '/') + T('db', '2') +
          T('rp', ')')
      },
      {
        brief: "On additionne en haut : 2 + 4 = 6 et 6 + 2 = 8.",
        eq: T('M', 'M') + T('eq', '=') + T('lp', '(') +
          T('s1', '6') + T('sl1', '/') + T('da', '2') +
          T('sc', ' ; ') +
          T('s2', '8') + T('sl2', '/') + T('db', '2') +
          T('rp', ')'),
        merge: [{ from: ['lp1', 'xa', 'p1', 'xb', 'rp1'], to: 's1' }, { from: ['lp2', 'ya', 'p2', 'yb', 'rp2'], to: 's2' }]
      },
      {
        brief: "On divise : 6 ÷ 2 = 3 et 8 ÷ 2 = 4. Le milieu est M(3 ; 4) !",
        more: "Le milieu est pile au centre du segment [AB].",
        eq: T('M', 'M') + T('eq', '=') + T('lp', '(') +
          T('rx', '3', 'atok-result') + T('sc', ' ; ') + T('ry', '4', 'atok-result') + T('rp', ')'),
        merge: [{ from: ['s1', 'sl1', 'da'], to: 'rx' }, { from: ['s2', 'sl2', 'db'], to: 'ry' }]
      }
    ]
  },

  distance_pts: {
    title: "Distance entre deux points",
    subtitle: "Exemple avec A(1 ; 2) et B(4 ; 6)",
    scenes: [
      {
        brief: "La distance AB = la racine de (différence des x)² + (différence des y)². C'est Pythagore.",
        eq: T('d', 'd') + T('eq', '=') + ROOT('r',
          T('lp1', '(') + T('xb', 'x<sub>B</sub>') + T('o1', '−') + T('xa', 'x<sub>A</sub>') + T('rp1', ')') + T('sq1', '²') +
          T('pl', '+') +
          T('lp2', '(') + T('yb', 'y<sub>B</sub>') + T('o2', '−') + T('ya', 'y<sub>A</sub>') + T('rp2', ')') + T('sq2', '²'))
      },
      {
        brief: "On remplace : A(1 ; 2) et B(4 ; 6). Donc xB = 4, xA = 1, yB = 6, yA = 2.",
        more: "Composantes = arrivée − départ. Regarde chaque lettre devenir son nombre.",
        eq: T('d', 'd') + T('eq', '=') + ROOT('r',
          T('lp1', '(') + T('xb', '4') + T('o1', '−') + T('xa', '1') + T('rp1', ')') + T('sq1', '²') +
          T('pl', '+') +
          T('lp2', '(') + T('yb', '6') + T('o2', '−') + T('ya', '2') + T('rp2', ')') + T('sq2', '²'))
      },
      {
        brief: "On calcule les parenthèses : 4 − 1 = 3 et 6 − 2 = 4.",
        eq: T('d', 'd') + T('eq', '=') + ROOT('r',
          T('t3', '3') + T('sq1', '²') + T('pl', '+') + T('t4', '4') + T('sq2', '²')),
        merge: [{ from: ['lp1', 'xb', 'o1', 'xa', 'rp1'], to: 't3' }, { from: ['lp2', 'yb', 'o2', 'ya', 'rp2'], to: 't4' }]
      },
      {
        brief: "On élève au carré : 3² = 9 et 4² = 16.",
        eq: T('d', 'd') + T('eq', '=') + ROOT('r', T('n9', '9') + T('pl', '+') + T('n16', '16')),
        merge: [{ from: ['t3', 'sq1'], to: 'n9' }, { from: ['t4', 'sq2'], to: 'n16' }]
      },
      {
        brief: "On additionne sous la racine : 9 + 16 = 25.",
        eq: T('d', 'd') + T('eq', '=') + ROOT('r', T('n25', '25')),
        merge: [{ from: ['n9', 'pl', 'n16'], to: 'n25' }]
      },
      {
        brief: "Enfin √25 = 5. La distance AB vaut 5 !",
        more: "On cherche le nombre qui, au carré, donne 25 : c'est 5 (car 5 × 5 = 25).",
        eq: T('d', 'd') + T('eq', '=') + T('res', '5', 'atok-result'),
        merge: [{ from: ['rrt', 'n25'], to: 'res' }]
      }
    ]
  },

  colinearite: {
    title: "Colinéarité : le produit en croix",
    subtitle: "u(2 ; 3) et v(4 ; 6) : sont-ils colinéaires ?",
    scenes: [
      {
        brief: "On calcule le « produit en croix » x·y′ − y·x′. S'il vaut 0, les vecteurs sont colinéaires.",
        eq: T('x', 'x') + T('m1', '·') + T('yp', 'y′') + T('o', '−') + T('y', 'y') + T('m2', '·') + T('xp', 'x′')
      },
      {
        brief: "On remplace par les composantes : u(2 ; 3) donne x=2, y=3 ; v(4 ; 6) donne x′=4, y′=6.",
        eq: T('x', '2') + T('m1', '·') + T('yp', '6') + T('o', '−') + T('y', '3') + T('m2', '·') + T('xp', '4')
      },
      {
        brief: "On calcule les produits : 2·6 = 12 et 3·4 = 12.",
        eq: T('p1', '12') + T('o', '−') + T('p2', '12'),
        merge: [{ from: ['x', 'm1', 'yp'], to: 'p1' }, { from: ['y', 'm2', 'xp'], to: 'p2' }]
      },
      {
        brief: "12 − 12 = 0. Le produit en croix est nul → u et v sont COLINÉAIRES (même direction).",
        eq: T('res', '0', 'atok-result'),
        merge: [{ from: ['p1', 'o', 'p2'], to: 'res' }]
      }
    ]
  },

  produit_scalaire: {
    title: "Produit scalaire de deux vecteurs",
    subtitle: "u(3 ; 4) et v(2 ; −1)",
    scenes: [
      {
        brief: "Le produit scalaire = x·x′ + y·y′ (on multiplie les x entre eux, les y entre eux, puis on additionne).",
        eq: T('x', 'x') + T('m1', '·') + T('xp', 'x′') + T('o', '+') + T('y', 'y') + T('m2', '·') + T('yp', 'y′')
      },
      {
        brief: "On remplace : u(3 ; 4) et v(2 ; −1).",
        eq: T('x', '3') + T('m1', '·') + T('xp', '2') + T('o', '+') + T('y', '4') + T('m2', '·') + T('yp', '(−1)')
      },
      {
        brief: "On calcule les produits : 3·2 = 6 et 4·(−1) = −4.",
        eq: T('p1', '6') + T('o', '+') + T('p2', '(−4)'),
        merge: [{ from: ['x', 'm1', 'xp'], to: 'p1' }, { from: ['y', 'm2', 'yp'], to: 'p2' }]
      },
      {
        brief: "6 + (−4) = 2. Le produit scalaire vaut 2. (S'il valait 0, les vecteurs seraient perpendiculaires.)",
        eq: T('res', '2', 'atok-result'),
        merge: [{ from: ['p1', 'o', 'p2'], to: 'res' }]
      }
    ]
  },

  discriminant: {
    title: "Le discriminant Δ",
    subtitle: "Exemple : 2x² + 5x + 3 = 0",
    scenes: [
      {
        brief: "Le discriminant Δ = b² − 4·a·c. Il indique le nombre de solutions.",
        eq: T('D', 'Δ') + T('eq', '=') + T('b2', 'b²') + T('o', '−') + T('four', '4') + T('m1', '·') + T('a', 'a') + T('m2', '·') + T('c', 'c')
      },
      {
        brief: "On lit a = 2, b = 5, c = 3 dans 2x² + 5x + 3.",
        eq: T('D', 'Δ') + T('eq', '=') + T('b2', '5²') + T('o', '−') + T('four', '4') + T('m1', '·') + T('a', '2') + T('m2', '·') + T('c', '3')
      },
      {
        brief: "On calcule : 5² = 25 et 4·2·3 = 24.",
        eq: T('D', 'Δ') + T('eq', '=') + T('n25', '25') + T('o', '−') + T('n24', '24'),
        merge: [{ from: ['b2'], to: 'n25' }, { from: ['four', 'm1', 'a', 'm2', 'c'], to: 'n24' }]
      },
      {
        brief: "Δ = 25 − 24 = 1. Comme Δ > 0, l'équation a DEUX solutions (la parabole coupe l'axe x en 2 points).",
        eq: T('D', 'Δ') + T('eq', '=') + T('res', '1', 'atok-result'),
        merge: [{ from: ['n25', 'o', 'n24'], to: 'res' }]
      }
    ]
  },

  combinaison: {
    title: "Combinaison linéaire : w = a·u + b·v",
    subtitle: "a = 2, b = 3, u(1 ; 2), v(2 ; 1)",
    scenes: [
      {
        brief: "Une combinaison linéaire fabrique un vecteur w = a·u + b·v (un peu de u, un peu de v).",
        eq: T('w', 'w') + T('eq', '=') + T('a', '2') + T('m1', '·') + VEC(T('ux', '1'), T('uy', '2')) + T('pl', '+') + T('bb', '3') + T('m2', '·') + VEC(T('vx', '2'), T('vy', '1'))
      },
      {
        brief: "On multiplie chaque vecteur par son nombre, composante par composante.",
        more: "Ligne du haut (x) : 2·1 et 3·2. Ligne du bas (y) : 2·2 et 3·1.",
        eq: T('w', 'w') + T('eq', '=') + VEC(
          T('ax', '2') + T('mx1', '·') + T('uxx', '1') + T('px', '+') + T('bx', '3') + T('mx2', '·') + T('vxx', '2'),
          T('ay', '2') + T('my1', '·') + T('uyy', '2') + T('py', '+') + T('by', '3') + T('my2', '·') + T('vyy', '1'))
      },
      {
        brief: "On calcule les produits : en haut 2 et 6, en bas 4 et 3.",
        eq: T('w', 'w') + T('eq', '=') + VEC(
          T('cx1', '2') + T('px', '+') + T('cx2', '6'),
          T('cy1', '4') + T('py', '+') + T('cy2', '3')),
        merge: [{ from: ['ax', 'mx1', 'uxx'], to: 'cx1' }, { from: ['bx', 'mx2', 'vxx'], to: 'cx2' }, { from: ['ay', 'my1', 'uyy'], to: 'cy1' }, { from: ['by', 'my2', 'vyy'], to: 'cy2' }]
      },
      {
        brief: "On additionne chaque ligne : 2+6 = 8 (haut) et 4+3 = 7 (bas). Le vecteur w est trouvé !",
        eq: T('w', 'w') + T('eq', '=') + VEC(T('rx', '8', 'atok-result'), T('ry', '7', 'atok-result')),
        merge: [{ from: ['cx1', 'px', 'cx2'], to: 'rx' }, { from: ['cy1', 'py', 'cy2'], to: 'ry' }]
      }
    ]
  },

  distance: {
    title: "Distance d'un point à une droite",
    subtitle: "P(3 ; 4) et la droite d ≡ 2x − y + 1 = 0",
    scenes: [
      {
        brief: "La formule de la distance d'un point P à une droite ax + by + c = 0.",
        eq: T('d','d') + T('eq','=') + FRAC(
          T('absL','|') + T('ta','a') + T('m1','·') + T('txp','x<sub>P</sub>') + T('op1','+') + T('tb','b') + T('m2','·') + T('typ','y<sub>P</sub>') + T('op2','+') + T('tc','c') + T('absR','|'),
          ROOT('r', T('sa','a²') + T('op3','+') + T('sb','b²'))
        )
      },
      {
        brief: "On remplace les lettres par les valeurs : a=2, b=−1, c=1 (la droite) et le point P a pour x = 3, y = 4.",
        more: "On lit a, b, c dans 2x − y + 1 = 0. Regarde chaque lettre se retourner sur sa valeur.",
        eq: T('d','d') + T('eq','=') + FRAC(
          T('absL','|') + T('ta','2') + T('m1','·') + T('txp','3') + T('op1','+') + T('tb','(−1)') + T('m2','·') + T('typ','4') + T('op2','+') + T('tc','1') + T('absR','|'),
          ROOT('r', T('sa','2²') + T('op3','+') + T('sb','(−1)²'))
        )
      },
      {
        brief: "Un carré, c'est le nombre multiplié par lui-même : 2² se déplie en 2·2, et (−1)² en (−1)·(−1).",
        more: "C'est la définition de l'exposant 2. Regarde les carrés se déplier en produits.",
        eq: T('d','d') + T('eq','=') + FRAC(
          T('absL','|') + T('ta','2') + T('m1','·') + T('txp','3') + T('op1','+') + T('tb','(−1)') + T('m2','·') + T('typ','4') + T('op2','+') + T('tc','1') + T('absR','|'),
          ROOT('r', T('e1','2') + T('x1','·') + T('e2','2') + T('op3','+') + T('f1','(−1)') + T('x2','·') + T('f2','(−1)'))
        ),
        split: [{ from: 'sa', to: ['e1','x1','e2'] }, { from: 'sb', to: ['f1','x2','f2'] }]
      },
      {
        brief: "On calcule les produits : 2·3 = 6 et (−1)·4 = −4 en haut ; 2·2 = 4 et (−1)·(−1) = 1 en bas.",
        eq: T('d','d') + T('eq','=') + FRAC(
          T('absL','|') + T('t6','6') + T('op1','+') + T('tm4','(−4)') + T('op2','+') + T('tc','1') + T('absR','|'),
          ROOT('r', T('d4','4') + T('op3','+') + T('d1','1'))
        ),
        merge: [
          { from: ['ta','m1','txp'], to: 't6' },
          { from: ['tb','m2','typ'], to: 'tm4' },
          { from: ['e1','x1','e2'], to: 'd4' },
          { from: ['f1','x2','f2'], to: 'd1' }
        ]
      },
      {
        brief: "On additionne : en haut 6 − 4 + 1 = 3 ; en bas 4 + 1 = 5. La racine devient √5.",
        eq: T('d','d') + T('eq','=') + FRAC(
          T('absL','|') + T('n3','3') + T('absR','|'),
          ROOT('r', T('d5','5'))
        ),
        merge: [
          { from: ['t6','op1','tm4','op2','tc'], to: 'n3' },
          { from: ['d4','op3','d1'], to: 'd5' }
        ]
      },
      {
        brief: "|3| = 3, puis on rationalise (on enlève la racine du bas) : 3/√5 = 3√5/5 ≈ 1,34.",
        more: "Pour rationaliser, on multiplie haut et bas par √5 : (3·√5)/(√5·√5) = 3√5/5.",
        eq: T('d','d') + T('eq','=') + FRAC(T('nr','3√5', 'atok-result'), T('dr','5', 'atok-result')),
        merge: [
          { from: ['absL','n3','absR'], to: 'nr' },
          { from: ['rrt','d5'], to: 'dr' }
        ]
      }
    ]
  },

  cercle_carre: {
    title: "Compléter le carré",
    subtitle: "Cercle : x² + y² − 4x + 6y − 12 = 0 → centre et rayon",
    scenes: [
      {
        brief: "On part de la forme développée d'un cercle. But : retrouver le centre et le rayon.",
        eq: T('x2','x²','tx') + T('pA','+','op') + T('y2','y²','ty') + T('m4x','− 4x','tx') + T('p6y','+ 6y','ty') + T('c12','− 12','tk') + T('eq','=','op') + T('z0','0','op')
      },
      {
        brief: "Pour faire disparaître le −12 à gauche, on ajoute +12 des DEUX côtés.",
        annot: "On ajoute \\(+12\\) à gauche et à droite : l'égalité reste vraie.",
        eq: T('x2','x²','tx') + T('pA','+','op') + T('y2','y²','ty') + T('m4x','− 4x','tx') + T('p6y','+ 6y','ty') + T('c12','− 12','tk') + T('addL','+ 12','tk') + T('eq','=','op') + T('z0','0','op') + T('addR','+ 12','tk')
      },
      {
        brief: "À gauche, −12 et +12 s'annulent. À droite, 0 + 12 = 12.",
        annot: "\\(-12+12=0\\) à gauche  •  \\(0+12=12\\) à droite",
        eq: T('x2','x²','tx') + T('pA','+','op') + T('y2','y²','ty') + T('m4x','− 4x','tx') + T('p6y','+ 6y','ty') + T('eq','=','op') + T('c12b','12','tk'),
        annihilate: [['c12','addL']],
        merge: [{ from: ['z0','addR'], to: 'c12b' }]
      },
      {
        brief: "On regroupe les termes en x, puis les termes en y.",
        eq: T('lp1','(','op') + T('x2','x²','tx') + T('m4x','− 4x','tx') + T('rp1',')','op') + T('pA','+','op') + T('lp2','(','op') + T('y2','y²','ty') + T('p6y','+ 6y','ty') + T('rp2',')','op') + T('eq','=','op') + T('c12b','12','tk')
      },
      {
        brief: "Pour faire un carré avec x² − 4x, il faut un +4. On l'ajoute… et on le retire pour ne rien changer.",
        annot: "\\((x-2)^2 = x^2 - 4x + \\mathbf{4}\\)  →  moitié de \\(-4\\) = \\(-2\\)",
        eq: T('lp1','(','op') + T('x2','x²','tx') + T('m4x','− 4x','tx') + T('p4','+ 4','tk') + T('m4','− 4','tk') + T('rp1',')','op') + T('pA','+','op') + T('lp2','(','op') + T('y2','y²','ty') + T('p6y','+ 6y','ty') + T('rp2',')','op') + T('eq','=','op') + T('c12b','12','tk')
      },
      {
        brief: "x² − 4x + 4 se factorise en (x−2)². Le −4 reste à côté.",
        annot: "\\(x^2 - 4x + 4 = (x-2)^2\\)",
        eq: T('gx','(x−2)²','tx') + T('m4','− 4','tk') + T('pA','+','op') + T('lp2','(','op') + T('y2','y²','ty') + T('p6y','+ 6y','ty') + T('rp2',')','op') + T('eq','=','op') + T('c12b','12','tk'),
        merge: [{ from: ['lp1','x2','m4x','p4','rp1'], to: 'gx' }]
      },
      {
        brief: "Même technique pour y : il faut un +9. On ajoute +9 et on retire −9.",
        annot: "\\((y+3)^2 = y^2 + 6y + \\mathbf{9}\\)  →  moitié de \\(+6\\) = \\(+3\\)",
        eq: T('gx','(x−2)²','tx') + T('m4','− 4','tk') + T('pA','+','op') + T('lp2','(','op') + T('y2','y²','ty') + T('p6y','+ 6y','ty') + T('p9','+ 9','tk') + T('m9','− 9','tk') + T('rp2',')','op') + T('eq','=','op') + T('c12b','12','tk')
      },
      {
        brief: "y² + 6y + 9 se factorise en (y+3)². Le −9 reste à côté.",
        annot: "\\(y^2 + 6y + 9 = (y+3)^2\\)",
        eq: T('gx','(x−2)²','tx') + T('m4','− 4','tk') + T('pA','+','op') + T('gy','(y+3)²','ty') + T('m9','− 9','tk') + T('eq','=','op') + T('c12b','12','tk'),
        merge: [{ from: ['lp2','y2','p6y','p9','rp2'], to: 'gy' }]
      },
      {
        brief: "On ajoute +4 et +9 des deux côtés pour faire disparaître les −4 et −9 à gauche.",
        annot: "On ajoute \\(+4\\) et \\(+9\\) des deux côtés.",
        eq: T('gx','(x−2)²','tx') + T('m4','− 4','tk') + T('aL4','+ 4','tadd') + T('pA','+','op') + T('gy','(y+3)²','ty') + T('m9','− 9','tk') + T('aL9','+ 9','tadd') + T('eq','=','op') + T('c12b','12','tk') + T('aR4','+ 4','tadd') + T('aR9','+ 9','tadd')
      },
      {
        brief: "À gauche, les opposés s'annulent : −4+4 = 0 et −9+9 = 0. Il ne reste que les carrés.",
        annot: "\\(-4+4=0\\)  et  \\(-9+9=0\\)",
        eq: T('gx','(x−2)²','tx') + T('pA','+','op') + T('gy','(y+3)²','ty') + T('eq','=','op') + T('c12b','12','tk') + T('aR4','+ 4','tk') + T('aR9','+ 9','tk'),
        annihilate: [['m4','aL4'], ['m9','aL9']]
      },
      {
        brief: "À droite, on additionne : 12 + 4 + 9 = 25.",
        annot: "\\(12 + 4 + 9 = 25\\)",
        eq: T('gx','(x−2)²','tx') + T('pA','+','op') + T('gy','(y+3)²','ty') + T('eq','=','op') + T('r25','25','atok-result'),
        merge: [{ from: ['c12b','aR4','aR9'], to: 'r25' }]
      },
      {
        brief: "On compare à la forme canonique : le centre se lit directement, et le rayon est la racine de 25.",
        annot: "\\((x-x_0)^2+(y-y_0)^2=R^2\\)  →  \\(x_0=2,\\ y_0=-3,\\ R=\\sqrt{25}=5\\)",
        eq: T('gx','(x−2)²','tx') + T('pA','+','op') + T('gy','(y+3)²','ty') + T('eq','=','op') + T('r25','25','atok-result')
      },
      {
        brief: "Donc le centre est C(2 ; −3) et le rayon R = 5.",
        annot: "Attention : \\((y+3)^2=(y-(-3))^2\\), donc \\(y_0=-3\\).",
        eq: T('cen','Centre C(2 ; −3)','atok-result') + T('sep','     ','op') + T('rr','R = 5','atok-result'),
        merge: [{ from: ['gx','pA','gy','eq','r25'], to: 'cen' }],
        draw: { h: 2, k: -3, r: 5 }
      }
    ]
  },

  // Démo GÉOMÉTRIQUE « pourquoi on ajoute (b/2)² » — modèle des aires, sans texte dans l'image.
  cercle_carre_geo: {
    type: 'geo', geo: 'square',
    title: "Compléter le carré — en images",
    subtitle: "Pourquoi ajoute-t-on (b/2)² ? On le VOIT : x² + 6x → (x+3)²",
    scenes: [
      { phase: 'square', brief: "Voici le carré x² : un carré de côté x.",
        annot: "Aire du carré \\(= x \\times x = x^2\\)." },
      { phase: 'addbar', brief: "On ajoute 6x : une bande de hauteur x et de largeur 6, collée au carré.",
        annot: "Aire de la bande \\(= 6 \\times x = 6x\\)." },
      { phase: 'split', brief: "On coupe la bande 6x en deux moitiés de 3x, et on en fait glisser une sous le carré.",
        annot: "\\(6x = 3x + 3x\\) — on répartit la moitié en bas." },
      { phase: 'hole', brief: "En forme de L, il manque un petit carré dans le coin pour compléter le grand carré.",
        annot: "Le côté manquant est \\(\\tfrac{6}{2}=3\\) → le trou est un carré \\(3 \\times 3\\)." },
      { phase: 'fill', brief: "On comble le trou avec ce carré manquant : 3 × 3 = 9. C'est CE nombre qu'on ajoute.",
        annot: "On ajoute \\(\\left(\\tfrac{6}{2}\\right)^2 = 3^2 = 9\\)." },
      { phase: 'done', brief: "Le grand carré est complet : son côté est x + 3, donc son aire est (x+3)².",
        annot: "\\(x^2 + 6x + 9 = (x+3)^2\\)" }
    ]
  },

  // ── VERSION MIXTE : calcul animé (gauche) + dessin du carré/cercle (droite) ──
  cercle_carre_combo: {
    type: 'combo',
    title: "Compléter le carré — calcul + dessin",
    subtitle: "Cercle : x² + y² − 4x + 6y − 12 = 0  →  on voit le calcul ET le carré se construire",
    scenes: [
      {
        brief: "On part de la forme développée d'un cercle. But : retrouver le centre et le rayon.",
        sq: {},
        eq: T('x2','x²','tx') + T('pA','+','op') + T('y2','y²','ty') + T('m4x','− 4x','tx') + T('p6y','+ 6y','ty') + T('c12','− 12','tk') + T('eq','=','op') + T('z0','0','op')
      },
      {
        brief: "Pour faire passer le −12 à droite, on ajoute +12 des DEUX côtés (il tombe du haut, en rouge).",
        annot: "On ajoute l'opposé \\(+12\\) à gauche et à droite : l'égalité reste vraie.",
        sq: {},
        eq: T('x2','x²','tx') + T('pA','+','op') + T('y2','y²','ty') + T('m4x','− 4x','tx') + T('p6y','+ 6y','ty') + T('c12','− 12','tk') + T('addL','+ 12','tadd') + T('eq','=','op') + T('z0','0','op') + T('addR','+ 12','tadd')
      },
      {
        brief: "À gauche, −12 et +12 se percutent et s'annulent (→ 0). À droite, 0 + 12 = 12.",
        annot: "\\(-12+12=0\\) à gauche  •  \\(0+12=12\\) à droite",
        sq: {},
        eq: T('x2','x²','tx') + T('pA','+','op') + T('y2','y²','ty') + T('m4x','− 4x','tx') + T('p6y','+ 6y','ty') + T('eq','=','op') + T('c12b','12','tk'),
        annihilate: [['c12','addL']],
        merge: [{ from: ['z0','addR'], to: 'c12b' }]
      },
      {
        brief: "On regroupe les termes en x (bleu), puis les termes en y (vert).",
        sq: {},
        eq: T('lp1','(','op') + T('x2','x²','tx') + T('m4x','− 4x','tx') + T('rp1',')','op') + T('pA','+','op') + T('lp2','(','op') + T('y2','y²','ty') + T('p6y','+ 6y','ty') + T('rp2',')','op') + T('eq','=','op') + T('c12b','12','tk')
      },
      {
        brief: "Pour faire un carré avec x² − 4x, il manque un +4 (le petit coin à droite du dessin). On l'ajoute… et on le retire.",
        annot: "Formule : \\(x^2+bx=\\left(x+\\tfrac{b}{2}\\right)^2-\\left(\\tfrac{b}{2}\\right)^2\\)<br>Ici \\(b=-4\\) : \\(\\left(\\tfrac{b}{2}\\right)^2=(-2)^2=\\mathbf{4}\\)",
        sq: { pic: 'x' },
        eq: T('lp1','(','op') + T('x2','x²','tx') + T('m4x','− 4x','tx') + T('p4','+ 4','tadd') + T('m4','− 4','tk') + T('rp1',')','op') + T('pA','+','op') + T('lp2','(','op') + T('y2','y²','ty') + T('p6y','+ 6y','ty') + T('rp2',')','op') + T('eq','=','op') + T('c12b','12','tk')
      },
      {
        brief: "x² − 4x + 4 se factorise en (x−2)² : c'est l'aire du carré complet à droite. Le −4 reste à côté.",
        annot: "\\(x^2 - 4x + 4 = (x-2)^2\\)",
        sq: { pic: 'x' },
        eq: T('gx','(x−2)²','tx') + T('m4','− 4','tk') + T('pA','+','op') + T('lp2','(','op') + T('y2','y²','ty') + T('p6y','+ 6y','ty') + T('rp2',')','op') + T('eq','=','op') + T('c12b','12','tk'),
        merge: [{ from: ['lp1','x2','m4x','p4','rp1'], to: 'gx' }]
      },
      {
        brief: "Même technique pour y : il manque un +9 (le coin du carré vert). On ajoute +9 et on retire −9.",
        annot: "Même formule \\(\\left(\\tfrac{b}{2}\\right)^2\\) avec \\(b=+6\\) : \\(\\left(\\tfrac{6}{2}\\right)^2=3^2=\\mathbf{9}\\)",
        sq: { pic: 'y' },
        eq: T('gx','(x−2)²','tx') + T('m4','− 4','tk') + T('pA','+','op') + T('lp2','(','op') + T('y2','y²','ty') + T('p6y','+ 6y','ty') + T('p9','+ 9','tadd') + T('m9','− 9','tk') + T('rp2',')','op') + T('eq','=','op') + T('c12b','12','tk')
      },
      {
        brief: "y² + 6y + 9 se factorise en (y+3)² : le carré vert est complet. Le −9 reste à côté.",
        annot: "\\(y^2 + 6y + 9 = (y+3)^2\\)",
        sq: { pic: 'y' },
        eq: T('gx','(x−2)²','tx') + T('m4','− 4','tk') + T('pA','+','op') + T('gy','(y+3)²','ty') + T('m9','− 9','tk') + T('eq','=','op') + T('c12b','12','tk'),
        merge: [{ from: ['lp2','y2','p6y','p9','rp2'], to: 'gy' }]
      },
      {
        brief: "On ajoute +4 et +9 des deux côtés (en rouge) pour faire disparaître les −4 et −9 à gauche.",
        annot: "On ajoute \\(+4\\) et \\(+9\\) des deux côtés.",
        sq: { pic: 'y' },
        eq: T('gx','(x−2)²','tx') + T('m4','− 4','tk') + T('aL4','+ 4','tadd') + T('pA','+','op') + T('gy','(y+3)²','ty') + T('m9','− 9','tk') + T('aL9','+ 9','tadd') + T('eq','=','op') + T('c12b','12','tk') + T('aR4','+ 4','tadd') + T('aR9','+ 9','tadd')
      },
      {
        brief: "À gauche tout s'annule (−4+4=0, −9+9=0). À droite : 12 + 4 + 9 = 25.",
        annot: "\\(12 + 4 + 9 = 25\\)",
        sq: {},
        eq: T('gx','(x−2)²','tx') + T('pA','+','op') + T('gy','(y+3)²','ty') + T('eq','=','op') + T('r25','25','atok-result'),
        annihilate: [['m4','aL4'], ['m9','aL9']],
        merge: [{ from: ['c12b','aR4','aR9'], to: 'r25' }]
      },
      {
        brief: "On compare à la forme canonique : le centre se lit directement, le rayon est la racine de 25.",
        annot: "Formule du cercle : \\((x-x_0)^2+(y-y_0)^2=R^2\\)<br>→ \\(x_0=2,\\ y_0=-3,\\ R=\\sqrt{25}=5\\)",
        sq: { pic: 'circle' },
        eq: T('gx','(x−2)²','tx') + T('pA','+','op') + T('gy','(y+3)²','ty') + T('eq','=','op') + T('r25','25','atok-result')
      },
      {
        brief: "Le résultat est un CERCLE : centre C(2 ; −3) et rayon R = 5. Le carré n'était qu'une astuce de calcul !",
        annot: "Attention : \\((y+3)^2=(y-(-3))^2\\), donc \\(y_0=-3\\).",
        sq: { pic: 'circle' },
        eq: T('cen','Centre C(2 ; −3)','atok-result') + T('sep','     ','op') + T('rr','R = 5','atok-result'),
        merge: [{ from: ['gx','pA','gy','eq','r25'], to: 'cen' }]
      }
    ]
  },


};
