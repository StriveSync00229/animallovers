"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Calendar, User, ArrowRight, BookOpen, Euro } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Ebook {
  id: string
  title: string
  excerpt: string | null
  content: string
  slug: string
  featured_image: string | null
  category_id: string | null
  subcategory_id: string | null
  price: number | null
  pdf_url: string | null
  created_at: string
  published_at: string | null
  category?: {
    id: string
    name: string
    slug: string
    color: string | null
  } | null
  subcategory?: {
    id: string
    name: string
    slug: string
    color: string | null
  } | null
  author?: {
    id: string
    first_name: string | null
    last_name: string | null
    avatar_url: string | null
  } | null
}

const EbookPreview = () => {
  const [ebooks, setEbooks] = useState<Ebook[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadEbooks()
  }, [])

  const loadEbooks = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/ebooks?limit=3")
      const result = await response.json()

      if (result.success) {
        setEbooks(result.data || [])
      }
    } catch (error) {
      console.error("Erreur lors du chargement des ebooks:", error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  const getAuthorName = (author: Ebook["author"]) => {
    if (!author) return "AnimalLovers"
    if (author.first_name && author.last_name) {
      return `${author.first_name} ${author.last_name}`
    }
    return author.first_name || author.last_name || "AnimalLovers"
  }

  const getCategoryName = (ebook: Ebook) => {
    if (ebook.subcategory) {
      return ebook.subcategory.name
    }
    if (ebook.category) {
      return ebook.category.name
    }
    return "Ebook"
  }

  const getEbookImage = (ebook: Ebook) => {
    if (ebook.featured_image) {
      return ebook.featured_image
    }
    // Image par défaut pour les ebooks
    return "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }

  const getEbookUrl = (ebook: Ebook) => {
    if (ebook.slug) {
      return `/dressage-sante/${ebook.slug}`
    }
    return `/dressage-sante/${ebook.id}`
  }

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50 md:py-24">
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            <span className="mr-2">📚</span> Nos Ebooks
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez notre collection d'ebooks sur le dressage et la santé de vos animaux de compagnie
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : ebooks.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p>Aucun ebook publié pour le moment.</p>
            <p className="text-sm mt-2">Les ebooks publiés depuis le dashboard admin apparaîtront ici.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
              {ebooks.map((ebook, index) => (
                <motion.div
                  key={ebook.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group perspective-1000"
                >
                  {/* Livre 3D avec couverture */}
                  <div className="relative group-hover:scale-105 transition-transform duration-500">
                    {/* Couverture du livre avec effet 3D */}
                    <Link href={getEbookUrl(ebook)} className="block">
                      <div className="relative w-full h-[450px] bg-gradient-to-br from-green-600 to-green-800 rounded-lg shadow-2xl overflow-hidden transform-gpu">
                        {/* Image de couverture */}
                        <div className="absolute inset-0">
                          <Image
                            src={getEbookImage(ebook)}
                            alt={ebook.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          {/* Overlay pour effet livre */}
                          <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10"></div>
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40"></div>
                        </div>
                        
                        {/* Effet de relief sur la couverture */}
                        <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-transparent"></div>
                        
                        {/* Badge Ebook */}
                        <div className="absolute top-4 left-4 px-3 py-1.5 text-xs font-semibold text-white bg-green-600/95 backdrop-blur-sm rounded-full flex items-center gap-1 z-10 shadow-lg">
                          <BookOpen className="w-3 h-3" />
                          Ebook
                        </div>
                        
                        {/* Catégorie */}
                        <div className="absolute top-4 right-4 px-3 py-1.5 text-xs font-medium text-white bg-rose-500/95 backdrop-blur-sm rounded-full z-10 shadow-lg">
                          {getCategoryName(ebook)}
                        </div>
                        
                        {/* Prix */}
                        {ebook.price && (
                          <div className="absolute bottom-20 right-4 px-4 py-2 bg-white/98 backdrop-blur-sm rounded-lg shadow-xl z-10 border-2 border-green-200">
                            <div className="flex items-center gap-1">
                              <Euro className="w-4 h-4 text-green-600" />
                              <span className="text-xl font-bold text-green-600">{ebook.price.toFixed(2)}</span>
                            </div>
                          </div>
                        )}
                        
                        {/* Titre sur la couverture */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/70 to-transparent">
                          <h3 className="text-white font-bold text-xl line-clamp-2 mb-2 drop-shadow-lg">
                            {ebook.title}
                          </h3>
                          {ebook.excerpt && (
                            <p className="text-white/95 text-sm line-clamp-2 drop-shadow">
                              {ebook.excerpt}
                            </p>
                          )}
                        </div>
                        
                        {/* Effet de tranche du livre (côté droit) - simule l'épaisseur */}
                        <div className="absolute -right-1 top-2 bottom-2 w-3 bg-gradient-to-l from-gray-700 via-gray-800 to-gray-900 rounded-r-md shadow-inner opacity-80"></div>
                        
                        {/* Effet de pages empilées (côté droit, en arrière) */}
                        <div className="absolute -right-2 top-3 bottom-3 w-2 bg-gradient-to-l from-gray-600 to-gray-700 rounded-r-sm opacity-50"></div>
                        <div className="absolute -right-3 top-4 bottom-4 w-1.5 bg-gradient-to-l from-gray-500 to-gray-600 rounded-r-sm opacity-40"></div>
                      </div>
                    </Link>
                    
                    {/* Informations supplémentaires sous le livre */}
                    <div className="mt-6 text-center">
                      <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-2">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(ebook.published_at || ebook.created_at)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          <span className="truncate max-w-[100px]">{getAuthorName(ebook.author)}</span>
                        </div>
                      </div>
                      <Link href={getEbookUrl(ebook)}>
                        <Button className="bg-green-600 hover:bg-green-700 text-white">
                          Découvrir l'ebook
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center mt-12">
              <Button asChild className="bg-green-600 hover:bg-green-700">
                <Link href="/dressage-sante" className="flex items-center">
                  Voir tous les ebooks
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default EbookPreview

