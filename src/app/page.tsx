import { HeroSection } from '@/components/HeroSection'
import { ProgramsSection } from '@/components/sections/ProgramsSection'
import { FacilitiesSection } from '@/components/sections/FacilitiesSection'
import { TeachersSection } from '@/components/sections/TeachersSection'
import { ContactSection } from '@/components/sections/ContactSection'

export default async function Home() {
  return (
    <>
      <HeroSection />
      <ProgramsSection />
      <FacilitiesSection />
      <TeachersSection />
      <ContactSection />
      <section className="px-4 py-20 sm:py-24 lg:py-28 bg-gradient-to-b from-blue-50 to-purple-50 dark:from-gray-950 dark:to-gray-900" aria-labelledby="cta-title">
        <div className="mx-auto max-w-7xl text-center">
          <h2 id="cta-title" className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Siap Memulai Perjalanan Pendidikan Anak Anda?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            Bergabunglah dengan ribuan orang tua yang telah mempercayakan pendidikan anak mereka di MXDP.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/daftar"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-blue-500/25 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl hover:shadow-blue-500/35 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Daftar Sekarang Gratis
              <span className="h-5 w-5" aria-hidden="true">→</span>
            </a>
            <a
              href="/kontak"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 px-8 py-4 text-lg font-semibold text-gray-900 dark:text-white backdrop-blur-sm hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Hubungi Kami
            </a>
          </div>
        </div>
      </section>
    </>
  )
}