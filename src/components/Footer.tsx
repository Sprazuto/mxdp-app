'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import {
  Users,
  MessageCircle,
  Video,
  Music,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
} from 'lucide-react'

const footerLinks = {
  program: [
    { name: 'Semua Program', href: '/program' },
    { name: 'Anak Usia Dini', href: '/program?category=aud' },
    { name: 'SD & SMP', href: '/program?category=sd-smp' },
    { name: 'Kegiatan Ekstrakurikuler', href: '/program?category=ekskul' },
  ],
  fasilitas: [
    { name: 'Semua Fasilitas', href: '/fasilitas' },
    { name: 'Ruang Kelas', href: '/fasilitas?type=kelas' },
    { name: 'Laboratorium', href: '/fasilitas?type=lab' },
    { name: 'Area Bermain', href: '/fasilitas?type=play' },
  ],
  tentang: [
    { name: 'Tentang Kami', href: '/tentang' },
    { name: 'Guru & Staf', href: '/guru' },
    { name: 'Visi & Misi', href: '/visi-misi' },
    { name: 'Karir', href: '/karir' },
  ],
  dukungan: [
    { name: 'Hubungi Kami', href: '/kontak' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Kebijakan Privasi', href: '/privasi' },
    { name: 'Syarat & Ketentuan', href: '/syarat' },
  ],
}

const socialLinks = [
  { name: 'Komunitas', icon: Users, href: 'https://facebook.com' },
  { name: 'Instagram', icon: MessageCircle, href: 'https://instagram.com' },
  { name: 'YouTube', icon: Video, href: 'https://youtube.com' },
  { name: 'TikTok', icon: Music, href: 'https://tiktok.com' },
]

export function Footer({
  siteName = 'MXDP',
  siteDescription = 'Platform Pendidikan Terdepan untuk Masa Depan Anak Indonesia',
  contactEmail = 'info@mxdp.id',
  contactPhone = '+62 21 1234 5678',
  address = 'Jl. Pendidikan No. 123, Jakarta Selatan, DKI Jakarta 12345',
}: {
  siteName?: string
  siteDescription?: string
  contactEmail?: string
  contactPhone?: string
  address?: string
} = {}) {
  const [currentYear, setCurrentYear] = useState<number>(2026)

  useEffect(() => {
    setCurrentYear(new Date().getFullYear())
  }, [])

  return (
    <footer className="bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-white" aria-label={`${siteName} Home`}>
              <span className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{siteName}</span>
            </Link>
            <p className="text-base text-gray-600 dark:text-gray-400 max-w-xs">{siteDescription}</p>
            <div className="flex gap-4" role="list" aria-label="Social media links">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'rounded-full p-2 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400',
                    'transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-950'
                  )}
                  aria-label={social.name}
                  role="listitem"
                >
                  <social.icon className="h-5 w-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Program</h3>
                <ul className="mt-4 space-y-3" role="list">
                  {footerLinks.program.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Fasilitas</h3>
                <ul className="mt-4 space-y-3" role="list">
                  {footerLinks.fasilitas.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Tentang</h3>
                <ul className="mt-4 space-y-3" role="list">
                  {footerLinks.tentang.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Dukungan</h3>
                <ul className="mt-4 space-y-3" role="list">
                  {footerLinks.dukungan.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              &copy; {currentYear} {siteName}. Hak cipta dilindungi.
            </p>
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                <span>{address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" aria-hidden="true" />
                <a href={`tel:${contactPhone}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{contactPhone}</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" aria-hidden="true" />
                <a href={`mailto:${contactEmail}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{contactEmail}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}