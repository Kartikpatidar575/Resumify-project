const express = require("express");
const { createFeedback } = require("../controllers/feedBackController");

const router = express.Router();

router.post("/", createFeedback);

module.exports = router;
