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

        try {
            // Check if device is mobile
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            
            // Create new Lenis instance with mobile-optimized settings
            const lenis = new Lenis({
                duration: isMobile ? 0.8 : 1.2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                direction: 'vertical',
                gestureDirection: 'vertical',
                smooth: true,
                mouseMultiplier: 1,
                smoothTouch: true,
                touchMultiplier: isMobile ? 1.2 : 1.5,
                infinite: false,
                normalizeWheel: true,
                wheelEventsTarget: document.documentElement,
                autoResize: true,
                syncTouch: isMobile,
                touchInertiaMultiplier: isMobile ? 25 : 35,
                orientation: 'vertical'
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

            
            // Dispatch custom event
            window.dispatchEvent(new CustomEvent('lenisReady', { detail: lenis }));
        } catch (error) {
            console.error('Error initializing Lenis:', error);
        }
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
            const href = target.getAttribute('href');
            // Skip empty href="#" links
            if (href === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(href);
            if (targetElement) {
                window.lenis.scrollTo(targetElement, {
                    offset: -100,
                    duration: 1.5
                });
            }
        }
    });

})();