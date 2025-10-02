import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  useCdn: true,
  apiVersion: '2023-09-25', // Use current date
})

// Helper function for images
export function urlForImage(source) {
  if (!source?.asset?._ref) return null
  
  const ref = source.asset._ref
  const [, id, dimensions, format] = ref.split('-')
  const [width, height] = dimensions.split('x')
  
  return `https://cdn.sanity.io/images/${client.config().projectId}/${client.config().dataset}/${id}-${dimensions}.${format}`
}