/*! GR2 Study © 2026 Drackson — Tous droits réservés. Copie/réutilisation interdites sans autorisation (Instagram @drackson227). */
/* Prononciation audio — fait « parler » le navigateur (Web Speech API).
   Clique un mot anglais (tables de vocabulaire / verbes irréguliers) pour l'entendre.
   La langue suit la matière active (anglais → en-GB, néerlandais → nl-NL). */
(function () {
  'use strict';
  if (!('speechSynthesis' in window)) return; // navigateur sans synthèse vocale : on ne fait rien

  function subjLang() {
    var s = window.currentSubject;
    if (s === 'neerlandais') return 'nl-NL';
    if (s === 'anglais') return 'en-GB';
    return 'en-GB';
  }

  // Choisit une voix correspondant à la langue si disponible (sinon voix par défaut)
  function pickVoice(lang) {
    try {
      var vs = window.speechSynthesis.getVoices() || [];
      var pre = lang.slice(0, 2).toLowerCase();
      return vs.find(function (v) { return (v.lang || '').toLowerCase() === lang.toLowerCase(); })
        || vs.find(function (v) { return (v.lang || '').toLowerCase().indexOf(pre) === 0; })
        || null;
    } catch (e) { return null; }
  }

  function speak(text, lang) {
    if (!text) return;
    lang = lang || subjLang();
    try {
      window.speechSynthesis.cancel(); // coupe ce qui parle déjà
      var u = new SpeechSynthesisUtterance(String(text).trim());
      u.lang = lang;
      u.rate = 0.9;
      var v = pickVoice(lang);
      if (v) u.voice = v;
      window.speechSynthesis.speak(u);
    } catch (e) {}
  }
  window.gr2Speak = speak; // utilisable ailleurs (entraîneur, etc.)

  // Certaines plateformes chargent les voix de façon asynchrone
  try { window.speechSynthesis.onvoiceschanged = function () {}; } catch (e) {}

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
