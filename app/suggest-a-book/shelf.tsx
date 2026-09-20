"use client";

/**
 * The shelf.
 *
 * Dars is a shelf of books, so the thing a person is building on this page is
 * drawn as one: every title they type stands up as a spine on a plank, and the
 * shelf fills as they work. It is the page's one authored object, and the only
 * motion on the page. No content of any kind waits on an animation to become
 * visible: a spine renders at rest, and the keyframes only move it INTO the
 * resting state it already has, so with animation off, or before any script
 * runs, the shelf still reads.
 *
 * A spine is not a coloured rectangle, and the whole difference is in what a
 * bound book actually does to light:
 *
 *   · IT IS ROUND. A spine curves away from you at both edges, so it is
 *     lightest about a third of the way across and falls into shadow at the
 *     hinges. That one gradient is what stops it reading as a flat card.
 *     Everything else below is detail laid on top of it.
 *   · IT IS CLOTH OR LEATHER. A fine vertical grain, barely there, catches
 *     light the way a woven case does and a flat fill never can.
 *   · IT IS TOOLED. Binders rule the head and the tail with a thick line and
 *     a thin one, in the same foil as the lettering.
 *   · SOME OF THEM ARE LABELLED. A dark morocco panel with the title stamped
 *     on it is how a serious book has been bound for four hundred years, and
 *     it is the one detail that makes a shelf look like a real shelf rather
 *     than a set of matching blocks. About a third of these get one.
 *   · IT SITS ON THE WOOD. A tight contact shadow at the foot, not a bloom
 *     all round.
 *
 * All of it is deterministic from the title, so a book is the same book on
 * every visit.
 */

/**
 * Binding colours, not brand accents: oxblood, forest, indigo-teal, tan calf,
 * charcoal cloth and a deep maroon. They sit inside the site's own warm family
 * while reading as things a book has genuinely been bound in.
 *
 * Every one carries the cream lettering at 4.5:1 or better WITH the highlight
 * applied over it (worst 4.76:1), measured rather than judged by eye. That
 * second part matters: the round of the spine lifts the middle of the tone,
 * which is exactly where the title sits.
 */
const TONES = ["#8E3320", "#4A5C3E", "#2F646B", "#7A4F1C", "#3B362E", "#5F1F14"];

/** The label panels: near-black morocco, and a deep red one. */
const LABEL_TONES = ["#231E1A", "#4A1410"];

/** Stable per title, so a book does not change colour as the list is edited. */
function hash(text: string): number {
  let h = 0;
  for (let i = 0; i < text.length; i++) h = (h * 31 + text.charCodeAt(i)) >>> 0;
  return h;
}

/**
 * Ink or cream on this tone, decided by relative luminance rather than by
 * assuming every tone is dark. A pale spine with white lettering on it is
 * unreadable, and that is not a judgement call to make by eye.
 */
function inkOn(hex: string): string {
  const channel = (i: number) => parseInt(hex.slice(1 + i * 2, 3 + i * 2), 16) / 255;
  const linear = (c: number) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  const luminance =
    0.2126 * linear(channel(0)) + 0.7152 * linear(channel(1)) + 0.0722 * linear(channel(2));
  return luminance > 0.42 ? "#1A1814" : "#FFFBF4";
}

export type ShelfBook = { id: string; title: string; version?: string };

/**
 * The gilt rules a binder tools at the head and the tail: a thick line and a
 * thin one. Deliberately quiet — real foil catches the light rather than
 * shouting, and these carry no information, so they are hidden from a reader.
 */
function Rules({ foil, flip = false }: { foil: string; flip?: boolean }) {
  return (
    <span
      aria-hidden
      className={`flex w-full shrink-0 gap-[2px] ${flip ? "flex-col-reverse" : "flex-col"}`}
    >
      <span className="block h-[2px] w-full rounded-[1px]" style={{ background: foil }} />
      <span className="block h-px w-full rounded-[1px]" style={{ background: foil }} />
    </span>
  );
}

function Spine({ book, index }: { book: ShelfBook; index: number }) {
  const seed = hash(book.title);
  const tone = TONES[seed % TONES.length];
  const ink = inkOn(tone);
  const dark = ink !== "#1A1814";

  // A longer title is a thicker book, and no two are quite the same height.
  const width = 40 + Math.min(18, Math.floor(book.title.length / 7) * 5);
  const height = 152 + (seed % 5) * 9;

  // About a third of the shelf is label-bound. Enough to break the rhythm;
  // not so much that the labels become the pattern.
  const labelled = seed % 3 === 0;
  const labelTone = LABEL_TONES[(seed >> 3) % LABEL_TONES.length];

  // The foil: on a dark binding, the cream lettering at reduced strength; on a
  // pale one, the ink.
  const foil = dark ? "rgba(255,251,244,0.50)" : "rgba(26,24,20,0.40)";

  const titleType =
    "font-display overflow-hidden text-ellipsis whitespace-nowrap text-[11px] font-medium leading-none tracking-tight";
  const titleStyle: React.CSSProperties = {
    writingMode: "vertical-rl",
    textOrientation: "mixed",
  };

  return (
    <div
      className="animate-spine-in flex shrink-0 flex-col items-center justify-between rounded-t-[2px] px-[5px] py-2.5"
      style={{
        width,
        height,
        color: ink,
        backgroundColor: tone,
        // The round of the spine, then the weave of the case. Both are painted
        // OVER the binding colour rather than replacing it, so each book keeps
        // its own hue.
        backgroundImage: [
          "linear-gradient(90deg," +
            " rgba(18,12,8,0.34) 0%," +
            " rgba(18,12,8,0.14) 7%," +
            " rgba(255,252,246,0.10) 26%," +
            " rgba(255,252,246,0.13) 42%," +
            " rgba(255,252,246,0.03) 60%," +
            " rgba(18,12,8,0.10) 80%," +
            " rgba(18,12,8,0.30) 100%)",
          "repeating-linear-gradient(90deg," +
            " rgba(255,255,255,0.04) 0 1px," +
            " rgba(0,0,0,0.025) 1px 2px," +
            " transparent 2px 4px)",
        ].join(","),
        boxShadow: [
          // The square of the boards, catching light along the top edge.
          "inset 0 1px 0 rgba(255,252,246,0.20)",
          // Where the book meets the wood: tight, low, directly underneath.
          "0 3px 4px -3px rgba(26,24,20,0.55)",
        ].join(","),
        animationDelay: `${Math.min(index, 8) * 35}ms`,
      }}
      title={book.version ? `${book.title} (${book.version})` : book.title}
    >
      <Rules foil={foil} />

      {labelled ? (
        // The morocco label, pasted onto the case: its own shadow along the
        // top where it stands proud, and a lit edge along the bottom.
        <span
          className="my-3 flex min-h-0 flex-1 items-center justify-center self-stretch rounded-[1px] px-[3px] py-2"
          style={{
            background: labelTone,
            color: "#F6E7C8",
            boxShadow:
              "inset 0 1px 2px rgba(0,0,0,0.45), inset 0 -1px 0 rgba(255,252,246,0.10)",
          }}
        >
          {/*
            The title is capped and ellipsizes, so a long one is shortened on
            purpose rather than sliced off by the edge of the label. The whole
            title is on the element for a hover.
          */}
          <span className={titleType} style={{ ...titleStyle, maxHeight: height - 90 }}>
            {book.title}
          </span>
        </span>
      ) : (
        <span className={titleType} style={{ ...titleStyle, maxHeight: height - 46 }}>
          {book.title}
        </span>
      )}

      <Rules foil={foil} flip />
    </div>
  );
}

export function Shelf({
  books,
  caption,
  className = "",
}: {
  books: ShelfBook[];
  /** A line under the plank, at the right — the count, usually. */
  caption?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      {/*
        An empty shelf is a BARE shelf, and it says nothing. Holding the height
        of a book before there is a book leaves a hole between the heading and
        the plank that reads as a mistake, and a sentence explaining that the
        shelf will fill is a sentence the shelf makes redundant the moment
        anybody types. So it starts as the plank alone and grows once, on the
        first title: the shelf making room, which is the only explanation it
        needs.
      */}
      <div
        className={`flex items-end gap-[3px] overflow-x-auto overflow-y-hidden pl-px transition-[min-height] duration-300 ease-out [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
          books.length === 0 ? "min-h-[18px]" : "min-h-[200px]"
        }`}
      >
        {books.map((book, i) => (
          <Spine key={book.id} book={book} index={i} />
        ))}
      </div>

      {/*
        The plank runs the full measure: it is the structure between the
        heading and the form, not a rule dropped in beside the text. Three
        values of one colour rather than a drawn outline — the lit top surface
        the books stand on, the board's own body, and the shadowed front edge
        under it.
      */}
      <div aria-hidden>
        <div className="h-px w-full bg-[#F7EFE0]" />
        <div className="h-[6px] w-full bg-[#D6C8AB]" />
        <div className="h-[3px] w-full rounded-b-[2px] bg-[#BCAA88]" />
      </div>

      {/* The count only once there is something to count — with an empty shelf
          the note above the plank has already said it. */}
      {caption && books.length > 0 && (
        <p className="mt-2.5 text-right text-[12.5px] text-ink-muted">{caption}</p>
      )}
    </div>
  );
}
