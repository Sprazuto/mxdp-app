"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const facilities = [
  {
    title: "Ruang Kelas Cerdas",
    desc: "AC, Proyektor Interaktif, WiFi, Furnitur Ergonomis, Sudut Baca.",
    image: "/assets/facility-classroom.webp",
    color: "clay-teal",
    blob: "blob-1",
  },
  {
    title: "Laboratorium STEAM & Komputer",
    desc: "Kit Robotik, Laptop/Tablet, Alat Eksperimen, Whiteboard Digital, Coding Dasar.",
    image: "/assets/facility-steam.webp",
    color: "clay-violet",
    blob: "blob-2",
  },
  {
    title: "Area Bermain & Olahraga",
    desc: "Lantai Lempung, Peralatan SNI, Naungan, CCTV 24/7, Lapangan Mini.",
    image: "/assets/facility-playground.webp",
    color: "clay-amber",
    blob: "blob-3",
  },
  {
    title: "Perpustakaan, Musholla & Kantin",
    desc: "Koleksi Buku Islami & Anak, Musholla Luas, Kantin Bergizi Halal, Ruang Tidur Nyaman.",
    image: "/assets/facility-library.webp",
    color: "clay-lime",
    blob: "blob-4",
  },
];

export default function FacilitiesSection() {
  return (
    <section
      data-sc-act="pan"
      data-sc-span="3.8"
      className="relative min-h-screen px-4 md:px-8"
      aria-labelledby="facilities-title"
    >
      <div className="relative z-10">
        <div className="clay-blob blob-7 clay-rose max-w-7xl relative p-4 md:p-8">
          <div className="absolute -top-8 -right-8 w-24 h-24 bg-[var(--clay-7)] blob-4 opacity-25 blur-2xl" aria-hidden="true"></div>
          <div className="absolute -bottom-8 -left-8 w-28 h-28 bg-[var(--clay-5)] blob-5 opacity-20 blur-2xl" aria-hidden="true"></div>

          <div className="p-4 md:p-8">
            <div className="rail" data-sc-pan="0.06">
              <article className="rail__lead sc-stack">
                <div className="clay-blob blob-1 clay-peach p-6 md:p-8 max-w-xl mx-auto text-center">
                  <h2 id="facilities-title" className="sc-display sc-display--md mb-4">
                    Fasilitas lengkap untuk tumbuh kembang optimal
                  </h2>
                  <p className="sc-body mb-6">
                    Ruang belajar modern. Musholla & ruang ibadah. Kantin bergizi. Ruang tidur. Area bermain SNI.
                  </p>
                </div>
              </article>

              {facilities.map((facility, i) => (
                <article
                  key={facility.title}
                  className={`facility-card ${facility.color} ${facility.blob}`}
                  data-sc-tilt="6"
                >
                  <figure data-sc-reveal="left" data-sc-reveal-at="0.2 0.6">
                    <img src={facility.image} alt={facility.title} width="400" height="300" />
                  </figure>
                  <div className="facility-card__content p-6">
                    <h3 className="sc-display sc-display--md mb-3">{facility.title}</h3>
                    <p className="sc-body">{facility.desc}</p>
                  </div>
                </article>
              ))}

              <article className="rail__close sc-stack">
                <div className="clay-blob blob-2 clay-lavender p-6 md:p-8 max-w-xl mx-auto text-center">
                  <h3 className="sc-display sc-display--md mb-4">Lebih dari 15 fasilitas terintegrasi.</h3>
                  <p className="sc-body mb-6">Semua dirancang untuk tumbuh kembang optimal anak Anda.</p>
                  <Link href="/fasilitas" className="cta cta--secondary inline-flex">
                    Jelajahi Fasilitas
                    <ArrowRight className="h-5 w-5" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-20 pointer-events-none" aria-hidden="true">
        <svg viewBox="0 0 1200 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M0,40 C300,80 600,0 900,40 S1200,80 1200,40 L1200,80 0,80 Z" fill="var(--sc-canvas)" />
        </svg>
      </div>
    </section>
  );
}