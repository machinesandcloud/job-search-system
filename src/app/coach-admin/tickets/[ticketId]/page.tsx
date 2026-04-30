import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CoachAdminNoteForm,
  SupportTicketUpdateForm,
} from "@/components/coach-admin-forms";
import { requireCoachAdminSession } from "@/lib/coach-admin-auth";
import { prisma } from "@/lib/db";

function formatDateTime(value?: Date | null) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

type TicketPageProps = {
  params: Promise<{ ticketId: string }>;
};

export default async function CoachAdminTicketPage({ params }: TicketPageProps) {
  await requireCoachAdminSession("support");
  const { ticketId } = await params;

  const ticket = await prisma.supportTicket.findUnique({
    where: { id: ticketId },
    include: {
      account: true,
      reporter: true,
      assignedTo: true,
      adminNotes: {
        include: { author: true },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!ticket) notFound();

  const assignees = await prisma.user.findMany({
    where: { role: { in: ["admin", "support"] } },
    orderBy: { email: "asc" },
  });

  const assigneeOptions = assignees.map((user: (typeof assignees)[number]) => ({
    id: user.id,
    label: user.email,
  }));

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link href="/coach-admin/tickets" className="text-sm text-cyan-300 transition hover:text-cyan-200">
            ← Back to tickets
          </Link>
          <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white">{ticket.subject}</h1>
          <p className="mt-2 text-sm text-slate-400">
            Account:{" "}
            <Link href={`/coach-admin/accounts/${ticket.accountId}`} className="text-cyan-300 hover:text-cyan-200">
              {ticket.account?.name || ticket.accountId.slice(0, 8)}
            </Link>
            {" · "}Created {formatDateTime(ticket.createdAt)}
          </p>
        </div>
        <div className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-slate-200">
          {ticket.status.replace(/_/g, " ")}
        </div>
      </div>

      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="grid gap-6">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-400/80">Ticket details</p>
            <div className="mt-5 space-y-5">
              <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5">
                <p className="text-sm leading-7 text-slate-200">{ticket.description}</p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Priority</p>
                  <p className="mt-2 text-lg font-semibold capitalize text-white">{ticket.priority}</p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Category</p>
                  <p className="mt-2 text-lg font-semibold capitalize text-white">{ticket.category}</p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Reporter</p>
                  <p className="mt-2 text-sm text-slate-300">{ticket.reporter?.email || "—"}</p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Assigned to</p>
                  <p className="mt-2 text-sm text-slate-300">{ticket.assignedTo?.email || "unassigned"}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-400/80">Internal thread</p>
            <div className="mt-5">
              <CoachAdminNoteForm endpoint={`/api/coach-admin/tickets/${ticket.id}/notes`} placeholder="Add an internal note or next-step update..." />
            </div>
            <div className="mt-5 grid gap-3">
              {ticket.adminNotes.map((note: (typeof ticket.adminNotes)[number]) => (
                <div key={note.id} className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
                  <p className="text-sm leading-6 text-slate-200">{note.note}</p>
                  <p className="mt-2 text-xs text-slate-500">
                    {note.author.email} · {formatDateTime(note.createdAt)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-400/80">Update ticket</p>
            <div className="mt-5">
              <SupportTicketUpdateForm
                ticketId={ticket.id}
                currentStatus={ticket.status}
                assigneeOptions={assigneeOptions}
                currentAssigneeId={ticket.assignedToId}
              />
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-400/80">Timing</p>
            <div className="mt-5 space-y-4 text-sm text-slate-300">
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-500">Created</span>
                <span>{formatDateTime(ticket.createdAt)}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-500">Updated</span>
                <span>{formatDateTime(ticket.updatedAt)}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-500">Resolved</span>
                <span>{formatDateTime(ticket.resolvedAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
