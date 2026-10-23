import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import { getFacilities } from '@/lib/sanity/queries'
import { Video, Wifi, Shield, ThermometerSun, Music, BookOpen, Zap, CheckCircle2 } from 'lucide-react'

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

const facilityIcons: Record<string, any> = {
  'Ruang Kelas Cerdas': Wifi,
  'Laboratorium STEAM': Zap,
  'Area Bermain Aman': Shield,
  'Perpustakaan & Reading Corner': BookOpen,
  'Ruang Musik & Gerak': Music,
  'Klinik Sekolah & Ruang Istirahat': ThermometerSun,
}

const facilityColorSchemes = [
  {
    iconBg: 'bg-blue-100 dark:bg-blue-900/30',
    iconColor: 'text-blue-600 dark:text-blue-400',
    badgeBg: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    cardBorder: 'border-blue-100 dark:border-blue-800 hover:border-blue-300 dark:hover:border-blue-600',
    cardBg: 'bg-blue-50 dark:bg-blue-900/20',
  },
  {
    iconBg: 'bg-purple-100 dark:bg-purple-900/30',
    iconColor: 'text-purple-600 dark:text-purple-400',
    badgeBg: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
    cardBorder: 'border-purple-100 dark:border-purple-800 hover:border-purple-300 dark:hover:border-purple-600',
    cardBg: 'bg-purple-50 dark:bg-purple-900/20',
  },
  {
    iconBg: 'bg-emerald-100 dark:bg-emerald-900/30',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    badgeBg: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
    cardBorder: 'border-emerald-100 dark:border-emerald-800 hover:border-emerald-300 dark:hover:border-emerald-600',
    cardBg: 'bg-emerald-50 dark:bg-emerald-900/20',
  },
  {
    iconBg: 'bg-amber-100 dark:bg-amber-900/30',
    iconColor: 'text-amber-600 dark:text-amber-400',
    badgeBg: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
    cardBorder: 'border-amber-100 dark:border-amber-800 hover:border-amber-300 dark:hover:border-amber-600',
    cardBg: 'bg-amber-50 dark:bg-amber-900/20',
  },
  {
    iconBg: 'bg-pink-100 dark:bg-pink-900/30',
    iconColor: 'text-pink-600 dark:text-pink-400',
    badgeBg: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300',
    cardBorder: 'border-pink-100 dark:border-pink-800 hover:border-pink-300 dark:hover:border-pink-600',
    cardBg: 'bg-pink-50 dark:bg-pink-900/20',
  },
  {
    iconBg: 'bg-orange-100 dark:bg-orange-900/30',
    iconColor: 'text-orange-600 dark:text-orange-400',
    badgeBg: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
    cardBorder: 'border-orange-100 dark:border-orange-800 hover:border-orange-300 dark:hover:border-orange-600',
    cardBg: 'bg-orange-50 dark:bg-orange-900/20',
  },
]

async function FacilitiesSectionContent() {
  const facilities = (await getFacilities()) as Facility[] | null
  const displayFacilities = facilities?.length ? facilities : fallbackFacilities

  const safetyFeatures = [
    { icon: Video, label: 'CCTV 24/7', desc: 'Pengawasan penuh di seluruh area sekolah' },
    { icon: Shield, label: 'Aman & Terjaga', desc: 'Sistem keamanan pintu masuk & keluar' },
    { icon: CheckCircle2, label: 'Standar SNI', desc: 'Peralatan bermain berstandar nasional' },
    { icon: ThermometerSun, label: 'Kesehatan Terawas', desc: 'Pemeriksaan rutin & klinik sekolah' },
  ]

  return (
    <>
      <section className="px-4 py-20 sm:py-24 lg:py-28 bg-white dark:bg-gray-950" aria-labelledby="facilities-title">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100/80 px-4 py-1.5 text-sm font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 backdrop-blur-sm mb-4">
              Fasilitas Lengkap
            </span>
            <h2 id="facilities-title" className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Fasilitas Pendukung Pembelajaran
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Lingkungan belajar modern dengan fasilitas standar internasional untuk mendukung perkembangan optimal siswa.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
            {displayFacilities.map((facility, index) => {
              const colors = facilityColorSchemes[index % facilityColorSchemes.length]
              const IconComponent = facilityIcons[facility.name] || Shield

              return (
                <article
                  key={facility._id}
                  className={`group relative p-6 rounded-2xl border transition-all duration-500 hover:shadow-xl hover:-translate-y-1 ${colors.cardBg} ${colors.cardBorder}`}
                >
                  <div className="relative mb-4 aspect-video overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
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
                            <IconComponent className="h-14 w-14 text-gray-300 dark:text-gray-600" aria-hidden="true" />
                          </div>
                        )
                      })()
                    ) : (
                      <div className="flex items-center justify-center h-full w-full">
                        <IconComponent className="h-14 w-14 text-gray-300 dark:text-gray-600" aria-hidden="true" />
                      </div>
                    )}
                    {facility.hasCctv && (
                      <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-red-500/90 text-white text-xs font-medium">
                        <Video className="h-3 w-3" aria-hidden="true" />
                        CCTV
                      </div>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {facility.name}
                  </h3>

                  <ul className="space-y-1.5 mb-4" role="list">
                    {facility.features.slice(0, 4).map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <CheckCircle2 className={`h-4 w-4 ${colors.iconColor} flex-shrink-0`} aria-hidden="true" />
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
                              className="rounded-lg object-cover border border-gray-200 dark:border-gray-700"
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
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-emerald-300 dark:border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-8 py-4 text-lg font-semibold text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              Lihat Semua Fasilitas
              <span className="h-5 w-5" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:py-24 lg:py-28 bg-gradient-to-b from-red-50 via-white to-emerald-50 dark:from-red-900/20 dark:via-gray-950 dark:to-emerald-900/20" aria-labelledby="safety-title">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 rounded-full bg-red-100/80 px-4 py-1.5 text-sm font-medium text-red-700 dark:bg-red-900/30 dark:text-red-300 backdrop-blur-sm mb-4">
              Keamanan & Kesejahteraan
            </span>
            <h2 id="safety-title" className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Sistem Keamanan & Keselamatan Terintegrasi
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Komitmen kami untuk menyediakan lingkungan yang aman, nyaman, dan sehat bagi setiap siswa.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {safetyFeatures.map((feature, index) => {
              const colors = facilityColorSchemes[index % facilityColorSchemes.length]
              const IconComponent = feature.icon

              return (
                <article
                  key={feature.label}
                  className={`group p-6 rounded-2xl border transition-all duration-500 hover:shadow-lg hover:-translate-y-1 ${colors.cardBg} ${colors.cardBorder}`}
                >
                  <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl ${colors.iconBg} group-hover:scale-110 transition-transform`}>
                    <IconComponent className={`h-7 w-7 ${colors.iconColor}`} aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.label}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {feature.desc}
                  </p>
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