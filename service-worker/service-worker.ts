declare var self: ServiceWorkerGlobalScope;

const CACHE_NAME = 'pwa_cache';
const PATH = '/playground-pwa';
const URLS = [
    `${PATH}/`,
    `${PATH}/index.html`,
    `${PATH}/index.js`,
    `${PATH}/favicon.png`,
    `${PATH}/manifest.webmanifest`
];

self.addEventListener('install', e => {
    e.waitUntil((async () => {
        const cache = await caches.open(CACHE_NAME);
        await cache.addAll(URLS);
    })());
});

self.addEventListener('activate', e => {
    e.waitUntil((async () => {
        console.log('Activated');
    })());
});

self.addEventListener('fetch', e => {
    e.respondWith((async () => {
        const cache = await caches.open(CACHE_NAME);
        return await cache.match(e.request) || await fetch(e.request);
    })());
});

export default null;