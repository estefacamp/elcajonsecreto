import { Instagram } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-secondary border-t border-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-primary font-bold text-lg mb-4">El Cajón Secreto</h3>
            <p className="text-muted-foreground text-sm">
              Donde empieza el placer. Tu tienda de confianza para productos premium.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Tienda</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Productos</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Categorías</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Ofertas</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Nuevo</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Ayuda</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Contacto</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Envíos</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Devoluciones</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Síguenos</h4>
            <a
              href="https://instagram.com/elcajon_secreto"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors"
            >
              <Instagram className="w-5 h-5" />
              <span className="text-sm">@elcajon_secreto</span>
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-muted pt-8 text-center text-sm text-muted-foreground">
          <p>2025 El Cajón Secreto. Todos los derechos reservados.</p>
          <p className="mt-2">Acceso restringido a mayores de 18 años</p>
        </div>
      </div>
    </footer>
  )
}
