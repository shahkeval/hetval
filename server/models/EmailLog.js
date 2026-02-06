const mongoose = require('mongoose');

const EmailLogSchema = new mongoose.Schema(
  {
    dateKey: {
      type: String,
      required: true,
      unique: true,
    },
    date: {
      type: Date,
      required: true,
    },
    dayName: {
      type: String,
      required: true,
    },
    emailSent: {
      type: Boolean,
      default: false,
    },
    sentAt: {
      type: Date,
      default: null,
    },
    type: {
      type: String,
      enum: ['daily', 'final-feedback'],
      default: 'daily',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('EmailLog', EmailLogSchema);

