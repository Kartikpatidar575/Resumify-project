const express = require("express");
const {
  loginController,
  registerController,
  forgotPasswordController,
  verifyOtpController,
  setPasswordController,
  googleLoginController,
} = require("../controllers/authController");
const router = express.Router();
const resetPasswordMiddleware = require("../middleware/resetPasswordMiddleware");

router.post("/google", googleLoginController);
router.post("/login", loginController);
router.post("/register", registerController);
router.post("/forgot-password", forgotPasswordController);
router.post("/verify-otp", verifyOtpController);
router.post("/set-password", resetPasswordMiddleware, setPasswordController);

module.exports = router;
