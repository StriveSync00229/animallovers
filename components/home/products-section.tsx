"use client"

import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ShoppingBag, Star, ArrowRight, Heart, Zap, Shield } from "lucide-react"
import Link from "next/link"
import { useRef, useEffect, useState } from "react"
import ProductImage from "@/components/products/product-image"

interface Product {
  id: string
  name: string
  slug: string
  description: string | null
  price: number
  original_price: number | null
  featured_image: string | null
  is_featured: boolean
  is_bestseller: boolean
  is_new: boolean
  rating_average: number
  review_count: number
  product_categories?: {
    name: string
    slug: string
  }
  species: "chien" | "chat" | "mixte" | null
}

const ProductsSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Récupérer les produits en vedette depuis l'API publique
        const response = await fetch("/api/products?is_featured=true&is_active=true&limit=6")
        
        if (!response.ok) {
          console.error("Erreur HTTP:", response.status, response.statusText)
          setLoading(false)
          return
        }

        const result = await response.json()

        if (result.success && result.data) {
          setProducts(result.data)
        } else {
          console.error("Erreur API:", result.error || "Erreur inconnue")
        }
      } catch (error) {
        console.error("Erreur lors du chargement des produits:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // Fonction pour obtenir le badge du produit
  const getProductBadge = (product: Product): string | null => {
    if (product.is_bestseller) return "Bestseller"
    if (product.is_new) return "Nouveau"
    if (product.original_price && product.original_price > product.price) return "Promo"
    return null
  }

  // Fonction pour obtenir l'URL du produit
  const getProductUrl = (product: Product): string => {
    if (product.product_categories?.slug) {
      return `/produits/${product.product_categories.slug}/${product.slug}`
    }
    return `/produits/${product.slug}`
  }

  // Fonction pour obtenir l'image du produit
  const getProductImage = (product: Product): string | null => {
    if (product.featured_image && product.featured_image.trim() !== "") {
      return product.featured_image
    }
    return null
  }

  // Fonction pour obtenir le nom de la catégorie
  const getCategoryName = (product: Product): string => {
    return product.product_categories?.name || "Produit"
  }

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

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <p className="mb-2">Aucun produit en vedette pour le moment.</p>
            <p className="text-sm">Revenez bientôt pour découvrir nos produits.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-16">
            {products.map((product, index) => {
              const badge = getProductBadge(product)
              const discountPercentage =
                product.original_price && product.original_price > product.price
                  ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
                  : null

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group relative overflow-hidden bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100"
                >
                  {/* Badge */}
                  {badge && (
                    <div
                      className={`absolute top-4 left-4 z-10 px-3 py-1 text-xs font-bold text-white rounded-full ${
                        badge === "Bestseller"
                          ? "bg-gradient-to-r from-yellow-400 to-orange-500"
                          : badge === "Nouveau"
                            ? "bg-gradient-to-r from-green-400 to-blue-500"
                            : "bg-gradient-to-r from-red-400 to-pink-500"
                      }`}
                    >
                      {badge}
                      {discountPercentage && ` -${discountPercentage}%`}
                    </div>
                  )}

                  {/* Heart icon */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300"
                  >
                    <Heart className="w-5 h-5 text-gray-600 hover:text-rose-500 transition-colors" />
                  </motion.button>

                  <Link href={getProductUrl(product)}>
                    <div className="relative h-64 overflow-hidden bg-gray-100">
                      <ProductImage
                        src={getProductImage(product)}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </Link>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-block px-3 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-full">
                        {getCategoryName(product)}
                      </span>
                      {product.review_count > 0 && (
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span className="text-sm font-medium text-gray-700">
                            {product.rating_average.toFixed(1)}
                          </span>
                          <span className="text-xs text-gray-500">({product.review_count})</span>
                        </div>
                      )}
                    </div>

                    <Link href={getProductUrl(product)}>
                      <h3 className="mb-3 text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                    </Link>

                    {product.description && (
                      <p className="mb-4 text-sm text-gray-600 line-clamp-2">{product.description}</p>
                    )}

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-gray-900">{product.price.toFixed(2)} €</span>
                        {product.original_price && product.original_price > product.price && (
                          <span className="text-sm text-gray-500 line-through">
                            {product.original_price.toFixed(2)} €
                          </span>
                        )}
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
                      <Link href={getProductUrl(product)} className="flex items-center justify-center">
                        <ShoppingBag className="w-4 h-4 mr-2 group-hover:animate-bounce" />
                        Voir le produit
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}

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
