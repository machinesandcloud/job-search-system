import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CoachAdminNoteForm,
  SupportTicketUpdateForm,
} from "@/components/coach-admin-forms";
import {
  CoachAdminEmptyState,
  CoachAdminLinkButton,
  CoachAdminMetaItem,
  CoachAdminPanel,
  CoachAdminPill,
} from "@/components/coach-admin-ui";
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

function statusTone(status?: string | null) {
  const value = `${status || ""}`.toLowerCase();
  if (value === "resolved") return "emerald" as const;
  if (value === "in_progress") return "gold" as const;
  if (value === "closed") return "slate" as const;
  return "brand" as const;
}

function priorityTone(priority?: string | null) {
  const value = `${priority || ""}`.toLowerCase();
  if (value === "urgent" || value === "high") return "rose" as const;
  if (value === "medium") return "gold" as const;
  return "cyan" as const;
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
    <div className="space-y-6">
      <CoachAdminPanel
        eyebrow="Ticket detail"
        title={ticket.subject}
        description={
          <>
            Account{" "}
            <Link href={`/coach-admin/accounts/${ticket.accountId}`} className="text-cyan-300 transition hover:text-cyan-200">
              {ticket.account?.name || ticket.accountId.slice(0, 8)}
            </Link>
            {" · "}Created {formatDateTime(ticket.createdAt)}
          </>
        }
        action={<CoachAdminLinkButton href="/coach-admin/tickets" tone="slate">← Back to tickets</CoachAdminLinkButton>}
      >
        <div className="flex flex-wrap gap-3">
          <CoachAdminPill tone={statusTone(ticket.status)}>{ticket.status.replace(/_/g, " ")}</CoachAdminPill>
          <CoachAdminPill tone={priorityTone(ticket.priority)}>{ticket.priority}</CoachAdminPill>
          <CoachAdminPill tone="slate">{ticket.category}</CoachAdminPill>
          <CoachAdminPill tone="cyan">{ticket.assignedTo?.email || "Unassigned"}</CoachAdminPill>
        </div>
      </CoachAdminPanel>

      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="grid gap-6">
          <CoachAdminPanel eyebrow="Ticket body" title="What happened" description="The original issue statement and the surrounding support context.">
            <div className="rounded-[26px] border border-white/10 bg-black/20 p-5">
              <p className="text-sm leading-8 text-slate-200">{ticket.description}</p>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <CoachAdminMetaItem label="Reporter" value={ticket.reporter?.email || "—"} />
              <CoachAdminMetaItem label="Assigned to" value={ticket.assignedTo?.email || "unassigned"} />
              <CoachAdminMetaItem label="Priority" value={ticket.priority} />
              <CoachAdminMetaItem label="Category" value={ticket.category} />
            </div>
          </CoachAdminPanel>

          <CoachAdminPanel eyebrow="Internal thread" title="Operator notes" description="Use this thread for internal coordination, next steps, and support memory.">
            <CoachAdminNoteForm endpoint={`/api/coach-admin/tickets/${ticket.id}/notes`} placeholder="Add an internal note or next-step update..." />
            <div className="mt-5 grid gap-3">
              {ticket.adminNotes.length ? (
                ticket.adminNotes.map((note: (typeof ticket.adminNotes)[number]) => (
                  <div key={note.id} className="rounded-[24px] border border-white/10 bg-white/[0.04] px-4 py-4">
                    <p className="text-sm leading-7 text-slate-200">{note.note}</p>
                    <p className="mt-2 text-xs uppercase tracking-[0.14em] text-white/38">{note.author.email} · {formatDateTime(note.createdAt)}</p>
                  </div>
                ))
              ) : (
                <CoachAdminEmptyState title="No internal notes yet" body="Drop internal troubleshooting context here instead of scattering it across chat." />
              )}
            </div>
          </CoachAdminPanel>
        </div>

        <div className="grid gap-6">
          <CoachAdminPanel eyebrow="Update ticket" title="Assignment and state" description="Adjust the owner and move the ticket through the queue.">
            <SupportTicketUpdateForm
              ticketId={ticket.id}
              currentStatus={ticket.status}
              assigneeOptions={assigneeOptions}
              currentAssigneeId={ticket.assignedToId}
            />
          </CoachAdminPanel>

          <CoachAdminPanel eyebrow="Timing" title="Lifecycle markers" description="Creation, update, and resolution timestamps for operator traceability.">
            <div className="grid gap-3">
              <CoachAdminMetaItem label="Created" value={formatDateTime(ticket.createdAt)} />
              <CoachAdminMetaItem label="Updated" value={formatDateTime(ticket.updatedAt)} />
              <CoachAdminMetaItem label="Resolved" value={formatDateTime(ticket.resolvedAt)} />
            </div>
          </CoachAdminPanel>
        </div>
      </section>
    </div>
  );
}

