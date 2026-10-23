'use client'

import dynamic from 'next/dynamic'
import { MapPin, ExternalLink, Navigation, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const CampusMapComponent = dynamic(
  () => import('./CampusMapInner').then((mod) => mod.CampusMapInner),
  {
    ssr: false,
    loading: () => (
      <div className="aspect-video w-full rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-gray-500 dark:text-gray-400">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 dark:text-blue-400" aria-hidden="true" />
          <p className="text-sm font-medium">Memuat peta...</p>
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
    <div className={cn('relative rounded-2xl overflow-hidden', className)}>
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
            'p-3 rounded-xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm',
            'text-gray-700 dark:text-gray-300',
            'hover:bg-blue-50 dark:hover:bg-blue-900/30',
            'hover:text-blue-600 dark:hover:text-blue-400',
            'shadow-lg shadow-gray-900/10',
            'transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500'
          )}
          aria-label={`Buka ${name} di Google Maps`}
          title="Buka di Google Maps"
        >
          <ExternalLink className="h-5 w-5" aria-hidden="true" />
        </a>
        <button
          className={cn(
            'p-3 rounded-xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm',
            'text-gray-700 dark:text-gray-300',
            'hover:bg-gray-100 dark:hover:bg-gray-800',
            'shadow-lg shadow-gray-900/10',
            'transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500'
          )}
          aria-label="Lokasi saya"
          title="Lokasi saya"
        >
          <Navigation className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      <div className="absolute bottom-4 left-4 z-10 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-xl p-3 shadow-lg shadow-gray-900/10">
        <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
          <MapPin className="h-4 w-4 text-red-500 flex-shrink-0" aria-hidden="true" />
          <span className="font-medium whitespace-nowrap max-w-xs truncate">{name}</span>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 max-w-xs truncate">{address}</p>
      </div>
    </div>
  )
}