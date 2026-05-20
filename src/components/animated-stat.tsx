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

interface SalaryBarProps {
  p25: number;
  median: number;
  p75: number;
  currencySymbol: string;
  label?: string;
  color?: string;
}

function fmtK(n: number, sym: string) {
  if (n >= 1_000_000) return `${sym}${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${sym}${Math.round(n / 1_000)}K`;
  return `${sym}${n}`;
}

export function SalaryBar({ p25, median, p75, currencySymbol, label, color = "var(--brand)" }: SalaryBarProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const range = p75 - p25;
  const medianPct = range > 0 ? ((median - p25) / range) * 100 : 50;

  return (
    <div ref={ref} className="space-y-2">
      {label && <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">{label}</p>}
      <div className="relative h-3 w-full overflow-hidden rounded-full bg-[var(--border)]">
        <div
          className="absolute inset-0 rounded-full transition-all duration-700"
          style={{
            background: `linear-gradient(90deg, ${color}50 0%, ${color} 100%)`,
            transform: `scaleX(${visible ? 1 : 0})`,
            transformOrigin: "left",
          }}
        />
        <div
          className="absolute top-0 h-full w-1 rounded-full bg-white shadow transition-all duration-700 delay-300"
          style={{ left: `${medianPct}%`, opacity: visible ? 1 : 0 }}
        />
      </div>
      <div className="flex justify-between text-[11px]">
        <span className="text-[var(--muted)]">{fmtK(p25, currencySymbol)}</span>
        <span className="font-extrabold" style={{ color }}>{fmtK(median, currencySymbol)} median</span>
        <span className="text-[var(--muted)]">{fmtK(p75, currencySymbol)}</span>
      </div>
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
