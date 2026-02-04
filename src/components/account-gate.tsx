"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type AccountGateProps = {
  assessmentId: string;
  onSuccess?: () => void;
};

export function AccountGate({ assessmentId, onSuccess }: AccountGateProps) {
  const [mode, setMode] = useState<"signup" | "login">("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/auth/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, assessmentId }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Unable to continue");
      }
      if (onSuccess) {
        onSuccess();
      } else if (typeof window !== "undefined") {
        window.location.reload();
      }
    } catch (err: any) {
      setError(err.message || "Unable to continue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cmd-panel rounded-3xl p-6">
      <p className="tag mb-3">Unlock full results</p>
      <h3 className="text-xl font-semibold text-slate-100">
        {mode === "signup" ? "Create your account" : "Log in to your account"}
      </h3>
      <p className="mt-2 text-sm text-slate-300">
        Your full plan is waiting. Save your assessment, access templates, and upgrade to Pro when ready.
      </p>
      <Label className="mt-4 text-slate-200">Email address</Label>
      <Input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@domain.com" />
      <Label className="mt-4 text-slate-200">Password</Label>
      <Input
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="At least 8 characters"
      />
      <Button
        className="mt-4 w-full"
        onClick={submit}
        disabled={loading}
        aria-label={mode === "signup" ? "Create account to unlock full results" : "Log in to unlock full results"}
      >
        {loading ? "Processing..." : mode === "signup" ? "Create account" : "Log in"}
      </Button>
      {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
      <div className="mt-5 flex items-center justify-between text-xs text-slate-400">
        <span>{mode === "signup" ? "Already have an account?" : "New here?"}</span>
        <button
          className="text-slate-200 underline decoration-slate-600 underline-offset-4"
          onClick={() => setMode(mode === "signup" ? "login" : "signup")}
          type="button"
        >
          {mode === "signup" ? "Log in" : "Create one"}
        </button>
      </div>
      <div className="mt-6 rounded-2xl border border-slate-700 bg-slate-950/60 p-4 text-sm text-slate-300">
        <p className="text-xs uppercase tracking-wide text-slate-400">Why sign up?</p>
        <ul className="mt-2 space-y-1">
          <li>- Save your score + personalized plan.</li>
          <li>- Unlock scripts, templates, and updates.</li>
          <li>- Upgrade to Pro Pack in one click.</li>
        </ul>
      </div>
    </div>
  );
}
