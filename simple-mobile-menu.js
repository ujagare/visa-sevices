// SIMPLE MOBILE MENU - WORKING VERSION
console.log('SIMPLE MOBILE MENU: Loading...');

document.addEventListener('DOMContentLoaded', function() {
    console.log('SIMPLE MOBILE MENU: DOM Ready');
    
    const hamburger = document.getElementById('simple-hamburger');
    const overlay = document.querySelector('.mobile-menu-overlay');
    const sidebar = document.querySelector('.mobile-menu-sidebar');
    const closeBtn = document.querySelector('.mobile-menu-close');
    
    console.log('Elements found:', {
        hamburger: !!hamburger,
        overlay: !!overlay,
        sidebar: !!sidebar,
        closeBtn: !!closeBtn
    });
    
    if (!hamburger || !overlay || !sidebar) {
        console.error('Required elements not found!');
        return;
    }
    
    // Open menu
    function openMenu() {
        console.log('Opening menu...');
        overlay.classList.add('show');
        sidebar.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
    
    // Close menu
    function closeMenu() {
        console.log('Closing menu...');
        overlay.classList.remove('show');
        sidebar.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
    
    // Hamburger click
    hamburger.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Hamburger clicked!');
        openMenu();
    });
    
    // Close button click
    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Close button clicked!');
            closeMenu();
        });
    }
    
    // Overlay click
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            console.log('Overlay clicked!');
            closeMenu();
        }
    });
    
    // Menu links click
    const menuLinks = document.querySelectorAll('.mobile-menu-links a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('Menu link clicked!');
            closeMenu();
        });
    });
    
    console.log('SIMPLE MOBILE MENU: Initialized!');
});

console.log('SIMPLE MOBILE MENU: Script loaded!');
