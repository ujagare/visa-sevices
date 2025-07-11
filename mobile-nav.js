// Mobile Navigation Enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const menuClose = document.getElementById('menu-close');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
        });
    }
    
    if (menuClose) {
        menuClose.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (mobileMenu.classList.contains('active') && 
            !mobileMenu.contains(event.target) && 
            event.target !== menuToggle) {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Mobile dropdown toggle
    const mobileDropdownToggle = document.querySelector('.mobile-dropdown-toggle');
    const mobileDropdown = document.querySelector('.mobile-dropdown');
    
    if (mobileDropdownToggle && mobileDropdown) {
        mobileDropdownToggle.addEventListener('click', function() {
            mobileDropdown.classList.toggle('active');
        });
    }
});