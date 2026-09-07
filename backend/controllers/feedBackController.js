const Feedback = require("../models/feedback");
const User = require("../models/user");
const createFeedback = async (req, res) => {
  try {
    const { message } = req.body;
    const { userId } = req.user;

    if (!message || !message.trim()) {
      return res.status(400).json({
        message: "Feedback message is required",
      });
    }

    const user = await User.findById(userId).select("fullName email");
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const feedback = await Feedback.create({
      fullName: user.fullName,
      email: user.email,
      message: message.trim(),
    });

    return res.status(201).json({
      message: "Feedback submitted successfully",
      feedback,
    });
  } catch (error) {
    console.error("Create feedback error:", error);

    return res.status(500).json({
      message: "Failed to submit feedback",
    });
  }
};

module.exports = {
  createFeedback,
};
