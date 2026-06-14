/* GR2 Study — Aide « Raccourcis clavier »
   Ouvre une fiche listant tous les raccourcis. Déclencheurs : touche « ? »,
   ou le bouton dans les Paramètres (window.showShortcuts()). 100% autonome. */
(function () {
  'use strict';

  var GROUPS = [
    ['Général', [
      ['?', 'Afficher cette aide'],
      ['Ctrl / K', 'Ouvrir la recherche'],
      ['/', 'Ouvrir la recherche (rapide)'],
      ['Échap', 'Fermer une fenêtre / l\'aide']
    ]],
    ['Quiz', [
      ['1 – 4', 'Choisir une réponse'],
      ['A – D', 'Choisir une réponse (lettres)']
    ]],
    ['Entraîneur de verbes (anglais)', [
      ['Entrée / ↓', 'Descendre au champ suivant'],
      ['↑', 'Remonter au Prétérit'],
      ['Entrée', 'Vérifier, puis verbe suivant']
    ]],
    ['Flashcards', [
      ['Espace / Entrée', 'Retourner la carte'],
      ['→', 'Je savais (facile)'],
      ['↓', 'J\'ai hésité'],
      ['←', 'Je ne savais pas (difficile)']
    ]],
    ['Mode Focus', [
      ['← / →', 'Carte précédente / suivante'],
      ['Échap', 'Quitter le mode Focus']
    ]]
  ];

  function ensureCSS() {
    if (document.getElementById('sc-style')) return;
    var st = document.createElement('style');
    st.id = 'sc-style';
    st.textContent =
      '.sc-overlay{position:fixed;inset:0;z-index:4200;background:rgba(0,0,0,0.78);display:none;align-items:center;justify-content:center;padding:1rem;backdrop-filter:blur(3px);}' +
      '.sc-overlay.show{display:flex;}' +
      '.sc-card{background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:20px;padding:1.8rem;max-width:460px;width:100%;max-height:88vh;overflow-y:auto;position:relative;box-shadow:0 20px 60px rgba(0,0,0,0.5);}' +
      '.sc-card h3{font-size:20px;font-weight:800;color:var(--color-nav);margin:0 0 1.1rem;}' +
      '.sc-grp{font-size:12px;text-transform:uppercase;letter-spacing:0.06em;color:var(--text-secondary);font-weight:700;margin:1rem 0 0.5rem;}' +
      '.sc-row{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:5px 0;font-size:14px;color:var(--text-primary);}' +
      '.sc-keys{display:flex;gap:5px;flex:0 0 auto;}' +
      '.sc-key{display:inline-block;min-width:22px;text-align:center;padding:3px 8px;border-radius:7px;background:var(--bg-main);border:1px solid var(--border-subtle);font-size:12px;font-weight:700;color:var(--text-primary);box-shadow:0 2px 0 var(--border-subtle);}' +
      '.sc-close{position:absolute;top:0.9rem;right:0.9rem;background:transparent;border:none;color:var(--text-secondary);font-size:20px;cursor:pointer;}';
    document.head.appendChild(st);
  }

  function keysHtml(combo) {
    // « 1 – 4 », « ← / → », « Espace / Entrée » → chaque token en touche
    return '<span class="sc-keys">' + combo.split(/\s*(?:\/|–)\s*/).map(function (k) {
      return '<span class="sc-key">' + k.trim() + '</span>';
    }).join(combo.indexOf('/') > -1 ? '<span style="color:var(--text-secondary)">/</span>' : '<span style="color:var(--text-secondary)">–</span>') + '</span>';
  }

  function build() {
    ensureCSS();
    var ov = document.getElementById('sc-overlay');
    if (ov) return ov;
    ov = document.createElement('div');
    ov.id = 'sc-overlay';
    ov.className = 'sc-overlay';
    var html = '<div class="sc-card"><button class="sc-close" aria-label="Fermer">✕</button>' +
      '<h3>⌨️ Raccourcis clavier</h3>';
    GROUPS.forEach(function (g) {
      html += '<div class="sc-grp">' + g[0] + '</div>';
      g[1].forEach(function (r) {
        html += '<div class="sc-row"><span>' + r[1] + '</span>' + keysHtml(r[0]) + '</div>';
      });
    });
    html += '</div>';
    ov.innerHTML = html;
    document.body.appendChild(ov);
    ov.addEventListener('click', function (e) { if (e.target === ov) hide(); });
    ov.querySelector('.sc-close').addEventListener('click', hide);
    return ov;
  }

  function show() { build().classList.add('show'); }
  function hide() { var ov = document.getElementById('sc-overlay'); if (ov) ov.classList.remove('show'); }

  window.showShortcuts = show;

  window.addEventListener('keydown', function (e) {
    var t = e.target;
    if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
    var ov = document.getElementById('sc-overlay');
    if (e.key === '?') { e.preventDefault(); (ov && ov.classList.contains('show')) ? hide() : show(); }
    else if (e.key === 'Escape' && ov && ov.classList.contains('show')) { hide(); }
  });
})();
