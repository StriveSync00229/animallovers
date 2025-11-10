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
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {ebooks.map((ebook, index) => (
                <motion.article
                  key={ebook.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="overflow-hidden bg-white border-2 border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                >
                  <Link href={getEbookUrl(ebook)} className="block">
                    <div className="relative h-64">
                      <Image
                        src={getEbookImage(ebook)}
                        alt={ebook.title}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                      />
                      <div className="absolute top-0 left-0 px-3 py-1 m-2 text-xs font-semibold text-white bg-green-600 rounded-full flex items-center gap-1">
                        <BookOpen className="w-3 h-3" />
                        Ebook
                      </div>
                      <div className="absolute top-0 right-0 px-3 py-1 m-2 text-xs font-medium text-white bg-rose-500 rounded-full">
                        {getCategoryName(ebook)}
                      </div>
                    </div>

                    <div className="p-6">
                      <Link href={getEbookUrl(ebook)}>
                        <h3 className="mb-2 text-xl font-semibold transition-colors hover:text-rose-500 line-clamp-2">
                          {ebook.title}
                        </h3>
                      </Link>
                      <p className="mb-4 text-gray-600 line-clamp-3">
                        {ebook.excerpt || ebook.content.substring(0, 150) + "..."}
                      </p>
                      <div className="flex items-center justify-between pt-4 mt-4 border-t">
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>{formatDate(ebook.published_at || ebook.created_at)}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <User className="w-4 h-4 mr-1" />
                          <span className="truncate max-w-[100px]">{getAuthorName(ebook.author)}</span>
                        </div>
                      </div>
                      {ebook.price && (
                        <div className="flex items-center justify-center mt-4 pt-4 border-t">
                          <div className="flex items-center gap-2">
                            <Euro className="w-5 h-5 text-green-600" />
                            <span className="text-2xl font-bold text-green-600">{ebook.price.toFixed(2)}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </Link>
                </motion.article>
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

