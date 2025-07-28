// Formspree Integration - Working Solution
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('visaContact');
    
    if (form) {
        // Add hidden fields for better email formatting
        const hiddenFields = [
            { name: '_subject', value: 'New Visa Inquiry - White Wings' },
            { name: '_replyto', value: 'mrunal@whitewingsvisa.com' },
            { name: '_next', value: window.location.origin + '/thank-you.html' }
        ];
        
        hiddenFields.forEach(field => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = field.name;
            input.value = field.value;
            form.appendChild(input);
        });
        
        form.addEventListener('submit', function(e) {
            const submitBtn = form.querySelector('button[type="submit"]');
            
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="ri-loader-4-line"></i> Sending...';
            
            // Add timestamp
            const timestamp = document.createElement('input');
            timestamp.type = 'hidden';
            timestamp.name = 'submission_time';
            timestamp.value = new Date().toLocaleString();
            form.appendChild(timestamp);
            
            // Form will submit normally to Formspree
            // Success will redirect to thank-you page
        });
    }
});