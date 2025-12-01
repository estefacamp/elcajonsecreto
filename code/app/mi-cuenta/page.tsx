'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { LogoutButton } from '@/components/logoutbutton'

export default function MiCuentaPage() {
  const { user, loading, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login')
    }
  }, [loading, isAuthenticated, router])

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Cargando tu cuenta...</p>
      </main>
    )
  }

  if (!user) {
    return null // mientras redirige
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <section className="w-full max-w-md border rounded-2xl p-6 shadow-sm bg-white space-y-4">
        <header className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Mi cuenta 💄</h1>
          <LogoutButton />
        </header>

        <div className="space-y-2 text-sm">
          <p>
            <span className="font-semibold">Nombre: </span>
            {user.name}
          </p>
          <p>
            <span className="font-semibold">Email: </span>
            {user.email}
          </p>
          {user.role && (
            <p>
              <span className="font-semibold">Rol: </span>
              {user.role}
            </p>
          )}
        </div>

        <div className="pt-2 text-xs text-muted-foreground">
          Esta será tu base para después meter:
          <ul className="list-disc list-inside mt-1">
            <li>Historial de pedidos</li>
            <li>Direcciones de envío</li>
            <li>Datos de facturación</li>
          </ul>
        </div>
      </section>
    </main>
  )
}
