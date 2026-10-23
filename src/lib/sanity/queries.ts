import { sanityClient, isSanityConfigured } from './client'
import { urlFor } from './client'

export async function getSiteSettings() {
  if (!isSanityConfigured() || !sanityClient) return null
  return sanityClient.fetch(`*[_type == "siteSettings"][0] {
    _id,
    siteName,
    siteDescription,
    logo,
    favicon,
    contactEmail,
    contactPhone,
    address,
    socialMedia,
    seo
  }`)
}

export async function getPrograms() {
  if (!isSanityConfigured() || !sanityClient) return []
  return sanityClient.fetch(`*[_type == "program" && isActive == true] | order(order asc) {
    _id,
    title,
    slug,
    shortDescription,
    fullDescription,
    thumbnail,
    duration,
    ageGroup,
    features,
    isActive,
    order
  }`)
}

export async function getProgramBySlug(slug: string) {
  if (!isSanityConfigured() || !sanityClient) return null
  return sanityClient.fetch(`*[_type == "program" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    shortDescription,
    fullDescription,
    thumbnail,
    duration,
    ageGroup,
    features,
    isActive,
    order
  }`, { slug })
}

export async function getFacilities() {
  if (!isSanityConfigured() || !sanityClient) return []
  return sanityClient.fetch(`*[_type == "facility"] | order(order asc) {
    _id,
    name,
    slug,
    description,
    thumbnail,
    gallery,
    features,
    hasCctv,
    order
  }`)
}

export async function getFacilityBySlug(slug: string) {
  if (!isSanityConfigured() || !sanityClient) return null
  return sanityClient.fetch(`*[_type == "facility" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    description,
    thumbnail,
    gallery,
    features,
    hasCctv,
    order
  }`, { slug })
}

export async function getTeachers() {
  if (!isSanityConfigured() || !sanityClient) return []
  return sanityClient.fetch(`*[_type == "teacher"] | order(order asc) {
    _id,
    name,
    slug,
    role,
    bio,
    photo,
    education,
    experience,
    specialties,
    socialMedia,
    order
  }`)
}

export async function getTeacherBySlug(slug: string) {
  if (!isSanityConfigured() || !sanityClient) return null
  return sanityClient.fetch(`*[_type == "teacher" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    role,
    bio,
    photo,
    education,
    experience,
    specialties,
    socialMedia,
    order
  }`, { slug })
}

export { urlFor }