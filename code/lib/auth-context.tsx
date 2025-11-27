'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react'

interface User {
  id: string
  email: string
  name: string
  role?: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  token: string | null
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, name: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// 🧩 URL del backend (la misma que ya usabas)
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true) // 👈 empieza en true

  // 🔁 Al cargar la app, ver si ya hay sesión guardada
  useEffect(() => {
    if (typeof window === 'undefined') return

    const savedToken = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')

    if (savedToken && savedUser) {
      try {
        setToken(savedToken)
        setUser(JSON.parse(savedUser))
      } catch (e) {
        console.error('Error parseando user de localStorage', e)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      }
    }

    setLoading(false)
  }, [])

  // 🔐 LOGIN
  const login = useCallback(async (email: string, password: string) => {
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || 'Credenciales inválidas')
      }

      // Backend devuelve: { message, token, user: { id, name, email, role } }
      setToken(data.token)
      setUser(data.user)

      if (typeof window !== 'undefined') {
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
      }
    } finally {
      setLoading(false)
    }
  }, [])

  // 🧾 REGISTER
  const signup = useCallback(
    async (email: string, password: string, name: string) => {
      setLoading(true)
      try {
        const res = await fetch(`${API_URL}/api/auth/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, password }),
        })

        const data = await res.json()

        if (!res.ok) {
          throw new Error(data.message || 'Error al registrar usuario')
        }

        // Si después del register también querés dejarla logueada:
        setToken(data.token)
        setUser(data.user)

        if (typeof window !== 'undefined') {
          localStorage.setItem('token', data.token)
          localStorage.setItem('user', JSON.stringify(data.user))
        }
      } finally {
        setLoading(false)
      }
    },
    []
  )

  // 🚪 LOGOUT
  const logout = useCallback(() => {
    setUser(null)
    setToken(null)

    if (typeof window !== 'undefined') {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        token,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth debe usarse dentro de AuthProvider')
  }
  return ctx
}
