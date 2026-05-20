import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { suppress } from "@/lib/email-sequences";

// GET: redirect to confirmation page — do NOT suppress yet.
// Email clients (Outlook, Gmail) pre-fetch all links in an email before the user
// opens it, for malware/phishing scanning. A GET that suppresses immediately would
// unsubscribe the user before they ever clicked. Suppression only happens when the
// user explicitly confirms via the POST handler below.
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email")?.toLowerCase().trim();
  if (!email) return NextResponse.redirect(new URL("/unsubscribe?status=error", request.url));

  return NextResponse.redirect(
    new URL(`/unsubscribe?action=confirm&email=${encodeURIComponent(email)}`, request.url)
  );
}

// POST: from the unsubscribe page form
export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const email = String(body.email ?? "").toLowerCase().trim();
    if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

    await suppress(email, "unsubscribe");

    // Also mark marketingOptIn false on the user record if they exist
    await prisma.user.updateMany({
      where: { email },
      data: { marketingOptIn: false },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[unsubscribe]", err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
