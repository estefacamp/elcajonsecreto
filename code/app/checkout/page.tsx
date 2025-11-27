'use client'

import { useCart } from '@/lib/cart-context'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Header from '@/components/header'
import Footer from '@/components/footer'

export default function CheckoutPage() {
  const { items, total } = useCart()
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (items.length === 0) {
      router.push('/')
    }
  }, [items, router])

  const handleMercadoPagoCheckout = async () => {
    setError(null)

    if (items.length === 0) {
      setError('Tu carrito está vacío 🧺')
      return
    }

    try {
      setLoading(true)

      const payloadItems = items.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      }))

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/pagos/crear-preferencia`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items: payloadItems }),
        }
      )

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.message || 'No se pudo generar la preferencia')
      }

      const data = await res.json()

      if (!data.init_point) {
        throw new Error('Respuesta inválida del servidor')
      }

      // 👉 Redirigir al checkout de Mercado Pago
      window.location.href = data.init_point
    } catch (err: any) {
      console.error(err)
      setError(err.message || 'Ocurrió un error al iniciar el pago')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex-1 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-8">Resumen de Compra</h1>
          
          <div className="bg-secondary rounded-lg p-8 space-y-6">
            {items.map(item => (
              <div key={item.id} className="flex justify-between text-foreground">
                <span>{item.name} x {item.quantity}</span>
                <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            
            <div className="border-t border-primary pt-4">
              <div className="flex justify-between text-xl font-bold text-primary">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            <button
              onClick={handleMercadoPagoCheckout}
              disabled={loading}
              className="w-full bg-amber-500 text-background py-4 rounded-lg font-bold hover:bg-amber-600 transition-colors text-lg disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Redirigiendo a Mercado Pago…' : 'Pagar con Mercado Pago'}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
