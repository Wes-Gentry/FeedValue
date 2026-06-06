/* Feed Value Calculator service worker.
   HTML is network-first (so you always get the latest after a deploy);
   icons/manifest are cache-first (offline support). Bump CACHE to force a full refresh. */
const CACHE = 'fvc-v1';
const CORE = [
  './', './index.html', './manifest.json',
  './icons/icon.svg', './icons/icon-192.png', './icons/icon-512.png',
  './icons/apple-touch-icon.png', './icons/favicon-32.png', './icons/favicon-16.png'
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
