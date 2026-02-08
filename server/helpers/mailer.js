const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendVerificationEmail = async (toEmail, token) => {
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
  const verificationLink = `${baseUrl}/api/verify-email?token=${token}`;

  const mailOptions = {
    from: `"Movie App" <${process.env.SMTP_USER || 'noreply@movieapp.com'}>`,
    to: toEmail,
    subject: 'Verifikasi Email - Movie App',
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1a1a2e; border-radius: 12px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 32px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 28px;">Movie App</h1>
          <p style="color: #e0d7ff; margin-top: 8px; font-size: 14px;">Email Verification</p>
        </div>
        <div style="padding: 32px; color: #e0e0e0;">
          <h2 style="color: #ffffff; margin-top: 0;">Halo!</h2>
          <p style="line-height: 1.6;">
            Terima kasih telah mendaftar di <strong style="color: #667eea;">Movie App</strong>.
            Silakan klik tombol di bawah untuk memverifikasi alamat email Anda:
          </p>
          <div style="text-align: center; margin: 32px 0;">
            <a href="${verificationLink}"
               style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                      color: #ffffff;
                      padding: 14px 40px;
                      text-decoration: none;
                      border-radius: 8px;
                      font-weight: bold;
                      font-size: 16px;
                      display: inline-block;">
              Verifikasi Email Saya
            </a>
          </div>
          <p style="line-height: 1.6; font-size: 13px; color: #999;">
            Jika Anda tidak merasa mendaftar, abaikan email ini.
          </p>
          <hr style="border: none; border-top: 1px solid #333; margin: 24px 0;" />
          <p style="font-size: 12px; color: #666; text-align: center;">
            &copy; ${new Date().getFullYear()} Movie App. All rights reserved.
          </p>
        </div>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendVerificationEmail };
