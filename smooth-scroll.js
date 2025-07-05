// Smooth Scroll Implementation with Locomotive Scroll and GSAP
class SmoothScrollManager {
    constructor() {
        this.scroll = null;
        this.init();
    }

    init() {
        // Register GSAP ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);

        // Initialize Locomotive Scroll
        this.initLocomotiveScroll();

        // Setup GSAP animations
        this.setupAnimations();

        // Setup scroll-triggered animations
        this.setupScrollAnimations();
    }

    initLocomotiveScroll() {
        this.scroll = new LocomotiveScroll({
            el: document.querySelector('[data-scroll-container]'),
            smooth: true,
            multiplier: 1,
            class: 'is-revealed',
            scrollbarContainer: false,
            scrollbarClass: 'c-scrollbar',
            scrollingClass: 'has-scroll-scrolling',
            draggingClass: 'has-scroll-dragging',
            smoothClass: 'has-scroll-smooth',
            initClass: 'has-scroll-init',
            getSpeed: true,
            getDirection: true,
            scrollFromAnywhere: false,
            smartphone: {
                smooth: true
            },
            tablet: {
                smooth: true
            }
        });

        // Update ScrollTrigger when Locomotive Scroll updates
        this.scroll.on('scroll', ScrollTrigger.update);

        // Tell ScrollTrigger to use these proxy methods for the "[data-scroll-container]" element
        ScrollTrigger.scrollerProxy('[data-scroll-container]', {
            scrollTop(value) {
                return arguments.length ? this.scroll.scrollTo(value, 0, 0) : this.scroll.scroll.instance.scroll.y;
            }.bind(this),
            getBoundingClientRect() {
                return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
            },
            pinType: document.querySelector('[data-scroll-container]').style.transform ? 'transform' : 'fixed'
        });

        // Refresh ScrollTrigger and update LocomotiveScroll
        ScrollTrigger.addEventListener('refresh', () => this.scroll.update());
        ScrollTrigger.refresh();
    }

    setupAnimations() {
        // Hero section animations
        this.animateHero();
        
        // Services section animations
        this.animateServices();
        
        // Stats animations
        this.animateStats();
        
        // Testimonials animations
        this.animateTestimonials();
        
        // Footer animations
        this.animateFooter();
    }

    animateHero() {
        // Hero content fade in
        gsap.from('.hero h1', {
            duration: 1.2,
            y: 100,
            opacity: 0,
            ease: 'power3.out',
            delay: 0.5
        });

        gsap.from('.hero p', {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power3.out',
            delay: 0.8
        });

        gsap.from('.hero .btn', {
            duration: 1,
            y: 30,
            opacity: 0,
            ease: 'power3.out',
            delay: 1.1
        });

        // Slider animation
        gsap.from('.slider', {
            duration: 1.5,
            scale: 0.8,
            opacity: 0,
            ease: 'power3.out',
            delay: 0.3
        });
    }

    animateServices() {
        // Service cards stagger animation
        gsap.from('.service-item', {
            scrollTrigger: {
                trigger: '.services-section',
                scroller: '[data-scroll-container]',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            duration: 0.8,
            y: 60,
            opacity: 0,
            stagger: 0.2,
            ease: 'power3.out'
        });

        // Service stats animation
        gsap.from('.stat-item', {
            scrollTrigger: {
                trigger: '.service-stats',
                scroller: '[data-scroll-container]',
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            duration: 0.6,
            y: 40,
            opacity: 0,
            stagger: 0.15,
            ease: 'power3.out'
        });
    }

    animateStats() {
        // Animate numbers counting up
        const statNumbers = document.querySelectorAll('.stat-item h4');
        
        statNumbers.forEach(stat => {
            const finalValue = stat.textContent;
            const numericValue = parseInt(finalValue.replace(/\D/g, ''));
            
            if (numericValue) {
                gsap.from(stat, {
                    scrollTrigger: {
                        trigger: stat,
                        scroller: '[data-scroll-container]',
                        start: 'top 90%',
                        toggleActions: 'play none none reverse'
                    },
                    duration: 2,
                    textContent: 0,
                    roundProps: 'textContent',
                    ease: 'power2.out',
                    onUpdate: function() {
                        const currentValue = Math.ceil(this.targets()[0].textContent);
                        if (finalValue.includes('+')) {
                            stat.textContent = currentValue + '+';
                        } else if (finalValue.includes('%')) {
                            stat.textContent = currentValue + '%';
                        } else {
                            stat.textContent = currentValue;
                        }
                    }
                });
            }
        });
    }

    animateTestimonials() {
        gsap.from('.testimonial-card', {
            scrollTrigger: {
                trigger: '.testimonials-section',
                scroller: '[data-scroll-container]',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            duration: 0.8,
            y: 50,
            opacity: 0,
            stagger: 0.2,
            ease: 'power3.out'
        });
    }

    animateFooter() {
        gsap.from('.footer-content > div', {
            scrollTrigger: {
                trigger: 'footer',
                scroller: '[data-scroll-container]',
                start: 'top 90%',
                toggleActions: 'play none none reverse'
            },
            duration: 0.6,
            y: 30,
            opacity: 0,
            stagger: 0.1,
            ease: 'power3.out'
        });
    }

    setupScrollAnimations() {
        // Parallax effect for hero background
        gsap.to('.hero', {
            scrollTrigger: {
                trigger: '.hero',
                scroller: '[data-scroll-container]',
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            },
            y: -100,
            ease: 'none'
        });

        // Scale effect for images
        const images = document.querySelectorAll('.sets-apart-image img, .service-image img');
        images.forEach(img => {
            gsap.from(img, {
                scrollTrigger: {
                    trigger: img,
                    scroller: '[data-scroll-container]',
                    start: 'top 85%',
                    end: 'bottom 15%',
                    scrub: 1
                },
                scale: 1.2,
                ease: 'none'
            });
        });

        // Fade in sections
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            gsap.from(section, {
                scrollTrigger: {
                    trigger: section,
                    scroller: '[data-scroll-container]',
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                duration: 1,
                y: 50,
                opacity: 0,
                ease: 'power3.out'
            });
        });
    }

    // Method to scroll to specific element
    scrollTo(target) {
        if (this.scroll) {
            this.scroll.scrollTo(target);
        }
    }

    // Method to update scroll
    update() {
        if (this.scroll) {
            this.scroll.update();
        }
    }

    // Method to destroy scroll
    destroy() {
        if (this.scroll) {
            this.scroll.destroy();
        }
    }
}

// Initialize smooth scroll when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait for all images to load
    window.addEventListener('load', () => {
        const smoothScroll = new SmoothScrollManager();
        
        // Make it globally accessible
        window.smoothScroll = smoothScroll;
        
        // Update scroll on window resize
        window.addEventListener('resize', () => {
            smoothScroll.update();
        });
    });
});

// Smooth scroll for navigation links
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            
            if (target && window.smoothScroll) {
                window.smoothScroll.scrollTo(target);
            }
        });
    });
});
