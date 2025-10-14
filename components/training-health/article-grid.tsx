import ArticleCard from "@/components/training-health/article-card"
import type { Article } from "@/lib/server/article-service"

interface ArticleGridProps {
  articles: Article[]
}

const ArticleGrid = ({ articles }: ArticleGridProps) => {
  return (
    <div>
      {articles.length === 0 ? (
        <div className="p-8 text-center bg-gray-50 rounded-lg">
          <h3 className="mb-2 text-lg font-medium text-gray-900">Aucun article trouvé</h3>
          <p className="text-gray-600">Essayez de modifier vos filtres ou consultez d'autres catégories.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, index) => (
            <ArticleCard key={article.id} article={article} index={index} />
          ))}
        </div>
      )}
    </div>
  )
}

export default ArticleGrid
