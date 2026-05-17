import { NextRequest, NextResponse } from "next/server";
import { isDatabaseReady, prisma } from "@/lib/db";

export const runtime = "nodejs";

// Parse User-Agent string into browser / os / device without a library dependency
function parseUA(ua: string): { browser: string; os: string; device: string } {
  if (!ua) return { browser: "Other", os: "Other", device: "desktop" };

  let device = "desktop";
  if (/bot|crawl|spider|scraper|slurp|facebookexternalhit|fetch|http|scan|bytespider|headless/i.test(ua)) {
    device = "bot";
  } else if (/mobile|android|iphone|ipod|blackberry|opera mini|iemobile|wpdesktop/i.test(ua)) {
    device = "mobile";
  } else if (/ipad|tablet|kindle|silk|playbook/i.test(ua)) {
    device = "tablet";
  }

  let os = "Other";
  if (/windows nt 10|windows nt 11/i.test(ua)) os = "Windows";
  else if (/windows/i.test(ua)) os = "Windows";
  else if (/mac os x/i.test(ua)) os = "macOS";
  else if (/android/i.test(ua)) os = "Android";
  else if (/iphone|ipad|ipod/i.test(ua)) os = "iOS";
  else if (/linux/i.test(ua)) os = "Linux";
  else if (/chromeos|cros/i.test(ua)) os = "ChromeOS";

  let browser = "Other";
  // iOS variants must be checked first — Apple forces WebKit on all iOS browsers,
  // so CriOS (Chrome iOS), FxiOS (Firefox iOS), EdgiOS (Edge iOS) all include
  // "Safari" in their UA strings and would otherwise be mis-detected.
  if (/CriOS\//i.test(ua)) browser = "Chrome";
  else if (/FxiOS\//i.test(ua)) browser = "Firefox";
  else if (/EdgiOS\//i.test(ua)) browser = "Edge";
  else if (/OPiOS\//i.test(ua)) browser = "Opera";
  else if (/edg\//i.test(ua)) browser = "Edge";
  else if (/opr\/|opera/i.test(ua)) browser = "Opera";
  else if (/chrome\/\d/i.test(ua) && !/chromium/i.test(ua)) browser = "Chrome";
  else if (/firefox\//i.test(ua)) browser = "Firefox";
  else if (/safari\//i.test(ua) && !/chrome/i.test(ua)) browser = "Safari";
  else if (/msie|trident/i.test(ua)) browser = "IE";

  return { browser, os, device };
}

function getIp(req: NextRequest): string | null {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    null
  );
}

function getCountry(req: NextRequest): string | null {
  // Netlify sets x-country, Cloudflare sets cf-ipcountry
  return req.headers.get("x-country") || req.headers.get("cf-ipcountry") || req.headers.get("x-vercel-ip-country") || null;
}

type TrackBody =
  | {
      type: "session";
      visitorId: string;
      landingPage: string;
      referrer?: string;
      utmSource?: string;
      utmMedium?: string;
      utmCampaign?: string;
      language?: string;
      screenWidth?: number;
      screenHeight?: number;
    }
  | {
      type: "pageview";
      sessionDbId: string;
      page: string;
      title?: string;
      referrer?: string;
    }
  | {
      type: "duration";
      pageViewId: string;
      duration: number;
    };

export async function POST(request: NextRequest) {
  if (!isDatabaseReady()) {
    return NextResponse.json({ ok: true, skipped: true });
  }

  let body: TrackBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  try {
    if (body.type === "session") {
      const { visitorId, landingPage, referrer, utmSource, utmMedium, utmCampaign, language, screenWidth, screenHeight } = body;
      if (!visitorId || typeof visitorId !== "string") {
        return NextResponse.json({ error: "Missing visitorId" }, { status: 400 });
      }

      const ua = request.headers.get("user-agent") || "";
      const { browser, os, device } = parseUA(ua);
      const ip = getIp(request);
      const country = getCountry(request);

      const session = await prisma.visitorSession.create({
        data: {
          visitorId: visitorId.slice(0, 64),
          ipAddress: ip,
          userAgent: ua.slice(0, 1000),
          browser,
          os,
          device,
          country,
          referrer: referrer?.slice(0, 2000) ?? null,
          landingPage: landingPage?.slice(0, 2000) ?? null,
          utmSource: utmSource?.slice(0, 200) ?? null,
          utmMedium: utmMedium?.slice(0, 200) ?? null,
          utmCampaign: utmCampaign?.slice(0, 200) ?? null,
          language: language?.slice(0, 20) ?? null,
          screenWidth: screenWidth ?? null,
          screenHeight: screenHeight ?? null,
        },
      });

      return NextResponse.json({ ok: true, sessionDbId: session.id });
    }

    if (body.type === "pageview") {
      const { sessionDbId, page, title, referrer } = body;
      if (!sessionDbId || !page) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
      }

      const [pv] = await prisma.$transaction([
        prisma.visitorPageView.create({
          data: {
            sessionId: sessionDbId,
            page: page.slice(0, 2000),
            title: title?.slice(0, 500) ?? null,
            referrer: referrer?.slice(0, 2000) ?? null,
          },
        }),
        prisma.visitorSession.update({
          where: { id: sessionDbId },
          data: { lastSeenAt: new Date() },
        }),
      ]);

      return NextResponse.json({ ok: true, pageViewId: pv.id });
    }

    if (body.type === "duration") {
      const { pageViewId, duration } = body;
      if (!pageViewId || typeof duration !== "number") {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
      }
      await prisma.visitorPageView.update({
        where: { id: pageViewId },
        data: { duration: Math.round(Math.max(0, Math.min(duration, 86400))) },
      });
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ error: "Unknown event type" }, { status: 400 });
  } catch (err: any) {
    // Silently swallow errors so a DB issue never breaks the user's page
    console.error("[track] error:", err?.message);
    return NextResponse.json({ ok: true, skipped: true });
  }
}
