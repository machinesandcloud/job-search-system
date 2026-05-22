import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import type { PostType } from "@/lib/linkedin-content";

export const runtime = "edge";

const TYPE_LABEL: Record<PostType, string> = {
  career_tip: "Career Tip",
  linkedin_stat: "LinkedIn Insight",
  job_market: "Job Market",
  interview_tip: "Interview Tip",
};

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const type = (searchParams.get("type") ?? "career_tip") as PostType;
  const headline = searchParams.get("headline") ?? "Career Insight";
  const subtext = searchParams.get("subtext") ?? "";

  const isStatCard = type === "linkedin_stat" || type === "job_market";
  const label = TYPE_LABEL[type] ?? "Insight";

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 628,
          display: "flex",
          flexDirection: "column",
          background: isStatCard
            ? "linear-gradient(135deg, #06040f 0%, #150830 45%, #070d22 100%)"
            : "linear-gradient(135deg, #080615 0%, #190535 45%, #07101f 100%)",
          padding: "52px 68px 48px",
          fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow orb top-right */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -100,
            width: 480,
            height: 480,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(139,92,246,0.22) 0%, transparent 70%)",
            display: "flex",
          }}
        />
        {/* Glow orb bottom-left */}
        <div
          style={{
            position: "absolute",
            bottom: -140,
            left: -80,
            width: 420,
            height: 420,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(109,40,217,0.16) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Type badge */}
        <div style={{ display: "flex", marginBottom: 28 }}>
          <div
            style={{
              display: "flex",
              padding: "7px 18px",
              borderRadius: 100,
              background: "rgba(139,92,246,0.18)",
              border: "1px solid rgba(139,92,246,0.38)",
              color: "#c4b5fd",
              fontSize: 15,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            {label}
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: isStatCard ? "flex-start" : "center",
            paddingTop: isStatCard ? 8 : 0,
          }}
        >
          <div
            style={{
              fontSize: headline.length > 55 ? 44 : headline.length > 38 ? 52 : 60,
              fontWeight: 900,
              color: "#ffffff",
              lineHeight: 1.15,
              maxWidth: 960,
              letterSpacing: "-0.02em",
            }}
          >
            {headline}
          </div>
        </div>

        {/* Subtext */}
        {subtext ? (
          <div
            style={{
              display: "flex",
              fontSize: 22,
              color: "#c4b5fd",
              lineHeight: 1.55,
              maxWidth: 820,
              marginTop: 18,
              marginBottom: 32,
            }}
          >
            {subtext}
          </div>
        ) : (
          <div style={{ display: "flex", marginBottom: 32 }} />
        )}

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(139,92,246,0.22)",
            paddingTop: 22,
          }}
        >
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 46,
                height: 46,
                borderRadius: 11,
                background: "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
                fontWeight: 900,
                color: "#ffffff",
                boxShadow: "0 4px 14px rgba(139,92,246,0.4)",
              }}
            >
              Z
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <div style={{ color: "#ffffff", fontSize: 20, fontWeight: 800, display: "flex" }}>
                Zari
              </div>
              <div style={{ color: "#a78bfa", fontSize: 14, display: "flex" }}>AI Career Coach</div>
            </div>
          </div>

          {/* Domain */}
          <div
            style={{
              color: "#7c6fba",
              fontSize: 18,
              fontWeight: 500,
              display: "flex",
            }}
          >
            zaricoach.com
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 628 }
  );
}
