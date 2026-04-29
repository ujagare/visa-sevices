const express = require('express');
const { body, validationResult } = require('express-validator');
const Contact = require('../models/Contact');
const router = express.Router();

// Simple contact without email (store in database only)
const validateContact = [
    body('firstName').optional().trim().isLength({ max: 50 }).escape(),
    body('name').optional().trim().isLength({ max: 50 }).escape(),
    body('email').isEmail().normalizeEmail(),
    body('phone').matches(/^[0-9]{10}$/),
    body('message').optional().trim().isLength({ max: 2000 }).escape()
];

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
            subject, message, formType, visaType, destinationCountry,
            workCategory, courseLevel, country, work_category, 
            destination_country, visa_type, preferred_destination
        } = req.body;

        // Create contact record
        const contact = new Contact({
            firstName: firstName || name,
            lastName: lastName || '',
            email,
            phone,
            countryCode: countryCode || '+91',
            subject: subject || 'Website Contact',
            message: message || 'No message provided',
            formType: formType || 'contact',
            visaType: visaType || visa_type,
            destinationCountry: destinationCountry || destination_country || country || preferred_destination,
            workCategory: workCategory || work_category,
            courseLevel,
            ipAddress: req.ip,
            userAgent: req.get('User-Agent'),
            referrer: req.get('Referer')
        });

        await contact.save();

        // Return success (no email sending for now)
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