"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart, Tag, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import type { Product } from "@/lib/server/product-service"

interface MultiSpeciesGridProps {
  products: Product[]
}

export function MultiSpeciesGrid({ products }: MultiSpeciesGridProps) {
  const [likedProducts, setLikedProducts] = useState<string[]>([])

  const toggleLike = (productId: string) => {
    if (likedProducts.includes(productId)) {
      setLikedProducts(likedProducts.filter((id) => id !== productId))
    } else {
      setLikedProducts([...likedProducts, productId])
    }
  }

  if (products.length === 0) {
    return (
      <div className="py-12 text-center">
        <h3 className="mb-4 text-xl font-semibold text-gray-800">Aucun produit trouvé</h3>
        <p className="text-gray-600">Essayez de modifier vos filtres ou effectuez une nouvelle recherche.</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-gray-600">{products.length} produits trouvés</p>
        <div className="flex items-center space-x-2">
          <label htmlFor="sort" className="text-sm text-gray-600">
            Trier par:
          </label>
          <select
            id="sort"
            className="px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
            defaultValue="popularity"
          >
            <option value="popularity">Popularité</option>
            <option value="price-asc">Prix croissant</option>
            <option value="price-desc">Prix décroissant</option>
            <option value="newest">Nouveautés</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            className="relative overflow-hidden transition-transform duration-300 bg-white border border-gray-200 rounded-lg shadow-sm group hover:shadow-md hover:-translate-y-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            {product.badge && (
              <div className="absolute top-0 right-0 z-10 p-2">
                <span
                  className={`inline-flex items-center px-2 py-1 text-xs font-medium text-white rounded ${
                    product.badge === "popular"
                      ? "bg-rose-500"
                      : product.badge === "new"
                        ? "bg-blue-500"
                        : product.badge === "sale"
                          ? "bg-green-500"
                          : "bg-purple-500"
                  }`}
                >
                  {product.badge === "popular" && <TrendingUp size={12} className="mr-1" />}
                  {product.badge === "sale" && <Tag size={12} className="mr-1" />}
                  {product.badge === "popular" && "Populaire"}
                  {product.badge === "new" && "Nouveau"}
                  {product.badge === "sale" && `-${product.discountPercentage}%`}
                  {product.badge === "pack" && "Pack"}
                </span>
              </div>
            )}

            <Link href={`/produits/mixtes/packs-multi-espece/${product.slug}`}>
              <div className="relative w-full h-48">
                <Image
                  src={product.imageUrl || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </Link>

            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-500">{product.category}</span>
                <button
                  type="button"
                  onClick={() => toggleLike(product.id)}
                  className="transition-colors duration-200"
                  aria-label={likedProducts.includes(product.id) ? "Retirer des favoris" : "Ajouter aux favoris"}
                >
                  <Heart
                    size={16}
                    className={
                      likedProducts.includes(product.id)
                        ? "text-rose-500 fill-rose-500"
                        : "text-gray-400 group-hover:text-rose-500"
                    }
                  />
                </button>
              </div>

              <Link href={`/produits/mixtes/packs-multi-espece/${product.slug}`}>
                <h3 className="mb-2 text-lg font-semibold text-gray-800 transition-colors duration-200 group-hover:text-rose-600">
                  {product.name}
                </h3>
              </Link>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-lg font-bold text-rose-600">{product.price.toFixed(2)} €</span>
                  {product.originalPrice && (
                    <span className="ml-2 text-sm line-through text-gray-400">
                      {product.originalPrice.toFixed(2)} €
                    </span>
                  )}
                </div>

                <Button size="sm" className="bg-rose-500 hover:bg-rose-600">
                  <ShoppingCart size={14} className="mr-1" />
                  Ajouter
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
