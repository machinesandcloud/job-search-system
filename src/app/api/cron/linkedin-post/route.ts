import { NextResponse, type NextRequest } from "next/server";
import { getValidToken, getCredentials, createPost, resolveAuthorUrn } from "@/lib/linkedin";
import { generatePostContent, getPostTypeForToday } from "@/lib/linkedin-content";

export const runtime = "nodejs";
export const maxDuration = 60;

const BASE_URL =
  (process.env.NEXT_PUBLIC_BASE_URL ?? "").replace(/\/$/, "") || "https://app.zaricoach.com";

export async function GET(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) {
    return NextResponse.json({ error: "CRON_SECRET not configured" }, { status: 500 });
  }
  if (request.headers.get("authorization") !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const type = getPostTypeForToday();

  try {
    const [accessToken, cred] = await Promise.all([getValidToken(), getCredentials()]);
    if (!cred) {
      console.warn("[cron/linkedin-post] LinkedIn not connected — skipping");
      return NextResponse.json({ ok: false, reason: "not_connected" });
    }

    const authorUrn = resolveAuthorUrn(cred);
    const content = await generatePostContent(type);

    // Fetch branded image
    const ogUrl = new URL(`${BASE_URL}/api/linkedin/og`);
    ogUrl.searchParams.set("type", type);
    ogUrl.searchParams.set("headline", content.cardHeadline);
    ogUrl.searchParams.set("subtext", content.cardSubtext);

    const imgRes = await fetch(ogUrl.toString());
    const imageBuffer = imgRes.ok ? Buffer.from(await imgRes.arrayBuffer()) : undefined;

    const postUrn = await createPost(accessToken, {
      authorUrn,
      text: content.postText,
      imageBuffer,
      imageTitle: content.cardHeadline,
    });

    console.log(`[cron/linkedin-post] posted type=${type} urn=${postUrn}`);

    return NextResponse.json({
      ok: true,
      type,
      postUrn,
      cardHeadline: content.cardHeadline,
    });
  } catch (err) {
    console.error("[cron/linkedin-post] error:", err);
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "unknown" },
      { status: 500 }
    );
  }
}
