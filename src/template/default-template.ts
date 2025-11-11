// src/template/default-templates.ts

const emailWrapper = (subject: string, body: string) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${subject}</title>
    <style>
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        margin: 0;
        padding: 0;
      }
      .container {
        width: 90%;
        max-width: 600px;
        margin: 20px auto;
        border: 1px solid #ddd;
        border-radius: 8px;
        overflow: hidden;
      }
      .header {
        background-color: #004a99; /* Corporate Blue */
        color: #ffffff;
        padding: 20px;
        text-align: center;
      }
      .content {
        padding: 30px;
      }
      .content p {
        margin-bottom: 20px;
      }
      .footer {
        background-color: #f9f9f9;
        color: #777;
        padding: 20px;
        text-align: center;
        font-size: 12px;
      }
      .button {
        display: inline-block;
        padding: 12px 20px;
        margin: 10px 0;
        background-color: #004a99;
        color: #ffffff;
        text-decoration: none;
        border-radius: 5px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Internal Notification</h1>
      </div>
      <div class="content">
        ${body}
      </div>
      <div class="footer">
        <p>&copy; ${new Date().getFullYear()} Your Company Inc. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>
`;

export const DEFAULT_TEMPLATES = [
  // --- Template 1: Internal Policy Update (Email) ---
  {
    template_name: 'internal-policy-email',
    channel_type: 'email',
    template_subject: 'Important Update: New {{policy_name}} Policy',
    template_content: emailWrapper(
      'New {{policy_name}} Policy',
      `
      <p>Hello {{user_name}},</p>
      <p>This is to inform you that the company has issued a new policy regarding <strong>{{policy_name}}</strong>, effective immediately.</p>
      <p>Please review the full document to ensure you are familiar with the new guidelines.</p>
      <a href="{{document_link}}" class="button">View Policy Document</a>
      <p>Thank you,<br>HR Department</p>
      `,
    ),
    template_variables: ['user_name', 'policy_name', 'document_link'],
    template_language: 'en',
    template_version: 1,
    is_active: true,
  },

  // --- Template 2: Resignation Acknowledgment (Email to Manager) ---
  {
    template_name: 'resignation-ack-email',
    channel_type: 'email',
    template_subject:
      'Action Required: Resignation Submitted by {{employee_name}}',
    template_content: emailWrapper(
      'Resignation Submitted',
      `
      <p>Hello {{manager_name}},</p>
      <p>This is an automated notification to inform you that <strong>{{employee_name}}</strong> (Employee ID: {{employee_id}}) has submitted their resignation, effective <strong>{{last_day}}</strong>.</p>
      <p>Please log in to the HR Portal to begin the off-boarding process.</p>
      <a href="{{portal_link}}" class="button">Go to HR Portal</a>
      <p>Thank you,<br>System Administrator</p>
      `,
    ),
    template_variables: [
      'manager_name',
      'employee_name',
      'employee_id',
      'last_day',
      'portal_link',
    ],
    template_language: 'en',
    template_version: 1,
    is_active: true,
  },

  // --- Template 3: "Check Your Email" Alert (Push) ---
  {
    template_name: 'new-email-alert-push',
    channel_type: 'push',
    template_subject: 'New Company-Wide Email', // This is the Push Notification Title
    template_content:
      'Please check your inbox for an important update regarding "{{subject}}".', // This is the Push body
    template_variables: ['subject'],
    template_language: 'en',
    template_version: 1,
    is_active: true,
  },

  // --- Template 4: Leave Request Approved (Push) ---
  {
    template_name: 'leave-request-approved-push',
    channel_type: 'push',
    template_subject: 'Time-Off Request Approved',
    template_content:
      'Your leave request for {{start_date}} to {{end_date}} has been approved by your manager.',
    template_variables: ['start_date', 'end_date'],
    template_language: 'en',
    template_version: 1,
    is_active: true,
  },
];
