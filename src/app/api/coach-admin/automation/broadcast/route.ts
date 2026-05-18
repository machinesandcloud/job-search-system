import { NextRequest, NextResponse } from "next/server";
import { requireCoachAdminActor } from "@/lib/coach-admin-auth";
import { prisma } from "@/lib/db";
import { sendEmail } from "@/lib/resend";

export const runtime = "nodejs";
export const maxDuration = 300;

const APP_URL = (process.env.URL || process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_BASE_URL || "https://app.zaricoach.com").replace(/\/$/, "");
const STEVE_URL = `${APP_URL}/assets/steve-photo.jpg`;
const FONT = `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif`;

function buildHtml(subject: string, body: string, firstName: string, email: string) {
  const unsubUrl = `${APP_URL}/api/email/unsubscribe?email=${encodeURIComponent(email)}`;
  const safeBody = body
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\n\n/g, `</p><p style="margin:0 0 16px;font-size:15px;color:#1a1a1a;line-height:1.7;font-family:${FONT};">`)
    .replace(/\n/g, "<br/>");

  const greeting = firstName ? `Hi ${firstName},` : "Hi there,";

  // Plain personal-email layout — no card, no background, no logo header.
  // Keeps emails out of Gmail Promotions tab.
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${subject}</title>
</head>
<body style="margin:0;padding:0;background:#ffffff;font-family:${FONT};-webkit-font-smoothing:antialiased;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr><td style="padding:40px 24px 48px;max-width:560px;">

      <p style="margin:0 0 16px;font-size:15px;color:#1a1a1a;line-height:1.7;">${greeting}</p>
      <p style="margin:0 0 24px;font-size:15px;color:#1a1a1a;line-height:1.7;">${safeBody}</p>

      <!-- Signature -->
      <p style="margin:0 0 4px;font-size:15px;color:#555;line-height:1.6;">Best,</p>
      <p style="margin:0 0 2px;font-family:'Georgia',serif;font-size:28px;font-weight:400;color:#1a1a1a;font-style:italic;line-height:1.3;">Steve</p>
      <p style="margin:0 0 14px;font-size:13px;color:#888;line-height:1.5;">Founder, Zari</p>
      <img src="${STEVE_URL}" width="52" height="52" alt="Steve" style="display:block;border-radius:50%;border:0;margin-bottom:32px;">

      <!-- Minimal footer -->
      <p style="margin:0;font-size:11px;color:#aaa;line-height:1.7;border-top:1px solid #eee;padding-top:16px;">
        <a href="${unsubUrl}" style="color:#aaa;text-decoration:underline;">Unsubscribe</a>
        &nbsp;&middot;&nbsp;Zari &middot; zaricoach.com
      </p>

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
    testOnly?: boolean;
    testEmail?: string;
  };

  const { subject, message, testOnly = false, testEmail } = body;

  if (!subject || typeof subject !== "string" || subject.trim().length < 1) {
    return NextResponse.json({ error: "subject is required" }, { status: 400 });
  }
  if (!message || typeof message !== "string" || message.trim().length < 1) {
    return NextResponse.json({ error: "message body is required" }, { status: 400 });
  }

  const suppressionRows = await prisma.emailSuppression.findMany({ select: { email: true } });
  const suppressedSet = new Set(suppressionRows.map((r: { email: string }) => r.email));

  let users: { email: string; firstName: string | null }[];

  if (testOnly && testEmail && typeof testEmail === "string" && testEmail.includes("@")) {
    // Send to the specific test address provided
    users = [{ email: testEmail.trim().toLowerCase(), firstName: null }];
  } else if (testOnly) {
    // Fall back to most recent member
    users = await prisma.user.findMany({
      where: { role: "member", email: { not: { contains: "@coach-admin" } } },
      select: { email: true, firstName: true },
      take: 1,
      orderBy: { createdAt: "desc" },
    });
  } else {
    users = await prisma.user.findMany({
      where: { role: "member", email: { not: { contains: "@coach-admin" } } },
      select: { email: true, firstName: true },
    });
  }

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
