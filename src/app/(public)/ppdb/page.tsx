import { PPDBForm } from '@/components/ppdb/PPDBForm'
import { ArrowLeft, Sparkles, Shield, CheckCircle, Mail, Clock, Sparkle, Sparkles as SparklesIcon, Star } from 'lucide-react'
import Link from 'next/link'
import { FloatingOrnaments } from '@/components/ui/FloatingOrnaments'

export default function PPDBPage() {
  return (
    <div className="relative min-h-screen py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-amber-50 via-orange-50 to-pink-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <FloatingOrnaments count={30} variant="section" />
      
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute top-20 left-10 w-[300px] h-[300px] rounded-full bg-gradient-to-br from-emerald-300/40 via-teal-300/30 to-cyan-300/40 blur-3xl animate-float-rotate" />
        <div className="absolute bottom-20 right-10 w-[300px] h-[300px] rounded-full bg-gradient-to-br from-pink-300/40 via-rose-300/30 to-fuchsia-300/40 blur-3xl animate-float-rotate" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-emerald-200/20 to-pink-200/20 blur-3xl animate-pulse-slow" />
        <div className="absolute inset-0 bg-[radial-gradient(#fde047_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-15 animate-shimmer" />
        <div className="absolute inset-0 bg-gradient-to-b from-amber-400/5 via-transparent to-pink-400/5" />
      </div>

      <div className="mx-auto max-w-4xl relative z-10">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/"
            className="group relative inline-flex items-center gap-2 text-sm font-black text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 dark:hover:text-emerald-300 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
            Kembali ke Beranda
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-[28px] bg-gradient-to-br from-emerald-500 to-teal-500 mb-6 shadow-[0_16px_40px_rgba(16,185,129,0.5),_inset_0_2px_0_rgba(255,255,255,0.3)] border-4 border-emerald-200 dark:border-emerald-800">
            <Sparkles className="h-12 w-12 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.2)]" aria-hidden="true" />
            <div className="absolute inset-0 rounded-[28px] bg-gradient-to-b from-white/30 to-transparent" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white mb-4">
            Pendaftaran Siswa Baru
            <span className="block bg-gradient-to-r from-emerald-600 via-teal-600 to-pink-600 bg-clip-text text-transparent">
              (PPDB)
            </span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-medium">
            Isi formulir pendaftaran di bawah ini. Proses pendaftaran terdiri dari 4 langkah mudah:
            Data Orang Tua → Data Anak → Pilih Program → Konfirmasi.
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid gap-4 sm:grid-cols-3 mb-12">
          <div className="relative p-6 rounded-[28px] bg-white/80 dark:bg-slate-800/80 border-4 border-emerald-200 dark:border-emerald-800 backdrop-blur-sm hover:border-emerald-400 dark:hover:border-emerald-600 hover:shadow-[0_20px_40px_rgba(16,185,129,0.3)] hover:-translate-y-1 transition-all duration-500">
            <FloatingOrnaments count={4} variant="card" className="pointer-events-none" />
            <div className="absolute inset-0 rounded-[28px] bg-gradient-to-b from-white/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="flex items-center gap-3 relative z-10">
              <div className="relative flex h-14 w-14 items-center justify-center rounded-[20px] bg-gradient-to-br from-emerald-400 to-teal-400 dark:from-emerald-700 dark:to-teal-700 shadow-[0_8px_24px_rgba(16,185,129,0.5),_inset_0_2px_0_rgba(255,255,255,0.3)]">
                <CheckCircle className="h-7 w-7 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.2)]" aria-hidden="true" />
                <div className="absolute inset-0 rounded-[20px] bg-gradient-to-b from-white/30 to-transparent" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 dark:text-white">Gratis Biaya Daftar</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Tidak ada biaya pendaftaran</p>
              </div>
            </div>
            <Star className="absolute top-3 right-3 h-6 w-6 text-amber-300/90 animate-pulse-glow drop-shadow-[0_0_12px_rgba(251,191,36,0.8)]" aria-hidden="true" />
            <Sparkle className="absolute bottom-3 left-3 h-4 w-4 text-pink-300/80 animate-pulse-glow" aria-hidden="true" />
          </div>

          <div className="relative p-6 rounded-[28px] bg-white/80 dark:bg-slate-800/80 border-4 border-sky-200 dark:border-sky-800 backdrop-blur-sm hover:border-sky-400 dark:hover:border-sky-600 hover:shadow-[0_20px_40px_rgba(14,165,233,0.3)] hover:-translate-y-1 transition-all duration-500">
            <FloatingOrnaments count={4} variant="card" className="pointer-events-none" />
            <div className="absolute inset-0 rounded-[28px] bg-gradient-to-b from-white/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="flex items-center gap-3 relative z-10">
              <div className="relative flex h-14 w-14 items-center justify-center rounded-[20px] bg-gradient-to-br from-sky-400 to-cyan-400 dark:from-sky-700 dark:to-cyan-700 shadow-[0_8px_24px_rgba(14,165,233,0.5),_inset_0_2px_0_rgba(255,255,255,0.3)]">
                <Clock className="h-7 w-7 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.2)]" aria-hidden="true" />
                <div className="absolute inset-0 rounded-[20px] bg-gradient-to-b from-white/30 to-transparent" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 dark:text-white">Proses Cepat</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Verifikasi 1x24 jam</p>
              </div>
            </div>
            <Star className="absolute top-3 right-3 h-6 w-6 text-amber-300/90 animate-pulse-glow drop-shadow-[0_0_12px_rgba(251,191,36,0.8)]" aria-hidden="true" />
            <Sparkle className="absolute bottom-3 left-3 h-4 w-4 text-pink-300/80 animate-pulse-glow" aria-hidden="true" />
          </div>

          <div className="relative p-6 rounded-[28px] bg-white/80 dark:bg-slate-800/80 border-4 border-purple-200 dark:border-purple-800 backdrop-blur-sm hover:border-purple-400 dark:hover:border-purple-600 hover:shadow-[0_20px_40px_rgba(168,85,247,0.3)] hover:-translate-y-1 transition-all duration-500">
            <FloatingOrnaments count={4} variant="card" className="pointer-events-none" />
            <div className="absolute inset-0 rounded-[28px] bg-gradient-to-b from-white/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="flex items-center gap-3 relative z-10">
              <div className="relative flex h-14 w-14 items-center justify-center rounded-[20px] bg-gradient-to-br from-purple-400 to-pink-400 dark:from-purple-700 dark:to-pink-700 shadow-[0_8px_24px_rgba(168,85,247,0.5),_inset_0_2px_0_rgba(255,255,255,0.3)]">
                <Mail className="h-7 w-7 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.2)]" aria-hidden="true" />
                <div className="absolute inset-0 rounded-[20px] bg-gradient-to-b from-white/30 to-transparent" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 dark:text-white">Notifikasi Email</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Konfirmasi otomatis ke email</p>
              </div>
            </div>
            <Star className="absolute top-3 right-3 h-6 w-6 text-amber-300/90 animate-pulse-glow drop-shadow-[0_0_12px_rgba(251,191,36,0.8)]" aria-hidden="true" />
            <Sparkle className="absolute bottom-3 left-3 h-4 w-4 text-pink-300/80 animate-pulse-glow" aria-hidden="true" />
          </div>
        </div>

        {/* Form */}
        <PPDBForm />

        {/* Footer Info */}
        <div className="mt-12 relative rounded-[28px] bg-white/80 dark:bg-slate-800/80 border-4 border-amber-200 dark:border-amber-800 p-6 backdrop-blur-sm">
          <FloatingOrnaments count={5} variant="card" className="pointer-events-none" />
          <div className="absolute inset-0 rounded-[28px] bg-gradient-to-b from-white/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-amber-300/20 via-transparent to-pink-300/20 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <h3 className="relative font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Shield className="h-6 w-6 text-emerald-500 animate-bounce-slow" aria-hidden="true" />
            <Sparkle className="h-4 w-4 text-amber-300 animate-pulse-glow" aria-hidden="true" />
            Informasi Penting
          </h3>
          <ul className="relative space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <li className="relative flex items-start gap-3 p-4 rounded-[16px] bg-slate-50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-700/50 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:border-emerald-200/50 dark:hover:border-emerald-800/50 transition-all duration-300">
              <FloatingOrnaments count={2} variant="card" className="pointer-events-none absolute inset-0" />
              <div className="absolute inset-0 rounded-[16px] bg-gradient-to-b from-white/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <span className="relative flex-shrink-0 mt-1 h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse-glow" />
              <span className="relative">Pastikan nomor WhatsApp aktif dan dapat dihubungi untuk verifikasi</span>
            </li>
            <li className="relative flex items-start gap-3 p-4 rounded-[16px] bg-slate-50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-700/50 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:border-emerald-200/50 dark:hover:border-emerald-800/50 transition-all duration-300">
              <FloatingOrnaments count={2} variant="card" className="pointer-events-none absolute inset-0" />
              <div className="absolute inset-0 rounded-[16px] bg-gradient-to-b from-white/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <span className="relative flex-shrink-0 mt-1 h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse-glow" />
              <span className="relative">Data yang diisi harus benar dan sesuai dengan dokumen asli</span>
            </li>
            <li className="relative flex items-start gap-3 p-4 rounded-[16px] bg-slate-50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-700/50 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:border-emerald-200/50 dark:hover:border-emerald-800/50 transition-all duration-300">
              <FloatingOrnaments count={2} variant="card" className="pointer-events-none absolute inset-0" />
              <div className="absolute inset-0 rounded-[16px] bg-gradient-to-b from-white/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <span className="relative flex-shrink-0 mt-1 h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse-glow" />
              <span className="relative">Nomor registrasi akan dikirim via email setelah pendaftaran berhasil</span>
            </li>
            <li className="relative flex items-start gap-3 p-4 rounded-[16px] bg-slate-50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-700/50 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:border-emerald-200/50 dark:hover:border-emerald-800/50 transition-all duration-300">
              <FloatingOrnaments count={2} variant="card" className="pointer-events-none absolute inset-0" />
              <div className="absolute inset-0 rounded-[16px] bg-gradient-to-b from-white/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <span className="relative flex-shrink-0 mt-1 h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse-glow" />
              <span className="relative">Tim kami akan menghubungi dalam 1x24 jam untuk langkah selanjutnya</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}