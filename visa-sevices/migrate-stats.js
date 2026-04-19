// Counter animation for statistics
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

    // Get all stat numbers
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;

    // Function to start animation if stats are in viewport
    function checkAndAnimate() {
        if (!animated && statNumbers.length > 0) {
            const statsSection = document.querySelector('.migration-stats-wrapper');
            if (statsSection && isInViewport(statsSection)) {
                // Animate each number with slight delay between them
                statNumbers.forEach(function(statNumber, index) {
                    const target = parseInt(statNumber.getAttribute('data-count'));
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

    // Check on scroll
    window.addEventListener('scroll', checkAndAnimate);
    
    // Also check on page load after a short delay
    setTimeout(checkAndAnimate, 1000);
});