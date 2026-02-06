const express = require('express');
const multer = require('multer');
const { submitFeedback, submitFeedbackAudio } = require('../controllers/feedbackController');

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
});

// POST /api/feedback
router.post('/', submitFeedback);

// POST /api/feedback/audio
router.post('/audio', upload.single('audio'), submitFeedbackAudio);

module.exports = router;

