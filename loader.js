// Loader JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Show loader on page load
    showLoader();
    
    // Hide loader after page is fully loaded
    window.addEventListener('load', function() {
        setTimeout(hideLoader, 1500); // Show loader for at least 1.5 seconds
    });
});

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
        
        // Remove loader from DOM after animation
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
}

// Optional: Show loader for navigation
function showLoaderForNavigation() {
    showLoader();
    setTimeout(hideLoader, 1000);
}

// Add to any navigation links if needed
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function() {
        // Optional: Add loader for smooth section transitions
        // showLoaderForNavigation();
    });
});