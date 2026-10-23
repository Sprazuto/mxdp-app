import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import { getPrograms } from '@/lib/sanity/queries'
import { ChevronRight, Users, Clock, Award, Shield } from 'lucide-react'

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

const programIcons = {
  'Toddler Class': Users,
  'Playgroup': Award,
  'TK A (Kindergarten A)': Clock,
  'TK B (Kindergarten B)': Shield,
}

const colorSchemes = [
  {
    bg: 'bg-teal-50 dark:bg-teal-900/20',
    border: 'border-teal-100 dark:border-teal-800',
    hoverBorder: 'hover:border-teal-300 dark:hover:border-teal-600',
    iconBg: 'bg-teal-100 dark:bg-teal-900/30',
    iconColor: 'text-teal-600 dark:text-teal-400',
    badgeBg: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300',
    btnHover: 'hover:bg-teal-600 hover:border-teal-600',
  },
  {
    bg: 'bg-emerald-50 dark:bg-emerald-900/20',
    border: 'border-emerald-100 dark:border-emerald-800',
    hoverBorder: 'hover:border-emerald-300 dark:hover:border-emerald-600',
    iconBg: 'bg-emerald-100 dark:bg-emerald-900/30',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    badgeBg: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
    btnHover: 'hover:bg-emerald-600 hover:border-emerald-600',
  },
  {
    bg: 'bg-orange-50 dark:bg-orange-900/20',
    border: 'border-orange-100 dark:border-orange-800',
    hoverBorder: 'hover:border-orange-300 dark:hover:border-orange-600',
    iconBg: 'bg-orange-100 dark:bg-orange-900/30',
    iconColor: 'text-orange-600 dark:text-orange-400',
    badgeBg: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
    btnHover: 'hover:bg-orange-600 hover:border-orange-600',
  },
  {
    bg: 'bg-amber-50 dark:bg-amber-900/20',
    border: 'border-amber-100 dark:border-amber-800',
    hoverBorder: 'hover:border-amber-300 dark:hover:border-amber-600',
    iconBg: 'bg-amber-100 dark:bg-amber-900/30',
    iconColor: 'text-amber-600 dark:text-amber-400',
    badgeBg: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
    btnHover: 'hover:bg-amber-600 hover:border-amber-600',
  },
]

async function ProgramsSectionContent() {
  const programs = (await getPrograms()) as Program[] | null
  const displayPrograms = programs?.length ? programs : fallbackPrograms

  return (
    <section className="px-4 py-20 sm:py-24 lg:py-28 bg-white dark:bg-gray-950" aria-labelledby="programs-title">
      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 rounded-full bg-teal-100/80 px-4 py-1.5 text-sm font-medium text-teal-700 dark:bg-teal-900/30 dark:text-teal-300 backdrop-blur-sm mb-4">
            Program Unggulan
          </span>
          <h2 id="programs-title" className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Program Pendidikan Terpadu
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Kurikulum holistik yang dirancang untuk setiap tahap perkembangan anak, dari Toddler hingga persiapan SD.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {displayPrograms.map((program, index) => {
            const colors = colorSchemes[index % colorSchemes.length]
            const IconComponent = programIcons[program.title as keyof typeof programIcons] || Award

            return (
              <article
                key={program._id}
                className={`group relative p-6 rounded-3xl border transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 ${colors.bg} ${colors.border} ${colors.hoverBorder}`}
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-teal-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative mb-4 aspect-video overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800">
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
                          <IconComponent className="h-16 w-16 text-gray-300 dark:text-gray-600" aria-hidden="true" />
                        </div>
                      )
                    })()
                  ) : (
                    <div className="flex items-center justify-center h-full w-full">
                      <IconComponent className="h-16 w-16 text-gray-300 dark:text-gray-600" aria-hidden="true" />
                    </div>
                  )}
                </div>

                <div className="relative flex items-center justify-between mb-3">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${colors.badgeBg}`}>
                    <Users className="h-3 w-3" aria-hidden="true" />
                    {program.ageGroup}
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/80 dark:bg-gray-800/80 text-xs font-medium text-gray-600 dark:text-gray-300 backdrop-blur-sm">
                    <Clock className="h-3 w-3" aria-hidden="true" />
                    {program.duration}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                  {program.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                  {program.shortDescription}
                </p>

                <ul className="mb-6 space-y-2" role="list">
                  {program.features.slice(0, 4).map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <span className={`mt-0.5 h-1.5 w-1.5 rounded-full ${colors.iconColor} flex-shrink-0`} aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/program/${program.slug.current}`}
                  className={`relative inline-flex items-center justify-center gap-2 w-full rounded-xl border-2 font-semibold text-sm py-3 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 ${colors.iconBg} ${colors.iconColor} border-transparent ${colors.btnHover} text-white`}
                >
                  Lihat Detail
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </article>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/program"
            className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-teal-300 dark:border-teal-600 bg-teal-50 dark:bg-teal-900/20 px-8 py-4 text-lg font-semibold text-teal-700 dark:text-teal-300 hover:bg-teal-100 dark:hover:bg-teal-900/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
          >
            Lihat Semua Program
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export function ProgramsSection() {
  return <ProgramsSectionContent />
}