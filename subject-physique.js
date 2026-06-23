/* GR2 Study — Contenu PHYSIQUE (4ᵉ Sciences économiques)
   UAA3 — Module 2 : Moments de force & équilibre.
   Rappels (forces, poids), le moment d'une force, manivelles/treuils/poulies,
   l'équilibre de rotation (2 conditions, centre de gravité, base de sustentation).
   Basé sur le cours réel + la feuille d'objectifs d'examen (juin 2026).
   S'enregistre auprès de subjects.js via window.registerSubject. */
(function () {
  'use strict';
  if (typeof window.registerSubject !== 'function') return;

  var sections = {};

  /* ---------------------- SYNTHÈSE (cours) ---------------------- */
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
      <p>Quand une force peut faire <strong>tourner</strong> un objet autour d'un <strong>axe de rotation</strong> (un pivot), on mesure son effet de rotation par le <strong>moment</strong> de la force.</p>
      <p>Le <strong>bras de levier \\(\\ell\\)</strong> est la <strong>distance perpendiculaire</strong> entre l'axe de rotation et la droite d'action de la force.</p>
      <div class="key-rule"><div class="formula-main">$$M = F \\times \\ell$$</div></div>
      <ul style="line-height:1.9;">
        <li>\\(M\\) = moment, en <strong>newton-mètre (N·m)</strong> ; \\(F\\) = intensité de la force (N) ; \\(\\ell\\) = bras de levier (<strong>m</strong>).</li>
        <li><strong>Plus la force est grande</strong>, ou <strong>plus le bras de levier est long</strong>, plus l'effet de rotation est important. (C'est pourquoi on pousse une porte <strong>loin des gonds</strong> : ℓ grand → faible force suffit.)</li>
        <li><strong>Sens de rotation</strong> : on compte un moment <strong>positif</strong> dans un sens (ex. anti-horaire) et <strong>négatif</strong> dans l'autre (horaire).</li>
        <li>Si la droite d'action <strong>passe par l'axe</strong>, le bras de levier est nul → le <strong>moment est nul</strong> (la force ne fait pas tourner).</li>
      </ul>
      <svg viewBox="0 0 300 150" width="280" style="max-width:100%;height:auto;margin:8px 0 4px" role="img" aria-label="Moment d'une force : axe, bras de levier, force perpendiculaire">
        <defs><marker id="mArr" markerWidth="9" markerHeight="9" refX="6" refY="4.5" orient="auto"><path d="M0,0L8,4.5L0,9z" fill="#f87171"/></marker></defs>
        <circle cx="50" cy="60" r="6" fill="#fbbf24"/><text x="26" y="50" fill="#fcd34d" font-size="11">axe</text>
        <line x1="50" y1="60" x2="240" y2="60" stroke="#60a5fa" stroke-width="3"/>
        <line x1="50" y1="74" x2="240" y2="74" stroke="#6b7280" stroke-width="1" stroke-dasharray="4 3"/>
        <text x="120" y="92" fill="#9ca3af" font-size="11">bras de levier ℓ</text>
        <line x1="240" y1="60" x2="240" y2="128" stroke="#f87171" stroke-width="4" marker-end="url(#mArr)"/>
        <text x="248" y="104" fill="#fca5a5" font-size="13" font-weight="bold">F</text>
      </svg>
      <div class="simple-exp-box">
        <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Comprendre simplement</button>
        <div class="simple-exp-content">Le moment, c'est la « <strong>force de rotation</strong> ». Avec une grande clé (long bras de levier), tu desserres un boulon bien plus facilement qu'avec une petite : même force, mais ℓ plus grand → M plus grand.</div>
      </div>
    </div>

    <div class="synth-section">
      <h2>3. Manivelles, treuils &amp; poulies (Chapitre III)</h2>
      <p>Une <strong>manivelle</strong> ou un <strong>treuil</strong> sont des « machines simples » qui appliquent le principe du moment pour <strong>multiplier une force</strong>.</p>
      <p>On tourne une <strong>manivelle de grand rayon \\(R\\)</strong> pour enrouler un câble sur un <strong>axe (treuil) de petit rayon \\(r\\)</strong>. À l'équilibre, les deux moments s'égalent :</p>
      <div class="key-rule"><div class="formula-main">$$F_{effort} \\times R = F_{charge} \\times r$$</div></div>
      <ul style="line-height:1.9;">
        <li>Comme \\(R > r\\), on a \\(F_{effort} < F_{charge}\\) : on soulève une <strong>grosse charge avec peu de force</strong>. En contrepartie, il faut tirer <strong>plus de longueur</strong> de corde. (Même idée : les <strong>petits et grands plateaux</strong> d'un vélo.)</li>
      </ul>
      <p>La <strong>poulie simple (poulie fixe)</strong> est un cas particulier. Son axe est <strong>fixe</strong> :</p>
      <ul style="line-height:1.9;">
        <li>Elle <strong>ne multiplie pas la force</strong> : \\(F_{effort} = F_{charge}\\) (le rayon est le même des deux côtés).</li>
        <li>Mais elle <strong>change la direction</strong> de la force : on <strong>tire vers le bas</strong> pour faire <strong>monter</strong> une charge (c'est plus pratique et on peut s'aider de son propre poids).</li>
      </ul>
      <svg viewBox="0 0 300 160" width="270" style="max-width:100%;height:auto;margin:8px 0 4px" role="img" aria-label="Treuil : grande manivelle R et petit axe r">
        <defs><marker id="tArr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0L7,4L0,8z" fill="#34d399"/></marker><marker id="tArr2" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0L7,4L0,8z" fill="#f87171"/></marker></defs>
        <circle cx="150" cy="70" r="50" fill="none" stroke="#60a5fa" stroke-width="2"/>
        <circle cx="150" cy="70" r="18" fill="none" stroke="#a855f7" stroke-width="2"/>
        <circle cx="150" cy="70" r="3" fill="#e5e7eb"/>
        <line x1="150" y1="70" x2="150" y2="20" stroke="#9ca3af" stroke-width="1.2"/><text x="156" y="40" fill="#93c5fd" font-size="11">R</text>
        <line x1="150" y1="70" x2="168" y2="70" stroke="#9ca3af" stroke-width="1.2"/><text x="156" y="86" fill="#c4b5fd" font-size="11">r</text>
        <line x1="200" y1="70" x2="200" y2="135" stroke="#34d399" stroke-width="3" marker-end="url(#tArr)"/><text x="206" y="110" fill="#6ee7b7" font-size="12">effort (petit)</text>
        <line x1="132" y1="88" x2="132" y2="140" stroke="#f87171" stroke-width="4" marker-end="url(#tArr2)"/><text x="74" y="120" fill="#fca5a5" font-size="12">charge</text>
      </svg>
      <div class="simple-exp-box">
        <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Comprendre simplement</button>
        <div class="simple-exp-content">Un treuil de puits : tu tournes une grande manivelle (R) pour remonter un lourd seau enroulé sur un petit axe (r). Tu fais beaucoup de tours (longue distance) mais sans forcer. Une poulie fixe, elle, ne te fait pas gagner de force — juste tirer dans un sens plus confortable.</div>
      </div>
    </div>

    <div class="synth-section">
      <h2>4. L'équilibre de rotation d'un objet étendu (Chapitre IV)</h2>
      <p>Un <strong>objet étendu</strong> (pas réduit à un point) est en équilibre quand il ne se <strong>déplace pas</strong> ET ne <strong>tourne pas</strong>. Il faut donc <strong>DEUX conditions</strong> en même temps :</p>
      <ul style="line-height:1.9;">
        <li><strong>① Équilibre de translation</strong> : la somme des forces est nulle → \\(\\sum \\vec{F} = \\vec{0}\\).</li>
        <li><strong>② Équilibre de rotation</strong> (loi des moments) : la somme des moments est nulle → \\(\\sum M = 0\\). Autrement dit, les moments qui font tourner dans un sens <strong>compensent</strong> ceux de l'autre sens.</li>
      </ul>
      <p>Sur un <strong>levier / une balançoire</strong>, cela donne la condition d'équilibre :</p>
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
      <p><strong>Le centre de gravité (G)</strong> est le point unique où s'applique le <strong>poids</strong> de tout l'objet. <strong>La base de sustentation</strong> est la surface délimitée par les <strong>points d'appui</strong> (les pieds, les roues, la semelle…).</p>
      <div class="key-rule"><div class="formula-main">Un objet reste en équilibre tant que la verticale passant par G tombe À L'INTÉRIEUR de la base de sustentation</div></div>
      <ul style="line-height:1.9;">
        <li>Si cette verticale <strong>sort</strong> de la base de sustentation → l'objet <strong>bascule</strong>. C'est pourquoi on écarte les pieds (base plus large) pour être plus stable, et pourquoi une tour penchée tient tant que G reste au-dessus de sa base.</li>
      </ul>
      <svg viewBox="0 0 300 160" width="280" style="max-width:100%;height:auto;margin:8px 0 4px" role="img" aria-label="Centre de gravité et base de sustentation">
        <rect x="110" y="20" width="80" height="100" rx="4" fill="rgba(96,165,250,.14)" stroke="#60a5fa"/>
        <circle cx="150" cy="65" r="5" fill="#fbbf24"/><text x="158" y="62" fill="#fcd34d" font-size="12" font-weight="bold">G</text>
        <line x1="150" y1="65" x2="150" y2="140" stroke="#34d399" stroke-width="2" stroke-dasharray="5 4"/>
        <line x1="95" y1="128" x2="205" y2="128" stroke="#e5e7eb" stroke-width="3"/>
        <text x="150" y="152" fill="#9ca3af" font-size="11" text-anchor="middle">base de sustentation</text>
      </svg>
      <div class="simple-exp-box">
        <button class="simple-exp-toggle" onclick="toggleSimpleExp(this)">💡 Comprendre simplement</button>
        <div class="simple-exp-content">Pour résoudre un exercice d'équilibre : (1) fais le <strong>bilan des forces</strong> et vérifie que leur somme est nulle ; (2) choisis l'<strong>axe</strong>, calcule chaque <strong>moment</strong> (M = F·ℓ) avec son <strong>signe</strong>, et écris que leur somme est nulle. Deux équations → tu trouves l'inconnue.</div>
      </div>
    </div>
  </div>`;

  /* ---------------------- REPÈRES ---------------------- */
  sections.formules = `<div id="formules" class="section">
    <h2 style="font-size:30px; font-weight:800; color:var(--color-nav); margin-bottom:1rem;">📌 Repères à connaître</h2>
    <div class="formula-grid">
      <div>
        <div class="formula-box"><h3>Grandeurs &amp; unités (GSU)</h3><p style="line-height:1.9; margin:0;">Masse <strong>m</strong> → <strong>kg</strong> · Force/poids <strong>F, P</strong> → <strong>N</strong> · Pesanteur <strong>g</strong> ≈ <strong>9,81 N/kg</strong> · Bras de levier <strong>ℓ</strong> → <strong>m</strong> · Moment <strong>M</strong> → <strong>N·m</strong></p></div>
        <div class="formula-box"><h3>Le poids</h3><div class="formula-main">$$P = m \\times g$$</div><p class="note">P en N, m en kg, g ≈ 9,81 N/kg. À ne pas confondre avec la masse.</p></div>
        <div class="formula-box"><h3>Les 4 caractéristiques d'une force</h3><p style="line-height:1.9; margin:0;">Point d'application · Direction · Sens · Intensité (N) → vecteur \\(\\vec{F}\\).</p></div>
        <div class="formula-box"><h3>Moment d'une force</h3><div class="formula-main">$$M = F \\times \\ell$$</div><p class="note">M (N·m), F (N), ℓ = bras de levier (m). Signe selon le sens de rotation.</p></div>
      </div>
      <div>
        <div class="formula-box"><h3>Équilibre (2 conditions)</h3><p style="line-height:1.9; margin:0;"><strong>Translation</strong> : \\(\\sum \\vec{F}=\\vec{0}\\)<br><strong>Rotation</strong> : \\(\\sum M = 0\\) (loi des moments).</p></div>
        <div class="formula-box"><h3>Le levier / la balançoire</h3><div class="formula-main">$$F_1\\,\\ell_1 = F_2\\,\\ell_2$$</div><p class="note">À l'équilibre, les deux moments se compensent.</p></div>
        <div class="formula-box"><h3>Treuil / manivelle</h3><div class="formula-main" style="font-size:16px;">$$F_{eff}\\,R = F_{ch}\\,r$$</div><p class="note">R = grand rayon (manivelle), r = petit rayon (axe). On gagne en force, on perd en distance.</p></div>
        <div class="formula-box"><h3>Poulie fixe</h3><p style="line-height:1.9; margin:0;">Ne multiplie <strong>pas</strong> la force (\\(F_{eff}=F_{ch}\\)) ; elle <strong>change la direction</strong> de la force.</p></div>
        <div class="formula-box"><h3>Stabilité</h3><p style="line-height:1.9; margin:0;">Équilibre tant que la <strong>verticale par G</strong> tombe dans la <strong>base de sustentation</strong>.</p></div>
      </div>
    </div>
  </div>`;

  /* ---------------------- MÉTHODE ---------------------- */
  sections.methodes = `<div id="methodes" class="section">
    <h2 style="font-size:30px; font-weight:800; color:var(--color-nav); margin-bottom:1rem;">📝 Méthode</h2>
    <div class="synth-section">
      <h2>Résoudre un problème d'équilibre de rotation</h2>
      <div class="step-item"><div class="step-num">1</div><div class="step-text"><strong>Schéma + bilan des forces</strong> : dessine l'objet et toutes les forces (poids, tensions, réactions…) avec leur point d'application.</div></div>
      <div class="step-item"><div class="step-num">2</div><div class="step-text"><strong>Choisis l'axe de rotation</strong> (souvent le pivot, ou un point où une force inconnue s'applique pour la faire disparaître).</div></div>
      <div class="step-item"><div class="step-num">3</div><div class="step-text"><strong>Calcule chaque moment</strong> : \\(M = F\\times\\ell\\), avec son <strong>signe</strong> (+ dans un sens, − dans l'autre). Une force qui passe par l'axe → moment nul.</div></div>
      <div class="step-item"><div class="step-num">4</div><div class="step-text"><strong>Écris les 2 conditions</strong> : \\(\\sum \\vec{F}=\\vec{0}\\) et \\(\\sum M = 0\\), puis <strong>résous</strong> pour trouver l'inconnue (force ou distance).</div></div>
    </div>
  </div>`;

  /* ---------------------- EXERCICES ---------------------- */
  sections.exercices = `<div id="exercices" class="section">
    <h2 style="font-size:30px; font-weight:800; color:var(--color-nav); margin-bottom:1rem;">🎯 Exercices</h2>
    <p style="color:var(--text-secondary); margin-bottom:1.2rem;">Réponds de tête, puis vérifie.</p>

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
        <li>« Une poulie fixe divise la force par 2. » → <strong>Faux</strong> (elle change seulement la direction).</li>
        <li>« Plus le bras de levier est long, plus le moment est grand. » → <strong>Vrai</strong>.</li>
        <li>« Une force qui passe par l'axe ne fait pas tourner l'objet. » → <strong>Vrai</strong> (moment nul).</li>
      </ul>
    </div>

    <div class="exercise-card">
      <h3 style="font-size:20px; font-weight:600; color:var(--color-nav);">📋 À retenir par cœur</h3>
      <ul style="line-height:2;">
        <li>Les <strong>4 caractéristiques</strong> d'une force.</li>
        <li>La formule du <strong>poids</strong> et celle du <strong>moment</strong> (avec les unités).</li>
        <li>Les <strong>2 conditions d'équilibre</strong> (translation + rotation).</li>
        <li>La différence <strong>treuil</strong> (gain de force) / <strong>poulie fixe</strong> (changement de direction).</li>
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
      <div class="formula-box"><h3>❌ « La poulie fixe fait gagner de la force »</h3><p>Non : la poulie fixe ne change que la <strong>direction</strong>. C'est le <strong>treuil</strong> (ou la poulie mobile) qui réduit la force.</p></div>
      <div class="formula-box"><h3>❌ Oublier le signe des moments</h3><p>Les moments ont un <strong>sens</strong> (+ / −). À l'équilibre, ceux d'un sens compensent ceux de l'autre : \\(\\sum M = 0\\).</p></div>
      <div class="formula-box"><h3>❌ Une seule condition d'équilibre</h3><p>Pour un objet étendu, il faut les <strong>deux</strong> : \\(\\sum\\vec{F}=\\vec{0}\\) <strong>et</strong> \\(\\sum M=0\\).</p></div>
    </div>
  </div>`;

  /* ---------------------- QUIZ ---------------------- */
  var questions = [
    // ── Les forces (rappels) ──
    { q: "Quelle est l'unité d'une force ?", opts: ["le newton (N)", "le kilogramme (kg)", "le joule (J)", "le mètre (m)"], ans: 0, chapter: "forces", difficulty: "facile", exp: "Une force se mesure en newtons (N). Le kilogramme est l'unité de masse." },
    { q: "Les 4 caractéristiques d'une force sont :", opts: ["point d'application, direction, sens, intensité", "masse, poids, vitesse, temps", "longueur, largeur, hauteur, poids", "haut, bas, gauche, droite"], ans: 0, chapter: "forces", difficulty: "intermediaire", exp: "Une force = point d'application + direction + sens + intensité → on la représente par un vecteur." },
    { q: "La formule du poids est :", opts: ["P = m × g", "P = m / g", "P = m + g", "P = g / m"], ans: 0, chapter: "forces", difficulty: "facile", exp: "Poids = masse × intensité de la pesanteur. P en N, m en kg, g ≈ 9,81 N/kg." },
    { q: "Le poids d'une masse de 10 kg (g = 9,81 N/kg) vaut environ :", opts: ["98,1 N", "10 N", "9,81 N", "0,98 N"], ans: 0, chapter: "forces", difficulty: "intermediaire", exp: "P = m × g = 10 × 9,81 = 98,1 N." },
    { q: "Masse et poids :", opts: ["la masse est en kg, le poids est une force en N", "c'est exactement la même chose", "la masse est en N, le poids en kg", "le poids ne dépend jamais de g"], ans: 0, chapter: "forces", difficulty: "intermediaire", exp: "La masse (kg) est constante ; le poids (N) est la force d'attraction et dépend de g.", simple: "Ta masse ne change pas si tu vas sur la Lune, mais ton poids y est 6 fois plus petit (g plus faible)." },
    { q: "La condition d'équilibre de translation est :", opts: ["la somme des forces est nulle", "la somme des forces est maximale", "il n'y a qu'une seule force", "le poids est nul"], ans: 0, chapter: "forces", difficulty: "intermediaire", exp: "Équilibre de translation : ΣF = 0 → l'objet ne se déplace pas (ou avance à vitesse constante)." },
    // ── Le moment d'une force ──
    { q: "Le moment d'une force se calcule par :", opts: ["M = F × ℓ", "M = F / ℓ", "M = F + ℓ", "M = ℓ / F"], ans: 0, chapter: "moment", difficulty: "facile", exp: "Moment = force × bras de levier. M en N·m, F en N, ℓ en m." },
    { q: "L'unité du moment d'une force est :", opts: ["le newton-mètre (N·m)", "le newton (N)", "le mètre (m)", "le watt (W)"], ans: 0, chapter: "moment", difficulty: "facile", exp: "Le moment se mesure en N·m (force × distance)." },
    { q: "Le bras de levier, c'est :", opts: ["la distance perpendiculaire entre l'axe et la droite d'action de la force", "la longueur totale de l'objet", "la masse de l'objet", "la vitesse de rotation"], ans: 0, chapter: "moment", difficulty: "intermediaire", exp: "Bras de levier ℓ = distance perpendiculaire de l'axe de rotation à la droite d'action de la force." },
    { q: "Une force de 50 N avec un bras de levier de 0,40 m crée un moment de :", opts: ["20 N·m", "12,5 N·m", "125 N·m", "200 N·m"], ans: 0, chapter: "moment", difficulty: "intermediaire", exp: "M = F × ℓ = 50 × 0,40 = 20 N·m." },
    { q: "Pourquoi pousse-t-on une porte loin des gonds ?", opts: ["pour augmenter le bras de levier (donc le moment)", "pour diminuer le moment", "pour augmenter la masse", "ça ne change rien"], ans: 0, chapter: "moment", difficulty: "intermediaire", exp: "Loin des gonds → ℓ grand → M = F×ℓ grand → on tourne la porte avec moins de force.", simple: "Essaie de pousser une porte juste à côté des charnières : très dur ! Loin des charnières (grand bras de levier), c'est facile." },
    { q: "Une force dont la droite d'action passe par l'axe de rotation a un moment :", opts: ["nul (elle ne fait pas tourner)", "maximal", "négatif", "égal à la force"], ans: 0, chapter: "moment", difficulty: "difficile", exp: "Si la force passe par l'axe, le bras de levier est nul → M = F × 0 = 0." },
    // ── Manivelles, treuils & poulies ──
    { q: "Un treuil (manivelle de rayon R, axe de rayon r) est à l'équilibre quand :", opts: ["F_effort × R = F_charge × r", "F_effort = F_charge", "R = r", "F_effort × r = F_charge × R"], ans: 0, chapter: "machines", difficulty: "difficile", exp: "Les deux moments s'égalent : F_effort × R = F_charge × r. Comme R > r, l'effort est plus petit que la charge." },
    { q: "Avec un treuil, comme R > r :", opts: ["on soulève une grosse charge avec peu de force (mais on tire plus de corde)", "on a besoin de plus de force que la charge", "la force et la charge sont égales", "on ne peut rien soulever"], ans: 0, chapter: "machines", difficulty: "intermediaire", exp: "Gain de force (F_effort < F_charge), au prix d'une plus grande longueur de corde à tirer." },
    { q: "Une poulie FIXE :", opts: ["change la direction de la force, sans la multiplier", "divise toujours la force par 2", "multiplie la force par 2", "supprime le poids de la charge"], ans: 0, chapter: "machines", difficulty: "intermediaire", exp: "Poulie fixe : F_effort = F_charge ; son intérêt est de changer la direction (tirer vers le bas pour monter une charge)." },
    // ── Équilibre de rotation ──
    { q: "Pour qu'un objet étendu soit en équilibre, il faut :", opts: ["ΣF = 0 ET Σmoments = 0", "seulement ΣF = 0", "seulement Σmoments = 0", "que le poids soit nul"], ans: 0, chapter: "equilibre", difficulty: "intermediaire", exp: "Deux conditions : équilibre de translation (ΣF = 0) ET équilibre de rotation (ΣM = 0)." },
    { q: "Sur une balançoire à l'équilibre :", opts: ["F₁ × ℓ₁ = F₂ × ℓ₂", "F₁ = F₂", "ℓ₁ = ℓ₂", "F₁ + F₂ = 0"], ans: 0, chapter: "equilibre", difficulty: "intermediaire", exp: "Les moments se compensent : F₁ℓ₁ = F₂ℓ₂. Un enfant léger loin du pivot équilibre un lourd près du pivot.", simple: "Le plus léger se met loin du centre, le plus lourd se met près : leurs « forces de rotation » s'égalisent." },
    { q: "Le centre de gravité d'un objet est :", opts: ["le point où s'applique son poids", "le point le plus lourd visible", "toujours au sommet", "le point d'appui au sol"], ans: 0, chapter: "equilibre", difficulty: "facile", exp: "Le centre de gravité (G) est le point unique d'application du poids de tout l'objet." },
    { q: "Un objet bascule (perd l'équilibre) quand :", opts: ["la verticale passant par G sort de la base de sustentation", "son centre de gravité est bas", "sa base de sustentation est large", "son poids est faible"], ans: 0, chapter: "equilibre", difficulty: "difficile", exp: "Tant que la verticale par G tombe dans la base de sustentation, l'objet tient. Si elle en sort, il bascule.", simple: "Penche-toi de plus en plus : tant que ton poids « tombe » entre tes pieds, ça va. Dès que ça sort, tu tombes." },
    { q: "Pour être plus stable, on a intérêt à :", opts: ["élargir la base de sustentation et abaisser le centre de gravité", "rétrécir la base et monter le centre de gravité", "augmenter son poids uniquement", "se mettre sur la pointe des pieds"], ans: 0, chapter: "equilibre", difficulty: "intermediaire", exp: "Base large + centre de gravité bas = plus stable (un pilote de course, un lutteur écartent les appuis et restent bas)." }
  ];

  /* ---------------------- FLASHCARDS ---------------------- */
  var flashcards = [
    { front: "Unité d'une force ?", back: "Le <strong>newton (N)</strong>.", chapter: "forces" },
    { front: "Les 4 caractéristiques d'une force ?", back: "<strong>① Point d'application</strong> · <strong>② Direction</strong> (droite d'action) · <strong>③ Sens</strong> · <strong>④ Intensité</strong> (en N). On la représente par un <strong>vecteur</strong> \\(\\vec{F}\\).", chapter: "forces" },
    { front: "Formule du poids ?", back: "$$P = m \\times g$$ P en <strong>N</strong>, m en <strong>kg</strong>, g ≈ <strong>9,81 N/kg</strong>. Le poids s'applique au centre de gravité, vers le bas.", chapter: "forces" },
    { front: "Masse vs poids ?", back: "<strong>Masse</strong> = quantité de matière, en <strong>kg</strong>, constante. <strong>Poids</strong> = force d'attraction de la Terre, en <strong>N</strong>, dépend de g.", chapter: "forces" },
    { front: "Condition d'équilibre de translation ?", back: "La <strong>somme des forces est nulle</strong> : \\(\\sum \\vec{F} = \\vec{0}\\) → l'objet ne se déplace pas.", chapter: "forces" },
    { front: "Formule du moment d'une force ?", back: "$$M = F \\times \\ell$$ M en <strong>N·m</strong>, F en <strong>N</strong>, ℓ = <strong>bras de levier</strong> en <strong>m</strong>. Signe selon le sens de rotation.", chapter: "moment" },
    { front: "Qu'est-ce que le bras de levier ℓ ?", back: "La <strong>distance perpendiculaire</strong> entre l'<strong>axe de rotation</strong> et la <strong>droite d'action</strong> de la force.", chapter: "moment" },
    { front: "Comment augmenter l'effet de rotation (le moment) ?", back: "Augmenter la <strong>force</strong> OU allonger le <strong>bras de levier</strong> (ex. pousser une porte loin des gonds, utiliser une grande clé).", chapter: "moment" },
    { front: "Moment d'une force qui passe par l'axe ?", back: "<strong>Nul</strong> : son bras de levier est nul → elle ne fait pas tourner l'objet.", chapter: "moment" },
    { front: "Loi du treuil / de la manivelle ?", back: "$$F_{effort} \\times R = F_{charge} \\times r$$ R = grand rayon (manivelle), r = petit rayon (axe). On <strong>gagne en force</strong> mais on <strong>perd en distance</strong>.", chapter: "machines" },
    { front: "À quoi sert une poulie FIXE ?", back: "Elle <strong>ne multiplie pas la force</strong> (\\(F_{effort}=F_{charge}\\)) ; elle <strong>change la direction</strong> de la force (tirer vers le bas pour monter une charge).", chapter: "machines" },
    { front: "Les 2 conditions d'équilibre d'un objet étendu ?", back: "<strong>① Translation</strong> : \\(\\sum \\vec{F}=\\vec{0}\\) · <strong>② Rotation</strong> : \\(\\sum M = 0\\) (loi des moments).", chapter: "equilibre" },
    { front: "Condition d'équilibre d'un levier / d'une balançoire ?", back: "$$F_1 \\times \\ell_1 = F_2 \\times \\ell_2$$ Les deux moments se compensent.", chapter: "equilibre" },
    { front: "Qu'est-ce que le centre de gravité (G) ?", back: "Le <strong>point unique</strong> où s'applique le <strong>poids</strong> de tout l'objet.", chapter: "equilibre" },
    { front: "Qu'est-ce que la base de sustentation ?", back: "La <strong>surface délimitée par les points d'appui</strong> (pieds, roues…). L'objet tient tant que la <strong>verticale par G</strong> tombe <strong>à l'intérieur</strong> de cette base.", chapter: "equilibre" },
    { front: "Comment être plus stable ?", back: "<strong>Élargir</strong> la base de sustentation et <strong>abaisser</strong> le centre de gravité.", chapter: "equilibre" }
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
