const logger = require("../../helper/logger");
const sendResponse = require("../../helper/sendResponse");
const encPass = require("../../helper/encPassword");
const userModel = require("../../models/userModel");
const jwt = require("jsonwebtoken");
const { http } = require("winston");
async function login(req, res) {
  try {
    const { email, password } = req.userdata;
    //fetch user stored password from database
    const getUser = await userModel.findOne({ email });

    const matchPass = await encPass(password, "decrypt", getUser.password);

    if (!matchPass) {
      return sendResponse(res, 400, "failure", "wrong email or password");
    } else {
      //jwt token
      const jwtToken = jwt.sign(
        { id: getUser._id?.toString() },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
      );

      //send cookies
      res.cookie("taskmate", jwtToken, { httpOnly: true, secure: false });

      return sendResponse(res, 200, "success", "user logged in successfully", {
        email: getUser.email,
        name: getUser.name,
        role: getUser.role,
      });
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
