/* GR2 Study — Contenu PHYSIQUE (4e Sciences economiques)
   UAA3 — Module 2 : Moments de force & equilibre.
   Rappels (forces, poids), le moment d'une force (M = +/- F.l, convention de signe),
   manivelles/treuils/poulies (avantage mecanique gamma), l'equilibre de rotation
   (2 conditions, centre de gravite, base de sustentation), + DEFINITIONS du cours
   a connaitre par coeur, schemas, exercices RESOLUS chiffres tires du cours reel.
   Base sur le cours reel (photos) + la feuille d'objectifs d'examen (juin 2026).
   S'enregistre aupres de subjects.js via window.registerSubject. */
(function () {
  'use strict';
  if (typeof window.registerSubject !== 'function') return;

  var sections = {};

  /* ---------------------- SYNTHESE (cours) ---------------------- */
  sections.synthese = `<div id="synthese" class="section active">
    <div style="text-align:center; margin-bottom:1.5rem;">
      <h2 style="font-size:30px; font-weight:800; color:var(--color-nav); margin:0;">⚛️ Physique</h2>
      <p style="color:var(--text-secondary); margin-top:6px;">UAA3 · Module 2 — Moments de force &amp; équilibre</p>
    </div>

    <div class="synth-section">
      <h2>1. Rappels : les forces</h2>
      <p>Une <strong>force</strong> modélise une <strong>action</strong> : pousser, tirer, soulever, attirer… Elle peut <strong>déformer</strong> un objet, le <strong>mettre en mouvement</strong>, le <strong>freiner</strong> ou le faire <strong>tourner</strong>. Son unité est le <strong>newton (N)</strong>.</p>
      <p>Une force possède <strong>4 caractéristiques</strong> → on la représente par un <strong>vecteur</strong> \\(\\vec{F}\\) :</p>
      <ul style="line-height:1.9;">
        <li><strong>① Le point d'application</strong> : l'endroit où la force s'exerce.</li>
        <li><strong>② La direction</strong> (la droite d'action) : horizontale, verticale, oblique…</li>
        <li><strong>③ Le sens</strong> : vers le haut/le bas, la gauche/la droite (la « pointe » de la flèche).</li>
        <li><strong>④ L'intensité</strong> (la norme) : sa valeur en <strong>newtons</strong> (longueur de la flèche, avec une échelle).</li>
      </ul>
      <svg viewBox="0 0 300 120" width="290" style="max-width:100%;height:auto;margin:8px 0 4px" role="img" aria-label="Vecteur force : point d'application, direction, sens, intensité">
        <defs><marker id="fArr" markerWidth="9" markerHeight="9" refX="6" refY="4.5" orient="auto"><path d="M0,0L8,4.5L0,9z" fill="#34d399"/></marker></defs>
        <line x1="40" y1="70" x2="250" y2="70" stroke="#6b7280" stroke-width="1.4" stroke-dasharray="5 4"/>
        <text x="210" y="92" fill="#9ca3af" font-size="11">droite d'action (direction)</text>
        <circle cx="60" cy="70" r="5" fill="#fbbf24"/>
        <text x="36" y="58" fill="#fcd34d" font-size="11">point d'application</text>
        <line x1="60" y1="70" x2="210" y2="70" stroke="#34d399" stroke-width="4" marker-end="url(#fArr)"/>
        <text x="120" y="62" fill="#6ee7b7" font-size="13" font-weight="bold">F (intensité, en N)</text>
      </svg>
      <p><strong>Le poids \\(\\vec{P}\\)</strong> est la force de <strong>pesanteur</strong> : l'attraction exercée par la Terre sur tout objet. Sa formule :</p>
      <div class="key-rule"><div class="formula-main">$$P = m \\times g$$</div></div>
      <ul style="line-height:1.9;">
        <li>\\(P\\) = poids, en <strong>newtons (N)</strong> ; \\(m\\) = masse, en <strong>kilogrammes (kg)</strong> ; \\(g\\) = intensité de la pesanteur ≈ <strong>9,81 N/kg</strong> (souvent arrondi à 10 N/kg).</li>
        <li>Le poids s'applique au <strong>centre de gravité</strong>, sa direction est <strong>verticale</strong> et son sens est <strong>vers le bas</strong>.</li>
      </ul>
      <p>Enfin, la <strong>condition d'équilibre de translation</strong> : un objet est en équilibre (il ne se déplace pas, ou avance à vitesse constante) quand la <strong>somme de toutes les forces est nulle</strong> : \\(\\sum \\vec{F} = \\vec{0}\\).</p>
      <div class="simple-exp-box">
        <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Comprendre simplement</button>
        <div class="simple-exp-content">Ne confonds pas <strong>masse</strong> et <strong>poids</strong> : la masse (en kg) est la « quantité de matière », toujours la même. Le poids (en N) est la <em>force</em> avec laquelle la Terre t'attire — il change si la pesanteur change (sur la Lune, ton poids est ÷6, ta masse ne bouge pas).</div>
      </div>
    </div>

    <div class="synth-section">
      <h2>2. Le moment d'une force</h2>
      <p>Quand une force peut faire <strong>tourner</strong> un objet autour d'un <strong>axe de rotation \\(\\Delta\\)</strong> (un pivot), on mesure son effet de rotation par le <strong>moment</strong> de la force.</p>
      <p>Le <strong>bras de levier \\(\\ell\\)</strong> est la <strong>longueur mesurée perpendiculairement</strong> entre la <strong>droite d'action</strong> de la force et l'<strong>axe de rotation</strong>. L'effet de rotation dépend de la <strong>norme de la force</strong> ET de la <strong>longueur du bras de levier</strong>.</p>
      <div class="key-rule"><div class="formula-main">$$M = \\pm\\, F \\times \\ell$$</div></div>
      <ul style="line-height:1.9;">
        <li>\\(M\\) = moment, en <strong>newton-mètre (N·m)</strong> ; \\(F\\) = intensité de la force (N) ; \\(\\ell\\) = bras de levier (<strong>m</strong>).</li>
        <li><strong>Plus la force est grande</strong>, ou <strong>plus le bras de levier est long</strong>, plus l'effet de rotation est important. (C'est pourquoi on pousse une porte <strong>loin des gonds</strong> : ℓ grand → faible force suffit.)</li>
        <li><strong>Convention de signe</strong> : le moment est <strong>positif (+) dans le sens trigonométrique</strong> (sens inverse des aiguilles d'une montre) et <strong>négatif (−) dans le sens horlogique</strong> (sens des aiguilles d'une montre).</li>
        <li>Si la droite d'action <strong>passe par l'axe</strong>, le bras de levier est nul → le <strong>moment est nul</strong> (la force ne fait pas tourner).</li>
      </ul>
      <svg viewBox="0 0 300 150" width="280" style="max-width:100%;height:auto;margin:8px 0 4px" role="img" aria-label="Moment d'une force : axe, bras de levier, force perpendiculaire">
        <defs><marker id="mArr" markerWidth="9" markerHeight="9" refX="6" refY="4.5" orient="auto"><path d="M0,0L8,4.5L0,9z" fill="#f87171"/></marker></defs>
        <circle cx="50" cy="60" r="6" fill="#fbbf24"/><text x="20" y="50" fill="#fcd34d" font-size="11">axe Δ</text>
        <line x1="50" y1="60" x2="240" y2="60" stroke="#60a5fa" stroke-width="3"/>
        <line x1="50" y1="74" x2="240" y2="74" stroke="#6b7280" stroke-width="1" stroke-dasharray="4 3"/>
        <text x="120" y="92" fill="#9ca3af" font-size="11">bras de levier ℓ</text>
        <line x1="240" y1="60" x2="240" y2="128" stroke="#f87171" stroke-width="4" marker-end="url(#mArr)"/>
        <text x="248" y="104" fill="#fca5a5" font-size="13" font-weight="bold">F</text>
      </svg>
      <p style="margin:.4rem 0 .2rem;"><strong>Le sens de rotation autour de l'axe \\(\\Delta\\)</strong> :</p>
      <svg viewBox="0 0 260 120" width="250" style="max-width:100%;height:auto;margin:2px 0 4px" role="img" aria-label="Sens trigonométrique positif, sens horlogique négatif">
        <defs>
          <marker id="rg" markerWidth="9" markerHeight="9" refX="4" refY="4.5" orient="auto"><path d="M0,0L8,4.5L0,9z" fill="#34d399"/></marker>
          <marker id="rr" markerWidth="9" markerHeight="9" refX="4" refY="4.5" orient="auto"><path d="M0,0L8,4.5L0,9z" fill="#f87171"/></marker>
        </defs>
        <path d="M86,42 A26,26 0 1 0 60,80" fill="none" stroke="#34d399" stroke-width="3" marker-end="url(#rg)"/>
        <text x="60" y="62" fill="#6ee7b7" font-size="30" font-weight="bold" text-anchor="middle">+</text>
        <text x="60" y="104" fill="#9ca3af" font-size="11" text-anchor="middle">trigonométrique (+)</text>
        <path d="M174,42 A26,26 0 1 1 200,80" fill="none" stroke="#f87171" stroke-width="3" marker-end="url(#rr)"/>
        <text x="200" y="62" fill="#fca5a5" font-size="30" font-weight="bold" text-anchor="middle">−</text>
        <text x="200" y="104" fill="#9ca3af" font-size="11" text-anchor="middle">horlogique (−)</text>
      </svg>
      <div style="border-left:4px solid #f59e0b; background:rgba(245,158,11,.08); border-radius:8px; padding:.6rem .9rem; margin:.8rem 0;">
        <strong style="color:#fbbf24;">🔎 Pour aller plus loin</strong> — si la force <strong>n'est pas perpendiculaire</strong> au bras de levier, on ajoute le sinus de l'angle \\(\\alpha\\) entre le bras de levier et la force : \\(M = \\pm\\,F \\times \\ell \\times \\sin\\alpha\\).
      </div>
      <div class="simple-exp-box">
        <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Comprendre simplement</button>
        <div class="simple-exp-content">Le moment, c'est la « <strong>force de rotation</strong> ». Avec une grande clé (long bras de levier), tu desserres un boulon bien plus facilement qu'avec une petite : même force, mais ℓ plus grand → M plus grand.</div>
      </div>
    </div>

    <div class="synth-section">
      <h2>3. Manivelles, treuils &amp; poulies (Chapitre III)</h2>
      <p><strong>Mise en situation — le pédalier d'un vélo.</strong> Le pédalier comporte deux <strong>pédales</strong> reliées par deux <strong>manivelles</strong> à un axe ; sur cet axe est fixé un (ou plusieurs) <strong>plateau(x)</strong>. La <strong>chaîne</strong> relie le plateau au <strong>pignon</strong> de la roue arrière. Une manivelle, un treuil ou un pédalier sont des <strong>machines simples</strong> qui appliquent le principe du moment pour <strong>multiplier une force</strong>.</p>
      <svg viewBox="0 0 300 150" width="290" style="max-width:100%;height:auto;margin:8px 0 4px" role="img" aria-label="Pédalier de vélo : plateau, pignon, chaîne, manivelle et pédale">
        <circle cx="92" cy="82" r="34" fill="none" stroke="#60a5fa" stroke-width="2.4"/><circle cx="92" cy="82" r="4" fill="#e5e7eb"/>
        <circle cx="232" cy="92" r="15" fill="none" stroke="#a855f7" stroke-width="2.4"/><circle cx="232" cy="92" r="3" fill="#e5e7eb"/>
        <line x1="92" y1="48" x2="232" y2="77" stroke="#9ca3af" stroke-width="2"/>
        <line x1="92" y1="116" x2="232" y2="107" stroke="#9ca3af" stroke-width="2"/>
        <line x1="92" y1="82" x2="92" y2="128" stroke="#34d399" stroke-width="3.4"/><rect x="83" y="128" width="18" height="8" rx="2" fill="#34d399"/>
        <text x="60" y="30" fill="#93c5fd" font-size="11">plateau</text>
        <text x="208" y="64" fill="#c4b5fd" font-size="11">pignon</text>
        <text x="150" y="62" fill="#9ca3af" font-size="11">chaîne</text>
        <text x="70" y="148" fill="#6ee7b7" font-size="11">pédale (effort)</text>
      </svg>
      <p>On définit l'<strong>avantage mécanique \\(\\gamma\\)</strong> d'un dispositif rotatif (manivelle, treuil, poulie étagée) :</p>
      <div class="key-rule"><div class="formula-main">$$\\gamma = \\dfrac{F_R}{F_M} = \\dfrac{r_M}{r_R}$$</div></div>
      <ul style="line-height:1.9;">
        <li>\\(F_M\\) = <strong>force motrice</strong> (exercée par l'opérateur) ; \\(F_R\\) = <strong>force résistante</strong> (exercée par l'objet manipulé / la charge).</li>
        <li>\\(r_M\\) = <strong>rayon moteur</strong> (grand rayon, ex. la manivelle) ; \\(r_R\\) = <strong>rayon résistant</strong> (petit rayon, ex. l'axe/tambour).</li>
        <li>Comme \\(r_M > r_R\\), on a \\(\\gamma > 1\\) : on soulève une <strong>grosse charge avec peu de force</strong>. En contrepartie, il faut tirer <strong>plus de longueur</strong> de corde. (Même idée : les <strong>petits et grands plateaux</strong> d'un vélo.)</li>
      </ul>
      <p>La <strong>poulie simple (poulie fixe)</strong> est un cas particulier de manivelle. Comme le rayon est le même des deux côtés (\\(r_M = r_R\\)) :</p>
      <div class="key-rule"><div class="formula-main" style="font-size:18px;">$$\\gamma = \\dfrac{r_M}{r_R} = 1 \\quad\\Rightarrow\\quad F_M = F_R$$</div></div>
      <ul style="line-height:1.9;">
        <li>Elle <strong>ne multiplie pas la force</strong> (avantage mécanique = 1).</li>
        <li>Mais elle <strong>change la direction</strong> de la force : on <strong>tire vers le bas</strong> pour faire <strong>monter</strong> une charge (plus pratique, on peut s'aider de son propre poids).</li>
      </ul>
      <svg viewBox="0 0 300 160" width="270" style="max-width:100%;height:auto;margin:8px 0 4px" role="img" aria-label="Treuil : grand rayon moteur et petit rayon résistant">
        <defs><marker id="tArr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0L7,4L0,8z" fill="#34d399"/></marker><marker id="tArr2" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0L7,4L0,8z" fill="#f87171"/></marker></defs>
        <circle cx="150" cy="70" r="50" fill="none" stroke="#60a5fa" stroke-width="2"/>
        <circle cx="150" cy="70" r="18" fill="none" stroke="#a855f7" stroke-width="2"/>
        <circle cx="150" cy="70" r="3" fill="#e5e7eb"/>
        <line x1="150" y1="70" x2="150" y2="20" stroke="#9ca3af" stroke-width="1.2"/><text x="156" y="40" fill="#93c5fd" font-size="11">r (moteur)</text>
        <line x1="150" y1="70" x2="168" y2="70" stroke="#9ca3af" stroke-width="1.2"/><text x="150" y="92" fill="#c4b5fd" font-size="11">r (résistant)</text>
        <line x1="200" y1="70" x2="200" y2="135" stroke="#34d399" stroke-width="3" marker-end="url(#tArr)"/><text x="206" y="112" fill="#6ee7b7" font-size="12">F (effort)</text>
        <line x1="132" y1="88" x2="132" y2="140" stroke="#f87171" stroke-width="4" marker-end="url(#tArr2)"/><text x="74" y="120" fill="#fca5a5" font-size="12">F (charge)</text>
      </svg>
      <p style="margin-bottom:.3rem;"><strong>Exemples de manivelles / treuils dans la vie courante :</strong></p>
      <ul style="line-height:1.9; margin-top:0;">
        <li>🚲 le <strong>pédalier de vélo</strong> · ☕ le <strong>moulin à café</strong> · 🎣 le <strong>moulinet de pêche</strong> · 🚗 le <strong>cric de voiture</strong> · 🪣 le <strong>treuil de puits</strong>.</li>
      </ul>
      <div class="simple-exp-box">
        <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Comprendre simplement</button>
        <div class="simple-exp-content">Un treuil de puits : tu tournes une grande manivelle (rayon moteur) pour remonter un lourd seau enroulé sur un petit axe (rayon résistant). Tu fais beaucoup de tours (longue distance) mais sans forcer. Une poulie fixe, elle, ne te fait pas gagner de force (γ = 1) — juste tirer dans un sens plus confortable.</div>
      </div>
    </div>

    <div class="synth-section">
      <h2>4. L'équilibre de rotation d'un objet étendu (Chapitre IV)</h2>
      <p>Un <strong>objet étendu</strong> (pas réduit à un point) est en équilibre quand il ne se <strong>déplace pas</strong> ET ne <strong>tourne pas</strong>. Il faut donc <strong>DEUX conditions</strong> en même temps :</p>
      <ul style="line-height:1.9;">
        <li><strong>① Équilibre de translation</strong> : la résultante des forces est nulle → \\(\\sum \\vec{F} = \\vec{0}\\).</li>
        <li><strong>② Équilibre de rotation</strong> (loi des moments) : la somme des moments est nulle → \\(\\sum M = 0\\). Les moments qui font tourner dans un sens <strong>compensent</strong> ceux de l'autre sens.</li>
      </ul>
      <p>Attention : « équilibre de rotation » ne veut pas dire forcément « immobile ». L'objet peut être :</p>
      <ul style="line-height:1.9;">
        <li>en <strong>équilibre statique de rotation</strong> : il <strong>ne tourne pas</strong> (au repos) ;</li>
        <li>en <strong>équilibre dynamique de rotation</strong> : il <strong>tourne à vitesse constante</strong>.</li>
      </ul>
      <p>Sur un <strong>levier / une balançoire</strong> à l'équilibre, les deux moments se compensent :</p>
      <div class="key-rule"><div class="formula-main">$$F_1 \\times \\ell_1 = F_2 \\times \\ell_2$$</div></div>
      <svg viewBox="0 0 320 150" width="300" style="max-width:100%;height:auto;margin:8px 0 4px" role="img" aria-label="Levier en équilibre : F1 fois l1 égale F2 fois l2">
        <defs><marker id="lA" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0L7,4L0,8z" fill="#f87171"/></marker></defs>
        <line x1="30" y1="60" x2="290" y2="60" stroke="#60a5fa" stroke-width="5"/>
        <polygon points="160,62 146,96 174,96" fill="#fbbf24"/><text x="150" y="114" fill="#fcd34d" font-size="11">pivot</text>
        <line x1="70" y1="60" x2="70" y2="118" stroke="#f87171" stroke-width="4" marker-end="url(#lA)"/><text x="58" y="134" fill="#fca5a5" font-size="12">F₁</text>
        <line x1="250" y1="60" x2="250" y2="100" stroke="#f87171" stroke-width="4" marker-end="url(#lA)"/><text x="240" y="118" fill="#fca5a5" font-size="12">F₂</text>
        <line x1="70" y1="50" x2="160" y2="50" stroke="#9ca3af" stroke-width="1" stroke-dasharray="4 3"/><text x="100" y="44" fill="#9ca3af" font-size="11">ℓ₁</text>
        <line x1="160" y1="40" x2="250" y2="40" stroke="#9ca3af" stroke-width="1" stroke-dasharray="4 3"/><text x="196" y="34" fill="#9ca3af" font-size="11">ℓ₂</text>
      </svg>
      <p><strong>Le centre de gravité (G)</strong> est le <strong>point d'application du poids</strong> de tout l'objet. Pour un objet <strong>homogène et symétrique</strong>, il coïncide avec le <strong>centre de symétrie</strong> : milieu d'une tige, centre d'une sphère, centre d'un parallélépipède… Il peut même se situer <strong>hors de la matière</strong> (boule creuse, fer à cheval, boomerang).</p>
      <p><strong>La base de sustentation</strong> est le <strong>polygone</strong> délimité par les <strong>points d'appui</strong> (les pieds, les roues, la semelle…).</p>
      <div class="key-rule"><div class="formula-main">Un objet reste en équilibre tant que la verticale passant par G tombe À L'INTÉRIEUR de la base de sustentation</div></div>
      <div style="display:flex; gap:12px; flex-wrap:wrap; align-items:flex-start;">
        <svg viewBox="0 0 300 160" width="250" style="max-width:100%;height:auto;margin:8px 0 4px" role="img" aria-label="Centre de gravité et base de sustentation (vue de côté)">
          <rect x="110" y="20" width="80" height="100" rx="4" fill="rgba(96,165,250,.14)" stroke="#60a5fa"/>
          <circle cx="150" cy="65" r="5" fill="#fbbf24"/><text x="158" y="62" fill="#fcd34d" font-size="12" font-weight="bold">G</text>
          <line x1="150" y1="65" x2="150" y2="140" stroke="#34d399" stroke-width="2" stroke-dasharray="5 4"/>
          <line x1="95" y1="128" x2="205" y2="128" stroke="#e5e7eb" stroke-width="3"/>
          <text x="150" y="152" fill="#9ca3af" font-size="11" text-anchor="middle">la verticale par G tombe dans la base</text>
        </svg>
        <svg viewBox="0 0 150 130" width="150" style="max-width:100%;height:auto;margin:8px 0 4px" role="img" aria-label="Base de sustentation d'un tabouret (vue de dessus)">
          <polygon points="30,28 118,28 118,98 30,98" fill="rgba(96,165,250,.12)" stroke="#60a5fa" stroke-dasharray="4 3"/>
          <circle cx="30" cy="28" r="4" fill="#9ca3af"/><circle cx="118" cy="28" r="4" fill="#9ca3af"/><circle cx="30" cy="98" r="4" fill="#9ca3af"/><circle cx="118" cy="98" r="4" fill="#9ca3af"/>
          <circle cx="74" cy="63" r="5" fill="#fbbf24"/><text x="80" y="60" fill="#fcd34d" font-size="12" font-weight="bold">G</text>
          <text x="74" y="120" fill="#9ca3af" font-size="10" text-anchor="middle">tabouret 4 pieds (vue de dessus)</text>
        </svg>
      </div>
      <p>Si cette verticale <strong>sort</strong> de la base de sustentation → l'objet <strong>bascule</strong>. C'est pourquoi on écarte les pieds (base plus large) pour être plus stable. La <strong>Tour de Pise</strong> (commencée en 1173) tient toujours car la droite d'action de son poids traverse encore sa base de sustentation.</p>
      <div class="simple-exp-box">
        <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Comprendre simplement</button>
        <div class="simple-exp-content">Penche-toi de plus en plus : tant que ton poids « tombe » entre tes pieds (dans ta base de sustentation), ça va. Dès que ça sort, tu bascules. Élargir les pieds et rester bas = plus stable.</div>
      </div>
    </div>

    <div class="synth-section">
      <h2>⭐ 5. Définitions à connaître par cœur</h2>
      <p style="color:var(--text-secondary); margin-top:-4px;">Les définitions <strong>exactes du cours</strong>, à restituer telles quelles à l'examen.</p>

      <div style="border-left:4px solid #a855f7; background:rgba(168,85,247,.08); border-radius:8px; padding:.7rem 1rem; margin:.7rem 0;">
        <div style="font-weight:700; color:#c4b5fd; margin-bottom:.25rem;">📐 Le moment d'une force</div>
        <div style="line-height:1.7;">Le <strong>bras de levier</strong> est la longueur mesurée perpendiculairement entre la droite d'action de la force et l'axe de rotation. Le <strong>moment d'une force</strong> par rapport à un axe de rotation perpendiculaire à celle-ci est le produit \\(M = \\pm F \\times \\ell\\), avec F en N, ℓ en m, M en N·m. Le <strong>signe ±</strong> dépend du sens de rotation : <strong>+</strong> dans le sens <strong>trigonométrique</strong>, <strong>−</strong> dans le sens <strong>horlogique</strong>.</div>
      </div>

      <div style="border-left:4px solid #a855f7; background:rgba(168,85,247,.08); border-radius:8px; padding:.7rem 1rem; margin:.7rem 0;">
        <div style="font-weight:700; color:#c4b5fd; margin-bottom:.25rem;">⚖️ L'équilibre d'un objet étendu</div>
        <div style="line-height:1.7;">Un objet étendu, initialement au repos et soumis à plusieurs forces dans un même plan, <strong>reste immobile</strong> s'il vérifie <strong>simultanément</strong> les deux conditions : <strong>①</strong> la résultante des forces qu'il subit est nulle (<em>équilibre de translation</em>, \\(\\sum\\vec{F}=\\vec{0}\\)) ; <strong>②</strong> la somme des moments de force par rapport à un axe est nulle (<em>équilibre de rotation</em>, \\(\\sum M = 0\\)).</div>
      </div>

      <div style="border-left:4px solid #a855f7; background:rgba(168,85,247,.08); border-radius:8px; padding:.7rem 1rem; margin:.7rem 0;">
        <div style="font-weight:700; color:#c4b5fd; margin-bottom:.25rem;">🔄 L'équilibre de rotation</div>
        <div style="line-height:1.7;">Un objet libre de tourner autour d'un axe fixe est en <strong>équilibre de rotation</strong> lorsque, par rapport à cet axe, la <strong>somme des moments des forces</strong> agissant sur lui est <strong>nulle</strong> : \\(\\sum M = M_{F_1} + M_{F_2} + M_{F_3} + \\cdots = 0\\). Il peut alors être <strong>statique</strong> (immobile) ou <strong>dynamique</strong> (rotation à vitesse constante).</div>
      </div>

      <div style="border-left:4px solid #a855f7; background:rgba(168,85,247,.08); border-radius:8px; padding:.7rem 1rem; margin:.7rem 0;">
        <div style="font-weight:700; color:#c4b5fd; margin-bottom:.25rem;">🎯 Le centre de gravité (G)</div>
        <div style="line-height:1.7;">Le <strong>centre de gravité</strong> d'un objet est le <strong>point d'application de son poids</strong>. Il occupe une position fixe par rapport à l'objet. Si l'objet est homogène et symétrique, il coïncide avec son <strong>centre de symétrie</strong> (et peut se situer hors de la matière).</div>
      </div>

      <div style="border-left:4px solid #a855f7; background:rgba(168,85,247,.08); border-radius:8px; padding:.7rem 1rem; margin:.7rem 0;">
        <div style="font-weight:700; color:#c4b5fd; margin-bottom:.25rem;">🟦 La base de sustentation</div>
        <div style="line-height:1.7;">Si un objet a plusieurs points de contact avec le sol, l'équilibre n'est possible que si la <strong>verticale passant par son centre de gravité traverse le polygone formé par ces points de contact</strong>. Ce polygone est appelé <strong>base de sustentation</strong>.</div>
      </div>

      <div style="border-left:4px solid #a855f7; background:rgba(168,85,247,.08); border-radius:8px; padding:.7rem 1rem; margin:.7rem 0;">
        <div style="font-weight:700; color:#c4b5fd; margin-bottom:.25rem;">⚙️ L'avantage mécanique \\(\\gamma\\)</div>
        <div style="line-height:1.7;">Les manivelles, treuils et poulies étagées sont des dispositifs rotatifs dont l'<strong>avantage mécanique</strong> se calcule par \\(\\gamma = \\dfrac{F_R}{F_M} = \\dfrac{r_M}{r_R}\\) : \\(F_R\\) force résistante, \\(F_M\\) force motrice, \\(r_M\\) rayon moteur, \\(r_R\\) rayon résistant. Pour une <strong>poulie simple</strong>, \\(\\gamma = 1\\) (elle change la direction sans multiplier la force).</div>
      </div>
    </div>
  </div>`;

  /* ---------------------- REPERES ---------------------- */
  sections.formules = `<div id="formules" class="section">
    <h2 style="font-size:30px; font-weight:800; color:var(--color-nav); margin-bottom:1rem;">📌 Repères à connaître</h2>
    <div class="formula-grid">
      <div>
        <div class="formula-box"><h3>Grandeurs &amp; unités (GSU)</h3><p style="line-height:1.9; margin:0;">Masse <strong>m</strong> → <strong>kg</strong> · Force/poids <strong>F, P</strong> → <strong>N</strong> · Pesanteur <strong>g</strong> ≈ <strong>9,81 N/kg</strong> · Bras de levier <strong>ℓ</strong> → <strong>m</strong> · Moment <strong>M</strong> → <strong>N·m</strong> · Avantage méca. <strong>γ</strong> → sans unité</p></div>
        <div class="formula-box"><h3>Le poids</h3><div class="formula-main">$$P = m \\times g$$</div><p class="note">P en N, m en kg, g ≈ 9,81 N/kg. À ne pas confondre avec la masse.</p></div>
        <div class="formula-box"><h3>Les 4 caractéristiques d'une force</h3><p style="line-height:1.9; margin:0;">Point d'application · Direction · Sens · Intensité (N) → vecteur \\(\\vec{F}\\).</p></div>
        <div class="formula-box"><h3>Moment d'une force</h3><div class="formula-main">$$M = \\pm\\,F \\times \\ell$$</div><p class="note">M (N·m), F (N), ℓ = bras de levier (m). Signe : + trigonométrique, − horlogique.</p></div>
        <div class="formula-box"><h3>Force non perpendiculaire</h3><div class="formula-main" style="font-size:17px;">$$M = \\pm\\,F\\,\\ell\\,\\sin\\alpha$$</div><p class="note">α = angle entre le bras de levier et la force. (Pour aller plus loin.)</p></div>
      </div>
      <div>
        <div class="formula-box"><h3>Équilibre (2 conditions)</h3><p style="line-height:1.9; margin:0;"><strong>Translation</strong> : \\(\\sum \\vec{F}=\\vec{0}\\)<br><strong>Rotation</strong> : \\(\\sum M = 0\\) (loi des moments).</p></div>
        <div class="formula-box"><h3>Le levier / la balançoire</h3><div class="formula-main">$$F_1\\,\\ell_1 = F_2\\,\\ell_2$$</div><p class="note">À l'équilibre, les deux moments se compensent.</p></div>
        <div class="formula-box"><h3>Avantage mécanique (treuil, manivelle)</h3><div class="formula-main" style="font-size:16px;">$$\\gamma = \\dfrac{F_R}{F_M} = \\dfrac{r_M}{r_R}$$</div><p class="note">F_M motrice, F_R résistante ; r_M rayon moteur, r_R rayon résistant. On gagne en force, on perd en distance.</p></div>
        <div class="formula-box"><h3>Poulie fixe (simple)</h3><p style="line-height:1.9; margin:0;">\\(\\gamma = 1\\) : ne multiplie <strong>pas</strong> la force (\\(F_M=F_R\\)) ; elle <strong>change la direction</strong>.</p></div>
        <div class="formula-box"><h3>Stabilité</h3><p style="line-height:1.9; margin:0;">Équilibre tant que la <strong>verticale par G</strong> tombe dans la <strong>base de sustentation</strong>.</p></div>
      </div>
    </div>
  </div>`;

  /* ---------------------- METHODE ---------------------- */
  sections.methodes = `<div id="methodes" class="section">
    <h2 style="font-size:30px; font-weight:800; color:var(--color-nav); margin-bottom:1rem;">📝 Méthode</h2>
    <div class="synth-section">
      <h2>Stratégie de résolution d'un problème d'équilibre (du cours)</h2>
      <div class="step-item"><div class="step-num">1</div><div class="step-text"><strong>Repérer l'objet et son axe de rotation.</strong></div></div>
      <div class="step-item"><div class="step-num">2</div><div class="step-text"><strong>Déterminer les forces</strong> s'exerçant sur l'objet considéré (poids, tensions, réactions…) avec leur point d'application.</div></div>
      <div class="step-item"><div class="step-num">3</div><div class="step-text"><strong>Poser la résultante des forces comme étant nulle</strong> : \\(\\sum\\vec{F}=\\vec{0}\\) (équilibre de translation).</div></div>
      <div class="step-item"><div class="step-num">4</div><div class="step-text"><strong>Déterminer les bras de levier</strong> des forces par rapport à l'axe (en mètres !).</div></div>
      <div class="step-item"><div class="step-num">5</div><div class="step-text"><strong>Calculer les moments</strong> \\(M = \\pm F\\times\\ell\\) en faisant attention au <strong>signe</strong> (+ trigonométrique, − horlogique). Une force qui passe par l'axe → moment nul.</div></div>
      <div class="step-item"><div class="step-num">6</div><div class="step-text"><strong>Poser la somme des moments comme étant nulle</strong> : \\(\\sum M = 0\\), puis <strong>résoudre</strong> pour trouver l'inconnue.</div></div>
    </div>
  </div>`;

  /* ---------------------- EXERCICES ---------------------- */
  sections.exercices = `<div id="exercices" class="section">
    <h2 style="font-size:30px; font-weight:800; color:var(--color-nav); margin-bottom:1rem;">🎯 Exercices</h2>
    <p style="color:var(--text-secondary); margin-bottom:1.2rem;">Cherche d'abord seul, puis vérifie la solution détaillée.</p>

    <div class="exercise-card">
      <h3 style="font-size:20px; font-weight:600; color:var(--color-nav);">🛠️ Exercices résolus (du cours)</h3>

      <p style="margin-bottom:.2rem;"><strong>① Le treuil.</strong> Un treuil a un tambour de <strong>20 cm de diamètre</strong> et une manivelle de <strong>40 cm de long</strong>. Calcule l'avantage mécanique, puis la force à exercer sur la manivelle pour soulever une masse de <strong>10 kg</strong>.</p>
      <details style="margin:.2rem 0 .9rem;"><summary style="cursor:pointer; color:var(--color-nav); font-weight:600;">Voir la solution</summary>
      <div style="line-height:1.9; padding:.4rem 0;">Rayon moteur \\(r_M = 40\\) cm (manivelle) ; rayon résistant \\(r_R = 20/2 = 10\\) cm (tambour).<br>
      Avantage mécanique : \\(\\gamma = \\dfrac{r_M}{r_R} = \\dfrac{40}{10} = \\mathbf{4}\\).<br>
      Charge à soulever : \\(F_R = m\\times g = 10 \\times 9,81 = 98,1\\) N.<br>
      Force motrice : \\(F_M = \\dfrac{F_R}{\\gamma} = \\dfrac{98,1}{4} \\approx \\mathbf{24,5\\ N}\\).</div></details>

      <p style="margin-bottom:.2rem;"><strong>② Le vélo.</strong> Un cycliste pousse sur la pédale avec une force de <strong>50 N</strong>. Le rayon moteur vaut <strong>18 cm</strong> et le rayon résistant <strong>8 cm</strong>. Calcule l'avantage mécanique et la tension dans la chaîne.</p>
      <details style="margin:.2rem 0 .9rem;"><summary style="cursor:pointer; color:var(--color-nav); font-weight:600;">Voir la solution</summary>
      <div style="line-height:1.9; padding:.4rem 0;">Avantage mécanique : \\(\\gamma = \\dfrac{r_M}{r_R} = \\dfrac{18}{8} = \\mathbf{2,25}\\).<br>
      Tension dans la chaîne (force résistante) : \\(F_R = \\gamma \\times F_M = 2,25 \\times 50 = \\mathbf{112,5\\ N}\\).</div></details>

      <p style="margin-bottom:.2rem;"><strong>③ Le robinet.</strong> La poignée d'un robinet mesure <strong>8 cm</strong> et son avantage mécanique vaut <strong>40</strong>. Calcule le diamètre de la tige centrale.</p>
      <details style="margin:.2rem 0 .9rem;"><summary style="cursor:pointer; color:var(--color-nav); font-weight:600;">Voir la solution</summary>
      <div style="line-height:1.9; padding:.4rem 0;">\\(\\gamma = \\dfrac{r_M}{r_R} \\Rightarrow r_R = \\dfrac{r_M}{\\gamma} = \\dfrac{8}{40} = 0,2\\) cm.<br>
      Diamètre de la tige : \\(d = 2\\times r_R = \\mathbf{0,4\\ cm}\\) (= 4 mm).</div></details>

      <p style="margin-bottom:.2rem;"><strong>④ Loi des moments.</strong> Sur une baguette, le fil 1 exerce \\(F_1 = 4\\) N à \\(\\ell_1 = 10\\) cm de l'axe ; la souris bleue exerce \\(F_b = 2\\) N à \\(\\ell_b = 20\\) cm. Vérifie l'équilibre de rotation.</p>
      <details style="margin:.2rem 0 .2rem;"><summary style="cursor:pointer; color:var(--color-nav); font-weight:600;">Voir la solution</summary>
      <div style="line-height:1.9; padding:.4rem 0;">\\(M_1 = +F_1\\,\\ell_1 = +4 \\times 0,10 = +0,40\\) N·m.<br>
      \\(M_b = -F_b\\,\\ell_b = -2 \\times 0,20 = -0,40\\) N·m.<br>
      \\(\\sum M = +0,40 - 0,40 = \\mathbf{0}\\) → la baguette est bien en équilibre de rotation.</div></details>
    </div>

    <div class="exercise-card">
      <h3 style="font-size:20px; font-weight:600; color:var(--color-nav);">📐 Exercices du Chapitre IV (calculs de moments)</h3>

      <p style="margin-bottom:.2rem;"><strong>⑤ La clé et l'écrou.</strong> Pour serrer l'écrou du pédalier d'un vélo, on pousse sur une clé. Le bras de levier vaut <strong>ℓ = 13 cm</strong> et la force <strong>F = 300 N</strong>. Que vaut le moment de la force ? Quand l'effet est-il maximal ?</p>
      <details style="margin:.2rem 0 .9rem;"><summary style="cursor:pointer; color:var(--color-nav); font-weight:600;">Voir la solution</summary>
      <div style="line-height:1.9; padding:.4rem 0;">Conversion : \\(\\ell = 13\\) cm \\(= 0,13\\) m.<br>
      \\(M = F \\times \\ell = 300 \\times 0,13 = \\mathbf{39\\ N\\cdot m}\\).<br>
      L'effet (le moment) est <strong>maximal</strong> quand la force est <strong>perpendiculaire</strong> à la clé (sin α = 1) et que le bras de levier est le <strong>plus grand</strong> possible.</div></details>

      <p style="margin-bottom:.2rem;"><strong>⑥ La force inclinée.</strong> Une barre de <strong>150 cm</strong> tourne autour d'un axe à une extrémité. À l'autre bout, on tire avec une force <strong>F = 4 N</strong> faisant un angle de <strong>30°</strong> avec la barre. Calcule le moment.</p>
      <details style="margin:.2rem 0 .9rem;"><summary style="cursor:pointer; color:var(--color-nav); font-weight:600;">Voir la solution</summary>
      <div style="line-height:1.9; padding:.4rem 0;">Force non perpendiculaire → \\(M = F \\times \\ell \\times \\sin\\alpha\\).<br>
      \\(\\ell = 150\\) cm \\(= 1,5\\) m ; \\(\\alpha = 30°\\) (\\(\\sin 30° = 0,5\\)).<br>
      \\(M = 4 \\times 1,5 \\times \\sin 30° = 4 \\times 1,5 \\times 0,5 = \\mathbf{3\\ N\\cdot m}\\).</div></details>

      <p style="margin-bottom:.2rem;"><strong>⑦ La barre en équilibre.</strong> Une barre homogène de masse négligeable, de <strong>50 cm</strong> de long, est posée sur un support à son <strong>extrémité droite</strong>. À <strong>10 cm</strong> de cette extrémité est accroché un objet de <strong>300 g</strong>, et <strong>25 cm plus loin</strong> un objet de <strong>100 g</strong>. Quelle force faut-il exercer à l'autre extrémité pour maintenir l'équilibre ?</p>
      <details style="margin:.2rem 0 .2rem;"><summary style="cursor:pointer; color:var(--color-nav); font-weight:600;">Voir la solution</summary>
      <div style="line-height:1.9; padding:.4rem 0;">Le <strong>pivot</strong> = le support (extrémité droite) ; on mesure les bras de levier depuis ce pivot.<br>
      Poids : \\(P_1 = 0,300 \\times 9,81 = 2,943\\) N (à 0,10 m) ; \\(P_2 = 0,100 \\times 9,81 = 0,981\\) N (à \\(0,10+0,25 = 0,35\\) m).<br>
      La force cherchée \\(F\\) agit à l'autre bout, soit à 0,50 m du pivot.<br>
      Équilibre de rotation \\((\\sum M = 0)\\) :<br>
      \\(F \\times 0,50 = P_1 \\times 0,10 + P_2 \\times 0,35 = 0,2943 + 0,3434 = 0,6376\\)<br>
      \\(F = \\dfrac{0,6376}{0,50} \\approx \\mathbf{1,28\\ N}\\), dirigée <strong>vers le haut</strong>.<br>
      <em>Caractéristiques de la force :</em> point d'application = l'extrémité gauche · direction = verticale · sens = vers le haut · intensité ≈ 1,28 N.</div></details>
    </div>

    <div class="exercise-card">
      <h3 style="font-size:20px; font-weight:600; color:var(--color-nav);">🧮 Calculs express</h3>
      <ul style="line-height:2;">
        <li>Poids d'une masse de <strong>5 kg</strong> (g = 9,81 N/kg) ? → \\(P = 5\\times 9,81 = \\mathbf{49{,}05\\ N}\\).</li>
        <li>Moment d'une force de <strong>20 N</strong> avec un bras de levier de <strong>0,30 m</strong> ? → \\(M = 20\\times 0,30 = \\mathbf{6\\ N\\cdot m}\\).</li>
        <li>Balançoire : à gauche 300 N à 1,2 m. À droite, à quelle distance mettre 400 N pour l'équilibre ? → \\(\\ell_2 = \\dfrac{300\\times1,2}{400} = \\mathbf{0,9\\ m}\\).</li>
      </ul>
    </div>

    <div class="exercise-card">
      <h3 style="font-size:20px; font-weight:600; color:var(--color-nav);">⚖️ Vrai / Faux</h3>
      <ul style="line-height:2;">
        <li>« Masse et poids, c'est pareil. » → <strong>Faux</strong> (kg vs N ; le poids dépend de g).</li>
        <li>« Une poulie fixe divise la force par 2. » → <strong>Faux</strong> (γ = 1 : elle change seulement la direction).</li>
        <li>« Plus le bras de levier est long, plus le moment est grand. » → <strong>Vrai</strong>.</li>
        <li>« Une force qui passe par l'axe ne fait pas tourner l'objet. » → <strong>Vrai</strong> (moment nul).</li>
        <li>« Un moment dans le sens horlogique est compté négatif. » → <strong>Vrai</strong> (convention de signe).</li>
      </ul>
    </div>

    <div class="exercise-card">
      <h3 style="font-size:20px; font-weight:600; color:var(--color-nav);">📋 À retenir par cœur</h3>
      <ul style="line-height:2;">
        <li>Les <strong>4 caractéristiques</strong> d'une force.</li>
        <li>La formule du <strong>poids</strong> et celle du <strong>moment</strong> (\\(M = \\pm F\\ell\\), avec le signe).</li>
        <li>Les <strong>2 conditions d'équilibre</strong> (translation + rotation).</li>
        <li>L'<strong>avantage mécanique</strong> \\(\\gamma = F_R/F_M = r_M/r_R\\) (treuil) vs <strong>poulie fixe</strong> (γ = 1, change la direction).</li>
        <li>Le rôle du <strong>centre de gravité</strong> et de la <strong>base de sustentation</strong>.</li>
      </ul>
      <p style="color:var(--text-secondary);">👉 Le <strong>Quiz</strong> et les <strong>Flashcards</strong> (en haut) testent tout ça.</p>
    </div>
  </div>`;

  /* ---------------------- ERREURS ---------------------- */
  sections.erreurs = `<div id="erreurs" class="section">
    <h2 style="font-size:30px; font-weight:800; color:var(--color-nav); margin-bottom:1rem;">⚠️ Pièges fréquents</h2>
    <div class="formula-grid">
      <div class="formula-box"><h3>❌ Confondre masse et poids</h3><p>La <strong>masse</strong> est en <strong>kg</strong> (quantité de matière, constante). Le <strong>poids</strong> est une <strong>force</strong> en <strong>N</strong> : \\(P=m\\,g\\).</p></div>
      <div class="formula-box"><h3>❌ Oublier le bras de levier en mètres</h3><p>Dans \\(M=F\\times\\ell\\), \\(\\ell\\) est en <strong>mètres</strong>. Convertis les cm ! (10 cm = 0,10 m). Sinon le moment est faux.</p></div>
      <div class="formula-box"><h3>❌ Oublier le signe des moments</h3><p>Les moments ont un <strong>sens</strong> : <strong>+</strong> trigonométrique, <strong>−</strong> horlogique. À l'équilibre : \\(\\sum M = 0\\).</p></div>
      <div class="formula-box"><h3>❌ « La poulie fixe fait gagner de la force »</h3><p>Non : son avantage mécanique vaut <strong>γ = 1</strong>, elle ne change que la <strong>direction</strong>. C'est le <strong>treuil</strong> (γ > 1) qui réduit la force.</p></div>
      <div class="formula-box"><h3>❌ Inverser rayon moteur / résistant</h3><p>\\(\\gamma = \\dfrac{r_M}{r_R}\\) : rayon <strong>moteur</strong> (grand, la manivelle) sur rayon <strong>résistant</strong> (petit, l'axe). Inversé → tu trouves l'inverse de γ.</p></div>
      <div class="formula-box"><h3>❌ Une seule condition d'équilibre</h3><p>Pour un objet étendu, il faut les <strong>deux</strong> : \\(\\sum\\vec{F}=\\vec{0}\\) <strong>et</strong> \\(\\sum M=0\\).</p></div>
    </div>
  </div>`;

  /* ---------------------- QUIZ ---------------------- */
  var questions = [
    // -- Les forces (rappels) --
    { q: "Quelle est l'unité d'une force ?", opts: ["le newton (N)", "le kilogramme (kg)", "le joule (J)", "le mètre (m)"], ans: 0, chapter: "forces", difficulty: "facile", exp: "Une force se mesure en newtons (N). Le kilogramme est l'unité de masse." },
    { q: "Les 4 caractéristiques d'une force sont :", opts: ["point d'application, direction, sens, intensité", "masse, poids, vitesse, temps", "longueur, largeur, hauteur, poids", "haut, bas, gauche, droite"], ans: 0, chapter: "forces", difficulty: "intermediaire", exp: "Une force = point d'application + direction + sens + intensité -> on la represente par un vecteur." },
    { q: "La formule du poids est :", opts: ["P = m × g", "P = m / g", "P = m + g", "P = g / m"], ans: 0, chapter: "forces", difficulty: "facile", exp: "Poids = masse x intensite de la pesanteur. P en N, m en kg, g ~ 9,81 N/kg." },
    { q: "Le poids d'une masse de 10 kg (g = 9,81 N/kg) vaut environ :", opts: ["98,1 N", "10 N", "9,81 N", "0,98 N"], ans: 0, chapter: "forces", difficulty: "intermediaire", exp: "P = m × g = 10 × 9,81 = 98,1 N." },
    { q: "Masse et poids :", opts: ["la masse est en kg, le poids est une force en N", "c'est exactement la même chose", "la masse est en N, le poids en kg", "le poids ne dépend jamais de g"], ans: 0, chapter: "forces", difficulty: "intermediaire", exp: "La masse (kg) est constante ; le poids (N) est la force d'attraction et depend de g.", simple: "Ta masse ne change pas si tu vas sur la Lune, mais ton poids y est 6 fois plus petit (g plus faible)." },
    { q: "La condition d'équilibre de translation est :", opts: ["la somme des forces est nulle", "la somme des forces est maximale", "il n'y a qu'une seule force", "le poids est nul"], ans: 0, chapter: "forces", difficulty: "intermediaire", exp: "Equilibre de translation : la somme des forces = 0 -> l'objet ne se deplace pas (ou avance a vitesse constante)." },
    // -- Le moment d'une force --
    { q: "Le moment d'une force se calcule par :", opts: ["M = ± F × ℓ", "M = F / ℓ", "M = F + ℓ", "M = ℓ / F"], ans: 0, chapter: "moment", difficulty: "facile", exp: "Moment = force x bras de levier (avec un signe). M en N.m, F en N, l en m." },
    { q: "L'unité du moment d'une force est :", opts: ["le newton-mètre (N·m)", "le newton (N)", "le mètre (m)", "le watt (W)"], ans: 0, chapter: "moment", difficulty: "facile", exp: "Le moment se mesure en N.m (force x distance)." },
    { q: "Le bras de levier, c'est :", opts: ["la longueur mesurée perpendiculairement entre la droite d'action de la force et l'axe", "la longueur totale de l'objet", "la masse de l'objet", "la vitesse de rotation"], ans: 0, chapter: "moment", difficulty: "intermediaire", exp: "Bras de levier l = longueur perpendiculaire entre la droite d'action de la force et l'axe de rotation." },
    { q: "Une force de 50 N avec un bras de levier de 0,40 m crée un moment de :", opts: ["20 N·m", "12,5 N·m", "125 N·m", "200 N·m"], ans: 0, chapter: "moment", difficulty: "intermediaire", exp: "M = F × ℓ = 50 × 0,40 = 20 N·m." },
    { q: "Selon la convention de signe du cours, un moment est positif (+) dans le sens :", opts: ["trigonométrique (inverse des aiguilles d'une montre)", "horlogique (sens des aiguilles)", "vertical", "il est toujours positif"], ans: 0, chapter: "moment", difficulty: "intermediaire", exp: "Convention : + dans le sens trigonometrique, - dans le sens horlogique." },
    { q: "Pourquoi pousse-t-on une porte loin des gonds ?", opts: ["pour augmenter le bras de levier (donc le moment)", "pour diminuer le moment", "pour augmenter la masse", "ça ne change rien"], ans: 0, chapter: "moment", difficulty: "intermediaire", exp: "Loin des gonds -> l grand -> M = F x l grand -> on tourne la porte avec moins de force.", simple: "Essaie de pousser une porte juste à côté des charnières : très dur ! Loin des charnières, c'est facile." },
    { q: "Une force dont la droite d'action passe par l'axe de rotation a un moment :", opts: ["nul (elle ne fait pas tourner)", "maximal", "négatif", "égal à la force"], ans: 0, chapter: "moment", difficulty: "difficile", exp: "Si la force passe par l'axe, le bras de levier est nul -> M = F x 0 = 0." },
    { q: "Quand la force n'est PAS perpendiculaire au bras de levier, le moment vaut :", opts: ["M = ± F × ℓ × sin α", "M = F × ℓ", "M = F / sin α", "M = F + ℓ"], ans: 0, chapter: "moment", difficulty: "difficile", exp: "On ajoute sin(alpha), l'angle entre le bras de levier et la force : M = +/- F x l x sin(alpha)." },
    { q: "Une clé (bras de levier 13 cm) serre un écrou avec une force de 300 N. Le moment vaut :", opts: ["39 N·m", "3900 N·m", "300 N·m", "23 N·m"], ans: 0, chapter: "moment", difficulty: "difficile", exp: "Convertir d'abord : 13 cm = 0,13 m. M = F x l = 300 x 0,13 = 39 N.m. (Piege : ne pas oublier de convertir les cm en m.)" },
    { q: "Une force de 4 N agit à 30° au bout d'une barre de 150 cm. Le moment vaut :", opts: ["3 N·m", "6 N·m", "600 N·m", "1,5 N·m"], ans: 0, chapter: "moment", difficulty: "difficile", exp: "Force non perpendiculaire : M = F x l x sin(alpha) = 4 x 1,5 x sin30 = 4 x 1,5 x 0,5 = 3 N.m." },
    // -- Manivelles, treuils & poulies --
    { q: "L'avantage mécanique d'un treuil se calcule par :", opts: ["γ = F_R / F_M = r_moteur / r_résistant", "γ = F_M / F_R", "γ = r_résistant / r_moteur", "γ = F × ℓ"], ans: 0, chapter: "machines", difficulty: "difficile", exp: "Avantage mecanique gamma = force resistante / force motrice = rayon moteur / rayon resistant." },
    { q: "Avec un treuil (rayon moteur > rayon résistant) :", opts: ["on soulève une grosse charge avec peu de force (mais on tire plus de corde)", "on a besoin de plus de force que la charge", "la force et la charge sont égales", "on ne peut rien soulever"], ans: 0, chapter: "machines", difficulty: "intermediaire", exp: "Comme r_moteur > r_resistant, gamma > 1 : gain de force, au prix d'une plus grande longueur de corde." },
    { q: "Une poulie FIXE (simple) a un avantage mécanique :", opts: ["γ = 1 : elle change la direction sans multiplier la force", "γ = 2 : elle divise la force par 2", "γ = 0", "γ très grand"], ans: 0, chapter: "machines", difficulty: "intermediaire", exp: "Poulie simple : r_moteur = r_resistant -> gamma = 1 ; F_M = F_R, seule la direction change." },
    { q: "Un treuil a un tambour de 20 cm de diamètre et une manivelle de 40 cm. Son avantage mécanique vaut :", opts: ["4", "2", "0,5", "8"], ans: 0, chapter: "machines", difficulty: "difficile", exp: "r_moteur = 40 cm, r_resistant = 20/2 = 10 cm. gamma = 40/10 = 4." },
    { q: "Parmi ces objets, lequel N'EST PAS une manivelle / un treuil ?", opts: ["une échelle posée contre un mur", "un moulin à café", "un moulinet de pêche", "un cric de voiture"], ans: 0, chapter: "machines", difficulty: "facile", exp: "Moulin a cafe, moulinet de peche et cric de voiture sont des manivelles/treuils. Pas l'echelle." },
    { q: "Un cycliste pousse à 50 N sur la pédale (r moteur 18 cm, r résistant 8 cm). La tension dans la chaîne vaut :", opts: ["112,5 N", "50 N", "22,2 N", "400 N"], ans: 0, chapter: "machines", difficulty: "difficile", exp: "gamma = 18/8 = 2,25 ; F_R = gamma x F_M = 2,25 x 50 = 112,5 N." },
    // -- Equilibre de rotation --
    { q: "Pour qu'un objet étendu soit en équilibre, il faut :", opts: ["ΣF = 0 ET Σmoments = 0", "seulement ΣF = 0", "seulement Σmoments = 0", "que le poids soit nul"], ans: 0, chapter: "equilibre", difficulty: "intermediaire", exp: "Deux conditions simultanees : equilibre de translation (somme des forces = 0) ET de rotation (somme des moments = 0)." },
    { q: "Sur une balançoire à l'équilibre :", opts: ["F₁ × ℓ₁ = F₂ × ℓ₂", "F₁ = F₂", "ℓ₁ = ℓ₂", "F₁ + F₂ = 0"], ans: 0, chapter: "equilibre", difficulty: "intermediaire", exp: "Les moments se compensent : F1.l1 = F2.l2. Un enfant leger loin du pivot equilibre un lourd pres du pivot.", simple: "Le plus léger se met loin du centre, le plus lourd se met près : leurs « forces de rotation » s'égalisent." },
    { q: "Barre (support à droite) : 300 g à 10 cm et 100 g à 35 cm du support. Force à exercer à 50 cm pour l'équilibre ?", opts: ["≈ 1,28 N vers le haut", "≈ 4 N vers le bas", "0 N", "≈ 40 N"], ans: 0, chapter: "equilibre", difficulty: "difficile", exp: "Somme des moments = 0 : F x 0,50 = (0,300x9,81)x0,10 + (0,100x9,81)x0,35 = 0,638. Donc F = 0,638/0,50 = 1,28 N, dirigee vers le haut." },
    { q: "L'équilibre de rotation peut être statique ou dynamique. « Dynamique » signifie :", opts: ["l'objet tourne à vitesse constante", "l'objet est totalement immobile", "l'objet accélère", "il n'y a aucune force"], ans: 0, chapter: "equilibre", difficulty: "intermediaire", exp: "Equilibre statique = immobile ; equilibre dynamique = rotation a vitesse constante. Dans les deux cas la somme des moments = 0." },
    { q: "Le centre de gravité d'un objet est :", opts: ["le point d'application de son poids", "le point le plus lourd visible", "toujours au sommet", "le point d'appui au sol"], ans: 0, chapter: "equilibre", difficulty: "facile", exp: "Le centre de gravite (G) est le point d'application du poids de tout l'objet." },
    { q: "Le centre de gravité d'un objet :", opts: ["peut se situer hors de la matière (boomerang, fer à cheval)", "est toujours dans la matière", "est toujours au sol", "n'existe que pour les sphères"], ans: 0, chapter: "equilibre", difficulty: "intermediaire", exp: "Pour un objet homogene symetrique il est au centre de symetrie, mais il peut etre hors matiere (boule creuse, fer a cheval, boomerang)." },
    { q: "La base de sustentation est :", opts: ["le polygone formé par les points d'appui au sol", "le poids de l'objet", "le centre de gravité", "la hauteur de l'objet"], ans: 0, chapter: "equilibre", difficulty: "facile", exp: "Base de sustentation = polygone delimite par les points de contact avec le sol (pieds, roues...)." },
    { q: "Un objet bascule (perd l'équilibre) quand :", opts: ["la verticale passant par G sort de la base de sustentation", "son centre de gravité est bas", "sa base de sustentation est large", "son poids est faible"], ans: 0, chapter: "equilibre", difficulty: "difficile", exp: "Tant que la verticale par G tombe dans la base de sustentation, l'objet tient. Si elle en sort, il bascule.", simple: "La Tour de Pise tient car la verticale de son poids traverse encore sa base." },
    { q: "Pour être plus stable, on a intérêt à :", opts: ["élargir la base de sustentation et abaisser le centre de gravité", "rétrécir la base et monter le centre de gravité", "augmenter son poids uniquement", "se mettre sur la pointe des pieds"], ans: 0, chapter: "equilibre", difficulty: "intermediaire", exp: "Base large + centre de gravite bas = plus stable (un lutteur ecarte les appuis et reste bas)." }
  ];

  /* ---------------------- FLASHCARDS ---------------------- */
  var flashcards = [
    { front: "Unité d'une force ?", back: "Le <strong>newton (N)</strong>.", chapter: "forces" },
    { front: "Les 4 caractéristiques d'une force ?", back: "<strong>① Point d'application</strong> · <strong>② Direction</strong> (droite d'action) · <strong>③ Sens</strong> · <strong>④ Intensité</strong> (en N). On la représente par un <strong>vecteur</strong> \\(\\vec{F}\\).", chapter: "forces" },
    { front: "Formule du poids ?", back: "$$P = m \\times g$$ P en <strong>N</strong>, m en <strong>kg</strong>, g ≈ <strong>9,81 N/kg</strong>. Le poids s'applique au centre de gravité, vers le bas.", chapter: "forces" },
    { front: "Masse vs poids ?", back: "<strong>Masse</strong> = quantité de matière, en <strong>kg</strong>, constante. <strong>Poids</strong> = force d'attraction de la Terre, en <strong>N</strong>, dépend de g.", chapter: "forces" },
    { front: "Condition d'équilibre de translation ?", back: "La <strong>somme des forces est nulle</strong> : \\(\\sum \\vec{F} = \\vec{0}\\) → l'objet ne se déplace pas.", chapter: "forces" },
    { front: "Formule du moment d'une force ?", back: "$$M = \\pm\\,F \\times \\ell$$ M en <strong>N·m</strong>, F en <strong>N</strong>, ℓ = <strong>bras de levier</strong> en <strong>m</strong>.", chapter: "moment" },
    { front: "Qu'est-ce que le bras de levier ℓ ?", back: "La <strong>longueur mesurée perpendiculairement</strong> entre la <strong>droite d'action</strong> de la force et l'<strong>axe de rotation</strong>.", chapter: "moment" },
    { front: "Convention de signe du moment ?", back: "<strong>+</strong> dans le sens <strong>trigonométrique</strong> (inverse des aiguilles) · <strong>−</strong> dans le sens <strong>horlogique</strong> (sens des aiguilles).", chapter: "moment" },
    { front: "Comment augmenter l'effet de rotation (le moment) ?", back: "Augmenter la <strong>force</strong> OU allonger le <strong>bras de levier</strong> (ex. pousser une porte loin des gonds, utiliser une grande clé).", chapter: "moment" },
    { front: "Moment d'une force qui passe par l'axe ?", back: "<strong>Nul</strong> : son bras de levier est nul → elle ne fait pas tourner l'objet.", chapter: "moment" },
    { front: "Force non perpendiculaire au bras de levier ?", back: "On ajoute le sinus de l'angle α : $$M = \\pm\\,F \\times \\ell \\times \\sin\\alpha$$ (α entre le bras de levier et la force).", chapter: "moment" },
    { front: "Formule de l'avantage mécanique γ (treuil, manivelle) ?", back: "$$\\gamma = \\dfrac{F_R}{F_M} = \\dfrac{r_M}{r_R}$$ \\(F_R\\) résistante, \\(F_M\\) motrice, \\(r_M\\) rayon moteur, \\(r_R\\) rayon résistant. On <strong>gagne en force</strong>, on <strong>perd en distance</strong>.", chapter: "machines" },
    { front: "À quoi sert une poulie FIXE (simple) ?", back: "Son avantage mécanique vaut <strong>γ = 1</strong> : elle <strong>ne multiplie pas</strong> la force (\\(F_M=F_R\\)) ; elle <strong>change la direction</strong> de la force.", chapter: "machines" },
    { front: "Exemples de manivelles / treuils ?", back: "🚲 Pédalier de vélo · ☕ moulin à café · 🎣 moulinet de pêche · 🚗 cric de voiture · 🪣 treuil de puits.", chapter: "machines" },
    { front: "Les 2 conditions d'équilibre d'un objet étendu ?", back: "<strong>① Translation</strong> : \\(\\sum \\vec{F}=\\vec{0}\\) · <strong>② Rotation</strong> : \\(\\sum M = 0\\) (loi des moments). Les deux <strong>en même temps</strong>.", chapter: "equilibre" },
    { front: "Définition de l'équilibre de rotation ?", back: "Un objet libre de tourner autour d'un axe fixe est en équilibre de rotation quand la <strong>somme des moments</strong> des forces par rapport à cet axe est <strong>nulle</strong> : \\(\\sum M = 0\\).", chapter: "equilibre" },
    { front: "Équilibre de rotation : statique ou dynamique ?", back: "<strong>Statique</strong> = l'objet est immobile. <strong>Dynamique</strong> = il tourne à <strong>vitesse constante</strong>. Dans les deux cas \\(\\sum M = 0\\).", chapter: "equilibre" },
    { front: "Condition d'équilibre d'un levier / d'une balançoire ?", back: "$$F_1 \\times \\ell_1 = F_2 \\times \\ell_2$$ Les deux moments se compensent.", chapter: "equilibre" },
    { front: "Qu'est-ce que le centre de gravité (G) ?", back: "Le <strong>point d'application du poids</strong> de tout l'objet. Pour un objet homogène et symétrique, il coïncide avec le <strong>centre de symétrie</strong> (et peut être hors de la matière).", chapter: "equilibre" },
    { front: "Qu'est-ce que la base de sustentation ?", back: "Le <strong>polygone formé par les points d'appui</strong> au sol. L'objet tient tant que la <strong>verticale par G</strong> traverse ce polygone.", chapter: "equilibre" },
    { front: "Comment être plus stable ?", back: "<strong>Élargir</strong> la base de sustentation et <strong>abaisser</strong> le centre de gravité.", chapter: "equilibre" },
    { front: "La stratégie de résolution (équilibre) en bref ?", back: "1) Repérer objet + axe · 2) Lister les forces · 3) \\(\\sum\\vec{F}=\\vec{0}\\) · 4) Bras de levier (en m) · 5) Moments avec leur signe · 6) \\(\\sum M = 0\\), puis résoudre.", chapter: "equilibre" }
  ];

  window.registerSubject('physique', {
    subtitle: 'Physique (4ᵉ) — UAA3 · Moments de force & équilibre',
    content: {
      sections: sections,
      coursAuto: true,
      questions: questions,
      flashcards: flashcards,
      demos: {},
      navLabels: { formules: '📌 Repères', exercices: '🎯 Exercices' },
      chapOrder: ['forces', 'moment', 'machines', 'equilibre'],
      chapLabels: { forces: 'Rappels : les forces', moment: 'Le moment d\'une force', machines: 'Manivelles, treuils & poulies', equilibre: 'Équilibre de rotation' }
    }
  });
})();
