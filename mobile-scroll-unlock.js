(function () {
    'use strict';

    function isMobileViewport() {
        return window.matchMedia('(max-width: 1024px)').matches;
    }

    function isLoaderVisible() {
        const loader = document.getElementById('loader');
        if (!loader) {
            return false;
        }

        const style = window.getComputedStyle(loader);
        return !loader.classList.contains('hidden') &&
            style.display !== 'none' &&
            style.visibility !== 'hidden' &&
            style.opacity !== '0';
    }

    function isMobileMenuOpen() {
        const menu = document.querySelector('.mobile-menu');
        return !!menu && menu.classList.contains('active');
    }

    function unlockMobileScroll() {
        if (!isMobileViewport() || !document.body) {
            return;
        }

        const menuOpen = isMobileMenuOpen();
        const loaderOpen = isLoaderVisible();

        document.body.classList.toggle('mobile-menu-open', menuOpen);
        document.body.classList.toggle('loader-active', loaderOpen);

        const shouldLock = menuOpen || loaderOpen;
        document.body.style.overflow = shouldLock ? 'hidden' : 'auto';
        document.body.style.overflowX = 'hidden';
        document.documentElement.style.overflowY = shouldLock ? 'hidden' : 'auto';
        document.documentElement.style.height = shouldLock ? '' : 'auto';
        document.body.style.height = shouldLock ? '' : 'auto';
    }

    function enableMobileScrollFallback() {
        let tracking = false;
        let lastY = 0;
        let startX = 0;
        let startY = 0;

        function shouldIgnoreTarget(target) {
            return !!target && !!target.closest('.mobile-navbar, .mobile-menu, .mobile-menu-overlay.active');
        }

        function canTrackTouch(target) {
            if (shouldIgnoreTarget(target)) {
                return false;
            }

            return document.documentElement.scrollHeight > window.innerHeight + 10;
        }

        document.addEventListener('touchstart', function (event) {
            if (!isMobileViewport() || !event.touches.length) {
                return;
            }

            const touch = event.touches[0];
            tracking = canTrackTouch(event.target);
            startX = touch.clientX;
            startY = touch.clientY;
            lastY = touch.clientY;
        }, { passive: true });

        document.addEventListener('touchmove', function (event) {
            if (!tracking || !event.touches.length) {
                return;
            }

            const touch = event.touches[0];
            const deltaY = lastY - touch.clientY;
            const totalX = Math.abs(touch.clientX - startX);
            const totalY = Math.abs(touch.clientY - startY);

            if (totalY > totalX && totalY > 8 && Math.abs(deltaY) > 0) {
                window.scrollBy(0, deltaY);
                event.preventDefault();
            }

            lastY = touch.clientY;
        }, { passive: false });

        document.addEventListener('touchend', function () {
            tracking = false;
        }, { passive: true });

        document.addEventListener('wheel', function (event) {
            if (!isMobileViewport() || shouldIgnoreTarget(event.target)) {
                return;
            }

            if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
                window.scrollBy(0, event.deltaY);
                event.preventDefault();
            }
        }, { passive: false });
    }

    window.unlockMobileScroll = unlockMobileScroll;

    document.addEventListener('DOMContentLoaded', function () {
        unlockMobileScroll();
        enableMobileScrollFallback();
        [100, 600, 1600, 3200, 5200].forEach(function (delay) {
            window.setTimeout(unlockMobileScroll, delay);
        });
    });

    window.addEventListener('load', unlockMobileScroll);
    window.addEventListener('pageshow', unlockMobileScroll);
    window.addEventListener('resize', unlockMobileScroll);
    window.addEventListener('orientationchange', function () {
        window.setTimeout(unlockMobileScroll, 250);
    });
})();
