const ValentineMessage = require('../models/ValentineMessage');
const ValentineAudioMessage = require('../models/ValentineAudioMessage');
const Feedback = require('../models/Feedback');
const FeedbackAudio = require('../models/FeedbackAudio');
const { getDayBySlug } = require('../utils/valentineDays');
const { sendValentineDayEmail, sendFinalFeedbackEmail } = require('../services/emailService');

async function getMemories(_req, res, next) {
  try {
    const [messages, audioMessages, feedback, feedbackAudio] = await Promise.all([
      ValentineMessage.find().sort({ createdAt: 1 }).lean(),
      ValentineAudioMessage.find().sort({ createdAt: 1 }).lean(),
      Feedback.find().sort({ createdAt: 1 }).lean(),
      FeedbackAudio.find().sort({ createdAt: 1 }).lean(),
    ]);

    // Group text messages by dayName for easier rendering
    const groupedByDay = messages.reduce((acc, msg) => {
      if (!acc[msg.dayName]) acc[msg.dayName] = [];
      acc[msg.dayName].push({
        id: msg._id,
        messageText: msg.messageText,
        submittedAt: msg.submittedAt,
        sequence: msg.sequence,
      });
      return acc;
    }, {});

    // Group audio messages by dayName
    const groupedAudioByDay = audioMessages.reduce((acc, msg) => {
      if (!acc[msg.dayName]) acc[msg.dayName] = [];
      acc[msg.dayName].push({
        id: msg._id,
        audioUrl: msg.audioUrl,
        submittedAt: msg.submittedAt,
        sequence: msg.sequence,
      });
      return acc;
    }, {});

    const feedbackList = feedback.map((fb) => ({
      id: fb._id,
      feedbackText: fb.feedbackText,
      submittedAt: fb.submittedAt,
    }));

    const feedbackAudioList = feedbackAudio.map((fa) => ({
      id: fa._id,
      audioUrl: fa.audioUrl,
      submittedAt: fa.submittedAt,
      sequence: fa.sequence,
    }));

    return res.json({
      days: groupedByDay,
      audioDays: groupedAudioByDay,
      feedback: feedbackList,
      feedbackAudio: feedbackAudioList,
    });
  } catch (err) {
    return next(err);
  }
}

async function testSendForDay(req, res, next) {
  try {
    const { slug } = req.params;
    const dayConfig = getDayBySlug(slug);

    if (!dayConfig) {
      return res.status(404).json({ message: 'Unknown Valentine day slug.' });
    }

    const to = process.env.RECIPIENT_EMAIL;
    if (!to) {
      return res
        .status(500)
        .json({ message: 'RECIPIENT_EMAIL is not configured on the server.' });
    }

    await sendValentineDayEmail({ to, dayConfig });

    return res.json({
      message: `Test email for ${dayConfig.dayName} has been sent to ${to}.`,
    });
  } catch (err) {
    return next(err);
  }
}

async function testSendFinalFeedback(_req, res, next) {
  try {
    const to = process.env.RECIPIENT_EMAIL;
    if (!to) {
      return res
        .status(500)
        .json({ message: 'RECIPIENT_EMAIL is not configured on the server.' });
    }

    await sendFinalFeedbackEmail({ to });

    return res.json({
      message: `Final feedback email has been sent to ${to}.`,
    });
  } catch (err) {
    return next(err);
  }
}

module.exports = { getMemories, testSendForDay, testSendFinalFeedback };

