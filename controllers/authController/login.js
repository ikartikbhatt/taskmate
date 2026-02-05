const logger = require("../../helper/logger");
const sendResponse = require("../../helper/sendResponse");
const encPass = require("../../helper/encPassword");
const userModel = require("../../models/userModel");
const jwt = require("jsonwebtoken");
const sendMail = require("../../helper/sendMail");

// login
async function login(req, res) {
  try {
    const { email, password } = req.userdata;
    //fetch user stored password from database
    const getUser = await userModel.findOne({ email });
    if (!getUser) {
      return sendResponse(res, 400, "failure", "wrong email or password");
    }

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

      // Collect login info
      const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
      // const ip = req.headers["host"];
      const device = req.headers["user-agent"];

      // send login alert mail
      sendMail.loginMail({
        receiver: getUser.email,
        userName: getUser.name,
        ip,
        device,
      });

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
