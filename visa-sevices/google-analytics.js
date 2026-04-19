/**
 * Google Analytics Implementation for White Wings Visa Consultancy
 * Privacy-focused implementation that respects user consent
 */

// Google Analytics Tag (Replace G-XXXXXXXXXX with your actual measurement ID)
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';

// Initialize dataLayer
window.dataLayer = window.dataLayer || [];

// Define gtag function
function gtag() {
  dataLayer.push(arguments);
}

// Check if user has given consent for analytics cookies
function initializeAnalytics() {
  // Get cookie preferences from localStorage
  const cookieConsent = localStorage.getItem('cookieConsent');
  const cookiePreferences = localStorage.getItem('cookiePreferences');
  
  // Parse preferences if available
  let preferences = { analytics: false };
  if (cookiePreferences) {
    try {
      preferences = JSON.parse(cookiePreferences);
    } catch (e) {
      console.error('Error parsing cookie preferences:', e);
    }
  }
  
  // Check if analytics is allowed
  const analyticsAllowed = cookieConsent === 'all' || 
                          (cookieConsent === 'preferences' && preferences.analytics);
  
  // If analytics is allowed, load Google Analytics
  if (analyticsAllowed) {
    loadGoogleAnalytics();
  } else {
    console.log('Analytics disabled due to user preferences');
  }
}

// Function to load Google Analytics
function loadGoogleAnalytics() {
  // Create script element
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  
  // Append script to document
  document.head.appendChild(script);
  
  // Initialize GA with privacy-focused settings
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID, {
    'anonymize_ip': true,
    'allow_google_signals': false,
    'allow_ad_personalization_signals': false,
    'cookie_expires': 2592000, // 30 days in seconds
    'cookie_update': true,
    'cookie_flags': 'SameSite=None;Secure'
  });
  
  console.log('Google Analytics initialized with privacy settings');
  
  // Track page view
  trackPageView();
  
  // Add event listeners for form submissions
  setupFormTracking();
}

// Track page view
function trackPageView() {
  const pagePath = window.location.pathname;
  const pageTitle = document.title;
  
  gtag('event', 'page_view', {
    page_path: pagePath,
    page_title: pageTitle,
    page_location: window.location.href
  });
}

// Setup form tracking
function setupFormTracking() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach((form, index) => {
    const formId = form.id || `form-${index}`;
    
    form.addEventListener('submit', function() {
      // Track form submission
      gtag('event', 'form_submission', {
        'event_category': 'Forms',
        'event_label': formId,
        'value': 1
      });
    });
  });
}

// Track outbound links
function trackOutboundLinks() {
  const links = document.querySelectorAll('a');
  
  links.forEach(link => {
    if (link.hostname !== window.location.hostname && !link.classList.contains('no-track')) {
      link.addEventListener('click', function(e) {
        const url = this.href;
        
        // Track outbound link click
        gtag('event', 'click', {
          'event_category': 'Outbound Links',
          'event_label': url,
          'transport_type': 'beacon'
        });
      });
    }
  });
}

// Track specific events
function trackEvent(category, action, label = null, value = null) {
  const eventParams = {
    'event_category': category,
    'event_label': label,
    'value': value
  };
  
  // Remove undefined properties
  Object.keys(eventParams).forEach(key => {
    if (eventParams[key] === null || eventParams[key] === undefined) {
      delete eventParams[key];
    }
  });
  
  gtag('event', action, eventParams);
}

// Listen for cookie consent changes
window.addEventListener('storage', function(e) {
  if (e.key === 'cookieConsent' || e.key === 'cookiePreferences') {
    initializeAnalytics();
  }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  // Wait a bit to ensure cookie consent script has run
  setTimeout(initializeAnalytics, 1000);
  
  // Track outbound links
  trackOutboundLinks();
  
  // Track specific button clicks
  const applyButtons = document.querySelectorAll('.apply-btn, .btn-apply, .cta-btn');
  applyButtons.forEach(button => {
    button.addEventListener('click', function() {
      trackEvent('Button', 'Click', 'Apply Button');
    });
  });
  
  // Track WhatsApp clicks
  const whatsappLinks = document.querySelectorAll('a[href^="https://wa.me/"]');
  whatsappLinks.forEach(link => {
    link.addEventListener('click', function() {
      trackEvent('Contact', 'WhatsApp', 'WhatsApp Button');
    });
  });
  
  // Track phone calls
  const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
  phoneLinks.forEach(link => {
    link.addEventListener('click', function() {
      trackEvent('Contact', 'Phone', 'Phone Call');
    });
  });
  
  // Track email clicks
  const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
  emailLinks.forEach(link => {
    link.addEventListener('click', function() {
      trackEvent('Contact', 'Email', 'Email Click');
    });
  });
});

// Export functions for potential use in other scripts
window.whiteWingsAnalytics = {
  initialize: initializeAnalytics,
  loadGoogleAnalytics: loadGoogleAnalytics,
  trackEvent: trackEvent,
  trackPageView: trackPageView
};