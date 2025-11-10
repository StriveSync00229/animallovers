"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Calendar, User, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Article {
  id: string
  title: string
  excerpt: string | null
  content: string
  slug: string
  featured_image: string | null
  category_id: string | null
  subcategory_id: string | null
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

const BlogPreview = () => {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadArticles()
  }, [])

  const loadArticles = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/articles?limit=6")
      const result = await response.json()

      if (result.success) {
        setArticles(result.data || [])
      }
    } catch (error) {
      console.error("Erreur lors du chargement des articles:", error)
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

  const getAuthorName = (author: Article["author"]) => {
    if (!author) return "AnimalLovers"
    if (author.first_name && author.last_name) {
      return `${author.first_name} ${author.last_name}`
    }
    return author.first_name || author.last_name || "AnimalLovers"
  }

  const getCategoryName = (article: Article) => {
    if (article.subcategory) {
      return article.subcategory.name
    }
    if (article.category) {
      return article.category.name
    }
    return "Article"
  }

  const getArticleImage = (article: Article) => {
    if (article.featured_image) {
      return article.featured_image
    }
    // Image par défaut selon l'espèce ou catégorie
    return "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }

  const getArticleUrl = (article: Article) => {
    if (article.slug) {
      return `/dressage-sante/${article.slug}`
    }
    return `/dressage-sante/${article.id}`
  }

  return (
    <section className="py-16 bg-white md:py-24">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">Conseils et actualités</h2>
          <p className="mb-8 text-lg text-gray-600">
            Découvrez nos derniers articles pour mieux comprendre et prendre soin de vos animaux de compagnie.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p>Aucun article publié pour le moment.</p>
            <p className="text-sm mt-2">Les articles publiés depuis le dashboard admin apparaîtront ici.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="overflow-hidden bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <Link href={getArticleUrl(article)} className="block">
                    <div className="relative h-48">
                      <Image
                        src={getArticleImage(article)}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                      />
                      <div className="absolute top-0 right-0 px-3 py-1 m-2 text-xs font-medium text-white bg-rose-500 rounded-full">
                        {getCategoryName(article)}
                      </div>
                    </div>
                  </Link>
                  <div className="p-5">
                    <Link href={getArticleUrl(article)}>
                      <h3 className="mb-2 text-xl font-semibold transition-colors hover:text-rose-500 line-clamp-2">
                        {article.title}
                      </h3>
                    </Link>
                    <p className="mb-4 text-gray-600 line-clamp-3">
                      {article.excerpt || article.content.substring(0, 150) + "..."}
                    </p>
                    <div className="flex items-center justify-between pt-4 mt-4 text-sm text-gray-500 border-t">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{formatDate(article.published_at || article.created_at)}</span>
                      </div>
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        <span className="truncate max-w-[100px]">{getAuthorName(article.author)}</span>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            <div className="flex justify-center mt-12">
              <Button asChild className="bg-rose-500 hover:bg-rose-600">
                <Link href="/dressage-sante" className="flex items-center">
                  Voir tous les articles
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

export default BlogPreview
