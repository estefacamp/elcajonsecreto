'use client'

import { Star } from 'lucide-react'

interface Review {
  id: string
  author: string
  rating: number
  text: string
  date: string
}

interface ReviewsSectionProps {
  productId: string
  reviews: Review[]
}

export default function ReviewsSection({ productId, reviews }: ReviewsSectionProps) {
  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : 0

  return (
    <div className="mt-12 border-t border-secondary pt-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-foreground">Reseñas de Clientes</h2>
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < Math.round(Number(averageRating))
                    ? 'fill-primary text-primary'
                    : 'text-secondary'
                }`}
              />
            ))}
          </div>
          <span className="text-foreground font-bold">{averageRating}/5</span>
          <span className="text-foreground/70">({reviews.length} reseñas)</span>
        </div>
      </div>

      <div className="space-y-6">
        {reviews.map(review => (
          <div key={review.id} className="border-b border-secondary pb-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-foreground">{review.author}</h3>
              <span className="text-sm text-foreground/70">{review.date}</span>
            </div>
            <div className="flex gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < review.rating
                      ? 'fill-primary text-primary'
                      : 'text-secondary'
                  }`}
                />
              ))}
            </div>
            <p className="text-foreground/80">{review.text}</p>
          </div>
        ))}
      </div>

      <button className="mt-8 px-6 py-3 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors">
        Escribir una Reseña
      </button>
    </div>
  )
}
