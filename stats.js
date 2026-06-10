/* ============================================================
   stats.js — Tableau de bord PRIVÉ (créateur uniquement)
   Visible seulement quand tu es connecté en "drackson227".
   - EN DIRECT : présence temps réel Supabase (aucune table à créer)
       -> qui est en ligne maintenant, depuis quand, quelle matière, quel appareil.
   - HISTORIQUE : table "activity" (1 petit script SQL, voir _SQL_stats.sql)
       -> total de comptes, actifs aujourd'hui / 7 jours, dernière connexion de chacun.
   100% défensif : pas de réseau / pas de table -> message clair, le reste du site marche.
   ============================================================ */
(function () {
  'use strict';

  var ADMIN_EMAIL  = 'drackson227@mathsgr2.app';
  var ADMIN_PSEUDO = 'drackson227';
  var PRESENCE_ROOM = 'presence-site';
  var GUEST_KEY = 'mathsgr2_guest_id';

  /* ---- accès auth (exposé par auth.js) ---- */
  function sb()      { return window.MGR2Auth ? window.MGR2Auth.sb() : null; }
  function curUser() { return window.MGR2Auth ? window.MGR2Auth.user() : null; }
  function myPseudo(){ return window.MGR2Auth ? window.MGR2Auth.pseudo() : null; }
  function isAdmin() { var u = curUser(); return !!(u && u.email === ADMIN_EMAIL); }
  function el(id)    { return document.getElementById(id); }

  /* ---- utils ---- */
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function guestId() {
    try {
      var g = localStorage.getItem(GUEST_KEY);
      if (!g) { g = 'g' + Math.random().toString(36).slice(2, 9); localStorage.setItem(GUEST_KEY, g); }
      return g;
    } catch (e) { return 'g' + Math.random().toString(36).slice(2, 9); }
  }
  function presenceKey() { var u = curUser(); return u ? u.id : ('guest-' + guestId()); }

  function deviceLabel() {
    var ua = navigator.userAgent || '';
    if (/iPhone|iPod/i.test(ua)) return '📱 iPhone';
    if (/iPad/i.test(ua)) return '📱 iPad';
    if (/Android/i.test(ua)) return /Mobile/i.test(ua) ? '📱 Android' : '📱 Tablette';
    if (/Macintosh|Mac OS X/i.test(ua)) return '💻 Mac';
    if (/Windows/i.test(ua)) return '💻 Windows';
    if (/Linux/i.test(ua)) return '💻 Linux';
    return '🖥️ Ordinateur';
  }
  function subjectLabel() {
    try {
      var k = window.currentSubject || 'maths';
      var s = window.SUBJECTS && window.SUBJECTS[k];
      if (s) return (s.icon ? s.icon + ' ' : '') + (s.label || k);
      return '📘 Maths';
    } catch (e) { return '📘'; }
  }
  // Durée écoulée -> "à l'instant", "5 min", "2 h", "3 j"
  function ago(ms) {
    var s = Math.max(0, Math.floor((Date.now() - ms) / 1000));
    if (s < 50) return "à l'instant";
    if (s < 3600) return Math.round(s / 60) + ' min';
    if (s < 86400) return Math.round(s / 3600) + ' h';
    return Math.round(s / 86400) + ' j';
  }
  function dateFull(ms) {
    try {
      return new Date(ms).toLocaleString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
    } catch (e) { return ''; }
  }
  function sameDay(a, b) {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  }

  /* ====================== PRÉSENCE TEMPS RÉEL ======================
     Tout le monde (même non connecté) rejoint un canal de présence léger.
     Le créateur lit cet état pour voir qui est en ligne en direct. */
  var _presence = null;
  var _presenceState = {};
  var _lastSubject = null;

  function presenceMeta() {
    return {
      pseudo: myPseudo() || ('invité-' + guestId().slice(1, 5)),
      guest: !curUser(),
      subject: subjectLabel(),
      device: deviceLabel(),
      since: Date.now()
    };
  }

  function startPresence() {
    var client = sb();
    if (!client || _presence) return;
    try {
      _presence = client.channel(PRESENCE_ROOM, { config: { presence: { key: presenceKey() } } });
      _presence.on('presence', { event: 'sync' }, function () {
        try { _presenceState = _presence.presenceState() || {}; } catch (e) { _presenceState = {}; }
        renderIfOpen();
      });
      _presence.subscribe(function (status) {
        if (status === 'SUBSCRIBED') {
          _lastSubject = subjectLabel();
          _presence.track(presenceMeta());
        }
      });
    } catch (e) { console.warn('presence:', e && e.message); }
  }
  function stopPresence() {
    if (_presence) { try { _presence.unsubscribe(); } catch (e) {} _presence = null; _presenceState = {}; }
  }
  // Si la matière change, on remet à jour notre présence (sans tout recréer)
  function refreshPresenceSubject() {
    if (!_presence) return;
    var cur = subjectLabel();
    if (cur === _lastSubject) return;
    _lastSubject = cur;
    try { _presence.track(presenceMeta()); } catch (e) {}
  }

  // Liste aplatie des présents (1 entrée par personne)
  function onlineList() {
    var out = [];
    try {
      Object.keys(_presenceState).forEach(function (k) {
        var metas = _presenceState[k];
        if (metas && metas.length) {
          var m = metas[0];
          out.push({
            pseudo: m.pseudo || '?', guest: !!m.guest,
            subject: m.subject || '—', device: m.device || '—',
            since: m.since || Date.now()
          });
        }
      });
    } catch (e) {}
    out.sort(function (a, b) { return a.since - b.since; }); // les plus anciens d'abord
    return out;
  }

  /* ====================== HISTORIQUE (table "activity") ======================
     Chaque utilisateur CONNECTÉ écrit sa dernière activité.
     Le créateur lit toutes les lignes (politique RLS dédiée, voir _SQL_stats.sql). */
  var _activityMissing = false;

  function pingActivity() {
    var client = sb(), u = curUser();
    if (!client || !u) return;
    var row = {
      user_id: u.id, pseudo: myPseudo() || 'élève',
      last_seen: new Date().toISOString(),
      subject: subjectLabel(), device: deviceLabel()
    };
    client.from('activity').upsert(row, { onConflict: 'user_id' }).then(function (res) {
      if (res.error) {
        if (/relation|does not exist|schema cache|table/i.test(res.error.message)) _activityMissing = true;
        // silencieux : l'historique est un bonus
      } else { _activityMissing = false; }
    });
  }

  function loadActivity() {
    return new Promise(function (resolve) {
      var client = sb();
      if (!client) { resolve(null); return; }
      client.from('activity').select('pseudo,last_seen,created_at,subject,device').order('last_seen', { ascending: false }).limit(500)
        .then(function (res) {
          if (res.error) {
            if (/relation|does not exist|schema cache|table/i.test(res.error.message)) _activityMissing = true;
            resolve(null); return;
          }
          _activityMissing = false;
          resolve(res.data || []);
        });
    });
  }

  /* ====================== RENDU DU TABLEAU DE BORD ====================== */
  function statHostOpen() {
    var sec = el('stats');
    return sec && sec.classList.contains('active');
  }
  function renderIfOpen() { if (statHostOpen() && isAdmin()) renderOnline(); }

  function renderOnline() {
    var box = el('stats-online');
    if (!box) return;
    var list = onlineList();
    var accounts = list.filter(function (p) { return !p.guest; });
    var guests = list.filter(function (p) { return p.guest; });
    var head = '<div class="stats-cards">' +
      card('🟢', list.length, 'en ligne maintenant') +
      card('👤', accounts.length, 'connectés (compte)') +
      card('👻', guests.length, 'invités') +
      '</div>';
    var rows;
    if (!list.length) {
      rows = '<p class="stats-empty">Personne en ligne pour l\'instant (toi inclus si tu viens d\'arriver). Le compteur se met à jour tout seul.</p>';
    } else {
      rows = '<div class="stats-table-wrap"><table class="stats-table"><thead><tr>' +
        '<th>Personne</th><th>Matière</th><th>Appareil</th><th>En ligne depuis</th></tr></thead><tbody>' +
        list.map(function (p) {
          var tag = p.guest ? '<span class="stats-tag stats-tag-guest">invité</span>'
                            : (p.pseudo.toLowerCase() === ADMIN_PSEUDO ? '<span class="stats-tag stats-tag-admin">👑 toi</span>' : '');
          return '<tr><td><b>' + esc(p.pseudo) + '</b> ' + tag + '</td>' +
                 '<td>' + esc(p.subject) + '</td><td>' + esc(p.device) + '</td>' +
                 '<td>' + esc(ago(p.since)) + '</td></tr>';
        }).join('') + '</tbody></table></div>';
    }
    box.innerHTML = '<h3 class="stats-h">⚡ En direct</h3>' + head + rows;
  }

  function card(icon, value, label) {
    return '<div class="stats-card"><div class="stats-card-ic">' + icon + '</div>' +
           '<div class="stats-card-val">' + value + '</div>' +
           '<div class="stats-card-lab">' + esc(label) + '</div></div>';
  }

  function renderHistory(rows) {
    var box = el('stats-history');
    if (!box) return;
    if (_activityMissing || rows === null) {
      box.innerHTML = '<h3 class="stats-h">🕑 Historique des connexions</h3>' +
        '<div class="stats-note">' +
        '<p><b>Historique pas encore activé.</b> Pour voir le total de comptes et la dernière connexion de chacun même hors-ligne, exécute une fois le petit script <code>_SQL_stats.sql</code> dans Supabase → SQL Editor.</p>' +
        '<p style="opacity:.8;margin:.4rem 0 0;">Sans ça, le panneau « En direct » au-dessus fonctionne déjà parfaitement.</p>' +
        '</div>';
      return;
    }
    var now = new Date();
    var weekAgo = Date.now() - 7 * 86400000;
    var total = rows.length;
    var today = 0, week = 0;
    rows.forEach(function (r) {
      var t = new Date(r.last_seen);
      if (sameDay(t, now)) today++;
      if (t.getTime() >= weekAgo) week++;
    });
    var head = '<div class="stats-cards">' +
      card('🧮', total, 'comptes au total') +
      card('📅', today, "actifs aujourd'hui") +
      card('🗓️', week, 'actifs (7 jours)') +
      '</div>';
    var table = '<div class="stats-table-wrap"><table class="stats-table"><thead><tr>' +
      '<th>Pseudo</th><th>Dernière connexion</th><th>Matière</th><th>Appareil</th><th>Membre depuis</th></tr></thead><tbody>' +
      rows.map(function (r) {
        var t = new Date(r.last_seen).getTime();
        var fresh = (Date.now() - t) < 5 * 60000;
        var tag = (r.pseudo || '').toLowerCase() === ADMIN_PSEUDO ? ' <span class="stats-tag stats-tag-admin">👑</span>' : '';
        var dot = fresh ? '<span class="stats-dot"></span>' : '';
        var since = r.created_at ? new Date(r.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }) : '—';
        return '<tr><td>' + dot + '<b>' + esc(r.pseudo || '?') + '</b>' + tag + '</td>' +
               '<td title="' + esc(dateFull(t)) + '">' + esc(ago(t)) + '</td>' +
               '<td>' + esc(r.subject || '—') + '</td>' +
               '<td>' + esc(r.device || '—') + '</td>' +
               '<td>' + esc(since) + '</td></tr>';
      }).join('') + '</tbody></table></div>';
    box.innerHTML = '<h3 class="stats-h">🕑 Historique des connexions</h3>' + head + table;
  }

  function renderShell() {
    var body = el('stats-body');
    if (!body) return;
    if (!isAdmin()) {
      body.innerHTML = '<div class="stats-note" style="text-align:center;">🔒 Espace réservé au créateur du site.</div>';
      return;
    }
    if (!sb()) {
      body.innerHTML = '<div class="stats-note" style="text-align:center;">🔌 Les statistiques ont besoin d\'une connexion internet.</div>';
      return;
    }
    body.innerHTML =
      '<div id="stats-online" class="stats-block"></div>' +
      '<div id="stats-history" class="stats-block"></div>' +
      '<div style="text-align:center;margin-top:1rem;">' +
        '<button class="nav-btn" onclick="statsRefresh()" style="display:inline-block;width:auto;padding:8px 18px;">🔄 Rafraîchir</button>' +
      '</div>';
    renderOnline();
    el('stats-history').innerHTML = '<h3 class="stats-h">🕑 Historique des connexions</h3><p class="stats-empty">Chargement…</p>';
    loadActivity().then(renderHistory);
  }

  /* ====================== BOOT & HOOKS ====================== */
  function refreshNav() {
    var b = el('nav-stats');
    if (b) b.style.display = isAdmin() ? 'block' : 'none';
  }

  var _autoTimer = null;
  window.initStats = function () {
    refreshNav();
    renderShell();
    // rafraîchit l'historique en douceur tant que l'onglet est ouvert
    clearInterval(_autoTimer);
    _autoTimer = setInterval(function () {
      if (!statHostOpen()) { clearInterval(_autoTimer); _autoTimer = null; return; }
      pingActivity();
      if (isAdmin()) loadActivity().then(renderHistory);
    }, 30000);
  };
  window.statsRefresh = function () {
    if (!isAdmin()) return;
    pingActivity();
    renderOnline();
    el('stats-history').innerHTML = '<h3 class="stats-h">🕑 Historique des connexions</h3><p class="stats-empty">Chargement…</p>';
    loadActivity().then(renderHistory);
  };

  function boot() {
    if (!sb()) return;
    startPresence();
    pingActivity();
    refreshNav();
  }

  // Démarre la présence + le ping pour TOUT LE MONDE (léger), dès que Supabase est prêt.
  function waitAndBoot(tries) {
    if (sb()) { boot(); return; }
    if (tries <= 0) return;
    setTimeout(function () { waitAndBoot(tries - 1); }, 600);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { waitAndBoot(12); });
  else waitAndBoot(12);

  // Met à jour la présence (matière) régulièrement + re-ping activité quand l'onglet redevient visible
  setInterval(refreshPresenceSubject, 20000);
  document.addEventListener('visibilitychange', function () {
    if (!document.hidden) { refreshPresenceSubject(); pingActivity(); }
  });

  // Se branche sur le changement de connexion (déconnexion -> on relance la présence avec le bon pseudo)
  var _prevHook = window.onAuthChanged;
  window.onAuthChanged = function () {
    if (typeof _prevHook === 'function') { try { _prevHook(); } catch (e) {} }
    refreshNav();
    // recrée la présence avec la nouvelle identité (la clé change)
    stopPresence();
    startPresence();
    pingActivity();
    if (statHostOpen()) renderShell();
  };
})();
