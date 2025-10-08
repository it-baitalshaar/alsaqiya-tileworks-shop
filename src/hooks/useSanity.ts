import { useQuery } from '@tanstack/react-query'
import { client } from '../lib/sanity'

export function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const query = `*[_type == "post"] | order(publishedAt desc){
        _id,
        title,
        slug,
        publishedAt,
        excerpt,
        body,
        mainImage
      }`
      return client.fetch(query)
    }
  })
}

export function usePost(slug: string) {
  return useQuery({
    queryKey: ['post', slug],
    queryFn: async () => {
      const query = `*[_type == "post" && slug.current == $slug][0]{
        _id,
        title,
        slug,
        publishedAt,
        body,
        mainImage,
        excerpt
      }`
      return client.fetch(query, { slug })
    },
    enabled: !!slug
  })
}

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const query = `*[_type in ["tiles", "mixer"]] | order(_createdAt desc){
        _id,
        _type,
        // map schemas to UI shape
        "name": coalesce(title, name),
        mainImage,
        "gallery": coalesce(additionalImages, gallery)
      }`
      return client.fetch(query)
    }
  })
}

export function useProduct(productId: string) {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: async () => {
      const query = `*[_id == $productId][0]{
        _id,
        _type,
        "name": coalesce(title, name),
        mainImage,
        "gallery": coalesce(additionalImages, gallery)
      }`
      return client.fetch(query, { productId })
    },
    enabled: !!productId
  })
}

export function useTiles() {
  return useQuery({
    queryKey: ['tiles'],
    queryFn: async () => {
      const query = `*[_type == "tiles"] | order(_createdAt desc){
        _id,
        _type,
        "name": coalesce(title, name),
        mainImage,
        "gallery": coalesce(additionalImages, gallery),
        color,
        size,
        country,
        usageArea,
        material,
        finish,
        brand,
        stockStatus
      }`
      return client.fetch(query)
    }
  })
}

export function useMixers() {
  return useQuery({
    queryKey: ['mixers'],
    queryFn: async () => {
      const query = `*[_type == "mixer"] | order(_createdAt desc){
        _id,
        _type,
        "name": coalesce(title, name),
        mainImage,
        "gallery": coalesce(additionalImages, gallery),
        description,
        color,
        material,
        type,
        brand,
        country,
        stockStatus
      }`
      return client.fetch(query)
    }
  })
}