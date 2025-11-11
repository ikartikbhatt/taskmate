const sendResponse = require("../../helper/sendResponse");
const config = require("../../config/config.json");

// password
const passwordFormat = new RegExp(config.regex.passRegex);

// reset password
function resetPassValidator(req, res, next) {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return sendResponse(
        res,
        400,
        "failure",
        "Both oldPassword and newPassword required"
      );
    }

    if (oldPassword === newPassword) {
      return sendResponse(
        res,
        400,
        "failure",
        "oldPassword and NewPassword Can not be same"
      );
    }

    if (newPassword.length < 8 || newPassword.length > 50) {
      return sendResponse(
        res,
        400,
        "failure",
        "password length must be between 8 to 50 characters"
      );
    }

    if (!passwordFormat.test(newPassword)) {
      return sendResponse(
        res,
        400,
        "failure",
        "Password must be in proper format"
      );
    }
    req.userPassword = { oldPassword, newPassword };
  } catch (err) {
    logger.log({
      level: "info",
      message: "error in resetPassvalidator >>>>>",
      error: err.message,
    });
  }
  next();
}

module.exports = resetPassValidator;
