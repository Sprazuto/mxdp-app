"use client";

import { HeroSection } from "@/components/HeroSection";
import { ProgramsSection } from "@/components/sections/ProgramsSection";
import { FacilitiesSection } from "@/components/sections/FacilitiesSection";
import { TeachersSection } from "@/components/sections/TeachersSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ArrowRight, Sparkles, Shield } from "lucide-react";
import { motion } from "motion/react";
import { Sparkles as SparklesAnim } from "@/components/aceternity";
import { fadeInUp } from "@/lib/motion";
import Link from "next/link";

export default async function Home() {
  return (
    <>
      <HeroSection />
      <ProgramsSection />
      <FacilitiesSection />
      <TeachersSection />
      <ContactSection />
      <section
        className="relative px-4 py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-emerald-50 via-white to-amber-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"
        aria-labelledby="cta-title"
      >
        <SparklesAnim count={15} color="multi" size="sm" />

        <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
          <div className="absolute top-20 left-10 w-[300px] h-[300px] rounded-full bg-emerald-200/40 blur-3xl dark:bg-emerald-900/20" />
          <div className="absolute bottom-20 right-10 w-[300px] h-[300px] rounded-full bg-pink-200/40 blur-3xl dark:bg-pink-900/20" />
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-10" />
        </div>

        <div className="mx-auto max-w-7xl relative z-10 text-center">
          <motion.span
            className="inline-flex items-center gap-2 rounded-full bg-amber-100/90 px-5 py-2 text-sm font-black text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 backdrop-blur-sm mb-4 border-2 border-amber-200 dark:border-amber-800 shadow-lg shadow-amber-200/50 rotate-[-2deg]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Sparkles className="h-4 w-4 animate-bounce" />
            Siap Mulai?
          </motion.span>

          <motion.h2
            id="cta-title"
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          >
            Siap Memulai Perjalanan
            <span className="block text-slate-900 dark:text-white bg-gradient-to-r from-emerald-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
              Pendidikan Anak Anda?
            </span>
          </motion.h2>

          <motion.p
            className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8 font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
          >
            Bergabunglah dengan ribuan orang tua yang telah mempercayakan pendidikan anak mereka di MXDP.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link
              href="/ppdb"
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-emerald-950 font-black px-10 py-5 text-lg border-b-4 border-teal-600 shadow-[0_12px_24px_-6px_rgba(16,185,129,0.5)] hover:shadow-[0_16px_32px_-8px_rgba(16,185,129,0.6)] hover:from-emerald-400 hover:to-teal-400 active:translate-y-1 active:border-b-0 active:shadow-[0_4px_8px_-2px_rgba(16,185,129,0.4)] transition-all duration-150 focus:outline-none focus:ring-4 focus:ring-emerald-300 focus:ring-offset-2"
            >
              Daftar PPDB Sekarang
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
            <Link
              href="/kontak"
              className="inline-flex items-center justify-center gap-2 rounded-full border-4 border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-900/20 px-10 py-5 text-lg font-black text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 hover:border-emerald-400 dark:hover:border-emerald-600 hover:shadow-xl hover:shadow-emerald-200/30 hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-300 focus:ring-offset-2"
            >
              Hubungi Kami
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
          </motion.div>

          <motion.div
            className="mt-8 flex items-center justify-center gap-4 text-sm text-slate-500 dark:text-slate-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <span className="flex items-center gap-1">
              <Shield className="h-4 w-4 text-emerald-500" aria-hidden="true" />
              Aman & Terpercaya
            </span>
            <span className="flex items-center gap-1">
              <Sparkles className="h-4 w-4 text-pink-500" aria-hidden="true" />
              Gratis Konsultasi
            </span>
            <span className="flex items-center gap-1">
              <ArrowRight className="h-4 w-4 text-amber-500" aria-hidden="true" />
              Proses Cepat
            </span>
          </motion.div>
        </div>
      </section>
    </>
  );
}