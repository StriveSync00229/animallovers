"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Heart, Shield, Users } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const DonationSection = () => {
  return (
    <section className="py-16 bg-rose-50 md:py-24">
      <div className="container px-4 mx-auto">
        <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col space-y-6"
          >
            <div className="inline-flex items-center px-3 py-1 text-sm font-medium text-rose-700 bg-rose-100 rounded-full w-fit">
              <Heart className="w-4 h-4 mr-2" />
              <span>Soutenez notre cause</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">Votre don peut sauver des vies</h2>
            <p className="text-lg text-gray-600">
              Chaque contribution, quelle que soit sa taille, nous aide à fournir des soins, de la nourriture et un abri
              aux animaux dans le besoin. Ensemble, nous pouvons faire une différence.
            </p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <Shield className="w-8 h-8 mb-3 text-rose-500" />
                <h3 className="mb-2 text-lg font-semibold">Soins vétérinaires</h3>
                <p className="text-sm text-gray-600">
                  Financement des soins médicaux pour les animaux abandonnés ou maltraités.
                </p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <Users className="w-8 h-8 mb-3 text-rose-500" />
                <h3 className="mb-2 text-lg font-semibold">Aide aux propriétaires</h3>
                <p className="text-sm text-gray-600">
                  Soutien aux propriétaires en difficulté financière pour garder leurs animaux.
                </p>
              </div>
            </div>

            <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4 pt-4">
              <Button asChild size="lg" className="bg-rose-500 hover:bg-rose-600">
                <Link href="/faire-un-don">Faire un don</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative h-[400px] rounded-lg overflow-hidden shadow-xl"
          >
            <Image
              src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
              alt="Chiens sauvés"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default DonationSection
