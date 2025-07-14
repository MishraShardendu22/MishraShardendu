const CACHE_NAME = "tokenova-cache-v1";
const OFFLINE_URL = "/offline.html";

// Assets to cache
const ASSETS_TO_CACHE = [
    "/",
    "/home",
    "/create-event",
    "/my-events",
    "/my-tickets",
    OFFLINE_URL,
    "/android-chrome-192x192.png",
    "/android-chrome-512x512.png"
];

// Install event: Preload cache
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("Caching assets...");
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
    self.skipWaiting();
});

// Fetch event: Serve from cache or fetch from network
self.addEventListener("fetch", (event) => {
    event.respondWith(
        fetch(event.request)
            .then((response) => {
                if (response.status === 404) throw new Error("404 Not Found");
                return response;
            })
            .catch(() => caches.match(event.request).then((cachedResponse) => {
                return cachedResponse || caches.match(OFFLINE_URL);
            }))
    );

    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return fetch(event.request)
                .then((response) => {
                    if (!response || response.status !== 200) return response;
                    cache.put(event.request, response.clone());
                    return response;
                })
                .catch(() => {}); // Ignore failed requests
        })
    );
});

// Activate event: Clean up old caches
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log("Deleting old cache:", cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
    self.clients.claim();
});