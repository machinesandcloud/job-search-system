"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function CancelSubscriptionForm({ planName, renewalDate }: { planName: string; renewalDate: string | null }) {
  const router = useRouter();
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  async function handleCancel() {
    if (!confirmed) { setError("Please check the confirmation box."); return; }
    setLoading(true); setError(null);
    const res = await fetch("/api/billing/cancel", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reason }),
    });
    const data = await res.json().catch(() => ({}));
    setLoading(false);
    if (!res.ok) { setError(data.error ?? "Failed to cancel. Please try again or contact support."); return; }
    router.push("/settings?cancelled=1");
  }

  return (
    <div>
      <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #E2E8F0", padding: "20px 22px", marginBottom: 16 }}>
        <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 8 }}>
          Why are you cancelling? <span style={{ fontWeight: 400, color: "#94A3B8" }}>(optional)</span>
        </label>
        <textarea
          value={reason}
          onChange={e => setReason(e.target.value)}
          placeholder="Too expensive, not using it, missing a feature…"
          style={{ width: "100%", padding: "11px 14px", fontSize: 13.5, borderRadius: 10, border: "1.5px solid #E2E8F0", background: "#fff", color: "#1E293B", outline: "none", resize: "vertical" as const, minHeight: 80, fontFamily: "inherit", boxSizing: "border-box" as const }}
          onFocus={e => (e.target.style.border = "1.5px solid #2563EB")}
          onBlur={e => (e.target.style.border = "1.5px solid #E2E8F0")}
        />
      </div>

      <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", marginBottom: 20 }}>
        <input
          type="checkbox"
          checked={confirmed}
          onChange={e => setConfirmed(e.target.checked)}
          style={{ width: 16, height: 16, marginTop: 2, flexShrink: 0, cursor: "pointer", accentColor: "#2563EB" }}
        />
        <span style={{ fontSize: 13.5, color: "#374151", lineHeight: 1.55 }}>
          I understand that my <strong>{planName}</strong> subscription will be cancelled and my access will end
          {renewalDate ? ` on ${renewalDate}` : " at the end of this billing period"}.
        </span>
      </label>

      {error && (
        <p style={{ fontSize: 13, color: "#DC2626", background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 8, padding: "10px 14px", marginBottom: 16 }}>{error}</p>
      )}

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" as const }}>
        <button
          onClick={() => void handleCancel()} disabled={loading}
          style={{ padding: "11px 22px", borderRadius: 10, border: "none", background: loading ? "#94A3B8" : "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)", color: "#fff", fontSize: 13.5, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer" }}
        >
          {loading ? "Cancelling…" : "Cancel subscription"}
        </button>
        <a href="/settings" style={{ padding: "11px 22px", borderRadius: 10, border: "1px solid #E2E8F0", background: "#fff", color: "#64748B", fontSize: 13.5, fontWeight: 600, textDecoration: "none", display: "inline-flex", alignItems: "center" }}>
          Keep my subscription
        </a>
      </div>
    </div>
  );
}
