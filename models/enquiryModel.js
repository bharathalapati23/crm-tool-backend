const mongoose = require('mongoose');

const enquirySchema = mongoose.Schema({
    name: String,
    phoneNumber: String,
    comment: [{
        comment: String,
        statusChange: String,
        updated: Date
    }],
    source: String,
    status: String,
    budget: String,
    config: String,
    location: String,
    createdAt: {
        type: Date,
        default: new Date()
    },
})

const EnquirySchema = mongoose.model('Enquiries', enquirySchema)

module.exports = { EnquirySchema }