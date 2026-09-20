"use client";

/**
 * The shelf.
 *
 * Dars is a shelf of books, so the thing a person is building on this page is
 * drawn as one: every title they type stands up as a spine on a plank, and the
 * shelf fills as they work. It is the page's one authored object, and the only
 * motion on the page — there is nothing decorative floating anywhere, and no
 * content of any kind waits on an animation to become visible. A spine renders
 * at rest; the keyframes only move it INTO the resting state it already has,
 * so with animation off, or before any script runs, the shelf still reads.
 *
 * The spines are not coloured blocks. Each carries the two ruled bands a
 * printed spine has at head and tail, its width grows with the length of the
 * title the way a thicker book does, and its tone is taken from the title
 * itself, so the same book is always the same colour on every visit.
 */

/**
 * Six tones out of the brand's own family: the warm coral and copper end, the
 * sage, the house teal, and the ink. Deliberately values rather than one
 * bright accent repeated, because a shelf of identical coral books is a
 * swatch, not a shelf.
 *
 * Every one of them carries the cream lettering below at 4.5:1 or better,
 * measured, not judged by eye. The sage and the ochre were a step lighter
 * until that was checked and they came in at 3.99 and 3.92 — a spine you have
 * to squint at is not a design decision.
 */
const TONES = ["#B4402A", "#5A6E4C", "#3B7A82", "#8C5F23", "#4A443A", "#7A281A"];

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

export type ShelfBook = { id: string; title: string; author?: string };

function Spine({ book, index }: { book: ShelfBook; index: number }) {
  const seed = hash(book.title);
  const tone = TONES[seed % TONES.length];
  const ink = inkOn(tone);
  // A longer title is a thicker book, and no two are quite the same height.
  // The height is set so a real title — "Alfiyyah ibn Malik", "Mishkat
  // al-Masabih" — fits down the spine whole. Anything longer still shortens
  // with an ellipsis rather than being sliced off by the edge of the board,
  // and the full title is on the element for a hover.
  const width = 38 + Math.min(16, Math.floor(book.title.length / 7) * 4);
  const height = 152 + (seed % 5) * 8;
  // Bands are the tone's own value shifted, not a contrasting line drawn on.
  const band = ink === "#1A1814" ? "rgba(26,24,20,0.28)" : "rgba(255,251,244,0.34)";

  return (
    <div
      className="animate-spine-in flex shrink-0 flex-col items-center justify-between rounded-t-[3px] px-1.5 py-2.5"
      style={{
        width,
        height,
        background: tone,
        color: ink,
        // One tight, directional shadow in the spine's own colour, cast as if
        // the light came from above and in front — never a soft grey bloom on
        // every side.
        boxShadow: `inset 0 1px 0 rgba(255,255,255,0.16), 0 1px 2px -1px rgba(26,24,20,0.45)`,
        animationDelay: `${Math.min(index, 8) * 35}ms`,
      }}
      title={book.author ? `${book.title}, ${book.author}` : book.title}
    >
      <span aria-hidden className="block w-full shrink-0 space-y-[3px]">
        <span className="block h-px w-full" style={{ background: band }} />
        <span className="block h-px w-full" style={{ background: band }} />
      </span>

      {/*
        The title, set down the spine. Its height is capped and it ellipsizes,
        so a long title is shortened on purpose rather than being sliced off by
        the edge of the board.
      */}
      <span
        className="font-display overflow-hidden text-ellipsis whitespace-nowrap text-[11px] font-medium leading-none tracking-tight"
        style={{ writingMode: "vertical-rl", textOrientation: "mixed", maxHeight: height - 38 }}
      >
        {book.title}
      </span>

      <span aria-hidden className="block w-full shrink-0 space-y-[3px]">
        <span className="block h-px w-full" style={{ background: band }} />
        <span className="block h-px w-full" style={{ background: band }} />
      </span>
    </div>
  );
}

export function Shelf({
  books,
  emptyNote = "Nothing on it yet.",
  caption,
  className = "",
}: {
  books: ShelfBook[];
  emptyNote?: string;
  /** A line under the plank, at the right — the count, usually. */
  caption?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      {/*
        An empty shelf is a SHORT shelf. Holding the full height of a book
        before there is a book leaves a hole between the heading and the plank
        that reads as a mistake. It grows once, when the first title is typed,
        which is the shelf making room — a change with a reason behind it.
      */}
      <div
        className={`flex items-end gap-[3px] overflow-x-auto overflow-y-hidden pl-px transition-[min-height] duration-300 ease-out [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
          books.length === 0 ? "min-h-[52px]" : "min-h-[190px]"
        }`}
      >
        {books.length === 0 ? (
          <p className="pb-4 text-[14px] leading-[1.6] text-ink-muted">{emptyNote}</p>
        ) : (
          books.map((book, i) => <Spine key={book.id} book={book} index={i} />)
        )}
      </div>

      {/*
        The plank runs the full measure: it is the structure that separates the
        heading from the form, not a rule dropped in beside the text. Two
        values of one colour rather than a drawn outline — a pale lip along the
        top where the light catches, and the board's own darker body under it.
      */}
      <div aria-hidden>
        <div className="h-px w-full bg-[#F6EDDC]" />
        <div className="h-[5px] w-full rounded-b-[2px] bg-[#D6C8AB]" />
      </div>

      {/* The count only once there is something to count — with an empty shelf
          the note above the plank has already said it. */}
      {caption && books.length > 0 && (
        <p className="mt-2.5 text-right text-[12.5px] text-ink-muted">{caption}</p>
      )}
    </div>
  );
}
