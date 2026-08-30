// backend/src/utils/sendEmail.js (Ethereal version)
const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  try {
    console.log("📧 Attempting to send email to:", options.to);

    // Create Ethereal test account
    const testAccount = await nodemailer.createTestAccount();
    console.log("📧 Test account created:", testAccount.user);
    console.log("📧 Test password:", testAccount.pass);

    // Create transporter using Ethereal
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    const mailOptions = {
      from: '"Notes App" <noreply@notesapp.com>',
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2>Reset Your Password</h2>
          <p>Click this link to reset your password:</p>
          <a href="${options.text.split(' ').pop()}" style="background-color: #4CAF50; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px;">
            Reset Password
          </a>
          <p>Or copy this link: ${options.text.split(' ').pop()}</p>
          <p>This link will expire in 15 minutes.</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent!");
    console.log("📧 Preview URL:", nodemailer.getTestMessageUrl(info));
    console.log("📧 Open this URL in your browser to view the email");

    return info;

  } catch (error) {
    console.error("❌ Error sending email:", error);
    throw error;
  }
};

module.exports = sendEmail;