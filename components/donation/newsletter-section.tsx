"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Mail, CheckCircle } from "lucide-react"

const NewsletterSection = () => {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer une adresse email valide.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulation d'une requête API
    try {
      // Ici, vous intégreriez votre logique d'API réelle
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setIsSubscribed(true)
      toast({
        title: "Inscription réussie !",
        description: "Vous êtes maintenant inscrit à notre newsletter.",
        variant: "default",
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-16 bg-rose-500 md:py-24">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Restez informé</h2>
          <p className="mb-8 text-lg text-rose-100">
            Inscrivez-vous pour recevoir des nouvelles des animaux sauvés grâce à vos dons et suivre l'impact de votre
            générosité.
          </p>

          {!isSubscribed ? (
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-2">
              <div className="flex-grow">
                <Input
                  type="email"
                  placeholder="Votre adresse email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 bg-white"
                  required
                />
              </div>
              <Button type="submit" disabled={isSubmitting} className="h-12 bg-white text-rose-500 hover:bg-rose-50">
                {isSubmitting ? (
                  "Inscription en cours..."
                ) : (
                  <>
                    <Mail className="w-5 h-5 mr-2" />
                    Je m'inscris
                  </>
                )}
              </Button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center p-6 space-y-4 bg-white rounded-lg"
            >
              <CheckCircle className="w-16 h-16 text-green-500" />
              <h3 className="text-xl font-semibold text-gray-900">Merci pour votre inscription !</h3>
              <p className="text-gray-600">
                Vous recevrez bientôt des nouvelles de nos amis à quatre pattes et de l'impact de vos dons.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default NewsletterSection
