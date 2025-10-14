"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Star, Filter, ChevronDown, ChevronRight, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function CouchageConfortPage() {
  const [priceRange, setPriceRange] = useState([0, 200])
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)

  const toggleFilter = (filter: string) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter((f) => f !== filter))
    } else {
      setActiveFilters([...activeFilters, filter])
    }
  }

  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter((f) => f !== filter))
  }

  const clearFilters = () => {
    setActiveFilters([])
    setPriceRange([0, 200])
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  // Produits de la catégorie
  const products = [
    {
      id: 1,
      name: "Panier orthopédique premium",
      description: "Soutien optimal pour les articulations, idéal pour les chiens âgés ou souffrant d'arthrose",
      price: 89.99,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1541599468348-e96984315921?q=80&w=1470&auto=format&fit=crop",
      badge: "Bestseller",
      type: "Panier",
      size: "Grand",
      material: "Mousse à mémoire de forme",
      features: ["Orthopédique", "Déhoussable", "Antidérapant"],
      slug: "panier-orthopedique-premium",
    },
    {
      id: 2,
      name: "Coussin moelleux réversible",
      description: "Coussin ultra-doux avec face été rafraîchissante et face hiver chaude",
      price: 45.5,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?q=80&w=1374&auto=format&fit=crop",
      badge: "",
      type: "Coussin",
      size: "Moyen",
      material: "Microfibre et tissu rafraîchissant",
      features: ["Réversible", "Lavable", "Confortable"],
      slug: "coussin-moelleux-reversible",
    },
    {
      id: 3,
      name: "Matelas orthopédique XL",
      description: "Matelas extra-large avec mousse haute densité pour un confort maximal",
      price: 129.99,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1598875184988-5e67b1a874b8?q=80&w=1470&auto=format&fit=crop",
      badge: "Premium",
      type: "Matelas",
      size: "Très grand",
      material: "Mousse haute densité",
      features: ["Orthopédique", "Extra-large", "Imperméable"],
      slug: "matelas-orthopedique-xl",
    },
    {
      id: 4,
      name: "Couverture polaire douce",
      description: "Couverture ultra-douce pour protéger vos meubles ou ajouter du confort au panier",
      price: 24.99,
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1518155317743-a8ff43ea6a5f?q=80&w=1470&auto=format&fit=crop",
      badge: "",
      type: "Couverture",
      size: "Standard",
      material: "Polaire premium",
      features: ["Anti-peluches", "Lavable", "Douce"],
      slug: "couverture-polaire-douce",
    },
    {
      id: 5,
      name: "Niche d'extérieur isolée",
      description: "Niche robuste avec isolation thermique pour toutes les saisons",
      price: 179.99,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1585844621242-bccf76ab0e2c?q=80&w=1374&auto=format&fit=crop",
      badge: "Nouveau",
      type: "Niche",
      size: "Grand",
      material: "Bois traité et isolation",
      features: ["Isolée", "Imperméable", "Surélevée"],
      slug: "niche-exterieur-isolee",
    },
    {
      id: 6,
      name: "Tapis rafraîchissant été",
      description: "Tapis auto-rafraîchissant pour soulager votre chien pendant les fortes chaleurs",
      price: 35.99,
      rating: 4.4,
      image: "https://images.unsplash.com/photo-1581888227599-779811939961?q=80&w=1374&auto=format&fit=crop",
      badge: "Été",
      type: "Tapis",
      size: "Moyen",
      material: "Gel rafraîchissant",
      features: ["Rafraîchissant", "Pliable", "Sans électricité"],
      slug: "tapis-rafraichissant-ete",
    },
    {
      id: 7,
      name: "Panier design en rotin",
      description: "Panier élégant en rotin naturel qui s'intègre parfaitement à votre décoration",
      price: 69.99,
      rating: 4.3,
      image: "https://images.unsplash.com/photo-1601758124277-f0086d5ab050?q=80&w=1374&auto=format&fit=crop",
      badge: "Design",
      type: "Panier",
      size: "Moyen",
      material: "Rotin naturel",
      features: ["Élégant", "Durable", "Coussin inclus"],
      slug: "panier-design-rotin",
    },
    {
      id: 8,
      name: "Matelas chauffant thermostatique",
      description: "Matelas chauffant avec thermostat réglable pour les mois d'hiver",
      price: 59.99,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1583511655826-05700442b31b?q=80&w=1528&auto=format&fit=crop",
      badge: "Hiver",
      type: "Matelas",
      size: "Petit à moyen",
      material: "Tissu thermique",
      features: ["Chauffant", "Thermostat", "Économique"],
      slug: "matelas-chauffant-thermostatique",
    },
    {
      id: 9,
      name: "Canapé luxe pour chien",
      description: "Véritable petit canapé pour chien avec accoudoirs et coussin ultra-confortable",
      price: 149.99,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=1460&auto=format&fit=crop",
      badge: "Luxe",
      type: "Canapé",
      size: "Moyen à grand",
      material: "Similicuir et mousse",
      features: ["Design luxueux", "Facile à nettoyer", "Confortable"],
      slug: "canape-luxe-chien",
    },
    {
      id: 10,
      name: "Hamac de fenêtre pour chien",
      description: "Hamac qui se fixe à la fenêtre pour offrir un poste d'observation ensoleillé",
      price: 42.99,
      rating: 4.2,
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1364&auto=format&fit=crop",
      badge: "Innovant",
      type: "Hamac",
      size: "Petit à moyen",
      material: "Toile renforcée",
      features: ["Installation facile", "Ventouses puissantes", "Lavable"],
      slug: "hamac-fenetre-chien",
    },
    {
      id: 11,
      name: "Tipi cosy pour chien",
      description: "Abri en forme de tipi avec coussin moelleux pour un espace cocooning",
      price: 54.99,
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1567014830515-91c904a7e1e5?q=80&w=1374&auto=format&fit=crop",
      badge: "",
      type: "Tipi",
      size: "Petit à moyen",
      material: "Coton et bois",
      features: ["Design tendance", "Démontable", "Coussin inclus"],
      slug: "tipi-cosy-chien",
    },
    {
      id: 12,
      name: "Lit surélevé respirant",
      description: "Lit surélevé avec toile respirante idéal pour l'été et les chiens à poil long",
      price: 47.99,
      rating: 4.4,
      image: "https://images.unsplash.com/photo-1598875185824-94d425239517?q=80&w=1470&auto=format&fit=crop",
      badge: "",
      type: "Lit surélevé",
      size: "Moyen à grand",
      material: "Toile respirante et métal",
      features: ["Surélevé", "Respirant", "Résistant"],
      slug: "lit-sureleve-respirant",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="mb-12">
        <div className="relative rounded-xl overflow-hidden h-64 md:h-80">
          <Image
            src="https://images.unsplash.com/photo-1591946614720-90a587da4a36?q=80&w=1374&auto=format&fit=crop"
            alt="Couchage et confort pour chiens"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-rose-500/80 to-rose-500/40 flex flex-col justify-center p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Couchage & Confort pour Chiens</h1>
            <p className="text-white text-lg md:text-xl max-w-2xl">
              Offrez à votre compagnon le repos qu'il mérite avec notre sélection de produits de couchage et confort de
              qualité.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters - Desktop */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-24 bg-white p-4 rounded-lg border shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Filtres</h2>
              {activeFilters.length > 0 && (
                <button onClick={clearFilters} className="text-xs text-rose-500 hover:text-rose-600">
                  Réinitialiser
                </button>
              )}
            </div>

            <Separator className="mb-4" />

            <Accordion type="multiple" defaultValue={["price", "type", "size", "material", "features"]}>
              <AccordionItem value="price">
                <AccordionTrigger>Prix</AccordionTrigger>
                <AccordionContent>
                  <div className="mt-2 mb-6">
                    <Slider
                      defaultValue={[0, 200]}
                      max={200}
                      step={1}
                      value={priceRange}
                      onValueChange={setPriceRange}
                    />
                    <div className="flex justify-between mt-2 text-sm">
                      <span>{priceRange[0]}€</span>
                      <span>{priceRange[1]}€</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="type">
                <AccordionTrigger>Type de produit</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {[
                      "Panier",
                      "Coussin",
                      "Matelas",
                      "Couverture",
                      "Niche",
                      "Tapis",
                      "Canapé",
                      "Hamac",
                      "Tipi",
                      "Lit surélevé",
                    ].map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox
                          id={`type-${type}`}
                          checked={activeFilters.includes(type)}
                          onCheckedChange={() => toggleFilter(type)}
                        />
                        <label htmlFor={`type-${type}`} className="text-sm cursor-pointer">
                          {type}
                        </label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="size">
                <AccordionTrigger>Taille</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {["Petit", "Moyen", "Grand", "Très grand"].map((size) => (
                      <div key={size} className="flex items-center space-x-2">
                        <Checkbox
                          id={`size-${size}`}
                          checked={activeFilters.includes(size)}
                          onCheckedChange={() => toggleFilter(size)}
                        />
                        <label htmlFor={`size-${size}`} className="text-sm cursor-pointer">
                          {size}
                        </label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="material">
                <AccordionTrigger>Matériau</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {[
                      "Mousse à mémoire de forme",
                      "Microfibre",
                      "Polaire",
                      "Bois",
                      "Rotin",
                      "Tissu thermique",
                      "Toile",
                    ].map((material) => (
                      <div key={material} className="flex items-center space-x-2">
                        <Checkbox
                          id={`material-${material}`}
                          checked={activeFilters.includes(material)}
                          onCheckedChange={() => toggleFilter(material)}
                        />
                        <label htmlFor={`material-${material}`} className="text-sm cursor-pointer">
                          {material}
                        </label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="features">
                <AccordionTrigger>Caractéristiques</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {[
                      "Orthopédique",
                      "Lavable",
                      "Imperméable",
                      "Déhoussable",
                      "Antidérapant",
                      "Chauffant",
                      "Rafraîchissant",
                      "Isolé",
                    ].map((feature) => (
                      <div key={feature} className="flex items-center space-x-2">
                        <Checkbox
                          id={`feature-${feature}`}
                          checked={activeFilters.includes(feature)}
                          onCheckedChange={() => toggleFilter(feature)}
                        />
                        <label htmlFor={`feature-${feature}`} className="text-sm cursor-pointer">
                          {feature}
                        </label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </aside>

        {/* Mobile Filters Button */}
        <div className="lg:hidden mb-4">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
            Filtres
            <ChevronDown className="h-4 w-4 ml-1" />
          </Button>

          {/* Active Filters */}
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {activeFilters.map((filter) => (
                <Badge key={filter} variant="outline" className="flex items-center gap-1">
                  {filter}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removeFilter(filter)} />
                </Badge>
              ))}
              <button onClick={clearFilters} className="text-xs text-rose-500 hover:text-rose-600 ml-2">
                Réinitialiser
              </button>
            </div>
          )}

          {/* Mobile Filters Panel */}
          {showFilters && (
            <div className="fixed inset-0 bg-white z-50 overflow-auto p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Filtres</h2>
                <Button variant="ghost" size="icon" onClick={() => setShowFilters(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <Separator className="mb-4" />

              <Accordion type="multiple" defaultValue={["price", "type", "size", "material", "features"]}>
                <AccordionItem value="price">
                  <AccordionTrigger>Prix</AccordionTrigger>
                  <AccordionContent>
                    <div className="mt-2 mb-6">
                      <Slider
                        defaultValue={[0, 200]}
                        max={200}
                        step={1}
                        value={priceRange}
                        onValueChange={setPriceRange}
                      />
                      <div className="flex justify-between mt-2 text-sm">
                        <span>{priceRange[0]}€</span>
                        <span>{priceRange[1]}€</span>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="type">
                  <AccordionTrigger>Type de produit</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {[
                        "Panier",
                        "Coussin",
                        "Matelas",
                        "Couverture",
                        "Niche",
                        "Tapis",
                        "Canapé",
                        "Hamac",
                        "Tipi",
                        "Lit surélevé",
                      ].map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <Checkbox
                            id={`mobile-type-${type}`}
                            checked={activeFilters.includes(type)}
                            onCheckedChange={() => toggleFilter(type)}
                          />
                          <label htmlFor={`mobile-type-${type}`} className="text-sm cursor-pointer">
                            {type}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="size">
                  <AccordionTrigger>Taille</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {["Petit", "Moyen", "Grand", "Très grand"].map((size) => (
                        <div key={size} className="flex items-center space-x-2">
                          <Checkbox
                            id={`mobile-size-${size}`}
                            checked={activeFilters.includes(size)}
                            onCheckedChange={() => toggleFilter(size)}
                          />
                          <label htmlFor={`mobile-size-${size}`} className="text-sm cursor-pointer">
                            {size}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="material">
                  <AccordionTrigger>Matériau</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {[
                        "Mousse à mémoire de forme",
                        "Microfibre",
                        "Polaire",
                        "Bois",
                        "Rotin",
                        "Tissu thermique",
                        "Toile",
                      ].map((material) => (
                        <div key={material} className="flex items-center space-x-2">
                          <Checkbox
                            id={`mobile-material-${material}`}
                            checked={activeFilters.includes(material)}
                            onCheckedChange={() => toggleFilter(material)}
                          />
                          <label htmlFor={`mobile-material-${material}`} className="text-sm cursor-pointer">
                            {material}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="features">
                  <AccordionTrigger>Caractéristiques</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {[
                        "Orthopédique",
                        "Lavable",
                        "Imperméable",
                        "Déhoussable",
                        "Antidérapant",
                        "Chauffant",
                        "Rafraîchissant",
                        "Isolé",
                      ].map((feature) => (
                        <div key={feature} className="flex items-center space-x-2">
                          <Checkbox
                            id={`mobile-feature-${feature}`}
                            checked={activeFilters.includes(feature)}
                            onCheckedChange={() => toggleFilter(feature)}
                          />
                          <label htmlFor={`mobile-feature-${feature}`} className="text-sm cursor-pointer">
                            {feature}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="mt-6 flex gap-3">
                <Button variant="outline" className="flex-1" onClick={clearFilters}>
                  Réinitialiser
                </Button>
                <Button className="flex-1 bg-rose-500 hover:bg-rose-600" onClick={() => setShowFilters(false)}>
                  Appliquer
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          {/* Search and Sort */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="Rechercher un produit..." className="pl-10" />
            </div>
            <select className="p-2 border rounded-md w-full sm:w-48">
              <option value="popularity">Popularité</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
              <option value="rating">Meilleures notes</option>
              <option value="newest">Nouveautés</option>
            </select>
          </div>

          {/* Products */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {products.map((product) => (
              <motion.div
                key={product.id}
                className="bg-white rounded-lg border shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                variants={itemVariants}
              >
                <Link href={`/produits/chiens/couchage-confort/${product.slug}`}>
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform hover:scale-105 duration-300"
                    />
                    {product.badge && (
                      <div className="absolute top-2 right-2 bg-rose-500 text-white text-xs font-semibold px-2 py-1 rounded">
                        {product.badge}
                      </div>
                    )}
                  </div>
                </Link>
                <div className="p-4">
                  <div className="flex items-center mb-1">
                    <div className="flex items-center text-amber-400">
                      <Star className="fill-current h-4 w-4" />
                      <span className="ml-1 text-sm font-medium text-gray-700">{product.rating}</span>
                    </div>
                    <span className="mx-2 text-gray-300">•</span>
                    <span className="text-xs text-gray-500">{product.type}</span>
                  </div>
                  <Link href={`/produits/chiens/couchage-confort/${product.slug}`}>
                    <h3 className="font-semibold text-gray-800 mb-1 hover:text-rose-500 transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg">{product.price.toFixed(2)}€</span>
                    <Button size="sm" className="bg-rose-500 hover:bg-rose-600">
                      Ajouter
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Pagination */}
          <div className="mt-10 flex justify-center">
            <nav className="flex items-center gap-1">
              <Button variant="outline" size="icon" disabled>
                <ChevronDown className="h-4 w-4 rotate-90" />
              </Button>
              <Button variant="outline" size="sm" className="bg-rose-50">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <Button variant="outline" size="icon">
                <ChevronDown className="h-4 w-4 -rotate-90" />
              </Button>
            </nav>
          </div>
        </div>
      </div>

      {/* Guide Section */}
      <section className="mt-16 bg-rose-50 rounded-xl p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Guide du couchage pour chien</h2>
        <p className="text-gray-700 mb-6">
          Choisir le bon couchage pour votre chien est essentiel pour son bien-être et sa santé. Voici quelques conseils
          pour vous aider à faire le meilleur choix.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg mb-2">Comment choisir la bonne taille ?</h3>
            <p className="text-sm text-gray-600">
              Mesurez votre chien de la truffe à la base de la queue, puis ajoutez 20-30 cm pour qu'il puisse s'étirer
              confortablement.
            </p>
            <Link
              href="/dressage-sante/choisir-couchage-chien"
              className="text-rose-500 text-sm font-medium mt-3 inline-flex items-center hover:text-rose-600"
            >
              En savoir plus
              <ChevronRight className="h-3 w-3 ml-1" />
            </Link>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg mb-2">Matelas orthopédique : pour qui ?</h3>
            <p className="text-sm text-gray-600">
              Les matelas orthopédiques sont particulièrement recommandés pour les chiens âgés, les grandes races et
              ceux souffrant de problèmes articulaires.
            </p>
            <Link
              href="/dressage-sante/matelas-orthopedique-chien"
              className="text-rose-500 text-sm font-medium mt-3 inline-flex items-center hover:text-rose-600"
            >
              En savoir plus
              <ChevronRight className="h-3 w-3 ml-1" />
            </Link>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg mb-2">Entretien et hygiène</h3>
            <p className="text-sm text-gray-600">
              Privilégiez les couchages avec housses déhoussables et lavables en machine pour maintenir une bonne
              hygiène et limiter les allergènes.
            </p>
            <Link
              href="/dressage-sante/entretien-couchage-chien"
              className="text-rose-500 text-sm font-medium mt-3 inline-flex items-center hover:text-rose-600"
            >
              En savoir plus
              <ChevronRight className="h-3 w-3 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Expert Advice */}
      <section className="mt-12 mb-16">
        <div className="bg-white border rounded-xl p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/3">
            <Image
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=1470&auto=format&fit=crop"
              alt="Expert en comportement canin"
              width={400}
              height={400}
              className="rounded-lg object-cover"
            />
          </div>
          <div className="md:w-2/3">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Besoin de conseils personnalisés ?</h2>
            <p className="text-gray-700 mb-6">
              Notre équipe d'experts en comportement canin peut vous aider à choisir le couchage idéal en fonction de
              l'âge, de la race, de la taille et des besoins spécifiques de votre chien.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-rose-500 hover:bg-rose-600">Contacter un conseiller</Button>
              <Button variant="outline">Prendre rendez-vous en boutique</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="mb-12 bg-gray-100 rounded-xl p-6 md:p-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Restez informé</h2>
          <p className="text-gray-700 mb-6">
            Inscrivez-vous à notre newsletter pour recevoir nos conseils d'experts, nos offres exclusives et nos
            nouveautés en matière de couchage et confort pour votre animal.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input placeholder="Votre adresse email" className="flex-1" />
            <Button className="bg-rose-500 hover:bg-rose-600 whitespace-nowrap">S'inscrire</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
