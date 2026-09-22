import { createHash } from "node:crypto";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

export const runtime = "nodejs";

/**
 * The /institutes waitlist.
 *
 * Writes to public.institute_waitlist, NOT public.waitlist. A madrasah asking
 * for a pilot is a different lead from a student joining the beta, and once
 * they are in the same table there is no honest way to separate them again.
 */

type Body = {
  kind?: unknown;
  institute?: unknown;
  email?: unknown;
  name?: unknown;
  town?: unknown;
  role?: unknown;
  students?: unknown;
  note?: unknown;
  botcheck?: unknown;
};

const str = (v: unknown, max: number) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Enough to recognise a repeat sender without keeping anyone's address. Salted
 * with the service-role key, which never leaves the server.
 */
function hashIp(req: Request, salt: string): string | null {
  const forwarded = req.headers.get("x-forwarded-for") ?? "";
  const ip =
    forwarded.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "";
  if (!ip) return null;
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex").slice(0, 32);
}

export async function POST(req: Request) {
  let body: Body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // The hidden field no person ever fills. Answer as though it worked, so a
  // bot has nothing to learn from the response.
  if (body.botcheck) return Response.json({ ok: true });

  // A standalone teacher applies through the same door; for them
  // `institute` carries the class or halaqah they teach.
  const kind = body.kind === "teacher" ? "teacher" : "institute";

  const institute = str(body.institute, 160);
  const email = str(body.email, 160).toLowerCase();
  const contactName = str(body.name, 120);
  const town = str(body.town, 120);
  const role = str(body.role, 80);
  const students = str(body.students, 80);
  const note = str(body.note, 2000);

  if (!institute) {
    return Response.json(
      {
        error:
          kind === "teacher"
            ? "Tell us what you teach."
            : "Tell us the name of your madrasah.",
      },
      { status: 400 },
    );
  }
  if (!EMAIL_RE.test(email)) {
    return Response.json(
      { error: "That email address does not look right." },
      { status: 400 },
    );
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseKey) {
    return Response.json({ error: "Server not configured" }, { status: 500 });
  }

  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
  });

  const { error } = await supabase.from("institute_waitlist").insert({
    kind,
    institute_name: institute,
    email,
    contact_name: contactName || null,
    town: town || null,
    role: role || null,
    students: students || null,
    note: note || null,
    source: "landing",
    ip_hash: hashIp(req, supabaseKey),
    user_agent: req.headers.get("user-agent")?.slice(0, 400) ?? null,
  });

  // 23505 = this madrasah and this address are already on the list. That is
  // not a failure for the person submitting, so it reads as success.
  const isDuplicate = error?.code === "23505";
  if (error && !isDuplicate) {
    console.error("institute_waitlist insert failed", error);
    return Response.json(
      { error: "Could not save that. Try again in a moment." },
      { status: 500 },
    );
  }

  // Tell the team, if a mailbox is configured. A failure here never fails the
  // submission: the lead is already saved.
  const resendKey = process.env.RESEND_API_KEY;
  const notifyTo =
    process.env.INSTITUTE_NOTIFY_TO ??
    process.env.BETA_NOTIFY_TO ??
    process.env.CONTRIBUTE_NOTIFY_TO;

  if (!isDuplicate && resendKey && notifyTo) {
    try {
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from: process.env.RESEND_FROM ?? "Dars <onboarding@resend.dev>",
        to: notifyTo,
        subject: `${kind === "teacher" ? "Teacher" : "Institute"} waitlist — ${institute}`,
        html: buildNotification({
          kind,
          institute,
          email,
          contactName,
          town,
          role,
          students,
          note,
        }),
      });
    } catch (e) {
      console.error("institute notify failed", e);
    }
  }

  return Response.json({ ok: true, duplicate: isDuplicate });
}

function buildNotification(f: {
  kind: string;
  institute: string;
  email: string;
  contactName: string;
  town: string;
  role: string;
  students: string;
  note: string;
}) {
  const esc = (s: string) =>
    s.replace(/[<>&]/g, (c) =>
      c === "<" ? "&lt;" : c === ">" ? "&gt;" : "&amp;",
    );
  const row = (label: string, value: string) =>
    value
      ? `<tr><td style="padding:6px 16px 6px 0;color:#5f5d57;font-size:13px;white-space:nowrap">${label}</td><td style="padding:6px 0;color:#1c1b19;font-size:14px">${esc(value)}</td></tr>`
      : "";

  return `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;max-width:560px">
  <p style="font-size:16px;color:#1c1b19;margin:0 0 16px">${
    f.kind === "teacher"
      ? "A teacher with no institute has asked for a place."
      : "A madrasah has asked for an institute pilot."
  }</p>
  <table style="border-collapse:collapse">
    ${row(f.kind === "teacher" ? "Teaches" : "Madrasah", f.institute)}
    ${row("Town", f.town)}
    ${row("Contact", f.contactName)}
    ${row("Email", f.email)}
    ${row("Role", f.role)}
    ${row("Size", f.students)}
    ${row("Note", f.note)}
  </table>
</div>`;
}
