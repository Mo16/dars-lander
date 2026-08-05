import { buildConfirmationEmail } from "../../waitlist-email";
import { buildContributorEmail } from "../../contributor-email";
import { buildMilestoneEmail } from "../../milestone-email";
import { buildBetaTesterEmail } from "../../beta-tester-email";
import { buildBetaRoundTwoEmail } from "../../beta-round-two-email";
import { buildBetaAcceptedIosEmail } from "../../beta-accepted-ios-email";
import { buildBetaAcceptedAndroidEmail } from "../../beta-accepted-android-email";
import { buildHotfixEmail } from "../../hotfix-email";
import { buildWeOweYouUpdateEmail } from "../../we-owe-you-update-email";

const BUILDERS: Record<string, () => string> = {
  waitlist: buildConfirmationEmail,
  contributor: buildContributorEmail,
  milestone: buildMilestoneEmail,
  beta: buildBetaTesterEmail,
  "beta-2": buildBetaRoundTwoEmail,
  "beta-accepted-ios": buildBetaAcceptedIosEmail,
  "beta-accepted-android": buildBetaAcceptedAndroidEmail,
  hotfix: buildHotfixEmail,
  update: buildWeOweYouUpdateEmail,
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
