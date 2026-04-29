// Simple Performance Boost - Non-intrusive optimizations
(function() {
    'use strict';

    // Performance monitoring without interference
    let performanceMetrics = {
        startTime: performance.now(),
        loadTime: 0
    };

    // Image lazy loading enhancement
    function enhanceImageLoading() {
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
    }

    // Optimize form interactions
    function optimizeFormInteractions() {
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
    }

    // Optimize scroll performance
    function optimizeScrolling() {
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
        }, { passive: true });
    }

    // Preload critical resources
    function preloadCriticalResources() {
        const criticalImages = [
            'images/logo/WING LOGO.png'
        ];
        
        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }

    // Monitor Core Web Vitals (non-intrusive)
    function monitorPerformance() {
        // First Contentful Paint
        if ('PerformanceObserver' in window) {
            try {
                new PerformanceObserver((entryList) => {
                    for (const entry of entryList.getEntries()) {
                        if (entry.name === 'first-contentful-paint') {
                            console.log(`FCP: ${entry.startTime.toFixed(2)}ms`);
                        }
                    }
                }).observe({ entryTypes: ['paint'] });
            } catch (e) {
                // Silently fail if not supported
            }
        }
        
        // Page load time
        window.addEventListener('load', () => {
            performanceMetrics.loadTime = performance.now() - performanceMetrics.startTime;
            console.log(`Page Load Time: ${performanceMetrics.loadTime.toFixed(2)}ms`);
        });
    }

    // Optimize button interactions
    function optimizeButtons() {
        const buttons = document.querySelectorAll('button, .btn, .apply-btn');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-1px)';
            }, { passive: true });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = '';
            }, { passive: true });
        });
    }

    // Optimize mobile menu performance
    function optimizeMobileMenu() {
        const mobileToggle = document.querySelector('.simple-hamburger');
        const mobileMenu = document.querySelector('.mobile-menu-sidebar');
        const overlay = document.querySelector('.mobile-menu-overlay');
        
        if (mobileToggle && mobileMenu) {
            mobileToggle.addEventListener('click', function() {
                mobileMenu.style.transform = 'translateX(0)';
                if (overlay) overlay.classList.add('active');
            }, { passive: true });
        }
        
        const closeBtn = document.querySelector('.mobile-menu-close');
        if (closeBtn && mobileMenu) {
            closeBtn.addEventListener('click', function() {
                mobileMenu.style.transform = 'translateX(-100%)';
                if (overlay) overlay.classList.remove('active');
            }, { passive: true });
        }
    }

    // Add resource hints for external domains
    function addResourceHints() {
        const domains = [
            'https://cdnjs.cloudflare.com',
            'https://unpkg.com',
            'https://cdn.jsdelivr.net',
            'https://fonts.cdnfonts.com'
        ];
        
        domains.forEach(domain => {
            const link = document.createElement('link');
            link.rel = 'preconnect';
            link.href = domain;
            document.head.appendChild(link);
        });
    }

    // Optimize testimonial section
    function optimizeTestimonials() {
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        testimonialCards.forEach(card => {
            card.style.transform = 'translateZ(0)'; // Force hardware acceleration
        });
    }

    // Initialize all optimizations
    function init() {
        // Run immediately
        addResourceHints();
        preloadCriticalResources();
        
        // Run when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                enhanceImageLoading();
                optimizeFormInteractions();
                optimizeScrolling();
                optimizeButtons();
                optimizeMobileMenu();
                optimizeTestimonials();
                monitorPerformance();
            });
        } else {
            enhanceImageLoading();
            optimizeFormInteractions();
            optimizeScrolling();
            optimizeButtons();
            optimizeMobileMenu();
            optimizeTestimonials();
            monitorPerformance();
        }
    }

    // Start optimizations
    init();

    // Export for debugging
    window.performanceBoost = {
        metrics: performanceMetrics,
        reinit: init
    };

})();
