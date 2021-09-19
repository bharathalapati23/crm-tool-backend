//import ListSchema from '../models/postMessage.js'
const { EnquirySchema } = require('../models/enquiryModel')
var ObjectId = require('mongodb').ObjectID;

const createEnquiry = async (req, res) => {
    const enquiry = {
        name: req.body.name,
        phoneNumber: req.body.phoneNo,
        comment: [{ comment: 'test', statusChange: '', updated: Date.now() }],
        source: req.body.source,
        status: 'Enquired',
        budget: '',
        config: '',
        location: ''
    }

    console.log('asdfasdf', enquiry)

    const newEnquiry = new EnquirySchema(enquiry)
    try {
        await newEnquiry.save();
        res.status(201).json(newEnquiry);
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

const getEnquiries = async (req, res) => {
    try {
        let enquiries = []
        enquiries = await EnquirySchema.find().sort({ "createdAt": -1 });


        res.status(200).json(enquiries);
    } catch (error) {
        res.status(404).json({ message: error.message });

    }
}

const addComment = async (req, res) => {
    try {
        let newComment = req.body
        console.log(req.body)
        if (req.body.comment) {
            EnquirySchema.findOneAndUpdate({ '_id': req.body.id },
                {
                    "$push": { "comment": { "comment": req.body.comment, "statusChange": "", "updated": req.body.updated } },
                    "$set": { "budget": req.body.budget, "config": req.body.config, "location": req.body.location, "status": req.body.status }
                }
                , function (err, doc) {
                    if (err) throw err
                    return res.send('Succesfully saved.');
                });
        }
        else {
            EnquirySchema.findOneAndUpdate({ '_id': req.body.id },
                {
                    "$set": { "budget": req.body.budget, "config": req.body.config, "location": req.body.location, "status": req.body.status }
                }
                , function (err, doc) {
                    if (err) throw err
                    return res.send('Succesfully saved.');
                });
        }
    } catch (error) {
        res.status(404).json({ message: error.message });

    }
}

module.exports = { createEnquiry, getEnquiries, addComment }