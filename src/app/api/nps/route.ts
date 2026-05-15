import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { onNpsSubmitted } from "@/lib/zoho-engine";
import { getCurrentUserId } from "@/lib/mvp/auth";

// GET: score click from email (records immediately, redirects to NPS page for comment)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const score = parseInt(searchParams.get("score") ?? "", 10);
  const email = searchParams.get("email")?.toLowerCase().trim() ?? "";

  if (isNaN(score) || score < 0 || score > 10) {
    return NextResponse.redirect(new URL("/nps?status=error", request.url));
  }

  // Redirect to NPS page where they can add a comment
  const params = new URLSearchParams({ score: String(score), email, step: "comment" });
  return NextResponse.redirect(new URL(`/nps?${params}`, request.url));
}

// POST: final NPS submission (score + optional comment)
export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const score = parseInt(String(body.score ?? ""), 10);
    const comment = String(body.comment ?? "").trim().slice(0, 2000);
    const bodyEmail = String(body.email ?? "").toLowerCase().trim();

    if (isNaN(score) || score < 0 || score > 10) {
      return NextResponse.json({ error: "Invalid score" }, { status: 400 });
    }

    // Resolve email from session if not provided
    let email = bodyEmail;
    let userId: string | undefined;
    let planTier = "free";
    let firstName: string | undefined;

    if (!email) {
      userId = (await getCurrentUserId()) ?? undefined;
      if (userId) {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        email = user?.email ?? "";
        planTier = user?.planTier ?? "free";
        firstName = user?.firstName ?? undefined;
      }
    } else {
      const user = await prisma.user.findUnique({ where: { email } });
      userId = user?.id;
      planTier = user?.planTier ?? "free";
      firstName = user?.firstName ?? undefined;
    }

    if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

    // Log as an AppEvent
    await prisma.appEvent.create({
      data: {
        eventName: "nps_submitted",
        userId: userId ?? null,
        metadataJson: { score, comment, planTier },
      },
    });

    // Fire CRM/follow-up logic
    if (userId) {
      void onNpsSubmitted({ userId, email, firstName, score, comment: comment || undefined, planTier });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[nps]", err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
