'use client'

import { useEffect, useState } from 'react'
import { apiClient } from '@/lib/api-client'

export default function PruebaPage() {
  const [data, setData] = useState(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function cargar() {
      try {
        const res = await apiClient('http://localhost:4000/api/productos')
        setData(res)
      } catch (err: any) {
        setError(err.message)
      }
    }
    cargar()
  }, [])

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Prueba API Client</h1>

      {error && (
        <p className="text-red-500 font-semibold">
          Error: {error}
        </p>
      )}

      {data && (
        <pre className="bg-black/20 p-4 rounded-lg">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  )
}
