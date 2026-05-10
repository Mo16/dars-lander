import { buildConfirmationEmail } from "../../waitlist-email";
import { buildContributorEmail } from "../../contributor-email";
import { buildMilestoneEmail } from "../../milestone-email";
import { buildAlphaTesterEmail } from "../../alpha-tester-email";

const BUILDERS: Record<string, () => string> = {
  waitlist: buildConfirmationEmail,
  contributor: buildContributorEmail,
  milestone: buildMilestoneEmail,
  alpha: buildAlphaTesterEmail,
};

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ type: string }> },
) {
  const { type } = await params;
  const builder = BUILDERS[type];
  if (!builder) {
    return new Response("Unknown email type", { status: 404 });
  }
  return new Response(builder(), {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
