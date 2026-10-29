"use client";

import Link from "next/link";
import { ArrowRight, Award, Zap, Users, BookOpen } from "lucide-react";

const teachers = [
  {
    name: "Ibu Sari Dewi, S.Pd",
    role: "Kepala TK & Guru Kelas TK B",
    exp: "12 tahun",
    specialty: "Pedagogi Islami & Kurikulum Merdeka",
    icon: Award,
    colorStart: "var(--clay-3)",
    colorEnd: "var(--clay-6)",
    blob: "blob-1",
  },
  {
    name: "Bapak Ahmad Rizki, M.Pd",
    role: "Koordinator STEAM & Coding",
    exp: "9 tahun",
    specialty: "Computational Thinking & Robotik",
    icon: Zap,
    colorStart: "var(--clay-4)",
    colorEnd: "var(--clay-7)",
    blob: "blob-2",
  },
  {
    name: "Ibu Maya Putri, S.Psi",
    role: "Guru Bimbingan & Konseling",
    exp: "7 tahun",
    specialty: "Psikologi Anak & Kecerdasan Emosional",
    icon: Users,
    colorStart: "var(--clay-5)",
    colorEnd: "var(--clay-1)",
    blob: "blob-3",
  },
  {
    name: "Ustazah Rina Wijaya, S.Pd.I",
    role: "Guru Tahsin, Hafalan & Akhlak",
    exp: "10 tahun",
    specialty: "Tahsin, Hafalan Juz 30, Pendidikan Karakter",
    icon: BookOpen,
    colorStart: "var(--clay-8)",
    colorEnd: "var(--clay-3)",
    blob: "blob-4",
  },
];

export default function TeachersSection() {
  return (
    <section
      data-sc-act="pin"
      data-sc-span="3.5"
      className="relative min-h-screen px-4 md:px-8"
      aria-labelledby="teachers-title"
    >
      <div className="relative z-10">
        <div className="clay-blob blob-8 clay-palemint max-w-7xl w-full relative p-6 md:p-10">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-[var(--clay-8)] blob-3 opacity-25 blur-2xl" aria-hidden="true"></div>
          <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-[var(--clay-2)] blob-4 opacity-20 blur-2xl" aria-hidden="true"></div>

          <div className="p-6 md:p-10">
            <header className="teachers-header sc-stack text-center max-w-3xl mx-auto mb-12" data-sc-in data-sc-cue="0.05 0.4">
              <span className="sc-label text-[var(--clay-3)] font-bold mb-3 inline-block">Tim Pendidik</span>
              <h2 id="teachers-title" className="sc-display sc-display--lg mb-6" data-sc-kinetic="lines">
                Guru yang mengasuh,<br />bukan hanya mengajar
              </h2>
              <p className="sc-body text-lg" data-sc-kinetic="lines">
                Lebih dari 150 pendidik bersertifikat S1 PG-PAUD dengan pengalaman rata-rata 8 tahun.
                Setiap guru menjalani pelatihan berkala: pedagogi Islami, psikologi anak, first aid,
                tahsin & hafalan, dan integrasi teknologi. Mereka tidak hanya mengajar —
                mereka mengasuh, mendengar, dan meneladani akhlak mulia setiap hari.
              </p>
            </header>

            <div className="teacher-showcase grid grid-cols-1 sm:grid-cols-2 gap-6" data-sc-in data-sc-stagger="100" role="list">
              {teachers.map((teacher, i) => (
                <article
                  key={teacher.name}
                  className={`teacher-showcase__card ${teacher.blob}`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                  data-sc-cue={`${0.15 + i * 0.18} ${0.55 + i * 0.18}`}
                >
                  <div
                    className="teacher-showcase__avatar"
                    aria-hidden="true"
                    style={{ background: `linear-gradient(135deg, ${teacher.colorStart}, ${teacher.colorEnd})` }}
                  >
                    <teacher.icon className="h-8 w-8" />
                  </div>
                  <div className="teacher-showcase__content">
                    <h3 className="sc-display sc-display--md">{teacher.name}</h3>
                    <p className="sc-label">{teacher.role}</p>
                    <p className="sc-body teacher-showcase__specialty">{teacher.specialty}</p>
                    <div className="teacher-showcase__meta flex flex-wrap gap-2 mt-3">
                      <span className="teacher-showcase__exp font-mono text-xs tracking-wide text-[var(--sc-ink-soft)] px-3 py-1 bg-[var(--sc-canvas)] rounded-full border border-[var(--sc-hairline)]">
                        {teacher.exp} pengalaman
                      </span>
                      <span className="teacher-showcase__badge badge-3d badge-mint text-xs">Sertifikat PG-PAUD</span>
                    </div>
                  </div>
                  <div className="teacher-showcase__glow" aria-hidden="true" style={{ background: `linear-gradient(135deg, ${teacher.colorStart}, ${teacher.colorEnd})` }} />
                </article>
              ))}
            </div>
          </div>
        </div>

        <footer className="teachers-close sc-stack text-center mt-12" data-sc-cue="0.85">
          <div className="clay-blob blob-1 clay-peach p-4 md:p-6 inline-block max-w-xl mx-auto">
            <Link href="/guru" className="cta cta--primary cta--magnet inline-flex" data-sc-magnet="0.2" data-sc-rise="0">
              Kenali Semua Guru Kami
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
            <p className="foot-note mt-4 text-sm text-[var(--sc-ink-soft)]">
              150+ guru • Rata-rata 8 th pengalaman • Pelatihan berkala • First Aid certified
            </p>
          </div>
        </footer>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-20 pointer-events-none sc-wave-divider" aria-hidden="true">
        <svg viewBox="0 0 1200 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M0,40 C300,80 600,0 900,40 S1200,80 1200,40 L1200,80 0,80 Z" fill="var(--sc-canvas)" />
        </svg>
      </div>
    </section>
  );
}