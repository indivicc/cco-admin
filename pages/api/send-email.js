// pages/api/send-email.js
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { type, subject, content, recipients } = req.body;

  if (!Array.isArray(recipients) || recipients.length === 0) {
    return res.status(400).json({ error: 'No recipients provided' });
  }

  try {
    // Basic email template with CCO styling
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: "Times New Roman", Times, serif;
              line-height: 1.6;
              color: #3856DD;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .logo {
              background-color: #3856DD;
              color: #FFF6F0;
              padding: 20px;
              text-align: center;
              margin-bottom: 30px;
              font-family: "Times New Roman", Times, serif;
            }
            .content {
              background-color: #FFF6F0;
              padding: 20px;
            }
            .footer {
              text-align: center;
              font-size: 12px;
              color: #3856DD;
              opacity: 0.6;
              margin-top: 30px;
            }
          </style>
        </head>
        <body>
          <div class="logo">
            <h1 style="margin:0;font-weight:normal;font-size:24px;">carbon copy originals</h1>
          </div>
          <div class="content">
            ${content}
          </div>
          <div class="footer">
            © ${new Date().getFullYear()} carbon copy originals. all rights reserved.
          </div>
        </body>
      </html>
    `;

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Carbon Copy Originals <noreply@carboncopyoriginals.com>',
      to: recipients,
      subject: subject,
      html: htmlContent,
    });

    if (error) {
      console.error('Resend API error:', error);
      return res.status(400).json({ error: error.message });
    }

    // Store email data in database if needed
    // await storeEmailRecord({ type, recipients, subject, content });

    return res.status(200).json({ 
      message: 'Email sent successfully',
      data 
    });

  } catch (error) {
    console.error('Email sending error:', error);
    return res.status(500).json({ error: 'Error sending email' });
  }
}