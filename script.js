// Wait for Lenis to be ready before using it
document.addEventListener('DOMContentLoaded', function() {
    // Listen for Lenis ready event
    window.addEventListener('lenisReady', function(event) {
        console.log('Lenis ready for script.js functionality');
        initializeSwiper();
    });

    // Initialize Lenis manually if event doesn't fire within 2 seconds
    setTimeout(function() {
        if (!window.lenis) {
            console.warn('Lenis not initialized after timeout, proceeding with other functionality');
            initializeSwiper();
        }
    }, 2000);

    // Swiper initialization
    function initializeSwiper() {
        if (typeof Swiper === 'undefined') {
            console.warn('Swiper not available');
            return;
        }

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

        // Initialize testimonials swiper if it exists
        if (document.querySelector('.testimonials-swiper')) {
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
                }
            });
        }
    }

    // Initialize other functionality that doesn't depend on Lenis
    initializeDropdowns();
    initializeReadMore();
    initializeContactForm();
    initializeButtons();
});

// Enhanced Dropdown Functionality
function initializeDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const dropdownContent = dropdown.querySelector('.dropdown-content');
        const dropdownLink = dropdown.querySelector('a');
        let hoverTimeout;
        let isDropdownOpen = false;

        // Function to show dropdown
        function showDropdown() {
            clearTimeout(hoverTimeout);
            if (dropdownContent) {
                dropdown.classList.add('active');
                dropdownContent.style.display = 'block';
                setTimeout(() => {
                    dropdownContent.style.opacity = '1';
                    dropdownContent.style.transform = 'translateY(0)';
                }, 10);
                isDropdownOpen = true;
            }
        }

        // Function to hide dropdown
        function hideDropdown() {
            hoverTimeout = setTimeout(() => {
                if (dropdownContent) {
                    dropdown.classList.remove('active');
                    dropdownContent.style.opacity = '0';
                    dropdownContent.style.transform = 'translateY(-15px)';
                    setTimeout(() => {
                        dropdownContent.style.display = 'none';
                        isDropdownOpen = false;
                    }, 300);
                }
            }, 100);
        }

        // Show dropdown on hover
        dropdown.addEventListener('mouseenter', function() {
            showDropdown();
        });

        // Show/hide dropdown on click
        if (dropdownLink) {
            dropdownLink.addEventListener('click', function(e) {
                e.preventDefault();
                if (isDropdownOpen) {
                    hideDropdown();
                } else {
                    showDropdown();
                }
            });
        }

        // Hide dropdown with delay on mouse leave
        dropdown.addEventListener('mouseleave', function() {
            hideDropdown();
        });

        // Keep dropdown open when hovering over content
        if (dropdownContent) {
            dropdownContent.addEventListener('mouseenter', function() {
                clearTimeout(hoverTimeout);
            });

            dropdownContent.addEventListener('mouseleave', function() {
                hideDropdown();
            });
        }

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!dropdown.contains(e.target)) {
                if (isDropdownOpen) {
                    hideDropdown();
                }
            }
        });
    });
}

// Read More functionality for testimonials
function initializeReadMore() {
    const readMoreBtns = document.querySelectorAll('.read-more-btn');

    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const testimonialText = this.previousElementSibling;

            if (testimonialText.classList.contains('truncated')) {
                // Expand text
                testimonialText.classList.remove('truncated');
                testimonialText.classList.add('expanded');
                this.textContent = 'Read Less';
            } else {
                // Collapse text
                testimonialText.classList.remove('expanded');
                testimonialText.classList.add('truncated');
                this.textContent = 'Read More';
            }
        });
    });
}

// Contact Form Functionality
function initializeContactForm() {
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
            
            // Submit the form
            contactForm.submit();
        });
    }
}

// Make buttons functional
function initializeButtons() {
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
}