"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import {
  AboutSection,
  FeaturesSection,
  HalaqahSection,
  ClosingSection,
  Footer,
} from "./sections";

// useLayoutEffect on the client so the hidden state is set before first paint
// (no flash), plain useEffect on the server so Next doesn't warn.
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const NAV = [
  { label: "About", href: "#about" },
  { label: "Features", href: "#features" },
  { label: "Halaqahs", href: "#halaqas" },
];

export default function LanderTwo() {
  const headerRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  const frontRef = useRef<HTMLDivElement>(null);
  const backImgRef = useRef<HTMLImageElement>(null);
  const frontImgRef = useRef<HTMLImageElement>(null);

  useIsoLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ctx: gsap.Context | undefined;
    let safety: number | undefined;

    // Nothing is hidden until we have seen a real animation frame. If rAF never
    // fires - backgrounded tab, throttled engine, screenshot bot, crawler - the
    // hero is simply never hidden and renders complete.
    const raf = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
        // The hidden state is applied HERE and never in the markup, so if this
        // never runs the hero still renders complete and readable.
        gsap.set(headerRef.current, { yPercent: -160 });
        gsap.set(panelRef.current, {
          clipPath: "inset(47% 0% 47% 0% round 32px)",
        });
        gsap.set(textRef.current, { opacity: 0, scale: 1.14 });
        gsap.set(backRef.current, { opacity: 0, yPercent: -4 });
        gsap.set(frontRef.current, { opacity: 0, yPercent: 8 });

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.to(panelRef.current, {
          clipPath: "inset(0% 0% 0% 0% round 32px)",
          duration: 1.15,
          ease: "power4.inOut",
        })
          .to(backRef.current, { opacity: 1, yPercent: 0, duration: 1.5 }, 0.3)
          .to(textRef.current, { opacity: 1, scale: 1, duration: 1.25 }, 0.42)
          .to(frontRef.current, { opacity: 1, yPercent: 0, duration: 1.5 }, 0.46)
          .to(headerRef.current, { yPercent: 0, duration: 0.9 }, 0.7);

        // Belt and braces: if the timeline ever stalls part-way, jump it to the
        // end so the hero can never be left half-revealed.
        safety = window.setTimeout(() => {
          if (tl.progress() < 1) tl.progress(1);
        }, 4000);

        // Slow drift lives on the <img> so it never fights the entrance tweens,
        // which run on the wrapper.
        gsap.to(backImgRef.current, {
          xPercent: 1.4,
          duration: 30,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
        gsap.to(frontImgRef.current, {
          yPercent: -1.6,
          duration: 15,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      });
    });

    return () => {
      cancelAnimationFrame(raf);
      if (safety) window.clearTimeout(safety);
      ctx?.revert();
    };
  }, []);

  return (
    <>
      <a
        href="#hero-heading"
        className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-6 focus:z-[1100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:font-archivo focus:text-ink focus:shadow-card"
      >
        Skip to main content
      </a>

      <header
        ref={headerRef}
        className="fixed inset-x-0 top-0 z-[1000] p-8 max-md:p-5"
      >
        <div className="relative mx-auto flex max-w-[1200px] items-center justify-between rounded-[16px] bg-white/85 p-2 shadow-[0_4px_22px_rgba(116,130,151,0.15)] backdrop-blur-md">
          <Link
            href="/"
            aria-label="Dars — home"
            className="z-10 flex items-center gap-2.5 pl-1"
          >
            <img
              src="/assets/img/logo.png"
              alt=""
              width={36}
              height={36}
              className="h-9 w-9 rounded-[9px]"
              draggable={false}
            />
            <span className="font-archivo text-[20px] font-semibold tracking-[-0.01em] text-ink max-[380px]:sr-only">
              Dars
            </span>
          </Link>

          <nav
            aria-label="Primary"
            className="absolute inset-0 flex items-center justify-center max-md:hidden"
          >
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-5 py-2 font-archivo text-[17px] font-medium leading-6 text-ink transition-colors duration-150 hover:bg-ink/[0.07]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/beta-access"
            className="z-10 inline-flex items-center justify-center rounded-[8px] bg-ink px-5 py-2 font-archivo text-[17px] font-medium leading-6 tracking-[0.01em] text-white transition-colors duration-150 hover:bg-ink-soft active:bg-ink-soft max-md:text-[15px]"
          >
            Join the beta
          </Link>
        </div>
      </header>

      <main className="flex h-[100svh] max-h-[1440px] flex-col p-4 max-md:p-3">
        <section
          ref={panelRef}
          aria-labelledby="hero-heading"
          className="relative mx-auto h-full w-full max-w-[1440px] flex-1 overflow-hidden rounded-[32px] bg-gradient-to-b from-[#15aeea] to-[#73cef2] max-md:rounded-[28px]"
        >
          {/* distant cloud layer, behind the headline */}
          <div
            ref={backRef}
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 z-[1] w-[2048px] -translate-x-1/2 max-lg:w-[1500px] max-md:w-[1280px]"
          >
            <img
              ref={backImgRef}
              src="/assets/lander2/cloud-back.webp"
              alt=""
              width={2048}
              height={1024}
              className="h-auto w-full"
              draggable={false}
            />
          </div>

          {/* headline, sandwiched between the two cloud layers. The pt on the
              wrapper clears the floating nav, and the type is capped against
              viewport HEIGHT as well as width, so a short window can never
              drive the headline under the nav or off the panel. */}
          <div
            ref={textRef}
            className="absolute inset-0 z-[2] flex flex-col items-center justify-center px-6 pb-[17%] pt-[84px] max-md:pt-[68px] [@media(max-height:760px)]:pb-[8%]"
          >
            <span className="mb-3 font-gabarito text-[17px] font-semibold uppercase leading-6 tracking-[0.1em] text-[#01405F] max-lg:text-[15px] max-md:text-[12px]">
              For Alimiyyah students
            </span>
            <h1
              id="hero-heading"
              className="hero-title-gradient text-center font-archivo text-[min(128px,8.9vw,15.5vh)] font-semibold leading-[1.09] tracking-[-0.015em] max-[1200px]:text-[min(120px,8.6vw,15.5vh)] max-md:text-[min(64px,11vw,13vh)] max-md:leading-[1.12] [@media(max-height:760px)]:text-[min(72px,8vw,11.5vh)]"
            >
              Your syllabus,
              <br />
              drilled until
              <br />
              you know it
            </h1>
          </div>

          {/* near cloud bank, in front of the headline */}
          <div
            ref={frontRef}
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[47%] z-[3] w-[2048px] -translate-x-1/2 max-lg:top-[50%] max-lg:w-[1500px] max-md:top-[50%] max-md:w-[1280px]"
          >
            <img
              ref={frontImgRef}
              src="/assets/lander2/cloud-front.webp"
              alt=""
              width={2048}
              height={1000}
              fetchPriority="high"
              className="h-auto w-full"
              draggable={false}
            />
          </div>
        </section>
      </main>

      <AboutSection />
      <FeaturesSection />
      <HalaqahSection />
      <ClosingSection />
      <Footer />
    </>
  );
}
