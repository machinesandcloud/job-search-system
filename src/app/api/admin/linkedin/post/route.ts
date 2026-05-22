import { NextResponse, type NextRequest } from "next/server";
import { getCoachAdminSession } from "@/lib/coach-admin-auth";
import { getValidToken, getCredentials, createPost, resolveAuthorUrn } from "@/lib/linkedin";
import { generatePostContent, getPostTypeForToday, type PostType } from "@/lib/linkedin-content";

export const runtime = "nodejs";
export const maxDuration = 60;

const BASE_URL =
  (process.env.NEXT_PUBLIC_BASE_URL ?? "").replace(/\/$/, "") || "https://app.zaricoach.com";

export async function POST(request: NextRequest) {
  const session = await getCoachAdminSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Admin access required" }, { status: 403 });
  }

  const body = await request.json().catch(() => ({})) as {
    type?: PostType;
    customText?: string;
  };

  const type: PostType = body.type ?? getPostTypeForToday();

  try {
    const [accessToken, cred] = await Promise.all([getValidToken(), getCredentials()]);
    if (!cred) return NextResponse.json({ error: "LinkedIn not connected" }, { status: 400 });

    const authorUrn = resolveAuthorUrn(cred);
    const content = await generatePostContent(type);

    // Fetch branded image from own OG endpoint
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

    console.log(`[linkedin/post] manual post created: ${postUrn}`);

    return NextResponse.json({
      ok: true,
      postUrn,
      type,
      cardHeadline: content.cardHeadline,
      postingAs: cred.organizationUrn ? "organization" : "member",
    });
  } catch (err) {
    console.error("[linkedin/post] error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Post failed" },
      { status: 500 }
    );
  }
}
