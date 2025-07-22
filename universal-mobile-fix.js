// Universal Mobile Fix JS
// This script ensures the mobile navbar works properly on all pages

document.addEventListener('DOMContentLoaded', function() {
    console.log('Universal mobile fix loading...');
    
    // Define mobile menu functions in global scope
    window.openMobileMenu = function() {
        console.log('Opening mobile menu...');
        const overlay = document.querySelector('.mobile-menu-overlay');
        const sidebar = document.querySelector('.mobile-menu-sidebar');
        
        if (overlay && sidebar) {
            overlay.classList.add('show');
            sidebar.classList.add('show');
            document.body.style.overflow = 'hidden';
            console.log('Menu opened!');
        } else {
            console.error('Menu elements not found!');
        }
    };
    
    window.closeMobileMenu = function() {
        console.log('Closing mobile menu...');
        const overlay = document.querySelector('.mobile-menu-overlay');
        const sidebar = document.querySelector('.mobile-menu-sidebar');
        const servicesDropdown = document.querySelector('.mobile-services-dropdown');
        
        if (overlay && sidebar) {
            overlay.classList.remove('show');
            sidebar.classList.remove('show');
            document.body.style.overflow = 'auto';
            
            // Close services dropdown when menu closes
            if (servicesDropdown) {
                servicesDropdown.classList.remove('active');
            }
            
            console.log('Menu closed!');
        }
    };
    
    window.toggleServices = function() {
        console.log('Toggling services dropdown...');
        const servicesDropdown = document.querySelector('.mobile-services-dropdown');
        if (servicesDropdown) {
            servicesDropdown.classList.toggle('active');
            console.log('Services dropdown toggled!');
        }
    };
    
    // Setup event listeners
    function setupMobileMenuListeners() {
        // Hamburger button click
        const hamburger = document.getElementById('simple-hamburger');
        if (hamburger) {
            hamburger.addEventListener('click', function() {
                window.openMobileMenu();
            });
        }
        
        // Close button click
        const closeButton = document.querySelector('.mobile-menu-close');
        if (closeButton) {
            closeButton.addEventListener('click', function() {
                window.closeMobileMenu();
            });
        }
        
        // Services toggle click
        const servicesToggle = document.querySelector('.mobile-services-toggle');
        if (servicesToggle) {
            servicesToggle.addEventListener('click', function() {
                window.toggleServices();
            });
        }
        
        // Overlay click
        const overlay = document.querySelector('.mobile-menu-overlay');
        if (overlay) {
            overlay.addEventListener('click', function(e) {
                if (e.target === overlay) {
                    window.closeMobileMenu();
                }
            });
        }
        
        // Menu links click
        const menuLinks = document.querySelectorAll('.mobile-menu-links a:not(.mobile-services-toggle)');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                window.closeMobileMenu();
            });
        });
        
        // Services dropdown links click
        const serviceLinks = document.querySelectorAll('.mobile-services-links a');
        serviceLinks.forEach(link => {
            link.addEventListener('click', function() {
                window.closeMobileMenu();
            });
        });
    }
    
    // Initialize
    setupMobileMenuListeners();
    console.log('Universal mobile fix initialized');
});