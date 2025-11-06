const logger = require("../../helper/logger");
const sendResponse = require("../../helper/sendResponse");
const encPass = require("../../helper/encPassword");
const userModel = require("../../models/userModel");
async function login(req, res) {
  try {
    const { email, password } = req.userdata;
    //fetch user stored password from database
    const getUser = await userModel.findOne({ email }).select("-__v -_id");

    const matchPass = await encPass(password, "decrypt", getUser.password);

    if (matchPass === false) {
      return sendResponse(res, 400, "failure", "wrong email or password");
    } else {
      return sendResponse(
        res,
        200,
        "success",
        "user logged in successfully",
        getUser
      );
    }
  } catch (err) {
    logger.log({
      level: "info",
      message: "error in loginController >>>>>",
      error: err.message,
    });
  }
}

module.exports = login;
