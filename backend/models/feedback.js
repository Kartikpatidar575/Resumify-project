const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Feedback", feedbackSchema);
