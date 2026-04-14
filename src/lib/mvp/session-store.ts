import { dashboardData } from "./data";
import type { SessionRecord } from "./types";

const sessions = new Map<string, SessionRecord>(dashboardData.sessions.map((session) => [session.id, session]));

export function listSessions() {
  return Array.from(sessions.values());
}

export function createSession(mode: SessionRecord["mode"], title?: string) {
  const id = `sess_${crypto.randomUUID()}`;
  const session: SessionRecord = {
    id,
    title: title || `${mode[0].toUpperCase()}${mode.slice(1)} coaching session`,
    mode,
    status: "live",
    startedAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    summary: "Session started. Transcript, notes, and recap will be generated as events arrive.",
    transcriptTurns: 0,
  };
  sessions.set(id, session);
  return session;
}

export function getSession(sessionId: string) {
  return sessions.get(sessionId);
}
