// Global Smooth Scroll Implementation
document.addEventListener('DOMContentLoaded', () => {
    // Check if Lenis is available
    if (typeof Lenis !== 'undefined') {
        // Create lenis instance with optimal settings
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
            normalizeWheel: true,
            smoothWheel: true
        });

        // Make lenis globally accessible
        window.lenis = lenis;

        // Animation frame loop
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        // Start the animation frame loop
        requestAnimationFrame(raf);

        // GSAP ScrollTrigger integration if available
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            lenis.on('scroll', ScrollTrigger.update);
            
            gsap.ticker.add((time) => {
                lenis.raf(time * 1000);
            });
            
            gsap.ticker.lagSmoothing(0);
        }

        // Add HTML class for styling
        document.documentElement.classList.add('lenis', 'lenis-smooth');
        
        // Prevent default wheel behavior for smoother experience
        window.addEventListener('wheel', (e) => {}, { passive: false });
        
        console.log('Smooth scroll initialized successfully');
    } else {
        console.warn('Lenis library not found. Smooth scrolling disabled.');
    }
});