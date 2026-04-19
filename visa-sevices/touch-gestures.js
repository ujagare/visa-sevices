/**
 * Touch Gestures Handler for White Wings Visa Consultancy
 * Enhances touch interactions for mobile devices
 */

document.addEventListener('DOMContentLoaded', function() {
    // Only apply on mobile devices
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        initTouchGestures();
    }
});

function initTouchGestures() {
    // Prevent double-tap zoom on mobile
    document.addEventListener('touchend', function(e) {
        const now = Date.now();
        const lastTouch = this.lastTouch || now + 1;
        const delta = now - lastTouch;
        if (delta < 500 && delta > 0) {
            e.preventDefault();
        }
        this.lastTouch = now;
    }, { passive: false });
    
    // Add touch feedback to buttons and links
    const touchElements = document.querySelectorAll('a, button, .btn, .cta-btn, .apply-btn');
    touchElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.classList.add('touch-active');
        }, { passive: true });
        
        element.addEventListener('touchend', function() {
            this.classList.remove('touch-active');
        }, { passive: true });
        
        element.addEventListener('touchcancel', function() {
            this.classList.remove('touch-active');
        }, { passive: true });
    });
    
    // Add CSS for touch feedback
    const style = document.createElement('style');
    style.textContent = `
        .touch-active {
            transform: scale(0.97) !important;
            transition: transform 0.1s ease !important;
        }
    `;
    document.head.appendChild(style);
    
    // Enhance scroll performance for specific sections
    enhanceScrollPerformance('.coaching-grid');
    enhanceScrollPerformance('.journey-steps');
    enhanceScrollPerformance('.university-logos');
    enhanceScrollPerformance('.testimonials-swiper');
}

function enhanceScrollPerformance(selector) {
    const element = document.querySelector(selector);
    if (!element) return;
    
    // Add momentum scrolling
    let startX, startY, startTime, endTime, distX, distY;
    let isScrolling = false;
    
    element.addEventListener('touchstart', function(e) {
        startX = e.touches[0].pageX;
        startY = e.touches[0].pageY;
        startTime = new Date().getTime();
        isScrolling = true;
    }, { passive: true });
    
    element.addEventListener('touchmove', function(e) {
        if (!isScrolling) return;
        
        const x = e.touches[0].pageX;
        const y = e.touches[0].pageY;
        
        distX = x - startX;
        distY = y - startY;
    }, { passive: true });
    
    element.addEventListener('touchend', function() {
        if (!isScrolling) return;
        
        endTime = new Date().getTime();
        const time = endTime - startTime;
        
        // Calculate velocity
        if (time < 300) {
            const velocityX = Math.abs(distX / time);
            const velocityY = Math.abs(distY / time);
            
            // Apply momentum if velocity is high enough
            if (velocityX > 0.5 || velocityY > 0.5) {
                const momentum = Math.max(velocityX, velocityY) * 100;
                
                // Apply momentum scroll
                if (Math.abs(distX) > Math.abs(distY)) {
                    // Horizontal momentum
                    const targetScroll = element.scrollLeft - (distX * momentum / 100);
                    smoothScrollTo(element, targetScroll, 'horizontal');
                } else {
                    // Vertical momentum
                    const targetScroll = element.scrollTop - (distY * momentum / 100);
                    smoothScrollTo(element, targetScroll, 'vertical');
                }
            }
        }
        
        isScrolling = false;
    }, { passive: true });
}

function smoothScrollTo(element, target, direction) {
    const start = direction === 'horizontal' ? element.scrollLeft : element.scrollTop;
    const distance = target - start;
    const duration = 300;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const easeProgress = easeOutCubic(progress);
        
        if (direction === 'horizontal') {
            element.scrollLeft = start + distance * easeProgress;
        } else {
            element.scrollTop = start + distance * easeProgress;
        }
        
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }
    
    requestAnimationFrame(animation);
}

function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}