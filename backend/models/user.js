const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Full name is required"],
    trim: true,
    minlength: [2, "Full name must be at least 2 characters"],
    maxlength: [50, "Full name cannot exceed 50 characters"],
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    lowercase: true,
    unique: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email"],
  },

  password: {
    type: String,
  },

  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },

  profileImage: {
    type: String,
  },

  authProvider: {
    type: String,
    enum: ["local", "google"],
    default: "local",
  },

  otp: {
    code: {
      type: String,
    },
    expiresAt: {
      type: Date,
    },
  },
});

module.exports = mongoose.model("User", userSchema);
