"use client";

import { useCallback, useEffect, useState } from "react";
import { Card, Eyebrow } from "@/components/mvp";
import type { SessionRecord } from "@/lib/mvp/types";

type SessionResponse = SessionRecord & {
  notes?: string[];
  transcript?: Array<{ time: string; role: "coach" | "user"; message: string }>;
};

const inputClass =
  "rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--ink)] outline-none placeholder:text-[var(--muted)]";

export function MvpCoachRoom({ sessionId }: { sessionId: string | null }) {
  const [session, setSession] = useState<SessionResponse | null>(null);
  const [message, setMessage] = useState("");
  const [meta, setMeta] = useState<{ token?: string; avatar?: string }>({});
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    const response = await fetch("/api/sessions", { cache: "no-store" });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      setError(payload.error || "Unable to load sessions.");
      return;
    }
    const active = payload.sessions.find((entry: SessionRecord) => entry.id === sessionId) || payload.sessions[0] || null;
    setSession(active);
  }, [sessionId]);

  async function bootstrapProviders(id: string) {
    const [tokenRes, avatarRes] = await Promise.all([
      fetch(`/api/sessions/${id}/realtime-token`, { method: "POST" }),
      fetch(`/api/sessions/${id}/avatar-session`, { method: "POST" }),
    ]);
    const tokenPayload = await tokenRes.json().catch(() => ({}));
    const avatarPayload = await avatarRes.json().catch(() => ({}));
    setMeta({ token: tokenPayload.token, avatar: avatarPayload.sessionId });
  }

  async function sendMessage() {
    if (!session || !message.trim()) return;
    const response = await fetch(`/api/sessions/${session.id}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: "user", message }),
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      setError(payload.error || "Unable to send event.");
      return;
    }
    setMessage("");
    await refresh();
  }

  async function completeSession() {
    if (!session) return;
    await fetch(`/api/sessions/${session.id}/complete`, { method: "POST" });
    await refresh();
  }

  useEffect(() => {
    void Promise.resolve().then(refresh);
  }, [refresh]);

  useEffect(() => {
    if (session?.id) {
      void Promise.resolve().then(() => bootstrapProviders(session.id));
    }
  }, [session?.id]);

  if (error) {
    return <Card><p className="text-sm text-[var(--danger)]">{error}</p></Card>;
  }

  if (!session) {
    return <Card><p className="text-sm text-[var(--muted)]">Create a session from the dashboard to start the live room.</p></Card>;
  }

  const transcript = session.transcript || [];
  const notes = session.notes || [];

  return (
    <div className="grid gap-6">
      <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
        <div>
          <Eyebrow>Live Coaching Room</Eyebrow>
          <h1 className="mt-5 text-4xl font-semibold tracking-[-0.04em] text-[var(--ink)]">{session.title}</h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-[var(--muted)]">
            The room should feel like a structured coaching workspace: transcript visible, task context visible, and a clear sense of what the coach is helping fix right now.
          </p>
        </div>
        <Card className="bg-[var(--ink)] text-[var(--bg-soft)]">
          <p className="text-sm uppercase tracking-[0.22em] text-[rgba(246,241,232,0.58)]">Session status</p>
          <div className="mt-5 grid gap-3 text-sm">
            <div className="flex items-center justify-between rounded-2xl bg-[rgba(255,255,255,0.08)] px-4 py-3">
              <span>Mode</span>
              <span className="font-semibold capitalize">{session.mode}</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-[rgba(255,255,255,0.08)] px-4 py-3">
              <span>Realtime token</span>
              <span className="font-semibold">{meta.token ? "Ready" : "Pending"}</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-[rgba(255,255,255,0.08)] px-4 py-3">
              <span>Avatar provider</span>
              <span className="font-semibold">{meta.avatar ? "Ready" : "Pending"}</span>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.18fr_0.82fr]">
        <Card className="p-5">
          <div className="rounded-[30px] border border-[var(--border)] bg-[linear-gradient(180deg,#efe7db,#e2d7c6)] p-5">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
              <span>Coach surface</span>
              <span>Status: {session.status}</span>
            </div>
            <div className="mt-5 grid min-h-[420px] gap-5 rounded-[24px] border border-[var(--border)] bg-[var(--surface)] p-6">
              <div className="grid gap-3 md:grid-cols-[0.78fr_1.22fr]">
                <div className="rounded-[22px] bg-[var(--bg-soft)] p-5">
                  <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">Coach mode</p>
                  <div className="mt-6 grid h-28 w-28 place-items-center rounded-full bg-[var(--ink)] text-2xl font-semibold text-[var(--bg-soft)]">AC</div>
                  <p className="mt-5 text-sm leading-6 text-[var(--muted)]">A warm, direct, practical coach is a better visual frame than an AI avatar gimmick.</p>
                </div>
                <div className="rounded-[22px] bg-[var(--bg-soft)] p-5">
                  <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">Current focus</p>
                  <p className="mt-3 text-2xl font-semibold tracking-tight text-[var(--ink)]">Sharpen positioning and extract stronger proof.</p>
                  <div className="mt-4 grid gap-3">
                    <div className="rounded-2xl bg-[var(--surface)] px-4 py-3 text-sm text-[var(--muted)]">Transcript stays visible so the advice feels auditable.</div>
                    <div className="rounded-2xl bg-[var(--surface)] px-4 py-3 text-sm text-[var(--muted)]">Action plan updates as the session evolves.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <input className={`flex-1 ${inputClass}`} value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Send a transcript event..." />
            <button onClick={sendMessage} className="rounded-2xl bg-[var(--ink)] px-4 py-3 text-sm font-semibold text-[var(--bg-soft)] transition hover:bg-[var(--teal)]">Send</button>
            <button onClick={completeSession} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm font-semibold text-[var(--ink)]">Complete</button>
          </div>
        </Card>

        <div className="grid gap-6">
          <Card>
            <p className="text-sm uppercase tracking-[0.22em] text-[var(--muted)]">Context</p>
            <div className="mt-5 grid gap-3">
              {notes.map((note) => (
                <div key={note} className="rounded-2xl border border-[var(--border)] bg-[var(--bg-soft)] px-4 py-3 text-sm text-[var(--muted)]">{note}</div>
              ))}
            </div>
          </Card>
          <Card>
            <p className="text-sm uppercase tracking-[0.22em] text-[var(--muted)]">Transcript</p>
            <div className="mt-5 grid gap-3">
              {transcript.length ? transcript.map((item) => (
                <div key={`${item.time}_${item.role}_${item.message}`} className={`rounded-2xl border border-[var(--border)] px-4 py-3 ${item.role === "user" ? "bg-[var(--teal-soft)]" : "bg-[var(--bg-soft)]"}`}>
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                    <span>{item.role}</span>
                    <span>{item.time}</span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-[var(--ink)]">{item.message}</p>
                </div>
              )) : <p className="text-sm text-[var(--muted)]">No transcript events yet.</p>}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
