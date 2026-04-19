// Professional Mobile Navbar JavaScript - FIXED VERSION
console.log('🚀 MOBILE NAVBAR: Starting...');

// Simple direct approach
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 DOM LOADED: Initializing mobile navbar...');

    // Direct element selection
    const hamburger = document.getElementById('new-mobile-hamburger-btn');
    const navbar = document.querySelector('.new-mobile-navbar');
    const closeBtn = document.querySelector('.new-mobile-close');

    console.log('🚀 ELEMENTS CHECK:', {
        hamburger: hamburger ? 'FOUND' : 'NOT FOUND',
        navbar: navbar ? 'FOUND' : 'NOT FOUND',
        closeBtn: closeBtn ? 'FOUND' : 'NOT FOUND'
    });

    if (!hamburger) {
        console.error('🚀 ERROR: Hamburger button not found!');
        return;
    }

    if (!navbar) {
        console.error('🚀 ERROR: Mobile navbar not found!');
        return;
    }

    // Simple toggle function
    function toggleMenu() {
        console.log('🚀 TOGGLE: Menu toggling...');
        const isActive = navbar.classList.contains('active');

        if (isActive) {
            navbar.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = 'auto';
            console.log('🚀 MENU CLOSED');
        } else {
            navbar.classList.add('active');
            hamburger.classList.add('active');
            document.body.style.overflow = 'hidden';
            console.log('🚀 MENU OPENED');
        }
    }

    // Add click event
    hamburger.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('🚀 HAMBURGER CLICKED!');
        toggleMenu();
    });

    // Close button event
    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('🚀 CLOSE BUTTON CLICKED!');
            navbar.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    // Close on outside click
    navbar.addEventListener('click', function(e) {
        if (e.target === navbar) {
            console.log('🚀 OUTSIDE CLICK - CLOSING');
            navbar.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    console.log('🚀 MOBILE NAVBAR: Initialized successfully!');
});

// Backup initialization
window.addEventListener('load', function() {
    console.log('🚀 WINDOW LOADED: Backup initialization...');

    setTimeout(function() {
        const hamburger = document.getElementById('new-mobile-hamburger-btn');
        const navbar = document.querySelector('.new-mobile-navbar');

        if (hamburger && navbar && !hamburger.hasAttribute('data-initialized')) {
            console.log('🚀 BACKUP: Adding event listener...');
            hamburger.setAttribute('data-initialized', 'true');

            hamburger.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('🚀 BACKUP CLICK: Toggling menu...');
                navbar.classList.toggle('active');
                hamburger.classList.toggle('active');

                if (navbar.classList.contains('active')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = 'auto';
                }
            });
        }
    }, 500);
});
// Test function for debugging
window.testMobileMenu = function() {
    console.log('🚀 TESTING: Manual menu toggle...');
    const hamburger = document.getElementById('new-mobile-hamburger-btn');
    const navbar = document.querySelector('.new-mobile-navbar');

    if (hamburger && navbar) {
        console.log('🚀 TEST: Elements found, toggling...');
        navbar.classList.toggle('active');
        hamburger.classList.toggle('active');

        if (navbar.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
            console.log('🚀 TEST: Menu opened');
        } else {
            document.body.style.overflow = 'auto';
            console.log('🚀 TEST: Menu closed');
        }
    } else {
        console.log('🚀 TEST: Elements not found:', {
            hamburger: hamburger ? 'FOUND' : 'NOT FOUND',
            navbar: navbar ? 'FOUND' : 'NOT FOUND'
        });
    }
};

console.log('🚀 MOBILE NAVBAR: Script loaded completely!');
