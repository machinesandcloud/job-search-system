import { Reveal } from "@/components/reveal";
import { PRICING_TESTIMONIALS } from "@/lib/pricing-catalog";

export function PricingSocialProof({
  heading = "Trusted by candidates making real career moves.",
  subheading = "Job search, promotion, negotiation, career change, and executive positioning all demand different kinds of coaching.",
}: {
  heading?: string;
  subheading?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-[var(--bg)] py-20 md:py-24">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          style={{
            position: "absolute",
            width: "560px",
            height: "560px",
            top: "-12%",
            right: "-10%",
            background: "var(--cyan)",
            opacity: 0.08,
            filter: "blur(140px)",
            borderRadius: "50%",
            animation: "float-b 22s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "520px",
            height: "520px",
            bottom: "-22%",
            left: "-10%",
            background: "var(--purple)",
            opacity: 0.06,
            filter: "blur(150px)",
            borderRadius: "50%",
            animation: "float-a 20s ease-in-out infinite",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <span className="inline-flex rounded-full border border-[var(--border)] bg-white px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
              Social Proof
            </span>
            <h2 className="mt-5 text-[2.4rem] font-extrabold tracking-[-0.04em] text-[var(--ink)] md:text-[3rem]">
              {heading}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[16px] leading-7 text-[var(--muted)]">{subheading}</p>
          </div>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {PRICING_TESTIMONIALS.map((item, index) => (
            <Reveal key={`${item.name}-${item.tag}`} data-delay={String((index % 3) + 1) as "1" | "2" | "3"}>
              <article className="kleo-testimonial flex h-full flex-col">
                <div className="flex items-center justify-between gap-3">
                  <span
                    className="inline-flex rounded-full px-3 py-1 text-[11px] font-semibold"
                    style={{ color: item.accent, background: `${item.accent}14` }}
                  >
                    {item.tag}
                  </span>
                  <div className="mb-0.5 flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <svg key={starIndex} className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" style={{ color: item.accent }}>
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                </div>

                <blockquote className="mt-5 flex-1 text-[15px] leading-7 text-[var(--ink-2)]">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>

                <div className="mt-6 flex items-center gap-3">
                  <div
                    className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full text-[12px] font-bold text-white"
                    style={{ background: item.accent }}
                  >
                    {item.initials}
                  </div>
                  <div>
                    <p className="text-[14px] font-bold text-[var(--ink)]">{item.name}</p>
                    <p className="text-[13px] text-[var(--muted)]">{item.role}</p>
                    <p className="text-[12px] font-semibold" style={{ color: item.accent }}>
                      {item.company}
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
