// Twin of dars-admin/app/auth/callback/route.ts — keep the two in sync.

import { createServerSupabase } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { safeRedirectPath } from "@/lib/safe-redirect";

// OAuth and magic-link both land here with a ?code to exchange for a session.
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // `next` is caller-supplied (round-tripped through the OAuth/magic-link
  // provider) and gets concatenated onto `origin` below — validate it to a
  // bare same-origin path so it can never become an open redirect.
  const next = safeRedirectPath(searchParams.get("next"));

  if (code) {
    const supabase = await createServerSupabase();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(`${origin}${next}`);
  }
  return NextResponse.redirect(`${origin}/sign-in?error=auth`);
}
