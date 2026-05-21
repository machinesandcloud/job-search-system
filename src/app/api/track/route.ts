import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { isDatabaseReady, prisma } from "@/lib/db";

export const runtime = "nodejs";

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
  // iOS variants first — Apple forces WebKit so CriOS/FxiOS/EdgiOS include "Safari" in UA
  if      (/CriOS\//i.test(ua))                                  browser = "Chrome";
  else if (/FxiOS\//i.test(ua))                                  browser = "Firefox";
  else if (/EdgiOS\//i.test(ua))                                 browser = "Edge";
  else if (/OPiOS\//i.test(ua))                                  browser = "Opera";
  else if (/edg\//i.test(ua))                                    browser = "Edge";
  else if (/opr\/|opera/i.test(ua))                              browser = "Opera";
  else if (/chrome\/\d/i.test(ua) && !/chromium/i.test(ua))     browser = "Chrome";
  else if (/firefox\//i.test(ua))                                browser = "Firefox";
  else if (/safari\//i.test(ua) && !/chrome/i.test(ua))         browser = "Safari";
  else if (/msie|trident/i.test(ua))                             browser = "IE";

  return { browser, os, device };
}

function getIp(req: NextRequest): string | null {
  return (
    req.headers.get("x-nf-client-connection-ip") ||
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    null
  );
}

function getGeo(req: NextRequest) {
  // Netlify provides x-nf-geo as a JSON blob with richer data than individual headers.
  // Format: {"country":{"code":"US","name":"United States"},"city":"New York","subdivision":{"code":"NY","name":"New York"},"timezone":"America/New_York","latitude":40.71,"longitude":-74.00}
  const nfGeo = req.headers.get("x-nf-geo");
  if (nfGeo) {
    try {
      const g = JSON.parse(nfGeo) as {
        country?:     { code?: string; name?: string };
        city?:        string;
        subdivision?: { code?: string; name?: string };
        timezone?:    string;
      };
      return {
        country:  g.country?.code   || req.headers.get("x-country")  || req.headers.get("cf-ipcountry") || null,
        city:     g.city            || req.headers.get("x-city")     || null,
        region:   g.subdivision?.code || g.subdivision?.name || req.headers.get("x-region") || null,
        timezone: g.timezone        || req.headers.get("x-timezone") || null,
      };
    } catch { /* fall through to individual headers */ }
  }
  return {
    country:  req.headers.get("x-country")  || req.headers.get("cf-ipcountry") || req.headers.get("x-vercel-ip-country") || null,
    city:     req.headers.get("x-city")     || req.headers.get("x-vercel-ip-city") || null,
    region:   req.headers.get("x-region")   || req.headers.get("x-vercel-ip-country-region") || null,
    timezone: req.headers.get("x-timezone") || req.headers.get("x-vercel-ip-timezone") || null,
  };
}

export async function POST(request: NextRequest) {
  if (!isDatabaseReady()) {
    return NextResponse.json({ ok: true, skipped: true });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  try {
    const type = body.type as string;

    // ── Session creation ──────────────────────────────────────────────────────
    if (type === "session") {
      const visitorId = body.visitorId as string;
      if (!visitorId) return NextResponse.json({ error: "Missing visitorId" }, { status: 400 });

      const ua = request.headers.get("user-agent") || "";
      const { browser, os, device } = parseUA(ua);
      const ip  = getIp(request);
      const geo = getGeo(request);

      const session = await prisma.visitorSession.create({
        data: {
          visitorId:        visitorId.slice(0, 64),
          ipAddress:        ip,
          userAgent:        ua.slice(0, 1000),
          browser,
          os,
          device,
          country:          geo.country,
          city:             geo.city,
          region:           geo.region,
          timezone:         geo.timezone,
          referrer:         (body.referrer as string)?.slice(0, 2000)         ?? null,
          landingPage:      (body.landingPage as string)?.slice(0, 2000)      ?? null,
          landingPageTitle: (body.landingPageTitle as string)?.slice(0, 300)  ?? null,
          utmSource:        (body.utmSource as string)?.slice(0, 200)         ?? null,
          utmMedium:        (body.utmMedium as string)?.slice(0, 200)         ?? null,
          utmCampaign:      (body.utmCampaign as string)?.slice(0, 200)       ?? null,
          language:         (body.language as string)?.slice(0, 20)           ?? null,
          screenWidth:      typeof body.screenWidth === "number" ? body.screenWidth : null,
          screenHeight:     typeof body.screenHeight === "number" ? body.screenHeight : null,
        },
      });

      return NextResponse.json({ ok: true, sessionDbId: session.id });
    }

    // ── Page view ─────────────────────────────────────────────────────────────
    if (type === "pageview") {
      const { sessionDbId, page, title, referrer } = body as Record<string, string>;
      if (!sessionDbId || !page) return NextResponse.json({ error: "Missing required fields" }, { status: 400 });

      const [pv] = await prisma.$transaction([
        prisma.visitorPageView.create({
          data: {
            sessionId: sessionDbId,
            page:      page.slice(0, 2000),
            title:     title?.slice(0, 300) ?? null,
            referrer:  referrer?.slice(0, 2000) ?? null,
          },
        }),
        prisma.visitorSession.update({
          where: { id: sessionDbId },
          data:  { lastSeenAt: new Date() },
        }),
      ]);

      return NextResponse.json({ ok: true, pageViewId: pv.id });
    }

    // ── Duration update ───────────────────────────────────────────────────────
    if (type === "duration") {
      const pageViewId = body.pageViewId as string;
      const duration   = body.duration as number;
      if (!pageViewId || typeof duration !== "number") {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
      }
      await prisma.visitorPageView.update({
        where: { id: pageViewId },
        data:  { duration: Math.round(Math.max(0, Math.min(duration, 86400))) },
      });
      return NextResponse.json({ ok: true });
    }

    // ── Granular event batch ──────────────────────────────────────────────────
    if (type === "events") {
      const sessionDbId = body.sessionDbId as string;
      const pageViewId  = body.pageViewId as string | undefined;
      const events      = body.events as Array<{
        type: string; page: string; data?: Record<string, unknown>; timestamp?: string;
      }>;

      if (!sessionDbId || !Array.isArray(events) || events.length === 0) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
      }

      await prisma.visitorEvent.createMany({
        data: events.slice(0, 100).map((e) => ({
          sessionId:  sessionDbId,
          pageViewId: pageViewId || null,
          type:       (e.type || "unknown").slice(0, 50),
          page:       (e.page || "/").slice(0, 2000),
          data:       e.data !== undefined ? (e.data as Prisma.InputJsonValue) : Prisma.DbNull,
          createdAt:  e.timestamp ? new Date(e.timestamp) : new Date(),
        })),
      });

      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ error: "Unknown event type" }, { status: 400 });
  } catch (err: unknown) {
    console.error("[track] error:", err instanceof Error ? err.message : String(err));
    return NextResponse.json({ ok: true, skipped: true });
  }
}
