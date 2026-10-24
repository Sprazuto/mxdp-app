'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowRight, CheckCircle, Users, Award, Shield, Sparkles, Star, Balloon, Zap, Heart, Crown } from 'lucide-react'
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
        'bg-gradient-to-b from-amber-50 via-orange-50 to-pink-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950'
      )}
      aria-labelledby="hero-title"
    >
      <FloatingOrnaments count={40} variant="hero" />
      
      {/* Glossy background blobs with shimmer */}
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/6 left-1/6 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-amber-300/40 via-orange-300/30 to-pink-300/40 blur-3xl animate-float-rotate" />
        <div className="absolute bottom-1/6 right-1/6 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-emerald-300/40 via-teal-300/30 to-cyan-300/40 blur-3xl animate-float-rotate" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-r from-amber-200/20 via-pink-200/20 to-emerald-200/20 blur-3xl animate-pulse-slow" />
        <div className="absolute inset-0 bg-[radial-gradient(#fde047_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-15 animate-shimmer" />
        <div className="absolute inset-0 bg-gradient-to-b from-amber-400/5 via-transparent to-pink-400/5" />
      </div>

      {/* Floating 3D decorative elements */}
      <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
        <div className="absolute top-20 left-10 animate-float-rotate" style={{ animationDuration: '8s', animationDelay: '0s' }}>
          <Balloon className="text-amber-400/80 text-4xl drop-shadow-[0_8px_24px_rgba(251,191,36,0.5)]" />
        </div>
        <div className="absolute top-32 right-16 animate-float-rotate" style={{ animationDuration: '10s', animationDelay: '1s' }}>
          <Crown className="text-pink-400/80 text-3xl drop-shadow-[0_8px_24px_rgba(244,114,182,0.5)]" />
        </div>
        <div className="absolute bottom-24 left-20 animate-float-rotate" style={{ animationDuration: '12s', animationDelay: '2s' }}>
          <Zap className="text-emerald-400/80 text-3xl drop-shadow-[0_8px_24px_rgba(16,185,129,0.5)]" />
        </div>
        <div className="absolute bottom-32 right-24 animate-float-rotate" style={{ animationDuration: '9s', animationDelay: '3s' }}>
          <Heart className="text-orange-400/80 text-3xl drop-shadow-[0_8px_24px_rgba(249,115,22,0.5)]" />
        </div>
      </div>

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          {/* Top badge with shimmer */}
          <span className="relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400/90 via-orange-400/90 to-pink-400/90 px-6 py-3 text-sm font-black text-slate-950 backdrop-blur-sm mb-6 border-2 border-amber-300 shadow-[0_8px_32px_rgba(251,191,36,0.4)] rotate-[-2deg] animate-bounce-slow">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
            </span>
            <Sparkles className="h-5 w-5 animate-bounce" />
            <span className="animate-bounce-slow">🎈</span>
            Pendaftaran Tahun Ajaran Baru Dibuka!
          </span>
          
          {/* Title with glossy gradient and text shadow */}
          <h1
            id="hero-title"
            className={cn(
              'text-4xl sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-black tracking-tight leading-[1.05]',
              'bg-gradient-to-r from-amber-600 via-orange-500 to-pink-600',
              'bg-clip-text text-transparent',
              'drop-shadow-[0_4px_20px_rgba(251,191,36,0.3)]',
              'mb-6'
            )}
          >
            {title}
          </h1>
          
          {/* Subtitle with premium feel */}
          <p className="text-lg sm:text-xl text-slate-700 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium">
            {subtitle}
          </p>
        </div>

        {/* CTA Buttons with 3D tactile depth */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            href={primaryCtaHref}
            className={cn(
              'group relative inline-flex items-center justify-center gap-3 rounded-full',
              'bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500',
              'text-slate-950 font-black px-10 py-5 text-lg',
              'border-b-8 border-orange-700',
              'border-t-2 border-amber-200/50',
              'shadow-[0_12px_32px_-4px_rgba(249,115,22,0.5),_0_4px_16px_-2px_rgba(251,191,36,0.3),_inset_0_2px_0_rgba(255,255,255,0.3)]',
              'hover:shadow-[0_16px_40px_-6px_rgba(249,115,22,0.6),_0_8px_24px_-4px_rgba(251,191,36,0.4),_inset_0_2px_0_rgba(255,255,255,0.4)]',
              'hover:brightness-105',
              'active:translate-y-2 active:border-b-4 active:shadow-[0_4px_12px_-2px_rgba(249,115,22,0.4),_inset_0_2px_4px_rgba(0,0,0,0.1)]',
              'transition-all duration-150 focus:outline-none',
              'focus:ring-4 focus:ring-amber-300 focus:ring-offset-2',
              'animate-bounce-slow'
            )}
          >
            <span className="relative z-10">{primaryCtaText}</span>
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:rotate-12" aria-hidden="true" />
            {/* Shimmer overlay */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
          </Link>
          
          <Link
            href={secondaryCtaHref}
            className={cn(
              'group relative inline-flex items-center justify-center gap-2 rounded-full',
              'bg-white/95 dark:bg-slate-800/95',
              'border-4 border-emerald-300 dark:border-emerald-700',
              'border-t-2 border-emerald-100/50 dark:border-emerald-600/50',
              'px-10 py-5 text-lg font-black text-emerald-700 dark:text-emerald-300',
              'backdrop-blur-sm',
              'shadow-[0_8px_24px_rgba(16,185,129,0.2),_inset_0_2px_0_rgba(255,255,255,0.5)]',
              'hover:bg-emerald-50 dark:hover:bg-emerald-900/30',
              'hover:border-emerald-400 dark:hover:border-emerald-600',
              'hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(16,185,129,0.3),_inset_0_2px_0_rgba(255,255,255,0.6)]',
              'active:translate-y-1 active:shadow-[0_4px_12px_rgba(16,185,129,0.2),_inset_0_2px_4px_rgba(0,0,0,0.05)]',
              'transition-all duration-300 focus:outline-none',
              'focus:ring-4 focus:ring-emerald-300 focus:ring-offset-2'
            )}
          >
            <span className="relative z-10">{secondaryCtaText}</span>
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:rotate-12" aria-hidden="true" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-emerald-100/30 to-transparent animate-shimmer" />
          </Link>
        </div>

        {/* Stats Cards with Glossy Claymorphism */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={cn(
                'group relative p-6 rounded-[28px]',
                'bg-gradient-to-br from-white via-amber-50/50 to-orange-50/50 dark:from-slate-800/80 dark:via-slate-900/80 dark:to-slate-800/80',
                'border-4 border-amber-200/80 dark:border-amber-800/80',
                'border-t-2 border-amber-100/50 dark:border-amber-700/50',
                'backdrop-blur-sm',
                'shadow-[0_20px_50px_-10px_rgba(251,191,36,0.25),_inset_0_2px_0_rgba(255,255,255,0.5)]',
                'hover:border-amber-400 dark:hover:border-amber-600',
                'hover:shadow-[0_30px_70px_-12px_rgba(251,191,36,0.4),_inset_0_2px_0_rgba(255,255,255,0.6)]',
                'hover:-translate-y-3 hover:rotate-1',
                'transition-all duration-500',
                'animate-bounce-slow'
              )}
              style={{ 
                transform: index % 2 === 0 ? 'rotate(-1.5deg)' : 'rotate(1.5deg)',
                animationDelay: `${index * 0.15}s`
              }}
            >
              {/* Glossy highlight overlay */}
              <div className="absolute inset-0 rounded-[28px] bg-gradient-to-b from-white/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-amber-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative flex items-center gap-4">
                <div className="relative flex h-18 w-18 items-center justify-center rounded-[22px] bg-gradient-to-br from-amber-200 via-pink-200 to-emerald-200 dark:from-amber-900/40 dark:via-pink-900/40 dark:to-emerald-900/40 border-2 border-amber-300/50 dark:border-amber-700/50 shadow-[0_8px_24px_rgba(251,191,36,0.3),_inset_0_2px_0_rgba(255,255,255,0.4)] group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  <stat.icon className="h-9 w-9 text-amber-600 dark:text-amber-400 drop-shadow-[0_2px_4px_rgba(251,191,36,0.3)]" aria-hidden="true" />
                  {/* Glossy icon highlight */}
                  <div className="absolute inset-0 rounded-[22px] bg-gradient-to-b from-white/30 to-transparent" />
                </div>
                <div className="text-left">
                  <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white leading-tight drop-shadow-[0_2px_8px_rgba(251,191,36,0.2)]">
                    {stat.value}
                  </div>
                  <div className="text-sm font-bold text-slate-600 dark:text-slate-400">
                    {stat.label}
                  </div>
                </div>
              </div>
              <Star className="absolute top-3 right-3 h-6 w-6 text-amber-300 animate-bounce-slow drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]" aria-hidden="true" />
              <Sparkles className="absolute bottom-3 left-3 h-5 w-5 text-pink-300/80 animate-pulse-glow" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}