import type { Metadata } from "next"
import Link from "next/link"
import { getProductCategories, getFeaturedProducts } from "@/lib/server/product-service"
import ProductImage from "@/components/products/product-image"

export const metadata: Metadata = {
  title: "Produits recommandés pour chiens et chats | AnimalLovers",
  description:
    "Découvrez notre sélection de produits de qualité pour chiens et chats, testés et approuvés par notre équipe et nos adoptants.",
}

export default async function ProductsPage() {
  const categories = await getProductCategories()
  const featuredProducts = await getFeaturedProducts(6)

  return (
    <main className="pb-16">
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-b from-rose-50 to-white">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-4 text-4xl font-bold text-gray-800 md:text-5xl">Produits recommandés</h1>
            <p className="mb-8 text-xl text-gray-600">
              Des produits soigneusement sélectionnés et testés pour le bien-être de vos compagnons à quatre pattes
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute left-0 w-24 h-24 transform -translate-y-1/2 opacity-10 top-1/2">
          <Image
            src="https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80&w=1374&auto=format&fit=crop"
            alt=""
            fill
            className="object-cover rounded-full"
          />
        </div>
        <div className="absolute right-0 w-32 h-32 transform -translate-y-1/2 opacity-10 top-1/3">
          <Image
            src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1443&auto=format&fit=crop"
            alt=""
            fill
            className="object-cover rounded-full"
          />
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12">
        <div className="container px-4 mx-auto">
          <h2 className="mb-8 text-3xl font-bold text-center text-gray-800">Nos catégories de produits</h2>

          {/* Dogs Categories */}
          <div className="mb-16">
            <h3 className="flex items-center mb-6 text-2xl font-bold text-gray-800">
              <span className="mr-2 text-2xl">🐕</span> Pour les chiens
            </h3>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {categories.chiens.map((category: any, index: number) => (
                <Link
                  key={index}
                  href={`/produits/chiens/${category.slug}`}
                  className="flex flex-col p-6 transition-all bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:border-rose-200"
                >
                  <div className="flex items-center mb-4">
                    <span className="mr-3 text-2xl" aria-hidden="true">
                      {category.icon}
                    </span>
                    <h4 className="text-lg font-semibold text-gray-800">{category.name}</h4>
                  </div>

                  {category.subcategories && (
                    <ul className="mt-auto space-y-1">
                      {category.subcategories.slice(0, 3).map((subcat: any, idx: number) => (
                        <li key={idx} className="text-sm text-gray-600 hover:text-rose-500">
                          • {subcat.name}
                        </li>
                      ))}
                      {category.subcategories.length > 3 && (
                        <li className="text-sm italic text-gray-500">Et plus...</li>
                      )}
                    </ul>
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Cats Categories */}
          <div className="mb-16">
            <h3 className="flex items-center mb-6 text-2xl font-bold text-gray-800">
              <span className="mr-2 text-2xl">🐱</span> Pour les chats
            </h3>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {categories.chats.map((category: any, index: number) => (
                <Link
                  key={index}
                  href={`/produits/chats/${category.slug}`}
                  className="flex flex-col p-6 transition-all bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:border-rose-200"
                >
                  <div className="flex items-center mb-4">
                    <span className="mr-3 text-2xl" aria-hidden="true">
                      {category.icon}
                    </span>
                    <h4 className="text-lg font-semibold text-gray-800">{category.name}</h4>
                  </div>

                  {category.subcategories && (
                    <ul className="mt-auto space-y-1">
                      {category.subcategories.slice(0, 3).map((subcat: any, idx: number) => (
                        <li key={idx} className="text-sm text-gray-600 hover:text-rose-500">
                          • {subcat.name}
                        </li>
                      ))}
                      {category.subcategories.length > 3 && (
                        <li className="text-sm italic text-gray-500">Et plus...</li>
                      )}
                    </ul>
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Mixed Categories */}
          <div>
            <h3 className="flex items-center mb-6 text-2xl font-bold text-gray-800">
              <span className="mr-2 text-2xl">🐾</span> Articles mixtes / universels
            </h3>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {categories.mixtes.map((category: any, index: number) => (
                <Link
                  key={index}
                  href={`/produits/mixtes/${category.slug}`}
                  className="flex flex-col p-6 transition-all bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:border-rose-200"
                >
                  <div className="flex items-center mb-4">
                    <span className="mr-3 text-2xl" aria-hidden="true">
                      {category.icon}
                    </span>
                    <h4 className="text-lg font-semibold text-gray-800">{category.name}</h4>
                  </div>

                  {category.subcategories && (
                    <ul className="mt-auto space-y-1">
                      {category.subcategories.slice(0, 3).map((subcat: any, idx: number) => (
                        <li key={idx} className="text-sm text-gray-600 hover:text-rose-500">
                          • {subcat.name}
                        </li>
                      ))}
                      {category.subcategories.length > 3 && (
                        <li className="text-sm italic text-gray-500">Et plus...</li>
                      )}
                    </ul>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 bg-gray-50">
        <div className="container px-4 mx-auto">
          <h2 className="mb-8 text-3xl font-bold text-center text-gray-800">Produits populaires</h2>

          {featuredProducts.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="mb-2">Aucun produit populaire pour le moment.</p>
              <p className="text-sm">Revenez bientôt pour découvrir nos produits.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {featuredProducts.map((product) => {
                  const getProductUrl = () => {
                    if (product.product_categories?.slug) {
                      const speciesSlug = product.species === "chien" ? "chiens" : product.species === "chat" ? "chats" : "mixtes"
                      return `/produits/${speciesSlug}/${product.product_categories.slug}/${product.slug}`
                    }
                    return `/produits/${product.slug}`
                  }


                  const getBadge = () => {
                    if (product.is_bestseller) return { text: "BEST-SELLER", color: "bg-rose-500" }
                    if (product.is_new) return { text: "NOUVEAU", color: "bg-green-500" }
                    if (product.original_price && product.original_price > product.price) {
                      const discount = Math.round(((product.original_price - product.price) / product.original_price) * 100)
                      return { text: `PROMO -${discount}%`, color: "bg-amber-500" }
                    }
                    return null
                  }

                  const badge = getBadge()
                  const discountPercentage =
                    product.original_price && product.original_price > product.price
                      ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
                      : null

                  return (
                    <Link
                      key={product.id}
                      href={getProductUrl()}
                      className="overflow-hidden transition-transform bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:translate-y-[-4px]"
                    >
                      <div className="relative w-full h-48 bg-gray-100">
                        <ProductImage
                          src={product.featured_image}
                          alt={product.name || "Produit"}
                          fill
                          className="object-cover"
                        />
                        {badge && (
                          <div className={`absolute top-0 right-0 px-2 py-1 text-xs font-bold text-white ${badge.color} z-10`}>
                            {badge.text}
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="mb-2 text-lg font-semibold text-gray-800 line-clamp-2">
                          {product.name}
                        </h3>
                        {product.description && (
                          <p className="mb-2 text-sm text-gray-600 line-clamp-2">{product.description}</p>
                        )}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-rose-600">{product.price.toFixed(2)}€</span>
                            {product.original_price && product.original_price > product.price && (
                              <span className="text-sm text-gray-500 line-through">
                                {product.original_price.toFixed(2)}€
                              </span>
                            )}
                          </div>
                          {product.review_count > 0 && (
                            <div className="flex items-center gap-1">
                              <span className="text-sm text-gray-500">⭐</span>
                              <span className="text-sm font-medium text-gray-700">
                                {product.rating_average.toFixed(1)}
                              </span>
                              <span className="text-xs text-gray-500">({product.review_count})</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>

              <div className="mt-8 text-center">
                <Link
                  href="/produits/catalogue"
                  className="inline-flex items-center px-6 py-3 font-medium text-white transition-colors bg-rose-500 rounded-md hover:bg-rose-600"
                >
                  Voir tous les produits
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-12 bg-white">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="mb-8 text-3xl font-bold text-center text-gray-800">
              Pourquoi faire confiance à nos recommandations ?
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="p-6 text-center bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-white bg-rose-500 rounded-full">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-800">Produits testés</h3>
                <p className="text-gray-600">
                  Tous nos produits sont testés par notre équipe et nos adoptants avant d'être recommandés.
                </p>
              </div>

              <div className="p-6 text-center bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-white bg-rose-500 rounded-full">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-800">Avis transparents</h3>
                <p className="text-gray-600">
                  Nous partageons les points forts et les points faibles de chaque produit en toute transparence.
                </p>
              </div>

              <div className="p-6 text-center bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-white bg-rose-500 rounded-full">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-800">Meilleurs prix</h3>
                <p className="text-gray-600">
                  Nous comparons les prix pour vous proposer les meilleures offres du marché.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
