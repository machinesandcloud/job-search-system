"use client";

import { useEffect, useRef } from "react";

type LandingAnalyticsProps = {
  leadId?: string | null;
};

const scrollMarks = [0.25, 0.5, 0.75, 1];

export function LandingAnalytics({ leadId }: LandingAnalyticsProps) {
  const fired = useRef(new Set<number>());
  const sectionTimers = useRef(new Map<string, number>());

  useEffect(() => {
    const track = (type: string, metadata?: Record<string, unknown>) => {
      fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          leadId: leadId || null,
          metadata: metadata || {},
        }),
      }).catch(() => null);
    };

    const onScroll = () => {
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.documentElement.scrollHeight || 1;
      const pct = scrolled / total;
      scrollMarks.forEach((mark) => {
        if (pct >= mark && !fired.current.has(mark)) {
          fired.current.add(mark);
          track("scroll_depth", { depth: mark });
        }
      });
    };

    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      const button = target.closest("[data-cta]") as HTMLElement | null;
      if (button) {
        track("cta_clicked", { location: button.getAttribute("data-cta") || "unknown" });
      }
    };

    let previewStart = 0;
    const preview = document.querySelector("[data-preview-card]");
    const previewObserver = preview
      ? new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              previewStart = performance.now();
            } else if (previewStart) {
              const duration = Math.round(performance.now() - previewStart);
              track("preview_hover_time", { duration });
              previewStart = 0;
            }
          },
          { threshold: 0.4 }
        )
      : null;

    if (preview && previewObserver) previewObserver.observe(preview);

    const sections = Array.from(document.querySelectorAll("[data-section]"));
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const name = entry.target.getAttribute("data-section") || "unknown";
          if (entry.isIntersecting) {
            sectionTimers.current.set(name, performance.now());
          } else if (sectionTimers.current.has(name)) {
            const start = sectionTimers.current.get(name) || 0;
            const duration = Math.round(performance.now() - start);
            track("section_view_time", { section: name, duration });
            sectionTimers.current.delete(name);
          }
        });
      },
      { threshold: 0.4 }
    );

    sections.forEach((section) => sectionObserver.observe(section));
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("click", onClick);
      previewObserver?.disconnect();
      sectionObserver.disconnect();
    };
  }, [leadId]);

  return null;
}
