"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const REASONS = [
  { value: "too_expensive", label: "It's too expensive" },
  { value: "not_useful", label: "I'm not using it enough" },
  { value: "missing_feature", label: "Missing a feature I need" },
  { value: "got_job", label: "I got a job — mission accomplished!" },
  { value: "other", label: "Something else" },
];

type Step = "survey" | "offer" | "done";

export function CancelSubscriptionForm({ planName, renewalDate }: { planName: string; renewalDate: string | null }) {
  const router = useRouter();
  const [step, setStep] = useState<Step>("survey");
  const [reason, setReason] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submitCancel(acceptOffer: boolean) {
    setLoading(true);
    setError(null);
    const res = await fetch("/api/billing/cancel", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        reason: reason || "other",
        comment: comment || undefined,
        acceptOffer,
      }),
    });
    const data = await res.json().catch(() => ({}));
    setLoading(false);
    if (!res.ok) {
      setError(data.error ?? "Failed. Please try again or contact support.");
      return;
    }
    if (data.outcome === "offer_accepted") {
      router.push("/settings?offer_accepted=1");
    } else {
      router.push("/settings?cancelled=1");
    }
  }

  function handleSurveyNext() {
    // Show exit-intent offer before final cancel (unless they got the job)
    if (reason === "got_job") {
      void submitCancel(false);
    } else {
      setStep("offer");
    }
  }

  if (step === "offer") {
    return (
      <div>
        <div style={{ background: "linear-gradient(135deg, #EFF6FF 0%, #F5F3FF 100%)", border: "1.5px solid #C7D2FE", borderRadius: 16, padding: "28px 24px", marginBottom: 20, textAlign: "center" as const }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>🎁</div>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: "#1E293B", margin: "0 0 10px", letterSpacing: "-0.02em" }}>
            Before you go — how about 50% off?
          </h2>
          <p style={{ fontSize: 13.5, color: "#475569", margin: "0 0 6px", lineHeight: 1.6 }}>
            We'd hate to lose you. Stay on your current plan at <strong>half price for the next month</strong> — no commitment beyond that.
          </p>
          <p style={{ fontSize: 12, color: "#94A3B8", margin: 0 }}>
            Discount applies automatically. Cancel anytime after.
          </p>
        </div>

        {error && (
          <p style={{ fontSize: 13, color: "#DC2626", background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 8, padding: "10px 14px", marginBottom: 16 }}>{error}</p>
        )}

        <div style={{ display: "flex", gap: 12, flexDirection: "column" as const }}>
          <button
            onClick={() => void submitCancel(true)}
            disabled={loading}
            style={{ width: "100%", padding: "13px 22px", borderRadius: 10, border: "none", background: loading ? "#94A3B8" : "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)", color: "#fff", fontSize: 14, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer" }}
          >
            {loading ? "Applying…" : "Yes, give me 50% off →"}
          </button>
          <button
            onClick={() => void submitCancel(false)}
            disabled={loading}
            style={{ width: "100%", padding: "11px 22px", borderRadius: 10, border: "1px solid #E2E8F0", background: "#fff", color: "#64748B", fontSize: 13.5, fontWeight: 600, cursor: loading ? "not-allowed" : "pointer" }}
          >
            No thanks, cancel my subscription
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #E2E8F0", padding: "20px 22px", marginBottom: 16 }}>
        <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 10 }}>
          Why are you cancelling?
        </label>
        <div style={{ display: "flex", flexDirection: "column" as const, gap: 8 }}>
          {REASONS.map(r => (
            <label key={r.value} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", padding: "9px 12px", borderRadius: 8, border: `1.5px solid ${reason === r.value ? "#4F46E5" : "#E2E8F0"}`, background: reason === r.value ? "#EEF2FF" : "#fff", transition: "all 0.1s" }}>
              <input
                type="radio"
                name="cancel_reason"
                value={r.value}
                checked={reason === r.value}
                onChange={() => setReason(r.value)}
                style={{ accentColor: "#4F46E5", cursor: "pointer" }}
              />
              <span style={{ fontSize: 13.5, color: reason === r.value ? "#3730A3" : "#374151", fontWeight: reason === r.value ? 600 : 400 }}>
                {r.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #E2E8F0", padding: "20px 22px", marginBottom: 20 }}>
        <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 8 }}>
          Anything specific? <span style={{ fontWeight: 400, color: "#94A3B8" }}>(optional)</span>
        </label>
        <textarea
          value={comment}
          onChange={e => setComment(e.target.value)}
          placeholder="Help us improve — what could have made Zari better for you?"
          style={{ width: "100%", padding: "11px 14px", fontSize: 13.5, borderRadius: 10, border: "1.5px solid #E2E8F0", background: "#fff", color: "#1E293B", outline: "none", resize: "vertical" as const, minHeight: 72, fontFamily: "inherit", boxSizing: "border-box" as const }}
          onFocus={e => (e.target.style.border = "1.5px solid #4F46E5")}
          onBlur={e => (e.target.style.border = "1.5px solid #E2E8F0")}
        />
      </div>

      {error && (
        <p style={{ fontSize: 13, color: "#DC2626", background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 8, padding: "10px 14px", marginBottom: 16 }}>{error}</p>
      )}

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" as const }}>
        <button
          onClick={handleSurveyNext}
          disabled={loading || !reason}
          style={{ padding: "11px 22px", borderRadius: 10, border: "none", background: (loading || !reason) ? "#94A3B8" : "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)", color: "#fff", fontSize: 13.5, fontWeight: 700, cursor: (loading || !reason) ? "not-allowed" : "pointer" }}
        >
          {loading ? "Processing…" : reason === "got_job" ? "Cancel subscription 🎉" : "Continue"}
        </button>
        <a
          href="/settings/subscription"
          style={{ padding: "11px 22px", borderRadius: 10, border: "1px solid #E2E8F0", background: "#fff", color: "#64748B", fontSize: 13.5, fontWeight: 600, textDecoration: "none", display: "inline-flex", alignItems: "center" }}
        >
          Keep my {planName} plan
        </a>
      </div>
      {!reason && (
        <p style={{ fontSize: 12, color: "#94A3B8", marginTop: 10 }}>Select a reason to continue.</p>
      )}
      <p style={{ fontSize: 12, color: "#94A3B8", marginTop: 8 }}>
        Your access continues until {renewalDate ?? "the end of your billing period"}.
      </p>
    </div>
  );
}
