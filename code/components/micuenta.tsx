'use client'

import { useProtectedRoute } from '@/hooks/useProtectedRoute'

export default function MiCuenta() {
  const { user, loading } = useProtectedRoute()

  if (loading) return <div className="p-6">Cargando...</div>
  if (!user) return null

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-4">Mi Cuenta</h1>
      <p className="text-lg">
        Hola <b>{user.name}</b>, bienvenida a tu perfil 💜
      </p>
    </div>
  )
}
    