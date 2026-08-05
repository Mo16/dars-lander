import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

// RFC 8058 one-click unsubscribe.
//
// Gmail and Apple Mail render their own "Unsubscribe" control when a bulk
// message carries:
//
//   List-Unsubscribe: <https://darsapp.com/api/email/unsubscribe?token=…>
//   List-Unsubscribe-Post: List-Unsubscribe=One-Click
//
// Pressing it POSTs here with no further interaction, so this endpoint must
// unsubscribe immediately and answer 200. Anything else and the mailbox
// provider treats us as a sender that ignores opt-outs, which is the fastest
// route to the spam folder.
//
// A GET on the same URL (some clients still probe it) is NOT treated as an
// unsubscribe — link scanners in corporate mail gateways follow every URL in a
// message, and honouring GET would silently unsubscribe people who never
// clicked anything. GET redirects to the preference centre instead.

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function admin() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

export async function POST(req: Request) {
  const token = new URL(req.url).searchParams.get("token") ?? "";
  if (!UUID.test(token)) {
    return new Response("Invalid token", { status: 400 });
  }

  const supabase = admin();
  if (!supabase) {
    return new Response("Not configured", { status: 500 });
  }

  const { error } = await supabase.rpc("email_prefs_write", {
    p_token: token,
    p_marketing: false,
    p_product_updates: false,
    p_weekly_report: false,
    p_streak_nudges: false,
    p_unsubscribe_all: true,
  });

  if (error) {
    console.error("one-click unsubscribe failed", error);
    // 500 makes the client retry, which is what we want — an unsubscribe that
    // silently failed is worse than one that takes two attempts.
    return new Response("Could not unsubscribe", { status: 500 });
  }

  return new Response("Unsubscribed", {
    status: 200,
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}

// The canonical origin, NOT req.url. Behind Netlify, req.url carries the
// internal per-deploy hostname (…--warm-salmiakki-e3abbf.netlify.app), so
// building the redirect from it sends people clicking an unsubscribe link in
// their inbox to a deploy-specific URL that will rot.
const SITE_ORIGIN = "https://darsapp.com";

export async function GET(req: Request) {
  const token = new URL(req.url).searchParams.get("token") ?? "";
  const target = UUID.test(token) ? `/email/preferences/${token}` : "/email/preferences";
  return Response.redirect(`${SITE_ORIGIN}${target}`, 302);
}
