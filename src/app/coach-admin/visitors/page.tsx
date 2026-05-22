import { redirect } from "next/navigation";
import Link from "next/link";
import { getCoachAdminSession } from "@/lib/coach-admin-auth";
import { isDatabaseReady, prisma } from "@/lib/db";
import { GeoBackfillButton } from "./geo-backfill-button";

function ago(v?: Date | null): string {
  if (!v) return "—";
  const secs = Math.floor((Date.now() - new Date(v).getTime()) / 1000);
  if (secs < 60) return `${secs}s ago`;
  if (secs < 3600) return `${Math.floor(secs / 60)}m ago`;
  if (secs < 86400) return `${Math.floor(secs / 3600)}h ago`;
  return `${Math.floor(secs / 86400)}d ago`;
}

function Card({ children, style, id }: { children: React.ReactNode; style?: React.CSSProperties; id?: string }) {
  return (
    <div id={id} style={{ borderRadius: 8, border: "1px solid var(--ca-bd)", background: "var(--ca-card)", overflow: "hidden", ...style }}>
      {children}
    </div>
  );
}

function SectionHeader({ title, count, sub }: { title: string; count?: number; sub?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 0 }}>
      <span style={{ fontSize: 12, fontWeight: 700, color: "var(--ca-text)", letterSpacing: "-0.01em" }}>{title}</span>
      {count !== undefined && (
        <span style={{ fontSize: 11, fontWeight: 600, color: "var(--ca-text3)", background: "var(--ca-raise)", border: "1px solid var(--ca-bd)", borderRadius: 99, padding: "0 7px", lineHeight: "18px" }}>{count}</span>
      )}
      {sub && <span style={{ fontSize: 11, color: "var(--ca-text3)", marginLeft: "auto" }}>{sub}</span>}
    </div>
  );
}

function EmptyRow({ label }: { label: string }) {
  return (
    <div style={{ padding: "16px 14px", fontSize: 12.5, color: "var(--ca-text3)", textAlign: "center", borderTop: "1px solid var(--ca-bd)" }}>{label}</div>
  );
}

function deviceIcon(device?: string | null) {
  if (device === "mobile") return "📱";
  if (device === "tablet") return "📟";
  if (device === "bot")    return "🤖";
  return "🖥️";
}

// Convert ISO 3166-1 alpha-2 country codes to full English names
const _regionNames = (typeof Intl !== "undefined" && "DisplayNames" in Intl)
  ? new Intl.DisplayNames(["en"], { type: "region" })
  : null;
function countryName(code?: string | null): string | null {
  if (!code) return null;
  try { return _regionNames?.of(code) ?? code; } catch { return code; }
}

function browserColor(browser?: string | null): string {
  switch (browser) {
    case "Chrome":  return "#4CAF50";
    case "Firefox": return "#FF6D00";
    case "Safari":  return "#2196F3";
    case "Edge":    return "#0078D4";
    default:        return "var(--ca-text3)";
  }
}

export default async function VisitorsPage() {
  const session = await getCoachAdminSession();
  if (!session) redirect("/coach-admin");

  if (!isDatabaseReady()) {
    return (
      <Card style={{ padding: 24, maxWidth: 640 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: "var(--ca-text)" }}>Database unavailable</p>
        <p style={{ fontSize: 13, color: "var(--ca-text2)", lineHeight: 1.6, marginTop: 6 }}>Wire DATABASE_URL to enable visitor tracking.</p>
      </Card>
    );
  }

  const now = new Date();
  const last5min = new Date(now.getTime() - 5 * 60 * 1000);
  const today    = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const last30d  = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const last7d   = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const [
    liveCount,
    liveSessions,
    todaySessions,
    last30dSessions,
    recentSessions,
    topPages,
    topReferrers,
    deviceBreakdown,
    browserBreakdown,
    countryBreakdown,
    todayPageViews,
    last7dPageViews,
  ] = await Promise.all([
    prisma.visitorSession.count({ where: { lastSeenAt: { gte: last5min }, device: { not: "bot" } } }),
    prisma.visitorSession.findMany({
      where: { lastSeenAt: { gte: last5min }, device: { not: "bot" } },
      orderBy: { lastSeenAt: "desc" },
      take: 20,
      include: { pageViews: { orderBy: { createdAt: "desc" }, take: 1, select: { page: true, title: true, createdAt: true } } },
    }),
    prisma.visitorSession.count({ where: { firstSeenAt: { gte: today }, device: { not: "bot" } } }),
    prisma.visitorSession.count({ where: { firstSeenAt: { gte: last30d }, device: { not: "bot" } } }),
    prisma.visitorSession.findMany({
      where: { device: { not: "bot" } },
      orderBy: { firstSeenAt: "desc" },
      take: 50,
      include: { pageViews: { orderBy: { createdAt: "asc" }, select: { id: true, page: true, title: true, duration: true, createdAt: true } } },
    }),
    prisma.visitorPageView.groupBy({
      by: ["page"],
      _count: { id: true },
      where: { createdAt: { gte: last30d }, session: { device: { not: "bot" } } },
      orderBy: { _count: { id: "desc" } },
      take: 15,
    }),
    prisma.visitorSession.groupBy({
      by: ["referrer"],
      _count: { id: true },
      where: { firstSeenAt: { gte: last30d }, device: { not: "bot" }, referrer: { not: null } },
      orderBy: { _count: { id: "desc" } },
      take: 10,
    }),
    prisma.visitorSession.groupBy({
      by: ["device"],
      _count: { id: true },
      where: { firstSeenAt: { gte: last30d } },
      orderBy: { _count: { id: "desc" } },
    }),
    prisma.visitorSession.groupBy({
      by: ["browser"],
      _count: { id: true },
      where: { firstSeenAt: { gte: last30d }, device: { not: "bot" } },
      orderBy: { _count: { id: "desc" } },
      take: 6,
    }),
    prisma.visitorSession.groupBy({
      by: ["country"],
      _count: { id: true },
      where: { firstSeenAt: { gte: last30d }, device: { not: "bot" }, country: { not: null } },
      orderBy: { _count: { id: "desc" } },
      take: 10,
    }),
    prisma.visitorPageView.count({ where: { createdAt: { gte: today }, session: { device: { not: "bot" } } } }),
    prisma.visitorPageView.count({ where: { createdAt: { gte: last7d }, session: { device: { not: "bot" } } } }),
  ]);

  // Determine returning visitors — check visitorId (localStorage) AND IP address.
  // IP-based check uses an in-memory count from the current 50 sessions (guaranteed accurate)
  // plus a DB query for IPs that may have appeared in older sessions not in this window.
  const distinctVisitorIds = [...new Set(recentSessions.map((s: typeof recentSessions[0]) => s.visitorId))].filter((v) => v !== "anon");
  const distinctIps        = [...new Set(recentSessions.map((s: typeof recentSessions[0]) => s.ipAddress))].filter(Boolean) as string[];

  const [returningData, returningIpData] = await Promise.all([
    distinctVisitorIds.length
      ? prisma.visitorSession.groupBy({
          by: ["visitorId"],
          _count: { id: true },
          where: { visitorId: { in: distinctVisitorIds } },
          having: { id: { _count: { gt: 1 } } },
        })
      : Promise.resolve([] as { visitorId: string }[]),
    distinctIps.length
      ? prisma.visitorSession.groupBy({
          by: ["ipAddress"],
          _count: { id: true },
          where: { ipAddress: { in: distinctIps } },
          having: { id: { _count: { gt: 1 } } },
        })
      : Promise.resolve([] as { ipAddress: string | null }[]),
  ]);

  const returningSet = new Set(returningData.map((r: { visitorId: string }) => r.visitorId));

  // In-memory IP count: most reliable — if same IP appears 2+ times in the current page, it's returning
  const ipCounts = new Map<string, number>();
  for (const s of recentSessions) {
    if (s.ipAddress) ipCounts.set(s.ipAddress, (ipCounts.get(s.ipAddress) ?? 0) + 1);
  }
  // Also add any IPs flagged by the DB query (older sessions outside the current 50)
  for (const r of returningIpData as { ipAddress: string | null }[]) {
    if (r.ipAddress) ipCounts.set(r.ipAddress, Math.max(ipCounts.get(r.ipAddress) ?? 0, 2));
  }
  const returningIpSet = new Set([...ipCounts.entries()].filter(([, c]) => c > 1).map(([ip]) => ip));

  const avgPagesPerSession = recentSessions.length
    ? (recentSessions.reduce((s: number, r: typeof recentSessions[0]) => s + r.pageViews.length, 0) / recentSessions.length).toFixed(1)
    : "—";

  const topPagesMax = topPages[0]?._count.id || 1;
  const topRefMax   = topReferrers[0]?._count.id || 1;
  const deviceTotal = deviceBreakdown.reduce((s: number, d: typeof deviceBreakdown[0]) => s + d._count.id, 0) || 1;

  const kpis = [
    { label: "Live now",        value: liveCount,          sub: "last 5 min", color: liveCount > 0 ? "#22C55E" : "var(--ca-text3)" },
    { label: "Today sessions",  value: todaySessions,       sub: "no bots",    color: "#3B82F6" },
    { label: "30d sessions",    value: last30dSessions,     sub: "total",      color: "#06B6D4" },
    { label: "Today pageviews", value: todayPageViews,       sub: "",           color: "#8B5CF6" },
    { label: "7d pageviews",    value: last7dPageViews,      sub: "",           color: "#F59E0B" },
    { label: "Pages / session", value: avgPagesPerSession,   sub: "recent 50",  color: "var(--ca-text2)" },
  ];

  // Grid columns: icon | visitor+IP | browser | os | location | pages | first seen | type | →
  const COLS = "28px 1fr 90px 70px 110px 44px 76px 70px 20px";
  const HEADERS = ["", "Visitor / Landing page", "Browser", "OS", "Location", "Pages", "First seen", "Type", ""];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

      {/* Breadcrumb + actions */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--ca-text3)" }}>
          <Link href="/coach-admin" style={{ color: "var(--ca-text3)", textDecoration: "none" }}>Overview</Link>
          <span>›</span>
          <span style={{ color: "var(--ca-text)" }}>Visitors</span>
        </div>
        <GeoBackfillButton />
      </div>

      {/* KPI strip */}
      <div style={{ display: "flex", gap: 0, borderRadius: 8, border: "1px solid var(--ca-bd)", background: "var(--ca-card)", overflow: "hidden" }}>
        {kpis.map((k, i) => (
          <div key={k.label} style={{ flex: 1, padding: "14px 16px", borderLeft: i > 0 ? "1px solid var(--ca-bd)" : "none" }}>
            <div style={{ fontSize: 10.5, fontWeight: 600, color: "var(--ca-text3)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>{k.label}</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: k.color, letterSpacing: "-0.03em", lineHeight: 1 }}>{typeof k.value === "number" ? k.value.toLocaleString() : k.value}</div>
            {k.sub && <div style={{ fontSize: 10, color: "var(--ca-text3)", marginTop: 3 }}>{k.sub}</div>}
          </div>
        ))}
      </div>

      {/* Live visitors */}
      {liveCount > 0 && (
        <Card>
          <div style={{ padding: "12px 14px 10px", borderBottom: "1px solid var(--ca-bd)", display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: "#22C55E", boxShadow: "0 0 0 3px rgba(34,197,94,0.25)", flexShrink: 0 }} />
            <span style={{ fontSize: 12, fontWeight: 700, color: "var(--ca-text)", letterSpacing: "-0.01em" }}>Live right now</span>
            <span style={{ fontSize: 11, fontWeight: 600, color: "#22C55E", background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)", borderRadius: 99, padding: "0 7px", lineHeight: "18px" }}>{liveCount}</span>
            <span style={{ fontSize: 10.5, color: "var(--ca-text3)", marginLeft: "auto" }}>active in last 5 min · auto-refreshes on next visit</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "28px 1fr 90px 90px 50px 30px", gap: 8, padding: "7px 14px", borderBottom: "1px solid var(--ca-bd)" }}>
            {["", "Current page", "Location", "Browser", "Active", ""].map((h, i) => (
              <span key={i} style={{ fontSize: 10, fontWeight: 700, color: "var(--ca-text3)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{h}</span>
            ))}
          </div>
          {liveSessions.map((s: typeof liveSessions[0], i: number) => {
            const currentPage = s.pageViews[0];
            const secAgo = Math.round((Date.now() - new Date(s.lastSeenAt).getTime()) / 1000);
            return (
              <div
                key={s.id}
                style={{ display: "grid", gridTemplateColumns: "28px 1fr 90px 90px 50px 30px", gap: 8, padding: "8px 14px", borderTop: i > 0 ? "1px solid var(--ca-bd)" : "none", alignItems: "center" }}
              >
                <span style={{ fontSize: 14, textAlign: "center" }}>{deviceIcon(s.device)}</span>
                <div style={{ minWidth: 0 }}>
                  {currentPage?.page ? (
                    <a
                      href={currentPage.page}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: 12.5, fontWeight: 500, color: "var(--ca-text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", textDecoration: "none", display: "block" }}
                    >
                      {currentPage.title || (currentPage.page === "/" ? "Homepage" : currentPage.page)}
                      <span style={{ fontSize: 10, color: "var(--ca-text3)", marginLeft: 4 }}>↗</span>
                    </a>
                  ) : (
                    <div style={{ fontSize: 12.5, color: "var(--ca-text3)" }}>—</div>
                  )}
                  <div style={{ fontSize: 10.5, fontFamily: "monospace", color: "var(--ca-text3)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{currentPage?.page || "—"}</div>
                </div>
                <div style={{ minWidth: 0 }}>
                  {s.city && <div style={{ fontSize: 11.5, fontWeight: 500, color: "var(--ca-text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.city}</div>}
                  {(countryName(s.country) || s.region) && <div style={{ fontSize: 10.5, color: "var(--ca-text3)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{[s.region, countryName(s.country)].filter(Boolean).join(", ")}</div>}
                  {!s.city && !s.country && !s.region && <span style={{ color: "var(--ca-text3)", fontSize: 11 }}>—</span>}
                </div>
                <span style={{ fontSize: 11.5, fontWeight: 600, color: browserColor(s.browser) }}>{s.browser || "—"}</span>
                <span style={{ fontSize: 11, color: "#22C55E", fontWeight: 600 }}>{secAgo < 60 ? `${secAgo}s ago` : `${Math.floor(secAgo / 60)}m ago`}</span>
                <Link href={`/coach-admin/visitors/${s.id}`} style={{ fontSize: 12, color: "var(--ca-text3)", textDecoration: "none", textAlign: "right" }}>→</Link>
              </div>
            );
          })}
        </Card>
      )}

      {/* Main grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 16, alignItems: "start" }}>

        {/* Left column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Recent sessions table */}
          <Card>
            <div style={{ padding: "12px 14px 10px", borderBottom: "1px solid var(--ca-bd)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <SectionHeader title="Recent sessions" count={recentSessions.length} sub="last 50 · click to inspect" />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: COLS, padding: "7px 14px", borderBottom: "1px solid var(--ca-bd)", gap: 8 }}>
              {HEADERS.map((h, i) => (
                <span key={i} style={{ fontSize: 10, fontWeight: 700, color: "var(--ca-text3)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{h}</span>
              ))}
            </div>

            {recentSessions.length ? recentSessions.map((s: typeof recentSessions[0], i: number) => {
              const rawPage = s.landingPage || "/";
              const isReturning = returningSet.has(s.visitorId) || (s.ipAddress ? returningIpSet.has(s.ipAddress) : false);
              return (
                <div
                  key={s.id}
                  style={{ display: "grid", gridTemplateColumns: COLS, padding: "8px 14px", gap: 8, borderTop: i > 0 ? "1px solid var(--ca-bd)" : "none", alignItems: "center" }}
                >
                  <span style={{ fontSize: 14, textAlign: "center" }}>{deviceIcon(s.device)}</span>

                  {/* Visitor cell: title (primary) + exact path + IP */}
                  <div style={{ minWidth: 0 }}>
                    <a
                      href={rawPage}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: 12.5, fontWeight: 500, color: "var(--ca-text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", textDecoration: "none", display: "block" }}
                      title={`Visit ${rawPage} ↗`}
                    >
                      {s.landingPageTitle || (rawPage === "/" ? "Homepage" : rawPage)}
                      <span style={{ fontSize: 10, color: "var(--ca-text3)", marginLeft: 4 }}>↗</span>
                    </a>
                    <div style={{ fontSize: 10.5, fontFamily: "monospace", color: "var(--ca-text3)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginTop: 1 }}>
                      {rawPage}{s.ipAddress ? ` · ${s.ipAddress}` : ""}
                    </div>
                    {s.referrer && (
                      <div style={{ fontSize: 10.5, color: "var(--ca-text3)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={s.referrer}>
                        ← {(() => { try { return new URL(s.referrer).hostname; } catch { return s.referrer; } })()}
                      </div>
                    )}
                    {(s.utmSource || s.utmCampaign) && (
                      <div style={{ fontSize: 10, color: "#F59E0B" }}>
                        {[s.utmSource, s.utmMedium, s.utmCampaign].filter(Boolean).join(" / ")}
                      </div>
                    )}
                  </div>

                  <span style={{ fontSize: 11.5, fontWeight: 600, color: browserColor(s.browser) }}>{s.browser || "—"}</span>
                  <span style={{ fontSize: 11.5, color: "var(--ca-text2)" }}>{s.os || "—"}</span>

                  {/* Location: city first, then full country name */}
                  <div style={{ minWidth: 0 }}>
                    {s.city && (
                      <div style={{ fontSize: 11.5, fontWeight: 500, color: "var(--ca-text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {s.city}
                      </div>
                    )}
                    {(countryName(s.country) || s.region) && (
                      <div style={{ fontSize: 10.5, color: "var(--ca-text3)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {[s.region, countryName(s.country)].filter(Boolean).join(", ")}
                      </div>
                    )}
                    {!s.city && !s.country && !s.region && <span style={{ color: "var(--ca-text3)", fontSize: 11 }}>—</span>}
                  </div>

                  <span style={{ fontSize: 12, fontWeight: 700, color: "var(--ca-text2)", textAlign: "center" }}>{s.pageViews.length}</span>
                  <span style={{ fontSize: 11, color: "var(--ca-text3)" }}>{ago(s.firstSeenAt)}</span>

                  {/* Returning / New badge */}
                  <span style={{
                    fontSize: 10, fontWeight: 700, padding: "2px 6px", borderRadius: 99, letterSpacing: "0.04em",
                    background: isReturning ? "rgba(6,182,212,0.1)" : "rgba(34,197,94,0.1)",
                    color: isReturning ? "#06B6D4" : "#22C55E",
                    border: `1px solid ${isReturning ? "rgba(6,182,212,0.3)" : "rgba(34,197,94,0.3)"}`,
                    whiteSpace: "nowrap",
                  }}>
                    {isReturning ? "Returning" : "New"}
                  </span>

                  {/* Arrow links to session detail */}
                  <Link href={`/coach-admin/visitors/${s.id}`} style={{ fontSize: 12, color: "var(--ca-text3)", textAlign: "right", textDecoration: "none" }}>→</Link>
                </div>
              );
            }) : <EmptyRow label="No sessions yet — tracking activates as soon as a visitor loads the site" />}
          </Card>

          {/* Top pages */}
          <Card>
            <div style={{ padding: "12px 14px 10px", borderBottom: "1px solid var(--ca-bd)" }}>
              <SectionHeader title="Top pages" count={topPages.length} sub="last 30 days" />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 60px", padding: "7px 14px", borderBottom: "1px solid var(--ca-bd)", gap: 8 }}>
              {["Page", "Views"].map(h => (
                <span key={h} style={{ fontSize: 10, fontWeight: 700, color: "var(--ca-text3)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{h}</span>
              ))}
            </div>
            {topPages.length ? topPages.map((p: typeof topPages[0], i: number) => {
              const pct = Math.max(4, Math.round((p._count.id / topPagesMax) * 100));
              return (
                <div key={p.page} style={{ padding: "8px 14px", borderTop: i > 0 ? "1px solid var(--ca-bd)" : "none" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 60px", gap: 8, alignItems: "center", marginBottom: 4 }}>
                    <span style={{ fontSize: 12.5, color: "var(--ca-text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={p.page}>{p.page}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#3B82F6", textAlign: "right" }}>{p._count.id.toLocaleString()}</span>
                  </div>
                  <div style={{ height: 3, borderRadius: 99, background: "var(--ca-raise)", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${pct}%`, borderRadius: 99, background: "#3B82F6", opacity: 0.7 }} />
                  </div>
                </div>
              );
            }) : <EmptyRow label="No pageviews yet" />}
          </Card>

        </div>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Device breakdown */}
          <Card style={{ padding: 14 }}>
            <SectionHeader title="Devices" sub="30 days" />
            <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
              {deviceBreakdown.map((d: typeof deviceBreakdown[0]) => {
                const pct = Math.max(4, Math.round((d._count.id / deviceTotal) * 100));
                return (
                  <div key={d.device ?? "unknown"}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11.5, color: "var(--ca-text2)", marginBottom: 3 }}>
                      <span>{deviceIcon(d.device)} {d.device || "unknown"}</span>
                      <span style={{ fontWeight: 600 }}>{Math.round((d._count.id / deviceTotal) * 100)}%</span>
                    </div>
                    <div style={{ height: 4, borderRadius: 99, background: "var(--ca-raise)", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${pct}%`, borderRadius: 99, background: d.device === "bot" ? "#6B7280" : d.device === "mobile" ? "#06B6D4" : "#3B82F6" }} />
                    </div>
                  </div>
                );
              })}
              {!deviceBreakdown.length && <p style={{ fontSize: 12, color: "var(--ca-text3)", textAlign: "center" }}>No data yet</p>}
            </div>
          </Card>

          {/* Browser breakdown */}
          <Card style={{ padding: 14 }}>
            <SectionHeader title="Browsers" sub="30 days" />
            <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 6 }}>
              {browserBreakdown.map((b: typeof browserBreakdown[0]) => (
                <div key={b.browser ?? "unknown"} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 12.5, color: "var(--ca-text)", fontWeight: 500 }}>{b.browser || "Other"}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: browserColor(b.browser) }}>{b._count.id}</span>
                </div>
              ))}
              {!browserBreakdown.length && <p style={{ fontSize: 12, color: "var(--ca-text3)", textAlign: "center" }}>No data yet</p>}
            </div>
          </Card>

          {/* Countries */}
          <Card style={{ padding: 14 }}>
            <SectionHeader title="Countries" sub="30 days" />
            <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 6 }}>
              {countryBreakdown.map((c: typeof countryBreakdown[0]) => (
                <div key={c.country ?? "unknown"} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 12.5, color: "var(--ca-text)" }}>{countryName(c.country) || "Unknown"}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "var(--ca-text2)" }}>{c._count.id}</span>
                </div>
              ))}
              {!countryBreakdown.length && <p style={{ fontSize: 12, color: "var(--ca-text3)", textAlign: "center", marginTop: 4 }}>No country data yet</p>}
            </div>
          </Card>

          {/* Top referrers */}
          <Card style={{ padding: 14 }}>
            <SectionHeader title="Top referrers" sub="30 days" />
            <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 6 }}>
              {topReferrers.filter((r: typeof topReferrers[0]) => r.referrer).map((r: typeof topReferrers[0]) => {
                const host = (() => { try { return new URL(r.referrer!).hostname.replace(/^www\./, ""); } catch { return r.referrer; } })();
                const pct = Math.max(4, Math.round((r._count.id / topRefMax) * 100));
                return (
                  <div key={r.referrer}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11.5, color: "var(--ca-text2)", marginBottom: 3 }}>
                      <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 180 }} title={r.referrer ?? ""}>{host}</span>
                      <span style={{ fontWeight: 600 }}>{r._count.id}</span>
                    </div>
                    <div style={{ height: 3, borderRadius: 99, background: "var(--ca-raise)", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${pct}%`, borderRadius: 99, background: "#22C55E", opacity: 0.7 }} />
                    </div>
                  </div>
                );
              })}
              {!topReferrers.filter((r: typeof topReferrers[0]) => r.referrer).length && <p style={{ fontSize: 12, color: "var(--ca-text3)", textAlign: "center" }}>No referrer data yet</p>}
            </div>
          </Card>

        </div>
      </div>
    </div>
  );
}
