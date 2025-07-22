// Fresh Mobile Navbar JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Add mobile navbar HTML to all pages
    const navDiv = document.querySelector('nav-div');
    if (navDiv) {
        // Get the existing nav element
        const existingNav = navDiv.querySelector('nav');
        
        // Create hamburger button
        const hamburgerBtn = document.createElement('button');
        hamburgerBtn.className = 'hamburger';
        hamburgerBtn.setAttribute('aria-label', 'Menu');
        hamburgerBtn.innerHTML = '<span></span><span></span><span></span>';
        
        // Add hamburger button to existing nav
        existingNav.appendChild(hamburgerBtn);
        
        // Create mobile menu
        const mobileMenu = document.createElement('div');
        mobileMenu.className = 'mobile-menu';
        
        // Create mobile menu header
        const mobileHeader = document.createElement('div');
        mobileHeader.className = 'mobile-header';
        mobileHeader.innerHTML = `
            <img src="images/logo/WING LOGO.png" alt="White Wings Logo" class="mobile-logo">
            <button class="mobile-close" aria-label="Close menu">&times;</button>
        `;
        
        // Create mobile menu nav
        const mobileNav = document.createElement('ul');
        mobileNav.className = 'mobile-nav';
        mobileNav.innerHTML = `
            <li><a href="index.html" ${window.location.pathname.endsWith('index.html') ? 'class="active"' : ''}>Home</a></li>
            <li><a href="about.html" ${window.location.pathname.endsWith('about.html') ? 'class="active"' : ''}>About</a></li>
            <li class="mobile-dropdown">
                <button class="dropdown-toggle">
                    Services
                    <i class="ri-arrow-down-s-line"></i>
                </button>
                <div class="dropdown-content">
                    <a href="study.html">Study Abroad</a>
                    <a href="migrate.html">Migrate</a>
                    <a href="work.html">Work Abroad</a>
                    <a href="visit.html">Visit</a>
                </div>
            </li>
            <li><a href="contact.html" ${window.location.pathname.endsWith('contact.html') ? 'class="active"' : ''}>Contact</a></li>
        `;
        
        // Add header and nav to mobile menu
        mobileMenu.appendChild(mobileHeader);
        mobileMenu.appendChild(mobileNav);
        
        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'mobile-overlay';
        
        // Add mobile menu and overlay to nav-div
        navDiv.appendChild(mobileMenu);
        navDiv.appendChild(overlay);
        
        // Add event listeners
        hamburgerBtn.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        const closeBtn = mobileHeader.querySelector('.mobile-close');
        closeBtn.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        overlay.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        // Add dropdown functionality
        const dropdownToggle = mobileNav.querySelector('.dropdown-toggle');
        dropdownToggle.addEventListener('click', function() {
            this.parentElement.classList.toggle('active');
        });
    }
});