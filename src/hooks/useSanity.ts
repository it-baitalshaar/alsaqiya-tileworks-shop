import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
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
        "gallery": coalesce(additionalImages, gallery),
        brand,
        stockStatus,
        country,
        color,
        size,
        material,
        finish,
        usageArea,
        description,
        type,
        likes
      }`
      return client.fetch(query, { productId })
    },
    enabled: !!productId,
    refetchInterval: 5000 // Refetch likes every 5 seconds for real-time updates
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
        stockStatus,
        likes
      }`
      return client.fetch(query)
    },
    refetchInterval: 5000
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
        stockStatus,
        likes
      }`
      return client.fetch(query)
    },
    refetchInterval: 5000
  })
}

// New hook for liking products
export function useLikeProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ productId, action }: { productId: string; action: 'increment' | 'decrement' }) => {
      const product = await client.fetch(`*[_id == $id][0].likes`, { id: productId })
      const currentLikes = product || 0
      const newLikes = action === 'increment' 
        ? currentLikes + 1 
        : Math.max(0, currentLikes - 1)

      return client
        .patch(productId)
        .set({ likes: newLikes })
        .commit()
    },
    onSuccess: (_, variables) => {
      // Invalidate and refetch product queries
      queryClient.invalidateQueries({ queryKey: ['product', variables.productId] })
      queryClient.invalidateQueries({ queryKey: ['tiles'] })
      queryClient.invalidateQueries({ queryKey: ['mixers'] })
    },
    onError: (error) => {
      console.error('Error updating likes:', error)
    }
  })
}
