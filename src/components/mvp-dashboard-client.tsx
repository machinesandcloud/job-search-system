"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { DashboardPayload } from "@/lib/mvp/types";

const modeLabels: Record<string, string> = {
  career: "Career", resume: "Resume", interview: "Interview",
  linkedin: "LinkedIn", confidence: "Confidence", recap: "Recap",
};

const statusConfig: Record<string, { bg: string; text: string; dot: string }> = {
  complete:  { bg:"bg-[var(--success-soft)]",  text:"text-[var(--success)]",  dot:"bg-emerald-400" },
  live:      { bg:"bg-[var(--brand-light)]",    text:"text-[var(--brand)]",    dot:"bg-[var(--brand)] animate-pulse" },
  reviewing: { bg:"bg-[var(--warning-soft)]",   text:"text-[var(--warning)]",  dot:"bg-amber-400" },
  failed:    { bg:"bg-[var(--danger-soft)]",    text:"text-[var(--danger)]",   dot:"bg-red-400" },
  ready:     { bg:"bg-[var(--surface-muted)]",  text:"text-[var(--muted)]",    dot:"bg-[var(--muted)]" },
};

const MODES: Array<{
  id: "career" | "resume" | "interview";
  label: string; tag: string; body: string;
  accent: string; accentBg: string;
  icon: React.ReactNode;
}> = [
  {
    id: "resume", label: "Resume Review", tag: "Fix what's losing you callbacks",
    body: "Score every bullet, get specific rewrites with metrics, and walk away with a version you can send tonight.",
    accent: "var(--brand)", accentBg: "rgba(13,113,130,0.10)",
    icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14,2 14,8 20,8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>,
  },
  {
    id: "career", label: "Career Direction", tag: "Get clear on your next target",
    body: "Map your background to the right roles, identify narrative gaps, and build a concrete 30-day plan.",
    accent: "var(--cyan-dim)", accentBg: "rgba(114,214,255,0.10)",
    icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88 16.24,7.76" /></svg>,
  },
  {
    id: "interview", label: "Mock Interview", tag: "Practice until it's natural",
    body: "STAR-structured practice with immediate feedback on structure, specificity, and delivery.",
    accent: "var(--purple)", accentBg: "rgba(122,141,255,0.10)",
    icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" /><path d="M19 10v2a7 7 0 01-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" /></svg>,
  },
];

export function MvpDashboardClient() {
  const router = useRouter();
  const [data,     setData]     = useState<DashboardPayload | null>(null);
  const [error,    setError]    = useState<string | null>(null);
  const [starting, setStarting] = useState<string | null>(null);

  async function load() {
    const res = await fetch("/api/dashboard", { cache: "no-store" });
    if (!res.ok) { setError("Unable to load dashboard."); return; }
    setData(await res.json());
  }

  async function startSession(mode: "career" | "resume" | "interview") {
    setStarting(mode);
    const res = await fetch("/api/sessions", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mode }),
    });
    const payload = await res.json();
    if (!res.ok) { setError(payload.error || "Unable to start session."); setStarting(null); return; }
    router.push("/coach");
    router.refresh();
  }

  useEffect(() => { void Promise.resolve().then(load); }, []);

  if (error) return (
    <div className="flex items-center gap-3 rounded-2xl border border-[var(--danger)]/20 bg-[var(--danger-soft)] p-6 text-sm text-[var(--danger)]">
      <svg className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
      {error}
    </div>
  );

  if (!data) return (
    <div className="space-y-4">
      {[1,2,3,4].map(i => <div key={i} className="h-24 animate-pulse rounded-2xl bg-[var(--surface-muted)]" style={{ animationDelay:`${i*0.1}s` }} />)}
    </div>
  );

  const firstName = data.user.name?.split(" ")[0] || "there";

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--brand)] text-lg font-black text-white shadow-[var(--shadow-brand)]">
            {(data.user.name || "U")[0]}
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">Dashboard</p>
            <h1 className="mt-0.5 text-[1.8rem] font-extrabold tracking-[-0.02em] text-[var(--ink)]">
              Welcome back, {firstName}.
            </h1>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/workspaces/linkedin" className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-[var(--border)] bg-white px-4 text-[13px] font-semibold text-[var(--ink)] shadow-[var(--shadow)] transition-all hover:border-[var(--cyan-dim)] hover:text-[var(--cyan-dim)]">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            LinkedIn
          </Link>
          <Link href="/onboarding" className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-[var(--border)] bg-white px-4 text-[13px] font-semibold text-[var(--ink)] shadow-[var(--shadow)] transition-all hover:border-[var(--brand)] hover:text-[var(--brand)]">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            Edit profile
          </Link>
        </div>
      </div>

      {/* Usage meters */}
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {data.usage.map(item => {
          const pct = Math.min((item.used / item.limit) * 100, 100);
          const hot = pct > 80;
          return (
            <div key={item.key} className="rounded-2xl border border-[var(--border)] bg-white p-5 shadow-[var(--shadow)]">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[13px] font-semibold text-[var(--ink-2)]">{item.label}</p>
                <span className="text-[12px] font-bold" style={{ color: hot ? "var(--warning)" : "var(--brand)" }}>{item.used}/{item.limit}</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-[var(--surface-muted)]">
                <div className="h-full rounded-full transition-all" style={{ width:`${pct}%`, background: hot ? "linear-gradient(90deg,var(--warning),var(--amber))" : "linear-gradient(90deg,var(--brand),var(--cyan))" }} />
              </div>
              <p className="mt-2 text-[11px] text-[var(--muted)]">{item.unit} used</p>
            </div>
          );
        })}
      </div>

      {/* Start a session */}
      <div>
        <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">Start a session</p>
        <div className="grid gap-4 sm:grid-cols-3">
          {MODES.map(m => (
            <button
              key={m.id}
              onClick={() => void startSession(m.id)}
              disabled={starting !== null}
              className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-white p-6 text-left shadow-[var(--shadow)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-md)] disabled:opacity-60"
            >
              <div className="absolute left-0 right-0 top-0 h-[3px]" style={{ background: m.accent }} />
              <div className="mt-1 mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: m.accentBg, color: m.accent }}>
                {starting === m.id
                  ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-current/30 border-t-current" />
                  : m.icon}
              </div>
              <p className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">{m.label}</p>
              <p className="mt-1.5 text-[15px] font-bold leading-snug tracking-tight text-[var(--ink)]">{m.tag}</p>
              <p className="mt-2.5 text-[13px] leading-6 text-[var(--muted)]">{m.body}</p>
              <div className="mt-5 flex items-center gap-1.5 text-[12.5px] font-semibold transition-colors" style={{ color: m.accent }}>
                Start session
                <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main grid */}
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">

        {/* Left */}
        <div className="space-y-5">

          {/* Coaching profile */}
          <div className="overflow-hidden rounded-2xl bg-[var(--dark)] text-white">
            <div className="flex items-center justify-between border-b border-white/[0.07] px-6 py-4">
              <div className="flex items-center gap-2.5">
                <Image src="/askia-logo.png" alt="Askia" width={18} height={18} className="rounded-md opacity-60" />
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/38">Coaching profile</p>
              </div>
              <Link href="/onboarding" className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[12px] font-medium text-white/45 transition-all hover:bg-white/[0.10] hover:text-white">
                Edit →
              </Link>
            </div>
            <div className="grid gap-3 p-5 sm:grid-cols-2">
              {[
                { label:"Current role", val: data.user.currentRole || "Not set" },
                { label:"Target role",  val: data.user.targetRole  || "Not set" },
              ].map(f => (
                <div key={f.label} className="rounded-xl bg-white/[0.05] p-4">
                  <p className="text-[10.5px] uppercase tracking-wider text-white/28">{f.label}</p>
                  <p className="mt-1.5 text-[14px] font-semibold text-white">{f.val}</p>
                </div>
              ))}
              <div className="rounded-xl p-4 sm:col-span-2" style={{ background:"rgba(13,113,130,0.15)" }}>
                <p className="text-[10.5px] uppercase tracking-wider text-white/28">Current focus</p>
                <p className="mt-1.5 text-[13.5px] leading-6 text-white/70">
                  {data.user.goals[0] || "Complete onboarding to define your coaching goals."}
                </p>
              </div>
            </div>
          </div>

          {/* Recent sessions */}
          <div className="rounded-2xl border border-[var(--border)] bg-white p-6 shadow-[var(--shadow)]">
            <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">Recent sessions</p>
            {data.sessions.length === 0 ? (
              <div className="rounded-xl border border-dashed border-[var(--border)] p-6 text-center">
                <p className="text-[13px] text-[var(--muted)]">No sessions yet. Start one above.</p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {data.sessions.map(session => {
                  const sc = statusConfig[session.status] ?? statusConfig.ready;
                  return (
                    <Link key={session.id} href={`/recap/${session.id}`} className="group flex items-start justify-between gap-4 rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3.5 transition-all hover:border-[var(--brand)]/30 hover:bg-white hover:shadow-[var(--shadow)]">
                      <div className="min-w-0 flex-1">
                        <div className="mb-1.5 flex items-center gap-2">
                          <span className={`flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10.5px] font-semibold ${sc.bg} ${sc.text}`}>
                            <span className={`h-1.5 w-1.5 rounded-full ${sc.dot}`} />
                            {modeLabels[session.mode] ?? session.mode}
                          </span>
                        </div>
                        <p className="truncate text-[14px] font-semibold text-[var(--ink)]">{session.title}</p>
                        {session.summary && <p className="mt-0.5 truncate text-[12px] text-[var(--muted)]">{session.summary}</p>}
                      </div>
                      <div className="flex-shrink-0 text-right">
                        <p className="text-[11.5px] text-[var(--muted)]">{session.startedAt}</p>
                        <p className="mt-0.5 text-[11px] text-[var(--muted)]">{session.transcriptTurns} turns</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right */}
        <div className="space-y-5">

          {/* Action plan */}
          <div className="rounded-2xl border border-[var(--border)] bg-white p-6 shadow-[var(--shadow)]">
            <div className="mb-5 flex items-center justify-between">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">Action plan</p>
              <Link href="/settings" className="text-[12px] font-semibold text-[var(--brand)] hover:underline">Settings</Link>
            </div>
            {data.actionPlan.length === 0 ? (
              <div className="rounded-xl border border-dashed border-[var(--border)] p-5 text-center">
                <p className="text-[13px] text-[var(--muted)]">Complete a session to generate action items.</p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {data.actionPlan.map(item => (
                  <div key={item.id} className="rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] p-4">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-[13.5px] font-semibold leading-snug text-[var(--ink)]">{item.title}</p>
                      <span className={`flex-shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                        item.priority === "High"   ? "bg-[var(--danger-soft)] text-[var(--danger)]" :
                        item.priority === "Medium" ? "bg-[var(--warning-soft)] text-[var(--warning)]" :
                        "bg-[var(--surface-muted)] text-[var(--muted)]"}`}>
                        {item.priority}
                      </span>
                    </div>
                    <p className="mt-1.5 text-[11.5px] text-[var(--muted)]">{item.dueLabel}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Documents */}
          <div className="rounded-2xl border border-[var(--border)] bg-white p-6 shadow-[var(--shadow)]">
            <div className="mb-5 flex items-center justify-between">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">Documents</p>
              <Link href="/workspaces/resume" className="text-[12px] font-semibold text-[var(--brand)] hover:underline">Upload →</Link>
            </div>
            {data.documents.length === 0 ? (
              <Link href="/workspaces/resume" className="group flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-[var(--border)] p-8 text-center transition-all hover:border-[var(--brand)]/40 hover:bg-[var(--brand-light)]/30">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--brand-light)] text-[var(--brand)] transition-transform group-hover:scale-110">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M12 5v14M5 12h14" /></svg>
                </div>
                <p className="text-[13px] font-semibold text-[var(--ink-2)]">Upload your resume</p>
                <p className="mt-1 text-[12px] text-[var(--muted)]">Click to browse files</p>
              </Link>
            ) : (
              <div className="space-y-2.5">
                {data.documents.map(doc => (
                  <div key={doc.id} className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--brand-light)] text-[var(--brand)]">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[13.5px] font-semibold text-[var(--ink)]">{doc.title}</p>
                      <p className="text-[11px] capitalize text-[var(--muted)]">{doc.type} · {doc.updatedAt}</p>
                    </div>
                    <span className="flex-shrink-0 rounded-full bg-[var(--surface-muted)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[var(--muted)]">{doc.status}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
