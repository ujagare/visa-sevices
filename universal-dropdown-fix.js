// Universal dropdown fix for all pages
(function() {
    // Function to fix services dropdown
    function fixServicesDropdown() {
        // Get all service dropdowns on the page
        const dropdowns = document.querySelectorAll('.mobile-services-dropdown');
        
        dropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('.mobile-services-toggle');
            if (toggle) {
                // Remove any existing onclick attribute
                toggle.removeAttribute('onclick');
                
                // Add direct click event listener
                toggle.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    dropdown.classList.toggle('active');
                });
            }
        });
    }
    
    // Run on DOMContentLoaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fixServicesDropdown);
    } else {
        fixServicesDropdown();
    }
    
    // Also run on window load as backup
    window.addEventListener('load', fixServicesDropdown);
})();