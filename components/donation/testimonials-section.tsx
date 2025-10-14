"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

// Données fictives pour les témoignages avant/après
const testimonials = [
  {
    id: 1,
    name: "Bella",
    beforeImage:
      "https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    afterImage:
      "https://images.unsplash.com/photo-1583511655826-05700442b31b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    story:
      "Grâce à vos dons, Bella a pu être opérée et a trouvé un foyer aimant. Elle était gravement blessée lorsque nous l'avons trouvée, mais aujourd'hui elle est pleine de vie.",
  },
  {
    id: 2,
    name: "Max",
    beforeImage:
      "https://images.unsplash.com/photo-1444212477490-ca407925329e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    afterImage:
      "https://images.unsplash.com/photo-1561037404-61cd46aa615b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    story:
      "Max était sous-alimenté et craintif quand il est arrivé au refuge. Après des soins attentifs financés par vos dons, il a retrouvé sa santé et sa joie de vivre.",
  },
  {
    id: 3,
    name: "Luna",
    beforeImage:
      "https://images.unsplash.com/photo-1511044568932-338cba0ad803?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    afterImage:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    story:
      "Luna a été sauvée d'une situation de maltraitance. Grâce à votre générosité, elle a reçu les soins médicaux nécessaires et vit maintenant heureuse dans sa nouvelle famille.",
  },
  {
    id: 4,
    name: "Charlie",
    beforeImage:
      "https://images.unsplash.com/photo-1525253013412-55c1a69a5738?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    afterImage:
      "https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    story:
      "Charlie a été abandonné avec une patte cassée. Vos dons ont permis de financer son opération et sa rééducation. Aujourd'hui, il court et joue comme si de rien n'était.",
  },
]

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)

  const nextSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1))
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [currentIndex])

  // Autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 6000)

    return () => clearInterval(interval)
  }, [currentIndex, isAnimating])

  return (
    <section className="py-16 bg-white md:py-24">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">Histoires de réussite</h2>
          <p className="text-lg text-gray-600">
            Découvrez comment vos dons transforment la vie des animaux. Voici quelques-unes de nos histoires
            avant/après.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div ref={carouselRef} className="overflow-hidden rounded-lg shadow-lg">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2"
            >
              <div className="relative flex flex-col">
                <div className="relative h-64 md:h-80">
                  <Image
                    src={testimonials[currentIndex].beforeImage || "/placeholder.svg"}
                    alt={`${testimonials[currentIndex].name} avant`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-0 left-0 px-3 py-1 m-2 text-xs font-medium text-white bg-gray-800 rounded-full">
                    Avant
                  </div>
                </div>
                <div className="relative h-64 md:h-80">
                  <Image
                    src={testimonials[currentIndex].afterImage || "/placeholder.svg"}
                    alt={`${testimonials[currentIndex].name} après`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-0 left-0 px-3 py-1 m-2 text-xs font-medium text-white bg-green-600 rounded-full">
                    Après
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center p-6 bg-white">
                <h3 className="mb-4 text-2xl font-bold text-gray-900">{testimonials[currentIndex].name}</h3>
                <p className="mb-6 text-gray-600">{testimonials[currentIndex].story}</p>
                <div className="flex justify-center space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-3 h-3 rounded-full ${index === currentIndex ? "bg-rose-500" : "bg-gray-300"}`}
                      aria-label={`Voir l'histoire de ${testimonials[index].name}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-0 z-10 p-2 -translate-y-1/2 bg-white rounded-full shadow-md top-1/2 -ml-4"
            aria-label="Témoignage précédent"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 z-10 p-2 -translate-y-1/2 bg-white rounded-full shadow-md top-1/2 -mr-4"
            aria-label="Témoignage suivant"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
