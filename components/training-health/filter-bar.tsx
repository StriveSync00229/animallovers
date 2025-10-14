"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

const FilterBar = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [species, setSpecies] = useState<string>(searchParams.get("species") || "")
  const [age, setAge] = useState<string>(searchParams.get("age") || "")
  const [tag, setTag] = useState<string>(searchParams.get("tag") || "")
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  // Mettre à jour les filtres actifs
  useEffect(() => {
    const filters = []
    if (species) filters.push(`Espèce: ${species}`)
    if (age) filters.push(`Âge: ${age}`)
    if (tag) filters.push(`Tag: ${tag}`)
    setActiveFilters(filters)
  }, [species, age, tag])

  // Appliquer les filtres
  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString())

    if (species) params.set("species", species)
    else params.delete("species")

    if (age) params.set("age", age)
    else params.delete("age")

    if (tag) params.set("tag", tag)
    else params.delete("tag")

    router.push(`/dressage-sante?${params.toString()}`)
  }

  // Réinitialiser les filtres
  const resetFilters = () => {
    setSpecies("")
    setAge("")
    setTag("")
    router.push("/dressage-sante")
  }

  // Supprimer un filtre spécifique
  const removeFilter = (filter: string) => {
    if (filter.startsWith("Espèce:")) {
      setSpecies("")
    } else if (filter.startsWith("Âge:")) {
      setAge("")
    } else if (filter.startsWith("Tag:")) {
      setTag("")
    }

    // Appliquer les changements
    setTimeout(applyFilters, 0)
  }

  return (
    <div className="mb-8">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4">
        <div className="flex items-center">
          <Filter className="w-5 h-5 mr-2 text-gray-500" />
          <span className="font-medium text-gray-700">Filtrer par:</span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Select value={species} onValueChange={setSpecies}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Espèce" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les espèces</SelectItem>
              <SelectItem value="chien">Chien</SelectItem>
              <SelectItem value="chat">Chat</SelectItem>
              <SelectItem value="les-deux">Les deux</SelectItem>
            </SelectContent>
          </Select>

          <Select value={age} onValueChange={setAge}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Âge" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les âges</SelectItem>
              <SelectItem value="chiot-chaton">Chiot/Chaton</SelectItem>
              <SelectItem value="adulte">Adulte</SelectItem>
              <SelectItem value="senior">Senior</SelectItem>
            </SelectContent>
          </Select>

          <Select value={tag} onValueChange={setTag}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Tag" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les tags</SelectItem>
              <SelectItem value="dressage">Dressage</SelectItem>
              <SelectItem value="sante">Santé</SelectItem>
              <SelectItem value="nutrition">Nutrition</SelectItem>
              <SelectItem value="comportement">Comportement</SelectItem>
              <SelectItem value="urgence">Urgence</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex space-x-2">
          <Button onClick={applyFilters} className="bg-rose-500 hover:bg-rose-600">
            Appliquer
          </Button>
          <Button variant="outline" onClick={resetFilters}>
            Réinitialiser
          </Button>
        </div>
      </div>

      {/* Filtres actifs */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mt-4">
          <span className="text-sm text-gray-500">Filtres actifs:</span>
          {activeFilters.map((filter, index) => (
            <Badge key={index} variant="secondary" className="flex items-center gap-1 px-3 py-1">
              {filter}
              <button onClick={() => removeFilter(filter)} className="ml-1 text-gray-500 hover:text-gray-700">
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}

export default FilterBar
