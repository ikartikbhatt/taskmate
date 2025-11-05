const logger = require("../../helper/logger");
const user = require("../../models/userModel");
const encPass = require("../../helper/encPassword");
const sendResponse = require("../../helper/sendResponse");

// signup
async function signUp(req, res) {
  try {
    const data = req.userData;
    console.log(data);

    const { name, email, password } = data;

    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return sendResponse(res, 409, "failure", "email already exist");
    }

    const hashPassword = await encPass(password, { encrypt: true });
    const newUser = new user({ name, email, password: hashPassword });
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
