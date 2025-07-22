// Simple Barba.js Configuration for White Wings Visa Website
// Smooth page transitions

// Wait for DOM and all scripts to be ready
window.addEventListener('load', function() {

    console.log('Window loaded, checking for Barba.js...');

    // Check if Barba.js and GSAP are loaded
    if (typeof barba === 'undefined') {
        console.error('Barba.js not loaded - check if script is included');
        return;
    }

    if (typeof gsap === 'undefined') {
        console.error('GSAP not loaded - check if script is included');
        return;
    }

    console.log('✅ Barba.js and GSAP loaded successfully');
    console.log('🚀 Initializing Barba.js...');

    // Initialize Barba.js
    barba.init({
        // Prevent external links from using Barba.js
        prevent: ({ el }) => {
            // Skip Barba.js for external links
            if (el.href && (
                el.href.includes('tel:') || 
                el.href.includes('mailto:') || 
                el.href.includes('wa.me') ||
                el.href.includes('http://') ||
                el.href.includes('https://') ||
                el.target === '_blank'
            )) {
                return true;
            }
            return false;
        },

        // Simple fade transition
        transitions: [{
            name: 'fade',
            leave(data) {
                return gsap.to(data.current.container, {
                    opacity: 0,
                    duration: 0.3
                });
            },
            enter(data) {
                return gsap.fromTo(data.next.container, {
                    opacity: 0
                }, {
                    opacity: 1,
                    duration: 0.3
                });
            }
        }],

        // Global hooks
        once() {
            console.log('✅ Barba.js initialized successfully');
            console.log('🔧 Initializing mobile menu...');
            initializeMobileMenu();
        },

        beforeEnter(data) {
            console.log('🔄 Page transition starting...');
            console.log('From:', data.current.url);
            console.log('To:', data.next.url);
            window.scrollTo(0, 0);
        },

        afterEnter(data) {
            console.log('✅ Page transition completed');
            console.log('Current page:', data.next.url);
            initializeMobileMenu();
            initializeScrollToTop();
        }
    });

    // Test if Barba.js is intercepting links
    console.log('🔗 Testing link interception...');
    const testLinks = document.querySelectorAll('a[href$=".html"]');
    console.log(`Found ${testLinks.length} internal HTML links`);

    // Add click listeners to test
    testLinks.forEach((link, index) => {
        if (index < 3) { // Only log first 3 links
            console.log(`Link ${index + 1}:`, link.href);
        }
    });
});

// Helper Functions
function initializeMobileMenu() {
    // Mobile menu functionality
    const hamburger = document.querySelector('.simple-hamburger');
    const overlay = document.querySelector('.mobile-menu-overlay');
    const sidebar = document.querySelector('.mobile-menu-sidebar');
    const closeBtn = document.querySelector('.mobile-menu-close');

    if (hamburger) {
        hamburger.onclick = function() {
            if (overlay && sidebar) {
                overlay.classList.add('show');
                sidebar.classList.add('show');
                document.body.style.overflow = 'hidden';
            }
        };
    }

    if (closeBtn) {
        closeBtn.onclick = function() {
            if (overlay && sidebar) {
                overlay.classList.remove('show');
                sidebar.classList.remove('show');
                document.body.style.overflow = 'auto';
            }
        };
    }

    if (overlay) {
        overlay.onclick = function(e) {
            if (e.target === overlay) {
                overlay.classList.remove('show');
                sidebar.classList.remove('show');
                document.body.style.overflow = 'auto';
            }
        };
    }

    // Services dropdown in mobile menu
    const servicesToggle = document.querySelector('.mobile-services-toggle');
    const servicesDropdown = document.querySelector('.mobile-services-dropdown');
    
    if (servicesToggle) {
        servicesToggle.onclick = function() {
            if (servicesDropdown) {
                servicesDropdown.classList.toggle('active');
            }
        };
    }
}

function initializeScrollToTop() {
    const scrollBtn = document.getElementById('scrollToTop');
    if (scrollBtn) {
        scrollBtn.onclick = function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };

        // Show/hide scroll button
        window.onscroll = function() {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                scrollBtn.style.display = "block";
            } else {
                scrollBtn.style.display = "none";
            }
        };
    }
}
