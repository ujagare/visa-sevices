/**
 * Cookie Consent Banner for White Wings Visa Consultancy
 * GDPR and privacy-focused implementation
 */

document.addEventListener('DOMContentLoaded', function() {
    // Check if consent has already been given
    if (!hasConsentBeenGiven()) {
        // Create and show the cookie consent banner
        createConsentBanner();
    }
});

// Check if consent has been given
function hasConsentBeenGiven() {
    return localStorage.getItem('cookieConsent') !== null;
}

// Create the cookie consent banner
function createConsentBanner() {
    // Create banner container
    const banner = document.createElement('div');
    banner.id = 'cookie-consent-banner';
    banner.className = 'cookie-consent-banner';
    banner.style.position = 'fixed';
    banner.style.bottom = '0';
    banner.style.left = '0';
    banner.style.right = '0';
    banner.style.padding = '15px 20px';
    banner.style.background = 'rgba(255, 255, 255, 0.95)';
    banner.style.boxShadow = '0 -2px 10px rgba(0, 0, 0, 0.1)';
    banner.style.zIndex = '9999';
    banner.style.display = 'flex';
    banner.style.flexDirection = 'column';
    banner.style.gap = '15px';
    banner.style.fontFamily = 'Poppins, sans-serif';
    banner.style.fontSize = '14px';
    banner.style.color = '#333';
    banner.style.borderTop = '1px solid #e2e8f0';
    
    // Create banner content
    const content = document.createElement('div');
    content.className = 'cookie-consent-content';
    content.style.display = 'flex';
    content.style.alignItems = 'flex-start';
    content.style.gap = '15px';
    
    // Create cookie icon
    const icon = document.createElement('div');
    icon.className = 'cookie-icon';
    icon.innerHTML = '<i class="ri-cookie-line" style="font-size: 24px; color: #0369A1;"></i>';
    
    // Create text content
    const text = document.createElement('div');
    text.className = 'cookie-text';
    text.innerHTML = `
        <h3 style="margin: 0 0 8px; font-size: 16px; font-weight: 600;">We Value Your Privacy</h3>
        <p style="margin: 0; line-height: 1.5;">
            We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. 
            By clicking "Accept All", you consent to our use of cookies. Visit our 
            <a href="privacy-policy.html" style="color: #0369A1; text-decoration: underline;">Privacy Policy</a> and 
            <a href="cookie-policy.html" style="color: #0369A1; text-decoration: underline;">Cookie Policy</a> to learn more.
        </p>
    `;
    
    // Add icon and text to content
    content.appendChild(icon);
    content.appendChild(text);
    
    // Create buttons container
    const buttons = document.createElement('div');
    buttons.className = 'cookie-consent-buttons';
    buttons.style.display = 'flex';
    buttons.style.flexWrap = 'wrap';
    buttons.style.gap = '10px';
    buttons.style.marginTop = '10px';
    
    // Create Accept All button
    const acceptAllBtn = document.createElement('button');
    acceptAllBtn.className = 'cookie-consent-btn accept-all';
    acceptAllBtn.textContent = 'Accept All';
    acceptAllBtn.style.padding = '8px 16px';
    acceptAllBtn.style.background = '#0369A1';
    acceptAllBtn.style.color = 'white';
    acceptAllBtn.style.border = 'none';
    acceptAllBtn.style.borderRadius = '4px';
    acceptAllBtn.style.cursor = 'pointer';
    acceptAllBtn.style.fontWeight = '500';
    acceptAllBtn.style.transition = 'background 0.3s ease';
    
    // Create Necessary Only button
    const necessaryBtn = document.createElement('button');
    necessaryBtn.className = 'cookie-consent-btn necessary-only';
    necessaryBtn.textContent = 'Necessary Only';
    necessaryBtn.style.padding = '8px 16px';
    necessaryBtn.style.background = 'transparent';
    necessaryBtn.style.color = '#333';
    necessaryBtn.style.border = '1px solid #ccc';
    necessaryBtn.style.borderRadius = '4px';
    necessaryBtn.style.cursor = 'pointer';
    necessaryBtn.style.fontWeight = '500';
    necessaryBtn.style.transition = 'background 0.3s ease';
    
    // Create Customize button
    const customizeBtn = document.createElement('button');
    customizeBtn.className = 'cookie-consent-btn customize';
    customizeBtn.textContent = 'Customize';
    customizeBtn.style.padding = '8px 16px';
    customizeBtn.style.background = 'transparent';
    customizeBtn.style.color = '#333';
    customizeBtn.style.border = '1px solid #ccc';
    customizeBtn.style.borderRadius = '4px';
    customizeBtn.style.cursor = 'pointer';
    customizeBtn.style.fontWeight = '500';
    customizeBtn.style.transition = 'background 0.3s ease';
    
    // Add hover effects
    acceptAllBtn.addEventListener('mouseover', function() {
        this.style.background = '#0284c7';
    });
    
    acceptAllBtn.addEventListener('mouseout', function() {
        this.style.background = '#0369A1';
    });
    
    necessaryBtn.addEventListener('mouseover', function() {
        this.style.background = '#f1f5f9';
    });
    
    necessaryBtn.addEventListener('mouseout', function() {
        this.style.background = 'transparent';
    });
    
    customizeBtn.addEventListener('mouseover', function() {
        this.style.background = '#f1f5f9';
    });
    
    customizeBtn.addEventListener('mouseout', function() {
        this.style.background = 'transparent';
    });
    
    // Add event listeners
    acceptAllBtn.addEventListener('click', function() {
        setConsent('all');
        hideBanner(banner);
    });
    
    necessaryBtn.addEventListener('click', function() {
        setConsent('necessary');
        hideBanner(banner);
    });
    
    customizeBtn.addEventListener('click', function() {
        showCustomizeOptions(banner);
    });
    
    // Add buttons to container
    buttons.appendChild(acceptAllBtn);
    buttons.appendChild(necessaryBtn);
    buttons.appendChild(customizeBtn);
    
    // Add content and buttons to banner
    banner.appendChild(content);
    banner.appendChild(buttons);
    
    // Add banner to page
    document.body.appendChild(banner);
    
    // Make responsive
    makeResponsive(banner);
    window.addEventListener('resize', function() {
        makeResponsive(banner);
    });
}

// Make the banner responsive
function makeResponsive(banner) {
    const width = window.innerWidth;
    const content = banner.querySelector('.cookie-consent-content');
    const buttons = banner.querySelector('.cookie-consent-buttons');
    
    if (width < 768) {
        content.style.flexDirection = 'column';
        buttons.style.justifyContent = 'center';
    } else {
        content.style.flexDirection = 'row';
        buttons.style.justifyContent = 'flex-end';
    }
}

// Show customize options
function showCustomizeOptions(banner) {
    // Remove existing content
    banner.innerHTML = '';
    
    // Create customize container
    const customizeContainer = document.createElement('div');
    customizeContainer.className = 'customize-container';
    customizeContainer.style.padding = '15px';
    
    // Create header
    const header = document.createElement('div');
    header.className = 'customize-header';
    header.style.marginBottom = '20px';
    header.innerHTML = `
        <h3 style="margin: 0 0 8px; font-size: 18px; font-weight: 600;">Cookie Preferences</h3>
        <p style="margin: 0; line-height: 1.5; font-size: 14px;">
            Select which cookies you want to accept. Your choice will be saved for one year.
        </p>
    `;
    
    // Create options
    const options = document.createElement('div');
    options.className = 'customize-options';
    options.style.display = 'flex';
    options.style.flexDirection = 'column';
    options.style.gap = '15px';
    options.style.marginBottom = '20px';
    
    // Necessary cookies (always enabled)
    const necessaryOption = createOptionItem(
        'Necessary',
        'These cookies are essential for the website to function properly.',
        true,
        true
    );
    
    // Analytics cookies
    const analyticsOption = createOptionItem(
        'Analytics',
        'These cookies help us understand how visitors interact with our website.',
        false,
        false
    );
    
    // Marketing cookies
    const marketingOption = createOptionItem(
        'Marketing',
        'These cookies are used to track visitors across websites to display relevant advertisements.',
        false,
        false
    );
    
    // Add options
    options.appendChild(necessaryOption);
    options.appendChild(analyticsOption);
    options.appendChild(marketingOption);
    
    // Create buttons
    const buttons = document.createElement('div');
    buttons.className = 'customize-buttons';
    buttons.style.display = 'flex';
    buttons.style.justifyContent = 'space-between';
    buttons.style.marginTop = '20px';
    
    // Save button
    const saveBtn = document.createElement('button');
    saveBtn.className = 'cookie-consent-btn save';
    saveBtn.textContent = 'Save Preferences';
    saveBtn.style.padding = '8px 16px';
    saveBtn.style.background = '#0369A1';
    saveBtn.style.color = 'white';
    saveBtn.style.border = 'none';
    saveBtn.style.borderRadius = '4px';
    saveBtn.style.cursor = 'pointer';
    saveBtn.style.fontWeight = '500';
    
    // Accept all button
    const acceptAllBtn = document.createElement('button');
    acceptAllBtn.className = 'cookie-consent-btn accept-all';
    acceptAllBtn.textContent = 'Accept All';
    acceptAllBtn.style.padding = '8px 16px';
    acceptAllBtn.style.background = 'transparent';
    acceptAllBtn.style.color = '#333';
    acceptAllBtn.style.border = '1px solid #ccc';
    acceptAllBtn.style.borderRadius = '4px';
    acceptAllBtn.style.cursor = 'pointer';
    acceptAllBtn.style.fontWeight = '500';
    
    // Add event listeners
    saveBtn.addEventListener('click', function() {
        const analyticsChecked = document.getElementById('analytics-checkbox').checked;
        const marketingChecked = document.getElementById('marketing-checkbox').checked;
        
        const preferences = {
            necessary: true, // Always true
            analytics: analyticsChecked,
            marketing: marketingChecked
        };
        
        setConsent('preferences', preferences);
        hideBanner(banner);
    });
    
    acceptAllBtn.addEventListener('click', function() {
        setConsent('all');
        hideBanner(banner);
    });
    
    // Add buttons
    buttons.appendChild(acceptAllBtn);
    buttons.appendChild(saveBtn);
    
    // Add everything to container
    customizeContainer.appendChild(header);
    customizeContainer.appendChild(options);
    customizeContainer.appendChild(buttons);
    
    // Add container to banner
    banner.appendChild(customizeContainer);
}

// Create an option item for the customize section
function createOptionItem(title, description, checked, disabled) {
    const id = title.toLowerCase() + '-checkbox';
    
    const item = document.createElement('div');
    item.className = 'option-item';
    item.style.display = 'flex';
    item.style.gap = '15px';
    item.style.alignItems = 'flex-start';
    item.style.padding = '10px';
    item.style.border = '1px solid #e2e8f0';
    item.style.borderRadius = '4px';
    
    // Create checkbox container
    const checkboxContainer = document.createElement('div');
    checkboxContainer.style.display = 'flex';
    checkboxContainer.style.alignItems = 'center';
    checkboxContainer.style.justifyContent = 'center';
    checkboxContainer.style.marginTop = '2px';
    
    // Create checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = id;
    checkbox.checked = checked;
    checkbox.disabled = disabled;
    checkbox.style.margin = '0';
    checkbox.style.width = '16px';
    checkbox.style.height = '16px';
    
    checkboxContainer.appendChild(checkbox);
    
    // Create text content
    const textContent = document.createElement('div');
    textContent.className = 'option-text';
    textContent.style.flex = '1';
    
    const titleElement = document.createElement('label');
    titleElement.htmlFor = id;
    titleElement.style.display = 'block';
    titleElement.style.fontWeight = '600';
    titleElement.style.marginBottom = '4px';
    titleElement.textContent = title;
    
    const descElement = document.createElement('p');
    descElement.style.margin = '0';
    descElement.style.fontSize = '13px';
    descElement.style.lineHeight = '1.4';
    descElement.style.color = '#666';
    descElement.textContent = description;
    
    textContent.appendChild(titleElement);
    textContent.appendChild(descElement);
    
    // Add to item
    item.appendChild(checkboxContainer);
    item.appendChild(textContent);
    
    return item;
}

// Set consent in localStorage
function setConsent(type, preferences = null) {
    // Store consent type
    localStorage.setItem('cookieConsent', type);
    
    // Store preferences if provided
    if (preferences) {
        localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
    } else if (type === 'all') {
        // If 'all', set all preferences to true
        const allPreferences = {
            necessary: true,
            analytics: true,
            marketing: true
        };
        localStorage.setItem('cookiePreferences', JSON.stringify(allPreferences));
    } else if (type === 'necessary') {
        // If 'necessary', set only necessary to true
        const necessaryPreferences = {
            necessary: true,
            analytics: false,
            marketing: false
        };
        localStorage.setItem('cookiePreferences', JSON.stringify(necessaryPreferences));
    }
    
    // Dispatch event for other scripts to react to consent change
    window.dispatchEvent(new Event('consentChanged'));
    
    // Initialize analytics if consent is given
    if (window.whiteWingsAnalytics && (type === 'all' || (type === 'preferences' && preferences.analytics))) {
        window.whiteWingsAnalytics.initialize();
    }
}

// Hide the banner
function hideBanner(banner) {
    banner.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    banner.style.opacity = '0';
    banner.style.transform = 'translateY(100%)';
    
    setTimeout(function() {
        if (banner.parentNode) {
            banner.parentNode.removeChild(banner);
        }
    }, 500);
}