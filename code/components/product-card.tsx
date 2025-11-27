'use client'

import { ShoppingCart, Heart } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/lib/cart-context'
import { Product } from '@/lib/products'
import AddToCartButton from '@/components/addTocartbutton'

export default function ProductCard({ product }: { product: Product }) {
  const [isFavorite, setIsFavorite] = useState(false)
  const { addItem } = useCart()

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image
    })
  }

  // 🛟 Valores por defecto por si el back no manda rating/reviews
  const rating = product.rating ?? 4.8
  const reviews = product.reviews ?? 25

  return (
    <div className="group bg-card rounded-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
      <Link href={`/products/${product.id}`}>
        <div className="relative overflow-hidden bg-secondary h-64 cursor-pointer">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute top-4 right-4">
            <button
              onClick={(e) => {
                e.preventDefault()
                setIsFavorite(!isFavorite)
              }}
              className="p-2 bg-background/80 rounded-full hover:bg-primary hover:text-primary-foreground transition-all"
            >
              <Heart
                className="w-5 h-5"
                fill={isFavorite ? 'currentColor' : 'none'}
              />
            </button>
          </div>
          <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold capitalize">
            {product.category}
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-6">
        <Link href={`/products/${product.id}`}>
          <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors cursor-pointer">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-1 mb-2 text-sm text-foreground/70">
          <span>★ {rating}</span>
          <span>({reviews} reseñas)</span>
        </div>
        <p className="text-primary text-xl font-bold mb-4">
          ${product.price.toFixed(2)}
        </p>
        <button 
          onClick={handleAddToCart}
          className="w-full bg-primary hover:bg-accent text-primary-foreground py-2 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
        >
          <ShoppingCart className="w-4 h-4" />
          Agregar al carrito
        </button>
      </div>
    </div>
  )
}
