import type { Metadata } from "next";
import { Sora, Manrope } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-alt",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Job Search System",
  description: "Build your 30-day job search plan in 10 minutes.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sora.variable} ${manrope.variable}`}>
      <body className="bg-aurora">{children}</body>
    </html>
  );
}
