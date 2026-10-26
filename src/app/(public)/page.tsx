"use client";

import Link from "next/link";
import Script from "next/script";
import { ArrowRight, Users, Award, CheckCircle, Shield, Sparkles, BookOpen, Wifi, Zap, ThermometerSun, Video, ChevronRight } from "lucide-react";

/* ==========================================================================
   MXDP TK — SCROLL-CRAFT HOME PAGE
   Grammar: Filmic one-shot (single linear argument, one emotional arc)
   Journey: Recognition → Tension → Turn → Substance → Range → Commitment
   Feeling Curve: Calm → Building → Relief → Confidence → Excitement → Resolution
   Peak: Turn act (MXDP revealed as the partner)
   Signature Move: "Growth Compass" - colorful radial progress ring with gradient,
     particle tooltip, and scroll-synced fill. Global ornaments: floating shapes,
     ambient gradients, confetti burst, section sparkles.
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
        {/* ================================================================
           ACT 1 — RECOGNITION (pin)
           Warm morning moment. Photo holds, copy greets with kinetic lines.
           ================================================================ */}
        <section
          data-sc-act="pin"
          data-sc-span="2.8"
          data-sc-dwell="0.35"
          data-sc-drift="#fefcf8"
          aria-labelledby="act1-title"
        >
          <div data-sc-stage>
            <img
              className="sc-stage__poster"
              src="/assets/hero-poster.webp"
              alt=""
              width="1920"
              height="1080"
            />
            <div className="sc-scrim sc-scrim--lead" aria-hidden="true"></div>

            <div className="sc-copy sc-copy--lead" data-sc-cue="0 0.78 0">
              <h1
                id="act1-title"
                className="sc-display sc-display--xl"
                data-sc-kinetic="lines"
              >
                Setiap pagi dimulai dengan doa & harapan.
              </h1>
              <p className="sc-body">
                Anak yang ceria, berakhlak mulia, siap belajar. Pilihan sekolah yang tepat.
              </p>
            </div>
          </div>
        </section>

        {/* ================================================================
           ACT 2 — TENSION (pin)
           The weight of the wrong choice. Visual cards with stagger reveal.
           Overlapping cues ~15% so there's never a gap.
           ================================================================ */}
        <section
          data-sc-act="pin"
          data-sc-span="3.2"
          data-sc-drift="#fff8f0"
          aria-labelledby="act2-title"
        >
          <div data-sc-stage className="argument">
            <div className="tension-stack" data-sc-in data-sc-stagger="100">
              <header className="tension-header">
                <span className="sc-label">Masalah Nyata</span>
                <h2 id="act2-title" className="sc-display sc-display--lg" data-sc-kinetic="lines">
                  Pilihan TK yang salah: fondasi 6 tahun goyah.
                </h2>
              </header>

              <div className="tension-cards" role="list">
                {[
                  { icon: BookOpen, label: "Kurikulum Tidak Seimbang", desc: "Fokus akademik terlalu dini, mengabaikan bermain & eksplorasi — fondasi karakter goyah." },
                  { icon: Users, label: "Guru Kurang Sabar & Terlatih", desc: "Tanpa sertifikasi PG-PAUD, rasio guru:anak tidak ideal, turnover tinggi." },
                  { icon: Shield, label: "Fasilitas Tidak Aman & Standar", desc: "Peralatan tidak SNI, area bermain minim, CCTV tidak penuh, akses tidak terkontrol." },
                  { icon: Zap, label: "Rasa Ingin Tahu Sirna", desc: "Anak kehilangan cinta belajar & kepercayaan diri sebelum waktunya." },
                ].map((item, i) => (
                  <article key={item.label} className="tension-card" style={{ transitionDelay: `${i * 100}ms` }} data-sc-cue={`${0.15 + i * 0.2} ${0.45 + i * 0.2}`}>
                    <div className="tension-card__icon" aria-hidden="true">
                      <item.icon className="h-7 w-7" />
                    </div>
                    <div className="tension-card__content">
                      <h3 className="sc-display sc-display--md">{item.label}</h3>
                      <p className="sc-body">{item.desc}</p>
                    </div>
                    <span className="tension-card__pulse" aria-hidden="true" />
                  </article>
                ))}
              </div>

              <footer className="tension-close" data-sc-cue="0.88">
                <p className="sc-lede sc-lede--impact" data-sc-kinetic="chars">
                  Bukan soal biaya. Soal masa depan yang tak terulang.
                </p>
              </footer>
            </div>
          </div>
        </section>

        {/* ================================================================
           ACT 3 — TURN (reveal + flow)
           The wipe is a change of state. MXDP enters. Then a flow section
           with stagger reveal for the core promise.
           ================================================================ */}
        <section
          className="sc-section"
          data-sc-act="flow"
          data-sc-drift="#fef3e8"
          aria-labelledby="act3-title"
        >
          <div className="sc-wrap split">
            <div className="sc-stack" data-sc-in data-sc-stagger="70">
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

        {/* ================================================================
           ACT 4 — SUBSTANCE (pin)
           Macro texture: close-ups of real learning moments. Trail-anchored copy.
           ================================================================ */}
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
              <h2
                id="act4-title"
                className="sc-display sc-display--lg"
                data-sc-kinetic="lines"
              >
                Bukti nyata: anak yang tumbuh cerdas & berakhlak.
              </h2>
            </div>
          </div>
        </section>

        {/* ================================================================
           ACT 5 — RANGE (pan)
           Lateral rail: the program lineup. One viewport-height per item + 1.
           Items stagger in from --sc-p. Trail becomes band on mobile.
           ================================================================ */}
        <section
          data-sc-act="pan"
          data-sc-span="4.2"
          data-sc-drift="#fefcf8"
          aria-labelledby="act5-title"
        >
          <div data-sc-stage>
            <div className="rail" data-sc-pan="0.06">
              {/* Lead card - acts as heading + overflow anchor */}
              <article className="rail__lead sc-stack">
                <h2 id="act5-title" className="sc-display sc-display--md">
                  Program untuk setiap tahap
                </h2>
                <p className="sc-body">
                  Pilih usia, lihat detail, daftar langsung.
                </p>
              </article>

              {/* Program 1: Toddler */}
              <article className="program-card" data-sc-tilt="6">
                <div className="program-card__media">
                  <img src="/assets/program-toddler.webp" alt="Toddler Class activities" width="400" height="300" />
                </div>
                <div className="program-card__content">
                  <span className="sc-label">1.5 – 3 Tahun</span>
                  <h3 className="sc-display sc-display--md">Toddler Class</h3>
                  <p className="sc-body">Pengenalan lingkungan melalui bermain terstruktur. Motorik, bahasa, sosialisasi awal, doa harian.</p>
                  <ul className="program-card__features" role="list">
                    <li>Pengenalan Bahasa & Doa</li>
                    <li>Motorik Halus & Kasar</li>
                    <li>Sosialisasi & Sharing</li>
                    <li>Music & Movement</li>
                  </ul>
                </div>
              </article>

              {/* Program 2: Playgroup */}
              <article className="program-card" data-sc-tilt="6">
                <div className="program-card__media">
                  <img src="/assets/program-playgroup.webp" alt="Playgroup activities" width="400" height="300" />
                </div>
                <div className="program-card__content">
                  <span className="sc-label">3 – 4 Tahun</span>
                  <h3 className="sc-display sc-display--md">Playgroup</h3>
                  <p className="sc-body">Kreativitas & kemandirian melalui bermain terarah. Phonics, pre-math, seni, outdoor, hafalan surat pendek.</p>
                  <ul className="program-card__features" role="list">
                    <li>Phonics Awareness</li>
                    <li>Pre-Math Concepts</li>
                    <li>Art, Craft & Hafalan</li>
                    <li>Outdoor Exploration</li>
                  </ul>
                </div>
              </article>

              {/* Program 3: TK A */}
              <article className="program-card" data-sc-tilt="6">
                <div className="program-card__media">
                  <img src="/assets/program-tka.webp" alt="TK A classroom" width="400" height="300" />
                </div>
                <div className="program-card__content">
                  <span className="sc-label">4 – 5 Tahun</span>
                  <h3 className="sc-display sc-display--md">TK A</h3>
                  <p className="sc-body">Persiapan SD: literasi, numerasi, karakter Islami. Reading readiness, number sense, STEAM, akhlak mulia.</p>
                  <ul className="program-card__features" role="list">
                    <li>Reading Readiness & Huruf Hijaiyah</li>
                    <li>Number Sense & Logika</li>
                    <li>Character Building & Akhlak</li>
                    <li>STEAM & Keterampilan Hidup</li>
                  </ul>
                </div>
              </article>

              {/* Program 4: TK B */}
              <article className="program-card" data-sc-tilt="6">
                <div className="program-card__media">
                  <img src="/assets/program-tkb.webp" alt="TK B graduation" width="400" height="300" />
                </div>
                <div className="program-card__content">
                  <span className="sc-label">5 – 6 Tahun</span>
                  <h3 className="sc-display sc-display--md">TK B</h3>
                  <p className="sc-body">Persiapan SD komprehensif. Advanced literacy, math mastery, leadership, hafalan juz 30, transisi SD lancar.</p>
                  <ul className="program-card__features" role="list">
                    <li>Advanced Literacy & Juz 30</li>
                    <li>Math Mastery & Pemecahan Masalah</li>
                    <li>Leadership & Tanggung Jawab</li>
                    <li>Primary Transition & Wawancara SD</li>
                  </ul>
                </div>
              </article>

              {/* Closing note card - gives rail the width it needs */}
              <article className="rail__close sc-stack">
                <h3 className="sc-display sc-display--md">Setiap program, satu janji.</h3>
                <p className="sc-body">Kurikulum terintegrasi Islami. Guru yang peduli. Hasil yang terukur.</p>
                <Link href="/program" className="cta cta--secondary inline-flex">
                  Lihat Semua Program
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Link>
              </article>
            </div>
          </div>
        </section>

        {/* ================================================================
           ACT 6 — FACILITIES (pan + reveal)
           Another pan rail but for facilities. Reveal on images.
           ================================================================ */}
        <section
          data-sc-act="pan"
          data-sc-span="3.8"
          data-sc-drift="#fef8f0"
          aria-labelledby="act6-title"
        >
          <div data-sc-stage>
            <div className="rail" data-sc-pan="0.06">
              <article className="rail__lead sc-stack">
                <h2 id="act6-title" className="sc-display sc-display--md">
                  Fasilitas lengkap untuk tumbuh kembang optimal
                </h2>
                <p className="sc-body">
                  Ruang belajar modern. Musholla & ruang ibadah. Kantin bergizi. Ruang tidur. Area bermain SNI.
                </p>
              </article>

              <article className="facility-card" data-sc-tilt="6">
                <figure data-sc-reveal="left" data-sc-reveal-at="0.2 0.6">
                  <img src="/assets/facility-classroom.webp" alt="Ruang Kelas Cerdas" width="400" height="300" />
                </figure>
                <div className="facility-card__content">
                  <h3 className="sc-display sc-display--md">Ruang Kelas Cerdas</h3>
                  <p className="sc-body">AC, Proyektor Interaktif, WiFi, Furnitur Ergonomis, Sudut Baca.</p>
                </div>
              </article>

              <article className="facility-card" data-sc-tilt="6">
                <figure data-sc-reveal="left" data-sc-reveal-at="0.2 0.6">
                  <img src="/assets/facility-steam.webp" alt="Laboratorium STEAM" width="400" height="300" />
                </figure>
                <div className="facility-card__content">
                  <h3 className="sc-display sc-display--md">Laboratorium STEAM & Komputer</h3>
                  <p className="sc-body">Kit Robotik, Laptop/Tablet, Alat Eksperimen, Whiteboard Digital, Coding Dasar.</p>
                </div>
              </article>

              <article className="facility-card" data-sc-tilt="6">
                <figure data-sc-reveal="left" data-sc-reveal-at="0.2 0.6">
                  <img src="/assets/facility-playground.webp" alt="Area Bermain Aman" width="400" height="300" />
                </figure>
                <div className="facility-card__content">
                  <h3 className="sc-display sc-display--md">Area Bermain & Olahraga</h3>
                  <p className="sc-body">Lantai Lempung, Peralatan SNI, Naungan, CCTV 24/7, Lapangan Mini.</p>
                </div>
              </article>

              <article className="facility-card" data-sc-tilt="6">
                <figure data-sc-reveal="left" data-sc-reveal-at="0.2 0.6">
                  <img src="/assets/facility-library.webp" alt="Perpustakaan & Reading Corner" width="400" height="300" />
                </figure>
                <div className="facility-card__content">
                  <h3 className="sc-display sc-display--md">Perpustakaan, Musholla & Kantin</h3>
                  <p className="sc-body">Koleksi Buku Islami & Anak, Musholla Luas, Kantin Bergizi Halal, Ruang Tidur Nyaman.</p>
                </div>
              </article>

              <article className="rail__close sc-stack">
                <h3 className="sc-display sc-display--md">Lebih dari 15 fasilitas terintegrasi.</h3>
                <p className="sc-body">Semua dirancang untuk tumbuh kembang optimal anak Anda.</p>
                <Link href="/fasilitas" className="cta cta--secondary inline-flex">
                  Jelajahi Fasilitas
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Link>
              </article>
            </div>
          </div>
        </section>

        {/* ================================================================
           ACT 7 — TEACHERS (flow + in)
           Ordinary section done well. Stagger reveal on entry.
           ================================================================ */}
        <section
          className="sc-section"
          data-sc-act="flow"
          data-sc-drift="#fefcf8"
          aria-labelledby="act7-title"
        >
          <div className="sc-wrap">
            <div className="sc-stack" data-sc-in data-sc-stagger="80">
              <h2 id="act7-title" className="sc-display sc-display--lg">
                Guru yang mengasuh, bukan hanya mengajar
              </h2>
              <p className="sc-body">
                Lebih dari 150 pendidik bersertifikat S1 PG-PAUD dengan pengalaman rata-rata 8 tahun.
                Setiap guru menjalani pelatihan berkala: pedagogi Islami, psikologi anak, first aid,
                tahsin & hafalan, dan integrasi teknologi. Mereka tidak hanya mengajar —
                mereka mengasuh, mendengar, dan meneladani akhlak mulia setiap hari.
              </p>
            </div>

            <div className="teacher-grid" role="list">
              {[
                { name: "Ibu Sari Dewi, S.Pd", role: "Kepala TK & Guru Kelas TK B", exp: "12 tahun", icon: Award },
                { name: "Bapak Ahmad Rizki, M.Pd", role: "Koordinator STEAM & Coding", exp: "9 tahun", icon: Zap },
                { name: "Ibu Maya Putri, S.Psi", role: "Guru Bimbingan & Konseling", exp: "7 tahun", icon: Users },
                { name: "Ustazah Rina Wijaya, S.Pd.I", role: "Guru Tahsin, Hafalan & Akhlak", exp: "10 tahun", icon: BookOpen },
              ].map((teacher, i) => (
                <article key={teacher.name} className="teacher-card" style={{ transitionDelay: `${i * 80}ms` }}>
                  <div className="teacher-card__avatar" aria-hidden="true">
                    <teacher.icon className="h-8 w-8" />
                  </div>
                  <div className="teacher-card__info">
                    <h3 className="sc-display sc-display--md">{teacher.name}</h3>
                    <p className="sc-label">{teacher.role}</p>
                    <p className="sc-body">{teacher.exp} pengalaman</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="sc-stack" style={{ marginTop: 'var(--sc-8)' }}>
              <Link href="/guru" className="cta cta--secondary inline-flex">
                Kenali Semua Guru Kami
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        {/* ================================================================
           ACT 8 — SAFETY & WELLBEING (pin)
           Short pinned act. One-value hold cues so nothing fades before page ends.
           Spotlight + magnetic CTA on the close.
           ================================================================ */}
        <section
          data-sc-act="pin"
          data-sc-span="2.0"
          data-sc-drift="#fefcf8"
          aria-labelledby="act8-title"
        >
          <div data-sc-stage className="safety-stage" data-sc-spotlight>
            <div className="safety-grid">
              {[
                { icon: Video, label: "CCTV 24/7", desc: "Pengawasan penuh di seluruh area sekolah" },
                { icon: Shield, label: "Akses Terkontrol", desc: "Sistem keamanan pintu masuk & keluar, kartu orang tua" },
                { icon: CheckCircle, label: "Standar SNI & Halal", desc: "Peralatan bermain SNI, makanan berkerti halal MUI" },
                { icon: ThermometerSun, label: "Kesehatan & Nutrisi", desc: "Pemeriksaan rutin, klinik sekolah, menu bergizi seimbang" },
              ].map((item, i) => (
                <article key={item.label} className="safety-card" style={{ transitionDelay: `${i * 60}ms` }}>
                  <div className="safety-card__icon" aria-hidden="true">
                    <item.icon className="h-7 w-7" />
                  </div>
                  <h3 className="sc-display sc-display--md">{item.label}</h3>
                  <p className="sc-body">{item.desc}</p>
                </article>
              ))}
            </div>

            {/* Close: magnetic CTA inside pinned stage, footer inside stage */}
            <footer className="close-foot">
              <h2 id="act8-title" className="sc-display sc-display--lg" data-sc-cue="0.06" data-sc-kinetic="lines">
                Siap memberikan fondasi terbaik untuk anak Anda?
              </h2>
              <Link
                href="/ppdb"
                className="cta cta--primary cta--magnet"
                data-sc-magnet="0.28"
                data-sc-cue="0.06"
                data-sc-rise="0"
              >
                Daftar PPDB Sekarang
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
              <p className="foot-note">
                Proses cepat & aman • Konsultasi gratis • Survei sekolah gratis
              </p>
            </footer>
          </div>
        </section>
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

      {/* ========================================================================
         Client-side initialization: ScrollCraft + Growth Compass + Ornaments
         ======================================================================== */}
      <Script
        id="scrollcraft-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              // Mount ScrollCraft
              if (window.ScrollCraft) {
                window.ScrollCraft.mount(document.body);
              }

              // ================================================================
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