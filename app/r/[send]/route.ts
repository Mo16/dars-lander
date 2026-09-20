import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Click tracking.
//
// Resend's webhook reports THAT a message was clicked. It cannot say which
// link, and "which link" is the only click datum that changes what you write
// next. So every outbound link in a Dars email is rewritten by the sender to
//
//   https://darsapp.com/r/<send id>?u=<encoded destination>
//
// and this route records the click, then forwards.
//
// --- Why there is no signature ---------------------------------------------
//
// A redirector that will forward anywhere is an open redirect: a phishing page
// reached through a darsapp.com link, in a message sent from our own domain.
// The usual defence is to sign the destination, which means a shared secret to
// hold, rotate and eventually get wrong.
//
// Instead the SENDER only ever rewrites links whose host is on the allow list
// below — anything else is left as an ordinary link, working but uncounted. So
// no unapproved URL can legitimately appear inside a /r/ link, and rejecting
// one here cannot break a real email. A forged link 400s.
//
// The list must stay in step with EMAIL_LINK_HOSTS on the email-tick function.

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const ALLOWED_HOSTS = new Set(
  (process.env.EMAIL_LINK_HOSTS ??
    "darsapp.com,www.darsapp.com,apps.apple.com,play.google.com,testflight.apple.com")
    .split(",")
    .map((h) => h.trim().toLowerCase())
    .filter(Boolean),
);

const SITE_ORIGIN = "https://darsapp.com";

function isForwardable(raw: string): boolean {
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return false;
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") return false;
  return ALLOWED_HOSTS.has(url.hostname.toLowerCase());
}

export async function GET(req: Request, { params }: { params: Promise<{ send: string }> }) {
  const { send } = await params;
  const destination = new URL(req.url).searchParams.get("u") ?? "";

  // A link we would never have written. Do not follow it, and do not record it.
  if (!isForwardable(destination)) {
    return Response.redirect(SITE_ORIGIN, 302);
  }

  // The redirect happens whether or not the write succeeds. A person clicking a
  // link in their inbox must never be held up by our analytics, and must never
  // see an error because a database was briefly unreachable.
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (url && key && UUID.test(send)) {
    try {
      const supabase = createClient(url, key, { auth: { persistSession: false } });
      await supabase.rpc("email_record_click", {
        p_send_id: send,
        p_url: destination,
        p_user_agent: req.headers.get("user-agent")?.slice(0, 300) ?? null,
      });
    } catch (cause) {
      console.error("click not recorded", cause);
    }
  }

  return new Response(null, {
    status: 302,
    headers: {
      location: destination,
      // Mail gateways and previewers pre-fetch links. Caching a redirect they
      // triggered would let it be served to the actual person later without
      // ever reaching this route, losing the real click.
      "cache-control": "no-store, no-cache, must-revalidate",
      "x-robots-tag": "noindex, nofollow",
      referrerpolicy: "no-referrer",
    },
  });
}
