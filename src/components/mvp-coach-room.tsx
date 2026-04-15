"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { SessionRecord } from "@/lib/mvp/types";

type SessionResponse = SessionRecord & {
  notes?: string[];
  transcript?: Array<{ time: string; role: "coach" | "user"; message: string }>;
};

const modeLabels: Record<string, string> = {
  career: "Career Coaching",
  resume: "Resume Review",
  interview: "Mock Interview",
  linkedin: "LinkedIn Review",
  confidence: "Confidence",
  recap: "Session Recap",
};

const statusColors: Record<string, { dot: string; label: string }> = {
  live: { dot: "bg-emerald-400 animate-pulse", label: "Live" },
  reviewing: { dot: "bg-[var(--amber)]", label: "Reviewing" },
  complete: { dot: "bg-[var(--muted)]", label: "Complete" },
  ready: { dot: "bg-[var(--brand)]", label: "Ready" },
  failed: { dot: "bg-[var(--danger)]", label: "Failed" },
};

export function MvpCoachRoom({ sessionId }: { sessionId: string | null }) {
  const [session, setSession] = useState<SessionResponse | null>(null);
  const [message, setMessage] = useState("");
  const [meta, setMeta] = useState<{ token?: string; avatar?: string }>({});
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [completing, setCompleting] = useState(false);
  const transcriptRef = useRef<HTMLDivElement>(null);

  const refresh = useCallback(async () => {
    const response = await fetch("/api/sessions", { cache: "no-store" });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      setError(payload.error || "Unable to load sessions.");
      return;
    }
    const active =
      payload.sessions.find((e: SessionRecord) => e.id === sessionId) ||
      payload.sessions[0] ||
      null;
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
    setSending(true);
    const response = await fetch(`/api/sessions/${session.id}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: "user", message }),
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      setError(payload.error || "Unable to send event.");
      setSending(false);
      return;
    }
    setMessage("");
    setSending(false);
    await refresh();
  }

  async function completeSession() {
    if (!session) return;
    setCompleting(true);
    await fetch(`/api/sessions/${session.id}/complete`, { method: "POST" });
    await refresh();
    setCompleting(false);
  }

  function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void sendMessage();
    }
  }

  useEffect(() => {
    void Promise.resolve().then(refresh);
  }, [refresh]);

  useEffect(() => {
    if (session?.id) {
      void Promise.resolve().then(() => bootstrapProviders(session.id));
    }
  }, [session?.id]);

  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [session?.transcript]);

  if (error) {
    return (
      <div className="rounded-2xl border border-[var(--danger-soft)] bg-[var(--danger-soft)] p-6 text-sm text-[var(--danger)]">
        {error}
      </div>
    );
  }

  if (!session) {
    return (
      <div className="rounded-2xl border border-[var(--border)] bg-white p-10 text-center shadow-[var(--shadow)]">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--brand-light)]">
          <svg className="h-6 w-6 text-[var(--brand)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx="12" cy="12" r="10" /><polygon points="10,8 16,12 10,16 10,8" />
          </svg>
        </div>
        <p className="font-semibold text-[var(--ink)]">No active session</p>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Create a session from the dashboard to start the live coaching room.
        </p>
      </div>
    );
  }

  const transcript = session.transcript || [];
  const notes = session.notes || [];
  const statusInfo = statusColors[session.status] ?? statusColors.ready;

  return (
    <div className="flex min-h-[640px] flex-col gap-0 overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-[var(--shadow)]" style={{ height: "calc(100vh - 12rem)" }}>
      {/* ── Header bar ── */}
      <div className="flex items-center justify-between gap-4 border-b border-[var(--border)] px-5 py-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full flex-shrink-0 ${statusInfo.dot}`} />
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
              {statusInfo.label}
            </span>
          </div>
          <span className="text-[var(--border)]">·</span>
          <span className="rounded-md bg-[var(--brand-light)] px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-[var(--brand)]">
            {modeLabels[session.mode] ?? session.mode}
          </span>
          <span className="hidden truncate text-sm font-semibold text-[var(--ink)] sm:block">
            {session.title}
          </span>
        </div>

        <div className="flex flex-shrink-0 items-center gap-2 text-xs text-[var(--muted)]">
          <div className="flex items-center gap-1.5 rounded-lg bg-[var(--surface-muted)] px-3 py-1.5">
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span>Token: {meta.token ? "Ready" : "Pending"}</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-lg bg-[var(--surface-muted)] px-3 py-1.5">
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <circle cx="12" cy="8" r="4" /><path d="M20 21a8 8 0 10-16 0" />
            </svg>
            <span>Avatar: {meta.avatar ? "Ready" : "Pending"}</span>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="flex min-h-0 flex-1 overflow-hidden">
        {/* Transcript / main chat */}
        <div className="flex flex-1 flex-col min-w-0">
          <div
            ref={transcriptRef}
            className="flex-1 overflow-y-auto px-5 py-4"
          >
            {transcript.length === 0 ? (
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--brand-light)]">
                    <span className="text-sm font-black text-[var(--brand)]">A</span>
                  </div>
                  <p className="text-sm font-medium text-[var(--ink)]">Session is ready</p>
                  <p className="mt-1 text-xs text-[var(--muted)]">
                    Send a message to begin the coaching conversation.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {transcript.map((item, idx) => (
                  <div
                    key={`${item.time}_${item.role}_${idx}`}
                    className={`flex items-start gap-3 ${item.role === "user" ? "flex-row-reverse" : ""}`}
                  >
                    {item.role === "coach" ? (
                      <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand)] text-[10px] font-black text-white">
                        A
                      </div>
                    ) : (
                      <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[var(--surface-muted)] text-[10px] font-bold text-[var(--muted)]">
                        U
                      </div>
                    )}
                    <div className={`max-w-[70%] ${item.role === "user" ? "items-end" : ""}`}>
                      <div
                        className={`rounded-2xl px-4 py-3 text-sm leading-6 ${
                          item.role === "user"
                            ? "rounded-tr-sm bg-[var(--brand)] text-white"
                            : "rounded-tl-sm bg-[var(--surface-muted)] text-[var(--ink)]"
                        }`}
                      >
                        {item.message}
                      </div>
                      <p className="mt-1 px-1 text-[10px] text-[var(--muted)]">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Input bar */}
          <div className="border-t border-[var(--border)] px-4 py-4">
            <div className="flex items-center gap-3">
              <input
                className="flex-1 rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3 text-sm text-[var(--ink)] placeholder:text-[var(--muted)] outline-none transition-colors focus:border-[var(--brand)] focus:bg-white"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Type a message or transcript event… (Enter to send)"
                disabled={sending}
              />
              <button
                onClick={sendMessage}
                disabled={sending || !message.trim()}
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[var(--brand)] text-white shadow-[var(--shadow-brand)] transition-colors hover:bg-[var(--brand-hover)] disabled:opacity-40"
              >
                {sending ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                ) : (
                  <svg className="h-4 w-4 translate-x-0.5 -translate-y-0.5 rotate-45" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  </svg>
                )}
              </button>
              <button
                onClick={completeSession}
                disabled={completing || session.status === "complete"}
                className="flex h-10 items-center gap-2 rounded-xl border border-[var(--border)] bg-white px-4 text-xs font-semibold text-[var(--ink)] transition-colors hover:border-[var(--teal)] hover:text-[var(--teal)] disabled:opacity-40"
              >
                {completing ? "Saving…" : "End session"}
              </button>
            </div>
          </div>
        </div>

        {/* Right panel — context + notes */}
        <div className="hidden w-72 flex-shrink-0 flex-col gap-0 border-l border-[var(--border)] xl:flex">
          {/* Session info */}
          <div className="border-b border-[var(--border)] p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
              Session info
            </p>
            <div className="mt-3 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[var(--muted)]">Status</span>
                <span className="font-semibold capitalize text-[var(--ink)]">{session.status}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[var(--muted)]">Mode</span>
                <span className="font-semibold text-[var(--ink)]">
                  {modeLabels[session.mode] ?? session.mode}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[var(--muted)]">Turns</span>
                <span className="font-semibold text-[var(--ink)]">{transcript.length}</span>
              </div>
            </div>
          </div>

          {/* Notes / context */}
          <div className="flex-1 overflow-y-auto p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
              Context & notes
            </p>
            {notes.length === 0 ? (
              <p className="mt-3 text-xs text-[var(--muted)]">
                Notes will appear as the session progresses.
              </p>
            ) : (
              <div className="mt-3 space-y-2">
                {notes.map((note) => (
                  <div
                    key={note}
                    className="rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] px-3 py-2.5 text-xs leading-5 text-[var(--ink-2)]"
                  >
                    {note}
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
