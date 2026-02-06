const express = require('express');
const multer = require('multer');
const { uploadAudioMessage } = require('../controllers/audioMessagesController');

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
});

// POST /api/messages/audio
router.post('/', upload.single('audio'), uploadAudioMessage);

module.exports = router;

