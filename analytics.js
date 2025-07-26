/**
 * Privacy-focused Google Analytics for White Wings Visa Consultancy
 * This script loads Google Analytics only after user consent
 */

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
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX'; // Replace with your GA measurement ID
    
    // Append script to document
    document.head.appendChild(script);
    
    // Initialize GA with privacy-focused settings
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX', { // Replace with your GA measurement ID
        'anonymize_ip': true,
        'allow_google_signals': false,
        'allow_ad_personalization_signals': false,
        'cookie_expires': 2592000, // 30 days in seconds
        'cookie_update': true,
        'cookie_flags': 'SameSite=None;Secure'
    });
    
    console.log('Google Analytics initialized with privacy settings');
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
});

// Export functions for potential use in other scripts
window.whiteWingsAnalytics = {
    initialize: initializeAnalytics,
    loadGoogleAnalytics: loadGoogleAnalytics
};