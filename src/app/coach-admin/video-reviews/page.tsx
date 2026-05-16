import { requireCoachAdminSession } from "@/lib/coach-admin-auth";
import { prisma } from "@/lib/db";
import { CoachAdminVideoReviewActions } from "@/components/coach-admin-forms";

function fmt(v: Date) {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(v));
}

export default async function VideoReviewsPage() {
  await requireCoachAdminSession();

  const reviews = await prisma.videoReview.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  const pending = reviews.filter(r => r.status === "pending");
  const done = reviews.filter(r => r.status !== "pending");

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "32px 24px", fontFamily: "system-ui, sans-serif" }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, color: "#0F172A", marginBottom: 4 }}>Video Reviews</h1>
      <p style={{ fontSize: 14, color: "#64748B", marginBottom: 32 }}>
        Approve to grant one free month. User is notified automatically.
      </p>

      {pending.length === 0 && (
        <p style={{ fontSize: 14, color: "#94A3B8", marginBottom: 32 }}>No pending reviews.</p>
      )}

      {pending.length > 0 && (
        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 13, fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 12 }}>
            Pending ({pending.length})
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {pending.map(r => (
              <div key={r.id} style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 12, padding: "18px 20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ margin: 0, fontWeight: 600, fontSize: 14, color: "#0F172A" }}>{r.email}</p>
                    <a href={r.videoUrl} target="_blank" rel="noopener noreferrer"
                      style={{ display: "block", fontSize: 13, color: "#2563EB", marginTop: 4, wordBreak: "break-all" }}>
                      {r.videoUrl}
                    </a>
                    {r.comment && (
                      <p style={{ margin: "8px 0 0", fontSize: 13, color: "#475569" }}>{r.comment}</p>
                    )}
                    <p style={{ margin: "6px 0 0", fontSize: 12, color: "#94A3B8" }}>Submitted {fmt(r.createdAt)}</p>
                  </div>
                  <CoachAdminVideoReviewActions reviewId={r.id} />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {done.length > 0 && (
        <section>
          <h2 style={{ fontSize: 13, fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 12 }}>
            Reviewed ({done.length})
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {done.map(r => (
              <div key={r.id} style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 10, padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                <div>
                  <p style={{ margin: 0, fontSize: 14, color: "#334155" }}>{r.email}</p>
                  <a href={r.videoUrl} target="_blank" rel="noopener noreferrer"
                    style={{ fontSize: 12, color: "#2563EB" }}>
                    {r.videoUrl.slice(0, 60)}{r.videoUrl.length > 60 ? "…" : ""}
                  </a>
                </div>
                <span style={{
                  fontSize: 12, fontWeight: 600, padding: "3px 10px", borderRadius: 999,
                  background: r.status === "approved" ? "#DCFCE7" : "#FEE2E2",
                  color: r.status === "approved" ? "#166534" : "#991B1B",
                }}>
                  {r.status === "approved" ? (r.creditGranted ? "Approved · credited" : "Approved") : "Rejected"}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
