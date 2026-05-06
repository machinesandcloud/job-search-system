"use client";

import { useEffect } from "react";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "Inter, system-ui, sans-serif", background: "linear-gradient(135deg, #F0F4FF 0%, #F8F9FC 40%, #EEF2FF 100%)", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", boxSizing: "border-box" }}>
        <div style={{ width: "100%", maxWidth: 480, background: "#fff", borderRadius: 24, boxShadow: "0 4px 40px rgba(0,0,0,0.08)", padding: "48px 40px", textAlign: "center" }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.18)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" style={{ width: 26, height: 26 }}>
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          </div>

          <h1 style={{ fontSize: 22, fontWeight: 800, color: "#0F172A", letterSpacing: "-0.03em", margin: "0 0 12px" }}>Something went wrong</h1>
          <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.65, margin: "0 0 32px" }}>
            A critical error occurred. Please try refreshing the page.
          </p>

          {error.digest && (
            <p style={{ fontSize: 11, color: "#94A3B8", fontFamily: "monospace", marginBottom: 24 }}>Error ID: {error.digest}</p>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <button
              onClick={reset}
              style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "12px 24px", borderRadius: 12, background: "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)", color: "#fff", border: "none", fontSize: 14, fontWeight: 700, cursor: "pointer" }}
            >
              Try again
            </button>
            <a href="/" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "12px 24px", borderRadius: 12, border: "1px solid #E2E8F0", color: "#64748B", textDecoration: "none", fontSize: 14, fontWeight: 500 }}>
              Go to home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
