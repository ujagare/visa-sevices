// Appwrite Form Handler
const { Client, Databases, ID } = Appwrite;

const client = new Client()
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('6887870800286c98a528');

// Handle CORS by setting proper headers
client.headers = {
    ...client.headers,
    'X-Appwrite-Response-Format': '1.4.0'
};

const databases = new Databases(client);

const DATABASE_ID = '68878d4300198706e05e';
const COLLECTION_ID = '6887999b00177d160d49';

// Handle all forms
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        // Remove localhost action and add Appwrite handler
        form.removeAttribute('action');
        form.removeAttribute('method');
        
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Show loading
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Sending...';
            
            try {
                // Get form data
                const formData = new FormData(form);
                const data = {};
                for (let [key, value] of formData.entries()) {
                    data[key] = value;
                }
                
                // Prepare document for Appwrite
                const document = {
                    name: data.firstName || data.name || data.lastName || 'Unknown',
                    email: data.email || 'no-email@example.com',
                    phone: (data.countryCode || '+91') + (data.phone || '0000000000'),
                    message: data.message || data.notes || data.subject || 'No message',
                    formType: data.formType || 'contact',
                    visaType: data.visaType || data.visa_type || '',
                    destination: data.destination || data.destinationCountry || data.country || '',
                    submittedAt: new Date().toISOString()
                };
                
                // Save to Appwrite
                const response = await databases.createDocument(
                    DATABASE_ID,
                    COLLECTION_ID,
                    ID.unique(),
                    document
                );
                
                // Also send email via FormSubmit
                await sendEmailNotification(data, response.$id);
                
                // Show success
                showSuccessMessage('Thank you! Your inquiry has been submitted successfully. We will contact you within 2-4 hours.', response.$id);
                form.reset();
                
            } catch (error) {
                console.error('Appwrite error:', error);
                showErrorMessage('Failed to submit. Please try again or call +91 9130448831.');
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }
        });
    });
});

function showSuccessMessage(message, referenceId) {
    const successHTML = `
        <div id="successMessage" style="
            position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
            color: #2d3748; padding: 30px 40px; border-radius: 15px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); z-index: 10000;
            max-width: 450px; text-align: center; font-family: 'Inter', sans-serif;
        ">
            <div style="font-size: 48px; margin-bottom: 15px;">✅</div>
            <h3 style="margin: 0 0 10px 0; font-size: 20px; font-weight: 700;">Thank You!</h3>
            <p style="margin: 0 0 15px 0; font-size: 14px; line-height: 1.4;">${message}</p>
            <p style="margin: 0 0 20px 0; font-size: 12px; background: rgba(255,255,255,0.3); padding: 8px; border-radius: 5px;">
                <strong>Reference:</strong> ${referenceId}
            </p>
            <button onclick="closeSuccessMessage()" style="
                background: #4CAF50; color: white; border: none; padding: 10px 20px;
                border-radius: 5px; cursor: pointer; font-size: 14px; font-weight: 600;
            ">Close</button>
        </div>
        <div id="successOverlay" style="
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0, 0, 0, 0.5); z-index: 9999;
        " onclick="closeSuccessMessage()"></div>
    `;
    document.body.insertAdjacentHTML('beforeend', successHTML);
}

function showErrorMessage(message) {
    const errorHTML = `
        <div id="errorMessage" style="
            position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
            color: #2d3748; padding: 30px 40px; border-radius: 15px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); z-index: 10000;
            max-width: 450px; text-align: center; font-family: 'Inter', sans-serif;
        ">
            <div style="font-size: 48px; margin-bottom: 15px;">⚠️</div>
            <h3 style="margin: 0 0 10px 0; font-size: 20px; font-weight: 700;">Error</h3>
            <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 1.4;">${message}</p>
            <button onclick="closeErrorMessage()" style="
                background: #f56565; color: white; border: none; padding: 10px 20px;
                border-radius: 5px; cursor: pointer; font-size: 14px; font-weight: 600;
            ">Close</button>
        </div>
        <div id="errorOverlay" style="
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0, 0, 0, 0.5); z-index: 9999;
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

// Send email notification
async function sendEmailNotification(data, referenceId) {
    try {
        const emailData = new FormData();
        emailData.append('_subject', 'New Visa Inquiry - Ref: ' + referenceId);
        emailData.append('_captcha', 'false');
        emailData.append('_template', 'table');
        emailData.append('name', data.firstName || data.name || 'Unknown');
        emailData.append('email', data.email);
        emailData.append('phone', (data.countryCode || '+91') + (data.phone || ''));
        emailData.append('message', data.message || data.notes || 'No message');
        emailData.append('visaType', data.visaType || '');
        emailData.append('destination', data.destination || '');
        emailData.append('reference', referenceId);
        
        await fetch('https://formsubmit.co/2ad5406fe3ca5d4bc7c78f8b2a424961', {
            method: 'POST',
            body: emailData
        });
    } catch (error) {
        console.log('Email notification failed:', error);
        // Don't throw error - form submission should still succeed
    }
}