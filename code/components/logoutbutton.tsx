'use client'

import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'

export function LogoutButton() {
  const { logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <button
      onClick={handleLogout}
      className="inline-flex items-center rounded-lg border px-3 py-2 text-sm font-medium"
    >
      Cerrar sesión
    </button>
  )
}
