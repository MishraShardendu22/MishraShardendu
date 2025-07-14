interface EmailTemplateProps {
  to_name: string;
  otp: number;
}

export const EmailTemplate = ({ to_name, otp }: EmailTemplateProps) => {
  return `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; background: linear-gradient(135deg, #e0f7fa, #b2ebf2); padding: 50px 20px;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-radius: 16px; box-shadow: 0 12px 40px rgba(79, 70, 229, 0.1);">
        <!-- Greeting Section -->
        <p style="font-size: 18px; color: #2e3a59; line-height: 1.7; margin-bottom: 24px; text-align: center;">
          Hello <span style="color: #4f46e5; font-weight: 700;">${to_name}</span>,
        </p>
        
        <p style="font-size: 16px; color: #4b5563; line-height: 1.8; margin-bottom: 32px; text-align: center;">
          Welcome to our platform! Use the verification code below to complete your account setup.
        </p>

        <!-- OTP Section -->
        <div style="text-align: center; margin: 40px 0; position: relative;">
          <div style="background: linear-gradient(135deg, #f5f3ff, #e0e7ff); border: 3px solid #6366f1; border-radius: 14px; padding: 30px; display: inline-block; position: relative; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);">
            <div style="font-size: 36px; font-weight: 700; color: #4f46e5; letter-spacing: 4px; font-family: 'Courier New', monospace;">
              ${otp}
            </div>
          </div>
        </div>

        <!-- Security Reminder -->
        <p style="font-size: 14px; color: #6b7280; line-height: 1.6; text-align: center; padding: 16px; background-color: #f5f3ff; border-radius: 8px; margin: 24px 0; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);">
          For your security, unverified accounts will be removed within 24 hours. Please verify your account as soon as possible to retain access.
        </p>

        <!-- Divider -->
        <div style="width: 80px; height: 2px; background: linear-gradient(to right, #6366f1, #4f46e5); margin: 40px auto;"></div>

        <!-- Disregard Note -->
        <p style="font-size: 14px; color: #6b7280; line-height: 1.6; text-align: center;">
          If you didn't request this verification, please disregard this email.
        </p>

        <!-- Footer Section -->
        <div style="margin-top: 40px; text-align: center; font-size: 12px;">
          <p style="color: #9ca3af; margin-bottom: 8px;">
            Secured by <span style="color: #6366f1;">Advanced Encryption</span>
          </p>
          <div style="color: #6b7280;">
            © ${new Date().getFullYear()} Mishra Shardendu
            <br>
            <span style="color: #9ca3af;">All rights reserved</span>
          </div>
        </div>
      </div>
    </div>
  `;
};