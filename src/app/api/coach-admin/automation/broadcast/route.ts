import { NextRequest, NextResponse } from "next/server";
import { requireCoachAdminActor } from "@/lib/coach-admin-auth";
import { prisma } from "@/lib/db";
import { sendEmail } from "@/lib/resend";

export const runtime = "nodejs";
export const maxDuration = 300;

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://app.zaricoach.com";

function buildHtml(subject: string, body: string, firstName: string, email: string) {
  const unsubUrl = `${APP_URL}/api/email/unsubscribe?email=${encodeURIComponent(email)}`;
  const safeBody = body
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\n\n/g, "</p><p>")
    .replace(/\n/g, "<br/>");

  const greeting = firstName ? `Hi ${firstName},` : "Hi there,";

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${subject}</title></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;padding:40px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;border:1px solid #e5e7eb;overflow:hidden;max-width:100%;">
        <!-- Header -->
        <tr><td style="background:linear-gradient(135deg,#3B82F6,#2563EB);padding:24px 32px;">
          <span style="font-size:20px;font-weight:800;color:#ffffff;letter-spacing:-0.04em;">Zari</span>
        </td></tr>
        <!-- Body -->
        <tr><td style="padding:32px;">
          <p style="margin:0 0 16px;font-size:15px;color:#111827;line-height:1.6;">${greeting}</p>
          <p style="margin:0 0 16px;font-size:15px;color:#374151;line-height:1.7;">${safeBody}</p>
          <p style="margin:24px 0 0;font-size:14px;color:#6b7280;line-height:1.6;">— The Zari Team</p>
        </td></tr>
        <!-- Footer -->
        <tr><td style="padding:16px 32px 24px;border-top:1px solid #f3f4f6;">
          <p style="margin:0;font-size:11px;color:#9ca3af;line-height:1.6;">
            You're receiving this because you have a Zari account.
            <a href="${unsubUrl}" style="color:#9ca3af;">Unsubscribe</a>
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function POST(request: NextRequest) {
  await requireCoachAdminActor("admin");

  const body = (await request.json().catch(() => ({}))) as {
    subject?: string;
    message?: string;
    testOnly?: boolean;  // if true, only send to the logged-in admin email
  };

  const { subject, message, testOnly = false } = body;

  if (!subject || typeof subject !== "string" || subject.trim().length < 1) {
    return NextResponse.json({ error: "subject is required" }, { status: 400 });
  }
  if (!message || typeof message !== "string" || message.trim().length < 1) {
    return NextResponse.json({ error: "message body is required" }, { status: 400 });
  }

  const suppressionRows = await prisma.emailSuppression.findMany({ select: { email: true } });
  const suppressedSet = new Set(suppressionRows.map((r: { email: string }) => r.email));

  const users = testOnly
    ? await prisma.user.findMany({
        where: { role: "member", email: { not: { contains: "@coach-admin" } } },
        select: { email: true, firstName: true },
        take: 1,
        orderBy: { createdAt: "desc" },
      })
    : await prisma.user.findMany({
        where: { role: "member", email: { not: { contains: "@coach-admin" } } },
        select: { email: true, firstName: true },
      });

  let sent = 0;
  let skipped = 0;
  let errors = 0;

  for (const user of users) {
    if (suppressedSet.has(user.email)) { skipped++; continue; }
    try {
      const html = buildHtml(subject.trim(), message.trim(), user.firstName ?? "", user.email);
      await sendEmail({ to: user.email, subject: subject.trim(), html });
      await prisma.appEvent.create({
        data: {
          eventName: "email_sent",
          metadataJson: { email: user.email, subject: subject.trim(), type: "broadcast" },
        },
      }).catch(() => {});
      sent++;
    } catch (err) {
      console.error(`[broadcast] failed for ${user.email}:`, err);
      errors++;
    }
  }

  return NextResponse.json({ ok: true, sent, skipped, errors, total: users.length });
}
