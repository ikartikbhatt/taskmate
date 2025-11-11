const logger = require("../../helper/logger");
const user = require("../../models/userModel");
const encPass = require("../../helper/encPassword");

// signup
async function signUp(req, res) {
  try {
    const data = req.userData;

    const { name, email, password } = data;

    const hashPassword = await encPass(password, "encrypt");
    const newUser = new user({ name, email, password: hashPassword });
    await newUser.save();

    return res.json({
      status: "success",
      message: "user signed up succcessfully",
      data,
    });
  } catch (err) {
    logger.log({
      level: "info",
      message: "error in signupController >>>>>",
      error: err.message,
    });
  }
}

module.exports = signUp;
