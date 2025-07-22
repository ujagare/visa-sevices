// Basic marquee animation script
document.addEventListener('DOMContentLoaded', function() {
  // Get all marquee elements
  var marquees = document.querySelectorAll('.image-marquee-content, .choice-marquee-content');
  
  // Apply styles to each marquee
  marquees.forEach(function(marquee) {
    // Set basic styles
    marquee.style.display = 'flex';
    marquee.style.width = 'max-content';
    
    // Determine animation type
    if (marquee.classList.contains('image-marquee-content')) {
      marquee.style.animation = 'scroll-left 15s linear infinite';
    } else if (marquee.parentElement.classList.contains('choice-marquee-right')) {
      marquee.style.animation = 'scroll-left 15s linear infinite';
    } else if (marquee.parentElement.classList.contains('choice-marquee-left')) {
      marquee.style.animation = 'scroll-right 15s linear infinite';
    }
  });
});