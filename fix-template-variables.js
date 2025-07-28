// Fixed EmailJS with all form data in message
(function() {
    const CONFIG = {
        publicKey: 'NlMqgBFp-rvSczC6R',
        serviceId: 'service_tm90t9i',
        templateId: 'template_mh60jjq'
    };

    emailjs.init(CONFIG.publicKey);

    window.sendViaEmailJS = function(event) {
        event.preventDefault();
        
        const form = document.getElementById('visaContact');
        const submitBtn = form.querySelector('button[type="submit"]');
        
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending...';
        
        const formData = new FormData(form);
        

        
        // Create simple professional email template
        const completeMessage = `
===============================================================================
                          NEW VISA INQUIRY - WHITE WINGS
                         mrunal@whitewingsvisa.com
                            +91 9130448831
===============================================================================

CUSTOMER INFORMATION:
---------------------
Name:             ${formData.get('name') || 'Not provided'}
Email:            ${formData.get('email') || 'Not provided'}
Phone:            ${formData.get('countryCode') || '+91'}${formData.get('phone') || 'Not provided'}
Current Country:  ${formData.get('country') || 'Not provided'}

VISA REQUIREMENTS:
------------------
Visa Type:        ${formData.get('visaType') || 'Not provided'}
Destination:      ${formData.get('destination') || 'Not provided'}
Travel Date:      ${formData.get('travelDate') || 'Not provided'}
Passport Status:  ${formData.get('passportStatus') || 'Not provided'}

APPLICATION DETAILS:
--------------------
Number of Travelers:    ${formData.get('travelers') || 'Not provided'}
Preferred Contact:      ${formData.get('contactPref') || 'Not provided'}
Urgency Level:          ${formData.get('urgency') || 'Not provided'} ${formData.get('urgency')?.includes('Urgent') ? '*** PRIORITY ***' : ''}
Previous Experience:    ${formData.get('experience') || 'Not provided'}

${formData.get('notes') ? `ADDITIONAL NOTES:
-----------------
${formData.get('notes')}

` : ''}QUICK ACTIONS:
--------------
Call:          ${formData.get('phone')}
Email:         ${formData.get('email')}
WhatsApp:      https://wa.me/91${formData.get('phone')?.replace(/[^0-9]/g, '')}

SUBMISSION DETAILS:
-------------------
Received:      ${new Date().toLocaleString()}
Source:        White Wings Website Contact Form
Reference:     WW-${Date.now().toString().slice(-6)}

===============================================================================
NEXT STEPS: Contact customer within 2-4 hours for consultation
ASSIGNED TO: Mrunal Hazare - Senior Visa Consultant
===============================================================================
        `;
        
        const templateParams = {
            from_name: formData.get('name') || 'Website Visitor',
            from_email: formData.get('email') || 'no-email@provided.com',
            to_email: 'mrunal@whitewingsvisa.com',
            message: completeMessage
        };
        
        // Validate required fields
            if (!formData.get('name') || !formData.get('email') || !formData.get('phone') || !formData.get('country') || !formData.get('notes')) {
            showToast('error', '⚠️ Required Fields Missing', 'Please fill in all required fields: Name, Email, Phone, Country, and Message.');
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Start My Visa Journey';
            return;
        }
        
        // Validate phone number format
        const phonePattern = /^[0-9]{10}$/;
        if (!phonePattern.test(formData.get('phone'))) {
            showToast('error', '⚠️ Invalid Phone Number', 'Please enter 10 digit phone number.');
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Start My Visa Journey';
            return;
        }
        
        console.log('Sending complete form data:', templateParams);
        
        emailjs.send(CONFIG.serviceId, CONFIG.templateId, templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response);
                showToast('success', '✅ Thank You!', 'Your visa inquiry has been sent successfully. We will contact you within 2-4 hours.');
                form.reset();
            })
            .catch(function(error) {
                console.error('EmailJS Error:', error);
                showToast('error', '⚠️ Service Unavailable', 'Redirecting to WhatsApp for immediate assistance...');
                setTimeout(() => openWhatsApp(formData), 2000);
            })
            .finally(function() {
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Start My Visa Journey';
            });
    };
    
    function showToast(type, title, message) {
        const toast = document.createElement('div');
        toast.className = 'custom-toast';
        
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
                        backdrop-filter: blur(10px);
                        border: 2px solid rgba(255,255,255,0.8);
                        animation: pulse 2s infinite;
                    ">${type === 'success' ? '✨' : '⚡'}</div>
                    <div style="flex: 1;">
                        <div style="
                            font-weight: 700;
                            font-size: 18px;
                            margin-bottom: 5px;
                            text-shadow: 0 2px 4px rgba(0,0,0,0.1);
                            letter-spacing: 0.5px;
                        ">${title}</div>
                        <div style="
                            font-size: 14px;
                            opacity: 0.9;
                            line-height: 1.4;
                            font-weight: 400;
                        ">${message}</div>
                    </div>
                </div>
                <style>
                    @keyframes slideDown {
                        0% { transform: translateX(-50%) translateY(-100px); opacity: 0; }
                        100% { transform: translateX(-50%) translateY(0); opacity: 1; }
                    }
                    @keyframes pulse {
                        0%, 100% { transform: scale(1); }
                        50% { transform: scale(1.05); }
                    }
                </style>
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
    
    function openWhatsApp(formData) {
        const message = `🛂 *New Visa Inquiry*\n\n👤 *Name:* ${formData.get('name')}\n📧 *Email:* ${formData.get('email')}\n📱 *Phone:* ${formData.get('countryCode')}${formData.get('phone')}\n🎯 *Visa Type:* ${formData.get('visaType')}\n🏁 *Destination:* ${formData.get('destination')}`;
        const whatsappURL = `https://wa.me/919130448831?text=${encodeURIComponent(message)}`;
        window.open(whatsappURL, '_blank');
    }
})();