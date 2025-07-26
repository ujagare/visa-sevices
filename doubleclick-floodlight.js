// DoubleClick Floodlight Tracking
(function() {
    // Global site tag (gtag.js) - DoubleClick Floodlight
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    
    // Replace 'DC-XXXXXXX' with your actual Floodlight Configuration ID
    gtag('config', 'DC-XXXXXXX');
    
    // Page view tracking
    gtag('event', 'page_view', {
        'send_to': 'DC-XXXXXXX'
    });
    
    // Form submission tracking
    function trackFormSubmission(formType) {
        gtag('event', 'conversion', {
            'send_to': 'DC-XXXXXXX/form-submission',
            'custom_parameters': {
                'form_type': formType
            }
        });
    }
    
    // Button click tracking
    function trackButtonClick(buttonName) {
        gtag('event', 'conversion', {
            'send_to': 'DC-XXXXXXX/button-click',
            'custom_parameters': {
                'button_name': buttonName
            }
        });
    }
    
    // Phone call tracking
    function trackPhoneCall() {
        gtag('event', 'conversion', {
            'send_to': 'DC-XXXXXXX/phone-call'
        });
    }
    
    // WhatsApp click tracking
    function trackWhatsAppClick() {
        gtag('event', 'conversion', {
            'send_to': 'DC-XXXXXXX/whatsapp-click'
        });
    }
    
    // Auto-track common elements
    document.addEventListener('DOMContentLoaded', function() {
        // Track form submissions
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', function() {
                const formId = this.id || 'unknown-form';
                trackFormSubmission(formId);
            });
        });
        
        // Track WhatsApp links
        const whatsappLinks = document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp"]');
        whatsappLinks.forEach(link => {
            link.addEventListener('click', trackWhatsAppClick);
        });
        
        // Track phone links
        const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
        phoneLinks.forEach(link => {
            link.addEventListener('click', trackPhoneCall);
        });
        
        // Track CTA buttons
        const ctaButtons = document.querySelectorAll('.apply-btn, .btn-apply, .hero-btn, .cta-button');
        ctaButtons.forEach(button => {
            button.addEventListener('click', function() {
                const buttonText = this.textContent.trim();
                trackButtonClick(buttonText);
            });
        });
    });
    
    // Expose tracking functions globally
    window.floodlightTrack = {
        formSubmission: trackFormSubmission,
        buttonClick: trackButtonClick,
        phoneCall: trackPhoneCall,
        whatsAppClick: trackWhatsAppClick
    };
})();