// Disable mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    // Override mobile menu functions with empty functions
    window.openMobileMenu = function() { return false; };
    window.closeMobileMenu = function() { return false; };
    window.toggleServices = function() { return false; };
    
    // Remove mobile elements from DOM
    const mobileElements = document.querySelectorAll('.mobile-menu-overlay, .mobile-menu-sidebar, .simple-hamburger');
    mobileElements.forEach(function(element) {
        if(element && element.parentNode) {
            element.parentNode.removeChild(element);
        }
    });
});