// Add hover effects to service items
document.addEventListener('DOMContentLoaded', function() {
    // Get all service items
    const serviceItems = document.querySelectorAll('.service-item');
    
    // Add hover effect to each service item
    serviceItems.forEach(function(item) {
        // Get the icon element
        const icon = item.querySelector('.service-icon-small');
        
        // Add mouseenter event listener
        item.addEventListener('mouseenter', function() {
            // Add scale animation to icon
            if (icon) {
                icon.style.transform = 'scale(1.1)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        // Add mouseleave event listener
        item.addEventListener('mouseleave', function() {
            // Remove scale animation from icon
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });
});