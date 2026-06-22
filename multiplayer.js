/* ============================================================
   multiplayer.js — Quiz multijoueur "salon de groupe" (style Kahoot)
   Supabase Realtime. Isolé du quiz solo. 100% défensif.
   Flux : Créer/Rejoindre (code) -> Salle d'attente -> Questions en direct
          -> Classement après chaque question -> Podium final.
   ============================================================ */
(function () {
  'use strict';

  var R_ROOMS = 'rooms', R_PLAYERS = 'room_players';
  var QPERGAME = 10;        // nombre de questions par partie
  var QTIME = 20;           // secondes par question

  var st = blankState();
  function blankState() {
    return { mode: 'group', code: null, isHost: false, room: null, players: [], channel: null,
             shownIdx: undefined, answeredThis: false, myChoice: -1, timer: null, timeLeft: 0, timeUp: false, autostart: false };
  }

  function sb() { return window.MGR2Auth ? window.MGR2Auth.sb() : null; }
  function user() { return window.MGR2Auth ? window.MGR2Auth.user() : null; }
  function pseudo() { return (window.MGR2Auth && window.MGR2Auth.pseudo()) || 'élève'; }
  function el(id) { return document.getElementById(id); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function toast(m, c) { if (typeof showToast === 'function') showToast(m, c || 'var(--color-nav)'); }
  function typeset() { if (window.MathJax && typeof safeMathJax === 'function') safeMathJax([el('mp-body')]); }

  /* ---------- ouverture / fermeture ---------- */
  window.openMultiplayer = function () {
    if (!sb() || !user()) { if (window.MGR2Auth) window.MGR2Auth.openLogin(); else toast('Connecte-toi pour jouer à plusieurs', '#f87171'); return; }
    var ov = el('mp-overlay'); if (!ov) return;
    st.mode = 'group';
    ov.style.display = 'flex';
    showHome();
  };
  window.openDuel = function () {
    if (!sb() || !user()) { if (window.MGR2Auth) window.MGR2Auth.openLogin(); else toast('Connecte-toi pour jouer en duel', '#f87171'); return; }
    var ov = el('mp-overlay'); if (!ov) return;
    st.mode = 'duel';
    ov.style.display = 'flex';
    showHome();
  };
  window.closeMultiplayer = function () {
    leaveRoom();
    var ov = el('mp-overlay'); if (ov) ov.style.display = 'none';
  };

  function body(html) { var b = el('mp-body'); if (b) { b.innerHTML = html; typeset(); } }

  /* ---------- écran d'accueil ---------- */
  function showHome() {
    var duel = st.mode === 'duel';
    body(
      '<h2 class="mp-title">' + (duel ? '⚔️ Duel 1 contre 1' : '🎮 Quiz à plusieurs') + '</h2>' +
      '<p class="mp-sub">' + (duel
        ? 'Défie un ami en tête-à-tête : 5 questions, le plus rapide et précis gagne ! La partie démarre dès qu’il rejoint.'
        : 'Affronte tes amis sur les mêmes questions, en direct !') + '</p>' +
      '<button class="mp-btn mp-btn-primary" onclick="mpCreate()">➕ ' + (duel ? 'Créer un duel' : 'Créer une partie') + '</button>' +
      '<div class="mp-or">ou</div>' +
      '<div class="mp-join">' +
        '<input id="mp-code-input" maxlength="4" placeholder="CODE" oninput="this.value=this.value.toUpperCase()" class="mp-code-input">' +
        '<button class="mp-btn" onclick="mpJoinFromInput()">Rejoindre</button>' +
      '</div>'
    );
    var i = el('mp-code-input'); if (i) i.focus();
  }

  function genCode() {
    var L = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789', c = '';
    for (var i = 0; i < 4; i++) c += L[Math.floor(Math.random() * L.length)];
    return c;
  }
  function pickQuestions(n) {
    var src = (typeof allQuestions !== 'undefined' && allQuestions) ? allQuestions : (window.allQuestions || []);
    var arr = src.slice();
    var shuffle = (typeof shuffleArray === 'function') ? shuffleArray : function (a) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; };
    shuffle(arr);
    return arr.slice(0, n).map(function (q) { return { q: q.q, opts: q.opts, ans: q.ans, exp: q.exp || '' }; });
  }

  /* ---------- créer / rejoindre ---------- */
  window.mpCreate = function () {
    var client = sb(), u = user(); if (!client || !u) { if (window.MGR2Auth) window.MGR2Auth.openLogin(); else toast('Connecte-toi pour jouer en duel', '#f87171'); return; }
    var code = genCode();
    var row = { code: code, host_id: u.id, status: 'lobby', q_index: -1, questions: pickQuestions(st.mode === 'duel' ? 5 : QPERGAME) };
    client.from(R_ROOMS).insert(row).select().single().then(function (res) {
      if (res.error) { console.warn('mp create:', res.error.message); toast('Création impossible (tables créées ?)', '#f87171'); return; }
      st.code = code; st.isHost = true; st.room = res.data;
      joinAsPlayer().then(function () { subscribe(); refreshPlayers().then(render); });
    });
  };
  window.mpJoinFromInput = function () {
    var i = el('mp-code-input'); if (!i) return;
    mpJoin((i.value || '').trim().toUpperCase());
  };
  window.mpJoin = function (code) {
    var client = sb(), u = user(); if (!client || !u) { if (window.MGR2Auth) window.MGR2Auth.openLogin(); else toast('Connecte-toi pour jouer en duel', '#f87171'); return; }
    if (!code || code.length < 4) { toast('Entre un code à 4 lettres', '#f87171'); return; }
    client.from(R_ROOMS).select('*').eq('code', code).maybeSingle().then(function (res) {
      if (res.error || !res.data) { toast('Code introuvable', '#f87171'); return; }
      if (res.data.status !== 'lobby') { toast('La partie a déjà commencé', '#f87171'); return; }
      st.code = code; st.isHost = (res.data.host_id === u.id); st.room = res.data;
      joinAsPlayer().then(function () { subscribe(); refreshPlayers().then(render); });
    });
  };
  function joinAsPlayer() {
    return sb().from(R_PLAYERS).upsert({ code: st.code, user_id: user().id, pseudo: pseudo(), score: 0, answered_idx: -1 }, { onConflict: 'code,user_id' })
      .then(function (r) { if (r.error) console.warn('mp join:', r.error.message); });
  }

  /* ---------- temps réel ---------- */
  // signature de l'état partagé : sert à ne re-rendre QUE si quelque chose a changé
  // (évite de casser une question en cours lors des rafraîchissements du filet de sécurité).
  function stateSig() {
    if (!st.room) return '';
    return st.room.status + '|' + st.room.q_index + '|' + (st.players || []).map(function (p) { return p.user_id + ':' + p.score + ':' + p.answered_idx; }).join(',');
  }
  function subscribe() {
    var client = sb(); if (!client || st.channel) return;
    st.channel = client.channel('mp-' + st.code)
      .on('postgres_changes', { event: '*', schema: 'public', table: R_ROOMS, filter: 'code=eq.' + st.code }, function (p) {
        if (p.eventType === 'DELETE') { roomClosed(); return; }
        if (p.new) { st.room = p.new; render(); }
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: R_PLAYERS, filter: 'code=eq.' + st.code }, function () {
        refreshPlayers().then(render);
      })
      .subscribe();
    // FILET DE SÉCURITÉ anti-bug : si le « temps réel » Supabase n'est pas activé sur le projet,
    // les notifications n'arrivent jamais → la partie restait bloquée (l'hôte ne voyait pas le 2e
    // joueur, le duel ne démarrait pas). On interroge donc la base toutes les 2,5 s en repli, et on
    // ne re-rend QUE si l'état a changé (donc sans perturber une question en cours).
    if (st.poll) clearInterval(st.poll);
    st.poll = setInterval(pollTick, 2500);
  }
  function pollTick() {
    var client = sb(); if (!client || !st.code) return;
    client.from(R_ROOMS).select('*').eq('code', st.code).maybeSingle().then(function (rm) {
      if (rm && rm.error) return;
      if (rm && !rm.data) { roomClosed(); return; } // salle fermée/supprimée
      if (rm && rm.data) st.room = rm.data;
      return refreshPlayers();
    }).then(function () {
      if (st.room && stateSig() !== st._sig) render(); // render() met st._sig à jour
    });
  }
  function refreshPlayers() {
    return sb().from(R_PLAYERS).select('*').eq('code', st.code).order('score', { ascending: false })
      .then(function (r) { if (!r.error) st.players = r.data || []; });
  }
  function roomClosed() { toast('La partie a été fermée par l\'hôte', '#fbbf24'); cleanupLocal(); showHome(); }

  /* ---------- routeur d'affichage ---------- */
  function render() {
    if (!st.room) return;
    // Duel : démarrage automatique dès que l'adversaire a rejoint (2 joueurs)
    if (st.mode === 'duel' && st.isHost && st.room.status === 'lobby' && st.players.length >= 2 && !st.autostart) {
      st.autostart = true; window.mpStart();
    }
    if (st.room.status === 'lobby') renderLobby();
    else if (st.room.status === 'playing') renderQuestion();
    else if (st.room.status === 'finished') renderPodium();
    st._sig = stateSig(); // mémorise l'état rendu (le filet de sécurité compare à ça)
  }

  function renderLobby() {
    var list = st.players.map(function (p) {
      var crown = (st.room && p.user_id === st.room.host_id) ? ' 👑' : '';
      return '<li class="mp-player">' + esc(p.pseudo) + crown + '</li>';
    }).join('');
    var duel = st.mode === 'duel';
    var hostControls = duel
      ? (st.players.length < 2
          ? '<p class="mp-wait">⏳ En attente d\'un adversaire… partage le code !</p>'
          : '<p class="mp-wait">⚔️ Adversaire trouvé — ça commence !</p>')
      : (st.isHost
          ? '<button class="mp-btn mp-btn-primary" onclick="mpStart()"' + (st.players.length < 1 ? ' disabled' : '') + '>▶ Démarrer la partie</button>'
          : '<p class="mp-wait">⏳ En attente que l\'hôte démarre…</p>');
    body(
      '<h2 class="mp-title">' + (duel ? '⚔️ Duel — salle d\'attente' : 'Salle d\'attente') + '</h2>' +
      '<div class="mp-codebox">Code : <span class="mp-code">' + esc(st.code) + '</span>' +
        '<button class="mp-copy" onclick="mpCopyCode()" title="Copier">📋</button></div>' +
      '<p class="mp-sub">' + (duel ? 'Envoie ce code à ton adversaire. Le duel démarre tout seul dès qu\'il rejoint.' : 'Partage ce code. Les autres tapent « Rejoindre » avec.') + '</p>' +
      '<div class="mp-playerstitle">' + (duel ? 'Joueurs (' + st.players.length + '/2)' : 'Joueurs (' + st.players.length + ')') + '</div>' +
      '<ul class="mp-players">' + (list || '<li class="mp-player">…</li>') + '</ul>' +
      hostControls +
      '<button class="mp-quit" onclick="closeMultiplayer()">Quitter</button>'
    );
  }
  window.mpCopyCode = function () { try { navigator.clipboard.writeText(st.code); toast('Code copié !', 'var(--color-parabole)'); } catch (e) {} };

  window.mpStart = function () {
    if (!st.isHost) return;
    sb().from(R_ROOMS).update({ status: 'playing', q_index: 0 }).eq('code', st.code).then(function (r) {
      if (r.error) { toast('Erreur démarrage', '#f87171'); return; }
      // avance locale immédiate pour l'hôte (le temps réel confirme juste derrière)
      st.room = Object.assign({}, st.room, { status: 'playing', q_index: 0 });
      render();
    });
  };

  /* ---------- question en direct ---------- */
  function startTimer() {
    if (st.timer) clearInterval(st.timer);
    st.timeLeft = QTIME; st.timeUp = false;
    st.timer = setInterval(function () {
      st.timeLeft--;
      var t = el('mp-timer'); if (t) t.textContent = st.timeLeft + 's';
      if (st.timeLeft <= 0) { clearInterval(st.timer); st.timer = null; st.timeUp = true; render(); }
    }, 1000);
  }

  function renderQuestion() {
    var idx = st.room.q_index;
    var q = st.room.questions[idx];
    if (!q) return;
    if (idx !== st.shownIdx) { // nouvelle question : on réinitialise
      st.shownIdx = idx; st.answeredThis = false; st.myChoice = -1; st.timeUp = false;
      startTimer();
    }
    var nAnswered = st.players.filter(function (p) { return p.answered_idx === idx; }).length;
    var locked = st.answeredThis || st.timeUp;
    var opts = q.opts.map(function (o, i) {
      var cls = 'mp-opt';
      if (locked) {
        if (i === q.ans) cls += ' mp-correct';
        else if (i === st.myChoice) cls += ' mp-wrong';
      }
      var dis = locked ? ' disabled' : '';
      return '<button class="' + cls + '"' + dis + ' onclick="mpAnswer(' + i + ')">' + o + '</button>';
    }).join('');

    body(
      '<div class="mp-qhead"><span>Question ' + (idx + 1) + ' / ' + st.room.questions.length + '</span>' +
        '<span id="mp-timer" class="mp-timerbadge">' + st.timeLeft + 's</span></div>' +
      '<div class="mp-question">' + q.q + '</div>' +
      '<div class="mp-opts">' + opts + '</div>' +
      (locked ? '<div class="mp-answeredmsg">' + (st.answeredThis ? (st.myChoice === q.ans ? '✅ Bonne réponse ! +10' : '❌ Raté') : '⏰ Temps écoulé') + '</div>' : '') +
      '<div class="mp-answeredcount">' + nAnswered + ' / ' + st.players.length + ' ont répondu</div>' +
      miniScores() +
      (st.isHost
        ? '<button class="mp-btn mp-btn-primary" onclick="mpNext()">' + (idx + 1 >= st.room.questions.length ? '🏁 Voir le podium' : 'Question suivante →') + '</button>'
        : '<p class="mp-wait">⏳ L\'hôte gère le rythme…</p>') +
      '<button class="mp-quit" onclick="closeMultiplayer()">Quitter</button>'
    );
  }

  function miniScores() {
    var top = st.players.slice(0, 5).map(function (p, i) {
      var me = p.user_id === user().id;
      return '<div class="mp-srow' + (me ? ' mp-me' : '') + '"><span>' + (i + 1) + '. ' + esc(p.pseudo) + (me ? ' (toi)' : '') + '</span><b>' + (p.score || 0) + '</b></div>';
    }).join('');
    return '<div class="mp-scores">' + top + '</div>';
  }

  window.mpAnswer = function (choice) {
    if (st.answeredThis || st.timeUp) return;
    var idx = st.room.q_index, q = st.room.questions[idx];
    st.answeredThis = true; st.myChoice = choice;
    var correct = choice === q.ans;
    var me = st.players.filter(function (p) { return p.user_id === user().id; })[0];
    var newScore = (me ? me.score : 0) + (correct ? 10 : 0);
    render(); // retour visuel immédiat
    sb().from(R_PLAYERS).update({ score: newScore, answered_idx: idx }).eq('code', st.code).eq('user_id', user().id)
      .then(function (r) { if (r.error) console.warn('mp answer:', r.error.message); });
  };

  window.mpNext = function () {
    if (!st.isHost) return;
    var next = st.room.q_index + 1;
    var upd = (next >= st.room.questions.length) ? { status: 'finished' } : { q_index: next };
    // ⚠️ sans .then() la requête supabase-js ne PART JAMAIS (builder paresseux)
    // → c'était le bug « ça ne passe pas à la question suivante ».
    sb().from(R_ROOMS).update(upd).eq('code', st.code).then(function (r) {
      if (r.error) { console.warn('mp next:', r.error.message); toast('Erreur pour passer à la suite', '#f87171'); return; }
      // avance locale immédiate pour l'hôte (les autres suivent via le temps réel)
      st.room = Object.assign({}, st.room, upd);
      render();
    });
  };

  /* ---------- podium ---------- */
  function renderPodium() {
    if (st.timer) { clearInterval(st.timer); st.timer = null; }
    var medals = ['🥇', '🥈', '🥉'];
    var rows = st.players.map(function (p, i) {
      var me = p.user_id === user().id;
      return '<div class="mp-prow' + (me ? ' mp-me' : '') + '"><span class="mp-prank">' + (medals[i] || (i + 1)) + '</span>' +
             '<span class="mp-pname">' + esc(p.pseudo) + (me ? ' (toi)' : '') + '</span><b>' + (p.score || 0) + ' pts</b></div>';
    }).join('');
    var winner = st.players[0];
    body(
      '<h2 class="mp-title">🏆 Podium</h2>' +
      (winner ? '<p class="mp-winner">Bravo <b>' + esc(winner.pseudo) + '</b> !</p>' : '') +
      '<div class="mp-podium">' + rows + '</div>' +
      (st.isHost ? '<button class="mp-btn mp-btn-primary" onclick="mpRematch()">🔄 Rejouer (nouvelle partie)</button>' : '<p class="mp-wait">Merci d\'avoir joué !</p>') +
      '<button class="mp-quit" onclick="closeMultiplayer()">Fermer</button>'
    );
  }
  window.mpRematch = function () { leaveRoom(); window.mpCreate(); };

  /* ---------- sortie / nettoyage ---------- */
  function cleanupLocal() {
    if (st.channel) { try { sb().removeChannel(st.channel); } catch (e) {} }
    if (st.timer) clearInterval(st.timer);
    if (st.poll) clearInterval(st.poll); // arrête le filet de sécurité
    st = blankState();
  }
  function leaveRoom() {
    var client = sb(), u = user(), code = st.code, host = st.isHost;
    cleanupLocal();
    if (client && u && code) {
      try {
        if (host) client.from(R_ROOMS).update({ status: 'finished' }).eq('code', code).then(function () {});
        client.from(R_PLAYERS).delete().eq('code', code).eq('user_id', u.id).then(function () {});
      } catch (e) {}
    }
  }
})();
