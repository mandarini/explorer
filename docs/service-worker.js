self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('katerina-cache-v1')
    .then(function(cache) {
      return cache.addAll([
        '.',
        '/',
        'index.html',
        'styles/main.min.css',
        'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700',
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

self.addEventListener('activate', function(event) {
  console.log('Activated', 'activate', event);
  return self.clients.claim();
});
