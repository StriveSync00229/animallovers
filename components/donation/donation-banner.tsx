"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const DonationBanner = () => {
  return (
    <section className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
      {/* Image de fond */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          alt="Un chien et un chat dans les bras d'un soignant"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30" />
      </div>

      {/* Contenu */}
      <div className="container relative z-10 flex flex-col items-center justify-center h-full px-4 mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <h1 className="mb-6 text-3xl font-bold text-white md:text-5xl lg:text-6xl">
            Faites une différence aujourd'hui
          </h1>
          <p className="mb-8 text-lg text-white md:text-xl">Offrez amour, soins et un foyer à ceux qui n'en ont pas.</p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Button
              asChild
              size="lg"
              className="bg-rose-500 hover:bg-rose-600 text-lg px-8 py-6 rounded-full shadow-lg"
            >
              <Link href="/faire-un-don#donation-form">
                <Heart className="w-5 h-5 mr-2" />
                Je fais un don maintenant
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default DonationBanner
