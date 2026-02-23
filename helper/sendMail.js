const nodemailer = require("nodemailer");
const otpTemplate = require("../utils/otpTemplate");
const loginAlertTemplate = require("../utils/loginOtpTemplate");
const SignUpTemplate = require("../utils/SignUPTemplate");
const requestJoinTeamTemplate = require("../utils/requestJoinTeamTemplate");
const requestAcceptTemplate = require("../utils/requetAcceptTemplate");
const logger = require("./logger");
const dotenv = require("dotenv");
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER?.trim(),
    pass: process.env.GMAIL_PASS?.trim(),
  },
});

// ship otp
async function shipOTP({ otp, receiver, type }) {
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
      message: "OTP on mail sent Successfully",
      messageId: info.messageId,
    });
  } else if (type == "mobile") {
    logger.log({
      level: "info",
      message: "OTP on mobile service under construction",
    });
  }
}

async function loginMail({ receiver, userName, ip, device }) {
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
      // secureAccountUrl: "http://localhost:8080/taskmate/auth/resetpass",
    }),
  });
  logger.log({
    level: "info",
    message: "Login alert mail sent successfully",
    messageId: info.messageId,
  });
}
async function SignUPMail({ receiver, userName }) {
  const info = await transporter.sendMail({
    from: `"Task Mate" <${process.env.GMAIL_USER}>`,
    to: receiver,
    subject: "🔔 Task Mate SignUp",
    html: SignUpTemplate({
      dateTime: new Date().toLocaleString(),
      userName,
    }),
  });
  logger.log({
    level: "info",
    message: "Welcom mail sent successfully",
    messageId: info.messageId,
  });
}

// Send team join request notification to admin
async function requestJoinTeamMail({
  receiver,
  teamOwnerName,
  requesterName,
  requesterEmail,
  requesterId,
  requesterMessage,
  teamName,
  teamKey,
}) {
  const info = await transporter.sendMail({
    from: `"Task Mate" <${process.env.GMAIL_USER}>`,
    to: receiver,
    subject: `🔔 New Team Join Request from ${requesterName} - Task Mate`,
    html: requestJoinTeamTemplate({
      teamOwnerName,
      requesterName,
      requesterEmail,
      requesterId,
      requesterMessage,
      teamName,
      teamKey,
      requestDate: new Date().toLocaleString(),
      appUrl: process.env.CLIENT_URL || "http://localhost:3000",
    }),
  });
  logger.log({
    level: "info",
    message: "Team join request mail sent successfully",
    messageId: info.messageId,
  });
}

// Send request accepted notification to user
async function requestAcceptMail({
  receiver,
  userName,
  teamName,
  teamKey,
  teamAdminName,
  userRole,
}) {
  const info = await transporter.sendMail({
    from: `"Task Mate" <${process.env.GMAIL_USER}>`,
    to: receiver,
    subject: `🎉 You've been added to ${teamName} - Task Mate`,
    html: requestAcceptTemplate({
      userName,
      teamName,
      teamKey,
      teamAdminName,
      userRole: userRole || "Member",
      joinedDate: new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      teamDashboardUrl: `${process.env.CLIENT_URL || "http://localhost:3000"}/team/${teamKey}/dashboard`,
      helpCenterUrl: `${process.env.CLIENT_URL || "http://localhost:3000"}/help`,
      contactSupportUrl: `${process.env.CLIENT_URL || "http://localhost:3000"}/support`,
      privacyPolicyUrl: `${process.env.CLIENT_URL || "http://localhost:3000"}/privacy`,
      termsUrl: `${process.env.CLIENT_URL || "http://localhost:3000"}/terms`,
    }),
  });
  logger.log({
    level: "info",
    message: "Request accepted mail sent successfully",
    messageId: info.messageId,
  });
}

module.exports = {
  shipOTP,
  loginMail,
  SignUPMail,
  requestJoinTeamMail,
  requestAcceptMail,
};
