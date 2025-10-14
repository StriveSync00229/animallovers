import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, ChevronRight, TrendingUp, Tag, Clock, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Catalogue complet des produits pour animaux | AnimalLovers",
  description:
    "Découvrez notre catalogue complet de produits de qualité pour chiens, chats et autres animaux, soigneusement sélectionnés pour le bien-être de vos compagnons.",
}

export default function CataloguePage() {
  return (
    <main className="pb-16">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-rose-50 to-white">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col items-center md:flex-row md:justify-between">
            <div className="max-w-2xl mb-10 text-center md:text-left md:mb-0">
              <h1 className="mb-4 text-4xl font-bold text-gray-800 md:text-5xl">Catalogue Complet</h1>
              <p className="mb-6 text-xl text-gray-600">
                Tous nos produits de qualité pour vos animaux de compagnie, soigneusement sélectionnés pour leur
                bien-être et votre satisfaction
              </p>
              <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                <Button className="bg-rose-500 hover:bg-rose-600">Découvrir nos nouveautés</Button>
                <Button variant="outline">Voir les promotions</Button>
              </div>
            </div>
            <div className="relative w-full h-64 overflow-hidden rounded-lg md:w-1/3 md:h-80">
              <Image
                src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1664&auto=format&fit=crop"
                alt="Animaux de compagnie"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white">
        <div className="container px-4 mx-auto">
          <div className="p-6 bg-gray-50 rounded-lg">
            <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Rechercher un produit..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>
              <Button variant="outline" className="flex items-center justify-center">
                <Filter size={18} className="mr-2" />
                Filtres avancés
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-12">
        <div className="container px-4 mx-auto">
          <h2 className="mb-8 text-3xl font-bold text-center text-gray-800">Catégories Populaires</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Chiens */}
            <div className="relative overflow-hidden transition-transform duration-300 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-1">
              <div className="relative w-full h-48">
                <Image
                  src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=1470&auto=format&fit=crop"
                  alt="Produits pour chiens"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="mb-2 text-xl font-semibold text-gray-800">Produits pour Chiens</h3>
                <p className="mb-4 text-gray-600">Tout ce dont votre fidèle compagnon a besoin pour son bien-être</p>
                <Link href="/produits/chiens" className="inline-flex items-center text-rose-600 hover:text-rose-700">
                  Explorer <ChevronRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>

            {/* Chats */}
            <div className="relative overflow-hidden transition-transform duration-300 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-1">
              <div className="relative w-full h-48">
                <Image
                  src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1443&auto=format&fit=crop"
                  alt="Produits pour chats"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="mb-2 text-xl font-semibold text-gray-800">Produits pour Chats</h3>
                <p className="mb-4 text-gray-600">Des articles de qualité pour le bonheur de votre félin</p>
                <Link href="/produits/chats" className="inline-flex items-center text-rose-600 hover:text-rose-700">
                  Explorer <ChevronRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>

            {/* Rongeurs */}
            <div className="relative overflow-hidden transition-transform duration-300 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-1">
              <div className="relative w-full h-48">
                <Image
                  src="https://images.unsplash.com/photo-1425082661705-1834bfd09dca?q=80&w=1476&auto=format&fit=crop"
                  alt="Produits pour rongeurs"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="mb-2 text-xl font-semibold text-gray-800">Produits pour Rongeurs</h3>
                <p className="mb-4 text-gray-600">Accessoires et nourriture pour vos petits compagnons</p>
                <Link href="/produits/rongeurs" className="inline-flex items-center text-rose-600 hover:text-rose-700">
                  Explorer <ChevronRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>

            {/* Multi-espèces */}
            <div className="relative overflow-hidden transition-transform duration-300 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-1">
              <div className="relative w-full h-48">
                <Image
                  src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?q=80&w=1586&auto=format&fit=crop"
                  alt="Produits multi-espèces"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="mb-2 text-xl font-semibold text-gray-800">Produits Mixtes</h3>
                <p className="mb-4 text-gray-600">Solutions universelles pour tous vos animaux de compagnie</p>
                <Link href="/produits/mixtes" className="inline-flex items-center text-rose-600 hover:text-rose-700">
                  Explorer <ChevronRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catalogue Tabs */}
      <section className="py-12 bg-gray-50">
        <div className="container px-4 mx-auto">
          <h2 className="mb-8 text-3xl font-bold text-center text-gray-800">Catalogue Détaillé</h2>
          <Tabs defaultValue="chiens" className="w-full">
            <TabsList className="grid w-full max-w-3xl mx-auto mb-8 md:grid-cols-4 grid-cols-2 h-auto">
              <TabsTrigger value="chiens" className="text-lg py-3">
                🐕 Chiens
              </TabsTrigger>
              <TabsTrigger value="chats" className="text-lg py-3">
                🐱 Chats
              </TabsTrigger>
              <TabsTrigger value="rongeurs" className="text-lg py-3">
                🐹 Rongeurs
              </TabsTrigger>
              <TabsTrigger value="mixtes" className="text-lg py-3">
                🐾 Mixtes
              </TabsTrigger>
            </TabsList>

            {/* CHIENS */}
            <TabsContent value="chiens">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {/* Nourriture & Friandises */}
                <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <div className="flex items-center mb-4">
                    <span className="flex items-center justify-center w-10 h-10 mr-3 text-xl bg-rose-100 rounded-full">
                      🦴
                    </span>
                    <h3 className="text-xl font-semibold text-gray-800">Nourriture & Friandises</h3>
                  </div>
                  <ul className="pl-5 mb-4 space-y-2 list-disc text-gray-600">
                    <li>
                      <Link href="/produits/chiens/nourriture-friandises/croquettes" className="hover:text-rose-600">
                        Croquettes
                      </Link>
                    </li>
                    <li>
                      <Link href="/produits/chiens/nourriture-friandises/patees" className="hover:text-rose-600">
                        Pâtées
                      </Link>
                    </li>
                    <li>
                      <Link href="/produits/chiens/nourriture-friandises/friandises" className="hover:text-rose-600">
                        Friandises
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/produits/chiens/nourriture-friandises/complements-alimentaires"
                        className="hover:text-rose-600"
                      >
                        Compléments alimentaires
                      </Link>
                    </li>
                  </ul>
                  <Link
                    href="/produits/chiens/nourriture-friandises"
                    className="inline-flex items-center text-rose-600 hover:text-rose-700"
                  >
                    Voir toute la catégorie <ChevronRight size={16} className="ml-1" />
                  </Link>
                </div>

                {/* Couchage & Confort */}
                <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <div className="flex items-center mb-4">
                    <span className="flex items-center justify-center w-10 h-10 mr-3 text-xl bg-rose-100 rounded-full">
                      🛏️
                    </span>
                    <h3 className="text-xl font-semibold text-gray-800">Couchage & Confort</h3>
                  </div>
                  <ul className="pl-5 mb-4 space-y-2 list-disc text-gray-600">
                    <li>
                      <Link href="/produits/chiens/couchage-confort/paniers" className="hover:text-rose-600">
                        Paniers
                      </Link>
                    </li>
                    <li>
                      <Link href="/produits/chiens/couchage-confort/coussins" className="hover:text-rose-600">
                        Coussins
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/produits/chiens/couchage-confort/matelas-orthopediques"
                        className="hover:text-rose-600"
                      >
                        Matelas orthopédiques
                      </Link>
                    </li>
                    <li>
                      <Link href="/produits/chiens/couchage-confort/couvertures" className="hover:text-rose-600">
                        Couvertures
                      </Link>
                    </li>
                  </ul>
                  <Link
                    href="/produits/chiens/couchage-confort"
                    className="inline-flex items-center text-rose-600 hover:text-rose-700"
                  >
                    Voir toute la catégorie <ChevronRight size={16} className="ml-1" />
                  </Link>
                </div>

                {/* Jouets & Activités */}
                <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <div className="flex items-center mb-4">
                    <span className="flex items-center justify-center w-10 h-10 mr-3 text-xl bg-rose-100 rounded-full">
                      🎾
                    </span>
                    <h3 className="text-xl font-semibold text-gray-800">Jouets & Activités</h3>
                  </div>
                  <ul className="pl-5 mb-4 space-y-2 list-disc text-gray-600">
                    <li>
                      <Link href="/produits/chiens/jouets-activites/jouets-macher" className="hover:text-rose-600">
                        Jouets à mâcher
                      </Link>
                    </li>
                    <li>
                      <Link href="/produits/chiens/jouets-activites/balles-lanceurs" className="hover:text-rose-600">
                        Balles et lanceurs
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/produits/chiens/jouets-activites/jouets-intelligence"
                        className="hover:text-rose-600"
                      >
                        Jouets d'intelligence
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/produits/chiens/jouets-activites/frisbees-jouets-exterieur"
                        className="hover:text-rose-600"
                      >
                        Frisbees et jouets d'extérieur
                      </Link>
                    </li>
                  </ul>
                  <Link
                    href="/produits/chiens/jouets-activites"
                    className="inline-flex items-center text-rose-600 hover:text-rose-700"
                  >
                    Voir toute la catégorie <ChevronRight size={16} className="ml-1" />
                  </Link>
                </div>

                {/* Promenade & Extérieur */}
                <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <div className="flex items-center mb-4">
                    <span className="flex items-center justify-center w-10 h-10 mr-3 text-xl bg-rose-100 rounded-full">
                      🐕
                    </span>
                    <h3 className="text-xl font-semibold text-gray-800">Promenade & Extérieur</h3>
                  </div>
                  <ul className="pl-5 mb-4 space-y-2 list-disc text-gray-600">
                    <li>
                      <Link href="/produits/chiens/promenade-exterieur/laisses" className="hover:text-rose-600">
                        Laisses
                      </Link>
                    </li>
                    <li>
                      <Link href="/produits/chiens/promenade-exterieur/colliers" className="hover:text-rose-600">
                        Colliers
                      </Link>
                    </li>
                    <li>
                      <Link href="/produits/chiens/promenade-exterieur/harnais" className="hover:text-rose-600">
                        Harnais
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/produits/chiens/promenade-exterieur/accessoires-promenade"
                        className="hover:text-rose-600"
                      >
                        Accessoires de promenade
                      </Link>
                    </li>
                  </ul>
                  <Link
                    href="/produits/chiens/promenade-exterieur"
                    className="inline-flex items-center text-rose-600 hover:text-rose-700"
                  >
                    Voir toute la catégorie <ChevronRight size={16} className="ml-1" />
                  </Link>
                </div>

                {/* Hygiène & Toilettage */}
                <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <div className="flex items-center mb-4">
                    <span className="flex items-center justify-center w-10 h-10 mr-3 text-xl bg-rose-100 rounded-full">
                      💧
                    </span>
                    <h3 className="text-xl font-semibold text-gray-800">Hygiène & Toilettage</h3>
                  </div>
                  <ul className="pl-5 mb-4 space-y-2 list-disc text-gray-600">
                    <li>
                      <Link href="/produits/chiens/hygiene-toilettage/shampooings" className="hover:text-rose-600">
                        Shampooings
                      </Link>
                    </li>
                    <li>
                      <Link href="/produits/chiens/hygiene-toilettage/brosses-peignes" className="hover:text-rose-600">
                        Brosses et peignes
                      </Link>
                    </li>
                    <li>
                      <Link href="/produits/chiens/hygiene-toilettage/soins-dentaires" className="hover:text-rose-600">
                        Soins dentaires
                      </Link>
                    </li>
                    <li>
                      <Link href="/produits/chiens/hygiene-toilettage/anti-parasites" className="hover:text-rose-600">
                        Anti-parasites
                      </Link>
                    </li>
                  </ul>
                  <Link
                    href="/produits/chiens/hygiene-toilettage"
                    className="inline-flex items-center text-rose-600 hover:text-rose-700"
                  >
                    Voir toute la catégorie <ChevronRight size={16} className="ml-1" />
                  </Link>
                </div>

                {/* Vêtements & Accessoires */}
                <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <div className="flex items-center mb-4">
                    <span className="flex items-center justify-center w-10 h-10 mr-3 text-xl bg-rose-100 rounded-full">
                      👕
                    </span>
                    <h3 className="text-xl font-semibold text-gray-800">Vêtements & Accessoires</h3>
                  </div>
                  <ul className="pl-5 mb-4 space-y-2 list-disc text-gray-600">
                    <li>
                      <Link href="/produits/chiens/vetements-accessoires/manteaux" className="hover:text-rose-600">
                        Manteaux et imperméables
                      </Link>
                    </li>
                    <li>
                      <Link href="/produits/chiens/vetements-accessoires/pulls" className="hover:text-rose-600">
                        Pulls et t-shirts
                      </Link>
                    </li>
                    <li>
                      <Link href="/produits/chiens/vetements-accessoires/chaussures" className="hover:text-rose-600">
                        Chaussures et bottines
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/produits/chiens/vetements-accessoires/accessoires-mode"
                        className="hover:text-rose-600"
                      >
                        Accessoires de mode
                      </Link>
                    </li>
                  </ul>
                  <Link
                    href="/produits/chiens/vetements-accessoires"
                    className="inline-flex items-center text-rose-600 hover:text-rose-700"
                  >
                    Voir toute la catégorie <ChevronRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            </TabsContent>

            {/* CHATS */}
            <TabsContent value="chats">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {/* Nourriture & Friandises */}
                <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <div className="flex items-center mb-4">
                    <span className="flex items-center justify-center w-10 h-10 mr-3 text-xl bg-rose-100 rounded-full">
                      🥩
                    </span>
                    <h3 className="text-xl font-semibold text-gray-800">Nourriture & Friandises</h3>
                  </div>
                  <ul className="pl-5 mb-4 space-y-2 list-disc text-gray-600">
                    <li>
                      <Link href="/produits/chats/nourriture-friandises/croquettes" className="hover:text-rose-600">
                        Croquettes
                      </Link>
                    </li>
                    <li>
                      <Link href="/produits/chats/nourriture-friandises/patees" className="hover:text-rose-600">
                        Pâtées
                      </Link>
                    </li>
                    <li>
                      <Link href="/produits/chats/nourriture-friandises/friandises" className="hover:text-rose-600">
                        Friandises
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/produits/chats/nourriture-friandises/alimentation-specifique"
                        className="hover:text-rose-600"
                      >
                        Alimentation spécifique
                      </Link>
                    </li>
                  </ul>
                  <Link
                    href="/produits/chats/nourriture-friandises"
                    className="inline-flex items-center text-rose-600 hover:text-rose-700"
                  >
                    Voir toute la catégorie <ChevronRight size={16} className="ml-1" />
                  </Link>
                </div>

                {/* Jouets & Divertissement */}
                <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <div className="flex items-center mb-4">
                    <span className="flex items-center justify-center w-10 h-10 mr-3 text-xl bg-rose-100 rounded-full">
                      🧸
                    </span>
                    <h3 className="text-xl font-semibold text-gray-800">Jouets & Divertissement</h3>
                  </div>
                  <ul className="pl-5 mb-4 space-y-2 list-disc text-gray-600">
                    <li>
                      <Link
                        href="/produits/chats/jouets-divertissement/jouets-interactifs"
                        className="hover:text-rose-600"
                      >
                        Jouets interactifs
                      </Link>
                    </li>
                    <li>
                      <Link href="/produits/chats/jouets-divertissement/cannes-peche" className="hover:text-rose-600">
                        Cannes à pêche
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/produits/chats/jouets-divertissement/tunnels-parcours"
                        className="hover:text-rose-600"
                      >
                        Tunnels et parcours
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/produits/chats/jouets-divertissement/jouets-herbe-chat"
                        className="hover:text-rose-600"
                      >
                        Jouets à herbe à chat
                      </Link>
                    </li>
                  </ul>
                  <Link
                    href="/produits/chats/jouets-divertissement"
                    className="inline-flex items-center text-rose-600 hover:text-rose-700"
                  >
                    Voir toute la catégorie <ChevronRight size={16} className="ml-1" />
                  </Link>
                </div>

                {/* Couchage & Mobilier */}
                <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <div className="flex items-center mb-4">
                    <span className="flex items-center justify-center w-10 h-10 mr-3 text-xl bg-rose-100 rounded-full">
                      🛏️
                    </span>
                    <h3 className="text-xl font-semibold text-gray-800">Couchage & Mobilier</h3>
                  </div>
                  <ul className="pl-5 mb-4 space-y-2 list-disc text-gray-600">
                    <li>
                      <Link href="/produits/chats/couchage-mobilier/arbres-chat" className="hover:text-rose-600">
                        Arbres à chat
                      </Link>
                    </li>
                    <li>
                      <Link href="/produits/chats/couchage-mobilier/paniers-coussins" className="hover:text-rose-600">
                        Paniers et coussins
                      </Link>
                    </li>
                    <li>
                      <Link href="/produits/chats/couchage-mobilier/griffoirs" className="hover:text-rose-600">
                        Griffoirs
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/produits/chats/couchage-mobilier/etageres-mobilier-mural"
                        className="hover:text-rose-600"
                      >
                        Étagères et mobilier mural
                      </Link>
                    </li>
                  </ul>
                  <Link
                    href="/produits/chats/couchage-mobilier"
                    className="inline-flex items-center text-rose-600 hover:text-rose-700"
                  >
                    Voir toute la catégorie <ChevronRight size={16} className="ml-1" />
                  </Link>
                </div>

                {/* Hygiène & Toilettage */}
                <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <div className="flex items-center mb-4">
                    <span className="flex items-center justify-center w-10 h-10 mr-3 text-xl bg-rose-100 rounded-full">
                      🧼
                    </span>
                    <h3 className="text-xl font-semibold text-gray-800">Hygiène & Toilettage</h3>
                  </div>
                  <ul className="pl-5 mb-4 space-y-2 list-disc text-gray-600">
                    <li>
                      <Link
                        href="/produits/chats/hygiene-toilettage/litieres-accessoires"
                        className="hover:text-rose-600"
                      >
                        Litières et accessoires
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/produits/chats/hygiene-toilettage/produits-toilettage"
                        className="hover:text-rose-600"
                      >
                        Produits de toilettage
                      </Link>
                    </li>
                    <li>
                      <Link href="/produits/chats/hygiene-toilettage/anti-parasites" className="hover:text-rose-600">
                        Anti-parasites
                      </Link>
                    </li>
                    <li>
                      <Link href="/produits/chats/hygiene-toilettage/desodorisants" className="hover:text-rose-600">
                        Désodorisants
                      </Link>
                    </li>
                  </ul>
                  <Link
                    href="/produits/chats/hygiene-toilettage"
                    className="inline-flex items-center text-rose-600 hover:text-rose-700"
                  >
                    Voir toute la catégorie <ChevronRight size={16} className="ml-1" />
                  </Link>
                </div>

                {/* Transport & Sécurité */}
                <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <div className="flex items-center mb-4">
                    <span className="flex items-center justify-center w-10 h-10 mr-3 text-xl bg-rose-100 rounded-full">
                      🧳
                    </span>
                    <h3 className="text-xl font-semibold text-gray-800">Transport & Sécurité</h3>
                  </div>
                  <ul className="pl-5 mb-4 space-y-2 list-disc text-gray-600">
                    <li>
                      <Link href="/produits/chats/transport-securite/sacs-transport" className="hover:text-rose-600">
                        Sacs de transport
                      </Link>
                    </li>
                    <li>
                      <Link href="/produits/chats/transport-securite/cages-transport" className="hover:text-rose-600">
                        Cages de transport
                      </Link>
                    </li>
                    <li>
                      <Link href="/produits/chats/transport-securite/harnais-laisses" className="hover:text-rose-600">
                        Harnais et laisses
                      </Link>
                    </li>
                    <li>
                      <Link href="/produits/chats/transport-securite/filets-protection" className="hover:text-rose-600">
                        Filets de protection
                      </Link>
                    </li>
                  </ul>
                  <Link
                    href="/produits/chats/transport-securite"
                    className="inline-flex items-center text-rose-600 hover:text-rose-700"
                  >
                    Voir toute la catégorie <ChevronRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            </TabsContent>

            {/* RONGEURS */}
            <TabsContent value="rongeurs">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {/* Nourriture */}
                <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <div className="flex items-center mb-4">
                    <span className="flex items-center justify-center w-10 h-10 mr-3 text-xl bg-rose-100 rounded-full">
                      🌱
                    </span>
                    <h3 className="text-xl font-semibold text-gray-800">Nourriture</h3>
                  </div>
                  <ul className="pl-5 mb-4 space-y-2 list-disc text-gray-600">
                    <li>
                      <Link href="/produits/rongeurs/nourriture/granules" className="hover:text-rose-600">
                        Granulés et mélanges
                      </Link>
                    </li>
                    <li>
                      <Link href="/produits/rongeurs/nourriture/foin" className="hover:text-rose-600">
                        Foin et herbes
                      </Link>
                    </li>
                    <li>
                      <Link href="/produits/rongeurs/nourriture/friandises" className="hover:text-rose-600">
                        Friandises
                      </Link>
                    </li>
                    <li>
                      <Link href="/produits/rongeurs/nourriture/complements" className="hover:text-rose-600">
                        Compléments alimentaires
                      </Link>
                    </li>
                  </ul>
                  <Link
                    href="/produits/rongeurs/nourriture"
                    className="inline-flex items-center text-rose-600 hover:text-rose-700"
                  >
                    Voir toute la catégorie <ChevronRight size={16} className="ml-1" />
                  </Link>
                </div>

                {/* Habitat */}
                <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <div className="flex items-center mb-4">
                    <span className="flex items-center justify-center w-10 h-10 mr-3 text-xl bg-rose-100 rounded-full">
                      🏠
                    </span>
                    <h3 className="text-xl font-semibold text-gray-800">Habitat</h3>
                  </div>
                  <ul className="pl-5 mb-4 space-y-2 list-disc text-gray-600">
                    <li>
                      <Link href="/produits/rongeurs/habitat/cages" className="hover:text-rose-600">
                        Cages et enclos
                      </Link>
                    </li>
                    <li>
                      <Link href="/produits/rongeurs/habitat/accessoires-cage" className="hover:text-rose-600">
                        Accessoires de cage
                      </Link>
                    </li>
                    <li>
                      <Link href="/produits/rongeurs/habitat/litieres" className="hover:text-rose-600">
                        Litières et substrats
                      </Link>
                    </li>
                    <li>
                      <Link href="/produits/rongeurs/habitat/maisons-abris" className="hover:text-rose-600">
                        Maisons et abris
                      </Link>
                    </li>
                  </ul>
                  <Link
                    href="/produits/rongeurs/habitat"
                    className="inline-flex items-center text-rose-600 hover:text-rose-700"
                  >
                    Voir toute la catégorie <ChevronRight size={16} className="ml-1" />
                  </Link>
                </div>

                {/* Jouets & Activités */}
                <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <div className="flex items-center mb-4">
                    <span className="flex items-center justify-center w-10 h-10 mr-3 text-xl bg-rose-100 rounded-full">
                      🎪
                    </span>
                    <h3 className="text-xl font-semibold text-gray-800">Jouets & Activités</h3>
                  </div>
                  <ul className="pl-5 mb-4 space-y-2 list-disc text-gray-600">
                    <li>
                      <Link href="/produits/rongeurs/jouets-activites/roues" className="hover:text-rose-600">
                        Roues d'exercice
                      </Link>
                    </li>
                    <li>
                      <Link href="/produits/rongeurs/jouets-activites/tunnels" className="hover:text-rose-600">
                        Tunnels et labyrinthes
                      </Link>
                    </li>
                    <li>
                      <Link href="/produits/rongeurs/jouets-activites/jouets-macher" className="hover:text-rose-600">
                        Jouets à mâcher
                      </Link>
                    </li>
                    <li>
                      <Link href="/produits/rongeurs/jouets-activites/aires-jeux" className="hover:text-rose-600">
                        Aires de jeux
                      </Link>
                    </li>
                  </ul>
                  <Link
                    href="/produits/rongeurs/jouets-activites"
                    className="inline-flex items-center text-rose-600 hover:text-rose-700"
                  >
                    Voir toute la catégorie <ChevronRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            </TabsContent>

            {/* MIXTES */}
            <TabsContent value="mixtes">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {/* Packs multi-espèce */}
                <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <div className="flex items-center mb-4">
                    <span className="flex items-center justify-center w-10 h-10 mr-3 text-xl bg-rose-100 rounded-full">
                      📦
                    </span>
                    <h3 className="text-xl font-semibold text-gray-800">Packs multi-espèce</h3>
                  </div>
                  <ul className="pl-5 mb-4 space-y-2 list-disc text-gray-600">
                    <li>
                      <Link href="/produits/mixtes/packs-multi-espece/soins" className="hover:text-rose-600">
                        Packs de soins
                      </Link>
                    </li>
                    <li>
                      <Link href="/produits/mixtes/packs-multi-espece/voyage" className="hover:text-rose-600">
                        Packs voyage
                      </Link>
                    </li>
                    <li>
                      <Link href="/produits/mixtes/packs-multi-espece/nettoyage" className="hover:text-rose-600">
                        Kits de nettoyage
                      </Link>
                    </li>
                    <li>
                      <Link href="/produits/mixtes/packs-multi-espece/urgence" className="hover:text-rose-600">
                        Kits d'urgence
                      </Link>
                    </li>
                  </ul>
                  <Link
                    href="/produits/mixtes/packs-multi-espece"
                    className="inline-flex items-center text-rose-600 hover:text-rose-700"
                  >
                    Voir toute la catégorie <ChevronRight size={16} className="ml-1" />
                  </Link>
                </div>

                {/* Accessoires universels */}
                <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <div className="flex items-center mb-4">
                    <span className="flex items-center justify-center w-10 h-10 mr-3 text-xl bg-rose-100 rounded-full">
                      🧰
                    </span>
                    <h3 className="text-xl font-semibold text-gray-800">Accessoires universels</h3>
                  </div>
                  <ul className="pl-5 mb-4 space-y-2 list-disc text-gray-600">
                    <li>
                      <Link href="/produits/mixtes/accessoires-universels/bols" className="hover:text-rose-600">
                        Bols et gamelles
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/produits/mixtes/accessoires-universels/distributeurs"
                        className="hover:text-rose-600"
                      >
                        Distributeurs automatiques
                      </Link>
                    </li>
                    <li>
                      <Link href="/produits/mixtes/accessoires-universels/fontaines" className="hover:text-rose-600">
                        Fontaines à eau
                      </Link>
                    </li>
                    <li>
                      <Link href="/produits/mixtes/accessoires-universels/stockage" className="hover:text-rose-600">
                        Solutions de stockage
                      </Link>
                    </li>
                  </ul>
                  <Link
                    href="/produits/mixtes/accessoires-universels"
                    className="inline-flex items-center text-rose-600 hover:text-rose-700"
                  >
                    Voir toute la catégorie <ChevronRight size={16} className="ml-1" />
                  </Link>
                </div>

                {/* Produits d'entretien */}
                <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <div className="flex items-center mb-4">
                    <span className="flex items-center justify-center w-10 h-10 mr-3 text-xl bg-rose-100 rounded-full">
                      🧹
                    </span>
                    <h3 className="text-xl font-semibold text-gray-800">Produits d'entretien</h3>
                  </div>
                  <ul className="pl-5 mb-4 space-y-2 list-disc text-gray-600">
                    <li>
                      <Link href="/produits/mixtes/produits-entretien/nettoyants" className="hover:text-rose-600">
                        Nettoyants multi-surfaces
                      </Link>
                    </li>
                    <li>
                      <Link href="/produits/mixtes/produits-entretien/desodorisants" className="hover:text-rose-600">
                        Désodorisants
                      </Link>
                    </li>
                    <li>
                      <Link href="/produits/mixtes/produits-entretien/anti-taches" className="hover:text-rose-600">
                        Anti-taches et odeurs
                      </Link>
                    </li>
                    <li>
                      <Link href="/produits/mixtes/produits-entretien/aspirateurs" className="hover:text-rose-600">
                        Aspirateurs spécialisés
                      </Link>
                    </li>
                  </ul>
                  <Link
                    href="/produits/mixtes/produits-entretien"
                    className="inline-flex items-center text-rose-600 hover:text-rose-700"
                  >
                    Voir toute la catégorie <ChevronRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12">
        <div className="container px-4 mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Produits Populaires</h2>
            <Link href="/produits/populaires" className="inline-flex items-center text-rose-600 hover:text-rose-700">
              Voir tous <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Product 1 */}
            <div className="relative overflow-hidden transition-transform duration-300 bg-white border border-gray-200 rounded-lg shadow-sm group hover:shadow-md hover:-translate-y-1">
              <div className="absolute top-0 right-0 z-10 p-2">
                <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-white bg-rose-500 rounded">
                  <TrendingUp size={12} className="mr-1" /> Populaire
                </span>
              </div>
              <div className="relative w-full h-48">
                <Image
                  src="https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?q=80&w=1470&auto=format&fit=crop"
                  alt="Croquettes premium pour chien"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-500">Chiens</span>
                  <div className="flex items-center">
                    <Heart size={16} className="text-gray-400 group-hover:text-rose-500" />
                  </div>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-800">Croquettes Premium Sans Céréales</h3>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-rose-600">29,99 €</span>
                  <Button size="sm" className="bg-rose-500 hover:bg-rose-600">
                    Voir
                  </Button>
                </div>
              </div>
            </div>

            {/* Product 2 */}
            <div className="relative overflow-hidden transition-transform duration-300 bg-white border border-gray-200 rounded-lg shadow-sm group hover:shadow-md hover:-translate-y-1">
              <div className="absolute top-0 right-0 z-10 p-2">
                <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-white bg-green-500 rounded">
                  <Tag size={12} className="mr-1" /> -15%
                </span>
              </div>
              <div className="relative w-full h-48">
                <Image
                  src="https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?q=80&w=1374&auto=format&fit=crop"
                  alt="Jouet interactif pour chat"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-500">Chats</span>
                  <div className="flex items-center">
                    <Heart size={16} className="text-gray-400 group-hover:text-rose-500" />
                  </div>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-800">Circuit de Jeu Interactif</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-rose-600">24,99 €</span>
                    <span className="ml-2 text-sm line-through text-gray-400">29,99 €</span>
                  </div>
                  <Button size="sm" className="bg-rose-500 hover:bg-rose-600">
                    Voir
                  </Button>
                </div>
              </div>
            </div>

            {/* Product 3 */}
            <div className="relative overflow-hidden transition-transform duration-300 bg-white border border-gray-200 rounded-lg shadow-sm group hover:shadow-md hover:-translate-y-1">
              <div className="absolute top-0 right-0 z-10 p-2">
                <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-white bg-blue-500 rounded">
                  <Clock size={12} className="mr-1" /> Nouveau
                </span>
              </div>
              <div className="relative w-full h-48">
                <Image
                  src="https://images.unsplash.com/photo-1541599468348-e96984315921?q=80&w=1470&auto=format&fit=crop"
                  alt="Panier orthopédique pour chien"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-500">Chiens</span>
                  <div className="flex items-center">
                    <Heart size={16} className="text-gray-400 group-hover:text-rose-500" />
                  </div>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-800">Panier Orthopédique Confort+</h3>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-rose-600">49,99 €</span>
                  <Button size="sm" className="bg-rose-500 hover:bg-rose-600">
                    Voir
                  </Button>
                </div>
              </div>
            </div>

            {/* Product 4 */}
            <div className="relative overflow-hidden transition-transform duration-300 bg-white border border-gray-200 rounded-lg shadow-sm group hover:shadow-md hover:-translate-y-1">
              <div className="absolute top-0 right-0 z-10 p-2">
                <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-white bg-purple-500 rounded">
                  <Tag size={12} className="mr-1" /> Pack
                </span>
              </div>
              <div className="relative w-full h-48">
                <Image
                  src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1664&auto=format&fit=crop"
                  alt="Pack multi-espèce"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-500">Mixte</span>
                  <div className="flex items-center">
                    <Heart size={16} className="text-gray-400 group-hover:text-rose-500" />
                  </div>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-800">Pack Soins Essentiels Multi-Animaux</h3>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-rose-600">39,99 €</span>
                  <Button size="sm" className="bg-rose-500 hover:bg-rose-600">
                    Voir
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 bg-rose-50">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl p-8 mx-auto bg-white rounded-lg shadow-md">
            <h2 className="mb-4 text-2xl font-bold text-center text-gray-800">
              Recevez notre catalogue et nos offres exclusives
            </h2>
            <p className="mb-6 text-center text-gray-600">
              Inscrivez-vous pour recevoir notre catalogue complet, nos nouveautés et nos offres spéciales directement
              dans votre boîte mail
            </p>
            <form className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-grow px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
                required
              />
              <Button type="submit" className="px-6 py-3 font-medium text-white bg-rose-500 hover:bg-rose-600">
                S'inscrire
              </Button>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}
