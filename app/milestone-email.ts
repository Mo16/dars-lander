// HTML milestone email — "1,000 signups" announcement.
// Mirrors the styling of waitlist-email.ts (cream + coral palette, table-based,
// inline styles, dark-mode lockout) but adds image-backed numbered sections.
export function buildMilestoneEmail() {
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

  const point = (
    n: number,
    image: string,
    alt: string,
    title: string,
    body: string,
  ) => `
    <tr>
      <td class="dm-bg-card dm-border" style="background:${card}; border:1px solid ${border}; border-radius:20px; padding:0; overflow:hidden;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
          <tr>
            <td class="dm-bg-coral-soft" style="background:${coralSoft}; padding:24px; text-align:center;">
              <img src="${base}/${image}" alt="${alt}" width="360" style="display:inline-block; max-width:100%; height:auto; border-radius:12px; border:0; outline:none; text-decoration:none;" />
            </td>
          </tr>
          <tr>
            <td style="padding:24px 28px 26px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td width="34" valign="top">
                    <div class="dm-bg-coral-soft dm-text-coral" style="width:28px; height:28px; border-radius:999px; background:${coralSoft}; color:${coral}; text-align:center; line-height:28px; font-size:13px; font-weight:600; font-family:${sans};">${n}</div>
                  </td>
                  <td valign="top" style="padding-left:14px;">
                    <p class="dm-text-ink" style="margin:0 0 8px; font-family:${sans}; font-size:16px; line-height:1.4; font-weight:600; color:${ink}; letter-spacing:-0.005em;">${title}</p>
                    <p class="dm-text-ink-soft" style="margin:0; font-family:${sans}; font-size:14.5px; line-height:1.6; color:${inkSoft};">${body}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr><td style="height:14px; line-height:14px; font-size:0;">&nbsp;</td></tr>
  `;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="only light">
<meta name="supported-color-schemes" content="only light">
<title>oh stop it you 😊 (1,000 of you signed up)</title>
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
  1,000 of you have signed up to the Dars waitlist. Here's where things are.
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
            <p class="dm-text-coral" style="margin:0 0 14px; font-family:${sans}; font-size:11px; letter-spacing:0.14em; text-transform:uppercase; color:${coral}; font-weight:600;">◆ Behind the scenes</p>
            <h1 class="dm-text-ink" style="margin:0 0 18px; font-family:${sans}; font-size:40px; line-height:1.05; font-weight:500; letter-spacing:-0.02em; color:${ink};">
              1,000 of you. Here&#39;s <span class="dm-text-coral" style="font-family:${serif}; font-style:italic; color:${coral}; font-weight:400;">where we&#39;re at.</span>
            </h1>
            <p class="dm-text-ink-soft" style="margin:0; font-family:${sans}; font-size:15px; line-height:1.65; color:${inkSoft};">
              Quick one. We just hit 1,000 people on the Dars waitlist &mdash; in <strong class="dm-text-ink" style="color:${ink}; font-weight:600;">2 days</strong>, with zero marketing. Just you lot sending it around.
            </p>
          </td>
        </tr>

        <tr><td style="height:24px; line-height:24px; font-size:0;">&nbsp;</td></tr>

        <!-- intro -->
        <tr>
          <td style="padding:0 4px 8px;">
            <p class="dm-text-ink-soft" style="margin:0 0 16px; font-family:${sans}; font-size:15px; line-height:1.7; color:${inkSoft};">
              Which is genuinely mad. There&#39;s a screenshot on my phone from when we had 7 signups, three of which were me checking it worked on different devices. For a while I genuinely thought that was about as good as it was going to get.
            </p>
            <p class="dm-text-ink-soft" style="margin:0 0 16px; font-family:${sans}; font-size:15px; line-height:1.7; color:${inkSoft};">
              A thousand of you have proved me very wrong, and you&#39;ve done it before the app even fully exists. <em style="font-family:${serif}; color:${ink};">Jazakumullahu khayran</em> for the trust. None of this works without you.
            </p>
            <p class="dm-text-ink" style="margin:0 0 22px; font-family:${sans}; font-size:15px; line-height:1.7; color:${ink}; font-weight:500;">
              A quick update on where things are behind the scenes:
            </p>
          </td>
        </tr>

        <!-- numbered points with images -->
        <tr>
          <td>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
              ${point(
                1,
                "email%20content.png",
                "Books being loaded into Dars",
                "Books are being loaded in.",
                "We&#39;ve been ingesting full Alimiyyah texts into the system, chapter by chapter, with summaries, key points, Arabic with harakat, and flashcards mapped to each baab. It&#39;s slower than I&#39;d like, but it has to be done properly. There is no point shipping a revision app that gets Quduri wrong.",
              )}
              ${point(
                2,
                "email%20halaqa.png",
                "Dars leaderboard for a study group",
                "The leaderboards are taking shape.",
                "Your year, your friends, your class &mdash; all on the leaderboard. Streaks, head-to-head quizzes, who&#39;s smashed which baab this week. We&#39;re making it competitive in the best way: the kind that has you opening the app on a Saturday morning instead of avoiding it. Sacred knowledge stays serious. The way you get it into your head doesn&#39;t have to be.",
              )}
              ${point(
                3,
                "email%20ai.png",
                "AI tutor inside Dars",
                "The AI tutor is getting smarter.",
                "We&#39;ve been training it to actually understand your year level, your madhab, and the specific books you&#39;re studying, so when you ask a question it points you to the right chapter and page rather than giving you a generic Wikipedia answer. It still defers to your ustad on anything fatwa-related. That part is non-negotiable.",
              )}
              ${point(
                4,
                "email%20quiz.png",
                "Polished Dars flashcard interface",
                "The app itself is being polished. Properly.",
                "The kind of polish where I find myself at 2am moving a button two pixels to the left because it was bothering me. Sacred knowledge deserves a UI that respects it, not something that looks like it was thrown together in a weekend.",
              )}
            </table>
          </td>
        </tr>

        <!-- closing body -->
        <tr>
          <td style="padding:8px 4px 0;">
            <p class="dm-text-ink-soft" style="margin:0 0 22px; font-family:${sans}; font-size:15px; line-height:1.7; color:${inkSoft};">
              We&#39;re getting close. I&#39;ll be sharing more soon, including some early previews for the people who&#39;ve been with us from the start.
            </p>
          </td>
        </tr>

        <!-- three things card -->
        <tr>
          <td class="dm-bg-card dm-border" style="background:${card}; border:1px solid ${border}; border-radius:20px; padding:30px 32px;">
            <p class="dm-text-ink-muted" style="margin:0 0 18px; font-family:${sans}; font-size:11px; font-weight:600; letter-spacing:0.14em; text-transform:uppercase; color:${inkMuted};">Three quick things before I go</p>

            <p class="dm-text-ink" style="margin:0 0 14px; font-family:${sans}; font-size:14.5px; line-height:1.65; color:${ink};">
              <strong style="font-weight:600;">If you have feedback, hit reply.</strong>
              <span class="dm-text-ink-soft" style="color:${inkSoft};"> Anything you want in the app, anything you wish existed for your books, anything you&#39;ve struggled with revising. I read every reply myself, and a lot of what we&#39;re building came directly from emails like this.</span>
            </p>

            <p class="dm-text-ink" style="margin:0 0 14px; font-family:${sans}; font-size:14.5px; line-height:1.65; color:${ink};">
              <strong style="font-weight:600;">For behind-the-scenes builds and sneak peeks, follow us:</strong>
            </p>

            <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 18px;">
              <tr>
                <td style="padding-right:10px;">
                  <a href="https://instagram.com/getdars" class="dm-bg-coral dm-text-white" style="display:inline-block; text-decoration:none; background:${coral}; color:#ffffff; padding:10px 18px 10px 14px; border-radius:999px; font-family:${sans}; font-size:14px; font-weight:500;">
                    <img src="https://cdn.simpleicons.org/instagram/FFFFFF" width="16" height="16" alt="" style="vertical-align:-3px; margin-right:8px; border:0;" />
                    <span class="dm-text-white" style="color:#ffffff; vertical-align:middle;">@getdars</span>
                  </a>
                </td>
                <td>
                  <a href="https://tiktok.com/@dars.app" class="dm-bg-coral dm-text-white" style="display:inline-block; text-decoration:none; background:${coral}; color:#ffffff; padding:10px 18px 10px 14px; border-radius:999px; font-family:${sans}; font-size:14px; font-weight:500;">
                    <img src="https://cdn.simpleicons.org/tiktok/FFFFFF" width="16" height="16" alt="" style="vertical-align:-3px; margin-right:8px; border:0;" />
                    <span class="dm-text-white" style="color:#ffffff; vertical-align:middle;">@dars.app</span>
                  </a>
                </td>
              </tr>
            </table>

            <p class="dm-text-ink" style="margin:0; font-family:${sans}; font-size:14.5px; line-height:1.65; color:${ink};">
              <strong style="font-weight:600;">Know students, ustads, or madrasahs who&#39;d benefit?</strong>
              <span class="dm-text-ink-soft" style="color:${inkSoft};"> Please keep sharing <a href="https://darsapp.com" class="dm-text-coral" style="color:${coral}; font-weight:500;">darsapp.com</a>.</span>
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
