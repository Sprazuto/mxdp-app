import { PPDBForm } from '@/components/ppdb/PPDBForm'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function PPDBPage() {
  return (
    <div className="min-h-screen py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Beranda
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 mb-6">
            <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Pendaftaran Siswa Baru (PPDB)
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Isi formulir pendaftaran di bawah ini. Proses pendaftaran terdiri dari 4 langkah mudah:
            Data Orang Tua → Data Anak → Pilih Program → Konfirmasi.
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid gap-4 sm:grid-cols-3 mb-12">
          <Card className="border-blue-200 dark:border-blue-800">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                  <svg className="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Gratis Biaya Daftar</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Tidak ada biaya pendaftaran</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-emerald-200 dark:border-emerald-800">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                  <svg className="h-5 w-5 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Proses Cepat</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Verifikasi 1x24 jam</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-amber-200 dark:border-amber-800">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/30">
                  <svg className="h-5 w-5 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Notifikasi Email</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Konfirmasi otomatis ke email</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Form */}
        <PPDBForm />

        {/* Footer Info */}
        <div className="mt-12 rounded-xl bg-gray-50 dark:bg-gray-800/50 p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <svg className="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Informasi Penting
          </h3>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
            <li className="flex items-start gap-2">
              <span className="flex-shrink-0 mt-1 h-1.5 w-1.5 rounded-full bg-blue-500" />
              Pastikan nomor WhatsApp aktif dan dapat dihubungi untuk verifikasi
            </li>
            <li className="flex items-start gap-2">
              <span className="flex-shrink-0 mt-1 h-1.5 w-1.5 rounded-full bg-blue-500" />
              Data yang diisi harus benar dan sesuai dengan dokumen asli
            </li>
            <li className="flex items-start gap-2">
              <span className="flex-shrink-0 mt-1 h-1.5 w-1.5 rounded-full bg-blue-500" />
              Nomor registrasi akan dikirim via email setelah pendaftaran berhasil
            </li>
            <li className="flex items-start gap-2">
              <span className="flex-shrink-0 mt-1 h-1.5 w-1.5 rounded-full bg-blue-500" />
              Tim kami akan menghubungi dalam 1x24 jam untuk langkah selanjutnya
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}