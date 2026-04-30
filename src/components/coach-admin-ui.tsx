import Link from "next/link";
import type { ReactNode } from "react";

export function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export type Tone = "brand" | "cyan" | "gold" | "rose" | "emerald" | "slate";

const toneMap: Record<Tone, { pill: string; ring: string; glow: string; bar: string }> = {
  brand: {
    pill: "border-[#3B82F6]/30 bg-[linear-gradient(135deg,#3B82F6,#2563EB)] text-white shadow-[0_14px_30px_rgba(37,99,235,0.28)]",
    ring: "border-[#3B82F6]/24",
    glow: "from-[#2563EB]/10 via-[#60A5FA]/6 to-transparent",
    bar: "from-[#3B82F6] via-[#2563EB] to-[#0EA5E9]",
  },
  cyan: {
    pill: "border-sky-400/24 bg-sky-400/12 text-sky-100",
    ring: "border-sky-400/20",
    glow: "from-sky-400/16 via-blue-400/10 to-transparent",
    bar: "from-sky-300 via-blue-400 to-indigo-400",
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
    pill: "border-[color:var(--ca-button-border)] bg-[var(--ca-button-bg)] text-[color:var(--ca-button-text)] shadow-[var(--ca-button-shadow)]",
    ring: "border-[color:var(--ca-border)]",
    glow: "from-[var(--ca-glass-glow)] via-transparent to-transparent",
    bar: "from-[var(--ca-text-muted)] via-[var(--ca-border-strong)] to-[var(--ca-border)]",
  },
};

export const coachAdminTextPrimaryClass = "text-[color:var(--ca-text)]";
export const coachAdminTextMutedClass = "text-[color:var(--ca-text-muted)]";
export const coachAdminTextSoftClass = "text-[color:var(--ca-text-soft)]";
export const coachAdminTextInverseClass = "text-white";
export const coachAdminSubtleCardClass = "rounded-[20px] border border-[color:var(--ca-border)] bg-[var(--ca-surface-soft)]";
export const coachAdminInsetCardClass = "rounded-[22px] border border-[color:var(--ca-border)] bg-[var(--ca-surface-strong)]";
export const coachAdminListCardClass = "rounded-[20px] border border-[color:var(--ca-border)] bg-[var(--ca-surface-soft)] transition hover:border-[color:var(--ca-border-strong)] hover:bg-[var(--ca-surface-hover)]";
export const coachAdminInputClass = "rounded-[22px] border border-[color:var(--ca-border)] bg-[var(--ca-input-bg)] px-4 py-3 text-sm text-[color:var(--ca-text)] outline-none transition placeholder:text-[color:var(--ca-text-soft)] focus:border-cyan-400/45 focus:bg-[var(--ca-input-focus-bg)]";
export const coachAdminPrimaryButtonClass = "rounded-full bg-[linear-gradient(135deg,#3B82F6,#2563EB)] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(37,99,235,0.28)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70";
export const coachAdminGhostButtonClass = "inline-flex items-center justify-center rounded-[14px] border border-[color:var(--ca-button-border)] bg-[var(--ca-button-bg)] px-4 py-2.5 text-sm font-medium text-[color:var(--ca-button-text)] shadow-[var(--ca-button-shadow)] transition hover:border-[color:var(--ca-button-border-strong)] hover:bg-[var(--ca-button-bg-hover)] hover:text-[color:var(--ca-button-text-hover)] disabled:opacity-70";
export const coachAdminFilterButtonBaseClass = "rounded-full border px-4 py-2 text-sm font-medium transition";

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
        "relative overflow-hidden rounded-[24px] border border-[color:var(--ca-border)] bg-[var(--ca-panel-start)] p-6 shadow-[var(--ca-panel-shadow)]",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,var(--ca-panel-glow-1),transparent_34%),radial-gradient(circle_at_bottom_right,var(--ca-panel-glow-2),transparent_28%)] opacity-70" />
      {(eyebrow || title || description || action) ? (
        <div className="relative mb-6 flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-2xl">
            {eyebrow ? <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#2563EB] dark:text-cyan-300/80">{eyebrow}</p> : null}
            {title ? <h2 className={cx("mt-2 text-[1.65rem] font-semibold tracking-[-0.05em]", coachAdminTextPrimaryClass)}>{title}</h2> : null}
            {description ? <p className={cx("mt-2 text-sm leading-7", coachAdminTextMutedClass)}>{description}</p> : null}
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
    <div
      className={cx(
        "group relative overflow-hidden rounded-[22px] border bg-[var(--ca-surface-soft)] p-5 transition-transform duration-200 hover:-translate-y-0.5",
        toneMap[tone].ring
      )}
    >
      <div className={cx("pointer-events-none absolute inset-0 bg-gradient-to-br opacity-90", toneMap[tone].glow)} />
      <div className="relative flex items-start justify-between gap-3">
        <div>
          <p className={cx("text-[11px] font-semibold uppercase tracking-[0.24em]", coachAdminTextSoftClass)}>{label}</p>
          <div className={cx("mt-4 text-4xl font-semibold tracking-[-0.06em]", coachAdminTextPrimaryClass)}>{value}</div>
          <p className={cx("mt-3 max-w-[20rem] text-sm leading-6", coachAdminTextMutedClass)}>{note}</p>
        </div>
        {accent ? <div className={cx("mt-1", coachAdminTextMutedClass)}>{accent}</div> : null}
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
        <span className={coachAdminTextMutedClass}>{label}</span>
        <span className={coachAdminTextPrimaryClass}>{valueLabel || value.toLocaleString()}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-[var(--ca-track-bg)]">
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
    <div className="rounded-[24px] border border-dashed border-[color:var(--ca-border)] bg-[var(--ca-surface-soft)] px-5 py-6">
      <p className={cx("text-sm font-medium", coachAdminTextPrimaryClass)}>{title}</p>
      <p className={cx("mt-2 text-sm leading-6", coachAdminTextMutedClass)}>{body}</p>
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
    <div className="rounded-[22px] border border-[color:var(--ca-border)] bg-[var(--ca-surface-soft)] px-4 py-3">
      <p className={cx("text-[11px] font-semibold uppercase tracking-[0.2em]", coachAdminTextSoftClass)}>{label}</p>
      <div className={cx("mt-2 text-sm leading-6", coachAdminTextPrimaryClass)}>{value}</div>
    </div>
  );
}
