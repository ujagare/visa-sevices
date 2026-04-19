// Direct fix for services dropdown
document.addEventListener('DOMContentLoaded', function() {
    // Get the services toggle element
    const servicesToggle = document.querySelector('.mobile-services-toggle');
    const servicesDropdown = document.querySelector('.mobile-services-dropdown');
    
    if (servicesToggle && servicesDropdown) {
        // Remove existing onclick attribute
        servicesToggle.removeAttribute('onclick');
        
        // Add direct event listener
        servicesToggle.addEventListener('click', function() {
            servicesDropdown.classList.toggle('active');
        });
    }
});