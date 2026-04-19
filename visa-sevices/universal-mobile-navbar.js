// Universal Mobile Navbar - Matches About Page
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functions
    window.openMobileMenu = function() {
        const overlay = document.querySelector('.mobile-menu-overlay');
        const sidebar = document.querySelector('.mobile-menu-sidebar');
        if (overlay && sidebar) {
            overlay.classList.add('show');
            sidebar.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    };

    window.closeMobileMenu = function() {
        const overlay = document.querySelector('.mobile-menu-overlay');
        const sidebar = document.querySelector('.mobile-menu-sidebar');
        const servicesDropdown = document.querySelector('.mobile-services-dropdown');
        if (overlay && sidebar) {
            overlay.classList.remove('show');
            sidebar.classList.remove('show');
            document.body.style.overflow = 'auto';
            if (servicesDropdown) {
                servicesDropdown.classList.remove('active');
            }
        }
    };

    window.toggleServices = function() {
        const servicesDropdown = document.querySelector('.mobile-services-dropdown');
        if (servicesDropdown) {
            servicesDropdown.classList.toggle('active');
        }
    };

    // Setup event listeners
    const overlay = document.querySelector('.mobile-menu-overlay');
    if (overlay) {
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) closeMobileMenu();
        });
    }

    const menuLinks = document.querySelectorAll('.mobile-menu-links a:not(.mobile-services-toggle)');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMobileMenu();
        });
    });

    const serviceLinks = document.querySelectorAll('.mobile-services-links a');
    serviceLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMobileMenu();
        });
    });
});