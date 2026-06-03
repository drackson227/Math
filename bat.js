/* GR2 Study — Easter egg 🦇
   Chauve-souris pixel-art 100% CSS (technique box-shadow + flap d'ailes).
   Déclencheur secret : taper « bat » au clavier. Aussi : window.releaseBats(n).
   Aucune image, aucun impact sur le reste du site (pointer-events:none). */
(function () {
  'use strict';

  var U = 5;                 // taille d'un « pixel » (px)
  var COLOR = '#141121';     // silhouette (le halo violet la rend visible)

  // Deux frames de battement d'ailes ('#' = pixel allumé)
  var FRAMES = [
    [ // ailes étendues
      '..#.......#..',
      '.###.....###.',
      '#############',
      '.###########.',
      '..###.#.###..',
      '...#..#..#...'
    ],
    [ // ailes relevées
      '#.#.......#.#',
      '.#.#.....#.#.',
      '..###.#.###..',
      '...#######...',
      '....#.#.#....',
      '....#...#....'
    ]
  ];

  function shadow(grid) {
    var parts = [];
    for (var y = 0; y < grid.length; y++) {
      var row = grid[y];
      for (var x = 0; x < row.length; x++) {
        if (row[x] !== '.' && row[x] !== ' ') parts.push((x * U) + 'px ' + (y * U) + 'px 0 0 ' + COLOR);
      }
    }
    return parts.join(',');
  }

  var SA = shadow(FRAMES[0]);
  var SB = shadow(FRAMES[1]);

  function ensureCSS() {
    if (document.getElementById('bat-style')) return;
    var st = document.createElement('style');
    st.id = 'bat-style';
    st.textContent =
      '.bat-sprite{position:absolute;width:' + U + 'px;height:' + U + 'px;background:transparent;' +
        'box-shadow:' + SA + ';animation:bat-flap .26s infinite;' +
        'filter:drop-shadow(0 0 3px rgba(167,139,250,.9));}' +
      '@keyframes bat-flap{0%,49%{box-shadow:' + SA + ';}50%,100%{box-shadow:' + SB + ';}}' +
      '.bat-fly{position:fixed;top:0;left:0;z-index:9999;pointer-events:none;will-change:transform;}' +
      '@keyframes bat-cross{from{transform:translate(-70px,var(--y0));}to{transform:translate(calc(100vw + 70px),var(--y1));}}';
    document.head.appendChild(st);
  }

  function spawnOne(delay) {
    var fly = document.createElement('div');
    fly.className = 'bat-fly';
    fly.style.setProperty('--y0', (Math.random() * 60 + 5) + 'vh');
    fly.style.setProperty('--y1', (Math.random() * 60 + 5) + 'vh');
    var dur = Math.random() * 2 + 3.5;
    fly.style.animation = 'bat-cross ' + dur.toFixed(2) + 's linear ' + delay.toFixed(2) + 's forwards';

    var b = document.createElement('div');
    b.className = 'bat-sprite';
    b.style.transform = 'scale(' + (Math.random() * 0.8 + 0.8).toFixed(2) + ')';
    fly.appendChild(b);

    document.body.appendChild(fly);
    setTimeout(function () { fly.remove(); }, (dur + delay) * 1000 + 300);
  }

  window.releaseBats = function (n) {
    ensureCSS();
    n = n || 7;
    for (var i = 0; i < n; i++) spawnOne(i * 0.35);
  };

  // Déclencheur secret : taper « bat » (ignoré quand on écrit dans un champ)
  var buf = '';
  window.addEventListener('keydown', function (e) {
    var t = e.target;
    if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
    if (e.key && e.key.length === 1) {
      buf = (buf + e.key.toLowerCase()).slice(-3);
      if (buf === 'bat') { buf = ''; window.releaseBats(); }
    }
  });
})();
