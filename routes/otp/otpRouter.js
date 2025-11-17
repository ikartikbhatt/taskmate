const express = require("express");
const sendOTP = require("../../controllers/otp/sendOtp");
const verifyOtpValidation = require("../../validator/otp/verifyOtpValidation");
const verifyOTP = require("../../controllers/otp/verifyOtp");
const sendOtpValidation = require("../../validator/otp/sendOtpValidation");

const otpRouter = express.Router();

otpRouter.post("/send-otp", sendOtpValidation, sendOTP);
otpRouter.post("/verify-otp", verifyOtpValidation, verifyOTP);

module.exports = otpRouter;
