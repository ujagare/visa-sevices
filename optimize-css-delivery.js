// Script to optimize CSS delivery
document.addEventListener('DOMContentLoaded', function() {
    // Function to optimize CSS loading
    function optimizeCSSDelivery() {
        // Get all stylesheets
        const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
        
        // Separate critical and non-critical CSS
        stylesheets.forEach(stylesheet => {
            // Skip if already processed
            if (stylesheet.hasAttribute('data-optimized')) {
                return;
            }
            
            // Skip critical CSS (marked with data-critical="true")
            if (stylesheet.getAttribute('data-critical') === 'true') {
                return;
            }
            
            // Mark as optimized
            stylesheet.setAttribute('data-optimized', 'true');
            
            // Use media="print" as a hack to load non-render blocking
            // Then switch to all media once loaded
            const originalMedia = stylesheet.media || 'all';
            stylesheet.media = 'print';
            stylesheet.onload = function() {
                this.media = originalMedia;
                this.onload = null;
            };
            
            // Add preload for important stylesheets
            if (stylesheet.href.includes('style.css') || 
                stylesheet.href.includes('white-wings-colors.css')) {
                const preloadLink = document.createElement('link');
                preloadLink.rel = 'preload';
                preloadLink.as = 'style';
                preloadLink.href = stylesheet.href;
                document.head.appendChild(preloadLink);
            }
        });
    }
    
    // Run optimization
    optimizeCSSDelivery();
});