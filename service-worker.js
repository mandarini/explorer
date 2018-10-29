self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('katerina-cache-v1')
    .then(function(cache) {
      return cache.addAll([
        '.',
        'index.html',
        'styles/main.css',
        'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700',
        'images/still_life-1600_large_2x.jpg',
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(caches.match(event.request)
  .then(function(response) {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});
