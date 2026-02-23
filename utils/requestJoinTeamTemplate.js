/**
 * Generate Team Join Request Email HTML - Integrated with Task Mate API
 *
 * This function generates email notifications when someone requests to join a team
 * Integrates with your existing requestJoinTeamController
 *
 * @param {Object} options - Email template options
 * @param {string} options.teamOwnerName - Name of the team admin/owner
 * @param {string} options.teamOwnerEmail - Email of team admin
 * @param {string} options.requesterName - Name of person requesting to join
 * @param {string} options.requesterEmail - Email of person requesting
 * @param {string} options.requesterId - User ID of requester (MongoDB ObjectId)
 * @param {string} options.requesterMessage - Message from the requester
 * @param {string} options.teamName - Name of the team
 * @param {string} options.teamKey - Unique team key
 * @param {string} options.requestDate - Date/time of the request
 * @param {string} options.appUrl - Base URL of your application
 *
 * @returns {string} Complete HTML email template
 */
function generateTeamJoinRequestEmail(options) {
  const {
    teamOwnerName = "",
    teamOwnerEmail = "",
    requesterName = "Unknown User",
    requesterEmail = "",
    requesterId = "",
    requesterMessage = "No message provided.",
    teamName = "",
    teamKey = "",
    requestDate = new Date().toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
    appUrl = "http://localhost:3000",
  } = options;

  const currentYear = new Date().getFullYear();
  const greeting = teamOwnerName ? `Hello ${teamOwnerName},` : "Hello,";

  // Generate URLs for accept/decline actions
  // These URLs point to your frontend which will call the API
  const acceptUrl = `${appUrl}/team/${teamKey}/accept-request?userId=${requesterId}`;
  const declineUrl = `${appUrl}/team/${teamKey}/decline-request?userId=${requesterId}`;
  const viewRequestsUrl = `${appUrl}/team/${teamKey}/requests`;
  const teamDashboardUrl = `${appUrl}/team/${teamKey}/dashboard`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Task Mate - Team Join Request</title>
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
        .notification-box {
            background: linear-gradient(135deg, #fef3c7 0%, #fef9e7 100%);
            border: 1px solid #f59e0b;
            border-left: 4px solid #f59e0b;
            padding: 32px 30px;
            margin: 42px 0;
            border-radius: 8px;
            text-align: center;
        }
        .notification-box h2 {
            margin: 0 0 16px 0;
            font-size: 20px;
            color: #92400e;
            font-weight: 600;
        }
        .notification-box p {
            margin: 0;
            font-size: 15px;
            color: #92400e;
            line-height: 1.6;
        }
        .request-details-box {
            background-color: #f8fafc;
            border: 1px solid #e2e8f0;
            border-left: 4px solid #2563eb;
            padding: 32px 30px;
            margin: 42px 0;
            border-radius: 8px;
        }
        .request-details-box h3 {
            margin: 0 0 24px 0;
            font-size: 17px;
            color: #1e40af;
            font-weight: 600;
            letter-spacing: -0.3px;
        }
        .detail-item {
            display: flex;
            margin-bottom: 18px;
            font-size: 14px;
            align-items: baseline;
        }
        .detail-item:last-child {
            margin-bottom: 0;
        }
        .detail-label {
            font-weight: 600;
            color: #374151;
            min-width: 140px;
            flex-shrink: 0;
        }
        .detail-value {
            color: #6b7280;
            flex: 1;
            word-break: break-word;
        }
        .message-box {
            background-color: #ffffff;
            border: 2px solid #e5e7eb;
            border-radius: 8px;
            padding: 20px 24px;
            margin: 24px 0 0 0;
        }
        .message-box-label {
            font-weight: 600;
            color: #374151;
            font-size: 14px;
            margin-bottom: 12px;
            display: block;
        }
        .message-box-content {
            color: #4b5563;
            font-size: 14px;
            line-height: 1.7;
            font-style: italic;
            padding: 12px;
            background-color: #f9fafb;
            border-radius: 6px;
            border-left: 3px solid #2563eb;
        }
        .button-container {
            text-align: center;
            margin: 48px 0;
            padding: 15px 0;
        }
        .button {
            display: inline-block;
            color: #ffffff !important;
            text-decoration: none;
            padding: 16px 40px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 15px;
            transition: all 0.3s ease;
            margin: 10px 8px;
        }
        .button-accept {
            background-color: #10b981;
            box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
        }
        .button-accept:hover {
            background-color: #059669;
            box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
            transform: translateY(-1px);
        }
        .button-decline {
            background-color: #ef4444;
            box-shadow: 0 2px 8px rgba(239, 68, 68, 0.3);
        }
        .button-decline:hover {
            background-color: #dc2626;
            box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
            transform: translateY(-1px);
        }
        .button-view {
            background-color: #2563eb;
            box-shadow: 0 2px 8px rgba(37, 99, 235, 0.3);
        }
        .button-view:hover {
            background-color: #1d4ed8;
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4);
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
                margin: 12px auto;
                max-width: 280px;
                padding: 14px 24px;
            }
            .detail-item {
                flex-direction: column;
            }
            .detail-label {
                margin-bottom: 6px;
            }
            .footer {
                padding: 35px 28px;
            }
            .footer-links a {
                display: inline-block;
                margin: 10px 12px;
            }
            .notification-box,
            .request-details-box {
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
                    You have received a new request to join your team "${teamName}" on Task Mate. Please review the details below and take appropriate action.
                </p>

                <div class="notification-box">
                    <h2>🔔 New Team Join Request</h2>
                    <p>Someone wants to collaborate with you on Task Mate. Review their request and decide whether to accept or decline.</p>
                </div>

                <div class="request-details-box">
                    <h3>Request Details</h3>
                    
                    <div class="detail-item">
                        <span class="detail-label">Team Name:</span>
                        <span class="detail-value">${teamName}</span>
                    </div>
                    
                    <div class="detail-item">
                        <span class="detail-label">Team Key:</span>
                        <span class="detail-value">${teamKey}</span>
                    </div>
                    
                    <div class="detail-item">
                        <span class="detail-label">Requester Name:</span>
                        <span class="detail-value">${requesterName}</span>
                    </div>
                    
                    <div class="detail-item">
                        <span class="detail-label">Email Address:</span>
                        <span class="detail-value">${requesterEmail}</span>
                    </div>
                    
                    <div class="detail-item">
                        <span class="detail-label">Request Date:</span>
                        <span class="detail-value">${requestDate}</span>
                    </div>
                    
                    <div class="message-box">
                        <span class="message-box-label">Message from Requester:</span>
                        <div class="message-box-content">
                            "${requesterMessage}"
                        </div>
                    </div>
                </div>

                <div class="button-container">
                    <a href="${acceptUrl}" class="button button-accept">Accept Request</a>
                    <a href="${declineUrl}" class="button button-decline">Decline Request</a>
                </div>

                <div class="button-container" style="margin-top: 0;">
                    <a href="${viewRequestsUrl}" class="button button-view">View All Requests</a>
                </div>

                <div class="info-box">
                    <p>
                        <strong>Important:</strong> Once you accept this request, ${requesterName} will be added to your team "${teamName}" with the member role. You can always change their permissions or remove them later from team settings.
                    </p>
                </div>

                <hr class="divider">

                <p class="help-text">
                    Need help managing your team? Visit our <a href="${appUrl}/help">Help Center</a> or 
                    <a href="${appUrl}/support">contact support</a> for assistance.
                </p>
            </div>

            <div class="footer">
                <p class="footer-text">Best regards,<br><strong>The Task Mate Team</strong></p>
                
                <div class="footer-links">
                    <a href="${appUrl}/help">Help Center</a>
                    <a href="${appUrl}/privacy">Privacy Policy</a>
                    <a href="${appUrl}/terms">Terms of Service</a>
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
  module.exports = generateTeamJoinRequestEmail;
}
