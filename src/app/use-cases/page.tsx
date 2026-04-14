import Link from "next/link";
import { Card, Section } from "@/components/mvp";
import { MarketingShell } from "@/components/mvp-marketing";
import { getCurrentUserId } from "@/lib/mvp/auth";

const useCases = [
  {
    title: "Resume review",
    body: "Surface the bullets that sound busy instead of consequential, then rewrite them around scope, systems, and measurable outcomes.",
    href: "/workspaces/resume",
  },
  {
    title: "LinkedIn positioning",
    body: "Turn your profile into a coherent career move with a clearer headline, stronger About section, and tighter experience framing.",
    href: "/workspaces/linkedin",
  },
  {
    title: "Interview practice",
    body: "Practice out loud, keep the transcript visible, and strengthen the answers that still feel generic or defensive.",
    href: "/interview",
  },
  {
    title: "Career direction",
    body: "Clarify target roles, identify narrative gaps, and leave with a next-step plan instead of vague advice.",
    href: "/coach",
  },
];

export default async function UseCasesPage() {
  const userId = await getCurrentUserId();

  return (
    <MarketingShell
      authenticated={Boolean(userId)}
      eyebrow="Use Cases"
      title="Separate coaching jobs deserve separate pages."
      description="The best reference sites do not collapse everything into one promise. They break out the key outcomes, explain how each surface helps, and let the visitor understand the product by job to be done."
      primaryCta={{ href: "/workspaces/resume", label: "Start with resume" }}
      secondaryCta={{ href: "/interview", label: "Try interview prep" }}
      spotlightTitle="Four high-value candidate workflows."
      spotlightBody="Askia Coach is strongest when it speaks clearly about what it helps with: resume proof, LinkedIn positioning, mock interviews, and career direction. Each use case needs its own path."
      spotlightPoints={[
        "Resume review for weak evidence, missing metrics, and role mismatch.",
        "LinkedIn rewriting for sharper positioning and cleaner narrative.",
        "Interview practice for stronger structure, confidence, and examples.",
      ]}
      stats={[
        { label: "Paths", value: "4" },
        { label: "Reviews", value: "Structured" },
        { label: "Interviews", value: "Practice" },
      ]}
    >
      <Section className="grid gap-5 pt-8 md:grid-cols-2">
        {useCases.map((item, index) => (
          <Card key={item.title} className={index === 2 ? "border-none bg-[var(--navy)] text-white" : ""}>
            <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${index === 2 ? "text-white/65" : "text-[var(--blue)]"}`}>{item.title}</p>
            <p className={`mt-4 text-sm leading-7 ${index === 2 ? "text-white/78" : "text-[var(--muted)]"}`}>{item.body}</p>
            <Link href={item.href} className={`mt-6 inline-flex text-sm font-semibold ${index === 2 ? "text-white" : "text-[var(--blue)]"}`}>
              Open workflow
            </Link>
          </Card>
        ))}
      </Section>

      <Section className="grid gap-6 xl:grid-cols-[0.96fr_1.04fr]">
        <Card className="bg-[linear-gradient(135deg,#3559e6_0%,#8a81ff_100%)] text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">What visitors should understand fast</p>
          <h2 className="mt-5 text-5xl leading-[0.98] tracking-[-0.04em]">This is a coaching company site first and a product demo second.</h2>
          <p className="mt-5 text-base leading-8 text-white/80">
            The site has to sell outcomes before it sells interface. Each use case page should show why the work matters, what the coach
            improves, and where the user goes next.
          </p>
        </Card>
        <Card>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">Use case language</p>
          <div className="mt-5 grid gap-3">
            {[
              "Less AI jargon. More candidate pain and outcome language.",
              "Show the difference between feedback, rewriting, rehearsal, and planning.",
              "Use buttons and links that route users into the actual workflow pages.",
            ].map((item) => (
              <div key={item} className="rounded-[22px] border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-4 text-sm leading-7 text-[var(--muted)]">
                {item}
              </div>
            ))}
          </div>
        </Card>
      </Section>
    </MarketingShell>
  );
}
