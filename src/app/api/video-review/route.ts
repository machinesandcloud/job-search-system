import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { prisma } from "@/lib/db";
import { sendEmail } from "@/lib/resend";

export const runtime = "nodejs";
export const maxDuration = 15;

const VIDEO_URL_RE = /^https?:\/\/.+/;

export async function POST(request: Request) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }

  const body = await request.json().catch(() => ({})) as { videoUrl?: string; comment?: string };
  const videoUrl = String(body.videoUrl || "").trim();
  const comment = String(body.comment || "").trim().slice(0, 1000);

  if (!VIDEO_URL_RE.test(videoUrl)) {
    return NextResponse.json({ error: "Please enter a valid video URL." }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { email: true, firstName: true },
  });
  if (!user) {
    return NextResponse.json({ error: "User not found." }, { status: 404 });
  }

  // Prevent duplicate submissions
  const existing = await prisma.videoReview.findFirst({
    where: { userId, status: { in: ["pending", "approved"] } },
  });
  if (existing) {
    return NextResponse.json({ error: "You've already submitted a video review. We'll be in touch!" }, { status: 409 });
  }

  await prisma.videoReview.create({
    data: { userId, email: user.email, videoUrl, comment: comment || null },
  });

  // Notify admin
  const adminEmail = process.env.COACH_ADMIN_EMAIL_ALLOWLIST?.split(",")[0]?.trim();
  if (adminEmail) {
    await sendEmail({
      to: adminEmail,
      subject: `New video review submission — ${user.email}`,
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#0F172A;max-width:520px;">
          <h2 style="font-size:18px;margin-bottom:8px;">New video review submitted</h2>
          <p><strong>User:</strong> ${user.firstName ?? ""} (${user.email})</p>
          <p><strong>Video:</strong> <a href="${videoUrl}">${videoUrl}</a></p>
          ${comment ? `<p><strong>Comment:</strong> ${comment}</p>` : ""}
          <p style="margin-top:24px;"><a href="${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/coach-admin/video-reviews" style="background:#111827;color:#fff;padding:10px 18px;border-radius:8px;text-decoration:none;display:inline-block;">Review &amp; approve →</a></p>
        </div>
      `,
    }).catch(() => null);
  }

  return NextResponse.json({ ok: true });
}
