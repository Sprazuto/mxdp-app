"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { BackgroundBeams, Sparkles } from "@/components/aceternity";
import { cn } from "@/lib/utils";
import { ArrowRight, Users, Award, CheckCircle, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeInUp, staggerContainer, cardVariants, getMotionProps, useReducedMotion } from "@/lib/motion";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  primaryCtaText?: string;
  primaryCtaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  stats?: Array<{ label: string; value: string; icon: React.ComponentType<{ className?: string }> }>;
}

export function HeroSection({
  title = "Pendidikan Berkualitas untuk Masa Depan Cerah",
  subtitle = "MXDP menyediakan program pendidikan terbaik dengan guru berpengalaman, fasilitas lengkap, dan lingkungan belajar yang aman serta menyenangkan untuk anak-anak Indonesia.",
  primaryCtaText = "Daftar Sekarang",
  primaryCtaHref = "/ppdb",
  secondaryCtaText = "Jelajahi Program",
  secondaryCtaHref = "/program",
  stats = [
    { label: "Siswa Aktif", value: "2.500+", icon: Users },
    { label: "Guru Berpengalaman", value: "150+", icon: Award },
    { label: "Program Unggulan", value: "25+", icon: CheckCircle },
    { label: "Lingkungan Aman", value: "100%", icon: Shield },
  ],
}: HeroSectionProps = {}) {
  const reducedMotion = useReducedMotion();
  const motionProps = getMotionProps(reducedMotion);
  const viewportOnce = { once: true, margin: "50px" };

  return (
    <section
      className={cn(
        "relative overflow-hidden px-4 py-16 sm:py-20 lg:py-28 xl:py-32 pt-20",
        "bg-gradient-to-b from-emerald-50 via-white to-amber-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"
      )}
      aria-labelledby="hero-title"
    >
      <BackgroundBeams />
      <Sparkles count={15} color="multi" size="md" />

      <div className="mx-auto max-w-7xl">
        {/* Header section - parent controls children via variants */}
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
            <span className="relative flex h-1.5 w-1.5">
              <motion.span
                className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
                animate={{ scale: [1, 1.5, 1], opacity: [0.75, 0, 0.75] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
            </span>
            Pendaftaran Tahun Ajaran Baru Dibuka
          </motion.span>

          <motion.h1
            id="hero-title"
            className={cn(
              "text-3xl sm:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold tracking-tight leading-[1.1]",
              "text-slate-900 dark:text-white",
              "bg-gradient-to-r from-slate-900 via-emerald-600 to-amber-600",
              "bg-clip-text text-transparent dark:from-white dark:via-emerald-400 dark:to-amber-400",
              "mb-4"
            )}
            variants={fadeInUp}
          >
            {title}
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium"
            variants={fadeInUp}
          >
            {subtitle}
          </motion.p>
        </motion.div>

        {/* CTA Buttons - stagger container */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12"
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.button
            className="w-full sm:w-auto gap-2 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 active:scale-[0.98] transition-all duration-200 px-8 py-4 text-white font-semibold text-lg"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.97, y: 0.5 }}
          >
            <Link href={primaryCtaHref} className="flex items-center gap-2">
              {primaryCtaText}
              <motion.svg
                className="ml-2 h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                initial={{ x: 0 }}
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </motion.svg>
            </Link>
          </motion.button>

          <motion.button
            className="w-full sm:w-auto gap-2 rounded-full border-2 border-emerald-300 dark:border-emerald-700 bg-white/90 dark:bg-slate-800/90 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:border-emerald-400 px-8 py-4 font-semibold text-lg"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.97, y: 0.5 }}
          >
            <Link href={secondaryCtaHref} className="flex items-center gap-2">
              {secondaryCtaText}
              <motion.svg
                className="ml-2 h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                initial={{ x: 0 }}
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </motion.svg>
            </Link>
          </motion.button>
        </motion.div>

        {/* Stats Grid - stagger container */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto"
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={cardVariants}
              className="relative p-5 rounded-2xl group"
              style={{ transform: index % 2 === 0 ? "rotate(-1deg)" : "rotate(1deg)" }}
              whileHover={{ y: -4, boxShadow: "var(--shadow-xl)" }}
              whileTap={{ y: -2, scale: 0.99 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-amber-500/5 rounded-2xl"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="relative flex items-center gap-3"
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                <motion.div
                  className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-100 to-amber-100 dark:from-emerald-900/30 dark:to-amber-900/30 border border-emerald-200/50 dark:border-emerald-800/50 shadow-lg shadow-emerald-200/50"
                  whileHover={{ scale: 1.1, rotate: 3 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                  <stat.icon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                </motion.div>
                <div className="text-left">
                  <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white leading-tight">
                    {stat.value}
                  </div>
                  <div className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}