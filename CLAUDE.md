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

## 🧠 Mémoire du projet (notre travail ensemble)

Résumé pour qu'une nouvelle session (web/téléphone) reprenne le fil sans tout réexpliquer.

### Version & déploiement
- Version du cache : `sw.js` → `mathsgr2-vNNN` (incrémenter à CHAQUE changement ; ~v134+).
- **Déploiement = `git push` sur `main`** → GitHub Pages publie tout seul (~1 min).

### Fonctionnalités déjà en place
- **9 matières** (maths par défaut, chimie, bio, géo, éco, histoire, français, anglais,
  néerlandais) : chacune avec synthèses, formules clés, méthodes, exercices, erreurs,
  questions de quiz et flashcards.
- **Quiz** (QCM, score, XP, niveaux), **Flashcards** (répétition espacée), **Mode examen**.
- **Profil** : stats, badges, calendrier d'activité, régularité, maîtrise par chapitre,
  objectif du jour, planning d'examen.
- **« Mes créations »** (`creations.js`) : éditeur de flashcards/questions/synthèses +
  compositeur de formules **ƒ𝑥** + dessin façon tableau.
- **« Formules par cœur »** (`formulas-trainer.js`) : écrire les formules de mémoire,
  correction tolérante, banque perso + banque par défaut du site, vocabulaire adapté par
  matière (formule / règle / repère / mot…).
- **Outil Diagnostic** (`diagnostic.js`, Ctrl+Maj+D) : rapport technique + analyse qualité.
- **Aides à la lecture/étude** (`study-tools.js` + `study-tools.css`) : barre d'outils en
  haut de la Synthèse → 📑 sommaire des chapitres, barre de progression de lecture,
  ✅ marquer chaque chapitre « compris / à revoir » (+ % d'avancement), 🖍️ surligneur
  (4 couleurs, mémorisé), 📖 mode lecture sans distraction, et 🎬 **mode cours animé**
  (présentation plein écran : scènes révélées étape par étape avec GSAP + narration vocale).
  Module **générique** : il lit la structure commune (`.synth-section > h2`, `.card`) du
  contenu déjà rendu → marche pour les 9 matières sans toucher aux fichiers de contenu.
  Données dans `localStorage` (clé `gr2_study_v1`). Greffé via `onShowStudySection()`
  appelé depuis `showSection()`.
- **Social** (Supabase, clé anon publique) : bloc-notes collectif, chat, quiz multijoueur.
- PWA installable + utilisable hors-ligne.

### Façon de travailler (rappels importants)
- Viser le **détail et la perfection** : une imperfection (couleurs, contraste, alignement,
  lisibilité) compte autant qu'un bug — c'est le niveau d'analyse attendu.
- **Mesurer avant / après** avec l'outil Diagnostic (et des tests quand c'est possible).
- Méthode qualité de référence : **heuristiques de Nielsen** + vérifs type **Lighthouse / axe**
  (contraste, tailles de texte, cibles tactiles, descriptions d'images…).
