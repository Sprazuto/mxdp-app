'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface FloatingOrnamentsProps {
  count?: number
  className?: string
  variant?: 'hero' | 'section' | 'card'
}

const starSizes = ['w-2 h-2', 'w-3 h-3', 'w-4 h-4', 'w-5 h-5']
const starColors = [
  'text-yellow-300',
  'text-pink-300',
  'text-amber-300',
  'text-orange-300',
]
const cloudPaths = [
  'M10 25 C10 15 20 10 30 10 C38 10 44 16 44 24 C44 30 38 34 30 34 C22 34 15 30 15 24 C15 20 20 15 30 15',
  'M5 20 C5 12 13 6 21 6 C27 6 32 10 32 16 C32 20 27 24 21 24 C15 24 10 20 10 16',
  'M15 30 C15 22 21 16 29 16 C35 16 40 20 40 26 C40 32 35 36 29 36 C23 36 17 30 17 26',
]

function Star({ size, color, delay, duration, x, y }: { size: string; color: string; delay: string; duration: string; x: string; y: string }) {
  return (
    <svg
      className={cn('absolute', size, color, 'animate-pulse', 'opacity-60', 'pointer-events-none')}
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
      className="absolute text-white/60 opacity-40 pointer-events-none animate-float"
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
      className={cn('absolute rounded-full blur-[0.5px] opacity-30 pointer-events-none animate-float-slow', size, color)}
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
      className="absolute text-amber-300/50 opacity-30 pointer-events-none animate-doodle"
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

interface Ornament {
  id: number
  type: 'star' | 'cloud' | 'bubble' | 'doodle'
  x: string
  y: string
  size: string
  color: string
  delay: string
  duration: string
  scale?: number
  rotate?: number
}

export function FloatingOrnaments({ count = 20, className, variant = 'section' }: FloatingOrnamentsProps) {
  const [ornaments, setOrnaments] = useState<Ornament[]>([])

  useEffect(() => {
    const newOrnaments = Array.from({ length: count }, (_, i) => {
      const types: Ornament['type'][] = ['star', 'cloud', 'bubble', 'doodle']
      const type = types[Math.floor(Math.random() * types.length)]
      const x = `${Math.random() * 100}%`
      const y = `${Math.random() * 100}%`
      const delay = `${Math.random() * 5}s`
      const duration = `${8 + Math.random() * 12}s`
      
      let size = starSizes[Math.floor(Math.random() * starSizes.length)]
      let color = starColors[Math.floor(Math.random() * starColors.length)]
      let scale = 0.5 + Math.random() * 1.5
      let rotate = -15 + Math.random() * 30

      if (variant === 'hero') {
        size = starSizes[Math.floor(Math.random() * 2) + 1]
      } else if (variant === 'card') {
        size = starSizes[0]
      }

      return { id: i, type, x, y, size, color, delay, duration, scale, rotate }
    })
    setOrnaments(newOrnaments)
  }, [count, variant])

  return (
    <div className={cn('absolute inset-0 -z-10 overflow-hidden pointer-events-none', className)} aria-hidden="true">
      {ornaments.map((ornament) => {
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
        }
      })}
    </div>
  )
}

export function FloatingStars({ count = 8, className }: { count?: number; className?: string }) {
  return <FloatingOrnaments count={count} className={className} variant="hero" />
}

export function FloatingClouds({ count = 5, className }: { count?: number; className?: string }) {
  return <FloatingOrnaments count={count} className={className} variant="section" />
}

export function FloatingBubbles({ count = 10, className }: { count?: number; className?: string }) {
  return <FloatingOrnaments count={count} className={className} variant="section" />
}