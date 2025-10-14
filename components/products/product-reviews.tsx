import Image from "next/image"
import { Star } from "lucide-react"

interface AmazonReview {
  rating: number
  text: string
  author: string
  date: string
}

interface Testimonial {
  text: string
  author: string
  image?: string
}

interface ProductReviewsProps {
  amazonReviews: AmazonReview[]
  testimonials: Testimonial[]
}

export default function ProductReviews({ amazonReviews, testimonials }: ProductReviewsProps) {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container px-4 mx-auto">
        <h2 className="mb-8 text-2xl font-bold text-center text-gray-800 md:text-3xl">
          Ce qu'en disent les utilisateurs
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Amazon Reviews */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="flex items-center mb-6 text-xl font-semibold text-gray-800">
              <svg className="w-6 h-6 mr-2 text-amber-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.53 16.28a.75.75 0 0 1-1.06 0L7.72 12.53a.75.75 0 0 1 0-1.06l3.75-3.75a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75Z" />
              </svg>
              Avis vérifiés Amazon
            </h3>

            <div className="space-y-4">
              {amazonReviews.map((review, index) => (
                <div key={index} className="pb-4 border-b border-gray-100 last:border-0">
                  <div className="flex items-center mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < review.rating ? "text-amber-400 fill-amber-400" : "text-gray-300"}`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-500">
                      {review.author} • {review.date}
                    </span>
                  </div>
                  <p className="text-gray-600">{review.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* AnimalLovers Testimonials */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="flex items-center mb-6 text-xl font-semibold text-gray-800">
              <span className="mr-2 text-xl">🐾</span>
              Ce qu'en disent nos adoptants
            </h3>

            <div className="space-y-6">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="flex space-x-4">
                  {testimonial.image ? (
                    <div className="relative w-12 h-12 overflow-hidden rounded-full shrink-0">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.author}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center w-12 h-12 text-white bg-rose-500 rounded-full shrink-0">
                      {testimonial.author.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="mb-2 italic text-gray-600">"{testimonial.text}"</p>
                    <p className="text-sm font-medium text-gray-700">– {testimonial.author}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
