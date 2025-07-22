// About page mobile navbar fix
document.addEventListener('DOMContentLoaded', function() {
    // Make sure the nav is visible on mobile
    const nav = document.querySelector('nav');
    if (nav) {
        // Remove any display:none that might be applied by other CSS
        nav.style.display = 'flex';
        
        // Make sure the logo is visible
        const logo = nav.querySelector('img.logo');
        if (logo) {
            logo.style.display = 'block';
        }
    }
    
    // Adjust the mobile menu toggle position
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    if (mobileMenuToggle) {
        mobileMenuToggle.style.position = 'fixed';
        mobileMenuToggle.style.right = '20px';
        mobileMenuToggle.style.top = '25px';
        mobileMenuToggle.style.zIndex = '1000';
    }
});