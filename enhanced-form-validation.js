/**
 * Enhanced Form Validation for White Wings Visa
 * Provides client-side validation, spam protection, and better UX
 */

class WhiteWingsFormValidator {
    constructor() {
        this.forms = document.querySelectorAll('form[action*="formsubmit.co"], form[action*="form-handler.php"]');
        this.init();
    }

    init() {
        this.forms.forEach(form => {
            this.setupForm(form);
        });
    }

    setupForm(form) {
        // Add honeypot field for spam protection
        this.addHoneypot(form);
        
        // Add loading state
        this.addLoadingState(form);
        
        // Add real-time validation
        this.addRealTimeValidation(form);
        
        // Handle form submission
        form.addEventListener('submit', (e) => this.handleSubmit(e, form));
    }

    addHoneypot(form) {
        // Create hidden honeypot field
        const honeypot = document.createElement('input');
        honeypot.type = 'text';
        honeypot.name = 'website';
        honeypot.style.display = 'none';
        honeypot.style.position = 'absolute';
        honeypot.style.left = '-9999px';
        honeypot.tabIndex = -1;
        honeypot.autocomplete = 'off';
        form.appendChild(honeypot);
    }

    addLoadingState(form) {
        const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
        if (submitBtn) {
            submitBtn.dataset.originalText = submitBtn.textContent || submitBtn.value;
        }
    }

    addRealTimeValidation(form) {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            // Add validation on blur
            input.addEventListener('blur', () => this.validateField(input));
            
            // Add validation on input for specific fields
            if (input.type === 'email' || input.type === 'tel') {
                input.addEventListener('input', () => this.validateField(input));
            }
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';

        // Remove existing error styling
        this.clearFieldError(field);

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = `${this.getFieldLabel(field)} is required`;
        }

        // Email validation
        else if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }

        // Phone validation
        else if (field.type === 'tel' && value) {
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,15}$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number';
            }
        }

        // Name validation
        else if (fieldName.includes('name') && value) {
            const nameRegex = /^[a-zA-Z\s]{2,50}$/;
            if (!nameRegex.test(value)) {
                isValid = false;
                errorMessage = 'Name should contain only letters and be 2-50 characters';
            }
        }

        // File validation
        else if (field.type === 'file' && field.files.length > 0) {
            const file = field.files[0];
            const maxSize = 10 * 1024 * 1024; // 10MB
            const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
            
            if (file.size > maxSize) {
                isValid = false;
                errorMessage = 'File size must be less than 10MB';
            } else if (!allowedTypes.includes(file.type)) {
                isValid = false;
                errorMessage = 'Please upload PDF, JPG, PNG, DOC, or DOCX files only';
            }
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    }

    validateForm(form) {
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        let isFormValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });

        // Check honeypot
        const honeypot = form.querySelector('input[name="website"]');
        if (honeypot && honeypot.value) {
            isFormValid = false;
            this.showFormError(form, 'Spam detected. Please try again.');
        }

        return isFormValid;
    }

    async handleSubmit(e, form) {
        e.preventDefault();

        // Validate form
        if (!this.validateForm(form)) {
            this.showFormError(form, 'Please fix the errors above and try again.');
            return;
        }

        // Show loading state
        this.setLoadingState(form, true);

        try {
            // Add form type for better email organization
            this.addFormType(form);

            // Submit form
            const formData = new FormData(form);
            
            // Use fetch for better error handling
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData
            });

            const result = await response.json();
            
            if (response.ok && result.success) {
                // Success
                this.showSuccessMessage(form);
                
                // Redirect after delay
                setTimeout(() => {
                    const redirectUrl = form.querySelector('input[name="_next"]')?.value || 'thank-you.html';
                    window.location.href = redirectUrl;
                }, 2000);
            } else {
                throw new Error(result.message || 'Form submission failed');
            }

        } catch (error) {
            console.error('Form submission error:', error);
            this.showFormError(form, 'There was an error sending your message. Please try again or call us directly at +91 9130448831.');
        } finally {
            this.setLoadingState(form, false);
        }
    }

    addFormType(form) {
        // Determine form type based on page or form content
        let formType = 'General Contact';
        
        if (window.location.pathname.includes('study')) {
            formType = 'Study Abroad Inquiry';
        } else if (window.location.pathname.includes('work')) {
            formType = 'Work Visa Inquiry';
        } else if (window.location.pathname.includes('migrate')) {
            formType = 'Migration Inquiry';
        } else if (window.location.pathname.includes('visit')) {
            formType = 'Visit Visa Inquiry';
        } else if (window.location.pathname.includes('contact')) {
            formType = 'Contact Form Submission';
        }

        // Add hidden field if not exists
        if (!form.querySelector('input[name="form_type"]')) {
            const formTypeInput = document.createElement('input');
            formTypeInput.type = 'hidden';
            formTypeInput.name = 'form_type';
            formTypeInput.value = formType;
            form.appendChild(formTypeInput);
        }
    }

    setLoadingState(form, isLoading) {
        const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
        if (!submitBtn) return;

        if (isLoading) {
            submitBtn.disabled = true;
            submitBtn.textContent = '⏳ Sending...';
            submitBtn.style.opacity = '0.7';
        } else {
            submitBtn.disabled = false;
            submitBtn.textContent = submitBtn.dataset.originalText || 'Submit';
            submitBtn.style.opacity = '1';
        }
    }

    showFieldError(field, message) {
        field.classList.add('error');
        
        // Remove existing error message
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Add error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.color = '#ef4444';
        errorDiv.style.fontSize = '14px';
        errorDiv.style.marginTop = '5px';
        
        field.parentNode.appendChild(errorDiv);
    }

    clearFieldError(field) {
        field.classList.remove('error');
        const errorMessage = field.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }

    showFormError(form, message) {
        this.clearFormMessages(form);
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-error-message';
        errorDiv.innerHTML = `
            <div style="background: #fef2f2; border: 1px solid #fecaca; color: #dc2626; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <strong>❌ Error:</strong> ${message}
            </div>
        `;
        
        form.insertBefore(errorDiv, form.firstChild);
    }

    showSuccessMessage(form) {
        this.clearFormMessages(form);
        
        const successDiv = document.createElement('div');
        successDiv.className = 'form-success-message';
        successDiv.innerHTML = `
            <div style="background: #f0fdf4; border: 1px solid #bbf7d0; color: #166534; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <strong>✅ Success:</strong> Your message has been sent successfully! Redirecting...
            </div>
        `;
        
        form.insertBefore(successDiv, form.firstChild);
    }

    clearFormMessages(form) {
        const messages = form.querySelectorAll('.form-error-message, .form-success-message');
        messages.forEach(msg => msg.remove());
    }

    getFieldLabel(field) {
        const label = field.parentNode.querySelector('label');
        if (label) {
            return label.textContent.replace('*', '').trim();
        }
        return field.name.charAt(0).toUpperCase() + field.name.slice(1);
    }
}

// Enhanced CSS for form validation
const validationCSS = `
    <style>
    .error {
        border-color: #ef4444 !important;
        background-color: #fef2f2 !important;
    }
    
    .error-message {
        color: #ef4444;
        font-size: 14px;
        margin-top: 5px;
        display: block;
    }
    
    .form-error-message, .form-success-message {
        animation: slideDown 0.3s ease-out;
    }
    
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* Loading state for buttons */
    button[disabled] {
        cursor: not-allowed !important;
        opacity: 0.7 !important;
    }
    </style>
`;

// Add CSS to head
document.head.insertAdjacentHTML('beforeend', validationCSS);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new WhiteWingsFormValidator();
});

// Export for manual initialization if needed
window.WhiteWingsFormValidator = WhiteWingsFormValidator;
