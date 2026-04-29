// Function to scroll coaching cards horizontally
function scrollCoachingCards(direction) {
    const container = document.querySelector('.coaching-grid');
    const cardWidth = document.querySelector('.coaching-card').offsetWidth + 30; // Card width + gap
    
    if (direction === 'left') {
        container.scrollBy({
            left: -cardWidth,
            behavior: 'smooth'
        });
    } else {
        container.scrollBy({
            left: cardWidth,
            behavior: 'smooth'
        });
    }
}

// Check if cards are visible and update scroll indicators
document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.coaching-grid');
    const leftIndicator = document.querySelector('.scroll-left');
    const rightIndicator = document.querySelector('.scroll-right');
    
    // Initially hide left indicator if at start
    if (container.scrollLeft === 0) {
        leftIndicator.style.opacity = '0.5';
    }
    
    // Update indicators on scroll
    container.addEventListener('scroll', function() {
        // Check if at start
        if (container.scrollLeft === 0) {
            leftIndicator.style.opacity = '0.5';
        } else {
            leftIndicator.style.opacity = '1';
        }
        
        // Check if at end
        if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
            rightIndicator.style.opacity = '0.5';
        } else {
            rightIndicator.style.opacity = '1';
        }
    });
});