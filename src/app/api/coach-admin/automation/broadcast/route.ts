import { NextRequest, NextResponse } from "next/server";
import { requireCoachAdminActor } from "@/lib/coach-admin-auth";
import { prisma } from "@/lib/db";
import { sendEmail } from "@/lib/resend";

export const runtime = "nodejs";
export const maxDuration = 300;

const APP_URL = (process.env.URL || process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_BASE_URL || "https://app.zaricoach.com").replace(/\/$/, "");
const LOGO_URL = `${APP_URL}/assets/zari-logo-transparent-400w.png`;
const STEVE_URL = `${APP_URL}/assets/steve-photo.jpg`;
const FONT = `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif`;

function getMonthYear() {
  return new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

function buildHtml(subject: string, body: string, firstName: string, email: string) {
  const unsubUrl = `${APP_URL}/api/email/unsubscribe?email=${encodeURIComponent(email)}`;
  const safeBody = body
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\n\n/g, `</p><p style="margin:0 0 16px;font-size:15px;color:#52535A;line-height:1.7;font-family:${FONT};">`)
    .replace(/\n/g, "<br/>");

  const greeting = firstName ? `Hi ${firstName},` : "Hi there,";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="color-scheme" content="light">
  <title>${subject}</title>
</head>
<body style="margin:0;padding:0;background:#E8EAE2;font-family:${FONT};-webkit-font-smoothing:antialiased;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#E8EAE2;padding:40px 16px 56px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:10px;border:1px solid #D0D2CA;overflow:hidden;">

        <!-- Header: logo + date -->
        <tr>
          <td style="padding:22px 28px 18px;vertical-align:middle;">
            <img src="${LOGO_URL}" width="100" height="46" alt="Zari" style="display:block;border:0;">
          </td>
          <td style="padding:22px 28px 18px;text-align:right;vertical-align:middle;">
            <span style="font-family:${FONT};color:#818285;font-size:12px;line-height:1;">${getMonthYear()}</span>
          </td>
        </tr>

        <!-- Divider -->
        <tr><td colspan="2" style="padding:0 28px;">
          <hr style="border:none;border-top:1px solid #EAEAEC;margin:0;">
        </td></tr>

        <!-- Body -->
        <tr><td colspan="2" style="padding:36px 40px 48px;">
          <p style="margin:0 0 16px;font-family:${FONT};font-size:15px;color:#52535A;line-height:1.7;">${greeting}</p>
          <p style="margin:0 0 16px;font-family:${FONT};font-size:15px;color:#52535A;line-height:1.7;">${safeBody}</p>

          <!-- Signature -->
          <table cellpadding="0" cellspacing="0" style="margin-top:32px;width:100%;">
            <tr><td>
              <hr style="border:none;border-top:1px solid #E4E6EA;margin:0 0 22px;">
            </td></tr>
            <tr><td>
              <p style="margin:0 0 10px;font-family:${FONT};font-size:15px;color:#52535A;line-height:1.5;">Best,</p>
            </td></tr>
            <tr><td>
              <p style="margin:0 0 3px;font-family:'Great Vibes',cursive;font-size:38px;font-weight:400;color:#1A1A1A;line-height:1.2;letter-spacing:0.5px;">Steve</p>
            </td></tr>
            <tr><td>
              <p style="margin:0 0 14px;font-family:${FONT};font-size:13px;color:#818285;line-height:1.5;">Founder, Zari</p>
            </td></tr>
            <tr><td>
              <img src="${STEVE_URL}" width="56" height="56" alt="Steve" style="display:block;border-radius:50%;border:0;">
            </td></tr>
          </table>
        </td></tr>

        <!-- Footer -->
        <tr><td colspan="2" style="padding:20px 28px;background:#F5F5F1;border-top:1px solid #E4E4E0;border-radius:0 0 10px 10px;">
          <p style="margin:0;font-family:${FONT};font-size:12px;color:#818285;line-height:1.75;text-align:center;">
            <a href="${unsubUrl}" style="color:#818285;text-decoration:underline;">Unsubscribe</a>
            &nbsp;·&nbsp;You received this because you have a Zari account.<br>
            &copy; ${new Date().getFullYear()} Zari, Inc.&nbsp;·&nbsp;<a href="${APP_URL}" style="color:#818285;text-decoration:none;">zaricoach.com</a>
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
