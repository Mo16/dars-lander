// ---------------------------------------------------------------------------
// GENERATED FILE — DO NOT EDIT.
//
// Copied from dars-admin/lib/email/render.ts by
// `npm run sync:email-renderer`. Edit the canonical file there and re-run the
// script; edits made here will be overwritten without warning.
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Dars email renderer — the single source of truth for what an email looks
// like.
//
// CANONICAL COPY. `npm run sync:email-renderer` copies this file verbatim to
// dars-app/supabase/functions/_email/render.ts so the edge function that
// actually sends is rendering byte-identically to the preview in the admin
// composer. Never edit the copy; edit this file and re-run the script.
//
// Constraints this file is written under:
//   * Zero imports. It has to run unchanged in Node (Next.js server) and in
//     Deno (Supabase edge function).
//   * Tables and inline styles only. Gmail strips <style> blocks in some
//     contexts, Outlook uses Word's rendering engine, and neither supports
//     flexbox or grid. The <style> block we do emit carries only the
//     dark-mode overrides, which degrade harmlessly when stripped.
//   * The palette is locked light. Email clients auto-invert dark mode and
//     make a cream/coral brand look filthy, so every coloured element carries
//     a dm-* class anchor that the media query and Outlook's [data-ogsc]
//     attribute selector force back.
//
// The shell is lifted from the hand-built dars-landing emails
// (app/waitlist-email.ts and friends) so imported templates render exactly as
// they do today. Do not "modernise" the palette here — it is the brand.
// ---------------------------------------------------------------------------

// --- Brand -----------------------------------------------------------------

export const PALETTE = {
  coral: "#EC6144",
  coralSoft: "#FFE3D6",
  cream: "#FFF7EC",
  card: "#FFFDF8",
  border: "#EADFCB",
  ink: "#1A1814",
  inkSoft: "#3B372F",
  inkMuted: "#6E6A5F",
  inkSubtle: "#9A9488",
  white: "#FFFFFF",
} as const;

const SERIF = "Georgia, 'Times New Roman', serif";
const SANS =
  "'Figtree', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";

const LOGO_URL = "https://darsapp.com/assets/img/logo.png";
const SITE_URL = "https://darsapp.com";

// --- Block types -----------------------------------------------------------

export type Align = "left" | "center";

export type EmailBlock =
  /** The signature coral panel. One per email, at the top, or none at all. */
  | {
      type: "hero";
      eyebrow?: string;
      heading: string;
      /** Rendered in italic serif coral — the one emphasis per headline. */
      accent?: string;
      body?: string;
    }
  | { type: "heading"; text: string; level?: 1 | 2; align?: Align }
  | { type: "text"; text: string; size?: "lead" | "normal" | "small"; align?: Align }
  | { type: "button"; label: string; href: string; align?: Align; style?: "solid" | "quiet" }
  | { type: "stat_row"; stats: { value: string; label: string }[] }
  | {
      type: "book_card";
      title: string;
      subtitle?: string;
      meta?: string;
      href?: string;
    }
  /**
   * Something the recipient themselves sent us, quoted back to them: a bug
   * report, an application, a request. Unlike every other block, its `body`
   * and `details` are THEIR words, so they are escaped verbatim — no inline
   * markdown, no merge tags. A `**` in a bug report is two asterisks.
   */
  | {
      type: "record_card";
      meta?: string;
      title?: string;
      body?: string;
      details?: { label: string; value: string }[];
    }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "list"; style?: "numbered" | "plain"; items: { title: string; body?: string }[] }
  | { type: "image"; src: string; alt: string; href?: string; width?: number }
  | { type: "divider" }
  | { type: "spacer"; size?: "sm" | "md" | "lg" }
  | { type: "markdown"; markdown: string }
  | { type: "html"; html: string };

export type EmailTemplateInput = {
  subject: string;
  preheader?: string;
  bodyMode: "blocks" | "markdown" | "html";
  blocks?: EmailBlock[];
  markdown?: string;
  html?: string;
  category?: string;
};

export type MergeContext = Record<string, string | number | null | undefined>;

export type RenderResult = {
  subject: string;
  html: string;
  text: string;
  /** Merge tags referenced by the template that the context didn't supply. */
  missingTags: string[];
};

// --- Escaping and safety ---------------------------------------------------

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Only these schemes may appear in an href. Anything else (javascript:,
// data:, vbscript:) collapses to '#', because template bodies are authored in
// a web form and a stored-XSS vector in an email that goes to thousands of
// people is not a theoretical problem.
function safeUrl(raw: string): string {
  const trimmed = (raw ?? "").trim();
  if (!trimmed) return "#";
  if (/^(https?:|mailto:|tel:)/i.test(trimmed)) return escapeHtml(trimmed);
  // Bare domains and site-relative paths are convenience, not a vector.
  if (/^\//.test(trimmed)) return escapeHtml(SITE_URL + trimmed);
  if (/^[\w.-]+\.[a-z]{2,}(\/|$)/i.test(trimmed)) return escapeHtml("https://" + trimmed);
  return "#";
}

// --- Merge tags ------------------------------------------------------------

const TAG_PATTERN = /\{\{\s*([a-z0-9_]+)\s*\}\}/gi;

/**
 * Substitute {{tags}} from the context. An unknown tag renders as an empty
 * string — never as a literal "{{streak}}" landing in someone's inbox — and
 * is reported back so the composer can warn before the template goes live.
 */
function applyTags(input: string, ctx: MergeContext, missing: Set<string>): string {
  if (!input) return "";
  return input.replace(TAG_PATTERN, (_match, name: string) => {
    const key = name.toLowerCase();
    const value = ctx[key];
    if (value === undefined || value === null || value === "") {
      missing.add(key);
      return "";
    }
    return String(value);
  });
}

/** Merge tags → escaped HTML → the small inline markup subset. */
function inline(raw: string, ctx: MergeContext, missing: Set<string>): string {
  const merged = applyTags(raw ?? "", ctx, missing);
  let out = escapeHtml(merged);

  // [label](url) — the url is re-unescaped for validation, then re-escaped by
  // safeUrl, so an attacker can't smuggle a quote out of the attribute.
  out = out.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, label: string, url: string) => {
    const href = safeUrl(url.replace(/&amp;/g, "&").replace(/&#39;/g, "'"));
    return `<a href="${href}" class="dm-text-coral" style="color:${PALETTE.coral}; font-weight:600; text-decoration:underline;">${label}</a>`;
  });

  out = out.replace(/\*\*([^*]+)\*\*/g, `<strong style="font-weight:600;">$1</strong>`);
  out = out.replace(/(^|[\s(])_([^_]+)_(?=[\s.,!?)]|$)/g, `$1<em>$2</em>`);
  out = out.replace(/\n/g, "<br>");
  return out;
}

/**
 * Someone else's words, reproduced exactly. Escaped, newlines preserved, and
 * deliberately NOT run through `inline` or `applyTags`: text a user typed into
 * the app is content, not template source, and letting it carry markup or
 * resolve merge tags would be both wrong and a small injection surface.
 */
function verbatim(raw: string): string {
  return escapeHtml(raw ?? "").replace(/\r?\n/g, "<br>");
}

// --- Layout helpers --------------------------------------------------------

function row(content: string): string {
  return `<tr><td style="padding:0 4px;">${content}</td></tr>`;
}

function gap(px: number): string {
  return `<tr><td style="height:${px}px; line-height:${px}px; font-size:0;">&nbsp;</td></tr>`;
}

// --- Block renderers -------------------------------------------------------

function renderHero(
  block: Extract<EmailBlock, { type: "hero" }>,
  ctx: MergeContext,
  missing: Set<string>,
): string {
  const eyebrow = block.eyebrow
    ? `<p class="dm-text-coral" style="margin:0 0 14px; font-family:${SANS}; font-size:11px; letter-spacing:0.14em; text-transform:uppercase; color:${PALETTE.coral}; font-weight:600;">${inline(block.eyebrow, ctx, missing)}</p>`
    : "";
  const accent = block.accent
    ? ` <span class="dm-text-coral" style="font-family:${SERIF}; font-style:italic; color:${PALETTE.coral}; font-weight:400;">${inline(block.accent, ctx, missing)}</span>`
    : "";
  const body = block.body
    ? `<p class="dm-text-ink-soft" style="margin:16px 0 0; font-family:${SANS}; font-size:15px; line-height:1.6; color:${PALETTE.inkSoft};">${inline(block.body, ctx, missing)}</p>`
    : "";

  return `<tr>
  <td class="dm-bg-coral-soft" style="background:${PALETTE.coralSoft}; border-radius:24px; padding:44px 36px;">
    ${eyebrow}
    <h1 class="dm-text-ink" style="margin:0; font-family:${SANS}; font-size:40px; line-height:1.05; font-weight:500; letter-spacing:-0.02em; color:${PALETTE.ink};">${inline(block.heading, ctx, missing)}${accent}</h1>
    ${body}
  </td>
</tr>`;
}

function renderHeading(
  block: Extract<EmailBlock, { type: "heading" }>,
  ctx: MergeContext,
  missing: Set<string>,
): string {
  const size = block.level === 2 ? 20 : 26;
  const align = block.align ?? "left";
  return row(
    `<h2 class="dm-text-ink" style="margin:0; font-family:${SANS}; font-size:${size}px; line-height:1.25; font-weight:600; letter-spacing:-0.015em; color:${PALETTE.ink}; text-align:${align};">${inline(block.text, ctx, missing)}</h2>`,
  );
}

function renderText(
  block: Extract<EmailBlock, { type: "text" }>,
  ctx: MergeContext,
  missing: Set<string>,
): string {
  const map = {
    lead: { size: "16.5px", color: PALETTE.inkSoft },
    normal: { size: "14.5px", color: PALETTE.inkSoft },
    small: { size: "12.5px", color: PALETTE.inkMuted },
  } as const;
  const style = map[block.size ?? "normal"];
  const cls = block.size === "small" ? "dm-text-ink-muted" : "dm-text-ink-soft";
  return row(
    `<p class="${cls}" style="margin:0; font-family:${SANS}; font-size:${style.size}; line-height:1.65; color:${style.color}; text-align:${block.align ?? "left"};">${inline(block.text, ctx, missing)}</p>`,
  );
}

function renderButton(
  block: Extract<EmailBlock, { type: "button" }>,
  ctx: MergeContext,
  missing: Set<string>,
): string {
  const href = safeUrl(applyTags(block.href, ctx, missing));
  const label = inline(block.label, ctx, missing);
  const align = block.align ?? "left";

  // Quiet variant is a plain coral link, for a secondary action that
  // shouldn't compete with the primary one. Deliberately NOT an outlined
  // twin of the solid button.
  if (block.style === "quiet") {
    return row(
      `<p style="margin:0; text-align:${align};"><a href="${href}" class="dm-text-coral" style="font-family:${SANS}; font-size:14.5px; font-weight:600; color:${PALETTE.coral}; text-decoration:underline;">${label}</a></p>`,
    );
  }

  // Table-wrapped so Outlook honours the padding and the radius.
  return `<tr>
  <td style="padding:0 4px;" align="${align}">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
      <tr>
        <td class="dm-bg-coral" style="background:${PALETTE.coral}; border-radius:12px;">
          <!-- line-height 1.2 rather than 1: with no leading at all the glyphs
               sit optically high in the padding box, because cap height is
               above the baseline and nothing balances the descender space. -->
          <a href="${href}" class="dm-text-white" style="display:inline-block; padding:13px 26px; font-family:${SANS}; font-size:15px; font-weight:600; line-height:1.2; color:${PALETTE.white}; text-decoration:none; border-radius:12px;">${label}</a>
        </td>
      </tr>
    </table>
  </td>
</tr>`;
}

function renderStatRow(
  block: Extract<EmailBlock, { type: "stat_row" }>,
  ctx: MergeContext,
  missing: Set<string>,
): string {
  const stats = block.stats.slice(0, 4);
  if (!stats.length) return "";
  const width = Math.floor(100 / stats.length);

  // Each column holds the same two rows — value then label — so the numbers
  // sit on one baseline and the captions sit on another, whatever the string
  // lengths are. Columns never reflow independently.
  const cells = stats
    .map(
      (stat) => `<td width="${width}%" valign="top" align="center" style="padding:0 6px;">
        <div class="dm-text-coral" style="font-family:${SANS}; font-size:30px; line-height:1.1; font-weight:600; letter-spacing:-0.02em; color:${PALETTE.coral};">${inline(stat.value, ctx, missing)}</div>
        <div class="dm-text-ink-muted" style="margin-top:6px; font-family:${SANS}; font-size:11px; line-height:1.3; letter-spacing:0.08em; text-transform:uppercase; color:${PALETTE.inkMuted};">${inline(stat.label, ctx, missing)}</div>
      </td>`,
    )
    .join("");

  return `<tr>
  <td class="dm-bg-card dm-border" style="background:${PALETTE.card}; border:1px solid ${PALETTE.border}; border-radius:20px; padding:28px 24px;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"><tr>${cells}</tr></table>
  </td>
</tr>`;
}

function renderBookCard(
  block: Extract<EmailBlock, { type: "book_card" }>,
  ctx: MergeContext,
  missing: Set<string>,
): string {
  const title = inline(block.title, ctx, missing);
  const inner = `
    ${block.meta ? `<p class="dm-text-ink-muted" style="margin:0 0 8px; font-family:${SANS}; font-size:11px; font-weight:600; letter-spacing:0.14em; text-transform:uppercase; color:${PALETTE.inkMuted};">${inline(block.meta, ctx, missing)}</p>` : ""}
    <p class="dm-text-ink" style="margin:0; font-family:${SERIF}; font-size:22px; line-height:1.3; color:${PALETTE.ink};">${title}</p>
    ${block.subtitle ? `<p class="dm-text-ink-soft" style="margin:8px 0 0; font-family:${SANS}; font-size:14px; line-height:1.6; color:${PALETTE.inkSoft};">${inline(block.subtitle, ctx, missing)}</p>` : ""}`;

  const body = block.href
    ? `<a href="${safeUrl(applyTags(block.href, ctx, missing))}" style="text-decoration:none; display:block;">${inner}</a>`
    : inner;

  return `<tr>
  <td class="dm-bg-card dm-border" style="background:${PALETTE.card}; border:1px solid ${PALETTE.border}; border-radius:20px; padding:26px 28px;">${body}</td>
</tr>`;
}

/**
 * The panel that quotes what someone sent us. Shares `book_card`'s frame
 * exactly — same surface, border, radius and padding — so an email carrying
 * both speaks one visual language instead of two.
 *
 * Three roles, three treatments: the meta line is a quiet tracked cap, the
 * title is the serif, and the detail labels are sentence-case sans. Giving all
 * three the same small-caps costume would read as a template.
 */
function renderRecordCard(
  block: Extract<EmailBlock, { type: "record_card" }>,
  ctx: MergeContext,
  missing: Set<string>,
): string {
  const details = (block.details ?? [])
    .filter((d) => d.value !== null && d.value !== undefined && String(d.value).trim() !== "")
    .slice(0, 8);

  if (!block.meta && !block.title && !block.body?.trim() && !details.length) return "";

  const meta = block.meta
    ? `<p class="dm-text-ink-muted" style="margin:0 0 10px; font-family:${SANS}; font-size:11px; font-weight:600; letter-spacing:0.14em; text-transform:uppercase; color:${PALETTE.inkMuted};">${inline(block.meta, ctx, missing)}</p>`
    : "";

  const title = block.title
    ? `<p class="dm-text-ink" style="margin:0 0 ${block.body?.trim() ? "12px" : "0"}; font-family:${SERIF}; font-size:19px; line-height:1.35; color:${PALETTE.ink};">${inline(block.title, ctx, missing)}</p>`
    : "";

  // This is the ONE place in a Dars email where the text was typed by the
  // recipient rather than written by us, and students here write in Arabic and
  // Urdu constantly - usually a salam in Arabic followed by English.
  //
  // Hence one dir="auto" element PER LINE rather than one around the message.
  // dir="auto" takes its base direction from the first strong character in the
  // element, so wrapping the whole message in one would let an opening Arabic
  // salam right-align every English line under it. Per line, the salam sits
  // right and the English sits left, which is what the person actually wrote.
  const lineStyle = `margin:0; font-family:${SANS}; font-size:14.5px; line-height:1.65; color:${PALETTE.inkSoft};`;
  const body = block.body?.trim()
    ? (block.body ?? "")
        .split(/\r?\n/)
        .map((line) =>
          line.trim()
            ? `<div dir="auto" class="dm-text-ink-soft" style="${lineStyle}">${escapeHtml(line)}</div>`
            : `<div style="height:10px; line-height:10px; font-size:0;">&nbsp;</div>`,
        )
        .join("")
    : "";

  // Sits under a hairline inside the card: their message is the substance, the
  // metadata is supporting evidence, and the rule marks that change of rank.
  const rows = details
    .map(
      // A fixed label column, not an auto one. Letting the table share the
      // width evenly strands each value halfway across the card, with a dead
      // gulf between it and the label it belongs to. 120px holds the longest
      // label we use and keeps each pair reading as one thing.
      (detail, i) => `<tr>
            <td width="120" valign="top" style="width:120px; padding:0 14px ${i === details.length - 1 ? 0 : 7}px 0; font-family:${SANS}; font-size:12px; line-height:1.5; color:${PALETTE.inkMuted};" class="dm-text-ink-muted">${verbatim(detail.label)}</td>
            <td valign="top" style="padding:0 0 ${i === details.length - 1 ? 0 : 7}px; font-family:${SANS}; font-size:12.5px; line-height:1.5; color:${PALETTE.inkSoft};" class="dm-text-ink-soft">${verbatim(String(detail.value))}</td>
          </tr>`,
    )
    .join("");

  const detailBlock = details.length
    ? `<div class="dm-border" style="margin-top:18px; padding-top:16px; border-top:1px solid ${PALETTE.border};">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
        ${rows}
      </table>
    </div>`
    : "";

  return `<tr>
  <td class="dm-bg-card dm-border" style="background:${PALETTE.card}; border:1px solid ${PALETTE.border}; border-radius:20px; padding:26px 28px;">
    ${meta}${title}${body}${detailBlock}
  </td>
</tr>`;
}

function renderQuote(
  block: Extract<EmailBlock, { type: "quote" }>,
  ctx: MergeContext,
  missing: Set<string>,
): string {
  // No decorative quote glyph and no smart-quote ornament — the serif, the
  // size and the space do the work.
  return `<tr>
  <td style="padding:0 4px;">
    <p class="dm-text-ink" style="margin:0; font-family:${SERIF}; font-size:20px; line-height:1.5; color:${PALETTE.ink};">${inline(block.text, ctx, missing)}</p>
    ${block.attribution ? `<p class="dm-text-ink-muted" style="margin:12px 0 0; font-family:${SANS}; font-size:13px; line-height:1.5; color:${PALETTE.inkMuted};">${inline(block.attribution, ctx, missing)}</p>` : ""}
  </td>
</tr>`;
}

function renderList(
  block: Extract<EmailBlock, { type: "list" }>,
  ctx: MergeContext,
  missing: Set<string>,
): string {
  const numbered = (block.style ?? "numbered") === "numbered";
  const items = block.items
    .map((item, i) => {
      const marker = numbered
        ? `<div class="dm-bg-coral-soft dm-text-coral" style="width:26px; height:26px; border-radius:999px; background:${PALETTE.coralSoft}; color:${PALETTE.coral}; text-align:center; line-height:26px; font-size:12px; font-weight:600; font-family:${SANS};">${i + 1}</div>`
        : `<div class="dm-bg-coral" style="width:5px; height:5px; margin:10px 0 0 8px; border-radius:999px; background:${PALETTE.coral};"></div>`;
      return `<tr>
        <td style="padding:0 0 18px;" valign="top">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
              <td width="32" valign="top">${marker}</td>
              <td class="dm-text-ink" style="padding-left:14px; font-family:${SANS}; font-size:14.5px; line-height:1.55; color:${PALETTE.ink};">
                <strong class="dm-text-ink" style="font-weight:600; color:${PALETTE.ink};">${inline(item.title, ctx, missing)}</strong>${item.body ? `<span class="dm-text-ink-soft" style="color:${PALETTE.inkSoft};"> — ${inline(item.body, ctx, missing)}</span>` : ""}
              </td>
            </tr>
          </table>
        </td>
      </tr>`;
    })
    .join("");

  return `<tr>
  <td class="dm-bg-card dm-border" style="background:${PALETTE.card}; border:1px solid ${PALETTE.border}; border-radius:20px; padding:30px 32px 14px;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">${items}</table>
  </td>
</tr>`;
}

function renderImage(
  block: Extract<EmailBlock, { type: "image" }>,
  ctx: MergeContext,
  missing: Set<string>,
): string {
  const src = safeUrl(applyTags(block.src, ctx, missing));
  const alt = escapeHtml(applyTags(block.alt ?? "", ctx, missing));
  const width = block.width && block.width > 0 ? Math.min(block.width, 560) : 560;
  const img = `<img src="${src}" alt="${alt}" width="${width}" style="display:block; width:100%; max-width:${width}px; height:auto; border:0; outline:none; text-decoration:none; border-radius:16px;" />`;
  return row(
    block.href ? `<a href="${safeUrl(applyTags(block.href, ctx, missing))}">${img}</a>` : img,
  );
}

function renderDivider(): string {
  return `<tr><td style="padding:0 4px;"><div class="dm-border" style="height:1px; line-height:1px; font-size:0; background:${PALETTE.border};">&nbsp;</div></td></tr>`;
}

// --- Markdown subset -------------------------------------------------------

/**
 * A deliberately small markdown dialect: headings, paragraphs, bullet and
 * numbered lists, blockquotes, and the inline subset above. Enough to write a
 * letter-style email quickly; not enough to break the shell.
 */
function renderMarkdown(source: string, ctx: MergeContext, missing: Set<string>): string {
  const lines = (source ?? "").split(/\r?\n/);
  const out: string[] = [];
  let paragraph: string[] = [];
  let listItems: string[] = [];
  let listNumbered = false;

  const flushParagraph = () => {
    if (!paragraph.length) return;
    out.push(
      `<p class="dm-text-ink-soft" style="margin:0 0 16px; font-family:${SANS}; font-size:14.5px; line-height:1.65; color:${PALETTE.inkSoft};">${inline(paragraph.join("\n"), ctx, missing)}</p>`,
    );
    paragraph = [];
  };

  const flushList = () => {
    if (!listItems.length) return;
    const tag = listNumbered ? "ol" : "ul";
    const items = listItems
      .map(
        (item) =>
          `<li style="margin:0 0 8px; font-family:${SANS}; font-size:14.5px; line-height:1.6; color:${PALETTE.inkSoft};">${inline(item, ctx, missing)}</li>`,
      )
      .join("");
    out.push(
      `<${tag} class="dm-text-ink-soft" style="margin:0 0 16px; padding-left:22px; color:${PALETTE.inkSoft};">${items}</${tag}>`,
    );
    listItems = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      flushList();
      continue;
    }

    const heading = /^(#{1,3})\s+(.*)$/.exec(trimmed);
    if (heading) {
      flushParagraph();
      flushList();
      const size = heading[1].length === 1 ? 26 : heading[1].length === 2 ? 20 : 17;
      out.push(
        `<h2 class="dm-text-ink" style="margin:0 0 12px; font-family:${SANS}; font-size:${size}px; line-height:1.3; font-weight:600; letter-spacing:-0.015em; color:${PALETTE.ink};">${inline(heading[2], ctx, missing)}</h2>`,
      );
      continue;
    }

    const quote = /^>\s+(.*)$/.exec(trimmed);
    if (quote) {
      flushParagraph();
      flushList();
      out.push(
        `<p class="dm-text-ink" style="margin:0 0 16px; font-family:${SERIF}; font-size:19px; line-height:1.5; color:${PALETTE.ink};">${inline(quote[1], ctx, missing)}</p>`,
      );
      continue;
    }

    const bullet = /^[-*]\s+(.*)$/.exec(trimmed);
    const numbered = /^\d+[.)]\s+(.*)$/.exec(trimmed);
    if (bullet || numbered) {
      flushParagraph();
      const isNumbered = !!numbered;
      if (listItems.length && isNumbered !== listNumbered) flushList();
      listNumbered = isNumbered;
      listItems.push((bullet ? bullet[1] : numbered![1]) ?? "");
      continue;
    }

    flushList();
    paragraph.push(trimmed);
  }

  flushParagraph();
  flushList();
  return out.join("\n");
}

// --- Plain-text alternative ------------------------------------------------

/**
 * Every send needs a text/plain part. A missing one is a spam-filter signal,
 * and it's what a screen reader or a watch notification actually reads.
 */
function toPlainText(blocks: EmailBlock[], ctx: MergeContext, missing: Set<string>): string {
  const strip = (s: string) =>
    applyTags(s ?? "", ctx, missing)
      .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, "$1 ($2)")
      .replace(/\*\*([^*]+)\*\*/g, "$1")
      .replace(/_([^_]+)_/g, "$1")
      .trim();

  const parts: string[] = [];
  for (const block of blocks) {
    switch (block.type) {
      case "hero":
        if (block.eyebrow) parts.push(strip(block.eyebrow).toUpperCase());
        parts.push(strip(`${block.heading}${block.accent ? " " + block.accent : ""}`));
        if (block.body) parts.push(strip(block.body));
        break;
      case "heading":
        parts.push(strip(block.text));
        break;
      case "text":
        parts.push(strip(block.text));
        break;
      case "button":
        parts.push(`${strip(block.label)}: ${applyTags(block.href, ctx, missing)}`);
        break;
      case "stat_row":
        parts.push(
          block.stats.map((s) => `${strip(s.value)} ${strip(s.label)}`).join("   ·   "),
        );
        break;
      case "book_card":
        parts.push(
          [block.meta, block.title, block.subtitle]
            .filter((line): line is string => !!line)
            .map(strip)
            .join("\n"),
        );
        break;
      case "record_card": {
        // The body is quoted verbatim in the HTML, so it is quoted verbatim
        // here too — running `strip` over it would eat a user's asterisks.
        const lines = [
          block.meta ? strip(block.meta).toUpperCase() : "",
          block.title ? strip(block.title) : "",
          block.body?.trim() ?? "",
          ...(block.details ?? [])
            .filter((d) => String(d.value ?? "").trim())
            .slice(0, 8)
            .map((d) => `${d.label}: ${d.value}`),
        ].filter(Boolean);
        if (lines.length) parts.push(lines.join("\n"));
        break;
      }
      case "quote":
        parts.push(strip(block.text) + (block.attribution ? `\n— ${strip(block.attribution)}` : ""));
        break;
      case "list":
        parts.push(
          block.items
            .map((item, i) => `${i + 1}. ${strip(item.title)}${item.body ? ` — ${strip(item.body)}` : ""}`)
            .join("\n"),
        );
        break;
      case "markdown":
        parts.push(strip(block.markdown).replace(/^#{1,3}\s+/gm, ""));
        break;
      case "image":
      case "divider":
      case "spacer":
      case "html":
        break;
    }
  }
  return parts.filter(Boolean).join("\n\n");
}

// --- Shell -----------------------------------------------------------------

function darkModeOverrides(): string {
  const rules = [
    [".dm-bg-cream", `background-color: ${PALETTE.cream}`],
    [".dm-bg-coral-soft", `background-color: ${PALETTE.coralSoft}`],
    [".dm-bg-coral", `background-color: ${PALETTE.coral}`],
    [".dm-bg-card", `background-color: ${PALETTE.card}`],
    [".dm-border", `border-color: ${PALETTE.border}`],
    [".dm-text-ink", `color: ${PALETTE.ink}`],
    [".dm-text-ink-soft", `color: ${PALETTE.inkSoft}`],
    [".dm-text-ink-muted", `color: ${PALETTE.inkMuted}`],
    [".dm-text-ink-subtle", `color: ${PALETTE.inkSubtle}`],
    [".dm-text-coral", `color: ${PALETTE.coral}`],
    [".dm-text-white", `color: #ffffff`],
  ];
  const media = rules.map(([sel, decl]) => `    ${sel} { ${decl} !important; }`).join("\n");
  const ogsc = rules.map(([sel, decl]) => `  [data-ogsc] ${sel} { ${decl} !important; }`).join("\n");
  return `  @media (prefers-color-scheme: dark) {\n${media}\n  }\n${ogsc}`;
}

function footer(category: string, ctx: MergeContext, missing: Set<string>): string {
  const signOff = `
    <p class="dm-text-ink" style="margin:0 0 6px; font-family:${SANS}; font-size:14.5px; line-height:1.6; color:${PALETTE.ink};">Barakallahu feekum,</p>
    <p class="dm-text-coral" style="margin:0 0 28px; font-family:${SERIF}; font-style:italic; font-size:15px; line-height:1.6; color:${PALETTE.coral};">The Dars team</p>`;

  // Transactional mail carries no unsubscribe: you cannot opt out of a
  // receipt or a password reset, and offering it there is misleading.
  if (category === "transactional") {
    return `<tr><td style="padding:0 4px;">${signOff}</td></tr>`;
  }

  const unsubscribe = applyTags("{{unsubscribe_url}}", ctx, missing) || `${SITE_URL}/email/preferences`;
  const preferences = applyTags("{{preferences_url}}", ctx, missing) || unsubscribe;
  const viewUrl = ctx.view_url ? String(ctx.view_url) : "";

  // A physical sender identity is not decoration: UK PECR and CAN-SPAM both
  // expect commercial email to identify the sender, and mailbox providers
  // weight it. Rendered only when it has been configured, because inventing a
  // postal address would be worse than omitting one.
  const identity = ctx.sender_identity ? String(ctx.sender_identity) : "";

  // inkMuted, not inkSubtle. #9A9488 on the cream background is about 2.9:1,
  // which fails WCAG AA and makes the unsubscribe link genuinely hard to find
  // — the one link in a marketing email that must never be hard to find, both
  // for the recipient and for the mailbox providers judging us on complaints.
  // #6E6A5F clears 4.5:1 and still reads as quiet.
  return `<tr>
  <td style="padding:0 4px;">
    ${signOff}
    <p class="dm-text-ink-muted" style="margin:0; font-family:${SANS}; font-size:12px; line-height:1.6; color:${PALETTE.inkMuted};">
      You're receiving this because you signed up to Dars.<br>
      <a href="${safeUrl(preferences)}" class="dm-text-ink-muted" style="color:${PALETTE.inkMuted}; text-decoration:underline;">Choose what we email you</a>
      &nbsp;·&nbsp;
      <a href="${safeUrl(unsubscribe)}" class="dm-text-ink-muted" style="color:${PALETTE.inkMuted}; text-decoration:underline;">Unsubscribe</a>${
        viewUrl
          ? `
      &nbsp;·&nbsp;
      <a href="${safeUrl(viewUrl)}" class="dm-text-ink-muted" style="color:${PALETTE.inkMuted}; text-decoration:underline;">View in browser</a>`
          : ""
      }${
        identity
          ? `<br><span class="dm-text-ink-muted" style="color:${PALETTE.inkMuted};">${escapeHtml(identity)}</span>`
          : ""
      }
    </p>
  </td>
</tr>`;
}

function shell(inner: string, preheader: string, title: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="only light">
<meta name="supported-color-schemes" content="only light">
<title>${escapeHtml(title)}</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Figtree:wght@300;400;500;600;700&display=swap');
  :root {
    color-scheme: only light;
    supported-color-schemes: only light;
  }
${darkModeOverrides()}
</style>
</head>
<body class="dm-bg-cream dm-text-ink" style="margin:0; padding:0; background:${PALETTE.cream}; font-family:${SANS}; color:${PALETTE.ink}; -webkit-font-smoothing:antialiased;">

<div style="display:none; overflow:hidden; line-height:1px; opacity:0; max-height:0; max-width:0;">${escapeHtml(preheader)}</div>

<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" class="dm-bg-cream" style="background:${PALETTE.cream}; padding:40px 16px;">
  <tr>
    <td align="center">
      <table role="presentation" width="560" cellspacing="0" cellpadding="0" border="0" style="max-width:560px; width:100%;">

        <tr>
          <td style="padding:0 4px 28px;">
            <img src="${LOGO_URL}" width="30" height="30" alt="Dars" style="display:inline-block; width:30px; height:30px; border-radius:8px; vertical-align:middle; border:0; outline:none; text-decoration:none;" />
            <span class="dm-text-ink" style="vertical-align:middle; margin-left:10px; font-family:${SANS}; font-size:18px; font-weight:600; letter-spacing:-0.01em; color:${PALETTE.ink};">Dars</span>
          </td>
        </tr>

${inner}

      </table>
    </td>
  </tr>
</table>

</body>
</html>`;
}

// --- Public API ------------------------------------------------------------

const GAP_PX = { sm: 12, md: 20, lg: 32 } as const;

/**
 * Blocks that are their own full-width panel need breathing room around them;
 * consecutive plain text lines need less. Returning the gap from the pair
 * keeps vertical rhythm consistent without the author having to place spacers
 * by hand.
 */
function gapBetween(previous: EmailBlock, next: EmailBlock): number {
  const panel = (b: EmailBlock) =>
    b.type === "hero" ||
    b.type === "stat_row" ||
    b.type === "book_card" ||
    b.type === "record_card" ||
    b.type === "list";
  if (previous.type === "spacer" || next.type === "spacer") return 0;
  if (panel(previous) || panel(next)) return 20;
  if (previous.type === "heading") return 12;
  if (next.type === "button" || previous.type === "button") return 20;
  return 16;
}

function renderBlock(block: EmailBlock, ctx: MergeContext, missing: Set<string>): string {
  switch (block.type) {
    case "hero":
      return renderHero(block, ctx, missing);
    case "heading":
      return renderHeading(block, ctx, missing);
    case "text":
      return renderText(block, ctx, missing);
    case "button":
      return renderButton(block, ctx, missing);
    case "stat_row":
      return renderStatRow(block, ctx, missing);
    case "book_card":
      return renderBookCard(block, ctx, missing);
    case "record_card":
      return renderRecordCard(block, ctx, missing);
    case "quote":
      return renderQuote(block, ctx, missing);
    case "list":
      return renderList(block, ctx, missing);
    case "image":
      return renderImage(block, ctx, missing);
    case "divider":
      return renderDivider();
    case "spacer":
      return gap(GAP_PX[block.size ?? "md"]);
    case "markdown":
      return row(renderMarkdown(block.markdown, ctx, missing));
    case "html":
      // Trusted by construction: only a strict admin can author a template,
      // and raw-HTML mode exists precisely to carry hand-built emails across.
      return row(applyTags(block.html ?? "", ctx, missing));
    default:
      return "";
  }
}

export function renderEmail(
  template: EmailTemplateInput,
  ctx: MergeContext = {},
): RenderResult {
  const missing = new Set<string>();
  const category = template.category ?? "marketing";
  const subject = applyTags(template.subject ?? "", ctx, missing);

  // Whole-template raw HTML: used verbatim, no shell, no footer injection.
  // This is how the nine hand-built dars-landing emails come across intact.
  if (template.bodyMode === "html") {
    const html = applyTags(template.html ?? "", ctx, missing);
    return {
      subject,
      html,
      text: html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(),
      missingTags: [...missing],
    };
  }

  const blocks: EmailBlock[] =
    template.bodyMode === "markdown"
      ? [{ type: "markdown", markdown: template.markdown ?? "" }]
      : (template.blocks ?? []);

  const pieces: string[] = [];
  blocks.forEach((block, i) => {
    if (i > 0) {
      const px = gapBetween(blocks[i - 1], block);
      if (px) pieces.push(gap(px));
    }
    pieces.push(renderBlock(block, ctx, missing));
  });

  pieces.push(gap(28));
  pieces.push(footer(category, ctx, missing));

  const preheader = applyTags(template.preheader ?? "", ctx, missing);
  const text = toPlainText(blocks, ctx, missing);

  return {
    subject,
    html: shell(pieces.join("\n"), preheader, subject),
    text: category === "transactional" ? text : `${text}\n\n—\nUnsubscribe: ${ctx.unsubscribe_url ?? ""}`,
    missingTags: [...missing],
  };
}

/** Every tag the template references, for the composer's linter. */
export function extractTags(template: EmailTemplateInput): string[] {
  const source = JSON.stringify([
    template.subject,
    template.preheader,
    template.blocks ?? [],
    template.markdown ?? "",
    template.html ?? "",
  ]);
  const found = new Set<string>();
  let match: RegExpExecArray | null;
  const pattern = new RegExp(TAG_PATTERN.source, "gi");
  while ((match = pattern.exec(source)) !== null) found.add(match[1].toLowerCase());
  return [...found];
}

/** The tags the engine can always supply, shown as chips in the composer. */
export const KNOWN_TAGS = [
  "name",
  "first_name",
  "email",
  "streak",
  "longest_streak",
  "due_count",
  "total_cards",
  "total_minutes",
  "xp",
  "book",
  "app_url",
  // Deep link that opens the Dars app itself, falling back to the store.
  // Use this for any call to action that means "go and study", never app_url —
  // a revision reminder that lands on a marketing page has failed.
  //   {{open_url}}            → the app's home
  //   {{open_url}}?to=revise  → straight to the revise tab
  "open_url",
  "unsubscribe_url",
  "preferences_url",
] as const;

/**
 * Destinations `/open?to=` will hand to the app. A fixed list, because the
 * value ends up in a `dars://` URL and an open-ended one would let a template
 * author (or anyone who could edit one) point the deep link anywhere.
 */
export const OPEN_DESTINATIONS = [
  "dashboard",
  "revise",
  "exams",
  "resources",
  "profile",
  "halaqah",
  "ai-tutor",
] as const;
