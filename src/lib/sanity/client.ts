import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import { apiVersion, dataset, projectId } from './config'

const hasConfig = Boolean(projectId && dataset)

export const sanityClient = hasConfig
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: process.env.NODE_ENV === 'production',
    })
  : null

export const previewClient = hasConfig
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
    })
  : null

export const getClient = (preview = false) => (preview ? previewClient : sanityClient)

export function isSanityConfigured(): boolean {
  return hasConfig
}

const builder = hasConfig && sanityClient ? imageUrlBuilder(sanityClient) : null

export function urlFor(source: SanityImage | null | undefined) {
  if (!builder) return null
  if (!source) return null
  // Skip placeholder images that don't have valid Sanity asset references
  if (source.asset?._ref === 'placeholder') return null
  return builder.image(source)
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