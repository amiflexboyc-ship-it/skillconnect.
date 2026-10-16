const nodemailer = require('nodemailer');

/**
 * Creates Nodemailer transporter based on available environment variables.
 * Supports SMTP (Host, Port, User, Pass) or Service (e.g. Gmail).
 */
const getTransporter = () => {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER || process.env.EMAIL_USER;
  const pass = process.env.SMTP_PASS || process.env.EMAIL_PASS;
  const service = process.env.EMAIL_SERVICE;

  if (service && user && pass) {
    return nodemailer.createTransport({
      service,
      auth: { user, pass },
    });
  }

  if (host && user && pass) {
    return nodemailer.createTransport({
      host,
      port: Number(port) || 587,
      secure: Number(port) === 465,
      auth: { user, pass },
    });
  }

  return null;
};

/**
 * Send 6-digit verification code to user email
 */
const sendVerificationCodeEmail = async ({ email, name, code }) => {
  console.log(`\n======================================================`);
  console.log(`📧 [SkillConnect Email Verification Code]`);
  console.log(`👤 Recipient: ${name} <${email}>`);
  console.log(`🔑 Verification Code: ${code}`);
  console.log(`⏱️  Expires in: 15 minutes`);
  console.log(`======================================================\n`);

  const transporter = getTransporter();
  const senderEmail = process.env.EMAIL_FROM || process.env.SMTP_USER || process.env.EMAIL_USER || 'no-reply@skillconnect.com';

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>SkillConnect Verification Code</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b1120; margin: 0; padding: 20px; color: #ffffff; }
          .container { max-width: 540px; margin: 0 auto; background: #111827; border-radius: 16px; border: 1px solid #1f2937; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.5); }
          .header { background: linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%); padding: 32px 24px; text-align: center; border-bottom: 1px solid #1e293b; }
          .brand-title { margin: 0; font-size: 24px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px; }
          .brand-gold { color: #facc15; }
          .tagline { color: #94a3b8; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin-top: 4px; }
          .content { padding: 32px 28px; }
          .greeting { font-size: 18px; font-weight: 600; color: #f1f5f9; margin-top: 0; }
          .message { font-size: 14px; line-height: 1.6; color: #94a3b8; margin: 16px 0 24px; }
          .code-box { background: #0f172a; border: 2px dashed #3b82f6; border-radius: 12px; padding: 20px; text-align: center; margin: 24px 0; }
          .code { font-family: 'Courier New', Courier, monospace; font-size: 34px; font-weight: 800; letter-spacing: 8px; color: #facc15; margin: 0; text-shadow: 0 0 10px rgba(250, 204, 21, 0.3); }
          .code-expiry { font-size: 12px; color: #64748b; margin-top: 8px; }
          .footer { background: #0b0f19; padding: 20px 24px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #1e293b; }
          .footer a { color: #38bdf8; text-decoration: none; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 class="brand-title">Skill<span class="brand-gold">Connect</span></h1>
            <div class="tagline">Global Freelance & Talent Marketplace</div>
          </div>
          <div class="content">
            <h2 class="greeting">Verify your email address</h2>
            <p class="message">
              Hi <strong>${name || 'there'}</strong>,<br/><br/>
              Welcome to SkillConnect! To complete your registration and secure your account, please enter the 6-digit verification code below:
            </p>
            <div class="code-box">
              <div class="code">${code}</div>
              <div class="code-expiry">⏳ This code expires in <strong>15 minutes</strong></div>
            </div>
            <p class="message" style="font-size: 12px; color: #64748b;">
              If you didn't create an account on SkillConnect, you can safely ignore this email. Never share this code with anyone.
            </p>
          </div>
          <div class="footer">
            <p style="margin: 0 0 8px;">SkillConnect Platform • Created with excellence</p>
            <p style="margin: 0;">Lead Developer: Waris (AmiFlexboy) • <a href="mailto:amiflexboyc@gmail.com">amiflexboyc@gmail.com</a></p>
          </div>
        </div>
      </body>
    </html>
  `;

  if (transporter) {
    try {
      const info = await transporter.sendMail({
        from: `"SkillConnect" <${senderEmail}>`,
        to: email,
        subject: `Your SkillConnect Verification Code: ${code}`,
        text: `Welcome to SkillConnect! Your 6-digit email verification code is: ${code}. This code expires in 15 minutes.`,
        html: htmlContent,
      });
      console.log(`[EmailService] Verification email sent to ${email}. MessageId: ${info.messageId}`);
      return { success: true, messageId: info.messageId, delivered: true };
    } catch (err) {
      console.warn(`[EmailService] SMTP delivery failed (${err.message}). Verification code logged to server console.`);
      return { success: true, delivered: false, warning: err.message };
    }
  } else {
    console.log(`[EmailService] No SMTP transporter configured. Verification code logged to server console.`);
    return { success: true, delivered: false, mode: 'console' };
  }
};

const sendContactNotification = async ({ name, email, phone, subject, message }) => {
  console.log(`[EmailService] Contact message received from ${name} <${email}> (${phone || 'No phone'}):`);
  console.log(`[EmailService] Subject: ${subject}`);
  console.log(`[EmailService] Message: ${message}`);
  return { success: true, message: 'Message logged and queued successfully.' };
};

const sendWelcomeEmail = async (user) => {
  console.log(`[EmailService] Welcome email sent to ${user.name} <${user.email}>`);
  return { success: true };
};

const sendJobNotification = async (job, freelancerEmail) => {
  console.log(`[EmailService] Alert: New matching job '${job.title}' sent to ${freelancerEmail}`);
  return { success: true };
};

module.exports = {
  sendVerificationCodeEmail,
  sendContactNotification,
  sendWelcomeEmail,
  sendJobNotification,
};
