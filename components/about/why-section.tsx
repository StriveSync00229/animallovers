"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const WhySection = () => {
  return (
    <section className="py-16 bg-[#f8f5f0] md:py-24">
      <div className="container px-4 mx-auto">
        <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative h-[400px] overflow-hidden rounded-xl shadow-lg"
          >
            <Image
              src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
              alt="Louna, l'inspiration derrière AnimalLovers"
              fill
              className="object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-xl"
          >
            <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">Pourquoi ce projet ?</h2>
            <div className="space-y-4 text-lg leading-relaxed text-gray-700">
              <p>
                Tout a commencé le jour où j'ai adopté Louna, une petite chienne abandonnée. C'est elle qui m'a appris
                que chaque animal mérite une seconde chance. De cette rencontre est né AnimalLovers.
              </p>
              <p>
                Après avoir constaté les difficultés que rencontrent les refuges pour faire adopter leurs pensionnaires
                et le manque d'information accessible pour les propriétaires, j'ai décidé de créer une plateforme qui
                répondrait à ces besoins.
              </p>
              <p>
                Notre équipe s'est formée autour de cette vision commune : faciliter la rencontre entre les animaux qui
                cherchent un foyer et les familles prêtes à les accueillir, tout en offrant les ressources nécessaires
                pour une cohabitation harmonieuse.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default WhySection
