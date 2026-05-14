import Link from "next/link";
import { ZariLogo } from "@/components/zari-logo";
import { LegalBackButton } from "@/components/legal-back-button";

export const metadata = { title: "Privacy Policy – Zari" };

export default function PrivacyPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#F8F9FC", fontFamily: "Inter, system-ui, sans-serif" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px 24px 80px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 40 }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
            <ZariLogo size={28} />
            <span style={{ fontSize: 16, fontWeight: 800, background: "linear-gradient(135deg, #1459CC, #1868E8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Zari</span>
          </Link>
          <LegalBackButton />
        </div>

        <h1 style={{ fontSize: 28, fontWeight: 800, color: "#0F172A", marginBottom: 8 }}>Privacy Policy</h1>
        <p style={{ fontSize: 14, color: "#64748B", marginBottom: 40 }}>Last updated: May 6, 2025</p>

        {[
          {
            title: "1. Who We Are",
            body: "Zari is operated by Zari Marketing LLC. This Privacy Policy explains how we collect, use, and protect your personal information when you use our Service.",
          },
          {
            title: "2. Information We Collect",
            body: "We collect information you provide directly (name, email address, password), information generated through your use of the Service (resumes, chat messages, job search activity), and technical information (IP address, browser type, usage logs).",
          },
          {
            title: "3. How We Use Your Information",
            body: "We use your information to provide and improve the Service, personalize your experience, process payments, send transactional emails (account-related notifications), and comply with legal obligations. We do not sell your personal data.",
          },
          {
            title: "4. AI Processing",
            body: "Content you submit to Zari's AI tools (resumes, job descriptions, chat messages) is processed by large language model providers. We take care to use providers with strong data handling commitments. Your content is used solely to generate responses for you and is not used to train third-party models.",
          },
          {
            title: "5. Data Sharing",
            body: "We share data with: payment processors (Stripe) for billing, email providers (Resend) for transactional email, and infrastructure providers for hosting. We do not share your data with advertisers or data brokers.",
          },
          {
            title: "6. Data Retention",
            body: "We retain your account data while your account is active and for a reasonable period after deletion for legal and operational purposes. You may request deletion of your account and associated data by contacting privacy@zaricoach.com.",
          },
          {
            title: "7. Security",
            body: "We use industry-standard security measures including password hashing (scrypt), encrypted connections (HTTPS), and session token hashing. No system is perfectly secure; we encourage you to use a strong, unique password.",
          },
          {
            title: "8. Your Rights",
            body: "Depending on your jurisdiction, you may have rights to access, correct, delete, or export your personal data. To exercise these rights, contact privacy@zaricoach.com. We will respond within 30 days.",
          },
          {
            title: "9. Cookies",
            body: "We use session cookies to keep you signed in. We do not use third-party advertising cookies. By using the Service, you consent to our use of session cookies.",
          },
          {
            title: "10. Changes to This Policy",
            body: "We may update this Privacy Policy. We will notify you of material changes via email. Continued use of the Service after changes constitutes acceptance.",
          },
          {
            title: "11. Contact",
            body: "For privacy-related questions, contact us at privacy@zaricoach.com.",
          },
        ].map(({ title, body }) => (
          <div key={title} style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: "#1E293B", marginBottom: 8 }}>{title}</h2>
            <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.7, margin: 0 }}>{body}</p>
          </div>
        ))}

        <div style={{ borderTop: "1px solid #E2E8F0", paddingTop: 24, marginTop: 16 }}>
          <Link href="/terms" style={{ fontSize: 14, color: "#1459CC", marginRight: 24 }}>Terms of Service</Link>
          <Link href="/" style={{ fontSize: 14, color: "#64748B" }}>Back to Zari</Link>
        </div>
      </div>
    </div>
  );
}
