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