"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type AccountGateProps = {
  leadId: string;
  token: string;
};

export function AccountGate({ leadId, token }: AccountGateProps) {
  const router = useRouter();
  const [mode, setMode] = useState<"signup" | "login">("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    const endpoint = mode === "signup" ? "/api/auth/signup" : "/api/auth/login";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, leadId }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Unable to continue");
      }

      router.push(`/job-search-system/results/${token}`);
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Unable to continue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cmd-panel cmd-panel-strong rounded-3xl p-6">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-slate-400">
        <button
          type="button"
          onClick={() => setMode("signup")}
          className={mode === "signup" ? "text-slate-100" : "text-slate-500"}
        >
          Create account
        </button>
        <button
          type="button"
          onClick={() => setMode("login")}
          className={mode === "login" ? "text-slate-100" : "text-slate-500"}
        >
          Sign in
        </button>
      </div>
      <div className="mt-4 space-y-3">
        <Input
          type="email"
          placeholder="you@domain.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <Input
          type="password"
          placeholder="Create a secure password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <p className="text-xs text-slate-400">Use at least 8 characters.</p>
        <Button className="w-full" onClick={handleSubmit} disabled={loading}>
          {loading ? "Saving..." : mode === "signup" ? "Unlock full plan" : "Continue"}
        </Button>
        {error && <p className="text-sm text-rose-300">{error}</p>}
      </div>
      <p className="mt-3 text-xs text-slate-400">
        We respect discretion. Your account keeps your plan private and synced.
      </p>
    </div>
  );
}
