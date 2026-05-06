import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Zari — Grow Into It",
  description:
    "AI-powered career coaching that reviews your resume, sharpens your LinkedIn, and prepares you for interviews — so you can land the job you actually want.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  ),
  icons: {
    icon: [
      { url: "/assets/favicon.ico", sizes: "any" },
      { url: "/assets/zari-icon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/assets/zari-icon-180x180.png",
    other: [
      { rel: "icon", url: "/assets/zari-icon-192x192.png", sizes: "192x192", type: "image/png" },
      { rel: "icon", url: "/assets/zari-icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Zari — Grow Into It",
    description: "AI career coaching that gets you hired.",
    images: [{ url: "/assets/zari-logo-transparent-800w.png", width: 800, alt: "Zari" }],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Zari — Grow Into It",
    description: "AI career coaching that gets you hired.",
    images: ["/assets/zari-logo-transparent-400w.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
