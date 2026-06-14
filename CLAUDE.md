# GR2 Study — notice pour Claude

Application web (PWA) de révision multi-matières pour le secondaire belge : maths, chimie,
bio, géo, éco, histoire, français, anglais, néerlandais. 100 % **HTML / CSS / JavaScript
« vanilla »** — aucun framework, **aucune étape de build**. Hébergée sur **GitHub Pages** :
le contenu de ce dépôt EST le site en ligne → https://drackson227.github.io/Math/

> 🗣️ Parle toujours en **français** avec l'auteur (Drackson), simplement.

## ⛔ Règles à ne JAMAIS oublier

1. **Ne jamais inventer de contenu scolaire.** Formules, définitions, dates, règles de
   grammaire : tout doit venir du contenu déjà validé du site (onglet « Formules clés » de
   chaque matière, fichiers `subject-*.js` / `content.js`). Si une info manque → demander,
   ne pas la fabriquer.
2. **Bumper le cache à CHAQUE changement** : dans `sw.js`, incrémenter
   `const CACHE = 'mathsgr2-vNNN'`. Sinon les visiteurs gardent l'ancienne version en cache.
3. **Maths = vraies formules MathJax** : `\dfrac`, `\vec`, `\sqrt`, etc. (jamais d'écriture
   approximative). MathJax (SVG) rend les délimiteurs `\( \)` et `$$ $$`.
4. **Supabase** : utiliser UNIQUEMENT la clé `anon` publique (déjà dans le code, prévue pour
   le navigateur). Ne jamais mettre la clé `service_role` ni aucun secret dans le code.
5. **Aucune clé API / mot de passe en clair** dans le code (ce dépôt est **public**).

## 🧩 Architecture (l'essentiel)

- `index.html` — page unique ; chaque écran est un `<div class="section">`, la barre de nav
  appelle `showSection(...)`.
- `script.js` — logique principale (quiz, flashcards, profil, sauvegarde, examens…).
  Données enregistrées dans `localStorage` (clé `mathsgr2_data`) via
  `loadSavedData()` / `saveData()`.
- `subjects.js` + `subject-*.js` — système de matières :
  `window.SUBJECTS[clé].content.sections.{synthese, formules, methodes, exercices, erreurs}`
  (+ `questions`, `flashcards`). `setSubject(clé)` injecte le contenu ; matière active =
  `window.currentSubject`.
- `content.js` / `data.js` — contenu et données des maths (matière par défaut).
- `creations.js` — éditeur « Mes créations » + compositeur de formules **ƒ𝑥**.
- `formulas-trainer.js` — onglet « Formules par cœur » (mémorisation écrite, correction
  tolérante).
- `diagnostic.js` — **outil de diagnostic** (lien 🔧 en bas de page ou **Ctrl+Maj+D**) :
  rapport technique + analyse qualité (contraste WCAG, textes trop petits, cibles tactiles
  < 40px, débordement…). À utiliser pour analyser/mesurer avant et après une amélioration.
- `style.css` + `enhancements.css` — styles (thème sombre par défaut, une couleur par
  matière). `enhancements.css` sert de couche de surcharge.
- `sw.js` — service worker (réseau d'abord, repli sur le cache hors-ligne).
- Les **librairies** (MathJax, GSAP, Supabase) sont chargées via **CDN**, pas en npm.

## 🤝 Méthode de travail

- **Proposer les idées importantes avant de coder**, et attendre la validation de Drackson
  (sauf s'il demande explicitement d'agir).
- Respecter le **style du code existant** (mêmes conventions, mêmes noms).
- Garder le site **simple à déployer** : pas de build, pas de dépendance npm côté site.
- Travailler par **petites étapes vérifiables**.

## 🚫 Hors dépôt
Des fichiers privés (mémos, sauvegardes, dossiers de travail) sont exclus par `.gitignore` —
ils ne sont pas ici, ne pas chercher à les recréer dans le dépôt.
