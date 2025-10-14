"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

export default function EmailSignup() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer votre adresse email",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      // Simulation d'un appel API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Inscription réussie !",
        description: "Vous recevrez bientôt nos recommandations personnalisées.",
        variant: "default",
      })

      setEmail("")
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-12 bg-rose-50">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl p-8 mx-auto bg-white rounded-lg shadow-md">
          <h2 className="mb-2 text-2xl font-bold text-center text-gray-800">Recevez nos recommandations mensuelles</h2>
          <p className="mb-6 text-center text-gray-600">
            Inscrivez-vous pour recevoir nos sélections de produits personnalisées pour votre animal
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-2">
            <Input
              type="email"
              placeholder="Votre adresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow"
              required
            />
            <Button type="submit" className="bg-rose-500 hover:bg-rose-600" disabled={loading}>
              {loading ? "Inscription..." : "S'inscrire"}
            </Button>
          </form>

          <p className="mt-4 text-xs text-center text-gray-500">
            En vous inscrivant, vous acceptez de recevoir nos emails. Vous pourrez vous désinscrire à tout moment.
          </p>
        </div>
      </div>
    </section>
  )
}
