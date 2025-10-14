"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Données fictives pour l'équipe
const teamMembers = [
  {
    id: 1,
    name: "Sophie Martin",
    role: "Fondatrice & Responsable stratégie",
    bio: "Passionnée d'animaux depuis son plus jeune âge, Sophie a travaillé pendant 10 ans dans un refuge avant de lancer AnimalLovers.",
    quote:
      "Je crois fermement que chaque foyer mérite un compagnon à quatre pattes… et chaque animal, un foyer aimant.",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    name: "Thomas Dubois",
    role: "Responsable des partenariats",
    bio: "Ancien vétérinaire, Thomas met son expertise au service des refuges partenaires et développe notre réseau.",
    quote: "Chaque collaboration nous rapproche de notre objectif : zéro animal sans foyer.",
    image:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    name: "Emma Petit",
    role: "Rédactrice en chef",
    bio: "Comportementaliste canin et félin, Emma supervise tous les contenus éducatifs du site.",
    quote: "L'éducation est la clé pour une relation harmonieuse entre l'humain et l'animal.",
    image:
      "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    name: "Lucas Bernard",
    role: "Responsable technique",
    bio: "Développeur web et amoureux des chats, Lucas veille au bon fonctionnement de la plateforme.",
    quote: "La technologie doit servir des causes qui nous tiennent à cœur.",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  },
]

const TeamSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const nextSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prevIndex) => (prevIndex === teamMembers.length - 1 ? 0 : prevIndex + 1))
    setTimeout(() => setIsAnimating(false), 500)
  }

  const prevSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? teamMembers.length - 1 : prevIndex - 1))
    setTimeout(() => setIsAnimating(false), 500)
  }

  const visibleMembers = () => {
    // Sur mobile, afficher un membre à la fois
    // Sur desktop, afficher 3 membres à la fois
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768
    if (isMobile) {
      return [teamMembers[currentIndex]]
    } else {
      const result = []
      for (let i = 0; i < 3; i++) {
        const index = (currentIndex + i) % teamMembers.length
        result.push(teamMembers[index])
      }
      return result
    }
  }

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
          <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">Notre équipe</h2>
          <p className="text-lg text-gray-700">
            Découvrez les passionnés qui œuvrent chaque jour pour améliorer la vie des animaux et faciliter leur
            adoption.
          </p>
        </motion.div>

        <div className="relative">
          <div className="flex overflow-hidden">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="grid w-full grid-cols-1 gap-6 md:grid-cols-3"
            >
              {visibleMembers().map((member, index) => (
                <div
                  key={member.id}
                  className="flex flex-col items-center p-6 text-center bg-[#f8f5f0] rounded-lg shadow-sm"
                >
                  <div className="relative w-32 h-32 mb-4 overflow-hidden rounded-full">
                    <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                  </div>
                  <h3 className="mb-1 text-xl font-semibold text-gray-900">{member.name}</h3>
                  <p className="mb-3 text-sm font-medium text-[#4a6741]">{member.role}</p>
                  <p className="mb-4 text-sm text-gray-600">{member.bio}</p>
                  <blockquote className="p-3 italic text-sm text-gray-700 bg-white rounded-lg">
                    "{member.quote}"
                  </blockquote>
                </div>
              ))}
            </motion.div>
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-0 z-10 p-2 -translate-y-1/2 bg-white rounded-full shadow-md top-1/2 -ml-4"
            aria-label="Membre précédent"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 z-10 p-2 -translate-y-1/2 bg-white rounded-full shadow-md top-1/2 -mr-4"
            aria-label="Membre suivant"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="flex justify-center mt-6">
          {teamMembers.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 mx-1 rounded-full ${index === currentIndex ? "bg-[#4a6741]" : "bg-gray-300"}`}
              aria-label={`Aller au membre ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default TeamSection
