# Google Analytics Setup Guide for White Wings Visa Consultancy

This guide provides step-by-step instructions for setting up Google Analytics for the White Wings Visa Consultancy website.

## Option 1: Direct Google Analytics Implementation

### Step 1: Create a Google Analytics 4 Account
1. Go to [Google Analytics](https://analytics.google.com/)
2. Sign in with your Google account
3. Click "Start measuring"
4. Enter your account name (e.g., "White Wings Visa Consultancy")
5. Configure data sharing settings as per your preference
6. Click "Next"

### Step 2: Create a Property
1. Enter property name (e.g., "White Wings Website")
2. Select your reporting time zone and currency
3. Click "Next"
4. Enter business information as requested
5. Click "Create"

### Step 3: Set Up Data Collection
1. Select "Web" as your platform
2. Enter your website URL (e.g., "https://whitewingsvisa.com")
3. Name your data stream (e.g., "White Wings Website")
4. Click "Create stream"

### Step 4: Get Your Measurement ID
1. After creating the stream, you'll see your Measurement ID (format: G-XXXXXXXXXX)
2. Copy this ID

### Step 5: Update the Google Analytics Script
1. Open the file `google-analytics.js` in your website code
2. Replace `G-XXXXXXXXXX` with your actual Measurement ID:
   ```javascript
   const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Replace with your actual ID
   ```

### Step 6: Verify Installation
1. Deploy your website with the updated script
2. Visit your website
3. Go to Google Analytics > Real-time reports
4. Confirm that your visit is being tracked

## Option 2: Google Tag Manager Implementation

### Step 1: Create a Google Tag Manager Account
1. Go to [Google Tag Manager](https://tagmanager.google.com/)
2. Click "Create Account"
3. Enter account name (e.g., "White Wings Visa Consultancy")
4. Enter container name (e.g., "Website")
5. Select "Web" as the target platform
6. Click "Create"
7. Accept the Terms of Service

### Step 2: Get Your GTM ID
1. After creating the container, you'll see your GTM ID (format: GTM-XXXXXXX)
2. Copy this ID

### Step 3: Update the Google Tag Manager Script
1. Open the file `google-tag-manager.js` in your website code
2. Replace `GTM-XXXXXXX` with your actual GTM ID:
   ```javascript
   const GTM_ID = 'GTM-XXXXXXX'; // Replace with your actual ID
   ```

### Step 4: Set Up Google Analytics in GTM
1. In Google Tag Manager, go to "Tags" > "New"
2. Choose "Google Analytics: GA4 Configuration"
3. Enter your Measurement ID from Google Analytics
4. Set trigger to "All Pages"
5. Save the tag

### Step 5: Set Up Event Tracking in GTM
1. Create additional tags for specific events:
   - Form submissions
   - Button clicks
   - Page views
   - Outbound link clicks
2. Use the built-in triggers or create custom triggers as needed

### Step 6: Publish Your GTM Container
1. Click "Submit" in the top right corner
2. Enter a version name and description
3. Click "Publish"

### Step 7: Verify Installation
1. Deploy your website with the updated script
2. Visit your website
3. Use the GTM Preview mode to verify that tags are firing correctly
4. Check Google Analytics real-time reports to confirm data is being collected

## Additional Configuration

### Set Up Goals/Conversions
1. In Google Analytics, go to "Configure" > "Events"
2. Find the events you want to track as conversions (e.g., form submissions)
3. Mark them as conversions

### Set Up Enhanced Measurement
1. In Google Analytics, go to your data stream settings
2. Enable Enhanced Measurement options as needed:
   - Page views
   - Scrolls
   - Outbound clicks
   - Site search
   - Video engagement
   - File downloads

### Privacy Considerations
1. Ensure the cookie consent banner is working properly
2. Verify that Google Analytics only loads after user consent
3. Update your Privacy Policy to mention Google Analytics usage
4. Consider enabling IP anonymization for GDPR compliance

### Regular Maintenance
1. Check for tracking issues regularly
2. Update the tracking code when new versions are released
3. Review and adjust goals and events as your business needs change
4. Regularly audit your analytics setup for privacy compliance

## Need Help?

If you need assistance with setting up Google Analytics or have questions about tracking specific events, please contact your web developer or a digital analytics professional.