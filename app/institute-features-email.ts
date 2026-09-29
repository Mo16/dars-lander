import { supportBlock } from "../lib/email/render.ts";

/**
 * "Tell us what you think." — the open ask for feedback from everyone on the
 * institute waitlist.
 *
 * THE ASK IS OPEN, AND THAT IS DELIBERATE. Two earlier versions of this email
 * put a device in front of the question: a register with one row left blank,
 * then a wall of twenty-four candidates to choose three from. Both were
 * rejected for the same reason, and it is a good reason. A menu tells the
 * reader what we already think, and whatever they had in mind that is not on
 * the list gets quietly filed as "other". The whole point of writing to these
 * people is to hear the thing we have not thought of.
 *
 * So there is no list, no ranking, no conceit to solve. The email asks for
 * feedback in plain words and gets out of the way. Features are named as one
 * of the things we want to hear about rather than as the whole question,
 * because a madrasah on a waitlist has thoughts about whether this fits their
 * classes at all, and that is worth more than a wishlist.
 *
 * WHAT CARRIES IT, THEN. The type. The question is set large and owns the top
 * of the sheet, with the accent clause in the italic serif, and everything
 * under it is three short lines and one button. This is the shortest email in
 * the Dars set on purpose: an open question loses its force the moment it is
 * surrounded by scaffolding, and a reader who has to work out what is being
 * asked will not reply.
 *
 * Tables and inline styles only, and the palette is locked light with dm-*
 * anchors on every coloured element. Same constraints as every other Dars
 * email; see lib/email/render.ts for why.
 */

export type InstituteFeaturesEmailOptions = {
  /** The one-click unsubscribe. The sender passes `{{unsubscribe_url}}`. */
  unsubscribeUrl?: string;
  /** The preference centre. The sender passes `{{preferences_url}}`. */
  preferencesUrl?: string;
  /**
   * Where the button goes when a client will not let the recipient hit reply
   * (a webmail preview, a forwarded copy). Keep this the same address as the
   * template's Reply-To, or the button and the reply button land in two
   * different inboxes and half the replies go missing.
   */
  replyTo?: string;
};

export function buildInstituteFeaturesEmail(options: InstituteFeaturesEmailOptions = {}) {
  const replyTo = options.replyTo ?? "hello@darsapp.com";
  // The subject the REPLY carries, not the subject of this email. It is
  // written as the sender's own words so a reply lands in the inbox already
  // saying what it is.
  const replySubject = "Feedback on Dars for institutes";
  const mailto = `mailto:${replyTo}?subject=${encodeURIComponent(replySubject)}`;
  const unsubscribeUrl = options.unsubscribeUrl ?? "https://darsapp.com/email/preferences";
  const preferencesUrl = options.preferencesUrl ?? "https://darsapp.com/email/preferences";

  /*
   * ONE accent value, for the emphasised clause and the button fill.
   * coral-500 (#EC6144) is 2.71:1 on this card, so it fails even the 3:1 bar
   * large display type is allowed, and white on it is 3.30:1. This deepened
   * coral clears AA everywhere it is used: 5.25:1 on the card, 6.03:1 on
   * cream, 6.41:1 under white.
   */
  const coral = "#A93824";
  const cream = "#FFF7EC";
  const card = "#FFFDF8";
  const border = "#EADFCB";
  const ink = "#1A1814";
  const inkSoft = "#3B372F";
  const inkMuted = "#6E6A5F";

  const serif = "Georgia, 'Times New Roman', serif";
  const sans =
    "'Figtree', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";

  const darkVars = [
    [".dm-bg-cream", `background-color: ${cream} !important;`],
    [".dm-bg-card", `background-color: ${card} !important;`],
    [".dm-bg-coral-deep", `background-color: ${coral} !important;`],
    [".dm-border", `border-color: ${border} !important;`],
    [".dm-text-ink", `color: ${ink} !important;`],
    [".dm-text-ink-soft", `color: ${inkSoft} !important;`],
    [".dm-text-ink-muted", `color: ${inkMuted} !important;`],
    [".dm-text-coral", `color: ${coral} !important;`],
    [".dm-text-white", `color: #ffffff !important;`],
  ] as Array<[string, string]>;

  const media = darkVars.map(([sel, r]) => `    ${sel} { ${r} }`).join("\n");
  const ogsc = darkVars.map(([sel, r]) => `  [data-ogsc] ${sel} { ${r} }`).join("\n");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="only light">
<meta name="supported-color-schemes" content="only light">
<title>Tell us what you think of Dars for institutes</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Figtree:wght@300;400;500;600;700&display=swap');
  :root {
    color-scheme: only light;
    supported-color-schemes: only light;
  }
  /* Force the light palette even when the client is in dark mode, so the
     sheet stays paper and the question stays ink on it. */
  @media (prefers-color-scheme: dark) {
${media}
  }
  /* Outlook.com, which uses an attribute rather than the media query. */
${ogsc}
</style>
</head>
<body class="dm-bg-cream dm-text-ink" style="margin:0; padding:0; background:${cream}; font-family:${sans}; color:${ink}; -webkit-font-smoothing:antialiased;">

<div style="display:none; overflow:hidden; line-height:1px; opacity:0; max-height:0; max-width:0;">
  What you make of it, what you would want it to do. A line is enough.
</div>

<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" class="dm-bg-cream" style="background:${cream}; padding:40px 16px;">
  <tr>
    <td align="center">
      <table role="presentation" width="560" cellspacing="0" cellpadding="0" border="0" style="max-width:560px; width:100%;">

        <!-- brand -->
        <tr>
          <td style="padding: 0 4px 28px;">
            <img src="https://darsapp.com/assets/img/logo.png" width="30" height="30" alt="Dars" style="display:inline-block; width:30px; height:30px; border-radius:8px; vertical-align:middle; border:0; outline:none; text-decoration:none;" />
            <span class="dm-text-ink" style="vertical-align:middle; margin-left:10px; font-family:${sans}; font-size:18px; font-weight:600; letter-spacing:-0.01em; color:${ink};">Dars</span>
          </td>
        </tr>

        <!-- the sheet: the question, and nothing in front of it -->
        <tr>
          <td class="dm-bg-card dm-border" style="background:${card}; border:1px solid ${border}; border-radius:24px; padding:44px 34px 40px;">

            <h1 class="dm-text-ink" style="margin:0 0 20px; font-family:${sans}; font-size:40px; line-height:1.06; font-weight:500; letter-spacing:-0.02em; color:${ink};">
              Tell us what you <span class="dm-text-coral" style="font-family:${serif}; font-style:italic; color:${coral}; font-weight:400;">think.</span>
            </h1>

            <p class="dm-text-ink-soft" style="margin:0 0 16px; font-family:${sans}; font-size:15.5px; line-height:1.65; color:${inkSoft};">
              Your madrasah is on the institute waitlist, so you get first say on what Dars becomes. Hit reply and tell us what you make of it so far, the features you would want to see, and what would stop you using it in your classes.
            </p>

            <p class="dm-text-ink-soft" style="margin:0 0 30px; font-family:${sans}; font-size:15.5px; line-height:1.65; color:${inkSoft};">
              There is no form and no survey, and nothing you say is too small or too blunt. Your own words, in a reply, are exactly what we need.
            </p>

            <table role="presentation" cellspacing="0" cellpadding="0" border="0">
              <tr>
                <td class="dm-bg-coral-deep" bgcolor="${coral}" style="background:${coral}; border-radius:999px;">
                  <a href="${mailto}" class="dm-text-white" style="display:inline-block; padding:14px 28px; font-family:${sans}; font-size:15px; font-weight:600; line-height:20px; color:#ffffff; text-decoration:none; border-radius:999px;">Reply with your feedback</a>
                </td>
              </tr>
            </table>

            <p class="dm-text-ink-muted" style="margin:22px 0 0; font-family:${sans}; font-size:13.5px; line-height:1.6; color:${inkMuted};">
              One line is a complete answer. Every reply is read by the people building it.
            </p>

          </td>
        </tr>

        <tr><td style="height:28px; line-height:28px; font-size:0;">&nbsp;</td></tr>

        <!-- whatsapp group + donations (shared with every Dars email) -->
        ${supportBlock()}

        <tr><td style="height:28px; line-height:28px; font-size:0;">&nbsp;</td></tr>

        <!-- signature -->
        <tr>
          <td style="padding:0 4px;">
            <p class="dm-text-ink" style="margin:0 0 6px; font-family:${sans}; font-size:14.5px; line-height:1.6; color:${ink};">
              Barakallahu feekum,
            </p>
            <p class="dm-text-coral" style="margin:0 0 28px; font-family:${serif}; font-style:italic; font-size:15px; line-height:1.6; color:${coral};">
              The Dars team
            </p>
            <p class="dm-text-ink-muted" style="margin:0; font-family:${sans}; font-size:12px; line-height:1.6; color:${inkMuted};">
              You&#39;re receiving this because your madrasah joined the Dars institute waitlist.<br>
              <a href="${preferencesUrl}" class="dm-text-ink-muted" style="color:${inkMuted}; text-decoration:underline;">Choose what we email you</a>
              &nbsp;&middot;&nbsp;
              <a href="${unsubscribeUrl}" class="dm-text-ink-muted" style="color:${inkMuted}; text-decoration:underline;">Unsubscribe</a>
            </p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>

</body>
</html>`;
}
