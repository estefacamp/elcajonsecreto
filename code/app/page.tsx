'use client'

import { useState } from 'react'
import Header from '@/components/header'
import Hero from '@/components/hero'
import ProductGrid from '@/components/product-grid'
import Footer from '@/components/footer'
import LoginModal from '@/components/login-modal'
import CartDrawer from '@/components/cart-drawer'

export default function Home() {
  const [showLogin, setShowLogin] = useState(false)
  const [showCart, setShowCart] = useState(false)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header 
        onLoginClick={() => setShowLogin(true)}
        onCartClick={() => setShowCart(true)}
      />
      <Hero />
      <div id="productos">
        <ProductGrid />
      </div>
      <Footer />
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      <CartDrawer isOpen={showCart} onClose={() => setShowCart(false)} />
    </div>
  )
}
