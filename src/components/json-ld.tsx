const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Zari",
    alternateName: "Zari AI Career Coach",
    url: BASE_URL,
    logo: `${BASE_URL}/assets/zari-logo-transparent-800w.png`,
    description:
      "Zari is an AI-powered career coaching platform that helps professionals land jobs faster through personalized resume writing, LinkedIn optimization, interview preparation, and career strategy.",
    foundingDate: "2024",
    sameAs: [
      "https://twitter.com/zaricoach",
      "https://linkedin.com/company/zaricoach",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "hello@zaricoach.com",
      availableLanguage: "English",
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function SoftwareAppJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Zari AI Career Coach",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: BASE_URL,
    description:
      "AI career coaching platform featuring resume writing, LinkedIn profile optimization, mock interview preparation, promotion coaching, and salary negotiation coaching.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Free to start — no credit card required",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "2400",
      bestRating: "5",
      worstRating: "1",
    },
    featureList: [
      "AI Resume Writer & ATS Optimizer",
      "LinkedIn Profile Optimization",
      "Mock Interview Coaching",
      "Career Strategy & Direction",
      "Salary Negotiation Coach",
      "Promotion Coach",
      "Voice Coaching Mode",
      "Session Memory & Progress Tracking",
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FaqJsonLd({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ArticleJsonLd({
  title,
  description,
  url,
  datePublished,
  dateModified,
}: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    datePublished,
    dateModified: dateModified || datePublished,
    author: { "@type": "Organization", name: "Zari", url: BASE_URL },
    publisher: {
      "@type": "Organization",
      name: "Zari",
      logo: { "@type": "ImageObject", url: `${BASE_URL}/assets/zari-logo-transparent-800w.png` },
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
