// Secure Form Handler for White Wings Visa Consultancy
document.addEventListener('DOMContentLoaded', function() {
    // Get CSRF token
    fetch('csrf-token.php')
        .then(response => response.json())
        .then(data => {
            document.getElementById('csrf_token').value = data.csrf_token;
        });

    const form = document.getElementById('visaContact');
    const submitBtn = form.querySelector('.btn-submit');
    const successCard = document.querySelector('.success-card');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Disable submit button
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="ri-loader-4-line"></i> Submitting...';
        
        try {
            const formData = new FormData(form);
            
            const response = await fetch('enhanced-mail-handler.php', {
                method: 'POST',
                body: formData
            });
            
            const result = await response.json();
            
            if (result.success) {
                // Show success message
                form.style.display = 'none';
                successCard.style.display = 'block';
                
                // Scroll to success message
                successCard.scrollIntoView({ behavior: 'smooth' });
                
                // Optional: Send to WhatsApp
                const phone = formData.get('phone');
                const visaType = formData.get('visaType');
                const destination = formData.get('destination');
                const message = `Hi! I just submitted a visa inquiry for ${visaType} to ${destination}. My phone: ${phone}`;
                const whatsappUrl = `https://wa.me/919130448831?text=${encodeURIComponent(message)}`;
                
                setTimeout(() => {
                    if (confirm('Would you like to also send a WhatsApp message for faster response?')) {
                        window.open(whatsappUrl, '_blank');
                    }
                }, 2000);
                
            } else {
                alert('Error: ' + result.message);
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Start My Visa Journey';
            }
            
        } catch (error) {
            console.error('Form submission error:', error);
            alert('Network error. Please try again or contact us directly.');
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Start My Visa Journey';
        }
    });
});

// Show form again for new request
function showForm() {
    document.getElementById('visaContact').style.display = 'block';
    document.querySelector('.success-card').style.display = 'none';
    document.getElementById('visaContact').reset();
    
    // Get new CSRF token
    fetch('csrf-token.php')
        .then(response => response.json())
        .then(data => {
            document.getElementById('csrf_token').value = data.csrf_token;
        });
}

// File upload preview
document.getElementById('docs').addEventListener('change', function(e) {
    const files = e.target.files;
    const fileText = e.target.nextElementSibling;
    
    if (files.length > 0) {
        const fileNames = Array.from(files).map(f => f.name).join(', ');
        fileText.textContent = `${files.length} file(s) selected: ${fileNames}`;
    } else {
        fileText.textContent = 'Upload passport copy, photos, or other documents';
    }
});

// Enhanced form validation
const inputs = document.querySelectorAll('input[required], select[required], textarea[required]');
inputs.forEach(input => {
    input.addEventListener('blur', validateField);
    input.addEventListener('input', clearError);
});

function validateField(e) {
    const field = e.target;
    const errorDiv = field.closest('.field').querySelector('.error-message');
    
    if (!field.value.trim()) {
        showError(field, 'This field is required');
        return false;
    }
    
    if (field.type === 'email' && !isValidEmail(field.value)) {
        showError(field, 'Please enter a valid email address');
        return false;
    }
    
    if (field.type === 'tel' && !isValidPhone(field.value)) {
        showError(field, 'Please enter a valid phone number');
        return false;
    }
    
    clearError(e);
    return true;
}

function showError(field, message) {
    const errorDiv = field.closest('.field').querySelector('.error-message');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    field.style.borderColor = '#ff4444';
}

function clearError(e) {
    const field = e.target;
    const errorDiv = field.closest('.field').querySelector('.error-message');
    errorDiv.style.display = 'none';
    field.style.borderColor = '';
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
    return /^[\+]?[0-9\s\-\(\)]{10,}$/.test(phone);
}