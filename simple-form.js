// Simple form handler without complex features
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('visaContact');
    const submitBtn = form.querySelector('.btn-submit');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic validation
        const name = form.querySelector('#name').value.trim();
        const email = form.querySelector('#email').value.trim();
        const phone = form.querySelector('#phone').value.trim();
        
        if (!name || !email || !phone) {
            alert('Please fill in Name, Email, and Phone fields');
            return;
        }
        
        // Disable button
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending...';
        
        // Create form data
        const formData = new FormData(form);
        
        // Send via fetch
        fetch('contact-fallback.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(result => {
            if (result.trim() === 'email_success') {
                alert('✅ Thank you! Your inquiry has been sent via email. We will contact you soon.');
                form.reset();
            } else if (result.trim() === 'file_saved') {
                alert('✅ Thank you! Your inquiry has been saved. We will contact you soon via WhatsApp.');
                form.reset();
                // Open WhatsApp
                window.open('https://wa.me/919130448831?text=Hi, I just submitted a visa inquiry on your website', '_blank');
            } else {
                alert('Please call +91 9130448831 or WhatsApp for immediate assistance.');
            }
        })
        .catch(error => {
            alert('Please call us directly at +91 9130448831 or WhatsApp for immediate assistance.');
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Start My Visa Journey';
        });
    });
});