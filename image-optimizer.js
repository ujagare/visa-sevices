// Image Optimizer
document.addEventListener('DOMContentLoaded', function() {
  // Lazy loading for images
  const images = document.querySelectorAll('img:not([loading])');
  images.forEach(function(img) {
    // Skip small images or images that are already visible in viewport
    if (img.height < 100 || isInViewport(img)) return;
    
    // Add loading="lazy" attribute to images
    img.setAttribute('loading', 'lazy');
  });

  // Add decoding="async" to images
  const allImages = document.querySelectorAll('img:not([decoding])');
  allImages.forEach(function(img) {
    img.setAttribute('decoding', 'async');
  });

  // Function to check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // Add fetchpriority="high" to hero images
  const heroImages = document.querySelectorAll('.hero img, .slider img');
  heroImages.forEach(function(img) {
    img.setAttribute('fetchpriority', 'high');
  });
});