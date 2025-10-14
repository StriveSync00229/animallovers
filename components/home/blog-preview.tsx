"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Calendar, User, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Données fictives pour les articles de blog
const previewArticles = [
  {
    id: 1,
    title: "Comment préparer votre maison pour l'arrivée d'un chiot",
    excerpt:
      "Découvrez les étapes essentielles pour préparer votre domicile avant l'arrivée de votre nouveau compagnon à quatre pattes.",
    date: "15 avril 2023",
    author: "Marie Dupont",
    image:
      "https://images.unsplash.com/photo-1583511655826-05700442b31b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Conseils",
  },
  {
    id: 2,
    title: "Les bienfaits des chats sur la santé mentale",
    excerpt:
      "Les études montrent que vivre avec un chat peut réduire le stress et améliorer votre bien-être émotionnel. Voici pourquoi.",
    date: "28 mars 2023",
    author: "Thomas Martin",
    image:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Santé",
  },
  {
    id: 3,
    title: "Guide complet sur l'alimentation canine",
    excerpt:
      "Tout ce que vous devez savoir sur la nutrition de votre chien pour lui assurer une vie longue et en bonne santé.",
    date: "10 mars 2023",
    author: "Sophie Leclerc",
    image:
      "https://images.unsplash.com/photo-1623387641168-d9803ddd3f35?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Nutrition",
  },
]

const BlogPreview = () => {
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

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {previewArticles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="overflow-hidden bg-white border rounded-lg shadow-sm"
            >
              <Link href={`/blog/${article.id}`} className="block">
                <div className="relative h-48">
                  <Image
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute top-0 right-0 px-3 py-1 m-2 text-xs font-medium text-white bg-rose-500 rounded-full">
                    {article.category}
                  </div>
                </div>
              </Link>
              <div className="p-5">
                <Link href={`/blog/${article.id}`}>
                  <h3 className="mb-2 text-xl font-semibold transition-colors hover:text-rose-500">{article.title}</h3>
                </Link>
                <p className="mb-4 text-gray-600">{article.excerpt}</p>
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
              </div>
            </motion.article>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Button asChild className="bg-rose-500 hover:bg-rose-600">
            <Link href="/blog" className="flex items-center">
              Voir tous les articles
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default BlogPreview
