// Optimized JavaScript - Minified and Performance Enhanced
(function(){
'use strict';

// Performance optimized initialization
const initApp = () => {
    // Swiper initialization - optimized
    if (typeof Swiper !== 'undefined') {
        const swiper = new Swiper(".mySwiper", {
            spaceBetween: 0,
            centeredSlides: true,
            speed: 800,
            effect: 'slide',
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            loop: true,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            on: {
                slideChangeTransitionStart() {
                    const contents = document.querySelectorAll('.slide-content');
                    contents.forEach(content => {
                        content.style.opacity = '0';
                        content.style.transform = 'translateY(20px)';
                    });
                },
                slideChangeTransitionEnd() {
                    const activeSlide = document.querySelector('.swiper-slide-active .slide-content');
                    if (activeSlide) {
                        activeSlide.style.transition = 'all 0.6s ease';
                        activeSlide.style.opacity = '1';
                        activeSlide.style.transform = 'translateY(0)';
                    }
                }
            }
        });
    }

    // Dropdown functionality - optimized
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const content = dropdown.querySelector('.dropdown-content');
        const link = dropdown.querySelector('a');
        
        if (content && link) {
            let timeout;
            
            const showDropdown = () => {
                clearTimeout(timeout);
                content.style.display = 'block';
                content.style.opacity = '1';
                content.style.transform = 'translateY(0)';
            };
            
            const hideDropdown = () => {
                timeout = setTimeout(() => {
                    content.style.opacity = '0';
                    content.style.transform = 'translateY(-10px)';
                    setTimeout(() => content.style.display = 'none', 200);
                }, 100);
            };
            
            dropdown.addEventListener('mouseenter', showDropdown);
            dropdown.addEventListener('mouseleave', hideDropdown);
            link.addEventListener('click', (e) => {
                e.preventDefault();
                content.style.display === 'block' ? hideDropdown() : showDropdown();
            });
        }
    });

    // Mobile menu functionality - optimized
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileClose = document.querySelector('.mobile-menu-close');
    
    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (mobileClose && mobileMenu) {
        mobileClose.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    // Form validation - optimized
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    input.style.borderColor = '#ef4444';
                    isValid = false;
                } else {
                    input.style.borderColor = '#10b981';
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('Please fill in all required fields.');
            }
        });
    });

    // Smooth scroll for anchor links - optimized
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for animations - optimized
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const animateElements = document.querySelectorAll('.card, .section-title, .feature-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    // Performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log(`Page load time: ${perfData.loadEventEnd - perfData.loadEventStart}ms`);
        });
    }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

// Wait for Lenis if available
window.addEventListener('lenisReady', () => {
    console.log('Lenis ready for optimized script functionality');
});

})();
