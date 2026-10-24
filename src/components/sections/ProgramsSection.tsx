import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import { getPrograms } from '@/lib/sanity/queries'
import { ChevronRight, Users, Clock, Award, Shield, Sparkles, Star, Heart, Zap, BookOpen, Music, Trophy } from 'lucide-react'
import { FloatingOrnaments } from '@/components/ui/FloatingOrnaments'

interface Program {
  _id: string
  title: string
  slug: { current: string }
  shortDescription: string
  fullDescription: any
  thumbnail: any
  duration: string
  ageGroup: string
  features: string[]
  isActive: boolean
  order: number
}

const fallbackPrograms: Program[] = [
  {
    _id: 'fallback-1',
    title: 'Toddler Class',
    slug: { current: 'toddler' },
    shortDescription: 'Program pengenalan lingkungan sekolah dengan pendekatan bermain untuk anak usia 1.5-3 tahun.',
    fullDescription: [],
    thumbnail: null,
    duration: '1 Tahun',
    ageGroup: '1.5 - 3 Tahun',
    features: ['Pengenalan Bahasa', 'Motorik Halus & Kasar', 'Sosialisasi Awal', 'Music & Movement'],
    isActive: true,
    order: 1,
  },
  {
    _id: 'fallback-2',
    title: 'Playgroup',
    slug: { current: 'playgroup' },
    shortDescription: 'Belajar melalui bermain terstruktur untuk mengembangkan kreativitas dan kemandirian anak usia 3-4 tahun.',
    fullDescription: [],
    thumbnail: null,
    duration: '1 Tahun',
    ageGroup: '3 - 4 Tahun',
    features: ['Phonics Awareness', 'Pre-Math Concepts', 'Art & Craft', 'Outdoor Exploration'],
    isActive: true,
    order: 2,
  },
  {
    _id: 'fallback-3',
    title: 'TK A (Kindergarten A)',
    slug: { current: 'tk-a' },
    shortDescription: 'Persiapan sekolah dasar dengan fokus literasi, numerasi, dan pembentukan karakter untuk usia 4-5 tahun.',
    fullDescription: [],
    thumbnail: null,
    duration: '1 Tahun',
    ageGroup: '4 - 5 Tahun',
    features: ['Reading Readiness', 'Number Sense', 'Character Building', 'STEAM Introduction'],
    isActive: true,
    order: 3,
  },
  {
    _id: 'fallback-4',
    title: 'TK B (Kindergarten B)',
    slug: { current: 'tk-b' },
    shortDescription: 'Program persiapan SD yang komprehensif mencakup akademik, sosial-emosional, dan keterampilan hidup untuk usia 5-6 tahun.',
    fullDescription: [],
    thumbnail: null,
    duration: '1 Tahun',
    ageGroup: '5 - 6 Tahun',
    features: ['Advanced Literacy', 'Math Mastery', 'Leadership Skills', 'Primary School Transition'],
    isActive: true,
    order: 4,
  },
]

const programThemes = [
  {
    id: 'toddler',
    name: 'Vivid Mint',
    bg: 'bg-gradient-to-br from-emerald-100 via-teal-100 to-cyan-100 dark:from-emerald-900/40 dark:via-teal-900/40 dark:to-cyan-900/40',
    border: 'border-emerald-300/60 dark:border-emerald-700/60',
    hoverBorder: 'hover:border-emerald-400 dark:hover:border-emerald-600',
    iconBg: 'bg-gradient-to-br from-emerald-300 to-teal-300 dark:from-emerald-700 dark:to-teal-700',
    iconColor: 'text-white',
    badgeBg: 'bg-gradient-to-r from-emerald-400 to-teal-400',
    badgeBorder: 'border-emerald-300/50 dark:border-emerald-700/50',
    btnBg: 'bg-gradient-to-r from-emerald-500 to-teal-500',
    btnBorder: 'border-emerald-600',
    glowColor: 'shadow-emerald-400/40',
    glowColorHover: 'shadow-emerald-500/60',
    icon: Users,
    tilt: 'rotate-[-2deg]',
    shimmerColor: 'from-emerald-300/30 via-transparent to-teal-300/30',
    accentColor: 'text-emerald-600 dark:text-emerald-400',
  },
  {
    id: 'playgroup',
    name: 'Candy Pink',
    bg: 'bg-gradient-to-br from-pink-100 via-rose-100 to-fuchsia-100 dark:from-pink-900/40 dark:via-rose-900/40 dark:to-fuchsia-900/40',
    border: 'border-pink-300/60 dark:border-pink-700/60',
    hoverBorder: 'hover:border-pink-400 dark:hover:border-pink-600',
    iconBg: 'bg-gradient-to-br from-pink-400 to-rose-400 dark:from-pink-700 dark:to-rose-700',
    iconColor: 'text-white',
    badgeBg: 'bg-gradient-to-r from-pink-400 to-rose-400',
    badgeBorder: 'border-pink-300/50 dark:border-pink-700/50',
    btnBg: 'bg-gradient-to-r from-pink-500 to-rose-500',
    btnBorder: 'border-pink-600',
    glowColor: 'shadow-pink-400/40',
    glowColorHover: 'shadow-pink-500/60',
    icon: Heart,
    tilt: 'rotate-[2deg]',
    shimmerColor: 'from-pink-300/30 via-transparent to-rose-300/30',
    accentColor: 'text-pink-600 dark:text-pink-400',
  },
  {
    id: 'tk-a',
    name: 'Vibrant Amber',
    bg: 'bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-100 dark:from-amber-900/40 dark:via-orange-900/40 dark:to-yellow-900/40',
    border: 'border-amber-300/60 dark:border-amber-700/60',
    hoverBorder: 'hover:border-amber-400 dark:hover:border-amber-600',
    iconBg: 'bg-gradient-to-br from-amber-400 to-orange-400 dark:from-amber-700 dark:to-orange-700',
    iconColor: 'text-white',
    badgeBg: 'bg-gradient-to-r from-amber-400 to-orange-400',
    badgeBorder: 'border-amber-300/50 dark:border-amber-700/50',
    btnBg: 'bg-gradient-to-r from-amber-500 to-orange-500',
    btnBorder: 'border-amber-600',
    glowColor: 'shadow-amber-400/40',
    glowColorHover: 'shadow-amber-500/60',
    icon: Award,
    tilt: 'rotate-[-1deg]',
    shimmerColor: 'from-amber-300/30 via-transparent to-orange-300/30',
    accentColor: 'text-amber-600 dark:text-amber-400',
  },
  {
    id: 'tk-b',
    name: 'Royal Lavender',
    bg: 'bg-gradient-to-br from-purple-100 via-violet-100 to-indigo-100 dark:from-purple-900/40 dark:via-violet-900/40 dark:to-indigo-900/40',
    border: 'border-purple-300/60 dark:border-purple-700/60',
    hoverBorder: 'hover:border-purple-400 dark:hover:border-purple-600',
    iconBg: 'bg-gradient-to-br from-purple-400 to-violet-400 dark:from-purple-700 dark:to-violet-700',
    iconColor: 'text-white',
    badgeBg: 'bg-gradient-to-r from-purple-400 to-violet-400',
    badgeBorder: 'border-purple-300/50 dark:border-purple-700/50',
    btnBg: 'bg-gradient-to-r from-purple-500 to-violet-500',
    btnBorder: 'border-purple-600',
    glowColor: 'shadow-purple-400/40',
    glowColorHover: 'shadow-purple-500/60',
    icon: Shield,
    tilt: 'rotate-[1deg]',
    shimmerColor: 'from-purple-300/30 via-transparent to-violet-300/30',
    accentColor: 'text-purple-600 dark:text-purple-400',
  },
]

async function ProgramsSectionContent() {
  const programs = (await getPrograms()) as Program[] | null
  const displayPrograms = programs?.length ? programs : fallbackPrograms

  return (
    <section className="relative px-4 py-20 sm:py-24 lg:py-32 bg-gradient-to-b from-amber-50 via-orange-50 to-pink-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" aria-labelledby="programs-title">
      <FloatingOrnaments count={35} variant="section" />
      
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute top-20 left-10 w-[300px] h-[300px] rounded-full bg-gradient-to-br from-emerald-300/30 via-teal-300/20 to-cyan-300/30 blur-3xl animate-float-rotate" />
        <div className="absolute bottom-20 right-10 w-[300px] h-[300px] rounded-full bg-gradient-to-br from-pink-300/30 via-rose-300/20 to-fuchsia-300/30 blur-3xl animate-float-rotate" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-emerald-200/15 to-pink-200/15 blur-3xl animate-pulse-slow" />
        <div className="absolute inset-0 bg-[radial-gradient(#fde047_1px,transparent_1px)] [background-size:20px_20px] opacity-10 animate-shimmer" />
        <div className="absolute inset-0 bg-gradient-to-b from-amber-400/3 via-transparent to-pink-400/3" />
      </div>

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400/90 via-orange-400/90 to-pink-400/90 px-6 py-3 text-sm font-black text-slate-950 backdrop-blur-sm mb-4 border-2 border-amber-300 shadow-[0_8px_32px_rgba(251,191,36,0.4)] rotate-[-2deg] animate-bounce-slow">
            <Sparkles className="h-5 w-5 animate-bounce" />
            Program Unggulan
          </span>
          <h2 id="programs-title" className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-4">
            Program Pendidikan
            <span className="block bg-gradient-to-r from-emerald-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              Terpadu & Holistik
            </span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 font-medium">
            Kurikulum holistik yang dirancang untuk setiap tahap perkembangan anak, dari Toddler hingga persiapan SD.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {displayPrograms.map((program, index) => {
            const theme = programThemes[index % programThemes.length]
            const IconComponent = theme.icon

            return (
              <article
                key={program._id}
                className={`group relative p-6 rounded-[36px] border-4 transition-all duration-700 ${theme.bg} ${theme.border} ${theme.hoverBorder}`}
                style={{ 
                  transform: index % 2 === 0 ? 'rotate(-1.5deg)' : 'rotate(1.5deg)',
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <FloatingOrnaments count={8} variant="card" className="pointer-events-none" />
                
                {/* Glossy highlight overlay */}
                <div className="absolute inset-0 rounded-[36px] bg-gradient-to-b from-white/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 rounded-[36px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: theme.shimmerColor }} />
                <div className="absolute inset-0 rounded-[36px] bg-gradient-to-br from-emerald-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative mb-4 aspect-video overflow-hidden rounded-[28px] bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700">
                  {program.thumbnail ? (
                    (() => {
                      const imageUrl = urlFor(program.thumbnail)
                      return imageUrl ? (
                        <Image
                          src={imageUrl.width(600).height(400).auto('format').quality(85).url()}
                          alt={program.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full w-full">
                          <IconComponent className="h-24 w-24 text-slate-300 dark:text-slate-600" aria-hidden="true" />
                        </div>
                      )
                    })()
                  ) : (
                    <div className="flex items-center justify-center h-full w-full">
                      <IconComponent className="h-24 w-24 text-slate-300 dark:text-slate-600" aria-hidden="true" />
                    </div>
                  )}
                  {/* Image glossy overlay */}
                  <div className="absolute inset-0 rounded-[28px] bg-gradient-to-b from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                <div className="relative flex items-center justify-between mb-3">
                  <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black ${theme.badgeBg} ${theme.badgeBorder} border-2 shadow-[0_4px_12px_rgba(0,0,0,0.15)] text-white`}>
                    <Users className="h-3.5 w-3.5" aria-hidden="true" />
                    {program.ageGroup}
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/90 dark:bg-slate-800/90 text-xs font-bold text-slate-600 dark:text-slate-300 backdrop-blur-sm border-2 border-slate-200 dark:border-slate-700">
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                    {program.duration}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-2 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors drop-shadow-[0_2px_8px_rgba(251,191,36,0.15)]">
                  {program.title}
                </h3>

                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-2">
                  {program.shortDescription}
                </p>

                <ul className="mb-6 space-y-2" role="list">
                  {program.features.slice(0, 4).map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">
                      <span className={`mt-1 h-2.5 w-2.5 rounded-full ${theme.accentColor} flex-shrink-0 animate-bounce-slow drop-shadow-[0_0_6px_rgba(251,191,36,0.5)]`} aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/program/${program.slug.current}`}
                  className={`relative group inline-flex items-center justify-center gap-2 w-full rounded-full border-4 font-black text-sm py-4 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-300 focus:ring-offset-2 ${theme.iconBg} ${theme.iconColor} ${theme.btnBorder} ${theme.btnBg} text-white ${theme.glowColor} ${theme.glowColorHover} hover:shadow-[0_16px_40px_-8px_rgba(0,0,0,0.25)] hover:-translate-y-1.5 active:translate-y-0.5 active:shadow-[0_6px_16px_-4px_rgba(0,0,0,0.2)]`}
                  style={{ borderBottomWidth: '8px' }}
                >
                  <span className="relative z-10">Lihat Detail</span>
                  <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:rotate-12" aria-hidden="true" />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                </Link>
                
                <Star className="absolute top-4 right-4 h-7 w-7 text-amber-300/90 animate-pulse-glow drop-shadow-[0_0_12px_rgba(251,191,36,0.8)]" aria-hidden="true" />
                <Sparkles className="absolute bottom-4 left-4 h-5 w-5 text-pink-300/80 animate-pulse-glow" aria-hidden="true" />
              </article>
            )
          })}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/program"
            className="group relative inline-flex items-center justify-center gap-3 rounded-full border-4 border-emerald-300 dark:border-emerald-700 border-t-2 border-emerald-100/50 bg-gradient-to-r from-emerald-50 via-white to-teal-50 dark:from-emerald-900/30 dark:via-slate-900 dark:to-teal-900/30 px-10 py-4 text-lg font-black text-emerald-700 dark:text-emerald-300 hover:bg-gradient-to-r hover:from-emerald-100 hover:to-teal-100 dark:hover:from-emerald-900/40 dark:hover:to-teal-900/40 hover:border-emerald-400 dark:hover:border-emerald-600 hover:shadow-[0_16px_40px_-8px_rgba(16,185,129,0.3)] hover:-translate-y-1 transition-all duration-500 focus:outline-none focus:ring-4 focus:ring-emerald-300 focus:ring-offset-2"
          >
            <span className="relative z-10">Lihat Semua Program</span>
            <ChevronRight className="h-6 w-6 transition-transform group-hover:translate-x-1 group-hover:rotate-12" aria-hidden="true" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-emerald-100/40 to-transparent animate-shimmer" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export function ProgramsSection() {
  return <ProgramsSectionContent />
}