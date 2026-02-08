const nodemailer = require("nodemailer");
const otpTemplate = require("../utils/otpTemplate");
const loginAlertTemplate = require("../utils/loginOtpTemplate");
const SignUpTemplate = require("../utils/SignUPTemplate");
const logger = require("./logger");
const dotenv = require("dotenv");
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER?.trim(),
    pass: process.env.GMAIL_PASS?.trim(),
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

// ✅ FIXED: Verify connection on startup (optional but helpful)
transporter.verify(function (error, success) {
  if (error) {
    logger.log({
      level: "error",
      message: "⚠️ Email transporter connection failed (SMTP may be blocked on Render)",
      error: error.message,
    });
  } else {
    logger.log({
      level: "info",
      message: "✅ Email server is ready to send messages",
    });
  }
});

// ✅ FIXED: Added proper error handling
async function shipOTP({ otp, receiver, type }) {
  try {
    if (type == "email") {
      const info = await transporter.sendMail({
        from: `"Task Mate" <${process.env.GMAIL_USER}>`,
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
        messageId: info.messageId,
      });
      
      return true; // ✅ Return success
      
    } else if (type == "mobile") {
      logger.log({
        level: "info",
        message: "📱 OTP on mobile service under construction",
      });
      return false;
    }
  } catch (error) {
    // ✅ CRITICAL: Log but don't crash
    logger.log({
      level: "error",
      message: "❌ Failed to send OTP email (SMTP may be blocked)",
      error: error.message,
    });
    throw error; // Re-throw for OTP flow (OTP must be sent)
  }
}

// ✅ FIXED: Added proper error handling (non-blocking)
async function loginMail({ receiver, userName, ip, device }) {
  try {
    const info = await transporter.sendMail({
      from: `"Task Mate" <${process.env.GMAIL_USER}>`,
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
      messageId: info.messageId,
    });
    
    return true;
    
  } catch (error) {
    // ✅ CRITICAL: Log but DON'T crash (login should succeed even if email fails)
    logger.log({
      level: "error",
      message: "❌ Failed to send login alert email (SMTP may be blocked)",
      error: error.message,
    });
    return false; // ✅ Return false but don't throw
  }
}

// ✅ FIXED: Added proper error handling (non-blocking)
async function SignUPMail({ receiver, userName }) {
  try {
    const info = await transporter.sendMail({
      from: `"Task Mate" <${process.env.GMAIL_USER}>`,
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
      messageId: info.messageId,
    });
    
    return true;
    
  } catch (error) {
    // ✅ CRITICAL: Log but DON'T crash (signup should succeed even if email fails)
    logger.log({
      level: "error",
      message: "❌ Failed to send welcome email (SMTP may be blocked)",
      error: error.message,
    });
    return false; // ✅ Return false but don't throw
  }
}

module.exports = { shipOTP, loginMail, SignUPMail };

/* 
 * ⚠️ IMPORTANT NOTES:
 * 
 * 1. This version has proper error handling to prevent crashes
 * 2. Gmail SMTP may still be BLOCKED on Render (especially free tier)
 * 3. If emails fail on Render, consider switching to SendGrid/Resend
 * 4. Login/Signup will work even if emails fail
 * 5. OTP emails will throw errors (since OTP must be sent for security)
 * 
 * For production, use sendMail-sendgrid.js instead (see EMAIL-SETUP-GUIDE.md)
 */