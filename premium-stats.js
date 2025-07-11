// Premium Stats Animation
document.addEventListener('DOMContentLoaded', function() {
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }

    // Function to animate counter with easing
    function animateCounter(element, target, duration) {
        let start = 0;
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            
            // Easing function for smoother animation
            const easedProgress = 1 - Math.pow(1 - progress, 3); // Cubic ease-out
            
            const currentValue = Math.floor(easedProgress * target);
            element.textContent = currentValue;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
                // Add class for final animation
                element.classList.add('counted');
            }
        }
        
        requestAnimationFrame(updateCounter);
    }

    // Get all premium stat numbers
    const statNumbers = document.querySelectorAll('.premium-stat-number');
    let animated = false;

    // Function to start animation if stats are in viewport
    function checkAndAnimate() {
        if (!animated && statNumbers.length > 0) {
            const statsSection = document.querySelector('.premium-cta-stats');
            if (statsSection && isInViewport(statsSection)) {
                // Add visible class to the wrapper for entrance animation
                statsSection.classList.add('visible');
                
                // Animate each number with slight delay between them
                statNumbers.forEach(function(statNumber, index) {
                    // Extract the number from the text content
                    let target = statNumber.textContent;
                    if (target.includes('+')) {
                        target = target.replace('+', '');
                    }
                    target = parseInt(target);
                    
                    // Reset the content to 0 before animation
                    statNumber.textContent = '0';
                    
                    setTimeout(() => {
                        animateCounter(statNumber, target, 2000);
                    }, index * 200); // 200ms delay between each counter
                });
                
                animated = true;
                // Remove scroll event listener once animation is triggered
                window.removeEventListener('scroll', checkAndAnimate);
            }
        }
    }

    // Add parallax effect to the CTA section
    function parallaxEffect() {
        const ctaSection = document.querySelector('.premium-cta-section');
        if (ctaSection) {
            const scrollPosition = window.pageYOffset;
            const sectionTop = ctaSection.offsetTop;
            const sectionHeight = ctaSection.offsetHeight;
            
            if (scrollPosition > sectionTop - window.innerHeight && 
                scrollPosition < sectionTop + sectionHeight) {
                const yPos = -(scrollPosition - sectionTop) * 0.2;
                ctaSection.style.backgroundPosition = `center ${yPos}px`;
            }
        }
    }

    // Check on scroll
    window.addEventListener('scroll', checkAndAnimate);
    window.addEventListener('scroll', parallaxEffect);
    
    // Also check on page load after a short delay
    setTimeout(checkAndAnimate, 1000);
    
    // Add animation to form elements
    const formRows = document.querySelectorAll('.premium-form-row');
    formRows.forEach((row, index) => {
        row.style.opacity = '0';
        row.style.transform = 'translateY(20px)';
        row.style.transition = 'all 0.5s ease';
        row.style.transitionDelay = `${index * 0.1 + 0.2}s`;
        
        setTimeout(() => {
            row.style.opacity = '1';
            row.style.transform = 'translateY(0)';
        }, 100);
    });
    
    // Add animation to submit button
    const submitBtn = document.querySelector('.premium-submit');
    if (submitBtn) {
        submitBtn.style.opacity = '0';
        submitBtn.style.transform = 'translateY(20px)';
        submitBtn.style.transition = 'all 0.5s ease';
        submitBtn.style.transitionDelay = '0.6s';
        
        setTimeout(() => {
            submitBtn.style.opacity = '1';
            submitBtn.style.transform = 'translateY(0)';
        }, 100);
    }
});