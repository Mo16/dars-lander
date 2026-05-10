import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

export const runtime = "nodejs";

type Body = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  device?: unknown;
  year?: unknown;
  yearOther?: unknown;
  frequency?: unknown;
  message?: unknown;
  botcheck?: unknown;
};

const str = (v: unknown, max = 500) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

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
  const device = str(body.device, 30);
  const yearKey = str(body.year, 50);
  const yearOther = str(body.yearOther, 200);
  const year =
    yearKey === "Other" && yearOther ? `Other: ${yearOther}` : yearKey;
  const frequency = str(body.frequency, 30);
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
    device,
    year,
    frequency,
    message: message || null,
  });

  if (dbError && dbError.code !== "23505") {
    console.error("supabase insert failed", dbError);
    return Response.json({ error: "Could not save application" }, { status: 500 });
  }

  if (resendKey) {
    const resend = new Resend(resendKey);
    const firstName = name.split(/\s+/)[0] || "there";

    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM ?? "Dars <onboarding@resend.dev>",
        to: email,
        subject: "Got your alpha tester application — Dars",
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
          subject: `New alpha tester application — ${name}`,
          html: buildInternalNotification({
            name,
            email,
            phone,
            device,
            year,
            frequency,
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
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"></head>
<body style="margin:0;padding:32px 16px;background:#FFF7EC;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#1A1814;">
<div style="max-width:520px;margin:0 auto;background:#FFFDF8;border:1px solid #EADFCB;border-radius:20px;padding:32px;">
  <p style="margin:0 0 12px;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#EC6144;font-weight:600;">◆ Application received</p>
  <h1 style="margin:0 0 14px;font-size:28px;line-height:1.15;font-weight:500;letter-spacing:-0.02em;">Got it, ${firstName}.</h1>
  <p style="margin:0 0 14px;font-size:15px;line-height:1.65;color:#3B372F;">Thanks for applying to test the Dars alpha. Spots are limited &mdash; we&#39;ll go through every application personally and reach out by email or WhatsApp if you&#39;re in.</p>
  <p style="margin:0;font-size:15px;line-height:1.65;color:#3B372F;">In the meantime, if you&#39;ve got anything to add, just reply to this email.</p>
  <p style="margin:24px 0 0;font-size:14px;color:#1A1814;">Mohammed<br><span style="color:#EC6144;font-style:italic;">Founder, Dars</span></p>
</div>
</body></html>`;
}

function buildInternalNotification(d: {
  name: string;
  email: string;
  phone: string;
  device: string;
  year: string;
  frequency: string;
  message: string;
}) {
  const row = (label: string, value: string) =>
    value
      ? `<tr><td style="padding:6px 12px 6px 0;color:#6E6A5F;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;vertical-align:top;width:140px;">${label}</td><td style="padding:6px 0;font-size:14px;color:#1A1814;">${escape(value)}</td></tr>`
      : "";
  return `<!DOCTYPE html>
<html><body style="margin:0;padding:24px;background:#FFF7EC;font-family:-apple-system,Helvetica,sans-serif;">
<div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #EADFCB;border-radius:16px;padding:24px;">
<h2 style="margin:0 0 16px;font-size:20px;">New alpha tester application</h2>
<table role="presentation" cellspacing="0" cellpadding="0" border="0" style="width:100%;border-collapse:collapse;">
${row("Name", d.name)}
${row("Email", d.email)}
${row("Phone", d.phone)}
${row("Device", d.device)}
${row("Year", d.year)}
${row("Frequency", d.frequency)}
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
