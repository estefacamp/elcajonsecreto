// components/CheckoutButton.tsx
'use client'

import { useState } from 'react'
import { useCart } from '@cart-context.tsx' // 👈 como veníamos usando
// Si no tenés useCart, avisame y lo adaptamos a useContext directamente

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

export function CheckoutButton() {
  const { items, total } = useCart()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCheckout = async () => {
    setError(null)

    if (!items || items.length === 0) {
      setError('Tu carrito está vacío 🧺')
      return
    }

    try {
      setLoading(true)

      // Adaptamos los items al formato que espera tu backend
      const payloadItems = items.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      }))

      const res = await fetch(`${API_URL}/api/pagos/crear-preferencia`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: payloadItems }),
      })

      if (!res.ok) {
        throw new Error('No se pudo crear la preferencia de pago')
      }

      const data = await res.json()

      if (!data.init_point) {
        throw new Error('No llegó el init_point desde el servidor')
      }

      // 👉 Redirigimos al checkout de Mercado Pago
      window.location.href = data.init_point
    } catch (err: any) {
      console.error('Error en checkout:', err)
      setError(err.message || 'Ocurrió un error al iniciar el pago')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={handleCheckout}
        disabled={loading || items.length === 0}
        className="w-full rounded-md px-4 py-2 text-sm font-semibold
                   bg-pink-600 hover:bg-pink-700 disabled:bg-gray-400
                   text-white transition-colors"
      >
        {loading ? 'Redirigiendo a Mercado Pago…' : `Pagar con Mercado Pago (${total.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })})`}
      </button>

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  )
}
