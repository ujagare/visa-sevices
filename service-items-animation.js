// Add animations to service items
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
    
    // Get all service items
    const serviceItems = document.querySelectorAll('.service-item');
    
    // Function to animate service items
    function animateServiceItems() {
        serviceItems.forEach(function(item, index) {
            if (isInViewport(item) && !item.classList.contains('animated')) {
                // Add animated class to prevent re-animation
                item.classList.add('animated');
                
                // Set initial opacity and transform
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                
                // Animate with delay based on index
                setTimeout(function() {
                    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 100 * index);
            }
        });
    }
    
    // Run animation on page load
    animateServiceItems();
    
    // Run animation on scroll
    window.addEventListener('scroll', animateServiceItems);
});