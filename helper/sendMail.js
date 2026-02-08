const { Resend } = require("resend");
const otpTemplate = require("../utils/otpTemplate");
const loginAlertTemplate = require("../utils/loginOtpTemplate");
const SignUpTemplate = require("../utils/SignUPTemplate");
const logger = require("./logger");
const dotenv = require("dotenv");

dotenv.config();

// ✅ Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

// --------------------------------------------------
// ship OTP (BLOCKING – must succeed)
// --------------------------------------------------
async function shipOTP({ otp, receiver, type }) {
  try {
    if (type === "email") {
      const info = await resend.emails.send({
        from: "Task Mate <onboarding@resend.dev>",
        to: receiver,
        subject: "🔒 OTP Verification for Password Reset",
        html: otpTemplate({
          otp,
          title: "OTP Verification for Password Reset",
          message:
            "We've received a request to reset your password. Use the OTP below to proceed:",
        }),
      });

      logger.log({
        level: "info",
        message: "✅ OTP email sent successfully",
        messageId: info?.id,
      });

      return true;
    }

    if (type === "mobile") {
      logger.log({
        level: "info",
        message: "📱 OTP on mobile service under construction",
      });
      return false;
    }
  } catch (error) {
    logger.log({
      level: "error",
      message: "❌ Failed to send OTP email",
      error: error.message,
    });
    throw error; // OTP MUST fail if email not sent
  }
}

// --------------------------------------------------
// login alert (NON-BLOCKING)
// --------------------------------------------------
async function loginMail({ receiver, userName, ip, device }) {
  try {
    const info = await resend.emails.send({
      from: "Task Mate <onboarding@resend.dev>",
      to: receiver,
      subject: "🔔 New Login Alert",
      html: loginAlertTemplate({
        dateTime: new Date().toLocaleString(),
        userName,
        ip,
        location: "Unknown Location",
        device,
      }),
    });

    logger.log({
      level: "info",
      message: "✅ Login alert email sent successfully",
      messageId: info?.id,
    });

    return true;
  } catch (error) {
    logger.log({
      level: "error",
      message: "❌ Failed to send login alert email",
      error: error.message,
    });
    return false; // login should NOT fail
  }
}

// --------------------------------------------------
// signup welcome mail (NON-BLOCKING)
// --------------------------------------------------
async function SignUPMail({ receiver, userName }) {
  try {
    const info = await resend.emails.send({
      from: "Task Mate <onboarding@resend.dev>",
      to: receiver,
      subject: "🎉 Welcome to Task Mate",
      html: SignUpTemplate({
        dateTime: new Date().toLocaleString(),
        userName,
      }),
    });

    logger.log({
      level: "info",
      message: "✅ Welcome email sent successfully",
      messageId: info?.id,
    });

    return true;
  } catch (error) {
    logger.log({
      level: "error",
      message: "❌ Failed to send welcome email",
      error: error.message,
    });
    return false; // signup should NOT fail
  }
}

module.exports = { shipOTP, loginMail, SignUPMail };
