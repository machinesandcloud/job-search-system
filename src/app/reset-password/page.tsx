"use client";

import Link from "next/link";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import { ZariLogo } from "@/components/zari-logo";

function ResetForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token") ?? "";
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    if (password.length < 8) { setError("Password must be at least 8 characters."); return; }
    if (password !== confirm) { setError("Passwords do not match."); return; }
    if (!token) { setError("Reset token is missing. Please use the link from your email."); return; }
    setLoading(true); setError(null);
    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });
    const data = await res.json().catch(() => ({}));
    setLoading(false);
    if (!res.ok) { setError(data.error ?? "Something went wrong. Please try again."); return; }
    setDone(true);
    setTimeout(() => router.push("/login"), 2500);
  }

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "11px 14px", fontSize: 14, borderRadius: 10,
    border: "1.5px solid #E2E8F0", background: "#fff", color: "#1E293B",
    outline: "none", transition: "border 0.15s", boxSizing: "border-box",
  };

  if (!token) {
    return (
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 52, marginBottom: 16 }}>🔗</div>
        <h1 style={{ fontSize: 20, fontWeight: 800, color: "#0F172A", margin: "0 0 10px" }}>Invalid reset link</h1>
        <p style={{ fontSize: 14, color: "#64748B", margin: "0 0 24px" }}>This link is invalid or has expired. Request a new one.</p>
        <Link href="/forgot-password" style={{ display: "inline-flex", padding: "11px 24px", borderRadius: 10, background: "#2563EB", color: "#fff", textDecoration: "none", fontSize: 14, fontWeight: 700 }}>
          Request new link
        </Link>
      </div>
    );
  }

  if (done) {
    return (
      <div style={{ textAlign: "center" }}>
        <div style={{ width: 56, height: 56, borderRadius: 16, background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.5" style={{ width: 28, height: 28 }}>
            <path d="M20 6L9 17l-5-5"/>
          </svg>
        </div>
        <h1 style={{ fontSize: 20, fontWeight: 800, color: "#0F172A", margin: "0 0 10px" }}>Password updated!</h1>
        <p style={{ fontSize: 14, color: "#64748B" }}>Redirecting you to sign in…</p>
      </div>
    );
  }

  return (
    <>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: "#0F172A", letterSpacing: "-0.02em", margin: "0 0 6px" }}>Set new password</h1>
        <p style={{ fontSize: 13.5, color: "#64748B", margin: 0 }}>Choose a strong password for your Zari account.</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div>
          <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>New password</label>
          <div style={{ position: "relative" }}>
            <input
              style={{ ...inputStyle, paddingRight: 42 }}
              type={showPwd ? "text" : "password"} placeholder="At least 8 characters"
              value={password} onChange={e => setPassword(e.target.value)}
              onFocus={e => (e.target.style.border = "1.5px solid #2563EB")}
              onBlur={e => (e.target.style.border = "1.5px solid #E2E8F0")}
            />
            <button type="button" onClick={() => setShowPwd(p => !p)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#94A3B8", padding: 0 }}>
              {showPwd
                ? <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                : <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              }
            </button>
          </div>
        </div>
        <div>
          <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Confirm password</label>
          <input
            style={inputStyle} type="password" placeholder="Repeat new password"
            value={confirm} onChange={e => setConfirm(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") void submit(); }}
            onFocus={e => (e.target.style.border = "1.5px solid #2563EB")}
            onBlur={e => (e.target.style.border = "1.5px solid #E2E8F0")}
          />
        </div>

        {error && <p style={{ fontSize: 13, color: "#DC2626", background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 8, padding: "10px 14px", margin: 0 }}>{error}</p>}

        <button
          onClick={() => void submit()} disabled={loading}
          style={{ width: "100%", padding: "12px", borderRadius: 10, border: "none", background: "#2563EB", color: "#fff", fontSize: 14.5, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1 }}
        >
          {loading ? "Saving…" : "Set new password"}
        </button>
      </div>
    </>
  );
}

export default function ResetPasswordPage() {
  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #F0F4FF 0%, #F8F9FC 40%, #EEF2FF 100%)", display: "flex", flexDirection: "column", fontFamily: "Inter, system-ui, sans-serif" }}>
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div style={{ position: "absolute", width: 500, height: 500, top: -100, left: -100, background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)", borderRadius: "50%" }} />
      </div>

      <div style={{ position: "relative", zIndex: 10, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 32px" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
          <ZariLogo size={30} />
          <span style={{ fontSize: 17, fontWeight: 800, letterSpacing: "-0.02em", background: "linear-gradient(135deg, #4F46E5, #7C3AED)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Zari</span>
        </Link>
      </div>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px 16px 48px", position: "relative", zIndex: 10 }}>
        <div style={{ width: "100%", maxWidth: 420, background: "#fff", borderRadius: 20, boxShadow: "0 4px 24px rgba(0,0,0,0.07)", padding: "36px 36px 32px" }}>
          <Suspense fallback={<div style={{ textAlign: "center", color: "#94A3B8", fontSize: 14 }}>Loading…</div>}>
            <ResetForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
