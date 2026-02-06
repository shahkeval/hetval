const nodemailer = require('nodemailer');
const { buildValentineEmailHtml } = require('./templates/valentineEmailTemplate');
const { buildFinalFeedbackEmailHtml } = require('./templates/finalFeedbackEmailTemplate');

let transporter;

function getTransporter() {
  if (transporter) return transporter;

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  return transporter;
}

async function sendValentineDayEmail({ to, dayConfig }) {
  const transporterInstance = getTransporter();
  const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
  const ctaUrl = `${clientUrl}/day/${dayConfig.slug}`;

  const html = buildValentineEmailHtml({ dayConfig, ctaUrl });

  const info = await transporterInstance.sendMail({
    from: process.env.SENDER_EMAIL,
    to,
    subject: dayConfig.emailSubject,
    html,
  });

  console.log('Valentine day email sent:', info.messageId);
}

async function sendMessageNotificationToYou({ dayName, messageText }) {
  const transporterInstance = getTransporter();
  const html = `
    <div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; padding: 16px;">
      <h2 style="margin-bottom: 8px;">New Valentine reply received 💌</h2>
      <p><strong>Day:</strong> ${dayName}</p>
      <p><strong>Message:</strong></p>
      <pre style="white-space: pre-wrap; background:#f9f2ff; padding:12px; border-radius:8px;">${messageText}</pre>
    </div>
  `;

  const info = await transporterInstance.sendMail({
    from: process.env.SENDER_EMAIL,
    to: process.env.RECIPIENT_EMAIL,
    subject: `New ${dayName} message from her 💖`,
    html,
  });

  console.log('Message notification email sent:', info.messageId);
}

async function sendFinalFeedbackEmail({ to }) {
  const transporterInstance = getTransporter();
  const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
  const feedbackUrl = `${clientUrl}/feedback`;

  const html = buildFinalFeedbackEmailHtml({ feedbackUrl });

  const info = await transporterInstance.sendMail({
    from: process.env.SENDER_EMAIL,
    to,
    subject: 'One last thing… 💖',
    html,
  });

  console.log('Final feedback email sent:', info.messageId);
}

module.exports = {
  sendValentineDayEmail,
  sendMessageNotificationToYou,
  sendFinalFeedbackEmail,
};

