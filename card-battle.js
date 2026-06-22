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
    { id: 'grenouille', n: 'Grenouille', e: '🐸', t: 'mer', r: 'commun', mv: 'Coup de langue' },
    { id: 'souris', n: 'Souris', e: '🐁', t: 'terre', r: 'commun', mv: 'Grignotage' },
    { id: 'abeille', n: 'Abeille', e: '🐝', t: 'ciel', r: 'commun', mv: 'Dard' },
    { id: 'loup', n: 'Loup', e: '🐺', t: 'terre', r: 'rare', mv: 'Hurlement' },
    { id: 'ours', n: 'Ours', e: '🐻', t: 'terre', r: 'rare', mv: 'Coup de patte' },
    { id: 'aigle', n: 'Aigle', e: '🦅', t: 'ciel', r: 'rare', mv: 'Piqué foudroyant' },
    { id: 'perroquet', n: 'Perroquet', e: '🦜', t: 'ciel', r: 'rare', mv: 'Cri perçant' },
    { id: 'requin', n: 'Requin', e: '🦈', t: 'mer', r: 'rare', mv: 'Frénésie' },
    { id: 'pieuvre', n: 'Pieuvre', e: '🐙', t: 'mer', r: 'rare', mv: 'Encre & tentacules' },
    { id: 'panthere', n: 'Panthère', e: '🐆', t: 'terre', r: 'rare', mv: 'Embuscade' },
    { id: 'scorpion', n: 'Scorpion', e: '🦂', t: 'terre', r: 'rare', mv: 'Dard venimeux' },
    { id: 'cygne', n: 'Cygne', e: '🦢', t: 'ciel', r: 'rare', mv: 'Coup d’aile' },
    { id: 'dauphin', n: 'Dauphin', e: '🐬', t: 'mer', r: 'rare', mv: 'Saut sonar' },
    { id: 'sanglier', n: 'Sanglier', e: '🐗', t: 'terre', r: 'rare', mv: 'Charge sauvage' },
    { id: 'mammouth', n: 'Mammouth', e: '🐘', t: 'ancien', r: 'epic', mv: 'Charge laineuse' },
    { id: 'dodo', n: 'Dodo', e: '🦃', t: 'ancien', r: 'epic', mv: 'Coup de bec massif' },
    { id: 'smilodon', n: 'Tigre à dents de sabre', e: '🐅', t: 'ancien', r: 'epic', mv: 'Crocs-sabre' },
    { id: 'rhino', n: 'Rhinocéros laineux', e: '🦏', t: 'ancien', r: 'epic', mv: 'Coup de corne' },
    { id: 'paresseux', n: 'Paresseux géant', e: '🦥', t: 'ancien', r: 'epic', mv: 'Griffes lentes' },
    { id: 'aurochs', n: 'Aurochs', e: '🐂', t: 'ancien', r: 'epic', mv: 'Charge cornue' },
    { id: 'megacero', n: 'Mégacéros', e: '🦌', t: 'ancien', r: 'epic', mv: 'Ramure perçante' },
    { id: 'trex', n: 'Tyrannosaure', e: '🦖', t: 'ancien', r: 'leg', mv: 'Méga-morsure' },
    { id: 'triceratops', n: 'Tricératops', e: '🦕', t: 'ancien', r: 'leg', mv: 'Triple charge' },
    { id: 'spino', n: 'Spinosaure', e: '🐊', t: 'mer', r: 'leg', mv: 'Croc des marais' },
    { id: 'megalodon', n: 'Mégalodon', e: '🦈', t: 'mer', r: 'leg', mv: 'Abysse' },
    { id: 'narval', n: 'Narval', e: '🐳', t: 'mer', r: 'leg', mv: 'Lance de glace' },
    { id: 'dragon', n: 'Dragon', e: '🐉', t: 'mythe', r: 'myth', mv: 'Souffle ardent' },
    { id: 'licorne', n: 'Licorne', e: '🦄', t: 'mythe', r: 'myth', mv: 'Corne céleste' },
    { id: 'kraken', n: 'Kraken', e: '🦑', t: 'mythe', r: 'myth', mv: 'Étreinte des abysses' },
    { id: 'golem', n: 'Golem de pierre', e: '🗿', t: 'mythe', r: 'myth', mv: 'Poing de roche' },
    { id: 'phenix', n: 'Phénix', e: '🔥', t: 'mythe', r: 'myth', mv: 'Flammes éternelles' }
  ];
  var BYID = {}; CREATURES.forEach(function (c) { BYID[c.id] = c; });

  var G = {};
  function load() {
    try { G = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { G = {}; }
    G.owned = G.owned || {}; G.team = G.team || []; G.tickets = G.tickets || 0;
    G.xpClaimed = G.xpClaimed || 0; G.dust = G.dust || 0; G.stage = G.stage || 1;
    G.bestStage = G.bestStage || 1; G.view = G.view || 'summon'; G.welcomed = G.welcomed || false;
    G.pityEpic = G.pityEpic || 0; // compteur de pitié (tirages depuis le dernier Épique+)
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify({ owned: G.owned, team: G.team, tickets: G.tickets, xpClaimed: G.xpClaimed, dust: G.dust, stage: G.stage, bestStage: G.bestStage, welcomed: G.welcomed, pityEpic: G.pityEpic })); } catch (e) {}
    // Sauvegarde aussi sur le compte (cloud) si connecté → la progression suit l'élève d'un appareil à l'autre.
    if (typeof cloudPushDebounced === 'function') { try { cloudPushDebounced(); } catch (e) {} }
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

  /* ---------------- GACHA (avec PITIÉ façon vrais gacha) ---------------- */
  var PITY_EPIC = 50; // Épique+ GARANTI au bout de 50 tirages sans Épique+
  // floorIdx : rareté minimale forcée (index dans RAR_ORDER) — pour la pitié et le garanti ×10
  function rollRarity(floorIdx) {
    var r = Math.random() * 100, acc = 0, res = 'commun';
    for (var i = 0; i < RAR_ORDER.length; i++) { acc += RAR[RAR_ORDER[i]].w; if (r < acc) { res = RAR_ORDER[i]; break; } }
    if (floorIdx != null && RAR_ORDER.indexOf(res) < floorIdx) res = RAR_ORDER[floorIdx];
    return res;
  }
  function pullOne(forceMin) {
    var floor = null;
    if (G.pityEpic >= PITY_EPIC - 1) floor = 2;            // pitié : Épique garanti
    if (forceMin != null && (floor == null || forceMin > floor)) floor = forceMin; // garanti ×10
    var rar = rollRarity(floor);
    if (RAR_ORDER.indexOf(rar) >= 2) G.pityEpic = 0; else G.pityEpic++; // reset si Épique+
    var pool = CREATURES.filter(function (c) { return c.r === rar; });
    var c = pool[Math.floor(Math.random() * pool.length)];
    var o = G.owned[c.id];
    var isNew = !o;
    if (isNew) { G.owned[c.id] = { count: 1, lvl: 1 }; }
    else { o.count++; if (o.lvl < 5) o.lvl++; G.dust += 5; } // doublon = +1 niveau (max 5) + 5 poussières
    return { c: c, isNew: isNew, lvl: G.owned[c.id].lvl };
  }
  window.CB = window.CB || {};

  /* ---------------- SONS (Web Audio, AUCUN fichier) + VIBRATIONS ----------------
     Tout est synthétisé à la volée → 0 octet à télécharger. Le contexte audio démarre
     au 1er clic (tirage/attaque) car les navigateurs l'exigent. Bouton muet 🔊/🔇. */
  var AC = null, muted = false, MASTER = null, REVERB = null;
  try { muted = localStorage.getItem('gr2_arene_mute') === '1'; } catch (e) {}
  function actx() {
    if (muted) return null;
    try { if (!AC) { AC = new (window.AudioContext || window.webkitAudioContext)(); MASTER = REVERB = null; } if (AC.state === 'suspended') AC.resume(); } catch (e) { AC = null; }
    return AC;
  }
  // Chaîne master construite UNE fois : compresseur (évite la saturation quand les couches s'empilent)
  // + une petite réverbération (impulsion générée une seule fois) pour donner de l'espace et de la profondeur.
  function bus() {
    var ac = actx(); if (!ac) return null;
    if (!MASTER) {
      var comp = ac.createDynamicsCompressor();
      try { comp.threshold.value = -16; comp.knee.value = 26; comp.ratio.value = 3.2; comp.attack.value = 0.003; comp.release.value = 0.25; } catch (e) {}
      comp.connect(ac.destination);
      MASTER = ac.createGain(); MASTER.gain.value = 0.85; MASTER.connect(comp);
      try { // réverb « algorithmique » : bruit qui décroît → impulsion de convolution (faite 1×, mise en cache)
        var len = Math.floor(ac.sampleRate * 1.0), ir = ac.createBuffer(2, len, ac.sampleRate);
        for (var ch = 0; ch < 2; ch++) { var d = ir.getChannelData(ch); for (var i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.8); }
        REVERB = ac.createConvolver(); REVERB.buffer = ir;
        var rg = ac.createGain(); rg.gain.value = 0.55; REVERB.connect(rg); rg.connect(MASTER);
      } catch (e) { REVERB = null; }
    }
    return MASTER;
  }
  // tone(... rev) : rev = quantité envoyée à la réverb (0..1). slideTo = glissando.
  function tone(freq, dur, type, vol, slideTo, when, rev) {
    var ac = actx(); if (!ac) return; var out = bus(); if (!out) return;
    var t0 = ac.currentTime + (when || 0), o = ac.createOscillator(), g = ac.createGain();
    o.type = type || 'sine'; o.frequency.setValueAtTime(freq, t0);
    if (slideTo) o.frequency.exponentialRampToValueAtTime(Math.max(1, slideTo), t0 + dur);
    g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(vol || 0.16, t0 + 0.012); g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g); g.connect(out);
    if (rev && REVERB) { var s = ac.createGain(); s.gain.value = rev; g.connect(s); s.connect(REVERB); }
    o.start(t0); o.stop(t0 + dur + 0.03);
  }
  var _noiseBuf = null, _noiseSr = 0;
  function noise(dur, vol, hp, when, rev) {
    var ac = actx(); if (!ac) return; var out = bus(); if (!out) return;
    if (!_noiseBuf || _noiseSr !== ac.sampleRate) { // bruit blanc généré UNE seule fois puis réutilisé (anti-lag : plus d'allocation par son)
      _noiseSr = ac.sampleRate; var n = ac.sampleRate; _noiseBuf = ac.createBuffer(1, n, n);
      var d = _noiseBuf.getChannelData(0); for (var i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
    }
    var t0 = ac.currentTime + (when || 0), src = ac.createBufferSource(); src.buffer = _noiseBuf;
    var g = ac.createGain(); g.gain.setValueAtTime(vol || 0.2, t0); g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur); // décroissance via enveloppe de gain
    if (hp) { var f = ac.createBiquadFilter(); f.type = 'highpass'; f.frequency.value = hp; src.connect(f); f.connect(g); } else src.connect(g);
    g.connect(out);
    if (rev && REVERB) { var s = ac.createGain(); s.gain.value = rev; g.connect(s); s.connect(REVERB); }
    src.start(t0); src.stop(t0 + dur + 0.05);
  }
  // petite cascade scintillante (cloches aiguës) pour les moments « waouh »
  function sparkle(base, when, n) { n = n || 4; for (var i = 0; i < n; i++) tone(base * (1 + i * 0.46), 0.18, 'triangle', 0.05, null, (when || 0) + i * 0.045, 0.5); }
  function vib(p) { try { if (!muted && navigator.vibrate) navigator.vibrate(p); } catch (e) {} }
  var SFX = {
    tap:     function () { tone(660, 0.04, 'triangle', 0.045); tone(990, 0.05, 'sine', 0.025, null, 0.012); },
    // souffle d'invocation : air filtré + nappe grave qui descend (un peu de réverb)
    whoosh:  function () { noise(0.42, 0.11, 520, 0, 0.3); tone(240, 0.4, 'sine', 0.06, 90, 0, 0.3); tone(360, 0.34, 'triangle', 0.04, 150, 0.03, 0.3); },
    // impact : transitoire claquant + corps grave (« boum ») + craquement
    hit:     function () { noise(0.10, 0.20, 1100, 0, 0.15); tone(190, 0.16, 'sine', 0.18, 55, 0, 0.2); tone(95, 0.18, 'sine', 0.12, 42); tone(440, 0.05, 'square', 0.07, 130); vib(15); },
    // critique : métallique brillant + zap descendant + corps + étincelle
    crit:    function () { noise(0.16, 0.28, 900, 0, 0.25); tone(1250, 0.18, 'sawtooth', 0.10, 320, 0, 0.3); tone(900, 0.2, 'square', 0.09, 180); tone(150, 0.24, 'sine', 0.14, 50, 0, 0.2); tone(1900, 0.22, 'triangle', 0.05, 700, 0.02, 0.4); vib([0, 28, 35, 28]); },
    // K.O. : grosse explosion grave avec longue traîne de réverb
    ko:      function () { tone(130, 0.6, 'sine', 0.22, 32, 0, 0.5); tone(72, 0.7, 'sine', 0.16, 26, 0, 0.5); noise(0.5, 0.22, 150, 0, 0.45); noise(0.22, 0.16, 2200, 0, 0.2); tone(300, 0.3, 'sawtooth', 0.10, 45, 0, 0.3); vib(60); },
    // ding montant selon la rareté (0=commun … 4=mythique) : VRAI accord (fondamentale + tierce + quinte + octave) + shimmer pour les hautes raretés
    reveal:  function (r) { var b = [392, 523, 659, 784, 988][r] || 392; [1, 1.26, 1.5].forEach(function (m, i) { tone(b * m, 0.6, 'sine', 0.12 - i * 0.02, null, i * 0.02, 0.45); }); tone(b * 2, 0.62, 'triangle', 0.06, null, 0.05, 0.45); if (r >= 3) { sparkle(b * 2, 0.12, 4); tone(b * 3, 0.7, 'triangle', 0.05, null, 0.18, 0.5); vib([0, 40, 30, 70]); } else if (r >= 2) { sparkle(b * 2, 0.1, 2); vib(30); } },
    // fanfare de victoire : arpège montant + accord tenu + scintillement
    win:     function () { [523, 659, 784, 1047].forEach(function (f, i) { tone(f, 0.3, 'triangle', 0.13, null, i * 0.1, 0.4); }); [523, 659, 784, 1047].forEach(function (f) { tone(f, 0.75, 'sine', 0.06, null, 0.45, 0.5); }); sparkle(1047, 0.5, 4); vib([0, 40, 30, 40, 30, 90]); },
    // défaite : descente un peu dissonante (oscillateurs désaccordés = « battement » triste) + drone grave
    lose:    function () { [392, 330, 262, 196].forEach(function (f, i) { tone(f, 0.5, 'sine', 0.10, null, i * 0.16, 0.4); tone(f * 1.006, 0.5, 'sine', 0.05, null, i * 0.16, 0.4); }); tone(98, 1.2, 'sine', 0.06, null, 0, 0.5); },
    // montée de niveau : cloches ascendantes + scintillement + résonance
    levelup: function () { [523, 659, 784, 1047, 1319].forEach(function (f, i) { tone(f, 0.3, 'triangle', 0.12, null, i * 0.07, 0.4); }); sparkle(1319, 0.34, 3); tone(1047, 0.8, 'sine', 0.06, null, 0.36, 0.5); vib(30); },
    // charge du coup spécial : montée de tension (sweep) + harmonique + souffle qui monte
    charge:  function () { tone(120, 0.6, 'sawtooth', 0.08, 620, 0, 0.3); tone(180, 0.6, 'square', 0.05, 740, 0.02, 0.3); noise(0.6, 0.05, 1400, 0, 0.2); },
    // avantage de type : petit « ping » lumineux ascendant
    adv:     function (good) { if (good) { tone(880, 0.12, 'triangle', 0.08, 1320, 0, 0.4); tone(1320, 0.16, 'sine', 0.05, null, 0.06, 0.4); } else { tone(330, 0.16, 'sine', 0.07, 247, 0, 0.3); } }
  };
  function sfx(n, a) { try { if (SFX[n]) SFX[n](a); } catch (e) {} }
  CB.toggleMute = function () { muted = !muted; try { localStorage.setItem('gr2_arene_mute', muted ? '1' : '0'); } catch (e) {} if (!muted) { AC = null; sfx('tap'); } render(); };

  CB.pull = function (n) {
    syncTickets();
    n = n || 1;
    if (G.tickets < n) { toast('Pas assez de tirages 🎟️ — gagne de l’XP (quiz, flashcards) !'); return; }
    G.tickets -= n;
    sfx('whoosh');
    var res = [], gotRare = false;
    for (var i = 0; i < n; i++) {
      var forceMin = (n >= 10 && i === n - 1 && !gotRare) ? 1 : null; // ×10 : au moins 1 Rare+ garanti
      var one = pullOne(forceMin);
      if (RAR_ORDER.indexOf(one.c.r) >= 1) gotRare = true;
      res.push(one);
    }
    save();
    showRevealOverlay(res);
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
    sfx('tap'); // démarre/réveille le moteur audio AVANT le combat (évite un à-coup au 1er coup)
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
      if (foe.hp <= 0) cbKo('foe', TM[foe.cr.t].c);
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
      if (me.hp <= 0) cbKo('me', TM[me.cr.t].c);
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
    save(); renderBattle(); sfx(win ? 'win' : 'lose');
    if (win) { cbConfetti(120, ['#16a34a', '#fde047', '#ffffff', '#60a5fa', '#f472b6']); var ar = document.getElementById('arene'); if (ar) playLottie(ar, 'victory', ar.clientWidth / 2, 200, 360); }
  }

  /* ---------------- ÉQUIPE / COLLECTION ---------------- */
  CB.team = function (id) {
    var i = G.team.indexOf(id);
    if (i >= 0) { G.team.splice(i, 1); }
    else { if (G.team.length >= 3) { toast('Équipe pleine (3 max) — retire-en une d’abord.'); return; } G.team.push(id); }
    save(); render();
  };
  CB.go = function (v) { sfx('tap'); G.view = v; save(); render(); };
  CB.closeReveal = function () { var ov = document.querySelector('.cb-reveal'); if (ov) { ov.classList.add('out'); setTimeout(function () { if (ov.parentNode) ov.remove(); }, 240); } render(); };
  CB.again = function (n) { CB.closeReveal(); setTimeout(function () { CB.pull(n); }, 280); }; // refaire un tirage depuis l'écran de révélation

  /* ---------------- FICHE CARTE DÉTAILLÉE (façon RPG) ---------------- */
  // petite description (lore) par créature — 100 % original
  var DESC = {
    renard: 'Rusé et vif, il piège ses proies par la malice plus que par la force.',
    lapin: 'De petits bonds si rapides qu’on le perd de vue.',
    herisson: 'Une boule de piquants : on l’attaque une fois, on le regrette.',
    canard: 'Tranquille sur l’eau, redoutable d’un coup de bec.',
    chouette: 'Vole sans le moindre bruit et frappe dans l’obscurité.',
    tortue: 'Sa carapace encaisse tout ; la patience est son arme.',
    crabe: 'Une pince capable de broyer une coquille d’un seul coup.',
    serpent: 'Frappe vite, injecte son venin, et disparaît.',
    loup: 'Seul ou en meute, son hurlement glace le sang.',
    ours: 'Une force brute : un coup de patte suffit.',
    aigle: 'Du haut du ciel, il fond sur sa cible à pleine vitesse.',
    perroquet: 'Son cri perçant déstabilise n’importe quel adversaire.',
    requin: 'Il sent une goutte de sang à des kilomètres.',
    pieuvre: 'Huit bras, un nuage d’encre, et une ruse redoutable.',
    panthere: 'Invisible jusqu’à la seconde où elle bondit.',
    mammouth: 'Un colosse de l’âge de glace, lent mais inarrêtable.',
    dodo: 'Disparu du monde réel… il revient pour prendre sa revanche.',
    smilodon: 'Ses crocs-sabres transpercent la plus dure des armures.',
    rhino: 'La charge d’un rhinocéros laineux ne se dévie pas.',
    paresseux: 'Lent en apparence ; ses griffes, elles, ne pardonnent pas.',
    trex: 'Le roi des prédateurs : une morsure, une fin.',
    triceratops: 'Trois cornes lancées comme un bélier vivant.',
    spino: 'Maître des marais, mi-terre mi-eau, toujours mortel.',
    megalodon: 'Le requin-titan des abysses, légende des océans.',
    dragon: 'Crache un souffle assez chaud pour fondre la pierre.',
    licorne: 'Sa corne céleste libère une lumière pure et dévastatrice.',
    kraken: 'Des tentacules capables d’engloutir un navire entier.',
    golem: 'Une montagne de roche animée par une magie ancienne.',
    grenouille: 'Sa langue jaillit plus vite que l’œil ne la suit.',
    souris: 'Minuscule, mais file partout et grignote sans relâche.',
    abeille: 'Un seul dard, mais qui fait reculer bien plus gros qu’elle.',
    scorpion: 'Sa queue se dresse, et la partie est déjà finie.',
    cygne: 'Élégant sur l’eau ; un coup d’aile peut briser un os.',
    dauphin: 'Vif et malin, il étourdit ses cibles de son sonar.',
    sanglier: 'Une charge têtue que rien n’arrête.',
    aurochs: 'L’ancêtre sauvage des bœufs, colossal et furieux.',
    megacero: 'Un cerf géant disparu, aux bois larges comme un arbre.',
    narval: 'La « licorne des mers » : sa défense transperce la glace.',
    phenix: 'Renaît de ses cendres, toujours plus ardent.'
  };
  CB.detail = function (id) {
    var c = BYID[id], o = G.owned[id]; if (!c || !o) return;
    sfx('tap');
    var s = stats(id, o.lvl), nx = o.lvl < 5 ? stats(id, o.lvl + 1) : null, cost = 30 * o.lvl, inTeam = G.team.indexOf(id) >= 0;
    var prev = document.querySelector('.cb-detail'); if (prev) prev.remove();
    var ov = document.createElement('div'); ov.className = 'cb-detail';
    var gold = (c.r === 'leg' || c.r === 'myth') ? ' goldname' : '';
    ov.innerHTML =
      '<div class="cb-detail-box cb-r-' + c.r + '" style="--rc:' + RAR[c.r].c + ';--tc:' + TM[c.t].c + '">' +
        '<button class="cb-detail-x" onclick="CB.closeDetail()" aria-label="Fermer">✕</button>' +
        '<div class="cb-detail-card">' + pwin(c) + '</div>' +
        '<div class="cb-detail-info">' +
          '<div class="cb-detail-name' + gold + '">' + esc(c.n) + '</div>' +
          '<div class="cb-stars cb-detail-stars">' + starStr(RAR[c.r].st) + ' <span class="cb-mut">' + RAR[c.r].n + '</span></div>' +
          '<div class="cb-detail-tags">' + tag(c.t) + '<span class="cb-detail-lvl">niv. ' + o.lvl + (o.lvl >= 5 ? ' · max' : '') + '</span><span class="cb-mut">×' + o.count + ' exemplaire' + (o.count > 1 ? 's' : '') + '</span></div>' +
          '<div class="cb-detail-stats">' +
            '<div class="cb-detail-stat"><span>❤️ PV</span><b>' + s.hp + (nx ? ' <i>→ ' + nx.hp + '</i>' : '') + '</b></div>' +
            '<div class="cb-detail-stat"><span>⚔️ Attaque</span><b>' + s.atk + (nx ? ' <i>→ ' + nx.atk + '</i>' : '') + '</b></div>' +
          '</div>' +
          '<div class="cb-detail-move">✨ <b>' + esc(c.mv) + '</b> <span class="cb-mut">· coup spécial</span></div>' +
          '<p class="cb-detail-desc">' + esc(DESC[id] || '') + '</p>' +
          '<div class="cb-detail-btns">' +
            (o.lvl < 5
              ? '<button class="cb-btn cb-btn-main" onclick="CB.levelUp(\'' + id + '\')">⬆️ Niveau (' + cost + ' ✨)</button>'
              : '<button class="cb-btn" disabled>Niveau max ✓</button>') +
            '<button class="cb-btn' + (inTeam ? ' on' : '') + '" onclick="CB.team(\'' + id + '\');CB.detail(\'' + id + '\')">' + (inTeam ? '✓ Équipe' : '+ Équipe') + '</button>' +
          '</div>' +
        '</div>' +
      '</div>';
    ov.addEventListener('click', function (e) { if (e.target === ov) CB.closeDetail(); });
    document.body.appendChild(ov);
  };
  CB.closeDetail = function () { var ov = document.querySelector('.cb-detail'); if (ov) { ov.classList.add('out'); setTimeout(function () { if (ov.parentNode) ov.remove(); }, 200); } };
  CB.levelUp = function (id) {
    var o = G.owned[id]; if (!o) return;
    if (o.lvl >= 5) { toast('Niveau max atteint (5).'); return; }
    var cost = 30 * o.lvl;
    if (G.dust < cost) { toast('Pas assez de poussières ✨ (' + cost + ' requis). Gagne-en avec les doublons et les combats.'); return; }
    G.dust -= cost; o.lvl++; sfx('levelup'); cbConfetti(36, [TM[BYID[id].t].c, '#ffffff', '#fbbf24']); save();
    CB.detail(id); // rouvre la fiche mise à jour
  };

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
  // bandeau « SUPER EFFICACE ! » / « Peu efficace… » selon l'avantage de type
  function cbAdvPopup(adv) {
    if (adv === 1) return;
    sfx('adv', adv > 1);
    var stage = document.querySelector('#arene .cb-stage'); if (!stage) return;
    var d = document.createElement('div'); d.className = 'cb-adv ' + (adv > 1 ? 'super' : 'weak');
    d.textContent = adv > 1 ? 'SUPER EFFICACE ! ×1.5' : 'Peu efficace… ×0.67';
    stage.appendChild(d); setTimeout(function () { d.remove(); }, 1100);
  }
  /* ---------------- MOTEUR D'EFFETS DE COMBAT ---------------- */
  // attaque SIGNATURE par animal (chaque créature joue son effet)
  // Couleur PROPRE de chaque créature (couleurs toutes distinctes). L'ANIMATION elle-même
  // (mise en scène unique par carte) est dans la table ATK plus bas → aucune carte n'a la même.
  var SIG = {
    renard: '#f97316', lapin: '#fde047', herisson: '#fbbf24', canard: '#facc15', chouette: '#cbd5e1',
    tortue: '#2dd4bf', crabe: '#22d3ee', serpent: '#a3e635', grenouille: '#4ade80', souris: '#d4d4d4', abeille: '#eab308',
    loup: '#93c5fd', ours: '#b45309', aigle: '#fcd34d', perroquet: '#f472b6', requin: '#0ea5e9', pieuvre: '#818cf8',
    panthere: '#a855f7', scorpion: '#84cc16', cygne: '#e0f2fe', dauphin: '#06b6d4', sanglier: '#f59e0b',
    mammouth: '#60a5fa', dodo: '#f87171', smilodon: '#f43f5e', rhino: '#94a3b8', paresseux: '#65a30d', aurochs: '#a16207', megacero: '#d97706',
    trex: '#ef4444', triceratops: '#fb923c', spino: '#16a34a', megalodon: '#0284c7', narval: '#67e8f9',
    dragon: '#ff7a1a', licorne: '#c4b5fd', kraken: '#6366f1', golem: '#d6d3d1', phenix: '#fb7185'
  };
  // mélange une couleur hex vers le blanc (facteur 0..1) → teinte d'accent claire
  function lighten(hex, f) {
    try { var n = parseInt(String(hex).slice(1), 16), r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
      r = Math.round(r + (255 - r) * f); g = Math.round(g + (255 - g) * f); b = Math.round(b + (255 - b) * f);
      return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1); } catch (e) { return hex; }
  }
  function prefersReduced() { try { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { return false; } }
  function mkFx(stage, cls) { var e = document.createElement('div'); e.className = cls; stage.appendChild(e); return e; }
  // centre d'un combattant en coordonnées RELATIVES au stage (= repère du canvas)
  function ctr(el) {
    var st = el.closest && el.closest('.cb-stage');
    if (!st) return { x: el.offsetLeft + el.offsetWidth / 2, y: el.offsetTop + el.offsetHeight * 0.42 };
    var er = el.getBoundingClientRect(), sr = st.getBoundingClientRect();
    return { x: er.left - sr.left + er.width / 2, y: er.top - sr.top + er.height * 0.42 };
  }
  function bottomY(el) { var st = el.closest && el.closest('.cb-stage'); if (!st) return el.offsetTop + el.offsetHeight; var er = el.getBoundingClientRect(), sr = st.getBoundingClientRect(); return er.bottom - sr.top; }

  /* ===== moteur de particules sur CANVAS (fusion additive = vraie lueur) ===== */
  var fxC = null, fxX = null, fxW = 0, fxH = 0, parts = [], raf = 0, lastT = 0;
  function fxEnsure(stage) {
    // Canvas d'effets en dpr=1 : les particules sont des halos additifs flous → identiques à l'œil,
    // mais 4× à 9× moins de pixels à effacer/dessiner par image sur un téléphone rétina → anti-lag majeur.
    var w = stage.clientWidth, h = stage.clientHeight, dpr = 1;
    if (!fxC || fxC.parentNode !== stage) { fxC = document.createElement('canvas'); fxC.className = 'cb-fxcanvas'; stage.appendChild(fxC); fxX = fxC.getContext('2d'); fxC._w = 0; }
    else { stage.appendChild(fxC); } // remet le canvas au-dessus (après le voile cinéma)
    fxW = w; fxH = h;
    if (fxC._w !== w || fxC._h !== h) { // redimensionnement (coûteux) SEULEMENT si la taille a changé
      fxC.width = Math.round(w * dpr); fxC.height = Math.round(h * dpr); fxC.style.width = w + 'px'; fxC.style.height = h + 'px';
      fxX.setTransform(dpr, 0, 0, dpr, 0, 0); fxC._w = w; fxC._h = h;
    }
  }
  function fxAdd(p) { if (parts.length > 260) return; parts.push(p); if (!raf) { lastT = performance.now(); raf = requestAnimationFrame(fxFrame); } } // plafond = anti-lag
  function fxFrame(now) {
    var t = Math.min(2.4, (now - lastT) / 16.67); lastT = now;
    if (!fxX) { raf = 0; return; }
    fxX.clearRect(0, 0, fxW, fxH); fxX.globalCompositeOperation = 'lighter'; fxX.lineCap = 'round'; fxX.shadowBlur = 0;
    for (var i = parts.length - 1; i >= 0; i--) {
      var p = parts[i]; p.life -= t; if (p.life <= 0) { parts.splice(i, 1); continue; }
      if (p.grav) p.vy += p.grav * t; if (p.drag) { var d = Math.pow(p.drag, t); p.vx *= d; p.vy *= d; }
      p.x += p.vx * t; p.y += p.vy * t; var k = p.life / p.max;
      fxX.globalAlpha = Math.max(0, Math.min(1, k));
      // shadowBlur (coûteux) UNIQUEMENT sur anneaux/faisceaux (peu nombreux) ; les centaines de points/étincelles n'en ont pas (la fusion additive suffit à les faire briller)
      if (p.kind === 'ring') { fxX.shadowBlur = p.glow || 14; fxX.shadowColor = p.color; p.r += p.vr * t; fxX.strokeStyle = p.color; fxX.lineWidth = p.size; fxX.beginPath(); fxX.arc(p.x, p.y, p.r, 0, 6.2832); fxX.stroke(); fxX.shadowBlur = 0; }
      else if (p.kind === 'beam') { fxX.shadowBlur = p.glow || 16; fxX.shadowColor = p.color; fxX.strokeStyle = p.color; fxX.lineWidth = p.size * (0.65 + 0.35 * Math.sin(p.life * 0.8)); fxX.beginPath(); fxX.moveTo(p.x, p.y); fxX.lineTo(p.bx, p.by); fxX.stroke(); fxX.shadowBlur = 0; }
      else if (p.kind === 'arc') { fxX.shadowBlur = p.glow || 12; fxX.shadowColor = p.color; if (p.spin) { p.a0 += p.spin * t; p.a1 += p.spin * t; } if (p.gr) p.r += p.gr * t; fxX.strokeStyle = p.color; fxX.lineWidth = p.size; fxX.beginPath(); fxX.arc(p.x, p.y, p.r, p.a0, p.a1); fxX.stroke(); fxX.shadowBlur = 0; }
      else if (p.streak) { fxX.strokeStyle = p.color; fxX.lineWidth = p.size; fxX.beginPath(); fxX.moveTo(p.x, p.y); fxX.lineTo(p.x - p.vx * p.streak, p.y - p.vy * p.streak); fxX.stroke(); }
      else { var sz = p.grow ? p.size * (2 - k) : (p.shrink ? p.size * k : p.size); fxX.fillStyle = p.color; fxX.beginPath(); fxX.arc(p.x, p.y, Math.max(0.5, sz), 0, 6.2832); fxX.fill(); }
    }
    fxX.globalAlpha = 1; fxX.globalCompositeOperation = 'source-over';
    raf = parts.length ? requestAnimationFrame(fxFrame) : 0;
  }
  function rnd(a, b) { return a + Math.random() * (b - a); }
  function fxBurst(x, y, color, n, power) { for (var i = 0; i < n; i++) { var a = rnd(0, 6.2832), s = power * rnd(0.3, 1.1); fxAdd({ x: x, y: y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, grav: 0.05, drag: 0.94, life: rnd(20, 40), max: 40, size: rnd(1.6, 3.6), color: color, glow: 16, shrink: true }); } }
  function fxStreaks(x, y, color, n, dir) { for (var i = 0; i < n; i++) { var a = dir + rnd(-0.5, 0.5), s = rnd(3, 8); fxAdd({ x: x, y: y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: rnd(10, 20), max: 20, size: rnd(2, 4), color: color, glow: 14, streak: rnd(4, 8), drag: 0.97 }); } }
  function fxRing(x, y, color, size) { fxAdd({ kind: 'ring', x: x, y: y, r: 6, vr: rnd(3.5, 4.6), size: size || 4, life: 26, max: 26, color: color, glow: 18 }); }
  function fxComet(a, b, dur, color, onArrive) {
    var t0 = performance.now();
    (function tick(now) {
      now = now || performance.now(); var k = Math.min(1, (now - t0) / dur);
      var x = a.x + (b.x - a.x) * k, y = a.y + (b.y - a.y) * k - Math.sin(k * Math.PI) * 24;
      for (var i = 0; i < 3; i++) fxAdd({ x: x + rnd(-3, 3), y: y + rnd(-3, 3), vx: rnd(-0.6, 0.6), vy: rnd(-0.6, 0.6), life: rnd(10, 18), max: 18, size: rnd(2, 4.5), color: color, glow: 16, shrink: true, drag: 0.95 });
      if (k < 1) requestAnimationFrame(tick); else if (onArrive) onArrive(x, y);
    })();
  }
  // ANTICIPATION : des particules convergent vers (x,y) → on « charge » l'attaque
  function fxCharge(x, y, color, n) {
    n = n || 12;
    for (var i = 0; i < n; i++) { var a = rnd(0, 6.2832), R = rnd(24, 46), life = rnd(16, 26); fxAdd({ x: x + Math.cos(a) * R, y: y + Math.sin(a) * R, vx: -Math.cos(a) * R / life * 1.15, vy: -Math.sin(a) * R / life * 1.15, life: life, max: life, size: rnd(1.6, 3.2), color: color, glow: 14, shrink: true }); }
  }
  // POP lumineux qui grandit puis s'efface (cœur d'impact)
  function fxFlash(x, y, color, size) { fxAdd({ x: x, y: y, vx: 0, vy: 0, life: 12, max: 12, size: size || 26, color: color || '#ffffff', grow: true }); }
  // ARC de lame (coup de griffe / mâchoire)
  function fxArc(x, y, r, ang, spread, color, size, spin) { fxAdd({ kind: 'arc', x: x, y: y, r: r, a0: ang - spread, a1: ang + spread, spin: spin || 0, gr: 0.7, size: size || 3.5, life: 16, max: 16, color: color, glow: 14 }); }
  // FLUX d'attaque épais : tête blanche brillante + traînée colorée (feu / eau / plongeon)
  function fxStream(a, b, dur, color, onArrive) {
    var t0 = performance.now();
    (function tick(now) {
      now = now || performance.now(); var k = Math.min(1, (now - t0) / dur);
      var x = a.x + (b.x - a.x) * k, y = a.y + (b.y - a.y) * k - Math.sin(k * Math.PI) * 16;
      fxAdd({ x: x, y: y, vx: 0, vy: 0, life: 8, max: 8, size: 5.5, color: '#ffffff', shrink: true });
      for (var i = 0; i < 4; i++) fxAdd({ x: x + rnd(-4, 4), y: y + rnd(-4, 4), vx: rnd(-1, 1), vy: rnd(-1, 1), life: rnd(12, 22), max: 22, size: rnd(2, 4.2), color: color, glow: 14, shrink: true, drag: 0.94 });
      if (k < 1) requestAnimationFrame(tick); else if (onArrive) onArrive(x, y);
    })();
  }
  // éclatement de particules quand un combattant tombe K.O.
  function cbKo(side, color) {
    sfx('ko');
    var el = document.querySelector('#arene .cb-fighter.' + side); if (!el || !el.closest('.cb-stage')) return;
    var c = ctr(el); fxBurst(c.x, c.y, color, 42, 7); fxBurst(c.x, c.y, '#ffffff', 22, 5); fxRing(c.x, c.y, color, 4);
  }
  /* ===== animations LOTTIE (effets « grand studio », optionnelles) =====
     Dépose les .json dans le dossier "lottie/" (voir lottie/_A_LIRE.txt).
     Si la librairie ou le fichier manque → repli SILENCIEUX sur les particules canvas. */
  var LOTTIE = {
    explosion: 'lottie/explosion.json', // impact d'attaque spéciale
    summon:    'lottie/summon.json',    // révélation d'invocation (rareté élevée)
    victory:   'lottie/victory.json'    // victoire de combat
  };
  var lottieMiss = {};
  function playLottie(container, key, cx, cy, size, loop) {
    try {
      if (typeof lottie === 'undefined' || !container || lottieMiss[key] || !LOTTIE[key]) return false;
      // on récupère le JSON via fetch : un 404 est SILENCIEUX (pas d'erreur console) → repli propre sur le canvas
      fetch(LOTTIE[key]).then(function (r) { if (!r.ok) throw 0; return r.json(); }).then(function (data) {
        var box = document.createElement('div'); box.className = 'cb-lottie';
        size = size || 180; box.style.width = size + 'px'; box.style.height = size + 'px';
        box.style.left = (cx - size / 2) + 'px'; box.style.top = (cy - size / 2) + 'px';
        container.appendChild(box);
        var anim = lottie.loadAnimation({ container: box, renderer: 'canvas', loop: !!loop, autoplay: true, animationData: data }); // canvas = plus léger que svg
        var kill = function () { try { anim.destroy(); } catch (e) {} if (box.parentNode) box.remove(); };
        anim.addEventListener('complete', kill); if (loop) setTimeout(kill, 2600);
      }).catch(function () { lottieMiss[key] = 1; }); // fichier absent → on n'insiste plus
      return true;
    } catch (e) { return false; }
  }
  // effet SIGNATURE par catégorie d'attaque : CHARGE (anticipation) → TRAJET → IMPACT + traînée.
  // 100 % particules canvas. shadowBlur réservé aux anneaux/faisceaux/arcs (peu nombreux) → fluide.
  // ---- briques d'impact réutilisables (chaque créature les COMBINE différemment → animation unique) ----
  function _radial(x, y, c, n) { for (var i = 0; i < n; i++) fxStreaks(x, y, c, 1, (i / n) * 6.2832); }
  function _spark(x, y, c, n) { for (var i = 0; i < n; i++) fxAdd({ x: x + rnd(-22, 22), y: y + rnd(-22, 22), vx: rnd(-0.3, 0.3), vy: rnd(-0.3, 0.3), life: rnd(20, 46), max: 46, size: rnd(1, 2.4), color: c, glow: 14, shrink: true }); }
  function _nova(x, y, c, l) { fxFlash(x, y, '#ffffff', 36); fxBurst(x, y, l, 40, 6); fxBurst(x, y, c, 22, 4); fxRing(x, y, c, 5); }
  function _pop(x, y, c, l) { fxFlash(x, y, '#ffffff', 24); fxBurst(x, y, l, 22, 5); }
  function _pierce(x, y, c, l) { fxFlash(x, y, '#ffffff', 22); fxBurst(x, y, l, 18, 8); fxStreaks(x, y, c, 4, 0); fxStreaks(x, y, c, 4, 1.57); fxRing(x, y, c, 2); }
  function _shards(x, y, c, l) { fxFlash(x, y, '#ffffff', 26); _radial(x, y, c, 9); fxBurst(x, y, l, 16, 5); }
  function _jaws(x, y, c) { fxArc(x, y, 30, -0.5, 1.0, '#ffffff', 4.5, 0.05); fxArc(x, y, 30, Math.PI - 0.5, 1.0, c, 4.5, -0.05); setTimeout(function () { fxFlash(x, y, '#ffffff', 30); fxBurst(x, y, '#ffffff', 20, 6); fxBurst(x, y, c, 16, 4); }, 150); }
  function _claws(x, y, c, n) { for (var s = 0; s < (n || 3); s++) (function (s) { setTimeout(function () { var ang = s % 2 ? 0.8 : -0.8; fxArc(x + rnd(-8, 8), y + rnd(-8, 8), rnd(20, 30), ang, 0.7, '#ffffff', 3.5); fxStreaks(x, y, c, 5, ang); }, s * 90); })(s); }
  function _rings(x, y, c, l, n) { for (var j = 0; j < (n || 3); j++) (function (j) { setTimeout(function () { fxRing(x, y, j ? l : c, 4); }, j * 100); })(j); fxFlash(x, y, '#ffffff', 24); fxBurst(x, y, l, 20, 5); }
  function _quake(x, gy, c, n) { fxFlash(x, gy, '#ffffff', 26); fxRing(x, gy, c, 6); fxRing(x, gy, '#ffffff', 2); setTimeout(function () { fxRing(x, gy, c, 3); }, 110); for (var i = 0; i < (n || 22); i++) { var an = rnd(-2.5, -0.6); fxAdd({ x: x + rnd(-26, 26), y: gy, vx: Math.cos(an) * rnd(2, 6), vy: Math.sin(an) * rnd(3, 7), grav: 0.18, life: rnd(22, 38), max: 38, size: rnd(2, 4.5), color: c, glow: 12, shrink: true }); } }
  function _embers(x, y, c) { for (var i = 0; i < 12; i++) fxAdd({ x: x + rnd(-14, 14), y: y, vx: rnd(-1, 1), vy: rnd(-3.2, -1.1), grav: 0.03, life: rnd(30, 50), max: 50, size: rnd(1.4, 3), color: c, glow: 12, shrink: true }); }
  function _drops(x, y, c) { for (var i = 0; i < 14; i++) fxAdd({ x: x, y: y, vx: rnd(-4, 4), vy: rnd(-5, -1), grav: 0.22, life: rnd(24, 40), max: 40, size: rnd(1.6, 3.4), color: c, glow: 10, shrink: true }); }
  function _bubbles(x, y, c) { for (var i = 0; i < 12; i++) fxAdd({ x: x + rnd(-18, 18), y: y, vx: rnd(-0.6, 0.6), vy: rnd(-1.4, -0.5), life: rnd(40, 64), max: 64, size: rnd(2, 4), color: c, glow: 10, shrink: true }); }
  function _cloud(x, y, c, l) { fxFlash(x, y, l, 20); for (var i = 0; i < 20; i++) fxAdd({ x: x, y: y, vx: rnd(-3, 3), vy: rnd(-3, 3), grav: 0.02, life: rnd(40, 70), max: 70, size: rnd(3, 6), color: i % 3 ? c : l, glow: 8, shrink: true }); fxRing(x, y, c, 3); }
  function _swirl(x, y, c, l) { fxArc(x, y, 26, 0, 1.5, c, 3, 0.16); fxArc(x, y, 26, Math.PI, 1.5, l, 3, 0.16); for (var i = 0; i < 14; i++) { var an = rnd(0, 6.2832); fxAdd({ x: x, y: y, vx: Math.cos(an) * rnd(2, 5), vy: Math.sin(an) * rnd(2, 5), life: rnd(18, 30), max: 30, size: rnd(1.4, 3), color: '#ffffff', glow: 8, shrink: true }); } fxFlash(x, y, '#ffffff', 22); }
  function _top(p) { return { x: p.x, y: Math.max(6, p.y - 78) }; }
  function _zig(a, b, dur, c, cb) { var m1 = { x: a.x + (b.x - a.x) * 0.4, y: a.y + rnd(-26, -8) }, m2 = { x: a.x + (b.x - a.x) * 0.7, y: a.y + rnd(8, 26) }; fxStream(a, m1, dur * 0.34, c, function () { fxStream(m1, m2, dur * 0.33, c, function () { fxStream(m2, b, dur * 0.33, c, cb); }); }); }

  // ATK : la mise en scène UNIQUE de chaque carte (a=attaquant, b=cible, d=élément cible, c=couleur, l=accent clair)
  var ATK = {
    renard: function (a, b, d, c, l) { _claws(b.x, b.y, c, 2); setTimeout(function () { _jaws(b.x, b.y, c); }, 130); },
    lapin: function (a, b, d, c, l) { fxStreaks(a.x, a.y, l, 6, -1.4); fxStream(a, b, 220, c, function (x, y) { _pop(x, y, c, l); fxStreaks(x, y, l, 6, -1.57); }); },
    herisson: function (a, b, d, c, l) { fxCharge(a.x, a.y, c, 8); setTimeout(function () { fxComet(a, b, 300, c, function (x, y) { fxFlash(x, y, '#ffffff', 26); _radial(x, y, c, 12); fxBurst(x, y, l, 16, 4); }); }, 120); },
    canard: function (a, b, d, c, l) { fxStream(a, b, 200, c, function (x, y) { _pierce(x, y, c, l); }); },
    chouette: function (a, b, d, c, l) { var t = _top(a); fxStreaks(a.x, a.y, l, 6, -1.2); setTimeout(function () { fxStream(t, b, 320, c, function (x, y) { _swirl(x, y, c, l); for (var i = 0; i < 10; i++) fxAdd({ x: x + rnd(-16, 16), y: y, vx: rnd(-0.5, 0.5), vy: rnd(0.4, 1.4), life: rnd(30, 50), max: 50, size: rnd(1.6, 3), color: l, glow: 8, shrink: true }); }); }, 120); },
    tortue: function (a, b, d, c, l) { var gy = bottomY(d) - 8; fxComet({ x: a.x, y: gy - 10 }, { x: b.x, y: gy - 10 }, 320, c, function (x, y) { _quake(b.x, gy, c, 16); fxRing(x, y - 6, l, 3); }); },
    crabe: function (a, b, d, c, l) { fxArc(b.x, b.y, 28, 0, 0.9, '#ffffff', 4.5, 0.06); fxArc(b.x, b.y, 28, Math.PI, 0.9, c, 4.5, -0.06); setTimeout(function () { _pop(b.x, b.y, c, l); }, 150); },
    serpent: function (a, b, d, c, l) { _zig(a, b, 360, c, function (x, y) { fxFlash(x, y, l, 22); fxBurst(x, y, c, 18, 4); _bubbles(x, y, l); }); },
    grenouille: function (a, b, d, c, l) { fxAdd({ kind: 'beam', x: a.x, y: a.y, bx: b.x, by: b.y, size: 4, life: 12, max: 12, color: l, glow: 14 }); setTimeout(function () { _pop(b.x, b.y, c, l); }, 130); },
    souris: function (a, b, d, c, l) { for (var s = 0; s < 4; s++) (function (s) { setTimeout(function () { fxBurst(b.x + rnd(-12, 12), b.y + rnd(-12, 12), c, 8, 4); fxFlash(b.x + rnd(-10, 10), b.y + rnd(-10, 10), '#ffffff', 14); }, s * 90); })(s); },
    abeille: function (a, b, d, c, l) { _zig(a, b, 300, c, function (x, y) { _pierce(x, y, c, l); }); },
    loup: function (a, b, d, c, l) { for (var i = 0; i < 3; i++) (function (i) { setTimeout(function () { fxRing(a.x, a.y, c, 3); }, i * 110); })(i); setTimeout(function () { _rings(b.x, b.y, c, l, 3); }, 240); },
    ours: function (a, b, d, c, l) { fxArc(b.x, b.y, 36, -0.4, 1.2, '#ffffff', 5, 0.04); setTimeout(function () { _nova(b.x, b.y, c, l); _quake(b.x, bottomY(d) - 8, c, 14); }, 150); },
    aigle: function (a, b, d, c, l) { var t = { x: a.x, y: 6 }; fxStreaks(a.x, a.y, l, 8, -1.57); setTimeout(function () { fxStream(t, b, 260, c, function (x, y) { _nova(x, y, c, l); }); }, 120); },
    perroquet: function (a, b, d, c, l) { _rings(b.x, b.y, c, l, 3); setTimeout(function () { fxBurst(b.x, b.y, '#fef08a', 14, 5); fxBurst(b.x, b.y, c, 14, 4); }, 160); },
    requin: function (a, b, d, c, l) { fxStream(a, b, 240, c, function (x, y) { _jaws(x, y, c); }); setTimeout(function () { _jaws(b.x, b.y, c); }, 380); },
    pieuvre: function (a, b, d, c, l) { fxCharge(a.x, a.y, c, 8); setTimeout(function () { fxStream(a, b, 320, c, function (x, y) { _cloud(x, y, c, l); for (var k = 0; k < 4; k++) fxArc(x, y, 22 + k * 4, k * 1.6, 0.7, l, 2.5, 0.1); }); }, 130); },
    panthere: function (a, b, d, c, l) { fxStreaks(a.x, a.y, l, 6, 0); setTimeout(function () { _claws(b.x, b.y, c, 3); fxFlash(b.x, b.y, '#ffffff', 22); }, 110); },
    scorpion: function (a, b, d, c, l) { var t = { x: b.x, y: Math.max(6, b.y - 70) }; setTimeout(function () { fxStream(t, b, 240, c, function (x, y) { _pierce(x, y, c, l); _bubbles(x, y, l); }); }, 120); },
    cygne: function (a, b, d, c, l) { fxArc(b.x, b.y, 32, -0.2, 1.4, '#ffffff', 4, 0.14); fxArc(b.x, b.y, 32, Math.PI - 0.2, 1.4, l, 4, 0.14); setTimeout(function () { _swirl(b.x, b.y, c, l); }, 130); },
    dauphin: function (a, b, d, c, l) { var t = _top(a); fxStream(a, t, 140, c, function () { fxStream(t, b, 220, c, function (x, y) { _rings(x, y, c, l, 3); }); }); },
    sanglier: function (a, b, d, c, l) { var gy = bottomY(d) - 8; fxComet({ x: a.x, y: gy - 12 }, { x: b.x, y: gy - 12 }, 240, c, function (x, y) { _quake(b.x, gy, c, 22); fxFlash(x, y, '#ffffff', 24); }); },
    mammouth: function (a, b, d, c, l) { var gy = bottomY(d) - 8; fxFlash(b.x, gy, '#ffffff', 30); fxRing(b.x, gy, c, 7); setTimeout(function () { fxRing(b.x, gy, l, 5); }, 120); setTimeout(function () { fxRing(b.x, gy, c, 4); }, 240); _quake(b.x, gy, c, 28); },
    dodo: function (a, b, d, c, l) { var t = _top(a); setTimeout(function () { fxStream(t, b, 240, c, function (x, y) { _nova(x, y, c, l); fxStreaks(x, y, c, 6, 1.57); }); }, 120); },
    smilodon: function (a, b, d, c, l) { fxArc(b.x, b.y, 34, -0.7, 0.5, '#ffffff', 5, 0); fxArc(b.x, b.y, 34, 2.4, 0.5, c, 5, 0); setTimeout(function () { _shards(b.x, b.y, c, l); }, 150); },
    rhino: function (a, b, d, c, l) { var gy = bottomY(d) - 10; fxStream({ x: a.x, y: gy }, { x: b.x, y: gy }, 220, c, function (x, y) { _pierce(x, y, c, l); fxRing(x, y, c, 4); }); },
    paresseux: function (a, b, d, c, l) { for (var s = 0; s < 3; s++) (function (s) { setTimeout(function () { fxArc(b.x + rnd(-6, 6), b.y + rnd(-6, 6), rnd(26, 36), s % 2 ? 0.7 : -0.7, 0.8, '#ffffff', 4.5); fxStreaks(b.x, b.y, c, 6, s % 2 ? 0.7 : -0.7); }, s * 150); })(s); setTimeout(function () { _pop(b.x, b.y, c, l); }, 480); },
    aurochs: function (a, b, d, c, l) { var gy = bottomY(d) - 8; fxComet({ x: a.x, y: gy - 10 }, { x: b.x, y: gy - 10 }, 240, c, function (x, y) { fxRing(b.x, gy, c, 6); fxRing(b.x, gy, l, 4); _quake(b.x, gy, c, 18); }); },
    megacero: function (a, b, d, c, l) { fxCharge(a.x, a.y, c, 8); setTimeout(function () { for (var k = -2; k <= 2; k++) (function (k) { fxStream(a, { x: b.x, y: b.y + k * 14 }, 240, c, function (x, y) { fxBurst(x, y, l, 8, 5); }); })(k); setTimeout(function () { _shards(b.x, b.y, c, l); }, 260); }, 120); },
    trex: function (a, b, d, c, l) { fxArc(b.x, b.y, 40, -0.6, 1.1, '#ffffff', 6, 0.05); fxArc(b.x, b.y, 40, Math.PI - 0.6, 1.1, c, 6, -0.05); setTimeout(function () { _nova(b.x, b.y, c, l); _quake(b.x, bottomY(d) - 8, c, 16); }, 170); },
    triceratops: function (a, b, d, c, l) { var gy = bottomY(d) - 10; for (var s = 0; s < 3; s++) (function (s) { setTimeout(function () { fxStream({ x: a.x, y: gy }, { x: b.x, y: gy }, 200, c, function (x, y) { _pierce(x, y, c, l); }); }, s * 160); })(s); },
    spino: function (a, b, d, c, l) { fxStream(a, b, 300, c, function (x, y) { _drops(x, y, l); _jaws(x, y, c); fxRing(x, y, c, 4); }); },
    megalodon: function (a, b, d, c, l) { fxCharge(a.x, a.y, c, 12); setTimeout(function () { fxStream(a, b, 340, c, function (x, y) { for (var k = 0; k < 4; k++) fxArc(x, y, 18 + k * 6, k * 1.6, 0.8, l, 3, 0.12); _jaws(x, y, c); _drops(x, y, l); }); }, 150); },
    narval: function (a, b, d, c, l) { fxCharge(a.x, a.y, c, 10); setTimeout(function () { fxAdd({ kind: 'beam', x: a.x, y: a.y, bx: b.x, by: b.y, size: 9, life: 16, max: 16, color: c, glow: 22 }); fxAdd({ kind: 'beam', x: a.x, y: a.y, bx: b.x, by: b.y, size: 3, life: 16, max: 16, color: '#ffffff', glow: 14 }); setTimeout(function () { _shards(b.x, b.y, c, l); _drops(b.x, b.y, l); }, 150); }, 170); },
    dragon: function (a, b, d, c, l) { fxCharge(a.x, a.y, c, 16); setTimeout(function () { for (var k = -1; k <= 1; k++) (function (k) { fxStream(a, { x: b.x, y: b.y + k * 16 }, 360, c, function (x, y) { fxFlash(x, y, '#fff4e0', 30); fxBurst(x, y, l, 24, 6); }); })(k); setTimeout(function () { _nova(b.x, b.y, c, l); _embers(b.x, b.y, l); }, 380); }, 180); },
    licorne: function (a, b, d, c, l) { var t = { x: b.x, y: 6 }; fxCharge(b.x, 30, l, 10); setTimeout(function () { fxAdd({ kind: 'beam', x: t.x, y: t.y, bx: b.x, by: b.y, size: 11, life: 20, max: 20, color: c, glow: 26 }); fxAdd({ kind: 'beam', x: t.x, y: t.y, bx: b.x, by: b.y, size: 4, life: 20, max: 20, color: '#ffffff', glow: 16 }); setTimeout(function () { _nova(b.x, b.y, c, l); _radial(b.x, b.y, '#ffffff', 8); _spark(b.x, b.y, l, 14); }, 150); }, 200); },
    kraken: function (a, b, d, c, l) { var gy = bottomY(d) - 6; for (var k = 0; k < 5; k++) (function (k) { setTimeout(function () { var off = (k - 2) * 18; fxArc(b.x + off, gy - 30, 34, -1.57, 1.0, c, 3.5, k % 2 ? 0.1 : -0.1); }, k * 70); })(k); setTimeout(function () { _cloud(b.x, b.y, c, l); _nova(b.x, b.y, c, l); }, 380); },
    golem: function (a, b, d, c, l) { var t = _top(b); fxCharge(t.x, t.y, c, 10); setTimeout(function () { fxStream(t, b, 220, c, function (x, y) { var gy = bottomY(d) - 8; fxFlash(b.x, gy, '#ffffff', 34); fxRing(b.x, gy, c, 8); fxRing(b.x, gy, '#ffffff', 3); _quake(b.x, gy, c, 30); }); }, 160); },
    phenix: function (a, b, d, c, l) { var gy = bottomY(d) - 8; fxCharge(b.x, gy, c, 12); setTimeout(function () { for (var i = 0; i < 26; i++) fxAdd({ x: b.x + rnd(-16, 16), y: gy, vx: rnd(-1.2, 1.2), vy: rnd(-7, -3), grav: 0.06, life: rnd(34, 60), max: 60, size: rnd(2, 4.4), color: i % 2 ? c : l, glow: 14, shrink: true }); fxFlash(b.x, b.y, '#fff4e0', 32); fxRing(b.x, b.y, c, 6); setTimeout(function () { fxRing(b.x, b.y, l, 4); }, 130); fxBurst(b.x, b.y, l, 28, 5); }, 160); }
  };
  // répartiteur : joue la mise en scène propre à la créature (id). col = sa couleur.
  function signatureFx(stage, atkEl, defEl, side, id, col) {
    var a = ctr(atkEl), b = ctr(defEl), l = lighten(col, 0.5);
    var fn = ATK[id] || function (a, b, d, cc, ll) { _nova(b.x, b.y, cc, ll); };
    try { fn(a, b, defEl, col, l); } catch (e) {}
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
    el.classList.add('cb-hphit'); setTimeout(function () { el.classList.remove('cb-hphit'); }, 320);
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
    var tc = TM[me.cr.t].c, col = SIG[me.cr.id] || tc, adv = typeMult(me.cr.t, foe.cr.t);
    if (prefersReduced() || !stage || !atkEl || !defEl) { if (onImpact) onImpact(); cbAdvPopup(adv); setTimeout(function () { if (onDone) onDone(); }, 140); return; }
    var field = stage.querySelector('.cb-arena-field');
    if (special) {
      var cine = mkFx(stage, 'cb-cinema'); fxEnsure(stage); if (field) field.classList.add('cb-zoom');
      atkEl.style.setProperty('--tc', tc); atkEl.classList.add('cb-cast');
      var banner = bannerEl(stage, me.cr, tc);
      sfx('charge'); // anticipation : on « charge » le coup
      setTimeout(function () { signatureFx(stage, atkEl, defEl, side, me.cr.id, col); }, 360);
      setTimeout(function () {
        if (onImpact) onImpact();
        sfx('crit'); cbAdvPopup(adv);
        var bp = ctr(defEl);
        fxBurst(bp.x, bp.y, '#ffffff', 16, 5); // l'effet SIGNATURE gère le gros de l'impact ; ce flash blanc le « cale »
        var fl = mkFx(stage, 'cb-impact-flash'); setTimeout(function () { fl.remove(); }, 300);
        stage.classList.add('cb-quake'); setTimeout(function () { stage.classList.remove('cb-quake'); }, 520);
        defEl.classList.add('cb-hurt-big'); cbFloat(defEl, '-' + dmg, 'crit');
      }, 880);
      setTimeout(function () { atkEl.classList.remove('cb-cast'); defEl.classList.remove('cb-hurt-big'); if (field) field.classList.remove('cb-zoom'); cine.remove(); banner.remove(); if (onDone) onDone(); }, 1400);
    } else {
      var lc = side === 'me' ? 'cb-lunge-r' : 'cb-lunge-l'; atkEl.classList.add(lc);
      fxEnsure(stage); var a = ctr(atkEl), b = ctr(defEl);
      fxComet(a, b, 300, col, function (x, y) { fxBurst(x, y, col, 14, 4); });
      setTimeout(function () { if (onImpact) onImpact(); sfx('hit'); cbAdvPopup(adv); defEl.classList.add('cb-hurt'); var bp = ctr(defEl); fxBurst(bp.x, bp.y, '#ffffff', 12, 4); cbFloat(defEl, '-' + dmg, ''); }, 320);
      setTimeout(function () { atkEl.classList.remove(lc); defEl.classList.remove('cb-hurt'); if (onDone) onDone(); }, 620);
    }
  }
  function bar(cur, max, col) {
    var p = Math.max(0, Math.round(cur / max * 100));
    return '<div class="cb-hpbar"><span style="width:' + p + '%;background:' + col + '"></span></div>';
  }
  function tag(t) { return '<span class="cb-type cb-t-' + t + '">' + TM[t].e + ' ' + TM[t].n + '</span>'; }
  function chargePips(c) { var s = ''; for (var i = 0; i < 3; i++) s += '<i class="cb-pip' + (i < c ? ' on' : '') + '"></i>'; return s; } // jauge du coup spécial

  function head() {
    return '<div class="cb-head">' +
      '<button class="cb-quit" onclick="showSection(\'synthese\')" title="Revenir à l’étude">← Quitter</button>' +
      '<div class="cb-bal"><span title="Tirages">🎟️ <b>' + G.tickets + '</b></span><span title="Poussières (doublons)">✨ <b>' + G.dust + '</b></span><span title="Étage d’arène">🏟️ <b>' + G.stage + '</b></span>' +
        '<button class="cb-bal-btn" onclick="CB.toggleMute()" title="' + (muted ? 'Activer le son' : 'Couper le son') + '" aria-label="Son">' + (muted ? '🔇' : '🔊') + '</button></div>' +
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
        '<div class="cb-pity"><span class="cb-mut">✨ Épique+ <b>garanti</b> dans <b style="color:var(--g-vio)">' + Math.max(0, PITY_EPIC - G.pityEpic) + '</b> tirage' + (Math.max(0, PITY_EPIC - G.pityEpic) > 1 ? 's' : '') + '</span>' +
          '<div class="cb-pity-bar"><span style="width:' + Math.min(100, Math.round(G.pityEpic / PITY_EPIC * 100)) + '%"></span></div>' +
          '<span class="cb-mut" style="font-size:11.5px">Tirage ×10 : au moins 1 Rare garanti 🔵</span></div>' +
        '<div class="cb-rates">' + rates + '</div>' +
        '<div id="cb-pullzone"></div>' +
      '</div>';
  }

  // RÉVÉLATION PLEIN ÉCRAN : suspense (orbe + rayons couleur de la meilleure rareté) puis cartes qui se retournent
  function showRevealOverlay(res) {
    var best = res.reduce(function (m, r) { return Math.max(m, RAR_ORDER.indexOf(r.c.r)); }, 0);
    var bc = RAR[RAR_ORDER[best]].c;
    var ov = document.createElement('div'); ov.className = 'cb-reveal'; ov.style.setProperty('--bc', bc);
    ov.innerHTML = '<div class="cb-reveal-orb"><span class="cb-reveal-rays"></span></div>';
    ov.addEventListener('click', function (e) { if (e.target === ov) CB.closeReveal(); });
    document.body.appendChild(ov);
    setTimeout(function () {
      var cards = res.map(function (r, i) {
        var rr = r.c.r, gold = (rr === 'leg' || rr === 'myth') ? ' goldname' : '';
        return '<div class="cb-rcard cb-r-' + rr + '" style="--rc:' + RAR[rr].c + '; --tc:' + TM[r.c.t].c + '; animation-delay:' + (i * 0.1).toFixed(2) + 's">' +
          '<div class="cb-rcard-in"><div class="cb-pshine"></div>' + pwin(r.c) +
          '<div class="cb-pplate"><div class="cb-pname' + gold + '">' + esc(r.c.n) + '</div>' +
          '<div class="cb-stars">' + starStr(RAR[rr].st) + '</div>' +
          (r.isNew ? '<div class="cb-pnew">NOUVEAU !</div>' : '<div class="cb-pdup">niv. ' + r.lvl + '</div>') +
          '</div></div></div>';
      }).join('');
      ov.innerHTML = '<div class="cb-reveal-head">' + (res.length > 1 ? '✨ ' + res.length + ' invocations !' : '✨ Invocation !') + '</div>' +
        '<div class="cb-reveal-cards">' + cards + '</div>' +
        '<div class="cb-reveal-btns"><button class="cb-btn" onclick="CB.again(10)">🎟️ Refaire ×10</button><button class="cb-btn cb-btn-main" onclick="CB.closeReveal()">Continuer ▶</button></div>';
      sfx('reveal', best);
      if (best >= 2) cbConfetti(best >= 4 ? 150 : best >= 3 ? 95 : 55, [bc, '#ffffff', '#fde047']);
      if (best >= 3) playLottie(ov, 'summon', (window.innerWidth / 2), (window.innerHeight * 0.4), 380);
    }, 720);
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
      if (!o) return '<div class="cb-cell cb-r-' + c.r + ' locked" style="--rc:' + RAR[c.r].c + '; --tc:' + TM[c.t].c + '">' + pwin(c) + '<div class="cb-cplate"><div class="cb-clk">❓ ???</div><div class="cb-stars">' + starStr(RAR[c.r].st) + '</div></div></div>';
      var inTeam = G.team.indexOf(c.id) >= 0;
      var s = stats(c.id, o.lvl);
      return '<div class="cb-cell cb-r-' + c.r + '" style="--rc:' + RAR[c.r].c + '; --tc:' + TM[c.t].c + '">' +
        '<button class="cb-cell-art" onclick="CB.detail(\'' + c.id + '\')" aria-label="Voir la fiche de ' + esc(c.n) + '">' + pwin(c) + '<span class="cb-cell-zoom">🔍</span></button>' +
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
    var team = ids.length ? ids.map(function (id) {
      var c = BYID[id];
      return '<div class="cb-tcard" style="--rc:' + RAR[c.r].c + '; --tc:' + TM[c.t].c + '"><span class="cb-emoji">' + c.e + '</span><span class="cb-tname">' + esc(c.n) + '</span><span class="cb-stars">' + starStr(RAR[c.r].st) + '</span></div>';
    }).join('') : '<span class="cb-mut">Aucune équipe — va dans 📒 Collection pour en composer une.</span>';
    var cyc = TYPES.map(function (t) { return tag(t); }).join('<span class="cb-cyc-arrow">›</span>');
    return head() +
      '<div class="cb-panel cb-arena">' +
        '<div class="cb-hero">' +
          '<div class="cb-hero-label">⚔ ARÈNE ⚔</div>' +
          '<div class="cb-hero-stage">Étage ' + G.stage + '</div>' +
          '<div class="cb-hero-rec">🏆 Record : étage ' + G.bestStage + '</div>' +
        '</div>' +
        '<div class="cb-cyc-wrap"><span class="cb-mut">Avantages :</span><div class="cb-cycle">' + cyc + '</div></div>' +
        '<div class="cb-mut" style="text-align:center;margin:2px 0 10px;">chaque type bat le suivant (super efficace ×1.5)</div>' +
        '<div class="cb-teamttl">Ton équipe</div>' +
        '<div class="cb-tcards">' + team + '</div>' +
        '<button class="cb-btn cb-btn-main cb-fightbtn" onclick="CB.fight()">⚔️ Combattre — étage ' + G.stage + '</button>' +
      '</div>';
  }

  function fighterCard(f, side, active) {
    return '<div class="cb-fighter ' + side + (f.hp <= 0 ? ' ko' : '') + (active ? ' active' : '') + '" style="--tc:' + TM[f.cr.t].c + '; --rc:' + RAR[f.cr.r].c + '">' +
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
        '<button class="cb-btn cb-special' + (me.charge >= 3 ? ' ready' : '') + '" onclick="CB.act(true)"' + (B.busy || me.charge < 3 ? ' disabled' : '') + '>' + (me.charge >= 3 ? '⚡ ' + esc(me.cr.mv) + ' — PRÊT !' : '✨ ' + esc(me.cr.mv) + ' <span class="cb-gauge">' + chargePips(me.charge) + '</span>') + '</button>' +
        '<button class="cb-btn" onclick="CB.go(\'arena\')">🏳️ Abandonner</button></div>';
    }
    var turn = B.over ? '' : '<div class="cb-turn ' + (B.busy ? 'wait' : 'you') + '">' + (B.busy ? '⏳ En cours…' : '🟢 À toi de jouer') + '</div>';
    // indice de stratégie : comment ton type se comporte face à l'ennemi actuel (statique = aucun coût d'anim)
    var mAdv = typeMult(me.cr.t, foe.cr.t);
    var matchup = B.over ? '' : (mAdv > 1
      ? '<div class="cb-matchup good">🔥 Super efficace contre ' + esc(foe.cr.n) + ' — frappe fort !</div>'
      : (mAdv < 1 ? '<div class="cb-matchup bad">🛡 ' + esc(foe.cr.n) + ' résiste à ton type (change peut-être de combattant)</div>' : ''));
    el.innerHTML = head() +
      '<div class="cb-panel cb-battle">' +
        turn + matchup +
        '<div class="cb-brow"><span class="cb-mut">Toi</span><div class="cb-reserve">' + reserve(B.team, B.ti) + '</div></div>' +
        '<div class="cb-stage"><div class="cb-arena-field">' + fighterCard(me, 'me', !B.busy && !B.over) + '<div class="cb-vs">VS</div>' + fighterCard(foe, 'foe', false) + '</div></div>' +
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

  // Recharge l'état depuis localStorage (appelé après une synchro cloud : connexion / autre appareil)
  // puis rafraîchit l'affichage si l'Arène est ouverte et qu'aucun combat n'est en cours.
  CB.reload = function () {
    load();
    try {
      var open = document.getElementById('arene') && document.body.classList.contains('arene-on');
      if (open && !(B && !B.over)) { if (G.view === 'battle') G.view = 'arena'; render(); }
    } catch (e) {}
  };

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
