"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export function StickyCTA() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const lastScrollY = useRef(0);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => {
      if (dismissed) return;
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.documentElement.scrollHeight || 1;
      const pct = scrolled / total;
      const current = window.scrollY;
      const direction = current > lastScrollY.current ? "down" : "up";
      lastScrollY.current = current;

      if (direction === "up") {
        setVisible(false);
        if (hideTimer.current) {
          clearTimeout(hideTimer.current);
          hideTimer.current = null;
        }
        return;
      }

      if (pct >= 0.4) {
        setVisible(true);
        if (!hideTimer.current) {
          hideTimer.current = setTimeout(() => {
            setVisible(false);
            hideTimer.current = null;
          }, 10000);
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, [dismissed]);

  if (dismissed) return null;

  return (
    <div className={`cmd-sticky ${visible ? "is-visible" : ""}`} aria-hidden={!visible}>
      <div className="cmd-shell flex h-full items-center gap-3">
        <span className="cmd-sticky-icon" aria-hidden="true" />
        <span className="cmd-sticky-text flex-1">Get your score in 8 questions — it&apos;s free</span>
        <div className="ml-auto flex items-center gap-3">
          <Link
            href="/job-search-system/start"
            data-cta="sticky"
            aria-label="Start assessment"
            className="cmd-cta cmd-cta-animated cmd-cta-pulse rounded-full px-4 py-2 text-xs font-semibold text-slate-950"
          >
            Start Assessment →
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
