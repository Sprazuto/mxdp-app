"use client";

import Link from "next/link";
import Image from "next/image";
import { urlFor, type SanityImage } from "@/lib/sanity";
import { getPrograms } from "@/lib/sanity/queries";
import { ChevronRight, Users, Clock, Award, Shield, Sparkles as SparklesIcon } from "lucide-react";
import { motion } from "motion/react";
import { Sparkles } from "@/components/aceternity";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { fadeInUp, staggerContainer, cardVariants, buttonVariants } from "@/lib/motion";

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
    features: ["Pengenalan Bahasa", "Motorik Halus & Kasar", "Sosialisasi Awal", "Music & Movement"],
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
    features: ["Phonics Awareness", "Pre-Math Concepts", "Art & Craft", "Outdoor Exploration"],
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
    features: ["Reading Readiness", "Number Sense", "Character Building", "STEAM Introduction"],
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
    features: ["Advanced Literacy", "Math Mastery", "Leadership Skills", "Primary School Transition"],
    isActive: true,
    order: 4,
  },
];

const programThemes = [
  {
    id: "toddler",
    name: "Emerald",
    bg: "bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/30 dark:to-emerald-800/30",
    border: "border-emerald-200/60 dark:border-emerald-800/60",
    hoverBorder: "hover:border-emerald-300 dark:hover:border-emerald-700",
    iconBg: "bg-emerald-100 dark:bg-emerald-900/30",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    badgeBg: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
    badgeBorder: "border-emerald-200/50 dark:border-emerald-800/50",
    btnVariant: "default" as const,
    icon: Users,
  },
  {
    id: "playgroup",
    name: "Pink",
    bg: "bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/30 dark:to-pink-800/30",
    border: "border-pink-200/60 dark:border-pink-800/60",
    hoverBorder: "hover:border-pink-300 dark:hover:border-pink-700",
    iconBg: "bg-pink-100 dark:bg-pink-900/30",
    iconColor: "text-pink-600 dark:text-pink-400",
    badgeBg: "bg-pink-100 text-pink-800 dark:bg-pink-900/40 dark:text-pink-300",
    badgeBorder: "border-pink-200/50 dark:border-pink-800/50",
    btnVariant: "default" as const,
    icon: SparklesIcon,
  },
  {
    id: "tk-a",
    name: "Amber",
    bg: "bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/30",
    border: "border-amber-200/60 dark:border-amber-800/60",
    hoverBorder: "hover:border-amber-300 dark:hover:border-amber-700",
    iconBg: "bg-amber-100 dark:bg-amber-900/30",
    iconColor: "text-amber-600 dark:text-amber-400",
    badgeBg: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
    badgeBorder: "border-amber-200/50 dark:border-amber-800/50",
    btnVariant: "default" as const,
    icon: Award,
  },
  {
    id: "tk-b",
    name: "Violet",
    bg: "bg-gradient-to-br from-violet-50 to-violet-100 dark:from-violet-900/30 dark:to-violet-800/30",
    border: "border-violet-200/60 dark:border-violet-800/60",
    hoverBorder: "hover:border-violet-300 dark:hover:border-violet-700",
    iconBg: "bg-violet-100 dark:bg-violet-900/30",
    iconColor: "text-violet-600 dark:text-violet-400",
    badgeBg: "bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-300",
    badgeBorder: "border-violet-200/50 dark:border-violet-800/50",
    btnVariant: "default" as const,
    icon: Shield,
  },
];

const viewportOnce = { once: true, margin: "50px" };

async function ProgramsSectionContent() {
  const programs = (await getPrograms()) as Program[] | null;
  const displayPrograms = programs?.length ? programs : fallbackPrograms;

  return (
    <section className="relative px-4 py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-emerald-50 via-white to-pink-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" aria-labelledby="programs-title">
      <Sparkles count={20} color="multi" size="md" />

      <div className="mx-auto max-w-7xl">
        {/* Header - parent controls children via variants */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12"
          variants={staggerContainer(0.1, 100)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.span
            className="inline-flex items-center gap-2 rounded-full bg-emerald-100/90 px-4 py-1.5 text-sm font-semibold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 backdrop-blur-sm mb-4 border border-emerald-200/50 dark:border-emerald-800/50"
            variants={fadeInUp}
            style={{ transformOrigin: "center" }}
          >
            <SparklesIcon className="h-4 w-4 animate-bounce" aria-hidden="true" />
            Program Unggulan
          </motion.span>

          <motion.h2
            id="programs-title"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4"
            variants={fadeInUp}
          >
            Program Pendidikan
            <span className="block text-slate-900 dark:text-white bg-gradient-to-r from-emerald-600 via-pink-600 to-violet-600 bg-clip-text text-transparent">
              Terpadu & Holistik
            </span>
          </motion.h2>

          <motion.p
            className="text-lg text-slate-600 dark:text-slate-300 font-medium"
            variants={fadeInUp}
          >
            Kurikulum holistik yang dirancang untuk setiap tahap perkembangan anak, dari Toddler hingga persiapan SD.
          </motion.p>
        </motion.div>

        {/* Programs Grid - stagger container */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {displayPrograms.map((program, index) => {
            const theme = programThemes[index % programThemes.length];
            const IconComponent = theme.icon;

            return (
              <motion.div
                key={program._id}
                variants={cardVariants}
                className={`group relative rounded-2xl ${theme.bg} ${theme.border} ${theme.hoverBorder}`}
              >
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/5 to-pink-500/5"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />

                <motion.div
                  className="relative mb-4 aspect-video overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700/50"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
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
                          <IconComponent className="h-16 w-16 text-slate-300 dark:text-slate-600" aria-hidden="true" />
                        </div>
                      );
                    })()
                  ) : (
                    <div className="flex items-center justify-center h-full w-full">
                      <IconComponent className="h-16 w-16 text-slate-300 dark:text-slate-600" aria-hidden="true" />
                    </div>
                  )}
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/30 to-transparent pointer-events-none"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>

                <div className="relative flex items-center justify-between mb-3">
                  <Badge variant="secondary" className={`${theme.iconBg} ${theme.iconColor} border-0 px-3 py-1 text-xs font-semibold`}>
                    <Users className="h-3 w-3 mr-1" aria-hidden="true" />
                    {program.ageGroup}
                  </Badge>
                  <Badge variant="secondary" className="bg-white/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border border-slate-200/50 dark:border-slate-700/50 px-3 py-1 text-xs font-medium">
                    <Clock className="h-3 w-3 mr-1" aria-hidden="true" />
                    {program.duration}
                  </Badge>
                </div>

                <motion.h3
                  className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2"
                  whileHover={{ color: "rgb(16, 185, 129)" }}
                  transition={{ duration: 0.2 }}
                >
                  {program.title}
                </motion.h3>

                <motion.p
                  className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-2"
                  variants={fadeInUp}
                >
                  {program.shortDescription}
                </motion.p>

                <motion.ul
                  className="mb-6 space-y-2"
                  role="list"
                  variants={staggerContainer(0.08)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                >
                  {program.features.slice(0, 4).map((feature, i) => (
                    <motion.li
                      key={i}
                      variants={fadeInUp}
                      className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300"
                    >
                      <motion.span
                        className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500 flex-shrink-0"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                        aria-hidden="true"
                      />
                      {feature}
                    </motion.li>
                  ))}
                </motion.ul>

                <motion.button
                  variants={buttonVariants}
                  className="w-full gap-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-300 focus:ring-offset-2"
                >
                  <Link href={`/program/${program.slug.current}`} className="flex items-center justify-center gap-2 w-full py-2">
                    Lihat Detail
                    <motion.span
                      className="h-5 w-5"
                      initial={{ x: 0 }}
                      whileHover={{ x: 4 }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    >
                      <ChevronRight className="h-5 w-5" aria-hidden="true" />
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
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Button variant="outline" size="lg" className="rounded-full border-2 border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-900/20 px-8 py-3 text-lg font-semibold text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 hover:border-emerald-400">
            <Link href="/program" className="flex items-center justify-center gap-2">
              Lihat Semua Program
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

export function ProgramsSection() {
  return <ProgramsSectionContent />;
}