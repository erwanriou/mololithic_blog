self.addEventListener("install", event => event.waitUntil(self.skipWaiting()))
self.addEventListener("activate", event =>
  event.waitUntil(self.clients.claim())
)

// EXCLUDING API AND AUTH FROM SERVICE WORKERS
workbox.routing.registerNavigationRoute(
  workbox.precaching.getCacheKeyForURL("/index.html"),
  {
    blacklist: [
      /^\/api/,
      /^\/auth/,
      /^\/sitemap/,
      /^\/not-found/,
      /^\/robots.txt/
    ]
  }
)
