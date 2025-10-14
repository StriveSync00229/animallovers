"use client"

import type React from "react"

import { motion } from "framer-motion"
import { BookOpen, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useRouter } from "next/navigation"

const TrainingHealthHero = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/dressage-sante/recherche?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <section className="relative py-16 bg-gradient-to-b from-rose-50 to-white md:py-24">
      <div className="container px-4 mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium text-rose-700 bg-rose-100 rounded-full">
            <BookOpen className="w-4 h-4 mr-2" />
            <span>Conseils d'experts</span>
          </div>

          <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">Dressage & Santé</h1>

          <p className="mb-8 text-lg text-gray-600 md:text-xl">
            Découvrez nos conseils d'experts pour le bien-être, l'éducation et la santé de vos compagnons à quatre
            pattes.
          </p>

          <form onSubmit={handleSearch} className="flex max-w-md mx-auto">
            <div className="relative flex-grow">
              <Search className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
              <Input
                type="text"
                placeholder="Rechercher un conseil, un sujet..."
                className="pl-10 h-12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button type="submit" className="ml-2 h-12 bg-rose-500 hover:bg-rose-600">
              Rechercher
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}

export default TrainingHealthHero
