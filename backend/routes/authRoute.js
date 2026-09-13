const express = require("express");
const {
  loginController,
  registerController,
  forgotPasswordController,
  verifyOtpController,
  setPasswordController,
  googleLoginController,
  verifyRegisterOTPController,
  resendRegisterOTPController,
} = require("../controllers/authController");
const resetPasswordMiddleware = require("../middleware/resetPasswordMiddleware");

const router = express.Router();

router.post("/google", googleLoginController);
router.post("/login", loginController);
router.post("/register", registerController);
router.post("/verify-register-otp", verifyRegisterOTPController);
router.post("/resend-register-otp", resendRegisterOTPController);
router.post("/forgot-password", forgotPasswordController);
router.post("/verify-otp", verifyOtpController);
router.post("/set-password", resetPasswordMiddleware, setPasswordController);

module.exports = router;
