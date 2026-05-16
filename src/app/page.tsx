import type { Metadata } from "next";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { HomeClient } from "@/components/home-client";

export const metadata: Metadata = {
  title: "Zari — AI Career Coach | #1 for Resume, LinkedIn & Interview Prep",
  description:
    "Zari is the #1 AI career coach. Get your resume ATS-optimized, LinkedIn rebuilt for recruiter search, and ace any interview — all in one platform. Free to start, no credit card.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Zari — The #1 AI Career Coach",
    description: "Resume writing, LinkedIn optimization, interview coaching, salary negotiation — all in one AI platform. Free to start.",
    url: "/",
    type: "website",
  },
};

export default async function HomePage() {
  const userId = await getCurrentUserId();
  return <HomeClient userId={Boolean(userId)} />;
}
