const express = require('express');
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const Contact = require('../models/Contact');
const router = express.Router();

// Email transporter
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Validation rules
const validateContact = [
    body('firstName').trim().isLength({ min: 2, max: 50 }).escape(),
    body('lastName').optional().trim().isLength({ max: 50 }).escape(),
    body('email').isEmail().normalizeEmail(),
    body('phone').matches(/^[0-9]{10}$/),
    body('message').trim().isLength({ min: 10, max: 2000 }).escape(),
    body('formType').isIn(['home', 'contact', 'study', 'work', 'visit', 'migrate'])
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
            firstName, lastName, email, phone, countryCode,
            subject, message, formType, visaType, destinationCountry,
            workCategory, courseLevel
        } = req.body;

        // Create contact record
        const contact = new Contact({
            firstName,
            lastName,
            email,
            phone,
            countryCode: countryCode || '+91',
            subject,
            message,
            formType,
            visaType,
            destinationCountry,
            workCategory,
            courseLevel,
            ipAddress: req.ip,
            userAgent: req.get('User-Agent'),
            referrer: req.get('Referer')
        });

        await contact.save();

        // Send email notification
        const emailContent = `
NEW CONTACT FORM SUBMISSION - WHITE WINGS
=========================================

CUSTOMER INFORMATION:
Name: ${firstName} ${lastName || ''}
Email: ${email}
Phone: ${countryCode}${phone}

INQUIRY DETAILS:
Form Type: ${formType.toUpperCase()}
${subject ? `Subject: ${subject}` : ''}
${visaType ? `Visa Type: ${visaType}` : ''}
${destinationCountry ? `Destination: ${destinationCountry}` : ''}
${workCategory ? `Work Category: ${workCategory}` : ''}
${courseLevel ? `Course Level: ${courseLevel}` : ''}

MESSAGE:
${message}

SUBMISSION DETAILS:
Reference: ${contact.referenceNumber}
Submitted: ${new Date().toLocaleString()}
IP Address: ${req.ip}
User Agent: ${req.get('User-Agent')}

=========================================
NEXT STEPS: Contact customer within 2-4 hours
ASSIGNED TO: Mrunal Hazare - Senior Visa Consultant
=========================================
        `;

        await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: process.env.ADMIN_EMAIL,
            subject: `New ${formType.toUpperCase()} Inquiry - ${contact.referenceNumber}`,
            text: emailContent
        });

        // Send confirmation to customer
        await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: email,
            subject: 'Thank you for contacting White Wings Visa Consultancy',
            text: `Dear ${firstName},

Thank you for contacting White Wings Visa Consultancy. We have received your inquiry and will get back to you within 2-4 hours.

Your reference number: ${contact.referenceNumber}

Best regards,
White Wings Visa Consultancy Team
Phone: +91 9130448831
Email: mrunal@whitewingsvisa.com`
        });

        res.json({
            success: true,
            message: 'Your inquiry has been submitted successfully. We will contact you within 2-4 hours.',
            referenceNumber: contact.referenceNumber
        });

    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to submit inquiry. Please try again or contact us directly.'
        });
    }
});

module.exports = router;