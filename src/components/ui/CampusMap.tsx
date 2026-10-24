'use client'

import dynamic from 'next/dynamic'
import { MapPin, ExternalLink, Navigation, Loader2, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

const CampusMapComponent = dynamic(
  () => import('./CampusMapInner').then((mod) => mod.CampusMapInner),
  {
    ssr: false,
    loading: () => (
      <div className="aspect-video w-full rounded-[24px] bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-slate-500 dark:text-slate-400">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
          <p className="text-sm font-bold">Memuat peta...</p>
          <Sparkles className="h-4 w-4 text-amber-400 animate-bounce" />
        </div>
      </div>
    ),
  }
)

interface CampusMapProps {
  lat?: number
  lng?: number
  zoom?: number
  address?: string
  name?: string
  className?: string
}

export function CampusMap({
  lat = -6.9175,
  lng = 107.6191,
  zoom = 16,
  address = 'Jl. Pendidikan No. 123, Jakarta Selatan, DKI Jakarta 12345',
  name = 'MXDP Edukasi',
  className,
}: CampusMapProps = {}) {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${name}, ${address}`)}`

  return (
    <div className={cn('relative rounded-[24px] overflow-hidden', className)}>
      <CampusMapComponent
        lat={lat}
        lng={lng}
        zoom={zoom}
        address={address}
        name={name}
      />
      <div className="absolute bottom-4 right-4 z-10 flex gap-2">
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'p-3 rounded-[16px] bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm',
            'text-slate-700 dark:text-slate-300',
            'hover:bg-emerald-50 dark:hover:bg-emerald-900/30',
            'hover:text-emerald-600 dark:hover:text-emerald-400',
            'shadow-xl shadow-slate-900/10',
            'transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-emerald-300'
          )}
          aria-label={`Buka ${name} di Google Maps`}
          title="Buka di Google Maps"
        >
          <ExternalLink className="h-5 w-5" aria-hidden="true" />
        </a>
        <button
          className={cn(
            'p-3 rounded-[16px] bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm',
            'text-slate-700 dark:text-slate-300',
            'hover:bg-slate-100 dark:hover:bg-slate-800',
            'shadow-xl shadow-slate-900/10',
            'transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-emerald-300'
          )}
          aria-label="Lokasi saya"
          title="Lokasi saya"
        >
          <Navigation className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      <div className="absolute bottom-4 left-4 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm rounded-[16px] p-4 shadow-xl shadow-slate-900/10 border-2 border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
          <MapPin className="h-4 w-4 text-red-500 flex-shrink-0" aria-hidden="true" />
          <span className="font-black whitespace-nowrap max-w-xs truncate">{name}</span>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 max-w-xs truncate">{address}</p>
      </div>
    </div>
  )
}