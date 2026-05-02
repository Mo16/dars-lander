import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

export const runtime = "nodejs";

type Body = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  location?: unknown;
  year?: unknown;
  institution?: unknown;
  books?: unknown;
  booksOther?: unknown;
  aiAccount?: unknown;
  techComfort?: unknown;
  hoursPerWeek?: unknown;
  commitment?: unknown;
  startWhen?: unknown;
  heardAbout?: unknown;
  heardAboutOther?: unknown;
  message?: unknown;
  botcheck?: unknown;
};

const str = (v: unknown, max = 500) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

const strArr = (v: unknown, max = 50) =>
  Array.isArray(v)
    ? v.filter((x): x is string => typeof x === "string").slice(0, max)
    : [];

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
  // Re-attach the visible-prefix "+" — the form strips it because the prefix
  // is rendered as a separator. Store with leading +.
  const phone = phoneDigits ? `+${phoneDigits}` : "";
  const location = str(body.location, 200);
  const year = str(body.year, 50);
  const institution = str(body.institution, 200);
  const books = strArr(body.books).map((b) => b.slice(0, 100));
  const booksOther = str(body.booksOther, 1000);
  const aiAccount = str(body.aiAccount, 50);
  const techComfort = str(body.techComfort, 50);
  const hoursPerWeek = str(body.hoursPerWeek, 50);
  const commitment = str(body.commitment, 50);
  const startWhen = str(body.startWhen, 50);
  const heardAboutKey = str(body.heardAbout, 50);
  const heardAboutOther = str(body.heardAboutOther, 200);
  const heardAbout =
    heardAboutKey === "other" && heardAboutOther
      ? `other: ${heardAboutOther}`
      : heardAboutKey;
  const message = str(body.message, 4000);

  if (!name || name.length < 1) {
    return Response.json({ error: "Name required" }, { status: 400 });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Invalid email" }, { status: 400 });
  }
  if (phoneDigits.length < 7) {
    return Response.json({ error: "Invalid phone" }, { status: 400 });
  }
  if (!location) {
    return Response.json({ error: "Location required" }, { status: 400 });
  }
  if (!year) {
    return Response.json({ error: "Year required" }, { status: 400 });
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

  const { error: dbError } = await supabase.from("contributors").insert({
    name,
    email,
    phone,
    location,
    year,
    institution: institution || null,
    books,
    books_other: booksOther || null,
    ai_account: aiAccount || null,
    tech_comfort: techComfort || null,
    hours_per_week: hoursPerWeek || null,
    commitment: commitment || null,
    start_when: startWhen || null,
    heard_about: heardAbout || null,
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
        subject: "Got your contributor application — Dars",
        html: buildAcknowledgement(firstName),
      });
    } catch (e) {
      console.error("resend ack send failed", e);
    }

    const notifyTo = process.env.CONTRIBUTE_NOTIFY_TO;
    if (notifyTo) {
      try {
        await resend.emails.send({
          from: process.env.RESEND_FROM ?? "Dars <onboarding@resend.dev>",
          to: notifyTo,
          subject: `New contributor application — ${name}`,
          html: buildInternalNotification({
            name,
            email,
            phone,
            location,
            year,
            institution,
            books,
            booksOther,
            aiAccount,
            techComfort,
            hoursPerWeek,
            commitment,
            startWhen,
            heardAbout,
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
  <p style="margin:0 0 14px;font-size:15px;line-height:1.65;color:#3B372F;">Thanks for applying to contribute to Dars. We&#39;ll go through every application personally and email you back &mdash; usually within a week.</p>
  <p style="margin:0;font-size:15px;line-height:1.65;color:#3B372F;">In the meantime, if you have anything to add, just reply to this email.</p>
  <p style="margin:24px 0 0;font-size:14px;color:#1A1814;">Mohammed<br><span style="color:#EC6144;font-style:italic;">Founder, Dars</span></p>
</div>
</body></html>`;
}

function buildInternalNotification(d: {
  name: string;
  email: string;
  phone: string;
  location: string;
  year: string;
  institution: string;
  books: string[];
  booksOther: string;
  aiAccount: string;
  techComfort: string;
  hoursPerWeek: string;
  commitment: string;
  startWhen: string;
  heardAbout: string;
  message: string;
}) {
  const row = (label: string, value: string) =>
    value
      ? `<tr><td style="padding:6px 12px 6px 0;color:#6E6A5F;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;vertical-align:top;width:140px;">${label}</td><td style="padding:6px 0;font-size:14px;color:#1A1814;">${escape(value)}</td></tr>`
      : "";
  return `<!DOCTYPE html>
<html><body style="margin:0;padding:24px;background:#FFF7EC;font-family:-apple-system,Helvetica,sans-serif;">
<div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #EADFCB;border-radius:16px;padding:24px;">
<h2 style="margin:0 0 16px;font-size:20px;">New contributor application</h2>
<table role="presentation" cellspacing="0" cellpadding="0" border="0" style="width:100%;border-collapse:collapse;">
${row("Name", d.name)}
${row("Email", d.email)}
${row("Phone", d.phone)}
${row("Location", d.location)}
${row("Year", d.year)}
${row("Where", d.institution)}
${row("Books", d.books.join(", "))}
${row("Other books", d.booksOther)}
${row("AI account", d.aiAccount)}
${row("Tech comfort", d.techComfort)}
${row("Hours / week", d.hoursPerWeek)}
${row("Commitment", d.commitment)}
${row("Can start", d.startWhen)}
${row("Heard via", d.heardAbout)}
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
