import React from "react";

/* =======================================================
   Phone frame
   ======================================================= */
export function Phone({
  children,
  className = "",
  shadow = true,
  bare = false,
}: {
  children: React.ReactNode;
  className?: string;
  shadow?: boolean;
  bare?: boolean;
}) {
  return (
    <div
      className={`relative w-[300px] aspect-[300/620] bg-[#0F0F10] rounded-[44px] p-3 ring-[1.5px] ring-[#2a2a2c] ${shadow ? "shadow-phone" : ""} ${className}`}
    >
      {/* notch */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[110px] h-[30px] bg-[#0F0F10] rounded-[20px] z-20" />
      <div className="w-full h-full bg-cream-100 rounded-[34px] overflow-hidden relative flex flex-col">
        {!bare && <StatusBar />}
        {children}
      </div>
    </div>
  );
}

/* Frameless screen — the raw UI surface without the phone bezel/notch.
   Used for background/adjacent carousel screens behind a framed Phone. */
export function Screen({
  children,
  className = "",
  bare = false,
}: {
  children: React.ReactNode;
  className?: string;
  bare?: boolean;
}) {
  return (
    <div
      className={`w-[300px] aspect-[300/620] bg-cream-100 rounded-[34px] overflow-hidden relative flex flex-col ${className}`}
    >
      {!bare && <StatusBar />}
      {children}
    </div>
  );
}

function StatusBar() {
  return (
    <div className="px-5 pt-3.5 pb-2 flex justify-between items-center text-[13px] font-semibold text-ink">
      <span>9:41</span>
      <div className="flex gap-1.5 items-center opacity-80">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M2 22h20V2z" />
        </svg>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.07 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
        </svg>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <rect x="2" y="7" width="18" height="10" rx="2" />
          <rect x="21" y="10" width="1" height="4" />
        </svg>
      </div>
    </div>
  );
}

function TabBar({ active }: { active: "home" | "revise" | "social" | "profile" }) {
  const tab = (key: string, label: string, Icon: React.FC) => {
    const isActive = active === key;
    return (
      <div
        className={`flex flex-col items-center gap-1 ${isActive ? "text-coral-500" : "text-ink-subtle"}`}
      >
        <Icon />
        <span className="text-[9px] font-medium tracking-wide">{label}</span>
      </div>
    );
  };

  return (
    <div className="mt-auto pt-3 pb-5 px-4 grid grid-cols-4 border-t border-border/60 bg-cream-50">
      {tab("home", "Home", () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        </svg>
      ))}
      {tab("revise", "Revise", () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      ))}
      {tab("social", "Social", () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ))}
      {tab("profile", "Profile", () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ))}
    </div>
  );
}

/* =======================================================
   Screen 1: HOME DASHBOARD — mirrors your actual app
   ======================================================= */
export function HomeScreen() {
  return (
    <>
      <div className="px-5 pt-4 pb-3">
        <div className="text-[11px] text-ink-muted">
          Good morning · Dhu&apos;l-Qi&apos;dah 4, 1447 AH
        </div>
        <div className="font-display text-[28px] leading-none mt-1 text-ink">
          Mohammed
        </div>
        <div className="text-[11px] text-ink-muted mt-1">
          Dawrah Hadith · hanafi
        </div>
      </div>

      {/* coral hero card */}
      <div className="mx-4 p-4 rounded-3xl bg-gradient-to-br from-coral-500 to-coral-400 text-white relative overflow-hidden">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/20 grid place-items-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67z" />
              </svg>
            </div>
            <div>
              <div className="font-display text-[22px] leading-none">3 days</div>
              <div className="text-[10px] opacity-80 mt-0.5">Current streak</div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-display text-[22px] leading-none">60</div>
            <div className="text-[10px] opacity-80 mt-0.5">XP</div>
          </div>
        </div>

        <div className="mt-5">
          <div className="flex justify-between items-center">
            <div className="text-[10px] opacity-80">Today&apos;s goal</div>
            <div className="text-[10px] opacity-80">0/40 · ~19m</div>
          </div>
          <div className="font-display text-[26px] leading-tight mt-1">
            40 cards to hit today.
          </div>
          <div className="mt-2 h-1 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full w-[8%] bg-white rounded-full" />
          </div>
          <div className="text-[9px] opacity-70 mt-1.5">
            363 more cards banked for later — pace yourself.
          </div>
        </div>

        <button className="mt-3 w-full bg-white text-coral-500 rounded-full py-2.5 text-[12px] font-semibold">
          Start today&apos;s revision
        </button>
      </div>

      {/* stats grid */}
      <div className="grid grid-cols-3 gap-2 px-4 mt-3">
        {[
          { n: "403", l: "DUE", c: "bg-coral-50 text-coral-600" },
          { n: "8", l: "WEAK", c: "bg-cream-200 text-ink-soft" },
          { n: "381", l: "NEW", c: "bg-sky-100 text-[#2E6F8E]" },
        ].map((s) => (
          <div key={s.l} className={`rounded-2xl p-3 ${s.c}`}>
            <div className="font-display text-[26px] leading-none">{s.n}</div>
            <div className="text-[9px] font-semibold tracking-wider mt-1 opacity-80">
              {s.l}
            </div>
          </div>
        ))}
      </div>

      {/* slipping alert */}
      <div className="mx-4 mt-2.5 rounded-2xl bg-coral-50 border border-coral-100 p-3 flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-full bg-coral-500 text-white grid place-items-center text-[11px] font-bold">
          !
        </div>
        <div className="flex-1">
          <div className="text-[11px] font-semibold text-ink">
            8 cards slipping
          </div>
          <div className="text-[9px] text-ink-muted">
            Open Weak topics to shore them up
          </div>
        </div>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-ink-muted">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </div>

      <TabBar active="home" />
    </>
  );
}

/* =======================================================
   Screen 2: REVISE — topic selection with Flashcards/Quiz toggle
   ======================================================= */
export function ReviseScreen() {
  return (
    <>
      <div className="px-5 pt-4 pb-2">
        <div className="font-display text-[26px] leading-none text-ink">Revise</div>
        <div className="text-[11px] text-ink-muted mt-1">
          Pick a topic, book, or jump into a quick session
        </div>
      </div>

      <div className="mx-4 mt-3 p-4 rounded-3xl bg-gradient-to-br from-coral-500 to-coral-400 text-white relative overflow-hidden">
        <div className="text-[10px] font-semibold tracking-wider opacity-90">
          TODAY
        </div>
        <div className="font-display text-[28px] leading-none mt-1.5">
          403 cards due.
        </div>
        <div className="text-[10px] opacity-80 mt-1">
          About 3h 9m · keep the streak going
        </div>

        <button className="mt-3 w-full bg-white text-coral-500 rounded-full py-2.5 text-[12px] font-semibold">
          Start today&apos;s revision
        </button>

        <div className="mt-4 pt-3 border-t border-white/20 grid grid-cols-3">
          {[
            { n: "3", l: "STREAK" },
            { n: "78%", l: "ACCURACY" },
            { n: "0", l: "MASTERED" },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <div className="font-display text-[20px] leading-none">{s.n}</div>
              <div className="text-[8px] font-semibold tracking-wider opacity-80 mt-1">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 mt-4">
        <div className="text-[10px] font-semibold tracking-wider text-ink-muted flex items-center gap-1.5">
          <span className="text-amber-500">★</span> STARRED
        </div>
        <div className="grid grid-cols-2 gap-2 mt-2">
          <div className="bg-card border border-border rounded-2xl p-3">
            <div className="w-7 h-7 rounded-lg bg-sky-100 text-[#2E6F8E] grid place-items-center mb-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
            </div>
            <div className="text-[12px] font-semibold text-ink">Nahw</div>
            <div className="text-[9px] text-ink-muted mt-0.5">SUBJECT</div>
          </div>
          <div className="bg-card border border-border rounded-2xl p-3">
            <div className="w-7 h-7 rounded-lg bg-sky-100 text-[#2E6F8E] grid place-items-center mb-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
            </div>
            <div className="text-[12px] font-semibold text-ink truncate">
              Key to Durus al-Lugh…
            </div>
            <div className="text-[10px] text-ink-muted mt-0.5" dir="rtl">
              مِفْتَاحُ دُرُوس…
            </div>
          </div>
        </div>
      </div>

      <TabBar active="revise" />
    </>
  );
}

/* =======================================================
   Screen 3: SOCIAL — halaqah / leaderboard
   ======================================================= */
export function SocialScreen() {
  return (
    <>
      <div className="px-5 pt-4 pb-2 flex justify-between items-start">
        <div>
          <div className="text-[10px] text-ink-muted uppercase tracking-wider">
            Community
          </div>
          <div className="font-display text-[26px] leading-none text-ink mt-1">
            Social
          </div>
        </div>
        <div className="w-9 h-9 rounded-full bg-card border border-border grid place-items-center">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </div>
      </div>

      {/* profile pill */}
      <div className="mx-4 mt-2 p-3.5 rounded-2xl bg-gradient-to-br from-coral-500 to-coral-400 text-white">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-ink grid place-items-center font-display text-[16px] text-white">
            M
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1.5">
              <div className="text-[13px] font-semibold">Mohammed</div>
              <div className="text-[9px] bg-white/20 px-1.5 py-0.5 rounded-full">
                ✦ LV 1
              </div>
            </div>
            <div className="text-[10px] opacity-80">@daviral</div>
          </div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </div>
        <div className="mt-3 flex justify-between text-[9px] opacity-90">
          <span>60 XP · LEVEL 1</span>
          <span>40 XP to next</span>
        </div>
        <div className="mt-1 h-1 bg-white/20 rounded-full overflow-hidden">
          <div className="h-full w-[60%] bg-white rounded-full" />
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {[
            { n: "3", l: "DAY STREAK" },
            { n: "60", l: "TOTAL XP" },
            { n: "3", l: "BEST" },
          ].map((s) => (
            <div
              key={s.l}
              className="bg-white/12 rounded-xl py-2 text-center backdrop-blur-sm"
              style={{ background: "rgba(255,255,255,0.12)" }}
            >
              <div className="font-display text-[18px] leading-none">{s.n}</div>
              <div className="text-[8px] opacity-80 mt-1 tracking-wider">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 mt-3">
        <div className="text-[10px] font-semibold tracking-wider text-ink-muted flex items-center gap-1.5 mb-2">
          <span className="text-amber-500">🏆</span> TOP OF MISHKAAT · THIS WEEK
        </div>
        <div className="space-y-1.5">
          {[
            { r: 1, n: "Abdullah I.", p: "2,840", top: true },
            { r: 2, n: "Mohammed (you)", p: "2,615", top: true },
            { r: 3, n: "Ibrahim M.", p: "2,410", top: false },
            { r: 4, n: "Hamza S.", p: "2,180", top: false },
          ].map((row) => (
            <div
              key={row.r}
              className="flex items-center gap-2.5 bg-card border border-border px-3 py-2 rounded-xl"
            >
              <div
                className={`w-6 h-6 rounded-full grid place-items-center text-[10px] font-bold ${
                  row.top ? "bg-amber-500 text-white" : "bg-cream-200 text-ink"
                }`}
              >
                {row.r}
              </div>
              <div className="flex-1 text-[11px] font-semibold text-ink">
                {row.n}
              </div>
              <div className="text-[10px] text-ink-muted font-semibold">
                <span className="text-ink">{row.p}</span> XP
              </div>
            </div>
          ))}
        </div>
      </div>

      <TabBar active="social" />
    </>
  );
}

/* =======================================================
   Screen 4: FLASHCARD DRILL — for "how it works" section
   ======================================================= */
export function FlashcardScreen() {
  return (
    <>
      <div className="px-5 pt-3 pb-2 flex justify-between items-center text-[10px] text-ink-muted">
        <span>Card 7 of 47</span>
        <span className="text-coral-500 font-semibold">Quduri · Taharah</span>
      </div>

      <div className="mx-4 flex-1 bg-card border border-border rounded-3xl p-5 flex flex-col justify-center items-center text-center shadow-soft">
        <div className="text-[10px] uppercase tracking-wider text-ink-muted font-medium">
          What are the Farāʾid of Wuḍūʾ?
        </div>
        <div
          className="font-arabic text-[24px] text-ink mt-4 leading-[1.8] font-bold"
          dir="rtl"
          style={{ fontFamily: "serif" }}
        >
          فَرَائِضُ<br />الوُضُوءِ أَرْبَعٌ
        </div>
        <div className="font-display text-[17px] text-ink mt-5 italic leading-snug">
          The obligations of wuḍūʾ are four: washing the face, the arms to the
          elbows, wiping a quarter of the head, and washing the feet to the
          ankles.
        </div>
        <div className="text-[9px] text-ink-muted mt-4 font-medium">
          Quduri — Kitab al-Ṭahārah
        </div>
      </div>

      <div className="px-4 py-4 grid grid-cols-4 gap-1.5">
        {[
          { l: "Again", c: "bg-[#9B5A5A]" },
          { l: "Hard", c: "bg-[#B8894A]" },
          { l: "Good", c: "bg-sage-500" },
          { l: "Easy", c: "bg-ink" },
        ].map((b) => (
          <div
            key={b.l}
            className={`${b.c} py-2.5 rounded-xl text-[10px] font-semibold text-white text-center`}
          >
            {b.l}
          </div>
        ))}
      </div>
    </>
  );
}
