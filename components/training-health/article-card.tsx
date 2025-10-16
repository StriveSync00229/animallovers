"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Calendar, User, Tag, Award } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Article } from "@/lib/server/article-service"

interface ArticleCardProps {
  article: Article
  index: number
}

const ArticleCard = ({ article, index }: ArticleCardProps) => {
  // Sécurité : valeurs par défaut pour éviter les erreurs
  const {
    slug,
    title = "Titre non disponible",
    excerpt = "",
    image,
    date,
    author = "Auteur inconnu",
    category,
    isVetApproved,
    tags = [],
  } = article || {}

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="overflow-hidden bg-white border rounded-lg shadow-sm"
    >
      {/* Image + Badges */}
      <Link href={`/dressage-sante/${slug || ""}`} className="block">
        <div className="relative h-48">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
          />

          {isVetApproved && (
            <div className="absolute top-0 right-0 px-2 py-1 m-2 text-xs font-medium text-white bg-green-600 rounded-full flex items-center">
              <Award className="w-3 h-3 mr-1" />
              Validé par un vétérinaire
            </div>
          )}

          {category && (
            <div className="absolute top-0 left-0 px-2 py-1 m-2 text-xs font-medium text-white bg-rose-500 rounded-full">
              {category}
            </div>
          )}
        </div>
      </Link>

      {/* Contenu principal */}
      <div className="p-5">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {Array.isArray(tags) && tags.length > 0 ? (
            tags.map((tag, i) => (
              <Badge key={i} variant="outline" className="text-xs">
                #{tag}
              </Badge>
            ))
          ) : (
            <span className="text-gray-400 text-xs italic">Aucun tag</span>
          )}
        </div>

        {/* Titre */}
        <Link href={`/dressage-sante/${slug || ""}`}>
          <h3 className="mb-2 text-xl font-semibold transition-colors hover:text-rose-500">
            {title}
          </h3>
        </Link>

        {/* Extrait */}
        {excerpt && <p className="mb-4 text-gray-600 line-clamp-2">{excerpt}</p>}

        {/* Infos auteur/date */}
        {(date || author) && (
          <div className="flex items-center justify-between pt-4 mt-4 text-sm text-gray-500 border-t">
            <div className="flex items-center">
              {date && (
                <>
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{date}</span>
                </>
              )}
            </div>
            <div className="flex items-center">
              <User className="w-4 h-4 mr-1" />
              <span>{author}</span>
            </div>
          </div>
        )}

        {/* Boutons */}
        <div className="flex justify-between mt-4">
          <Button asChild variant="outline" size="sm">
            <Link href={`/dressage-sante/${slug || ""}`}>Lire l'article</Link>
          </Button>

          <Button variant="ghost" size="sm" className="text-gray-500">
            <Tag className="w-4 h-4 mr-1" />
            Sauvegarder
          </Button>
        </div>
      </div>
    </motion.article>
  )
}

export default ArticleCard
