"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ZariLogo } from "@/components/zari-logo";
import { ZariAvatarDemo } from "@/components/zari-avatar";

type AuthMode = "login" | "signup";

/* ─── Floating achievement badges (left panel) ─── */
const ACHIEVEMENTS = [
  { icon: "🎯", text: "Marcus T. got hired",   sub: "Senior PM · 6 weeks",      anim: "achievement-float",   delay: "0s" },
  { icon: "📈", text: "Resume 72 → 94",         sub: "After first session",       anim: "achievement-float-2", delay: "0.8s" },
  { icon: "📬", text: "4 interview requests",  sub: "In one week",               anim: "achievement-float-3", delay: "1.4s" },
  { icon: "🎙", text: "Voice interview prep",  sub: "Real-time feedback",         anim: "achievement-float",   delay: "0.5s" },
];

/* ─── OTP box sub-component ─── */
function OtpInput({ value, onChange, onKeyDown, inputRef, filled }: {
  value: string;
  onChange: (v: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
  filled: boolean;
}) {
  return (
    <input
      ref={inputRef as React.RefObject<HTMLInputElement>}
      type="text"
      inputMode="numeric"
      maxLength={1}
      value={value}
      onChange={(e) => onChange(e.target.value.replace(/\D/, ""))}
      onKeyDown={onKeyDown}
      className={`otp-box${filled ? " filled" : ""}`}
    />
  );
}

/* ─── Step indicator ─── */
function StepDots({ step, total }: { step: number; total: number }) {
  return (
    <div className="mb-7 flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="h-1.5 rounded-full transition-all duration-300"
          style={{
            width: i === step ? 24 : 8,
            background: i <= step ? "var(--brand)" : "var(--border)",
          }}
        />
      ))}
      <span className="ml-2 text-[11px] font-semibold text-[var(--muted)]">
        Step {step + 1} of {total}
      </span>
    </div>
  );
}

/* ════════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════════ */
export function MvpAuthForm({ mode }: { mode: AuthMode }) {
  const router = useRouter();
  const fieldCls = "w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3.5 text-[14px] text-[var(--ink)] placeholder:text-[var(--muted)] outline-none transition-all focus:border-[var(--brand)] focus:ring-4 focus:ring-[var(--brand-glow)]";

  // ── Login (single step) ──────────────────────────────────────────────────
  const [email,    setEmail]    = useState(mode === "login" ? "steve@askiatech.com" : "");
  const [password, setPassword] = useState(mode === "login" ? "demo12345" : "");
  const [error,    setError]    = useState<string | null>(null);
  const [loading,  setLoading]  = useState(false);

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

  // ── Signup wizard ────────────────────────────────────────────────────────
  const SIGNUP_STEPS = 3;
  const [step,      setStep]      = useState(0); // 0=email, 1=otp, 2=profile
  const [signEmail, setSignEmail] = useState("");
  const [otp,       setOtp]       = useState<string[]>(Array(6).fill(""));
  const [firstName, setFirstName] = useState("");
  const [lastName,  setLastName]  = useState("");
  const [signPwd,   setSignPwd]   = useState("");
  const [signErr,   setSignErr]   = useState<string | null>(null);
  const [signLoad,  setSignLoad]  = useState(false);
  const [otpSent,   setOtpSent]   = useState(false);

  const otp0 = useRef<HTMLInputElement>(null);
  const otp1 = useRef<HTMLInputElement>(null);
  const otp2 = useRef<HTMLInputElement>(null);
  const otp3 = useRef<HTMLInputElement>(null);
  const otp4 = useRef<HTMLInputElement>(null);
  const otp5 = useRef<HTMLInputElement>(null);
  const otpRefs = [otp0, otp1, otp2, otp3, otp4, otp5];

  /* ── Step 0: submit email → "send OTP" (mocked) ── */
  async function handleEmailStep() {
    if (!signEmail.includes("@")) { setSignErr("Enter a valid email address."); return; }
    setSignLoad(true); setSignErr(null);
    // Simulate OTP send (in production: POST /api/auth/otp/send)
    await new Promise((r) => setTimeout(r, 800));
    setOtpSent(true);
    setSignLoad(false);
    setStep(1);
    setTimeout(() => otpRefs[0].current?.focus(), 100);
  }

  /* ── Step 1: verify OTP (mocked — any 6 digits pass) ── */
  async function handleOtpStep() {
    const code = otp.join("");
    if (code.length < 6) { setSignErr("Enter all 6 digits."); return; }
    setSignLoad(true); setSignErr(null);
    await new Promise((r) => setTimeout(r, 600));
    setSignLoad(false);
    setStep(2);
  }

  /* ── Step 2: create account ── */
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
    router.push("/onboarding/plan");
    router.refresh();
  }

  /* ── OTP box keyboard handling ── */
  function handleOtpChange(idx: number, val: string) {
    const next = [...otp];
    next[idx] = val;
    setOtp(next);
    if (val && idx < 5) setTimeout(() => otpRefs[idx + 1].current?.focus(), 10);
    if (next.every((d) => d !== "") && next.join("").length === 6) {
      // auto-advance
      setTimeout(() => void handleOtpStep(), 200);
    }
  }
  function handleOtpKey(idx: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      otpRefs[idx - 1].current?.focus();
    }
  }

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="flex min-h-screen w-full overflow-hidden">

      {/* ══════════════════════════════════════
          LEFT — dark cinematic panel
      ══════════════════════════════════════ */}
      <div className="noise-overlay relative hidden w-[52%] flex-col justify-between overflow-hidden p-12 lg:flex zari-mesh">

        {/* Animated orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div style={{ position:"absolute", width:"600px", height:"600px", top:"-8%", left:"-10%", background:"var(--brand)", opacity:.12, filter:"blur(150px)", borderRadius:"50%", animation:"float-a 18s ease-in-out infinite" }} />
          <div style={{ position:"absolute", width:"500px", height:"500px", top:"-5%", right:"-8%", background:"var(--cyan)", opacity:.07, filter:"blur(130px)", borderRadius:"50%", animation:"float-b 22s ease-in-out infinite" }} />
          <div style={{ position:"absolute", width:"400px", height:"400px", bottom:0, left:"30%", background:"var(--purple)", opacity:.09, filter:"blur(110px)", borderRadius:"50%", animation:"float-c 16s ease-in-out infinite" }} />
        </div>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="hero-glow-line absolute left-0 right-0 top-0" />

        {/* Logo */}
        <div className="relative z-10">
          <Link href="/" className="group inline-flex items-center gap-2.5">
            <ZariLogo size={38} />
            <div className="leading-none">
              <span
                style={{
                  fontSize: 16,
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  background: "linear-gradient(135deg, #A78BFA 0%, #22D3EE 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Zari
              </span>
              <span className="ml-1 text-[16px] font-medium text-white/50">AI Coach</span>
            </div>
          </Link>
        </div>

        {/* Avatar + headline */}
        <div className="relative z-10 flex flex-col items-center text-center">
          <ZariAvatarDemo size={130} />
          <h1 className="mt-8 text-[2.6rem] font-extrabold leading-[1.06] tracking-[-0.035em] text-white">
            {mode === "login"
              ? "Your coach is waiting for you."
              : "Meet your AI career coach."}
          </h1>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/45">
            {mode === "login"
              ? "Resume reviews, LinkedIn rewrites, mock interviews, and coaching memory that builds every session."
              : "Voice coaching, live avatar, document uploads, and session memory that compounds every time you train."}
          </p>

          {/* Achievement badges */}
          <div className="mt-8 grid w-full max-w-sm grid-cols-2 gap-3">
            {ACHIEVEMENTS.map((a, i) => (
              <div
                key={i}
                className="glass rounded-2xl px-4 py-3"
                style={{ animation:`${a.anim} ${3.2 + i * 0.6}s ease-in-out ${a.delay} infinite` }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg leading-none">{a.icon}</span>
                  <div>
                    <p className="text-[11.5px] font-semibold leading-tight text-white">{a.text}</p>
                    <p className="mt-0.5 text-[10px] text-white/40">{a.sub}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom testimonial */}
        <div className="relative z-10">
          <div className="glass rounded-2xl p-5">
            <div className="mb-2 flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} className="h-3.5 w-3.5 fill-[var(--gold)]" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-[13px] leading-6 italic text-white/65">
              &ldquo;One session and I had a completely rewritten resume and a real action plan. The specificity was unlike anything I&apos;d seen from an AI tool.&rdquo;
            </p>
            <div className="mt-3 flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-black text-white" style={{ background:"var(--brand)" }}>AR</div>
              <div>
                <p className="text-[12px] font-semibold text-white/75">Aisha R.</p>
                <p className="text-[10px] text-white/35">Software Engineer · L5 offer in 6 weeks</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          RIGHT — form panel
      ══════════════════════════════════════ */}
      <div className="flex flex-1 flex-col items-center justify-center bg-[var(--bg)] px-6 py-16 lg:px-14">

        {/* Mobile logo */}
        <div className="mb-8 flex items-center gap-2.5 lg:hidden">
          <ZariLogo size={32} />
          <span
            style={{
              fontSize: 15,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              background: "linear-gradient(135deg, #7C3AED, #22D3EE)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Zari AI Coach
          </span>
        </div>

        <div className="w-full max-w-[400px]">

          {/* ── LOGIN FORM ── */}
          {mode === "login" && (
            <>
              <div className="mb-8">
                <h2 className="text-[2rem] font-extrabold tracking-[-0.03em] text-[var(--ink)]">
                  Welcome back
                </h2>
                <p className="mt-2 text-[14px] text-[var(--muted)]">
                  New here?{" "}
                  <Link href="/signup" className="font-semibold text-[var(--brand)] hover:underline">
                    Sign up free
                  </Link>
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-[12px] font-semibold text-[var(--ink-2)]">Email</label>
                  <input className={fieldCls} type="email" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") void submitLogin(); }} />
                </div>
                <div>
                  <label className="mb-1.5 block text-[12px] font-semibold text-[var(--ink-2)]">Password</label>
                  <input className={fieldCls} type="password" placeholder="Your password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") void submitLogin(); }} />
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-[var(--border)] bg-white px-4 py-3 shadow-[var(--shadow)]">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">Demo account · pre-filled</p>
                <div className="mt-1.5 flex justify-between text-[12.5px]">
                  <span className="text-[var(--muted)]">steve@askiatech.com</span>
                  <span className="font-mono font-semibold text-[var(--ink-2)]">demo12345</span>
                </div>
              </div>

              {error && <p className="mt-4 rounded-xl bg-[var(--danger-soft)] px-4 py-3 text-sm text-[var(--danger)]">{error}</p>}

              <button
                onClick={() => void submitLogin()}
                disabled={loading}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--brand)] py-4 text-[14.5px] font-semibold text-white shadow-[var(--shadow-brand)] transition-all hover:-translate-y-0.5 hover:bg-[var(--brand-hover)] disabled:opacity-60"
              >
                {loading ? <><span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />Signing in…</> : "Continue to dashboard →"}
              </button>
            </>
          )}

          {/* ── SIGNUP WIZARD ── */}
          {mode === "signup" && (
            <>
              <div className="mb-6">
                <h2 className="text-[2rem] font-extrabold tracking-[-0.03em] text-[var(--ink)]">
                  {step === 0 && "Create your account"}
                  {step === 1 && "Check your inbox"}
                  {step === 2 && "Almost there"}
                </h2>
                <p className="mt-2 text-[14px] text-[var(--muted)]">
                  {step === 0 && (<>Already have one?{" "}<Link href="/login" className="font-semibold text-[var(--brand)] hover:underline">Sign in</Link></>)}
                  {step === 1 && `We sent a 6-digit code to ${signEmail}`}
                  {step === 2 && "Set your name and password to finish."}
                </p>
              </div>

              <StepDots step={step} total={SIGNUP_STEPS} />

              {/* Step 0: Email */}
              {step === 0 && (
                <div className="space-y-4">
                  <div>
                    <label className="mb-1.5 block text-[12px] font-semibold text-[var(--ink-2)]">Email address</label>
                    <input
                      className={fieldCls}
                      type="email"
                      placeholder="you@email.com"
                      value={signEmail}
                      onChange={(e) => setSignEmail(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter") void handleEmailStep(); }}
                      autoFocus
                    />
                  </div>
                </div>
              )}

              {/* Step 1: OTP */}
              {step === 1 && (
                <div>
                  <div className="flex justify-between gap-2">
                    {otp.map((digit, idx) => (
                      <OtpInput
                        key={idx}
                        value={digit}
                        onChange={(v) => handleOtpChange(idx, v)}
                        onKeyDown={(e) => handleOtpKey(idx, e)}
                        inputRef={otpRefs[idx]}
                        filled={digit !== ""}
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    className="mt-3 text-[12px] text-[var(--brand)] hover:underline"
                    onClick={() => { setOtp(Array(6).fill("")); setStep(0); }}
                  >
                    Wrong email? Go back
                  </button>
                </div>
              )}

              {/* Step 2: Profile */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="mb-1.5 block text-[12px] font-semibold text-[var(--ink-2)]">First name</label>
                      <input className={fieldCls} placeholder="First" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-[12px] font-semibold text-[var(--ink-2)]">Last name</label>
                      <input className={fieldCls} placeholder="Last" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[12px] font-semibold text-[var(--ink-2)]">Password</label>
                    <input
                      className={fieldCls}
                      type="password"
                      placeholder="At least 8 characters"
                      value={signPwd}
                      onChange={(e) => setSignPwd(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter") void handleProfileStep(); }}
                    />
                  </div>
                </div>
              )}

              {signErr && <p className="mt-4 rounded-xl bg-[var(--danger-soft)] px-4 py-3 text-sm text-[var(--danger)]">{signErr}</p>}

              <button
                onClick={() => {
                  if (step === 0) void handleEmailStep();
                  else if (step === 1) void handleOtpStep();
                  else void handleProfileStep();
                }}
                disabled={signLoad}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--brand)] py-4 text-[14.5px] font-semibold text-white shadow-[var(--shadow-brand)] transition-all hover:-translate-y-0.5 hover:bg-[var(--brand-hover)] disabled:opacity-60"
              >
                {signLoad ? (
                  <><span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />Working…</>
                ) : (
                  <>
                    {step === 0 && "Send verification code →"}
                    {step === 1 && "Verify code →"}
                    {step === 2 && "Create account →"}
                  </>
                )}
              </button>
            </>
          )}

          <div className="mt-6 flex items-center justify-center gap-4 text-[11.5px] text-[var(--muted)]">
            {["Free to start", "Secure & private", "No card required"].map((s) => (
              <div key={s} className="flex items-center gap-1.5">
                <svg className="h-3 w-3 text-[var(--brand)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><polyline points="20,6 9,17 4,12" /></svg>
                {s}
              </div>
            ))}
          </div>
        </div>

        <Link href="/" className="mt-10 flex items-center gap-1.5 text-[12.5px] text-[var(--muted)] transition-colors hover:text-[var(--ink)]">
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
          Back to Zari AI Coach
        </Link>
      </div>
    </div>
  );
}
