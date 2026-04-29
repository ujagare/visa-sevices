document.addEventListener('DOMContentLoaded', function() {
    const homeForm = document.getElementById('homeContactForm');
    const contactForm = document.getElementById('visaContact');

    function handleFormSubmit(form, redirectUrl) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn ? submitBtn.textContent : 'Sending...';
            
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';
            }

            try {
                const data = Object.fromEntries(formData);
                
                const response = await fetch('/.netlify/functions/send-email', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                const result = await response.json();

                if (response.ok && result.success) {
                    if (redirectUrl) {
                        window.location.href = redirectUrl;
                    } else {
                        alert('Thank you! Your message has been sent successfully.');
                        form.reset();
                    }
                } else {
                    alert('Error: ' + (result.error || 'Something went wrong'));
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Failed to send message. Please try again.');
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                }
            }
        });
    }

    if (homeForm) handleFormSubmit(homeForm, 'thank-you.html');
    if (contactForm) handleFormSubmit(contactForm, 'thank-you.html');
});