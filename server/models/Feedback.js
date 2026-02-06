const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema(
  {
    feedbackText: {
      type: String,
      required: true,
      trim: true,
      maxlength: 4000,
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

module.exports = mongoose.model('Feedback', FeedbackSchema);

