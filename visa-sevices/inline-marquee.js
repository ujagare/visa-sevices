// Ultra-simple marquee fix
(function() {
  // Create and add style element
  var style = document.createElement('style');
  style.textContent = `
    /* Simple animations */
    @keyframes marqueeLeft {
      from { transform: translateX(0); }
      to { transform: translateX(-50%); }
    }
    
    @keyframes marqueeRight {
      from { transform: translateX(-50%); }
      to { transform: translateX(0); }
    }
    
    /* Container styles */
    .countries-image-marquee-section, .choice-section,
    .image-marquee-container, .choice-marquee-line {
      overflow: hidden !important;
    }
    
    /* Content styles */
    .image-marquee-content {
      display: flex !important;
      width: max-content !important;
      animation: marqueeLeft 15s linear infinite !important;
    }
    
    .choice-marquee-right .choice-marquee-content {
      display: flex !important;
      width: max-content !important;
      animation: marqueeLeft 15s linear infinite !important;
    }
    
    .choice-marquee-left .choice-marquee-content {
      display: flex !important;
      width: max-content !important;
      animation: marqueeRight 15s linear infinite !important;
    }
  `;
  document.head.appendChild(style);
})();