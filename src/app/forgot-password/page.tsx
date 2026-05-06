"use client";

import Link from "next/link";
import { useState } from "react";
import { ZariLogo } from "@/components/zari-logo";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    if (!email.includes("@")) { setError("Enter a valid email address."); return; }
    setLoading(true); setError(null);
    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json().catch(() => ({}));
    setLoading(false);
    if (!res.ok) { setError(data.error ?? "Something went wrong. Please try again."); return; }
    setSent(true);
  }

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "11px 14px", fontSize: 14, borderRadius: 10,
    border: "1.5px solid #E2E8F0", background: "#fff", color: "#1E293B",
    outline: "none", transition: "border 0.15s", boxSizing: "border-box",
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #F0F4FF 0%, #F8F9FC 40%, #EEF2FF 100%)", display: "flex", flexDirection: "column", fontFamily: "Inter, system-ui, sans-serif" }}>
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div style={{ position: "absolute", width: 500, height: 500, top: -100, left: -100, background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)", borderRadius: "50%" }} />
      </div>

      <div style={{ position: "relative", zIndex: 10, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 32px" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
          <ZariLogo size={30} />
          <span style={{ fontSize: 17, fontWeight: 800, letterSpacing: "-0.02em", background: "linear-gradient(135deg, #1459CC, #1868E8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Zari</span>
        </Link>
        <Link href="/login" style={{ fontSize: 13.5, color: "#64748B", textDecoration: "none", fontWeight: 500 }}>Back to sign in</Link>
      </div>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px 16px 48px", position: "relative", zIndex: 10 }}>
        <div style={{ width: "100%", maxWidth: 420, background: "#fff", borderRadius: 20, boxShadow: "0 4px 24px rgba(0,0,0,0.07)", padding: "36px 36px 32px" }}>
          {sent ? (
            <div style={{ textAlign: "center" }}>
              <div style={{ width: 56, height: 56, borderRadius: 16, background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2" style={{ width: 28, height: 28 }}>
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                </svg>
              </div>
              <h1 style={{ fontSize: 20, fontWeight: 800, color: "#0F172A", margin: "0 0 10px", letterSpacing: "-0.02em" }}>Check your email</h1>
              <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.65, margin: "0 0 24px" }}>
                If an account exists for <strong>{email}</strong>, we&apos;ve sent a password reset link. Check your inbox and spam folder.
              </p>
              <p style={{ fontSize: 13, color: "#94A3B8", margin: "0 0 16px" }}>The link expires in 1 hour.</p>
              <Link href="/login" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "10px 24px", borderRadius: 10, border: "1px solid #E2E8F0", color: "#64748B", textDecoration: "none", fontSize: 13.5, fontWeight: 600 }}>
                Back to sign in
              </Link>
            </div>
          ) : (
            <>
              <div style={{ marginBottom: 24 }}>
                <h1 style={{ fontSize: 22, fontWeight: 800, color: "#0F172A", letterSpacing: "-0.02em", margin: "0 0 6px" }}>Forgot your password?</h1>
                <p style={{ fontSize: 13.5, color: "#64748B", margin: 0 }}>Enter your email and we&apos;ll send you a reset link.</p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Email address</label>
                  <input
                    style={inputStyle} type="email" placeholder="you@example.com"
                    value={email} onChange={e => setEmail(e.target.value)}
                    onKeyDown={e => { if (e.key === "Enter") void submit(); }}
                    onFocus={e => (e.target.style.border = "1.5px solid #2563EB")}
                    onBlur={e => (e.target.style.border = "1.5px solid #E2E8F0")}
                    autoFocus
                  />
                </div>

                {error && <p style={{ fontSize: 13, color: "#DC2626", background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 8, padding: "10px 14px", margin: 0 }}>{error}</p>}

                <button
                  onClick={() => void submit()} disabled={loading}
                  style={{ width: "100%", padding: "12px", borderRadius: 10, border: "none", background: "#2563EB", color: "#fff", fontSize: 14.5, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1 }}
                >
                  {loading ? "Sending…" : "Send reset link"}
                </button>
              </div>

              <div style={{ marginTop: 20, textAlign: "center" }}>
                <Link href="/login" style={{ fontSize: 13.5, color: "#2563EB", textDecoration: "none", fontWeight: 500 }}>Back to sign in</Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
