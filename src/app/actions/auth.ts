"use server";

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendVerificationEmail(email: string, code: string) {
  try {
    const mailOptions = {
      from: `"Horizon Dashboard" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Doğrulama Kodunuz - Horizon Dashboard",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; border: 1px solid #f0f0f0; border-radius: 20px; background-color: #ffffff;">
          <h1 style="font-size: 24px; font-weight: 800; color: #1d1d1f; margin-bottom: 24px; text-align: center;">Doğrulama Kodu</h1>
          <p style="font-size: 16px; color: #86868b; line-height: 1.5; margin-bottom: 32px; text-align: center;">
            Horizon Dashboard'a hoş geldiniz! Hesabınızı doğrulamak için aşağıdaki 6 haneli kodu kullanın:
          </p>
          <div style="background: #f5f5f7; border-radius: 16px; padding: 32px; text-align: center; margin-bottom: 32px; border: 1px solid #e5e5e7;">
            <span style="font-size: 36px; font-weight: 800; letter-spacing: 10px; color: #007aff; font-family: monospace;">${code}</span>
          </div>
          <p style="font-size: 14px; color: #86868b; text-align: center;">
            Bu kodu kimseyle paylaşmayın. Kodun süresi 10 dakika içinde dolacaktır.
          </p>
          <div style="margin-top: 40px; padding-top: 24px; border-top: 1px solid #f0f0f0; text-align: center;">
            <p style="font-size: 12px; color: #a1a1a6;">&copy; 2024 Horizon Dashboard. Tüm hakları saklıdır.</p>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error: any) {
    console.error("Email send error:", error);
    return { success: false, error: error.message };
  }
}
