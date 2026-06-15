/*! GR2 Study © 2026 Drackson — Tous droits réservés. Copie/réutilisation interdites sans autorisation (Instagram @drackson227). */
/* Prononciation audio — fait « parler » le navigateur (Web Speech API).
   Clique un mot anglais / néerlandais (tables de vocabulaire / verbes irréguliers) pour l'entendre.
   La langue suit la matière active (anglais → en-GB, néerlandais → nl-NL).
   ⚠️ Règle d'or : on choisit TOUJOURS une vraie voix de la langue demandée (jamais la voix
   française par défaut, sinon l'accent est faux). Si aucune voix de cette langue n'est installée
   sur l'appareil, on NE prononce PAS (on prévient brièvement) au lieu de donner un mauvais accent. */
(function () {
  'use strict';
  if (!('speechSynthesis' in window)) return; // navigateur sans synthèse vocale : on ne fait rien
  var synth = window.speechSynthesis;

  function subjLang() {
    var s = window.currentSubject;
    if (s === 'neerlandais') return 'nl-NL';
    if (s === 'anglais') return 'en-GB';
    return 'en-GB';
  }

  /* ---- cache des voix (elles se chargent souvent en asynchrone) ---- */
  var VOICES = [];
  function loadVoices() { try { VOICES = synth.getVoices() || []; } catch (e) { VOICES = []; } return VOICES; }
  loadVoices();
  try { synth.addEventListener('voiceschanged', loadVoices); }
  catch (e) { try { synth.onvoiceschanged = loadVoices; } catch (e2) {} }

  /* Choisit la MEILLEURE voix de la langue demandée.
     - exclut toute voix d'une autre langue (jamais la voix française pour de l'anglais) ;
     - privilégie la bonne région (en-GB), puis la qualité (Google / natural / en ligne). */
  function pickVoice(lang) {
    if (!VOICES.length) loadVoices();
    var full = String(lang || '').toLowerCase().replace('_', '-'); // ex. 'en-gb'
    var pre = full.slice(0, 2);                                     // ex. 'en'
    if (!pre) return null;
    var best = null, bestScore = -1;
    for (var i = 0; i < VOICES.length; i++) {
      var v = VOICES[i], vl = (v.lang || '').toLowerCase().replace('_', '-');
      if (vl.slice(0, 2) !== pre) continue; // langue différente → on ignore (clé du fix)
      var s = (vl === full) ? 4 : 1;        // même région exacte = mieux
      var name = (v.name || '').toLowerCase();
      if (/google|natural|neural|premium|enhanced|wavenet|siri/.test(name)) s += 3; // voix de meilleure qualité
      if (v.localService === false) s += 1; // voix en ligne (souvent meilleures)
      if (v['default']) s += 0.5;
      if (s > bestScore) { bestScore = s; best = v; }
    }
    return best;
  }
  function hasVoice(lang) { return !!pickVoice(lang || subjLang()); }
  window.gr2HasVoice = hasVoice; // utilitaire (ex. masquer un indice audio si pas de voix)

  /* ---- audio de QUALITÉ pré-généré (voix neuronale) : audio/manifest.json ----
     Si un mot a son fichier, on le joue (même belle voix sur TOUS les appareils,
     même ceux sans voix installée). Sinon → repli sur la voix de l'appareil. */
  var MANIFEST = null, curAudio = null;
  function norm(t) { return String(t == null ? '' : t).trim().replace(/\s+/g, ' '); }
  (function loadManifest() {
    try {
      // fetch interdit en file:// (CORS) → on garde la voix de l'appareil. En ligne (http/https) : OK.
      if (!/^https?:$/.test(location.protocol)) return;
      fetch('audio/manifest.json', { cache: 'default' })
        .then(function (r) { return r && r.ok ? r.json() : null; })
        .then(function (m) { if (m) MANIFEST = m; })
        .catch(function () {});
    } catch (e) {}
  })();
  function fileFor(text, lang) {
    if (!MANIFEST) return null;
    var pre = String(lang || subjLang()).slice(0, 2).toLowerCase();
    var byLang = MANIFEST[pre];
    return (byLang && byLang[norm(text)]) || null;
  }
  function hasFile(text, lang) { return !!fileFor(text, lang); }
  window.gr2HasFile = hasFile; // utilitaire
  // opts : { rate (playbackRate), onend (fin de lecture), onfail (erreur fichier) }
  function playFile(path, opts) {
    opts = opts || {};
    try {
      try { synth.cancel(); } catch (e) {}            // coupe une éventuelle voix navigateur
      if (curAudio) { try { curAudio.pause(); } catch (e) {} curAudio = null; }
      var a = new Audio(path);
      curAudio = a;
      if (typeof opts.rate === 'number') { try { a.playbackRate = opts.rate; } catch (e) {} }
      var done = false;
      function fin(cb) { if (done) return; done = true; if (cb) try { cb(); } catch (e) {} }
      a.addEventListener('ended', function () { fin(opts.onend); }, { once: true });
      a.addEventListener('error', function () { fin(opts.onfail); }, { once: true });
      var p = a.play();
      if (p && p.catch) p.catch(function () { /* clic = autorisé ; on ignore */ });
      return true;
    } catch (e) { return false; }
  }

  /* Petit message si aucune voix de la langue n'est installée (une fois par langue). */
  var warned = {};
  function noVoiceToast(pre) {
    if (warned[pre]) return; warned[pre] = true;
    var label = pre === 'nl' ? 'néerlandaise' : (pre === 'en' ? 'anglaise' : 'de cette langue');
    try {
      var t = document.createElement('div');
      t.className = 'gr2-voice-toast'; t.setAttribute('role', 'status');
      t.textContent = '🔇 Aucune voix ' + label + ' n\'est installée sur cet appareil — audio indisponible ici.';
      t.style.cssText = 'position:fixed;left:50%;bottom:22px;transform:translateX(-50%);z-index:99999;' +
        'background:#1f2430;color:#fff;border:1px solid rgba(255,255,255,.18);border-radius:10px;' +
        'padding:10px 14px;font-size:14px;line-height:1.4;max-width:90%;text-align:center;box-shadow:0 6px 24px rgba(0,0,0,.4);';
      document.body.appendChild(t);
      setTimeout(function () { t.style.transition = 'opacity .4s'; t.style.opacity = '0'; }, 3400);
      setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); }, 3900);
    } catch (e) {}
  }

  // rate facultatif (mode cours) ; sinon 0.92 (clic vocab). onend appelé en fin de lecture.
  function emit(text, lang, v, rate, onend) {
    try {
      synth.cancel(); // coupe ce qui parle déjà
      if (!v) { noVoiceToast(String(lang || '').slice(0, 2).toLowerCase()); if (onend) onend(); return; }
      var u = new SpeechSynthesisUtterance(String(text).trim());
      u.voice = v;
      u.lang = v.lang || lang;
      u.rate = (typeof rate === 'number') ? rate : 0.92;
      if (onend) { u.onend = function () { onend(); }; u.onerror = function () { onend(); }; }
      synth.speak(u);
    } catch (e) { if (onend) onend(); }
  }

  // voix de l'appareil, en attendant le chargement des voix si besoin (une seule fois)
  function voiceSpeak(text, lang, rate, onend) {
    var v = pickVoice(lang);
    if (!v && !VOICES.length) {
      var done = false;
      var go = function () { if (done) return; done = true; loadVoices(); emit(text, lang, pickVoice(lang), rate, onend); };
      try { synth.addEventListener('voiceschanged', go, { once: true }); } catch (e) {}
      setTimeout(go, 350);
      return;
    }
    emit(text, lang, v, rate, onend);
  }

  /* speak(text, lang, opts) — opts : { rate, onend }.
     1) fichier audio neuronal si présent (même belle voix partout) ;
     2) repli voix de l'appareil. onend est TOUJOURS appelé une fois en fin (le mode
        cours en a besoin pour enchaîner ses étapes, même sans voix disponible). */
  function speak(text, lang, opts) {
    opts = opts || {};
    var onend = opts.onend, called = false;
    function finish() { if (called) return; called = true; if (onend) try { onend(); } catch (e) {} }
    if (!text) { finish(); return; }
    lang = lang || subjLang();
    var rate = (typeof opts.rate === 'number') ? opts.rate : undefined;
    // 1) fichier audio de qualité (voix neuronale)
    var path = fileFor(text, lang);
    if (path) {
      if (playFile(path, {
        rate: rate, onend: finish,
        onfail: function () { voiceSpeak(text, lang, rate, finish); } // échec fichier → repli voix
      })) return;
    }
    // 2) repli : voix de l'appareil (Web Speech), avec la bonne voix de langue
    voiceSpeak(text, lang, rate, finish);
  }
  window.gr2Speak = speak; // utilisable ailleurs (entraîneur, mode cours…)

  function stopSpeak() {
    try { synth.cancel(); } catch (e) {}
    if (curAudio) { try { curAudio.pause(); } catch (e) {} }
  }
  window.gr2StopSpeak = stopSpeak; // coupe voix ET fichier audio en cours

  // Délégation : un seul écouteur pour toute la page
  var SAY_SEL = '[data-say], .eng-irr td, .eng-voc td:first-child';
  document.addEventListener('click', function (e) {
    var el = e.target.closest(SAY_SEL);
    if (!el) return;
    var txt = el.getAttribute('data-say') || el.textContent || '';
    txt = txt.trim();
    if (!txt || !/[A-Za-z]/.test(txt)) return; // rien à dire / pas de lettres
    e.preventDefault();
    speak(txt, el.getAttribute('data-lang'));
    // petit retour visuel
    el.classList.add('say-flash');
    setTimeout(function () { el.classList.remove('say-flash'); }, 350);
  });
})();
