"use client";

import { useEffect } from "react";

export function ResultsViewLogger({ leadId }: { leadId: string }) {
  useEffect(() => {
    fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ leadId, type: "results_viewed" }),
    });
  }, [leadId]);

  return null;
}
