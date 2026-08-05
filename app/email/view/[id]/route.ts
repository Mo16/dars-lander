import { createClient } from "@supabase/supabase-js";
import { renderEmail, type EmailBlock } from "@/lib/email/render";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// "View in browser" — the link every marketing email carries in its footer.
//
// Images blocked, a client that mangles the layout, a forwarded message that
// lost its formatting: this is the escape hatch, and it is also where someone
// lands when they want to read an email they half-deleted.
//
// The email is RE-RENDERED from the template rather than served from a stored
// copy. That means it always reflects the current template and the recipient's
// current figures, and we don't have to keep a 7 kB HTML blob per send forever.
//
// Access control is the id itself: email_sends.id is a v4 UUID, so it is not
// guessable, and it is only ever handed to the one person the email went to.
// Nothing here accepts an email address or any other user-supplied selector.

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function notFound() {
  return new Response(
    `<!doctype html><meta charset="utf-8"><meta name="robots" content="noindex">
     <title>Not found</title>
     <body style="margin:0;background:#FFF7EC;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#1A1814">
       <div style="max-width:560px;margin:15vh auto;padding:0 24px">
         <h1 style="font-size:26px;font-weight:600;letter-spacing:-0.015em;margin:0 0 12px">This email is no longer available.</h1>
         <p style="font-size:15px;line-height:1.6;color:#6E6A5F;margin:0">
           The link may have expired, or the message may have been removed.
           <a href="https://darsapp.com/support" style="color:#EC6144">Get in touch</a> if you need a hand.
         </p>
       </div>
     </body>`,
    { status: 404, headers: { "content-type": "text/html; charset=utf-8", "x-robots-tag": "noindex" } },
  );
}

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!UUID.test(id)) return notFound();

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return notFound();

  const supabase = createClient(url, key, { auth: { persistSession: false } });

  const { data: send } = await supabase
    .from("email_sends")
    .select("id, recipient, user_id, template_id, status")
    .eq("id", id)
    .maybeSingle();

  // A skipped row is a record of a decision, not a message anyone received —
  // there is nothing to show.
  if (!send || !send.template_id || send.status === "skipped") return notFound();

  const { data: template } = await supabase
    .from("email_templates")
    .select("subject, preheader, body_mode, blocks, markdown, html, category")
    .eq("id", send.template_id)
    .maybeSingle();

  if (!template) return notFound();

  // Rebuild the same merge context the send used. Figures are current rather
  // than historical, which is the honest thing for a page titled "view in
  // browser" — it shows the email as it would read today.
  const context: Record<string, string | number> = {
    email: send.recipient,
    app_url: "https://darsapp.com",
    open_url: "https://darsapp.com/open",
  };

  if (send.user_id) {
    const { data: merge } = await supabase.rpc("email_merge_context", {
      p_user_ids: [send.user_id],
    });
    const row = Array.isArray(merge) ? merge[0] : null;
    if (row) {
      Object.assign(context, {
        name: row.name ?? "",
        first_name: row.first_name ?? "",
        streak: row.streak ?? 0,
        longest_streak: row.longest_streak ?? 0,
        total_cards: row.total_cards ?? 0,
        total_minutes: row.total_minutes ?? 0,
        xp: row.xp ?? 0,
        due_count: row.due_count ?? 0,
      });
    }
  }

  const { data: prefs } = await supabase
    .from("email_preferences")
    .select("token")
    .ilike("email", send.recipient.replace(/([\\%_])/g, "\\$1"))
    .maybeSingle();

  if (prefs?.token) {
    context.preferences_url = `https://darsapp.com/email/preferences/${prefs.token}`;
    context.unsubscribe_url = context.preferences_url;
  }

  const rendered = renderEmail(
    {
      subject: template.subject,
      preheader: template.preheader,
      bodyMode: template.body_mode,
      blocks: (template.blocks ?? []) as EmailBlock[],
      markdown: template.markdown,
      html: template.html,
      category: template.category,
    },
    context,
  );

  return new Response(rendered.html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
      "x-robots-tag": "noindex, nofollow",
    },
  });
}
