"use client";

import { useCallback, useEffect, useState } from "react";
import type { DocumentRecord, ReviewOutput } from "@/lib/mvp/types";

type ReviewResponse = {
  id: string;
  output: ReviewOutput;
};

const fieldClass =
  "w-full rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3 text-sm text-[var(--ink)] placeholder:text-[var(--muted)] outline-none transition-colors focus:border-[var(--brand)] focus:bg-white";

const labelClass =
  "block text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)] mb-2";

export function MvpReviewWorkspace({
  type,
  title,
  subtitle,
}: {
  type: "resume" | "linkedin";
  title: string;
  subtitle: string;
}) {
  const [documents, setDocuments] = useState<DocumentRecord[]>([]);
  const [review, setReview] = useState<ReviewResponse | null>(null);
  const [documentTitle, setDocumentTitle] = useState(
    type === "resume" ? "Updated_Resume.pdf" : "linkedin-export.docx"
  );
  const [targetRole, setTargetRole] = useState("Technical Program Manager");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    const [documentsRes, reviewRes] = await Promise.all([
      fetch("/api/documents", { cache: "no-store" }),
      fetch(`/api/reviews/${type}`, { cache: "no-store" }),
    ]);
    const documentsPayload = await documentsRes.json().catch(() => ({}));
    const reviewPayload = await reviewRes.json().catch(() => null);

    if (documentsRes.ok) {
      setDocuments(documentsPayload.documents || []);
    }
    if (reviewRes.ok && reviewPayload) {
      setReview(reviewPayload);
    }
  }, [type]);

  async function uploadAndReview() {
    setError(null);
    setLoading(true);

    let uploadRes: Response;
    if (selectedFile) {
      const formData = new FormData();
      formData.set("file", selectedFile);
      formData.set("type", type);
      uploadRes = await fetch("/api/uploads", { method: "POST", body: formData });
    } else {
      uploadRes = await fetch("/api/uploads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: documentTitle,
          type,
          mimeType:
            type === "resume"
              ? "application/pdf"
              : "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          sizeBytes: 120000,
        }),
      });
    }
    const uploadPayload = await uploadRes.json().catch(() => ({}));
    if (!uploadRes.ok) {
      setError(uploadPayload.error || "Upload failed.");
      setLoading(false);
      return;
    }

    const reviewRes = await fetch(`/api/reviews/${type}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ documentId: uploadPayload.id, targetRole }),
    });
    const reviewPayload = await reviewRes.json().catch(() => ({}));
    if (!reviewRes.ok) {
      setError(reviewPayload.error || "Review failed.");
      setLoading(false);
      return;
    }

    setReview(reviewPayload);
    setLoading(false);
    await load();
  }

  useEffect(() => {
    void Promise.resolve().then(load);
  }, [load]);

  const filteredDocs = documents.filter((d) => d.type === type);

  return (
    <div className="space-y-8">
      {/* ── Header ── */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-light)] px-3.5 py-1.5 text-xs font-semibold text-[var(--brand)]">
            {type === "resume" ? "Resume Workspace" : "LinkedIn Workspace"}
          </div>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-[var(--ink)] md:text-4xl">
            {title}
          </h1>
          <p className="mt-2 max-w-xl text-base leading-7 text-[var(--muted)]">{subtitle}</p>
        </div>
      </div>

      {/* ── Main grid ── */}
      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        {/* Left: Upload panel */}
        <div className="space-y-5">
          <div className="rounded-2xl border border-[var(--border)] bg-white p-6 shadow-[var(--shadow)]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
              Document workflow
            </p>

            <div className="mt-5 space-y-4">
              <div>
                <label className={labelClass}>Document title</label>
                <input
                  className={fieldClass}
                  value={documentTitle}
                  onChange={(e) => setDocumentTitle(e.target.value)}
                  placeholder="e.g. Resume_2026.pdf"
                />
              </div>

              <div>
                <label className={labelClass}>Target role</label>
                <input
                  className={fieldClass}
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  placeholder="e.g. Technical Program Manager"
                />
              </div>

              <div>
                <label className={labelClass}>Upload file (optional)</label>
                <input
                  type="file"
                  accept={type === "resume" ? ".pdf,.doc,.docx" : ".doc,.docx,.pdf,.txt"}
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3 text-sm text-[var(--ink)] outline-none file:mr-3 file:rounded-lg file:border-0 file:bg-[var(--brand)] file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white hover:file:bg-[var(--brand-hover)]"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    setSelectedFile(file);
                    if (file) setDocumentTitle(file.name);
                  }}
                />
              </div>

              {error && (
                <div className="rounded-xl border border-[var(--danger-soft)] bg-[var(--danger-soft)] px-4 py-3 text-sm text-[var(--danger)]">
                  {error}
                </div>
              )}

              <button
                onClick={uploadAndReview}
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--brand)] py-3 text-sm font-semibold text-white shadow-[var(--shadow-brand)] transition-colors hover:bg-[var(--brand-hover)] disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Running review…
                  </>
                ) : (
                  "Upload and run review →"
                )}
              </button>
            </div>
          </div>

          {/* Uploaded docs */}
          {filteredDocs.length > 0 && (
            <div className="rounded-2xl border border-[var(--border)] bg-white p-6 shadow-[var(--shadow)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                Uploaded documents
              </p>
              <div className="mt-4 space-y-2.5">
                {filteredDocs.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3"
                  >
                    <p className="truncate text-sm font-medium text-[var(--ink)]">{doc.title}</p>
                    <span className="flex-shrink-0 rounded-full bg-white px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[var(--muted)]">
                      {doc.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Review output */}
        <div className="space-y-5">
          {!review ? (
            <div className="flex h-full min-h-64 items-center justify-center rounded-2xl border border-dashed border-[var(--border)] bg-white p-10 text-center">
              <div>
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--surface-muted)]">
                  <svg
                    className="h-6 w-6 text-[var(--muted)]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                    <polyline points="14,2 14,8 20,8" />
                  </svg>
                </div>
                <p className="font-semibold text-[var(--ink)]">No review yet</p>
                <p className="mt-1.5 text-sm text-[var(--muted)]">
                  Upload a document and click "Run review" to see results.
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Scores */}
              <div className="rounded-2xl border border-[var(--border)] bg-white p-6 shadow-[var(--shadow)]">
                <div className="flex flex-wrap items-end justify-between gap-5">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                      Overall score
                    </p>
                    <p className="mt-2 text-6xl font-extrabold tracking-tight text-[var(--ink)]">
                      {review.output.overallScore}
                    </p>
                  </div>
                  <div className="grid gap-2 text-sm">
                    {review.output.dimensionScores.map((score) => (
                      <div
                        key={score.label}
                        className="flex items-center justify-between gap-8 rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-2.5"
                      >
                        <span className="text-[var(--muted)]">{score.label}</span>
                        <span className="font-bold text-[var(--ink)]">{score.score}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Findings */}
              <div className="rounded-2xl border border-[var(--border)] bg-white p-6 shadow-[var(--shadow)]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                  Findings
                </p>
                <div className="mt-5 grid gap-6 md:grid-cols-3">
                  {[
                    { label: "Strengths", items: review.output.strengths, color: "text-[var(--success)]", bg: "bg-[var(--success-soft)]" },
                    { label: "Issues", items: review.output.issues, color: "text-[var(--danger)]", bg: "bg-[var(--danger-soft)]" },
                    { label: "Suggestions", items: review.output.tailoringSuggestions, color: "text-[var(--brand)]", bg: "bg-[var(--brand-light)]" },
                  ].map((group) => (
                    <div key={group.label}>
                      <p className={`mb-3 inline-flex rounded-full ${group.bg} ${group.color} px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide`}>
                        {group.label}
                      </p>
                      <ul className="space-y-2">
                        {group.items.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm leading-6 text-[var(--ink-2)]">
                            <span className={`mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full ${group.color}`} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rewritten bullets */}
              {review.output.rewrittenBullets.length > 0 && (
                <div className="rounded-2xl border border-[var(--border)] bg-white p-6 shadow-[var(--shadow)]">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                    Rewritten bullets
                  </p>
                  <div className="mt-4 space-y-2.5">
                    {review.output.rewrittenBullets.map((bullet) => (
                      <div
                        key={bullet}
                        className="flex items-start gap-3 rounded-xl bg-[var(--brand-light)] px-4 py-3"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--brand)]" />
                        <p className="text-sm leading-6 text-[var(--ink-2)]">{bullet}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
