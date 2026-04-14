"use client";

import { useCallback, useEffect, useState } from "react";
import { Card, Eyebrow } from "@/components/mvp";
import type { DocumentRecord, ReviewOutput } from "@/lib/mvp/types";

type ReviewResponse = {
  id: string;
  output: ReviewOutput;
};

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
      uploadRes = await fetch("/api/uploads", {
        method: "POST",
        body: formData,
      });
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
      <div>
        <Eyebrow>{type === "resume" ? "Resume Workspace" : "LinkedIn Workspace"}</Eyebrow>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-3 text-base leading-7 text-white/70">{subtitle}</p>
      </div>
      <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <Card>
          <p className="text-sm uppercase tracking-[0.22em] text-white/45">Document workflow</p>
          <div className="mt-5 grid gap-3">
            <input className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none" value={documentTitle} onChange={(event) => setDocumentTitle(event.target.value)} />
            <input className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none" value={targetRole} onChange={(event) => setTargetRole(event.target.value)} />
            <input
              type="file"
              accept={type === "resume" ? ".pdf,.doc,.docx" : ".doc,.docx,.pdf,.txt"}
              className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none file:mr-4 file:rounded-full file:border-0 file:bg-white file:px-4 file:py-2 file:text-sm file:font-semibold file:text-slate-950"
              onChange={(event) => {
                const file = event.target.files?.[0] || null;
                setSelectedFile(file);
                if (file) {
                  setDocumentTitle(file.name);
                }
              }}
            />
            <button onClick={uploadAndReview} className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950">Upload metadata and run review</button>
            {error ? <p className="text-sm text-rose-300">{error}</p> : null}
          </div>
          <div className="mt-6 grid gap-3">
            {documents.filter((document) => document.type === type).map((document) => (
              <div key={document.id} className="rounded-2xl border border-white/10 bg-black/15 px-4 py-3 text-sm text-white/70">{document.title} • {document.status}</div>
            ))}
          </div>
        </Card>
        <div className="grid gap-6">
          {review ? (
            <>
              <Card>
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.22em] text-white/45">Review output</p>
                    <h2 className="mt-3 text-5xl font-semibold tracking-tight">{review.output.overallScore}</h2>
                  </div>
                  <div className="grid gap-2 text-sm text-white/68">
                    {review.output.dimensionScores.map((score) => (
                      <div key={score.label} className="flex items-center justify-between gap-8 rounded-2xl border border-white/10 bg-black/15 px-4 py-3">
                        <span>{score.label}</span>
                        <span>{score.score}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
              <Card>
                <p className="text-sm uppercase tracking-[0.22em] text-white/45">Findings</p>
                <div className="mt-5 grid gap-4 md:grid-cols-3">
                  <div>
                    <p className="font-medium text-white">Strengths</p>
                    <ul className="mt-3 grid gap-2 text-sm leading-6 text-white/68">{review.output.strengths.map((item) => <li key={item}>{item}</li>)}</ul>
                  </div>
                  <div>
                    <p className="font-medium text-white">Issues</p>
                    <ul className="mt-3 grid gap-2 text-sm leading-6 text-white/68">{review.output.issues.map((item) => <li key={item}>{item}</li>)}</ul>
                  </div>
                  <div>
                    <p className="font-medium text-white">Suggestions</p>
                    <ul className="mt-3 grid gap-2 text-sm leading-6 text-white/68">{review.output.tailoringSuggestions.map((item) => <li key={item}>{item}</li>)}</ul>
                  </div>
                </div>
              </Card>
            </>
          ) : (
            <Card><p className="text-sm text-white/60">Run a {type} review to populate this workspace.</p></Card>
          )}
        </div>
      </div>
    </div>
  );
}
