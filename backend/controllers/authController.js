require("dotenv").config();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const transporter = require("../config/nodemailer");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const Joi = require("joi");

const passwordSchema = Joi.string()
  .min(8)
  .max(128)
  .pattern(/[A-Z]/)
  .pattern(/[a-z]/)
  .pattern(/[0-9]/)
  .pattern(/[!@#$%^&*(),.?":{}|<>]/)
  .required();

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

    const hashedPassword = await bcrypt.hash(password, 10);

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(409).json({ message: "User Already Register" });
    }

    await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User Created Successfully" });
  } catch (error) {
    res.status(500).json(error.message);
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

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Resumify OTP",
      text: `Your OTP is ${otp}. It will expire in 2 minutes`,
      html: `
    <div>
      <h2>Resumify OTP Verification</h2>
      <p>Your OTP is:</p>
      <h1>${otp}</h1>
      <p>This OTP will expire in 2 minutes.</p>
      <p>If you did not request this OTP, please ignore this email.</p>
    </div>
  `,
    });
    user.otp.code = otp;
    user.otp.expiresAt = new Date(Date.now() + 2 * 60 * 1000);

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

const verifyOtpSchema = Joi.object({
  email: Joi.string().trim().lowercase().email().required(),
  otp: Joi.string()
    .pattern(/^\d{6}$/)
    .required(),
});
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
};
