"use client"

import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ShoppingBag, Star, ArrowRight, Heart, Zap, Shield } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRef } from "react"

const previewProducts = [
  {
    id: 1,
    name: "Lit confortable pour chien",
    category: "Accessoires",
    price: 49.99,
    originalPrice: 69.99,
    rating: 4.8,
    reviews: 124,
    image:
      "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    badge: "Bestseller",
    features: ["Mousse mémoire", "Lavable", "Anti-dérapant"],
  },
  {
    id: 2,
    name: "Arbre à chat premium",
    category: "Mobilier",
    price: 89.99,
    originalPrice: 119.99,
    rating: 4.7,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1545249390-6bdfa286032f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    badge: "Nouveau",
    features: ["Multi-niveaux", "Griffoirs", "Jouets inclus"],
  },
  {
    id: 3,
    name: "Jouet interactif pour chien",
    category: "Jouets",
    price: 24.99,
    originalPrice: 34.99,
    rating: 4.5,
    reviews: 67,
    image:
      "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    badge: "Promo",
    features: ["Stimulation mentale", "Résistant", "Sécurisé"],
  },
]

const ProductsSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-gray-50 to-white md:py-32">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto mb-16 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium text-blue-700 bg-blue-100 rounded-full"
          >
            <ShoppingBag className="w-4 h-4 mr-2" />
            <span>Produits recommandés</span>
          </motion.div>

          <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl lg:text-6xl">
            Les{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              meilleurs produits
            </span>{" "}
            pour vos animaux
          </h2>

          <p className="text-xl text-gray-600 leading-relaxed">
            Découvrez notre sélection de produits de qualité premium pour le bien-être et le bonheur de vos compagnons à
            quatre pattes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-16">
          {previewProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative overflow-hidden bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100"
            >
              {/* Badge */}
              <div
                className={`absolute top-4 left-4 z-10 px-3 py-1 text-xs font-bold text-white rounded-full ${
                  product.badge === "Bestseller"
                    ? "bg-gradient-to-r from-yellow-400 to-orange-500"
                    : product.badge === "Nouveau"
                      ? "bg-gradient-to-r from-green-400 to-blue-500"
                      : "bg-gradient-to-r from-red-400 to-pink-500"
                }`}
              >
                {product.badge}
              </div>

              {/* Heart icon */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300"
              >
                <Heart className="w-5 h-5 text-gray-600 hover:text-rose-500 transition-colors" />
              </motion.button>

              <div className="relative h-64 overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-block px-3 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-full">
                    {product.category}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-medium text-gray-700">{product.rating}</span>
                    <span className="text-xs text-gray-500">({product.reviews})</span>
                  </div>
                </div>

                <h3 className="mb-3 text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>

                {/* Features */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {product.features.map((feature, idx) => (
                    <span key={idx} className="px-2 py-1 text-xs text-gray-600 bg-gray-100 rounded-full">
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-gray-900">{product.price.toFixed(2)} €</span>
                    <span className="text-sm text-gray-500 line-through">{product.originalPrice.toFixed(2)} €</span>
                  </div>
                  <div className="flex items-center space-x-1 text-green-600">
                    <Zap className="w-4 h-4" />
                    <span className="text-sm font-medium">Livraison rapide</span>
                  </div>
                </div>

                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <Link href={`/produits/${product.id}`} className="flex items-center justify-center">
                    <ShoppingBag className="w-4 h-4 mr-2 group-hover:animate-bounce" />
                    Voir le produit
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Features section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {[
            { icon: <Shield className="w-8 h-8" />, title: "Qualité garantie", desc: "Produits testés et approuvés" },
            { icon: <Zap className="w-8 h-8" />, title: "Livraison rapide", desc: "Expédition sous 24h" },
            { icon: <Heart className="w-8 h-8" />, title: "Satisfaction client", desc: "Support dédié 7j/7" },
          ].map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -5 }}
              className="text-center p-6 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl text-white">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="flex justify-center">
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            <Link href="/produits" className="flex items-center">
              Voir tous les produits
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default ProductsSection
