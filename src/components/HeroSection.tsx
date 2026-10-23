'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowRight, CheckCircle, Users, Award, Shield } from 'lucide-react'

interface HeroSectionProps {
  title?: string
  subtitle?: string
  primaryCtaText?: string
  primaryCtaHref?: string
  secondaryCtaText?: string
  secondaryCtaHref?: string
  stats?: Array<{ label: string; value: string; icon: React.ComponentType<{ className?: string }> }>
}

export function HeroSection({
  title = 'Pendidikan Berkualitas untuk Masa Depan Cerah',
  subtitle = 'MXDP menyediakan program pendidikan terbaik dengan guru berpengalaman, fasilitas lengkap, dan lingkungan belajar yang aman serta menyenangkan untuk anak-anak Indonesia.',
  primaryCtaText = 'Daftar Sekarang',
  primaryCtaHref = '/daftar',
  secondaryCtaText = 'Jelajahi Program',
  secondaryCtaHref = '/program',
  stats = [
    { label: 'Siswa Aktif', value: '2.500+', icon: Users },
    { label: 'Guru Berpengalaman', value: '150+', icon: Award },
    { label: 'Program Unggulan', value: '25+', icon: CheckCircle },
    { label: 'Lingkungan Aman', value: '100%', icon: Shield },
  ],
}: HeroSectionProps = {}) {
  return (
    <section
      className={cn(
        'relative overflow-hidden px-4 py-20 sm:py-28 lg:py-32 xl:py-40 pt-24',
        'bg-gradient-to-b from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950'
      )}
      aria-labelledby="hero-title"
    >
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-200/30 blur-3xl dark:bg-blue-900/20" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-purple-200/30 blur-3xl dark:bg-purple-900/20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-blue-200/20 to-purple-200/20 blur-3xl dark:from-blue-900/10 dark:to-purple-900/10" />
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-100/80 px-4 py-1.5 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 backdrop-blur-sm mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
            </span>
            Pendaftaran Tahun Ajaran Baru Dibuka!
          </span>
          <h1
            id="hero-title"
            className={cn(
              'text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight',
              'bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600',
              'bg-clip-text text-transparent dark:from-white dark:via-blue-400 dark:to-purple-400',
              'mb-6'
            )}
          >
            {title}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            href={primaryCtaHref}
            className={cn(
              'group inline-flex items-center justify-center gap-2 rounded-xl',
              'bg-gradient-to-r from-blue-600 to-purple-600',
              'px-8 py-4 text-lg font-semibold text-white',
              'shadow-lg shadow-blue-500/25',
              'hover:from-blue-700 hover:to-purple-700',
              'hover:shadow-xl hover:shadow-blue-500/35',
              'transition-all duration-300 focus:outline-none',
              'focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            )}
          >
            {primaryCtaText}
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
          <Link
            href={secondaryCtaHref}
            className={cn(
              'inline-flex items-center justify-center gap-2 rounded-xl',
              'bg-white/80 dark:bg-gray-800/80',
              'border border-gray-200 dark:border-gray-700',
              'px-8 py-4 text-lg font-semibold text-gray-900 dark:text-white',
              'backdrop-blur-sm',
              'hover:bg-gray-50 dark:hover:bg-gray-700',
              'hover:border-gray-300 dark:hover:border-gray-600',
              'transition-all duration-300 focus:outline-none',
              'focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            )}
          >
            {secondaryCtaText}
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={cn(
                'relative p-6 rounded-2xl',
                'bg-white/60 dark:bg-gray-800/60',
                'border border-gray-100 dark:border-gray-800',
                'backdrop-blur-sm',
                'hover:border-blue-200 dark:hover:border-blue-800',
                'transition-colors'
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex items-center gap-4">
                <div className="relative flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30">
                  <stat.icon className="h-7 w-7 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}