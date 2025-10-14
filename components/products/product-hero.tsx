"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface ProductHeroProps {
  title: string
  description: string
  features: string[]
  images: string[]
  affiliateLink: string
}

export default function ProductHero({ title, description, features, images, affiliateLink }: ProductHeroProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <section className="relative py-12 bg-gradient-to-b from-rose-50 to-white">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Image Carousel */}
          <div className="relative overflow-hidden rounded-lg shadow-lg aspect-square">
            {/* Main Image */}
            <div className="relative w-full h-full">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={cn(
                    "absolute inset-0 transition-opacity duration-500",
                    index === currentImageIndex ? "opacity-100" : "opacity-0",
                  )}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${title} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute p-2 text-white transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full left-4 top-1/2 hover:bg-opacity-70"
                  aria-label="Image précédente"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute p-2 text-white transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full right-4 top-1/2 hover:bg-opacity-70"
                  aria-label="Image suivante"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Image Indicators */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={cn(
                      "w-2.5 h-2.5 rounded-full transition-colors",
                      index === currentImageIndex ? "bg-rose-500" : "bg-white bg-opacity-60 hover:bg-opacity-80",
                    )}
                    aria-label={`Voir image ${index + 1}`}
                  />
                ))}
              </div>
            )}

            {/* Certification Badge */}
            <div className="absolute top-4 right-4 bg-white rounded-full shadow-md p-2.5">
              <div className="flex items-center justify-center w-16 h-16 text-center bg-rose-500 rounded-full">
                <span className="text-xs font-bold text-white">SÉLECTION ANIMALLOVERS</span>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center">
            <h1 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl">{title}</h1>
            <p className="mb-6 text-lg text-gray-600">{description}</p>

            {/* Key Features */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {features.map((feature, index) => (
                  <span key={index} className="px-3 py-1 text-sm font-medium text-rose-700 bg-rose-100 rounded-full">
                    ✓ {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Button asChild className="w-full py-6 text-lg font-bold bg-amber-500 hover:bg-amber-600">
                <a
                  href={affiliateLink}
                  target="_blank"
                  rel="noreferrer nofollow noopener"
                  className="flex items-center justify-center"
                >
                  <span className="mr-2">👉</span> Voir ce produit sur Amazon
                </a>
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center mt-4 text-sm text-gray-500">
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Livraison rapide
              </span>
              <span className="mx-2">•</span>
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Retours gratuits
              </span>
              <span className="mx-2">•</span>
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Prix mis à jour
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
