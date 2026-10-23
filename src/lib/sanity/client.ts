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

export function urlFor(source: any) {
  if (!builder) return null
  return builder.image(source)
}