// Alternative Lenis initialization with direct window binding
window.addEventListener('DOMContentLoaded', () => {
    // Create lenis instance
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

    // Bind lenis to window
    window.lenis = lenis;

    // Animation frame
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    // Start the animation frame loop
    requestAnimationFrame(raf);

    // GSAP ScrollTrigger integration
    if (window.ScrollTrigger) {
        lenis.on('scroll', ScrollTrigger.update);
        
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
        
        gsap.ticker.lagSmoothing(0);
    }
    
    // Prevent default wheel behavior
    window.addEventListener('wheel', (e) => {}, { passive: false });
});