// Lenis is now initialized by universal-lenis.js
// Wait for Lenis to be ready before using it
window.addEventListener('lenisReady', function(event) {
    console.log('Lenis ready for script.js functionality');
});


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

// Enhanced Dropdown Functionality
document.addEventListener('DOMContentLoaded', function() {
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

// Mobile Menu Functionality
function initializeMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const menuClose = document.getElementById('menu-close');
    const mobileMenu = document.getElementById('mobile-menu');

    console.log('Mobile menu elements found:', { menuToggle, menuClose, mobileMenu });

    // Function to open mobile menu
    function openMobileMenu() {
        if (mobileMenu) {
            console.log('Opening mobile menu');
            mobileMenu.classList.add('active');
            mobileMenu.style.display = 'block';
            document.body.style.overflow = 'hidden';

            // Force reflow and add smooth animation
            mobileMenu.offsetHeight;
            setTimeout(() => {
                mobileMenu.style.top = '0';
            }, 10);
        }
    }

    // Function to close mobile menu
    function closeMobileMenu() {
        if (mobileMenu) {
            console.log('Closing mobile menu');
            mobileMenu.style.top = '-100%';
            document.body.style.overflow = 'auto';

            // Hide after animation completes
            setTimeout(() => {
                mobileMenu.classList.remove('active');
                if (mobileMenu.style.display !== 'none') {
                    mobileMenu.style.display = 'none';
                }
            }, 400);
        }
    }

    if (menuToggle) {
        // Open mobile menu
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Menu toggle clicked');
            openMobileMenu();
        });
    }

    if (menuClose) {
        // Close mobile menu
        menuClose.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Menu close clicked');
            closeMobileMenu();
        });
    }

    // Enhanced outside click detection
    document.addEventListener('click', function(e) {
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            if (!mobileMenu.contains(e.target) && !menuToggle?.contains(e.target)) {
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

        // Close menu when clicking on nav links
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                console.log('Nav link clicked');
                closeMobileMenu();
            });
        });
    }
}

// Initialize mobile menu in multiple ways to ensure it works
document.addEventListener('DOMContentLoaded', initializeMobileMenu);
window.addEventListener('load', initializeMobileMenu);

// Also try immediate initialization
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeMobileMenu);
} else {
    initializeMobileMenu();
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
    const applyButtons = document.querySelectorAll('.mobile-apply-btn, .apply-btn');
    const navButtons = document.querySelectorAll('nav button, nav button a');

    // Handle apply buttons
    applyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            // Scroll to contact form
            document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Handle navigation buttons
    navButtons.forEach(button => {
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

    // Read More functionality for testimonials
    function initReadMore() {
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

    // Initialize read more functionality
    initReadMore();

    // Re-initialize after swiper updates
    setTimeout(() => {
        initReadMore();
    }, 1000);

    // Stats Counter Animation
    function animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');

        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statNumber = entry.target;
                    const finalValue = statNumber.getAttribute('data-count');
                    const isPercentage = statNumber.textContent.includes('%');
                    const hasPlus = statNumber.textContent.includes('+');

                    let currentValue = 0;
                    const increment = finalValue / 50; // 50 steps for smooth animation

                    const timer = setInterval(() => {
                        currentValue += increment;

                        if (currentValue >= finalValue) {
                            currentValue = finalValue;
                            clearInterval(timer);
                        }

                        let displayValue = Math.floor(currentValue);

                        if (isPercentage) {
                            statNumber.textContent = displayValue + '%';
                        } else if (hasPlus) {
                            statNumber.textContent = displayValue + '+';
                        } else {
                            statNumber.textContent = displayValue;
                        }
                    }, 30);

                    observer.unobserve(statNumber);
                }
            });
        }, observerOptions);

        statNumbers.forEach(statNumber => {
            observer.observe(statNumber);
        });
    }

    // Initialize stats animation
    animateStats();

    // Enhanced Contact Form Validation and Submission
    const visaContactForm = document.getElementById('visaContact');
    if (visaContactForm) {
        // Real-time validation
        const inputs = visaContactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearError);
        });

        function validateField(e) {
            const field = e.target;
            const fieldContainer = field.closest('.field');
            const errorMessage = fieldContainer.querySelector('.error-message');

            // Clear previous error
            fieldContainer.classList.remove('error');
            errorMessage.textContent = '';

            // Validate required fields
            if (field.hasAttribute('required') && !field.value.trim()) {
                showError(fieldContainer, 'This field is required');
                return false;
            }

            // Email validation
            if (field.type === 'email' && field.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(field.value)) {
                    showError(fieldContainer, 'Please enter a valid email address');
                    return false;
                }
            }

            // Phone validation
            if (field.type === 'tel' && field.value) {
                const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
                if (!phoneRegex.test(field.value)) {
                    showError(fieldContainer, 'Please enter a valid phone number');
                    return false;
                }
            }

            // File validation
            if (field.type === 'file' && field.files.length > 0) {
                const file = field.files[0];
                const maxSize = 5 * 1024 * 1024; // 5MB
                const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];

                if (file.size > maxSize) {
                    showError(fieldContainer, 'File size must be less than 5MB');
                    return false;
                }

                if (!allowedTypes.includes(file.type)) {
                    showError(fieldContainer, 'Only PDF, JPG, and PNG files are allowed');
                    return false;
                }
            }

            return true;
        }

        function showError(fieldContainer, message) {
            fieldContainer.classList.add('error');
            const errorMessage = fieldContainer.querySelector('.error-message');
            errorMessage.textContent = message;
        }

        function clearError(e) {
            const fieldContainer = e.target.closest('.field');
            fieldContainer.classList.remove('error');
            const errorMessage = fieldContainer.querySelector('.error-message');
            errorMessage.textContent = '';
        }

        // Form submission
        visaContactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Validate all fields
            let isValid = true;
            inputs.forEach(input => {
                if (!validateField({ target: input })) {
                    isValid = false;
                }
            });

            if (!isValid) {
                return;
            }

            const data = new FormData(visaContactForm);
            console.log('Form Data Submitted:', Object.fromEntries(data.entries()));

            // Show loading state
            const submitBtn = visaContactForm.querySelector('.btn-submit');
            const originalHTML = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="ri-loader-4-line"></i> Submitting...';
            submitBtn.disabled = true;

            // Simulate form submission
            setTimeout(() => {
                // Hide form and show success card
                visaContactForm.style.display = 'none';
                const successCard = document.querySelector('.success-card');
                successCard.style.display = 'block';
                successCard.style.animation = 'fadeIn 0.5s ease-in';

                // Optional: Send to WhatsApp
                const formData = Object.fromEntries(data.entries());
                const whatsappMessage = `New Visa Application:\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nCountry: ${formData.country}\nVisa Type: ${formData.visaType}\nTravel Date: ${formData.travelDate}\nTravelers: ${formData.travelers}\nNotes: ${formData.notes}`;
                const whatsappUrl = `https://wa.me/919130448831?text=${encodeURIComponent(whatsappMessage)}`;

                // Auto-redirect to WhatsApp after 3 seconds
                setTimeout(() => {
                    if (confirm('Would you like to continue this conversation on WhatsApp for faster processing?')) {
                        window.open(whatsappUrl, '_blank');
                    }
                }, 3000);
            }, 2000);
        });
    }

    // Function to show form again (for new request button)
    window.showForm = function() {
        const form = document.getElementById('visaContact');
        const successCard = document.querySelector('.success-card');

        form.style.display = 'grid';
        successCard.style.display = 'none';
        form.reset();

        // Clear all errors
        const fields = form.querySelectorAll('.field');
        fields.forEach(field => {
            field.classList.remove('error');
            const errorMessage = field.querySelector('.error-message');
            errorMessage.textContent = '';
        });

        // Reset button
        const submitBtn = form.querySelector('.btn-submit');
        submitBtn.innerHTML = '<i class="ri-send-plane-line"></i> Submit Request';
        submitBtn.disabled = false;
    };

    // File input enhancement
    const fileInput = document.getElementById('docs');
    if (fileInput) {
        fileInput.addEventListener('change', function() {
            const fileText = this.closest('.input-container').querySelector('.file-text');
            if (this.files.length > 0) {
                fileText.textContent = this.files[0].name;
                fileText.style.color = '#000080';
            } else {
                fileText.textContent = 'Choose file or drag here';
                fileText.style.color = '#666';
            }
        });
    }

    // About Page Counter Animation
    const counters = document.querySelectorAll('.count');
    if (counters.length > 0) {
        counters.forEach(el => {
            const target = +el.dataset.target;
            let count = 0;
            const step = Math.ceil(target / 200);

            const updateCounter = () => {
                count += step;
                if (count >= target) {
                    el.textContent = target;
                } else {
                    el.textContent = count;
                    requestAnimationFrame(updateCounter);
                }
            };

            // Start animation when element is in view
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        observer.unobserve(entry.target);
                    }
                });
            });

            observer.observe(el);
        });
    }
});