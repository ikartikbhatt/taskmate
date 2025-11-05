const logger = require("../../helper/logger");
const sendResponse = require("../../helper/sendResponse");

// email
const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// password
const passwordFormat =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// signup
async function signupValidator(req, res, next) {
  try {
    const { name, email, password } = req.body;

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

    req.userData = { name, email, password };
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
