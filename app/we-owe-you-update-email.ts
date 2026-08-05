// HTML "we owe you a big update" email — the long-overdue update after a
// quiet stretch. Honest note on why it's been silent (one-man job, client
// work + driive.app + life), the big feature coming (live lesson recording
// with transcript + Urdu/Arabic translation + auto summary/cards/questions),
// a rough September launch timeline, then the standard donate / socials /
// share footer. Mirrors the cream + coral palette, Figtree + Georgia type,
// table layout and dark-mode lockout of the other Dars emails.
export function buildWeOweYouUpdateEmail() {
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

  // Dars in-app palette + fonts, so the mockup renders the real (approved)
  // record screen — parchment / ink-green / teal, no coral. See
  // docs/superpowers/specs/2026-07-24-live-lesson-capture-design.md §9.
  const appParch = "#F5F0E8";
  const appCard = "#FFFDF8";
  const appInk = "#1B3A2D";
  const appBorder = "#E2DAC8";
  const appTeal = "#3B7A82";
  const appTealDeep = "#2F6169";
  const appMuted = "#8A8272";
  const appMuted2 = "#6B6456";
  const appRec = "#B4472F";
  const appSans =
    "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";
  const appSerif = "'Cormorant Garamond', Georgia, 'Times New Roman', serif";
  const appArabic =
    "'Amiri', 'Geeza Pro', 'Scheherazade New', 'Times New Roman', serif";

  // small vertical timeline row
  const milestone = (
    when: string,
    title: string,
    body: string,
    last = false,
  ) => `
    <tr>
      <td valign="top" style="width:96px; padding:0 16px ${last ? "0" : "20px"} 0;">
        <p class="dm-text-coral" style="margin:0; font-family:${sans}; font-size:12.5px; font-weight:700; line-height:1.4; color:${coralDeep};">${when}</p>
      </td>
      <td valign="top" style="padding:0 0 ${last ? "0" : "20px"};">
        <p class="dm-text-ink" style="margin:0 0 3px; font-family:${sans}; font-size:15px; line-height:1.4; font-weight:600; color:${ink}; letter-spacing:-0.005em;">${title}</p>
        <p class="dm-text-ink-soft" style="margin:0; font-family:${sans}; font-size:14px; line-height:1.6; color:${inkSoft};">${body}</p>
      </td>
    </tr>
  `;

  // teal waveform bar for the recorder bar
  const tbar = (h: number) =>
    `<span style="display:inline-block; width:3px; height:${h}px; background:${appTeal}; border-radius:2px; margin:0 2px; vertical-align:middle;">&nbsp;</span>`;
  const appWave = [6, 12, 20, 26, 14, 22, 8, 18, 25, 11, 16, 9, 23, 13, 19, 7, 21, 10]
    .map(tbar)
    .join("");

  // one transcript segment: language label · source (rtl, own script) · English beneath
  const seg = (lang: string, src: string, size: number, en: string) => `
    <div style="margin:13px 0 0;">
      <div style="font-family:${appSans}; font-size:9.5px; font-weight:700; letter-spacing:0.14em; text-transform:uppercase; color:${appMuted}; margin-bottom:4px;">${lang}</div>
      <div dir="rtl" style="font-family:${appArabic}; font-size:${size}px; line-height:1.75; color:${appInk}; direction:rtl; text-align:right;">${src}</div>
      <div style="font-family:${appSans}; font-size:13px; line-height:1.55; color:${appMuted2}; border-left:2px solid rgba(59,122,130,.35); padding-left:10px; margin-top:6px;">${en}</div>
    </div>`;

  // the approved "Variant A" record screen, rendered email-safe inside a phone frame
  const phoneMock = `
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin:0 auto;">
    <tr>
      <td style="width:326px; max-width:326px;">
        <div style="background:${appParch}; border:1px solid #d9d0bd; border-radius:32px; overflow:hidden;">

          <!-- top bar -->
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
            <tr>
              <td valign="middle" style="padding:15px 16px 5px;">
                <span style="font-family:${appSerif}; font-size:22px; color:${appInk}; vertical-align:middle;">&#8249;</span>
                <span style="display:inline-block; width:8px; height:8px; border-radius:999px; background:${appRec}; vertical-align:middle; margin:0 9px;">&nbsp;</span>
                <span style="font-family:${appSans}; font-size:13px; font-weight:700; color:${appInk}; vertical-align:middle;">Recording</span>
              </td>
              <td valign="middle" align="right" style="padding:15px 16px 5px;">
                <span style="font-family:${appSans}; font-size:15px; font-weight:700; color:${appInk};">12:41</span>
              </td>
            </tr>
          </table>

          <!-- book / chapter link chip -->
          <div style="padding:2px 16px 6px;">
            <span style="display:inline-block; background:rgba(59,122,130,.10); color:${appTealDeep}; border:1px solid rgba(59,122,130,.22); padding:6px 11px; border-radius:11px; font-family:${appSans}; font-size:12px; font-weight:600;">&#128214;&nbsp; <span style="font-family:${appSerif}; font-weight:700;">Hidāyah</span> &middot; Kitāb aṭ-Ṭahārah</span>
          </div>

          <!-- transcript label + English toggle -->
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
            <tr>
              <td style="padding:2px 16px 0;"><span style="font-family:${appSans}; font-size:10.5px; font-weight:700; letter-spacing:0.13em; text-transform:uppercase; color:${appMuted};">Live transcript</span></td>
              <td align="right" style="padding:2px 16px 0;"><span style="font-family:${appSans}; font-size:11px; font-weight:700; color:${appTeal};">English &#10003;</span></td>
            </tr>
          </table>

          <!-- transcript body -->
          <div style="padding:4px 16px 2px;">
            ${seg(
              "ARABIC &middot; QURʾĀN 5:6",
              "فَاغْسِلُوا وُجُوهَكُمْ وَأَيْدِيَكُمْ إِلَى الْمَرَافِقِ",
              20,
              "…wash your faces and your hands up to the elbows.",
            )}
            ${seg(
              "URDU",
              "اس آیت سے فقہاء نے وضو کے چار فرض ثابت کیے ہیں۔",
              18,
              "From this verse the fuqahāʾ established the four obligatory acts of wuḍūʾ.",
            )}
            <div style="margin:15px 0 4px;">
              <div style="font-family:${appSans}; font-size:9.5px; font-weight:700; letter-spacing:0.14em; text-transform:uppercase; color:${appTeal}; margin-bottom:4px;">MIXED &middot; <span style="color:${appTeal};">&#9679; LIVE</span></div>
              <div dir="rtl" style="font-family:${appArabic}; font-size:18px; line-height:1.95; color:${appInk}; direction:rtl; text-align:right;">اب دیکھیں، «<span style="color:${appTealDeep};">فَاغْسِلُوا</span>» کا صیغہ <span style="unicode-bidi:isolate; direction:ltr; font-family:${appSans}; font-size:0.78em; font-weight:600;">command</span> کے لیے ہے، <span style="unicode-bidi:isolate; direction:ltr; font-family:${appSans}; font-size:0.78em; font-weight:600;">so basically</span> یہ <span style="unicode-bidi:isolate; direction:ltr; font-family:${appSans}; font-size:0.78em; font-weight:600;">washing the face</span> کو فرض بنا دیتا ہے</div>
              <div style="font-family:${appSans}; font-size:13px; line-height:1.55; color:${appMuted2}; border-left:2px solid rgba(59,122,130,.35); padding-left:10px; margin-top:6px;">Now look, the form «fāghsilū» is for a command, so it makes washing the face obligatory here.</div>
            </div>
          </div>

          <!-- recorder bar -->
          <div style="background:${appCard}; border-top:1px solid ${appBorder}; padding:13px 16px 18px;">
            <div style="text-align:center; height:30px; line-height:30px; margin-bottom:12px;">${appWave}</div>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
              <tr>
                <td style="width:108px; padding-right:10px;">
                  <div style="border:1px solid ${appBorder}; border-radius:13px; padding:12px; text-align:center; font-family:${appSans}; font-size:14px; font-weight:700; color:${appInk};">Pause</div>
                </td>
                <td>
                  <div style="background:${appInk}; border-radius:13px; padding:12px; text-align:center; font-family:${appSans}; font-size:14px; font-weight:700; color:#ffffff;">End lesson</div>
                </td>
              </tr>
            </table>
          </div>

        </div>
      </td>
    </tr>
  </table>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="only light">
<meta name="supported-color-schemes" content="only light">
<title>We owe you a big update</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Figtree:wght@300;400;500;600;700&family=DM+Sans:wght@400;500;600;700&family=Cormorant+Garamond:wght@600;700&family=Amiri:wght@400;700&display=swap');
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
  It&#39;s been quiet, I know. Here&#39;s where Dars has been, and the big thing coming next.
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
            <p class="dm-text-coral" style="margin:0 0 14px; font-family:${sans}; font-size:11px; letter-spacing:0.14em; text-transform:uppercase; color:${coralDeep}; font-weight:600;">◆ A long-overdue update</p>
            <h1 class="dm-text-ink" style="margin:0 0 18px; font-family:${sans}; font-size:40px; line-height:1.05; font-weight:500; letter-spacing:-0.02em; color:${ink};">
              We owe you a <span class="dm-text-coral" style="font-family:${serif}; font-style:italic; color:${coralDeep}; font-weight:400;">big update.</span>
            </h1>
            <p class="dm-text-ink-soft" style="margin:0; font-family:${sans}; font-size:15px; line-height:1.65; color:${inkSoft};">
              Assalamu alaykum. It&#39;s been quiet from us for a while, and you deserve to know exactly where Dars has been and what&#39;s coming next.
            </p>
          </td>
        </tr>

        <tr><td style="height:24px; line-height:24px; font-size:0;">&nbsp;</td></tr>

        <!-- honest intro -->
        <tr>
          <td style="padding:0 4px 8px;">
            <p class="dm-text-ink-soft" style="margin:0 0 16px; font-family:${sans}; font-size:15px; line-height:1.7; color:${inkSoft};">
              Dars went quiet for a stretch, and you deserve an explanation. <strong class="dm-text-ink" style="color:${ink}; font-weight:600;">It&#39;s a small operation right now.</strong> Our contributors keep the content coming, and the app is still built by myself. Alongside it, things have simply been busy: another product in the works (<a href="https://driive.app" class="dm-text-coral" style="color:${coralDeep}; font-weight:500;">driive.app</a>, a tool for driving instructors), and normal life on top. With all of that at once, Dars had to slow down for a while.
            </p>
            <p class="dm-text-ink-soft" style="margin:0 0 22px; font-family:${sans}; font-size:15px; line-height:1.7; color:${inkSoft};">
              But Dars never went anywhere. It just went quiet while I kept everything else standing. <em style="font-family:${serif}; color:${ink};">Jazakumullahu khayran</em> for staying patient; the fact that you&#39;re still here means a lot.
            </p>
          </td>
        </tr>

        <!-- the turn -->
        <tr>
          <td class="dm-bg-card dm-border" style="background:${card}; border:1px solid ${border}; border-radius:20px; padding:28px 32px;">
            <p class="dm-text-ink-muted" style="margin:0 0 8px; font-family:${sans}; font-size:11px; font-weight:600; letter-spacing:0.14em; text-transform:uppercase; color:${inkMuted};">The good news</p>
            <p class="dm-text-ink" style="margin:0; font-family:${sans}; font-size:19px; line-height:1.45; font-weight:600; color:${ink}; letter-spacing:-0.01em;">
              From August, I&#39;m back on Dars <span class="dm-text-coral" style="font-family:${serif}; font-style:italic; font-weight:400; color:${coralDeep};">properly.</span> Full focus, with big new features on the way.
            </p>
          </td>
        </tr>

        <tr><td style="height:32px; line-height:32px; font-size:0;">&nbsp;</td></tr>

        <!-- feature: eyebrow + headline -->
        <tr>
          <td style="padding:0 4px 14px;">
            <p class="dm-text-coral" style="margin:0 0 6px; font-family:${sans}; font-size:11px; font-weight:600; letter-spacing:0.14em; text-transform:uppercase; color:${coralDeep};">New feature &middot; Coming early September</p>
            <p class="dm-text-ink" style="margin:0; font-family:${sans}; font-size:26px; line-height:1.15; font-weight:600; color:${ink}; letter-spacing:-0.015em;">
              Record your dars. Keep <span class="dm-text-coral" style="font-family:${serif}; font-style:italic; font-weight:400; color:${coralDeep};">every word.</span>
            </p>
          </td>
        </tr>

        <!-- feature: the pitch -->
        <tr>
          <td style="padding:0 4px 20px;">
            <p class="dm-text-ink-soft" style="margin:0; font-family:${sans}; font-size:15px; line-height:1.7; color:${inkSoft};">
              This is the big one I&#39;ve been building for you. In your next lesson, just press record and <em style="font-family:${serif}; color:${ink};">listen.</em> Dars writes down every word as your ustadh speaks. Teaching in Urdu or Arabic? You get the <strong class="dm-text-ink" style="color:${ink}; font-weight:600;">original and clear English, side by side.</strong> When the lesson ends, your summary, key points and revision cards are ready. Each card comes with its own quiz, linked to the right book and chapter.
            </p>
            <p class="dm-text-ink-soft" style="margin:16px 0 0; font-family:${sans}; font-size:15px; line-height:1.7; color:${inkSoft};">
              It lives in a new <strong class="dm-text-ink" style="color:${ink}; font-weight:600;">Lessons</strong> tab, and it&#39;s the one going out first. I&#39;m building it for students who were just like me: sat in the dars, never understanding a word of the Urdu. Now none of it has to pass you by.
            </p>
          </td>
        </tr>

        <!-- feature: the real record screen, rendered accurately -->
        <tr>
          <td align="center" style="padding:0;">
            ${phoneMock}
          </td>
        </tr>

        <tr><td style="height:30px; line-height:30px; font-size:0;">&nbsp;</td></tr>

        <!-- feature: what it does -->
        <tr>
          <td style="padding:0 8px;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
              ${[
                ["A live transcript", "written as your ustadh speaks, so no more scrambling to write and listen at once."],
                ["Every language, its own script", "Urdu, Arabic and English, even mixed in one sentence, kept verbatim with harakat and clear English beneath."],
                ["A full, detailed summary", "everything taught, organised, the instant the lesson ends."],
                ["A deck of cards, each with a quiz", "generated from what was actually taught, straight into your revision and spaced repetition."],
                ["Pinned to the right place", "automatically linked to the book and chapter you were on."],
              ]
                .map(
                  ([t, b]) => `
              <tr>
                <td valign="top" style="width:26px; padding:0 0 12px;">
                  <span class="dm-text-coral" style="font-family:${serif}; font-size:17px; color:${coralDeep};">&#9670;</span>
                </td>
                <td valign="top" style="padding:0 0 12px;">
                  <p class="dm-text-ink" style="margin:0; font-family:${sans}; font-size:14.5px; line-height:1.6; color:${inkSoft};"><strong class="dm-text-ink" style="color:${ink}; font-weight:600;">${t}</strong>: ${b}</p>
                </td>
              </tr>`,
                )
                .join("")}
            </table>
          </td>
        </tr>

        <tr><td style="height:8px; line-height:8px; font-size:0;">&nbsp;</td></tr>

        <!-- feature: the hook -->
        <tr>
          <td style="padding:0 8px 8px;">
            <p class="dm-text-ink" style="margin:0; font-family:${serif}; font-size:21px; line-height:1.4; font-style:italic; color:${ink};">
              You walk into dars to listen. You walk out with your revision already done.
            </p>
          </td>
        </tr>

        <tr><td style="height:26px; line-height:26px; font-size:0;">&nbsp;</td></tr>

        <!-- CTA: join the beta -->
        <tr>
          <td align="center" style="padding:0 8px;">
            <a href="https://darsapp.com/beta-access" class="dm-bg-coral dm-text-white" style="display:inline-block; text-decoration:none; background:${coral}; color:#ffffff; padding:15px 32px; border-radius:999px; font-family:${sans}; font-size:15px; font-weight:600;">
              <span class="dm-text-white" style="color:#ffffff;">Join the Dars beta &rarr;</span>
            </a>
            <p class="dm-text-ink-soft" style="margin:13px 0 0; font-family:${sans}; font-size:13px; line-height:1.5; color:${inkMuted};">
              Get in early and be first to try live lessons.
            </p>
          </td>
        </tr>

        <tr><td style="height:36px; line-height:36px; font-size:0;">&nbsp;</td></tr>

        <!-- timeline -->
        <tr>
          <td style="padding:0 4px 16px;">
            <p class="dm-text-ink-muted" style="margin:0 0 4px; font-family:${sans}; font-size:11px; font-weight:600; letter-spacing:0.14em; text-transform:uppercase; color:${inkMuted};">The rough plan</p>
            <p class="dm-text-ink" style="margin:0; font-family:${sans}; font-size:18px; line-height:1.4; font-weight:600; color:${ink}; letter-spacing:-0.01em;">
              Where we&#39;re headed.
            </p>
          </td>
        </tr>

        <tr>
          <td class="dm-bg-card dm-border" style="background:${card}; border:1px solid ${border}; border-radius:20px; padding:28px 30px;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
              ${milestone("August", "Back to building, full-time", "Dars gets my full attention again, and the roadmap starts moving properly.")}
              ${milestone("Early Sept", "A soft launch", "Live lesson recording in your hands, while the content library keeps growing behind it, inshaAllah.")}
              ${milestone("Ongoing", "More books, more content", "We keep loading in your texts and pushing the content forward, week after week.", true)}
            </table>
          </td>
        </tr>

        <tr><td style="height:20px; line-height:20px; font-size:0;">&nbsp;</td></tr>

        <tr>
          <td style="padding:0 4px;">
            <p class="dm-text-ink-soft" style="margin:0; font-family:${sans}; font-size:14px; line-height:1.65; color:${inkMuted};">
              Solo-dev timelines move a little, so treat these as honest aims, but that&#39;s the direction, and I&#39;m excited for you to see it.
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
            <p class="dm-text-ink-muted" style="margin:0 0 4px; font-family:${sans}; font-size:11px; font-weight:600; letter-spacing:0.14em; text-transform:uppercase; color:${inkMuted};">If you&#39;d like to help</p>
            <p class="dm-text-ink" style="margin:0; font-family:${sans}; font-size:18px; line-height:1.4; font-weight:600; color:${ink}; letter-spacing:-0.01em;">
              There are a few ways to keep this moving.
            </p>
          </td>
        </tr>

        <!-- support body -->
        <tr>
          <td style="padding:0 4px 18px;">
            <p class="dm-text-ink-soft" style="margin:0; font-family:${sans}; font-size:15px; line-height:1.7; color:${inkSoft};">
              Dars is still built out of my own pocket: AI credits, hosting, tools, all of it. Anything genuinely keeps things moving, and sharing it helps just as much.
            </p>
          </td>
        </tr>

        <!-- donate pills -->
        <tr>
          <td style="padding:0 4px 20px;">
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

        <!-- share card -->
        <tr>
          <td class="dm-bg-coral-soft" style="background:${coralSoft}; border-radius:20px; padding:26px 30px;">
            <p class="dm-text-ink" style="margin:0 0 4px; font-family:${sans}; font-size:16px; line-height:1.45; font-weight:600; color:${ink}; letter-spacing:-0.005em;">
              Know a student, ustadh, or madrasah who&#39;d want this?
            </p>
            <p class="dm-text-ink-soft" style="margin:0; font-family:${sans}; font-size:14.5px; line-height:1.65; color:${inkSoft};">
              Sending them <a href="https://darsapp.com" class="dm-text-coral" style="color:${coralDeep}; font-weight:600;">darsapp.com</a> is the single biggest thing you can do to help right now.
            </p>
          </td>
        </tr>

        <tr><td style="height:32px; line-height:32px; font-size:0;">&nbsp;</td></tr>

        <!-- closing -->
        <tr>
          <td style="padding:0 4px;">
            <p class="dm-text-ink-soft" style="margin:0; font-family:${serif}; font-style:italic; font-size:15px; line-height:1.7; color:${inkSoft};">
              Thank you for your patience, and for still being here. The best of Dars is genuinely still ahead, and it&#39;s close now.
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
                    More soon, and much sooner this time, inshaAllah.
                  </p>
                  <p class="dm-text-ink" style="margin:18px 0 2px; font-family:${sans}; font-size:14.5px; line-height:1.6; color:${ink}; font-weight:500;">
                    Mohammed
                  </p>
                  <p class="dm-text-coral" style="margin:0; font-family:${serif}; font-style:italic; font-size:14px; line-height:1.6; color:${coralDeep};">
                    Founder, Dars &middot; <a href="https://darsapp.com" class="dm-text-coral" style="color:${coralDeep};">darsapp.com</a>
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
              You&#39;re getting this because you signed up to Dars.<br>
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
