import Link from "next/link";
import type { ReactNode } from "react";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

type Tone = "brand" | "cyan" | "gold" | "rose" | "emerald" | "slate";

const toneMap: Record<Tone, { pill: string; ring: string; glow: string; bar: string }> = {
  brand: {
    pill: "border-[#6A7CFF]/30 bg-[#4F62F8]/14 text-[#CBD5FF]",
    ring: "border-[#6378FF]/22",
    glow: "from-[#4361EE]/18 via-[#818CF8]/10 to-transparent",
    bar: "from-[#4361EE] via-[#818CF8] to-[#06B6D4]",
  },
  cyan: {
    pill: "border-cyan-400/20 bg-cyan-400/10 text-cyan-200",
    ring: "border-cyan-400/20",
    glow: "from-cyan-400/16 via-sky-400/10 to-transparent",
    bar: "from-cyan-300 via-sky-400 to-indigo-400",
  },
  gold: {
    pill: "border-amber-400/25 bg-amber-400/10 text-amber-100",
    ring: "border-amber-400/20",
    glow: "from-amber-400/18 via-orange-400/10 to-transparent",
    bar: "from-amber-300 via-orange-400 to-rose-400",
  },
  rose: {
    pill: "border-rose-400/25 bg-rose-400/10 text-rose-100",
    ring: "border-rose-400/20",
    glow: "from-rose-400/18 via-fuchsia-400/10 to-transparent",
    bar: "from-rose-300 via-rose-400 to-orange-400",
  },
  emerald: {
    pill: "border-emerald-400/20 bg-emerald-400/10 text-emerald-100",
    ring: "border-emerald-400/20",
    glow: "from-emerald-400/18 via-teal-400/10 to-transparent",
    bar: "from-emerald-300 via-teal-400 to-cyan-400",
  },
  slate: {
    pill: "border-white/10 bg-white/[0.06] text-white/80",
    ring: "border-white/10",
    glow: "from-white/10 via-white/5 to-transparent",
    bar: "from-white/40 via-white/20 to-white/10",
  },
};

export function CoachAdminPill({
  children,
  tone = "slate",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]",
        toneMap[tone].pill,
        className
      )}
    >
      {children}
    </span>
  );
}

export function CoachAdminPanel({
  eyebrow,
  title,
  description,
  action,
  children,
  className,
}: {
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cx(
        "relative overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(17,24,39,0.92),rgba(8,12,24,0.92))] p-6 shadow-[0_20px_80px_rgba(2,6,23,0.55)] backdrop-blur-2xl",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(67,97,238,0.10),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.08),transparent_28%)]" />
      {(eyebrow || title || description || action) ? (
        <div className="relative mb-6 flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-2xl">
            {eyebrow ? <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-300/80">{eyebrow}</p> : null}
            {title ? <h2 className="mt-2 text-[1.65rem] font-semibold tracking-[-0.05em] text-white">{title}</h2> : null}
            {description ? <p className="mt-2 text-sm leading-7 text-slate-400">{description}</p> : null}
          </div>
          {action ? <div className="relative">{action}</div> : null}
        </div>
      ) : null}
      <div className="relative">{children}</div>
    </section>
  );
}

export function CoachAdminMetricCard({
  label,
  value,
  note,
  tone = "brand",
  accent,
}: {
  label: string;
  value: ReactNode;
  note: string;
  tone?: Tone;
  accent?: ReactNode;
}) {
  return (
    <div className={cx("group relative overflow-hidden rounded-[28px] border bg-white/[0.03] p-5 backdrop-blur-xl transition-transform duration-200 hover:-translate-y-0.5", toneMap[tone].ring)}>
      <div className={cx("pointer-events-none absolute inset-0 bg-gradient-to-br opacity-90", toneMap[tone].glow)} />
      <div className="relative flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/42">{label}</p>
          <div className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-white">{value}</div>
          <p className="mt-3 max-w-[20rem] text-sm leading-6 text-slate-400">{note}</p>
        </div>
        {accent ? <div className="mt-1 text-white/65">{accent}</div> : null}
      </div>
    </div>
  );
}

export function CoachAdminProgress({
  label,
  value,
  max,
  tone = "brand",
  valueLabel,
}: {
  label: string;
  value: number;
  max: number;
  tone?: Tone;
  valueLabel?: string;
}) {
  const width = max > 0 ? Math.max(6, Math.min(100, Math.round((value / max) * 100))) : 0;
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="text-slate-300">{label}</span>
        <span className="text-white/80">{valueLabel || value.toLocaleString()}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
        <div className={cx("h-full rounded-full bg-gradient-to-r", toneMap[tone].bar)} style={{ width: `${width}%` }} />
      </div>
    </div>
  );
}

export function CoachAdminEmptyState({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-[24px] border border-dashed border-white/10 bg-white/[0.03] px-5 py-6">
      <p className="text-sm font-medium text-white/80">{title}</p>
      <p className="mt-2 text-sm leading-6 text-slate-400">{body}</p>
    </div>
  );
}

export function CoachAdminLinkButton({
  href,
  children,
  tone = "slate",
}: {
  href: string;
  children: ReactNode;
  tone?: Tone;
}) {
  return (
    <Link
      href={href}
      className={cx(
        "inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium transition hover:-translate-y-0.5",
        toneMap[tone].pill
      )}
    >
      {children}
    </Link>
  );
}

export function CoachAdminMetaItem({
  label,
  value,
}: {
  label: string;
  value: ReactNode;
}) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-white/[0.03] px-4 py-3">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/38">{label}</p>
      <div className="mt-2 text-sm leading-6 text-slate-200">{value}</div>
    </div>
  );
}

