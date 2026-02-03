"use client";

import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  value: number;
  suffix?: string;
  duration?: number;
  delay?: number;
  live?: boolean;
  liveIntervalMs?: number;
  startOnMount?: boolean;
  easing?: "bounce" | "linear";
  revealSuffix?: boolean;
  className?: string;
};

export function CountUp({
  value,
  suffix = "",
  duration = 900,
  delay = 0,
  live = false,
  liveIntervalMs = 3000,
  startOnMount = false,
  easing = "linear",
  revealSuffix = false,
  className,
}: CountUpProps) {
  const [display, setDisplay] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [showSuffix, setShowSuffix] = useState(!revealSuffix);
  const started = useRef(false);
  const completed = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (startOnMount) {
      setIsVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.5 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }
    if (started.current) return;
    started.current = true;
    timeoutRef.current = setTimeout(() => {
      const start = performance.now();
      const animate = (time: number) => {
        const progress = Math.min(1, (time - start) / duration);
        const easedRaw =
          easing === "bounce"
            ? 1 + Math.pow(progress - 1, 3) * 1.7
            : progress;
        const eased = Math.min(1, Math.max(0, easedRaw));
        const next = Math.round(value * eased);
        setDisplay(next);
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          completed.current = true;
          if (revealSuffix) setShowSuffix(true);
          if (live && !intervalRef.current) {
            intervalRef.current = setInterval(() => {
              setDisplay((current) => current + 1);
            }, liveIntervalMs);
          }
        }
      };
      requestAnimationFrame(animate);
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [isVisible, value, duration, delay, live, liveIntervalMs]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix ? (
        <span className={`cmd-suffix ${showSuffix ? "is-visible" : ""}`}>{suffix}</span>
      ) : null}
    </span>
  );
}
