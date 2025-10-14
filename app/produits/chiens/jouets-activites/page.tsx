"use client"

import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Search, Filter, Star, ArrowRight, Brain, Dumbbell, Droplets, Bone, Zap, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

import LoadingPage from "./loading"

// Types
type Product = {
  id: string
  name: string
  price: number
  originalPrice?: number
  rating: number
  image: string
  description: string
  category: string
  badge?: {
    text: string
    variant: "default" | "secondary" | "destructive" | "outline"
  }
  features: string[]
}

// Composant de page principale
export default function JouetsActivitesPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative w-full h-[300px] md:h-[400px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1598133894008-61f7fdb8cc3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
          alt="Chien jouant avec un jouet"
          fill
          className="object-cover brightness-[0.85]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/20" />
        <div className="container relative z-10 flex flex-col justify-center h-full px-4 mx-auto text-white">
          <motion.h1
            className="text-3xl font-bold md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Jouets & Activités pour Chiens
          </motion.h1>
          <motion.p
            className="max-w-2xl mt-4 text-lg text-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Stimulez l'intelligence et l'activité physique de votre compagnon avec notre sélection de jouets innovants
            et d'équipements d'activité.
          </motion.p>
        </div>
      </section>

      {/* Contenu principal */}
      <div className="container px-4 py-8 mx-auto md:py-12">
        {/* Barre de recherche et filtres */}
        <div className="flex flex-col items-center justify-between gap-4 mb-8 md:flex-row">
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input type="search" placeholder="Rechercher un jouet..." className="pl-10 border-gray-300" />
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <Select defaultValue="popularity">
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popularity">Popularité</SelectItem>
                <SelectItem value="price-asc">Prix croissant</SelectItem>
                <SelectItem value="price-desc">Prix décroissant</SelectItem>
                <SelectItem value="rating">Meilleures notes</SelectItem>
                <SelectItem value="newest">Nouveautés</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="flex items-center gap-2 md:hidden">
              <Filter size={16} />
              Filtres
            </Button>
          </div>
        </div>

        {/* Filtres actifs */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-sm font-medium text-gray-700">Filtres actifs:</span>
          <Badge variant="secondary" className="flex items-center gap-1">
            Jouets interactifs
            <button className="ml-1 text-gray-500 hover:text-gray-700">×</button>
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            4+ étoiles
            <button className="ml-1 text-gray-500 hover:text-gray-700">×</button>
          </Badge>
          <Button variant="link" size="sm" className="text-rose-500 h-7">
            Effacer tous les filtres
          </Button>
        </div>

        <div className="flex flex-col gap-8 md:flex-row">
          {/* Filtres latéraux - Desktop */}
          <div className="hidden w-full md:block md:w-1/4 lg:w-1/5">
            <div className="sticky p-4 border rounded-lg shadow-sm top-20">
              <h3 className="mb-4 text-lg font-semibold">Filtres</h3>

              <Accordion type="multiple" defaultValue={["price", "type", "age", "features"]}>
                <AccordionItem value="price">
                  <AccordionTrigger className="text-base font-medium">Prix</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="price-1" />
                        <label htmlFor="price-1" className="text-sm">
                          Moins de 10€
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="price-2" />
                        <label htmlFor="price-2" className="text-sm">
                          10€ - 20€
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="price-3" />
                        <label htmlFor="price-3" className="text-sm">
                          20€ - 50€
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="price-4" />
                        <label htmlFor="price-4" className="text-sm">
                          Plus de 50€
                        </label>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="type">
                  <AccordionTrigger className="text-base font-medium">Type de jouet</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="type-1" />
                        <label htmlFor="type-1" className="text-sm">
                          Jouets interactifs
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="type-2" />
                        <label htmlFor="type-2" className="text-sm">
                          Jouets à mâcher
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="type-3" />
                        <label htmlFor="type-3" className="text-sm">
                          Jouets de lancer
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="type-4" />
                        <label htmlFor="type-4" className="text-sm">
                          Jouets sonores
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="type-5" />
                        <label htmlFor="type-5" className="text-sm">
                          Jouets de traction
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="type-6" />
                        <label htmlFor="type-6" className="text-sm">
                          Équipement d'agilité
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="type-7" />
                        <label htmlFor="type-7" className="text-sm">
                          Jouets flottants
                        </label>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="age">
                  <AccordionTrigger className="text-base font-medium">Âge du chien</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="age-1" />
                        <label htmlFor="age-1" className="text-sm">
                          Chiot
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="age-2" />
                        <label htmlFor="age-2" className="text-sm">
                          Adulte
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="age-3" />
                        <label htmlFor="age-3" className="text-sm">
                          Senior
                        </label>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="features">
                  <AccordionTrigger className="text-base font-medium">Caractéristiques</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="feature-1" />
                        <label htmlFor="feature-1" className="text-sm">
                          Résistant aux mâcheurs puissants
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="feature-2" />
                        <label htmlFor="feature-2" className="text-sm">
                          Distributeur de friandises
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="feature-3" />
                        <label htmlFor="feature-3" className="text-sm">
                          Flottant
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="feature-4" />
                        <label htmlFor="feature-4" className="text-sm">
                          Sonore
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="feature-5" />
                        <label htmlFor="feature-5" className="text-sm">
                          Lavable en machine
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="feature-6" />
                        <label htmlFor="feature-6" className="text-sm">
                          Matériaux naturels
                        </label>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="material">
                  <AccordionTrigger className="text-base font-medium">Matériau</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="material-1" />
                        <label htmlFor="material-1" className="text-sm">
                          Caoutchouc
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="material-2" />
                        <label htmlFor="material-2" className="text-sm">
                          Corde
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="material-3" />
                        <label htmlFor="material-3" className="text-sm">
                          Peluche
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="material-4" />
                        <label htmlFor="material-4" className="text-sm">
                          Plastique
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="material-5" />
                        <label htmlFor="material-5" className="text-sm">
                          Bois
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="material-6" />
                        <label htmlFor="material-6" className="text-sm">
                          Nylon
                        </label>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Button className="w-full mt-6 bg-rose-500 hover:bg-rose-600">Appliquer les filtres</Button>
            </div>
          </div>

          {/* Grille de produits */}
          <div className="w-full md:w-3/4 lg:w-4/5">
            <Suspense fallback={<LoadingPage />}>
              <ProductGrid />
            </Suspense>
          </div>
        </div>
      </div>

      {/* Section Guide du jeu */}
      <section className="py-12 bg-gray-50">
        <div className="container px-4 mx-auto">
          <h2 className="mb-8 text-2xl font-bold text-center md:text-3xl">Guide du jeu et de l'activité canine</h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <Brain className="w-8 h-8 mb-2 text-rose-500" />
                <CardTitle>Stimulation mentale</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Les jouets interactifs et puzzles stimulent l'intelligence de votre chien et préviennent l'ennui.
                </p>
              </CardContent>
              <CardFooter>
                <Link
                  href="/dressage-sante/stimulation-mentale"
                  className="flex items-center text-sm font-medium text-rose-500"
                >
                  En savoir plus <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <Dumbbell className="w-8 h-8 mb-2 text-rose-500" />
                <CardTitle>Activité physique</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Les jouets de lancer et l'équipement d'agilité favorisent l'exercice et maintiennent votre chien en
                  forme.
                </p>
              </CardContent>
              <CardFooter>
                <Link
                  href="/dressage-sante/activite-physique"
                  className="flex items-center text-sm font-medium text-rose-500"
                >
                  En savoir plus <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <Bone className="w-8 h-8 mb-2 text-rose-500" />
                <CardTitle>Santé dentaire</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Les jouets à mâcher aident à nettoyer les dents et à renforcer les gencives de votre compagnon.
                </p>
              </CardContent>
              <CardFooter>
                <Link
                  href="/dressage-sante/sante-dentaire"
                  className="flex items-center text-sm font-medium text-rose-500"
                >
                  En savoir plus <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <Droplets className="w-8 h-8 mb-2 text-rose-500" />
                <CardTitle>Jeux aquatiques</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Les jouets flottants permettent à votre chien de s'amuser en toute sécurité dans l'eau.
                </p>
              </CardContent>
              <CardFooter>
                <Link
                  href="/dressage-sante/jeux-aquatiques"
                  className="flex items-center text-sm font-medium text-rose-500"
                >
                  En savoir plus <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Section Besoin de conseils */}
      <section className="py-12 bg-white">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col items-center p-6 text-center bg-rose-50 rounded-xl md:p-10">
            <Zap className="w-12 h-12 mb-4 text-rose-500" />
            <h2 className="mb-4 text-2xl font-bold">Besoin de conseils pour choisir le jouet parfait ?</h2>
            <p className="max-w-2xl mb-6 text-gray-600">
              Nos experts en comportement canin sont là pour vous aider à trouver les jouets et activités les mieux
              adaptés à la personnalité et aux besoins de votre chien.
            </p>
            <Button className="bg-rose-500 hover:bg-rose-600">Contacter un conseiller</Button>
          </div>
        </div>
      </section>

      {/* Section Newsletter */}
      <section className="py-12 bg-gray-900 text-white">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col items-center max-w-3xl mx-auto text-center">
            <Mail className="w-12 h-12 mb-4 text-rose-400" />
            <h2 className="mb-2 text-2xl font-bold md:text-3xl">Restez informé</h2>
            <p className="mb-6 text-gray-300">
              Inscrivez-vous à notre newsletter pour recevoir des conseils d'experts, des idées d'activités et des
              offres exclusives sur nos jouets pour chiens.
            </p>
            <div className="flex flex-col w-full gap-3 md:flex-row">
              <Input
                type="email"
                placeholder="Votre adresse email"
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
              />
              <Button className="bg-rose-500 hover:bg-rose-600 md:w-auto">S'inscrire</Button>
            </div>
            <p className="mt-4 text-xs text-gray-400">
              En vous inscrivant, vous acceptez de recevoir nos emails et confirmez avoir lu notre politique de
              confidentialité.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}

// Composant de grille de produits
function ProductGrid() {
  // Données de produits (simulées)
  const products: Product[] = [
    {
      id: "toy-1",
      name: "Kong Classic - Jouet à mâcher interactif",
      price: 14.99,
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1546491764-67a5b8d5b3ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
      description: "Jouet en caoutchouc résistant pour mâcheurs puissants, peut être rempli de friandises.",
      category: "Jouets interactifs",
      badge: {
        text: "Bestseller",
        variant: "default",
      },
      features: ["Résistant", "Distributeur de friandises", "Caoutchouc naturel", "Rebondissant"],
    },
    {
      id: "toy-2",
      name: "Frisbee en caoutchouc souple",
      price: 9.99,
      rating: 4.5,
      image:
        "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      description: "Frisbee souple et flottant, idéal pour les jeux de lancer en extérieur et à la plage.",
      category: "Jouets de lancer",
      features: ["Flottant", "Souple pour les dents", "Haute visibilité", "Résistant aux UV"],
    },
    {
      id: "toy-3",
      name: "Puzzle Nina Ottosson - Niveau avancé",
      price: 29.99,
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1591946614720-90a587da4a36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
      description: "Jeu d'intelligence pour stimuler mentalement votre chien, avec différents niveaux de difficulté.",
      category: "Jouets interactifs",
      badge: {
        text: "Intelligence",
        variant: "secondary",
      },
      features: ["Stimulation mentale", "Plusieurs niveaux", "Plastique sans BPA", "Facile à nettoyer"],
    },
    {
      id: "toy-4",
      name: "Corde de traction tressée premium",
      price: 12.99,
      originalPrice: 16.99,
      rating: 4.4,
      image:
        "https://images.unsplash.com/photo-1581467655410-0c2bf55d9d6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
      description:
        "Corde robuste pour jeux de traction, aide au nettoyage dentaire et renforce le lien avec votre chien.",
      category: "Jouets de traction",
      badge: {
        text: "Promo",
        variant: "destructive",
      },
      features: ["Fibres naturelles", "Nettoyage dentaire", "Lavable en machine", "Différentes tailles"],
    },
    {
      id: "toy-5",
      name: "Balle sonore rebondissante",
      price: 7.99,
      rating: 4.3,
      image:
        "https://images.unsplash.com/photo-1575859431774-2e57ed632664?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
      description: "Balle avec son intégré qui stimule l'instinct de chasse, rebondit de façon imprévisible.",
      category: "Jouets sonores",
      features: ["Son intégré", "Rebonds imprévisibles", "Caoutchouc durable", "Haute visibilité"],
    },
    {
      id: "toy-6",
      name: "Kit d'agilité portable 5 pièces",
      price: 59.99,
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1335&q=80",
      description: "Kit complet d'agilité avec obstacles, tunnels et slalom, facile à installer dans votre jardin.",
      category: "Équipement d'agilité",
      badge: {
        text: "Top ventes",
        variant: "default",
      },
      features: ["Portable", "Installation rapide", "Sac de transport inclus", "Réglable en hauteur"],
    },
    {
      id: "toy-7",
      name: "Peluche couineuse renard",
      price: 11.99,
      rating: 4.2,
      image:
        "https://images.unsplash.com/photo-1544194215-541c2d3561a4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      description: "Peluche douce avec couineur intégré, idéale pour les jeux d'intérieur et les petits chiens.",
      category: "Jouets sonores",
      features: ["Couineur intégré", "Tissu doux", "Lavable en machine", "Sans rembourrage"],
    },
    {
      id: "toy-8",
      name: "Jouet flottant Splash - Forme poisson",
      price: 15.99,
      rating: 4.6,
      image:
        "https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      description: "Jouet flottant idéal pour les jeux aquatiques, résistant à l'eau salée et chlorée.",
      category: "Jouets flottants",
      badge: {
        text: "Été",
        variant: "outline",
      },
      features: ["Flottant", "Résistant à l'eau salée", "Haute visibilité", "Poignée de lancer"],
    },
    {
      id: "toy-9",
      name: "Distributeur de friandises interactif",
      price: 19.99,
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      description:
        "Distributeur de friandises qui stimule l'intelligence et prolonge le temps de jeu, difficulté réglable.",
      category: "Jouets interactifs",
      badge: {
        text: "Nouveau",
        variant: "secondary",
      },
      features: ["Distributeur de friandises", "Difficulté réglable", "Antidérapant", "Lavable au lave-vaisselle"],
    },
    {
      id: "toy-10",
      name: "Os à mâcher en nylon ultra-résistant",
      price: 16.99,
      rating: 4.5,
      image:
        "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
      description: "Os en nylon spécialement conçu pour les mâcheurs agressifs, aide à l'hygiène dentaire.",
      category: "Jouets à mâcher",
      features: ["Ultra-résistant", "Nettoyage dentaire", "Arôme de poulet", "Pour mâcheurs puissants"],
    },
    {
      id: "toy-11",
      name: "Ballon de football pour chiens",
      price: 13.99,
      originalPrice: 17.99,
      rating: 4.4,
      image:
        "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      description: "Ballon de football en caoutchouc résistant aux morsures, idéal pour les jeux de poursuite.",
      category: "Jouets de lancer",
      badge: {
        text: "Promo",
        variant: "destructive",
      },
      features: ["Résistant aux morsures", "Rebondissant", "Flottant", "Facile à nettoyer"],
    },
    {
      id: "toy-12",
      name: "Tunnel d'agilité pliable 3 mètres",
      price: 34.99,
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1541687546006-6cf019b2f102?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      description: "Tunnel d'agilité pliable pour l'entraînement et le jeu, facile à ranger et à transporter.",
      category: "Équipement d'agilité",
      features: ["Pliable", "Piquets d'ancrage inclus", "Tissu résistant", "Sac de transport"],
    },
  ]

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <Card className="overflow-hidden h-full flex flex-col">
              <div className="relative h-48 overflow-hidden bg-gray-100">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
                {product.badge && (
                  <div className="absolute top-2 right-2">
                    <Badge variant={product.badge.variant}>{product.badge.text}</Badge>
                  </div>
                )}
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="ml-1 text-xs text-gray-600">{product.rating}</span>
                  </div>
                  <span className="text-xs text-gray-500">{product.category}</span>
                </div>
                <CardTitle className="mt-2 text-base">{product.name}</CardTitle>
                <CardDescription className="mt-1 line-clamp-2">{product.description}</CardDescription>
              </CardHeader>
              <CardContent className="pb-2 flex-grow">
                <div className="flex flex-wrap gap-1 mt-2">
                  {product.features.slice(0, 3).map((feature, index) => (
                    <Badge key={index} variant="outline" className="text-xs font-normal">
                      {feature}
                    </Badge>
                  ))}
                  {product.features.length > 3 && (
                    <Badge variant="outline" className="text-xs font-normal">
                      +{product.features.length - 3}
                    </Badge>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between pt-0">
                <div className="flex items-center">
                  <span className="text-lg font-bold">{product.price.toFixed(2)}€</span>
                  {product.originalPrice && (
                    <span className="ml-2 text-sm text-gray-500 line-through">{product.originalPrice.toFixed(2)}€</span>
                  )}
                </div>
                <Button size="sm" className="bg-rose-500 hover:bg-rose-600">
                  Ajouter
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-8">
        <Button variant="outline" size="sm" disabled>
          Précédent
        </Button>
        <div className="flex items-center gap-1">
          <Button variant="outline" size="sm" className="w-8 h-8 p-0 bg-rose-50 text-rose-600 border-rose-200">
            1
          </Button>
          <Button variant="outline" size="sm" className="w-8 h-8 p-0">
            2
          </Button>
          <Button variant="outline" size="sm" className="w-8 h-8 p-0">
            3
          </Button>
          <span className="mx-1">...</span>
          <Button variant="outline" size="sm" className="w-8 h-8 p-0">
            8
          </Button>
        </div>
        <Button variant="outline" size="sm">
          Suivant
        </Button>
      </div>
    </div>
  )
}
