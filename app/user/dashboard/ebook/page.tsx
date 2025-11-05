"use client"

import { useState } from "react"
import { BookOpen, ShoppingCart, Eye, Clock, Star, BookMarked } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

export default function UserEbookPage() {
  const [selectedEbook, setSelectedEbook] = useState<string | null>(null)
  const [purchasedEbooks, setPurchasedEbooks] = useState<string[]>([])

  const ebooks = [
    {
      id: "1",
      title: "Guide complet du dressage canin",
      author: "Dr. Marie Dubois",
      price: 19.99,
      cover: "/dog-training-book-cover.jpg",
      description: "Apprenez les techniques professionnelles de dressage pour votre chien",
      pages: 245,
      rating: 4.8,
      category: "Dressage",
    },
    {
      id: "2",
      title: "Nutrition féline optimale",
      author: "Vét. Jean Martin",
      price: 15.99,
      cover: "/cat-nutrition-book-cover.jpg",
      description: "Tout savoir sur l'alimentation équilibrée de votre chat",
      pages: 180,
      rating: 4.6,
      category: "Santé",
    },
    {
      id: "3",
      title: "Comportement canin expliqué",
      author: "Sophie Laurent",
      price: 22.99,
      cover: "/dog-behavior-book-cover.jpg",
      description: "Comprenez le langage corporel et les émotions de votre chien",
      pages: 320,
      rating: 4.9,
      category: "Comportement",
    },
  ]

  const articles = [
    {
      id: "1",
      title: "10 conseils pour un chiot bien éduqué",
      excerpt: "Découvrez les bases essentielles pour éduquer votre chiot dès son arrivée à la maison...",
      image: "/puppy-training.jpg",
      author: "Marie Dubois",
      date: "15 Jan 2025",
      readTime: "5 min",
      category: "Dressage",
    },
    {
      id: "2",
      title: "Les signes de stress chez le chat",
      excerpt: "Apprenez à reconnaître les comportements qui indiquent que votre chat est stressé...",
      image: "/stressed-cat.jpg",
      author: "Jean Martin",
      date: "12 Jan 2025",
      readTime: "7 min",
      category: "Santé",
    },
    {
      id: "3",
      title: "Alimentation naturelle pour chiens",
      excerpt: "Les avantages d'une alimentation naturelle et comment la mettre en place...",
      image: "/natural-dog-food.jpg",
      author: "Sophie Laurent",
      date: "10 Jan 2025",
      readTime: "6 min",
      category: "Nutrition",
    },
  ]

  const handlePurchase = (ebookId: string) => {
    setPurchasedEbooks([...purchasedEbooks, ebookId])
    alert("Ebook acheté avec succès ! Vous pouvez maintenant le lire.")
  }

  const handleReadEbook = (ebookId: string) => {
    setSelectedEbook(ebookId)
  }

  if (selectedEbook) {
    const ebook = ebooks.find((e) => e.id === selectedEbook)
    return (
      <div className="space-y-6 animate-fadeInUp">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">{ebook?.title}</h1>
          <Button variant="outline" onClick={() => setSelectedEbook(null)}>
            Retour à la bibliothèque
          </Button>
        </div>

        <Card className="p-8 bg-white min-h-[600px]">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="text-center space-y-2 pb-6 border-b">
              <h2 className="text-3xl font-bold text-gray-900">Chapitre 1</h2>
              <p className="text-lg text-gray-600">Introduction au dressage positif</p>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed">
                Le dressage positif est une méthode d'éducation canine basée sur le renforcement des bons comportements
                plutôt que sur la punition des mauvais. Cette approche moderne et respectueuse permet de créer une
                relation de confiance entre vous et votre chien.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Les principes fondamentaux</h3>
              <p className="text-gray-700 leading-relaxed">
                Le renforcement positif consiste à récompenser immédiatement les comportements souhaités. Lorsque votre
                chien effectue une action que vous voulez encourager, vous lui donnez une récompense : friandise,
                caresse, jouet ou félicitations verbales.
              </p>

              <p className="text-gray-700 leading-relaxed">
                Cette méthode est scientifiquement prouvée comme étant la plus efficace pour l'apprentissage à long
                terme. Elle crée des associations positives et renforce le lien entre le maître et l'animal.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                Pourquoi choisir le renforcement positif ?
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Renforce la confiance et le lien avec votre chien</li>
                <li>Réduit le stress et l'anxiété de l'animal</li>
                <li>Favorise un apprentissage durable et efficace</li>
                <li>Améliore le bien-être général de votre compagnon</li>
              </ul>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
                <p className="text-blue-900 font-medium">
                  Conseil d'expert : La cohérence est la clé du succès. Assurez-vous que tous les membres de la famille
                  utilisent les mêmes commandes et récompenses.
                </p>
              </div>

              <p className="text-gray-700 leading-relaxed">
                Dans les prochains chapitres, nous explorerons en détail les techniques spécifiques de dressage positif,
                les erreurs courantes à éviter, et comment adapter votre approche selon l'âge et le tempérament de votre
                chien.
              </p>
            </div>

            <div className="flex justify-between pt-6 border-t">
              <Button variant="outline" disabled>
                Chapitre précédent
              </Button>
              <span className="text-sm text-gray-500">Page 1 sur {ebook?.pages}</span>
              <Button className="bg-red-600 hover:bg-red-700 text-white">Chapitre suivant</Button>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-fadeInUp">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-3 bg-blue-100 rounded-lg">
          <BookOpen className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ebooks & Articles</h1>
          <p className="text-gray-600">Enrichissez vos connaissances sur le bien-être animal</p>
        </div>
      </div>

      <Tabs defaultValue="ebooks" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="ebooks">Ebooks</TabsTrigger>
          <TabsTrigger value="articles">Articles gratuits</TabsTrigger>
        </TabsList>

        <TabsContent value="ebooks" className="space-y-6">
          {/* My ebooks */}
          {purchasedEbooks.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Ma bibliothèque</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ebooks
                  .filter((e) => purchasedEbooks.includes(e.id))
                  .map((ebook) => (
                    <Card key={ebook.id} className="overflow-hidden hover:shadow-xl transition-all duration-300">
                      <div className="relative h-64 bg-gray-200">
                        <Image
                          src={ebook.cover || "/placeholder.svg"}
                          alt={ebook.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                          Acheté
                        </div>
                      </div>
                      <div className="p-4 space-y-3">
                        <h3 className="font-semibold text-lg text-gray-900">{ebook.title}</h3>
                        <p className="text-sm text-gray-600">{ebook.author}</p>
                        <Button
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                          onClick={() => handleReadEbook(ebook.id)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Lire maintenant
                        </Button>
                      </div>
                    </Card>
                  ))}
              </div>
            </div>
          )}

          {/* Available ebooks */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Ebooks disponibles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ebooks
                .filter((e) => !purchasedEbooks.includes(e.id))
                .map((ebook, index) => (
                  <Card
                    key={ebook.id}
                    className="overflow-hidden hover:shadow-xl transition-all duration-300 animate-fadeInUp"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="relative h-64 bg-gray-200">
                      <Image src={ebook.cover || "/placeholder.svg"} alt={ebook.title} fill className="object-cover" />
                      <div className="absolute top-2 left-2 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        {ebook.category}
                      </div>
                    </div>
                    <div className="p-4 space-y-3">
                      <h3 className="font-semibold text-lg text-gray-900">{ebook.title}</h3>
                      <p className="text-sm text-gray-600">{ebook.author}</p>
                      <p className="text-sm text-gray-700 line-clamp-2">{ebook.description}</p>

                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <BookMarked className="w-4 h-4" />
                          <span>{ebook.pages} pages</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span>{ebook.rating}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t">
                        <span className="text-2xl font-bold text-red-600">{ebook.price}€</span>
                        <Button
                          className="bg-red-600 hover:bg-red-700 text-white"
                          onClick={() => handlePurchase(ebook.id)}
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Acheter
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="articles" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <Card
                key={article.id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer animate-fadeInUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-48 bg-gray-200">
                  <Image src={article.image || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
                  <div className="absolute top-2 left-2 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {article.category}
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  <h3 className="font-semibold text-lg text-gray-900">{article.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{article.excerpt}</p>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{article.author}</span>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full bg-transparent">
                    <Eye className="w-4 h-4 mr-2" />
                    Lire l'article
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
