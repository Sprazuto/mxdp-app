import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import '../globals.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { EducationalOrganizationJsonLd } from '@/components/JsonLd'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://mxdp.id'),
  title: {
    default: 'MXDP - Platform Pendidikan Terdepan Indonesia',
    template: '%s | MXDP',
  },
  description: 'Platform pendidikan terdepan untuk masa depan anak Indonesia. Program unggulan, guru berpengalaman, fasilitas lengkap, dan lingkungan belajar yang aman.',
  keywords: ['pendidikan', 'sekolah', 'program belajar', 'guru', 'fasilitas sekolah', 'anak Indonesia', 'TK', 'PAUD', 'playgroup', 'toddler'],
  authors: [{ name: 'MXDP' }],
  creator: 'MXDP',
  publisher: 'MXDP',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://mxdp.id',
    siteName: 'MXDP',
    title: 'MXDP - Platform Pendidikan Terdepan Indonesia',
    description: 'Platform pendidikan terdepan untuk masa depan anak Indonesia.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'MXDP Platform Pendidikan',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MXDP - Platform Pendidikan Terdepan Indonesia',
    description: 'Platform pendidikan terdepan untuk masa depan anak Indonesia.',
    images: ['/og-image.jpg'],
    creator: '@mxdp',
  },
  verification: {
    google: 'google-site-verification-code',
  },
  other: {
    'theme-color': '#0d9488',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#030712' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <EducationalOrganizationJsonLd />
      </head>
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}