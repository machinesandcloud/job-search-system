import Link from "next/link";
import { ZariLogo } from "@/components/zari-logo";

interface Props {
  searchParams: Promise<{ status?: string; email?: string }>;
}

export default async function UnsubscribePage({ searchParams }: Props) {
  const { status, email } = await searchParams;
  const isDone = status === "done";
  const isError = status === "error";

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#F4F7FF_0%,#F8FAFC_38%,#EEF2FF_100%)] text-slate-900 flex flex-col">
      <header className="flex items-center px-8 py-6">
        <Link href="/" className="flex items-center gap-3 no-underline">
          <ZariLogo size={28} />
          <span className="text-[18px] font-black tracking-[-0.04em] text-[#0A0A0F]">Zari</span>
        </Link>
      </header>

      <main className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm text-center">
          {isDone ? (
            <>
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-slate-900">You&apos;ve been unsubscribed</h1>
              {email && (
                <p className="mt-2 text-sm text-slate-500">
                  <span className="font-medium text-slate-700">{decodeURIComponent(email)}</span> has been removed from all Zari marketing emails.
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
      </main>
    </div>
  );
}

function UnsubscribeForm() {
  return (
    <form
      className="mt-6 space-y-4"
      action="/api/email/unsubscribe"
      method="GET"
    >
      <input
        type="email"
        name="email"
        required
        placeholder="your@email.com"
        className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="w-full rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-700 transition-colors"
      >
        Unsubscribe
      </button>
    </form>
  );
}
