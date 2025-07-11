// Universal Mobile Menu - Works on All Pages

(function() {
    'use strict';
    
    console.log('Universal mobile menu loading...');
    
    function initUniversalMobileMenu() {
        console.log('Initializing universal mobile menu...');
        
        // Get all required elements
        const menuToggle = document.getElementById('menu-toggle');
        const menuClose = document.getElementById('menu-close');
        const mobileMenu = document.getElementById('mobile-menu');
        const servicesToggle = document.querySelector('.mobile-services-toggle');
        const servicesItem = document.querySelector('.mobile-services-item');
        
        console.log('Universal menu elements found:', {
            menuToggle: !!menuToggle,
            menuClose: !!menuClose,
            mobileMenu: !!mobileMenu,
            servicesToggle: !!servicesToggle,
            servicesItem: !!servicesItem
        });
        
        if (!menuToggle || !menuClose || !mobileMenu) {
            console.warn('Required mobile menu elements not found');
            return;
        }
        
        // Remove any existing event listeners by cloning elements
        const newMenuToggle = menuToggle.cloneNode(true);
        const newMenuClose = menuClose.cloneNode(true);
        menuToggle.parentNode.replaceChild(newMenuToggle, menuToggle);
        menuClose.parentNode.replaceChild(newMenuClose, menuClose);
        
        // Get the new elements
        const finalMenuToggle = document.getElementById('menu-toggle');
        const finalMenuClose = document.getElementById('menu-close');
        
        // Function to open mobile menu
        function openMobileMenu() {
            console.log('Opening universal mobile menu');
            mobileMenu.classList.add('active');
            mobileMenu.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            // Force reflow and animate
            mobileMenu.offsetHeight;
            setTimeout(() => {
                mobileMenu.style.top = '0';
            }, 10);
        }
        
        // Function to close mobile menu
        function closeMobileMenu() {
            console.log('Closing universal mobile menu');
            mobileMenu.style.top = '-100%';
            document.body.style.overflow = 'auto';
            
            // Close services dropdown when menu closes
            if (servicesItem) {
                servicesItem.classList.remove('active');
            }
            
            setTimeout(() => {
                mobileMenu.classList.remove('active');
                mobileMenu.style.display = 'none';
            }, 400);
        }
        
        // Menu toggle click
        finalMenuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Universal menu toggle clicked');
            openMobileMenu();
        });
        
        // Menu close click
        finalMenuClose.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Universal menu close clicked');
            closeMobileMenu();
        });
        
        // Services dropdown functionality
        if (servicesToggle && servicesItem) {
            // Remove existing listeners
            const newServicesToggle = servicesToggle.cloneNode(true);
            servicesToggle.parentNode.replaceChild(newServicesToggle, servicesToggle);
            
            const finalServicesToggle = document.querySelector('.mobile-services-toggle');
            const finalServicesItem = document.querySelector('.mobile-services-item');
            
            finalServicesToggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Universal services toggle clicked');
                finalServicesItem.classList.toggle('active');
            });
        }
        
        // Close menu when clicking on regular nav links
        const regularNavLinks = document.querySelectorAll('.mobile-nav-links > li > a:not(.mobile-services-toggle)');
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
                if (!mobileMenu.contains(e.target) && !finalMenuToggle.contains(e.target)) {
                    console.log('Clicked outside universal menu');
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
        
        // Prevent menu from closing when clicking inside
        mobileMenu.addEventListener('click', function(e) {
            e.stopPropagation();
        });
        
        // Set active link based on current page
        setActiveLink();
        
        console.log('Universal mobile menu initialized successfully');
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
    
    // Initialize with multiple methods for reliability
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initUniversalMobileMenu);
    } else {
        initUniversalMobileMenu();
    }
    
    // Backup initialization
    window.addEventListener('load', function() {
        setTimeout(initUniversalMobileMenu, 200);
    });
    
    // Force initialization after 1 second if not done
    setTimeout(function() {
        if (!window.universalMobileMenuInitialized) {
            console.log('Force initializing universal mobile menu');
            initUniversalMobileMenu();
            window.universalMobileMenuInitialized = true;
        }
    }, 1000);
    
    console.log('Universal mobile menu script loaded');
})();
