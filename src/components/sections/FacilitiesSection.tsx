import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import { getFacilities } from '@/lib/sanity/queries'
import { Video, Wifi, Shield, ThermometerSun, Music, BookOpen, Zap, CheckCircle2, Sparkles, Star } from 'lucide-react'
import { FloatingOrnaments } from '@/components/ui/FloatingOrnaments'

interface Facility {
  _id: string
  name: string
  slug: { current: string }
  description: any
  thumbnail: any
  gallery: any[]
  features: string[]
  hasCctv: boolean
  order: number
}

const fallbackFacilities: Facility[] = [
  {
    _id: 'fallback-1',
    name: 'Ruang Kelas Cerdas',
    slug: { current: 'ruang-kelas-cerdas' },
    description: [],
    thumbnail: null,
    gallery: [],
    features: ['AC', 'Proyektor Interaktif', 'WiFi', 'Meja & Kursi Ergonomis'],
    hasCctv: true,
    order: 1,
  },
  {
    _id: 'fallback-2',
    name: 'Laboratorium STEAM',
    slug: { current: 'lab-steam' },
    description: [],
    thumbnail: null,
    gallery: [],
    features: ['Kit Robotik', 'Laptop/Tablet', 'Alat Eksperimen', 'Whiteboard Digital'],
    hasCctv: true,
    order: 2,
  },
  {
    _id: 'fallback-3',
    name: 'Area Bermain Aman',
    slug: { current: 'area-bermain-aman' },
    description: [],
    thumbnail: null,
    gallery: [],
    features: ['Lantai Lempung', 'Peralatan Standar SNI', 'Naungan', 'CCTV'],
    hasCctv: true,
    order: 3,
  },
  {
    _id: 'fallback-4',
    name: 'Perpustakaan & Reading Corner',
    slug: { current: 'perpustakaan' },
    description: [],
    thumbnail: null,
    gallery: [],
    features: ['Koleksi Buku Anak', 'Sofa Nyaman', 'Reading Nook', 'Audio Books'],
    hasCctv: false,
    order: 4,
  },
  {
    _id: 'fallback-5',
    name: 'Ruang Musik & Gerak',
    slug: { current: 'ruang-musik' },
    description: [],
    thumbnail: null,
    gallery: [],
    features: ['Alat Musik', 'Sound System', 'Cermin Panjang', 'Lantai Vinyl'],
    hasCctv: false,
    order: 5,
  },
  {
    _id: 'fallback-6',
    name: 'Klinik Sekolah & Ruang Istirahat',
    slug: { current: 'klinik-sekolah' },
    description: [],
    thumbnail: null,
    gallery: [],
    features: ['Tenaga Medis', 'Tempat Tidur', 'Obat Pertama', 'Kamar Mandi Khusus'],
    hasCctv: false,
    order: 6,
  },
]

const facilityThemes = [
  {
    name: 'Sky Blue',
    iconBg: 'bg-sky-100 dark:bg-sky-900/30',
    iconColor: 'text-sky-600 dark:text-sky-400',
    badgeBg: 'bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300',
    badgeBorder: 'border-sky-200 dark:border-sky-800',
    cardBorder: 'border-sky-200 dark:border-sky-800 hover:border-sky-400 dark:hover:border-sky-600',
    cardBg: 'bg-[#F0F9FF]',
    icon: Wifi,
    tilt: 'rotate-[-2deg]',
  },
  {
    name: 'Purple Dream',
    iconBg: 'bg-purple-100 dark:bg-purple-900/30',
    iconColor: 'text-purple-600 dark:text-purple-400',
    badgeBg: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300',
    badgeBorder: 'border-purple-200 dark:border-purple-800',
    cardBorder: 'border-purple-200 dark:border-purple-800 hover:border-purple-400 dark:hover:border-purple-600',
    cardBg: 'bg-[#F5F3FF]',
    icon: Zap,
    tilt: 'rotate-[2deg]',
  },
  {
    name: 'Minty Emerald',
    iconBg: 'bg-emerald-100 dark:bg-emerald-900/30',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    badgeBg: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
    badgeBorder: 'border-emerald-200 dark:border-emerald-800',
    cardBorder: 'border-emerald-200 dark:border-emerald-800 hover:border-emerald-400 dark:hover:border-emerald-600',
    cardBg: 'bg-[#E6FFFA]',
    icon: Shield,
    tilt: 'rotate-[-1deg]',
  },
  {
    name: 'Butter Yellow',
    iconBg: 'bg-amber-100 dark:bg-amber-900/30',
    iconColor: 'text-amber-600 dark:text-amber-400',
    badgeBg: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
    badgeBorder: 'border-amber-200 dark:border-amber-800',
    cardBorder: 'border-amber-200 dark:border-amber-800 hover:border-amber-400 dark:hover:border-amber-600',
    cardBg: 'bg-[#FEFCE8]',
    icon: BookOpen,
    tilt: 'rotate-[1deg]',
  },
  {
    name: 'Bubblegum Pink',
    iconBg: 'bg-pink-100 dark:bg-pink-900/30',
    iconColor: 'text-pink-600 dark:text-pink-400',
    badgeBg: 'bg-pink-100 text-pink-800 dark:bg-pink-900/40 dark:text-pink-300',
    badgeBorder: 'border-pink-200 dark:border-pink-800',
    cardBorder: 'border-pink-200 dark:border-pink-800 hover:border-pink-400 dark:hover:border-pink-600',
    cardBg: 'bg-[#FDF2F8]',
    icon: Music,
    tilt: 'rotate-[-2deg]',
  },
  {
    name: 'Peach Coral',
    iconBg: 'bg-orange-100 dark:bg-orange-900/30',
    iconColor: 'text-orange-600 dark:text-orange-400',
    badgeBg: 'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300',
    badgeBorder: 'border-orange-200 dark:border-orange-800',
    cardBorder: 'border-orange-200 dark:border-orange-800 hover:border-orange-400 dark:hover:border-orange-600',
    cardBg: 'bg-[#FFF7ED]',
    icon: ThermometerSun,
    tilt: 'rotate-[2deg]',
  },
]

const safetyFeatures = [
  { icon: Video, label: 'CCTV 24/7', desc: 'Pengawasan penuh di seluruh area sekolah' },
  { icon: Shield, label: 'Aman & Terjaga', desc: 'Sistem keamanan pintu masuk & keluar' },
  { icon: CheckCircle2, label: 'Standar SNI', desc: 'Peralatan bermain berstandar nasional' },
  { icon: ThermometerSun, label: 'Kesehatan Terawas', desc: 'Pemeriksaan rutin & klinik sekolah' },
]

async function FacilitiesSectionContent() {
  const facilities = (await getFacilities()) as Facility[] | null
  const displayFacilities = facilities?.length ? facilities : fallbackFacilities

  return (
    <>
      <section className="relative px-4 py-20 sm:py-24 lg:py-32 bg-gradient-to-b from-[#FFFDF9] via-[#FFF8F0] to-[#F0F9FF] dark:from-gray-950 dark:via-gray-900 dark:to-gray-950" aria-labelledby="facilities-title">
        <FloatingOrnaments count={25} variant="section" />
        
        <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-sky-200/40 blur-3xl dark:bg-sky-900/20" />
          <div className="absolute bottom-20 right-10 w-72 h-72 rounded-full bg-amber-200/40 blur-3xl dark:bg-amber-900/20" />
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-10" />
        </div>

        <div className="mx-auto max-w-7xl relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100/90 px-5 py-2 text-sm font-bold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 backdrop-blur-sm mb-4 border-2 border-emerald-200 dark:border-emerald-800 shadow-lg shadow-emerald-200/50 rotate-[-2deg]">
              <Sparkles className="h-4 w-4 animate-bounce" />
              Fasilitas Lengkap
            </span>
            <h2 id="facilities-title" className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-4">
              Fasilitas Pendukung
              <span className="block bg-gradient-to-r from-sky-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent">
                Pembelajaran Modern
              </span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 font-medium">
              Lingkungan belajar modern dengan fasilitas standar internasional untuk mendukung perkembangan optimal siswa.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
            {displayFacilities.map((facility, index) => {
              const theme = facilityThemes[index % facilityThemes.length]
              const IconComponent = theme.icon

              return (
                <article
                  key={facility._id}
                  className={`group relative p-6 rounded-[32px] border-4 transition-all duration-500 hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.15)] hover:-translate-y-3 ${theme.cardBg} ${theme.cardBorder}`}
                  style={{ transform: index % 2 === 0 ? 'rotate(-1deg)' : 'rotate(1deg)' }}
                >
                  <FloatingOrnaments count={4} variant="card" className="pointer-events-none" />
                  
                  <div className="relative mb-4 aspect-video overflow-hidden rounded-[24px] bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700">
                    {facility.thumbnail ? (
                      (() => {
                        const imageUrl = urlFor(facility.thumbnail)
                        return imageUrl ? (
                          <Image
                            src={imageUrl.width(500).height(350).auto('format').quality(80).url()}
                            alt={facility.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full w-full">
                            <IconComponent className="h-18 w-18 text-slate-300 dark:text-slate-600" aria-hidden="true" />
                          </div>
                        )
                      })()
                    ) : (
                      <div className="flex items-center justify-center h-full w-full">
                        <IconComponent className="h-18 w-18 text-slate-300 dark:text-slate-600" aria-hidden="true" />
                      </div>
                    )}
                    {facility.hasCctv && (
                      <div className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-500/90 text-white text-xs font-black shadow-lg">
                        <Video className="h-3.5 w-3.5 animate-pulse" aria-hidden="true" />
                        <span>LIVE CCTV</span>
                      </div>
                    )}
                    <Star className="absolute top-3 left-3 h-5 w-5 text-amber-300/80 animate-pulse-slow" aria-hidden="true" />
                  </div>

                  <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2">
                    {facility.name}
                  </h3>

                  <ul className="space-y-1.5 mb-4" role="list">
                    {facility.features.slice(0, 4).map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                        <CheckCircle2 className={`h-4.5 w-4.5 ${theme.iconColor} flex-shrink-0`} aria-hidden="true" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {facility.gallery.length > 0 && (
                    <div className="flex gap-2 overflow-x-auto pb-2 -mx-6 px-6" role="list" aria-label={`Galeri ${facility.name}`}>
                      {facility.gallery.slice(0, 4).map((img, i) => {
                        const galleryUrl = urlFor(img)
                        return galleryUrl ? (
                          <li key={i} className="flex-shrink-0">
                            <Image
                              src={galleryUrl.width(120).height(90).auto('format').quality(80).url()}
                              alt={`${facility.name} - Foto ${i + 1}`}
                              width={120}
                              height={90}
                              className="rounded-[16px] object-cover border-2 border-slate-200 dark:border-slate-700"
                            />
                          </li>
                        ) : null
                      })}
                    </div>
                  )}
                </article>
              )
            })}
          </div>

          <div className="text-center">
            <a
              href="/fasilitas"
              className="inline-flex items-center justify-center gap-2 rounded-full border-4 border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-900/20 px-10 py-4 text-lg font-black text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 hover:border-emerald-400 dark:hover:border-emerald-600 hover:shadow-xl hover:shadow-emerald-200/30 hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-300 focus:ring-offset-2"
            >
              Lihat Semua Fasilitas
              <span className="h-6 w-6">→</span>
            </a>
          </div>
        </div>
      </section>

      <section className="relative px-4 py-20 sm:py-24 lg:py-32 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" aria-labelledby="safety-title">
        <FloatingOrnaments count={20} variant="section" />
        
        <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-pink-500/10" />
          <div className="absolute inset-0 bg-[radial-gradient(#374151_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
        </div>

        <div className="mx-auto max-w-7xl relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 rounded-full bg-red-500/20 px-5 py-2 text-sm font-bold text-red-400 dark:bg-red-900/40 dark:text-red-300 backdrop-blur-sm mb-4 border-2 border-red-500/30 dark:border-red-900/30 shadow-lg shadow-red-500/20 rotate-[2deg]">
              <Video className="h-4 w-4 animate-pulse" />
              Keamanan & Kesejahteraan
            </span>
            <h2 id="safety-title" className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
              Sistem Keamanan & Keselamatan
              <span className="block bg-gradient-to-r from-red-400 via-amber-400 to-emerald-400 bg-clip-text text-transparent">
                Terintegrasi
              </span>
            </h2>
            <p className="text-lg text-slate-300 font-medium">
              Komitmen kami untuk menyediakan lingkungan yang aman, nyaman, dan sehat bagi setiap siswa.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {safetyFeatures.map((feature, index) => {
              const theme = facilityThemes[index % facilityThemes.length]
              const IconComponent = feature.icon

              return (
                <article
                  key={feature.label}
                  className={`group p-8 rounded-[32px] border-4 transition-all duration-500 hover:shadow-[0_24px_48px_-12px_rgba(255,255,255,0.1)] hover:-translate-y-3 ${theme.cardBg} ${theme.cardBorder} dark:bg-slate-800/80 dark:border-slate-700`}
                  style={{ transform: index % 2 === 0 ? 'rotate(-1deg)' : 'rotate(1deg)' }}
                >
                  <div className={`mb-5 flex h-16 w-16 items-center justify-center rounded-[20px] ${theme.iconBg} group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-emerald-500/20`}>
                    <IconComponent className={`h-8 w-8 ${theme.iconColor}`} aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-black text-white mb-2">
                    {feature.label}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {feature.desc}
                  </p>
                  <Star className="absolute top-4 right-4 h-6 w-6 text-amber-300/80 animate-pulse-slow" aria-hidden="true" />
                </article>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}

export function FacilitiesSection() {
  return <FacilitiesSectionContent />
}