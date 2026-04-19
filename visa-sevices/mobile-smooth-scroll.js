/**
 * Mobile Smooth Scroll Fix for White Wings Visa Consultancy
 * Uses Lenis for smooth scrolling on mobile devices
 */

document.addEventListener('DOMContentLoaded', function() {
    // Check if device is mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        // Apply mobile-specific scroll optimizations
        applyMobileScrollFix();
    }
});

function applyMobileScrollFix() {
    // Wait for Lenis to be available
    if (typeof Lenis === 'undefined') {
        setTimeout(applyMobileScrollFix, 100);
        return;
    }
    
    // Destroy any existing Lenis instance
    if (window.lenis) {
        window.lenis.destroy();
    }
    
    // Create new Lenis instance with mobile-optimized settings
    const lenis = new Lenis({
        duration: 0.6,                // Shorter duration for mobile
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: true,           // Enable smooth touch
        touchMultiplier: 1.3,        // Adjusted for mobile
        infinite: false,
        autoResize: true,
        syncTouch: true,             // Sync with touch events
        touchInertiaMultiplier: 20,  // Lower for better control
        wheelMultiplier: 0.8         // Lower for better control
    });
    
    // Make globally accessible
    window.lenis = lenis;
    
    // GSAP ScrollTrigger integration if available
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
    
    // Apply CSS optimizations for mobile
    const style = document.createElement('style');
    style.textContent = `
        /* Optimize horizontal scrolling elements */
        .coaching-grid, .journey-steps, .university-logos {
            scroll-behavior: smooth;
            -webkit-overflow-scrolling: touch;
            scroll-snap-type: x mandatory;
            scrollbar-width: none; /* Firefox */
            will-change: transform;
            transform: translateZ(0);
        }
        
        /* Hide scrollbars */
        .coaching-grid::-webkit-scrollbar, 
        .journey-steps::-webkit-scrollbar, 
        .university-logos::-webkit-scrollbar {
            display: none;
        }
        
        /* Optimize scroll items */
        .coaching-card, .journey-step, .university-logo {
            scroll-snap-align: start;
        }
    `;
    document.head.appendChild(style);
    
    // Optimize scroll performance by using passive event listeners
    document.addEventListener('touchstart', function() {}, {passive: true});
    document.addEventListener('touchmove', function() {}, {passive: true});
    
    // Fix for horizontal scrolling elements
    const horizontalScrollElements = document.querySelectorAll('.coaching-grid, .journey-steps, .university-logos');
    horizontalScrollElements.forEach(element => {
        // Add touch-based scrolling with momentum
        let isDown = false;
        let startX;
        let scrollLeft;
        
        element.addEventListener('touchstart', function(e) {
            isDown = true;
            startX = e.touches[0].pageX - element.offsetLeft;
            scrollLeft = element.scrollLeft;
        }, {passive: true});
        
        element.addEventListener('touchend', function() {
            isDown = false;
        }, {passive: true});
        
        element.addEventListener('touchmove', function(e) {
            if (!isDown) return;
            const x = e.touches[0].pageX - element.offsetLeft;
            const walk = (startX - x) * 1.5; // Scroll speed multiplier
            element.scrollLeft = scrollLeft + walk;
        }, {passive: true});
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
                    offset: -50,
                    duration: 0.8
                });
            }
        }
    });
}