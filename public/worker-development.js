/******/ (() => { // webpackBootstrap
  var __webpack_exports__ = {};
  // Cache the cart since it updates on the client-side
  self.addEventListener("fetch", event => {
    const url = new URL(event.request.url);
    if (url.pathname === "/cart") {
      event.respondWith(caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request).then(networkResponse => {
          return caches.open("cart-cache").then(cache => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        });
      }));
    }
  });
  
  // Pre-cache the offline fallback page during service worker installation
  self.addEventListener("install", event => {
    event.waitUntil(caches.open("offline-cache").then(cache => {
      // Pre-cache the offline fallback page
      return cache.add("/~offline");
    }));
  });
  
  // Serve the offline fallback page when network is unavailable
  self.addEventListener("fetch", event => {
    event.respondWith(fetch(event.request).catch(() => {
      return caches.match("/~offline");
    }));
  });
  /******/ })()
  ;