import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Space_Grotesk } from 'next/font/google'
import './globals.css'
import { EducationalOrganizationJsonLd } from '@/components/JsonLd'

// ScrollCraft global type
declare global {
  interface Window {
    ScrollCraft: {
      mount: (root: Document | Element, opts?: Record<string, unknown>) => unknown;
      instances: unknown[];
      reduce: boolean;
    };
  }
}

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://mxdp.id'),
  title: {
    default: 'MXDP - Platform Pendidikan Terdepan Indonesia',
    template: '%s | MXDP',
  },
  description: 'Platform pendidikan terdepan untuk masa depan anak Indonesia. Program unggulan, guru berpengalaman, fasilitas lengkap, dan lingkungan belajar yang aman.',
  robots: 'index, follow',
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
    <html lang="id" className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} h-full antialiased`}>
      <head>
        <EducationalOrganizationJsonLd />
        {/* ScrollCraft Engine - loads before page content */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var s = document.createElement('script');
                s.src = '/scrollcraft/scrollcraft.js';
                s.defer = true;
                s.onload = function() {
                  if (window.ScrollCraft) window.ScrollCraft.mount(document.body);
                };
                document.head.appendChild(s);
              })();
            `,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  )
}