/* Feed Value Calculator service worker.
   HTML is network-first (latest after each deploy); static assets are cache-first (offline).
   Bump CACHE to force a full refresh. */
const CACHE = 'fvc-v2';
const CORE = [
  './', './index.html', './manifest.json',
  './apple-touch-icon.png', './apple-touch-icon-precomposed.png', './favicon.ico',
  './icons/icon.svg', './icons/icon-192.png', './icons/icon-512.png',
  './icons/favicon-32.png', './icons/favicon-16.png'
];
self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(CORE); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});
self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);
  var isHTML = req.mode === 'navigate' || (url.origin === location.origin && url.pathname.endsWith('.html'));
  if (isHTML) {
    e.respondWith(
      fetch(req).then(function (resp) {
        var copy = resp.clone();
        caches.open(CACHE).then(function (c) { c.put(req, copy); });
        return resp;
      }).catch(function () {
        return caches.match(req).then(function (r) { return r || caches.match('./index.html'); });
      })
    );
    return;
  }
  e.respondWith(caches.match(req).then(function (r) { return r || fetch(req); }));
});
