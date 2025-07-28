const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    firstName: { type: String, required: true, trim: true, maxlength: 50 },
    lastName: { type: String, trim: true, maxlength: 50 },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    countryCode: { type: String, default: '+91' },
    subject: { type: String, trim: true },
    message: { type: String, required: true, trim: true, maxlength: 2000 },
    formType: { type: String, required: true },
    visaType: { type: String, trim: true },
    destinationCountry: { type: String, trim: true },
    workCategory: { type: String, trim: true },
    courseLevel: { type: String, trim: true },
    ipAddress: { type: String },
    userAgent: { type: String },
    referrer: { type: String },
    source: { type: String, default: 'website' },
    status: { 
        type: String, 
        enum: ['new', 'contacted', 'in-progress', 'completed', 'closed'],
        default: 'new'
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high', 'urgent'],
        default: 'medium'
    },
    referenceNumber: { type: String, unique: true },
    submittedAt: { type: Date, default: Date.now }
}, {
    timestamps: true
});

contactSchema.index({ email: 1 });
contactSchema.index({ submittedAt: -1 });
contactSchema.index({ status: 1 });

contactSchema.pre('save', function(next) {
    if (this.isNew) {
        const timestamp = Date.now().toString(36).toUpperCase();
        const random = Math.random().toString(36).substr(2, 4).toUpperCase();
        this.referenceNumber = `WW-${this.formType.toUpperCase()}-${timestamp}-${random}`;
    }
    next();
});

module.exports = mongoose.model('Contact', contactSchema);