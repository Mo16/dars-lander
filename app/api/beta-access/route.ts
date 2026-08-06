import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

export const runtime = "nodejs";

type Body = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  institute?: unknown;
  device?: unknown;
  year?: unknown;
  yearOther?: unknown;
  frequency?: unknown;
  heard?: unknown;
  heardOther?: unknown;
  message?: unknown;
  botcheck?: unknown;
};

const str = (v: unknown, max = 500) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

// Referral sources are posted as stable keys and stored as readable labels,
// so the admin table and the CSV export need no lookup of their own.
const HEARD_LABELS: Record<string, string> = {
  tiktok: "TikTok",
  instagram: "Instagram",
  whatsapp: "WhatsApp",
  friend: "A friend",
  teacher: "My teacher",
  institute: "My institute",
  youtube: "YouTube",
  search: "Google search",
};

export async function POST(req: Request) {
  let body: Body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (body.botcheck) {
    return Response.json({ ok: true });
  }

  const name = str(body.name, 120);
  const email = str(body.email, 200);
  const phoneRaw = str(body.phone, 40);
  const phoneDigits = phoneRaw.replace(/\D/g, "");
  const phone = phoneDigits ? `+${phoneDigits}` : "";
  const institute = str(body.institute, 200);
  const device = str(body.device, 30);
  const yearKey = str(body.year, 50);
  const yearOther = str(body.yearOther, 200);
  const year =
    yearKey === "Other" && yearOther ? `Other: ${yearOther}` : yearKey;
  const frequency = str(body.frequency, 30);
  const heardKey = str(body.heard, 40);
  const heardOther = str(body.heardOther, 200);
  // Left null rather than rejected when it's missing or unrecognised: the
  // field arrived after the form shipped, so an older cached bundle can still
  // post a valid application without one.
  const heardFrom =
    heardKey === "other"
      ? heardOther
        ? `Other: ${heardOther}`
        : "Other"
      : (HEARD_LABELS[heardKey] ?? "");
  const message = str(body.message, 4000);

  if (!name) {
    return Response.json({ error: "Name required" }, { status: 400 });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Invalid email" }, { status: 400 });
  }
  if (phoneDigits.length < 7) {
    return Response.json({ error: "Invalid phone" }, { status: 400 });
  }
  if (!institute) {
    return Response.json({ error: "Institute required" }, { status: 400 });
  }
  if (!device || !["ios", "android", "both"].includes(device)) {
    return Response.json({ error: "Device required" }, { status: 400 });
  }
  if (!yearKey) {
    return Response.json({ error: "Year required" }, { status: 400 });
  }
  if (!frequency || !["daily", "few_week", "occasionally"].includes(frequency)) {
    return Response.json({ error: "Frequency required" }, { status: 400 });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const resendKey = process.env.RESEND_API_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return Response.json({ error: "Server not configured" }, { status: 500 });
  }

  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
  });

  const { error: dbError } = await supabase.from("beta_testers").insert({
    name,
    email,
    phone,
    institute,
    device,
    year,
    frequency,
    heard_from: heardFrom || null,
    message: message || null,
  });

  if (dbError && dbError.code !== "23505") {
    console.error("supabase insert failed", dbError);
    return Response.json({ error: "Could not save application" }, { status: 500 });
  }

  if (resendKey) {
    const resend = new Resend(resendKey);
    const nameParts = name.split(/\s+/);
    const firstName = nameParts[0] || "there";
    const contactFirstName = nameParts[0] || "";
    const contactLastName = nameParts.slice(1).join(" ");

    try {
      await resend.contacts.create({
        audienceId: "478122fd-a6aa-43a8-af29-7901acae240b",
        email,
        firstName: contactFirstName,
        lastName: contactLastName,
        unsubscribed: false,
      });
    } catch (e) {
      console.error("resend audience add failed", e);
    }

    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM ?? "Dars <onboarding@resend.dev>",
        to: email,
        subject: "Got your beta tester application — Dars",
        html: buildAcknowledgement(firstName),
      });
    } catch (e) {
      console.error("resend ack send failed", e);
    }

    const notifyTo = process.env.BETA_NOTIFY_TO ?? process.env.CONTRIBUTE_NOTIFY_TO;
    if (notifyTo) {
      try {
        await resend.emails.send({
          from: process.env.RESEND_FROM ?? "Dars <onboarding@resend.dev>",
          to: notifyTo,
          subject: `New beta tester application — ${name}`,
          html: buildInternalNotification({
            name,
            email,
            phone,
            institute,
            device,
            year,
            frequency,
            heardFrom,
            message,
          }),
        });
      } catch (e) {
        console.error("resend internal notify failed", e);
      }
    }
  }

  return Response.json({ ok: true });
}

function buildAcknowledgement(firstName: string) {
  const sans =
    "-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif";
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:32px 16px;background:#FFF7EC;font-family:${sans};color:#1A1814;">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
<tr><td align="center">
<!--[if mso]><table role="presentation" width="520" cellspacing="0" cellpadding="0" border="0" align="center"><tr><td><![endif]-->
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" align="center" style="max-width:520px;width:100%;">

  <tr><td style="padding:0 0 18px;">
    <img src="https://darsapp.com/assets/img/logo.png" width="30" height="30" alt="" style="display:inline-block;width:30px;height:30px;vertical-align:middle;border:0;outline:none;text-decoration:none;">
    <span style="vertical-align:middle;margin-left:10px;font-family:${sans};font-size:18px;font-weight:600;letter-spacing:-0.01em;color:#1A1814;">Dars</span>
  </td></tr>

  <tr><td style="background:#FFFDF8;border:1px solid #EADFCB;border-radius:20px;padding:32px;">
    <p style="margin:0 0 12px;font-family:${sans};font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#C94A2E;font-weight:600;">◆ Application received</p>
    <h1 style="margin:0 0 14px;font-family:${sans};font-size:28px;line-height:1.15;font-weight:500;letter-spacing:-0.02em;color:#1A1814;">Got it, ${firstName}.</h1>
    <p style="margin:0 0 14px;font-family:${sans};font-size:15px;line-height:1.65;color:#3B372F;">Thanks for applying to test the Dars beta. We&#39;ll go through every application personally and email you once we&#39;ve had a proper look.</p>
    <p style="margin:0;font-family:${sans};font-size:15px;line-height:1.65;color:#3B372F;">In the meantime, if you&#39;ve got anything to add, just reply to this email.</p>
    <p style="margin:24px 0 0;font-family:${sans};font-size:14px;line-height:1.6;color:#1A1814;">Mohammed<br><span style="font-family:Georgia,'Times New Roman',serif;font-style:italic;color:#C94A2E;">Founder, Dars</span></p>
  </td></tr>

  <tr><td style="height:20px;line-height:20px;font-size:0;">&nbsp;</td></tr>

  <tr><td style="padding:0;">
    <a href="https://darsapp.com" style="font-family:${sans};font-size:13px;line-height:19px;color:#6E6A5F;text-decoration:none;">darsapp.com</a><a href="https://instagram.com/getdars" style="text-decoration:none;margin-left:22px;"><img src="https://darsapp.com/assets/img/email/instagram.png" width="19" height="19" alt="Instagram" style="width:19px;height:19px;border:0;outline:none;vertical-align:-6px;"></a><a href="https://tiktok.com/@dars.app" style="text-decoration:none;margin-left:16px;"><img src="https://darsapp.com/assets/img/email/tiktok.png" width="19" height="19" alt="TikTok" style="width:19px;height:19px;border:0;outline:none;vertical-align:-6px;"></a>
  </td></tr>

</table>
<!--[if mso]></td></tr></table><![endif]-->
</td></tr>
</table>
</body></html>`;
}

function buildInternalNotification(d: {
  name: string;
  email: string;
  phone: string;
  institute: string;
  device: string;
  year: string;
  frequency: string;
  heardFrom: string;
  message: string;
}) {
  const row = (label: string, value: string) =>
    value
      ? `<tr><td style="padding:6px 12px 6px 0;color:#6E6A5F;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;vertical-align:top;width:140px;">${label}</td><td style="padding:6px 0;font-size:14px;color:#1A1814;">${escape(value)}</td></tr>`
      : "";
  return `<!DOCTYPE html>
<html><body style="margin:0;padding:24px;background:#FFF7EC;font-family:-apple-system,Helvetica,sans-serif;">
<div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #EADFCB;border-radius:16px;padding:24px;">
<h2 style="margin:0 0 16px;font-size:20px;">New beta tester application</h2>
<table role="presentation" cellspacing="0" cellpadding="0" border="0" style="width:100%;border-collapse:collapse;">
${row("Name", d.name)}
${row("Email", d.email)}
${row("Phone", d.phone)}
${row("Institute", d.institute)}
${row("Device", d.device)}
${row("Year", d.year)}
${row("Frequency", d.frequency)}
${row("Heard about us", d.heardFrom)}
${row("Message", d.message)}
</table>
</div></body></html>`;
}

function escape(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/\n/g, "<br>");
}
