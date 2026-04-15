import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";

// Sora — Askia brand display font (matches askia.tech)
const display = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700", "800"],
  display: "swap",
});

// Inter — clean body / UI font
const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Askia Coach — AI Career Coaching",
  description:
    "Talk face-to-face with an AI career coach that reviews your resume, sharpens your LinkedIn, and helps you practice interviews.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  ),
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
