// Clear Service Worker and Cache
(function() {
    'use strict';
    
    // Clear service worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(function(registrations) {
            for(let registration of registrations) {
                registration.unregister().then(function(boolean) {
                    console.log('Service Worker unregistered:', boolean);
                });
            }
        });
    }
    
    // Clear caches
    if ('caches' in window) {
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    console.log('Deleting cache:', cacheName);
                    return caches.delete(cacheName);
                })
            );
        }).then(function() {
            console.log('All caches cleared');
            // Reload page after clearing
            setTimeout(() => {
                window.location.reload(true);
            }, 1000);
        });
    }
    
    console.log('Cache clearing initiated...');
})();
