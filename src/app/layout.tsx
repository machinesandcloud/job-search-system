import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { OrganizationJsonLd, SoftwareAppJsonLd } from "@/components/json-ld";

const display = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700", "800"],
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

export const metadata: Metadata = {
  title: {
    default: "Zari — AI Career Coach | Resume, LinkedIn & Interview Prep",
    template: "%s | Zari AI Career Coach",
  },
  description:
    "Zari is the #1 AI career coach for resume writing, LinkedIn optimization, and interview preparation. Land your dream job faster with personalized AI coaching. Free to start.",
  metadataBase: new URL(BASE_URL),
  keywords: [
    "AI career coach",
    "AI career coaching",
    "career coach tool",
    "personal career coach",
    "AI resume writer",
    "AI resume builder",
    "resume review service",
    "AI interview coach",
    "interview preparation",
    "job interview coaching",
    "LinkedIn profile optimization",
    "AI LinkedIn optimizer",
    "career coaching software",
    "career coaching for job seekers",
    "career change coach",
    "promotion coach",
    "salary negotiation coach",
    "free career coach",
    "online career coach",
    "best AI career coach",
    "AI job search assistant",
    "resume optimization",
    "ATS resume scanner",
    "career advice AI",
    "job search help",
    "career coach app",
  ],
  verification: {
    google: "haoJBUE_KvxuRtHey4HWGCzX_tIWtgm-OuA9BjkJTqI",
  },
  authors: [{ name: "Zari", url: BASE_URL }],
  creator: "Zari",
  publisher: "Zari",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
  icons: {
    icon: [
      { url: "/assets/zari-icon-512x512.png", sizes: "512x512", type: "image/png" },
      { url: "/assets/zari-icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/assets/zari-icon-32x32.png",   sizes: "32x32",   type: "image/png" },
      { url: "/assets/favicon.ico",            sizes: "any" },
    ],
    shortcut: "/assets/zari-icon-192x192.png",
    apple: "/assets/zari-icon-180x180.png",
  },
  openGraph: {
    title: "Zari — AI Career Coach | Resume, LinkedIn & Interview Prep",
    description: "The AI career coach that reviews your resume, optimizes your LinkedIn, and preps you for interviews. Land the job you actually want.",
    images: [{ url: "/assets/zari-logo-transparent-800w.png", width: 800, height: 600, alt: "Zari AI Career Coach" }],
    type: "website",
    url: BASE_URL,
    siteName: "Zari",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zari — AI Career Coach",
    description: "AI-powered resume writing, LinkedIn optimization, and interview coaching. Start free.",
    images: ["/assets/zari-logo-transparent-800w.png"],
    creator: "@zaricoach",
    site: "@zaricoach",
  },
  category: "Technology",
  classification: "Career Coaching Software",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <head>
        <OrganizationJsonLd />
        <SoftwareAppJsonLd />
      </head>
      <body>{children}</body>
    </html>
  );
}
