const transporter = require("../config/emailConfig");

async function sendEmail({ to, subject, html, attachments }) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    html,
    attachments // optional
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error("Email send failed:", err);
    throw err;
  }
}

module.exports = sendEmail;
