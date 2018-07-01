const staticCacheName = "CConverter-static-v0.1";

self.addEventListener("install", event => {
	event.waitUntil(
		caches
			.open(staticCacheName)
			.then(cache =>
				cache.addAll(["/", "/js/app.bundle.js", "/css/style.css"])
			)
	);
});

self.addEventListener("fetch", event => {
	const requestUrl = new URL(event.request.url);

	if (requestUrl.origin === location.origin) {
		if (requestUrl.pathname === "/") {
			event.respondWith(caches.match("/"));
			return;
		}
	}

	event.respondWith(
		caches.match(event.request).then(response => {
			return response || fetch(event.request);
		})
	);
});

self.addEventListener("message", event => {
	if (event.data.action === "skipWaiting") {
		self.skipWaiting();
	}
});
