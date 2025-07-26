// Master Performance Optimizer
// This script combines CSS, Image, and HTML optimization techniques

// Resource Hints
(function() {
  // DNS Prefetch for external domains
  const domains = [
    'fonts.googleapis.com',
    'cdn.jsdelivr.net',
    'cdnjs.cloudflare.com',
    'unpkg.com',
    'flagcdn.com',
    'images.unsplash.com'
  ];
  
  domains.forEach(function(domain) {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = `//${domain}`;
    document.head.appendChild(link);
    
    // Also add preconnect for critical domains
    const preconnect = document.createElement('link');
    preconnect.rel = 'preconnect';
    preconnect.href = `//${domain}`;
    document.head.appendChild(preconnect);
  });
})();

// Load CSS Optimizer
(function() {
  const cssOptimizer = document.createElement('script');
  cssOptimizer.src = 'css-optimizer.js';
  cssOptimizer.async = true;
  document.head.appendChild(cssOptimizer);
})();

// Load Image Optimizer
(function() {
  const imageOptimizer = document.createElement('script');
  imageOptimizer.src = 'image-optimizer.js';
  imageOptimizer.async = true;
  document.head.appendChild(imageOptimizer);
})();

// Load HTML Optimizer
(function() {
  const htmlOptimizer = document.createElement('script');
  htmlOptimizer.src = 'html-optimizer.js';
  htmlOptimizer.async = true;
  document.head.appendChild(htmlOptimizer);
})();

// Load Preload Warnings Fix
(function() {
  const preloadFix = document.createElement('script');
  preloadFix.src = 'fix-preload-warnings.js';
  preloadFix.async = true;
  document.head.appendChild(preloadFix);
})();

// Load MIME Type Errors Fix
(function() {
  const mimeFix = document.createElement('script');
  mimeFix.src = 'fix-mime-errors.js';
  mimeFix.async = true;
  document.head.appendChild(mimeFix);
})();

// Load MIME Type Setter
(function() {
  const mimeTypes = document.createElement('script');
  mimeTypes.src = 'set-mime-types.js';
  mimeTypes.async = true;
  document.head.appendChild(mimeTypes);
})();

// Load Critical CSS Inliner
(function() {
  const criticalCss = document.createElement('script');
  criticalCss.src = 'inline-critical-css.js';
  criticalCss.async = true;
  document.head.appendChild(criticalCss);
})();

// Load Script Type Setter
(function() {
  const scriptTypes = document.createElement('script');
  scriptTypes.src = 'set-script-types.js';
  scriptTypes.async = true;
  document.head.appendChild(scriptTypes);
})();

// Font Display Optimization
(function() {
  // Add font-display: swap to all Google Fonts
  const fontLinks = document.querySelectorAll('link[href*="fonts.googleapis.com"]');
  fontLinks.forEach(function(link) {
    let href = link.getAttribute('href');
    if (href.indexOf('&display=swap') === -1) {
      href += '&display=swap';
      link.setAttribute('href', href);
    }
  });
})();

// Optimize critical resources loading
(function() {
  // Instead of using preload, we'll modify existing stylesheet links
  // This avoids the "preloaded but not used" warning
  const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
  
  stylesheets.forEach(function(stylesheet) {
    const href = stylesheet.getAttribute('href');
    
    // Check if this is a critical stylesheet
    if (href && (href.includes('style.css') || href.includes('white-wings-colors.css'))) {
      // Set higher priority for critical stylesheets
      stylesheet.setAttribute('media', 'all');
      
      // Fix MIME type issues by ensuring proper type attribute
      stylesheet.setAttribute('type', 'text/css');
    } else {
      // For non-critical stylesheets, load asynchronously
      stylesheet.setAttribute('media', 'print');
      stylesheet.setAttribute('onload', "this.media='all'");
    }
  });
})();