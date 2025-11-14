import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { PawPrint, Search, Filter, Heart, ShieldCheck, Sparkles, MapPin } from "lucide-react"

import { createClient } from "@/lib/supabase/server"
import type { Database } from "@/lib/types/database"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

type AdoptionAnimal = Database["public"]["Tables"]["adoption_animals"]["Row"]

type SearchParams = {
  species?: string
  q?: string
}

const speciesFilters = [
  { value: "all", label: "Tous" },
  { value: "chien", label: "Chiens" },
  { value: "chat", label: "Chats" },
  { value: "autre", label: "Autres" },
]

const ageFilters = [
  { value: "all", label: "Tous les âges" },
  { value: "chiot", label: "Chiot / Chaton" },
  { value: "adulte", label: "Adulte" },
  { value: "senior", label: "Senior" },
]

const temperamentBadges: Record<string, string> = {
  calme: "bg-blue-100 text-blue-700",
  joueur: "bg-green-100 text-green-700",
  affectueux: "bg-rose-100 text-rose-700",
  énergique: "bg-orange-100 text-orange-700",
}

export const metadata = {
  title: "Adoption | Animal Lovers",
  description: "Découvrez nos chiens et chats prêts à rejoindre une famille aimante.",
}

async function fetchAdoptionAnimals(): Promise<AdoptionAnimal[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("adoption_animals")
      .select("*")
      .eq("is_available", true)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Erreur Supabase adoption_animals:", error)
      return []
    }

    return data ?? []
  } catch (error) {
    console.error("Erreur inattendue lors de la récupération des animaux:", error)
    return []
  }
}

function filterAnimals(animals: AdoptionAnimal[], params: SearchParams) {
  const query = params.q?.toLowerCase().trim()
  const species = params.species?.toLowerCase()

  return animals.filter((animal) => {
    const matchesSpecies = !species || species === "all" || animal.category?.toLowerCase() === species
    const matchesQuery =
      !query ||
      animal.name?.toLowerCase().includes(query) ||
      animal.breed?.toLowerCase().includes(query) ||
      animal.description?.toLowerCase().includes(query)

    return matchesSpecies && matchesQuery
  })
}

function getBadgeClass(value: string | null) {
  if (!value) return "bg-gray-100 text-gray-700"
  return temperamentBadges[value.toLowerCase()] || "bg-gray-100 text-gray-700"
}

function getAgeLabel(ageRange: string | null) {
  if (!ageRange) return "Âge à définir"
  switch (ageRange.toLowerCase()) {
    case "chiot":
    case "chaton":
      return "Jeune"
    case "adulte":
      return "Adulte"
    case "senior":
      return "Senior"
    default:
      return ageRange
  }
}

function AdoptionFilters({ searchParams }: { searchParams: SearchParams }) {
  return (
    <form className="grid gap-4 md:grid-cols-[1fr,200px]" method="get">
      <Label className="sr-only" htmlFor="q">
        Rechercher un animal
      </Label>
      <div className="flex items-center gap-3 rounded-full border bg-white px-4 py-2 shadow-sm">
        <Search className="h-4 w-4 text-gray-500" />
        <Input
          id="q"
          name="q"
          defaultValue={searchParams.q}
          placeholder="Nom, race, description..."
          className="border-0 shadow-none focus-visible:ring-0"
        />
      </div>

      <div className="flex gap-2">
        <div className="flex flex-1 items-center gap-2 rounded-full border bg-white px-4 py-2 shadow-sm">
          <Filter className="h-4 w-4 text-gray-500" />
          <select
            name="species"
            defaultValue={searchParams.species || "all"}
            className="flex-1 border-0 bg-transparent text-sm focus:outline-none"
          >
            {speciesFilters.map((filter) => (
              <option key={filter.value} value={filter.value}>
                {filter.label}
              </option>
            ))}
          </select>
        </div>
        <Button type="submit" className="rounded-full bg-rose-500 hover:bg-rose-600">
          Filtrer
        </Button>
      </div>
    </form>
  )
}

function AdoptionProcess() {
  const steps = [
    {
      title: "1. Faites connaissance",
      description: "Parcourez les profils et repérez l’animal qui correspond à votre mode de vie.",
      icon: <Sparkles className="h-5 w-5 text-yellow-500" />,
    },
    {
      title: "2. Contactez-nous",
      description: "Remplissez le formulaire d’adoption et échangez avec nos bénévoles.",
      icon: <Heart className="h-5 w-5 text-rose-500" />,
    },
    {
      title: "3. Préparez son arrivée",
      description: "Nous organisons une rencontre puis l’animal rejoint sa nouvelle famille.",
      icon: <ShieldCheck className="h-5 w-5 text-green-500" />,
    },
  ]

  return (
    <section className="rounded-2xl border border-rose-100 bg-rose-50 p-6">
      <h3 className="mb-4 text-xl font-semibold text-rose-900">Comment adopter ?</h3>
      <div className="grid gap-4 md:grid-cols-3">
        {steps.map((step) => (
          <Card key={step.title} className="bg-white/70 shadow-sm">
            <CardHeader className="flex flex-row items-center gap-3">
              <div className="rounded-full bg-rose-100 p-2">{step.icon}</div>
              <CardTitle className="text-base">{step.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">{step.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

function AdoptionHero({ total }: { total: number }) {
  return (
    <section className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-rose-50 via-white to-orange-50 p-8 shadow-sm">
      <div className="absolute inset-y-0 right-0 h-full w-1/2 bg-[url('https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=80')] bg-cover bg-center opacity-20" />
      <div className="relative z-10 grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <Badge className="bg-rose-100 text-rose-700">
            <PawPrint className="mr-2 h-4 w-4" />
            Programme d'adoption
          </Badge>
          <h1 className="text-4xl font-bold text-gray-900 md:text-5xl">Offrez un nouveau départ</h1>
          <p className="text-lg text-gray-600">
            Chaque adoption libère une place pour un nouvel animal en détresse. Découvrez nos pensionnaires et laissez-vous
            toucher par leur histoire.
          </p>
          <div className="flex flex-wrap gap-6">
            <div>
              <p className="text-3xl font-bold text-gray-900">{total}</p>
              <p className="text-sm text-gray-500">Animaux à l'adoption</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">72h</p>
              <p className="text-sm text-gray-500">Temps moyen pour une réponse</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button className="rounded-full bg-rose-500 hover:bg-rose-600">
              <Link href="/contact" className="flex items-center">
                Commencer les démarches
                <PawPrint className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" className="rounded-full">
              <Link href="/impact">Voir nos réussites</Link>
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="relative w-full rounded-2xl bg-white/70 p-6 shadow-lg">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-full bg-rose-100 p-3">
                <PawPrint className="h-6 w-6 text-rose-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Programme solidaire</p>
                <p className="font-semibold text-gray-900">100% des dons financent leurs soins</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Tous nos pensionnaires sont identifiés, vaccinés, stérilisés (selon l’âge) et suivis par nos vétérinaires.
              L’adoption comprend l’accompagnement administratif et des conseils personnalisés.
            </p>
            <Separator className="my-4" />
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <ShieldCheck className="h-4 w-4 text-green-600" />
              Contrat d'adoption et suivi post-adoption inclus
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function AdoptionGrid({ animals }: { animals: AdoptionAnimal[] }) {
  if (!animals.length) {
    return (
      <Card className="text-center">
        <CardContent className="py-16">
          <PawPrint className="mx-auto mb-4 h-10 w-10 text-gray-400" />
          <p className="text-lg font-semibold text-gray-800">Aucun animal ne correspond à cette recherche.</p>
          <p className="text-gray-500">Essayez de modifier vos filtres ou revenez bientôt, de nouveaux pensionnaires arrivent.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {animals.map((animal) => (
        <Card key={animal.id} className="overflow-hidden transition hover:-translate-y-1 hover:shadow-lg">
          <div className="relative h-64 bg-gray-100">
            <Image
              src={animal.image_url || "/placeholder.svg?height=400&width=600"}
              alt={animal.name}
              fill
              className="object-cover"
            />
            <Badge className="absolute left-4 top-4 bg-white/90 text-rose-600">
              {animal.category ? animal.category.charAt(0).toUpperCase() + animal.category.slice(1) : "Autre"}
            </Badge>
          </div>
          <CardHeader className="space-y-2">
            <div className="flex items-center justify-between">
              <CardTitle>{animal.name}</CardTitle>
              <Badge variant="outline">{getAgeLabel(animal.age_range || animal.ageRange || null)}</Badge>
            </div>
            <p className="text-sm text-gray-500">{animal.breed || "Race non renseignée"}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="line-clamp-2 text-sm text-gray-600">{animal.description || "Description à venir."}</p>
            <div className="flex flex-wrap gap-2">
              {animal.characteristics?.slice(0, 3).map((trait) => (
                <Badge key={trait} className={getBadgeClass(trait)}>
                  {trait}
                </Badge>
              ))}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <MapPin className="h-4 w-4" />
              {animal.location || "Refuge Animal Lovers"}
            </div>
            <Button asChild className="w-full rounded-full bg-rose-500 hover:bg-rose-600">
              <Link href={`/contact?subject=Adoption%20${encodeURIComponent(animal.name)}`}>
                <PawPrint className="mr-2 h-4 w-4" />
                Je veux le rencontrer
              </Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default async function AdoptionPage({ searchParams }: { searchParams: SearchParams }) {
  const animals = await fetchAdoptionAnimals()
  const filteredAnimals = filterAnimals(animals, searchParams || {})

  return (
    <div className="container space-y-10 py-10">
      <AdoptionHero total={animals.length} />

      <div className="rounded-3xl border bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Trouver votre compagnon</h2>
            <p className="text-gray-600">Filtrez par espèce ou recherchez directement un profil.</p>
          </div>
          <Suspense fallback={null}>
            <AdoptionFilters searchParams={searchParams || {}} />
          </Suspense>
        </div>

        <AdoptionGrid animals={filteredAnimals} />
      </div>

      <AdoptionProcess />
    </div>
  )
}

