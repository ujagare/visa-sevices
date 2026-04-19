// FormSubmit Email Handler - Simple Email Solution
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        // Add FormSubmit action
        form.setAttribute('action', 'https://formsubmit.co/mrunal@whitewingsvisa.com');
        form.setAttribute('method', 'POST');
        
        // Add hidden fields for FormSubmit
        const hiddenFields = `
            <input type="hidden" name="_subject" value="New Visa Inquiry from Website">
            <input type="hidden" name="_captcha" value="false">
            <input type="hidden" name="_template" value="table">
            <input type="hidden" name="_next" value="thank-you.html">
        `;
        form.insertAdjacentHTML('beforeend', hiddenFields);
    });
});