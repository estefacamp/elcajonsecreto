'use client'

import { useCart } from '@/lib/cart-context'
import { CheckoutButton } from '@/components/CheckoutButton'

export default function CarritoPage() {
  const { items, total } = useCart()

  if (items.length === 0) {
    return <p className="text-center mt-10">Tu carrito está vacío 🧺</p>
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 space-y-6">
      <h1 className="text-2xl font-semibold">Tu Carrito</h1>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between border-b pb-2">
            <span>{item.name}</span>
            <span>${(item.price * item.quantity).toLocaleString('es-AR')}</span>
          </div>
        ))}
      </div>

      <p className="text-xl font-bold">
        Total: ${total.toLocaleString('es-AR')}
      </p>

      {/* 🎯 Botón de Mercado Pago */}
      <CheckoutButton />
    </div>
  )
}
