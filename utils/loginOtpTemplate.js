/**
 * Generate Login Notification Email HTML
 *
 * This function generates a professional HTML email template for login notifications
 *
 * @param {Object} options - Email template options
 * @param {string} options.userName - User's name (optional)
 * @param {string} options.dateTime - Login date and time (e.g., "Tuesday, November 18, 2025 at 10:00 AM")
 * @param {string} options.ipAddress - IP address of the login
 * @param {string} options.location - Geographic location (e.g., "Delhi, Delhi, India")
 * @param {string} options.device - Device and browser info (e.g., "Chrome on Windows")
 * @param {string} options.secureAccountUrl - URL for securing account
 * @param {string} options.viewActivityUrl - URL for viewing account activity
 * @param {string} options.contactSupportUrl - URL for contacting support
 * @param {string} options.helpCenterUrl - URL for help center
 * @param {string} options.privacyPolicyUrl - URL for privacy policy
 * @param {string} options.termsUrl - URL for terms of service
 *
 * @returns {string} Complete HTML email template
 *
 * @example
 * const emailHtml = generateLoginNotificationEmail({
 *   userName: "John Doe",
 *   dateTime: "Tuesday, November 18, 2025 at 10:00 AM",
 *   ipAddress: "192.168.1.1",
 *   location: "Delhi, Delhi, India",
 *   device: "Chrome on Windows",
 *   secureAccountUrl: "https://taskmate.com/security",
 *   viewActivityUrl: "https://taskmate.com/activity",
 *   contactSupportUrl: "https://taskmate.com/support",
 *   helpCenterUrl: "https://taskmate.com/help",
 *   privacyPolicyUrl: "https://taskmate.com/privacy",
 *   termsUrl: "https://taskmate.com/terms"
 * });
 */
function generateLoginNotificationEmail(options) {
  const {
    userName = "",
    dateTime = "Unknown",
    ip = "Unknown",
    location = "Unknown Location",
    device = "Unknown Device",
    secureAccountUrl = "#",
    viewActivityUrl = "#",
    contactSupportUrl = "#",
    helpCenterUrl = "#",
    privacyPolicyUrl = "#",
    termsUrl = "#",
  } = options;

  //   console.log(options);
  const currentYear = new Date().getFullYear();
  const greeting = userName ? `Hello ${userName},` : "Hello,";

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Task Mate - Security Alert</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background-color: #f5f5f5;
            line-height: 1.6;
        }
        .email-wrapper {
            width: 100%;
            padding: 50px 20px;
            background-color: #f5f5f5;
        }
        .email-container {
            max-width: 650px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }
        .header {
            background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
            color: #ffffff;
            padding: 45px 40px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 32px;
            font-weight: 600;
            letter-spacing: -0.5px;
        }
        .content {
            padding: 55px 50px;
            color: #333333;
        }
        .greeting {
            font-size: 17px;
            margin: 0 0 28px 0;
            color: #1f2937;
            font-weight: 500;
        }
        .message {
            font-size: 15px;
            color: #4b5563;
            margin: 0 0 42px 0;
            line-height: 1.7;
        }
        .info-box {
            background-color: #f8fafc;
            border: 1px solid #e2e8f0;
            border-left: 4px solid #2563eb;
            padding: 32px 30px;
            margin: 42px 0;
            border-radius: 8px;
        }
        .info-box h3 {
            margin: 0 0 24px 0;
            font-size: 17px;
            color: #1e40af;
            font-weight: 600;
            letter-spacing: -0.3px;
        }
        .info-item {
            display: flex;
            margin-bottom: 18px;
            font-size: 14px;
            align-items: baseline;
        }
        .info-item:last-child {
            margin-bottom: 0;
        }
        .info-label {
            font-weight: 600;
            color: #374151;
            min-width: 140px;
            flex-shrink: 0;
        }
        .info-value {
            color: #6b7280;
            flex: 1;
        }
        .alert-box {
            background: linear-gradient(to right, #fef3c7, #fef9e7);
            border: 1px solid #f59e0b;
            border-radius: 8px;
            padding: 24px 28px;
            margin: 42px 0;
        }
        .alert-box p {
            margin: 0;
            font-size: 14px;
            color: #92400e;
            line-height: 1.7;
        }
        .alert-box strong {
            font-weight: 700;
            color: #78350f;
        }
        .button-container {
            text-align: center;
            margin: 48px 0;
            padding: 15px 0;
        }
        .button {
            display: inline-block;
            background-color: #dc2626;
            color: #ffffff !important;
            text-decoration: none;
            padding: 16px 40px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 15px;
            transition: all 0.3s ease;
            box-shadow: 0 2px 8px rgba(220, 38, 38, 0.2);
            margin: 10px 15px;
        }
        .button:hover {
            background-color: #b91c1c;
            box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
            transform: translateY(-1px);
        }
        .secondary-button {
            background-color: #2563eb;
            box-shadow: 0 2px 8px rgba(37, 99, 235, 0.2);
        }
        .secondary-button:hover {
            background-color: #1d4ed8;
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
        }
        .button-wrapper {
            display: inline-block;
            margin: 0 8px;
        }
        .divider {
            border: 0;
            border-top: 1px solid #e5e7eb;
            margin: 48px 0;
        }
        .help-text {
            font-size: 14px;
            color: #6b7280;
            margin: 35px 0 0 0;
            line-height: 1.8;
            padding: 0;
        }
        .help-text a {
            color: #2563eb;
            text-decoration: none;
            font-weight: 500;
        }
        .help-text a:hover {
            text-decoration: underline;
        }
        .footer {
            background-color: #f9fafb;
            padding: 45px 50px;
            text-align: center;
            border-top: 1px solid #e5e7eb;
        }
        .footer-text {
            margin: 0 0 18px 0;
            font-size: 15px;
            color: #4b5563;
            line-height: 1.6;
        }
        .footer-text strong {
            color: #1f2937;
            font-weight: 600;
        }
        .footer-links {
            margin: 32px 0 22px 0;
        }
        .footer-links a {
            color: #2563eb;
            text-decoration: none;
            margin: 0 18px;
            font-size: 14px;
            font-weight: 500;
        }
        .footer-links a:hover {
            text-decoration: underline;
            color: #1d4ed8;
        }
        .no-reply {
            font-size: 13px;
            color: #9ca3af;
            font-style: italic;
            margin: 22px 0 16px 0;
        }
        .copyright {
            font-size: 13px;
            color: #9ca3af;
            margin: 24px 0 0 0;
        }
        
        /* Responsive Design */
        @media only screen and (max-width: 600px) {
            .email-wrapper {
                padding: 20px 10px;
            }
            .content {
                padding: 40px 28px;
            }
            .header {
                padding: 38px 28px;
            }
            .header h1 {
                font-size: 26px;
            }
            .button {
                display: block;
                margin: 15px auto;
                max-width: 280px;
            }
            .button-wrapper {
                display: block;
                margin: 0;
            }
            .info-item {
                flex-direction: column;
            }
            .info-label {
                margin-bottom: 6px;
            }
            .footer {
                padding: 35px 28px;
            }
            .footer-links a {
                display: inline-block;
                margin: 10px 12px;
            }
        }
    </style>
</head>
<body>
    <div class="email-wrapper">
        <div class="email-container">
            <!-- Header -->
            <div class="header">
                <h1>Task Mate</h1>
            </div>

            <!-- Content -->
            <div class="content">
                <p class="greeting">${greeting}</p>
                
                <p class="message">
                    We detected a new sign-in to your Task Mate account. If this was you, you can safely ignore this email. If you don't recognize this activity, please secure your account immediately.
                </p>

                <!-- Login Information Box -->
                <div class="info-box">
                    <h3>Sign-in Details</h3>
                    <div class="info-item">
                        <span class="info-label">Date & Time:</span>
                        <span class="info-value">${dateTime}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">IP Address:</span>
                        <span class="info-value">${ip}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Location:</span>
                        <span class="info-value">${location}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Device:</span>
                        <span class="info-value">${device}</span>
                    </div>
                </div>

                <!-- Security Alert -->
                <div class="alert-box">
                    <p>
                        <strong>Security Notice:</strong> If you didn't sign in from this device or location, your account may be compromised. Please secure your account immediately by changing your password and reviewing your recent activity.
                    </p>
                </div>

                <!-- Action Buttons -->
                <div class="button-container">
                    <div class="button-wrapper">
                        <a href="${secureAccountUrl}" class="button">Secure My Account</a>
                    </div>
                    <div class="button-wrapper">
                        <a href="${viewActivityUrl}" class="button secondary-button">View Activity</a>
                    </div>
                </div>

                <hr class="divider">

                <!-- Help Text -->
                <p class="help-text">
                    If you didn't request this sign-in notification or if you have concerns about your account security, please 
                    <a href="${contactSupportUrl}">contact our support team</a> immediately.
                </p>
            </div>

            <!-- Footer -->
            <div class="footer">
                <p class="footer-text">Best regards,<br><strong>The Task Mate Team</strong></p>
                
                <div class="footer-links">
                    <a href="${helpCenterUrl}">Help Center</a>
                    <a href="${privacyPolicyUrl}">Privacy Policy</a>
                    <a href="${termsUrl}">Terms of Service</a>
                </div>

                <p class="no-reply">This is an automated message, please do not reply to this email.</p>
                
                <p class="copyright">© ${currentYear} Task Mate. All rights reserved.</p>
            </div>
        </div>
    </div>
</body>
</html>`;
}

module.exports = generateLoginNotificationEmail;
