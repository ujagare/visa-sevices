// Mobile Navbar Fix
// This script ensures the mobile navbar works properly on all pages

document.addEventListener('DOMContentLoaded', function() {
    console.log('Mobile navbar fix loading...');
    
    // Fix mobile menu functionality
    function fixMobileMenu() {
        // Make sure global functions are defined
        if (typeof window.openMobileMenu !== 'function') {
            console.log('Defining openMobileMenu function');
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
        }
        
        if (typeof window.closeMobileMenu !== 'function') {
            console.log('Defining closeMobileMenu function');
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
        }
        
        if (typeof window.toggleServices !== 'function') {
            console.log('Defining toggleServices function');
            window.toggleServices = function() {
                console.log('Toggling services dropdown...');
                const servicesDropdown = document.querySelector('.mobile-services-dropdown');
                if (servicesDropdown) {
                    servicesDropdown.classList.toggle('active');
                    console.log('Services dropdown toggled!');
                }
            };
        }
        
        // Ensure hamburger button has click event
        const hamburger = document.getElementById('simple-hamburger');
        if (hamburger) {
            console.log('Adding click event to hamburger button');
            // Remove existing click event to prevent duplicates
            hamburger.removeAttribute('onclick');
            
            // Add new click event
            hamburger.addEventListener('click', function() {
                window.openMobileMenu();
            });
        } else {
            console.error('Hamburger button not found!');
        }
        
        // Ensure overlay closes menu when clicked
        const overlay = document.querySelector('.mobile-menu-overlay');
        if (overlay) {
            overlay.addEventListener('click', function(e) {
                if (e.target === overlay) {
                    window.closeMobileMenu();
                }
            });
        }
        
        // Ensure close button works
        const closeButton = document.querySelector('.mobile-menu-close');
        if (closeButton) {
            closeButton.addEventListener('click', function() {
                window.closeMobileMenu();
            });
        }
        
        // Ensure services toggle works
        const servicesToggle = document.querySelector('.mobile-services-toggle');
        if (servicesToggle) {
            servicesToggle.addEventListener('click', function() {
                window.toggleServices();
            });
        }
        
        // Close menu when clicking navigation links
        const menuLinks = document.querySelectorAll('.mobile-menu-links a:not(.mobile-services-toggle)');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                window.closeMobileMenu();
            });
        });
        
        // Close menu when clicking services dropdown links
        const serviceLinks = document.querySelectorAll('.mobile-services-links a');
        serviceLinks.forEach(link => {
            link.addEventListener('click', function() {
                window.closeMobileMenu();
            });
        });
        
        console.log('Mobile menu fixed!');
    }
    
    // Fix mobile menu
    fixMobileMenu();
    
    // Also fix on window load as backup
    window.addEventListener('load', function() {
        fixMobileMenu();
    });
});