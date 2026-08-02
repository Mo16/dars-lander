// Twin of dars-admin/lib/safe-redirect.ts — keep the two in sync.

/**
 * Validates a post-sign-in redirect target so it can only ever resolve to a
 * same-origin path. Shared by /sign-in (which reads ?redirect_url set by the
 * auth-gate middleware) and /auth/callback (which reads ?next after the
 * Google / magic-link round trip) — both take an attacker-influenced query
 * string and must never turn it into an off-site redirect.
 *
 * Accepts ONLY a bare same-origin path: it must start with exactly one "/",
 * must not start with "//" (protocol-relative), and must not carry a scheme
 * (e.g. "https:", "javascript:") before the first "/". Anything else — an
 * absolute URL, a protocol-relative URL, a bare hostname — falls back to "/".
 */
export function safeRedirectPath(raw: string | null | undefined): string {
  if (!raw) return "/";

  // Reject anything that isn't a bare path up front, before any URL
  // parsing: must start with a single "/" and never "//" (protocol-relative,
  // e.g. "//evil.com" — the browser treats that as same-scheme, other-host).
  if (!raw.startsWith("/") || raw.startsWith("//")) return "/";

  // A scheme (e.g. "https:", "javascript:") appearing before the first "/"
  // would make the value absolute; reject it directly rather than trusting
  // a parser downstream to strip it safely.
  if (/^\/[^/]*:/.test(raw)) return "/";

  try {
    // Resolve against a throwaway base so relative segments are normalised,
    // then re-validate the resulting path against the same rules. This
    // catches anything the string check above missed — e.g. a backslash,
    // which some URL parsers treat as a path separator and can smuggle in a
    // different host even though the raw string started with "/".
    const url = new URL(raw, "http://same-origin.invalid");
    const path = `${url.pathname}${url.search}${url.hash}`;
    if (url.hostname !== "same-origin.invalid" || !path.startsWith("/") || path.startsWith("//")) {
      return "/";
    }
    return path;
  } catch {
    return "/";
  }
}
