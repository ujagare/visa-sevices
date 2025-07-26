# Google Analytics Implementation for White Wings Visa Consultancy

This document provides an overview of the Google Analytics implementation for the White Wings Visa Consultancy website.

## Files Overview

1. **google-analytics.js** - Main Google Analytics implementation
2. **google-tag-manager.js** - Alternative Google Tag Manager implementation
3. **cookie-consent.js** - Cookie consent banner that controls analytics loading
4. **GOOGLE_ANALYTICS_SETUP.md** - Detailed setup guide

## Implementation Features

### Privacy-Focused

- Analytics only loads after user consent
- IP anonymization enabled
- Respects user cookie preferences
- Complies with GDPR requirements

### Event Tracking

The implementation tracks the following events:

- Page views
- Form submissions
- Button clicks (Apply Now, Contact buttons)
- Outbound link clicks
- WhatsApp and phone call clicks

### Conversion Tracking

Form submissions are tracked as conversions, including:

- Contact form submissions
- Visa inquiry form submissions
- Consultation request submissions

## How to Use

### Basic Setup

1. Follow the instructions in `GOOGLE_ANALYTICS_SETUP.md` to create your Google Analytics account
2. Update the Measurement ID in `google-analytics.js`:
   ```javascript
   const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Replace with your actual ID
   ```

### Using Google Tag Manager Instead

If you prefer using Google Tag Manager:

1. Follow the GTM setup instructions in `GOOGLE_ANALYTICS_SETUP.md`
2. Update the GTM ID in `google-tag-manager.js`:
   ```javascript
   const GTM_ID = 'GTM-XXXXXXX'; // Replace with your actual ID
   ```
3. Update your script references in `index.html` to use `google-tag-manager.js` instead of `google-analytics.js`

### Custom Event Tracking

To track custom events in your code:

```javascript
// Using direct Google Analytics
if (window.whiteWingsAnalytics) {
    window.whiteWingsAnalytics.trackEvent('Category', 'Action', 'Label', Value);
}

// Using Google Tag Manager
if (window.whiteWingsTagManager) {
    window.whiteWingsTagManager.pushEvent('event_name', {
        parameter1: 'value1',
        parameter2: 'value2'
    });
}
```

## Testing

After implementation:

1. Use the Google Analytics Real-Time reports to verify tracking
2. Check that events are being recorded correctly
3. Verify that the cookie consent banner controls analytics loading
4. Test on multiple browsers and devices

## Maintenance

Regularly check:

1. That tracking is working correctly
2. For any new features or updates to Google Analytics
3. That privacy compliance is maintained
4. That conversion goals are properly set up

## Support

For questions or issues with the analytics implementation, please contact your web developer or analytics specialist.