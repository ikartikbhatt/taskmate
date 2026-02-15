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
        { expiresIn: "7d" }
      );

      //send cookies
      res.cookie("taskmate", jwtToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/",
      });

      // Collect login info
      const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
      const device = req.headers["user-agent"];

      // send login alert mail
      sendMail
        .loginMail({
          receiver: getUser.email,
          userName: getUser.name,
          ip,
          device,
        })
        .catch((err) => {
          logger.log({
            level: "error",
            message: "Login mail failed:",
            error: err.message,
          });
        });

      return sendResponse(res, 200, "success", "user logged in successfully", {
        success: true,
        user: {
          email: getUser.email,
          name: getUser.name,
          role: getUser.role,
          Bio: getUser.bio,
        },
      });
    }
  } catch (err) {
    logger.log({
      level: "error",
      message: "error in loginController >>>>>",
      error: err.message,
    });

    return sendResponse(res, 500, "failure", "Internal server error");
  }
}

module.exports = login;
