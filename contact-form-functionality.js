/*
 * CONTACT FORM FUNCTIONALITY
 * Ensure all form inputs work properly and add enhanced interactions
 */

document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const form = document.getElementById('visaContact');
    const inputs = form.querySelectorAll('input, select, textarea');
    const submitBtn = form.querySelector('.btn-submit');
    
    // Ensure all inputs are properly initialized
    inputs.forEach(input => {
        // Remove any conflicting styles that might prevent input
        input.style.pointerEvents = 'auto';
        input.style.userSelect = 'text';
        input.style.webkitUserSelect = 'text';
        
        // Add focus and blur event listeners for better UX
        input.addEventListener('focus', function() {
            this.closest('.input-container').classList.add('focused');
            this.closest('.field').classList.remove('error');
        });
        
        input.addEventListener('blur', function() {
            this.closest('.input-container').classList.remove('focused');
            validateField(this);
        });
        
        // Add input event listener for real-time validation
        input.addEventListener('input', function() {
            if (this.closest('.field').classList.contains('error')) {
                validateField(this);
            }
        });
    });
    
    // File input special handling
    const fileInput = document.getElementById('docs');
    if (fileInput) {
        fileInput.addEventListener('change', function() {
            const fileText = this.closest('.input-container').querySelector('.file-text');
            if (this.files.length > 0) {
                const fileNames = Array.from(this.files).map(file => file.name).join(', ');
                fileText.textContent = `Selected: ${fileNames}`;
                fileText.style.color = '#0369A1';
            } else {
                fileText.textContent = 'Upload passport copy, photos, or other documents';
                fileText.style.color = '#6B7280';
            }
        });
    }
    
    // Form validation function
    function validateField(field) {
        const fieldContainer = field.closest('.field');
        const errorMessage = fieldContainer.querySelector('.error-message');
        let isValid = true;
        let message = '';
        
        // Check if field is required and empty
        if (field.hasAttribute('required') && !field.value.trim()) {
            isValid = false;
            message = 'This field is required';
        }
        
        // Email validation
        if (field.type === 'email' && field.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                isValid = false;
                message = 'Please enter a valid email address';
            }
        }
        
        // Phone validation
        if (field.type === 'tel' && field.value.trim()) {
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
            if (!phoneRegex.test(field.value)) {
                isValid = false;
                message = 'Please enter a valid phone number';
            }
        }
        
        // Date validation
        if (field.type === 'date' && field.value) {
            const selectedDate = new Date(field.value);
            const today = new Date();
            if (selectedDate <= today) {
                isValid = false;
                message = 'Please select a future date';
            }
        }
        
        // Update field appearance
        if (isValid) {
            fieldContainer.classList.remove('error');
            errorMessage.style.display = 'none';
        } else {
            fieldContainer.classList.add('error');
            errorMessage.textContent = message;
            errorMessage.style.display = 'block';
        }
        
        return isValid;
    }
    
    // Form submission handling
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        let isFormValid = true;
        inputs.forEach(input => {
            if (!validateField(input)) {
                isFormValid = false;
            }
        });
        
        if (isFormValid) {
            // Show loading state
            submitBtn.innerHTML = '<i class="ri-loader-4-line"></i> Submitting...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';
            
            // Create FormData object
            const formData = new FormData(form);
            
            // Submit form using fetch
            fetch(form.action, {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (response.ok) {
                    // Show success message
                    form.style.display = 'none';
                    document.querySelector('.success-card').style.display = 'block';
                } else {
                    throw new Error('Form submission failed');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was an error submitting your form. Please try again.');
                
                // Reset button
                submitBtn.innerHTML = '<i class="ri-rocket-line"></i> Start My Visa Journey';
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
            });
        } else {
            // Scroll to first error
            const firstError = form.querySelector('.field.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
    
    // Show form function (for success card button)
    window.showForm = function() {
        form.style.display = 'block';
        document.querySelector('.success-card').style.display = 'none';
        form.reset();
        
        // Reset button
        submitBtn.innerHTML = '<i class="ri-rocket-line"></i> Start My Visa Journey';
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
        
        // Clear all errors
        inputs.forEach(input => {
            input.closest('.field').classList.remove('error');
            input.closest('.field').querySelector('.error-message').style.display = 'none';
        });
        
        // Reset file input text
        const fileText = document.querySelector('.file-text');
        if (fileText) {
            fileText.textContent = 'Upload passport copy, photos, or other documents';
            fileText.style.color = '#6B7280';
        }
    };
    
    // Add smooth animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Observe form fields for animation
    inputs.forEach(input => {
        const field = input.closest('.field');
        field.style.opacity = '0';
        field.style.transform = 'translateY(20px)';
        field.style.transition = 'all 0.6s ease';
        observer.observe(field);
    });
    
    console.log('Contact form functionality initialized successfully');
});
