import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getTeacherBySlug, getTeachers, urlFor } from '@/lib/sanity/queries'
import { Teacher } from '@/types'
import { teachersFallback } from '@/lib/fallback-data'

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

function TeacherDetailContent({ teacher }: { teacher: Teacher }) {
  const photoUrl = urlFor(teacher.photo)?.width(600).height(600).url()

  return (
    <article className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[350px] max-h-[500px] w-full overflow-hidden">
        {photoUrl ? (
          <Image
            src={photoUrl}
            alt={teacher.photo.alt || teacher.name}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            quality={85}
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-blue-500 to-purple-600" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 lg:p-16">
          <div className="mx-auto max-w-4xl">
            <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm mb-4">
              {teacher.role}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
              {teacher.name}
            </h1>
            {teacher.socialMedia && (
              <div className="flex items-center gap-4 text-white/80">
                {teacher.socialMedia.linkedin && (
                  <a
                    href={teacher.socialMedia.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 hover:text-white transition-colors"
                    aria-label="LinkedIn"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                )}
                {teacher.socialMedia.instagram && (
                  <a
                    href={teacher.socialMedia.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 hover:text-white transition-colors"
                    aria-label="Instagram"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-.1263-.058-1.69-.072-4.947-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Bio */}
          {teacher.bio && (
            <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Tentang {teacher.name.split(' ')[0]}
              </h2>
              <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
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
          <div className="grid gap-8 lg:grid-cols-2 mb-12">
            {/* Education */}
            {teacher.education && teacher.education.length > 0 && (
              <div className="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Pendidikan
                </h3>
                <ul className="space-y-3">
                  {teacher.education.map((edu, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <div className="flex-shrink-0 mt-1.5 h-2 w-2 rounded-full bg-blue-500" />
                      <span>{edu}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Experience */}
            {teacher.experience && teacher.experience.length > 0 && (
              <div className="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <svg className="h-6 w-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Pengalaman
                </h3>
                <ul className="space-y-3">
                  {teacher.experience.map((exp, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <div className="flex-shrink-0 mt-1.5 h-2 w-2 rounded-full bg-purple-500" />
                      <span>{exp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Specialties */}
          {teacher.specialties && teacher.specialties.length > 0 && (
            <div className="mb-12">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <svg className="h-6 w-6 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Keahlian & Spesialisasi
              </h3>
              <div className="flex flex-wrap gap-2">
                {teacher.specialties.map((spec, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/30 px-4 py-1.5 text-sm font-medium text-emerald-700 dark:text-emerald-300"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* CTA Section */}
          <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 sm:p-12 text-center text-white">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Ingin Mengenal Tim Kami Lebih Dekat?
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Datang langsung ke sekolah kami dan temui para pengajar berdedikasi yang siap mendampingi perjalanan pendidikan anak Anda.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/kontak"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-blue-600 hover:bg-gray-100 transition-colors"
              >
                Jadwalkan Kunjungan
                <span className="h-5 w-5" aria-hidden="true">→</span>
              </Link>
              <Link
                href="/guru"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 border border-white/30 px-8 py-4 text-lg font-semibold text-white hover:bg-white/20 transition-colors backdrop-blur-sm"
              >
                Lihat Semua Guru
              </Link>
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

  return <TeacherDetailContent teacher={teacher} />
}