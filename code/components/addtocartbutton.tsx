'use client'

import { useState } from 'react'
import { useCart } from '@/lib/cart-context'

interface AddToCartButtonProps {
  id: string
  name: string
  price: number
  image: string
  defaultQuantity?: number
}

export default function AddToCartButton({
  id,
  name,
  price,
  image,
  defaultQuantity = 1,
}: AddToCartButtonProps) {
  const { addItem } = useCart()
  const [loading, setLoading] = useState(false)
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    setLoading(true)

    addItem({
      id,
      name,
      price,
      image,
      quantity: defaultQuantity,
    })

    setLoading(false)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <button
      onClick={handleAdd}
      disabled={loading}
      className={`
        w-full rounded-full px-4 py-2 text-sm font-semibold
        transition
        ${added
          ? 'bg-emerald-600 text-white'
          : 'bg-pink-600 text-white hover:bg-pink-700'}
      `}
    >
      {added
        ? 'Añadido al carrito 💦'
        : loading
        ? 'Agregando...'
        : 'Agregar al carrito 🛒'}
    </button>
  )
}
