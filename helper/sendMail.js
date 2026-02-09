require("dotenv").config();
const axios = require("axios");
const otpTemplate = require("../utils/otpTemplate");
const loginAlertTemplate = require("../utils/loginOtpTemplate");
const SignUpTemplate = require("../utils/SignUPTemplate");
const logger = require("./logger");

const BREVO_URL = "https://api.brevo.com/v3/smtp/email";

const SENDER_EMAIL = process.env.BREVO_SENDER_EMAIL;

if (!SENDER_EMAIL) {
  throw new Error("❌ BREVO_SENDER_EMAIL is not defined in environment variables");
}

const headers = {
  "api-key": process.env.BREVO_API_KEY,
  "Content-Type": "application/json",
  accept: "application/json",
};

// ================= OTP =================
async function shipOTP({ otp, receiver, type }) {
  try {
    if (type !== "email") return false;

    await axios.post(
      BREVO_URL,
      {
        sender: {
          name: "Task Mate",
          email: SENDER_EMAIL,
        },
        to: [{ email: receiver }],
        subject: "🔒 OTP Verification",
        htmlContent: otpTemplate({
          otp,
          title: "OTP Verification",
          message: "Use the OTP below to continue:",
        }),
      },
      { headers }
    );

    logger.info("✅ OTP mail sent", { receiver });
    return true;
  } catch (error) {
    logger.error("❌ Brevo OTP failed", {
      error: error.response?.data || error.message,
    });
    throw error;
  }
}

// ================= LOGIN ALERT =================
async function loginMail({ receiver, userName, ip, device }) {
  try {
    await axios.post(
      BREVO_URL,
      {
        sender: { name: "Task Mate", email: SENDER_EMAIL },
        to: [{ email: receiver }],
        subject: "🔔 New Login Alert",
        htmlContent: loginAlertTemplate({
          dateTime: new Date().toLocaleString(),
          userName,
          ip,
          location: "Unknown",
          device,
        }),
      },
      { headers }
    );

    logger.info("✅ Login mail sent", { receiver });
    return true;
  } catch (error) {
    logger.error("❌ Login mail failed", {
      error: error.response?.data || error.message,
    });
    return false;
  }
}

// ================= SIGNUP =================
async function SignUPMail({ receiver, userName }) {
  try {
    await axios.post(
      BREVO_URL,
      {
        sender: { name: "Task Mate", email: SENDER_EMAIL },
        to: [{ email: receiver }],
        subject: "🎉 Welcome to Task Mate",
        htmlContent: SignUpTemplate({
          dateTime: new Date().toLocaleString(),
          userName,
        }),
      },
      { headers }
    );

    logger.info("✅ Signup mail sent", { receiver });
    return true;
  } catch (error) {
    logger.error("❌ Signup mail failed", {
      error: error.response?.data || error.message,
    });
    return false;
  }
}

module.exports = { shipOTP, loginMail, SignUPMail };
