// Loader JavaScript with Lottie Animation
let lottieAnimation = null;

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lottie animation
    initLottieLoader();

    // Show loader on page load
    showLoader();

    // Hide loader after page is fully loaded
    window.addEventListener('load', function() {
        setTimeout(hideLoader, 2000); // Show loader for at least 2 seconds to enjoy animation
    });
});

function initLottieLoader() {
    console.log('Initializing Lottie loader...');

    // Check if Lottie is available
    if (typeof lottie !== 'undefined') {
        console.log('Lottie library found');
        const lottieContainer = document.getElementById('lottie-loader');
        if (lottieContainer) {
            console.log('Lottie container found');
            try {
                lottieAnimation = lottie.loadAnimation({
                    container: lottieContainer,
                    renderer: 'svg',
                    loop: true,
                    autoplay: true,
                    animationData: animationData
                });

                // Add event listeners
                lottieAnimation.addEventListener('DOMLoaded', function() {
                    console.log('Lottie animation DOM loaded');
                });

                lottieAnimation.addEventListener('complete', function() {
                    console.log('Lottie animation completed');
                });

                lottieAnimation.addEventListener('loopComplete', function() {
                    console.log('Lottie animation loop completed');
                });

                lottieAnimation.addEventListener('error', function(error) {
                    console.error('Lottie animation error:', error);
                    showFallbackLoader();
                });

                lottieAnimation.addEventListener('data_ready', function() {
                    console.log('Lottie animation data ready');
                });

                lottieAnimation.addEventListener('data_failed', function() {
                    console.error('Lottie animation data failed to load');
                    showFallbackLoader();
                });

                console.log('Lottie animation initialized successfully');
            } catch (error) {
                console.error('Error initializing Lottie:', error);
                showFallbackLoader();
            }
        } else {
            console.error('Lottie container not found');
            showFallbackLoader();
        }
    } else {
        console.warn('Lottie library not loaded');
        showFallbackLoader();
    }
}

function showFallbackLoader() {
    console.log('Showing fallback loader');
    const lottieContainer = document.getElementById('lottie-loader');
    if (lottieContainer) {
        lottieContainer.innerHTML = `
            <div class="fallback-loader">
                <div class="loader-spinner"></div>
            </div>
        `;
        console.log('Fallback loader displayed');
    }
}

function showLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
}

function hideLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.classList.add('hidden');
        document.body.style.overflow = 'auto'; // Enable scrolling

        // Stop Lottie animation
        if (lottieAnimation) {
            lottieAnimation.pause();
        }

        // Remove loader from DOM after animation
        setTimeout(() => {
            loader.style.display = 'none';
            if (lottieAnimation) {
                lottieAnimation.destroy();
                lottieAnimation = null;
            }
        }, 500);
    }
}

// Optional: Show loader for navigation
function showLoaderForNavigation() {
    initLottieLoader(); // Reinitialize animation if needed
    showLoader();
    setTimeout(hideLoader, 1500);
}

// Add to any navigation links if needed
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function() {
        // Optional: Add loader for smooth section transitions
        // showLoaderForNavigation();
    });
});