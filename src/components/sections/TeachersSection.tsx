import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import { getTeachers } from '@/lib/sanity/queries'
import { GraduationCap, Award, Heart, Users, Sparkles, BookOpen, MessageSquare, Globe } from 'lucide-react'

interface Teacher {
  _id: string
  name: string
  slug: { current: string }
  role: string
  bio: any
  photo: any
  education: string[]
  experience: string[]
  specialties: string[]
  socialMedia?: {
    linkedin?: string
    instagram?: string
  }
  order: number
}

const fallbackTeachers: Teacher[] = [
  {
    _id: 'fallback-1',
    name: 'Dra. Siti Rahayu, M.Pd',
    slug: { current: 'siti-rahayu' },
    role: 'Kepala Sekolah',
    bio: [],
    photo: null,
    education: ['S2 Manajemen Pendidikan', 'S1 Pendidikan Guru PAUD'],
    experience: ['15+ Tahun Pengalaman', '5 Tahun Sebagai Kepala Sekolah'],
    specialties: ['Manajemen Sekolah', 'Kurikulum PAUD', 'Parenting Education'],
    socialMedia: { linkedin: '#', instagram: '#' },
    order: 1,
  },
  {
    _id: 'fallback-2',
    name: 'Dewi Lestari, S.Pd',
    slug: { current: 'dewi-lestari' },
    role: 'Guru Kelas TK A',
    bio: [],
    photo: null,
    education: ['S1 Pendidikan Anak Usia Dini'],
    experience: ['8 Tahun Mengajar', 'Sertifikasi Guru'],
    specialties: ['Literasi Awal', 'STEAM untuk Anak', 'Art Therapy'],
    socialMedia: { instagram: '#' },
    order: 2,
  },
  {
    _id: 'fallback-3',
    name: 'Budi Santoso, S.Pd',
    slug: { current: 'budi-santoso' },
    role: 'Guru Kelas TK B',
    bio: [],
    photo: null,
    education: ['S1 Pendidikan Guru TK', 'Sertifikasi Montessori'],
    experience: ['10 Tahun Mengajar', 'Pelatih OSN SD'],
    specialties: ['Matematika Anak', 'Pemecahan Masalah', 'Character Building'],
    socialMedia: { linkedin: '#' },
    order: 3,
  },
  {
    _id: 'fallback-4',
    name: 'Ratna Dewi, S.Psi',
    slug: { current: 'ratna-dewi' },
    role: 'Konselor & Guru Inklusi',
    bio: [],
    photo: null,
    education: ['S1 Psikologi', 'Sertifikasi Konseling Anak'],
    experience: ['7 Tahun Konseling', 'Spesialis Kebutuhan Khusus'],
    specialties: ['Psikologi Perkembangan', 'Inklusi Pendidikan', 'Emotional Coaching'],
    socialMedia: { instagram: '#' },
    order: 4,
  },
  {
    _id: 'fallback-5',
    name: 'Andi Wijaya, S.Pd',
    slug: { current: 'andi-wijaya' },
    role: 'Guru Pendidikan Jasmani & Seni',
    bio: [],
    photo: null,
    education: ['S1 Pendidikan Jasmani', 'Sertifikasi Seni Rupa'],
    experience: ['6 Tahun Mengajar', 'Pelatih Lomba Seni'],
    specialties: ['Motorik Kasar', 'Ekspresi Seni', 'Musik & Gerak'],
    socialMedia: {},
    order: 5,
  },
  {
    _id: 'fallback-6',
    name: 'Maya Sari, S.Pd',
    slug: { current: 'maya-sari' },
    role: 'Guru Kelas Playgroup',
    bio: [],
    photo: null,
    education: ['S1 Pendidikan Anak Usia Dini'],
    experience: ['5 Tahun Mengajar', 'Ahli Music Together'],
    specialties: ['Pengenalan Bahasa', 'Sensory Play', 'Early Literacy'],
    socialMedia: { instagram: '#' },
    order: 6,
  },
]

const teacherColorSchemes = [
  { iconBg: 'bg-teal-100 dark:bg-teal-900/30', iconColor: 'text-teal-600 dark:text-teal-400', ring: 'ring-teal-200 dark:ring-teal-800' },
  { iconBg: 'bg-emerald-100 dark:bg-emerald-900/30', iconColor: 'text-emerald-600 dark:text-emerald-400', ring: 'ring-emerald-200 dark:ring-emerald-800' },
  { iconBg: 'bg-blue-100 dark:bg-blue-900/30', iconColor: 'text-blue-600 dark:text-blue-400', ring: 'ring-blue-200 dark:ring-blue-800' },
  { iconBg: 'bg-purple-100 dark:bg-purple-900/30', iconColor: 'text-purple-600 dark:text-purple-400', ring: 'ring-purple-200 dark:ring-purple-800' },
  { iconBg: 'bg-amber-100 dark:bg-amber-900/30', iconColor: 'text-amber-600 dark:text-amber-400', ring: 'ring-amber-200 dark:ring-amber-800' },
  { iconBg: 'bg-pink-100 dark:bg-pink-900/30', iconColor: 'text-pink-600 dark:text-pink-400', ring: 'ring-pink-200 dark:ring-pink-800' },
]

const specialtyIcons: Record<string, any> = {
  'Literasi Awal': BookOpen,
  'STEAM untuk Anak': Sparkles,
  'Art Therapy': Heart,
  'Matematika Anak': GraduationCap,
  'Pemecahan Masalah': Sparkles,
  'Character Building': Heart,
  'Psikologi Perkembangan': Users,
  'Inklusi Pendidikan': Award,
  'Emotional Coaching': Heart,
  'Motorik Kasar': Users,
  'Ekspresi Seni': Sparkles,
  'Musik & Gerak': Heart,
  'Pengenalan Bahasa': BookOpen,
  'Sensory Play': Sparkles,
  'Early Literacy': GraduationCap,
  'Manajemen Sekolah': Award,
  'Kurikulum PAUD': BookOpen,
  'Parenting Education': Heart,
}

async function TeachersSectionContent() {
  const teachers = (await getTeachers()) as Teacher[] | null
  const displayTeachers = teachers?.length ? teachers : fallbackTeachers

  return (
    <section className="px-4 py-20 sm:py-24 lg:py-28 bg-white dark:bg-gray-950" aria-labelledby="teachers-title">
      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 rounded-full bg-purple-100/80 px-4 py-1.5 text-sm font-medium text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 backdrop-blur-sm mb-4">
            Tim Pendidik
          </span>
          <h2 id="teachers-title" className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Tim Pengajar Berpengalaman & Berdedikasi
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Para pendidik kami bersertifikat, berpengalaman, dan memiliki hati yang peduli untuk mengembangkan potensi setiap anak.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {displayTeachers.map((teacher, index) => {
            const colors = teacherColorSchemes[index % teacherColorSchemes.length]

            return (
              <article
                key={teacher._id}
                className="group relative p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-purple-200 dark:hover:border-purple-800 transition-all duration-500 hover:shadow-xl"
              >
                <div className="relative mb-5">
                  <div className="aspect-square w-full max-w-xs mx-auto overflow-hidden rounded-2xl bg-gray-200 dark:bg-gray-700">
                    {teacher.photo ? (
                      (() => {
                        const imageUrl = urlFor(teacher.photo)
                        return imageUrl ? (
                          <Image
                            src={imageUrl.width(400).height(400).auto('format').quality(85).url()}
                            alt={teacher.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full w-full">
                            <div className={`h-24 w-24 rounded-full ${colors.iconBg} flex items-center justify-center`}>
                              <Users className={`h-12 w-12 ${colors.iconColor}`} aria-hidden="true" />
                            </div>
                          </div>
                        )
                      })()
                    ) : (
                      <div className="flex items-center justify-center h-full w-full">
                        <div className={`h-24 w-24 rounded-full ${colors.iconBg} flex items-center justify-center`}>
                          <Users className={`h-12 w-12 ${colors.iconColor}`} aria-hidden="true" />
                        </div>
                      </div>
                    )}
                  </div>

                  {teacher.socialMedia && (teacher.socialMedia.linkedin || teacher.socialMedia.instagram) && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {teacher.socialMedia.linkedin && (
                        <a
                          href={teacher.socialMedia.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-white/90 dark:bg-gray-800/90 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors shadow-lg backdrop-blur-sm"
                          aria-label={`LinkedIn ${teacher.name}`}
                        >
                          <Globe className="h-4 w-4" aria-hidden="true" />
                        </a>
                      )}
                      {teacher.socialMedia.instagram && (
                        <a
                          href={teacher.socialMedia.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-white/90 dark:bg-gray-800/90 text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors shadow-lg backdrop-blur-sm"
                          aria-label={`Instagram ${teacher.name}`}
                        >
                          <MessageSquare className="h-4 w-4" aria-hidden="true" />
                        </a>
                      )}
                    </div>
                  )}
                </div>

                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {teacher.name}
                  </h3>
                  <p className="text-teal-600 dark:text-teal-400 text-sm font-medium mt-1">
                    {teacher.role}
                  </p>
                </div>

                <div className="mb-4 flex flex-wrap justify-center gap-1.5">
                  {teacher.specialties.slice(0, 3).map((specialty, i) => {
                    const IconComponent = specialtyIcons[specialty] || Sparkles
                    return (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs text-gray-600 dark:text-gray-300"
                      >
                        <IconComponent className="h-3 w-3 text-teal-600 dark:text-teal-400" aria-hidden="true" />
                        {specialty}
                      </span>
                    )
                  })}
                </div>

                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400 border-t border-gray-100 dark:border-gray-800 pt-4">
                  <div className="flex items-center justify-center gap-2 text-xs">
                    <GraduationCap className="h-3.5 w-3.5 text-gray-400" aria-hidden="true" />
                    <span>{teacher.education[0]}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-xs">
                    <Award className="h-3.5 w-3.5 text-gray-400" aria-hidden="true" />
                    <span>{teacher.experience[0]}</span>
                  </div>
                </div>

                <a
                  href={`/guru/${teacher.slug.current}`}
                  className="mt-4 block w-full text-center rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-teal-500/25 hover:from-teal-700 hover:to-emerald-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                >
                  Lihat Profil
                </a>
              </article>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <a
            href="/guru"
            className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-purple-300 dark:border-purple-600 bg-purple-50 dark:bg-purple-900/20 px-8 py-4 text-lg font-semibold text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            Kenal Tim Kami
            <span className="h-5 w-5" aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}

export function TeachersSection() {
  return <TeachersSectionContent />
}