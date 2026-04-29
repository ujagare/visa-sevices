// WhatsApp Contact Integration for Static Website
function sendToWhatsApp(event) {
    event.preventDefault();
    
    // Get form data
    const form = document.getElementById('visaContact');
    const formData = new FormData(form);
    
    const name = formData.get('name') || '';
    const email = formData.get('email') || '';
    const phone = formData.get('phone') || '';
    const country = formData.get('country') || '';
    const visaType = formData.get('visaType') || '';
    const destination = formData.get('destination') || '';
    const travelDate = formData.get('travelDate') || '';
    const urgency = formData.get('urgency') || '';
    const notes = formData.get('notes') || '';
    
    // Validate required fields
    if (!name || !email || !phone || !visaType || !destination) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Create WhatsApp message
    const message = `🛂 *New Visa Inquiry*

👤 *Name:* ${name}
📧 *Email:* ${email}
📱 *Phone:* ${phone}
🌍 *Current Location:* ${country}

🎯 *Visa Type:* ${visaType}
🏁 *Destination:* ${destination}
📅 *Travel Date:* ${travelDate}
⏰ *Urgency:* ${urgency}

${notes ? `📝 *Additional Notes:*\n${notes}` : ''}

*Submitted via White Wings Website*
*Time:* ${new Date().toLocaleString()}`;

    // WhatsApp number
    const whatsappNumber = '919130448831';
    
    // Create WhatsApp URL
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    // Show success message
    alert('✅ Thank you! Redirecting to WhatsApp for instant assistance...');
    
    // Save data locally (optional)
    localStorage.setItem('lastInquiry', JSON.stringify({
        name, email, phone, visaType, destination,
        timestamp: new Date().toISOString()
    }));
    
    // Open WhatsApp
    window.open(whatsappURL, '_blank');
    
    // Reset form
    form.reset();
    
    // Show success message on page
    showSuccessMessage();
}

function showSuccessMessage() {
    const form = document.getElementById('visaContact');
    const successCard = document.querySelector('.success-card');
    
    if (successCard) {
        form.style.display = 'none';
        successCard.style.display = 'block';
        successCard.scrollIntoView({ behavior: 'smooth' });
    }
}

// Alternative: Email + WhatsApp combo
function sendViaEmail() {
    const form = document.getElementById('visaContact');
    const formData = new FormData(form);
    
    const name = formData.get('name');
    const email = formData.get('email');
    const visaType = formData.get('visaType');
    
    // Create mailto link
    const subject = `Visa Inquiry - ${visaType}`;
    const body = `Name: ${name}\nEmail: ${email}\nVisa Type: ${visaType}`;
    const mailtoLink = `mailto:mrunal@whitewingsvisa.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open email client
    window.location.href = mailtoLink;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('WhatsApp Contact System Loaded');
    
    // Add email fallback button (optional)
    const form = document.getElementById('visaContact');
    if (form) {
        const emailBtn = document.createElement('button');
        emailBtn.type = 'button';
        emailBtn.textContent = '📧 Send via Email';
        emailBtn.onclick = sendViaEmail;
        emailBtn.style.marginLeft = '10px';
        
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.parentNode.insertBefore(emailBtn, submitBtn.nextSibling);
        }
    }
});