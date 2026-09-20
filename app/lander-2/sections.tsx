"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Scroll reveal that only ever animates POSITION, never opacity. If the
 * observer never fires - no JS, throttled engine, crawler - the content is
 * still fully painted and readable; it just sits where it started.
 */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useIsoLayoutEffect(() => {
    if (!ref.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ctx: gsap.Context | undefined;
    const raf = requestAnimationFrame(() => {
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        const targets = gsap.utils.toArray<HTMLElement>("[data-reveal]");
        if (!targets.length) return;
        gsap.fromTo(
          targets,
          { y: 34 },
          {
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: { trigger: ref.current, start: "top 82%", once: true },
          },
        );
      }, ref);
    });

    return () => {
      cancelAnimationFrame(raf);
      ctx?.revert();
    };
  }, []);

  return ref;
}

/* ------------------------------------------------------------------ about -- */

export function AboutSection() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      id="about"
      ref={ref}
      className="scroll-mt-28 px-4 pb-4 max-md:px-3 max-md:pb-3"
    >
      <div className="relative mx-auto max-w-[1440px] overflow-hidden rounded-[32px] bg-gradient-to-b from-[#DCEEF9] to-[#F6FBFD] max-md:rounded-[28px]">
        {/* the hero's sky carries on here, so the page reads as one surface */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/2 w-[2048px] -translate-x-1/2 opacity-45 max-lg:w-[1500px]"
        >
          <img
            src="/assets/lander2/cloud-back.webp"
            alt=""
            width={2048}
            height={1024}
            className="h-auto w-full"
            draggable={false}
          />
        </div>

        <div className="relative mx-auto max-w-[1080px] px-10 py-32 max-lg:py-24 max-md:px-6 max-md:py-20">
          <h2
            data-reveal
            className="font-archivo text-[clamp(32px,4.6vw,62px)] font-semibold leading-[1.1] tracking-[-0.018em] text-[#062A3D]"
          >
            Alimiyyah is thousands of pages. Dars makes them revisable.
          </h2>
          <p
            data-reveal
            className="mt-8 max-w-[680px] font-archivo text-[clamp(17px,1.5vw,21px)] leading-[1.62] text-[#0B4761]"
          >
            Every book on your syllabus, split into its real chapters, with the
            summary, the key points and the cards built from the actual text.
            Not a generic deck somebody else made for a different course.
          </p>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- features -- */

const FEATURES = [
  {
    label: "Read",
    body: "Your books, chapter by chapter, with the summary and key points sitting beside the text.",
    src: "/assets/img/book read page.png",
    lift: "mt-0",
  },
  {
    label: "Drill",
    body: "Flashcards that come back exactly when you were about to forget them.",
    src: "/assets/img/flashcard.png",
    lift: "mt-10",
  },
  {
    label: "Test",
    body: "Quizzes on every chapter, and full mock exams when you are ready for them.",
    src: "/assets/img/quiz.png",
    lift: "mt-4",
  },
  {
    label: "Track",
    body: "Today's plan, what is due, what has gone weak, and what you have mastered.",
    src: "/assets/img/revise.png",
    lift: "mt-14",
  },
];

export function FeaturesSection() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      id="features"
      ref={ref}
      className="scroll-mt-28 px-4 pb-4 max-md:px-3 max-md:pb-3"
    >
      <div className="relative mx-auto max-w-[1440px] overflow-hidden rounded-[32px] bg-[#F6FBFD] pt-24 max-md:rounded-[28px] max-md:pt-16">
        <h2
          data-reveal
          className="mx-auto max-w-[1080px] px-10 font-archivo text-[clamp(30px,4vw,54px)] font-semibold leading-[1.1] tracking-[-0.018em] text-[#062A3D] max-md:px-6"
        >
          Four things, done properly.
        </h2>

        <div className="mx-auto mt-16 grid max-w-[1240px] grid-cols-4 gap-8 px-10 max-lg:grid-cols-2 max-lg:gap-x-8 max-lg:gap-y-14 max-md:grid-cols-1 max-md:px-6">
          {FEATURES.map((f) => (
            <div key={f.label} data-reveal className={f.lift}>
              <h3 className="font-archivo text-[22px] font-semibold tracking-[-0.01em] text-[#062A3D]">
                {f.label}
              </h3>
              <p className="mt-2 font-archivo text-[16px] leading-[1.55] text-[#3D6A80]">
                {f.body}
              </p>
              {/* real, populated product screens - floated and clipped at the
                  panel edge rather than sat in an empty device frame */}
              <div className="mt-8 overflow-hidden rounded-t-[26px] border border-white/70 shadow-[0_10px_28px_-14px_rgba(6,42,61,0.34)]">
                <Image
                  src={f.src}
                  alt={`Dars ${f.label} screen`}
                  width={1206}
                  height={2622}
                  sizes="(max-width: 767px) 86vw, (max-width: 1023px) 42vw, 22vw"
                  className="block h-auto w-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- halaqahs -- */

export function HalaqahSection() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      id="halaqas"
      ref={ref}
      className="scroll-mt-28 px-4 pb-4 max-md:px-3 max-md:pb-3"
    >
      <div className="relative mx-auto grid max-w-[1440px] grid-cols-2 items-center gap-10 overflow-hidden rounded-[32px] bg-[#062A3D] max-lg:grid-cols-1 max-md:rounded-[28px]">
        <div className="px-16 py-28 max-lg:px-10 max-lg:pb-0 max-lg:pt-20 max-md:px-6 max-md:pt-16">
          <h2
            data-reveal
            className="font-archivo text-[clamp(30px,3.6vw,52px)] font-semibold leading-[1.1] tracking-[-0.018em] text-white"
          >
            Revise with your halaqah, not alone.
          </h2>
          <p
            data-reveal
            className="mt-7 max-w-[460px] font-archivo text-[clamp(16px,1.4vw,19px)] leading-[1.62] text-[#9FC4D6]"
          >
            Join your halaqah, hold a streak, climb the table and take on
            challenges together. The people you study with are the reason you
            keep turning up.
          </p>
          <Link
            data-reveal
            href="/beta-access"
            className="mt-10 inline-flex items-center justify-center rounded-[8px] bg-[#EC6144] px-6 py-3 font-archivo text-[17px] font-medium leading-6 text-white transition-colors duration-150 hover:bg-[#D14A30]"
          >
            Join the beta
          </Link>
        </div>

        <div
          data-reveal
          className="relative h-full min-h-[520px] max-lg:min-h-[440px]"
        >
          <div className="absolute left-[6%] top-16 w-[46%] overflow-hidden rounded-[26px] border border-white/12 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.6)] max-lg:left-[14%] max-lg:w-[38%]">
            <Image
              src="/assets/img/halaqas.png"
              alt="The Dars halaqah and leaderboard screen"
              width={1206}
              height={2622}
              sizes="(max-width: 1023px) 38vw, 24vw"
              className="block h-auto w-full"
            />
          </div>
          <div className="absolute left-[48%] top-32 w-[46%] overflow-hidden rounded-[26px] border border-white/12 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.6)] max-lg:left-[50%] max-lg:w-[38%]">
            <Image
              src="/assets/img/selectedhalaqa.png"
              alt="A selected halaqah in Dars"
              width={1206}
              height={2622}
              sizes="(max-width: 1023px) 38vw, 24vw"
              className="block h-auto w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- closing -- */

export function ClosingSection() {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} className="px-4 pb-4 max-md:px-3 max-md:pb-3">
      <div className="relative mx-auto max-w-[1440px] overflow-hidden rounded-[32px] bg-gradient-to-b from-[#15aeea] to-[#73cef2] max-md:rounded-[28px]">
        {/* the same bank that opens the page closes it, rising into the bottom
            edge only - the copy above it stays on the sky and stays readable */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[46%] z-[1] w-[1700px] -translate-x-1/2 max-lg:w-[1400px] max-md:top-[52%] max-md:w-[1150px]"
        >
          <img
            src="/assets/lander2/cloud-front.webp"
            alt=""
            width={2048}
            height={1000}
            className="h-auto w-full"
            draggable={false}
          />
        </div>

        <div className="relative z-[3] flex min-h-[660px] flex-col items-center justify-center px-6 pb-[14%] pt-28 max-md:min-h-[520px] max-md:pt-20">
          <h2
            data-reveal
            className="hero-title-gradient text-center font-archivo text-[clamp(38px,6.4vw,92px)] font-semibold leading-[1.08] tracking-[-0.015em]"
          >
            The beta is open.
          </h2>
          <p
            data-reveal
            className="mt-6 text-center font-archivo text-[clamp(16px,1.5vw,20px)] leading-[1.5] text-[#01405F]"
          >
            2,100+ students are already on the list.
          </p>
          <Link
            data-reveal
            href="/beta-access"
            className="mt-10 inline-flex items-center justify-center rounded-[8px] bg-ink px-7 py-3.5 font-archivo text-[18px] font-medium leading-6 text-white transition-colors duration-150 hover:bg-ink-soft max-md:text-[16px]"
          >
            Join the beta
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- footer -- */

const FOOTER_LINKS = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Support", href: "/support" },
  { label: "Contribute", href: "/contribute" },
];

const SOCIALS = [
  { label: "Dars on Instagram", href: "https://instagram.com/getdars", src: "/assets/img/email/instagram.png" },
  { label: "Dars on TikTok", href: "https://tiktok.com/@dars.app", src: "/assets/img/email/tiktok.png" },
];

export function Footer() {
  return (
    <footer className="overflow-hidden bg-white px-4 max-md:px-3">
      <div className="mx-auto max-w-[1440px] px-10 max-md:px-4">
        <div className="flex items-center justify-between gap-8 border-t border-[#DCEAF1] py-10 max-md:flex-col max-md:items-start max-md:gap-6">
          <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-3">
            {FOOTER_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="font-archivo text-[16px] leading-6 text-[#3D6A80] transition-colors duration-150 hover:text-[#062A3D]"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            {SOCIALS.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="opacity-80 transition-opacity duration-150 hover:opacity-100"
              >
                <img src={s.src} alt="" width={22} height={22} className="h-[22px] w-[22px]" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* signature wordmark: sits on the same grid as the links above it and is
          anchored flush to the bottom edge, bleeding just off it */}
      <div className="mx-auto max-w-[1440px] px-10 max-md:px-4">
        <span
          aria-hidden="true"
          className="block translate-y-[0.13em] select-none font-archivo text-[clamp(96px,19.5vw,286px)] font-semibold leading-[0.8] tracking-[-0.035em] text-[#062A3D]/[0.13]"
        >
          Dars
        </span>
      </div>
    </footer>
  );
}
