"use client";

import type { CSSProperties } from "react";
import { useState } from "react";

export function SubscriptionCheckoutButton({
  label,
  className,
  planId,
  buttonStyle,
}: {
  label: string;
  className: string;
  planId?: string;
  buttonStyle?: CSSProperties;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/billing/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(planId ? { planId } : {}),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.url) {
        setError(data.error || "Unable to start checkout.");
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("Unable to start checkout.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-8">
      <button type="button" onClick={handleClick} disabled={loading} className={className} style={buttonStyle}>
        {loading ? "Redirecting..." : `${label} →`}
      </button>
      {error ? <p className="mt-3 text-center text-xs text-amber-300">{error}</p> : null}
    </div>
  );
}
