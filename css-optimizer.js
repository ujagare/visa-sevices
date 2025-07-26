// CSS Optimizer
document.addEventListener('DOMContentLoaded', function() {
  // Critical CSS loading optimization
  const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
  
  stylesheets.forEach(function(stylesheet) {
    // Add media="print" and then switch to "all" once loaded
    if (!stylesheet.hasAttribute('media')) {
      stylesheet.setAttribute('media', 'print');
      stylesheet.addEventListener('load', function() {
        this.setAttribute('media', 'all');
      });
    }
  });

  // Preload important CSS files
  const criticalStylesheets = ['style.css', 'white-wings-colors.css', 'navbar-fix.css'];
  criticalStylesheets.forEach(function(cssFile) {
    const links = document.querySelectorAll(`link[href*="${cssFile}"]`);
    links.forEach(function(link) {
      link.setAttribute('rel', 'preload');
      link.setAttribute('as', 'style');
      link.setAttribute('onload', "this.onload=null;this.rel='stylesheet'");
    });
  });
});