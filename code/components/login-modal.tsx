'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'

interface LoginModalProps {
  onClose: () => void
}

export default function LoginModal({ onClose }: LoginModalProps) {
  const router = useRouter()
  const { login, signup } = useAuth()

  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // 🧠 Cargar último email usado desde localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedEmail = localStorage.getItem('cs_last_email')
      if (savedEmail) setEmail(savedEmail)
    }
  }, [])

  const isValidEmail = (value: string) => {
    return value.includes('@') && value.trim().length > 5
  }

  const isValidPassword = (value: string) => {
    // Min 8 caracteres, alfanumérica (al menos una letra y un número)
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    return regex.test(value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // 🔍 Validaciones front antes de llamar al backend
    if (!isValidEmail(email)) {
      setError('El email debe ser válido y contener "@"')
      return
    }

    if (!isValidPassword(password)) {
      setError(
        'La contraseña debe tener al menos 8 caracteres, con letras y números'
      )
      return
    }

    if (mode === 'register' && !name.trim()) {
      setError('El nombre es obligatorio')
      return
    }

    try {
      setLoading(true)

      if (mode === 'login') {
        await login(email, password)
      } else {
        await signup(name, email, password)
      }

      // 💾 Guardar email para la próxima vez
      if (typeof window !== 'undefined') {
        localStorage.setItem('cs_last_email', email)
      }

      router.push('/micuenta')
      onClose()
    } catch (err: any) {
      setError(err.message || 'Error en login/register')
    } finally {
      setLoading(false)
    }
  }

  const toggleMode = () => {
    setError(null)
    setMode(prev => (prev === 'login' ? 'register' : 'login'))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 pt-10">
      <div className="w-full max-w-md bg-black text-white rounded-2xl shadow-xl border border-neutral-800 overflow-hidden">
        {/* HEADER */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-neutral-800">
          <h2 className="text-2xl font-bold text-amber-400">
            {mode === 'login' ? 'Iniciar Sesión' : 'Crear cuenta'}
          </h2>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white text-xl"
          >
            ✕
          </button>
        </header>

        {/* BODY */}
        <div className="px-6 py-4 space-y-4">
          {error && (
            <div className="w-full bg-red-900/80 text-red-100 text-sm px-3 py-2 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-sm">
            {mode === 'register' && (
              <div className="flex flex-col gap-1">
                <label className="font-medium text-neutral-200">Nombre</label>
                <input
                  type="text"
                  className="w-full rounded-lg bg-black border border-amber-500 px-3 py-2 text-white"
                  placeholder="Tu nombre"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
            )}

            <div className="flex flex-col gap-1">
              <label className="font-medium text-neutral-200">Email</label>
              <input
                type="email"
                className="w-full rounded-lg bg-black border border-amber-500 px-3 py-2 text-white"
                placeholder="tuemail@gmail.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              {!isValidEmail(email) && email.length > 0 && (
                <p className="text-xs text-red-400">
                  El email debe ser válido y contener &quot;@&quot;
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium text-neutral-200">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="w-full rounded-lg bg-black border border-neutral-600 px-3 py-2 text-white pr-10"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => !prev)}
                  className="absolute inset-y-0 right-2 flex items-center text-xs text-neutral-300 hover:text-amber-400"
                >
                  {showPassword ? 'Ocultar' : 'Ver'}
                </button>
              </div>
              {!isValidPassword(password) && password.length > 0 && (
                <p className="text-xs text-red-400">
                  Mínimo 8 caracteres, con letras y números.
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold py-2 rounded-lg text-sm disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading
                ? 'Procesando...'
                : mode === 'login'
                ? 'Ingresar'
                : 'Registrarme'}
            </button>
          </form>
        </div>

        {/* FOOTER */}
        <footer className="px-6 py-3 border-t border-neutral-800 text-center text-xs text-neutral-300">
          {mode === 'login' ? (
            <>
              ¿Sin cuenta?{' '}
              <button
                onClick={toggleMode}
                className="text-amber-400 hover:underline"
              >
                Crear una
              </button>
            </>
          ) : (
            <>
              ¿Ya tenés cuenta?{' '}
              <button
                onClick={toggleMode}
                className="text-amber-400 hover:underline"
              >
                Iniciar sesión
              </button>
            </>
          )}
        </footer>
      </div>
    </div>
  )
}
  