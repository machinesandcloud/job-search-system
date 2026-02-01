"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function AdminLoginForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    setError(null);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Unable to send link");
      return;
    }
    setSent(true);
  };

  return (
    <div className="max-w-md rounded-3xl border border-slate-700 bg-slate-900/70 p-6 shadow-sm">
      <h1 className="text-2xl font-semibold text-slate-100">Admin login</h1>
      <p className="mt-2 text-sm text-slate-300">We'll send a magic link to your email.</p>
      <div className="mt-4 space-y-3">
        <Input placeholder="you@askia.tech" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Button onClick={submit} className="w-full">
          Send link
        </Button>
        {sent && <p className="text-sm text-emerald-200">Magic link sent.</p>}
        {error && <p className="text-sm text-red-400">{error}</p>}
      </div>
    </div>
  );
}
