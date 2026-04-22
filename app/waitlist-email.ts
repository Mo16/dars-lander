// HTML confirmation email styled to match the Dars landing page palette.
// Uses tables + inline styles for Outlook / Gmail compatibility.
// Lives in its own module (no "use client") so it can be imported from both
// the client form component and the server-side /email-preview route.
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
              <div style="width:26px; height:26px; border-radius:999px; background:${coralSoft}; color:${coral}; text-align:center; line-height:26px; font-size:12px; font-weight:600; font-family:${sans};">${n}</div>
            </td>
            <td style="padding-left: 14px; font-family:${sans}; font-size: 14.5px; line-height: 1.55; color: ${ink};">
              <strong style="font-weight:600;">${title}</strong>
              <span style="color:${inkSoft};"> — ${body}</span>
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
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>You're on the Dars waitlist</title>
</head>
<body style="margin:0; padding:0; background:${cream}; font-family:${sans}; color:${ink}; -webkit-font-smoothing:antialiased;">

<div style="display:none; overflow:hidden; line-height:1px; opacity:0; max-height:0; max-width:0;">
  You're on the Dars waitlist — early access, founder pricing for life.
</div>

<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:${cream}; padding:40px 16px;">
  <tr>
    <td align="center">
      <table role="presentation" width="560" cellspacing="0" cellpadding="0" border="0" style="max-width:560px; width:100%;">

        <!-- brand -->
        <tr>
          <td style="padding: 0 4px 28px;">
            <span style="display:inline-block; width:30px; height:30px; background:${coral}; border-radius:8px; vertical-align:middle; text-align:center; line-height:30px; color:#fff; font-family:${serif}; font-style:italic; font-size:18px; font-weight:400;">d</span>
            <span style="vertical-align:middle; margin-left:10px; font-family:${sans}; font-size:18px; font-weight:600; letter-spacing:-0.01em; color:${ink};">Dars</span>
          </td>
        </tr>

        <!-- hero card -->
        <tr>
          <td style="background:${coralSoft}; border-radius:24px; padding:44px 36px;">
            <p style="margin:0 0 14px; font-family:${sans}; font-size:11px; letter-spacing:0.14em; text-transform:uppercase; color:${coral}; font-weight:600;">◆ You&#39;re on the list</p>
            <h1 style="margin:0 0 16px; font-family:${sans}; font-size:40px; line-height:1.05; font-weight:500; letter-spacing:-0.02em; color:${ink};">
              You&#39;re <span style="font-family:${serif}; font-style:italic; color:${coral}; font-weight:400;">in.</span>
            </h1>
            <p style="margin:0; font-family:${sans}; font-size:15px; line-height:1.6; color:${inkSoft};">
              Assalamu alaikum — thanks for joining the Dars waitlist. We&#39;re building the revision app for Alimiyyah students, and you&#39;ll be first through the door when we open.
            </p>
          </td>
        </tr>

        <tr><td style="height:20px; line-height:20px; font-size:0;">&nbsp;</td></tr>

        <!-- what's next card -->
        <tr>
          <td style="background:${card}; border:1px solid ${border}; border-radius:20px; padding:30px 32px 14px;">
            <p style="margin:0 0 20px; font-family:${sans}; font-size:11px; font-weight:600; letter-spacing:0.14em; text-transform:uppercase; color:${inkMuted};">What&#39;s next</p>
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
            <p style="margin:0 0 6px; font-family:${sans}; font-size:14.5px; line-height:1.6; color:${ink};">
              Barakallahu feekum,
            </p>
            <p style="margin:0 0 28px; font-family:${serif}; font-style:italic; font-size:15px; line-height:1.6; color:${coral};">
              The Dars team
            </p>
            <p style="margin:0; font-family:${sans}; font-size:12px; line-height:1.55; color:${inkSubtle};">
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
