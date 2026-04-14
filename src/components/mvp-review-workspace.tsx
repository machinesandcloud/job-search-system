"use client";

import { useCallback, useEffect, useState } from "react";
import { Card, Eyebrow } from "@/components/mvp";
import type { DocumentRecord, ReviewOutput } from "@/lib/mvp/types";

type ReviewResponse = {
  id: string;
  output: ReviewOutput;
};

const inputClass =
  "rounded-2xl border border-[var(--border)] bg-[var(--bg-soft)] px-4 py-3 text-[var(--ink)] outline-none placeholder:text-[var(--muted)]";

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
  const [documentTitle, setDocumentTitle] = useState(type === "resume" ? "Updated_Resume.pdf" : "linkedin-export.docx");
  const [targetRole, setTargetRole] = useState("Technical Program Manager");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

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
          mimeType: type === "resume" ? "application/pdf" : "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          sizeBytes: 120000,
        }),
      });
    }
    const uploadPayload = await uploadRes.json().catch(() => ({}));
    if (!uploadRes.ok) {
      setError(uploadPayload.error || "Upload failed.");
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
      return;
    }

    setReview(reviewPayload);
    await load();
  }

  useEffect(() => {
    void Promise.resolve().then(load);
  }, [load]);

  return (
    <div className="grid gap-6">
      <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
        <div>
          <Eyebrow>{type === "resume" ? "Resume Workspace" : "LinkedIn Workspace"}</Eyebrow>
          <h1 className="mt-5 text-4xl font-semibold tracking-[-0.04em] text-[var(--ink)]">{title}</h1>
          <p className="mt-3 text-base leading-7 text-[var(--muted)]">{subtitle}</p>
        </div>
        <Card className="bg-[var(--ink)] text-[var(--bg-soft)]">
          <p className="text-sm uppercase tracking-[0.22em] text-[rgba(246,241,232,0.58)]">What a good review should do</p>
          <div className="mt-5 grid gap-3 text-sm">
            {[
              "Show what is already strong",
              "Name the missing proof directly",
              "Rewrite the weakest positioning",
              "End with the next move, not just a score",
            ].map((item) => (
              <div key={item} className="rounded-2xl bg-[rgba(255,255,255,0.08)] px-4 py-3">{item}</div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.82fr_1.18fr]">
        <Card>
          <p className="text-sm uppercase tracking-[0.22em] text-[var(--muted)]">Document workflow</p>
          <div className="mt-5 grid gap-3">
            <input className={inputClass} value={documentTitle} onChange={(event) => setDocumentTitle(event.target.value)} />
            <input className={inputClass} value={targetRole} onChange={(event) => setTargetRole(event.target.value)} />
            <input
              type="file"
              accept={type === "resume" ? ".pdf,.doc,.docx" : ".doc,.docx,.pdf,.txt"}
              className="rounded-2xl border border-[var(--border)] bg-[var(--bg-soft)] px-4 py-3 text-sm text-[var(--ink)] outline-none file:mr-4 file:rounded-full file:border-0 file:bg-[var(--ink)] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-[var(--bg-soft)]"
              onChange={(event) => {
                const file = event.target.files?.[0] || null;
                setSelectedFile(file);
                if (file) setDocumentTitle(file.name);
              }}
            />
            <button onClick={uploadAndReview} className="rounded-full bg-[var(--ink)] px-5 py-3 text-sm font-semibold text-[var(--bg-soft)] transition hover:bg-[var(--teal)]">
              Upload and run review
            </button>
            {error ? <p className="text-sm text-[var(--danger)]">{error}</p> : null}
          </div>
          <div className="mt-6 grid gap-3">
            {documents.filter((document) => document.type === type).map((document) => (
              <div key={document.id} className="rounded-2xl border border-[var(--border)] bg-[var(--bg-soft)] px-4 py-3 text-sm text-[var(--muted)]">
                {document.title} • {document.status}
              </div>
            ))}
          </div>
        </Card>

        <div className="grid gap-6">
          {review ? (
            <>
              <Card>
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.22em] text-[var(--muted)]">Review output</p>
                    <h2 className="mt-3 text-6xl font-semibold tracking-[-0.05em] text-[var(--ink)]">{review.output.overallScore}</h2>
                    <p className="mt-2 text-sm text-[var(--muted)]">Overall score</p>
                  </div>
                  <div className="grid gap-2 text-sm text-[var(--muted)]">
                    {review.output.dimensionScores.map((score) => (
                      <div key={score.label} className="flex items-center justify-between gap-8 rounded-2xl border border-[var(--border)] bg-[var(--bg-soft)] px-4 py-3">
                        <span>{score.label}</span>
                        <span className="font-semibold text-[var(--ink)]">{score.score}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
              <Card>
                <p className="text-sm uppercase tracking-[0.22em] text-[var(--muted)]">Findings</p>
                <div className="mt-5 grid gap-4 md:grid-cols-3">
                  <div>
                    <p className="font-medium text-[var(--ink)]">Strengths</p>
                    <ul className="mt-3 grid gap-2 text-sm leading-6 text-[var(--muted)]">{review.output.strengths.map((item) => <li key={item}>{item}</li>)}</ul>
                  </div>
                  <div>
                    <p className="font-medium text-[var(--ink)]">Issues</p>
                    <ul className="mt-3 grid gap-2 text-sm leading-6 text-[var(--muted)]">{review.output.issues.map((item) => <li key={item}>{item}</li>)}</ul>
                  </div>
                  <div>
                    <p className="font-medium text-[var(--ink)]">Suggestions</p>
                    <ul className="mt-3 grid gap-2 text-sm leading-6 text-[var(--muted)]">{review.output.tailoringSuggestions.map((item) => <li key={item}>{item}</li>)}</ul>
                  </div>
                </div>
              </Card>
            </>
          ) : (
            <Card><p className="text-sm text-[var(--muted)]">Run a {type} review to populate this workspace.</p></Card>
          )}
        </div>
      </div>
    </div>
  );
}
