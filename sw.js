// Offline support: serve from cache, refresh the cache in the background.
// Bump CACHE when files change so old copies are cleared.
const CACHE = 'beadtray-v3';
const ASSETS = [
  './',
  'index.html',
  'manifest.webmanifest',
  'icons/icon.svg',
  'css/styles.css',
  'js/data/voice-clips.js',
  'js/settings.js',
  'js/speech.js',
  'js/ui.js',
  'js/activities/learn.js',
  'js/activities/find.js',
  'js/activities/add.js',
  'js/activities/take.js',
  'js/data/india-map.js',
  'js/data/animals.js',
  'js/activities/animals.js',
  'js/app.js',
];

// Linda's recorded clips, so the voice works offline too.
importScripts('js/data/voice-clips.js');
const CLIPS = Object.values(self.App.voiceClips).map((id) => `audio/voice/${id}.m4a`);

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS.concat(CLIPS))).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.open(CACHE).then(async (cache) => {
      const cached = await cache.match(e.request, { ignoreSearch: true });
      const fresh = fetch(e.request)
        .then((res) => {
          if (res.ok) cache.put(e.request, res.clone());
          return res;
        })
        .catch(() => cached);
      return cached || fresh;
    })
  );
});
