// Formspree Integration for Custom Domain Email
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('visaContact');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            const submitBtn = form.querySelector('button[type="submit"]');
            
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="ri-loader-4-line"></i> Sending...';
            
            // Add hidden fields for better email formatting
            addHiddenFields(form);
            
            // Form will submit normally to Formspree
            // Success/error handling will be done by Formspree redirect
        });
    }
});

function addHiddenFields(form) {
    // Add timestamp
    const timestamp = document.createElement('input');
    timestamp.type = 'hidden';
    timestamp.name = '_timestamp';
    timestamp.value = new Date().toLocaleString();
    form.appendChild(timestamp);
    
    // Add subject line
    const subject = document.createElement('input');
    subject.type = 'hidden';
    subject.name = '_subject';
    subject.value = 'New Visa Inquiry - White Wings Website';
    form.appendChild(subject);
    
    // Add next page (thank you page)
    const next = document.createElement('input');
    next.type = 'hidden';
    next.name = '_next';
    next.value = window.location.origin + '/thank-you.html';
    form.appendChild(next);
}