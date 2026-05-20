"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { ZariLogo } from "@/components/zari-logo";

function UnsubscribeContent() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const action = searchParams.get("action");
  const emailParam = searchParams.get("email") ?? "";
  const decodedEmail = emailParam ? decodeURIComponent(emailParam) : "";

  const isDone = status === "done";
  const isError = status === "error";
  const isConfirm = action === "confirm" && decodedEmail;

  return (
    <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm text-center">
      {isDone ? (
        <>
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-slate-900">You&apos;ve been unsubscribed</h1>
          {decodedEmail && (
            <p className="mt-2 text-sm text-slate-500">
              <span className="font-medium text-slate-700">{decodedEmail}</span> has been removed from all Zari marketing emails.
            </p>
          )}
          <p className="mt-4 text-sm text-slate-500">
            You&apos;ll still receive transactional emails (receipts, password resets, account alerts).
          </p>
          <Link
            href="/"
            className="mt-6 inline-block rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-700 transition-colors"
          >
            Back to Zari
          </Link>
        </>
      ) : isError ? (
        <>
          <h1 className="text-xl font-bold text-slate-900">Something went wrong</h1>
          <p className="mt-2 text-sm text-slate-500">
            We couldn&apos;t process your unsubscribe request. Please try again or contact{" "}
            <a href="mailto:support@zaricoach.com" className="text-blue-600 hover:underline">
              support@zaricoach.com
            </a>
            .
          </p>
        </>
      ) : isConfirm ? (
        <ConfirmUnsubscribe email={decodedEmail} />
      ) : (
        <>
          <h1 className="text-xl font-bold text-slate-900">Unsubscribe from Zari emails</h1>
          <p className="mt-2 text-sm text-slate-500">
            Enter your email address to unsubscribe from all Zari marketing emails.
          </p>
          <UnsubscribeForm />
        </>
      )}
    </div>
  );
}

function ConfirmUnsubscribe({ email }: { email: string }) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function confirm() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/email/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setDone(true);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <>
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-xl font-bold text-slate-900">You&apos;ve been unsubscribed</h1>
        <p className="mt-2 text-sm text-slate-500">
          <span className="font-medium text-slate-700">{email}</span> has been removed from all Zari marketing emails.
        </p>
        <p className="mt-4 text-sm text-slate-500">
          You&apos;ll still receive transactional emails (receipts, password resets, account alerts).
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-700 transition-colors"
        >
          Back to Zari
        </Link>
      </>
    );
  }

  return (
    <>
      <h1 className="text-xl font-bold text-slate-900">Unsubscribe from Zari emails?</h1>
      <p className="mt-2 text-sm text-slate-500">
        <span className="font-medium text-slate-700">{email}</span> will be removed from all Zari marketing emails.
        You&apos;ll still receive receipts and account alerts.
      </p>
      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      <button
        onClick={confirm}
        disabled={loading}
        className="mt-6 w-full rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-700 transition-colors disabled:opacity-50"
      >
        {loading ? "Unsubscribing…" : "Confirm unsubscribe"}
      </button>
      <Link
        href="/"
        className="mt-3 inline-block text-sm text-slate-500 hover:text-slate-700"
      >
        Cancel — keep me subscribed
      </Link>
    </>
  );
}

function UnsubscribeForm() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/email/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });
      if (res.ok) {
        setDone(true);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <>
        <div className="mx-auto mb-4 mt-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-sm font-medium text-slate-700">{email} has been unsubscribed.</p>
      </>
    );
  }

  return (
    <form className="mt-6 space-y-4" onSubmit={submit}>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        placeholder="your@email.com"
        className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-700 transition-colors disabled:opacity-50"
      >
        {loading ? "Unsubscribing…" : "Unsubscribe"}
      </button>
    </form>
  );
}

export default function UnsubscribePage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#F4F7FF_0%,#F8FAFC_38%,#EEF2FF_100%)] text-slate-900 flex flex-col">
      <header className="flex items-center px-8 py-6">
        <Link href="/" className="flex items-center gap-3 no-underline">
          <ZariLogo size={28} />
          <span className="text-[18px] font-black tracking-[-0.04em] text-[#0A0A0F]">Zari</span>
        </Link>
      </header>
      <main className="flex flex-1 items-center justify-center px-4">
        <Suspense fallback={<div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm" />}>
          <UnsubscribeContent />
        </Suspense>
      </main>
    </div>
  );
}
