"use client";

import { useEffect } from "react";

export function PageViewLogger({ type, assessmentId }: { type: string; assessmentId?: string }) {
  useEffect(() => {
    fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, assessmentId }),
    });
  }, [type, assessmentId]);

  return null;
}
