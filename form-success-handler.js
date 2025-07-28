// Form Success Handler - Show success message instead of redirect
document.addEventListener('DOMContentLoaded', function() {
    // Check if page was redirected from FormSubmit
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true' || window.location.hash === '#success') {
        showSuccessMessage();
    }

    // Add form submission handlers
    const forms = document.querySelectorAll('form[action*="formsubmit.co"]');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = 'Sending...';
            }
        });
    });
});

function showSuccessMessage() {
    const successHTML = `
        <div id="successMessage" style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
            color: #2d3748;
            padding: 30px 40px;
            border-radius: 15px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            z-index: 10000;
            max-width: 400px;
            text-align: center;
            font-family: 'Inter', sans-serif;
        ">
            <div style="font-size: 48px; margin-bottom: 15px;">✅</div>
            <h3 style="margin: 0 0 10px 0; font-size: 20px; font-weight: 700;">Thank You!</h3>
            <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 1.4;">Your message has been sent successfully. We will contact you within 2-4 hours.</p>
            <button onclick="closeSuccessMessage()" style="
                background: #4CAF50;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 5px;
                cursor: pointer;
                font-size: 14px;
                font-weight: 600;
            ">Close</button>
        </div>
        <div id="successOverlay" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 9999;
        " onclick="closeSuccessMessage()"></div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', successHTML);
}

function closeSuccessMessage() {
    const message = document.getElementById('successMessage');
    const overlay = document.getElementById('successOverlay');
    if (message) message.remove();
    if (overlay) overlay.remove();
    
    // Clean URL
    if (window.location.hash === '#success') {
        history.replaceState(null, null, window.location.pathname);
    }
}