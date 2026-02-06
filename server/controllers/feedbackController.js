const Feedback = require('../models/Feedback');
const FeedbackAudio = require('../models/FeedbackAudio');
const { sendMessageNotificationToYou } = require('../services/emailService');
const { uploadAudioBuffer } = require('../services/cloudinaryService');

async function submitFeedback(req, res, next) {
  try {
    const { feedbackText } = req.body || {};

    if (!feedbackText || typeof feedbackText !== 'string' || !feedbackText.trim()) {
      return res.status(400).json({ message: 'Please share a little of how this week felt.' });
    }

    const doc = await Feedback.create({
      feedbackText: feedbackText.trim(),
    });

    // Reuse notification helper to send feedback to you
    sendMessageNotificationToYou({
      dayName: 'Valentine Week Feedback',
      messageText: feedbackText.trim(),
    }).catch((err) => {
      console.error('Failed to send feedback notification email', err);
    });

    return res.status(201).json({
      message: 'Thank you for trusting me with your feelings.',
      data: { id: doc._id },
    });
  } catch (err) {
    return next(err);
  }
}

async function submitFeedbackAudio(req, res, next) {
  try {
    const file = req.file;
    if (!file || !file.buffer) {
      return res.status(400).json({ message: 'No audio file received.' });
    }

    const result = await uploadAudioBuffer(file.buffer);

    const count = await FeedbackAudio.countDocuments();
    const nextSequence = count + 1;

    const doc = await FeedbackAudio.create({
      audioUrl: result.secure_url,
      publicId: result.public_id,
      sequence: nextSequence,
    });

    // Notify you via email that a feedback voice note arrived
    sendMessageNotificationToYou({
      dayName: 'Valentine Week Feedback (audio)',
      messageText: `Audio feedback note #${doc.sequence} – listen on your memory wall.`,
    }).catch((err) => {
      console.error('Failed to send feedback audio notification email', err);
    });

    return res.status(201).json({
      message: 'Thank you for sharing your voice with me.',
      data: { id: doc._id, sequence: doc.sequence },
    });
  } catch (err) {
    return next(err);
  }
}

module.exports = { submitFeedback, submitFeedbackAudio };

