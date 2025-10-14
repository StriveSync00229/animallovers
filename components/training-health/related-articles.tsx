import Link from "next/link"
import Image from "next/image"
import { Calendar } from "lucide-react"
import type { Article } from "@/lib/server/article-service"

interface RelatedArticlesProps {
  articles: Article[]
}

const RelatedArticles = ({ articles }: RelatedArticlesProps) => {
  return (
    <div className="space-y-4">
      {articles.length === 0 ? (
        <p className="text-gray-500">Aucun article similaire trouvé.</p>
      ) : (
        articles.map((article) => (
          <Link
            key={article.id}
            href={`/dressage-sante/${article.slug}`}
            className="flex items-start p-3 transition-colors rounded-lg hover:bg-gray-100"
          >
            <div className="relative w-16 h-16 mr-3 overflow-hidden rounded shrink-0">
              <Image src={article.image || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
            </div>
            <div>
              <h4 className="mb-1 font-medium text-gray-900 line-clamp-2">{article.title}</h4>
              <div className="flex items-center text-xs text-gray-500">
                <Calendar className="w-3 h-3 mr-1" />
                <span>{article.date}</span>
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  )
}

export default RelatedArticles
