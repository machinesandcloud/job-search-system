import { Resend } from "resend";
import { getBaseUrl } from "./utils";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

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
  return resend.emails.send({
    from: "Job Search System <no-reply@askia.tech>",
    to: email,
    subject,
    html,
  });
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
