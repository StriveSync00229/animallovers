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
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="overflow-hidden bg-white border rounded-lg shadow-sm"
    >
      <Link href={`/dressage-sante/${article.slug}`} className="block">
        <div className="relative h-48">
          <Image
            src={article.image || "/placeholder.svg"}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
          {article.isVetApproved && (
            <div className="absolute top-0 right-0 px-2 py-1 m-2 text-xs font-medium text-white bg-green-600 rounded-full flex items-center">
              <Award className="w-3 h-3 mr-1" />
              Validé par un vétérinaire
            </div>
          )}
          {article.category && (
            <div className="absolute top-0 left-0 px-2 py-1 m-2 text-xs font-medium text-white bg-rose-500 rounded-full">
              {article.category}
            </div>
          )}
        </div>
      </Link>

      <div className="p-5">
        <div className="flex flex-wrap gap-2 mb-3">
          {article.tags.map((tag: any, i: number) => (
            <Badge key={i} variant="outline" className="text-xs">
              #{tag}
            </Badge>
          ))}
        </div>

        <Link href={`/dressage-sante/${article.slug}`}>
          <h3 className="mb-2 text-xl font-semibold transition-colors hover:text-rose-500">{article.title}</h3>
        </Link>

        <p className="mb-4 text-gray-600 line-clamp-2">{article.excerpt}</p>

        <div className="flex items-center justify-between pt-4 mt-4 text-sm text-gray-500 border-t">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{article.date}</span>
          </div>
          <div className="flex items-center">
            <User className="w-4 h-4 mr-1" />
            <span>{article.author}</span>
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <Button asChild variant="outline" size="sm">
            <Link href={`/dressage-sante/${article.slug}`}>Lire l'article</Link>
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
