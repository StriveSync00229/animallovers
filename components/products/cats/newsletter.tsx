"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Mail, CheckCircle2 } from "lucide-react"

export default function CatNewsletter() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simuler une requête API
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubscribed(true)
      setEmail("")
      toast({
        title: "Inscription réussie !",
        description: "Vous recevrez bientôt nos conseils et offres spéciales pour votre chat.",
        duration: 5000,
      })
    }, 1500)
  }

  return (
    <section className="py-16 bg-rose-50 rounded-xl">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Mail className="h-12 w-12 text-rose-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Restez informé des nouveautés</h2>
            <p className="text-lg text-gray-600 mb-8">
              Inscrivez-vous à notre newsletter pour recevoir en avant-première nos nouveaux produits, des conseils
              d'experts pour le bien-être de votre chat et des offres exclusives.
            </p>

            {!isSubscribed ? (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Votre adresse email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-grow"
                  disabled={isSubmitting}
                />
                <Button type="submit" className="bg-rose-600 hover:bg-rose-700" disabled={isSubmitting}>
                  {isSubmitting ? "Inscription..." : "S'inscrire"}
                </Button>
              </form>
            ) : (
              <div className="flex items-center justify-center text-green-600 font-medium">
                <CheckCircle2 className="h-5 w-5 mr-2" />
                Merci pour votre inscription !
              </div>
            )}

            <p className="text-sm text-gray-500 mt-4">
              En vous inscrivant, vous acceptez de recevoir nos emails et confirmez avoir lu notre politique de
              confidentialité. Vous pourrez vous désinscrire à tout moment.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">Offres exclusives</h3>
              <p className="text-gray-600 text-sm">
                Accédez à des promotions réservées à nos abonnés et soyez les premiers informés de nos ventes privées.
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">Conseils d'experts</h3>
              <p className="text-gray-600 text-sm">
                Recevez des conseils personnalisés de nos vétérinaires et comportementalistes félins.
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">Nouveautés en avant-première</h3>
              <p className="text-gray-600 text-sm">
                Découvrez nos nouveaux produits avant tout le monde et bénéficiez de tests exclusifs.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
