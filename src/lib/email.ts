import { sendEmail } from "./resend";
import { getBaseUrl } from "./utils";

const SIGNUP_NOTIFY_RECIPIENTS = [
  "sales@askia.tech",
  "ngoumnaisteve@gmail.com",
  "steve@askia.tech",
];

export async function sendNewUserNotification(user: {
  firstName: string;
  lastName: string;
  email: string;
  userId: string;
  method: "email" | "google";
}) {
  const signedUpAt = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "America/New_York",
  }).format(new Date());

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#0F172A;max-width:520px;margin:0 auto;">
      <h2 style="font-size:18px;font-weight:800;margin-bottom:4px;">New Zari signup 🎉</h2>
      <p style="color:#64748B;margin:0 0 20px;font-size:14px;">${signedUpAt}</p>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr style="background:#F8FAFC;">
          <td style="padding:10px 14px;font-weight:600;color:#374151;width:140px;border:1px solid #E2E8F0;">Name</td>
          <td style="padding:10px 14px;border:1px solid #E2E8F0;">${user.firstName} ${user.lastName}</td>
        </tr>
        <tr>
          <td style="padding:10px 14px;font-weight:600;color:#374151;border:1px solid #E2E8F0;">Email</td>
          <td style="padding:10px 14px;border:1px solid #E2E8F0;"><a href="mailto:${user.email}" style="color:#2563EB;">${user.email}</a></td>
        </tr>
        <tr style="background:#F8FAFC;">
          <td style="padding:10px 14px;font-weight:600;color:#374151;border:1px solid #E2E8F0;">Method</td>
          <td style="padding:10px 14px;border:1px solid #E2E8F0;">${user.method === "google" ? "Google OAuth" : "Email / Password"}</td>
        </tr>
        <tr>
          <td style="padding:10px 14px;font-weight:600;color:#374151;border:1px solid #E2E8F0;">User ID</td>
          <td style="padding:10px 14px;font-size:12px;color:#64748B;border:1px solid #E2E8F0;">${user.userId}</td>
        </tr>
      </table>
    </div>
  `;

  await sendEmail({
    to: SIGNUP_NOTIFY_RECIPIENTS,
    subject: `New signup: ${user.firstName} ${user.lastName} (${user.email})`,
    html,
  }).catch((err: unknown) => console.error("[new-user-notify] failed", err));
}

export async function sendSupportTicketNotification(ticket: {
  ticketId: string;
  subject: string;
  description: string;
  category: string;
  userFirstName: string;
  userLastName: string;
  userEmail: string;
}) {
  const submittedAt = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "America/New_York",
  }).format(new Date());

  const categoryLabel = ticket.category.charAt(0).toUpperCase() + ticket.category.slice(1);
  const preview = ticket.description.length > 300
    ? ticket.description.slice(0, 300) + "…"
    : ticket.description;

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#0F172A;max-width:560px;margin:0 auto;">
      <h2 style="font-size:18px;font-weight:800;margin-bottom:4px;">New support ticket 🎫</h2>
      <p style="color:#64748B;margin:0 0 20px;font-size:14px;">${submittedAt}</p>
      <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:20px;">
        <tr style="background:#F8FAFC;">
          <td style="padding:10px 14px;font-weight:600;color:#374151;width:140px;border:1px solid #E2E8F0;">Ticket ID</td>
          <td style="padding:10px 14px;font-size:12px;color:#64748B;border:1px solid #E2E8F0;">${ticket.ticketId}</td>
        </tr>
        <tr>
          <td style="padding:10px 14px;font-weight:600;color:#374151;border:1px solid #E2E8F0;">From</td>
          <td style="padding:10px 14px;border:1px solid #E2E8F0;">${ticket.userFirstName} ${ticket.userLastName} &lt;<a href="mailto:${ticket.userEmail}" style="color:#2563EB;">${ticket.userEmail}</a>&gt;</td>
        </tr>
        <tr style="background:#F8FAFC;">
          <td style="padding:10px 14px;font-weight:600;color:#374151;border:1px solid #E2E8F0;">Category</td>
          <td style="padding:10px 14px;border:1px solid #E2E8F0;">${categoryLabel}</td>
        </tr>
        <tr>
          <td style="padding:10px 14px;font-weight:600;color:#374151;border:1px solid #E2E8F0;">Subject</td>
          <td style="padding:10px 14px;border:1px solid #E2E8F0;">${ticket.subject}</td>
        </tr>
      </table>
      <div style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:8px;padding:16px 18px;">
        <div style="font-size:12px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:#94A3B8;margin-bottom:8px;">Description</div>
        <p style="font-size:14px;color:#334155;margin:0;white-space:pre-wrap;">${preview}</p>
      </div>
    </div>
  `;

  await sendEmail({
    to: SIGNUP_NOTIFY_RECIPIENTS,
    subject: `[Support] ${ticket.subject} — ${ticket.userFirstName} ${ticket.userLastName}`,
    html,
  }).catch((err: unknown) => console.error("[support-ticket-notify] failed", err));
}

export async function sendResultsEmail(email: string, token: string, hasPro: boolean) {
  if (!process.env.RESEND_API_KEY) return { skipped: true, reason: "RESEND_API_KEY missing" } as const;
  const url = `${getBaseUrl()}/job-search-system/results/${token}`;
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
    await sendEmail({ to: email, subject: "Your Zari plan is ready", html });
    return { ok: true } as const;
  } catch (err: unknown) {
    return { ok: false, error: (err as Error)?.message || "Email send failed" } as const;
  }
}

export async function sendPasswordResetEmail(email: string, token: string) {
  if (!process.env.RESEND_API_KEY) return { skipped: true, reason: "RESEND_API_KEY missing" } as const;
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
    await sendEmail({ to: email, subject: "Reset your Zari password", html });
    return { ok: true } as const;
  } catch (err: unknown) {
    return { ok: false, error: (err as Error)?.message || "Email send failed" } as const;
  }
}

export async function sendAdminMagicLink(email: string, token: string) {
  if (!process.env.RESEND_API_KEY) return { skipped: true } as const;
  const url = `${getBaseUrl()}/admin/verify?token=${token}`;
  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.5;color:#0b1220;">
      <h2>Admin access link</h2>
      <p>Use this link to access the admin dashboard. It expires in 15 minutes.</p>
      <p><a href="${url}" style="background:#111827;color:#fff;padding:12px 18px;border-radius:999px;text-decoration:none;display:inline-block;">Open admin</a></p>
    </div>
  `;
  try {
    await sendEmail({ to: email, subject: "Admin login link", html });
    return { ok: true } as const;
  } catch (err: unknown) {
    return { ok: false, error: (err as Error)?.message || "Email send failed" } as const;
  }
}
