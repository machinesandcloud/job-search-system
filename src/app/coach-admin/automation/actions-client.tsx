"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

const SEQUENCES = [
  "trial_onboarding", "trial_ending", "paid_welcome", "lead_nurture",
  "milestone_1", "milestone_5", "upsell_limit", "at_risk",
  "win_back_30", "win_back_60", "win_back_90", "nps_survey",
  "dunning", "non_starter", "feature_activation", "referral",
  "testimonial", "annual_upsell", "detractor_followup",
] as const;

function btn(color: string) {
  return {
    fontSize: 11, fontWeight: 600, padding: "3px 9px", borderRadius: 6,
    border: `1px solid ${color}33`, background: `${color}14`, color,
    cursor: "pointer", transition: "opacity 0.12s",
  } as React.CSSProperties;
}

export function CancelEnrollmentButton({ enrollmentId, email, sequence }: { enrollmentId: string; email: string; sequence: string }) {
  const [pending, start] = useTransition();
  const router = useRouter();
  return (
    <button
      disabled={pending}
      style={{ ...btn("#F43F5E"), opacity: pending ? 0.5 : 1 }}
      onClick={() => start(async () => {
        await fetch("/api/coach-admin/automation/sequences", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "cancel", email, sequence }),
        });
        router.refresh();
      })}
    >
      {pending ? "…" : "Cancel"}
    </button>
  );
}

export function UnsuppressButton({ email }: { email: string }) {
  const [pending, start] = useTransition();
  const router = useRouter();
  return (
    <button
      disabled={pending}
      style={{ ...btn("#22C55E"), opacity: pending ? 0.5 : 1 }}
      onClick={() => start(async () => {
        await fetch("/api/coach-admin/automation/sequences", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "unsuppress", email }),
        });
        router.refresh();
      })}
    >
      {pending ? "…" : "Unsuppress"}
    </button>
  );
}

export function EnrollForm() {
  const [email, setEmail] = useState("");
  const [sequence, setSequence] = useState(SEQUENCES[0]);
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    const res = await fetch("/api/coach-admin/automation/sequences", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "enroll", email: email.trim(), sequence }),
    });
    setStatus(res.ok ? "ok" : "err");
    if (res.ok) { setEmail(""); router.refresh(); }
    setTimeout(() => setStatus("idle"), 2500);
  }

  return (
    <form onSubmit={submit} style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
      <input
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="user@example.com"
        type="email"
        required
        style={{ fontSize: 12, padding: "5px 9px", borderRadius: 7, border: "1px solid var(--ca-bd)", background: "var(--ca-raise)", color: "var(--ca-text)", outline: "none", minWidth: 200 }}
      />
      <select
        value={sequence}
        onChange={e => setSequence(e.target.value as typeof sequence)}
        style={{ fontSize: 12, padding: "5px 9px", borderRadius: 7, border: "1px solid var(--ca-bd)", background: "var(--ca-raise)", color: "var(--ca-text)", outline: "none" }}
      >
        {SEQUENCES.map(s => <option key={s} value={s}>{s}</option>)}
      </select>
      <button
        type="submit"
        disabled={status === "loading"}
        style={{ ...btn("#3B82F6"), padding: "5px 12px", opacity: status === "loading" ? 0.5 : 1 }}
      >
        {status === "loading" ? "…" : status === "ok" ? "Enrolled ✓" : status === "err" ? "Error" : "Enroll"}
      </button>
    </form>
  );
}

export function TriggerQueueButton({ isAdmin }: { isAdmin: boolean }) {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [result, setResult] = useState<{ sent?: number; errors?: number } | null>(null);
  const router = useRouter();

  if (!isAdmin) return null;

  async function trigger() {
    setStatus("loading");
    setResult(null);
    const res = await fetch("/api/coach-admin/automation/trigger", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cron: "sequence_queue" }),
    });
    if (res.ok) {
      const data = await res.json();
      setResult(data);
      setStatus("ok");
      router.refresh();
    } else {
      setStatus("err");
    }
    setTimeout(() => setStatus("idle"), 4000);
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <button
        disabled={status === "loading"}
        onClick={trigger}
        style={{ ...btn("#8B5CF6"), padding: "5px 12px", opacity: status === "loading" ? 0.5 : 1 }}
      >
        {status === "loading" ? "Running…" : status === "ok" ? `Done · ${result?.sent ?? 0} sent` : status === "err" ? "Error" : "Run queue now"}
      </button>
    </div>
  );
}

type BackfillResult = {
  total?: number;
  enrolled?: number;
  skipped?: number;
  suppressed?: number;
  emailsSent?: number;
  errors?: number;
};

export function BackfillButton({ isAdmin }: { isAdmin: boolean }) {
  const [status, setStatus] = useState<"idle" | "confirm" | "loading" | "ok" | "err">("idle");
  const [result, setResult] = useState<BackfillResult | null>(null);
  const router = useRouter();

  if (!isAdmin) return null;

  async function run() {
    setStatus("loading");
    setResult(null);
    const res = await fetch("/api/coach-admin/automation/backfill", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      const data: BackfillResult = await res.json();
      setResult(data);
      setStatus("ok");
      router.refresh();
    } else {
      setStatus("err");
    }
  }

  if (status === "confirm") {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ fontSize: 11, color: "var(--ca-text2)" }}>Send welcome emails to all un-enrolled users?</span>
        <button onClick={run} style={{ ...btn("#F43F5E"), padding: "4px 10px" }}>Yes, send</button>
        <button onClick={() => setStatus("idle")} style={{ ...btn("#6B7280"), padding: "4px 10px" }}>Cancel</button>
      </div>
    );
  }

  if (status === "ok" && result) {
    return (
      <div style={{ fontSize: 11, color: "#22C55E", fontWeight: 600 }}>
        Backfill done · {result.enrolled} enrolled · {result.emailsSent} sent · {result.skipped} skipped
      </div>
    );
  }

  return (
    <button
      disabled={status === "loading"}
      onClick={() => setStatus("confirm")}
      style={{ ...btn("#F59E0B"), padding: "5px 12px", opacity: status === "loading" ? 0.5 : 1 }}
    >
      {status === "loading" ? "Backfilling…" : status === "err" ? "Error — retry?" : "Backfill all users"}
    </button>
  );
}

type BroadcastResult = { sent?: number; skipped?: number; errors?: number; total?: number };

export function BroadcastForm({ isAdmin }: { isAdmin: boolean }) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "confirm" | "sending" | "ok" | "err">("idle");
  const [result, setResult] = useState<BroadcastResult | null>(null);

  if (!isAdmin) return null;

  async function send(testOnly: boolean) {
    setStatus("sending");
    setResult(null);
    const res = await fetch("/api/coach-admin/automation/broadcast", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject: subject.trim(), message: message.trim(), testOnly }),
    });
    if (res.ok) {
      const data: BroadcastResult = await res.json();
      setResult(data);
      setStatus("ok");
    } else {
      setStatus("err");
    }
  }

  if (status === "ok" && result) {
    return (
      <div>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#22C55E", marginBottom: 6 }}>
          Sent! {result.sent} delivered · {result.skipped} suppressed · {result.errors} errors
        </div>
        <button onClick={() => { setStatus("idle"); setSubject(""); setMessage(""); setResult(null); }} style={{ ...btn("#6B7280"), padding: "4px 10px" }}>
          Send another
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <input
        value={subject}
        onChange={e => setSubject(e.target.value)}
        placeholder="Subject line"
        style={{ fontSize: 12, padding: "7px 10px", borderRadius: 7, border: "1px solid var(--ca-bd)", background: "var(--ca-raise)", color: "var(--ca-text)", outline: "none", width: "100%", boxSizing: "border-box" as const }}
      />
      <textarea
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder="Email body (plain text, line breaks become paragraphs)"
        rows={5}
        style={{ fontSize: 12, padding: "7px 10px", borderRadius: 7, border: "1px solid var(--ca-bd)", background: "var(--ca-raise)", color: "var(--ca-text)", outline: "none", width: "100%", boxSizing: "border-box" as const, resize: "vertical", fontFamily: "inherit" }}
      />
      {status === "confirm" ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ fontSize: 11.5, color: "#F59E0B", fontWeight: 600 }}>
            This will email ALL contacts. Are you sure?
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <button
              onClick={() => send(false)}
              disabled={status !== "confirm"}
              style={{ ...btn("#F43F5E"), padding: "5px 12px" }}
            >
              Yes, send to everyone
            </button>
            <button onClick={() => setStatus("idle")} style={{ ...btn("#6B7280"), padding: "5px 10px" }}>Cancel</button>
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", gap: 6 }}>
          <button
            disabled={!subject.trim() || !message.trim() || status === "sending"}
            onClick={() => send(true)}
            style={{ ...btn("#6B7280"), padding: "5px 12px", opacity: (!subject.trim() || !message.trim()) ? 0.4 : 1 }}
          >
            {status === "sending" ? "Sending…" : "Send test (1 user)"}
          </button>
          <button
            disabled={!subject.trim() || !message.trim() || status === "sending"}
            onClick={() => setStatus("confirm")}
            style={{ ...btn("#3B82F6"), padding: "5px 12px", opacity: (!subject.trim() || !message.trim()) ? 0.4 : 1 }}
          >
            Send to all
          </button>
        </div>
      )}
      {status === "err" && <div style={{ fontSize: 11, color: "#F43F5E" }}>Send failed — check Resend API key and try again.</div>}
    </div>
  );
}
