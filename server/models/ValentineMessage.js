const mongoose = require('mongoose');

const ValentineMessageSchema = new mongoose.Schema(
  {
    dayName: {
      type: String,
      required: true,
    },
    messageText: {
      type: String,
      required: true,
      trim: true,
      maxlength: 4000,
    },
    // Incremental number per day (1, 2, 3...) so you can see the order
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

ValentineMessageSchema.index({ dayName: 1 });
ValentineMessageSchema.index({ dayName: 1, sequence: 1 }, { unique: true });

module.exports = mongoose.model('ValentineMessage', ValentineMessageSchema);

