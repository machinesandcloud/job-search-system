import { Resend } from "resend";
import { getBaseUrl } from "./utils";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const fromAddress = process.env.RESEND_FROM || "onboarding@resend.dev";

export async function sendResultsEmail(email: string, token: string, hasPro: boolean) {
  if (!resend) return { skipped: true, reason: "RESEND_API_KEY missing" } as const;
  const url = `${getBaseUrl()}/job-search-system/results/${token}`;
  const subject = "Your Job Search System is ready";
  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.5;color:#0b1220;">
      <h2>Your Job Search System is ready</h2>
      <p>Here is your personalized plan. The link stays active for 30 days.</p>
      <p><a href="${url}" style="background:#111827;color:#fff;padding:12px 18px;border-radius:999px;text-decoration:none;display:inline-block;">View your plan</a></p>
      ${
        hasPro
          ? ""
          : "<p style=\"margin-top:18px;\"><strong>PS:</strong> Upgrade to the Pro Pack to unlock your shortlist, script pack, and interview route.</p>"
      }
    </div>
  `;
  try {
    const result = await resend.emails.send({
      from: `Job Search System <${fromAddress}>`,
      to: email,
      subject,
      html,
    });
    if ("error" in result && result.error) {
      return { ok: false, error: result.error.message || "Resend error" } as const;
    }
    return { ok: true } as const;
  } catch (err: any) {
    return { ok: false, error: err?.message || "Email send failed" } as const;
  }
}

export async function sendPasswordResetEmail(email: string, token: string) {
  if (!resend) return { skipped: true, reason: "RESEND_API_KEY missing" } as const;
  const url = `${getBaseUrl()}/reset-password?token=${encodeURIComponent(token)}`;
  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#0F172A;max-width:480px;margin:0 auto;">
      <h2 style="font-size:20px;font-weight:800;margin-bottom:8px;">Reset your password</h2>
      <p style="color:#475569;margin-bottom:24px;">We received a request to reset the password for your Zari account. Click the button below to set a new password. This link expires in 1 hour.</p>
      <p><a href="${url}" style="background:#2563EB;color:#fff;padding:12px 24px;border-radius:10px;text-decoration:none;display:inline-block;font-weight:700;font-size:14px;">Reset my password →</a></p>
      <p style="margin-top:24px;font-size:13px;color:#94A3B8;">If you didn't request this, you can safely ignore this email. Your password will not change.</p>
    </div>
  `;
  try {
    const result = await resend.emails.send({
      from: `Zari <${fromAddress}>`,
      to: email,
      subject: "Reset your Zari password",
      html,
    });
    if ("error" in result && result.error) {
      return { ok: false, error: result.error.message || "Resend error" } as const;
    }
    return { ok: true } as const;
  } catch (err: unknown) {
    return { ok: false, error: (err as Error)?.message || "Email send failed" } as const;
  }
}

export async function sendAdminMagicLink(email: string, token: string) {
  if (!resend) return { skipped: true } as const;
  const url = `${getBaseUrl()}/admin/verify?token=${token}`;
  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.5;color:#0b1220;">
      <h2>Admin access link</h2>
      <p>Use this link to access the admin dashboard. It expires in 15 minutes.</p>
      <p><a href="${url}" style="background:#111827;color:#fff;padding:12px 18px;border-radius:999px;text-decoration:none;display:inline-block;">Open admin</a></p>
    </div>
  `;
  return resend.emails.send({
    from: "Askia Admin <no-reply@askia.tech>",
    to: email,
    subject: "Admin login link",
    html,
  });
}
