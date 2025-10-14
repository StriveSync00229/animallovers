import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { getProductCategories } from "@/lib/server/product-service"
import { notFound } from "next/navigation"

type Props = {
  params: {
    category: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const categories = await getProductCategories()

  let categoryTitle = ""
  let categoryDescription = ""

  if (params.category === "chiens") {
    categoryTitle = "Produits pour chiens"
    categoryDescription =
      "Découvrez notre sélection de produits de qualité pour chiens, testés et approuvés par notre équipe et nos adoptants."
  } else if (params.category === "chats") {
    categoryTitle = "Produits pour chats"
    categoryDescription =
      "Découvrez notre sélection de produits de qualité pour chats, testés et approuvés par notre équipe et nos adoptants."
  } else if (params.category === "mixtes") {
    categoryTitle = "Produits mixtes"
    categoryDescription =
      "Découvrez notre sélection de produits universels pour tous vos animaux de compagnie, testés et approuvés par notre équipe."
  } else {
    return {
      title: "Catégorie non trouvée | AnimalLovers",
      description: "La catégorie que vous recherchez n'existe pas ou a été déplacée.",
    }
  }

  return {
    title: `${categoryTitle} | AnimalLovers`,
    description: categoryDescription,
  }
}

export default async function CategoryPage({ params }: Props) {
  const categories = await getProductCategories()

  let categoryData: any[] = []
  let categoryTitle = ""
  let categoryIcon = ""

  if (params.category === "chiens") {
    categoryData = categories.chiens
    categoryTitle = "Produits pour chiens"
    categoryIcon = "🐕"
  } else if (params.category === "chats") {
    categoryData = categories.chats
    categoryTitle = "Produits pour chats"
    categoryIcon = "🐱"
  } else if (params.category === "mixtes") {
    categoryData = categories.mixtes
    categoryTitle = "Produits mixtes / universels"
    categoryIcon = "🐾"
  } else {
    notFound()
  }

  return (
    <main className="pb-16">
      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-b from-rose-50 to-white">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="flex items-center justify-center mb-4 text-4xl font-bold text-gray-800 md:text-5xl">
              <span className="mr-4 text-4xl">{categoryIcon}</span>
              {categoryTitle}
            </h1>
            <p className="mb-8 text-xl text-gray-600">
              Des produits soigneusement sélectionnés et testés pour le bien-être de vos compagnons
            </p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-12">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {categoryData.map((category, index) => (
              <Link
                key={index}
                href={`/produits/${params.category}/${category.slug}`}
                className="overflow-hidden transition-transform bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:translate-y-[-4px]"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <span className="flex items-center justify-center w-12 h-12 mr-4 text-2xl bg-rose-100 rounded-full">
                      {category.icon}
                    </span>
                    <h2 className="text-xl font-bold text-gray-800">{category.name}</h2>
                  </div>

                  {category.subcategories && (
                    <ul className="pl-4 mt-4 space-y-2">
                      {category.subcategories.map((subcat: any, idx: number) => (
                        <li key={idx} className="text-gray-600 hover:text-rose-500">
                          • {subcat.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 bg-gray-50">
        <div className="container px-4 mx-auto">
          <h2 className="mb-8 text-2xl font-bold text-center text-gray-800 md:text-3xl">
            Produits populaires dans cette catégorie
          </h2>

          {params.category === "chiens" && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {/* Panier orthopédique */}
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
                </div>
                <div className="p-4">
                  <h3 className="mb-2 text-lg font-semibold text-gray-800">Panier orthopédique pour chien</h3>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-rose-600">49,90€</span>
                    <span className="text-sm text-gray-500">⭐⭐⭐⭐½</span>
                  </div>
                </div>
              </Link>

              {/* Croquettes premium */}
              <Link
                href="/produits/chiens/nourriture-friandises/croquettes-premium-sans-cereales"
                className="overflow-hidden transition-transform bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:translate-y-[-4px]"
              >
                <div className="relative w-full h-48">
                  <Image
                    src="https://images.unsplash.com/photo-1589924691995-400dc9ecc119?q=80&w=1471&auto=format&fit=crop"
                    alt="Croquettes premium sans céréales"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="mb-2 text-lg font-semibold text-gray-800">Croquettes premium sans céréales</h3>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-rose-600">54,90€</span>
                    <span className="text-sm text-gray-500">⭐⭐⭐⭐⭐</span>
                  </div>
                </div>
              </Link>

              {/* Jouet interactif */}
              <Link
                href="/produits/chiens/jouets-activites/jouet-interactif-distributeur"
                className="overflow-hidden transition-transform bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:translate-y-[-4px]"
              >
                <div className="relative w-full h-48">
                  <Image
                    src="https://images.unsplash.com/photo-1576201836106-db1758fd1c97?q=80&w=1470&auto=format&fit=crop"
                    alt="Jouet interactif distributeur de friandises"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="mb-2 text-lg font-semibold text-gray-800">Jouet interactif distributeur</h3>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-rose-600">24,90€</span>
                    <span className="text-sm text-gray-500">⭐⭐⭐⭐</span>
                  </div>
                </div>
              </Link>

              {/* Harnais anti-traction */}
              <Link
                href="/produits/chiens/promenade-transport/harnais-anti-traction"
                className="overflow-hidden transition-transform bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:translate-y-[-4px]"
              >
                <div className="relative w-full h-48">
                  <Image
                    src="https://images.unsplash.com/photo-1605897472359-85e4b94d685d?q=80&w=1470&auto=format&fit=crop"
                    alt="Harnais anti-traction réfléchissant"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="mb-2 text-lg font-semibold text-gray-800">Harnais anti-traction réfléchissant</h3>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-rose-600">32,90€</span>
                    <span className="text-sm text-gray-500">⭐⭐⭐⭐½</span>
                  </div>
                </div>
              </Link>

              {/* Brosse auto-nettoyante */}
              <Link
                href="/produits/chiens/toilettage-soins/brosse-auto-nettoyante"
                className="overflow-hidden transition-transform bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:translate-y-[-4px]"
              >
                <div className="relative w-full h-48">
                  <Image
                    src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=1471&auto=format&fit=crop"
                    alt="Brosse auto-nettoyante pour chien"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="mb-2 text-lg font-semibold text-gray-800">Brosse auto-nettoyante pour chien</h3>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-rose-600">19,90€</span>
                    <span className="text-sm text-gray-500">⭐⭐⭐⭐</span>
                  </div>
                </div>
              </Link>

              {/* Manteau imperméable */}
              <Link
                href="/produits/chiens/vetements-accessoires/manteau-impermeable"
                className="overflow-hidden transition-transform bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:translate-y-[-4px]"
              >
                <div className="relative w-full h-48">
                  <Image
                    src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1364&auto=format&fit=crop"
                    alt="Manteau imperméable pour chien"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="mb-2 text-lg font-semibold text-gray-800">Manteau imperméable pour chien</h3>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-rose-600">34,90€</span>
                    <span className="text-sm text-gray-500">⭐⭐⭐⭐</span>
                  </div>
                </div>
              </Link>

              {/* Friandises naturelles */}
              <Link
                href="/produits/chiens/nourriture-friandises/friandises-naturelles-deshydratees"
                className="overflow-hidden transition-transform bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:translate-y-[-4px]"
              >
                <div className="relative w-full h-48">
                  <Image
                    src="https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?q=80&w=1373&auto=format&fit=crop"
                    alt="Friandises naturelles déshydratées"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="mb-2 text-lg font-semibold text-gray-800">Friandises naturelles déshydratées</h3>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-rose-600">12,90€</span>
                    <span className="text-sm text-gray-500">⭐⭐⭐⭐⭐</span>
                  </div>
                </div>
              </Link>

              {/* Fontaine à eau */}
              <Link
                href="/produits/chiens/gamelles-fontaines/fontaine-eau-filtrante"
                className="overflow-hidden transition-transform bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:translate-y-[-4px]"
              >
                <div className="relative w-full h-48">
                  <Image
                    src="https://images.unsplash.com/photo-1585090790898-3a5e4da8211b?q=80&w=1470&auto=format&fit=crop"
                    alt="Fontaine à eau filtrante pour chien"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="mb-2 text-lg font-semibold text-gray-800">Fontaine à eau filtrante</h3>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-rose-600">39,90€</span>
                    <span className="text-sm text-gray-500">⭐⭐⭐⭐½</span>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {params.category === "chats" && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {/* Arbre à chat */}
              <Link
                href="/produits/chats/jouets-divertissement/arbre-chat-luxe"
                className="overflow-hidden transition-transform bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:translate-y-[-4px]"
              >
                <div className="relative w-full h-48">
                  <Image
                    src="https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?q=80&w=1374&auto=format&fit=crop"
                    alt="Arbre à chat luxe"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="mb-2 text-lg font-semibold text-gray-800">Arbre à chat luxe multi-niveaux</h3>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-rose-600">84,90€</span>
                    <span className="text-sm text-gray-500">⭐⭐⭐⭐⭐</span>
                  </div>
                </div>
              </Link>

              {/* Croquettes premium */}
              <Link
                href="/produits/chats/nourriture-friandises/croquettes-premium-sterilise"
                className="overflow-hidden transition-transform bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:translate-y-[-4px]"
              >
                <div className="relative w-full h-48">
                  <Image
                    src="https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?q=80&w=1335&auto=format&fit=crop"
                    alt="Croquettes premium pour chat stérilisé"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="mb-2 text-lg font-semibold text-gray-800">Croquettes premium chat stérilisé</h3>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-rose-600">42,90€</span>
                    <span className="text-sm text-gray-500">⭐⭐⭐⭐½</span>
                  </div>
                </div>
              </Link>

              {/* Fontaine à eau */}
              <Link
                href="/produits/chats/gamelles-fontaines/fontaine-eau-silencieuse"
                className="overflow-hidden transition-transform bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:translate-y-[-4px]"
              >
                <div className="relative w-full h-48">
                  <Image
                    src="https://images.unsplash.com/photo-1603899968034-12aaffb63a58?q=80&w=1374&auto=format&fit=crop"
                    alt="Fontaine à eau silencieuse pour chat"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="mb-2 text-lg font-semibold text-gray-800">Fontaine à eau silencieuse</h3>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-rose-600">36,90€</span>
                    <span className="text-sm text-gray-500">⭐⭐⭐⭐⭐</span>
                  </div>
                </div>
              </Link>

              {/* Jouet interactif */}
              <Link
                href="/produits/chats/jouets-divertissement/jouet-interactif-laser"
                className="overflow-hidden transition-transform bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:translate-y-[-4px]"
              >
                <div className="relative w-full h-48">
                  <Image
                    src="https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?q=80&w=1287&auto=format&fit=crop"
                    alt="Jouet interactif laser automatique"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="mb-2 text-lg font-semibold text-gray-800">Jouet interactif laser automatique</h3>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-rose-600">29,90€</span>
                    <span className="text-sm text-gray-500">⭐⭐⭐⭐</span>
                  </div>
                </div>
              </Link>

              {/* Litière autonettoyante */}
              <Link
                href="/produits/chats/litieres-accessoires/litiere-autonettoyante"
                className="overflow-hidden transition-transform bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:translate-y-[-4px]"
              >
                <div className="relative w-full h-48">
                  <Image
                    src="https://images.unsplash.com/photo-1623387641168-d9803ddd3f35?q=80&w=1470&auto=format&fit=crop"
                    alt="Litière autonettoyante connectée"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="mb-2 text-lg font-semibold text-gray-800">Litière autonettoyante connectée</h3>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-rose-600">149,90€</span>
                    <span className="text-sm text-gray-500">⭐⭐⭐⭐½</span>
                  </div>
                </div>
              </Link>

              {/* Panier douillet */}
              <Link
                href="/produits/chats/couchage-confort/panier-douillet-chat"
                className="overflow-hidden transition-transform bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:translate-y-[-4px]"
              >
                <div className="relative w-full h-48">
                  <Image
                    src="https://images.unsplash.com/photo-1574158622682-e40e69881006?q=80&w=1470&auto=format&fit=crop"
                    alt="Panier douillet pour chat"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="mb-2 text-lg font-semibold text-gray-800">Panier douillet ultra-confortable</h3>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-rose-600">34,90€</span>
                    <span className="text-sm text-gray-500">⭐⭐⭐⭐⭐</span>
                  </div>
                </div>
              </Link>

              {/* Griffoir design */}
              <Link
                href="/produits/chats/jouets-divertissement/griffoir-design"
                className="overflow-hidden transition-transform bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:translate-y-[-4px]"
              >
                <div className="relative w-full h-48">
                  <Image
                    src="https://images.unsplash.com/photo-1545249390-6bdfa286032f?q=80&w=1374&auto=format&fit=crop"
                    alt="Griffoir design en carton ondulé"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="mb-2 text-lg font-semibold text-gray-800">Griffoir design en carton ondulé</h3>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-rose-600">24,90€</span>
                    <span className="text-sm text-gray-500">⭐⭐⭐⭐</span>
                  </div>
                </div>
              </Link>

              {/* Friandises naturelles */}
              <Link
                href="/produits/chats/nourriture-friandises/friandises-naturelles-lyophilisees"
                className="overflow-hidden transition-transform bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:translate-y-[-4px]"
              >
                <div className="relative w-full h-48">
                  <Image
                    src="https://images.unsplash.com/photo-1615812214207-34e3be5651fc?q=80&w=1470&auto=format&fit=crop"
                    alt="Friandises naturelles lyophilisées"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="mb-2 text-lg font-semibold text-gray-800">Friandises naturelles lyophilisées</h3>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-rose-600">9,90€</span>
                    <span className="text-sm text-gray-500">⭐⭐⭐⭐½</span>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {params.category === "mixtes" && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {/* Aspirateur poils */}
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
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-rose-600">129,90€</span>
                    <span className="text-sm text-gray-500">⭐⭐⭐⭐</span>
                  </div>
                </div>
              </Link>

              {/* Spray anti-odeurs */}
              <Link
                href="/produits/mixtes/nettoyage-hygiene/spray-anti-odeurs-naturel"
                className="overflow-hidden transition-transform bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:translate-y-[-4px]"
              >
                <div className="relative w-full h-48">
                  <Image
                    src="https://images.unsplash.com/photo-1584949514490-73fc1a2faa97?q=80&w=1470&auto=format&fit=crop"
                    alt="Spray anti-odeurs naturel"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="mb-2 text-lg font-semibold text-gray-800">Spray anti-odeurs naturel</h3>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-rose-600">14,90€</span>
                    <span className="text-sm text-gray-500">⭐⭐⭐⭐½</span>
                  </div>
                </div>
              </Link>

              {/* Sac de transport */}
              <Link
                href="/produits/mixtes/voyage-transport/sac-transport-confort"
                className="overflow-hidden transition-transform bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:translate-y-[-4px]"
              >
                <div className="relative w-full h-48">
                  <Image
                    src="https://images.unsplash.com/photo-1535294435445-d7249524ef2e?q=80&w=1470&auto=format&fit=crop"
                    alt="Sac de transport confort"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="mb-2 text-lg font-semibold text-gray-800">Sac de transport confort</h3>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-rose-600">49,90€</span>
                    <span className="text-sm text-gray-500">⭐⭐⭐⭐</span>
                  </div>
                </div>
              </Link>

              {/* Caméra de surveillance */}
              <Link
                href="/produits/mixtes/accessoires-maison/camera-surveillance-animaux"
                className="overflow-hidden transition-transform bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:translate-y-[-4px]"
              >
                <div className="relative w-full h-48">
                  <Image
                    src="https://images.unsplash.com/photo-1610560815255-5942de76d619?q=80&w=1470&auto=format&fit=crop"
                    alt="Caméra de surveillance pour animaux"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="mb-2 text-lg font-semibold text-gray-800">Caméra de surveillance pour animaux</h3>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-rose-600">79,90€</span>
                    <span className="text-sm text-gray-500">⭐⭐⭐⭐½</span>
                  </div>
                </div>
              </Link>

              {/* Distributeur automatique */}
              <Link
                href="/produits/mixtes/gamelles-fontaines/distributeur-nourriture-automatique"
                className="overflow-hidden transition-transform bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:translate-y-[-4px]"
              >
                <div className="relative w-full h-48">
                  <Image
                    src="https://images.unsplash.com/photo-1581888227599-779811939961?q=80&w=1374&auto=format&fit=crop"
                    alt="Distributeur de nourriture automatique"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="mb-2 text-lg font-semibold text-gray-800">Distributeur de nourriture automatique</h3>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-rose-600">69,90€</span>
                    <span className="text-sm text-gray-500">⭐⭐⭐⭐</span>
                  </div>
                </div>
              </Link>

              {/* Couverture imperméable */}
              <Link
                href="/produits/mixtes/accessoires-maison/couverture-imperméable-canapé"
                className="overflow-hidden transition-transform bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:translate-y-[-4px]"
              >
                <div className="relative w-full h-48">
                  <Image
                    src="https://images.unsplash.com/photo-1583512603866-910c8542ba9d?q=80&w=1480&auto=format&fit=crop"
                    alt="Couverture imperméable pour canapé"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="mb-2 text-lg font-semibold text-gray-800">Couverture imperméable pour canapé</h3>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-rose-600">39,90€</span>
                    <span className="text-sm text-gray-500">⭐⭐⭐⭐⭐</span>
                  </div>
                </div>
              </Link>

              {/* Shampoing universel */}
              <Link
                href="/produits/mixtes/toilettage-soins/shampoing-universel-bio"
                className="overflow-hidden transition-transform bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:translate-y-[-4px]"
              >
                <div className="relative w-full h-48">
                  <Image
                    src="https://images.unsplash.com/photo-1584949514490-73fc1a2faa97?q=80&w=1470&auto=format&fit=crop"
                    alt="Shampoing universel bio"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="mb-2 text-lg font-semibold text-gray-800">Shampoing universel bio</h3>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-rose-600">16,90€</span>
                    <span className="text-sm text-gray-500">⭐⭐⭐⭐½</span>
                  </div>
                </div>
              </Link>

              {/* Trousse de premiers soins */}
              <Link
                href="/produits/mixtes/sante-bien-etre/trousse-premiers-soins"
                className="overflow-hidden transition-transform bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:translate-y-[-4px]"
              >
                <div className="relative w-full h-48">
                  <Image
                    src="https://images.unsplash.com/photo-1603398938378-e54eab446dde?q=80&w=1470&auto=format&fit=crop"
                    alt="Trousse de premiers soins pour animaux"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="mb-2 text-lg font-semibold text-gray-800">Trousse de premiers soins pour animaux</h3>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-rose-600">29,90€</span>
                    <span className="text-sm text-gray-500">⭐⭐⭐⭐</span>
                  </div>
                </div>
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
