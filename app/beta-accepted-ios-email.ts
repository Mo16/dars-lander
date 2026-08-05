// HTML beta-accepted email for iOS testers. Sent to applicants who got
// in: TestFlight install instructions, what we're actually testing
// (usability, not content), and a hard nudge to use the in-app "?" button
// for every bug / wrong-content report. Mirrors the cream + coral palette
// and dark-mode lockout used by the other beta emails.
export function buildBetaAcceptedIosEmail() {
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
  // TODO: swap this for the real TestFlight public-link URL before sending.
  const testFlightUrl = "https://testflight.apple.com/join/REPLACE_ME";
  // Apple's App Store link to TestFlight itself — for testers who don't
  // have the runner app yet.
  const testFlightAppStoreUrl =
    "https://apps.apple.com/app/testflight/id899247664";

  const bullet = (title: string, body: string) => `
    <tr>
      <td class="dm-bg-card dm-border" style="background:${card}; border:1px solid ${border}; border-radius:18px; padding:20px 22px;">
        <p class="dm-text-ink" style="margin:0 0 6px; font-family:${sans}; font-size:15px; line-height:1.4; font-weight:600; color:${ink}; letter-spacing:-0.005em;">${title}</p>
        <p class="dm-text-ink-soft" style="margin:0; font-family:${sans}; font-size:14.5px; line-height:1.6; color:${inkSoft};">${body}</p>
      </td>
    </tr>
    <tr><td style="height:10px; line-height:10px; font-size:0;">&nbsp;</td></tr>
  `;

  const step = (n: number, title: string, body: string) => `
    <tr>
      <td valign="top" style="padding:0 14px 18px 0; width:36px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0">
          <tr>
            <td class="dm-bg-coral-soft dm-text-coral" width="36" height="36" align="center" valign="middle" style="background:${coralSoft}; color:${coralDeep}; border-radius:999px; width:36px; height:36px; font-family:${serif}; font-size:16px; font-weight:600;">
              <span class="dm-text-coral" style="color:${coralDeep};">${n}</span>
            </td>
          </tr>
        </table>
      </td>
      <td valign="top" style="padding:0 0 18px;">
        <p class="dm-text-ink" style="margin:0 0 4px; font-family:${sans}; font-size:15px; line-height:1.4; font-weight:600; color:${ink}; letter-spacing:-0.005em;">${title}</p>
        <p class="dm-text-ink-soft" style="margin:0; font-family:${sans}; font-size:14.5px; line-height:1.6; color:${inkSoft};">${body}</p>
      </td>
    </tr>
  `;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="only light">
<meta name="supported-color-schemes" content="only light">
<title>You&#39;re in. Welcome to the Dars beta.</title>
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
  You&#39;re in. Install Dars via TestFlight and start breaking things &mdash; tap the &#39;?&#39; on any screen to report what&#39;s off.
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

        <!-- hero -->
        <tr>
          <td class="dm-bg-coral-soft" style="background:${coralSoft}; border-radius:24px; padding:44px 24px 40px; text-align:center;">
            <p class="dm-text-coral" style="margin:0 0 10px; font-family:${sans}; font-size:11px; letter-spacing:0.18em; text-transform:uppercase; color:${coralDeep}; font-weight:600;">Beta access &middot; iOS</p>
            <p class="dm-text-ink" style="margin:0 0 8px; font-family:${serif}; font-size:42px; line-height:1.1; font-weight:400; color:${ink}; letter-spacing:-0.02em;">
              You&#39;re <span style="font-style:italic; color:${coralDeep};">in.</span>
            </p>
            <p class="dm-text-ink-soft" style="margin:0; font-family:${sans}; font-size:14.5px; line-height:1.5; color:${inkSoft};">
              Mubarak &mdash; consider this your TestFlight invite.
            </p>
          </td>
        </tr>

        <tr><td style="height:32px; line-height:32px; font-size:0;">&nbsp;</td></tr>

        <!-- intro -->
        <tr>
          <td style="padding:0 4px 8px;">
            <p class="dm-text-ink-soft" style="margin:0 0 16px; font-family:${sans}; font-size:15px; line-height:1.7; color:${inkSoft};">
              Assalamu alaykum.
            </p>
            <p class="dm-text-ink-soft" style="margin:0 0 16px; font-family:${sans}; font-size:15px; line-height:1.7; color:${inkSoft};">
              Your seat at the Dars beta is officially yours. You&#39;re one of a small group of <strong class="dm-text-ink" style="color:${ink}; font-weight:600;">Alimiyyah students</strong> we&#39;ve handed an early build to before we open the doors properly.
            </p>
            <p class="dm-text-ink-soft" style="margin:0 0 22px; font-family:${sans}; font-size:15px; line-height:1.7; color:${inkSoft};">
              Below is everything you need to install Dars on your iPhone and start poking at it. It takes about a minute.
            </p>
          </td>
        </tr>

        <!-- CTA card -->
        <tr>
          <td class="dm-bg-coral" style="background:${coral}; border-radius:20px; padding:34px 32px; text-align:center;">
            <p class="dm-text-white" style="margin:0 0 8px; font-family:${sans}; font-size:11px; letter-spacing:0.14em; text-transform:uppercase; color:#ffffff; font-weight:600; opacity:0.85;">↳ Install for iOS</p>
            <p class="dm-text-white" style="margin:0 0 22px; font-family:${sans}; font-size:22px; line-height:1.3; font-weight:500; letter-spacing:-0.01em; color:#ffffff;">
              Open in <span style="font-family:${serif}; font-style:italic; font-weight:400;">TestFlight.</span>
            </p>
            <a href="${testFlightUrl}" class="dm-bg-card dm-text-coral" style="display:inline-block; text-decoration:none; background:${card}; color:${coral}; padding:14px 30px; border-radius:999px; font-family:${sans}; font-size:15px; font-weight:600;">
              <span class="dm-text-coral" style="color:${coral};">Accept your TestFlight invite &rarr;</span>
            </a>
            <p class="dm-text-white" style="margin:22px 0 12px; font-family:${sans}; font-size:13px; line-height:1.5; color:#ffffff; opacity:0.85;">
              Don&#39;t have TestFlight yet? Grab it first &mdash; it&#39;s Apple&#39;s free app for running betas.
            </p>
            <a href="${testFlightAppStoreUrl}" class="dm-text-white" style="display:inline-block; text-decoration:none; background:transparent; color:#ffffff; padding:10px 22px; border-radius:999px; border:1.5px solid rgba(255,255,255,0.6); font-family:${sans}; font-size:13.5px; font-weight:500;">
              <span class="dm-text-white" style="color:#ffffff;">Download TestFlight from the App Store &rarr;</span>
            </a>
          </td>
        </tr>

        <tr><td style="height:28px; line-height:28px; font-size:0;">&nbsp;</td></tr>

        <!-- install steps -->
        <tr>
          <td style="padding:0 4px 14px;">
            <p class="dm-text-ink-muted" style="margin:0 0 4px; font-family:${sans}; font-size:11px; font-weight:600; letter-spacing:0.14em; text-transform:uppercase; color:${inkMuted};">How to install</p>
            <p class="dm-text-ink" style="margin:0; font-family:${sans}; font-size:18px; line-height:1.4; font-weight:600; color:${ink}; letter-spacing:-0.01em;">
              Four taps and you&#39;re in.
            </p>
          </td>
        </tr>

        <tr>
          <td class="dm-bg-card dm-border" style="background:${card}; border:1px solid ${border}; border-radius:18px; padding:24px 22px 6px;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
              ${step(
                1,
                "Install TestFlight.",
                "It&#39;s Apple&#39;s free app for running beta builds. Grab it from the App Store if you don&#39;t already have it.",
              )}
              ${step(
                2,
                "Tap the button above.",
                "Open this email on your iPhone and tap <em>Accept your TestFlight invite</em>. TestFlight will open automatically.",
              )}
              ${step(
                3,
                "Tap <em>Install</em>.",
                "TestFlight will show the Dars beta page. Hit Install and let it download.",
              )}
              ${step(
                4,
                "Open Dars and sign in.",
                "Use the same email you applied with so we can match you to your tester profile.",
              )}
            </table>
          </td>
        </tr>

        <tr><td style="height:36px; line-height:36px; font-size:0;">&nbsp;</td></tr>

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

        <tr><td style="height:36px; line-height:36px; font-size:0;">&nbsp;</td></tr>

        <!-- what we're actually testing -->
        <tr>
          <td style="padding:0 4px 14px;">
            <p class="dm-text-ink-muted" style="margin:0 0 4px; font-family:${sans}; font-size:11px; font-weight:600; letter-spacing:0.14em; text-transform:uppercase; color:${inkMuted};">Before you dive in</p>
            <p class="dm-text-ink" style="margin:0 0 16px; font-family:${sans}; font-size:18px; line-height:1.4; font-weight:600; color:${ink}; letter-spacing:-0.01em;">
              The content isn&#39;t what we&#39;re testing.
            </p>
            <p class="dm-text-ink-soft" style="margin:0 0 14px; font-family:${sans}; font-size:15px; line-height:1.7; color:${inkSoft};">
              The book content &mdash; summaries, translations, dictionaries, the texts themselves &mdash; is still being built. Bits will be sparse, bits placeholder, bits not final. <em>That&#39;s expected.</em>
            </p>
            <p class="dm-text-ink-soft" style="margin:0; font-family:${sans}; font-size:15px; line-height:1.7; color:${inkSoft};">
              What we actually want you to break: <strong class="dm-text-ink" style="color:${ink}; font-weight:600;">the app itself.</strong> The flow. The feel. The buttons that don&#39;t do what you&#39;d expect, the screens that look wrong on your iPhone, the moments where you go &ldquo;wait &mdash; what is this supposed to do?&rdquo;
            </p>
          </td>
        </tr>

        <tr><td style="height:14px; line-height:14px; font-size:0;">&nbsp;</td></tr>

        <!-- what to look for -->
        <tr>
          <td>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
              ${bullet(
                "Bugs and crashes.",
                "Anything that freezes, force-quits, or behaves in a way that clearly wasn&#39;t intended.",
              )}
              ${bullet(
                "Confusing flows.",
                "Anywhere you got stuck, lost, or had to guess what to tap next. If it confused you, it&#39;ll confuse everyone.",
              )}
              ${bullet(
                "Visual oddities.",
                "Text overlapping, weird spacing, cut-off buttons, things that look broken on your specific iPhone model.",
              )}
              ${bullet(
                "Performance.",
                "Laggy taps, slow loads, animations that judder. Tell us where and we&#39;ll chase it.",
              )}
              ${bullet(
                "Features that feel missing.",
                "If something obviously should exist and doesn&#39;t &mdash; say so. Half the roadmap was built from notes like these.",
              )}
              ${bullet(
                "Incorrect content.",
                "Typos, wrong translations, mistakes in a text, or anything that just doesn&#39;t look right. Flag it and we&#39;ll fix it.",
              )}
            </table>
          </td>
        </tr>

        <tr><td style="height:24px; line-height:24px; font-size:0;">&nbsp;</td></tr>

        <!-- THE ? BUTTON -->
        <tr>
          <td class="dm-bg-coral-soft dm-border" style="background:${coralSoft}; border:1px solid ${border}; border-radius:24px; padding:36px 32px; text-align:center;">
            <p class="dm-text-coral" style="margin:0 0 18px; font-family:${sans}; font-size:11px; font-weight:600; letter-spacing:0.18em; text-transform:uppercase; color:${coralDeep};">The single most important thing</p>

            <!-- the help bubble, drawn inline as SVG so no asset is needed -->
            <svg xmlns="http://www.w3.org/2000/svg" width="92" height="92" viewBox="0 0 100 100" role="img" aria-label="The help bubble — a dark circular button with a question mark" style="display:inline-block; margin:0 0 14px;">
              <circle cx="50" cy="54" r="38" fill="#000000" opacity="0.18" />
              <circle cx="50" cy="50" r="38" fill="#1A1814" />
              <text x="50" y="68" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif" font-size="52" font-weight="700" fill="#FFFFFF">?</text>
            </svg>

            <p class="dm-text-ink" style="margin:0 0 14px; font-family:${serif}; font-size:24px; line-height:1.25; font-weight:400; color:${ink}; letter-spacing:-0.01em;">
              See this <span style="font-style:italic; color:${coralDeep};">&ldquo;?&rdquo;</span> at the bottom-right of every screen?
            </p>
            <p class="dm-text-ink-soft" style="margin:0 auto 14px; max-width:440px; font-family:${sans}; font-size:15px; line-height:1.7; color:${inkSoft};">
              Tap it any time &mdash; mid-quiz, mid-revision, mid-anything &mdash; to report a bug, a typo, a wrong translation, a layout that looks off, or just &ldquo;this confused me.&rdquo;
            </p>
            <p class="dm-text-ink-soft" style="margin:0 auto; max-width:440px; font-family:${sans}; font-size:15px; line-height:1.7; color:${inkSoft};">
              We read <strong class="dm-text-ink" style="color:${ink}; font-weight:600;">every single one.</strong> If you spot something off and don&#39;t tap the &ldquo;?&rdquo;, we&#39;ll never know it&#39;s broken &mdash; so when in doubt, tap it.
            </p>
          </td>
        </tr>

        <tr><td style="height:32px; line-height:32px; font-size:0;">&nbsp;</td></tr>

        <!-- closing -->
        <tr>
          <td style="padding:0 4px;">
            <p class="dm-text-ink-soft" style="margin:0 0 8px; font-family:${sans}; font-size:15px; line-height:1.7; color:${inkSoft};">
              Thank you for getting in early. You&#39;re the reason this thing gets to be good before it&#39;s public.
            </p>
            <p class="dm-text-ink-soft" style="margin:0; font-family:${serif}; font-style:italic; font-size:15px; line-height:1.7; color:${inkSoft};">
              JazakAllah khair. Now go find us some bugs.
            </p>
          </td>
        </tr>

        <tr><td style="height:32px; line-height:32px; font-size:0;">&nbsp;</td></tr>

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
              You&#39;re getting this because you applied for the Dars beta and your iOS application was accepted.<br>
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
