const express = require('express');
const { login, requireAdmin } = require('../middleware/authAdmin');
const { getMemories, testSendForDay, testSendFinalFeedback } = require('../controllers/adminController');

const router = express.Router();

// POST /api/admin/login
router.post('/login', login);

// GET /api/admin/memories
router.get('/memories', requireAdmin, getMemories);

// POST /api/admin/test-send/:slug  (trigger a test email for a given day)
router.post('/test-send/:slug', requireAdmin, testSendForDay);

// POST /api/admin/test-send-final  (trigger the final feedback email)
router.post('/test-send-final', requireAdmin, testSendFinalFeedback);

module.exports = router;

