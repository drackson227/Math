/* Service Worker — Maths GR2
   Rend le site installable (PWA) et utilisable hors-ligne après la 1re visite.
   - Fichiers locaux : RÉSEAU d'abord (toujours la dernière version en ligne),
     repli sur le cache si hors-ligne. Évite d'afficher une vieille version.
   - Librairies CDN (MathJax, GSAP, Supabase, polices) : réseau d'abord, puis cache.
   - Supabase API & Giphy : jamais mis en cache (données/temps réel). */
const CACHE = 'mathsgr2-v142';
const CORE = [
  './', './index.html', './style.css', './enhancements.css', './study-tools.css',
  './data.js', './content.js', './script.js',
  './auth.js', './chat.js', './multiplayer.js', './stats.js', './notes.js', './creations.js', './formulas-trainer.js', './diagnostic.js', './search.js', './generator.js', './subjects.js', './subject-chimie.js', './subject-bio.js', './subject-geo.js', './subject-eco.js', './subject-histoire.js', './subject-francais.js', './subject-anglais.js', './subject-neerlandais.js', './answersheet.js', './gestures.js', './bat.js', './shortcuts.js', './backtotop.js', './study-tools.js', './pronunciation.js', './irregular-trainer.js',
  './manifest.json', './logo.svg', './icon-192.png', './icon-512.png'
];
// Librairies CDN à précharger pour le HORS-LIGNE (MathJax SVG = auto-contenu, pas de polices séparées)
const CDN_PRECACHE = [
  'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-svg.js',
  'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/Flip.min.js',
  'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2'
];

// Hôtes CDN dont on garde une copie en cache (pour le hors-ligne)
const CACHEABLE_CDN = ['cdn.jsdelivr.net', 'cdnjs.cloudflare.com', 'fonts.googleapis.com', 'fonts.gstatic.com'];
// Hôtes qu'on ne met JAMAIS en cache (données live)
const NEVER_CACHE = ['supabase.co', 'supabase.in', 'giphy.com'];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => c.addAll(CORE)
        // Préchargement CDN non bloquant : un échec n'empêche pas l'installation
        .then(() => Promise.allSettled(CDN_PRECACHE.map((u) => c.add(u)))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  let url;
  try { url = new URL(req.url); } catch (_) { return; }

  // Données live : on laisse passer sans toucher au cache
  if (NEVER_CACHE.some((h) => url.hostname.includes(h))) return;

  // Même origine : RÉSEAU d'abord → toujours la dernière version quand en ligne ;
  // repli sur le cache uniquement si hors-ligne.
  if (url.origin === location.origin) {
    e.respondWith(
      fetch(req).then((res) => {
        const cp = res.clone();
        caches.open(CACHE).then((c) => c.put(req, cp));
        return res;
      }).catch(() => caches.match(req).then((hit) => hit || caches.match('./index.html')))
    );
    return;
  }

  // CDN connus : réseau d'abord, repli cache
  if (CACHEABLE_CDN.some((h) => url.hostname.includes(h))) {
    e.respondWith(
      fetch(req).then((res) => {
        const cp = res.clone();
        caches.open(CACHE).then((c) => c.put(req, cp));
        return res;
      }).catch(() => caches.match(req))
    );
  }
});
