import type { Metadata } from "next"
import Link from "next/link"

import { getFeaturedProducts } from "@/lib/server/product-service"
import ProductImage from "@/components/products/product-image"

export const metadata: Metadata = {
  title: "Produits populaires | AnimalLovers",
  description:
    "Notre sélection de produits les plus appréciés par la communauté AnimalLovers pour chiens, chats et compagnons mixtes.",
}

function getProductUrl(product: any) {
  if (product.product_categories?.slug) {
    const speciesSlug =
      product.species === "chien" ? "chiens" : product.species === "chat" ? "chats" : "mixtes"
    return `/produits/${speciesSlug}/${product.product_categories.slug}/${product.slug}`
  }
  return `/produits/${product.slug}`
}

function getProductBadge(product: any) {
  if (product.is_bestseller) return { text: "BEST-SELLER", color: "bg-rose-500" }
  if (product.is_new) return { text: "NOUVEAU", color: "bg-green-500" }
  if (product.original_price && product.original_price > product.price) {
    const discount = Math.round(((product.original_price - product.price) / product.original_price) * 100)
    return { text: `PROMO -${discount}%`, color: "bg-amber-500" }
  }
  return null
}

export default async function PopularProductsPage() {
  const products = await getFeaturedProducts(12)

  return (
    <main className="pb-20">
      <section className="relative overflow-hidden border-b bg-gradient-to-br from-rose-50 via-white to-orange-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-rose-600 shadow">
            <span className="text-xl">🔥</span>
            Top recommandations
          </p>
          <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">Produits populaires</h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Des articles testés, approuvés et plébiscités par notre communauté pour le confort et la santé de vos
            compagnons.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-2 rounded-full border border-white/40 bg-white/70 px-4 py-2 shadow-sm">
              ✅ Testés par l’équipe
            </span>
            <span className="flex items-center gap-2 rounded-full border border-white/40 bg-white/70 px-4 py-2 shadow-sm">
              💬 Avis authentiques
            </span>
            <span className="flex items-center gap-2 rounded-full border border-white/40 bg-white/70 px-4 py-2 shadow-sm">
              🐶🐱 Chiens & Chats
            </span>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          {products.length === 0 ? (
            <div className="rounded-2xl border bg-white p-12 text-center shadow-sm">
              <p className="text-lg font-semibold text-gray-800">Aucun produit populaire pour l’instant.</p>
              <p className="mt-2 text-gray-600">Revenez bientôt ou parcourez notre catalogue complet.</p>
              <div className="mt-6 flex justify-center gap-4">
                <Link href="/produits" className="text-rose-600 hover:underline">
                  Voir les produits recommandés
                </Link>
                <Link href="/produits/catalogue" className="text-gray-600 hover:underline">
                  Accéder au catalogue
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => {
                  const badge = getProductBadge(product)
                  const discount =
                    product.original_price && product.original_price > product.price
                      ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
                      : null

                  return (
                    <Link
                      key={product.id}
                      href={getProductUrl(product)}
                      className="group flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                    >
                      <div className="relative h-56 bg-gray-50">
                        <ProductImage
                          src={product.featured_image}
                          alt={product.name || "Produit populaire"}
                          fill
                          className="object-cover transition duration-500 group-hover:scale-105"
                        />
                        {badge && (
                          <span className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-bold text-white ${badge.color}`}>
                            {badge.text}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-1 flex-col gap-3 p-5">
                        <div>
                          <p className="text-sm uppercase tracking-wide text-rose-500">
                            {product.product_categories?.name || "Produit recommandé"}
                          </p>
                          <h2 className="line-clamp-2 text-lg font-semibold text-gray-900">{product.name}</h2>
                          {product.short_description && (
                            <p className="mt-1 text-sm text-gray-600 line-clamp-2">{product.short_description}</p>
                          )}
                        </div>
                        <div className="mt-auto flex items-center justify-between">
                          <div>
                            <span className="text-xl font-bold text-gray-900">{product.price.toFixed(2)}€</span>
                            {product.original_price && product.original_price > product.price && (
                              <div className="flex items-center gap-2 text-sm text-gray-500">
                                <span className="line-through">{product.original_price.toFixed(2)}€</span>
                                {discount && <span className="text-rose-600">-{discount}%</span>}
                              </div>
                            )}
                          </div>
                          {product.review_count > 0 && (
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                              <span>⭐</span>
                              <span className="font-medium text-gray-700">{product.rating_average.toFixed(1)}</span>
                              <span className="text-xs">({product.review_count})</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
              <div className="mt-10 text-center">
                <Link
                  href="/produits/catalogue"
                  className="inline-flex items-center rounded-full bg-rose-500 px-6 py-3 font-medium text-white shadow hover:bg-rose-600"
                >
                  Voir tout le catalogue
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  )
}

