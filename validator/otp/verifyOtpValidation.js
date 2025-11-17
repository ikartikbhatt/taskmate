const logger = require("../../helper/logger");
const sendResponse = require("../../helper/sendResponse");
const OTPModel = require("../../models/otpModel");
const userModel = require("../../models/userModel");
const config = require("../../config/config.json");
const OTP_LENGTH = process.env.OTP_LENGTH || 6;

// email
const emailFormat = new RegExp(config.regex.emailRegex);

async function verifyOtpValidation(req, res, next) {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return sendResponse(
      res,
      400,
      "failure",
      "invalid request body: email and otp are required."
    );
  }
  if (!emailFormat.test(email)) {
    return sendResponse(res, 400, "failure", "Enter Valid E-mail");
  }

  const otpRegex = new RegExp(`^\\d{${OTP_LENGTH}}$`);
  if (!otpRegex.test(otp)) {
    return sendResponse(
      res,
      400,
      "failure",
      `OTP must be a ${OTP_LENGTH}-digit number.`
    );
  }

  const findUser = await userModel.findOne({ email: email });

  if (!findUser) {
    return sendResponse(
      res,
      400,
      "failure",
      "User does not exist! Request from Unregistered User"
    );
  }

  const findOtp = await OTPModel.findOne({ email: email, otp: otp });

  if (!findOtp) {
    return sendResponse(res, 400, "failure", "Invalid Otp");
  }

  const date = new Date();
  if (findOtp.expiringTime < date || findOtp.status !== "pending") {
    return sendResponse(res, 400, "failure", "Invalid Otp or Expired");
  }

  logger.log({
    level: "info",
    message: `OTP Verification Validation Successful`,
  });

  req.verifyOtp = findOtp;
  next();
}

module.exports = verifyOtpValidation;
