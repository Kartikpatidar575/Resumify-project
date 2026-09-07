const express = require("express");
const router = express.Router();
const { getUserController } = require("../controllers/userController");

router.get("/me", getUserController);
module.exports = router;
