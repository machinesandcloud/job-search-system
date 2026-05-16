"use client";

import { useState, useEffect } from "react";

// If NEXT_PUBLIC_LOOM_APP_ID is set, the Loom SDK button auto-fills the URL.
// Without it, the page falls back to a guided manual flow.
const LOOM_APP_ID = process.env.NEXT_PUBLIC_LOOM_APP_ID ?? "";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    LoomSDK?: any;
  }
}

export default function VideoReviewPage() {
  const [videoUrl, setVideoUrl] = useState("");
  const [comment, setComment] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [loomReady, setLoomReady] = useState(false);
  const [recording, setRecording] = useState(false);
  const [step, setStep] = useState<"record" | "submit">("record");

  // Load Loom SDK if App ID is configured
  useEffect(() => {
    if (!LOOM_APP_ID) return;
    const script = document.createElement("script");
    script.src = "https://cdn.loom.com/loom-embed-1.0.0.js";
    script.onload = () => setLoomReady(true);
    document.head.appendChild(script);
  }, []);

  function startLoomRecording() {
    if (!window.LoomSDK) return;
    setRecording(true);
    const button = window.LoomSDK.record({ publicAppId: LOOM_APP_ID });
    button.on("insert-click", (video: { sharedUrl: string }) => {
      setVideoUrl(video.sharedUrl);
      setRecording(false);
      setStep("submit");
    });
    button.on("cancel", () => setRecording(false));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    setErrorMsg("");
    const res = await fetch("/api/video-review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ videoUrl, comment }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setErrorMsg(data.error || "Something went wrong. Please try again.");
      setState("error");
      return;
    }
    setState("done");
  }

  if (state === "done") {
    return (
      <main style={s.page}>
        <div style={s.card}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>🎉</div>
          <h1 style={s.headline}>You&apos;re all set — thank you!</h1>
          <p style={s.body}>
            We received your video. Once we review it, one free month will be added to your account automatically — usually within 1–2 business days.
          </p>
          <p style={s.muted}>Questions? Reply to any email from coach@zaricoach.com.</p>
        </div>
      </main>
    );
  }

  // ── Loom SDK flow ──────────────────────────────────────────────────────────
  if (LOOM_APP_ID) {
    return (
      <main style={s.page}>
        <div style={s.card}>
          <h1 style={s.headline}>Get one month free — share your experience</h1>
          <p style={s.body}>
            Record a 60–90 second video about what you&apos;ve been using Zari for and whether it&apos;s been worth it. No script, no editing. Just hit record and talk.
          </p>

          {step === "record" && (
            <>
              <button
                onClick={startLoomRecording}
                disabled={!loomReady || recording}
                style={s.loomButton}
              >
                <svg width="20" height="20" viewBox="0 0 56 56" fill="none" style={{ flexShrink: 0 }}>
                  <circle cx="28" cy="28" r="28" fill="#625DF5" />
                  <circle cx="28" cy="28" r="11" fill="white" />
                  <circle cx="28" cy="28" r="5" fill="#625DF5" />
                </svg>
                {recording ? "Recording…" : loomReady ? "Record with Loom" : "Loading…"}
              </button>
              <p style={{ ...s.muted, marginTop: 12, textAlign: "center" }}>
                Opens in your browser — no download needed
              </p>
              <div style={s.divider}>
                <span style={s.dividerText}>or paste a link you already have</span>
              </div>
              <input
                type="url"
                placeholder="https://www.loom.com/share/..."
                value={videoUrl}
                onChange={e => { setVideoUrl(e.target.value); if (e.target.value) setStep("submit"); }}
                style={s.input}
              />
            </>
          )}

          {step === "submit" && (
            <form onSubmit={handleSubmit}>
              <div style={{ ...s.successBox, marginBottom: 20 }}>
                <span style={{ fontSize: 18, marginRight: 8 }}>✓</span>
                <div>
                  <p style={{ margin: 0, fontWeight: 600, fontSize: 14, color: "#166534" }}>Video ready</p>
                  <a href={videoUrl} target="_blank" rel="noopener noreferrer"
                    style={{ fontSize: 12, color: "#166534", wordBreak: "break-all" }}>{videoUrl}</a>
                </div>
              </div>
              <button type="button" onClick={() => { setVideoUrl(""); setStep("record"); }}
                style={{ ...s.muted, background: "none", border: "none", cursor: "pointer", padding: 0, marginBottom: 16, display: "block" }}>
                ← Use a different video
              </button>
              <label style={s.label}>Anything you want to add? <span style={s.muted}>(optional)</span></label>
              <textarea
                placeholder="e.g. what stage of the job search you're in, what's been most useful..."
                value={comment}
                onChange={e => setComment(e.target.value)}
                rows={3}
                style={{ ...s.input, resize: "vertical", minHeight: 80 }}
              />
              {state === "error" && <p style={{ color: "#EF4444", fontSize: 14, marginTop: 8 }}>{errorMsg}</p>}
              <button type="submit" disabled={state === "loading"} style={s.button}>
                {state === "loading" ? "Submitting…" : "Submit and claim free month →"}
              </button>
            </form>
          )}

          <p style={{ ...s.muted, marginTop: 24 }}>
            Free month added within 1–2 business days after review. No minimum length — just be genuine.
          </p>
        </div>
      </main>
    );
  }

  // ── Manual guided flow (no Loom App ID) ───────────────────────────────────
  return (
    <main style={s.page}>
      <div style={s.card}>
        <h1 style={s.headline}>Get one month free — share your experience</h1>
        <p style={s.body}>
          Record a 60–90 second video about what you&apos;ve been using Zari for. No script, no editing. Just talk naturally — like you&apos;re telling a friend.
        </p>

        <div style={s.stepsGrid}>
          <div style={s.stepBox}>
            <span style={s.stepNum}>1</span>
            <div>
              <p style={s.stepTitle}>Open Loom and record</p>
              <p style={s.stepDesc}>Loom is free. Click below to open it — record yourself for 60–90 seconds.</p>
              <a href="https://www.loom.com/record" target="_blank" rel="noopener noreferrer" style={s.loomLink}>
                <svg width="16" height="16" viewBox="0 0 56 56" fill="none" style={{ flexShrink: 0 }}>
                  <circle cx="28" cy="28" r="28" fill="#625DF5" />
                  <circle cx="28" cy="28" r="11" fill="white" />
                  <circle cx="28" cy="28" r="5" fill="#625DF5" />
                </svg>
                Open Loom recorder →
              </a>
            </div>
          </div>
          <div style={s.stepBox}>
            <span style={s.stepNum}>2</span>
            <div>
              <p style={s.stepTitle}>Copy your share link</p>
              <p style={s.stepDesc}>When done, Loom shows a &quot;Share&quot; button. Click it and copy the link.</p>
            </div>
          </div>
          <div style={s.stepBox}>
            <span style={s.stepNum}>3</span>
            <div>
              <p style={s.stepTitle}>Paste it below and submit</p>
              <p style={s.stepDesc}>That&apos;s it. We review it and add one free month to your account.</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ marginTop: 24 }}>
          <label style={s.label}>Your video link <span style={{ color: "#EF4444" }}>*</span></label>
          <input
            type="url"
            placeholder="https://www.loom.com/share/..."
            value={videoUrl}
            onChange={e => setVideoUrl(e.target.value)}
            required
            style={s.input}
          />
          <label style={{ ...s.label, marginTop: 16 }}>Anything to add? <span style={s.muted}>(optional)</span></label>
          <textarea
            placeholder="e.g. what stage of the job search you're in, what's been most useful..."
            value={comment}
            onChange={e => setComment(e.target.value)}
            rows={3}
            style={{ ...s.input, resize: "vertical", minHeight: 80 }}
          />
          {state === "error" && <p style={{ color: "#EF4444", fontSize: 14, marginTop: 8 }}>{errorMsg}</p>}
          <button type="submit" disabled={state === "loading"} style={s.button}>
            {state === "loading" ? "Submitting…" : "Submit and claim free month →"}
          </button>
        </form>

        <p style={{ ...s.muted, marginTop: 24 }}>
          Free month added within 1–2 business days. No Loom account required — any video link works.
        </p>
      </div>
    </main>
  );
}

const s = {
  page: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px", background: "#F8FAFC" } as React.CSSProperties,
  card: { background: "#fff", borderRadius: 16, padding: "40px 36px", maxWidth: 540, width: "100%", boxShadow: "0 1px 3px rgba(0,0,0,0.08), 0 4px 24px rgba(0,0,0,0.04)" } as React.CSSProperties,
  headline: { fontSize: 22, fontWeight: 700, color: "#0F172A", margin: "0 0 12px", lineHeight: 1.3 } as React.CSSProperties,
  body: { fontSize: 15, color: "#334155", lineHeight: 1.6, margin: "0 0 20px" } as React.CSSProperties,
  label: { display: "block", fontSize: 13, fontWeight: 600, color: "#0F172A", marginBottom: 6 } as React.CSSProperties,
  input: { width: "100%", padding: "10px 12px", fontSize: 14, border: "1px solid #E2E8F0", borderRadius: 8, outline: "none", boxSizing: "border-box" as const, color: "#0F172A", background: "#fff" } as React.CSSProperties,
  button: { marginTop: 20, width: "100%", padding: "12px 20px", background: "#111827", color: "#fff", fontSize: 15, fontWeight: 600, border: "none", borderRadius: 10, cursor: "pointer" } as React.CSSProperties,
  muted: { fontSize: 13, color: "#94A3B8", lineHeight: 1.5 } as React.CSSProperties,
  loomButton: { display: "flex", alignItems: "center", justifyContent: "center", gap: 10, width: "100%", padding: "14px 20px", background: "#625DF5", color: "#fff", fontSize: 15, fontWeight: 600, border: "none", borderRadius: 10, cursor: "pointer" } as React.CSSProperties,
  loomLink: { display: "inline-flex", alignItems: "center", gap: 6, marginTop: 8, padding: "7px 14px", background: "#625DF5", color: "#fff", fontSize: 13, fontWeight: 600, borderRadius: 8, textDecoration: "none" } as React.CSSProperties,
  divider: { display: "flex", alignItems: "center", gap: 12, margin: "20px 0" } as React.CSSProperties,
  dividerText: { fontSize: 12, color: "#94A3B8", whiteSpace: "nowrap" as const } as React.CSSProperties,
  stepsGrid: { display: "flex", flexDirection: "column" as const, gap: 16, marginBottom: 8 } as React.CSSProperties,
  stepBox: { display: "flex", gap: 14, alignItems: "flex-start" } as React.CSSProperties,
  stepNum: { width: 26, height: 26, borderRadius: "50%", background: "#F1F5F9", color: "#475569", fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 } as React.CSSProperties,
  stepTitle: { margin: "0 0 2px", fontWeight: 600, fontSize: 14, color: "#0F172A" } as React.CSSProperties,
  stepDesc: { margin: 0, fontSize: 13, color: "#64748B", lineHeight: 1.5 } as React.CSSProperties,
  successBox: { display: "flex", alignItems: "flex-start", gap: 10, padding: "12px 14px", background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 8 } as React.CSSProperties,
};
