// Fix preload warnings
document.addEventListener('DOMContentLoaded', function() {
  // Find all preload links that might cause warnings
  const preloadLinks = document.querySelectorAll('link[rel="preload"]');
  
  preloadLinks.forEach(function(link) {
    // Check if the link has the 'as' attribute
    if (!link.hasAttribute('as')) {
      // Add the appropriate 'as' attribute based on the file extension
      const href = link.getAttribute('href');
      if (href) {
        if (href.endsWith('.css')) {
          link.setAttribute('as', 'style');
        } else if (href.endsWith('.js')) {
          link.setAttribute('as', 'script');
        } else if (href.match(/\.(png|jpg|jpeg|gif|webp|svg)$/)) {
          link.setAttribute('as', 'image');
        } else if (href.match(/\.(woff|woff2|ttf|otf|eot)$/)) {
          link.setAttribute('as', 'font');
        }
      }
    }
    
    // For style preloads, add onload handler to actually use the stylesheet
    if (link.getAttribute('as') === 'style') {
      // Create a new stylesheet link that will actually use the preloaded resource
      const stylesheetLink = document.createElement('link');
      stylesheetLink.rel = 'stylesheet';
      stylesheetLink.href = link.href;
      stylesheetLink.type = 'text/css';
      
      // Add the stylesheet link to the document
      document.head.appendChild(stylesheetLink);
      
      // Remove the preload link to avoid the warning
      link.remove();
    }
  });
  
  console.log('Preload warnings fixed');
});