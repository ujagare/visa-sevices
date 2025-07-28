// AJAX Form Handler - No page redirect
document.addEventListener('DOMContentLoaded', function() {
    // Handle all forms with AJAX
    const forms = document.querySelectorAll('form[action*="localhost:3000"]');
    
    forms.forEach(form => {
        form.addEventListener('submit', async function(e) {
            e.preventDefault(); // Prevent default form submission
            
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Sending...';
            
            try {
                // Get form data
                const formData = new FormData(form);
                
                // Convert to JSON
                const data = {};
                for (let [key, value] of formData.entries()) {
                    data[key] = value;
                }
                
                // Send AJAX request
                const response = await fetch(form.action, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });
                
                const result = await response.json();
                
                if (result.success) {
                    // Show success message
                    showSuccessMessage(result.message, result.referenceNumber);
                    form.reset();
                } else {
                    throw new Error(result.message || 'Submission failed');
                }
                
            } catch (error) {
                console.error('Form submission error:', error);
                showErrorMessage(error.message);
            } finally {
                // Reset button
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }
        });
    });
});

function showSuccessMessage(message, referenceNumber) {
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
            max-width: 450px;
            text-align: center;
            font-family: 'Inter', sans-serif;
        ">
            <div style="font-size: 48px; margin-bottom: 15px;">✅</div>
            <h3 style="margin: 0 0 10px 0; font-size: 20px; font-weight: 700;">Thank You!</h3>
            <p style="margin: 0 0 15px 0; font-size: 14px; line-height: 1.4;">${message}</p>
            ${referenceNumber ? `<p style="margin: 0 0 20px 0; font-size: 12px; background: rgba(255,255,255,0.3); padding: 8px; border-radius: 5px;"><strong>Reference:</strong> ${referenceNumber}</p>` : ''}
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

function showErrorMessage(message) {
    const errorHTML = `
        <div id="errorMessage" style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
            color: #2d3748;
            padding: 30px 40px;
            border-radius: 15px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            z-index: 10000;
            max-width: 450px;
            text-align: center;
            font-family: 'Inter', sans-serif;
        ">
            <div style="font-size: 48px; margin-bottom: 15px;">⚠️</div>
            <h3 style="margin: 0 0 10px 0; font-size: 20px; font-weight: 700;">Error</h3>
            <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 1.4;">${message}</p>
            <button onclick="closeErrorMessage()" style="
                background: #f56565;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 5px;
                cursor: pointer;
                font-size: 14px;
                font-weight: 600;
            ">Close</button>
        </div>
        <div id="errorOverlay" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 9999;
        " onclick="closeErrorMessage()"></div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', errorHTML);
}

function closeSuccessMessage() {
    const message = document.getElementById('successMessage');
    const overlay = document.getElementById('successOverlay');
    if (message) message.remove();
    if (overlay) overlay.remove();
}

function closeErrorMessage() {
    const message = document.getElementById('errorMessage');
    const overlay = document.getElementById('errorOverlay');
    if (message) message.remove();
    if (overlay) overlay.remove();
}