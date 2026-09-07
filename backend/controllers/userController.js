const User = require("../models/user");

const getUserController = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("fullName email ");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};
module.exports = { getUserController };
