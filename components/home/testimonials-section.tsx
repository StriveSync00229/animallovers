"use client"

import { motion, useInView } from "framer-motion"
import { Quote, Star, Heart, ArrowLeft, ArrowRight } from "lucide-react"
import Image from "next/image"
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    id: 1,
    name: "Émilie Moreau",
    role: "Propriétaire de Max",
    quote:
      "Adopter Max a été la meilleure décision de ma vie. AnimalLovers a rendu le processus d'adoption simple et transparent. Maintenant, j'ai un compagnon fidèle qui m'apporte de la joie chaque jour.",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    rating: 5,
    location: "Paris, France",
  },
  {
    id: 2,
    name: "Lucas Bernard",
    role: "Propriétaire de Luna",
    quote:
      "Grâce aux conseils d'AnimalLovers, j'ai pu offrir à Luna une alimentation adaptée à ses besoins. Sa santé s'est nettement améliorée et elle est plus énergique que jamais. Merci pour votre expertise !",
    image:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    rating: 5,
    location: "Lyon, France",
  },
  {
    id: 3,
    name: "Sophie Martin",
    role: "Bénévole",
    quote:
      "Devenir bénévole chez AnimalLovers a changé ma vie. Aider ces animaux à trouver un foyer aimant est incroyablement gratifiant. Je suis fière de faire partie de cette communauté bienveillante.",
    image:
      "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    rating: 5,
    location: "Marseille, France",
  },
  {
    id: 4,
    name: "Thomas Dubois",
    role: "Propriétaire de Rocky",
    quote:
      "Les produits recommandés par AnimalLovers sont d'une qualité exceptionnelle. Rocky adore son nouveau lit et ses jouets. Le service client est également remarquable, toujours à l'écoute.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    rating: 5,
    location: "Toulouse, France",
  },
]

const TestimonialsSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-rose-50 via-orange-50 to-yellow-50 md:py-32">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto mb-16 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium text-rose-700 bg-white/80 backdrop-blur-sm rounded-full shadow-lg"
          >
            <Heart className="w-4 h-4 mr-2" />
            <span>Témoignages</span>
          </motion.div>

          <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl lg:text-6xl">
            Ce que disent nos{" "}
            <span className="bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent">
              adoptants
            </span>
          </h2>

          <p className="text-xl text-gray-600 leading-relaxed">
            Découvrez les histoires touchantes de ceux qui ont trouvé leur compagnon parfait grâce à AnimalLovers.
          </p>
        </motion.div>

        {/* Main testimonial display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative max-w-4xl mx-auto mb-12"
        >
          <div className="relative p-8 md:p-12 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20">
            <Quote className="absolute top-6 right-6 w-16 h-16 text-rose-100" />

            <div className="relative z-10">
              <div className="flex items-center mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400 mr-1" />
                ))}
              </div>

              <blockquote className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8 font-medium">
                "{testimonials[currentIndex].quote}"
              </blockquote>

              <div className="flex items-center">
                <div className="relative w-16 h-16 mr-4 overflow-hidden rounded-full ring-4 ring-white shadow-lg">
                  <Image
                    src={testimonials[currentIndex].image || "/placeholder.svg"}
                    alt={testimonials[currentIndex].name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900">{testimonials[currentIndex].name}</h4>
                  <p className="text-rose-600 font-medium">{testimonials[currentIndex].role}</p>
                  <p className="text-sm text-gray-500">{testimonials[currentIndex].location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-center space-x-4 mt-8">
            <Button
              onClick={prevTestimonial}
              variant="outline"
              size="lg"
              className="rounded-full w-12 h-12 p-0 border-2 border-rose-200 hover:border-rose-400 hover:bg-rose-50 bg-transparent"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <Button
              onClick={nextTestimonial}
              variant="outline"
              size="lg"
              className="rounded-full w-12 h-12 p-0 border-2 border-rose-200 hover:border-rose-400 hover:bg-rose-50 bg-transparent"
            >
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </motion.div>

        {/* Testimonial indicators */}
        <div className="flex justify-center space-x-2 mb-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-rose-500 w-8" : "bg-rose-200 hover:bg-rose-300"
              }`}
            />
          ))}
        </div>

        {/* All testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              onClick={() => setCurrentIndex(index)}
              className={`cursor-pointer p-6 rounded-2xl transition-all duration-300 ${
                index === currentIndex
                  ? "bg-white shadow-xl ring-2 ring-rose-500"
                  : "bg-white/60 hover:bg-white/80 shadow-lg hover:shadow-xl"
              }`}
            >
              <div className="flex items-center mb-4">
                <div className="relative w-12 h-12 mr-3 overflow-hidden rounded-full">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">{testimonial.name}</h4>
                  <p className="text-xs text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 line-clamp-3">"{testimonial.quote}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
