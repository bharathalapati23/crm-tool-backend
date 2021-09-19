const express = require('express')
const { createEnquiry, getEnquiries, addComment } = require('../controllers/enquiry.js')

const router = express.Router();

router.post('/', createEnquiry)
router.get('/', getEnquiries)
router.post('/addComment', addComment)

module.exports = router