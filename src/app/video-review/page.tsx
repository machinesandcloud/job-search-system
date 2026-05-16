"use client";

import { useState } from "react";

export default function VideoReviewPage() {
  const [videoUrl, setVideoUrl] = useState("");
  const [comment, setComment] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

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
      <main style={styles.page}>
        <div style={styles.card}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>🎉</div>
          <h1 style={styles.headline}>You're all set — thank you!</h1>
          <p style={styles.body}>
            We received your video. Once we review it, one free month will be added to your account automatically. Usually within 1–2 business days.
          </p>
          <p style={styles.muted}>Questions? Reply to any email from coach@zaricoach.com.</p>
        </div>
      </main>
    );
  }

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.headline}>Submit your video — get one month free</h1>
        <p style={styles.body}>
          Record a 60–90 second video about your experience with Zari — what you've used it for and whether it's been worth it. Use Loom, your phone, or any tool you like. No editing needed.
        </p>
        <ol style={styles.steps}>
          <li>Record your video (Loom works great — it&apos;s free at loom.com)</li>
          <li>Copy the shareable link</li>
          <li>Paste it below and submit</li>
        </ol>

        <form onSubmit={handleSubmit} style={{ marginTop: 28 }}>
          <label style={styles.label}>Video link <span style={{ color: "#EF4444" }}>*</span></label>
          <input
            type="url"
            placeholder="https://www.loom.com/share/..."
            value={videoUrl}
            onChange={e => setVideoUrl(e.target.value)}
            required
            style={styles.input}
          />

          <label style={{ ...styles.label, marginTop: 16 }}>Anything you want to add? <span style={styles.muted}>(optional)</span></label>
          <textarea
            placeholder="e.g. how far along in your job search you are, what's been most useful..."
            value={comment}
            onChange={e => setComment(e.target.value)}
            rows={3}
            style={{ ...styles.input, resize: "vertical", minHeight: 80 }}
          />

          {state === "error" && (
            <p style={{ color: "#EF4444", fontSize: 14, marginTop: 8 }}>{errorMsg}</p>
          )}

          <button type="submit" disabled={state === "loading"} style={styles.button}>
            {state === "loading" ? "Submitting…" : "Submit my video →"}
          </button>
        </form>

        <p style={{ ...styles.muted, marginTop: 24 }}>
          Free month is added within 1–2 business days after we review the video. No minimum length — just be genuine.
        </p>
      </div>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 20px",
    background: "#F8FAFC",
  } as React.CSSProperties,
  card: {
    background: "#fff",
    borderRadius: 16,
    padding: "40px 36px",
    maxWidth: 520,
    width: "100%",
    boxShadow: "0 1px 3px rgba(0,0,0,0.08), 0 4px 24px rgba(0,0,0,0.04)",
  } as React.CSSProperties,
  headline: {
    fontSize: 22,
    fontWeight: 700,
    color: "#0F172A",
    margin: "0 0 12px",
    lineHeight: 1.3,
  } as React.CSSProperties,
  body: {
    fontSize: 15,
    color: "#334155",
    lineHeight: 1.6,
    margin: "0 0 16px",
  } as React.CSSProperties,
  steps: {
    fontSize: 14,
    color: "#475569",
    lineHeight: 1.8,
    paddingLeft: 20,
    margin: "0 0 8px",
  } as React.CSSProperties,
  label: {
    display: "block",
    fontSize: 13,
    fontWeight: 600,
    color: "#0F172A",
    marginBottom: 6,
  } as React.CSSProperties,
  input: {
    width: "100%",
    padding: "10px 12px",
    fontSize: 14,
    border: "1px solid #E2E8F0",
    borderRadius: 8,
    outline: "none",
    boxSizing: "border-box" as const,
    color: "#0F172A",
    background: "#fff",
  } as React.CSSProperties,
  button: {
    marginTop: 20,
    width: "100%",
    padding: "12px 20px",
    background: "#111827",
    color: "#fff",
    fontSize: 15,
    fontWeight: 600,
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
  } as React.CSSProperties,
  muted: {
    fontSize: 13,
    color: "#94A3B8",
    lineHeight: 1.5,
  } as React.CSSProperties,
};
