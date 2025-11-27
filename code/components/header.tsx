'use client'

import { ShoppingCart, Menu, X, LogOut } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useAuth } from '@/lib/auth-context'
import { useCart } from '@/lib/cart-context'

interface HeaderProps {
  onLoginClick?: () => void
  onCartClick?: () => void
}

export default function Header({ onLoginClick, onCartClick }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuth()
  const { items } = useCart()
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="bg-background border-b border-secondary sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <div className="w-16 h-16 aspect-square">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-11-15%20at%2012.25.37-JX1rmPpmmSm2OowzxomSeHF1bWOHYf.jpeg"
                alt="El Cajón Secreto"
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-foreground hover:text-primary transition-colors"
            >
              Inicio
            </Link>
            <Link
              href="/#productos"
              className="text-foreground hover:text-primary transition-colors"
            >
              Productos
            </Link>
            <Link
              href="/promotions"
              className="text-foreground hover:text-primary transition-colors"
            >
              Promociones
            </Link>
            <Link
              href="/contact"
              className="text-foreground hover:text-primary transition-colors"
            >
              Contacto
            </Link>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Carrito */}
            <button
              onClick={onCartClick}
              className="relative p-2 text-foreground hover:text-primary transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-accent text-accent-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Usuario / Login desktop */}
            {user ? (
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline text-sm text-foreground/70">
                  Hola,&nbsp;
                  <span className="font-semibold">
                    {user.name || user.email.split('@')[0]}
                  </span>
                </span>
                <button
                  onClick={() => {
                    logout()
                    setIsOpen(false)
                  }}
                  title="Cerrar sesión"
                  className="
                    inline-flex items-center gap-1
                    rounded-full
                    border border-white/20
                    bg-white/5
                    px-3 py-1
                    text-xs font-medium
                    text-foreground/80
                    hover:bg-white/15
                    hover:border-white/40
                    hover:text-foreground
                    transition-all
                  "
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden md:inline">Salir</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="hidden sm:block px-4 py-2 bg-accent text-background rounded hover:bg-accent/90 transition-colors text-sm font-semibold"
              >
                Ingresar
              </button>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-2">
            <Link
              href="/"
              className="px-4 py-2 text-foreground hover:text-primary hover:bg-secondary rounded transition-colors"
            >
              Inicio
            </Link>
            <Link
              href="/#productos"
              className="px-4 py-2 text-foreground hover:text-primary hover:bg-secondary rounded transition-colors"
            >
              Productos
            </Link>
            <Link
              href="/promotions"
              className="px-4 py-2 text-foreground hover:text-primary hover:bg-secondary rounded transition-colors"
            >
              Promociones
            </Link>
            <Link
              href="/contact"
              className="px-4 py-2 text-foreground hover:text-primary hover:bg-secondary rounded transition-colors"
            >
              Contacto
            </Link>

            {/* Login / Logout en mobile */}
            {user ? (
              <button
                onClick={() => {
                  logout()
                  setIsOpen(false)
                }}
                className="mt-2 px-4 py-2 flex items-center gap-2 text-foreground hover:text-primary hover:bg-secondary rounded transition-colors text-sm"
              >
                <LogOut className="w-5 h-5" />
                <span>Cerrar sesión</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  onLoginClick?.()
                  setIsOpen(false)
                }}
                className="mt-2 px-4 py-2 bg-accent text-background rounded font-semibold text-sm"
              >
                Ingresar
              </button>
            )}
          </nav>
        )}
      </div>
    </header>
  )
}
  