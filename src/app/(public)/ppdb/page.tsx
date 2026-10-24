import { PPDBForm } from '@/components/ppdb/PPDBForm'
import { ArrowLeft, Sparkles, Shield, CheckCircle, Mail, Clock, Sparkle } from 'lucide-react'
import Link from 'next/link'
import { FloatingOrnaments } from '@/components/ui/FloatingOrnaments'

export default function PPDBPage() {
  return (
    <div className="relative min-h-screen py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FFFDF9] via-[#FFF8F0] to-[#F0F9FF] dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <FloatingOrnaments count={20} variant="section" />
      
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-emerald-200/40 blur-3xl dark:bg-emerald-900/20" />
        <div className="absolute bottom-20 right-10 w-72 h-72 rounded-full bg-pink-200/40 blur-3xl dark:bg-pink-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-10" />
      </div>

      <div className="mx-auto max-w-4xl relative z-10">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-black text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            Kembali ke Beranda
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-[24px] bg-gradient-to-br from-emerald-500 to-teal-500 mb-6 shadow-xl shadow-emerald-200/50 border-4 border-emerald-200 dark:border-emerald-800">
            <Sparkles className="h-10 w-10 text-white" aria-hidden="true" />
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
          <div className="relative p-6 rounded-[24px] bg-white/80 dark:bg-slate-800/80 border-4 border-emerald-200 dark:border-emerald-800 backdrop-blur-sm hover:border-emerald-400 dark:hover:border-emerald-600 hover:shadow-xl hover:shadow-emerald-200/30 hover:-translate-y-1 transition-all duration-300">
            <FloatingOrnaments count={3} variant="card" className="pointer-events-none" />
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-[16px] bg-emerald-100 dark:bg-emerald-900/30 shadow-lg shadow-emerald-200/50">
                <CheckCircle className="h-6 w-6 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 dark:text-white">Gratis Biaya Daftar</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Tidak ada biaya pendaftaran</p>
              </div>
            </div>
            <Sparkle className="absolute top-3 right-3 h-5 w-5 text-amber-400 animate-bounce" aria-hidden="true" />
          </div>

          <div className="relative p-6 rounded-[24px] bg-white/80 dark:bg-slate-800/80 border-4 border-sky-200 dark:border-sky-800 backdrop-blur-sm hover:border-sky-400 dark:hover:border-sky-600 hover:shadow-xl hover:shadow-sky-200/30 hover:-translate-y-1 transition-all duration-300">
            <FloatingOrnaments count={3} variant="card" className="pointer-events-none" />
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-[16px] bg-sky-100 dark:bg-sky-900/30 shadow-lg shadow-sky-200/50">
                <Clock className="h-6 w-6 text-sky-600 dark:text-sky-400" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 dark:text-white">Proses Cepat</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Verifikasi 1x24 jam</p>
              </div>
            </div>
            <Sparkle className="absolute top-3 right-3 h-5 w-5 text-amber-400 animate-bounce" aria-hidden="true" />
          </div>

          <div className="relative p-6 rounded-[24px] bg-white/80 dark:bg-slate-800/80 border-4 border-purple-200 dark:border-purple-800 backdrop-blur-sm hover:border-purple-400 dark:hover:border-purple-600 hover:shadow-xl hover:shadow-purple-200/30 hover:-translate-y-1 transition-all duration-300">
            <FloatingOrnaments count={3} variant="card" className="pointer-events-none" />
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-[16px] bg-purple-100 dark:bg-purple-900/30 shadow-lg shadow-purple-200/50">
                <Mail className="h-6 w-6 text-purple-600 dark:text-purple-400" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 dark:text-white">Notifikasi Email</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Konfirmasi otomatis ke email</p>
              </div>
            </div>
            <Sparkle className="absolute top-3 right-3 h-5 w-5 text-amber-400 animate-bounce" aria-hidden="true" />
          </div>
        </div>

        {/* Form */}
        <PPDBForm />

        {/* Footer Info */}
        <div className="mt-12 relative rounded-[24px] bg-white/80 dark:bg-slate-800/80 border-4 border-amber-200 dark:border-amber-800 p-6 backdrop-blur-sm">
          <FloatingOrnaments count={4} variant="card" className="pointer-events-none" />
          <h3 className="font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Shield className="h-6 w-6 text-emerald-500" aria-hidden="true" />
            Informasi Penting
          </h3>
          <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <li className="flex items-start gap-3 p-3 rounded-[12px] bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:border-emerald-200 dark:hover:border-emerald-800 transition-all duration-200">
              <span className="flex-shrink-0 mt-1 h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Pastikan nomor WhatsApp aktif dan dapat dihubungi untuk verifikasi
            </li>
            <li className="flex items-start gap-3 p-3 rounded-[12px] bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:border-emerald-200 dark:hover:border-emerald-800 transition-all duration-200">
              <span className="flex-shrink-0 mt-1 h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Data yang diisi harus benar dan sesuai dengan dokumen asli
            </li>
            <li className="flex items-start gap-3 p-3 rounded-[12px] bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:border-emerald-200 dark:hover:border-emerald-800 transition-all duration-200">
              <span className="flex-shrink-0 mt-1 h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Nomor registrasi akan dikirim via email setelah pendaftaran berhasil
            </li>
            <li className="flex items-start gap-3 p-3 rounded-[12px] bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:border-emerald-200 dark:hover:border-emerald-800 transition-all duration-200">
              <span className="flex-shrink-0 mt-1 h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Tim kami akan menghubungi dalam 1x24 jam untuk langkah selanjutnya
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}