import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { getProductCategories } from "@/lib/server/product-service"

export const metadata: Metadata = {
  title: "Produits recommandés pour chiens et chats | AnimalLovers",
  description:
    "Découvrez notre sélection de produits de qualité pour chiens et chats, testés et approuvés par notre équipe et nos adoptants.",
}

export default async function ProductsPage() {
  const categories = await getProductCategories()

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

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Featured Product 1 */}
            <Link
              href="/produits/chiens/couchage-confort/panier-orthopedique-chien-grand"
              className="overflow-hidden transition-transform bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:translate-y-[-4px]"
            >
              <div className="relative w-full h-48">
                <Image
                  src="https://images.unsplash.com/photo-1541599468348-e96984315921?q=80&w=1470&auto=format&fit=crop"
                  alt="Panier orthopédique pour chien"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-0 right-0 px-2 py-1 text-xs font-bold text-white bg-rose-500">
                  BEST-SELLER
                </div>
              </div>
              <div className="p-4">
                <h3 className="mb-2 text-lg font-semibold text-gray-800">
                  Panier orthopédique pour chien - Grand gabarit
                </h3>
                <p className="mb-2 text-sm text-gray-600 line-clamp-2">
                  Idéal pour les grands chiens et les seniors souffrant d'arthrose.
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-rose-600">49,90€</span>
                  <span className="text-sm text-gray-500">⭐⭐⭐⭐½</span>
                </div>
              </div>
            </Link>

            {/* Featured Product 2 */}
            <Link
              href="/produits/chats/jouets-divertissement/arbre-chat-luxe"
              className="overflow-hidden transition-transform bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:translate-y-[-4px]"
            >
              <div className="relative w-full h-48">
                <Image
                  src="https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?q=80&w=1374&auto=format&fit=crop"
                  alt="Arbre à chat luxe multi-niveaux"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-0 right-0 px-2 py-1 text-xs font-bold text-white bg-amber-500">
                  PROMO -15%
                </div>
              </div>
              <div className="p-4">
                <h3 className="mb-2 text-lg font-semibold text-gray-800">Arbre à chat luxe multi-niveaux</h3>
                <p className="mb-2 text-sm text-gray-600 line-clamp-2">
                  Structure robuste avec griffoirs, cachettes et plateformes d'observation.
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-rose-600">84,90€</span>
                    <span className="ml-2 text-sm text-gray-500 line-through">99,90€</span>
                  </div>
                  <span className="text-sm text-gray-500">⭐⭐⭐⭐⭐</span>
                </div>
              </div>
            </Link>

            {/* Featured Product 3 */}
            <Link
              href="/produits/mixtes/accessoires-maison/aspirateur-poils-animaux"
              className="overflow-hidden transition-transform bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:translate-y-[-4px]"
            >
              <div className="relative w-full h-48">
                <Image
                  src="https://images.unsplash.com/photo-1558317374-067fb5f30001?q=80&w=1470&auto=format&fit=crop"
                  alt="Aspirateur spécial poils d'animaux"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="mb-2 text-lg font-semibold text-gray-800">Aspirateur spécial poils d'animaux</h3>
                <p className="mb-2 text-sm text-gray-600 line-clamp-2">
                  Puissant et efficace contre les poils d'animaux sur tous types de surfaces.
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-rose-600">129,90€</span>
                  <span className="text-sm text-gray-500">⭐⭐⭐⭐</span>
                </div>
              </div>
            </Link>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/produits/populaires"
              className="inline-flex items-center px-6 py-3 font-medium text-white transition-colors bg-rose-500 rounded-md hover:bg-rose-600"
            >
              Voir tous les produits populaires
            </Link>
          </div>
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
