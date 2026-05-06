"use client";

import Link from "next/link";
import { useEffect } from "react";
import { ZariLogo } from "@/components/zari-logo";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #F0F4FF 0%, #F8F9FC 40%, #EEF2FF 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "Inter, system-ui, sans-serif", padding: "24px" }}>
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div style={{ position: "absolute", width: 500, height: 500, top: -100, left: -100, background: "radial-gradient(circle, rgba(239,68,68,0.07) 0%, transparent 70%)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", width: 400, height: 400, bottom: -80, right: -80, background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)", borderRadius: "50%" }} />
      </div>

      <div style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: 480, background: "#fff", borderRadius: 24, boxShadow: "0 4px 40px rgba(0,0,0,0.08)", padding: "48px 40px", textAlign: "center" }}>
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none", marginBottom: 32 }}>
          <ZariLogo size={28} />
          <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: "-0.02em", background: "linear-gradient(135deg, #1459CC, #1868E8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Zari</span>
        </Link>

        <div style={{ width: 56, height: 56, borderRadius: 16, background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.18)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" style={{ width: 26, height: 26 }}>
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </div>

        <h1 style={{ fontSize: 22, fontWeight: 800, color: "#0F172A", letterSpacing: "-0.03em", margin: "0 0 12px" }}>Something went wrong</h1>
        <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.65, margin: "0 0 32px" }}>
          An unexpected error occurred. Our team has been notified. You can try again or go back to the dashboard.
        </p>

        {error.digest && (
          <p style={{ fontSize: 11, color: "#94A3B8", fontFamily: "monospace", marginBottom: 24 }}>Error ID: {error.digest}</p>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <button
            onClick={reset}
            style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "12px 24px", borderRadius: 12, background: "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)", color: "#fff", border: "none", fontSize: 14, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 16px rgba(37,99,235,0.35)" }}
          >
            Try again
          </button>
          <Link href="/dashboard" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "12px 24px", borderRadius: 12, border: "1px solid #E2E8F0", color: "#64748B", textDecoration: "none", fontSize: 14, fontWeight: 500 }}>
            Go to dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
