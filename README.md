# Maths 4GT — Géométrie analytique plane

Application d'étude interactive pour le cours de maths 4GT : Cercle, Parabole, Droites.

---

## 📁 Structure des fichiers

```
maths4gt/
├── index.html      → Structure HTML de la page (navigation, squelette)
├── style.css       → Tout le CSS (thèmes, animations, composants)
├── script.js       → Logique JavaScript (quiz, flashcards, graphiques, pomodoro...)
├── data.js         → Données statiques (questions quiz + flashcards + fiches focus)
├── content.js      → Contenu HTML des sections de cours (synthèse, exercices, erreurs...)
└── README.md       → Ce fichier
```

---

## 🚀 Comment lancer le projet

1. Télécharge les **5 fichiers** dans le **même dossier**
2. Ouvre `index.html` dans ton navigateur
3. C'est tout — aucune installation requise

---

## ✏️ Quoi envoyer à Claude selon ce que tu veux modifier

| Tu veux modifier... | Fichier à envoyer |
|---|---|
| La navigation, la structure | `index.html` |
| Les couleurs, thèmes, animations | `style.css` |
| Le quiz, les flashcards, le pomodoro... | `script.js` |
| Les questions du quiz | `data.js` |
| Les flashcards | `data.js` |
| Les fiches focus (mode focus) | `data.js` |
| Le contenu de la synthèse | `content.js` |
| Les exercices guidés | `content.js` |
| Les erreurs fréquentes | `content.js` |

> ⚠️ **Ne jamais envoyer `data.js` et `content.js` ensemble à Claude** — c'est inutile et ça consomme beaucoup de tokens. Envoie seulement ce dont tu as besoin.

---

## 📚 Sections de l'application

| Section | Description |
|---|---|
| 📚 Synthèse | Cours complet sur les droites, cercles et paraboles |
| 🧮 Formules clés | Toutes les formules avec légendes interactives |
| 📝 Méthodes | Méthodes pas à pas (5 méthodes) |
| ✏️ Exercices guidés | 4 exercices révélés étape par étape |
| 📊 Graphiques | Cercle, parabole et droite interactifs (Canvas) |
| 🎴 Flashcards | 40 cartes avec répétition espacée |
| 🧠 Quiz | 50 questions avec filtres et quiz adaptatif |
| ⚠️ Erreurs fréquentes | Les pièges classiques par chapitre |
| 📓 Journal | Notes personnelles sauvegardées |
| 👤 Mon profil | Stats, badges, calendrier d'activité |

---

## ⚙️ Fonctionnalités

- **Thèmes** : 6 thèmes de couleur (Défaut, Forêt, Océan, Coucher, Clair, Minuit)
- **Animations** : 5 niveaux (Normal, Subtil, Dynamique, Intense, Aucune)
- **Effets de cartes** : Normal, Glass, Glow, Gradient, Relief
- **Fond** : Normal, Gradient animé, Particules
- **Musique d'ambiance** : Lo-fi, Pluie, Bruit blanc (Web Audio API)
- **Mode Focus** : Révision carte par carte sans distraction
- **Pomodoro** : Timer 25min avec indicateur circulaire
- **Examen surprise** : 5 questions en 5 minutes
- **Quiz adaptatif** : Révise automatiquement les questions ratées
- **Répétition espacée** : Les flashcards s'adaptent à ton niveau
- **Sauvegarde** : Progression, scores et journal sauvegardés en localStorage

---

## 🛠️ Technologies utilisées

- HTML / CSS / JavaScript vanilla (aucun framework)
- [MathJax 3](https://www.mathjax.org/) — rendu des formules mathématiques
- Canvas API — graphiques interactifs
- Web Audio API — musique d'ambiance
- localStorage — sauvegarde des données
