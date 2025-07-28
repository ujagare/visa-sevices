const express = require('express');
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const Contact = require('../models/Contact');
const router = express.Router();

// Create email transporter
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Email connection test disabled
console.log('📧 Email system: Database storage enabled, email notifications disabled');

// Validation rules
const validateContact = [
    body('firstName').optional().trim().isLength({ max: 50 }).escape(),
    body('name').optional().trim().isLength({ max: 50 }).escape(),
    body('lastName').optional().trim().isLength({ max: 50 }).escape(),
    body('email').isEmail().normalizeEmail(),
    body('phone').matches(/^[0-9]{10}$/),
    body('message').optional().trim().isLength({ max: 2000 }).escape(),
    body('notes').optional().trim().isLength({ max: 2000 }).escape(),
    body('formType').optional().isIn(['home', 'contact', 'study', 'work', 'visit', 'migrate'])
];

// Submit contact form
router.post('/submit', validateContact, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                success: false, 
                errors: errors.array() 
            });
        }

        const {
            firstName, lastName, name, email, phone, countryCode,
            subject, message, notes, formType, visaType, destinationCountry,
            workCategory, courseLevel, country, visaType: visa_type,
            destination, travelDate, passportStatus, travelers,
            contactPref, urgency, experience
        } = req.body;

        // Create contact record
        const contact = new Contact({
            firstName: firstName || name,
            lastName: lastName || '',
            email,
            phone,
            countryCode: countryCode || '+91',
            subject: subject || 'Website Contact',
            message: message || notes || 'No message provided',
            formType: formType || 'contact',
            visaType: visaType || visa_type,
            destinationCountry: destinationCountry || destination || country,
            workCategory,
            courseLevel,
            ipAddress: req.ip,
            userAgent: req.get('User-Agent'),
            referrer: req.get('Referer')
        });

        await contact.save();

        // Email to admin
        const adminEmailContent = `
NEW CONTACT FORM SUBMISSION - WHITE WINGS VISA CONSULTANCY
===========================================================

CUSTOMER INFORMATION:
---------------------
Name: ${firstName || name} ${lastName || ''}
Email: ${email}
Phone: ${countryCode}${phone}

INQUIRY DETAILS:
----------------
Form Type: ${formType.toUpperCase()}
${subject ? `Subject: ${subject}` : ''}
${visaType ? `Visa Type: ${visaType}` : ''}
${destinationCountry ? `Destination: ${destinationCountry}` : ''}
${workCategory ? `Work Category: ${workCategory}` : ''}
${courseLevel ? `Course Level: ${courseLevel}` : ''}

MESSAGE:
--------
${message || notes || 'No message provided'}

SUBMISSION DETAILS:
-------------------
Reference Number: ${contact.referenceNumber}
Submitted: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
IP Address: ${req.ip}
User Agent: ${req.get('User-Agent')}

===========================================================
NEXT STEPS: Contact customer within 2-4 hours
ASSIGNED TO: Mrunal Hazare - Senior Visa Consultant
Phone: +91 9130448831
Email: mrunal@whitewingsvisa.com
===========================================================
        `;

        // Email sending disabled temporarily - data saved to database
        console.log('📧 Email would be sent to:', 'mrunal@whitewingsvisa.com');
        console.log('📧 Customer email would be sent to:', email);

        res.json({
            success: true,
            message: 'Your inquiry has been submitted successfully. We will contact you within 2-4 hours.',
            referenceNumber: contact.referenceNumber
        });

    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to submit inquiry. Please try again or contact us directly at +91 9130448831.'
        });
    }
});

module.exports = router;