const express = require("express");
const {
  createResumeController,
  updateResumeController,
  getSingleResumeController,
  getResumeController,
  deleteResumeController,
} = require("../controllers/resumeController");
const router = express.Router();

router.get("/", getResumeController);

router.post("/", createResumeController);

router.get("/:resumeId", getSingleResumeController);

router.delete("/:resumeId", deleteResumeController);

router.patch("/:resumeId", updateResumeController);

module.exports = router;
