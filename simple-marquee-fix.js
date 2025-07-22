/**
 * Simple Marquee Fix
 * Minimal script to make marquees work on all devices
 */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    fixMarquees();
});

// Wait for window to fully load
window.addEventListener('load', function() {
    fixMarquees();
});

// Fix all marquee animations
function fixMarquees() {
    // Get all marquee elements
    const marquees = [
        document.querySelector('.image-marquee-content'),
        document.querySelector('.choice-marquee-right .choice-marquee-content'),
        document.querySelector('.choice-marquee-left .choice-marquee-content')
    ];
    
    // Apply fixes to each marquee
    marquees.forEach(function(marquee) {
        if (marquee) {
            // Apply hardware acceleration
            marquee.style.transform = 'translate3d(0, 0, 0)';
            marquee.style.webkitTransform = 'translate3d(0, 0, 0)';
            marquee.style.willChange = 'transform';
            
            // Force restart animation
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            
            // Set animation duration based on device
            if (isMobile) {
                if (marquee.classList.contains('image-marquee-content')) {
                    marquee.style.animation = 'imageMarqueeScroll 30s linear infinite';
                } else if (marquee.parentElement.classList.contains('choice-marquee-right')) {
                    marquee.style.animation = 'choiceMarqueeRight 30s linear infinite';
                } else if (marquee.parentElement.classList.contains('choice-marquee-left')) {
                    marquee.style.animation = 'choiceMarqueeLeft 30s linear infinite';
                }
            }
            
            // Ensure animation is running
            marquee.style.animationPlayState = 'running';
        }
    });
}

// Fix marquees on scroll
window.addEventListener('scroll', fixMarquees, {passive: true});

// Fix marquees when tab becomes visible
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
        fixMarquees();
    }
});