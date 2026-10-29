import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getTeacherBySlug, getTeachers, urlFor } from '@/lib/sanity/queries'
import { Teacher } from '@/types'
import { teachersFallback } from '@/lib/fallback-data'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Card, CardIcon, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { GraduationCap, Award, Heart, Users, Sparkles as SparklesIcon, BookOpen, MessageSquare, Globe, Shield, ChevronRight, Stethoscope, Music, Leaf, Palette } from 'lucide-react'

interface TeacherPageProps {
  params: Promise<{ slug: string }>
}

async function getTeacherData(slug: string): Promise<Teacher | null> {
  const teacher = await getTeacherBySlug(slug)
  if (teacher) return teacher

  return teachersFallback.find((t) => t.slug.current === slug) || null
}

async function getAllTeacherSlugs(): Promise<string[]> {
  const teachers = await getTeachers()
  if (teachers.length > 0) {
    return teachers.map((t: Teacher) => t.slug.current)
  }
  return teachersFallback.map((t) => t.slug.current)
}

export async function generateStaticParams() {
  const slugs = await getAllTeacherSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: TeacherPageProps): Promise<Metadata> {
  const { slug } = await params
  const teacher = await getTeacherData(slug)

  if (!teacher) {
    return {
      title: 'Guru Tidak Ditemukan',
      description: 'Profil guru yang Anda cari tidak ditemukan.',
    }
  }

  const title = `${teacher.name} - ${teacher.role} | MXDP`
  const bioObj = teacher.bio as Record<string, unknown> | undefined
  const description = bioObj && 'blocks' in bioObj
    ? ((bioObj.blocks as Array<Record<string, unknown>>)
        .find((b) => b._type === 'block')
        ?.children as Array<{ text: string }> | undefined
    )?.map((c) => c.text).join('') || `Profil ${teacher.name}, ${teacher.role} di MXDP.`
    : `Profil ${teacher.name}, ${teacher.role} di MXDP.`
  const ogImage = teacher.photo ? urlFor(teacher.photo)?.width(1200).height(630).url() : '/og-image.jpg'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'profile',
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630, alt: teacher.name }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImage ? [ogImage] : [],
    },
  }
}

const teacherThemes = [
  {
    variant: 'mint' as const,
    blob: 3 as const,
    icon: Users,
    badgeVariant: 'clay-mint' as const,
  },
  {
    variant: 'peach' as const,
    blob: 5 as const,
    icon: SparklesIcon,
    badgeVariant: 'clay-peach' as const,
  },
  {
    variant: 'blue' as const,
    blob: 4 as const,
    icon: Shield,
    badgeVariant: 'clay-blue' as const,
  },
  {
    variant: 'lavender' as const,
    blob: 7 as const,
    icon: Award,
    badgeVariant: 'clay-lavender' as const,
  },
  {
    variant: 'peach' as const,
    blob: 1 as const,
    icon: Heart,
    badgeVariant: 'clay-peach' as const,
  },
  {
    variant: 'pink' as const,
    blob: 2 as const,
    icon: Heart,
    badgeVariant: 'clay-pink' as const,
  },
]

const specialtyIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "Literasi Awal": BookOpen,
  "STEAM untuk Anak": SparklesIcon,
  "Art Therapy": Palette,
  "Matematika Anak": GraduationCap,
  "Pemecahan Masalah": SparklesIcon,
  "Character Building": Heart,
  "Psikologi Perkembangan": Stethoscope,
  "Inklusi Pendidikan": Award,
  "Emotional Coaching": Heart,
  "Motorik Kasar": Users,
  "Ekspresi Seni": Palette,
  "Musik & Gerak": Music,
  "Pengenalan Bahasa": BookOpen,
  "Sensory Play": Leaf,
  "Early Literacy": GraduationCap,
  "Manajemen Sekolah": Award,
  "Kurikulum PAUD": BookOpen,
  "Parenting Education": Heart,
}

function getTeacherImage(teacher: Teacher, theme: typeof teacherThemes[0]) {
  if (teacher.photo) {
    const imageUrl = urlFor(teacher.photo)
    if (imageUrl) {
      return (
        <Image
          src={imageUrl.width(400).height(400).auto("format").quality(85).url()}
          alt={teacher.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      )
    }
    return (
      <div className="flex items-center justify-center h-full w-full">
        <CardIcon color={theme.variant}><theme.icon className="h-10 w-10" aria-hidden="true" /></CardIcon>
      </div>
    )
  }
  return (
    <div className="flex items-center justify-center h-full w-full">
      <CardIcon color={theme.variant}><theme.icon className="h-10 w-10" aria-hidden="true" /></CardIcon>
    </div>
  )
}

function TeacherDetailContent({ teacher }: { teacher: Teacher }) {
  const theme = teacherThemes[teacher.order % teacherThemes.length] || teacherThemes[0]

  return (
    <article className="min-h-screen">
      {/* Hero Section - Claymorphism */}
      <section className="relative min-h-[50vh] w-full overflow-hidden flex items-end" data-sc-in data-sc-cue="0 0.6">
        {getTeacherImage(teacher, theme)}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--sc-canvas)]/95 via-[var(--sc-canvas)]/50 to-transparent" />
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 pb-10 sm:pb-16 lg:pb-24">
          <div className="mx-auto max-w-4xl">
            <Badge variant="clay-lavender" className="mb-4 animate-bounce">
              <SparklesIcon className="h-3.5 w-3.5" aria-hidden="true" />
              Halo!
            </Badge>
            <h1 className="sc-display sc-display--xl mb-4">
              {teacher.name}
            </h1>
            <p className="sc-body text-lg mb-6 text-[var(--sc-ink-soft)]">
              {teacher.role}
            </p>
            {teacher.socialMedia && (teacher.socialMedia.linkedin || teacher.socialMedia.instagram) && (
              <div className="flex items-center gap-4">
                {teacher.socialMedia.linkedin && (
                  <a
                    href={teacher.socialMedia.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="clay-pill clay-pill-secondary hover:bg-[var(--c-blue)] hover:text-white transition-all duration-300"
                    aria-label={"LinkedIn " + teacher.name}
                  >
                    <Globe className="h-5 w-5" aria-hidden="true" />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                )}
                {teacher.socialMedia.instagram && (
                  <a
                    href={teacher.socialMedia.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="clay-pill clay-pill-secondary hover:bg-[var(--c-pink)] hover:text-white transition-all duration-300"
                    aria-label={"Instagram " + teacher.name}
                  >
                    <MessageSquare className="h-5 w-5" aria-hidden="true" />
                    <span className="sr-only">Instagram</span>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32" data-sc-in data-sc-cue="0.1 0.7">
        <div className="mx-auto max-w-4xl">
          {/* Bio */}
          {teacher.bio && (
            <div className="prose prose-lg dark:prose-invert max-w-none mb-16" data-sc-in data-sc-cue="0.1 0.6">
              <h2 className="sc-display sc-display--lg mb-6">
                Tentang {teacher.name.split(' ')[0]}
              </h2>
              <div className="sc-body leading-relaxed">
                {'blocks' in (teacher.bio as Record<string, unknown>)
                  ? ((teacher.bio as Record<string, unknown>).blocks as Array<Record<string, unknown>>)
                      .filter((block) => block._type === 'block')
                      .map((block, index: number) => (
                        <p key={index} className="mb-4">
                          {(block.children as Array<{ text: string }>)?.map((child) => child.text).join('') || ''}
                        </p>
                      ))
                  : null}
              </div>
            </div>
          )}

          {/* Education & Experience Grid */}
          <div className="grid gap-8 lg:grid-cols-2 mb-16" data-sc-in data-sc-stagger="100">
            {/* Education */}
            {teacher.education && teacher.education.length > 0 && (
              <Card variant="mint" blob={3} hoverable={false} data-sc-cue="0.1 0.4">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-6 w-6 text-[var(--c-mint)]" aria-hidden="true" />
                    Pendidikan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {teacher.education.map((edu, index) => (
                      <li key={index} className="flex items-start gap-3 sc-body">
                        <div className="flex-shrink-0 mt-1.5 h-2 w-2 rounded-full" style={{ background: 'var(--c-mint)' }} />
                        <span>{edu}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Experience */}
            {teacher.experience && teacher.experience.length > 0 && (
              <Card variant="lavender" blob={7} hoverable={false} data-sc-cue="0.15 0.45">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-6 w-6 text-[var(--c-lavender)]" aria-hidden="true" />
                    Pengalaman
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {teacher.experience.map((exp, index) => (
                      <li key={index} className="flex items-start gap-3 sc-body">
                        <div className="flex-shrink-0 mt-1.5 h-2 w-2 rounded-full" style={{ background: 'var(--c-lavender)' }} />
                        <span>{exp}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Specialties */}
          {teacher.specialties && teacher.specialties.length > 0 && (
            <div className="mb-16" data-sc-in data-sc-stagger="100">
              <div className="text-center mb-10">
                <h2 className="sc-display sc-display--lg mb-4">
                  Keahlian & Spesialisasi
                </h2>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {teacher.specialties.map((spec, index) => {
                  const IconComponent = specialtyIcons[spec] || SparklesIcon
                  return (
                    <Badge key={index} variant="clay-mint" className="gap-1.5 px-4 py-2 text-sm font-medium">
                      <IconComponent className="h-4 w-4" aria-hidden="true" />
                      {spec}
                    </Badge>
                  )
                })}
              </div>
            </div>
          )}

          {/* CTA Section */}
          <div className="relative clay-card clay-peach blob-2 p-8 sm:p-12 text-center" data-sc-in data-sc-cue="0.8 1">
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-[var(--c-peach)] rounded-full opacity-30 blur-xl"></div>
            <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-[var(--c-mint)] blob-5 opacity-20 blur-xl"></div>
            <h2 className="sc-display sc-display--xl mb-4 relative z-10">
              Ingin Mengenal Tim Kami Lebih Dekat?
            </h2>
            <p className="sc-body text-lg mb-8 max-w-2xl mx-auto relative z-10">
              Datang langsung ke sekolah kami dan temui para pengajar berdedikasi yang siap mendampingi perjalanan pendidikan anak Anda.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
              <Button variant="clay-primary" size="lg" asChild>
                <Link href="/kontak" className="flex items-center justify-center gap-2">
                  Jadwalkan Kunjungan
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </Link>
              </Button>
              <Button variant="clay-secondary" size="lg" asChild>
                <Link href="/guru" className="flex items-center justify-center gap-2">
                  Lihat Semua Guru
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </article>
  )
}

export default async function TeacherDetailPage({ params }: TeacherPageProps) {
  const { slug } = await params
  const teacher = await getTeacherData(slug)

  if (!teacher) {
    notFound()
  }

  return (
    <>
      <Navbar />
      <TeacherDetailContent teacher={teacher} />
      <Footer />
    </>
  )
}