const express = require('express')
const { createEnquiry, getEnquiries, getSingleEnquiry, addComment } = require('../controllers/enquiry.js')

const router = express.Router();

router.post('/', createEnquiry)
router.get('/', getEnquiries)
router.post('/addComment', addComment)
router.get('/getSingleEnquiry', getSingleEnquiry)


module.exports = router