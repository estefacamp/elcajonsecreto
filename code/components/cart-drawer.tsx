'use client'

import { X, Trash2 } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, total, removeItem, updateQuantity } = useCart()
  const router = useRouter()

  if (!isOpen) return null

  const handleGoToCheckout = () => {
    if (items.length === 0) return
    onClose()
    router.push('/checkout')
  }

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-background shadow-lg z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-secondary">
          <h2 className="text-2xl font-bold text-foreground">Tu Carrito</h2>
          <button
            onClick={onClose}
            className="p-2 text-foreground hover:text-primary transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <p className="text-foreground/70 text-center py-8">
              Tu carrito está vacío
            </p>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex gap-4 border-b border-secondary pb-4">
                <div className="relative w-16 h-16 flex-shrink-0">
                  <Image
                    src={item.image || '/placeholder.svg'}
                    alt={item.name}
                    fill
                    className="object-cover rounded"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold text-foreground text-sm">
                    {item.name}
                  </h3>
                  <p className="text-primary font-bold">
                    ${item.price.toFixed(2)}
                  </p>

                  <div className="flex items-center gap-2 mt-2">
                    {/* RESTAR */}
                    <button
                      onClick={() => {
                        if (item.quantity <= 1) removeItem(item.id)
                        else updateQuantity(item.id, item.quantity - 1)
                      }}
                      className="px-2 py-1 bg-secondary text-foreground rounded hover:bg-secondary/80"
                    >
                      -
                    </button>

                    {/* CANTIDAD */}
                    <span className="text-foreground">{item.quantity}</span>

                    {/* SUMAR */}
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-1 bg-secondary text-foreground rounded hover:bg-secondary/80"
                    >
                      +
                    </button>

                    {/* ELIMINAR */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="ml-auto p-1 text-foreground hover:text-accent transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-secondary p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-foreground font-semibold">Total:</span>
              <span className="text-2xl font-bold text-primary">
                ${total.toFixed(2)}
              </span>
            </div>
            <button
              onClick={handleGoToCheckout}
              className="w-full bg-accent text-background py-3 rounded-lg font-bold hover:bg-accent/90 transition-colors"
            >
              Proceder al Pago
            </button>
          </div>
        )}
      </div>
    </>
  )
}
