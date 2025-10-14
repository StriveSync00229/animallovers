"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"

export function MultiSpeciesFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "")
  const [priceRange, setPriceRange] = useState([0, 100])
  const [selectedAnimals, setSelectedAnimals] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const animalTypes = [
    { id: "chiens", label: "Chiens" },
    { id: "chats", label: "Chats" },
    { id: "rongeurs", label: "Rongeurs" },
    { id: "oiseaux", label: "Oiseaux" },
  ]

  const categories = [
    { id: "soins", label: "Soins" },
    { id: "voyage", label: "Voyage" },
    { id: "nettoyage", label: "Nettoyage" },
    { id: "urgence", label: "Urgence" },
    { id: "alimentation", label: "Alimentation" },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    const params = new URLSearchParams(searchParams.toString())

    if (searchTerm) {
      params.set("search", searchTerm)
    } else {
      params.delete("search")
    }

    if (selectedAnimals.length > 0) {
      params.set("animals", selectedAnimals.join(","))
    } else {
      params.delete("animals")
    }

    if (selectedCategories.length > 0) {
      params.set("categories", selectedCategories.join(","))
    } else {
      params.delete("categories")
    }

    params.set("minPrice", priceRange[0].toString())
    params.set("maxPrice", priceRange[1].toString())

    router.push(`/produits/mixtes/packs-multi-espece?${params.toString()}`)
  }

  const handleReset = () => {
    setSearchTerm("")
    setPriceRange([0, 100])
    setSelectedAnimals([])
    setSelectedCategories([])
    router.push("/produits/mixtes/packs-multi-espece")
  }

  return (
    <div className="mb-8">
      <form onSubmit={handleSearch} className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Rechercher un pack..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex items-center justify-center">
                <Filter size={18} className="mr-2" />
                Filtres avancés
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md">
              <SheetHeader>
                <SheetTitle>Filtres</SheetTitle>
                <SheetDescription>Affinez votre recherche de packs multi-espèce</SheetDescription>
              </SheetHeader>

              <div className="py-6 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-900">Types d'animaux</h3>
                  <div className="space-y-2">
                    {animalTypes.map((animal) => (
                      <div key={animal.id} className="flex items-center">
                        <Checkbox
                          id={`animal-${animal.id}`}
                          checked={selectedAnimals.includes(animal.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedAnimals([...selectedAnimals, animal.id])
                            } else {
                              setSelectedAnimals(selectedAnimals.filter((a) => a !== animal.id))
                            }
                          }}
                        />
                        <label htmlFor={`animal-${animal.id}`} className="ml-2 text-sm font-medium text-gray-700">
                          {animal.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-900">Catégories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center">
                        <Checkbox
                          id={`category-${category.id}`}
                          checked={selectedCategories.includes(category.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedCategories([...selectedCategories, category.id])
                            } else {
                              setSelectedCategories(selectedCategories.filter((c) => c !== category.id))
                            }
                          }}
                        />
                        <label htmlFor={`category-${category.id}`} className="ml-2 text-sm font-medium text-gray-700">
                          {category.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Prix</h3>
                    <span className="text-sm text-gray-500">
                      {priceRange[0]}€ - {priceRange[1]}€
                    </span>
                  </div>
                  <Slider
                    defaultValue={priceRange}
                    max={100}
                    step={1}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mt-2"
                  />
                </div>

                <div className="flex space-x-2">
                  <Button type="button" variant="outline" onClick={handleReset} className="flex-1">
                    <X size={16} className="mr-2" />
                    Réinitialiser
                  </Button>
                  <SheetClose asChild>
                    <Button type="submit" className="flex-1 bg-rose-500 hover:bg-rose-600" onClick={handleSearch}>
                      Appliquer
                    </Button>
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Active filters */}
        {(selectedAnimals.length > 0 || selectedCategories.length > 0 || priceRange[0] > 0 || priceRange[1] < 100) && (
          <div className="flex flex-wrap items-center mt-4 gap-2">
            <span className="text-sm font-medium text-gray-700">Filtres actifs:</span>

            {selectedAnimals.map((animal) => (
              <div key={animal} className="flex items-center px-2 py-1 text-xs bg-gray-100 rounded-full">
                {animalTypes.find((a) => a.id === animal)?.label}
                <button
                  type="button"
                  onClick={() => setSelectedAnimals(selectedAnimals.filter((a) => a !== animal))}
                  className="ml-1 text-gray-500 hover:text-gray-700"
                >
                  <X size={12} />
                </button>
              </div>
            ))}

            {selectedCategories.map((category) => (
              <div key={category} className="flex items-center px-2 py-1 text-xs bg-gray-100 rounded-full">
                {categories.find((c) => c.id === category)?.label}
                <button
                  type="button"
                  onClick={() => setSelectedCategories(selectedCategories.filter((c) => c !== category))}
                  className="ml-1 text-gray-500 hover:text-gray-700"
                >
                  <X size={12} />
                </button>
              </div>
            ))}

            {(priceRange[0] > 0 || priceRange[1] < 100) && (
              <div className="flex items-center px-2 py-1 text-xs bg-gray-100 rounded-full">
                Prix: {priceRange[0]}€ - {priceRange[1]}€
                <button
                  type="button"
                  onClick={() => setPriceRange([0, 100])}
                  className="ml-1 text-gray-500 hover:text-gray-700"
                >
                  <X size={12} />
                </button>
              </div>
            )}

            <button type="button" onClick={handleReset} className="text-xs text-rose-600 hover:text-rose-700">
              Effacer tous les filtres
            </button>
          </div>
        )}
      </form>
    </div>
  )
}
