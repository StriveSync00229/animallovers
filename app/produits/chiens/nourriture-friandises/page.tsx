import Image from "next/image"
import { ChevronDown, Filter, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

export const metadata = {
  title: "Nourriture & Friandises pour Chiens | AnimalLovers",
  description:
    "Découvrez notre sélection de croquettes premium, pâtées, friandises et compléments alimentaires pour le bien-être de votre chien.",
}

export default function NourritureFriandisesPage() {
  return (
    <main className="pb-16">
      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-b from-rose-50 to-white">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="flex items-center justify-center mb-4 text-4xl font-bold text-gray-800 md:text-5xl">
              <span className="mr-4 text-4xl">🍖</span>
              Nourriture & Friandises pour Chiens
            </h1>
            <p className="mb-8 text-xl text-gray-600">
              Une alimentation de qualité est essentielle pour la santé et le bien-être de votre compagnon à quatre
              pattes
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <div className="w-full lg:w-1/4 space-y-6">
              <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-800">Filtres</h2>
                  <SlidersHorizontal className="w-5 h-5 text-gray-500" />
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="mb-2 font-medium text-gray-700">Prix</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Checkbox id="price-1" />
                        <label htmlFor="price-1" className="ml-2 text-sm text-gray-600">
                          Moins de 20€
                        </label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox id="price-2" />
                        <label htmlFor="price-2" className="ml-2 text-sm text-gray-600">
                          20€ - 50€
                        </label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox id="price-3" />
                        <label htmlFor="price-3" className="ml-2 text-sm text-gray-600">
                          50€ - 100€
                        </label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox id="price-4" />
                        <label htmlFor="price-4" className="ml-2 text-sm text-gray-600">
                          Plus de 100€
                        </label>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="mb-2 font-medium text-gray-700">Type de produit</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Checkbox id="type-1" />
                        <label htmlFor="type-1" className="ml-2 text-sm text-gray-600">
                          Croquettes
                        </label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox id="type-2" />
                        <label htmlFor="type-2" className="ml-2 text-sm text-gray-600">
                          Pâtées & Nourriture humide
                        </label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox id="type-3" />
                        <label htmlFor="type-3" className="ml-2 text-sm text-gray-600">
                          Friandises
                        </label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox id="type-4" />
                        <label htmlFor="type-4" className="ml-2 text-sm text-gray-600">
                          Compléments alimentaires
                        </label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox id="type-5" />
                        <label htmlFor="type-5" className="ml-2 text-sm text-gray-600">
                          Accessoires d'alimentation
                        </label>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="mb-2 font-medium text-gray-700">Âge du chien</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Checkbox id="age-1" />
                        <label htmlFor="age-1" className="ml-2 text-sm text-gray-600">
                          Chiot
                        </label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox id="age-2" />
                        <label htmlFor="age-2" className="ml-2 text-sm text-gray-600">
                          Adulte
                        </label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox id="age-3" />
                        <label htmlFor="age-3" className="ml-2 text-sm text-gray-600">
                          Senior
                        </label>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="mb-2 font-medium text-gray-700">Spécificités</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Checkbox id="spec-1" />
                        <label htmlFor="spec-1" className="ml-2 text-sm text-gray-600">
                          Sans céréales
                        </label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox id="spec-2" />
                        <label htmlFor="spec-2" className="ml-2 text-sm text-gray-600">
                          Hypoallergénique
                        </label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox id="spec-3" />
                        <label htmlFor="spec-3" className="ml-2 text-sm text-gray-600">
                          Bio
                        </label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox id="spec-4" />
                        <label htmlFor="spec-4" className="ml-2 text-sm text-gray-600">
                          Naturel
                        </label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox id="spec-5" />
                        <label htmlFor="spec-5" className="ml-2 text-sm text-gray-600">
                          Spécial digestion
                        </label>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <Button className="w-full">Appliquer les filtres</Button>
                </div>
              </div>

              <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                <h2 className="mb-4 text-xl font-bold text-gray-800">Besoin de conseils ?</h2>
                <p className="mb-4 text-gray-600">
                  Notre équipe d'experts est disponible pour vous aider à choisir l'alimentation adaptée à votre chien.
                </p>
                <Button variant="outline" className="w-full">
                  Contacter un conseiller
                </Button>
              </div>
            </div>

            {/* Products Grid */}
            <div className="w-full lg:w-3/4">
              <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-600">12 produits</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-gray-600">Trier par:</span>
                  <Button variant="outline" className="flex items-center gap-2">
                    Popularité
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {/* Croquettes premium sans céréales */}
                <div className="overflow-hidden transition-transform bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:translate-y-[-4px]">
                  <div className="relative">
                    <div className="relative w-full h-48">
                      <Image
                        src="https://images.unsplash.com/photo-1589924691995-400dc9ecc119?q=80&w=1471&auto=format&fit=crop"
                        alt="Croquettes premium sans céréales"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <Badge className="absolute top-2 right-2 bg-rose-500">Bestseller</Badge>
                  </div>
                  <div className="p-4">
                    <h3 className="mb-2 text-lg font-semibold text-gray-800">Croquettes premium sans céréales</h3>
                    <p className="mb-3 text-sm text-gray-600">
                      Formule riche en protéines avec viande fraîche, idéale pour les chiens sensibles.
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-rose-600">54,90€</span>
                      <span className="text-sm text-gray-500">⭐⭐⭐⭐⭐ (128)</span>
                    </div>
                    <Button className="w-full mt-4">Ajouter au panier</Button>
                  </div>
                </div>

                {/* Pâtée premium au poulet */}
                <div className="overflow-hidden transition-transform bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:translate-y-[-4px]">
                  <div className="relative w-full h-48">
                    <Image
                      src="https://images.unsplash.com/photo-1623341214825-9f4f963727da?q=80&w=1470&auto=format&fit=crop"
                      alt="Pâtée premium au poulet"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="mb-2 text-lg font-semibold text-gray-800">Pâtée premium au poulet</h3>
                    <p className="mb-3 text-sm text-gray-600">
                      Nourriture humide à base de poulet frais et légumes, sans conservateurs.
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-rose-600">3,90€</span>
                      <span className="text-sm text-gray-500">⭐⭐⭐⭐½ (86)</span>
                    </div>
                    <Button className="w-full mt-4">Ajouter au panier</Button>
                  </div>
                </div>

                {/* Friandises naturelles déshydratées */}
                <div className="overflow-hidden transition-transform bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:translate-y-[-4px]">
                  <div className="relative">
                    <div className="relative w-full h-48">
                      <Image
                        src="https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?q=80&w=1373&auto=format&fit=crop"
                        alt="Friandises naturelles déshydratées"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <Badge className="absolute top-2 right-2 bg-green-500">Bio</Badge>
                  </div>
                  <div className="p-4">
                    <h3 className="mb-2 text-lg font-semibold text-gray-800">Friandises naturelles déshydratées</h3>
                    <p className="mb-3 text-sm text-gray-600">
                      100% naturelles, parfaites pour l'éducation et le dressage.
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-rose-600">12,90€</span>
                      <span className="text-sm text-gray-500">⭐⭐⭐⭐⭐ (203)</span>
                    </div>
                    <Button className="w-full mt-4">Ajouter au panier</Button>
                  </div>
                </div>

                {/* Croquettes spécial chiot */}
                <div className="overflow-hidden transition-transform bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:translate-y-[-4px]">
                  <div className="relative w-full h-48">
                    <Image
                      src="https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?q=80&w=1470&auto=format&fit=crop"
                      alt="Croquettes spécial chiot"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="mb-2 text-lg font-semibold text-gray-800">Croquettes spécial chiot</h3>
                    <p className="mb-3 text-sm text-gray-600">
                      Formule enrichie en calcium et DHA pour la croissance et le développement.
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-rose-600">42,90€</span>
                      <span className="text-sm text-gray-500">⭐⭐⭐⭐ (74)</span>
                    </div>
                    <Button className="w-full mt-4">Ajouter au panier</Button>
                  </div>
                </div>

                {/* Bâtonnets dentaires */}
                <div className="overflow-hidden transition-transform bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:translate-y-[-4px]">
                  <div className="relative w-full h-48">
                    <Image
                      src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=1469&auto=format&fit=crop"
                      alt="Bâtonnets dentaires"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="mb-2 text-lg font-semibold text-gray-800">Bâtonnets dentaires</h3>
                    <p className="mb-3 text-sm text-gray-600">
                      Friandises spéciales pour l'hygiène dentaire et la fraîcheur de l'haleine.
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-rose-600">9,90€</span>
                      <span className="text-sm text-gray-500">⭐⭐⭐⭐ (112)</span>
                    </div>
                    <Button className="w-full mt-4">Ajouter au panier</Button>
                  </div>
                </div>

                {/* Complément alimentaire articulations */}
                <div className="overflow-hidden transition-transform bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:translate-y-[-4px]">
                  <div className="relative w-full h-48">
                    <Image
                      src="https://images.unsplash.com/photo-1606851091851-e8c8c0fca5ba?q=80&w=1470&auto=format&fit=crop"
                      alt="Complément alimentaire articulations"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="mb-2 text-lg font-semibold text-gray-800">Complément alimentaire articulations</h3>
                    <p className="mb-3 text-sm text-gray-600">
                      Formule à base de glucosamine et chondroïtine pour les chiens seniors.
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-rose-600">29,90€</span>
                      <span className="text-sm text-gray-500">⭐⭐⭐⭐½ (58)</span>
                    </div>
                    <Button className="w-full mt-4">Ajouter au panier</Button>
                  </div>
                </div>

                {/* Croquettes hypoallergéniques */}
                <div className="overflow-hidden transition-transform bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:translate-y-[-4px]">
                  <div className="relative">
                    <div className="relative w-full h-48">
                      <Image
                        src="https://images.unsplash.com/photo-1602084475355-9e5e4d3c8fdd?q=80&w=1374&auto=format&fit=crop"
                        alt="Croquettes hypoallergéniques"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <Badge className="absolute top-2 right-2 bg-blue-500">Spécial sensible</Badge>
                  </div>
                  <div className="p-4">
                    <h3 className="mb-2 text-lg font-semibold text-gray-800">Croquettes hypoallergéniques</h3>
                    <p className="mb-3 text-sm text-gray-600">
                      Formule à protéine unique pour chiens souffrant d'allergies alimentaires.
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-rose-600">59,90€</span>
                      <span className="text-sm text-gray-500">⭐⭐⭐⭐½ (92)</span>
                    </div>
                    <Button className="w-full mt-4">Ajouter au panier</Button>
                  </div>
                </div>

                {/* Gamelle anti-glouton */}
                <div className="overflow-hidden transition-transform bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:translate-y-[-4px]">
                  <div className="relative w-full h-48">
                    <Image
                      src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=1471&auto=format&fit=crop"
                      alt="Gamelle anti-glouton"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="mb-2 text-lg font-semibold text-gray-800">Gamelle anti-glouton</h3>
                    <p className="mb-3 text-sm text-gray-600">
                      Ralentit la prise alimentaire et prévient les problèmes digestifs.
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-rose-600">19,90€</span>
                      <span className="text-sm text-gray-500">⭐⭐⭐⭐ (67)</span>
                    </div>
                    <Button className="w-full mt-4">Ajouter au panier</Button>
                  </div>
                </div>

                {/* Friandises d'entraînement */}
                <div className="overflow-hidden transition-transform bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:translate-y-[-4px]">
                  <div className="relative w-full h-48">
                    <Image
                      src="https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?q=80&w=1471&auto=format&fit=crop"
                      alt="Friandises d'entraînement"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="mb-2 text-lg font-semibold text-gray-800">Friandises d'entraînement</h3>
                    <p className="mb-3 text-sm text-gray-600">
                      Mini-friandises molles, parfaites pour le dressage et l'éducation.
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-rose-600">7,90€</span>
                      <span className="text-sm text-gray-500">⭐⭐⭐⭐⭐ (143)</span>
                    </div>
                    <Button className="w-full mt-4">Ajouter au panier</Button>
                  </div>
                </div>

                {/* Pâtée senior digestion facile */}
                <div className="overflow-hidden transition-transform bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:translate-y-[-4px]">
                  <div className="relative w-full h-48">
                    <Image
                      src="https://images.unsplash.com/photo-1548767797-d8c844163c4c?q=80&w=1471&auto=format&fit=crop"
                      alt="Pâtée senior digestion facile"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="mb-2 text-lg font-semibold text-gray-800">Pâtée senior digestion facile</h3>
                    <p className="mb-3 text-sm text-gray-600">
                      Nourriture humide spécialement formulée pour les chiens âgés.
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-rose-600">4,50€</span>
                      <span className="text-sm text-gray-500">⭐⭐⭐⭐ (51)</span>
                    </div>
                    <Button className="w-full mt-4">Ajouter au panier</Button>
                  </div>
                </div>

                {/* Distributeur de croquettes interactif */}
                <div className="overflow-hidden transition-transform bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:translate-y-[-4px]">
                  <div className="relative">
                    <div className="relative w-full h-48">
                      <Image
                        src="https://images.unsplash.com/photo-1576201836106-db1758fd1c97?q=80&w=1470&auto=format&fit=crop"
                        alt="Distributeur de croquettes interactif"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <Badge className="absolute top-2 right-2 bg-amber-500">Nouveau</Badge>
                  </div>
                  <div className="p-4">
                    <h3 className="mb-2 text-lg font-semibold text-gray-800">Distributeur de croquettes interactif</h3>
                    <p className="mb-3 text-sm text-gray-600">
                      Jouet distributeur qui stimule mentalement votre chien pendant les repas.
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-rose-600">24,90€</span>
                      <span className="text-sm text-gray-500">⭐⭐⭐⭐ (38)</span>
                    </div>
                    <Button className="w-full mt-4">Ajouter au panier</Button>
                  </div>
                </div>

                {/* Huile de saumon */}
                <div className="overflow-hidden transition-transform bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:translate-y-[-4px]">
                  <div className="relative w-full h-48">
                    <Image
                      src="https://images.unsplash.com/photo-1611071536243-eaf7a7ec3344?q=80&w=1470&auto=format&fit=crop"
                      alt="Huile de saumon"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="mb-2 text-lg font-semibold text-gray-800">Huile de saumon</h3>
                    <p className="mb-3 text-sm text-gray-600">
                      Complément riche en oméga-3 pour un pelage brillant et une peau saine.
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-rose-600">16,90€</span>
                      <span className="text-sm text-gray-500">⭐⭐⭐⭐½ (79)</span>
                    </div>
                    <Button className="w-full mt-4">Ajouter au panier</Button>
                  </div>
                </div>
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-8">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" disabled>
                    Précédent
                  </Button>
                  <Button variant="outline" className="bg-rose-50">
                    1
                  </Button>
                  <Button variant="outline">2</Button>
                  <Button variant="outline">3</Button>
                  <Button variant="outline">Suivant</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nutrition Guide */}
      <section className="py-12 bg-gray-50">
        <div className="container px-4 mx-auto">
          <h2 className="mb-8 text-2xl font-bold text-center text-gray-800 md:text-3xl">Guide de nutrition canine</h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
              <h3 className="mb-4 text-xl font-semibold text-gray-800">Comment choisir les bonnes croquettes ?</h3>
              <p className="text-gray-600">
                Apprenez à décrypter les étiquettes et à choisir une alimentation adaptée aux besoins spécifiques de
                votre chien selon son âge, sa taille et son niveau d'activité.
              </p>
              <Button variant="link" className="mt-4 text-rose-600">
                Lire l'article
              </Button>
            </div>

            <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
              <h3 className="mb-4 text-xl font-semibold text-gray-800">Croquettes vs. alimentation BARF</h3>
              <p className="text-gray-600">
                Découvrez les avantages et inconvénients des différents types d'alimentation canine pour faire le
                meilleur choix pour votre compagnon.
              </p>
              <Button variant="link" className="mt-4 text-rose-600">
                Lire l'article
              </Button>
            </div>

            <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
              <h3 className="mb-4 text-xl font-semibold text-gray-800">Allergies alimentaires chez le chien</h3>
              <p className="text-gray-600">
                Identifiez les signes d'allergie alimentaire et découvrez les solutions nutritionnelles adaptées pour
                soulager votre chien.
              </p>
              <Button variant="link" className="mt-4 text-rose-600">
                Lire l'article
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-12">
        <div className="container px-4 mx-auto">
          <div className="p-8 bg-rose-50 rounded-lg">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="mb-4 text-2xl font-bold text-gray-800">Recevez nos conseils nutritionnels</h2>
              <p className="mb-6 text-gray-600">
                Inscrivez-vous à notre newsletter pour recevoir des conseils d'experts, des promotions exclusives et des
                nouveautés sur l'alimentation de votre chien.
              </p>

              <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
                <Button>S'inscrire</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
