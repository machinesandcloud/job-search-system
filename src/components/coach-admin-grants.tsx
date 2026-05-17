"use client";

import { useState } from "react";
import { coachAdminGhostButtonClass, coachAdminInputClass, coachAdminPrimaryButtonClass } from "@/components/coach-admin-ui";

type GrantType = "months" | "discount";

export function CoachAdminGrantModal({ accountId, userName }: { accountId: string; userName: string }) {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<GrantType>("months");
  const [months, setMonths] = useState(1);
  const [discountPct, setDiscountPct] = useState(25);
  const [discountMonths, setDiscountMonths] = useState(1);
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState<string | null>(null);
  const [error, setError] = useState("");

  function reset() {
    setType("months");
    setMonths(1);
    setDiscountPct(25);
    setDiscountMonths(1);
    setReason("");
    setError("");
    setDone(null);
  }

  async function handleGrant() {
    setLoading(true);
    setError("");
    const body = type === "months"
      ? { type, months, reason }
      : { type, discountPct, discountMonths, reason };

    const res = await fetch(`/api/coach-admin/accounts/${accountId}/grant-credit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setError(data.error || "Something went wrong.");
      setLoading(false);
      return;
    }
    const label = type === "months"
      ? `${months} month${months > 1 ? "s" : ""} granted`
      : `${discountPct}% off for ${discountMonths}mo applied`;
    setDone(label);
    setLoading(false);
  }

  return (
    <>
      <button onClick={() => { reset(); setOpen(true); }} className={coachAdminGhostButtonClass} style={{ fontSize: 12, padding: "4px 10px" }}>
        Grant
      </button>

      {open && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50 }}
          onClick={e => { if (e.target === e.currentTarget) setOpen(false); }}>
          <div style={{ background: "var(--ca-surface, #fff)", borderRadius: 14, padding: "28px", width: 400, boxShadow: "0 8px 40px rgba(0,0,0,0.2)" }}>

            {done ? (
              <>
                <div style={{ fontSize: 32, marginBottom: 12 }}>✓</div>
                <h3 style={{ margin: "0 0 8px", fontSize: 16, fontWeight: 700, color: "var(--ca-text, #0F172A)" }}>{done}</h3>
                <p style={{ margin: "0 0 20px", fontSize: 13, color: "var(--ca-text3, #64748B)" }}>
                  {userName} has been notified by email.
                </p>
                <button onClick={() => setOpen(false)} className={coachAdminPrimaryButtonClass} style={{ width: "100%" }}>Done</button>
              </>
            ) : (
              <>
                <h3 style={{ margin: "0 0 4px", fontSize: 16, fontWeight: 700, color: "var(--ca-text, #0F172A)" }}>Grant credit</h3>
                <p style={{ margin: "0 0 20px", fontSize: 13, color: "var(--ca-text3, #64748B)" }}>{userName}</p>

                {/* Type toggle */}
                <div style={{ display: "flex", gap: 0, marginBottom: 20, border: "1px solid var(--ca-bd, #E2E8F0)", borderRadius: 8, overflow: "hidden" }}>
                  {(["months", "discount"] as GrantType[]).map(t => (
                    <button key={t} onClick={() => setType(t)} style={{
                      flex: 1, padding: "8px 0", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600,
                      background: type === t ? "var(--ca-text, #0F172A)" : "transparent",
                      color: type === t ? "#fff" : "var(--ca-text3, #64748B)",
                    }}>
                      {t === "months" ? "Free months" : "Discount %"}
                    </button>
                  ))}
                </div>

                {type === "months" ? (
                  <>
                    <label style={labelStyle}>How many months?</label>
                    <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                      {[1, 2, 3].map(m => (
                        <button key={m} onClick={() => setMonths(m)} style={{
                          flex: 1, padding: "9px 0", borderRadius: 8, border: "1.5px solid",
                          borderColor: months === m ? "#2563EB" : "var(--ca-bd, #E2E8F0)",
                          background: months === m ? "#EFF6FF" : "transparent",
                          color: months === m ? "#1D4ED8" : "var(--ca-text2, #334155)",
                          fontWeight: 700, fontSize: 15, cursor: "pointer",
                        }}>{m}</button>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <label style={labelStyle}>Discount percentage</label>
                    <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                      {[10, 25, 50, 100].map(p => (
                        <button key={p} onClick={() => setDiscountPct(p)} style={{
                          flex: 1, padding: "9px 0", borderRadius: 8, border: "1.5px solid",
                          borderColor: discountPct === p ? "#2563EB" : "var(--ca-bd, #E2E8F0)",
                          background: discountPct === p ? "#EFF6FF" : "transparent",
                          color: discountPct === p ? "#1D4ED8" : "var(--ca-text2, #334155)",
                          fontWeight: 700, fontSize: 13, cursor: "pointer",
                        }}>{p}%</button>
                      ))}
                    </div>
                    <label style={labelStyle}>For how many months?</label>
                    <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                      {[1, 2, 3, 6].map(m => (
                        <button key={m} onClick={() => setDiscountMonths(m)} style={{
                          flex: 1, padding: "9px 0", borderRadius: 8, border: "1.5px solid",
                          borderColor: discountMonths === m ? "#2563EB" : "var(--ca-bd, #E2E8F0)",
                          background: discountMonths === m ? "#EFF6FF" : "transparent",
                          color: discountMonths === m ? "#1D4ED8" : "var(--ca-text2, #334155)",
                          fontWeight: 700, fontSize: 13, cursor: "pointer",
                        }}>{m}mo</button>
                      ))}
                    </div>
                  </>
                )}

                <label style={labelStyle}>
                  Reason <span style={{ fontWeight: 400, color: "var(--ca-text3, #64748B)" }}>(sent in notification email)</span>
                </label>
                <textarea
                  value={reason}
                  onChange={e => setReason(e.target.value)}
                  placeholder="e.g. Thank you for your video review, courtesy credit..."
                  rows={2}
                  className={coachAdminInputClass}
                  style={{ resize: "vertical", marginBottom: 4 }}
                />

                {error && <p style={{ fontSize: 13, color: "#EF4444", marginTop: 6, marginBottom: 0 }}>{error}</p>}

                <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
                  <button onClick={() => setOpen(false)} className={coachAdminGhostButtonClass} style={{ flex: 1 }}>Cancel</button>
                  <button onClick={handleGrant} disabled={loading} className={coachAdminPrimaryButtonClass} style={{ flex: 2 }}>
                    {loading ? "Applying…" : type === "months"
                      ? `Grant ${months} month${months > 1 ? "s" : ""} free`
                      : `Apply ${discountPct}% off for ${discountMonths}mo`}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block", fontSize: 12, fontWeight: 600,
  color: "var(--ca-text2, #334155)", marginBottom: 6,
};
