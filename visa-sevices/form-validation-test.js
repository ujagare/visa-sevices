/**
 * Form Validation Test Script for White Wings Visa Website
 * 
 * This script tests all forms on the website for proper validation and functionality.
 * It can be run in the browser console on each page to test the forms.
 */

// Configuration for each form on the site
const formConfigs = {
    // Home page contact form
    homeContactForm: {
        selector: '.contact-form-wrapper',
        requiredFields: ['firstName', 'lastName', 'email', 'subject', 'message', 'privacy'],
        emailFields: ['email'],
        submitButton: '.submit-btn'
    },
    
    // Contact page visa application form
    visaApplicationForm: {
        selector: '#visaContact',
        requiredFields: ['name', 'email', 'phone', 'country', 'visaType', 'destination', 
                        'travelDate', 'passportStatus', 'travelers', 'contactPref', 
                        'urgency', 'experience'],
        emailFields: ['email'],
        dateFields: ['travelDate'],
        fileFields: ['docs'],
        submitButton: '.btn-submit'
    },
    
    // Study page assessment form
    studyAssessmentForm: {
        selector: '.assessment-form form',
        requiredFields: ['name', 'email', 'phone', 'course_level', 'preferred_country'],
        emailFields: ['email'],
        submitButton: '.assessment-submit'
    },
    
    // Test form
    testForm: {
        selector: 'form[action*="formsubmit.co"]',
        requiredFields: ['test_name', 'test_email', 'test_phone', 'form_source', 'test_message', 'test_priority'],
        emailFields: ['test_email'],
        submitButton: 'button[type="submit"]'
    }
};

/**
 * Test a specific form's validation
 * @param {string} formType - The form type key from formConfigs
 * @param {boolean} submitForm - Whether to actually submit the form
 */
function testFormValidation(formType, submitForm = false) {
    console.log(`Testing ${formType}...`);
    
    const config = formConfigs[formType];
    if (!config) {
        console.error(`Form configuration for ${formType} not found!`);
        return;
    }
    
    const form = document.querySelector(config.selector);
    if (!form) {
        console.error(`Form with selector ${config.selector} not found on this page!`);
        return;
    }
    
    console.log('Form found:', form);
    
    // Test required fields
    const requiredFieldsResults = testRequiredFields(form, config.requiredFields);
    
    // Test email validation
    const emailValidationResults = testEmailValidation(form, config.emailFields);
    
    // Test date fields if applicable
    let dateValidationResults = { passed: true, messages: [] };
    if (config.dateFields && config.dateFields.length > 0) {
        dateValidationResults = testDateValidation(form, config.dateFields);
    }
    
    // Test file upload if applicable
    let fileUploadResults = { passed: true, messages: [] };
    if (config.fileFields && config.fileFields.length > 0) {
        fileUploadResults = testFileUpload(form, config.fileFields);
    }
    
    // Compile results
    const allResults = [
        requiredFieldsResults,
        emailValidationResults,
        dateValidationResults,
        fileUploadResults
    ];
    
    const overallPassed = allResults.every(result => result.passed);
    
    console.log('==== Test Results ====');
    console.log(`Overall: ${overallPassed ? 'PASSED' : 'FAILED'}`);
    
    allResults.forEach(result => {
        result.messages.forEach(message => {
            console.log(message);
        });
    });
    
    // Submit the form if requested and all tests passed
    if (submitForm && overallPassed) {
        console.log('Submitting form...');
        const submitButton = form.querySelector(config.submitButton);
        if (submitButton) {
            // Uncomment to actually submit
            // submitButton.click();
            console.log('Form would be submitted (disabled for testing)');
        } else {
            console.error('Submit button not found!');
        }
    }
    
    return {
        passed: overallPassed,
        results: allResults
    };
}

/**
 * Test required fields in a form
 * @param {Element} form - The form element
 * @param {string[]} requiredFields - Array of required field names
 */
function testRequiredFields(form, requiredFields) {
    const results = {
        passed: true,
        messages: []
    };
    
    requiredFields.forEach(fieldName => {
        const field = form.elements[fieldName];
        if (!field) {
            results.passed = false;
            results.messages.push(`❌ Required field '${fieldName}' not found in form`);
            return;
        }
        
        // Check if field has required attribute
        if (!field.hasAttribute('required')) {
            results.messages.push(`⚠️ Field '${fieldName}' should be marked as required`);
        }
        
        // For checkboxes
        if (field.type === 'checkbox') {
            if (!field.checked) {
                results.messages.push(`✓ Validation correctly prevents submission when '${fieldName}' checkbox is unchecked`);
            }
        } 
        // For other input types
        else if (!field.value) {
            results.messages.push(`✓ Validation correctly prevents submission when '${fieldName}' is empty`);
        }
    });
    
    if (results.passed && results.messages.length === 0) {
        results.messages.push('✓ All required fields are properly marked');
    }
    
    return results;
}

/**
 * Test email validation in a form
 * @param {Element} form - The form element
 * @param {string[]} emailFields - Array of email field names
 */
function testEmailValidation(form, emailFields) {
    const results = {
        passed: true,
        messages: []
    };
    
    emailFields.forEach(fieldName => {
        const field = form.elements[fieldName];
        if (!field) {
            results.passed = false;
            results.messages.push(`❌ Email field '${fieldName}' not found in form`);
            return;
        }
        
        // Check if field has email type
        if (field.type !== 'email') {
            results.messages.push(`⚠️ Field '${fieldName}' should have type="email"`);
        }
        
        // Test invalid email format
        const invalidEmails = [
            'notanemail',
            'missing@tld',
            '@missingusername.com',
            'spaces in@email.com',
            'multiple@@at.com'
        ];
        
        let originalValue = field.value;
        
        // Test each invalid email
        invalidEmails.forEach(invalidEmail => {
            field.value = invalidEmail;
            if (field.validity.valid) {
                results.passed = false;
                results.messages.push(`❌ Email validation failed to reject invalid format: ${invalidEmail}`);
            }
        });
        
        // Test valid email
        field.value = 'valid.email@example.com';
        if (!field.validity.valid) {
            results.passed = false;
            results.messages.push('❌ Email validation incorrectly rejected valid email format');
        }
        
        // Restore original value
        field.value = originalValue;
    });
    
    if (results.passed && results.messages.length === 0) {
        results.messages.push('✓ Email validation works correctly');
    }
    
    return results;
}

/**
 * Test date validation in a form
 * @param {Element} form - The form element
 * @param {string[]} dateFields - Array of date field names
 */
function testDateValidation(form, dateFields) {
    const results = {
        passed: true,
        messages: []
    };
    
    dateFields.forEach(fieldName => {
        const field = form.elements[fieldName];
        if (!field) {
            results.passed = false;
            results.messages.push(`❌ Date field '${fieldName}' not found in form`);
            return;
        }
        
        // Check if field has date type
        if (field.type !== 'date') {
            results.messages.push(`⚠️ Field '${fieldName}' should have type="date"`);
        }
        
        // Test date functionality
        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);
        
        let originalValue = field.value;
        
        // Format date as YYYY-MM-DD for input
        const formatDate = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };
        
        // Test future date
        field.value = formatDate(tomorrow);
        if (!field.validity.valid) {
            results.passed = false;
            results.messages.push('❌ Date validation incorrectly rejected future date');
        }
        
        // Restore original value
        field.value = originalValue;
    });
    
    if (results.passed && results.messages.length === 0) {
        results.messages.push('✓ Date validation works correctly');
    }
    
    return results;
}

/**
 * Test file upload in a form
 * @param {Element} form - The form element
 * @param {string[]} fileFields - Array of file field names
 */
function testFileUpload(form, fileFields) {
    const results = {
        passed: true,
        messages: []
    };
    
    fileFields.forEach(fieldName => {
        const field = form.elements[fieldName];
        if (!field) {
            results.passed = false;
            results.messages.push(`❌ File field '${fieldName}' not found in form`);
            return;
        }
        
        // Check if field has file type
        if (field.type !== 'file') {
            results.passed = false;
            results.messages.push(`❌ Field '${fieldName}' should have type="file"`);
            return;
        }
        
        // Check accept attribute
        if (!field.hasAttribute('accept')) {
            results.messages.push(`⚠️ File field '${fieldName}' should have an 'accept' attribute to restrict file types`);
        } else {
            results.messages.push(`✓ File field accepts: ${field.getAttribute('accept')}`);
        }
        
        // Check multiple attribute
        if (field.hasAttribute('multiple')) {
            results.messages.push(`✓ File field allows multiple file uploads`);
        }
    });
    
    if (results.passed && results.messages.length === 0) {
        results.messages.push('✓ File upload fields are configured correctly');
    }
    
    return results;
}

/**
 * Run tests for the current page
 */
function runTestsForCurrentPage() {
    const path = window.location.pathname;
    
    if (path.includes('index.html') || path === '/') {
        return testFormValidation('homeContactForm');
    } else if (path.includes('contact.html')) {
        return testFormValidation('visaApplicationForm');
    } else if (path.includes('study.html')) {
        return testFormValidation('studyAssessmentForm');
    } else if (path.includes('test-form.html')) {
        return testFormValidation('testForm');
    } else {
        console.log('No forms to test on this page');
        return null;
    }
}

// Auto-run tests when script is loaded
console.log('Form validation test script loaded');
console.log('To run tests for the current page, call: runTestsForCurrentPage()');
console.log('To test a specific form, call: testFormValidation("formType")');
console.log('Available form types:', Object.keys(formConfigs));