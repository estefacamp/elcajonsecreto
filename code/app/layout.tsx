
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'

import { AuthProvider } from '@/lib/auth-context'
import { CartProvider } from '@/lib/cart-context'

import './globals.css'

// ====== FONTS ======
const geist = Geist({ subsets: ['latin'] })
const geistMono = Geist_Mono({ subsets: ['latin'] })

// ====== METADATA ======
export const metadata: Metadata = {
  title: 'El Cajón Secreto - Sex Shop',
  description: 'Donde empieza el placer. Tu tienda online de confianza.',
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

// ====== ROOT LAYOUT ======
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`font-sans antialiased ${geist.className}`}>
        <AuthProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </AuthProvider>

        <Analytics />
      </body>
    </html>
  )
}

