"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function UpgradeButton({ leadId, token }: { leadId: string; token: string }) {
  const [loading, setLoading] = useState(false);
  const handleUpgrade = async () => {
    setLoading(true);
    await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ leadId, type: "upgrade_clicked" }),
    });
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ leadId, token }),
    });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
    setLoading(false);
  };

  return (
    <Button onClick={handleUpgrade} disabled={loading}>
      {loading ? "Redirecting..." : "Upgrade to Pro Pack ($49)"}
    </Button>
  );
}
