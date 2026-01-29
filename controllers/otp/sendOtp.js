const genrateOtp = require("../../helper/genrateOtp");
const logger = require("../../helper/logger");
const shipOTP = require("../../helper/sendMail");
const sendResponse = require("../../helper/sendResponse");
const OTPModel = require("../../models/otpModel");
const OTP_LENGTH = process.env.OTP_LENGTH || 6;

async function sendOTP(req, res) {
  const user = req.sendOtp;
  const otp = genrateOtp(OTP_LENGTH);

  try {
    const newOtp = new OTPModel({
      email: user?.email || null,
      mobile: user?.mobile || null,
      otp: otp,
      type: user?.email ? "email" : "mobile",
      expiringTime: new Date(Date.now() + 5 * 60000),
      status: "pending",
    });

    const mongooseResponse = await newOtp.save();
    logger.log({
      level: "info",
      message: mongooseResponse.message,
    });

    if (user.otpType == "email") {
      await shipOTP(otp, user.email, user.otpType);
      return sendResponse(
        res,
        200,
        "Success",
        `OTP Sent Successfully to ${user.name} on email : ${user.email}`,
        otp
      );
    } else if (user.otpType == "mobile") {
      await shipOTP(otp, user.mobile, user.otpType);
      return sendResponse(
        res,
        200,
        "Success",
        `OTP Sent Successfully to ${user.name} on mobile : ${user.mobile}`
      );
    } else {
      return sendResponse(
        res,
        200,
        "Success",
        `Unspecified OTP type it could only be email or mobile`
      );
    }
  } catch (error) {
    logger.log({
      level: "error",
      message: `Failed to send OTP: ${error.message}`,
    });
    return res
      .status(500)
      .json(await sendResponse(res, 500, "failure", "Failed to send OTP"));
  }
}

module.exports = sendOTP;
