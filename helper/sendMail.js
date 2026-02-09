const axios = require("axios");
const otpTemplate = require("../utils/otpTemplate");
const loginAlertTemplate = require("../utils/loginOtpTemplate");
const SignUpTemplate = require("../utils/SignUPTemplate");
const logger = require("./logger");

const BREVO_URL = "https://api.brevo.com/v3/smtp/email";

const sendBrevoMail = async ({ to, subject, html }) => {
  try {
    const res = await axios.post(
      BREVO_URL,
      {
        sender: { email: process.env.BREVO_SENDER.match(/<(.*)>/)[1], name: "Task Mate" },
        to: [{ email: to }],
        subject,
        htmlContent: html,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    return res.data;
  } catch (err) {
    logger.log({
      level: "error",
      message: "Brevo email failed",
      error: err.response?.data || err.message,
    });
    throw err;
  }
};

// OTP (BLOCKING)
async function shipOTP({ otp, receiver }) {
  await sendBrevoMail({
    to: receiver,
    subject: "🔒 OTP Verification for Password Reset",
    html: otpTemplate({
      otp,
      title: "OTP Verification",
      message: "Use the OTP below to reset your password",
    }),
  });
}

// Login alert (NON-BLOCKING)
async function loginMail({ receiver, userName, ip, device }) {
  try {
    await sendBrevoMail({
      to: receiver,
      subject: "🔔 New Login Alert",
      html: loginAlertTemplate({
        dateTime: new Date().toLocaleString(),
        userName,
        ip,
        location: "Unknown",
        device,
      }),
    });
  } catch {
    // do NOT crash login
  }
}

// Signup mail (NON-BLOCKING)
async function SignUPMail({ receiver, userName }) {
  try {
    await sendBrevoMail({
      to: receiver,
      subject: "🎉 Welcome to Task Mate",
      html: SignUpTemplate({
        dateTime: new Date().toLocaleString(),
        userName,
      }),
    });
  } catch {}
}

module.exports = { shipOTP, loginMail, SignUPMail };
