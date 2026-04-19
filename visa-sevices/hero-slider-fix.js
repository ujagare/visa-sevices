// Hero Slider Fix
// This script ensures the hero slider is properly initialized

document.addEventListener('DOMContentLoaded', function() {
    console.log('Hero slider fix loading...');
    
    // Initialize the hero slider
    function initHeroSlider() {
        if (typeof Swiper === 'undefined') {
            console.warn('Swiper not available, retrying in 500ms');
            setTimeout(initHeroSlider, 500);
            return;
        }
        
        console.log('Initializing hero slider');
        
        // Initialize the hero slider
        var heroSwiper = new Swiper(".mySwiper", {
            spaceBetween: 0,
            centeredSlides: true,
            speed: 1000,
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
                init: function() {
                    console.log('Hero slider initialized');
                    // Make sure slide content is visible
                    document.querySelectorAll('.slide-content').forEach(content => {
                        content.style.opacity = '0';
                    });
                    
                    // Show the active slide content
                    setTimeout(() => {
                        const activeSlide = document.querySelector('.swiper-slide-active .slide-content');
                        if (activeSlide) {
                            activeSlide.style.transition = 'all 0.6s ease';
                            activeSlide.style.opacity = '1';
                            activeSlide.style.transform = 'translateY(0)';
                        }
                    }, 100);
                },
                slideChangeTransitionStart: function () {
                    // Add smooth fade effect to content
                    document.querySelectorAll('.slide-content').forEach(content => {
                        content.style.opacity = '0';
                        content.style.transform = 'translateY(20px)';
                    });
                },
                slideChangeTransitionEnd: function () {
                    // Fade in content smoothly
                    const activeSlide = document.querySelector('.swiper-slide-active .slide-content');
                    if (activeSlide) {
                        activeSlide.style.transition = 'all 0.6s ease';
                        activeSlide.style.opacity = '1';
                        activeSlide.style.transform = 'translateY(0)';
                    }
                }
            }
        });
        
        return heroSwiper;
    }
    
    // Try to initialize immediately
    let heroSwiper = initHeroSlider();
    
    // If it fails, try again when window loads
    if (!heroSwiper) {
        window.addEventListener('load', function() {
            initHeroSlider();
        });
    }
});