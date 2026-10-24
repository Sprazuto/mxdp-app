'use client'

import { useEffect, useState, useMemo } from 'react'
import { cn } from '@/lib/utils'

interface FloatingOrnamentsProps {
  count?: number
  className?: string
  variant?: 'hero' | 'section' | 'card'
}

interface Ornament {
  id: number
  type: 'star' | 'cloud' | 'bubble' | 'doodle' | 'badge' | 'sparkle'
  x: string
  y: string
  size: string
  color: string
  delay: string
  duration: string
  scale?: number
  rotate?: number
  animation?: string
  badge?: { icon: string; color: string }
}

const starSizes = ['w-3 h-3', 'w-4 h-4', 'w-5 h-5', 'w-6 h-6', 'w-7 h-7']
const starColors = [
  'text-yellow-300',
  'text-pink-300',
  'text-amber-300',
  'text-orange-300',
  'text-emerald-300',
  'text-purple-300',
]
const bubbleColors = [
  'bg-yellow-300/40',
  'bg-pink-300/40',
  'bg-amber-300/40',
  'bg-orange-300/40',
  'bg-emerald-300/40',
  'bg-purple-300/40',
]
const badgeTypes = [
  { icon: '✨', color: 'text-yellow-300' },
  { icon: '⭐', color: 'text-amber-300' },
  { icon: '🌈', color: 'text-pink-300' },
  { icon: '💫', color: 'text-purple-300' },
  { icon: '🌟', color: 'text-orange-300' },
  { icon: '✦', color: 'text-emerald-300' },
]

function Star({ size, color, delay, duration, x, y, animation = 'float-rotate' }: { size: string; color: string; delay: string; duration: string; x: string; y: string; animation?: string }) {
  return (
    <svg
      className={cn('absolute', size, color, `animate-${animation}`, 'opacity-80', 'pointer-events-none', 'drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]')}
      style={{
        left: x,
        top: y,
        animationDelay: delay,
        animationDuration: duration,
      } as React.CSSProperties}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}

function Cloud({ delay, duration, x, y, scale }: { delay: string; duration: string; x: string; y: string; scale: number }) {
  return (
    <svg
      className="absolute text-white/70 opacity-50 pointer-events-none animate-float-rotate drop-shadow-[0_4px_12px_rgba(255,255,255,0.5)]"
      style={{
        left: x,
        top: y,
        transform: `scale(${scale})`,
        animationDelay: delay,
        animationDuration: duration,
      } as React.CSSProperties}
      viewBox="0 0 60 40"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M30 10 C38 10 44 16 44 24 C44 30 38 34 30 34 C22 34 15 30 15 24 C15 16 22 10 30 10 Z" />
    </svg>
  )
}

function Bubble({ size, color, delay, duration, x, y }: { size: string; color: string; delay: string; duration: string; x: string; y: string }) {
  return (
    <div
      className={cn('absolute rounded-full blur-[1px] opacity-40 pointer-events-none animate-float-rotate', size, color)}
      style={{
        left: x,
        top: y,
        animationDelay: delay,
        animationDuration: duration,
      } as React.CSSProperties}
      aria-hidden="true"
    />
  )
}

function Doodle({ delay, duration, x, y, rotate }: { delay: string; duration: string; x: string; y: string; rotate: number }) {
  return (
    <svg
      className="absolute text-amber-300/60 opacity-40 pointer-events-none animate-doodle"
      style={{
        left: x,
        top: y,
        transform: `rotate(${rotate}deg)`,
        animationDelay: delay,
        animationDuration: duration,
      } as React.CSSProperties}
      viewBox="0 0 100 50"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeDasharray="8 4"
      aria-hidden="true"
    >
      <path d="M5 25 Q25 5 50 25 Q75 45 95 25" />
    </svg>
  )
}

function Badge({ delay, duration, x, y, icon, color }: { delay: string; duration: string; x: string; y: string; icon: string; color: string }) {
  return (
    <div
      className="absolute pointer-events-none animate-float-rotate drop-shadow-[0_4px_16px_rgba(255,255,255,0.9)]"
      style={{
        left: x,
        top: y,
        animationDelay: delay,
        animationDuration: duration,
      } as React.CSSProperties}
      aria-hidden="true"
    >
      <span className={`inline-block text-2xl sm:text-3xl ${color} animate-bounce-slow`}>{icon}</span>
    </div>
  )
}

function Sparkle({ delay, duration, x, y, size, color }: { delay: string; duration: string; x: string; y: string; size: string; color: string }) {
  return (
    <svg
      className={cn('absolute', size, color, `animate-${duration.includes('pulse') ? 'pulse-glow' : 'float-rotate'}`, 'opacity-90', 'pointer-events-none')}
      style={{
        left: x,
        top: y,
        animationDelay: delay,
        animationDuration: duration,
      } as React.CSSProperties}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0v24M0 12h24M12 0l7.5 7.5-7.5 7.5-7.5-7.5z" strokeWidth="1.5" />
    </svg>
  )
}

export function FloatingOrnaments({ count = 25, className, variant = 'section' }: FloatingOrnamentsProps) {
  const [ornaments, setOrnaments] = useState<Ornament[]>([])

  useEffect(() => {
    const newOrnaments = Array.from({ length: count }, (_, i) => {
      const types: Ornament['type'][] = ['star', 'cloud', 'bubble', 'doodle', 'badge', 'sparkle']
      const type = types[Math.floor(Math.random() * types.length)]
      const x = `${Math.random() * 100}%`
      const y = `${Math.random() * 100}%`
      const delay = `${Math.random() * 6}s`
      const duration = `${6 + Math.random() * 10}s`
      
      let size = starSizes[Math.floor(Math.random() * starSizes.length)]
      let color = starColors[Math.floor(Math.random() * starColors.length)]
      let scale = 0.6 + Math.random() * 1.8
      let rotate = -20 + Math.random() * 40
      let animation = 'float-rotate'
      let badge = badgeTypes[Math.floor(Math.random() * badgeTypes.length)]

      if (variant === 'hero') {
        size = starSizes[Math.floor(Math.random() * 2) + 2]
        if (type === 'star') animation = 'float-rotate'
        if (type === 'sparkle') animation = 'pulse-glow'
      } else if (variant === 'card') {
        size = starSizes[0]
      }

      return { id: i, type, x, y, size, color, delay, duration, scale, rotate, animation, badge }
    })
    setOrnaments(newOrnaments)
  }, [count, variant])

  const renderOrnament = (ornament: Ornament) => {
    switch (ornament.type) {
      case 'star':
        return (
          <Star
            key={ornament.id}
            size={ornament.size}
            color={ornament.color}
            delay={ornament.delay}
            duration={ornament.duration}
            x={ornament.x}
            y={ornament.y}
            animation={ornament.animation}
          />
        )
      case 'cloud':
        return (
          <Cloud
            key={ornament.id}
            delay={ornament.delay}
            duration={ornament.duration}
            x={ornament.x}
            y={ornament.y}
            scale={ornament.scale || 1}
          />
        )
      case 'bubble':
        return (
          <Bubble
            key={ornament.id}
            size={ornament.size.replace('w-', 'w-').replace('h-', 'h-')}
            color={ornament.color.replace('text-', 'bg-')}
            delay={ornament.delay}
            duration={ornament.duration}
            x={ornament.x}
            y={ornament.y}
          />
        )
      case 'doodle':
        return (
          <Doodle
            key={ornament.id}
            delay={ornament.delay}
            duration={ornament.duration}
            x={ornament.x}
            y={ornament.y}
            rotate={ornament.rotate || 0}
          />
        )
      case 'badge':
        return (
          <Badge
            key={ornament.id}
            delay={ornament.delay}
            duration={ornament.duration}
            x={ornament.x}
            y={ornament.y}
            icon={ornament.badge?.icon || '✨'}
            color={ornament.badge?.color || 'text-yellow-300'}
          />
        )
      case 'sparkle':
        return (
          <Sparkle
            key={ornament.id}
            delay={ornament.delay}
            duration={ornament.duration}
            x={ornament.x}
            y={ornament.y}
            size={ornament.size}
            color={ornament.color}
          />
        )
    }
  }

  return (
    <div className={cn('absolute inset-0 -z-10 overflow-hidden pointer-events-none', className)} aria-hidden="true">
      {ornaments.map(renderOrnament)}
    </div>
  )
}

export function FloatingStars({ count = 10, className }: { count?: number; className?: string }) {
  return <FloatingOrnaments count={count} className={className} variant="hero" />
}

export function FloatingClouds({ count = 6, className }: { count?: number; className?: string }) {
  return <FloatingOrnaments count={count} className={className} variant="section" />
}

export function FloatingBubbles({ count = 12, className }: { count?: number; className?: string }) {
  return <FloatingOrnaments count={count} className={className} variant="section" />
}