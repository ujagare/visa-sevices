// Universal Lenis Smooth Scroll Implementation
// This file ensures consistent smooth scrolling across all pages

(function() {
    'use strict';
    
    // Wait for DOM and Lenis to be available
    function initLenis() {
        if (typeof Lenis === 'undefined') {
            console.warn('Lenis not loaded yet, retrying...');
            setTimeout(initLenis, 100);
            return;
        }

        // Destroy any existing Lenis instances
        if (window.lenis) {
            window.lenis.destroy();
        }

        // Create new Lenis instance with optimal settings
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
            normalizeWheel: true,
            wheelEventsTarget: document.documentElement,
            autoResize: true
        });

        // Make globally accessible
        window.lenis = lenis;

        // GSAP ScrollTrigger integration
        if (typeof ScrollTrigger !== 'undefined') {
            lenis.on('scroll', ScrollTrigger.update);
            
            if (typeof gsap !== 'undefined') {
                gsap.ticker.add((time) => {
                    lenis.raf(time * 1000);
                });
                gsap.ticker.lagSmoothing(0);
            }
        }

        // Animation frame loop
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // Debug logging
        lenis.on('scroll', ({ scroll, limit, velocity, direction, progress }) => {
            // Uncomment for debugging
            // console.log('Lenis scroll:', { scroll, velocity, direction });
        });

        console.log('Universal Lenis initialized successfully');
        
        // Dispatch custom event
        window.dispatchEvent(new CustomEvent('lenisReady', { detail: lenis }));
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLenis);
    } else {
        initLenis();
    }

    // Reinitialize on page show (for back/forward navigation)
    window.addEventListener('pageshow', function(event) {
        if (event.persisted) {
            setTimeout(initLenis, 100);
        }
    });

    // Handle anchor links with Lenis
    document.addEventListener('click', function(e) {
        const target = e.target.closest('a[href^="#"]');
        if (target && window.lenis) {
            e.preventDefault();
            const targetElement = document.querySelector(target.getAttribute('href'));
            if (targetElement) {
                window.lenis.scrollTo(targetElement, {
                    offset: -100,
                    duration: 1.5
                });
            }
        }
    });

})();
