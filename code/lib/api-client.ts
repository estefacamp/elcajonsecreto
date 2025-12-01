'use client'

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

export async function apiClient(
  endpoint: string,
  options: RequestInit = {}
) {
  let token: string | null = null

  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token')
  }

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  }

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
    cache: 'no-store',
  })

  let data: any = null

  try {
    data = await res.json()
  } catch {
    // si la respuesta no es JSON, data se queda en null
  }

  if (!res.ok) {
    throw new Error(data?.message || 'Error en la petición')
  }

  return data
}
