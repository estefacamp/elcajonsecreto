"use client"

import { useState, useEffect } from "react"
import ProductCard from "./product-card"
import type { Product } from "@/lib/products"

export default function ProductGrid() {
  const [productos, setProductos] = useState<Product[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function cargar() {
      try {
        setCargando(true)
        setError(null)

        const res = await fetch("http://localhost:4000/api/productos")
        if (!res.ok) throw new Error("Error al cargar productos")

        const data = await res.json()

        console.log("📦 Data cruda desde backend:", data)

        // Normalizar datos del backend → modelo Product del front
        const normalizados: Product[] = data.map((p: any, index: number) => ({
          id: p._id, // ← ID real de Mongo
          name: p.name,
          price: Number(p.price),
          category: p.category ?? "otros",
          description: p.description ?? "Producto erótico premium.",
          image: p.image ?? "/placeholder.svg",
          rating: p.rating ?? 4.8,
          reviews: p.reviews ?? 20 + index,
        }))

        console.log("🎯 Productos normalizados:", normalizados)

        setProductos(normalizados)
      } catch (err) {
        console.error("❌ Error cargando productos:", err)
        setError("No se pudieron cargar los productos")
      } finally {
        setCargando(false)
      }
    }

    cargar()
  }, [])

  // LOADING
  if (cargando) {
    return (
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-muted-foreground">
            Cargando productos...
          </p>
        </div>
      </section>
    )
  }

  // ERROR
  if (error) {
    return (
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-red-500">{error}</p>
        </div>
      </section>
    )
  }

  // CATEGORÍAS dinámicas según lo que trae el backend
  const categories = Array.from(new Set(productos.map((p) => p.category)))

  // FILTRADO
  const filteredProducts = selectedCategory
    ? productos.filter((p) => p.category === selectedCategory)
    : productos

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Nuestros Productos
          </h2>
          <p className="text-muted-foreground">
            Selecciona desde nuestra colección cuidadosamente elegida
          </p>
        </div>

        {/* Botones de categorías */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full font-semibold transition-colors ${
              selectedCategory === null
                ? "bg-accent text-background"
                : "bg-secondary text-foreground hover:bg-secondary/80"
            }`}
          >
            Todos
          </button>

          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full font-semibold transition-colors capitalize ${
                selectedCategory === category
                  ? "bg-accent text-background"
                  : "bg-secondary text-foreground hover:bg-secondary/80"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* GRID DE PRODUCTOS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
