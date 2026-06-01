/* ============================================================
   data.js — Données statiques de l'application Maths 4GT
   Ce fichier NE CHANGE JAMAIS → ne pas envoyer à Claude
   ============================================================ */

const allQuestions = [
  {q: "Que représente le vecteur \\(\\vec{AB}\\) ?", opts: ["La translation qui amène A sur B", "Le segment [AB]", "La droite (AB)", "Le milieu de [AB]"], ans: 0, chapter: "vecteur", difficulty: "facile", exp: "Un vecteur \\(\\vec{AB}\\) représente la translation de A vers B (segment orienté)."},
  {q: "Relation de Chasles : \\(\\vec{AB}+\\vec{BC}\\) = ?", opts: ["\\(\\vec{AC}\\)", "\\(\\vec{CA}\\)", "\\(\\vec{BA}\\)", "\\(\\vec{AB}\\)"], ans: 0, chapter: "vecteur", difficulty: "facile", exp: "\\(\\vec{AB}+\\vec{BC}=\\vec{AC}\\) (l'extrémité du 1er = l'origine du 2e)."},
  {q: "\\(\\vec{AB}+\\vec{BC}+\\vec{CD}\\) = ?", opts: ["\\(\\vec{AD}\\)", "\\(\\vec{DA}\\)", "\\(\\vec{AC}\\)", "\\(\\vec{BD}\\)"], ans: 0, chapter: "vecteur", difficulty: "intermediaire", exp: "Chasles bout à bout : on garde la 1re origine et la dernière extrémité → \\(\\vec{AD}\\)."},
  {q: "Le vecteur opposé de \\(\\vec{AB}\\) est :", opts: ["\\(\\vec{BA}\\)", "\\(\\vec{AB}\\)", "\\(\\vec{0}\\)", "\\(\\vec{AC}\\)"], ans: 0, chapter: "vecteur", difficulty: "facile", exp: "\\(-\\vec{AB}=\\vec{BA}\\) : même direction et norme, sens opposé."},
  {q: "Que vaut \\(\\vec{AA}\\) ?", opts: ["\\(\\vec{0}\\) (vecteur nul)", "1", "Le point A", "\\(\\vec{AB}\\)"], ans: 0, chapter: "vecteur", difficulty: "facile", exp: "Origine = extrémité, donc \\(\\vec{AA}=\\vec{0}\\)."},
  {q: "La différence \\(\\vec{u}-\\vec{v}\\) est égale à :", opts: ["\\(\\vec{u}+(-\\vec{v})\\)", "\\(\\vec{u}+\\vec{v}\\)", "\\(\\vec{v}-\\vec{u}\\)", "\\(\\vec{0}\\)"], ans: 0, chapter: "vecteur", difficulty: "facile", exp: "Soustraire = ajouter l'opposé : \\(\\vec{u}-\\vec{v}=\\vec{u}+(-\\vec{v})\\)."},
  {q: "La norme du vecteur \\(k\\,\\vec{v}\\) (k réel) vaut :", opts: ["\\(|k|\\cdot\\|\\vec{v}\\|\\)", "\\(k\\cdot\\|\\vec{v}\\|\\)", "\\(\\|\\vec{v}\\|\\)", "\\(k^2\\,\\|\\vec{v}\\|\\)"], ans: 0, chapter: "vecteur", difficulty: "intermediaire", exp: "\\(\\|k\\,\\vec{v}\\|=|k|\\cdot\\|\\vec{v}\\|\\) (on prend la valeur absolue de k)."},
  {q: "Si \\(k<0\\), le vecteur \\(k\\,\\vec{v}\\) a :", opts: ["la même direction que \\(\\vec{v}\\), mais le sens opposé", "le même sens que \\(\\vec{v}\\)", "une direction perpendiculaire à \\(\\vec{v}\\)", "une norme nulle"], ans: 0, chapter: "vecteur", difficulty: "intermediaire", exp: "Multiplier par un réel négatif inverse le sens, mais garde la direction."},
  {q: "Deux vecteurs non nuls \\(\\vec{u}\\) et \\(\\vec{v}\\) sont colinéaires si :", opts: ["il existe un réel non nul k tel que \\(\\vec{u}=k\\,\\vec{v}\\)", "\\(\\vec{u}+\\vec{v}=\\vec{0}\\)", "\\(\\|\\vec{u}\\|=\\|\\vec{v}\\|\\)", "ils ont la même origine"], ans: 0, chapter: "vecteur", difficulty: "facile", exp: "Colinéaires ⟺ \\(\\vec{u}=k\\,\\vec{v}\\) : ils ont la même direction."},
  {q: "Les points A, B, C sont alignés si :", opts: ["\\(\\vec{AB}\\) et \\(\\vec{AC}\\) sont colinéaires", "\\(\\vec{AB}=\\vec{AC}\\)", "\\(\\|\\vec{AB}\\|=\\|\\vec{AC}\\|\\)", "\\(\\vec{AB}+\\vec{AC}=\\vec{0}\\)"], ans: 0, chapter: "vecteur", difficulty: "intermediaire", exp: "Alignés ⟺ \\(\\vec{AB}=k\\,\\vec{AC}\\) (colinéaires)."},
  {q: "M est le milieu de [AB] si et seulement si :", opts: ["\\(\\vec{AM}=\\tfrac{1}{2}\\,\\vec{AB}\\)", "\\(\\vec{AM}=\\vec{AB}\\)", "\\(\\vec{AM}=2\\,\\vec{AB}\\)", "\\(\\vec{AM}=-\\vec{AB}\\)"], ans: 0, chapter: "vecteur", difficulty: "intermediaire", exp: "Le milieu vérifie \\(\\vec{AM}=\\tfrac{1}{2}\\vec{AB}\\)."},
  {q: "L'égalité \\(\\vec{OA}+\\vec{OB}=\\vec{OC}\\) signifie que :", opts: ["OACB est un parallélogramme", "O est le milieu de [AB]", "A = B", "\\(\\vec{OC}=\\vec{0}\\)"], ans: 0, chapter: "vecteur", difficulty: "intermediaire", exp: "Règle du parallélogramme : \\(\\vec{OA}+\\vec{OB}=\\vec{OC}\\) ⟺ OACB parallélogramme."},
  {q: "Les composantes de \\(\\vec{AB}\\) avec A(1;2) et B(4;6) sont :", opts: ["(3 ; 4)", "(5 ; 8)", "(4 ; 6)", "(−3 ; −4)"], ans: 0, chapter: "vecteur", difficulty: "intermediaire", exp: "\\(\\vec{AB}=(x_B-x_A\\,;\\,y_B-y_A)=(4-1\\,;\\,6-2)=(3\\,;\\,4)\\)."},
  {q: "Les droites (AB) et (CD) sont parallèles si :", opts: ["\\(\\vec{AB}\\) et \\(\\vec{CD}\\) sont colinéaires", "\\(\\vec{AB}=\\vec{CD}\\) obligatoirement", "\\(\\vec{AB}+\\vec{CD}=\\vec{0}\\)", "A, B, C, D sont alignés"], ans: 0, chapter: "vecteur", difficulty: "facile", exp: "(AB)∥(CD) ⟺ \\(\\vec{AB}=k\\,\\vec{CD}\\) (vecteurs colinéaires)."},
  {q: "Quelle est l'équation canonique d'un cercle de centre C(3;−2) et de rayon R=5 ?", opts: ["(x−3)² + (y+2)² = 25", "(x+3)² + (y−2)² = 25", "(x−3)² + (y−2)² = 5", "(x+3)² + (y+2)² = 25"], ans: 0, chapter: "cercle", difficulty: "facile", exp: "La forme canonique est (x−x₀)²+(y−y₀)²=R²."},
  {q: "Pour x²+y²+6x−4y−3=0, que vaut a²+b²−4c ?", opts: ["36+16+12 = 64", "36+16−12 = 40", "−6+4+3 = 1", "0"], ans: 0, chapter: "cercle", difficulty: "intermediaire", exp: "a=6, b=−4, c=−3. −4c = −4×(−3) = +12. Donc 36+16+12 = 64."},
  {q: "Dans x²+y²+ax+by+c=0, le centre est :", opts: ["\\(\\left(-\\dfrac{a}{2}\\,;-\\dfrac{b}{2}\\right)\\)", "\\(\\left(\\dfrac{a}{2}\\,;\\dfrac{b}{2}\\right)\\)", "\\((a\\,;b)\\)", "\\((-a\\,;-b)\\)"], ans: 0, chapter: "cercle", difficulty: "facile", exp: "En complétant le carré, le centre est \\(\\left(-\\dfrac{a}{2}\\,;-\\dfrac{b}{2}\\right)\\)."},
  {q: "Le rayon d'un cercle x²+y²+ax+by+c=0 est :", opts: ["\\(\\dfrac{\\sqrt{a^2+b^2-4c}}{2}\\)", "\\(\\sqrt{a^2+b^2-4c}\\)", "\\(\\dfrac{a^2+b^2-4c}{2}\\)", "\\(\\dfrac{\\sqrt{a^2+b^2}}{2}\\)"], ans: 0, chapter: "cercle", difficulty: "intermediaire", exp: "\\(R = \\dfrac{\\sqrt{a^2+b^2-4c}}{2}\\) à condition que \\(a^2+b^2-4c > 0\\)."},
  {q: "Si a²+b²−4c = 0, le lieu géométrique est :", opts: ["Un point unique", "Un cercle", "Impossible", "Une droite"], ans: 0, chapter: "cercle", difficulty: "facile", exp: "Le rayon serait R = 0."},
  {q: "Si a²+b²−4c &lt; 0, le lieu géométrique est :", opts: ["Impossible", "Un cercle", "Un point", "Une droite"], ans: 0, chapter: "cercle", difficulty: "facile", exp: "Le rayon serait √(nombre négatif), impossible."},
  {q: "Un cercle centré à l'origine a pour équation :", opts: ["x² + y² = R²", "(x−0)² + (y−0)² = R", "x² + y² = R", "x + y = R"], ans: 0, chapter: "cercle", difficulty: "facile", exp: "Si C(0;0), alors x² + y² = R²."},
  {q: "Pour déterminer si un point est sur un cercle, on calcule :", opts: ["La distance du point au centre", "L'aire du cercle", "Le périmètre", "Le diamètre"], ans: 0, chapter: "cercle", difficulty: "facile", exp: "On calcule \\(d(P,C) = \\sqrt{(x_P-x_0)^2 + (y_P-y_0)^2}\\) : la distance entre le point P et le centre C."},
  {q: "Si d(P,C) < R, le point P est :", opts: ["À l'intérieur du cercle", "Sur le cercle", "À l'extérieur du cercle", "Au centre"], ans: 0, chapter: "cercle", difficulty: "facile", exp: "Distance inférieure au rayon = intérieur."},
  {q: "Le cercle de diamètre [AB] a pour centre :", opts: ["Le milieu de [AB]", "Le point A", "Le point B", "L'origine"], ans: 0, chapter: "cercle", difficulty: "facile", exp: "Le centre est le milieu du diamètre."},
  {q: "Le cercle de diamètre [AB] a pour rayon :", opts: ["\\(\\dfrac{|AB|}{2}\\)", "\\(|AB|\\)", "\\(2|AB|\\)", "\\(|AB|^2\\)"], ans: 0, chapter: "cercle", difficulty: "facile", exp: "Le rayon est la moitié du diamètre."},
  {q: "Pour trouver l'équation d'un cercle par 3 points, on utilise :", opts: ["La forme développée", "La forme canonique", "La forme explicite", "La forme paramétrique"], ans: 0, chapter: "cercle", difficulty: "intermediaire", exp: "La forme développée contient 3 inconnues pour 3 points."},
  {q: "Combien d'équations obtient-on avec 3 points pour un cercle ?", opts: ["3 équations à 3 inconnues", "1 équation", "2 équations", "4 équations"], ans: 0, chapter: "cercle", difficulty: "facile", exp: "Chaque point donne une équation."},
  {q: "La condition d'existence d'un cercle est :", opts: ["a² + b² − 4c > 0", "a² + b² − 4c = 0", "a² + b² − 4c &lt; 0", "a + b + c > 0"], ans: 0, chapter: "cercle", difficulty: "intermediaire", exp: "Le rayon doit être réel positif."},
  {q: "Le sommet d'une parabole de foyer F(2;6) et directrice y=2 est :", opts: ["S(2;4)", "S(2;8)", "S(4;2)", "S(2;2)"], ans: 0, chapter: "parabole", difficulty: "intermediaire",
    exp: "Le sommet est <strong>pile au milieu</strong> entre le foyer et la directrice.<br>Le foyer est en hauteur \\(y=6\\), la directrice en hauteur \\(y=2\\).<br>\\(y_S=\\dfrac{6+2}{2}=4\\)<br>Le sommet garde le même x que le foyer : \\(x_S=2\\).<br>Donc \\(S(2\\,;\\,4)\\).",
    formula: "\\(y_S=\\dfrac{y_F + k}{2}\\)  (k = hauteur de la directrice)  ·  \\(x_S=x_F\\)",
    simple: "Imagine le foyer (un point) et la directrice (une ligne horizontale). Le sommet de la parabole est juste <strong>au milieu</strong> des deux, à mi-hauteur. Le foyer est à 6, la ligne à 2 : le milieu est à \\((6+2)/2=4\\). Et le sommet est droit en dessous du foyer, donc même x."},
  {q: "Pour une parabole de sommet S(−1;3) et directrice y=1, le foyer est :", opts: ["F(−1;5)", "F(−1;1)", "F(1;5)", "F(−1;−1)"], ans: 0, chapter: "parabole", difficulty: "intermediaire",
    exp: "Le sommet est au milieu du foyer et de la directrice. On connaît le sommet (\\(y=3\\)) et la directrice (\\(y=1\\)), on cherche le foyer.<br>Distance sommet → directrice : \\(3-1=2\\).<br>Le foyer est à la même distance, mais de l'autre côté du sommet :<br>\\(y_F=3+2=5\\)<br>Même x que le sommet : \\(x_F=-1\\).<br>Donc \\(F(-1\\,;\\,5)\\).",
    formula: "\\(y_F = 2\\,y_S - k\\)  (le foyer est le symétrique de la directrice par rapport au sommet)  ·  \\(x_F=x_S\\)",
    simple: "Le sommet est <strong>pile au milieu</strong> entre la directrice (la ligne) et le foyer (le point). Donc le foyer est aussi loin du sommet que la ligne, mais de l'<strong>autre côté</strong>. La ligne est 2 crans en dessous du sommet (3 → 1), donc le foyer est 2 crans au-dessus : \\(3+2=5\\). On dit que le foyer est le « symétrique » de la directrice par rapport au sommet = son reflet de l'autre côté."},
  {q: "Dans f(x) = A(x−α)² + β, le sommet est :", opts: ["S(α ; β)", "S(−α ; β)", "S(α ; −β)", "S(−α ; −β)"], ans: 0, chapter: "parabole", difficulty: "facile", exp: "La forme canonique donne directement S(α ; β)."},
  {q: "Si A > 0 dans f(x) = A(x−α)² + β, la parabole :", opts: ["S'ouvre vers le haut", "S'ouvre vers le bas", "Est horizontale", "Est verticale"], ans: 0, chapter: "parabole", difficulty: "facile", exp: "A positif = ouverture vers le haut."},
  {q: "L'axe de symétrie d'une parabole de foyer F(a;b) est :", opts: ["La droite x = a", "La droite y = b", "La droite x = b", "La droite y = a"], ans: 0, chapter: "parabole", difficulty: "facile", exp: "L'axe de symétrie est x = a."},
  {q: "Le sommet est toujours à mi-chemin entre :", opts: ["Le foyer et la directrice", "Deux foyers", "Deux directrices", "L'origine et le foyer"], ans: 0, chapter: "parabole", difficulty: "facile", exp: "Le sommet est équidistant du foyer et de la directrice."},
  {q: "L'équation cartésienne d'une parabole vient de :", opts: ["distance(P,F) = distance(P,d)", "distance(P,F) = 2·distance(P,d)", "distance(P,F) + distance(P,d) = 0", "distance(P,F) × distance(P,d) = 1"], ans: 0, chapter: "parabole", difficulty: "intermediaire", exp: "Définition : points équidistants du foyer et de la directrice."},
  {q: "Pour f(x) = 2(x−3)² + 5, le sommet est :", opts: ["S(3 ; 5)", "S(−3 ; 5)", "S(3 ; −5)", "S(−3 ; −5)"], ans: 0, chapter: "parabole", difficulty: "facile", exp: "α = 3, β = 5, donc S(3 ; 5)."},
  {q: "Pour f(x) = 2(x−3)² + 5, l'ouverture est :", opts: ["Vers le haut (A > 0)", "Vers le bas (A > 0)", "Vers la gauche", "Vers la droite"], ans: 0, chapter: "parabole", difficulty: "facile", exp: "A = 2 > 0, ouverture vers le haut."},
  {q: "La relation entre A et les paramètres foyer/directrice est :", opts: ["\\(A = \\dfrac{1}{2(b-k)}\\)", "\\(A = 2(b-k)\\)", "\\(A = \\dfrac{b-k}{2}\\)", "\\(A = b-k\\)"], ans: 0, chapter: "parabole", difficulty: "difficile", exp: "\\(A = \\dfrac{1}{2(b-k)}\\) où F(a ; b) et directrice y = k."},
  {q: "Si le sommet est S(α;β) et la directrice y=k, le foyer est :", opts: ["F(α ; 2β−k)", "F(α ; β−k)", "F(α ; k)", "F(2α ; β)"], ans: 0, chapter: "parabole", difficulty: "intermediaire", exp: "Foyer symétrique de la directrice par rapport au sommet."},
  {q: "Si le sommet est S(α;β) et le foyer F(a;b), la directrice est :", opts: ["y = 2β−b", "y = β−b", "y = b", "y = 2b−β"], ans: 0, chapter: "parabole", difficulty: "intermediaire", exp: "Directrice symétrique du foyer par rapport au sommet."},
  {q: "Une parabole est définie par :", opts: ["Un foyer et une directrice", "Deux foyers", "Deux directrices", "Un centre et un rayon"], ans: 0, chapter: "parabole", difficulty: "facile", exp: "Parabole = points équidistants d'un foyer et d'une directrice."},
  {q: "Pour d ≡ 3x − 4y + 5 = 0, le vecteur directeur est :", opts: ["\\(\\vec{u}=\\begin{pmatrix}4\\\\3\\end{pmatrix}\\)", "\\(\\vec{u}=\\begin{pmatrix}3\\\\-4\\end{pmatrix}\\)", "\\(\\vec{u}=\\begin{pmatrix}-4\\\\3\\end{pmatrix}\\)", "\\(\\vec{u}=\\begin{pmatrix}3\\\\4\\end{pmatrix}\\)"], ans: 0, chapter: "droite", difficulty: "intermediaire", exp: "Formule : \\(\\vec{u}=\\begin{pmatrix}-b\\\\a\\end{pmatrix}\\). Ici a=3 et b=−4, donc \\(\\vec{u}=\\begin{pmatrix}-(-4)\\\\3\\end{pmatrix}=\\begin{pmatrix}4\\\\3\\end{pmatrix}\\)."},
  {q: "Deux droites \\(y=3x+1\\) et \\(y=-\\dfrac{1}{3}x+5\\) sont :", opts: ["Perpendiculaires", "Parallèles", "Confondues", "Sécantes non perpendiculaires"], ans: 0, chapter: "droite", difficulty: "facile", exp: "\\(m_1\\cdot m_2 = 3\\cdot\\left(-\\dfrac{1}{3}\\right) = -1\\)."},
  {q: "L'équation d'une droite par A(1;2) et B(3;8) est :", opts: ["y = 3x − 1", "y = 2x + 1", "y = 3x + 1", "y = 2x − 1"], ans: 0, chapter: "droite", difficulty: "intermediaire",
    exp: "<strong>Étape 1 — la pente</strong> :<br>\\(m=\\dfrac{y_B-y_A}{x_B-x_A}=\\dfrac{8-2}{3-1}=\\dfrac{6}{2}=3\\)<br><br><strong>Étape 2 — trouver p</strong> en mettant un point connu, A(1;2), dans \\(y=3x+p\\) :<br>\\(2=3(1)+p\\)<br>\\(p=2-3=-1\\)<br><br><strong>Résultat</strong> :<br>\\(y=3x-1\\)",
    formula: "Pente : \\(m=\\dfrac{y_B-y_A}{x_B-x_A}\\)  ·  puis \\(y=mx+p\\), on trouve p avec un point.",
    simple: "Deux étapes. 1) <strong>La pente</strong> : de combien ça monte (différence des y) divisé par de combien ça avance (différence des x). Ici 6 divisé par 2 = 3. 2) <strong>Le p</strong> (là où ça croise l'axe vertical) : tu prends un des deux points, tu remplaces x et y dans \\(y=3x+p\\), et tu isoles p. Avec A(1;2) : \\(2=3+p\\), donc \\(p=-1\\)."},
  {q: "Pour d ≡ 2x + y − 4 = 0, la perpendiculaire par M(0;3) est :", opts: ["\\(y = \\dfrac{1}{2}x + 3\\)", "\\(y = -2x + 3\\)", "\\(y = 2x + 3\\)", "\\(y = \\dfrac{1}{2}x - 3\\)"], ans: 0, chapter: "droite", difficulty: "intermediaire", exp: "\\(m = -2\\), \\(m' = \\dfrac{1}{2}\\). \\(y = \\dfrac{1}{2}x + 3\\)."},
  {q: "La condition pour que deux droites soient parallèles est :", opts: ["m = m'", "m·m' = −1", "m + m' = 0", "m − m' = 1"], ans: 0, chapter: "droite", difficulty: "facile", exp: "Parallèles = même pente."},
  {q: "La condition pour que deux droites soient perpendiculaires est :", opts: ["m·m' = −1", "m = m'", "m + m' = 0", "m − m' = 1"], ans: 0, chapter: "droite", difficulty: "facile", exp: "Perpendiculaires = produit des pentes = −1."},
  {q: "Le vecteur normal de d ≡ ax+by+c=0 est :", opts: ["\\(\\vec{n}=\\begin{pmatrix}a\\\\b\\end{pmatrix}\\)", "\\(\\vec{n}=\\begin{pmatrix}-b\\\\a\\end{pmatrix}\\)", "\\(\\vec{n}=\\begin{pmatrix}b\\\\a\\end{pmatrix}\\)", "\\(\\vec{n}=\\begin{pmatrix}-a\\\\-b\\end{pmatrix}\\)"], ans: 0, chapter: "droite", difficulty: "facile", exp: "Le vecteur normal (perpendiculaire à la droite) est \\(\\vec{n}=\\begin{pmatrix}a\\\\b\\end{pmatrix}\\)."},
  {q: "Le vecteur directeur de d ≡ ax+by+c=0 est :", opts: ["\\(\\vec{u}=\\begin{pmatrix}-b\\\\a\\end{pmatrix}\\)", "\\(\\vec{u}=\\begin{pmatrix}a\\\\b\\end{pmatrix}\\)", "\\(\\vec{u}=\\begin{pmatrix}b\\\\a\\end{pmatrix}\\)", "\\(\\vec{u}=\\begin{pmatrix}-a\\\\-b\\end{pmatrix}\\)"], ans: 0, chapter: "droite", difficulty: "facile", exp: "Le vecteur directeur (parallèle à la droite) est \\(\\vec{u}=\\begin{pmatrix}-b\\\\a\\end{pmatrix}\\)."},
  {q: "La pente de d ≡ ax+by+c=0 est :", opts: ["\\(m = -\\dfrac{a}{b}\\)", "\\(m = \\dfrac{a}{b}\\)", "\\(m = -\\dfrac{b}{a}\\)", "\\(m = \\dfrac{b}{a}\\)"], ans: 0, chapter: "droite", difficulty: "facile", exp: "De \\(ax+by+c=0\\), \\(y = -\\dfrac{a}{b}x - \\dfrac{c}{b}\\), donc \\(m = -\\dfrac{a}{b}\\)."},
  {q: "La forme explicite d'une droite est :", opts: ["\\(y = mx + p\\)", "\\(ax + by + c = 0\\)", "\\(x = x_A + k\\,u_x\\)", "\\(\\vec{AP}=k\\cdot\\vec{AB}\\)"], ans: 0, chapter: "droite", difficulty: "facile", exp: "La forme <strong>explicite</strong> donne y tout seul d'un côté : \\(y = mx + p\\). On lit directement la pente m et l'ordonnée à l'origine p. (Les autres réponses sont d'autres façons d'écrire une droite : forme implicite, paramétrique, vectorielle.)"},
  {q: "Dans y = mx + p, p représente :", opts: ["L'ordonnée à l'origine", "L'abscisse à l'origine", "La pente", "Le vecteur directeur"], ans: 0, chapter: "droite", difficulty: "facile", exp: "p est l'ordonnée à l'origine."},
  {q: "Si m > 0, la droite :", opts: ["Monte vers la droite", "Descend vers la droite", "Est horizontale", "Est verticale"], ans: 0, chapter: "droite", difficulty: "facile", exp: "Pente positive = monte vers la droite."},
  {q: "La distance de \\(P(x_P\\,;\\,y_P)\\) à la droite \\(ax+by+c=0\\) est :", opts: ["\\(\\dfrac{|ax_P+by_P+c|}{\\sqrt{a^2+b^2}}\\)", "\\(ax_P+by_P+c\\)", "\\(\\sqrt{a^2+b^2}\\)", "\\(|ax_P+by_P+c|\\)"], ans: 0, chapter: "droite", difficulty: "intermediaire", exp: "\\(d = \\dfrac{|ax_P+by_P+c|}{\\sqrt{a^2+b^2}}\\)."}
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
  {q: "Si S(2;−1) est le sommet d'une parabole et A=3, la forme canonique est :", opts: ["f(x)=3(x−2)²−1","f(x)=3(x+2)²−1","f(x)=3(x−2)²+1","f(x)=−3(x−2)²−1"], ans: 0, chapter: "parabole", difficulty: "intermediaire", exp: "f(x)=A(x−α)²+β = 3(x−2)²−1."},
  {q: "La droite 4x−3y+6=0 a pour pente m =", opts: ["\\(\\dfrac{4}{3}\\)","\\(-\\dfrac{4}{3}\\)","\\(\\dfrac{3}{4}\\)","\\(-\\dfrac{3}{4}\\)"], ans: 0, chapter: "droite", difficulty: "facile",
    exp: "On lit les coefficients de \\(ax+by+c=0\\) :<br>\\(a=4\\)<br>\\(b=-3\\)<br>Puis :<br>\\(m=-\\dfrac{a}{b}=-\\dfrac{4}{-3}=\\dfrac{4}{3}\\)",
    formula: "\\(m=-\\dfrac{a}{b}\\)  (pour une droite écrite \\(ax+by+c=0\\))",
    simple: "💡 <strong>Astuce</strong> : la pente, c'est presque le vecteur directeur \\(\\vec{u}=\\begin{pmatrix}-b\\\\a\\end{pmatrix}\\), mais écrit en <strong>fraction</strong> (le bas divise le haut) au lieu d'une colonne : \\(m=\\dfrac{a}{-b}=-\\dfrac{a}{b}\\). Donc si tu connais le vecteur directeur, tu connais la pente : tu mets juste le bas du vecteur sous le haut. Attention au signe — il y a bien un moins."},
  {q: "Pour une parabole f(x)=x²−4x+7, l'abscisse du sommet est :", opts: ["x=2","x=−2","x=4","x=7"], ans: 0, chapter: "parabole", difficulty: "facile", exp: "\\(x_s = -\\dfrac{b}{2a} = \\dfrac{4}{2} = 2\\)."},
  {q: "Un point P est à l'extérieur d'un cercle si :", opts: ["d(P,C) > R","d(P,C) < R","d(P,C) = R","d(P,C) = 0"], ans: 0, chapter: "cercle", difficulty: "facile", exp: "P extérieur ⟺ d(P,C) > R."},
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
  {q: "Deux cercles de rayon 2, centrés en O(0;0) et en (5;0), sont :", opts: ["Extérieurs l'un à l'autre","Tangents extérieurement","Sécants","Tangents intérieurement"], ans: 0, chapter: "cercle", difficulty: "difficile", exp: "Distance des centres = 5 > R₁+R₂ = 4 : les cercles sont extérieurs, sans point commun."},
  {q: "Le sommet de la parabole y = 2x² − 8x + 5 est :", opts: ["S(2 ; −3)","S(−2 ; −3)","S(2 ; 3)","S(2 ; 5)"], ans: 0, chapter: "parabole", difficulty: "difficile",
    exp: "<strong>Étape 1 — l'abscisse</strong> du sommet (ici a=2, b=−8) :<br>\\(x_S=-\\dfrac{b}{2a}=-\\dfrac{-8}{2(2)}=\\dfrac{8}{4}=2\\)<br><br><strong>Étape 2 — l'ordonnée</strong>, en remplaçant x par 2 dans la fonction :<br>\\(y_S=2(2)^2-8(2)+5=8-16+5=-3\\)<br><br>Donc \\(S(2\\,;\\,-3)\\).",
    formula: "\\(x_S=-\\dfrac{b}{2a}\\)  puis  \\(y_S=f(x_S)\\)  (pour \\(y=ax^2+bx+c\\))",
    simple: "Pour une parabole écrite \\(y=ax^2+bx+c\\), le sommet (le point le plus haut ou le plus bas) se trouve en 2 temps. 1) Son x : tu fais \\(-\\dfrac{b}{2a}\\). 2) Son y : tu remets ce x dans la fonction et tu calcules. Ici on trouve x=2, puis en remplaçant on tombe sur y=−3."},
  {q: "La parabole de sommet S(1;2) passant par A(3;10) a pour coefficient :", opts: ["A = 2","A = 4","A = 3","A = 8"], ans: 0, chapter: "parabole", difficulty: "avance", exp: "\\(f(x)=A(x-1)^2+2\\) et \\(f(3)=10\\) : \\(4A+2=10 \\Rightarrow A=2\\)."},
  {q: "La parabole y = −(x+2)² + 4 coupe l'axe des abscisses en :", opts: ["x = 0 et x = −4","x = 2 et x = −2","x = −2 seulement","x = 4 et x = −4"], ans: 0, chapter: "parabole", difficulty: "difficile", exp: "\\(0=-(x+2)^2+4 \\Rightarrow (x+2)^2=4 \\Rightarrow x=0\\) ou \\(x=-4\\)."},
  {q: "La distance du point P(3;4) à la droite 2x−y+1=0 vaut :", opts: ["\\(\\dfrac{3}{\\sqrt5}=\\dfrac{3\\sqrt5}{5}\\)","\\(\\dfrac{3}{5}\\)","\\(\\sqrt5\\)","3"], ans: 0, chapter: "droite", difficulty: "difficile", exp: "\\(d=\\dfrac{|2(3)-4+1|}{\\sqrt{2^2+1^2}}=\\dfrac{3}{\\sqrt5}=\\dfrac{3\\sqrt5}{5}\\)."},
  {q: "La médiatrice du segment [AB] avec A(1;2) et B(5;6) est :", opts: ["x + y − 7 = 0","x − y + 1 = 0","y = x + 1","x + y + 7 = 0"], ans: 0, chapter: "droite", difficulty: "avance",
    exp: "<strong>Étape 1 — le milieu M de [AB]</strong> (moyenne des coordonnées) :<br>\\(x_M=\\dfrac{1+5}{2}=3\\)<br>\\(y_M=\\dfrac{2+6}{2}=4\\)<br>donc \\(M(3\\,;\\,4)\\)<br><br><strong>Étape 2 — la pente de [AB]</strong> :<br>\\(m_{AB}=\\dfrac{6-2}{5-1}=\\dfrac{4}{4}=1\\)<br><br><strong>Étape 3 — la pente de la médiatrice</strong> (perpendiculaire, donc \\(-\\dfrac{1}{m}\\)) :<br>\\(m'=-\\dfrac{1}{1}=-1\\)<br><br><strong>Étape 4 — l'équation</strong> par M avec la pente m' :<br>\\(y-4=-1(x-3)\\)<br>\\(y-4=-x+3\\)<br>\\(x+y-7=0\\)",
    formula: "Milieu : \\(M\\!\\left(\\dfrac{x_A+x_B}{2}\\,;\\,\\dfrac{y_A+y_B}{2}\\right)\\)  ·  Perpendiculaire : \\(m'=-\\dfrac{1}{m}\\)  ·  Droite par un point : \\(y-y_M=m'(x-x_M)\\)",
    simple: "Une <strong>médiatrice</strong>, c'est la droite qui coupe le segment [AB] en plein milieu, à angle droit (90°). Donc il te faut 2 choses : <strong>par où elle passe</strong> (le milieu M de AB) et <strong>son inclinaison</strong> (perpendiculaire à AB). « Perpendiculaire » = on retourne la pente et on change le signe : si AB monte avec une pente de 1, la médiatrice descend avec une pente de −1.",
    deep: "On part de zéro.<br>• <strong>Le milieu</strong> : pour trouver le point au centre de A et B, tu fais la moyenne — tu additionnes les deux x et tu divises par 2, pareil pour les y. Ici \\((1+5)/2=3\\) et \\((2+6)/2=4\\), donc M est en (3;4).<br>• <strong>La pente</strong> d'une droite = « de combien ça monte quand on avance ». On la calcule \\(\\dfrac{\\text{montée}}{\\text{avancée}}=\\dfrac{y_B-y_A}{x_B-x_A}\\). Ici \\(\\dfrac{4}{4}=1\\).<br>• <strong>Perpendiculaire</strong> : deux droites à angle droit ont des pentes dont le produit fait −1. Donc si AB a une pente 1, la médiatrice a pour pente −1 (car \\(1\\times(-1)=-1\\)).<br>• <strong>Écrire la droite</strong> : on connaît un point (M) et la pente (−1), on utilise \\(y-y_M=m'(x-x_M)\\), puis on range tout d'un côté pour obtenir \\(x+y-7=0\\)."},
  {q: "Les droites d₁ : 2x+3y−1=0 et d₂ : 3x−2y+4=0 sont :", opts: ["Perpendiculaires","Parallèles","Confondues","Sécantes non perpendiculaires"], ans: 0, chapter: "droite", difficulty: "avance", exp: "\\(m_1=-\\dfrac{2}{3}\\), \\(m_2=\\dfrac{3}{2}\\), \\(m_1\\cdot m_2=-1\\) → perpendiculaires."}];

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
  {front: "Équation d'une droite passant par A(x_A;y_A) avec pente m ?", back: "$$y - y_A = m(x - x_A)$$", chapter: "droite"},
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
        brief: "On remplace chaque lettre par la valeur du point : y_B = 8, y_A = 2, x_B = 3, x_A = 1.",
        more: "A(1 ; 2) donne x_A = 1 et y_A = 2. B(3 ; 8) donne x_B = 3 et y_B = 8. Regarde les lettres se transformer en nombres, à la même place.",
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
          T('rad','√') + T('pl','(') + T('sa','a²') + T('op3','+') + T('sb','b²') + T('pr',')')
        )
      },
      {
        brief: "On remplace les lettres par les valeurs : a=2, b=−1, c=1 (la droite) et x_P=3, y_P=4 (le point).",
        more: "On lit a, b, c dans 2x − y + 1 = 0. Regarde chaque lettre se retourner sur sa valeur.",
        eq: T('d','d') + T('eq','=') + FRAC(
          T('absL','|') + T('ta','2') + T('m1','·') + T('txp','3') + T('op1','+') + T('tb','(−1)') + T('m2','·') + T('typ','4') + T('op2','+') + T('tc','1') + T('absR','|'),
          T('rad','√') + T('pl','(') + T('sa','2²') + T('op3','+') + T('sb','(−1)²') + T('pr',')')
        )
      },
      {
        brief: "Un carré, c'est le nombre multiplié par lui-même : 2² se déplie en 2·2, et (−1)² en (−1)·(−1).",
        more: "C'est la définition de l'exposant 2. Regarde les carrés se déplier en produits.",
        eq: T('d','d') + T('eq','=') + FRAC(
          T('absL','|') + T('ta','2') + T('m1','·') + T('txp','3') + T('op1','+') + T('tb','(−1)') + T('m2','·') + T('typ','4') + T('op2','+') + T('tc','1') + T('absR','|'),
          T('rad','√') + T('pl','(') + T('e1','2') + T('x1','·') + T('e2','2') + T('op3','+') + T('f1','(−1)') + T('x2','·') + T('f2','(−1)') + T('pr',')')
        ),
        split: [{ from: 'sa', to: ['e1','x1','e2'] }, { from: 'sb', to: ['f1','x2','f2'] }]
      },
      {
        brief: "On calcule les produits : 2·3 = 6 et (−1)·4 = −4 en haut ; 2·2 = 4 et (−1)·(−1) = 1 en bas.",
        eq: T('d','d') + T('eq','=') + FRAC(
          T('absL','|') + T('t6','6') + T('op1','+') + T('tm4','(−4)') + T('op2','+') + T('tc','1') + T('absR','|'),
          T('rad','√') + T('pl','(') + T('d4','4') + T('op3','+') + T('d1','1') + T('pr',')')
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
          T('rad','√') + T('d5','5')
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
        eq: T('gx','(x−2)²','tx') + T('m4','− 4','tk') + T('pA','+','op') + T('gy','(y+3)²','ty') + T('m9','− 9','tk') + T('aL4','+ 4','tk') + T('aL9','+ 9','tk') + T('eq','=','op') + T('c12b','12','tk') + T('aR4','+ 4','tk') + T('aR9','+ 9','tk')
      },
      {
        brief: "À gauche tout s'annule (−4+4=0, −9+9=0). À droite : 12 + 4 + 9 = 25.",
        annot: "\\(12 + 4 + 9 = 25\\)",
        eq: T('gx','(x−2)²','tx') + T('pA','+','op') + T('gy','(y+3)²','ty') + T('eq','=','op') + T('r25','25','atok-result'),
        annihilate: [['m4','aL4'], ['m9','aL9']],
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
        eq: T('gx','(x−2)²','tx') + T('m4','− 4','tk') + T('pA','+','op') + T('gy','(y+3)²','ty') + T('m9','− 9','tk') + T('aL4','+ 4','tadd') + T('aL9','+ 9','tadd') + T('eq','=','op') + T('c12b','12','tk') + T('aR4','+ 4','tadd') + T('aR9','+ 9','tadd')
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
