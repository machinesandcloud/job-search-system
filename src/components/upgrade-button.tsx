"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function UpgradeButton({ assessmentId, token }: { assessmentId: string; token: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleUpgrade = async () => {
    setLoading(true);
    setError(null);
    await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ assessmentId, type: "upgrade_clicked" }),
    });
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ assessmentId, token }),
    });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      setError(data.error || "Stripe is not configured yet.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-3">
      <Button onClick={handleUpgrade} disabled={loading}>
        {loading ? "Redirecting..." : "Upgrade to Pro Pack ($49)"}
      </Button>
      {error ? <p className="text-xs text-amber-300">{error}</p> : null}
    </div>
  );
}
