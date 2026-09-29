import type { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";
import EmailShell, { ExpiredLink } from "../../shell";
import UnsubscribeCard from "./unsubscribe-card";

export const dynamic = "force-dynamic";

// Never indexed: the URL carries the token that identifies the contact.
export const metadata: Metadata = {
  title: "Unsubscribe · Dars",
  robots: { index: false, follow: false },
};

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

type Row = { email: string; unsubscribed_all: boolean };

async function loadPrefs(token: string): Promise<Row | null> {
  if (!UUID.test(token)) return null;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;

  const supabase = createClient(url, key, { auth: { persistSession: false } });
  const { data, error } = await supabase.rpc("email_prefs_read", { p_token: token });
  if (error) {
    console.error("email_prefs_read failed", error);
    return null;
  }
  const row = Array.isArray(data) ? data[0] : data;
  return row ? { email: row.email, unsubscribed_all: row.unsubscribed_all } : null;
}

/**
 * The page the "Unsubscribe" link at the foot of every marketing email points
 * at. It is deliberately NOT the preference centre: a reader who pressed
 * Unsubscribe asked to be removed, not to be handed a settings form and left
 * to find the right switch.
 *
 * Loading this page changes nothing. Corporate mail gateways follow every URL
 * in a message before the recipient ever sees it, so the removal happens only
 * on the POST the button sends. One press, then a confirmation with an undo.
 */
export default async function UnsubscribePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const row = await loadPrefs(token);

  if (!row) {
    return (
      <EmailShell>
        <ExpiredLink />
      </EmailShell>
    );
  }

  return (
    <EmailShell>
      <UnsubscribeCard
        token={token}
        email={row.email}
        alreadyUnsubscribed={row.unsubscribed_all}
      />
    </EmailShell>
  );
}
