"use client";

import { useState } from "react";

export function BillingPortalButton({ label, description }: { label: string; description: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function open() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/billing/portal", { method: "POST" });
      const data = await res.json().catch(() => ({})) as { url?: string; error?: string };
      if (data.url) { window.location.href = data.url; return; }
      setError(data.error ?? "Could not open billing portal. Please try again.");
    } catch {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  }

  return (
    <div>
      <button
        onClick={() => void open()}
        disabled={loading}
        style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 20px", background: loading ? "#F1F5F9" : "#fff", borderRadius: 14, border: "1px solid #E2E8F0", cursor: loading ? "not-allowed" : "pointer", textAlign: "left", width: "100%", opacity: loading ? 0.7 : 1, transition: "all 0.15s" }}
      >
        <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(37,99,235,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <svg viewBox="0 0 20 20" fill="none" stroke="#2563EB" strokeWidth="1.6" style={{ width: 18, height: 18 }}>
            <rect x="1" y="5" width="18" height="12" rx="2"/><path d="M1 9h18"/>
          </svg>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#0F172A", marginBottom: 2 }}>{label}</div>
          <div style={{ fontSize: 13, color: "#64748B" }}>{description}</div>
        </div>
        {loading
          ? <div style={{ width: 16, height: 16, borderRadius: "50%", border: "2px solid #E2E8F0", borderTopColor: "#2563EB", animation: "spin 0.7s linear infinite", flexShrink: 0 }} />
          : <svg viewBox="0 0 16 16" fill="none" stroke="#CBD5E1" strokeWidth="2" style={{ width: 16, height: 16, flexShrink: 0 }}><path d="M6 4l4 4-4 4"/></svg>
        }
      </button>
      {error && (
        <p style={{ fontSize: 13, color: "#DC2626", background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 8, padding: "8px 12px", marginTop: 8 }}>{error}</p>
      )}
    </div>
  );
}
