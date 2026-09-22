// Single source of truth for the email preview types.
//
// Both preview routes and the /email-preview/view toolbar read this map, so a
// new email only has to be registered once. (They previously kept two separate
// copies, which is how an email ends up previewable at one URL and 404 at the
// other.)
import { buildConfirmationEmail } from "../waitlist-email";
import { buildContributorEmail } from "../contributor-email";
import { buildMilestoneEmail } from "../milestone-email";
import { buildBetaTesterEmail } from "../beta-tester-email";
import { buildBetaRoundTwoEmail } from "../beta-round-two-email";
import { buildBetaAcceptedIosEmail } from "../beta-accepted-ios-email";
import { buildBetaAcceptedAndroidEmail } from "../beta-accepted-android-email";
import { buildHotfixEmail } from "../hotfix-email";
import { buildWeOweYouUpdateEmail } from "../we-owe-you-update-email";
import { buildSuggestABookEmail } from "../suggest-a-book-email";

export const BUILDERS: Record<string, () => string> = {
  waitlist: buildConfirmationEmail,
  contributor: buildContributorEmail,
  milestone: buildMilestoneEmail,
  beta: buildBetaTesterEmail,
  "beta-2": buildBetaRoundTwoEmail,
  "beta-accepted-ios": buildBetaAcceptedIosEmail,
  "beta-accepted-android": buildBetaAcceptedAndroidEmail,
  hotfix: buildHotfixEmail,
  update: buildWeOweYouUpdateEmail,
  "suggest-a-book": buildSuggestABookEmail,
};

// Display names for the picker, keyed the same way.
export const LABELS: Record<string, string> = {
  waitlist: "Waitlist confirmation",
  contributor: "Contributor thank-you",
  milestone: "Milestone",
  beta: "Beta round one",
  "beta-2": "Beta round two",
  "beta-accepted-ios": "Beta accepted, iOS",
  "beta-accepted-android": "Beta accepted, Android",
  hotfix: "Hotfix",
  update: "We owe you an update",
  "suggest-a-book": "Suggest a book",
};

export const PREVIEW_TYPES = Object.keys(BUILDERS);
