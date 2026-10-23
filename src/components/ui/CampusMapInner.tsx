'use client'

import { useEffect, useRef, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { MapPin } from 'lucide-react'

const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

function MapEvents() {
  const map = useMap()
  
  useEffect(() => {
    map.on('moveend', () => {
      const center = map.getCenter()
      console.log('Map center:', center.lat, center.lng)
    })
    
    return () => {
      map.off('moveend')
    }
  }, [map])
  
  return null
}

function MapView({ lat, lng, zoom, name, address }: { lat: number; lng: number; zoom: number; name: string; address: string }) {
  return (
    <MapContainer
      center={[lat, lng]}
      zoom={zoom}
      scrollWheelZoom={true}
      zoomControl={true}
      className="w-full h-full"
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
        maxZoom={19}
        minZoom={1}
      />
      <MapEvents />
      <Marker position={[lat, lng]} icon={DefaultIcon}>
        <Popup autoClose={false} className="custom-popup">
          <div className="p-2 min-w-[200px]">
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="h-5 w-5 text-red-500" aria-hidden="true" />
              <h3 className="font-bold text-gray-900 dark:text-white">{name}</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">{address}</p>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  )
}

export function CampusMapInner({
  lat = -6.9175,
  lng = 107.6191,
  zoom = 16,
  address = 'Jl. Pendidikan No. 123, Jakarta Selatan, DKI Jakarta 12345',
  name = 'MXDP Edukasi',
}: { lat: number; lng: number; zoom: number; address: string; name: string }) {
  const [mapError, setMapError] = useState<string | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!mapError) setMapError(null)
    }, 5000)
    return () => clearTimeout(timer)
  }, [mapError])

  if (mapError) {
    return (
      <div className="aspect-video w-full rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center p-4">
        <div className="text-center text-gray-500 dark:text-gray-400">
          <p className="font-medium mb-1">Gagal memuat peta</p>
          <p className="text-sm">{mapError}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            Muat ulang halaman
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      className="aspect-video w-full rounded-2xl overflow-hidden"
      role="application"
      aria-label={`Peta lokasi ${name}`}
    >
      <MapView
        lat={lat}
        lng={lng}
        zoom={zoom}
        name={name}
        address={address}
      />
    </div>
  )
}