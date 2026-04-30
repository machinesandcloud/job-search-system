"use client";

import { useState } from "react";

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
      className="relative mx-auto flex w-full max-w-lg flex-col gap-5 overflow-hidden rounded-[32px] border border-white/12 bg-[linear-gradient(180deg,rgba(14,19,36,0.96),rgba(7,10,20,0.94))] p-8 text-slate-100 shadow-[0_30px_90px_rgba(2,6,23,0.6)] backdrop-blur-2xl"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(67,97,238,0.24),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.12),transparent_30%)]" />
      <div>
        <p className="relative text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-300/80">Coach Admin</p>
        <h1 className="relative mt-3 text-4xl font-semibold tracking-[-0.06em] text-white">Internal access</h1>
        <p className="relative mt-3 text-sm leading-7 text-slate-400">Allowlisted email plus internal admin password. This session opens the billing and support control layer.</p>
      </div>
      <label className="relative flex flex-col gap-2 text-sm">
        <span className="text-slate-300">Email</span>
        <input value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-[20px] border border-white/10 bg-white/[0.05] px-4 py-3.5 text-white outline-none ring-0 transition placeholder:text-slate-500 focus:border-cyan-400/50 focus:bg-white/[0.08]" />
      </label>
      <label className="relative flex flex-col gap-2 text-sm">
        <span className="text-slate-300">Password</span>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="rounded-[20px] border border-white/10 bg-white/[0.05] px-4 py-3.5 text-white outline-none ring-0 transition placeholder:text-slate-500 focus:border-cyan-400/50 focus:bg-white/[0.08]" />
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
      className={`rounded-full border border-white/10 bg-white/[0.06] px-4 py-2.5 text-sm font-medium text-white/82 transition hover:border-white/18 hover:bg-white/[0.1] disabled:opacity-70 ${className}`}
    >
      {loading ? "Signing out..." : "Sign out"}
    </button>
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
      <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder={placeholder} className="min-h-28 rounded-[22px] border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400/50 focus:bg-white/[0.08]" />
      {error ? <p className="text-sm text-rose-300">{error}</p> : null}
      <div className="flex justify-end">
        <button type="submit" disabled={loading || !note.trim()} className="rounded-full bg-[linear-gradient(135deg,#4361EE,#06B6D4)] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(67,97,238,0.28)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70">
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
      <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Ticket subject" className="rounded-[22px] border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400/50 focus:bg-white/[0.08]" />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the issue or request..." className="min-h-32 rounded-[22px] border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400/50 focus:bg-white/[0.08]" />
      <div className="grid gap-3 md:grid-cols-3">
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-[22px] border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400/50 focus:bg-white/[0.08]">
          {["billing", "technical", "product", "account", "other"].map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
        <select value={priority} onChange={(e) => setPriority(e.target.value)} className="rounded-[22px] border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400/50 focus:bg-white/[0.08]">
          {["low", "medium", "high", "urgent"].map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
        <select value={userId} onChange={(e) => setUserId(e.target.value)} className="rounded-[22px] border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400/50 focus:bg-white/[0.08]">
          <option value="">No reporter</option>
          {reporterOptions.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}
        </select>
      </div>
      {error ? <p className="text-sm text-rose-300">{error}</p> : null}
      <div className="flex justify-end">
        <button type="submit" disabled={loading || !subject.trim() || !description.trim()} className="rounded-full bg-[linear-gradient(135deg,#4361EE,#06B6D4)] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(67,97,238,0.28)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70">
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
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-[22px] border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400/50 focus:bg-white/[0.08]">
          {["open", "in_progress", "resolved", "closed"].map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
        <select value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} className="rounded-[22px] border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400/50 focus:bg-white/[0.08]">
          <option value="">Unassigned</option>
          {assigneeOptions.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}
        </select>
      </div>
      {error ? <p className="text-sm text-rose-300">{error}</p> : null}
      <div className="flex justify-end">
        <button type="submit" disabled={loading} className="rounded-full bg-[linear-gradient(135deg,#4361EE,#06B6D4)] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(67,97,238,0.28)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70">
          {loading ? "Saving..." : "Update ticket"}
        </button>
      </div>
    </form>
  );
}
