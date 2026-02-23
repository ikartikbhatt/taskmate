/**
 * Generate Team Join Request Accepted Email HTML
 *
 * This function generates a congratulatory email when a user's team join request is accepted
 *
 * @param {Object} options - Email template options
 * @param {string} options.userName - Name of the accepted user
 * @param {string} options.userEmail - Email of the accepted user
 * @param {string} options.teamName - Name of the team they joined
 * @param {string} options.teamKey - Team key
 * @param {string} options.teamAdminName - Name of admin who accepted the request
 * @param {string} options.userRole - Role assigned to user (default: "Member")
 * @param {string} options.joinedDate - Date they were added to team
 * @param {string} options.teamDashboardUrl - URL to team dashboard
 * @param {string} options.helpCenterUrl - URL for help center
 * @param {string} options.contactSupportUrl - URL for support
 * @param {string} options.privacyPolicyUrl - URL for privacy policy
 * @param {string} options.termsUrl - URL for terms of service
 *
 * @returns {string} Complete HTML email template
 *
 * @example
 * const emailHtml = generateRequestAcceptedEmail({
 *   userName: "John Doe",
 *   userEmail: "john@example.com",
 *   teamName: "Marketing Team",
 *   teamKey: "marketing-team-2025",
 *   teamAdminName: "Sarah Johnson",
 *   userRole: "Member",
 *   joinedDate: "Friday, January 31, 2026",
 *   teamDashboardUrl: "https://taskmate.com/team/marketing-team-2025/dashboard",
 *   helpCenterUrl: "https://taskmate.com/help",
 *   contactSupportUrl: "https://taskmate.com/support",
 *   privacyPolicyUrl: "https://taskmate.com/privacy",
 *   termsUrl: "https://taskmate.com/terms"
 * });
 */
function generateRequestAcceptedEmail(options) {
  const {
    userName = "User",
    userEmail = "",
    teamName = "Team",
    teamKey = "",
    teamAdminName = "Team Admin",
    userRole = "Member",
    joinedDate = new Date().toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    teamDashboardUrl = "#",
    helpCenterUrl = "#",
    contactSupportUrl = "#",
    privacyPolicyUrl = "#",
    termsUrl = "#",
  } = options;

  const currentYear = new Date().getFullYear();

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Task Mate - Request Accepted</title>
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
        .success-box {
            background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
            border: 1px solid #10b981;
            border-left: 4px solid #10b981;
            padding: 32px 30px;
            margin: 42px 0;
            border-radius: 8px;
            text-align: center;
        }
        .success-box h2 {
            margin: 0 0 16px 0;
            font-size: 24px;
            color: #065f46;
            font-weight: 600;
        }
        .success-box p {
            margin: 0;
            font-size: 15px;
            color: #047857;
            line-height: 1.6;
        }
        .team-info-box {
            background-color: #f8fafc;
            border: 1px solid #e2e8f0;
            border-left: 4px solid #2563eb;
            padding: 32px 30px;
            margin: 42px 0;
            border-radius: 8px;
        }
        .team-info-box h3 {
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
        .next-steps-box {
            background-color: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 32px 30px;
            margin: 42px 0;
        }
        .next-steps-box h3 {
            margin: 0 0 24px 0;
            font-size: 17px;
            color: #1e40af;
            font-weight: 600;
            letter-spacing: -0.3px;
            text-align: center;
        }
        .step-item {
            display: flex;
            align-items: flex-start;
            margin-bottom: 20px;
            font-size: 14px;
        }
        .step-item:last-child {
            margin-bottom: 0;
        }
        .step-number {
            width: 32px;
            height: 32px;
            min-width: 32px;
            background-color: #2563eb;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #ffffff;
            font-weight: bold;
            font-size: 16px;
            margin-right: 16px;
        }
        .step-text {
            flex: 1;
            color: #374151;
            line-height: 1.6;
            padding-top: 4px;
        }
        .step-text strong {
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
            background-color: #10b981;
            color: #ffffff !important;
            text-decoration: none;
            padding: 16px 48px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 15px;
            transition: all 0.3s ease;
            box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
            margin: 10px;
        }
        .button:hover {
            background-color: #059669;
            box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
            transform: translateY(-1px);
        }
        .info-box {
            background: linear-gradient(to right, #dbeafe, #eff6ff);
            border: 1px solid #3b82f6;
            border-radius: 8px;
            padding: 24px 28px;
            margin: 42px 0;
        }
        .info-box p {
            margin: 0;
            font-size: 14px;
            color: #1e40af;
            line-height: 1.7;
        }
        .info-box strong {
            font-weight: 700;
            color: #1e3a8a;
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
            .info-item {
                flex-direction: column;
            }
            .info-label {
                margin-bottom: 6px;
            }
            .step-item {
                flex-direction: column;
            }
            .step-number {
                margin-bottom: 8px;
            }
            .footer {
                padding: 35px 28px;
            }
            .footer-links a {
                display: inline-block;
                margin: 10px 12px;
            }
            .success-box,
            .team-info-box,
            .next-steps-box {
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
                <p class="greeting">Hello ${userName},</p>
                
                <p class="message">
                    Great news! Your request to join the team has been approved. Welcome aboard!
                </p>

                <div class="success-box">
                    <h2>🎉 You're In!</h2>
                    <p>You have been successfully added to <strong>${teamName}</strong>. You can now start collaborating with your team members and accessing all team tasks and projects.</p>
                </div>

                <div class="team-info-box">
                    <h3>Team Details</h3>
                    
                    <div class="info-item">
                        <span class="info-label">Team Name:</span>
                        <span class="info-value">${teamName}</span>
                    </div>
                    
                    <div class="info-item">
                        <span class="info-label">Team Key:</span>
                        <span class="info-value">${teamKey}</span>
                    </div>
                    
                    <div class="info-item">
                        <span class="info-label">Your Role:</span>
                        <span class="info-value">${userRole}</span>
                    </div>
                    
                    <div class="info-item">
                        <span class="info-label">Added By:</span>
                        <span class="info-value">${teamAdminName} (Team Admin)</span>
                    </div>
                    
                    <div class="info-item">
                        <span class="info-label">Joined On:</span>
                        <span class="info-value">${joinedDate}</span>
                    </div>
                </div>

                <div class="button-container">
                    <a href="${teamDashboardUrl}" class="button">Go to Team Dashboard</a>
                </div>

                <div class="next-steps-box">
                    <h3>What You Can Do Now</h3>
                    
                    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 20px;">
                        <tr>
                            <td width="40" valign="top" style="padding-top: 2px;">
                                <div style="width: 32px; height: 32px; background-color: #2563eb; border-radius: 50%; text-align: center; line-height: 32px; color: #ffffff; font-weight: bold; font-size: 16px;">1</div>
                            </td>
                            <td valign="top" style="padding-left: 12px; color: #374151; font-size: 14px; line-height: 1.6;">
                                <strong style="color: #1f2937;">Explore Team Tasks:</strong> View all current tasks, check task priorities, and see what your teammates are working on.
                            </td>
                        </tr>
                    </table>
                    
                    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 20px;">
                        <tr>
                            <td width="40" valign="top" style="padding-top: 2px;">
                                <div style="width: 32px; height: 32px; background-color: #2563eb; border-radius: 50%; text-align: center; line-height: 32px; color: #ffffff; font-weight: bold; font-size: 16px;">2</div>
                            </td>
                            <td valign="top" style="padding-left: 12px; color: #374151; font-size: 14px; line-height: 1.6;">
                                <strong style="color: #1f2937;">Create New Tasks:</strong> Start contributing by creating tasks, assigning them to team members, and setting deadlines.
                            </td>
                        </tr>
                    </table>
                    
                    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 20px;">
                        <tr>
                            <td width="40" valign="top" style="padding-top: 2px;">
                                <div style="width: 32px; height: 32px; background-color: #2563eb; border-radius: 50%; text-align: center; line-height: 32px; color: #ffffff; font-weight: bold; font-size: 16px;">3</div>
                            </td>
                            <td valign="top" style="padding-left: 12px; color: #374151; font-size: 14px; line-height: 1.6;">
                                <strong style="color: #1f2937;">Collaborate:</strong> Comment on tasks, upload files, and communicate with team members in real-time.
                            </td>
                        </tr>
                    </table>
                    
                    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 0;">
                        <tr>
                            <td width="40" valign="top" style="padding-top: 2px;">
                                <div style="width: 32px; height: 32px; background-color: #2563eb; border-radius: 50%; text-align: center; line-height: 32px; color: #ffffff; font-weight: bold; font-size: 16px;">4</div>
                            </td>
                            <td valign="top" style="padding-left: 12px; color: #374151; font-size: 14px; line-height: 1.6;">
                                <strong style="color: #1f2937;">Track Progress:</strong> Monitor task status, view team analytics, and stay updated with notifications.
                            </td>
                        </tr>
                    </table>
                </div>

                <div class="info-box">
                    <p>
                        <strong>Pro Tip:</strong> Introduce yourself to the team! Head to the team dashboard and let everyone know a bit about yourself and your expertise. Good communication is key to great collaboration.
                    </p>
                </div>

                <hr class="divider">

                <p class="help-text">
                    Need help getting started? Check out our <a href="${helpCenterUrl}">Team Collaboration Guide</a> or 
                    <a href="${contactSupportUrl}">contact support</a> if you have any questions.
                </p>
            </div>

            <div class="footer">
                <p class="footer-text">Welcome to the team!<br><strong>The Task Mate Team</strong></p>
                
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
if (typeof module !== "undefined" && module.exports) {
  module.exports = generateRequestAcceptedEmail;
}
