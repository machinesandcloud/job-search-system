import { notFound, redirect } from "next/navigation";
import { Card, Eyebrow, PageFrame, Section } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { getSessionForUser } from "@/lib/mvp/store";

export default async function RecapPage({ params }: { params: Promise<{ id: string }> }) {
  const userId = await getCurrentUserId();
  if (!userId) {
    redirect("/login");
  }

  const { id } = await params;
  const session = await getSessionForUser(userId, id);

  if (!session) {
    notFound();
  }

  return (
    <PageFrame authenticated>
      <Section className="py-12">
        <Eyebrow>Session Recap</Eyebrow>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight">{session.title}</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-white/70">{session.summary}</p>
      </Section>
      <Section className="grid gap-6 py-4 lg:grid-cols-[1fr_1fr]">
        <Card>
          <p className="text-sm uppercase tracking-[0.22em] text-white/45">Transcript snapshot</p>
          <div className="mt-5 grid gap-3 text-sm leading-6 text-white/72">
            {session.transcript.length ? session.transcript.map((item) => (
              <div key={`${item.time}_${item.message}`} className="rounded-2xl border border-white/10 bg-black/15 px-4 py-4">
                <p className="text-xs uppercase tracking-[0.18em] text-white/45">{item.role} • {item.time}</p>
                <p className="mt-2">{item.message}</p>
              </div>
            )) : <div className="rounded-2xl border border-white/10 bg-black/15 px-4 py-4">No transcript captured yet.</div>}
          </div>
        </Card>
        <Card>
          <p className="text-sm uppercase tracking-[0.22em] text-white/45">Next actions</p>
          <div className="mt-5 grid gap-3 text-sm leading-6 text-white/72">
            {session.notes.map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-black/15 px-4 py-4">{item}</div>
            ))}
          </div>
        </Card>
      </Section>
    </PageFrame>
  );
}
