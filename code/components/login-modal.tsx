'use client'

import {
  useState,
  useEffect,
  type ReactNode,
  FormEvent
} from 'react'
import { useRouter } from 'next/navigation'      // 👈 NUEVO
import { useAuth } from '@/lib/auth-context'

interface LoginModalProps {
  onClose: () => void
}

export default function LoginModal({ onClose }: LoginModalProps) {
  const router = useRouter()                    // 👈 NUEVO

  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { login, signup, user, logout } = useAuth()

  // 🔁 Al abrir el modal, ver si hay un email recordado
  useEffect(() => {
    if (typeof window === 'undefined') return
    const savedEmail = localStorage.getItem('rememberedEmail')
    if (savedEmail) {
      setEmail(savedEmail)
      setRememberMe(true)
    }
  }, [])

  // =============================
  // SI YA ESTÁ LOGUEADA
  // =============================
  if (user) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-background p-8 rounded-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-accent">¡Bienvenida!</h2>

          <p className="mb-2 text-foreground/70">
            Conectada como{' '}
            <span className="font-semibold">{user.email}</span>
          </p>

          <div className="space-y-3 mt-6">
            <button
              onClick={() => {
                logout()
                onClose()
              }}
              className="
                w-full 
                bg-gradient-to-r from-pink-500 to-purple-600 
                text-white 
                font-semibold 
                py-2 
                rounded-xl 
                shadow-lg 
                hover:shadow-xl 
                hover:scale-[1.02] 
                active:scale-[0.98]
                transition-all
              "
            >
              Cerrar sesión
            </button>

            <button
              onClick={onClose}
              className="
                w-full 
                border border-accent/40 
                text-accent 
                px-4 py-2 
                rounded 
                hover:bg-accent/10 
                transition
              "
            >
              Cerrar ventana
            </button>
          </div>
        </div>
      </div>
    )
  }

  // =============================
  // SI NO ESTÁ LOGUEADA → FORM LOGIN/REGISTRO
  // =============================
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      if (isLogin) {
        await login(email, password)
      } else {
        await signup(email, password, name)
      }

      // 💾 Manejo de "Recordarme"
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email)
      } else {
        localStorage.removeItem('rememberedEmail')
      }

      // 👉 REDIRIGIR A /micuenta DESPUÉS DE LOGIN/REGISTER
      router.push('/micuenta')

      // Cerrar modal
      onClose()
    } catch (err: any) {
      console.error('Error en login/register:', err)
      setError(err?.message || 'Error al procesar la solicitud')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-background p-8 rounded-lg w-full max-w-md">
        
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-accent">
            {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
          </h2>
          <button
            onClick={onClose}
            className="text-foreground/50 hover:text-foreground"
          >
            ✕
          </button>
        </div>

        {/* MENSAJE DE ERROR */}
        {error && (
          <div className="mb-4 text-sm text-red-500 bg-red-500/10 border border-red-500/40 rounded px-3 py-2">
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Nombre solo si es REGISTER */}
          {!isLogin && (
            <div>
              <label className="block text-sm mb-2">Nombre</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-background/50 border border-accent/30 rounded px-3 py-2 text-foreground"
                required
              />
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-sm mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-background/50 border border-accent/30 rounded px-3 py-2 text-foreground"
              required
            />
          </div>

          {/* Password con mostrar/ocultar */}
          <div className="relative">
            <label className="block text-sm mb-2">Contraseña</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-background/50 border border-accent/30 rounded px-3 py-2 text-foreground pr-10"
              required
            />

            {/* Botón mostrar/ocultar */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-foreground/60 hover:text-accent transition text-sm"
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>

          {/* Recordarme */}
          <div className="flex items-center space-x-2 mt-1">
            <input
              id="rememberMe"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 text-accent"
            />
            <label
              htmlFor="rememberMe"
              className="text-sm text-foreground/70 cursor-pointer"
            >
              Recordarme
            </label>
          </div>

          {/* Botón enviar */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full 
              bg-accent 
              text-background 
              px-4 py-2 
              rounded 
              hover:bg-accent/90 
              transition 
              disabled:opacity-50
            "
          >
            {loading ? 'Cargando...' : isLogin ? 'Ingresar' : 'Crear Cuenta'}
          </button>
        </form>

        {/* Cambiar entre login y register */}
        <div className="mt-4 text-center text-sm">
          {isLogin ? '¿Sin cuenta?' : '¿Ya tienes cuenta?'}{' '}
          <button
            onClick={() => {
              setIsLogin(!isLogin)
              setError(null)
            }}
            className="text-accent hover:underline"
          >
            {isLogin ? 'Crear una' : 'Inicia sesión'}
          </button>
        </div>

      </div>
    </div>
  )
}
