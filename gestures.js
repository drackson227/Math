/* GR2 Study — gestes tactiles (mobile)
   • Glisser depuis le BORD GAUCHE → ouvre le tiroir des onglets (+ matières).
   • Glisser depuis le BORD DROIT → ouvre les paramètres.
   • Tiroir ouvert + glisser vers la gauche → ferme. */
(function () {
  'use strict';
  var overlay, drawer, drawerInner;

  function build() {
    if (document.getElementById('nav-drawer')) return;
    overlay = document.createElement('div'); overlay.id = 'drawer-overlay';
    drawer = document.createElement('aside'); drawer.id = 'nav-drawer'; drawer.setAttribute('aria-label', 'Menu de navigation');
    drawer.innerHTML =
      '<div class="drawer-head"><strong>📚 Matières & onglets</strong>' +
        '<button type="button" id="drawer-close" aria-label="Fermer">✕</button></div>' +
      '<div id="drawer-inner"></div>';
    document.body.appendChild(overlay);
    document.body.appendChild(drawer);
    drawerInner = drawer.querySelector('#drawer-inner');
    overlay.addEventListener('click', close);
    drawer.querySelector('#drawer-close').addEventListener('click', close);
  }

  function populate() {
    drawerInner.innerHTML = '';
    var sb = document.getElementById('subject-bar');
    if (sb) {
      var t1 = document.createElement('div'); t1.className = 'drawer-section-title'; t1.textContent = 'Matières';
      drawerInner.appendChild(t1);
      var wrap = document.createElement('div'); wrap.className = 'drawer-subj';
      Array.prototype.forEach.call(sb.querySelectorAll('.subj-btn'), function (b) {
        var c = b.cloneNode(true);
        c.addEventListener('click', function () { try { b.click(); } catch (_) {} close(); });
        wrap.appendChild(c);
      });
      drawerInner.appendChild(wrap);
    }
    var nav = document.querySelector('.nav');
    if (nav) {
      var t2 = document.createElement('div'); t2.className = 'drawer-section-title'; t2.textContent = 'Onglets';
      drawerInner.appendChild(t2);
      Array.prototype.forEach.call(nav.querySelectorAll('.nav-btn'), function (b) {
        if (getComputedStyle(b).display === 'none') return;
        var c = document.createElement('button'); c.className = 'drawer-link'; c.textContent = b.textContent.trim();
        c.addEventListener('click', function () { try { b.click(); } catch (_) {} close(); });
        drawerInner.appendChild(c);
      });
    }
  }

  function open() { if (!drawer) return; populate(); drawer.classList.add('open'); overlay.classList.add('show'); }
  function close() { if (!drawer) return; drawer.classList.remove('open'); overlay.classList.remove('show'); }
  function openSettings() {
    try {
      var p = document.getElementById('settings-panel');
      if (p && !p.classList.contains('show') && typeof toggleSettings === 'function') toggleSettings();
    } catch (_) {}
  }

  // ---- détection des gestes ----
  var sx = 0, sy = 0, st = 0, fromLeft = false, fromRight = false, tracking = false;
  var EDGE = 28, THRESH = 55, MAXY = 45;

  function onStart(e) {
    if (!e.touches || e.touches.length !== 1) return;
    var t = e.touches[0]; sx = t.clientX; sy = t.clientY; st = Date.now();
    fromLeft = sx <= EDGE;
    fromRight = sx >= window.innerWidth - EDGE;
    tracking = fromLeft || fromRight || (drawer && drawer.classList.contains('open'));
  }
  function onEnd(e) {
    if (!tracking) return; tracking = false;
    var t = e.changedTouches && e.changedTouches[0]; if (!t) return;
    var dx = t.clientX - sx, dy = t.clientY - sy, dt = Date.now() - st;
    if (Math.abs(dy) > MAXY || dt > 700) return;
    if (drawer.classList.contains('open')) { if (dx < -THRESH) close(); return; }
    if (fromLeft && dx > THRESH) open();
    else if (fromRight && dx < -THRESH) openSettings();
  }

  function init() {
    build();
    document.addEventListener('touchstart', onStart, { passive: true });
    document.addEventListener('touchend', onEnd, { passive: true });
    window.openNavDrawer = open; // utile pour test / bouton éventuel
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
