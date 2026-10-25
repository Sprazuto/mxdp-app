import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getProgramBySlug, getPrograms, urlFor } from '@/lib/sanity/queries'
import { Program } from '@/types'
import { programsFallback } from '@/lib/fallback-data'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

interface ProgramPageProps {
  params: Promise<{ slug: string }>
}

async function getProgramData(slug: string): Promise<Program | null> {
  const program = await getProgramBySlug(slug)
  if (program) return program

  return programsFallback.find((p) => p.slug.current === slug) || null
}

async function getAllProgramSlugs(): Promise<string[]> {
  const programs = await getPrograms()
  if (programs.length > 0) {
    return programs.map((p: Program) => p.slug.current)
  }
  return programsFallback.map((p) => p.slug.current)
}

export async function generateStaticParams() {
  const slugs = await getAllProgramSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: ProgramPageProps): Promise<Metadata> {
  const { slug } = await params
  const program = await getProgramData(slug)

  if (!program) {
    return {
      title: 'Program Tidak Ditemukan',
      description: 'Program pendidikan yang Anda cari tidak ditemukan.',
    }
  }

  const title = `${program.title} | MXDP`
  const description = program.shortDescription || `Pelajari selengkapnya tentang program ${program.title} di MXDP.`
  const ogImage = program.thumbnail ? urlFor(program.thumbnail)?.width(1200).height(630).url() : '/og-image.jpg'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630, alt: program.title }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImage ? [ogImage] : [],
    },
  }
}

function ProgramDetailContent({ program }: { program: Program }) {
  const thumbnailUrl = urlFor(program.thumbnail)?.width(800).height(450).url()

  return (
    <article className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] max-h-[600px] w-full overflow-hidden">
        {thumbnailUrl ? (
          <Image
            src={thumbnailUrl}
            alt={program.thumbnail.alt || program.title}
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
              {program.ageGroup}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
              {program.title}
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl">
              {program.shortDescription}
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-6 text-white/80">
              <span className="flex items-center gap-1.5">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {program.duration}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Features Grid */}
          {program.features && program.features.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Keunggulan Program
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {program.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-xl bg-white dark:bg-gray-800 p-5 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow"
                  >
                    <div className="flex-shrink-0 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 p-2">
                      <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 font-medium">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Full Description */}
          {program.fullDescription && (
            <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Tentang Program
              </h2>
              <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {Array.isArray(program.fullDescription)
                  ? program.fullDescription
                      .filter((block: unknown) => (block as Record<string, unknown>)._type === 'block')
                      .map((block: Record<string, unknown>, index: number) => (
                        <p key={index} className="mb-4">
                          {(block.children as Array<{ text: string }>)?.map((child) => child.text).join('') || ''}
                        </p>
                      ))
                  : 'blocks' in (program.fullDescription as Record<string, unknown>)
                  ? ((program.fullDescription as Record<string, unknown>).blocks as Array<Record<string, unknown>>)
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

          {/* CTA Section */}
          <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 sm:p-12 text-center text-white">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Siap Mendaftar {program.title}?
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Bergabunglah dengan ribuan orang tua yang telah mempercayakan pendidikan anak mereka di MXDP.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/daftar"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-blue-600 hover:bg-gray-100 transition-colors"
              >
                Daftar Sekarang
                <span className="h-5 w-5" aria-hidden="true">→</span>
              </Link>
              <Link
                href="/kontak"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 border border-white/30 px-8 py-4 text-lg font-semibold text-white hover:bg-white/20 transition-colors backdrop-blur-sm"
              >
                Hubungi Kami
              </Link>
            </div>
          </div>
        </div>
      </section>
    </article>
  )
}

export default async function ProgramDetailPage({ params }: ProgramPageProps) {
  const { slug } = await params
  const program = await getProgramData(slug)

  if (!program) {
    notFound()
  }

  return (
    <>
      <Navbar />
      <ProgramDetailContent program={program} />
      <Footer />
    </>
  )
}