importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-sw.js"
);

// Import the clientsClaim function from Workbox Core
importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-core.prod.js"
);

// Use clientsClaim from the imported script
workbox.core.clientsClaim();

// Set Workbox debug mode
workbox.setConfig({ debug: false });

// Claim clients immediately
self.skipWaiting();

// Log when the service worker is installed and activated
self.addEventListener("install", (event) => {
  console.log("Service Worker installing...");
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker activated.");
});

// Cache the home route ("/")
workbox.routing.registerRoute(
  "/",
  new workbox.strategies.NetworkFirst({
    cacheName: "start-url",
    plugins: [
      {
        cacheWillUpdate: async ({ request, response, event, state }) => {
          if (response && response.type === "opaqueredirect") {
            return new Response(response.body, {
              status: 200,
              statusText: "OK",
              headers: response.headers,
            });
          }
          return response;
        },
      },
    ],
  })
);

// Cache the /products route
workbox.routing.registerRoute(
  "/products",
  new workbox.strategies.NetworkFirst({
    cacheName: "products-url",
  })
);

// Cache the individual product details API responses
workbox.routing.registerRoute(
  new RegExp("https://66be043574dfc195586e5246.mockapi.io/products/.*"),
  new workbox.strategies.NetworkFirst({
    cacheName: "product-details-api-cache",
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [0, 200], // Cache only successful responses
      }),
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 50, // Store up to 50 product details
        maxAgeSeconds: 24 * 60 * 60, // Cache for 24 hours
      }),
    ],
  })
);
// Cache the hero image
workbox.routing.registerRoute(
  new RegExp('/hero-img.jpg'),
  new workbox.strategies.CacheFirst({
    cacheName: 'hero-image-cache',
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [0, 200], // Cache only successful responses
      }),
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 1, // Only keep the latest version of the hero image
        maxAgeSeconds: 7 * 24 * 60 * 60, // Cache for 7 days
      }),
    ],
  })
);

// Cache the cart API responses
workbox.routing.registerRoute(
  new RegExp("https://66be043574dfc195586e5246.mockapi.io/cart.*"),
  new workbox.strategies.NetworkFirst({
    cacheName: "cart-api-cache",
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [0, 200], // Cache only successful responses
      }),
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 1, // Store the latest cart data
        maxAgeSeconds: 24 * 60 * 60, // Cache for 24 hours
      }),
    ],
  })
);

workbox.routing.setCatchHandler(({ event }) => {
  console.error("Handling error:", event);
  return Response.error();
});

self.addEventListener("fetch", (event) => {
  console.log("Fetch event for:", event.request.url);
});
