import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendInviteEmail = async (to, inviteUrl, teamName) => {
  try {
    const data = await resend.emails.send({
      from: "TaskWise <onboarding@taskwise.dexterr404.dev>",
      to,
      subject: `You’ve been invited to join ${teamName}!`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
            <!-- Header -->
            <div style="background: #4f46e5; color: white; padding: 16px; text-align: center;">
            <h1 style="margin: 0; font-size: 20px;">TaskWise</h1>
            </div>

            <!-- Body -->
            <div style="padding: 24px;">
            <h2 style="margin-top: 0; color: #111;">Hello 👋</h2>
            <p style="font-size: 15px; line-height: 1.6;">
                You’ve been invited to join <strong>${teamName}</strong> on <b>TaskWise</b>.
            </p>
            <p style="font-size: 15px; line-height: 1.6;">
                Click the button below to accept your invite:
            </p>

            <!-- Button -->
            <p style="text-align: center; margin: 30px 0;">
                <a href="${inviteUrl}" 
                style="background: #4f46e5; color: white; padding: 12px 24px; 
                        border-radius: 6px; text-decoration: none; font-weight: bold; 
                        display: inline-block; box-shadow: 0 2px 6px rgba(0,0,0,0.15);">
                Accept Invite
                </a>
            </p>

            <!-- Backup link -->
            <p style="font-size: 13px; color: #555; margin-top: 20px;">
                If the button doesn’t work, copy and paste this link into your browser:
            </p>
            <p style="font-size: 13px; word-break: break-all; color: #4f46e5;">
                ${inviteUrl}
            </p>
            </div>

            <!-- Footer -->
            <div style="background: #f9fafb; padding: 12px; text-align: center; font-size: 12px; color: #6b7280;">
            © ${new Date().getFullYear()} TaskWise. All rights reserved.
            </div>
        </div>
      `,
    });
    return data;
  } catch (error) {
    console.error("Email send error:", error);
    throw new Error("Failed to send invite email");
  }
};
