"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import Link from "next/link"

const DonationCTA = () => {
  return (
    <section className="py-20 bg-rose-600">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center text-white"
        >
          <Heart className="w-16 h-16 mx-auto mb-6 text-white" />
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">Continuez à faire la différence</h2>
          <p className="mb-8 text-xl">
            Votre soutien est essentiel pour poursuivre notre mission et atteindre nos objectifs ambitieux. Chaque don,
            quel que soit son montant, contribue à transformer la vie des animaux dans le besoin.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
            <Button asChild size="lg" className="bg-white text-rose-600 hover:bg-gray-100">
              <Link href="/faire-un-don">Je fais un don maintenant</Link>
            </Button>
          </div>
          <p className="mt-8 text-sm text-rose-200">
            Vos dons sont déductibles des impôts à hauteur de 66% dans la limite de 20% de votre revenu imposable.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default DonationCTA
