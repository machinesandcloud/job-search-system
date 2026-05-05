import Link from "next/link";
import { Suspense } from "react";
import { ZariLogo } from "@/components/zari-logo";
import { BillingSuccessClient } from "@/components/billing-success-client";

function BillingSuccessFallback() {
  return (
    <div className="mt-8 rounded-[24px] border border-slate-200 bg-slate-50 px-5 py-5">
      <div className="flex items-center gap-3">
        <div className="h-3 w-3 rounded-full bg-[#4361EE]" />
        <p className="text-sm font-semibold text-slate-900">Activating your plan</p>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-600">
        We are processing your payment and opening your workspace.
      </p>
    </div>
  );
}

export default function BillingSuccessPage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#F4F7FF_0%,#F8FAFC_38%,#EEF2FF_100%)] text-slate-900">
      <header className="flex items-center justify-between px-8 py-6">
        <Link href="/" className="flex items-center gap-3 no-underline">
          <ZariLogo size={32} />
          <span className="text-[20px] font-black tracking-[-0.04em] text-[#0A0A0F]">Zari</span>
        </Link>
        <Link href="/onboarding/plan" className="text-sm font-medium text-slate-500 hover:text-slate-900">
          Back to plan selection
        </Link>
      </header>

      <main className="flex min-h-[calc(100vh-88px)] items-center justify-center px-6 pb-16">
        <div className="w-full max-w-xl rounded-[28px] border border-slate-200 bg-white px-8 py-10 shadow-[0_30px_80px_rgba(15,23,42,0.08)]">
          <span className="inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-700">
            Billing confirmation
          </span>

          <h1 className="mt-6 text-[2.2rem] font-black tracking-[-0.05em] text-[#0A0A0F]">
            Finalizing your access.
          </h1>

          <p className="mt-4 text-[15px] leading-7 text-slate-600">
            We are activating your plan and opening your workspace automatically.
          </p>

          <Suspense fallback={<BillingSuccessFallback />}>
            <BillingSuccessClient />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
