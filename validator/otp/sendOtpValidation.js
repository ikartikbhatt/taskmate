const sendResponse = require("../../helper/sendResponse");
const userModel = require("../../models/userModel");
const config = require("../../config/config.json");

// email
const emailFormat = new RegExp(config.regex.emailRegex);

//mobile
const mobileFormat = new RegExp(config.regex.mobileRegex);

async function sendOtpValidation(req, res, next) {
  const { email, mobile } = req.body;

  const query = {};
  if (email) query.email = email;
  if (mobile) query.mobile = mobile;

  if (!(email || mobile)) {
    return sendResponse(res, 400, "failure", "Invalid Request Body");
  }

  if (email && !emailFormat.test(email)) {
    return sendResponse(res, 400, "failure", "Kindly pass valid E-mail Id");
  }

  if (mobile && !mobileFormat.test(mobile)) {
    return sendResponse(res, 400, "failure", "Kindly pass valid mobile number");
  }

  //   console.log('query >>>',query);

  const findUser = await userModel.findOne({ email });

  //   console.log('findUser', findUser);

  if (!findUser) {
    return sendResponse(
      res,
      400,
      "failure",
      "User does not exist! Kindly contact administrator for registration"
    );
  }

  req.sendOtp = {
    name: findUser.name,
    email: query.email ? query.email : null,
    mobile: query.mobile ? query.mobile : null,
    otpType: query.email ? "email" : "mobile",
  };

  next();
}

module.exports = sendOtpValidation;
