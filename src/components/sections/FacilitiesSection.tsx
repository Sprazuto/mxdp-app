"use client";

import Image from "next/image";
import Link from "next/link";
import { urlFor, type SanityImage } from "@/lib/sanity";
import { getFacilities } from "@/lib/sanity/queries";
import { Video, Wifi, Shield, ThermometerSun, Music, BookOpen, Zap, CheckCircle2, Sparkles as SparklesIcon, Sun, Cloud, Home, Dumbbell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardIcon } from "@/components/ui/card";

interface Facility {
  _id: string;
  name: string;
  slug: { current: string };
  description: unknown;
  thumbnail: SanityImage | null;
  gallery: SanityImage[];
  features: string[];
  hasCctv: boolean;
  order: number;
}

const fallbackFacilities: Facility[] = [
  {
    _id: "fallback-1",
    name: "Ruang Kelas Cerdas",
    slug: { current: "ruang-kelas-cerdas" },
    description: [],
    thumbnail: null,
    gallery: [],
    features: ["AC", "Proyektor Interaktif", "WiFi", "Meja & Kursi Ergonomis"],
    hasCctv: true,
    order: 1,
  },
  {
    _id: "fallback-2",
    name: "Laboratorium STEAM & Komputer",
    slug: { current: "lab-steam" },
    description: [],
    thumbnail: null,
    gallery: [],
    features: ["Kit Robotik", "Laptop/Tablet", "Alat Eksperimen", "Whiteboard Digital"],
    hasCctv: true,
    order: 2,
  },
  {
    _id: "fallback-3",
    name: "Area Bermain & Olahraga",
    slug: { current: "area-bermain-aman" },
    description: [],
    thumbnail: null,
    gallery: [],
    features: ["Lantai Lempung", "Peralatan Standar SNI", "Naungan", "CCTV"],
    hasCctv: true,
    order: 3,
  },
  {
    _id: "fallback-4",
    name: "Perpustakaan, Musholla & Kantin",
    slug: { current: "perpustakaan" },
    description: [],
    thumbnail: null,
    gallery: [],
    features: ["Koleksi Buku Islami & Anak", "Musholla Luas", "Kantin Bergizi Halal", "Ruang Tidur Nyaman"],
    hasCctv: false,
    order: 4,
  },
];

const facilityThemes = [
  {
    variant: "blue" as const,
    blob: 4 as const,
    icon: Wifi,
    iconColor: "blue" as const,
    badgeVariant: "clay-blue" as const,
  },
  {
    variant: "lavender" as const,
    blob: 7 as const,
    icon: Zap,
    iconColor: "lavender" as const,
    badgeVariant: "clay-lavender" as const,
  },
  {
    variant: "mint" as const,
    blob: 3 as const,
    icon: Shield,
    iconColor: "mint" as const,
    badgeVariant: "clay-mint" as const,
  },
  {
    variant: "peach" as const,
    blob: 5 as const,
    icon: BookOpen,
    iconColor: "peach" as const,
    badgeVariant: "clay-peach" as const,
  },
];

const safetyFeatures = [
  { icon: Video, label: "CCTV 24/7", desc: "Pengawasan penuh di seluruh area sekolah" },
  { icon: Shield, label: "Akses Terkontrol", desc: "Sistem keamanan pintu masuk & keluar, kartu orang tua" },
  { icon: CheckCircle2, label: "Standar SNI & Halal", desc: "Peralatan bermain SNI, makanan bersertifikat halal MUI" },
  { icon: ThermometerSun, label: "Kesehatan & Nutrisi", desc: "Pemeriksaan rutin, klinik sekolah, menu bergizi seimbang" },
];

const safetyThemes = [
  {
    variant: "pink" as const,
    blob: 1 as const,
    icon: Video,
    iconColor: "pink" as const,
    badgeVariant: "clay-pink" as const,
  },
  {
    variant: "peach" as const,
    blob: 5 as const,
    icon: Shield,
    iconColor: "peach" as const,
    badgeVariant: "clay-peach" as const,
  },
  {
    variant: "mint" as const,
    blob: 3 as const,
    icon: CheckCircle2,
    iconColor: "mint" as const,
    badgeVariant: "clay-mint" as const,
  },
  {
    variant: "blue" as const,
    blob: 4 as const,
    icon: ThermometerSun,
    iconColor: "blue" as const,
    badgeVariant: "clay-blue" as const,
  },
];

async function FacilitiesSectionContent() {
  const facilities = (await getFacilities()) as Facility[] | null;
  const displayFacilities = facilities?.length ? facilities : fallbackFacilities;

  return (
    <>
      <section className="relative px-4 py-16 sm:py-20 lg:py-24" aria-labelledby="facilities-title">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16" data-sc-in data-sc-cue="0 0.6">
            <span className="inline-flex items-center gap-2 clay-badge clay-mint px-4 py-1.5 text-sm font-semibold mb-4">
              <SparklesIcon className="h-4 w-4 animate-bounce" aria-hidden="true" />
              Fasilitas Lengkap
            </span>

            <h2 id="facilities-title" className="sc-display sc-display--xl mb-4">
              Fasilitas Pendukung
              <span className="block gradient-text">Pembelajaran Modern</span>
            </h2>

            <p className="sc-body text-lg">
              Lingkungan belajar modern dengan fasilitas standar internasional untuk mendukung perkembangan optimal siswa.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12" data-sc-in data-sc-stagger="100">
            {displayFacilities.map((facility, index) => {
              const theme = facilityThemes[index % facilityThemes.length];

              return (
                <Card
                  key={facility._id}
                  variant={theme.variant}
                  blob={theme.blob}
                  hoverable
                  data-sc-cue={`${0.1 + index * 0.15} ${0.4 + index * 0.15}`}
                >
                  <div className="relative aspect-video overflow-hidden rounded-[var(--sc-r-xl)] bg-[var(--sc-canvas)] mb-6">
                    {facility.thumbnail ? (
                      (() => {
                        const imageUrl = urlFor(facility.thumbnail);
                        return imageUrl ? (
                          <Image
                            src={imageUrl.width(500).height(350).auto("format").quality(80).url()}
                            alt={facility.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full w-full">
                            <CardIcon color={theme.iconColor}><theme.icon className="h-8 w-8" aria-hidden="true" /></CardIcon>
                          </div>
                        );
                      })()
                    ) : (
                      <div className="flex items-center justify-center h-full w-full">
                        <CardIcon color={theme.iconColor}><theme.icon className="h-8 w-8" aria-hidden="true" /></CardIcon>
                      </div>
                    )}
                    {facility.hasCctv && (
                      <div className="absolute top-3 right-3">
                        <Badge variant="clay-rose" className="gap-1.5 px-3 py-1.5 text-xs font-black animate-pulse">
                          <Video className="h-3.5 w-3.5" aria-hidden="true" />
                          LIVE CCTV
                        </Badge>
                      </div>
                    )}
                  </div>

                  <h3 className="sc-display sc-display--md font-bold text-[var(--sc-ink)] mb-2">
                    {facility.name}
                  </h3>

                  <ul className="space-y-1.5 mb-4" role="list">
                    {facility.features.slice(0, 4).map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-[var(--sc-ink-soft)]">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ background: `var(--${theme.iconColor})` }} aria-hidden="true" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </Card>
              );
            })}
          </div>

          <div className="text-center" data-sc-in data-sc-cue="0.8 1">
            <Button variant="clay-secondary" size="lg" className="rounded-full px-8 py-3 text-lg font-semibold">
              <Link href="/fasilitas" className="flex items-center justify-center gap-2">
                Lihat Semua Fasilitas
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="relative px-4 py-16 sm:py-20 lg:py-24" aria-labelledby="safety-title">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-12" data-sc-in data-sc-cue="0 0.6">
            <span className="inline-flex items-center gap-2 clay-badge clay-rose px-4 py-1.5 text-sm font-semibold mb-4">
              <Video className="h-4 w-4 animate-pulse" aria-hidden="true" />
              Keamanan & Kesejahteraan
            </span>

            <h2 id="safety-title" className="sc-display sc-display--xl mb-4">
              Sistem Keamanan & Keselamatan
              <span className="block gradient-text">Terintegrasi</span>
            </h2>

            <p className="sc-body text-lg">
              Komitmen kami untuk menyediakan lingkungan yang aman, nyaman, dan sehat bagi setiap siswa.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" data-sc-in data-sc-stagger="100">
            {safetyFeatures.map((feature, index) => {
              const theme = safetyThemes[index % safetyThemes.length];

              return (
                <Card
                  key={feature.label}
                  variant={theme.variant}
                  blob={theme.blob}
                  hoverable
                  data-sc-cue={`${0.1 + index * 0.15} ${0.4 + index * 0.15}`}
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-[var(--sc-r-lg)]" style={{ background: `linear-gradient(135deg, var(--${theme.iconColor}), var(--${theme.variant}))` }}>
                    <feature.icon className="h-7 w-7 text-white" aria-hidden="true" />
                  </div>

                  <h3 className="sc-display sc-display--md font-bold text-[var(--sc-ink)] mb-2">
                    {feature.label}
                  </h3>

                  <p className="sc-body text-sm leading-relaxed">
                    {feature.desc}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export function FacilitiesSection() {
  return <FacilitiesSectionContent />;
}