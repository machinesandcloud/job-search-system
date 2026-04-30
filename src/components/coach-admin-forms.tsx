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
    <form onSubmit={onSubmit} className="mx-auto flex w-full max-w-md flex-col gap-4 rounded-3xl border border-slate-800 bg-slate-950 p-8 text-slate-100 shadow-2xl">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-400/80">Coach Admin</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em]">Internal access</h1>
        <p className="mt-2 text-sm text-slate-400">Allowlisted email plus internal admin password.</p>
      </div>
      <label className="flex flex-col gap-2 text-sm">
        <span className="text-slate-300">Email</span>
        <input value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 outline-none ring-0 transition focus:border-cyan-500" />
      </label>
      <label className="flex flex-col gap-2 text-sm">
        <span className="text-slate-300">Password</span>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 outline-none ring-0 transition focus:border-cyan-500" />
      </label>
      {error ? <p className="rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</p> : null}
      <button type="submit" disabled={loading} className="rounded-2xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-70">
        {loading ? "Signing in..." : "Open coach admin"}
      </button>
    </form>
  );
}

export function CoachAdminLogoutButton() {
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
    <button onClick={onClick} disabled={loading} className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-slate-600 hover:bg-slate-800 disabled:opacity-70">
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
      <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder={placeholder} className="min-h-28 rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-500" />
      {error ? <p className="text-sm text-rose-300">{error}</p> : null}
      <div className="flex justify-end">
        <button type="submit" disabled={loading || !note.trim()} className="rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-70">
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
      <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Ticket subject" className="rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-500" />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the issue or request..." className="min-h-32 rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-500" />
      <div className="grid gap-3 md:grid-cols-3">
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-500">
          {["billing", "technical", "product", "account", "other"].map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
        <select value={priority} onChange={(e) => setPriority(e.target.value)} className="rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-500">
          {["low", "medium", "high", "urgent"].map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
        <select value={userId} onChange={(e) => setUserId(e.target.value)} className="rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-500">
          <option value="">No reporter</option>
          {reporterOptions.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}
        </select>
      </div>
      {error ? <p className="text-sm text-rose-300">{error}</p> : null}
      <div className="flex justify-end">
        <button type="submit" disabled={loading || !subject.trim() || !description.trim()} className="rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-70">
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
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-500">
          {["open", "in_progress", "resolved", "closed"].map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
        <select value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} className="rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-500">
          <option value="">Unassigned</option>
          {assigneeOptions.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}
        </select>
      </div>
      {error ? <p className="text-sm text-rose-300">{error}</p> : null}
      <div className="flex justify-end">
        <button type="submit" disabled={loading} className="rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-70">
          {loading ? "Saving..." : "Update ticket"}
        </button>
      </div>
    </form>
  );
}
