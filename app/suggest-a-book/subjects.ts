/**
 * The subjects a suggested book can be filed under.
 *
 * The ids are the real `public.subjects.id` values, because book_suggestions
 * .subject_id is a foreign key to that table — an id invented here would be
 * rejected by the database at insert time. Both the form and the API route
 * read this one list, so the options a person sees and the values the server
 * will accept cannot drift apart.
 *
 * Ordered the way a syllabus runs, not alphabetically. "General" is left out
 * on purpose: choosing it says nothing that leaving the field blank does not.
 */
export const SUBJECTS = [
  { id: "nahw", label: "Nahw" },
  { id: "sarf", label: "Sarf" },
  { id: "balaghah", label: "Balaghah" },
  { id: "arabic-lit", label: "Arabic literature" },
  { id: "mantiq", label: "Mantiq" },
  { id: "fiqh", label: "Fiqh" },
  { id: "usul-fiqh", label: "Usul al-Fiqh" },
  { id: "faraid", label: "Faraid" },
  { id: "hadith", label: "Hadith" },
  { id: "usul-hadith", label: "Usul al-Hadith" },
  { id: "tafsir", label: "Tafsīr" },
  { id: "usul-tafsir", label: "Usul al-Tafsir" },
  { id: "Lisaan al-Qur'an", label: "Lisaan al-Qur'an" },
  { id: "aqeedah", label: "Aqeedah" },
  { id: "seerah", label: "Seerah" },
  { id: "tajweed", label: "Tajweed" },
] as const;

export type SubjectId = (typeof SUBJECTS)[number]["id"];

const IDS = new Set<string>(SUBJECTS.map((s) => s.id));

/** A subject id the database will accept, or null. */
export function validSubjectId(value: unknown): string | null {
  return typeof value === "string" && IDS.has(value) ? value : null;
}
