'use client'

import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import { getTeachers } from '@/lib/sanity/queries'
import { GraduationCap, Award, Heart, Users, Sparkles, BookOpen, MessageSquare, Globe, Star, Shield, ChevronRight } from 'lucide-react'
import { FloatingOrnaments } from '@/components/ui/FloatingOrnaments'

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

const teacherThemes = [
  {
    name: 'Minty Teal',
    iconBg: 'bg-teal-100 dark:bg-teal-900/30',
    iconColor: 'text-teal-600 dark:text-teal-400',
    ring: 'ring-teal-200 dark:ring-teal-800',
    badgeBg: 'bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300',
    badgeBorder: 'border-teal-200 dark:border-teal-800',
    cardBorder: 'border-teal-200 dark:border-teal-800 hover:border-teal-400 dark:hover:border-teal-600',
    cardBg: 'bg-[#E6FFFA]',
    btnBg: 'bg-teal-500 hover:bg-teal-400',
    btnBorder: 'border-teal-600',
    glowColor: 'shadow-teal-200',
    glowColorHover: 'shadow-teal-300',
    tilt: 'rotate-[-2deg]',
    speechBubble: 'Halo! Mari Belajar Bersama 👋',
  },
  {
    name: 'Emerald Green',
    iconBg: 'bg-emerald-100 dark:bg-emerald-900/30',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    ring: 'ring-emerald-200 dark:ring-emerald-800',
    badgeBg: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
    badgeBorder: 'border-emerald-200 dark:border-emerald-800',
    cardBorder: 'border-emerald-200 dark:border-emerald-800 hover:border-emerald-400 dark:hover:border-emerald-600',
    cardBg: 'bg-[#ECFDF5]',
    btnBg: 'bg-emerald-500 hover:bg-emerald-400',
    btnBorder: 'border-emerald-600',
    glowColor: 'shadow-emerald-200',
    glowColorHover: 'shadow-emerald-300',
    tilt: 'rotate-[2deg]',
    speechBubble: 'Ayo Eksplorasi Dunia! 🌟',
  },
  {
    name: 'Sky Blue',
    iconBg: 'bg-sky-100 dark:bg-sky-900/30',
    iconColor: 'text-sky-600 dark:text-sky-400',
    ring: 'ring-sky-200 dark:ring-sky-800',
    badgeBg: 'bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300',
    badgeBorder: 'border-sky-200 dark:border-sky-800',
    cardBorder: 'border-sky-200 dark:border-sky-800 hover:border-sky-400 dark:hover:border-sky-600',
    cardBg: 'bg-[#F0F9FF]',
    btnBg: 'bg-sky-500 hover:bg-sky-400',
    btnBorder: 'border-sky-600',
    glowColor: 'shadow-sky-200',
    glowColorHover: 'shadow-sky-300',
    tilt: 'rotate-[-1deg]',
    speechBubble: 'Pintar itu Menyenangkan! 📚',
  },
  {
    name: 'Lavender Purple',
    iconBg: 'bg-purple-100 dark:bg-purple-900/30',
    iconColor: 'text-purple-600 dark:text-purple-400',
    ring: 'ring-purple-200 dark:ring-purple-800',
    badgeBg: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300',
    badgeBorder: 'border-purple-200 dark:border-purple-800',
    cardBorder: 'border-purple-200 dark:border-purple-800 hover:border-purple-400 dark:hover:border-purple-600',
    cardBg: 'bg-[#F5F3FF]',
    btnBg: 'bg-purple-500 hover:bg-purple-400',
    btnBorder: 'border-purple-600',
    glowColor: 'shadow-purple-200',
    glowColorHover: 'shadow-purple-300',
    tilt: 'rotate-[1deg]',
    speechBubble: 'Setiap Anak Istimewa! 💜',
  },
  {
    name: 'Butter Yellow',
    iconBg: 'bg-amber-100 dark:bg-amber-900/30',
    iconColor: 'text-amber-600 dark:text-amber-400',
    ring: 'ring-amber-200 dark:ring-amber-800',
    badgeBg: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
    badgeBorder: 'border-amber-200 dark:border-amber-800',
    cardBorder: 'border-amber-200 dark:border-amber-800 hover:border-amber-400 dark:hover:border-amber-600',
    cardBg: 'bg-[#FEFCE8]',
    btnBg: 'bg-amber-500 hover:bg-amber-400',
    btnBorder: 'border-amber-600',
    glowColor: 'shadow-amber-200',
    glowColorHover: 'shadow-amber-300',
    tilt: 'rotate-[-2deg]',
    speechBubble: 'Gerak & Bersenyum! 🎨',
  },
  {
    name: 'Bubblegum Pink',
    iconBg: 'bg-pink-100 dark:bg-pink-900/30',
    iconColor: 'text-pink-600 dark:text-pink-400',
    ring: 'ring-pink-200 dark:ring-pink-800',
    badgeBg: 'bg-pink-100 text-pink-800 dark:bg-pink-900/40 dark:text-pink-300',
    badgeBorder: 'border-pink-200 dark:border-pink-800',
    cardBorder: 'border-pink-200 dark:border-pink-800 hover:border-pink-400 dark:hover:border-pink-600',
    cardBg: 'bg-[#FDF2F8]',
    btnBg: 'bg-pink-500 hover:bg-pink-400',
    btnBorder: 'border-pink-600',
    glowColor: 'shadow-pink-200',
    glowColorHover: 'shadow-pink-300',
    tilt: 'rotate-[2deg]',
    speechBubble: 'Musik Membuat Bahagia! 🎵',
  },
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
    <section className="relative px-4 py-20 sm:py-24 lg:py-32 bg-gradient-to-b from-[#FFFDF9] via-[#FFF8F0] to-[#F0F9FF] dark:from-gray-950 dark:via-gray-900 dark:to-gray-950" aria-labelledby="teachers-title">
      <FloatingOrnaments count={25} variant="section" />
      
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-purple-200/40 blur-3xl dark:bg-purple-900/20" />
        <div className="absolute bottom-20 right-10 w-72 h-72 rounded-full bg-pink-200/40 blur-3xl dark:bg-pink-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-10" />
      </div>

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 rounded-full bg-purple-100/90 px-5 py-2 text-sm font-bold text-purple-800 dark:bg-purple-900/40 dark:text-purple-300 backdrop-blur-sm mb-4 border-2 border-purple-200 dark:border-purple-800 shadow-lg shadow-purple-200/50 rotate-[-2deg]">
            <Sparkles className="h-4 w-4 animate-bounce" />
            Tim Pendidik
          </span>
          <h2 id="teachers-title" className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-4">
            Tim Pengajar
            <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-teal-600 bg-clip-text text-transparent">
              Berpengalaman & Berdedikasi
            </span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 font-medium">
            Para pendidik kami bersertifikat, berpengalaman, dan memiliki hati yang peduli untuk mengembangkan potensi setiap anak.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {displayTeachers.map((teacher, index) => {
            const theme = teacherThemes[index % teacherThemes.length]

            return (
              <article
                key={teacher._id}
                className={`group relative p-6 rounded-[32px] border-4 transition-all duration-500 hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.15)] hover:-translate-y-3 ${theme.cardBg} ${theme.cardBorder}`}
                style={{ transform: index % 2 === 0 ? 'rotate(-1deg)' : 'rotate(1deg)' }}
              >
                <FloatingOrnaments count={4} variant="card" className="pointer-events-none" />
                
                <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative mb-5">
                  <div className="aspect-square w-full max-w-xs mx-auto overflow-hidden rounded-[24px] bg-slate-100 dark:bg-slate-800 border-4 border-white/50 dark:border-slate-700/50 shadow-xl">
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
                            <div className={`h-28 w-28 rounded-full ${theme.iconBg} flex items-center justify-center border-4 border-white/50 dark:border-slate-700/50`}>
                              <Users className={`h-14 w-14 ${theme.iconColor}`} aria-hidden="true" />
                            </div>
                          </div>
                        )
                      })()
                    ) : (
                      <div className="flex items-center justify-center h-full w-full">
                        <div className={`h-28 w-28 rounded-full ${theme.iconBg} flex items-center justify-center border-4 border-white/50 dark:border-slate-700/50`}>
                          <Users className={`h-14 w-14 ${theme.iconColor}`} aria-hidden="true" />
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
                          className="p-3 rounded-full bg-white/95 dark:bg-slate-800/95 text-sky-600 dark:text-sky-400 hover:bg-sky-500 hover:text-white transition-all duration-300 shadow-xl shadow-sky-500/30"
                          aria-label={`LinkedIn ${teacher.name}`}
                        >
                          <Globe className="h-5 w-5" aria-hidden="true" />
                        </a>
                      )}
                      {teacher.socialMedia.instagram && (
                        <a
                          href={teacher.socialMedia.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 rounded-full bg-white/95 dark:bg-slate-800/95 text-pink-600 dark:text-pink-400 hover:bg-pink-500 hover:text-white transition-all duration-300 shadow-xl shadow-pink-500/30"
                          aria-label={`Instagram ${teacher.name}`}
                        >
                          <MessageSquare className="h-5 w-5" aria-hidden="true" />
                        </a>
                      )}
                    </div>
                  )}

                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className={`bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-[16px] px-4 py-2 shadow-xl border-2 ${theme.badgeBorder} text-sm font-bold ${theme.iconColor} animate-bounce-in`}>
                      {theme.speechBubble}
                    </div>
                  </div>

                  <Star className="absolute top-3 left-3 h-6 w-6 text-amber-300/80 animate-pulse-slow" aria-hidden="true" />
                </div>

                <div className="text-center mb-4">
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">
                    {teacher.name}
                  </h3>
                  <p className={`text-sm font-black mt-1 ${theme.iconColor}`}>
                    {teacher.role}
                  </p>
                </div>

                <div className="mb-4 flex flex-wrap justify-center gap-1.5">
                  {teacher.specialties.slice(0, 3).map((specialty, i) => {
                    const IconComponent = specialtyIcons[specialty] || Sparkles
                    return (
                      <span
                        key={i}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 font-bold text-xs ${theme.badgeBg} ${theme.badgeBorder} shadow-sm`}
                      >
                        <IconComponent className="h-3.5 w-3.5" aria-hidden="true" />
                        {specialty}
                      </span>
                    )
                  })}
                </div>

                <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700 pt-4">
                  <div className="flex items-center justify-center gap-2 text-xs">
                    <GraduationCap className="h-4 w-4 text-slate-400" aria-hidden="true" />
                    <span>{teacher.education[0]}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-xs">
                    <Award className="h-4 w-4 text-slate-400" aria-hidden="true" />
                    <span>{teacher.experience[0]}</span>
                  </div>
                </div>

                <a
                  href={`/guru/${teacher.slug.current}`}
                  className={`mt-4 block w-full text-center rounded-full border-4 font-black text-sm py-3 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-300 focus:ring-offset-2 ${theme.btnBg} ${theme.btnBorder} text-white ${theme.glowColor} ${theme.glowColorHover} hover:shadow-[0_12px_24px_-6px_rgba(0,0,0,0.2)] hover:-translate-y-1 active:translate-y-0.5 active:shadow-[0_4px_8px_-2px_rgba(0,0,0,0.15)]`}
                >
                  Lihat Profil
                  <ChevronRight className="h-4 w-4 inline-block ml-2" aria-hidden="true" />
                </a>
              </article>
            )
          })}
        </div>

        <div className="mt-16 text-center">
          <a
            href="/guru"
            className="inline-flex items-center justify-center gap-2 rounded-full border-4 border-purple-300 dark:border-purple-700 bg-purple-50 dark:bg-purple-900/20 px-10 py-4 text-lg font-black text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:border-purple-400 dark:hover:border-purple-600 hover:shadow-xl hover:shadow-purple-200/30 hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:ring-offset-2"
          >
            Kenal Tim Kami
            <span className="h-6 w-6">→</span>
          </a>
        </div>
      </div>
      
      <style jsx global>{`
        @keyframes bounce-in {
          0% { opacity: 0; transform: translateX(-50%) scale(0.8); }
          50% { transform: translateX(-50%) scale(1.05); }
          100% { opacity: 1; transform: translateX(-50%) scale(1); }
        }
        .animate-bounce-in { animation: bounce-in 0.4s ease-out; }
      `}</style>
    </section>
  )
}

export function TeachersSection() {
  return <TeachersSectionContent />
}