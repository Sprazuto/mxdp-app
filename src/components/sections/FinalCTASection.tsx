"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Shield, CheckCircle, Award } from "lucide-react";

export default function FinalCTASection() {
  return (
    <section
      data-sc-act="pin"
      data-sc-span="1.5"
      data-sc-drift="#fdfbf7"
      className="reveal z-10 relative min-h-[80vh] flex items-center justify-center px-4 md:px-8"
      aria-labelledby="final-cta-title"
    >
      <div className="clay-blob blob-2 clay-pink max-w-3xl relative z-10 p-12 md:p-20 text-center">
        <div className="absolute -top-8 -right-8 w-32 h-32 bg-[var(--clay-1)] blob-4 opacity-25 blur-2xl" aria-hidden="true"></div>
        <div className="absolute -bottom-8 -left-8 w-28 h-28 bg-[var(--clay-5)] blob-5 opacity-20 blur-2xl" aria-hidden="true"></div>

        <div className="mb-12">
          <div className="w-32 h-32 mx-auto bg-[var(--clay-5)] blob-6 flex items-center justify-center shadow-[12px_12px_24px_rgba(255,154,162,0.5)] animate-bounce" aria-hidden="true">
            <Award className="w-16 h-16 text-white" />
          </div>
        </div>

        <h2 id="final-cta-title" className="sc-display sc-display--xl text-[var(--clay-1)] mb-6 leading-tight">
          Kamu Menemukan<br />Semua Bentuk
        </h2>
        <p className="text-xl md:text-2xl mb-14 text-gray-500">
          Tidak ada kotak yang membatasi. Hanya kurva-kurva lembut yang mengantarkanmu ke sini.
        </p>

        <Link href="/ppdb" className="clay-pill bg-[var(--clay-2)] text-white shadow-[0_12px_24px_rgba(255,216,168,0.5)] inline-flex">
          <ArrowRight className="w-6 h-6" aria-hidden="true" />
          Mulai Petualangan
        </Link>

        <p className="mt-12 text-sm text-gray-400">Dibuat dengan claymorphism organik untuk anak-anak Indonesia.</p>

        {/* Trust indicators */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 text-center">
          <div className="flex items-center justify-center gap-2">
            <Shield className="h-5 w-5 text-[var(--clay-3)]" aria-hidden="true" />
            <span className="font-bold text-[var(--sc-ink)]">150+</span>
            <span className="text-gray-500">Guru Bersertifikat</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <CheckCircle className="h-5 w-5 text-[var(--clay-6)]" aria-hidden="true" />
            <span className="font-bold text-[var(--sc-ink)]">95%</span>
            <span className="text-gray-500">Lolos SD Favorit</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="h-5 w-5 text-[var(--clay-1)]" aria-hidden="true" />
            <span className="font-bold text-[var(--sc-ink)]">2.500+</span>
            <span className="text-gray-500">Orang Tua Percaya</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-20 pointer-events-none sc-wave-divider" aria-hidden="true">
        <svg viewBox="0 0 1200 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M0,40 C300,80 600,0 900,40 S1200,80 1200,40 L1200,80 0,80 Z" fill="var(--sc-canvas)" />
        </svg>
      </div>
    </section>
  );
}