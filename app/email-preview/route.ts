import { buildConfirmationEmail } from "../waitlist-email";

export function GET() {
  return new Response(buildConfirmationEmail(), {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
