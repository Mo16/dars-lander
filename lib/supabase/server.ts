// Twin of dars-admin/lib/supabase/server.ts — keep the two in sync.

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Anon-key client bound to the request's cookies — this is how we learn WHO is
// calling. All data access still goes through supabaseAdmin (service role),
// because admins legitimately read every user's rows.
export async function createServerSupabase() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (list) => {
          try {
            list.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
          } catch {
            // Called from a Server Component — the middleware refreshes instead.
          }
        },
      },
    },
  );
}
