// Ensure proper scrolling functionality without interfering with Lenis
document.addEventListener('DOMContentLoaded', function() {
    // Remove any scroll blockers
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
    document.body.style.height = 'auto';
    document.documentElement.style.height = 'auto';

    // Don't interfere with Lenis smooth scroll
    console.log('Basic scroll properties enabled - Lenis will handle smooth scrolling');
});