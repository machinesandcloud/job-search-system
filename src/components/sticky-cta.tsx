"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export function StickyCTA() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => {
      if (dismissed) return;
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.documentElement.scrollHeight || 1;
      const pct = scrolled / total;
      setVisible(pct >= 0.2);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    timerRef.current = setTimeout(() => {
      if (!dismissed) setVisible(true);
    }, 15000);
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [dismissed]);

  if (dismissed) return null;

  return (
    <div className={`cmd-sticky ${visible ? "is-visible" : ""}`} aria-hidden={!visible}>
      <div className="cmd-shell flex h-full items-center gap-3">
        <span className="cmd-sticky-icon" aria-hidden="true">
          ⚡
        </span>
        <span className="cmd-sticky-text cmd-sticky-text-desktop flex-1">
          See your exact career gaps in 10 minutes
        </span>
        <span className="cmd-sticky-text cmd-sticky-text-tablet flex-1">
          See your career gaps in 10 minutes
        </span>
        <span className="cmd-sticky-text cmd-sticky-text-mobile flex-1">
          Get your score in 10 min
        </span>
        <div className="ml-auto flex items-center gap-3">
          <Link
            href="/job-search-system/start"
            data-cta="sticky"
            aria-label="Start assessment"
            className="cmd-sticky-button"
          >
            Get My Score
          </Link>
          <button
            type="button"
            aria-label="Dismiss sticky bar"
            onClick={() => setDismissed(true)}
            className="cmd-sticky-close"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}
