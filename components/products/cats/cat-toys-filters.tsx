"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Search, SlidersHorizontal, X, ChevronDown, MousePointer, Feather, Zap, Cat, Leaf } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"

export default function CatToysFilters() {
  const [priceRange, setPriceRange] = useState([0, 100])

  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <input
            type="text"
            placeholder="Rechercher un jouet..."
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                Filtres
              </Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Filtres</SheetTitle>
                <SheetDescription>Affinez votre recherche de jouets pour chats</SheetDescription>
              </SheetHeader>

              <div className="py-4">
                <h3 className="font-medium mb-3">Prix</h3>
                <div className="px-2">
                  <Slider
                    defaultValue={[0, 100]}
                    max={100}
                    step={1}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{priceRange[0]}€</span>
                    <span>{priceRange[1]}€</span>
                  </div>
                </div>
              </div>

              <Accordion type="multiple" className="w-full">
                <AccordionItem value="type">
                  <AccordionTrigger>Type de jouet</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="interactive" />
                        <Label htmlFor="interactive">Jouets interactifs</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="feather" />
                        <Label htmlFor="feather">Jouets à plumes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="electronic" />
                        <Label htmlFor="electronic">Jouets électroniques</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="scratching" />
                        <Label htmlFor="scratching">Griffoirs</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="catnip" />
                        <Label htmlFor="catnip">Jouets à herbe à chat</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="trees" />
                        <Label htmlFor="trees">Arbres à chat</Label>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="age">
                  <AccordionTrigger>Âge du chat</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="kitten" />
                        <Label htmlFor="kitten">Chaton (0-12 mois)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="adult" />
                        <Label htmlFor="adult">Adulte (1-7 ans)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="senior" />
                        <Label htmlFor="senior">Senior (8+ ans)</Label>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="material">
                  <AccordionTrigger>Matériau</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="plush" />
                        <Label htmlFor="plush">Peluche</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="plastic" />
                        <Label htmlFor="plastic">Plastique</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="sisal" />
                        <Label htmlFor="sisal">Sisal</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="wood" />
                        <Label htmlFor="wood">Bois</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="natural" />
                        <Label htmlFor="natural">Matériaux naturels</Label>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="features">
                  <AccordionTrigger>Caractéristiques</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="catnip-feature" />
                        <Label htmlFor="catnip-feature">Avec herbe à chat</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="sound" />
                        <Label htmlFor="sound">Avec son</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="automatic" />
                        <Label htmlFor="automatic">Automatique</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="rechargeable" />
                        <Label htmlFor="rechargeable">Rechargeable</Label>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="flex justify-between mt-6">
                <SheetClose asChild>
                  <Button variant="outline">Annuler</Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button className="bg-rose-600 hover:bg-rose-700">Appliquer</Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>

          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              Interactifs
              <X className="h-3 w-3 ml-1" />
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              10€ - 30€
              <X className="h-3 w-3 ml-1" />
            </Button>
          </div>
        </div>
      </div>

      <div className="hidden md:flex flex-wrap gap-6 mb-4">
        <div className="flex items-center gap-2">
          <MousePointer className="h-4 w-4 text-rose-600" />
          <span className="font-medium">Jouets interactifs</span>
        </div>
        <div className="flex items-center gap-2">
          <Feather className="h-4 w-4 text-rose-600" />
          <span className="font-medium">Jouets à plumes</span>
        </div>
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-rose-600" />
          <span className="font-medium">Jouets électroniques</span>
        </div>
        <div className="flex items-center gap-2">
          <Cat className="h-4 w-4 text-rose-600" />
          <span className="font-medium">Arbres à chat</span>
        </div>
        <div className="flex items-center gap-2">
          <Leaf className="h-4 w-4 text-rose-600" />
          <span className="font-medium">Herbe à chat</span>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-gray-600">48 produits trouvés</p>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Trier par:</span>
          <Button variant="ghost" className="flex items-center gap-1">
            Popularité
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
