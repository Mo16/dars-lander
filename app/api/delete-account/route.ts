// Forwards the caller's Clerk JWT to the Supabase `account-delete`
// edge function. We proxy rather than calling the function directly
// from the browser because the function doesn't emit CORS headers
// and we don't want darsapp.com origins baked into its config.
//
// The browser is expected to pass the Clerk session token in the
// Authorization header. The edge function verifies it against the
// shared Clerk issuer and performs the cascading wipe.

export const runtime = "nodejs";

const FUNCTIONS_URL = process.env.SUPABASE_FUNCTIONS_URL ?? "";

export async function POST(req: Request) {
  if (!FUNCTIONS_URL) {
    return Response.json(
      { ok: false, error: "Server not configured." },
      { status: 500 },
    );
  }

  const auth = req.headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) {
    return Response.json(
      { ok: false, error: "Not signed in." },
      { status: 401 },
    );
  }

  let body: { confirm?: unknown } = {};
  try { body = await req.json(); } catch { /* allow empty body */ }
  if (body.confirm !== "DELETE") {
    return Response.json(
      { ok: false, error: "Confirmation required." },
      { status: 400 },
    );
  }

  let upstream: Response;
  try {
    upstream = await fetch(`${FUNCTIONS_URL.replace(/\/+$/, "")}/account-delete`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: auth,
      },
      body: JSON.stringify({ confirm: "DELETE" }),
    });
  } catch (e) {
    return Response.json(
      { ok: false, error: "Could not reach deletion service." },
      { status: 502 },
    );
  }

  const text = await upstream.text();
  let parsed: Record<string, unknown> | null = null;
  try { parsed = text ? JSON.parse(text) : null; } catch { /* leave null */ }

  if (!upstream.ok) {
    const reason =
      (parsed?.error as string | undefined) ||
      text ||
      `Deletion failed (${upstream.status}).`;
    return Response.json({ ok: false, error: reason }, { status: upstream.status });
  }

  return Response.json({ ok: true, ...(parsed ?? {}) });
}
