require("dotenv").config();
const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_ATLAS_URL);
    console.log("MongoDB Atlas Connected Successfully");
  } catch (error) {
    console.error("MongoDB Atlas Connection Failed:", error.message);
  }
};

module.exports = connectDB;
