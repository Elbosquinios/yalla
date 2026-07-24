// Service worker de Yalla.
// VERSION est a incrementer a chaque mise a jour de l'app : cela invalide
// l'ancien cache et force le rechargement des fichiers.
const VERSION = "v2";
const CACHE = "yalla-" + VERSION;

const COEUR = [
  "./",
  "index.html",
  "styles.css",
  "app.js",
  "data/phrases.js",
  "data/audio_manifest.js",
  "manifest.json",
  "icons/icon-192.png",
  "icons/icon-512.png",
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(COEUR)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((cles) => Promise.all(cles.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Coeur de l'app : cache d'abord. Audio : cache d'abord, mis en cache au premier
// telechargement (le bouton « Audios hors ligne » de l'accueil les recupere tous).
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request).then((reponse) => {
      if (reponse) return reponse;
      return fetch(e.request).then((res) => {
        const url = new URL(e.request.url);
        if (res.ok && url.origin === location.origin) {
          const copie = res.clone();
          caches.open(CACHE).then((c) => c.put(e.request, copie));
        }
        return res;
      });
    })
  );
});
