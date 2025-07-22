// Consolidated Scripts - Combines functionality from multiple JS files
// This file replaces: inline-marquee.js, simple-marquee-fix.js, direct-marquee-fix.js, 
// simple-mobile-menu.js, enable-scroll.js, and simple-performance-boost.js

(function() {
    'use strict';
    
    console.log('Consolidated scripts loading...');
    
    // ===== MARQUEE FUNCTIONALITY =====
    // Create and add style element for marquee animations
    function setupMarqueeStyles() {
        var style = document.createElement('style');
        style.textContent = `
            /* Simple animations */
            @keyframes marqueeLeft {
                from { transform: translateX(0); }
                to { transform: translateX(-50%); }
            }
            
            @keyframes marqueeRight {
                from { transform: translateX(-50%); }
                to { transform: translateX(0); }
            }
            
            /* Container styles */
            .countries-image-marquee-section, .choice-section,
            .image-marquee-container, .choice-marquee-line {
                overflow: hidden !important;
            }
            
            /* Content styles */
            .image-marquee-content {
                display: flex !important;
                width: max-content !important;
                animation: marqueeLeft 15s linear infinite !important;
                transform: translate3d(0, 0, 0);
                -webkit-transform: translate3d(0, 0, 0);
                will-change: transform;
            }
            
            .choice-marquee-right .choice-marquee-content {
                display: flex !important;
                width: max-content !important;
                animation: marqueeLeft 15s linear infinite !important;
                transform: translate3d(0, 0, 0);
                -webkit-transform: translate3d(0, 0, 0);
                will-change: transform;
            }
            
            .choice-marquee-left .choice-marquee-content {
                display: flex !important;
                width: max-content !important;
                animation: marqueeRight 15s linear infinite !important;
                transform: translate3d(0, 0, 0);
                -webkit-transform: translate3d(0, 0, 0);
                will-change: transform;
            }
            
            /* Mobile optimizations */
            @media (max-width: 768px) {
                .image-marquee-content,
                .choice-marquee-right .choice-marquee-content,
                .choice-marquee-left .choice-marquee-content {
                    animation-duration: 30s !important;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Fix all marquee animations
    function fixMarquees() {
        // Get all marquee elements
        const marquees = [
            document.querySelector('.image-marquee-content'),
            document.querySelector('.choice-marquee-right .choice-marquee-content'),
            document.querySelector('.choice-marquee-left .choice-marquee-content')
        ];
        
        // Apply fixes to each marquee
        marquees.forEach(function(marquee) {
            if (marquee) {
                // Apply hardware acceleration
                marquee.style.transform = 'translate3d(0, 0, 0)';
                marquee.style.webkitTransform = 'translate3d(0, 0, 0)';
                marquee.style.willChange = 'transform';
                
                // Force restart animation
                const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                
                // Set animation duration based on device
                if (isMobile) {
                    if (marquee.classList.contains('image-marquee-content')) {
                        marquee.style.animation = 'marqueeLeft 30s linear infinite';
                    } else if (marquee.parentElement.classList.contains('choice-marquee-right')) {
                        marquee.style.animation = 'marqueeLeft 30s linear infinite';
                    } else if (marquee.parentElement.classList.contains('choice-marquee-left')) {
                        marquee.style.animation = 'marqueeRight 30s linear infinite';
                    }
                }
                
                // Ensure animation is running
                marquee.style.animationPlayState = 'running';
            }
        });
    }
    
    // ===== MOBILE MENU FUNCTIONALITY =====
    function setupMobileMenu() {
        // Mobile menu functionality
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
                console.log('Menu elements not found!');
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
        document.addEventListener('DOMContentLoaded', function() {
            const overlay = document.querySelector('.mobile-menu-overlay');
            if (overlay) {
                overlay.addEventListener('click', function(e) {
                    if (e.target === overlay) {
                        window.closeMobileMenu();
                    }
                });
            }

            // Close menu when clicking navigation links (not services toggle)
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
        });
    }
    
    // ===== SCROLL OPTIMIZATION =====
    function optimizeScrolling() {
        // Enable basic scrolling properties
        document.body.style.overflow = 'auto';
        document.documentElement.style.overflow = 'auto';
        document.body.style.overflowX = 'hidden';
        document.documentElement.style.overflowX = 'hidden';
        
        // Remove any height restrictions
        document.body.style.height = 'auto';
        document.documentElement.style.height = 'auto';
        
        // Enable touch scrolling
        document.body.style.webkitOverflowScrolling = 'touch';
        document.body.style.touchAction = 'pan-y';
        
        // Optimize scroll performance
        let ticking = false;
        
        function updateScrollElements() {
            // Add scroll-based optimizations here if needed
            ticking = false;
        }
        
        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(updateScrollElements);
                ticking = true;
            }
            
            // Fix marquees on scroll
            fixMarquees();
        }, { passive: true });
    }
    
    // ===== PERFORMANCE OPTIMIZATIONS =====
    function optimizePerformance() {
        // Performance monitoring without interference
        let performanceMetrics = {
            startTime: performance.now(),
            loadTime: 0
        };
        
        // Image lazy loading enhancement
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px'
            });

            lazyImages.forEach(img => {
                imageObserver.observe(img);
            });
        }
        
        // Optimize form interactions
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            const inputs = form.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                input.addEventListener('focus', function() {
                    this.style.borderColor = '#0369A1';
                }, { passive: true });
                
                input.addEventListener('blur', function() {
                    if (!this.value) {
                        this.style.borderColor = '';
                    }
                }, { passive: true });
            });
        });
        
        // Optimize button interactions
        const buttons = document.querySelectorAll('button, .btn, .apply-btn');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-1px)';
            }, { passive: true });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = '';
            }, { passive: true });
        });
        
        // Add resource hints for external domains
        const domains = [
            'https://cdnjs.cloudflare.com',
            'https://unpkg.com',
            'https://cdn.jsdelivr.net',
            'https://fonts.googleapis.com'
        ];
        
        domains.forEach(domain => {
            const link = document.createElement('link');
            link.rel = 'preconnect';
            link.href = domain;
            document.head.appendChild(link);
        });
        
        // Optimize testimonial section
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        testimonialCards.forEach(card => {
            card.style.transform = 'translateZ(0)'; // Force hardware acceleration
        });
        
        // Page load time
        window.addEventListener('load', () => {
            performanceMetrics.loadTime = performance.now() - performanceMetrics.startTime;
            console.log(`Page Load Time: ${performanceMetrics.loadTime.toFixed(2)}ms`);
        });
    }
    
    // ===== INITIALIZATION =====
    function init() {
        // Setup marquee styles
        setupMarqueeStyles();
        
        // Fix marquees
        fixMarquees();
        
        // Setup mobile menu
        setupMobileMenu();
        
        // Optimize scrolling
        optimizeScrolling();
        
        // Performance optimizations
        optimizePerformance();
        
        console.log('Consolidated scripts initialized');
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Also initialize on window load as backup
    window.addEventListener('load', function() {
        fixMarquees();
    });
    
    // Fix marquees when tab becomes visible
    document.addEventListener('visibilitychange', function() {
        if (document.visibilityState === 'visible') {
            fixMarquees();
        }
    });
})();