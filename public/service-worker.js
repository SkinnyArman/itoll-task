// custom-sw.js

importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-sw.js"
);

workbox.setConfig({ debug: false });

self.skipWaiting();
workbox.clientsClaim();

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
  })
);

// NetworkOnly for all other routes
workbox.routing.registerRoute(
  new RegExp(".*"),
  new workbox.strategies.NetworkOnly({
    cacheName: "dev",
  })
);
