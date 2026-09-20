import { createHash } from "node:crypto";
import { createClient } from "@supabase/supabase-js";
import { validSubjectId } from "../../suggest-a-book/subjects";

export const runtime = "nodejs";

/**
 * Books people want inside Dars.
 *
 * One POST carries several books, and each becomes its own row sharing a
 * submission_id — so "how many people asked for Quduri" stays a count rather
 * than a scan through arrays, and one person naming five books still counts as
 * one person in each of the five groups.
 *
 * book_suggestions has RLS on with no policies, so nothing reaches it with the
 * anon key. This route writes with the service role, which is why every field
 * is bounded and re-validated here rather than trusted from the client.
 */

const MAX_BOOKS = 12;
const TITLE_MAX = 200;
const AUTHOR_MAX = 160;
const NOTE_MAX = 500;
const NAME_MAX = 120;
const EMAIL_MAX = 200;

type BookInput = { title?: unknown; author?: unknown; subjectId?: unknown; note?: unknown };
type Body = {
  books?: unknown;
  name?: unknown;
  email?: unknown;
  botcheck?: unknown;
};

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

/**
 * Enough to recognise a repeat sender without keeping anyone's address. Salted
 * with the service-role key, which never leaves the server, so the hashes are
 * useless anywhere else even if the column leaked.
 */
function hashIp(req: Request, salt: string): string | null {
  const forwarded = req.headers.get("x-forwarded-for") ?? "";
  const ip = forwarded.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "";
  if (!ip) return null;
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex").slice(0, 32);
}

export async function POST(req: Request) {
  let body: Body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // The hidden field no person ever fills. Answer as though it worked, so a
  // bot has nothing to learn from the response.
  if (body.botcheck) return Response.json({ ok: true, saved: 0 });

  const raw = Array.isArray(body.books) ? body.books.slice(0, MAX_BOOKS) : [];
  const seen = new Set<string>();
  const books = raw
    .map((entry) => {
      const b = (entry ?? {}) as BookInput;
      return {
        title: str(b.title, TITLE_MAX),
        author: str(b.author, AUTHOR_MAX),
        subjectId: validSubjectId(b.subjectId),
        note: str(b.note, NOTE_MAX),
      };
    })
    .filter((b) => {
      if (!b.title) return false;
      // Someone adding the same book twice in one sitting meant it once.
      const key = b.title.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

  if (!books.length) {
    return Response.json({ error: "Name at least one book" }, { status: 400 });
  }

  const name = str(body.name, NAME_MAX);
  const email = str(body.email, EMAIL_MAX).toLowerCase();
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Check that email address" }, { status: 400 });
  }

  const supabaseUrl = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseKey) {
    console.error("book-suggestions: Supabase env missing");
    return Response.json({ error: "Server not configured" }, { status: 500 });
  }

  const supabase = createClient(supabaseUrl, supabaseKey, { auth: { persistSession: false } });

  // One id for the whole batch, generated here rather than per row, so the
  // column default cannot hand each book its own and break the grouping.
  const submissionId = crypto.randomUUID();
  const ipHash = hashIp(req, supabaseKey);
  const userAgent = (req.headers.get("user-agent") ?? "").slice(0, 400) || null;

  const { error } = await supabase.from("book_suggestions").insert(
    books.map((b, i) => ({
      submission_id: submissionId,
      position: i + 1,
      title: b.title,
      author: b.author || null,
      subject_id: b.subjectId,
      note: b.note || null,
      submitter_name: name || null,
      submitter_email: email || null,
      source: "landing",
      ip_hash: ipHash,
      user_agent: userAgent,
    })),
  );

  if (error) {
    console.error("book-suggestions insert failed", error);
    return Response.json({ error: "Could not save your suggestions" }, { status: 500 });
  }

  return Response.json({ ok: true, saved: books.length });
}
