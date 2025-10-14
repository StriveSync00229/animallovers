import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Calendar, User, Award, Download, Mail, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import RelatedArticles from "@/components/training-health/related-articles"
import { getArticleBySlug, getRelatedArticles } from "@/lib/server/article-service"

interface ArticlePageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug)

  if (!article) {
    return {
      title: "Article non trouvé | AnimalLovers",
      description: "L'article que vous recherchez n'existe pas ou a été déplacé.",
    }
  }

  return {
    title: `${article.title} | AnimalLovers`,
    description: article.excerpt,
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await getArticleBySlug(params.slug)

  if (!article) {
    notFound()
  }

  const relatedArticles = await getRelatedArticles(article)

  // Contenu fictif pour l'exemple
  const articleContent = `
    <p class="mb-4">
      ${article.excerpt}
    </p>
    <h2 class="mt-8 mb-4 text-2xl font-bold">Introduction</h2>
    <p class="mb-4">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim.
    </p>
    <p class="mb-4">
      Suspendisse in justo eu magna luctus suscipit. Sed lectus. Integer euismod lacus luctus magna. Quisque cursus, metus vitae pharetra auctor, sem massa mattis sem, at interdum magna augue eget diam.
    </p>
    <h2 class="mt-8 mb-4 text-2xl font-bold">Points clés à retenir</h2>
    <ul class="mb-6 ml-6 list-disc">
      <li class="mb-2">Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae.</li>
      <li class="mb-2">Etiam ultrices. Suspendisse in justo eu magna luctus suscipit.</li>
      <li class="mb-2">Sed lectus. Integer euismod lacus luctus magna.</li>
      <li class="mb-2">Quisque cursus, metus vitae pharetra auctor, sem massa mattis sem.</li>
    </ul>
    <h2 class="mt-8 mb-4 text-2xl font-bold">Conclusion</h2>
    <p class="mb-4">
      Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Fusce id purus. Ut varius tincidunt libero. Phasellus dolor. Maecenas vestibulum mollis diam. Pellentesque ut neque.
    </p>
  `

  return (
    <main className="flex flex-col min-h-screen">
      <div className="relative w-full h-[400px]">
        <Image src={article.image || "/placeholder.svg"} alt={article.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <Button asChild variant="outline" className="mb-4 bg-white/90 hover:bg-white">
              <Link href="/dressage-sante">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour aux articles
              </Link>
            </Button>

            <div className="flex flex-wrap gap-2 mb-4">
              {article.tags.map((tag: any, i: number) => (
                <Badge key={i} className="bg-rose-500">
                  #{tag}
                </Badge>
              ))}
            </div>

            <h1 className="mb-2 text-3xl font-bold text-white md:text-4xl lg:text-5xl">{article.title}</h1>

            <div className="flex flex-wrap items-center gap-4 mt-4 text-white/90">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center">
                <User className="w-4 h-4 mr-1" />
                <span>{article.author}</span>
              </div>
              {article.isVetApproved && (
                <div className="flex items-center px-2 py-1 text-xs font-medium text-white bg-green-600 rounded-full">
                  <Award className="w-3 h-3 mr-1" />
                  Validé par un vétérinaire
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <section className="py-12 bg-white">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <article className="prose prose-rose max-w-none">
                <div dangerouslySetInnerHTML={{ __html: articleContent }} />
              </article>

              <div className="flex flex-wrap items-center justify-between mt-8 pt-8 border-t">
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.map((tag: any, i: number) => (
                    <Link key={i} href={`/dressage-sante?tag=${tag}`}>
                      <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
                        #{tag}
                      </Badge>
                    </Link>
                  ))}
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Télécharger en PDF
                  </Button>
                  <Button variant="outline" size="sm">
                    <Mail className="w-4 h-4 mr-2" />
                    Recevoir par email
                  </Button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="mb-4 text-lg font-semibold">Articles similaires</h3>
                <RelatedArticles articles={relatedArticles} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
