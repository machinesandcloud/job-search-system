"use client";

import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  value: number;
  suffix?: string;
  duration?: number;
  delay?: number;
  live?: boolean;
  liveIntervalMs?: number;
  className?: string;
};

export function CountUp({
  value,
  suffix = "",
  duration = 900,
  delay = 0,
  live = false,
  liveIntervalMs = 3000,
  className,
}: CountUpProps) {
  const [display, setDisplay] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const started = useRef(false);
  const completed = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.4 }
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
        const next = Math.round(value * progress);
        setDisplay(next);
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          completed.current = true;
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
      {suffix}
    </span>
  );
}
