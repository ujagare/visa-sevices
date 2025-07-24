// Mobile-specific improvements for service items
document.addEventListener('DOMContentLoaded', function() {
  // Check if we're on a mobile device
  const isMobile = window.innerWidth <= 768;
  
  if (isMobile) {
    // Get all service items
    const serviceItems = document.querySelectorAll('.service-item');
    
    // Add click event to each service item for mobile
    serviceItems.forEach(function(item) {
      item.addEventListener('click', function() {
        // Add a temporary highlight class
        this.classList.add('service-item-active');
        
        // Remove the class after animation completes
        setTimeout(() => {
          this.classList.remove('service-item-active');
        }, 300);
      });
    });
    
    // Add a class to the services section for mobile styling
    const servicesSection = document.querySelector('.services-section');
    if (servicesSection) {
      servicesSection.classList.add('mobile-view');
    }
    
    // Improve scrolling to services section
    const serviceLinks = document.querySelectorAll('a[href="#services"]');
    serviceLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const servicesSection = document.getElementById('services');
        if (servicesSection) {
          // Smooth scroll with offset for mobile header
          window.scrollTo({
            top: servicesSection.offsetTop - 60,
            behavior: 'smooth'
          });
        }
      });
    });
  }
});