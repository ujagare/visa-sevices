// Direct marquee fix - runs immediately
(function() {
    // Fix marquees immediately
    fixMarquees();
    
    // Also fix after window loads
    window.addEventListener('load', fixMarquees);
    
    function fixMarquees() {
        // Get all marquee elements
        var imageMarquee = document.querySelector('.image-marquee-content');
        var rightMarquee = document.querySelector('.choice-marquee-right .choice-marquee-content');
        var leftMarquee = document.querySelector('.choice-marquee-left .choice-marquee-content');
        
        // Fix image marquee
        if (imageMarquee) {
            imageMarquee.style.cssText = "animation: none; display: flex; width: max-content;";
            void imageMarquee.offsetWidth; // Force reflow
            imageMarquee.style.cssText = "animation: imageMarqueeScroll 20s linear infinite; display: flex; width: max-content; transform: translate3d(0,0,0); -webkit-transform: translate3d(0,0,0);";
        }
        
        // Fix right marquee
        if (rightMarquee) {
            rightMarquee.style.cssText = "animation: none; display: flex; width: max-content;";
            void rightMarquee.offsetWidth; // Force reflow
            rightMarquee.style.cssText = "animation: choiceMarqueeRight 20s linear infinite; display: flex; width: max-content; transform: translate3d(0,0,0); -webkit-transform: translate3d(0,0,0);";
        }
        
        // Fix left marquee
        if (leftMarquee) {
            leftMarquee.style.cssText = "animation: none; display: flex; width: max-content;";
            void leftMarquee.offsetWidth; // Force reflow
            leftMarquee.style.cssText = "animation: choiceMarqueeLeft 20s linear infinite; display: flex; width: max-content; transform: translate3d(0,0,0); -webkit-transform: translate3d(0,0,0);";
        }
    }
    
    // Fix on scroll
    window.addEventListener('scroll', fixMarquees);
})();