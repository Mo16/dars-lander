import { buildMilestoneEmail } from "../milestone-email";

export function GET() {
  return new Response(buildMilestoneEmail(), {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
