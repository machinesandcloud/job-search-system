"use client";

export function CancelledBanner({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <div style={{ background: "rgba(5,150,105,0.08)", border: "1px solid rgba(5,150,105,0.25)", borderRadius: 12, padding: "14px 18px", marginBottom: 28, display: "flex", alignItems: "center", gap: 12 }}>
      <svg viewBox="0 0 20 20" fill="none" stroke="#059669" strokeWidth="1.8" style={{ width: 20, height: 20, flexShrink: 0 }}>
        <path d="M7 10l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="10" cy="10" r="8"/>
      </svg>
      <span style={{ fontSize: 14, fontWeight: 600, color: "#065F46" }}>Your subscription has been cancelled. You'll keep access until your billing period ends.</span>
    </div>
  );
}
