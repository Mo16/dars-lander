// HTML beta-tester email — Fajr-hour "u up?" teaser to the waitlist
// announcing that beta invites are coming soon. Reuses the cream + coral
// palette and dark-mode lockout from contributor-email.ts.
export function buildBetaTesterEmail() {
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
  Well, you should be &mdash; it&#39;s Fajr in the UK. The Dars beta is nearly here either way.
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
            <p class="dm-text-ink-soft" style="margin:0 0 16px; font-family:${sans}; font-size:15px; line-height:1.7; color:${inkSoft};">
              Well, you should be &mdash; it&#39;s Fajr time if you&#39;re in the UK. <br> Anyway, we&#39;ve been up for quite a while now.
            </p>
            <p class="dm-text-coral" style="margin:0 0 22px; font-family:${serif}; font-style:italic; font-size:20px; line-height:1.3; color:${coral};">
              Not just for Fajr.
            </p>
            <p class="dm-text-ink-soft" style="margin:0 0 16px; font-family:${sans}; font-size:15px; line-height:1.7; color:${inkSoft};">
              Dars has been <strong class="dm-text-ink" style="color:${ink}; font-weight:600;">quietly cooking</strong> in the background, and the beta is finally ready. You&#39;re on the waitlist &mdash; so consider this your invite to test the app before we open the doors properly.
            </p>
            <p class="dm-text-ink-soft" style="margin:0 0 22px; font-family:${sans}; font-size:15px; line-height:1.7; color:${inkSoft};">
              If you&#39;re in: early access, the full revision features, <strike>ALL</strike> some of the content (we're still adding content), and a direct line to tell us what feels useful, what feels confusing, and what needs fixing.
            </p>
          </td>
        </tr>

        <!-- CTA card -->
        <tr>
          <td class="dm-bg-coral" style="background:${coral}; border-radius:20px; padding:34px 32px; text-align:center;">
            <p class="dm-text-white" style="margin:0 0 8px; font-family:${sans}; font-size:11px; letter-spacing:0.14em; text-transform:uppercase; color:#ffffff; font-weight:600; opacity:0.85;">↳ How to apply</p>
            <p class="dm-text-white" style="margin:0 0 22px; font-family:${sans}; font-size:22px; line-height:1.3; font-weight:500; letter-spacing:-0.01em; color:#ffffff;">
              Sign up for <span style="font-family:${serif}; font-style:italic; font-weight:400;">beta access.</span>
            </p>
            <a href="${ctaUrl}" class="dm-bg-card dm-text-coral" style="display:inline-block; text-decoration:none; background:${card}; color:${coral}; padding:14px 30px; border-radius:999px; font-family:${sans}; font-size:15px; font-weight:600;">
              <span class="dm-text-coral" style="color:${coral};">Apply for beta access &rarr;</span>
            </a>
          </td>
        </tr>

        <tr><td style="height:28px; line-height:28px; font-size:0;">&nbsp;</td></tr>

        <!-- what to expect -->
        <tr>
          <td style="padding:0 4px 14px;">
            <p class="dm-text-ink-muted" style="margin:0 0 4px; font-family:${sans}; font-size:11px; font-weight:600; letter-spacing:0.14em; text-transform:uppercase; color:${inkMuted};">A small, honest warning</p>
            <p class="dm-text-ink" style="margin:0; font-family:${sans}; font-size:18px; line-height:1.4; font-weight:600; color:${ink}; letter-spacing:-0.01em;">
              The beta will not be perfect.
            </p>
          </td>
        </tr>

        <tr>
          <td>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
              ${bullet(
                "There may be bugs.",
                "Some we&#39;ve already found. Others still wandering free.",
              )}
              ${bullet(
                "There may be rough edges.",
                "Sharp enough that we&#39;d quite like you to find them before everyone else does.",
              )}
              ${bullet(
                "There may be a button somewhere that needs sincere tawbah.",
                "We won&#39;t name it. It knows.",
              )}
              ${bullet(
                "There may be content that&#39;s not quite right.",
                "A misattributed hadith, a dodgy translation, a tashkeel mark your ustadh would wince at. Flag it &mdash; we&#39;ll fix it.",
              )}
            </table>
          </td>
        </tr>

        <tr><td style="height:6px; line-height:6px; font-size:0;">&nbsp;</td></tr>

        <!-- closing -->
        <tr>
          <td style="padding:0 4px;">
            <p class="dm-text-ink-soft" style="margin:0; font-family:${sans}; font-size:15px; line-height:1.7; color:${inkSoft};">
              But that&#39;s exactly why we want <strong class="dm-text-ink" style="color:${ink}; font-weight:600;">real Alimiyyah students</strong> testing it first &mdash; the people who&#39;d actually use it, and who&#39;d notice when something&#39;s off.
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
            <p class="dm-text-ink-subtle" style="margin:0; font-family:${sans}; font-size:13.5px; line-height:1.65; color:${inkSubtle};">
              Buttons below if you ever fancy sharing Dars or contributing toward the build &mdash; AI credits, hosting, the things that keep it being built. There if you want them, ignorable if you don&#39;t.
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
              C u later, Alligator.
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
