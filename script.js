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

    // Contact Form Functionality
    const contactForm = document.querySelector('.contact-form-wrapper');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const firstName = formData.get('firstName');
            const lastName = formData.get('lastName');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const subject = formData.get('subject');
            const message = formData.get('message');
            const privacy = formData.get('privacy');
            
            // Validation
            if (!firstName || !lastName || !email || !subject || !message || !privacy) {
                alert('Please fill all required fields and accept privacy policy.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Show loading state
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="ri-loader-4-line"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual backend integration)
            setTimeout(() => {
                // Success message
                alert('Thank you for your message! We will contact you soon.');
                
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Optional: Send to WhatsApp
                const whatsappMessage = `New Contact Form Submission:\n\nName: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phone}\nSubject: ${subject}\nMessage: ${message}`;
                const whatsappUrl = `https://wa.me/919130448831?text=${encodeURIComponent(whatsappMessage)}`;
                
                // Ask user if they want to continue on WhatsApp
                if (confirm('Would you like to continue this conversation on WhatsApp?')) {
                    window.open(whatsappUrl, '_blank');
                }
            }, 2000);
        });
    }

    // Make Apply Now buttons functional
    const applyButtons = document.querySelectorAll('button:contains("Apply Now"), .mobile-apply-btn, .apply-btn');
    applyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            // Scroll to contact form
            document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Make consultation button functional
    const consultationBtn = document.querySelector('.hero-text button');
    if (consultationBtn) {
        consultationBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Direct to WhatsApp for free consultation
            const whatsappUrl = 'https://wa.me/919130448831?text=Hi, I would like to book a free visa consultation.';
            window.open(whatsappUrl, '_blank');
        });
    }
});