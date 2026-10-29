"use client";

import Link from "next/link";
import Image from "next/image";
import { urlFor, type SanityImage } from "@/lib/sanity";
import { getPrograms } from "@/lib/sanity/queries";
import { ChevronRight, Users, Clock, Award, Shield, Sparkles as SparklesIcon, Leaf, Music, BookOpen, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardIcon, CardContent } from "@/components/ui/card";

interface Program {
  _id: string;
  title: string;
  slug: { current: string };
  shortDescription: string;
  fullDescription: unknown;
  thumbnail: SanityImage | null;
  duration: string;
  ageGroup: string;
  features: string[];
  isActive: boolean;
  order: number;
}

const fallbackPrograms: Program[] = [
  {
    _id: "fallback-1",
    title: "Toddler Class",
    slug: { current: "toddler" },
    shortDescription: "Program pengenalan lingkungan sekolah dengan pendekatan bermain untuk anak usia 1.5-3 tahun.",
    fullDescription: [],
    thumbnail: null,
    duration: "1 Tahun",
    ageGroup: "1.5 - 3 Tahun",
    features: ["Pengenalan Bahasa & Doa", "Motorik Halus & Kasar", "Sosialisasi & Sharing", "Music & Movement"],
    isActive: true,
    order: 1,
  },
  {
    _id: "fallback-2",
    title: "Playgroup",
    slug: { current: "playgroup" },
    shortDescription: "Belajar melalui bermain terstruktur untuk mengembangkan kreativitas dan kemandirian anak usia 3-4 tahun.",
    fullDescription: [],
    thumbnail: null,
    duration: "1 Tahun",
    ageGroup: "3 - 4 Tahun",
    features: ["Phonics Awareness", "Pre-Math Concepts", "Art, Craft & Hafalan", "Outdoor Exploration"],
    isActive: true,
    order: 2,
  },
  {
    _id: "fallback-3",
    title: "TK A (Kindergarten A)",
    slug: { current: "tk-a" },
    shortDescription: "Persiapan sekolah dasar dengan fokus literasi, numerasi, dan pembentukan karakter untuk usia 4-5 tahun.",
    fullDescription: [],
    thumbnail: null,
    duration: "1 Tahun",
    ageGroup: "4 - 5 Tahun",
    features: ["Reading Readiness & Huruf Hijaiyah", "Number Sense & Logika", "Character Building & Akhlak", "STEAM & Keterampilan Hidup"],
    isActive: true,
    order: 3,
  },
  {
    _id: "fallback-4",
    title: "TK B (Kindergarten B)",
    slug: { current: "tk-b" },
    shortDescription: "Program persiapan SD yang komprehensif mencakup akademik, sosial-emosional, dan keterampilan hidup untuk usia 5-6 tahun.",
    fullDescription: [],
    thumbnail: null,
    duration: "1 Tahun",
    ageGroup: "5 - 6 Tahun",
    features: ["Advanced Literacy & Juz 30", "Math Mastery & Pemecahan Masalah", "Leadership & Tanggung Jawab", "Primary Transition & Wawancara SD"],
    isActive: true,
    order: 4,
  },
];

const programThemes = [
  {
    id: "toddler",
    variant: "mint" as const,
    blob: 3 as const,
    icon: Users,
    iconColor: "mint" as const,
    badgeVariant: "clay-mint" as const,
  },
  {
    id: "playgroup",
    variant: "pink" as const,
    blob: 1 as const,
    icon: SparklesIcon,
    iconColor: "pink" as const,
    badgeVariant: "clay-pink" as const,
  },
  {
    id: "tk-a",
    variant: "peach" as const,
    blob: 5 as const,
    icon: Award,
    iconColor: "peach" as const,
    badgeVariant: "clay-peach" as const,
  },
  {
    id: "tk-b",
    variant: "lavender" as const,
    blob: 7 as const,
    icon: Shield,
    iconColor: "lavender" as const,
    badgeVariant: "clay-lavender" as const,
  },
];

async function ProgramsSectionContent() {
  const programs = (await getPrograms()) as Program[] | null;
  const displayPrograms = programs?.length ? programs : fallbackPrograms;

  return (
    <section className="relative px-4 py-16 sm:py-20 lg:py-24" aria-labelledby="programs-title">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16" data-sc-in data-sc-cue="0 0.6">
          <span className="inline-flex items-center gap-2 clay-badge clay-mint px-4 py-1.5 text-sm font-semibold mb-4">
            <SparklesIcon className="h-4 w-4 animate-bounce" aria-hidden="true" />
            Program Unggulan
          </span>

          <h2 id="programs-title" className="sc-display sc-display--xl mb-4">
            Program Pendidikan
            <span className="block gradient-text">Terpadu & Holistik</span>
          </h2>

          <p className="sc-body text-lg">
            Kurikulum holistik yang dirancang untuk setiap tahap perkembangan anak, dari Toddler hingga persiapan SD.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" data-sc-in data-sc-stagger="100">
          {displayPrograms.map((program, index) => {
            const theme = programThemes[index % programThemes.length];
            const IconComponent = theme.icon;

            return (
              <Card
                key={program._id}
                variant={theme.variant}
                blob={theme.blob}
                hoverable
                data-sc-cue={`${0.1 + index * 0.15} ${0.4 + index * 0.15}`}
              >
                <div className="relative aspect-video overflow-hidden rounded-[var(--sc-r-xl)] bg-[var(--sc-canvas)] mb-6">
                  {program.thumbnail ? (
                    (() => {
                      const imageUrl = urlFor(program.thumbnail);
                      return imageUrl ? (
                        <Image
                          src={imageUrl.width(600).height(400).auto("format").quality(80).url()}
                          alt={program.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full w-full">
                          <CardIcon color={theme.iconColor}><IconComponent className="h-8 w-8" aria-hidden="true" /></CardIcon>
                        </div>
                      );
                    })()
                  ) : (
                    <div className="flex items-center justify-center h-full w-full">
                      <CardIcon color={theme.iconColor}><IconComponent className="h-8 w-8" aria-hidden="true" /></CardIcon>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between mb-3">
                  <Badge variant={theme.badgeVariant} className="px-3 py-1 text-xs font-semibold">
                    <Users className="h-3 w-3 mr-1" aria-hidden="true" />
                    {program.ageGroup}
                  </Badge>
                  <Badge variant="clay-sand" className="px-3 py-1 text-xs font-medium">
                    <Clock className="h-3 w-3 mr-1" aria-hidden="true" />
                    {program.duration}
                  </Badge>
                </div>

                <h3 className="sc-display sc-display--md font-bold text-[var(--sc-ink)] mb-2">
                  {program.title}
                </h3>

                <p className="sc-body text-sm mb-4 line-clamp-2">
                  {program.shortDescription}
                </p>

                <ul className="mb-6 space-y-2" role="list">
                  {program.features.slice(0, 4).map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[var(--sc-ink-soft)]">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ background: `var(--${theme.iconColor})` }} aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button variant="clay-primary" className="w-full gap-2 rounded-full py-3 font-semibold text-lg">
                  <Link href={`/program/${program.slug.current}`} className="flex items-center justify-center gap-2 w-full py-2">
                    Lihat Detail
                    <ChevronRight className="h-5 w-5" aria-hidden="true" />
                  </Link>
                </Button>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center" data-sc-in data-sc-cue="0.8 1">
          <Button variant="clay-secondary" size="lg" className="rounded-full px-8 py-3 text-lg font-semibold">
            <Link href="/program" className="flex items-center justify-center gap-2">
              Lihat Semua Program
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export function ProgramsSection() {
  return <ProgramsSectionContent />;
}