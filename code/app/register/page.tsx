'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'

export default function RegisterPage() {
  const { register, loading } = useAuth()
  const router = useRouter()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }

    try {
      await register(name, email, password)
      router.push('/micuenta')
    } catch (err: any) {
      setError(err.message || 'Error al crear la cuenta')
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm border rounded-2xl p-6 space-y-4 shadow-sm bg-white"
      >
        <h1 className="text-xl font-bold text-center">
          Crear cuenta 💋
        </h1>

        {error && (
          <p className="text-sm text-red-500 text-center">
            {error}
          </p>
        )}

        <div className="space-y-1">
          <label className="text-sm">Nombre</label>
          <input
            className="w-full border rounded-lg px-3 py-2 text-sm"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm">Email</label>
          <input
            className="w-full border rounded-lg px-3 py-2 text-sm"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm">Contraseña</label>
          <input
            className="w-full border rounded-lg px-3 py-2 text-sm"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm">Repetir contraseña</label>
          <input
            className="w-full border rounded-lg px-3 py-2 text-sm"
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg border px-3 py-2 text-sm font-medium bg-black text-white"
        >
          {loading ? 'Creando cuenta...' : 'Registrarme'}
        </button>
      </form>
    </main>
  )
}
