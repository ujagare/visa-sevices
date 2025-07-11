// Dedicated Mobile Menu Script - Works on All Pages

(function() {
    'use strict';
    
    console.log('Mobile menu script loading...');
    
    function initMobileMenu() {
        console.log('Initializing mobile menu...');
        
        const menuToggle = document.getElementById('menu-toggle');
        const menuClose = document.getElementById('menu-close');
        const mobileMenu = document.getElementById('mobile-menu');
        
        console.log('Elements found:', {
            menuToggle: !!menuToggle,
            menuClose: !!menuClose,
            mobileMenu: !!mobileMenu
        });
        
        if (!menuToggle || !menuClose || !mobileMenu) {
            console.warn('Mobile menu elements not found');
            return;
        }
        
        // Function to open mobile menu
        function openMobileMenu() {
            console.log('Opening mobile menu');
            mobileMenu.classList.add('active');
            mobileMenu.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            // Force reflow and add smooth animation
            mobileMenu.offsetHeight;
            setTimeout(() => {
                mobileMenu.style.top = '0';
            }, 10);
        }
        
        // Function to close mobile menu
        function closeMobileMenu() {
            console.log('Closing mobile menu');
            mobileMenu.style.top = '-100%';
            document.body.style.overflow = 'auto';
            
            // Hide after animation completes
            setTimeout(() => {
                mobileMenu.classList.remove('active');
                if (mobileMenu.style.display !== 'none') {
                    mobileMenu.style.display = 'none';
                }
            }, 400);
        }
        
        // Menu toggle click
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Menu toggle clicked');
            openMobileMenu();
        });
        
        // Menu close click
        menuClose.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Menu close clicked');
            closeMobileMenu();
        });
        
        // Enhanced outside click detection
        document.addEventListener('click', function(e) {
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                    console.log('Clicked outside menu');
                    closeMobileMenu();
                }
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
                console.log('Escape key pressed');
                closeMobileMenu();
            }
        });
        
        // Prevent menu from closing when clicking inside menu content
        if (mobileMenu) {
            mobileMenu.addEventListener('click', function(e) {
                e.stopPropagation();
            });
            
            // Close menu when clicking on nav links
            const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');
            mobileNavLinks.forEach(link => {
                link.addEventListener('click', function() {
                    console.log('Nav link clicked');
                    closeMobileMenu();
                });
            });
        }
        
        console.log('Mobile menu initialized successfully');
    }
    
    // Multiple initialization methods
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMobileMenu);
    } else {
        initMobileMenu();
    }
    
    // Backup initialization
    window.addEventListener('load', function() {
        setTimeout(initMobileMenu, 100);
    });
    
    console.log('Mobile menu script loaded');
})();
