import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "LinkedIn Profile Optimization — AI LinkedIn Coach",
  description: "Optimize your LinkedIn profile with AI. Zari rewrites your headline, About, and experience for recruiter search visibility.",
  alternates: { canonical: "/ai-linkedin-optimizer" },
};

export default function LinkedInProfileOptimizationPage() {
  redirect("/ai-linkedin-optimizer");
}
