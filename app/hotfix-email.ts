// HTML hotfix email — "damn you guys really did break it" update to the
// waitlist/beta testers. You lot hammered the app, it buckled, and we fixed it:
// lag and slow loading gone, server instances upgraded, code optimised.
// Reuses the cream + coral palette, dark-mode lockout, and personal Mohammed
// sign-off from milestone-email.ts; uses the image-free bullet cards from
// beta-tester-email.ts for the fix list.
export function buildHotfixEmail() {
  const coral = "#EC6144";
  const coralSoft = "#FFE3D6";
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

  const fix = (title: string, body: string) => `
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
<title>damn, you guys really did break it 😅</title>
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
  So many of you used the app at once that it slowed right down. That&#39;s now fixed. Lag gone, servers upgraded, code cleaned up.
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
            <p class="dm-text-coral" style="margin:0 0 14px; font-family:${sans}; font-size:11px; letter-spacing:0.14em; text-transform:uppercase; color:${coral}; font-weight:600;">◆ Hotfixes shipped</p>
            <h1 class="dm-text-ink" style="margin:0 0 18px; font-family:${sans}; font-size:40px; line-height:1.05; font-weight:500; letter-spacing:-0.02em; color:${ink};">
              Damn. You guys really <span class="dm-text-coral" style="font-family:${serif}; font-style:italic; color:${coral}; font-weight:400;">did break it.</span>
            </h1>
            <p class="dm-text-ink-soft" style="margin:0; font-family:${sans}; font-size:15px; line-height:1.65; color:${inkSoft};">
              So many of you started using it at once that things slowed right down. Loading screens that hung around too long, taps that took a second to respond. I noticed, and I&#39;ve sorted it.
            </p>
          </td>
        </tr>

        <tr><td style="height:24px; line-height:24px; font-size:0;">&nbsp;</td></tr>

        <!-- intro -->
        <tr>
          <td style="padding:0 4px 8px;">
            <p class="dm-text-ink-soft" style="margin:0 0 16px; font-family:${sans}; font-size:15px; line-height:1.7; color:${inkSoft};">
              Assalamu alaykum.
            </p>
            <p class="dm-text-ink-soft" style="margin:0 0 16px; font-family:${sans}; font-size:15px; line-height:1.7; color:${inkSoft};">
              First off, you lot are doing brilliantly. The app is being used a lot more than I planned for at this stage, and it&#39;s been a good thing to watch.
            </p>
            <p class="dm-text-ink-soft" style="margin:0 0 16px; font-family:${sans}; font-size:15px; line-height:1.7; color:${inkSoft};">
              All that use also showed up a few things that needed fixing. The lagging, the slow loading, and a couple of rough edges I&#39;d been meaning to get to.
            </p>
            <p class="dm-text-ink" style="margin:0 0 22px; font-family:${sans}; font-size:15px; line-height:1.7; color:${ink}; font-weight:500;">
              Here&#39;s what just went out:
            </p>
          </td>
        </tr>

        <!-- fix cards -->
        <tr>
          <td>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
              ${fix(
                "The lagging is gone (for the most part)",
                "That stutter when you moved between screens or went through flashcards has been tracked down and fixed. It should feel a lot smoother now.",
              )}
              ${fix(
                "Slow loading is fixed.",
                "Those long loading screens where you started to wonder if the app had frozen are sorted. Screens come in fast and content loads when it should.",
              )}
              ${fix(
                "I upgraded the servers.",
                "More of you showed up than the old setup could handle, so I&#39;ve moved everything onto bigger servers that can take the load, and plenty more on top.",
              )}
              ${fix(
                "The code is cleaned up.",
                "I went through and tidied up the slow parts underneath, so there&#39;s less happening behind the scenes and less waiting around for you.",
              )}
            </table>
          </td>
        </tr>

        <!-- closing body -->
        <tr>
          <td style="padding:8px 4px 0;">
            <p class="dm-text-ink-soft" style="margin:0 0 22px; font-family:${sans}; font-size:15px; line-height:1.7; color:${inkSoft};">
              None of this would have shown up if you weren&#39;t using it the way you are, so thank you for that. This is what the beta is for. You find the problems, I fix them. If something still feels off, just hit reply or tap the ? on the app and tell me. I read every one.
            </p>
          </td>
        </tr>

        <!-- TestFlight update CTA -->
        <tr>
          <td class="dm-bg-coral" style="background:${coral}; border-radius:20px; padding:34px 32px; text-align:center;">
            <p class="dm-text-white" style="margin:0 0 8px; font-family:${sans}; font-size:11px; letter-spacing:0.14em; text-transform:uppercase; color:#ffffff; font-weight:600; opacity:0.85;">↳ One thing to do</p>
            <p class="dm-text-white" style="margin:0 0 14px; font-family:${sans}; font-size:22px; line-height:1.3; font-weight:500; letter-spacing:-0.01em; color:#ffffff;">
              Update your app to get the fixes.
            </p>
            <p class="dm-text-white" style="margin:0; font-family:${sans}; font-size:14.5px; line-height:1.6; color:#ffffff; opacity:0.92;">
              Open <strong style="font-weight:600;">TestFlight</strong>, find Dars, and tap Update. None of this lands until you do.
            </p>
          </td>
        </tr>

        <tr><td style="height:24px; line-height:24px; font-size:0;">&nbsp;</td></tr>

        <!-- things to try card -->
        <tr>
          <td class="dm-bg-card dm-border" style="background:${card}; border:1px solid ${border}; border-radius:20px; padding:30px 32px;">
            <p class="dm-text-ink-muted" style="margin:0 0 16px; font-family:${sans}; font-size:11px; font-weight:600; letter-spacing:0.14em; text-transform:uppercase; color:${inkMuted};">While you&#39;re in there</p>

            <p class="dm-text-ink-soft" style="margin:0 0 14px; font-family:${sans}; font-size:14.5px; line-height:1.65; color:${inkSoft};">
              Have a proper go at everything. Build and run through <strong class="dm-text-ink" style="color:${ink}; font-weight:600;">decks</strong>, set up a <strong class="dm-text-ink" style="color:${ink}; font-weight:600;">halaqa</strong> and get your friends in it, and have a look around the <strong class="dm-text-ink" style="color:${ink}; font-weight:600;">resources</strong>. The more you all use, the more I learn about what to fix next.
            </p>

            <p class="dm-text-ink-soft" style="margin:0 0 14px; font-family:${sans}; font-size:14.5px; line-height:1.65; color:${inkSoft};">
              And please <strong class="dm-text-ink" style="color:${ink}; font-weight:600;">share it with friends</strong>. It&#39;s a lot more fun with people you know to compete with and revise alongside.
            </p>

            <p class="dm-text-ink-soft" style="margin:0; font-family:${sans}; font-size:14.5px; line-height:1.65; color:${inkSoft};">
              One more thing: <strong class="dm-text-ink" style="color:${ink}; font-weight:600;">Pro is free for everyone during the beta</strong>, so go and use the lot while it&#39;s on us.
            </p>
          </td>
        </tr>

        <tr><td style="height:18px; line-height:18px; font-size:0;">&nbsp;</td></tr>

        <!-- book note -->
        <tr>
          <td style="padding:0 4px;">
            <p class="dm-text-ink-subtle" style="margin:0; font-family:${sans}; font-size:13.5px; line-height:1.65; color:${inkSubtle};">
              A quick note on the books: the content in there isn&#39;t final and is mainly there for testing right now. For everyone wondering where the rest of the books are, we&#39;ll be adding a lot more once we&#39;ve gathered enough feedback from the beta.
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
                  <p class="dm-text-ink-soft" style="margin:0 0 6px; font-family:${sans}; font-size:14.5px; line-height:1.6; color:${inkSoft};">
                    Thanks for sticking with it.
                  </p>
                  <p class="dm-text-ink" style="margin:18px 0 2px; font-family:${sans}; font-size:14.5px; line-height:1.6; color:${ink}; font-weight:500;">
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
