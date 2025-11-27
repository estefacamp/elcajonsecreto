'use client'

import { ReactNode, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'

interface AdminGuardProps {
  children: ReactNode
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (loading) return

    // ⛔ Si no hay usuario, la mando al home o login
    if (!user) {
      router.replace('/') // o '/login' si tuvieras
      return
    }

    // ⛔ Si hay usuario pero no es admin, la mando a /micuenta
    if (user.role !== 'admin') {
      router.replace('/micuenta')
      return
    }

    // ✅ Si llega acá, user existe y es admin → se queda
  }, [user, loading, router])

  // Mientras carga la sesión
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-foreground/70">Verificando permisos...</p>
      </div>
    )
  }

  // Mientras redirige, no mostramos nada si no cumple
  if (!user || user.role !== 'admin') {
    return null
  }

  // ✅ Usuario admin → mostrar contenido real
  return <>{children}</>
}
