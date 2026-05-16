"use client";

import { useState } from "react";
import {
  coachAdminGhostButtonClass,
  coachAdminInputClass,
  coachAdminPrimaryButtonClass,
} from "@/components/coach-admin-ui";

export function CoachAdminLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/coach-admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Unable to sign in.");
      } else {
        window.location.href = "/coach-admin";
      }
    } catch {
      setError("Unable to sign in.");
    }
    setLoading(false);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="relative mx-auto flex w-full max-w-lg flex-col gap-5 overflow-hidden rounded-[32px] border border-[color:var(--ca-border)] bg-[linear-gradient(180deg,var(--ca-panel-start),var(--ca-panel-end))] p-8 text-[color:var(--ca-text)] shadow-[var(--ca-shell-shadow)] backdrop-blur-2xl"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(67,97,238,0.24),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.12),transparent_30%)]" />
      <div>
        <p className="relative text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-300/80">Coach Admin</p>
        <h1 className="relative mt-3 text-4xl font-semibold tracking-[-0.06em] text-[color:var(--ca-text)]">Internal access</h1>
        <p className="relative mt-3 text-sm leading-7 text-[color:var(--ca-text-muted)]">Allowlisted email plus internal admin password. This session opens the billing and support control layer.</p>
      </div>
      <label className="relative flex flex-col gap-2 text-sm">
        <span className="text-[color:var(--ca-text-muted)]">Email</span>
        <input value={email} onChange={(e) => setEmail(e.target.value)} className={coachAdminInputClass} />
      </label>
      <label className="relative flex flex-col gap-2 text-sm">
        <span className="text-[color:var(--ca-text-muted)]">Password</span>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={coachAdminInputClass} />
      </label>
      {error ? <p className="relative rounded-[20px] border border-rose-400/25 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">{error}</p> : null}
      <button type="submit" disabled={loading} className="relative rounded-[20px] bg-[linear-gradient(135deg,#4361EE,#06B6D4)] px-4 py-3.5 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(67,97,238,0.34)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_44px_rgba(67,97,238,0.42)] disabled:cursor-not-allowed disabled:opacity-70">
        {loading ? "Signing in..." : "Open coach admin"}
      </button>
    </form>
  );
}

export function CoachAdminLogoutButton({ className = "" }: { className?: string }) {
  const [loading, setLoading] = useState(false);

  async function onClick() {
    setLoading(true);
    try {
      await fetch("/api/coach-admin/logout", { method: "POST" });
    } finally {
      window.location.href = "/coach-admin";
    }
  }

  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`${coachAdminGhostButtonClass} ${className}`}
    >
      {loading ? "Signing out..." : "Sign out"}
    </button>
  );
}

const CANCEL_REASONS = [
  "User requested cancellation",
  "Payment issue / non-payment",
  "Switched to a different plan",
  "Account created in error",
  "Violation of terms",
  "Other",
];

export function CoachAdminCancelAccountButton({
  accountId,
  hasSubscription,
}: {
  accountId: string;
  hasSubscription: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState(CANCEL_REASONS[0]);
  const [note, setNote] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const ready = confirm.trim().toUpperCase() === "CANCEL";

  async function onSubmit() {
    if (!ready || loading) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/coach-admin/accounts/${accountId}/subscription`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason, note }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Unable to cancel account.");
        setLoading(false);
      } else {
        window.location.reload();
      }
    } catch {
      setError("Unable to cancel account.");
      setLoading(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        style={{
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          borderRadius: 99, border: "1px solid rgba(244,63,94,0.45)",
          background: "rgba(244,63,94,0.10)", padding: "7px 16px",
          fontSize: 13, fontWeight: 600, color: "#F43F5E",
          cursor: "pointer", whiteSpace: "nowrap",
          transition: "background 0.12s",
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(244,63,94,0.18)"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(244,63,94,0.10)"; }}
      >
        Cancel account
      </button>

      {open && (
        <div style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
          onClick={e => { if (e.target === e.currentTarget) setOpen(false); }}>
          <div style={{ background: "var(--ca-card)", border: "1px solid var(--ca-bd)", borderRadius: 18, padding: "28px 28px 24px", width: "100%", maxWidth: 420, boxShadow: "0 24px 80px rgba(0,0,0,0.45)" }}>
            <p style={{ fontSize: 16, fontWeight: 700, color: "var(--ca-text)", marginBottom: 4 }}>Cancel account</p>
            <p style={{ fontSize: 12.5, color: "var(--ca-text3)", marginBottom: 20, lineHeight: 1.6 }}>
              {hasSubscription ? "This will cancel the Stripe subscription and remove paid access immediately." : "This will close the account."} This action cannot be undone.
            </p>

            <label style={{ display: "block", fontSize: 11.5, fontWeight: 600, color: "var(--ca-text2)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.07em" }}>Reason</label>
            <select
              value={reason}
              onChange={e => setReason(e.target.value)}
              style={{ width: "100%", fontSize: 13, padding: "9px 12px", borderRadius: 10, border: "1px solid var(--ca-bd)", background: "var(--ca-raise)", color: "var(--ca-text)", outline: "none", marginBottom: 14, fontFamily: "inherit" }}
            >
              {CANCEL_REASONS.map(r => <option key={r} value={r}>{r}</option>)}
            </select>

            <label style={{ display: "block", fontSize: 11.5, fontWeight: 600, color: "var(--ca-text2)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.07em" }}>Additional notes (optional)</label>
            <textarea
              value={note}
              onChange={e => setNote(e.target.value)}
              rows={2}
              placeholder="Any context for this cancellation…"
              style={{ width: "100%", boxSizing: "border-box", fontSize: 13, padding: "9px 12px", borderRadius: 10, border: "1px solid var(--ca-bd)", background: "var(--ca-raise)", color: "var(--ca-text)", outline: "none", marginBottom: 14, fontFamily: "inherit", resize: "vertical" }}
            />

            <label style={{ display: "block", fontSize: 11.5, fontWeight: 600, color: "#F43F5E", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.07em" }}>Type CANCEL to confirm</label>
            <input
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              placeholder="CANCEL"
              autoComplete="off"
              style={{ width: "100%", boxSizing: "border-box", fontSize: 13, fontWeight: 700, padding: "9px 12px", borderRadius: 10, border: `1px solid ${ready ? "rgba(244,63,94,0.6)" : "var(--ca-bd)"}`, background: "var(--ca-raise)", color: "#F43F5E", outline: "none", marginBottom: 18, fontFamily: "monospace", letterSpacing: "0.1em", transition: "border-color 0.15s" }}
            />

            {error && <p style={{ fontSize: 12, color: "#F43F5E", marginBottom: 12 }}>{error}</p>}

            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <button type="button" onClick={() => { setOpen(false); setConfirm(""); setError(""); }}
                style={{ padding: "8px 16px", borderRadius: 10, border: "1px solid var(--ca-bd)", background: "transparent", color: "var(--ca-text2)", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                Keep account
              </button>
              <button type="button" onClick={onSubmit} disabled={!ready || loading}
                style={{ padding: "8px 18px", borderRadius: 10, border: "none", background: ready ? "#F43F5E" : "rgba(244,63,94,0.25)", color: ready ? "#fff" : "rgba(244,63,94,0.5)", fontSize: 13, fontWeight: 700, cursor: ready && !loading ? "pointer" : "not-allowed", transition: "background 0.15s, color 0.15s" }}>
                {loading ? "Canceling…" : "Cancel account"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function CoachAdminDeleteAccountButton({ accountId }: { accountId: string }) {
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const ready = confirm.trim().toUpperCase() === "DELETE";

  async function onSubmit() {
    if (!ready || loading) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/coach-admin/accounts/${accountId}`, { method: "DELETE" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Unable to delete account.");
        setLoading(false);
      } else {
        window.location.href = "/coach-admin/accounts";
      }
    } catch {
      setError("Unable to delete account.");
      setLoading(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        style={{
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          borderRadius: 99, border: "1px solid rgba(107,114,128,0.4)",
          background: "transparent", padding: "7px 16px",
          fontSize: 13, fontWeight: 600, color: "var(--ca-text3)",
          cursor: "pointer", whiteSpace: "nowrap", transition: "background 0.12s, color 0.12s, border-color 0.12s",
        }}
        onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = "rgba(244,63,94,0.1)"; b.style.color = "#F43F5E"; b.style.borderColor = "rgba(244,63,94,0.4)"; }}
        onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = "transparent"; b.style.color = "var(--ca-text3)"; b.style.borderColor = "rgba(107,114,128,0.4)"; }}
      >
        Delete account
      </button>

      {open && (
        <div style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
          onClick={e => { if (e.target === e.currentTarget) setOpen(false); }}>
          <div style={{ background: "var(--ca-card)", border: "1px solid var(--ca-bd)", borderRadius: 18, padding: "28px 28px 24px", width: "100%", maxWidth: 420, boxShadow: "0 24px 80px rgba(0,0,0,0.55)" }}>
            <p style={{ fontSize: 16, fontWeight: 700, color: "var(--ca-text)", marginBottom: 4 }}>Delete account</p>
            <p style={{ fontSize: 12.5, color: "var(--ca-text3)", marginBottom: 20, lineHeight: 1.6 }}>
              This permanently deletes the account and all associated users, sessions, and data. Any active Stripe subscription will be canceled first. <strong style={{ color: "#F43F5E" }}>This cannot be undone.</strong>
            </p>

            <label style={{ display: "block", fontSize: 11.5, fontWeight: 600, color: "#F43F5E", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.07em" }}>Type DELETE to confirm</label>
            <input
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              placeholder="DELETE"
              autoComplete="off"
              style={{ width: "100%", boxSizing: "border-box", fontSize: 13, fontWeight: 700, padding: "9px 12px", borderRadius: 10, border: `1px solid ${ready ? "rgba(244,63,94,0.6)" : "var(--ca-bd)"}`, background: "var(--ca-raise)", color: "#F43F5E", outline: "none", marginBottom: 18, fontFamily: "monospace", letterSpacing: "0.1em", transition: "border-color 0.15s" }}
            />

            {error && <p style={{ fontSize: 12, color: "#F43F5E", marginBottom: 12 }}>{error}</p>}

            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <button type="button" onClick={() => { setOpen(false); setConfirm(""); setError(""); }}
                style={{ padding: "8px 16px", borderRadius: 10, border: "1px solid var(--ca-bd)", background: "transparent", color: "var(--ca-text2)", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                Keep account
              </button>
              <button type="button" onClick={onSubmit} disabled={!ready || loading}
                style={{ padding: "8px 18px", borderRadius: 10, border: "none", background: ready ? "#F43F5E" : "rgba(244,63,94,0.25)", color: ready ? "#fff" : "rgba(244,63,94,0.5)", fontSize: 13, fontWeight: 700, cursor: ready && !loading ? "pointer" : "not-allowed", transition: "background 0.15s, color 0.15s" }}>
                {loading ? "Deleting…" : "Delete permanently"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function CoachAdminNoteForm({
  endpoint,
  placeholder = "Add an internal note...",
  buttonLabel = "Add note",
}: {
  endpoint: string;
  placeholder?: string;
  buttonLabel?: string;
}) {
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!note.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ note }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Unable to save note.");
      } else {
        setNote("");
        window.location.reload();
      }
    } catch {
      setError("Unable to save note.");
    }
    setLoading(false);
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder={placeholder} className={`min-h-28 ${coachAdminInputClass}`} />
      {error ? <p className="text-sm text-rose-300">{error}</p> : null}
      <div className="flex justify-end">
        <button type="submit" disabled={loading || !note.trim()} className={coachAdminPrimaryButtonClass}>
          {loading ? "Saving..." : buttonLabel}
        </button>
      </div>
    </form>
  );
}

export function SupportTicketCreateForm({
  accountId,
  reporterOptions,
}: {
  accountId: string;
  reporterOptions: Array<{ id: string; label: string }>;
}) {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("billing");
  const [priority, setPriority] = useState("medium");
  const [userId, setUserId] = useState(reporterOptions[0]?.id || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/coach-admin/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accountId, subject, description, category, priority, userId }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Unable to create ticket.");
      } else if (data.ticketId) {
        window.location.href = `/coach-admin/tickets/${data.ticketId}`;
      }
    } catch {
      setError("Unable to create ticket.");
    }
    setLoading(false);
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3">
      <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Ticket subject" className={coachAdminInputClass} />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the issue or request..." className={`min-h-32 ${coachAdminInputClass}`} />
      <div className="grid gap-3 md:grid-cols-3">
        <select value={category} onChange={(e) => setCategory(e.target.value)} className={coachAdminInputClass}>
          {["billing", "technical", "product", "account", "other"].map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
        <select value={priority} onChange={(e) => setPriority(e.target.value)} className={coachAdminInputClass}>
          {["low", "medium", "high", "urgent"].map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
        <select value={userId} onChange={(e) => setUserId(e.target.value)} className={coachAdminInputClass}>
          <option value="">No reporter</option>
          {reporterOptions.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}
        </select>
      </div>
      {error ? <p className="text-sm text-rose-300">{error}</p> : null}
      <div className="flex justify-end">
        <button type="submit" disabled={loading || !subject.trim() || !description.trim()} className={coachAdminPrimaryButtonClass}>
          {loading ? "Creating..." : "Create ticket"}
        </button>
      </div>
    </form>
  );
}

export function SupportTicketUpdateForm({
  ticketId,
  currentStatus,
  assigneeOptions,
  currentAssigneeId,
}: {
  ticketId: string;
  currentStatus: string;
  assigneeOptions: Array<{ id: string; label: string }>;
  currentAssigneeId?: string | null;
}) {
  const [status, setStatus] = useState(currentStatus);
  const [assignedTo, setAssignedTo] = useState(currentAssigneeId || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/coach-admin/tickets/${ticketId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, assignedTo }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Unable to update ticket.");
      } else {
        window.location.reload();
      }
    } catch {
      setError("Unable to update ticket.");
    }
    setLoading(false);
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3">
      <div className="grid gap-3 md:grid-cols-2">
        <select value={status} onChange={(e) => setStatus(e.target.value)} className={coachAdminInputClass}>
          {["open", "in_progress", "resolved", "closed"].map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
        <select value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} className={coachAdminInputClass}>
          <option value="">Unassigned</option>
          {assigneeOptions.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}
        </select>
      </div>
      {error ? <p className="text-sm text-rose-300">{error}</p> : null}
      <div className="flex justify-end">
        <button type="submit" disabled={loading} className={coachAdminPrimaryButtonClass}>
          {loading ? "Saving..." : "Update ticket"}
        </button>
      </div>
    </form>
  );
}
