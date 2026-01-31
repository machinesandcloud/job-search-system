"use client";

import { useEffect } from "react";

export function PageViewLogger({ type, leadId }: { type: string; leadId?: string }) {
  useEffect(() => {
    fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, leadId }),
    });
  }, [type, leadId]);
  return null;
}
