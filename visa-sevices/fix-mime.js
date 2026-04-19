// Fix MIME type issues and font loading problems
document.addEventListener('DOMContentLoaded', function() {
  // Fix for master-mobile-navbar.css MIME type error
  const mobileNavbarStyles = document.createElement('style');
  mobileNavbarStyles.textContent = `
    /* Mobile navbar styles */
    .mobile-menu-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      z-index: 998;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
    }
    
    .mobile-menu-overlay.show {
      opacity: 1;
      visibility: visible;
    }
    
    .mobile-menu-sidebar {
      position: fixed;
      top: 0;
      right: -300px;
      width: 280px;
      height: 100%;
      background: white;
      z-index: 999;
      box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      overflow-y: auto;
    }
    
    .mobile-menu-sidebar.show {
      right: 0;
    }
  `;
  document.head.appendChild(mobileNavbarStyles);
  
  // Fix for services-enhanced.css MIME type error
  // Check if the stylesheet is already loaded correctly
  const servicesEnhancedLink = document.querySelector('link[href*="services-enhanced.css"]');
  if (servicesEnhancedLink) {
    // Remove the problematic link
    servicesEnhancedLink.remove();
    
    // Create a new link element with proper attributes
    const newLink = document.createElement('link');
    newLink.rel = 'stylesheet';
    newLink.type = 'text/css';
    newLink.href = 'services-enhanced.css';
    document.head.appendChild(newLink);
    console.log('Services enhanced CSS fixed');
  }
  
  // Remove all cdnfonts links
  const fontLinks = document.querySelectorAll('link[href*="fonts.cdnfonts.com"]');
  fontLinks.forEach(link => {
    link.remove();
  });
  
  // Add Google Fonts Poppins (more reliable)
  if (!document.querySelector('link[href*="fonts.googleapis.com/css2?family=Poppins"]')) {
    const googleFonts = document.createElement('link');
    googleFonts.rel = 'stylesheet';
    googleFonts.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap';
    document.head.appendChild(googleFonts);
  }
  
  console.log('Font and MIME type fixes applied');
});