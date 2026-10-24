'use client'

import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import { getTeachers } from '@/lib/sanity/queries'
import { GraduationCap, Award, Heart, Users, Sparkles, BookOpen, MessageSquare, Globe, Star, Shield, ChevronRight, Zap, Brain, Palette, Dumbbell, Microscope, Music, Stethoscope } from 'lucide-react'
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
    name: 'Vivid Teal',
    bg: 'bg-gradient-to-br from-teal-100 via-cyan-100 to-emerald-100 dark:from-teal-900/40 dark:via-cyan-900/40 dark:to-emerald-900/40',
    border: 'border-teal-300/60 dark:border-teal-700/60',
    hoverBorder: 'hover:border-teal-400 dark:hover:border-teal-600',
    iconBg: 'bg-gradient-to-br from-teal-400 to-cyan-400 dark:from-teal-700 dark:to-cyan-700',
    iconColor: 'text-white',
    badgeBg: 'bg-gradient-to-r from-teal-400 to-cyan-400',
    badgeBorder: 'border-teal-300/50 dark:border-teal-700/50',
    cardBorder: 'border-teal-300/60 dark:border-teal-700/60 hover:border-teal-400 dark:hover:border-teal-600',
    cardBg: 'bg-gradient-to-br from-teal-100 via-cyan-100 to-emerald-100 dark:from-teal-900/40 dark:via-cyan-900/40 dark:to-emerald-900/40',
    btnBg: 'bg-gradient-to-r from-teal-500 to-cyan-500',
    btnBorder: 'border-teal-600',
    glowColor: 'shadow-teal-400/40',
    glowColorHover: 'shadow-teal-500/60',
    tilt: 'rotate-[-2deg]',
    speechBubble: 'Halo! Mari Belajar Bersama 👋',
    shimmerColor: 'from-teal-300/30 via-transparent to-cyan-300/30',
    accentColor: 'text-teal-600 dark:text-teal-400',
  },
  {
    name: 'Electric Emerald',
    bg: 'bg-gradient-to-br from-emerald-100 via-green-100 to-teal-100 dark:from-emerald-900/40 dark:via-green-900/40 dark:to-teal-900/40',
    border: 'border-emerald-300/60 dark:border-emerald-700/60',
    hoverBorder: 'hover:border-emerald-400 dark:hover:border-emerald-600',
    iconBg: 'bg-gradient-to-br from-emerald-400 to-green-400 dark:from-emerald-700 dark:to-green-700',
    iconColor: 'text-white',
    badgeBg: 'bg-gradient-to-r from-emerald-400 to-green-400',
    badgeBorder: 'border-emerald-300/50 dark:border-emerald-700/50',
    cardBorder: 'border-emerald-300/60 dark:border-emerald-700/60 hover:border-emerald-400 dark:hover:border-emerald-600',
    cardBg: 'bg-gradient-to-br from-emerald-100 via-green-100 to-teal-100 dark:from-emerald-900/40 dark:via-green-900/40 dark:to-teal-900/40',
    btnBg: 'bg-gradient-to-r from-emerald-500 to-green-500',
    btnBorder: 'border-emerald-600',
    glowColor: 'shadow-emerald-400/40',
    glowColorHover: 'shadow-emerald-500/60',
    tilt: 'rotate-[2deg]',
    speechBubble: 'Ayo Eksplorasi Dunia! 🌟',
    shimmerColor: 'from-emerald-300/30 via-transparent to-green-300/30',
    accentColor: 'text-emerald-600 dark:text-emerald-400',
  },
  {
    name: 'Vivid Sky',
    bg: 'bg-gradient-to-br from-sky-100 via-cyan-100 to-blue-100 dark:from-sky-900/40 dark:via-cyan-900/40 dark:to-blue-900/40',
    border: 'border-sky-300/60 dark:border-sky-700/60',
    hoverBorder: 'hover:border-sky-400 dark:hover:border-sky-600',
    iconBg: 'bg-gradient-to-br from-sky-400 to-cyan-400 dark:from-sky-700 dark:to-cyan-700',
    iconColor: 'text-white',
    badgeBg: 'bg-gradient-to-r from-sky-400 to-cyan-400',
    badgeBorder: 'border-sky-300/50 dark:border-sky-700/50',
    cardBorder: 'border-sky-300/60 dark:border-sky-700/60 hover:border-sky-400 dark:hover:border-sky-600',
    cardBg: 'bg-gradient-to-br from-sky-100 via-cyan-100 to-blue-100 dark:from-sky-900/40 dark:via-cyan-900/40 dark:to-blue-900/40',
    btnBg: 'bg-gradient-to-r from-sky-500 to-cyan-500',
    btnBorder: 'border-sky-600',
    glowColor: 'shadow-sky-400/40',
    glowColorHover: 'shadow-sky-500/60',
    tilt: 'rotate-[-1deg]',
    speechBubble: 'Pintar itu Menyenangkan! 📚',
    shimmerColor: 'from-sky-300/30 via-transparent to-cyan-300/30',
    accentColor: 'text-sky-600 dark:text-sky-400',
  },
  {
    name: 'Royal Purple',
    bg: 'bg-gradient-to-br from-purple-100 via-violet-100 to-fuchsia-100 dark:from-purple-900/40 dark:via-violet-900/40 dark:to-fuchsia-900/40',
    border: 'border-purple-300/60 dark:border-purple-700/60',
    hoverBorder: 'hover:border-purple-400 dark:hover:border-purple-600',
    iconBg: 'bg-gradient-to-br from-purple-400 to-violet-400 dark:from-purple-700 dark:to-violet-700',
    iconColor: 'text-white',
    badgeBg: 'bg-gradient-to-r from-purple-400 to-violet-400',
    badgeBorder: 'border-purple-300/50 dark:border-purple-700/50',
    cardBorder: 'border-purple-300/60 dark:border-purple-700/60 hover:border-purple-400 dark:hover:border-purple-600',
    cardBg: 'bg-gradient-to-br from-purple-100 via-violet-100 to-fuchsia-100 dark:from-purple-900/40 dark:via-violet-900/40 dark:to-fuchsia-900/40',
    btnBg: 'bg-gradient-to-r from-purple-500 to-violet-500',
    btnBorder: 'border-purple-600',
    glowColor: 'shadow-purple-400/40',
    glowColorHover: 'shadow-purple-500/60',
    tilt: 'rotate-[1deg]',
    speechBubble: 'Setiap Anak Istimewa! 💜',
    shimmerColor: 'from-purple-300/30 via-transparent to-violet-300/30',
    accentColor: 'text-purple-600 dark:text-purple-400',
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
    cardBorder: 'border-amber-300/60 dark:border-amber-700/60 hover:border-amber-400 dark:hover:border-amber-600',
    cardBg: 'bg-gradient-to-br from-amber-100 via-yellow-100 to-orange-100 dark:from-amber-900/40 dark:via-yellow-900/40 dark:to-orange-900/40',
    btnBg: 'bg-gradient-to-r from-amber-500 to-yellow-500',
    btnBorder: 'border-amber-600',
    glowColor: 'shadow-amber-400/40',
    glowColorHover: 'shadow-amber-500/60',
    tilt: 'rotate-[-2deg]',
    speechBubble: 'Gerak & Bersenyum! 🎨',
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
    cardBorder: 'border-pink-300/60 dark:border-pink-700/60 hover:border-pink-400 dark:hover:border-pink-600',
    cardBg: 'bg-gradient-to-br from-pink-100 via-rose-100 to-fuchsia-100 dark:from-pink-900/40 dark:via-rose-900/40 dark:to-fuchsia-900/40',
    btnBg: 'bg-gradient-to-r from-pink-500 to-rose-500',
    btnBorder: 'border-pink-600',
    glowColor: 'shadow-pink-400/40',
    glowColorHover: 'shadow-pink-500/60',
    tilt: 'rotate-[2deg]',
    speechBubble: 'Musik Membuat Bahagia! 🎵',
    shimmerColor: 'from-pink-300/30 via-transparent to-rose-300/30',
    accentColor: 'text-pink-600 dark:text-pink-400',
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
    <section className="relative px-4 py-20 sm:py-24 lg:py-32 bg-gradient-to-b from-amber-50 via-orange-50 to-pink-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" aria-labelledby="teachers-title">
      <FloatingOrnaments count={35} variant="section" />
      
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute top-20 left-10 w-[300px] h-[300px] rounded-full bg-gradient-to-br from-purple-300/30 via-violet-300/20 to-fuchsia-300/30 blur-3xl animate-float-rotate" />
        <div className="absolute bottom-20 right-10 w-[300px] h-[300px] rounded-full bg-gradient-to-br from-pink-300/30 via-rose-300/20 to-fuchsia-300/30 blur-3xl animate-float-rotate" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-purple-200/15 to-pink-200/15 blur-3xl animate-pulse-slow" />
        <div className="absolute inset-0 bg-[radial-gradient(#fde047_1px,transparent_1px)] [background-size:20px_20px] opacity-10 animate-shimmer" />
        <div className="absolute inset-0 bg-gradient-to-b from-amber-400/3 via-transparent to-pink-400/3" />
      </div>

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400/90 via-orange-400/90 to-pink-400/90 px-6 py-3 text-sm font-black text-slate-950 backdrop-blur-sm mb-4 border-2 border-amber-300 shadow-[0_8px_32px_rgba(251,191,36,0.4)] rotate-[-2deg] animate-bounce-slow">
            <Sparkles className="h-5 w-5 animate-bounce" />
            Tim Pendidik
          </span>
          <h2 id="teachers-title" className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-4">
            Tim Pengajar
            <span className="block bg-gradient-to-r from-purple-500 via-pink-500 to-teal-500 bg-clip-text text-transparent">
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
                className={`group relative p-6 rounded-[36px] border-4 transition-all duration-700 ${theme.cardBg} ${theme.cardBorder} ${theme.hoverBorder}`}
                style={{ 
                  transform: index % 2 === 0 ? 'rotate(-1.5deg)' : 'rotate(1.5deg)',
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <FloatingOrnaments count={6} variant="card" className="pointer-events-none" />
                
                {/* Glossy highlight overlay */}
                <div className="absolute inset-0 rounded-[36px] bg-gradient-to-b from-white/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 rounded-[36px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: theme.shimmerColor }} />
                <div className="absolute inset-0 rounded-[36px] bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative mb-5">
                  <div className="aspect-square w-full max-w-xs mx-auto overflow-hidden rounded-[28px] bg-slate-100 dark:bg-slate-800 border-4 border-white/50 dark:border-slate-700/50 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.2)]">
                    {teacher.photo ? (
                      (() => {
                        const imageUrl = urlFor(teacher.photo)
                        return imageUrl ? (
                          <Image
                            src={imageUrl.width(400).height(400).auto('format').quality(85).url()}
                            alt={teacher.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full w-full">
                            <div className={`h-32 w-32 rounded-full ${theme.iconBg} flex items-center justify-center border-4 border-white/50 dark:border-slate-700/50 shadow-[0_8px_24px_rgba(0,0,0,0.2),_inset_0_2px_0_rgba(255,255,255,0.3)]`}>
                              <Users className={`h-16 w-16 ${theme.iconColor} drop-shadow-[0_2px_8px_rgba(0,0,0,0.2)]`} aria-hidden="true" />
                            </div>
                          </div>
                        )
                      })()
                    ) : (
                      <div className="flex items-center justify-center h-full w-full">
                        <div className={`h-32 w-32 rounded-full ${theme.iconBg} flex items-center justify-center border-4 border-white/50 dark:border-slate-700/50 shadow-[0_8px_24px_rgba(0,0,0,0.2),_inset_0_2px_0_rgba(255,255,255,0.3)]`}>
                          <Users className={`h-16 w-16 ${theme.iconColor} drop-shadow-[0_2px_8px_rgba(0,0,0,0.2)]`} aria-hidden="true" />
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
                          className="group relative p-3 rounded-full bg-white/95 dark:bg-slate-800/95 text-sky-600 dark:text-sky-400 hover:bg-sky-500 hover:text-white transition-all duration-300 shadow-[0_8px_24px_rgba(14,165,233,0.4)]"
                          aria-label={`LinkedIn ${teacher.name}`}
                        >
                          <Globe className="h-5 w-5 transition-transform group-hover:scale-110 group-hover:rotate-12" aria-hidden="true" />
                          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-sky-100/40 to-transparent animate-shimmer" />
                        </a>
                      )}
                      {teacher.socialMedia.instagram && (
                        <a
                          href={teacher.socialMedia.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative p-3 rounded-full bg-white/95 dark:bg-slate-800/95 text-pink-600 dark:text-pink-400 hover:bg-pink-500 hover:text-white transition-all duration-300 shadow-[0_8px_24px_rgba(244,114,182,0.4)]"
                          aria-label={`Instagram ${teacher.name}`}
                        >
                          <MessageSquare className="h-5 w-5 transition-transform group-hover:scale-110 group-hover:rotate-12" aria-hidden="true" />
                          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-pink-100/40 to-transparent animate-shimmer" />
                        </a>
                      )}
                    </div>
                  )}

                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className={`bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-[16px] px-4 py-2 shadow-[0_8px_24px_rgba(0,0,0,0.2)] border-2 ${theme.badgeBorder} text-sm font-bold ${theme.accentColor} animate-bounce-in`}>
                      {theme.speechBubble}
                    </div>
                  </div>

                  <Star className="absolute top-3 left-3 h-7 w-7 text-amber-300/90 animate-pulse-glow drop-shadow-[0_0_12px_rgba(251,191,36,0.8)]" aria-hidden="true" />
                  <Sparkles className="absolute bottom-3 right-3 h-5 w-5 text-pink-300/80 animate-pulse-glow" aria-hidden="true" />
                </div>

                <div className="text-center mb-4">
                  <h3 className="text-xl font-black text-slate-900 dark:text-white drop-shadow-[0_2px_8px_rgba(251,191,36,0.15)]">
                    {teacher.name}
                  </h3>
                  <p className={`text-sm font-black mt-1 ${theme.accentColor}`}>
                    {teacher.role}
                  </p>
                </div>

                <div className="mb-4 flex flex-wrap justify-center gap-1.5">
                  {teacher.specialties.slice(0, 3).map((specialty, i) => {
                    const IconComponent = specialtyIcons[specialty] || Sparkles
                    return (
                      <span
                        key={i}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 font-bold text-xs ${theme.badgeBg} ${theme.badgeBorder} shadow-[0_4px_12px_rgba(0,0,0,0.15)] text-white`}
                      >
                        <IconComponent className="h-3.5 w-3.5" aria-hidden="true" />
                        {specialty}
                      </span>
                    )
                  })}
                </div>

                <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400 border-t border-slate-200/50 dark:border-slate-700/50 pt-4">
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
                  className={`mt-4 group relative block w-full text-center rounded-full border-4 font-black text-sm py-3 transition-all duration-500 focus:outline-none focus:ring-4 focus:ring-emerald-300 focus:ring-offset-2 ${theme.btnBg} ${theme.btnBorder} text-white ${theme.glowColor} ${theme.glowColorHover} hover:shadow-[0_16px_40px_-8px_rgba(0,0,0,0.25)] hover:-translate-y-1.5 active:translate-y-0.5 active:shadow-[0_6px_16px_-4px_rgba(0,0,0,0.2)]`}
                  style={{ borderBottomWidth: '8px' }}
                >
                  <span className="relative z-10">Lihat Profil</span>
                  <ChevronRight className="h-4 w-4 inline-block ml-2 transition-transform group-hover:translate-x-1 group-hover:rotate-12" aria-hidden="true" />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                </a>
              </article>
            )
          })}
        </div>

        <div className="mt-16 text-center">
          <a
            href="/guru"
            className="group relative inline-flex items-center justify-center gap-3 rounded-full border-4 border-purple-300 dark:border-purple-700 border-t-2 border-purple-100/50 bg-gradient-to-r from-purple-50 via-white to-pink-50 dark:from-purple-900/30 dark:via-slate-900 dark:to-pink-900/30 px-10 py-4 text-lg font-black text-purple-700 dark:text-purple-300 hover:bg-gradient-to-r hover:from-purple-100 hover:to-pink-100 dark:hover:from-purple-900/40 dark:hover:to-pink-900/40 hover:border-purple-400 dark:hover:border-purple-600 hover:shadow-[0_16px_40px_-8px_rgba(168,85,247,0.3)] hover:-translate-y-1 transition-all duration-500 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:ring-offset-2"
          >
            <span className="relative z-10">Kenal Tim Kami</span>
            <span className="h-6 w-6 transition-transform group-hover:translate-x-1 group-hover:rotate-12">→</span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-purple-100/40 to-transparent animate-shimmer" />
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