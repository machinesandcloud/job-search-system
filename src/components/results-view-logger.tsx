"use client";

import { useEffect } from "react";

export function ResultsViewLogger({ assessmentId }: { assessmentId: string }) {
  useEffect(() => {
    fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ assessmentId, type: "results_viewed" }),
    });
  }, [assessmentId]);

  return null;
}
