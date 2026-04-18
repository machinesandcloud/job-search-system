import { getUserById, listSessionsForUser, listDocumentsForUser } from "./store";

/**
 * Builds a context string about the user — profile, documents, session history,
 * and action plan — that gets injected into Zari's system prompt on every call.
 * This is what makes Zari feel like a coach that actually remembers you.
 */
export async function buildUserContext(userId: string): Promise<string> {
  const [user, sessions, documents] = await Promise.all([
    getUserById(userId),
    listSessionsForUser(userId),
    listDocumentsForUser(userId),
  ]);

  if (!user) return "";

  const { profile, actionPlan } = user;
  const lines: string[] = [];

  // ── Profile ──────────────────────────────────────────
  lines.push("=== USER PROFILE ===");
  if (profile.name)            lines.push(`Name: ${profile.name}`);
  if (profile.currentRole)     lines.push(`Current role: ${profile.currentRole}`);
  if (profile.targetRole)      lines.push(`Target role: ${profile.targetRole}`);
  if (profile.experienceLevel) lines.push(`Experience level: ${profile.experienceLevel}`);
  if (profile.geography)       lines.push(`Location: ${profile.geography}`);
  if (profile.goals?.length)
    lines.push(`Goals: ${profile.goals.join("; ")}`);
  if (profile.painPoints?.length)
    lines.push(`Stated pain points: ${profile.painPoints.join("; ")}`);

  // ── Documents ────────────────────────────────────────
  if (documents.length) {
    lines.push("\n=== DOCUMENTS ON FILE ===");
    for (const d of documents) {
      lines.push(`• ${d.title} [${d.type}] — status: ${d.status}, updated ${d.updatedAt}`);
    }
  }

  // ── Session history (last 8, summaries only) ─────────
  const pastSessions = sessions
    .filter(s => s.transcriptTurns > 0)
    .slice(0, 8);

  if (pastSessions.length) {
    lines.push("\n=== COACHING HISTORY (most recent first) ===");
    for (const s of pastSessions) {
      lines.push(`• ${s.startedAt} [${s.mode}] — ${s.summary}`);
    }
  }

  // ── Action plan ──────────────────────────────────────
  const pending = actionPlan.filter(a => !a.completed);
  if (pending.length) {
    lines.push("\n=== CURRENT ACTION PLAN ===");
    for (const a of pending) {
      lines.push(`• [${a.priority}] ${a.title} — due ${a.dueLabel}`);
    }
  }

  return lines.join("\n");
}
