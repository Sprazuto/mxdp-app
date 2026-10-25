"use client";

import Image from "next/image";
import Link from "next/link";
import { urlFor, type SanityImage } from "@/lib/sanity";
import { getTeachers } from "@/lib/sanity/queries";
import { GraduationCap, Award, Heart, Users, Sparkles as SparklesIcon, BookOpen, MessageSquare, Globe, Shield, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { Sparkles } from "@/components/aceternity";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { fadeInUp, staggerContainer, cardVariants, buttonVariants } from "@/lib/motion";

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
    name: "Teal",
    bg: "bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/30 dark:to-teal-800/30",
    border: "border-teal-200/60 dark:border-teal-800/60",
    hoverBorder: "hover:border-teal-300 dark:hover:border-teal-700",
    iconBg: "bg-teal-100 dark:bg-teal-900/30",
    iconColor: "text-teal-600 dark:text-teal-400",
    badgeBg: "bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300",
    badgeBorder: "border-teal-200/50 dark:border-teal-800/50",
    icon: Users,
  },
  {
    name: "Emerald",
    bg: "bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/30 dark:to-emerald-800/30",
    border: "border-emerald-200/60 dark:border-emerald-800/60",
    hoverBorder: "hover:border-emerald-300 dark:hover:border-emerald-700",
    iconBg: "bg-emerald-100 dark:bg-emerald-900/30",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    badgeBg: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
    badgeBorder: "border-emerald-200/50 dark:border-emerald-800/50",
    icon: SparklesIcon,
  },
  {
    name: "Sky",
    bg: "bg-gradient-to-br from-sky-50 to-sky-100 dark:from-sky-900/30 dark:to-sky-800/30",
    border: "border-sky-200/60 dark:border-sky-800/60",
    hoverBorder: "hover:border-sky-300 dark:hover:border-sky-700",
    iconBg: "bg-sky-100 dark:bg-sky-900/30",
    iconColor: "text-sky-600 dark:text-sky-400",
    badgeBg: "bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300",
    badgeBorder: "border-sky-200/50 dark:border-sky-800/50",
    icon: Shield,
  },
  {
    name: "Violet",
    bg: "bg-gradient-to-br from-violet-50 to-violet-100 dark:from-violet-900/30 dark:to-violet-800/30",
    border: "border-violet-200/60 dark:border-violet-800/60",
    hoverBorder: "hover:border-violet-300 dark:hover:border-violet-700",
    iconBg: "bg-violet-100 dark:bg-violet-900/30",
    iconColor: "text-violet-600 dark:text-violet-400",
    badgeBg: "bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-300",
    badgeBorder: "border-violet-200/50 dark:border-violet-800/50",
    icon: Award,
  },
  {
    name: "Amber",
    bg: "bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/30",
    border: "border-amber-200/60 dark:border-amber-800/60",
    hoverBorder: "hover:border-amber-300 dark:hover:border-amber-700",
    iconBg: "bg-amber-100 dark:bg-amber-900/30",
    iconColor: "text-amber-600 dark:text-amber-400",
    badgeBg: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
    badgeBorder: "border-amber-200/50 dark:border-amber-800/50",
    icon: Heart,
  },
  {
    name: "Pink",
    bg: "bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/30 dark:to-pink-800/30",
    border: "border-pink-200/60 dark:border-pink-800/60",
    hoverBorder: "hover:border-pink-300 dark:hover:border-pink-700",
    iconBg: "bg-pink-100 dark:bg-pink-900/30",
    iconColor: "text-pink-600 dark:text-pink-400",
    badgeBg: "bg-pink-100 text-pink-800 dark:bg-pink-900/40 dark:text-pink-300",
    badgeBorder: "border-pink-200/50 dark:border-pink-800/50",
    icon: Heart,
  },
];

const specialtyIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "Literasi Awal": BookOpen,
  "STEAM untuk Anak": SparklesIcon,
  "Art Therapy": Heart,
  "Matematika Anak": GraduationCap,
  "Pemecahan Masalah": SparklesIcon,
  "Character Building": Heart,
  "Psikologi Perkembangan": Users,
  "Inklusi Pendidikan": Award,
  "Emotional Coaching": Heart,
  "Motorik Kasar": Users,
  "Ekspresi Seni": SparklesIcon,
  "Musik & Gerak": Heart,
  "Pengenalan Bahasa": BookOpen,
  "Sensory Play": SparklesIcon,
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
        <div className={cn("h-28 w-28 rounded-full", theme.iconBg, "flex items-center justify-center border-4 border-white/50 dark:border-slate-700/50")}>
          <Users className={cn("h-14 w-14", theme.iconColor)} aria-hidden="true" />
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className={cn("h-28 w-28 rounded-full", theme.iconBg, "flex items-center justify-center border-4 border-white/50 dark:border-slate-700/50")}>
        <Users className={cn("h-14 w-14", theme.iconColor)} aria-hidden="true" />
      </div>
    </div>
  );
}

async function TeachersSectionContent() {
  const teachers = (await getTeachers()) as Teacher[] | null;
  const displayTeachers = teachers?.length ? teachers : fallbackTeachers;

  return (
    <section className="relative px-4 py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-emerald-50 via-white to-pink-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" aria-labelledby="teachers-title">
      <Sparkles count={20} color="multi" size="md" />

      <div className="mx-auto max-w-7xl">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12"
          initial={fadeInUp.initial}
          animate={fadeInUp.animate}
          viewport={{ once: true, margin: "50px" }}
        >
          <motion.span
            className="inline-flex items-center gap-2 rounded-full bg-violet-100/90 px-4 py-1.5 text-sm font-semibold text-violet-800 dark:bg-violet-900/40 dark:text-violet-300 backdrop-blur-sm mb-4 border border-violet-200/50 dark:border-violet-800/50"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <SparklesIcon className="h-4 w-4 animate-bounce" aria-hidden="true" />
            Tim Pendidik
          </motion.span>

          <motion.h2
            id="teachers-title"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          >
            Tim Pengajar
            <span className="block text-slate-900 dark:text-white bg-gradient-to-r from-violet-600 via-pink-600 to-teal-600 bg-clip-text text-transparent">
              Berpengalaman & Berdedikasi
            </span>
          </motion.h2>

          <motion.p
            className="text-lg text-slate-600 dark:text-slate-300 font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
          >
            Para pendidik kami bersertifikat, berpengalaman, dan memiliki hati yang peduli untuk mengembangkan potensi setiap anak.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "50px" }}
        >
          {displayTeachers.map((teacher, index) => {
            const theme = teacherThemes[index % teacherThemes.length];

            return (
              <motion.div
                key={teacher._id}
                variants={cardVariants}
                className={cn(theme.bg, theme.border, theme.hoverBorder, "relative")}
              >
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/5 to-pink-500/5"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />

                <motion.div
                  className="relative mb-5"
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                  <motion.div
                    className="aspect-square w-full max-w-xs mx-auto overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700/50 shadow-xl"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  >
                    {getTeacherImage(teacher, theme)}
                  </motion.div>

                  {teacher.socialMedia && (teacher.socialMedia.linkedin || teacher.socialMedia.instagram) && (
                    <motion.div
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 flex gap-2"
                      initial={{ opacity: 0, y: 10 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {teacher.socialMedia.linkedin && (
                        <motion.a
                          href={teacher.socialMedia.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group p-3 rounded-full bg-white/95 dark:bg-slate-800/95 text-sky-600 dark:text-sky-400 hover:bg-sky-500 hover:text-white transition-all duration-300 shadow-xl shadow-sky-500/30"
                          aria-label={"LinkedIn " + teacher.name}
                          whileHover={{ scale: 1.1, rotate: 12 }}
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        >
                          <Globe className="h-5 w-5" aria-hidden="true" />
                          <span className="sr-only">LinkedIn</span>
                        </motion.a>
                      )}
                      {teacher.socialMedia.instagram && (
                        <motion.a
                          href={teacher.socialMedia.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group p-3 rounded-full bg-white/95 dark:bg-slate-800/95 text-pink-600 dark:text-pink-400 hover:bg-pink-500 hover:text-white transition-all duration-300 shadow-xl shadow-pink-500/30"
                          aria-label={"Instagram " + teacher.name}
                          whileHover={{ scale: 1.1, rotate: 12 }}
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        >
                          <MessageSquare className="h-5 w-5" aria-hidden="true" />
                          <span className="sr-only">Instagram</span>
                        </motion.a>
                      )}
                    </motion.div>
                  )}

                  <motion.div
                    className="absolute top-3 right-3"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, type: "spring", stiffness: 400, damping: 30 }}
                  >
                    <Badge variant="secondary" className="bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300 border border-teal-200/50 dark:border-teal-800/50 text-sm font-bold">
                      Halo! Mari Belajar Bersama
                    </Badge>
                  </motion.div>
                </motion.div>

                <motion.div
                  className="text-center mb-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {teacher.name}
                  </h3>
                  <p className="text-sm font-bold mt-1 text-teal-600 dark:text-teal-400">
                    {teacher.role}
                  </p>
                </motion.div>

                <motion.div
                  className="mb-4 flex flex-wrap justify-center gap-1.5"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  {teacher.specialties.slice(0, 3).map((specialty, i) => {
                    const IconComponent = specialtyIcons[specialty] || SparklesIcon;
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.3 + i * 0.1, type: "spring", stiffness: 400, damping: 30 }}
                      >
                        <Badge variant="secondary" className="bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300 border border-teal-200/50 dark:border-teal-800/50 gap-1.5 px-3 py-1.5 text-xs font-bold">
                          <IconComponent className="h-3.5 w-3.5" aria-hidden="true" />
                          {specialty}
                        </Badge>
                      </motion.div>
                    );
                  })}
                </motion.div>

                <motion.div
                  className="space-y-2 text-sm text-slate-600 dark:text-slate-400 border-t border-slate-200/50 dark:border-slate-700/50 pt-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                >
                  <div className="flex items-center justify-center gap-2 text-xs">
                    <GraduationCap className="h-4 w-4 text-slate-400" aria-hidden="true" />
                    <span>{teacher.education[0]}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-xs">
                    <Award className="h-4 w-4 text-slate-400" aria-hidden="true" />
                    <span>{teacher.experience[0]}</span>
                  </div>
                </motion.div>

                <motion.button
                  variants={buttonVariants}
                  className="w-full gap-2 rounded-full border-2 border-violet-300 dark:border-violet-700 bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-violet-300 focus:ring-offset-2"
                >
                  <Link href={"/guru/" + teacher.slug.current} className="flex items-center justify-center gap-2 w-full py-2">
                    Lihat Profil
                    <motion.span
                      className="h-4 w-4"
                      initial={{ x: 0 }}
                      whileHover={{ x: 4 }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    >
                      <ChevronRight className="h-4 w-4" aria-hidden="true" />
                    </motion.span>
                  </Link>
                </motion.button>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true, margin: "50px" }}
        >
          <Button variant="outline" size="lg" className="rounded-full border-2 border-violet-300 dark:border-violet-700 bg-violet-50 dark:bg-violet-900/20 px-8 py-3 text-lg font-semibold text-violet-700 dark:text-violet-300 hover:bg-violet-100 dark:hover:bg-violet-900/30 hover:border-violet-400">
            <Link href="/guru" className="flex items-center justify-center gap-2">
              Kenal Tim Kami
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

export function TeachersSection() {
  return <TeachersSectionContent />;
}