import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getProgramBySlug, getPrograms, urlFor } from '@/lib/sanity/queries'
import { Program } from '@/types'
import { programsFallback } from '@/lib/fallback-data'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ChevronRight, Users, Clock, Award, Shield, Sparkles as SparklesIcon, Leaf, Music, BookOpen, Calculator, ArrowRight } from 'lucide-react'
import { Card, CardIcon, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

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

  // Theme mapping for program
  const programThemes: Record<string, { variant: 'pink' | 'peach' | 'mint' | 'lavender' | 'sand' | 'blue' | 'rose' | 'palemint'; blob: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8; icon: React.ComponentType<{ className?: string }>; badgeVariant: 'clay-pink' | 'clay-peach' | 'clay-mint' | 'clay-lavender' | 'clay-sand' | 'clay-blue' | 'clay-rose' | 'clay-palemint' }> = {
    'toddler': { variant: 'mint', blob: 3, icon: Users, badgeVariant: 'clay-mint' },
    'playgroup': { variant: 'pink', blob: 1, icon: SparklesIcon, badgeVariant: 'clay-pink' },
    'tk-a': { variant: 'peach', blob: 5, icon: Award, badgeVariant: 'clay-peach' },
    'tk-b': { variant: 'lavender', blob: 7, icon: Shield, badgeVariant: 'clay-lavender' },
  }

  const theme = programThemes[program.slug.current] || programThemes['toddler']
  const IconComponent = theme.icon

  return (
    <article className="min-h-screen">
      {/* Hero Section - Claymorphism */}
      <section className="relative min-h-[60vh] w-full overflow-hidden flex items-end" data-sc-in data-sc-cue="0 0.6">
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
          <div className="absolute inset-0 clay-card clay-mint blob-3 flex items-center justify-center">
            <IconComponent className="h-32 w-32 text-white/30" aria-hidden="true" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--sc-canvas)]/95 via-[var(--sc-canvas)]/50 to-transparent" />
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 pb-10 sm:pb-16 lg:pb-24">
          <div className="mx-auto max-w-4xl">
            <Badge variant={theme.badgeVariant} className="mb-4">
              <Users className="h-3 w-3 mr-1" aria-hidden="true" />
              {program.ageGroup}
            </Badge>
            <h1 className="sc-display sc-display--xl mb-4">
              {program.title}
            </h1>
            <p className="sc-body text-lg sm:text-xl mb-6 max-w-2xl">
              {program.shortDescription}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-[var(--sc-ink-soft)]">
              <span className="flex items-center gap-1.5 clay-badge clay-sand">
                <Clock className="h-4 w-4" aria-hidden="true" />
                {program.duration}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32" data-sc-in data-sc-cue="0.1 0.7">
        <div className="mx-auto max-w-4xl">
          {/* Features Grid */}
          {program.features && program.features.length > 0 && (
            <div className="mb-16" data-sc-in data-sc-stagger="100">
              <div className="text-center mb-10">
                <h2 className="sc-display sc-display--lg mb-4">Keunggulan Program</h2>
                <p className="sc-body text-lg">Setiap detail dirancang untuk perkembangan optimal anak Anda</p>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {program.features.map((feature, index) => (
                  <Card
                    key={index}
                    variant={theme.variant}
                    blob={(index % 8 + 1) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8}
                    hoverable
                    data-sc-cue={`${0.1 + index * 0.1} ${0.4 + index * 0.1}`}
                  >
                    <CardIcon color={theme.variant}>
                      <IconComponent className="h-7 w-7" aria-hidden="true" />
                    </CardIcon>
                    <CardContent>
                      <CardTitle className="sc-display sc-display--md">{feature}</CardTitle>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Full Description */}
          {program.fullDescription && (
            <div className="prose prose-lg dark:prose-invert max-w-none mb-16" data-sc-in data-sc-cue="0.1 0.6">
              <h2 className="sc-display sc-display--lg mb-6">Tentang Program</h2>
              <div className="sc-body leading-relaxed">
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
          <div className="relative clay-card clay-peach blob-2 p-8 sm:p-12 text-center" data-sc-in data-sc-cue="0.8 1">
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-[var(--c-peach)] rounded-full opacity-30 blur-xl"></div>
            <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-[var(--c-mint)] blob-5 opacity-20 blur-xl"></div>
            <h2 className="sc-display sc-display--xl mb-4 relative z-10">
              Siap Mendaftar {program.title}?
            </h2>
            <p className="sc-body text-lg mb-8 max-w-2xl mx-auto relative z-10">
              Bergabunglah dengan ribuan orang tua yang telah mempercayakan pendidikan anak mereka di MXDP.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
              <Button variant="clay-primary" size="lg" asChild>
                <Link href="/ppdb" className="flex items-center justify-center gap-2">
                  Daftar Sekarang
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </Link>
              </Button>
              <Button variant="clay-secondary" size="lg" asChild>
                <Link href="/kontak" className="flex items-center justify-center gap-2">
                  Hubungi Kami
                </Link>
              </Button>
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