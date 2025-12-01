'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { Heart, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import Header from '@/components/header'
import Footer from '@/components/footer'
import CartDrawer from '@/components/cart-drawer'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

export default function ProductDetail() {
  const params = useParams()
  const productId = params.id as string

  const { addItem } = useCart()

  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const [showCart, setShowCart] = useState(false)
  const [imageIndex, setImageIndex] = useState(0)

  // 👉 Traer producto desde backend
  useEffect(() => {
    async function loadProduct() {
      try {
        const res = await fetch(`${API_URL}/api/productos/${productId}`)
        if (!res.ok) throw new Error("No se encontró el producto")

        const data = await res.json()
        setProduct(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (productId) loadProduct()
  }, [productId])

  if (loading) {
    return <p className="p-6">Cargando...</p>
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background">
        <Header onCartClick={() => setShowCart(true)} />
        <div className="flex items-center justify-center py-20">
          <p className="text-foreground text-lg">{error || "Producto no encontrado"}</p>
        </div>
        <Footer />
      </div>
    )
  }

  const images = [
    product.image,
    product.image,
    product.image,
  ]

  const handleAddToCart = () => {
    addItem({
      id: product._id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image,
    })
    setShowCart(true)
  }

  const nextImage = () => setImageIndex((prev) => (prev + 1) % images.length)
  const prevImage = () => setImageIndex((prev) => (prev - 1 + images.length) % images.length)

  return (
    <div className="min-h-screen bg-background">
      <Header onCartClick={() => setShowCart(true)} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* IMAGEN + MINI IMÁGENES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          
          {/* Galería */}
          <div className="space-y-4">
            <div className="relative bg-secondary rounded-lg overflow-hidden h-96 md:h-[500px]">
              <Image
                src={images[imageIndex] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
              />
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background p-2 rounded-full transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background p-2 rounded-full transition-all"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            <div className="flex gap-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setImageIndex(idx)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    idx === imageIndex
                      ? 'border-accent'
                      : 'border-secondary hover:border-secondary/80'
                  }`}
                >
                  <Image
                    src={img || "/placeholder.svg"}
                    alt={`${product.name} ${idx + 1}`}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* INFO */}
          <div className="space-y-6">
            <div>
              <p className="text-accent text-sm font-semibold mb-1">{product.category?.toUpperCase()}</p>
              <h1 className="text-4xl font-bold text-foreground">{product.name}</h1>
            </div>

            <div className="border-b border-secondary pb-6">
              <p className="text-3xl font-bold text-primary">${product.price}</p>
            </div>

            <p className="text-foreground/80 text-lg leading-relaxed">
              {product.description}
            </p>

            {/* Cantidad */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-foreground font-semibold">Cantidad:</span>
                <div className="flex items-center border border-secondary rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-foreground hover:bg-secondary transition-colors"
                  >
                    -
                  </button>
                  <span className="px-6 py-2 text-foreground font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 text-foreground hover:bg-secondary transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full bg-accent hover:bg-accent/90 text-background py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                Agregar al carrito
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <CartDrawer isOpen={showCart} onClose={() => setShowCart(false)} />
    </div>
  )
}
