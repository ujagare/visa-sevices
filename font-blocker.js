// This script runs before the page loads to prevent font loading errors
(function() {
  // Remove any existing Gilroy font references from the document
  const styleSheets = document.styleSheets;
  for (let i = 0; i < styleSheets.length; i++) {
    try {
      const cssRules = styleSheets[i].cssRules;
      for (let j = 0; j < cssRules.length; j++) {
        if (cssRules[j].cssText && cssRules[j].cssText.includes('Gilroy')) {
          styleSheets[i].deleteRule(j);
          j--;
        }
      }
    } catch (e) {
      // Cross-origin stylesheet access error - ignore
    }
  }
  
  // Prevent any future font loading attempts
  const originalCreateElement = document.createElement;
  document.createElement = function(tagName) {
    const element = originalCreateElement.call(document, tagName);
    if (tagName.toLowerCase() === 'link') {
      const originalSetAttribute = element.setAttribute;
      element.setAttribute = function(name, value) {
        if (name === 'href' && value && value.includes('fonts.cdnfonts.com')) {
          console.log('Blocked loading of problematic font:', value);
          return;
        }
        return originalSetAttribute.call(this, name, value);
      };
    }
    return element;
  };
})();