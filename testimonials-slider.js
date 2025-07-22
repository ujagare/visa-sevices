// Testimonials Slider Initialization
document.addEventListener('DOMContentLoaded', function() {
    console.log('Testimonials slider initializing...');
    
    // Initialize the testimonials slider
    function initTestimonialsSlider() {
        if (typeof Swiper === 'undefined') {
            console.warn('Swiper not available, retrying in 500ms');
            setTimeout(initTestimonialsSlider, 500);
            return;
        }
        
        console.log('Initializing testimonials slider');
        
        // Initialize the testimonials slider
        var testimonialsSwiper = new Swiper(".testimonials-swiper", {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            // pagination removed as requested
            // navigation removed as requested
            breakpoints: {
                640: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
            },
            on: {
                init: function() {
                    console.log('Testimonials slider initialized');
                },
                resize: function() {
                    // Update swiper on resize to fix any layout issues
                    this.update();
                }
            }
        });
        
        // Handle "Read More" buttons
        document.querySelectorAll('.read-more-btn').forEach(button => {
            button.addEventListener('click', function() {
                const testimonialText = this.previousElementSibling;
                
                if (testimonialText.classList.contains('truncated')) {
                    testimonialText.classList.remove('truncated');
                    this.textContent = 'Read Less';
                } else {
                    testimonialText.classList.add('truncated');
                    this.textContent = 'Read More';
                }
                
                // Update Swiper to recalculate heights
                testimonialsSwiper.update();
            });
        });
        
        return testimonialsSwiper;
    }
    
    // Try to initialize immediately
    let testimonialsSwiper = initTestimonialsSlider();
    
    // If it fails, try again when window loads
    if (!testimonialsSwiper) {
        window.addEventListener('load', function() {
            initTestimonialsSlider();
        });
    }
});