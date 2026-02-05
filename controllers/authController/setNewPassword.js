const encPass = require("../../helper/encPassword");
const userModel = require("../../models/userModel");
const logger = require("../../helper/logger");
const sendResponse = require("../../helper/sendResponse");

async function setNewPassword(req, res) {
  const { user, newPassword } = req.forgetPass;

  try {
    const hashPassword = await encPass(newPassword, "encrypt");
    const updatedUser = await userModel.findByIdAndUpdate(
      user._id,
      {
        password: hashPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
      { new: true }
    );

    if (updatedUser) {
      res.clearCookie("taskmate");
      return sendResponse(
        res,
        200,
        "Success",
        `${updatedUser.name} user password reseted successfully`
      );
    }
  } catch (error) {
    logger.log({
      level: "error",
      message: `Failed to update user password: ${error.message}`,
    });
    return res.status(500).json({
      status: 500,
      message: "Failed to update user password.",
    });
  }
}

module.exports = setNewPassword;
