"use client";

import Link from "next/link";
import { ArrowRight, Video, Shield, CheckCircle, ThermometerSun } from "lucide-react";

const safetyItems = [
  { icon: Video, label: "CCTV 24/7", desc: "Pengawasan penuh di seluruh area sekolah" },
  { icon: Shield, label: "Akses Terkontrol", desc: "Sistem keamanan pintu masuk & keluar, kartu orang tua" },
  { icon: CheckCircle, label: "Standar SNI & Halal", desc: "Peralatan bermain SNI, makanan bersertifikat halal MUI" },
  { icon: ThermometerSun, label: "Kesehatan & Nutrisi", desc: "Pemeriksaan rutin, klinik sekolah, menu bergizi seimbang" },
];

export default function SafetySection() {
  return (
    <section
      data-sc-act="pin"
      data-sc-span="2.0"
      className="relative"
      aria-labelledby="safety-title"
    >
      {/* Sticky stage */}
      <div className="sc-stage" data-sc-stage>
        <div className="clay-blob blob-4 clay-blue max-w-7xl w-full h-full relative p-6 md:p-10">
          <div className="absolute -top-8 -right-8 w-32 h-32 bg-[var(--clay-6)] blob-7 opacity-25 blur-2xl" aria-hidden="true"></div>
          <div className="absolute -bottom-8 -left-8 w-28 h-28 bg-[var(--clay-3)] blob-8 opacity-20 blur-2xl" aria-hidden="true"></div>

          <div className="p-6 md:p-10 h-full flex flex-col">
            <div className="safety-grid grid grid-cols-1 sm:grid-cols-2 gap-6 flex-1">
              {safetyItems.map((item, i) => (
                <article
                  key={item.label}
                  className="safety-card"
                  style={{ transitionDelay: `${i * 60}ms` }}
                  data-sc-cue={`${0.1 + i * 0.15} ${0.5 + i * 0.1}`}
                >
                  <div className="safety-card__icon" aria-hidden="true">
                    <item.icon className="h-7 w-7" />
                  </div>
                  <h3 className="sc-display sc-display--md">{item.label}</h3>
                  <p className="sc-body">{item.desc}</p>
                </article>
              ))}
            </div>

            <footer className="close-foot mt-12">
              <div className="clay-blob blob-2 clay-lavender p-6 md:p-8 max-w-2xl mx-auto text-center">
                <h2 id="safety-title" className="sc-display sc-display--lg mb-6" data-sc-cue="0.06" data-sc-kinetic="lines">
                  Siap memberikan fondasi terbaik untuk anak Anda?
                </h2>
                <Link
                  href="/ppdb"
                  className="cta cta--primary cta--magnet inline-flex"
                  data-sc-magnet="0.28"
                  data-sc-cue="0.06"
                  data-sc-rise="0"
                >
                  Daftar PPDB Sekarang
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Link>
                <p className="foot-note mt-4 text-sm text-[var(--sc-ink-soft)]">
                  Proses cepat & aman • Konsultasi gratis • Survei sekolah gratis
                </p>
              </div>
            </footer>
          </div>
        </div>
      </div>

      {/* Wavy divider */}
      <div className="absolute bottom-0 left-0 w-full h-20 pointer-events-none sc-wave-divider" aria-hidden="true">
        <svg viewBox="0 0 1200 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M0,40 C300,80 600,0 900,40 S1200,80 1200,40 L1200,80 0,80 Z" fill="var(--sc-canvas)" />
        </svg>
      </div>
    </section>
  );
}