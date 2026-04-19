// Mobile Scroll Fix for Touch Devices
(function() {
    'use strict';
    
    console.log('Mobile scroll fix loading...');
    
    function initMobileScrollFix() {
        // Detect if device is mobile/touch
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                         ('ontouchstart' in window) || 
                         (navigator.maxTouchPoints > 0);
        
        if (isMobile) {
            console.log('Mobile device detected, applying scroll fixes...');
            
            // Ensure body and html can scroll
            document.body.style.overflow = 'auto';
            document.body.style.overflowX = 'hidden';
            document.documentElement.style.overflow = 'auto';
            document.documentElement.style.overflowX = 'hidden';
            
            // Remove any height restrictions
            document.body.style.height = 'auto';
            document.documentElement.style.height = 'auto';
            
            // Enable touch scrolling
            document.body.style.webkitOverflowScrolling = 'touch';
            document.body.style.touchAction = 'pan-y';
            
            // Fix iOS scroll issues
            if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
                document.body.style.webkitOverflowScrolling = 'touch';
                document.body.style.overflowScrolling = 'touch';
                
                // Prevent zoom on double tap
                let lastTouchEnd = 0;
                document.addEventListener('touchend', function (event) {
                    const now = (new Date()).getTime();
                    if (now - lastTouchEnd <= 300) {
                        event.preventDefault();
                    }
                    lastTouchEnd = now;
                }, false);
            }
            
            // Ensure Lenis works with touch
            window.addEventListener('lenisReady', function(e) {
                const lenis = e.detail;
                console.log('Lenis ready, configuring for mobile...');
                
                // Enable touch events
                lenis.options.smoothTouch = true;
                lenis.options.touchMultiplier = 1.5;
                lenis.options.syncTouch = true;
                
                // Re-initialize with new options
                lenis.resize();
            });
            
            // Fallback: if Lenis doesn't work, ensure native scroll works
            setTimeout(function() {
                if (window.scrollY === 0 && document.body.scrollHeight > window.innerHeight) {
                    console.log('Applying fallback scroll fix...');
                    
                    // Test scroll
                    window.scrollTo(0, 1);
                    setTimeout(() => window.scrollTo(0, 0), 100);
                    
                    // Ensure touch events work
                    document.addEventListener('touchstart', function(e) {
                        // Allow touch events to propagate
                    }, { passive: true });
                    
                    document.addEventListener('touchmove', function(e) {
                        // Allow touch move events
                    }, { passive: true });
                }
            }, 1000);
            
        } else {
            console.log('Desktop device detected, no mobile fixes needed');
        }
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMobileScrollFix);
    } else {
        initMobileScrollFix();
    }
    
    // Also initialize on window load as backup
    window.addEventListener('load', function() {
        setTimeout(initMobileScrollFix, 500);
    });
    
    console.log('Mobile scroll fix script loaded');
})();
