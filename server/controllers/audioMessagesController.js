const ValentineAudioMessage = require('../models/ValentineAudioMessage');
const { getDayBySlug } = require('../utils/valentineDays');
const { uploadAudioBuffer } = require('../services/cloudinaryService');

async function uploadAudioMessage(req, res, next) {
  try {
    const { daySlug } = req.body || {};
    const file = req.file;

    if (!daySlug || typeof daySlug !== 'string') {
      return res.status(400).json({ message: 'Missing or invalid day.' });
    }
    if (!file || !file.buffer) {
      return res.status(400).json({ message: 'No audio file received.' });
    }

    const dayConfig = getDayBySlug(daySlug);
    if (!dayConfig) {
      return res.status(400).json({ message: 'Unknown Valentine day.' });
    }

    // Upload to Cloudinary
    const result = await uploadAudioBuffer(file.buffer);

    const countForDay = await ValentineAudioMessage.countDocuments({
      dayName: dayConfig.dayName,
    });
    const nextSequence = countForDay + 1;

    const doc = await ValentineAudioMessage.create({
      dayName: dayConfig.dayName,
      audioUrl: result.secure_url,
      publicId: result.public_id,
      sequence: nextSequence,
    });

    return res.status(201).json({
      message: 'Your voice has been saved softly.',
      data: {
        id: doc._id,
        audioUrl: doc.audioUrl,
        sequence: doc.sequence,
      },
    });
  } catch (err) {
    return next(err);
  }
}

module.exports = { uploadAudioMessage };

