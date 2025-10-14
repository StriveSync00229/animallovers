"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, SlidersHorizontal, X } from "lucide-react"

export default function CatFoodFilters() {
  const [priceRange, setPriceRange] = useState([0, 100])
  const [showFilters, setShowFilters] = useState(false)

  return (
    <div className="mb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Rechercher un produit..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2" onClick={() => setShowFilters(!showFilters)}>
          <SlidersHorizontal size={18} />
          Filtres
          {showFilters && <X size={18} />}
        </Button>
      </div>

      {showFilters && (
        <div className="bg-gray-50 p-6 rounded-lg mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <h3 className="font-medium mb-4">Type de produit</h3>
            <div className="space-y-2">
              {["Croquettes", "Pâtées", "Friandises", "Compléments alimentaires"].map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox id={`type-${type}`} />
                  <Label htmlFor={`type-${type}`}>{type}</Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-4">Âge du chat</h3>
            <div className="space-y-2">
              {["Chaton", "Adulte", "Senior", "Tous âges"].map((age) => (
                <div key={age} className="flex items-center space-x-2">
                  <Checkbox id={`age-${age}`} />
                  <Label htmlFor={`age-${age}`}>{age}</Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-4">Besoins spécifiques</h3>
            <div className="space-y-2">
              {["Stérilisé", "Sensibilité digestive", "Contrôle du poids", "Santé urinaire", "Hypoallergénique"].map(
                (need) => (
                  <div key={need} className="flex items-center space-x-2">
                    <Checkbox id={`need-${need}`} />
                    <Label htmlFor={`need-${need}`}>{need}</Label>
                  </div>
                ),
              )}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-4">Prix (€)</h3>
            <Slider
              defaultValue={[0, 100]}
              max={100}
              step={1}
              value={priceRange}
              onValueChange={setPriceRange}
              className="mb-6"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>{priceRange[0]}€</span>
              <span>{priceRange[1]}€</span>
            </div>

            <h3 className="font-medium mt-6 mb-4">Trier par</h3>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Popularité" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popularity">Popularité</SelectItem>
                <SelectItem value="price-asc">Prix croissant</SelectItem>
                <SelectItem value="price-desc">Prix décroissant</SelectItem>
                <SelectItem value="rating">Avis clients</SelectItem>
                <SelectItem value="newest">Nouveautés</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2 mb-6">
        <div className="text-sm bg-gray-100 px-3 py-1 rounded-full flex items-center gap-1">
          Croquettes <X size={14} className="cursor-pointer" />
        </div>
        <div className="text-sm bg-gray-100 px-3 py-1 rounded-full flex items-center gap-1">
          Chaton <X size={14} className="cursor-pointer" />
        </div>
        <div className="text-sm bg-gray-100 px-3 py-1 rounded-full flex items-center gap-1">
          Prix: 10€ - 50€ <X size={14} className="cursor-pointer" />
        </div>
        <button className="text-sm text-rose-600 hover:underline">Effacer tous les filtres</button>
      </div>
    </div>
  )
}
