require("dotenv").config();
const User = require("../models/user");
const PendingUser = require("../models/pendingUser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const Joi = require("joi");
const sendOTPEmail = require("../config/emailService");

const passwordSchema = Joi.string()
  .min(8)
  .max(128)
  .pattern(/[A-Z]/)
  .pattern(/[a-z]/)
  .pattern(/[0-9]/)
  .pattern(/[!@#$%^&*(),.?":{}|<>]/)
  .required();

const verifyOtpSchema = Joi.object({
  email: Joi.string().trim().lowercase().email().required(),
  otp: Joi.string()
    .pattern(/^\d{6}$/)
    .required(),
});

const googleLoginController = async (req, res) => {
  try {
    const { credential } = req.body;
    if (!credential) {
      return res.status(400).json({
        message: "Google credential is required",
      });
    }
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    const { sub: googleId, email, name, picture } = payload;

    if (!email || !googleId || !payload.email_verified) {
      return res.status(401).json({
        message: "Invalid Google account",
      });
    }
    let user = await User.findOne({ email });
    if (user && !user.googleId) {
      return res.status(409).json({
        message:
          "An account with this email already exists. Please login with your password first.",
      });
    }

    if (!user) {
      user = await User.create({
        fullName: name,
        email,
        googleId,
        profileImage: picture,
        authProvider: "google",
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "12h",
      },
    );

    return res.status(200).json({
      message: "Google login successful",
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      message: "Invalid Google credential",
    });
  }
};

const loginSchema = Joi.object({
  email: Joi.string().trim().lowercase().email().required(),
  password: Joi.string().required(),
});
const loginController = async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (!user.password) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "12h",
    });
    return res.status(200).json({ message: "User Login Successfully", token });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const registerSchema = Joi.object({
  fullName: Joi.string().trim().min(2).max(50).required(),
  email: Joi.string().trim().lowercase().email().required(),
  password: passwordSchema,
  confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
});

const registerController = async (req, res) => {
  try {
    const { error } = registerSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }

    const { fullName, email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(409).json({
        message: "User already registered",
      });
    }

    const existingPendingUser = await PendingUser.findOne({ email });

    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);
    let pendingUser;

    if (existingPendingUser) {
      existingPendingUser.fullName = fullName;
      existingPendingUser.password = hashedPassword;
      existingPendingUser.otp = otp;
      existingPendingUser.otpExpiresAt = otpExpiresAt;

      pendingUser = await existingPendingUser.save();
    } else {
      pendingUser = new PendingUser({
        fullName,
        email,
        password: hashedPassword,
        otp,
        otpExpiresAt,
      });

      await pendingUser.save();
    }

    await sendOTPEmail(email, otp);

    return res.status(201).json({
      success: true,
      message: "OTP sent to your email. Please verify your email.",
    });
  } catch (error) {
    console.error("Register Error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong during registration.",
    });
  }
};

const resendRegisterOTPController = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const pendingUser = await PendingUser.findOne({
      email: normalizedEmail,
    });

    if (!pendingUser) {
      return res.status(404).json({
        message: "Registration not found. Please register again.",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);

    pendingUser.otp = otp;
    pendingUser.otpExpiresAt = otpExpiresAt;
    await pendingUser.save();

    await sendOTPEmail(email, otp);

    return res.status(200).json({
      message: "A new OTP has been sent to your email.",
    });
  } catch (error) {
    console.error("Resend registration OTP error:", error);

    return res.status(500).json({
      message: "Failed to resend OTP. Please try again.",
    });
  }
};

const verifyRegisterOTPController = async (req, res) => {
  try {
    const { error } = verifyOtpSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }

    const { email, otp } = req.body;

    const pendingUser = await PendingUser.findOne({ email });

    if (!pendingUser) {
      return res
        .status(404)
        .json({ message: "Registration not found. Please register again." });
    }

    if (!pendingUser?.otp || !pendingUser?.otpExpiresAt) {
      return res.status(400).json({
        message: "OTP not found or already used",
      });
    }

    if (pendingUser.otpExpiresAt < new Date()) {
      return res
        .status(400)
        .json({ message: "OTP expired. Please register again." });
    }

    if (pendingUser.otp !== otp) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    const userExist = await User.findOne({ email: pendingUser.email });
    if (userExist) {
      await PendingUser.deleteOne({ _id: pendingUser._id });
      return res.status(409).json({ message: "User already registered." });
    }

    const user = await User.create({
      fullName: pendingUser.fullName,
      email: pendingUser.email,
      password: pendingUser.password,
    });

    await PendingUser.deleteOne({ _id: pendingUser._id });

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "12h",
      },
    );

    return res.status(200).json({
      message: "OTP verified successfully. Registration completed.",
      token,
    });
  } catch (error) {
    console.error("Verify Register OTP Error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while verifying OTP.",
    });
  }
};

const forgotPasswordSchema = Joi.object({
  email: Joi.string().trim().lowercase().email().required(),
});
const forgotPasswordController = async (req, res) => {
  try {
    const { error } = forgotPasswordSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(200).json({
        message: "If an account exists, an OTP has been sent",
      });
    }

    if (user.authProvider === "google" && !user.password) {
      return res.status(200).json({
        message: "If an account exists, an OTP has been sent",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await sendOTPEmail(email, otp);
    user.otp.code = otp;
    user.otp.expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await user.save();
    return res.status(200).json({
      message: "If an account exists, an OTP has been sent",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const verifyOtpController = async (req, res) => {
  try {
    const { error } = verifyOtpSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (!user.otp?.code || !user.otp?.expiresAt) {
      return res.status(400).json({
        message: "OTP not found or already used",
      });
    }

    if (user.otp.expiresAt < new Date()) {
      user.otp.code = null;
      user.otp.expiresAt = null;
      await user.save();

      return res.status(400).json({
        message: "OTP expired",
      });
    }

    if (user.otp.code !== otp) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    user.otp.code = null;
    user.otp.expiresAt = null;
    await user.save();

    const resetToken = jwt.sign(
      { userId: user._id, purpose: "password-reset" },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "10m" },
    );

    return res.status(200).json({
      message: "OTP verified successfully",
      resetToken,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const setPasswordSchema = Joi.object({
  password: passwordSchema,
  confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
});
const setPasswordController = async (req, res) => {
  try {
    const { error } = setPasswordSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }

    const { password } = req.body;

    const user = await User.findOne({
      _id: req.user.userId,
    });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;

    await user.save();

    return res.status(200).json({
      message: "Password Update successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  loginController,
  registerController,
  forgotPasswordController,
  verifyOtpController,
  setPasswordController,
  googleLoginController,
  verifyRegisterOTPController,
  resendRegisterOTPController,
};
