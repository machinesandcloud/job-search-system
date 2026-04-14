"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, Eyebrow, Meter } from "@/components/mvp";
import type { DashboardPayload } from "@/lib/mvp/types";

export function MvpDashboardClient() {
  const router = useRouter();
  const [data, setData] = useState<DashboardPayload | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    const response = await fetch("/api/dashboard", { cache: "no-store" });
    if (!response.ok) {
      setError("Unable to load dashboard.");
      return;
    }
    setData(await response.json());
  }

  async function startSession(mode: "career" | "resume" | "interview") {
    const response = await fetch("/api/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mode }),
    });
    const payload = await response.json();
    if (!response.ok) {
      setError(payload.error || "Unable to start session.");
      return;
    }
    router.push("/coach");
    router.refresh();
  }

  useEffect(() => {
    void Promise.resolve().then(load);
  }, []);

  if (error) {
    return <Card><p className="text-sm text-[var(--danger)]">{error}</p></Card>;
  }

  if (!data) {
    return <Card><p className="text-sm text-[var(--muted)]">Loading dashboard...</p></Card>;
  }

  return (
    <div className="grid gap-6">
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Eyebrow>Dashboard</Eyebrow>
          <h1 className="mt-5 text-4xl font-semibold tracking-[-0.04em] text-[var(--ink)]">Welcome back, {data.user.name || "there"}.</h1>
          <p className="mt-3 max-w-3xl text-base leading-7 text-[var(--muted)]">
            This is the working surface for coaching, not a motivational homepage. Start a session, review saved materials, and execute the next action plan.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button onClick={() => startSession("career")} className="rounded-full bg-[var(--ink)] px-5 py-3 text-sm font-semibold text-[var(--bg-soft)] transition hover:bg-[var(--teal)]">Start career session</button>
            <button onClick={() => startSession("resume")} className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-5 py-3 text-sm font-semibold text-[var(--ink)] transition hover:border-[var(--teal)]">Start resume review</button>
            <button onClick={() => startSession("interview")} className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-5 py-3 text-sm font-semibold text-[var(--ink)] transition hover:border-[var(--teal)]">Start mock interview</button>
          </div>
        </div>

        <Card className="bg-[var(--ink)] text-[var(--bg-soft)]">
          <p className="text-sm uppercase tracking-[0.22em] text-[rgba(246,241,232,0.58)]">Coaching profile</p>
          <div className="mt-5 grid gap-4 text-sm">
            <div>
              <p className="text-[rgba(246,241,232,0.55)]">Current role</p>
              <p className="mt-1 text-lg font-semibold">{data.user.currentRole || "Not set"}</p>
            </div>
            <div>
              <p className="text-[rgba(246,241,232,0.55)]">Target role</p>
              <p className="mt-1 text-lg font-semibold">{data.user.targetRole || "Not set"}</p>
            </div>
            <div className="rounded-2xl bg-[rgba(255,255,255,0.08)] p-4">
              <p className="text-[rgba(246,241,232,0.55)]">Focus right now</p>
              <p className="mt-2 leading-7">{data.user.goals[0] || "Use onboarding to define your next goal."}</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="grid gap-6">
          <Card>
            <p className="text-sm uppercase tracking-[0.22em] text-[var(--muted)]">Usage and plan controls</p>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {data.usage.map((item) => (
                <div key={item.key} className="rounded-[24px] border border-[var(--border)] bg-[var(--bg-soft)] p-5">
                  <div className="flex items-center justify-between text-sm text-[var(--muted)]">
                    <span>{item.label}</span>
                    <span>{item.used}/{item.limit} {item.unit}</span>
                  </div>
                  <div className="mt-3">
                    <Meter value={item.used} max={item.limit} />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm uppercase tracking-[0.22em] text-[var(--muted)]">Action plan</p>
              <Link href="/settings" className="text-sm font-medium text-[var(--teal)]">Settings</Link>
            </div>
            <div className="mt-5 grid gap-3">
              {data.actionPlan.map((item) => (
                <div key={item.id} className="flex flex-wrap items-center justify-between gap-4 rounded-[24px] border border-[var(--border)] bg-[var(--bg-soft)] px-5 py-4">
                  <div>
                    <p className="font-medium text-[var(--ink)]">{item.title}</p>
                    <p className="mt-1 text-sm text-[var(--muted)]">{item.priority} priority • {item.dueLabel}</p>
                  </div>
                  <span className="rounded-full bg-[var(--surface-strong)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">Open</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid gap-6">
          <Card>
            <p className="text-sm uppercase tracking-[0.22em] text-[var(--muted)]">Documents</p>
            <div className="mt-5 grid gap-3">
              {data.documents.map((document) => (
                <div key={document.id} className="rounded-[24px] border border-[var(--border)] bg-[var(--bg-soft)] px-4 py-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-medium text-[var(--ink)]">{document.title}</p>
                    <span className="rounded-full bg-[var(--surface-strong)] px-3 py-1 text-xs uppercase tracking-[0.16em] text-[var(--muted)]">{document.status}</span>
                  </div>
                  <p className="mt-2 text-sm text-[var(--muted)]">{document.type} • updated {document.updatedAt}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <p className="text-sm uppercase tracking-[0.22em] text-[var(--muted)]">Recent sessions</p>
            <div className="mt-5 grid gap-3">
              {data.sessions.map((session) => (
                <Link key={session.id} href={`/recap/${session.id}`} className="rounded-[24px] border border-[var(--border)] bg-[var(--bg-soft)] px-4 py-4 transition hover:border-[var(--teal)]">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-medium text-[var(--ink)]">{session.title}</p>
                    <span className="text-xs uppercase tracking-[0.16em] text-[var(--muted)]">{session.status}</span>
                  </div>
                  <p className="mt-2 text-sm text-[var(--muted)]">{session.summary}</p>
                  <p className="mt-2 text-xs text-[var(--muted)]">{session.startedAt} • {session.transcriptTurns} turns</p>
                </Link>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
