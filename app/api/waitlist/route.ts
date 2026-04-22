import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { buildConfirmationEmail } from "../../waitlist-email";

export const runtime = "nodejs";

type Body = {
  email?: unknown;
  botcheck?: unknown;
};

export async function POST(req: Request) {
  let body: Body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot: silently accept bot submissions so they don't retry, but drop.
  if (body.botcheck) {
    return Response.json({ ok: true });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Invalid email" }, { status: 400 });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const resendKey = process.env.RESEND_API_KEY;

  if (!supabaseUrl || !supabaseKey || !resendKey) {
    return Response.json(
      { error: "Server not configured" },
      { status: 500 },
    );
  }

  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
  });

  const { error: dbError } = await supabase
    .from("waitlist")
    .insert({ email });

  // 23505 = unique_violation (already signed up). Treat as success but skip
  // the confirmation email so duplicate submissions don't look spammy.
  const isDuplicate = dbError?.code === "23505";
  if (dbError && !isDuplicate) {
    console.error("supabase insert failed", dbError);
    return Response.json({ error: "Could not save signup" }, { status: 500 });
  }

  if (!isDuplicate) {
    const resend = new Resend(resendKey);
    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM ?? "Dars <onboarding@resend.dev>",
        to: email,
        subject: "You're on the Dars waitlist",
        html: buildConfirmationEmail(),
      });
    } catch (e) {
      // Don't fail the request — the signup is saved. Just log.
      console.error("resend send failed", e);
    }
  }

  return Response.json({ ok: true });
}
