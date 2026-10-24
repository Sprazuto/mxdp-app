import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import { getFacilities } from '@/lib/sanity/queries'
import { Video, Wifi, Shield, ThermometerSun, Music, BookOpen, Zap, CheckCircle2, Sparkles, Star, Globe, Laptop, Microscope, TreePine, Dumbbell, Stethoscope, Palette } from 'lucide-react'
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
    name: 'Vivid Sky',
    bg: 'bg-gradient-to-br from-sky-100 via-cyan-100 to-blue-100 dark:from-sky-900/40 dark:via-cyan-900/40 dark:to-blue-900/40',
    border: 'border-sky-300/60 dark:border-sky-700/60',
    hoverBorder: 'hover:border-sky-400 dark:hover:border-sky-600',
    iconBg: 'bg-gradient-to-br from-sky-400 to-cyan-400 dark:from-sky-700 dark:to-cyan-700',
    iconColor: 'text-white',
    badgeBg: 'bg-gradient-to-r from-sky-400 to-cyan-400',
    badgeBorder: 'border-sky-300/50 dark:border-sky-700/50',
    icon: Wifi,
    tilt: 'rotate-[-2deg]',
    shimmerColor: 'from-sky-300/30 via-transparent to-cyan-300/30',
    accentColor: 'text-sky-600 dark:text-sky-400',
  },
  {
    name: 'Electric Purple',
    bg: 'bg-gradient-to-br from-purple-100 via-violet-100 to-fuchsia-100 dark:from-purple-900/40 dark:via-violet-900/40 dark:to-fuchsia-900/40',
    border: 'border-purple-300/60 dark:border-purple-700/60',
    hoverBorder: 'hover:border-purple-400 dark:hover:border-purple-600',
    iconBg: 'bg-gradient-to-br from-purple-400 to-violet-400 dark:from-purple-700 dark:to-violet-700',
    iconColor: 'text-white',
    badgeBg: 'bg-gradient-to-r from-purple-400 to-violet-400',
    badgeBorder: 'border-purple-300/50 dark:border-purple-700/50',
    icon: Zap,
    tilt: 'rotate-[2deg]',
    shimmerColor: 'from-purple-300/30 via-transparent to-violet-300/30',
    accentColor: 'text-purple-600 dark:text-purple-400',
  },
  {
    name: 'Vivid Emerald',
    bg: 'bg-gradient-to-br from-emerald-100 via-teal-100 to-cyan-100 dark:from-emerald-900/40 dark:via-teal-900/40 dark:to-cyan-900/40',
    border: 'border-emerald-300/60 dark:border-emerald-700/60',
    hoverBorder: 'hover:border-emerald-400 dark:hover:border-emerald-600',
    iconBg: 'bg-gradient-to-br from-emerald-400 to-teal-400 dark:from-emerald-700 dark:to-teal-700',
    iconColor: 'text-white',
    badgeBg: 'bg-gradient-to-r from-emerald-400 to-teal-400',
    badgeBorder: 'border-emerald-300/50 dark:border-emerald-700/50',
    icon: Shield,
    tilt: 'rotate-[-1deg]',
    shimmerColor: 'from-emerald-300/30 via-transparent to-teal-300/30',
    accentColor: 'text-emerald-600 dark:text-emerald-400',
  },
  {
    name: 'Golden Amber',
    bg: 'bg-gradient-to-br from-amber-100 via-yellow-100 to-orange-100 dark:from-amber-900/40 dark:via-yellow-900/40 dark:to-orange-900/40',
    border: 'border-amber-300/60 dark:border-amber-700/60',
    hoverBorder: 'hover:border-amber-400 dark:hover:border-amber-600',
    iconBg: 'bg-gradient-to-br from-amber-400 to-yellow-400 dark:from-amber-700 dark:to-yellow-700',
    iconColor: 'text-white',
    badgeBg: 'bg-gradient-to-r from-amber-400 to-yellow-400',
    badgeBorder: 'border-amber-300/50 dark:border-amber-700/50',
    icon: BookOpen,
    tilt: 'rotate-[1deg]',
    shimmerColor: 'from-amber-300/30 via-transparent to-yellow-300/30',
    accentColor: 'text-amber-600 dark:text-amber-400',
  },
  {
    name: 'Candy Pink',
    bg: 'bg-gradient-to-br from-pink-100 via-rose-100 to-fuchsia-100 dark:from-pink-900/40 dark:via-rose-900/40 dark:to-fuchsia-900/40',
    border: 'border-pink-300/60 dark:border-pink-700/60',
    hoverBorder: 'hover:border-pink-400 dark:hover:border-pink-600',
    iconBg: 'bg-gradient-to-br from-pink-400 to-rose-400 dark:from-pink-700 dark:to-rose-700',
    iconColor: 'text-white',
    badgeBg: 'bg-gradient-to-r from-pink-400 to-rose-400',
    badgeBorder: 'border-pink-300/50 dark:border-pink-700/50',
    icon: Music,
    tilt: 'rotate-[-2deg]',
    shimmerColor: 'from-pink-300/30 via-transparent to-rose-300/30',
    accentColor: 'text-pink-600 dark:text-pink-400',
  },
  {
    name: 'Peach Coral',
    bg: 'bg-gradient-to-br from-orange-100 via-red-100 to-amber-100 dark:from-orange-900/40 dark:via-red-900/40 dark:to-amber-900/40',
    border: 'border-orange-300/60 dark:border-orange-700/60',
    hoverBorder: 'hover:border-orange-400 dark:hover:border-orange-600',
    iconBg: 'bg-gradient-to-br from-orange-400 to-red-400 dark:from-orange-700 dark:to-red-700',
    iconColor: 'text-white',
    badgeBg: 'bg-gradient-to-r from-orange-400 to-red-400',
    badgeBorder: 'border-orange-300/50 dark:border-orange-700/50',
    icon: ThermometerSun,
    tilt: 'rotate-[2deg]',
    shimmerColor: 'from-orange-300/30 via-transparent to-red-300/30',
    accentColor: 'text-orange-600 dark:text-orange-400',
  },
]

const safetyFeatures = [
  { icon: Video, label: 'CCTV 24/7', desc: 'Pengawasan penuh di seluruh area sekolah' },
  { icon: Shield, label: 'Aman & Terjaga', desc: 'Sistem keamanan pintu masuk & keluar' },
  { icon: CheckCircle2, label: 'Standar SNI', desc: 'Peralatan bermain berstandar nasional' },
  { icon: ThermometerSun, label: 'Kesehatan Terawas', desc: 'Pemeriksaan rutin & klinik sekolah' },
]

const safetyThemes = [
  {
    name: 'Crimson Red',
    bg: 'bg-gradient-to-br from-red-900/60 via-red-800/50 to-red-900/60',
    border: 'border-red-500/50',
    hoverBorder: 'hover:border-red-400',
    iconBg: 'bg-gradient-to-br from-red-500 to-pink-500',
    iconColor: 'text-white',
    shimmerColor: 'from-red-400/30 via-transparent to-pink-400/30',
    accentColor: 'text-red-400',
  },
  {
    name: 'Golden Shield',
    bg: 'bg-gradient-to-br from-amber-900/60 via-yellow-800/50 to-amber-900/60',
    border: 'border-amber-500/50',
    hoverBorder: 'hover:border-amber-400',
    iconBg: 'bg-gradient-to-br from-amber-500 to-yellow-500',
    iconColor: 'text-white',
    shimmerColor: 'from-amber-400/30 via-transparent to-yellow-400/30',
    accentColor: 'text-amber-400',
  },
  {
    name: 'Emerald Safe',
    bg: 'bg-gradient-to-br from-emerald-900/60 via-teal-800/50 to-emerald-900/60',
    border: 'border-emerald-500/50',
    hoverBorder: 'hover:border-emerald-400',
    iconBg: 'bg-gradient-to-br from-emerald-500 to-teal-500',
    iconColor: 'text-white',
    shimmerColor: 'from-emerald-400/30 via-transparent to-teal-400/30',
    accentColor: 'text-emerald-400',
  },
  {
    name: 'Royal Blue',
    bg: 'bg-gradient-to-br from-blue-900/60 via-indigo-800/50 to-blue-900/60',
    border: 'border-blue-500/50',
    hoverBorder: 'hover:border-blue-400',
    iconBg: 'bg-gradient-to-br from-blue-500 to-indigo-500',
    iconColor: 'text-white',
    shimmerColor: 'from-blue-400/30 via-transparent to-indigo-400/30',
    accentColor: 'text-blue-400',
  },
]

async function FacilitiesSectionContent() {
  const facilities = (await getFacilities()) as Facility[] | null
  const displayFacilities = facilities?.length ? facilities : fallbackFacilities

  return (
    <>
      <section className="relative px-4 py-20 sm:py-24 lg:py-32 bg-gradient-to-b from-amber-50 via-orange-50 to-pink-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" aria-labelledby="facilities-title">
        <FloatingOrnaments count={35} variant="section" />
        
        <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
          <div className="absolute top-20 left-10 w-[300px] h-[300px] rounded-full bg-gradient-to-br from-sky-300/30 via-cyan-300/20 to-blue-300/30 blur-3xl animate-float-rotate" />
          <div className="absolute bottom-20 right-10 w-[300px] h-[300px] rounded-full bg-gradient-to-br from-pink-300/30 via-rose-300/20 to-fuchsia-300/30 blur-3xl animate-float-rotate" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-emerald-200/15 to-pink-200/15 blur-3xl animate-pulse-slow" />
          <div className="absolute inset-0 bg-[radial-gradient(#fde047_1px,transparent_1px)] [background-size:20px_20px] opacity-10 animate-shimmer" />
          <div className="absolute inset-0 bg-gradient-to-b from-amber-400/3 via-transparent to-pink-400/3" />
        </div>

        <div className="mx-auto max-w-7xl relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400/90 via-orange-400/90 to-pink-400/90 px-6 py-3 text-sm font-black text-slate-950 backdrop-blur-sm mb-4 border-2 border-amber-300 shadow-[0_8px_32px_rgba(251,191,36,0.4)] rotate-[-2deg] animate-bounce-slow">
              <Sparkles className="h-5 w-5 animate-bounce" />
              Fasilitas Lengkap
            </span>
            <h2 id="facilities-title" className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-4">
              Fasilitas Pendukung
              <span className="block bg-gradient-to-r from-sky-500 via-purple-500 to-emerald-500 bg-clip-text text-transparent">
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
                  className={`group relative p-6 rounded-[36px] border-4 transition-all duration-700 ${theme.bg} ${theme.border} ${theme.hoverBorder}`}
                  style={{ 
                    transform: index % 2 === 0 ? 'rotate(-1.5deg)' : 'rotate(1.5deg)',
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <FloatingOrnaments count={6} variant="card" className="pointer-events-none" />
                  
                  {/* Glossy highlight overlay */}
                  <div className="absolute inset-0 rounded-[36px] bg-gradient-to-b from-white/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 rounded-[36px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: theme.shimmerColor }} />
                  <div className="absolute inset-0 rounded-[36px] bg-gradient-to-br from-emerald-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative mb-4 aspect-video overflow-hidden rounded-[28px] bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700">
                    {facility.thumbnail ? (
                      (() => {
                        const imageUrl = urlFor(facility.thumbnail)
                        return imageUrl ? (
                          <Image
                            src={imageUrl.width(500).height(350).auto('format').quality(85).url()}
                            alt={facility.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full w-full">
                            <IconComponent className="h-20 w-20 text-slate-300 dark:text-slate-600" aria-hidden="true" />
                          </div>
                        )
                      })()
                    ) : (
                      <div className="flex items-center justify-center h-full w-full">
                        <IconComponent className="h-20 w-20 text-slate-300 dark:text-slate-600" aria-hidden="true" />
                      </div>
                    )}
                    {/* Image glossy overlay */}
                    <div className="absolute inset-0 rounded-[28px] bg-gradient-to-b from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    {facility.hasCctv && (
                      <div className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-black shadow-[0_4px_16px_rgba(239,68,68,0.5)] animate-pulse-glow">
                        <Video className="h-4 w-4 animate-pulse" aria-hidden="true" />
                        <span>LIVE CCTV</span>
                      </div>
                    )}
                    <Star className="absolute top-3 left-3 h-6 w-6 text-amber-300/90 animate-pulse-glow drop-shadow-[0_0_12px_rgba(251,191,36,0.8)]" aria-hidden="true" />
                    <Sparkles className="absolute bottom-3 right-3 h-5 w-5 text-pink-300/80 animate-pulse-glow" aria-hidden="true" />
                  </div>

                  <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2 drop-shadow-[0_2px_8px_rgba(251,191,36,0.15)]">
                    {facility.name}
                  </h3>

                  <ul className="space-y-1.5 mb-4" role="list">
                    {facility.features.slice(0, 4).map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">
                        <CheckCircle2 className={`h-5 w-5 ${theme.accentColor} flex-shrink-0 animate-bounce-slow drop-shadow-[0_0_6px_rgba(251,191,36,0.5)]`} aria-hidden="true" />
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
                              src={galleryUrl.width(120).height(90).auto('format').quality(85).url()}
                              alt={`${facility.name} - Foto ${i + 1}`}
                              width={120}
                              height={90}
                              className="rounded-[16px] object-cover border-2 border-slate-200 dark:border-slate-700 group-hover:scale-105 transition-transform duration-500"
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
              className="group relative inline-flex items-center justify-center gap-3 rounded-full border-4 border-emerald-300 dark:border-emerald-700 border-t-2 border-emerald-100/50 bg-gradient-to-r from-emerald-50 via-white to-teal-50 dark:from-emerald-900/30 dark:via-slate-900 dark:to-teal-900/30 px-10 py-4 text-lg font-black text-emerald-700 dark:text-emerald-300 hover:bg-gradient-to-r hover:from-emerald-100 hover:to-teal-100 dark:hover:from-emerald-900/40 dark:hover:to-teal-900/40 hover:border-emerald-400 dark:hover:border-emerald-600 hover:shadow-[0_16px_40px_-8px_rgba(16,185,129,0.3)] hover:-translate-y-1 transition-all duration-500 focus:outline-none focus:ring-4 focus:ring-emerald-300 focus:ring-offset-2"
            >
              <span className="relative z-10">Lihat Semua Fasilitas</span>
              <span className="h-6 w-6 transition-transform group-hover:translate-x-1 group-hover:rotate-12">→</span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-emerald-100/40 to-transparent animate-shimmer" />
            </a>
          </div>
        </div>
      </section>

      <section className="relative px-4 py-20 sm:py-24 lg:py-32 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" aria-labelledby="safety-title">
        <FloatingOrnaments count={30} variant="section" />
        
        <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-emerald-500/10" />
          <div className="absolute inset-0 bg-[radial-gradient(#374151_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 via-transparent to-emerald-500/5" />
        </div>

        <div className="mx-auto max-w-7xl relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-red-500/30 via-amber-500/30 to-emerald-500/30 px-6 py-3 text-sm font-black text-amber-200 dark:bg-red-900/40 dark:text-amber-300 backdrop-blur-sm mb-4 border-2 border-red-500/30 dark:border-red-900/30 shadow-[0_8px_32px_rgba(239,68,68,0.3)] rotate-[2deg] animate-bounce-slow">
              <Video className="h-5 w-5 animate-pulse" />
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
              const theme = safetyThemes[index % safetyThemes.length]
              const IconComponent = feature.icon

              return (
                <article
                  key={feature.label}
                  className={`group p-8 rounded-[36px] border-4 transition-all duration-700 hover:shadow-[0_30px_60px_-12px_rgba(255,255,255,0.15)] hover:-translate-y-3 ${theme.bg} ${theme.border} ${theme.hoverBorder}`}
                  style={{ 
                    transform: index % 2 === 0 ? 'rotate(-1.5deg)' : 'rotate(1.5deg)',
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <FloatingOrnaments count={4} variant="card" className="pointer-events-none" />
                  
                  {/* Glossy highlight overlay */}
                  <div className="absolute inset-0 rounded-[36px] bg-gradient-to-b from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 rounded-[36px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: theme.shimmerColor }} />
                  
                  <div className={`mb-6 flex h-18 w-18 items-center justify-center rounded-[22px] ${theme.iconBg} group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-[0_12px_32px_rgba(0,0,0,0.3),_inset_0_2px_0_rgba(255,255,255,0.2)]`}>
                    <IconComponent className={`h-9 w-9 ${theme.iconColor} drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]`} aria-hidden="true" />
                    {/* Glossy icon highlight */}
                    <div className="absolute inset-0 rounded-[22px] bg-gradient-to-b from-white/30 to-transparent" />
                  </div>
                  <h3 className="text-lg font-black text-white mb-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
                    {feature.label}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {feature.desc}
                  </p>
                  <Star className="absolute top-4 right-4 h-7 w-7 text-amber-300/90 animate-pulse-glow drop-shadow-[0_0_12px_rgba(251,191,36,0.8)]" aria-hidden="true" />
                  <Sparkles className="absolute bottom-4 left-4 h-5 w-5 text-pink-300/80 animate-pulse-glow" aria-hidden="true" />
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