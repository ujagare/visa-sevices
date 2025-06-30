// Swiper initialization
var swiper = new Swiper(".mySwiper", {
    spaceBetween: 0,
    centeredSlides: true,
    speed: 1000, // Smooth transition speed (1 second)
    effect: 'slide', // Smooth slide effect
    autoplay: {
      delay: 4000, // Slightly longer delay for better viewing
      disableOnInteraction: false,
    },
    loop: true, // Infinite loop for smooth continuous sliding
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    // Smooth easing
    on: {
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

// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const menuClose = document.getElementById('menu-close');
    const mobileMenu = document.getElementById('mobile-menu');

    console.log('Mobile menu elements:', { menuToggle, menuClose, mobileMenu });

    if (menuToggle && mobileMenu) {
        // Open mobile menu
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Menu toggle clicked');
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (menuClose && mobileMenu) {
        // Close mobile menu
        menuClose.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Menu close clicked');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    if (mobileMenu) {
        // Close menu when clicking outside
        mobileMenu.addEventListener('click', function(e) {
            if (e.target === mobileMenu) {
                console.log('Clicked outside menu');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });

        // Close menu when clicking on nav links
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                console.log('Nav link clicked');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
    }

    // Testimonials Swiper (Slider Layout)
    const testimonialsSwiper = new Swiper('.testimonials-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        centeredSlides: false,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        speed: 800,
        effect: 'slide',

        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 20
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 25
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30
            },
            1200: {
                slidesPerView: 3,
                spaceBetween: 30
            }
        },
        on: {
            init: function () {
                console.log('Testimonials Swiper initialized');
            }
        }
    });
});