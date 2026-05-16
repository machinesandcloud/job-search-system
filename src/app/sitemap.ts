import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    // Core marketing
    { url: base,                                    lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${base}/platform`,                      lastModified: now, changeFrequency: "weekly",  priority: 0.95 },
    { url: `${base}/pricing`,                       lastModified: now, changeFrequency: "weekly",  priority: 0.95 },
    { url: `${base}/use-cases`,                     lastModified: now, changeFrequency: "monthly", priority: 0.9 },

    // Primary keyword landing pages (highest SEO priority)
    { url: `${base}/ai-career-coach`,               lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${base}/ai-resume-writer`,              lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${base}/ai-interview-coach`,            lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${base}/ai-linkedin-optimizer`,         lastModified: now, changeFrequency: "weekly",  priority: 0.95 },

    // Career coach variants
    { url: `${base}/career-coach-tool`,             lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/personal-career-coach`,         lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/free-career-coach`,             lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/career-coaching-software`,      lastModified: now, changeFrequency: "monthly", priority: 0.85 },

    // Specialty coaching
    { url: `${base}/salary-negotiation-coach`,      lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/promotion-coach`,               lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/career-change-coach`,           lastModified: now, changeFrequency: "monthly", priority: 0.85 },

    // Service pages
    { url: `${base}/resume-review-service`,         lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/cover-letter-writer`,           lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/linkedin-profile-optimization`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/job-interview-preparation`,     lastModified: now, changeFrequency: "monthly", priority: 0.85 },

    // Free tool pages (high bottom-of-funnel SEO)
    { url: `${base}/free-resume-checker`,           lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/free-ats-checker`,              lastModified: now, changeFrequency: "monthly", priority: 0.9 },

    // Profession-specific career coaching
    { url: `${base}/career-coach-for-software-engineers`, lastModified: now, changeFrequency: "monthly", priority: 0.88 },
    { url: `${base}/career-coach-for-product-managers`,   lastModified: now, changeFrequency: "monthly", priority: 0.88 },
    { url: `${base}/career-coach-for-executives`,         lastModified: now, changeFrequency: "monthly", priority: 0.88 },
    { url: `${base}/career-coach-for-nurses`,                      lastModified: now, changeFrequency: "monthly", priority: 0.88 },
    { url: `${base}/career-coach-for-teachers`,                    lastModified: now, changeFrequency: "monthly", priority: 0.88 },
    { url: `${base}/career-coach-for-marketing-professionals`,     lastModified: now, changeFrequency: "monthly", priority: 0.88 },
    { url: `${base}/career-coach-for-data-scientists`,             lastModified: now, changeFrequency: "monthly", priority: 0.88 },
    { url: `${base}/career-coach-for-finance-professionals`,       lastModified: now, changeFrequency: "monthly", priority: 0.88 },
    { url: `${base}/career-coach-for-sales-professionals`,         lastModified: now, changeFrequency: "monthly", priority: 0.88 },
    { url: `${base}/career-coach-for-designers`,                   lastModified: now, changeFrequency: "monthly", priority: 0.88 },
    { url: `${base}/career-coach-for-hr-professionals`,            lastModified: now, changeFrequency: "monthly", priority: 0.88 },
    { url: `${base}/career-coach-for-cybersecurity-professionals`, lastModified: now, changeFrequency: "monthly", priority: 0.88 },
    { url: `${base}/career-coach-for-operations-professionals`,   lastModified: now, changeFrequency: "monthly", priority: 0.88 },
    { url: `${base}/career-coach-for-lawyers`,                    lastModified: now, changeFrequency: "monthly", priority: 0.88 },
    { url: `${base}/career-coach-for-accountants`,                lastModified: now, changeFrequency: "monthly", priority: 0.88 },
    { url: `${base}/career-coach-for-project-managers`,           lastModified: now, changeFrequency: "monthly", priority: 0.88 },
    { url: `${base}/career-coach-for-recent-graduates`,           lastModified: now, changeFrequency: "monthly", priority: 0.88 },

    // Audience-specific pages
    { url: `${base}/career-coaching-for-job-seekers`,     lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/career-coaching-for-recent-graduates`,lastModified: now, changeFrequency: "monthly", priority: 0.85 },

    // Competitor comparison pages (high buying intent)
    { url: `${base}/compare`,                            lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/compare/zari-vs-kleo`,               lastModified: now, changeFrequency: "monthly", priority: 0.88 },
    { url: `${base}/compare/zari-vs-teal`,               lastModified: now, changeFrequency: "monthly", priority: 0.88 },
    { url: `${base}/compare/zari-vs-jobscan`,            lastModified: now, changeFrequency: "monthly", priority: 0.88 },
    { url: `${base}/compare/zari-vs-resume-worded`,      lastModified: now, changeFrequency: "monthly", priority: 0.88 },
    { url: `${base}/compare/zari-vs-linkedin-premium`,   lastModified: now, changeFrequency: "monthly", priority: 0.90 },
    { url: `${base}/compare/zari-vs-chatgpt`,             lastModified: now, changeFrequency: "monthly", priority: 0.90 },
    { url: `${base}/compare/zari-vs-gemini`,              lastModified: now, changeFrequency: "monthly", priority: 0.90 },
    { url: `${base}/compare/zari-vs-kickresume`,          lastModified: now, changeFrequency: "monthly", priority: 0.88 },
    { url: `${base}/compare/zari-vs-rezi`,                lastModified: now, changeFrequency: "monthly", priority: 0.88 },
    { url: `${base}/compare/zari-vs-enhancv`,             lastModified: now, changeFrequency: "monthly", priority: 0.88 },
    { url: `${base}/compare/zari-vs-novoresume`,          lastModified: now, changeFrequency: "monthly", priority: 0.88 },
    { url: `${base}/compare/zari-vs-claude`,              lastModified: now, changeFrequency: "monthly", priority: 0.90 },
    { url: `${base}/compare/zari-vs-resumeio`,            lastModified: now, changeFrequency: "monthly", priority: 0.88 },

    // Blog / resources
    { url: `${base}/blog`,                                        lastModified: now, changeFrequency: "weekly",  priority: 0.85 },
    { url: `${base}/blog/best-ai-career-coach`,                   lastModified: now, changeFrequency: "monthly", priority: 0.82 },
    { url: `${base}/blog/how-to-write-resume-with-ai`,            lastModified: now, changeFrequency: "monthly", priority: 0.82 },
    { url: `${base}/blog/how-to-prepare-for-job-interview`,       lastModified: now, changeFrequency: "monthly", priority: 0.82 },
    { url: `${base}/blog/how-to-optimize-linkedin-profile`,       lastModified: now, changeFrequency: "monthly", priority: 0.82 },
    { url: `${base}/blog/salary-negotiation-tips`,                lastModified: now, changeFrequency: "monthly", priority: 0.82 },
    { url: `${base}/blog/career-change-guide`,                    lastModified: now, changeFrequency: "monthly", priority: 0.82 },
    { url: `${base}/blog/promotion-strategy-guide`,               lastModified: now, changeFrequency: "monthly", priority: 0.82 },
    { url: `${base}/blog/ats-resume-tips`,                        lastModified: now, changeFrequency: "monthly", priority: 0.82 },
    { url: `${base}/blog/what-is-an-ats`,                         lastModified: now, changeFrequency: "monthly", priority: 0.82 },
    { url: `${base}/blog/linkedin-headline-examples`,             lastModified: now, changeFrequency: "monthly", priority: 0.82 },
    { url: `${base}/blog/how-to-answer-tell-me-about-yourself`,   lastModified: now, changeFrequency: "monthly", priority: 0.82 },
    { url: `${base}/blog/resume-summary-examples`,                lastModified: now, changeFrequency: "monthly", priority: 0.82 },
    { url: `${base}/blog/how-to-negotiate-job-offer`,             lastModified: now, changeFrequency: "monthly", priority: 0.82 },
    { url: `${base}/blog/star-method-interview`,                   lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/blog/behavioral-interview-questions`,          lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/blog/how-to-write-a-cover-letter`,            lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/blog/common-interview-questions`,             lastModified: now, changeFrequency: "monthly", priority: 0.87 },
    { url: `${base}/blog/thank-you-email-after-interview`,        lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/blog/resume-format-guide`,                    lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/blog/how-to-ask-for-a-raise`,                 lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/blog/linkedin-summary-examples`,              lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/blog/how-to-explain-gaps-in-employment`,      lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/blog/job-search-tips`,                        lastModified: now, changeFrequency: "monthly", priority: 0.87 },
    { url: `${base}/blog/linkedin-summary-examples`,              lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/blog/weakness-interview-answer`,              lastModified: now, changeFrequency: "monthly", priority: 0.87 },
    { url: `${base}/blog/interview-questions-to-ask`,             lastModified: now, changeFrequency: "monthly", priority: 0.87 },
    { url: `${base}/blog/how-to-follow-up-on-job-application`,    lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/blog/professional-summary-for-resume`,        lastModified: now, changeFrequency: "monthly", priority: 0.87 },
    { url: `${base}/blog/how-to-cold-email-for-a-job`,           lastModified: now, changeFrequency: "monthly", priority: 0.87 },
    { url: `${base}/blog/career-goals-examples`,                 lastModified: now, changeFrequency: "monthly", priority: 0.87 },
    { url: `${base}/blog/linkedin-recommendation-examples`,      lastModified: now, changeFrequency: "monthly", priority: 0.87 },
    { url: `${base}/blog/how-to-write-two-weeks-notice`,         lastModified: now, changeFrequency: "monthly", priority: 0.87 },
    { url: `${base}/blog/networking-email-templates`,            lastModified: now, changeFrequency: "monthly", priority: 0.87 },
    { url: `${base}/blog/how-to-answer-why-do-you-want-to-work-here`, lastModified: now, changeFrequency: "monthly", priority: 0.87 },
    { url: `${base}/blog/how-to-evaluate-a-job-offer`,              lastModified: now, changeFrequency: "monthly", priority: 0.87 },
    { url: `${base}/blog/how-to-get-a-job-with-no-experience`,     lastModified: now, changeFrequency: "monthly", priority: 0.87 },
    { url: `${base}/blog/where-do-you-see-yourself-in-5-years`,    lastModified: now, changeFrequency: "monthly", priority: 0.87 },
    { url: `${base}/blog/amazon-leadership-principles-interview`,  lastModified: now, changeFrequency: "monthly", priority: 0.87 },
    { url: `${base}/blog/linkedin-connection-request-message`,     lastModified: now, changeFrequency: "monthly", priority: 0.87 },

    // Auth / conversion
    { url: `${base}/signup`,  lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/login`,   lastModified: now, changeFrequency: "monthly", priority: 0.6 },

    // Legal
    { url: `${base}/terms`,   lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${base}/security`,lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
  ];

  return staticPages;
}
