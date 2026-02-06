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
  const [showPassword, setShowPassword] = useState(false);
  const examples = [
    {
      label: "Career story rewrite",
      title: "Turns scattered experience into a crisp executive narrative.",
      metric: "+32% interview response rate",
      detail: "We refactor your story into 3 outcomes + a one-line positioning hook.",
    },
    {
      label: "Resume surgery",
      title: "Rebuilds bullets around measurable impact and scope.",
      metric: "ATS +28 score lift",
      detail: "Every bullet moves from task-based to outcome-led.",
    },
    {
      label: "Outreach scripts",
      title: "Writes tailored messages that feel human, not spam.",
      metric: "4x reply rate",
      detail: "Short, specific, and aligned with your target role.",
    },
  ];

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
    <div className="rounded-[20px] border border-white/15 bg-[rgba(15,23,42,0.9)] p-8 text-white shadow-[0_24px_80px_rgba(0,0,0,0.6)] backdrop-blur-[20px]">
      <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#0F172A] via-[#101D35] to-[#0B1220] p-5">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#06B6D4]">AI coach in action</p>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-white/60">
            Live examples
          </span>
        </div>
        <div className="relative mt-4 h-44 overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.2),_transparent_55%)] p-4">
          <div className="absolute inset-0 bg-[linear-gradient(120deg,_rgba(255,255,255,0.03),_transparent_40%,_rgba(255,255,255,0.05))]" />
          {examples.map((example, index) => (
            <div
              key={example.label}
              className="gate-deck-card absolute inset-4 rounded-2xl border border-white/10 bg-[#0B1220]/80 p-4 shadow-[0_18px_50px_rgba(0,0,0,0.35)] backdrop-blur"
              style={{ animationDelay: `${index * 4}s`, zIndex: examples.length - index }}
            >
              <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-white/50">
                <span>{example.label}</span>
                <span className="rounded-full border border-[#06B6D4]/40 bg-[#06B6D4]/10 px-2 py-1 text-[10px] text-[#9BE8F5]">
                  {example.metric}
                </span>
              </div>
              <p className="mt-3 text-base font-semibold text-white">{example.title}</p>
              <p className="mt-2 text-xs text-white/60">{example.detail}</p>
              <div className="mt-4 flex items-center gap-2 text-xs text-white/70">
                <span className="h-2 w-2 rounded-full bg-[#06B6D4]" />
                Personalized to your role + seniority
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#06B6D4]">Unlock full results</p>
        <h3 className="mt-3 text-2xl font-semibold">
          {mode === "signup" ? "Create your account to view your results" : "Log in to view your results"}
        </h3>
        <p className="mt-3 text-sm text-white/70">
          Your personalized plan is ready. Sign up or log in to save it, access scripts, and unlock your full dashboard.
        </p>
      </div>

      <div className="mt-6 space-y-4">
        <div>
          <Label className="text-sm text-white/80">Email address</Label>
          <Input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@domain.com"
            className="mt-2 h-[54px] rounded-xl border border-white/15 bg-white/5 px-4 text-sm"
          />
        </div>
        <div>
          <Label className="text-sm text-white/80">Password</Label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="At least 8 characters"
              className="mt-2 h-[54px] rounded-xl border border-white/15 bg-white/5 px-4 text-sm pr-12"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/60"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {password.length > 0 && password.length < 8 && (
            <p className="mt-2 text-xs text-red-300">Password must be at least 8 characters.</p>
          )}
        </div>
      </div>

      <Button
        className="mt-6 h-14 w-full rounded-xl bg-gradient-to-r from-[#06B6D4] to-[#8B5CF6] text-sm font-bold"
        onClick={submit}
        disabled={loading}
        aria-label={mode === "signup" ? "Create account to unlock full results" : "Log in to unlock full results"}
      >
        {loading ? (mode === "signup" ? "Creating account..." : "Signing in...") : mode === "signup" ? "Create account" : "Log in"}
      </Button>
      {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

      <div className="mt-5 flex items-center justify-between text-xs text-white/60">
        <span>{mode === "signup" ? "Already have an account?" : "New here?"}</span>
        <button
          className="text-[#06B6D4] underline underline-offset-4"
          onClick={() => setMode(mode === "signup" ? "login" : "signup")}
          type="button"
        >
          {mode === "signup" ? "Log in" : "Create one"}
        </button>
      </div>

      <div className="my-6 h-px w-full bg-white/10" />

      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">Why sign up?</p>
        <ul className="mt-3 space-y-2 text-sm text-white/70">
          <li>
            <span className="text-[#06B6D4]">-</span> Save your score + personalized plan
          </li>
          <li>
            <span className="text-[#06B6D4]">-</span> Unlock scripts, templates, and updates
          </li>
          <li>
            <span className="text-[#06B6D4]">-</span> Upgrade to Pro Pack in one click
          </li>
        </ul>
      </div>
    </div>
  );
}
