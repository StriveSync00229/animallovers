"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Check } from "lucide-react"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Ici, vous pourriez ajouter la logique pour envoyer l'email à votre API
    setIsSubmitted(true)
  }

  return (
    <section className="py-12 bg-rose-50">
      <div className="container px-4 mx-auto">
        <motion.div
          className="max-w-3xl p-8 mx-auto bg-white rounded-lg shadow-md"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {!isSubmitted ? (
            <>
              <h2 className="mb-4 text-2xl font-bold text-center text-gray-800">
                Recevez nos offres spéciales multi-espèce
              </h2>
              <p className="mb-6 text-center text-gray-600">
                Inscrivez-vous pour recevoir en avant-première nos nouveaux packs, des conseils d'experts et des offres
                exclusives pour tous vos animaux de compagnie
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  className="flex-grow px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button type="submit" className="px-6 py-3 font-medium text-white bg-rose-500 hover:bg-rose-600">
                  S'inscrire
                </Button>
              </form>
            </>
          ) : (
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="mb-4 text-2xl font-bold text-gray-800">Merci pour votre inscription !</h2>
              <p className="text-gray-600">
                Vous recevrez bientôt nos offres spéciales et conseils pour prendre soin de tous vos animaux de
                compagnie.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
