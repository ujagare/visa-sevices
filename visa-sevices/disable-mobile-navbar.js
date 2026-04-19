// Disable Mobile Navbar JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Override mobile menu functions with empty functions
    window.openMobileMenu = function() {
        // Do nothing - mobile menu disabled
        return false;
    };

    window.closeMobileMenu = function() {
        // Do nothing - mobile menu disabled
        return false;
    };

    window.toggleServices = function() {
        // Do nothing - mobile menu disabled
        return false;
    };
    
    // Remove any existing event listeners from hamburger button
    const hamburgerBtn = document.querySelector('.simple-hamburger');
    if (hamburgerBtn) {
        const newHamburger = hamburgerBtn.cloneNode(true);
        hamburgerBtn.parentNode.replaceChild(newHamburger, hamburgerBtn);
    }
    
    // Make desktop menu responsive for mobile
    const desktopMenu = document.querySelector('.desktop-menu') || document.querySelector('#links');
    if (desktopMenu) {
        // Ensure desktop menu is visible
        desktopMenu.style.display = 'flex';
    }
});