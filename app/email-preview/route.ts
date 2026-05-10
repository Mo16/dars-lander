import { buildConfirmationEmail } from "../waitlist-email";
import { buildContributorEmail } from "../contributor-email";
import { buildMilestoneEmail } from "../milestone-email";
import { buildAlphaTesterEmail } from "../alpha-tester-email";

const BUILDERS: Record<string, () => string> = {
  waitlist: buildConfirmationEmail,
  contributor: buildContributorEmail,
  milestone: buildMilestoneEmail,
  alpha: buildAlphaTesterEmail,
};

export function GET(req: Request) {
  const which = new URL(req.url).searchParams.get("type") ?? "waitlist";
  const builder = BUILDERS[which] ?? buildConfirmationEmail;
  return new Response(builder(), {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
