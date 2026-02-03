"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export function StickyCTA() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      if (dismissed) return;
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.documentElement.scrollHeight || 1;
      const pct = scrolled / total;
      lastScrollY.current = window.scrollY;
      setVisible(pct >= 0.3);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [dismissed]);

  if (dismissed) return null;

  return (
    <div className={`cmd-sticky ${visible ? "is-visible" : ""}`} aria-hidden={!visible}>
      <div className="cmd-shell flex h-full items-center gap-3">
        <span className="cmd-sticky-icon" aria-hidden="true">
          ⚡
        </span>
        <span className="cmd-sticky-text flex-1">See your exact career gaps in 10 minutes</span>
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
