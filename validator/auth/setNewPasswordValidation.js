const sendResponse = require("../../helper/sendResponse");
const userModel = require("../../models/userModel");
const config = require("../../config/config.json");

//password regex
const passwordFormat = new RegExp(config.regex.passRegex);

async function setNewPasswordValidation(req, res, next) {
  const { resetToken, newPassword } = req.body;

  if (!resetToken || !newPassword) {
    return sendResponse(
      res,
      400,
      "Failure",
      "Invalid request body: resetToken and newPassword are required."
    );
  }

  if (!passwordFormat.test(newPassword)) {
    return sendResponse(
      res,
      400,
      "Failure",
      "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)."
    );
  }

  const findUser = await userModel.findOne({
    resetToken: resetToken,
    resetTokenExpiry: { $gt: new Date() },
  });

  if (!findUser) {
    return sendResponse(res, 400, "Failure", "Invalid or expired token.");
  }

  req.forgetPass = {
    user: findUser,
    newPassword: newPassword,
  };

  next();
}

module.exports = setNewPasswordValidation;
