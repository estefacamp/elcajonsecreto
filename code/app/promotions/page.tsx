'use client'

import React, { useState } from 'react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import CartDrawer from '@/components/cart-drawer'
import LoginModal from '@/components/login-modal'

export default function PromotionsPage() {
  const [showCart, setShowCart] = useState(false)
  const [showLogin, setShowLogin] = useState(false)

  const promotions = [
    {
      id: '1',
      title: 'Black Friday - 50% OFF',
      description: 'Descuento en productos seleccionados',
      discount: 50,
      validUntil: '2025-11-30',
    },
    {
      id: '2',
      title: 'Compra 2 lleva 3',
      description: 'En todos nuestros juguetes',
      discount: 33,
      validUntil: '2025-11-20',
    },
    {
      id: '3',
      title: 'Envío Gratis',
      description: 'En compras mayores a $50',
      discount: 0,
      validUntil: '2025-12-15',
    },
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header
        onCartClick={() => setShowCart(true)}
        onLoginClick={() => setShowLogin(true)}
      />

      <div className="flex-1 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-12">
            Promociones Especiales
          </h1>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {promotions.map(promo => (
              <div
                key={promo.id}
                className="bg-secondary rounded-lg p-8 border-2 border-primary hover:border-accent transition-colors"
              >
                <div className="text-5xl font-bold text-primary mb-4">
                  {promo.discount > 0 ? `${promo.discount}%` : '¡GRATIS!'}
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  {promo.title}
                </h2>
                <p className="text-foreground/70 mb-4">{promo.description}</p>
                <p className="text-sm text-foreground/60">
                  Válido hasta: {promo.validUntil}
                </p>
                <button className="mt-6 w-full bg-accent text-background py-2 rounded-lg hover:bg-accent/90 transition-colors font-bold">
                  Ver Productos
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />

      {/* Carrito lateral */}
      <CartDrawer
        isOpen={showCart}
        onClose={() => setShowCart(false)}
      />

      {/* Modal de login */}
      {showLogin && (
        <LoginModal onClose={() => setShowLogin(false)} />
      )}
    </div>
  )
}
