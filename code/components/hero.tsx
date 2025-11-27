export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-secondary to-background py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
          El Cajón Secreto
        </h1>
        <p className="text-xl md:text-2xl text-primary mb-4">
          Donde empieza el placer
        </p>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Descubre nuestra exclusiva colección de productos premium. Privacidad, 
          discreción y calidad garantizada en cada compra.
        </p>
        <button className="bg-primary hover:bg-accent text-primary-foreground px-8 py-3 rounded-lg font-semibold transition-colors">
          Explorar Productos
        </button>
      </div>
    </section>
  )
}
