const logger = require("../../helper/logger");
const sendResponse = require("../../helper/sendResponse");
const userModel = require("../../models/userModel");
const config = require("../../config/config.json");

// email
const emailFormat = new RegExp(config.regex.emailRegex);

// password
const passwordFormat = new RegExp(config.regex.passRegex);

// login
async function loginValidator(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
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

    //regex email , password
    const user = await userModel.findOne({ email });
    if (!user) {
      return sendResponse(res, 400, "failure", "user does not exist");
    }

    req.userdata = { email, password };
    logger.log({
      level: "info",
      message: "user SignupValidator passed >>>",
    });
  } catch (err) {
    logger.log({
      level: "info",
      message: "error in loginvalidator >>>>>",
      error: err.message,
    });
  }
  next();
}

module.exports = loginValidator;
