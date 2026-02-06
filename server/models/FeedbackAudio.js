const mongoose = require('mongoose');

const FeedbackAudioSchema = new mongoose.Schema(
  {
    audioUrl: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: true,
    },
    sequence: {
      type: Number,
      required: true,
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

FeedbackAudioSchema.index({ sequence: 1 }, { unique: true });

module.exports = mongoose.model('FeedbackAudio', FeedbackAudioSchema);

