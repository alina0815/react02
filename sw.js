// CODELAB: Update cache names any time any of the cached files change.
const CACHE_NAME = 'static-cache-v1';

// CODELAB: Add list of files to cache here.
const FILES_TO_CACHE = [
  '/react02/simple.html',
];
console.log("ALA KOTA MA");

self.addEventListener('install', (evt) => {
	debugger
  console.log('[ServiceWorker] Install');
  // CODELAB: Precache static resources here.
    evt.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        console.log('[ServiceWorker] Pre-caching offline page');
        return cache.addAll(FILES_TO_CACHE);
      })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
 event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (evt) => {
	debugger
  console.log('[ServiceWorker] Fetch', evt.request.url);
  // CODELAB: Add fetch event handler here.
  if (evt.request.mode !== 'navigate') {
	  // Not a page navigation, bail.
	  return;
	}
	evt.respondWith(
		fetch(evt.request)
			.catch(() => {
			  return caches.open(CACHE_NAME)
				  .then((cache) => {
					return cache.match('simple.html');
				  });
			})
	);
});