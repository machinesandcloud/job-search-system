"use client";

import { useEffect } from "react";

type LandingAnalyticsProps = {
  assessmentId?: string | null;
};

export function LandingAnalytics({ assessmentId }: LandingAnalyticsProps) {
  useEffect(() => {
    fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "landing_view",
        assessmentId: assessmentId || null,
        metadata: {
          referrer: document.referrer,
          pathname: window.location.pathname,
        },
      }),
    });
  }, [assessmentId]);

  return null;
}
