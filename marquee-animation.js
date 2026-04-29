/**
 * Marquee Animation Fix
 * This script ensures marquee animations work properly on all devices and browsers
 */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    initMarquees();
});

// Wait for window to fully load
window.addEventListener('load', function() {
    // Force immediate initialization
    initMarquees();
    
    // Try again after a short delay to ensure animations start
    setTimeout(initMarquees, 100);
    setTimeout(initMarquees, 500);
    setTimeout(initMarquees, 1000);
    
    // Periodically check and fix marquees
    setInterval(initMarquees, 3000);
});

// Initialize all marquee animations
function initMarquees() {
    const marquees = {
        imageMarquee: document.querySelector('.image-marquee-content'),
        rightMarquee: document.querySelector('.choice-marquee-right .choice-marquee-content'),
        leftMarquee: document.querySelector('.choice-marquee-left .choice-marquee-content')
    };
    
    // Apply fixes to each marquee
    Object.values(marquees).forEach(function(marquee) {
        if (marquee) {
            fixMarquee(marquee);
        }
    });
}

// Fix a single marquee element
function fixMarquee(marquee) {
    // Apply hardware acceleration
    applyHardwareAcceleration(marquee);
    
    // Force restart animation
    restartAnimation(marquee);
    
    // Make sure animation is running
    marquee.style.animationPlayState = 'running';
    marquee.style.webkitAnimationPlayState = 'running';
}

// Apply hardware acceleration to element
function applyHardwareAcceleration(element) {
    element.style.transform = 'translate3d(0, 0, 0)';
    element.style.webkitTransform = 'translate3d(0, 0, 0)';
    element.style.willChange = 'transform';
    element.style.backfaceVisibility = 'hidden';
    element.style.webkitBackfaceVisibility = 'hidden';
    element.style.perspective = '1000px';
    element.style.webkitPerspective = '1000px';
}

// Restart animation with force reflow
function restartAnimation(element) {
    // Store original animation
    const computedStyle = window.getComputedStyle(element);
    const originalAnimation = computedStyle.animation || computedStyle.webkitAnimation;
    
    // Pause animation
    element.style.animationPlayState = 'paused';
    element.style.webkitAnimationPlayState = 'paused';
    
    // Force reflow
    void element.offsetWidth;
    
    // Remove animation
    element.style.animation = 'none';
    element.style.webkitAnimation = 'none';
    
    // Force reflow again
    void element.offsetWidth;
    
    // Set appropriate animation based on element class
    if (element.classList.contains('image-marquee-content')) {
        element.style.animation = 'imageMarqueeScroll 40s linear infinite';
        element.style.webkitAnimation = 'imageMarqueeScroll 40s linear infinite';
    } else if (element.parentElement.classList.contains('choice-marquee-right')) {
        element.style.animation = 'choiceMarqueeRight 40s linear infinite';
        element.style.webkitAnimation = 'choiceMarqueeRight 40s linear infinite';
    } else if (element.parentElement.classList.contains('choice-marquee-left')) {
        element.style.animation = 'choiceMarqueeLeft 40s linear infinite';
        element.style.webkitAnimation = 'choiceMarqueeLeft 40s linear infinite';
    }
    
    // Resume animation
    element.style.animationPlayState = 'running';
    element.style.webkitAnimationPlayState = 'running';
}

// Fix marquees on scroll (with throttling)
let scrollTimeout;
window.addEventListener('scroll', function() {
    if (!scrollTimeout) {
        scrollTimeout = setTimeout(function() {
            initMarquees();
            scrollTimeout = null;
        }, 200);
    }
}, {passive: true});

// Fix marquees on resize (with throttling)
let resizeTimeout;
window.addEventListener('resize', function() {
    if (!resizeTimeout) {
        resizeTimeout = setTimeout(function() {
            initMarquees();
            resizeTimeout = null;
        }, 200);
    }
});

// Fix marquees when tab becomes visible
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
        initMarquees();
    }
});

// Fix marquees on orientation change (mobile)
window.addEventListener('orientationchange', function() {
    setTimeout(initMarquees, 100);
});

// Touch events for mobile devices
document.addEventListener('touchstart', function() {
    initMarquees();
});

// Fix for iOS devices
if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
    window.addEventListener('touchmove', function() {
        initMarquees();
    });
}

// Special fix for mobile devices
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    // Apply mobile-specific fixes
    document.addEventListener('DOMContentLoaded', function() {
        const marquees = [
            document.querySelector('.image-marquee-content'),
            document.querySelector('.choice-marquee-right .choice-marquee-content'),
            document.querySelector('.choice-marquee-left .choice-marquee-content')
        ];
        
        marquees.forEach(function(marquee) {
            if (marquee) {
                // Apply stronger hardware acceleration for mobile
                marquee.style.transform = 'translate3d(0, 0, 0)';
                marquee.style.webkitTransform = 'translate3d(0, 0, 0)';
                marquee.style.willChange = 'transform';
                marquee.style.backfaceVisibility = 'hidden';
                marquee.style.webkitBackfaceVisibility = 'hidden';
                
                // Use shorter animation duration on mobile
                if (marquee.classList.contains('image-marquee-content')) {
                    marquee.style.animation = 'imageMarqueeScroll 30s linear infinite';
                    marquee.style.webkitAnimation = 'imageMarqueeScroll 30s linear infinite';
                } else if (marquee.parentElement.classList.contains('choice-marquee-right')) {
                    marquee.style.animation = 'choiceMarqueeRight 30s linear infinite';
                    marquee.style.webkitAnimation = 'choiceMarqueeRight 30s linear infinite';
                } else if (marquee.parentElement.classList.contains('choice-marquee-left')) {
                    marquee.style.animation = 'choiceMarqueeLeft 30s linear infinite';
                    marquee.style.webkitAnimation = 'choiceMarqueeLeft 30s linear infinite';
                }
            }
        });
    });
}