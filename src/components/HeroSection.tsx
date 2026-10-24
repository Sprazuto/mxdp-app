'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowRight, CheckCircle, Users, Award, Shield, Sparkles, Star } from 'lucide-react'
import { FloatingOrnaments } from '@/components/ui/FloatingOrnaments'

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
  primaryCtaHref = '/ppdb',
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
        'relative overflow-hidden px-4 py-20 sm:py-28 lg:py-36 xl:py-44 pt-24',
        'bg-gradient-to-b from-[#FFFDF9] via-[#FFF8F0] to-[#F0F9FF] dark:from-gray-950 dark:via-gray-900 dark:to-gray-950'
      )}
      aria-labelledby="hero-title"
    >
      <FloatingOrnaments count={30} variant="hero" />
      
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-emerald-200/30 blur-3xl dark:bg-emerald-900/20" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-pink-200/30 blur-3xl dark:bg-pink-900/20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-emerald-200/20 to-pink-200/20 blur-3xl dark:from-emerald-900/10 dark:to-pink-900/10" />
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-amber-100/90 px-5 py-2 text-sm font-bold text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 backdrop-blur-sm mb-6 border-2 border-amber-200 dark:border-amber-800 shadow-lg shadow-amber-200/50 rotate-[-2deg]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
            </span>
            <Sparkles className="h-4 w-4 animate-bounce" />
            Pendaftaran Tahun Ajaran Baru Dibuka! 🎈
          </span>
          <h1
            id="hero-title"
            className={cn(
              'text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-[1.1]',
              'bg-gradient-to-r from-slate-900 via-emerald-600 to-pink-600',
              'bg-clip-text text-transparent dark:from-white dark:via-emerald-400 dark:to-pink-400',
              'mb-6'
            )}
          >
            {title}
          </h1>
          <p className="text-lg sm:text-xl text-slate-700 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium">
            {subtitle}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 relative z-10">
          <Link
            href={primaryCtaHref}
            className={cn(
              'group inline-flex items-center justify-center gap-3 rounded-full',
              'bg-gradient-to-r from-amber-400 to-orange-500',
              'text-amber-950 font-black px-10 py-5 text-lg',
              'border-b-4 border-orange-600',
              'shadow-[0_12px_24px_-6px_rgba(251,191,36,0.5)] hover:shadow-[0_16px_32px_-8px_rgba(251,191,36,0.6)]',
              'hover:bg-gradient-to-r hover:from-amber-300 hover:to-orange-400',
              'active:translate-y-1 active:border-b-0 active:shadow-[0_4px_8px_-2px_rgba(251,191,36,0.4)]',
              'transition-all duration-150 focus:outline-none',
              'focus:ring-4 focus:ring-amber-300 focus:ring-offset-2'
            )}
          >
            {primaryCtaText}
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
          <Link
            href={secondaryCtaHref}
            className={cn(
              'inline-flex items-center justify-center gap-2 rounded-full',
              'bg-white/90 dark:bg-slate-800/90',
              'border-4 border-emerald-200 dark:border-emerald-800',
              'px-10 py-5 text-lg font-black text-emerald-700 dark:text-emerald-300',
              'backdrop-blur-sm',
              'hover:bg-emerald-50 dark:hover:bg-emerald-900/30',
              'hover:border-emerald-300 dark:hover:border-emerald-700',
              'hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-200/30',
              'transition-all duration-300 focus:outline-none',
              'focus:ring-4 focus:ring-emerald-300 focus:ring-offset-2'
            )}
          >
            {secondaryCtaText}
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto relative z-10">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={cn(
                'relative p-6 rounded-[24px] group',
                'bg-white/80 dark:bg-slate-800/80',
                'border-4 border-emerald-100 dark:border-emerald-800',
                'backdrop-blur-sm',
                'hover:border-emerald-300 dark:hover:border-emerald-700',
                'hover:shadow-[0_16px_32px_-8px_rgba(16,185,129,0.25)]',
                'hover:-translate-y-2',
                'transition-all duration-300'
              )}
              style={{ transform: index % 2 === 0 ? 'rotate(-1deg)' : 'rotate(1deg)' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-pink-500/5 rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex items-center gap-4">
                <div className="relative flex h-16 w-16 items-center justify-center rounded-[20px] bg-gradient-to-br from-emerald-100 to-pink-100 dark:from-emerald-900/30 dark:to-pink-900/30 border-2 border-emerald-200 dark:border-emerald-800 shadow-lg shadow-emerald-200/50">
                  <stat.icon className="h-8 w-8 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                </div>
                <div className="text-left">
                  <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white leading-tight">
                    {stat.value}
                  </div>
                  <div className="text-sm font-bold text-slate-600 dark:text-slate-400">
                    {stat.label}
                  </div>
                </div>
              </div>
              <Star className="absolute top-3 right-3 h-5 w-5 text-amber-300 animate-bounce" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}