// Simple Smooth Scroll Implementation
document.addEventListener('DOMContentLoaded', () => {
    // Create Lenis instance
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        smooth: true,
        smoothTouch: false,
        touchMultiplier: 2
    });

    // Animation frame loop
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    // Start animation loop
    requestAnimationFrame(raf);
});