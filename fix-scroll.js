// Fix scroll issues on study page
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the study page
    if (window.location.pathname.includes('study.html')) {
        // Completely disable Lenis smooth scrolling
        if (window.lenis) {
            window.lenis.destroy();
        }
        
        // Remove any smooth scrolling behavior
        document.documentElement.style.scrollBehavior = 'auto';
        document.body.style.scrollBehavior = 'auto';
        
        // Override GSAP ticker to prevent it from affecting scrolling
        if (window.gsap && window.gsap.ticker) {
            window.gsap.ticker.remove(window.lenis ? window.lenis.raf : null);
        }
        
        console.log("Smooth scrolling disabled for study page");
    }
});