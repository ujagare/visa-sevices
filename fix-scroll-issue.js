// Fix scroll issue
document.addEventListener('DOMContentLoaded', () => {
    // Remove any classes that might be interfering with scrolling
    document.documentElement.classList.remove('lenis', 'lenis-smooth');
    
    // Re-enable normal scrolling
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
    
    // Remove any event listeners that might be blocking wheel events
    window.removeEventListener('wheel', function(e) { e.preventDefault(); }, { passive: false });
});