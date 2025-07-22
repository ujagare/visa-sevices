// Professional Mobile Navbar Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the about page
    const isAboutPage = document.body.classList.contains('about-page');
    
    // Insert mobile navbar HTML into the DOM
    const mobileNavbarHTML = `
        <div class="mobile-menu-overlay"></div>
        <div class="mobile-navbar">
            <div class="mobile-navbar-container">
                <div class="mobile-logo">
                    <a href="index.html">
                        <img src="images/logo/WING LOGO.png" alt="White Wings Logo">
                    </a>
                </div>
                <button class="mobile-menu-toggle" aria-label="Toggle mobile menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
            <div class="mobile-menu">
                <ul>
                    <li><a href="index.html"><i class="ri-home-4-line"></i> Home</a></li>
                    <li><a href="about.html"><i class="ri-information-line"></i> About</a></li>
                    <li class="mobile-dropdown">
                        <button class="mobile-dropdown-toggle">
                            <i class="ri-service-line"></i> Services <i class="ri-arrow-down-s-line"></i>
                        </button>
                        <div class="mobile-dropdown-content">
                            <a href="study.html">
                                <i class="ri-graduation-cap-line"></i>
                                <div>
                                    <strong>Study Abroad</strong>
                                </div>
                            </a>
                            <a href="migrate.html">
                                <i class="ri-home-heart-line"></i>
                                <div>
                                    <strong>Migrate</strong>
                                </div>
                            </a>
                            <a href="work.html">
                                <i class="ri-briefcase-line"></i>
                                <div>
                                    <strong>Work Abroad</strong>
                                </div>
                            </a>
                            <a href="visit.html">
                                <i class="ri-plane-line"></i>
                                <div>
                                    <strong>Visit</strong>
                                </div>
                            </a>
                        </div>
                    </li>
                    <li><a href="contact.html"><i class="ri-contacts-line"></i> Contact</a></li>
                </ul>
                <a href="https://wa.me/919130448831" class="mobile-apply-btn">
                    <i class="ri-whatsapp-line"></i>
                    Apply Now
                </a>
            </div>
        </div>
    `;

    // Insert the mobile navbar at the beginning of the body
    document.body.insertAdjacentHTML('afterbegin', mobileNavbarHTML);

    // Get mobile navbar elements
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileDropdownToggle = document.querySelector('.mobile-dropdown-toggle');
    const mobileDropdownContent = document.querySelector('.mobile-dropdown-content');

    // Toggle mobile menu
    mobileMenuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        mobileMenuOverlay.classList.toggle('active');
        
        // Prevent body scrolling when menu is open
        if (mobileMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Toggle dropdown menu
    mobileDropdownToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileDropdownContent.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = mobileMenu.contains(event.target);
        const isClickOnToggle = mobileMenuToggle.contains(event.target);
        
        if (!isClickInsideMenu && !isClickOnToggle && mobileMenu.classList.contains('active')) {
            mobileMenuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Close mobile menu when clicking on overlay
    mobileMenuOverlay.addEventListener('click', function() {
        mobileMenuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
});