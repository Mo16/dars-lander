import type { Metadata } from "next";
import { LABELS, PREVIEW_TYPES } from "../builders";
import PreviewViewer from "./viewer";

export const metadata: Metadata = {
  title: "Email preview",
  robots: { index: false, follow: false },
};

export default async function EmailPreviewViewPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;
  const active = type && PREVIEW_TYPES.includes(type) ? type : "beta-2";

  return (
    <PreviewViewer
      active={active}
      types={PREVIEW_TYPES.map((t) => ({ value: t, label: LABELS[t] ?? t }))}
    />
  );
}
