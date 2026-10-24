'use client'

// Studio page - uses dynamic import for Sanity Studio client component
import dynamic from 'next/dynamic'

const StudioClient = dynamic(
  () => import('./StudioClient').then((mod) => mod.StudioClient),
  { ssr: false }
)

export default function StudioPage() {
  return <StudioClient />
}