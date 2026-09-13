require("dotenv").config();

const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const connectDB = require("./config/connectDb");
const authRoute = require("./routes/authRoute");
const resumeRoute = require("./routes/resumeRoute");
const userRoute = require("./routes/userRoute");
const feedbackRoute = require("./routes/feedBackRoute");

const authMiddleware = require("./middleware/authMiddleware");

const port = process.env.PORT || 5000;
const helmet = require("helmet");
const app = express();

app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    message: "Too many authentication attempts. Please try again later.",
  },
});
app.use(express.json());

app.use("/api/auth", loginLimiter, authRoute);
app.use("/api/resume", generalLimiter, authMiddleware, resumeRoute);
app.use("/api/user", generalLimiter, authMiddleware, userRoute);
app.use("/api/feedback", generalLimiter, authMiddleware, feedbackRoute);

const start = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`This app listening on http://localhost:${port}`);
    });
  } catch (error) {
    console.error(error);
  }
};
start();

module.exports = app;
