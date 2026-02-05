/**
 * Generate Welcome Email HTML for Task Mate Account Creation
 *
 * This function generates a professional HTML email template for welcoming new users
 *
 * @param {Object} options - Email template options
 * @param {string} options.userName - User's name (optional)
 * @param {string} options.userEmail - User's email address
 * @param {string} options.dashboardUrl - URL to the dashboard/app
 * @param {string} options.helpCenterUrl - URL for help center
 * @param {string} options.contactSupportUrl - URL for contacting support
 * @param {string} options.privacyPolicyUrl - URL for privacy policy
 * @param {string} options.termsUrl - URL for terms of service
 *
 * @returns {string} Complete HTML email template
 *
 * @example
 * const emailHtml = generateWelcomeEmail({
 *   userName: "John Doe",
 *   userEmail: "john@example.com",
 *   dashboardUrl: "https://taskmate.com/dashboard",
 *   helpCenterUrl: "https://taskmate.com/help",
 *   contactSupportUrl: "https://taskmate.com/support",
 *   privacyPolicyUrl: "https://taskmate.com/privacy",
 *   termsUrl: "https://taskmate.com/terms"
 * });
 */
function generateWelcomeEmail(options) {
  const {
    userName = "",
    userEmail = "",
    dashboardUrl = "#",
    helpCenterUrl = "#",
    contactSupportUrl = "#",
    privacyPolicyUrl = "#",
    termsUrl = "#",
  } = options;

  const currentYear = new Date().getFullYear();
  const greeting = userName ? `Hello ${userName},` : "Hello,";

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Task Mate</title>
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
        .welcome-box {
            background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
            border: 1px solid #3b82f6;
            border-left: 4px solid #2563eb;
            padding: 32px 30px;
            margin: 42px 0;
            border-radius: 8px;
            text-align: center;
        }
        .welcome-box h2 {
            margin: 0 0 16px 0;
            font-size: 20px;
            color: #1e40af;
            font-weight: 600;
        }
        .welcome-box p {
            margin: 0;
            font-size: 15px;
            color: #1e40af;
            line-height: 1.6;
        }
        .features-box {
            background-color: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 32px 30px;
            margin: 42px 0;
        }
        .features-box h3 {
            margin: 0 0 24px 0;
            font-size: 17px;
            color: #1e40af;
            font-weight: 600;
            letter-spacing: -0.3px;
            text-align: center;
        }
        .feature-item {
            display: flex;
            align-items: flex-start;
            margin-bottom: 20px;
            font-size: 14px;
        }
        .feature-item:last-child {
            margin-bottom: 0;
        }
        .feature-icon {
            width: 24px;
            height: 24px;
            min-width: 24px;
            background-color: #2563eb;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #ffffff;
            font-weight: bold;
            font-size: 14px;
            margin-right: 12px;
        }
        .feature-text {
            flex: 1;
            color: #374151;
            line-height: 1.6;
        }
        .feature-text strong {
            color: #1f2937;
            font-weight: 600;
        }
        .button-container {
            text-align: center;
            margin: 48px 0;
            padding: 15px 0;
        }
        .button {
            display: inline-block;
            background-color: #2563eb;
            color: #ffffff !important;
            text-decoration: none;
            padding: 16px 48px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 15px;
            transition: all 0.3s ease;
            box-shadow: 0 2px 8px rgba(37, 99, 235, 0.3);
            margin: 10px;
        }
        .button:hover {
            background-color: #1d4ed8;
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4);
            transform: translateY(-1px);
        }
        .info-box {
            background: linear-gradient(to right, #fef3c7, #fef9e7);
            border: 1px solid #f59e0b;
            border-radius: 8px;
            padding: 24px 28px;
            margin: 42px 0;
        }
        .info-box p {
            margin: 0;
            font-size: 14px;
            color: #92400e;
            line-height: 1.7;
        }
        .info-box strong {
            font-weight: 700;
            color: #78350f;
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
            text-align: center;
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
                padding: 16px 24px;
            }
            .feature-item {
                flex-direction: column;
            }
            .feature-icon {
                margin-bottom: 8px;
            }
            .footer {
                padding: 35px 28px;
            }
            .footer-links a {
                display: inline-block;
                margin: 10px 12px;
            }
            .welcome-box,
            .features-box {
                padding: 24px 20px;
            }
        }
    </style>
</head>
<body>
    <div class="email-wrapper">
        <div class="email-container">
            <div class="header">
                <h1>Task Mate</h1>
            </div>
            <div class="content">
                <p class="greeting">${greeting}</p>
                
                <p class="message">
                    Thank you for creating your Task Mate account! We're excited to have you join our community of productive teams and individuals who are transforming the way they manage tasks and collaborate.
                </p>

                <div class="welcome-box">
                    <h2>🎉 Welcome to Task Mate!</h2>
                    <p>Your account has been successfully created and is ready to use. Let's get you started on your journey to better productivity and seamless team collaboration.</p>
                </div>

                <div class="features-box">
                    <h3>What You Can Do with Task Mate</h3>
                    
                    <div class="feature-item">
                        <div class="feature-icon">✓</div>
                        <div class="feature-text">
                            <strong>Create & Manage Tasks:</strong> Organize your work with intuitive task creation, assignment, and tracking features designed for individual and team productivity.
                        </div>
                    </div>
                    
                    <div class="feature-item">
                        <div class="feature-icon">✓</div>
                        <div class="feature-text">
                            <strong>Team Collaboration:</strong> Invite team members, assign roles, and collaborate seamlessly on projects with real-time updates and notifications.
                        </div>
                    </div>
                    
                    <div class="feature-item">
                        <div class="feature-icon">✓</div>
                        <div class="feature-text">
                            <strong>File Uploads:</strong> Attach important documents, images, and files to your tasks for easy access and reference.
                        </div>
                    </div>
                    
                    <div class="feature-item">
                        <div class="feature-icon">✓</div>
                        <div class="feature-text">
                            <strong>Real-time Tracking:</strong> Stay updated with live status changes, progress tracking, and instant notifications for all your tasks.
                        </div>
                    </div>
                    
                    <div class="feature-item">
                        <div class="feature-icon">✓</div>
                        <div class="feature-text">
                            <strong>Secure & Private:</strong> Your data is protected with industry-standard security measures and encrypted storage.
                        </div>
                    </div>
                </div>

                <div class="button-container">
                    <a href="${dashboardUrl}" class="button">Get Started Now</a>
                </div>

                <div class="info-box">
                    <p>
                        <strong>Quick Tip:</strong> Complete your profile by adding a profile picture and adding other details for better Task Mate expreience. You can do this anytime from your account settings.
                    </p>
                </div>

                <hr class="divider">

                <p class="help-text">
                    Need help getting started? Check out our <a href="${helpCenterUrl}">Help Center</a> or 
                    <a href="${contactSupportUrl}">contact our support team</a>. We're here to help you succeed!
                </p>
            </div>

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

// Export for use in Node.js modules
module.exports = generateWelcomeEmail;
