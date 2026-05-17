import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { getCoachAdminSession } from "@/lib/coach-admin-auth";
import { isDatabaseReady, prisma } from "@/lib/db";

type Props = { params: Promise<{ sessionId: string }> };

function fmtDate(v?: Date | null): string {
  if (!v) return "—";
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" }).format(new Date(v));
}

function fmtDuration(seconds?: number | null): string {
  if (!seconds || seconds < 1) return "< 1s";
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return s > 0 ? `${m}m ${s}s` : `${m}m`;
}

function ago(v?: Date | null): string {
  if (!v) return "—";
  const secs = Math.floor((Date.now() - new Date(v).getTime()) / 1000);
  if (secs < 60) return `${secs}s ago`;
  if (secs < 3600) return `${Math.floor(secs / 60)}m ago`;
  if (secs < 86400) return `${Math.floor(secs / 3600)}h ago`;
  return `${Math.floor(secs / 86400)}d ago`;
}

function edata(val: unknown): Record<string, unknown> {
  if (val && typeof val === "object" && !Array.isArray(val)) return val as Record<string, unknown>;
  return {};
}

function eventIcon(type: string): string {
  switch (type) {
    case "click":       return "🖱️";
    case "scroll":      return "↕";
    case "form_start":  return "📝";
    case "form_submit": return "✅";
    case "rage_click":  return "😤";
    case "copy":        return "📋";
    default:            return "•";
  }
}

function eventColor(type: string): string {
  switch (type) {
    case "click":       return "#F59E0B";
    case "scroll":      return "#8B5CF6";
    case "form_start":  return "#06B6D4";
    case "form_submit": return "#22C55E";
    case "rage_click":  return "#EF4444";
    case "copy":        return "#F97316";
    default:            return "var(--ca-text3)";
  }
}

function eventDesc(type: string, data: Record<string, unknown>): string {
  switch (type) {
    case "click": {
      const parts: string[] = [];
      if (data.element) parts.push(String(data.element));
      if (data.text)    parts.push(`"${String(data.text)}"`);
      if (data.href)    parts.push(`→ ${String(data.href)}`);
      return parts.join(" ") || "click";
    }
    case "scroll":      return `Scrolled ${data.depth ?? "?"}%`;
    case "form_start":  return `Form start${data.form ? ` "${data.form}"` : ""} · field: ${data.field ?? "?"}`;
    case "form_submit": return `Form submit${data.form ? ` "${data.form}"` : ""}`;
    case "rage_click":  return `Rage clicked ${data.count ?? "?"} times`;
    case "copy":        return `Copied ${data.length ?? "?"} chars${data.preview ? ` · "${String(data.preview)}"` : ""}`;
    default:            return JSON.stringify(data).slice(0, 120);
  }
}

function Row({ label, value, mono }: { label: string; value?: string | number | null; mono?: boolean }) {
  if (!value && value !== 0) return null;
  return (
    <div style={{ display: "grid", gridTemplateColumns: "130px 1fr", gap: 8, padding: "6px 0", borderBottom: "1px solid var(--ca-bd)" }}>
      <span style={{ fontSize: 11, fontWeight: 600, color: "var(--ca-text3)", textTransform: "uppercase", letterSpacing: "0.07em", paddingTop: 1 }}>{label}</span>
      <span style={{ fontSize: 12.5, color: "var(--ca-text)", fontFamily: mono ? "monospace" : undefined, wordBreak: "break-all" }}>{value}</span>
    </div>
  );
}

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ borderRadius: 8, border: "1px solid var(--ca-bd)", background: "var(--ca-card)", overflow: "hidden", ...style }}>
      {children}
    </div>
  );
}

function CardHeader({ title, right }: { title: string; right?: React.ReactNode }) {
  return (
    <div style={{ padding: "11px 14px 9px", borderBottom: "1px solid var(--ca-bd)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <span style={{ fontSize: 12, fontWeight: 700, color: "var(--ca-text)", letterSpacing: "-0.01em" }}>{title}</span>
      {right}
    </div>
  );
}

export default async function VisitorDetailPage({ params }: Props) {
  const adminSession = await getCoachAdminSession();
  if (!adminSession) redirect("/coach-admin");

  if (!isDatabaseReady()) notFound();

  const { sessionId } = await params;

  const visitorSession = await prisma.visitorSession.findUnique({
    where: { id: sessionId },
    include: {
      pageViews: { orderBy: { createdAt: "asc" } },
      events:    { orderBy: { createdAt: "asc" }, take: 500 },
    },
  });

  if (!visitorSession) notFound();

  // All sessions for this same visitorId — tells us if they're returning
  const [totalSessionCount, otherSessions] = await Promise.all([
    prisma.visitorSession.count({ where: { visitorId: visitorSession.visitorId } }),
    prisma.visitorSession.findMany({
      where: { visitorId: visitorSession.visitorId, id: { not: sessionId } },
      orderBy: { firstSeenAt: "desc" },
      take: 20,
      include: { _count: { select: { pageViews: true } } },
    }),
  ]);

  const isReturning = totalSessionCount > 1;
  const totalDuration = visitorSession.pageViews.reduce((s: number, pv: typeof visitorSession.pageViews[0]) => s + (pv.duration ?? 0), 0);
  const visitorLabel = isReturning ? `Returning visitor (${totalSessionCount} sessions total)` : "New visitor";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--ca-text3)" }}>
        <Link href="/coach-admin" style={{ color: "var(--ca-text3)", textDecoration: "none" }}>Overview</Link>
        <span>›</span>
        <Link href="/coach-admin/visitors" style={{ color: "var(--ca-text3)", textDecoration: "none" }}>Visitors</Link>
        <span>›</span>
        <span style={{ color: "var(--ca-text)", fontFamily: "monospace", fontSize: 11 }}>{visitorSession.ipAddress || visitorSession.visitorId.slice(0, 12)}</span>
      </div>

      {/* Header strip */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <span style={{ fontSize: 18, fontWeight: 700, color: "var(--ca-text)", letterSpacing: "-0.03em", fontFamily: "monospace" }}>
              {visitorSession.ipAddress || "No IP"}
            </span>
            <span style={{
              fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 99,
              background: isReturning ? "rgba(6,182,212,0.1)" : "rgba(34,197,94,0.1)",
              color: isReturning ? "#06B6D4" : "#22C55E",
              border: `1px solid ${isReturning ? "rgba(6,182,212,0.3)" : "rgba(34,197,94,0.3)"}`,
            }}>
              {visitorLabel}
            </span>
          </div>
          <div style={{ fontSize: 12, color: "var(--ca-text3)", marginTop: 4 }}>
            {[
              visitorSession.browser,
              visitorSession.os,
              visitorSession.device,
              [visitorSession.city, visitorSession.region, visitorSession.country].filter(Boolean).join(", ") || "unknown location",
              fmtDate(visitorSession.firstSeenAt),
            ].filter(Boolean).join(" · ")}
          </div>
        </div>
      </div>

      {/* Main grid: left = pages + metadata, right = other sessions */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 16, alignItems: "start" }}>

        {/* Left column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Session timeline */}
          {(() => {
            type PV = typeof visitorSession.pageViews[0];
            type EV = typeof visitorSession.events[0];
            const eventsByPv = new Map<string | null, EV[]>();
            for (const ev of visitorSession.events) {
              const k = ev.pageViewId;
              if (!eventsByPv.has(k)) eventsByPv.set(k, []);
              eventsByPv.get(k)!.push(ev);
            }
            const maxDur = Math.max(...visitorSession.pageViews.map((p: PV) => p.duration ?? 0), 1);
            const timeFmt = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", second: "2-digit" });
            const totalEvents = visitorSession.events.length;

            return (
              <Card>
                <CardHeader
                  title={`Session timeline — ${visitorSession.pageViews.length} page${visitorSession.pageViews.length !== 1 ? "s" : ""} · ${totalEvents} event${totalEvents !== 1 ? "s" : ""}`}
                  right={<span style={{ fontSize: 11, color: "var(--ca-text3)" }}>Total: {fmtDuration(totalDuration)}</span>}
                />
                {visitorSession.pageViews.length ? (
                  <div>
                    {visitorSession.pageViews.map((pv: PV, i: number) => {
                      const pvEvents = eventsByPv.get(pv.id) ?? [];
                      return (
                        <div key={pv.id} style={{ borderTop: i > 0 ? "1px solid var(--ca-bd)" : "none" }}>
                          {/* Page row */}
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 90px 90px", padding: "10px 14px", gap: 8, alignItems: "start" }}>
                            <div style={{ minWidth: 0 }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                <span style={{ fontSize: 10, fontWeight: 700, color: "var(--ca-text3)", background: "var(--ca-raise)", border: "1px solid var(--ca-bd)", borderRadius: 99, padding: "1px 6px", flexShrink: 0 }}>{i + 1}</span>
                                <span style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ca-text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={pv.page}>{pv.page}</span>
                              </div>
                              {pv.title && (
                                <div style={{ fontSize: 11, color: "var(--ca-text3)", marginTop: 2, paddingLeft: 26, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{pv.title}</div>
                              )}
                            </div>
                            <div>
                              <span style={{ fontSize: 12, fontWeight: 700, color: !pv.duration ? "var(--ca-text3)" : pv.duration >= 60 ? "#22C55E" : pv.duration >= 15 ? "#F59E0B" : "var(--ca-text2)" }}>
                                {fmtDuration(pv.duration)}
                              </span>
                              {pv.duration && pv.duration > 0 ? (
                                <div style={{ height: 2, borderRadius: 99, background: "var(--ca-raise)", marginTop: 4, overflow: "hidden" }}>
                                  <div style={{ height: "100%", borderRadius: 99, background: pv.duration >= 60 ? "#22C55E" : pv.duration >= 15 ? "#F59E0B" : "#6B7280", width: `${Math.min(100, Math.round((pv.duration / maxDur) * 100))}%` }} />
                                </div>
                              ) : null}
                            </div>
                            <span style={{ fontSize: 11, color: "var(--ca-text3)" }}>
                              {timeFmt.format(new Date(pv.createdAt))}
                            </span>
                          </div>

                          {/* Events for this page view */}
                          {pvEvents.map((ev: EV) => {
                            const d = edata(ev.data);
                            const color = eventColor(ev.type);
                            return (
                              <div key={ev.id} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "5px 14px 5px 30px", background: "rgba(0,0,0,0.015)", borderTop: "1px solid var(--ca-bd)" }}>
                                <span style={{ fontSize: 13, flexShrink: 0, marginTop: 1, width: 18, textAlign: "center" }}>{eventIcon(ev.type)}</span>
                                <span style={{ fontSize: 11, fontWeight: 700, color, flexShrink: 0, minWidth: 70, textTransform: "uppercase", letterSpacing: "0.04em", paddingTop: 1 }}>{ev.type}</span>
                                <span style={{ fontSize: 11.5, color: "var(--ca-text2)", flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={eventDesc(ev.type, d)}>
                                  {eventDesc(ev.type, d)}
                                </span>
                                <span style={{ fontSize: 10, color: "var(--ca-text3)", flexShrink: 0 }}>
                                  {timeFmt.format(new Date(ev.createdAt))}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}

                    {/* Orphaned events (no pageViewId) */}
                    {(eventsByPv.get(null) ?? []).length > 0 && (
                      <div style={{ borderTop: "1px solid var(--ca-bd)" }}>
                        <div style={{ padding: "8px 14px 4px", fontSize: 10, fontWeight: 700, color: "var(--ca-text3)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Unassigned events</div>
                        {(eventsByPv.get(null) ?? []).map((ev: EV) => {
                          const d = edata(ev.data);
                          return (
                            <div key={ev.id} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "5px 14px", borderTop: "1px solid var(--ca-bd)", background: "rgba(0,0,0,0.015)" }}>
                              <span style={{ fontSize: 13, flexShrink: 0, width: 18, textAlign: "center" }}>{eventIcon(ev.type)}</span>
                              <span style={{ fontSize: 11, fontWeight: 700, color: eventColor(ev.type), flexShrink: 0, minWidth: 70, textTransform: "uppercase", letterSpacing: "0.04em" }}>{ev.type}</span>
                              <span style={{ fontSize: 11.5, color: "var(--ca-text2)", flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{eventDesc(ev.type, d)}</span>
                              <span style={{ fontSize: 10, color: "var(--ca-text3)", flexShrink: 0 }}>{timeFmt.format(new Date(ev.createdAt))}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ) : (
                  <div style={{ padding: "16px 14px", fontSize: 12.5, color: "var(--ca-text3)", textAlign: "center" }}>No pageviews recorded</div>
                )}
              </Card>
            );
          })()}

          {/* Session metadata */}
          <Card>
            <CardHeader title="Session details" />
            <div style={{ padding: "12px 14px" }}>
              <Row label="IP address"    value={visitorSession.ipAddress}    mono />
              <Row label="Visitor ID"    value={visitorSession.visitorId}    mono />
              <Row label="Browser"       value={visitorSession.browser} />
              <Row label="OS"            value={visitorSession.os} />
              <Row label="Device"        value={visitorSession.device} />
              <Row label="City"          value={visitorSession.city} />
              <Row label="Region"        value={visitorSession.region} />
              <Row label="Country"       value={visitorSession.country} />
              <Row label="Timezone"      value={visitorSession.timezone} />
              <Row label="Language"      value={visitorSession.language} />
              <Row label="Screen"        value={visitorSession.screenWidth ? `${visitorSession.screenWidth} × ${visitorSession.screenHeight}` : null} />
              <Row label="Landing title" value={visitorSession.landingPageTitle} />
              <Row label="Landing page"  value={visitorSession.landingPage} />
              <Row label="Referrer"      value={visitorSession.referrer} />
              <Row label="UTM source"    value={visitorSession.utmSource} />
              <Row label="UTM medium"    value={visitorSession.utmMedium} />
              <Row label="UTM campaign"  value={visitorSession.utmCampaign} />
              <Row label="First seen"    value={fmtDate(visitorSession.firstSeenAt)} />
              <Row label="Last seen"     value={fmtDate(visitorSession.lastSeenAt)} />
              <Row label="User agent"    value={visitorSession.userAgent}    mono />
            </div>
          </Card>

        </div>

        {/* Right column — other sessions for the same visitor */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {isReturning && (
            <Card>
              <CardHeader title={`Other sessions · ${otherSessions.length}`} />
              {otherSessions.map((s: typeof otherSessions[0], i: number) => (
                <Link
                  key={s.id}
                  href={`/coach-admin/visitors/${s.id}`}
                  style={{ display: "block", padding: "10px 14px", borderTop: i > 0 ? "1px solid var(--ca-bd)" : "none", textDecoration: "none", transition: "background 0.1s" }}
                  className="coach-admin-row-hover"
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "var(--ca-text)" }}>{ago(s.firstSeenAt)}</span>
                    <span style={{ fontSize: 11, color: "var(--ca-text3)" }}>{s._count.pageViews} page{s._count.pageViews !== 1 ? "s" : ""}</span>
                  </div>
                  <div style={{ fontSize: 11, color: "var(--ca-text3)", marginTop: 3 }}>{fmtDate(s.firstSeenAt)}</div>
                </Link>
              ))}
            </Card>
          )}

          {/* Quick stats */}
          <Card style={{ padding: 14 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[
                { label: "Pages",         value: visitorSession.pageViews.length,         color: "#3B82F6" },
                { label: "Events",        value: visitorSession.events.length,             color: "#F59E0B" },
                { label: "Total time",    value: fmtDuration(totalDuration),               color: "#22C55E" },
                { label: "Sessions",      value: totalSessionCount,                         color: isReturning ? "#06B6D4" : "#6B7280" },
              ].map(s => (
                <div key={s.label} style={{ borderRadius: 8, border: "1px solid var(--ca-bd)", padding: "10px 12px" }}>
                  <div style={{ fontSize: 10, fontWeight: 600, color: "var(--ca-text3)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>{s.label}</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: s.color, letterSpacing: "-0.04em", lineHeight: 1 }}>{typeof s.value === "number" ? s.value.toLocaleString() : s.value}</div>
                </div>
              ))}
            </div>
          </Card>

        </div>
      </div>
    </div>
  );
}
