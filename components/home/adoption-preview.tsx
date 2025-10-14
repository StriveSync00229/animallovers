"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { PawPrint, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Données fictives pour la prévisualisation
const previewAnimals = [
  {
    id: 1,
    name: "Max",
    type: "Chien",
    breed: "Golden Retriever",
    age: "2 ans",
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    name: "Luna",
    type: "Chat",
    breed: "Siamois",
    age: "1 an",
    image:
      "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    name: "Rocky",
    type: "Chien",
    breed: "Berger Allemand",
    age: "3 ans",
    image:
      "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    name: "Mia",
    type: "Chat",
    breed: "Maine Coon",
    age: "2 ans",
    image: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  },
]

const AdoptionPreview = () => {
  const [filter, setFilter] = useState("all")

  const filteredAnimals =
    filter === "all" ? previewAnimals : previewAnimals.filter((animal) => animal.type.toLowerCase() === filter)

  return (
    <section className="py-16 bg-gray-50 md:py-24">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">Ils attendent une famille</h2>
          <p className="mb-8 text-lg text-gray-600">
            Découvrez quelques-uns de nos amis à quatre pattes qui cherchent un foyer aimant.
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
              className={filter === "all" ? "bg-rose-500 hover:bg-rose-600" : ""}
            >
              Tous
            </Button>
            <Button
              variant={filter === "chien" ? "default" : "outline"}
              onClick={() => setFilter("chien")}
              className={filter === "chien" ? "bg-rose-500 hover:bg-rose-600" : ""}
            >
              Chiens
            </Button>
            <Button
              variant={filter === "chat" ? "default" : "outline"}
              onClick={() => setFilter("chat")}
              className={filter === "chat" ? "bg-rose-500 hover:bg-rose-600" : ""}
            >
              Chats
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredAnimals.map((animal, index) => (
            <motion.div
              key={animal.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="overflow-hidden bg-white rounded-lg shadow-md"
            >
              <div className="relative h-48">
                <Image src={animal.image || "/placeholder.svg"} alt={animal.name} fill className="object-cover" />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold">{animal.name}</h3>
                  <span className="px-2 py-1 text-xs font-medium text-rose-700 bg-rose-100 rounded-full">
                    {animal.type}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  {animal.breed}, {animal.age}
                </p>
                <Button asChild variant="outline" className="w-full mt-4">
                  <Link href={`/adoptions/${animal.id}`}>
                    <PawPrint className="w-4 h-4 mr-2" />
                    Voir le profil
                  </Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Button asChild className="bg-rose-500 hover:bg-rose-600">
            <Link href="/adoptions" className="flex items-center">
              Voir tous les animaux à adopter
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default AdoptionPreview
