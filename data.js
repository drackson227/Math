/* ============================================================
   data.js — Données statiques de l'application Maths GR2
   Ce fichier NE CHANGE JAMAIS → ne pas envoyer à Claude
   ============================================================ */

const allQuestions = [
  {q: "Que représente le vecteur \\(\\vec{AB}\\) ?", opts: ["La translation qui amène A sur B", "Le segment [AB]", "La droite (AB)", "Le milieu de [AB]"], ans: 0, chapter: "vecteur", difficulty: "facile", exp: "Un vecteur \\(\\vec{AB}\\) représente la translation de A vers B (segment orienté)."},
  {q: "Relation de Chasles : \\(\\vec{AB}+\\vec{BC}\\) = ?", opts: ["\\(\\vec{AC}\\)", "\\(\\vec{CA}\\)", "\\(\\vec{BA}\\)", "\\(\\vec{AB}\\)"], ans: 0, chapter: "vecteur", difficulty: "facile",
    exp: "\\(\\vec{AB}+\\vec{BC}=\\vec{AC}\\) : l'extrémité du 1er (B) est l'origine du 2e (B), elles s'« annulent », il reste le tout premier départ (A) et la toute dernière arrivée (C).",
    formula: "\\(\\vec{AB}+\\vec{BC}=\\vec{AC}\\)  (relation de Chasles)",
    simple: "Imagine que tu marches de A à B, puis de B à C. Au total, tu es allé de A à C, peu importe le détour par B. C'est tout ce que dit Chasles : on garde le premier point et le dernier."},
  {q: "\\(\\vec{AB}+\\vec{BC}+\\vec{CD}\\) = ?", opts: ["\\(\\vec{AD}\\)", "\\(\\vec{DA}\\)", "\\(\\vec{AC}\\)", "\\(\\vec{BD}\\)"], ans: 0, chapter: "vecteur", difficulty: "intermediaire", exp: "Chasles bout à bout : on garde la 1re origine et la dernière extrémité → \\(\\vec{AD}\\)."},
  {q: "Le vecteur opposé de \\(\\vec{AB}\\) est :", opts: ["\\(\\vec{BA}\\)", "\\(\\vec{AB}\\)", "\\(\\vec{0}\\)", "\\(\\vec{AC}\\)"], ans: 0, chapter: "vecteur", difficulty: "facile", exp: "\\(-\\vec{AB}=\\vec{BA}\\) : même direction et norme, sens opposé."},
  {q: "Que vaut \\(\\vec{AA}\\) ?", opts: ["\\(\\vec{0}\\) (vecteur nul)", "1", "Le point A", "\\(\\vec{AB}\\)"], ans: 0, chapter: "vecteur", difficulty: "facile", exp: "Origine = extrémité, donc \\(\\vec{AA}=\\vec{0}\\)."},
  {q: "La différence \\(\\vec{u}-\\vec{v}\\) est égale à :", opts: ["\\(\\vec{u}+(-\\vec{v})\\)", "\\(\\vec{u}+\\vec{v}\\)", "\\(\\vec{v}-\\vec{u}\\)", "\\(\\vec{0}\\)"], ans: 0, chapter: "vecteur", difficulty: "facile", exp: "Soustraire = ajouter l'opposé : \\(\\vec{u}-\\vec{v}=\\vec{u}+(-\\vec{v})\\)."},
  {q: "La norme du vecteur \\(k\\,\\vec{v}\\) (k réel) vaut :", opts: ["\\(|k|\\cdot\\|\\vec{v}\\|\\)", "\\(k\\cdot\\|\\vec{v}\\|\\)", "\\(\\|\\vec{v}\\|\\)", "\\(k^2\\,\\|\\vec{v}\\|\\)"], ans: 0, chapter: "vecteur", difficulty: "intermediaire",
    exp: "\\(\\|k\\,\\vec{v}\\|=|k|\\cdot\\|\\vec{v}\\|\\) : on multiplie la longueur par la <strong>valeur absolue</strong> de k.",
    formula: "\\(\\|k\\,\\vec{v}\\|=|k|\\cdot\\|\\vec{v}\\|\\)",
    simple: "La norme, c'est la longueur du vecteur. Si tu multiplies un vecteur par 3, il devient 3 fois plus long. Si tu le multiplies par −3, il fait demi-tour mais reste aussi 3 fois plus long — une longueur est toujours positive, d'où la valeur absolue \\(|k|\\)."},
  {q: "Si \\(k<0\\), le vecteur \\(k\\,\\vec{v}\\) a :", opts: ["la même direction que \\(\\vec{v}\\), mais le sens opposé", "le même sens que \\(\\vec{v}\\)", "une direction perpendiculaire à \\(\\vec{v}\\)", "une norme nulle"], ans: 0, chapter: "vecteur", difficulty: "intermediaire", exp: "Multiplier par un réel négatif inverse le sens, mais garde la direction."},
  {q: "Deux vecteurs non nuls \\(\\vec{u}\\) et \\(\\vec{v}\\) sont colinéaires si :", opts: ["il existe un réel non nul k tel que \\(\\vec{u}=k\\,\\vec{v}\\)", "\\(\\vec{u}+\\vec{v}=\\vec{0}\\)", "\\(\\|\\vec{u}\\|=\\|\\vec{v}\\|\\)", "ils ont la même origine"], ans: 0, chapter: "vecteur", difficulty: "facile", exp: "Colinéaires ⟺ \\(\\vec{u}=k\\,\\vec{v}\\) : ils ont la même direction."},
  {q: "Les points A, B, C sont alignés si :", opts: ["\\(\\vec{AB}\\) et \\(\\vec{AC}\\) sont colinéaires", "\\(\\vec{AB}=\\vec{AC}\\)", "\\(\\|\\vec{AB}\\|=\\|\\vec{AC}\\|\\)", "\\(\\vec{AB}+\\vec{AC}=\\vec{0}\\)"], ans: 0, chapter: "vecteur", difficulty: "intermediaire", exp: "Alignés ⟺ \\(\\vec{AB}=k\\,\\vec{AC}\\) (colinéaires)."},
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
  {q: "Pour x²+y²+6x−4y−3=0, que vaut a²+b²−4c ?", opts: ["36+16+12 = 64", "36+16−12 = 40", "−6+4+3 = 1", "0"], ans: 0, chapter: "cercle", difficulty: "intermediaire", exp: "a=6, b=−4, c=−3. −4c = −4×(−3) = +12. Donc 36+16+12 = 64."},
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
  {q: "Pour déterminer si un point est sur un cercle, on calcule :", opts: ["La distance du point au centre", "L'aire du cercle", "Le périmètre", "Le diamètre"], ans: 0, chapter: "cercle", difficulty: "facile", exp: "On calcule \\(d(P,C) = \\sqrt{(x_P-x_0)^2 + (y_P-y_0)^2}\\) : la distance entre le point P et le centre C."},
  {q: "Si d(P,C) < R, le point P est :", opts: ["À l'intérieur du cercle", "Sur le cercle", "À l'extérieur du cercle", "Au centre"], ans: 0, chapter: "cercle", difficulty: "facile",
    exp: "\\(d(P,C)\\) est la distance entre le point P et le centre C. Si elle est <strong>plus petite que le rayon</strong>, P est plus proche du centre que le bord : il est à l'<strong>intérieur</strong>.",
    formula: "\\(d(P,C)<R\\) : intérieur · \\(=R\\) : sur le cercle · \\(>R\\) : extérieur",
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
  {q: "Le sommet d'une parabole de foyer F(2;6) et directrice y=2 est :", opts: ["S(2;4)", "S(2;8)", "S(4;2)", "S(2;2)"], ans: 0, chapter: "parabole", difficulty: "intermediaire",
    exp: "Le sommet est <strong>pile au milieu</strong> entre le foyer et la directrice.<br>Le foyer est en hauteur \\(y=6\\), la directrice en hauteur \\(y=2\\).<br>\\(y_S=\\dfrac{6+2}{2}=4\\)<br>Le sommet garde le même x que le foyer : \\(x_S=2\\).<br>Donc \\(S(2\\,;\\,4)\\).",
    formula: "\\(y_S=\\dfrac{y_F + k}{2}\\)  (k = hauteur de la directrice)  ·  \\(x_S=x_F\\)",
    simple: "Imagine le foyer (un point) et la directrice (une ligne horizontale). Le sommet de la parabole est juste <strong>au milieu</strong> des deux, à mi-hauteur. Le foyer est à 6, la ligne à 2 : le milieu est à \\((6+2)/2=4\\). Et le sommet est droit en dessous du foyer, donc même x."},
  {q: "Pour une parabole de sommet S(−1;3) et directrice y=1, le foyer est :", opts: ["F(−1;5)", "F(−1;1)", "F(1;5)", "F(−1;−1)"], ans: 0, chapter: "parabole", difficulty: "intermediaire",
    exp: "Le sommet est au milieu du foyer et de la directrice. On connaît le sommet (\\(y=3\\)) et la directrice (\\(y=1\\)), on cherche le foyer.<br>Distance sommet → directrice : \\(3-1=2\\).<br>Le foyer est à la même distance, mais de l'autre côté du sommet :<br>\\(y_F=3+2=5\\)<br>Même x que le sommet : \\(x_F=-1\\).<br>Donc \\(F(-1\\,;\\,5)\\).",
    formula: "\\(y_F = 2\\,y_S - k\\)  (le foyer est le symétrique de la directrice par rapport au sommet)  ·  \\(x_F=x_S\\)",
    simple: "Le sommet est <strong>pile au milieu</strong> entre la directrice (la ligne) et le foyer (le point). Donc le foyer est aussi loin du sommet que la ligne, mais de l'<strong>autre côté</strong>. La ligne est 2 crans en dessous du sommet (3 → 1), donc le foyer est 2 crans au-dessus : \\(3+2=5\\). On dit que le foyer est le « symétrique » de la directrice par rapport au sommet = son reflet de l'autre côté."},
  {q: "Dans f(x) = A(x−α)² + β, le sommet est :", opts: ["S(α ; β)", "S(−α ; β)", "S(α ; −β)", "S(−α ; −β)"], ans: 0, chapter: "parabole", difficulty: "facile",
    exp: "La forme canonique \\(f(x)=A(x-\\alpha)^2+\\beta\\) donne le sommet <strong>directement</strong> : \\(S(\\alpha\\,;\\,\\beta)\\). Attention : dans \\((x-\\alpha)\\), le \\(\\alpha\\) est ce qu'on <strong>soustrait</strong> à x.",
    formula: "\\(f(x)=A(x-\\alpha)^2+\\beta \\Rightarrow S(\\alpha\\,;\\,\\beta)\\)",
    simple: "C'est l'avantage de la forme canonique : le sommet se lit sans calcul. Le nombre dans la parenthèse (avec son signe inversé) donne le x du sommet, et le nombre tout seul donne le y. Ex : \\((x-3)^2+5\\) → sommet (3 ; 5)."},
  {q: "Si A > 0 dans f(x) = A(x−α)² + β, la parabole :", opts: ["S'ouvre vers le haut", "S'ouvre vers le bas", "Est horizontale", "Est verticale"], ans: 0, chapter: "parabole", difficulty: "facile",
    exp: "Le signe de A donne le sens d'ouverture. \\(A>0\\) → la parabole <strong>s'ouvre vers le haut</strong> (comme un bol).",
    formula: "\\(A>0\\) → vers le haut 🙂  ·  \\(A<0\\) → vers le bas 🙁",
    simple: "Regarde juste le signe du nombre A devant. Positif → la parabole sourit (vers le haut). Négatif → elle fait la moue (vers le bas)."},
  {q: "L'axe de symétrie d'une parabole de foyer F(a;b) est :", opts: ["La droite x = a", "La droite y = b", "La droite x = b", "La droite y = a"], ans: 0, chapter: "parabole", difficulty: "facile",
    exp: "L'axe de symétrie est la droite <strong>verticale</strong> \\(x=a\\) (a = abscisse du foyer). La parabole est symétrique de part et d'autre de cette droite.",
    formula: "Axe de symétrie : \\(x=a\\)  (= abscisse du foyer et du sommet)",
    simple: "Imagine plier la parabole en deux : le pli est une droite verticale qui passe par le foyer et le sommet. Comme elle est verticale, son équation est « x = un nombre », ici \\(x=a\\)."},
  {q: "Le sommet est toujours à mi-chemin entre :", opts: ["Le foyer et la directrice", "Deux foyers", "Deux directrices", "L'origine et le foyer"], ans: 0, chapter: "parabole", difficulty: "facile",
    exp: "Le sommet est le point de la parabole le plus proche de la directrice ; il est <strong>équidistant</strong> du foyer et de la directrice, donc pile au milieu des deux.",
    formula: "Sommet = milieu entre foyer F et directrice",
    demo: "parabole_geo",
    simple: "Une parabole a un point (le foyer) et une ligne (la directrice). Le sommet est juste au milieu des deux. C'est le point « bas » (ou « haut ») de la courbe."},
  {q: "L'équation cartésienne d'une parabole vient de :", opts: ["distance(P,F) = distance(P,d)", "distance(P,F) = 2·distance(P,d)", "distance(P,F) + distance(P,d) = 0", "distance(P,F) × distance(P,d) = 1"], ans: 0, chapter: "parabole", difficulty: "intermediaire",
    exp: "<strong>Définition</strong> de la parabole : l'ensemble des points P aussi loin du foyer F que de la directrice d. On écrit \\(\\text{dist}(P,F)=\\text{dist}(P,d)\\), puis on développe pour obtenir l'équation.",
    formula: "\\(\\text{dist}(P,F)=\\text{dist}(P,\\text{directrice})\\)",
    demo: "parabole_geo",
    simple: "Une parabole, c'est tous les points qui sont à égale distance d'un point (le foyer) et d'une ligne (la directrice). Cette idée d'égalité, c'est ce qui donne l'équation. Regarde l'animation : un point glisse et les deux distances restent égales."},
  {q: "Pour f(x) = 2(x−3)² + 5, le sommet est :", opts: ["S(3 ; 5)", "S(−3 ; 5)", "S(3 ; −5)", "S(−3 ; −5)"], ans: 0, chapter: "parabole", difficulty: "facile",
    exp: "On lit dans \\(f(x)=A(x-\\alpha)^2+\\beta\\) :<br>\\(\\alpha=3\\) (signe inversé dans la parenthèse)<br>\\(\\beta=5\\)<br>Donc \\(S(3\\,;\\,5)\\).",
    formula: "\\(f(x)=A(x-\\alpha)^2+\\beta \\Rightarrow S(\\alpha\\,;\\,\\beta)\\)",
    simple: "Le sommet se lit direct : le nombre dans la parenthèse avec le signe inversé (\\(x-3\\) → 3), et le nombre tout seul (5). Le 2 devant ne change pas le sommet, juste l'ouverture."},
  {q: "Pour f(x) = 2(x−3)² + 5, l'ouverture est :", opts: ["Vers le haut (A > 0)", "Vers le bas (A > 0)", "Vers la gauche", "Vers la droite"], ans: 0, chapter: "parabole", difficulty: "facile",
    exp: "Le nombre devant est \\(A=2>0\\), donc la parabole <strong>s'ouvre vers le haut</strong>.",
    formula: "\\(A>0\\) → vers le haut  ·  \\(A<0\\) → vers le bas",
    simple: "Tu regardes le signe du 2 devant la parenthèse : positif → vers le haut (un bol qui sourit)."},
  {q: "La relation entre A et les paramètres foyer/directrice est :", opts: ["\\(A = \\dfrac{1}{2(b-k)}\\)", "\\(A = 2(b-k)\\)", "\\(A = \\dfrac{b-k}{2}\\)", "\\(A = b-k\\)"], ans: 0, chapter: "parabole", difficulty: "difficile",
    exp: "La relation qui lie le coefficient A au foyer F(a ; b) et à la directrice y = k est :<br>\\(A = \\dfrac{1}{2(b-k)}\\)<br>(\\(b-k\\) = écart vertical entre le foyer et la directrice).",
    formula: "\\(A = \\dfrac{1}{2(b-k)}\\)  ·  F(a;b), directrice y=k",
    simple: "Plus le foyer et la directrice sont proches, plus la parabole est « serrée » (A grand). Cette formule relie les deux : A dépend de l'écart \\(b-k\\) entre la hauteur du foyer et celle de la directrice."},
  {q: "Si le sommet est S(α;β) et la directrice y=k, le foyer est :", opts: ["F(α ; 2β−k)", "F(α ; β−k)", "F(α ; k)", "F(2α ; β)"], ans: 0, chapter: "parabole", difficulty: "intermediaire",
    exp: "Le sommet est au milieu du foyer et de la directrice. Le foyer est donc le <strong>symétrique de la directrice</strong> par rapport au sommet :<br>\\(y_F = 2\\beta - k\\)<br>et même abscisse : \\(x_F=\\alpha\\). Donc \\(F(\\alpha\\,;\\,2\\beta-k)\\).",
    formula: "\\(F(\\alpha\\,;\\,2\\beta-k)\\)  (symétrique de la directrice / sommet)",
    simple: "Le sommet est pile au milieu entre la ligne (directrice, hauteur k) et le point (foyer). Le foyer est donc « de l'autre côté » du sommet, à la même distance. La formule \\(2\\beta-k\\) calcule ce reflet : on part de la hauteur du sommet et on ajoute l'écart."},
  {q: "Si le sommet est S(α;β) et le foyer F(a;b), la directrice est :", opts: ["y = 2β−b", "y = β−b", "y = b", "y = 2b−β"], ans: 0, chapter: "parabole", difficulty: "intermediaire",
    exp: "Symétrie inverse de la question précédente : la <strong>directrice est le symétrique du foyer</strong> par rapport au sommet :<br>\\(y = 2\\beta - b\\).",
    formula: "Directrice : \\(y = 2\\beta - b\\)  (symétrique du foyer / sommet)",
    simple: "Même idée que pour le foyer, mais à l'envers : la directrice (ligne) est le reflet du foyer (point) de l'autre côté du sommet. On calcule pareil : \\(2\\beta - b\\)."},
  {q: "Une parabole est définie par :", opts: ["Un foyer et une directrice", "Deux foyers", "Deux directrices", "Un centre et un rayon"], ans: 0, chapter: "parabole", difficulty: "facile",
    exp: "Une parabole est entièrement déterminée par <strong>un foyer</strong> (un point) et <strong>une directrice</strong> (une droite) : c'est l'ensemble des points à égale distance des deux.",
    formula: "Parabole = points équidistants d'un foyer F et d'une directrice",
    demo: "parabole_geo",
    simple: "Un point + une ligne suffisent à dessiner une parabole. (À ne pas confondre : le cercle, lui, est défini par un centre et un rayon ; deux foyers, ce serait une ellipse.)"},
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
  {q: "Le vecteur directeur de 3x − 4y + 1 = 0 est :", opts: ["\\(\\vec{u}=\\begin{pmatrix}4\\\\3\\end{pmatrix}\\)","\\(\\vec{u}=\\begin{pmatrix}3\\\\-4\\end{pmatrix}\\)","\\(\\vec{u}=\\begin{pmatrix}-4\\\\3\\end{pmatrix}\\)","\\(\\vec{u}=\\begin{pmatrix}3\\\\4\\end{pmatrix}\\)"], ans: 0, chapter: "droite", difficulty: "intermediaire", exp: "Formule : \\(\\vec{u}=\\begin{pmatrix}-b\\\\a\\end{pmatrix}\\). Ici a=3, b=−4, donc \\(\\vec{u}=\\begin{pmatrix}4\\\\3\\end{pmatrix}\\)."},
  {q: "Rayon du cercle x²+y²−6x+2y+6=0 ?", opts: ["R=2","R=4","R=3","R=1"], ans: 0, chapter: "cercle", difficulty: "intermediaire",
    exp: "On lit les coefficients :<br>\\(a=-6\\)<br>\\(b=2\\)<br>\\(c=6\\)<br>Puis on applique la formule du rayon :<br>\\(R = \\dfrac{\\sqrt{(-6)^2+2^2-4(6)}}{2} = \\dfrac{\\sqrt{36+4-24}}{2} = \\dfrac{\\sqrt{16}}{2} = 2\\)",
    formula: "\\(R = \\dfrac{\\sqrt{a^2+b^2-4c}}{2}\\)  (à partir de \\(x^2+y^2+ax+by+c=0\\))",
    demo: "cercle_carre_combo",
    simple: "Dans l'équation, tu repères les 3 nombres devant x, devant y, et tout seul : ce sont a, b, c. Tu les mets dans la formule du rayon, tu calignes la racine, tu divises par 2. Astuce : utilise le 🧮 Brouillon en bas pour taper \\(√(36+4-24)/2\\)."},
  {q: "Si S(2;−1) est le sommet d'une parabole et A=3, la forme canonique est :", opts: ["f(x)=3(x−2)²−1","f(x)=3(x+2)²−1","f(x)=3(x−2)²+1","f(x)=−3(x−2)²−1"], ans: 0, chapter: "parabole", difficulty: "intermediaire",
    exp: "On remplace dans \\(f(x)=A(x-\\alpha)^2+\\beta\\) avec \\(\\alpha=2\\), \\(\\beta=-1\\), \\(A=3\\) :<br>\\(f(x)=3(x-2)^2+(-1)=3(x-2)^2-1\\)",
    formula: "\\(f(x)=A(x-\\alpha)^2+\\beta\\)  ·  sommet \\(S(\\alpha;\\beta)\\)",
    simple: "Tu mets le sommet et le A dans la formule. Le x du sommet (2) entre dans la parenthèse avec le signe inversé → \\((x-2)\\). Le y du sommet (−1) se met à la fin → \\(-1\\). Et A=3 devant."},
  {q: "La droite 4x−3y+6=0 a pour pente m =", opts: ["\\(\\dfrac{4}{3}\\)","\\(-\\dfrac{4}{3}\\)","\\(\\dfrac{3}{4}\\)","\\(-\\dfrac{3}{4}\\)"], ans: 0, chapter: "droite", difficulty: "facile",
    exp: "On lit les coefficients de \\(ax+by+c=0\\) :<br>\\(a=4\\)<br>\\(b=-3\\)<br>Puis :<br>\\(m=-\\dfrac{a}{b}=-\\dfrac{4}{-3}=\\dfrac{4}{3}\\)",
    formula: "\\(m=-\\dfrac{a}{b}\\)  (pour une droite écrite \\(ax+by+c=0\\))",
    simple: "💡 <strong>Astuce</strong> : la pente, c'est presque le vecteur directeur \\(\\vec{u}=\\begin{pmatrix}-b\\\\a\\end{pmatrix}\\), mais écrit en <strong>fraction</strong> (le bas divise le haut) au lieu d'une colonne : \\(m=\\dfrac{a}{-b}=-\\dfrac{a}{b}\\). Donc si tu connais le vecteur directeur, tu connais la pente : tu mets juste le bas du vecteur sous le haut. Attention au signe — il y a bien un moins."},
  {q: "Pour une parabole f(x)=x²−4x+7, l'abscisse du sommet est :", opts: ["x=2","x=−2","x=4","x=7"], ans: 0, chapter: "parabole", difficulty: "facile",
    exp: "Pour \\(f(x)=ax^2+bx+c\\), ici \\(a=1\\), \\(b=-4\\) :<br>\\(x_S=-\\dfrac{b}{2a}=-\\dfrac{-4}{2(1)}=\\dfrac{4}{2}=2\\)",
    formula: "\\(x_S=-\\dfrac{b}{2a}\\)  (forme développée \\(ax^2+bx+c\\))",
    simple: "Quand la parabole est écrite \\(ax^2+bx+c\\) (pas en forme canonique), le x du sommet se calcule avec \\(-\\dfrac{b}{2a}\\). Ici b=−4, a=1 : \\(-\\dfrac{-4}{2}=2\\)."},
  {q: "Un point P est à l'extérieur d'un cercle si :", opts: ["d(P,C) > R","d(P,C) < R","d(P,C) = R","d(P,C) = 0"], ans: 0, chapter: "cercle", difficulty: "facile",
    exp: "On compare la distance \\(d(P,C)\\) (point → centre) au rayon. P est <strong>à l'extérieur</strong> quand il est plus loin que le bord : \\(d(P,C)>R\\).",
    formula: "\\(d(P,C)>R\\) : extérieur · \\(=R\\) : dessus · \\(<R\\) : intérieur",
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
  {q: "Pour f(x)=−2(x+1)²+4, la parabole s'ouvre :", opts: ["Vers le bas (A&lt;0)","Vers le haut (A>0)","Vers la gauche","Vers la droite"], ans: 0, chapter: "parabole", difficulty: "facile",
    exp: "On regarde le signe de A (le nombre devant la parenthèse) :<br>\\(A=-2\\)<br>\\(A<0\\) → la parabole s'ouvre <strong>vers le bas</strong>.",
    formula: "\\(A>0 \\Rightarrow\\) ouvre vers le <strong>haut</strong> 🙂  ·  \\(A<0 \\Rightarrow\\) ouvre vers le <strong>bas</strong> 🙁",
    simple: "Regarde juste le nombre devant la parenthèse (ici −2). S'il est <strong>positif</strong>, la parabole sourit (vers le haut). S'il est <strong>négatif</strong>, elle fait la moue (vers le bas). Le reste de la formule (le +1, le +4) ne change PAS le sens d'ouverture, juste la position."},
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
    formula: "\\(d>R_1+R_2\\) : extérieurs  ·  \\(d=R_1+R_2\\) : tangents (1 point)  ·  \\(d<R_1+R_2\\) : sécants (2 points)",
    deep: "Imagine deux ronds. Pour savoir comment ils se placent, tu compares 2 nombres :<br>• <strong>d</strong> = la distance entre leurs centres (ici les centres sont en (0;0) et (5;0), donc \\(d=5\\)).<br>• <strong>la somme des rayons</strong> = \\(2+2=4\\) : c'est la portée maximale pour qu'ils se touchent.<br>Si d est <strong>plus grand</strong> que cette somme, les ronds sont trop loin → ils ne se touchent pas du tout = <strong>extérieurs</strong>. S'ils sont à égalité, ils se touchent juste (tangents). Si d est plus petit, ils se chevauchent (sécants, 2 points communs). Ici \\(5>4\\) → extérieurs."},
  {q: "Le sommet de la parabole y = 2x² − 8x + 5 est :", opts: ["S(2 ; −3)","S(−2 ; −3)","S(2 ; 3)","S(2 ; 5)"], ans: 0, chapter: "parabole", difficulty: "difficile",
    exp: "<strong>Étape 1 — l'abscisse</strong> du sommet (ici a=2, b=−8) :<br>\\(x_S=-\\dfrac{b}{2a}=-\\dfrac{-8}{2(2)}=\\dfrac{8}{4}=2\\)<br><br><strong>Étape 2 — l'ordonnée</strong>, en remplaçant x par 2 dans la fonction :<br>\\(y_S=2(2)^2-8(2)+5=8-16+5=-3\\)<br><br>Donc \\(S(2\\,;\\,-3)\\).",
    formula: "\\(x_S=-\\dfrac{b}{2a}\\)  puis  \\(y_S=f(x_S)\\)  (pour \\(y=ax^2+bx+c\\))",
    simple: "Pour une parabole écrite \\(y=ax^2+bx+c\\), le sommet (le point le plus haut ou le plus bas) se trouve en 2 temps. 1) Son x : tu fais \\(-\\dfrac{b}{2a}\\). 2) Son y : tu remets ce x dans la fonction et tu calcules. Ici on trouve x=2, puis en remplaçant on tombe sur y=−3."},
  {q: "La parabole de sommet S(1;2) passant par A(3;10) a pour coefficient :", opts: ["A = 2","A = 4","A = 3","A = 8"], ans: 0, chapter: "parabole", difficulty: "avance",
    exp: "On part de la forme canonique avec le sommet S(1;2) :<br>\\(f(x)=A(x-1)^2+2\\)<br>La parabole passe par A(3;10), donc \\(f(3)=10\\) :<br>\\(A(3-1)^2+2=10\\)<br>\\(4A+2=10\\)<br>\\(4A=8 \\Rightarrow A=2\\)",
    formula: "\\(f(x)=A(x-\\alpha)^2+\\beta\\)  ·  on trouve A avec un point connu",
    simple: "Tu écris la parabole avec son sommet : \\(A(x-1)^2+2\\). Le A est encore inconnu. Mais tu sais qu'elle passe par le point (3;10), donc tu remplaces x par 3 et f(x) par 10, et tu résous pour trouver A. 🧮 Brouillon dispo."},
  {q: "La parabole y = −(x+2)² + 4 coupe l'axe des abscisses en :", opts: ["x = 0 et x = −4","x = 2 et x = −2","x = −2 seulement","x = 4 et x = −4"], ans: 0, chapter: "parabole", difficulty: "difficile",
    exp: "Couper l'axe des abscisses = quand \\(y=0\\) :<br>\\(0=-(x+2)^2+4\\)<br>\\((x+2)^2=4\\)<br>\\(x+2=2\\) ou \\(x+2=-2\\)<br>\\(x=0\\) ou \\(x=-4\\)",
    formula: "Axe des abscisses : on pose \\(y=0\\) et on résout",
    simple: "L'axe des abscisses, c'est la ligne horizontale où \\(y=0\\). Tu remplaces donc y par 0 et tu résous. Comme il y a un carré, il y a deux solutions : une avec +2, une avec −2 (n'oublie pas la solution négative !)."},
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
    simple: "Chaque droite est en \\(ax+by+c=0\\), donc tu trouves sa pente avec \\(-\\dfrac{a}{b}\\). Tu obtiens \\(-\\frac23\\) et \\(\\frac32\\). Tu les multiplies : ça fait −1 → angle droit, perpendiculaires."}];

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
  parabole: [
    { concept: "Définition (foyer & directrice)", keywords: ["parabole est définie", "cartésienne d'une parabole", "définie par"] },
    { concept: "Sommet (forme canonique)", keywords: ["le sommet est", "sommet d'une parabole", "Si S("] },
    { concept: "Sommet (forme développée)", keywords: ["abscisse du sommet", "sommet de la parabole y"] },
    { concept: "Sens d'ouverture (signe de A)", keywords: ["s'ouvre", "l'ouverture est", "A > 0"] },
    { concept: "Axe de symétrie", keywords: ["axe de symétrie"] },
    { concept: "Foyer / directrice / sommet", keywords: ["le foyer est", "la directrice est", "mi-chemin", "relation entre A"] },
    { concept: "Intersection avec les axes", keywords: ["coupe l'axe", "passant par"] }
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

const flashcards = [
  {front: "Qu'est-ce qu'un vecteur \\(\\vec{AB}\\) ?", back: "La <strong>translation</strong> qui amène A sur B. C'est un segment <em>orienté</em> : direction, sens et longueur.", chapter: "vecteur"},
  {front: "Les 3 caractéristiques d'un vecteur ?", back: "<strong>Direction</strong> (droite AB), <strong>sens</strong> (de A vers B), <strong>norme</strong> \\(\\|\\vec{AB}\\|\\) (longueur du segment [AB]).", chapter: "vecteur"},
  {front: "Quand deux vecteurs sont-ils égaux ?", back: "Quand ils ont la <strong>même direction</strong>, le <strong>même sens</strong> et la <strong>même norme</strong> (ils définissent la même translation).", chapter: "vecteur"},
  {front: "Qu'est-ce que le vecteur nul \\(\\vec{0}\\) ?", back: "Un vecteur dont l'origine = l'extrémité : \\(\\vec{AA}=\\vec{0}\\). Il n'a ni direction ni sens.", chapter: "vecteur"},
  {front: "Qu'est-ce que le vecteur opposé \\(-\\vec{u}\\) ?", back: "Même direction, même norme, <strong>sens opposé</strong>. On a \\(-\\vec{AB}=\\vec{BA}\\).", chapter: "vecteur"},
  {front: "Relation de Chasles ?", back: "$$\\vec{AB}+\\vec{BC}=\\vec{AC}$$ (s'étend bout à bout : \\(\\vec{AB}+\\vec{BC}+\\vec{CD}=\\vec{AD}\\)).", chapter: "vecteur"},
  {front: "Règle du parallélogramme ?", back: "$$\\vec{OA}+\\vec{OB}=\\vec{OC}$$ si et seulement si OACB est un parallélogramme.", chapter: "vecteur"},
  {front: "Comment calcule-t-on une différence de vecteurs ?", back: "$$\\vec{u}-\\vec{v}=\\vec{u}+(-\\vec{v})$$ (on ajoute l'opposé).", chapter: "vecteur"},
  {front: "Norme et sens de \\(k\\,\\vec{v}\\) (k réel) ?", back: "$$\\|k\\,\\vec{v}\\|=|k|\\cdot\\|\\vec{v}\\|$$ Même direction que \\(\\vec{v}\\) ; même sens si \\(k>0\\), sens opposé si \\(k<0\\).", chapter: "vecteur"},
  {front: "Quand deux vecteurs sont-ils colinéaires ?", back: "S'il existe un réel non nul \\(k\\) tel que $$\\vec{u}=k\\,\\vec{v}$$ (ils ont alors la même direction).", chapter: "vecteur"},
  {front: "Comment montrer que A, B, C sont alignés ?", back: "Montrer que \\(\\vec{AB}\\) et \\(\\vec{AC}\\) sont colinéaires : \\(\\vec{AB}=k\\,\\vec{AC}\\).", chapter: "vecteur"},
  {front: "Quand les droites (AB) et (CD) sont-elles parallèles ?", back: "Quand \\(\\vec{AB}\\) et \\(\\vec{CD}\\) sont colinéaires : \\(\\vec{AB}=k\\,\\vec{CD}\\).", chapter: "vecteur"},
  {front: "Comment caractériser le milieu M de [AB] ?", back: "$$\\vec{AM}=\\tfrac{1}{2}\\,\\vec{AB}$$", chapter: "vecteur"},
  {front: "Qu'est-ce qu'une combinaison linéaire de \\(\\vec{u}\\) et \\(\\vec{v}\\) ?", back: "Un vecteur de la forme $$\\vec{w}=a\\,\\vec{u}+b\\,\\vec{v}$$ (a, b non tous les deux nuls).", chapter: "vecteur"},
  {front: "Composantes du vecteur \\(\\vec{AB}\\) dans un repère ?", back: "$$\\vec{AB}=(x_B-x_A\\,;\\,y_B-y_A)$$", chapter: "vecteur"},
  {front: "Quelle est la forme canonique d'un cercle ?", back: "$$(x - x_0)^2 + (y - y_0)^2 = R^2$$", chapter: "cercle"},
  {front: "Quelle est la forme développée d'un cercle ?", back: "$$x^2 + y^2 + ax + by + c = 0$$", chapter: "cercle"},
  {front: "Comment trouver le centre d'un cercle en forme développée ?", back: "$$C\\left(\\frac{-a}{2} ; \\frac{-b}{2}\\right)$$", chapter: "cercle"},
  {front: "Condition d'existence d'un cercle ?", back: "$$a^2 + b^2 - 4c > 0$$", chapter: "cercle"},
  {front: "Forme canonique d'une parabole ?", back: "$$f(x) = A(x-\\alpha)^2 + \\beta$$", chapter: "parabole"},
  {front: "Comment trouver le sommet d'une parabole ?", back: "$$S(\\alpha ; \\beta)$$", chapter: "parabole"},
  {front: "Définition d'une parabole ?", back: "Points équidistants du foyer et de la directrice", chapter: "parabole"},
  {front: "Équation explicite d'une droite ?", back: "$$y = mx + p$$", chapter: "droite"},
  {front: "Condition pour que deux droites soient parallèles ?", back: "$$m_1 = m_2$$ (et $p_1 \\neq p_2$ sinon elles sont confondues)", chapter: "droite"},
  {front: "Condition pour que deux droites soient perpendiculaires ?", back: "$$m \\cdot m' = -1$$", chapter: "droite"},
  // --- 5 cartes Cercle supplémentaires ---
  {front: "Comment calculer le rayon depuis la forme développée x²+y²+ax+by+c=0 ?", back: "$$R = \\frac{\\sqrt{a^2 + b^2 - 4c}}{2}$$", chapter: "cercle"},
  {front: "Que se passe-t-il si a²+b²−4c = 0 ?", back: "Un seul point : $C\\left(-\\dfrac{a}{2} ; -\\dfrac{b}{2}\\right)$. Pas de cercle.", chapter: "cercle"},
  {front: "Que se passe-t-il si a²+b²−4c &lt; 0 ?", back: "Impossible — aucun point ne satisfait l'équation.", chapter: "cercle"},
  {front: "Comment passer de la forme développée à la forme canonique ?", back: "Compléter le carré pour x et pour y séparément.", chapter: "cercle"},
  {front: "Un cercle de diamètre [AB] : comment trouver centre et rayon ?", back: "Centre = milieu de [AB] ; $R = \\dfrac{|AB|}{2}$", chapter: "cercle"},
  // --- 5 cartes Parabole supplémentaires ---
  {front: "Relation entre A (forme canonique) et les paramètres foyer/directrice ?", back: "$$A = \\frac{1}{2(b-k)}$$ où F(a ; b) et directrice y = k", chapter: "parabole"},
  {front: "Formule du foyer si l'on connaît le sommet S(α;β) et la directrice y=k ?", back: "$$F(\\alpha \\; ; \\; 2\\beta - k)$$", chapter: "parabole"},
  {front: "Formule de la directrice si l'on connaît le sommet S(α;β) et le foyer F(a;b) ?", back: "$$y = 2\\beta - b$$", chapter: "parabole"},
  {front: "Que représente A dans f(x) = A(x−α)² + β ?", back: "L'ouverture : A>0 vers le haut, A&lt;0 vers le bas. |A| grand = parabole étroite.", chapter: "parabole"},
  {front: "Quelle est l'équation de l'axe de symétrie d'une parabole de sommet S(α;β) ?", back: "$$x = \\alpha$$ (droite verticale)", chapter: "parabole"},
  // --- 5 cartes Droites supplémentaires ---
  {front: "Vecteur directeur de d ≡ ax+by+c=0 ?", back: "$$\\vec{u} = \\begin{pmatrix} -b \\\\ a \\end{pmatrix}$$", chapter: "droite"},
  {front: "Vecteur normal de d ≡ ax+by+c=0 ?", back: "$$\\vec{n} = \\begin{pmatrix} a \\\\ b \\end{pmatrix}$$", chapter: "droite"},
  {front: "Pente d'une droite ax+by+c=0 ?", back: "$$m = -\\dfrac{a}{b}$$", chapter: "droite"},
  {front: "Équation d'une droite passant par \\(A(x_A\\,;y_A)\\) avec pente m ?", back: "$$y - y_A = m(x - x_A)$$", chapter: "droite"},
  {front: "Distance du point P(xₚ;yₚ) à la droite ax+by+c=0 ?", back: "$$d = \\frac{|ax_P + by_P + c|}{\\sqrt{a^2 + b^2}}$$", chapter: "droite"}
,
  {front: "Comment trouver le sommet d'une parabole y = ax² + bx + c ?", back: "$$x_s = \\frac{-b}{2a}, \\quad y_s = a x_s^2 + b x_s + c$$", chapter: "parabole"},
  {front: "Quand la parabole est-elle ouverte vers le haut ?", back: "Quand $a > 0$. Vers le bas si $a < 0$.", chapter: "parabole"},
  {front: "Discriminant d'une parabole : que vaut-il ?", back: "$$\\Delta = b^2 - 4ac$$  $\\Delta>0$: 2 zéros · $=0$: 1 · $<0$: aucun", chapter: "parabole"},
  {front: "Formule pour les zéros de ax² + bx + c = 0 ?", back: "$$x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}$$", chapter: "parabole"},
  {front: "Condition pour deux droites parallèles ?", back: "Mêmes pentes $m_1 = m_2$ et ordonnées à l'origine différentes.", chapter: "droite"},
  {front: "Condition pour deux droites perpendiculaires ?", back: "$$m_1 \\times m_2 = -1$$", chapter: "droite"},
  {front: "Comment trouver l'intersection de deux droites ?", back: "Résoudre le système $y = m_1 x + p_1$ et $y = m_2 x + p_2$.", chapter: "droite"},
  {front: "Comment vérifier qu'un point appartient à un cercle ?", back: "Substituer $(x,y)$ dans l'équation : $(x-h)^2+(y-k)^2=R^2$ doit être vérifié.", chapter: "cercle"},
  {front: "Distance entre A(x₁,y₁) et B(x₂,y₂) ?", back: "$$d = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}$$", chapter: "cercle"},
  {front: "Équation d'un cercle passant par 3 points ?", back: "Substituer les 3 points dans $x^2+y^2+ax+by+c=0$ → système 3×3.", chapter: "cercle"}];

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
  parabole: [
    {title: "Définition", content: "Points équidistants du foyer et de la directrice", note: "distance(P,F) = distance(P,d)"},
    {title: "Équation cartésienne", content: "$$f(x) = \\frac{1}{2(b-k)}(x-a)^2 + \\frac{b+k}{2}$$", note: "F(a;b), directrice y=k"},
    {title: "Forme canonique", content: "$$f(x) = A(x-\\alpha)^2 + \\beta$$", note: "Sommet S(α;β)"},
    {title: "Sommet", content: "$$S(a; \\frac{b+k}{2})$$", note: "Le sommet est le point le plus bas (A>0) ou le plus haut (A&lt;0) de la parabole. Il se trouve exactement à mi-chemin entre le foyer F(a;b) et la directrice y=k."},
    {title: "Ouverture", content: "A > 0 : vers le haut", note: "Si A>0 la parabole forme un ∪ (ouverte vers le haut). Si A&lt;0 elle forme un ∩ (ouverte vers le bas). Plus |A| est grand, plus la parabole est étroite et pincée."},
    {title: "Axe de symétrie", content: "x = a", note: "L'axe x=a est une droite verticale qui passe par le foyer et le sommet. La parabole est parfaitement symétrique par rapport à cet axe."},
    {title: "Foyer depuis sommet", content: "$$F(\\alpha; 2\\beta-k)$$", note: "Si sommet S(α;β) et directrice y=k"},
    {title: "Directrice depuis sommet", content: "y = 2β-b", note: "Si sommet S(α;β) et foyer F(a;b)"},
    {title: "Exemple", content: "f(x) = 2(x-3)² + 5", note: "Ici A=2>0 donc ouverture vers le haut. Le sommet S(3;5) est le point le plus bas. L'axe de symétrie est x=3."},
    {title: "Rappel", content: "$A = \\frac{1}{2(b-k)}$", note: "Relation entre A et paramètres"},
    {title: "A et les paramètres", content: "$$A = \\frac{1}{2(b-k)}$$", note: "F(a;b) et directrice y=k"},
    {title: "Foyer depuis sommet", content: "$$F(\\alpha ; 2\\beta-k)$$", note: "Sommet S(α;β), directrice y=k"},
    {title: "Directrice depuis sommet", content: "$$y = 2\\beta - b$$", note: "Sommet S(α;β), foyer F(a;b)"},
    {title: "Ouverture selon A", content: "A > 0 → haut | A&lt;0 → bas", note: "|A| grand = parabole étroite"},
    {title: "Axe de symétrie", content: "$$x = \\alpha$$", note: "Droite verticale par le sommet"}
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
    {title: "Droite par un point", content: "$$y - y_A = m(x - x_A)$$", note: "Exemple : M(1;2), $m=\\dfrac{4}{3}$. On écrit $y-2=\\dfrac{4}{3}(x-1)$ → $y=\\dfrac{4}{3}x+\\dfrac{2}{3}$. Vérification : pour $x=1$, $y=\\dfrac{4}{3}+\\dfrac{2}{3}=2$ ✓"},
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
const ROOT = (id, content) => `<span class="aroot" data-tid="${id}rt" data-flip-id="${id}rt"><span class="arad">√</span><span class="arootc">${content}</span></span>`;

const DEMOS = {
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
          { from: ['pl','d4','op3','d1','pr'], to: 'd5' }
        ]
      },
      {
        brief: "|3| = 3, puis on rationalise (on enlève la racine du bas) : 3/√5 = 3√5/5 ≈ 1,34.",
        more: "Pour rationaliser, on multiplie haut et bas par √5 : (3·√5)/(√5·√5) = 3√5/5.",
        eq: T('d','d') + T('eq','=') + FRAC(T('nr','3√5', 'atok-result'), T('dr','5', 'atok-result')),
        merge: [
          { from: ['absL','n3','absR'], to: 'nr' },
          { from: ['rad','d5'], to: 'dr' }
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

  parabole_geo: {
    type: 'geo',
    title: "Parabole : foyer et directrice",
    subtitle: "Tout point de la parabole est à égale distance du foyer et de la directrice",
    scenes: [
      { phase: 'intro', brief: "Voici une parabole, son foyer F (point doré) et sa directrice (droite verte)." },
      { phase: 'slide', brief: "Pour CHAQUE point P de la parabole, distance(P, F) = distance(P, directrice). Regarde P glisser : les deux segments restent toujours égaux.", more: "C'est la propriété fondamentale : la parabole est l'ensemble des points équidistants du foyer et de la directrice." },
      { phase: 'still', brief: "Cette égalité des deux distances EST la définition de la parabole. C'est de là que vient son équation." }
    ]
  }
};
