/**
 * Content Security Policy for White Wings Visa Consultancy
 * This script adds CSP headers to improve security
 */

// This script should be included in the .htaccess file or server configuration
// For demonstration purposes, we're creating a JavaScript file that can be used
// to dynamically add CSP headers using a meta tag

document.addEventListener('DOMContentLoaded', function() {
    // Create CSP meta tag
    const cspMeta = document.createElement('meta');
    cspMeta.httpEquiv = 'Content-Security-Policy';
    
    // Define CSP directives
    const cspContent = [
        // Default (fallback) directive
        "default-src 'self'",
        
        // Script sources
        "script-src 'self' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com https://unpkg.com https://formsubmit.co https://www.google-analytics.com https://www.googletagmanager.com 'unsafe-inline'",
        
        // Style sources
        "style-src 'self' https://cdn.jsdelivr.net https://fonts.googleapis.com https://cdnjs.cloudflare.com 'unsafe-inline'",
        
        // Image sources
        "img-src 'self' https://flagcdn.com https://images.unsplash.com data: blob:",
        
        // Font sources
        "font-src 'self' https://fonts.gstatic.com https://cdn.jsdelivr.net data:",
        
        // Connect sources (for AJAX, WebSockets, etc.)
        "connect-src 'self' https://formsubmit.co https://www.google-analytics.com",
        
        // Frame sources
        "frame-src 'self' https://www.google.com https://www.youtube.com",
        
        // Media sources
        "media-src 'self'",
        
        // Object sources
        "object-src 'none'",
        
        // Base URI restriction
        "base-uri 'self'",
        
        // Form action restriction
        "form-action 'self' https://formsubmit.co",
        
        // Frame ancestors restriction (prevents clickjacking)
        "frame-ancestors 'self'",
        
        // Upgrade insecure requests
        "upgrade-insecure-requests"
    ].join('; ');
    
    // Set CSP content
    cspMeta.content = cspContent;
    
    // Add to head
    document.head.appendChild(cspMeta);
    
    console.log('Content Security Policy applied');
});

// For production use, it's better to set CSP headers server-side
// Example for Apache .htaccess:
/*
<IfModule mod_headers.c>
    Header set Content-Security-Policy "default-src 'self'; \
    script-src 'self' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com https://unpkg.com https://formsubmit.co https://www.google-analytics.com https://www.googletagmanager.com 'unsafe-inline'; \
    style-src 'self' https://cdn.jsdelivr.net https://fonts.googleapis.com https://cdnjs.cloudflare.com 'unsafe-inline'; \
    img-src 'self' https://flagcdn.com https://images.unsplash.com data: blob:; \
    font-src 'self' https://fonts.gstatic.com https://cdn.jsdelivr.net data:; \
    connect-src 'self' https://formsubmit.co https://www.google-analytics.com; \
    frame-src 'self' https://www.google.com https://www.youtube.com; \
    media-src 'self'; \
    object-src 'none'; \
    base-uri 'self'; \
    form-action 'self' https://formsubmit.co; \
    frame-ancestors 'self'; \
    upgrade-insecure-requests"
</IfModule>
*/