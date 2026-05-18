import { NextRequest, NextResponse } from "next/server";
import { requireCoachAdminActor } from "@/lib/coach-admin-auth";
import { sendEmail, FROM_EMAIL } from "@/lib/resend";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  await requireCoachAdminActor("admin");

  const body = (await request.json().catch(() => ({}))) as { to?: string };
  const to = (body.to ?? "").toString().trim().toLowerCase();

  if (!to || !to.includes("@")) {
    return NextResponse.json({ ok: false, error: "Valid email address required" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({
      ok: false,
      error: "RESEND_API_KEY is not set in environment variables",
      from: FROM_EMAIL,
    });
  }

  const APP_URL = (process.env.URL || process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_BASE_URL || "https://app.zaricoach.com").replace(/\/$/, "");
  const LOGO_URL = `${APP_URL}/assets/zari-logo-transparent-400w.png`;
  const FONT = `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif`;

  try {
    await sendEmail({
      to,
      subject: "Zari email delivery test",
      html: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"></head>
<body style="margin:0;padding:0;background:#E8EAE2;font-family:${FONT};">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#E8EAE2;padding:40px 16px 56px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:10px;border:1px solid #D0D2CA;overflow:hidden;">
        <tr>
          <td style="padding:22px 28px 18px;vertical-align:middle;">
            <img src="${LOGO_URL}" width="100" height="46" alt="Zari" style="display:block;border:0;">
          </td>
          <td style="padding:22px 28px 18px;text-align:right;vertical-align:middle;">
            <span style="color:#818285;font-size:12px;">Delivery test</span>
          </td>
        </tr>
        <tr><td colspan="2" style="padding:0 28px;"><hr style="border:none;border-top:1px solid #EAEAEC;margin:0;"></td></tr>
        <tr><td colspan="2" style="padding:36px 40px 48px;">
          <p style="margin:0 0 12px;font-size:24px;font-weight:800;color:#1A1A1A;letter-spacing:-0.5px;line-height:1.2;">Email system working.</p>
          <p style="margin:0;font-size:15px;color:#52535A;line-height:1.7;">Resend is configured correctly. Emails are delivering from <strong>${FROM_EMAIL}</strong>.</p>
          <p style="margin:16px 0 0;font-size:12px;color:#9899A1;">Sent at ${new Date().toISOString()}</p>
        </td></tr>
        <tr><td colspan="2" style="padding:20px 28px;background:#F5F5F1;border-top:1px solid #E4E4E0;border-radius:0 0 10px 10px;">
          <p style="margin:0;font-size:12px;color:#818285;line-height:1.75;text-align:center;">Admin delivery test &nbsp;·&nbsp; <a href="${APP_URL}" style="color:#818285;text-decoration:none;">zaricoach.com</a></p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
    });

    return NextResponse.json({ ok: true, to, from: FROM_EMAIL });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok: false, error: message, from: FROM_EMAIL });
  }
}
