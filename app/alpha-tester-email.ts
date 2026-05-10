// HTML alpha-tester email — late-night "u up?" call to sign up for alpha.
// Reuses the cream + coral palette and dark-mode lockout from
// contributor-email.ts and adds a primary CTA button to /beta-access.
export function buildAlphaTesterEmail() {
  const coral = "#EC6144";
  const coralSoft = "#FFE3D6";
  const coralDeep = "#C94A2E";
  const cream = "#FFF7EC";
  const card = "#FFFDF8";
  const border = "#EADFCB";
  const ink = "#1A1814";
  const inkSoft = "#3B372F";
  const inkMuted = "#6E6A5F";
  const inkSubtle = "#9A9488";
  const serif = "Georgia, 'Times New Roman', serif";
  const sans =
    "'Figtree', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";

  const base = "https://darsapp.com/assets/img";
  const ctaUrl = "https://darsapp.com/beta-access";

  const bullet = (title: string, body: string) => `
    <tr>
      <td class="dm-bg-card dm-border" style="background:${card}; border:1px solid ${border}; border-radius:18px; padding:20px 22px;">
        <p class="dm-text-ink" style="margin:0 0 6px; font-family:${sans}; font-size:15px; line-height:1.4; font-weight:600; color:${ink}; letter-spacing:-0.005em;">${title}</p>
        <p class="dm-text-ink-soft" style="margin:0; font-family:${sans}; font-size:14.5px; line-height:1.6; color:${inkSoft};">${body}</p>
      </td>
    </tr>
    <tr><td style="height:10px; line-height:10px; font-size:0;">&nbsp;</td></tr>
  `;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="only light">
<meta name="supported-color-schemes" content="only light">
<title>u up?</title>
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
    .dm-text-ink-subtle{ color: ${inkSubtle} !important; }
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
  [data-ogsc] .dm-text-ink-subtle{ color: ${inkSubtle} !important; }
  [data-ogsc] .dm-text-coral    { color: ${coral} !important; }
  [data-ogsc] .dm-text-white    { color: #ffffff !important; }
  a { color: ${coral}; text-decoration: none; }
  a:hover { text-decoration: underline; }
</style>
</head>
<body class="dm-bg-cream dm-text-ink" style="margin:0; padding:0; background:${cream}; font-family:${sans}; color:${ink}; -webkit-font-smoothing:antialiased;">

<div style="display:none; overflow:hidden; line-height:1px; opacity:0; max-height:0; max-width:0;">
  We&#39;ve been working on Dars &mdash; hard. The very first alpha build is ready for testers.
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

        <!-- hero card -->
        <tr>
          <td class="dm-bg-coral-soft" style="background:${coralSoft}; border-radius:24px; padding:44px 36px;">
            <p class="dm-text-coral" style="margin:0 0 14px; font-family:${sans}; font-size:11px; letter-spacing:0.14em; text-transform:uppercase; color:${coral}; font-weight:600;">◆ Alpha testers wanted</p>
            <h1 class="dm-text-ink" style="margin:0 0 18px; font-family:${sans}; font-size:42px; line-height:1.05; font-weight:500; letter-spacing:-0.02em; color:${ink};">
              We&#39;ve been up. <span class="dm-text-coral" style="font-family:${serif}; font-style:italic; color:${coral}; font-weight:400;">For a while now.</span>
            </h1>
            <p class="dm-text-ink-soft" style="margin:0; font-family:${sans}; font-size:15px; line-height:1.65; color:${inkSoft};">
              Assalamu alaikum. We&#39;ve been heads-down on Dars for months &mdash; long days, longer nights, a lot of du&#39;a. The very first alpha build is finally ready for testers.
            </p>
          </td>
        </tr>

        <tr><td style="height:24px; line-height:24px; font-size:0;">&nbsp;</td></tr>

        <!-- intro -->
        <tr>
          <td style="padding:0 4px 8px;">
            <p class="dm-text-ink-soft" style="margin:0 0 16px; font-family:${sans}; font-size:15px; line-height:1.7; color:${inkSoft};">
              Genuinely &mdash; we&#39;ve been working <strong class="dm-text-ink" style="color:${ink}; font-weight:600;">hard</strong> on this. Building, breaking, rebuilding. Trying to make something that earns its place on your homescreen rather than another app you forget about by Wednesday.
            </p>
            <p class="dm-text-ink-soft" style="margin:0 0 16px; font-family:${sans}; font-size:15px; line-height:1.7; color:${inkSoft};">
              Fair warning though: this is <strong class="dm-text-ink" style="color:${ink}; font-weight:600;">alpha</strong>, not beta. Things will break. Buttons will do nothing. The AI tutor might confidently misattribute a hadith. Cards may save themselves to the void. The streak counter could decide you&#39;ve been studying for negative four days.
            </p>
            <p class="dm-text-ink" style="margin:0 0 22px; font-family:${sans}; font-size:15px; line-height:1.7; color:${ink}; font-weight:500;">
              That&#39;s exactly why we need testers.
            </p>
          </td>
        </tr>

        <!-- CTA card -->
        <tr>
          <td class="dm-bg-coral" style="background:${coral}; border-radius:20px; padding:34px 32px; text-align:center;">
            <p class="dm-text-white" style="margin:0 0 8px; font-family:${sans}; font-size:11px; letter-spacing:0.14em; text-transform:uppercase; color:#ffffff; font-weight:600; opacity:0.85;">↳ How to apply</p>
            <p class="dm-text-white" style="margin:0 0 22px; font-family:${sans}; font-size:22px; line-height:1.3; font-weight:500; letter-spacing:-0.01em; color:#ffffff;">
              Sign up for <span style="font-family:${serif}; font-style:italic; font-weight:400;">alpha access.</span>
            </p>
            <a href="${ctaUrl}" class="dm-bg-card dm-text-coral" style="display:inline-block; text-decoration:none; background:${card}; color:${coral}; padding:14px 30px; border-radius:999px; font-family:${sans}; font-size:15px; font-weight:600;">
              <span class="dm-text-coral" style="color:${coral};">Apply for alpha access &rarr;</span>
            </a>
            <p class="dm-text-white" style="margin:18px 0 0; font-family:${sans}; font-size:13.5px; line-height:1.55; color:#ffffff; opacity:0.85;">
              Spots are limited &mdash; we want to actually read everyone&#39;s feedback properly. First serious replies get in.
            </p>
          </td>
        </tr>

        <tr><td style="height:28px; line-height:28px; font-size:0;">&nbsp;</td></tr>

        <!-- what you'd be doing -->
        <tr>
          <td style="padding:0 4px 14px;">
            <p class="dm-text-ink-muted" style="margin:0 0 4px; font-family:${sans}; font-size:11px; font-weight:600; letter-spacing:0.14em; text-transform:uppercase; color:${inkMuted};">What you&#39;d actually be doing</p>
            <p class="dm-text-ink" style="margin:0; font-family:${sans}; font-size:18px; line-height:1.4; font-weight:600; color:${ink}; letter-spacing:-0.01em;">
              Honestly &mdash; just using it.
            </p>
          </td>
        </tr>

        <tr>
          <td>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
              ${bullet(
                "Use the app like you normally would.",
                "Revising, flicking through cards, trying the quizzes, poking the AI tutor.",
              )}
              ${bullet(
                "Tell us when something breaks.",
                "Looks weird, doesn&#39;t make sense, or just feels off &mdash; we want to hear about it.",
              )}
              ${bullet(
                "Be patient when it does break.",
                "Because it will. That&#39;s the whole point of an alpha.",
              )}
            </table>
          </td>
        </tr>

        <tr><td style="height:18px; line-height:18px; font-size:0;">&nbsp;</td></tr>

        <!-- what you get -->
        <tr>
          <td style="padding:0 4px 14px;">
            <p class="dm-text-ink-muted" style="margin:0 0 4px; font-family:${sans}; font-size:11px; font-weight:600; letter-spacing:0.14em; text-transform:uppercase; color:${inkMuted};">What you get out of it</p>
            <p class="dm-text-ink" style="margin:0; font-family:${sans}; font-size:18px; line-height:1.4; font-weight:600; color:${ink}; letter-spacing:-0.01em;">
              More than you&#39;d expect.
            </p>
          </td>
        </tr>

        <tr>
          <td>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
              ${bullet(
                "Genuine input on the app before launch.",
                "Stuff you flag now actually shapes what ships.",
              )}
              ${bullet(
                "First access, ahead of everyone else on the waitlist.",
                "You&#39;ll be in long before we open the doors properly.",
              )}
              ${bullet(
                "Our undying gratitude.",
                "And likely a thank-you that I&#39;ll work out properly closer to launch.",
              )}
            </table>
          </td>
        </tr>

        <tr><td style="height:14px; line-height:14px; font-size:0;">&nbsp;</td></tr>

        <!-- closing -->
        <tr>
          <td style="padding:0 4px;">
            <p class="dm-text-ink-soft" style="margin:0; font-family:${sans}; font-size:15px; line-height:1.7; color:${inkSoft};">
              You&#39;ll be asked three quick things on the form: what device you&#39;d test on, your year of study (or what you&#39;ve previously studied), and roughly how often you&#39;d be able to use it.
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

        <!-- support heading -->
        <tr>
          <td style="padding:0 4px 14px;">
            <p class="dm-text-ink-muted" style="margin:0 0 4px; font-family:${sans}; font-size:11px; font-weight:600; letter-spacing:0.14em; text-transform:uppercase; color:${inkMuted};">Other ways to help</p>
            <p class="dm-text-ink" style="margin:0; font-family:${sans}; font-size:18px; line-height:1.4; font-weight:600; color:${ink}; letter-spacing:-0.01em;">
              Sharing counts. So does donating.
            </p>
          </td>
        </tr>

        <!-- support body -->
        <tr>
          <td style="padding:0 4px 18px;">
            <p class="dm-text-ink-soft" style="margin:0 0 14px; font-family:${sans}; font-size:15px; line-height:1.7; color:${inkSoft};">
              Honestly, the biggest thing right now is getting Dars in front of people who&#39;d actually use it. A forward to a friend, a screenshot in a group chat, a quick repost on your story &mdash; that helps as much as anything else. Free, takes ten seconds, makes a real difference.
            </p>
            <p class="dm-text-ink-soft" style="margin:0; font-family:${sans}; font-size:15px; line-height:1.7; color:${inkSoft};">
              And if you&#39;d rather chip something in: Dars is funded entirely out of our own pocket right now &mdash; AI credits, hosting, the lot. Anything you send goes straight back into keeping it running. Genuinely no pressure either way.
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

        <!-- proper send-off -->
        <tr>
          <td style="padding:0 4px;">
            <p class="dm-text-ink-soft" style="margin:0 0 8px; font-family:${sans}; font-size:15px; line-height:1.7; color:${inkSoft};">
              Whatever you go with &mdash; testing, sharing, chipping in, or just reading this far &mdash; jazakAllah khair. Genuinely. None of this works without you.
            </p>
            <p class="dm-text-ink-soft" style="margin:0; font-family:${serif}; font-style:italic; font-size:15px; line-height:1.7; color:${inkSoft};">
              Speak soon, inshaAllah.
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
                    Mohammed
                  </p>
                  <p class="dm-text-coral" style="margin:0; font-family:${serif}; font-style:italic; font-size:14px; line-height:1.6; color:${coral};">
                    Founder, Dars · <a href="https://darsapp.com" class="dm-text-coral" style="color:${coral};">darsapp.com</a>
                  </p>
                </td>
                <td valign="bottom" align="right" style="padding-bottom:2px;">
                  <a href="https://instagram.com/getdars" style="display:inline-block; text-decoration:none; margin-left:8px;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="display:inline-table;">
                      <tr>
                        <td class="dm-bg-coral" width="36" height="36" align="center" valign="middle" style="background:${coral}; border-radius:999px; width:36px; height:36px;">
                          <img src="https://cdn.simpleicons.org/instagram/FFFFFF" width="18" height="18" alt="Instagram" style="display:block; border:0;" />
                        </td>
                      </tr>
                    </table>
                  </a>
                  <a href="https://tiktok.com/@dars.app" style="display:inline-block; text-decoration:none; margin-left:8px;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="display:inline-table;">
                      <tr>
                        <td class="dm-bg-coral" width="36" height="36" align="center" valign="middle" style="background:${coral}; border-radius:999px; width:36px; height:36px;">
                          <img src="https://cdn.simpleicons.org/tiktok/FFFFFF" width="18" height="18" alt="TikTok" style="display:block; border:0;" />
                        </td>
                      </tr>
                    </table>
                  </a>
                </td>
              </tr>
            </table>

            <div style="height:28px; line-height:28px; font-size:0;">&nbsp;</div>

            <p class="dm-text-ink-subtle" style="margin:0; font-family:${sans}; font-size:12px; line-height:1.55; color:${inkSubtle};">
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
