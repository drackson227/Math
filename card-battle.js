/*! GR2 Study © 2026 Drackson — Tous droits réservés. Copie/réutilisation interdites sans autorisation (Instagram @drackson227). */
/* 🎮 ARÈNE — petit jeu pour décompresser.
   Gacha (tirage de cartes RNG) d'ANIMAUX originaux : réels + espèces éteintes + créatures imaginaires.
   Combats tour par tour façon Pokémon (types avec avantages). Tout en vanilla JS, sauvegarde locale.
   Monnaie : 1 tirage 🎟️ pour 10 XP gagnés dans le site (data.xp), + récompenses de combat.
   Personnages 100 % ORIGINAUX (aucune licence : ni Pokémon ni Dragon Ball). */
(function () {
  'use strict';
  var KEY = 'gr2_arene_v1';

  // Types et cycle d'avantages : chaque type bat le SUIVANT (terre→ciel→mer→ancien→mythe→terre).
  var TYPES = ['terre', 'ciel', 'mer', 'ancien', 'mythe'];
  // c = couleur néon du type (halo/lueur décoratifs).
  var TM = {
    terre:  { e: '🐾', n: 'Terre',  c: '#84cc16' },
    ciel:   { e: '🐦', n: 'Ciel',   c: '#38bdf8' },
    mer:    { e: '🌊', n: 'Mer',    c: '#2dd4bf' },
    ancien: { e: '🦴', n: 'Ancien', c: '#f59e0b' },
    mythe:  { e: '🐉', n: 'Mythe',  c: '#f472b6' }
  };
  // Raretés : poids de tirage (somme 100) + multiplicateur de stats.
  // c = couleur vive (cadre/lueur) ; t = couleur de TEXTE éclaircie (lisible AA sur fond sombre).
  // Drop RELEVÉ (mythique vraiment rare) : Légendaire ≈ 1/59, Mythique ≈ 1/333. st = nb d'étoiles.
  var RAR = {
    commun: { n: 'Commun',     c: '#9ca3af', t: '#cbd5e1', w: 70,  m: 1.00, s: '⚪', st: 1 },
    rare:   { n: 'Rare',       c: '#3b82f6', t: '#7cb0ff', w: 22,  m: 1.30, s: '🔵', st: 2 },
    epic:   { n: 'Épique',     c: '#a855f7', t: '#cd9bff', w: 6,   m: 1.65, s: '🟣', st: 3 },
    leg:    { n: 'Légendaire', c: '#f59e0b', t: '#fbbf24', w: 1.7, m: 2.15, s: '🟡', st: 4 },
    myth:   { n: 'Mythique',   c: '#ec4899', t: '#f9a8d4', w: 0.3, m: 3.00, s: '🌈', st: 5 }
  };
  var RAR_ORDER = ['commun', 'rare', 'epic', 'leg', 'myth'];

  // Bestiaire (28) — animaux originaux. {id, n:nom, e:emoji, t:type, r:rareté, mv:attaque spéciale}
  var CREATURES = [
    { id: 'renard', n: 'Renard', e: '🦊', t: 'terre', r: 'commun', mv: 'Morsure rusée' },
    { id: 'lapin', n: 'Lapin', e: '🐇', t: 'terre', r: 'commun', mv: 'Bond éclair' },
    { id: 'herisson', n: 'Hérisson', e: '🦔', t: 'terre', r: 'commun', mv: 'Roulade de piquants' },
    { id: 'canard', n: 'Canard', e: '🦆', t: 'ciel', r: 'commun', mv: 'Coup de bec' },
    { id: 'chouette', n: 'Chouette', e: '🦉', t: 'ciel', r: 'commun', mv: 'Vol silencieux' },
    { id: 'tortue', n: 'Tortue', e: '🐢', t: 'mer', r: 'commun', mv: 'Carapace' },
    { id: 'crabe', n: 'Crabe', e: '🦀', t: 'mer', r: 'commun', mv: 'Pince' },
    { id: 'serpent', n: 'Serpent', e: '🐍', t: 'terre', r: 'commun', mv: 'Venin' },
    { id: 'loup', n: 'Loup', e: '🐺', t: 'terre', r: 'rare', mv: 'Hurlement' },
    { id: 'ours', n: 'Ours', e: '🐻', t: 'terre', r: 'rare', mv: 'Coup de patte' },
    { id: 'aigle', n: 'Aigle', e: '🦅', t: 'ciel', r: 'rare', mv: 'Piqué foudroyant' },
    { id: 'perroquet', n: 'Perroquet', e: '🦜', t: 'ciel', r: 'rare', mv: 'Cri perçant' },
    { id: 'requin', n: 'Requin', e: '🦈', t: 'mer', r: 'rare', mv: 'Frénésie' },
    { id: 'pieuvre', n: 'Pieuvre', e: '🐙', t: 'mer', r: 'rare', mv: 'Encre & tentacules' },
    { id: 'panthere', n: 'Panthère', e: '🐆', t: 'terre', r: 'rare', mv: 'Embuscade' },
    { id: 'mammouth', n: 'Mammouth', e: '🐘', t: 'ancien', r: 'epic', mv: 'Charge laineuse' },
    { id: 'dodo', n: 'Dodo', e: '🦃', t: 'ancien', r: 'epic', mv: 'Coup de bec massif' },
    { id: 'smilodon', n: 'Tigre à dents de sabre', e: '🐅', t: 'ancien', r: 'epic', mv: 'Crocs-sabre' },
    { id: 'rhino', n: 'Rhinocéros laineux', e: '🦏', t: 'ancien', r: 'epic', mv: 'Coup de corne' },
    { id: 'paresseux', n: 'Paresseux géant', e: '🦥', t: 'ancien', r: 'epic', mv: 'Griffes lentes' },
    { id: 'trex', n: 'Tyrannosaure', e: '🦖', t: 'ancien', r: 'leg', mv: 'Méga-morsure' },
    { id: 'triceratops', n: 'Tricératops', e: '🦕', t: 'ancien', r: 'leg', mv: 'Triple charge' },
    { id: 'spino', n: 'Spinosaure', e: '🐊', t: 'mer', r: 'leg', mv: 'Croc des marais' },
    { id: 'megalodon', n: 'Mégalodon', e: '🦈', t: 'mer', r: 'leg', mv: 'Abysse' },
    { id: 'dragon', n: 'Dragon', e: '🐉', t: 'mythe', r: 'myth', mv: 'Souffle ardent' },
    { id: 'licorne', n: 'Licorne', e: '🦄', t: 'mythe', r: 'myth', mv: 'Corne céleste' },
    { id: 'kraken', n: 'Kraken', e: '🦑', t: 'mythe', r: 'myth', mv: 'Étreinte des abysses' },
    { id: 'golem', n: 'Golem de pierre', e: '🗿', t: 'mythe', r: 'myth', mv: 'Poing de roche' }
  ];
  var BYID = {}; CREATURES.forEach(function (c) { BYID[c.id] = c; });

  var G = {};
  function load() {
    try { G = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { G = {}; }
    G.owned = G.owned || {}; G.team = G.team || []; G.tickets = G.tickets || 0;
    G.xpClaimed = G.xpClaimed || 0; G.dust = G.dust || 0; G.stage = G.stage || 1;
    G.bestStage = G.bestStage || 1; G.view = G.view || 'summon'; G.welcomed = G.welcomed || false;
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify({ owned: G.owned, team: G.team, tickets: G.tickets, xpClaimed: G.xpClaimed, dust: G.dust, stage: G.stage, bestStage: G.bestStage, welcomed: G.welcomed })); } catch (e) {}
  }
  function getXp() { try { return (loadSavedData().xp) || 0; } catch (e) { return 0; } }
  // 10 XP gagnés = 1 tirage (accordé une seule fois, sans jamais retirer d'XP au joueur).
  function syncTickets() {
    var earned = Math.floor(getXp() / 10);
    if (earned > G.xpClaimed) { G.tickets += (earned - G.xpClaimed); G.xpClaimed = earned; save(); }
    if (!G.welcomed) { G.tickets += 5; G.welcomed = true; save(); } // 5 tirages offerts pour démarrer
  }

  function stats(id, lvl) {
    var c = BYID[id]; var m = RAR[c.r].m * (1 + 0.12 * ((lvl || 1) - 1));
    return { hp: Math.round(48 * m), atk: Math.round(13 * m) };
  }
  function beats(a, b) { return TYPES[(TYPES.indexOf(a) + 1) % 5] === b; }
  function typeMult(att, def) { if (beats(att, def)) return 1.5; if (beats(def, att)) return 0.67; return 1; }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  // étoiles de rareté (1→5)
  function starStr(n) { var s = ''; for (var i = 0; i < n; i++) s += '★'; return s; }
  // fenêtre d'art d'une carte : god-rays + reflet holo + halo de type + créature + badge de type en coin.
  // Le conteneur parent porte --tc (couleur type) et --rc (couleur rareté).
  function pwin(c) {
    return '<div class="cb-pwin">' +
      '<span class="cb-rays"></span><span class="cb-foil"></span><span class="cb-halo"></span>' +
      '<span class="cb-emoji">' + c.e + '</span>' +
      '<span class="cb-ptype cb-t-' + c.t + '" title="' + TM[c.t].n + '">' + TM[c.t].e + '</span>' +
      '</div>';
  }
  // portrait simple (combattants) : halo + créature
  function portrait(c) { return '<div class="cb-fport"><span class="cb-halo"></span><span class="cb-emoji">' + c.e + '</span></div>'; }
  // crée le fond cosmique fixe une seule fois
  function ensureCosmos() { if (document.getElementById('cb-cosmos')) return; var d = document.createElement('div'); d.id = 'cb-cosmos'; d.setAttribute('aria-hidden', 'true'); document.body.appendChild(d); }

  /* ---------------- GACHA ---------------- */
  function rollRarity() {
    var r = Math.random() * 100, acc = 0;
    for (var i = 0; i < RAR_ORDER.length; i++) { acc += RAR[RAR_ORDER[i]].w; if (r < acc) return RAR_ORDER[i]; }
    return 'commun';
  }
  function pullOne() {
    var rar = rollRarity();
    var pool = CREATURES.filter(function (c) { return c.r === rar; });
    var c = pool[Math.floor(Math.random() * pool.length)];
    var o = G.owned[c.id];
    var isNew = !o;
    if (isNew) { G.owned[c.id] = { count: 1, lvl: 1 }; }
    else { o.count++; if (o.lvl < 5) o.lvl++; G.dust += 5; } // doublon = +1 niveau (max 5) + 5 poussières
    return { c: c, isNew: isNew, lvl: G.owned[c.id].lvl };
  }
  window.CB = window.CB || {};
  CB.pull = function (n) {
    syncTickets();
    n = n || 1;
    if (G.tickets < n) { toast('Pas assez de tirages 🎟️ — gagne de l’XP (quiz, flashcards) !'); return; }
    G.tickets -= n;
    var res = []; for (var i = 0; i < n; i++) res.push(pullOne());
    save();
    showPullResult(res);
  };

  /* ---------------- COMBAT ---------------- */
  var B = null;
  function makeFighter(id, lvl, stageMul) {
    var s = stats(id, lvl); var hp = Math.round(s.hp * (stageMul || 1));
    return { id: id, cr: BYID[id], lvl: lvl || 1, hp: hp, max: hp, atk: Math.round(s.atk * (stageMul || 1)), charge: 0 };
  }
  function teamIds() {
    if (G.team && G.team.length) return G.team.filter(function (id) { return G.owned[id]; }).slice(0, 3);
    // auto : les 3 plus fortes possédées
    return Object.keys(G.owned).sort(function (a, b) { return stats(b, G.owned[b].lvl).atk - stats(a, G.owned[a].lvl).atk; }).slice(0, 3);
  }
  CB.fight = function () {
    syncTickets();
    var ids = teamIds();
    if (!ids.length) { toast('Invoque d’abord au moins 1 carte, puis compose ton équipe !'); G.view = 'summon'; render(); return; }
    var mul = 1 + 0.15 * (G.stage - 1);
    var team = ids.map(function (id) { return makeFighter(id, G.owned[id].lvl, 1); });
    var size = Math.min(3, 1 + Math.floor(G.stage / 2));
    var maxRar = Math.min(4, Math.floor((G.stage - 1) / 2)); // rareté ennemie plafonnée par l'étage (équilibrage)
    var pool = CREATURES.filter(function (c) { return RAR_ORDER.indexOf(c.r) <= maxRar; });
    if (!pool.length) pool = CREATURES;
    var enemy = [];
    for (var i = 0; i < size; i++) {
      var pick = pool[Math.floor(Math.random() * pool.length)];
      enemy.push(makeFighter(pick.id, 1 + Math.floor(G.stage / 3), mul));
    }
    B = { team: team, enemy: enemy, ti: 0, ei: 0, log: ['Combat de l’étage ' + G.stage + ' !'], over: false, win: false, busy: false };
    G.view = 'battle'; renderBattle();
  };
  function alive(arr, from) { for (var i = from; i < arr.length; i++) if (arr[i].hp > 0) return i; return -1; }
  function hit(att, def, special) {
    var base = att.atk * (special ? 1.85 : 1) * typeMult(att.cr.t, def.cr.t) * (0.88 + Math.random() * 0.24);
    return Math.max(1, Math.round(base));
  }
  CB.act = function (special) {
    if (!B || B.over || B.busy) return;
    var me = B.team[B.ti], foe = B.enemy[B.ei];
    if (special && me.charge < 3) { return; }
    B.busy = true;
    var adv = typeMult(me.cr.t, foe.cr.t);
    var dmg = hit(me, foe, special);
    playAttack(me, foe, 'me', special, dmg, function () { // à l'impact : appliquer les dégâts + log (sans re-render)
      foe.hp = Math.max(0, foe.hp - dmg);
      me.charge = special ? 0 : Math.min(3, me.charge + 1);
      pushLog((special ? '✨ ' + me.cr.n + ' utilise ' + me.cr.mv + ' !' : me.cr.e + ' ' + me.cr.n + ' attaque') + ' → ' + dmg + (adv > 1 ? ' (super efficace !)' : adv < 1 ? ' (peu efficace…)' : '') + ' dégâts.');
      setHp('foe', foe);
    }, function () { // fin de séquence
      if (foe.hp <= 0) {
        pushLog('💥 ' + foe.cr.n + ' adverse est K.O. !');
        var ni = alive(B.enemy, B.ei + 1);
        if (ni < 0) { renderBattle(); return endBattle(true); }
        B.ei = ni;
      }
      renderBattle();
      setTimeout(enemyTurn, 520);
    });
  };
  function enemyTurn() {
    if (!B || B.over) return;
    var foe = B.enemy[B.ei], me = B.team[B.ti];
    var sp = foe.charge >= 3 && Math.random() < 0.5;
    var adv = typeMult(foe.cr.t, me.cr.t);
    var dmg = hit(foe, me, sp);
    playAttack(foe, me, 'foe', sp, dmg, function () {
      me.hp = Math.max(0, me.hp - dmg);
      foe.charge = sp ? 0 : Math.min(3, foe.charge + 1);
      pushLog((sp ? '✨ ' + foe.cr.n + ' adverse utilise ' + foe.cr.mv + ' !' : foe.cr.n + ' adverse attaque') + ' → ' + dmg + (adv > 1 ? ' (super efficace !)' : adv < 1 ? ' (peu efficace…)' : '') + ' dégâts.');
      setHp('me', me);
    }, function () {
      if (me.hp <= 0) {
        pushLog('💀 Ton ' + me.cr.n + ' est K.O. !');
        var ni = alive(B.team, B.ti + 1);
        if (ni < 0) { B.busy = false; renderBattle(); return endBattle(false); }
        B.ti = ni;
      }
      B.busy = false; renderBattle();
    });
  }
  function endBattle(win) {
    B.over = true; B.win = win; B.busy = false;
    if (win) {
      var reward = 1 + Math.floor(G.stage / 3);
      G.tickets += reward; G.dust += 10 + G.stage * 2;
      B.reward = reward;
      if (G.stage >= G.bestStage) G.bestStage = G.stage + 1;
      G.stage++;
      B.log.push('🏆 Victoire ! +' + reward + ' 🎟️ tirage(s). Étage suivant débloqué.');
    } else {
      B.log.push('☠️ Défaite… réessaie (aucune perte). Astuce : exploite les avantages de type.');
    }
    save(); renderBattle();
    if (win) cbConfetti(120, ['#16a34a', '#fde047', '#ffffff', '#60a5fa', '#f472b6']);
  }

  /* ---------------- ÉQUIPE / COLLECTION ---------------- */
  CB.team = function (id) {
    var i = G.team.indexOf(id);
    if (i >= 0) { G.team.splice(i, 1); }
    else { if (G.team.length >= 3) { toast('Équipe pleine (3 max) — retire-en une d’abord.'); return; } G.team.push(id); }
    save(); render();
  };
  CB.go = function (v) { G.view = v; save(); render(); };

  /* ---------------- RENDU ---------------- */
  function toast(m) { if (typeof showToast === 'function') showToast(m, 'var(--color-nav)'); }
  // pluie de confettis (récompense / rareté élevée)
  function cbConfetti(n, colors) {
    try {
      var box = document.createElement('div'); box.className = 'cb-confetti';
      for (var i = 0; i < n; i++) {
        var s = document.createElement('i');
        s.style.left = (Math.random() * 100) + '%';
        s.style.background = colors[i % colors.length];
        s.style.animationDelay = (Math.random() * 0.4).toFixed(2) + 's';
        s.style.setProperty('--dx', (Math.random() * 220 - 110) + 'px');
        s.style.setProperty('--rot', (Math.random() * 720 - 360) + 'deg');
        box.appendChild(s);
      }
      document.body.appendChild(box);
      setTimeout(function () { box.remove(); }, 2400);
    } catch (e) {}
  }
  // nombre de dégâts qui s'envole au-dessus d'un combattant
  function cbFloat(el, text, cls) {
    if (!el) return;
    var f = document.createElement('div'); f.className = 'cb-float ' + (cls || ''); f.textContent = text;
    el.appendChild(f);
    setTimeout(function () { f.remove(); }, 900);
  }
  /* ---------------- MOTEUR D'EFFETS DE COMBAT ---------------- */
  // attaque SIGNATURE par animal (chaque créature joue son effet)
  var FXMAP = {
    renard: 'slash', lapin: 'stomp', herisson: 'slash', serpent: 'venom',
    canard: 'dive', chouette: 'dive', tortue: 'water', crabe: 'water',
    loup: 'slash', ours: 'slash', panthere: 'slash', aigle: 'dive', perroquet: 'dive',
    requin: 'water', pieuvre: 'water',
    mammouth: 'stomp', dodo: 'dive', smilodon: 'slash', rhino: 'stomp', paresseux: 'slash',
    trex: 'chomp', triceratops: 'stomp', spino: 'water', megalodon: 'water',
    dragon: 'fire', licorne: 'beam', kraken: 'water', golem: 'stomp'
  };
  var FXC = { fire: '#fb923c', water: '#38bdf8', venom: '#a3e635', dive: '#e2e8f0', slash: '#ffffff', stomp: '#fbbf24', chomp: '#ffffff', beam: '#c4b5fd' };
  function prefersReduced() { try { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { return false; } }
  function mkFx(stage, cls) { var e = document.createElement('div'); e.className = cls; stage.appendChild(e); return e; }
  function ctr(el) { return { x: el.offsetLeft + el.offsetWidth / 2, y: el.offsetTop + el.offsetHeight * 0.42 }; }
  // projectile qui vole de l'attaquant vers la cible
  function travelFx(el, a, b, dur) {
    el.style.left = a.x + 'px'; el.style.top = a.y + 'px';
    var an = el.animate([
      { transform: 'translate(-50%,-50%) scale(.5)', opacity: 0 },
      { transform: 'translate(-50%,-50%) scale(1.05)', opacity: 1, offset: .16 },
      { transform: 'translate(calc(-50% + ' + (b.x - a.x) + 'px), calc(-50% + ' + (b.y - a.y) + 'px)) scale(1)', opacity: 1, offset: .82 },
      { transform: 'translate(calc(-50% + ' + (b.x - a.x) + 'px), calc(-50% + ' + (b.y - a.y) + 'px)) scale(1.4)', opacity: 0 }
    ], { duration: dur, easing: 'cubic-bezier(.45,0,.7,1)' });
    an.onfinish = function () { el.remove(); };
  }
  // gerbe d'étincelles à l'impact
  function sparkBurst(stage, defEl, color, n) {
    var c = ctr(defEl);
    for (var i = 0; i < n; i++) {
      var s = mkFx(stage, 'cb-spark'); s.style.setProperty('--fxc', color); s.style.left = c.x + 'px'; s.style.top = c.y + 'px';
      var ang = Math.random() * Math.PI * 2, dist = 28 + Math.random() * 64;
      var an = s.animate([
        { transform: 'translate(-50%,-50%) scale(1)', opacity: 1 },
        { transform: 'translate(calc(-50% + ' + (Math.cos(ang) * dist) + 'px), calc(-50% + ' + (Math.sin(ang) * dist) + 'px)) scale(.2)', opacity: 0 }
      ], { duration: 460 + Math.random() * 240, easing: 'ease-out' });
      an.onfinish = (function (el) { return function () { el.remove(); }; })(s);
    }
  }
  // effet signature selon la catégorie d'attaque de l'animal
  function signatureFx(stage, atkEl, defEl, side, key, tc) {
    var a = ctr(atkEl), b = ctr(defEl), fxc = (key === 'beam' ? tc : (FXC[key] || tc));
    if (key === 'fire' || key === 'water' || key === 'venom') {
      var emo = key === 'fire' ? '🔥' : key === 'water' ? '🌊' : '☠️';
      var p = mkFx(stage, 'cb-fx'); p.innerHTML = '<span class="cb-fx-emoji" style="--fxc:' + fxc + '">' + emo + '</span>';
      travelFx(p, a, b, 560);
      setTimeout(function () { sparkBurst(stage, defEl, fxc, 16); }, 520);
    } else if (key === 'beam') {
      var len = Math.hypot(b.x - a.x, b.y - a.y), ang = Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI;
      var be = mkFx(stage, 'cb-beam'); be.style.setProperty('--fxc', fxc); be.style.left = a.x + 'px'; be.style.top = a.y + 'px'; be.style.width = len + 'px'; be.style.transform = 'rotate(' + ang + 'deg)';
      setTimeout(function () { be.remove(); }, 520);
      setTimeout(function () { sparkBurst(stage, defEl, fxc, 18); }, 250);
    } else if (key === 'slash' || key === 'chomp') {
      var c = ctr(defEl), tops = key === 'chomp' ? [-12, 12] : [-12, 0, 12];
      tops.forEach(function (off, idx) {
        setTimeout(function () { var cl = mkFx(stage, 'cb-claw'); cl.style.left = c.x + 'px'; cl.style.top = (c.y + off) + 'px'; setTimeout(function () { cl.remove(); }, 420); }, idx * 70);
      });
      setTimeout(function () { sparkBurst(stage, defEl, fxc, 14); }, 240);
    } else if (key === 'dive') {
      var dxp = b.x - a.x, dyp = b.y - a.y;
      atkEl.animate([{ transform: 'translate(0,0)' }, { transform: 'translate(' + (dxp * 0.7) + 'px,' + (dyp * 0.5) + 'px) rotate(' + (side === 'me' ? 14 : -14) + 'deg)', offset: .5 }, { transform: 'translate(0,0)' }], { duration: 560, easing: 'ease-in-out' });
      var len2 = Math.hypot(b.x - a.x, b.y - a.y), ang2 = Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI;
      var st = mkFx(stage, 'cb-beam'); st.style.setProperty('--fxc', fxc); st.style.height = '5px'; st.style.left = a.x + 'px'; st.style.top = a.y + 'px'; st.style.width = len2 + 'px'; st.style.transform = 'rotate(' + ang2 + 'deg)';
      setTimeout(function () { st.remove(); }, 520);
      setTimeout(function () { sparkBurst(stage, defEl, fxc, 12); }, 420);
    } else { // stomp : l'attaquant charge puis onde de choc
      var dxp2 = b.x - a.x;
      atkEl.animate([{ transform: 'translate(0,0)' }, { transform: 'translate(' + (dxp2 * 0.6) + 'px,0)', offset: .45 }, { transform: 'translate(' + (dxp2 * 0.6) + 'px,0)', offset: .55 }, { transform: 'translate(0,0)' }], { duration: 600, easing: 'cubic-bezier(.4,0,.2,1)' });
      setTimeout(function () {
        var sh = mkFx(stage, 'cb-shock'); sh.style.setProperty('--fxc', fxc); var c2 = ctr(defEl); sh.style.left = c2.x + 'px'; sh.style.top = (defEl.offsetTop + defEl.offsetHeight - 12) + 'px'; setTimeout(function () { sh.remove(); }, 520);
        sparkBurst(stage, defEl, fxc, 14);
      }, 330);
    }
  }
  // bannière « nom de l'attaque » (style anime/Dokkan)
  function bannerEl(stage, cr, tc) {
    var d = document.createElement('div'); d.className = 'cb-movecard'; d.style.setProperty('--tc', tc);
    d.innerHTML = esc(cr.mv) + '<small>' + TM[cr.t].e + ' ' + esc(cr.n) + '</small>';
    stage.appendChild(d); return d;
  }
  // met à jour la barre de PV d'un combattant SANS re-render (pour ne pas couper l'animation)
  function setHp(side, f) {
    var el = document.querySelector('#arene .cb-fighter.' + side); if (!el) return;
    var p = Math.max(0, Math.round(f.hp / f.max * 100));
    var sp = el.querySelector('.cb-hpbar span'); if (sp) { sp.style.width = p + '%'; sp.style.background = f.hp > f.max * 0.3 ? 'linear-gradient(90deg,#16a34a,#4ade80)' : 'linear-gradient(90deg,#ef4444,#f87171)'; }
    var t = el.querySelector('.cb-fhp'); if (t) t.textContent = f.hp + ' / ' + f.max;
    if (f.hp <= 0) el.classList.add('ko');
  }
  function pushLog(s) {
    if (!B) return; B.log.push(s);
    var box = document.querySelector('#arene .cb-log'); if (!box) return;
    var d = document.createElement('div'); d.innerHTML = s; box.appendChild(d);
    while (box.children.length > 5) box.removeChild(box.firstChild);
    box.scrollTop = box.scrollHeight;
  }
  // joue une attaque : onImpact (= appliquer les dégâts) puis onDone (= suite du tour)
  function playAttack(me, foe, side, special, dmg, onImpact, onDone) {
    var stage = document.querySelector('#arene .cb-stage');
    var atkEl = document.querySelector('#arene .cb-fighter.' + side);
    var defSide = side === 'me' ? 'foe' : 'me';
    var defEl = document.querySelector('#arene .cb-fighter.' + defSide);
    var key = FXMAP[me.cr.id] || 'slash', tc = TM[me.cr.t].c;
    if (prefersReduced() || !stage || !atkEl || !defEl) { if (onImpact) onImpact(); setTimeout(function () { if (onDone) onDone(); }, 140); return; }
    var field = stage.querySelector('.cb-arena-field');
    if (special) {
      var cine = mkFx(stage, 'cb-cinema'); if (field) field.classList.add('cb-zoom');
      atkEl.style.setProperty('--tc', tc); atkEl.classList.add('cb-cast');
      var banner = bannerEl(stage, me.cr, tc);
      setTimeout(function () { signatureFx(stage, atkEl, defEl, side, key, tc); }, 340);
      setTimeout(function () {
        if (onImpact) onImpact();
        var fl = mkFx(stage, 'cb-impact-flash'); setTimeout(function () { fl.remove(); }, 320);
        stage.classList.add('cb-quake'); setTimeout(function () { stage.classList.remove('cb-quake'); }, 500);
        defEl.classList.add('cb-hurt-big'); cbFloat(defEl, '-' + dmg, 'crit');
      }, 820);
      setTimeout(function () { atkEl.classList.remove('cb-cast'); defEl.classList.remove('cb-hurt-big'); if (field) field.classList.remove('cb-zoom'); cine.remove(); banner.remove(); if (onDone) onDone(); }, 1320);
    } else {
      var lc = side === 'me' ? 'cb-lunge-r' : 'cb-lunge-l'; atkEl.classList.add(lc);
      var a = ctr(atkEl), b = ctr(defEl), p = mkFx(stage, 'cb-fx');
      p.innerHTML = '<span class="cb-fx-emoji" style="--fxc:' + tc + ';font-size:30px">' + TM[me.cr.t].e + '</span>';
      travelFx(p, a, b, 360);
      setTimeout(function () { if (onImpact) onImpact(); defEl.classList.add('cb-hurt'); sparkBurst(stage, defEl, tc, 8); cbFloat(defEl, '-' + dmg, ''); }, 360);
      setTimeout(function () { atkEl.classList.remove(lc); defEl.classList.remove('cb-hurt'); if (onDone) onDone(); }, 640);
    }
  }
  function bar(cur, max, col) {
    var p = Math.max(0, Math.round(cur / max * 100));
    return '<div class="cb-hpbar"><span style="width:' + p + '%;background:' + col + '"></span></div>';
  }
  function tag(t) { return '<span class="cb-type cb-t-' + t + '">' + TM[t].e + ' ' + TM[t].n + '</span>'; }

  function head() {
    return '<div class="cb-head">' +
      '<button class="cb-quit" onclick="showSection(\'synthese\')" title="Revenir à l’étude">← Quitter</button>' +
      '<div class="cb-bal"><span title="Tirages">🎟️ <b>' + G.tickets + '</b></span><span title="Poussières (doublons)">✨ <b>' + G.dust + '</b></span><span title="Étage d’arène">🏟️ <b>' + G.stage + '</b></span></div>' +
      '<div class="cb-tabs">' +
        '<button class="cb-tab' + (G.view === 'summon' ? ' on' : '') + '" onclick="CB.go(\'summon\')">🎴 Invocation</button>' +
        '<button class="cb-tab' + (G.view === 'collection' ? ' on' : '') + '" onclick="CB.go(\'collection\')">📒 Collection</button>' +
        '<button class="cb-tab' + (G.view === 'battle' ? ' on' : '') + '" onclick="CB.go(\'arena\')">⚔️ Arène</button>' +
      '</div></div>';
  }

  function viewSummon() {
    var rates = RAR_ORDER.map(function (k) { return '<span class="cb-rate" style="color:' + RAR[k].t + '"><span class="cb-stars">' + starStr(RAR[k].st) + '</span> ' + RAR[k].n + ' ' + RAR[k].w + '%</span>'; }).join('');
    return head() +
      '<div class="cb-panel cb-summon">' +
        '<h3 class="cb-h" style="justify-content:center;">🎴 Invocation</h3>' +
        '<p class="cb-mut">Tu gagnes <b>1 tirage 🎟️ tous les 10 XP</b> (quiz, flashcards…) et en gagnant des combats.</p>' +
        '<div class="cb-portal"><span class="cb-ring"></span><span class="cb-ring r2"></span><span class="cb-core">🥚</span></div>' +
        '<div class="cb-summon-btns">' +
          '<button class="cb-btn cb-btn-main" onclick="CB.pull(1)">Invoquer ×1 (1 🎟️)</button>' +
          '<button class="cb-btn" onclick="CB.pull(10)">Invoquer ×10 (10 🎟️)</button>' +
        '</div>' +
        '<div class="cb-rates">' + rates + '</div>' +
        '<div id="cb-pullzone"></div>' +
      '</div>';
  }

  function showPullResult(res) {
    G.view = 'summon'; render();
    var z = document.getElementById('cb-pullzone'); if (!z) return;
    var best = res.reduce(function (m, r) { return Math.max(m, RAR_ORDER.indexOf(r.c.r)); }, 0);
    var bc = RAR[RAR_ORDER[best]].c;
    var beams = ''; for (var bi = 0; bi < 7; bi++) { beams += '<i style="left:' + (15 + bi * 11) + '%; animation-delay:' + (bi * 0.05).toFixed(2) + 's"></i>'; }
    z.innerHTML = '<div class="cb-rng"><div class="cb-beams" style="--bc:' + bc + '">' + beams + '</div><div class="cb-burst" style="--bc:' + bc + '"></div></div>';
    var panel = document.querySelector('#arene .cb-panel');
    if (panel) { var fl = document.createElement('div'); fl.className = 'cb-flash'; fl.style.setProperty('--bc', bc); panel.appendChild(fl); setTimeout(function () { fl.remove(); }, 760); }
    setTimeout(function () {
      z.innerHTML = '<div class="cb-pulls">' + res.map(function (r, i) {
        var rr = r.c.r, gold = (rr === 'leg' || rr === 'myth') ? ' goldname' : '';
        return '<div class="cb-pcard cb-r-' + rr + '" style="--rc:' + RAR[rr].c + '; --tc:' + TM[r.c.t].c + '; animation-delay:' + (i * 0.08).toFixed(2) + 's">' +
          '<div class="cb-pshine"></div>' +
          pwin(r.c) +
          '<div class="cb-pplate">' +
            '<div class="cb-pname' + gold + '">' + esc(r.c.n) + '</div>' +
            '<div class="cb-stars">' + starStr(RAR[rr].st) + '</div>' +
            (r.isNew ? '<div class="cb-pnew">NOUVEAU !</div>' : '<div class="cb-pdup">doublon · niv. ' + r.lvl + '</div>') +
          '</div>' +
          '</div>';
      }).join('') + '</div>';
      if (best >= 2) cbConfetti(best >= 4 ? 130 : best >= 3 ? 80 : 50, [RAR[RAR_ORDER[best]].c, '#ffffff', '#fde047']);
    }, 560);
  }

  function viewCollection() {
    var owned = Object.keys(G.owned).length;
    var teamSlots = '';
    for (var i = 0; i < 3; i++) {
      var id = G.team[i];
      teamSlots += id
        ? '<button class="cb-slot full" onclick="CB.team(\'' + id + '\')" title="Retirer">' + BYID[id].e + '<span>' + esc(BYID[id].n) + '</span></button>'
        : '<div class="cb-slot empty">+</div>';
    }
    var grid = CREATURES.map(function (c) {
      var o = G.owned[c.id];
      if (!o) return '<div class="cb-cell locked" style="--rc:' + RAR[c.r].c + '; --tc:' + TM[c.t].c + '">' + pwin(c) + '<div class="cb-cplate"><div class="cb-clk">❓ ???</div><div class="cb-stars">' + starStr(RAR[c.r].st) + '</div></div></div>';
      var inTeam = G.team.indexOf(c.id) >= 0;
      var s = stats(c.id, o.lvl);
      return '<div class="cb-cell" style="--rc:' + RAR[c.r].c + '; --tc:' + TM[c.t].c + '">' +
        pwin(c) +
        '<div class="cb-cplate">' +
          '<div class="cb-cname">' + esc(c.n) + '</div>' +
          '<div class="cb-stars">' + starStr(RAR[c.r].st) + ' <span class="cb-mut">niv.' + o.lvl + '</span></div>' +
          '<div class="cb-power">⚡ <b>' + (s.hp + s.atk) + '</b> <span class="cb-mut">❤' + s.hp + ' ⚔' + s.atk + '</span></div>' +
          '<button class="cb-mini' + (inTeam ? ' on' : '') + '" onclick="CB.team(\'' + c.id + '\')">' + (inTeam ? '✓ Équipe' : '+ Équipe') + '</button>' +
        '</div>' +
        '</div>';
    }).join('');
    return head() +
      '<div class="cb-panel">' +
        '<h3 class="cb-h">📒 Collection <span class="cb-mut">' + owned + '/' + CREATURES.length + '</span></h3>' +
        '<div class="cb-prog"><span style="width:' + Math.round(owned / CREATURES.length * 100) + '%"></span></div>' +
        '<div class="cb-team"><span class="cb-mut">Mon équipe (3 max) :</span><div class="cb-slots">' + teamSlots + '</div></div>' +
        '<div class="cb-grid">' + grid + '</div>' +
      '</div>';
  }

  function viewArena() {
    var ids = teamIds();
    var team = ids.map(function (id) { return '<span class="cb-atok">' + BYID[id].e + ' ' + esc(BYID[id].n) + '</span>'; }).join('');
    var cyc = TYPES.map(function (t) { return tag(t); }).join('<span class="cb-mut" style="margin:0 2px;">›</span>');
    return head() +
      '<div class="cb-panel cb-arena">' +
        '<h3 class="cb-h" style="justify-content:center;">⚔️ Arène — étage ' + G.stage + '</h3>' +
        '<p class="cb-mut">🏆 Record : étage ' + G.bestStage + '</p>' +
        '<div class="cb-cycle">' + cyc + '</div>' +
        '<p class="cb-mut">↑ chaque type bat le suivant (super efficace ×1.5)</p>' +
        '<div class="cb-myteam">' + (team || '<span class="cb-mut">Aucune équipe — va dans 📒 Collection.</span>') + '</div>' +
        '<button class="cb-btn cb-btn-main" onclick="CB.fight()">⚔️ Combattre l’étage ' + G.stage + '</button>' +
      '</div>';
  }

  function fighterCard(f, side) {
    return '<div class="cb-fighter ' + side + (f.hp <= 0 ? ' ko' : '') + '" style="--tc:' + TM[f.cr.t].c + '; --rc:' + RAR[f.cr.r].c + '">' +
      portrait(f.cr) +
      '<div class="cb-fname">' + esc(f.cr.n) + ' <span class="cb-mut">niv.' + f.lvl + '</span></div>' +
      '<div class="cb-stars">' + starStr(RAR[f.cr.r].st) + '</div>' +
      tag(f.cr.t) +
      bar(f.hp, f.max, f.hp > f.max * 0.3 ? '#22c55e' : '#ef4444') +
      '<div class="cb-fhp">' + f.hp + ' / ' + f.max + '</div>' +
      '<div class="cb-charge">' + (side === 'me' ? 'Spécial ' + f.charge + '/3' : '') + '</div>' +
      '</div>';
  }
  function renderBattle() {
    var el = document.getElementById('arene'); if (!el || !B) return;
    var me = B.team[B.ti], foe = B.enemy[B.ei];
    var reserve = function (arr, ai) { return arr.map(function (f, i) { return '<span class="cb-res' + (f.hp <= 0 ? ' dead' : i === ai ? ' act' : '') + '">' + f.cr.e + '</span>'; }).join(''); };
    var log = B.log.slice(-5).map(function (l) { return '<div>' + l + '</div>'; }).join('');
    var ctrl;
    if (B.over) {
      ctrl = '<div class="cb-result ' + (B.win ? 'win' : 'lose') + '">' + (B.win ? '🏆 Victoire ! +' + B.reward + ' 🎟️' : '☠️ Défaite') + '</div>' +
        '<div class="cb-summon-btns">' + (B.win ? '<button class="cb-btn cb-btn-main" onclick="CB.fight()">⚔️ Étage suivant</button>' : '<button class="cb-btn cb-btn-main" onclick="CB.fight()">↻ Réessayer</button>') +
        '<button class="cb-btn" onclick="CB.go(\'arena\')">🏟️ Arène</button></div>';
    } else {
      ctrl = '<div class="cb-summon-btns">' +
        '<button class="cb-btn cb-btn-main" onclick="CB.act(false)"' + (B.busy ? ' disabled' : '') + '>⚔️ Attaquer</button>' +
        '<button class="cb-btn cb-special" onclick="CB.act(true)"' + (B.busy || me.charge < 3 ? ' disabled' : '') + '>✨ ' + me.cr.mv + (me.charge < 3 ? ' (' + me.charge + '/3)' : '') + '</button>' +
        '<button class="cb-btn" onclick="CB.go(\'arena\')">🏳️ Abandonner</button></div>';
    }
    el.innerHTML = head() +
      '<div class="cb-panel cb-battle">' +
        '<div class="cb-brow"><span class="cb-mut">Toi</span><div class="cb-reserve">' + reserve(B.team, B.ti) + '</div></div>' +
        '<div class="cb-stage"><div class="cb-arena-field">' + fighterCard(me, 'me') + '<div class="cb-vs">VS</div>' + fighterCard(foe, 'foe') + '</div></div>' +
        '<div class="cb-brow"><span class="cb-mut">Adversaire (étage ' + G.stage + ')</span><div class="cb-reserve">' + reserve(B.enemy, B.ei) + '</div></div>' +
        '<div class="cb-log">' + log + '</div>' +
        ctrl +
      '</div>';
  }

  function render() {
    var el = document.getElementById('arene'); if (!el) return;
    syncTickets(); // G est déjà en mémoire (chargé au démarrage) ; on rafraîchit juste les tirages depuis l'XP
    if (G.view === 'battle' && B && !B.over) { renderBattle(); return; }
    if (G.view === 'battle') G.view = 'arena';
    if (G.view === 'collection') el.innerHTML = viewCollection();
    else if (G.view === 'arena') el.innerHTML = viewArena();
    else el.innerHTML = viewSummon();
  }
  CB.render = render;

  // Branche le rendu + le mode plein écran quand on ouvre l'onglet (sans casser les autres wrappers de showSection).
  if (typeof window.showSection === 'function') {
    var prev = window.showSection;
    window.showSection = function (a, b) {
      var r = prev.apply(this, arguments);
      try {
        var id = (typeof a === 'string') ? a : b;
        document.body.classList.toggle('arene-on', id === 'arene'); // masque l'UI de l'école hors Arène
        if (id === 'arene') { ensureCosmos(); render(); }
      } catch (e) {}
      return r;
    };
  }
  ensureCosmos();
  load();
})();
