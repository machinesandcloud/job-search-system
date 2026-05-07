"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ZariLogo } from "@/components/zari-logo";

type AuthMode = "login" | "signup";

export function MvpAuthForm({ mode, authError = null }: { mode: AuthMode; authError?: string | null }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedPlan = `${searchParams.get("plan") || ""}`.trim().toLowerCase();
  const onboardingPlanHref = selectedPlan ? `/onboarding/plan?plan=${encodeURIComponent(selectedPlan)}` : "/onboarding/plan";

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "11px 14px", fontSize: 14, borderRadius: 10,
    border: "1.5px solid #E2E8F0", background: "#fff", color: "#1E293B",
    outline: "none", transition: "border 0.15s", boxSizing: "border-box",
  };

  // ── Login ────────────────────────────────────────────────────────────────
  const [email,       setEmail]       = useState("");
  const [password,    setPassword]    = useState("");
  const [showPwd,     setShowPwd]     = useState(false);
  const [error,       setError]       = useState<string | null>(null);
  const [loading,     setLoading]     = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  async function submitLogin() {
    setLoading(true); setError(null);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const payload = await res.json().catch(() => ({}));
    if (!res.ok) { setError(payload.error || "Unable to sign in."); setLoading(false); return; }
    window.location.href = "/dashboard";
  }

  function startGoogleAuth(targetMode: AuthMode) {
    setError(null);
    setSignErr(null);
    setGoogleLoading(true);
    const next = targetMode === "signup" ? onboardingPlanHref : "/dashboard";
    window.location.href = `/api/auth/google/start?mode=${targetMode}&next=${encodeURIComponent(next)}`;
  }

  // ── Signup wizard ────────────────────────────────────────────────────────
  const [step,      setStep]      = useState(0);
  const [signEmail, setSignEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName,  setLastName]  = useState("");
  const [signPwd,   setSignPwd]   = useState("");
  const [showSignPwd, setShowSignPwd] = useState(false);
  const [signErr,   setSignErr]   = useState<string | null>(null);
  const [signLoad,  setSignLoad]  = useState(false);

  async function handleEmailStep() {
    if (!signEmail.includes("@")) { setSignErr("Enter a valid email address."); return; }
    setSignErr(null);
    setStep(1);
  }

  async function handleProfileStep() {
    if (!firstName.trim() || !lastName.trim()) { setSignErr("Enter your full name."); return; }
    if (signPwd.length < 8) { setSignErr("Password must be at least 8 characters."); return; }
    setSignLoad(true); setSignErr(null);
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, email: signEmail, password: signPwd }),
    });
    const payload = await res.json().catch(() => ({}));
    if (!res.ok) { setSignErr(payload.error || "Unable to create account."); setSignLoad(false); return; }
    router.push(onboardingPlanHref);
    router.refresh();
  }

  const isLogin = mode === "login";

  const title = isLogin ? "Welcome back" : step === 1 ? "Complete your account" : "Create account";
  const subtitle = isLogin
    ? "Sign in to continue your job search"
    : step === 1 ? "Set your name and password to finish."
    : "Start your AI-powered job search";

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #F0F4FF 0%, #F8F9FC 40%, #EEF2FF 100%)", display: "flex", flexDirection: "column", fontFamily: "Inter, system-ui, sans-serif" }}>

      {/* Ambient blobs */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div style={{ position: "absolute", width: 500, height: 500, top: -100, left: -100, background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", width: 400, height: 400, bottom: -80, right: -80, background: "radial-gradient(circle, rgba(139,92,246,0.10) 0%, transparent 70%)", borderRadius: "50%" }} />
      </div>

      {/* Top nav */}
      <div style={{ position: "relative", zIndex: 10, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "22px 32px" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <ZariLogo size={38} />
          <span style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1, color: "#0A0A0F" }}>
            Zari
          </span>
        </Link>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13.5, color: "#64748B", textDecoration: "none", fontWeight: 500 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
          Back to Home
        </Link>
      </div>

      {/* Card */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px 16px 48px", position: "relative", zIndex: 10 }}>
        <div style={{ width: "100%", maxWidth: 420, background: "#fff", borderRadius: 20, boxShadow: "0 4px 24px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04)", padding: "36px 36px 32px" }}>

          {/* Heading */}
          <div style={{ marginBottom: 24, textAlign: "center" }}>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: "#0F172A", letterSpacing: "-0.02em", margin: "0 0 6px" }}>{title}</h1>
            <p style={{ fontSize: 13.5, color: "#64748B", margin: 0 }}>{subtitle}</p>
          </div>

          {/* Google button — login and signup step 0 only */}
          {(isLogin || step === 0) && (
            <>
              <button
                type="button"
                disabled={googleLoading}
                onClick={() => startGoogleAuth(isLogin ? "login" : "signup")}
                style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "11px 16px", borderRadius: 10, border: "1.5px solid #E2E8F0", background: "#fff", fontSize: 14, fontWeight: 600, color: "#334155", cursor: googleLoading ? "not-allowed" : "pointer", marginBottom: 18, transition: "background 0.15s, border-color 0.15s", opacity: googleLoading ? 0.75 : 1 }}
                onMouseOver={e => { if (!googleLoading) e.currentTarget.style.background = "#F8FAFC"; }}
                onMouseOut={e => { e.currentTarget.style.background = "#fff"; }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                {googleLoading ? "Redirecting to Google…" : "Continue with Google"}
              </button>

              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
                <div style={{ flex: 1, height: 1, background: "#E2E8F0" }} />
                <span style={{ fontSize: 12, color: "#94A3B8", whiteSpace: "nowrap" }}>Or continue with email</span>
                <div style={{ flex: 1, height: 1, background: "#E2E8F0" }} />
              </div>
            </>
          )}

          {/* ── LOGIN FORM ── */}
          {isLogin && (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Email</label>
                <input
                  style={inputStyle} type="email" placeholder="you@example.com"
                  value={email} onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter") void submitLogin(); }}
                  onFocus={e => (e.target.style.border = "1.5px solid #2563EB")}
                  onBlur={e => (e.target.style.border = "1.5px solid #E2E8F0")}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Password</label>
                <div style={{ position: "relative" }}>
                  <input
                    style={{ ...inputStyle, paddingRight: 42 }}
                    type={showPwd ? "text" : "password"} placeholder="Enter your password"
                    value={password} onChange={e => setPassword(e.target.value)}
                    onKeyDown={e => { if (e.key === "Enter") void submitLogin(); }}
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

              {(error || authError) && <p style={{ fontSize: 13, color: "#DC2626", background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 8, padding: "10px 14px", margin: 0 }}>{error || authError}</p>}

              <button
                onClick={() => void submitLogin()} disabled={loading}
                style={{ width: "100%", padding: "12px", borderRadius: 10, border: "none", background: "#2563EB", color: "#fff", fontSize: 14.5, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1, marginTop: 4, transition: "background 0.15s" }}
                onMouseOver={e => { if (!loading) e.currentTarget.style.background = "#1D4ED8"; }}
                onMouseOut={e => { e.currentTarget.style.background = "#2563EB"; }}
              >
                {loading ? "Signing in…" : "Sign In"}
              </button>

              <div style={{ textAlign: "center" }}>
                <Link href="/forgot-password" style={{ fontSize: 13.5, color: "#2563EB", textDecoration: "none", fontWeight: 500 }}>Forgot your password?</Link>
              </div>
            </div>
          )}

          {/* ── SIGNUP WIZARD ── */}
          {!isLogin && (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

              {/* Step 0: email */}
              {step === 0 && (
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Email address</label>
                  <input
                    style={inputStyle} type="email" placeholder="you@example.com"
                    value={signEmail} onChange={e => setSignEmail(e.target.value)}
                    onKeyDown={e => { if (e.key === "Enter") void handleEmailStep(); }}
                    onFocus={e => (e.target.style.border = "1.5px solid #2563EB")}
                    onBlur={e => (e.target.style.border = "1.5px solid #E2E8F0")}
                    autoFocus
                  />
                </div>
              )}

              {/* Step 1: profile */}
              {step === 1 && (
                <>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    <div>
                      <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>First name</label>
                      <input style={inputStyle} placeholder="First" value={firstName} onChange={e => setFirstName(e.target.value)}
                        onFocus={e => (e.target.style.border = "1.5px solid #2563EB")} onBlur={e => (e.target.style.border = "1.5px solid #E2E8F0")} />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Last name</label>
                      <input style={inputStyle} placeholder="Last" value={lastName} onChange={e => setLastName(e.target.value)}
                        onFocus={e => (e.target.style.border = "1.5px solid #2563EB")} onBlur={e => (e.target.style.border = "1.5px solid #E2E8F0")} />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Password</label>
                    <div style={{ position: "relative" }}>
                      <input
                        style={{ ...inputStyle, paddingRight: 42 }}
                        type={showSignPwd ? "text" : "password"} placeholder="At least 8 characters"
                        value={signPwd} onChange={e => setSignPwd(e.target.value)}
                        onKeyDown={e => { if (e.key === "Enter") void handleProfileStep(); }}
                        onFocus={e => (e.target.style.border = "1.5px solid #2563EB")}
                        onBlur={e => (e.target.style.border = "1.5px solid #E2E8F0")}
                      />
                      <button type="button" onClick={() => setShowSignPwd(p => !p)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#94A3B8", padding: 0 }}>
                        {showSignPwd
                          ? <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                          : <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                        }
                      </button>
                    </div>
                  </div>
                  <button type="button" onClick={() => setStep(0)} style={{ fontSize: 12.5, color: "#2563EB", background: "none", border: "none", cursor: "pointer", padding: 0, textAlign: "left" }}>
                    Change email
                  </button>
                </>
              )}

              {(signErr || authError) && <p style={{ fontSize: 13, color: "#DC2626", background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 8, padding: "10px 14px", margin: 0 }}>{signErr || authError}</p>}

              <button
                onClick={() => { if (step === 0) void handleEmailStep(); else void handleProfileStep(); }}
                disabled={signLoad}
                style={{ width: "100%", padding: "12px", borderRadius: 10, border: "none", background: "#2563EB", color: "#fff", fontSize: 14.5, fontWeight: 700, cursor: signLoad ? "not-allowed" : "pointer", opacity: signLoad ? 0.7 : 1, marginTop: 4, transition: "background 0.15s" }}
                onMouseOver={e => { if (!signLoad) e.currentTarget.style.background = "#1D4ED8"; }}
                onMouseOut={e => { e.currentTarget.style.background = "#2563EB"; }}
              >
                {signLoad ? "Working…" : step === 0 ? "Continue" : "Create account"}
              </button>
            </div>
          )}

          {/* Footer links */}
          <div style={{ marginTop: 20, textAlign: "center" }}>
            {isLogin ? (
              <>
                <p style={{ fontSize: 12.5, color: "#94A3B8", margin: "0 0 8px" }}>
                  By signing in, you agree to our{" "}
                  <Link href="#" style={{ color: "#2563EB", textDecoration: "none" }}>Terms of Service</Link>
                  {" "}and{" "}
                  <Link href="#" style={{ color: "#2563EB", textDecoration: "none" }}>Privacy Policy</Link>
                </p>
                <p style={{ fontSize: 13.5, color: "#64748B", margin: 0 }}>
                  Don&apos;t have an account?{" "}
                  <Link href="/signup" style={{ color: "#2563EB", textDecoration: "none", fontWeight: 600 }}>Sign up</Link>
                </p>
              </>
            ) : (
              <>
                <p style={{ fontSize: 12.5, color: "#94A3B8", margin: "0 0 8px" }}>
                  By creating an account, you agree to our{" "}
                  <Link href="/terms" style={{ color: "#2563EB", textDecoration: "none" }}>Terms of Service</Link>
                  {" "}and{" "}
                  <Link href="/privacy" style={{ color: "#2563EB", textDecoration: "none" }}>Privacy Policy</Link>
                </p>
                <p style={{ fontSize: 13.5, color: "#64748B", margin: 0 }}>
                  Already have an account?{" "}
                  <Link href="/login" style={{ color: "#2563EB", textDecoration: "none", fontWeight: 600 }}>Sign in</Link>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
