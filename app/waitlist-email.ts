// HTML confirmation email styled to match the Dars landing page palette.
// Uses tables + inline styles for Outlook / Gmail compatibility.
// Locked to the light palette even when the recipient's client is in dark
// mode via: color-scheme meta tags, a media-query style block with
// !important overrides, and dm-force-* class anchors on every colored
// element.
export function buildConfirmationEmail() {
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
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";

  const step = (n: number, title: string, body: string) => `
    <tr>
      <td style="padding: 0 0 18px;" valign="top">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0">
          <tr>
            <td width="32" valign="top">
              <div class="dm-bg-coral-soft dm-text-coral" style="width:26px; height:26px; border-radius:999px; background:${coralSoft}; color:${coral}; text-align:center; line-height:26px; font-size:12px; font-weight:600; font-family:${sans};">${n}</div>
            </td>
            <td class="dm-text-ink" style="padding-left: 14px; font-family:${sans}; font-size: 14.5px; line-height: 1.55; color: ${ink};">
              <strong class="dm-text-ink" style="font-weight:600; color:${ink};">${title}</strong>
              <span class="dm-text-ink-soft" style="color:${inkSoft};"> — ${body}</span>
            </td>
          </tr>
        </table>
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
<title>You're on the Dars waitlist</title>
<style>
  :root {
    color-scheme: only light;
    supported-color-schemes: only light;
  }
  /* Force the light palette even when the email client is in dark mode.
     Targets Apple Mail, iOS Mail, Gmail (mobile), Outlook.com dark-mode
     auto-inversion. */
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
  /* Outlook.com dark-mode attribute selector (separate from media query). */
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
</style>
</head>
<body class="dm-bg-cream dm-text-ink" style="margin:0; padding:0; background:${cream}; font-family:${sans}; color:${ink}; -webkit-font-smoothing:antialiased;">

<div style="display:none; overflow:hidden; line-height:1px; opacity:0; max-height:0; max-width:0;">
  You're on the Dars waitlist — early access, founder pricing for life.
</div>

<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" class="dm-bg-cream" style="background:${cream}; padding:40px 16px;">
  <tr>
    <td align="center">
      <table role="presentation" width="560" cellspacing="0" cellpadding="0" border="0" style="max-width:560px; width:100%;">

        <!-- brand -->
        <tr>
          <td style="padding: 0 4px 28px;">
            <img src="https://dars.app/assets/img/logo.png" width="30" height="30" alt="Dars" style="display:inline-block; width:30px; height:30px; border-radius:8px; vertical-align:middle; border:0; outline:none; text-decoration:none;" />
            <span class="dm-text-ink" style="vertical-align:middle; margin-left:10px; font-family:${sans}; font-size:18px; font-weight:600; letter-spacing:-0.01em; color:${ink};">Dars</span>
          </td>
        </tr>

        <!-- hero card -->
        <tr>
          <td class="dm-bg-coral-soft" style="background:${coralSoft}; border-radius:24px; padding:44px 36px;">
            <p class="dm-text-coral" style="margin:0 0 14px; font-family:${sans}; font-size:11px; letter-spacing:0.14em; text-transform:uppercase; color:${coral}; font-weight:600;">◆ You&#39;re on the list</p>
            <h1 class="dm-text-ink" style="margin:0 0 16px; font-family:${sans}; font-size:40px; line-height:1.05; font-weight:500; letter-spacing:-0.02em; color:${ink};">
              You&#39;re <span class="dm-text-coral" style="font-family:${serif}; font-style:italic; color:${coral}; font-weight:400;">in.</span>
            </h1>
            <p class="dm-text-ink-soft" style="margin:0; font-family:${sans}; font-size:15px; line-height:1.6; color:${inkSoft};">
              Assalamu alaikum — thanks for joining the Dars waitlist. We&#39;re building the revision app for Alimiyyah students, and you&#39;ll be first through the door when we open.
            </p>
          </td>
        </tr>

        <tr><td style="height:20px; line-height:20px; font-size:0;">&nbsp;</td></tr>

        <!-- what's next card -->
        <tr>
          <td class="dm-bg-card dm-border" style="background:${card}; border:1px solid ${border}; border-radius:20px; padding:30px 32px 14px;">
            <p class="dm-text-ink-muted" style="margin:0 0 20px; font-family:${sans}; font-size:11px; font-weight:600; letter-spacing:0.14em; text-transform:uppercase; color:${inkMuted};">What&#39;s next</p>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
              ${step(1, "We&#39;ll email you at launch", "early access, founder pricing for life.")}
              ${step(2, "Your feedback shapes the app", "reply to this email with anything you want to see.")}
              ${step(3, "Invite your halaqah", "the more classmates on board, the better the leaderboards.")}
            </table>
          </td>
        </tr>

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
