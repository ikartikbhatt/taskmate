const logger = require("../../helper/logger");
const user = require("../../models/userModel");
const encPass = require("../../helper/encPassword");

async function login(req, res) {
  try {
    const data = req.userdata;
    const password = data?.password;

    const matchPass = await encPass(password, "decrypt", user.password);
    if (!matchPass) {
      return sendResponse(res, 400, "failure", "wrong email or password");
    }
    res.json({
      status: "success",
      message: "user logged in successfully ",
      // data
    });
  } catch (err) {
    logger.log({
      level: "info",
      message: "error in loginController >>>>>",
      error: err.message,
    });
  }
}

module.exports = login;
