"use client";

import Link from "next/link";
import Script from "next/script";
import { ArrowRight, Users, Award, CheckCircle, Shield, Sparkles, BookOpen, Music, Wifi, Zap, ThermometerSun, Video, ChevronRight } from "lucide-react";

/* ==========================================================================
   MXDP SCROLL-CRAFT HOME PAGE
   Grammar: Filmic one-shot (single linear argument, one emotional arc)
   Journey: Recognition → Tension → Turn → Substance → Range → Commitment
   Feeling Curve: Calm → Building → Relief → Confidence → Excitement → Resolution
   Peak: Turn act (MXDP revealed as the partner)
   Signature Move: "Growth Compass" - a fixed radial progress ring at bottom-right
     that fills as you scroll through a child's educational journey stages,
     with each segment lighting up at its waypoint. Pointer hover expands
     the current stage into a tooltip with real stats.
   ========================================================================== */

export default function Home() {
  return (
    <>
      {/* --- Minimal Chrome: wordmark + ONE CTA --- */}
      <header className="site-bar" role="banner">
        <div className="sc-wrap">
          <Link href="/" className="wordmark" aria-label="MXDP Home">
            <span className="wordmark__logotype">MXDP</span>
            <span className="wordmark__tagline">EdTech Platform</span>
          </Link>
          <Link href="/ppdb" className="cta cta--primary">Daftar Sekarang</Link>
        </div>
      </header>

      {/* --- Page Progress Bar --- */}
      <span data-sc-progress aria-hidden="true"></span>

      {/* --- Atmospheric Grain --- */}
      <div className="sc-grain" aria-hidden="true"></div>

      <main id="top">
        {/* ================================================================
           ACT 1 — RECOGNITION (scrub)
           The morning chaos every parent knows. Camera moves through a
           domestic scene: breakfast table, backpack by door, clock ticking.
           Headline greets on arrival (greet cue), kinetic lines.
           ================================================================ */}
        <section
          data-sc-act="pin"
          data-sc-span="2.8"
          data-sc-dwell="0.35"
          data-sc-drift="#0a0f1a"
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
                Setiap pagi dimulai dengan harapan yang sama.
              </h1>
              <p className="sc-body">
                Anak yang bahagia. Masa depan yang cerah. Pilihan yang tepat.
              </p>
            </div>
          </div>
        </section>

        {/* ================================================================
           ACT 2 — TENSION (pin)
           The weight of the wrong choice. Lines crossfade while the frame holds.
           Overlapping cues ~15% so there's never a gap.
           ================================================================ */}
        <section
          data-sc-act="pin"
          data-sc-span="3.2"
          data-sc-drift="#0f141f"
          aria-labelledby="act2-title"
        >
          <div data-sc-stage className="argument">
            <p className="sc-lede" data-sc-cue="0 0.32 0">
              Pilihan sekolah yang salah: 6 tahun terbang sia-sia.
            </p>
            <p className="sc-lede" data-sc-cue="0.26 0.60">
              Kurikulum kaku. Guru tidak terlatih. Fasilitas minim.
            </p>
            <p className="sc-lede" data-sc-cue="0.54 0.88">
              Anak kehilangan rasa ingin tahu sebelum ia menemukannya.
            </p>
            <p className="sc-lede" data-sc-cue="0.82">
              Bukan soal biaya. Soal masa depan yang tak terulang.
            </p>
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
          data-sc-drift="#141a2a"
          aria-labelledby="act3-title"
        >
          <div className="sc-wrap split">
            <div className="sc-stack" data-sc-in data-sc-stagger="70">
              <h2 id="act3-title" className="sc-display sc-display--lg" data-sc-kinetic="lines">
                Apa yang berubah saat MXDP hadir.
              </h2>
              <p className="sc-body">
                Kami bukan sekadar sekolah. Kami adalah mitra perjalanan pendidikan
                anak Anda — dari langkah pertama Toddler hingga siap SD, dengan
                kurikulum holistik, guru bersertifikat, dan lingkungan yang
                mendorong setiap potensi.
              </p>
              <p className="sc-body">
                Lebih dari 2.500 orang tua telah mempercayakan masa depan anak mereka
                di sini. Hasilnya? Anak yang percaya diri, kritis, dan siap dunia.
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
           ACT 4 — SUBSTANCE (scrub) — second and LAST clip
           Macro texture: close-ups of real learning moments. Trail-anchored copy.
           ================================================================ */}
        <section
          data-sc-act="pin"
          data-sc-span="2.2"
          data-sc-dwell="0.28"
          data-sc-drift="#181f33"
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
                Bukti nyata di setiap sudut kelas.
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
          data-sc-drift="#121826"
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
                  <p className="sc-body">Pengenalan lingkungan melalui bermain terstruktur. Motorik, bahasa, sosialisasi awal.</p>
                  <ul className="program-card__features" role="list">
                    <li>Pengenalan Bahasa</li>
                    <li>Motorik Halus & Kasar</li>
                    <li>Sosialisasi Awal</li>
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
                  <p className="sc-body">Kreativitas dan kemandirian melalui bermain terarah. Phonics, pre-math, seni, outdoor.</p>
                  <ul className="program-card__features" role="list">
                    <li>Phonics Awareness</li>
                    <li>Pre-Math Concepts</li>
                    <li>Art & Craft</li>
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
                  <p className="sc-body">Persiapan SD: literasi, numerasi, karakter. Reading readiness, number sense, STEAM.</p>
                  <ul className="program-card__features" role="list">
                    <li>Reading Readiness</li>
                    <li>Number Sense</li>
                    <li>Character Building</li>
                    <li>STEAM Introduction</li>
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
                  <p className="sc-body">Program persiapan SD komprehensif. Advanced literacy, math mastery, leadership.</p>
                  <ul className="program-card__features" role="list">
                    <li>Advanced Literacy</li>
                    <li>Math Mastery</li>
                    <li>Leadership Skills</li>
                    <li>Primary Transition</li>
                  </ul>
                </div>
              </article>

              {/* Closing note card - gives rail the width it needs */}
              <article className="rail__close sc-stack">
                <h3 className="sc-display sc-display--md">Setiap program, satu janji.</h3>
                <p className="sc-body">Kurikulum terintegrasi. Guru yang peduli. Hasil yang terukur.</p>
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
          data-sc-drift="#0e1320"
          aria-labelledby="act6-title"
        >
          <div data-sc-stage>
            <div className="rail" data-sc-pan="0.06">
              <article className="rail__lead sc-stack">
                <h2 id="act6-title" className="sc-display sc-display--md">
                  Fasilitas yang mendukung setiap minat
                </h2>
                <p className="sc-body">
                  Ruang belajar modern. Area bermain standar SNI. Teknologi terintegrasi.
                </p>
              </article>

              <article className="facility-card" data-sc-tilt="6">
                <figure data-sc-reveal="left" data-sc-reveal-at="0.2 0.6">
                  <img src="/assets/facility-classroom.webp" alt="Smart Classroom" width="400" height="300" />
                </figure>
                <div className="facility-card__content">
                  <h3 className="sc-display sc-display--md">Ruang Kelas Cerdas</h3>
                  <p className="sc-body">AC, Proyektor Interaktif, WiFi, Furnitur Ergonomis.</p>
                </div>
              </article>

              <article className="facility-card" data-sc-tilt="6">
                <figure data-sc-reveal="left" data-sc-reveal-at="0.2 0.6">
                  <img src="/assets/facility-steam.webp" alt="STEAM Laboratory" width="400" height="300" />
                </figure>
                <div className="facility-card__content">
                  <h3 className="sc-display sc-display--md">Laboratorium STEAM</h3>
                  <p className="sc-body">Kit Robotik, Laptop/Tablet, Alat Eksperimen, Whiteboard Digital.</p>
                </div>
              </article>

              <article className="facility-card" data-sc-tilt="6">
                <figure data-sc-reveal="left" data-sc-reveal-at="0.2 0.6">
                  <img src="/assets/facility-playground.webp" alt="Safe Playground" width="400" height="300" />
                </figure>
                <div className="facility-card__content">
                  <h3 className="sc-display sc-display--md">Area Bermain Aman</h3>
                  <p className="sc-body">Lantai Lempung, Peralatan SNI, Naungan, CCTV 24/7.</p>
                </div>
              </article>

              <article className="facility-card" data-sc-tilt="6">
                <figure data-sc-reveal="left" data-sc-reveal-at="0.2 0.6">
                  <img src="/assets/facility-library.webp" alt="Library Reading Corner" width="400" height="300" />
                </figure>
                <div className="facility-card__content">
                  <h3 className="sc-display sc-display--md">Perpustakaan & Reading Corner</h3>
                  <p className="sc-body">Koleksi Buku Anak, Sofa Nyaman, Reading Nook, Audio Books.</p>
                </div>
              </article>

              <article className="rail__close sc-stack">
                <h3 className="sc-display sc-display--md">Lebih dari 15 fasilitas terintegrasi.</h3>
                <p className="sc-body">Semua dirancang untuk perkembangan optimal.</p>
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
          data-sc-drift="#0a0f1a"
          aria-labelledby="act7-title"
        >
          <div className="sc-wrap">
            <div className="sc-stack" data-sc-in data-sc-stagger="80">
              <h2 id="act7-title" className="sc-display sc-display--lg">
                Guru yang menginspirasi, bukan hanya mengajar
              </h2>
              <p className="sc-body">
                Lebih dari 150 pendidik bersertifikat dengan pengalaman rata-rata 8 tahun.
                Setiap guru menjalani pelatihan berkala: pedagogi modern, psikologi anak,
                first aid, dan integrasi teknologi. Mereka tidak hanya mengajar —
                mereka menuntun, mendengar, dan merayakan setiap kemajuan.
              </p>
            </div>

            <div className="teacher-grid" role="list">
              {[
                { name: "Ibu Sari Dewi, S.Pd", role: "Koordinator TK & Guru Kelas", exp: "12 tahun", icon: Award },
                { name: "Bapak Ahmad Rizki, M.Pd", role: "Kepala Laboratorium STEAM", exp: "9 tahun", icon: Zap },
                { name: "Ibu Maya Putri, S.Psi", role: "Konselor & Guru Bimbingan", exp: "7 tahun", icon: Users },
                { name: "Ibu Rina Wijaya, S.Pd", role: "Guru Musik & Gerak", exp: "10 tahun", icon: Music },
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
          data-sc-drift="#080c15"
          aria-labelledby="act8-title"
        >
          <div data-sc-stage className="safety-stage" data-sc-spotlight>
            <div className="safety-grid">
              {[
                { icon: Video, label: "CCTV 24/7", desc: "Pengawasan penuh di seluruh area sekolah" },
                { icon: Shield, label: "Akses Terkontrol", desc: "Sistem keamanan pintu masuk & keluar" },
                { icon: CheckCircle, label: "Standar SNI", desc: "Peralatan bermain berstandar nasional" },
                { icon: ThermometerSun, label: "Kesehatan Terawat", desc: "Pemeriksaan rutin & klinik sekolah" },
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
                Siap memberikan yang terbaik untuk anak Anda?
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
                Proses cepat & aman • Konsultasi gratis • Garansi puas
              </p>
            </footer>
          </div>
        </section>
      </main>

      {/* ========================================================================
         SIGNATURE MOVE: Growth Compass
         Fixed radial progress ring at bottom-right. Fills as scroll progresses
         through educational stages. Pointer hover expands current stage.
         ======================================================================== */}
      <div className="growth-compass" data-sc-spotlight aria-label="Perjalanan pendidikan anak">
        <svg className="compass-ring" viewBox="0 0 120 120" aria-hidden="true">
          <circle
            className="compass-ring__track"
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            style={{ color: 'var(--sc-hairline)' }}
          />
          <circle
            className="compass-ring__progress"
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="var(--sc-accent)"
            strokeWidth="4"
            strokeDasharray="339.3"
            strokeDashoffset="339.3"
            strokeLinecap="round"
            style={{ transform: 'rotate(-90deg)', transformOrigin: '60px 60px', transition: 'stroke-dashoffset 0.3s ease-out' }}
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
         Client-side initialization of ScrollCraft + Growth Compass logic
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

              // Growth Compass logic
              const compass = document.querySelector('.growth-compass');
              if (!compass) return;

              const progressRing = compass.querySelector('.compass-ring__progress');
              const stages = compass.querySelectorAll('.compass-stage');
              const tooltip = compass.querySelector('.compass-tooltip');
              const tooltipStage = compass.querySelector('.tooltip-stage');
              const tooltipDesc = compass.querySelector('.tooltip-desc');

              const stageData = [
                { name: 'Toddler Class', desc: '1.5\u20133 th \u2022 Motorik, bahasa, sosialisasi awal', stat: '200+ siswa' },
                { name: 'Playgroup', desc: '3\u20134 th \u2022 Phonics, pre-math, seni, outdoor', stat: '450+ siswa' },
                { name: 'TK A', desc: '4\u20135 th \u2022 Literasi, numerasi, karakter, STEAM', stat: '680+ siswa' },
                { name: 'TK B', desc: '5\u20136 th \u2022 Advanced literacy, math, leadership', stat: '520+ siswa' },
                { name: 'Siap SD', desc: 'Lulusan MXDP: percaya diri, kritis, siap dunia', stat: '98% lolos SD favorit' },
              ];

              const totalCircumference = 339.3; // 2 * PI * 54
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
                    tooltipDesc.textContent = data.desc + ' \u2022 ' + data.stat;
                    tooltip.style.opacity = '1';
                    tooltip.style.transform = 'translate(-50%, -100%) translate(' + (Math.cos(angle) * 80).toFixed(1) + 'px, ' + (Math.sin(angle) * 80).toFixed(1) + 'px)';
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
            })();
          `,
        }}
      />
    </>
  );
}