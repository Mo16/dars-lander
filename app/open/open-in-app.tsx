"use client";

import { useEffect, useRef, useState } from "react";

// Tries to hand off to the installed app, then gets out of the way.
//
// There is no reliable way to ask a browser "is this app installed?" — so we
// attempt the scheme once and let the OS decide. If Dars is there, it comes to
// the foreground. If it isn't, nothing visible happens and the page underneath
// is already showing the store links, so the user is never staring at a blank
// screen wondering what went wrong.
//
// Desktop never attempts it: `dars://` cannot resolve there, and firing it only
// produces an error dialog.

export default function OpenInApp({
  deepLink,
  iosUrl,
  androidUrl,
}: {
  deepLink: string;
  iosUrl: string;
  androidUrl: string;
}) {
  const fired = useRef(false);
  const [platform, setPlatform] = useState<"ios" | "android" | "desktop">("desktop");

  useEffect(() => {
    if (typeof navigator === "undefined") return;
    const ua = navigator.userAgent || "";
    const isIOS = /iPhone|iPad|iPod/i.test(ua);
    const isAndroid = /Android/i.test(ua);
    setPlatform(isIOS ? "ios" : isAndroid ? "android" : "desktop");

    if (fired.current || (!isIOS && !isAndroid)) return;
    fired.current = true;

    // Small delay so the fallback below has painted first. If the OS switches
    // to the app, the user never sees it; if it doesn't, they land on
    // something useful rather than a flash of white.
    const timer = window.setTimeout(() => {
      window.location.href = deepLink;
    }, 300);
    return () => window.clearTimeout(timer);
  }, [deepLink]);

  const storeUrl = platform === "android" ? androidUrl : iosUrl;
  const storeLabel = platform === "android" ? "get it on Google Play" : "get it on the App Store";

  // One action, then a quiet line for the people it doesn't apply to.
  // Deliberately NOT a solid button next to an outlined twin: two buttons of
  // equal weight here would make "open" and "install" look like a choice,
  // when only one of them is ever the right one for a given visitor.
  return (
    <div className="mt-8">
      <a
        href={deepLink}
        className="flex w-full items-center justify-center rounded-xl bg-coral-500 px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-coral-600"
      >
        Open Dars
      </a>

      <p className="mt-4 text-[13.5px] leading-relaxed text-ink-muted">
        {platform === "desktop" ? (
          <>
            Not on this device?{" "}
            <a href={iosUrl} className="text-ink underline underline-offset-2 hover:text-coral-600">
              Get Dars for iPhone
            </a>{" "}
            or{" "}
            <a
              href={androidUrl}
              className="text-ink underline underline-offset-2 hover:text-coral-600"
            >
              for Android
            </a>
            .
          </>
        ) : (
          <>
            Don&rsquo;t have Dars yet?{" "}
            <a href={storeUrl} className="text-ink underline underline-offset-2 hover:text-coral-600">
              You can {storeLabel}
            </a>
            .
          </>
        )}
      </p>
    </div>
  );
}
