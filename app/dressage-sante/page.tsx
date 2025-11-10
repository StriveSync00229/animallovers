import type { Metadata } from "next"
import TrainingHealthHero from "@/components/training-health/hero"
import ArticleGrid from "@/components/training-health/article-grid"
import SidebarNavigation from "@/components/training-health/sidebar-navigation"
import FilterBar from "@/components/training-health/filter-bar"
import TrainingQuiz from "@/components/training-health/training-quiz"
import { ArticleService } from "@/lib/server/article-service"

export const metadata: Metadata = {
  title: "Dressage & Santé | AnimalLovers",
  description:
    "Découvrez nos conseils d'experts sur le dressage, la santé et le bien-être de vos animaux de compagnie.",
}

export default async function TrainingHealthPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // Récupérer les paramètres de filtrage
  const category = typeof searchParams.category === "string" ? searchParams.category : undefined
  const search = typeof searchParams.search === "string" ? searchParams.search : undefined

  // Récupérer les articles (côté serveur) - exclut les ebooks
  const articles = await ArticleService.getArticles({
    status: "published",
    category: category,
    search: search,
  })

  // Récupérer les ebooks (côté serveur)
  const ebooks = await ArticleService.getEbooks({
    category: category,
    search: search,
    publishedOnly: true,
    limit: 10,
  })

  return (
    <main className="flex flex-col min-h-screen">
      <TrainingHealthHero />

      {/* Section Ebooks */}
      {ebooks.length > 0 && (
        <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
          <div className="container px-4 mx-auto">
            <div className="mb-8">
              <h2 className="mb-4 text-3xl font-bold text-gray-900">
                <span className="mr-2">📚</span> Nos Ebooks
              </h2>
              <p className="text-gray-600">
                Découvrez notre collection d'ebooks sur le dressage et la santé de vos animaux de compagnie
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {ebooks.map((ebook: any) => (
                <div
                  key={ebook.id}
                  className="overflow-hidden bg-white border-2 border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="relative h-64 bg-gray-200">
                    {ebook.featured_image && (
                      <img
                        src={ebook.featured_image}
                        alt={ebook.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute top-0 left-0 px-3 py-1 m-2 text-xs font-semibold text-white bg-green-600 rounded-full">
                      📚 Ebook
                    </div>
                    {ebook.price && (
                      <div className="absolute top-0 right-0 px-3 py-1 m-2 text-sm font-bold text-white bg-rose-500 rounded-full">
                        {typeof ebook.price === 'number' ? ebook.price.toFixed(2) : ebook.price}€
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="mb-2 text-xl font-semibold text-gray-900 line-clamp-2">
                      {ebook.title}
                    </h3>
                    <p className="mb-4 text-gray-600 line-clamp-3">
                      {ebook.excerpt || ebook.content.substring(0, 150) + "..."}
                    </p>
                    <a
                      href={`/dressage-sante/${ebook.slug || ebook.id}`}
                      className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
                    >
                      Voir l'ebook →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Section Articles */}
      <section className="py-12 bg-white">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Navigation */}
            <div className="w-full lg:w-1/4 shrink-0">
              <SidebarNavigation activeCategory={category} />
            </div>

            {/* Main Content */}
            <div className="w-full lg:w-3/4">
              <FilterBar />
              <ArticleGrid articles={articles} />
            </div>
          </div>
        </div>
      </section>

      <TrainingQuiz />
    </main>
  )
}
