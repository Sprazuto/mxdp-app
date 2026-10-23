'use client'

import { useEffect } from 'react'

interface JsonLdProps {
  data: Record<string, unknown>
}

export function JsonLd({ data }: JsonLdProps) {
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(data)
    script.id = 'structured-data'
    document.head.appendChild(script)
    return () => {
      const existing = document.getElementById('structured-data')
      if (existing) existing.remove()
    }
  }, [data])

  return null
}

export function EducationalOrganizationJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'MXDP Edukasi',
    alternateName: 'MXDP',
    url: 'https://mxdp.id',
    logo: 'https://mxdp.id/logo.png',
    description: 'Platform pendidikan terdepan untuk masa depan anak Indonesia. Program unggulan, guru berpengalaman, fasilitas lengkap, dan lingkungan belajar yang aman.',
    slogan: 'Pendidikan Berkualitas untuk Masa Depan Cerah',
    foundingDate: '2020',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Jl. Pendidikan No. 123',
      addressLocality: 'Jakarta Selatan',
      addressRegion: 'DKI Jakarta',
      postalCode: '12345',
      addressCountry: 'ID',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -6.9175,
      longitude: 107.6191,
    },
    telephone: '+62-21-1234-5678',
    email: 'info@mxdp.id',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+62-21-1234-5678',
        contactType: 'customer service',
        availableLanguage: ['Indonesian', 'English'],
        hoursAvailable: 'Mo-Fr 08:00-16:00',
      },
      {
        '@type': 'ContactPoint',
        telephone: '+62-812-3456-7890',
        contactType: 'whatsapp',
        availableLanguage: ['Indonesian'],
      },
    ],
    sameAs: [
      'https://www.facebook.com/mxdp',
      'https://www.instagram.com/mxdp',
      'https://www.youtube.com/@mxdp',
      'https://www.tiktok.com/@mxdp',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Program Pendidikan',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Course',
            name: 'Toddler Class',
            description: 'Program pengenalan lingkungan sekolah dengan pendekatan bermain untuk anak usia 1.5-3 tahun.',
            provider: {
              '@type': 'EducationalOrganization',
              name: 'MXDP Edukasi',
            },
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Course',
            name: 'Playgroup',
            description: 'Belajar melalui bermain terstruktur untuk mengembangkan kreativitas dan kemandirian anak usia 3-4 tahun.',
            provider: {
              '@type': 'EducationalOrganization',
              name: 'MXDP Edukasi',
            },
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Course',
            name: 'TK A (Kindergarten A)',
            description: 'Persiapan sekolah dasar dengan fokus literasi, numerasi, dan pembentukan karakter untuk usia 4-5 tahun.',
            provider: {
              '@type': 'EducationalOrganization',
              name: 'MXDP Edukasi',
            },
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Course',
            name: 'TK B (Kindergarten B)',
            description: 'Program persiapan SD yang komprehensif mencakup akademik, sosial-emosional, dan keterampilan hidup untuk usia 5-6 tahun.',
            provider: {
              '@type': 'EducationalOrganization',
              name: 'MXDP Edukasi',
            },
          },
        },
      ],
    },
    amenityFeature: [
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Ruang Kelas Cerdas',
        value: true,
        description: 'AC, Proyektor Interaktif, WiFi, Meja & Kursi Ergonomis',
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Laboratorium STEAM',
        value: true,
        description: 'Kit Robotik, Laptop/Tablet, Alat Eksperimen, Whiteboard Digital',
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Area Bermain Aman',
        value: true,
        description: 'Lantai Lempung, Peralatan Standar SNI, Naungan, CCTV',
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Perpustakaan & Reading Corner',
        value: true,
        description: 'Koleksi Buku Anak, Sofa Nyaman, Reading Nook, Audio Books',
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Sistem Keamanan CCTV 24/7',
        value: true,
        description: 'Pengawasan penuh di seluruh area sekolah',
      },
    ],
  }

  return <JsonLd data={jsonLd} />
}