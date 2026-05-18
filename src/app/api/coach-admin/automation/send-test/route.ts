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

  try {
    await sendEmail({
      to,
      subject: "Zari email test — delivery check",
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px 16px;">
          <h2 style="font-size:18px;font-weight:700;color:#111;">Email system working.</h2>
          <p style="color:#555;font-size:14px;line-height:1.6;">
            If you're seeing this, Resend is configured correctly and emails are delivering.
          </p>
          <p style="color:#999;font-size:12px;margin-top:24px;">
            Sent from: ${FROM_EMAIL}<br/>
            Sent at: ${new Date().toISOString()}
          </p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true, to, from: FROM_EMAIL });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok: false, error: message, from: FROM_EMAIL });
  }
}
