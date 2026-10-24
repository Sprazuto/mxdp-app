import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import { getPrograms } from '@/lib/sanity/queries'
import { ChevronRight, Users, Clock, Award, Shield, Sparkles, Star, Heart } from 'lucide-react'
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
    name: 'Minty Emerald',
    bg: 'bg-[#E6FFFA]',
    border: 'border-emerald-200 dark:border-emerald-800',
    hoverBorder: 'hover:border-emerald-400 dark:hover:border-emerald-600',
    iconBg: 'bg-emerald-100 dark:bg-emerald-900/30',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    badgeBg: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
    badgeBorder: 'border-emerald-200 dark:border-emerald-800',
    btnBg: 'bg-emerald-500 hover:bg-emerald-400',
    btnBorder: 'border-emerald-600',
    glowColor: 'shadow-emerald-200',
    glowColorHover: 'shadow-emerald-300',
    icon: Users,
    tilt: 'rotate-[-2deg]',
  },
  {
    id: 'playgroup',
    name: 'Bubblegum Pink',
    bg: 'bg-[#FDF2F8]',
    border: 'border-pink-200 dark:border-pink-800',
    hoverBorder: 'hover:border-pink-400 dark:hover:border-pink-600',
    iconBg: 'bg-pink-100 dark:bg-pink-900/30',
    iconColor: 'text-pink-600 dark:text-pink-400',
    badgeBg: 'bg-pink-100 text-pink-800 dark:bg-pink-900/40 dark:text-pink-300',
    badgeBorder: 'border-pink-200 dark:border-pink-800',
    btnBg: 'bg-pink-500 hover:bg-pink-400',
    btnBorder: 'border-pink-600',
    glowColor: 'shadow-pink-200',
    glowColorHover: 'shadow-pink-300',
    icon: Heart,
    tilt: 'rotate-[2deg]',
  },
  {
    id: 'tk-a',
    name: 'Butter Yellow',
    bg: 'bg-[#FEFCE8]',
    border: 'border-amber-200 dark:border-amber-800',
    hoverBorder: 'hover:border-amber-400 dark:hover:border-amber-600',
    iconBg: 'bg-amber-100 dark:bg-amber-900/30',
    iconColor: 'text-amber-600 dark:text-amber-400',
    badgeBg: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
    badgeBorder: 'border-amber-200 dark:border-amber-800',
    btnBg: 'bg-amber-500 hover:bg-amber-400',
    btnBorder: 'border-amber-600',
    glowColor: 'shadow-amber-200',
    glowColorHover: 'shadow-amber-300',
    icon: Award,
    tilt: 'rotate-[-1deg]',
  },
  {
    id: 'tk-b',
    name: 'Lavender Blue',
    bg: 'bg-[#F5F3FF]',
    border: 'border-purple-200 dark:border-purple-800',
    hoverBorder: 'hover:border-purple-400 dark:hover:border-purple-600',
    iconBg: 'bg-purple-100 dark:bg-purple-900/30',
    iconColor: 'text-purple-600 dark:text-purple-400',
    badgeBg: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300',
    badgeBorder: 'border-purple-200 dark:border-purple-800',
    btnBg: 'bg-purple-500 hover:bg-purple-400',
    btnBorder: 'border-purple-600',
    glowColor: 'shadow-purple-200',
    glowColorHover: 'shadow-purple-300',
    icon: Shield,
    tilt: 'rotate-[1deg]',
  },
]

async function ProgramsSectionContent() {
  const programs = (await getPrograms()) as Program[] | null
  const displayPrograms = programs?.length ? programs : fallbackPrograms

  return (
    <section className="relative px-4 py-20 sm:py-24 lg:py-32 bg-gradient-to-b from-[#FFFDF9] via-[#FFF8F0] to-[#F0F9FF] dark:from-gray-950 dark:via-gray-900 dark:to-gray-950" aria-labelledby="programs-title">
      <FloatingOrnaments count={25} variant="section" />
      
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-emerald-200/40 blur-3xl dark:bg-emerald-900/20" />
        <div className="absolute bottom-20 right-10 w-72 h-72 rounded-full bg-pink-200/40 blur-3xl dark:bg-pink-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-10" />
      </div>

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 rounded-full bg-amber-100/90 px-5 py-2 text-sm font-bold text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 backdrop-blur-sm mb-4 border-2 border-amber-200 dark:border-amber-800 shadow-lg shadow-amber-200/50 rotate-[-2deg]">
            <Sparkles className="h-4 w-4 animate-bounce" />
            Program Unggulan
          </span>
          <h2 id="programs-title" className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-4">
            Program Pendidikan
            <span className="block bg-gradient-to-r from-emerald-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
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
                className={`group relative p-6 rounded-[32px] border-4 transition-all duration-500 hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.15)] hover:-translate-y-3 ${theme.bg} ${theme.border} ${theme.hoverBorder}`}
                style={{ transform: index % 2 === 0 ? 'rotate(-1deg)' : 'rotate(1deg)' }}
              >
                <FloatingOrnaments count={6} variant="card" className="pointer-events-none" />
                
                <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-emerald-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative mb-4 aspect-video overflow-hidden rounded-[24px] bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700">
                  {program.thumbnail ? (
                    (() => {
                      const imageUrl = urlFor(program.thumbnail)
                      return imageUrl ? (
                        <Image
                          src={imageUrl.width(600).height(400).auto('format').quality(80).url()}
                          alt={program.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
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
                </div>

                <div className="relative flex items-center justify-between mb-3">
                  <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black ${theme.badgeBg} ${theme.badgeBorder} border-2 shadow-sm`}>
                    <Users className="h-3.5 w-3.5" aria-hidden="true" />
                    {program.ageGroup}
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/80 dark:bg-slate-800/80 text-xs font-bold text-slate-600 dark:text-slate-300 backdrop-blur-sm border-2 border-slate-200 dark:border-slate-700">
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                    {program.duration}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {program.title}
                </h3>

                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-2">
                  {program.shortDescription}
                </p>

                <ul className="mb-6 space-y-2" role="list">
                  {program.features.slice(0, 4).map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                      <span className={`mt-1 h-2 w-2 rounded-full ${theme.iconColor} flex-shrink-0 animate-bounce`} aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/program/${program.slug.current}`}
                  className={`relative inline-flex items-center justify-center gap-2 w-full rounded-full border-4 font-black text-sm py-4 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-300 focus:ring-offset-2 ${theme.iconBg} ${theme.iconColor} ${theme.btnBorder} ${theme.btnBg} text-white ${theme.glowColor} ${theme.glowColorHover} hover:shadow-[0_12px_24px_-6px_rgba(0,0,0,0.2)] hover:-translate-y-1 active:translate-y-0.5 active:shadow-[0_4px_8px_-2px_rgba(0,0,0,0.15)]`}
                >
                  Lihat Detail
                  <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
                
                <Star className="absolute top-4 right-4 h-6 w-6 text-amber-300/80 animate-pulse-slow" aria-hidden="true" />
              </article>
            )
          })}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/program"
            className="inline-flex items-center justify-center gap-3 rounded-full border-4 border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-900/20 px-10 py-4 text-lg font-black text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 hover:border-emerald-400 dark:hover:border-emerald-600 hover:shadow-xl hover:shadow-emerald-200/30 hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-300 focus:ring-offset-2"
          >
            Lihat Semua Program
            <ChevronRight className="h-6 w-6" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export function ProgramsSection() {
  return <ProgramsSectionContent />
}