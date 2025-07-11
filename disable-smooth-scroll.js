// Disable smooth scrolling on study page to fix mouse wheel issues
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the study page
    if (window.location.pathname.includes('study.html')) {
        // Find and disable any smooth scroll libraries
        if (window.lenis) {
            window.lenis.destroy();
        }
        
        // Override any smooth scroll behavior
        document.documentElement.style.scrollBehavior = 'auto';
        document.body.style.scrollBehavior = 'auto';
        
        // Remove any event listeners that might be capturing wheel events
        const removeWheelCapture = function() {
            document.querySelectorAll('*').forEach(el => {
                el.style.touchAction = 'auto';
            });
        };
        
        // Run immediately and after a short delay to catch any dynamic elements
        removeWheelCapture();
        setTimeout(removeWheelCapture, 500);
    }
});