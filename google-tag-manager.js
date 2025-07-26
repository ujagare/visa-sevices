/**
 * Google Tag Manager Implementation for White Wings Visa Consultancy
 * This script loads Google Tag Manager which can then load Google Analytics and other tracking tools
 */

// Google Tag Manager ID (Replace GTM-XXXXXXX with your actual GTM ID)
const GTM_ID = 'GTM-XXXXXXX';

// Check if user has given consent for analytics cookies
function initializeTagManager() {
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
    
    // If analytics is allowed, load Google Tag Manager
    if (analyticsAllowed) {
        loadGoogleTagManager();
    } else {
        console.log('Analytics disabled due to user preferences');
    }
}

// Function to load Google Tag Manager
function loadGoogleTagManager() {
    // Add GTM script to head
    (function(w,d,s,l,i){
        w[l]=w[l]||[];
        w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
        var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),
            dl=l!='dataLayer'?'&l='+l:'';
        j.async=true;
        j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
        f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer',GTM_ID);
    
    // Add GTM noscript iframe to body
    const noscript = document.createElement('noscript');
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.googletagmanager.com/ns.html?id=${GTM_ID}`;
    iframe.height = '0';
    iframe.width = '0';
    iframe.style.display = 'none';
    iframe.style.visibility = 'hidden';
    
    noscript.appendChild(iframe);
    document.body.insertBefore(noscript, document.body.firstChild);
    
    console.log('Google Tag Manager initialized');
}

// Push custom events to dataLayer
function pushEvent(eventName, eventParams = {}) {
    // Check if dataLayer exists
    if (typeof window.dataLayer !== 'undefined') {
        // Add event name to parameters
        eventParams.event = eventName;
        
        // Push to dataLayer
        window.dataLayer.push(eventParams);
        
        console.log(`Event pushed to dataLayer: ${eventName}`, eventParams);
    } else {
        console.warn('dataLayer not available, event not pushed:', eventName);
    }
}

// Track form submissions
function trackFormSubmission(formId, formData = {}) {
    pushEvent('form_submission', {
        form_id: formId,
        form_data: formData
    });
}

// Track page views
function trackPageView(pageTitle = document.title, pagePath = window.location.pathname) {
    pushEvent('page_view', {
        page_title: pageTitle,
        page_path: pagePath,
        page_location: window.location.href
    });
}

// Listen for cookie consent changes
window.addEventListener('storage', function(e) {
    if (e.key === 'cookieConsent' || e.key === 'cookiePreferences') {
        initializeTagManager();
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    
    // Wait a bit to ensure cookie consent script has run
    setTimeout(initializeTagManager, 1000);
    
    // Track form submissions
    const forms = document.querySelectorAll('form');
    forms.forEach((form, index) => {
        const formId = form.id || `form-${index}`;
        
        form.addEventListener('submit', function() {
            // Collect form data
            const formData = {};
            const formElements = form.elements;
            
            for (let i = 0; i < formElements.length; i++) {
                const element = formElements[i];
                
                // Skip buttons and hidden fields
                if (element.type !== 'submit' && element.type !== 'button' && !element.name.startsWith('_')) {
                    // For privacy, don't collect actual values, just field names
                    formData[element.name] = element.type;
                }
            }
            
            // Track form submission
            trackFormSubmission(formId, formData);
        });
    });
    
    // Track outbound links
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        if (link.hostname !== window.location.hostname && !link.classList.contains('no-track')) {
            link.addEventListener('click', function() {
                pushEvent('outbound_link_click', {
                    link_url: this.href,
                    link_text: this.innerText || 'Image Link'
                });
            });
        }
    });
});

// Export functions for potential use in other scripts
window.whiteWingsTagManager = {
    initialize: initializeTagManager,
    pushEvent: pushEvent,
    trackFormSubmission: trackFormSubmission,
    trackPageView: trackPageView
};