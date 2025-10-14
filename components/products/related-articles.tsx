import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

interface Article {
  title: string
  slug: string
  image: string
  excerpt: string
}

interface RelatedArticlesProps {
  articles: Article[]
}

export default function RelatedArticles({ articles }: RelatedArticlesProps) {
  return (
    <section className="py-12 bg-white">
      <div className="container px-4 mx-auto">
        <h2 className="mb-8 text-2xl font-bold text-gray-800 md:text-3xl">
          <span className="mr-2">🧠</span> Articles recommandés
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, index) => (
            <Link
              key={index}
              href={`/dressage-sante/${article.slug}`}
              className="overflow-hidden transition-transform bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:translate-y-[-4px]"
            >
              <div className="relative w-full h-48">
                <Image src={article.image || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className="mb-2 text-lg font-semibold text-gray-800">{article.title}</h3>
                <p className="mb-4 text-sm text-gray-600 line-clamp-2">{article.excerpt}</p>
                <div className="flex items-center text-rose-600">
                  <span className="mr-1">Lire l'article</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
