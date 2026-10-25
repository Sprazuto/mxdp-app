"use client";

import Image from "next/image";
import Link from "next/link";
import { urlFor, type SanityImage } from "@/lib/sanity";
import { getFacilities } from "@/lib/sanity/queries";
import { Video, Wifi, Shield, ThermometerSun, Music, BookOpen, Zap, CheckCircle2, Sparkles as SparklesIcon } from "lucide-react";
import { motion } from "motion/react";
import { Sparkles } from "@/components/aceternity";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { fadeInUp, staggerContainer, cardVariants, buttonVariants } from "@/lib/motion";

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
    name: "Laboratorium STEAM",
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
    name: "Area Bermain Aman",
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
    name: "Perpustakaan & Reading Corner",
    slug: { current: "perpustakaan" },
    description: [],
    thumbnail: null,
    gallery: [],
    features: ["Koleksi Buku Anak", "Sofa Nyaman", "Reading Nook", "Audio Books"],
    hasCctv: false,
    order: 4,
  },
  {
    _id: "fallback-5",
    name: "Ruang Musik & Gerak",
    slug: { current: "ruang-musik" },
    description: [],
    thumbnail: null,
    gallery: [],
    features: ["Alat Musik", "Sound System", "Cermin Panjang", "Lantai Vinyl"],
    hasCctv: false,
    order: 5,
  },
  {
    _id: "fallback-6",
    name: "Klinik Sekolah & Ruang Istirahat",
    slug: { current: "klinik-sekolah" },
    description: [],
    thumbnail: null,
    gallery: [],
    features: ["Tenaga Medis", "Tempat Tidur", "Obat Pertama", "Kamar Mandi Khusus"],
    hasCctv: false,
    order: 6,
  },
];

const facilityThemes = [
  {
    name: "Sky",
    bg: "bg-gradient-to-br from-sky-50 to-sky-100 dark:from-sky-900/30 dark:to-sky-800/30",
    border: "border-sky-200/60 dark:border-sky-800/60",
    hoverBorder: "hover:border-sky-300 dark:hover:border-sky-700",
    iconBg: "bg-sky-100 dark:bg-sky-900/30",
    iconColor: "text-sky-600 dark:text-sky-400",
    icon: Wifi,
  },
  {
    name: "Violet",
    bg: "bg-gradient-to-br from-violet-50 to-violet-100 dark:from-violet-900/30 dark:to-violet-800/30",
    border: "border-violet-200/60 dark:border-violet-800/60",
    hoverBorder: "hover:border-violet-300 dark:hover:border-violet-700",
    iconBg: "bg-violet-100 dark:bg-violet-900/30",
    iconColor: "text-violet-600 dark:text-violet-400",
    icon: Zap,
  },
  {
    name: "Emerald",
    bg: "bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/30 dark:to-emerald-800/30",
    border: "border-emerald-200/60 dark:border-emerald-800/60",
    hoverBorder: "hover:border-emerald-300 dark:hover:border-emerald-700",
    iconBg: "bg-emerald-100 dark:bg-emerald-900/30",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    icon: Shield,
  },
  {
    name: "Amber",
    bg: "bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/30",
    border: "border-amber-200/60 dark:border-amber-800/60",
    hoverBorder: "hover:border-amber-300 dark:hover:border-amber-700",
    iconBg: "bg-amber-100 dark:bg-amber-900/30",
    iconColor: "text-amber-600 dark:text-amber-400",
    icon: BookOpen,
  },
  {
    name: "Pink",
    bg: "bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/30 dark:to-pink-800/30",
    border: "border-pink-200/60 dark:border-pink-800/60",
    hoverBorder: "hover:border-pink-300 dark:hover:border-pink-700",
    iconBg: "bg-pink-100 dark:bg-pink-900/30",
    iconColor: "text-pink-600 dark:text-pink-400",
    icon: Music,
  },
  {
    name: "Orange",
    bg: "bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30",
    border: "border-orange-200/60 dark:border-orange-800/60",
    hoverBorder: "hover:border-orange-300 dark:hover:border-orange-700",
    iconBg: "bg-orange-100 dark:bg-orange-900/30",
    iconColor: "text-orange-600 dark:text-orange-400",
    icon: ThermometerSun,
  },
];

const safetyFeatures = [
  { icon: Video, label: "CCTV 24/7", desc: "Pengawasan penuh di seluruh area sekolah" },
  { icon: Shield, label: "Aman & Terjaga", desc: "Sistem keamanan pintu masuk & keluar" },
  { icon: CheckCircle2, label: "Standar SNI", desc: "Peralatan bermain berstandar nasional" },
  { icon: ThermometerSun, label: "Kesehatan Terawas", desc: "Pemeriksaan rutin & klinik sekolah" },
];

const safetyThemes = [
  { bg: "bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30", border: "border-red-200/60 dark:border-red-800/60", hoverBorder: "hover:border-red-300 dark:hover:border-red-700", iconBg: "bg-red-100 dark:bg-red-900/30", iconColor: "text-red-600 dark:text-red-400", icon: Video },
  { bg: "bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/30", border: "border-amber-200/60 dark:border-amber-800/60", hoverBorder: "hover:border-amber-300 dark:hover:border-amber-700", iconBg: "bg-amber-100 dark:bg-amber-900/30", iconColor: "text-amber-600 dark:text-amber-400", icon: Shield },
  { bg: "bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/30 dark:to-emerald-800/30", border: "border-emerald-200/60 dark:border-emerald-800/60", hoverBorder: "hover:border-emerald-300 dark:hover:border-emerald-700", iconBg: "bg-emerald-100 dark:bg-emerald-900/30", iconColor: "text-emerald-600 dark:text-emerald-400", icon: CheckCircle2 },
  { bg: "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30", border: "border-blue-200/60 dark:border-blue-800/60", hoverBorder: "hover:border-blue-300 dark:hover:border-blue-700", iconBg: "bg-blue-100 dark:bg-blue-900/30", iconColor: "text-blue-600 dark:text-blue-400", icon: ThermometerSun },
];

async function FacilitiesSectionContent() {
  const facilities = (await getFacilities()) as Facility[] | null;
  const displayFacilities = facilities?.length ? facilities : fallbackFacilities;

  return (
    <>
      <section className="relative px-4 py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-emerald-50 via-white to-pink-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" aria-labelledby="facilities-title">
        <Sparkles count={20} color="multi" size="md" />

        <div className="mx-auto max-w-7xl">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-12"
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            viewport={{ once: true, margin: "50px" }}
          >
            <motion.span
              className="inline-flex items-center gap-2 rounded-full bg-emerald-100/90 px-4 py-1.5 text-sm font-semibold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 backdrop-blur-sm mb-4 border border-emerald-200/50 dark:border-emerald-800/50"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <SparklesIcon className="h-4 w-4 animate-bounce" aria-hidden="true" />
              Fasilitas Lengkap
            </motion.span>

            <motion.h2
              id="facilities-title"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            >
              Fasilitas Pendukung
              <span className="block text-slate-900 dark:text-white bg-gradient-to-r from-sky-600 via-violet-600 to-emerald-600 bg-clip-text text-transparent">
                Pembelajaran Modern
              </span>
            </motion.h2>

            <motion.p
              className="text-lg text-slate-600 dark:text-slate-300 font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
            >
              Lingkungan belajar modern dengan fasilitas standar internasional untuk mendukung perkembangan optimal siswa.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12"
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "50px" }}
          >
            {displayFacilities.map((facility, index) => {
              const theme = facilityThemes[index % facilityThemes.length];
              const IconComponent = theme.icon;

              return (
                <motion.div
                  key={facility._id}
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
                    {facility.thumbnail ? (
                      (() => {
                        const imageUrl = urlFor(facility.thumbnail);
                        return imageUrl ? (
                          <Image
                            src={imageUrl.width(500).height(350).auto("format").quality(80).url()}
                            alt={facility.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full w-full">
                            <IconComponent className="h-14 w-14 text-slate-300 dark:text-slate-600" aria-hidden="true" />
                          </div>
                        );
                      })()
                    ) : (
                      <div className="flex items-center justify-center h-full w-full">
                        <IconComponent className="h-14 w-14 text-slate-300 dark:text-slate-600" aria-hidden="true" />
                      </div>
                    )}
                    <motion.div
                      className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/30 to-transparent pointer-events-none"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    {facility.hasCctv && (
                      <motion.div
                        className="absolute top-3 right-3"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                      >
                        <Badge variant="destructive" className="gap-1.5 px-3 py-1.5 text-xs font-black animate-pulse">
                          <Video className="h-3.5 w-3.5" aria-hidden="true" />
                          LIVE CCTV
                        </Badge>
                      </motion.div>
                    )}
                  </motion.div>

                  <motion.h3
                    className="text-lg font-bold text-slate-900 dark:text-white mb-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                  >
                    {facility.name}
                  </motion.h3>

                  <motion.ul
                    className="space-y-1.5 mb-4"
                    role="list"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  >
                    {facility.features.slice(0, 4).map((feature, i) => (
                      <motion.li
                        key={i}
                        className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.3 + i * 0.08 }}
                      >
                        <motion.span
                          className="h-4.5 w-4.5 text-emerald-500 flex-shrink-0"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                          aria-hidden="true"
                        >
                          <CheckCircle2 className="h-4.5 w-4.5" />
                        </motion.span>
                        {feature}
                      </motion.li>
                    ))}
                  </motion.ul>

                  {facility.gallery.length > 0 && (
                    <motion.div
                      className="flex gap-2 overflow-x-auto pb-2 -mx-6 px-6"
                      role="list"
                      aria-label={`Galeri ${facility.name}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.5 }}
                    >
                      {facility.gallery.slice(0, 4).map((img, i) => {
                        const galleryUrl = urlFor(img);
                        return galleryUrl ? (
                          <motion.li
                            key={i}
                            className="flex-shrink-0"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                          >
                            <Image
                              src={galleryUrl.width(120).height(90).auto("format").quality(80).url()}
                              alt={`${facility.name} - Foto ${i + 1}`}
                              width={120}
                              height={90}
                              className="rounded-xl object-cover border border-slate-200/50 dark:border-slate-700/50"
                            />
                          </motion.li>
                        ) : null;
                      })}
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true, margin: "50px" }}
          >
            <Button variant="outline" size="lg" className="rounded-full border-2 border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-900/20 px-8 py-3 text-lg font-semibold text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 hover:border-emerald-400">
              <Link href="/fasilitas" className="flex items-center justify-center gap-2">
                Lihat Semua Fasilitas
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="relative px-4 py-16 sm:py-20 lg:py-24 bg-slate-900 dark:bg-slate-950" aria-labelledby="safety-title">
        <Sparkles count={15} color="amber" size="md" />

        <div className="mx-auto max-w-7xl">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-12"
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            viewport={{ once: true, margin: "50px" }}
          >
            <motion.span
              className="inline-flex items-center gap-2 rounded-full bg-red-500/20 px-4 py-1.5 text-sm font-semibold text-red-400 dark:bg-red-900/40 dark:text-red-300 backdrop-blur-sm mb-4 border border-red-500/30"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <Video className="h-4 w-4 animate-pulse" aria-hidden="true" />
              Keamanan & Kesejahteraan
            </motion.span>

            <motion.h2
              id="safety-title"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            >
              Sistem Keamanan & Keselamatan
              <span className="block text-white bg-gradient-to-r from-red-400 via-amber-400 to-emerald-400 bg-clip-text text-transparent">
                Terintegrasi
              </span>
            </motion.h2>

            <motion.p
              className="text-lg text-slate-300 font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
            >
              Komitmen kami untuk menyediakan lingkungan yang aman, nyaman, dan sehat bagi setiap siswa.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "50px" }}
          >
            {safetyFeatures.map((feature, index) => {
              const theme = safetyThemes[index % safetyThemes.length];
              const IconComponent = feature.icon;

              return (
                <motion.div
                  key={feature.label}
                  variants={cardVariants}
                  className={`group relative rounded-2xl ${theme.bg} ${theme.border} ${theme.hoverBorder}`}
                >
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-500/5 to-emerald-500/5"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />

                  <motion.div
                    className={`mb-5 flex h-14 w-14 items-center justify-center rounded-xl ${theme.iconBg} shadow-lg shadow-emerald-500/20`}
                    whileHover={{ scale: 1.1, rotate: 3 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  >
                    <IconComponent className={`h-7 w-7 ${theme.iconColor}`} aria-hidden="true" />
                  </motion.div>

                  <motion.h3
                    className="text-lg font-bold text-white mb-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                  >
                    {feature.label}
                  </motion.h3>

                  <motion.p
                    className="text-slate-300 text-sm leading-relaxed"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  >
                    {feature.desc}
                  </motion.p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </>
  );
}

export function FacilitiesSection() {
  return <FacilitiesSectionContent />;
}