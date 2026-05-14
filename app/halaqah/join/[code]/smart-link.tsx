"use client";

import { useEffect, useRef } from "react";

// Auto-launch the dars:// deep link on mobile. We can't reliably detect
// whether the app is installed — what we *can* do is attempt to open
// the scheme and rely on the OS to either:
//   • foreground Dars (link works → user sees the preview-then-join card)
//   • do nothing (link is dead → user stays here and uses the manual
//     "Open in Dars" button or grabs the app from the store)
//
// We only attempt it once per page-load to avoid an infinite navigation
// loop if the browser comes back after the OS dialog. On desktop we
// don't even try — desktop users can't open dars:// anyway, so the
// rendered preview + code + store badges are the whole UX.
export default function SmartLink({ deepLink }: { deepLink: string }) {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;

    if (typeof navigator === "undefined") return;
    const ua = navigator.userAgent || "";
    const isMobile = /iPhone|iPad|iPod|Android/i.test(ua);
    if (!isMobile) return;

    // Slight delay — gives the page enough time to render the preview
    // beneath the OS dialog so the user has somewhere to land if they
    // dismiss the "Open in Dars?" prompt.
    const t = window.setTimeout(() => {
      window.location.href = deepLink;
    }, 350);

    return () => window.clearTimeout(t);
  }, [deepLink]);

  return null;
}
