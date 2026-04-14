"use client";

import { useCallback, useEffect, useState } from "react";
import { Card, Eyebrow } from "@/components/mvp";
import type { SessionRecord } from "@/lib/mvp/types";

type SessionResponse = SessionRecord & {
  notes?: string[];
  transcript?: Array<{ time: string; role: "coach" | "user"; message: string }>;
};

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
    return <Card><p className="text-sm text-rose-300">{error}</p></Card>;
  }

  if (!session) {
    return <Card><p className="text-sm text-white/60">Create a session from the dashboard to start the live room.</p></Card>;
  }

  const transcript = session.transcript || [];
  const notes = session.notes || [];

  return (
    <div className="grid gap-6">
      <div>
        <Eyebrow>Live Coaching Room</Eyebrow>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight">{session.title}</h1>
        <p className="mt-3 text-base leading-7 text-white/70">Realtime token and avatar session stubs are minted per session, and transcript events persist locally.</p>
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="p-5">
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-white/50">
            <span>Mode: {session.mode}</span>
            <span>Status: {session.status}</span>
          </div>
          <div className="mt-4 grid min-h-[480px] place-items-center rounded-[30px] border border-white/10 bg-[radial-gradient(circle_at_50%_10%,rgba(249,115,22,0.24),transparent_25%),linear-gradient(180deg,#111c2b,#0a1523)]">
            <div className="text-center">
              <div className="mx-auto grid h-36 w-36 place-items-center rounded-full border border-orange-200/30 bg-[linear-gradient(135deg,rgba(249,115,22,0.72),rgba(244,63,94,0.72))] text-4xl font-semibold shadow-[0_26px_70px_rgba(249,115,22,0.24)]">AI</div>
              <p className="mt-6 text-2xl font-semibold">Provider session ready</p>
              <p className="mt-3 text-sm text-white/60">Realtime token: {meta.token ? "ready" : "pending"} • Avatar session: {meta.avatar ? "ready" : "pending"}</p>
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            <input className="flex-1 rounded-2xl border border-white/10 bg-black/15 px-4 py-3 text-sm text-white outline-none" value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Send a transcript event..." />
            <button onClick={sendMessage} className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-950">Send</button>
            <button onClick={completeSession} className="rounded-2xl border border-white/12 px-4 py-3 text-sm text-white/82">Complete</button>
          </div>
        </Card>

        <div className="grid gap-6">
          <Card>
            <p className="text-sm uppercase tracking-[0.22em] text-white/45">Context</p>
            <div className="mt-5 grid gap-3">
              {notes.map((note) => (
                <div key={note} className="rounded-2xl border border-white/10 bg-black/15 px-4 py-3 text-sm text-white/70">{note}</div>
              ))}
            </div>
          </Card>
          <Card>
            <p className="text-sm uppercase tracking-[0.22em] text-white/45">Transcript</p>
            <div className="mt-5 grid gap-3">
              {transcript.length ? transcript.map((item) => (
                <div key={`${item.time}_${item.role}_${item.message}`} className="rounded-2xl border border-white/10 bg-black/15 px-4 py-3">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-white/45">
                    <span>{item.role}</span>
                    <span>{item.time}</span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-white/74">{item.message}</p>
                </div>
              )) : <p className="text-sm text-white/55">No transcript events yet.</p>}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
