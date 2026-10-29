"use client";

import Image from "next/image";
import Link from "next/link";
import { urlFor, type SanityImage } from "@/lib/sanity";
import { getTeachers } from "@/lib/sanity/queries";
import { GraduationCap, Award, Heart, Users, Sparkles as SparklesIcon, BookOpen, MessageSquare, Globe, Shield, ChevronRight, Stethoscope, Music, Leaf, Palette } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardIcon } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Teacher {
  _id: string;
  name: string;
  slug: { current: string };
  role: string;
  bio: unknown;
  photo: SanityImage | null;
  education: string[];
  experience: string[];
  specialties: string[];
  socialMedia?: {
    linkedin?: string;
    instagram?: string;
  };
  order: number;
}

const fallbackTeachers: Teacher[] = [
  {
    _id: "fallback-1",
    name: "Dra. Siti Rahayu, M.Pd",
    slug: { current: "siti-rahayu" },
    role: "Kepala Sekolah",
    bio: [],
    photo: null,
    education: ["S2 Manajemen Pendidikan", "S1 Pendidikan Guru PAUD"],
    experience: ["15+ Tahun Pengalaman", "5 Tahun Sebagai Kepala Sekolah"],
    specialties: ["Manajemen Sekolah", "Kurikulum PAUD", "Parenting Education"],
    socialMedia: { linkedin: "#", instagram: "#" },
    order: 1,
  },
  {
    _id: "fallback-2",
    name: "Dewi Lestari, S.Pd",
    slug: { current: "dewi-lestari" },
    role: "Guru Kelas TK A",
    bio: [],
    photo: null,
    education: ["S1 Pendidikan Anak Usia Dini"],
    experience: ["8 Tahun Mengajar", "Sertifikasi Guru"],
    specialties: ["Literasi Awal", "STEAM untuk Anak", "Art Therapy"],
    socialMedia: { instagram: "#" },
    order: 2,
  },
  {
    _id: "fallback-3",
    name: "Budi Santoso, S.Pd",
    slug: { current: "budi-santoso" },
    role: "Guru Kelas TK B",
    bio: [],
    photo: null,
    education: ["S1 Pendidikan Guru TK", "Sertifikasi Montessori"],
    experience: ["10 Tahun Mengajar", "Pelatih OSN SD"],
    specialties: ["Matematika Anak", "Pemecahan Masalah", "Character Building"],
    socialMedia: { linkedin: "#" },
    order: 3,
  },
  {
    _id: "fallback-4",
    name: "Ratna Dewi, S.Psi",
    slug: { current: "ratna-dewi" },
    role: "Konselor & Guru Inklusi",
    bio: [],
    photo: null,
    education: ["S1 Psikologi", "Sertifikasi Konseling Anak"],
    experience: ["7 Tahun Konseling", "Spesialis Kebutuhan Khusus"],
    specialties: ["Psikologi Perkembangan", "Inklusi Pendidikan", "Emotional Coaching"],
    socialMedia: { instagram: "#" },
    order: 4,
  },
  {
    _id: "fallback-5",
    name: "Andi Wijaya, S.Pd",
    slug: { current: "andi-wijaya" },
    role: "Guru Pendidikan Jasmani & Seni",
    bio: [],
    photo: null,
    education: ["S1 Pendidikan Jasmani", "Sertifikasi Seni Rupa"],
    experience: ["6 Tahun Mengajar", "Pelatih Lomba Seni"],
    specialties: ["Motorik Kasar", "Ekspresi Seni", "Musik & Gerak"],
    socialMedia: {},
    order: 5,
  },
  {
    _id: "fallback-6",
    name: "Maya Sari, S.Pd",
    slug: { current: "maya-sari" },
    role: "Guru Kelas Playgroup",
    bio: [],
    photo: null,
    education: ["S1 Pendidikan Anak Usia Dini"],
    experience: ["5 Tahun Mengajar", "Ahli Music Together"],
    specialties: ["Pengenalan Bahasa", "Sensory Play", "Early Literacy"],
    socialMedia: { instagram: "#" },
    order: 6,
  },
];

const teacherThemes = [
  {
    variant: "mint" as const,
    blob: 3 as const,
    icon: Users,
    iconColor: "mint" as const,
    badgeVariant: "clay-mint" as const,
  },
  {
    variant: "peach" as const,
    blob: 5 as const,
    icon: SparklesIcon,
    iconColor: "peach" as const,
    badgeVariant: "clay-peach" as const,
  },
  {
    variant: "blue" as const,
    blob: 4 as const,
    icon: Shield,
    iconColor: "blue" as const,
    badgeVariant: "clay-blue" as const,
  },
  {
    variant: "lavender" as const,
    blob: 7 as const,
    icon: Award,
    iconColor: "lavender" as const,
    badgeVariant: "clay-lavender" as const,
  },
  {
    variant: "peach" as const,
    blob: 1 as const,
    icon: Heart,
    iconColor: "peach" as const,
    badgeVariant: "clay-peach" as const,
  },
  {
    variant: "pink" as const,
    blob: 2 as const,
    icon: Heart,
    iconColor: "pink" as const,
    badgeVariant: "clay-pink" as const,
  },
];

const specialtyIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "Literasi Awal": BookOpen,
  "STEAM untuk Anak": SparklesIcon,
  "Art Therapy": Palette,
  "Matematika Anak": GraduationCap,
  "Pemecahan Masalah": SparklesIcon,
  "Character Building": Heart,
  "Psikologi Perkembangan": Stethoscope,
  "Inklusi Pendidikan": Award,
  "Emotional Coaching": Heart,
  "Motorik Kasar": Users,
  "Ekspresi Seni": Palette,
  "Musik & Gerak": Music,
  "Pengenalan Bahasa": BookOpen,
  "Sensory Play": Leaf,
  "Early Literacy": GraduationCap,
  "Manajemen Sekolah": Award,
  "Kurikulum PAUD": BookOpen,
  "Parenting Education": Heart,
};

function getTeacherImage(teacher: Teacher, theme: typeof teacherThemes[0]) {
  if (teacher.photo) {
    const imageUrl = urlFor(teacher.photo);
    if (imageUrl) {
      return (
        <Image
          src={imageUrl.width(400).height(400).auto("format").quality(85).url()}
          alt={teacher.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      );
    }
    return (
      <div className="flex items-center justify-center h-full w-full">
        <CardIcon color={theme.iconColor}><theme.icon className="h-10 w-10" aria-hidden="true" /></CardIcon>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center h-full w-full">
      <CardIcon color={theme.iconColor}><theme.icon className="h-10 w-10" aria-hidden="true" /></CardIcon>
    </div>
  );
}

async function TeachersSectionContent() {
  const teachers = (await getTeachers()) as Teacher[] | null;
  const displayTeachers = teachers?.length ? teachers : fallbackTeachers;

  return (
    <section className="relative px-4 py-16 sm:py-20 lg:py-24" aria-labelledby="teachers-title">
      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16" data-sc-in data-sc-cue="0 0.6">
          <span className="inline-flex items-center gap-2 clay-badge clay-lavender px-4 py-1.5 text-sm font-semibold mb-4">
            <SparklesIcon className="h-4 w-4 animate-bounce" aria-hidden="true" />
            Tim Pendidik
          </span>

          <h2 id="teachers-title" className="sc-display sc-display--xl mb-4">
            Tim Pengajar
            <span className="block gradient-text">Berpengalaman & Berdedikasi</span>
          </h2>

          <p className="sc-body text-lg">
            Para pendidik kami bersertifikat, berpengalaman, dan memiliki hati yang peduli untuk mengembangkan potensi setiap anak.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-sc-in data-sc-stagger="100">
          {displayTeachers.map((teacher, index) => {
            const theme = teacherThemes[index % teacherThemes.length];

            return (
              <Card
                key={teacher._id}
                variant={theme.variant}
                blob={theme.blob}
                hoverable
                data-sc-cue={`${0.1 + index * 0.15} ${0.4 + index * 0.15}`}
              >
                <div className="relative mb-5">
                  <div className="aspect-square w-full max-w-xs mx-auto overflow-hidden rounded-[var(--sc-r-xl)] bg-[var(--sc-canvas)] shadow-xl border border-[var(--sc-hairline)]">
                    {getTeacherImage(teacher, theme)}
                  </div>

                  {teacher.socialMedia && (teacher.socialMedia.linkedin || teacher.socialMedia.instagram) && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 flex gap-2">
                      {teacher.socialMedia.linkedin && (
                        <a
                          href={teacher.socialMedia.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group p-3 clay-pill clay-pill-secondary hover:bg-[var(--c-sky)] hover:text-white transition-all duration-300 shadow-xl"
                          aria-label={"LinkedIn " + teacher.name}
                        >
                          <Globe className="h-5 w-5" aria-hidden="true" />
                          <span className="sr-only">LinkedIn</span>
                        </a>
                      )}
                      {teacher.socialMedia.instagram && (
                        <a
                          href={teacher.socialMedia.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group p-3 clay-pill clay-pill-secondary hover:bg-[var(--c-pink)] hover:text-white transition-all duration-300 shadow-xl"
                          aria-label={"Instagram " + teacher.name}
                        >
                          <MessageSquare className="h-5 w-5" aria-hidden="true" />
                          <span className="sr-only">Instagram</span>
                        </a>
                      )}
                    </div>
                  )}

                  <div className="absolute top-3 right-3">
                    <Badge variant="clay-lavender" className="gap-1.5 px-3 py-1.5 text-xs font-bold animate-bounce">
                      <SparklesIcon className="h-3.5 w-3.5" aria-hidden="true" />
                      Halo!
                    </Badge>
                  </div>
                </div>

                <div className="text-center mb-4">
                  <h3 className="sc-display sc-display--md font-bold text-[var(--sc-ink)]">
                    {teacher.name}
                  </h3>
                  <p className="text-sm font-bold mt-1 text-[var(--sc-ink-soft)]">
                    {teacher.role}
                  </p>
                </div>

                <div className="mb-4 flex flex-wrap justify-center gap-1.5">
                  {teacher.specialties.slice(0, 3).map((specialty, i) => {
                    const IconComponent = specialtyIcons[specialty] || SparklesIcon;
                    return (
                      <Badge key={i} variant={theme.badgeVariant} className="gap-1.5 px-3 py-1.5 text-xs font-bold">
                        <IconComponent className="h-3.5 w-3.5" aria-hidden="true" />
                        {specialty}
                      </Badge>
                    );
                  })}
                </div>

                <div className="space-y-2 text-sm text-[var(--sc-ink-soft)] border-t border-[var(--sc-hairline)] pt-4">
                  <div className="flex items-center justify-center gap-2 text-xs">
                    <GraduationCap className="h-4 w-4 text-[var(--sc-ink-soft)]" aria-hidden="true" />
                    <span>{teacher.education[0]}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-xs">
                    <Award className="h-4 w-4 text-[var(--sc-ink-soft)]" aria-hidden="true" />
                    <span>{teacher.experience[0]}</span>
                  </div>
                </div>

                <Button variant="clay-primary" className="w-full gap-2 rounded-full py-3 font-semibold text-lg">
                  <Link href={"/guru/" + teacher.slug.current} className="flex items-center justify-center gap-2 w-full py-2">
                    Lihat Profil
                    <ChevronRight className="h-5 w-5" aria-hidden="true" />
                  </Link>
                </Button>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center" data-sc-in data-sc-cue="0.8 1">
          <Button variant="clay-secondary" size="lg" className="rounded-full px-8 py-3 text-lg font-semibold">
            <Link href="/guru" className="flex items-center justify-center gap-2">
              Kenal Tim Kami
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export function TeachersSection() {
  return <TeachersSectionContent />;
}