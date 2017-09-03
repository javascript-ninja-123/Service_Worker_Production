var cacheName = 'product-hunt';
var cacheFile = [
  '/index.html',
  '/static/js/bundle.js',
  '/semantic.css',
  '/'
]

//service worker life cycle
//install
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName)
    .then(cache => {
      return cache.addAll(cacheFile)
    })
  )
})

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
    .then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== cacheName)
        .map(name => {
          return caches.delete(name);
        })
      )
    })
  )
})

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request)
    .then(response => {
      if (response) return response;
      var fetchRequest = e.request.clone();
      return fetch(fetchRequest)
        .then(fetchResponse => {
          if (!fetchResponse || fetchResponse.status !== 0) {
            return fetchResponse
          } else {
            var responseToCache = fetchResponse.clone()
            caches.open(cacheName)
              .then(cache => {
                cache.put(e.request, responseToCache);
              })
          }
          return fetchResponse
        })
    })
  )
})
