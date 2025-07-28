// Secure Form Handler - Replace EmailJS
class SecureFormHandler {
    constructor() {
        this.apiUrl = 'https://whitewingsvisa.com/api'; // Your actual domain
        this.rateLimitKey = 'form_submissions';
        this.maxSubmissions = 3;
        this.timeWindow = 5 * 60 * 1000; // 5 minutes
    }

    // Check rate limiting
    checkRateLimit() {
        const now = Date.now();
        const submissions = JSON.parse(localStorage.getItem(this.rateLimitKey) || '[]');
        const recentSubmissions = submissions.filter(time => now - time < this.timeWindow);
        
        if (recentSubmissions.length >= this.maxSubmissions) {
            return false;
        }
        
        recentSubmissions.push(now);
        localStorage.setItem(this.rateLimitKey, JSON.stringify(recentSubmissions));
        return true;
    }

    // Sanitize input
    sanitizeInput(input) {
        if (typeof input !== 'string') return '';
        return input
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
            .replace(/<[^>]*>/g, '')
            .trim()
            .substring(0, 1000);
    }

    // Validate form data
    validateForm(formData) {
        const errors = [];
        
        // Required fields
        if (!formData.firstName || formData.firstName.length < 2) {
            errors.push('First name is required (minimum 2 characters)');
        }
        
        if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.push('Valid email address is required');
        }
        
        if (!formData.phone || !/^[0-9]{10}$/.test(formData.phone)) {
            errors.push('Valid 10-digit phone number is required');
        }
        
        if (!formData.message || formData.message.length < 10) {
            errors.push('Message is required (minimum 10 characters)');
        }
        
        return errors;
    }

    // Submit form securely
    async submitForm(formElement, formType = 'contact') {
        try {
            // Check rate limiting
            if (!this.checkRateLimit()) {
                throw new Error('Too many submissions. Please wait 5 minutes before trying again.');
            }

            const formData = new FormData(formElement);
            const data = {};
            
            // Extract and sanitize form data
            for (let [key, value] of formData.entries()) {
                data[key] = this.sanitizeInput(value);
            }
            
            data.formType = formType;
            
            // Validate form
            const errors = this.validateForm(data);
            if (errors.length > 0) {
                throw new Error(errors.join(', '));
            }

            // Submit to secure backend
            const response = await fetch(`${this.apiUrl}/api/contact/submit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            
            if (!response.ok) {
                throw new Error(result.message || 'Submission failed');
            }

            return result;
            
        } catch (error) {
            console.error('Form submission error:', error);
            throw error;
        }
    }

    // Show toast notification
    showToast(type, title, message) {
        const toast = document.createElement('div');
        toast.innerHTML = `
            <div id="toastMessage" style="
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%) translateY(-100px);
                background: ${type === 'success' ? 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' : 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'};
                color: #2d3748;
                padding: 20px 30px;
                border-radius: 50px;
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
                z-index: 10000;
                min-width: 320px;
                max-width: 500px;
                font-family: 'Inter', sans-serif;
                transition: transform 0.5s ease, opacity 0.5s ease;
            ">
                <div style="display: flex; align-items: center; gap: 15px;">
                    <div style="
                        width: 50px;
                        height: 50px;
                        background: rgba(255,255,255,0.6);
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 24px;
                    ">${type === 'success' ? '✨' : '⚡'}</div>
                    <div style="flex: 1;">
                        <div style="font-weight: 700; font-size: 18px; margin-bottom: 5px;">${title}</div>
                        <div style="font-size: 14px; opacity: 0.9; line-height: 1.4;">${message}</div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(toast);
        
        const toastEl = document.getElementById('toastMessage');
        
        setTimeout(() => {
            toastEl.style.transform = 'translateX(-50%) translateY(0)';
        }, 100);
        
        setTimeout(() => {
            toastEl.style.transform = 'translateX(-50%) translateY(-100px)';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 500);
        }, 4000);
    }

    // WhatsApp fallback
    openWhatsApp(formData) {
        const message = `🌟 *Website Inquiry*\n\n👤 *Name:* ${formData.firstName} ${formData.lastName || ''}\n📧 *Email:* ${formData.email}\n📱 *Phone:* ${formData.countryCode || '+91'}${formData.phone}\n💬 *Message:* ${formData.message}`;
        const whatsappURL = `https://wa.me/919130448831?text=${encodeURIComponent(message)}`;
        window.open(whatsappURL, '_blank');
    }
}

// Initialize secure form handler
const secureFormHandler = new SecureFormHandler();

// Replace EmailJS functions
window.sendHomeFormViaEmailJS = async function(event) {
    event.preventDefault();
    const form = event.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span style="color: #222 !important;">Sending...</span>';
    
    try {
        const result = await secureFormHandler.submitForm(form, 'home');
        secureFormHandler.showToast('success', '✅ Thank You!', result.message);
        form.reset();
    } catch (error) {
        secureFormHandler.showToast('error', '⚠️ Error', error.message);
        const formData = new FormData(form);
        setTimeout(() => secureFormHandler.openWhatsApp(Object.fromEntries(formData)), 2000);
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span style="color: #222 !important;">Send Message</span><i class="ri-send-plane-fill" style="color: #222 !important;"></i>';
    }
};

window.sendMigrateFormViaEmailJS = async function(event, formType = 'migrate') {
    event.preventDefault();
    const form = event.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending...';
    
    try {
        const result = await secureFormHandler.submitForm(form, formType);
        secureFormHandler.showToast('success', '✅ Thank You!', result.message);
        form.reset();
    } catch (error) {
        secureFormHandler.showToast('error', '⚠️ Error', error.message);
        const formData = new FormData(form);
        setTimeout(() => secureFormHandler.openWhatsApp(Object.fromEntries(formData)), 2000);
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Get Free Assessment';
    }
};

window.sendWorkFormViaEmailJS = async function(event, formType = 'work') {
    event.preventDefault();
    const form = event.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending...';
    
    try {
        const result = await secureFormHandler.submitForm(form, formType);
        secureFormHandler.showToast('success', '✅ Thank You!', result.message);
        form.reset();
    } catch (error) {
        secureFormHandler.showToast('error', '⚠️ Error', error.message);
        const formData = new FormData(form);
        setTimeout(() => secureFormHandler.openWhatsApp(Object.fromEntries(formData)), 2000);
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="ri-send-plane-line"></i> Get Free Assessment';
    }
};

window.sendVisitFormViaEmailJS = async function(event) {
    event.preventDefault();
    const form = event.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending...';
    
    try {
        const result = await secureFormHandler.submitForm(form, 'visit');
        secureFormHandler.showToast('success', '✅ Thank You!', result.message);
        form.reset();
    } catch (error) {
        secureFormHandler.showToast('error', '⚠️ Error', error.message);
        const formData = new FormData(form);
        setTimeout(() => secureFormHandler.openWhatsApp(Object.fromEntries(formData)), 2000);
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Submit Application';
    }
};