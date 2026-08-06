// HTML "round two" beta-access email - the second intake, sent to the whole
// list (never-applied, applied-and-not-picked, and current testers alike).
//
// The ask leads: we're letting a new group of students in over the next few
// days, so apply now. The CTA sits directly under a five-line intro. Below it,
// live lesson capture is the single reason-to-care, shown as a real bilingual
// transcript. Round one's bug fixes are referred to in passing only, on purpose.
//
// Palette, type (Figtree + Georgia), table layout and dark-mode lockout all
// match the rest of the Dars email family. See beta-tester-email.ts (round one)
// and we-owe-you-update-email.ts.
export function buildBetaRoundTwoEmail() {
  const coral = "#EC6144";
  const coralSoft = "#FFE3D6";
  const coralDeep = "#C94A2E";
  const cream = "#FFF7EC";
  const card = "#FFFDF8";
  const border = "#EADFCB";
  const ink = "#1A1814";
  const inkSoft = "#3B372F";
  const inkMuted = "#6E6A5F";
  const serif = "Georgia, 'Times New Roman', serif";
  const sans =
    "'Figtree', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";
  const arabic =
    "'Amiri', 'Geeza Pro', 'Scheherazade New', 'Times New Roman', serif";

  const base = "https://darsapp.com/assets/img";
  const ctaUrl = "https://darsapp.com/beta-access";

  // The driver of this email. Swap in a figure ("We&#39;re letting 40 more
  // students in over the next few days.") whenever you want to name one.
  const timingLine =
    "We&#39;re letting the next group of students in over the next few days.";

  // one transcript line: quiet label, source in its own script (rtl), English
  // tucked close beneath it. Bare on the card, no phone frame and no rule:
  // proximity groups the source with its translation, spacing separates the
  // segments. (Design law: no hairline used as ornament.)
  const line = (lang: string, src: string, size: number, en: string, gap = 30) => `
    <div style="margin:0 0 ${gap}px;">
      <p class="dm-text-ink-muted" style="margin:0 0 7px; font-family:${sans}; font-size:12px; font-weight:500; color:${inkMuted};">${lang}</p>
      <div dir="rtl" class="dm-text-ink" style="font-family:${arabic}; font-size:${size}px; line-height:1.85; color:${ink}; direction:rtl; text-align:right;">${src}</div>
      <p class="dm-text-ink-soft" style="margin:5px 0 0; font-family:${sans}; font-size:13.5px; line-height:1.6; color:${inkSoft};">${en}</p>
    </div>
  `;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="only light">
<meta name="supported-color-schemes" content="only light">
<title>We&#39;re letting more students into the beta</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Figtree:wght@300;400;500;600;700&display=swap');
  :root {
    color-scheme: only light;
    supported-color-schemes: only light;
  }
  @media (prefers-color-scheme: dark) {
    .dm-bg-cream      { background-color: ${cream} !important; }
    .dm-bg-coral-soft { background-color: ${coralSoft} !important; }
    .dm-bg-coral      { background-color: ${coral} !important; }
    .dm-bg-coral-deep { background-color: ${coralDeep} !important; }
    .dm-bg-card       { background-color: ${card} !important; }
    .dm-border        { border-color: ${border} !important; }
    .dm-text-ink      { color: ${ink} !important; }
    .dm-text-ink-soft { color: ${inkSoft} !important; }
    .dm-text-ink-muted{ color: ${inkMuted} !important; }
    .dm-text-coral    { color: ${coral} !important; }
    .dm-text-white    { color: #ffffff !important; }
  }
  [data-ogsc] .dm-bg-cream      { background-color: ${cream} !important; }
  [data-ogsc] .dm-bg-coral-soft { background-color: ${coralSoft} !important; }
  [data-ogsc] .dm-bg-coral      { background-color: ${coral} !important; }
  [data-ogsc] .dm-bg-coral-deep { background-color: ${coralDeep} !important; }
  [data-ogsc] .dm-bg-card       { background-color: ${card} !important; }
  [data-ogsc] .dm-border        { border-color: ${border} !important; }
  [data-ogsc] .dm-text-ink      { color: ${ink} !important; }
  [data-ogsc] .dm-text-ink-soft { color: ${inkSoft} !important; }
  [data-ogsc] .dm-text-ink-muted{ color: ${inkMuted} !important; }
  [data-ogsc] .dm-text-coral    { color: ${coral} !important; }
  [data-ogsc] .dm-text-white    { color: #ffffff !important; }
  a { color: ${coral}; text-decoration: none; }
  a:hover { text-decoration: underline; }
</style>
</head>
<body class="dm-bg-cream dm-text-ink" style="margin:0; padding:0; background:${cream}; font-family:${sans}; color:${ink}; -webkit-font-smoothing:antialiased;">

<div style="display:none; overflow:hidden; line-height:1px; opacity:0; max-height:0; max-width:0;">
  Round two of the Dars beta is open. ${timingLine} Apply now.
</div>

<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" class="dm-bg-cream" style="background:${cream}; padding:40px 16px;">
  <tr>
    <td align="center">
      <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="max-width:600px; width:100%;">

        <!-- brand -->
        <tr>
          <td style="padding: 0 4px 28px;">
            <img src="${base}/logo.png" width="30" height="30" alt="Dars" style="display:inline-block; width:30px; height:30px; border-radius:8px; vertical-align:middle; border:0; outline:none; text-decoration:none;" />
            <span class="dm-text-ink" style="vertical-align:middle; margin-left:10px; font-family:${sans}; font-size:18px; font-weight:600; letter-spacing:-0.01em; color:${ink};">Dars</span>
          </td>
        </tr>

        <!-- intro -->
        <tr>
          <td style="padding:0 4px 8px;">
            <p class="dm-text-ink-soft" style="margin:0 0 16px; font-family:${sans}; font-size:15px; line-height:1.7; color:${inkSoft};">
              Assalamu alaykum.
            </p>
            <p class="dm-text-ink-soft" style="margin:0 0 22px; font-family:${sans}; font-size:15px; line-height:1.7; color:${inkSoft};">
              The first group of beta testers has been in the app for a while now. They put it through its paces, we&#39;ve spent the time since fixing what they found, and Dars is in far better shape for it.
            </p>
            <p class="dm-text-coral" style="margin:0 0 22px; font-family:${serif}; font-style:italic; font-size:20px; line-height:1.3; color:${coral};">
              So we&#39;re ready for more of you.
            </p>
            <p class="dm-text-ink" style="margin:0 0 16px; font-family:${sans}; font-size:17px; line-height:1.6; font-weight:600; color:${ink}; letter-spacing:-0.01em;">
              ${timingLine}
            </p>
            <p class="dm-text-ink-soft" style="margin:0 0 24px; font-family:${sans}; font-size:15px; line-height:1.7; color:${inkSoft};">
              If you want to be one of them, get your application in now.
            </p>
          </td>
        </tr>

        <!-- CTA card -->
        <tr>
          <td class="dm-bg-coral" style="background:${coral}; border-radius:20px; padding:34px 32px; text-align:center;">
            <p class="dm-text-white" style="margin:0 0 8px; font-family:${sans}; font-size:11.5px; letter-spacing:0.14em; text-transform:uppercase; color:#ffffff; font-weight:700;">&#8627; Round two</p>
            <p class="dm-text-white" style="margin:0 0 22px; font-family:${sans}; font-size:22px; line-height:1.3; font-weight:500; letter-spacing:-0.01em; color:#ffffff;">
              Apply for <span style="font-family:${serif}; font-style:italic; font-weight:400;">beta access.</span>
            </p>
            <a href="${ctaUrl}" class="dm-bg-card dm-text-coral" style="display:inline-block; text-decoration:none; background:${card}; color:${coral}; padding:14px 30px; border-radius:999px; font-family:${sans}; font-size:15px; font-weight:600;">
              <span class="dm-text-coral" style="color:${coral};">Start the application &rarr;</span>
            </a>
            <p class="dm-text-white" style="margin:18px 0 0; font-family:${sans}; font-size:14px; line-height:1.5; color:#ffffff; font-weight:500;">
              Takes about two minutes.
            </p>
          </td>
        </tr>

        <tr><td style="height:34px; line-height:34px; font-size:0;">&nbsp;</td></tr>

        <!-- the main event: what round two actually gets you -->
        <tr>
          <td style="padding:0 4px 16px;">
            <p class="dm-text-ink" style="margin:0 0 14px; font-family:${sans}; font-size:26px; line-height:1.25; font-weight:600; color:${ink}; letter-spacing:-0.02em;">
              And this round, you can <span style="font-family:${serif}; font-style:italic; font-weight:400;">record the dars.</span>
            </p>
            <p class="dm-text-ink-soft" style="margin:0 0 14px; font-family:${sans}; font-size:15.5px; line-height:1.7; color:${inkSoft};">
              Put your phone down at the start of the lesson and leave it. Dars writes the transcript as your ustadh speaks, translates the Arabic and the Urdu underneath it, and hands you a summary, revision cards and questions by the time you stand up.
            </p>
            <p class="dm-text-ink-soft" style="margin:0; font-family:${sans}; font-size:15.5px; line-height:1.7; color:${inkSoft};">
              No more choosing between following the lesson and writing it down. This is the thing we most want tested, on real books, in real lessons.
            </p>
          </td>
        </tr>

        <!-- transcript artifact -->
        <tr>
          <td class="dm-bg-card dm-border" style="background:${card}; border:1px solid ${border}; border-radius:20px; padding:26px 24px;">
            ${line(
              "Arabic, Qur&#39;an 5:6",
              "فَاغْسِلُوا وُجُوهَكُمْ وَأَيْدِيَكُمْ إِلَى الْمَرَافِقِ",
              21,
              "&hellip;wash your faces, and your hands up to the elbows.",
            )}
            ${line(
              "Urdu, the ustadh",
              "اس آیت سے فقہاء نے وضو کے فرائض ثابت کیے ہیں۔",
              19,
              "From this ayah the fuqaha established the obligations of wudu.",
              0,
            )}
          </td>
        </tr>

        <tr><td style="height:20px; line-height:20px; font-size:0;">&nbsp;</td></tr>

        <!-- the catch: recording is gated and costs us money to run -->
        <tr>
          <td style="padding:0 4px;">
            <p class="dm-text-ink-soft" style="margin:0; font-family:${sans}; font-size:15px; line-height:1.7; color:${inkSoft};">
              One catch: recording isn&#39;t on by default. Every lesson we transcribe and translate costs us real money to run, so there are only so many spaces for it. If you want to test it, <strong class="dm-text-ink" style="color:${ink}; font-weight:600;">open the Lessons tab in the app and request access</strong>, and we&#39;ll switch it on for as many of you as we can carry.
            </p>
          </td>
        </tr>

        <tr><td style="height:32px; line-height:32px; font-size:0;">&nbsp;</td></tr>

        <!-- two housekeeping notes -->
        <tr>
          <td style="padding:0 4px;">
            <p class="dm-text-ink-soft" style="margin:0 0 16px; font-family:${sans}; font-size:15px; line-height:1.7; color:${inkSoft};">
              <strong class="dm-text-ink" style="color:${ink}; font-weight:600;">If you applied last time and never heard back:</strong> you&#39;re still in the pile, and this round is bigger. Apply again anyway. It tells us you&#39;re still interested.
            </p>
            <p class="dm-text-ink-soft" style="margin:0 0 22px; font-family:${sans}; font-size:15px; line-height:1.7; color:${inkSoft};">
              <strong class="dm-text-ink" style="color:${ink}; font-weight:600;">If you&#39;re already testing:</strong> you&#39;ll need to sign up again. We&#39;ve switched sign-in providers, so your old login won&#39;t get you back in. Open the app, create your account again, and carry on.
            </p>
            <p class="dm-text-ink-soft" style="margin:0 0 20px; font-family:${sans}; font-size:15px; line-height:1.7; color:${inkSoft};">
              The beta still won&#39;t be perfect. That is more or less the definition of a beta, and it&#39;s why we want <strong class="dm-text-ink" style="color:${ink}; font-weight:600;">real Alimiyyah students</strong> in it: the people who&#39;d notice when something&#39;s off, and say so.
            </p>
            <p style="margin:0; font-family:${sans}; font-size:15px; line-height:1.7;">
              <a href="${ctaUrl}" class="dm-text-coral" style="color:${coral}; font-weight:600; text-decoration:none;">Apply for beta access &rarr;</a>
            </p>
          </td>
        </tr>

        <tr><td style="height:32px; line-height:32px; font-size:0;">&nbsp;</td></tr>

        <!-- divider -->
        <tr>
          <td style="padding:0 4px;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
              <tr>
                <td class="dm-border" style="border-top:1px solid ${border}; height:1px; line-height:1px; font-size:0;">&nbsp;</td>
              </tr>
            </table>
          </td>
        </tr>

        <tr><td style="height:32px; line-height:32px; font-size:0;">&nbsp;</td></tr>

        <!-- support body -->
        <tr>
          <td style="padding:0 4px 18px;">
            <p class="dm-text-ink-muted" style="margin:0; font-family:${sans}; font-size:13.5px; line-height:1.65; color:${inkMuted};">
              Buttons below if you ever fancy sharing Dars or contributing toward the build: AI credits, hosting, the things that keep it being built. There if you want them, ignorable if you don&#39;t.
            </p>
          </td>
        </tr>

        <!-- support pills -->
        <tr>
          <td style="padding:0 4px;">
            <table role="presentation" cellspacing="0" cellpadding="0" border="0">
              <tr>
                <td style="padding:0 10px 10px 0;">
                  <a href="https://buymeacoffee.com/daviral" class="dm-bg-coral dm-text-white" style="display:inline-block; text-decoration:none; background:${coral}; color:#ffffff; padding:12px 20px 12px 16px; border-radius:999px; font-family:${sans}; font-size:14.5px; font-weight:500;">
                    <img src="https://cdn.simpleicons.org/buymeacoffee/FFFFFF" width="16" height="16" alt="" style="vertical-align:-3px; margin-right:9px; border:0;" />
                    <span class="dm-text-white" style="color:#ffffff; vertical-align:middle;">Buy me a coffee</span>
                  </a>
                </td>
                <td style="padding:0 10px 10px 0;">
                  <a href="https://paypal.me/mocho13" class="dm-bg-coral dm-text-white" style="display:inline-block; text-decoration:none; background:${coral}; color:#ffffff; padding:12px 20px 12px 16px; border-radius:999px; font-family:${sans}; font-size:14.5px; font-weight:500;">
                    <img src="https://cdn.simpleicons.org/paypal/FFFFFF" width="16" height="16" alt="" style="vertical-align:-3px; margin-right:9px; border:0;" />
                    <span class="dm-text-white" style="color:#ffffff; vertical-align:middle;">PayPal</span>
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr><td style="height:28px; line-height:28px; font-size:0;">&nbsp;</td></tr>

        <!-- send-off -->
        <tr>
          <td style="padding:0 4px;">
            <p class="dm-text-ink-soft" style="margin:0 0 8px; font-family:${sans}; font-size:15px; line-height:1.7; color:${inkSoft};">
              Whatever you go with, testing, sharing, chipping in, or just reading this far: jazakAllah khair. Genuinely. None of this works without you.
            </p>
            <p class="dm-text-ink-soft" style="margin:0; font-family:${serif}; font-style:italic; font-size:15px; line-height:1.7; color:${inkSoft};">
              In a while, Crocodile.
            </p>
          </td>
        </tr>

        <tr><td style="height:28px; line-height:28px; font-size:0;">&nbsp;</td></tr>

        <!-- signature -->
        <tr>
          <td style="padding:0 4px;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
              <tr>
                <td valign="top">
                  <p class="dm-text-ink" style="margin:0 0 2px; font-family:${sans}; font-size:14.5px; line-height:1.6; color:${ink}; font-weight:500;">
                    The Dars Team
                  </p>
                  <p class="dm-text-coral" style="margin:0; font-family:${serif}; font-style:italic; font-size:14px; line-height:1.6; color:${coral};">
                    <a href="https://darsapp.com" class="dm-text-coral" style="color:${coral};">darsapp.com</a>
                  </p>
                </td>
                <td valign="bottom" align="right" style="padding-bottom:4px;">
                  <a href="https://instagram.com/getdars" style="display:inline-block; text-decoration:none; margin-left:16px;">
                    <img src="https://cdn.simpleicons.org/instagram/EC6144" width="20" height="20" alt="Instagram" style="display:block; border:0;" />
                  </a>
                  <a href="https://tiktok.com/@dars.app" style="display:inline-block; text-decoration:none; margin-left:16px;">
                    <img src="https://cdn.simpleicons.org/tiktok/EC6144" width="20" height="20" alt="TikTok" style="display:block; border:0;" />
                  </a>
                </td>
              </tr>
            </table>

            <div style="height:28px; line-height:28px; font-size:0;">&nbsp;</div>

            <p class="dm-text-ink-muted" style="margin:0; font-family:${sans}; font-size:12px; line-height:1.55; color:${inkMuted};">
              You&#39;re getting this because you joined the Dars waitlist.<br>
              If this wasn&#39;t you, you can safely ignore this email.
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
