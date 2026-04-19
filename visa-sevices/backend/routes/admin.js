const express = require('express');
const Contact = require('../models/Contact');
const router = express.Router();

// Get all contacts with pagination
router.get('/contacts', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const status = req.query.status;
        const formType = req.query.formType;

        const filter = {};
        if (status) filter.status = status;
        if (formType) filter.formType = formType;

        const contacts = await Contact.find(filter)
            .sort({ submittedAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const total = await Contact.countDocuments(filter);

        res.json({
            contacts,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            total
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get contact by ID
router.get('/contacts/:id', async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({ error: 'Contact not found' });
        }
        res.json(contact);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update contact status
router.patch('/contacts/:id/status', async (req, res) => {
    try {
        const { status, priority } = req.body;
        const contact = await Contact.findByIdAndUpdate(
            req.params.id,
            { status, priority, lastContactedAt: new Date() },
            { new: true }
        );
        
        if (!contact) {
            return res.status(404).json({ error: 'Contact not found' });
        }
        
        res.json(contact);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Dashboard stats
router.get('/dashboard/stats', async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const stats = await Promise.all([
            Contact.countDocuments({ submittedAt: { $gte: today } }),
            Contact.countDocuments({ status: 'new' }),
            Contact.countDocuments({ status: 'in-progress' }),
            Contact.countDocuments()
        ]);

        const formTypeStats = await Contact.aggregate([
            { $group: { _id: '$formType', count: { $sum: 1 } } }
        ]);

        res.json({
            todaySubmissions: stats[0],
            newInquiries: stats[1],
            inProgress: stats[2],
            totalInquiries: stats[3],
            formTypeBreakdown: formTypeStats
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;