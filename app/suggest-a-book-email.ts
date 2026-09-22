import { supportBlock } from "../lib/email/render.ts";

/**
 * "Which kitab next?" — the campaign email for /suggest-a-book.
 *
 * The page's one authored object is the SHELF: every title you type stands up
 * as a bound spine on a plank. This email carries the same shelf, because a
 * mail that drives people to that page and looks like every other card-stack
 * has thrown away the only thing that makes the page itself.
 *
 * The shelf survives the trip into email by giving up the one thing email
 * cannot do. Titles on the page run vertically up each spine (`writing-mode`,
 * which Outlook's Word engine does not have), so here the bindings are BLANK:
 * at 20px wide no lettering would be legible anyway, and inventing titles to
 * fill them would be fake specificity. What does survive is everything that
 * makes a spine read as a bound book rather than a coloured rectangle:
 *
 *   · THE ROUND. The same seven-stop gradient the page paints over each
 *     binding colour, so the spine is lightest a third of the way across and
 *     falls into shadow at both hinges. Outlook drops background-image and is
 *     left with the flat `bgcolor` underneath it, which is why the colour is
 *     set twice.
 *   · THE TOOLING. The gilt rule a binder works at the head and the tail,
 *     here as a hairline border on the top and bottom of the cell.
 *   · THE BANDS. Three of the nine are banded across the middle, the raised
 *     cords of a sewn binding picked out in the same foil. Enough to break the
 *     rhythm, not enough to become one. (The page's dark morocco title panel
 *     does NOT survive the trip: blank, at 20px wide, it reads as a hole
 *     punched through the book rather than a label, and a label with no
 *     lettering on it is not a label.)
 *
 * And the shelf is deliberately NOT full. It runs 226px along a plank that is
 * the full width of the card, so the empty stretch at the right is the whole
 * argument: there is room, tell us what goes in it. That is also the page's
 * own resting state, where the shelf fills as you type.
 *
 * Tables and inline styles only, and the palette is locked light with dm-*
 * anchors on every coloured element — same constraints as every other Dars
 * email. See lib/email/render.ts for why.
 */

// The bindings, and the plank, lifted from app/suggest-a-book/shelf.tsx so the
// email and the page are the same shelf: oxblood, forest, indigo-teal, tan
// calf, charcoal cloth, deep maroon.
const TONES = ["#8E3320", "#4A5C3E", "#2F646B", "#7A4F1C", "#3B362E", "#5F1F14"];

// The foil, as a solid hex rather than the page's `rgba(255,251,244,0.5)`:
// Word renders an unknown rgba() border as black, which would put a hard dark
// line across the head of every book. Each value is that same 50% cream
// composited onto its own binding, worked out once here instead.
const FOILS = ["#C6978A", "#A4AB99", "#97AFB2", "#BCA588", "#9D9891", "#AF8D84"];

// The three values of the plank: the lit top surface the books stand on, the
// board's own body, and the shadowed front edge under it.
const PLANK = { top: "#F7EFE0", body: "#D6C8AB", edge: "#BCAA88" };

// The round of the spine and the weave of the case, painted OVER the binding
// colour so each book keeps its own hue. Verbatim from the page.
const ROUND =
  "linear-gradient(90deg," +
  " rgba(18,12,8,0.34) 0%," +
  " rgba(18,12,8,0.14) 7%," +
  " rgba(255,252,246,0.10) 26%," +
  " rgba(255,252,246,0.13) 42%," +
  " rgba(255,252,246,0.03) 60%," +
  " rgba(18,12,8,0.10) 80%," +
  " rgba(18,12,8,0.30) 100%)";

/**
 * [width, height, tone index, banded]. 215px of books, gaps included, which
 * is what a 320px-wide client still has room for once the outer padding and
 * the card's own are taken off. A book wider than its neighbours is a thicker
 * book, and no two are the same height.
 */
const SHELF: Array<[number, number, number, boolean]> = [
  [21, 84, 0, false],
  [27, 96, 1, true],
  [17, 76, 2, false],
  [24, 104, 3, false],
  [19, 82, 4, true],
  [24, 90, 5, false],
  [18, 98, 2, false],
  [21, 80, 1, false],
  [20, 100, 0, true],
];

export type SuggestABookEmailOptions = {
  /** The one-click unsubscribe. The sender passes `{{unsubscribe_url}}`. */
  unsubscribeUrl?: string;
  /** The preference centre. The sender passes `{{preferences_url}}`. */
  preferencesUrl?: string;
};

export function buildSuggestABookEmail(options: SuggestABookEmailOptions = {}) {
  const href = "https://darsapp.com/suggest-a-book";
  const unsubscribeUrl = options.unsubscribeUrl ?? "https://darsapp.com/email/preferences";
  const preferencesUrl = options.preferencesUrl ?? "https://darsapp.com/email/preferences";

  /*
   * ONE accent value, used for the emphasised word, the button fill and the
   * sign-off, rather than the brand's coral-500 everywhere.
   *
   * coral-500 (#EC6144) is 2.71:1 on this card and 3.11:1 on the page, so it
   * fails even the 3:1 bar large display type is allowed, and white on it is
   * 3.30:1. coral-700 clears AA on all three: 5.25:1 on the card, 6.03:1 on
   * cream, 6.41:1 under white. It is also what /suggest-a-book's own button
   * uses. A deeper, quieter accent is the better-looking answer anyway; a
   * poster-bright fill is what makes a page read as a template.
   */
  const coral = "#A93824";
  const coralSoft = "#FFE3D6";
  const cream = "#FFF7EC";
  const card = "#FFFDF8";
  const border = "#EADFCB";
  const ink = "#1A1814";
  const inkSoft = "#3B372F";
  const inkMuted = "#6E6A5F";
  const serif = "Georgia, 'Times New Roman', serif";
  const sans =
    "'Figtree', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";

  // One binding. The colour is set as a bgcolor attribute, an inline
  // background and a dm-* class, because three different clients each need a
  // different one of those to survive dark mode.
  const spine = ([w, h, t, banded]: [number, number, number, boolean]) => {
    const tone = TONES[t];
    const foil = FOILS[t];
    const face = `background:${tone}; background-image:${ROUND};`;
    // 1px, not 2: on an 80px spine a 2px rule stops reading as tooling and
    // starts reading as a cap sitting on top of the book.
    const rule = (side: "top" | "bottom") => `border-${side}:1px solid ${foil};`;

    if (!banded) {
      return `<td width="${w}" valign="bottom" style="width:${w}px; padding:0;">
                <table role="presentation" width="${w}" cellspacing="0" cellpadding="0" border="0" style="width:${w}px; border-collapse:collapse;">
                  <tr><td class="dm-bind-${t}" bgcolor="${tone}" height="${h}" style="height:${h}px; line-height:${h}px; font-size:0; ${face} ${rule("top")} ${rule("bottom")} border-radius:2px 2px 0 0;">&nbsp;</td></tr>
                </table>
              </td>`;
    }

    // Banded: the raised cords of a sewn binding, picked out in the same foil
    // as the head and the tail. The band is the binding's own colour with a
    // hairline above and below it, so it catches light instead of punching a
    // hole through the book.
    const band = 10;
    const top = Math.round((h - band) / 2);
    const bottom = h - band - top;
    return `<td width="${w}" valign="bottom" style="width:${w}px; padding:0;">
              <table role="presentation" width="${w}" cellspacing="0" cellpadding="0" border="0" style="width:${w}px; border-collapse:collapse;">
                <tr><td class="dm-bind-${t}" bgcolor="${tone}" height="${top}" style="height:${top}px; line-height:${top}px; font-size:0; ${face} ${rule("top")} border-radius:2px 2px 0 0;">&nbsp;</td></tr>
                <tr><td class="dm-bind-${t}" bgcolor="${tone}" height="${band}" style="height:${band}px; line-height:${band}px; font-size:0; ${face} ${rule("top")} ${rule("bottom")}">&nbsp;</td></tr>
                <tr><td class="dm-bind-${t}" bgcolor="${tone}" height="${bottom}" style="height:${bottom}px; line-height:${bottom}px; font-size:0; ${face} ${rule("bottom")}">&nbsp;</td></tr>
              </table>
            </td>`;
  };

  const gap = `<td width="3" style="width:3px; font-size:0; line-height:0;">&nbsp;</td>`;
  const books = SHELF.map(spine).join(`\n${gap}\n`);

  const plankRow = (colour: string, h: number, cls: string, radius = "") =>
    `<tr><td class="${cls}" bgcolor="${colour}" height="${h}" style="height:${h}px; line-height:${h}px; font-size:0; background:${colour};${radius}">&nbsp;</td></tr>`;

  const shelf = `
    <table role="presentation" aria-hidden="true" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%; border-collapse:collapse;">
      <tr>
        <td align="left" valign="bottom" style="padding:0 0 0 1px;">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="border-collapse:collapse;">
            <tr>
              ${books}
            </tr>
          </table>
        </td>
      </tr>
    </table>
    <table role="presentation" aria-hidden="true" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%; border-collapse:collapse;">
      ${plankRow(PLANK.top, 1, "dm-plank-top")}
      ${plankRow(PLANK.body, 6, "dm-plank-body")}
      ${plankRow(PLANK.edge, 3, "dm-plank-edge", " border-radius:0 0 2px 2px;")}
    </table>`;

  // One line of the "what to send" card. The label carries the weight and the
  // detail sits under it: no numbered discs, no chips, no rule down the side.
  const line = (label: string, detail: string) => `
    <tr>
      <td style="padding:0 0 20px;">
        <p class="dm-text-ink" style="margin:0 0 3px; font-family:${sans}; font-size:15px; line-height:1.5; font-weight:600; color:${ink};">${label}</p>
        <p class="dm-text-ink-soft" style="margin:0; font-family:${sans}; font-size:14.5px; line-height:1.6; color:${inkSoft};">${detail}</p>
      </td>
    </tr>`;

  const darkVars = [
    ...TONES.map((tone, i) => [`.dm-bind-${i}`, `background-color: ${tone} !important;`]),
    [".dm-plank-top", `background-color: ${PLANK.top} !important;`],
    [".dm-plank-body", `background-color: ${PLANK.body} !important;`],
    [".dm-plank-edge", `background-color: ${PLANK.edge} !important;`],
    [".dm-bg-cream", `background-color: ${cream} !important;`],
    [".dm-bg-coral-soft", `background-color: ${coralSoft} !important;`],
    [".dm-bg-coral-deep", `background-color: ${coral} !important;`],
    [".dm-bg-card", `background-color: ${card} !important;`],
    [".dm-bg-ink", `background-color: ${ink} !important;`],
    [".dm-border", `border-color: ${border} !important;`],
    [".dm-text-ink", `color: ${ink} !important;`],
    [".dm-text-ink-soft", `color: ${inkSoft} !important;`],
    [".dm-text-ink-muted", `color: ${inkMuted} !important;`],
    [".dm-text-coral", `color: ${coral} !important;`],
    [".dm-text-white", `color: #ffffff !important;`],
  ] as Array<[string, string]>;

  const media = darkVars.map(([sel, rule]) => `    ${sel} { ${rule} }`).join("\n");
  const ogsc = darkVars.map(([sel, rule]) => `  [data-ogsc] ${sel} { ${rule} }`).join("\n");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="only light">
<meta name="supported-color-schemes" content="only light">
<title>Which kitab should Dars add next?</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Figtree:wght@300;400;500;600;700&display=swap');
  :root {
    color-scheme: only light;
    supported-color-schemes: only light;
  }
  /* Force the light palette even when the client is in dark mode. Without
     this the bindings invert into a row of pastel blocks and the plank turns
     into a dark bar the books appear to hang off. */
  @media (prefers-color-scheme: dark) {
${media}
  }
  /* Outlook.com, which uses an attribute rather than the media query. */
${ogsc}
</style>
</head>
<body class="dm-bg-cream dm-text-ink" style="margin:0; padding:0; background:${cream}; font-family:${sans}; color:${ink}; -webkit-font-smoothing:antialiased;">

<div style="display:none; overflow:hidden; line-height:1px; opacity:0; max-height:0; max-width:0;">
  There is room on the shelf. A title on its own is enough.
</div>

<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" class="dm-bg-cream" style="background:${cream}; padding:40px 16px;">
  <tr>
    <td align="center">
      <table role="presentation" width="560" cellspacing="0" cellpadding="0" border="0" style="max-width:560px; width:100%;">

        <!-- brand -->
        <tr>
          <td style="padding: 0 4px 28px;">
            <img src="https://darsapp.com/assets/img/logo.png" width="30" height="30" alt="Dars" style="display:inline-block; width:30px; height:30px; border-radius:8px; vertical-align:middle; border:0; outline:none; text-decoration:none;" />
            <span class="dm-text-ink" style="vertical-align:middle; margin-left:10px; font-family:${sans}; font-size:18px; font-weight:600; letter-spacing:-0.01em; color:${ink};">Dars</span>
          </td>
        </tr>

        <!-- hero: the shelf leads, and the ask sits under it -->
        <tr>
          <td class="dm-bg-coral-soft" style="background:${coralSoft}; border-radius:24px; padding:36px 32px 38px;">

            ${shelf}

            <h1 class="dm-text-ink" style="margin:26px 0 14px; font-family:${sans}; font-size:38px; line-height:1.05; font-weight:500; letter-spacing:-0.02em; color:${ink};">
              Which kitab <span class="dm-text-coral" style="font-family:${serif}; font-style:italic; color:${coral}; font-weight:400;">next?</span>
            </h1>

            <p class="dm-text-ink-soft" style="margin:0 0 26px; font-family:${sans}; font-size:15px; line-height:1.6; color:${inkSoft};">
              You know what your madrasah actually teaches better than we do. Tell us which books you want in Dars, and the ones asked for most are the ones we build next. A title on its own is enough.
            </p>

            <table role="presentation" cellspacing="0" cellpadding="0" border="0">
              <tr>
                <td class="dm-bg-coral-deep" bgcolor="${coral}" style="background:${coral}; border-radius:999px;">
                  <a href="${href}" class="dm-text-white" style="display:inline-block; padding:14px 28px; font-family:${sans}; font-size:15px; font-weight:600; line-height:20px; color:#ffffff; text-decoration:none; border-radius:999px;">Suggest a book</a>
                </td>
              </tr>
            </table>

          </td>
        </tr>

        <tr><td style="height:20px; line-height:20px; font-size:0;">&nbsp;</td></tr>

        <!-- what to send: the form's three fields, said plainly -->
        <tr>
          <td class="dm-bg-card dm-border" style="background:${card}; border:1px solid ${border}; border-radius:20px; padding:30px 32px 12px;">
            <p class="dm-text-ink-muted" style="margin:0 0 20px; font-family:${sans}; font-size:11px; font-weight:600; letter-spacing:0.14em; text-transform:uppercase; color:${inkMuted};">What to send</p>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
              ${line("The title.", "&ldquo;Quduri&rdquo; is enough. Spell it however you say it.")}
              ${line("Which one, if it matters.", "The edition, the volume, or the commentary you read it with. Not the author: you already know who wrote it, and the answer that changes what we build is which one.")}
              ${line("Why, in a line.", "What you would use it for tells us what to build around it.")}
            </table>
            <p class="dm-text-ink-muted" style="margin:0 0 18px; font-family:${sans}; font-size:13.5px; line-height:1.6; color:${inkMuted};">
              Twelve books fit in one form, and there is no limit on how often you send it.
            </p>
          </td>
        </tr>

        <tr><td style="height:28px; line-height:28px; font-size:0;">&nbsp;</td></tr>

        <!-- whatsapp group + donations (shared with every Dars email) -->
        ${supportBlock()}

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
            <p class="dm-text-ink-muted" style="margin:0; font-family:${sans}; font-size:12px; line-height:1.6; color:${inkMuted};">
              You&#39;re receiving this because you signed up to Dars.<br>
              <a href="${preferencesUrl}" class="dm-text-ink-muted" style="color:${inkMuted}; text-decoration:underline;">Choose what we email you</a>
              &nbsp;&middot;&nbsp;
              <a href="${unsubscribeUrl}" class="dm-text-ink-muted" style="color:${inkMuted}; text-decoration:underline;">Unsubscribe</a>
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
