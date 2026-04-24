"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WaitlistForm from "./waitlist-form";
import {
  Phone,
  Screen,
  SocialScreen,
  FlashcardScreen,
} from "./phone-screens";

const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" className="fill-amber-500">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

export default function HomePage() {
  const orbsRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const bentoRef = useRef<HTMLDivElement>(null);
  const [roleTab, setRoleTab] = useState<"students" | "teachers" | "institutes">("students");

  useEffect(() => {
    if (!bentoRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".bento-card");
      if (!cards.length) return;

      gsap.fromTo(
        cards,
        { y: 48, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: bentoRef.current,
            start: "top 80%",
            once: true,
          },
        },
      );
    }, bentoRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!carouselRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const sides = gsap.utils.toArray<HTMLElement>(".carousel-side");
      const step = 290;

      sides.forEach((side) => {
        const pos = parseFloat(side.dataset.pos || "0");
        const abs = Math.abs(pos);
        const restX = pos * step;
        const restScale = abs === 1 ? 0.86 : 0.72;
        const restOpacity = abs === 1 ? 0.8 : 0.35;

        gsap.fromTo(
          side,
          { x: 0, opacity: 0, scale: restScale * 0.88 },
          {
            x: restX,
            opacity: restOpacity,
            scale: restScale,
            ease: "sine.inOut",
            scrollTrigger: {
              trigger: carouselRef.current,
              start: "top 95%",
              end: "top 55%",
              scrub: 1.2,
            },
          },
        );
      });
    }, carouselRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!orbsRef.current) return;
    const ctx = gsap.context(() => {
      const orbs = gsap.utils.toArray<HTMLElement>(".orb-el");
      if (!orbs.length) return;

      // Outer element: emerges from behind the phone to its resting position.
      const isMd = window.matchMedia("(min-width: 768px)").matches;
      gsap.set(orbs, {
        opacity: 0,
        scale: 0.2,
        x: (_i, target: HTMLElement) =>
          parseFloat(
            (isMd ? target.dataset.fromXMd : target.dataset.fromX) || "0",
          ),
        y: (_i, target: HTMLElement) =>
          parseFloat(
            (isMd ? target.dataset.fromYMd : target.dataset.fromY) || "0",
          ),
      });

      gsap.to(orbs, {
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
        duration: 1.4,
        ease: "power3.out",
        stagger: 0.1,
      });

      // Inner element: orbits continuously from t=0 so motion is fluid,
      // no discrete "emerge then orbit" handoff.
      const inners = gsap.utils.toArray<HTMLElement>(".orb-inner");
      inners.forEach((inner) => {
        const radiusX = 14 + Math.random() * 12;
        const radiusY = 10 + Math.random() * 10;
        const duration = 8 + Math.random() * 6;
        const direction = Math.random() > 0.5 ? 1 : -1;
        const state = { angle: Math.random() * Math.PI * 2 };
        gsap.to(state, {
          angle: state.angle + direction * Math.PI * 2,
          duration,
          ease: "none",
          repeat: -1,
          onUpdate: () => {
            gsap.set(inner, {
              x: Math.cos(state.angle) * radiusX,
              y: Math.sin(state.angle) * radiusY,
            });
          },
        });
      });
    }, orbsRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen bg-[#fffcf6] text-ink overflow-x-clip">
      {/* ===== NAV (floating pill) ===== */}
      <nav className="fixed top-5 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
        <div className="pointer-events-auto w-full max-w-5xl bg-card/90 backdrop-blur-xl border border-border rounded-full shadow-card pl-5 pr-3 py-3 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 shrink-0">
            <img
              src="/assets/img/logo.png"
              alt="Dars logo"
              width={40}
              height={40}
              className="w-10 h-10 rounded-xl shadow-soft object-cover"
            />
            <span className="font-display text-[22px] leading-none tracking-tight">Dars</span>
          </a>

          <div className="hidden md:flex gap-9 items-center text-[15px] text-ink-soft font-medium">
            <a href="#about" className="hover:text-ink transition-colors">About</a>
            <a href="#features" className="hover:text-ink transition-colors">Features</a>
            <a href="#institutes" className="hover:text-ink transition-colors">Institutes</a>
            <a href="#halaqas" className="hover:text-ink transition-colors">Halaqas</a>
            <a href="#reviews" className="hover:text-ink transition-colors">Reviews</a>
          </div>

          <a
            href="#waitlist"
            className="bg-ink text-cream-100 px-5 py-2.5 rounded-full text-[14px] font-medium inline-flex items-center gap-2 hover:bg-ink-soft transition-colors shrink-0 shadow-soft"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-coral-400 shadow-[0_0_10px_theme(colors.coral.400)]" />
            Join waitlist
          </a>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section className="relative pt-36 md:pt-44 pb-10 text-center">
        {/* ambient gradient */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 20%, rgba(236,97,68,0.12), transparent 70%), radial-gradient(ellipse 40% 30% at 85% 40%, rgba(212,169,67,0.08), transparent 70%)",
          }}
        />

        <div className="relative  mx-auto px-6">
          <span className="inline-flex items-center gap-2 border border-border-strong bg-card px-4 py-1.5 rounded-full text-[12px] font-medium text-ink-soft shadow-soft">
            <span className="w-1.5 h-1.5 rounded-full bg-coral-500 animate-pulse-dot" />
            Join the waitlist
          </span>

          <h1 className="font-display font-light text-[51px] md:text-[72px] lg:text-[84px] leading-[1.02] tracking-tight mt-5 text-balance">
            The revision app for{" "}
            <br />
            <em className="text-coral-500 font-light italic ">
              Alimiyyah students.
            </em>
          </h1>

          <p className="mt-6 text-md md:text-lg text-ink-soft max-w-[54ch] mx-auto leading-relaxed text-pretty">
            Re-read your books. Drill flashcards. Compete with your halaqah. Sit
            mock exams. One app, mapped to your exact syllabus, from Nahw
            to Bukhari.
          </p>

          <div className="mt-8">
            <WaitlistForm />
          </div>

          <p className="mt-3.5 text-[12.5px] text-ink-muted">
            <strong className="text-ink font-semibold">100+ students</strong>{" "}
            on the waitlist · Get early access and launch updates
          </p>

          {/* HERO PHONE with floating UI cards */}
          <div ref={orbsRef} className="relative mt-14 min-h-[280px] sm:min-h-[320px] md:min-h-[380px]">
            {/* ==== Faded backdrop arc ==== */}
            <div aria-hidden className="absolute inset-x-0 top-0 flex justify-center pointer-events-none z-0">
              <div className="mt-6 md:mt-10 w-[360px] sm:w-[520px] md:w-[720px] aspect-square rounded-full bg-gradient-to-b from-sky-100 via-sky-50/60 to-transparent opacity-70" />
            </div>

            {/* ==== BEHIND PHONE layer — mid sides of ellipse (9 & 3 o'clock) — desktop only ==== */}
            <div className="hidden md:block absolute inset-0 pointer-events-none z-[1]">
              <FloatCard
                position="md:top-[42%] md:left-[-1%]"
                width="w-[140px]"
                originX="300" originY="0"
                rotate="-rotate-[3deg]"
              >
                <FloatCardToday />
              </FloatCard>

              <FloatCard
                position="md:top-[42%] md:right-[-1%]"
                width="w-[160px]"
                originX="-300" originY="0"
                rotate="rotate-[3deg]"
              >
                <FloatCardFlashcard />
              </FloatCard>
            </div>

            {/* ==== PHONE (middle layer) — 3-phone composition ==== */}
            <div className="absolute left-1/2 top-0 -translate-x-1/2 z-10">
              <div
                className="relative w-[780px] h-[620px] scale-[0.55] sm:scale-[0.72] md:scale-[0.95] origin-top"
                style={{
                  maskImage:
                    "linear-gradient(to bottom, black 25%, transparent 55%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, black 25%, transparent 55%)",
                }}
              >
                {/* Center — upright, slides in from bottom */}
                <div className="absolute top-0 left-1/2 z-20 animate-hero-phone-center">
                  <Phone shadow={false} bare>
                    <img
                      src="/assets/img/dash mockup.png"
                      alt="Dars app dashboard"
                      className="w-full h-full object-cover object-top"
                    />
                  </Phone>
                </div>

                {/* Left — fans out from center */}
                <div className="absolute top-0 left-1/2 z-10 animate-hero-phone-left">
                  <Phone bare shadow={false}>
                    <img
                      src="/assets/img/quiz.png"
                      alt=""
                      className="w-full h-full object-cover object-top"
                    />
                  </Phone>
                </div>

                {/* Right — fans out from center */}
                <div className="absolute top-0 left-1/2 z-10 animate-hero-phone-right">
                  <Phone bare shadow={false}>
                    <img
                      src="/assets/img/ai.png"
                      alt=""
                      className="w-full h-full object-cover object-top"
                    />
                  </Phone>
                </div>
              </div>
            </div>

            {/* ==== IN-FRONT big cards — desktop only ==== */}
            <div className="hidden md:block absolute inset-0 pointer-events-none z-20">
              <FloatCard
                position="md:top-[6%] md:left-[10%]"
                width="w-[170px]"
                originX="280" originY="220"
                rotate="-rotate-[5deg]"
              >
                <FloatCardStreak />
              </FloatCard>

              <FloatCard
                position="md:top-[6%] md:right-[10%]"
                width="w-[160px]"
                originX="-280" originY="220"
                rotate="rotate-[5deg]"
              >
                <FloatCardMastery />
              </FloatCard>

              <FloatCard
                position="md:top-[74%] md:left-[12%]"
                width="w-[150px]"
                originX="260" originY="-220"
                rotate="rotate-[4deg]"
              >
                <FloatCardQuiz />
              </FloatCard>

              <FloatCard
                position="md:top-[74%] md:right-[12%]"
                width="w-[170px]"
                originX="-260" originY="-220"
                rotate="-rotate-[4deg]"
              >
                <FloatCardHalaqah />
              </FloatCard>

              {/* Tiny decorative pills filling the side gaps (desktop positions) */}
              <FloatCard
                position="md:top-[26%] md:left-[2%]"
                width="w-auto"
                originX="220" originY="0"
                rotate="-rotate-[6deg]"
              >
                <FloatPillXP />
              </FloatCard>

              <FloatCard
                position="md:top-[26%] md:right-[2%]"
                width="w-auto"
                originX="-220" originY="0"
                rotate="rotate-[6deg]"
              >
                <FloatPillBadge />
              </FloatCard>

              <FloatCard
                position="md:top-[58%] md:left-[3%]"
                width="w-auto"
                originX="200" originY="0"
                rotate="rotate-[5deg]"
              >
                <FloatPillWeek />
              </FloatCard>

              <FloatCard
                position="md:top-[58%] md:right-[3%]"
                width="w-auto"
                originX="-200" originY="0"
                rotate="-rotate-[5deg]"
              >
                <FloatPillMastered />
              </FloatCard>
            </div>

            {/* ==== MOBILE-ONLY tiny pills — tucked into empty corners around the phones ==== */}
            <div className="md:hidden absolute inset-0 pointer-events-none z-20">
              <FloatCard
                position="top-[2%] left-[3%]"
                width="w-auto"
                originX="80" originY="20"
                rotate="-rotate-[6deg]"
              >
                <FloatPillXP />
              </FloatCard>

              <FloatCard
                position="top-[2%] right-[3%]"
                width="w-auto"
                originX="-80" originY="20"
                rotate="rotate-[6deg]"
              >
                <FloatPillBadge />
              </FloatCard>

              <FloatCard
                position="top-[26%] left-[0%]"
                width="w-auto"
                originX="60" originY="0"
                rotate="rotate-[5deg]"
              >
                <FloatPillWeek />
              </FloatCard>

              <FloatCard
                position="top-[26%] right-[0%]"
                width="w-auto"
                originX="-60" originY="0"
                rotate="-rotate-[5deg]"
              >
                <FloatPillMastered />
              </FloatCard>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SCREEN CAROUSEL ===== */}
      <section id="about" className="relative py-20 md:py-28 overflow-hidden">
        {/* faded circle backdrop */}
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] md:w-[1100px] md:h-[1100px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(236,97,68,0.16) 0%, rgba(212,169,67,0.08) 35%, rgba(255,247,236,0) 68%)",
          }}
        />

        <div className="relative  mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <span className="text-[11px] font-semibold tracking-wider text-coral-500 uppercase">
              ◆ For the serious student
            </span>
            <h2 className="mt-3 font-display text-[36px] md:text-[56px] leading-[1.02] tracking-tight text-balance">
              Everything you need {" "}
              <br />
              <em className="italic text-coral-500 font-normal">To be a first-bench student.</em>
            </h2>
            <p className="mt-5 text-lg text-ink-soft leading-relaxed max-w-[54ch] mx-auto">
            Flashcards for today's chapter. Summaries for every kitāb. A halaqah of your classmates. Progress tracking that's actually honest.
            </p>
          </div>

          <div
            ref={carouselRef}
            className="relative h-[320px] sm:h-[440px] md:h-[680px] flex items-center justify-center overflow-hidden"
          >
            {/* Inner wrapper scales the whole scene down on small screens */}
            <div className="relative scale-[0.4] sm:scale-[0.6] md:scale-100 origin-center">
              {/* Center — framed phone (in flow → defines size for abs siblings) */}
              <div className="relative z-20">
                <Phone shadow={false} bare>
                  <img
                    src="/assets/img/flashcard.png"
                    alt=""
                    className="w-full h-full object-cover object-top"
                  />
                </Phone>
              </div>

              {/* Far left — frameless */}
              <div
                data-pos="-2"
                className="carousel-side absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 z-0"
              >
                <Screen bare>
                  <img
                    src="/assets/img/ai.png"
                    alt=""
                    className="w-full h-full object-cover object-top"
                  />
                </Screen>
              </div>

              {/* Left — frameless */}
              <div
                data-pos="-1"
                className="carousel-side absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 z-10"
              >
                <Screen bare>
                  <img
                    src="/assets/img/book revise page.png"
                    alt=""
                    className="w-full h-full object-cover object-top"
                  />
                </Screen>
              </div>

              {/* Right — frameless */}
              <div
                data-pos="1"
                className="carousel-side absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 z-10"
              >
                <Screen bare>
                  <img
                    src="/assets/img/revise.png"
                    alt=""
                    className="w-full h-full object-cover object-top"
                  />
                </Screen>
              </div>

              {/* Far right — frameless */}
              <div
                data-pos="2"
                className="carousel-side absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 z-0"
              >
                <Screen bare>
                  <img
                    src="/assets/img/book read page.png"
                    alt=""
                    className="w-full h-full object-cover object-top"
                  />
                </Screen>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES (three pillars) ===== */}
      <section id="features" className="py-20 md:py-28">
        <div className=" mx-auto px-4 md:px-16">
          <div className="grid md:grid-cols-2 gap-10 items-end mb-12">
            <div>

              <h2 className="font-display font-light text-[40px] md:text-[56px] leading-[1.02] tracking-tight text-balance">
                Built for the books<br />
                <em className="italic text-coral-500 font-normal">
                  You actually study.
                </em>
              </h2>
            </div>
            <p className="text-lg text-ink-soft leading-relaxed max-w-[48ch] pb-2">

The first revision app built for the Alimiyyah syllabus. No more scattered notebooks, photocopies or WhatsApp voice notes, just the books you're studying, ready to revise.            </p>
          </div>

          {/* bento grid: 3 on top, 2 on bottom */}
          <div ref={bentoRef} className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <BentoCard
                bg="bg-cream-200"
                title="Every chapter, ready to revise"
                desc="Keypoints, notes and bite-sized summaries written for every chapter of every kitab. Revise smart, not by re-reading the whole book."
                visual={<ReadingPreview />}
              />
              <BentoCard
                bg="bg-sage-100"
                title="Revise with flashcards"
                desc="Drill every hadith, mas'ala and naḥw rule as flashcards, auto-generated from the chapters you've studied, ready to revise in 10 minutes a day."
                visual={<FlashcardsPreview />}
              />
              <BentoCard
                bg="bg-sky-100"
                title="See where you stand"
                desc="Streaks, mastery percentages, chapter-by-chapter progress. Know what you actually know."
                visual={<MasteryPreview />}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <BentoCard
                bg="bg-cream-300"
                title="Revise with your classmates"
                desc="Join your class inside the app. Quiz each other, revise together, and keep track of who's ahead, the whole halaqah pulling each other through the syllabus."
                visual={<HalaqahPreview />}
              />
              <BentoCard
                bg="bg-coral-100"
                title="Ask Abdullah, your AI ustadh"
                desc="Stuck on a masʾalah? Abdullah answers your fiqh and usul questions, quotes the daleel, and drops you straight to the exact chapter to revise."
                visual={<AbdullahAskPreview />}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== CLASSES & INSTITUTES (tab slider) ===== */}
      <section id="institutes" className="bg-cream-200 py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 bg-card border border-border px-3.5 py-1.5 rounded-full text-[11px] font-semibold tracking-wider text-coral-500 uppercase shadow-soft">
              ◆ Classes &amp; institutes
            </span>
            <h2 className="mt-5 font-display text-[36px] md:text-[56px] leading-[1.02] tracking-tight text-balance">
              Built for the{" "}
              <em className="italic text-coral-500 font-normal">
                whole classroom.
              </em>
            </h2>
            <p className="mt-5 text-lg text-ink-soft leading-relaxed max-w-[58ch] mx-auto">
              Dars isn&apos;t just for students. Teachers run their own
              halaqah inside the app, and whole institutes bring every class,
              teacher and student under one roof.
            </p>
          </div>

          {/* pill tabs */}
          <div className="mt-10 px-4 sm:flex sm:justify-center sm:px-0">
            <div className="flex w-full gap-0.5 p-1 rounded-full bg-card border border-border shadow-soft sm:inline-flex sm:w-auto sm:gap-1 sm:p-1.5">
              {ROLE_TABS.map((t) => {
                const isActive = roleTab === t.id;
                const isSoon = t.id !== "students";
                return (
                  <button
                    key={t.id}
                    onClick={() => setRoleTab(t.id)}
                    type="button"
                    className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-7 py-2 sm:py-2.5 rounded-full text-[13px] sm:text-[15px] font-medium transition-colors ${isActive
                        ? "bg-coral-500 text-white shadow-soft"
                        : "text-ink-soft hover:text-ink"
                      }`}
                  >
                    <span className="truncate">{t.label}</span>
                    {isSoon && (
                      <span
                        className={`text-[8px] sm:text-[10px] font-semibold tracking-wider uppercase px-1 sm:px-1.5 py-0.5 rounded-full transition-colors shrink-0 ${isActive
                            ? "bg-white/25 text-white"
                            : "bg-coral-100 text-coral-500"
                          }`}
                      >
                        Soon
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* active card */}
          {(() => {
            const active = ROLE_TABS.find((t) => t.id === roleTab)!;
            return (
              <div className="mt-8 md:mt-10 relative rounded-[24px] md:rounded-[32px] border border-border shadow-card bg-card p-2.5 md:p-4">
                <div className="relative grid md:grid-cols-2 gap-2.5 md:gap-4 md:min-h-[620px]">
                  {/* LEFT: eyebrow + caption + stat (pastel) */}
                  <div
                    className={`relative z-10 p-5 sm:p-8 md:p-10 rounded-[18px] md:rounded-[26px] flex flex-col justify-between gap-5 md:gap-10 order-2 md:order-1 transition-colors duration-300 ${active.bg}`}
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex w-fit items-center gap-2 bg-card/70 backdrop-blur-sm border border-border/70 px-3 py-1.5 rounded-full text-[10.5px] sm:text-[11px] font-semibold tracking-wider text-coral-500 uppercase shadow-soft">
                        ◆ {active.eyebrow}
                      </span>
                      {active.id !== "students" && (
                        <span className="inline-flex items-center gap-1.5 bg-ink/90 text-white px-3 py-1.5 rounded-full text-[10.5px] sm:text-[11px] font-semibold tracking-wider uppercase shadow-soft">
                          <span className="w-1.5 h-1.5 rounded-full bg-coral-400 animate-pulse" />
                          Coming soon
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="text-ink font-display text-[18px] sm:text-[24px] md:text-[28px] leading-[1.25] text-pretty max-w-[28ch]">
                        {active.caption}
                      </p>
                      <div className="mt-4 md:mt-7 flex items-end gap-3 sm:gap-4 flex-wrap">
                        <div className="font-display text-[32px] sm:text-[44px] md:text-[52px] leading-[1.05] text-ink">
                          {active.stat}
                        </div>
                        <div className="text-ink-soft text-[14px] sm:text-[15.5px] leading-snug pb-1.5 max-w-[20ch]">
                          {active.statLabel}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT: mock visual (white) */}
                  <div className="relative z-10 order-1 md:order-2 flex items-center justify-center p-4 sm:p-6 md:p-8 rounded-[18px] md:rounded-[26px] overflow-hidden bg-card">
                    {active.visual}
                  </div>
                </div>
              </div>
            );
          })()}

          {/* CTA under the card */}
          <div className="mt-8 md:mt-10 flex flex-col items-center text-center">
            <p className="font-display text-[18px] sm:text-[20px] md:text-[22px] text-ink leading-snug max-w-[34ch]">
              Bringing your halaqah or madrasah on board?{" "}
              <em className="italic text-coral-500 font-normal">
                Get early access.
              </em>
            </p>
            <a
              href="#waitlist"
              className="mt-5 bg-ink text-cream-100 px-6 py-3 rounded-full text-[14px] font-medium inline-flex items-center gap-2 hover:bg-ink-soft transition-colors shadow-card"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-coral-400 shadow-[0_0_8px_theme(colors.coral.400)]" />
              Join waitlist
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
            <p className="mt-3 text-[12px] text-ink-muted">
              Free during beta · No spam, just launch updates.
            </p>
          </div>
        </div>
      </section>

      {/* ===== HALAQAS — group revision ===== */}
      <section id="halaqas" className="py-20 md:py-28">
        <div className=" mx-auto px-6">
          <div className="relative rounded-[24px] md:rounded-[32px] p-2.5 md:p-4">
            <div className="relative grid md:grid-cols-2 gap-2.5 md:gap-4 md:min-h-[620px]">
              {/* LEFT: eyebrow + headline + body + feature pills (pastel) */}
              <div className="relative z-10 bg-coral-100 p-6 sm:p-9 md:p-12 rounded-[18px] md:rounded-[26px] flex flex-col justify-center order-2 md:order-1">
                <span className="inline-flex w-fit items-center gap-2 bg-card/70 backdrop-blur-sm border border-border/70 px-3 py-1.5 rounded-full text-[10.5px] sm:text-[11px] font-semibold tracking-wider text-coral-500 uppercase shadow-soft">
                  ◆ Your halaqah
                </span>
                <h3 className="mt-6 md:mt-8 font-display text-[32px] sm:text-[40px] md:text-[48px] leading-[1.04] tracking-tight text-balance">
                  Revise together,{" "}
                  <em className="italic text-coral-500 font-normal">
                    move forward together.
                  </em>
                </h3>
                <p className="mt-4 md:mt-5 text-[15px] sm:text-[16px] text-ink-soft leading-relaxed max-w-[42ch]">
                  Quiz your classmates, set weekly challenges, and climb the
                  halaqah leaderboard — every revise counts.
                </p>
                <div className="mt-7 md:mt-9 flex flex-wrap gap-2">
                  {[
                    "Live leaderboard",
                    "Weekly challenges",
                    "1-tap join",
                  ].map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-2 bg-card/80 backdrop-blur-sm border border-border/60 px-3 py-1.5 rounded-full text-[12.5px] font-medium text-ink shadow-soft"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-coral-500" />
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* RIGHT: phone mockup (white) */}
              <div className="relative z-10 order-1 md:order-2 flex items-center justify-center p-4 sm:p-6 md:p-10 rounded-[18px] md:rounded-[26px] overflow-hidden bg-card">
                <div className="relative scale-[0.68] sm:scale-[0.82] md:scale-100 origin-center my-[-40px] sm:my-[-20px] md:my-0">
                  <Phone className="-rotate-[3deg]" bare>
                    <img
                      src="/assets/img/halaqas.png"
                      alt="Dars halaqah dashboard"
                      className="w-full h-full object-cover object-top"
                    />
                  </Phone>
                  <div className="absolute -top-4 -left-5 bg-coral-500 text-white px-3 py-1.5 rounded-full text-[11px] font-semibold shadow-coral -rotate-6">
                    Leading Mishkaat 3B
                  </div>
                  <div className="absolute -bottom-3 -right-4 bg-card border border-border px-3 py-1.5 rounded-full text-[11px] font-semibold shadow-card rotate-6 text-ink flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-sage-500" />
                    3 active halaqahs
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section id="reviews" className="py-10 md:py-16 pb-20 md:pb-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-cream-200 rounded-[32px] p-8 md:p-14">
            <div className="grid md:grid-cols-[1fr_2fr] gap-8 md:gap-12 items-end mb-8">
              <h2 className="font-display text-[32px] md:text-[46px] leading-[1.02] tracking-tight text-balance">
                What students<br />
                <em className="italic text-coral-500 font-normal">are saying</em>.
              </h2>
              <div className="flex gap-2 md:justify-end pb-1">
                <button
                  aria-label="Previous"
                  className="w-10 h-10 rounded-full border border-border-strong bg-card grid place-items-center hover:bg-cream-100 transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  aria-label="Next"
                  className="w-10 h-10 rounded-full border border-border-strong bg-card grid place-items-center hover:bg-cream-100 transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <TestimonialCard
                initial="ط"
                name="Tahir A."
                role="Year 4 · Bury"
                quote="Testing this app really showed me how easy it is to revise and learn. Revision used to be boring but now it feels fun"
              />
              <TestimonialCard
                initial="ت"
                name="Tasnim C."
                role="Graduate · Lancaster"
                quote="This is an amazing idea, I can see it being really helpful for students like me who struggle to keep up with revision. The flashcard feature is a game-changer"
              />

            </div>
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section id="waitlist" className="pb-20 md:pb-28 px-4 sm:px-6">
        <div className=" mx-auto">
          <div className="relative rounded-[28px] md:rounded-[36px] bg-coral-500 text-white px-6 py-12 sm:px-10 sm:py-16 md:p-16 overflow-hidden">
            {/* concentric circle pattern behind phones */}
            <div
              aria-hidden
              className="absolute right-[-180px] top-1/2 -translate-y-1/2 w-[820px] h-[820px] pointer-events-none hidden md:block"
            >
              {[320, 460, 600, 740, 820].map((size) => (
                <div
                  key={size}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.12]"
                  style={{ width: size, height: size }}
                />
              ))}
            </div>
            <div
              aria-hidden
              className="absolute right-[-40%] top-1/2 -translate-y-1/2 w-[380px] h-[380px] pointer-events-none md:hidden"
            >
              {[180, 260, 340, 380].map((size) => (
                <div
                  key={size}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.12]"
                  style={{ width: size, height: size }}
                />
              ))}
            </div>

            {/* ambient glow */}
            <div
              aria-hidden
              className="absolute -top-32 -right-32 w-[400px] h-[400px] pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,227,214,0.35), transparent 65%)",
              }}
            />
            <div
              aria-hidden
              className="absolute -bottom-32 -left-32 w-[320px] h-[320px] pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(26,24,20,0.18), transparent 65%)",
              }}
            />

            <div className="relative grid md:grid-cols-[1fr_1.05fr] gap-10 md:gap-8 items-center">
              <div>
                <span className="text-[11px] sm:text-[12px] font-semibold tracking-wider text-coral-100 uppercase">
                  ◆ Launching 2026
                </span>
                <h2 className="mt-3 font-display text-[34px] sm:text-[44px] md:text-[60px] leading-[1.02] tracking-tight text-balance">
                  Be first through{" "}
                  <em className="italic text-coral-100 font-normal">
                    the door.
                  </em>
                </h2>
                <p className="mt-4 text-[14.5px] sm:text-[15px] text-white/85 leading-relaxed max-w-[44ch]">
                  Early access, launch updates, and a direct line to
                  shape the app. Join 100+ students already on the list.
                </p>

                <div className="mt-7">
                  <WaitlistForm variant="dark" />
                </div>

                <p className="mt-4 text-[12px] text-white/65">
                  Free during beta · No spam, just launch updates.
                </p>
              </div>

              {/* Two tilted phones */}
              <div className="relative h-[360px] sm:h-[440px] md:h-[540px] flex items-center justify-center md:justify-end">
                <div className="relative scale-[0.55] sm:scale-[0.7] md:scale-[0.85] origin-center">
                  {/* Back phone (tilted further) */}
                  <div className="absolute -left-[180px] top-10 rotate-[-10deg] opacity-90">
                    <Phone shadow bare>
                      <img
                        src="/assets/img/flashcard.png"
                        alt=""
                        className="w-full h-full object-cover object-top"
                      />
                    </Phone>
                  </div>
                  {/* Front phone */}
                  <div className="relative rotate-[6deg]">
                    <Phone shadow>
                      <SocialScreen />
                    </Phone>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-border py-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap justify-between items-center gap-5">
            <a href="#" className="flex items-center gap-2.5">
              <img
                src="/assets/img/logo.png"
                alt="Dars logo"
                width={40}
                height={40}
                className="w-10 h-10 rounded-xl shadow-soft object-cover"
              />
              <span className="font-display text-[22px] leading-none tracking-tight">Dars</span>
            </a>

            <div className="flex gap-9 text-[15px] font-normal text-ink-soft">
              <a href="#features" className="hover:text-ink transition-colors">Features</a>
              <a href="#how" className="hover:text-ink transition-colors">How it works</a>
              <a href="#" className="hover:text-ink transition-colors">Privacy</a>
              <a href="#" className="hover:text-ink transition-colors">Terms</a>
            </div>

            <div className="flex gap-2">
              <a
                href="https://instagram.com/dars.app"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-ink text-cream-100 grid place-items-center hover:bg-ink-soft transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01" />
                </svg>
              </a>
              <a
                href="https://tiktok.com/@dars.app"
                aria-label="TikTok"
                className="w-9 h-9 rounded-full bg-ink text-cream-100 grid place-items-center hover:bg-ink-soft transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="mt-5 text-[11.5px] text-ink-muted">
            © 2026 Dars. All rights reserved. Built with ihsan for Alimiyyah students. Made by <a href="https://aurelo.uk" className="underline hover:text-ink transition-colors">Aurelo Web Studio</a>.
          </div>
        </div>
      </footer>
    </main>
  );
}

/* =======================================================
   Small helpers below
   ======================================================= */

function FloatCard({
  children,
  position,
  width,
  originX = "0",
  originY = "0",
  mdOriginX,
  mdOriginY,
  rotate = "",
}: {
  children: React.ReactNode;
  position: string;
  width: string;
  originX?: string;
  originY?: string;
  mdOriginX?: string;
  mdOriginY?: string;
  rotate?: string;
}) {
  return (
    <div
      className={`orb-el absolute ${position} ${width} opacity-0`}
      data-from-x={originX}
      data-from-y={originY}
      data-from-x-md={mdOriginX ?? originX}
      data-from-y-md={mdOriginY ?? originY}
    >
      <div className="orb-inner w-full">
        <div className={rotate}>{children}</div>
      </div>
    </div>
  );
}

/* Tiny decorative side-gap pills */
function FloatPillXP() {
  return (
    <div className="bg-coral-500 text-white rounded-full px-2.5 md:px-3 py-1 md:py-1.5 shadow-coral inline-flex items-center gap-1 whitespace-nowrap">
      <span className="text-[8px] md:text-[10px] font-semibold">+ 40 XP</span>
    </div>
  );
}

function FloatPillBadge() {
  return (
    <div className="bg-card border border-border rounded-full px-2.5 md:px-3 py-1 md:py-1.5 shadow-soft inline-flex items-center gap-1.5 whitespace-nowrap">
      <svg width="8" height="8" viewBox="0 0 24 24" className="fill-amber-500">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
      <span className="text-[8px] md:text-[10px] font-semibold text-ink">
        New badge
      </span>
    </div>
  );
}

function FloatPillWeek() {
  return (
    <div className="bg-card border border-border rounded-full px-2.5 md:px-3 py-1 md:py-1.5 shadow-soft inline-flex items-center gap-1.5 whitespace-nowrap">
      <span className="w-1.5 h-1.5 rounded-full bg-sage-500" />
      <span className="text-[8px] md:text-[10px] font-semibold text-ink">
        Week 7
      </span>
    </div>
  );
}

function FloatPillMastered() {
  return (
    <div className="bg-sage-100 border border-sage-500/20 rounded-full px-2.5 md:px-3 py-1 md:py-1.5 shadow-soft inline-flex items-center gap-1 whitespace-nowrap">
      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-sage-500">
        <path d="M5 13l4 4L19 7" />
      </svg>
      <span className="text-[8px] md:text-[10px] font-semibold text-sage-500">
        Mastered
      </span>
    </div>
  );
}

/* Streak · coral dashboard card (from home screen) */
function FloatCardStreak() {
  return (
    <div className="bg-coral-500 text-white rounded-2xl p-3 md:p-3.5 shadow-card">
      <div className="flex items-start justify-between">
        <div className="w-6 h-6 md:w-7 md:h-7 rounded-md bg-white/15 grid place-items-center">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="#E8D3A8">
            <path d="M13 3s4 4 4 9a5 5 0 01-10 0c0-2 1-3 1-5 0-1-1-2-1-2s3 1 3 4c0-3 2-5 3-6z" />
          </svg>
        </div>
        <div className="text-right leading-none">
          <div className="font-display text-[13px] md:text-[15px]">60</div>
          <div className="text-[7px] md:text-[8px] font-semibold tracking-wider text-white/75 mt-0.5">
            XP
          </div>
        </div>
      </div>
      <div className="font-display text-[17px] md:text-[22px] leading-none mt-2.5">
        2 days
      </div>
      <div className="text-[9px] md:text-[10px] text-white/80 mt-1">
        Current streak
      </div>
    </div>
  );
}

/* Level · progress + weekly stats (from profile screen) */
function FloatCardMastery() {
  return (
    <div className="bg-card border border-border rounded-2xl p-3 md:p-3.5 shadow-card">
      <div className="flex items-center gap-1.5">
        <div className="w-6 h-6 md:w-7 md:h-7 rounded-md bg-coral-500 grid place-items-center shrink-0">
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <circle cx="12" cy="8" r="6" />
            <path d="M9 13l-3 9 6-4 6 4-3-9" />
          </svg>
        </div>
        <div className="min-w-0">
          <div className="font-display text-[12px] md:text-[13px] text-ink leading-none">
            Level 1
          </div>
          <div className="text-[8px] md:text-[9px] text-ink-muted mt-0.5">
            30 XP to 2
          </div>
        </div>
      </div>
      <div className="mt-2 h-1 w-full rounded-full bg-cream-200 overflow-hidden">
        <div
          className="h-full bg-coral-500 rounded-full"
          style={{ width: "70%" }}
        />
      </div>
      <div className="mt-2 grid grid-cols-2 gap-1">
        <div className="bg-cream-200 rounded-md px-1.5 py-1">
          <div className="font-display text-[11px] md:text-[12px] text-ink leading-none">
            4/7
          </div>
          <div className="text-[7px] md:text-[8px] text-ink-muted tracking-wider font-semibold mt-0.5">
            WEEK
          </div>
        </div>
        <div className="bg-cream-200 rounded-md px-1.5 py-1">
          <div className="font-display text-[11px] md:text-[12px] text-ink leading-none">
            2/7
          </div>
          <div className="text-[7px] md:text-[8px] text-ink-muted tracking-wider font-semibold mt-0.5">
            BADGES
          </div>
        </div>
      </div>
    </div>
  );
}

/* Subject · sky-blue Nahw card (from subject screen) */
function FloatCardToday() {
  return (
    <div className="bg-sky-200 rounded-2xl p-3 md:p-3.5 shadow-card">
      <div className="flex justify-between items-start gap-1">
        <div className="min-w-0">
          <div className="text-[7.5px] md:text-[9px] font-semibold tracking-wider text-[#2E6F8E] uppercase">
            Subject
          </div>
          <div className="font-display text-[13px] md:text-[15px] text-ink mt-0.5">
            Nahw
          </div>
        </div>
        <div
          className="text-[16px] md:text-[20px] text-[#4A7E99] leading-none shrink-0"
          dir="rtl"
          style={{ fontFamily: "serif" }}
        >
          النحو
        </div>
      </div>
      <div className="mt-2 flex justify-between items-center">
        <div className="text-[8px] md:text-[9px] font-semibold tracking-wider text-[#2E6F8E]">
          0 / 414
        </div>
        <div className="text-[9px] md:text-[10px] font-bold text-[#2E6F8E]">
          0%
        </div>
      </div>
      <div className="mt-1 h-1 w-full rounded-full bg-white/60">
        <div
          className="h-full bg-[#4A7E99] rounded-full"
          style={{ width: "4%" }}
        />
      </div>
    </div>
  );
}

/* Flashcard · cream question card (from flashcard screen) */
function FloatCardFlashcard() {
  return (
    <div className="bg-card border border-border rounded-2xl p-3 md:p-3.5 shadow-card">
      <div className="text-[7.5px] md:text-[9px] font-semibold tracking-wider text-ink-muted uppercase">
        Question
      </div>
      <div
        className="text-[17px] md:text-[22px] font-semibold text-ink leading-tight mt-1.5 text-right"
        dir="rtl"
        style={{ fontFamily: "serif" }}
      >
        الْعِرَاقُ
      </div>
      <div className="text-[9px] md:text-[10px] text-ink-soft mt-1.5 leading-snug">
        What does this word mean?
      </div>
      <div className="mt-2 pt-1.5 border-t border-border/60 text-center text-[7px] md:text-[8px] tracking-wider font-semibold text-ink-subtle">
        TAP TO REVEAL
      </div>
    </div>
  );
}

/* Marketplace · amber deck card (from resources screen) */
function FloatCardQuiz() {
  return (
    <div className="bg-amber-500 text-white rounded-2xl p-3 md:p-3.5 shadow-card">
      <div className="text-[7.5px] md:text-[9px] font-semibold tracking-wider text-white/80 uppercase">
        Marketplace
      </div>
      <div className="font-display text-[12px] md:text-[14px] leading-[1.1] mt-1 text-balance">
        Quduri Deck
      </div>
      <div className="text-[8.5px] md:text-[10px] text-white/80 mt-0.5 leading-snug">
        180+ cards
      </div>
      <div className="mt-2 flex items-center justify-between text-[8.5px] md:text-[10px] font-semibold">
        <span className="flex items-center gap-0.5 text-white/90">
          <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3 6 6 .75-4.5 4.25 1 6L12 16l-5.5 3 1-6L3 8.75 9 8z" />
          </svg>
          4.9
        </span>
        <span className="text-white">Free</span>
      </div>
    </div>
  );
}

/* Halaqah · sage-green rank card (from halaqa screen) */
function FloatCardHalaqah() {
  return (
    <div className="bg-sage-500 text-white rounded-2xl p-3 md:p-3.5 shadow-card">
      <div className="flex items-center gap-1.5">
        <div className="w-6 h-6 md:w-7 md:h-7 rounded-md bg-white/15 grid place-items-center shrink-0">
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </div>
        <div className="min-w-0">
          <div className="text-[7.5px] md:text-[9px] font-semibold tracking-wider text-white/80 uppercase">
            Halaqah
          </div>
          <div className="font-display text-[12px] md:text-[13px] leading-none mt-0.5 truncate">
            Mishkaat
          </div>
        </div>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-1">
        <div className="bg-white/15 rounded-md px-1.5 py-1 text-center">
          <div className="font-display text-[13px] md:text-[15px] leading-none">
            #1
          </div>
          <div className="text-[7px] md:text-[8px] tracking-wider font-semibold text-white/80 mt-0.5">
            LEADING
          </div>
        </div>
        <div className="bg-white/15 rounded-md px-1.5 py-1 text-center">
          <div className="font-display text-[13px] md:text-[15px] leading-none">
            31
          </div>
          <div className="text-[7px] md:text-[8px] tracking-wider font-semibold text-white/80 mt-0.5">
            PTS
          </div>
        </div>
      </div>
    </div>
  );
}

function BentoCard({
  title,
  desc,
  visual,
  bg = "bg-cream-200",
}: {
  title: string;
  desc: string;
  visual: React.ReactNode;
  bg?: string;
}) {
  return (
    <div className="bento-card bg-card border border-border rounded-3xl p-3 md:p-4 shadow-card transition-transform hover:-translate-y-1 h-full flex flex-col">
      <div
        className={`${bg} rounded-[20px] md:rounded-[22px] grid place-items-center px-5 md:px-7 py-8 md:py-10 min-h-[240px] md:min-h-[300px]`}
      >
        {visual}
      </div>
      <div className="px-2 md:px-3 pt-5 md:pt-7 pb-2 md:pb-3">
        <h3 className="font-display font-semibold text-[22px] md:text-[26px] leading-[1.15] tracking-tight text-ink text-balance">
          {title}
        </h3>
        <p className="text-md md:text-md text-ink-soft mt-2.5 leading-relaxed max-w-[42ch]">
          {desc}
        </p>
      </div>
    </div>
  );
}

function ReadingPreview() {
  const points = [
    "Niyyah is the condition for every act of worship",
    "Actions are judged by intention, not outward form",
    "Hijrah carries the ruling of what it's intended for",
  ];
  return (
    <div className="relative w-full max-w-[300px]">
      <div className="bg-card border border-border rounded-2xl p-4 shadow-card">
        <div className="flex items-center justify-between mb-2.5">
          <div>
            <div className="text-[9px] font-semibold tracking-wider text-coral-500 uppercase">
              ◆ Bukhari · Ch. 1
            </div>
            <div className="text-[12.5px] font-semibold text-ink mt-0.5">
              Kitāb al-Waḥy
            </div>
          </div>
          <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-sage-100 text-sage-500">
            3 min read
          </span>
        </div>
        <div className="text-[10px] font-semibold tracking-wider text-ink-muted uppercase mt-3 mb-1.5">
          Summary
        </div>
        <p className="text-[11.5px] leading-snug text-ink-soft">
          Imam al-Bukhārī opens his Ṣaḥīḥ with the ḥadīth of niyyah —
          setting intention as the foundation of every act that follows
          in the book.
        </p>
        <div className="text-[10px] font-semibold tracking-wider text-ink-muted uppercase mt-3 mb-1.5">
          Key points
        </div>
        <ul className="space-y-1.5">
          {points.map((p, i) => (
            <li key={i} className="flex gap-1.5 items-start">
              <span className="mt-1 w-1 h-1 rounded-full bg-coral-500 shrink-0" />
              <span className="text-[11.5px] leading-snug text-ink-soft">
                {p}
              </span>
            </li>
          ))}
        </ul>
      </div>
      {/* note sticker */}

    </div>
  );
}

function FlashcardsPreview() {
  return (
    <div className="relative w-[200px] h-[150px]">
      {/* back cards */}
      <div className="absolute inset-0 bg-card border border-border rounded-2xl shadow-soft rotate-[-7deg] -translate-x-3 translate-y-2" />
      <div className="absolute inset-0 bg-card border border-border rounded-2xl shadow-soft rotate-[5deg] translate-x-3 translate-y-1" />
      {/* front card */}
      <div className="relative bg-card border border-border rounded-2xl shadow-card w-full h-full p-3 flex flex-col">
        <div className="text-[9px] font-semibold tracking-wider text-coral-500 uppercase">
          ◆ Hadith · front
        </div>
        <div
          className="flex-1 grid place-items-center text-[15px] font-bold text-ink text-center leading-snug"
          dir="rtl"
          style={{ fontFamily: "serif" }}
        >
          إنما الأعمال بالنيات
        </div>
        <div className="flex gap-1.5 justify-center">
          <span className="text-[9px] px-2 py-0.5 rounded-full bg-coral-100 text-coral-600 font-semibold">
            Again
          </span>
          <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-600 font-semibold">
            Hard
          </span>
          <span className="text-[9px] px-2 py-0.5 rounded-full bg-sage-100 text-sage-500 font-semibold">
            Good
          </span>
          <span className="text-[9px] px-2 py-0.5 rounded-full bg-sky-200 text-ink font-semibold">
            Easy
          </span>
        </div>
      </div>
    </div>
  );
}

function MasteryPreview() {
  const books = [
    { en: "Sahih Bukhari", ar: "البخاري", pct: 82, color: "bg-sage-500" },
    { en: "Quduri", ar: "القدوري", pct: 64, color: "bg-amber-500" },
    { en: "Hidayah", ar: "الهداية", pct: 41, color: "bg-coral-500" },
  ];
  return (
    <div className="w-full max-w-[260px] space-y-2.5">
      <div className="flex items-baseline justify-between mb-1">
        <span className="text-[10px] font-semibold tracking-wider text-coral-500 uppercase">
          ◆ Your mastery
        </span>
        <span className="text-[10px] text-ink-muted">Year 3</span>
      </div>
      {books.map((b) => (
        <div key={b.en} className="bg-card rounded-xl p-2.5 shadow-soft">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5">
              <span
                className="text-[11px] font-semibold text-ink-soft"
                dir="rtl"
                style={{ fontFamily: "serif" }}
              >
                {b.ar}
              </span>
              <span className="text-[11.5px] font-semibold text-ink">
                {b.en}
              </span>
            </div>
            <span className="text-[11px] font-bold text-ink">{b.pct}%</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-cream-200">
            <div
              className={`h-full rounded-full ${b.color}`}
              style={{ width: `${b.pct}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function HalaqahPreview() {
  const rows = [
    { rank: 1, initial: "ي", name: "Yusuf K.", pts: "2,140", top: true },
    { rank: 2, initial: "م", name: "Maryam T.", pts: "1,890" },
    { rank: 3, initial: "ع", name: "You", pts: "1,720", you: true },
    { rank: 4, initial: "ح", name: "Hamza B.", pts: "1,610" },
  ];
  return (
    <div className="w-full max-w-[360px]">
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-[10px] font-semibold tracking-wider text-coral-500 uppercase">
            ◆ This week
          </div>
          <div className="font-display text-[20px] text-ink mt-0.5">
            Halaqah 3B
          </div>
        </div>
        <button className="text-[11px] px-3.5 py-2 rounded-full bg-ink text-cream-100 font-medium inline-flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-coral-400" />
          Challenge
        </button>
      </div>
      <div className="space-y-1.5">
        {rows.map((r) => (
          <div
            key={r.rank}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-xl ${r.top
              ? "bg-coral-500 text-white shadow-coral"
              : r.you
                ? "bg-coral-100 border border-coral-200 text-ink"
                : "bg-card text-ink shadow-soft"
              }`}
          >
            <span
              className={`font-display text-[12px] w-4 text-center ${r.top ? "text-white/80" : "text-ink-muted"
                }`}
            >
              {r.rank}
            </span>
            <div
              className={`w-7 h-7 rounded-full grid place-items-center font-bold text-[12px] ${r.top
                ? "bg-white text-coral-500"
                : r.you
                  ? "bg-coral-500 text-white"
                  : "bg-sky-200 text-ink"
                }`}
              style={{ fontFamily: "serif" }}
              dir="rtl"
            >
              {r.initial}
            </div>
            <span className="text-[12.5px] font-semibold flex-1">
              {r.name}
            </span>
            <span
              className={`text-[11.5px] font-bold ${r.top ? "text-white" : "text-ink-muted"
                }`}
            >
              {r.pts}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AbdullahAskPreview() {
  const Sparkle = ({ className = "" }: { className?: string }) => (
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 2l1.9 6.1L20 10l-6.1 1.9L12 18l-1.9-6.1L4 10l6.1-1.9z" />
      <path d="M19 14l.9 2.1L22 17l-2.1.9L19 20l-.9-2.1L16 17l2.1-.9z" opacity="0.7" />
    </svg>
  );

  return (
    <div className="w-full max-w-[340px] bg-card border border-border rounded-2xl p-3.5 shadow-card">
      {/* Top bar: title + usage pill */}
      <div className="flex items-center justify-between mb-3">
        <div className="inline-flex items-center gap-1.5">
          <span className="w-5 h-5 rounded-md bg-ink text-coral-400 grid place-items-center">
            <Sparkle />
          </span>
          <span className="text-[12.5px] font-semibold text-ink tracking-tight">
            Abdullah
          </span>
        </div>
        <span className="inline-flex items-center gap-1 text-[9.5px] font-semibold px-2 py-0.5 rounded-full bg-cream-200 text-ink-muted">
          <Sparkle className="text-coral-500" />
          1% used
        </span>
      </div>

      {/* Question */}
      <div className="text-[12.5px] font-semibold text-ink leading-snug mb-2">
        Does a nosebleed break wuḍūʾ?
      </div>

      {/* Answer */}
      <div className="text-[11px] text-ink-soft leading-relaxed mb-3">
        Yes — in the Ḥanafī madhhab, flowing blood nullifies wuḍūʾ. The
        condition is <strong className="text-ink font-semibold">sayalān</strong>
        {" "}(that it actually flows).
      </div>

      {/* References */}
      <div>
        <div className="text-[9px] font-semibold tracking-[0.14em] text-ink-muted uppercase mb-1.5">
          References
        </div>
        <div className="flex gap-1.5">
          <div className="min-w-0 flex-1 bg-cream-200 rounded-lg p-2">
            <div className="text-[8.5px] font-semibold tracking-wider text-coral-500 uppercase mb-0.5 truncate">
              Al-Quduri
            </div>
            <div className="text-[10.5px] font-semibold text-ink leading-tight truncate">
              ## Nullifiers of Wuḍūʾ
            </div>
            <div className="text-[9.5px] text-ink-soft mt-0.5 truncate">
              Flowing blood is from...
            </div>
          </div>
          <div className="min-w-0 flex-1 bg-cream-200 rounded-lg p-2">
            <div className="text-[8.5px] font-semibold tracking-wider text-coral-500 uppercase mb-0.5 truncate">
              Al-Quduri
            </div>
            <div className="text-[10.5px] font-semibold text-ink leading-tight truncate">
              ## Conditions of sayalān
            </div>
            <div className="text-[9.5px] text-ink-soft mt-0.5 truncate">
              Sayalān means the blood...
            </div>
          </div>
        </div>
      </div>

      {/* Input row */}
      <div className="mt-3 flex items-center gap-1.5 bg-cream-200 rounded-full pl-3 pr-1 py-1">
        <span className="text-[11px] text-ink-muted flex-1 truncate">
          Ask Abdullah…
        </span>
        <span className="w-6 h-6 rounded-full bg-ink text-coral-400 grid place-items-center">
          <Sparkle />
        </span>
      </div>
    </div>
  );
}

function TestimonialCard({
  initial,
  name,
  role,
  quote,
}: {
  initial: string;
  name: string;
  role: string;
  quote: string;
}) {
  return (
    <div className="bg-card border border-border rounded-[20px] p-6 flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full bg-gradient-to-br from-coral-500 to-coral-400 text-white grid place-items-center font-bold text-[15px]"
          style={{ fontFamily: "serif" }}
        >
          {initial}
        </div>
        <div className="flex-1">
          <div className="text-[14px] font-semibold">{name}</div>
          <div className="text-[12px] text-ink-muted">{role}</div>
        </div>
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <StarIcon key={i} />
          ))}
        </div>
      </div>
      <div className="font-display text-[18px] leading-snug italic text-ink relative pl-0">
        <span className="text-coral-500 text-[22px] mr-0.5 leading-none">“</span>
        {quote}
      </div>
    </div>
  );
}

/* =======================================================
   Classes & institutes — role tab visuals
   ======================================================= */

type RoleTab = {
  id: "students" | "teachers" | "institutes";
  label: string;
  eyebrow: string;
  caption: string;
  stat: string;
  statLabel: string;
  bg: string;
  visual: React.ReactNode;
};

const ROLE_TABS: RoleTab[] = [
  {
    id: "students",
    label: "Students",
    eyebrow: "For students",
    caption:
      "Your ustadh's quizzes, mocks and reading — all waiting in your halaqah. Revise before class and never get caught out on a pop quiz.",
    stat: "Every class",
    statLabel: "you walk in already prepared",
    bg: "bg-coral-100",
    visual: <StudentRoleVisual />,
  },
  {
    id: "teachers",
    label: "Teachers",
    eyebrow: "For teachers",
    caption:
      "Set weekly quizzes, mocks and reading in minutes. Auto-grade every answer, track each student's progress, and spot who needs a nudge before the exam — not after.",
    stat: "Every student",
    statLabel: "tracked, graded and nudged for you",
    bg: "bg-sky-200",
    visual: <TeacherRoleVisual />,
  },
  {
    id: "institutes",
    label: "Institutes",
    eyebrow: "For institutes",
    caption:
      "Your whole madrasah in a single dashboard. Watch live engagement across every halaqah, approve join requests in a tap, and show trustees and parents the real numbers.",
    stat: "One dashboard",
    statLabel: "every class, teacher and student",
    bg: "bg-sage-100",
    visual: <InstituteRoleVisual />,
  },
];

function StudentRoleVisual() {
  return (
    <div className="relative w-full max-w-[460px] h-[300px] md:h-[480px] scale-[0.82] md:scale-100 origin-center">
      {/* Main card: Your halaqahs */}
      <div className="absolute left-4 md:left-6 right-4 md:right-6 top-8 md:top-10 bg-cream-100 border border-border rounded-2xl p-3.5 shadow-card">
        <div className="flex items-center justify-between mb-2.5">
          <div>
            <div className="text-[10px] font-semibold tracking-wider text-ink-muted uppercase">
              Classes
            </div>
            <div className="font-display text-[16px] leading-none text-ink mt-1">
              Your halaqahs
            </div>
          </div>
          <span className="text-[9px] px-2 py-1 rounded-full bg-cream-200 text-ink-soft font-semibold">
            3 active
          </span>
        </div>
        <div className="space-y-1.5">
          {[
            {
              title: "Mishkaat 2023",
              sub: "Ustadh Faisal · Tues 6pm",
              pill: "2 sets due",
              pillTone: "bg-coral-500 text-white",
              accent: "from-coral-500 to-coral-400",
            },
            {
              title: "Ajrumiyyah",
              sub: "Ustadh Yunus · weekly",
              pill: "Caught up",
              pillTone: "bg-sage-100 text-sage-500",
              accent: "from-sky-300 to-sky-200",
            },
            {
              title: "Sahih Muslim",
              sub: "Ustadh Faisal · Thurs",
              pill: "Quiz Fri",
              pillTone: "bg-amber-500/25 text-amber-700",
              accent: "from-amber-500/70 to-amber-500/30",
            },
          ].map((c) => (
            <div
              key={c.title}
              className="bg-cream-200/60 border border-border/70 rounded-xl p-2 flex items-center gap-2.5"
            >
              <div
                className={`w-8 h-8 rounded-lg bg-gradient-to-br ${c.accent} shrink-0`}
              />
              <div className="flex-1 min-w-0">
                <div className="text-[11px] font-semibold text-ink truncate">
                  {c.title}
                </div>
                <div className="text-[9px] text-ink-muted">{c.sub}</div>
              </div>
              <span
                className={`text-[8.5px] px-2 py-0.5 rounded-full font-semibold shrink-0 ${c.pillTone}`}
              >
                {c.pill}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Floating top-right: joined toast */}
      <div className="absolute -top-1 right-2 md:right-0 bg-cream-100 border border-border rounded-2xl px-3 py-2 shadow-card -rotate-[4deg] flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-lg bg-sage-500 text-white grid place-items-center shrink-0">
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <div className="text-[10.5px] font-semibold text-ink">
            Joined institute
          </div>
          <div className="text-[8.5px] text-ink-muted">Darul Uloom LDN</div>
        </div>
      </div>

      {/* Floating bottom-left: code input */}
      <div className="absolute bottom-0 left-0 md:-left-2 bg-ink text-cream-100 rounded-2xl p-3 shadow-card rotate-[3deg] min-w-[200px]">
        <div className="text-[8.5px] font-semibold tracking-wider text-cream-100/60 uppercase">
          Join with a code
        </div>
        <div className="mt-1.5 flex items-center gap-1.5">
          <div className="flex-1 flex gap-1">
            {["D", "A", "R", "S"].map((l, i) => (
              <div
                key={i}
                className="w-6 h-7 rounded-md bg-white/10 grid place-items-center font-display text-[14px] text-white"
              >
                {l}
              </div>
            ))}
            <span className="grid place-items-center text-white/40 text-[12px] px-0.5">
              -
            </span>
            {["2", "V", "A", "5"].map((l, i) => (
              <div
                key={i}
                className="w-6 h-7 rounded-md bg-white/10 grid place-items-center font-display text-[14px] text-white"
              >
                {l}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-[9px] text-cream-100/60">
            Pending approval
          </span>
          <span className="text-[10px] font-semibold text-coral-400">
            Join →
          </span>
        </div>
      </div>
    </div>
  );
}

function TeacherRoleVisual() {
  return (
    <div className="relative w-full max-w-[460px] h-[300px] md:h-[480px] scale-[0.82] md:scale-100 origin-center">
      {/* Main card: Class stats + roster */}
      <div className="absolute left-4 md:left-6 right-4 md:right-2 top-6 md:top-8 bg-cream-100 border border-border rounded-2xl p-3.5 shadow-card">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-[10px] font-semibold tracking-wider text-ink-muted uppercase">
              Class · 3B
            </div>
            <div className="font-display text-[17px] leading-none text-ink mt-1">
              Mishkaat 2023
            </div>
          </div>
          <div className="w-8 h-8 rounded-xl bg-ink text-cream-100 grid place-items-center">
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-1.5 mb-3">
          {[
            { n: "24", l: "STUDENTS" },
            { n: "78%", l: "AVG QUIZ" },
            { n: "18/24", l: "SUBMITTED" },
          ].map((s) => (
            <div
              key={s.l}
              className="bg-cream-200/70 border border-border/70 rounded-xl py-2 text-center"
            >
              <div className="font-display text-[14px] leading-none text-ink">
                {s.n}
              </div>
              <div className="text-[7.5px] font-semibold tracking-wider text-ink-muted mt-1">
                {s.l}
              </div>
            </div>
          ))}
        </div>

        <div className="text-[9.5px] font-semibold tracking-wider text-ink-muted uppercase mb-1.5">
          Needs attention
        </div>
        <div className="space-y-1.5">
          {[
            { name: "Hamza B.", pct: 32, tone: "bg-coral-500" },
            { name: "Maryam T.", pct: 56, tone: "bg-amber-500" },
            { name: "Yusuf K.", pct: 88, tone: "bg-sage-500" },
          ].map((r) => (
            <div
              key={r.name}
              className="bg-cream-200/60 border border-border/70 rounded-xl px-2.5 py-2"
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-ink text-cream-100 grid place-items-center text-[9px] font-bold">
                  {r.name[0]}
                </div>
                <div className="text-[10.5px] font-semibold text-ink flex-1 truncate">
                  {r.name}
                </div>
                <span className="text-[10px] font-bold text-ink">
                  {r.pct}%
                </span>
              </div>
              <div className="mt-1.5 h-1 bg-cream-100 rounded-full overflow-hidden">
                <div
                  className={`h-full ${r.tone} rounded-full`}
                  style={{ width: `${r.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating top-left: to grade banner */}
      <div className="absolute -top-2 left-0 md:-left-4 bg-coral-500 text-white rounded-2xl p-3 shadow-card -rotate-[4deg] min-w-[200px]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-white/20 grid place-items-center shrink-0">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M3 3v18h3v-6h10l2 6h3V3z" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="text-[11px] font-semibold leading-tight">
              6 to grade
            </div>
            <div className="text-[9px] text-white/80 leading-tight">
              Chapter 4 quiz
            </div>
          </div>
          <span className="text-[10px] font-semibold text-white/90">→</span>
        </div>
      </div>

      {/* Floating bottom-right: quiz builder card */}
      <div className="absolute bottom-2 right-0 md:-right-2 bg-cream-100 border border-border rounded-2xl p-3 shadow-card rotate-[3deg] w-[180px]">
        <div className="text-[8.5px] font-semibold tracking-wider text-ink-muted uppercase">
          New assignment
        </div>
        <div className="mt-1.5 text-[11.5px] font-semibold text-ink leading-snug">
          Chapter 5 · 10 Qs
        </div>
        <div className="mt-2 flex gap-1">
          <span className="text-[8.5px] px-2 py-0.5 rounded-full bg-sky-100 text-[#2E6F8E] font-semibold">
            Quiz
          </span>
          <span className="text-[8.5px] px-2 py-0.5 rounded-full bg-amber-500/25 text-amber-700 font-semibold">
            Due Fri
          </span>
        </div>
      </div>
    </div>
  );
}

function InstituteRoleVisual() {
  return (
    <div className="relative w-full max-w-[460px] h-[300px] md:h-[480px] scale-[0.82] md:scale-100 origin-center">
      {/* Top: stat tiles row */}
      <div className="absolute left-4 md:left-6 right-4 md:right-2 top-0 md:top-2 bg-cream-100 border border-border rounded-2xl p-3 shadow-card">
        <div className="flex items-center justify-between mb-2">
          <div>
            <div className="text-[10px] font-semibold tracking-wider text-ink-muted uppercase">
              Institute
            </div>
            <div className="font-display text-[16px] leading-none text-ink mt-1">
              Darul Uloom LDN
            </div>
          </div>
          <span className="text-[9px] font-semibold text-sage-500 bg-sage-100 px-2 py-1 rounded-full">
            +12% WoW
          </span>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {[
            { n: "72", l: "STUDENTS" },
            { n: "4", l: "TEACHERS" },
            { n: "3", l: "CLASSES" },
          ].map((s) => (
            <div
              key={s.l}
              className="bg-gradient-to-br from-coral-500/15 to-coral-500/5 border border-coral-500/25 rounded-xl py-2 text-center"
            >
              <div className="font-display text-[15px] leading-none text-ink">
                {s.n}
              </div>
              <div className="text-[7.5px] font-semibold tracking-wider text-ink-muted mt-1">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Middle: class engagement bars */}
      <div className="absolute left-4 md:left-10 right-4 md:right-6 top-[150px] md:top-[180px] bg-cream-100 border border-border rounded-2xl p-3 shadow-card">
        <div className="text-[9.5px] font-semibold tracking-wider text-ink-muted uppercase mb-2">
          Class engagement
        </div>
        <div className="space-y-1.5">
          {[
            { name: "3B · Mishkaat", pct: 92, tone: "bg-sage-500" },
            { name: "3A · Ajrumiyyah", pct: 74, tone: "bg-coral-500" },
            { name: "2C · Quduri", pct: 48, tone: "bg-amber-500" },
          ].map((r) => (
            <div
              key={r.name}
              className="bg-cream-200/60 border border-border/70 rounded-xl px-2.5 py-1.5"
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="text-[10px] font-semibold text-ink flex-1 truncate">
                  {r.name}
                </div>
                <span className="text-[10px] font-bold text-ink">{r.pct}%</span>
              </div>
              <div className="h-1 bg-cream-100 rounded-full overflow-hidden">
                <div
                  className={`h-full ${r.tone} rounded-full`}
                  style={{ width: `${r.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating: pending requests */}
      <div className="absolute bottom-0 left-0 md:-left-2 bg-ink text-cream-100 rounded-2xl p-3 shadow-card -rotate-[3deg] min-w-[210px]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-500/30 text-amber-500 grid place-items-center shrink-0">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-2h2zm0-4h-2V7h2z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[11px] font-semibold">3 join requests</div>
            <div className="text-[9px] text-cream-100/60">
              Approve or reject
            </div>
          </div>
          <span className="text-[10px] font-semibold text-coral-400">→</span>
        </div>
      </div>
    </div>
  );
}
