/* GR2 Study — gestion multi-matières
   Le cadre est prêt : Maths est complète ; les autres matières affichent un écran
   « en préparation » tant qu'aucun contenu (photos de cours) n'a été ajouté.
   Pour activer une matière plus tard : lui fournir son contenu puis passer ready:true. */
(function () {
  'use strict';

  window.SUBJECTS = {
    maths:    { label: 'Maths',        icon: '📐', subtitle: 'Maths — Géométrie analytique plane · Vecteurs · Cercle · Droites', ready: true,  mathTools: true },
    francais: { label: 'Français',     icon: '✍️', subtitle: 'Français — grammaire, conjugaison, littérature', ready: false, mathTools: false },
    histoire: { label: 'Histoire-Géo', icon: '🌍', subtitle: 'Histoire-Géo — repères, événements, cartes', ready: false, mathTools: false },
    chimie:   { label: 'Chimie-Bio',   icon: '🧪', subtitle: 'Chimie-Bio — atomes, réactions, le vivant', ready: false, mathTools: false }
  };

  window.currentSubject = 'maths';

  function showPrep(key) {
    var s = window.SUBJECTS[key];
    var prep = document.getElementById('subject-prep');
    if (!prep || !s) return;
    var em = document.getElementById('prep-emoji'); if (em) em.textContent = s.icon;
    var ti = document.getElementById('prep-title'); if (ti) ti.textContent = s.label + ' — en préparation';
    // adapter le sous-titre + masquer le badge « validé par prof de math » (spécifique maths)
    var sub = document.getElementById('app-subtitle'); if (sub) sub.textContent = s.subtitle;
    var val = document.getElementById('app-validated'); if (val) val.style.display = 'none';
    document.body.classList.add('subject-locked');
    prep.style.display = 'flex';
  }

  function hidePrep() {
    var prep = document.getElementById('subject-prep');
    if (prep) prep.style.display = 'none';
    document.body.classList.remove('subject-locked');
  }

  window.setSubject = function (key) {
    var s = window.SUBJECTS[key];
    if (!s) return;
    // état visuel des boutons de matière
    Array.prototype.forEach.call(document.querySelectorAll('.subj-btn'), function (b) {
      b.classList.toggle('on', b.dataset.subj === key);
    });

    // matière sans contenu → écran « en préparation »
    if (!s.ready) { showPrep(key); return; }

    // matière prête (pour l'instant : Maths)
    window.currentSubject = key;
    try { localStorage.setItem('gr2_subject', key); } catch (_) {}
    hidePrep();

    // sous-titre + badge « validé par le prof » (maths uniquement)
    var sub = document.getElementById('app-subtitle'); if (sub) sub.textContent = s.subtitle;
    var val = document.getElementById('app-validated'); if (val) val.style.display = (key === 'maths') ? '' : 'none';

    // outils 100% maths (ex. graphiques interactifs) masqués hors maths
    Array.prototype.forEach.call(document.querySelectorAll('[data-math-only]'), function (el) {
      el.style.display = s.mathTools ? '' : 'none';
    });

    // afficher une section visible
    if (typeof showSection === 'function') {
      try { showSection({ currentTarget: document.body }, 'synthese'); } catch (_) {}
    }
  };

  function init() {
    var saved = 'maths';
    try { saved = localStorage.getItem('gr2_subject') || 'maths'; } catch (_) {}
    // si la matière mémorisée n'est plus disponible, on revient aux maths
    if (!window.SUBJECTS[saved] || !window.SUBJECTS[saved].ready) saved = 'maths';
    window.setSubject(saved);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { setTimeout(init, 350); });
  } else {
    setTimeout(init, 350);
  }
})();
