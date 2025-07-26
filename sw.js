// Service Worker for Performance Optimization
const CACHE_NAME = 'white-wings-v1.0.0';
const STATIC_CACHE = 'static-v1.0.0';
const DYNAMIC_CACHE = 'dynamic-v1.0.0';

// Assets to cache immediately
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/404.html',
    '/privacy-policy.html',
    '/terms-of-service.html',
    '/cookie-policy.html',
    '/faq.html',
    '/style-optimized.css',
    '/consolidated-styles.css',
    '/script-optimized.js',
    '/performance-monitor.js',
    '/loader.js',
    '/universal-lenis.js',
    '/animation-data.js',
    '/cookie-consent.js',
    '/analytics.js',
    '/professional-mobile-menu.css',
    '/white-wings-colors.css',
    '/barba-simple.css',
    '/hero-slider-text.css',
    '/favicon/favicon.ico',
    '/favicon/apple-touch-icon.png',
    '/favicon/site.webmanifest',
    '/images/logo/WING LOGO.png'
];

// Network-first resources (always try network first)
const NETWORK_FIRST = [
    'https://formsubmit.co/',
    '/contact',
    '/thank-you.html'
];

// Cache-first resources (serve from cache if available)
const CACHE_FIRST = [
    '/images/',
    'https://fonts.cdnfonts.com/',
    'https://cdnjs.cloudflare.com/',
    'https://unpkg.com/',
    'https://cdn.jsdelivr.net/',
    'https://flagcdn.com/'
];

// Install event - cache static assets
self.addEventListener('install', event => {
    console.log('Service Worker: Installing...');
    
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then(cache => {
                console.log('Service Worker: Caching static assets');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => {
                console.log('Service Worker: Static assets cached');
                return self.skipWaiting();
            })
            .catch(error => {
                console.error('Service Worker: Error caching static assets', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    console.log('Service Worker: Activating...');
    
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                            console.log('Service Worker: Deleting old cache', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('Service Worker: Activated');
                return self.clients.claim();
            })
    );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }
    
    // Skip chrome-extension and other non-http requests
    if (!request.url.startsWith('http')) {
        return;
    }
    
    // Network-first strategy for dynamic content
    if (NETWORK_FIRST.some(pattern => request.url.includes(pattern))) {
        event.respondWith(networkFirst(request));
        return;
    }
    
    // Cache-first strategy for static assets
    if (CACHE_FIRST.some(pattern => request.url.includes(pattern))) {
        event.respondWith(cacheFirst(request));
        return;
    }
    
    // Stale-while-revalidate for HTML pages
    if (request.headers.get('accept').includes('text/html')) {
        event.respondWith(staleWhileRevalidate(request));
        return;
    }
    
    // Default to cache-first for everything else
    event.respondWith(cacheFirst(request));
});

// Network-first strategy
async function networkFirst(request) {
    try {
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.log('Network failed, trying cache:', error);
        const cachedResponse = await caches.match(request);
        
        if (cachedResponse) {
            return cachedResponse;
        }
        
        // Return offline page if available
        if (request.headers.get('accept').includes('text/html')) {
            return caches.match('/offline.html') || new Response('Offline', { status: 503 });
        }
        
        throw error;
    }
}

// Cache-first strategy
async function cacheFirst(request) {
    const cachedResponse = await caches.match(request);

    if (cachedResponse) {
        // Update cache in background
        fetch(request)
            .then(response => {
                if (response.ok) {
                    const cache = caches.open(DYNAMIC_CACHE);
                    cache.then(c => c.put(request, response.clone()));
                }
            })
            .catch(() => {}); // Ignore network errors

        return cachedResponse;
    }

    try {
        const networkResponse = await fetch(request);

        if (networkResponse.ok) {
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, networkResponse.clone());
        }

        return networkResponse;
    } catch (error) {
        console.error('Cache and network failed:', error);
        throw error;
    }
}

// Stale-while-revalidate strategy
async function staleWhileRevalidate(request) {
    const cachedResponse = await caches.match(request);
    
    const networkResponsePromise = fetch(request)
        .then(response => {
            if (response.ok) {
                const cache = caches.open(DYNAMIC_CACHE);
                cache.then(c => c.put(request, response.clone()));
            }
            return response;
        })
        .catch(() => {}); // Ignore network errors
    
    return cachedResponse || networkResponsePromise;
}

// Background sync for form submissions
self.addEventListener('sync', event => {
    if (event.tag === 'contact-form') {
        event.waitUntil(syncContactForm());
    }
});

async function syncContactForm() {
    // Handle offline form submissions
    const formData = await getStoredFormData();
    
    if (formData) {
        try {
            await fetch('https://formsubmit.co/mrunal@whitewingsvisa.com', {
                method: 'POST',
                body: formData
            });
            
            // Clear stored data on success
            await clearStoredFormData();
            console.log('Form submitted successfully');
        } catch (error) {
            console.error('Form submission failed:', error);
        }
    }
}

// Helper functions for form data storage
async function getStoredFormData() {
    // Implementation would depend on IndexedDB or localStorage
    return null;
}

async function clearStoredFormData() {
    // Implementation would depend on IndexedDB or localStorage
}

// Push notification handling (if needed in future)
self.addEventListener('push', event => {
    if (event.data) {
        const data = event.data.json();
        
        const options = {
            body: data.body,
            icon: '/images/logo/WING LOGO.png',
            badge: '/images/logo/WING LOGO.png',
            vibrate: [200, 100, 200],
            data: data.data || {},
            actions: data.actions || []
        };
        
        event.waitUntil(
            self.registration.showNotification(data.title, options)
        );
    }
});

// Notification click handling
self.addEventListener('notificationclick', event => {
    event.notification.close();
    
    event.waitUntil(
        clients.openWindow(event.notification.data.url || '/')
    );
});

console.log('Service Worker: Loaded');
