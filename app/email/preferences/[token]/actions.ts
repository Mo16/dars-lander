"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

// Preference writes go through email_prefs_write, a security-definer RPC that
// can only ever touch the single row the token belongs to. We hold the
// service-role key here, but the RPC is still the write path — the page has no
// business being able to address any other contact's row, and this makes that
// structural rather than a promise.
function admin() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase is not configured");
  return createClient(url, key, { auth: { persistSession: false } });
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export type SaveResult = { ok: boolean; message: string };

export async function savePreferences(
  token: string,
  prefs: {
    marketing: boolean;
    product_updates: boolean;
    weekly_report: boolean;
    streak_nudges: boolean;
  },
): Promise<SaveResult> {
  if (!UUID.test(token)) return { ok: false, message: "This link isn't valid." };

  const { data, error } = await admin().rpc("email_prefs_write", {
    p_token: token,
    p_marketing: prefs.marketing,
    p_product_updates: prefs.product_updates,
    p_weekly_report: prefs.weekly_report,
    p_streak_nudges: prefs.streak_nudges,
    p_unsubscribe_all: false,
  });

  if (error) {
    console.error("email_prefs_write failed", error);
    return { ok: false, message: "Something went wrong. Please try again." };
  }
  if (data !== true) return { ok: false, message: "This link has expired." };

  revalidatePath(`/email/preferences/${token}`);
  return { ok: true, message: "Saved." };
}

export async function unsubscribeAll(token: string): Promise<SaveResult> {
  if (!UUID.test(token)) return { ok: false, message: "This link isn't valid." };

  const { data, error } = await admin().rpc("email_prefs_write", {
    p_token: token,
    p_marketing: false,
    p_product_updates: false,
    p_weekly_report: false,
    p_streak_nudges: false,
    p_unsubscribe_all: true,
  });

  if (error) {
    console.error("email_prefs_write (unsubscribe all) failed", error);
    return { ok: false, message: "Something went wrong. Please try again." };
  }
  if (data !== true) return { ok: false, message: "This link has expired." };

  revalidatePath(`/email/preferences/${token}`);
  return { ok: true, message: "You've been unsubscribed." };
}

export async function resubscribe(token: string): Promise<SaveResult> {
  if (!UUID.test(token)) return { ok: false, message: "This link isn't valid." };

  const { data, error } = await admin().rpc("email_prefs_write", {
    p_token: token,
    p_marketing: true,
    p_product_updates: true,
    p_weekly_report: true,
    p_streak_nudges: true,
    p_unsubscribe_all: false,
  });

  if (error) {
    console.error("email_prefs_write (resubscribe) failed", error);
    return { ok: false, message: "Something went wrong. Please try again." };
  }
  if (data !== true) return { ok: false, message: "This link has expired." };

  revalidatePath(`/email/preferences/${token}`);
  return { ok: true, message: "You're back on the list." };
}
