const express = require('express');
const { submitMessage } = require('../controllers/messagesController');

const router = express.Router();

// POST /api/messages
router.post('/', submitMessage);

module.exports = router;

