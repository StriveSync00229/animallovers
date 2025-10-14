"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function MultiSpeciesHero() {
  return (
    <section className="relative py-20 bg-gradient-to-b from-rose-50 to-white">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col items-center md:flex-row md:justify-between">
          <motion.div
            className="max-w-2xl mb-10 text-center md:text-left md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="mb-4 text-4xl font-bold text-gray-800 md:text-5xl">Packs Multi-Espèce</h1>
            <p className="mb-6 text-xl text-gray-600">
              Des solutions complètes pour tous vos animaux de compagnie. Économisez du temps et de l'argent avec nos
              packs soigneusement composés.
            </p>
            <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
              <Button className="bg-rose-500 hover:bg-rose-600">Découvrir nos packs</Button>
              <Button variant="outline">Comment ça marche</Button>
            </div>
          </motion.div>

          <motion.div
            className="relative w-full h-64 overflow-hidden rounded-lg md:w-1/3 md:h-80"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Image
              src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1664&auto=format&fit=crop"
              alt="Animaux de compagnie variés"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
