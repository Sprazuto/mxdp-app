'use client'

import dynamic from 'next/dynamic'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'

const studioConfig = {
  name: 'mxdp-studio',
  title: 'MXDP Studio',
  projectId,
  dataset,
  apiVersion,
  plugins: [],
  schema: { types: [] },
}

const NextStudio = dynamic(
  () => import('next-sanity/studio').then((mod) => mod.NextStudio),
  { ssr: false }
)

export function StudioClient() {
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <NextStudio config={studioConfig} />
    </div>
  )
}