"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Meter } from "@/components/mvp";
import type { DashboardPayload } from "@/lib/mvp/types";

const modeLabels: Record<string, string> = {
  career: "Career",
  resume: "Resume",
  interview: "Interview",
  linkedin: "LinkedIn",
  confidence: "Confidence",
  recap: "Recap",
};

const statusColors: Record<string, string> = {
  complete: "bg-[var(--success-soft)] text-[var(--success)]",
  live: "bg-[var(--brand-light)] text-[var(--brand)]",
  reviewing: "bg-[var(--warning-soft)] text-[var(--warning)]",
  failed: "bg-[var(--danger-soft)] text-[var(--danger)]",
  ready: "bg-[var(--surface-muted)] text-[var(--muted)]",
};

export function MvpDashboardClient() {
  const router = useRouter();
  const [data, setData] = useState<DashboardPayload | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [starting, setStarting] = useState<string | null>(null);

  async function load() {
    const response = await fetch("/api/dashboard", { cache: "no-store" });
    if (!response.ok) {
      setError("Unable to load dashboard.");
      return;
    }
    setData(await response.json());
  }

  async function startSession(mode: "career" | "resume" | "interview") {
    setStarting(mode);
    const response = await fetch("/api/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mode }),
    });
    const payload = await response.json();
    if (!response.ok) {
      setError(payload.error || "Unable to start session.");
      setStarting(null);
      return;
    }
    router.push("/coach");
    router.refresh();
  }

  useEffect(() => {
    void Promise.resolve().then(load);
  }, []);

  if (error) {
    return (
      <div className="rounded-2xl border border-[var(--danger-soft)] bg-[var(--danger-soft)] p-6 text-sm text-[var(--danger)]">
        {error}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 animate-pulse rounded-2xl bg-[var(--surface-muted)]" />
        ))}
      </div>
    );
  }

  const firstName = data.user.name?.split(" ")[0] || "there";

  return (
    <div className="space-y-8">
      {/* ── Top: Welcome + quick actions ── */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
            Dashboard
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-[var(--ink)] md:text-4xl">
            Welcome back, {firstName}.
          </h1>
          <p className="mt-2 max-w-lg text-sm leading-6 text-[var(--muted)]">
            Your coaching workspace. Start a session, review saved materials, and work through your
            action plan.
          </p>
        </div>

        <div className="flex flex-shrink-0 flex-wrap gap-2">
          <button
            onClick={() => startSession("career")}
            disabled={starting !== null}
            className="inline-flex h-10 items-center gap-2 rounded-xl bg-[var(--brand)] px-5 text-sm font-semibold text-white shadow-[var(--shadow-brand)] transition-colors hover:bg-[var(--brand-hover)] disabled:opacity-60"
          >
            {starting === "career" ? (
              <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            ) : (
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <circle cx="12" cy="12" r="10" /><polygon points="10,8 16,12 10,16 10,8" />
              </svg>
            )}
            Career session
          </button>
          <button
            onClick={() => startSession("resume")}
            disabled={starting !== null}
            className="inline-flex h-10 items-center gap-2 rounded-xl border border-[var(--border)] bg-white px-5 text-sm font-semibold text-[var(--ink)] transition-colors hover:border-[var(--brand)] hover:text-[var(--brand)] disabled:opacity-60"
          >
            Resume review
          </button>
          <button
            onClick={() => startSession("interview")}
            disabled={starting !== null}
            className="inline-flex h-10 items-center gap-2 rounded-xl border border-[var(--border)] bg-white px-5 text-sm font-semibold text-[var(--ink)] transition-colors hover:border-[var(--brand)] hover:text-[var(--brand)] disabled:opacity-60"
          >
            Mock interview
          </button>
        </div>
      </div>

      {/* ── Usage meters ── */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {data.usage.map((item) => (
          <div
            key={item.key}
            className="rounded-2xl border border-[var(--border)] bg-white p-5 shadow-[var(--shadow)]"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-[var(--ink-2)]">{item.label}</p>
              <span className="text-xs font-semibold text-[var(--muted)]">
                {item.used}/{item.limit}
              </span>
            </div>
            <div className="mt-3">
              <Meter value={item.used} max={item.limit} />
            </div>
            <p className="mt-2 text-xs text-[var(--muted)]">{item.unit} used</p>
          </div>
        ))}
      </div>

      {/* ── Main grid ── */}
      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        {/* Left column */}
        <div className="space-y-6">
          {/* Coaching profile */}
          <div className="rounded-2xl bg-[var(--dark)] p-6 text-white">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">
                Coaching profile
              </p>
              <Link
                href="/onboarding"
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/55 transition-colors hover:bg-white/10 hover:text-white"
              >
                Edit
              </Link>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-white/[0.06] p-4">
                <p className="text-[11px] text-white/40">Current role</p>
                <p className="mt-1.5 font-semibold text-white">
                  {data.user.currentRole || "Not set"}
                </p>
              </div>
              <div className="rounded-xl bg-white/[0.06] p-4">
                <p className="text-[11px] text-white/40">Target role</p>
                <p className="mt-1.5 font-semibold text-white">
                  {data.user.targetRole || "Not set"}
                </p>
              </div>
              <div className="rounded-xl bg-[var(--brand)]/10 p-4 sm:col-span-2">
                <p className="text-[11px] text-white/40">Current focus</p>
                <p className="mt-1.5 text-sm leading-6 text-white/80">
                  {data.user.goals[0] || "Use onboarding to define your next goal."}
                </p>
              </div>
            </div>
          </div>

          {/* Recent sessions */}
          <div className="rounded-2xl border border-[var(--border)] bg-white p-6 shadow-[var(--shadow)]">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                Recent sessions
              </p>
            </div>
            <div className="mt-5 space-y-3">
              {data.sessions.length === 0 && (
                <p className="text-sm text-[var(--muted)]">No sessions yet. Start one above.</p>
              )}
              {data.sessions.map((session) => (
                <Link
                  key={session.id}
                  href={`/recap/${session.id}`}
                  className="flex items-start justify-between gap-4 rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-4 transition-all hover:border-[var(--brand)] hover:bg-white"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${statusColors[session.status] ?? statusColors.ready}`}
                      >
                        {modeLabels[session.mode] ?? session.mode}
                      </span>
                    </div>
                    <p className="mt-1.5 truncate text-sm font-semibold text-[var(--ink)]">
                      {session.title}
                    </p>
                    {session.summary && (
                      <p className="mt-1 truncate text-xs text-[var(--muted)]">{session.summary}</p>
                    )}
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <p className="text-xs text-[var(--muted)]">{session.startedAt}</p>
                    <p className="mt-1 text-xs text-[var(--muted)]">
                      {session.transcriptTurns} turns
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Action plan */}
          <div className="rounded-2xl border border-[var(--border)] bg-white p-6 shadow-[var(--shadow)]">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                Action plan
              </p>
              <Link
                href="/settings"
                className="text-xs font-medium text-[var(--brand)] hover:underline"
              >
                Settings
              </Link>
            </div>
            <div className="mt-5 space-y-3">
              {data.actionPlan.length === 0 && (
                <p className="text-sm text-[var(--muted)]">
                  Complete a session to generate action items.
                </p>
              )}
              {data.actionPlan.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-semibold text-[var(--ink)]">{item.title}</p>
                    <span
                      className={`flex-shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                        item.priority === "High"
                          ? "bg-[var(--danger-soft)] text-[var(--danger)]"
                          : item.priority === "Medium"
                            ? "bg-[var(--warning-soft)] text-[var(--warning)]"
                            : "bg-[var(--surface-muted)] text-[var(--muted)]"
                      }`}
                    >
                      {item.priority}
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs text-[var(--muted)]">{item.dueLabel}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Documents */}
          <div className="rounded-2xl border border-[var(--border)] bg-white p-6 shadow-[var(--shadow)]">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                Documents
              </p>
              <Link
                href="/workspaces/resume"
                className="text-xs font-medium text-[var(--brand)] hover:underline"
              >
                Upload
              </Link>
            </div>
            <div className="mt-5 space-y-3">
              {data.documents.length === 0 && (
                <p className="text-sm text-[var(--muted)]">No documents uploaded yet.</p>
              )}
              {data.documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-[var(--ink)]">{doc.title}</p>
                    <p className="mt-0.5 text-xs capitalize text-[var(--muted)]">
                      {doc.type} · {doc.updatedAt}
                    </p>
                  </div>
                  <span className="flex-shrink-0 rounded-full bg-[var(--surface-muted)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[var(--muted)]">
                    {doc.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
