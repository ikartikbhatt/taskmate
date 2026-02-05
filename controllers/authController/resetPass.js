const sendResponse = require("../../helper/sendResponse");
const encPass = require("../../helper/encPassword");
const userModel = require("../../models/userModel");
const logger = require("../../helper/logger");

// reset pass
async function resetPass(req, res) {
  try {
    const { oldPassword, newPassword } = req.userPassword;
    const userId = req.userId;

    // find user
    const user = await userModel.findById(userId);

    const matchOldPass = await encPass(oldPassword, "decrypt", user.password);
    if (!matchOldPass) {
      return sendResponse(res, 400, "failure", "send correct oldPassword");
    }

    const encNewPass = await encPass(newPassword, "encrypt");

    user.password = encNewPass;
    await user.save();

    // clear cookies
    res.clearCookie("taskmate");

    return sendResponse(res, 200, "success", "Password updated successfully");
  } catch (err) {
    logger.log({
      level: "info",
      message: "error in resetPassController >>>>>",
      error: err.message,
    });
  }
}

module.exports = resetPass;
