import { useState, useEffect } from 'react'
import { useLikeProduct } from './useSanity'

const LIKED_PRODUCTS_KEY = 'liked_products'

export function useLikedProducts() {
  const [likedProductIds, setLikedProductIds] = useState<string[]>([])
  const { mutate: updateLike } = useLikeProduct()

  // Load liked products from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(LIKED_PRODUCTS_KEY)
    if (stored) {
      try {
        setLikedProductIds(JSON.parse(stored))
      } catch (e) {
        console.error('Error loading liked products:', e)
      }
    }
  }, [])

  const toggleLike = (productId: string) => {
    setLikedProductIds((prev) => {
      const isLiked = prev.includes(productId)
      const updated = isLiked
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]

      // Save to localStorage
      localStorage.setItem(LIKED_PRODUCTS_KEY, JSON.stringify(updated))

      // Update Sanity
      updateLike({
        productId,
        action: isLiked ? 'decrement' : 'increment'
      })

      return updated
    })
  }

  const isLiked = (productId: string) => {
    return likedProductIds.includes(productId)
  }

  return {
    toggleLike,
    isLiked,
    likedProductIds
  }
}