"use client";

import Script from "next/script";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import ProgramsSection from "@/components/sections/ProgramsSection";
import FacilitiesSection from "@/components/sections/FacilitiesSection";
import TeachersSection from "@/components/sections/TeachersSection";
import SafetySection from "@/components/sections/SafetySection";
import FinalCTASection from "@/components/sections/FinalCTASection";

/* ==========================================================================
   MXDP TK — SCROLL-CRAFT HOME PAGE
   Hybrid: Claymorphism for hero/key moments, Minimal for content.
   Based on sketch 002 (Clay Organic Adventure) + scroll-craft engine.
   ========================================================================== */

export default function Home() {
  return (
    <>
      {/* --- Global Decorative Layers --- */}
      <div className="sc-atmosphere" aria-hidden="true"></div>
      <div className="sc-floaties" aria-hidden="true">
        <svg width="60" height="60" viewBox="0 0 60 60" style={{ top: "15%", left: "5%" }} fill="currentColor"><path d="M30 5 L35 20 L50 20 L38 30 L42 45 L30 38 L18 45 L22 30 L10 20 L25 20 Z"/></svg>
        <svg width="40" height="40" viewBox="0 0 40 40" style={{ top: "60%", right: "8%" }} fill="currentColor"><circle cx="20" cy="20" r="20"/></svg>
        <svg width="50" height="50" viewBox="0 0 50 50" style={{ bottom: "20%", left: "10%" }} fill="currentColor"><path d="M25 5 L28 18 L43 18 L32 28 L36 42 L25 35 L14 42 L18 28 L7 18 L22 18 Z"/></svg>
        <svg width="35" height="35" viewBox="0 0 35 35" style={{ top: "30%", right: "15%" }} fill="currentColor"><rect x="5" y="5" width="25" height="25" rx="5"/></svg>
        <svg width="45" height="45" viewBox="0 0 45 45" style={{ bottom: "30%", right: "20%" }} fill="currentColor"><path d="M22.5 5 L28 22 L43 22 L31 33 L35 42 L22.5 37 L10 42 L14 33 L2 22 L17 22 Z"/></svg>
        <svg width="30" height="30" viewBox="0 0 30 30" style={{ top: "70%", left: "25%" }} fill="currentColor"><circle cx="15" cy="15" r="15"/></svg>
        <svg width="55" height="55" viewBox="0 0 55 55" style={{ bottom: "10%", left: "30%" }} fill="currentColor"><path d="M27.5 5 L34 25 L50 25 L38 38 L42 50 L27.5 42 L13 50 L17 38 L5 25 L21 25 Z"/></svg>
        <svg width="40" height="40" viewBox="0 0 40 40" style={{ top: "45%", left: "40%" }} fill="currentColor"><rect x="5" y="5" width="30" height="30" rx="8"/></svg>
      </div>
      <div className="sc-confetti" aria-hidden="true" id="confetti-root"></div>
      <div className="sc-page-ornaments" aria-hidden="true" id="page-ornaments">
        <svg width="120" height="120" viewBox="0 0 120 120" style={{ top: "8%", left: "3%" }} fill="currentColor"><path d="M60 10 L70 40 L100 40 L78 60 L86 90 L60 75 L34 90 L42 60 L20 40 L50 40 Z"/></svg>
        <svg width="90" height="90" viewBox="0 0 90 90" style={{ bottom: "15%", right: "5%" }} fill="currentColor"><circle cx="45" cy="45" r="45"/></svg>
        <svg width="100" height="100" viewBox="0 0 100 100" style={{ top: "55%", left: "8%" }} fill="currentColor"><path d="M50 10 L58 35 L90 35 L68 55 L74 85 L50 70 L26 85 L34 55 L12 35 L44 35 Z"/></svg>
        <svg width="80" height="80" viewBox="0 0 80 80" style={{ bottom: "25%", left: "15%" }} fill="currentColor"><rect x="10" y="10" width="60" height="60" rx="12"/></svg>
        <svg width="110" height="110" viewBox="0 0 110 110" style={{ top: "20%", right: "10%" }} fill="currentColor"><path d="M55 10 L68 40 L100 40 L78 70 L84 100 L55 82 L26 100 L32 70 L10 70 L42 40 Z"/></svg>
        <svg width="70" height="70" viewBox="0 0 70 70" style={{ top: "80%", left: "20%" }} fill="currentColor"><circle cx="35" cy="35" r="35"/></svg>
      </div>

      {/* --- Minimal Chrome: wordmark + ONE CTA --- */}
      <header className="site-bar" role="banner">
        <div className="sc-wrap">
          <Link href="/" className="wordmark" aria-label="MXDP Home">
            <span className="wordmark__logotype">MXDP</span>
            <span className="wordmark__tagline">Taman Kanak-Kanak Terpercaya</span>
          </Link>
          <Link href="/ppdb" className="cta cta--primary">Daftar PPDB</Link>
        </div>
      </header>

      {/* --- Page Progress Bar --- */}
      <span data-sc-progress aria-hidden="true"></span>

      {/* --- Subtle Grain Texture --- */}
      <div className="sc-grain" aria-hidden="true"></div>

      <main id="top">
        {/* ACT 1: Hero - Full Claymorphism */}
        <HeroSection />

        {/* ACT 2 & 4: Features - Sticky Organic Cards + Organic Grid */}
        <FeaturesSection />

        {/* ACT 3: Turn - Flow section with hero image */}
        <section
          className="sc-section"
          data-sc-act="flow"
          data-sc-drift="#fef3e8"
          aria-labelledby="act3-title"
        >
          <div className="sc-wrap split">
            <div className="sc-stack" data-sc-in data-sc-stagger="70">
              <div className="clay-blob blob-4 clay-mint relative z-10" style={{ maxWidth: '720px' }}>
                <div className="absolute -top-6 -right-6 w-20 h-20 bg-[var(--clay-3)] blob-5 opacity-25 blur-xl" aria-hidden="true"></div>
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-[var(--clay-5)] blob-6 opacity-20 blur-xl" aria-hidden="true"></div>
                <div className="p-8 md:p-12 lg:p-16 max-w-2xl mx-auto">
                  <h2 id="act3-title" className="sc-display sc-display--lg" data-sc-kinetic="lines">
                    Apa yang berubah saat MXDP hadir.
                  </h2>
                  <p className="sc-body">
                    Kami bukan sekadar TK. Kami mitra perjalanan pendidikan anak Anda —
                    dari Toddler hingga siap SD, dengan kurikulum holistik berlandaskan
                    nilai-nilai Islam, guru bersertifikat S1 PG-PAUD, dan lingkungan
                    yang aman, nyaman, & mendorong potensi setiap anak.
                  </p>
                  <p className="sc-body">
                    Lebih dari 2.500 orang tua telah mempercayakan masa depan anak mereka
                    di sini. Hasilnya? Anak yang cerdas, berakhlak, percaya diri, & siap SD.
                  </p>
                </div>
              </div>
            </div>
            <figure
              data-sc-reveal="up"
              data-sc-reveal-at="0.15 0.55"
              className="turn-figure"
            >
              <img
                src="/assets/turn-moment.webp"
                width="1920"
                height="1080"
                alt="Anak-anak MXDP tersenyum saat belajar di kelas yang cerah"
              />
            </figure>
          </div>
        </section>

        {/* ACT 4: Substance - Pin with poster */}
        <section
          data-sc-act="pin"
          data-sc-span="2.2"
          data-sc-dwell="0.28"
          data-sc-drift="#fdf0e0"
          aria-labelledby="act4-title"
        >
          <div data-sc-stage>
            <img
              className="sc-stage__poster"
              src="/assets/act4-poster.webp"
              alt=""
              width="1920"
              height="1080"
            />
            <div className="sc-scrim sc-scrim--trail" aria-hidden="true"></div>

            <div className="sc-copy sc-copy--trail" data-sc-cue="0.14 0.86">
              <div className="clay-blob blob-5 clay-sand relative z-10" style={{ maxWidth: '640px' }}>
                <div className="absolute -top-6 -right-6 w-20 h-20 bg-[var(--clay-5)] blob-1 opacity-25 blur-xl" aria-hidden="true"></div>
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-[var(--clay-2)] blob-2 opacity-20 blur-xl" aria-hidden="true"></div>
                <div className="p-8 md:p-12 lg:p-16 max-w-2xl mx-auto">
                  <h2
                    id="act4-title"
                    className="sc-display sc-display--lg"
                    data-sc-kinetic="lines"
                  >
                    Bukti nyata: anak yang tumbuh cerdas & berakhlak.
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ACT 5: Programs - Pan rail */}
        <ProgramsSection />

        {/* ACT 6: Facilities - Pan rail */}
        <FacilitiesSection />

        {/* ACT 7: Teachers - Pin + stagger */}
        <TeachersSection />

        {/* ACT 8: Safety - Pin */}
        <SafetySection />

        {/* ACT 9: Final CTA - Reveal */}
        <FinalCTASection />
      </main>

      {/* ========================================================================
         SIGNATURE MOVE: Growth Compass — Colorful Gradient Ring
         Fixed radial progress ring at bottom-right. Fills as scroll progresses
         through educational stages. Pointer hover expands current stage.
         ======================================================================== */}
      <div className="growth-compass" data-sc-spotlight aria-label="Perjalanan pendidikan anak">
        <svg className="compass-ring" viewBox="0 0 140 140" aria-hidden="true">
          <defs>
            <linearGradient id="compass-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--c-orange)" />
              <stop offset="33%" stopColor="var(--c-pink)" />
              <stop offset="66%" stopColor="var(--c-teal)" />
              <stop offset="100%" stopColor="var(--c-lime)" />
            </linearGradient>
          </defs>
          <circle
            className="compass-ring__track"
            cx="70"
            cy="70"
            r="63"
            fill="none"
            stroke="var(--sc-hairline)"
            strokeWidth="5"
          />
          <circle
            className="compass-ring__progress"
            cx="70"
            cy="70"
            r="63"
            fill="none"
            stroke="url(#compass-gradient)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray="395.8"
            strokeDashoffset="395.8"
            style={{ transform: 'rotate(-90deg)', transformOrigin: '70px 70px', transition: 'stroke-dashoffset 0.4s var(--sc-ease-out)' }}
          />
        </svg>
        <div className="compass-stages" aria-live="polite">
          <span className="compass-stage" data-stage="0">Toddler</span>
          <span className="compass-stage" data-stage="1">Playgroup</span>
          <span className="compass-stage" data-stage="2">TK A</span>
          <span className="compass-stage" data-stage="3">TK B</span>
          <span className="compass-stage" data-stage="4">Siap SD</span>
        </div>
        <div className="compass-tooltip" role="tooltip" aria-hidden="true">
          <strong className="tooltip-stage"></strong>
          <span className="tooltip-desc"></span>
        </div>
      </div>

      {/* ========================================================================
         SECTION SPARKLE BURSTS — Injected at act transitions
         ======================================================================== */}
      <div className="sc-sparkle-burst" data-act="1" aria-hidden="true"></div>
      <div className="sc-sparkle-burst" data-act="2" aria-hidden="true"></div>
      <div className="sc-sparkle-burst" data-act="3" aria-hidden="true"></div>
      <div className="sc-sparkle-burst" data-act="4" aria-hidden="true"></div>
      <div className="sc-sparkle-burst" data-act="5" aria-hidden="true"></div>
      <div className="sc-sparkle-burst" data-act="6" aria-hidden="true"></div>
      <div className="sc-sparkle-burst" data-act="7" aria-hidden="true"></div>
      <div className="sc-sparkle-burst" data-act="8" aria-hidden="true"></div>
      <div className="sc-sparkle-burst" data-act="9" aria-hidden="true"></div>

      {/* ========================================================================
         Client-side initialization: Growth Compass + Ornaments
         ScrollCraft is mounted in root layout
         ======================================================================== */}
      <Script
        id="growth-compass-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              // GROWTH COMPASS LOGIC
              // ================================================================
              const compass = document.querySelector('.growth-compass');
              if (!compass) return;

              const progressRing = compass.querySelector('.compass-ring__progress');
              const stages = compass.querySelectorAll('.compass-stage');
              const tooltip = compass.querySelector('.compass-tooltip');
              const tooltipStage = compass.querySelector('.tooltip-stage');
              const tooltipDesc = compass.querySelector('.tooltip-desc');

              const stageData = [
                { name: 'Toddler Class', desc: '1.5\\u20133 th \\u2022 Motorik, bahasa, doa, sosialisasi', stat: '180+ siswa' },
                { name: 'Playgroup', desc: '3\\u20134 th \\u2022 Phonics, pre-math, hafalan, outdoor', stat: '420+ siswa' },
                { name: 'TK A', desc: '4\\u20135 th \\u2022 Literasi, numerasi, akhlak, STEAM', stat: '650+ siswa' },
                { name: 'TK B', desc: '5\\u20136 th \\u2022 Advanced literacy, juz 30, leadership', stat: '480+ siswa' },
                { name: 'Siap SD', desc: 'Lulusan MXDP: cerdas, berakhlak, percaya diri', stat: '95% lolos SD favorit' },
              ];

              const totalCircumference = 395.8; // 2 * PI * 63
              const stageThresholds = [0, 0.18, 0.36, 0.54, 0.72, 1.0];

              function updateCompass(scrollProgress) {
                const offset = totalCircumference * (1 - scrollProgress);
                if (progressRing) {
                  progressRing.style.strokeDashoffset = offset.toFixed(1);
                }

                let currentStage = 0;
                for (let i = 0; i < stageThresholds.length - 1; i++) {
                  if (scrollProgress >= stageThresholds[i] && scrollProgress < stageThresholds[i + 1]) {
                    currentStage = i;
                    break;
                  }
                }
                if (scrollProgress >= 0.95) currentStage = 4;

                stages.forEach((stage, i) => {
                  stage.classList.toggle('active', i === currentStage);
                });
              }

              let lastProgress = 0;
              function readProgress() {
                const sc = window.ScrollCraft?.instances?.[0];
                if (sc && sc.acts && sc.acts.length) {
                  const firstAct = sc.acts[0];
                  const lastAct = sc.acts[sc.acts.length - 1];
                  const pageTop = firstAct.top;
                  const pageBottom = lastAct.top + lastAct.height;
                  const scrollY = window.scrollY || window.pageYOffset;
                  const vh = window.innerHeight;
                  const progress = Math.max(0, Math.min(1, (scrollY - pageTop + vh) / (pageBottom - pageTop)));
                  if (Math.abs(progress - lastProgress) > 0.005) {
                    lastProgress = progress;
                    updateCompass(progress);
                  }
                }
                requestAnimationFrame(readProgress);
              }

              if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
                compass.addEventListener('pointermove', (e) => {
                  const rect = compass.getBoundingClientRect();
                  const cx = rect.left + rect.width / 2;
                  const cy = rect.top + rect.height / 2;
                  const angle = Math.atan2(e.clientY - cy, e.clientX - cx);
                  const deg = (angle * 180 / Math.PI + 450) % 360;
                  const stageIndex = Math.floor(deg / 72) % 5;
                  const data = stageData[stageIndex];
                  if (data) {
                    tooltipStage.textContent = data.name;
                    tooltipDesc.textContent = data.desc + ' \\u2022 ' + data.stat;
                    tooltip.style.opacity = '1';
                    tooltip.style.transform = 'translate(-50%, -100%) translate(' + (Math.cos(angle) * 90).toFixed(1) + 'px, ' + (Math.sin(angle) * 90).toFixed(1) + 'px)';
                  }
                });
                compass.addEventListener('pointerleave', () => {
                  tooltip.style.opacity = '0';
                });
              }

              if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                requestAnimationFrame(readProgress);
              } else {
                updateCompass(1);
              }

              // ================================================================
              // DECORATIVE ELEMENTS INITIALIZATION
              // ================================================================
              if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

              // ---- Confetti burst on load ----
              const confettiRoot = document.getElementById('confetti-root');
              if (confettiRoot) {
                const colors = ['#f97316', '#ec4899', '#0d9488', '#84cc16', '#f59e0b', '#a855f7', '#0ea5e9'];
                for (let i = 0; i < 30; i++) {
                  const span = document.createElement('span');
                  span.style.cssText = \`
                    position: absolute;
                    width: 10px;
                    height: 10px;
                    border-radius: 2px;
                    left: \${Math.random() * 100}vw;
                    top: -50px;
                    background: \${colors[Math.floor(Math.random() * colors.length)]};
                    animation: confetti-fall \${2 + Math.random() * 2}s ease-out forwards;
                    animation-delay: \${Math.random() * 0.5}s;
                    transform: rotate(\${Math.random() * 360}deg);
                  \`;
                  confettiRoot.appendChild(span);
                }
              }

              // ---- Section sparkle bursts at act transitions ----
              const sparkleBursts = document.querySelectorAll('.sc-sparkle-burst');
              const sc = window.ScrollCraft?.instances?.[0];
              if (sc && sc.acts && sparkleBursts.length) {
                let lastAct = -1;
                function checkSparkles() {
                  const acts = sc.acts;
                  for (let i = 0; i < acts.length; i++) {
                    const act = acts[i];
                    if (act.live && act.raw > 0.1 && act.raw < 0.3 && i !== lastAct) {
                      lastAct = i;
                      const burst = sparkleBursts[i];
                      if (burst) {
                        const colors = ['#f97316', '#ec4899', '#0d9488', '#84cc16', '#f59e0b', '#a855f7', '#0ea5e9'];
                        for (let j = 0; j < 12; j++) {
                          const span = document.createElement('span');
                          const color = colors[Math.floor(Math.random() * colors.length)];
                          const angle = (Math.PI * 2 * j) / 12;
                          const dist = 60 + Math.random() * 40;
                          span.style.cssText = \`
                            position: absolute;
                            width: 8px;
                            height: 8px;
                            border-radius: 50%;
                            left: 50%;
                            top: 50%;
                            background: \${color};
                            animation: sparkle-pop 1.2s ease-out forwards;
                            animation-delay: \${j * 0.03}s;
                            transform-origin: center;
                            --tx: \${Math.cos(angle) * dist}px;
                            --ty: \${Math.sin(angle) * dist}px;
                          \`;
                          burst.appendChild(span);
                          setTimeout(() => span.remove(), 1500);
                        }
                      }
                    }
                  }
                  requestAnimationFrame(checkSparkles);
                }
                requestAnimationFrame(checkSparkles);
              }

              // ================================================================
              // SPARKLE POP KEYFRAMES (injected once)
              // ================================================================
              if (!document.getElementById('sparkle-keyframes')) {
                const style = document.createElement('style');
                style.id = 'sparkle-keyframes';
                style.textContent = \`
                  @keyframes sparkle-pop {
                    0% { opacity: 0; transform: translate(-50%, -50%) scale(0) rotate(0deg); }
                    50% { opacity: 1; transform: translate(var(--tx, 0), var(--ty, 0)) scale(1.5) rotate(180deg); }
                    100% { opacity: 0; transform: translate(var(--tx, 0), var(--ty, 0)) scale(0) rotate(360deg); }
                  }
                  @keyframes confetti-fall {
                    0% { opacity: 0; transform: translateY(-100vh) rotate(0deg) scale(0); }
                    10% { opacity: 1; transform: translateY(-90vh) rotate(180deg) scale(1); }
                    100% { opacity: 0; transform: translateY(100vh) rotate(720deg) scale(0.5); }
                  }
                \`;
                document.head.appendChild(style);
              }
            })();
          `,
        }}
      />
    </>
  );
}