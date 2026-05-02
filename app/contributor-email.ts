// HTML contributor email — "I can't do this alone" call for help.
// Reuses the cream + coral palette and dark-mode lockout from milestone-email.ts
// but uses text-only requirement cards and pill-button support links.
export function buildContributorEmail() {
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
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";

  const base = "https://darsapp.com/assets/img";

  const requirement = (n: number, title: string, body: string) => `
    <tr>
      <td class="dm-bg-card dm-border" style="background:${card}; border:1px solid ${border}; border-radius:18px; padding:22px 24px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
          <tr>
            <td width="44" valign="top">
              <div class="dm-bg-coral dm-text-white" style="width:34px; height:34px; border-radius:999px; background:${coral}; color:#ffffff; text-align:center; line-height:34px; font-size:14px; font-weight:600; font-family:${sans};">${n}</div>
            </td>
            <td valign="top" style="padding-left:6px;">
              <p class="dm-text-ink" style="margin:0 0 6px; font-family:${sans}; font-size:16px; line-height:1.4; font-weight:600; color:${ink}; letter-spacing:-0.005em;">${title}</p>
              <p class="dm-text-ink-soft" style="margin:0; font-family:${sans}; font-size:14.5px; line-height:1.6; color:${inkSoft};">${body}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr><td style="height:12px; line-height:12px; font-size:0;">&nbsp;</td></tr>
  `;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="only light">
<meta name="supported-color-schemes" content="only light">
<title>they&#39;re coming to our country and taking our jobs 😭</title>
<style>
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
  Opening contributor spots on Dars. If you&#39;ve studied Alimiyyah texts, we need your help.
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
            <p class="dm-text-coral" style="margin:0 0 14px; font-family:${sans}; font-size:11px; letter-spacing:0.14em; text-transform:uppercase; color:${coral}; font-weight:600;">◆ A favour to ask</p>
            <h1 class="dm-text-ink" style="margin:0 0 18px; font-family:${sans}; font-size:42px; line-height:1.05; font-weight:500; letter-spacing:-0.02em; color:${ink};">
              Want to help <span class="dm-text-coral" style="font-family:${serif}; font-style:italic; color:${coral}; font-weight:400;">build it?</span>
            </h1>
            <p class="dm-text-ink-soft" style="margin:0; font-family:${sans}; font-size:15px; line-height:1.65; color:${inkSoft};">
              Assalamu alaikum &mdash; quick one. We&#39;re opening contributor spots on Dars, and we&#39;re looking for the right people.
            </p>
          </td>
        </tr>

        <tr><td style="height:24px; line-height:24px; font-size:0;">&nbsp;</td></tr>

        <!-- intro -->
        <tr>
          <td style="padding:0 4px 8px;">
            <p class="dm-text-ink-soft" style="margin:0 0 16px; font-family:${sans}; font-size:15px; line-height:1.7; color:${inkSoft};">
              The Alimiyyah syllabus has hundreds of books across <strong class="dm-text-ink" style="color:${ink}; font-weight:600;">Fiqh, Nahw, Sarf, Hadith, Tafsir, Aqeedah</strong> and beyond. Getting each one properly into Dars &mdash; chapter summaries, key points, flashcards, the works &mdash; is the bulk of the work right now.
            </p>
            <p class="dm-text-ink-soft" style="margin:0 0 22px; font-family:${sans}; font-size:15px; line-height:1.7; color:${inkSoft};">
              On our own, we ship in a few months. With contributors, much sooner &mdash; and none of us want to wait longer than we have to.
            </p>
          </td>
        </tr>

        <!-- big banner -->
        <tr>
          <td class="dm-bg-coral dm-text-white" style="background:${coral}; border-radius:20px; padding:28px 32px;">
            <p class="dm-text-white" style="margin:0 0 6px; font-family:${sans}; font-size:11px; letter-spacing:0.14em; text-transform:uppercase; color:#ffffff; font-weight:600; opacity:0.85;">So here&#39;s the thing</p>
            <p class="dm-text-white" style="margin:0; font-family:${sans}; font-size:24px; line-height:1.25; font-weight:500; letter-spacing:-0.01em; color:#ffffff;">
              We&#39;re opening <span style="font-family:${serif}; font-style:italic; font-weight:400;">contributor spots.</span>
            </p>
          </td>
        </tr>

        <tr><td style="height:32px; line-height:32px; font-size:0;">&nbsp;</td></tr>

        <!-- requirements heading -->
        <tr>
          <td style="padding:0 4px 14px;">
            <p class="dm-text-ink-muted" style="margin:0 0 4px; font-family:${sans}; font-size:11px; font-weight:600; letter-spacing:0.14em; text-transform:uppercase; color:${inkMuted};">What we&#39;re looking for</p>
            <p class="dm-text-ink" style="margin:0; font-family:${sans}; font-size:18px; line-height:1.4; font-weight:600; color:${ink}; letter-spacing:-0.01em;">
              Here&#39;s the shortlist.
            </p>
          </td>
        </tr>

        <!-- requirements -->
        <tr>
          <td>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
              ${requirement(
                1,
                "You&#39;ve actually studied these books.",
                "Currently in Alimiyyah, graduated, or seriously read texts like Quduri, Hidayah, Ajrumiyyah, Mishkat, Bukhari, the Urdu staples, the Tafsir side. Accuracy is everything &mdash; the whole pitch of Dars falls apart if the content gets things wrong.",
              )}
              ${requirement(
                2,
                "You have a ChatGPT Plus or Claude Pro account.",
                "The workflow leans on these heavily and the free tiers cap out fast. If you don&#39;t have one already, this isn&#39;t for you yet.",
              )}
              ${requirement(
                3,
                "You can handle the tech side.",
                "It&#39;s structured data entry. PDF in, AI prompt, review the output, paste into the admin panel, tidy the formatting. Not coding &mdash; but you need to be comfortable around it.",
              )}
            </table>
          </td>
        </tr>

        <!-- CTA card -->
        <tr>
          <td class="dm-bg-coral-soft" style="background:${coralSoft}; border-radius:20px; padding:26px 30px;">
            <p class="dm-text-coral" style="margin:0 0 8px; font-family:${sans}; font-size:11px; letter-spacing:0.14em; text-transform:uppercase; color:${coral}; font-weight:600;">↳ How to apply</p>
            <p class="dm-text-ink" style="margin:0; font-family:${sans}; font-size:15px; line-height:1.65; color:${ink};">
              <strong style="font-weight:600;">Hit reply</strong>
              <span class="dm-text-ink-soft" style="color:${inkSoft};"> with what year you&#39;re in or graduated from, the books you know best, and which AI account you have. We&#39;ll write back to everyone personally.</span>
            </p>
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

        <tr><td style="height:32px; line-height:32px; font-size:0;">&nbsp;</td></tr>

        <!-- support heading -->
        <tr>
          <td style="padding:0 4px 14px;">
            <p class="dm-text-ink-muted" style="margin:0 0 4px; font-family:${sans}; font-size:11px; font-weight:600; letter-spacing:0.14em; text-transform:uppercase; color:${inkMuted};">If you can&#39;t contribute time</p>
            <p class="dm-text-ink" style="margin:0; font-family:${sans}; font-size:18px; line-height:1.4; font-weight:600; color:${ink}; letter-spacing:-0.01em;">
              There are other ways to help.
            </p>
          </td>
        </tr>

        <!-- support body -->
        <tr>
          <td style="padding:0 4px 18px;">
            <p class="dm-text-ink-soft" style="margin:0; font-family:${sans}; font-size:15px; line-height:1.7; color:${inkSoft};">
              Dars is being built entirely out of our own pocket right now &mdash; AI credits, hosting, design tools, all of it. Every contribution genuinely keeps the lights on.
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

        <tr><td style="height:24px; line-height:24px; font-size:0;">&nbsp;</td></tr>

        <!-- aurelo card -->
        <tr>
          <td class="dm-bg-card dm-border" style="background:${card}; border:1px solid ${border}; border-radius:20px; padding:26px 30px;">
            <p class="dm-text-ink-muted" style="margin:0 0 8px; font-family:${sans}; font-size:11px; font-weight:600; letter-spacing:0.14em; text-transform:uppercase; color:${inkMuted};">Or option three</p>
            <p class="dm-text-ink" style="margin:0 0 14px; font-family:${sans}; font-size:16px; line-height:1.45; font-weight:600; color:${ink}; letter-spacing:-0.005em;">
              Send work our agency&#39;s way.
            </p>
            <p class="dm-text-ink-soft" style="margin:0 0 18px; font-family:${sans}; font-size:14.5px; line-height:1.65; color:${inkSoft};">
              We also run <a href="https://aurelo.uk" class="dm-text-coral" style="color:${coral}; font-weight:500;">Aurelo Web Studio</a> &mdash; the studio that built Dars. We get businesses more customers, higher search rankings, and apps that actually ship. Dars is one of ours, so you already know the standard. If you or anyone you know needs that kind of work, sending it our way directly funds Dars.
            </p>
            <a href="https://aurelo.uk" class="dm-bg-coral dm-text-white" style="display:inline-block; text-decoration:none; background:${coral}; color:#ffffff; padding:11px 22px; border-radius:999px; font-family:${sans}; font-size:14px; font-weight:500;">
              <span class="dm-text-white" style="color:#ffffff;">Visit aurelo.uk &rarr;</span>
            </a>
          </td>
        </tr>

        <tr><td style="height:28px; line-height:28px; font-size:0;">&nbsp;</td></tr>

        <!-- closing -->
        <tr>
          <td style="padding:0 4px;">
            <p class="dm-text-ink-soft" style="margin:0; font-family:${sans}; font-size:15px; line-height:1.7; color:${inkSoft}; font-style:italic; font-family:${serif};">
              Genuinely no pressure. Sharing the app with someone who&#39;d benefit is just as valuable.
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
                    More soon, inshaAllah.
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
