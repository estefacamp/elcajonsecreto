'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { Heart, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react'
import { mockProducts } from '@/lib/products'
import { useCart } from '@/lib/cart-context'
import Header from '@/components/header'
import Footer from '@/components/footer'
import CartDrawer from '@/components/cart-drawer'

export default function ProductDetail() {
  const params = useParams()
  const productId = params.id as string
  const product = mockProducts.find(p => p.id === productId)
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const [showCart, setShowCart] = useState(false)
  const [imageIndex, setImageIndex] = useState(0)
  const { addItem } = useCart()

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header onCartClick={() => setShowCart(true)} />
        <div className="flex items-center justify-center py-20">
          <p className="text-foreground text-lg">Producto no encontrado</p>
        </div>
        <Footer />
      </div>
    )
  }

  const images = [product.image, product.image, product.image]

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image
    })
    setShowCart(true)
  }

  const nextImage = () => {
    setImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onCartClick={() => setShowCart(true)} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
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

          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-accent text-sm font-semibold mb-1">{product.category.toUpperCase()}</p>
                  <h1 className="text-4xl font-bold text-foreground">{product.name}</h1>
                </div>
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="p-3 bg-secondary rounded-full hover:bg-secondary/80 transition-all"
                >
                  <Heart
                    className="w-6 h-6"
                    fill={isFavorite ? 'currentColor' : 'none'}
                  />
                </button>
              </div>

              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-accent">★ {product.rating}</span>
                  <span className="text-foreground/70">({product.reviews} reseñas)</span>
                </div>
              </div>
            </div>

            <div className="border-b border-secondary pb-6">
              <p className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</p>
              <p className="text-sm text-foreground/70 mt-2">Envío gratis en pedidos mayores a $100</p>
            </div>

            <div className="space-y-4">
              <p className="text-foreground/80 text-lg leading-relaxed">
                {product.description}
              </p>

              <div className="bg-secondary/30 rounded-lg p-4 space-y-2">
                <p className="font-semibold text-foreground">Características principales:</p>
                <ul className="text-foreground/70 space-y-1 text-sm">
                  <li>✓ Diseño premium y elegante</li>
                  <li>✓ Materiales de la más alta calidad</li>
                  <li>✓ Garantía de 2 años</li>
                  <li>✓ Envío discreto y confidencial</li>
                </ul>
              </div>
            </div>

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

              <button className="w-full border-2 border-accent text-accent py-3 rounded-lg font-semibold hover:bg-accent/10 transition-colors">
                Comprar ahora
              </button>
            </div>

            <div className="bg-secondary/20 rounded-lg p-4 text-sm text-foreground/70 space-y-2">
              <p>🔒 Compra segura con cifrado SSL</p>
              <p>📦 Embalaje discreto y confidencial</p>
              <p>♻️ Devoluciones fáciles en 30 días</p>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary pt-12">
          <h2 className="text-3xl font-bold text-foreground mb-8">Reseñas de Clientes</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-secondary/30 rounded-lg p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-accent font-semibold">★★★★★ 5.0</span>
                  <span className="text-foreground/70 text-sm">Hace {i * 5} días</span>
                </div>
                <p className="font-semibold text-foreground mb-2">Cliente Verificado</p>
                <p className="text-foreground/80">
                  Producto de excelente calidad, muy satisfecho con la compra. Envío rápido y discreto. Lo recomiendo ampliamente.
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
      <CartDrawer isOpen={showCart} onClose={() => setShowCart(false)} />
    </div>
  )
}
