import type { Metadata } from "next"
import TrainingHealthHero from "@/components/training-health/hero"
import ArticleGrid from "@/components/training-health/article-grid"
import SidebarNavigation from "@/components/training-health/sidebar-navigation"
import FilterBar from "@/components/training-health/filter-bar"
import TrainingQuiz from "@/components/training-health/training-quiz"
import { getArticles } from "@/lib/server/article-service"

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
  const species = typeof searchParams.species === "string" ? searchParams.species : undefined
  const age = typeof searchParams.age === "string" ? searchParams.age : undefined
  const tag = typeof searchParams.tag === "string" ? searchParams.tag : undefined

  // Récupérer les articles (côté serveur)
  const articles = await getArticles({ category, species, age, tag })

  return (
    <main className="flex flex-col min-h-screen">
      <TrainingHealthHero />

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
