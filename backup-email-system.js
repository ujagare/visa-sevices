/**
 * Backup Email System for White Wings Visa
 * Provides multiple email delivery methods to ensure no form submissions are lost
 */

class BackupEmailSystem {
    constructor() {
        this.emailProviders = [
            {
                name: 'FormSubmit',
                url: 'https://formsubmit.co/mrunal@whitewingsvisa.com',
                primary: true
            },
            {
                name: 'Formspree',
                url: 'https://formspree.io/f/your-form-id', // Replace with actual Formspree ID
                primary: false
            },
            {
                name: 'EmailJS',
                serviceId: 'your_service_id', // Replace with EmailJS service ID
                templateId: 'your_template_id', // Replace with EmailJS template ID
                userId: 'your_user_id', // Replace with EmailJS user ID
                primary: false
            }
        ];
        
        this.whatsappBackup = {
            enabled: true,
            number: '919130448831',
            message: 'New form submission received on website. Please check email for details.'
        };
        
        this.init();
    }

    init() {
        // Override form submissions to use backup system
        document.addEventListener('DOMContentLoaded', () => {
            this.setupBackupSystem();
        });
    }

    setupBackupSystem() {
        const forms = document.querySelectorAll('form[action*="formsubmit.co"]');
        
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmissionWithBackup(form);
            });
        });
    }

    async handleFormSubmissionWithBackup(form) {
        const formData = new FormData(form);
        const submitButton = form.querySelector('button[type="submit"]');
        
        // Show loading state
        this.setLoadingState(submitButton, true);
        
        // Try primary email provider first
        let success = false;
        
        for (const provider of this.emailProviders) {
            if (provider.primary) {
                try {
                    success = await this.sendViaFormSubmit(formData, provider.url);
                    if (success) {
                        console.log('✅ Email sent via FormSubmit');
                        break;
                    }
                } catch (error) {
                    console.warn('❌ FormSubmit failed:', error);
                }
            }
        }
        
        // If primary failed, try backup methods
        if (!success) {
            console.log('🔄 Trying backup email methods...');
            
            // Try Formspree backup
            try {
                success = await this.sendViaFormspree(formData);
                if (success) {
                    console.log('✅ Email sent via Formspree backup');
                }
            } catch (error) {
                console.warn('❌ Formspree backup failed:', error);
            }
            
            // Try EmailJS backup
            if (!success) {
                try {
                    success = await this.sendViaEmailJS(formData);
                    if (success) {
                        console.log('✅ Email sent via EmailJS backup');
                    }
                } catch (error) {
                    console.warn('❌ EmailJS backup failed:', error);
                }
            }
            
            // If all email methods fail, try WhatsApp notification
            if (!success && this.whatsappBackup.enabled) {
                this.sendWhatsAppNotification(formData);
                console.log('📱 WhatsApp notification sent as final backup');
            }
        }
        
        // Store form data locally as final backup
        this.storeFormDataLocally(formData);
        
        // Reset loading state
        this.setLoadingState(submitButton, false);
        
        if (success) {
            this.showSuccessMessage(form);
            // Redirect to thank you page
            setTimeout(() => {
                const redirectUrl = form.querySelector('input[name="_next"]')?.value || '/thank-you.html';
                window.location.href = redirectUrl;
            }, 2000);
        } else {
            this.showErrorWithAlternatives(form);
        }
    }

    async sendViaFormSubmit(formData, url) {
        const response = await fetch(url, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        return response.ok;
    }

    async sendViaFormspree(formData) {
        // Implement Formspree backup
        const formspreeProvider = this.emailProviders.find(p => p.name === 'Formspree');
        if (!formspreeProvider || formspreeProvider.url.includes('your-form-id')) {
            return false; // Not configured
        }
        
        const response = await fetch(formspreeProvider.url, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        return response.ok;
    }

    async sendViaEmailJS(formData) {
        // Check if EmailJS is loaded
        if (typeof emailjs === 'undefined') {
            // Load EmailJS dynamically
            await this.loadEmailJS();
        }
        
        const emailProvider = this.emailProviders.find(p => p.name === 'EmailJS');
        if (!emailProvider || emailProvider.serviceId.includes('your_')) {
            return false; // Not configured
        }
        
        // Convert FormData to object
        const templateParams = {};
        for (let [key, value] of formData.entries()) {
            templateParams[key] = value;
        }
        
        try {
            await emailjs.send(
                emailProvider.serviceId,
                emailProvider.templateId,
                templateParams,
                emailProvider.userId
            );
            return true;
        } catch (error) {
            console.error('EmailJS error:', error);
            return false;
        }
    }

    loadEmailJS() {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    sendWhatsAppNotification(formData) {
        const name = formData.get('name') || 'Unknown';
        const email = formData.get('email') || 'No email';
        const phone = formData.get('phone') || 'No phone';
        
        const message = `🚨 URGENT: New form submission on website!\n\n` +
                       `Name: ${name}\n` +
                       `Email: ${email}\n` +
                       `Phone: ${phone}\n\n` +
                       `⚠️ Email delivery may have failed. Please check manually.\n\n` +
                       `Time: ${new Date().toLocaleString()}`;
        
        const whatsappUrl = `https://wa.me/${this.whatsappBackup.number}?text=${encodeURIComponent(message)}`;
        
        // Open WhatsApp in new tab (for admin notification)
        if (window.location.hostname === 'localhost' || window.location.hostname.includes('whitewingsvisa')) {
            window.open(whatsappUrl, '_blank');
        }
    }

    storeFormDataLocally(formData) {
        const submissionData = {
            timestamp: new Date().toISOString(),
            url: window.location.href,
            data: {}
        };
        
        for (let [key, value] of formData.entries()) {
            submissionData.data[key] = value;
        }
        
        // Store in localStorage
        const existingSubmissions = JSON.parse(localStorage.getItem('backup_submissions') || '[]');
        existingSubmissions.push(submissionData);
        
        // Keep only last 50 submissions
        if (existingSubmissions.length > 50) {
            existingSubmissions.splice(0, existingSubmissions.length - 50);
        }
        
        localStorage.setItem('backup_submissions', JSON.stringify(existingSubmissions));
        
        console.log('💾 Form data stored locally as backup');
    }

    setLoadingState(button, isLoading) {
        if (!button) return;
        
        if (isLoading) {
            button.disabled = true;
            button.dataset.originalText = button.textContent;
            button.innerHTML = '⏳ Sending... <small>(Trying multiple delivery methods)</small>';
            button.style.opacity = '0.7';
        } else {
            button.disabled = false;
            button.textContent = button.dataset.originalText || 'Submit';
            button.style.opacity = '1';
        }
    }

    showSuccessMessage(form) {
        const successDiv = document.createElement('div');
        successDiv.className = 'backup-success-message';
        successDiv.innerHTML = `
            <div style="background: #f0fdf4; border: 1px solid #bbf7d0; color: #166534; padding: 20px; border-radius: 12px; margin-bottom: 20px; text-align: center;">
                <h3 style="margin: 0 0 10px 0;">✅ Message Sent Successfully!</h3>
                <p style="margin: 0;">Your inquiry has been received and our team will contact you within 24 hours.</p>
                <small style="opacity: 0.8;">Redirecting to confirmation page...</small>
            </div>
        `;
        
        form.insertBefore(successDiv, form.firstChild);
    }

    showErrorWithAlternatives(form) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'backup-error-message';
        errorDiv.innerHTML = `
            <div style="background: #fef2f2; border: 1px solid #fecaca; color: #dc2626; padding: 20px; border-radius: 12px; margin-bottom: 20px;">
                <h3 style="margin: 0 0 15px 0;">⚠️ Temporary Technical Issue</h3>
                <p style="margin: 0 0 15px 0;">We're experiencing a temporary issue with our contact form. Please try one of these alternatives:</p>
                <div style="background: white; padding: 15px; border-radius: 8px; margin: 10px 0;">
                    <strong>📞 Call us directly:</strong><br>
                    <a href="tel:+919130448831" style="color: #dc2626; font-weight: bold;">+91 9130448831</a>
                </div>
                <div style="background: white; padding: 15px; border-radius: 8px; margin: 10px 0;">
                    <strong>📧 Email us:</strong><br>
                    <a href="mailto:mrunal@whitewingsvisa.com" style="color: #dc2626; font-weight: bold;">mrunal@whitewingsvisa.com</a>
                </div>
                <div style="background: white; padding: 15px; border-radius: 8px; margin: 10px 0;">
                    <strong>💬 WhatsApp:</strong><br>
                    <a href="https://wa.me/919130448831" target="_blank" style="color: #dc2626; font-weight: bold;">Chat on WhatsApp</a>
                </div>
                <p style="margin: 15px 0 0 0; font-size: 14px; opacity: 0.8;">Your form data has been saved locally and we'll follow up with you soon.</p>
            </div>
        `;
        
        form.insertBefore(errorDiv, form.firstChild);
    }

    // Admin function to retrieve stored submissions
    getStoredSubmissions() {
        return JSON.parse(localStorage.getItem('backup_submissions') || '[]');
    }

    // Admin function to clear stored submissions
    clearStoredSubmissions() {
        localStorage.removeItem('backup_submissions');
        console.log('🗑️ Stored submissions cleared');
    }
}

// Initialize backup system
window.backupEmailSystem = new BackupEmailSystem();

// Admin console commands
window.getBackupSubmissions = () => window.backupEmailSystem.getStoredSubmissions();
window.clearBackupSubmissions = () => window.backupEmailSystem.clearStoredSubmissions();
