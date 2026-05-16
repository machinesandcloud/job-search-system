import Link from "next/link";
import { requireCoachAdminActor } from "@/lib/coach-admin-auth";
import { getSequencePreviewSteps } from "@/lib/email-sequences";
import type { ZariSequence } from "@/lib/email-sequences";
import { SEQUENCE_DELAYS_META } from "../../sequence-meta";
import { CoachAdminPill } from "@/components/coach-admin-ui";

export const dynamic = "force-dynamic";

function sequenceTone(seq: string) {
  if (seq.startsWith("trial")) return "cyan" as const;
  if (seq.startsWith("paid") || seq.startsWith("milestone")) return "emerald" as const;
  if (seq.startsWith("win_back") || seq.startsWith("at_risk") || seq.startsWith("dunning")) return "rose" as const;
  if (seq.startsWith("upsell") || seq.startsWith("annual")) return "gold" as const;
  return "slate" as const;
}

function delayLabel(delayDays: number, stepIndex: number): string {
  if (stepIndex === 0) {
    return delayDays === 0 ? "Sent immediately on enrollment" : `Sent ${delayDays}d after enrollment`;
  }
  return delayDays === 0 ? "Sent immediately after previous" : `${delayDays}d after previous email`;
}

export default async function SequenceEmailsPage({ params }: { params: Promise<{ sequence: string }> }) {
  await requireCoachAdminActor("support");
  const { sequence } = await params;

  const steps = await getSequencePreviewSteps(sequence as ZariSequence);
  const meta = SEQUENCE_DELAYS_META[sequence as ZariSequence];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Link href="/coach-admin/automation" style={{ fontSize: 12, color: "var(--ca-text3)", textDecoration: "none" }}>← Automation</Link>
        <span style={{ fontSize: 12, color: "var(--ca-bd)" }}>/</span>
        <Link href="/coach-admin/automation/emails" style={{ fontSize: 12, color: "var(--ca-text3)", textDecoration: "none" }}>Email Log</Link>
        <span style={{ fontSize: 12, color: "var(--ca-bd)" }}>/</span>
        <span style={{ fontSize: 12, fontWeight: 600, color: "var(--ca-text)" }}>{sequence}</span>
      </div>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <CoachAdminPill tone={sequenceTone(sequence)}>{sequence}</CoachAdminPill>
        {meta && (
          <span style={{ fontSize: 12, color: "var(--ca-text3)" }}>
            {meta.steps} email{meta.steps !== 1 ? "s" : ""}
            {meta.duration > 0 ? ` · ${meta.duration}-day campaign` : " · single send"}
          </span>
        )}
        {!steps.length && (
          <span style={{ fontSize: 12, color: "#F43F5E" }}>Unknown sequence — no templates found</span>
        )}
      </div>

      {/* Email steps */}
      {steps.map((step) => (
        <div
          key={step.stepIndex}
          style={{ borderRadius: 16, border: "1px solid var(--ca-bd)", background: "var(--ca-card)", overflow: "hidden" }}
        >
          {/* Step header */}
          <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--ca-bd)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{
                fontSize: 11, fontWeight: 700, color: "var(--ca-text3)",
                background: "var(--ca-raise)", border: "1px solid var(--ca-bd)",
                borderRadius: 99, padding: "1px 8px",
              }}>
                Step {step.stepIndex + 1}
              </span>
              <span style={{ fontSize: 12, color: "var(--ca-text3)" }}>
                {delayLabel(step.delayDays, step.stepIndex)}
              </span>
            </div>
            <a
              href={`/api/coach-admin/automation/email-preview?sequence=${encodeURIComponent(sequence)}&step=${step.stepIndex}`}
              target="_blank"
              rel="noreferrer"
              style={{ fontSize: 11.5, color: "var(--ca-text3)", textDecoration: "none" }}
            >
              Open in tab ↗
            </a>
          </div>

          {/* Subject line */}
          <div style={{ padding: "9px 16px", borderBottom: "1px solid var(--ca-bd)", background: "var(--ca-raise)", display: "flex", alignItems: "baseline", gap: 8 }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: "var(--ca-text3)", textTransform: "uppercase", letterSpacing: "0.08em", flexShrink: 0 }}>Subject</span>
            <span style={{ fontSize: 13, color: "var(--ca-text)", fontWeight: 500 }}>{step.subject}</span>
          </div>

          {/* Rendered email */}
          <iframe
            srcDoc={step.html}
            style={{ display: "block", width: "100%", height: 700, border: "none", background: "#f9fafb" }}
            title={`Step ${step.stepIndex + 1}: ${step.subject}`}
          />
        </div>
      ))}

      {!steps.length && (
        <div style={{ padding: "32px 16px", textAlign: "center", fontSize: 13, color: "var(--ca-text3)", borderRadius: 16, border: "1px solid var(--ca-bd)", background: "var(--ca-card)" }}>
          No email templates found for &ldquo;{sequence}&rdquo;.
        </div>
      )}

    </div>
  );
}
