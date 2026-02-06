const ValentineMessage = require('../models/ValentineMessage');
const { getDayBySlug } = require('../utils/valentineDays');
const { sendMessageNotificationToYou } = require('../services/emailService');

async function submitMessage(req, res, next) {
  try {
    const { daySlug, messageText } = req.body || {};

    if (!daySlug || typeof daySlug !== 'string') {
      return res.status(400).json({ message: 'Missing or invalid day.' });
    }
    if (!messageText || typeof messageText !== 'string' || !messageText.trim()) {
      return res.status(400).json({ message: 'Please write what you feel before sending.' });
    }

    const dayConfig = getDayBySlug(daySlug);
    if (!dayConfig) {
      return res.status(400).json({ message: 'Unknown Valentine day.' });
    }

    // Allow multiple messages per day and assign an incremental sequence number
    const countForDay = await ValentineMessage.countDocuments({ dayName: dayConfig.dayName });
    const nextSequence = countForDay + 1;

    const doc = await ValentineMessage.create({
      dayName: dayConfig.dayName,
      messageText: messageText.trim(),
      sequence: nextSequence,
    });

    // Notify you via email (non-blocking best-effort)
    sendMessageNotificationToYou({
      dayName: dayConfig.dayName,
      messageText: messageText.trim(),
    }).catch((err) => {
      console.error('Failed to send message notification email', err);
    });

    return res.status(201).json({
      message: 'Thank you for sharing your feelings. They’re safe here.',
      data: { id: doc._id, sequence: doc.sequence },
    });
  } catch (err) {
    return next(err);
  }
}

module.exports = { submitMessage };

