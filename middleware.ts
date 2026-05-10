// Clerk middleware. Only runs on /delete-account and its API so the
// rest of the landing site stays a plain static marketing surface
// without auth overhead. Every route handled here is public — we use
// Clerk's client hooks for the sign-in flow itself.

import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: ["/delete-account(.*)", "/api/delete-account(.*)"],
};
