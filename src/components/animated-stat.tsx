"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({ value, suffix = "", prefix = "", duration = 1200, className = "" }: AnimatedCounterProps) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          observer.disconnect();

          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(Math.round(eased * value));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{display.toLocaleString()}{suffix}
    </span>
  );
}

interface StatCardProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  accent?: string;
}

export function StatCard({ value, suffix = "", prefix = "", label, accent = "var(--brand)" }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-white px-5 py-4 text-center">
      <p className="text-[2rem] font-extrabold tracking-tight" style={{ color: accent }}>
        <AnimatedCounter value={value} suffix={suffix} prefix={prefix} />
      </p>
      <p className="mt-1 text-[12px] text-[var(--muted)]">{label}</p>
    </div>
  );
}

interface WinScoreProps {
  zariWins: number;
  total: number;
  competitorName: string;
}

export function WinScore({ zariWins, total, competitorName }: WinScoreProps) {
  const [filled, setFilled] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let i = 0;
          const interval = setInterval(() => {
            i++;
            setFilled(i);
            if (i >= zariWins) clearInterval(interval);
          }, 180);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [zariWins]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-3">
      <div className="flex gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className="h-3 w-3 rounded-full transition-all duration-300"
            style={{
              background: i < filled ? "var(--brand)" : "rgba(0,0,0,0.08)",
              transform: i < filled ? "scale(1.2)" : "scale(1)",
            }}
          />
        ))}
      </div>
      <p className="text-[12px] text-[var(--muted)]">
        Zari wins <strong className="text-[var(--brand)]">{zariWins}</strong> of {total} tasks vs {competitorName}
      </p>
    </div>
  );
}
