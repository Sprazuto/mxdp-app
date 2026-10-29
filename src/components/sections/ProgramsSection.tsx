"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const programs = [
  {
    age: "1.5 – 3 Tahun",
    title: "Toddler Class",
    desc: "Pengenalan lingkungan melalui bermain terstruktur. Motorik, bahasa, sosialisasi awal, doa harian.",
    features: ["Pengenalan Bahasa & Doa", "Motorik Halus & Kasar", "Sosialisasi & Sharing", "Music & Movement"],
    image: "/assets/program-toddler.webp",
    color: "clay-peach",
    blob: "blob-1",
  },
  {
    age: "3 – 4 Tahun",
    title: "Playgroup",
    desc: "Kreativitas & kemandirian melalui bermain terarah. Phonics, pre-math, seni, outdoor, hafalan surat pendek.",
    features: ["Phonics Awareness", "Pre-Math Concepts", "Art, Craft & Hafalan", "Outdoor Exploration"],
    image: "/assets/program-playgroup.webp",
    color: "clay-mint",
    blob: "blob-2",
  },
  {
    age: "4 – 5 Tahun",
    title: "TK A",
    desc: "Persiapan SD: literasi, numerasi, karakter Islami. Reading readiness, number sense, STEAM, akhlak mulia.",
    features: ["Reading Readiness & Huruf Hijaiyah", "Number Sense & Logika", "Character Building & Akhlak", "STEAM & Keterampilan Hidup"],
    image: "/assets/program-tka.webp",
    color: "clay-lavender",
    blob: "blob-3",
  },
  {
    age: "5 – 6 Tahun",
    title: "TK B",
    desc: "Persiapan SD komprehensif. Advanced literacy, math mastery, leadership, hafalan juz 30, transisi SD lancar.",
    features: ["Advanced Literacy & Juz 30", "Math Mastery & Pemecahan Masalah", "Leadership & Tanggung Jawab", "Primary Transition & Wawancara SD"],
    image: "/assets/program-tkb.webp",
    color: "clay-sand",
    blob: "blob-4",
  },
];

export default function ProgramsSection() {
  return (
    <section
      data-sc-act="pan"
      data-sc-span="4.2"
      className="relative min-h-screen px-4 md:px-8"
      aria-labelledby="programs-title"
    >
      <div className="relative z-10">
        <div className="clay-blob blob-6 clay-blue max-w-7xl relative p-4 md:p-8">
          <div className="absolute -top-8 -right-8 w-24 h-24 bg-[var(--clay-6)] blob-7 opacity-25 blur-2xl" aria-hidden="true"></div>
          <div className="absolute -bottom-8 -left-8 w-28 h-28 bg-[var(--clay-3)] blob-8 opacity-20 blur-2xl" aria-hidden="true"></div>

          <div className="p-4 md:p-8">
            <div className="rail" data-sc-pan="0.06">
              {/* Lead card */}
              <article className="rail__lead sc-stack">
                <div className="clay-blob blob-1 clay-peach p-6 md:p-8 max-w-xl mx-auto text-center">
                  <h2 id="programs-title" className="sc-display sc-display--md mb-4">
                    Program untuk setiap tahap
                  </h2>
                  <p className="sc-body mb-6">Pilih usia, lihat detail, daftar langsung.</p>
                </div>
              </article>

              {/* Program cards */}
              {programs.map((program, i) => (
                <article
                  key={program.title}
                  className={`program-card ${program.color} ${program.blob}`}
                  data-sc-tilt="6"
                >
                  <div className="program-card__media">
                    <img src={program.image} alt={`${program.title} activities`} width="400" height="300" />
                  </div>
                  <div className="program-card__content p-6">
                    <span className="sc-label">{program.age}</span>
                    <h3 className="sc-display sc-display--md mb-3">{program.title}</h3>
                    <p className="sc-body mb-4">{program.desc}</p>
                    <ul className="program-card__features" role="list">
                      {program.features.map((feature, j) => (
                        <li key={feature} style={{ transitionDelay: `${j * 80}ms` }}>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}

              {/* Closing card */}
              <article className="rail__close sc-stack">
                <div className="clay-blob blob-2 clay-lavender p-6 md:p-8 max-w-xl mx-auto text-center">
                  <h3 className="sc-display sc-display--md mb-4">Setiap program, satu janji.</h3>
                  <p className="sc-body mb-6">Kurikulum terintegrasi Islami. Guru yang peduli. Hasil yang terukur.</p>
                  <Link href="/program" className="cta cta--secondary inline-flex">
                    Lihat Semua Program
                    <ArrowRight className="h-5 w-5" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            </div>
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