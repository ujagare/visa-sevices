/**
 * Smooth Horizontal Scroll for White Wings Visa Consultancy
 * Improves horizontal scrolling in coaching cards and other horizontal elements
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize smooth horizontal scrolling for coaching grid
    initSmoothHorizontalScroll('.coaching-grid', '.coaching-card');
    
    // Initialize smooth horizontal scrolling for journey steps
    initSmoothHorizontalScroll('.journey-steps', '.journey-step');
    
    // Initialize smooth horizontal scrolling for university logos
    initSmoothHorizontalScroll('.university-logos', '.university-logo');
});

/**
 * Initialize smooth horizontal scrolling for a container
 * @param {string} containerSelector - CSS selector for the scrollable container
 * @param {string} itemSelector - CSS selector for the items inside the container
 */
function initSmoothHorizontalScroll(containerSelector, itemSelector) {
    const containers = document.querySelectorAll(containerSelector);
    
    containers.forEach(container => {
        // Skip if container not found
        if (!container) return;
        
        // Add scroll snapping
        container.style.scrollSnapType = 'x mandatory';
        container.style.scrollBehavior = 'smooth';
        
        // Add scroll snap align to items
        const items = container.querySelectorAll(itemSelector);
        items.forEach(item => {
            item.style.scrollSnapAlign = 'start';
        });
        
        // Add touch event listeners for smooth dragging
        let isDown = false;
        let startX;
        let scrollLeft;
        
        container.addEventListener('mousedown', (e) => {
            isDown = true;
            container.classList.add('active');
            startX = e.pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
        }, { passive: true });
        
        container.addEventListener('mouseleave', () => {
            isDown = false;
            container.classList.remove('active');
        }, { passive: true });
        
        container.addEventListener('mouseup', () => {
            isDown = false;
            container.classList.remove('active');
        }, { passive: true });
        
        container.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - container.offsetLeft;
            const walk = (x - startX) * 2; // Scroll speed multiplier
            container.scrollLeft = scrollLeft - walk;
        });
        
        // Touch events for mobile
        container.addEventListener('touchstart', (e) => {
            isDown = true;
            container.classList.add('active');
            startX = e.touches[0].pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
        }, { passive: true });
        
        container.addEventListener('touchend', () => {
            isDown = false;
            container.classList.remove('active');
        }, { passive: true });
        
        container.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            const x = e.touches[0].pageX - container.offsetLeft;
            const walk = (x - startX) * 1.5; // Scroll speed multiplier
            container.scrollLeft = scrollLeft - walk;
        }, { passive: true });
    });
}

/**
 * Scroll coaching cards horizontally
 * @param {string} direction - 'left' or 'right'
 */
function scrollCoachingCards(direction) {
    const container = document.querySelector('.coaching-grid');
    if (!container) return;
    
    const cardWidth = container.querySelector('.coaching-card').offsetWidth + 20; // Card width + margin
    const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
    
    container.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
    });
}