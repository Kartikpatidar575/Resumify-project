require("dotenv").config();
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const authHeaders = req.headers.authorization;
    if (!authHeaders) {
      return res
        .status(401)
        .json({ message: "Authentication token is required" });
    }
    const token = authHeaders.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Invalid authorization format",
      });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decode;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

module.exports = authMiddleware;
