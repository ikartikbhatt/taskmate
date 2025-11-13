const logger = require("../../helper/logger");
const sendResponse = require("../../helper/sendResponse");
const userModel = require("../../models/userModel");
const config = require("../../config/config.json");

// email
const emailFormat = new RegExp(config.regex.emailRegex);

// password
const passwordFormat = new RegExp(config.regex.passRegex);

// signup
async function signupValidator(req, res, next) {
  try {
    const { name, email, password, role, designation } = req.body;

    if (!name || !email || !password) {
      return sendResponse(res, 400, "failure", "provide proper input");
    }

    if (!emailFormat.test(email)) {
      return sendResponse(
        res,
        400,
        "failure",
        "email should be in proper format"
      );
    }

    if (password.length < 8 || password.length > 50) {
      return sendResponse(
        res,
        400,
        "failure",
        "password length must be between 8 to 50 characters"
      );
    }

    if (!passwordFormat.test(password)) {
      return sendResponse(
        res,
        400,
        "failure",
        "password must be in proper format"
      );
    }

    // check for duplicate entry
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return sendResponse(
        res,
        400,
        "failure",
        "user already present kindly proceed for login"
      );
    }

    req.userData = { name, email, password, role, designation };
    logger.log({
      level: "info",
      message: "user SignupValidator passed >>>",
      // data: req.userData,
    });
  } catch (err) {
    logger.log({
      level: "info",
      message: "error in signupvalidator >>>>>",
      error: err.message,
    });
  }

  next();
}

module.exports = signupValidator;
