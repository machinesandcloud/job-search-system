import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Job Interview Preparation — AI Interview Coach",
  description: "Prepare for any job interview with Zari's AI interview coach. Behavioral, technical, and panel questions with live STAR scoring.",
  alternates: { canonical: "/ai-interview-coach" },
};

export default function JobInterviewPreparationPage() {
  redirect("/ai-interview-coach");
}
