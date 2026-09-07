require("dotenv").config();
const jwt = require("jsonwebtoken");

const resetPasswordMiddleware = (req, res, next) => {
  try {
    const authHeaders = req.headers.authorization;
    if (!authHeaders) {
      return res.status(401).json({ message: "Reset token is required" });
    }
    const resetToken = authHeaders.split(" ")[1];

    if (!resetToken) {
      return res.status(401).json({
        message: "Invalid authorization format",
      });
    }

    const decode = jwt.verify(resetToken, process.env.JWT_SECRET_KEY);
    if (decode.purpose !== "password-reset") {
      return res.status(401).json({
        message: "Invalid reset token",
      });
    }
    req.user = decode;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Reset token has expired",
      });
    }

    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

module.exports = resetPasswordMiddleware;
