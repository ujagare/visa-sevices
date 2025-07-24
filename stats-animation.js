// Stats counter animation
document.addEventListener('DOMContentLoaded', function() {
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Function to animate counting
    function animateCounter(element, target, duration) {
        let start = 0;
        const increment = target / (duration / 16); // 60fps
        
        function updateCount() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start) + '+';
                requestAnimationFrame(updateCount);
            } else {
                element.textContent = target + '+';
            }
        }
        
        updateCount();
    }
    
    // Get all stat items
    const statItems = document.querySelectorAll('.service-stats .stat-item h4');
    let animated = false;
    
    // Function to check and animate stats
    function checkAndAnimateStats() {
        if (!animated && statItems.length > 0 && isInViewport(statItems[0])) {
            animated = true;
            
            // Animate each stat
            statItems.forEach(stat => {
                const targetValue = parseInt(stat.textContent);
                stat.textContent = '0+';
                
                // Different duration based on value
                let duration = 1500;
                if (targetValue > 1000) duration = 2000;
                if (targetValue > 4000) duration = 2500;
                
                animateCounter(stat, targetValue, duration);
            });
        }
    }
    
    // Check on scroll
    window.addEventListener('scroll', checkAndAnimateStats);
    
    // Check on initial load
    checkAndAnimateStats();
});