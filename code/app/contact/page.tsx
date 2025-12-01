'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin } from 'lucide-react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import LoginModal from '@/components/login-modal' // 👈 IMPORTANTE

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  // 👇 ESTO AGREGA EL LOGIN
  const [showLogin, setShowLogin] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Formulario enviado:', formData)
    setSubmitted(true)
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' })
      setSubmitted(false)
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">

      {/* 👇 AHOPO PASO onLoginClick AL HEADER */}
      <Header onLoginClick={() => setShowLogin(true)} />

      <div className="flex-1 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-2 text-center">Contáctanos</h1>
          <p className="text-foreground/70 text-center mb-12">Estamos aquí para ayudarte con cualquier pregunta</p>

          <div className="grid md:grid-cols-2 gap-12">
            
            {/* Información de contacto */}
            <div className="space-y-8">
              <div className="flex gap-4">
                <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-foreground mb-1">Email</h3>
                  <p className="text-foreground/70">info@elcajonsecret.com</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Phone className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-foreground mb-1">Teléfono</h3>
                  <p className="text-foreground/70">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex gap-4">
                <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-foreground mb-1">Dirección</h3>
                  <p className="text-foreground/70">123 Pleasure Ave, Love City, LC 12345</p>
                </div>
              </div>

              <div className="bg-secondary rounded-lg p-6 mt-8">
                <h3 className="font-bold text-foreground mb-4">Horario de Atención</h3>
                <ul className="space-y-2 text-foreground/70">
                  <li>Lunes - Viernes: 9:00 AM - 6:00 PM</li>
                  <li>Sábado: 10:00 AM - 4:00 PM</li>
                  <li>Domingo: Cerrado</li>
                </ul>
              </div>
            </div>

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-foreground font-semibold mb-2">Nombre</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-secondary text-foreground rounded-lg border border-secondary focus:border-primary outline-none transition-colors"
                  placeholder="Tu nombre"
                />
              </div>

              <div>
                <label className="block text-foreground font-semibold mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-secondary text-foreground rounded-lg border border-secondary focus:border-primary outline-none transition-colors"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label className="block text-foreground font-semibold mb-2">Asunto</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-secondary text-foreground rounded-lg border border-secondary focus:border-primary outline-none transition-colors"
                  placeholder="¿En qué podemos ayudarte?"
                />
              </div>

              <div>
                <label className="block text-foreground font-semibold mb-2">Mensaje</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-secondary text-foreground rounded-lg border border-secondary focus:border-primary outline-none transition-colors resize-none"
                  placeholder="Tu mensaje aquí..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-accent text-background py-4 rounded-lg font-bold hover:bg-accent/90 transition-colors text-lg"
              >
                {submitted ? '¡Mensaje Enviado!' : 'Enviar Mensaje'}
              </button>
            </form>

          </div>
        </div>
      </div>

      <Footer />

      {/* 👇 MODAL LOGIN */}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </div>
  )
}
