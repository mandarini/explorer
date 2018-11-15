self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('katerina-cache-v1')
    .then(function(cache) {
      return cache.addAll([
        '.',
        '/',
        'explorer/index.html',
        'explorer/styles/main.min.css',
        'explorer/assets/offline.png',
        'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700',
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    // Try the cache
    caches.match(event.request).then(function(response) {
      // Fall back to network
      return response || fetch(event.request);
    }).catch(function() {
      // If there's an image, return girly!
      if (event.request.url.endsWith('.webp')) {
        return caches.match('explorer/assets/offline.png');
      }
    })
  );
});

self.addEventListener('activate', function(event) {
  console.log('Activated', 'activate', event);
  return self.clients.claim();
});
