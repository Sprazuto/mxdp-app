"use client";

import { Paintbrush, Droplet, Cloud, Sun, Gem, Sparkle, Leaf, Home, Palette, BookOpen, Calculator, Music, Award, Puzzle, Users, CloudRain } from "lucide-react";

const features = [
  { name: "Pink Merona", desc: "Ceria dan berani", icon: Paintbrush, color: "clay-pink", blob: "blob-3", iconBg: "clay-1", iconBlob: "blob-7" },
  { name: "Mint Segar", desc: "Tenang dan segar", icon: Droplet, color: "clay-mint", blob: "blob-4", iconBg: "clay-3", iconBlob: "blob-1" },
  { name: "Biru Langit", desc: "Bebas dan tinggi", icon: Cloud, color: "clay-blue", blob: "blob-5", iconBg: "clay-6", iconBlob: "blob-3" },
  { name: "Peach Manis", desc: "Hangat dan manis", icon: Sun, color: "clay-peach", blob: "blob-6", iconBg: "clay-2", iconBlob: "blob-5" },
  { name: "Rose Cerah", desc: "Bersinar spesial", icon: Gem, color: "clay-rose", blob: "blob-7", iconBg: "clay-7", iconBlob: "blob-7" },
  { name: "Pale Mint", desc: "Lembut dan tenang", icon: Leaf, color: "clay-palemint", blob: "blob-8", iconBg: "clay-8", iconBlob: "blob-2" },
  { name: "Lavender Ajaib", desc: "Imajinatif", icon: Sparkle, color: "clay-lavender", blob: "blob-1", iconBg: "clay-4", iconBlob: "blob-4" },
  { name: "Pasir Hangat", desc: "Nyaman dan aman", icon: Home, color: "clay-sand", blob: "blob-2", iconBg: "clay-5", iconBlob: "blob-6" },
];

const categories = [
  { name: "Cerita Ajaib", desc: "Alur cerita yang melengkung", icon: BookOpen, color: "clay-peach", blob: "blob-1", iconColor: "clay-1", iconBlob: "blob-3" },
  { name: "Mewarnai", desc: "Warna mengalir bebas", icon: Palette, color: "clay-pink", blob: "blob-2", iconColor: "clay-1", iconBlob: "blob-4" },
  { name: "Alam & Hewan", desc: "Bentuk daun dan bunga", icon: Leaf, color: "clay-mint", blob: "blob-3", iconColor: "clay-3", iconBlob: "blob-5" },
  { name: "Angka & Logika", desc: "Pola melengkung", icon: Calculator, color: "clay-blue", blob: "blob-4", iconColor: "clay-6", iconBlob: "blob-6" },
  { name: "Musik & Gerak", desc: "Gelombang suara", icon: Music, color: "clay-lavender", blob: "blob-5", iconColor: "clay-4", iconBlob: "blob-7" },
  { name: "Hadiah & Lencana", desc: "Bentuk lengkap utuh", icon: Award, color: "clay-sand", blob: "blob-6", iconColor: "clay-5", iconBlob: "blob-8" },
  { name: "Puzzle Organik", desc: "Potongan melengkung", icon: Puzzle, color: "clay-peach", blob: "blob-7", iconColor: "clay-2", iconBlob: "blob-1" },
  { name: "Bersama Keluarga", desc: "Lingkaran kasih", icon: Users, color: "clay-rose", blob: "blob-8", iconColor: "clay-7", iconBlob: "blob-2" },
  { name: "Cuaca & Musim", desc: "Aliran alam", icon: CloudRain, color: "clay-palemint", blob: "blob-1", iconColor: "clay-3", iconBlob: "blob-3" },
];

export default function FeaturesSection() {
  return (
    <>
      {/* ACT 2: Sticky Organic Cards - Featured Characters */}
      <section
        data-sc-act="pin"
        className="pin stagger z-10 relative min-h-screen flex items-center justify-center px-4 md:px-8"
        aria-labelledby="features-title"
      >
        <div className="clay-blob blob-2 clay-lavender max-w-7xl w-full relative z-10 p-8 md:p-16">
          <div className="absolute -top-8 -right-8 w-24 h-24 bg-[var(--clay-4)] blob-4 opacity-20 blur-xl" aria-hidden="true"></div>
          <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-[var(--clay-7)] blob-5 opacity-20 blur-xl" aria-hidden="true"></div>

          <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start md:items-center">
            <div className="flex-1 min-w-[250px] relative z-10">
              <h2 id="features-title" className="sc-display sc-display--lg text-[var(--clay-4)] mb-6 leading-tight">
                Bentuk-bentuk<br />yang Hidup
              </h2>
              <p className="text-lg md:text-xl text-gray-500">
                Setiap blob punya warna, karakter, dan cerita sendiri. Pilih yang memanggilmu.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-5xl relative z-10">
              {features.map((feature, i) => (
                <article
                  key={feature.name}
                  className={`clay-blob ${feature.blob} ${feature.color} p-8 md:p-10 text-center cursor-pointer group relative`}
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className={`absolute -top-3 -right-3 w-16 h-16 ${feature.iconBg} ${feature.iconBlob} opacity-30 blur-lg`} aria-hidden="true" />
                  <div className="w-24 h-24 mx-auto mb-6 group-hover:scale-110 transition-transform duration-500">
                    <div className={`w-full h-full ${feature.iconBg} ${feature.iconBlob} flex items-center justify-center shadow-[8px_8px_16px_rgba(0,0,0,0.1)]`}>
                      <feature.icon className="w-12 h-12 text-white" aria-hidden="true" />
                    </div>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2">{feature.name}</h3>
                  <p className="text-sm text-gray-500">{feature.desc}</p>
                </article>
              ))}
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

      {/* ACT 4: Organic Grid - Categories */}
      <section
        data-sc-act="flow"
        data-sc-drift="#fef3e8"
        className="reveal z-10 relative min-h-[140vh] px-4 md:px-8"
        aria-labelledby="categories-title"
      >
        <div className="clay-blob blob-5 clay-mint max-w-7xl relative z-10 p-8 md:p-16">
          <div className="absolute -top-12 -right-12 w-36 h-36 bg-[var(--clay-3)] blob-1 opacity-20 blur-2xl" aria-hidden="true"></div>
          <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-[var(--clay-5)] blob-6 opacity-20 blur-2xl" aria-hidden="true"></div>

          <div className="text-center mb-16">
            <h2 id="categories-title" className="sc-display sc-display--lg text-[var(--clay-3)] mb-4">
              Koleksi Organik
            </h2>
            <p className="text-lg text-gray-500">Scroll perlahan. Biarkan setiap bentuk muncul dengan gerakannya sendiri.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            {categories.map((cat, i) => (
              <article
                key={cat.name}
                className={`clay-blob ${cat.blob} ${cat.color} p-8 cursor-pointer group relative overflow-hidden`}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className={`absolute top-4 right-4 w-28 h-28 ${cat.iconColor} ${cat.iconBlob} opacity-20 blur-xl`} aria-hidden="true" />
                <div className={`w-12 h-12 mx-auto mb-6 text-[var(--${cat.iconColor})]`}>
                  <cat.icon className="w-full h-full" aria-hidden="true" />
                </div>
                <h4 className="text-xl font-bold">{cat.name}</h4>
                <p className="text-sm text-gray-500 mt-2">{cat.desc}</p>
              </article>
            ))}
          </div>
        </div>

        {/* Wavy divider */}
        <div className="absolute bottom-0 left-0 w-full h-20 pointer-events-none sc-wave-divider" aria-hidden="true">
          <svg viewBox="0 0 1200 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path d="M0,40 C300,80 600,0 900,40 S1200,80 1200,40 L1200,80 0,80 Z" fill="var(--sc-canvas)" />
          </svg>
        </div>
      </section>
    </>
  );
}