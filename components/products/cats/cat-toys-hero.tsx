"use client"

import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CatToysHero() {
  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?q=80&w=1920&auto=format&fit=crop')",
          backgroundPosition: "center 40%",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 z-10"></div>
      </div>

      <div className="container mx-auto px-4 h-full flex items-center relative z-20">
        <div className="max-w-2xl text-white">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Jouets & Divertissement pour Chats
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl mb-6 text-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Découvrez notre sélection de jouets et accessoires pour stimuler l'instinct de chasse de votre félin,
            favoriser son activité physique et mentale, et lui offrir des heures de divertissement.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button size="lg" className="bg-rose-600 hover:bg-rose-700">
              Découvrir nos produits
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
              Guide d'achat
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
