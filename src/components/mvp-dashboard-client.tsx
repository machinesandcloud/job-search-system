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
    return <Card><p className="text-sm text-rose-300">{error}</p></Card>;
  }

  if (!data) {
    return <Card><p className="text-sm text-white/60">Loading dashboard...</p></Card>;
  }

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Eyebrow>Dashboard</Eyebrow>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight">Welcome back, {data.user.name || "there"}.</h1>
          <p className="mt-3 max-w-3xl text-base leading-7 text-white/70">Your dashboard is now backed by the local MVP store, so onboarding, session creation, uploads, reviews, and recaps persist across reloads.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button onClick={() => startSession("career")} className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950">Start career session</button>
          <button onClick={() => startSession("resume")} className="rounded-full border border-white/12 px-5 py-3 text-sm text-white/82">Start resume session</button>
          <button onClick={() => startSession("interview")} className="rounded-full border border-white/12 px-5 py-3 text-sm text-white/82">Start mock interview</button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="grid gap-6">
          <Card>
            <p className="text-sm uppercase tracking-[0.22em] text-white/45">Usage and plan controls</p>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {data.usage.map((item) => (
                <div key={item.key} className="rounded-3xl border border-white/10 bg-black/15 p-5">
                  <div className="flex items-center justify-between text-sm text-white/68">
                    <span>{item.label}</span>
                    <span>{item.used}/{item.limit} {item.unit}</span>
                  </div>
                  <div className="mt-3"><Meter value={item.used} max={item.limit} /></div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <p className="text-sm uppercase tracking-[0.22em] text-white/45">Action plan</p>
            <div className="mt-5 grid gap-3">
              {data.actionPlan.map((item) => (
                <div key={item.id} className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/10 bg-black/15 px-5 py-4">
                  <div>
                    <p className="font-medium text-white">{item.title}</p>
                    <p className="mt-1 text-sm text-white/55">{item.priority} priority • {item.dueLabel}</p>
                  </div>
                  <span className="rounded-full border border-orange-300/25 bg-orange-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-orange-100">Open</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid gap-6">
          <Card>
            <p className="text-sm uppercase tracking-[0.22em] text-white/45">Documents</p>
            <div className="mt-5 grid gap-3">
              {data.documents.map((document) => (
                <div key={document.id} className="rounded-3xl border border-white/10 bg-black/15 px-4 py-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-medium text-white">{document.title}</p>
                    <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.16em] text-white/65">{document.status}</span>
                  </div>
                  <p className="mt-2 text-sm text-white/55">{document.type} • updated {document.updatedAt}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <p className="text-sm uppercase tracking-[0.22em] text-white/45">Recent sessions</p>
            <div className="mt-5 grid gap-3">
              {data.sessions.map((session) => (
                <Link key={session.id} href={`/recap/${session.id}`} className="rounded-3xl border border-white/10 bg-black/15 px-4 py-4 transition hover:border-white/20">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-medium text-white">{session.title}</p>
                    <span className="text-xs uppercase tracking-[0.16em] text-white/55">{session.status}</span>
                  </div>
                  <p className="mt-2 text-sm text-white/62">{session.summary}</p>
                  <p className="mt-2 text-xs text-white/45">{session.startedAt} • {session.transcriptTurns} turns</p>
                </Link>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
