// Mobile Navbar JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile navbar
    initMobileNavbar();
});

function initMobileNavbar() {
    // Get the hamburger button or create it if it doesn't exist
    let hamburger = document.querySelector('.hamburger');
    if (!hamburger) {
        const nav = document.querySelector('nav');
        if (nav) {
            hamburger = document.createElement('button');
            hamburger.className = 'hamburger';
            hamburger.innerHTML = '<span></span><span></span><span></span>';
            nav.appendChild(hamburger);
        }
    }

    // Check if mobile menu already exists, if not create it
    let mobileMenu = document.querySelector('.mobile-menu');
    let mobileOverlay = document.querySelector('.mobile-overlay');
    
    if (!mobileMenu) {
        // Create mobile menu
        mobileMenu = document.createElement('div');
        mobileMenu.className = 'mobile-menu';
        mobileMenu.innerHTML = `
            <div class="mobile-header">
                <img src="images/logo/WING LOGO.png" alt="White Wings Logo" class="mobile-logo">
                <button class="mobile-close">&times;</button>
            </div>
            <ul class="mobile-nav">
                <li><a href="index.html" ${window.location.pathname.endsWith('index.html') || window.location.pathname === '/' ? 'class="active"' : ''}>Home</a></li>
                <li><a href="about.html" ${window.location.pathname.endsWith('about.html') ? 'class="active"' : ''}>About</a></li>
                <li class="mobile-dropdown">
                    <button class="dropdown-toggle">
                        Services
                        <i class="ri-arrow-down-s-line"></i>
                    </button>
                    <div class="dropdown-content">
                        <a href="study.html" ${window.location.pathname.endsWith('study.html') ? 'class="active"' : ''}>Study Abroad</a>
                        <a href="migrate.html" ${window.location.pathname.endsWith('migrate.html') ? 'class="active"' : ''}>Migrate</a>
                        <a href="work.html" ${window.location.pathname.endsWith('work.html') ? 'class="active"' : ''}>Work Abroad</a>
                        <a href="visit.html" ${window.location.pathname.endsWith('visit.html') ? 'class="active"' : ''}>Visit</a>
                    </div>
                </li>
                <li><a href="contact.html" ${window.location.pathname.endsWith('contact.html') ? 'class="active"' : ''}>Contact</a></li>
            </ul>
        `;
        document.body.appendChild(mobileMenu);
    }
    
    if (!mobileOverlay) {
        // Create overlay
        mobileOverlay = document.createElement('div');
        mobileOverlay.className = 'mobile-overlay';
        document.body.appendChild(mobileOverlay);
    }

    // Add event listeners
    hamburger.addEventListener('click', function() {
        mobileMenu.classList.add('active');
        mobileOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    const closeBtn = document.querySelector('.mobile-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    mobileOverlay.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Add dropdown functionality
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    if (dropdownToggle) {
        dropdownToggle.addEventListener('click', function() {
            this.parentElement.classList.toggle('active');
        });
    }
}