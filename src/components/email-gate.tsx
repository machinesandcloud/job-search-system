"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type EmailGateProps = {
  leadId: string;
};

export function EmailGate({ leadId }: EmailGateProps) {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!email) return;
    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/leads/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId, email, website: "" }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Unable to send email");
      }
      setSent(true);
    } catch (err: any) {
      setError(err.message || "Unable to send email");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="cmd-panel cmd-panel-strong rounded-3xl p-6">
      <p className="text-xs uppercase tracking-wide text-slate-400">Unlock full results</p>
      <h3 className="mt-3 text-xl font-semibold text-slate-100">Enter your email to unlock the full plan</h3>
      <p className="mt-2 text-sm text-slate-300">
        We’ll send your personalized report link. No spam. No sales call.
      </p>
      <div className="mt-4 space-y-3">
        <Input
          type="email"
          placeholder="you@domain.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <Button className="w-full" onClick={handleSubmit} disabled={sending}>
          {sending ? "Sending..." : "Send my full plan"}
        </Button>
      </div>
      {sent && <p className="mt-3 text-sm text-emerald-200">Email sent. Check your inbox for the link.</p>}
      {error && <p className="mt-3 text-sm text-rose-300">{error}</p>}
      <p className="mt-3 text-xs text-slate-400">By continuing, you agree to receive a single results email.</p>
    </div>
  );
}
