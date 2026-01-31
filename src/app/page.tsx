import Link from "next/link";

export default function Home() {
  return (
    <main className="section-shell flex min-h-screen flex-col items-center justify-center text-center">
      <p className="tag mb-4">Askia Labs</p>
      <h1 className="mb-4 text-4xl font-semibold text-slate-900">Job Search System</h1>
      <p className="mb-8 max-w-xl text-lg text-slate-600">
        Build your 30-day job search plan in 10 minutes. Get a personalized system, cadence, and scripts.
      </p>
      <Link
        href="/job-search-system"
        className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white"
      >
        Visit the landing page
      </Link>
    </main>
  );
}
