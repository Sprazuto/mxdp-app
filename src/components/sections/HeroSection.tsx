"use client";

import { Sparkles, Star, Heart, Award, Play } from "lucide-react";

export default function HeroSection() {
  return (
    <section
      data-sc-act="pin"
      data-sc-span="2.8"
      data-sc-dwell="0.35"
      data-sc-drift="#fdfbf7"
      className="reveal z-10 relative"
      aria-labelledby="hero-title"
    >
      {/* Sticky stage - this becomes position:sticky, height:100vh */}
      <div className="sc-stage" data-sc-stage>
        <div className="clay-blob blob-1 clay-peach w-full h-full flex items-center justify-center p-8 md:p-20">
          <div className="absolute -top-6 -right-6 w-20 h-20 bg-[var(--clay-1)] rounded-full opacity-30 blur-xl" aria-hidden="true"></div>
          <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-[var(--clay-3)] blob-2 opacity-25 blur-xl" aria-hidden="true"></div>

          <div className="relative z-10 w-full max-w-4xl text-center clay-inner clay-inner--lg">
            <div className="flex justify-center gap-4 md:gap-8 mb-12" aria-hidden="true">
              <div className="w-16 h-16 bg-[var(--clay-1)] blob-1 flex items-center justify-center shadow-[6px_6px_12px_rgba(255,154,162,0.3)]">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div className="w-16 h-16 bg-[var(--clay-3)] blob-2 flex items-center justify-center shadow-[6px_6px_12px_rgba(181,234,215,0.3)]">
                <Star className="w-8 h-8 text-white" />
              </div>
              <div className="w-16 h-16 bg-[var(--clay-4)] blob-3 flex items-center justify-center shadow-[6px_6px_12px_rgba(199,206,234,0.3)]">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <div className="w-16 h-16 bg-[var(--clay-5)] blob-4 flex items-center justify-center shadow-[6px_6px_12px_rgba(255,211,182,0.3)]">
                <Award className="w-8 h-8 text-white" />
              </div>
            </div>

            <h1
              id="hero-title"
              className="sc-display text-6xl md:text-8xl font-extrabold text-[var(--clay-1)] mb-8 leading-[1.1] tracking-tight"
              data-sc-cue="0 0.78"
              data-sc-kinetic="lines"
            >
              Setiap pagi dimulai dengan<br />
              <span className="text-[var(--clay-4)]">doa & harapan</span>
            </h1>
            <p className="text-xl md:text-2xl mb-14 text-gray-500 max-w-2xl mx-auto leading-relaxed" data-sc-cue="0.2 0.85">
              Tanpa kotak. Tanpa tepi tajam. Hanya bentuk-bentuk lembut yang menunggu disentuh.
            </p>

            <a href="/ppdb" className="clay-pill clay-pill-primary inline-flex" data-sc-cue="0.4 1">
              <Play className="w-6 h-6" aria-hidden="true" />
              Mulai Jelajah
            </a>
          </div>
        </div>
      </div>

      {/* Wavy divider */}
      <div className="absolute bottom-0 left-0 w-full h-20 pointer-events-none sc-wave-divider" aria-hidden="true">
        <svg viewBox="0 0 1200 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path
            d="M0,40 C300,80 600,0 900,40 S1200,80 1200,40 L1200,80 0,80 Z"
            fill="var(--sc-canvas)"
          />
        </svg>
      </div>
    </section>
  );
}