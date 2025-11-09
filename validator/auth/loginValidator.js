const logger = require("../../helper/logger");
const sendResponse = require("../../helper/sendResponse");
const userModel = require("../../models/userModel");

async function loginValidator(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendResponse(res, 400, "failure", "provide proper input");
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
