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
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#06B6D4]">Unlock full results</p>
      <h3 className="mt-3 text-2xl font-semibold">
        {mode === "signup" ? "Create your account" : "Log in to your account"}
      </h3>
      <p className="mt-3 text-sm text-white/70">
        Your full plan is waiting. Save your assessment, access templates, and upgrade to Pro when ready.
      </p>

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
        {loading ? "Creating account..." : mode === "signup" ? "Create account" : "Log in"}
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
