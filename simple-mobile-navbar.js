// Simple Mobile Navbar JavaScript

(function() {
    'use strict';
    
    console.log('Simple mobile navbar loading...');
    
    function initSimpleMobileMenu() {
        console.log('Initializing simple mobile menu...');
        
        const menuToggle = document.getElementById('menu-toggle');
        const menuClose = document.getElementById('menu-close');
        const mobileMenu = document.getElementById('mobile-menu');
        const servicesToggle = document.querySelector('.mobile-services-toggle');
        const servicesItem = document.querySelector('.mobile-services-item');
        
        console.log('Elements found:', {
            menuToggle: !!menuToggle,
            menuClose: !!menuClose,
            mobileMenu: !!mobileMenu,
            servicesToggle: !!servicesToggle,
            servicesItem: !!servicesItem
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
            
            setTimeout(() => {
                mobileMenu.style.top = '0';
            }, 10);
        }
        
        // Function to close mobile menu
        function closeMobileMenu() {
            console.log('Closing mobile menu');
            mobileMenu.style.top = '-100%';
            document.body.style.overflow = 'auto';
            
            setTimeout(() => {
                mobileMenu.classList.remove('active');
                mobileMenu.style.display = 'none';
                
                // Close services dropdown when menu closes
                if (servicesItem) {
                    servicesItem.classList.remove('active');
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
        
        // Services dropdown toggle
        if (servicesToggle && servicesItem) {
            servicesToggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Services toggle clicked');
                servicesItem.classList.toggle('active');
            });
        }
        
        // Close menu when clicking on regular nav links (not services)
        const regularNavLinks = document.querySelectorAll('.mobile-nav-links a:not(.mobile-services-toggle)');
        regularNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                console.log('Regular nav link clicked');
                closeMobileMenu();
            });
        });
        
        // Close menu when clicking on services dropdown links
        const servicesDropdownLinks = document.querySelectorAll('.mobile-services-dropdown a');
        servicesDropdownLinks.forEach(link => {
            link.addEventListener('click', function() {
                console.log('Services dropdown link clicked');
                closeMobileMenu();
            });
        });
        
        // Close menu when clicking outside
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
        }
        
        // Set active link based on current page
        setActiveLink();
        
        console.log('Simple mobile menu initialized successfully');
    }
    
    function setActiveLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.mobile-nav-links a, .mobile-services-dropdown a');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href && href.includes(currentPage)) {
                link.classList.add('active');
            }
        });
    }
    
    // Multiple initialization methods
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSimpleMobileMenu);
    } else {
        initSimpleMobileMenu();
    }
    
    // Backup initialization
    window.addEventListener('load', function() {
        setTimeout(initSimpleMobileMenu, 100);
    });
    
    console.log('Simple mobile navbar script loaded');
})();
