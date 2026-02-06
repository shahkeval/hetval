const mongoose = require('mongoose');

const ValentineAudioMessageSchema = new mongoose.Schema(
  {
    dayName: {
      type: String,
      required: true,
    },
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

ValentineAudioMessageSchema.index({ dayName: 1 });
ValentineAudioMessageSchema.index({ dayName: 1, sequence: 1 }, { unique: true });

module.exports = mongoose.model('ValentineAudioMessage', ValentineAudioMessageSchema);

