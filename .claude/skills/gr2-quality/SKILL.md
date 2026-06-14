---
name: gr2-quality
description: Checklist qualité et procédure de vérification du site GR2 Study (PWA vanilla JS/HTML/CSS, sans build). À utiliser AVANT et APRÈS toute modification du site : règles à ne jamais casser, contrôles qualité (mobile, contraste, MathJax), recette de test (Playwright + outil Diagnostic intégré gr2BuildReport), et procédure de déploiement git.
---

# Qualité & vérification — GR2 Study

Site = PWA **vanilla** (HTML/CSS/JS, **aucun build**) sur GitHub Pages : le dépôt EST le site.
Parle toujours **français** avec l'auteur, simplement.

## ⛔ Règles à ne JAMAIS casser
1. **Ne pas inventer de contenu scolaire** — formules, définitions, dates, grammaire viennent du contenu déjà validé (onglet « Formules clés », `subject-*.js`, `content.js`) ou des photos de cours. Si ça manque → demander, ne pas fabriquer.
2. **Bumper le cache** : `const CACHE = 'mathsgr2-vNNN'` dans `sw.js`, à CHAQUE changement de fichier servi.
3. **Maths = vraies formules MathJax** : `\dfrac`, `\vec`, `\sqrt`… (délimiteurs `\( \)` et `$$ $$`).
4. **Supabase** : clé `anon` publique UNIQUEMENT. Jamais de `service_role` ni secret (dépôt **public**).
5. **Aucun secret ni info privée** dans un fichier commité (dépôt public).

## ✅ Checklist AVANT de pousser
- [ ] **Mobile (≤768px)** : cibles tactiles ≥ **40px**, texte ≥ **12px**, champs `input/select` ≥ **16px** (sinon zoom iOS)
- [ ] **Contraste** ≥ 4.5 (texte normal) / ≥ 3 (gros texte gras) — mesuré au Diagnostic
- [ ] **Pas de débordement horizontal** à 390px de large
- [ ] **0 erreur JS** (console + pageerror)
- [ ] **Cache `sw.js` bumpé**
- [ ] **`git fetch` + rebase AVANT push** (des sessions cloud poussent aussi sur `main`)
- [ ] **Stage explicite** des fichiers modifiés (jamais `git add -A` : le dépôt a des fichiers absents en local)

## 🔬 Vérification (mesurer avant / après)
- **Outil intégré** : `window.gr2BuildReport()` → rapport texte (contraste faible, textes <12px, champs <16px, cibles <40px, débordement, **erreurs JS captées**, images cassées). UI : `window.gr2Diag()` ou **Ctrl+Maj+D**. ⚠️ Il ne voit que la section AFFICHÉE → l'ouvrir/relancer sur chaque onglet.
- **Navigation par script** : `window.setSubject('<clé>')` puis `window.showSection('<id>')`.
  - Clés matières : `maths, francais, anglais, histoire, geo, chimie, bio, eco, neerlandais`.
  - Sections : `synthese, formules, methodes, exercices, erreurs, quiz, flashcards, progression, profil, …`
- **Tests navigateur (Playwright)** : ouvrir `index.html` dans Chromium ; au démarrage poser `localStorage mathsgr2_welcome_seen='1'` pour sauter l'accueil. Nommer les scripts `_verify*.mjs` / `_probe*.mjs` et ranger les captures dans `_shots/` (déjà **gitignorés**). (Chemins locaux exacts du Chromium/Playwright : dans la mémoire perso, hors dépôt.)
- **Audio (langues)** : `pronunciation.js` rend cliquables `.eng-irr td`, `.eng-voc td:first-child`, `[data-say]` ; langue selon la matière (anglais → en-GB, néerlandais → nl-NL). Pour tester sans son : espionner `window.speechSynthesis.speak`.

## 🚀 Déploiement
`git fetch origin` → rebase si en retard → `git add <fichiers précis>` → commit (trailer `Co-Authored-By`) → `git push origin main`. GitHub Pages publie tout seul (~1 min).

## 📐 Méthode de travail
Petites étapes vérifiables · mesurer avant/après (Diagnostic) · heuristiques de Nielsen pour le jugement design · **proposer les changements importants avant de coder** (sauf demande d'action explicite) · respecter le style du code existant.
