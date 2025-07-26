// HTML Optimizer
document.addEventListener('DOMContentLoaded', function() {
  // Lazy load images that are not in viewport
  const lazyImages = document.querySelectorAll('img:not([loading])');
  lazyImages.forEach(img => {
    // Skip images that are already visible in viewport or small images
    if (img.getBoundingClientRect().top < window.innerHeight || img.height < 50) return;
    img.setAttribute('loading', 'lazy');
  });

  // Add fetchpriority to critical images
  const criticalImages = document.querySelectorAll('.hero img, .hero-image img, .logo');
  criticalImages.forEach(img => {
    img.setAttribute('fetchpriority', 'high');
  });

  // Add decoding attribute to images
  const allImages = document.querySelectorAll('img:not([decoding])');
  allImages.forEach(img => {
    img.setAttribute('decoding', 'async');
  });

  // Add width and height attributes to images that don't have them
  // This helps prevent layout shifts during page load
  const imagesWithoutDimensions = document.querySelectorAll('img:not([width]):not([height])');
  imagesWithoutDimensions.forEach(img => {
    if (img.naturalWidth > 0 && img.naturalHeight > 0) {
      img.setAttribute('width', img.naturalWidth);
      img.setAttribute('height', img.naturalHeight);
    }
  });

  // Optimize external scripts
  const externalScripts = document.querySelectorAll('script[src]:not([async]):not([defer])');
  externalScripts.forEach(script => {
    // Don't modify critical scripts
    if (script.src.includes('performance-optimizer.js') || 
        script.src.includes('css-optimizer.js') || 
        script.src.includes('image-optimizer.js')) {
      return;
    }
    script.setAttribute('defer', '');
  });

  // Add preconnect for external domains
  const domains = [
    'fonts.googleapis.com',
    'cdn.jsdelivr.net',
    'cdnjs.cloudflare.com',
    'unpkg.com',
    'flagcdn.com',
    'images.unsplash.com'
  ];
  
  domains.forEach(domain => {
    if (!document.querySelector(`link[rel="preconnect"][href*="${domain}"]`)) {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = `//${domain}`;
      document.head.appendChild(link);
    }
  });
});