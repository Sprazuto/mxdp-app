export interface SiteSettings {
  _id: string
  siteName: string
  siteDescription: string
  logo: SanityImage
  favicon: SanityImage
  contactEmail: string
  contactPhone: string
  address: string
  socialMedia: {
    instagram?: string
    facebook?: string
    youtube?: string
    tiktok?: string
  }
  seo: {
    defaultTitle: string
    defaultDescription: string
    ogImage: SanityImage
  }
}

export interface Program {
  _id: string
  title: string
  slug: { current: string }
  shortDescription: string
  fullDescription: SanityBlockContent
  thumbnail: SanityImage
  duration: string
  ageGroup: string
  features: string[]
  isActive: boolean
  order: number
}

export interface Facility {
  _id: string
  name: string
  slug: { current: string }
  description: SanityBlockContent
  thumbnail: SanityImage
  gallery: SanityImage[]
  features: string[]
  hasCctv: boolean
  order: number
}

export interface Teacher {
  _id: string
  name: string
  slug: { current: string }
  role: string
  bio: SanityBlockContent
  photo: SanityImage
  education: string[]
  experience: string[]
  specialties: string[]
  socialMedia?: {
    linkedin?: string
    instagram?: string
  }
  order: number
}

export interface ContactFormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
  caption?: string
}

export interface SanityBlockContent {
  _type: 'array'
  _ref?: string
  [key: string]: unknown
}

export interface SEOProps {
  title?: string
  description?: string
  ogImage?: SanityImage
  noIndex?: boolean
  noFollow?: boolean
}