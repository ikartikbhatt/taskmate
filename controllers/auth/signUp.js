const logger = require("../../helper/logger");
const user = require("../../models/userModel");
const encPass = require("../../helper/encPassword");
const sendResponse = require("../../helper/sendResponse");

// signup
async function signUp(req, res) {
  try {
    const data = req.userData;

    const { name, email, password, role } = data;

    const hashPassword = await encPass(password, "encrypt");
    const newUser = new user({ name, email, password: hashPassword,role });
    await newUser.save();

    return sendResponse(res, 200, "success", "Signed up successfully");
  } catch (err) {
    logger.log({
      level: "info",
      message: "error in signupController >>>>>",
      error: err.message,
    });
  }
}

module.exports = signUp;
