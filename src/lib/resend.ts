import { Resend } from "resend";

let _client: Resend | null = null;

export function getResendClient(): Resend {
  if (!_client) {
    const key = process.env.RESEND_API_KEY;
    if (!key) throw new Error("RESEND_API_KEY is not configured");
    _client = new Resend(key);
  }
  return _client;
}

export const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "Zari <coach@zaricoach.com>";
export const REPLY_TO = process.env.RESEND_REPLY_TO ?? "support@zaricoach.com";

export async function sendEmail(opts: {
  to: string;
  subject: string;
  html: string;
}): Promise<void> {
  const resend = getResendClient();
  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    replyTo: REPLY_TO,
    to: opts.to,
    subject: opts.subject,
    html: opts.html,
  });
  if (error) throw new Error(`Resend error: ${error.message}`);
}
