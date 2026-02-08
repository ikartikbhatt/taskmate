const logger = require("../../helper/logger");
const user = require("../../models/userModel");
const SignUpMail = require("../../helper/sendMail");
const encPass = require("../../helper/encPassword");
const sendResponse = require("../../helper/sendResponse");

// signup
async function signUp(req, res) {
  try {
    const data = req.userData;

    const { name, email, password, role, designation } = data;

    const hashPassword = await encPass(password, "encrypt");

    const newUser = new user({
      name,
      email,
      password: hashPassword,
      role,
      designation,
    });
    await newUser.save();

    // Send signup email 
    SignUpMail.SignUPMail({
      receiver: newUser.email,
      userName: newUser.name,
    }).catch(err => {
      logger.log({
        level: "error",
        message: "Signup mail failed:",
        error: err.message
      });
    });

    return sendResponse(
      res,
      200,
      "success",
      "user signed up successfully",
      {
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        designation: newUser.designation
      }
    );
  } catch (err) {
    logger.log({
      level: "error", 
      message: "error in signupController >>>>>",
      error: err.message,
    });
    
    return sendResponse(res, 500, "failure", "Internal server error");
  }
}

module.exports = signUp;