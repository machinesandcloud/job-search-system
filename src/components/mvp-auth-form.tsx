"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

type AuthMode = "login" | "signup";

const ACHIEVEMENTS = [
  { emoji: "🎉", text: "Marcus T. got hired",    sub: "Senior PM · 6 weeks",     anim: "achievement-float",   delay: "0s" },
  { emoji: "📈", text: "Resume 72 → 94",          sub: "After first session",      anim: "achievement-float-2", delay: "0.8s" },
  { emoji: "📬", text: "4 interview requests",   sub: "In one week",              anim: "achievement-float-3", delay: "1.4s" },
  { emoji: "👀", text: "LinkedIn views ↑ 3.4×",  sub: "Headline + About rewrite", anim: "achievement-float",   delay: "0.5s" },
];

export function MvpAuthForm({ mode }: { mode: AuthMode }) {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName,  setLastName]  = useState("");
  const [email,    setEmail]    = useState(mode === "login" ? "steve@askiatech.com" : "");
  const [password, setPassword] = useState(mode === "login" ? "demo12345" : "");
  const [error,    setError]    = useState<string | null>(null);
  const [loading,  setLoading]  = useState(false);

  async function submit() {
    setLoading(true);
    setError(null);
    const res = await fetch(mode === "login" ? "/api/auth/login" : "/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, email, password }),
    });
    const payload = await res.json().catch(() => ({}));
    if (!res.ok) { setError(payload.error || "Unable to continue."); setLoading(false); return; }
    router.push(mode === "login" ? "/dashboard" : "/onboarding");
    router.refresh();
  }

  const onKey = (e: React.KeyboardEvent) => { if (e.key === "Enter") void submit(); };
  const field = "w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3.5 text-[14px] text-[var(--ink)] placeholder:text-[var(--muted)] outline-none transition-all focus:border-[var(--brand)] focus:ring-4 focus:ring-[var(--brand-glow)]";

  return (
    <div className="flex min-h-screen w-full overflow-hidden">

      {/* ══════════════════════════════════════
          LEFT — dark cinematic panel
      ══════════════════════════════════════ */}
      <div className="noise-overlay relative hidden w-[55%] flex-col justify-between overflow-hidden p-12 lg:flex mesh-bg">

        {/* Animated orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div style={{ position:"absolute", width:"600px", height:"600px", top:"-8%", left:"-10%", background:"var(--cyan)", opacity:.10, filter:"blur(140px)", borderRadius:"50%", animation:"float-a 18s ease-in-out infinite" }} />
          <div style={{ position:"absolute", width:"500px", height:"500px", top:"-5%", right:"-8%", background:"var(--purple)", opacity:.09, filter:"blur(130px)", borderRadius:"50%", animation:"float-b 22s ease-in-out infinite" }} />
          <div style={{ position:"absolute", width:"400px", height:"400px", bottom:0, left:"30%", background:"var(--brand)", opacity:.08, filter:"blur(110px)", borderRadius:"50%", animation:"float-c 16s ease-in-out infinite" }} />
        </div>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="absolute left-0 right-0 top-0 h-px" style={{ background:"linear-gradient(90deg,transparent,rgba(114,214,255,0.4) 50%,transparent)" }} />

        {/* Logo */}
        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <Image src="/askia-logo.png" alt="Askia" width={38} height={38} className="rounded-xl transition-transform group-hover:scale-105" />
            <div className="leading-none">
              <span className="text-[16px] font-bold text-white">Askia</span>
              <span className="ml-1 text-[16px] font-bold text-[var(--cyan)]">Coach</span>
            </div>
          </Link>
        </div>

        {/* Main copy + cards */}
        <div className="relative z-10">
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.035em] text-white">
            {mode === "login"
              ? "Welcome back to your coaching workspace."
              : "Your AI coaching workspace is ready."}
          </h1>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/45">
            {mode === "login"
              ? "Resume reviews, LinkedIn rewrites, mock interviews, and coaching memory that carries every session forward."
              : "Set up your profile in minutes. The coach adapts to your goals, background, and target roles from session one."}
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3">
            {ACHIEVEMENTS.map((a, i) => (
              <div key={i} className="glass rounded-2xl px-4 py-3.5" style={{ animation:`${a.anim} ${3.2 + i * 0.6}s ease-in-out ${a.delay} infinite` }}>
                <div className="flex items-center gap-2.5">
                  <span className="text-xl leading-none">{a.emoji}</span>
                  <div>
                    <p className="text-[12.5px] font-semibold leading-tight text-white">{a.text}</p>
                    <p className="mt-0.5 text-[10.5px] text-white/38">{a.sub}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial */}
        <div className="relative z-10">
          <div className="glass rounded-2xl p-5">
            <div className="mb-3 flex gap-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="h-3.5 w-3.5 fill-amber-400" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-[13px] leading-6 italic text-white/65">
              &ldquo;One session and I had a completely rewritten resume and a real action plan. The specificity was unlike anything I&apos;d seen from an AI tool.&rdquo;
            </p>
            <div className="mt-3 flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--brand)] text-[10px] font-black text-white">AR</div>
              <div>
                <p className="text-[12px] font-semibold text-white/75">Aisha R.</p>
                <p className="text-[10px] text-white/35">Software Engineer · L5 offer in 6 weeks</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          RIGHT — form
      ══════════════════════════════════════ */}
      <div className="flex flex-1 flex-col items-center justify-center bg-[var(--bg)] px-6 py-16 lg:px-14">

        {/* Mobile logo */}
        <div className="mb-8 flex items-center gap-2.5 lg:hidden">
          <Image src="/askia-logo.png" alt="Askia" width={32} height={32} className="rounded-xl" />
          <span className="text-[15px] font-bold text-[var(--ink)]">Askia <span className="text-[var(--brand)]">Coach</span></span>
        </div>

        <div className="w-full max-w-[400px]">

          <div className="mb-8">
            <h2 className="text-[2rem] font-extrabold tracking-[-0.03em] text-[var(--ink)]">
              {mode === "login" ? "Sign in" : "Create account"}
            </h2>
            <p className="mt-2 text-[14px] text-[var(--muted)]">
              {mode === "login" ? (
                <>New here?{" "}<Link href="/signup" className="font-semibold text-[var(--brand)] hover:underline">Sign up free</Link></>
              ) : (
                <>Already have one?{" "}<Link href="/login" className="font-semibold text-[var(--brand)] hover:underline">Sign in</Link></>
              )}
            </p>
          </div>

          <div className="space-y-4">
            {mode === "signup" && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1.5 block text-[12px] font-semibold text-[var(--ink-2)]">First name</label>
                  <input className={field} placeholder="First" value={firstName} onChange={e => setFirstName(e.target.value)} onKeyDown={onKey} />
                </div>
                <div>
                  <label className="mb-1.5 block text-[12px] font-semibold text-[var(--ink-2)]">Last name</label>
                  <input className={field} placeholder="Last" value={lastName} onChange={e => setLastName(e.target.value)} onKeyDown={onKey} />
                </div>
              </div>
            )}
            <div>
              <label className="mb-1.5 block text-[12px] font-semibold text-[var(--ink-2)]">Email</label>
              <input className={field} placeholder="you@company.com" type="email" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={onKey} />
            </div>
            <div>
              <label className="mb-1.5 block text-[12px] font-semibold text-[var(--ink-2)]">Password</label>
              <input className={field} placeholder={mode === "login" ? "Your password" : "Choose a password"} type="password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={onKey} />
            </div>
          </div>

          {mode === "login" && (
            <div className="mt-4 rounded-xl border border-[var(--border)] bg-white px-4 py-3 shadow-[var(--shadow)]">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">Demo account · pre-filled</p>
              <div className="mt-1.5 flex justify-between text-[12.5px]">
                <span className="text-[var(--muted)]">steve@askiatech.com</span>
                <span className="font-mono font-semibold text-[var(--ink-2)]">demo12345</span>
              </div>
            </div>
          )}

          {error && (
            <div className="mt-4 flex items-center gap-2.5 rounded-xl border border-[var(--danger)]/20 bg-[var(--danger-soft)] px-4 py-3 text-sm text-[var(--danger)]">
              <svg className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              {error}
            </div>
          )}

          <button
            onClick={() => void submit()}
            disabled={loading}
            className="mt-6 flex w-full items-center justify-center gap-2.5 rounded-xl bg-[var(--brand)] py-4 text-[14.5px] font-semibold text-white shadow-[var(--shadow-brand)] transition-all hover:-translate-y-0.5 hover:bg-[var(--brand-hover)] hover:shadow-[0_8px_32px_rgba(13,113,130,0.45)] disabled:translate-y-0 disabled:opacity-60"
          >
            {loading ? (
              <><span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />Working…</>
            ) : mode === "login" ? "Continue to dashboard →" : "Create account →"}
          </button>

          <div className="mt-6 flex items-center justify-center gap-4 text-[11.5px] text-[var(--muted)]">
            {["Free to start","Secure & private","No card required"].map(s => (
              <div key={s} className="flex items-center gap-1.5">
                <svg className="h-3 w-3 text-[var(--brand)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><polyline points="20,6 9,17 4,12" /></svg>
                {s}
              </div>
            ))}
          </div>
        </div>

        <Link href="/" className="mt-10 flex items-center gap-1.5 text-[12.5px] text-[var(--muted)] transition-colors hover:text-[var(--ink)]">
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
          Back to Askia Coach
        </Link>
      </div>
    </div>
  );
}
