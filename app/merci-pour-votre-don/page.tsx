"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Heart, Home, Share } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useEffect } from "react"
import { useToast } from "@/hooks/use-toast"

export default function ThankYouPage() {
  const { toast } = useToast()

  useEffect(() => {
    toast({
      title: "Don effectué avec succès !",
      description: "Merci pour votre générosité envers nos amis à quatre pattes.",
      variant: "default",
    })
  }, [toast])

  return (
    <main className="flex flex-col min-h-screen py-16 bg-gray-50">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl p-8 mx-auto text-center bg-white rounded-lg shadow-lg"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="flex items-center justify-center w-24 h-24 mx-auto mb-6 bg-rose-100 rounded-full"
          >
            <Heart className="w-12 h-12 text-rose-500" />
          </motion.div>

          <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">Merci pour votre don !</h1>
          <p className="mb-8 text-lg text-gray-600">
            Votre générosité va faire une différence dans la vie de nos amis à quatre pattes. Nous vous avons envoyé un
            reçu par email.
          </p>

          <div className="relative w-full h-64 mb-8 overflow-hidden rounded-lg">
            <Image
              src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
              alt="Chien et chat heureux"
              fill
              className="object-cover"
            />
          </div>

          <div className="p-4 mb-8 bg-rose-50 rounded-lg">
            <p className="text-rose-700">
              Grâce à vous, nous pouvons continuer notre mission de sauvetage et d'aide aux animaux dans le besoin.
              Chaque euro compte !
            </p>
          </div>

          <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4 sm:justify-center">
            <Button asChild className="bg-rose-500 hover:bg-rose-600">
              <Link href="/">
                <Home className="w-5 h-5 mr-2" />
                Retour à l'accueil
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="#share">
                <Share className="w-5 h-5 mr-2" />
                Partager
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
