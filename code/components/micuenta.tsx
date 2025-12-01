'use client'

import { useProtectedRoute } from '@/hooks/useProtectedRoute'
import { LogoutButton } from '@/components/logoutbutton'

export default function MiCuenta() {
  const { user, loading } = useProtectedRoute()

  if (loading) return <div className="p-6 text-black">Cargando...</div>
  if (!user) return null

  return (
    <main className="min-h-screen flex justify-center px-4 py-10 bg-neutral-100">
      <section className="w-full max-w-lg border rounded-2xl p-6 shadow-sm bg-white space-y-6 text-black">

        {/* HEADER */}
        <header className="flex items-center justify-between border-b pb-3">
          <h1 className="text-xl font-bold text-black">Mi Cuenta</h1>
          <LogoutButton />
        </header>

        {/* INFO DEL USUARIO */}
        <div className="space-y-2 text-sm text-black">
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

        {/* SECCIÓN GENERAL */}
        <div className="pt-3 border-t text-sm text-gray-700">
          Esta será tu base para después meter:
          <ul className="list-disc list-inside mt-1">
            <li>Historial de pedidos</li>
            <li>Direcciones de envío</li>
            <li>Datos de facturación</li>
          </ul>
        </div>

        {/* SOLO ADMIN */}
        {user.role === 'admin' && (
          <div className="pt-4 border-t text-black">
            <h2 className="text-sm font-semibold mb-1">Panel administrador 🛠️</h2>
            <p className="text-xs text-gray-700 mb-3">
              Como admin podés gestionar productos del Sex Shop PRO.
            </p>

            <div className="flex flex-wrap gap-2">
              <a
                href="/admin/productos/nuevo"
                className="px-3 py-1.5 rounded-full border text-xs font-medium hover:bg-black hover:text-white transition-colors"
              >
                Agregar producto
              </a>

              <a
                href="/admin/productos"
                className="px-3 py-1.5 rounded-full border text-xs font-medium hover:bg-neutral-800 hover:text-white transition-colors"
              >
                Ver productos
              </a>
            </div>
          </div>
        )}
        
      </section>
    </main>
  )
}
