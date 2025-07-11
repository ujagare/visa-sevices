// Enable proper scrolling without interfering with Lenis
document.addEventListener('DOMContentLoaded', function() {
    // Enable basic scrolling properties
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';

    // Let Lenis handle all scroll events - don't add conflicting listeners
    console.log('Basic scroll enabled - Lenis will handle smooth scrolling');
});