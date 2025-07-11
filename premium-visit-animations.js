// Premium Visit Page Animations
document.addEventListener('DOMContentLoaded', function() {
    // Create particle elements for hero background
    const heroParticles = document.querySelector('.hero-particles');
    if (heroParticles) {
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Random size between 10px and 80px
            const size = Math.random() * 70 + 10;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Random position
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            // Random animation delay
            particle.style.animationDelay = `${Math.random() * 15}s`;
            
            // Random opacity
            particle.style.opacity = `${Math.random() * 0.1 + 0.02}`;
            
            heroParticles.appendChild(particle);
        }
    }
    
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
    const statNumbers = document.querySelectorAll('.premium-stat-number');
    let animated = false;
    
    // Function to start animation if stats are in viewport
    function checkAndAnimate() {
        if (!animated && statNumbers.length > 0) {
            const statsSection = document.querySelector('.premium-hero-stats');
            if (statsSection && isInViewport(statsSection)) {
                // Animate each number with slight delay between them
                statNumbers.forEach(function(statNumber, index) {
                    // Extract the number from the text content
                    let target = statNumber.textContent;
                    if (target.includes('K+')) {
                        target = target.replace('K+', '');
                        target = parseInt(target) * 1000;
                    } else if (target.includes('+')) {
                        target = target.replace('+', '');
                        target = parseInt(target);
                    } else if (target.includes('-')) {
                        const range = target.split('-');
                        target = parseInt(range[1]);
                    } else {
                        target = parseInt(target);
                    }
                    
                    // Reset the content to 0 before animation
                    const originalText = statNumber.textContent;
                    statNumber.textContent = '0';
                    
                    setTimeout(() => {
                        animateCounter(statNumber, target, 2000);
                        // After animation completes, restore original format
                        setTimeout(() => {
                            if (originalText.includes('K+')) {
                                statNumber.textContent = originalText;
                            } else if (originalText.includes('+')) {
                                statNumber.textContent = originalText;
                            } else if (originalText.includes('-')) {
                                statNumber.textContent = originalText;
                            }
                        }, 2000);
                    }, index * 200); // 200ms delay between each counter
                });
                
                animated = true;
                // Remove scroll event listener once animation is triggered
                window.removeEventListener('scroll', checkAndAnimate);
            }
        }
    }
    
    // Add scroll animations
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
    
    function checkScroll() {
        animatedElements.forEach(element => {
            if (isInViewport(element)) {
                element.classList.add('visible');
            }
        });
        
        checkAndAnimate();
    }
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);
    
    // Check on page load
    setTimeout(checkScroll, 100);
    
    // Add animation to form elements
    const formGroups = document.querySelectorAll('.premium-form-group');
    formGroups.forEach((group, index) => {
        group.style.opacity = '0';
        group.style.transform = 'translateY(20px)';
        group.style.transition = 'all 0.5s ease';
        group.style.transitionDelay = `${index * 0.1 + 0.2}s`;
        
        setTimeout(() => {
            group.style.opacity = '1';
            group.style.transform = 'translateY(0)';
        }, 100);
    });
    
    // Add parallax effect to hero section
    const heroSection = document.querySelector('.premium-hero-section');
    const heroContent = document.querySelector('.premium-hero-content');
    
    window.addEventListener('scroll', function() {
        if (heroSection && heroContent) {
            const scrollPosition = window.pageYOffset;
            const translateY = scrollPosition * 0.3;
            heroContent.style.transform = `translateY(${translateY}px)`;
        }
    });
});