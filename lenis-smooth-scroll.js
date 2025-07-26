// Lenis Smooth Scroll - Desktop Only
if (window.innerWidth > 768) {
    // Import Lenis
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/gh/studio-freight/lenis@1/bundled/lenis.min.js';
    script.onload = function() {
        // Initialize Lenis
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
        });

        // Animation frame
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // Anchor links smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    lenis.scrollTo(target, { offset: -80 });
                }
            });
        });
    };
    document.head.appendChild(script);
}