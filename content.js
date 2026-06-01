/* ============================================================
   content.js — Contenu HTML statique des sections
   Ce fichier NE CHANGE JAMAIS → ne pas envoyer à Claude
   ============================================================ */

const SECTIONS_CONTENT = {
  synthese: `<div id="synthese" class="section active">
  <div style="text-align:right; margin-bottom:1.5rem;">
    <button onclick="window.print()" style="padding:10px 20px; background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:10px; color:var(--text-secondary); cursor:pointer; font-size:14px; font-weight:600;">🖨️ Imprimer la synthèse</button>
  </div>
  <div class="synth-section vecteur">
    <h2>Chapitre 1 — Calcul vectoriel</h2>
    <p>Un <strong>vecteur</strong> \\(\\vec{AB}\\) représente la <strong>translation</strong> qui amène le point A sur le point B. Contrairement à un segment, il est <em>orienté</em> : on peut le voir comme un « segment fléché ».</p>

    <div class="grid2" style="margin-top:1.5rem;">
      <div class="card vecteur">
        <h3>1. Définition &amp; caractéristiques</h3>
        <div class="formula-main vecteur">$$\\vec{AB} : A \\longrightarrow B$$</div>
        <p>Pour deux points distincts A et B, le vecteur \\(\\vec{AB}\\) est défini par :</p>
        <ul>
          <li><strong>Direction</strong> : celle de la droite (AB).</li>
          <li><strong>Sens</strong> : de A vers B.</li>
          <li><strong>Norme</strong> : la longueur du segment [AB], notée \\(\\|\\vec{AB}\\|\\).</li>
        </ul>
        <p class="note">A est l'<strong>origine</strong>, B l'<strong>extrémité</strong>. Une même translation possède une <strong>infinité de représentants</strong>.</p>
        <div class="simple-exp-box">
          <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Comprendre simplement</button>
          <div class="simple-exp-content">Imagine une flèche qui dit « pars d'ici, avance dans cette direction, sur cette longueur ». Peu importe où tu la dessines : tant qu'elle a la même direction, le même sens et la même longueur, c'est <em>le même</em> vecteur. Deux vecteurs sont <strong>égaux</strong> exactement dans ce cas.</div>
        </div>
      </div>

      <div class="card vecteur">
        <h3>2. Vecteur nul &amp; vecteur opposé</h3>
        <div class="formula-main vecteur">$$\\vec{AA} = \\vec{0} \\qquad -\\vec{AB} = \\vec{BA}$$</div>
        <p>Le <strong>vecteur nul</strong> \\(\\vec{0}\\) a son origine confondue avec son extrémité : il n'a ni direction ni sens.</p>
        <p>L'<strong>opposé</strong> \\(-\\vec{u}\\) garde la même direction et la même norme, mais inverse le <strong>sens</strong>.</p>
        <div class="simple-exp-box">
          <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Comprendre simplement</button>
          <div class="simple-exp-content">L'opposé, c'est « faire demi-tour » : \\(-\\vec{AB}\\) part de B et revient en A, c'est-à-dire \\(\\vec{BA}\\). Le vecteur nul, c'est « ne pas bouger ».</div>
        </div>
      </div>
    </div>

    <div class="grid2" style="margin-top:1.5rem;">
      <div class="card vecteur">
        <h3>3. Additionner des vecteurs</h3>
        <div class="formula-main vecteur">$$\\vec{AB} + \\vec{BC} = \\vec{AC}$$</div>
        <p><strong>Relation de Chasles</strong> : on enchaîne les vecteurs bout à bout (l'extrémité de l'un = l'origine du suivant). Elle s'étend : \\(\\vec{AB}+\\vec{BC}+\\vec{CD}=\\vec{AD}\\).</p>
        <div class="formula-main vecteur">$$\\vec{OA} + \\vec{OB} = \\vec{OC}$$</div>
        <p class="note"><strong>Règle du parallélogramme</strong> (deux vecteurs de même origine) : vrai si et seulement si OACB est un parallélogramme. L'addition est <strong>commutative</strong>.</p>
      </div>

      <div class="card vecteur">
        <h3>4. Soustraire &amp; multiplier par un réel</h3>
        <div class="formula-main vecteur">$$\\vec{u} - \\vec{v} = \\vec{u} + (-\\vec{v})$$</div>
        <div class="formula-main vecteur">$$\\|k\\,\\vec{v}\\| = |k|\\cdot\\|\\vec{v}\\|$$</div>
        <p>Multiplier \\(\\vec{v}\\) par un réel \\(k\\) donne un vecteur de <strong>même direction</strong> ; de sens <strong>identique si \\(k>0\\)</strong>, <strong>opposé si \\(k<0\\)</strong> ; et de norme multipliée par \\(|k|\\).</p>
        <div class="simple-exp-box">
          <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Comprendre simplement</button>
          <div class="simple-exp-content">\\(2\\vec{v}\\) = « deux fois plus long, même direction ». \\(-\\vec{v}\\) = « demi-tour ». \\(-3\\vec{v}\\) = « trois fois plus long et dans l'autre sens ».</div>
        </div>
      </div>
    </div>

    <div class="grid2" style="margin-top:1.5rem;">
      <div class="card vecteur">
        <h3>5. Colinéarité &amp; configurations</h3>
        <div class="formula-main vecteur">$$\\vec{u} = k\\,\\vec{v}$$</div>
        <p>\\(\\vec{u}\\) et \\(\\vec{v}\\) (non nuls) sont <strong>colinéaires</strong> s'il existe un réel non nul \\(k\\) tel que \\(\\vec{u}=k\\,\\vec{v}\\). On en déduit :</p>
        <ul>
          <li><strong>Alignement</strong> : A, B, C alignés ⟺ \\(\\vec{AB}=k\\,\\vec{AC}\\).</li>
          <li><strong>Parallélisme</strong> : (AB)∥(CD) ⟺ \\(\\vec{AB}=k\\,\\vec{CD}\\).</li>
          <li><strong>Milieu</strong> : M milieu de [AB] ⟺ \\(\\vec{AM}=\\tfrac{1}{2}\\vec{AB}\\).</li>
        </ul>
      </div>

      <div class="card vecteur">
        <h3>6. Combinaison linéaire &amp; composantes</h3>
        <div class="formula-main vecteur">$$\\vec{w} = a\\,\\vec{u} + b\\,\\vec{v}$$</div>
        <p>Une <strong>combinaison linéaire</strong> (« combili ») de \\(\\vec{u}\\) et \\(\\vec{v}\\) : les réels a et b ne sont pas tous les deux nuls.</p>
        <div class="formula-main vecteur">$$\\vec{AB} = \\begin{pmatrix} x_B - x_A \\\\ y_B - y_A \\end{pmatrix}$$</div>
        <p class="note">Dans un repère, un vecteur se définit par ses <strong>composantes</strong> : la variation horizontale et la variation verticale entre l'origine et l'extrémité.</p>
      </div>
    </div>
  </div>
  <div class="synth-section droite">
    <h2>Chapitre I — Équations de droites</h2>
    <p>Une <strong>droite</strong> peut être exprimée de 3 façons différentes selon le contexte.</p>
    
    <div style="text-align:center; margin:1.5rem 0;">
      <svg width="420" height="280" viewBox="0 0 420 280" style="background:var(--bg-main); border-radius:12px; border:2px solid var(--border-subtle); display:block; margin:0 auto;">
        <defs>
          <marker id="arr" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#a78bfa"/>
          </marker>
        </defs>
        <!-- Axes -->
        <line x1="30" y1="250" x2="400" y2="250" stroke="#374151" stroke-width="1.5"/>
        <line x1="30" y1="10" x2="30" y2="250" stroke="#374151" stroke-width="1.5"/>
        <!-- Graduations axe x -->
        <text x="100" y="265" text-anchor="middle" font-size="10" fill="#6b7280">1</text>
        <text x="170" y="265" text-anchor="middle" font-size="10" fill="#6b7280">2</text>
        <text x="240" y="265" text-anchor="middle" font-size="10" fill="#6b7280">3</text>
        <text x="310" y="265" text-anchor="middle" font-size="10" fill="#6b7280">4</text>
        <!-- La droite AB -->
        <line x1="60" y1="220" x2="360" y2="80" stroke="#f59e0b" stroke-width="3"/>
        <!-- Point A -->
        <circle cx="60" cy="220" r="6" fill="#e74c3c"/>
        <text x="45" y="240" font-size="13" fill="#e74c3c" font-weight="bold">A(1;1)</text>
        <!-- Point B -->
        <circle cx="360" cy="80" r="6" fill="#34d399"/>
        <text x="365" y="75" font-size="13" fill="#34d399" font-weight="bold">B(4;5)</text>
        <!-- Triangle Δx Δy -->
        <line x1="60" y1="220" x2="360" y2="220" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="6,4"/>
        <line x1="360" y1="220" x2="360" y2="80" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="6,4"/>
        <text x="210" y="242" text-anchor="middle" font-size="12" fill="#94a3b8">Δx = 3</text>
        <text x="385" y="155" font-size="12" fill="#94a3b8">Δy = 4</text>
        <!-- Flèche vecteur directeur (étiquette décalée nettement sous la droite) -->
        <line x1="140" y1="190" x2="200" y2="165" stroke="#a78bfa" stroke-width="2.5" marker-end="url(#arr)"/>
        <rect x="150" y="197" width="150" height="22" rx="5" fill="#1a1d2e" opacity="0.85"/>
        <text x="225" y="212" text-anchor="middle" font-size="12" fill="#a78bfa" font-weight="bold"><tspan font-style="italic">u</tspan> vecteur directeur</text>
        <!-- Pente en haut à gauche, avec de vraies barres de fraction -->
        <rect x="30" y="12" width="128" height="48" rx="8" fill="#1e2235" stroke="rgba(251,191,36,0.4)" stroke-width="1" opacity="0.97"/>
        <g font-size="13" fill="#fbbf24" font-weight="bold">
          <text x="40" y="41">m =</text>
          <text x="86" y="31" text-anchor="middle">Δy</text>
          <line x1="71" y1="35" x2="101" y2="35" stroke="#fbbf24" stroke-width="1.2"/>
          <text x="86" y="50" text-anchor="middle">Δx</text>
          <text x="110" y="41">=</text>
          <text x="130" y="31" text-anchor="middle">4</text>
          <line x1="123" y1="35" x2="137" y2="35" stroke="#fbbf24" stroke-width="1.2"/>
          <text x="130" y="50" text-anchor="middle">3</text>
        </g>
      </svg>
    </div>
    
    <div class="simple-exp-box">
      <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Comprendre simplement</button>
      <div class="simple-exp-content">
        Ce graphique montre une droite passant par deux points A et B. La pente \\(m=\\dfrac{\\Delta y}{\\Delta x}=\\dfrac{4}{3}\\) est positive : la droite monte de gauche à droite (quand on avance de 3 vers la droite, on monte de 4). Le vecteur directeur \\(\\vec{u}\\) est la flèche qui indique la direction suivie par la droite.
      </div>
    </div>
    
    <div class="grid2" style="margin-top:1.5rem;">
      <div class="card droite">
        <h3>1. Équation vectorielle</h3>
        <div class="formula-main droite">$$\\vec{AP} = k \\cdot \\vec{AB} = k \\cdot \\vec{u}$$</div>
        <p style="font-size:15px; color:var(--text-secondary); margin-top:1rem;"><em>Explication :</em> Cette équation signifie que tout point P de la droite peut être obtenu en partant du point A et en ajoutant un multiple k du vecteur directeur \\(\\vec{u}\\). Le vecteur \\(\\vec{u}\\) est appelé <strong>vecteur directeur</strong> de la droite car il donne la direction de celle-ci.</p>
        
        <div class="simple-exp-box">
          <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Comprendre simplement</button>
          <div class="simple-exp-content">
            Imagine que tu pars d'un point A et que tu avances dans une direction donnée (le vecteur u). Si tu avances de 1 pas, tu arrives à un certain point. Si tu avances de 2 pas, tu vas plus loin dans la même direction. k représente le "nombre de pas" — il peut être n'importe quel nombre réel, positif ou négatif. Pourquoi positif ET négatif ? Parce que si k est négatif, on recule dans la direction opposée. Ainsi, en faisant varier k de −∞ à +∞, on obtient TOUS les points de la droite. C'est pour ça qu'on appelle ça l'équation vectorielle : elle décrit la droite entière avec un seul paramètre k.
          </div>
        </div>
      </div>
      <div class="card droite">
        <h3>2. Équations paramétriques</h3>
        <div class="formula-main droite">$$\\begin{cases} x = x_A + k \\cdot u_x \\\\ y = y_A + k \\cdot u_y \\end{cases}$$</div>
        <p style="font-size:15px; color:var(--text-secondary); margin-top:1rem;"><em>Explication :</em> Ces équations donnent les coordonnées (x ; y) de tout point P de la droite en fonction du paramètre k. Le point A(x_A ; y_A) est un point connu de la droite, et (u_x ; u_y) sont les composantes du vecteur directeur \\(\\vec{u}\\). Quand k varie, on obtient tous les points de la droite.</p>
        
        <div class="simple-exp-box">
          <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Comprendre simplement</button>
          <div class="simple-exp-content">
            Ces deux équations te donnent les coordonnées x et y de n'importe quel point de la droite. k est comme un compteur : quand k change, tu te déplaces le long de la droite !
          </div>
        </div>
      </div>
      <div class="card droite">
        <h3>3a. Forme implicite</h3>
        <div class="formula-main droite">$$ax + by + c = 0$$</div>
        <p style="font-size:15px; color:var(--text-secondary); margin-top:1rem;"><em>Explication :</em> Cette forme est très utile car elle permet de trouver facilement :</p>
        <ul>
          <li><strong>Vecteur normal</strong> \\(\\vec{n} = \\begin{pmatrix} a \\\\ b \\end{pmatrix}\\) : perpendiculaire à la droite</li>
          <li><strong>Vecteur directeur</strong> \\(\\vec{u} = \\begin{pmatrix} -b \\\\ a \\end{pmatrix}\\) : parallèle à la droite (donne sa direction)</li>
          <li>\\(\\vec{n} \\cdot \\vec{u} = a(-b) + b(a) = 0\\) → ils sont bien orthogonaux.</li>
        </ul>
        
        <div class="simple-exp-box">
          <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Comprendre simplement</button>
          <div class="simple-exp-content">
            Cette forme est comme une recette : elle cache deux vecteurs utiles. Le vecteur normal \\(\\vec{n}=(a;b)\\) est perpendiculaire à la droite. Le vecteur directeur \\(\\vec{u}=(-b;a)\\) est parallèle à la droite — il pointe dans sa direction. Astuce : pour passer de \\(\\vec{n}\\) à \\(\\vec{u}\\), on échange les composantes et on change un signe !
          </div>
        </div>
      </div>
      <div class="card droite">
        <h3>3b. Forme explicite</h3>
        <div class="formula-main droite">$$y = mx + p$$</div>
        <p style="font-size:15px; color:var(--text-secondary); margin-top:1rem;"><em>Explication :</em> Cette forme exprime y en fonction de x :</p>
        <ul>
          <li><strong>m</strong> = pente de la droite (coefficient directeur)</li>
          <li><strong>p</strong> = ordonnée à l'origine (point où la droite coupe l'axe y)</li>
          <li><strong>Vecteur directeur</strong> \\(\\vec{u} = \\begin{pmatrix} 1 \\\\ m \\end{pmatrix}\\)</li>
          <li>Si m > 0 : droite monte vers la droite</li>
          <li>Si m &lt; 0 : droite descend vers la droite</li>
          <li>Si m = 0 : droite horizontale</li>
        </ul>
        
        <div class="simple-exp-box">
          <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Comprendre simplement</button>
          <div class="simple-exp-content">
            C'est la forme la plus simple ! m te dit si la droite monte ou descend, et p te dit où elle coupe l'axe vertical. C'est comme l'équation d'une pente de toboggan !
          </div>
        </div>
      </div>
    </div>

    <p style="margin-top:1.5rem; font-weight:600; font-size:18px;">Pente et inclinaison :</p>
    <div class="key-rule droite">
      <div class="formula-main droite">$$m = \\frac{u_y}{u_x} = \\frac{y_B - y_A}{x_B - x_A} \\quad | \\quad \\alpha = \\arctan(m)$$</div>
      <p><em>Explication détaillée :</em></p>
      <ul>
        <li>La pente m se calcule en divisant la variation verticale par la variation horizontale</li>
        <li>Si on connaît deux points A(x_A ; y_A) et B(x_B ; y_B) de la droite : \\(m = \\frac{y_B - y_A}{x_B - x_A}\\)</li>
        <li>L'angle α que fait la droite avec l'axe horizontal est donné par α = arctan(m)</li>
        <li>Attention : si x_B = x_A, la droite est verticale et la pente n'est pas définie</li>
      </ul>
      
      <div class="simple-exp-box">
        <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Comprendre simplement</button>
        <div class="simple-exp-content">
          La pente \\(m\\) te dit « combien la droite monte (ou descend) à chaque pas vers la droite ». Si \\(m=2\\), ça veut dire que quand tu avances de 1 unité vers la droite, tu montes de 2 unités. Si \\(m=-3\\), quand tu avances de 1, tu descends de 3. Pour calculer \\(m\\) entre deux points A et B, tu fais : \\(m=\\dfrac{y_B-y_A}{x_B-x_A}\\) (la hauteur gagnée divisée par la largeur parcourue). Pourquoi diviser ? Parce que si tu avances de 3 unités et que tu montes de 6, la pente est \\(\\dfrac{6}{3}=2\\) (tu montes de 2 par unité). Attention : si les deux points sont à la même hauteur (\\(\\Delta y=0\\)), la droite est horizontale et \\(m=0\\). Si les deux points ont la même abscisse (\\(\\Delta x=0\\)), la droite est verticale et la pente n'est pas définie (division par 0 impossible).
        </div>
      </div>
    </div>

    <p style="margin-top:1.5rem; font-weight:600; font-size:18px;">Distance d'un point à une droite :</p>
    <div class="key-rule droite">
      <div class="formula-main droite">$$d(P, d) = \\frac{|ax_P + by_P + c|}{\\sqrt{a^2 + b^2}}$$</div>
      <p><em>Explication détaillée :</em></p>
      <ul>
        <li>Pour un point P(x_P ; y_P) et une droite d ≡ ax + by + c = 0</li>
        <li>La distance est la valeur absolue de l'expression divisée par la norme du vecteur normal</li>
        <li>Cette formule est très utile pour vérifier si un point est sur une droite (distance = 0)</li>
        <li>Elle permet aussi de trouver des droites parallèles à une distance donnée</li>
      </ul>
      
      <div class="simple-exp-box">
        <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Comprendre simplement</button>
        <div class="simple-exp-content">
          Cette formule calcule la distance la plus courte entre un point et une ligne. C'est comme mesurer avec une règle la distance d'un point à une ligne, mais de façon mathématique !
        </div>
      </div>
    </div>

    <p style="margin-top:1.5rem; font-weight:600; font-size:18px;">Positions relatives :</p>
    
    <div style="text-align:center; margin:1.5rem 0;">
      <svg width="280" height="180" viewBox="0 0 280 180" style="background:var(--bg-main); border-radius:10px; border:2px solid var(--border-subtle);">
        <line x1="30" y1="60" x2="250" y2="60" stroke="#f59e0b" stroke-width="3"/>
        <line x1="30" y1="120" x2="250" y2="120" stroke="#10b981" stroke-width="3"/>
        <text x="140" y="50" text-anchor="middle" font-size="11" fill="#f59e0b" font-weight="bold">droite 1</text>
        <text x="140" y="140" text-anchor="middle" font-size="11" fill="#10b981" font-weight="bold">droite 2</text>
        <text x="140" y="90" text-anchor="middle" font-size="12" fill="#e2e8f0" font-weight="bold">PARALLÈLES</text>
        <text x="140" y="105" text-anchor="middle" font-size="10" fill="#94a3b8">même pente, ne se rencontrent jamais</text>
      </svg>
    </div>
    
    <div style="text-align:center; margin:1.5rem 0;">
      <svg width="280" height="180" viewBox="0 0 280 180" style="background:var(--bg-main); border-radius:10px; border:2px solid var(--border-subtle);">
        <line x1="30" y1="140" x2="250" y2="40" stroke="#f59e0b" stroke-width="3"/>
        <line x1="30" y1="40" x2="250" y2="140" stroke="#e74c3c" stroke-width="3"/>
        <circle cx="140" cy="90" r="4" fill="#e2e8f0"/>
        <text x="140" y="80" text-anchor="middle" font-size="10" fill="#e2e8f0">intersection</text>
        <text x="140" y="30" text-anchor="middle" font-size="12" fill="#e2e8f0" font-weight="bold">PERPENDICULAIRES</text>
        <text x="140" y="160" text-anchor="middle" font-size="10" fill="#94a3b8">se croisent à angle droit (90°)</text>
      </svg>
    </div>
    
    <ul>
      <li><strong>Parallèles</strong> : vecteurs directeurs colinéaires → \\(u_x \\cdot v_y - u_y \\cdot v_x = 0\\) (ou m = m')</li>
      <li><strong>Perpendiculaires</strong> : \\(m \\cdot m' = -1\\) (pentes inverses et opposées)</li>
      <li><strong>Sécantes</strong> : on résout le système des deux équations</li>
    </ul>

    <p style="margin-top:1.5rem; font-weight:600; font-size:18px;">Vecteur normal :</p>
    <p>Pour d ≡ ax + by + c = 0, le vecteur normal est \\(\\vec{n} = (a ; b)\\) (perpendiculaire à la droite).</p>
    <p><em>Explication :</em> Le vecteur normal est perpendiculaire à la droite. Il est très utile pour :</p>
    <ul>
      <li>Trouver l'équation d'une droite perpendiculaire</li>
      <li>Calculer la distance d'un point à la droite</li>
      <li>Vérifier si deux droites sont perpendiculaires (leurs vecteurs normaux sont colinéaires)</li>
    </ul>
    
    <div class="simple-exp-box">
      <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Comprendre simplement</button>
      <div class="simple-exp-content">
        Le vecteur normal est une flèche qui pointe perpendiculairement à la droite, comme si tu posais une règle à angle droit sur la ligne !
      </div>
    </div>
  </div>

  <div class="synth-section cercle">
    <h2>Chapitre II — Cercle</h2>
    <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:12px; margin-bottom:2rem;">
      <div style="background:rgba(96,165,250,0.08); border:1px solid rgba(96,165,250,0.3); border-radius:12px; padding:1rem; text-align:center;">
        <div style="font-size:28px; margin-bottom:0.5rem;">📍</div>
        <div style="font-size:13px; font-weight:700; color:var(--color-cercle);">Centre</div>
        <div style="font-size:12px; color:var(--text-secondary); margin-top:4px;">C(x₀ ; y₀)</div>
      </div>
      <div style="background:rgba(96,165,250,0.08); border:1px solid rgba(96,165,250,0.3); border-radius:12px; padding:1rem; text-align:center;">
        <div style="font-size:28px; margin-bottom:0.5rem;">📏</div>
        <div style="font-size:13px; font-weight:700; color:var(--color-cercle);">Rayon</div>
        <div style="font-size:12px; color:var(--text-secondary); margin-top:4px;">R > 0</div>
      </div>
      <div style="background:rgba(96,165,250,0.08); border:1px solid rgba(96,165,250,0.3); border-radius:12px; padding:1rem; text-align:center;">
        <div style="font-size:28px; margin-bottom:0.5rem;">🔵</div>
        <div style="font-size:13px; font-weight:700; color:var(--color-cercle);">Équation</div>
        <div style="font-size:12px; color:var(--text-secondary); margin-top:4px;">(x-x₀)²+(y-y₀)²=R²</div>
      </div>
    </div>
    <p>Un <strong>cercle</strong> de centre C(x₀ ; y₀) et de rayon R est l'ensemble des points à distance R du point C.</p>
    
    <div style="text-align:center; margin:1.5rem 0;">
      <svg width="200" height="200" viewBox="0 0 200 200" style="background:var(--bg-main); border-radius:10px; border:2px solid var(--border-subtle);">
        <circle cx="100" cy="100" r="70" fill="none" stroke="#3b82f6" stroke-width="3"/>
        <circle cx="100" cy="100" r="4" fill="#e74c3c"/>
        <line x1="100" y1="100" x2="170" y2="100" stroke="#e74c3c" stroke-width="2" stroke-dasharray="5,5"/>
        <text x="100" y="85" text-anchor="middle" font-size="12" fill="#e2e8f0" font-weight="bold">C (centre)</text>
        <text x="135" y="95" text-anchor="middle" font-size="11" fill="#e74c3c">R (rayon)</text>
        <circle cx="170" cy="100" r="3" fill="#3b82f6"/>
        <text x="170" y="120" text-anchor="middle" font-size="10" fill="#3b82f6">P (point)</text>
      </svg>
    </div>
    
    <div class="formula-main cercle">$$(x - x_0)^2 + (y - y_0)^2 = R^2$$</div>
    
    <p><em>Explication :</em> Cette forme est la plus intuitive. Elle montre directement :</p>
    <ul>
      <li>Le centre du cercle : C(x₀ ; y₀)</li>
      <li>Le rayon du cercle : R</li>
      <li>Tout point (x ; y) du cercle satisfait cette équation</li>
      <li>Si x₀ = 0 et y₀ = 0 (centre à l'origine) : \\(x^2 + y^2 = R^2\\)</li>
    </ul>
    
    <div class="simple-exp-box">
      <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Comprendre simplement</button>
      <div class="simple-exp-content">
        Cette formule dit : si tu prends un point (x,y) et que tu calcules sa distance au centre (x₀,y₀), cette distance doit être égale au rayon R. C'est comme mesurer avec une règle : la distance du centre au bord est toujours la même !
      </div>
    </div>
    
    <p>Si le cercle est centré à l'origine : \\(x^2 + y^2 = R^2\\)</p>
    
    <div class="simple-exp-box">
      <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Comprendre simplement</button>
      <div class="simple-exp-content">
        Quand le centre est au point (0,0) (c'est-à-dire au milieu de la feuille), la formule devient plus simple. C'est comme si ton rond est parfaitement centré sur ta feuille !
      </div>
    </div>
    
    <div class="key-rule cercle">
      <h3>Forme développée</h3>
      <div class="formula-main cercle">$$x^2 + y^2 + ax + by + c = 0$$</div>
      <p><em>Explication :</em> Cette forme est obtenue en développant la forme canonique. Pour retrouver le centre et le rayon :</p>
      <ul>
        <li><strong>Centre</strong> : \\(C\\left(\\frac{-a}{2} ; \\frac{-b}{2}\\right)\\)</li>
        <li><strong>Rayon</strong> : \\(R = \\frac{\\sqrt{a^2 + b^2 - 4c}}{2}\\)</li>
        <li>Cette forme est utile quand on cherche l'équation d'un cercle passant par plusieurs points</li>
      </ul>
      
      <div class="simple-exp-box">
        <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Comprendre simplement</button>
        <div class="simple-exp-content">
          Cette formule est un peu plus compliquée mais elle sert quand tu connais plusieurs points du cercle. C'est comme si tu as 3 points sur un rond et tu veux trouver où est le centre et quelle est la taille du rond. Les lettres a, b, c sont comme des indices cachés qui te donnent ces informations !
        </div>
      </div>
    </div>
    
    <p style="margin-top:1.5rem; font-weight:600; font-size:18px;">Condition d'existence :</p>
    <ul>
      <li><strong>$a^2 + b^2 - 4c > 0$</strong> → cercle avec centre \\(C\\left(\\frac{-a}{2} ; \\frac{-b}{2}\\right)\\) et rayon \\(R = \\frac{\\sqrt{a^2 + b^2 - 4c}}{2}\\)<br><em>Explication :</em> Le rayon est un nombre réel positif, donc on peut tracer le cercle.</li>
      
      <div class="simple-exp-box">
        <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Comprendre simplement</button>
        <div class="simple-exp-content">
          Quand ce calcul donne un nombre positif, ça veut dire que le cercle existe vraiment ! C'est comme si tu dis "oui, je peux dessiner ce rond parce qu'il a une taille positive".
        </div>
      </div>
      
      <li><strong>\\(a^2 + b^2 - 4c = 0\\)</strong> → point unique \\(C\\left(\\frac{-a}{2} ; \\frac{-b}{2}\\right)\\), pas de cercle<br><em>Explication :</em> Le rayon serait R = 0, donc tous les points se réduisent au centre uniquement.</li>
      
      <div class="simple-exp-box">
        <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Comprendre simplement</button>
        <div class="simple-exp-content">
          Si le résultat est 0, ça veut dire que le cercle est si petit qu'il n'est plus qu'un point ! C'est comme si ton rond est réduit à un seul point au milieu.
        </div>
      </div>
      
      <li><strong>\\(a^2 + b^2 - 4c &lt; 0\\)</strong> → impossible, pas de lieu géométrique<br><em>Explication :</em> Le rayon serait √(nombre négatif), ce qui n'existe pas dans les réels. Aucun point ne satisfait l'équation.</li>
      
      <div class="simple-exp-box">
        <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Comprendre simplement</button>
        <div class="simple-exp-content">
          Si le résultat est négatif, c'est impossible ! Tu ne peux pas avoir un cercle avec une taille négative. C'est comme essayer de mesurer une distance négative : ça n'existe pas !
        </div>
      </div>
    </ul>
    
    <p style="margin-top:1.5rem; font-weight:600; font-size:18px;">Cercle passant par 3 points :</p>
    <p><strong>Méthode détaillée avec exemple complet :</strong></p>
    <p>Trouvons l'équation du cercle passant par A(−1 ; −4), B(−10 ; 5), C(2 ; 1)</p>
    <ol>
      <li>Écrire la forme développée : \\(x^2 + y^2 + ax + by + c = 0\\)</li>
      <li>Substituer les coordonnées des 3 points dans cette équation :</li>
      <ul>
        <li><strong>A(−1 ; −4)</strong> : \\((−1)^2 + (−4)^2 + a(−1) + b(−4) + c = 0\\) → \\(1 + 16 − a − 4b + c = 0\\) → \\(−a − 4b + c = −17\\)</li>
        <li><strong>B(−10 ; 5)</strong> : \\((−10)^2 + 5^2 + a(−10) + b(5) + c = 0\\) → \\(100 + 25 − 10a + 5b + c = 0\\) → \\(−10a + 5b + c = −125\\)</li>
        <li><strong>C(2 ; 1)</strong> : \\(2^2 + 1^2 + a(2) + b(1) + c = 0\\) → \\(4 + 1 + 2a + b + c = 0\\) → \\(2a + b + c = −5\\)</li>
      </ul>
      <li>On obtient un système de 3 équations à 3 inconnues (a, b, c) :</li>
      $$\\begin{cases} −a − 4b + c = −17 \\quad (1) \\\\ −10a + 5b + c = −125 \\quad (2) \\\\ 2a + b + c = −5 \\quad (3) \\end{cases}$$
      <li>Résoudre le système par substitution ou combinaison linéaire :</li>
      <ul>
        <li>De (3) : \\(c = −5 − 2a − b\\)</li>
        <li>Substituons dans (1) : \\(−a − 4b − 5 − 2a − b = −17\\) → \\(−3a − 5b = −12\\) → \\(3a + 5b = 12 \\quad (4)\\)</li>
        <li>Substituons dans (2) : \\(−10a + 5b − 5 − 2a − b = −125\\) → \\(−12a + 4b = −120\\) → \\(3a − b = 30 \\quad (5)\\)</li>
        <li>De (5) : \\(b = 3a − 30\\)</li>
        <li>Substituons dans (4) : \\(3a + 5(3a − 30) = 12\\) → \\(3a + 15a − 150 = 12\\) → \\(18a = 162\\) → \\(a = 9\\)</li>
        <li>Alors \\(b = 3(9) − 30 = 27 − 30 = −3\\)</li>
        <li>Et \\(c = −5 − 2(9) − (−3) = −5 − 18 + 3 = −20\\)</li>
      </ul>
      <li>Vérifier que \\(a^2 + b^2 − 4c > 0\\) (condition d'existence) :</li>
      $$9^2 + (−3)^2 − 4(−20) = 81 + 9 + 80 = 170 > 0$$ ✓
      <li>Écrire l'équation finale du cercle :</li>
      $$x^2 + y^2 + 9x − 3y − 20 = 0$$
      <li>Trouver le centre et le rayon :</li>
      <ul>
        <li>Centre : \\(C\\left(\\frac{-9}{2} ; \\frac{3}{2}\\right) = C(−4.5 ; 1.5)\\)</li>
        <li>Rayon : \\(R = \\frac{\\sqrt{170}}{2} \\approx 6.52\\)</li>
      </ul>
    </ol>
    
    <div class="simple-exp-box">
      <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Comprendre simplement</button>
      <div class="simple-exp-content">
        Imagine que tu as 3 points sur une feuille et tu veux dessiner le cercle qui passe par ces 3 points. C'est comme si tu as 3 points et tu veux trouver le rond qui touche exactement ces 3 points. Tu utilises ces 3 points pour calculer où est le centre et quelle est la taille du rond !
      </div>
    </div>
  </div>

  <div class="synth-section parabole">
    <h2>Chapitre III — Parabole</h2>
    <p>Une <strong>parabole</strong> est l'ensemble des points équidistants d'un point fixe (le <em>foyer</em> F) et d'une droite (la <em>directrice</em> d).</p>
    
    <div style="text-align:center; margin:1.5rem 0;">
      <svg width="250" height="200" viewBox="0 0 250 200" style="background:var(--bg-main); border-radius:10px; border:2px solid var(--border-subtle);">
        <line x1="20" y1="30" x2="230" y2="30" stroke="#95a5a6" stroke-width="2"/>
        <text x="235" y="35" font-size="11" fill="#94a3b8">directrice</text>
        <circle cx="125" cy="100" r="4" fill="#e74c3c"/>
        <text x="125" y="90" text-anchor="middle" font-size="11" fill="#e74c3c" font-weight="bold">F (foyer)</text>
        <circle cx="125" cy="65" r="4" fill="#27ae60"/>
        <text x="125" y="55" text-anchor="middle" font-size="11" fill="#27ae60" font-weight="bold">S (sommet)</text>
        <path d="M 30 180 Q 125 20 220 180" fill="none" stroke="#10b981" stroke-width="3"/>
        <line x1="125" y1="65" x2="125" y2="100" stroke="#e74c3c" stroke-width="1" stroke-dasharray="3,3"/>
        <line x1="125" y1="65" x2="125" y2="30" stroke="#95a5a6" stroke-width="1" stroke-dasharray="3,3"/>
        <circle cx="80" cy="140" r="3" fill="#10b981"/>
        <text x="80" y="155" text-anchor="middle" font-size="10" fill="#10b981">P (point)</text>
        <line x1="80" y1="140" x2="125" y2="100" stroke="#e74c3c" stroke-width="1" stroke-dasharray="3,3"/>
        <line x1="80" y1="140" x2="80" y2="30" stroke="#95a5a6" stroke-width="1" stroke-dasharray="3,3"/>
      </svg>
    </div>
    
    <div class="key-rule parabole">
      <h3>Équation cartésienne</h3>
      <div class="formula-main parabole">$$f(x) = \\frac{1}{2(q-k)} \\cdot (x-p)^2 + \\frac{q+k}{2}$$</div>
      <p><em>Explication détaillée :</em></p>
      <ul>
        <li><strong>F(p ; q)</strong> = foyer de la parabole (point fixe) <em style="font-size:12px; color:var(--text-secondary);">(notation p,q pour ne pas confondre avec les a,b du cercle)</em></li>
        <li><strong>d ≡ y = k</strong> = directrice de la parabole (droite fixe)</li>
        <li>Tout point P(x ; y) de la parabole satisfait : distance(P, F) = distance(P, d)</li>
        <li>Cette équation se simplifie en forme canonique : f(x) = A·(x − α)² + β</li>
      </ul>
      
      <div class="simple-exp-box">
        <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Comprendre simplement</button>
        <div class="simple-exp-content">
          Cette formule compliquée décrit la forme de la courbe en U. Le foyer est comme un point spécial qui attire la courbe, et la directrice est une ligne qui repousse la courbe. La courbe est toujours à égale distance de ces deux !
        </div>
      </div>
    </div>
    
    <p>On retrouve la forme canonique d'une fonction du 2ᵉ degré : \\(f(x) = A \\cdot (x-\\alpha)^2 + \\beta\\)</p>
    <p><em>Explication :</em> Cette forme est celle d'une fonction quadratique standard où :</p>
    <ul>
      <li>\\(A = \\frac{1}{2(b - k)}\\) (détermine l'ouverture)</li>
      <li>\\(\\alpha = a\\) (abscisse du sommet)</li>
      <li>\\(\\beta = \\frac{b + k}{2}\\) (ordonnée du sommet)</li>
    </ul>
    
    <div class="simple-exp-box">
      <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Comprendre simplement</button>
      <div class="simple-exp-content">
        Cette forme est plus simple ! A nous dit si la courbe est ouverte vers le haut ou vers le bas. α et β nous disent où est le point le plus bas ou le plus haut de la courbe (le sommet). C'est comme trouver le fond d'un bol !
      </div>
    </div>
    
    <div class="grid2" style="margin-top:1.5rem;">
      <div class="card parabole">
        <h3>🎯 Les 3 éléments clés</h3>
        <ul style="font-size:15px; color:var(--text-secondary); padding-left:1.5rem; line-height:2.2;">
          <li><strong>Foyer</strong> F(a ; b)</li>
          <li><strong>Directrice</strong> d ≡ y = k</li>
          <li><strong>Sommet</strong> \\(S\\left(a ; \\frac{b+k}{2}\\right)\\)</li>
        </ul>
      </div>
      <div class="card parabole">
        <h3>🔄 Relations entre éléments</h3>
        <ul style="font-size:15px; color:var(--text-secondary); padding-left:1.5rem; line-height:2.2;">
          <li>Foyer + directrice → Sommet \\(S\\left(a ; \\frac{b+k}{2}\\right)\\)</li>
          <li>Sommet + directrice → Foyer F(a ; 2β−k)</li>
          <li>Foyer + sommet → Directrice y = 2β−b</li>
        </ul>
      </div>
    </div>
    
    <p style="margin-top:1.5rem;">L'axe de symétrie AS est la droite verticale x = a passant par le foyer.</p>
    
    <div class="simple-exp-box">
      <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Comprendre simplement</button>
      <div class="simple-exp-content">
        L'axe de symétrie est une ligne verticale qui coupe la parabole en deux parties égales. C'est comme si tu pliais la courbe en deux le long de cette ligne !
      </div>
    </div>
  </div>
</div>`,

  formules: `<div id="formules" class="section">
  <div style="margin-bottom:1.5rem;">
    <input type="search" id="formula-search" oninput="filterFormulas(this.value)" placeholder="🔍 Rechercher une formule (ex. rayon, foyer, pente, vecteur…)" aria-label="Rechercher une formule" style="width:100%; padding:12px 16px; border-radius:12px; border:1px solid var(--border-subtle); background:var(--bg-card); color:var(--text-primary); font-size:15px; box-sizing:border-box;">
    <button id="formula-bookmark-filter" type="button" onclick="toggleBookmarkFilter(this)" aria-pressed="false" style="margin-top:8px; padding:8px 14px; border-radius:20px; border:1px solid var(--color-droite); background:transparent; color:var(--color-droite); font-size:13px; cursor:pointer; font-weight:600;">★ Voir mes formules marquées</button>
    <p id="formula-search-empty" style="display:none; color:var(--text-secondary); margin-top:0.75rem;">Aucune formule ne correspond à ta recherche.</p>
  </div>
  <div class="grid2">
    <div>
      <div class="formula-box vecteur">
        <h3><span class="tag tag-vecteur">Vecteurs</span> Relation de Chasles</h3>
        <div class="formula-main vecteur">$$\\vec{AB} + \\vec{BC} = \\vec{AC}$$</div>
        <p class="note">On enchaîne bout à bout : \\(\\vec{AB}+\\vec{BC}+\\vec{CD}=\\vec{AD}\\).</p>
        <div class="simple-exp-box">
          <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Comprendre simplement</button>
          <div class="simple-exp-content">Tu marches de A à B, puis de B à C : au total tu es allé de A à C. Le point d'arrivée du 1er = le point de départ du 2e, et on garde le tout premier départ et la toute dernière arrivée.</div>
        </div>
      </div>
      <div class="formula-box vecteur">
        <h3><span class="tag tag-vecteur">Vecteurs</span> Règle du parallélogramme</h3>
        <div class="formula-main vecteur">$$\\vec{OA} + \\vec{OB} = \\vec{OC}$$</div>
        <p class="note">Vrai \\(\\Leftrightarrow\\) <strong>OACB</strong> est un parallélogramme. C est le coin opposé à O, et <strong>[OC] en est la diagonale</strong>.</p>
        <div style="text-align:center; margin:1rem 0;">
          <svg width="340" height="260" viewBox="0 0 340 260" style="background:var(--bg-main); border-radius:12px; border:2px solid var(--border-subtle); display:block; margin:0 auto; max-width:100%;">
            <defs>
              <marker id="pgA" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto"><polygon points="0 0, 9 3.5, 0 7" fill="#f87171"/></marker>
              <marker id="pgB" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto"><polygon points="0 0, 9 3.5, 0 7" fill="#34d399"/></marker>
              <marker id="pgC" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto"><polygon points="0 0, 10 4, 0 8" fill="#a78bfa"/></marker>
            </defs>
            <!-- Parallélogramme OACB rempli -->
            <polygon points="60,210 210,210 280,80 130,80" fill="rgba(167,139,250,0.10)" stroke="none"/>
            <!-- Côtés opposés (pointillés) : AC // OB et BC // OA -->
            <line x1="210" y1="210" x2="280" y2="80" stroke="#34d399" stroke-width="2" stroke-dasharray="5,4" opacity="0.7"/>
            <line x1="130" y1="80" x2="280" y2="80" stroke="#f87171" stroke-width="2" stroke-dasharray="5,4" opacity="0.7"/>
            <!-- Diagonale = somme OC -->
            <line x1="60" y1="210" x2="280" y2="80" stroke="#a78bfa" stroke-width="3.5" marker-end="url(#pgC)"/>
            <!-- Vecteurs OA (rouge) et OB (vert) -->
            <line x1="60" y1="210" x2="210" y2="210" stroke="#f87171" stroke-width="3" marker-end="url(#pgA)"/>
            <line x1="60" y1="210" x2="130" y2="80" stroke="#34d399" stroke-width="3" marker-end="url(#pgB)"/>
            <!-- Points -->
            <circle cx="60" cy="210" r="5" fill="#e5e7eb"/>
            <circle cx="210" cy="210" r="5" fill="#f87171"/>
            <circle cx="130" cy="80" r="5" fill="#34d399"/>
            <circle cx="280" cy="80" r="5" fill="#a78bfa"/>
            <!-- Étiquettes points -->
            <text x="48" y="228" font-size="15" fill="#e5e7eb" font-weight="bold">O</text>
            <text x="214" y="228" font-size="15" fill="#f87171" font-weight="bold">A</text>
            <text x="116" y="74" font-size="15" fill="#34d399" font-weight="bold">B</text>
            <text x="286" y="76" font-size="15" fill="#a78bfa" font-weight="bold">C</text>
            <!-- Étiquettes vecteurs (décalées pour ne pas chevaucher les traits) -->
            <text x="130" y="227" text-anchor="middle" font-size="13" fill="#f87171" font-weight="bold">OA</text>
            <text x="66" y="140" text-anchor="end" font-size="13" fill="#34d399" font-weight="bold">OB</text>
            <rect x="148" y="116" width="116" height="20" rx="5" fill="var(--bg-main)" opacity="0.9"/>
            <text x="206" y="131" text-anchor="middle" font-size="13" fill="#a78bfa" font-weight="bold">OC = OA + OB</text>
          </svg>
        </div>
        <div class="simple-exp-box">
          <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Comprendre simplement</button>
          <div class="simple-exp-content">Deux vecteurs <strong>OA</strong> (rouge) et <strong>OB</strong> (vert) partent du <em>même point</em> O. On complète le parallélogramme : le 4ᵉ coin est C. La somme <strong>OC</strong> (violet) est la <strong>diagonale</strong> qui part de O. Attention au nom : c'est <strong>OACB</strong> le parallélogramme (en tournant O → A → C → B), donc C est en face de O — pas à côté.</div>
        </div>
      </div>
      <div class="formula-box vecteur">
        <h3><span class="tag tag-vecteur">Vecteurs</span> Opposé &amp; différence</h3>
        <div class="formula-main vecteur">$$-\\vec{AB} = \\vec{BA}$$</div>
        <div class="formula-main vecteur">$$\\vec{u} - \\vec{v} = \\vec{u} + (-\\vec{v})$$</div>
        <div class="simple-exp-box">
          <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Comprendre simplement</button>
          <div class="simple-exp-content">L'opposé, c'est « faire demi-tour » : \\(-\\vec{AB}=\\vec{BA}\\). Et soustraire un vecteur, c'est simplement ajouter son opposé (comme \\(7-3=7+(-3)\\)).</div>
        </div>
      </div>
    </div>
    <div>
      <div class="formula-box vecteur">
        <h3><span class="tag tag-vecteur">Vecteurs</span> Multiplication par un réel</h3>
        <div class="formula-main vecteur">$$\\|k\\,\\vec{v}\\| = |k|\\cdot\\|\\vec{v}\\|$$</div>
        <p class="note">Même direction ; sens identique si \\(k>0\\), opposé si \\(k<0\\).</p>
        <div class="simple-exp-box">
          <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Comprendre simplement</button>
          <div class="simple-exp-content">\\(k\\) « étire » le vecteur : \\(2\\vec{v}\\) est deux fois plus long, \\(-\\vec{v}\\) fait demi-tour. La direction ne change jamais, seules la longueur et (parfois) le sens changent.</div>
        </div>
      </div>
      <div class="formula-box vecteur">
        <h3><span class="tag tag-vecteur">Vecteurs</span> Colinéarité</h3>
        <div class="formula-main vecteur">$$\\vec{u} = k\\,\\vec{v}$$</div>
        <p class="note">Alignement : \\(\\vec{AB}=k\\,\\vec{AC}\\). Parallèles : \\(\\vec{AB}=k\\,\\vec{CD}\\).</p>
        <div class="simple-exp-box">
          <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Comprendre simplement</button>
          <div class="simple-exp-content">Colinéaires = « même direction » (l'un est un multiple de l'autre). C'est l'outil clé : si \\(\\vec{AB}\\) et \\(\\vec{AC}\\) sont colinéaires, alors A, B, C sont alignés ; pour deux droites, elles sont parallèles.</div>
        </div>
      </div>
      <div class="formula-box vecteur">
        <h3><span class="tag tag-vecteur">Vecteurs</span> Milieu &amp; composantes</h3>
        <div class="formula-main vecteur">$$\\vec{AM} = \\tfrac{1}{2}\\,\\vec{AB}$$</div>
        <div class="formula-main vecteur">$$\\vec{AB} = \\begin{pmatrix} x_B - x_A \\\\ y_B - y_A \\end{pmatrix}$$</div>
        <div class="simple-exp-box">
          <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Comprendre simplement</button>
          <div class="simple-exp-content">Le milieu M est « à mi-chemin » : on parcourt la moitié de \\(\\vec{AB}\\). Dans un repère, les composantes d'un vecteur, c'est juste « de combien on se déplace » en x et en y entre le départ et l'arrivée.</div>
        </div>
      </div>
    </div>
  </div>
  <div class="grid2">
    <div>
      <div class="formula-box cercle">
        <h3><span class="tag tag-cercle">Cercle</span> Forme canonique</h3>
        <div class="formula-main cercle">$$(x - x_0)^2 + (y - y_0)^2 = R^2$$</div>
        <p class="note"><strong>Centre</strong> C(x₀ ; y₀), <strong>rayon</strong> R. Si C = O(0 ; 0) : \\(x^2 + y^2 = R^2\\)</p>
        <div class="formula-legend">
          <span class="formula-legend-item"><span class="symbol">x₀, y₀</span> <span class="meaning">Coordonnées du centre</span><span class="accordion-icon">▾</span><span class="tooltip">Coordonnées du centre</span><div class="accordion-content">x₀ et y₀ sont les coordonnées du centre C du cercle. Dans (x-x₀)²+(y-y₀)²=R², soustraire x₀ et y₀ 'déplace' le cercle au bon endroit. Si x₀=3, le cercle est centré en x=3.</div></span>
          <span class="formula-legend-item"><span class="symbol">R</span> <span class="meaning">Rayon</span><span class="accordion-icon">▾</span><span class="tooltip">Rayon du cercle</span><div class="accordion-content">R est la distance constante entre le centre et tout point du cercle. R doit être strictement positif. Dans l'équation on écrit R² (pas R) — erreur fréquente !</div></span>
          <span class="formula-legend-item"><span class="symbol">x, y</span> <span class="meaning">Variables du point</span><span class="accordion-icon">▾</span><span class="tooltip">Point quelconque du cercle</span><div class="accordion-content">x et y sont les coordonnées d'un point P quelconque du cercle. L'équation dit : 'la distance de P au centre vaut R'. Tout point vérifiant l'équation est sur le cercle.</div></span>
        </div>
        <div class="simple-exp-box">
          <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Comprendre simplement</button>
          <div class="simple-exp-content">C'est la formule la plus simple pour un cercle ! Tu as juste besoin de savoir où est le centre et quelle est la taille du cercle.</div>
        </div>
      </div>
      <div class="formula-box cercle">
        <h3><span class="tag tag-cercle">Cercle</span> Forme développée</h3>
        <div class="formula-main cercle">$$x^2 + y^2 + ax + by + c = 0$$</div>
        <div class="formula-main cercle">$$\\text{Centre} = \\left(\\frac{-a}{2} ; \\frac{-b}{2}\\right)$$</div>
        <div class="formula-main cercle">$$R = \\frac{\\sqrt{a^2 + b^2 - 4c}}{2}$$</div>
        <p class="note"><strong>Condition :</strong> \\(a^2 + b^2 - 4c > 0\\) pour un cercle</p>
        <div class="formula-legend">
          <span class="formula-legend-item"><span class="symbol">a, b, c</span> <span class="meaning">Coefficients</span><span class="accordion-icon">▾</span><span class="tooltip">Coefficients de la forme développée</span><div class="accordion-content">Dans \\(x^2+y^2+ax+by+c=0\\) : \\(a\\) et \\(b\\) permettent de retrouver le centre via \\(C\\left(-\\dfrac{a}{2}\\,;-\\dfrac{b}{2}\\right)\\). \\(c\\) intervient dans le discriminant \\(a^2+b^2-4c\\) qui doit être \\(>0\\) pour qu'un cercle existe.</div></span>
          <span class="formula-legend-item"><span class="symbol">R</span> <span class="meaning">Rayon</span><span class="accordion-icon">▾</span><span class="tooltip">Rayon calculé depuis les coefficients</span><div class="accordion-content">\\(R = \\dfrac{\\sqrt{a^2+b^2-4c}}{2}\\). Si \\(a^2+b^2-4c=0\\) : point unique. Si \\(a^2+b^2-4c&lt;0\\) : impossible, aucun cercle n'existe.</div></span>
          <span class="formula-legend-item"><span class="symbol">Δ</span> <span class="meaning">Discriminant</span><span class="accordion-icon">▾</span><span class="tooltip">Discriminant d'existence</span><div class="accordion-content">Δ = a²+b²-4c détermine si l'équation représente un vrai cercle (Δ>0), un point (Δ=0) ou rien (Δ<0).</div></span>
        </div>
        <div class="simple-exp-box">
          <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Comprendre simplement</button>
          <div class="simple-exp-content">Les lettres \\(a, b, c\\) se cachent dans l'équation. Pour retrouver le centre : prends \\(-\\dfrac{a}{2}\\) et \\(-\\dfrac{b}{2}\\) (l'opposé de la moitié de chaque coefficient). Pour le rayon : calcule \\(R=\\dfrac{\\sqrt{a^2+b^2-4c}}{2}\\). Astuce : si le discriminant \\(a^2+b^2-4c \\le 0\\), il n'y a pas de cercle !</div>
        </div>
      </div>
      <div class="formula-box cercle">
        <h3><span class="tag tag-cercle">Cercle</span> Distance point à cercle</h3>
        <div class="formula-main cercle">$$d(P, C) = \\sqrt{(x_P - x_0)^2 + (y_P - y_0)^2}$$</div>
        <p class="note"><strong>Intérieur :</strong> \\(d(P, C) < R\\) | <strong>Sur le cercle :</strong> \\(d(P, C) = R\\) | <strong>Extérieur :</strong> \\(d(P, C) > R\\)</p>
        <div style="text-align:center; margin:1rem 0;">
          <svg width="320" height="220" viewBox="0 0 320 220" style="background:var(--bg-main); border-radius:12px; border:2px solid var(--border-subtle); display:block; margin:0 auto; max-width:100%;">
            <!-- Triangle rectangle de Pythagore : C en bas-gauche, P en haut-droite -->
            <polygon points="60,170 240,170 240,50" fill="rgba(96,165,250,0.10)"/>
            <!-- Côtés -->
            <line x1="60" y1="170" x2="240" y2="170" stroke="#60a5fa" stroke-width="2.5"/>
            <line x1="240" y1="170" x2="240" y2="50" stroke="#60a5fa" stroke-width="2.5"/>
            <!-- Hypoténuse = distance d(P,C) -->
            <line x1="60" y1="170" x2="240" y2="50" stroke="#a78bfa" stroke-width="3.5"/>
            <!-- Angle droit -->
            <polyline points="222,170 222,152 240,152" fill="none" stroke="#94a3b8" stroke-width="1.5"/>
            <!-- Points -->
            <circle cx="60" cy="170" r="5" fill="#60a5fa"/>
            <circle cx="240" cy="50" r="5" fill="#34d399"/>
            <text x="40" y="188" font-size="14" fill="#60a5fa" font-weight="bold">C</text>
            <text x="246" y="48" font-size="14" fill="#34d399" font-weight="bold">P</text>
            <!-- Étiquettes côtés -->
            <text x="150" y="190" text-anchor="middle" font-size="13" fill="#60a5fa" font-weight="bold">|x_P − x₀|</text>
            <text x="248" y="115" font-size="13" fill="#60a5fa" font-weight="bold">|y_P − y₀|</text>
            <rect x="96" y="92" width="74" height="20" rx="5" fill="var(--bg-main)" opacity="0.9"/>
            <text x="133" y="107" text-anchor="middle" font-size="13" fill="#a78bfa" font-weight="bold">d(P,C)</text>
          </svg>
        </div>
        <div class="simple-exp-box">
          <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Comprendre simplement</button>
          <div class="simple-exp-content">C'est le théorème de Pythagore appliqué ! La distance entre deux points = √(Δx² + Δy²). Tu obtiens un nombre, et tu le compares au rayon R : si tu es plus proche du centre que R, tu es à l'intérieur. Si tu es exactement à R, tu es sur le bord. Si tu es plus loin, tu es à l'extérieur.</div>
        </div>
      </div>
    </div>
    <div>
      <div class="formula-box parabole">
        <h3><span class="tag tag-parabole">Parabole</span> Équation cartésienne</h3>
        <div class="formula-main parabole">$$f(x) = \\frac{1}{2(q-k)} \\cdot (x-p)^2 + \\frac{q+k}{2}$$</div>
        <p class="note"><strong>F(p ; q)</strong> = foyer, <strong>y = k</strong> = directrice</p>
        <div style="text-align:center; margin:1rem 0;">
          <svg width="300" height="240" viewBox="0 0 300 240" style="background:var(--bg-main); border-radius:12px; border:2px solid var(--border-subtle); display:block; margin:0 auto; max-width:100%;">
            <!-- Parabole ouverte vers le haut -->
            <path d="M 60 70 Q 150 250 240 70" fill="none" stroke="#34d399" stroke-width="3"/>
            <!-- Directrice y = k (horizontale, en bas) -->
            <line x1="30" y1="200" x2="270" y2="200" stroke="#f59e0b" stroke-width="2.5" stroke-dasharray="7,5"/>
            <text x="276" y="204" font-size="12" fill="#f59e0b" font-weight="bold">y=k</text>
            <!-- Foyer F -->
            <circle cx="150" cy="140" r="5" fill="#f87171"/>
            <text x="158" y="138" font-size="13" fill="#f87171" font-weight="bold">F</text>
            <!-- Sommet S (à mi-chemin entre F et directrice) -->
            <circle cx="150" cy="170" r="4" fill="#a78bfa"/>
            <text x="158" y="178" font-size="12" fill="#a78bfa" font-weight="bold">S</text>
            <!-- Point M sur la parabole + ses 2 distances égales -->
            <circle cx="210" cy="118" r="4" fill="#e5e7eb"/>
            <text x="216" y="115" font-size="12" fill="#e5e7eb" font-weight="bold">M</text>
            <!-- distance M->F -->
            <line x1="210" y1="118" x2="150" y2="140" stroke="#f87171" stroke-width="2"/>
            <!-- distance M->directrice (verticale) -->
            <line x1="210" y1="118" x2="210" y2="200" stroke="#f59e0b" stroke-width="2"/>
            <!-- marques d'égalité -->
            <text x="182" y="118" font-size="12" fill="#f87171" font-weight="bold">d₁</text>
            <text x="216" y="162" font-size="12" fill="#f59e0b" font-weight="bold">d₂</text>
            <rect x="92" y="214" width="116" height="18" rx="5" fill="var(--bg-main)" opacity="0.9"/>
            <text x="150" y="227" text-anchor="middle" font-size="12" fill="#e5e7eb" font-weight="bold">d₁ = d₂ (toujours)</text>
          </svg>
        </div>
        <div class="formula-legend">
          <span class="formula-legend-item"><span class="symbol">a, b</span> <span class="meaning">Coordonnées du foyer</span><span class="accordion-icon">▾</span><span class="tooltip">Coordonnées du foyer</span><div class="accordion-content">F(p;q) est le foyer de la parabole. Tout point de la parabole est à égale distance de F et de la directrice. L'axe de symétrie est la droite verticale x=p. (On utilise p,q pour ne pas confondre avec les coefficients a,b du cercle.)</div></span>
          <span class="formula-legend-item"><span class="symbol">k</span> <span class="meaning">Ordonnée directrice</span><span class="accordion-icon">▾</span><span class="tooltip">Ordonnée de la directrice</span><div class="accordion-content">La directrice est la droite horizontale y=k. C'est la 'ligne repoussoir' de la parabole : chaque point de la courbe est aussi loin de F que de cette droite.</div></span>
          <span class="formula-legend-item"><span class="symbol">x</span> <span class="meaning">Variable</span><span class="accordion-icon">▾</span><span class="tooltip">Variable de la fonction</span><div class="accordion-content">x est la variable indépendante. Pour chaque valeur de x, f(x) donne l'ordonnée y du point correspondant sur la parabole.</div></span>
        </div>
        <div class="simple-exp-box">
          <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Comprendre simplement</button>
          <div class="simple-exp-content">Le foyer F est un point "attracteur" à l'intérieur de la courbe. La directrice est une ligne "repoussoir" en dessous (ou au-dessus). Chaque point de la parabole est exactement à égale distance des deux. C'est littéralement la définition de la parabole !</div>
        </div>
      </div>
      <div class="formula-box parabole">
        <h3><span class="tag tag-parabole">Parabole</span> Forme canonique</h3>
        <div class="formula-main parabole">$$f(x) = A \\cdot (x-\\alpha)^2 + \\beta$$</div>
        <p class="note"><strong>A</strong> = ouverture, <strong>α</strong> = abscisse sommet, <strong>β</strong> = ordonnée sommet</p>
        <div class="formula-legend">
          <span class="formula-legend-item"><span class="symbol">A</span> <span class="meaning">Ouverture</span><span class="accordion-icon">▾</span><span class="tooltip">Coefficient d'ouverture</span><div class="accordion-content">A détermine l'ouverture : A>0 = parabole ouverte vers le HAUT (forme ∪), A&lt;0 = vers le BAS (forme ∩). Plus |A| est grand, plus la parabole est étroite et 'pincée'.</div></span>
          <span class="formula-legend-item"><span class="symbol">α, β</span> <span class="meaning">Coordonnées sommet</span><span class="accordion-icon">▾</span><span class="tooltip">Coordonnées du sommet</span><div class="accordion-content">Le sommet S(α;β) est le point le plus bas (si A>0) ou le plus haut (si A&lt;0) de la parabole. C'est le point où la parabole 'change de direction'. L'axe de symétrie passe par x=α.</div></span>
          <span class="formula-legend-item"><span class="symbol">x</span> <span class="meaning">Variable</span><span class="accordion-icon">▾</span><span class="tooltip">Variable de la fonction</span><div class="accordion-content">x est la variable indépendante. Pour chaque valeur de x, f(x) donne l'ordonnée y du point correspondant sur la parabole.</div></span>
        </div>
        <div class="simple-exp-box">
          <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Comprendre simplement</button>
          <div class="simple-exp-content">La forme la plus pratique ! Tu lis tout directement : A dit si la courbe est en ∪ (A&gt;0) ou en ∩ (A&lt;0), α est l'abscisse du sommet (point le plus bas ou le plus haut), et β son ordonnée. Exemple : f(x) = 2(x−3)²+5 → sommet en (3 ; 5), ouvert vers le haut.</div>
        </div>
      </div>
    </div>
  </div>
  <div class="grid2" style="margin-top:1.5rem;">
    <div>
      <div class="formula-box droite">
        <h3><span class="tag tag-droite">Droites</span> Équations</h3>
        <div class="formula-main droite">$$\\vec{AP} = k \\cdot \\vec{u}$$</div>
        <div class="formula-main droite">$$\\begin{cases} x = x_A + k \\cdot u_x \\\\ y = y_A + k \\cdot u_y \\end{cases}$$</div>
        <div class="formula-main droite">$$ax + by + c = 0$$</div>
        <div class="formula-main droite">$$y = mx + p$$</div>
        <div class="formula-legend">
          <span class="formula-legend-item"><span class="symbol">k</span> <span class="meaning">Paramètre</span><span class="accordion-icon">▾</span><span class="tooltip">Paramètre de déplacement</span><div class="accordion-content">k est un nombre réel quelconque. Quand k=0 on est au point A. Quand k=1 on s'est déplacé d'un vecteur u. Faire varier k de -∞ à +∞ génère TOUS les points de la droite.</div></span>
          <span class="formula-legend-item"><span class="symbol">\\(\\vec{u}\\)</span> <span class="meaning">Vecteur directeur</span><span class="accordion-icon">▾</span><span class="tooltip">Vecteur directeur</span><div class="accordion-content">\\(\\vec{u}(u_x\\,;u_y)\\) donne la direction de la droite. Pour aller d'un point au suivant sur la droite, on « avance » de \\(u_x\\) horizontalement et \\(u_y\\) verticalement. Pour \\(ax+by+c=0\\), \\(\\vec{u}=(-b\\,;a)\\).</div></span>
          <span class="formula-legend-item"><span class="symbol">m</span> <span class="meaning">Pente</span><span class="accordion-icon">▾</span><span class="tooltip">Pente de la droite</span><div class="accordion-content">La pente m = Δy/Δx indique de combien monte (ou descend) la droite quand on avance d'une unité vers la droite. m>0 : monte. m&lt;0 : descend. m=0 : horizontale. Droite verticale : pente indéfinie.</div></span>
          <span class="formula-legend-item"><span class="symbol">p</span> <span class="meaning">Ordonnée à l'origine</span><span class="accordion-icon">▾</span><span class="tooltip">Ordonnée à l'origine</span><div class="accordion-content">p est la valeur de y quand x=0 : c'est le point où la droite coupe l'axe y. Dans y=mx+p, si tu poses x=0 tu obtiens y=p directement.</div></span>
        </div>
        <div class="simple-exp-box">
          <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Comprendre simplement</button>
          <div class="simple-exp-content">4 façons de décrire la même droite ! Vectorielle = avec une direction et un point de départ. Paramétrique = avec un compteur k qui fait parcourir toute la droite. Implicite (ax+by+c=0) = pratique pour trouver les vecteurs. Explicite (y=mx+p) = la plus commune, tu lis directement la pente et où elle coupe l'axe y.</div>
        </div>
      </div>
      <div class="formula-box droite">
        <h3><span class="tag tag-droite">Droites</span> Distance point à droite</h3>
        <div class="formula-main droite">$$d(P, d) = \\frac{|ax_P + by_P + c|}{\\sqrt{a^2 + b^2}}$$</div>
        <p class="note">Pour un point P(x_P ; y_P) et une droite d ≡ ax + by + c = 0</p>
        <div class="formula-legend">
          <span class="formula-legend-item"><span class="symbol">d</span> <span class="meaning">Distance</span><span class="accordion-icon">▾</span><span class="tooltip">Distance</span><div class="accordion-content">La distance d(P,d) est la longueur du segment perpendiculaire qui relie le point P à la droite d. C'est la distance la plus courte entre P et n'importe quel point de la droite.</div></span>
          <span class="formula-legend-item"><span class="symbol">a, b, c</span> <span class="meaning">Coefficients droite</span><span class="accordion-icon">▾</span><span class="tooltip">Coefficients de la forme implicite</span><div class="accordion-content">Dans \\(ax+by+c=0\\) : le vecteur normal est \\(\\vec{n}=(a\\,;b)\\) (perpendiculaire à la droite), le vecteur directeur est \\(\\vec{u}=(-b\\,;a)\\), et la pente est \\(m=-\\dfrac{a}{b}\\). Erreur fréquente : prendre \\((a;b)\\) comme directeur au lieu de \\((-b;a)\\) !</div></span>
          <span class="formula-legend-item"><span class="symbol">|...|</span> <span class="meaning">Valeur absolue</span><span class="accordion-icon">▾</span><span class="tooltip">Valeur absolue</span><div class="accordion-content">La valeur absolue garantit que la distance est toujours positive. Sans elle, le résultat pourrait être négatif selon le côté du point. Une distance est TOUJOURS ≥ 0.</div></span>
        </div>
        <div class="simple-exp-box">
          <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Comprendre simplement</button>
          <div class="simple-exp-content">Tu substitues les coordonnées du point dans l'équation de la droite, et tu prends la valeur absolue du résultat (ça te donne une mesure "combien le point est loin de la droite"). Ensuite tu divises par √(a²+b²) pour "normaliser" : peu importe l'échelle de la droite, tu obtiendras toujours la vraie distance géométrique.</div>
        </div>
      </div>
    </div>
    <div>
      <div class="formula-box droite">
        <h3><span class="tag tag-droite">Droites</span> Positions relatives</h3>
        <div class="formula-main droite">$$\\text{Parallèles : } m = m'$$</div>
        <div class="formula-main droite">$$\\text{Perpendiculaires : } m \\cdot m' = -1$$</div>
        <div class="formula-main droite">$$\\text{Perp. (vecteurs) : } \\vec{u} \\cdot \\vec{v} = 0$$</div>
        <div class="simple-exp-box">
          <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Comprendre simplement</button>
          <div class="simple-exp-content">Parallèles = même pente (les droites « avancent » dans la même direction, sans jamais se croiser). Perpendiculaires = produit des pentes égal à \\(-1\\) : si l'une monte avec une pente de \\(2\\), l'autre descend avec une pente de \\(-\\dfrac{1}{2}\\). Pour les vecteurs : deux vecteurs sont perpendiculaires lorsque leur produit scalaire vaut \\(0\\).</div>
        </div>
      </div>
      <div class="formula-box droite">
        <h3><span class="tag tag-droite">Droites</span> Pente</h3>
        <div class="formula-main droite">$$m = \\frac{y_B - y_A}{x_B - x_A} = \\frac{u_y}{u_x}$$</div>
        <div class="simple-exp-box">
          <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Comprendre simplement</button>
          <div class="simple-exp-content">La pente = "combien tu montes quand tu avances de 1 vers la droite". Entre deux points A et B : tu divises la différence de hauteur (Δy = y_B − y_A) par la différence horizontale (Δx = x_B − x_A). Comme calculer la pente d'une route. m &gt; 0 : ça monte. m &lt; 0 : ça descend. m = 0 : horizontal. Δx = 0 : vertical (pente indéfinie).</div>
        </div>
      </div>
    </div>
  </div>
</div>`,

  methodes: `<div id="methodes" class="section">
  <div style="background:linear-gradient(135deg, var(--color-cercle-light), var(--color-droite-light)); border:1px solid var(--border-subtle); border-radius:14px; padding:1.1rem 1.25rem; margin-bottom:1.5rem;">
    <div style="display:flex; align-items:center; gap:12px; margin-bottom:0.85rem;">
      <span style="font-size:26px;">🎬</span>
      <div>
        <div style="font-weight:700; color:var(--text-primary);">Résolutions animées</div>
        <div style="font-size:13px; color:var(--text-secondary);">Regarde le calcul se résoudre tout seul, terme par terme — à ton rythme ou en lecture auto.</div>
      </div>
    </div>
    <div style="display:flex; gap:8px; flex-wrap:wrap;">
      <button onclick="openDemo('pente')" class="demo-launch">▶ Pente (2 points)</button>
      <button onclick="openDemo('cercle_carre_combo')" class="demo-launch">▶ Compléter le carré (calcul + dessin)</button>
      <button onclick="openDemo('cercle_carre_geo')" class="demo-launch">▶ Compléter le carré (en images)</button>
      <button onclick="openDemo('cercle_carre')" class="demo-launch">▶ Compléter le carré (calcul)</button>
      <button onclick="openDemo('distance')" class="demo-launch">▶ Distance point-droite</button>
      <button onclick="openDemo('parabole_geo')" class="demo-launch">▶ Parabole (foyer/directrice)</button>
    </div>
  </div>
  <div class="methods-tabs">
    <button class="mtab on" onclick=\"showMethod('m1', this)\">Forme dev → canonique</button>
    <button class="mtab" onclick=\"showMethod('m2', this)\">Cercle par 3 points</button>
    <button class="mtab" onclick=\"showMethod('m3', this)\">Foyer/directrice/sommet</button>
    <button class="mtab" onclick=\"showMethod('m4', this)\">Équation droite passant par A</button>
    <button class="mtab" onclick=\"showMethod('m5', this)\">Droite parallèle / perp.</button>
  </div>
  <div id="m1" class="method-content on">
    <div class="formula-box"><h3>Méthode — Forme développée → Forme canonique</h3><p class="note"><strong>Exemple :</strong> x² + y² + 8x − 12y + 3 = 0</p></div>
    <div class="step-list">
      <div class="step-item"><div class="step-num">1</div><div class="step-text">Regrouper : $$(x^2+8x) + (y^2-12y) + 3 = 0$$
        <button class="why-btn" onclick="toggleWhyMethod(this)">💡 Pourquoi cette étape ?</button>
        <div class="why-content">On regroupe x²+8x ensemble et y²-12y ensemble. Cela permet de traiter chaque variable séparément. C'est comme trier des objets avant de les ranger.</div>
      </div></div>
      <div class="step-item"><div class="step-num">2</div><div class="step-text">Compléter le carré x : ajouter/soustraire 16 → $$(x+4)^2 - 16$$
        <button class="why-btn" onclick="toggleWhyMethod(this)">💡 Pourquoi cette étape ?</button>
        <div class="why-content">La formule : \\(x^2+bx = \\left(x+\\dfrac{b}{2}\\right)^2-\\left(\\dfrac{b}{2}\\right)^2\\). Ici \\(b=8\\), donc \\(\\dfrac{b}{2}=4\\) et \\(\\left(\\dfrac{b}{2}\\right)^2=16\\). On ajoute ET soustrait 16 pour ne pas changer la valeur totale.</div>
      </div></div>
      <div class="step-item"><div class="step-num">3</div><div class="step-text">Compléter le carré y : ajouter/soustraire 36 → $$(y-6)^2 - 36$$
        <button class="why-btn" onclick="toggleWhyMethod(this)">💡 Pourquoi cette étape ?</button>
        <div class="why-content">Même principe pour \\(y\\) : \\(b=-12\\), \\(\\dfrac{b}{2}=-6\\), \\(\\left(\\dfrac{b}{2}\\right)^2=36\\). On écrit \\(y^2-12y = (y-6)^2-36\\).</div>
      </div></div>
      <div class="step-item"><div class="step-num">4</div><div class="step-text">Isoler : $$(x+4)^2 + (y-6)^2 = 49$$ → Centre C(−4 ; 6), R = 7
        <button class="why-btn" onclick="toggleWhyMethod(this)">💡 Pourquoi cette étape ?</button>
        <div class="why-content">On regroupe les constantes à droite : -16-36+3=-49, qui devient +49 à droite. Centre C(-4;6), R=√49=7.</div>
      </div></div>
    </div>
  </div>
  <div id="m2" class="method-content">
    <div class="formula-box"><h3>Méthode — Cercle par 3 points</h3><p class="note"><strong>Exemple :</strong> A(−1 ; −4), B(−10 ; 5), C(2 ; 1)</p></div>
    <div class="step-list">
      <div class="step-item"><div class="step-num">1</div><div class="step-text">Écrire : $$x^2 + y^2 + ax + by + c = 0$$
        <button class="why-btn" onclick="toggleWhyMethod(this)">💡 Pourquoi cette étape ?</button>
        <div class="why-content">La forme développée a exactement 3 inconnues (a,b,c). Avec 3 points on obtient 3 équations — exactement ce qu'il faut pour résoudre le système.</div>
      </div></div>
      <div class="step-item"><div class="step-num">2</div><div class="step-text">Substituer les 3 points → 3 équations
        <button class="why-btn" onclick="toggleWhyMethod(this)">💡 Pourquoi cette étape ?</button>
        <div class="why-content">Pour chaque point (x,y), on calcule d'abord x²+y², puis on déplace ce résultat à droite. Exemple pour A(-1;-4) : 1+16-a-4b+c=0 → -a-4b+c=-17.</div>
      </div></div>
      <div class="step-item"><div class="step-num">3</div><div class="step-text">Résoudre : a = 9, b = −3, c = −20
        <button class="why-btn" onclick="toggleWhyMethod(this)">💡 Pourquoi cette étape ?</button>
        <div class="why-content">On soustrait les équations pour éliminer c (coefficient 1 partout). On obtient 2 équations à 2 inconnues (a,b), puis on résout par substitution.</div>
      </div></div>
      <div class="step-item"><div class="step-num">4</div><div class="step-text">Équation : $$x^2 + y^2 + 9x − 3y − 20 = 0$$
        <button class="why-btn" onclick="toggleWhyMethod(this)">💡 Pourquoi cette étape ?</button>
        <div class="why-content">On substitue a=9, b=-3, c=-20. TOUJOURS vérifier en substituant un des 3 points : le résultat doit être 0.</div>
      </div></div>
    </div>
  </div>
  <div id="m3" class="method-content">
    <div class="formula-box"><h3>Méthode — Foyer, directrice, sommet</h3><p class="note"><strong>Exemple :</strong> \\(f(x) = \\frac{1}{16}(x+1)^2 - 1\\)</p></div>
    <div class="step-list">
      <div class="step-item"><div class="step-num">1</div><div class="step-text">Identifier : \\(\\alpha = -1\\), \\(\\beta = -1\\), \\(A = \\frac{1}{16}\\)
        <button class="why-btn" onclick="toggleWhyMethod(this)">💡 Pourquoi cette étape ?</button>
        <div class="why-content">Dans f(x)=A(x-α)²+β : A est le coefficient devant, α est le nombre soustrait à x (attention au signe!), β est le terme constant final.</div>
      </div></div>
      <div class="step-item"><div class="step-num">2</div><div class="step-text">Sommet S(−1 ; −1)
        <button class="why-btn" onclick="toggleWhyMethod(this)">💡 Pourquoi cette étape ?</button>
        <div class="why-content">Le sommet S(α;β) se lit directement : S(-1;-1). C'est le point minimum (A>0) ou maximum (A&lt;0) de la parabole.</div>
      </div></div>
      <div class="step-item"><div class="step-num">3</div><div class="step-text">De \\(A = \\dfrac{1}{16}\\) : $$\\frac{1}{2(b-k)} = \\frac{1}{16}$$ → $$2(b-k) = 16$$ → $$b - k = 8$$
        <button class="why-btn" onclick="toggleWhyMethod(this)">💡 Pourquoi cette étape ?</button>
        <div class="why-content">\\(A=\\dfrac{1}{2(b-k)}\\) s'inverse en \\(2(b-k)=\\dfrac{1}{A}\\). Ici \\(A=\\dfrac{1}{16}\\), donc \\(\\dfrac{1}{A}=16\\), d'où \\(2(b-k)=16\\) et \\(b-k=8\\).</div>
      </div></div>
      <div class="step-item"><div class="step-num">4</div><div class="step-text">De β = −1 : $$\\frac{b+k}{2} = -1$$ → $$b + k = -2$$
        <button class="why-btn" onclick="toggleWhyMethod(this)">💡 Pourquoi cette étape ?</button>
        <div class="why-content">Le sommet est à mi-chemin entre le foyer et la directrice : \\(\\beta=\\dfrac{b+k}{2}\\). Donc \\(b+k=2\\beta=2(-1)=-2\\).</div>
      </div></div>
      <div class="step-item"><div class="step-num">5</div><div class="step-text">Système : b − k = 8 et b + k = −2 → addition : 2b = 6 → <strong>b = 3</strong>, puis k = −2 − b = −5 → <strong>k = −5</strong>
        <button class="why-btn" onclick="toggleWhyMethod(this)">💡 Pourquoi cette étape ?</button>
        <div class="why-content">Addition : (b-k)+(b+k)=2b → 8+(-2)=6 → b=3. Soustraction : (b+k)-(b-k)=2k → -2-8=-10 → k=-5.</div>
      </div></div>
      <div class="step-item"><div class="step-num">6</div><div class="step-text">Foyer F(−1 ; 3), directrice y = −5
        <button class="why-btn" onclick="toggleWhyMethod(this)">💡 Pourquoi cette étape ?</button>
        <div class="why-content">Foyer F(α;b)=F(-1;3) car l'abscisse du foyer = abscisse du sommet = α. Directrice y=k=-5.</div>
      </div></div>
    </div>
  </div>
  <div id="m4" class="method-content">
    <div class="formula-box"><h3>Méthode — Équation de droite passant par un point</h3><p class="note"><strong>Exemple :</strong> \\(A(4\\,;-1)\\), <strong style="color:var(--color-nav)">\\(\\vec{u}\\)</strong>\\((2\\,;3)\\)</p></div>
    <div class="step-list">
      <div class="step-item"><div class="step-num">1</div><div class="step-text">Paramétriques : x = 4 + 2k, y = −1 + 3k
        <button class="why-btn" onclick="toggleWhyMethod(this)">💡 Pourquoi cette étape ?</button>
        <div class="why-content">\\(\\vec{AP}=k\\cdot\\vec{u}\\) en coordonnées : \\(x=x_A+k\\cdot u_x\\) et \\(y=y_A+k\\cdot u_y\\). Ici \\(A(4\\,;-1)\\) et \\(\\vec{u}(2\\,;3)\\) : \\(x=4+2k\\), \\(y=-1+3k\\).</div>
      </div></div>
      <div class="step-item"><div class="step-num">2</div><div class="step-text">Éliminer k : $$\\frac{x-4}{2} = \\frac{y+1}{3}$$
        <button class="why-btn" onclick="toggleWhyMethod(this)">💡 Pourquoi cette étape ?</button>
        <div class="why-content">De \\(x=4+2k\\) : \\(k=\\dfrac{x-4}{2}\\). De \\(y=-1+3k\\) : \\(k=\\dfrac{y+1}{3}\\). En égalant : \\(\\dfrac{x-4}{2}=\\dfrac{y+1}{3}\\).</div>
      </div></div>
      <div class="step-item"><div class="step-num">3</div><div class="step-text">Implicite : 3x − 2y − 14 = 0
        <button class="why-btn" onclick="toggleWhyMethod(this)">💡 Pourquoi cette étape ?</button>
        <div class="why-content">On développe : 3(x-4)=2(y+1) → 3x-12=2y+2 → 3x-2y-14=0. Vecteur normal \\(\\vec{n}=(3;-2)\\), vecteur directeur \\(\\vec{u}=(2;3)\\).</div>
      </div></div>
      <div class="step-item"><div class="step-num">4</div><div class="step-text">Explicite : y = 1.5x − 7
        <button class="why-btn" onclick="toggleWhyMethod(this)">💡 Pourquoi cette étape ?</button>
        <div class="why-content">De 3x-2y-14=0 : 2y=3x-14 → y=1.5x-7. Vérification : pour x=4, y=1.5(4)-7=6-7=-1 ✓</div>
      </div></div>
    </div>
  </div>
  <div id="m5" class="method-content">
    <div class="formula-box"><h3>Méthode — Parallèle / Perpendiculaire</h3><p class="note"><strong>Parallèle :</strong> même pente m | <strong>Perpendiculaire :</strong> pente \\(m' = -\\frac{1}{m}\\)</p></div>
    <div class="step-list">
      <div class="step-item"><div class="step-num">1</div><div class="step-text">Identifier la pente m
        <button class="why-btn" onclick="toggleWhyMethod(this)">💡 Pourquoi cette étape ?</button>
        <div class="why-content">De \\(ax+by+c=0\\) : \\(m=-\\dfrac{a}{b}\\). Ici \\(3x+4y-5=0\\), \\(a=3\\), \\(b=4\\) → \\(m=-\\dfrac{3}{4}\\).</div>
      </div></div>
      <div class="step-item"><div class="step-num">2</div><div class="step-text">Parallèle : garder m, trouver p'
        <button class="why-btn" onclick="toggleWhyMethod(this)">💡 Pourquoi cette étape ?</button>
        <div class="why-content">Une droite parallèle a exactement la même pente \\(m=-\\dfrac{3}{4}\\). On trouve \\(p\\) en substituant le point donné dans \\(y=mx+p\\).</div>
      </div></div>
      <div class="step-item"><div class="step-num">3</div><div class="step-text">Perpendiculaire : calculer $$m' = -\\dfrac{1}{m}$$
        <button class="why-btn" onclick="toggleWhyMethod(this)">💡 Pourquoi cette étape ?</button>
        <div class="why-content">\\(m\\cdot m'=-1\\) → \\(m'=-\\dfrac{1}{m}=-\\dfrac{1}{-\\frac{3}{4}}=\\dfrac{4}{3}\\). Vérification : \\(\\left(-\\dfrac{3}{4}\\right)\\cdot\\dfrac{4}{3}=-1\\) ✓</div>
      </div></div>
      <div class="step-item"><div class="step-num">4</div><div class="step-text">Écrire l'équation finale
        <button class="why-btn" onclick="toggleWhyMethod(this)">💡 Pourquoi cette étape ?</button>
        <div class="why-content">\\(y-y_0=m'(x-x_0)\\). Pour \\(M(1\\,;2)\\) et \\(m'=\\dfrac{4}{3}\\) : \\(y-2=\\dfrac{4}{3}(x-1)\\) → \\(y=\\dfrac{4}{3}x+\\dfrac{2}{3}\\).</div>
      </div></div>
    </div>
  </div>
</div>`,

  exercices: `<div id="exercices" class="section">
  <h2 style="font-size:32px; font-weight:700; color:var(--color-nav); margin-bottom:0.5rem; padding-bottom:1rem; border-bottom:4px solid var(--color-nav);">✏️ Exercices guidés par étapes</h2>
  <div style="background:linear-gradient(135deg,rgba(96,165,250,0.07),rgba(167,139,250,0.07)); border:1px solid rgba(167,139,250,0.2); border-radius:16px; padding:1.5rem; margin-bottom:2rem;">
    <h3 style="font-size:16px; font-weight:700; color:var(--color-nav); margin-bottom:1rem;">⚡ Aide-mémoire rapide</h3>
    <div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); gap:1rem;">
      <div style="background:rgba(96,165,250,0.08); border-radius:10px; padding:1rem; border-left:3px solid var(--color-cercle);">
        <p style="font-size:12px; font-weight:700; color:var(--color-cercle); margin-bottom:6px;">🔵 CERCLE</p>
        <p style="font-size:13px; color:var(--text-primary); margin:2px 0;">\\((x-h)^2+(y-k)^2=R^2\\)</p>
        <p style="font-size:11px; color:var(--text-secondary); margin:2px 0;">Centre C(h;k) · Rayon R</p>
      </div>
      <div style="background:rgba(52,211,153,0.08); border-radius:10px; padding:1rem; border-left:3px solid var(--color-parabole);">
        <p style="font-size:12px; font-weight:700; color:var(--color-parabole); margin-bottom:6px;">🟢 PARABOLE</p>
        <p style="font-size:13px; color:var(--text-primary); margin:2px 0;">\\(y=ax^2+bx+c\\)</p>
        <p style="font-size:11px; color:var(--text-secondary); margin:2px 0;">Sommet \\(x_s=-\\dfrac{b}{2a}\\)</p>
      </div>
      <div style="background:rgba(251,191,36,0.08); border-radius:10px; padding:1rem; border-left:3px solid var(--color-droite);">
        <p style="font-size:12px; font-weight:700; color:var(--color-droite); margin-bottom:6px;">🟡 DROITE</p>
        <p style="font-size:13px; color:var(--text-primary); margin:2px 0;">\\(y=mx+p\\)</p>
        <p style="font-size:11px; color:var(--text-secondary); margin:2px 0;">\\(m=\\dfrac{y_2-y_1}{x_2-x_1}\\)</p>
      </div>
    </div>
  </div>
  <p style="color:var(--text-secondary); margin-bottom:2rem; font-size:15px;">💡 Chaque exercice se révèle étape par étape. Si tu bloques, clique sur l'étape suivante — une explication te guidera.</p>

  <div class="exercise-card cercle">
    <h3 style="font-size:20px; font-weight:600; color:var(--color-cercle); margin-bottom:0.5rem;">🎯 Cercle passant par 3 points</h3>
    <div style="background:rgba(96,165,250,0.06); border-radius:8px; padding:1rem; margin-bottom:1rem;">
      <p style="color:var(--text-secondary); font-size:14px; margin-bottom:0.5rem;">🎓 <strong style="color:var(--color-cercle)">Ce que tu vas apprendre :</strong> utiliser la forme développée du cercle avec 3 points connus.</p>
      <p style="font-size:16px; color:var(--text-primary);"><strong>Énoncé :</strong> Trouve l'équation du cercle passant par A(2 ; 3), B(−1 ; 2), C(0 ; 5).</p>
    </div>
    <button class="step-btn" onclick="showExerciseStep(this, 1)">▶ Commencer — Étape 1</button>
    <div class="exercise-step cercle" data-step="1">
      <span class="step-badge">Étape 1 sur 4</span>
      <p style="color:var(--color-cercle); font-weight:700; font-size:15px; margin-bottom:0.5rem;">📌 Étape 1 — Choisir la bonne forme</p>
      <p>On utilise la <strong>forme développée</strong> car on a 3 points et 3 inconnues (a, b, c) :</p>
      <div class="formula-main cercle">$$x^2 + y^2 + ax + by + c = 0$$</div>
      <p style="font-size:14px; color:var(--text-secondary); margin-top:0.5rem;">💬 <em>Astuce : cette forme a exactement 3 inconnues (a, b, c). Avec 3 points, on obtient 3 équations → système soluble !</em></p>
      <button class="why-btn" onclick="toggleWhyStep(this)">💡 Pourquoi cette étape ?</button>
      <div class="why-content">La forme développée est essentielle ici car elle contient exactement 3 inconnues (a, b, c). Avec 3 points, on obtient 3 équations, ce qui permet de résoudre le système. La forme canonique nécessiterait le centre et le rayon, que nous ne connaissons pas encore.</div>
      <button class="step-btn" onclick="showExerciseStep(this, 2)">▶ Étape 2 — Substituer les points</button>
    </div>
    <div class="exercise-step cercle" data-step="2">
      <span class="step-badge">Étape 2 sur 4</span>
      <p style="color:var(--color-cercle); font-weight:700; font-size:15px; margin-bottom:0.5rem;">📌 Étape 2 — Substituer les 3 points</p>
      <p>On remplace (x,y) par chaque point dans l'équation :</p>
      <div style="background:var(--bg-formula); border-radius:8px; padding:1rem; margin:0.75rem 0; font-size:14px; color:var(--text-secondary);">
        <strong style="color:var(--text-primary)">A(2;3) :</strong> 4 + 9 + 2a + 3b + c = 0 → <strong style="color:var(--color-cercle)">2a + 3b + c = −13</strong><br><br>
        <strong style="color:var(--text-primary)">B(−1;2) :</strong> 1 + 4 − a + 2b + c = 0 → <strong style="color:var(--color-cercle)">−a + 2b + c = −5</strong><br><br>
        <strong style="color:var(--text-primary)">C(0;5) :</strong> 0 + 25 + 0 + 5b + c = 0 → <strong style="color:var(--color-cercle)">5b + c = −25</strong>
      </div>
      <p style="font-size:14px; color:var(--text-secondary);">💬 <em>Pour chaque point, tu calcules x² + y² d'abord, puis tu déplaces ce nombre à droite du signe =.</em></p>
      <button class="why-btn" onclick="toggleWhyStep(this)">💡 Pourquoi cette étape ?</button>
      <div class="why-content">Substituer chaque point dans l'équation permet de créer un système de 3 équations linéaires. C'est la méthode standard pour trouver les coefficients a, b, c. Chaque point donne une équation unique car ses coordonnées sont connues.</div>
      <button class="step-btn" onclick="showExerciseStep(this, 3)">▶ Étape 3 — Résoudre le système</button>
    </div>
    <div class="exercise-step cercle" data-step="3">
      <span class="step-badge">Étape 3 sur 4</span>
      <p style="color:var(--color-cercle); font-weight:700; font-size:15px; margin-bottom:0.5rem;">📌 Étape 3 — Résoudre le système à 3 inconnues</p>
      <p>On soustrait les équations pour éliminer des inconnues :</p>
      <div style="background:var(--bg-formula); border-radius:8px; padding:1rem; margin:0.75rem 0; font-size:14px; color:var(--text-secondary);">
        (1)−(2) : <strong style="color:var(--color-cercle)">3a + b = −8</strong><br><br>
        De (3) : c = −25 − 5b<br>
        On substitue dans (2) : −a + 2b − 25 − 5b = −5 → <strong style="color:var(--color-cercle)">−a − 3b = 20</strong><br><br>
        Résolution : a = −0.5, b = −6.5, c = 7.5
      </div>
      <p style="font-size:14px; color:var(--text-secondary);">💬 <em>Si tu bloques ici, rappelle-toi : soustraire deux équations élimine une inconnue commune.</em></p>
      <button class="why-btn" onclick="toggleWhyStep(this)">💡 Pourquoi cette étape ?</button>
      <div class="why-content">La résolution par élimination (soustraction d'équations) est la méthode la plus efficace pour les systèmes 3×3. En soustrayant (1)−(2), on élimine c. En substituant ensuite c dans (2), on obtient une équation en a et b seulement. Cela réduit progressivement le nombre d'inconnues jusqu'à la solution.</div>
      <button class="step-btn" onclick="showExerciseStep(this, 4)">▶ Étape 4 — Résultat final</button>
    </div>
    <div class="exercise-step cercle" data-step="4">
      <span class="step-badge">Étape 4 sur 4</span>
      <p style="color:var(--color-cercle); font-weight:700; font-size:15px; margin-bottom:0.5rem;">✅ Résultat final</p>
      <div class="formula-main cercle">$$x^2 + y^2 - 0.5x - 6.5y + 7.5 = 0$$</div>
      <p style="margin-top:1rem;">Centre : C(0.25 ; 3.25) | Rayon : R ≈ 1.77</p>
      <p style="font-size:14px; color:var(--text-secondary); margin-top:0.5rem;">✔ <em>Vérifie en substituant un des 3 points : tu dois obtenir 0 !</em></p>
      <button class="why-btn" onclick="toggleWhyStep(this)">💡 Pourquoi cette étape ?</button>
      <div class="why-content">Une fois les coefficients trouvés, on peut les utiliser pour calculer le centre et le rayon via les formules : \\(C\\left(-\\dfrac{a}{2}\\,;-\\dfrac{b}{2}\\right)\\) et \\(R=\\dfrac{\\sqrt{a^2+b^2-4c}}{2}\\). La vérification par substitution confirme que les 3 points satisfont bien l'équation trouvée.</div>
    </div>
  </div>

  <div class="exercise-card droite">
    <h3 style="font-size:20px; font-weight:600; color:var(--color-droite); margin-bottom:0.5rem;">🎯 Distance d'un point à une droite</h3>
    <div style="background:rgba(251,191,36,0.06); border-radius:8px; padding:1rem; margin-bottom:1rem;">
      <p style="color:var(--text-secondary); font-size:14px; margin-bottom:0.5rem;">🎓 <strong style="color:var(--color-droite)">Ce que tu vas apprendre :</strong> appliquer la formule de distance point-droite.</p>
      <p style="font-size:16px; color:var(--text-primary);"><strong>Énoncé :</strong> Calcule la distance du point P(3 ; 4) à la droite d ≡ 2x − y + 1 = 0.</p>
    </div>
    <button class="step-btn" onclick="showExerciseStep(this, 5)">▶ Commencer — Étape 1</button>
    <div class="exercise-step droite" data-step="5">
      <span class="step-badge">Étape 1 sur 3</span>
      <p style="color:var(--color-droite); font-weight:700; font-size:15px; margin-bottom:0.5rem;">📌 Étape 1 — Identifier a, b, c</p>
      <p>La droite est sous la forme ax + by + c = 0. On lit :</p>
      <div style="background:var(--bg-formula); border-radius:8px; padding:1rem; margin:0.75rem 0; font-size:15px; color:var(--text-secondary);">
        a = <strong style="color:var(--color-droite)">2</strong>, b = <strong style="color:var(--color-droite)">−1</strong>, c = <strong style="color:var(--color-droite)">+1</strong>
      </div>
      <p style="font-size:14px; color:var(--text-secondary);">💬 <em>Attention au signe de c ! "2x − y + 1 = 0" donne c = +1, pas −1.</em></p>
      <button class="why-btn" onclick="toggleWhyStep(this)">💡 Pourquoi cette étape ?</button>
      <div class="why-content">Identifier les coefficients a, b, c est la première étape essentielle. La formule de distance point-droite nécessite ces trois coefficients. Attention aux signes : dans ax + by + c = 0, chaque terme garde son signe.</div>
      <button class="step-btn" onclick="showExerciseStep(this, 51)">▶ Étape 2 — Appliquer la formule</button>
    </div>
    <div class="exercise-step droite" data-step="51">
      <span class="step-badge">Étape 2 sur 3</span>
      <p style="color:var(--color-droite); font-weight:700; font-size:15px; margin-bottom:0.5rem;">📌 Étape 2 — Appliquer la formule</p>
      <div class="formula-main droite">$$d = \\frac{|ax_P + by_P + c|}{\\sqrt{a^2 + b^2}} = \\frac{|2(3) + (-1)(4) + 1|}{\\sqrt{4 + 1}}$$</div>
      <p style="font-size:14px; color:var(--text-secondary); margin-top:0.5rem;">💬 <em>On substitue les coordonnées de P et les coefficients a, b, c dans la formule.</em></p>
      <button class="why-btn" onclick="toggleWhyStep(this)">💡 Pourquoi cette étape ?</button>
      <div class="why-content">La formule de distance point-droite est dérivée de la projection orthogonale. Le numérateur |ax_P + by_P + c| représente la distance signée du point à la droite, et le dénominateur √(a²+b²) normalise cette distance. La valeur absolue garantit un résultat positif.</div>
      <button class="step-btn" onclick="showExerciseStep(this, 52)">▶ Étape 3 — Calculer</button>
    </div>
    <div class="exercise-step droite" data-step="52">
      <span class="step-badge">Étape 3 sur 3</span>
      <p style="color:var(--color-droite); font-weight:700; font-size:15px; margin-bottom:0.5rem;">✅ Calcul final</p>
      <div class="formula-main droite">$$d = \\frac{|6 - 4 + 1|}{\\sqrt{5}} = \\frac{3}{\\sqrt{5}} = \\frac{3\\sqrt{5}}{5} \\approx 1.34$$</div>
      <p style="font-size:14px; color:var(--text-secondary); margin-top:0.5rem;">✔ <em>La valeur absolue garantit un résultat positif. La distance est toujours ≥ 0 !</em></p>
      <button class="why-btn" onclick="toggleWhyStep(this)">💡 Pourquoi cette étape ?</button>
      <div class="why-content">Le calcul final consiste à simplifier l'expression. La valeur absolue \\(|6-4+1| = |3| = 3\\). La racine \\(\\sqrt{5}\\) ne se simplifie pas, donc on rationalise en multipliant par \\(\\dfrac{\\sqrt{5}}{\\sqrt{5}}\\) pour obtenir \\(\\dfrac{3\\sqrt{5}}{5}\\). La valeur approchée \\(\\approx 1{,}34\\) donne une idée concrète de la distance.</div>
    </div>
  </div>

  <div class="exercise-card parabole">
    <h3 style="font-size:20px; font-weight:600; color:var(--color-parabole); margin-bottom:0.5rem;">🎯 Intersection droite et parabole</h3>
    <div style="background:rgba(52,211,153,0.06); border-radius:8px; padding:1rem; margin-bottom:1rem;">
      <p style="color:var(--text-secondary); font-size:14px; margin-bottom:0.5rem;">🎓 <strong style="color:var(--color-parabole)">Ce que tu vas apprendre :</strong> trouver les points d'intersection entre une parabole et une droite.</p>
      <p style="font-size:16px; color:var(--text-primary);"><strong>Énoncé :</strong> Intersection de y = x² − 2x + 1 avec y = 2x − 1.</p>
    </div>
    <button class="step-btn" onclick="showExerciseStep(this, 6)">▶ Commencer — Étape 1</button>
    <div class="exercise-step parabole" data-step="6">
      <span class="step-badge">Étape 1 sur 4</span>
      <p style="color:var(--color-parabole); font-weight:700; font-size:15px; margin-bottom:0.5rem;">📌 Étape 1 — Égaler les deux expressions</p>
      <p>Aux points d'intersection, les deux y sont égaux. On pose :</p>
      <div class="formula-main parabole">$$x^2 - 2x + 1 = 2x - 1 \\implies x^2 - 4x + 2 = 0$$</div>
      <p style="font-size:14px; color:var(--text-secondary); margin-top:0.5rem;">💬 <em>On passe tout à gauche : on soustrait 2x et on ajoute 1 des deux côtés.</em></p>
      <button class="why-btn" onclick="toggleWhyStep(this)">💡 Pourquoi cette étape ?</button>
      <div class="why-content">Égaler les deux expressions de y est le principe fondamental pour trouver les points d'intersection. Si deux courbes ont le même y pour un même x, elles se croisent en ce point. Cela réduit le problème à une équation à une seule inconnue x.</div>
      <button class="step-btn" onclick="showExerciseStep(this, 7)">▶ Étape 2 — Discriminant</button>
    </div>
    <div class="exercise-step parabole" data-step="7">
      <span class="step-badge">Étape 2 sur 4</span>
      <p style="color:var(--color-parabole); font-weight:700; font-size:15px; margin-bottom:0.5rem;">📌 Étape 2 — Calculer le discriminant Δ</p>
      <div class="formula-main parabole">$$\\Delta = b^2 - 4ac = (-4)^2 - 4(1)(2) = 16 - 8 = 8 > 0$$</div>
      <p style="font-size:14px; color:var(--text-secondary); margin-top:0.5rem;">💬 <em>Δ > 0 → 2 solutions réelles distinctes → la droite coupe la parabole en 2 points !</em><br>Si Δ = 0 : tangente (1 point). Si Δ &lt; 0 : pas d'intersection.</p>
      <button class="why-btn" onclick="toggleWhyStep(this)">💡 Pourquoi cette étape ?</button>
      <div class="why-content">Le discriminant Δ = b² - 4ac indique le nombre de solutions réelles. Δ > 0 : 2 solutions distinctes (la droite coupe la parabole). Δ = 0 : 1 solution (tangente). Δ < 0 : 0 solution (pas d'intersection). C'est un outil puissant pour prédire le comportement géométrique avant même de calculer les solutions.</div>
      <button class="step-btn" onclick="showExerciseStep(this, 8)">▶ Étape 3 — Solutions x</button>
    </div>
    <div class="exercise-step parabole" data-step="8">
      <span class="step-badge">Étape 3 sur 4</span>
      <p style="color:var(--color-parabole); font-weight:700; font-size:15px; margin-bottom:0.5rem;">📌 Étape 3 — Trouver x₁ et x₂</p>
      <div class="formula-main parabole">$$x = \\frac{4 \\pm \\sqrt{8}}{2} = \\frac{4 \\pm 2\\sqrt{2}}{2} = 2 \\pm \\sqrt{2}$$</div>
      <p style="font-size:14px; color:var(--text-secondary); margin-top:0.5rem;">💬 <em>x₁ = 2 + √2 ≈ 3.41 et x₂ = 2 − √2 ≈ 0.59</em></p>
      <button class="why-btn" onclick="toggleWhyStep(this)">💡 Pourquoi cette étape ?</button>
      <div class="why-content">La formule quadratique \\(x = \\dfrac{-b \\pm \\sqrt{\\Delta}}{2a}\\) donne les deux solutions. Ici, on simplifie \\(\\sqrt{8} = 2\\sqrt{2}\\) pour obtenir une forme plus élégante. Le \\(\\pm\\) indique qu'il y a deux solutions : une avec \\(+\\), une avec \\(-\\). Ces \\(x\\) sont les abscisses des points d'intersection.</div>
      <button class="step-btn" onclick="showExerciseStep(this, 9)">▶ Étape 4 — Coordonnées y</button>
    </div>
    <div class="exercise-step parabole" data-step="9">
      <span class="step-badge">Étape 4 sur 4</span>
      <p style="color:var(--color-parabole); font-weight:700; font-size:15px; margin-bottom:0.5rem;">✅ Étape 4 — Trouver les y via y = 2x − 1</p>
      <div style="background:var(--bg-formula); border-radius:8px; padding:1rem; margin:0.75rem 0; font-size:14px; color:var(--text-secondary);">
        y₁ = 2(2+√2) − 1 = <strong style="color:var(--color-parabole)">3 + 2√2 ≈ 5.83</strong><br><br>
        y₂ = 2(2−√2) − 1 = <strong style="color:var(--color-parabole)">3 − 2√2 ≈ 0.17</strong>
      </div>
      <p><strong>Points d'intersection :</strong></p>
      <div class="formula-main parabole">$$P_1(2+\\sqrt{2}; 3+2\\sqrt{2}) \\quad \\text{et} \\quad P_2(2-\\sqrt{2}; 3-2\\sqrt{2})$$</div>
      <p style="font-size:14px; color:var(--text-secondary); margin-top:0.5rem;">✔ <em>Vérifie : substitue x₁ dans les DEUX équations → tu dois obtenir le même y₁ !</em></p>
      <button class="why-btn" onclick="toggleWhyStep(this)">💡 Pourquoi cette étape ?</button>
      <div class="why-content">Une fois les x trouvés, on calcule les y correspondants en substituant dans l'une des équations (la droite y = 2x - 1 est plus simple). On obtient ainsi les coordonnées complètes des points d'intersection. La vérification par substitution dans les deux équations confirme le résultat.</div>
    </div>
  </div>

  <div class="exercise-card cercle">
    <h3 style="font-size:20px; font-weight:600; color:var(--color-cercle); margin-bottom:0.5rem;">🎯 Tangente à un cercle</h3>
    <div style="background:rgba(96,165,250,0.06); border-radius:8px; padding:1rem; margin-bottom:1rem;">
      <p style="color:var(--text-secondary); font-size:14px; margin-bottom:0.5rem;">🎓 <strong style="color:var(--color-cercle)">Ce que tu vas apprendre :</strong> trouver la tangente à un cercle en un point donné (perpendiculaire au rayon).</p>
      <p style="font-size:16px; color:var(--text-primary);"><strong>Énoncé :</strong> Tangente au cercle (x−2)² + (y+1)² = 9 au point T(2 ; 2).</p>
    </div>
    <button class="step-btn" onclick="showExerciseStep(this, 10)">▶ Commencer — Étape 1</button>
    <div class="exercise-step cercle" data-step="10">
      <span class="step-badge">Étape 1 sur 4</span>
      <p style="color:var(--color-cercle); font-weight:700; font-size:15px; margin-bottom:0.5rem;">📌 Étape 1 — Lire le centre et vérifier T</p>
      <p>Le cercle (x−2)² + (y+1)² = 9 a :</p>
      <div style="background:var(--bg-formula); border-radius:8px; padding:1rem; margin:0.75rem 0; font-size:14px; color:var(--text-secondary);">
        Centre C(2 ; −1), Rayon R = 3<br><br>
        Vérification : (2−2)² + (2+1)² = 0 + 9 = 9 ✓ → T est sur le cercle !
      </div>
      <p style="font-size:14px; color:var(--text-secondary);">💬 <em>Le point T est bien sur le cercle, donc on peut trouver la tangente en ce point.</em></p>
      <button class="why-btn" onclick="toggleWhyStep(this)">💡 Pourquoi cette étape ?</button>
      <div class="why-content">Identifier le centre et vérifier que le point est sur le cercle est essentiel. La tangente n'existe que si le point est sur le cercle. La forme canonique (x−h)² + (y−k)² = R² donne directement le centre C(h,k) et le rayon R.</div>
      <button class="step-btn" onclick="showExerciseStep(this, 11)">▶ Étape 2 — Pente de CT</button>
    </div>
    <div class="exercise-step cercle" data-step="11">
      <span class="step-badge">Étape 2 sur 4</span>
      <p style="color:var(--color-cercle); font-weight:700; font-size:15px; margin-bottom:0.5rem;">📌 Étape 2 — Calculer la pente du rayon CT</p>
      <div class="formula-main cercle">$$m_{CT} = \\frac{y_T - y_C}{x_T - x_C} = \\frac{2 - (-1)}{2 - 2} = \\frac{3}{0} \\text{ (indéfini)}$$</div>
      <p style="font-size:14px; color:var(--text-secondary); margin-top:0.5rem;">💬 <em>Le rayon CT est vertical (dénominateur nul). La tangente sera donc horizontale.</em></p>
      <button class="why-btn" onclick="toggleWhyStep(this)">💡 Pourquoi cette étape ?</button>
      <div class="why-content">La tangente est perpendiculaire au rayon au point de tangence. Pour trouver la pente de la tangente, on calcule d'abord la pente du rayon CT. Si la pente du rayon est indéfinie (dénominateur nul), le rayon est vertical et la tangente sera horizontale.</div>
      <button class="step-btn" onclick="showExerciseStep(this, 12)">▶ Étape 3 — Pente de la tangente</button>
    </div>
    <div class="exercise-step cercle" data-step="12">
      <span class="step-badge">Étape 3 sur 4</span>
      <p style="color:var(--color-cercle); font-weight:700; font-size:15px; margin-bottom:0.5rem;">📌 Étape 3 — Pente de la tangente</p>
      <div class="formula-main cercle">$$m_{tangente} = 0 \\text{ (droite horizontale)}$$</div>
      <p style="font-size:14px; color:var(--text-secondary); margin-top:0.5rem;">💬 <em>Une droite perpendiculaire à une droite verticale est horizontale (pente = 0).</em></p>
      <button class="why-btn" onclick="toggleWhyStep(this)">💡 Pourquoi cette étape ?</button>
      <div class="why-content">Deux droites perpendiculaires ont des pentes dont le produit est -1 (sauf cas vertical/horizontal). Si une droite est verticale (pente indéfinie), la droite perpendiculaire est horizontale (pente = 0). C'est le cas ici : le rayon est vertical, donc la tangente est horizontale.</div>
      <button class="step-btn" onclick="showExerciseStep(this, 13)">▶ Étape 4 — Équation finale</button>
    </div>
    <div class="exercise-step cercle" data-step="13">
      <span class="step-badge">Étape 4 sur 4</span>
      <p style="color:var(--color-cercle); font-weight:700; font-size:15px; margin-bottom:0.5rem;">✅ Étape 4 — Écrire l'équation de la tangente</p>
      <p>Droite horizontale passant par T(2 ; 2) :</p>
      <div class="formula-main cercle">$$y = 2$$</div>
      <p style="font-size:14px; color:var(--text-secondary); margin-top:0.5rem;">✔ <em>Vérifie : pour tout x, y = 2 ✓ (passe bien par T)</em></p>
      <button class="why-btn" onclick="toggleWhyStep(this)">💡 Pourquoi cette étape ?</button>
      <div class="why-content">L'équation d'une droite horizontale est y = constante. Comme la droite passe par T(2,2), la constante est y = 2. Cette équation est simple mais correcte : pour tout x, y = 2, ce qui définit bien une droite horizontale passant par T.</div>
    </div>
  </div>

  <div class="exercise-card droite">
    <h3 style="font-size:20px; font-weight:600; color:var(--color-droite); margin-bottom:0.5rem;">🎯 Droite perpendiculaire passant par un point</h3>
    <div style="background:rgba(251,191,36,0.06); border-radius:8px; padding:1rem; margin-bottom:1rem;">
      <p style="color:var(--text-secondary); font-size:14px; margin-bottom:0.5rem;">🎓 <strong style="color:var(--color-droite)">Ce que tu vas apprendre :</strong> construire une droite perpendiculaire à une droite donnée.</p>
      <p style="font-size:16px; color:var(--text-primary);"><strong>Énoncé :</strong> Droite perpendiculaire à d ≡ 3x + 4y − 5 = 0 passant par M(1 ; 2).</p>
    </div>
    <button class="step-btn" onclick="showExerciseStep(this, 14)">▶ Commencer — Étape 1</button>
    <div class="exercise-step droite" data-step="14">
      <span class="step-badge">Étape 1 sur 3</span>
      <p style="color:var(--color-droite); font-weight:700; font-size:15px; margin-bottom:0.5rem;">📌 Étape 1 — Trouver la pente de d</p>
      <p>De \\(ax + by + c = 0\\), la pente est \\(m = -\\dfrac{a}{b}\\) :</p>
      <div class="formula-main droite">$$m = -\\frac{a}{b} = -\\frac{3}{4}$$</div>
      <p style="font-size:14px; color:var(--text-secondary); margin-top:0.5rem;">💬 <em>La droite \\(3x + 4y - 5 = 0\\) a \\(a=3\\), \\(b=4\\), \\(c=-5\\). La pente est \\(-\\dfrac{3}{4}\\) (négative car la droite descend).</em></p>
      <button class="why-btn" onclick="toggleWhyStep(this)">💡 Pourquoi cette étape ?</button>
      <div class="why-content">Pour construire une droite perpendiculaire, il faut d'abord connaître la pente de la droite d'origine. La formule \\(m = -\\dfrac{a}{b}\\) pour \\(ax + by + c = 0\\) vient de la réécriture \\(y = -\\dfrac{a}{b}x - \\dfrac{c}{b}\\). La pente est le coefficient de \\(x\\).</div>
      <button class="step-btn" onclick="showExerciseStep(this, 15)">▶ Étape 2 — Pente perpendiculaire</button>
    </div>
    <div class="exercise-step droite" data-step="15">
      <span class="step-badge">Étape 2 sur 3</span>
      <p style="color:var(--color-droite); font-weight:700; font-size:15px; margin-bottom:0.5rem;">📌 Étape 2 — Calculer la pente perpendiculaire</p>
      <div class="formula-main droite">$$m' = -\\frac{1}{m} = -\\frac{1}{-\\frac{3}{4}} = \\frac{4}{3}$$</div>
      <p style="font-size:14px; color:var(--text-secondary); margin-top:0.5rem;">💬 <em>Vérifie : \\(m \\times m' = \\left(-\\dfrac{3}{4}\\right) \\times \\dfrac{4}{3} = -1\\) ✓ — c'est bien perpendiculaire !</em></p>
      <button class="why-btn" onclick="toggleWhyStep(this)">💡 Pourquoi cette étape ?</button>
      <div class="why-content">Deux droites perpendiculaires ont des pentes dont le produit vaut \\(-1\\). Donc \\(m' = -\\dfrac{1}{m}\\). Cette formule est fondamentale en géométrie analytique. La vérification \\(m \\times m' = -1\\) confirme la perpendicularité.</div>
      <button class="step-btn" onclick="showExerciseStep(this, 16)">▶ Étape 3 — Équation finale</button>
    </div>
    <div class="exercise-step droite" data-step="16">
      <span class="step-badge">Étape 3 sur 3</span>
      <p style="color:var(--color-droite); font-weight:700; font-size:15px; margin-bottom:0.5rem;">✅ Étape 3 — Écrire l'équation passant par M(1;2)</p>
      <div class="formula-main droite">$$y - 2 = \\frac{4}{3}(x - 1) \\implies y = \\frac{4}{3}x + \\frac{2}{3}$$</div>
      <p style="font-size:14px; color:var(--text-secondary); margin-top:0.5rem;">✔ <em>Vérifie : pour \\(x=1\\), \\(y = \\dfrac{4}{3} + \\dfrac{2}{3} = \\dfrac{6}{3} = 2\\) ✓ (passe bien par M)</em></p>
      <button class="why-btn" onclick="toggleWhyStep(this)">💡 Pourquoi cette étape ?</button>
      <div class="why-content">L'équation point-pente \\(y - y_0 = m'(x - x_0)\\) permet de construire une droite de pente connue passant par un point donné. En substituant \\(M(1\\,;2)\\) et \\(m' = \\dfrac{4}{3}\\), on obtient l'équation finale. La forme réduite \\(y = mx + p\\) est obtenue par développement.</div>
    </div>
  </div>
</div>`,

  erreurs: `<div id="erreurs" class="section">
  <h2 style="font-size:32px; font-weight:700; color:var(--color-nav); margin-bottom:2rem; padding-bottom:1rem; border-bottom:4px solid var(--color-nav);">⚠️ Erreurs fréquentes</h2>
  <div class="synth-section vecteur">
    <h3 style="font-size:24px; font-weight:600; color:var(--color-nav); margin-bottom:1.5rem;">Vecteurs</h3>
    <div class="formula-box vecteur"><h3>❌ Inverser l'ordre des composantes</h3><p><strong>Erreur :</strong> Écrire \\(\\vec{AB} = \\begin{pmatrix}x_A - x_B \\\\ y_A - y_B\\end{pmatrix}\\)</p><p><strong>Correction :</strong> \\(\\vec{AB} = \\begin{pmatrix}x_B - x_A \\\\ y_B - y_A\\end{pmatrix}\\) — toujours <em>extrémité − origine</em>.</p><p><strong>Contre-exemple :</strong> Pour A(1 ; 2) et B(4 ; 6), \\(\\vec{AB}=\\begin{pmatrix}3 \\\\ 4\\end{pmatrix}\\), pas \\(\\begin{pmatrix}-3 \\\\ -4\\end{pmatrix}\\).</p></div>
    <div class="formula-box vecteur"><h3>❌ Mal enchaîner la relation de Chasles</h3><p><strong>Erreur :</strong> \\(\\vec{AB} + \\vec{CB} = \\vec{AC}\\)</p><p><strong>Correction :</strong> Il faut enchaîner « bout à bout » : \\(\\vec{AB} + \\vec{BC} = \\vec{AC}\\) (l'extrémité du 1ᵉʳ = l'origine du 2ᵉ).</p><p><strong>Contre-exemple :</strong> \\(\\vec{AB}+\\vec{CB}\\) ne donne rien de simple ; mais \\(\\vec{AB}+\\vec{BC}=\\vec{AC}\\).</p></div>
    <div class="formula-box vecteur"><h3>❌ Oublier la valeur absolue dans la norme</h3><p><strong>Erreur :</strong> \\(\\|k\\,\\vec{v}\\| = k\\,\\|\\vec{v}\\|\\)</p><p><strong>Correction :</strong> \\(\\|k\\,\\vec{v}\\| = |k|\\cdot\\|\\vec{v}\\|\\)</p><p><strong>Contre-exemple :</strong> \\(\\|-3\\,\\vec{v}\\| = 3\\,\\|\\vec{v}\\|\\), pas \\(-3\\,\\|\\vec{v}\\|\\) : une norme est toujours \\(\\geq 0\\).</p></div>
    <div class="formula-box vecteur"><h3>❌ Se tromper de parallélogramme</h3><p><strong>Erreur :</strong> Croire que \\(\\vec{OA}+\\vec{OB}=\\vec{OC}\\) veut dire que OABC est un parallélogramme.</p><p><strong>Correction :</strong> C'est <strong>OACB</strong> le parallélogramme : C est le sommet <em>opposé</em> à O, et [OC] en est la <strong>diagonale</strong>.</p><p><strong>Contre-exemple :</strong> Les deux côtés issus de O sont [OA] et [OB] ; leur somme « ferme » le parallélogramme jusqu'à C.</p></div>
    <div class="formula-box vecteur"><h3>❌ Confondre milieu et vecteur entier</h3><p><strong>Erreur :</strong> M milieu de [AB] \\(\\Rightarrow \\vec{AM} = \\vec{AB}\\)</p><p><strong>Correction :</strong> \\(\\vec{AM} = \\tfrac{1}{2}\\,\\vec{AB}\\)</p><p><strong>Contre-exemple :</strong> Si \\(\\vec{AB}=\\begin{pmatrix}6 \\\\ 2\\end{pmatrix}\\), alors \\(\\vec{AM}=\\begin{pmatrix}3 \\\\ 1\\end{pmatrix}\\), pas \\(\\begin{pmatrix}6 \\\\ 2\\end{pmatrix}\\).</p></div>
  </div>
  <div class="synth-section cercle">
    <h3 style="font-size:24px; font-weight:600; color:var(--color-cercle); margin-bottom:1.5rem;">Cercle</h3>
    <div class="formula-box cercle"><h3>❌ Oublier R² au lieu de R</h3><p><strong>Erreur :</strong> Écrire \\((x - x_0)^2 + (y - y_0)^2 = R\\)</p><p><strong>Correction :</strong> \\((x - x_0)^2 + (y - y_0)^2 = R^2\\)</p><p><strong>Contre-exemple :</strong> Pour R=3, l'équation est \\((x-x_0)^2+(y-y_0)^2=9\\), pas 3.</p></div>
    <div class="formula-box cercle"><h3>❌ Se tromper de signe dans les coordonnées du centre</h3><p><strong>Erreur :</strong> Écrire \\(\\left(\\dfrac{a}{2}\\,;\\dfrac{b}{2}\\right)\\)</p><p><strong>Correction :</strong> \\(\\left(-\\dfrac{a}{2}\\,;-\\dfrac{b}{2}\\right)\\)</p><p><strong>Contre-exemple :</strong> Pour \\(x^2+y^2+6x-4y+3=0\\), le centre est \\((-3;2)\\), pas \\((3;-2)\\).</p></div>
    <div class="formula-box cercle"><h3>❌ Oublier la condition d'existence</h3><p><strong>Erreur :</strong> Calculer le rayon sans vérifier $a^2+b^2-4c>0$</p><p><strong>Correction :</strong> Toujours vérifier que $a^2+b^2-4c>0$</p><p><strong>Contre-exemple :</strong> \\(x^2+y^2+2x+2y+3=0\\) n'est pas un cercle car \\(4+4-12=-4&lt;0\\).</p></div>
    <div class="formula-box cercle"><h3>❌ Confondre diamètre et rayon</h3><p><strong>Erreur :</strong> Prendre |AB| comme rayon</p><p><strong>Correction :</strong> Le rayon est \\(\\dfrac{|AB|}{2}\\)</p><p><strong>Contre-exemple :</strong> Si [AB] est un diamètre de longueur 10, le rayon est 5, pas 10.</p></div>
    <div class="formula-box cercle"><h3>❌ Erreur dans le calcul de la distance</h3><p><strong>Erreur :</strong> Oublier la racine carrée</p><p><strong>Correction :</strong> \\(d(P,C) = \\sqrt{(x_P-x_0)^2 + (y_P-y_0)^2}\\)</p><p><strong>Contre-exemple :</strong> Distance entre (0;0) et (3;4) est \\(\\sqrt{25}=5\\), pas 25.</p></div>
  </div>
  <div class="synth-section parabole">
    <h3 style="font-size:24px; font-weight:600; color:var(--color-parabole); margin-bottom:1.5rem;">Parabole</h3>
    <div class="formula-box parabole"><h3>❌ Confondre foyer et sommet</h3><p><strong>Erreur :</strong> Croire que le foyer est le point le plus bas/haut</p><p><strong>Correction :</strong> Le sommet est le point extrême, le foyer est à l'intérieur</p><p><strong>Contre-exemple :</strong> Pour \\(f(x)=x^2\\), le sommet est (0;0) mais le foyer est (0;0.25).</p></div>
    <div class="formula-box parabole"><h3>❌ Erreur dans le signe de l'ouverture</h3><p><strong>Erreur :</strong> Penser que A>0 ouvre vers le bas</p><p><strong>Correction :</strong> A>0 ouvre vers le haut, A&lt;0 ouvre vers le bas</p><p><strong>Contre-exemple :</strong> \\(f(x)=x^2\\) s'ouvre vers le haut, \\(f(x)=-x^2\\) s'ouvre vers le bas.</p></div>
    <div class="formula-box parabole"><h3>❌ Confondre axe de symétrie</h3><p><strong>Erreur :</strong> Penser que l'axe est y = a</p><p><strong>Correction :</strong> L'axe de symétrie est x = a (droite verticale)</p><p><strong>Contre-exemple :</strong> Pour une parabole de foyer F(2;3), l'axe est x=2, pas y=3.</p></div>
    <div class="formula-box parabole"><h3>❌ Erreur dans le calcul du sommet</h3><p><strong>Erreur :</strong> Prendre S(α; -β)</p><p><strong>Correction :</strong> Le sommet est S(α; β)</p><p><strong>Contre-exemple :</strong> Pour \\(f(x)=2(x-3)^2+5\\), le sommet est (3;5), pas (3;-5).</p></div>
  </div>
  <div class="synth-section droite">
    <h3 style="font-size:24px; font-weight:600; color:var(--color-droite); margin-bottom:1.5rem;">Droites</h3>
    <div class="formula-box droite"><h3>❌ Confondre vecteur directeur et vecteur normal</h3><p><strong>Erreur :</strong> Prendre \\(\\vec{u} = (a ; b)\\)</p><p><strong>Correction :</strong> \\(\\vec{u} = \\begin{pmatrix}-b \\\\ a\\end{pmatrix}\\), \\(\\vec{n} = \\begin{pmatrix}a \\\\ b\\end{pmatrix}\\)</p><p><strong>Contre-exemple :</strong> Pour \\(2x+3y-5=0\\), \\(\\vec{u}=(-3;2)\\), pas \\((2;3)\\).</p></div>
    <div class="formula-box droite"><h3>❌ Erreur dans le calcul de la pente</h3><p><strong>Erreur :</strong> Prendre \\(m = \\dfrac{a}{b}\\)</p><p><strong>Correction :</strong> \\(m = -\\dfrac{a}{b}\\)</p><p><strong>Contre-exemple :</strong> Pour \\(2x+3y-5=0\\), \\(m=-\\dfrac{2}{3}\\), pas \\(\\dfrac{2}{3}\\).</p></div>
    <div class="formula-box droite"><h3>❌ Erreur dans la condition de perpendicularité</h3><p><strong>Erreur :</strong> Penser que \\(m = m'\\)</p><p><strong>Correction :</strong> \\(m \\cdot m' = -1\\)</p><p><strong>Contre-exemple :</strong> \\(y=2x\\) et \\(y=-0.5x\\) sont perpendiculaires car \\(2 \\times (-0.5) = -1\\).</p></div>
    <div class="formula-box droite"><h3>❌ Oublier la valeur absolue dans la distance</h3><p><strong>Erreur :</strong> Écrire \\(d = \\dfrac{ax_P+by_P+c}{\\sqrt{a^2+b^2}}\\)</p><p><strong>Correction :</strong> \\(d = \\dfrac{|ax_P+by_P+c|}{\\sqrt{a^2+b^2}}\\)</p><p><strong>Contre-exemple :</strong> Distance de (0;0) à \\(x+y-1=0\\) : \\(\\dfrac{|0+0-1|}{\\sqrt{2}}=\\dfrac{1}{\\sqrt{2}}\\), pas \\(-\\dfrac{1}{\\sqrt{2}}\\).</p></div>
  </div>
</div>`,

};

// Injecter les sections au chargement
document.addEventListener('DOMContentLoaded', () => {
  Object.entries(SECTIONS_CONTENT).forEach(([id, html]) => {
    const el = document.getElementById(id);
    if (el) el.outerHTML = html;
  });
  // Re-init MathJax after injection - wait for it to be ready
  const tryMathJax = () => {
    if (window.MathJax && MathJax.typesetPromise) {
      MathJax.typesetPromise();
    } else {
      setTimeout(tryMathJax, 200);
    }
  };
  tryMathJax();
});
