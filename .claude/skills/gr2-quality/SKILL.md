---
name: gr2-quality
description: Qualité, architecture et vérification du site GR2 Study (PWA vanilla JS/HTML/CSS, sans build). À charger AVANT toute modification du site : règles à ne jamais casser, carte du code, checklist qualité (mobile/contraste/MathJax), outil d'audit automatique (audit.mjs + Diagnostic gr2BuildReport), pièges connus et déploiement git.
---

# Qualité & vérification — GR2 Study

Site = PWA **vanilla** (HTML/CSS/JS, **aucun build, aucune dépendance npm côté site**) sur GitHub Pages :
**le dépôt EST le site en ligne**. Parle toujours **français**, simplement.

## ⛔ Règles à ne JAMAIS casser
1. **Ne pas inventer de contenu scolaire.** Formules, définitions, dates, grammaire, vocabulaire viennent
   du contenu déjà validé (onglet « Formules clés », `subject-*.js`, `content.js`) ou des **photos de cours**
   (dossiers de cours par matière, hors dépôt). Si ça manque → demander, ne jamais fabriquer.
2. **Bumper le cache** : `const CACHE = 'mathsgr2-vNNN'` dans `sw.js`, à CHAQUE changement d'un fichier servi.
   (Inutile pour les fichiers méta : `CLAUDE.md`, `.claude/…`, `_*` — ils ne sont pas dans `sw.js`/`index.html`.)
3. **Maths = vraies formules MathJax** : `\dfrac`, `\vec`, `\sqrt`… (délimiteurs `\( \)` et `$$ $$`).
4. **Supabase** : clé `anon` publique UNIQUEMENT (déjà dans le code). Jamais de `service_role` ni secret.
5. **Aucun secret ni info privée** dans un fichier commité (le dépôt est **public**).

## 🗺️ Carte du code (l'essentiel)
- `index.html` — page unique ; chaque écran = `<div class="section">` ; la nav appelle `showSection(event,'id')`.
- `script.js` — logique principale (quiz, flashcards, profil, examens, sauvegarde). Données dans
  `localStorage` clé `mathsgr2_data` via `loadSavedData()` / `saveData()`.
- `subjects.js` + `subject-*.js` — matières : `window.SUBJECTS[clé].content.sections.{synthese,formules,methodes,exercices,erreurs}`
  (+ `questions`, `flashcards`). `setSubject(clé)` injecte le contenu ; matière active = `window.currentSubject`.
- `content.js` / `data.js` — contenu/données des **maths** (matière par défaut).
- `enhancements.css` surcharge `style.css`. `sw.js` = service worker (réseau d'abord, repli cache).
- Modules : `pronunciation.js` (audio langues), `irregular-trainer.js` (verbes EN), `formulas-trainer.js`
  (formules par cœur), `diagnostic.js` (Ctrl+Maj+D), `creations.js` (Mes créations + ƒ𝑥), `gestures.js`
  (tiroir mobile), `study-tools.js` (aides lecture, **générique** : lit `.synth-section > h2` / `.card`).
- Clés matières : `maths, francais, anglais, histoire, geo, chimie, bio, eco, neerlandais`.

## ✅ Checklist AVANT de pousser
- [ ] **Mobile (≤768px)** : cibles tactiles ≥ **40px**, texte ≥ **12px**, champs `input/select` ≥ **16px** (sinon zoom iOS)
- [ ] **Contraste** ≥ 4.5 (texte normal) / ≥ 3 (gros texte gras)
- [ ] **Pas de débordement horizontal** à 390px · **0 erreur JS**
- [ ] **Cache `sw.js` bumpé** (si fichier servi modifié)
- [ ] **`git fetch` + rebase AVANT push** (des sessions cloud poussent aussi sur `main`)
- [ ] **Stage explicite** des fichiers (jamais `git add -A` : le dépôt a des fichiers absents en local)

## 🔬 Vérification
**1) Audit automatique (le réflexe)** — un seul fichier audite **9 matières × 5 sections** en vue mobile :
```
node .claude/skills/gr2-quality/audit.mjs
```
Variables d'env optionnelles : `PW_INDEX` (chemin index.html), `PW_CHROME` (executablePath), `PW_MODULE`
(module playwright si pas installé en local), `PW_WIDTH` (390 par défaut ; 1000 = bureau). Il imprime un
tableau (contraste / <12px / <16px / tap<40 / débordement / erreurs) + un verdict, et **sort en erreur
si régression** (contraste faible, débordement, ou erreur JS).

**Base de référence connue** (NE PAS « corriger » à tort) : ~**5 textes <12px** et ~**30 cibles <40px**
existent volontairement (barre de nav, palette de dessin du tableau, cases natives). On ne traite que ce
qui **dépasse** cette base, ou tout **contraste faible** / **débordement** / **erreur JS** (toujours = 0 visé).

**2) Diagnostic intégré** : `window.gr2BuildReport()` (texte) ou `window.gr2Diag()` / **Ctrl+Maj+D** (UI).
⚠️ Il ne voit que la section **affichée** → l'ouvrir sur chaque onglet (l'audit le fait déjà en boucle).

**3) Tests ciblés (Playwright)** : ouvrir `index.html` dans Chromium, poser
`localStorage mathsgr2_welcome_seen='1'` au démarrage. Naviguer par `window.setSubject('clé')` puis
`window.showSection('id')`. Scripts jetables nommés `_verify*.mjs` / `_probe*.mjs` ; captures dans `_shots/`
(déjà **gitignorés**). Audio : espionner `window.speechSynthesis.speak` (rendu cliquable sur
`.eng-irr td`, `.eng-voc td:first-child`, `[data-say]` ; langue anglais→en-GB, néerlandais→nl-NL).

## 🪤 Pièges connus (déjà rencontrés)
- En `file://`, la console montre de fausses « Script error. » (CDN MathJax/GSAP/Supabase cross-origin) —
  le **live HTTPS = 0**. Se fier à `pageerror`, pas à ces lignes.
- **Bash heredoc** double-échappe les `\\` → écrire les fichiers de test/JS avec l'outil **Write**, pas `cat <<EOF`.
- `git show origin/main:chemin` en Git Bash : préfixer `MSYS_NO_PATHCONV=1`.
- Après un **rebase**, l'état des fichiers est invalidé → **re-Read** avant d'Edit.
- Vérifier **classe vs id** dans les sélecteurs (ex. `.irr-q` est une classe).
- Le dossier home est un dépôt git accidentel → **ne travailler que dans le dépôt du site**.
- `git push` : utiliser `dangerouslyDisableSandbox:true` (réseau + gestionnaire d'identifiants).

## 🚀 Déploiement
`git fetch origin` → rebase si en retard → `git add <fichiers précis>` → commit (trailer
`Co-Authored-By: Claude …`) → `git push origin main`. GitHub Pages publie tout seul (~1 min).

## 📐 Méthode
Mesurer **avant/après** (audit/Diagnostic) · heuristiques de **Nielsen** pour le jugement design ·
**petites étapes vérifiables** · **proposer avant de coder** les gros changements (sauf action explicite) ·
respecter le style du code existant.
