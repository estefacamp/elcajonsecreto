// lib/products.ts

export interface Product {
  id: string
  name: string
  price: number
  category: string
  description: string
  image: string
  rating: number
  reviews: number
}

// 👇 Las categorías sí las dejamos
export const categories = [
  'vibradores',
  'lenceria',
  'masajes',
  'parejas',
  'discretos',
  'accesorios'
]
